import type {
  EvaluationEvent,
  StudyReminder,
  StudyNote,
  SubjectEvaluationPlan,
} from '../types/academicPlanner.types';

function getEventsKey(userId: string = 'santiago_fisica_ucv'): string {
  return `cpe_${userId}_events_v2`;
}

function getRemindersKey(userId: string = 'santiago_fisica_ucv'): string {
  return `cpe_${userId}_reminders_v2`;
}

function getNotesKey(userId: string = 'santiago_fisica_ucv'): string {
  return `cpe_${userId}_notes_v2`;
}

function getInitialEventsForUser(userId: string): EvaluationEvent[] {
  if (userId.includes('santiago') || userId === 'santiago-003-uuid') {
    return [
      {
        id: 'eval-sat-1',
        title: 'Parcial II de Mecánica Teórica: Dinámica Lagrangiana',
        subject: 'Física',
        date: '2026-10-28',
        time: '08:00 AM',
        type: 'PARCIAL',
        weightPercentage: 30,
        location: 'Facultad de Ciencias - Aula 102',
      },
      {
        id: 'eval-sat-2',
        title: 'Evaluación de Cálculo III: Integrales Múltiples en ℝ³',
        subject: 'Matemática',
        date: '2026-11-04',
        time: '10:00 AM',
        type: 'PARCIAL',
        weightPercentage: 25,
        location: 'Escuela de Matemática - Aula 204',
      },
    ];
  }

  if (userId.includes('andres') || userId === 'andres-001-uuid') {
    return [
      {
        id: 'eval-and-1',
        title: 'Evaluación Sumativa: Números Enteros y Fracciones',
        subject: 'Matemática',
        date: '2026-10-25',
        time: '07:30 AM',
        type: 'PARCIAL',
        weightPercentage: 20,
        location: 'Salón 1-B',
      },
      {
        id: 'eval-and-2',
        title: 'Taller Grupal de Biología: Estructura Celular y Reinos',
        subject: 'Biología',
        date: '2026-10-29',
        time: '09:00 AM',
        type: 'TALLER',
        weightPercentage: 20,
        location: 'Laboratorio de Ciencias',
      },
    ];
  }

  if (userId.includes('prima') || userId === 'prima-002-uuid') {
    return [
      {
        id: 'eval-pri-1',
        title: 'Simulacro Diagnóstico Tipo Admisión UCV / OPSU',
        subject: 'Matemática',
        date: '2026-10-27',
        time: '08:00 AM',
        type: 'PARCIAL',
        weightPercentage: 30,
        location: 'Auditorio Central',
      },
      {
        id: 'eval-pri-2',
        title: 'Prueba de Química Orgánica: Hidrocarburos y Estequiometría',
        subject: 'Química',
        date: '2026-11-02',
        time: '10:00 AM',
        type: 'PARCIAL',
        weightPercentage: 25,
        location: 'Salón 5-A',
      },
    ];
  }

  if (userId.includes('mafe') || userId === 'mafe-004-uuid') {
    return [
      {
        id: 'eval-maf-1',
        title: 'Pre-entrega de Láminas de Ergonomía & Usabilidad',
        subject: 'Diseño',
        date: '2026-10-26',
        time: '02:00 PM',
        type: 'PROYECTO',
        weightPercentage: 30,
        location: 'Escuela de Diseño - Taller 3',
      },
      {
        id: 'eval-maf-2',
        title: 'Revisión de Portafolio Tipográfico & Retículas',
        subject: 'Diseño',
        date: '2026-11-03',
        time: '03:00 PM',
        type: 'PROYECTO',
        weightPercentage: 25,
        location: 'Taller 1',
      },
    ];
  }

  return [];
}

