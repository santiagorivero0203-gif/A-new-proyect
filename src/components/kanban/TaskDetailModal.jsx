/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - MODAL DETALLE DE TAREA (NOTION AI STYLE)
 * ==============================================================================
 * Archivo: TaskDetailModal.jsx
 * ==============================================================================
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Clock,
  Calendar,
  AlertCircle,
  Lightbulb,
  Check,
  Bookmark,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { mapProfileToAcademicLevel } from '../../lib/pedagogicalPrompts';

export const TaskDetailModal = ({
  task,
  isOpen,
  onClose,
  onTaskUpdated,
}) => {
  const { user } = useAuth();

  const [currentTask, setCurrentTask] = useState(task);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [completedSubtasks, setCompletedSubtasks] = useState({});

  useEffect(() => {
    setCurrentTask(task);
    setErrorMessage(null);
    setIsAnalyzing(false);

    if (task?.ai_metadata?.subtasks) {
      const initialMap = {};
      task.ai_metadata.subtasks.forEach((st, idx) => {
        if (typeof st === 'object' && st.completed) {
          initialMap[idx] = true;
        }
      });
      setCompletedSubtasks(initialMap);
    } else {
      setCompletedSubtasks({});
    }
  }, [task]);

  // Suscripción Realtime en Supabase
  useEffect(() => {
    if (!isOpen || !currentTask || !isAnalyzing) return;

    const taskId = String(currentTask.id);
    const channelName = `realtime-task-breakdown-${taskId}`;

    console.log(`[TaskDetailModal Realtime] Escuchando actualizaciones para tarea ${taskId}`);

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'kanban_tasks',
          filter: `id=eq.${taskId}`,
        },
        (payload) => {
          handleRealtimeUpdate(payload.new);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_tasks',
          filter: `id=eq.${taskId}`,
        },
        (payload) => {
          handleRealtimeUpdate(payload.new);
        }
      )
      .subscribe();

    const poller = setInterval(async () => {
      try {
        let { data, error } = await supabase
          .from('kanban_tasks')
          .select('*')
          .eq('id', taskId)
          .maybeSingle();

        if (error || !data) {
          const res = await supabase
            .from('user_tasks')
            .select('*')
            .eq('id', taskId)
            .maybeSingle();
          data = res.data;
        }

        if (data && data.ai_metadata && Array.isArray(data.ai_metadata.subtasks)) {
          handleRealtimeUpdate(data);
          clearInterval(poller);
        }
      } catch {
        // Silencioso
      }
    }, 4000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(poller);
    };
  }, [isOpen, currentTask, isAnalyzing]);

  const handleRealtimeUpdate = (updatedRow) => {
    if (updatedRow && updatedRow.ai_metadata?.subtasks) {
      console.log('[TaskDetailModal Realtime] Desglose de IA recibido:', updatedRow);
      setCurrentTask(updatedRow);
      setIsAnalyzing(false);
      onTaskUpdated?.(updatedRow);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.55 },
          colors: ['#0F52BA', '#38bdf8', '#818cf8'],
        });
      } catch {
        // Fallback
      }
    }
  };

  const handleBreakdownWithAi = async () => {
    if (!currentTask) return;

    setErrorMessage(null);
    setIsAnalyzing(true);

    try {
      let userId = user?.id;
      if (!userId) {
        const { data: authData } = await supabase.auth.getUser();
        userId = authData?.user?.id;
      }

      if (!userId) {
        throw new Error('Debes iniciar sesión para usar el asistente de IA.');
      }

      const taskId = String(currentTask.id);
      const studentLevel = mapProfileToAcademicLevel(user?.academic_profile);

      // Inserción en la cola de IA
      const { error: queueError } = await supabase.from('ai_processing_queue').insert({
        user_id: userId,
        topic_title: `Desglose de Tarea: ${currentTask.title}`,
        document_url: `internal://kanban_tasks/${taskId}`,
        status: 'queued',
        processing_mode: 'auto_api',
        routing_mode: 'auto_api',
        academic_level: studentLevel,
        metadata: {
          type: 'task_breakdown',
          taskId: taskId,
          title: currentTask.title,
          subject: currentTask.subject,
          priority: currentTask.priority,
          academic_level: studentLevel,
          requested_at: new Date().toISOString(),
        },
      });

      if (queueError) {
        console.warn(`[TaskDetailModal] Error registrando en ai_processing_queue: ${queueError.message}`);
      }

      console.log(`[TaskDetailModal] Disparando Carril A autónomo (/api/nexus-worker) para tarea ${taskId}`);

      // Carril A: Invocación autónoma directa al worker de Gemini para respuesta en 2-4s
      try {
        const workerResponse = await fetch('/api/nexus-worker', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'task_breakdown',
            taskId: taskId,
            userId: userId,
            taskTitle: currentTask.title,
            subject: currentTask.subject,
            academicLevel: studentLevel,
          }),
        });

        if (workerResponse.ok) {
          const workerData = await workerResponse.json();
          if (workerData?.breakdown) {
            const updated = {
              ...currentTask,
              priority: workerData.breakdown.priority || currentTask.priority,
              ai_metadata: {
                ...workerData.breakdown,
                analyzed_at: new Date().toISOString(),
              },
            };
            setCurrentTask(updated);
            if (onTaskUpdated) onTaskUpdated(updated);
            setIsAnalyzing(false);

            try {
              confetti({
                particleCount: 60,
                spread: 50,
                origin: { y: 0.6 },
                colors: ['#0F52BA', '#3b82f6', '#60a5fa'],
              });
            } catch {
              // Degradación suave
            }
          }
        }
      } catch (workerErr) {
        console.warn('[TaskDetailModal] Fallback a suscripción realtime tras worker:', workerErr);
      }
    } catch (err) {
      console.error('[TaskDetailModal Error]:', err);
      setIsAnalyzing(false);
      setErrorMessage(
        err.message || 'No se pudo conectar con Nexus. Verifica tu conexión e inténtalo de nuevo.'
      );
    }
  };

  const toggleSubtaskCheck = (index) => {
    setCompletedSubtasks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!isOpen || !currentTask) return null;

  const isAnalyzed = Boolean(
    currentTask.ai_metadata &&
      Array.isArray(currentTask.ai_metadata.subtasks) &&
      currentTask.ai_metadata.subtasks.length > 0
  );

  const subtasks = currentTask.ai_metadata?.subtasks || [];
  const pomodoros = currentTask.ai_metadata?.estimated_pomodoros;
  const strategicAdvice = currentTask.ai_metadata?.strategic_advice;

  const completedCount = Object.values(completedSubtasks).filter(Boolean).length;
  const progressPercent =
    subtasks.length > 0 ? Math.round((completedCount / subtasks.length) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-2xl shadow-xl overflow-hidden my-8 animate-in zoom-in-95 duration-200"
      >
        {/* Barra Superior */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Bookmark className="w-3.5 h-3.5 text-[#0F52BA]" />
            <span>Tablero Kanban</span>
            <span>/</span>
            <span className="text-slate-800 font-semibold">{currentTask.subject || 'General'}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {errorMessage && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">No se pudo completar el desglose</p>
                <p className="text-xs text-red-600 mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Título */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 font-display tracking-tight leading-tight">
              {currentTask.title}
            </h2>

            <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200/80 font-medium">
                Materia: <strong className="text-slate-800">{currentTask.subject}</strong>
              </span>

              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg border font-semibold uppercase ${
                  currentTask.priority === 'ALTA'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : currentTask.priority === 'MEDIA'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                Prioridad {currentTask.priority}
              </span>

              {currentTask.due_date && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200/80 text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {currentTask.due_date}
                </span>
              )}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* DESGLOSE NOTION AI */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0F52BA]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 font-display">
                  Análisis Inteligente de Tarea
                </h3>
              </div>

              {!isAnalyzed && !isAnalyzing && (
                <button
                  type="button"
                  onClick={handleBreakdownWithAi}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0F52BA] hover:bg-[#0c4194] shadow-sm hover:shadow transition-all active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Desglosar con IA (Nexus)
                </button>
              )}
            </div>

            {/* Shimmer Effect */}
            {isAnalyzing && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/40 via-indigo-50/20 to-blue-50/40 border border-blue-200/60 space-y-4 animate-pulse">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#0F52BA]">
                  <Sparkles className="w-4 h-4 animate-spin text-[#0F52BA]" />
                  <span>Nexus AI está desglosando pasos, estimando pomodoros y formulando estrategia...</span>
                </div>

                <div className="space-y-2.5 pt-1">
                  <div className="h-4 bg-slate-200/70 rounded-md w-4/5 animate-pulse" />
                  <div className="h-4 bg-slate-200/70 rounded-md w-full animate-pulse" />
                  <div className="h-4 bg-slate-200/70 rounded-md w-3/4 animate-pulse" />
                  <div className="h-4 bg-slate-200/70 rounded-md w-2/3 animate-pulse" />
                </div>
              </div>
            )}

            {!isAnalyzed && !isAnalyzing && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-3">
                <p className="text-sm text-slate-600 font-normal">
                  ¿Es una meta grande o compleja? Deja que <strong>Nexus (Gemini Spark)</strong> cree un plan de acción
                  paso a paso, calcule bloques Pomodoro y te sugiera la mejor estrategia.
                </p>
                <button
                  type="button"
                  onClick={handleBreakdownWithAi}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0F52BA] hover:bg-[#0c4194] shadow-sm transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  ✨ Desglosar con IA (Nexus)
                </button>
              </div>
            )}

            {isAnalyzed && !isAnalyzing && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pomodoros && (
                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-amber-900 uppercase tracking-wide">
                          Estimación Pomodoro
                        </p>
                        <p className="text-xs text-amber-800 font-medium">
                          {pomodoros} {pomodoros === 1 ? 'bloque' : 'bloques'} de 25 min (~{pomodoros * 25} min)
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#0F52BA] flex items-center justify-center shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center text-[11px] font-semibold text-blue-900 uppercase">
                        <span>Progreso de Subtareas</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-blue-200/60 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-[#0F52BA] rounded-full transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {strategicAdvice && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-3 text-xs leading-relaxed text-slate-700">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0F52BA] flex items-center justify-center shrink-0 mt-0.5">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <span className="font-bold text-slate-900 block mb-0.5">
                        Consejo Estratégico de Nexus:
                      </span>
                      {strategicAdvice}
                    </div>
                  </div>
                )}

                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                    <span>Lista de Acciones Paso a Paso</span>
                    <span className="text-slate-400 font-normal">
                      {completedCount} de {subtasks.length} completadas
                    </span>
                  </div>

                  <div className="space-y-2">
                    {subtasks.map((item, idx) => {
                      const text = typeof item === 'string' ? item : item.text;
                      const isChecked = Boolean(completedSubtasks[idx]);

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleSubtaskCheck(idx)}
                          className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                            isChecked
                              ? 'bg-slate-50/80 border-slate-200 text-slate-400'
                              : 'bg-white border-slate-200 hover:border-[#0F52BA]/30 hover:bg-slate-50/40 text-slate-800'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isChecked
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300 bg-white hover:border-[#0F52BA]'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <span
                            className={`text-xs font-medium leading-relaxed ${
                              isChecked ? 'line-through text-slate-400' : 'text-slate-800'
                            }`}
                          >
                            {text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleBreakdownWithAi}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F52BA] hover:text-[#0c4194] transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Regenerar desglose con IA
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pie */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                currentTask.completed ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            <span className="text-xs font-medium text-slate-600">
              {currentTask.completed ? 'Tarea Completada' : 'En Progreso'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors shadow-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
