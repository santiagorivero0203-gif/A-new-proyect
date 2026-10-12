import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ProfileQuickSwitcher } from '../auth/ProfileQuickSwitcher';
import { SparklesIcon, LayersIcon } from '../common/Icons';

interface HeaderProps {
  onOpenAuth: () => void;
  onToggleMobileSidebar: () => void;
  currentTab: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth, onToggleMobileSidebar }) => {
  const { user, isDemoMode, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-30 w-full h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
      {/* Lado Izquierdo: Botón Menú Móvil + Título */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Abrir menú"
        >
          <LayersIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-soft-sm">
            CP
          </div>
          <div className="hidden sm:block">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight leading-none font-display">
              Centro de Productividad Estudiantil
            </h2>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-none">
              {user?.institution || 'Ecosistema de Estudio'}
            </p>
          </div>
        </div>
      </div>

      {/* Lado Central: Selector Rápido de Perfil (Desktop / Tablet) */}
      <div className="hidden md:block">
        <ProfileQuickSwitcher compact={true} />
      </div>

      {/* Lado Derecho: Estado y Acceso */}
      <div className="flex items-center gap-2.5">
        <div
          className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border ${
            isDemoMode
              ? 'bg-amber-50 border-amber-200 text-amber-700'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}
          title={isDemoMode ? 'Modo Interactivo local' : 'Conectado a la base de datos Supabase'}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${isDemoMode ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`}
          />
          {isDemoMode ? 'Demo' : 'Supabase Live'}
        </div>

        <button
          onClick={user ? signOut : onOpenAuth}
          className="btn-secondary text-xs py-1.5 px-3 rounded-lg"
        >
          {user ? (
            <span>Cerrar</span>
          ) : (
            <span className="flex items-center gap-1.5">
              <SparklesIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>Conectar</span>
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
