/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - SERVIDOR MCP REMOTO PARA GEMINI SPARK
 * ==============================================================================
 * Endpoint: /api/mcp (Vercel Serverless Function)
 * Protocolo: Model Context Protocol (MCP) vía @modelcontextprotocol/sdk
 * 
 * Modos de transporte soportados:
 * 1. SSE Transport: GET /api/mcp (handshake con text/event-stream) + POST /api/mcp?sessionId=...
 * 2. Stateless JSON-RPC 2.0 POST: POST /api/mcp (soporte directo initialize, tools/list, tools/call)
 * 3. Healthcheck GET: GET /api/mcp (JSON de diagnóstico de conectividad)
 * 4. Preflight CORS: OPTIONS /api/mcp (autorización 204 para Google/Gemini)
 * ==============================================================================
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

// ==============================================================================
// 1. CONFIGURACIÓN DEL CLIENTE SUPABASE (CON ROL SERVICE_ROLE PARA BYPASS RLS)
// ==============================================================================
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const mcpSecretKey = process.env.MCP_SECRET_KEY || '';

/**
 * Obtiene el cliente Supabase con privilegios administrativos (service_role)
 */
function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Faltan variables de entorno de Supabase en el servidor. Configure SUPABASE_URL (o VITE_SUPABASE_URL) y SUPABASE_SERVICE_ROLE_KEY en el panel de Vercel.'
    );
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

// ==============================================================================
// 2. GESTOR DE SESIONES SSE EN MEMORIA
// ==============================================================================
interface SessionRecord {
  transport: SSEServerTransport;
  server: McpServer;
  createdAt: number;
}

// Almacén persistente en warm-instances de Vercel
const activeSessions = new Map<string, SessionRecord>();

// Limpieza periódica de sesiones huérfanas (> 1 hora)
function cleanExpiredSessions() {
  const now = Date.now();
  const ONE_HOUR = 3600 * 1000;
  for (const [id, record] of activeSessions.entries()) {
    if (now - record.createdAt > ONE_HOUR) {
      try {
        record.transport.close();
      } catch {
        // Ignorar si ya estaba cerrada
      }
      activeSessions.delete(id);
    }
  }
}

