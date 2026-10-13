import React, { useState } from 'react';
import { ScientificCalculator } from '../dashboards/ScientificCalculator';
import {
  CalculatorIcon,
  XIcon,
  MinimizeIcon,
  MaximizeIcon,
} from '../common/Icons';

interface FloatingCalculatorWidgetProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Widget Flotante de Calculadora Científica (Módulo Analítico)
 * Disponible universalmente para todos los estudiantes durante
 * exámenes y guías de estudio sin interrumpir el flujo ni reiniciar temporizadores.
 */
export const FloatingCalculatorWidget: React.FC<FloatingCalculatorWidgetProps> = ({
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleSetOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalIsOpen(nextOpen);
    }
    if (onOpenChange) {
      onOpenChange(nextOpen);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 pointer-events-auto select-none print:hidden">
      {/* Botón Flotante Disparador (Floating Action Pill) */}
      {!isOpen && (
        <button
          onClick={() => {
            handleSetOpen(true);
            setIsMinimized(false);
          }}
          className="flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-soft-lg font-bold text-xs transition-all transform hover:scale-105 active:scale-95 border bg-white text-slate-800 border-slate-200/90 hover:bg-slate-50"
          title="Abrir Calculadora Científica Flotante (no interrumpe el examen)"
        >
          <div className="w-6 h-6 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center">
            <CalculatorIcon className="w-3.5 h-3.5" />
          </div>
          <span className="font-sans">Calculadora Científica</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono">
            CODATA
          </span>
        </button>
      )}

      {/* Ventana Flotante no intrusiva */}
      {isOpen && (
        <div
          className={`bg-white rounded-3xl border border-slate-200/90 shadow-soft-lg overflow-hidden transition-all duration-200 ${
            isMinimized ? 'w-72 max-w-[calc(100vw-2rem)] h-14' : 'w-[calc(100vw-2rem)] max-w-sm sm:w-96 shadow-2xl animate-fadeIn'
          }`}
        >
          {/* Barra Superior / Header de la Ventana */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center">
                <CalculatorIcon className="w-3.5 h-3.5 text-brand-500" />
              </div>
              <h3 className="text-xs font-bold text-slate-800 font-display">
                Calculadora Científica
              </h3>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                title={isMinimized ? 'Expandir' : 'Minimizar'}
              >
                {isMinimized ? (
                  <MaximizeIcon className="w-3.5 h-3.5" />
                ) : (
                  <MinimizeIcon className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={() => handleSetOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Cerrar panel flotante"
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Cuerpo de la Calculadora */}
          {!isMinimized && (
            <div className="p-3 max-h-[520px] overflow-y-auto">
              <ScientificCalculator isEmbedded={true} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
