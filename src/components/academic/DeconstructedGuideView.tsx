import React, { useState } from 'react';
import { Film, Eye, Download, Printer, FileText } from 'lucide-react';
import type {
  DeconstructedAcademicGuide,
} from '../../types/deconstruction.types';
import { convertDeconstructedToQuestions } from '../../types/deconstruction.types';
import type { Question } from '../../types/exam.types';
import { renderLatex } from '../../utils/latexRenderer';
import {
  PlayIcon,
  BookOpenIcon,
  XIcon,
  CheckCircleIcon,
  LayersIcon,
} from '../common/Icons';
import { AudioGuidePlayer } from './AudioGuidePlayer';
import { KineticReelPlayer } from './KineticReelPlayer';
import { InteractiveDesignPlayground } from './InteractiveDesignPlayground';
import { EnhancedFlashcardDeck } from './EnhancedFlashcardDeck';
import {
  exportGuideToWord,
  exportGuideToPdf,
  OFFICIAL_NOTION_PDF_LINKS,
} from '../../utils/documentExport';
import {
  DESIGN_THEORY_QUESTIONS,
  NOTION_COLOR_QUESTIONS,
  NOTION_MATH_QUESTIONS,
  ALL_MAFE_QUESTIONS,
} from '../../data/mafe_curriculum_hub';

export interface DeconstructedGuideViewProps {
  guide: DeconstructedAcademicGuide;
  onClose?: () => void;
  onStartExamWithQuestions?: (questions: Question[], title: string) => void;
}

type TabType =
  | 'THEORY'
  | 'GLOSSARY'
  | 'FORMULAS'
  | 'STEP_BY_STEP'
  | 'ALERTS'
  | 'STUDY_TECHNIQUES'
  | 'KINETIC_VIDEO'
  | 'INTERACTIVE_LAB'
  | 'EVALUATION';

/**
 * Etiquetas de los pilares según la disciplina de la guía.
 * 'science' conserva los textos originales; 'design' adapta el vocabulario a guías
 * conceptuales (Semiótica, Gestalt, Usabilidad, Actor-Red) donde no existen unidades SI ni fórmulas numéricas.
 */
const PILLAR_LABELS = {
  science: {
    theoryTitle: '1. Introducción al Fenómeno y Sustancia Teórica',
    theorySubtitle: 'Explicación rigurosa de la mecánica interna del fenómeno con notación matemática formal',
    glossaryTab: '2. Glosario & Unidades',
    glossaryTitle: '2. Glosario Técnico y Unidades en el Sistema Internacional (SI)',
    glossarySubtitle: 'Definiciones precisas de variables, operadores y constantes académicas',
    formulasTab: '3. Fórmulas & Reglas',
    formulasTitle: '3. Fórmulas Fundamentales, Patrones & Reglas Mnemotécnicas',
    formulasSubtitle: 'Ecuaciones rectoras y trucos cognitivos para identificación inmediata en exámenes',
    formulasSection: 'Ecuaciones Fundamentales (KaTeX)',
    formulaBadge: 'Expresión Central',
    stepsTab: '4. Deducción Paso a Paso',
    stepsTitle: '4. Resolución Deductiva Paso a Paso de Casos Representativos',
    stepsSubtitle: 'Desglose analítico de qué datos se tienen, qué principios se aplican y cómo se despeja',
    alertsSubtitle: 'Fallos típicos de despeje, signos, conversión de unidades y falsos amigos conceptuales',
  },
  design: {
    theoryTitle: '1. Temario Oficial y Teoría Deconstruida por Capítulos',
    theorySubtitle: 'Conceptos clave, autores de referencia y ejemplos de estudio de cada capítulo',
    glossaryTab: '2. Glosario & Autores',
    glossaryTitle: '2. Glosario de Conceptos y Autores de Referencia',
    glossarySubtitle: 'Definiciones exactas de examen con el autor o capítulo de origen',
    formulasTab: '3. Modelos & Mnemotecnias',
    formulasTitle: '3. Modelos Teóricos y Reglas Mnemotécnicas',
    formulasSubtitle: 'Cada teoría resumida como una "ecuación conceptual" y trucos para no confundir términos',
    formulasSection: 'Modelos Teóricos Esenciales',
    formulaBadge: 'Modelo Central',
    stepsTab: '4. Método & Casos Resueltos',
    stepsTitle: '4. Metodología Paso a Paso para Resolver Casos de Examen',
    stepsSubtitle: 'Plantilla de 4 pasos (un paso por capítulo) aplicada a objetos cotidianos',
    alertsSubtitle: 'Pares de conceptos que más se confunden en los parciales y cómo distinguirlos',
  },
} as const;

/**
 * Componente Editorial de Guía de Estudio Hiper-Compleja
 * Renderiza el núcleo pedagógico deconstruido en 7 pilares con soporte KaTeX,
 * flashcards interactivas de Active Recall, cuadrícula Cornell y lanzamiento
 * directo al SimulatorEngine.
 */
