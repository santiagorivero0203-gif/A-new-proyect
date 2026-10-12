import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ProfileQuickSwitcher } from '../auth/ProfileQuickSwitcher';
import {
  TimerIcon,
  BookOpenIcon,
  LayersIcon,
  CalculatorIcon,
  FlameIcon,
  UploadCloudIcon,
  PaletteIcon,
} from '../common/Icons';

export type MainTabType = 'PRODUCTIVITY' | 'GUIDES' | 'EXAMS' | 'STORAGE' | 'CREATIVE_BOARD' | 'TOOLS';

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
  const isMafe = user?.academic_profile === 'mafe_diseno_ucab';
  const isSantiago = user?.academic_profile === 'santiago_fisica_ucv';

  const navigationTabs: { id: MainTabType; name: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'PRODUCTIVITY',
      name: 'Productividad & Tareas',
      icon: <TimerIcon className="w-4 h-4 text-slate-600" />,
    },
    {
      id: 'GUIDES',
      name: 'Guías & Ejercicios',
      icon: <BookOpenIcon className="w-4 h-4 text-blue-600" />,
      badge: '5 Materias',
    },
    {
      id: 'EXAMS',
      name: 'Simulador de Exámenes',
      icon: <LayersIcon className="w-4 h-4 text-purple-600" />,
      badge: 'Simadi',
    },
    {
      id: 'STORAGE',
      name: 'Documentos & Storage',
      icon: <UploadCloudIcon className="w-4 h-4 text-emerald-600" />,
      badge: 'PDF / Foto',
    },
    ...(isMafe
      ? [
          {
            id: 'CREATIVE_BOARD' as MainTabType,
            name: 'Tablero Creativo',
            icon: <PaletteIcon className="w-4 h-4 text-purple-600" />,
            badge: 'Kanban',
          },
        ]
      : []),
    {
      id: 'TOOLS',
      name: 'Calculadora & Ajustes',
      icon: <CalculatorIcon className="w-4 h-4 text-slate-600" />,
      badge: isSantiago ? 'Física' : 'Extra',
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
              <div className="w-9 h-9 rounded-2xl bg-[#1d1d1f] flex items-center justify-center text-white font-bold text-sm shadow-soft-sm">
                ⚡
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-none font-display">
                  Ecosistema de Estudio
                </h1>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-none">
                  Productividad Integral
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
              <img
                src={user?.avatar_url}
                alt={user?.full_name}
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="overflow-hidden">
                <h3 className="text-xs font-bold text-slate-900 truncate">{user?.full_name}</h3>
                <p className="text-[11px] text-slate-500 font-medium truncate">{user?.institution}</p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-amber-600 font-semibold">
                  <FlameIcon className="w-3 h-3 text-amber-500" />
                  <span>{user?.streak_days} días de racha</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selector de Perfil Académico */}
          <ProfileQuickSwitcher compact={false} />

          {/* Menú de Navegación */}
          <div className="pt-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
              Secciones de la Plataforma
            </p>
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
          <span>v1.2.0 • Invoficlib Style</span>
          <span>Modo Claro</span>
        </div>
      </aside>
    </>
  );
};
