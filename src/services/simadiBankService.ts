import simadiGuidesRaw from '../data/simadi_guides.json';
import simadiPreguntasRaw from '../data/simadi_preguntas.json';
import { UCV_EXAM_BANK, UCV_CURRICULUM_MODULES } from '../data/ucv_intro_course_data';
import type { Question, ExamOption, AcademicSubject } from '../types/exam.types';

export interface SimadiReference {
  guideName: string;
  pages: string;
}

export interface SimadiPastExam {
  pregunta: string;
  opciones: string[];
  correcta: string;
  resolucion: string;
}

export interface SimadiGuide {
  id: string;
  category: 'verbal' | 'logico' | 'ciencia';
  categoryLabel: string;
  title: string;
  content: string;
  references: SimadiReference[];
  theory: string;
  pastExams: SimadiPastExam[];
  practiceTopics: string[];
}

export interface SimadiRawQuestion {
  id: number;
  area: string;
  tema: string;
  pregunta: string;
  opciones: string[];
  correcta: string;
  justificacion: string;
}

const rawGuides = simadiGuidesRaw as Record<string, any[]>;
const rawQuestions = simadiPreguntasRaw as SimadiRawQuestion[];

/**
 * Mapeo de Área Simadi a Materia Académica del Sistema
 */
function mapAreaToSubject(area: string): AcademicSubject {
  if (area === 'Razonamiento Verbal') return 'Castellano';
  if (area === 'Razonamiento Lógico Numérico') return 'Matemática';
  if (area === 'Ciencia y Tecnología') return 'Física';
  return 'Castellano';
}

/**
 * Convierte una pregunta cruda de Simadi al tipo Question estructurado del simulador
 */
export function formatSimadiQuestion(raw: SimadiRawQuestion): Question {
  const options: ExamOption[] = (raw.opciones || []).map((opt, idx) => ({
    id: `opt-${idx}`,
    text: String(opt).trim(),
  }));

  const correctIndex = (raw.opciones || []).findIndex(
    (opt) => String(opt).trim() === String(raw.correcta).trim()
  );

  return {
    id: `simadi-q-${raw.id}`,
    subject: mapAreaToSubject(raw.area),
    topic: raw.tema,
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5', 'andres_bachillerato_1'],
    questionText: raw.pregunta,
    options,
    correctOptionId: correctIndex !== -1 ? `opt-${correctIndex}` : 'opt-0',
    explanation: raw.justificacion || 'Resolución basada en la prueba oficial.',
    sourceExam: raw.area,
  };
}

export const simadiBankService = {
  /**
   * Obtiene todas las guías de estudio organizadas por categoría
   */
  getAllGuides(categoryFilter?: 'ALL' | 'verbal' | 'logico' | 'ciencia'): SimadiGuide[] {
    const result: SimadiGuide[] = [];

    const categoryMap: Record<string, { label: string; cat: 'verbal' | 'logico' | 'ciencia' }> = {
      verbal: { label: 'Razonamiento Verbal & Lenguaje', cat: 'verbal' },
      logico: { label: 'Razonamiento Lógico & Matemático', cat: 'logico' },
      ciencia: { label: 'Ciencias Exactas & Tecnología', cat: 'ciencia' },
    };

    for (const [key, list] of Object.entries(rawGuides)) {
      if (categoryFilter && categoryFilter !== 'ALL' && key !== categoryFilter) {
        continue;
      }
      const meta = categoryMap[key] || { label: key, cat: 'logico' as const };
      for (const item of list) {
        result.push({
          id: item.id,
          category: meta.cat,
          categoryLabel: meta.label,
          title: item.title,
          content: item.content,
          references: item.references || [],
          theory: item.theory || '',
          pastExams: item.pastExams || [],
          practiceTopics: item.practiceTopics || [],
        });
      }
    }

    return result;
  },

  /**
   * Obtener una guía por ID
   */
  getGuideById(id: string): SimadiGuide | undefined {
    return this.getAllGuides('ALL').find((g) => g.id === id);
  },

  /**
   * Obtiene la lista de áreas temáticas con su conteo de preguntas
   */
  getAreasSummary(): { area: string; totalQuestions: number }[] {
    const map = new Map<string, number>();
    rawQuestions.forEach((q) => {
      const a = q.area || 'General';
      map.set(a, (map.get(a) || 0) + 1);
    });

    return Array.from(map.entries()).map(([area, totalQuestions]) => ({
      area,
      totalQuestions,
    }));
  },

  /**
   * Obtiene la lista de temas desglosados para un área dada
   */
  getTopicsByArea(area: string): { topic: string; count: number }[] {
    const map = new Map<string, number>();
    rawQuestions
      .filter((q) => q.area === area)
      .forEach((q) => {
        const t = q.tema || 'General';
        map.set(t, (map.get(t) || 0) + 1);
      });

    return Array.from(map.entries())
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count);
  },

  /**
   * Obtener todos los temas únicos
   */
  getAllTopics(): { area: string; topic: string; count: number }[] {
    const list: { area: string; topic: string; count: number }[] = [];
    const areas = this.getAreasSummary();
    areas.forEach(({ area }) => {
      const topics = this.getTopicsByArea(area);
      topics.forEach(({ topic, count }) => {
        list.push({ area, topic, count });
      });
    });
    return list;
  },

  /**
   * Obtiene preguntas filtradas por tema para práctica o examen
   */
  getQuestionsByTopic(topicName: string, limit: number = 10): Question[] {
    const filtered = rawQuestions.filter(
      (q) => q.tema.toLowerCase() === topicName.toLowerCase()
    );

    // Mezclar aleatoriamente
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit).map(formatSimadiQuestion);
  },

  /**
   * Obtiene preguntas que coincidan con la lista de practiceTopics de una guía
   */
  getQuestionsForGuide(guide: SimadiGuide, limit: number = 10): Question[] {
    const targetTopics = guide.practiceTopics.map((t) => t.toLowerCase());

    const matching = rawQuestions.filter((q) =>
      targetTopics.some((t) => q.tema.toLowerCase().includes(t) || t.includes(q.tema.toLowerCase()))
    );

    const questionsPool = matching.length > 0 ? matching : rawQuestions.filter(q => {
      if (guide.category === 'verbal') return q.area === 'Razonamiento Verbal';
      if (guide.category === 'logico') return q.area === 'Razonamiento Lógico Numérico';
      return q.area === 'Ciencia y Tecnología';
    });

    const shuffled = [...questionsPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit).map(formatSimadiQuestion);
  },

  /**
   * Obtiene preguntas por área general
   */
  getQuestionsByArea(area: string, limit: number = 10): Question[] {
    const filtered = rawQuestions.filter((q) => q.area === area);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit).map(formatSimadiQuestion);
  },

  /**
   * Total de preguntas disponibles en la base de datos
   */
  getTotalQuestionsCount(): number {
    return rawQuestions.length + UCV_EXAM_BANK.length;
  },

  /**
   * Obtiene preguntas oficiales del Curso Introductorio de la Facultad de Ciencias UCV
   */
  getUcvCourseQuestions(limit: number = 30): Question[] {
    const shuffled = [...UCV_EXAM_BANK].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  },

  /**
   * Retorna los 7 módulos temáticos del Curso Introductorio UCV
   */
  getUcvModules() {
    return UCV_CURRICULUM_MODULES;
  },
};
