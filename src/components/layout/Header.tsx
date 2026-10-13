import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  SparklesIcon,
  LayersIcon,
  SunIcon,
  LogOutIcon,
} from '../common/Icons';

interface HeaderProps {
  onOpenAuth: () => void;
  onToggleMobileSidebar: () => void;
  onOpenAccountManager?: () => void;
  currentTab: string;
}

/**
 * Mapeo de títulos de migas de pan según la pestaña activa
 */
const TAB_BREADCRUMBS: Record<string, string> = {
  PRODUCTIVITY: 'Panel de Control',
  PLANNER: 'Agenda & Evaluaciones',
  EXAMS: 'Simulador de Exámenes',
  GUIDES: 'Guías & Deconstrucción',
  STORAGE: 'Documentos & Vault',
  CREATIVE_BOARD: 'Proyectos & Entregas',
  TOOLS: 'Herramientas & Ajustes',
};

/**
 * Header de Navegación Superior
 * Arquitectura visual limpia y espaciosa:
 * Migas de pan, indicador de IA Gemini, control de tema, avatar y acceso a cuenta.
 */
export const Header: React.FC<HeaderProps> = ({
  onOpenAuth,
  onToggleMobileSidebar,
  onOpenAccountManager,
  currentTab,
}) => {
  const { user, signOut } = useAuth();

  const breadcrumbSection = TAB_BREADCRUMBS[currentTab] || 'Panel de Control';

  // Iniciales del estudiante para el avatar
  const initials = user?.full_name
    ? user.full_name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'SR';

  return (
    <header className="sticky top-0 z-30 w-full h-18 border-b border-slate-200/80 bg-white/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between transition-colors">
      {/* Lado Izquierdo: Botón Menú Móvil + Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Abrir menú de navegación"
        >
          <LayersIcon className="w-5 h-5" />
        </button>

        {/* Migas de pan (Breadcrumbs) legibles y limpias */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-medium">
          <span className="text-slate-400 hover:text-slate-600 transition-colors cursor-default">
            Inicio
          </span>
          <span className="text-slate-300 font-mono text-xs">›</span>
          <span className="text-slate-900 font-bold tracking-tight">
            {breadcrumbSection}
          </span>
        </nav>
      </div>

      {/* Lado Derecho: Pills de estado en vivo, Toggle de Luz, Usuario y Salir */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Pill 1: Estado Gemini Flash */}
        <div
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 text-xs font-semibold text-slate-700 transition-all shadow-soft-sm cursor-default"
          title="Motor de Inteligencia Artificial Gemini activo"
        >
          <SparklesIcon className="w-4 h-4 text-brand-500" />
          <span className="text-slate-500 font-normal">IA:</span>
          <span className="text-slate-900 font-bold">Gemini Flash</span>
        </div>

        {/* Botón de Modo Claro / Luminosidad */}
        <button
          className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all shadow-soft-sm active:scale-95"
          title="Modo visual optimizado para estudio diurno"
          aria-label="Alternar modo de luz"
        >
          <SunIcon className="w-4.5 h-4.5 text-amber-500" />
        </button>

        {/* Tarjeta de Usuario en el Header (Avatar + Nombre + Carrera) */}
        {user ? (
          <div
            onClick={onOpenAccountManager}
            className="flex items-center gap-3 px-2 sm:px-3 py-1.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/80 shadow-soft-sm cursor-pointer transition-all active:scale-[0.98] group"
            title="Administrar cuenta o cambiar de estudiante"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 tracking-wider shadow-soft-sm group-hover:bg-brand-500 transition-colors">
              {initials}
            </div>
            <div className="hidden lg:block text-left pr-1 leading-tight">
              <div className="text-xs font-bold text-slate-900 truncate font-sans max-w-[130px]">
                {user.full_name}
              </div>
              <div className="text-[11px] text-slate-500 truncate max-w-[130px] font-medium">
                {user.institution || 'Estudiante'}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="btn-brand text-xs py-2 px-4 rounded-xl"
          >
            Conectar
          </button>
        )}

        {/* Botón Salir / Desconectar */}
        {user && (
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 border border-slate-200/90 text-xs font-semibold text-slate-700 transition-all shadow-soft-sm active:scale-95"
            title="Cerrar sesión de esta cuenta"
          >
            <LogOutIcon className="w-4 h-4 text-slate-400 group-hover:text-rose-500" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        )}
      </div>
    </header>
  );
};
