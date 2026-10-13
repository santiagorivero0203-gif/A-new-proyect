import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ScientificCalculator } from '../dashboards/ScientificCalculator';
import { CalculatorIcon } from '../common/Icons';
import { cacheCleaner } from '../../services/cacheCleaner';

export const ToolsAndSettingsView: React.FC = () => {
  const { user, updateUserPreferences, isDemoMode } = useAuth();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Encabezado Limpio */}
      <div className="pb-4 border-b border-slate-200/80">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
          Calculadora y Ajustes
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Herramienta de cálculo y configuración general del entorno de estudio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda (6 cols): Calculadora Científica */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <CalculatorIcon className="w-4 h-4 text-brand-500" />
            <span>Calculadora Científica</span>
          </div>
          <ScientificCalculator isEmbedded={true} />
        </div>

        {/* Columna Derecha (6 cols): Ajustes Generales */}
        <div className="lg:col-span-6 space-y-5">
          <div className="app-card p-6 space-y-5 bg-white border border-slate-200/80 shadow-soft">
            <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 font-sans">
              Ajustes de la Plataforma
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">Modo de Datos</p>
                  <p className="text-slate-500 text-[11px]">
                    {isDemoMode ? 'Almacenamiento local activo' : 'Conectado a la base de datos Supabase'}
                  </p>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                  {isDemoMode ? 'Modo Local' : 'Supabase Live'}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div>
                  <p className="font-semibold text-slate-800">Duración de Sesión de Enfoque</p>
                  <p className="text-slate-500 text-[11px]">Minutos estándar por bloque de estudio</p>
                </div>
                <select
                  value={user?.preferences.focus_duration || 25}
                  onChange={(e) =>
                    updateUserPreferences({ focus_duration: parseInt(e.target.value) })
                  }
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
                >
                  <option value={20}>20 Minutos</option>
                  <option value={25}>25 Minutos</option>
                  <option value={45}>45 Minutos</option>
                  <option value={50}>50 Minutos</option>
                  <option value={60}>60 Minutos</option>
                </select>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div>
                  <p className="font-semibold text-slate-800">Sonido de Notificación</p>
                  <p className="text-slate-500 text-[11px]">Avisar al finalizar temporizadores de concentración</p>
                </div>
                <input
                  type="checkbox"
                  checked={user?.preferences.sound_enabled ?? true}
                  onChange={(e) =>
                    updateUserPreferences({ sound_enabled: e.target.checked })
                  }
                  className="w-4 h-4 accent-brand-500 rounded"
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div>
                  <p className="font-semibold text-slate-800">Renderizado de Fórmulas Matemáticas</p>
                  <p className="text-slate-500 text-[11px]">Compilación KaTeX en preguntas y apuntes</p>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                  Activo (KaTeX 0.16)
                </span>
              </div>
            </div>
          </div>

          {/* Tarjeta de Directriz Estado Cero & Purga de Caché */}
          <div className="app-card p-6 space-y-4 bg-white border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Mantenimiento & Estado Cero
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Elimina residuos de pruebas, mocks y restablece la app limpia de fábrica.
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                Zero Dummy
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Si detectas datos antiguos en tu navegador o deseas iniciar un nuevo ciclo académico completamente limpio (0 eventos, 0 tareas ficticias), restablece la memoria local.
            </p>

            <button
              onClick={() => {
                if (window.confirm('¿Deseas restablecer el caché local y purgar todos los datos de prueba? Esta acción dejará las tablas limpias para iniciar en producción.')) {
                  const res = cacheCleaner.resetAllLocalCache();
                  alert(`Caché purgado con éxito (${res.purgedKeysCount} registros limpiados). La plataforma está en Estado Cero.`);
                  window.location.reload();
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200/80 hover:border-rose-200 text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>Restablecer Caché Local & Purgar Datos de Prueba</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
