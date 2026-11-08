/**
 * @file questionBuilder.ts
 * @description Constructor modular, determinista y tipado de reactivos académicos para
 * Andrés Rivero (1er Año de Bachillerato · Educación Media General).
 *
 * Resuelve dos problemas arquitectónicos clave:
 * 1. Distribución equitativa de respuestas correctas (`opt-a`, `opt-b`, `opt-c`, `opt-d`)
 *    mediante permutación determinista basada en el ID del reactivo, evitando sesgos de posición
 *    (nunca todas las respuestas correctas caen en la letra A) sin romper la pureza de módulos.
 * 2. Fuente única de verdad (DRY): un mismo `AndresQuestionSeed` produce tanto el objeto
 *    `Question` para el `SimulatorEngine` como el `DeconstructedQuestion` para la pestaña
 *    interactiva "6. Examen de Prueba" de cada guía deconstruida.
 */

import type { AcademicSubject, Question } from '../../types/exam.types';
import type { DeconstructedQuestion } from '../../types/deconstruction.types';

export const ANDRES_PROFILE_ID = 'andres_bachillerato_1' as const;

/**
 * Semilla declarativa de un reactivo escolar calibrado para 1er Año de Bachillerato.
 */
export interface AndresQuestionSeed {
  /** Identificador único estable (ej: 'andres-m1-001') */
  id: string;
  /** Materia troncal dentro del motor de exámenes */
  subject: AcademicSubject;
  /** Tema curricular específico */
  topic: string;
  /** ID de la guía deconstruida asociada */
  guideId: string;
  /** Nivel de exigencia calibrado para 1er Año de Bachillerato (12-13 años) */
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  /** Enunciado claro y contextualizado */
  questionText: string;
  /** Expresión matemática o física opcional en formato KaTeX */
  latexFormula?: string;
  /** Respuesta correcta exacta */
  correctText: string;
  /** Tres distractores plausibles basados en errores conceptuales reales */
  distractors: [string, string, string];
  /** Regla o principio conceptual breve para el encabezado de la justificación */
  conceptRule: string;
  /** Explicación deductiva paso a paso en tono cercano y riguroso */
  explanation: string;
}

/**
 * Calcula un desplazamiento determinista (0..3) a partir de una cadena de texto
 * para distribuir uniformemente la posición de la opción correcta entre A, B, C y D.
 */
function deterministicSlot(seedId: string): 0 | 1 | 2 | 3 {
  let hash = 2166136261;
  for (let i = 0; i < seedId.length; i++) {
    hash ^= seedId.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (Math.abs(hash) % 4) as 0 | 1 | 2 | 3;
}

/**
 * Construye el arreglo ordenado de 4 opciones colocando la respuesta correcta
 * en una ranura determinista (`opt-a` .. `opt-d`) y rotando también los distractores.
 */
function buildShuffledOptions(seed: AndresQuestionSeed): {
  orderedTexts: [string, string, string, string];
  correctOptionId: 'opt-a' | 'opt-b' | 'opt-c' | 'opt-d';
} {
  const letters = ['opt-a', 'opt-b', 'opt-c', 'opt-d'] as const;
  const targetSlot = deterministicSlot(seed.id);
  const shift = (seed.id.charCodeAt(seed.id.length - 1) || 0) % 3;

  const rotatedDistractors: string[] = [
    seed.distractors[shift % 3],
    seed.distractors[(shift + 1) % 3],
    seed.distractors[(shift + 2) % 3],
  ];

  const ordered: string[] = [];
  let dIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i === targetSlot) {
      ordered.push(seed.correctText);
    } else {
      ordered.push(rotatedDistractors[dIdx++]);
    }
  }

  return {
    orderedTexts: ordered as [string, string, string, string],
    correctOptionId: letters[targetSlot],
  };
}

/**
 * Transforma una semilla en un objeto `Question` compatible con `SimulatorEngine` y `QUESTION_BANK`.
 */
export function toSimulatorQuestion(seed: AndresQuestionSeed): Question {
  const { orderedTexts, correctOptionId } = buildShuffledOptions(seed);
  const optionIds = ['opt-a', 'opt-b', 'opt-c', 'opt-d'] as const;

  return {
    id: seed.id,
    subject: seed.subject,
    topic: seed.topic,
    difficulty: seed.difficulty,
    targetProfiles: [ANDRES_PROFILE_ID],
    questionText: seed.questionText,
    latexFormula: seed.latexFormula,
    options: orderedTexts.map((text, idx) => ({
      id: optionIds[idx],
      text,
    })),
    correctOptionId,
    explanation: `**Regla clave:** ${seed.conceptRule} — ${seed.explanation}`,
    sourceExam: `Evaluación 1er Año · ${seed.topic}`,
  };
}

/**
 * Transforma una lista de semillas en el arreglo `Question[]` para el Simulador.
 */
export function buildSimulatorQuestions(seeds: AndresQuestionSeed[]): Question[] {
  return seeds.map(toSimulatorQuestion);
}

/**
 * Transforma una lista de semillas en el arreglo `DeconstructedQuestion[]`
 * utilizado por la pestaña interactiva "6. Examen de Prueba" de cada guía académica.
 */
export function buildGuideQuestions(seeds: AndresQuestionSeed[]): DeconstructedQuestion[] {
  return seeds.map((seed) => {
    const { orderedTexts } = buildShuffledOptions(seed);
    return {
      area: seed.subject,
      tema: seed.topic,
      tipo: 'opcion_multiple',
      pregunta: seed.questionText,
      opciones: [...orderedTexts],
      correcta: seed.correctText,
      justificacion: `**Concepto Fundamental:** ${seed.conceptRule}\n\n**Resolución:** ${seed.explanation}`,
    };
  });
}
