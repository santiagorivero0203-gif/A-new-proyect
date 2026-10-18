/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - WORKER AUTÓNOMO DE IA (NEXUS WORKER)
 * ==============================================================================
 * Endpoint: /api/nexus-worker (Vercel Serverless Function)
 * Motor: Google Gemini 2.5 Flash vía @google/genai (Carril A Instantáneo Autónomo)
 * 
 * Funciones Principales:
 * 1. Procesamiento Instantáneo (0 clics): Desglose de tareas Notion AI y guías rápidas en 3-8s.
 * 2. Guardarraíl de Calibración Pedagógica: Respeta el academicLevel del estudiante.
 * 3. Limpieza Regex de Doble Barra LaTeX: Corrige \frac, \sqrt para evitar SyntaxError en JSON.
 * 4. Carril C de Rescate Automático: Procesa archivos encolados con más de 30 minutos de espera.
 * ==============================================================================
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';
import {
  type AcademicLevel,
  buildStudyGuidePrompt,
  buildTaskBreakdownPrompt,
  cleanAndParseJsonWithLatex,
  mapProfileToAcademicLevel
} from '../lib/pedagogicalPrompts.js';

// ==============================================================================
// 1. CONFIGURACIÓN DE CLIENTES (SUPABASE ADMIN + GOOGLE GENAI)
// ==============================================================================
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const geminiApiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';

function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Faltan variables de entorno de Supabase (SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY).'
    );
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

function getGeminiClient(): GoogleGenAI {
  if (!geminiApiKey) {
    throw new Error(
      'Falta la variable de entorno GEMINI_API_KEY en el servidor Vercel. Por favor configúrala en el panel de Vercel.'
    );
  }
  return new GoogleGenAI({ apiKey: geminiApiKey });
}

// Configuración de encabezados CORS
function setCorsHeaders(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );
}

// ==============================================================================
// 2. LÓGICA DE PROCESAMIENTO: DESGLOSE DE TAREAS NOTION AI
// ==============================================================================
interface TaskBreakdownResult {
  priority: 'ALTA' | 'MEDIA' | 'BAJA';
  estimated_pomodoros: number;
  subtasks: string[];
  strategic_advice: string;
}

async function processTaskBreakdown(params: {
  taskId: string;
  userId: string;
  taskTitle: string;
  subject: string;
  notes?: string;
  academicLevel?: AcademicLevel;
}) {
  const { taskId, userId: _userId, taskTitle, subject, notes, academicLevel = 'BASICO_ESCOLAR' } = params;
  const ai = getGeminiClient();
  const supabase = getSupabaseAdmin();

  const prompt = buildTaskBreakdownPrompt({
    academicLevel,
    taskTitle,
    subject,
    notes
  });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt
  });

  const rawText = response.text || '';
  const parsedData = cleanAndParseJsonWithLatex<TaskBreakdownResult>(rawText);

  // Inyectar en kanban_tasks o user_tasks
  const updatePayload = {
    priority: parsedData.priority || 'MEDIA',
    ai_metadata: {
      ...parsedData,
      analyzed_at: new Date().toISOString(),
      academic_level: academicLevel,
      model_used: 'gemini-2.5-flash-auto_api'
    },
    updated_at: new Date().toISOString()
  };

  let targetTable = 'kanban_tasks';
  let { error: updateError } = await supabase
    .from('kanban_tasks')
    .update(updatePayload)
    .eq('id', taskId);

  if (updateError && updateError.message?.includes('does not exist')) {
    targetTable = 'user_tasks';
    const retry = await supabase
      .from('user_tasks')
      .update(updatePayload)
      .eq('id', taskId);
    updateError = retry.error;
  }

  if (updateError) {
    throw new Error(`Error actualizando ${targetTable}: ${updateError.message}`);
  }

  return {
    success: true,
    taskId,
    targetTable,
    breakdown: parsedData
  };
}

// ==============================================================================
// 3. LÓGICA DE PROCESAMIENTO: DECONSTRUCCIÓN PEDAGÓGICA DE GUÍAS
// ==============================================================================
interface GuideDeconstructionResult {
  guide: {
    title: string;
    area: string;
    content: {
      theory: string;
      glossary?: Array<{ term: string; definition: string }>;
      formulas?: Array<{ name: string; latex: string; description?: string }>;
      stepByStep?: Array<{ stepNumber: number; title: string; instruction: string }>;
      alerts?: string[];
      cornellNotes?: { cues?: string[]; notes?: string; summary?: string };
      flashcards?: Array<{ front: string; back: string }>;
    };
  };
  questions: Array<{
    subject: string;
    topic: string;
    area?: string;
    type: string;
    question: string;
    options: string[];
    correct_answer: string;
    difficulty: string;
    explanation: string;
  }>;
}

