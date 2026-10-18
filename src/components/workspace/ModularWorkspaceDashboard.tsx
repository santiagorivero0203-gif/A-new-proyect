import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWorkspaceModules } from '../../hooks/useWorkspaceModules';
import { WorkspaceCustomizerDrawer } from './WorkspaceCustomizerDrawer';
import { WORKSPACE_MODULES_CATALOG, WORKSPACE_PRESETS } from '../../types/modules.types';
import {
  TasksWidget,
} from './widgets/TasksWidget';
import {
  PomodoroWidget,
} from './widgets/PomodoroWidget';
import {
  QuickExamWidget,
} from './widgets/QuickExamWidget';
import {
  GeminiAiWidget,
} from './widgets/GeminiAiWidget';
import {
  CalculatorWidget,
} from './widgets/CalculatorWidget';
import {
  KanbanWidget,
} from './widgets/KanbanWidget';
import {
  GuidesQuickWidget,
} from './widgets/GuidesQuickWidget';
import {
  LatexLabWidget,
} from './widgets/LatexLabWidget';
import {
  SlidersIcon,
  SparklesIcon,
  PlusIcon,
} from '../common/Icons';
import { Palette, FlaskConical, BookOpen, Calculator, Layers, Calendar, ChevronRight } from 'lucide-react';
import { UpcomingProjectsAndTopicsWidget } from './widgets/UpcomingProjectsAndTopicsWidget';
import type { ExamConfig, Question } from '../../types/exam.types';
import type { MainTabType } from '../layout/Sidebar';

interface ModularWorkspaceDashboardProps {
  onStartExamWithQuestions?: (questions: Question[], title: string) => void;
  onLaunchExam?: (config: ExamConfig) => void;
  onNavigateToTab?: (tab: MainTabType) => void;
}

/**
 * Dashboard Modular Universal
 * Centro de operaciones académicas donde cada estudiante organiza sus módulos de estudio.
 * Integra el saludo amplio de bienvenida y tarjetas con barras de color distintivas
 * para cada herramienta funcional (Tareas, Pomodoro, Gemini, Evaluaciones, etc.).
 */
