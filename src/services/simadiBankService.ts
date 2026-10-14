import simadiGuidesRaw from '../data/simadi_guides.json';
import simadiPreguntasRaw from '../data/simadi_preguntas.json';
import { UCV_EXAM_BANK, UCV_CURRICULUM_MODULES } from '../data/ucv_intro_course_data';
import type { Question, ExamOption, AcademicSubject } from '../types/exam.types';
import { renderLatexToHtml } from '../utils/latexRenderer';

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
  category: 'verbal' | 'logico' | 'ciencia' | 'ucv_ciencias';
  categoryLabel: string;
  title: string;
  content: string;
  references: SimadiReference[];
  theory: string;
  pastExams: SimadiPastExam[];
  practiceTopics: string[];
  keyFormulas?: { name: string; latex: string; description: string }[];
  examTraps?: string[];
  flashcards?: { front: string; back: string }[];
  week?: number;
  unitCode?: string;
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
  getAllGuides(categoryFilter?: 'ALL' | 'verbal' | 'logico' | 'ciencia' | 'ucv_ciencias'): SimadiGuide[] {
    const result: SimadiGuide[] = [];

    // Inyectar primero los 7 Módulos Oficiales del Curso Introductorio de la Facultad de Ciencias UCV
    if (!categoryFilter || categoryFilter === 'ALL' || categoryFilter === 'ucv_ciencias') {
      const ucvGuides: SimadiGuide[] = UCV_CURRICULUM_MODULES.map((mod) => {
        const theoryHtml =
          mod.theoryLatex.map((p) => `<p class="mb-3 leading-relaxed">${renderLatexToHtml(p)}</p>`).join('') +
          (mod.keyFormulas && mod.keyFormulas.length > 0
            ? `<div class="my-4 p-4 rounded-2xl bg-blue-50/70 border border-blue-200"><h4 class="font-bold text-xs uppercase text-blue-900 tracking-wider mb-2">Fórmulas Fundamentales</h4><div class="space-y-3">${mod.keyFormulas
                .map(
                  (f) =>
                    `<div><span class="text-xs font-bold text-slate-800">${f.name}:</span><div class="py-1 text-sm font-bold text-[#0F52BA]">${renderLatexToHtml(f.latex, { displayMode: true })}</div><p class="text-[11px] text-slate-500">${f.description}</p></div>`
                )
                .join('')}</div></div>`
            : '') +
          (mod.examTraps && mod.examTraps.length > 0
            ? `<div class="my-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200"><h4 class="font-bold text-xs uppercase text-amber-900 tracking-wider mb-1.5">⚠️ Trampas Frecuentes de Examen</h4><ul class="list-disc pl-4 space-y-1 text-xs text-amber-950">${mod.examTraps
                .map((t) => `<li>${t}</li>`)
                .join('')}</ul></div>`
            : '');

        return {
          id: mod.id,
          category: 'ucv_ciencias' as const,
          categoryLabel: 'Curso Introductorio UCV',
          title: mod.title,
          content: mod.summary,
          references: [
            { guideName: 'Facultad de Ciencias UCV - Programa Oficial', pages: `Semana ${mod.week}` },
            { guideName: mod.unitName, pages: 'Teoría, Fórmulas y Reactivos' },
          ],
          theory: theoryHtml,
          pastExams: (mod.stepByStepExamples || []).map((ex) => ({
            pregunta: `${ex.title}: ${ex.statement}`,
            opciones: [
              ex.answerLatex,
              'Distractor verosímil con error de signo',
              'Distractor con error de exponente o cálculo',
              'Distractor de simplificación incorrecta',
            ],
            correcta: ex.answerLatex,
            resolucion: ex.steps.join(' → '),
          })),
          practiceTopics: [mod.title, mod.unitName, ...(mod.examTraps || [])],
          keyFormulas: mod.keyFormulas,
          examTraps: mod.examTraps,
          flashcards: mod.practiceFlashcards,
          week: mod.week,
          unitCode: mod.unit,
        };
      });

      result.push(...ucvGuides);
    }

    if (categoryFilter === 'ucv_ciencias') {
      return result;
    }

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

    // Registrar área insignia del Curso Introductorio Ciencias UCV
    map.set('Curso Introductorio Ciencias UCV', UCV_EXAM_BANK.length);

    return Array.from(map.entries()).map(([area, totalQuestions]) => ({
      area,
      totalQuestions,
    }));
  },

  /**
   * Obtiene la lista de temas desglosados para un área dada
   */
  getTopicsByArea(area: string): { topic: string; count: number }[] {
    if (area === 'Curso Introductorio Ciencias UCV') {
      const map = new Map<string, number>();
      UCV_EXAM_BANK.forEach((q) => {
        const t = q.topic || 'General UCV';
        map.set(t, (map.get(t) || 0) + 1);
      });
      return Array.from(map.entries())
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count);
    }

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
    const ucvMatches = UCV_EXAM_BANK.filter(
      (q) => q.topic?.toLowerCase() === topicName.toLowerCase()
    );
    if (ucvMatches.length > 0) {
      const shuffled = [...ucvMatches].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit);
    }

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
    if (guide.category === 'ucv_ciencias') {
      const matching = UCV_EXAM_BANK.filter((q) =>
        guide.practiceTopics.some(
          (t) =>
            (q.topic && q.topic.toLowerCase().includes(t.toLowerCase())) ||
            (q.sourceExam && q.sourceExam.toLowerCase().includes(guide.title.toLowerCase())) ||
            q.questionText.toLowerCase().includes(t.toLowerCase())
        )
      );
      const pool = matching.length >= 3 ? matching : UCV_EXAM_BANK;
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit);
    }

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
