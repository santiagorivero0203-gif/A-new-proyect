/**
 * @file index.ts
 * @description Punto de entrada unificado para el ecosistema académico expandido de
 * Andrés Rivero (1er Año de Bachillerato · Educación Media General · Colegio Consolación).
 *
 * Resumen cuantitativo del banco oficial (222 reactivos únicos):
 * - Matemática 1 (Enteros ℤ, Signos de Agrupación y Operaciones Largas): 30 reactivos (`andres-math-z-equations`)
 * - Matemática 2 (Potenciación, Primos, m.c.m./M.C.D.):20 reactivos (`andres-math-powers-factors`)
 * - Matemática 3 (Geometría, Ángulos y Perímetros):    18 reactivos (`andres-math-geometry-perimeters`)
 * - Biología 1 (Método Científico y Laboratorio):      18 reactivos (`andres-bio-lab-method`)
 * - Biología 2 (Bioseguridad, Materia y Biomecánica):  18 reactivos (`andres-bio-safety-matter`)
 * - Física 1 (Historia, Fuerza, Palancas y Poleas):    18 reactivos (`andres-phys-machines-units`)
 * - Física 2 (Magnitudes SI, Conversión y Circuitos):  18 reactivos (`andres-phys-units-circuits`)
 * - Castellano 1 ("Barrabás", Figuras y Redacción):    18 reactivos (`andres-cas-barrabas-grammar`)
 * - Castellano 2 (Sintaxis Bimembre, SEGA y Hiatos):   18 reactivos (`andres-cas-syntax-accents`)
 * - Diseño Digital (Color, Retícula y Vectores):       16 reactivos (`andres-design-color-grid`)
 * - Informática Práctica (Hardware, Archivos y Excel): 16 reactivos (`andres-inf-computing-office`)
 * - Educación en la Fe (DOMUND y Carisma Consolación): 14 reactivos (`andres-fe-consolacion-values`)
 * -----------------------------------------------------------------------------------------------
 * TOTAL:                                              222 reactivos únicos distribuidos en A/B/C/D.
 */

import type { Question } from '../../types/exam.types';
import type { DeconstructedQuestion } from '../../types/deconstruction.types';
import {
  buildGuideQuestions,
  buildSimulatorQuestions,
  type AndresQuestionSeed,
} from './questionBuilder';
import {
  ANDRES_MATH_Z_SEEDS,
  ANDRES_MATH_POWERS_SEEDS,
  ANDRES_MATH_GEOMETRY_SEEDS,
} from './mathQuestions';
import {
  ANDRES_BIO_METHOD_SEEDS,
  ANDRES_BIO_MATTER_SEEDS,
  ANDRES_PHYS_MACHINES_SEEDS,
  ANDRES_PHYS_UNITS_SEEDS,
} from './scienceQuestions';
import {
  ANDRES_CAS_BARRABAS_SEEDS,
  ANDRES_CAS_SYNTAX_SEEDS,
  ANDRES_DESIGN_SEEDS,
  ANDRES_INF_SEEDS,
  ANDRES_FE_SEEDS,
} from './humanitiesTechQuestions';

export { ANDRES_INF_COMPUTING_GUIDE, ANDRES_FE_CONSOLACION_GUIDE } from './extraGuides';
export {
  ANDRES_MATH_Z_SEEDS,
  ANDRES_MATH_POWERS_SEEDS,
  ANDRES_MATH_GEOMETRY_SEEDS,
  ANDRES_BIO_METHOD_SEEDS,
  ANDRES_BIO_MATTER_SEEDS,
  ANDRES_PHYS_MACHINES_SEEDS,
  ANDRES_PHYS_UNITS_SEEDS,
  ANDRES_CAS_BARRABAS_SEEDS,
  ANDRES_CAS_SYNTAX_SEEDS,
  ANDRES_DESIGN_SEEDS,
  ANDRES_INF_SEEDS,
  ANDRES_FE_SEEDS,
};

/**
 * Mapa declarativo de semillas por ID de guía deconstruida (12 temas completos).
 */
