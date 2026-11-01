import React from 'react';

interface ViewLoadingSkeletonProps {
  label?: string;
}

/**
 * Indicador de Carga Suave para Vistas Dinámicas (Code-Splitting)
 *
 * Previene destellos blancos bruscos y saltos de layout durante la carga asíncrona
 * de módulos pesados. Cumple con rulesofdesign.md (Menos, pero Mejor + Respiración).
 */
export const ViewLoadingSkeleton: React.FC<ViewLoadingSkeletonProps> = ({
  label = 'Cargando módulo académico...',
}) => {
  return (
    <div className="w-full min-h-[480px] p-4 sm:p-8 flex flex-col justify-center items-center space-y-6 animate-pulse">
      <div className="w-12 h-12 rounded-2xl bg-blue-100/70 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/40 flex items-center justify-center text-[#0F52BA] dark:text-blue-400">
        <div className="w-5 h-5 rounded-full border-2 border-[#0F52BA] border-t-transparent animate-spin" />
      </div>

      <div className="text-center space-y-1.5 max-w-xs">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-sans tracking-tight">
          {label}
        </h4>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-sans">
          Sincronizando estado y derivaciones pedagógicas...
        </p>
      </div>

      <div className="w-full max-w-md space-y-3 pt-4">
        <div className="h-4 bg-slate-200/60 dark:bg-slate-800/60 rounded-xl w-3/4 mx-auto" />
        <div className="h-3 bg-slate-100 dark:bg-slate-800/40 rounded-lg w-1/2 mx-auto" />
      </div>
    </div>
  );
};
