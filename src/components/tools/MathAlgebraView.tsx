/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - CÁLCULO, ÁLGEBRA & VECTORES
 * ==============================================================================
 * Vista especializada de herramientas analíticas cuantitativas:
 * - Calculadora científica con precisión trigonométrica y constantes.
 * - Solucionador interactivo de sistemas de ecuaciones lineales 2x2.
 * - Calculadora y visualizador de operaciones vectoriales 2D/3D.
 * 
 * Estética: Precisión matemática, tipografía monoespaciada para datos y radios concéntricos.
 * ==============================================================================
 */

import React, { useState } from 'react';
import { Calculator, Compass, Binary } from 'lucide-react';
import { ScientificCalculator } from '../dashboards/ScientificCalculator';
import { LinearEquationSolver } from './LinearEquationSolver';
import { VectorCalculatorWidget } from './VectorCalculatorWidget';

type MathSubTab = 'CALCULATOR' | 'EQUATIONS' | 'VECTORS';

export const MathAlgebraView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MathSubTab>('CALCULATOR');

  const subTabs = [
    {
      id: 'CALCULATOR' as MathSubTab,
      label: 'Calculadora Científica',
      subtitle: 'Trigonometría & logaritmos',
      icon: <Calculator className="w-4 h-4" />,
    },
    {
      id: 'EQUATIONS' as MathSubTab,
      label: 'Ecuaciones 2x2',
      subtitle: 'Sistemas lineales paso a paso',
      icon: <Binary className="w-4 h-4" />,
    },
    {
      id: 'VECTORS' as MathSubTab,
      label: 'Álgebra Vectorial',
      subtitle: 'Producto escalar, vectorial y módulos',
      icon: <Compass className="w-4 h-4" />,
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Encabezado Editorial */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="app-badge font-mono text-[11px] font-bold">
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              Módulo Cuantitativo & Analítico
            </span>
            <span className="text-xs font-mono text-slate-400">
              📌 Fijado en Barra Lateral
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight font-display text-slate-900">
            Cálculo, Álgebra & Análisis Vectorial
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Herramientas numéricas exactas para cálculo diferencial, física analítica y sistemas lineales.
          </p>
        </div>

        {/* Selector de Sub-herramientas */}
        <div className="flex flex-wrap gap-2">
          {subTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-soft-xs active:scale-[0.98] ${
                  isActive
                    ? 'btn-brand text-white shadow-soft-md'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Renderizado de la Herramienta Seleccionada */}
      <div className="transition-opacity duration-200">
        {activeTab === 'CALCULATOR' && (
          <div className="max-w-2xl mx-auto">
            <ScientificCalculator isEmbedded={false} />
          </div>
        )}
        {activeTab === 'EQUATIONS' && <LinearEquationSolver />}
        {activeTab === 'VECTORS' && <VectorCalculatorWidget />}
      </div>
    </div>
  );
};
