import React from 'react';
import { LayersIcon, PlayIcon } from '../../common/Icons';
import type { ExamConfig } from '../../../types/exam.types';

interface QuickExamWidgetProps {
  onLaunchExam?: (config: ExamConfig) => void;
  onNavigateToExams?: () => void;
}

export const QuickExamWidget: React.FC<QuickExamWidgetProps> = ({
  onLaunchExam,
  onNavigateToExams,
}) => {
  const handleLaunch = (mode: 'UNIVERSITY_EXAM' | 'HIGH_SCHOOL_EXAM' | 'QUICK_PRACTICE') => {
    let config: ExamConfig;
    if (mode === 'UNIVERSITY_EXAM') {
      config = {
        mode: 'UNIVERSITY_EXAM',
        title: 'Examen de Carrera: Física & Matemática Analítica',
        totalQuestions: 6,
        timeLimitSeconds: 60 * 60,
        allowPause: true,
        shuffleQuestions: true,
      };
    } else if (mode === 'HIGH_SCHOOL_EXAM') {
      config = {
        mode: 'HIGH_SCHOOL_EXAM',
        title: 'Examen de Bachillerato: Ciencias & Lenguaje',
        totalQuestions: 6,
        timeLimitSeconds: 45 * 60,
        allowPause: true,
        shuffleQuestions: true,
      };
    } else {
      config = {
        mode: 'QUICK_PRACTICE',
        title: 'Cuestionario Rápido de Práctica',
        totalQuestions: 4,
        timeLimitSeconds: 15 * 60,
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
    <div className="app-card p-4 sm:p-6 flex flex-col justify-between h-full bg-white border border-slate-200/80 shadow-soft">
      <div className="space-y-4">
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
              <LayersIcon className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-sans">
                Evaluaciones y Pruebas
              </h3>
              <p className="text-[11px] text-slate-500">Evaluaciones cronometradas con corrección automática</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
            Cronometrado
          </span>
        </div>

        {/* Lista de opciones rápidas (Sin tarjetas anidadas) */}
        <div className="divide-y divide-slate-100">
          {/* Opción 1: Examen Universitario */}
          <div className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3 group">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-slate-900 font-sans truncate">
                  Examen Universitario
                </p>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                  60 min
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                Cálculo diferencial, vectores ℝ³ y dinámica newtoniana
              </p>
            </div>
            <button
              onClick={() => handleLaunch('UNIVERSITY_EXAM')}
              className="btn-brand text-xs py-1.5 px-3 flex items-center gap-1.5 shrink-0 active:scale-[0.98] transition-transform duration-150"
            >
              <PlayIcon className="w-3.5 h-3.5" />
              <span>Iniciar</span>
            </button>
          </div>

          {/* Opción 2: Examen de Bachillerato */}
          <div className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3 group">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-slate-900 font-sans truncate">
                  Examen de Bachillerato
                </p>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                  45 min
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                Química, biología, matemática y razonamiento verbal
              </p>
            </div>
            <button
              onClick={() => handleLaunch('HIGH_SCHOOL_EXAM')}
              className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 shrink-0 active:scale-[0.98] transition-transform duration-150"
            >
              <PlayIcon className="w-3.5 h-3.5 text-slate-600" />
              <span>Lanzar</span>
            </button>
          </div>

          {/* Opción 3: Cuestionario Rápido */}
          <div className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3 group">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-slate-900 font-sans truncate">
                  Cuestionario Rápido
                </p>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                  15 min
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                Práctica ágil de 4 preguntas de fijación conceptual
              </p>
            </div>
            <button
              onClick={() => handleLaunch('QUICK_PRACTICE')}
              className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 shrink-0 active:scale-[0.98] transition-transform duration-150"
            >
              <PlayIcon className="w-3.5 h-3.5 text-slate-600" />
              <span>Express</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Evaluaciones con corrección paso a paso</span>
        {onNavigateToExams && (
          <button
            onClick={onNavigateToExams}
            className="text-brand-500 hover:text-brand-600 font-semibold transition-colors"
          >
            Ver Todas →
          </button>
        )}
      </div>
    </div>
  );
};
