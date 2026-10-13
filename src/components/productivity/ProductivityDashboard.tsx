import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  CheckCircleIcon,
  FlameIcon,
  TrophyIcon,
} from '../common/Icons';
import { PomodoroWidget } from '../workspace/widgets/PomodoroWidget';

interface TaskItem {
  id: number;
  title: string;
  subject: string;
  priority: 'ALTA' | 'MEDIA' | 'BAJA';
  dueDate: string;
  completed: boolean;
}

export const ProductivityDashboard: React.FC = () => {
  const { user } = useAuth();

  // Lista de Tareas y Recordatorios de Estudio
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 1,
      title: 'Resolver guía de ejercicios prácticos asignados',
      subject: 'Matemática',
      priority: 'ALTA',
      dueDate: 'Hoy, 6:00 PM',
      completed: false,
    },
    {
      id: 2,
      title: 'Repasar conceptos clave y vocabulario técnico',
      subject: 'Castellano & Biología',
      priority: 'MEDIA',
      dueDate: 'Mañana',
      completed: true,
    },
    {
      id: 3,
      title: 'Completar bloque de concentración de 25 minutos sin teléfono',
      subject: 'Hábito de Estudio',
      priority: 'ALTA',
      dueDate: 'Hoy',
      completed: true,
    },
    {
      id: 4,
      title: 'Revisar apuntes de fórmulas y constantes universales',
      subject: 'Física & Química',
      priority: 'BAJA',
      dueDate: 'Viernes',
      completed: false,
    },
  ]);

  // Formulario de nueva tarea
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('Matemática');
  const [newTaskPriority, setNewTaskPriority] = useState<'ALTA' | 'MEDIA' | 'BAJA'>('MEDIA');

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const next = !t.completed;
          if (next) {
            confetti({
              particleCount: 30,
              spread: 45,
              origin: { y: 0.8 },
            });
          }
          return { ...t, completed: next };
        }
        return t;
      })
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: TaskItem = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      subject: newTaskSubject,
      priority: newTaskPriority,
      dueDate: 'Programado',
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-8">
      {/* Banner de Productividad Estudiantil */}
      <div className="app-card p-6 sm:p-8 bg-white border border-slate-200/90 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Centro de Productividad Estudiantil
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
              Bienvenido, {user?.full_name || 'Estudiante'}
            </h1>
            <p className="text-sm text-slate-500 max-w-xl">
              Sistema unificado de gestión de tareas, recordatorios de estudio y sesiones de alta concentración.
            </p>
          </div>

          {/* Métricas Principales */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <FlameIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Racha Activa</p>
                <p className="text-xl font-bold text-slate-900">{user?.streak_days || 12} Días</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <TrophyIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Puntos XP</p>
                <p className="text-xl font-bold text-blue-600 font-mono">{user?.xp_points || 2400}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna Izquierda (7 cols): Tareas y Recordatorios */}
        <div className="lg:col-span-7 space-y-6">
          <div className="app-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">Tareas y Recordatorios</h3>
                <p className="text-xs text-slate-500">
                  {completedCount} de {tasks.length} tareas completadas hoy ({Math.round((completedCount / (tasks.length || 1)) * 100)}%)
                </p>
              </div>
              <span className="app-badge font-mono">{tasks.length - completedCount} pendientes</span>
            </div>

            {/* Formulario para Crear Recordatorio */}
            <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Añadir nueva tarea o recordatorio de estudio..."
                className="input-clean flex-1"
              />
              <div className="flex items-center gap-2">
                <select
                  value={newTaskSubject}
                  onChange={(e) => setNewTaskSubject(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
                >
                  <option value="Matemática">Matemática</option>
                  <option value="Física">Física</option>
                  <option value="Química">Química</option>
                  <option value="Biología">Biología</option>
                  <option value="Castellano">Castellano</option>
                </select>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as 'ALTA' | 'MEDIA' | 'BAJA')}
                  className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
                >
                  <option value="ALTA">Alta</option>
                  <option value="MEDIA">Media</option>
                  <option value="BAJA">Baja</option>
                </select>
                <button type="submit" className="btn-brand shrink-0 text-xs py-2.5 px-4">
                  Añadir
                </button>
              </div>
            </form>

            {/* Lista de Tareas */}
            <div className="space-y-2 pt-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    task.completed
                      ? 'bg-slate-50/70 border-slate-200/60 opacity-60'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-soft-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                        task.completed
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {task.completed && <CheckCircleIcon className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-semibold text-slate-500">{task.subject}</span>
                        <span className="text-[10px] text-slate-400 font-mono">• {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      task.priority === 'ALTA'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : task.priority === 'MEDIA'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna Derecha (5 cols): Temporizador Pomodoro de Concentración (Aislado) */}
        <div className="lg:col-span-5 space-y-6">
          <PomodoroWidget />
        </div>
      </div>
    </div>
  );
};
