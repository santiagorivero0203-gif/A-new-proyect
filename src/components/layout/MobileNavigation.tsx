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
      icon: <TimerIcon className="w-4.5 h-4.5" />,
    },
    {
      id: 'CREATIVE_BOARD',
      label: 'Entregas',
      icon: <PaletteIcon className="w-4.5 h-4.5" />,
    },
    {
      id: 'DESIGN_PALETTE',
      label: 'Paletas',
      icon: <PaletteIcon className="w-4.5 h-4.5 text-pink-500" />,
    },
    {
      id: 'PLANNER',
      label: 'Agenda',
      icon: <CalendarIcon className="w-4.5 h-4.5" />,
    },
    {
      id: 'GUIDES',
      label: 'Guías',
      icon: <BookOpenIcon className="w-4.5 h-4.5" />,
    },
    {
      id: 'EXAMS',
      label: 'Simulador',
      icon: <LayersIcon className="w-4.5 h-4.5" />,
    },
    {
      id: 'MATH_LAB',
      label: 'Cálculo',
      icon: <CalculatorIcon className="w-4.5 h-4.5" />,
    },
    {
      id: 'SCIENCE_LAB',
      label: 'Ciencias',
      icon: <AtomIcon className="w-4.5 h-4.5" />,
    },
    {
      id: 'HUMANITIES_LAB',
      label: 'Letras',
      icon: <BookOpenIcon className="w-4.5 h-4.5" />,
    },
    {
      id: 'STORAGE',
      label: 'Vault',
      icon: <UploadCloudIcon className="w-4.5 h-4.5" />,
    },
    {
      id: 'UCV_COURSE',
      label: 'Curso UCV',
      icon: <AtomIcon className="w-4.5 h-4.5 text-[#0F52BA]" />,
    },
    {
      id: 'SETTINGS',
      label: 'Ajustes',
      icon: <CalculatorIcon className="w-4.5 h-4.5" />,
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
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/90 dark:border-slate-800 px-2 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.06)] overflow-x-auto no-scrollbar pt-2.5 min-h-[74px] sm:min-h-[78px]"
      style={{
        paddingBottom: 'max(16px, calc(env(safe-area-inset-bottom, 0px) + 10px))',
      }}
    >
      {visibleTabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center min-w-[56px] flex-1 py-1.5 px-1 transition-all active:scale-95 touch-manipulation ${
              isActive
                ? 'text-[#0F52BA] dark:text-blue-400 font-bold'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-[#0F52BA] dark:text-blue-400 shadow-xs ring-1 ring-blue-100 dark:ring-blue-900/50 scale-105'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {tab.icon}
            </div>
            <span className="text-[11px] tracking-tight font-medium mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
