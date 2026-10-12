import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AtomIcon, CopyIcon, CheckCircleIcon, SparklesIcon, LayersIcon } from '../common/Icons';
import { ScientificCalculator } from './ScientificCalculator';
import { PHYSICS_CONSTANTS, SANTIAGO_FORMULAS } from '../../lib/mockData';
import { renderLatex } from '../../utils/latexRenderer';

export const SantiagoDashboard: React.FC = () => {
  const { user } = useAuth();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [customLatex, setCustomLatex] = useState<string>('\\oint_{\\partial \\Sigma} \\vec{B} \\cdot d\\vec{\\ell} = \\mu_0 I_{\\text{enc}} + \\mu_0 \\varepsilon_0 \\frac{d\\Phi_E}{dt}');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner Analítico UCV - Modo Físico Teórico */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-cobalt-950 via-surface-900 to-slate-950 border border-cobalt-500/30 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt-500/10 border border-cobalt-500/30 text-cobalt-300 text-xs font-semibold">
              <AtomIcon className="w-4 h-4 text-cobalt-400 animate-spin" style={{ animationDuration: '16s' }} />
              UCV Facultad de Ciencias • Escuela de Física
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
              Módulo Analítico & Rigor Teórico: {user?.full_name || 'Santiago Rivero'}
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl font-sans">
              Entorno de deducción matemática formal con renderizado nativo LaTeX (KaTeX), calculadora científica de alta precisión y formulario de constantes universales.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-4 rounded-2xl bg-surface-950/80 border border-cobalt-500/30 shadow-lg">
              <p className="text-[10px] uppercase font-bold tracking-wider text-cobalt-400">Racha Analítica</p>
              <p className="text-2xl font-bold text-white font-mono">{user?.streak_days || 28} Días</p>
              <p className="text-[10px] text-slate-400">Fórmula diaria resuelta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Principal: Formulario LaTeX + Calculadora Científica Permanente */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda (8 cols): Renderizado de Fórmulas y Playground LaTeX */}
        <div className="xl:col-span-7 space-y-6">
          {/* Ecuaciones Fundamentales Renderizadas */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cobalt-950 border border-cobalt-600/30 text-cobalt-400">
                  <LayersIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Ecuaciones Teóricas Fundamentales</h3>
                  <p className="text-xs text-slate-400">Renderizadas en tiempo real con motor nativo KaTeX</p>
                </div>
              </div>
              <span className="cobalt-badge font-mono text-[11px]">
                KaTeX v0.16 Motor Activo
              </span>
            </div>

            <div className="space-y-4">
              {SANTIAGO_FORMULAS.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-surface-950/70 border border-white/[0.06] hover:border-cobalt-500/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-cobalt-400 uppercase tracking-wider">
                      {item.topic}
                    </span>
                    <button
                      onClick={() => copyToClipboard(item.latex, `formula-${index}`)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity"
                      title="Copiar código fuente LaTeX"
                    >
                      {copiedKey === `formula-${index}` ? (
                        <>
                          <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 text-[11px]">Copiado</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon className="w-3.5 h-3.5" />
                          <span className="text-[11px]">LaTeX</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h4 className="text-sm font-medium text-slate-200 mb-2">{item.title}</h4>

                  {/* Renderizado KaTeX */}
                  <div
                    className="p-3 bg-surface-900/90 border border-white/[0.04] rounded-lg text-white font-serif overflow-x-auto my-2"
                    dangerouslySetInnerHTML={{ __html: renderLatex(item.latex, true) }}
                  />

                  <p className="text-xs text-slate-400 mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Playground Interactivo de Fórmulas LaTeX */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-cobalt-400" />
                <h3 className="text-sm font-semibold text-white">Laboratorio de Sintaxis LaTeX Interactivo</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Vista Previa Inmediata</span>
            </div>

            <div className="space-y-3">
              <textarea
                value={customLatex}
                onChange={(e) => setCustomLatex(e.target.value)}
                placeholder="Escribe cualquier expresión matemática en LaTeX..."
                rows={2}
                className="w-full p-3 rounded-xl bg-surface-950 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cobalt-500 transition-colors"
              />

              <div className="p-4 rounded-xl bg-surface-900/90 border border-cobalt-600/30 text-white min-h-[64px] flex items-center justify-center overflow-x-auto shadow-inner">
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderLatex(customLatex || '\\text{Escribe una fórmula arriba...}', true),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Constantes Físicas Universales */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-white mb-3">Prontuario de Constantes Físicas Universales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PHYSICS_CONSTANTS.map((c, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-surface-950/60 border border-white/[0.06] flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-200">{c.name}</p>
                    <p className="text-xs font-mono text-cobalt-300 mt-0.5">{c.value}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(c.value, `const-${i}`)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                    title="Copiar valor"
                  >
                    {copiedKey === `const-${i}` ? (
                      <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <CopyIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna Derecha (5 cols): Calculadora Científica Permanente Integrada */}
        <div className="xl:col-span-5 sticky top-24 space-y-6">
          <ScientificCalculator isEmbedded={true} />

          {/* Próxima integración con Gemini para PDFs de Física */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-surface-950 to-cobalt-950/40 border border-cobalt-600/30 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cobalt-400 animate-pulse" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Módulo Futuro: Gemini AI + PDFs
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Preparado para leer tus guías de cálculo vectorial y problemas de mecánica analítica mediante Supabase Storage y generar deducciones paso a paso.
            </p>
            <div className="p-2.5 rounded-xl bg-surface-900/80 border border-white/[0.06] text-[11px] text-cobalt-300 font-mono">
              ✦ Backend endpoint: /api/gemini/analyze-math-doc
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