export const ANDRES_SEEDS_BY_GUIDE = {
  'andres-math-z-equations': ANDRES_MATH_Z_SEEDS,
  'andres-math-powers-factors': ANDRES_MATH_POWERS_SEEDS,
  'andres-math-geometry-perimeters': ANDRES_MATH_GEOMETRY_SEEDS,
  'andres-bio-lab-method': ANDRES_BIO_METHOD_SEEDS,
  'andres-bio-safety-matter': ANDRES_BIO_MATTER_SEEDS,
  'andres-phys-machines-units': ANDRES_PHYS_MACHINES_SEEDS,
  'andres-phys-units-circuits': ANDRES_PHYS_UNITS_SEEDS,
  'andres-cas-barrabas-grammar': ANDRES_CAS_BARRABAS_SEEDS,
  'andres-cas-syntax-accents': ANDRES_CAS_SYNTAX_SEEDS,
  'andres-design-color-grid': ANDRES_DESIGN_SEEDS,
  'andres-inf-computing-office': ANDRES_INF_SEEDS,
  'andres-fe-consolacion-values': ANDRES_FE_SEEDS,
} as const;

export type AndresGuideKey = keyof typeof ANDRES_SEEDS_BY_GUIDE;

/**
 * Arreglo maestro con las 212 semillas académicas de Andrés.
 */
export const ALL_ANDRES_SEEDS: AndresQuestionSeed[] = [
  ...ANDRES_MATH_Z_SEEDS,
  ...ANDRES_MATH_POWERS_SEEDS,
  ...ANDRES_MATH_GEOMETRY_SEEDS,
  ...ANDRES_BIO_METHOD_SEEDS,
  ...ANDRES_BIO_MATTER_SEEDS,
  ...ANDRES_PHYS_MACHINES_SEEDS,
  ...ANDRES_PHYS_UNITS_SEEDS,
  ...ANDRES_CAS_BARRABAS_SEEDS,
  ...ANDRES_CAS_SYNTAX_SEEDS,
  ...ANDRES_DESIGN_SEEDS,
  ...ANDRES_INF_SEEDS,
  ...ANDRES_FE_SEEDS,
];

/**
 * Banco completo de 212 preguntas `Question` para `SimulatorEngine` y `QUESTION_BANK`.
 */
export const ALL_ANDRES_EXPANDED_QUESTIONS: Question[] = buildSimulatorQuestions(ALL_ANDRES_SEEDS);

/**
 * Obtiene el arreglo completo `DeconstructedQuestion[]` (14 a 20 preguntas)
 * para la pestaña interactiva de evaluación de una guía específica.
 */
export function getExpandedGuideQuestions(guideId: AndresGuideKey): DeconstructedQuestion[] {
  return buildGuideQuestions(ANDRES_SEEDS_BY_GUIDE[guideId]);
}

/**
 * Obtiene la lista exacta de IDs de preguntas para el examen temático asociado a una guía.
 */
export function getExamIdsForGuide(guideId: AndresGuideKey): string[] {
  return ANDRES_SEEDS_BY_GUIDE[guideId].map((seed) => seed.id);
}

/**
 * Obtiene los reactivos `Question[]` del Simulador correspondientes a una guía específica de Andrés.
 */
export function getSimulatorQuestionsForGuide(guideId: AndresGuideKey): Question[] {
  return buildSimulatorQuestions(ANDRES_SEEDS_BY_GUIDE[guideId]);
}

/**
 * Mapea cualquier evento del calendario oficial de Andrés (`andres-bio-01` .. `andres-inf-05`)
 * hacia su guía temática deconstruida correspondiente, funcionando incluso sobre eventos ya
 * persistidos en `localStorage`.
 */
