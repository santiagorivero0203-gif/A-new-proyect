import type { AcademicProfileId } from './index';

export type AcademicSubject =
  | 'Matemática'
  | 'Física'
  | 'Química'
  | 'Biología'
  | 'Castellano';

export interface ExamOption {
  id: string;
  text: string;
  latex?: string;
}

export interface Question {
  id: string;
  subject: AcademicSubject;
  topic: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  targetProfiles: AcademicProfileId[];
  questionText: string;
  latexFormula?: string;
  options: ExamOption[];
  correctOptionId: string;
  explanation: string;
  explanationLatex?: string;
  sourceExam?: string;
}

export type ExamMode =
  | 'UNIVERSITY_EXAM'
  | 'HIGH_SCHOOL_EXAM'
  | 'DIAGNOSTIC_EXAM'
  | 'SIMADI_UCV'
  | 'SIMADI_OPSU'
  | 'BY_SUBJECT'
  | 'QUICK_PRACTICE'
  | 'AI_GENERATED'
  | 'CUSTOM';

export interface ExamConfig {
  mode: ExamMode;
  title: string;
  subject?: AcademicSubject;
  totalQuestions: number;
  timeLimitSeconds: number; // e.g., 60 * 60 para 1 hora
  allowPause: boolean;
  shuffleQuestions: boolean;
  customQuestions?: Question[];
}

export interface ExamSessionState {
  status: 'CONFIG' | 'IN_PROGRESS' | 'REVIEW' | 'FINISHED';
  config: ExamConfig;
  questions: Question[];
  currentIndex: number;
  userAnswers: Record<string, string>; // questionId -> optionId
  flaggedQuestions: Record<string, boolean>; // questionId -> boolean
  secondsRemaining: number;
  isPaused: boolean;
  startedAt: string;
  completedAt?: string;
}

export interface ExamReport {
  examTitle: string;
  subject: string;
  score: number; // 0 - 20
  percentage: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredAnswers: number;
  timeTakenSeconds: number;
  breakdownByTopic: Record<string, { total: number; correct: number }>;
  breakdownBySubject: Record<string, { total: number; correct: number }>;
  questions: Question[];
  userAnswers: Record<string, string>;
  completedAt: string;
}
