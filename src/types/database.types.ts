/**
 * Definición estricta de tablas de Supabase para cliente tipado
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          username: string;
          avatar_url: string;
          academic_profile: 'andres_bachillerato_1' | 'prima_bachillerato_5' | 'santiago_fisica_ucv' | 'mafe_diseno_ucab';
          institution: string;
          academic_goal: string;
          preferences: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string;
          full_name: string;
          username?: string;
          avatar_url?: string;
          academic_profile: 'andres_bachillerato_1' | 'prima_bachillerato_5' | 'santiago_fisica_ucv' | 'mafe_diseno_ucab';
          institution?: string;
          academic_goal?: string;
          preferences?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          username?: string;
          avatar_url?: string;
          academic_profile?: 'andres_bachillerato_1' | 'prima_bachillerato_5' | 'santiago_fisica_ucv' | 'mafe_diseno_ucab';
          institution?: string;
          academic_goal?: string;
          preferences?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_documents: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          file_path: string;
          file_type: string;
          file_size_bytes: number | null;
          tags: string[];
          storage_bucket: string;
          ai_summary: string | null;
          ai_analysis: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          file_path: string;
          file_type: string;
          file_size_bytes?: number | null;
          tags?: string[];
          storage_bucket?: string;
          ai_summary?: string | null;
          ai_analysis?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          file_path?: string;
          file_type?: string;
          file_size_bytes?: number | null;
          tags?: string[];
          storage_bucket?: string;
          ai_summary?: string | null;
          ai_analysis?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      exam_results: {
        Row: {
          id: string;
          user_id: string;
          exam_title: string;
          subject: string;
          score: number;
          total_questions: number;
          correct_answers: number;
          time_taken_seconds: number;
          breakdown: Json;
          answers: Json;
          completed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          exam_title: string;
          subject: string;
          score: number;
          total_questions: number;
          correct_answers: number;
          time_taken_seconds: number;
          breakdown?: Json;
          answers?: Json;
          completed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          exam_title?: string;
          subject?: string;
          score?: number;
          total_questions?: number;
          correct_answers?: number;
          time_taken_seconds?: number;
          breakdown?: Json;
          answers?: Json;
          completed_at?: string;
        };
      };
      study_sessions: {
        Row: {
          id: string;
          user_id: string;
          profile_type: string;
          session_type: string;
          duration_minutes: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          profile_type: string;
          session_type: string;
          duration_minutes: number;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          profile_type?: string;
          session_type?: string;
          duration_minutes?: number;
          notes?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
