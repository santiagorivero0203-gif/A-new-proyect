-- ==============================================================================
-- CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - SCRIPT MAESTRO DE SINCRONIZACIÓN IDEMPOTENTE
-- ==============================================================================
-- Archivo: supabase_audit_sync.sql
-- Propósito: Garantiza que cualquier base de datos de Supabase (nueva o existente)
-- posea todas las tablas, columnas, extensiones, índices y políticas RLS requeridas
-- por el frontend de Vite/React, el servidor MCP y el Worker Autónomo de IA.
-- Idempotencia total: Se puede ejecutar múltiples veces sin borrar ni corromper datos.
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TABLA: PROFILES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT NOT NULL,
    username TEXT UNIQUE,
    avatar_url TEXT,
    academic_profile TEXT NOT NULL DEFAULT 'santiago_fisica_ucv',
    institution TEXT DEFAULT 'Ecosistema Académico',
    academic_goal TEXT,
    level_badge TEXT DEFAULT 'Explorador Nvl 1',
    streak_days INTEGER DEFAULT 0,
    xp_points INTEGER DEFAULT 0,
    preferences JSONB DEFAULT '{
        "theme": "light",
        "sound_enabled": true,
        "focus_duration": 25,
        "calculator_docked": true,
        "compact_mode": false
    }'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Asegurar columnas críticas en profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS academic_profile TEXT DEFAULT 'santiago_fisica_ucv';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}'::jsonb;

-- ==============================================================================
-- 3. TABLA: USER_DOCUMENTS (Storage Vault & Metadatos)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.user_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size_bytes BIGINT DEFAULT 0,
    topic TEXT,
    subject TEXT,
    ai_analysis JSONB,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.user_documents ADD COLUMN IF NOT EXISTS ai_analysis JSONB;
ALTER TABLE public.user_documents ADD COLUMN IF NOT EXISTS topic TEXT;
ALTER TABLE public.user_documents ADD COLUMN IF NOT EXISTS subject TEXT;

-- ==============================================================================
-- 4. TABLA: KANBAN_TASKS (Gestor de Tareas y Desglose Notion AI)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kanban_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'TODO' CHECK (status IN ('TODO', 'IN_PROGRESS', 'DONE', 'ARCHIVED')),
    priority TEXT NOT NULL DEFAULT 'MEDIA' CHECK (priority IN ('ALTA', 'MEDIA', 'BAJA')),
    column_id TEXT DEFAULT 'TODO',
    order_index INTEGER DEFAULT 0,
    academic_profile TEXT,
    subject TEXT,
    ai_metadata JSONB DEFAULT '{}'::jsonb,
    due_date DATE,
    estimated_pomodoros INTEGER DEFAULT 2,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.kanban_tasks ADD COLUMN IF NOT EXISTS ai_metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.kanban_tasks ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'MEDIA';
ALTER TABLE public.kanban_tasks ADD COLUMN IF NOT EXISTS estimated_pomodoros INTEGER DEFAULT 2;
ALTER TABLE public.kanban_tasks ADD COLUMN IF NOT EXISTS subject TEXT;

-- ==============================================================================
-- 5. TABLA: AI_PROCESSING_QUEUE (Cola Híbrida Spark MCP + Auto API Worker)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.ai_processing_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    document_url TEXT NOT NULL,
    topic_title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed')),
    processing_mode TEXT NOT NULL DEFAULT 'auto_api' CHECK (processing_mode IN ('auto_api', 'spark_mcp', 'deep_spark')),
    routing_mode TEXT NOT NULL DEFAULT 'auto_api',
    academic_level TEXT NOT NULL DEFAULT 'BASICO_ESCOLAR' CHECK (
        academic_level IN (
            'BASICO_ESCOLAR',
            'BACHILLERATO_AVANZADO',
            'UNIVERSITARIO_EXACTAS',
            'UNIVERSITARIO_DISENO'
        )
    ),
    result_guide_id UUID,
    error_message TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.ai_processing_queue ADD COLUMN IF NOT EXISTS processing_mode TEXT DEFAULT 'auto_api';
ALTER TABLE public.ai_processing_queue ADD COLUMN IF NOT EXISTS routing_mode TEXT DEFAULT 'auto_api';
ALTER TABLE public.ai_processing_queue ADD COLUMN IF NOT EXISTS academic_level TEXT DEFAULT 'BASICO_ESCOLAR';
ALTER TABLE public.ai_processing_queue ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- ==============================================================================
-- 6. TABLA: ACADEMIC_GUIDES (Guías Deconstruidas de 7 Pilares con LaTeX)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.academic_guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    title TEXT NOT NULL,
    target_profiles TEXT[] DEFAULT ARRAY['santiago_fisica_ucv']::TEXT[],
    academic_level TEXT DEFAULT 'UNIVERSITARIO_EXACTAS',
    summary TEXT,
    pillars JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_public BOOLEAN DEFAULT false,
    source_document_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.academic_guides ADD COLUMN IF NOT EXISTS academic_level TEXT DEFAULT 'UNIVERSITARIO_EXACTAS';
ALTER TABLE public.academic_guides ADD COLUMN IF NOT EXISTS source_document_url TEXT;

