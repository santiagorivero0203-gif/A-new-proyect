import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { CreativeDeliveryBoard } from './CreativeDeliveryBoard';
import { PaletteIcon } from '../common/Icons';

/**
 * Dashboard Especializado de María Fernanda (Diseño Integral UCAB)
 * Adaptado a la estética clara y refinada con bordes redondeados y tipografía editorial,
 * integrando el tablero Kanban de entregas y el mural de referencias de Supabase Storage.
 */
export const MafeDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Banner Superior */}
      <div className="app-card p-6 sm:p-8 bg-white border border-slate-200/90 shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold">
            <PaletteIcon className="w-3.5 h-3.5" />
            UCAB • Escuela de Diseño Integral
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
            Taller Creativo: {user?.full_name || 'María Fernanda'} 🎨
          </h1>
          <p className="text-sm text-slate-500 max-w-xl">
            Entorno estético para gestión de proyectos, curaduría de referencias visuales, paletas de colores y seguimiento de entregas a jurado.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center min-w-[130px]">
            <p className="text-[10px] uppercase font-bold tracking-wider text-purple-600">
              Próximo Jurado
            </p>
            <p className="text-xl font-bold text-slate-900 mt-0.5 font-display">Taller IV</p>
            <p className="text-[10px] text-slate-500 font-mono">18 Días Restantes</p>
          </div>
        </div>
      </div>

      {/* Tablero Kanban y Módulo Creativo */}
      <CreativeDeliveryBoard />
    </div>
  );
};
