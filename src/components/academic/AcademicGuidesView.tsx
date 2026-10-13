import React, { useState } from 'react';
import {
  simadiBankService,
  type SimadiGuide,
} from '../../services/simadiBankService';
import {
  BookOpenIcon,
  PlayIcon,
  XIcon,
} from '../common/Icons';
import type { Question } from '../../types/exam.types';

export interface AcademicGuidesViewProps {
  onStartExamWithQuestions?: (questions: Question[], title: string) => void;
}

type CategoryTab = 'ALL' | 'verbal' | 'logico' | 'ciencia' | 'TOPIC_SELECTOR';
type DetailTab = 'THEORY' | 'EXAMS' | 'REFERENCES';

export const AcademicGuidesView: React.FC<AcademicGuidesViewProps> = ({
  onStartExamWithQuestions,
}) => {
  const [activeTab, setActiveTab] = useState<CategoryTab>('ALL');
  const [selectedGuide, setSelectedGuide] = useState<SimadiGuide | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>('THEORY');

  // Estado del Selector de Temas
  const [selectedArea, setSelectedArea] = useState<string>('Razonamiento Lógico Numérico');
  const [selectedTopic, setSelectedTopic] = useState<string>('Teoría de Números (MCM/MCD)');
  const [questionCount, setQuestionCount] = useState<number>(10);

  // Obtener guías
  const guides = simadiBankService.getAllGuides(
    activeTab === 'TOPIC_SELECTOR' ? 'ALL' : activeTab
  );

  // Datos para el selector de temas
  const areasSummary = simadiBankService.getAreasSummary();
  const topicsForCurrentArea = simadiBankService.getTopicsByArea(selectedArea);

  // Lanzar práctica desde una guía
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

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Encabezado Limpio sin AI Slop */}
      <div className="pb-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
            Guías Académicas & Selección de Temas
          </h2>
          <span className="text-xs text-slate-500 font-mono mt-0.5 block">
            11 guías temáticas oficiales • 1.111 ejercicios clasificados
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
        </div>
      </div>

      {/* VISTA 1: SELECTOR DE TEMAS POR ÁREA */}
      {activeTab === 'TOPIC_SELECTOR' ? (
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
                        ? 'bg-white border-brand-500 ring-1 ring-brand-500/20 shadow-soft-sm text-slate-900'
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
                          ? 'bg-blue-50/70 border-brand-500 text-slate-900 ring-1 ring-brand-500/20'
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
                  className="btn-brand text-xs py-2 px-4 flex items-center gap-2"
                >
                  <PlayIcon className="w-3.5 h-3.5" />
                  <span>Practicar este Tema ({questionCount} Preguntas)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* VISTA 2: GRID DE GUÍAS DE ESTUDIO */
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
                  className="btn-brand text-xs py-1.5 px-3 flex items-center justify-center gap-1.5"
                  title="Practicar preguntas de este tema"
                >
                  <PlayIcon className="w-3.5 h-3.5" />
                  <span>Practicar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL DETALLE DE GUÍA COMPLETA */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
            {/* Cabecera del Modal */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-brand-600 font-semibold uppercase">
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
                    ? 'border-brand-500 text-brand-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Teoría & Estrategias
              </button>

              <button
                onClick={() => setDetailTab('EXAMS')}
                className={`px-3 py-2 text-xs font-semibold border-b-2 transition-all ${
                  detailTab === 'EXAMS'
                    ? 'border-brand-500 text-brand-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Ejemplos de Examen ({selectedGuide.pastExams.length})
              </button>

              <button
                onClick={() => setDetailTab('REFERENCES')}
                className={`px-3 py-2 text-xs font-semibold border-b-2 transition-all ${
                  detailTab === 'REFERENCES'
                    ? 'border-brand-500 text-brand-600 font-bold'
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
                  dangerouslySetInnerHTML={{ __html: selectedGuide.theory }}
                />
              )}

              {detailTab === 'EXAMS' && (
                <div className="space-y-4">
                  {selectedGuide.pastExams.map((exam, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 space-y-3 text-xs"
                    >
                      <div className="font-semibold text-slate-900 leading-relaxed">
                        {exam.pregunta}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {exam.opciones.map((opt, oIdx) => {
                          const isCorrect = opt.trim() === exam.correcta.trim();
                          return (
                            <div
                              key={oIdx}
                              className={`p-2.5 rounded-lg border text-xs font-mono ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                                  : 'bg-white border-slate-200 text-slate-600'
                              }`}
                            >
                              <span>{String.fromCharCode(65 + oIdx)}) </span>
                              <span>{opt}</span>
                              {isCorrect && <span className="ml-1 text-emerald-600">✓</span>}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-3 bg-white border border-slate-200 rounded-lg text-slate-600 space-y-1">
                        <strong className="text-slate-800">Resolución Paso a Paso:</strong>
                        <p className="leading-relaxed text-[11px]">{exam.resolucion}</p>
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
                        <span className="font-mono text-brand-600">📄</span>
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
                className="btn-brand text-xs py-2 px-4 flex items-center gap-2"
              >
                <PlayIcon className="w-3.5 h-3.5" />
                <span>Practicar este Tema Ahora</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
