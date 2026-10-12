/**
 * Tipos de perfiles académicos disponibles en el Centro de Productividad Estudiantil
 */
export type AcademicProfileId =
  | 'andres_bachillerato_1'
  | 'prima_bachillerato_5'
  | 'santiago_fisica_ucv'
  | 'mafe_diseno_ucab';

export interface UserPreferences {
  theme: 'dark' | 'light' | 'system';
  sound_enabled: boolean;
  focus_duration: number; // minutos
  calculator_docked?: boolean;
  compact_mode?: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  username: string;
  avatar_url: string;
  academic_profile: AcademicProfileId;
  institution: string;
  academic_goal: string;
  level_badge: string;
  streak_days: number;
  xp_points: number;
  preferences: UserPreferences;
  created_at: string;
  updated_at: string;
}

export interface UserDocument {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  file_path: string;
  file_type: string;
  file_size_bytes: number;
  tags: string[];
  storage_bucket: string;
  ai_summary?: string;
  ai_analysis?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ExamResult {
  id: string;
  user_id: string;
  exam_title: string;
  subject: string;
  score: number; // 0 a 100 o escala 20
  total_questions: number;
  correct_answers: number;
  time_taken_seconds: number;
  breakdown: Record<string, { total: number; correct: number }>;
  answers?: Record<string, unknown>[];
  completed_at: string;
}

export interface StudySession {
  id: string;
  user_id: string;
  profile_type: AcademicProfileId;
  session_type: 'pomodoro' | 'deep_work' | 'exam_simulation' | 'gamified_challenge';
  duration_minutes: number;
  notes?: string;
  created_at: string;
}
