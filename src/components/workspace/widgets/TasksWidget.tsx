import React, { useState } from 'react';
import { CheckCircleIcon, FlameIcon, TrophyIcon, PlusIcon } from '../../common/Icons';
import confetti from 'canvas-confetti';

interface TaskItem {
  id: number;
  title: string;
  subject: string;
  priority: 'ALTA' | 'MEDIA' | 'BAJA';
  dueDate: string;
  completed: boolean;
}

export const TasksWidget: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 1,
      title: 'Resolver guía de ejercicios asignados',
      subject: 'Matemática',
      priority: 'ALTA',
      dueDate: 'Hoy, 6:00 PM',
      completed: false,
    },
    {
      id: 2,
      title: 'Repasar conceptos clave y glosario técnico',
      subject: 'Castellano & Biología',
      priority: 'MEDIA',
      dueDate: 'Mañana',
      completed: true,
    },
    {
      id: 3,
      title: 'Completar bloque de 25 min de concentración sin interrupciones',
      subject: 'Hábito de Estudio',
      priority: 'ALTA',
      dueDate: 'Hoy',
      completed: true,
    },
    {
      id: 4,
      title: 'Revisar apuntes y constantes universales',
      subject: 'Física & Química',
      priority: 'BAJA',
      dueDate: 'Viernes',
      completed: false,
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Matemática');
  const [newPriority, setNewPriority] = useState<'ALTA' | 'MEDIA' | 'BAJA'>('MEDIA');

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.completed;
          if (nextState) {
            confetti({
              particleCount: 30,
              spread: 45,
              origin: { y: 0.8 },
              colors: ['#0F52BA', '#10B981', '#F59E0B'],
            });
          }
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: TaskItem = {
      id: Date.now(),
      title: newTitle.trim(),
      subject: newSubject,
      priority: newPriority,
      dueDate: 'Programado',
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setNewTitle('');
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-card p-6 flex flex-col justify-between h-full bg-white border border-slate-200/80 shadow-soft">
      <div className="space-y-4">
        {/* Cabecera del Widget */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500" />
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Tareas & Metas Diarias
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {completedCount} de {tasks.length} completadas ({Math.round((completedCount / (tasks.length || 1)) * 100)}%)
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold">
            {tasks.length - completedCount} pendientes
          </span>
        </div>

        {/* Formulario rápido para añadir tarea */}
        <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Añadir nueva tarea o meta de estudio..."
            className="input-clean flex-1 text-xs"
          />
          <div className="flex items-center gap-2">
            <select
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
            >
              <option value="Matemática">Matemática</option>
              <option value="Física">Física</option>
              <option value="Química">Química</option>
              <option value="Biología">Biología</option>
              <option value="Castellano">Castellano</option>
              <option value="Diseño">Diseño</option>
            </select>
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as 'ALTA' | 'MEDIA' | 'BAJA')}
              className="px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
            >
              <option value="ALTA">Alta</option>
              <option value="MEDIA">Media</option>
              <option value="BAJA">Baja</option>
            </select>
            <button
              type="submit"
              className="btn-brand text-xs py-2 px-3 flex items-center gap-1 shrink-0"
            >
              <PlusIcon className="w-3.5 h-3.5" />
              <span>Añadir</span>
            </button>
          </div>
        </form>

        {/* Lista de Tareas */}
        <div className="space-y-2 pt-1 max-h-[320px] overflow-y-auto pr-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                task.completed
                  ? 'bg-slate-50/70 border-slate-200/50 opacity-60'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-soft-sm'
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
                    className={`text-xs font-medium ${
                      task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-semibold text-slate-500">{task.subject}</span>
                    <span className="text-[10px] text-slate-400 font-mono">• {task.dueDate}</span>
                  </div>
                </div>
              </div>

              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-md font-mono ${
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

      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1 text-amber-600 font-semibold text-[11px]">
          <FlameIcon className="w-3.5 h-3.5 text-amber-500" />
          Racha constante
        </span>
        <span className="flex items-center gap-1 text-brand-600 font-semibold font-mono text-[11px]">
          <TrophyIcon className="w-3.5 h-3.5 text-brand-500" />
          +150 XP al completar todas
        </span>
      </div>
    </div>
  );
};
