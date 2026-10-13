import React, { useState } from 'react';
import type {
  DeconstructedAcademicGuide,
} from '../../types/deconstruction.types';
import { convertDeconstructedToQuestions } from '../../types/deconstruction.types';
import type { Question } from '../../types/exam.types';
import { renderLatex } from '../../utils/latexRenderer';
import {
  SparklesIcon,
  PlayIcon,
  BookOpenIcon,
  XIcon,
  CheckCircleIcon,
  LayersIcon,
} from '../common/Icons';

export interface DeconstructedGuideViewProps {
  guide: DeconstructedAcademicGuide;
  onClose?: () => void;
  onStartExamWithQuestions?: (questions: Question[], title: string) => void;
}

type TabType =
  | 'THEORY'
  | 'GLOSSARY'
  | 'FORMULAS'
  | 'STEP_BY_STEP'
  | 'ALERTS'
  | 'STUDY_TECHNIQUES'
  | 'EVALUATION';

/**
 * Componente Editorial de Guía de Estudio Hiper-Compleja
 * Renderiza el núcleo pedagógico deconstruido en 7 pilares con soporte KaTeX,
 * flashcards interactivas de Active Recall, cuadrícula Cornell y lanzamiento
 * directo al SimulatorEngine.
 */
export const DeconstructedGuideView: React.FC<DeconstructedGuideViewProps> = ({
  guide,
  onClose,
  onStartExamWithQuestions,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('THEORY');

  // Estado para Flashcards de Active Recall
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  // Estado para justificaciones de preguntas desplegables
  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState<number | null>(null);

  const {
    guideMetadata,
    phenomenonAndTheory,
    glossary,
    formulasAndStrategies,
    stepByStepExamples,
    commonErrorsAlerts,
    studyTechniquesHub,
    generatedQuestions,
  } = guide;

  const totalQuestions = generatedQuestions?.length || 0;
  const flashcards = studyTechniquesHub?.activeRecallFlashcards || [];
  const currentCard = flashcards[flashcardIndex];

  /**
   * Conecta directamente con el Simulador de Exámenes
   */
  const handleLaunchSimulator = () => {
    if (!onStartExamWithQuestions || totalQuestions === 0) return;
    const adaptedQuestions = convertDeconstructedToQuestions(
      generatedQuestions,
      guideMetadata.title
    );
    onStartExamWithQuestions(
      adaptedQuestions,
      `Simulación: ${guideMetadata.title}`
    );
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-soft flex flex-col max-h-[92vh] overflow-hidden animate-fadeIn">
      {/* 1. CABECERA EDITORIAL PRINCIPAL (Menos, pero Mejor + Acento Cobalto) */}
      <div className="p-5 sm:p-6 bg-slate-50/60 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0F52BA] border border-blue-200/70 text-xs font-semibold">
              <SparklesIcon className="w-3.5 h-3.5 text-[#0F52BA]" />
              Guía Hiper-Compleja Deconstruida
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 text-xs font-semibold">
              {guideMetadata.area || 'Ciencias & Humanidades'}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              7 Pilares Pedagógicos
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans truncate">
            {guideMetadata.title}
          </h1>

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 max-w-3xl">
            {guideMetadata.summary}
          </p>
        </div>

        {/* Acciones de Cabecera: Botón Cobalto Principal & Cerrar */}
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
          {totalQuestions > 0 && onStartExamWithQuestions && (
            <button
              onClick={handleLaunchSimulator}
              className="bg-[#0F52BA] hover:bg-[#0c4396] active:scale-[0.98] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center gap-2 group cursor-pointer"
              title="Iniciar simulación de examen de este tema"
            >
              <PlayIcon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Simular Examen de este Tema ({totalQuestions})</span>
            </button>
          )}

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
              title="Cerrar vista de la guía"
            >
              <XIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. BARRA DE PESTAÑAS (7 Pilares de la Anatomía Pedagógica) */}
      <div className="px-4 sm:px-6 border-b border-slate-200 bg-white flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-1">
        <button
          onClick={() => setActiveTab('THEORY')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'THEORY'
              ? 'bg-slate-900 text-white shadow-soft-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>1. Teoría & Sustancia</span>
        </button>

        <button
          onClick={() => setActiveTab('GLOSSARY')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'GLOSSARY'
              ? 'bg-slate-900 text-white shadow-soft-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>2. Glosario & Unidades</span>
          <span className="text-[10px] opacity-75">({glossary?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('FORMULAS')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'FORMULAS'
              ? 'bg-slate-900 text-white shadow-soft-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>3. Fórmulas & Reglas</span>
          <span className="text-[10px] opacity-75">
            ({formulasAndStrategies?.coreFormulas?.length || 0})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('STEP_BY_STEP')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'STEP_BY_STEP'
              ? 'bg-slate-900 text-white shadow-soft-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>4. Deducción Paso a Paso</span>
          <span className="text-[10px] opacity-75">
            ({stepByStepExamples?.length || 0})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('ALERTS')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'ALERTS'
              ? 'bg-amber-600 text-white shadow-soft-sm'
              : 'text-amber-800 hover:bg-amber-50'
          }`}
        >
          <span>5. Alertas & Trampas</span>
          <span className="text-[10px] opacity-75">
            ({commonErrorsAlerts?.length || 0})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('STUDY_TECHNIQUES')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'STUDY_TECHNIQUES'
              ? 'bg-[#0F52BA] text-white shadow-soft-sm'
              : 'text-[#0F52BA] hover:bg-blue-50'
          }`}
        >
          <LayersIcon className="w-3.5 h-3.5" />
          <span>6. Técnicas de Estudio</span>
        </button>

        <button
          onClick={() => setActiveTab('EVALUATION')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'EVALUATION'
              ? 'bg-emerald-700 text-white shadow-soft-sm'
              : 'text-emerald-800 hover:bg-emerald-50'
          }`}
        >
          <span>7. Autoevaluación</span>
          <span className="text-[10px] opacity-75">({totalQuestions})</span>
        </button>
      </div>

      {/* 3. ÁREA DE CONTENIDO PRINCIPAL (SCROLLEABLE) */}
      <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800 font-sans">
        {/* PILAR 1: TEORÍA Y SUSTANCIA DEL FENÓMENO */}
        {activeTab === 'THEORY' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="border-l-4 border-[#0F52BA] pl-4 py-1">
              <h2 className="text-base font-bold text-slate-900">
                1. Introducción al Fenómeno y Sustancia Teórica
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Explicación rigurosa de la mecánica interna del fenómeno con notación matemática formal
              </p>
            </div>

            {/* Desarrollo Teórico con KaTeX */}
            <div
              className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed font-sans space-y-4"
              dangerouslySetInnerHTML={{
                __html: renderLatex(phenomenonAndTheory),
              }}
            />

            {/* Banner de Acción Inmediata hacia Técnicas */}
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-900">
              <div className="flex items-center gap-2">
                <span className="text-base">💡</span>
                <span>¿Comprendes la mecánica del fenómeno? Ponla a prueba con las flashcards activas.</span>
              </div>
              <button
                onClick={() => setActiveTab('STUDY_TECHNIQUES')}
                className="px-3 py-1.5 rounded-xl bg-white border border-blue-300 text-[#0F52BA] font-bold hover:bg-blue-50 transition-colors shrink-0"
              >
                Ir a Flashcards de Evocación →
              </button>
            </div>
          </div>
        )}

        {/* PILAR 2: GLOSARIO TÉCNICO Y UNIDADES DEL SISTEMA INTERNACIONAL */}
        {activeTab === 'GLOSSARY' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="border-l-4 border-[#0F52BA] pl-4 py-1">
              <h2 className="text-base font-bold text-slate-900">
                2. Glosario Técnico y Unidades en el Sistema Internacional (SI)
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Definiciones precisas de variables, operadores y constantes académicas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {glossary?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm space-y-2 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-bold text-slate-900 font-sans">
                      {item.term}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded-lg bg-blue-50 text-[#0F52BA] border border-blue-200/70 font-mono text-[11px] font-semibold shrink-0"
                      dangerouslySetInnerHTML={{
                        __html: renderLatex(item.symbolOrUnit),
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PILAR 3: FÓRMULAS, PATRONES Y REGLAS MNEMOTÉCNICAS */}
        {activeTab === 'FORMULAS' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="border-l-4 border-[#0F52BA] pl-4 py-1">
              <h2 className="text-base font-bold text-slate-900">
                3. Fórmulas Fundamentales, Patrones & Reglas Mnemotécnicas
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Ecuaciones rectoras y trucos cognitivos para identificación inmediata en exámenes
              </p>
            </div>

            {/* Tarjetas de Fórmulas con Acento Cobalto */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                Ecuaciones Fundamentales (KaTeX)
              </h3>
              <div className="space-y-3">
                {formulasAndStrategies?.coreFormulas?.map((formula, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border-l-4 border-l-[#0F52BA] border border-slate-200/80 shadow-soft-sm space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 font-sans">
                        {formula.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#0F52BA] bg-blue-50 px-2 py-0.5 rounded-md font-semibold">
                        Expresión Central
                      </span>
                    </div>

                    <div
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 overflow-x-auto text-slate-900 text-center"
                      dangerouslySetInnerHTML={{
                        __html: renderLatex(formula.latex, true),
                      }}
                    />

                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      <strong className="text-slate-800">Cuándo y cómo usarla: </strong>
                      {formula.application}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mnemotécnicas y Patrones */}
            {formulasAndStrategies?.mnemonicsAndPatterns?.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-200/80">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                  Estrategias de Patrones & Trucos Lógicos
                </h3>
                <div className="space-y-2.5">
                  {formulasAndStrategies.mnemonicsAndPatterns.map((mnemonic, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0F52BA] flex items-center justify-center font-bold text-[11px] shrink-0">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed font-sans pt-0.5">{mnemonic}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PILAR 4: RESOLUCIÓN DEDUCTIVA PASO A PASO */}
        {activeTab === 'STEP_BY_STEP' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="border-l-4 border-[#0F52BA] pl-4 py-1">
              <h2 className="text-base font-bold text-slate-900">
                4. Resolución Deductiva Paso a Paso de Casos Representativos
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Desglose analítico de qué datos se tienen, qué principios se aplican y cómo se despeja
              </p>
            </div>

            <div className="space-y-5">
              {stepByStepExamples?.map((example, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-xs font-bold text-slate-900 font-sans">
                      {example.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">
                      Caso #{idx + 1}
                    </span>
                  </div>

                  {/* Enunciado */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-800 leading-relaxed font-sans">
                    <strong className="text-slate-900 block mb-1">Enunciado del Problema:</strong>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: renderLatex(example.problemStatement),
                      }}
                    />
                  </div>

                  {/* Etapas Deductivas */}
                  <div className="space-y-2">
                    <strong className="text-xs font-bold text-slate-700 block px-1">
                      Desglose de la Deducción Lógica:
                    </strong>
                    <div className="space-y-2">
                      {example.deductiveSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3 rounded-xl bg-white border border-slate-200/70 text-xs text-slate-700 flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                            {sIdx + 1}
                          </span>
                          <div
                            className="leading-relaxed font-sans flex-1"
                            dangerouslySetInnerHTML={{
                              __html: renderLatex(step),
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resultado Exacto */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                    <div>
                      <span className="font-bold block text-[11px] uppercase tracking-wider text-emerald-800">
                        Resultado Exacto Concluido:
                      </span>
                      <span
                        className="font-mono text-xs font-bold mt-0.5 block"
                        dangerouslySetInnerHTML={{
                          __html: renderLatex(example.finalResult),
                        }}
                      />
                    </div>
                    <CheckCircleIcon className="w-5 h-5 text-emerald-600 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PILAR 5: ALERTAS DE TRAMPAS Y ERRORES COMUNES */}
        {activeTab === 'ALERTS' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="border-l-4 border-amber-500 pl-4 py-1">
              <h2 className="text-base font-bold text-slate-900">
                5. Alertas de Trampas de Examen y Errores Conceptuales
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Fallos típicos de despeje, signos, conversión de unidades y falsos amigos conceptuales
              </p>
            </div>

            <div className="space-y-4">
              {commonErrorsAlerts?.map((alert, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80 shadow-soft-sm space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg shrink-0">⚠️</span>
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold text-amber-950 font-sans">
                        Trampa / Error Típico en Parciales:
                      </h3>
                      <p
                        className="text-xs text-amber-900 leading-relaxed font-sans"
                        dangerouslySetInnerHTML={{
                          __html: renderLatex(alert.trap),
                        }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-amber-200/90 text-xs space-y-1">
                    <span className="font-bold text-slate-900 block text-[11px]">
                      Cómo prevenirlo y resolverlo bien:
                    </span>
                    <p
                      className="text-slate-700 leading-relaxed font-sans"
                      dangerouslySetInnerHTML={{
                        __html: renderLatex(alert.correction),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PILAR 6: ECOSISTEMA DE TÉCNICAS DE ESTUDIO (Active Recall + Cornell + Mapa) */}
        {activeTab === 'STUDY_TECHNIQUES' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="border-l-4 border-[#0F52BA] pl-4 py-1">
              <h2 className="text-base font-bold text-slate-900">
                6. Ecosistema de Técnicas de Estudio Aplicadas
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Evocación activa mediante flashcards, síntesis del Método Cornell y jerarquía conceptual
              </p>
            </div>

            {/* SECCIÓN A: FLASHCARDS INTERACTIVAS DE ACTIVE RECALL */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Active Recall: Tarjetas de Evocación Rápida
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    Haz clic en la tarjeta para voltearla y poner a prueba tu memoria de trabajo
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#0F52BA] px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200/80">
                  Tarjeta {flashcardIndex + 1} de {flashcards.length}
                </span>
              </div>

              {currentCard && (
                <div className="space-y-3">
                  {/* Tarjeta Flip con Animación */}
                  <div
                    onClick={() => setIsCardFlipped(!isCardFlipped)}
                    className={`min-h-[180px] p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between shadow-soft select-none ${
                      isCardFlipped
                        ? 'bg-slate-900 text-white border-slate-800'
                        : 'bg-white text-slate-900 border-slate-200/90 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className={isCardFlipped ? 'text-blue-400' : 'text-[#0F52BA]'}>
                        {isCardFlipped ? '✦ RESPUESTA / CONCLUSIÓN' : '❓ PREGUNTA DE EVOCACIÓN'}
                      </span>
                      <span className={isCardFlipped ? 'text-slate-400' : 'text-slate-400'}>
                        Toca para {isCardFlipped ? 'ver pregunta' : 'revelar respuesta'}
                      </span>
                    </div>

                    <div className="py-4 text-center">
                      <p
                        className={`text-sm sm:text-base font-semibold leading-relaxed font-sans ${
                          isCardFlipped ? 'text-slate-100' : 'text-slate-900'
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: renderLatex(
                            isCardFlipped ? currentCard.back : currentCard.front
                          ),
                        }}
                      />
                    </div>

                    <div className="text-center text-[11px] font-mono text-slate-400">
                      {isCardFlipped ? '✓ Respuesta verificada' : '⟳ Haz clic en la tarjeta para voltear'}
                    </div>
                  </div>

                  {/* Controles de Navegación de Flashcards */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => {
                        setIsCardFlipped(false);
                        setFlashcardIndex((prev) => Math.max(0, prev - 1));
                      }}
                      disabled={flashcardIndex === 0}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                    >
                      ← Anterior
                    </button>

                    <button
                      onClick={() => setIsCardFlipped(!isCardFlipped)}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-[#0F52BA] hover:bg-blue-100 border border-blue-200 transition-colors"
                    >
                      {isCardFlipped ? 'Ver Pregunta' : 'Girar Tarjeta'}
                    </button>

                    <button
                      onClick={() => {
                        setIsCardFlipped(false);
                        setFlashcardIndex((prev) =>
                          Math.min(flashcards.length - 1, prev + 1)
                        );
                      }}
                      disabled={flashcardIndex >= flashcards.length - 1}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                    >
                      Siguiente →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN B: MÉTODO CORNELL (CUADRÍCULA CLÁSICA DE 3 BLOQUES) */}
            {studyTechniquesHub?.cornellSynthesis && (
              <div className="space-y-4 pt-6 border-t border-slate-200/80">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Síntesis del Método Cornell (3 Bloques)
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    Estructura mnemotécnica de cues, notas densas y resumen final
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-soft">
                  {/* Fila Superior: Cues (Izquierda) + Notas (Derecha) */}
                  <div className="grid grid-cols-1 md:grid-cols-12 min-h-[220px]">
                    {/* Columna Izquierda: Cues / Preguntas Guía (4 columnas) */}
                    <div className="md:col-span-4 p-5 bg-slate-50/70 border-b md:border-b-0 md:border-r border-slate-200 space-y-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F52BA] block">
                        Cues / Preguntas Guía:
                      </span>
                      <ul className="space-y-2 text-xs text-slate-700 font-sans">
                        {studyTechniquesHub.cornellSynthesis.cues.map((cue, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#0F52BA] font-bold">•</span>
                            <span className="leading-snug">{cue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Columna Derecha: Notas Densas de la Clase (8 columnas) */}
                    <div className="md:col-span-8 p-5 bg-white space-y-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        Notas de la Clase / Puntos Densos:
                      </span>
                      <ul className="space-y-2.5 text-xs text-slate-700 font-sans leading-relaxed">
                        {studyTechniquesHub.cornellSynthesis.notes.map((note, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-400 font-bold">—</span>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: renderLatex(note),
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Fila Inferior: Resumen Ejecutivo en Dos Líneas */}
                  <div className="p-4 bg-blue-50/40 border-t border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F52BA] block">
                      Resumen / Conclusión Cornell:
                    </span>
                    <p className="text-xs text-slate-800 leading-relaxed font-sans">
                      {studyTechniquesHub.cornellSynthesis.summary}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN C: MAPA CONCEPTUAL / NODOS JERÁRQUICOS */}
            {studyTechniquesHub?.conceptMapNodes && (
              <div className="space-y-3 pt-6 border-t border-slate-200/80">
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Estructura Jerárquica del Mapa Conceptual
                </h3>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 font-mono text-xs text-slate-700 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {studyTechniquesHub.conceptMapNodes}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PILAR 7: BATERÍA DE AUTOEVALUACIÓN CERTIFICADA */}
        {activeTab === 'EVALUATION' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
              <div className="border-l-4 border-emerald-600 pl-4 py-1">
                <h2 className="text-base font-bold text-slate-900">
                  7. Batería de Autoevaluación Certificada
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Preguntas de selección simple con justificación rigurosa (Concepto Fundamental + Demostración)
                </p>
              </div>

              {totalQuestions > 0 && onStartExamWithQuestions && (
                <button
                  onClick={handleLaunchSimulator}
                  className="bg-[#0F52BA] hover:bg-[#0c4396] text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-soft flex items-center gap-2 shrink-0"
                >
                  <PlayIcon className="w-3.5 h-3.5 text-white" />
                  <span>Evaluar en Simulador</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {generatedQuestions?.map((q, idx) => {
                const isExpanded = expandedQuestionIdx === idx;

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono">
                        Pregunta #{idx + 1} • {q.tema || guideMetadata.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {q.area || guideMetadata.area}
                      </span>
                    </div>

                    <div
                      className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug font-sans"
                      dangerouslySetInnerHTML={{
                        __html: renderLatex(q.pregunta),
                      }}
                    />

                    {/* Opciones de Selección Simple */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.opciones.map((opt, oIdx) => {
                        const isCorrect = opt.trim() === q.correcta.trim();
                        return (
                          <div
                            key={oIdx}
                            className={`p-3 rounded-xl border text-xs font-sans flex items-start gap-2 ${
                              isCorrect
                                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-medium'
                                : 'bg-slate-50/50 border-slate-200/70 text-slate-700'
                            }`}
                          >
                            <span className="font-mono font-bold uppercase shrink-0">
                              {String.fromCharCode(65 + oIdx)})
                            </span>
                            <div
                              className="flex-1"
                              dangerouslySetInnerHTML={{
                                __html: renderLatex(opt),
                              }}
                            />
                            {isCorrect && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md shrink-0">
                                Correcta
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Botón para Desplegar Justificación Estricta */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() =>
                          setExpandedQuestionIdx(isExpanded ? null : idx)
                        }
                        className="text-xs text-[#0F52BA] hover:text-[#0c4396] font-bold flex items-center gap-1"
                      >
                        <span>{isExpanded ? 'Ocultar Justificación' : 'Ver Justificación Formal'}</span>
                        <span>{isExpanded ? '▲' : '▼'}</span>
                      </button>

                      <span className="text-[10px] font-mono text-slate-400">
                        Estructura: Concepto + Demostración
                      </span>
                    </div>

                    {/* Justificación Formateada */}
                    {isExpanded && (
                      <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-200 text-xs text-slate-700 space-y-2 animate-fadeIn font-sans leading-relaxed">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: renderLatex(q.justificacion),
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. PIE DE ACCIONES FIJO DE LA GUÍA */}
      <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <BookOpenIcon className="w-4 h-4 text-[#0F52BA]" />
          <span>Guía guardada y persistida en tu centro de estudio</span>
        </div>

        {totalQuestions > 0 && onStartExamWithQuestions && (
          <button
            onClick={handleLaunchSimulator}
            className="bg-[#0F52BA] hover:bg-[#0c4396] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <PlayIcon className="w-4 h-4 text-white" />
            <span>Simular Examen de este Tema ({totalQuestions} Preguntas)</span>
          </button>
        )}
      </div>
    </div>
  );
};
