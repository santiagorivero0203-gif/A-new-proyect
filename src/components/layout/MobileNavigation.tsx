import React from 'react';
import type { MainTabType } from './Sidebar';
import {
  TimerIcon,
  BookOpenIcon,
  LayersIcon,
  CalculatorIcon,
  UploadCloudIcon,
} from '../common/Icons';

interface MobileNavigationProps {
  currentTab: MainTabType;
  onSelectTab: (tab: MainTabType) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ currentTab, onSelectTab }) => {
  const tabs: {
    id: MainTabType;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'PRODUCTIVITY',
      label: 'Tareas',
      icon: <TimerIcon className="w-4 h-4" />,
    },
    {
      id: 'GUIDES',
      label: 'Guías',
      icon: <BookOpenIcon className="w-4 h-4" />,
    },
    {
      id: 'EXAMS',
      label: 'Simulador',
      icon: <LayersIcon className="w-4 h-4" />,
    },
    {
      id: 'STORAGE',
      label: 'Storage',
      icon: <UploadCloudIcon className="w-4 h-4" />,
    },
    {
      id: 'TOOLS',
      label: 'Ajustes',
      icon: <CalculatorIcon className="w-4 h-4" />,
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/90 backdrop-blur-md border-t border-slate-200/90 px-2 flex items-center justify-around shadow-soft">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all ${
              isActive ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div
              className={`p-1 rounded-xl transition-all ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              {tab.icon}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
