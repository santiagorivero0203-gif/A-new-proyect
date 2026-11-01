import React from 'react';
import type { MainTabType } from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import {
  TimerIcon,
  BookOpenIcon,
  LayersIcon,
  CalculatorIcon,
  UploadCloudIcon,
  CalendarIcon,
  AtomIcon,
  PaletteIcon,
} from '../common/Icons';

interface MobileNavigationProps {
  currentTab: MainTabType;
  onSelectTab: (tab: MainTabType) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ currentTab, onSelectTab }) => {
  const { user, academicProfile, getProfileSidebarTabs } = useAuth();

  const isSantiagoProfile =
    academicProfile === 'santiago_fisica_ucv' ||
    user?.academic_profile === 'santiago_fisica_ucv' ||
    user?.username === 'santiago_fisica_ucv' ||
    Boolean(user?.full_name?.toLowerCase().includes('santiago')) ||
    Boolean(user?.email?.toLowerCase().includes('santiago'));

  const allPossibleTabs: {
    id: MainTabType;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'PRODUCTIVITY',
      label: 'Lienzo',
      icon: <TimerIcon className="w-6 h-6" />,
    },
    {
      id: 'CREATIVE_BOARD',
      label: 'Entregas',
      icon: <PaletteIcon className="w-6 h-6" />,
    },
    {
      id: 'DESIGN_PALETTE',
      label: 'Paletas',
      icon: <PaletteIcon className="w-6 h-6 text-pink-500" />,
    },
    {
      id: 'PLANNER',
      label: 'Agenda',
      icon: <CalendarIcon className="w-6 h-6" />,
    },
    {
      id: 'GUIDES',
      label: 'Guías',
      icon: <BookOpenIcon className="w-6 h-6" />,
    },
    {
      id: 'EXAMS',
      label: 'Simulador',
      icon: <LayersIcon className="w-6 h-6" />,
    },
    {
      id: 'MATH_LAB',
      label: 'Cálculo',
      icon: <CalculatorIcon className="w-6 h-6" />,
    },
    {
      id: 'SCIENCE_LAB',
      label: 'Ciencias',
      icon: <AtomIcon className="w-6 h-6" />,
    },
    {
      id: 'HUMANITIES_LAB',
      label: 'Letras',
      icon: <BookOpenIcon className="w-6 h-6" />,
    },
    {
      id: 'STORAGE',
      label: 'Vault',
      icon: <UploadCloudIcon className="w-6 h-6" />,
    },
    {
      id: 'UCV_COURSE',
      label: 'Curso UCV',
      icon: <AtomIcon className="w-6 h-6 text-[#0F52BA]" />,
    },
    {
      id: 'SETTINGS',
      label: 'Ajustes',
      icon: <CalculatorIcon className="w-6 h-6" />,
    },
  ];

  const activeTabsList = user?.preferences?.sidebar_tabs || getProfileSidebarTabs(academicProfile);

  const visibleTabs = allPossibleTabs.filter((tab) => {
    if (tab.id === 'UCV_COURSE' && !isSantiagoProfile) return false;
    if (tab.id === 'SETTINGS' && (activeTabsList.includes('SETTINGS') || activeTabsList.includes('TOOLS'))) {
      return true;
    }
    return activeTabsList.includes(tab.id);
  });

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      {/* Barra de degradado superior para separación limpia */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/30 dark:via-blue-400/40 to-transparent" />

      {/* Contenedor principal interactivo */}
      <nav
        aria-label="Navegación Móvil Principal"
        className="pointer-events-auto relative w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-t border-slate-200/90 dark:border-slate-800 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.3)] min-h-[86px] sm:min-h-[92px] pt-2 px-1"
        style={{
          paddingBottom: 'max(20px, calc(env(safe-area-inset-bottom, 0px) + 14px))',
        }}
      >
        {/* Máscara de degradado izquierda para indicar desplazamiento */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 opacity-80" />

        {/* Máscara de degradado derecha para indicar desplazamiento */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 opacity-80" />

        {/* Lista horizontal de pestañas */}
        <div className="flex items-center justify-around overflow-x-auto no-scrollbar gap-1 px-3">
          {visibleTabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex flex-col items-center justify-center min-w-[62px] flex-1 py-1 px-1 transition-all active:scale-95 touch-manipulation select-none ${
                  isActive
                    ? 'text-[#0F52BA] dark:text-blue-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <div
                  className={`p-2 rounded-2xl transition-all duration-200 flex items-center justify-center ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/70 text-[#0F52BA] dark:text-blue-400 shadow-sm ring-2 ring-blue-500/20 dark:ring-blue-400/30 scale-105'
                      : 'hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {tab.icon}
                </div>
                <span className={`text-[12px] leading-tight font-medium mt-1 truncate ${isActive ? 'font-bold' : ''}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
