/**
 * @file AudioGuidePlayer.tsx
 * @description Reproductor de Audio-Guía Pedagógica con Síntesis de Voz Neural Natural.
 *
 * Características avanzadas:
 * 1. Selección inteligente y priorización de voces Neurales / Naturales (Microsoft Online Natural, Google Neural).
 * 2. Traductor fonético matemático: convierte fórmulas LaTeX, potencias y fracciones a lenguaje hablado natural.
 * 3. Segmentación oracional (chunking): pausas y respiración humana, evitando el corte a los 15s de Chromium.
 * 4. Selector de voces naturales y velocidad adaptable.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PlayIcon, PauseIcon, RotateCcwIcon } from '../common/Icons';

interface AudioGuidePlayerProps {
  guideTitle: string;
  guideText: string;
}

interface RankedVoice {
  voice: SpeechSynthesisVoice;
  displayName: string;
  isNatural: boolean;
  score: number;
}

/**
 * Convierte fórmulas matemáticas, símbolos de LaTeX y abreviaturas
 * a una pronunciación natural y didáctica en español hablado.
 */
function cleanTextForSpeech(raw: string): string {
  if (!raw) return '';

  let t = raw;

  // 1. Limpieza de bloques de código y markdown estructural
  t = t.replace(/```[a-z]*\n([\s\S]*?)```/gi, ' Bloque técnico: $1. ');
  t = t.replace(/`([^`]+)`/g, '$1');
  t = t.replace(/^#+\s+/gm, '');
  t = t.replace(/\*\*([^*]+)\*\*/g, '$1');
  t = t.replace(/\*([^*]+)\*/g, '$1');
  t = t.replace(/^[•\-*]\s+/gm, 'Punto: ');
  t = t.replace(/^>\s+/gm, 'Atención: ');

  // 2. Abreviaturas comunes
  t = t.replace(/\bm\.c\.m\./gi, 'mínimo común múltiplo');
  t = t.replace(/\bM\.C\.D\./gi, 'máximo común divisor');
  t = t.replace(/\bej(?:\.|emplo)[:\s]*/gi, 'Por ejemplo, ');

  // 3. Conjuntos numéricos
  t = t.replace(/\\mathbb\{Z\}|ℤ/g, 'números enteros');
  t = t.replace(/\\mathbb\{R\}|ℝ/g, 'números reales');
  t = t.replace(/\\mathbb\{N\}|ℕ/g, 'números naturales');
  t = t.replace(/\\mathbb\{Q\}|ℚ/g, 'números racionales');

  // 4. Fracciones LaTeX: \frac{A}{B} -> "A sobre B"
  t = t.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, 'fracción $1 sobre $2');

  // 5. Potencias con paréntesis o bases negativas: (-3)^2 -> "menos tres al cuadrado"
  t = t.replace(/\((-?\d+)\)\^2/g, '$1 al cuadrado');
  t = t.replace(/\((-?\d+)\)\^3/g, '$1 al cubo');
  t = t.replace(/\((-?\d+)\)\^(\d+)/g, '$1 elevado a la $2');
  t = t.replace(/([a-zA-Z\d]+)\^2\b/g, '$1 al cuadrado');
  t = t.replace(/([a-zA-Z\d]+)\^3\b/g, '$1 al cubo');
  t = t.replace(/([a-zA-Z\d]+)\^\{([^}]+)\}/g, '$1 elevado a la $2');
  t = t.replace(/([a-zA-Z\d]+)\^([a-zA-Z\d]+)/g, '$1 elevado a la $2');

  // 6. Multiplicación y puntos: \cdot -> "por"
  t = t.replace(/\\cdot|\s*·\s*/g, ' por ');
  t = t.replace(/\\times/g, ' por ');

  // 7. Puntos suspensivos en series matemáticas: \dots -> "y así sucesivamente"
  t = t.replace(/\\dots|\.{3,}|…/g, ' y así sucesivamente ');

  // 8. Relaciones y comparaciones
  t = t.replace(/\\approx/g, ' aproximadamente igual a ');
  t = t.replace(/\\neq/g, ' no es igual a ');
  t = t.replace(/\\leq|\\le/g, ' menor o igual que ');
  t = t.replace(/\\geq|\\ge/g, ' mayor o igual que ');
  t = t.replace(/\\in\b/g, ' pertenece a ');
  t = t.replace(/\\to|\\rightarrow/g, ' tiende a ');

  // 9. Funciones y derivadas
  t = t.replace(/\\vec\{([^}]+)\}/g, 'vector $1');
  t = t.replace(/\\sqrt\{([^}]+)\}/g, 'raíz cuadrada de $1');
  t = t.replace(/\\int/g, 'la integral de ');
  t = t.replace(/\\sum/g, 'la sumatoria de ');
  t = t.replace(/\\partial/g, 'la derivada parcial de ');

  // 10. Limpieza de delimitadores de LaTeX restantes
  t = t.replace(/\$\$([\s\S]*?)\$\$/g, '$1');
  t = t.replace(/\$([^$]+)\$/g, '$1');
  t = t.replace(/\\quad/g, ' ');
  t = t.replace(/\\text\{([^}]+)\}/g, '$1');
  t = t.replace(/\\mathrm\{([^}]+)\}/g, '$1');

  // 11. Normalización de espacios y saltos de línea
  t = t.replace(/[\n\r]+/g, '. ');
  t = t.replace(/\s{2,}/g, ' ');

  return t.trim();
}

/**
 * Divide el texto en oraciones con longitud controlada para garantizar
 * pausas naturales y evitar el timeout de 15 segundos en Web Speech.
 */
function splitIntoSentences(text: string): string[] {
  const rawSentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const chunks: string[] = [];
  for (const s of rawSentences) {
    if (s.length > 200) {
      // Subdividir oraciones muy largas por comas o punto y coma
      const sub = s.split(/(?<=[,;])\s+/);
      chunks.push(...sub.filter((x) => x.trim().length > 0));
    } else {
      chunks.push(s);
    }
  }
  return chunks;
}

export const AudioGuidePlayer: React.FC<AudioGuidePlayerProps> = ({
  guideTitle,
  guideText,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(0.98); // Cadencia pedagógica humana
  const [voices, setVoices] = useState<RankedVoice[]>([]);
  const [selectedVoiceUri, setSelectedVoiceUri] = useState<string>('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [totalSentences, setTotalSentences] = useState(0);
  const [isSupported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window);

  const sentencesRef = useRef<string[]>([]);
  const currentIndexRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const pauseTimeoutRef = useRef<number | null>(null);

  // Carga y clasificación de voces naturales en español
  const loadVoices = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const allVoices = window.speechSynthesis.getVoices();
    const spanishVoices = allVoices.filter(
      (v) => v.lang.toLowerCase().startsWith('es') || v.lang.toLowerCase().includes('es-')
    );

    const ranked: RankedVoice[] = spanishVoices.map((v) => {
      const nameLower = v.name.toLowerCase();
      let score = 0;
      let isNatural = false;

      // Voces neurales / naturales de Microsoft, Google, Apple o Amazon
      if (nameLower.includes('natural') || nameLower.includes('neural') || nameLower.includes('online')) {
        score += 100;
        isNatural = true;
      }
      if (nameLower.includes('google')) {
        score += 80;
        isNatural = true;
      }
      if (nameLower.includes('sabina') || nameLower.includes('alvaro') || nameLower.includes('dalia') || nameLower.includes('jorge')) {
        score += 50;
      }
      if (v.lang.toLowerCase().includes('es-mx') || v.lang.toLowerCase().includes('es-es') || v.lang.toLowerCase().includes('es-419')) {
        score += 20;
      }

      // Nombre legible para la interfaz
      let cleanName = v.name
        .replace(/Microsoft\s*/i, '')
        .replace(/Online\s*\(Natural\)\s*-\s*/i, 'Natural · ')
        .replace(/Spanish\s*\(/i, '')
        .replace(/\)/g, '')
        .trim();

      if (isNatural) {
        cleanName = `✨ ${cleanName}`;
      }

      return {
        voice: v,
        displayName: cleanName,
        isNatural,
        score,
      };
    });

    ranked.sort((a, b) => b.score - a.score);

    setVoices(ranked);

    if (ranked.length > 0 && !selectedVoiceUri) {
      // Seleccionar automáticamente la voz con mayor ranking (la más humana y natural)
      setSelectedVoiceUri(ranked[0].voice.voiceURI);
    }
  }, [selectedVoiceUri]);

  useEffect(() => {
    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [loadVoices]);

  if (!isSupported) return null;

  // Detener la reproducción
  const handleStop = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    isPlayingRef.current = false;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentSentenceIndex(0);
    currentIndexRef.current = 0;
  };

  // Reproducción secuencial de oraciones con pausas de respiración humana
  const speakSentence = (index: number) => {
    if (!isPlayingRef.current) return;
    const sentences = sentencesRef.current;

    if (index >= sentences.length) {
      handleStop();
      return;
    }

    currentIndexRef.current = index;
    setCurrentSentenceIndex(index);

    const sentence = sentences[index];
    const utterance = new SpeechSynthesisUtterance(sentence);

    // Asignar voz natural elegida
    const selected = voices.find((v) => v.voice.voiceURI === selectedVoiceUri);
    if (selected) {
      utterance.voice = selected.voice;
      utterance.lang = selected.voice.lang;
    } else {
      utterance.lang = 'es-ES';
    }

    utterance.rate = rate;
    utterance.pitch = 1.0; // Tono natural y cálido

    utterance.onend = () => {
      if (!isPlayingRef.current) return;
      // Pausa orgánica de 180ms entre oraciones para que respire
      pauseTimeoutRef.current = window.setTimeout(() => {
        speakSentence(index + 1);
      }, 180);
    };

    utterance.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      if (isPlayingRef.current && index < sentences.length - 1) {
        speakSentence(index + 1);
      } else {
        handleStop();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      isPlayingRef.current = true;
      return;
    }

    handleStop();

    // Procesar y segmentar el texto
    const spokenContent = `Guía de estudio: ${guideTitle}. ${cleanTextForSpeech(guideText)}`;
    const chunks = splitIntoSentences(spokenContent);
    sentencesRef.current = chunks;
    setTotalSentences(chunks.length);
    currentIndexRef.current = 0;
    isPlayingRef.current = true;
    setIsPlaying(true);
    setIsPaused(false);

    speakSentence(0);
  };

  const handlePause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
      isPlayingRef.current = false;
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    }
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (isPlayingRef.current) {
      const resumeIndex = currentIndexRef.current;
      handleStop();
      setTimeout(() => {
        sentencesRef.current = splitIntoSentences(
          `Guía de estudio: ${guideTitle}. ${cleanTextForSpeech(guideText)}`
        );
        isPlayingRef.current = true;
        setIsPlaying(true);
        speakSentence(resumeIndex);
      }, 120);
    }
  };

  const handleVoiceChange = (uri: string) => {
    setSelectedVoiceUri(uri);
    if (isPlayingRef.current) {
      const resumeIndex = currentIndexRef.current;
      handleStop();
      setTimeout(() => {
        sentencesRef.current = splitIntoSentences(
          `Guía de estudio: ${guideTitle}. ${cleanTextForSpeech(guideText)}`
        );
        isPlayingRef.current = true;
        setIsPlaying(true);
        speakSentence(resumeIndex);
      }, 120);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 bg-white dark:bg-slate-900 px-3.5 py-2.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft-sm transition-all">
      {/* Icono e Indicador de Voz Neural */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-[#0F52BA] dark:text-blue-400 flex items-center justify-center text-sm font-bold shrink-0 border border-blue-200/60 dark:border-blue-900/50">
          🎙️
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-800 dark:text-white block leading-none font-sans">
              Audio-Guía Neural
            </span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
              Voz Natural
            </span>
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-400 font-medium">
            {totalSentences > 0 && isPlaying
              ? `Leyendo ${currentSentenceIndex + 1} de ${totalSentences} secciones`
              : 'Pronunciación matemática y fonética fluida'}
          </span>
        </div>
      </div>

      {/* Ondas Sonoras Animadas cuando está reproduciendo */}
      {isPlaying && (
        <div className="hidden md:flex items-end gap-0.5 h-4 px-1" title="Reproduciendo en voz alta">
          <div className="w-1 bg-blue-500 rounded-full animate-bounce h-3" />
          <div className="w-1 bg-blue-400 rounded-full animate-bounce h-4" />
          <div className="w-1 bg-blue-600 rounded-full animate-bounce h-2" />
        </div>
      )}

      {/* Controles de Reproducción y Selección */}
      <div className="flex items-center gap-1.5 ml-auto flex-wrap">
        {/* Selector de Voz Neural */}
        {voices.length > 0 && (
          <select
            value={selectedVoiceUri}
            onChange={(e) => handleVoiceChange(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-semibold text-slate-700 dark:text-slate-200 focus:outline-none max-w-[130px] sm:max-w-[170px] truncate"
            title="Seleccionar voz del lector"
          >
            {voices.map((v) => (
              <option key={v.voice.voiceURI} value={v.voice.voiceURI}>
                {v.displayName}
              </option>
            ))}
          </select>
        )}

        {/* Botón Play / Pausa */}
        {isPlaying ? (
          <button
            onClick={handlePause}
            className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center hover:bg-black dark:hover:bg-slate-600 transition-all shadow-soft-xs"
            title="Pausar audio"
          >
            <PauseIcon className="w-4 h-4 text-white" />
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="w-8 h-8 rounded-xl bg-[#0F52BA] text-white flex items-center justify-center hover:bg-[#0d459d] transition-all shadow-soft-sm active:scale-95"
            title="Escuchar guía con voz natural"
          >
            <PlayIcon className="w-4 h-4 text-white" />
          </button>
        )}

        {/* Botón Detener / Reiniciar */}
        {(isPlaying || isPaused) && (
          <button
            onClick={handleStop}
            className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            title="Detener lectura"
          >
            <RotateCcwIcon className="w-4 h-4" />
          </button>
        )}

        {/* Selector de Velocidad */}
        <select
          value={rate}
          onChange={(e) => handleRateChange(parseFloat(e.target.value))}
          className="px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-bold text-slate-700 dark:text-slate-300 font-mono focus:outline-none"
          title="Velocidad de reproducción"
        >
          <option value={0.85}>0.85x</option>
          <option value={0.98}>1.0x</option>
          <option value={1.15}>1.15x</option>
          <option value={1.3}>1.3x</option>
        </select>
      </div>
    </div>
  );
};