export const ModularWorkspaceDashboard: React.FC<ModularWorkspaceDashboardProps> = ({
  onStartExamWithQuestions,
  onLaunchExam,
  onNavigateToTab,
}) => {
  const { user } = useAuth();
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const {
    activeModules,
    activePreset,
    isModuleActive,
    toggleModule,
    applyPreset,
    resetToDefault,
    activeModulesCount,
    totalModulesCount,
  } = useWorkspaceModules();

  const currentPresetObj = WORKSPACE_PRESETS.find((p) => p.id === activePreset);

  // Formatear la fecha actual en español de forma elegante
  const todayFormatted = (() => {
    const d = new Date();
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];
    return `${days[d.getDay()]}, ${d.getDate()} De ${months[d.getMonth()]} De ${d.getFullYear()}`;
  })();

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1600px] mx-auto">
      {/* =========================================================================
          1. HERO HEADER: SALUDO GRANDE, FECHA Y CONTROL DE MÓDULOS
          ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-sans">
              Hola, {user?.full_name || 'Santiago Rivero'} 👋
            </h1>

            <div className="flex flex-wrap items-center gap-3 pt-0.5">
              <span className="text-xs sm:text-sm font-semibold text-slate-500">
                {todayFormatted}
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium">
                {user?.institution ? `${user.institution} • ` : ''}Espacio de estudio y productividad personal
              </span>
            </div>
          </div>

          {/* Botones de Personalización y Acción Rápida */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="py-2.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 text-xs font-bold text-slate-700 hover:text-slate-900 shadow-soft-sm flex items-center gap-2.5 transition-all active:scale-[0.98]"
              title="Personalizar los módulos visibles en tu espacio de trabajo"
            >
              <SlidersIcon className="w-4 h-4 text-slate-500" />
              <span>Personalizar Módulos</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-mono font-bold">
                {activeModulesCount}/{totalModulesCount}
              </span>
            </button>

            <button
              onClick={() => onNavigateToTab?.('GUIDES')}
              className="py-2.5 px-4 rounded-2xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-soft flex items-center gap-2 transition-all active:scale-[0.98]"
              title="Analizar archivos, guías y temas con IA"
            >
              <SparklesIcon className="w-4 h-4 text-amber-400" />
              <span>Analizar con IA</span>
            </button>
          </div>
        </div>

        {/* Barra de Módulos Rápidos para conmutar en el lienzo */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 font-semibold mr-1">Módulos en lienzo:</span>
            {WORKSPACE_MODULES_CATALOG.map((mod) => {
              const active = isModuleActive(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => toggleModule(mod.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    active
                      ? 'bg-slate-900 text-white shadow-soft-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                  title={active ? `Ocultar ${mod.name}` : `Mostrar ${mod.name}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      active ? 'bg-emerald-400' : 'bg-slate-300'
                    }`}
                  />
                  <span>{mod.name}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 font-mono font-bold bg-slate-50 px-3 py-1 rounded-full border border-slate-200/60">
            Preset: {currentPresetObj ? currentPresetObj.name : 'Personalizado'}
          </div>
        </div>
      </section>

      {/* =========================================================================
          1. PRIORIDAD MÁXIMA: PROYECTOS MÁS CERCANOS & TEMAS CLAVE CON GUÍAS Y EXÁMENES
          Cuadro izquierdo: Proyectos más cercanos con fecha límite y barra de progreso.
          Cuadro derecho: Temas de estudio con acceso directo a Guías KaTeX y Exámenes de prueba.
          ========================================================================= */}
      <section className="space-y-2">
        <UpcomingProjectsAndTopicsWidget
          onNavigateToTab={onNavigateToTab}
          onLaunchExam={onLaunchExam}
          onStartExamWithQuestions={onStartExamWithQuestions}
        />
      </section>

      {/* Dock de Módulos & Laboratorios Especializados Fijados por Perfil */}
      <section className="app-card p-5 bg-white border border-slate-200/80 shadow-soft rounded-3xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-800">
              Laboratorios & Funciones Especializadas Fijadas
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Acceso rápido para {user?.full_name?.split(' ')[0] || 'tu perfil'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {user?.academic_profile === 'mafe_diseno_ucab' ? (
            <>
              <button
                onClick={() => onNavigateToTab?.('DESIGN_PALETTE')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-rose-50/60 border border-slate-200/80 hover:border-rose-300 text-left transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center">
                    <Palette className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-rose-950">Paletas & WCAG</div>
                <div className="text-[10px] text-slate-500 group-hover:text-rose-700">Accesibilidad & Color</div>
              </button>

              <button
                onClick={() => onNavigateToTab?.('CREATIVE_BOARD')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-pink-50/60 border border-slate-200/80 hover:border-pink-300 text-left transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-pink-950">Entregas & Canva</div>
                <div className="text-[10px] text-slate-500 group-hover:text-pink-700">Mural Visual & Kanban</div>
              </button>

              <button
                onClick={() => onNavigateToTab?.('HUMANITIES_LAB')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200/80 hover:border-purple-300 text-left transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-purple-950">Humanidades & Lenguaje</div>
                <div className="text-[10px] text-slate-500 group-hover:text-purple-700">Sintaxis & Leitner</div>
              </button>

              <button
                onClick={() => onNavigateToTab?.('PLANNER')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-300 text-left transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-blue-950">Agenda & Cortes</div>
                <div className="text-[10px] text-slate-500 group-hover:text-blue-700">Alertas de Evaluación</div>
              </button>
            </>
          ) : user?.academic_profile === 'santiago_fisica_ucv' ? (
            <>
              <button
                onClick={() => onNavigateToTab?.('MATH_LAB')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-300 text-left transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-bold text-slate-900">Cálculo & Vectores</div>
                <div className="text-[10px] text-slate-500">Ecuaciones & Álgebra 3D</div>
              </button>

              <button
                onClick={() => onNavigateToTab?.('SCIENCE_LAB')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/80 hover:border-emerald-300 text-left transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-bold text-slate-900">Ciencias Naturales</div>
                <div className="text-[10px] text-slate-500">Estequiometría & pH</div>
              </button>

              <button
                onClick={() => onNavigateToTab?.('EXAMS')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200/80 hover:border-indigo-300 text-left transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-bold text-slate-900">Simulador de Pruebas</div>
                <div className="text-[10px] text-slate-500">Simadi & OPSU</div>
              </button>

              <button
                onClick={() => onNavigateToTab?.('PLANNER')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-300 text-left transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-bold text-slate-900">Agenda & Horario</div>
                <div className="text-[10px] text-slate-500">Clases & Entregas</div>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigateToTab?.('MATH_LAB')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-300 text-left transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-bold text-slate-900">Cálculo & Álgebra</div>
                <div className="text-[10px] text-slate-500">Ecuaciones & Prácticas</div>
              </button>

              <button
                onClick={() => onNavigateToTab?.('SCIENCE_LAB')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/80 hover:border-emerald-300 text-left transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-bold text-slate-900">Ciencias Naturales</div>
                <div className="text-[10px] text-slate-500">Química & Genética</div>
              </button>

              <button
                onClick={() => onNavigateToTab?.('HUMANITIES_LAB')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200/80 hover:border-purple-300 text-left transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-bold text-slate-900">Humanidades & Lenguaje</div>
                <div className="text-[10px] text-slate-500">Sintaxis & Lectura</div>
              </button>

              <button
                onClick={() => onNavigateToTab?.('EXAMS')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200/80 hover:border-indigo-300 text-left transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-bold text-slate-900">Simulador de Exámenes</div>
                <div className="text-[10px] text-slate-500">Diagnósticos & Admisión</div>
              </button>
            </>
          )}
        </div>
      </section>

      {/* Banner Oficial: Curso Introductorio Facultad de Ciencias UCV */}
      {(user?.academic_profile === 'santiago_fisica_ucv' || user?.academic_profile === 'prima_bachillerato_5') && (
        <section className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0F52BA] to-blue-950 text-white shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6 border border-blue-400/20">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold">
                Programa Oficial • Facultad de Ciencias UCV
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-sans">
              Curso Introductorio Ciencias UCV (Plan de 6 Semanas)
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-sans">
              Laboratorios interactivos de conversión SI, recta real de intervalos, diagramas de Venn, dinámicas de la <em>Caja Negra</em> y la <em>Pregunta Inversa</em>, con cuestionarios formativos y diagnósticos oficiales.
            </p>
          </div>

          <button
            onClick={() => onNavigateToTab?.('UCV_COURSE')}
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition-all shadow-soft flex items-center justify-center gap-2.5 active:scale-95 shrink-0"
          >
            <span>Entrar al Curso UCV</span>
            <span className="text-sm">→</span>
          </button>
        </section>
      )}

      {/* =========================================================================
          2. GRID DINÁMICO DE MÓDULOS DE ESTUDIO (MINIMALISTA, CON ELEVACIÓN DIFUSA)
          ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Módulo: Tareas */}
        {isModuleActive('tasks') && (
          <div className={`${isModuleActive('pomodoro') ? 'lg:col-span-7' : 'lg:col-span-12'} rounded-3xl overflow-hidden shadow-soft transition-all`}>
            <TasksWidget />
          </div>
        )}

        {/* Módulo: Pomodoro */}
        {isModuleActive('pomodoro') && (
          <div className={`${isModuleActive('tasks') ? 'lg:col-span-5' : 'lg:col-span-12'} rounded-3xl overflow-hidden shadow-soft transition-all`}>
            <PomodoroWidget />
          </div>
        )}

        {/* Módulo: Asistente Multimodal IA Gemini */}
        {isModuleActive('gemini_assistant') && (
          <div className="lg:col-span-12 rounded-3xl overflow-hidden shadow-soft transition-all">
            <GeminiAiWidget
              onStartExamWithQuestions={onStartExamWithQuestions}
              onNavigateToStorage={onNavigateToTab ? () => onNavigateToTab('STORAGE') : undefined}
            />
          </div>
        )}

        {/* Módulo: Lanzador Rápido de Evaluaciones */}
        {isModuleActive('quick_exam') && (
          <div className={`${isModuleActive('guides_quick') ? 'lg:col-span-6' : 'lg:col-span-12'} rounded-3xl overflow-hidden shadow-soft transition-all`}>
            <QuickExamWidget
              onLaunchExam={onLaunchExam}
              onNavigateToExams={onNavigateToTab ? () => onNavigateToTab('EXAMS') : undefined}
            />
          </div>
        )}

        {/* Módulo: Guías Rápidas de Estudio */}
        {isModuleActive('guides_quick') && (
          <div className={`${isModuleActive('quick_exam') ? 'lg:col-span-6' : 'lg:col-span-12'} rounded-3xl overflow-hidden shadow-soft transition-all`}>
            <GuidesQuickWidget
              onNavigateToGuides={onNavigateToTab ? () => onNavigateToTab('GUIDES') : undefined}
            />
          </div>
        )}

        {/* Módulo: Calculadora Científica */}
        {isModuleActive('calculator') && (
          <div className="lg:col-span-12 rounded-3xl overflow-hidden shadow-soft transition-all">
            <CalculatorWidget />
          </div>
        )}

        {/* Módulo: Tablero Visual de Proyectos Kanban */}
        {isModuleActive('kanban') && (
          <div className="lg:col-span-12 rounded-3xl overflow-hidden shadow-soft transition-all">
            <KanbanWidget />
          </div>
        )}

        {/* Módulo: Laboratorio Vectorial & KaTeX */}
        {isModuleActive('latex_lab') && (
          <div className="lg:col-span-12 rounded-3xl overflow-hidden shadow-soft transition-all">
            <LatexLabWidget />
          </div>
        )}
      </section>

      {/* Estado vacío si el usuario oculta todos los módulos */}
      {activeModulesCount === 0 && (
        <div className="app-card p-12 text-center bg-white border border-slate-200/80 shadow-soft max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto text-2xl">
            ✨
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-sans">
              Tu Workspace está completamente despejado
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Habilita módulos o selecciona un preset para comenzar a estudiar.
            </p>
          </div>
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="btn-brand text-xs py-2.5 px-4 inline-flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Añadir Módulos al Workspace</span>
          </button>
        </div>
      )}

      {/* Cajón Lateral de Personalización */}
      <WorkspaceCustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        activeModules={activeModules}
        activePreset={activePreset}
        onToggleModule={toggleModule}
        onApplyPreset={applyPreset}
        onResetToDefault={resetToDefault}
      />
    </div>
  );
};
