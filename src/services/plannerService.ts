import type {
  EvaluationEvent,
  StudyReminder,
  StudyNote,
  SubjectEvaluationPlan,
  ClassScheduleBlock,
  EvaluationPlanImportPayload,
  ClassScheduleImportPayload,
} from '../types/academicPlanner.types';
import { taskService } from './taskService';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { calculatePreAlertDate } from '../utils/academicImportValidator';

function getEventsKey(userId: string = 'default'): string {
  return `cpe_${userId}_events_clean_v1`;
}

function getRemindersKey(userId: string = 'default'): string {
  return `cpe_${userId}_reminders_clean_v1`;
}

function getNotesKey(userId: string = 'default'): string {
  return `cpe_${userId}_notes_clean_v1`;
}

function getScheduleKey(userId: string = 'default'): string {
  return `cpe_${userId}_class_schedule_v1`;
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
   * Obtiene el horario semanal de clases del estudiante
   */
  getClassSchedule(userId: string = 'default'): ClassScheduleBlock[] {
    const key = getScheduleKey(userId);
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

  /**
   * Guarda el horario semanal completo
   */
  saveClassSchedule(userId: string = 'default', schedule: ClassScheduleBlock[]): void {
    localStorage.setItem(getScheduleKey(userId), JSON.stringify(schedule));
  },

  /**
   * Añade una clase al horario semanal
   */
  addClassBlock(userId: string = 'default', block: Omit<ClassScheduleBlock, 'id'>): ClassScheduleBlock {
    const schedule = this.getClassSchedule(userId);
    const newBlock: ClassScheduleBlock = {
      ...block,
      id: `class-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    const updated = [...schedule, newBlock];
    this.saveClassSchedule(userId, updated);
    return newBlock;
  },

  /**
   * Actualiza un bloque del horario semanal
   */
  updateClassBlock(userId: string = 'default', id: string, block: Partial<ClassScheduleBlock>): void {
    const schedule = this.getClassSchedule(userId);
    const updated = schedule.map((c) => (c.id === id ? { ...c, ...block } : c));
    this.saveClassSchedule(userId, updated);
  },

  /**
   * Elimina un bloque del horario
   */
  deleteClassBlock(userId: string = 'default', id: string): void {
    const schedule = this.getClassSchedule(userId);
    const updated = schedule.filter((c) => c.id !== id);
    this.saveClassSchedule(userId, updated);
  },

  /**
   * Importa un plan de evaluación completo estructurado por IA
   * Genera los eventos de examen (evitando duplicados), crea recordatorios de estudio
   * escalonados (con cálculo de fecha seguro) e inyecta metas en el tablero Kanban.
   */
  async importEvaluationPlan(
    userId: string = 'default',
    payload: EvaluationPlanImportPayload,
    options: { createReminders?: boolean; createKanbanTasks?: boolean; userAcademicProfile?: string } = {
      createReminders: true,
      createKanbanTasks: true,
    }
  ): Promise<{ eventsCreated: number; remindersCreated: number; tasksCreated: number }> {
    const existingEvents = this.getEvents(userId);
    const existingReminders = this.getReminders(userId);
    const existingTasks = taskService.getTasks(userId);

    let eventsCreated = 0;
    let remindersCreated = 0;
    let tasksCreated = 0;

    const newEvents: EvaluationEvent[] = [];

    payload.evaluations.forEach((item, index) => {
      // Deduplicación de eventos: verificar si ya existe un evento para la misma materia, título y fecha
      const isDuplicateEvent = existingEvents.some(
        (e) =>
          e.subject.toLowerCase() === payload.subject.toLowerCase() &&
          e.title.toLowerCase() === item.title.toLowerCase() &&
          e.date === item.date
      );

      if (!isDuplicateEvent) {
        const eventId = `eval-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 6)}`;
        const newEvent: EvaluationEvent = {
          id: eventId,
          title: item.title,
          subject: payload.subject,
          date: item.date,
          time: item.time || '08:00 AM',
          type: item.type,
          weightPercentage: Number(item.weightPercentage) || 0,
          location: item.location || 'Aula Principal',
          topics: item.topics || [],
          notes: item.notes || `Plan oficial ${payload.academicPeriod || ''}`.trim(),
        };
        newEvents.push(newEvent);
        eventsCreated++;
      }

      // 1. Crear Recordatorios Escalonados si está activado (con deduplicación)
      if (options.createReminders) {
        const alertDays =
          item.suggestedStudyAlertDays && item.suggestedStudyAlertDays.length > 0
            ? item.suggestedStudyAlertDays
            : [7, 3];

        alertDays.forEach((days) => {
          try {
            // Cálculo seguro de fecha sin desfase UTC de husos horarios
            const dateStr = calculatePreAlertDate(item.date, days);
            const topicPreview =
              item.topics && item.topics.length > 0 ? ` (${item.topics.slice(0, 2).join(', ')})` : '';
            const reminderTitle = `Alerta (${days}d antes): Repasar para ${item.title}${topicPreview}`;

            const isDuplicateReminder = existingReminders.some(
              (r) =>
                r.subject.toLowerCase() === payload.subject.toLowerCase() &&
                r.dueDate === dateStr &&
                r.title.includes(item.title)
            );

            if (!isDuplicateReminder) {
              this.addReminder(userId, {
                title: reminderTitle,
                subject: payload.subject,
                dueDate: dateStr,
                priority: days <= 3 ? 'ALTA' : 'MEDIA',
              });
              remindersCreated++;
            }
          } catch {
            // Ignorar fecha inválida
          }
        });
      }

      // 2. Crear Tareas Kanban si está activado (con temas probables y deduplicación)
      if (options.createKanbanTasks) {
        const topicSummary =
          item.topics && item.topics.length > 0
            ? ` - [${item.topics.slice(0, 2).join(', ')}]`
            : '';
        const taskTitle = `Meta: ${item.title} (${item.weightPercentage}%)${topicSummary}`;

        const isDuplicateTask = existingTasks.some(
          (t) =>
            t.subject.toLowerCase() === payload.subject.toLowerCase() &&
            t.dueDate === item.date &&
            t.title.includes(item.title)
        );

        if (!isDuplicateTask) {
          taskService.addTask(userId, {
            title: taskTitle,
            subject: payload.subject,
            priority: item.weightPercentage >= 20 ? 'ALTA' : 'MEDIA',
            dueDate: item.date,
          });
          tasksCreated++;
        }
      }
    });

    if (newEvents.length > 0) {
      this.saveEvents(userId, [...newEvents, ...existingEvents]);

      // 3. Sincronización opcional con Supabase si está disponible
      if (isSupabaseConfigured() && userId && userId !== 'default') {
        try {
          const supabaseRows = newEvents.map((ev) => ({
            user_id: userId,
            title: ev.title,
            description: `Temas: ${(ev.topics || []).join(', ')}. Ponderación: ${ev.weightPercentage}%`,
            event_type: 'exam',
            subject: ev.subject,
            due_date: ev.date,
            academic_profile: options.userAcademicProfile || 'general',
            priority: ev.weightPercentage >= 20 ? 'high' : 'medium',
          }));
          await (supabase.from('events_and_deadlines') as any).insert(supabaseRows);
        } catch (err) {
          console.warn('[plannerService] Sincronización con Supabase diferida:', err);
        }
      }
    }

    return { eventsCreated, remindersCreated, tasksCreated };
  },

  /**
   * Importa un horario de clases completo con opción de reemplazo o fusión inteligente sin duplicados
   */
  importClassSchedule(
    userId: string = 'default',
    payload: ClassScheduleImportPayload,
    replaceExisting: boolean = false
  ): number {
    const existing = replaceExisting ? [] : this.getClassSchedule(userId);
    const newBlocks: ClassScheduleBlock[] = payload.classes.map((cls, idx) => ({
      ...cls,
      id: `class-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
    }));

    if (replaceExisting) {
      this.saveClassSchedule(userId, newBlocks);
      return newBlocks.length;
    }

    // Fusión inteligente: omitir clases duplicadas (mismo día, hora de inicio y materia)
    const uniqueBlocks = newBlocks.filter(
      (nb) =>
        !existing.some(
          (eb) =>
            eb.dayOfWeek === nb.dayOfWeek &&
            eb.startTime === nb.startTime &&
            eb.subject.trim().toLowerCase() === nb.subject.trim().toLowerCase()
        )
    );

    this.saveClassSchedule(userId, [...existing, ...uniqueBlocks]);
    return uniqueBlocks.length;
  },

  /**
   * Purga total de datos de prueba o caché local
   */
  clearAll(userId: string = 'default'): void {
    localStorage.removeItem(getEventsKey(userId));
    localStorage.removeItem(getRemindersKey(userId));
    localStorage.removeItem(getNotesKey(userId));
    localStorage.removeItem(getScheduleKey(userId));
  },
};
