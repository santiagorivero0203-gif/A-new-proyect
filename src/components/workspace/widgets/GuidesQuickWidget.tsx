import React from 'react';
import { BookOpenIcon } from '../../common/Icons';

interface GuidesQuickWidgetProps {
  onNavigateToGuides?: () => void;
}

export const GuidesQuickWidget: React.FC<GuidesQuickWidgetProps> = ({ onNavigateToGuides }) => {
  const quickSubjects = [
    { name: 'Matemática', topic: 'Vectores & Ecuaciones Lineales', count: '12 Temas', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { name: 'Física', topic: 'Cinemática & Leyes de Newton', count: '10 Temas', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { name: 'Química', topic: 'Estequiometría & Enlace Químico', count: '8 Temas', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { name: 'Biología', topic: 'Célula Eucariota & Genética', count: '9 Temas', color: 'bg-teal-50 text-teal-700 border-teal-200' },
    { name: 'Castellano', topic: 'Morfosintaxis & Razonamiento Verbal', count: '7 Temas', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  ];

  return (
    <div className="app-card p-6 flex flex-col justify-between h-full bg-white border border-slate-200/80 shadow-soft">
      <div className="space-y-4">
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-brand-500">
              <BookOpenIcon className="w-4 h-4 text-brand-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Guías de Estudio & Ejercicios Resueltos
              </h3>
              <p className="text-[11px] text-slate-500">Teoría concisa, pasos algorítmicos y exámenes pasados</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
            5 Materias
          </span>
        </div>

        {/* Lista de materias */}
        <div className="space-y-2">
          {quickSubjects.map((s, idx) => (
            <div
              key={idx}
              onClick={onNavigateToGuides}
              className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-brand-500/50 hover:bg-white transition-all cursor-pointer flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border font-mono ${s.color}`}>
                    {s.name}
                  </span>
                  <p className="text-xs font-bold text-slate-800">{s.topic}</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{s.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <span className="text-slate-400">Total: 46 temas con KaTeX</span>
        {onNavigateToGuides && (
          <button
            onClick={onNavigateToGuides}
            className="text-brand-500 hover:text-brand-600 font-semibold transition-colors"
          >
            Abrir Catálogo Completo →
          </button>
        )}
      </div>
    </div>
  );
};
