import React, { useState, useEffect, useRef } from 'react';
import {
  Shuffle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Brain
} from 'lucide-react';

export interface FlashcardItem {
  front: string;
  back: string;
}

export interface EnhancedFlashcardDeckProps {
  flashcards: FlashcardItem[];
  renderLatex?: (text: string) => string;
  className?: string;
}

type CardMastery = 'unrated' | 'hard' | 'medium' | 'easy';

export const EnhancedFlashcardDeck: React.FC<EnhancedFlashcardDeckProps> = ({
  flashcards,
  renderLatex = (t) => t,
  className = '',
}) => {
  const [deck, setDeck] = useState<FlashcardItem[]>(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [ratings, setRatings] = useState<Record<number, CardMastery>>({});

  const prevFlashcardsRef = useRef(flashcards);
  useEffect(() => {
    if (prevFlashcardsRef.current !== flashcards) {
      prevFlashcardsRef.current = flashcards;
      setDeck(flashcards);
      setCurrentIndex(0);
      setIsFlipped(false);
      setRatings({});
    }
  }, [flashcards]);

  if (!deck || deck.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
        No hay tarjetas mnemotécnicas disponibles para esta guía.
      </div>
    );
  }

  const currentCard = deck[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => Math.min(deck.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleRate = (mastery: CardMastery) => {
    setRatings((prev) => ({
      ...prev,
      [currentIndex]: mastery,
    }));
    // Avanzar automáticamente tras calificar
    if (currentIndex < deck.length - 1) {
      setTimeout(() => {
        handleNext();
      }, 250);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const ratedCount = Object.keys(ratings).length;
  const easyCount = Object.values(ratings).filter((r) => r === 'easy').length;
  const masteryPercent = deck.length > 0 ? Math.round((easyCount / deck.length) * 100) : 0;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 1. BARRA SUPERIOR DE PROGRESO LEITNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/90">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0F52BA] flex items-center justify-center font-bold text-sm">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 font-sans block">
              Sistema Leitner: Evocación Activa (Active Recall)
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Tarjeta {currentIndex + 1} de {deck.length} • {ratedCount} evaluadas
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-[#0F52BA] font-mono block">
              {masteryPercent}% Dominado
            </span>
            <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-[#0F52BA] transition-all duration-300 rounded-full"
                style={{ width: `${masteryPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleShuffle}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-200/70 transition-colors"
            title="Mezclar tarjetas aleatoriamente"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. TARJETA FLIP 3D */}
      <div
        onClick={handleFlip}
        className={`min-h-[220px] p-7 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-soft select-none transform hover:-translate-y-0.5 ${
          isFlipped
            ? 'bg-slate-900 text-white border-slate-800 shadow-xl'
            : 'bg-white text-slate-900 border-slate-200 hover:border-blue-400'
        }`}
      >
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span
            className={`font-bold flex items-center gap-1.5 ${
              isFlipped ? 'text-sky-400' : 'text-[#0F52BA]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isFlipped ? '✦ RESPUESTA / SÍNTESIS CONCEPTUAL' : '❓ PREGUNTA DE EVOCACIÓN ACTIVA'}
          </span>
          <span className="text-slate-400">
            {isFlipped ? 'Toca para ver pregunta' : 'Toca para revelar respuesta'}
          </span>
        </div>

        <div className="py-6 text-center max-w-xl mx-auto">
          <p
            className={`text-base sm:text-lg font-medium leading-relaxed font-sans ${
              isFlipped ? 'text-slate-100 font-semibold' : 'text-slate-800'
            }`}
            dangerouslySetInnerHTML={{
              __html: renderLatex(isFlipped ? currentCard.back : currentCard.front),
            }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-100/10">
          <span>{isFlipped ? '✓ Respuesta verificada' : '⟳ Haz clic en la tarjeta para voltear'}</span>
          <span className="capitalize text-slate-400">
            {ratings[currentIndex] ? `Evaluación: ${ratings[currentIndex]}` : 'Sin calificar'}
          </span>
        </div>
      </div>

      {/* 3. CALIFICACIÓN ESPACIADA LEITNER (DIFÍCIL, MEDIO, FÁCIL) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Anterior
          </button>

          <button
            onClick={handleFlip}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 text-[#0F52BA] hover:bg-blue-100 border border-blue-200 transition-colors flex-1 sm:flex-none text-center"
          >
            {isFlipped ? 'Ver Pregunta' : 'Girar Tarjeta'}
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= deck.length - 1}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 transition-colors flex items-center gap-1"
          >
            Siguiente
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Botones de Autoevaluación Rápida */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            Autoevaluación:
          </span>
          <button
            onClick={() => handleRate('hard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              ratings[currentIndex] === 'hard'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            🔴 Difícil
          </button>

          <button
            onClick={() => handleRate('medium')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              ratings[currentIndex] === 'medium'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            🟡 Medio
          </button>

          <button
            onClick={() => handleRate('easy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              ratings[currentIndex] === 'easy'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            🟢 Dominado
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFlashcardDeck;
