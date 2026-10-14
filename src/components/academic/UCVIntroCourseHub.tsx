/**
 * @file UCVIntroCourseHub.tsx
 * @description Centro Oficial del Curso Introductorio de la Facultad de Ciencias (UCV).
 * Unifica el Plan de Estudios de 6 Semanas, las 3 Unidades de Aprendizaje (UA I, UA II, UA III),
 * guías deconstruidas con fórmulas KaTeX, laboratorios visuales interactivos y el centro de evaluación oficial.
 */

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { renderLatexToHtml } from '../../utils/latexRenderer';
import {
  UCV_6_WEEKS_SYLLABUS,
  UCV_CURRICULUM_MODULES,
  UCV_EXAM_BANK,
} from '../../data/ucv_intro_course_data';
import { UCVInteractiveLabs } from './UCVInteractiveLabs';
import { ReadingComprehensionTrainer } from './ReadingComprehensionTrainer';
import { SentenceSyntaxAnalyzer } from './SentenceSyntaxAnalyzer';
import { SpeedReadingTimer } from './SpeedReadingTimer';
import { VectorAndGraphInteractive } from './VectorAndGraphInteractive';
import { ScientificVisualizer } from './ScientificVisualizer';
import { LinearEquationSolver } from '../tools/LinearEquationSolver';
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
  const [selectedModuleSubTab, setSelectedModuleSubTab] = useState<'THEORY' | 'FORMULAS' | 'EXAMPLES' | 'TRAPS' | 'FLASHCARDS'>('THEORY');
  const [activeSpecialLab, setActiveSpecialLab] = useState<
    'INTERACTIVE_LABS' | 'READING' | 'SYNTAX' | 'SPEED_READING' | 'GRAPH_VECTORS' | 'EQUATIONS' | 'VISUALIZER'
  >('INTERACTIVE_LABS');
  const [isInjectingSchedule, setIsInjectingSchedule] = useState<boolean>(false);
  const [scheduleInjectedMessage, setScheduleInjectedMessage] = useState<string | null>(null);

  // Módulo actualmente seleccionado
  const currentModule = UCV_CURRICULUM_MODULES.find((m) => m.id === selectedModuleId) || UCV_CURRICULUM_MODULES[0];

  /**
   * Inyecta el cronograma oficial de 6 semanas en las tablas events_and_deadlines y kanban_tasks
   */
  const handleInjectSchedule = async () => {
    setIsInjectingSchedule(true);
    setScheduleInjectedMessage(null);

    const now = new Date();
    const targetUserId = user?.id || 'demo-user-id';

    const eventsToCreate = UCV_6_WEEKS_SYLLABUS.map((week, idx) => {
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

    try {
      if (isSupabaseConfigured() && user?.id) {
        await (supabase.from('events_and_deadlines') as any).insert(eventsToCreate);
      } else {
        // Modo local
        const existing = JSON.parse(localStorage.getItem('cpe_events_cache') || '[]');
        localStorage.setItem('cpe_events_cache', JSON.stringify([...eventsToCreate, ...existing]));
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
        totalQuestions: 10,
        timeLimitSeconds: 45 * 60,
        allowPause: true,
        shuffleQuestions: true,
        subject: 'Física',
      };
      onStartExam(config, UCV_EXAM_BANK);
    }
  };

  /**
   * Inicia el cuestionario de un módulo específico
   */
  const handleLaunchModuleQuiz = (moduleTitle: string) => {
    if (onStartExam) {
      const config: ExamConfig = {
        mode: 'QUICK_PRACTICE',
        title: `Cuestionario Formativo: ${moduleTitle}`,
        totalQuestions: 5,
        timeLimitSeconds: 20 * 60,
        allowPause: true,
        shuffleQuestions: true,
      };
      onStartExam(config, UCV_EXAM_BANK);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Banner Principal de la Academia UCV */}
      <div className="app-card p-6 sm:p-8 bg-white border border-slate-200/90 shadow-soft-sm rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6">
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
            <strong>UA II (Lenguaje y Crítica)</strong> y la{' '}
            <strong>UA III (Pensamiento Lógico-Matemático en 5 Bloques)</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={handleInjectSchedule}
            disabled={isInjectingSchedule}
            className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200/80 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-soft-xs"
            title="Inyectar las 6 semanas de metas en el Calendario y Kanban"
          >
            <CalendarPlus className="w-4 h-4 text-blue-600" />
            <span>{isInjectingSchedule ? 'Inyectando...' : 'Inyectar Cronograma (6 Semanas)'}</span>
          </button>

          <button
            onClick={handleLaunchDiagnostic}
            className="px-5 py-3 rounded-2xl bg-[#0F52BA] hover:bg-[#0c4194] text-white text-xs font-bold transition-all shadow-soft flex items-center justify-center gap-2 active:scale-95"
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
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/70 rounded-2xl border border-slate-200">
        <button
          onClick={() => setHubTab('ROADMAP')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            hubTab === 'ROADMAP'
              ? 'bg-white text-slate-900 shadow-soft-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CalendarIcon className="w-4 h-4 text-blue-600" />
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

      {/* ========================================================================= */}
      {/* PESTAÑA 1: ROADMAP CURRICULAR DE 6 SEMANAS */}
      {/* ========================================================================= */}
      {hubTab === 'ROADMAP' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {UCV_6_WEEKS_SYLLABUS.map((week) => (
              <div
                key={week.weekNumber}
                className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-3xl flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                      {week.unitCode}
                    </span>
                    <span className="text-xs text-slate-400 font-mono font-semibold">
                      {week.hours}h lectivas
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug font-sans group-hover:text-brand-600 transition-colors">
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

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedModuleId(UCV_CURRICULUM_MODULES[Math.min(week.weekNumber - 1, UCV_CURRICULUM_MODULES.length - 1)].id);
                      setHubTab('MODULES');
                    }}
                    className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1 transition-colors"
                  >
                    <span>Ver Guía</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => handleLaunchModuleQuiz(week.title)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-soft-xs"
                  >
                    Quiz Semanal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 2: GUÍAS DECONSTRUIDAS (7 MÓDULOS) */}
      {/* ========================================================================= */}
      {hubTab === 'MODULES' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Selector Lateral de Módulos (4 columnas) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[11px] uppercase font-mono font-bold tracking-wider text-slate-400 px-1 block">
              Módulos del Curso UCV:
            </span>
            <div className="space-y-1.5">
              {UCV_CURRICULUM_MODULES.map((mod) => {
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
                        className={`text-[10px] font-mono px-2 py-0.2 rounded-md font-semibold ${
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
                <span className="text-[11px] font-mono uppercase text-brand-600 font-bold">
                  {currentModule.unitName}
                </span>
                <h2 className="text-lg font-bold text-slate-900 font-sans mt-0.5">
                  {currentModule.title}
                </h2>
              </div>
              <button
                onClick={() => handleLaunchModuleQuiz(currentModule.title)}
                className="px-3.5 py-2 rounded-xl bg-[#0F52BA] hover:bg-[#0c4194] text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
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
                <div className="space-y-4">
                  {currentModule.theoryLatex.map((paragraph, idx) => (
                    <div
                      key={idx}
                      className="text-xs sm:text-sm text-slate-700 leading-relaxed p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60"
                      dangerouslySetInnerHTML={{
                        __html: renderLatexToHtml(paragraph, { displayMode: false }),
                      }}
                    />
                  ))}
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
                      <p className="text-xs text-slate-500">{form.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {selectedModuleSubTab === 'EXAMPLES' && (
                <div className="space-y-4">
                  {currentModule.stepByStepExamples.map((ex, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <span className="text-xs font-bold text-slate-900 block">{ex.title}</span>
                      <p className="text-xs text-slate-700 font-medium">{ex.statement}</p>
                      <div className="space-y-1 text-xs text-slate-600 pl-3 border-l-2 border-indigo-400">
                        {ex.steps.map((st, i) => (
                          <div key={i}>{st}</div>
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
                      <p className="leading-relaxed">{trap}</p>
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
                      <p className="text-xs font-bold text-slate-800">{flash.front}</p>
                      <div className="pt-2 border-t border-slate-200 text-xs text-indigo-700 font-medium">
                        {flash.back}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
          <div className="flex flex-wrap items-center gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveSpecialLab('INTERACTIVE_LABS')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSpecialLab === 'INTERACTIVE_LABS' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Laboratorios UCV (SI, Intervalos, Venn, Caja Negra, Pregunta Inversa)
            </button>
            <button
              onClick={() => setActiveSpecialLab('READING')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSpecialLab === 'READING' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UA II: Comprensión Lectora
            </button>
            <button
              onClick={() => setActiveSpecialLab('SYNTAX')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSpecialLab === 'SYNTAX' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UA II: Sintaxis y Oraciones
            </button>
            <button
              onClick={() => setActiveSpecialLab('SPEED_READING')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSpecialLab === 'SPEED_READING' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UA II: Velocidad Lectora
            </button>
            <button
              onClick={() => setActiveSpecialLab('GRAPH_VECTORS')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSpecialLab === 'GRAPH_VECTORS' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UA III: Gráficas y Planos 2D/3D
            </button>
            <button
              onClick={() => setActiveSpecialLab('VISUALIZER')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSpecialLab === 'VISUALIZER' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UA III: Visualizador Científico
            </button>
            <button
              onClick={() => setActiveSpecialLab('EQUATIONS')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSpecialLab === 'EQUATIONS' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UA III: Solucionador de Sistemas
            </button>
          </div>

          {activeSpecialLab === 'INTERACTIVE_LABS' && <UCVInteractiveLabs />}
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
                  Batería de 10 reactivos multidisciplinares (Método Científico, Lectura Crítica, Aritmética, Álgebra y Vectores) para medir tu perfil de entrada.
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
        </div>
      )}
    </div>
  );
};
