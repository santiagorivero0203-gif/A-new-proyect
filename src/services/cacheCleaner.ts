/**
 * Servicio de Saneamiento y Purga de Caché Local (Directriz Estado Cero)
 * 
 * Elimina de raíz cualquier clave de prueba, mock offline antiguo o datos ficticios
 * almacenados en localStorage, garantizando que el sistema opere exclusivamente
 * con datos reales de producción y tablas de Supabase.
 */

const OBSOLETE_MOCK_KEYS = [
  'mock_user',
  'mock_exam_results',
  'mock_questions',
  'mock_guides',
  'cpe_simadi_results_mock',
  'cpe_mock_events',
  'cpe_mock_tasks',
  'cpe_mock_reminders',
  'cpe_gemini_api_key',
  // Claves antiguas con semillas mock
  'cpe_santiago_fisica_ucv_events_v2',
  'cpe_santiago-003-uuid_events_v2',
  'cpe_andres_bachillerato_1_events_v2',
  'cpe_andres-001-uuid_events_v2',
  'cpe_prima_bachillerato_5_events_v2',
  'cpe_prima-002-uuid_events_v2',
  'cpe_mafe_diseno_ucab_events_v2',
  'cpe_mafe-004-uuid_events_v2',
  'cpe_santiago_fisica_ucv_tasks_v2',
  'cpe_santiago-003-uuid_tasks_v2',
  'cpe_andres_bachillerato_1_tasks_v2',
  'cpe_prima_bachillerato_5_tasks_v2',
  'cpe_mafe_diseno_ucab_tasks_v2',
  'cpe_santiago_fisica_ucv_reminders_v2',
  'cpe_andres_bachillerato_1_reminders_v2',
  'cpe_prima_bachillerato_5_reminders_v2',
  'cpe_mafe_diseno_ucab_reminders_v2',
  'cpe_santiago_fisica_ucv_notes_v2',
  'cpe_andres_bachillerato_1_notes_v2',
  'cpe_prima_bachillerato_5_notes_v2',
  'cpe_mafe_diseno_ucab_notes_v2',
  'cpe_mafe-004-uuid_creative_deliveries',
  'cpe_default_creative_deliveries',
];

export const cacheCleaner = {
  /**
   * Purga automática preventiva de claves mock obsoletas.
   * Se ejecuta silenciosamente al arrancar la app.
   */
  purgeLegacyMocks(): void {
    if (typeof window === 'undefined') return;

    try {
      OBSOLETE_MOCK_KEYS.forEach((key) => {
        if (localStorage.getItem(key) !== null) {
          localStorage.removeItem(key);
        }
      });

      // Recorrer localStorage para remover cualquier clave que empiece con mock_
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('mock_') || key.includes('_mock') || key.includes('_sample'))) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach((key) => localStorage.removeItem(key));
    } catch (err) {
      console.warn('Advertencia al purgar mocks:', err);
    }
  },

  /**
   * Restablecimiento total explícito del caché local solicitado por el usuario.
   * Deja la aplicación en Estado Cero absoluto y purga la memoria caché PWA.
   */
  async resetAllLocalCache(): Promise<{ purgedKeysCount: number }> {
    if (typeof window === 'undefined') return { purgedKeysCount: 0 };

    let count = 0;
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('cpe_') || key.startsWith('mock_') || key.includes('cache') || key.startsWith('studynexus_'))) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
        count++;
      });

      // Purgar CacheStorage del Service Worker
      if ('caches' in window) {
        const cacheKeys = await window.caches.keys();
        await Promise.all(cacheKeys.map((k) => window.caches.delete(k)));
      }

      // Desregistrar Service Workers activos
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          await reg.unregister();
        }
      }
    } catch (err) {
      console.error('Error al restablecer caché local:', err);
    }

    return { purgedKeysCount: count };
  },
};
