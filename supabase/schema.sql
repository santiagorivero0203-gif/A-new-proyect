-- ==============================================================================
-- CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - ESQUEMA SUPABASE POSTGRESQL (FASE 1)
-- ==============================================================================
-- Este script inicializa las tablas maestras, políticas de seguridad RLS,
-- disparadores (triggers) y los perfiles de los 4 estudiantes del ecosistema:
-- 1. Andrés (1er año bachillerato)
-- 2. Prima (5to año bachillerato / Admisión)
-- 3. Santiago (Ingreso a Física UCV)
-- 4. María Fernanda (Diseño Integral UCAB)
-- ==============================================================================

-- 1. Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA: PROFILES (Perfiles Académicos)
-- Vinculada directamente con auth.users de Supabase
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

-- Comentarios explicativos de la tabla profiles
COMMENT ON TABLE public.profiles IS 'Almacena la metadata académica diferenciada de cada estudiante.';
COMMENT ON COLUMN public.profiles.academic_profile IS 'Identificador del modo de interfaz y dashboard personalizado.';

-- 3. TABLA: USER_DOCUMENTS (Almacenamiento e Integración con Gemini AI)
-- Preparada para conectar con Supabase Storage (apuntes, fotos, PDFs) y Gemini AI
CREATE TABLE IF NOT EXISTS public.user_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL, -- 'application/pdf', 'image/png', etc.
    file_size_bytes BIGINT,
    tags TEXT[] DEFAULT '{}',
    storage_bucket TEXT DEFAULT 'documents',
    ai_summary TEXT, -- Resumen generado automáticamente por Gemini
    ai_analysis JSONB DEFAULT '{}'::jsonb, -- Conceptos clave, fórmulas o preguntas extraídas
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

COMMENT ON TABLE public.user_documents IS 'Registro de archivos subidos y procesados por el motor de IA Gemini.';

-- 4. TABLA: EXAM_RESULTS (Heredera del motor Simulación Simadi)
-- Almacena las evaluaciones, cronómetros y desglose de aciertos
CREATE TABLE IF NOT EXISTS public.exam_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    exam_title TEXT NOT NULL,
    subject TEXT NOT NULL,
    score NUMERIC(5,2) NOT NULL,
    total_questions INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    time_taken_seconds INTEGER NOT NULL,
    breakdown JSONB DEFAULT '{}'::jsonb, -- Desglose temático (Álgebra, Raz. Verbal, etc.)
    answers JSONB DEFAULT '[]'::jsonb,   -- Respuestas enviadas para retroalimentación
    completed_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

COMMENT ON TABLE public.exam_results IS 'Historial y métricas de desempeño de exámenes cronometrados.';

-- 5. TABLA: STUDY_SESSIONS (Métricas de Concentración y Productividad)
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
-- ÍNDICES DE RENDIMIENTO
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_academic_profile ON public.profiles(academic_profile);
CREATE INDEX IF NOT EXISTS idx_user_documents_user_id ON public.user_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_user_id ON public.exam_results(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_score ON public.exam_results(score DESC);
CREATE INDEX IF NOT EXISTS idx_study_sessions_user_id ON public.study_sessions(user_id);

-- ==============================================================================
-- POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY - RLS)
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

-- Reglas para PROFILES
CREATE POLICY "Los usuarios pueden consultar su propio perfil"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden insertar su propio perfil"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Reglas para USER_DOCUMENTS
CREATE POLICY "Los usuarios pueden gestionar sus propios documentos"
    ON public.user_documents FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Reglas para EXAM_RESULTS
CREATE POLICY "Los usuarios pueden gestionar sus resultados de exámenes"
    ON public.exam_results FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Reglas para STUDY_SESSIONS
CREATE POLICY "Los usuarios pueden gestionar sus sesiones de estudio"
    ON public.study_sessions FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ==============================================================================
-- TRIGGERS Y FUNCIONES AUTOMÁTICAS
-- ==============================================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers de actualización
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_user_documents_updated_at ON public.user_documents;
CREATE TRIGGER set_user_documents_updated_at
    BEFORE UPDATE ON public.user_documents
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Función Trigger para crear perfil automáticamente al registrarse en Auth
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

-- Trigger disparado tras registro en auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
