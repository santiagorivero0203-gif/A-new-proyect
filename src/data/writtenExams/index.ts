/**
 * @fileoverview Catálogo centralizado de Documentos de Evaluación Escrita y Guía de Estudio Previa
 * (Formato Hoja de Examen de 5 Partes / 100 Puntos) para todos los perfiles estudiantiles.
 *
 * Total: 23 Documentos de Examen Escrito completos:
 * - Andrés Rivero (`andres_bachillerato_1` — 1er Año Bachillerato Consolación): 11 documentos (Matemática, Biología, Física, Castellano, Diseño, Informática, Educación en la Fe)
 * - Santiago Rivero (`santiago_fisica_ucv` — UCV Facultad de Ciencias): 4 documentos (Matemática I Pedro Alson, Física I & Lab I, Principios de Química I 3401, Curso Introductorio)
 * - María Fernanda Valderrama (`mafe_diseno_ucab` — UCAB Diseño Integral): 4 documentos (Teoría del Diseño, Teoría del Color Clase #4, Matemática para el Diseño Guías 1-4, Tipografía & Ergonomía)
 * - Sofía Rivero (`prima_bachillerato_5` — 5to Año / Admisión Universitaria): 4 documentos (Matemática 5to Año, Física 5to Año, Química 5to Año, Habilidad Verbal y Castellano)
 */

import type { AcademicProfileId } from '../../types';
import type { WrittenExamDocument } from '../../types/writtenExamDocument.types';
import { ANDRES_MATH_WRITTEN_EXAMS } from './andresMathWrittenExams';
import { ANDRES_SCIENCE_WRITTEN_EXAMS } from './andresScienceWrittenExams';
import { ANDRES_HUMANITIES_WRITTEN_EXAMS } from './andresHumanitiesWrittenExams';
import { SANTIAGO_WRITTEN_EXAMS } from './santiagoWrittenExams';
import { MAFE_WRITTEN_EXAMS } from './mafeWrittenExams';
import { SOFIA_WRITTEN_EXAMS } from './sofiaWrittenExams';

export const ALL_WRITTEN_EXAM_DOCUMENTS: WrittenExamDocument[] = [
  ...ANDRES_MATH_WRITTEN_EXAMS,
  ...ANDRES_SCIENCE_WRITTEN_EXAMS,
  ...ANDRES_HUMANITIES_WRITTEN_EXAMS,
  ...SANTIAGO_WRITTEN_EXAMS,
  ...MAFE_WRITTEN_EXAMS,
  ...SOFIA_WRITTEN_EXAMS,
];

/**
 * Obtiene todos los documentos de evaluación escrita correspondientes a un perfil estudiantil.
 */
export function getWrittenExamsForProfile(profileId: AcademicProfileId | string): WrittenExamDocument[] {
  return ALL_WRITTEN_EXAM_DOCUMENTS.filter((doc) => doc.profileId === profileId);
}

/**
 * Busca un documento de evaluación escrita por su ID único.
 */
export function getWrittenExamById(id: string): WrittenExamDocument | undefined {
  return ALL_WRITTEN_EXAM_DOCUMENTS.find((doc) => doc.id === id);
}

/**
 * Busca el documento de evaluación escrita asociado a un examen del simulador (`examId`)
 * o por coincidencia semántica de materia/título dentro del perfil.
 */
export function getWrittenExamForTailoredExam(
  examId?: string,
  subjectOrTitle?: string,
  profileId?: AcademicProfileId | string
): WrittenExamDocument | undefined {
  if (examId) {
    const direct = ALL_WRITTEN_EXAM_DOCUMENTS.find((doc) => doc.linkedExamId === examId);
    if (direct) return direct;

    // Mapeo explícito para todos los exámenes de Andrés y demás perfiles
    const examMap: Record<string, string> = {
      'exam-andres-math-z-1': 'written-andres-math-z',
      'exam-andres-math-potencias-1': 'written-andres-math-powers',
      'exam-andres-math-mcm-mcd-1': 'written-andres-math-powers',
      'exam-andres-math-ecuaciones-1': 'written-andres-math-geometry',
      'exam-andres-math-geometria-1': 'written-andres-math-geometry',
      'exam-andres-bio-metodo-1': 'written-andres-bio-method',
      'exam-andres-bio-materia-1': 'written-andres-bio-matter',
      'exam-andres-bio-biomecanica-1': 'written-andres-bio-matter',
      'exam-andres-fisica-unidades-1': 'written-andres-phys-units',
      'exam-andres-fisica-fuerza-1': 'written-andres-phys-machines',
      'exam-andres-castellano-1': 'written-andres-castellano',
      'exam-andres-diseno-info-1': 'written-andres-design',
      'exam-andres-ed-fe-1': 'written-andres-fe',
      'exam-santiago-calculo-1': 'written-santiago-mat1-alson',
      'exam-santiago-fisica-1': 'written-santiago-fis1-mecanica',
      'exam-mafe-teoria-modelo-a': 'written-mafe-teoria-diseno',
      'exam-mafe-teoria-modelo-b': 'written-mafe-teoria-diseno',
      'exam-mafe-color-clase4': 'written-mafe-teoria-color',
      'exam-mafe-matematica-diseno': 'written-mafe-matematica-diseno',
      'exam-mafe-gestalt-1': 'written-mafe-ergonomia-tipografia',
      'exam-prima-admision-1': 'written-sofia-matematica-5to',
    };
    if (examMap[examId]) {
      return getWrittenExamById(examMap[examId]);
    }
  }

  return matchWrittenExamByKeyword(subjectOrTitle, profileId);
}

