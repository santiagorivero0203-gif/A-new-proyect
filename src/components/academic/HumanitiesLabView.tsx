/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - LABORATORIO DE HUMANIDADES & LENGUAJE
 * ==============================================================================
 * Vista especializada e independiente para Castellano, Literatura y Técnicas de Lectura:
 * - Analizador sintáctico de oraciones (sujeto, predicado, complementos).
 * - Entrenador pedagógico de comprensión lectora crítica.
 * - Flashcards con algoritmo de repetición espaciada (SRS).
 * - Cronómetro y velocímetro de lectura rápida (PPM).
 * 
 * Estética: Editorial / Alto Contraste tipográfico con respeto por el espacio blanco.
 * ==============================================================================
 */

import React, { useState } from 'react';
import { BookOpen, Brain, Clock, GraduationCap } from 'lucide-react';
import { SentenceSyntaxAnalyzer } from './SentenceSyntaxAnalyzer';
import { ReadingComprehensionTrainer } from './ReadingComprehensionTrainer';
import { SpacedRepetitionFlashcards } from './SpacedRepetitionFlashcards';
import { SpeedReadingTimer } from './SpeedReadingTimer';

type HumanitiesSubTab = 'SYNTAX' | 'COMPREHENSION' | 'FLASHCARDS' | 'SPEED_READING';

export const HumanitiesLabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HumanitiesSubTab>('SYNTAX');

  const subTabs = [
    {
      id: 'SYNTAX' as HumanitiesSubTab,
      label: 'Análisis Sintáctico',
      subtitle: 'Sintagmas & funciones gramaticales',
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      id: 'COMPREHENSION' as HumanitiesSubTab,
      label: 'Comprensión Lectora',
      subtitle: 'Lectura crítica & inferencias',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'FLASHCARDS' as HumanitiesSubTab,
      label: 'Flashcards Leitner',
      subtitle: 'Repetición espaciada activa',
      icon: <Brain className="w-4 h-4" />,
    },
    {
      id: 'SPEED_READING' as HumanitiesSubTab,
      label: 'Lectura Rápida',
      subtitle: 'Velocímetro PPM & campo visual',
      icon: <Clock className="w-4 h-4" />,
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Encabezado Editorial */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="app-badge font-mono text-[11px] font-bold">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              Módulo de Lenguaje, Semántica & Retórica
            </span>
            <span className="text-xs font-mono text-slate-400">
              📌 Fijado en Barra Lateral
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight font-display text-slate-900">
            Humanidades & Dominio Lingüístico
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Estructuras gramaticales complejas, velocidad de procesamiento lector y memorización a largo plazo.
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
        {activeTab === 'SYNTAX' && <SentenceSyntaxAnalyzer />}
        {activeTab === 'COMPREHENSION' && <ReadingComprehensionTrainer />}
        {activeTab === 'FLASHCARDS' && <SpacedRepetitionFlashcards />}
        {activeTab === 'SPEED_READING' && <SpeedReadingTimer />}
      </div>
    </div>
  );
};
