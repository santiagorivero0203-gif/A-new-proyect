-- ==============================================================================
-- CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - ESQUEMA SUPABASE POSTGRESQL (FASE 6 PRODUCCIÓN)
-- ==============================================================================
-- Script maestro de base de datos con blindaje RLS (Row Level Security) estricto:
-- 1. Separación rigurosa entre datos PRIVADOS (auth.uid() = user_id) y COMUNITARIOS (SELECT USING true).
-- 2. Optimización según Postgres Best Practices: uso de (select auth.uid()) para evitar
--    evaluaciones por fila repetidas en escaneos de tablas.
-- 3. Blindaje de Supabase Storage: aislamiento por carpeta privada {user_id}/* para evitar
--    que otros usuarios lean, modifiquen o borren fotos o apuntes personales.
-- 4. Soporte para el ecosistema académico completo: UCV (Física), UCAB (Diseño) y Bachillerato.
-- ==============================================================================

-- 1. Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABLA: PROFILES (Perfiles Académicos)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT NOT NULL,
    username TEXT UNIQUE,
    avatar_url TEXT,
    academic_profile TEXT NOT NULL CHECK (
        academic_profile IN (
            'andres_bachillerato_1',
            'prima_bachillerato_5',
            'santiago_fisica_ucv',
            'mafe_diseno_ucab'
        )
    ),
    institution TEXT DEFAULT 'Ecosistema Académico',
    academic_goal TEXT,
    level_badge TEXT DEFAULT 'Explorador Nvl 1',
    streak_days INTEGER DEFAULT 0,
    xp_points INTEGER DEFAULT 0,
    preferences JSONB DEFAULT '{
        "theme": "dark",
        "sound_enabled": true,
        "focus_duration": 25,
        "calculator_docked": true,
        "compact_mode": false
    }'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

COMMENT ON TABLE public.profiles IS 'Almacena la metadata académica privada de cada estudiante.';

-- ==============================================================================
-- 3. TABLA: USER_DOCUMENTS (Almacén de Archivos y Análisis de IA) - PRIVADO
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.user_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size_bytes BIGINT,
    tags TEXT[] DEFAULT '{}',
    storage_bucket TEXT DEFAULT 'documents',
    ai_summary TEXT,
    ai_analysis JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

COMMENT ON TABLE public.user_documents IS 'Documentos, apuntes y fotos de pizarra estrictamente privados del estudiante.';

-- ==============================================================================
-- 4. TABLA: EXAM_RESULTS (Resultados de Exámenes) - COMUNITARIO PARA MÉTRICAS / PRIVADO PARA EDICIÓN
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.exam_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    exam_title TEXT NOT NULL,
    subject TEXT NOT NULL,
    area TEXT,
    score NUMERIC(5,2) NOT NULL,
    percentage NUMERIC(5,2),
    total_questions INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    time_taken_seconds INTEGER NOT NULL,
    time_used_seconds INTEGER,
    breakdown JSONB DEFAULT '{}'::jsonb,
    answers JSONB DEFAULT '[]'::jsonb,
    completed_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

COMMENT ON TABLE public.exam_results IS 'Historial de evaluaciones. Lectura comunitaria para promedios y percentiles; mutación privada.';

-- ==============================================================================
-- 5. TABLA: STUDY_SESSIONS (Sesiones Pomodoro & Concentración) - PRIVADO
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.study_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    profile_type TEXT NOT NULL,
    session_type TEXT NOT NULL CHECK (session_type IN ('pomodoro', 'deep_work', 'exam_simulation', 'gamified_challenge')),
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 6. TABLA: ACADEMIC_GUIDES (Guías Deconstruidas Privadas) - PRIVADO
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.academic_guides (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    area TEXT NOT NULL,
    content_json JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 7. TABLA: CERTIFIED_GUIDES (Guías Oficiales Certificadas) - COMUNITARIO
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.certified_guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL CHECK (category IN ('verbal', 'logico', 'ciencia')),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    references JSONB DEFAULT '[]'::jsonb,
    theory TEXT,
    past_exams JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

COMMENT ON TABLE public.certified_guides IS 'Guías de estudio oficiales del plan de estudios, compartidas para todos los alumnos.';

-- ==============================================================================
-- 8. TABLA: QUESTION_BANK (Banco de Preguntas Certificadas) - COMUNITARIO
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.question_bank (
    id TEXT PRIMARY KEY,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    question_text TEXT NOT NULL,
    latex_formula TEXT,
    options JSONB NOT NULL,
    correct_option_id TEXT NOT NULL,
    explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

COMMENT ON TABLE public.question_bank IS 'Banco general de preguntas curriculares accesible públicamente para simulacros.';

-- ==============================================================================
-- 9. TABLA: COMMUNITY_NOTES (Apuntes y Notas Colaborativas) - COMUNITARIO
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.community_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

COMMENT ON TABLE public.community_notes IS 'Notas de estudio compartidas entre compañeros de campus (lectura abierta, edición por autor).';

-- Función RPC para incremento seguro de likes comunitarios sin violar RLS
CREATE OR REPLACE FUNCTION public.increment_note_likes(note_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.community_notes
    SET likes_count = likes_count + 1
    WHERE id = note_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- 9B. TABLA: QUESTION_REPORTS (Reporte de Preguntas Problemáticas) - PRIVADO/COMUNITARIO
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.question_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL,
    issue_type TEXT NOT NULL DEFAULT 'error_redaccion',
    description TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

COMMENT ON TABLE public.question_reports IS 'Reportes de alumnos sobre erratas o inconsistencias en preguntas del banco.';

-- ==============================================================================
-- 10. TABLA: EVENTS_AND_DEADLINES (Calendario Académico y Parciales) - PRIVADO
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.events_and_deadlines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TEXT DEFAULT '08:00 AM',
    event_type TEXT NOT NULL CHECK (
        event_type IN ('PARCIAL', 'QUIZ', 'ENTREGA', 'TALLER', 'PROYECTO', 'RECUPERACION', 'ESTUDIO', 'REPASO_ESPACIADO')
    ),
    weight_percentage NUMERIC(5,2) DEFAULT 0,
    location TEXT,
    topics TEXT[] DEFAULT '{}',
    score_obtained NUMERIC(4,2),
    related_guide_id TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 11. TABLA: EVALUATION_PLANS (Planes de Evaluación y Ponderaciones) - PRIVADO
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.evaluation_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    target_grade NUMERIC(4,2) DEFAULT 16.0,
    passing_grade NUMERIC(4,2) DEFAULT 10.0,
    evaluations JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 12. TABLA: USER_TASKS (Tablero Kanban de Tareas) - PRIVADO
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.user_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('ALTA', 'MEDIA', 'BAJA')),
    due_date TEXT,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 13. TABLA: CREATIVE_DELIVERIES (Kanban de Proyectos y Diseño) - PRIVADO
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.creative_deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    course TEXT NOT NULL,
    column_stage TEXT NOT NULL CHECK (column_stage IN ('brief', 'moodboard', 'in_progress', 'final')),
    due_date TEXT,
    tags TEXT[] DEFAULT '{}',
    cover_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 14. TABLA: NOTIFICATION_PREFERENCES (Web Push & Telegram) - PRIVADO
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.notification_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    web_push_enabled BOOLEAN DEFAULT true,
    web_push_subscription JSONB,
    telegram_enabled BOOLEAN DEFAULT false,
    telegram_chat_id TEXT,
    morning_briefing_time TIME DEFAULT '07:30:00',
    exam_advance_hours INTEGER[] DEFAULT '{48, 24, 2}',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- ÍNDICES DE ALTO RENDIMIENTO (Postgres Optimization Rules)
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_academic_profile ON public.profiles(academic_profile);
CREATE INDEX IF NOT EXISTS idx_user_documents_user_id ON public.user_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_user_id ON public.exam_results(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_score ON public.exam_results(score DESC);
CREATE INDEX IF NOT EXISTS idx_events_user_date ON public.events_and_deadlines(user_id, event_date);
CREATE INDEX IF NOT EXISTS idx_evaluation_plans_user_subj ON public.evaluation_plans(user_id, subject);
CREATE INDEX IF NOT EXISTS idx_user_tasks_user_status ON public.user_tasks(user_id, completed);
CREATE INDEX IF NOT EXISTS idx_creative_deliv_user ON public.creative_deliveries(user_id, column_stage);
CREATE INDEX IF NOT EXISTS idx_community_notes_subject ON public.community_notes(subject);

-- ==============================================================================
-- POLÍTICAS DE SEGURIDAD RLS (ROW LEVEL SECURITY)
-- ==============================================================================
-- Habilitar RLS en todas las tablas del esquema público
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certified_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events_and_deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creative_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- A. TABLAS ESTRICTAMENTE PRIVADAS (auth.uid() = user_id)
-- ------------------------------------------------------------------------------

-- PROFILES
CREATE POLICY "profiles_select_own" ON public.profiles
    FOR SELECT TO authenticated
    USING ((select auth.uid()) = id);

CREATE POLICY "profiles_update_own" ON public.profiles
    FOR UPDATE TO authenticated
    USING ((select auth.uid()) = id)
    WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "profiles_insert_own" ON public.profiles
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) = id);

-- USER_DOCUMENTS (Fotos, apuntes y PDFs personales)
CREATE POLICY "user_docs_select_own" ON public.user_documents
    FOR SELECT TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "user_docs_insert_own" ON public.user_documents
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "user_docs_update_own" ON public.user_documents
    FOR UPDATE TO authenticated
    USING ((select auth.uid()) = user_id)
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "user_docs_delete_own" ON public.user_documents
    FOR DELETE TO authenticated
    USING ((select auth.uid()) = user_id);

-- EVENTS_AND_DEADLINES (Calendario y parciales personales)
CREATE POLICY "events_select_own" ON public.events_and_deadlines
    FOR SELECT TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "events_insert_own" ON public.events_and_deadlines
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "events_update_own" ON public.events_and_deadlines
    FOR UPDATE TO authenticated
    USING ((select auth.uid()) = user_id)
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "events_delete_own" ON public.events_and_deadlines
    FOR DELETE TO authenticated
    USING ((select auth.uid()) = user_id);

-- EVALUATION_PLANS (Ponderaciones y notas personales)
CREATE POLICY "plans_select_own" ON public.evaluation_plans
    FOR SELECT TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "plans_insert_own" ON public.evaluation_plans
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "plans_update_own" ON public.evaluation_plans
    FOR UPDATE TO authenticated
    USING ((select auth.uid()) = user_id)
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "plans_delete_own" ON public.evaluation_plans
    FOR DELETE TO authenticated
    USING ((select auth.uid()) = user_id);

-- USER_TASKS (Kanban de tareas personales)
CREATE POLICY "tasks_select_own" ON public.user_tasks
    FOR SELECT TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "tasks_insert_own" ON public.user_tasks
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "tasks_update_own" ON public.user_tasks
    FOR UPDATE TO authenticated
    USING ((select auth.uid()) = user_id)
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "tasks_delete_own" ON public.user_tasks
    FOR DELETE TO authenticated
    USING ((select auth.uid()) = user_id);

-- CREATIVE_DELIVERIES (Kanban de proyectos)
CREATE POLICY "deliveries_select_own" ON public.creative_deliveries
    FOR SELECT TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "deliveries_insert_own" ON public.creative_deliveries
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "deliveries_update_own" ON public.creative_deliveries
    FOR UPDATE TO authenticated
    USING ((select auth.uid()) = user_id)
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "deliveries_delete_own" ON public.creative_deliveries
    FOR DELETE TO authenticated
    USING ((select auth.uid()) = user_id);

-- ACADEMIC_GUIDES (Deconstrucciones IA personales)
CREATE POLICY "guides_select_own" ON public.academic_guides
    FOR SELECT TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "guides_insert_own" ON public.academic_guides
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "guides_update_own" ON public.academic_guides
    FOR UPDATE TO authenticated
    USING ((select auth.uid()) = user_id)
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "guides_delete_own" ON public.academic_guides
    FOR DELETE TO authenticated
    USING ((select auth.uid()) = user_id);

-- STUDY_SESSIONS
CREATE POLICY "sessions_select_own" ON public.study_sessions
    FOR SELECT TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "sessions_insert_own" ON public.study_sessions
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) = user_id);

-- NOTIFICATION_PREFERENCES
CREATE POLICY "notif_select_own" ON public.notification_preferences
    FOR SELECT TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "notif_all_own" ON public.notification_preferences
    FOR ALL TO authenticated
    USING ((select auth.uid()) = user_id)
    WITH CHECK ((select auth.uid()) = user_id);

-- ------------------------------------------------------------------------------
-- B. TABLAS COMUNITARIAS Y COMPARTIDAS (SELECT USING true)
-- ------------------------------------------------------------------------------

-- QUESTION_BANK (Lectura compartida para todos los estudiantes)
CREATE POLICY "questions_public_read" ON public.question_bank
    FOR SELECT TO authenticated, anon
    USING (true);

-- CERTIFIED_GUIDES (Lectura compartida de guías oficiales)
CREATE POLICY "certified_guides_public_read" ON public.certified_guides
    FOR SELECT TO authenticated, anon
    USING (true);

-- COMMUNITY_NOTES (Lectura compartida, escritura y edición únicamente por el autor)
CREATE POLICY "comm_notes_public_read" ON public.community_notes
    FOR SELECT TO authenticated, anon
    USING (true);

CREATE POLICY "comm_notes_insert_auth" ON public.community_notes
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) = author_id);

CREATE POLICY "comm_notes_update_own" ON public.community_notes
    FOR UPDATE TO authenticated
    USING ((select auth.uid()) = author_id)
    WITH CHECK ((select auth.uid()) = author_id);

CREATE POLICY "comm_notes_delete_own" ON public.community_notes
    FOR DELETE TO authenticated
    USING ((select auth.uid()) = author_id);

-- EXAM_RESULTS (Lectura para promedios globales y percentiles; inserción propia)
CREATE POLICY "exam_results_public_read" ON public.exam_results
    FOR SELECT TO authenticated, anon
    USING (true);

CREATE POLICY "exam_results_insert_own" ON public.exam_results
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "exam_results_update_own" ON public.exam_results
    FOR UPDATE TO authenticated
    USING ((select auth.uid()) = user_id)
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "exam_results_delete_own" ON public.exam_results
    FOR DELETE TO authenticated
    USING ((select auth.uid()) = user_id);

-- QUESTION_REPORTS (Reporte de problemas en preguntas)
CREATE POLICY "question_reports_insert_own" ON public.question_reports
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "question_reports_select_own" ON public.question_reports
    FOR SELECT TO authenticated
    USING ((select auth.uid()) = user_id);

-- ==============================================================================
-- 15. BLINDAJE DE SUPABASE STORAGE (BUCKET 'documents')
-- ==============================================================================
-- Crea el bucket 'documents' para archivos de apuntes y pizarras
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- Limpiar políticas anteriores inseguras de storage
DO $$
BEGIN
    DROP POLICY IF EXISTS "Public Access to documents" ON storage.objects;
    DROP POLICY IF EXISTS "Allow uploads to documents" ON storage.objects;
    DROP POLICY IF EXISTS "Allow delete documents" ON storage.objects;
    DROP POLICY IF EXISTS "storage_documents_select_own" ON storage.objects;
    DROP POLICY IF EXISTS "storage_documents_insert_own" ON storage.objects;
    DROP POLICY IF EXISTS "storage_documents_update_own" ON storage.objects;
    DROP POLICY IF EXISTS "storage_documents_delete_own" ON storage.objects;
END $$;

-- POLÍTICA 1: Cada estudiante solo puede leer archivos dentro de su carpeta personal {user_id}/*
CREATE POLICY "storage_documents_select_own" ON storage.objects
    FOR SELECT TO authenticated
    USING (
        bucket_id = 'documents' AND
        (storage.foldername(name))[1] = (select auth.uid())::text
    );

-- POLÍTICA 2: Cada estudiante solo puede subir a su carpeta personal {user_id}/*
CREATE POLICY "storage_documents_insert_own" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'documents' AND
        (storage.foldername(name))[1] = (select auth.uid())::text
    );

-- POLÍTICA 3: Cada estudiante solo puede actualizar archivos en su carpeta personal {user_id}/*
CREATE POLICY "storage_documents_update_own" ON storage.objects
    FOR UPDATE TO authenticated
    USING (
        bucket_id = 'documents' AND
        (storage.foldername(name))[1] = (select auth.uid())::text
    )
    WITH CHECK (
        bucket_id = 'documents' AND
        (storage.foldername(name))[1] = (select auth.uid())::text
    );

-- POLÍTICA 4: Cada estudiante solo puede eliminar archivos dentro de su carpeta personal {user_id}/*
CREATE POLICY "storage_documents_delete_own" ON storage.objects
    FOR DELETE TO authenticated
    USING (
        bucket_id = 'documents' AND
        (storage.foldername(name))[1] = (select auth.uid())::text
    );

-- ==============================================================================
-- 16. TRIGGERS Y FUNCIONES AUTOMÁTICAS
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_user_documents_updated_at ON public.user_documents;
CREATE TRIGGER set_user_documents_updated_at
    BEFORE UPDATE ON public.user_documents
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_events_updated_at ON public.events_and_deadlines;
CREATE TRIGGER set_events_updated_at
    BEFORE UPDATE ON public.events_and_deadlines
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_user_tasks_updated_at ON public.user_tasks;
CREATE TRIGGER set_user_tasks_updated_at
    BEFORE UPDATE ON public.user_tasks
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_community_notes_updated_at ON public.community_notes;
CREATE TRIGGER set_community_notes_updated_at
    BEFORE UPDATE ON public.community_notes
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Función de registro automático vinculada a auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        username,
        avatar_url,
        academic_profile,
        institution,
        academic_goal
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Estudiante'),
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
        COALESCE(NEW.raw_user_meta_data->>'academic_profile', 'andres_bachillerato_1'),
        COALESCE(NEW.raw_user_meta_data->>'institution', 'Centro de Estudio'),
        COALESCE(NEW.raw_user_meta_data->>'academic_goal', 'Optimizar rendimiento académico')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 14. TABLA: AI_PROCESSING_QUEUE (Cola de Análisis y Deconstrucción por IA) - PRIVADO / MCP
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.ai_processing_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    document_url TEXT NOT NULL,
    topic_title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed')),
    error_message TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

COMMENT ON TABLE public.ai_processing_queue IS 'Cola de documentos y tareas enviadas a procesar por el servidor MCP de Gemini Spark.';

ALTER TABLE public.ai_processing_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ai_queue_select_own"
    ON public.ai_processing_queue
    FOR SELECT
    USING ((select auth.uid()) = user_id);

CREATE POLICY "ai_queue_insert_own"
    ON public.ai_processing_queue
    FOR INSERT
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "ai_queue_update_own"
    ON public.ai_processing_queue
    FOR UPDATE
    USING ((select auth.uid()) = user_id);

CREATE POLICY "ai_queue_delete_own"
    ON public.ai_processing_queue
    FOR DELETE
    USING ((select auth.uid()) = user_id);

DROP TRIGGER IF EXISTS set_ai_processing_queue_updated_at ON public.ai_processing_queue;
CREATE TRIGGER set_ai_processing_queue_updated_at
    BEFORE UPDATE ON public.ai_processing_queue
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

