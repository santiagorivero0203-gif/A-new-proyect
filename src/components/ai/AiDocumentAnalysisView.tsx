import React, { useState } from 'react';
import type { AiAnalysisResult } from '../../types/ai.types';
import type { Question } from '../../types/exam.types';
import { renderLatex } from '../../utils/latexRenderer';
import {
  SparklesIcon,
  CheckCircleIcon,
  CopyIcon,
  PlayIcon,
  XIcon,
  BookOpenIcon,
} from '../common/Icons';

interface AiDocumentAnalysisViewProps {
  analysis: AiAnalysisResult;
  onClose: () => void;
  onStartExamWithQuestions?: (questions: Question[], examTitle: string) => void;
  onNavigateToGuides?: () => void;
}

/**
 * Vista Completa del Análisis Generado por Google Gemini AI
 * Muestra el resumen pedagógico, temario, deducciones específicas por perfil
 * y el banco de preguntas generado listo para inyectarse al SimulatorEngine.
 */
export const AiDocumentAnalysisView: React.FC<AiDocumentAnalysisViewProps> = ({
  analysis,
  onClose,
  onStartExamWithQuestions,
  onNavigateToGuides,
}) => {
  const [activeTab, setActiveTab] = useState<'SUMMARY' | 'PROFILE_INSIGHT' | 'QUESTIONS'>('SUMMARY');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleStartExam = () => {
    if (onStartExamWithQuestions && analysis.generatedQuestions.length > 0) {
      onStartExamWithQuestions(
        analysis.generatedQuestions,
        `Evaluación IA: ${analysis.documentTitle}`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-soft-lg flex flex-col max-h-[92vh] overflow-hidden my-auto">
        {/* Cabecera del Análisis */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-slate-50 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold">
                <SparklesIcon className="w-3.5 h-3.5 text-blue-600" />
                Google Gemini Multimodal
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 text-xs font-bold">
                {analysis.subject}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {analysis.modelUsed}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
              {analysis.documentTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {analysis.generatedQuestions && analysis.generatedQuestions.length > 0 && (
              <button
                onClick={handleStartExam}
                className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-soft"
              >
                <PlayIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>Iniciar Práctica IA</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-white/80 transition-colors"
              title="Cerrar vista de análisis"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Barra de Pestañas Internas */}
        <div className="px-6 border-b border-slate-200 bg-slate-50/80 flex items-center gap-3 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('SUMMARY')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'SUMMARY'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>1. Resumen & Temario</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-600 text-[10px] font-mono">
              {analysis.keyTopics?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('PROFILE_INSIGHT')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'PROFILE_INSIGHT'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>2. Enfoque Especializado</span>
            <span className="px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-700 text-[10px] font-semibold">
              Por Perfil
            </span>
          </button>

          <button
            onClick={() => setActiveTab('QUESTIONS')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'QUESTIONS'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>3. Banco de Preguntas Generadas</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono">
              {analysis.generatedQuestions?.length || 0}
            </span>
          </button>
        </div>

        {/* Contenido Principal con Scroll */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* PESTAÑA 1: RESUMEN Y TEMARIO */}
          {activeTab === 'SUMMARY' && (
            <div className="space-y-6">
              {/* Tarjeta de Resumen Ejecutivo */}
              <div className="app-card p-5 bg-white border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    📖
                  </div>
                  <span>Resumen Ejecutivo del Documento</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  {analysis.documentSummary}
                </p>
              </div>

              {/* Temario Estructurado Extraído */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                  Temario y Principios Clave Identificados
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {analysis.keyTopics?.map((topic, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{topic.title}</span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                            topic.importance === 'Fundamental'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {topic.importance}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {topic.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recomendación de Estudio */}
              {analysis.suggestedAction && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                  <span className="text-lg">💡</span>
                  <div>
                    <h5 className="text-xs font-bold text-amber-900">Siguiente Acción Recomendada:</h5>
                    <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                      {analysis.suggestedAction}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PESTAÑA 2: ENFOQUE ESPECIALIZADO POR PERFIL */}
          {activeTab === 'PROFILE_INSIGHT' && (
            <div className="space-y-6">
              {/* Encabezado del Perfil */}
              <div className="app-card p-5 bg-gradient-to-br from-purple-50/40 to-slate-50 border border-purple-200/60 space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold">
                  {analysis.profileInsight.title}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {analysis.profileInsight.summary}
                </p>
              </div>

              {/* Casos Específicos: SANTIAGO (LaTeX y Deducciones) */}
              {analysis.profileInsight.latexFormulas &&
                analysis.profileInsight.latexFormulas.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                      Fórmulas Matemáticas & Deducción Formal (KaTeX)
                    </h4>
                    <div className="space-y-3">
                      {analysis.profileInsight.latexFormulas.map((f, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft-sm space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-blue-700">{f.name}</span>
                            <span className="text-[10px] font-mono text-slate-400">Sintaxis LaTeX</span>
                          </div>
                          <div
                            className="p-3 rounded-xl bg-slate-50 border border-slate-200 overflow-x-auto text-slate-900"
                            dangerouslySetInnerHTML={{ __html: renderLatex(f.latex, true) }}
                          />
                          <p className="text-xs text-slate-600 leading-relaxed">{f.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Casos Específicos: MARÍA FERNANDA (Paleta de Colores & Composición) */}
              {analysis.profileInsight.colorPalette &&
                analysis.profileInsight.colorPalette.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                      Paleta Cromática Extraída de la Pieza (Diseño UCAB)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {analysis.profileInsight.colorPalette.map((col, i) => (
                        <div
                          key={i}
                          onClick={() => copyColor(col.hex)}
                          className="p-3 rounded-2xl bg-white border border-slate-200 shadow-soft-sm hover:border-blue-400 transition-all cursor-pointer group text-left"
                        >
                          <div
                            className="w-full h-14 rounded-xl shadow-inner mb-2 border border-black/10 group-hover:scale-105 transition-transform"
                            style={{ backgroundColor: col.hex }}
                          />
                          <h5 className="text-xs font-bold text-slate-900 truncate">{col.name}</h5>
                          <p className="text-[10px] text-slate-500">{col.role}</p>
                          <div className="flex items-center justify-between mt-1 text-[11px] font-mono text-blue-600 font-bold">
                            <span>{col.hex}</span>
                            {copiedHex === col.hex ? (
                              <CheckCircleIcon className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <CopyIcon className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {analysis.profileInsight.compositionNotes && (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <h5 className="text-xs font-bold text-slate-900">
                          Critica de Taller & Composición:
                        </h5>
                        <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                          {analysis.profileInsight.compositionNotes.map((note, i) => (
                            <li key={i}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

              {/* Casos Específicos: ANDRÉS (Analogías Divertidas) */}
              {analysis.profileInsight.funAnalogies &&
                analysis.profileInsight.funAnalogies.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                      Analogías Didácticas para Bachillerato
                    </h4>
                    <div className="space-y-3">
                      {analysis.profileInsight.funAnalogies.map((a, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5"
                        >
                          <h5 className="text-xs font-bold text-emerald-900">
                            🌟 Concepto: {a.concept}
                          </h5>
                          <p className="text-xs text-emerald-800 leading-relaxed font-sans">
                            {a.analogy}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Casos Específicos: PRIMA (Trampas de Examen) */}
              {analysis.profileInsight.commonExamTraps &&
                analysis.profileInsight.commonExamTraps.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                      Alertas de Trampas Frecuentes en Admisiones
                    </h4>
                    <div className="space-y-3">
                      {analysis.profileInsight.commonExamTraps.map((t, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5"
                        >
                          <h5 className="text-xs font-bold text-rose-900">⚠️ {t.concept}</h5>
                          <p className="text-xs text-rose-800 leading-relaxed font-sans">
                            {t.trapWarning}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* PESTAÑA 3: BANCO DE PREGUNTAS GENERADAS */}
          {activeTab === 'QUESTIONS' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Preguntas de Evaluación Extraídas del Documento
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Compatibles al 100% con el temporizador y el motor SimulatorEngine
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {analysis.generatedQuestions.length} Preguntas
                </span>
              </div>

              <div className="space-y-4">
                {analysis.generatedQuestions.map((q, idx) => {
                  const isExpanded = expandedQuestionId === q.id;

                  return (
                    <div
                      key={q.id}
                      className="app-card p-5 bg-white border border-slate-200 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          Pregunta #{idx + 1} • {q.topic}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">
                          {q.difficulty}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                        {q.questionText}
                      </p>

                      {q.latexFormula && (
                        <div
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 overflow-x-auto text-slate-900 font-serif"
                          dangerouslySetInnerHTML={{ __html: renderLatex(q.latexFormula, true) }}
                        />
                      )}

                      {/* Opciones */}
                      <div className="space-y-2">
                        {q.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                              opt.id === q.correctOptionId
                                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-semibold'
                                : 'bg-slate-50/50 border-slate-200/80 text-slate-700'
                            }`}
                          >
                            <span>
                              <span className="font-bold mr-2 uppercase">
                                ({opt.id.replace('opt-', '')})
                              </span>
                              {opt.text}
                            </span>
                            {opt.id === q.correctOptionId && (
                              <span className="text-[10px] font-bold text-emerald-700 px-2 py-0.5 bg-emerald-100 rounded-md">
                                Respuesta Correcta
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Botón para ver justificación */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() =>
                            setExpandedQuestionId(isExpanded ? null : q.id)
                          }
                          className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                        >
                          <span>{isExpanded ? 'Ocultar Justificación' : 'Ver Justificación Pedagógica'}</span>
                          <span>{isExpanded ? '▲' : '▼'}</span>
                        </button>

                        <span className="text-[10px] font-mono text-slate-400">
                          Clasificación Temática
                        </span>
                      </div>

                      {isExpanded && (
                        <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-slate-700 space-y-1.5 animate-fadeIn">
                          <p className="font-bold text-blue-900">Solución Paso a Paso:</p>
                          <p className="leading-relaxed">{q.explanation}</p>
                          {q.explanationLatex && (
                            <div
                              className="p-2 bg-white rounded-lg border border-blue-200 overflow-x-auto text-slate-900 mt-2"
                              dangerouslySetInnerHTML={{
                                __html: renderLatex(q.explanationLatex, true),
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Pie de Acciones del Modal */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Listo para evaluar en tiempo real con temporizador estricto</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {onNavigateToGuides && (
              <button
                onClick={onNavigateToGuides}
                className="btn-secondary text-xs py-2 px-3.5 flex-1 sm:flex-none flex items-center justify-center gap-1.5"
              >
                <BookOpenIcon className="w-3.5 h-3.5 text-blue-600" />
                <span>Ver Temario en Guías</span>
              </button>
            )}

            {analysis.generatedQuestions.length > 0 && onStartExamWithQuestions && (
              <button
                onClick={handleStartExam}
                className="btn-primary text-xs py-2.5 px-4 flex-1 sm:flex-none flex items-center justify-center gap-2 shadow-soft"
              >
                <PlayIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>Iniciar Examen en Simulador ({analysis.generatedQuestions.length} Preguntas)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
