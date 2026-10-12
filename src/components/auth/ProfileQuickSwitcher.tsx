import React from 'react';
import { useAuth } from '../../context/AuthContext';
import type { AcademicProfileId } from '../../types';
import { CompassIcon, TimerIcon, AtomIcon, PaletteIcon } from '../common/Icons';

export const ProfileQuickSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { academicProfile, switchProfileDemo } = useAuth();

  const profiles: {
    id: AcademicProfileId;
    name: string;
    subtext: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'andres_bachillerato_1',
      name: 'Andrés',
      subtext: '1er Año Bachillerato',
      icon: <CompassIcon className="w-4 h-4 text-emerald-600" />,
      color: 'hover:border-emerald-300',
    },
    {
      id: 'prima_bachillerato_5',
      name: 'Prima',
      subtext: '5to Año / Admisión',
      icon: <TimerIcon className="w-4 h-4 text-amber-600" />,
      color: 'hover:border-amber-300',
    },
    {
      id: 'santiago_fisica_ucv',
      name: 'Santiago',
      subtext: 'Física UCV',
      icon: <AtomIcon className="w-4 h-4 text-blue-600" />,
      color: 'hover:border-blue-300',
    },
    {
      id: 'mafe_diseno_ucab',
      name: 'María Fernanda',
      subtext: 'Diseño UCAB',
      icon: <PaletteIcon className="w-4 h-4 text-purple-600" />,
      color: 'hover:border-purple-300',
    },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 border border-slate-200/80 rounded-xl overflow-x-auto no-scrollbar">
        {profiles.map((p) => {
          const isActive = academicProfile === p.id;
          return (
            <button
              key={p.id}
              onClick={() => switchProfileDemo(p.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-white text-slate-900 shadow-soft-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title={`${p.name} • ${p.subtext}`}
            >
              {p.icon}
              <span>{p.name}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Perfil Académico Activo
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono">
          4 Estudiantes
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {profiles.map((p) => {
          const isActive = academicProfile === p.id;
          return (
            <button
              key={p.id}
              onClick={() => switchProfileDemo(p.id)}
              className={`flex items-center gap-2 p-2.5 rounded-xl text-left transition-all border ${
                isActive
                  ? 'bg-white border-blue-500 shadow-soft-sm text-slate-900 ring-1 ring-blue-500/20'
                  : 'bg-white/70 border-slate-200/80 text-slate-600 hover:bg-white ' + p.color
              }`}
            >
              <div className="p-1.5 rounded-lg bg-slate-100 shrink-0">
                {p.icon}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate leading-tight">{p.name}</p>
                <p className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">{p.subtext}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
