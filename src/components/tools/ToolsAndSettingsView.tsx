/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - CONFIGURACIÓN & PREFERENCIAS DEL SISTEMA
 * ==============================================================================
 * Vista unificada de ajustes, personalización y mantenimiento:
 * - Selector Visual de Temas (Claro Apple, Deep Slate OLED, Rose Atelier Pastel de Mafe).
 * - Personalizador de la Barra Lateral por Perfil (Fijar/Desfijar módulos especializados).
 * - Preferencias de Estudio (Duración de sesión Pomodoro, Alertas sonoras).
 * - Paisajes Sonoros (Mezclador de Ruido Rosa y Ondas Gamma 40Hz).
 * - Integración & Exportación a Notion.
 * - Respaldo y Restauración de Datos JSON.
 * - Mantenimiento & Purga Total de Caché Local (CacheStorage + ServiceWorker + LocalStorage).
 * - Telemetría & Rendimiento del Sistema.
 * ==============================================================================
 */

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BackupRestoreModal } from './BackupRestoreModal';
import { AdminTelemetryPanel } from './AdminTelemetryPanel';
import { FocusSoundscapeMixer } from '../productivity/FocusSoundscapeMixer';
import { NotionWorkspaceExporterModal } from '../planner/NotionWorkspaceExporterModal';
import { SidebarCustomizerModal } from '../layout/SidebarCustomizerModal';
import { cacheCleaner } from '../../services/cacheCleaner';
import {
  Settings,
  Sliders,
  Sun,
  Moon,
  Check,
  HardDrive,
  Download,
  Trash2,
  Volume2,
  FileSpreadsheet,
  Activity,
  Layers,
} from 'lucide-react';

type SettingsTab = 'PREFERENCES' | 'SOUNDSCAPES' | 'DATA_BACKUP' | 'TELEMETRY';

