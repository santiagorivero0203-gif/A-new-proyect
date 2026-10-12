import React, { useState } from 'react';
import type { ExamReport } from '../../types/exam.types';
import { renderLatex } from '../../utils/latexRenderer';
import { CheckCircleIcon, TrophyIcon, RotateCcwIcon } from '../common/Icons';

interface ExamResultsReportProps {
  report: ExamReport;
  onRetake: () => void;
  onNewExam: () => void;
}

export const ExamResultsReport: React.FC<ExamResultsReportProps> = ({
  report,
  onRetake,
  onNewExam,
}) => {
  const [filterMode, setFilterMode] = useState<'ALL' | 'INCORRECT' | 'CORRECT'>('ALL');

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s}s`;
  };

  const getStatusBadge = (score: number) => {
    if (score >= 18) {
      return { text: 'Sobresaliente • Nivel Superior', color: 'bg-emerald-50 text-emerald-700 border-emerald-300' };
    }
    if (score >= 15) {
      return { text: 'Notable • Aprobación Sólida', color: 'bg-blue-50 text-blue-700 border-blue-300' };
    }
    if (score >= 10) {
      return { text: 'Aprobado • Reforzar Temas Críticos', color: 'bg-amber-50 text-amber-700 border-amber-300' };
    }
    return { text: 'Refuerzo Urgente Requerido', color: 'bg-rose-50 text-rose-700 border-rose-300' };
  };

  const statusInfo = getStatusBadge(report.score);

  const filteredQuestions = report.questions.filter((q) => {
    const userAnswer = report.userAnswers[q.id];
    const isCorrect = userAnswer === q.correctOptionId;
    if (filterMode === 'CORRECT') return isCorrect;
    if (filterMode === 'INCORRECT') return !isCorrect;
    return true;
  });

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Banner de Resultados */}
      <div className="app-card p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-1.5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.color}`}>
              <TrophyIcon className="w-3.5 h-3.5" />
              {statusInfo.text}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Reporte Pedagógico de Evaluación
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              {report.examTitle} • Completado en {formatSeconds(report.timeTakenSeconds)}
            </p>
          </div>

          {/* Puntaje en escala 20 */}
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center shrink-0 min-w-[160px]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Calificación Final</p>
            <p className="text-3xl sm:text-4xl font-black text-slate-900 font-mono mt-0.5">
              {report.score} <span className="text-lg text-slate-400 font-normal">/ 20</span>
            </p>
            <p className="text-xs text-blue-600 font-semibold font-mono mt-1">
              {report.percentage}% de efectividad
            </p>
          </div>
        </div>

        {/* Estadísticas Clave */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Preguntas</p>
            <p className="text-xl font-bold text-slate-800 font-mono mt-0.5">{report.totalQuestions}</p>
          </div>
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <p className="text-[10px] font-bold text-emerald-700 uppercase">Correctas</p>
            <p className="text-xl font-bold text-emerald-700 font-mono mt-0.5">{report.correctAnswers}</p>
          </div>
          <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100">
            <p className="text-[10px] font-bold text-rose-700 uppercase">Incorrectas</p>
            <p className="text-xl font-bold text-rose-700 font-mono mt-0.5">{report.incorrectAnswers}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Sin Responder</p>
            <p className="text-xl font-bold text-slate-600 font-mono mt-0.5">{report.unansweredAnswers}</p>
          </div>
        </div>

        {/* Desglose por Tema */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Desglose de Desempeño por Tema Evaluado
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(report.breakdownByTopic).map(([topic, data]) => {
              const pct = Math.round((data.correct / (data.total || 1)) * 100);
              return (
                <div key={topic} className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 truncate">{topic}</span>
                    <span className="font-mono text-slate-600 font-bold">
                      {data.correct}/{data.total} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Revisión Pregunta a Pregunta con Justificaciones */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Revisión Detallada & Justificaciones Paso a Paso
            </h2>
            <p className="text-xs text-slate-500">
              Analiza los errores y comprende la deducción formal de cada solución
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'ALL' ? 'bg-white text-slate-900 shadow-soft-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Todas ({report.questions.length})
            </button>
            <button
              onClick={() => setFilterMode('INCORRECT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'INCORRECT' ? 'bg-white text-slate-900 shadow-soft-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Errores ({report.incorrectAnswers + report.unansweredAnswers})
            </button>
            <button
              onClick={() => setFilterMode('CORRECT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'CORRECT' ? 'bg-white text-slate-900 shadow-soft-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Aciertos ({report.correctAnswers})
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const userAnswerId = report.userAnswers[q.id];
            const isCorrect = userAnswerId === q.correctOptionId;
            const isUnanswered = !userAnswerId;

            const userOpt = q.options.find((o) => o.id === userAnswerId);
            const correctOpt = q.options.find((o) => o.id === q.correctOptionId);

            return (
              <div
                key={q.id}
                className={`app-card p-6 border transition-all ${
                  isCorrect
                    ? 'border-emerald-200 bg-white'
                    : isUnanswered
                    ? 'border-slate-200 bg-slate-50/50'
                    : 'border-rose-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      #{idx + 1}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {q.subject} • {q.topic}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      isCorrect
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : isUnanswered
                        ? 'bg-slate-100 text-slate-600 border-slate-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {isCorrect ? '✓ Respuesta Correcta' : isUnanswered ? '○ Sin Responder' : '✕ Respuesta Incorrecta'}
                  </span>
                </div>

                {/* Enunciado */}
                <div
                  className="text-sm font-medium text-slate-900 leading-relaxed font-sans mb-3"
                  dangerouslySetInnerHTML={{ __html: renderLatex(q.questionText, false) }}
                />

                {q.latexFormula && (
                  <div
                    className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-center text-slate-900 font-serif my-2 text-xs"
                    dangerouslySetInnerHTML={{ __html: renderLatex(q.latexFormula, true) }}
                  />
                )}

                {/* Comparación de Opciones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 text-xs">
                  <div className={`p-3 rounded-xl border ${isCorrect ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-rose-50/60 border-rose-200 text-rose-900'}`}>
                    <p className="font-bold text-[10px] uppercase tracking-wider mb-0.5 opacity-80">
                      Tu Selección:
                    </p>
                    <p className="font-medium">
                      {userOpt ? userOpt.text : 'No seleccionada'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-200 text-emerald-900">
                    <p className="font-bold text-[10px] uppercase tracking-wider mb-0.5 text-emerald-700">
                      Respuesta Correcta Oficial:
                    </p>
                    <p className="font-medium">{correctOpt?.text}</p>
                  </div>
                </div>

                {/* Caja de Justificación Pedagógica y Matemática */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 mt-3">
                  <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs uppercase tracking-wider">
                    <CheckCircleIcon className="w-4 h-4 text-blue-600" />
                    <span>Justificación y Procedimiento Pedagógico:</span>
                  </div>
                  <div
                    className="text-xs text-slate-600 leading-relaxed font-sans"
                    dangerouslySetInnerHTML={{ __html: renderLatex(q.explanation, false) }}
                  />
                  {q.explanationLatex && (
                    <div
                      className="p-2.5 bg-white border border-slate-200/60 rounded-xl text-center text-xs font-serif text-slate-800"
                      dangerouslySetInnerHTML={{ __html: renderLatex(q.explanationLatex, true) }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Botones de Acción Final */}
      <div className="p-4 app-card flex items-center justify-between gap-4">
        <button onClick={onNewExam} className="btn-secondary text-xs">
          ← Elegir Otra Evaluación
        </button>
        <button onClick={onRetake} className="btn-brand text-xs flex items-center gap-2">
          <RotateCcwIcon className="w-4 h-4" />
          <span>Repetir este Examen</span>
        </button>
      </div>
    </div>
  );
};
