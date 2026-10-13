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
              title="Ir a Deconstrucción de Guías y Temas"
            >
              <SparklesIcon className="w-4 h-4 text-amber-400" />
              <span>Nueva Deconstrucción</span>
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
          2. GRID DINÁMICO DE MÓDULOS DE ESTUDIO CON BARRAS SUPERIORES DE COLOR
          Cada cuadro funcional posee su barra superior de acento distintivo:
          - Tareas: Azul Cobalto (#0F52BA)
          - Pomodoro: Frambuesa (rose-500)
          - Asistente Gemini: Púrpura (purple-500)
          - Evaluaciones: Esmeralda (emerald-500)
          - Guías: Azul Cielo (sky-500)
          - Calculadora: Ámbar (amber-500)
          - Kanban: Rosa (pink-500)
          - LaTeX Lab: Teal (teal-500)
          ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Módulo: Tareas (Barra Azul Cobalto) */}
        {isModuleActive('tasks') && (
          <div className={`${isModuleActive('pomodoro') ? 'lg:col-span-7' : 'lg:col-span-12'} rounded-3xl overflow-hidden border-t-4 border-t-[#0F52BA] shadow-soft transition-all`}>
            <TasksWidget />
          </div>
        )}

        {/* Módulo: Pomodoro (Barra Frambuesa) */}
        {isModuleActive('pomodoro') && (
          <div className={`${isModuleActive('tasks') ? 'lg:col-span-5' : 'lg:col-span-12'} rounded-3xl overflow-hidden border-t-4 border-t-rose-500 shadow-soft transition-all`}>
            <PomodoroWidget />
          </div>
        )}

        {/* Módulo: Asistente Multimodal IA Gemini (Barra Púrpura) */}
        {isModuleActive('gemini_assistant') && (
          <div className="lg:col-span-12 rounded-3xl overflow-hidden border-t-4 border-t-purple-500 shadow-soft transition-all">
            <GeminiAiWidget
              onStartExamWithQuestions={onStartExamWithQuestions}
              onNavigateToStorage={onNavigateToTab ? () => onNavigateToTab('STORAGE') : undefined}
            />
          </div>
        )}

        {/* Módulo: Lanzador Rápido de Evaluaciones (Barra Verde Esmeralda) */}
        {isModuleActive('quick_exam') && (
          <div className={`${isModuleActive('guides_quick') ? 'lg:col-span-6' : 'lg:col-span-12'} rounded-3xl overflow-hidden border-t-4 border-t-emerald-500 shadow-soft transition-all`}>
            <QuickExamWidget
              onLaunchExam={onLaunchExam}
              onNavigateToExams={onNavigateToTab ? () => onNavigateToTab('EXAMS') : undefined}
            />
          </div>
        )}

        {/* Módulo: Guías Rápidas de Estudio (Barra Azul Cielo) */}
        {isModuleActive('guides_quick') && (
          <div className={`${isModuleActive('quick_exam') ? 'lg:col-span-6' : 'lg:col-span-12'} rounded-3xl overflow-hidden border-t-4 border-t-sky-500 shadow-soft transition-all`}>
            <GuidesQuickWidget
              onNavigateToGuides={onNavigateToTab ? () => onNavigateToTab('GUIDES') : undefined}
            />
          </div>
        )}

        {/* Módulo: Calculadora Científica (Barra Ámbar Cálido) */}
        {isModuleActive('calculator') && (
          <div className="lg:col-span-12 rounded-3xl overflow-hidden border-t-4 border-t-amber-500 shadow-soft transition-all">
            <CalculatorWidget />
          </div>
        )}

        {/* Módulo: Tablero Visual de Proyectos Kanban (Barra Rosa) */}
        {isModuleActive('kanban') && (
          <div className="lg:col-span-12 rounded-3xl overflow-hidden border-t-4 border-t-pink-500 shadow-soft transition-all">
            <KanbanWidget />
          </div>
        )}

        {/* Módulo: Laboratorio Vectorial & KaTeX (Barra Verde Agua Teal) */}
        {isModuleActive('latex_lab') && (
          <div className="lg:col-span-12 rounded-3xl overflow-hidden border-t-4 border-t-teal-500 shadow-soft transition-all">
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
