/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - CALCULADORA DE PH Y CONCENTRACIONES
 * ==============================================================================
 * Componente: PhMolarityCalculator.tsx (Función 113)
 * Propósito: Módulo determinista de cálculo de química cuantitativa:
 * 1. Cálculo de pH y pOH: pH = -log10[H+], pOH = -log10[OH-], pH + pOH = 14
 * 2. Concentración de iones H3O+ y OH- en notación científica.
 * 3. Clasificación de acidez: Fuertemente ácido, ácido débil, neutro, básico débil, fuertemente básico.
 * 4. Calculadora de Molaridad (M): M = n / V = (masa / masa_molar) / Litros.
 * ==============================================================================
 */

import React, { useState } from 'react';
import {
  Droplets,
  Activity,
  Calculator,
} from 'lucide-react';
import katex from 'katex';

export const PhMolarityCalculator: React.FC<{ className?: string }> = ({ className = '' }) => {
  // Estado pH
  const [phValue, setPhValue] = useState<number>(7.0);

  // Estado Molaridad
  const [soluteMassGrams, setSoluteMassGrams] = useState<number>(58.44); // ej: NaCl
  const [molarMassGramsMol, setMolarMassGramsMol] = useState<number>(58.44);
  const [solutionVolumeMl, setSolutionVolumeMl] = useState<number>(1000);

  // Cálculos pH
  const pOH = 14 - phValue;
  const hPlus = Math.pow(10, -phValue);
  const ohMinus = Math.pow(10, -pOH);

  // Clasificación cualitativa
  const getAcidityLevel = (ph: number) => {
    if (ph < 3) return { label: 'Fuertemente Ácido', color: 'text-rose-700 bg-rose-50 border-rose-200' };
    if (ph < 6.5) return { label: 'Moderadamente Ácido', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (ph <= 7.5) return { label: 'Neutro (Agua Pura)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (ph < 11.5) return { label: 'Moderadamente Básico', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    return { label: 'Fuertemente Alcalino / Básico', color: 'text-purple-700 bg-purple-50 border-purple-200' };
  };

  const acidity = getAcidityLevel(phValue);

  // Cálculos Molaridad
  const molesSolute = molarMassGramsMol > 0 ? soluteMassGrams / molarMassGramsMol : 0;
  const volumeLiters = solutionVolumeMl / 1000;
  const molarity = volumeLiters > 0 ? molesSolute / volumeLiters : 0;

  // Render KaTeX seguro
  const renderLatex = (formula: string): string => {
    try {
      return katex.renderToString(formula, { throwOnError: false, displayMode: false });
    } catch {
      return formula;
    }
  };

  return (
    <div className={`app-card p-6 bg-white border border-slate-200/90 shadow-soft space-y-6 ${className}`}>
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-100 flex items-center justify-center shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
              Calculadora de pH, pOH y Molaridad Química
            </h3>
            <p className="text-xs text-slate-500">
              Soluciones acuosas, escala logarítmica de acidez y preparación de disoluciones de laboratorio.
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-[11px] font-bold font-mono self-start sm:self-auto">
          Química Analítica & Bachillerato
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PANEL 1: ESCALA DE PH Y POH */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-600" />
              1. Escala Logarítmica de pH
            </h4>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${acidity.color}`}>
              {acidity.label}
            </span>
          </div>

          {/* Slider Interactivo de pH */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-rose-600 font-bold">0.0 (Ácido)</span>
              <span className="text-2xl font-extrabold font-sans text-slate-900">pH = {phValue.toFixed(2)}</span>
              <span className="text-purple-600 font-bold">14.0 (Básico)</span>
            </div>
            <input
              type="range"
              min="0"
              max="14"
              step="0.05"
              value={phValue}
              onChange={(e) => setPhValue(parseFloat(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer"
            />
          </div>

          {/* Tarjetas de Concentraciones de Iones */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-rose-600">[H₃O⁺] Hidronio:</span>
              <div className="text-sm font-mono font-bold text-slate-900">
                {hPlus.toExponential(3)} M
              </div>
              <div className="text-[10px] text-slate-400 font-serif">
                10^({(-phValue).toFixed(2)})
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-blue-600">[OH⁻] Hidróxido:</span>
              <div className="text-sm font-mono font-bold text-slate-900">
                {ohMinus.toExponential(3)} M
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                pOH = {pOH.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Demostración KaTeX */}
          <div className="p-3 bg-white rounded-xl border border-slate-200/70 text-center">
            <div
              className="text-xs text-slate-800"
              dangerouslySetInnerHTML={{
                __html: renderLatex(
                  `\\text{pH} + \\text{pOH} = 14 \\implies ${phValue.toFixed(1)} + ${pOH.toFixed(1)} = 14.0`
                ),
              }}
            />
          </div>
        </div>

        {/* PANEL 2: CALCULADORA DE MOLARIDAD (M) */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-[#0F52BA]" />
              2. Molaridad de Disoluciones (M)
            </h4>
            <span className="font-mono text-xs font-bold text-[#0F52BA]">
              M = n / V
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Masa de Soluto (gramos):
              </label>
              <input
                type="number"
                min="0.01"
                step="0.1"
                value={soluteMassGrams}
                onChange={(e) => setSoluteMassGrams(Math.max(0.01, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:border-[#0F52BA] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Masa Molar (g/mol):
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={molarMassGramsMol}
                  onChange={(e) => setMolarMassGramsMol(Math.max(0.1, parseFloat(e.target.value) || 1))}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:border-[#0F52BA] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Volumen Solución (mL):
                </label>
                <input
                  type="number"
                  min="1"
                  step="50"
                  value={solutionVolumeMl}
                  onChange={(e) => setSolutionVolumeMl(Math.max(1, parseFloat(e.target.value) || 1))}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:border-[#0F52BA] focus:outline-none"
                />
              </div>
            </div>

            {/* Resultado de la Molaridad */}
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500 block">Concentración Molar Resultante:</span>
                <span className="text-xl font-extrabold font-mono text-[#0F52BA]">
                  {molarity.toFixed(4)} <span className="text-xs">mol/L (M)</span>
                </span>
              </div>
              <div className="text-right text-[11px] text-slate-500 font-mono">
                {molesSolute.toFixed(3)} moles en {(volumeLiters).toFixed(2)} L
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
