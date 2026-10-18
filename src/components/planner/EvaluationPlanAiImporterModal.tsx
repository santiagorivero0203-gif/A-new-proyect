import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { plannerService } from '../../services/plannerService';
import type { EvaluationPlanImportPayload } from '../../types/academicPlanner.types';
import {
  Sparkles,
  Copy,
  Check,
  Calendar,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  X,
  FileText,
} from 'lucide-react';

import {
  extractJsonFromAiResponse,
  validateAndNormalizeEvaluationPlan,
} from '../../utils/academicImportValidator';

interface EvaluationPlanAiImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanImported: () => void;
}

export const getMasterEvaluationPlanPrompt = (
  year: number = new Date().getFullYear()
): string => `Actúa como un asistente experto en digitalización académica para el Centro de Productividad Estudiantil (CPE).

Te adjunto una FOTO / IMAGEN / PDF del Plan de Evaluación oficial de mi asignatura.

Tu objetivo es analizar la imagen y estructurar todo el cronograma evaluativo con máxima fidelidad.

INSTRUCCIONES DE EXTRACCIÓN:
1. Extrae el nombre de la Asignatura, Nombre del Profesor y Período Académico (ej. "Semestre ${year}-II", "1er Lapso ${year}-${year + 1}").
2. Identifica cada corte o evaluación (Parcial, Quiz, Taller, Proyecto, Entrega, Recuperación).
3. Determina la fecha exacta en formato ISO (YYYY-MM-DD). Si solo aparece la semana o mes, infiere la fecha más probable del año ${year} o ciclo vigente.
4. Extrae la ponderación porcentual exacta (número entre 1 y 100). Verifica que la suma total se acerque o iguale a 100%.
5. Desglosa los TEMAS PROBABLES que evaluará cada prueba según el contenido de la lámina o el orden lógico del programa.
6. Asigna el tipo exacto entre: "PARCIAL", "QUIZ", "ENTREGA", "TALLER", "PROYECTO", "RECUPERACION".

RESPONDE EXCLUSIVAMENTE CON UN BLOQUE JSON VÁLIDO CON LA SIGUIENTE ESTRUCTURA (SIN TEXTO ANTES NI DESPUÉS):

\`\`\`json
{
  "schemaVersion": "cpe-evaluation-plan-v1",
  "subject": "Nombre de la Asignatura",
  "professor": "Nombre del Docente (o null)",
  "academicPeriod": "Período / Lapso",
  "totalWeightExpected": 100,
  "evaluations": [
    {
      "title": "Primer Parcial: Nombre del Bloque",
      "type": "PARCIAL",
      "date": "${year}-11-15",
      "time": "08:00 AM",
      "weightPercentage": 25,
      "location": "Aula 204",
      "topics": [
        "Tema 1 evaluado",
        "Tema 2 evaluado",
        "Tema 3 evaluado"
      ],
      "suggestedStudyAlertDays": [7, 3, 1],
      "notes": "Llevar formulario y calculadora"
    }
  ]
}
\`\`\``;

export const MASTER_EVALUATION_PLAN_PROMPT = getMasterEvaluationPlanPrompt();