function getInitialRemindersForUser(userId: string): StudyReminder[] {
  if (userId.includes('santiago') || userId === 'santiago-003-uuid') {
    return [
      {
        id: 'rem-sat-1',
        title: 'Completar informe de laboratorio de electromagnetismo',
        subject: 'Física',
        dueDate: '2026-10-26',
        priority: 'ALTA',
        completed: false,
        createdAt: '2026-10-12T12:00:00Z',
      },
      {
        id: 'rem-sat-2',
        title: 'Repasar tensores métricos y coordenadas polares en LaTeX',
        subject: 'Matemática',
        dueDate: '2026-10-30',
        priority: 'MEDIA',
        completed: false,
        createdAt: '2026-10-12T12:00:00Z',
      },
    ];
  }

  if (userId.includes('andres') || userId === 'andres-001-uuid') {
    return [
      {
        id: 'rem-and-1',
        title: 'Repasar tabla de multiplicar y propiedades distributivas',
        subject: 'Matemática',
        dueDate: '2026-10-24',
        priority: 'ALTA',
        completed: false,
        createdAt: '2026-10-12T12:00:00Z',
      },
      {
        id: 'rem-and-2',
        title: 'Lectura de Castellano: glosario de términos nuevos',
        subject: 'Castellano',
        dueDate: '2026-10-27',
        priority: 'MEDIA',
        completed: false,
        createdAt: '2026-10-12T12:00:00Z',
      },
    ];
  }

  if (userId.includes('prima') || userId === 'prima-002-uuid') {
    return [
      {
        id: 'rem-pri-1',
        title: 'Completar bloque de 20 preguntas del banco Simadi Lógico Numérico',
        subject: 'Matemática',
        dueDate: '2026-10-25',
        priority: 'ALTA',
        completed: false,
        createdAt: '2026-10-12T12:00:00Z',
      },
      {
        id: 'rem-pri-2',
        title: 'Memorizar constantes de física y factores de conversión',
        subject: 'Física',
        dueDate: '2026-10-29',
        priority: 'ALTA',
        completed: false,
        createdAt: '2026-10-12T12:00:00Z',
      },
    ];
  }

  if (userId.includes('mafe') || userId === 'mafe-004-uuid') {
    return [
      {
        id: 'rem-maf-1',
        title: 'Ajustar especificaciones de materiales y radios concéntricos',
        subject: 'Diseño',
        dueDate: '2026-10-25',
        priority: 'ALTA',
        completed: false,
        createdAt: '2026-10-12T12:00:00Z',
      },
    ];
  }

  return [];
}

function getInitialNotesForUser(userId: string): StudyNote[] {
  if (userId.includes('santiago') || userId === 'santiago-003-uuid') {
    return [
      {
        id: 'note-sat-1',
        title: 'Ecuaciones Canónicas de Hamilton & Espacio de Fase',
        subject: 'Física',
        content: 'Recordar que las variables canónicas son las posiciones q_i y los momentos conjugados p_i = \\frac{\\partial L}{\\partial \\dot{q}_i}. La derivada temporal es \\dot{q}_i = \\frac{\\partial H}{\\partial p_i} y \\dot{p}_i = -\\frac{\\partial H}{\\partial q_i}.',
        updatedAt: '2026-10-12T18:00:00Z',
        tags: ['Física', 'Hamiltoniano'],
      },
    ];
  }

  if (userId.includes('andres') || userId === 'andres-001-uuid') {
    return [
      {
        id: 'note-and-1',
        title: 'Regla de los Signos en Operaciones Aritméticas',
        subject: 'Matemática',
        content: 'Más por más da más. Menos por menos da más. Signos contrarios dan menos. Siempre resolver primero lo que está dentro de los paréntesis.',
        updatedAt: '2026-10-12T14:30:00Z',
        tags: ['Matemática', 'Aritmética'],
      },
    ];
  }

  if (userId.includes('prima') || userId === 'prima-002-uuid') {
    return [
      {
        id: 'note-pri-1',
        title: 'Técnicas de Descarte para la Prueba de Admisión',
        subject: 'Matemática',
        content: '1. Leer primero la pregunta antes del enunciado largo. 2. Descartar opciones absurdas por orden de magnitud. 3. Comprobar unidades físicas en las opciones.',
        updatedAt: '2026-10-12T17:15:00Z',
        tags: ['Admisión', 'Estrategia'],
      },
    ];
  }

  return [];
}

