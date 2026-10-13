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
  PackageIcon,
  TrendingUpIcon,
  UploadCloudIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  SparklesIcon,
  CheckCircleIcon,
  LayersIcon,
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
 * Inspirado directamente en la arquitectura visual limpia, viva y amplia de Invoficlib:
 * - Saludo Hero de alto impacto con fecha en vivo y badges de estado
 * - Fila de 4 tarjetas de métricas estadísticas con acentos superiores de color (Verde, Ámbar, Azul, Púrpura)
 * - Tarjeta ancha de alertas académicas y evaluaciones próximas
 * - Cuadrícula inferior de 3 columnas (Guías Principales, Últimas Evaluaciones, Simulador Express)
 * - Módulos universales habilitables/deshabilitables por cada estudiante
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
          1. HERO HEADER: SALUDO GRANDE, FECHA Y PILLS DE ESTADO (ESTILO INVOFICLIB)
          ========================================================================= */}
      <section className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight font-sans">
              Hola, {user?.full_name || 'Santiago Rivero'} 👋
            </h1>

            {/* Fecha y badges en línea (estilo Invoficlib con indicadores de color) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="text-sm font-semibold text-slate-500">
                {todayFormatted}
              </span>

              <div className="hidden sm:flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                  <span className="text-purple-600 font-bold">⚡</span> 14 Guías Deconstruidas
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  <span className="text-amber-600 font-bold">🎯</span> 320 Preguntas en Banco
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="text-emerald-600 font-bold">🏆</span> 18.5 / 20 Calificación
                </span>
              </div>
            </div>
          </div>

          {/* Botón Personalizar Módulos y Switcher de Preset */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="py-3 px-4.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 text-xs font-bold text-slate-700 hover:text-slate-900 shadow-soft-sm flex items-center gap-2.5 transition-all active:scale-[0.98]"
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
              className="py-3 px-4.5 rounded-2xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-soft flex items-center gap-2 transition-all active:scale-[0.98]"
              title="Ir a Deconstrucción de Guías y Temas"
            >
              <SparklesIcon className="w-4 h-4 text-amber-400" />
              <span>Nueva Deconstrucción</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. FILA DE 4 TARJETAS DE ESTADÍSTICAS VIVAS Y GRANDES (ESTILO INVOFICLIB)
          Con bordes superiores de 4px: Verde Esmeralda, Ámbar, Azul Celeste, Púrpura
          ========================================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: PRODUCTOS / GUÍAS DECONSTRUIDAS (Acento Verde Esmeralda) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-soft border border-slate-200/80 border-t-4 border-t-emerald-400 hover:shadow-soft-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                GUÍAS DECONSTRUIDAS
              </span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                <PackageIcon className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight my-2 font-sans">
              14
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 pt-1">
            <TrendingUpIcon className="w-4 h-4 text-emerald-500" />
            <span>100% con KaTeX & Cornell</span>
          </div>
        </div>

        {/* Card 2: INVENTARIO / PROMEDIO SIMULACROS (Acento Ámbar Cálido) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-soft border border-slate-200/80 border-t-4 border-t-amber-400 hover:shadow-soft-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                PROMEDIO SIMULACROS
              </span>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                <span className="text-base font-bold text-amber-600 font-mono">★</span>
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight my-2 font-sans">
              18.5 / 20
            </div>
          </div>
          <div className="text-xs font-medium text-slate-500 pt-1">
            Escala oficial Simadi / UCV
          </div>
        </div>

        {/* Card 3: ENTRADAS / BANCO DE PREGUNTAS (Acento Azul Celeste) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-soft border border-slate-200/80 border-t-4 border-t-sky-400 hover:shadow-soft-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                PREGUNTAS EN BANCO
              </span>
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
                <TrendingUpIcon className="w-5 h-5 text-sky-600" />
              </div>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight my-2 font-sans">
              320
            </div>
          </div>
          <div className="text-xs font-medium text-slate-500 pt-1">
            total con justificación formativa
          </div>
        </div>

        {/* Card 4: SALIDAS / DOCUMENTOS & VAULT (Acento Púrpura Eléctrico) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-soft border border-slate-200/80 border-t-4 border-t-purple-400 hover:shadow-soft-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                DOCUMENTOS & VAULT
              </span>
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
                <UploadCloudIcon className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight my-2 font-sans">
              8
            </div>
          </div>
          <div className="text-xs font-medium text-slate-500 pt-1">
            sincronizados en Supabase Storage
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. TARJETA DE ALERTA ACADÉMICA (IDÉNTICA A 'ALERTA DE INVENTARIO BAJO')
          Borde amarillo sutil, métricas con iconos de advertencia en columnas
          ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border-2 border-amber-200/80 hover:border-amber-300 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-sans">
              Alerta Académica & Próximas Evaluaciones
            </h2>
          </div>
          <button
            onClick={() => onNavigateToTab?.('PLANNER')}
            className="text-xs font-bold text-brand-600 hover:text-brand-800 hover:underline flex items-center gap-1"
          >
            <span>Ver calendario completo</span>
            <span className="font-mono">›</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-2">
          {/* Métrica de Alerta 1 */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
              <AlertTriangleIcon className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight font-sans">
                2
              </div>
              <div className="text-xs font-medium text-slate-500">
                Parciales en los próximos 7 días
              </div>
            </div>
          </div>

          {/* Métrica de Alerta 2 */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
              <AlertTriangleIcon className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight font-sans">
                1
              </div>
              <div className="text-xs font-medium text-slate-500">
                Guía pendiente por simular examen
              </div>
            </div>
          </div>

          {/* Métrica de Alerta 3 */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
              <CheckCircleIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight font-sans">
                8
              </div>
              <div className="text-xs font-medium text-slate-500">
                Tarjetas Active Recall para repasar hoy
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CUADRÍCULA DE 3 BLOQUES ESTILO INVOFICLIB:
          'Más Vendidos', 'Últimos Movimientos', 'Stock Crítico' adaptados a:
          'Guías Principales', 'Últimos Simulacros', 'Simulador Express'
          ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bloque 1: Guías Principales (Con barra morada vibrante como en Invoficlib) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-soft border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 font-sans">
                Guías Principales
              </h3>
              <span className="text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                TOP ESTUDIO
              </span>
            </div>

            <div className="space-y-4 pt-4">
              {/* Item 1 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 font-semibold">FIS-101</span>
                  <span className="font-bold text-slate-900">Cinemática Vectorial</span>
                  <span className="text-slate-500 font-mono">32 conceptos</span>
                </div>
                {/* Barra de progreso de color vivo morado */}
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-full" />
                </div>
              </div>

              {/* Item 2 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 font-semibold">MAT-102</span>
                  <span className="font-bold text-slate-900">Cálculo Diferencial</span>
                  <span className="text-slate-500 font-mono">24 conceptos</span>
                </div>
                {/* Barra de progreso azul cobalto */}
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-[88%]" />
                </div>
              </div>

              {/* Item 3 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 font-semibold">QUI-101</span>
                  <span className="font-bold text-slate-900">Enlace & Estequiometría</span>
                  <span className="text-slate-500 font-mono">18 conceptos</span>
                </div>
                {/* Barra de progreso verde esmeralda */}
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-[75%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigateToTab?.('GUIDES')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-2 transition-colors"
            >
              <span>Ver todas las guías deconstruidas</span>
              <ArrowRightIcon className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Bloque 2: Últimas Evaluaciones (Con badge verde +19 como en Invoficlib) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-soft border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 font-sans">
                Últimos Simulacros
              </h3>
              <span className="text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                HISTORIAL SIMADI
              </span>
            </div>

            <div className="space-y-3.5 pt-4">
              {/* Item 1 */}
              <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Parcial I - Cinemática & Leyes de Newton
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Hoy, 10:30 • 15 preguntas
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs font-mono">
                  +19/20
                </span>
              </div>

              {/* Item 2 */}
              <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Prueba de Admisión - Biología & Química
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Ayer, 16:45 • 20 preguntas
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs font-mono">
                  +18/20
                </span>
              </div>

              {/* Item 3 */}
              <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Control Rápido - Despejes y Álgebra
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    10 Oct, 09:15 • 10 preguntas
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs font-mono">
                  +20/20
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigateToTab?.('EXAMS')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-2 transition-colors"
            >
              <span>Abrir simulador con banco de preguntas</span>
              <ArrowRightIcon className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Bloque 3: Simulador Rápido / Práctica Express */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-soft border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 font-sans">
                Simulador Express
              </h3>
              <span className="text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                15 min
              </span>
            </div>

            <div className="pt-4 space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                Ejecuta una evaluación cronometrada aleatoria con el motor de preguntas de Simadi y resolución deductiva paso a paso.
              </p>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/70 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Modo Examen Rápido</span>
                  <span className="font-mono text-brand-600 font-bold">5 Reactivos</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Ideal para repasar antes de clase o validar una técnica de estudio.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                if (onLaunchExam) {
                  onLaunchExam({
                    mode: 'QUICK_PRACTICE',
                    title: 'Simulacro Rápido Express',
                    totalQuestions: 5,
                    timeLimitSeconds: 15 * 60,
                    allowPause: true,
                    shuffleQuestions: true,
                  });
                } else if (onNavigateToTab) {
                  onNavigateToTab('EXAMS');
                }
              }}
              className="w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-soft flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <LayersIcon className="w-4 h-4 text-white" />
              <span>Lanzar Simulacro Express (5 Preguntas)</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SELECTOR DE MÓDULOS UNIVERSALES Y LIENZO PERSONALIZADO
          ========================================================================= */}
      <section className="pt-4">
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-soft border border-slate-200/80 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 font-sans">
                Módulos Universales de Estudio
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Enciende o apaga las herramientas que deseas en tu lienzo de trabajo diario.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit">
              Preset: {currentPresetObj ? currentPresetObj.name : 'Personalizado'}
            </div>
          </div>

          {/* Botones de conmutación de módulos estilo pill */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            {WORKSPACE_MODULES_CATALOG.map((mod) => {
              const active = isModuleActive(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => toggleModule(mod.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    active
                      ? 'bg-slate-900 text-white shadow-soft-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                  title={active ? `Ocultar módulo ${mod.name}` : `Mostrar módulo ${mod.name}`}
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
        </div>

        {/* Grid de Módulos Activos Dinámicos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Módulo: Tareas */}
          {isModuleActive('tasks') && (
            <div className={`${isModuleActive('pomodoro') ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
              <TasksWidget />
            </div>
          )}

          {/* Módulo: Pomodoro */}
          {isModuleActive('pomodoro') && (
            <div className={`${isModuleActive('tasks') ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
              <PomodoroWidget />
            </div>
          )}

          {/* Módulo: Asistente Multimodal IA Gemini */}
          {isModuleActive('gemini_assistant') && (
            <div className="lg:col-span-12">
              <GeminiAiWidget
                onStartExamWithQuestions={onStartExamWithQuestions}
                onNavigateToStorage={onNavigateToTab ? () => onNavigateToTab('STORAGE') : undefined}
              />
            </div>
          )}

          {/* Módulo: Lanzador Rápido de Evaluaciones */}
          {isModuleActive('quick_exam') && (
            <div className={`${isModuleActive('guides_quick') ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
              <QuickExamWidget
                onLaunchExam={onLaunchExam}
                onNavigateToExams={onNavigateToTab ? () => onNavigateToTab('EXAMS') : undefined}
              />
            </div>
          )}

          {/* Módulo: Guías Rápidas */}
          {isModuleActive('guides_quick') && (
            <div className={`${isModuleActive('quick_exam') ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
              <GuidesQuickWidget
                onNavigateToGuides={onNavigateToTab ? () => onNavigateToTab('GUIDES') : undefined}
              />
            </div>
          )}

          {/* Módulo: Calculadora Científica */}
          {isModuleActive('calculator') && (
            <div className="lg:col-span-12">
              <CalculatorWidget />
            </div>
          )}

          {/* Módulo: Tablero Kanban */}
          {isModuleActive('kanban') && (
            <div className="lg:col-span-12">
              <KanbanWidget />
            </div>
          )}

          {/* Módulo: Laboratorio LaTeX */}
          {isModuleActive('latex_lab') && (
            <div className="lg:col-span-12">
              <LatexLabWidget />
            </div>
          )}
        </div>
      </section>

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
