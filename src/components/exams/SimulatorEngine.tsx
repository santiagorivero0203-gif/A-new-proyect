import React, { useState, useEffect } from 'react';
import { useExamSimulator } from '../../hooks/useExamSimulator';
import { ExamRunner } from './ExamRunner';
import { ExamResultsReport } from './ExamResultsReport';
import { LayersIcon, PlayIcon } from '../common/Icons';
import type { AcademicSubject, ExamConfig, Question } from '../../types/exam.types';

interface SimulatorEngineProps {
  initialConfig?: ExamConfig | null;
  initialQuestions?: Question[] | null;
  onClearInitial?: () => void;
}

export const SimulatorEngine: React.FC<SimulatorEngineProps> = ({
  initialConfig,
  initialQuestions,
  onClearInitial,
}) => {
  const {
    session,
    report,
    startExam,
    selectAnswer,
    toggleFlagQuestion,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    togglePause,
    finishExam,
    resetExam,
  } = useExamSimulator();

  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<AcademicSubject | 'TODAS'>('TODAS');

  useEffect(() => {
    if (initialConfig && initialQuestions && initialQuestions.length > 0) {
      startExam(initialConfig, initialQuestions);
      if (onClearInitial) onClearInitial();
    }
  }, [initialConfig, initialQuestions, startExam, onClearInitial]);

  if (session.status === 'IN_PROGRESS') {
    return (
      <ExamRunner
        session={session}
        onSelectAnswer={selectAnswer}
        onToggleFlag={toggleFlagQuestion}
        onGoToIndex={goToQuestion}
        onNext={nextQuestion}
        onPrev={prevQuestion}
        onTogglePause={togglePause}
        onFinish={finishExam}
      />
    );
  }

  if (session.status === 'FINISHED' && report) {
    return (
      <ExamResultsReport
        report={report}
        onRetake={() => startExam(session.config)}
        onNewExam={resetExam}
      />
    );
  }

  // Vista de Selección de Evaluaciones
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Encabezado Limpio sin AI Slop */}
      <div className="pb-4 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
          <LayersIcon className="w-3.5 h-3.5" />
          <span>Evaluaciones Académicas</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
          Exámenes y Pruebas de Práctica
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Evaluaciones estructuradas con temporizador, formato de selección simple y corrección detallada paso a paso.
        </p>
      </div>

      {/* Grid de Modelos de Examen Reales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Modelo 1: Examen de Carrera Universitaria */}
        <div className="app-card p-6 flex flex-col justify-between hover:border-slate-300 transition-all space-y-4 bg-white border border-slate-200/80 shadow-soft">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-600 border border-blue-200">
                Nivel Universitario
              </span>
              <span className="text-xs text-slate-400 font-mono">60 Minutos</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              Examen de Carrera (Física & Matemática)
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cálculo diferencial e integral, vectores tridimensionales en ℝ³, dinámica newtoniana y conservación de la energía.
            </p>
          </div>

          <button
            onClick={() =>
              startExam({
                mode: 'UNIVERSITY_EXAM',
                title: 'Examen de Carrera: Física & Matemática Analítica',
                totalQuestions: 6,
                timeLimitSeconds: 60 * 60,
                allowPause: true,
                shuffleQuestions: true,
              })
            }
            className="btn-brand w-full text-xs py-2.5 flex items-center justify-center gap-2"
          >
            <PlayIcon className="w-3.5 h-3.5" />
            <span>Iniciar Examen Universitario</span>
          </button>
        </div>

        {/* Modelo 2: Examen de Bachillerato Diversificado */}
        <div className="app-card p-6 flex flex-col justify-between hover:border-slate-300 transition-all space-y-4 bg-white border border-slate-200/80 shadow-soft">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Bachillerato
              </span>
              <span className="text-xs text-slate-400 font-mono">45 Minutos</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              Examen de Bachillerato (Ciencias & Lenguaje)
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Álgebra, cinemática, enlaces químicos, biología celular, genética y morfosintaxis de la oración.
            </p>
          </div>

          <button
            onClick={() =>
              startExam({
                mode: 'HIGH_SCHOOL_EXAM',
                title: 'Examen de Bachillerato: Ciencias & Lenguaje',
                totalQuestions: 6,
                timeLimitSeconds: 45 * 60,
                allowPause: true,
                shuffleQuestions: true,
              })
            }
            className="btn-brand w-full text-xs py-2.5 flex items-center justify-center gap-2"
          >
            <PlayIcon className="w-3.5 h-3.5" />
            <span>Iniciar Examen de Bachillerato</span>
          </button>
        </div>

        {/* Modelo 3: Evaluación Diagnóstica Integral */}
        <div className="app-card p-6 flex flex-col justify-between hover:border-slate-300 transition-all space-y-4 bg-white border border-slate-200/80 shadow-soft">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                Diagnóstico
              </span>
              <span className="text-xs text-slate-400 font-mono">30 Minutos</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              Evaluación Diagnóstica Multidisciplinar
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Exploración general de habilidades cuantitativas, razonamiento verbal, física y ciencias naturales.
            </p>
          </div>

          <button
            onClick={() =>
              startExam({
                mode: 'DIAGNOSTIC_EXAM',
                title: 'Evaluación Diagnóstica Multidisciplinar',
                totalQuestions: 6,
                timeLimitSeconds: 30 * 60,
                allowPause: true,
                shuffleQuestions: true,
              })
            }
            className="btn-secondary w-full text-xs py-2.5 flex items-center justify-center gap-2"
          >
            <PlayIcon className="w-3.5 h-3.5" />
            <span>Iniciar Diagnóstico</span>
          </button>
        </div>
      </div>

      {/* Cuestionario Focalizado por Asignatura */}
      <div className="app-card p-6 space-y-4 bg-white border border-slate-200/80 shadow-soft">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-sans">
              Práctica por Asignatura
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Evalúa una materia específica con preguntas seleccionadas de ese temario.
            </p>
          </div>
        </div>

        {/* Selector de Materias */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {(['TODAS', 'Matemática', 'Física', 'Química', 'Biología', 'Castellano'] as const).map(
            (subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubjectFilter(subj)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  selectedSubjectFilter === subj
                    ? 'bg-slate-900 text-white border-slate-900 shadow-soft-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {subj}
              </button>
            )
          )}
        </div>

        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-mono">
            {selectedSubjectFilter === 'TODAS'
              ? 'Preguntas seleccionadas de todas las materias'
              : `Preguntas de ${selectedSubjectFilter}`}
          </span>
          <button
            onClick={() =>
              startExam({
                mode: 'BY_SUBJECT',
                title:
                  selectedSubjectFilter === 'TODAS'
                    ? 'Cuestionario de Práctica Multidisciplinar'
                    : `Cuestionario de ${selectedSubjectFilter}`,
                subject: selectedSubjectFilter === 'TODAS' ? undefined : selectedSubjectFilter,
                totalQuestions: 5,
                timeLimitSeconds: 20 * 60,
                allowPause: true,
                shuffleQuestions: true,
              })
            }
            className="btn-brand text-xs py-2 px-4 self-end sm:self-auto"
          >
            Comenzar Cuestionario ({selectedSubjectFilter})
          </button>
        </div>
      </div>
    </div>
  );
};
