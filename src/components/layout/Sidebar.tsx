import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  TimerIcon,
  BookOpenIcon,
  LayersIcon,
  CalculatorIcon,
  UploadCloudIcon,
  PaletteIcon,
  CalendarIcon,
} from '../common/Icons';

export type MainTabType = 'PRODUCTIVITY' | 'PLANNER' | 'GUIDES' | 'EXAMS' | 'STORAGE' | 'CREATIVE_BOARD' | 'TOOLS';

interface SidebarProps {
  currentTab: MainTabType;
  onSelectTab: (tab: MainTabType) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
}) => {
  const { user } = useAuth();

  const navigationTabs: { id: MainTabType; name: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'PRODUCTIVITY',
      name: 'Workspace',
      icon: <TimerIcon className="w-4 h-4 text-brand-500" />,
    },
    {
      id: 'PLANNER',
      name: 'Agenda & Evaluaciones',
      icon: <CalendarIcon className="w-4 h-4 text-brand-500" />,
      badge: 'Cortes',
    },
    {
      id: 'EXAMS',
      name: 'Evaluaciones y Pruebas',
      icon: <LayersIcon className="w-4 h-4 text-slate-700" />,
      badge: 'Prácticas',
    },
    {
      id: 'GUIDES',
      name: 'Guías y Temarios',
      icon: <BookOpenIcon className="w-4 h-4 text-slate-700" />,
      badge: '5 Materias',
    },
    {
      id: 'STORAGE',
      name: 'Documentos',
      icon: <UploadCloudIcon className="w-4 h-4 text-slate-700" />,
    },
    {
      id: 'CREATIVE_BOARD',
      name: 'Proyectos y Entregas',
      icon: <PaletteIcon className="w-4 h-4 text-slate-700" />,
    },
    {
      id: 'TOOLS',
      name: 'Calculadora y Ajustes',
      icon: <CalculatorIcon className="w-4 h-4 text-slate-700" />,
    },
  ];

  return (
    <>
      {/* Overlay oscuro para pantallas móviles */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Contenedor del Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#fafafc] border-r border-slate-200/90 flex flex-col justify-between p-4 transition-transform duration-200 ease-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-4">
          {/* Logo y Encabezado */}
          <div className="flex items-center justify-between px-2 pt-2 pb-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold text-xs shadow-soft-sm">
                CP
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-none font-sans">
                  Centro de Estudio
                </h1>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-none">
                  Productividad Académica
                </p>
              </div>
            </div>
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
            >
              ✕
            </button>
          </div>

          {/* Tarjeta del Estudiante Activo */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-soft-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 tracking-wider shadow-soft-sm">
                {user?.full_name
                  ? user.full_name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()
                  : 'SR'}
              </div>
              <div className="overflow-hidden">
                <h3 className="text-xs font-bold text-slate-900 truncate font-sans">{user?.full_name || 'Santiago Rivero'}</h3>
                <p className="text-[11px] text-slate-500 font-medium truncate">{user?.institution || 'UCV - Ciencias'}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{user?.email || 'estudiante@ucv.ve'}</p>
              </div>
            </div>
          </div>

          {/* Menú de Navegación */}
          <div className="pt-2">
            <nav className="space-y-1">
              {navigationTabs.map((tab) => {
                const isActive = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onSelectTab(tab.id);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-soft-sm border border-slate-200/80 font-bold'
                        : 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="shrink-0">{tab.icon}</div>
                      <span className="truncate">{tab.name}</span>
                    </div>
                    {tab.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium font-mono">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer del Sidebar */}
        <div className="pt-3 border-t border-slate-200/80 text-[11px] text-slate-400 flex items-center justify-between font-mono">
          <span>v2.0</span>
          <span>Modo Claro</span>
        </div>
      </aside>
    </>
  );
};
