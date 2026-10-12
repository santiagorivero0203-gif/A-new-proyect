import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AtomIcon, CopyIcon, CheckCircleIcon, SparklesIcon, LayersIcon, CalculatorIcon } from '../common/Icons';
import { ScientificCalculator } from './ScientificCalculator';
import { PHYSICS_CONSTANTS, SANTIAGO_FORMULAS } from '../../lib/mockData';
import { renderLatex } from '../../utils/latexRenderer';

/**
 * Dashboard Analítico de Santiago (Escuela de Física UCV)
 * Formulado bajo la estética clara y sofisticada de Invoficlib.
 * Incluye formulario LaTeX dinámico, constantes universales y acceso rápido
 * a la calculadora científica analítica.
 */
export const SantiagoDashboard: React.FC = () => {
  const { user } = useAuth();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [customLatex, setCustomLatex] = useState<string>(
    '\\oint_{\\partial \\Sigma} \\vec{B} \\cdot d\\vec{\\ell} = \\mu_0 I_{\\text{enc}} + \\mu_0 \\varepsilon_0 \\frac{d\\Phi_E}{dt}'
  );

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Banner Analítico UCV - Estilo Invoficlib */}
      <div className="app-card p-6 sm:p-8 bg-white border border-slate-200/90 shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
            <AtomIcon className="w-3.5 h-3.5" />
            UCV Facultad de Ciencias • Escuela de Física
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
            Módulo Analítico & Rigor Teórico: {user?.full_name || 'Santiago'} ⚛️
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl font-sans">
            Entorno de deducción matemática formal con renderizado nativo LaTeX (KaTeX), calculadora científica accesible y prontuario de constantes universales.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center min-w-[130px]">
            <p className="text-[10px] uppercase font-bold tracking-wider text-blue-600">
              Racha Analítica
            </p>
            <p className="text-2xl font-bold text-slate-900 font-mono mt-0.5">
              {user?.streak_days || 28} Días
            </p>
            <p className="text-[10px] text-slate-500">Fórmulas verificadas</p>
          </div>
        </div>
      </div>

      {/* Grid Principal: Fórmulas Teóricas + Calculadora Científica */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda (7 cols): Renderizado de Fórmulas y Playground LaTeX */}
        <div className="xl:col-span-7 space-y-6">
          {/* Ecuaciones Fundamentales Renderizadas */}
          <div className="app-card p-6 border border-slate-200/80">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <LayersIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Ecuaciones Teóricas Fundamentales</h3>
                  <p className="text-xs text-slate-500">Renderizadas en tiempo real con motor KaTeX</p>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                KaTeX v0.16
              </span>
            </div>

            <div className="space-y-4">
              {SANTIAGO_FORMULAS.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                      {item.topic}
                    </span>
                    <button
                      onClick={() => copyToClipboard(item.latex, `formula-${index}`)}
                      className="text-xs text-slate-400 hover:text-slate-800 flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity"
                      title="Copiar código fuente LaTeX"
                    >
                      {copiedKey === `formula-${index}` ? (
                        <>
                          <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 text-[11px] font-bold">Copiado</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-mono">LaTeX</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mb-2">{item.title}</h4>

                  {/* Renderizado KaTeX */}
                  <div
                    className="p-3 bg-white border border-slate-200/90 rounded-xl text-slate-900 overflow-x-auto my-2 shadow-soft-sm"
                    dangerouslySetInnerHTML={{ __html: renderLatex(item.latex, true) }}
                  />

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Playground Interactivo de Fórmulas LaTeX */}
          <div className="app-card p-6 border border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Laboratorio de Sintaxis LaTeX</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Render Dinámico</span>
            </div>

            <div className="space-y-3">
              <textarea
                value={customLatex}
                onChange={(e) => setCustomLatex(e.target.value)}
                placeholder="Escribe cualquier expresión matemática en LaTeX..."
                rows={2}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />

              <div className="p-4 rounded-xl bg-white border border-slate-200 text-slate-900 min-h-[64px] flex items-center justify-center overflow-x-auto shadow-soft-sm">
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderLatex(customLatex || '\\text{Escribe una fórmula arriba...}', true),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Constantes Físicas Universales */}
          <div className="app-card p-6 border border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Constantes Físicas Universales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PHYSICS_CONSTANTS.map((c, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{c.name}</p>
                    <p className="text-xs font-mono text-blue-700 font-bold mt-0.5">{c.value}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(c.value, `const-${i}`)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                    title="Copiar valor"
                  >
                    {copiedKey === `const-${i}` ? (
                      <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
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

          {/* Tarjeta Informativa de Integración */}
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-900">
              <CalculatorIcon className="w-4 h-4 text-blue-600" />
              <span>Calculadora Flotante Siempre Disponible</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              También puedes utilizar la calculadora desde el botón flotante inferior en cualquier momento durante un simulador de examen o mientras lees una guía, sin perder tu avance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
