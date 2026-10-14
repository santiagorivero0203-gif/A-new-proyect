import React, { useState, useEffect } from 'react';
import { useExamSimulator } from '../../hooks/useExamSimulator';
import { ExamRunner } from './ExamRunner';
import { ExamResultsReport } from './ExamResultsReport';
import { LayersIcon, PlayIcon, AtomIcon } from '../common/Icons';
import { UCV_EXAM_BANK, UCV_CURRICULUM_MODULES } from '../../data/ucv_intro_course_data';
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
    recoverableSession,
    resumeRecoveredSession,
    discardRecoveredSession,
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
  const [selectedUcvModuleId, setSelectedUcvModuleId] = useState<string>(UCV_CURRICULUM_MODULES[0].id);

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
      {/* Banner de Recuperación de Sesión tras Caída de Red o Recarga */}
      {recoverableSession && (
        <div className="p-5 rounded-3xl bg-blue-50/70 border-2 border-[#0F52BA]/30 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900 font-sans">
                Sesión de examen en curso detectada
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Tienes una evaluación sin finalizar: <strong>{recoverableSession.config.title}</strong> con{' '}
              <strong>{Object.keys(recoverableSession.userAnswers).length}</strong> de{' '}
              <strong>{recoverableSession.questions.length}</strong> preguntas respondidas.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={discardRecoveredSession}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
            >
              Descartar
            </button>
            <button
              onClick={resumeRecoveredSession}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0F52BA] hover:bg-[#0c4194] shadow-soft-sm transition-all flex items-center gap-1.5"
            >
              <span>Retomar donde lo dejé</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

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

      {/* SECCIÓN ESPECÍFICA: CURSO INTRODUCTORIO FACULTAD DE CIENCIAS UCV */}
      <div className="app-card p-6 sm:p-7 rounded-3xl bg-white border-2 border-blue-200/90 shadow-soft-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0F52BA] border border-blue-200 text-xs font-bold font-sans">
              <AtomIcon className="w-3.5 h-3.5" />
              <span>Simulación Oficial • Facultad de Ciencias UCV</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight font-sans">
              Evaluaciones del Curso Introductorio (UA I, UA II y UA III Completo)
            </h3>
            <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
              Batería de reactivos oficiales del programa de nivelación: Lectura Crítica, Método Científico, Aritmética SI, Operaciones en ℚ y ℝ, Álgebra Avanzada, Intervalos, Funciones, Trigonometría y Vectores.
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-[#0F52BA] px-3 py-1 rounded-xl bg-blue-50 border border-blue-100 shrink-0 self-start sm:self-auto">
            {UCV_EXAM_BANK.length} Reactivos Calibrados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tarjeta 1: Simulacro Integral Completo */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-[#0F52BA] text-white flex flex-col justify-between space-y-3 shadow-soft-xs">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 text-white font-bold">
                Examen Integral • 30 Preguntas
              </span>
              <h4 className="text-sm font-bold leading-tight">
                Simulacro Integral Curso Introductorio UCV
              </h4>
              <p className="text-[11px] text-blue-100/80 leading-relaxed">
                Abarca el 100% del temario del programa oficial (UA I, UA II y los 5 bloques de UA III).
              </p>
            </div>

            <button
              onClick={() =>
                startExam(
                  {
                    mode: 'SIMADI_UCV',
                    title: 'Simulacro Integral: Curso Introductorio Ciencias UCV',
                    totalQuestions: Math.min(30, UCV_EXAM_BANK.length),
                    timeLimitSeconds: 60 * 60,
                    allowPause: true,
                    shuffleQuestions: true,
                    subject: 'Física',
                  },
                  UCV_EXAM_BANK
                )
              }
              className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-soft-xs"
            >
              <PlayIcon className="w-3 h-3 text-[#0F52BA]" />
              <span>Iniciar Integral (60 Min)</span>
            </button>
          </div>

          {/* Tarjeta 2: Evaluación Diagnóstica Inicial */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold border border-purple-200">
                Hito Día 1 • 15 Preguntas
              </span>
              <h4 className="text-sm font-bold text-slate-900 leading-tight">
                Diagnóstico de Entrada UCV
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Mide tus fortalezas previas antes de iniciar las 6 semanas de clases.
              </p>
            </div>

            <button
              onClick={() =>
                startExam(
                  {
                    mode: 'DIAGNOSTIC_EXAM',
                    title: 'Evaluación Diagnóstica Inicial - Ciencias UCV',
                    totalQuestions: 15,
                    timeLimitSeconds: 35 * 60,
                    allowPause: true,
                    shuffleQuestions: true,
                  },
                  UCV_EXAM_BANK
                )
              }
              className="w-full py-2.5 px-3 rounded-xl bg-[#0F52BA] hover:bg-[#0c4194] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-soft-xs"
            >
              <PlayIcon className="w-3 h-3" />
              <span>Iniciar Diagnóstico (35 Min)</span>
            </button>
          </div>

          {/* Tarjeta 3: Práctica por Módulo Específico */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                Formativo • 5 Reactivos
              </span>
              <h4 className="text-sm font-bold text-slate-900 leading-tight">
                Quiz Modular Específico
              </h4>
              <select
                value={selectedUcvModuleId}
                onChange={(e) => setSelectedUcvModuleId(e.target.value)}
                className="input-clean py-1.5 px-2 text-xs font-sans rounded-lg w-full bg-white border border-slate-200 text-slate-700"
              >
                {UCV_CURRICULUM_MODULES.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                const targetMod =
                  UCV_CURRICULUM_MODULES.find((m) => m.id === selectedUcvModuleId) ||
                  UCV_CURRICULUM_MODULES[0];
                startExam(
                  {
                    mode: 'QUICK_PRACTICE',
                    title: `Cuestionario Oficial: ${targetMod.title}`,
                    totalQuestions: 5,
                    timeLimitSeconds: 15 * 60,
                    allowPause: true,
                    shuffleQuestions: true,
                  },
                  UCV_EXAM_BANK
                );
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-soft-xs"
            >
              <PlayIcon className="w-3 h-3 text-emerald-400" />
              <span>Evaluar Módulo Seleccionado</span>
            </button>
          </div>
        </div>
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

        {/* Modelo 4: Modo Presión Real (Time Pressure) */}
        <div className="app-card p-6 flex flex-col justify-between hover:border-amber-300 transition-all space-y-4 bg-white border border-amber-200/80 shadow-soft">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Alta Velocidad
              </span>
              <span className="text-xs text-amber-700 font-mono font-bold">5 Minutos (10 Preguntas)</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              Modo Presión Real
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Entrena la agilidad mental ante situaciones de estrés. Solo 30 segundos de media por reactivo, sin posibilidad de pausa.
            </p>
          </div>

          <button
            onClick={() =>
              startExam({
                mode: 'TIME_PRESSURE',
                title: 'Desafío Relámpago: Presión Real',
                totalQuestions: 10,
                timeLimitSeconds: 5 * 60,
                allowPause: false,
                shuffleQuestions: true,
              })
            }
            className="btn-brand w-full text-xs py-2.5 flex items-center justify-center gap-2 !bg-amber-600 hover:!bg-amber-700 text-white"
          >
            <PlayIcon className="w-3.5 h-3.5" />
            <span>Iniciar Presión Real</span>
          </button>
        </div>

        {/* Modelo 5: Modo Muerte Súbita (Sudden Death) */}
        <div className="app-card p-6 flex flex-col justify-between hover:border-rose-300 transition-all space-y-4 bg-white border border-rose-200/80 shadow-soft">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                Precisión Quirúrgica
              </span>
              <span className="text-xs text-rose-600 font-mono font-bold">0 Margen de Error</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              Modo Muerte Súbita
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Un solo error concluye la prueba de inmediato. Ideal para medir dominio absoluto de conceptos y cálculo exacto.
            </p>
          </div>

          <button
            onClick={() =>
              startExam({
                mode: 'SUDDEN_DEATH',
                title: 'Muerte Súbita: Dominio Implacable',
                totalQuestions: 12,
                timeLimitSeconds: 20 * 60,
                allowPause: false,
                shuffleQuestions: true,
              })
            }
            className="btn-brand w-full text-xs py-2.5 flex items-center justify-center gap-2 !bg-rose-600 hover:!bg-rose-700 text-white"
          >
            <PlayIcon className="w-3.5 h-3.5" />
            <span>Iniciar Muerte Súbita</span>
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
