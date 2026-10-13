/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - SERVICIO DE RESPALDO Y RESTAURACIÓN JSON
 * ==============================================================================
 * Archivo: backupRestoreService.ts
 * Función 193: Exportación e importación total de datos (JSON Backup).
 * Permite descargar un snapshot completo de tareas, guías, resultados y perfil
 * para portabilidad offline o migración.
 * ==============================================================================
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { UserProfile } from '../types';

export interface FullBackupPayload {
  version: string;
  exportedAt: string;
  user: Partial<UserProfile>;
  tasks: any[];
  academicGuides: any[];
  examResults: any[];
  events: any[];
  localStorageSnapshot: Record<string, any>;
}

class BackupRestoreService {
  /**
   * Genera un archivo JSON de respaldo con todos los datos del usuario activo
   */
  async exportFullBackup(user: UserProfile): Promise<FullBackupPayload> {
    const payload: FullBackupPayload = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        academic_profile: user.academic_profile,
        preferences: user.preferences,
      },
      tasks: [],
      academicGuides: [],
      examResults: [],
      events: [],
      localStorageSnapshot: {},
    };

    // 1. Recolectar datos locales en localStorage
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('cpe_') || key.startsWith('simadi_') || key.startsWith('app_'))) {
          try {
            payload.localStorageSnapshot[key] = JSON.parse(localStorage.getItem(key) || 'null');
          } catch {
            payload.localStorageSnapshot[key] = localStorage.getItem(key);
          }
        }
      }
    } catch {
      // Ignorar errores locales
    }

    // 2. Si Supabase está configurado, exportar tablas del usuario
    if (isSupabaseConfigured() && user.id) {
      try {
        const [tasksRes, guidesRes, examsRes, eventsRes] = await Promise.all([
          supabase.from('kanban_tasks').select('*').eq('user_id', user.id),
          supabase.from('academic_guides').select('*').eq('user_id', user.id),
          supabase.from('exam_results').select('*').eq('user_id', user.id),
          supabase.from('events_and_deadlines').select('*').eq('user_id', user.id),
        ]);

        if (tasksRes.data) payload.tasks = tasksRes.data;
        if (guidesRes.data) payload.academicGuides = guidesRes.data;
        if (examsRes.data) payload.examResults = examsRes.data;
        if (eventsRes.data) payload.events = eventsRes.data;
      } catch (err) {
        console.warn('Error recolectando datos de Supabase para respaldo:', err);
      }
    }

    return payload;
  }

  /**
   * Descarga el payload como archivo .json en el navegador del usuario
   */
  downloadBackupFile(payload: FullBackupPayload) {
    const jsonStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `backup_productividad_${payload.user.academic_profile || 'estudiante'}_${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Restaura datos a partir de un archivo JSON cargado
   */
  async restoreFromBackup(payload: FullBackupPayload, currentUserId?: string): Promise<{ success: boolean; message: string }> {
    if (!payload.version || !payload.exportedAt) {
      throw new Error('El archivo no parece ser un respaldo válido de la aplicación.');
    }

    // 1. Restaurar localStorage
    if (payload.localStorageSnapshot) {
      Object.entries(payload.localStorageSnapshot).forEach(([key, val]) => {
        try {
          localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
        } catch {
          // Ignorar fallos de cuota local
        }
      });
    }

    // 2. Si hay conexión con Supabase y se tiene sesión activa, insertar datos
    const targetUserId = currentUserId || payload.user.id;
    if (isSupabaseConfigured() && targetUserId) {
      try {
        if (payload.tasks && payload.tasks.length > 0) {
          const tasksToInsert = payload.tasks.map((t) => ({ ...t, user_id: targetUserId }));
          await (supabase.from('kanban_tasks') as any).upsert(tasksToInsert);
        }

        if (payload.events && payload.events.length > 0) {
          const eventsToInsert = payload.events.map((e) => ({ ...e, user_id: targetUserId }));
          await (supabase.from('events_and_deadlines') as any).upsert(eventsToInsert);
        }
      } catch (err: any) {
        console.warn('Advertencia al restaurar en Supabase:', err);
      }
    }

    return {
      success: true,
      message: `Respaldo del ${new Date(payload.exportedAt).toLocaleDateString()} restaurado correctamente.`,
    };
  }
}

export const backupRestoreService = new BackupRestoreService();