-- ==============================================================================
-- 7. TABLA: QUESTION_BANK (Banco de Preguntas para Evaluaciones)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.question_bank (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guide_id UUID REFERENCES public.academic_guides(id) ON DELETE SET NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    difficulty TEXT NOT NULL DEFAULT 'Intermedio',
    target_profiles TEXT[] DEFAULT ARRAY['santiago_fisica_ucv']::TEXT[],
    question_text TEXT NOT NULL,
    latex_formula TEXT,
    options JSONB NOT NULL DEFAULT '[]'::jsonb,
    correct_option_id TEXT NOT NULL,
    explanation TEXT NOT NULL,
    explanation_latex TEXT,
    source_exam TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.question_bank ADD COLUMN IF NOT EXISTS explanation_latex TEXT;

-- ==============================================================================
-- 8. TABLA: EVENTS_AND_DEADLINES (Calendario y Agenda Académica)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.events_and_deadlines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TEXT DEFAULT '08:00 AM',
    event_type TEXT NOT NULL DEFAULT 'PARCIAL',
    weight_percentage NUMERIC(5, 2) DEFAULT 25.00,
    location TEXT DEFAULT 'Aula Virtual',
    notes TEXT,
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 9. TABLA: EVALUATION_PLANS (Ponderaciones y Cortes por Asignatura)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.evaluation_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    target_grade NUMERIC(4, 2) DEFAULT 16.00,
    passing_grade NUMERIC(4, 2) DEFAULT 10.00,
    evaluations JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 10. TABLA: CREATIVE_PROJECTS_AND_CANVA (Proyectos de Diseño y Canva Studio)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.creative_projects_and_canva (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    project_title TEXT NOT NULL,
    course_name TEXT DEFAULT 'Taller de Diseño',
    canva_embed_url TEXT,
    status TEXT NOT NULL DEFAULT 'brief' CHECK (status IN ('brief', 'moodboard', 'in_progress', 'final')),
    due_date DATE,
    tags TEXT[] DEFAULT ARRAY['Diseño']::TEXT[],
    bulk_table_data JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.creative_projects_and_canva ADD COLUMN IF NOT EXISTS canva_embed_url TEXT;
ALTER TABLE public.creative_projects_and_canva ADD COLUMN IF NOT EXISTS bulk_table_data JSONB DEFAULT '[]'::jsonb;

-- ==============================================================================
-- 11. HABILITACIÓN DE ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kanban_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_processing_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events_and_deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creative_projects_and_canva ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS optimizadas según Postgres Best Practices: (select auth.uid()) = user_id
DO $$
BEGIN
    -- profiles
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'profiles_select_own') THEN
        CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING ((select auth.uid()) = id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'profiles_update_own') THEN
        CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING ((select auth.uid()) = id);
    END IF;

    -- kanban_tasks
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'kanban_tasks_all_own') THEN
        CREATE POLICY "kanban_tasks_all_own" ON public.kanban_tasks FOR ALL USING ((select auth.uid()) = user_id);
    END IF;

    -- ai_processing_queue
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'ai_queue_all_own') THEN
        CREATE POLICY "ai_queue_all_own" ON public.ai_processing_queue FOR ALL USING ((select auth.uid()) = user_id);
    END IF;

    -- events_and_deadlines
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'events_all_own') THEN
        CREATE POLICY "events_all_own" ON public.events_and_deadlines FOR ALL USING ((select auth.uid()) = user_id);
    END IF;

    -- creative_projects_and_canva
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'canva_projects_all_own') THEN
        CREATE POLICY "canva_projects_all_own" ON public.creative_projects_and_canva FOR ALL USING ((select auth.uid()) = user_id);
    END IF;
END $$;

-- ==============================================================================
-- 12. HABILITAR SUPABASE REALTIME EN TABLAS REACTIVAS
-- ==============================================================================
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        IF NOT EXISTS (
            SELECT 1 FROM pg_publication_tables 
            WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'ai_processing_queue'
        ) THEN
            ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_processing_queue;
        END IF;

        IF NOT EXISTS (
            SELECT 1 FROM pg_publication_tables 
            WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'kanban_tasks'
        ) THEN
            ALTER PUBLICATION supabase_realtime ADD TABLE public.kanban_tasks;
        END IF;

        IF NOT EXISTS (
            SELECT 1 FROM pg_publication_tables 
            WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'events_and_deadlines'
        ) THEN
            ALTER PUBLICATION supabase_realtime ADD TABLE public.events_and_deadlines;
        END IF;
    END IF;
END $$;

-- ==============================================================================
-- 13. ÍNDICES DE RENDIMIENTO (Performance Tuning)
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_ai_queue_status_mode ON public.ai_processing_queue(status, processing_mode);
CREATE INDEX IF NOT EXISTS idx_ai_queue_created ON public.ai_processing_queue(created_at);
CREATE INDEX IF NOT EXISTS idx_kanban_tasks_user_status ON public.kanban_tasks(user_id, status);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events_and_deadlines(event_date);
CREATE INDEX IF NOT EXISTS idx_guides_subject_topic ON public.academic_guides(subject, topic);
