/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - LABORATORIO DE CIENCIAS NATURALES
 * ==============================================================================
 * Vista especializada e independiente para Química, Biología y Ciencias Naturales:
 * - Balanceo estequiométrico de reacciones químicas.
 * - Tabla periódica interactiva con propiedades periódicas.
 * - Calculadora analítica de pH, pOH y molaridad de disoluciones.
 * - Simulador genético de herencia mendeliana con cuadros de Punnett.
 * 
 * Estética: Apple Minimalist / High Contrast con elevación difusa y radios concéntricos.
 * ==============================================================================
 */

import React, { useState } from 'react';
import { FlaskConical, Atom, Dna, Droplets } from 'lucide-react';
import { StoichiometryBalancer } from '../tools/StoichiometryBalancer';
import { InteractivePeriodicTable } from '../tools/InteractivePeriodicTable';
import { PhMolarityCalculator } from '../tools/PhMolarityCalculator';
import { MendelianGeneticsSimulator } from '../tools/MendelianGeneticsSimulator';

type ScienceSubTab = 'STOICH' | 'PERIODIC' | 'PH_MOL' | 'GENETICS';

export const ScienceLabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ScienceSubTab>('STOICH');

  const subTabs = [
    {
      id: 'STOICH' as ScienceSubTab,
      label: 'Estequiometría',
      subtitle: 'Balanceo de masa & reactivos',
      icon: <FlaskConical className="w-4 h-4" />,
    },
    {
      id: 'PERIODIC' as ScienceSubTab,
      label: 'Tabla Periódica',
      subtitle: 'Electronegatividad & orbitales',
      icon: <Atom className="w-4 h-4" />,
    },
    {
      id: 'PH_MOL' as ScienceSubTab,
      label: 'pH & Molaridad',
      subtitle: 'Ácido-base & disoluciones',
      icon: <Droplets className="w-4 h-4" />,
    },
    {
      id: 'GENETICS' as ScienceSubTab,
      label: 'Genética Mendeliana',
      subtitle: 'Cuadros de Punnett & alelos',
      icon: <Dna className="w-4 h-4" />,
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Encabezado Editorial de Alto Contraste */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="app-badge font-mono text-[11px] font-bold">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
              Módulo de Ciencias Puras & Aplicadas
            </span>
            <span className="text-xs font-mono text-slate-400">
              📌 Fijado en Barra Lateral
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight font-display text-slate-900">
            Laboratorio de Ciencias Naturales
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Herramientas analíticas para química inorgánica, estequiometría molecular, biofísica y genética.
          </p>
        </div>

        {/* Selector de Herramientas del Laboratorio */}
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
        {activeTab === 'STOICH' && <StoichiometryBalancer />}
        {activeTab === 'PERIODIC' && <InteractivePeriodicTable />}
        {activeTab === 'PH_MOL' && <PhMolarityCalculator />}
        {activeTab === 'GENETICS' && <MendelianGeneticsSimulator />}
      </div>
    </div>
  );
};
