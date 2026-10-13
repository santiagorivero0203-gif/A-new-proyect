import type { AcademicProfileId } from './index';
import type { Question, AcademicSubject } from './exam.types';

function normalizeSubject(area: string): AcademicSubject {
  const lower = area.toLowerCase();
  if (lower.includes('físic') || lower.includes('fisic')) return 'Física';
  if (lower.includes('quími') || lower.includes('quimic')) return 'Química';
  if (lower.includes('biol')) return 'Biología';
  if (lower.includes('castell') || lower.includes('lengu') || lower.includes('verbal')) return 'Castellano';
  return 'Matemática';
}

/**
 * Metadatos de la Guía Académica Deconstruida
 */
export interface GuideMetadata {
  title: string;
  area: string;
  summary: string;
}

/**
 * Elemento del Glosario Técnico y Unidades del Sistema Internacional
 */
export interface GlossaryItem {
  term: string;
  symbolOrUnit: string;
  definition: string;
}

/**
 * Fórmula Matemática, Física o Química con Notación LaTeX
 */
export interface CoreFormula {
  name: string;
  latex: string;
  application: string;
}

/**
 * Ecuaciones Fundamentales, Principios Rectores y Reglas Mnemotécnicas
 */
export interface FormulasAndStrategies {
  coreFormulas: CoreFormula[];
  mnemonicsAndPatterns: string[];
}

/**
 * Caso de Estudio o Problema Resuelto Deductivamente Paso a Paso
 */
export interface StepByStepExample {
  title: string;
  problemStatement: string;
  deductiveSteps: string[];
  finalResult: string;
}

/**
 * Alerta de Trampas de Examen y Errores Típicos
 */
export interface CommonErrorAlert {
  trap: string;
  correction: string;
}

/**
 * Flashcard de Active Recall para Evocación Activa
 */
export interface ActiveRecallFlashcard {
  front: string;
  back: string;
}

/**
 * Estructura de Tres Bloques del Método Cornell
 */
export interface CornellSynthesis {
  cues: string[];
  notes: string[];
  summary: string;
}

/**
 * Ecosistema de Técnicas de Estudio Aplicadas
 */
export interface StudyTechniquesHub {
  activeRecallFlashcards: ActiveRecallFlashcard[];
  cornellSynthesis: CornellSynthesis;
  conceptMapNodes: string;
}

/**
 * Pregunta de Opción Múltiple Generada por la Batería Certificada
 */
export interface DeconstructedQuestion {
  area: string;
  tema: string;
  tipo: 'opcion_multiple';
  pregunta: string;
  opciones: string[];
  correcta: string;
  justificacion: string; // Formato estricto: **Concepto Fundamental:** ... \n\n**Resolución:** ...
}

/**
 * Estructura Completa de la Guía de Estudio Hiper-Compleja
 * Producida por el Motor de Deconstrucción Académica (Gemini API)
 */
export interface DeconstructedAcademicGuide {
  id?: string;
  userId?: string;
  documentId?: string;
  createdAt?: string;
  sourceType?: 'document' | 'topic_prompt';
  guideMetadata: GuideMetadata;
  phenomenonAndTheory: string;
  glossary: GlossaryItem[];
  formulasAndStrategies: FormulasAndStrategies;
  stepByStepExamples: StepByStepExample[];
  commonErrorsAlerts: CommonErrorAlert[];
  studyTechniquesHub: StudyTechniquesHub;
  generatedQuestions: DeconstructedQuestion[];
}

/**
 * Utilidad de conversión: Transforma preguntas deconstruidas al formato nativo
 * compatible con SimulatorEngine de la plataforma.
 */
export function convertDeconstructedToQuestions(
  deconstructedQuestions: DeconstructedQuestion[],
  guideTitle: string,
  userProfile?: AcademicProfileId
): Question[] {
  return deconstructedQuestions.map((dq, idx) => {
    const letters = ['a', 'b', 'c', 'd'];
    const options = dq.opciones.map((optText, oIdx) => ({
      id: `opt-${letters[oIdx] || oIdx}`,
      text: optText,
    }));

    // Determinar la opción correcta comparando el texto
    const normalizedCorrect = dq.correcta.trim().toLowerCase();
    const matchedOption = options.find(
      (opt) => opt.text.trim().toLowerCase() === normalizedCorrect
    );
    const correctOptionId = matchedOption ? matchedOption.id : options[0]?.id || 'opt-a';

    // Extraer resolución de la justificación si tiene formato KaTeX o deducción
    const explanation = dq.justificacion;

    return {
      id: `deconstructed-q-${Date.now()}-${idx + 1}`,
      subject: normalizeSubject(dq.area || guideTitle),
      topic: dq.tema || guideTitle,
      difficulty: 'Intermedio',
      targetProfiles: userProfile ? [userProfile] : ['santiago_fisica_ucv', 'prima_bachillerato_5'],
      questionText: dq.pregunta,
      options,
      correctOptionId,
      explanation,
    };
  });
}
