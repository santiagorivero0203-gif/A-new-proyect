/**
 * Utilidades de validación, extracción y normalización de datos
 * para la importación por IA (Gemini, Claude, GPT) de Planes de Evaluación y Horarios Escolares.
 */

import type {
  DayOfWeek,
  EvaluationPlanImportPayload,
  ClassScheduleImportPayload,
  ImportedEvaluationItem,
  EvaluationType,
  ClassScheduleBlock,
} from '../types/academicPlanner.types';

const VALID_DAYS: Record<string, DayOfWeek> = {
  LUNES: 'LUNES',
  MARTES: 'MARTES',
  MIERCOLES: 'MIERCOLES',
  MIÉRCOLES: 'MIERCOLES',
  JUEVES: 'JUEVES',
  VIERNES: 'VIERNES',
  SABADO: 'SABADO',
  SÁBADO: 'SABADO',
};

const VALID_EVALUATION_TYPES: EvaluationType[] = [
  'PARCIAL',
  'QUIZ',
  'TALLER',
  'ENTREGA',
  'PROYECTO',
  'RECUPERACION',
];

/**
 * Extrae de forma segura el bloque JSON dentro de un texto que puede incluir
 * markdown (```json ... ```) o texto explicativo de la IA al principio o al final.
 */
export function extractJsonFromAiResponse(rawText: string): string {
  if (!rawText || typeof rawText !== 'string') return '';
  let cleaned = rawText.trim();

  // Caso 1: Bloque de código Markdown ```json ... ```
  const markdownMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (markdownMatch && markdownMatch[1]) {
    cleaned = markdownMatch[1].trim();
  }

  // Caso 2: Texto arbitrario antes o después del JSON -> Encontrar primer '{' y último '}'
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  return cleaned;
}

/**
 * Normaliza un nombre de día a DayOfWeek eliminando tildes y pasando a mayúsculas.
 */
export function normalizeDayOfWeek(dayInput: string): DayOfWeek | null {
  if (!dayInput || typeof dayInput !== 'string') return null;
  const upper = dayInput.trim().toUpperCase();
  return VALID_DAYS[upper] || null;
}

/**
 * Normaliza el tipo de evaluación
 */
export function normalizeEvaluationType(typeInput: string): EvaluationType {
  if (!typeInput || typeof typeInput !== 'string') return 'PARCIAL';
  const upper = typeInput.trim().toUpperCase() as EvaluationType;
  return VALID_EVALUATION_TYPES.includes(upper) ? upper : 'PARCIAL';
}

export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  errors: string[];
  warnings: string[];
}

/**
 * Valida y normaliza el payload del Plan de Evaluación
 */
export function validateAndNormalizeEvaluationPlan(
  rawJson: any
): ValidationResult<EvaluationPlanImportPayload> {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!rawJson || typeof rawJson !== 'object') {
    return { isValid: false, errors: ['El contenido no es un objeto JSON válido.'], warnings: [] };
  }

  // Aceptar 'subject' o 'materia' o 'asignatura'
  const subject = (rawJson.subject || rawJson.materia || rawJson.asignatura || '').trim();
  if (!subject) {
    errors.push('El plan de evaluación debe incluir el nombre de la asignatura ("subject").');
  }

  // Aceptar 'professor' o 'teacher' o 'docente'
  const professor = (rawJson.professor || rawJson.teacher || rawJson.docente || '').trim() || undefined;

  // Aceptar 'academicPeriod' o 'term' o 'periodo'
  const academicPeriod =
    (rawJson.academicPeriod || rawJson.term || rawJson.periodo || '').trim() || undefined;

  const rawEvals = rawJson.evaluations || rawJson.evaluaciones || rawJson.cortes;
  if (!Array.isArray(rawEvals) || rawEvals.length === 0) {
    errors.push('El plan debe incluir un arreglo de evaluaciones ("evaluations") con al menos un elemento.');
    return { isValid: false, errors, warnings };
  }

  const normalizedEvals: ImportedEvaluationItem[] = [];
  let sumWeight = 0;

  rawEvals.forEach((item: any, idx: number) => {
    const title = (item.title || item.titulo || item.nombre || `Evaluación ${idx + 1}`).trim();
    const type = normalizeEvaluationType(item.type || item.tipo);

    // Fecha en formato YYYY-MM-DD
    let date = (item.date || item.fecha || '').trim();
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      warnings.push(`Evaluación "${title}": Fecha inválida o vacía ("${date}"). Se asignó fecha estimada.`);
      date = date && /^\d{4}/.test(date) ? date : new Date().toISOString().split('T')[0];
    }

    const weightPercentage = Number(item.weightPercentage ?? item.ponderacion ?? item.porcentaje ?? 0);
    if (isNaN(weightPercentage) || weightPercentage < 0 || weightPercentage > 100) {
      warnings.push(`Evaluación "${title}": Ponderación inválida (${weightPercentage}%).`);
    } else {
      sumWeight += weightPercentage;
    }

    // Temas probables
    const rawTopics = item.topics || item.temas || item.contenido || [];
    const topics: string[] = Array.isArray(rawTopics)
      ? rawTopics.map((t: any) => String(t).trim()).filter(Boolean)
      : typeof rawTopics === 'string'
      ? rawTopics.split(',').map((t: string) => t.trim()).filter(Boolean)
      : [];

    // Días de alerta escalonada
    const rawAlerts = item.suggestedStudyAlertDays || item.diasAlerta;
    let suggestedStudyAlertDays = [7, 3];
    if (Array.isArray(rawAlerts) && rawAlerts.length > 0) {
      suggestedStudyAlertDays = rawAlerts
        .map((d: any) => Number(d))
        .filter((d: number) => !isNaN(d) && d > 0 && d <= 60);
      if (suggestedStudyAlertDays.length === 0) suggestedStudyAlertDays = [7, 3];
    }

    normalizedEvals.push({
      title,
      type,
      date,
      time: item.time || item.hora || '08:00 AM',
      weightPercentage: isNaN(weightPercentage) ? 0 : weightPercentage,
      topics,
      location: item.location || item.aula || item.lugar || undefined,
      suggestedStudyAlertDays,
      notes: item.notes || item.notas || undefined,
    });
  });

  if (sumWeight !== 100) {
    warnings.push(`La suma de ponderaciones es ${sumWeight}% (lo estándar es 100%).`);
  }

  const payload: EvaluationPlanImportPayload = {
    schemaVersion: 'cpe-evaluation-plan-v1',
    subject,
    professor,
    academicPeriod,
    totalWeightExpected: Number(rawJson.totalWeightExpected) || 100,
    evaluations: normalizedEvals,
  };

  return {
    isValid: errors.length === 0,
    data: payload,
    errors,
    warnings,
  };
}

