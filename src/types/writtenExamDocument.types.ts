/**
 * @file writtenExamDocument.types.ts
 * @description Definiciones de tipos para los Documentos de Examen Escrito de 5 Partes (100 pts)
 * con Guía de Estudio Previa ("Resumen Lógico de Repaso"), Contraste Clave, cuadro oficial de
 * calificación, tabla de identificación del estudiante y 5 partes estructuradas (de 74 a 128
 * ejercicios progresivos con casillas de respuesta, doble espacio y líneas punteadas de procedimiento).
 */

import type { AcademicProfileId } from './index';

export type WrittenExamPartLayout =
  | 'grid-4'
  | 'grid-2'
  | 'two-step-2col'
  | 'contrast-2col'
  | 'procedural-2col';

/**
 * Ítem individual dentro de una parte del examen escrito.
 * Soporta tanto la convención (num / answerKey / stepKey) como (number / answer / stepBlank).
 */
export interface WrittenExamItem {
  /** Número correlativo del ejercicio (convención A) */
  num?: number;
  /** Número correlativo del ejercicio (convención B) */
  number?: number;
  /** Enunciado o expresión matemática/conceptual del ejercicio */
  prompt: string;
  /** Respuesta correcta (convención A) */
  answerKey?: string;
  /** Respuesta correcta (convención B) */
  answer?: string;
  /** Paso intermedio (convención A) */
  stepKey?: string;
  /** Paso intermedio (convención B) */
  stepBlank?: string;
}

/**
 * Una de las 5 partes de la evaluación escrita.
 */
export interface WrittenExamPart {
  /** Número romano de la parte ('I', 'II', 'III', 'IV', 'V') */
  partNumberRoman?: 'I' | 'II' | 'III' | 'IV' | 'V';
  /** Etiqueta completa de la parte (ej. 'I PARTE') */
  partNumber?: string;
  /** Título descriptivo de la parte */
  title: string;
  /** Puntaje total asignado a esta parte (convención A) */
  pointsTotal?: number;
  /** Puntaje total asignado a esta parte (convención B) */
  points?: number;
  /** Texto del valor unitario (ej. '0,5 pts c/u') */
  pointsPerItem?: string;
  /** Instrucción específica para el estudiante en esta parte */
  instructions: string;
  /** Disposición tabular de las celdas */
  layout: WrittenExamPartLayout;
  /** Lista de ejercicios numerados de esta sección */
  items: WrittenExamItem[];
}

/**
 * Sub-bloque numerado dentro del "Resumen Lógico de Repaso" en la Página 1.
 */
export interface StudySummarySection {
  /** Número del bloque lógico (1, 2, '1.', '2.'...) */
  number: number | string;
  /** Título del bloque */
  title: string;
  /** Explicación introductoria opcional del bloque */
  leadIn?: string;
  /** Viñetas de reglas (convención A) */
  bullets?: Array<{
    ruleBold: string;
    explanation?: string;
    examples: string[];
  }>;
  /** Reglas estructuradas (convención B) */
  rules?: Array<{
    boldLead: string;
    body: string;
    example?: string;
  }>;
}

/**
 * Estructura completa de una "Guía de Estudio Previa y Evaluación Escrita" (Formato 5 Páginas / 100 Pts).
 */
export interface WrittenExamDocument {
  /** Identificador único del documento examen */
  id: string;
  /** Perfil del estudiante al que pertenece */
  profileId: AcademicProfileId;
  /** Nombre completo del estudiante titular */
  studentName: string;
  /** Institución educativa o facultad */
  institution: string;
  /** Materia o cátedra */
  subject: string;
  /** Título corto de la unidad */
  unitTitle: string;
  /** Etiqueta de grado o semestre */
  gradeLabel?: string;
  /** Puntaje total (por defecto 100) */
  totalPoints?: number;
  /** Tiempo estimado en minutos */
  estimatedMinutes?: number;
  /** Título principal en mayúsculas (convención A) */
  documentTitle?: string;
  /** Título principal en mayúsculas (convención B) */
  guideTitle?: string;
  /** Título dentro del recuadro formal de examen (convención A) */
  examHeaderTitle?: string;
  /** Título dentro del recuadro formal de examen (convención B) */
  examTitle?: string;
  /** Indicaciones generales dentro del recuadro de examen */
  generalInstructions: string;
  /** Etiquetas adaptadas de la tabla de datos del alumno */
  studentFieldsLabels?: {
    nameLabel?: string;
    dateLabel?: string;
    gradeLabel?: string;
    listNumberLabel?: string;
  };
  /** Pie de página izquierdo que aparece en las 5 hojas */
  footerLeftText?: string;
  /** Resumen Lógico de Repaso previo al examen (convención A) */
  studySummary?: {
    introParagraph: string;
    sections: StudySummarySection[];
    keyContrast: string;
  };
  /** Introducción al resumen (convención B) */
  summaryIntro?: string;
  /** Secciones de repaso (convención B) */
  studySections?: StudySummarySection[];
  /** Recuadro de contraste clave (convención B) */
  keyContrast?: {
    title: string;
    explanation: string;
  };
  /** Las 5 partes estructuradas del examen escrito (suman 100 puntos) */
  parts: WrittenExamPart[];
  /** ID opcional de la guía deconstruida vinculada */
  linkedGuideId?: string;
  /** ID opcional del examen del simulador vinculado */
  linkedExamId?: string;
}

