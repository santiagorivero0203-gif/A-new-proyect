import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { VectorAndGraphInteractive } from './VectorAndGraphInteractive';
import { renderLatex } from '../../utils/latexRenderer';
import { BookOpenIcon, CheckCircleIcon, SparklesIcon } from '../common/Icons';

type SubjectFilter =
  | 'ALL'
  | 'CASTELLANO'
  | 'BIOLOGIA'
  | 'QUIMICA'
  | 'FISICA_BASICA'
  | 'FISICA_AVANZADA'
  | 'MATEMATICA_BASICA'
  | 'MATEMATICA_AVANZADA';

type GuideTab = 'TEORIA' | 'PRACTICA' | 'EXAMENES_PASADOS';

interface GuideDetail {
  id: number;
  subject: SubjectFilter;
  subjectLabel: string;
  badgeColor: string;
  title: string;
  targetProfiles: string[];
  level: string;
  summary: string;
  latexFormula?: string;
  // Pestaña 1: Teoría
  theoryContent: {
    overview: string;
    keyPoints: string[];
    latexExplanation?: string;
  };
  // Pestaña 2: Práctica / Ejercicios Resueltos
  practiceExercises: {
    question: string;
    steps: string[];
    solution: string;
    latex?: string;
  }[];
  // Pestaña 3: Exámenes Pasados
  pastExams: {
    source: string;
    year: string;
    question: string;
    solutionBrief: string;
  }[];
  // Espacio para Fase 3: Gemini AI
  aiSummarySnippet?: string;
}

import type { Question } from '../../types/exam.types';
import { geminiService } from '../../services/geminiService';

export interface AcademicGuidesViewProps {
  onStartExamWithQuestions?: (questions: Question[], title: string) => void;
}

