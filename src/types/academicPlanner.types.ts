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
