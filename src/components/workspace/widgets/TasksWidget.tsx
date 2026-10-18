import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { taskService, type TaskItem } from '../../../services/taskService';
import { CheckCircleIcon, PlusIcon, TrashIcon } from '../../common/Icons';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TaskDetailModal } from '../../kanban/TaskDetailModal';
import type { TaskItemData } from '../../kanban/TaskCard';

export const TasksWidget: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id || 'santiago-003-uuid';

  const [tasks, setTasks] = useState<TaskItem[]>(() => taskService.getTasks(userId));
  const [selectedDetailTask, setSelectedDetailTask] = useState<TaskItemData | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Matemática');
  const [newPriority, setNewPriority] = useState<'ALTA' | 'MEDIA' | 'BAJA'>('MEDIA');

  // Recargar tareas de inmediato cuando cambia el estudiante
  useEffect(() => {
    setTasks(taskService.getTasks(userId));
  }, [userId]);

  const toggleTask = (id: number) => {
    const target = tasks.find((t) => t.id === id);
    const updated = taskService.toggleTask(userId, id);
    setTasks(updated);

    if (target && !target.completed) {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#0F52BA', '#059669', '#3B82F6'],
      });
    }
  };

  const handleDeleteTask = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const updated = taskService.deleteTask(userId, id);
    setTasks(updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    taskService.addTask(userId, {
      title: newTitle.trim(),
      subject: newSubject,
      priority: newPriority,
      dueDate: 'Programado',
    });

    setTasks(taskService.getTasks(userId));
    setNewTitle('');
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-card p-6 flex flex-col justify-between h-full bg-white border border-slate-200/80 shadow-soft">
      <div className="space-y-4">
        {/* Cabecera del Widget */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
              <CheckCircleIcon className="w-5 h-5 text-brand-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-sans">
                Tareas & Metas Académicas
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {completedCount} de {tasks.length} completadas ({Math.round((completedCount / (tasks.length || 1)) * 100)}%)
              </p>
            </div>
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
              className="btn-brand text-xs py-2 px-3 flex items-center gap-1.5 shrink-0"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Añadir</span>
            </button>
          </div>
        </form>

        {/* Lista de Tareas Limpia */}
        <div className="divide-y divide-slate-100 max-h-[320px] overflow-y-auto pr-1">
          {tasks.length === 0 ? (
            <div className="py-6 px-2">
              <div className="bg-slate-50/60 border border-dashed border-slate-200/90 rounded-2xl p-6 text-center flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-slate-400 flex items-center justify-center mb-2 shadow-soft-sm">
                  <CheckCircleIcon className="w-5 h-5 text-slate-400" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 font-sans">
                  No tienes tareas pendientes
                </h4>
                <p className="text-[11px] text-slate-500 max-w-xs mt-0.5">
                  Escribe una meta de estudio arriba para comenzar a organizar tu día.
                </p>
              </div>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`py-3 px-2 rounded-xl transition-colors duration-150 cursor-pointer flex items-center justify-between gap-3 group ${
                  task.completed ? 'opacity-50 hover:bg-slate-50/50' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTask(task.id);
                    }}
                    className={`w-5 h-5 rounded-lg flex items-center justify-center transition-transform duration-150 active:scale-95 shrink-0 ${
                      task.completed
                        ? 'bg-emerald-600 text-white shadow-soft-sm'
                        : 'border border-slate-300 hover:border-slate-500 bg-white'
                    }`}
                  >
                    {task.completed && <CheckCircleIcon className="w-3.5 h-3.5" />}
                  </button>

                  <div className="min-w-0">
                    <p
                      className={`text-xs font-medium leading-snug truncate ${
                        task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 font-mono">
                      <span className="font-semibold text-slate-600 font-sans">{task.subject}</span>
                      <span>• {task.dueDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full font-mono ${
                      task.priority === 'ALTA'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : task.priority === 'MEDIA'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {task.priority}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDetailTask({
                        id: task.id,
                        title: task.title,
                        subject: task.subject,
                        priority: task.priority,
                        due_date: task.dueDate,
                        completed: task.completed,
                      });
                    }}
                    className="p-1.5 text-slate-400 hover:text-[#0F52BA] hover:bg-blue-50 transition-all rounded-lg"
                    title="Desglosar y enriquecer con IA (Notion AI)"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#0F52BA]" />
                  </button>

                  <button
                    onClick={(e) => handleDeleteTask(e, task.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all rounded-lg"
                    title="Eliminar tarea"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="text-[11px] text-slate-500">
          {completedCount === tasks.length ? 'Todas las tareas completadas' : `${tasks.length - completedCount} pendientes`}
        </span>
        <span className="text-[11px] text-slate-400 font-mono">
          {tasks.length} registradas
        </span>
      </div>

      {/* Modal de Desglose Inteligente con IA (Notion AI Style) */}
      <TaskDetailModal
        task={selectedDetailTask}
        isOpen={Boolean(selectedDetailTask)}
        onClose={() => setSelectedDetailTask(null)}
        onTaskUpdated={(updated) => {
          const currentList = taskService.getTasks(userId);
          const updatedList = currentList.map((t) =>
            t.id === Number(updated.id)
              ? {
                  ...t,
                  title: updated.title,
                  priority: updated.priority,
                  completed: updated.completed,
                }
              : t
          );
          taskService.saveTasks(userId, updatedList);
          setTasks(updatedList);
        }}
      />
    </div>
  );
};
