import type { AcademicProfileId } from './index';
import type { Question } from './exam.types';

export type AiProcessingStep =
  | 'IDLE'
  | 'READING_FILE'
  | 'ANALYZING_GEMINI'
  | 'EXTRACTING_CURRICULUM'
  | 'GENERATING_EXAM'
  | 'SAVING_POSTGRES'
  | 'COMPLETED'
  | 'ERROR';

export interface KeyTopicItem {
  title: string;
  description: string;
  importance: 'Alta' | 'Media' | 'Fundamental';
}

export interface ProfileSpecificInsight {
  profileId: AcademicProfileId;
  title: string;
  summary: string;
  // Para Santiago (Física UCV)
  latexFormulas?: {
    name: string;
    latex: string;
    explanation: string;
  }[];
  theoreticalDerivation?: string;
  // Para Andrés (1er año)
  funAnalogies?: {
    concept: string;
    analogy: string;
  }[];
  studyTips?: string[];
  // Para Prima (5to año - Admisión OPSU/UCV)
  commonExamTraps?: {
    concept: string;
    trapWarning: string;
  }[];
  // Para María Fernanda (Diseño Integral UCAB)
  colorPalette?: {
    name: string;
    hex: string;
    role: string;
  }[];
  compositionNotes?: string[];
}

export interface AiAnalysisResult {
  documentId?: string;
  documentTitle: string;
  documentSummary: string;
  subject: string;
  keyTopics: KeyTopicItem[];
  profileInsight: ProfileSpecificInsight;
  generatedQuestions: Question[];
  suggestedAction: string;
  analyzedAt: string;
  tokensUsed?: number;
  modelUsed: string;
}

export interface GeminiApiConfig {
  apiKey?: string;
  model: string;
  temperature: number;
}
