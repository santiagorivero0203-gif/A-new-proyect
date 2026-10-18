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
      label: 'Workspace',
      icon: <TimerIcon className="w-4.5 h-4.5" />,
    },
    {
      id: 'PLANNER',
      label: 'Agenda',
      icon: <CalendarIcon className="w-4.5 h-4.5" />,
    },
    {
      id: 'EXAMS',
      label: 'Simulador',
      icon: <LayersIcon className="w-4.5 h-4.5" />,
    },
    {
      id: 'GUIDES',
      label: 'Guías',
      icon: <BookOpenIcon className="w-4.5 h-4.5" />,
    },
    {
      id: 'STORAGE',
      label: 'Vault',
      icon: <UploadCloudIcon className="w-4.5 h-4.5" />,
    },
    {
      id: 'CREATIVE_BOARD',
      label: 'Entregas',
      icon: <PaletteIcon className="w-4.5 h-4.5" />,
    },
    {
      id: 'UCV_COURSE',
      label: 'Curso UCV',
      icon: <AtomIcon className="w-4.5 h-4.5 text-[#0F52BA]" />,
    },
    {
      id: 'TOOLS',
      label: 'Ajustes',
      icon: <CalculatorIcon className="w-4.5 h-4.5" />,
    },
  ];

  const activeTabsList = user?.preferences?.sidebar_tabs || getProfileSidebarTabs(academicProfile);

  const visibleTabs = allPossibleTabs.filter((tab) => {
    if (tab.id === 'UCV_COURSE' && !isSantiagoProfile) return false;
    return activeTabsList.includes(tab.id);
  });

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 px-1 flex items-center justify-around shadow-soft overflow-x-auto no-scrollbar">
      {visibleTabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center min-w-[56px] flex-1 py-1 transition-all ${
              isActive
                ? 'text-[#0F52BA] dark:text-blue-400 font-bold'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <div
              className={`p-1 rounded-xl transition-all ${
                isActive ? 'bg-blue-50 dark:bg-blue-950/50 text-[#0F52BA] dark:text-blue-400' : ''
              }`}
            >
              {tab.icon}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[64px]">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
