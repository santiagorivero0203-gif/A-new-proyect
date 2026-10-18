/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - SUITE DE HERRAMIENTAS Y AJUSTES
 * ==============================================================================
 * Componente: ToolsAndSettingsView.tsx
 * Estética: Apple Minimalist (bg-[#f5f5f7], rounded-2xl, Azul Cobalto #0F52BA)
 * Pestañas:
 * 1. Calculadoras & Álgebra (Calculadora Científica + Solucionador Ecuaciones 2x2)
 * 2. Diseño & Color WCAG (Extractor de Paletas y Ratios de Contraste)
 * 3. Paisajes Sonoros (Mezclador de Ruido Rosa y Ondas Gamma 40Hz)
 * 4. Ajustes & Respaldo (Configuración de Cuenta + Copia de Seguridad JSON)
 * ==============================================================================
 */

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ScientificCalculator } from '../dashboards/ScientificCalculator';
import { LinearEquationSolver } from './LinearEquationSolver';
import { VectorCalculatorWidget } from './VectorCalculatorWidget';
import { DesignPaletteTools } from '../dashboards/DesignPaletteTools';
import { FocusSoundscapeMixer } from '../productivity/FocusSoundscapeMixer';
import { BackupRestoreModal } from './BackupRestoreModal';
import { AdminTelemetryPanel } from './AdminTelemetryPanel';
import {
  CalculatorIcon,
  PaletteIcon,
  DownloadIcon,
} from '../common/Icons';
import {
  Volume2,
  Settings,
  HardDrive,
  Trash2,
  Sliders,
  Activity,
  FlaskConical,
  BookOpen,
  CalendarCheck,
  Sun,
  Moon,
  Check,
} from 'lucide-react';
import { StoichiometryBalancer } from './StoichiometryBalancer';
import { InteractivePeriodicTable } from './InteractivePeriodicTable';
import { PhMolarityCalculator } from './PhMolarityCalculator';
import { MendelianGeneticsSimulator } from './MendelianGeneticsSimulator';
import { SentenceSyntaxAnalyzer } from '../academic/SentenceSyntaxAnalyzer';
import { ReadingComprehensionTrainer } from '../academic/ReadingComprehensionTrainer';
import { SpacedRepetitionFlashcards } from '../academic/SpacedRepetitionFlashcards';
import { SpeedReadingTimer } from '../academic/SpeedReadingTimer';
import { AdaptiveStudyScheduleGenerator } from '../planner/AdaptiveStudyScheduleGenerator';
import { StudySummaryPdfExporter } from '../planner/StudySummaryPdfExporter';
import { AmbientThemeNightShiftPanel } from '../productivity/AmbientThemeNightShiftPanel';
import { NotionWorkspaceExporterModal } from '../planner/NotionWorkspaceExporterModal';
import { SidebarCustomizerModal } from '../layout/SidebarCustomizerModal';
import { cacheCleaner } from '../../services/cacheCleaner';

type ToolTab = 'MATH_ALGEBRA' | 'SCIENCE_LAB' | 'HUMANITIES_LAB' | 'SMART_PLANNING' | 'DESIGN_PALETTE' | 'SOUNDSCAPES' | 'TELEMETRY' | 'SETTINGS';

export const ToolsAndSettingsView: React.FC = () => {
  const { user, updateUserPreferences, isDemoMode } = useAuth();
  const [activeTab, setActiveTab] = useState<ToolTab>('MATH_ALGEBRA');
  const [activeScienceSubTab, setActiveScienceSubTab] = useState<'STOICH' | 'PERIODIC' | 'PH_MOL' | 'GENETICS'>('STOICH');
  const [activeHumanitiesSubTab, setActiveHumanitiesSubTab] = useState<'SYNTAX' | 'COMPREHENSION' | 'FLASHCARDS' | 'SPEED_READING'>('SYNTAX');
  const [activePlanningSubTab, setActivePlanningSubTab] = useState<'SCHEDULE' | 'PDF_EXPORT' | 'THEME_NIGHT'>('SCHEDULE');
  const [isNotionModalOpen, setIsNotionModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isSidebarCustomizerOpen, setIsSidebarCustomizerOpen] = useState(false);

  const [appTheme, setAppTheme] = useState<'light' | 'dark' | 'rose_pastel'>(() => {
    if (typeof document !== 'undefined') {
      if (document.documentElement.classList.contains('theme-rose-pastel')) return 'rose_pastel';
      if (document.documentElement.classList.contains('dark')) return 'dark';
    }
    const saved = typeof window !== 'undefined' ? localStorage.getItem('cpe_theme') : null;
    return saved === 'rose_pastel' ? 'rose_pastel' : saved === 'dark' ? 'dark' : 'light';
  });

  const handleSelectTheme = (theme: 'light' | 'dark' | 'rose_pastel') => {
    setAppTheme(theme);
    localStorage.setItem('cpe_theme', theme);
    localStorage.setItem('studynexus_theme', theme);
    document.documentElement.classList.remove('dark', 'theme-rose-pastel');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'rose_pastel') {
      document.documentElement.classList.add('theme-rose-pastel');
    }
    updateUserPreferences({ theme });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Encabezado y Selector de Módulos */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
            Herramientas Especializadas & Ajustes
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Suite analítica, creativa y de enfoque adaptada para ciencias exactas, química, biología y diseño.
          </p>
        </div>

        {/* Pestañas de Herramientas */}
        <div className="inline-flex flex-wrap p-1 bg-slate-200/70 rounded-2xl border border-slate-200 self-start md:self-auto gap-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => setActiveTab('MATH_ALGEBRA')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'MATH_ALGEBRA'
                ? 'bg-white text-slate-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalculatorIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Matemáticas & Álgebra</span>
          </button>

          <button
            onClick={() => setActiveTab('SCIENCE_LAB')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'SCIENCE_LAB'
                ? 'bg-white text-slate-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
            <span>Química & Biología</span>
          </button>

          <button
            onClick={() => setActiveTab('HUMANITIES_LAB')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'HUMANITIES_LAB'
                ? 'bg-white text-slate-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Castellano & Lectura</span>
          </button>

          <button
            onClick={() => setActiveTab('SMART_PLANNING')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'SMART_PLANNING'
                ? 'bg-white text-slate-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Horarios & Exportación</span>
          </button>

          <button
            onClick={() => setActiveTab('DESIGN_PALETTE')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'DESIGN_PALETTE'
                ? 'bg-white text-slate-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PaletteIcon className="w-3.5 h-3.5 text-pink-600" />
            <span>Diseño & WCAG</span>
          </button>

          <button
            onClick={() => setActiveTab('SOUNDSCAPES')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'SOUNDSCAPES'
                ? 'bg-white text-slate-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Sonido Ambiental</span>
          </button>

          <button
            onClick={() => setActiveTab('TELEMETRY')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'TELEMETRY'
                ? 'bg-white text-slate-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-teal-600" />
            <span>Telemetría & Cuotas</span>
          </button>

          <button
            onClick={() => setActiveTab('SETTINGS')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'SETTINGS'
                ? 'bg-white text-slate-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-slate-700" />
            <span>Ajustes & Respaldo</span>
          </button>
        </div>
      </div>

      {/* PESTAÑA 1: MATEMÁTICAS & ÁLGEBRA */}
      {activeTab === 'MATH_ALGEBRA' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Calculadora Científica */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 px-1">
                <CalculatorIcon className="w-4 h-4 text-blue-600" />
                <span>Calculadora Científica Interactiva</span>
              </div>
              <ScientificCalculator isEmbedded={true} />
            </div>

            {/* Solucionador Determinista de Ecuaciones 2x2 para Andrés */}
            <div className="lg:col-span-7 space-y-3">
              <LinearEquationSolver />
            </div>
          </div>

          {/* Calculadora de Álgebra Vectorial 2D / 3D para Santiago y Física */}
          <div>
            <VectorCalculatorWidget />
          </div>
        </div>
      )}

      {/* PESTAÑA: CIENCIAS EXACTAS, QUÍMICA & BIOLOGÍA (SPRINT A) */}
      {activeTab === 'SCIENCE_LAB' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Sub-navegación del laboratorio */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setActiveScienceSubTab('STOICH')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeScienceSubTab === 'STOICH'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Balanceador Estequiométrico
            </button>
            <button
              onClick={() => setActiveScienceSubTab('PERIODIC')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeScienceSubTab === 'PERIODIC'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tabla Periódica Interactiva
            </button>
            <button
              onClick={() => setActiveScienceSubTab('PH_MOL')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeScienceSubTab === 'PH_MOL'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Calculadora pH & Molaridad
            </button>
            <button
              onClick={() => setActiveScienceSubTab('GENETICS')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeScienceSubTab === 'GENETICS'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Genética Mendeliana & Punnett
            </button>
          </div>

          {/* Contenido de sub-pestañas */}
          {activeScienceSubTab === 'STOICH' && <StoichiometryBalancer />}
          {activeScienceSubTab === 'PERIODIC' && <InteractivePeriodicTable />}
          {activeScienceSubTab === 'PH_MOL' && <PhMolarityCalculator />}
          {activeScienceSubTab === 'GENETICS' && <MendelianGeneticsSimulator />}
        </div>
      )}

      {/* PESTAÑA: CASTELLANO, HUMANIDADES & TÉCNICAS DE LECTURA (SPRINT B) */}
      {activeTab === 'HUMANITIES_LAB' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Sub-navegación de humanidades */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setActiveHumanitiesSubTab('SYNTAX')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeHumanitiesSubTab === 'SYNTAX'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Análisis Morfosintáctico
            </button>
            <button
              onClick={() => setActiveHumanitiesSubTab('COMPREHENSION')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeHumanitiesSubTab === 'COMPREHENSION'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Comprensión Lectora & Inferencia
            </button>
            <button
              onClick={() => setActiveHumanitiesSubTab('FLASHCARDS')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeHumanitiesSubTab === 'FLASHCARDS'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tarjetas Mnemotécnicas (SM-2)
            </button>
            <button
              onClick={() => setActiveHumanitiesSubTab('SPEED_READING')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeHumanitiesSubTab === 'SPEED_READING'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lectura Rápida & PPM
            </button>
          </div>

          {/* Contenido de sub-pestañas */}
          {activeHumanitiesSubTab === 'SYNTAX' && <SentenceSyntaxAnalyzer />}
          {activeHumanitiesSubTab === 'COMPREHENSION' && <ReadingComprehensionTrainer />}
          {activeHumanitiesSubTab === 'FLASHCARDS' && <SpacedRepetitionFlashcards />}
          {activeHumanitiesSubTab === 'SPEED_READING' && <SpeedReadingTimer />}
        </div>
      )}

      {/* PESTAÑA: PLANIFICACIÓN ADAPTATIVA, EXPORTACIONES & TEMAS (SPRINT C) */}
      {activeTab === 'SMART_PLANNING' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Sub-navegación de planificación */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActivePlanningSubTab('SCHEDULE')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activePlanningSubTab === 'SCHEDULE'
                    ? 'bg-white text-slate-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Horario Adaptativo Dinámico
              </button>
              <button
                onClick={() => setActivePlanningSubTab('PDF_EXPORT')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activePlanningSubTab === 'PDF_EXPORT'
                    ? 'bg-white text-slate-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Exportador PDF Editorial
              </button>
              <button
                onClick={() => setActivePlanningSubTab('THEME_NIGHT')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activePlanningSubTab === 'THEME_NIGHT'
                    ? 'bg-white text-slate-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Modo Oscuro & Night Shift
              </button>
            </div>

            {/* Botón directo de Notion Export */}
            <button
              onClick={() => setIsNotionModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <span>Conectar con Notion</span>
            </button>
          </div>

          {/* Contenido de sub-pestañas */}
          {activePlanningSubTab === 'SCHEDULE' && <AdaptiveStudyScheduleGenerator />}
          {activePlanningSubTab === 'PDF_EXPORT' && <StudySummaryPdfExporter />}
          {activePlanningSubTab === 'THEME_NIGHT' && <AmbientThemeNightShiftPanel />}
        </div>
      )}

      {/* PESTAÑA: DISEÑO & WCAG */}
      {activeTab === 'DESIGN_PALETTE' && (
        <div className="animate-in fade-in duration-200">
          <DesignPaletteTools />
        </div>
      )}

      {/* PESTAÑA 3: PAISAJES SONOROS */}
      {activeTab === 'SOUNDSCAPES' && (
        <div className="animate-in fade-in duration-200">
          <FocusSoundscapeMixer />
        </div>
      )}

      {/* PESTAÑA 4: TELEMETRÍA & CUOTAS DEL SISTEMA */}
      {activeTab === 'TELEMETRY' && (
        <div className="animate-in fade-in duration-200">
          <AdminTelemetryPanel />
        </div>
      )}

      {/* PESTAÑA 5: AJUSTES & RESPALDO */}
      {activeTab === 'SETTINGS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start animate-in fade-in duration-200">
          {/* Ajustes de Preferencias */}
          <div className="app-card p-6 space-y-5 bg-white border border-slate-200/80 shadow-soft rounded-2xl">
            <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 font-display flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#0F52BA]" />
              Preferencias de Estudio
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">Modo de Base de Datos</p>
                  <p className="text-slate-500 text-[11px]">
                    {isDemoMode ? 'Almacenamiento local aislado' : 'Conectado en vivo a Supabase (Postgres RLS)'}
                  </p>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold">
                  {isDemoMode ? 'Modo Local' : 'Supabase Live'}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div>
                  <p className="font-semibold text-slate-800">Duración de Sesión Pomodoro</p>
                  <p className="text-slate-500 text-[11px]">Minutos por bloque de concentración</p>
                </div>
                <select
                  value={user?.preferences.focus_duration || 25}
                  onChange={(e) =>
                    updateUserPreferences({ focus_duration: parseInt(e.target.value) })
                  }
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  <option value={20}>20 Minutos</option>
                  <option value={25}>25 Minutos</option>
                  <option value={45}>45 Minutos</option>
                  <option value={50}>50 Minutos</option>
                  <option value={60}>60 Minutos</option>
                </select>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div>
                  <p className="font-semibold text-slate-800">Sonido de Notificación</p>
                  <p className="text-slate-500 text-[11px]">Alertas audibles al concluir bloques de foco</p>
                </div>
                <input
                  type="checkbox"
                  checked={user?.preferences.sound_enabled ?? true}
                  onChange={(e) =>
                    updateUserPreferences({ sound_enabled: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#0F52BA] rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div>
                  <p className="font-semibold text-slate-800">Renderizador LaTeX (KaTeX)</p>
                  <p className="text-slate-500 text-[11px]">Compilador matemático de alta velocidad</p>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 font-bold">
                  KaTeX Activo ✓
                </span>
              </div>
            </div>
          </div>

          {/* Respaldo Total y Estado Cero */}
          <div className="space-y-6">
            {/* Sistema de Temas y Apariencia Visual */}
            <div className="app-card p-6 bg-white border border-slate-200/80 shadow-soft rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <PaletteIcon className="w-4 h-4 text-pink-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Sistema de Temas & Apariencia Visual
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-50 text-pink-700 font-bold">
                  {appTheme === 'rose_pastel' ? 'Rose Pastel Activo 🌸' : appTheme === 'dark' ? 'Oscuro Activo 🌙' : 'Claro Activo ☀️'}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Selecciona la atmósfera visual de la plataforma. Diseñada bajo la filosofía de "Menos, pero Mejor", con alta legibilidad tipográfica y contraste matemático.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                {/* Opción 1: Modo Claro */}
                <button
                  type="button"
                  onClick={() => handleSelectTheme('light')}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    appTheme === 'light'
                      ? 'border-[#0F52BA] bg-blue-50/50 shadow-soft-xs ring-1 ring-[#0F52BA]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                    {appTheme === 'light' && <Check className="w-3.5 h-3.5 text-[#0F52BA]" />}
                  </div>
                  <div className="text-xs font-bold text-slate-900">Claro Apple</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Cobalto & Blanco</div>
                  <div className="mt-2 flex gap-1">
                    <span className="w-3 h-3 rounded-full bg-slate-100 border border-slate-300 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#0F52BA] inline-block" />
                  </div>
                </button>

                {/* Opción 2: Modo Oscuro */}
                <button
                  type="button"
                  onClick={() => handleSelectTheme('dark')}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    appTheme === 'dark'
                      ? 'border-indigo-500 bg-slate-900 text-white shadow-soft-xs ring-1 ring-indigo-500'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Moon className="w-4 h-4 text-indigo-400" />
                    {appTheme === 'dark' && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </div>
                  <div className={`text-xs font-bold ${appTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Deep Slate</div>
                  <div className={`text-[10px] mt-0.5 ${appTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Oscuro OLED</div>
                  <div className="mt-2 flex gap-1">
                    <span className="w-3 h-3 rounded-full bg-[#0b0f19] border border-slate-700 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" />
                  </div>
                </button>

                {/* Opción 3: Rose Pastel María Fernanda */}
                <button
                  type="button"
                  onClick={() => handleSelectTheme('rose_pastel')}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    appTheme === 'rose_pastel'
                      ? 'border-rose-400 bg-rose-50/80 shadow-soft-xs ring-1 ring-rose-400'
                      : 'border-slate-200 bg-white hover:border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">🌸</span>
                    {appTheme === 'rose_pastel' && <Check className="w-3.5 h-3.5 text-rose-600" />}
                  </div>
                  <div className="text-xs font-bold text-rose-950 flex items-center gap-1">
                    <span>Rose Pastel</span>
                  </div>
                  <div className="text-[10px] text-rose-600/80 mt-0.5">Perfil Mafe</div>
                  <div className="mt-2 flex gap-1">
                    <span className="w-3 h-3 rounded-full bg-[#FFF5F7] border border-rose-300 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#DB2777] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#FCE7F3] inline-block" />
                  </div>
                </button>
              </div>
            </div>

            {/* Personalización de la Barra Lateral por Perfil */}
            <div className="app-card p-6 bg-white border border-slate-200/80 shadow-soft rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Navegación y Barra Lateral por Perfil
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold">
                  Personalizable
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Configura qué secciones (Dashboard, Simulador, Guías KaTeX, Agenda, Vault, Entregas Creativas, Herramientas) deben aparecer en la barra lateral para cada perfil de estudiante.
              </p>

              <button
                onClick={() => setIsSidebarCustomizerOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Personalizar Secciones de la Barra Lateral</span>
              </button>
            </div>

            {/* Tarjeta de Respaldo JSON */}
            <div className="app-card p-6 bg-white border border-slate-200/80 shadow-soft rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Copia de Seguridad & Portabilidad
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                  JSON Total
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Descarga un respaldo íntegro de tus guías generadas, tareas de Notion AI, configuraciones y calendario para guardarlo en tu computadora o restaurarlo cuando lo desees.
              </p>

              <button
                onClick={() => setIsBackupModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0F52BA] hover:bg-[#0c4194] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span>Gestionar Copias de Seguridad (Exportar / Importar)</span>
              </button>
            </div>

            {/* Mantenimiento Estado Cero */}
            <div className="app-card p-6 bg-white border border-slate-200/80 shadow-soft rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-rose-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Mantenimiento & Estado Cero
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                  Zero Dummy
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Restaura la plataforma a Estado Cero eliminando residuos de caché local o tareas de prueba sin tocar la cuenta principal.
              </p>

              <button
                onClick={() => {
                  if (window.confirm('¿Deseas restablecer el caché local y purgar todos los datos de prueba? Esta acción dejará las tablas limpias para iniciar en producción.')) {
                    const res = cacheCleaner.resetAllLocalCache();
                    alert(`Caché purgado con éxito (${res.purgedKeysCount} registros limpiados). La plataforma está en Estado Cero.`);
                    window.location.reload();
                  }
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200/80 hover:border-rose-200 text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>Restablecer Caché Local & Purgar Datos de Prueba</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Respaldo */}
      <BackupRestoreModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
      />

      {/* Modal de Exportación a Notion (Sprint C) */}
      <NotionWorkspaceExporterModal
        isOpen={isNotionModalOpen}
        onClose={() => setIsNotionModalOpen(false)}
      />

      {/* Modal de Personalización de Barra Lateral por Perfil */}
      <SidebarCustomizerModal
        isOpen={isSidebarCustomizerOpen}
        onClose={() => setIsSidebarCustomizerOpen(false)}
      />
    </div>
  );
};

export default ToolsAndSettingsView;
