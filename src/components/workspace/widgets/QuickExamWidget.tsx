import React from 'react';
import { LayersIcon, PlayIcon, TrophyIcon } from '../../common/Icons';
import type { ExamConfig } from '../../../types/exam.types';

interface QuickExamWidgetProps {
  onLaunchExam?: (config: ExamConfig) => void;
  onNavigateToExams?: () => void;
}

export const QuickExamWidget: React.FC<QuickExamWidgetProps> = ({
  onLaunchExam,
  onNavigateToExams,
}) => {
  const handleLaunch = (mode: 'SIMADI_UCV' | 'SIMADI_OPSU' | 'QUICK_PRACTICE') => {
    let config: ExamConfig;
    if (mode === 'SIMADI_UCV') {
      config = {
        mode: 'SIMADI_UCV',
        title: 'Simulacro Tipo Prueba Interna UCV (Ciencias & Ingeniería)',
        totalQuestions: 6,
        timeLimitSeconds: 60 * 60,
        allowPause: true,
        shuffleQuestions: true,
      };
    } else if (mode === 'SIMADI_OPSU') {
      config = {
        mode: 'SIMADI_OPSU',
        title: 'Evaluación Diagnóstica Multidisciplinar (Tipo OPSU)',
        totalQuestions: 5,
        timeLimitSeconds: 30 * 60,
        allowPause: true,
        shuffleQuestions: true,
      };
    } else {
      config = {
        mode: 'QUICK_PRACTICE',
        title: 'Práctica Rápida de Concentración (5 Min)',
        totalQuestions: 3,
        timeLimitSeconds: 5 * 60,
        allowPause: true,
        shuffleQuestions: true,
      };
    }

    if (onLaunchExam) {
      onLaunchExam(config);
    } else if (onNavigateToExams) {
      onNavigateToExams();
    }
  };

  return (
    <div className="app-card p-6 flex flex-col justify-between h-full bg-white border border-slate-200/80 shadow-soft">
      <div className="space-y-4">
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <LayersIcon className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Simulador de Exámenes • Simadi
              </h3>
              <p className="text-[11px] text-slate-500">Evaluaciones cronometradas con corrección automática</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-mono">
            Simadi v2
          </span>
        </div>

        {/* Tarjetas de opciones rápidas */}
        <div className="space-y-2.5">
          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-brand-500/50 transition-all flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-slate-900">Prueba Interna UCV</p>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 font-mono">
                  60 min
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Física, Matemática y Razonamiento Analítico avanzado
              </p>
            </div>
            <button
              onClick={() => handleLaunch('SIMADI_UCV')}
              className="btn-brand text-xs py-1.5 px-3 flex items-center gap-1.5 shrink-0"
            >
              <PlayIcon className="w-3 h-3" />
              <span>Iniciar</span>
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-brand-500/50 transition-all flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-slate-900">Diagnóstico OPSU</p>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-700 font-mono">
                  30 min
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Biología, Química, Castellano y Matemática general
              </p>
            </div>
            <button
              onClick={() => handleLaunch('SIMADI_OPSU')}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all"
            >
              <PlayIcon className="w-3 h-3" />
              <span>Lanzar</span>
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-brand-500/50 transition-all flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-slate-900">Drill Rápido (3 Preguntas)</p>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 font-mono">
                  5 min
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Práctica express de repaso antes de una clase
              </p>
            </div>
            <button
              onClick={() => handleLaunch('QUICK_PRACTICE')}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all"
            >
              <PlayIcon className="w-3 h-3" />
              <span>Express</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1 text-slate-600 font-mono">
          <TrophyIcon className="w-3.5 h-3.5 text-amber-500" />
          Último puntaje: 17.5 / 20
        </span>
        {onNavigateToExams && (
          <button
            onClick={onNavigateToExams}
            className="text-brand-500 hover:text-brand-600 font-semibold transition-colors"
          >
            Ver Historial Completo →
          </button>
        )}
      </div>
    </div>
  );
};
