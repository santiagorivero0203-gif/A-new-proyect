import React from 'react';
import type { WorkspaceModuleId, WorkspacePresetId } from '../../types/modules.types';
import { WORKSPACE_MODULES_CATALOG, WORKSPACE_PRESETS } from '../../types/modules.types';
import {
  XIcon,
  RotateCcwIcon,
  CheckCircleIcon,
  SparklesIcon,
  LayersIcon,
} from '../common/Icons';

interface WorkspaceCustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeModules: WorkspaceModuleId[];
  activePreset: WorkspacePresetId | null;
  onToggleModule: (id: WorkspaceModuleId) => void;
  onApplyPreset: (presetId: WorkspacePresetId) => void;
  onResetToDefault: () => void;
}

export const WorkspaceCustomizerDrawer: React.FC<WorkspaceCustomizerDrawerProps> = ({
  isOpen,
  onClose,
  activeModules,
  activePreset,
  onToggleModule,
  onApplyPreset,
  onResetToDefault,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fadeIn">
      {/* Fondo oscuro translúcido con desenfoque */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"
      />

      {/* Cajón lateral flotante */}
      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200/80 transform transition-transform duration-200 ease-out">
        {/* Cabecera del Cajón */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold">
              <LayersIcon className="w-5 h-5 text-brand-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight font-display">
                Personalizar Workspace
              </h2>
              <p className="text-xs text-slate-500">
                {activeModules.length} de {WORKSPACE_MODULES_CATALOG.length} módulos habilitados
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Contenido desplazable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Sección de Presets de 1 Clic */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Configuraciones Rápidas (Presets)
              </span>
              <button
                onClick={onResetToDefault}
                className="text-xs text-brand-500 hover:text-brand-600 font-semibold flex items-center gap-1 transition-colors"
              >
                <RotateCcwIcon className="w-3 h-3" />
                <span>Restablecer</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {WORKSPACE_PRESETS.map((preset) => {
                const isSelected = activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => onApplyPreset(preset.id)}
                    className={`p-3 rounded-2xl border text-left transition-all relative ${
                      isSelected
                        ? 'bg-brand-50/70 border-brand-500 shadow-soft-sm'
                        : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-lg">{preset.icon}</span>
                      {isSelected && (
                        <CheckCircleIcon className="w-4 h-4 text-brand-500" />
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-900 leading-snug">{preset.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{preset.tagline}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selector Individual de Módulos */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Módulos Individuales
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Acceso universal
              </span>
            </div>

            <div className="space-y-2.5">
              {WORKSPACE_MODULES_CATALOG.map((mod) => {
                const isActive = activeModules.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    onClick={() => onToggleModule(mod.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-white border-slate-200/90 shadow-soft-sm'
                        : 'bg-slate-50/50 border-slate-200/60 opacity-60 hover:opacity-90'
                    }`}
                  >
                    <div className="space-y-0.5 flex-1 pr-2">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-slate-900">{mod.name}</p>
                        {mod.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-600 font-mono">
                            {mod.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        {mod.shortDescription}
                      </p>
                    </div>

                    {/* Switch Toggle */}
                    <div
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                        isActive ? 'bg-brand-500' : 'bg-slate-200'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                          isActive ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-800 flex items-center gap-1.5">
              <SparklesIcon className="w-3.5 h-3.5 text-brand-500" />
              <span>Modularidad sin Fronteras</span>
            </p>
            <p className="text-[11px] leading-relaxed">
              Tus preferencias se guardan de forma instantánea. Cada usuario puede construir su propio panel agregando o retirando widgets según el día y su objetivo de estudio.
            </p>
          </div>
        </div>

        {/* Pie del Cajón */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={onClose}
            className="btn-brand w-full py-2.5 text-xs font-semibold"
          >
            Guardar y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