interface EditorialTheoryRendererProps {
  content: string;
  fontSizeMode: 'normal' | 'medium' | 'large';
}

/**
 * Renderizador Editorial de Teoría: Deconstrucción en Capítulos, Conceptos y Ejemplos Cotidianos
 * Aplica los principios de "Menos, pero Mejor", "Jerarquía Invisible" y "Respiración del Espacio".
 * Sanitiza cualquier símbolo extraño (#@, @[...]) y soporta markdown nativo y KaTeX.
 */
const EditorialTheoryRenderer: React.FC<EditorialTheoryRendererProps> = ({ content, fontSizeMode }) => {
  const fontClasses = {
    normal: 'text-sm sm:text-base leading-relaxed',
    medium: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
  };

  const bodyClass = fontClasses[fontSizeMode];

  // 1. Sanitizar artefactos anómalos (#@, referencias cuadradas @[...])
  const sanitized = (content || '')
    .replace(/#@|##@|#\s*@/g, '')
    .replace(/@\[[^\]]+\]/g, '')
    .replace(/\r\n/g, '\n')
    .trim();

  // 2. Identificar secciones por encabezados de capítulos, unidades, temas o markdown ###
  const rawSections = sanitized
    .split(/(?=(?:\n|^)(?:###?\s+|(?:\*\*)?(?:CAPÍTULO|UNIDAD|GUÍA|MÓDULO|TEMA)\b|\d+\.\s+[A-ZÁÉÍÓÚ]))/i)
    .map((s) => s.trim())
    .filter(Boolean);

  if (rawSections.length === 0) {
    return (
      <div className={`prose prose-slate max-w-none ${bodyClass} text-slate-800 space-y-4`}>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-xs text-slate-800">
          Contenido de la guía disponible para estudio.
        </div>
      </div>
    );
  }

  // Fallback si no hay estructura de secciones
  if (rawSections.length === 1 && !sanitized.match(/^(?:###|\*\*CAPÍTULO|\*\*UNIDAD|\*\*GUÍA|UNIDAD|CAPÍTULO|\d+\.)/i)) {
    return (
      <div className={`prose prose-slate max-w-none ${bodyClass} text-slate-800 space-y-5`}>
        {sanitized.split('\n\n').filter(Boolean).map((p, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-xs text-slate-800"
            dangerouslySetInnerHTML={{ __html: renderLatex(p.trim()) }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {rawSections.map((sec, secIdx) => {
        const lines = sec.split('\n').map((l) => l.trim()).filter(Boolean);
        const headerLine = lines[0] || '';
        const cleanHeader = headerLine
          .replace(/^#+\s*/, '')
          .replace(/\*\*/g, '')
          .trim();

        // Extraer número de capítulo o distintivo
        const badgeMatch = cleanHeader.match(/^(CAPÍTULO\s+\d+|UNIDAD\s+[IVXLCDM\d]+|GUÍA\s+\d+|MÓDULO\s+\d+|\d+\.)/i);
        const chapterBadge = badgeMatch ? badgeMatch[1] : `Módulo ${secIdx + 1}`;
        const chapterTitle = cleanHeader.replace(/^(CAPÍTULO\s+\d+|UNIDAD\s+[IVXLCDM\d]+|GUÍA\s+\d+|MÓDULO\s+\d+|\d+\.)\s*[·:–-]\s*/i, '');

        const otherLines = lines.slice(1);
        const introLines: string[] = [];
        const calloutLines: string[] = [];
        const items: { term: string; tag?: string; definition: string; example?: string; subBullets: string[] }[] = [];
        let currentItem: { term: string; tag?: string; definition: string; example?: string; subBullets: string[] } | null = null;

        for (const line of otherLines) {
          // Detectar citas / notas destacadas (> o &gt;)
          if (line.startsWith('>') || line.startsWith('&gt;')) {
            const cleanCallout = line.replace(/^(?:>|&gt;)\s*/, '').trim();
            calloutLines.push(cleanCallout);
            continue;
          }

          if (line.startsWith('•') || line.startsWith('-') || line.startsWith('* ')) {
            if (currentItem) items.push(currentItem);
            const lineContent = line.replace(/^[•\-*]\s*/, '').trim();
            // Buscar término en negrita: **Término:** o **Término (Autor):**
            const boldMatch = lineContent.match(/^\*\*([^*]+)\*\*[:\s]*(.*)/);
            if (boldMatch) {
              const rawTerm = boldMatch[1].trim();
              const rest = boldMatch[2].trim();
              // Separar autor o tag si viene entre paréntesis
              const tagMatch = rawTerm.match(/^(.+?)\s*\((.+?)\)$/);
              const term = tagMatch ? tagMatch[1].trim() : rawTerm;
              const tag = tagMatch ? tagMatch[2].trim() : undefined;

              // Buscar ejemplo: *Ej.: ...* o *Ejemplo:*
              const exampleMatch = rest.match(/\*Ej(?:\.|emplo)[:\s]*([^*]+)\*/i);
              let definition = rest;
              let example: string | undefined;
              if (exampleMatch) {
                example = exampleMatch[1].trim();
                definition = rest.replace(/\*Ej(?:\.|emplo)[:\s]*([^*]+)\*/i, '').trim();
              }

              currentItem = { term, tag, definition, example, subBullets: [] };
            } else {
              currentItem = { term: '', definition: lineContent, subBullets: [] };
            }
          } else if (line.startsWith('–') || line.startsWith('—')) {
            const subContent = line.replace(/^[–—]\s*/, '').trim();
            if (currentItem) {
              currentItem.subBullets.push(subContent);
            } else {
              introLines.push(line);
            }
          } else if (line.match(/^\d+\.\s+/)) {
            // Pasos numerados (1. ..., 2. ...)
            if (currentItem) items.push(currentItem);
            const numContent = line.replace(/^\d+\.\s+/, '').trim();
            const boldMatch = numContent.match(/^\*\*([^*]+)\*\*[:\s]*(.*)/);
            if (boldMatch) {
              currentItem = {
                term: boldMatch[1].trim(),
                definition: boldMatch[2].trim(),
                subBullets: [],
              };
            } else {
              currentItem = {
                term: '',
                definition: numContent,
                subBullets: [],
              };
            }
          } else {
            if (!currentItem) {
              introLines.push(line);
            } else {
              currentItem.definition += ' ' + line;
            }
          }
        }
        if (currentItem) items.push(currentItem);

        return (
          <section
            key={secIdx}
            className="rounded-3xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 space-y-5 shadow-soft transition-all"
          >
            {/* Cabecera Editorial del Capítulo / Unidad */}
            <div className="space-y-2 border-b border-slate-200/80 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-100 dark:bg-blue-950/80 text-[#0F52BA] dark:text-blue-300 border border-blue-300/80 dark:border-blue-800 uppercase tracking-wide">
                  {chapterBadge}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight font-sans">
                {chapterTitle || cleanHeader}
              </h3>
              {introLines.length > 0 && (
                <div className={`text-slate-600 dark:text-slate-300 font-medium ${bodyClass} pt-1 space-y-2.5`}>
                  {introLines.map((il, i) => (
                    <div key={i} dangerouslySetInnerHTML={{ __html: renderLatex(il) }} />
                  ))}
                </div>
              )}
            </div>

            {/* Citas y Reglas de Oro Destacadas */}
            {calloutLines.length > 0 && (
              <div className="space-y-3">
                {calloutLines.map((cl, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border-l-4 border-amber-500 text-amber-950 dark:text-amber-200 flex items-start gap-3 shadow-soft-xs"
                  >
                    <span className="text-xl shrink-0 mt-0.5">⭐</span>
                    <div
                      className="text-xs sm:text-sm font-medium leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: renderLatex(cl) }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Cuadrícula de Conceptos Clave o Pasos */}
            {items.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-soft-xs space-y-3 hover:border-slate-300 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight font-sans">
                        {item.term || `Concepto ${idx + 1}`}
                      </h4>
                      {item.tag && (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          {item.tag}
                        </span>
                      )}
                    </div>

                    {item.definition && (
                      <div
                        className={`text-slate-700 dark:text-slate-300 font-sans ${bodyClass}`}
                        dangerouslySetInnerHTML={{ __html: renderLatex(item.definition) }}
                      />
                    )}

                    {item.example && (
                      <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-950 dark:text-amber-200 flex items-start gap-3">
                        <span className="text-lg shrink-0 mt-0.5">💡</span>
                        <div className="space-y-1">
                          <strong className="block text-xs uppercase tracking-wider text-amber-900 dark:text-amber-300 font-mono font-bold">
                            Ejemplo real de aplicación:
                          </strong>
                          <div
                            className="text-xs sm:text-sm font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: renderLatex(item.example) }}
                          />
                        </div>
                      </div>
                    )}

                    {item.subBullets.length > 0 && (
                      <div className="pt-2 pl-3 border-l-2 border-blue-200 dark:border-blue-800 space-y-2">
                        {item.subBullets.map((sub, sIdx) => (
                          <div
                            key={sIdx}
                            className={`text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans ${bodyClass}`}
                            dangerouslySetInnerHTML={{ __html: renderLatex(sub) }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export const DeconstructedGuideView: React.FC<DeconstructedGuideViewProps> = ({
  guide,
  onClose,
  onStartExamWithQuestions,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('THEORY');
  const [fontSizeMode, setFontSizeMode] = useState<'normal' | 'medium' | 'large'>('medium');

  // Estado para justificaciones de preguntas desplegables
  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState<number | null>(null);

  const {
    guideMetadata,
    phenomenonAndTheory,
    glossary,
    formulasAndStrategies,
    stepByStepExamples,
    commonErrorsAlerts,
    studyTechniquesHub,
    generatedQuestions,
  } = guide;

  const totalQuestions = generatedQuestions?.length || 0;
  const flashcards = studyTechniquesHub?.activeRecallFlashcards || [];
  // Etiquetas de pilares según disciplina (por defecto: ciencias)
  const labels = PILLAR_LABELS[guide.discipline ?? 'science'];

  // Enlaces a PDFs oficiales de Notion
  const notionPdfs = guide.id ? OFFICIAL_NOTION_PDF_LINKS[guide.id] : undefined;

  /**
   * Conecta directamente con el Simulador de Exámenes con salvaguarda a banco completo
   */
  const handleLaunchSimulator = () => {
    if (!onStartExamWithQuestions) return;
    let adaptedQuestions = convertDeconstructedToQuestions(
      generatedQuestions || [],
      guideMetadata.title
    );
    if (!adaptedQuestions || adaptedQuestions.length === 0) {
      if (guide.id === 'mafe-design-theory-official') {
        adaptedQuestions = [...DESIGN_THEORY_QUESTIONS];
      } else if (guide.id === 'mafe-color-clase4-ucab') {
        adaptedQuestions = [...NOTION_COLOR_QUESTIONS];
      } else if (guide.id === 'mafe-math-design-ucab') {
        adaptedQuestions = [...NOTION_MATH_QUESTIONS];
      } else {
        adaptedQuestions = ALL_MAFE_QUESTIONS.slice(0, 10);
      }
    }
    onStartExamWithQuestions(
      adaptedQuestions,
      `Simulación: ${guideMetadata.title}`
    );
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-soft flex flex-col max-h-[92vh] overflow-hidden animate-fadeIn">
      {/* 1. CABECERA EDITORIAL PRINCIPAL (Menos, pero Mejor + Acento Cobalto) */}
      <div className="relative p-4 sm:p-6 bg-slate-50/70 border-b border-slate-200/80 space-y-3">
        {/* Fila Superior: Badge contextual, Título & Botón de Cierre Fijo */}
        <div className="flex items-start justify-between gap-3 pr-8 sm:pr-0">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0F52BA] border border-blue-200/70 text-[11px] font-bold">
                {guideMetadata.area || 'Diseño Integral'}
              </span>
              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                Guía Deconstruida • 7 Pilares
              </span>
            </div>
            <h1 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight font-sans leading-snug">
              {guideMetadata.title}
            </h1>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:static p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200/70 transition-colors cursor-pointer shrink-0"
              title="Cerrar vista de la guía"
            >
              <XIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Fila de Herramientas y Acciones (Limpia y Compacta) */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
          {/* Herramientas de lectura: Zoom y Audio */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="inline-flex items-center p-0.5 bg-white border border-slate-200 rounded-xl shadow-soft-xs text-xs font-bold text-slate-600">
              <button
                onClick={() => setFontSizeMode('normal')}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  fontSizeMode === 'normal' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 text-slate-600'
                }`}
                title="Texto Normal (14px)"
              >
                A-
              </button>
              <button
                onClick={() => setFontSizeMode('medium')}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  fontSizeMode === 'medium' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 text-slate-600'
                }`}
                title="Texto Mediano (16px)"
              >
                A
              </button>
              <button
                onClick={() => setFontSizeMode('large')}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  fontSizeMode === 'large' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 text-slate-600'
                }`}
                title="Texto Grande (18px)"
              >
                A+
              </button>
            </div>

            <AudioGuidePlayer
              guideTitle={guideMetadata.title}
              guideText={`${phenomenonAndTheory}. ${guideMetadata.summary}`}
            />
          </div>

          {/* Exportación & Lanzamiento de Simulación */}
          <div className="flex items-center gap-1.5 shrink-0 ml-auto">
            {/* Descarga Directa en PDF (Funcional para todas las guías deconstruidas) */}
            <button
              onClick={() => exportGuideToPdf(guide)}
              className="py-1 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#0F52BA] text-xs font-bold flex items-center gap-1 shadow-soft-xs active:scale-[0.98] transition-all cursor-pointer"
              title="Descargar o Guardar como documento PDF oficial"
            >
              <Download className="w-3.5 h-3.5 text-[#0F52BA]" />
              <span>PDF</span>
              <span className="text-[10px] text-blue-500/80 font-normal hidden sm:inline">(.pdf)</span>
            </button>

            {/* Word .doc */}
            <button
              onClick={() => exportGuideToWord(guide)}
              className="py-1 px-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 shadow-soft-xs active:scale-[0.98] transition-all cursor-pointer"
              title="Descargar guía en Word (.doc)"
            >
              <FileText className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden sm:inline">Word</span>
              <span className="text-[10px] text-slate-400 font-normal">(.doc)</span>
            </button>

            {/* PDF Oficial Notion si existe */}
            {notionPdfs && notionPdfs.length > 0 && (
              <a
                href={notionPdfs[0].url}
                target="_blank"
                rel="noreferrer"
                download={notionPdfs[0].filename}
                className="py-1 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1 shadow-soft-xs active:scale-[0.98] transition-all cursor-pointer"
                title="Descargar archivo original de Notion"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Notion</span>
              </a>
            )}

            {/* Imprimir / Guardar como PDF */}
            <button
              onClick={() => exportGuideToPdf(guide)}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors shadow-soft-xs cursor-pointer"
              title="Imprimir o Guardar como PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
            </button>

            {/* Botón Primario de Simulación */}
            {onStartExamWithQuestions && (
              <button
                onClick={handleLaunchSimulator}
                className="bg-[#0F52BA] hover:bg-[#0c4396] active:scale-[0.98] text-white text-xs font-bold py-1 px-3.5 rounded-xl shadow-soft transition-all flex items-center gap-1.5 group cursor-pointer"
                title="Iniciar simulación de examen de este tema"
              >
                <PlayIcon className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
                <span>Simular ({Math.max(totalQuestions, 10)})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. BARRA DE PESTAÑAS (7 Pilares de la Anatomía Pedagógica) */}
      <div className="px-4 sm:px-6 border-b border-slate-200 bg-white flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-1">
        <button
          onClick={() => setActiveTab('THEORY')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'THEORY'
              ? 'bg-slate-900 text-white shadow-soft-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>1. Teoría & Sustancia</span>
        </button>

        <button
          onClick={() => setActiveTab('GLOSSARY')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'GLOSSARY'
              ? 'bg-slate-900 text-white shadow-soft-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>{labels.glossaryTab}</span>
          <span className="text-[10px] opacity-75">({glossary?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('FORMULAS')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'FORMULAS'
              ? 'bg-slate-900 text-white shadow-soft-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>{labels.formulasTab}</span>
          <span className="text-[10px] opacity-75">
            ({formulasAndStrategies?.coreFormulas?.length || 0})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('STEP_BY_STEP')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'STEP_BY_STEP'
              ? 'bg-slate-900 text-white shadow-soft-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>{labels.stepsTab}</span>
          <span className="text-[10px] opacity-75">
            ({stepByStepExamples?.length || 0})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('ALERTS')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'ALERTS'
              ? 'bg-amber-600 text-white shadow-soft-sm'
              : 'text-amber-800 hover:bg-amber-50'
          }`}
        >
          <span>5. Alertas & Trampas</span>
          <span className="text-[10px] opacity-75">
            ({commonErrorsAlerts?.length || 0})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('STUDY_TECHNIQUES')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'STUDY_TECHNIQUES'
              ? 'bg-[#0F52BA] text-white shadow-soft-sm'
              : 'text-[#0F52BA] hover:bg-blue-50'
          }`}
        >
          <LayersIcon className="w-3.5 h-3.5" />
          <span>6. Técnicas de Estudio</span>
        </button>

        <button
          onClick={() => setActiveTab('KINETIC_VIDEO')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'KINETIC_VIDEO'
              ? 'bg-sky-600 text-white shadow-soft-sm ring-1 ring-sky-400'
              : 'text-sky-700 hover:bg-sky-50'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>🎬 Reel Cinético</span>
        </button>

        <button
          onClick={() => setActiveTab('INTERACTIVE_LAB')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'INTERACTIVE_LAB'
              ? 'bg-purple-600 text-white shadow-soft-sm ring-1 ring-purple-400'
              : 'text-purple-700 hover:bg-purple-50'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>🧪 Laboratorio Visual</span>
        </button>

        <button
          onClick={() => setActiveTab('EVALUATION')}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'EVALUATION'
              ? 'bg-emerald-700 text-white shadow-soft-sm'
              : 'text-emerald-800 hover:bg-emerald-50'
          }`}
        >
          <span>7. Autoevaluación</span>
          <span className="text-[10px] opacity-75">({totalQuestions})</span>
        </button>
      </div>

      {/* 3. ÁREA DE CONTENIDO PRINCIPAL (SCROLLEABLE) */}
      <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800 font-sans">
        {/* PILAR 1: TEORÍA Y SUSTANCIA DEL FENÓMENO */}
        {activeTab === 'THEORY' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200/80 shadow-[0_2px_14px_-2px_rgba(15,82,186,0.08)]">
              <h2 className="text-base font-bold text-slate-900">
                {labels.theoryTitle}
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {labels.theorySubtitle}
              </p>
            </div>

            {/* Desarrollo Teórico Editorial con Alta Legibilidad, KaTeX y Ejemplos Prácticos */}
            <EditorialTheoryRenderer
              content={phenomenonAndTheory}
              fontSizeMode={fontSizeMode}
            />

            {/* Banner de Acción Inmediata hacia Técnicas */}
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-900">
              <div className="flex items-center gap-2">
                <span className="text-base">💡</span>
                <span>¿Comprendes la mecánica del fenómeno? Ponla a prueba con las flashcards activas.</span>
              </div>
              <button
                onClick={() => setActiveTab('STUDY_TECHNIQUES')}
                className="px-3 py-1.5 rounded-xl bg-white border border-blue-300 text-[#0F52BA] font-bold hover:bg-blue-50 transition-colors shrink-0"
              >
                Ir a Flashcards de Evocación →
              </button>
            </div>
          </div>
        )}

        {/* PILAR 2: GLOSARIO TÉCNICO Y UNIDADES DEL SISTEMA INTERNACIONAL */}
        {activeTab === 'GLOSSARY' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200/80 shadow-[0_2px_14px_-2px_rgba(15,82,186,0.08)]">
              <h2 className="text-base font-bold text-slate-900">
                {labels.glossaryTitle}
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {labels.glossarySubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {glossary?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm space-y-2 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-bold text-slate-900 font-sans">
                      {item.term}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded-lg bg-blue-50 text-[#0F52BA] border border-blue-200/70 font-mono text-[11px] font-semibold shrink-0"
                      dangerouslySetInnerHTML={{
                        __html: renderLatex(item.symbolOrUnit),
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PILAR 3: FÓRMULAS, PATRONES Y REGLAS MNEMOTÉCNICAS */}
        {activeTab === 'FORMULAS' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200/80 shadow-[0_2px_14px_-2px_rgba(15,82,186,0.08)]">
              <h2 className="text-base font-bold text-slate-900">
                {labels.formulasTitle}
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {labels.formulasSubtitle}
              </p>
            </div>

            {/* Tarjetas de Fórmulas con Acento Cobalto */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                {labels.formulasSection}
              </h3>
              <div className="space-y-3">
                {formulasAndStrategies?.coreFormulas?.map((formula, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-blue-200/90 shadow-[0_4px_16px_-2px_rgba(15,82,186,0.10)] ring-1 ring-blue-500/20 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 font-sans">
                        {formula.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#0F52BA] bg-blue-50 px-2 py-0.5 rounded-md font-semibold">
                        {labels.formulaBadge}
                      </span>
                    </div>

                    <div
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 overflow-x-auto text-slate-900 text-center"
                      dangerouslySetInnerHTML={{
                        __html: renderLatex(formula.latex, true),
                      }}
                    />

                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      <strong className="text-slate-800">Cuándo y cómo usarla: </strong>
                      {formula.application}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mnemotécnicas y Patrones */}
            {formulasAndStrategies?.mnemonicsAndPatterns?.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-200/80">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                  Estrategias de Patrones & Trucos Lógicos
                </h3>
                <div className="space-y-2.5">
                  {formulasAndStrategies.mnemonicsAndPatterns.map((mnemonic, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0F52BA] flex items-center justify-center font-bold text-[11px] shrink-0">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed font-sans pt-0.5">{mnemonic}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PILAR 4: RESOLUCIÓN DEDUCTIVA PASO A PASO */}
        {activeTab === 'STEP_BY_STEP' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200/80 shadow-[0_2px_14px_-2px_rgba(15,82,186,0.08)]">
              <h2 className="text-base font-bold text-slate-900">
                {labels.stepsTitle}
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {labels.stepsSubtitle}
              </p>
            </div>

            <div className="space-y-5">
              {stepByStepExamples?.map((example, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-xs font-bold text-slate-900 font-sans">
                      {example.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">
                      Caso #{idx + 1}
                    </span>
                  </div>

                  {/* Enunciado */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-800 leading-relaxed font-sans">
                    <strong className="text-slate-900 block mb-1">Enunciado del Problema:</strong>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: renderLatex(example.problemStatement),
                      }}
                    />
                  </div>

                  {/* Etapas Deductivas */}
                  <div className="space-y-2">
                    <strong className="text-xs font-bold text-slate-700 block px-1">
                      Desglose de la Deducción Lógica:
                    </strong>
                    <div className="space-y-2">
                      {example.deductiveSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3 rounded-xl bg-white border border-slate-200/70 text-xs text-slate-700 flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                            {sIdx + 1}
                          </span>
                          <div
                            className="leading-relaxed font-sans flex-1"
                            dangerouslySetInnerHTML={{
                              __html: renderLatex(step),
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resultado Exacto */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                    <div>
                      <span className="font-bold block text-[11px] uppercase tracking-wider text-emerald-800">
                        Resultado Exacto Concluido:
                      </span>
                      <span
                        className="font-mono text-xs font-bold mt-0.5 block"
                        dangerouslySetInnerHTML={{
                          __html: renderLatex(example.finalResult),
                        }}
                      />
                    </div>
                    <CheckCircleIcon className="w-5 h-5 text-emerald-600 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PILAR 5: ALERTAS DE TRAMPAS Y ERRORES COMUNES */}
        {activeTab === 'ALERTS' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 shadow-[0_2px_14px_-2px_rgba(245,158,11,0.10)]">
              <h2 className="text-base font-bold text-slate-900">
                5. Alertas de Trampas de Examen y Errores Conceptuales
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {labels.alertsSubtitle}
              </p>
            </div>

            <div className="space-y-4">
              {commonErrorsAlerts?.map((alert, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80 shadow-soft-sm space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg shrink-0">⚠️</span>
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold text-amber-950 font-sans">
                        Trampa / Error Típico en Parciales:
                      </h3>
                      <p
                        className="text-xs text-amber-900 leading-relaxed font-sans"
                        dangerouslySetInnerHTML={{
                          __html: renderLatex(alert.trap),
                        }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-amber-200/90 text-xs space-y-1">
                    <span className="font-bold text-slate-900 block text-[11px]">
                      Cómo prevenirlo y resolverlo bien:
                    </span>
                    <p
                      className="text-slate-700 leading-relaxed font-sans"
                      dangerouslySetInnerHTML={{
                        __html: renderLatex(alert.correction),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PILAR 6: ECOSISTEMA DE TÉCNICAS DE ESTUDIO (Active Recall + Cornell + Mapa) */}
        {activeTab === 'STUDY_TECHNIQUES' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200/80 shadow-[0_2px_14px_-2px_rgba(15,82,186,0.08)]">
              <h2 className="text-base font-bold text-slate-900">
                6. Ecosistema de Técnicas de Estudio Aplicadas
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Evocación activa mediante flashcards, síntesis del Método Cornell y jerarquía conceptual
              </p>
            </div>

            {/* SECCIÓN A: FLASHCARDS INTERACTIVAS DE ACTIVE RECALL (SISTEMA LEITNER) */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Active Recall: Tarjetas de Evocación Rápida & Sistema Leitner
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  Haz clic en la tarjeta para voltearla en 3D y califica tu nivel de retención
                </span>
              </div>

              <EnhancedFlashcardDeck
                flashcards={flashcards}
                renderLatex={renderLatex}
              />
            </div>

            {/* SECCIÓN B: MÉTODO CORNELL (CUADRÍCULA CLÁSICA DE 3 BLOQUES) */}
            {studyTechniquesHub?.cornellSynthesis && (
              <div className="space-y-4 pt-6 border-t border-slate-200/80">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Síntesis del Método Cornell (3 Bloques)
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    Estructura mnemotécnica de cues, notas densas y resumen final
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-soft">
                  {/* Fila Superior: Cues (Izquierda) + Notas (Derecha) */}
                  <div className="grid grid-cols-1 md:grid-cols-12 min-h-[220px]">
                    {/* Columna Izquierda: Cues / Preguntas Guía (4 columnas) */}
                    <div className="md:col-span-4 p-5 bg-slate-50/70 border-b md:border-b-0 md:border-r border-slate-200 space-y-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F52BA] block">
                        Cues / Preguntas Guía:
                      </span>
                      <ul className="space-y-2 text-xs text-slate-700 font-sans">
                        {studyTechniquesHub.cornellSynthesis.cues.map((cue, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#0F52BA] font-bold">•</span>
                            <span className="leading-snug">{cue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Columna Derecha: Notas Densas de la Clase (8 columnas) */}
                    <div className="md:col-span-8 p-5 bg-white space-y-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        Notas de la Clase / Puntos Densos:
                      </span>
                      <ul className="space-y-2.5 text-xs text-slate-700 font-sans leading-relaxed">
                        {studyTechniquesHub.cornellSynthesis.notes.map((note, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-400 font-bold">—</span>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: renderLatex(note),
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Fila Inferior: Resumen Ejecutivo en Dos Líneas */}
                  <div className="p-4 bg-blue-50/40 border-t border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F52BA] block">
                      Resumen / Conclusión Cornell:
                    </span>
                    <p className="text-xs text-slate-800 leading-relaxed font-sans">
                      {studyTechniquesHub.cornellSynthesis.summary}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN C: MAPA CONCEPTUAL / NODOS JERÁRQUICOS */}
            {studyTechniquesHub?.conceptMapNodes && (
              <div className="space-y-3 pt-6 border-t border-slate-200/80">
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Estructura Jerárquica del Mapa Conceptual
                </h3>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 font-mono text-xs text-slate-700 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {studyTechniquesHub.conceptMapNodes}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: VIDEO REEL CINÉTICO VERTICAL 9:16 (PLAYBOOK REMOTION & HYPERFRAMES) */}
        {activeTab === 'KINETIC_VIDEO' && (
          <div className="space-y-6 max-w-4xl mx-auto py-2 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-200/80 shadow-[0_2px_14px_-2px_rgba(56,189,248,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase text-sky-700">
                    Playbook Remotion & HyperFrames
                  </span>
                </div>
                <h2 className="text-base font-bold text-slate-900 mt-0.5">
                  Reel Cinético Vertical 9:16 (5 Beats de Retención)
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Hook (0-3.3s) • Táctica (3.6s) • Showcase Visual (3.6s) • Síntesis (3.6s) • CTA Oficial
                </p>
              </div>

              {onStartExamWithQuestions && (
                <button
                  onClick={handleLaunchSimulator}
                  className="bg-[#0F52BA] hover:bg-[#0c4396] text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-soft flex items-center gap-2 self-start sm:self-auto shrink-0"
                >
                  <PlayIcon className="w-3.5 h-3.5 text-white" />
                  <span>Ir al Examen</span>
                </button>
              )}
            </div>

            <KineticReelPlayer
              title={guideMetadata.title}
              subject={guideMetadata.area || 'Diseño Integral'}
              videoSrc="/videos/mafe_teoria_diseno.mp4"
              onCtaClick={handleLaunchSimulator}
            />
          </div>
        )}

        {/* TAB 9: LABORATORIO DE ANIMACIONES Y MICRO-INTERACCIONES */}
        {activeTab === 'INTERACTIVE_LAB' && (
          <div className="space-y-6 max-w-4xl mx-auto py-2 animate-fadeIn">
            <InteractiveDesignPlayground />
          </div>
        )}

        {/* PILAR 7: BATERÍA DE AUTOEVALUACIÓN CERTIFICADA */}
        {activeTab === 'EVALUATION' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
              <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 shadow-[0_2px_14px_-2px_rgba(5,150,105,0.08)]">
                <h2 className="text-base font-bold text-slate-900">
                  7. Batería de Autoevaluación Certificada
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Preguntas de selección simple con justificación rigurosa (Concepto Fundamental + Demostración)
                </p>
              </div>

              {onStartExamWithQuestions && (
                <button
                  onClick={handleLaunchSimulator}
                  className="bg-[#0F52BA] hover:bg-[#0c4396] text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-soft flex items-center gap-2 shrink-0"
                >
                  <PlayIcon className="w-3.5 h-3.5 text-white" />
                  <span>Evaluar en Simulador</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {generatedQuestions?.map((q, idx) => {
                const isExpanded = expandedQuestionIdx === idx;

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono">
                        Pregunta #{idx + 1} • {q.tema || guideMetadata.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {q.area || guideMetadata.area}
                      </span>
                    </div>

                    <div
                      className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug font-sans"
                      dangerouslySetInnerHTML={{
                        __html: renderLatex(q.pregunta),
                      }}
                    />

                    {/* Opciones de Selección Simple */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.opciones.map((opt, oIdx) => {
                        const isCorrect = opt.trim() === q.correcta.trim();
                        return (
                          <div
                            key={oIdx}
                            className={`p-3 rounded-xl border text-xs font-sans flex items-start gap-2 ${
                              isCorrect
                                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-medium'
                                : 'bg-slate-50/50 border-slate-200/70 text-slate-700'
                            }`}
                          >
                            <span className="font-mono font-bold uppercase shrink-0">
                              {String.fromCharCode(65 + oIdx)})
                            </span>
                            <div
                              className="flex-1"
                              dangerouslySetInnerHTML={{
                                __html: renderLatex(opt),
                              }}
                            />
                            {isCorrect && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md shrink-0">
                                Correcta
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Botón para Desplegar Justificación Estricta */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() =>
                          setExpandedQuestionIdx(isExpanded ? null : idx)
                        }
                        className="text-xs text-[#0F52BA] hover:text-[#0c4396] font-bold flex items-center gap-1"
                      >
                        <span>{isExpanded ? 'Ocultar Justificación' : 'Ver Justificación Formal'}</span>
                        <span>{isExpanded ? '▲' : '▼'}</span>
                      </button>

                      <span className="text-[10px] font-mono text-slate-400">
                        Estructura: Concepto + Demostración
                      </span>
                    </div>

                    {/* Justificación Formateada */}
                    {isExpanded && (
                      <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-200 text-xs text-slate-700 space-y-2 animate-fadeIn font-sans leading-relaxed">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: renderLatex(q.justificacion),
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. PIE DE ACCIONES DE LA GUÍA (Visible en pantallas medianas/grandes para no sobrecargar móvil) */}
      <div className="hidden sm:flex p-3.5 bg-slate-50/90 border-t border-slate-200/80 items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <BookOpenIcon className="w-4 h-4 text-[#0F52BA]" />
          <span>Guía guardada y persistida en tu centro de estudio</span>
        </div>

        {onStartExamWithQuestions && (
          <button
            onClick={handleLaunchSimulator}
            className="bg-[#0F52BA] hover:bg-[#0c4396] text-white text-xs font-bold py-1.5 px-4 rounded-xl shadow-soft transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <PlayIcon className="w-3.5 h-3.5 text-white" />
            <span>Simular Examen ({Math.max(totalQuestions, 10)} Preguntas)</span>
          </button>
        )}
      </div>
    </div>
  );
};