export function resolveAndresGuideIdForEvent(eventId?: string, explicitGuideId?: string): AndresGuideKey | undefined {
  if (explicitGuideId && explicitGuideId in ANDRES_SEEDS_BY_GUIDE) {
    return explicitGuideId as AndresGuideKey;
  }
  if (!eventId || !eventId.startsWith('andres-')) return undefined;

  const map: Record<string, AndresGuideKey> = {
    'andres-bio-01': 'andres-bio-lab-method',
    'andres-bio-02': 'andres-bio-safety-matter',
    'andres-bio-03': 'andres-bio-safety-matter',
    'andres-bio-04': 'andres-bio-safety-matter',
    'andres-bio-05': 'andres-bio-lab-method',
    'andres-fis-01': 'andres-phys-machines-units',
    'andres-fis-02': 'andres-phys-units-circuits',
    'andres-fis-03': 'andres-phys-units-circuits',
    'andres-fis-04': 'andres-phys-units-circuits',
    'andres-fis-05': 'andres-phys-machines-units',
    'andres-mat-01': 'andres-math-z-equations',
    'andres-mat-02': 'andres-math-z-equations',
    'andres-mat-03': 'andres-math-geometry-perimeters',
    'andres-mat-04': 'andres-math-powers-factors',
    'andres-mat-05': 'andres-math-z-equations',
    'andres-cas-01': 'andres-cas-barrabas-grammar',
    'andres-cas-02': 'andres-cas-syntax-accents',
    'andres-cas-03': 'andres-fe-consolacion-values',
    'andres-cas-04': 'andres-cas-barrabas-grammar',
    'andres-cas-05': 'andres-cas-syntax-accents',
    'andres-dd-01': 'andres-design-color-grid',
    'andres-dd-02': 'andres-design-color-grid',
    'andres-dd-03': 'andres-design-color-grid',
    'andres-dd-04': 'andres-design-color-grid',
    'andres-dd-05': 'andres-design-color-grid',
    'andres-fe-01': 'andres-fe-consolacion-values',
    'andres-fe-02': 'andres-fe-consolacion-values',
    'andres-fe-03': 'andres-fe-consolacion-values',
    'andres-fe-04': 'andres-fe-consolacion-values',
    'andres-inf-01': 'andres-inf-computing-office',
    'andres-inf-02': 'andres-inf-computing-office',
    'andres-inf-03': 'andres-inf-computing-office',
    'andres-inf-04': 'andres-inf-computing-office',
    'andres-inf-05': 'andres-inf-computing-office',
  };

  return map[eventId];
}

/**
 * Selección multidisciplinaria balanceada de 36 reactivos (3 reactivos representativos
 * de cada uno de los 12 bloques del cronograma) para el Simulacro General Integral.
 */
export const ANDRES_INTEGRAL_EXAM_IDS: string[] = [
  'andres-m1-008',
  'andres-m1-022',
  'andres-m1-026',
  ...ANDRES_MATH_POWERS_SEEDS.slice(0, 3).map((s) => s.id),
  ...ANDRES_MATH_GEOMETRY_SEEDS.slice(0, 3).map((s) => s.id),
  ...ANDRES_BIO_METHOD_SEEDS.slice(0, 3).map((s) => s.id),
  ...ANDRES_BIO_MATTER_SEEDS.slice(0, 3).map((s) => s.id),
  ...ANDRES_PHYS_MACHINES_SEEDS.slice(0, 3).map((s) => s.id),
  ...ANDRES_PHYS_UNITS_SEEDS.slice(0, 3).map((s) => s.id),
  ...ANDRES_CAS_BARRABAS_SEEDS.slice(0, 3).map((s) => s.id),
  ...ANDRES_CAS_SYNTAX_SEEDS.slice(0, 3).map((s) => s.id),
  ...ANDRES_DESIGN_SEEDS.slice(0, 3).map((s) => s.id),
  ...ANDRES_INF_SEEDS.slice(0, 3).map((s) => s.id),
  ...ANDRES_FE_SEEDS.slice(0, 3).map((s) => s.id),
];

/**
 * Arreglo de 36 objetos `Question` listo para iniciar el Simulacro General Integral.
 */
export const ANDRES_INTEGRAL_EXAM_QUESTIONS: Question[] = (() => {
  const byId = new Map(ALL_ANDRES_EXPANDED_QUESTIONS.map((q) => [q.id, q]));
  return ANDRES_INTEGRAL_EXAM_IDS.map((id) => byId.get(id)).filter((q): q is Question => Boolean(q));
})();
