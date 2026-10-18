/**
 * @file UCVIntroCourseHub.tsx
 * @description Centro Oficial del Curso Introductorio de la Facultad de Ciencias (UCV).
 * Unifica el Plan de Estudios de 6 Semanas con prelación matemática, las 3 Unidades de Aprendizaje (UA I, UA II, UA III),
 * guías deconstruidas con fórmulas KaTeX, laboratorios visuales interactivos y el centro de evaluación oficial.
 */

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { renderLatex, renderLatexToHtml } from '../../utils/latexRenderer';
import {
  UCV_6_WEEKS_SYLLABUS,
  UCV_CURRICULUM_MODULES,
  UCV_EXAM_BANK,
} from '../../data/ucv_intro_course_data';
import { UCVInteractiveLabs, type LabTabId } from './UCVInteractiveLabs';
import { ReadingComprehensionTrainer } from './ReadingComprehensionTrainer';
import { SentenceSyntaxAnalyzer } from './SentenceSyntaxAnalyzer';
import { SpeedReadingTimer } from './SpeedReadingTimer';
import { VectorAndGraphInteractive } from './VectorAndGraphInteractive';
import { ScientificVisualizer } from './ScientificVisualizer';
import { LinearEquationSolver } from '../tools/LinearEquationSolver';
import { plannerService } from '../../services/plannerService';
import { taskService } from '../../services/taskService';
import { getQuestionsForProfile } from '../../lib/questionBank';
import type { ExamConfig, Question } from '../../types/exam.types';
import {
  AtomIcon,
  LayersIcon,
  BookOpenIcon,
  CalendarIcon,
  PlayIcon,
  CheckCircleIcon,
} from '../common/Icons';
import {
  CalendarPlus,
  Award,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  ExternalLink,
  Target,
  Sparkles,
} from 'lucide-react';

