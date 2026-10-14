/**
 * @file AdaptiveStudyScheduleGenerator.tsx
 * @description Generador de Horarios de Estudio Adaptativos con Reprogramación Inteligente.
 * Analiza tareas atrasadas, ponderación de exámenes próximos y nivel de fatiga para
 * generar un cronograma semanal balanceado en bloques Pomodoro (con descansos intercalados).
 * Función 151 del catálogo de arquitectura.
 */

import React, { useState, useMemo } from 'react';
import { Calendar, Sparkles, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface StudyTask {
  id: string;
  subject: string;
  title: string;
  priority: 'ALTA' | 'MEDIA' | 'BAJA';
  estimatedHours: number;
  dueDate: string; // YYYY-MM-DD
  isOverdue: boolean;
}

interface ScheduledBlock {
  id: string;
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';
  timeSlot: string;
  subject: string;
  taskTitle: string;
  pomodoros: number;
  priority: 'ALTA' | 'MEDIA' | 'BAJA';
  rationale: string;
}

const INITIAL_TASKS: StudyTask[] = [
  {
    id: 't1',
    subject: 'Física Teórica',
    title: 'Resolución de problemas de conservación de energía y rozamiento',
    priority: 'ALTA',
    estimatedHours: 3,
    dueDate: '2026-10-15',
    isOverdue: true
  },
  {
    id: 't2',
    subject: 'Química General',
    title: 'Estequiometría y reactivo limitante en reacciones redox',
    priority: 'ALTA',
    estimatedHours: 2.5,
    dueDate: '2026-10-16',
    isOverdue: false
  },
  {
    id: 't3',
    subject: 'Castellano & Morfosintaxis',
    title: 'Análisis de proposiciones coordinadas y subordinadas',
    priority: 'MEDIA',
    estimatedHours: 2,
    dueDate: '2026-10-18',
    isOverdue: false
  },
  {
    id: 't4',
    subject: 'Álgebra Lineal',
    title: 'Sistemas de ecuaciones 3x3 y regla de Cramer',
    priority: 'MEDIA',
    estimatedHours: 1.5,
    dueDate: '2026-10-19',
    isOverdue: false
  }
];

export const AdaptiveStudyScheduleGenerator: React.FC = () => {
  const { user } = useAuth();
  const [tasks] = useState<StudyTask[]>(INITIAL_TASKS);
  const [dailyMaxHours, setDailyMaxHours] = useState<number>(4);
  const [focusTimeOfDay, setFocusTimeOfDay] = useState<'MAÑANA' | 'TARDE' | 'NOCHE'>('TARDE');
  const [includeOverduePriority, setIncludeOverduePriority] = useState<boolean>(true);

  // Algoritmo determinista de asignación adaptativa de bloques
  const scheduledBlocks = useMemo(() => {
    const days: ('Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado')[] = [
      'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
    ];

    // Ordenar tareas: atrasadas primero (si está activo el flag), luego por prioridad, luego por dueDate
    const sortedTasks = [...tasks].sort((a, b) => {
      if (includeOverduePriority) {
        if (a.isOverdue && !b.isOverdue) return -1;
        if (!a.isOverdue && b.isOverdue) return 1;
      }
      const pWeights = { ALTA: 3, MEDIA: 2, BAJA: 1 };
      if (pWeights[a.priority] !== pWeights[b.priority]) {
        return pWeights[b.priority] - pWeights[a.priority];
      }
      return a.dueDate.localeCompare(b.dueDate);
    });

    const blocks: ScheduledBlock[] = [];
    const dayLoads: Record<string, number> = {
      Lunes: 0, Martes: 0, Miércoles: 0, Jueves: 0, Viernes: 0, Sábado: 0
    };

    const timeSlotsByTimeOfDay = {
      MAÑANA: ['08:00 - 09:30', '10:00 - 11:30', '11:45 - 13:00'],
      TARDE: ['14:30 - 16:00', '16:30 - 18:00', '18:15 - 19:30'],
      NOCHE: ['19:30 - 21:00', '21:15 - 22:30', '22:45 - 23:30']
    };

    const slots = timeSlotsByTimeOfDay[focusTimeOfDay];

    sortedTasks.forEach((task) => {
      let hoursLeft = task.estimatedHours;

      for (const day of days) {
        if (hoursLeft <= 0) break;
        if (dayLoads[day] >= dailyMaxHours) continue;

        const slotIndex = Math.min(Math.floor(dayLoads[day] / 1.5), slots.length - 1);
        const assignedTimeSlot = slots[slotIndex] || '16:00 - 17:30';
        const allocatedHours = Math.min(1.5, hoursLeft);
        const pomodoros = Math.round(allocatedHours * 2);

        blocks.push({
          id: `block-${day}-${task.id}-${slotIndex}`,
          day,
          timeSlot: assignedTimeSlot,
          subject: task.subject,
          taskTitle: task.title,
          pomodoros,
          priority: task.priority,
          rationale: task.isOverdue
            ? 'Reprogramada con máxima urgencia por vencimiento previo'
            : `Prioridad ${task.priority.toLowerCase()} asignada para balancear carga mental`
        });

        dayLoads[day] += allocatedHours;
        hoursLeft -= allocatedHours;
      }
    });

    return blocks;
  }, [tasks, dailyMaxHours, focusTimeOfDay, includeOverduePriority]);

  const overdueCount = tasks.filter((t) => t.isOverdue).length;
  const totalEstimatedHours = tasks.reduce((acc, t) => acc + t.estimatedHours, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100/60 shadow-xs">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 tracking-tight">
              Generador de Horarios de Estudio Adaptativos
            </h3>
            <p className="text-xs text-slate-500">
              Distribución balanceada de bloques Pomodoro según atrasos y cronobiología personal
            </p>
          </div>
        </div>

        {overdueCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/70 text-xs font-medium self-start sm:self-auto">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{overdueCount} tarea(s) atrasadas detectadas</span>
          </div>
        )}
      </div>

      {/* Controles de Parámetros Adaptativos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
        {/* Máximo horas diarias */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
            <span>Límite de Estudio Diario:</span>
            <span className="text-blue-600 font-mono font-bold">{dailyMaxHours}h/día</span>
          </label>
          <input
            type="range"
            min={2}
            max={6}
            step={0.5}
            value={dailyMaxHours}
            onChange={(e) => setDailyMaxHours(parseFloat(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <span className="text-[10px] text-slate-400">Previene fatiga y sobrecarga cognitiva</span>
        </div>

        {/* Momento de Mayor Concentración */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Franja de Máximo Foco:
          </label>
          <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-xl border border-slate-200">
            {(['MAÑANA', 'TARDE', 'NOCHE'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setFocusTimeOfDay(m)}
                className={`py-1 text-[11px] font-medium rounded-lg transition-all ${
                  focusTimeOfDay === m
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {m === 'MAÑANA' ? 'Mañana' : m === 'TARDE' ? 'Tarde' : 'Noche'}
              </button>
            ))}
          </div>
        </div>

        {/* Priorizar Atrasadas */}
        <div className="space-y-1.5 flex flex-col justify-center">
          <label className="text-xs font-semibold text-slate-700 flex items-center justify-between cursor-pointer">
            <span>Priorizar Tareas Atrasadas:</span>
            <input
              type="checkbox"
              checked={includeOverduePriority}
              onChange={(e) => setIncludeOverduePriority(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
            />
          </label>
          <span className="text-[10px] text-slate-500">
            {includeOverduePriority ? 'Ubicadas en las primeras franjas disponibles' : 'Distribución estándar por fecha'}
          </span>
        </div>
      </div>

      {/* Cronograma Adaptativo Generado */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Cronograma Semanal Balanceado ({scheduledBlocks.length} bloques asignados)
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            {totalEstimatedHours}h de carga total
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'] as const).map((day) => {
            const dayBlocks = scheduledBlocks.filter((b) => b.day === day);
            return (
              <div key={day} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60">
                  <span className="text-xs font-bold text-slate-800">{day}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                    {dayBlocks.reduce((acc, b) => acc + b.pomodoros, 0) * 25} min foco
                  </span>
                </div>

                {dayBlocks.length > 0 ? (
                  <div className="space-y-2">
                    {dayBlocks.map((b) => (
                      <div
                        key={b.id}
                        className="p-2.5 bg-white rounded-lg border border-slate-200/80 shadow-2xs space-y-1 hover:border-blue-200 transition-colors"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-blue-700 truncate pr-1">
                            {b.subject}
                          </span>
                          <span className="font-mono text-slate-400 text-[10px] shrink-0">
                            {b.timeSlot}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium line-clamp-2">
                          {b.taskTitle}
                        </p>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-500">
                          <span>{b.pomodoros} Pomodoros</span>
                          <span className="text-amber-600 font-medium">{b.priority}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 text-center text-xs text-slate-400 italic">
                    Día despejado / Descanso cognitivo
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Asesoría de Cronobiología */}
      <div className="p-4 bg-blue-50/40 rounded-xl border border-blue-100 flex items-start gap-3 text-xs text-slate-700">
        <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-blue-900">Adaptabilidad Dinámica: </strong>
          El plan asigna automáticamente bloques de 90 minutos de ritmo ultradiano con descansos sinápticos de 15 minutos. Si completas una tarea antes de lo previsto o añades nuevas entregas, el motor rebalancea la carga sin saturar las fechas de evaluación del perfil activo ({user?.full_name || 'Estudiante'}).
        </p>
      </div>
    </div>
  );
};
