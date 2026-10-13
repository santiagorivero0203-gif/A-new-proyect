import React, { useState, useEffect } from 'react';
import type { ExamSessionState } from '../../types/exam.types';
import { TimerIcon, PauseIcon, PlayIcon } from '../common/Icons';
import { ExamQuestionCard } from './ExamQuestionCard';
import { ExamTimerBadge } from './ExamTimerBadge';
import { proctoringSystem } from '../../services/proctoringSystem';

interface ExamRunnerProps {
  session: ExamSessionState;
  onSelectAnswer: (questionId: string, optionId: string) => void;
  onToggleFlag: (questionId: string) => void;
  onGoToIndex: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onTogglePause: () => void;
  onFinish: () => void;
}

export const ExamRunner: React.FC<ExamRunnerProps> = ({
  session,
  onSelectAnswer,
  onToggleFlag,
  onGoToIndex,
  onNext,
  onPrev,
  onTogglePause,
  onFinish,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Liberación estricta de cámara/hardware al salir o terminar la prueba
  useEffect(() => {
    return () => {
      proctoringSystem.stopCameraHardware();
    };
  }, []);

  const currentQuestion = session.questions[session.currentIndex];

  const answeredCount = Object.keys(session.userAnswers).length;
  const totalCount = session.questions.length;
  const currentAnswer = currentQuestion ? session.userAnswers[currentQuestion.id] : undefined;
  const isFlagged = currentQuestion ? session.flaggedQuestions[currentQuestion.id] : false;

  const handleFinishClick = () => {
    if (isSubmitting) return;
    if (answeredCount < totalCount) {
      setShowConfirmModal(true);
    } else {
      setIsSubmitting(true);
      onFinish();
    }
  };

  if (!currentQuestion) {
    return (
      <div className="p-8 text-center text-slate-500">
        Cargando preguntas de la evaluación...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Barra Superior Fija de Examen */}
      <div className="app-card p-4 sm:p-5 flex items-center justify-between gap-4 border border-slate-200/90 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
            <TimerIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 font-sans">{session.config.title}</h2>
            <span className="text-xs text-slate-500 font-mono">
              Pregunta {session.currentIndex + 1} de {totalCount} • {answeredCount} respondidas
            </span>
          </div>
        </div>

        {/* Cronómetro y Controles */}
        <div className="flex items-center gap-3">
          {session.config.allowPause && (
            <button
              onClick={onTogglePause}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title={session.isPaused ? 'Reanudar Examen' : 'Pausar Examen'}
            >
              {session.isPaused ? <PlayIcon className="w-4 h-4" /> : <PauseIcon className="w-4 h-4" />}
            </button>
          )}

          <ExamTimerBadge secondsRemaining={session.secondsRemaining} />

          <button
            onClick={handleFinishClick}
            disabled={isSubmitting}
            className="btn-primary text-xs py-2 px-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Finalizando...' : 'Finalizar Examen'}
          </button>
        </div>
      </div>

      {/* Pausa Overlay si está pausado */}
      {session.isPaused && (
        <div className="p-8 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-2">
          <h3 className="text-base font-bold text-amber-800">Examen Pausado</h3>
          <p className="text-xs text-amber-600">
            El temporizador se ha detenido. Haz clic en reanudar para continuar con tu prueba.
          </p>
          <button onClick={onTogglePause} className="btn-brand text-xs mt-2">
            Reanudar Evaluación
          </button>
        </div>
      )}

      {/* Píldoras de Navegación Rápida entre Preguntas */}
      <div className="app-card p-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {session.questions.map((q, idx) => {
            const hasAnswer = Boolean(session.userAnswers[q.id]);
            const flagged = Boolean(session.flaggedQuestions[q.id]);
            const isCurrent = idx === session.currentIndex;

            return (
              <button
                key={q.id}
                onClick={() => onGoToIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all relative ${
                  isCurrent
                    ? 'bg-slate-900 text-white shadow-soft-sm scale-105'
                    : hasAnswer
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title={`Pregunta ${idx + 1}`}
              >
                {idx + 1}
                {flagged && (
                  <span className="w-2 h-2 rounded-full bg-amber-500 absolute -top-0.5 -right-0.5 ring-1 ring-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tarjeta de la Pregunta Activa (Aislada y Memorizada con React.memo) */}
      <div className="space-y-4">
        <ExamQuestionCard
          question={currentQuestion}
          selectedAnswer={currentAnswer}
          isFlagged={Boolean(isFlagged)}
          onSelectAnswer={onSelectAnswer}
          onToggleFlag={onToggleFlag}
        />
      </div>

        {/* Botones de Navegación */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={session.currentIndex === 0}
            className="btn-secondary text-xs disabled:opacity-40 disabled:pointer-events-none"
          >
            ← Anterior
          </button>

          <span className="text-xs text-slate-400 font-mono">
            {session.currentIndex + 1} de {totalCount}
          </span>

          {session.currentIndex < totalCount - 1 ? (
            <button onClick={onNext} className="btn-primary text-xs">
              Siguiente →
            </button>
          ) : (
            <button onClick={handleFinishClick} className="btn-brand text-xs">
              Terminar y Ver Resultados
            </button>
          )}
        </div>

      {/* Modal de Confirmación si faltan preguntas */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-soft-lg space-y-4 text-center">
            <h3 className="text-lg font-bold text-slate-900 font-display">
              ¿Deseas entregar el examen ahora?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Aún tienes <strong>{totalCount - answeredCount} preguntas sin responder</strong>. Las preguntas no respondidas se computarán como incorrectas en tu reporte pedagógico.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn-secondary text-xs px-4"
              >
                Volver a revisar
              </button>
              <button
                disabled={isSubmitting}
                onClick={() => {
                  if (isSubmitting) return;
                  setIsSubmitting(true);
                  setShowConfirmModal(false);
                  onFinish();
                }}
                className="btn-primary text-xs px-4 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Entregando...' : 'Sí, entregar evaluación'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
