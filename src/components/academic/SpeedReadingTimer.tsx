/**
 * @file SpeedReadingTimer.tsx
 * @description Cronómetro de Lectura Rápida con cálculo determinista de Palabras por Minuto (PPM),
 * índice de velocidad efectiva y test inmediato de retención conceptual.
 * Función 134 del catálogo académico humanístico.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Timer, Play, Pause, RotateCcw, CheckCircle2, Zap, Gauge, Award } from 'lucide-react';

interface SpeedText {
  id: string;
  title: string;
  level: 'Media (Estándar)' | 'Avanzada (Técnica)';
  content: string;
  wordCount: number;
  retentionQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
}

const SPEED_TEXTS: SpeedText[] = [
  {
    id: 'st-1',
    title: 'La invención de la imprenta y la democratización del saber',
    level: 'Media (Estándar)',
    wordCount: 180,
    content: `Antes de la imprenta de tipos móviles desarrollada por Johannes Gutenberg hacia 1440 en Maguncia, la difusión del conocimiento en Europa dependía exclusivamente de los copistas monásticos. La producción manual de un solo códice requería meses o años de labor minuciosa sobre pergaminos costosos, lo que restringía el acceso a los textos a una élite clerical y nobiliaria sumamente reducida. La mecanización del proceso redujo drásticamente el costo unitario de los libros e impulsó de forma exponencial las tasas de alfabetización. Las ideas científicas, políticas y teológicas que antes tardaban décadas en propagarse comenzaron a viajar a una velocidad sin precedentes. Este salto técnico no solo aceleró el Renacimiento y la Reforma protestante, sino que sentó las bases de la esfera pública moderna, permitiendo que la crítica y el debate ciudadano desafiaran por primera vez los monopolios doctrinales consolidados durante siglos.`,
    retentionQuestions: [
      {
        question: '¿En qué ciudad alemana desarrolló Gutenberg los tipos móviles?',
        options: ['Berlín', 'Maguncia', 'Múnich', 'Colonia'],
        correctIndex: 1
      },
      {
        question: '¿Qué consecuencia social clave produjo la reducción del costo de los libros?',
        options: [
          'La desaparición inmediata de todas las universidades medievales.',
          'El incremento exponencial de las tasas de alfabetización y el debate ciudadano.',
          'El monopolio estatal sobre la producción de papel.',
          'La prohibición definitiva de la traducción bíblica.'
        ],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'st-2',
    title: 'Plasticidad neuronal y consolidación de la memoria durante el sueño',
    level: 'Avanzada (Técnica)',
    wordCount: 165,
    content: `La neurobiología moderna ha desmentido la vieja hipótesis de que el cerebro humano adulto es un órgano biológicamente estático y fijado tras la infancia. A través de los mecanismos de plasticidad sináptica y potenciación a largo plazo, las redes neuronales remodelan continuamente su fuerza de interconexión en respuesta al aprendizaje. En este proceso dinámico, el sueño profundo no representa una simple desconexión pasiva del organismo, sino una fase crítica de reorganización y transferencia de información. Durante las oscilaciones lentas del sueño no REM, los engramas de memoria recién adquiridos en el hipocampo son reactivados sistemáticamente y transferidos hacia la corteza cerebral para su almacenamiento a largo plazo. Al mismo tiempo, se produce una poda sináptica selectiva que elimina el ruido irrelevante acumulado durante la vigilia, optimizando la capacidad del cerebro para asimilar nueva información.`,
    retentionQuestions: [
      {
        question: '¿Qué estructura cerebral transfiere los engramas hacia la corteza durante el sueño profundo?',
        options: ['El cerebelo', 'El hipocampo', 'La médula espinal', 'El bulbo olfatorio'],
        correctIndex: 1
      },
      {
        question: '¿Cuál es la función de la poda sináptica que ocurre durante el descanso?',
        options: [
          'Eliminar ruido irrelevante para optimizar el nuevo aprendizaje.',
          'Detener totalmente la producción de neurotransmisores.',
          'Reemplazar neuronas adultas por células madre.',
          'Impedir la formación de nuevas conexiones durante el día.'
        ],
        correctIndex: 0
      }
    ]
  }
];

export const SpeedReadingTimer: React.FC = () => {
  const [selectedTextId, setSelectedTextId] = useState<string>('st-1');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [hasFinishedReading, setHasFinishedReading] = useState<boolean>(false);
  const [retentionAnswers, setRetentionAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);

  const activeText = useMemo(() => {
    return SPEED_TEXTS.find((t) => t.id === selectedTextId) || SPEED_TEXTS[0];
  }, [selectedTextId]);

  // Manejo del cronómetro
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleFinishReading = () => {
    setIsRunning(false);
    setHasFinishedReading(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
    setHasFinishedReading(false);
    setRetentionAnswers({});
    setShowResults(false);
  };

  // Cálculos matemáticos
  const wpm = useMemo(() => {
    if (elapsedSeconds <= 0) return 0;
    const minutes = elapsedSeconds / 60;
    return Math.round(activeText.wordCount / minutes);
  }, [elapsedSeconds, activeText.wordCount]);

  // Evaluación de retención
  const retentionScore = useMemo(() => {
    let correct = 0;
    activeText.retentionQuestions.forEach((q, i) => {
      if (retentionAnswers[i] === q.correctIndex) correct++;
    });
    return {
      correct,
      total: activeText.retentionQuestions.length,
      pct: Math.round((correct / activeText.retentionQuestions.length) * 100)
    };
  }, [retentionAnswers, activeText]);

  // Velocidad Efectiva (WPM * Retención)
  const effectiveWpm = useMemo(() => {
    return Math.round(wpm * (retentionScore.pct / 100));
  }, [wpm, retentionScore.pct]);

  // Formato mm:ss
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100/60 shadow-xs">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 tracking-tight">
              Cronómetro de Lectura Rápida & Test de Retención
            </h3>
            <p className="text-xs text-slate-500">
              Mide tu velocidad en Palabras por Minuto (PPM) y valida tu comprensión lectora inmediata
            </p>
          </div>
        </div>

        {/* Selector de Texto */}
        <div className="flex items-center gap-2">
          {SPEED_TEXTS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTextId(t.id);
                handleReset();
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                selectedTextId === t.id
                  ? 'bg-emerald-100/70 text-emerald-900 border-emerald-300 font-semibold shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t.level}
            </button>
          ))}
        </div>
      </div>

      {/* Barra de Control del Cronómetro */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-2xl font-bold text-slate-900">
            <Timer className="w-6 h-6 text-emerald-600" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            ({activeText.wordCount} palabras a leer)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!hasFinishedReading ? (
            <>
              {!isRunning ? (
                <button
                  onClick={handleStart}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{elapsedSeconds > 0 ? 'Reanudar' : 'Iniciar Lectura'}</span>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-semibold hover:bg-amber-600 transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pausar</span>
                </button>
              )}

              <button
                disabled={elapsedSeconds === 0}
                onClick={handleFinishReading}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>He Terminado de Leer</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-all flex items-center gap-1.5 border border-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Prueba</span>
            </button>
          )}
        </div>
      </div>

      {/* Texto de Lectura (Visible mientras se lee o antes de finalizar) */}
      {!hasFinishedReading ? (
        <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/50">
            <h4 className="text-sm font-bold text-slate-900 font-display">
              {activeText.title}
            </h4>
            <span className="text-[11px] font-mono text-slate-400">
              {activeText.wordCount} palabras
            </span>
          </div>

          <p className={`text-sm leading-relaxed text-slate-700 font-serif text-justify transition-all select-none ${
            !isRunning && elapsedSeconds === 0 ? 'blur-xs opacity-50' : ''
          }`}>
            {activeText.content}
          </p>

          {!isRunning && elapsedSeconds === 0 && (
            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-center text-xs text-blue-700 font-medium">
              Presiona <strong>"Iniciar Lectura"</strong> para enfocar el texto e iniciar el cronómetro.
            </div>
          )}
        </div>
      ) : (
        /* Test de Retención y Métricas Finales */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Métricas de Velocidad */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 text-center">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                Tiempo de Lectura
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-950 mt-1">
                {formatTime(elapsedSeconds)}
              </div>
              <span className="text-[10px] text-emerald-600">Total transcurrido</span>
            </div>

            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 text-center">
              <span className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider block">
                Velocidad Bruta
              </span>
              <div className="text-2xl font-bold font-mono text-blue-950 mt-1">
                {wpm} <span className="text-sm font-normal text-slate-500">PPM</span>
              </div>
              <span className="text-[10px] text-blue-600">
                {wpm > 300 ? 'Lectura Muy Rápida' : wpm >= 200 ? 'Velocidad Universitaria Óptima' : 'Velocidad Media'}
              </span>
            </div>

            <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100 text-center">
              <span className="text-[11px] font-semibold text-purple-800 uppercase tracking-wider block">
                Velocidad Efectiva
              </span>
              <div className="text-2xl font-bold font-mono text-purple-950 mt-1">
                {showResults ? effectiveWpm : '---'} <span className="text-sm font-normal text-slate-500">PPM</span>
              </div>
              <span className="text-[10px] text-purple-600">PPM × % Retención</span>
            </div>
          </div>

          {/* Cuestionario de Retención */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <Zap className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-bold text-slate-900 font-display">
                Test de Retención Inmediata (2 Preguntas)
              </h4>
            </div>

            <div className="space-y-4">
              {activeText.retentionQuestions.map((q, qIdx) => (
                <div key={qIdx} className="space-y-2">
                  <p className="text-xs font-semibold text-slate-800">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = retentionAnswers[qIdx] === optIdx;
                      const isCorrectOpt = optIdx === q.correctIndex;
                      let btnStyle = 'bg-white border-slate-200 text-slate-700';

                      if (showResults) {
                        if (isCorrectOpt) {
                          btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-50 border-rose-300 text-rose-800';
                        } else {
                          btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-blue-50 border-blue-400 text-blue-900 font-medium';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={showResults}
                          onClick={() => {
                            setRetentionAnswers((prev) => ({
                              ...prev,
                              [qIdx]: optIdx
                            }));
                          }}
                          className={`p-2.5 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!showResults ? (
              <div className="pt-2 flex justify-end">
                <button
                  disabled={Object.keys(retentionAnswers).length < activeText.retentionQuestions.length}
                  onClick={() => setShowResults(true)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                >
                  Evaluar Retención
                </button>
              </div>
            ) : (
              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <div>
                    <span className="font-semibold text-slate-800">
                      Retención: {retentionScore.correct} de {retentionScore.total} aciertos ({retentionScore.pct}%)
                    </span>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Tu Velocidad Efectiva de asimilación es de <strong>{effectiveWpm} PPM</strong>.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-all"
                >
                  Otra Lectura
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
