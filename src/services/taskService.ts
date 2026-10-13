/**
 * Servicio de Tareas Académicas Aisladas por Cuenta de Estudiante (Directriz Estado Cero)
 * 
 * Regla de Producción:
 * Cero tareas de prueba o ficticias. Inicia estrictamente con 0 registros
 * hasta que el estudiante agregue sus propias tareas o metas.
 */

export interface TaskItem {
  id: number;
  title: string;
  subject: string;
  priority: 'ALTA' | 'MEDIA' | 'BAJA';
  dueDate: string;
  completed: boolean;
}

function getTasksStorageKey(userId: string): string {
  return `cpe_${userId}_tasks_clean_v1`;
}

export const taskService = {
  /**
   * Obtiene las tareas del estudiante. Inicia vacío (0 registros).
   */
  getTasks(userId: string): TaskItem[] {
    const key = getTasksStorageKey(userId);
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // Fallback a array vacío
      }
    }
    return [];
  },

  /**
   * Guarda las tareas del estudiante
   */
  saveTasks(userId: string, tasks: TaskItem[]): void {
    const key = getTasksStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(tasks));
  },

  /**
   * Añade una nueva tarea
   */
  addTask(userId: string, task: Omit<TaskItem, 'id' | 'completed'>): TaskItem {
    const current = this.getTasks(userId);
    const newTask: TaskItem = {
      ...task,
      id: Date.now(),
      completed: false,
    };
    const updated = [newTask, ...current];
    this.saveTasks(userId, updated);
    return newTask;
  },

  /**
   * Alterna el estado completado de una tarea
   */
  toggleTask(userId: string, taskId: number): TaskItem[] {
    const current = this.getTasks(userId);
    const updated = current.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
    this.saveTasks(userId, updated);
    return updated;
  },

  /**
   * Elimina una tarea
   */
  deleteTask(userId: string, taskId: number): TaskItem[] {
    const current = this.getTasks(userId);
    const updated = current.filter((t) => t.id !== taskId);
    this.saveTasks(userId, updated);
    return updated;
  },

  /**
   * Limpia todas las tareas
   */
  clearAll(userId: string): void {
    localStorage.removeItem(getTasksStorageKey(userId));
  },
};
