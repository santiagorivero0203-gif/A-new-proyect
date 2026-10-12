import React, { useState } from 'react';
import { geminiService } from '../../services/geminiService';
import { SparklesIcon, XIcon, CheckCircleIcon } from '../common/Icons';

interface GeminiConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved?: () => void;
}

/**
 * Modal de Configuración y Diagnóstico de Google Gemini API Key
 */
export const GeminiConfigModal: React.FC<GeminiConfigModalProps> = ({
  isOpen,
  onClose,
  onKeySaved,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState(() => geminiService.getApiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    geminiService.setApiKey(apiKeyInput);
    setSavedSuccess(true);
    if (onKeySaved) onKeySaved();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    geminiService.setApiKey('');
    setApiKeyInput('');
    setSavedSuccess(true);
    if (onKeySaved) onKeySaved();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-soft-lg space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <SparklesIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Configuración de Google Gemini
              </h3>
              <p className="text-[11px] text-slate-500">Modelo: gemini-2.5-flash (Multimodal)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Google Gemini API Key
            </label>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
            />
            <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
              Si no proporcionas una clave, la plataforma activará el **Motor Adaptativo Inteligente** que genera diagnósticos, fórmulas KaTeX y preguntas estructuradas por perfil con 0 latencia.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>Estado del Motor IA:</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${apiKeyInput ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                {apiKeyInput ? 'API Key Conectada' : 'Modo Adaptativo Activo'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Soporta PDFs, imágenes de apuntes y fotos de pizarra hasta 15 MB.
            </p>
          </div>

          {savedSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
              <span>Configuración guardada correctamente.</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            {apiKeyInput ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-red-500 hover:text-red-700 font-medium"
              >
                Eliminar clave
              </button>
            ) : <span />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary text-xs py-2 px-3"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary text-xs py-2 px-4 shadow-soft"
              >
                Guardar Clave
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
