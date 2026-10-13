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
  FlameIcon,
  TrophyIcon,
  SlidersIcon,
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
 * Centro neurálgico de productividad donde cada estudiante tiene un lienzo
 * personalizable, habilitando o desactivando los módulos que necesita sin
 * restricciones de perfil ni bifurcaciones forzadas.
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

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner Principal del Workspace Minimalista */}
      <div className="app-card p-6 sm:p-8 bg-white border border-slate-200/90 shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Workspace Modular • Acceso Universal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
              Hola, {user?.full_name || 'Estudiante'} 👋
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              Personaliza tu ecosistema de estudio anclando las herramientas que necesitas hoy. Toda la plataforma está a tu disposición.
            </p>
          </div>

          {/* Estadísticas y Botón de Personalizar */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Racha */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <FlameIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Racha Activa</p>
                <p className="text-lg font-bold text-slate-900 font-mono leading-none mt-0.5">
                  {user?.streak_days || 14} Días
                </p>
              </div>
            </div>

            {/* Puntos XP */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-brand-50 text-brand-500">
                <TrophyIcon className="w-5 h-5 text-brand-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Puntos XP</p>
                <p className="text-lg font-bold text-brand-600 font-mono leading-none mt-0.5">
                  {user?.xp_points || 2400}
                </p>
              </div>
            </div>

            {/* Botón Personalizar Espacio */}
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="btn-brand py-3.5 px-5 text-xs font-semibold flex items-center gap-2 shadow-soft transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <SlidersIcon className="w-4 h-4" />
              <span>Personalizar Espacio</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-mono">
                {activeModulesCount}/{totalModulesCount}
              </span>
            </button>
          </div>
        </div>

        {/* Barra de Módulos Rápidos (Quick Filter / Toggle Pills) */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-1.5">Módulos en pantalla:</span>
            {WORKSPACE_MODULES_CATALOG.map((mod) => {
              const active = isModuleActive(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => toggleModule(mod.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-slate-900 text-white shadow-soft-sm'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200/80 hover:text-slate-800'
                  }`}
                  title={active ? `Desactivar ${mod.name}` : `Activar ${mod.name}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-brand-400' : 'bg-slate-300'}`} />
                  <span>{mod.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>Configuración:</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold">
              {currentPresetObj ? currentPresetObj.name : 'Personalizada'}
            </span>
          </div>
        </div>
      </div>

      {/* Grid Dinámico de Módulos Activos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Módulo: Tareas (7 columnas en desktop cuando está con Pomodoro) */}
        {isModuleActive('tasks') && (
          <div className={`${isModuleActive('pomodoro') ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <TasksWidget />
          </div>
        )}

        {/* Módulo: Pomodoro (5 columnas en desktop cuando está con Tareas) */}
        {isModuleActive('pomodoro') && (
          <div className={`${isModuleActive('tasks') ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
            <PomodoroWidget />
          </div>
        )}

        {/* Módulo: Asistente Multimodal IA Gemini (Ancho completo 12 columnas) */}
        {isModuleActive('gemini_assistant') && (
          <div className="lg:col-span-12">
            <GeminiAiWidget
              onStartExamWithQuestions={onStartExamWithQuestions}
              onNavigateToStorage={onNavigateToTab ? () => onNavigateToTab('STORAGE') : undefined}
            />
          </div>
        )}

        {/* Módulo: Lanzador Rápido de Exámenes Simadi (6 columnas) */}
        {isModuleActive('quick_exam') && (
          <div className={`${isModuleActive('guides_quick') ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
            <QuickExamWidget
              onLaunchExam={onLaunchExam}
              onNavigateToExams={onNavigateToTab ? () => onNavigateToTab('EXAMS') : undefined}
            />
          </div>
        )}

        {/* Módulo: Guías Rápidas de Estudio (6 columnas) */}
        {isModuleActive('guides_quick') && (
          <div className={`${isModuleActive('quick_exam') ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
            <GuidesQuickWidget
              onNavigateToGuides={onNavigateToTab ? () => onNavigateToTab('GUIDES') : undefined}
            />
          </div>
        )}

        {/* Módulo: Calculadora Científica & Constantes (Ancho completo o 12 columnas) */}
        {isModuleActive('calculator') && (
          <div className="lg:col-span-12">
            <CalculatorWidget />
          </div>
        )}

        {/* Módulo: Tablero Visual de Proyectos Kanban (12 columnas) */}
        {isModuleActive('kanban') && (
          <div className="lg:col-span-12">
            <KanbanWidget />
          </div>
        )}

        {/* Módulo: Laboratorio Vectorial & KaTeX Playground (12 columnas) */}
        {isModuleActive('latex_lab') && (
          <div className="lg:col-span-12">
            <LatexLabWidget />
          </div>
        )}
      </div>

      {/* Estado vacío si el usuario oculta casi todo */}
      {activeModulesCount === 0 && (
        <div className="app-card p-12 text-center bg-white border border-slate-200/80 shadow-soft max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto text-2xl">
            ✨
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Tu Workspace está completamente despejado
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Habilita módulos o selecciona un preset para comenzar a trabajar.
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
