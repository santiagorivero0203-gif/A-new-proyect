import React from 'react';
import { SparklesIcon } from '../common/Icons';

interface AiProcessingModalProps {
  isOpen: boolean;
  currentStepMessage: string;
  progressPercent: number;
  documentTitle: string;
  onCancel?: () => void;
}

/**
 * Modal Reactivo de Carga y Procesamiento Asíncrono con Google Gemini API
 * Muestra el progreso por etapas en tiempo real con estética clara y minimalista.
 */
export const AiProcessingModal: React.FC<AiProcessingModalProps> = ({
  isOpen,
  currentStepMessage,
  progressPercent,
  documentTitle,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200/90 shadow-soft-lg space-y-6 text-center">
        {/* Icono Animado */}
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-blue-100 animate-ping opacity-30" />
          <div className="relative w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shadow-soft-sm">
            <SparklesIcon className="w-7 h-7 animate-pulse text-blue-600" />
          </div>
        </div>

        {/* Título y Estado */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold">
            Google Gemini 2.5 Flash • Multimodal
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight font-display">
            Analizando Documento con IA
          </h3>
          <p className="text-xs text-slate-500 font-medium truncate max-w-xs mx-auto">
            "{documentTitle}"
          </p>
        </div>

        {/* Barra de Progreso Fluida */}
        <div className="space-y-2">
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>{progressPercent}% completado</span>
            <span>Motor Adaptativo</span>
          </div>
        </div>

        {/* Mensaje de Paso Actual */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 text-left space-y-1">
          <p className="font-semibold text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>Procesando...</span>
          </p>
          <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
            {currentStepMessage || 'Extrayendo conceptos clave y adaptando el prompt a tu perfil de estudio...'}
          </p>
        </div>

        {/* Pasos Visuales */}
        <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-400 font-medium">
          <div className={`p-2 rounded-lg border ${progressPercent >= 30 ? 'bg-blue-50/60 border-blue-200 text-blue-700 font-bold' : 'border-slate-100'}`}>
            1. Lectura
          </div>
          <div className={`p-2 rounded-lg border ${progressPercent >= 60 ? 'bg-blue-50/60 border-blue-200 text-blue-700 font-bold' : 'border-slate-100'}`}>
            2. Gemini AI
          </div>
          <div className={`p-2 rounded-lg border ${progressPercent >= 90 ? 'bg-blue-50/60 border-blue-200 text-blue-700 font-bold' : 'border-slate-100'}`}>
            3. Preguntas
          </div>
        </div>

        {/* Botón de Cancelar (opcional) */}
        {onCancel && (
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={onCancel}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium transition-colors"
            >
              Cancelar análisis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
