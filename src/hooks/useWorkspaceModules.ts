import { useState, useEffect, useCallback } from 'react';
import type {
  WorkspaceModuleId,
  WorkspacePresetId,
} from '../types/modules.types';
import {
  WORKSPACE_MODULES_CATALOG,
  WORKSPACE_PRESETS,
} from '../types/modules.types';
import { useAuth } from '../context/AuthContext';

const DEFAULT_ACTIVE_MODULES: WorkspaceModuleId[] = WORKSPACE_MODULES_CATALOG
  .filter((m) => m.defaultEnabled)
  .map((m) => m.id);

function getModulesStorageKey(userId: string): string {
  return `cpe_${userId}_workspace_modules_v4`;
}

function getPresetStorageKey(userId: string): string {
  return `cpe_${userId}_active_preset_v4`;
}

/**
 * Hook de Gestión de Modularidad Universal Aislada por Cuenta
 * Controla qué widgets o herramientas están anclados al Dashboard principal
 * con persistencia 100% aislada por estudiante.
 */
export function useWorkspaceModules() {
  const { user, updateUserPreferences } = useAuth();
  const userId = user?.id || 'guest';

  // Obtener módulos iniciales para el usuario activo
  const loadUserModules = useCallback((): WorkspaceModuleId[] => {
    if (user?.preferences?.workspace_modules && user.preferences.workspace_modules.length > 0) {
      return user.preferences.workspace_modules as WorkspaceModuleId[];
    }
    const saved = localStorage.getItem(getModulesStorageKey(userId));
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed as WorkspaceModuleId[];
        }
      } catch {
        // Fallback
      }
    }
    return DEFAULT_ACTIVE_MODULES;
  }, [user, userId]);

  const loadUserPreset = useCallback((): WorkspacePresetId | null => {
    const saved = localStorage.getItem(getPresetStorageKey(userId)) as WorkspacePresetId | null;
    return saved || 'balanced';
  }, [userId]);

  const [activeModules, setActiveModules] = useState<WorkspaceModuleId[]>(loadUserModules);
  const [activePreset, setActivePreset] = useState<WorkspacePresetId | null>(loadUserPreset);

  // Recargar configuración del workspace de inmediato si cambia la cuenta activa
  useEffect(() => {
    setActiveModules(loadUserModules());
    setActivePreset(loadUserPreset());
  }, [userId, loadUserModules, loadUserPreset]);

  // Guardar cambios en localStorage aislado y en preferencias del usuario
  const persistChanges = useCallback(
    (newModules: WorkspaceModuleId[], presetId?: WorkspacePresetId | null) => {
      localStorage.setItem(getModulesStorageKey(userId), JSON.stringify(newModules));
      if (presetId) {
        localStorage.setItem(getPresetStorageKey(userId), presetId);
      } else {
        localStorage.removeItem(getPresetStorageKey(userId));
      }

      if (user) {
        updateUserPreferences({
          workspace_modules: newModules,
          active_preset: presetId || undefined,
        });
      }
    },
    [user, userId, updateUserPreferences]
  );

  /**
   * Verifica si un módulo está actualmente visible en el dashboard
   */
  const isModuleActive = useCallback(
    (id: WorkspaceModuleId): boolean => {
      return activeModules.includes(id);
    },
    [activeModules]
  );

  /**
   * Conmuta la visibilidad (habilitar/deshabilitar) de un módulo
   */
  const toggleModule = useCallback(
    (id: WorkspaceModuleId) => {
      setActiveModules((prev) => {
        let updated: WorkspaceModuleId[];
        if (prev.includes(id)) {
          if (prev.length <= 1) return prev;
          updated = prev.filter((m) => m !== id);
        } else {
          updated = [...prev, id];
        }
        persistChanges(updated, null);
        setActivePreset(null);
        return updated;
      });
    },
    [persistChanges]
  );

  /**
   * Habilita un módulo específico
   */
  const enableModule = useCallback(
    (id: WorkspaceModuleId) => {
      setActiveModules((prev) => {
        if (prev.includes(id)) return prev;
        const updated = [...prev, id];
        persistChanges(updated, null);
        setActivePreset(null);
        return updated;
      });
    },
    [persistChanges]
  );

  /**
   * Deshabilita un módulo específico
   */
  const disableModule = useCallback(
    (id: WorkspaceModuleId) => {
      setActiveModules((prev) => {
        if (!prev.includes(id) || prev.length <= 1) return prev;
        const updated = prev.filter((m) => m !== id);
        persistChanges(updated, null);
        setActivePreset(null);
        return updated;
      });
    },
    [persistChanges]
  );

  /**
   * Aplica un preset predefinido de un solo clic
   */
  const applyPreset = useCallback(
    (presetId: WorkspacePresetId) => {
      const targetPreset = WORKSPACE_PRESETS.find((p) => p.id === presetId);
      if (!targetPreset) return;

      setActiveModules(targetPreset.modules);
      setActivePreset(presetId);
      persistChanges(targetPreset.modules, presetId);
    },
    [persistChanges]
  );

  /**
   * Restablece el workspace al estado equilibrado recomendado
   */
  const resetToDefault = useCallback(() => {
    applyPreset('balanced');
  }, [applyPreset]);

  return {
    activeModules,
    activePreset,
    isModuleActive,
    toggleModule,
    enableModule,
    disableModule,
    applyPreset,
    resetToDefault,
    totalModulesCount: WORKSPACE_MODULES_CATALOG.length,
    activeModulesCount: activeModules.length,
  };
}