async function processGuideDeconstruction(params: {
  queueId?: string;
  userId: string;
  topicTitle: string;
  subject: string;
  topic: string;
  documentUrl?: string;
  documentText?: string;
  academicLevel: AcademicLevel;
}) {
  const { queueId, userId, topicTitle: _topicTitle, subject, topic, documentUrl, documentText, academicLevel } = params;
  const ai = getGeminiClient();
  const supabase = getSupabaseAdmin();

  // 1. Marcar como 'processing' si hay queueId
  if (queueId) {
    await supabase
      .from('ai_processing_queue')
      .update({ status: 'processing', updated_at: new Date().toISOString() })
      .eq('id', queueId);
  }

  const prompt = buildStudyGuidePrompt({
    academicLevel,
    subject,
    topic,
    documentText,
    documentUrl
  });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt
  });

  const rawText = response.text || '';
  const parsedData = cleanAndParseJsonWithLatex<GuideDeconstructionResult>(rawText);

  if (!parsedData.guide || !parsedData.questions) {
    throw new Error('La respuesta de Gemini no incluye los objetos guide o questions esperados.');
  }

  // 2. Guardar guía en academic_guides
  const guideId = `guide_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const guideRecord = {
    id: guideId,
    user_id: userId,
    title: parsedData.guide.title || topic,
    subject: parsedData.guide.area || subject,
    summary: parsedData.guide.content?.cornellNotes?.summary || `Guía deconstruida para ${topic}`,
    content: parsedData.guide.content,
    created_at: new Date().toISOString()
  };

  const { error: guideError } = await supabase.from('academic_guides').insert(guideRecord);
  if (guideError) {
    console.warn('[Nexus Worker] academic_guides insert error:', guideError.message);
  }

  // 3. Guardar preguntas en question_bank
  if (parsedData.questions.length > 0) {
    const questionRows = parsedData.questions.map((q, idx) => ({
      id: `ai_q_${Date.now()}_${idx}`,
      subject: q.subject || subject,
      topic: q.topic || topic,
      area: q.area || subject,
      difficulty: q.difficulty || 'FACIL',
      question: q.question,
      options: q.options,
      correct_answer: q.correct_answer,
      explanation: q.explanation
    }));

    const { error: qError } = await supabase.from('question_bank').upsert(questionRows);
    if (qError) {
      console.warn('[Nexus Worker] question_bank insert error:', qError.message);
    }
  }

  // 4. Marcar en la cola como 'completed'
  if (queueId) {
    await supabase
      .from('ai_processing_queue')
      .update({
        status: 'completed',
        updated_at: new Date().toISOString(),
        metadata: {
          generated_guide_id: guideId,
          questions_count: parsedData.questions.length,
          model_used: 'gemini-2.5-flash-auto_api',
          academic_level: academicLevel
        }
      })
      .eq('id', queueId);
  }

  return {
    success: true,
    guideId,
    title: parsedData.guide.title,
    questionsCount: parsedData.questions.length,
    academicLevel
  };
}

// ==============================================================================
// 4. PROCESADOR DE COLA: AUTO_API O RESCATE (>30 MINUTOS)
// ==============================================================================
async function processNextQueueItem(targetQueueId?: string, isRescue = false) {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('ai_processing_queue')
    .select('*')
    .eq('status', 'queued')
    .order('created_at', { ascending: true })
    .limit(1);

  if (targetQueueId) {
    query = supabase
      .from('ai_processing_queue')
      .select('*')
      .eq('id', targetQueueId)
      .limit(1);
  } else if (isRescue) {
    // Carril C: Rescate de elementos pendientes con más de 30 minutos
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    query = query.lt('created_at', thirtyMinutesAgo);
  } else {
    // Carril A: Filtrar por processing_mode = 'auto_api'
    query = query.or('processing_mode.eq.auto_api,routing_mode.eq.auto_api');
  }

  const { data: rows, error: queueFetchError } = await query;
  if (queueFetchError) throw queueFetchError;

  if (!rows || rows.length === 0) {
    return { processed: false, message: 'No hay elementos pendientes en la cola para procesar.' };
  }

  const item = rows[0];
  const metadata = item.metadata || {};

  // Determinar academicLevel
  let academicLevel: AcademicLevel = item.academic_level || metadata.academic_level || 'BASICO_ESCOLAR';

  // Si no está especificado, inferir del perfil de usuario en profiles
  if (!item.academic_level && !metadata.academic_level) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('academic_profile')
      .eq('id', item.user_id)
      .maybeSingle();

    if (profile?.academic_profile) {
      academicLevel = mapProfileToAcademicLevel(profile.academic_profile);
    }
  }

  // Verificar si es un desglose de tarea o una guía de estudio
  if (metadata.type === 'task_breakdown' || metadata.task_id) {
    const result = await processTaskBreakdown({
      taskId: metadata.task_id || item.id,
      userId: item.user_id,
      taskTitle: item.topic_title || metadata.title || 'Objetivo de Estudio',
      subject: metadata.subject || 'General',
      notes: metadata.notes || '',
      academicLevel
    });

    await supabase
      .from('ai_processing_queue')
      .update({ status: 'completed', updated_at: new Date().toISOString() })
      .eq('id', item.id);

    return { processed: true, type: 'task_breakdown', result };
  }

  // Deconstrucción pedagógica de documento
  const subject = metadata.subject || 'Materia';
  const topic = metadata.topic || item.topic_title || 'Tema de Estudio';

  const result = await processGuideDeconstruction({
    queueId: item.id,
    userId: item.user_id,
    topicTitle: item.topic_title,
    subject,
    topic,
    documentUrl: item.document_url,
    documentText: metadata.extracted_text || '',
    academicLevel
  });

  return { processed: true, type: 'guide_deconstruction', result };
}

// ==============================================================================
// 5. HANDLER PRINCIPAL DE VERCEL SERVERLESS FUNCTION
// ==============================================================================
export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // GET: Healthcheck, diagnóstico y disparo opcional de cron/rescate
  if (req.method === 'GET') {
    try {
      const rescueParam = req.query.rescue === 'true';
      const processParam = req.query.process === 'true';

      if (rescueParam || processParam) {
        const queueResult = await processNextQueueItem(undefined, rescueParam);
        return res.status(200).json({
          status: 'ok',
          worker: 'nexus-worker-gemini-2.5-flash',
          rescueMode: rescueParam,
          queueResult
        });
      }

      // Diagnóstico básico
      const supabaseConfigured = Boolean(supabaseUrl && supabaseServiceKey);
      const geminiConfigured = Boolean(geminiApiKey);

      return res.status(200).json({
        status: 'online',
        service: 'Nexus AI Autonomous Worker',
        model: 'gemini-2.5-flash',
        supabaseConfigured,
        geminiConfigured,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }

  // POST: Ejecución bajo demanda
  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const { action = 'process_queue', queueId, taskId, taskTitle, subject, notes, academicLevel, userId } = body;

      // Acción 1: Desglose directo de tarea Kanban (Notion AI)
      if (action === 'task_breakdown') {
        if (!taskId || !taskTitle) {
          return res.status(400).json({
            error: 'Para task_breakdown se requiere taskId y taskTitle.'
          });
        }

        const result = await processTaskBreakdown({
          taskId,
          userId: userId || 'anonymous',
          taskTitle,
          subject: subject || 'General',
          notes: notes || '',
          academicLevel: academicLevel || 'BASICO_ESCOLAR'
        });

        return res.status(200).json(result);
      }

      // Acción 2: Procesar un ítem específico de la cola o el siguiente disponible
      if (action === 'process_queue') {
        const result = await processNextQueueItem(queueId, false);
        return res.status(200).json(result);
      }

      // Acción 3: Rescate forzado (>30 min)
      if (action === 'rescue_pending') {
        const result = await processNextQueueItem(undefined, true);
        return res.status(200).json(result);
      }

      return res.status(400).json({
        error: `Acción no reconocida: ${action}`
      });
    } catch (err: any) {
      console.error('[Nexus Worker Error]:', err);

      // Si falló un queueId específico, marcarlo como fallido para no dejarlo congelado
      if (req.body?.queueId) {
        try {
          const supabase = getSupabaseAdmin();
          await supabase
            .from('ai_processing_queue')
            .update({
              status: 'failed',
              error_message: err.message,
              updated_at: new Date().toISOString()
            })
            .eq('id', req.body.queueId);
        } catch {
          // Ignorar fallo secundario de actualización
        }
      }

      return res.status(500).json({
        error: err.message || 'Error interno en Nexus Worker'
      });
    }
  }

  return res.status(405).json({ error: 'Método HTTP no permitido' });
}
