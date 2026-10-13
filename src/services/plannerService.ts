import type {
  EvaluationEvent,
  StudyReminder,
  StudyNote,
  SubjectEvaluationPlan,
} from '../types/academicPlanner.types';

const REMINDERS_KEY = 'cpe_planner_reminders_v2';
const EVENTS_KEY = 'cpe_planner_events_v2';
const NOTES_KEY = 'cpe_planner_notes_v2';

const INITIAL_EVENTS: EvaluationEvent[] = [
  {
    id: 'eval-1',
    title: '1er Parcial: Cálculo Diferencial & Derivadas',
    subject: 'Matemática',
    date: '2026-10-24',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Aula 204 (Ciencias)',
    topics: ['Regla de la Cadena', 'Derivadas de Funciones Trascendentes', 'Optimización'],
    notes: 'Traer formulario autorizado sin anotaciones adicionales.',
  },
  {
    id: 'eval-2',
    title: 'Evaluación Práctica: Leyes de Newton & Fricción',
    subject: 'Física',
    date: '2026-10-28',
    time: '10:30 AM',
    type: 'TALLER',
    weightPercentage: 15,
    location: 'Laboratorio de Mecánica',
    topics: ['Diagramas de Cuerpo Libre', 'Planos Inclinados', 'Fuerzas de Contacto'],
    notes: 'Resolución de 3 problemas en parejas.',
  },
  {
    id: 'eval-3',
    title: 'Quiz de Estequiometría & Reactivo Limitante',
    subject: 'Química',
    date: '2026-11-04',
    time: '09:00 AM',
    type: 'QUIZ',
    weightPercentage: 10,
    location: 'Aula 102',
    topics: ['Cálculos Molares', 'Rendimiento Teórico y Real'],
  },
  {
    id: 'eval-4',
    title: 'Entrega de Informe: Respiración Celular & Fotosíntesis',
    subject: 'Biología',
    date: '2026-11-10',
    time: '11:59 PM',
    type: 'ENTREGA',
    weightPercentage: 20,
    location: 'Portal Virtual',
    topics: ['Ciclo de Krebs', 'Cadena de Transporte de Electrones', 'ATP Sintasa'],
  },
  {
    id: 'eval-5',
    title: '2do Parcial: Razonamiento Verbal & Morfosintaxis',
    subject: 'Castellano',
    date: '2026-11-18',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 30,
    location: 'Aula Magna',
    topics: ['Analogías Semánticas', 'Análisis Sintáctico Oracional', 'Conectores'],
  },
];

const INITIAL_REMINDERS: StudyReminder[] = [
  {
    id: 'rem-1',
    title: 'Resolver ejercicios impares de derivadas por regla del producto',
    subject: 'Matemática',
    dueDate: '2026-10-18',
    priority: 'ALTA',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rem-2',
    title: 'Repasar teoría de fuerza de rozamiento estático vs cinético',
    subject: 'Física',
    dueDate: '2026-10-20',
    priority: 'MEDIA',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rem-3',
    title: 'Memorizar números de oxidación de los metales de transición',
    subject: 'Química',
    dueDate: '2026-10-22',
    priority: 'BAJA',
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_NOTES: StudyNote[] = [
  {
    id: 'note-1',
    title: 'Reglas Fundamentales de Derivación',
    subject: 'Matemática',
    content: '1. Regla del Producto: $(uv)\' = u\'v + uv\'$\n2. Regla del Cociente: $\\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}$\n3. Regla de la Cadena: $\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)$',
    tags: ['Cálculo', 'Derivadas', 'Fórmulas'],
    updatedAt: new Date().toISOString(),
    pinned: true,
  },
  {
    id: 'note-2',
    title: 'Condiciones de Equilibrio Traslacional',
    subject: 'Física',
    content: 'Para que una partícula permanezca en reposo o con velocidad constante:\n$$\\Sigma \\vec{F} = 0 \\implies \\Sigma F_x = 0, \\quad \\Sigma F_y = 0$$\nRecordar descomponer las tensiones en sus componentes trigonométricas.',
    tags: ['Estática', 'Leyes de Newton'],
    updatedAt: new Date().toISOString(),
    pinned: false,
  },
];

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