// ==============================================================================
// 3. FÁBRICA DE SERVIDOR MCP Y REGISTRO DE HERRAMIENTAS
// ==============================================================================
function createMcpServerInstance(): McpServer {
  const server = new McpServer({
    name: 'centro-productividad-estudiantil',
    version: '1.0.0'
  });

  // ----------------------------------------------------------------------------
  // HERRAMIENTA 1: get_pending_study_uploads
  // ----------------------------------------------------------------------------
  server.tool(
    'get_pending_study_uploads',
    'Consulta los documentos y exámenes de estudio pendientes en la cola de procesamiento de IA (status = queued) para su deconstrucción pedagógica.',
    {
      userId: z
        .string()
        .optional()
        .describe('ID UUID opcional del estudiante para filtrar sus documentos específicos. Si se omite, retorna todos los pendientes.'),
      limit: z
        .number()
        .int()
        .positive()
        .max(50)
        .default(10)
        .describe('Cantidad máxima de registros a retornar (por defecto 10)')
    },
    async ({ userId, limit = 10 }) => {
      try {
        const supabase = getSupabaseAdmin();
        let query = supabase
          .from('ai_processing_queue')
          .select('id, user_id, document_url, topic_title, status, metadata, created_at')
          .eq('status', 'queued')
          .order('created_at', { ascending: true })
          .limit(limit);

        if (userId) {
          query = query.eq('user_id', userId);
        }

        const { data, error } = await query;
        if (error) {
          throw error;
        }

        let results = data || [];

        // Fallback inteligente: si no hay en la cola, consultar en user_documents
        if (results.length === 0) {
          let docQuery = supabase
            .from('user_documents')
            .select('id, user_id, title, file_path, file_type, created_at')
            .is('ai_analysis', null)
            .order('created_at', { ascending: true })
            .limit(limit);

          if (userId) {
            docQuery = docQuery.eq('user_id', userId);
          }

          const { data: docData } = await docQuery;
          if (docData && docData.length > 0) {
            results = docData.map((d) => ({
              id: d.id,
              user_id: d.user_id,
              document_url: d.file_path,
              topic_title: d.title,
              status: 'queued',
              metadata: { source_table: 'user_documents', file_type: d.file_type },
              created_at: d.created_at
            }));
          }
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  total_pending: results.length,
                  uploads: results.map((item) => ({
                    queue_id: item.id,
                    user_id: item.user_id,
                    topic_title: item.topic_title,
                    document_url: item.document_url,
                    created_at: item.created_at,
                    metadata: item.metadata
                  }))
                },
                null,
                2
              )
            }
          ]
        };
      } catch (err: any) {
        return {
          content: [{ type: 'text', text: `Error en get_pending_study_uploads: ${err.message}` }],
          isError: true
        };
      }
    }
  );

  // ----------------------------------------------------------------------------
  // HERRAMIENTA 2: publish_deconstructed_guide_and_exam
  // ----------------------------------------------------------------------------
  server.tool(
    'publish_deconstructed_guide_and_exam',
    'Publica de forma atómica en Supabase una guía de estudio deconstruida (con 7 pilares y LaTeX) y su batería de preguntas en question_bank, cambiando el estado en la cola a completed.',
    {
      userId: z.string().describe('ID UUID del estudiante propietario del contenido'),
      queueId: z.string().optional().describe('ID UUID del registro en ai_processing_queue para marcar como completed'),
      guide: z.object({
        id: z.string().optional().describe('ID opcional de la guía (se autogenera si se omite)'),
        title: z.string().describe('Título temático de la guía'),
        area: z.string().describe('Materia o área curricular (ej: Física I, Álgebra Lineal, Química)'),
        content: z.object({
          theory: z.string().describe('Teoría completa deconstruida con soporte para fórmulas en notación LaTeX ($...$ o $$...$$)'),
          glossary: z
            .array(
              z.object({
                term: z.string(),
                definition: z.string()
              })
            )
            .optional()
            .describe('Glosario de conceptos clave'),
          formulas: z
            .array(
              z.object({
                name: z.string(),
                latex: z.string(),
                description: z.string().optional()
              })
            )
            .optional()
            .describe('Fórmulas matemáticas y físicas esenciales'),
          stepByStep: z
            .array(
              z.object({
                stepNumber: z.number(),
                title: z.string(),
                instruction: z.string()
              })
            )
            .optional()
            .describe('Metodología paso a paso para resolver problemas tipo examen'),
          alerts: z.array(z.string()).optional().describe('Trampas y errores frecuentes en evaluaciones'),
          cornellNotes: z
            .object({
              cues: z.array(z.string()).optional(),
              notes: z.string().optional(),
              summary: z.string().optional()
            })
            .optional()
            .describe('Apuntes en formato Cornell'),
          flashcards: z
            .array(
              z.object({
                front: z.string(),
                back: z.string()
              })
            )
            .optional()
            .describe('Tarjetas mnemotécnicas activas')
        })
      }),
      questions: z
        .array(
          z.object({
            id: z.string().optional().describe('ID único de la pregunta (autogenerado si se omite)'),
            subject: z.string().describe('Materia de la pregunta'),
            topic: z.string().describe('Tema específico evaluado'),
            difficulty: z.enum(['FACIL', 'INTERMEDIO', 'DIFICIL', 'AVANZADO']).default('INTERMEDIO'),
            questionText: z.string().describe('Enunciado del problema o pregunta'),
            latexFormula: z.string().optional().describe('Fórmula LaTeX asociada si aplica'),
            options: z
              .array(
                z.object({
                  id: z.string().describe('Identificador de la alternativa (A, B, C, D)'),
                  text: z.string().describe('Texto de la opción')
                })
              )
              .min(2),
            correctOptionId: z.string().describe('Identificador de la alternativa correcta (ej: A)'),
            explanation: z.string().describe('Explicación pedagógica paso a paso')
          })
        )
        .describe('Batería de preguntas generadas para el simulador de exámenes')
    },
    async ({ userId, queueId, guide, questions }) => {
      try {
        const supabase = getSupabaseAdmin();

        // 1. Insertar guía deconstruida en academic_guides
        const guideId =
          guide.id || `guide_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const { error: guideError } = await supabase.from('academic_guides').upsert({
          id: guideId,
          user_id: userId,
          title: guide.title,
          area: guide.area,
          content_json: guide.content
        });

        if (guideError) {
          throw new Error(`Fallo al guardar la guía académica: ${guideError.message}`);
        }

        // 2. Insertar banco de preguntas en question_bank
        let insertedQuestions = 0;
        if (questions && questions.length > 0) {
          const questionRows = questions.map((q, idx) => ({
            id: q.id || `qb_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
            subject: q.subject || guide.area,
            topic: q.topic || guide.title,
            difficulty: q.difficulty || 'INTERMEDIO',
            question_text: q.questionText,
            latex_formula: q.latexFormula || null,
            options: q.options,
            correct_option_id: q.correctOptionId,
            explanation: q.explanation
          }));

          const { error: questionsError } = await supabase.from('question_bank').upsert(questionRows);
          if (questionsError) {
            throw new Error(`Fallo al insertar preguntas en question_bank: ${questionsError.message}`);
          }
          insertedQuestions = questionRows.length;
        }

        // 3. Actualizar la cola si se suministró queueId
        let queueUpdated = false;
        if (queueId) {
          const { error: queueError } = await supabase
            .from('ai_processing_queue')
            .update({
              status: 'completed',
              updated_at: new Date().toISOString()
            })
            .eq('id', queueId);

          if (!queueError) {
            queueUpdated = true;
          }
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: true,
                  message: 'Guía y banco de preguntas publicados exitosamente en Supabase.',
                  guide_id: guideId,
                  guide_title: guide.title,
                  questions_published: insertedQuestions,
                  queue_id: queueId || null,
                  queue_status_updated: queueUpdated
                },
                null,
                2
              )
            }
          ]
        };
      } catch (err: any) {
        return {
          content: [{ type: 'text', text: `Error en publish_deconstructed_guide_and_exam: ${err.message}` }],
          isError: true
        };
      }
    }
  );

  // ----------------------------------------------------------------------------
  // HERRAMIENTA 3: manage_evaluation_plan_and_calendar
  // ----------------------------------------------------------------------------
  server.tool(
    'manage_evaluation_plan_and_calendar',
    'Gestiona el calendario de evaluaciones (parciales, quizzes, entregas) y planes de ponderación académica del estudiante en Supabase.',
    {
      userId: z.string().describe('ID UUID del estudiante'),
      operation: z
        .enum(['create', 'read', 'update', 'delete'])
        .describe('Operación a realizar: create (nuevo evento), read (consultar calendario), update (modificar), delete (eliminar)'),
      subject: z.string().optional().describe('Nombre de la materia (ej: Física I, Álgebra, Diseño)'),
      title: z.string().optional().describe('Título de la evaluación o hito (ej: Primer Parcial: Cinemática)'),
      weightPercentage: z.number().min(0).max(100).optional().describe('Ponderación porcentual sobre 100% (ej: 25.0)'),
      eventDate: z.string().optional().describe('Fecha del evento en formato ISO YYYY-MM-DD (ej: 2026-11-20)'),
      eventTime: z.string().optional().default('08:00 AM').describe('Hora programada (ej: 08:00 AM)'),
      eventType: z
        .enum(['PARCIAL', 'QUIZ', 'ENTREGA', 'TALLER', 'PROYECTO', 'RECUPERACION', 'ESTUDIO', 'REPASO_ESPACIADO'])
        .optional()
        .default('PARCIAL'),
      eventId: z.string().optional().describe('ID UUID del evento (requerido para update y delete)'),
      notes: z.string().optional().describe('Notas o temas a repasar')
    },
    async ({
      userId,
      operation,
      subject,
      title,
      weightPercentage = 0,
      eventDate,
      eventTime = '08:00 AM',
      eventType = 'PARCIAL',
      eventId,
      notes
    }) => {
      try {
        const supabase = getSupabaseAdmin();

        if (operation === 'read') {
          let eventsQuery = supabase
            .from('events_and_deadlines')
            .select('*')
            .eq('user_id', userId)
            .order('event_date', { ascending: true });

          if (subject) {
            eventsQuery = eventsQuery.ilike('subject', `%${subject}%`);
          }

          const { data: events, error: evError } = await eventsQuery;
          if (evError) throw evError;

          let plansQuery = supabase
            .from('evaluation_plans')
            .select('*')
            .eq('user_id', userId);

          if (subject) {
            plansQuery = plansQuery.ilike('subject', `%${subject}%`);
          }

          const { data: plans } = await plansQuery;

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    total_events: events?.length || 0,
                    events: events || [],
                    evaluation_plans: plans || []
                  },
                  null,
                  2
                )
              }
            ]
          };
        }

        if (operation === 'create') {
          if (!subject || !title || !eventDate) {
            throw new Error('Para crear un evento se requiere subject, title y eventDate (YYYY-MM-DD).');
          }

          const newEvent = {
            user_id: userId,
            title,
            subject,
            event_date: eventDate,
            event_time: eventTime,
            event_type: eventType,
            weight_percentage: weightPercentage,
            notes: notes || null
          };

          const { data: createdEvent, error: insertError } = await supabase
            .from('events_and_deadlines')
            .insert(newEvent)
            .select()
            .single();

          if (insertError) throw insertError;

          // Sincronizar o crear registro en evaluation_plans si la materia no lo tiene
          const { data: existingPlan } = await supabase
            .from('evaluation_plans')
            .select('*')
            .eq('user_id', userId)
            .ilike('subject', subject)
            .maybeSingle();

          if (existingPlan) {
            const currentEvals = Array.isArray(existingPlan.evaluations) ? existingPlan.evaluations : [];
            const updatedEvals = [
              ...currentEvals,
              {
                id: createdEvent.id,
                title,
                weight: weightPercentage,
                date: eventDate,
                type: eventType
              }
            ];
            await supabase
              .from('evaluation_plans')
              .update({ evaluations: updatedEvals, updated_at: new Date().toISOString() })
              .eq('id', existingPlan.id);
          }

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    success: true,
                    message: 'Evento y corte de evaluación creados exitosamente.',
                    event: createdEvent
                  },
                  null,
                  2
                )
              }
            ]
          };
        }

        if (operation === 'update') {
          if (!eventId) {
            throw new Error('Para actualizar un evento se requiere eventId.');
          }

          const updateData: Record<string, any> = {
            updated_at: new Date().toISOString()
          };
          if (title) updateData.title = title;
          if (subject) updateData.subject = subject;
          if (eventDate) updateData.event_date = eventDate;
          if (eventTime) updateData.event_time = eventTime;
          if (eventType) updateData.event_type = eventType;
          if (weightPercentage !== undefined) updateData.weight_percentage = weightPercentage;
          if (notes !== undefined) updateData.notes = notes;

          const { data: updatedEvent, error: updateError } = await supabase
            .from('events_and_deadlines')
            .update(updateData)
            .eq('id', eventId)
            .eq('user_id', userId)
            .select()
            .single();

          if (updateError) throw updateError;

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    success: true,
                    message: 'Evento actualizado correctamente.',
                    event: updatedEvent
                  },
                  null,
                  2
                )
              }
            ]
          };
        }

        if (operation === 'delete') {
          if (!eventId) {
            throw new Error('Para eliminar un evento se requiere eventId.');
          }

          const { error: deleteError } = await supabase
            .from('events_and_deadlines')
            .delete()
            .eq('id', eventId)
            .eq('user_id', userId);

          if (deleteError) throw deleteError;

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    success: true,
                    message: `Evento con ID ${eventId} eliminado correctamente.`
                  },
                  null,
                  2
                )
              }
            ]
          };
        }

        throw new Error(`Operación inválida: ${operation}`);
      } catch (err: any) {
        return {
          content: [{ type: 'text', text: `Error en manage_evaluation_plan_and_calendar: ${err.message}` }],
          isError: true
        };
      }
    }
  );

  // ----------------------------------------------------------------------------
  // HERRAMIENTA 4: get_student_weaknesses
  // ----------------------------------------------------------------------------
  server.tool(
    'get_student_weaknesses',
    'Analiza el rendimiento del estudiante en la tabla exam_results para identificar materias o áreas temáticas con promedios inferiores al 60% (o < 12/20 puntos).',
    {
      userId: z.string().describe('ID UUID del estudiante a auditar'),
      thresholdPercentage: z
        .number()
        .min(0)
        .max(100)
        .default(60.0)
        .describe('Umbral porcentual de aprobación mínima (por defecto 60%, equivalente a 12/20 pts)')
    },
    async ({ userId, thresholdPercentage = 60.0 }) => {
      try {
        const supabase = getSupabaseAdmin();

        const { data: exams, error } = await supabase
          .from('exam_results')
          .select('id, exam_title, subject, area, score, percentage, total_questions, correct_answers, completed_at')
          .eq('user_id', userId)
          .order('completed_at', { ascending: false });

        if (error) throw error;

        if (!exams || exams.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    total_exams_analyzed: 0,
                    threshold_percentage: thresholdPercentage,
                    message:
                      'El estudiante aún no tiene registros de exámenes completados. No hay debilidades detectadas aún; se recomienda un simulacro de diagnóstico general.',
                    critical_weaknesses: [],
                    strong_areas: []
                  },
                  null,
                  2
                )
              }
            ]
          };
        }

        // Agrupar por materia y área
        interface SubjectAgg {
          subject: string;
          scores: number[];
          percentages: number[];
          totalQuestions: number;
          correctAnswers: number;
          examCount: number;
          areas: Set<string>;
        }

        const aggregation = new Map<string, SubjectAgg>();

        for (const exam of exams) {
          const key = exam.subject || 'Sin Asignatura';
          if (!aggregation.has(key)) {
            aggregation.set(key, {
              subject: key,
              scores: [],
              percentages: [],
              totalQuestions: 0,
              correctAnswers: 0,
              examCount: 0,
              areas: new Set()
            });
          }
          const agg = aggregation.get(key)!;
          const score = Number(exam.score) || 0;
          // Si percentage no viene calculado, derivarlo de score (base 20) o de correct_answers
          const pct =
            exam.percentage !== null && exam.percentage !== undefined
              ? Number(exam.percentage)
              : (score / 20) * 100;

          agg.scores.push(score);
          agg.percentages.push(pct);
          agg.totalQuestions += Number(exam.total_questions) || 0;
          agg.correctAnswers += Number(exam.correct_answers) || 0;
          agg.examCount += 1;
          if (exam.area) agg.areas.add(exam.area);
        }

        const criticalWeaknesses = [];
        const strongAreas = [];

        for (const [subj, data] of aggregation.entries()) {
          const avgScore = Number((data.scores.reduce((a, b) => a + b, 0) / data.scores.length).toFixed(2));
          const avgPct = Number((data.percentages.reduce((a, b) => a + b, 0) / data.percentages.length).toFixed(2));
          const accuracyRate =
            data.totalQuestions > 0
              ? Number(((data.correctAnswers / data.totalQuestions) * 100).toFixed(2))
              : avgPct;

          const summary = {
            subject: subj,
            average_score_base_20: avgScore,
            average_percentage: avgPct,
            accuracy_rate: accuracyRate,
            exams_completed: data.examCount,
            subtopics_evaluated: Array.from(data.areas),
            status: avgPct < thresholdPercentage ? 'CRITICAL_WEAKNESS' : 'SATISFACTORY'
          };

          if (avgPct < thresholdPercentage) {
            criticalWeaknesses.push({
              ...summary,
              pedagogical_recommendation: `El rendimiento en ${subj} (${avgPct}%) está por debajo del umbral mínimo del ${thresholdPercentage}%. Gemini Spark debe generar explicaciones paso a paso, reforzar teoría con fórmulas LaTeX y proponer ejercicios de dificultad FACIL a INTERMEDIO.`
            });
          } else {
            strongAreas.push(summary);
          }
        }

        // Ordenar las materias críticas de menor a mayor porcentaje
        criticalWeaknesses.sort((a, b) => a.average_percentage - b.average_percentage);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  total_exams_analyzed: exams.length,
                  threshold_percentage: thresholdPercentage,
                  critical_weaknesses_count: criticalWeaknesses.length,
                  critical_weaknesses: criticalWeaknesses,
                  strong_areas: strongAreas,
                  prompt_directive_for_gemini:
                    criticalWeaknesses.length > 0
                      ? `ATENCIÓN: El estudiante presenta dificultades prioritarias en: ${criticalWeaknesses
                          .map((w) => `${w.subject} (${w.average_percentage}%)`)
                          .join(', ')}. Prioriza estas asignaturas en respuestas y generación de guías.`
                      : 'El estudiante mantiene un rendimiento superior al 60% en todas sus materias registradas.'
                },
                null,
                2
              )
            }
          ]
        };
      } catch (err: any) {
        return {
          content: [{ type: 'text', text: `Error en get_student_weaknesses: ${err.message}` }],
          isError: true
        };
      }
    }
  );

  return server;
}

