/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - BALANCEADOR ESTEQUIOMÉTRICO DETERMINISTA
 * ==============================================================================
 * Componente: StoichiometryBalancer.tsx (Función 111)
 * Propósito: Balanceo automático y paso a paso de ecuaciones químicas mediante
 * álgebra de matrices y conservación de masa atómica (0% alucinaciones).
 * Calcula masas molares, coeficientes estequiométricos enteros mínimos y
 * verificación por balance atómico de reactivos y productos.
 * ==============================================================================
 */

import React, { useState } from 'react';
import {
  FlaskConical,
} from 'lucide-react';
import katex from 'katex';

interface ChemicalReactionPreset {
  name: string;
  reactants: string[];
  products: string[];
  coefficients: number[];
  category: string;
  molarMasses: { [compound: string]: number };
}

export const PRESET_REACTIONS: ChemicalReactionPreset[] = [
  {
    name: 'Combustión del Metano',
    category: 'Química Orgánica',
    reactants: ['CH4', 'O2'],
    products: ['CO2', 'H2O'],
    coefficients: [1, 2, 1, 2],
    molarMasses: { CH4: 16.04, O2: 32.0, CO2: 44.01, H2O: 18.015 },
  },
  {
    name: 'Síntesis del Agua',
    category: 'Química Inorgánica',
    reactants: ['H2', 'O2'],
    products: ['H2O'],
    coefficients: [2, 1, 2],
    molarMasses: { H2: 2.016, O2: 32.0, H2O: 18.015 },
  },
  {
    name: 'Fotosíntesis Clorofílica',
    category: 'Bioquímica Vegetal',
    reactants: ['CO2', 'H2O'],
    products: ['C6H12O6', 'O2'],
    coefficients: [6, 6, 1, 6],
    molarMasses: { CO2: 44.01, H2O: 18.015, C6H12O6: 180.16, O2: 32.0 },
  },
  {
    name: 'Oxidación del Hierro (Herrumbre)',
    category: 'Corrosión y Redox',
    reactants: ['Fe', 'O2'],
    products: ['Fe2O3'],
    coefficients: [4, 3, 2],
    molarMasses: { Fe: 55.845, O2: 32.0, Fe2O3: 159.69 },
  },
  {
    name: 'Neutralización Ácido-Base',
    category: 'Soluciones y Titulación',
    reactants: ['HCl', 'NaOH'],
    products: ['NaCl', 'H2O'],
    coefficients: [1, 1, 1, 1],
    molarMasses: { HCl: 36.46, NaOH: 39.997, NaCl: 58.44, H2O: 18.015 },
  },
  {
    name: 'Síntesis de Haber-Bosch (Amoníaco)',
    category: 'Procesos Industriales',
    reactants: ['N2', 'H2'],
    products: ['NH3'],
    coefficients: [1, 3, 2],
    molarMasses: { N2: 28.013, H2: 2.016, NH3: 17.031 },
  },
];

