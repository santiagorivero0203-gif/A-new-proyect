import type { ExamSessionState, ExamReport } from '../types/exam.types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const ACTIVE_EXAM_STORAGE_KEY = 'cpe_active_exam_backup_v1';
const PENDING_SYNC_STORAGE_KEY = 'cpe_pending_exam_sync_queue_v1';

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
export const sessionRecoveryService = {
  /**
   * Guarda el estado actual del simulacro en curso
   */
  saveActiveExamSession(session: ExamSessionState): void {
    if (session.status !== 'IN_PROGRESS' || !session.questions || session.questions.length === 0) {
      return;
    }

    try {
      const payload = JSON.stringify({
        ...session,
        savedAt: new Date().toISOString(),
      });
      sessionStorage.setItem(ACTIVE_EXAM_STORAGE_KEY, payload);
      localStorage.setItem(ACTIVE_EXAM_STORAGE_KEY, payload);
    } catch (err) {
      console.warn('[RecoveryService] No se pudo respaldar sesión activa:', err);
    }
  },

  /**
   * Obtiene la sesión activa respaldada si existe
   */
  getActiveExamSession(): ExamSessionState | null {
    try {
      const raw =
        sessionStorage.getItem(ACTIVE_EXAM_STORAGE_KEY) ||
        localStorage.getItem(ACTIVE_EXAM_STORAGE_KEY);
      if (!raw) return null;

      const parsed = JSON.parse(raw) as ExamSessionState & { savedAt?: string };
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
  clearActiveExamSession(): void {
    try {
      sessionStorage.removeItem(ACTIVE_EXAM_STORAGE_KEY);
      localStorage.removeItem(ACTIVE_EXAM_STORAGE_KEY);
    } catch {
      // Ignorar fallos de acceso a storage
    }
  },

  /**
   * Encola un reporte de examen finalizado para sincronización cuando no hay conexión
   */
  queuePendingReport(report: ExamReport, userId: string): void {
    try {
      const queue = this.getPendingReports();
      const newItem: PendingSyncItem = {
        id: `sync-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        userId,
        report,
        timestamp: new Date().toISOString(),
      };
      const updatedQueue = [...queue, newItem];
      localStorage.setItem(PENDING_SYNC_STORAGE_KEY, JSON.stringify(updatedQueue));
    } catch (err) {
      console.error('[RecoveryService] Error encolando reporte offline:', err);
    }
  },

  /**
   * Obtiene la lista de reportes pendientes por sincronizar
   */
  getPendingReports(): PendingSyncItem[] {
    try {
      const raw = localStorage.getItem(PENDING_SYNC_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  /**
   * Sincroniza los reportes pendientes con Supabase tan pronto hay conexión
   */
  async syncPendingReports(): Promise<number> {
    if (!navigator.onLine || !isSupabaseConfigured()) {
      return 0;
    }

    const queue = this.getPendingReports();
    if (queue.length === 0) return 0;

    let syncedCount = 0;
    const remainingQueue: PendingSyncItem[] = [];

    for (const item of queue) {
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

    localStorage.setItem(PENDING_SYNC_STORAGE_KEY, JSON.stringify(remainingQueue));
    return syncedCount;
  },

  /**
   * Inicializa escuchas de red global para sincronizar automáticamente al reconectar
   */
  initNetworkSyncListener(): () => void {
    const handleOnline = () => {
      this.syncPendingReports().then((count) => {
        if (count > 0) {
          console.info(`[RecoveryService] Sincronizados ${count} reportes pendientes con Supabase.`);
        }
      });
    };

    window.addEventListener('online', handleOnline);
    // Intento de sincronización al arrancar
    if (navigator.onLine) {
      handleOnline();
    }

    return () => window.removeEventListener('online', handleOnline);
  },
};