// ==============================================================================
// 4. CONFIGURACIÓN DE CABECERAS CORS Y AUTENTICACIÓN
// ==============================================================================
function applyCorsHeaders(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, Content-Type, x-api-key, baggage, sentry-trace, accept, cache-control'
  );
  res.setHeader('Access-Control-Max-Age', '86400');
}

/**
 * Valida la autenticación de la petición
 */
function isAuthorized(req: VercelRequest): boolean {
  // Si no se configuró MCP_SECRET_KEY, se permite el paso con aviso en logs
  if (!mcpSecretKey) {
    return true;
  }

  const authHeader = req.headers['authorization'];
  let token = '';

  if (typeof authHeader === 'string' && authHeader.toLowerCase().startsWith('bearer ')) {
    token = authHeader.slice(7).trim();
  } else if (typeof req.headers['x-api-key'] === 'string') {
    token = req.headers['x-api-key'].trim();
  } else if (req.query && typeof req.query.token === 'string') {
    token = req.query.token.trim();
  } else if (req.query && typeof req.query.apiKey === 'string') {
    token = req.query.apiKey.trim();
  }

  return token === mcpSecretKey;
}

// ==============================================================================
// 5. HANDLER PRINCIPAL DE LA SERVERLESS FUNCTION DE VERCEL
// ==============================================================================
export default async function handler(req: VercelRequest, res: VercelResponse) {
  cleanExpiredSessions();
  applyCorsHeaders(res);

  // 1. Manejo inmediato de preflights CORS (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // 2. Comprobación de salud / Healthcheck para GET sin SSE (Evaluadores de MCP / Gemini URL checker)
  const isSseRequest = req.headers.accept?.includes('text/event-stream');
  if (req.method === 'GET' && !isSseRequest) {
    const authorized = isAuthorized(req);
    return res.status(200).json({
      status: 'healthy',
      protocol: 'model-context-protocol',
      name: 'centro-productividad-estudiantil',
      version: '1.0.0',
      authentication: {
        required: Boolean(mcpSecretKey),
        authenticated: authorized
      },
      capabilities: {
        tools: {
          listChanged: true
        }
      },
      tools: [
        'get_pending_study_uploads',
        'publish_deconstructed_guide_and_exam',
        'manage_evaluation_plan_and_calendar',
        'get_student_weaknesses'
      ],
      sse_endpoint: '/api/mcp',
      message: 'Servidor MCP activo y listo para conexión con Gemini Spark.'
    });
  }

  // 3. Validación de autenticación para invocaciones activas (SSE y POST)
  if (!isAuthorized(req)) {
    return res.status(401).json({
      jsonrpc: '2.0',
      error: {
        code: -32001,
        message: 'No autorizado. Proporcione una clave válida vía Authorization: Bearer <MCP_SECRET_KEY> o Header x-api-key.'
      },
      id: null
    });
  }

  // 4. MODO A: Iniciar conexión SSE (Handshake MCP estándar)
  if (req.method === 'GET' && isSseRequest) {
    try {
      const serverInstance = createMcpServerInstance();
      const transport = new SSEServerTransport('/api/mcp', res);

      activeSessions.set(transport.sessionId, {
        transport,
        server: serverInstance,
        createdAt: Date.now()
      });

      res.on('close', () => {
        try {
          transport.close();
        } catch {
          // Ya cerrada
        }
        activeSessions.delete(transport.sessionId);
      });

      await serverInstance.connect(transport);
      return;
    } catch (err: any) {
      console.error('[MCP SSE Error]:', err);
      if (!res.headersSent) {
        return res.status(500).json({ error: `Fallo al iniciar transporte SSE: ${err.message}` });
      }
      return;
    }
  }

  // 5. MODO B: Mensajes POST entrantes
  if (req.method === 'POST') {
    const sessionId = (req.query?.sessionId as string) || '';

    // Si viene sessionId y existe en memoria activa, delegar al SSEServerTransport
    if (sessionId && activeSessions.has(sessionId)) {
      try {
        const sessionRecord = activeSessions.get(sessionId)!;
        await sessionRecord.transport.handlePostMessage(req, res, req.body);
        return;
      } catch (err: any) {
        console.error('[MCP Post Session Error]:', err);
        return res.status(500).json({
          jsonrpc: '2.0',
          error: { code: -32603, message: `Error procesando mensaje en sesión: ${err.message}` },
          id: null
        });
      }
    }

    // 6. MODO C: Stateless Direct JSON-RPC 2.0 (Respaldo Serverless robusto)
    // Cuando el cliente envía peticiones POST directamente o la sesión cayó en otro worker
    try {
      const serverInstance = createMcpServerInstance();
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

      if (!body || typeof body !== 'object') {
        return res.status(400).json({
          jsonrpc: '2.0',
          error: { code: -32700, message: 'Parse error: JSON inválido recibido en el cuerpo.' },
          id: null
        });
      }

      const { jsonrpc = '2.0', id = null, method, params = {} } = body;

      // 6.1 Initialize
      if (method === 'initialize') {
        return res.status(200).json({
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: {
              tools: { listChanged: true }
            },
            serverInfo: {
              name: 'centro-productividad-estudiantil',
              version: '1.0.0'
            }
          }
        });
      }

      // 6.2 Initialized notification
      if (method === 'notifications/initialized') {
        return res.status(200).json({ jsonrpc: '2.0', id: null, result: {} });
      }

      // 6.3 Ping
      if (method === 'ping') {
        return res.status(200).json({
          jsonrpc: '2.0',
          id,
          result: {}
        });
      }

      // 6.4 List tools (tools/list)
      if (method === 'tools/list') {
        const listHandler = (serverInstance.server as any)._requestHandlers?.get('tools/list');
        if (listHandler) {
          const listResult = await listHandler({ method: 'tools/list', params }, {});
          return res.status(200).json({
            jsonrpc: '2.0',
            id,
            result: listResult
          });
        }
      }

      // 6.5 Call tool (tools/call)
      if (method === 'tools/call') {
        const callHandler = (serverInstance.server as any)._requestHandlers?.get('tools/call');
        if (callHandler) {
          const callResult = await callHandler({ method: 'tools/call', params }, {});
          return res.status(200).json({
            jsonrpc: '2.0',
            id,
            result: callResult
          });
        }
      }

      // Método no implementado
      return res.status(404).json({
        jsonrpc: '2.0',
        error: { code: -32601, message: `Método no encontrado: ${method}` },
        id
      });
    } catch (err: any) {
      console.error('[MCP JSON-RPC Error]:', err);
      return res.status(500).json({
        jsonrpc: '2.0',
        error: { code: -32603, message: `Error interno de procesamiento: ${err.message}` },
        id: null
      });
    }
  }

  // Método no permitido
  return res.status(405).json({ error: `Método ${req.method} no permitido en /api/mcp` });
}
