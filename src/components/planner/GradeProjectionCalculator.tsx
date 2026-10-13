import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { plannerService } from '../../services/plannerService';
import type { SubjectEvaluationPlan } from '../../types/academicPlanner.types';
import { PlusIcon, TrashIcon, CheckCircleIcon, AlertTriangleIcon } from '../common/Icons';
import { EmptyState } from '../common/EmptyState';

interface GradeProjectionCalculatorProps {
  plans: SubjectEvaluationPlan[];
  onRefreshPlans: () => void;
  onOpenCreateEvent?: () => void;
}

/**
 * Calculadora de Notas Ponderadas y Proyección Automática
 * 
 * Permite calcular exactamente qué calificación sobre 20 pts necesita sacar el
 * estudiante en sus próximas evaluaciones para:
 * 1) Aprobar la materia (mínimo 10/20 pts).
 * 2) Alcanzar su meta de promedio deseada (ej. 16, 18 pts).
 */
export const GradeProjectionCalculator: React.FC<GradeProjectionCalculatorProps> = ({
  plans,
  onRefreshPlans,
  onOpenCreateEvent,
}) => {
  const { user } = useAuth();
  const userId = user?.id || user?.academic_profile || 'santiago_fisica_ucv';

  const [selectedSubject, setSelectedSubject] = useState<string>(
    plans[0]?.subject || ''
  );
  const [targetGoal, setTargetGoal] = useState<number>(16.0); // Meta deseada sobre 20

  // Modal para agregar nueva evaluación a la materia
  const [showAddEvalModal, setShowAddEvalModal] = useState(false);
  const [evalTitle, setEvalTitle] = useState('');
  const [evalWeight, setEvalWeight] = useState(25);
  const [evalScore, setEvalScore] = useState<number | undefined>(undefined);

  const currentPlan = plans.find((p) => p.subject === selectedSubject) || plans[0];

  if (!currentPlan) {
    return (
      <EmptyState
        title="Aún no has cargado planes de evaluación"
        description="Registra tus materias y cortes de evaluación para calcular proyecciones de notas, acumulados sobre 20 y notas requeridas para aprobar."
        actionLabel={onOpenCreateEvent ? "+ Registrar Materia o Evaluación" : undefined}
        onAction={onOpenCreateEvent}
      />
    );
  }

  // Cálculos matemáticos de ponderación
  // 1. Evaluaciones calificadas
  const gradedEvals = currentPlan.evaluations.filter(
    (e) => e.scoreObtained !== undefined && e.scoreObtained !== null
  );

  // 2. Evaluaciones pendientes
  const pendingEvals = currentPlan.evaluations.filter(
    (e) => e.scoreObtained === undefined || e.scoreObtained === null
  );

  // Puntos acumulados hasta ahora (sobre 20): sum(score * weight / 100)
  const currentAccumulatedScore = gradedEvals.reduce((acc, ev) => {
    return acc + (ev.scoreObtained || 0) * (ev.weightPercentage / 100);
  }, 0);

  // Porcentaje ya evaluado
  const evaluatedWeightPercentage = gradedEvals.reduce(
    (acc, ev) => acc + ev.weightPercentage,
    0
  );

  // Porcentaje pendiente por evaluar
  const remainingWeightPercentage = Math.max(0, 100 - evaluatedWeightPercentage);

  // Nota mínima para aprobar (10 pts escala venezolana / universitaria)
  const passingGrade = 10.0;
  const pointsNeededToPass = Math.max(0, passingGrade - currentAccumulatedScore);
  const gradeNeededToPass =
    remainingWeightPercentage > 0
      ? (pointsNeededToPass / (remainingWeightPercentage / 100))
      : 0;

  // Nota necesaria para la meta deseada
  const pointsNeededForGoal = Math.max(0, targetGoal - currentAccumulatedScore);
  const gradeNeededForGoal =
    remainingWeightPercentage > 0
      ? (pointsNeededForGoal / (remainingWeightPercentage / 100))
      : 0;

  // Nota máxima posible si saca 20 en todo lo restante
  const maxPossibleScore =
    currentAccumulatedScore + (20 * remainingWeightPercentage) / 100;

  const isAlreadyPassed = currentAccumulatedScore >= passingGrade;
  const isGoalImpossible = gradeNeededForGoal > 20.0;
  const isPassImpossible = gradeNeededToPass > 20.0;

  const handleUpdateScore = (evalId: string, scoreStr: string) => {
    const val = parseFloat(scoreStr);
    if (!isNaN(val) && val >= 0 && val <= 20) {
      plannerService.updateEventScore(userId, evalId, val);
      onRefreshPlans();
    } else if (scoreStr === '') {
      plannerService.updateEventScore(userId, evalId, undefined as any);
      onRefreshPlans();
    }
  };

  const handleAddEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evalTitle.trim()) return;

    plannerService.addEvent(userId, {
      title: evalTitle.trim(),
      subject: selectedSubject,
      date: new Date().toISOString().slice(0, 10),
      type: 'PARCIAL',
      weightPercentage: Number(evalWeight) || 20,
      scoreObtained: evalScore,
    });

    setEvalTitle('');
    setEvalWeight(20);
    setEvalScore(undefined);
    setShowAddEvalModal(false);
    onRefreshPlans();
  };

  const handleDeleteEvaluation = (evalId: string) => {
    plannerService.deleteEvent(userId, evalId);
    onRefreshPlans();
  };

  return (
    <div className="space-y-6">
      {/* Selector de Materia y Meta de Nota */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
              MATERIA SELECCIONADA
            </span>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {plans.map((p) => (
                <button
                  key={p.subject}
                  onClick={() => setSelectedSubject(p.subject)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                    selectedSubject === p.subject
                      ? 'bg-slate-900 text-white shadow-soft-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {p.subject}
                </button>
              ))}
            </div>
          </div>

          {/* Ajuste de Meta Deseada */}
          <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200/70">
            <span className="text-xs font-bold text-slate-700">Tu Meta:</span>
            <div className="flex items-center gap-1.5">
              {[14, 16, 18, 20].map((goal) => (
                <button
                  key={goal}
                  onClick={() => setTargetGoal(goal)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                    targetGoal === goal
                      ? 'bg-[#0F52BA] text-white shadow-soft-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {goal} pts
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas Principales de Proyección */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Nota Acumulada */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 border-t-4 border-t-brand-500 shadow-soft flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
              NOTA ACUMULADA
            </span>
            <div className="text-4xl font-black text-slate-900 tracking-tight my-2 font-sans">
              {currentAccumulatedScore.toFixed(2)}{' '}
              <span className="text-lg font-bold text-slate-400">/ 20</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Representa el {evaluatedWeightPercentage}% evaluado del plan
          </div>
        </div>

        {/* Card 2: Proyección Para Aprobar (10 pts) */}
        <div
          className={`bg-white rounded-3xl p-6 border shadow-soft border-t-4 flex flex-col justify-between ${
            isAlreadyPassed
              ? 'border-slate-200/80 border-t-emerald-400'
              : isPassImpossible
              ? 'border-slate-200/80 border-t-rose-400'
              : 'border-slate-200/80 border-t-amber-400'
          }`}
        >
          <div>
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
              PARA APROBAR (10 PTS)
            </span>
            <div className="text-4xl font-black text-slate-900 tracking-tight my-2 font-sans">
              {isAlreadyPassed ? (
                <span className="text-emerald-600 text-3xl">¡APROBADO! 🎉</span>
              ) : isPassImpossible ? (
                <span className="text-rose-600 text-2xl">INSUFICIENTE</span>
              ) : (
                <span>{gradeNeededToPass.toFixed(1)} <span className="text-lg font-bold text-slate-400">pts</span></span>
              )}
            </div>
          </div>
          <div className="text-xs font-medium text-slate-500">
            {isAlreadyPassed
              ? 'Ya acumulaste los 10 puntos mínimos necesarios'
              : `Promedio requerido en el ${remainingWeightPercentage}% restante (${pendingEvals.length} evaluaciones pendientes)`}
          </div>
        </div>

        {/* Card 3: Proyección Para Tu Meta */}
        <div
          className={`bg-white rounded-3xl p-6 border shadow-soft border-t-4 flex flex-col justify-between ${
            currentAccumulatedScore >= targetGoal
              ? 'border-slate-200/80 border-t-emerald-400'
              : isGoalImpossible
              ? 'border-slate-200/80 border-t-rose-400'
              : 'border-slate-200/80 border-t-purple-400'
          }`}
        >
          <div>
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
              PARA TU META ({targetGoal} PTS)
            </span>
            <div className="text-4xl font-black text-slate-900 tracking-tight my-2 font-sans">
              {currentAccumulatedScore >= targetGoal ? (
                <span className="text-emerald-600 text-3xl">¡META LOGRADA! 🏆</span>
              ) : isGoalImpossible ? (
                <span className="text-rose-600 text-2xl">&gt; 20 pts (Inalcanzable)</span>
              ) : (
                <span>{gradeNeededForGoal.toFixed(1)} <span className="text-lg font-bold text-slate-400">pts</span></span>
              )}
            </div>
          </div>
          <div className="text-xs font-medium text-slate-500">
            Máxima nota alcanzable si sacas 20 en todo: <strong className="text-slate-800">{maxPossibleScore.toFixed(1)} pts</strong>
          </div>
        </div>
      </div>

      {/* Alerta de Diagnóstico Proyectivo */}
      <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {isAlreadyPassed ? (
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircleIcon className="w-5 h-5 text-emerald-700" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangleIcon className="w-5 h-5 text-amber-700" />
            </div>
          )}
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              {isAlreadyPassed
                ? 'Asignatura aprobada matemáticamente'
                : `Plan de evaluación activo: ${remainingWeightPercentage}% pendiente por evaluar`}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAlreadyPassed
                ? `Con tus ${currentAccumulatedScore.toFixed(1)} pts acumulados tienes la materia asegurada. Concéntrate en elevar tu promedio a ${targetGoal} pts.`
                : `Necesitas un promedio de ${gradeNeededToPass.toFixed(1)} pts en las evaluaciones pendientes para garantizar la aprobación.`}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddEvalModal(true)}
          className="btn-brand text-xs py-2.5 px-4 rounded-2xl shrink-0 flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Añadir Corte</span>
        </button>
      </div>

      {/* Desglose de Evaluaciones de la Asignatura */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-sans">
              Evaluaciones de {selectedSubject}
            </h3>
            <p className="text-xs text-slate-500">
              Ingresa tus calificaciones para que el sistema recalcule tu proyección en tiempo real.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            Total Peso: {currentPlan.totalWeight}%
          </span>
        </div>

        {currentPlan.evaluations.length === 0 ? (
          <div className="pt-4">
            <EmptyState
              title={`No hay evaluaciones registradas en ${selectedSubject}`}
              description="Añade las evaluaciones de tu plan académico (ej: Parcial 25%, Taller 15%) para calcular tu nota proyectada en tiempo real."
              actionLabel="+ Añadir Primer Corte"
              onAction={() => setShowAddEvalModal(true)}
            />
          </div>
        ) : (
          <div className="divide-y divide-slate-100 mt-2">
            {currentPlan.evaluations.map((ev) => (
              <div
                key={ev.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#0F52BA] border border-blue-100">
                      {ev.type}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{ev.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500">
                    Fecha: {ev.date} {ev.time ? `• ${ev.time}` : ''} • Ponderación: <strong>{ev.weightPercentage}%</strong>
                  </p>
                </div>

                {/* Input de Calificación y Acción */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200">
                    <span className="text-xs font-semibold text-slate-500">Nota:</span>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.5"
                      placeholder="Pendiente"
                      value={ev.scoreObtained !== undefined ? ev.scoreObtained : ''}
                      onChange={(e) => handleUpdateScore(ev.id, e.target.value)}
                      className="w-16 bg-transparent text-sm font-bold text-slate-900 focus:outline-none text-right font-mono"
                    />
                    <span className="text-xs font-mono text-slate-400">/ 20</span>
                  </div>

                  <button
                    onClick={() => handleDeleteEvaluation(ev.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                    title="Eliminar corte de evaluación"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal para Añadir Nuevo Corte de Evaluación */}
      {showAddEvalModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-soft-lg space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900 font-sans">
              Añadir Evaluación a {selectedSubject}
            </h3>

            <form onSubmit={handleAddEvaluation} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Título de la Evaluación
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Parcial III de Ecuaciones Diferenciales"
                  value={evalTitle}
                  onChange={(e) => setEvalTitle(e.target.value)}
                  className="input-clean text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ponderación (%)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={evalWeight}
                    onChange={(e) => setEvalWeight(Number(e.target.value))}
                    className="input-clean text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nota (Opcional, 0-20)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    placeholder="Pendiente"
                    value={evalScore !== undefined ? evalScore : ''}
                    onChange={(e) =>
                      setEvalScore(e.target.value ? Number(e.target.value) : undefined)
                    }
                    className="input-clean text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddEvalModal(false)}
                  className="btn-secondary text-xs py-2 px-4 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-brand text-xs py-2 px-5 rounded-xl font-bold"
                >
                  Guardar Evaluación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
