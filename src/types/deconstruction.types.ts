import type { AcademicProfileId } from './index';
import type { Question, AcademicSubject } from './exam.types';

function normalizeSubject(area: string): AcademicSubject {
  const lower = area.toLowerCase();
  if (lower.includes('físic') || lower.includes('fisic')) return 'Física';
  if (lower.includes('quími') || lower.includes('quimic')) return 'Química';
  if (lower.includes('biol')) return 'Biología';
  if (lower.includes('castell') || lower.includes('lengu') || lower.includes('verbal')) return 'Castellano';
  // Guías de Teoría del Diseño (Semiótica, Gestalt, Usabilidad, Actor-Red)
  if (lower.includes('diseñ') || lower.includes('disen') || lower.includes('semiót') || lower.includes('semiot')) return 'Diseño';
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
 * Recursos Multimedia Integrados (Videos, Audios, Infografías y Simulaciones)
 */
export interface PlaylistItem {
  id: string;
  topicNumber: number;
  topicName: string;
  title: string;
  author: string;
  duration: string;
  url: string;
  embedUrl: string;
  description: string;
}

export interface CuratedPlaylist {
  id: string;
  subjectKey: 'matematica1' | 'quimica1' | 'fisica1' | string;
  subjectTitle: string;
  title: string;
  description: string;
  curator: string;
  playlistUrl: string;
  videos: PlaylistItem[];
}

export type MultimediaType = 'video' | 'audio' | 'image' | 'simulation';

export interface MultimediaResource {
  id: string;
  type: MultimediaType;
  title: string;
  url: string; // URL de YouTube, audio stream, enlace de imagen o simulación interactiva
  embedUrl?: string; // URL de incrustación si aplica (ej. youtube-nocookie.com/embed/...)
  thumbnail?: string;
  durationOrSize?: string; // ej. "14:20 min", "Audio 5:30", "Diagrama Vectorial HD"
  authorOrSource?: string; // ej. "3Blue1Brown", "Walter Lewin - MIT", "El Traductor de Ingeniería", "UCV Ciencias"
  description: string;
}

/**
 * Arquitectura de Prompt de Investigación y Elaboración (Especificación Santiago Rivero)
 * Sigue el flujo de 4 bloques continuos:
 * 1. Disparador de Acción + Método de Entrada ("Quiero que analizando...")
 * 2. Especificación del Entregable + Sub-requisitos ("...aparte de que...")
 * 3. El "Por Qué" Arquitectónico ("...porque voy a...")
 * 4. La Meta de Automatización / Escalabilidad ("...esto para poder que...")
 */
export type ResearchDeliverableType =
  | 'informe_laboratorio'
  | 'trabajo_escrito'
  | 'proyecto_simulacion'
  | 'taller_practico'
  | 'analisis_literario';

export interface SantiagoResearchPrompt {
  id: string;
  evaluationId?: string;
  title: string;
  deliverableType: ResearchDeliverableType;
  deliverableLabel: string; // ej. "Informe de Laboratorio con Incertidumbres", "Proyecto Computacional"
  promptText: string; // Redacción en bloque continuo siguiendo la sintaxis natural de Santiago
  targetAudience: string; // ej. "Facultad de Ciencias UCV", "Bachillerato General"
  outputRequirements: string[]; // Lista plana sin subpuntos de restricciones de salida
  suggestedTools: string[]; // ej. ["Python / NumPy / Matplotlib", "SciDAVis", "Overleaf LaTeX"]
  purposeContext: string; // Resumen del objetivo arquitectónico
}

/**
 * Estructura Completa de la Guía de Estudio Hiper-Compleja
 * Producida por el Motor de Deconstrucción Académica (Gemini API)
 */
export interface DeconstructedAcademicGuide {
  id?: string;
  userId?: string;
  documentId?: string;
  evaluationEventId?: string; // Conexión directa con el calendario de evaluaciones
  createdAt?: string;
  sourceType?: 'document' | 'topic_prompt';
  /**
   * Disciplina de la guía. Ajusta las etiquetas de los pilares en `DeconstructedGuideView`
   * (p. ej. "Glosario & Autores" en lugar de "Unidades SI" para guías de diseño).
   * Si se omite se asume 'science' (comportamiento original).
   */
  discipline?: 'science' | 'design';
  guideMetadata: GuideMetadata;
  phenomenonAndTheory: string;
  glossary: GlossaryItem[];
  formulasAndStrategies: FormulasAndStrategies;
  stepByStepExamples: StepByStepExample[];
  commonErrorsAlerts: CommonErrorAlert[];
  studyTechniquesHub: StudyTechniquesHub;
  generatedQuestions: DeconstructedQuestion[];
  multimediaResources?: MultimediaResource[];
  curatedPlaylist?: CuratedPlaylist;
  researchPrompts?: SantiagoResearchPrompt[];
  researchPrompt?: SantiagoResearchPrompt;
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

    // Determinar la opción correcta comparando texto exacto o letra/índice (ej: "B", "Opción B", "b)")
    const normalizedCorrect = (dq.correcta || '').trim().toLowerCase();
    let matchedOption = options.find(
      (opt) => opt.text.trim().toLowerCase() === normalizedCorrect
    );

    if (!matchedOption) {
      // Coincidencia por letra ('a', 'b', 'c', 'd' o 'opción x' o '1' a '4')
      const letterMatch = normalizedCorrect.match(/\b([a-d])\b|^opci[oó]n\s*([a-d])|\b([1-4])\b/i);
      if (letterMatch) {
        const letter = (letterMatch[1] || letterMatch[2] || '').toLowerCase();
        const num = letterMatch[3] ? parseInt(letterMatch[3], 10) - 1 : -1;
        if (letter) {
          matchedOption = options.find((opt) => opt.id === `opt-${letter}`);
        } else if (num >= 0 && num < options.length) {
          matchedOption = options[num];
        }
      }
    }

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
