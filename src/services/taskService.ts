/**
 * Servicio de Tareas Académicas Aisladas por Cuenta de Estudiante
 * Garantiza persistencia independiente y cero fuga de datos entre perfiles.
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
  return `cpe_${userId}_tasks_v2`;
}

/**
 * Semillas académicas iniciales personalizadas por estudiante si no tienen datos previos
 */
function getInitialTasksForUser(userId: string): TaskItem[] {
  if (userId.includes('santiago') || userId === 'santiago-003-uuid') {
    return [
      {
        id: 101,
        title: 'Preparar informe de laboratorio de Física III: Inducción Electromagnética',
        subject: 'Física',
        priority: 'ALTA',
        dueDate: 'Hoy, 6:00 PM',
        completed: false,
      },
      {
        id: 102,
        title: 'Resolver ejercicios de integrales triples y coordenadas cilíndricas',
        subject: 'Matemática',
        priority: 'ALTA',
        dueDate: 'Mañana',
        completed: false,
      },
      {
        id: 103,
        title: 'Revisar apuntes de ecuaciones canónicas de Hamilton',
        subject: 'Física',
        priority: 'MEDIA',
        dueDate: 'Viernes',
        completed: true,
      },
    ];
  }

  if (userId.includes('andres') || userId === 'andres-001-uuid') {
    return [
      {
        id: 201,
        title: 'Resolver guía de operaciones combinadas con fracciones y enteros',
        subject: 'Matemática',
        priority: 'ALTA',
        dueDate: 'Hoy, 5:00 PM',
        completed: false,
      },
      {
        id: 202,
        title: 'Lectura comprensiva de Castellano y cuadro de figuras literarias',
        subject: 'Castellano',
        priority: 'MEDIA',
        dueDate: 'Mañana',
        completed: false,
      },
      {
        id: 203,
        title: 'Dibujo de célula vegetal y animal con sus partes para Biología',
        subject: 'Biología',
        priority: 'MEDIA',
        dueDate: 'Jueves',
        completed: true,
      },
    ];
  }

  if (userId.includes('prima') || userId === 'prima-002-uuid') {
    return [
      {
        id: 301,
        title: 'Simulacro cronometrado de Razonamiento Lógico Numérico (Simadi)',
        subject: 'Matemática',
        priority: 'ALTA',
        dueDate: 'Hoy, 4:00 PM',
        completed: false,
      },
      {
        id: 302,
        title: 'Guía de Química Orgánica: Nomenclatura de hidrocarburos y grupos funcionales',
        subject: 'Química',
        priority: 'ALTA',
        dueDate: 'Mañana',
        completed: false,
      },
      {
        id: 303,
        title: 'Práctica de Cinemática: Lanzamiento de proyectiles y vectores',
        subject: 'Física',
        priority: 'MEDIA',
        dueDate: 'Viernes',
        completed: false,
      },
    ];
  }

  if (userId.includes('mafe') || userId === 'mafe-004-uuid') {
    return [
      {
        id: 401,
        title: 'Entrega de lámina de composición tipográfica y retícula editorial',
        subject: 'Diseño',
        priority: 'ALTA',
        dueDate: 'Hoy, 7:00 PM',
        completed: false,
      },
      {
        id: 402,
        title: 'Ajuste de cotas y tolerancias para modelado técnico en taller',
        subject: 'Diseño',
        priority: 'ALTA',
        dueDate: 'Miércoles',
        completed: false,
      },
      {
        id: 403,
        title: 'Moodboard de materiales y texturas para presentación de proyecto',
        subject: 'Diseño',
        priority: 'BAJA',
        dueDate: 'Viernes',
        completed: true,
      },
    ];
  }

  return [
    {
      id: 501,
      title: 'Planificar sesiones de estudio de la semana',
      subject: 'Productividad',
      priority: 'MEDIA',
      dueDate: 'Hoy',
      completed: false,
    },
  ];
}

export const taskService = {
  getTasks(userId: string = 'santiago-003-uuid'): TaskItem[] {
    const key = getTasksStorageKey(userId);
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        // Fallback
      }
    }
    const initial = getInitialTasksForUser(userId);
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  },

  saveTasks(userId: string = 'santiago-003-uuid', tasks: TaskItem[]): void {
    localStorage.setItem(getTasksStorageKey(userId), JSON.stringify(tasks));
  },

  addTask(userId: string = 'santiago-003-uuid', task: Omit<TaskItem, 'id' | 'completed'>): TaskItem {
    const tasks = this.getTasks(userId);
    const newTask: TaskItem = {
      ...task,
      id: Date.now(),
      completed: false,
    };
    const updated = [newTask, ...tasks];
    this.saveTasks(userId, updated);
    return newTask;
  },

  toggleTask(userId: string = 'santiago-003-uuid', id: number): TaskItem[] {
    const tasks = this.getTasks(userId);
    const updated = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    this.saveTasks(userId, updated);
    return updated;
  },

  deleteTask(userId: string = 'santiago-003-uuid', id: number): TaskItem[] {
    const tasks = this.getTasks(userId);
    const updated = tasks.filter((t) => t.id !== id);
    this.saveTasks(userId, updated);
    return updated;
  },
};
