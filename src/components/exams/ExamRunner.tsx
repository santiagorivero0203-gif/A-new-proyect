import React, { useState } from 'react';
import type { ExamSessionState } from '../../types/exam.types';
import { renderLatex } from '../../utils/latexRenderer';
import { TimerIcon, PauseIcon, PlayIcon } from '../common/Icons';

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

  const currentQuestion = session.questions[session.currentIndex];
  const isTimeCritical = session.secondsRemaining < 5 * 60; // Menos de 5 minutos

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(session.userAnswers).length;
  const totalCount = session.questions.length;
  const currentAnswer = currentQuestion ? session.userAnswers[currentQuestion.id] : undefined;
  const isFlagged = currentQuestion ? session.flaggedQuestions[currentQuestion.id] : false;

  const handleFinishClick = () => {
    if (answeredCount < totalCount) {
      setShowConfirmModal(true);
    } else {
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
            <h2 className="text-sm font-bold text-slate-900 font-display">{session.config.title}</h2>
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

          <div
            className={`px-3 py-1.5 rounded-xl font-mono text-sm font-bold flex items-center gap-2 border transition-all ${
              isTimeCritical
                ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                : 'bg-slate-100 text-slate-800 border-slate-200'
            }`}
          >
            <span>{formatTimer(session.secondsRemaining)}</span>
          </div>

          <button
            onClick={handleFinishClick}
            className="btn-primary text-xs py-2 px-3.5"
          >
            Finalizar Examen
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

      {/* Tarjeta de la Pregunta Activa */}
      <div className="app-card p-6 sm:p-8 space-y-6">
        {/* Metadatos y Flag */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {currentQuestion.subject}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              • {currentQuestion.topic}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              ({currentQuestion.difficulty})
            </span>
          </div>

          <button
            onClick={() => onToggleFlag(currentQuestion.id)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all border ${
              isFlagged
                ? 'bg-amber-50 text-amber-700 border-amber-300 font-bold'
                : 'text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{isFlagged ? '★ Marcada para Revisar' : '☆ Marcar para Revisar'}</span>
          </button>
        </div>

        {/* Enunciado de la Pregunta */}
        <div className="space-y-4">
          <div
            className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed font-sans"
            dangerouslySetInnerHTML={{
              __html: renderLatex(currentQuestion.questionText, false),
            }}
          />

          {currentQuestion.latexFormula && (
            <div
              className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center text-slate-900 font-serif"
              dangerouslySetInnerHTML={{
                __html: renderLatex(currentQuestion.latexFormula, true),
              }}
            />
          )}
        </div>

        {/* Lista de Opciones */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map((opt) => {
            const isSelected = currentAnswer === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => onSelectAnswer(currentQuestion.id, opt.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-500 shadow-soft-sm text-slate-900 ring-1 ring-blue-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span
                    className="text-sm font-medium"
                    dangerouslySetInnerHTML={{
                      __html: renderLatex(opt.text, false),
                    }}
                  />
                </div>
              </div>
            );
          })}
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
                onClick={() => {
                  setShowConfirmModal(false);
                  onFinish();
                }}
                className="btn-primary text-xs px-4 bg-rose-600 hover:bg-rose-700"
              >
                Sí, entregar evaluación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
