import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * Componente de Estado Vacío (Empty State) Editorial & Minimalista
 * Diseñado bajo la directriz 'Estado Cero':
 * - Contenedor con fondo sutil bg-slate-50/50 y bordes punteados border-slate-200
 * - Iconografía minimalista en tonos neutros
 * - Tipografía concisa y botón de acción en azul cobalto (#0F52BA)
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`bg-slate-50/50 border-2 border-dashed border-slate-200/90 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center transition-all ${className}`}
    >
      {/* Icono Vectorial */}
      {icon ? (
        <div className="w-13 h-13 rounded-2xl bg-white border border-slate-200/80 text-slate-400 flex items-center justify-center shadow-soft-sm mb-4">
          {icon}
        </div>
      ) : (
        <div className="w-13 h-13 rounded-2xl bg-white border border-slate-200/80 text-slate-400 flex items-center justify-center shadow-soft-sm mb-4">
          <svg className="w-6 h-6 stroke-[1.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
      )}

      {/* Textos */}
      <h3 className="text-sm sm:text-base font-extrabold text-slate-800 font-sans tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
        {description}
      </p>

      {/* Botón de Acción Principal Azul Cobalto */}
      {actionLabel && onAction && (
        <div className="mt-5">
          <button
            onClick={onAction}
            className="px-4.5 py-2.5 rounded-xl bg-[#0F52BA] hover:bg-[#0c4194] active:scale-[0.98] text-white font-bold text-xs shadow-soft flex items-center gap-2 transition-all"
          >
            <span>{actionLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
};