interface UCVIntroCourseHubProps {
  onStartExam?: (config: ExamConfig, customQuestions?: Question[]) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const UCVIntroCourseHub: React.FC<UCVIntroCourseHubProps> = ({
  onStartExam,
  onNavigateToTab,
}) => {
  const { user } = useAuth();
  const [hubTab, setHubTab] = useState<'ROADMAP' | 'MODULES' | 'LABS' | 'EXAMS'>('ROADMAP');
  const [selectedModuleId, setSelectedModuleId] = useState<string>(UCV_CURRICULUM_MODULES[0].id);
  const [selectedModuleSubTab, setSelectedModuleSubTab] = useState<
    'THEORY' | 'FORMULAS' | 'EXAMPLES' | 'TRAPS' | 'FLASHCARDS'
  >('THEORY');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<'ALL' | 'UA_I' | 'UA_II' | 'UA_III'>('ALL');

  // Controles de Visibilidad y Desglose Didáctico de Guías Teóricas
  const [theoryTextSize, setTheoryTextSize] = useState<'NORMAL' | 'LARGE' | 'HIGH_CONTRAST'>('LARGE');
  const [didacticDeconstruction, setDidacticDeconstruction] = useState<boolean>(true);

  // Control de sub-laboratorio activo
  const [activeSpecialLab, setActiveSpecialLab] = useState<
    'INTERACTIVE_LABS' | 'READING' | 'SYNTAX' | 'SPEED_READING' | 'GRAPH_VECTORS' | 'EQUATIONS' | 'VISUALIZER'
  >('INTERACTIVE_LABS');
  const [initialLabTab, setInitialLabTab] = useState<LabTabId>('si_arithmetic');

  const [isInjectingSchedule, setIsInjectingSchedule] = useState<boolean>(false);
  const [scheduleInjectedMessage, setScheduleInjectedMessage] = useState<string | null>(null);

  // Módulo actualmente seleccionado
  const currentModule =
    UCV_CURRICULUM_MODULES.find((m) => m.id === selectedModuleId) || UCV_CURRICULUM_MODULES[0];

  // Módulos filtrados por Unidad de Aprendizaje
  const filteredModules = UCV_CURRICULUM_MODULES.filter((m) => {
    if (selectedUnitFilter === 'ALL') return true;
    return m.unit === selectedUnitFilter;
  });

  /**
   * Navega directamente a un laboratorio específico desde el Roadmap
   */
  const handleOpenLabFromWeek = (labType: 'INTERACTIVE_LABS' | 'READING' | 'SYNTAX', labTab?: LabTabId) => {
    setActiveSpecialLab(labType);
    if (labTab) setInitialLabTab(labTab);
    setHubTab('LABS');
  };

  /**
   * Inyecta el cronograma oficial de 6 semanas en las tablas events_and_deadlines y kanban_tasks
   */
  const handleInjectSchedule = async () => {
    setIsInjectingSchedule(true);
    setScheduleInjectedMessage(null);

    if (!user?.id) {
      setScheduleInjectedMessage('Debes iniciar sesión con tu perfil académico para vincular tu cronograma.');
      setIsInjectingSchedule(false);
      setTimeout(() => setScheduleInjectedMessage(null), 4000);
      return;
    }

    const now = new Date();
    const targetUserId = user.id;

    const eventsToCreate = UCV_6_WEEKS_SYLLABUS.map((week, idx) => {
      const eventDate = new Date(now.getTime() + (idx + 1) * 7 * 24 * 60 * 60 * 1000);
      return {
        title: `Hito Semanal: ${week.title}`,
        subject: 'Curso Introductorio UCV',
        date: eventDate.toISOString().split('T')[0],
        type: 'PARCIAL' as const,
        weightPercentage: 15,
        notes: `Enfoque: ${week.focus}. Horas estimadas: ${week.hours}h. Evaluaciones: ${week.evaluations.join(', ')}.`,
      };
    });

    try {
      // 1. Inyectar eventos en plannerService
      for (const ev of eventsToCreate) {
        plannerService.addEvent(targetUserId, ev);
      }

      // 2. Inyectar tareas en taskService
      UCV_6_WEEKS_SYLLABUS.forEach((week, idx) => {
        const dueDate = new Date(now.getTime() + (idx + 1) * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        taskService.addTask(targetUserId, {
          title: `Meta Semanal UCV: ${week.title}`,
          subject: 'Curso Introductorio UCV',
          priority: 'ALTA',
          dueDate,
        });
      });

      // 3. Sincronización opcional con Supabase si está disponible
      if (isSupabaseConfigured() && user?.id) {
        const supabaseEvents = UCV_6_WEEKS_SYLLABUS.map((week, idx) => {
          const eventDate = new Date(now.getTime() + (idx + 1) * 7 * 24 * 60 * 60 * 1000);
          return {
            user_id: targetUserId,
            title: `Hito Semanal: ${week.title}`,
            description: `Enfoque: ${week.focus}. Horas estimadas: ${week.hours}h. Evaluaciones: ${week.evaluations.join(', ')}.`,
            event_type: 'exam',
            subject: 'Curso Introductorio UCV',
            due_date: eventDate.toISOString().split('T')[0],
            academic_profile: user?.academic_profile || 'santiago_fisica_ucv',
            priority: 'high',
          };
        });
        await (supabase.from('events_and_deadlines') as any).insert(supabaseEvents);
      }

      setScheduleInjectedMessage(
        '¡Cronograma oficial de 6 semanas inyectado con éxito en tu Agenda y Calendario Académico!'
      );
      setTimeout(() => setScheduleInjectedMessage(null), 5000);
    } catch (err) {
      console.warn('Error inyectando cronograma:', err);
      setScheduleInjectedMessage('Se registró el cronograma en el almacenamiento local para tu perfil.');
      setTimeout(() => setScheduleInjectedMessage(null), 4000);
    } finally {
      setIsInjectingSchedule(false);
    }
  };

  /**
   * Inicia el examen diagnóstico inicial oficial
   */
  const handleLaunchDiagnostic = () => {
    if (onStartExam) {
      const config: ExamConfig = {
        mode: 'UNIVERSITY_EXAM',
        title: 'Evaluación Diagnóstica Inicial - Ciencias UCV',
        totalQuestions: 15,
        timeLimitSeconds: 45 * 60,
        allowPause: true,
        shuffleQuestions: true,
        subject: 'Física',
      };
      onStartExam(config, UCV_EXAM_BANK);
    }
  };

  /**
   * Inicia el cuestionario de un módulo específico con reactivos aislados del tema
   */
  const handleLaunchModuleQuiz = (moduleTitle: string, moduleId?: string) => {
    if (onStartExam) {
      const targetMod = UCV_CURRICULUM_MODULES.find((m) => m.id === moduleId || m.title === moduleTitle);
      const unitClean = targetMod ? targetMod.unit.replace('_', ' ') : '';
      const matching = UCV_EXAM_BANK.filter(
        (q) =>
          (targetMod && q.sourceExam && q.sourceExam.includes(unitClean)) ||
          q.topic.toLowerCase().includes(moduleTitle.toLowerCase()) ||
          (targetMod && targetMod.summary.toLowerCase().includes(q.topic.toLowerCase()))
      );
      const questionsToUse = matching.length >= 3 ? matching : UCV_EXAM_BANK;
      const config: ExamConfig = {
        mode: 'QUICK_PRACTICE',
        title: `Cuestionario Formativo: ${moduleTitle}`,
        totalQuestions: Math.min(5, questionsToUse.length),
        timeLimitSeconds: 20 * 60,
        allowPause: true,
        shuffleQuestions: true,
      };
      onStartExam(config, questionsToUse);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Banner Principal de la Academia UCV */}
      <div className="app-card p-6 sm:p-8 bg-white border border-slate-200/90 shadow-soft rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0F52BA] border border-blue-200 text-xs font-bold font-sans">
            <AtomIcon className="w-3.5 h-3.5" />
            <span>Facultad de Ciencias • Universidad Central de Venezuela</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            Curso Introductorio Ciencias UCV 🏛️
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Plataforma interactiva oficial de 6 semanas con prelación matemática. Cubre la{' '}
            <strong>UA I (Autogestión y Método Científico)</strong>, la{' '}
            <strong>UA II (Lenguaje y Pensamiento Crítico)</strong> y la{' '}
            <strong>UA III (Pensamiento Lógico-Matemático en 5 Bloques)</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5 text-blue-700 bg-blue-50/80 px-2.5 py-0.5 rounded-lg border border-blue-100">
              <Sparkles className="w-3 h-3 text-blue-600" />
              6 Semanas Curriculares
            </span>
            <span className="flex items-center gap-1.5 text-indigo-700 bg-indigo-50/80 px-2.5 py-0.5 rounded-lg border border-indigo-100">
              <Target className="w-3 h-3 text-indigo-600" />
              7 Módulos deconstruidos
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50/80 px-2.5 py-0.5 rounded-lg border border-emerald-100">
              <FlaskConical className="w-3 h-3 text-emerald-600" />
              5 Laboratorios Oficiales
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={handleInjectSchedule}
            disabled={isInjectingSchedule}
            className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200/80 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-soft-xs font-sans"
            title="Inyectar las 6 semanas de metas en el Calendario y Kanban"
          >
            <CalendarPlus className="w-4 h-4 text-[#0F52BA]" />
            <span>{isInjectingSchedule ? 'Inyectando...' : 'Inyectar Cronograma (6 Semanas)'}</span>
          </button>

          <button
            onClick={handleLaunchDiagnostic}
            className="px-5 py-3 rounded-2xl bg-[#0F52BA] hover:bg-[#0c4194] text-white text-xs font-bold transition-all shadow-soft flex items-center justify-center gap-2 active:scale-95 font-sans"
          >
            <PlayIcon className="w-3.5 h-3.5" />
            <span>Diagnóstico Inicial (Día 1)</span>
          </button>
        </div>
      </div>

      {scheduleInjectedMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center justify-between gap-2.5 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{scheduleInjectedMessage}</span>
          </div>
          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab('PLANNER')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline ml-2 shrink-0"
            >
              Ver en Calendario →
            </button>
          )}
        </div>
      )}

