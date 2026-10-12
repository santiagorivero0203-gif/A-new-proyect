import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ScientificCalculator } from '../dashboards/ScientificCalculator';
import { PHYSICS_CONSTANTS } from '../../lib/mockData';
import { renderLatex } from '../../utils/latexRenderer';
import { CalculatorIcon, CopyIcon, CheckCircleIcon, SparklesIcon } from '../common/Icons';

export const ToolsAndSettingsView: React.FC = () => {
  const { user, updateUserPreferences, isDemoMode } = useAuth();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="pb-4 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
          <CalculatorIcon className="w-3.5 h-3.5" />
          Herramientas Complementarias y Configuración
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
          Utilidades de Estudio y Ajustes
        </h2>
        <p className="text-sm text-slate-500">
          Calculadora científica de alta precisión, banco de constantes físicas universales y preferencias del entorno de estudio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna Izquierda (6 cols): Calculadora Científica */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Calculadora Científica Integrada</h3>
            <p className="text-xs text-slate-500 mb-3">
              Módulo desacoplado para cálculos matemáticos, trigonométricos y algebraicos sin saturar la vista principal.
            </p>
          </div>
          <ScientificCalculator isEmbedded={true} />
        </div>

        {/* Columna Derecha (6 cols): Constantes y Ajustes */}
        <div className="lg:col-span-6 space-y-6">
          {/* Constantes Universales */}
          <div className="app-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Constantes Físicas Universales</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Valores Oficiales CODATA</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PHYSICS_CONSTANTS.map((c, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{c.name}</p>
                    <div
                      className="text-[11px] font-serif text-slate-600 mt-0.5"
                      dangerouslySetInnerHTML={{ __html: renderLatex(c.latex, false) }}
                    />
                  </div>
                  <button
                    onClick={() => copyToClipboard(c.value, `tool-const-${i}`)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
                    title="Copiar valor exacto"
                  >
                    {copiedKey === `tool-const-${i}` ? (
                      <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <CopyIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Ajustes de Preferencias del Estudiante */}
          <div className="app-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
              Preferencias del Ecosistema
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">Modo de Autenticación y Datos</p>
                  <p className="text-slate-500 text-[11px]">
                    {isDemoMode ? 'Modo Demostración Local Activo' : 'Conexión activa con Supabase'}
                  </p>
                </div>
                <span className="app-badge font-mono">
                  {isDemoMode ? 'Demo' : 'Supabase Live'}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div>
                  <p className="font-semibold text-slate-800">Duración de Bloque Pomodoro</p>
                  <p className="text-slate-500 text-[11px]">Minutos estándar recomendados para concentración</p>
                </div>
                <select
                  value={user?.preferences.focus_duration || 25}
                  onChange={(e) =>
                    updateUserPreferences({ focus_duration: parseInt(e.target.value) })
                  }
                  className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
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
                  <p className="font-semibold text-slate-800">Sonido de Notificación al Concluir Bloque</p>
                  <p className="text-slate-500 text-[11px]">Alerta auditiva suave al finalizar el cronómetro</p>
                </div>
                <input
                  type="checkbox"
                  checked={user?.preferences.sound_enabled ?? true}
                  onChange={(e) =>
                    updateUserPreferences({ sound_enabled: e.target.checked })
                  }
                  className="w-4 h-4 accent-blue-600 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
