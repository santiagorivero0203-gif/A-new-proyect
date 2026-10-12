import React, { useState } from 'react';
import { useExamSimulator } from '../../hooks/useExamSimulator';
import { ExamRunner } from './ExamRunner';
import { ExamResultsReport } from './ExamResultsReport';
import { LayersIcon, PlayIcon, SparklesIcon } from '../common/Icons';
import type { AcademicSubject } from '../../types/exam.types';

export const SimulatorEngine: React.FC = () => {
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

  // Vista de Configuración y Selección de Simulacro
  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold mb-2">
            <LayersIcon className="w-3.5 h-3.5" />
            Motor de Exámenes & Pruebas Diagnósticas • Simulación Simadi
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
            Simulador de Evaluaciones Cronometradas
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl">
            Entrena bajo condiciones reales de presión temporal, selección algorítmica de preguntas y retroalimentación pedagógica exhaustiva.
          </p>
        </div>
      </div>

      {/* Tarjetas de Modos Preconfigurados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Modo 1: Simulacro Tipo UCV */}
        <div className="app-card p-6 flex flex-col justify-between hover:border-blue-400 transition-all space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Alta Intensidad
              </span>
              <span className="text-xs text-slate-400 font-mono">60 Minutos</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              Simulacro Tipo Prueba Interna UCV
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Foco riguroso en Física, Matemática avanzada, Razonamiento analítico y resolución de problemas formales.
            </p>
          </div>

          <button
            onClick={() =>
              startExam({
                mode: 'SIMADI_UCV',
                title: 'Simulacro Tipo Prueba Interna UCV (Ciencias & Ingeniería)',
                totalQuestions: 6,
                timeLimitSeconds: 60 * 60,
                allowPause: true,
                shuffleQuestions: true,
              })
            }
            className="btn-primary w-full text-xs py-2.5 flex items-center justify-center gap-2"
          >
            <PlayIcon className="w-3.5 h-3.5" />
            <span>Lanzar Prueba UCV</span>
          </button>
        </div>

        {/* Modo 2: Exploración OPSU */}
        <div className="app-card p-6 flex flex-col justify-between hover:border-purple-400 transition-all space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                Multidisciplinar
              </span>
              <span className="text-xs text-slate-400 font-mono">45 Minutos</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              Prueba Diagnóstica Nacional OPSU
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Evaluación equilibrada de Castellano (Analogías), Biología, Química, Matemática y razonamiento numérico.
            </p>
          </div>

          <button
            onClick={() =>
              startExam({
                mode: 'SIMADI_OPSU',
                title: 'Prueba Diagnóstica Integral OPSU (Todas las Materias)',
                totalQuestions: 8,
                timeLimitSeconds: 45 * 60,
                allowPause: true,
                shuffleQuestions: true,
              })
            }
            className="btn-brand w-full text-xs py-2.5 flex items-center justify-center gap-2"
          >
            <PlayIcon className="w-3.5 h-3.5" />
            <span>Lanzar Prueba OPSU</span>
          </button>
        </div>

        {/* Modo 3: Práctica Rápida */}
        <div className="app-card p-6 flex flex-col justify-between hover:border-emerald-400 transition-all space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Ágil • Autoevaluación
              </span>
              <span className="text-xs text-slate-400 font-mono">15 Minutos</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              Micro-Test de 5 Preguntas
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ideal para repasos rápidos entre bloques de estudio sin sobrecargar la jornada.
            </p>
          </div>

          <button
            onClick={() =>
              startExam({
                mode: 'QUICK_PRACTICE',
                title: 'Micro-Test de Práctica Rápida',
                totalQuestions: 5,
                timeLimitSeconds: 15 * 60,
                allowPause: true,
                shuffleQuestions: true,
              })
            }
            className="btn-secondary w-full text-xs py-2.5 flex items-center justify-center gap-2"
          >
            <PlayIcon className="w-3.5 h-3.5 text-slate-700" />
            <span>Iniciar Práctica Ágil</span>
          </button>
        </div>
      </div>

      {/* Configuración Personalizada por Materia Específica */}
      <div className="app-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Examen Específico por Asignatura
            </h3>
            <p className="text-xs text-slate-500">
              Selecciona una materia individual para evaluar tu dominio focalizado
            </p>
          </div>
          <SparklesIcon className="w-5 h-5 text-blue-600" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {(['TODAS', 'Matemática', 'Física', 'Química', 'Biología', 'Castellano'] as const).map(
            (subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubjectFilter(subj)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  selectedSubjectFilter === subj
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {subj}
              </button>
            )
          )}
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            {selectedSubjectFilter === 'TODAS'
              ? 'Preguntas de todo el banco multidisciplinar'
              : `Filtrando exclusivamente preguntas de ${selectedSubjectFilter}`}
          </span>
          <button
            onClick={() =>
              startExam({
                mode: 'BY_SUBJECT',
                title:
                  selectedSubjectFilter === 'TODAS'
                    ? 'Evaluación Multidisciplinar'
                    : `Evaluación de ${selectedSubjectFilter}`,
                subject: selectedSubjectFilter === 'TODAS' ? undefined : selectedSubjectFilter,
                totalQuestions: 5,
                timeLimitSeconds: 20 * 60,
                allowPause: true,
                shuffleQuestions: true,
              })
            }
            className="btn-brand text-xs py-2 px-4"
          >
            Comenzar Evaluación de {selectedSubjectFilter}
          </button>
        </div>
      </div>
    </div>
  );
};
