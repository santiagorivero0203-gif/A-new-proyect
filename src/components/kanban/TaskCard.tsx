/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - TARJETA DE TAREA KANBAN (NOTION STYLE)
 * ==============================================================================
 * Componente: TaskCard.tsx
 * Estética: Apple & Notion Minimalist (bg-white, rounded-2xl, Azul Cobalto #0F52BA)
 * ==============================================================================
 */

import React from 'react';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  Circle,
  Calendar,
  Layers,
} from 'lucide-react';

export interface TaskItemData {
  id: string | number;
  user_id?: string;
  title: string;
  subject: string;
  priority: 'ALTA' | 'MEDIA' | 'BAJA';
  due_date?: string;
  completed: boolean;
  status?: string;
  ai_metadata?: {
    priority?: 'ALTA' | 'MEDIA' | 'BAJA';
    estimated_pomodoros?: number;
    subtasks?: (string | { id?: string; text: string; completed?: boolean })[];
    strategic_advice?: string;
    analyzed_at?: string;
  };
}

export interface TaskCardProps {
  task: TaskItemData;
  onClick?: (task: TaskItemData) => void;
  onToggleComplete?: (taskId: string | number, currentCompleted: boolean) => void;
  className?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onClick,
  onToggleComplete,
  className = '',
}) => {
  const isAnalyzed = Boolean(
    task.ai_metadata &&
      Array.isArray(task.ai_metadata.subtasks) &&
      task.ai_metadata.subtasks.length > 0
  );

  const subtasksCount = task.ai_metadata?.subtasks?.length || 0;
  const pomodoros = task.ai_metadata?.estimated_pomodoros || null;

  // Clases cromáticas de prioridad al estilo Notion
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'ALTA':
        return 'bg-rose-50 text-rose-700 border-rose-200/80';
      case 'MEDIA':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'BAJA':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Si se hizo clic en el botón de checkbox, no abrir el modal
    if ((e.target as HTMLElement).closest('.task-checkbox-btn')) {
      return;
    }
    onClick?.(task);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-sm hover:shadow-md hover:border-[#0F52BA]/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none ${
        task.completed ? 'opacity-65 bg-slate-50/70' : ''
      } ${className}`}
    >
      {/* Fila Superior: Materia + Prioridad */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg truncate max-w-[140px]">
          {task.subject || 'General'}
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Badge de Notion AI si fue desglosada */}
          {isAnalyzed && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-blue-50 text-[#0F52BA] border border-blue-200/60"
              title="Tarea desglosada con Nexus AI"
            >
              <Sparkles className="w-2.5 h-2.5" />
              Notion AI
            </span>
          )}

          <span
            className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-lg border ${getPriorityBadge(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      {/* Título de la Tarea con Checkbox interactivo */}
      <div className="flex items-start gap-2.5 mb-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete?.(task.id, task.completed);
          }}
          className="task-checkbox-btn mt-0.5 text-slate-400 hover:text-[#0F52BA] transition-colors shrink-0"
          title={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
        >
          {task.completed ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50" />
          ) : (
            <Circle className="w-4 h-4 hover:stroke-[#0F52BA]" />
          )}
        </button>

        <h4
          className={`text-sm font-semibold text-slate-800 leading-snug line-clamp-2 ${
            task.completed ? 'line-through text-slate-400 font-normal' : ''
          }`}
        >
          {task.title}
        </h4>
      </div>

      {/* Pie de Tarjeta: Subtareas & Pomodoros & Fecha */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3">
          {isAnalyzed ? (
            <span
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600"
              title={`${subtasksCount} subtareas generadas`}
            >
              <Layers className="w-3.5 h-3.5 text-[#0F52BA]" />
              {subtasksCount} {subtasksCount === 1 ? 'paso' : 'pasos'}
            </span>
          ) : (
            <span className="text-[11px] text-slate-400">Sin desglosar</span>
          )}

          {pomodoros && (
            <span
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600"
              title={`${pomodoros} bloques Pomodoro (~${pomodoros * 25} min)`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {pomodoros} {pomodoros === 1 ? 'pomo' : 'pomos'}
            </span>
          )}
        </div>

        {task.due_date && (
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
            <Calendar className="w-3 h-3" />
            {task.due_date}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