export const EvaluationPlanAiImporterModal: React.FC<EvaluationPlanAiImporterModalProps> = ({
  isOpen,
  onClose,
  onPlanImported,
}) => {
  const { user } = useAuth();
  const userId = user?.id || user?.academic_profile || 'santiago_fisica_ucv';

  const [activeStep, setActiveStep] = useState<'PROMPT' | 'PASTE'>('PROMPT');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [parsedPayload, setParsedPayload] = useState<EvaluationPlanImportPayload | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [parseWarnings, setParseWarnings] = useState<string[]>([]);

  // Opciones de inyección
  const [createReminders, setCreateReminders] = useState(true);
  const [createKanbanTasks, setCreateKanbanTasks] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState<{
    events: number;
    reminders: number;
    tasks: number;
  } | null>(null);

  if (!isOpen) return null;

  // Copiar prompt oficial
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(getMasterEvaluationPlanPrompt());
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 3000);
  };

  // Parsear texto JSON pegado
  const handleParseJson = (text: string) => {
    setJsonInput(text);
    setParseError(null);
    setParseWarnings([]);
    setParsedPayload(null);

    if (!text.trim()) return;

    try {
      const cleaned = extractJsonFromAiResponse(text);
      if (!cleaned) {
        throw new Error('No se detectó un bloque JSON válido en el texto pegado.');
      }

      const rawParsed = JSON.parse(cleaned);
      const validation = validateAndNormalizeEvaluationPlan(rawParsed);

      if (!validation.isValid) {
        throw new Error(validation.errors.join(' '));
      }

      setParsedPayload(validation.data!);
      setParseWarnings(validation.warnings);
    } catch (err: any) {
      setParseError(
        err.message ||
          'Error de sintaxis JSON. Revisa que el bloque copiado esté completo desde Gemini.'
      );
    }
  };

  // Inyectar en el calendario y planificador
  const handleExecuteImport = async () => {
    if (!parsedPayload) return;

    setIsImporting(true);
    try {
      const result = await plannerService.importEvaluationPlan(userId, parsedPayload, {
        createReminders,
        createKanbanTasks,
        userAcademicProfile: user?.academic_profile,
      });

      setImportSuccess({
        events: result.eventsCreated,
        reminders: result.remindersCreated,
        tasks: result.tasksCreated,
      });

      onPlanImported();
    } catch (err) {
      console.error('Error importando plan:', err);
    } finally {
      setIsImporting(false);
    }
  };

  // Calcular suma total de ponderaciones
  const totalWeightSum = parsedPayload?.evaluations.reduce(
    (acc, item) => acc + (Number(item.weightPercentage) || 0),
    0
  ) || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-soft-2xl border border-slate-200/90 flex flex-col overflow-hidden">
        {/* Encabezado del Modal */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0F52BA] to-indigo-500 text-white flex items-center justify-center shadow-soft-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans tracking-tight">
                Importador Inteligente de Planes de Evaluación
              </h3>
              <p className="text-xs text-slate-500">
                Digitaliza fotos de tu sílabo o plan de evaluación con Gemini o tu IA de confianza.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selector de Pasos */}
        <div className="px-6 pt-3 pb-1 border-b border-slate-100 flex items-center gap-2">
          <button
            onClick={() => setActiveStep('PROMPT')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeStep === 'PROMPT'
                ? 'bg-slate-900 text-white shadow-soft-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>1. Copiar Prompt para Gemini</span>
          </button>
          <button
            onClick={() => setActiveStep('PASTE')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeStep === 'PASTE'
                ? 'bg-slate-900 text-white shadow-soft-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>2. Pegar JSON & Vista Previa</span>
            {parsedPayload && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>
        </div>

        {/* Contenido con Scroll */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-xs">
          {importSuccess ? (
            /* Estado de Éxito */
            <div className="py-8 text-center space-y-4 animate-scaleUp">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-soft-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900">
                  ¡Plan de Evaluación Inyectado con Éxito!
                </h4>
                <p className="text-slate-500 max-w-md mx-auto text-xs">
                  Se registraron <strong>{importSuccess.events}</strong> evaluaciones en tu calendario oficial,{' '}
                  <strong>{importSuccess.reminders}</strong> recordatorios de estudio previos y{' '}
                  <strong>{importSuccess.tasks}</strong> metas en tu tablero Kanban.
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  onClick={onClose}
                  className="btn-brand px-6 py-2.5 text-xs rounded-xl"
                >
                  Ver en mi Calendario
                </button>
              </div>
            </div>
          ) : activeStep === 'PROMPT' ? (
            /* PASO 1: Copiar Prompt Maestro */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
                <div className="flex items-center gap-2 text-[#0F52BA] font-bold">
                  <FileText className="w-4 h-4" />
                  <span>¿Cómo funciona? (Solo 2 minutos)</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 leading-relaxed text-[11px]">
                  <li>Tómale una foto clara con tu teléfono o captura de pantalla a la hoja del Plan de Evaluación o Sílabo.</li>
                  <li>Copia el prompt maestro calibrado haciendo clic en el botón inferior.</li>
                  <li>Abre <strong>Gemini</strong> (o tu IA de confianza), adjunta la foto y pega el prompt.</li>
                  <li>Copia la respuesta JSON que te entregue la IA y pégala en el paso 2 de esta ventana.</li>
                </ol>
              </div>

              {/* Caja del Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Prompt Maestro Calibrado:
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://gemini.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0F52BA] hover:underline"
                    >
                      <span>Abrir Gemini</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      onClick={handleCopyPrompt}
                      className="px-3 py-1.5 rounded-xl bg-[#0F52BA] hover:bg-[#0c4194] text-white font-bold transition-all flex items-center gap-1.5 shadow-soft-xs active:scale-95"
                    >
                      {copiedPrompt ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar Prompt Maestro</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-[11px] max-h-56 overflow-y-auto border border-slate-800 leading-relaxed select-all">
                  <pre className="whitespace-pre-wrap">{MASTER_EVALUATION_PLAN_PROMPT}</pre>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveStep('PASTE')}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold transition-all flex items-center gap-1.5 shadow-soft-xs"
                >
                  <span>Continuar al Paso 2: Pegar Respuesta</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ) : (
            /* PASO 2: Pegar JSON & Vista Previa */
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block font-mono">
                  Pega aquí la respuesta generada por Gemini:
                </label>
                <textarea
                  value={jsonInput}
                  onChange={(e) => handleParseJson(e.target.value)}
                  placeholder='Pega el bloque JSON aquí (ej: {"schemaVersion": "cpe-evaluation-plan-v1", "subject": "Física I", ...})'
                  rows={6}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-mono text-xs focus:bg-white focus:border-[#0F52BA] transition-all resize-none shadow-soft-xs"
                />
                {parseError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2 text-xs">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{parseError}</span>
                  </div>
                )}

                {parseWarnings.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>Observaciones de validación:</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                      {parseWarnings.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Vista Previa de la Ingesta */}
              {parsedPayload && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-fadeIn">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                        {parsedPayload.academicPeriod || 'Plan de Evaluación Oficial'}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {parsedPayload.subject}
                      </h4>
                      {parsedPayload.professor && (
                        <span className="text-xs text-slate-500">
                          Prof. {parsedPayload.professor}
                        </span>
                      )}
                    </div>

                    {/* Verificador de Ponderación 100% */}
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold font-mono border shadow-soft-xs bg-white">
                        <span>Ponderación Total:</span>
                        <span
                          className={
                            totalWeightSum === 100
                              ? 'text-emerald-600 font-extrabold'
                              : 'text-amber-600 font-extrabold'
                          }
                        >
                          {totalWeightSum}%
                        </span>
                      </div>
                      {totalWeightSum !== 100 && (
                        <p className="text-[10px] text-amber-600 mt-0.5">
                          ⚠️ La suma no da 100%. Puedes ajustarla después.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Lista de Evaluaciones Detectadas */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-600 uppercase font-mono block">
                      Evaluaciones Extraídas ({parsedPayload.evaluations.length}):
                    </span>
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {parsedPayload.evaluations.map((ev, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-soft-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#0F52BA] font-mono text-[10px] font-bold border border-blue-100">
                                {ev.type}
                              </span>
                              <span className="text-xs font-bold text-slate-900">
                                {ev.title}
                              </span>
                            </div>
                            <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                              {ev.weightPercentage}%
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{ev.date}</span>
                            </span>
                            {ev.location && <span>• {ev.location}</span>}
                          </div>

                          {/* Temas Probables Extraídos */}
                          {ev.topics && ev.topics.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1 pt-1">
                              <span className="text-[10px] text-slate-400 font-medium">Temas:</span>
                              {ev.topics.map((t, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Opciones de Automatización */}
                  <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={createReminders}
                        onChange={(e) => setCreateReminders(e.target.checked)}
                        className="rounded text-[#0F52BA] focus:ring-[#0F52BA]"
                      />
                      <span>Generar recordatorios de estudio escalonados (7d y 3d antes)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={createKanbanTasks}
                        onChange={(e) => setCreateKanbanTasks(e.target.checked)}
                        className="rounded text-[#0F52BA] focus:ring-[#0F52BA]"
                      />
                      <span>Crear metas correspondientes en el Tablero Kanban</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Botones de Acción */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setActiveStep('PROMPT')}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                >
                  ← Volver a ver el Prompt
                </button>

                <button
                  onClick={handleExecuteImport}
                  disabled={!parsedPayload || isImporting}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-soft-sm ${
                    parsedPayload && !isImporting
                      ? 'bg-[#0F52BA] hover:bg-[#0c4194] text-white active:scale-95'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {isImporting
                      ? 'Inyectando Plan...'
                      : 'Inyectar Plan en mi Calendario y Recordatorios'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
