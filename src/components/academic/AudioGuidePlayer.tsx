import React, { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon, RotateCcwIcon } from '../common/Icons';

interface AudioGuidePlayerProps {
  guideTitle: string;
  guideText: string;
}

/**
 * Limpia y normaliza el texto de estudio y fórmulas LaTeX para una locución pedagógica clara
 */
function cleanTextForSpeech(raw: string): string {
  return raw
    .replace(/\$\$(.*?)\$\$/gs, ' Fórmula matemática: $1. ')
    .replace(/\$(.*?)\$/g, ' $1 ')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 sobre $2')
    .replace(/\\vec\{([^}]+)\}/g, 'vector $1')
    .replace(/\\int/g, 'integral de')
    .replace(/\\sum/g, 'sumatoria de')
    .replace(/\\partial/g, 'derivada parcial de')
    .replace(/\\times/g, 'por')
    .replace(/\\approx/g, 'aproximadamente igual a')
    .replace(/```[a-z]*\n([\s\S]*?)```/gi, ' Bloque de código: $1. ')
    .replace(/[#*_~`]/g, '')
    .replace(/\n+/g, '. ')
    .trim();
}

/**
 * Reproductor de Audio-Guía (Text-to-Speech Integrado)
 * 
 * Permite al estudiante escuchar en voz alta la teoría, conceptos del glosario
 * y deducciones mientras viaja o descansa la vista.
 */
export const AudioGuidePlayer: React.FC<AudioGuidePlayerProps> = ({
  guideTitle,
  guideText,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(1.0);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isSupported) return null;

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const spokenText = `Guía de estudio: ${guideTitle}. ${cleanTextForSpeech(guideText)}`;
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'es-ES';
    utterance.rate = rate;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (isPlaying) {
      // Reiniciar con la nueva velocidad
      handleStop();
      setTimeout(handlePlay, 100);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200/90 shadow-soft-sm">
      {/* Icono e Indicador de Onda Sonora */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-sm font-bold shrink-0">
          🎙️
        </div>
        <div className="hidden sm:block">
          <span className="text-xs font-bold text-slate-800 block leading-none">
            Modo Audio-Guía
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Síntesis de voz en español</span>
        </div>
      </div>

      {/* Ondas Sonoras Animadas cuando está reproduciendo */}
      {isPlaying && (
        <div className="flex items-end gap-0.5 h-4 px-1">
          <div className="w-1 bg-purple-500 rounded-full animate-bounce h-3" />
          <div className="w-1 bg-purple-400 rounded-full animate-bounce h-4" />
          <div className="w-1 bg-purple-600 rounded-full animate-bounce h-2" />
        </div>
      )}

      {/* Controles de Reproducción */}
      <div className="flex items-center gap-1.5 ml-auto">
        {isPlaying ? (
          <button
            onClick={handlePause}
            className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-all"
            title="Pausar audio"
          >
            <PauseIcon className="w-4 h-4 text-white" />
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="w-8 h-8 rounded-xl bg-[#0F52BA] text-white flex items-center justify-center hover:bg-[#0d459d] transition-all shadow-soft-sm"
            title="Escuchar guía en voz alta"
          >
            <PlayIcon className="w-4 h-4 text-white" />
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button
            onClick={handleStop}
            className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-all"
            title="Detener lectura"
          >
            <RotateCcwIcon className="w-4 h-4 text-slate-600" />
          </button>
        )}

        {/* Selector de Velocidad */}
        <select
          value={rate}
          onChange={(e) => handleRateChange(parseFloat(e.target.value))}
          className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 font-mono focus:outline-none"
          title="Velocidad de reproducción"
        >
          <option value={0.8}>0.8x</option>
          <option value={1.0}>1.0x</option>
          <option value={1.25}>1.25x</option>
          <option value={1.5}>1.5x</option>
        </select>
      </div>
    </div>
  );
};
