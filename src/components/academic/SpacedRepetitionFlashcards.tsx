/**
 * @file SpacedRepetitionFlashcards.tsx
 * @description Generador y Gestor de Tarjetas Mnemotécnicas de Repetición Espaciada
 * con implementación matemática determinista del algoritmo SM-2 (SuperMemo-2).
 * Calcula factores de facilidad (EF >= 1.3), intervalos de repaso en días (1, 6, I*EF)
 * y cuenta con banco precargado de fórmulas, reglas gramaticales y mnemotécnias clave.
 * Función 133 del catálogo académico.
 */

import React, { useState, useMemo } from 'react';
import { Layers, ChevronRight, Sparkles, Clock, Calendar } from 'lucide-react';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: 'Gramática & Morfosintaxis' | 'Fórmulas Físicas & Matemáticas' | 'Química & Biología';
  mnemonicTip?: string;
  repetitions: number;
  intervalDays: number;
  easeFactor: number; // Factor de facilidad inicial 2.5 (SM-2 estándar)
  nextReviewDate: string; // ISO date string
}

const DEFAULT_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    front: '¿Cuál es la regla para identificar el Complemento Directo (CD)?',
    back: 'Preguntar "¿Qué + verbo?" o sustituir por pronombres "lo, la, los, las". Además, al transformar la oración a voz pasiva, el CD se convierte en el Sujeto Paciente.',
    category: 'Gramática & Morfosintaxis',
    mnemonicTip: 'Mnemotecnia Lo-La-Los-Las: Si lo puedes reemplazar por "Lo vi" o "La leí", es CD sin dudar.',
    repetitions: 0,
    intervalDays: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString()
  },
  {
    id: 'fc-2',
    front: '¿Cómo se diferencia un Modificador Directo (MD) de uno Indirecto (MI) en el sujeto?',
    back: 'El MD se une directamente al núcleo sin enlaces (artículos y adjetivos). El MI siempre requiere un nexo preposicional o enlace subordinante ("de", "con", "sin", "para").',
    category: 'Gramática & Morfosintaxis',
    mnemonicTip: 'MI = M-edio preposIcional ("de madera", "con hielo").',
    repetitions: 0,
    intervalDays: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString()
  },
  {
    id: 'fc-3',
    front: '¿Qué es el producto cruz (o vectorial) entre dos vectores u × v en ℝ³?',
    back: 'Un vector perpendicular a ambos vectores cuyo módulo es ||u||·||v||·sen(θ) y cuya dirección sigue la regla de la mano derecha. Su producto es nulo si los vectores son paralelos.',
    category: 'Fórmulas Físicas & Matemáticas',
    mnemonicTip: 'Mano derecha: índice en u, medio en v, pulgar apunta hacia el producto cruz u × v.',
    repetitions: 0,
    intervalDays: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString()
  },
  {
    id: 'fc-4',
    front: '¿Cómo calcular el pOH a partir del pH a 25°C?',
    back: 'pH + pOH = 14 (constante del producto iónico del agua, Kw = 1.0 × 10⁻¹⁴). Por tanto: pOH = 14 - pH.',
    category: 'Química & Biología',
    mnemonicTip: 'Regla de la suma 14: si el ácido clorhídrico tiene pH 2, su pOH es 12.',
    repetitions: 0,
    intervalDays: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString()
  }
];