export const AcademicGuidesView: React.FC<AcademicGuidesViewProps> = ({
  onStartExamWithQuestions,
}) => {
  const { user, academicProfile } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>('ALL');
  const [activeGuideModal, setActiveGuideModal] = useState<GuideDetail | null>(null);
  const [activeTab, setActiveTab] = useState<GuideTab>('TEORIA');

  const [aiSnippets, setAiSnippets] = useState<Record<number, { summary: string; questions: Question[] }>>({});
  const [isGeneratingAiFor, setIsGeneratingAiFor] = useState<number | null>(null);

  const handleGenerateAiSnippet = async (guide: GuideDetail) => {
    setIsGeneratingAiFor(guide.id);
    try {
      const mockDoc: any = {
        id: `guide-${guide.id}`,
        title: guide.title,
        description: guide.summary,
        file_path: '',
        file_type: 'application/pdf',
        tags: [guide.subjectLabel],
        storage_bucket: 'guides',
      };
      const res = await geminiService.analyzeDocument({
        document: mockDoc,
        profile: user?.academic_profile || 'santiago_fisica_ucv',
      });
      if (res.success && res.data) {
        setAiSnippets((prev) => ({
          ...prev,
          [guide.id]: {
            summary: res.data!.documentSummary,
            questions: res.data!.generatedQuestions || [],
          },
        }));
      }
    } finally {
      setIsGeneratingAiFor(null);
    }
  };

  const guidesCatalog: GuideDetail[] = [
    {
      id: 1,
      subject: 'CASTELLANO',
      subjectLabel: 'Castellano & Morfosintaxis',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      title: 'Morfosintaxis: La Oración Simple y Reglas de Concordancia',
      targetProfiles: ['andres_bachillerato_1'],
      level: '1er Año Bachillerato',
      summary: 'Reconocimiento del sintagma nominal (sujeto), sintagma verbal (predicado) y complementos oracionales.',
      theoryContent: {
        overview: 'La oración es la unidad lingüística mínima dotada de sentido completo e independencia sintáctica. Se estructura fundamentalmente en dos bloques:',
        keyPoints: [
          'Sintagma Nominal (Sujeto): Núcleo sustantivo o pronombre que realiza o experimenta la acción.',
          'Sintagma Verbal (Predicado): Núcleo verbal conjugado con sus complementos directo, indirecto y circunstanciales.',
          'Regla de Oro de Concordancia: El núcleo del sujeto y el verbo concuerdan obligatoriamente en número y persona.',
        ],
      },
      practiceExercises: [
        {
          question: 'Identifica el núcleo del sujeto en: "Los alumnos más estudiosos entregaron el informe ayer."',
          steps: [
            '1. Hallar el verbo principal: "entregaron" (3ra persona plural).',
            '2. Preguntar ¿Quiénes entregaron?: "Los alumnos más estudiosos".',
            '3. Identificar el sustantivo central: "alumnos".',
          ],
          solution: 'El núcleo del sujeto es "alumnos". Los términos "Los" y "más estudiosos" funcionan como modificadores.',
        },
      ],
      pastExams: [
        {
          source: 'Evaluación Diagnóstica Colegial',
          year: '2025',
          question: '¿Qué tipo de complemento verbal responde a la pregunta "¿A quién o para quién se destina la acción?"?',
          solutionBrief: 'Complemento Indirecto (CI). Ejemplo: "Andrés compró un libro a su hermano".',
        },
      ],
      aiSummarySnippet: '✦ IA Gemini Preparada: Generará automáticamente mapas conceptuales de oraciones compuestas en la Fase 3.',
    },
    {
      id: 2,
      subject: 'CASTELLANO',
      subjectLabel: 'Castellano & Razonamiento Verbal',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      title: 'Comprensión Lectora y Analogías Semánticas (Prueba OPSU/UCV)',
      targetProfiles: ['prima_bachillerato_5', 'mafe_diseno_ucab'],
      level: '5to Año / Pre-Universitario',
      summary: 'Estrategias de descarte rápido en relaciones analógicas horizontales, antonimia contextual y tesis central.',
      theoryContent: {
        overview: 'Las pruebas de admisión evalúan la capacidad de decodificar relaciones abstractas entre pares de vocablos.',
        keyPoints: [
          'Principio del Orden: Si el par base es CAUSA : EFECTO, la respuesta no puede ser EFECTO : CAUSA.',
          'Principio de Necesidad Lógica: Buscar el vínculo más estricto e inequívoco entre los términos.',
          'Nivel de campo semántico: Si hay dos opciones plausibles, la que pertenezca a la misma disciplina artística o técnica tiene prioridad.',
        ],
      },
      practiceExercises: [
        {
          question: 'Analizar: BRÚJULA : NAVEGANTE ::',
          steps: [
            '1. Definir vínculo: La brújula es el instrumento de orientación indispensable para el navegante.',
            '2. Cotejar: TELESCOPIO : ASTRÓNOMO :: Instrumento de observación para el astrónomo.',
          ],
          solution: 'Respuesta: TELESCOPIO : ASTRÓNOMO.',
        },
      ],
      pastExams: [
        {
          source: 'Prueba Interna UCV',
          year: '2024',
          question: 'TEXTO : BIBLIOTECA :: PINTURA : MUSEO. ¿Cuál es el tipo de relación analógica?',
          solutionBrief: 'Relación de OBJETO CULTURAL a LUGAR DE CONSERVACIÓN Y EXHIBICIÓN.',
        },
      ],
    },
    {
      id: 3,
      subject: 'BIOLOGIA',
      subjectLabel: 'Biología Celular',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'Organización Celular: Membrana, Mitocondrias y Cloroplastos',
      targetProfiles: ['andres_bachillerato_1'],
      level: '1er Año Bachillerato',
      summary: 'Diferencias anatómicas entre células animales y vegetales. Procesos de nutrición y síntesis energética.',
      theoryContent: {
        overview: 'La célula es la unidad morfológica y fisiológica de todo ser vivo según la Teoría Celular moderna.',
        keyPoints: [
          'Célula Animal: Posee centríolos, carece de pared celular rígida y plastidios.',
          'Célula Vegetal: Pared de celulosa, vacuola central voluminosa y cloroplastos para fotosíntesis.',
          'Mitocondria: Central energética donde se produce ATP vía ciclo de Krebs.',
        ],
      },
      practiceExercises: [
        {
          question: '¿Por qué las células vegetales conservan una forma poliédrica fija mientras las animales son maleables?',
          steps: [
            '1. Examinar la cubierta externa de ambas células.',
            '2. Identificar el polisacárido estructural: celulosa.',
          ],
          solution: 'Debido a la pared celular rígida compuesta de celulosa que envuelve la membrana plasmática vegetal.',
        },
      ],
      pastExams: [
        {
          source: 'Olimpiadas de Biología Juveniles',
          year: '2023',
          question: '¿En qué organelo ocurre la síntesis de proteínas?',
          solutionBrief: 'En los ribosomas, ya sea libres en el citosol o adheridos al Retículo Endoplasmático Rugoso.',
        },
      ],
    },
    {
      id: 4,
      subject: 'QUIMICA',
      subjectLabel: 'Química General',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      title: 'Estequiometría de Reacción y Ley de Conservación de la Materia',
      targetProfiles: ['prima_bachillerato_5', 'santiago_fisica_ucv'],
      level: '5to Año / Admisión',
      summary: 'Balanceo por tanteo y redox, cálculo de masa molar, reactivo limitante y rendimiento porcentual.',
      latexFormula: '\\text{Masa de Reactivos} = \\text{Masa de Productos}',
      theoryContent: {
        overview: 'La ley de Lavoisier establece que en un sistema cerrado la masa total permanece invariable durante una transformación química.',
        keyPoints: [
          'Coeficientes estequiométricos: Indican la proporción molar en que reaccionan las especies.',
          'Número de Avogadro: 1 mol equivale a 6.022 × 10²³ partículas (átomos o moléculas).',
          'Reactivo Limitante: Sustancia que se consume totalmente primero y determina la cantidad máxima de producto.',
        ],
      },
      practiceExercises: [
        {
          question: 'Balancear la combustión completa del propano: C₃H₈ + O₂ → CO₂ + H₂O',
          steps: [
            '1. Balancear carbonos: 3 CO₂',
            '2. Balancear hidrógenos: 4 H₂O',
            '3. Contar oxígenos en productos: (3×2) + 4 = 10 átomos de O → 5 O₂',
          ],
          solution: 'Ecuación balanceada: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O',
          latex: '\\text{C}_3\\text{H}_8 + 5\\text{O}_2 \\longrightarrow 3\\text{CO}_2 + 4\\text{H}_2\\text{O}',
        },
      ],
      pastExams: [
        {
          source: 'Admisión Facultad de Ingeniería UCV',
          year: '2024',
          question: '¿Cuántos gramos de agua se producen al reaccionar 4 moles de H₂ con exceso de O₂?',
          solutionBrief: '2H₂ + O₂ → 2H₂O. 4 mol H₂ producen 4 mol H₂O. Masa molar H₂O = 18 g/mol. Masa = 4 × 18 = 72 gramos.',
        },
      ],
    },
    {
      id: 5,
      subject: 'FISICA_BASICA',
      subjectLabel: 'Física Básica',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      title: 'Cinemática: Movimiento Rectilíneo Uniformemente Variado (MRUV)',
      targetProfiles: ['prima_bachillerato_5', 'santiago_fisica_ucv'],
      level: 'Bachillerato & Admisión',
      summary: 'Análisis de vectores de posición, velocidad instantánea, aceleración constante y gráficos posición-tiempo.',
      latexFormula: 'v(t) = v_0 + at, \\quad x(t) = x_0 + v_0 t + \\frac{1}{2} at^2',
      theoryContent: {
        overview: 'El MRUV describe el movimiento de una partícula en línea recta bajo aceleración escalar constante.',
        keyPoints: [
          'La aceleración representa la tasa de cambio temporal de la velocidad: a = dv/dt.',
          'La gráfica v vs t es una recta cuya pendiente es igual a la aceleración.',
          'El área bajo la curva del gráfico v vs t corresponde al desplazamiento neto.',
        ],
      },
      practiceExercises: [
        {
          question: 'Un vehículo frena de 30 m/s a 10 m/s en un lapso de 4 segundos. Halla la aceleración y distancia recorrida.',
          steps: [
            '1. Aceleración: a = (v - v₀)/t = (10 - 30)/4 = -5 m/s² (desaceleración).',
            '2. Distancia: x = v₀t + 0.5 a t² = (30)(4) + 0.5(-5)(16) = 120 - 40 = 80 m.',
          ],
          solution: 'Aceleración = -5 m/s², Distancia recorrida = 80 metros.',
          latex: 'a = -5\\,\\text{m/s}^2, \\quad \\Delta x = 80\\,\\text{m}',
        },
      ],
      pastExams: [
        {
          source: 'Examen Oficial de Admisión',
          year: '2024',
          question: 'Si se lanza un objeto verticalmente hacia arriba en el vacío, ¿cuál es su aceleración en el punto más alto?',
          solutionBrief: 'Exactamente la aceleración de la gravedad g ≈ 9.8 m/s² dirigida hacia abajo.',
        },
      ],
    },
    {
      id: 6,
      subject: 'FISICA_AVANZADA',
      subjectLabel: 'Física Teórica & Analítica',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'Mecánica Analítica y Ecuaciones Canónicas de Hamilton',
      targetProfiles: ['santiago_fisica_ucv'],
      level: 'Licenciatura en Física (UCV)',
      summary: 'Transformación de Legendre, definición de momentos conjugados y dinámica en el espacio de fase.',
      latexFormula: '\\dot{q}_i = \\frac{\\partial \\mathcal{H}}{\\partial p_i}, \\quad \\dot{p}_i = -\\frac{\\partial \\mathcal{H}}{\\partial q_i}',
      theoryContent: {
        overview: 'La formulación hamiltoniana sustituye las velocidades generalizadas por los momentos conjugados en el espacio de fase.',
        keyPoints: [
          'Momento conjugado: pᵢ = ∂L/∂q̇ᵢ.',
          'Hamiltoniano: H(q, p, t) = Σ pᵢ q̇ᵢ - L(q, q̇, t). Para sistemas esclerónomos conservativos, H = T + V (energía total).',
          'Teorema de Liouville: La densidad del espacio de fase es constante a lo largo de las trayectorias dinámicas.',
        ],
      },
      practiceExercises: [
        {
          question: 'Derivar el Hamiltoniano para el oscilador armónico unidimensional libre.',
          steps: [
            '1. Lagrangiano: L = 0.5 m q̇² - 0.5 k q².',
            '2. Momento: p = ∂L/∂q̇ = m q̇ → q̇ = p/m.',
            '3. H = p q̇ - L = p(p/m) - (0.5 m (p/m)² - 0.5 k q²) = p²/(2m) + 0.5 k q².',
          ],
          solution: 'H(q, p) = p²/(2m) + 0.5 k q²',
          latex: '\\mathcal{H}(q, p) = \\frac{p^2}{2m} + \\frac{1}{2} k q^2',
        },
      ],
      pastExams: [
        {
          source: 'Examen de Mecánica Clásica UCV',
          year: '2023',
          question: 'Demostrar que dH/dt = ∂H/∂t a lo largo de las trayectorias de fase.',
          solutionBrief: 'Aplicando la regla de la cadena: dH/dt = Σ (∂H/∂q q̇ + ∂H/∂p ṗ) + ∂H/∂t. Por las ecuaciones de Hamilton, los dos primeros términos se cancelan mutuamente.',
        },
      ],
    },
    {
      id: 7,
      subject: 'MATEMATICA_BASICA',
      subjectLabel: 'Matemática Básica',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      title: 'Fracciones Equivalentes y Despeje de Ecuaciones Lineales',
      targetProfiles: ['andres_bachillerato_1'],
      level: '1er Año Bachillerato',
      summary: 'Operaciones fundamentales con números racionales, mínimo común múltiplo y resolución de ecuaciones.',
      latexFormula: '\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{ad \\pm bc}{bd}',
      theoryContent: {
        overview: 'Las fracciones representan partes iguales de una unidad entera y admiten simplificación mediante su máximo común divisor.',
        keyPoints: [
          'Fracciones equivalentes: Se obtienen multiplicando o dividiendo numerador y denominador por un mismo número distinto de cero.',
          'Operaciones combinadas: Respetar la jerarquía PEMDAS (Paréntesis, Exponentes, Multiplicación, División, Suma, Resta).',
        ],
      },
      practiceExercises: [
        {
          question: 'Resolver: (3/4) + (2/5) - (1/2)',
          steps: [
            '1. M.C.M de los denominadores (4, 5, 2) = 20.',
            '2. Convertir: (15/20) + (8/20) - (10/20).',
            '3. Operar numeradores: (15 + 8 - 10) / 20 = 13/20.',
          ],
          solution: 'Resultado: 13/20.',
          latex: '\\frac{3}{4} + \\frac{2}{5} - \\frac{1}{2} = \\frac{15 + 8 - 10}{20} = \\frac{13}{20}',
        },
      ],
      pastExams: [
        {
          source: 'Prueba Trimestral Secundaria',
          year: '2024',
          question: 'Despejar x en: 3x - 5 = 16',
          solutionBrief: '3x = 16 + 5 → 3x = 21 → x = 7.',
        },
      ],
    },
    {
      id: 8,
      subject: 'MATEMATICA_AVANZADA',
      subjectLabel: 'Matemática con Vectores',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      title: 'Espacios Vectoriales en ℝ², Producto Escalar y Gráficas',
      targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
      level: 'Pre-Universitario & UCV',
      summary: 'Álgebra vectorial en dos dimensiones, condiciones de ortogonalidad, norma euclidiana y graficación en el plano.',
      latexFormula: '\\vec{u} \\cdot \\vec{v} = u_x v_x + u_y v_y = ||\\vec{u}|| ||\\vec{v}|| \\cos(\\theta)',
      theoryContent: {
        overview: 'Los vectores son entes geométricos definidos por magnitud, dirección y sentido fundamentales para la física.',
        keyPoints: [
          'Norma de un vector: Longitud euclidiana ||u|| = √(u_x² + u_y²).',
          'Vectores ortogonales: Dos vectores no nulos son perpendiculares si y solo si su producto escalar es cero.',
          'Proyección ortogonal: Componente de un vector en la dirección de otro.',
        ],
      },
      practiceExercises: [
        {
          question: 'Determinar el valor de k para que u = (2, k) y v = (6, -4) sean ortogonales.',
          steps: [
            '1. Condición de ortogonalidad: u · v = 0.',
            '2. u · v = (2)(6) + (k)(-4) = 12 - 4k = 0.',
            '3. 4k = 12 → k = 3.',
          ],
          solution: 'k = 3 para que los vectores sean perpendiculares.',
          latex: '\\vec{u} \\cdot \\vec{v} = 12 - 4k = 0 \\implies k = 3',
        },
      ],
      pastExams: [
        {
          source: 'Admisión Ciencias UCV',
          year: '2024',
          question: 'Si ||u|| = 5, ||v|| = 4 y el ángulo entre ellos es 60°, calcula u · v.',
          solutionBrief: 'u · v = ||u|| ||v|| cos(60°) = (5)(4)(0.5) = 10.',
        },
      ],
    },
  ];

  const filteredGuides = guidesCatalog.filter((g) => {
    if (selectedSubject === 'ALL') return true;
    return g.subject === selectedSubject;
  });

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold mb-2">
            <BookOpenIcon className="w-3.5 h-3.5" />
            Sistema Interactivo de Guías • GuidesEngine
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
            Temarios de Estudio & Ejercicios Resueltos
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl">
            Cada guía cuenta con pestañas de Teoría Conceptual, Práctica con soluciones paso a paso y Exámenes Pasados reales.
          </p>
        </div>

        <span className="text-xs font-mono text-slate-400">
          Estudiante: {user?.full_name}
        </span>
      </div>

      {/* Laboratorio Matemático de Vectores y Gráficas */}
      <VectorAndGraphInteractive />

      {/* Filtros por Materia */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Área de Estudio
        </p>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'ALL', label: 'Todas' },
            { id: 'CASTELLANO', label: 'Castellano' },
            { id: 'BIOLOGIA', label: 'Biología' },
            { id: 'QUIMICA', label: 'Química' },
            { id: 'FISICA_BASICA', label: 'Física Básica' },
            { id: 'FISICA_AVANZADA', label: 'Física Avanzada' },
            { id: 'MATEMATICA_BASICA', label: 'Matemática Básica' },
            { id: 'MATEMATICA_AVANZADA', label: 'Matemática con Vectores' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSubject(item.id as SubjectFilter)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                selectedSubject === item.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-soft-sm font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Catálogo de Guías */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGuides.map((guide) => {
          const isRecommended = guide.targetProfiles.includes(academicProfile);
          return (
            <div
              key={guide.id}
              className={`app-card p-5 flex flex-col justify-between hover:border-blue-400 transition-all ${
                isRecommended ? 'ring-2 ring-blue-500/20' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${guide.badgeColor}`}>
                    {guide.subjectLabel}
                  </span>
                  {isRecommended && (
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      ★ Tu Nivel
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{guide.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{guide.summary}</p>
                </div>

                {guide.latexFormula && (
                  <div
                    className="p-2.5 bg-slate-50 border border-slate-200/60 rounded-xl text-center text-xs font-serif text-slate-800"
                    dangerouslySetInnerHTML={{ __html: renderLatex(guide.latexFormula, true) }}
                  />
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  3 Secciones • {guide.practiceExercises.length} Ejercicios
                </span>
                <button
                  onClick={() => {
                    setActiveGuideModal(guide);
                    setActiveTab('TEORIA');
                  }}
                  className="btn-primary text-xs py-1.5 px-3.5"
                >
                  Abrir Guía
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Interactivo de Guía con 3 Pestañas */}
      {activeGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-soft-lg space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Header del Modal */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${activeGuideModal.badgeColor}`}>
                  {activeGuideModal.subjectLabel}
                </span>
                <span className="text-xs text-slate-400 font-mono">{activeGuideModal.level}</span>
              </div>
              <button
                onClick={() => setActiveGuideModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">{activeGuideModal.title}</h2>
              <p className="text-xs text-slate-500 mt-1">{activeGuideModal.summary}</p>
            </div>

            {/* Pestañas Internas de la Guía: Teoría | Práctica | Exámenes Pasados */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
              <button
                onClick={() => setActiveTab('TEORIA')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'TEORIA' ? 'bg-white text-slate-900 shadow-soft-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                1. Teoría Conceptual
              </button>
              <button
                onClick={() => setActiveTab('PRACTICA')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'PRACTICA' ? 'bg-white text-slate-900 shadow-soft-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                2. Ejercicios Resueltos
              </button>
              <button
                onClick={() => setActiveTab('EXAMENES_PASADOS')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'EXAMENES_PASADOS' ? 'bg-white text-slate-900 shadow-soft-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                3. Exámenes Pasados
              </button>
            </div>

            {/* Contenido Pestaña 1: TEORÍA */}
            {activeTab === 'TEORIA' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Fundamento Teórico</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activeGuideModal.theoryContent.overview}
                  </p>
                </div>

                {activeGuideModal.latexFormula && (
                  <div
                    className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center text-slate-900 font-serif"
                    dangerouslySetInnerHTML={{ __html: renderLatex(activeGuideModal.latexFormula, true) }}
                  />
                )}

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Puntos Clave:</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {activeGuideModal.theoryContent.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Contenido Pestaña 2: PRÁCTICA */}
            {activeTab === 'PRACTICA' && (
              <div className="space-y-4">
                {activeGuideModal.practiceExercises.map((ex, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                    <h4 className="text-sm font-bold text-slate-900">
                      Ejercicio #{idx + 1}: {ex.question}
                    </h4>

                    {ex.latex && (
                      <div
                        className="p-3 bg-white rounded-xl border border-slate-200 text-center font-serif text-xs text-slate-800"
                        dangerouslySetInnerHTML={{ __html: renderLatex(ex.latex, true) }}
                      />
                    )}

                    <div className="space-y-1 text-xs text-slate-600 font-mono">
                      <p className="font-bold text-slate-700">Procedimiento Paso a Paso:</p>
                      {ex.steps.map((s, stepIdx) => (
                        <p key={stepIdx} className="pl-2">• {s}</p>
                      ))}
                    </div>

                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium">
                      <strong>Respuesta Concluida:</strong> {ex.solution}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Contenido Pestaña 3: EXÁMENES PASADOS */}
            {activeTab === 'EXAMENES_PASADOS' && (
              <div className="space-y-4">
                {activeGuideModal.pastExams.map((pe, idx) => (
                  <div key={idx} className="p-4 bg-purple-50/40 rounded-2xl border border-purple-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-purple-700">{pe.source}</span>
                      <span className="font-mono text-slate-400">Año {pe.year}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-900">{pe.question}</p>
                    <div className="p-2.5 bg-white rounded-xl border border-purple-100 text-xs text-slate-600">
                      <strong>Solución Oficial:</strong> {pe.solutionBrief}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Asistente Inteligente Google Gemini (Fase 3 Activa) */}
            <div className="p-4 bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 border border-blue-200/90 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                  <SparklesIcon className="w-4 h-4 text-blue-600" />
                  <span>Asistente Gemini 2.5: Síntesis Dinámica para {user?.full_name || 'Estudiante'}</span>
                </span>
                <span className="font-mono font-bold text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  IA Activa
                </span>
              </div>

              {aiSnippets[activeGuideModal.id] ? (
                <div className="p-3 bg-white rounded-xl border border-blue-200/80 text-xs text-slate-700 space-y-2 animate-fadeIn">
                  <p className="leading-relaxed font-sans">
                    {aiSnippets[activeGuideModal.id].summary}
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">
                      Enfoque adaptado para {user?.academic_profile.replace(/_/g, ' ')}
                    </span>
                    {onStartExamWithQuestions && aiSnippets[activeGuideModal.id].questions.length > 0 && (
                      <button
                        onClick={() => {
                          const item = aiSnippets[activeGuideModal.id];
                          onStartExamWithQuestions(
                            item.questions,
                            `Práctica IA: ${activeGuideModal.title}`
                          );
                          setActiveGuideModal(null);
                        }}
                        className="btn-primary text-[11px] py-1.5 px-3 flex items-center gap-1"
                      >
                        <SparklesIcon className="w-3 h-3 text-blue-400" />
                        <span>Practicar {aiSnippets[activeGuideModal.id].questions.length} Preguntas</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-600">
                    Genera una síntesis ultra-condensada y preguntas de práctica adaptadas a tu nivel académico.
                  </p>
                  <button
                    disabled={isGeneratingAiFor === activeGuideModal.id}
                    onClick={() => handleGenerateAiSnippet(activeGuideModal)}
                    className="btn-brand text-xs py-1.5 px-3.5 shrink-0 flex items-center gap-1.5"
                  >
                    <SparklesIcon className="w-3.5 h-3.5" />
                    <span>
                      {isGeneratingAiFor === activeGuideModal.id ? 'Generando...' : 'Generar Síntesis IA'}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Footer del Modal */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Modo de Aprendizaje Activo</span>
              <button
                onClick={() => setActiveGuideModal(null)}
                className="btn-primary text-xs"
              >
                Cerrar Guía
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