/**
 * Busca el documento de evaluación escrita asociado a una guía de estudio (`guideId`)
 * o por coincidencia semántica de título/área.
 */
export function getWrittenExamForGuide(
  guideId?: string,
  titleOrArea?: string,
  profileId?: AcademicProfileId | string
): WrittenExamDocument | undefined {
  if (guideId) {
    const direct = ALL_WRITTEN_EXAM_DOCUMENTS.find((doc) => doc.linkedGuideId === guideId);
    if (direct) return direct;

    const guideMap: Record<string, string> = {
      'guide-andres-math-z': 'written-andres-math-z',
      'guide-andres-math-potencias': 'written-andres-math-powers',
      'guide-andres-math-mcm': 'written-andres-math-powers',
      'guide-andres-math-ecuaciones': 'written-andres-math-geometry',
      'guide-andres-math-geometria': 'written-andres-math-geometry',
      'guide-andres-bio-metodo': 'written-andres-bio-method',
      'guide-andres-bio-materia': 'written-andres-bio-matter',
      'guide-andres-bio-biomecanica': 'written-andres-bio-matter',
      'guide-andres-fisica-unidades': 'written-andres-phys-units',
      'guide-andres-fisica-fuerza': 'written-andres-phys-machines',
      'guide-andres-castellano': 'written-andres-castellano',
      'guide-andres-diseno-info': 'written-andres-design',
      'guide-andres-ed-fe': 'written-andres-fe',
      'santiago-mat1-alson-1-4': 'written-santiago-mat1-alson',
      'santiago-mat1-alson-5-8': 'written-santiago-mat1-alson',
      'santiago-mat1-limits-derivatives': 'written-santiago-mat1-alson',
      'santiago-fis1-mechanics-guide': 'written-santiago-fis1-mecanica',
      'santiago-lab1-errors-guide': 'written-santiago-fis1-mecanica',
      'santiago-quim1-atomic-structure': 'written-santiago-quim1-general',
      'santiago-quim1-estequiometria-enlace': 'written-santiago-quim1-general',
      'mafe-design-theory-official': 'written-mafe-teoria-diseno',
      'mafe-color-clase4-ucab': 'written-mafe-teoria-color',
      'mafe-math-design-ucab': 'written-mafe-matematica-diseno',
    };
    if (guideMap[guideId]) {
      return getWrittenExamById(guideMap[guideId]);
    }
  }

  return matchWrittenExamByKeyword(titleOrArea, profileId);
}

function matchWrittenExamByKeyword(
  text?: string,
  profileId?: AcademicProfileId | string
): WrittenExamDocument | undefined {
  const pool = profileId
    ? ALL_WRITTEN_EXAM_DOCUMENTS.filter((doc) => doc.profileId === profileId)
    : ALL_WRITTEN_EXAM_DOCUMENTS;

  if (!text) return pool[0];

  const normalized = text.toLowerCase();

  for (const doc of pool) {
    const target = `${doc.subject} ${doc.unitTitle} ${doc.guideTitle || doc.documentTitle || ''}`.toLowerCase();
    if (normalized.includes('entero') && target.includes('entero')) return doc;
    if ((normalized.includes('potencia') || normalized.includes('m.c.m')) && target.includes('potencia')) return doc;
    if ((normalized.includes('geometr') || normalized.includes('ecuacion')) && target.includes('geometr')) return doc;
    if (normalized.includes('microscop') && target.includes('microscop')) return doc;
    if ((normalized.includes('biomec') || normalized.includes('bioseguridad')) && target.includes('bioseguridad')) return doc;
    if (normalized.includes('conversi') && target.includes('conversi')) return doc;
    if (normalized.includes('palanca') && target.includes('palanca')) return doc;
    if ((normalized.includes('castellano') || normalized.includes('verbal') || normalized.includes('barrab')) && (target.includes('castellano') || target.includes('verbal'))) return doc;
    if ((normalized.includes('inform') || normalized.includes('excel')) && target.includes('inform')) return doc;
    if ((normalized.includes('domund') || normalized.includes('molas') || normalized.includes('fe')) && target.includes('consolaci')) return doc;
    if (normalized.includes('alson') || (normalized.includes('cálculo') && target.includes('alson'))) return doc;
    if (normalized.includes('color') && target.includes('color')) return doc;
    if (normalized.includes('tipograf') || normalized.includes('ergonom')) return doc;
    if (normalized.includes('semiótica') || normalized.includes('teoría del diseño')) return doc;
    if (normalized.includes('química') && target.includes('química')) return doc;
    if (normalized.includes('física') && target.includes('física')) return doc;
    if (normalized.includes('matemática') && target.includes('matemática')) return doc;
    if (normalized.includes('diseño') && target.includes('diseño')) return doc;
  }

  return pool[0];
}
