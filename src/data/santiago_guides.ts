/**
 * @file santiago_guides.ts
 * @description Centro Unificado de Guías Académicas Deconstruidas Oficiales (7 Pilares + Multimedia + Prompts)
 * para el Primer Semestre de la Escuela de Física (Facultad de Ciencias · UCV).
 * 
 * Arquitectura modular y escalable dividida por materias:
 * 1. Matemática I (Cátedra Pedro Alson · Métodos de Graficación): 7 temas oficiales.
 * 2. Principios de Química I (Código 3401 · Escuela de Química UCV): 10 temas oficiales.
 * 3. Física I (Mecánica Clásica · Escuela de Física UCV): 3 módulos fundamentales.
 * 
 * Reglas de redacción del usuario:
 * - Lenguaje directo, claro, simple mas no informal (cero pedantería innecesaria).
 * - Cero subdivisiones anidadas dentro de los puntos (listas planas directas de un solo nivel).
 * - Integración viva de recursos multimedia y prompts con arquitectura Santiago.
 */

import type { DeconstructedAcademicGuide, DeconstructedQuestion } from '../types/deconstruction.types';
import type { Question } from '../types/exam.types';
import { SANTIAGO_MATEMATICA1_GUIDES } from './guides/santiago_matematica1';
import { SANTIAGO_QUIMICA1_GUIDES } from './guides/santiago_quimica1';
import { SANTIAGO_FISICA1_GUIDES } from './guides/santiago_fisica1';

export { SANTIAGO_MATEMATICA1_GUIDES } from './guides/santiago_matematica1';
export { SANTIAGO_QUIMICA1_GUIDES } from './guides/santiago_quimica1';
export { SANTIAGO_FISICA1_GUIDES } from './guides/santiago_fisica1';

export function questionToDeconstructed(q: Question): DeconstructedQuestion {
  return {
    area: q.subject,
    tema: q.topic,
    tipo: 'opcion_multiple',
    pregunta: q.questionText,
    opciones: q.options.map((o) => o.text),
    correcta: q.options.find((o) => o.id === q.correctOptionId)?.text || q.options[0].text,
    justificacion: `**Concepto Fundamental:** ${q.topic}\n\n**Resolución Directa:** ${q.explanation}`,
  };
}

/**
 * Catálogo consolidado oficial de las 20 Guías Deconstruidas de Santiago Rivero:
 * - 7 Guías de Matemática I (Pedro Alson)
 * - 10 Guías de Principios de Química I (Código 3401)
 * - 3 Guías de Física I (Mecánica Clásica)
 */
export const SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES: DeconstructedAcademicGuide[] = [
  ...SANTIAGO_MATEMATICA1_GUIDES,
  ...SANTIAGO_QUIMICA1_GUIDES,
  ...SANTIAGO_FISICA1_GUIDES,
];
