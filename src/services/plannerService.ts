import type {
  EvaluationEvent,
  StudyReminder,
  StudyNote,
  SubjectEvaluationPlan,
} from '../types/academicPlanner.types';

const REMINDERS_KEY = 'cpe_planner_reminders_v2';
const EVENTS_KEY = 'cpe_planner_events_v2';
const NOTES_KEY = 'cpe_planner_notes_v2';

// Estructuras vacías listas para ser alimentadas por las clases, planes de evaluación y exámenes del usuario
const INITIAL_EVENTS: EvaluationEvent[] = [];
const INITIAL_REMINDERS: StudyReminder[] = [];
const INITIAL_NOTES: StudyNote[] = [];

export const plannerService = {
  getEvents(): EvaluationEvent[] {
    const data = localStorage.getItem(EVENTS_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        // Fallback
      }
    }
    localStorage.setItem(EVENTS_KEY, JSON.stringify(INITIAL_EVENTS));
    return INITIAL_EVENTS;
  },

  saveEvents(events: EvaluationEvent[]): void {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  },

  addEvent(event: Omit<EvaluationEvent, 'id'>): EvaluationEvent {
    const events = this.getEvents();
    const newEvent: EvaluationEvent = {
      ...event,
      id: `eval-${Date.now()}`,
    };
    const updated = [newEvent, ...events];
    this.saveEvents(updated);
    return newEvent;
  },

  deleteEvent(id: string): void {
    const events = this.getEvents();
    const updated = events.filter((e) => e.id !== id);
    this.saveEvents(updated);
  },

  updateEventScore(id: string, score: number): void {
    const events = this.getEvents();
    const updated = events.map((e) => (e.id === id ? { ...e, scoreObtained: score } : e));
    this.saveEvents(updated);
  },

  getReminders(): StudyReminder[] {
    const data = localStorage.getItem(REMINDERS_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        // Fallback
      }
    }
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(INITIAL_REMINDERS));
    return INITIAL_REMINDERS;
  },

  saveReminders(reminders: StudyReminder[]): void {
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
  },

  addReminder(reminder: Omit<StudyReminder, 'id' | 'createdAt' | 'completed'>): StudyReminder {
    const reminders = this.getReminders();
    const newReminder: StudyReminder = {
      ...reminder,
      id: `rem-${Date.now()}`,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updated = [newReminder, ...reminders];
    this.saveReminders(updated);
    return newReminder;
  },

  toggleReminder(id: string): void {
    const reminders = this.getReminders();
    const updated = reminders.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r));
    this.saveReminders(updated);
  },

  deleteReminder(id: string): void {
    const reminders = this.getReminders();
    const updated = reminders.filter((r) => r.id !== id);
    this.saveReminders(updated);
  },

  getNotes(): StudyNote[] {
    const data = localStorage.getItem(NOTES_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        // Fallback
      }
    }
    localStorage.setItem(NOTES_KEY, JSON.stringify(INITIAL_NOTES));
    return INITIAL_NOTES;
  },

  saveNotes(notes: StudyNote[]): void {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  },

  addNote(note: Omit<StudyNote, 'id' | 'updatedAt'>): StudyNote {
    const notes = this.getNotes();
    const newNote: StudyNote = {
      ...note,
      id: `note-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };
    const updated = [newNote, ...notes];
    this.saveNotes(updated);
    return newNote;
  },

  updateNote(id: string, note: Partial<StudyNote>): void {
    const notes = this.getNotes();
    const updated = notes.map((n) =>
      n.id === id ? { ...n, ...note, updatedAt: new Date().toISOString() } : n
    );
    this.saveNotes(updated);
  },

  deleteNote(id: string): void {
    const notes = this.getNotes();
    const updated = notes.filter((n) => n.id !== id);
    this.saveNotes(updated);
  },

  getPlansBySubject(): SubjectEvaluationPlan[] {
    const events = this.getEvents();
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