      {/* Navegación Superior de Pestañas del Hub */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 bg-slate-200/80 rounded-2xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setHubTab('ROADMAP')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              hubTab === 'ROADMAP'
                ? 'bg-white text-slate-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarIcon className="w-4 h-4 text-[#0F52BA]" />
            <span>Plan de Estudios (6 Semanas)</span>
          </button>

          <button
            onClick={() => setHubTab('MODULES')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              hubTab === 'MODULES'
                ? 'bg-white text-slate-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpenIcon className="w-4 h-4 text-indigo-600" />
            <span>Guías Deconstruidas (7 Módulos)</span>
          </button>

          <button
            onClick={() => setHubTab('LABS')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              hubTab === 'LABS'
                ? 'bg-white text-slate-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-purple-600" />
            <span>Laboratorios Visuales Interactivos</span>
          </button>

          <button
            onClick={() => setHubTab('EXAMS')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              hubTab === 'EXAMS'
                ? 'bg-white text-slate-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>Centro de Evaluación UCV</span>
          </button>
        </div>

        {onNavigateToTab && (
          <button
            onClick={() => onNavigateToTab('EXAMS')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#0F52BA] hover:bg-blue-50 transition-colors"
          >
            <span>Simulador SIMADI</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* PESTAÑA 1: ROADMAP CURRICULAR DE 6 SEMANAS */}
      {/* ========================================================================= */}
      {hubTab === 'ROADMAP' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {UCV_6_WEEKS_SYLLABUS.map((week) => {
              // Mapeo didáctico a los laboratorios de la semana
              let targetLabType: 'INTERACTIVE_LABS' | 'READING' | 'SYNTAX' = 'INTERACTIVE_LABS';
              let targetLabSubTab: LabTabId = 'si_arithmetic';
              let labLabel = 'Laboratorio SI';

              if (week.weekNumber === 1) {
                targetLabType = 'INTERACTIVE_LABS';
                targetLabSubTab = 'caja_negra';
                labLabel = 'Lab: Caja Negra';
              } else if (week.weekNumber === 2) {
                targetLabType = 'READING';
                labLabel = 'Lab: Comprensión Lectora';
              } else if (week.weekNumber === 3) {
                targetLabType = 'INTERACTIVE_LABS';
                targetLabSubTab = 'si_arithmetic';
                labLabel = 'Lab: MCD y MCM';
              } else if (week.weekNumber === 4) {
                targetLabType = 'INTERACTIVE_LABS';
                targetLabSubTab = 'intervals_algebra';
                labLabel = 'Lab: Intervalos & Irracionales';
              } else if (week.weekNumber === 5) {
                targetLabType = 'INTERACTIVE_LABS';
                targetLabSubTab = 'venn_vectors';
                labLabel = 'Lab: Vectores 2D & Trigonometría';
              } else {
                targetLabType = 'INTERACTIVE_LABS';
                targetLabSubTab = 'pregunta_inversa';
                labLabel = 'Lab: Pregunta Inversa';
              }

              return (
                <div
                  key={week.weekNumber}
                  className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-3xl flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0F52BA] font-bold border border-blue-200">
                        {week.unitCode}
                      </span>
                      <span className="text-xs text-slate-400 font-mono font-semibold">
                        {week.hours}h lectivas
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug font-sans group-hover:text-[#0F52BA] transition-colors">
                      {week.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      {week.focus}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block font-mono">
                        Temas Oficiales:
                      </span>
                      <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                        {week.topics.slice(0, 3).map((top, idx) => (
                          <li key={idx} className="truncate">
                            {top}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedModuleId(
                            UCV_CURRICULUM_MODULES[Math.min(week.weekNumber - 1, UCV_CURRICULUM_MODULES.length - 1)].id
                          );
                          setHubTab('MODULES');
                        }}
                        className="text-xs font-bold text-[#0F52BA] hover:text-blue-800 flex items-center gap-1 transition-colors"
                      >
                        <span>Ver Guía Teórica</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => handleLaunchModuleQuiz(week.title)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-soft-xs"
                      >
                        Quiz
                      </button>
                    </div>

                    <button
                      onClick={() => handleOpenLabFromWeek(targetLabType, targetLabSubTab)}
                      className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
                      <span>{labLabel}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 2: GUÍAS DECONSTRUIDAS (7 MÓDULOS) */}
      {/* ========================================================================= */}
      {hubTab === 'MODULES' && (
        <div className="space-y-4">
          {/* Filtro por Unidad de Aprendizaje */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            {[
              { id: 'ALL', label: 'Todos los Módulos (7)' },
              { id: 'UA_I', label: 'UA I: Método Científico & Autogestión' },
              { id: 'UA_II', label: 'UA II: Lectura Crítica & Lenguaje' },
              { id: 'UA_III', label: 'UA III: Pensamiento Lógico-Matemático' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedUnitFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedUnitFilter === f.id
                    ? 'bg-white text-slate-900 shadow-soft-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Selector Lateral de Módulos (4 columnas) */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-[11px] uppercase font-mono font-bold tracking-wider text-slate-400 px-1 block">
                Módulos Disponibles ({filteredModules.length}):
              </span>
              <div className="space-y-1.5">
                {filteredModules.map((mod) => {
                  const isSelected = mod.id === selectedModuleId;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => setSelectedModuleId(mod.id)}
                      className={`w-full p-3.5 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-soft-sm font-bold'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          Semana {mod.week} • {mod.unit}
                        </span>
                      </div>
                      <div className="text-xs font-bold line-clamp-1">{mod.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visor de Contenido del Módulo (8 columnas) */}
            <div className="lg:col-span-8 app-card p-6 sm:p-7 bg-white border border-slate-200/90 shadow-soft rounded-3xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#0F52BA] font-bold">
                    {currentModule.unitName}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 font-sans mt-0.5">
                    {currentModule.title}
                  </h2>
                </div>
                <button
                  onClick={() => handleLaunchModuleQuiz(currentModule.title, currentModule.id)}
                  className="px-3.5 py-2 rounded-xl bg-[#0F52BA] hover:bg-[#0c4194] text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-soft-xs"
                >
                  <PlayIcon className="w-3 h-3" />
                  <span>Evaluar Módulo</span>
                </button>
              </div>

              {/* Selector de Subpestañas del Módulo */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl">
                {[
                  { id: 'THEORY', label: 'Teoría con KaTeX' },
                  { id: 'FORMULAS', label: 'Fórmulas Clave' },
                  { id: 'EXAMPLES', label: 'Paso a Paso' },
                  { id: 'TRAPS', label: 'Trampas de Examen' },
                  { id: 'FLASHCARDS', label: 'Flashcards' },
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedModuleSubTab(sub.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedModuleSubTab === sub.id
                        ? 'bg-white text-slate-900 shadow-soft-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              {/* Contenido de la Subpestaña */}
              <div className="pt-2">
                {selectedModuleSubTab === 'THEORY' && (
                  <div className="space-y-5">
                    {/* Barra de Controles de Lectura Didáctica & Alto Contraste */}
                    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-soft-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wide">
                          Visibilidad del Texto:
                        </span>
                        <div className="inline-flex p-0.5 rounded-xl bg-white border border-slate-200">
                          <button
                            onClick={() => setTheoryTextSize('NORMAL')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                              theoryTextSize === 'NORMAL'
                                ? 'bg-slate-900 text-white shadow-soft-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Aa Estándar
                          </button>
                          <button
                            onClick={() => setTheoryTextSize('LARGE')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                              theoryTextSize === 'LARGE'
                                ? 'bg-[#0F52BA] text-white shadow-soft-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Aa+ Didáctico
                          </button>
                          <button
                            onClick={() => setTheoryTextSize('HIGH_CONTRAST')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                              theoryTextSize === 'HIGH_CONTRAST'
                                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-soft-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            👁️ Alto Contraste
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => setDidacticDeconstruction(!didacticDeconstruction)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                          didacticDeconstruction
                            ? 'bg-blue-50 text-[#0F52BA] border-blue-200 shadow-soft-xs'
                            : 'bg-white text-slate-600 border-slate-200'
                        }`}
                      >
                        <span>💡</span>
                        <span>Desglose por Capas: {didacticDeconstruction ? 'Activado' : 'Básico'}</span>
                      </button>
                    </div>

                    {/* Bloques de Contenido Teórico con Desglose Pedagógico */}
                    <div className="space-y-4">
                      {currentModule.theoryLatex.map((paragraph, idx) => (
                        <div
                          key={idx}
                          className={`rounded-3xl border transition-all duration-200 p-5 space-y-4 shadow-soft-xs ${
                            theoryTextSize === 'HIGH_CONTRAST'
                              ? 'bg-white border-slate-900 text-slate-950 shadow-soft'
                              : theoryTextSize === 'LARGE'
                              ? 'bg-slate-50/80 border-slate-200/90 text-slate-900'
                              : 'bg-white border-slate-200/70 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <span className="text-[11px] font-mono font-bold text-slate-400">
                              Concepto #{idx + 1} • {currentModule.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-[#0F52BA] font-semibold border border-blue-100">
                              Semana {currentModule.week}
                            </span>
                          </div>

                          {/* Párrafo Teórico en KaTeX */}
                          <div
                            className={`font-sans ${
                              theoryTextSize === 'HIGH_CONTRAST'
                                ? 'text-base sm:text-lg font-semibold text-slate-950 leading-loose'
                                : theoryTextSize === 'LARGE'
                                ? 'text-sm sm:text-base font-medium text-slate-900 leading-relaxed'
                                : 'text-xs sm:text-sm text-slate-700 leading-normal'
                            }`}
                            dangerouslySetInnerHTML={{
                              __html: renderLatex(paragraph),
                            }}
                          />

                          {/* Desglose Pedagógico Didáctico en Capas Específicas */}
                          {didacticDeconstruction && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 pt-3 border-t border-slate-200/70 text-xs">
                              {/* Capa 1: La Intuición */}
                              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
                                <div className="flex items-center gap-1.5 font-bold text-[#0F52BA]">
                                  <span>💡</span>
                                  <span>La Intuición</span>
                                </div>
                                <p className="text-[11px] text-slate-700 leading-relaxed">
                                  {currentModule.didacticLayers?.[idx]?.intuition ||
                                    'Visualiza el fenómeno físicamente antes del cálculo. Comprender el orden de magnitud evita errores de signos y unidades.'}
                                </p>
                              </div>

                              {/* Capa 2: Fórmula Clave / Modelo */}
                              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-1">
                                <div className="flex items-center gap-1.5 font-bold text-purple-700">
                                  <span>📐</span>
                                  <span>Fórmula Clave</span>
                                </div>
                                {currentModule.didacticLayers?.[idx]?.keyFormulaLatex ? (
                                  <div
                                    className="text-[11px] text-purple-900 font-mono py-0.5 overflow-x-auto"
                                    dangerouslySetInnerHTML={{
                                      __html: renderLatexToHtml(currentModule.didacticLayers[idx].keyFormulaLatex!, { displayMode: false }),
                                    }}
                                  />
                                ) : (
                                  <p className="text-[11px] text-slate-600 leading-relaxed font-mono">
                                    {currentModule.keyFormulas[idx % currentModule.keyFormulas.length]?.name || 'Expresión Analítica Formal'}
                                  </p>
                                )}
                                {currentModule.didacticLayers?.[idx]?.formulaNote && (
                                  <span className="text-[10px] text-purple-600 block">
                                    {currentModule.didacticLayers[idx].formulaNote}
                                  </span>
                                )}
                              </div>

                              {/* Capa 3: Trampa UCV */}
                              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                                <div className="flex items-center gap-1.5 font-bold text-amber-800">
                                  <span>⚠️</span>
                                  <span>Trampa UCV</span>
                                </div>
                                <p className="text-[11px] text-slate-700 leading-relaxed">
                                  {currentModule.didacticLayers?.[idx]?.examTrap ||
                                    currentModule.examTraps[idx % currentModule.examTraps.length] ||
                                    'Verifica el dominio antes de simplificar factores.'}
                                </p>
                              </div>

                              {/* Capa 4: Estrategia de Resolución */}
                              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                                  <span>⚡</span>
                                  <span>Estrategia Rápida</span>
                                </div>
                                <p className="text-[11px] text-slate-700 leading-relaxed">
                                  {currentModule.didacticLayers?.[idx]?.fastStrategy ||
                                    'Comprueba el resultado sustituyendo valores sencillos como x = 0 o x = 1.'}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedModuleSubTab === 'FORMULAS' && (
                  <div className="space-y-3">
                    {currentModule.keyFormulas.map((form, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <span className="text-xs font-bold text-slate-900 font-sans">{form.name}</span>
                        <div
                          className="text-sm font-bold text-[#0F52BA] py-1"
                          dangerouslySetInnerHTML={{
                            __html: renderLatexToHtml(form.latex, { displayMode: true }),
                          }}
                        />
                        <p
                          className="text-xs text-slate-500"
                          dangerouslySetInnerHTML={{ __html: renderLatex(form.description, false) }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {selectedModuleSubTab === 'EXAMPLES' && (
                  <div className="space-y-4">
                    {currentModule.stepByStepExamples.map((ex, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                        <span className="text-xs font-bold text-slate-900 block">{ex.title}</span>
                        <div
                          className="text-xs text-slate-700 font-medium"
                          dangerouslySetInnerHTML={{ __html: renderLatex(ex.statement, false) }}
                        />
                        <div className="space-y-1 text-xs text-slate-600 pl-3 border-l-2 border-indigo-400">
                          {ex.steps.map((st, i) => (
                            <div
                              key={i}
                              dangerouslySetInnerHTML={{ __html: renderLatex(st, false) }}
                            />
                          ))}
                        </div>
                        <div
                          className="text-xs font-bold text-emerald-700 pt-1"
                          dangerouslySetInnerHTML={{
                            __html: renderLatexToHtml(`\\mathbf{Respuesta:}\\; ${ex.answerLatex}`, { displayMode: false }),
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {selectedModuleSubTab === 'TRAPS' && (
                  <div className="space-y-3">
                    {currentModule.examTraps.map((trap, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 text-xs text-rose-900 flex items-start gap-2.5">
                        <span className="text-rose-600 font-bold shrink-0">⚠️ Trampa #{idx + 1}:</span>
                        <div
                          className="leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: renderLatex(trap, false) }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {selectedModuleSubTab === 'FLASHCARDS' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentModule.practiceFlashcards.map((flash, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <span className="text-[11px] uppercase font-mono font-bold text-slate-400 block">
                          Pregunta de Repetición Espaciada:
                        </span>
                        <div
                          className="text-xs font-bold text-slate-800"
                          dangerouslySetInnerHTML={{ __html: renderLatex(flash.front, false) }}
                        />
                        <div
                          className="pt-2 border-t border-slate-200 text-xs text-indigo-700 font-medium"
                          dangerouslySetInnerHTML={{ __html: renderLatex(flash.back, false) }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 3: LABORATORIOS VISUALES INTERACTIVOS */}
      {/* ========================================================================= */}
      {hubTab === 'LABS' && (
        <div className="space-y-6">
          {/* Sub-selector de Laboratorios */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveSpecialLab('INTERACTIVE_LABS')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSpecialLab === 'INTERACTIVE_LABS' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Laboratorios UCV (SI, MCD/MCM, Intervalos, Venn, Vectores, Caja Negra, Pregunta Inversa)
            </button>
            <button
              onClick={() => setActiveSpecialLab('READING')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSpecialLab === 'READING' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UA II: Comprensión Lectora
            </button>
            <button
              onClick={() => setActiveSpecialLab('SYNTAX')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSpecialLab === 'SYNTAX' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UA II: Sintaxis y Oraciones
            </button>
            <button
              onClick={() => setActiveSpecialLab('SPEED_READING')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSpecialLab === 'SPEED_READING' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UA II: Velocidad Lectora
            </button>
            <button
              onClick={() => setActiveSpecialLab('GRAPH_VECTORS')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSpecialLab === 'GRAPH_VECTORS' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UA III: Gráficas y Planos 2D/3D
            </button>
            <button
              onClick={() => setActiveSpecialLab('VISUALIZER')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSpecialLab === 'VISUALIZER' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UA III: Visualizador Científico
            </button>
            <button
              onClick={() => setActiveSpecialLab('EQUATIONS')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSpecialLab === 'EQUATIONS' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UA III: Solucionador de Sistemas
            </button>
          </div>

          {activeSpecialLab === 'INTERACTIVE_LABS' && <UCVInteractiveLabs initialTab={initialLabTab} />}
          {activeSpecialLab === 'READING' && <ReadingComprehensionTrainer />}
          {activeSpecialLab === 'SYNTAX' && <SentenceSyntaxAnalyzer />}
          {activeSpecialLab === 'SPEED_READING' && <SpeedReadingTimer />}
          {activeSpecialLab === 'GRAPH_VECTORS' && <VectorAndGraphInteractive />}
          {activeSpecialLab === 'VISUALIZER' && (
            <ScientificVisualizer
              category="fisica"
              title="Diagrama de Cuerpo Libre (DCL) y Vectores de Fuerza"
              subtitle="Laboratorio oficial de magnitudes y vectores en el plano inclinado"
              mainEquationLatex="\Sigma \vec{F} = m \cdot \vec{a} \implies N - mg \cos(\theta) = 0"
              physicsData={{
                massKg: 5,
                inclineDeg: 30,
                vectors: [
                  { id: '1', label: 'N', angleDeg: 60, magnitude: 42.4, color: '#3b82f6' },
                  { id: '2', label: 'P', angleDeg: 270, magnitude: 49.0, color: '#ef4444' },
                  { id: '3', label: 'F_{roz}', angleDeg: 150, magnitude: 12.0, color: '#f59e0b' },
                ],
              }}
            />
          )}
          {activeSpecialLab === 'EQUATIONS' && <LinearEquationSolver />}
        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 4: CENTRO DE EVALUACIÓN OFICIAL UCV */}
      {/* ========================================================================= */}
      {hubTab === 'EXAMS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Modelo A: Diagnóstico Inicial */}
            <div className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-3xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  Hito Día 1
                </span>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Evaluación Diagnóstica Inicial
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Batería de 15 reactivos multidisciplinares (Método Científico, Lectura Crítica, Aritmética, Álgebra y Vectores) para medir tu perfil de entrada.
                </p>
              </div>

              <button
                onClick={handleLaunchDiagnostic}
                className="w-full py-2.5 rounded-xl bg-[#0F52BA] hover:bg-[#0c4194] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-soft-xs"
              >
                <PlayIcon className="w-3.5 h-3.5" />
                <span>Comenzar Diagnóstico Inicial</span>
              </button>
            </div>

            {/* Modelo B: Quizzes Formativos por Módulo */}
            <div className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-3xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  Formativo Semanal
                </span>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Cuestionarios de Práctica (7 Módulos)
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Evaluaciones rápidas de 5 preguntas por tema con retroalimentación paso a paso y explicación rigurosa con KaTeX.
                </p>
              </div>

              <button
                onClick={() => handleLaunchModuleQuiz('Fundamentos Aritméticos y Álgebra')}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-soft-xs"
              >
                <LayersIcon className="w-3.5 h-3.5" />
                <span>Iniciar Cuestionario Rápido</span>
              </button>
            </div>

            {/* Modelo C: Diagnóstico Final y Ganancia de Aprendizaje */}
            <div className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-3xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700">
                  Cierre Semana 6
                </span>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Evaluación Diagnóstica Final
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Evaluación de salida para medir tu ganancia de aprendizaje (Learning Gain) y verificar que estás 100% listo para el primer semestre.
                </p>
              </div>

              <button
                onClick={handleLaunchDiagnostic}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-soft-xs"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Comenzar Prueba de Salida</span>
              </button>
            </div>
          </div>

          {/* SECCIÓN ESPECIAL: EVALUACIONES INDIVIDUALES POR ASIGNATURA UCV */}
          <div className="pt-4 border-t border-slate-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase text-[#0F52BA]">
                  Plan de Estudio Individual • Licenciatura en Física & Ciencias UCV
                </span>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Pruebas Parciales Específicas por Asignatura
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-400">
                Calibrado con el programa oficial
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-[#0F52BA] font-bold">
                    Física General I
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    Cinemática & Dinámica de la Partícula
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Vectores de velocidad y aceleración instantánea, DCL, fricción y trabajo-energía.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (onStartExam) {
                      const questions = getQuestionsForProfile('santiago_fisica_ucv', 'Física', 'Física', 6);
                      onStartExam(
                        {
                          mode: 'UNIVERSITY_EXAM',
                          title: 'Física General I: Cinemática y Dinámica de la Partícula (UCV)',
                          totalQuestions: questions.length,
                          timeLimitSeconds: 45 * 60,
                          allowPause: true,
                          shuffleQuestions: true,
                          subject: 'Física',
                        },
                        questions
                      );
                    }
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-soft-xs"
                >
                  <PlayIcon className="w-3 h-3 text-blue-400" />
                  <span>Evaluar Física I (45 min)</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold">
                    Cálculo I
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    Límites Notables & Derivadas
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Indeterminaciones, teorema del sándwich, continuidad y regla de la cadena.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (onStartExam) {
                      const questions = getQuestionsForProfile('santiago_fisica_ucv', 'Matemática', 'Cálculo', 6);
                      onStartExam(
                        {
                          mode: 'UNIVERSITY_EXAM',
                          title: 'Cálculo I: Límites Notables y Derivadas (UCV)',
                          totalQuestions: questions.length,
                          timeLimitSeconds: 45 * 60,
                          allowPause: true,
                          shuffleQuestions: true,
                          subject: 'Matemática',
                        },
                        questions
                      );
                    }
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-soft-xs"
                >
                  <PlayIcon className="w-3 h-3 text-indigo-400" />
                  <span>Evaluar Cálculo I (45 min)</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">
                    Álgebra Lineal
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    Vectores en ℝ³ & Geometría Analítica
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Producto punto, producto cruz, planos en el espacio y sistemas de ecuaciones lineales.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (onStartExam) {
                      const questions = getQuestionsForProfile('santiago_fisica_ucv', 'Matemática', 'Álgebra Lineal', 6);
                      onStartExam(
                        {
                          mode: 'UNIVERSITY_EXAM',
                          title: 'Álgebra Lineal: Vectores en R3 y Geometría (UCV)',
                          totalQuestions: questions.length,
                          timeLimitSeconds: 40 * 60,
                          allowPause: true,
                          shuffleQuestions: true,
                          subject: 'Matemática',
                        },
                        questions
                      );
                    }
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-soft-xs"
                >
                  <PlayIcon className="w-3 h-3 text-purple-400" />
                  <span>Evaluar Álgebra (40 min)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