export const plannerService = {
  getEvents(userId: string = 'santiago_fisica_ucv'): EvaluationEvent[] {
    const key = getEventsKey(userId);
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        // Fallback
      }
    }
    const initial = getInitialEventsForUser(userId);
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  },

  saveEvents(userId: string = 'santiago_fisica_ucv', events: EvaluationEvent[]): void {
    localStorage.setItem(getEventsKey(userId), JSON.stringify(events));
  },

  addEvent(userId: string = 'santiago_fisica_ucv', event: Omit<EvaluationEvent, 'id'>): EvaluationEvent {
    const events = this.getEvents(userId);
    const newEvent: EvaluationEvent = {
      ...event,
      id: `eval-${Date.now()}`,
    };
    const updated = [newEvent, ...events];
    this.saveEvents(userId, updated);
    return newEvent;
  },

  deleteEvent(userId: string = 'santiago_fisica_ucv', id: string): void {
    const events = this.getEvents(userId);
    const updated = events.filter((e) => e.id !== id);
    this.saveEvents(userId, updated);
  },

  updateEventScore(userId: string = 'santiago_fisica_ucv', id: string, score: number): void {
    const events = this.getEvents(userId);
    const updated = events.map((e) => (e.id === id ? { ...e, scoreObtained: score } : e));
    this.saveEvents(userId, updated);
  },

  getReminders(userId: string = 'santiago_fisica_ucv'): StudyReminder[] {
    const key = getRemindersKey(userId);
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        // Fallback
      }
    }
    const initial = getInitialRemindersForUser(userId);
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  },

  saveReminders(userId: string = 'santiago_fisica_ucv', reminders: StudyReminder[]): void {
    localStorage.setItem(getRemindersKey(userId), JSON.stringify(reminders));
  },

  addReminder(
    userId: string = 'santiago_fisica_ucv',
    reminder: Omit<StudyReminder, 'id' | 'createdAt' | 'completed'>
  ): StudyReminder {
    const reminders = this.getReminders(userId);
    const newReminder: StudyReminder = {
      ...reminder,
      id: `rem-${Date.now()}`,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updated = [newReminder, ...reminders];
    this.saveReminders(userId, updated);
    return newReminder;
  },

  toggleReminder(userId: string = 'santiago_fisica_ucv', id: string): void {
    const reminders = this.getReminders(userId);
    const updated = reminders.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r));
    this.saveReminders(userId, updated);
  },

  deleteReminder(userId: string = 'santiago_fisica_ucv', id: string): void {
    const reminders = this.getReminders(userId);
    const updated = reminders.filter((r) => r.id !== id);
    this.saveReminders(userId, updated);
  },

  getNotes(userId: string = 'santiago_fisica_ucv'): StudyNote[] {
    const key = getNotesKey(userId);
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        // Fallback
      }
    }
    const initial = getInitialNotesForUser(userId);
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  },

  saveNotes(userId: string = 'santiago_fisica_ucv', notes: StudyNote[]): void {
    localStorage.setItem(getNotesKey(userId), JSON.stringify(notes));
  },

  addNote(userId: string = 'santiago_fisica_ucv', note: Omit<StudyNote, 'id' | 'updatedAt'>): StudyNote {
    const notes = this.getNotes(userId);
    const newNote: StudyNote = {
      ...note,
      id: `note-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };
    const updated = [newNote, ...notes];
    this.saveNotes(userId, updated);
    return newNote;
  },

  updateNote(userId: string = 'santiago_fisica_ucv', id: string, note: Partial<StudyNote>): void {
    const notes = this.getNotes(userId);
    const updated = notes.map((n) =>
      n.id === id ? { ...n, ...note, updatedAt: new Date().toISOString() } : n
    );
    this.saveNotes(userId, updated);
  },

  deleteNote(userId: string = 'santiago_fisica_ucv', id: string): void {
    const notes = this.getNotes(userId);
    const updated = notes.filter((n) => n.id !== id);
    this.saveNotes(userId, updated);
  },

  getPlansBySubject(userId: string = 'santiago_fisica_ucv'): SubjectEvaluationPlan[] {
    const events = this.getEvents(userId);
    const subjects = ['Matemática', 'Física', 'Química', 'Biología', 'Castellano'];

    return subjects.map((subj) => {
      const subjectEvals = events.filter((e) => e.subject === subj);
      const totalWeight = subjectEvals.reduce((acc, curr) => acc + curr.weightPercentage, 0);

      let accumulatedScore = 0;
      subjectEvals.forEach((e) => {
        if (typeof e.scoreObtained === 'number') {
          accumulatedScore += (e.scoreObtained * e.weightPercentage) / 100;
        }
      });

      return {
        subject: subj,
        evaluations: subjectEvals,
        totalWeight,
        accumulatedScore: Number(accumulatedScore.toFixed(2)),
      };
    });
  },
};