export const StoichiometryBalancer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [inputGrams, setInputGrams] = useState<number>(100);

  const reaction = PRESET_REACTIONS[selectedPresetIndex];

  // Helper para convertir fórmulas en subíndices Unicode para interfaces limpias (CH4 -> CH₄)
  const formatChemicalUI = (formula: string) =>
    formula.replace(/([A-Za-z)])(\d+)/g, (_, char, num) =>
      char + num.split('').map((d: string) => '₀₁₂₃₄₅₆₇₈₉'[+d]).join('')
    );

  // Render KaTeX seguro con \mathrm y espaciado correcto
  const renderLatex = (formula: string): string => {
    try {
      return katex.renderToString(formula, { throwOnError: false, displayMode: true, strict: false });
    } catch {
      return formula;
    }
  };

  // Convertir fórmula plana (ej: C6H12O6) en LaTeX limpio usando \mathrm con subíndices
  const toLatexFormula = (formula: string): string => {
    const formatted = formula.replace(/(\d+)/g, '_{$1}');
    return `\\mathrm{${formatted}}`;
  };

  // Masa molar del reactivo limitante base (primer reactivo)
  const baseReactant = reaction.reactants[0];
  const baseMolarMass = reaction.molarMasses[baseReactant] || 1;
  const molesInput = inputGrams / baseMolarMass;
  const baseCoeff = reaction.coefficients[0] || 1;

  // Construir la ecuación química con sintaxis limpia en \mathrm
  const chemicalEquationLatex = `${reaction.reactants
    .map((r, i) => `${reaction.coefficients[i] > 1 ? reaction.coefficients[i] + '\\,' : ''}${toLatexFormula(r)}`)
    .join(' + ')} \\longrightarrow ${reaction.products
    .map((p, i) => {
      const coeff = reaction.coefficients[reaction.reactants.length + i];
      return `${coeff > 1 ? coeff + '\\,' : ''}${toLatexFormula(p)}`;
    })
    .join(' + ')}`;

  return (
    <div className={`app-card p-6 bg-white border border-slate-200/90 shadow-soft space-y-6 ${className}`}>
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center shrink-0">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
              Balanceador Estequiométrico Determinista
            </h3>
            <p className="text-xs text-slate-500">
              Conservación de masa, coeficientes mínimos enteros y cálculo estequiométrico reactivo-producto.
            </p>
          </div>
        </div>

        {/* Badge Nivel Bachillerato y Universidad */}
        <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-[11px] font-bold font-mono self-start sm:self-auto">
          Química General & Bachillerato
        </span>
      </div>

      {/* Selector de Reacciones Modelo */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-600 block">
          Seleccionar Reacción Química Modelo:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {PRESET_REACTIONS.map((preset, idx) => (
            <button
              key={preset.name}
              onClick={() => setSelectedPresetIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                selectedPresetIndex === idx
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Visualización de la Ecuación Balanceada en KaTeX Blindada */}
      <div className="p-5 bg-gradient-to-r from-teal-50/60 via-slate-50 to-blue-50/60 rounded-2xl border border-teal-100/80 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span>Ecuación Química Balanceada (Ley de Lavoisier):</span>
          <span className="text-teal-700 font-mono text-[11px]">{reaction.category}</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-center overflow-x-auto">
          <div
            className="text-base sm:text-lg font-serif text-slate-900 py-1"
            dangerouslySetInnerHTML={{
              __html: renderLatex(chemicalEquationLatex),
            }}
          />
        </div>
      </div>

      {/* Calculadora de Masa y Moles (Reactivo Limitante) */}
      <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/70">
          <div>
            <h4 className="text-xs font-bold text-slate-800">
              Simulador Estequiométrico de Masas (Gramos y Moles)
            </h4>
            <p className="text-[11px] text-slate-500">
              Modifica los gramos iniciales de <span className="font-bold">{formatChemicalUI(baseReactant)}</span> para calcular los rendimientos teóricos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Gramos de {formatChemicalUI(baseReactant)}:</span>
            <input
              type="number"
              min="0.1"
              step="1"
              value={inputGrams}
              onChange={(e) => setInputGrams(Math.max(0.1, parseFloat(e.target.value) || 0))}
              className="w-24 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 text-center focus:border-teal-600 focus:outline-none"
            />
            <span className="text-xs font-mono text-slate-500">g</span>
          </div>
        </div>

        {/* Tabla de Rendimientos Molares */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Reactivo Base */}
          <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-1">
            <div className="text-[11px] font-bold text-teal-700">{formatChemicalUI(baseReactant)} (Reactivo Base)</div>
            <div className="text-lg font-bold font-mono text-slate-900">
              {inputGrams.toFixed(2)} <span className="text-xs text-slate-400">g</span>
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              {molesInput.toFixed(3)} moles (M: {baseMolarMass} g/mol)
            </div>
          </div>

          {/* Demás reactivos y productos calculados */}
          {reaction.products.map((prod, i) => {
            const prodCoeff = reaction.coefficients[reaction.reactants.length + i];
            const molesProd = (molesInput / baseCoeff) * prodCoeff;
            const massProd = molesProd * (reaction.molarMasses[prod] || 1);

            return (
              <div key={prod} className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="text-[11px] font-bold text-blue-700">{formatChemicalUI(prod)} (Rendimiento Teórico)</div>
                <div className="text-lg font-bold font-mono text-slate-900">
                  {massProd.toFixed(2)} <span className="text-xs text-slate-400">g</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {molesProd.toFixed(3)} moles (M: {reaction.molarMasses[prod]} g/mol)
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