export const SpacedRepetitionFlashcards: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>(DEFAULT_FLASHCARDS);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const filteredCards = useMemo(() => {
    if (filterCategory === 'ALL') return cards;
    return cards.filter((c) => c.category === filterCategory);
  }, [cards, filterCategory]);

  const activeCard = filteredCards[currentIdx] || filteredCards[0];

  /**
   * Algoritmo SM-2 (SuperMemo 2):
   * Quality (q): de 0 a 5
   * 5: Respuesta perfecta y sin esfuerzo
   * 3: Respuesta correcta con dificultad
   * 1: Olvido total
   *
   * EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
   * Si EF' < 1.3 -> EF' = 1.3
   *
   * Intervalos:
   * Repetición 1: 1 día
   * Repetición 2: 6 días
   * Repetición n: I(n-1) * EF
   */
  const handleScoreCard = (quality: number) => {
    if (!activeCard) return;

    let newRepetitions = activeCard.repetitions;
    let newInterval = activeCard.intervalDays;
    let newEF = activeCard.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (newEF < 1.3) newEF = 1.3;

    if (quality < 3) {
      // Falla o respuesta incorrecta: reiniciar a repetición 0 e intervalo de 1 día
      newRepetitions = 0;
      newInterval = 1;
    } else {
      // Éxito: avanzar según SM-2
      if (newRepetitions === 0) {
        newInterval = 1;
      } else if (newRepetitions === 1) {
        newInterval = 6;
      } else {
        newInterval = Math.round(activeCard.intervalDays * newEF);
      }
      newRepetitions += 1;
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + newInterval);

    // Actualizar la tarjeta en el estado
    setCards((prev) =>
      prev.map((c) =>
        c.id === activeCard.id
          ? {
              ...c,
              repetitions: newRepetitions,
              intervalDays: newInterval,
              easeFactor: Number(newEF.toFixed(2)),
              nextReviewDate: nextDate.toISOString()
            }
          : c
      )
    );

    // Pasar a la siguiente tarjeta
    setIsFlipped(false);
    if (currentIdx < filteredCards.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100/60 shadow-xs">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 tracking-tight">
              Tarjetas Mnemotécnicas de Repetición Espaciada (SM-2)
            </h3>
            <p className="text-xs text-slate-500">
              Memorización científica a largo plazo mediante intervalos calculados según el algoritmo SuperMemo-2
            </p>
          </div>
        </div>

        {/* Filtro de Materia */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
          {(['ALL', 'Gramática & Morfosintaxis', 'Fórmulas Físicas & Matemáticas', 'Química & Biología'] as const).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilterCategory(cat);
                  setCurrentIdx(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all whitespace-nowrap ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs font-semibold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat === 'ALL' ? 'Todas' : cat.split(' ')[0]}
              </button>
            )
          )}
        </div>
      </div>

      {activeCard ? (
        <div className="space-y-6">
          {/* Tarjeta Giratoria / Interactiva */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[220px] p-6 rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
          >
            {/* Cabecera de la tarjeta */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                {activeCard.category}
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Intervalo: {activeCard.intervalDays}d</span>
                <span className="text-slate-300">•</span>
                <span>EF: {activeCard.easeFactor}</span>
              </div>
            </div>

            {/* Contenido Central (Frente o Reverso) */}
            <div className="py-6 text-center">
              {!isFlipped ? (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider block">
                    Pregunta / Enunciado
                  </span>
                  <p className="text-base sm:text-lg font-bold text-slate-800 max-w-lg mx-auto">
                    {activeCard.front}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider block">
                    Respuesta & Explicación
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-lg mx-auto font-medium">
                    {activeCard.back}
                  </p>
                  {activeCard.mnemonicTip && (
                    <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200/60 max-w-md mx-auto text-[11px] text-amber-800 flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{activeCard.mnemonicTip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Pie de la tarjeta */}
            <div className="text-center text-[11px] text-slate-400 font-medium">
              {!isFlipped ? 'Haz clic para voltear y ver la solución' : 'Haz clic para ocultar'}
            </div>
          </div>

          {/* Botones de Calificación SM-2 (Solo si se volteó la tarjeta) */}
          {isFlipped ? (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3 animate-in fade-in duration-200">
              <span className="text-xs font-semibold text-slate-700 block text-center">
                ¿Qué tan fácil te resultó recordar la respuesta? (Algoritmo SM-2):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleScoreCard(1)}
                  className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl border border-rose-200 text-xs font-semibold transition-all flex flex-col items-center"
                >
                  <span>1 - No la sabía</span>
                  <span className="text-[10px] text-rose-600 font-normal mt-0.5">Repasar hoy (1d)</span>
                </button>
                <button
                  onClick={() => handleScoreCard(3)}
                  className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl border border-amber-200 text-xs font-semibold transition-all flex flex-col items-center"
                >
                  <span>3 - Difícil</span>
                  <span className="text-[10px] text-amber-600 font-normal mt-0.5">Con esfuerzo</span>
                </button>
                <button
                  onClick={() => handleScoreCard(4)}
                  className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-xl border border-blue-200 text-xs font-semibold transition-all flex flex-col items-center"
                >
                  <span>4 - Buena</span>
                  <span className="text-[10px] text-blue-600 font-normal mt-0.5">Recuerdo claro</span>
                </button>
                <button
                  onClick={() => handleScoreCard(5)}
                  className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-semibold transition-all flex flex-col items-center"
                >
                  <span>5 - Perfecta</span>
                  <span className="text-[10px] text-emerald-600 font-normal mt-0.5">Instantáneo</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Tarjeta {currentIdx + 1} de {filteredCards.length}</span>
              <button
                onClick={() => {
                  setIsFlipped(false);
                  setCurrentIdx((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
                }}
                className="hover:text-slate-800 flex items-center gap-1"
              >
                <span>Saltar a la siguiente</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Tabla de Repasos Próximos */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              Estado de tu Mazo de Estudio ({cards.length} tarjetas):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {cards.map((c) => (
                <div key={c.id} className="p-2.5 bg-slate-50/70 rounded-xl border border-slate-200/70 flex items-center justify-between">
                  <span className="truncate pr-2 font-medium text-slate-700 max-w-[200px]">
                    {c.front}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-blue-600 shrink-0">
                    Repaso en {c.intervalDays}d (EF {c.easeFactor})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
