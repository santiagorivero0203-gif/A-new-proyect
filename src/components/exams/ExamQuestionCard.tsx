import React, { memo } from 'react';
import type { Question } from '../../types/exam.types';
import { renderLatex } from '../../utils/latexRenderer';

interface ExamQuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  isFlagged: boolean;
  onSelectAnswer: (questionId: string, optionId: string) => void;
  onToggleFlag: (questionId: string) => void;
}

/**
 * Componente Memorizado de la Pregunta Activa (Aislamiento de Renderizado)
 *
 * Blindaje Crítico contra el parpadeo de fórmulas matemáticas:
 * Al estar envuelto en React.memo con comparación por valor de props,
 * las actualizaciones por segundo del temporizador del examen (secondsRemaining)
 * NO provocan re-renderizados de la pregunta ni re-ejecuciones de KaTeX.
 * Mantiene 60 FPS estables y cero mutaciones del DOM de fórmulas.
 */
export const ExamQuestionCard: React.FC<ExamQuestionCardProps> = memo(
  ({ question, selectedAnswer, isFlagged, onSelectAnswer, onToggleFlag }) => {
    return (
      <div className="app-card p-6 sm:p-8 space-y-6 bg-white border border-slate-200/90 shadow-soft">
        {/* Metadatos y Flag */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0F52BA] border border-blue-200">
              {question.subject}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              • {question.topic}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              ({question.difficulty})
            </span>
          </div>

          <button
            onClick={() => onToggleFlag(question.id)}
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
              __html: renderLatex(question.questionText, false),
            }}
          />

          {question.latexFormula && (
            <div
              className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center text-slate-900 font-serif"
              dangerouslySetInnerHTML={{
                __html: renderLatex(question.latexFormula, true),
              }}
            />
          )}
        </div>

        {/* Lista de Opciones */}
        <div className="space-y-3 pt-2">
          {question.options.map((opt) => {
            const isSelected = selectedAnswer === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => onSelectAnswer(question.id, opt.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-50/70 border-[#0F52BA] shadow-soft-sm text-slate-900 ring-1 ring-[#0F52BA]/20 font-medium'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50 text-slate-700'
                }`}
              >
                <div
                  className="text-sm font-sans flex-1"
                  dangerouslySetInnerHTML={{
                    __html: renderLatex(opt.text, false),
                  }}
                />

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-4 transition-all ${
                    isSelected
                      ? 'border-[#0F52BA] bg-[#0F52BA] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Solo re-renderizar si cambia la pregunta, la respuesta seleccionada o el flag
    return (
      prevProps.question.id === nextProps.question.id &&
      prevProps.selectedAnswer === nextProps.selectedAnswer &&
      prevProps.isFlagged === nextProps.isFlagged &&
      prevProps.question.questionText === nextProps.question.questionText &&
      prevProps.question.latexFormula === nextProps.question.latexFormula
    );
  }
);

ExamQuestionCard.displayName = 'ExamQuestionCard';
