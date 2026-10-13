/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - SIMULADOR WHAT-IF DE CALIFICACIONES
 * ==============================================================================
 * Componente: WhatIfGradeCalculator.tsx
 * Función: "¿Cuánto necesito sacar para pasar o alcanzar mi meta?"
 * Soporta escala 1 a 20 (colegio / UCV), escala 1 a 100 y escala 1 a 5.
 * ==============================================================================
 */

import React, { useState } from 'react';
import {
  Calculator,
  Plus,
  Trash2,
} from 'lucide-react';

interface EvaluationItem {
  id: string;
  name: string;
  weight: number; // Porcentaje sobre 100
  grade: number | null; // Calificación obtenida (null si aún no se ha presentado)
}

export const WhatIfGradeCalculator: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [scaleMax, setScaleMax] = useState<number>(20); // 20 | 100 | 5
  const [passingGrade, setPassingGrade] = useState<number>(10);
  const [targetGrade, setTargetGrade] = useState<number>(14);

  const [evaluations, setEvaluations] = useState<EvaluationItem[]>([
    { id: '1', name: 'Primer Parcial (Cinemática)', weight: 25, grade: 14 },
    { id: '2', name: 'Segundo Parcial (Dinámica y Fuerzas)', weight: 30, grade: 11 },
    { id: '3', name: 'Quizzes y Talleres de Laboratorio', weight: 15, grade: 16 },
    { id: '4', name: 'Tercer Parcial Final (Energía y Vectores)', weight: 30, grade: null },
  ]);

  const handleScaleChange = (newMax: number) => {
    setScaleMax(newMax);
    if (newMax === 20) {
      setPassingGrade(10);
      setTargetGrade(14);
    } else if (newMax === 100) {
      setPassingGrade(50);
      setTargetGrade(75);
    } else if (newMax === 5) {
      setPassingGrade(3.0);
      setTargetGrade(4.0);
    }
  };

  const addEvaluation = () => {
    const newId = String(Date.now());
    setEvaluations((prev) => [
      ...prev,
      { id: newId, name: `Evaluación ${prev.length + 1}`, weight: 10, grade: null },
    ]);
  };

  const removeEvaluation = (id: string) => {
    setEvaluations((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEvaluation = (id: string, field: keyof EvaluationItem, value: any) => {
    setEvaluations((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  // Cálculos matemáticos
  const totalWeight = evaluations.reduce((acc, e) => acc + (Number(e.weight) || 0), 0);

  // Evaluaciones ya calificadas
  const completedEvals = evaluations.filter((e) => e.grade !== null && e.grade !== undefined);
  const completedWeight = completedEvals.reduce((acc, e) => acc + Number(e.weight), 0);

  // Puntos ponderados acumulados
  const accumulatedScore = completedEvals.reduce((acc, e) => {
    const w = Number(e.weight) / 100;
    return acc + Number(e.grade) * w;
  }, 0);

  // Porcentaje pendiente
  const pendingWeight = Math.max(0, 100 - completedWeight);

  // Nota requerida en el porcentaje pendiente para alcanzar la meta
  const pointsNeeded = targetGrade - accumulatedScore;
  const gradeNeeded = pendingWeight > 0 ? (pointsNeeded / (pendingWeight / 100)) : 0;

  // Nota requerida solo para pasar (nota mínima)
  const pointsNeededToPass = passingGrade - accumulatedScore;
  const gradeNeededToPass = pendingWeight > 0 ? (pointsNeededToPass / (pendingWeight / 100)) : 0;

  const isAlreadyPassed = accumulatedScore >= passingGrade;
  const isTargetAchieved = accumulatedScore >= targetGrade;

  return (
    <div className={`app-card bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-blue-700">
              Módulo de Planificación Académica
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#0F52BA]" />
            Simulador "¿Cuánto necesito sacar para pasar?"
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Ingresa los cortes de tu materia y calcula la nota exacta requerida en el parcial restante.
          </p>
        </div>

        {/* Selector de Escala */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
          {[
            { max: 20, label: 'Escala 1 - 20 (UCV/Colegio)' },
            { max: 100, label: '1 - 100%' },
            { max: 5, label: '1 - 5 pts' },
          ].map((sc) => (
            <button
              key={sc.max}
              onClick={() => handleScaleChange(sc.max)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                scaleMax === sc.max
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Panel de Métricas y Diagnóstico */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Acumulado Actual */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Puntaje Acumulado Actual
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">
              {accumulatedScore.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500">/ {scaleMax} pts</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            Evaluado: {completedWeight}% de 100%
          </span>
        </div>

        {/* Nota para Aprobar */}
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-1">
          <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
            Para Aprobar (Mín: {passingGrade})
          </span>
          <div className="flex items-baseline gap-2">
            {isAlreadyPassed ? (
              <span className="text-xl font-bold text-emerald-700 font-mono">
                ¡Ya Aprobada! 🎉
              </span>
            ) : gradeNeededToPass > scaleMax ? (
              <span className="text-xl font-bold text-red-600 font-mono">
                Inalcanzable ⚠️
              </span>
            ) : (
              <>
                <span className="text-2xl font-bold text-blue-900 font-mono">
                  {Math.max(0, gradeNeededToPass).toFixed(2)}
                </span>
                <span className="text-xs text-blue-600">en el {pendingWeight}% restante</span>
              </>
            )}
          </div>
          <span className="text-[11px] text-blue-600/90 block">
            {isAlreadyPassed
              ? 'Tienes los puntos mínimos garantizados'
              : `Faltan ${(passingGrade - accumulatedScore).toFixed(2)} pts ponderados`}
          </span>
        </div>

        {/* Nota para Meta Deseada */}
        <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200/80 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-purple-700 uppercase tracking-wider block">
              Meta Personal
            </span>
            <input
              type="number"
              step="0.5"
              min={passingGrade}
              max={scaleMax}
              value={targetGrade}
              onChange={(e) => setTargetGrade(Number(e.target.value))}
              className="w-14 px-1.5 py-0.5 text-xs text-center border border-purple-200 rounded-md font-bold bg-white text-purple-900"
            />
          </div>
          <div className="flex items-baseline gap-2">
            {isTargetAchieved ? (
              <span className="text-xl font-bold text-purple-800 font-mono">
                ¡Meta Lograda! 🏆
              </span>
            ) : gradeNeeded > scaleMax ? (
              <span className="text-xl font-bold text-amber-700 font-mono">
                Requiere {gradeNeeded.toFixed(1)} (Excede {scaleMax})
              </span>
            ) : (
              <>
                <span className="text-2xl font-bold text-purple-900 font-mono">
                  {Math.max(0, gradeNeeded).toFixed(2)}
                </span>
                <span className="text-xs text-purple-600">en el {pendingWeight}% restante</span>
              </>
            )}
          </div>
          <span className="text-[11px] text-purple-600/90 block">
            {gradeNeeded <= scaleMax
              ? `Necesitas un desempeño del ${(gradeNeeded / scaleMax * 100).toFixed(0)}% en lo que queda`
              : 'Ajusta tu meta a un rango alcanzable'}
          </span>
        </div>
      </div>

      {/* Lista de Cortes y Evaluaciones */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Cortes y Evaluaciones del Semestre / Año
          </h4>
          <span className={`text-xs font-mono font-bold ${totalWeight === 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
            Suma de ponderaciones: {totalWeight}% / 100%
          </span>
        </div>

        <div className="space-y-2">
          {evaluations.map((item, idx) => (
            <div
              key={item.id}
              className="p-3 bg-slate-50/80 border border-slate-200/70 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3 w-full sm:w-auto flex-1 min-w-0">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateEvaluation(item.id, 'name', e.target.value)}
                  placeholder="Nombre de la evaluación"
                  className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#0F52BA] focus:outline-none font-semibold text-slate-800 w-full truncate"
                />
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                {/* Ponderación (%) */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Peso:</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={item.weight}
                    onChange={(e) => updateEvaluation(item.id, 'weight', Number(e.target.value))}
                    className="w-14 px-2 py-1 bg-white border border-slate-200 rounded-lg text-center font-bold text-slate-800"
                  />
                  <span className="text-slate-500 font-bold">%</span>
                </div>

                {/* Nota Obtenida */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Nota:</span>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max={scaleMax}
                    value={item.grade === null ? '' : item.grade}
                    placeholder="Pendiente"
                    onChange={(e) => {
                      const val = e.target.value === '' ? null : Number(e.target.value);
                      updateEvaluation(item.id, 'grade', val);
                    }}
                    className={`w-20 px-2 py-1 bg-white border rounded-lg text-center font-bold ${
                      item.grade !== null
                        ? item.grade >= passingGrade
                          ? 'border-emerald-300 text-emerald-800 bg-emerald-50/30'
                          : 'border-red-300 text-red-700 bg-red-50/30'
                        : 'border-slate-200 text-slate-400'
                    }`}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeEvaluation(item.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white transition-colors"
                  title="Eliminar corte"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addEvaluation}
          className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-[#0F52BA] text-xs font-bold text-slate-600 hover:text-[#0F52BA] hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Añadir Otro Corte o Evaluación
        </button>
      </div>
    </div>
  );
};

export default WhatIfGradeCalculator;
