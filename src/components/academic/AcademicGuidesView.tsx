import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  simadiBankService,
  type SimadiGuide,
} from '../../services/simadiBankService';
import { geminiService } from '../../services/geminiService';
import type { DeconstructedAcademicGuide } from '../../types/deconstruction.types';
import { convertDeconstructedToQuestions } from '../../types/deconstruction.types';
import { DeconstructedGuideView } from './DeconstructedGuideView';
import {
  BookOpenIcon,
  PlayIcon,
  XIcon,
  SparklesIcon,
  TrashIcon,
  AtomIcon,
} from '../common/Icons';
import { EmptyState } from '../common/EmptyState';
import type { Question } from '../../types/exam.types';
import { renderLatex, renderLatexToHtml } from '../../utils/latexRenderer';

export interface AcademicGuidesViewProps {
  onStartExamWithQuestions?: (questions: Question[], title: string) => void;
}

type CategoryTab =
  | 'ALL'
  | 'ucv_ciencias'
  | 'verbal'
  | 'logico'
  | 'ciencia'
  | 'TOPIC_SELECTOR'
  | 'AI_DECONSTRUCTED';

type DetailTab = 'THEORY' | 'EXAMS' | 'REFERENCES';

export const AcademicGuidesView: React.FC<AcademicGuidesViewProps> = ({
  onStartExamWithQuestions,
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<CategoryTab>('ALL');
  const [selectedGuide, setSelectedGuide] = useState<SimadiGuide | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>('THEORY');

  // Estado para Guías Deconstruidas con Gemini IA
  const [selectedDeconstructedGuide, setSelectedDeconstructedGuide] =
    useState<DeconstructedAcademicGuide | null>(null);

  // Estado del Selector de Temas
  const [selectedArea, setSelectedArea] = useState<string>('Razonamiento Lógico Numérico');
  const [selectedTopic, setSelectedTopic] = useState<string>('Teoría de Números (MCM/MCD)');
  const [questionCount, setQuestionCount] = useState<number>(10);

  // Obtener guías oficiales de la base
  const guides = simadiBankService.getAllGuides(
    activeTab === 'TOPIC_SELECTOR' || activeTab === 'AI_DECONSTRUCTED'
      ? 'ALL'
      : activeTab
  );

  // Obtener guías deconstruidas generadas por el usuario
  const deconstructedGuides = user ? geminiService.getDeconstructedGuides(user.id) : [];

  // Datos para el selector de temas
  const areasSummary = simadiBankService.getAreasSummary();
  const topicsForCurrentArea = simadiBankService.getTopicsByArea(selectedArea);

  // Lanzar práctica desde una guía simadi
  const handleStartPracticeFromGuide = (guide: SimadiGuide) => {
    const questions = simadiBankService.getQuestionsForGuide(guide, 10);
    if (onStartExamWithQuestions) {
      onStartExamWithQuestions(questions, `Práctica: ${guide.title}`);
    }
  };

  // Lanzar práctica desde el selector de temas
  const handleStartPracticeFromTopic = () => {
    if (!selectedTopic) return;
    const questions = simadiBankService.getQuestionsByTopic(selectedTopic, questionCount);
    if (onStartExamWithQuestions) {
      onStartExamWithQuestions(questions, `Práctica Temática: ${selectedTopic}`);
    }
  };

  // Lanzar examen desde una guía deconstruida
  const handleStartExamFromDeconstructed = (guide: DeconstructedAcademicGuide) => {
    if (!onStartExamWithQuestions) return;
    const questions = convertDeconstructedToQuestions(
      guide.generatedQuestions,
      guide.guideMetadata.title,
      user?.academic_profile
    );
    onStartExamWithQuestions(
      questions,
      `Simulación: ${guide.guideMetadata.title}`
    );
  };

  const handleDeleteDeconstructed = (guideId: string) => {
    if (!user) return;
    if (window.confirm('¿Deseas eliminar esta guía deconstruida de tu centro de estudio?')) {
      geminiService.deleteDeconstructedGuide(guideId, user.id);
      // Forzar render cambiando de estado sutilmente
      setActiveTab('AI_DECONSTRUCTED');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Encabezado Limpio con Acento Cobalto */}
      <div className="pb-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
            Guías Académicas & Motor de Deconstrucción
          </h2>
          <span className="text-xs text-slate-500 font-mono mt-0.5 block">
            11 guías temáticas oficiales • {deconstructedGuides.length} guías deconstruidas con Gemini AI
          </span>
        </div>

        {/* Pestañas de Categoría */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/70">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'ALL'
                ? 'bg-white text-slate-900 shadow-soft-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todas ({guides.length})
          </button>
          <button
            onClick={() => setActiveTab('ucv_ciencias')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'ucv_ciencias'
                ? 'bg-[#0F52BA] text-white shadow-soft-sm font-bold'
                : 'text-blue-700 bg-blue-50/70 hover:bg-blue-100 border border-blue-200/60'
            }`}
          >
            <AtomIcon className="w-3.5 h-3.5" />
            <span>Curso UCV (7 Módulos)</span>
          </button>
          <button
            onClick={() => setActiveTab('verbal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'verbal'
                ? 'bg-white text-slate-900 shadow-soft-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Verbal
          </button>
          <button
            onClick={() => setActiveTab('logico')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'logico'
                ? 'bg-white text-slate-900 shadow-soft-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lógico & Matemático
          </button>
          <button
            onClick={() => setActiveTab('ciencia')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'ciencia'
                ? 'bg-white text-slate-900 shadow-soft-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ciencias
          </button>
          <button
            onClick={() => setActiveTab('TOPIC_SELECTOR')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'TOPIC_SELECTOR'
                ? 'bg-slate-900 text-white shadow-soft-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Selector de Temas
          </button>
          <button
            onClick={() => setActiveTab('AI_DECONSTRUCTED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'AI_DECONSTRUCTED'
                ? 'bg-[#0F52BA] text-white shadow-soft-sm font-bold'
                : 'text-[#0F52BA] hover:bg-blue-50'
            }`}
          >
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>Análisis con IA ({deconstructedGuides.length})</span>
          </button>
        </div>
      </div>

      {/* VISTA 1: GUÍAS ANALIZADAS POR GEMINI IA (7 PILARES) */}
      {activeTab === 'AI_DECONSTRUCTED' ? (
        <div className="space-y-6">
          {deconstructedGuides.length === 0 ? (
            <EmptyState
              title="Aún no tienes guías generadas con IA"
              description="Sube tus apuntes, fotos o archivos para analizarlos en 7 pilares pedagógicos con fórmulas, flashcards y banco de preguntas oficial."
              className="max-w-2xl mx-auto"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {deconstructedGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 transition-all shadow-soft flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-[#0F52BA] font-mono">
                        {guide.guideMetadata.area || 'Deconstrucción IA'}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                        {guide.generatedQuestions?.length || 0} Preguntas
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug font-sans">
                      {guide.guideMetadata.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 font-sans">
                      {guide.guideMetadata.summary}
                    </p>

                    <div className="pt-1 flex flex-wrap gap-1 text-[10px] font-mono text-slate-400">
                      <span>• {guide.glossary?.length || 0} términos SI</span>
                      <span>• {guide.formulasAndStrategies?.coreFormulas?.length || 0} fórmulas</span>
                      <span>• {guide.studyTechniquesHub?.activeRecallFlashcards?.length || 0} flashcards</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedDeconstructedGuide(guide)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 flex-1 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <BookOpenIcon className="w-3.5 h-3.5 text-[#0F52BA]" />
                      <span>Ver Guía 7 Pilares</span>
                    </button>

                    <button
                      onClick={() => handleStartExamFromDeconstructed(guide)}
                      className="bg-[#0F52BA] hover:bg-[#0c4396] text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-soft flex items-center justify-center gap-1.5 transition-colors"
                      title="Simular examen con preguntas de esta guía"
                    >
                      <PlayIcon className="w-3.5 h-3.5 text-white" />
                      <span>Simular</span>
                    </button>

                    <button
                      onClick={() => guide.id && handleDeleteDeconstructed(guide.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Eliminar guía"
                    >
                      <TrashIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : activeTab === 'TOPIC_SELECTOR' ? (
        /* VISTA 2: SELECTOR DE TEMAS POR ÁREA */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Columna Izquierda: Áreas Generales */}
            <div className="lg:col-span-4 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
                Áreas de Estudio
              </h3>
              {areasSummary.map(({ area, totalQuestions }) => {
                const isSelected = selectedArea === area;
                return (
                  <button
                    key={area}
                    onClick={() => {
                      setSelectedArea(area);
                      const top = simadiBankService.getTopicsByArea(area)[0];
                      if (top) setSelectedTopic(top.topic);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-white border-[#0F52BA] ring-1 ring-[#0F52BA]/20 shadow-soft-sm text-slate-900'
                        : 'bg-white/70 border-slate-200/80 hover:bg-white text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold font-sans">{area}</p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {totalQuestions} preguntas
                      </p>
                    </div>
                    <span className="text-slate-400 text-xs">→</span>
                  </button>
                );
              })}
            </div>

            {/* Columna Derecha: Temas Específicos del Área */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-soft space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Temas en {selectedArea}
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    Selecciona un tema para practicar preguntas oficiales
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-mono">Preguntas:</span>
                  <select
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="input-clean py-1 px-2.5 text-xs font-mono rounded-lg w-20"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                  </select>
                </div>
              </div>

              {/* Grid de Temas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
                {topicsForCurrentArea.map(({ topic, count }) => {
                  const isChosen = selectedTopic === topic;
                  return (
                    <button
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isChosen
                          ? 'bg-blue-50/70 border-[#0F52BA] text-slate-900 ring-1 ring-[#0F52BA]/20'
                          : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="text-xs font-medium line-clamp-1">{topic}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-semibold shrink-0 ml-2">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Botón de Lanzamiento de Práctica */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  Tema activo: <strong className="text-slate-800">{selectedTopic}</strong>
                </span>

                <button
                  onClick={handleStartPracticeFromTopic}
                  disabled={!selectedTopic}
                  className="bg-[#0F52BA] hover:bg-[#0c4396] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-soft flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <PlayIcon className="w-3.5 h-3.5 text-white" />
                  <span>Practicar este Tema ({questionCount} Preguntas)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : guides.length === 0 ? (
        <EmptyState
          title="No hay guías disponibles en esta categoría"
          description="Selecciona otra categoría en la barra superior o utiliza el Selector de Temas por Área."
        />
      ) : (
        /* VISTA 3: GRID DE GUÍAS DE ESTUDIO OFICIALES */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="app-card p-5 flex flex-col justify-between hover:border-slate-300 transition-all bg-white border border-slate-200/80 shadow-soft space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono">
                    {guide.categoryLabel.split('&')[0].trim()}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {guide.pastExams.length} ejercicios
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug font-sans">
                  {guide.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {guide.content}
                </p>

                {guide.references.length > 0 && (
                  <div className="pt-1">
                    <span className="text-[10px] font-mono text-slate-400">
                      Doc: {guide.references[0].guideName}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setSelectedGuide(guide);
                    setDetailTab('THEORY');
                  }}
                  className="btn-secondary text-xs py-1.5 px-3 flex-1 flex items-center justify-center gap-1.5"
                >
                  <BookOpenIcon className="w-3.5 h-3.5 text-slate-600" />
                  <span>Ver Guía</span>
                </button>

                <button
                  onClick={() => handleStartPracticeFromGuide(guide)}
                  className="bg-[#0F52BA] hover:bg-[#0c4396] text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-soft flex items-center justify-center gap-1.5 transition-colors"
                  title="Practicar preguntas de este tema"
                >
                  <PlayIcon className="w-3.5 h-3.5 text-white" />
                  <span>Practicar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL DETALLE DE GUÍA OFICIAL (SIMADI) */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
            {/* Cabecera del Modal */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#0F52BA] font-semibold uppercase">
                  {selectedGuide.categoryLabel}
                </span>
                <h3 className="text-base font-bold text-slate-900 font-sans mt-0.5">
                  {selectedGuide.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedGuide(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Pestañas del Detalle */}
            <div className="px-5 pt-3 border-b border-slate-100 flex items-center gap-2">
              <button
                onClick={() => setDetailTab('THEORY')}
                className={`px-3 py-2 text-xs font-semibold border-b-2 transition-all ${
                  detailTab === 'THEORY'
                    ? 'border-[#0F52BA] text-[#0F52BA] font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Teoría & Estrategias
              </button>

              <button
                onClick={() => setDetailTab('EXAMS')}
                className={`px-3 py-2 text-xs font-semibold border-b-2 transition-all ${
                  detailTab === 'EXAMS'
                    ? 'border-[#0F52BA] text-[#0F52BA] font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Ejemplos de Examen ({selectedGuide.pastExams.length})
              </button>

              <button
                onClick={() => setDetailTab('REFERENCES')}
                className={`px-3 py-2 text-xs font-semibold border-b-2 transition-all ${
                  detailTab === 'REFERENCES'
                    ? 'border-[#0F52BA] text-[#0F52BA] font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Referencias ({selectedGuide.references.length})
              </button>
            </div>

            {/* Contenido Scrolleable */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {detailTab === 'THEORY' && (
                <div
                  className="prose prose-sm max-w-none text-slate-700 text-xs leading-relaxed font-sans space-y-3"
                  dangerouslySetInnerHTML={{ __html: renderLatexToHtml(selectedGuide.theory) }}
                />
              )}

              {detailTab === 'EXAMS' && (
                <div className="space-y-4">
                  {selectedGuide.pastExams.map((exam, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 space-y-3 text-xs"
                    >
                      <div
                        className="font-semibold text-slate-900 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: renderLatex(exam.pregunta, false) }}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {exam.opciones.map((opt, oIdx) => {
                          const isCorrect = opt.trim() === exam.correcta.trim();
                          return (
                            <div
                              key={oIdx}
                              className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                                  : 'bg-white border-slate-200 text-slate-600'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 flex-1">
                                <span className="font-semibold">{String.fromCharCode(65 + oIdx)})</span>
                                <span dangerouslySetInnerHTML={{ __html: renderLatex(opt, false) }} />
                              </div>
                              {isCorrect && <span className="ml-1 text-emerald-600 font-bold">✓</span>}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-3 bg-white border border-slate-200 rounded-lg text-slate-600 space-y-1">
                        <strong className="text-slate-800">Resolución Paso a Paso:</strong>
                        <div
                          className="leading-relaxed text-[11px]"
                          dangerouslySetInnerHTML={{ __html: renderLatex(exam.resolucion, false) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {detailTab === 'REFERENCES' && (
                <div className="space-y-2.5">
                  {selectedGuide.references.map((ref, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#0F52BA]">📄</span>
                        <span className="font-medium text-slate-800">{ref.guideName}</span>
                      </div>
                      <span className="font-mono text-[11px] text-slate-500">{ref.pages}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pie del Modal */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
              <span className="text-xs text-slate-400 font-mono">
                {selectedGuide.practiceTopics.join(' • ')}
              </span>

              <button
                onClick={() => {
                  handleStartPracticeFromGuide(selectedGuide);
                  setSelectedGuide(null);
                }}
                className="bg-[#0F52BA] hover:bg-[#0c4396] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-soft flex items-center gap-2 transition-colors cursor-pointer"
              >
                <PlayIcon className="w-3.5 h-3.5 text-white" />
                <span>Practicar este Tema Ahora</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETALLE DE GUÍA HIPER-COMPLEJA DECONSTRUIDA CON IA */}
      {selectedDeconstructedGuide && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="max-w-4xl w-full">
            <DeconstructedGuideView
              guide={selectedDeconstructedGuide}
              onClose={() => setSelectedDeconstructedGuide(null)}
              onStartExamWithQuestions={(qs, title) => {
                setSelectedDeconstructedGuide(null);
                if (onStartExamWithQuestions) {
                  onStartExamWithQuestions(qs, title);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
