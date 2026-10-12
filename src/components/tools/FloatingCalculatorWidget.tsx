import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ScientificCalculator } from '../dashboards/ScientificCalculator';
import {
  CalculatorIcon,
  XIcon,
  MinimizeIcon,
  MaximizeIcon,
} from '../common/Icons';

/**
 * Widget Flotante de Calculadora Científica (Módulo Analítico)
 * Diseñado especialmente para Santiago (Física UCV) y disponible durante
 * exámenes y guías de estudio sin interrumpir el flujo ni reiniciar temporizadores.
 */
export const FloatingCalculatorWidget: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Mostrar automáticamente o dar acceso preferente a Santiago (Física UCV)
  const isSantiago = user?.academic_profile === 'santiago_fisica_ucv';

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 pointer-events-auto select-none print:hidden">
      {/* Botón Flotante Disparador (Floating Action Pill) */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-soft-lg font-bold text-xs transition-all transform hover:scale-105 active:scale-95 border ${
            isSantiago
              ? 'bg-[#1d1d1f] text-white border-slate-700 hover:bg-slate-800'
              : 'bg-white text-slate-800 border-slate-200/90 hover:bg-slate-50'
          }`}
          title="Abrir Calculadora Científica Flotante (no interrumpe el examen)"
        >
          <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <CalculatorIcon className="w-3.5 h-3.5" />
          </div>
          <span className="font-sans">
            {isSantiago ? 'Calculadora Analítica' : 'Calculadora'}
          </span>
          {isSantiago && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-blue-500/30 text-blue-200 font-mono">
              UCV
            </span>
          )}
        </button>
      )}

      {/* Ventana Flotante no intrusiva */}
      {isOpen && (
        <div
          className={`bg-white rounded-3xl border border-slate-200/90 shadow-soft-lg overflow-hidden transition-all duration-200 ${
            isMinimized ? 'w-72 h-14' : 'w-80 sm:w-96 shadow-2xl animate-fadeIn'
          }`}
        >
          {/* Barra Superior / Header de la Ventana */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <CalculatorIcon className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold text-slate-800 font-display">
                Calculadora Científica
              </h3>
              {isSantiago && (
                <span className="text-[9px] px-1.5 py-0.2 bg-blue-100 text-blue-700 font-bold rounded">
                  Física
                </span>
              )}
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
                onClick={() => setIsOpen(false)}
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
