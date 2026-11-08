import React, { useState, useEffect } from 'react';
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
import {
  ALL_MAFE_DECONSTRUCTED_GUIDES,
  ALL_MAFE_QUESTIONS,
  DESIGN_THEORY_QUESTIONS,
  NOTION_COLOR_QUESTIONS,
  NOTION_MATH_QUESTIONS,
} from '../../data/mafe_curriculum_hub';
import {
  ALL_ANDRES_DECONSTRUCTED_GUIDES,
  ALL_ANDRES_QUESTIONS,
  ANDRES_INTEGRAL_EXAM_QUESTIONS,
} from '../../data/andres_curriculum_hub';
import {
  getSimulatorQuestionsForGuide,
  type AndresGuideKey,
} from '../../data/andres';
import {
  SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES,
  SANTIAGO_SEMESTER_1_QUESTIONS,
} from '../../data/santiago_curriculum_hub';
import {
  exportGuideToWord,
  exportGuideToPdf,
  OFFICIAL_NOTION_PDF_LINKS,
} from '../../utils/documentExport';

export interface AcademicGuidesViewProps {
  onStartExamWithQuestions?: (questions: Question[], title: string) => void;
}

type CategoryTab =
  | 'ALL'
  | 'mafe_curriculum'
  | 'andres_curriculum'
  | 'santiago_curriculum'
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
  const { user, academicProfile } = useAuth();
  // Determinar perfil activo
  const isMafe =
    academicProfile === 'mafe_diseno_ucab' || user?.academic_profile === 'mafe_diseno_ucab';
  const isAndres =
    academicProfile === 'andres_bachillerato_1' || user?.academic_profile === 'andres_bachillerato_1';
  const isSantiago =
    academicProfile === 'santiago_fisica_ucv' || user?.academic_profile === 'santiago_fisica_ucv';

  // Por defecto, mostrar PRIMERO lo personalizado del perfil del estudiante
  const defaultTab: CategoryTab = isMafe
    ? 'mafe_curriculum'
    : isAndres
    ? 'andres_curriculum'
    : isSantiago
    ? 'santiago_curriculum'
    : 'ALL';
  const [activeTab, setActiveTab] = useState<CategoryTab>(defaultTab);
  const [selectedGuide, setSelectedGuide] = useState<SimadiGuide | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>('THEORY');
  // Filtro temático de asignaturas exclusivo para Andrés Rivero
  const [andresSubjectFilter, setAndresSubjectFilter] = useState<
    'TODAS' | 'Matemática' | 'Biología' | 'Física' | 'Castellano' | 'Diseño'
  >('TODAS');
  // Filtro temático de asignaturas exclusivo para Santiago Rivero
  const [santiagoSubjectFilter, setSantiagoSubjectFilter] = useState<
    'TODAS' | 'Matemática I' | 'Principios de Química I' | 'Física I'
  >('TODAS');

  // Estado para Guías Deconstruidas con Gemini IA
  const [selectedDeconstructedGuide, setSelectedDeconstructedGuide] =
    useState<DeconstructedAcademicGuide | null>(null);

  // Escuchar si hay una guía específica solicitada desde el Calendario
  useEffect(() => {
    const autoGuideId = sessionStorage.getItem('cpe_auto_open_guide_id');
    if (autoGuideId) {
      sessionStorage.removeItem('cpe_auto_open_guide_id');
      const found = SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES.find((g) => g.id === autoGuideId)
        || ALL_ANDRES_DECONSTRUCTED_GUIDES.find((g) => g.id === autoGuideId)
        || ALL_MAFE_DECONSTRUCTED_GUIDES.find((g) => g.id === autoGuideId);
      if (found) {
        setSelectedDeconstructedGuide(found);
      }
    }
  }, []);

  // Estado del Selector de Temas
  const [selectedArea, setSelectedArea] = useState<string>('Razonamiento Lógico Numérico');
  const [selectedTopic, setSelectedTopic] = useState<string>('Teoría de Números (MCM/MCD)');
  const [questionCount, setQuestionCount] = useState<number>(10);

  // Obtener guías oficiales de la base
  const guides = simadiBankService.getAllGuides(
    activeTab === 'TOPIC_SELECTOR' || activeTab === 'AI_DECONSTRUCTED' || activeTab === 'mafe_curriculum' || activeTab === 'andres_curriculum' || activeTab === 'santiago_curriculum'
      ? 'ALL'
      : activeTab
  );

  // Obtener guías deconstruidas generadas por el usuario (incluyendo las oficiales de Mafe o Andrés)
  const userDeconstructed = user ? geminiService.getDeconstructedGuides(user.id) : [];
  const deconstructedGuides = isMafe
    ? [...ALL_MAFE_DECONSTRUCTED_GUIDES, ...userDeconstructed.filter(g => !g.id?.startsWith('mafe-'))]
    : isAndres
    ? [...ALL_ANDRES_DECONSTRUCTED_GUIDES, ...userDeconstructed.filter(g => !g.id?.startsWith('andres-'))]
    : isSantiago
    ? [...SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES, ...userDeconstructed.filter(g => !g.id?.startsWith('santiago-'))]
    : userDeconstructed;

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
    if (guide.id?.startsWith('andres-')) {
      const directAndres = getSimulatorQuestionsForGuide(guide.id as AndresGuideKey);
      if (directAndres && directAndres.length > 0) {
        onStartExamWithQuestions(
          directAndres,
          `Simulación: ${guide.guideMetadata.title}`
        );
        return;
      }
    }

    let questions = convertDeconstructedToQuestions(
      guide.generatedQuestions || [],
      guide.guideMetadata.title,
      user?.academic_profile
    );

    // Salvaguarda: si la guía no produjo preguntas, enlazar directamente con su banco oficial
    if (!questions || questions.length === 0) {
      if (guide.id === 'mafe-design-theory-official') {
        questions = [...DESIGN_THEORY_QUESTIONS];
      } else if (guide.id === 'mafe-color-clase4-ucab') {
        questions = [...NOTION_COLOR_QUESTIONS];
      } else if (guide.id === 'mafe-math-design-ucab') {
        questions = [...NOTION_MATH_QUESTIONS];
      } else if (guide.id === 'santiago-calc1-limits-guide') {
        questions = SANTIAGO_SEMESTER_1_QUESTIONS.filter((q) => q.topic.includes('Límites') || q.topic.includes('Derivadas') || q.subject === 'Matemática');
      } else if (guide.id === 'santiago-fis1-mechanics-guide') {
        questions = SANTIAGO_SEMESTER_1_QUESTIONS.filter((q) => q.subject === 'Física' && (q.topic.includes('Cinemática') || q.topic.includes('Dinámica') || q.topic.includes('Energía')));
      } else if (guide.id === 'santiago-alg1-vectors-guide') {
        questions = SANTIAGO_SEMESTER_1_QUESTIONS.filter((q) => q.topic.includes('Plano') || q.topic.includes('Determinantes'));
      } else if (guide.id === 'santiago-lab1-errors-guide') {
        questions = SANTIAGO_SEMESTER_1_QUESTIONS.filter((q) => q.topic.includes('Incertidumbre'));
      } else {
        questions = isSantiago
          ? SANTIAGO_SEMESTER_1_QUESTIONS.slice(0, 10)
          : isAndres
          ? ANDRES_INTEGRAL_EXAM_QUESTIONS
          : ALL_MAFE_QUESTIONS.slice(0, 10);
      }
    }

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

        {/* Pestañas de Categoría - Si es Andrés, mostrar EXCLUSIVAMENTE sus materias */}
        {isAndres ? (
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/70 dark:border-blue-900/40">
            {[
              { id: 'TODAS', label: `📚 Todas (${ALL_ANDRES_DECONSTRUCTED_GUIDES.length})` },
              { id: 'Matemática', label: '📐 Matemática (3)' },
              { id: 'Biología', label: '🔬 Biología (2)' },
              { id: 'Física', label: '⚡ Física (2)' },
              { id: 'Castellano', label: '📖 Castellano & Fe (3)' },
              { id: 'Diseño', label: '💻 Diseño & Informática (2)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setAndresSubjectFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  andresSubjectFilter === f.id
                    ? 'bg-[#0070d1] text-white shadow-soft-sm font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/70">
            {/* Si es Mafe, mostrar primero su pestaña destacada */}
            {isMafe && (
              <button
                onClick={() => setActiveTab('mafe_curriculum')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'mafe_curriculum'
                    ? 'bg-rose-600 text-white shadow-soft-sm font-bold'
                    : 'text-rose-700 bg-rose-50/70 hover:bg-rose-100 border border-rose-200/60'
                }`}
              >
                <span>🎨 Mi Programa UCAB ({ALL_MAFE_DECONSTRUCTED_GUIDES.length} Guías)</span>
              </button>
            )}

                        {/* Si es Santiago, mostrar pestaña destacada de Semestre I UCV */}
            {isSantiago && (
              <button
                onClick={() => setActiveTab('santiago_curriculum')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'santiago_curriculum'
                    ? 'bg-[#0F52BA] text-white shadow-soft-sm font-bold'
                    : 'text-[#0F52BA] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80'
                }`}
              >
                <span>⚛️ Semestre I Ciencias UCV (${SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES.length} Guías)</span>
              </button>
            )}

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
        )}
      </div>


      {/* VISTA 0C: PROGRAMA EXCLUSIVO DE SANTIAGO RIVERO (SEMESTRE I · CIENCIAS UCV) */}
      {activeTab === 'santiago_curriculum' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-blue-950 via-[#0a1835] to-slate-900 border-2 border-blue-600/40 shadow-soft-lg flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/40 font-mono">
                  Licenciatura en Física · Facultad de Ciencias UCV
                </span>
                <span className="text-[10px] font-mono text-slate-300">
                  Semestre I • {SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES.length} Guías Oficiales • {SANTIAGO_SEMESTER_1_QUESTIONS.length} Reactivos
                </span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight font-sans">
                Mi Centro Académico · Primer Semestre UCV
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                Temario oficial con guías de estudio deconstruidas en 7 pilares, recursos de video, audios de síntesis y prompts de investigación con arquitectura Santiago para cada evaluación y tema.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() =>
                  onStartExamWithQuestions?.(
                    SANTIAGO_SEMESTER_1_QUESTIONS,
                    'Primer Semestre UCV · Simulacro Integral (Física I + Cálculo I + Álgebra Lineal)'
                  )
                }
                className="bg-[#0F52BA] hover:bg-[#0c4194] active:scale-[0.97] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-[0_0_20px_rgba(15,82,186,0.5)] flex items-center gap-1.5 transition-all cursor-pointer border border-blue-400/30"
              >
                <PlayIcon className="w-3.5 h-3.5 text-white" />
                <span>Simular Examen Semestre I ({SANTIAGO_SEMESTER_1_QUESTIONS.length})</span>
              </button>
            </div>
          </div>

          {/* Filtros de Asignatura de Semestre I para Santiago */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 w-fit">
              {[
                { id: 'TODAS', label: `Todas (${SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES.length})` },
                { id: 'Matemática I', label: 'Matemática I · Pedro Alson (7)' },
                { id: 'Principios de Química I', label: 'Principios de Química I (10)' },
                { id: 'Física I', label: 'Física I (3)' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSantiagoSubjectFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    santiagoSubjectFilter === f.id
                      ? 'bg-[#0F52BA] text-white shadow-soft-sm font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500 font-mono">
              {santiagoSubjectFilter === 'TODAS'
                ? `Mostrando las ${SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES.length} guías`
                : `Filtro activo: ${santiagoSubjectFilter}`}
            </span>
          </div>

          {/* Grid de Guías Oficiales Deconstruidas de Semestre I */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES.filter((guide) => {
              if (santiagoSubjectFilter === 'TODAS') return true;
              return guide.guideMetadata.area.toLowerCase().includes(santiagoSubjectFilter.toLowerCase());
            }).map((guide) => {
              const multimediaCount = guide.multimediaResources?.length || 0;
              const hasPrompts = guide.researchPrompts && guide.researchPrompts.length > 0;

              return (
                <div
                  key={guide.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-blue-200/90 dark:border-blue-900/40 hover:border-[#0F52BA] transition-all shadow-soft flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/80 text-[#0F52BA] dark:text-blue-300 font-mono">
                        {guide.guideMetadata.area}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                        {guide.generatedQuestions?.length || 5} Reactivos
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug font-sans">
                      {guide.guideMetadata.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 font-sans">
                      {guide.guideMetadata.summary}
                    </p>

                    {/* Píldoras de Multimedia y Prompts si aplican */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {multimediaCount > 0 && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/70 font-mono flex items-center gap-1">
                          <span>🎬</span>
                          <span>{multimediaCount} Multimedia</span>
                        </span>
                      )}
                      {hasPrompts && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 font-mono flex items-center gap-1">
                          <span>📋</span>
                          <span>Prompt IA</span>
                        </span>
                      )}
                    </div>

                    <div className="pt-1 flex flex-wrap gap-1 text-[10px] font-mono text-slate-400">
                      <span>• {guide.glossary?.length || 0} términos</span>
                      <span>• {guide.formulasAndStrategies?.coreFormulas?.length || 0} fórmulas</span>
                      <span>• {guide.studyTechniquesHub?.activeRecallFlashcards?.length || 0} flashcards</span>
                    </div>
                  </div>

                  {/* Barra de Acciones y Descarga de Documentos (PDF / Word) */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => exportGuideToPdf(guide)}
                        className="flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-bold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 text-[#0F52BA] dark:text-blue-300 border border-blue-200/90 dark:border-blue-800/60 flex items-center justify-center gap-1.5 transition-all shadow-soft-xs active:scale-[0.98] cursor-pointer"
                        title="Descargar o Guardar como PDF de alta resolución"
                      >
                        <span>📄 PDF (.pdf)</span>
                      </button>
                      <button
                        onClick={() => exportGuideToWord(guide)}
                        className="flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-bold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-soft-xs active:scale-[0.98] cursor-pointer"
                        title="Descargar guía completa en formato Microsoft Word (.doc)"
                      >
                        <span>📝 Word (.doc)</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedDeconstructedGuide(guide)}
                        className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-black text-white flex items-center justify-center gap-1.5 transition-all shadow-soft cursor-pointer active:scale-[0.98]"
                      >
                        <BookOpenIcon className="w-3.5 h-3.5 text-blue-400" />
                        <span>Ver Guía</span>
                      </button>

                      <button
                        onClick={() => handleStartExamFromDeconstructed(guide)}
                        className="py-2 px-3.5 rounded-xl text-xs font-bold bg-[#0F52BA] hover:bg-[#0c4194] text-white shadow-soft flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
                        title="Simular examen con preguntas de esta guía"
                      >
                        <PlayIcon className="w-3.5 h-3.5 text-white" />
                        <span>Examen</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VISTA 0: PROGRAMA EXCLUSIVO DE MARÍA FERNANDA (DISEÑO INTEGRAL UCAB) */}
      {activeTab === 'mafe_curriculum' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-rose-50 via-white to-pink-50/50 border-2 border-rose-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300/80 font-mono">
                  Personalizado para María Fernanda Valderrama
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Escuela de Diseño Integral UCAB • {ALL_MAFE_DECONSTRUCTED_GUIDES.length} Guías Oficiales Deconstruidas • {ALL_MAFE_QUESTIONS.length} Reactivos Calibrados
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight font-sans">
                Mi Centro Académico & Exámenes de Diseño
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                Temario oficial de Teoría del Diseño (Semiótica, Gestalt, Usabilidad, Actor-Red), Teoría del Color (Clase 4 de escalas de 15 a 9 pasos) y Matemática para el Diseño (Geometría, Retículas, Sistemas de Ecuaciones Lineales y Ángulos con aplicaciones en diseño).
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() =>
                  onStartExamWithQuestions?.(
                    ALL_MAFE_QUESTIONS,
                    'Diseño UCAB · Simulacro General (Todas las Guías)'
                  )
                }
                className="bg-rose-600 hover:bg-rose-700 active:scale-[0.97] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-soft flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <PlayIcon className="w-3.5 h-3.5 text-white" />
                <span>Simular Examen Completo ({ALL_MAFE_QUESTIONS.length})</span>
              </button>
            </div>
          </div>

          {/* Grid de las Guías Oficiales Deconstruidas de María Fernanda */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ALL_MAFE_DECONSTRUCTED_GUIDES.map((guide) => (
              <div
                key={guide.id}
                className="p-5 rounded-3xl bg-white border border-rose-200/90 hover:border-rose-400 transition-all shadow-soft flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-mono">
                      {guide.guideMetadata.area}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                      {guide.generatedQuestions?.length || 0} Reactivos
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug font-sans">
                    {guide.guideMetadata.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 font-sans">
                    {guide.guideMetadata.summary}
                  </p>

                  <div className="pt-1 flex flex-wrap gap-1 text-[10px] font-mono text-slate-400">
                    <span>• {guide.glossary?.length || 0} términos</span>
                    <span>• {guide.formulasAndStrategies?.coreFormulas?.length || 0} modelos</span>
                    <span>• {guide.studyTechniquesHub?.activeRecallFlashcards?.length || 0} flashcards</span>
                  </div>
                </div>

                {/* Barra de Acciones y Descarga de Documentos (PDF / Word) */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2">
                    {/* Botón Descargar PDF Oficial (Funcional para todas las guías) */}
                    <button
                      onClick={() => exportGuideToPdf(guide)}
                      className="flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-bold bg-blue-50 hover:bg-blue-100 text-[#0F52BA] border border-blue-200/90 flex items-center justify-center gap-1.5 transition-all shadow-soft-xs active:scale-[0.98] cursor-pointer"
                      title="Descargar o Guardar como PDF de alta resolución"
                    >
                      <span>📄 PDF (.pdf)</span>
                    </button>

                    {/* Botón Descargar Word */}
                    <button
                      onClick={() => exportGuideToWord(guide)}
                      className="flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/90 flex items-center justify-center gap-1.5 transition-all shadow-soft-xs active:scale-[0.98] cursor-pointer"
                      title="Descargar guía completa en formato Microsoft Word (.doc)"
                    >
                      <span>📝 Word (.doc)</span>
                    </button>

                    {/* Botón PDF Original Notion si existe */}
                    {guide.id && OFFICIAL_NOTION_PDF_LINKS[guide.id] && OFFICIAL_NOTION_PDF_LINKS[guide.id].length > 0 && (
                      <a
                        href={OFFICIAL_NOTION_PDF_LINKS[guide.id][0].url}
                        target="_blank"
                        rel="noreferrer"
                        download={OFFICIAL_NOTION_PDF_LINKS[guide.id][0].filename}
                        className="py-1.5 px-2.5 rounded-xl text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 flex items-center justify-center gap-1 transition-all shadow-soft-xs active:scale-[0.98] cursor-pointer"
                        title="Abrir o descargar archivo PDF original de Notion"
                      >
                        <span>Notion</span>
                      </a>
                    )}
                  </div>

                    {guide.id && OFFICIAL_NOTION_PDF_LINKS[guide.id] && OFFICIAL_NOTION_PDF_LINKS[guide.id].length > 1 && (
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          Guías originales de Notion ({OFFICIAL_NOTION_PDF_LINKS[guide.id].length} archivos adjuntos):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {OFFICIAL_NOTION_PDF_LINKS[guide.id].map((pdf, pIdx) => (
                            <a
                              key={pIdx}
                              href={pdf.url}
                              target="_blank"
                              rel="noreferrer"
                              download={pdf.filename}
                              className="text-[10px] font-medium px-2 py-1 rounded-md bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-300 transition-colors flex items-center gap-1 shadow-soft-2xs cursor-pointer"
                              title={pdf.label}
                            >
                              <span>📄</span>
                              <span className="truncate max-w-[130px]">{pdf.label.replace(/\s*\(PDF\)/i, '')}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedDeconstructedGuide(guide)}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-black text-white flex items-center justify-center gap-1.5 transition-all shadow-soft cursor-pointer active:scale-[0.98]"
                    >
                      <BookOpenIcon className="w-3.5 h-3.5 text-rose-400" />
                      <span>Ver Guía Editorial</span>
                    </button>

                    <button
                      onClick={() => handleStartExamFromDeconstructed(guide)}
                      className="py-2 px-3.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-soft flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
                      title="Simular examen con preguntas de esta guía"
                    >
                      <PlayIcon className="w-3.5 h-3.5 text-white" />
                      <span>Simular</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>¿Quieres consultar contenidos de bachillerato o de la UCV? Cambia a la pestaña <strong>«Todas»</strong> en la barra superior.</span>
            <button
              onClick={() => setActiveTab('ALL')}
              className="text-[#0F52BA] font-bold hover:underline"
            >
              Ver todas las guías →
            </button>
          </div>
        </div>
      )}

      {/* VISTA 0B: PROGRAMA EXCLUSIVO DE ANDRÉS RIVERO (1ER AÑO DE BACHILLERATO) */}
      {(isAndres || activeTab === 'andres_curriculum') && (
        <div className="space-y-6 animate-fadeIn">
          {/* Banner de Presentación PlayStation / Gemini Dark */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#0d1527] to-[#050811] border border-[#0070d1]/40 shadow-[0_4px_24px_rgba(0,112,209,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#0070d1]/20 text-[#38bdf8] border border-[#0070d1]/50 font-mono">
                  Personalizado para Andrés Rivero · 1er Año Bachillerato
                </span>
                <span className="text-[10px] font-mono text-slate-300">
                  Colegio Consolación • {ALL_ANDRES_DECONSTRUCTED_GUIDES.length} Guías Oficiales en 7 Pilares • {ALL_ANDRES_QUESTIONS.length} Reactivos
                </span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight font-sans flex items-center gap-2">
                <span>Mis Guías Temáticas Deconstruidas</span>
                <span className="text-xs font-normal text-[#38bdf8] font-mono px-2 py-0.5 rounded-md bg-blue-950/60 border border-blue-800/40">
                  {andresSubjectFilter === 'TODAS'
                    ? `Mostrando las ${ALL_ANDRES_DECONSTRUCTED_GUIDES.length} guías oficiales`
                    : `Filtro: ${andresSubjectFilter}`}
                </span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                Guías de estudio estructuradas con el Método de 7 Pilares (Conceptos clave, Fórmulas, Ejemplos resueltos, Errores comunes, Mnemotecnias, Cornell, Flashcards y Examen de 14–20 preguntas por tema). Descarga en Word o PDF para llevar al colegio.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() =>
                  onStartExamWithQuestions?.(
                    ANDRES_INTEGRAL_EXAM_QUESTIONS,
                    '1er Año Bachillerato · Gran Simulacro Integral (Todas las Unidades)'
                  )
                }
                className="bg-gradient-to-r from-[#00439c] to-[#0070d1] hover:from-[#003882] hover:to-[#005fb3] active:scale-[0.97] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-[0_0_20px_rgba(0,112,209,0.4)] flex items-center gap-1.5 transition-all cursor-pointer border border-[#38bdf8]/30"
              >
                <PlayIcon className="w-3.5 h-3.5 text-white" />
                <span>Simular Examen Integral ({ANDRES_INTEGRAL_EXAM_QUESTIONS.length})</span>
              </button>
            </div>
          </div>

          {/* Grid de las 12 Guías Deconstruidas para Andrés */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALL_ANDRES_DECONSTRUCTED_GUIDES.filter((guide) => {
              if (andresSubjectFilter === 'TODAS') return true;
              return guide.guideMetadata.area.toLowerCase().includes(andresSubjectFilter.toLowerCase());
            }).map((guide) => (
              <div
                key={guide.id}
                className="p-5 rounded-3xl bg-white dark:bg-[#0d1527] border border-slate-200/90 dark:border-blue-900/40 hover:border-[#0070d1] dark:hover:border-[#38bdf8] transition-all shadow-soft flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/80 text-[#0070d1] dark:text-[#38bdf8] font-mono border border-blue-200 dark:border-blue-800/40">
                      {guide.guideMetadata.area}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/50 dark:border-emerald-800/40">
                      {guide.generatedQuestions?.length || 5} Reactivos
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug font-sans">
                    {guide.guideMetadata.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 font-sans">
                    {guide.guideMetadata.summary}
                  </p>

                  <div className="pt-1 flex flex-wrap gap-1 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    <span>• {guide.glossary?.length || 0} términos</span>
                    <span>• {guide.formulasAndStrategies?.coreFormulas?.length || 0} modelos</span>
                    <span>• {guide.studyTechniquesHub?.activeRecallFlashcards?.length || 0} flashcards</span>
                  </div>
                </div>

                {/* Barra de Acciones y Descarga de Documentos (PDF / Word) */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => exportGuideToPdf(guide)}
                      className="flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-bold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 text-[#0F52BA] dark:text-[#38bdf8] border border-blue-200/90 dark:border-blue-800/50 flex items-center justify-center gap-1.5 transition-all shadow-soft-xs active:scale-[0.98] cursor-pointer"
                      title="Descargar o Guardar como PDF de alta resolución"
                    >
                      <span>📄 PDF (.pdf)</span>
                    </button>
                    <button
                      onClick={() => exportGuideToWord(guide)}
                      className="flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-bold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-soft-xs active:scale-[0.98] cursor-pointer"
                      title="Descargar guía completa en formato Microsoft Word (.doc)"
                    >
                      <span>📝 Word (.doc)</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedDeconstructedGuide(guide)}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-black dark:bg-[#131d36] dark:hover:bg-[#1a2747] text-white flex items-center justify-center gap-1.5 transition-all shadow-soft cursor-pointer active:scale-[0.98] border border-transparent dark:border-blue-800/30"
                    >
                      <BookOpenIcon className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span>Ver Guía</span>
                    </button>

                    <button
                      onClick={() => handleStartExamFromDeconstructed(guide)}
                      className="py-2 px-3.5 rounded-xl text-xs font-bold bg-[#0070d1] hover:bg-[#005fb3] text-white shadow-soft flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
                      title="Simular examen completo con todas las preguntas de esta guía"
                    >
                      <PlayIcon className="w-3.5 h-3.5 text-white" />
                      <span>Examen ({guide.generatedQuestions?.length || 16})</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
          <div className="max-w-4xl w-full max-h-[96vh] flex flex-col">
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
