/**
 * Tipos de datos para el Sistema Integral de Planificación Académica
 * Recordatorios, Calendario de Evaluaciones, Planes de Evaluación y Cuaderno de Notas
 */

export type EvaluationType =
  | 'PARCIAL'
  | 'QUIZ'
  | 'ENTREGA'
  | 'TALLER'
  | 'PROYECTO'
  | 'RECUPERACION';

export interface EvaluationEvent {
  id: string;
  title: string;
  subject: string;
  date: string; // Formato YYYY-MM-DD
  time?: string; // e.g. "09:00 AM"
  type: EvaluationType;
  weightPercentage: number; // Porcentaje del plan de evaluación (e.g. 25 para 25%)
  location?: string; // Aula, laboratorio o plataforma
  topics?: string[];
  scoreObtained?: number; // Calificación sobre 20 puntos
  notes?: string;
}

export interface StudyReminder {
  id: string;
  title: string;
  subject: string;
  dueDate: string; // Formato legible o YYYY-MM-DD
  priority: 'ALTA' | 'MEDIA' | 'BAJA';
  completed: boolean;
  createdAt: string;
}

export interface StudyNote {
  id: string;
  title: string;
  subject: string;
  content: string; // Texto enriquecido con soporte de fórmulas LaTeX entre $...$
  tags: string[];
  updatedAt: string;
  pinned?: boolean;
}

export interface SubjectEvaluationPlan {
  subject: string;
  professor?: string;
  evaluations: EvaluationEvent[];
  totalWeight: number; // Suma de ponderaciones (%)
  accumulatedScore: number; // Puntos acumulados en escala de 20
}

/**
 * Protocolo de Importación de Planes de Evaluación por IA (cpe-evaluation-plan-v1)
 * Diseñado para ingesta de fotos de planes de evaluación analizadas por Gemini
 */
export interface ImportedEvaluationItem {
  title: string;
  type: EvaluationType;
  date: string; // Formato ISO YYYY-MM-DD
  time?: string; // Formato HH:MM AM/PM
  weightPercentage: number; // 0 a 100
  topics: string[]; // Contenidos o temas que cubrirá la prueba
  location?: string;
  suggestedStudyAlertDays?: number[]; // Días previos para alertas escalonadas (ej. [7, 3, 1])
  notes?: string;
}

export interface EvaluationPlanImportPayload {
  schemaVersion: 'cpe-evaluation-plan-v1';
  subject: string;
  professor?: string;
  academicPeriod?: string;
  section?: string;
  totalWeightExpected?: number;
  evaluations: ImportedEvaluationItem[];
}

/**
 * Horario Escolar y Universitario Semanal
 */
export type DayOfWeek = 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES' | 'SABADO';

export interface ClassScheduleBlock {
  id: string;
  subject: string;
  dayOfWeek: DayOfWeek;
  startTime: string; // "07:30" (24h)
  endTime: string;   // "09:00" (24h)
  classroom?: string; // "Aula 204", "Laboratorio 3"
  building?: string;  // "Edificio de Aulas", "Facultad de Ciencias"
  professor?: string;
  modality: 'PRESENCIAL' | 'VIRTUAL' | 'HIBRIDO';
  colorTag?: string; // e.g. "blue", "indigo", "emerald", "amber", "rose", "purple"
}

export interface ClassScheduleImportPayload {
  schemaVersion: 'cpe-class-schedule-v1';
  institutionName?: string;
  studentGradeOrSemester?: string;
  classes: Omit<ClassScheduleBlock, 'id'>[];
}