export const ToolsAndSettingsView: React.FC = () => {
  const { user, updateUserPreferences } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('PREFERENCES');
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
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Encabezado Editorial */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="app-badge font-mono text-[11px] font-bold">
              <Settings className="w-3.5 h-3.5 text-slate-700" />
              Ajustes Globales del Ecosistema
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight font-display text-slate-900">
            Configuración & Preferencias del Sistema
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Personaliza la estética, las funciones fijadas en la barra lateral, copias de seguridad y cachés del navegador.
          </p>
        </div>

        {/* Pestañas de Ajustes */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('PREFERENCES')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-soft-xs active:scale-[0.98] ${
              activeTab === 'PREFERENCES'
                ? 'btn-brand text-white shadow-soft-md'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Apariencia & Barra Lateral</span>
          </button>

          <button
            onClick={() => setActiveTab('SOUNDSCAPES')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-soft-xs active:scale-[0.98] ${
              activeTab === 'SOUNDSCAPES'
                ? 'btn-brand text-white shadow-soft-md'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Paisajes Sonoros</span>
          </button>

          <button
            onClick={() => setActiveTab('DATA_BACKUP')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-soft-xs active:scale-[0.98] ${
              activeTab === 'DATA_BACKUP'
                ? 'btn-brand text-white shadow-soft-md'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Respaldo & Caché</span>
          </button>

          <button
            onClick={() => setActiveTab('TELEMETRY')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-soft-xs active:scale-[0.98] ${
              activeTab === 'TELEMETRY'
                ? 'btn-brand text-white shadow-soft-md'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Telemetría</span>
          </button>
        </div>
      </div>

      {/* Contenido según la pestaña seleccionada */}
      {activeTab === 'PREFERENCES' && (
        <div className="space-y-6">
          {/* Selector de Temas Visuales de Alto Contraste */}
          <div className="app-card p-6 bg-white border border-slate-200/80 shadow-soft rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-brand-600" />
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Selector de Tema & Atmósfera Visual
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                {appTheme === 'rose_pastel' ? 'Rose Pastel Activo 🌸' : appTheme === 'dark' ? 'Oscuro Activo 🌙' : 'Claro Activo ☀️'}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Elige el esquema de contraste y color adaptado a tu jornada de estudio o identidad académica:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Opción 1: Modo Claro */}
              <button
                type="button"
                onClick={() => handleSelectTheme('light')}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  appTheme === 'light'
                    ? 'border-[#0F52BA] bg-blue-50/50 shadow-soft-xs ring-2 ring-[#0F52BA]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Sun className="w-4 h-4 text-amber-500" />
                  {appTheme === 'light' && <Check className="w-3.5 h-3.5 text-[#0F52BA]" />}
                </div>
                <div className="text-xs font-bold text-slate-900">Claro Apple</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Cobalto & Blanco Puro</div>
                <div className="mt-3 flex gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#f5f5f7] border border-slate-300 inline-block" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#0F52BA] inline-block" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ffffff] border border-slate-200 inline-block" />
                </div>
              </button>

              {/* Opción 2: Modo Oscuro */}
              <button
                type="button"
                onClick={() => handleSelectTheme('dark')}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  appTheme === 'dark'
                    ? 'border-indigo-500 bg-slate-900 text-white shadow-soft-xs ring-2 ring-indigo-500'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Moon className="w-4 h-4 text-indigo-400" />
                  {appTheme === 'dark' && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </div>
                <div className={`text-xs font-bold ${appTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Deep Slate OLED</div>
                <div className={`text-[10px] mt-0.5 ${appTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Oscuro Ergonómico</div>
                <div className="mt-3 flex gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#0b0f19] border border-slate-700 inline-block" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#6366f1] inline-block" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#111827] inline-block" />
                </div>
              </button>

              {/* Opción 3: Rose Pastel María Fernanda */}
              <button
                type="button"
                onClick={() => handleSelectTheme('rose_pastel')}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  appTheme === 'rose_pastel'
                    ? 'border-[#D91B5C] bg-[#FFF0F3] shadow-soft-xs ring-2 ring-[#D91B5C]'
                    : 'border-slate-200 bg-white hover:border-rose-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">🌸</span>
                  {appTheme === 'rose_pastel' && <Check className="w-3.5 h-3.5 text-[#D91B5C]" />}
                </div>
                <div className="text-xs font-bold text-[#3B0516] flex items-center gap-1">
                  <span>Rose Atelier Velvet</span>
                </div>
                <div className="text-[10px] text-[#701031] mt-0.5">Alto Contraste & Subtonos</div>
                <div className="mt-3 flex gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FFF0F3] border border-rose-300 inline-block" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#D91B5C] inline-block" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#831038] inline-block" />
                </div>
              </button>
            </div>
          </div>

          {/* Personalización de la Barra Lateral por Perfil */}
          <div className="app-card p-6 bg-white border border-slate-200/80 shadow-soft rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Fijar Funciones Especiales por Perfil en la Barra Lateral
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold">
                Personalizable
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Configura qué módulos especializados (Ciencias Naturales, Humanidades, Paletas de Color, Cálculo & Vectores, Entregas Creativas, etc.) aparecen fijados en la barra lateral para tu cuenta de estudiante.
            </p>

            <button
              onClick={() => setIsSidebarCustomizerOpen(true)}
              className="w-full py-3 px-4 rounded-xl btn-brand text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Personalizar Módulos Fijados en la Barra Lateral</span>
            </button>
          </div>

          {/* Preferencias de Temporizadores de Estudio */}
          <div className="app-card p-6 bg-white border border-slate-200/80 shadow-soft rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Parámetros de Enfoque Pomodoro
              </h3>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-xs font-bold text-slate-900">Duración Estándar de Bloque</p>
                <p className="text-[11px] text-slate-500">Minutos de concentración por sesión</p>
              </div>
              <select
                value={user?.preferences.focus_duration || 25}
                onChange={(e) =>
                  updateUserPreferences({ focus_duration: Number(e.target.value) })
                }
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 text-slate-800"
              >
                <option value={20}>20 Minutos</option>
                <option value={25}>25 Minutos (Estándar)</option>
                <option value={35}>35 Minutos (Profundo)</option>
                <option value={50}>50 Minutos (Ultra)</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-900">Sonido de Notificación</p>
                <p className="text-[11px] text-slate-500">Emitir alerta al concluir el temporizador</p>
              </div>
              <input
                type="checkbox"
                checked={user?.preferences.sound_enabled ?? true}
                onChange={(e) =>
                  updateUserPreferences({ sound_enabled: e.target.checked })
                }
                className="w-4 h-4 accent-brand-500 rounded"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'SOUNDSCAPES' && <FocusSoundscapeMixer />}

      {activeTab === 'DATA_BACKUP' && (
        <div className="space-y-6">
          {/* Tarjeta de Respaldo JSON y Notion */}
          <div className="app-card p-6 bg-white border border-slate-200/80 shadow-soft rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Copia de Seguridad & Exportación
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Exporta tus calificaciones, planes de evaluación, notas de deconstrucción y horarios en formato JSON estándar o genera un workspace estructurado para Notion.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setIsBackupModalOpen(true)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Gestionar Respaldo JSON</span>
              </button>

              <button
                onClick={() => setIsNotionModalOpen(true)}
                className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Exportar Espacio a Notion</span>
              </button>
            </div>
          </div>

          {/* Mantenimiento de Caché y Estado Cero */}
          <div className="app-card p-6 bg-white border border-slate-200/80 shadow-soft rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Mantenimiento & Purga Total de Caché
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Si detectas datos antiguos en tu navegador, una versión anterior cacheada o deseas comenzar un nuevo semestre completamente limpio, purga la memoria local, CacheStorage y registros de Service Worker.
            </p>

            <button
              onClick={async () => {
                if (window.confirm('¿Deseas restablecer todos los cachés locales, Storage de Service Worker y reiniciar a la versión más reciente?')) {
                  await cacheCleaner.resetAllLocalCache();
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Restablecer Caché Local & Forzar Recarga Viva</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'TELEMETRY' && <AdminTelemetryPanel />}

      {/* Modales */}
      <BackupRestoreModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
      />

      <NotionWorkspaceExporterModal
        isOpen={isNotionModalOpen}
        onClose={() => setIsNotionModalOpen(false)}
      />

      <SidebarCustomizerModal
        isOpen={isSidebarCustomizerOpen}
        onClose={() => setIsSidebarCustomizerOpen(false)}
      />
    </div>
  );
};