/**
 * Estructura normalizada para consumo uniforme en el visor modal y en el exportador PDF/Word.
 */
export interface NormalizedWrittenExamDocument {
  id: string;
  profileId: AcademicProfileId;
  studentName: string;
  institution: string;
  gradeLabel: string;
  subject: string;
  unitTitle: string;
  guideTitle: string;
  examTitle: string;
  generalInstructions: string;
  totalPoints: number;
  summaryIntro: string;
  studySections: Array<{
    number: string;
    title: string;
    leadIn?: string;
    rules: Array<{
      boldLead: string;
      body: string;
      example?: string;
    }>;
  }>;
  keyContrast: {
    title: string;
    explanation: string;
  };
  parts: Array<{
    partLabel: string;
    title: string;
    points: number;
    instructions: string;
    layout: WrittenExamPartLayout;
    items: Array<{
      number: number;
      prompt: string;
      answer: string;
      stepBlank?: string;
    }>;
  }>;
}

/**
 * Normaliza cualquier WrittenExamDocument a una interfaz única lista para renderizar o exportar.
 */
export function normalizeWrittenExamDocument(
  doc: WrittenExamDocument
): NormalizedWrittenExamDocument {
  const guideTitle =
    doc.guideTitle ||
    doc.documentTitle ||
    `GUÍA DE ESTUDIO PREVIA Y EVALUACIÓN ESCRITA: ${doc.unitTitle.toUpperCase()}`;

  const examTitle =
    doc.examTitle ||
    doc.examHeaderTitle ||
    `EVALUACIÓN ESCRITA DE ${doc.subject.toUpperCase()} — UNIDAD: ${doc.unitTitle.toUpperCase()}`;

  const gradeLabel =
    doc.gradeLabel ||
    (doc.profileId === 'andres_bachillerato_1'
      ? '1er Año de Bachillerato'
      : doc.profileId === 'santiago_fisica_ucv'
      ? '1er Semestre · Ciencias UCV'
      : doc.profileId === 'mafe_diseno_ucab'
      ? '1er Semestre · Diseño UCAB'
      : '5to Año · Admisión');

  const summaryIntro =
    doc.summaryIntro || doc.studySummary?.introParagraph || '';

  const rawSections = doc.studySections || doc.studySummary?.sections || [];
  const studySections = rawSections.map((sec) => {
    const numStr = String(sec.number).endsWith('.') ? String(sec.number) : `${sec.number}.`;
    const rules =
      sec.rules ||
      (sec.bullets || []).map((b) => ({
        boldLead: b.ruleBold,
        body: b.explanation || b.examples.join(' | '),
        example: b.explanation && b.examples.length > 0 ? b.examples.join(' ; ') : undefined,
      }));
    return {
      number: numStr,
      title: sec.title,
      leadIn: sec.leadIn,
      rules,
    };
  });

  let keyContrast = doc.keyContrast || {
    title: 'Contraste Clave:',
    explanation: doc.studySummary?.keyContrast || '',
  };
  if (!doc.keyContrast && doc.studySummary?.keyContrast) {
    const raw = doc.studySummary.keyContrast;
    const colonIdx = raw.indexOf(':');
    if (colonIdx > 0 && colonIdx < 65) {
      keyContrast = {
        title: raw.slice(0, colonIdx + 1),
        explanation: raw.slice(colonIdx + 1).trim(),
      };
    }
  }

  const parts = doc.parts.map((p) => {
    const partLabel =
      p.partNumber || (p.partNumberRoman ? `${p.partNumberRoman} PARTE` : 'PARTE');
    const points = p.points ?? p.pointsTotal ?? 20;
    const items = p.items.map((it, idx) => ({
      number: it.number ?? it.num ?? idx + 1,
      prompt: it.prompt,
      answer: it.answer ?? it.answerKey ?? '',
      stepBlank: it.stepBlank ?? it.stepKey,
    }));
    return {
      partLabel,
      title: p.title,
      points,
      instructions: p.instructions,
      layout: p.layout,
      items,
    };
  });

  return {
    id: doc.id,
    profileId: doc.profileId,
    studentName: doc.studentName,
    institution: doc.institution,
    gradeLabel,
    subject: doc.subject,
    unitTitle: doc.unitTitle,
    guideTitle,
    examTitle,
    generalInstructions: doc.generalInstructions,
    totalPoints: doc.totalPoints ?? 100,
    summaryIntro,
    studySections,
    keyContrast,
    parts,
  };
}
