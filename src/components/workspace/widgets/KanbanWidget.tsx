import React from 'react';
import { CreativeDeliveryBoard } from '../../dashboards/CreativeDeliveryBoard';
import { PaletteIcon } from '../../common/Icons';

export const KanbanWidget: React.FC = () => {
  return (
    <div className="app-card p-6 bg-white border border-slate-200/80 shadow-soft space-y-5">
      {/* Cabecera */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
            <PaletteIcon className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Tablero Visual de Proyectos & Entregas
            </h3>
            <p className="text-[11px] text-slate-500">
              Seguimiento por etapas (Brief, Moodboard, En Curso, Final) con portadas e imágenes
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-semibold">
          Kanban Visual
        </span>
      </div>

      {/* Tablero Kanban */}
      <div className="pt-1">
        <CreativeDeliveryBoard />
      </div>
    </div>
  );
};
