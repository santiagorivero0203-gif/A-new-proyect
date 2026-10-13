import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  GridIcon,
  BookOpenIcon,
  LayersIcon,
  CalculatorIcon,
  UploadCloudIcon,
  PaletteIcon,
  CalendarIcon,
  PlusIcon,
} from '../common/Icons';
import { ProfileQuickSwitcher } from '../auth/ProfileQuickSwitcher';

export type MainTabType = 'PRODUCTIVITY' | 'PLANNER' | 'GUIDES' | 'EXAMS' | 'STORAGE' | 'CREATIVE_BOARD' | 'TOOLS';

interface SidebarProps {
  currentTab: MainTabType;
  onSelectTab: (tab: MainTabType) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenAccountManager?: () => void;
}

/**
 * Barra Lateral de Navegación (Sidebar)
 * Arquitectura visual limpia y espaciosa:
 * Logo distintivo, botón destacado de acción rápida (+ Deconstruir Material),
 * píldoras activas en fondo negro de alto contraste, e iconos nítidos.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  onOpenAccountManager,
}) => {
  const { user } = useAuth();

  const navigationTabs: { id: MainTabType; name: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'PRODUCTIVITY',
      name: 'Dashboard',
      icon: <GridIcon className="w-5 h-5" />,
    },
    {
      id: 'EXAMS',
      name: 'Simulador & Exámenes',
      icon: <LayersIcon className="w-5 h-5" />,
      badge: 'Simadi',
    },
    {
      id: 'GUIDES',
      name: 'Guías & Deconstrucción',
      icon: <BookOpenIcon className="w-5 h-5" />,
      badge: 'KaTeX',
    },
    {
      id: 'PLANNER',
      name: 'Agenda & Cortes',
      icon: <CalendarIcon className="w-5 h-5" />,
    },
    {
      id: 'STORAGE',
      name: 'Documentos & Vault',
      icon: <UploadCloudIcon className="w-5 h-5" />,
    },
    {
      id: 'CREATIVE_BOARD',
      name: 'Proyectos & Entregas',
      icon: <PaletteIcon className="w-5 h-5" />,
    },
    {
      id: 'TOOLS',
      name: 'Herramientas & Ajustes',
      icon: <CalculatorIcon className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Overlay oscuro para pantallas móviles */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Contenedor del Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#fcfcfd] border-r border-slate-200/90 flex flex-col justify-between p-5 transition-transform duration-200 ease-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Logo y Encabezado del Sistema */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-soft">
                {/* Isotipo geométrico limpio de panal / nodos de conocimiento */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="7" r="3" />
                  <circle cx="7" cy="16" r="3" />
                  <circle cx="17" cy="16" r="3" />
                  <path d="M12 10v4" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h1 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight font-sans">
                  Centro de Productividad
                </h1>
                <p className="text-xs text-slate-500 font-medium leading-none">
                  Ecosistema Estudiantil
                </p>
              </div>
            </div>
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Cerrar menú"
            >
              ✕
            </button>
          </div>

          {/* Botón Principal de Acción Destacada */}
          <div>
            <button
              onClick={() => {
                onSelectTab('GUIDES');
                onCloseMobile();
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-black active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-soft-md transition-all duration-150 group"
              title="Deconstruir un nuevo tema, PDF o apunte con Gemini IA"
            >
              <PlusIcon className="w-4.5 h-4.5 stroke-[2.5] text-white/90 group-hover:rotate-90 transition-transform duration-200" />
              <span>Deconstruir Material</span>
            </button>
          </div>

          {/* Menú de Navegación Amplio y Grande */}
          <nav className="space-y-1.5">
            {navigationTabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onSelectTab(tab.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all text-left group ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-soft-sm font-bold'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-soft-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`shrink-0 transition-transform duration-150 group-hover:scale-105 ${
                        isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'
                      }`}
                    >
                      {tab.icon}
                    </div>
                    <span className="truncate">{tab.name}</span>
                  </div>
                  {tab.badge && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-medium font-mono ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200/80'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer del Sidebar con Switcher de Perfil y Versión */}
        <div className="space-y-3 pt-4 border-t border-slate-200/80">
          {/* Selector Rápido de Perfil en 1 Clic */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold px-1">
              Cambio Rápido (1 Clic)
            </span>
            <ProfileQuickSwitcher compact={true} />
          </div>

          {/* Tarjeta de Estudiante Activo con acción para cambiar */}
          {user && (
            <div
              onClick={onOpenAccountManager}
              className="p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-soft-sm cursor-pointer transition-all active:scale-[0.99] group"
              title="Cambiar de perfil o administrar cuenta"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Perfil Activo
                </span>
                <span className="text-[10px] text-brand-600 font-semibold group-hover:underline">
                  Cambiar ▾
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-soft-sm">
                  {user.full_name
                    ? user.full_name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()
                    : 'SR'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {user.full_name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate font-medium">
                    {user.institution || 'UCV - Ciencias'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Información de Versión y Marca */}
          <div className="flex items-center justify-between px-1 text-xs text-slate-400 font-mono">
            <span>v1.2.0</span>
            <span className="text-slate-500 font-semibold">CPE Studio</span>
          </div>
        </div>
      </aside>
    </>
  );
};
