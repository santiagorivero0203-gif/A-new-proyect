import type { ExamSessionState, ExamReport } from '../types/exam.types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const ACTIVE_EXAM_STORAGE_KEY = 'cpe_active_exam_backup_v1';
const PENDING_SYNC_STORAGE_KEY = 'cpe_pending_exam_sync_queue_v1';

function getActiveExamKey(userId?: string): string {
  return userId ? `cpe_${userId}_active_exam_backup_v1` : ACTIVE_EXAM_STORAGE_KEY;
}

export interface PendingSyncItem {
  id: string;
  userId: string;
  report: ExamReport;
  timestamp: string;
}

/**
 * Servicio de Resiliencia ante Caídas de Red y Persistencia de Sesión Activa
 *
 * Diseñado para entornos educativos con conectividad inestable (UCV, UCAB, colegios):
 * 1. Respaldo continuo en tiempo real de exámenes en curso (respuestas, tiempo, pregunta activa).
 * 2. Detección y recuperación inmediata tras recarga accidental o pérdida de red.
 * 3. Cola offline (Outbox Pattern) para reportes de examen terminados sin internet,
 *    sincronizándolos automáticamente con Supabase al recuperar la conexión.
 */
function getPendingSyncKey(userId?: string): string {
  return userId ? `cpe_${userId}_pending_exam_sync_queue_v1` : PENDING_SYNC_STORAGE_KEY;
}

export const sessionRecoveryService = {
  /**
   * Guarda el estado actual del simulacro en curso aislado por estudiante
   */
  saveActiveExamSession(session: ExamSessionState, userId?: string): void {
    if (session.status !== 'IN_PROGRESS' || !session.questions || session.questions.length === 0) {
      return;
    }

    try {
      const payload = JSON.stringify({
        ...session,
        savedAt: new Date().toISOString(),
        userId: userId || 'anonymous',
      });
      const key = getActiveExamKey(userId);
      sessionStorage.setItem(key, payload);
      localStorage.setItem(key, payload);
    } catch (err) {
      console.warn('[RecoveryService] No se pudo respaldar sesión activa:', err);
    }
  },

  /**
   * Obtiene la sesión activa respaldada si existe para el usuario actual
   */
  getActiveExamSession(userId?: string): ExamSessionState | null {
    try {
      const key = getActiveExamKey(userId);
      const raw =
        sessionStorage.getItem(key) ||
        localStorage.getItem(key) ||
        (!userId ? (sessionStorage.getItem(ACTIVE_EXAM_STORAGE_KEY) || localStorage.getItem(ACTIVE_EXAM_STORAGE_KEY)) : null);
      if (!raw) return null;

      const parsed = JSON.parse(raw) as ExamSessionState & { savedAt?: string; userId?: string };
      // Si la sesión guardada pertenece a otro usuario, no restaurar
      if (userId && parsed.userId && parsed.userId !== 'anonymous' && parsed.userId !== userId) {
        return null;
      }

      if (
        parsed.status === 'IN_PROGRESS' &&
        Array.isArray(parsed.questions) &&
        parsed.questions.length > 0
      ) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  },

  /**
   * Limpia el respaldo de la sesión activa tras finalizar o descartar
   */
  clearActiveExamSession(userId?: string): void {
    try {
      const key = getActiveExamKey(userId);
      sessionStorage.removeItem(key);
      localStorage.removeItem(key);
      if (userId) {
        sessionStorage.removeItem(ACTIVE_EXAM_STORAGE_KEY);
        localStorage.removeItem(ACTIVE_EXAM_STORAGE_KEY);
      }
    } catch {
      // Ignore
    }
  },

  /**
   * Encola un reporte de examen finalizado para sincronización cuando no hay conexión
   */
  queuePendingReport(report: ExamReport, userId: string): void {
    if (!userId || userId === 'anonymous') return;
    try {
      const key = getPendingSyncKey(userId);
      const queue = this.getPendingReports(userId);
      const newItem: PendingSyncItem = {
        id: `sync-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        userId,
        report,
        timestamp: new Date().toISOString(),
      };
      const updatedQueue = [...queue, newItem];
      localStorage.setItem(key, JSON.stringify(updatedQueue));
    } catch (err) {
      console.error('[RecoveryService] Error encolando reporte offline:', err);
    }
  },

  /**
   * Obtiene la lista de reportes pendientes por sincronizar para un usuario específico
   */
  getPendingReports(userId?: string): PendingSyncItem[] {
    try {
      const key = getPendingSyncKey(userId);
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  /**
   * Sincroniza los reportes pendientes con Supabase tan pronto hay conexión
   */
  async syncPendingReports(userId?: string): Promise<number> {
    if (!navigator.onLine || !isSupabaseConfigured() || !userId) {
      return 0;
    }

    const key = getPendingSyncKey(userId);
    const queue = this.getPendingReports(userId);
    if (queue.length === 0) return 0;

    let syncedCount = 0;
    const remainingQueue: PendingSyncItem[] = [];

    for (const item of queue) {
      // Asegurar que el reporte coincida con el usuario autenticado
      if (item.userId !== userId) {
        remainingQueue.push(item);
        continue;
      }

      try {
        const { error } = await (supabase.from('exam_results') as any).insert({
          user_id: item.userId,
          exam_title: item.report.examTitle,
          subject: item.report.subject || 'Multidisciplinar',
          score: item.report.score,
          total_questions: item.report.totalQuestions,
          correct_answers: item.report.correctAnswers,
          time_taken_seconds: item.report.timeTakenSeconds,
          breakdown: item.report.breakdownByTopic,
          answers: item.report.userAnswers,
        });

        if (!error) {
          syncedCount++;
        } else {
          remainingQueue.push(item);
        }
      } catch {
        remainingQueue.push(item);
      }
    }

    localStorage.setItem(key, JSON.stringify(remainingQueue));
    return syncedCount;
  },

  /**
   * Inicializa escuchas de red global para sincronizar automáticamente al reconectar
   */
  initNetworkSyncListener(userId?: string): () => void {
    const handleOnline = () => {
      if (userId) {
        this.syncPendingReports(userId).then((count) => {
          if (count > 0) {
            console.info(`[RecoveryService] Sincronizados ${count} reportes pendientes con Supabase.`);
          }
        });
      }
    };

    window.addEventListener('online', handleOnline);
    if (navigator.onLine && userId) {
      handleOnline();
    }

    return () => window.removeEventListener('online', handleOnline);
  },
};
