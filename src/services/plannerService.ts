import type {
  EvaluationEvent,
  StudyReminder,
  StudyNote,
  SubjectEvaluationPlan,
} from '../types/academicPlanner.types';

function getEventsKey(userId: string = 'default'): string {
  return `cpe_${userId}_events_clean_v1`;
}

function getRemindersKey(userId: string = 'default'): string {
  return `cpe_${userId}_reminders_clean_v1`;
}

function getNotesKey(userId: string = 'default'): string {
  return `cpe_${userId}_notes_clean_v1`;
}

/**
 * Servicio de Planificación Académica (Directriz Estado Cero)
 * 
 * Regla de Producción:
 * Cero datos ficticios o hardcodeados. El calendario, recordatorios, notas y planes
 * inician estrictamente en 0 registros hasta que el estudiante los cree o se sincronicen
 * con las tablas reales de Supabase.
 */
export const plannerService = {
  getEvents(userId: string = 'default'): EvaluationEvent[] {
    const key = getEventsKey(userId);
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // Fallback a array vacío
      }
    }
    return [];
  },

  saveEvents(userId: string = 'default', events: EvaluationEvent[]): void {
    localStorage.setItem(getEventsKey(userId), JSON.stringify(events));
  },

  addEvent(userId: string = 'default', event: Omit<EvaluationEvent, 'id'>): EvaluationEvent {
    const events = this.getEvents(userId);
    const newEvent: EvaluationEvent = {
      ...event,
      id: `eval-${Date.now()}`,
    };
    const updated = [newEvent, ...events];
    this.saveEvents(userId, updated);
    return newEvent;
  },

  deleteEvent(userId: string = 'default', id: string): void {
    const events = this.getEvents(userId);
    const updated = events.filter((e) => e.id !== id);
    this.saveEvents(userId, updated);
  },

  updateEventScore(userId: string = 'default', id: string, score: number): void {
    const events = this.getEvents(userId);
    const updated = events.map((e) => (e.id === id ? { ...e, scoreObtained: score } : e));
    this.saveEvents(userId, updated);
  },

  getReminders(userId: string = 'default'): StudyReminder[] {
    const key = getRemindersKey(userId);
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // Fallback a array vacío
      }
    }
    return [];
  },

  saveReminders(userId: string = 'default', reminders: StudyReminder[]): void {
    localStorage.setItem(getRemindersKey(userId), JSON.stringify(reminders));
  },

  addReminder(
    userId: string = 'default',
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

  toggleReminder(userId: string = 'default', id: string): void {
    const reminders = this.getReminders(userId);
    const updated = reminders.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r));
    this.saveReminders(userId, updated);
  },

  deleteReminder(userId: string = 'default', id: string): void {
    const reminders = this.getReminders(userId);
    const updated = reminders.filter((r) => r.id !== id);
    this.saveReminders(userId, updated);
  },

  getNotes(userId: string = 'default'): StudyNote[] {
    const key = getNotesKey(userId);
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // Fallback a array vacío
      }
    }
    return [];
  },

  saveNotes(userId: string = 'default', notes: StudyNote[]): void {
    localStorage.setItem(getNotesKey(userId), JSON.stringify(notes));
  },

  addNote(userId: string = 'default', note: Omit<StudyNote, 'id' | 'updatedAt'>): StudyNote {
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

  updateNote(userId: string = 'default', id: string, note: Partial<StudyNote>): void {
    const notes = this.getNotes(userId);
    const updated = notes.map((n) =>
      n.id === id ? { ...n, ...note, updatedAt: new Date().toISOString() } : n
    );
    this.saveNotes(userId, updated);
  },

  deleteNote(userId: string = 'default', id: string): void {
    const notes = this.getNotes(userId);
    const updated = notes.filter((n) => n.id !== id);
    this.saveNotes(userId, updated);
  },

  /**
   * Obtiene los planes de evaluación por materia dinámicamente según eventos reales.
   * Si no hay eventos registrados, devuelve 0 registros (Estado Cero).
   */
  getPlansBySubject(userId: string = 'default'): SubjectEvaluationPlan[] {
    const events = this.getEvents(userId);
    if (!events || events.length === 0) {
      return [];
    }

    const subjects = Array.from(new Set(events.map((e) => e.subject).filter(Boolean)));

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

  /**
   * Purga total de datos de prueba o caché local
   */
  clearAll(userId: string = 'default'): void {
    localStorage.removeItem(getEventsKey(userId));
    localStorage.removeItem(getRemindersKey(userId));
    localStorage.removeItem(getNotesKey(userId));
  },
};