/**
 * Valida y normaliza el payload del Horario Escolar
 */
export function validateAndNormalizeClassSchedule(
  rawJson: any
): ValidationResult<ClassScheduleImportPayload> {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!rawJson || typeof rawJson !== 'object') {
    return { isValid: false, errors: ['El contenido no es un objeto JSON válido.'], warnings: [] };
  }

  const rawClasses = rawJson.classes || rawJson.clases || rawJson.horario;
  if (!Array.isArray(rawClasses) || rawClasses.length === 0) {
    errors.push('El horario debe incluir un arreglo de clases ("classes") con al menos una clase.');
    return { isValid: false, errors, warnings };
  }

  const normalizedClasses: Omit<ClassScheduleBlock, 'id'>[] = [];

  rawClasses.forEach((cls: any, idx: number) => {
    const subject = (cls.subject || cls.materia || cls.asignatura || '').trim();
    if (!subject) {
      warnings.push(`Clase #${idx + 1}: Omitida por no tener nombre de asignatura.`);
      return;
    }

    // Aceptar 'dayOfWeek' o 'day' o 'dia'
    const rawDay = cls.dayOfWeek || cls.day || cls.dia;
    const dayOfWeek = normalizeDayOfWeek(rawDay);
    if (!dayOfWeek) {
      warnings.push(`Clase "${subject}": Día no reconocido ("${rawDay}"). Se asignó LUNES por defecto.`);
    }

    // Horas: formato 24h "HH:MM"
    let startTime = (cls.startTime || cls.horaInicio || cls.inicio || '08:00').trim();
    let endTime = (cls.endTime || cls.horaFin || cls.fin || '09:30').trim();

    // Normalizar formato si viene "8:00" -> "08:00"
    if (/^\d:\d{2}$/.test(startTime)) startTime = `0${startTime}`;
    if (/^\d:\d{2}$/.test(endTime)) endTime = `0${endTime}`;

    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    if (!isNaN(sh) && !isNaN(eh)) {
      const startMin = sh * 60 + (sm || 0);
      const endMin = eh * 60 + (em || 0);
      if (endMin <= startMin) {
        warnings.push(`Clase "${subject}": La hora de fin (${endTime}) no es posterior al inicio (${startTime}).`);
      }
    }

    // Modalidad
    const rawMod = (cls.modality || cls.modalidad || 'PRESENCIAL').toUpperCase();
    const modality = ['PRESENCIAL', 'VIRTUAL', 'HIBRIDO'].includes(rawMod)
      ? (rawMod as 'PRESENCIAL' | 'VIRTUAL' | 'HIBRIDO')
      : 'PRESENCIAL';

    normalizedClasses.push({
      subject,
      dayOfWeek: dayOfWeek || 'LUNES',
      startTime,
      endTime,
      classroom: (cls.classroom || cls.aula || cls.salon || '').trim() || undefined,
      professor: (cls.professor || cls.profesor || cls.docente || '').trim() || undefined,
      building: (cls.building || cls.edificio || '').trim() || undefined,
      modality,
      colorTag: cls.colorTag || 'blue',
    });
  });

  if (normalizedClasses.length === 0) {
    errors.push('No se pudieron extraer clases válidas del horario.');
    return { isValid: false, errors, warnings };
  }

  const payload: ClassScheduleImportPayload = {
    schemaVersion: 'cpe-class-schedule-v1',
    institutionName: (rawJson.institutionName || rawJson.institucion || '').trim() || undefined,
    studentGradeOrSemester:
      (rawJson.studentGradeOrSemester || rawJson.grado || rawJson.semestre || '').trim() || undefined,
    classes: normalizedClasses,
  };

  return {
    isValid: errors.length === 0,
    data: payload,
    errors,
    warnings,
  };
}

/**
 * Realiza cálculo de fecha de recordatorio seguro sin desfase UTC de zona horaria
 */
export function calculatePreAlertDate(baseDateStr: string, daysPrior: number): string {
  try {
    const parts = baseDateStr.split('-').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) {
      return baseDateStr;
    }
    const [year, month, day] = parts;
    // Usar fecha local
    const dateObj = new Date(year, month - 1, day);
    dateObj.setDate(dateObj.getDate() - daysPrior);

    const resYear = dateObj.getFullYear();
    const resMonth = String(dateObj.getMonth() + 1).padStart(2, '0');
    const resDay = String(dateObj.getDate()).padStart(2, '0');
    return `${resYear}-${resMonth}-${resDay}`;
  } catch {
    return baseDateStr;
  }
}
