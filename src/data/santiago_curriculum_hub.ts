/**
 * @file santiago_curriculum_hub.ts
 * @description Centro Oficial de Contenidos Académicos para Santiago Rivero
 * (Facultad de Ciencias · Escuela de Física · Universidad Central de Venezuela - UCV).
 *
 * Arquitectura modular y escalable para el PRIMER SEMESTRE (Semestre I):
 * 1. Materias Oficiales de la Escuela de Física UCV (Pensum 2023):
 *    - Matemática I (Cátedra Pedro Alson · Métodos de Graficación) [5 créditos]
 *    - Principios de Química I (Código 3401 · Escuela de Química UCV) [5 créditos]
 *    - Física I (Mecánica Clásica · Escuela de Física UCV) [5 créditos]
 *    - Laboratorio I de Física (Metrología, Incertidumbres y Riel de Aire) [3 créditos]
 * 2. Calendario de Evaluaciones Base (Parciales, Talleres e Informes de Laboratorio)
 *    con enlace a Guía Deconstruida, Recursos Multimedia y Prompt de Investigación
 * 3. Tareas y Sesiones de Estudio con Backward Scheduling (Alertas escalonadas de 10, 7 y 3 días)
 * 4. Veinte Guías Académicas Deconstruidas en 7 Pilares (`SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES`)
 * 5. Banco de Reactivos Calibrados para Nivel Universitario Semestre I (`SANTIAGO_SEMESTER_1_QUESTIONS`)
 * 6. Modelos de Examen Preconfigurados (`SANTIAGO_SEMESTER_1_TAILORED_EXAMS`)
 * 7. Motor de Ingesta Dinámica (`ingestSantiagoSemester1Data`)
 */

import type { Question } from '../types/exam.types';
import type { DeconstructedAcademicGuide } from '../types/deconstruction.types';
import type { EvaluationEvent, StudyReminder } from '../types/academicPlanner.types';
import { SANTIAGO_RESEARCH_PROMPTS } from './santiago_prompts';
import { SANTIAGO_MULTIMEDIA_CATALOG } from './santiago_multimedia';
export { SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES } from './santiago_guides';

export const SANTIAGO_PROFILE = 'santiago_fisica_ucv' as const;


// =====================================================================
// 1. MATERIAS OFICIALES DEL PRIMER SEMESTRE (PENSUM FÍSICA UCV 2023)
// =====================================================================
export interface SantiagoSemesterSubject {
  code: string;
  name: string;
  department: string;
  credits: number;
  description: string;
  typicalEvalStructure: string;
}

export const SANTIAGO_SEMESTER_1_SUBJECTS: SantiagoSemesterSubject[] = [
  {
    code: 'MAT-1101',
    name: 'Matemática I (Pedro Alson · Métodos de Graficación)',
    department: 'Departamento de Matemáticas · Facultad de Ciencias UCV',
    credits: 5,
    description:
      'Estudio geométrico de curvas continuas, monotonía y cotas, operaciones con curvas (suma, producto, recíproca 1/f y composición con la bisectriz y = x), modelo teclas y pantallas de Alson, linealización de diagramas por completación de cuadrados, soluciones múltiples de ecuaciones no lineales, familias de hipérbolas homográficas canónicas v + k/(x - h), inecuaciones gráficas sobre el eje real, límites visuales y trazado cualitativo de la función derivada f prime (x).',
    typicalEvalStructure: '3 Parciales (25% c/u) + Taller de Graficación y Operaciones (15%) + Quices (10%).',
  },
  {
    code: 'QGI-3401',
    name: 'Principios de Química I',
    department: 'Escuela de Química · Instituto de Ciencias de la Tierra UCV',
    credits: 5,
    description:
      'Propiedades de la materia y medidas, análisis dimensional y cifras significativas en densidad, leyes ponderales e isótopos, mecánica cuántica (Planck, Bohr, de Broglie, Heisenberg), los 4 números cuánticos y configuraciones electrónicas (Aufbau, Pauli, Hund con anomalías de Cr/Cu), tendencias periódicas y carga nuclear efectiva Z_ef, enlace iónico y ciclo de Born-Haber, estructuras de Lewis y octeto expandido, modelo TRPEV/VSEPR y polaridad molecular, estequiometría de reacción (mol, reactivo limitante y rendimiento), reacciones acuosas de precipitación y redox ion-electrón, leyes de los gases y recolección sobre agua, y disoluciones ideales con propiedades coligativas.',
    typicalEvalStructure: '3 Parciales (25% c/u) + Informe de Laboratorio (15%) + Quices de Entrada (10%).',
  },
  {
    code: 'FIS-1101',
    name: 'Física I (Mecánica Clásica)',
    department: 'Escuela de Física · Departamento de Física Aplicada y Teórica UCV',
    credits: 5,
    description:
      'Cinemática vectorial en tres dimensiones, vector de posición, velocidad tangente, aceleración intrínseca (tangencial y centrípeta), radio de curvatura y tiro parabólico, leyes de Newton, diagramas de cuerpo libre (DCL), dinámica con fricción estática y cinética en planos inclinados, peralte de curvas, trabajo mecánico por integral de línea, teorema de las fuerzas vivas, fuerzas conservativas, energía potencial gravitatoria y elástica, conservación de la energía mecánica y disipación por fricción.',
    typicalEvalStructure: '3 Parciales (25% c/u) + Taller / Proyecto Mecánico (15%) + Quices (10%).',
  },
  {
    code: 'FIS-1104',
    name: 'Laboratorio I de Física',
    department: 'Laboratorios Docentes de Física · Pabellón 2 UCV',
    credits: 3,
    description:
      'Instrumentación metrológica (calibrador vernier, tornillo micrométrico, cronómetros digitales y fotoceldas), teoría de medición y cifras significativas, propagación de incertidumbres sistemáticas y aleatorias por Gauss, ajuste lineal por mínimos cuadrados y redacción formal de informes científicos.',
    typicalEvalStructure: 'Informe #1 Densidades (25%) + Informe #2 Riel de Aire (25%) + Examen Práctico en Estaciones (30%) + Quices de Entrada (20%).',
  },
];

// =====================================================================
// 2. CALENDARIO DE EVALUACIONES ENRIQUECIDO CON GUÍAS, MULTIMEDIA Y PROMPTS
// =====================================================================
export const SANTIAGO_SEMESTER_1_DEFAULT_EVALUATIONS: EvaluationEvent[] = [
  // --- MATEMÁTICA I (PEDRO ALSON) ---
  {
    id: 'santiago-mat1-parcial-1',
    title: 'Primer Parcial de Matemática I: Estudio de Curvas & Soluciones Múltiples',
    subject: 'Matemática',
    date: '2026-11-25',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Facultad de Ciencias UCV · Aula 104',
    topics: [
      'Estudio geométrico de curvas continuas',
      'Monotonía, intervalos de crecimiento y cotas',
      'Caminos de ida y caminos de vuelta en el plano',
      'Soluciones múltiples de ecuaciones no lineales y trigonométricas',
    ],
    notes: 'Examen canónico del Prof. Pedro Alson (Editorial ERRO). Traer lápices y regla.',
    guideId: 'santiago-mat1-curvas-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-mat1-curvas'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-curvas'],
  },
  {
    id: 'santiago-mat1-taller-operaciones',
    title: 'Taller de Matemática I: Operaciones con Curvas, Recíproca y Composición',
    subject: 'Matemática',
    date: '2026-12-09',
    time: '10:00 AM',
    type: 'TALLER',
    weightPercentage: 15,
    location: 'Facultad de Ciencias UCV · Aula 104',
    topics: [
      'Suma y resta gráfica de curvas por ordenadas',
      'Curva recíproca 1/f(x) y polos asintóticos',
      'Producto geométrico de curvas y análisis de signos',
      'Composición gráfica mediante el camino de la bisectriz y = x',
    ],
    notes: 'Taller práctico individual con trazado limpio a mano alzada.',
    guideId: 'santiago-mat1-operaciones-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-mat1-operaciones'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-operaciones'],
  },
  {
    id: 'santiago-mat1-parcial-2',
    title: 'Segundo Parcial de Matemática I: Teclas, Hipérbolas Homográficas e Inecuaciones',
    subject: 'Matemática',
    date: '2027-01-13',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Facultad de Ciencias UCV · Aula 104',
    topics: [
      'Modelo de teclas y pantallas y linealización por completación de cuadrados',
      'Descomposición canónica de hipérbolas homográficas v + k/(x - h)',
      'Familias de rectas secantes y áreas triangulares bajo curvas',
      'Resolución visual de inecuaciones f(x) >= g(x) y transformadas con módulo |f(x)|',
    ],
    notes: 'Problema clásico de 6 puntos de hipérbola homográfica con recta.',
    guideId: 'santiago-mat1-rectas-hiperbolas-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-mat1-rectas-hiperbolas'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-inecuaciones'],
  },
  {
    id: 'santiago-mat1-parcial-3',
    title: 'Tercer Parcial de Matemática I: Límites, Derivadas y Graficación de f prime (x)',
    subject: 'Matemática',
    date: '2027-02-03',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Facultad de Ciencias UCV · Aula 104',
    topics: [
      'Definición geométrica de límites y tipos de discontinuidades',
      'Recta tangente y razón de cambio instantánea',
      'Trazado cualitativo de la función derivada f prime a partir de f',
      'Puntos de inflexión y análisis de concavidad',
    ],
    notes: 'Evaluación final de la cátedra de Pedro Alson.',
    guideId: 'santiago-mat1-limites-derivadas-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-mat1-limites-derivadas'],
  },

  // --- PRINCIPIOS DE QUÍMICA I (CÓDIGO 3401) ---
  {
    id: 'santiago-qgi-parcial-1',
    title: 'Primer Parcial de Principios de Química I: Materia, Cuántica y Tabla Periódica',
    subject: 'Química',
    date: '2026-11-27',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Facultad de Ciencias UCV · Aula 201',
    topics: [
      'Propiedades de la materia, análisis dimensional y cifras significativas',
      'Leyes ponderales, modelos atómicos e isótopos',
      'Cuantización de Planck, modelo de Bohr y números cuánticos (n, l, ml, ms)',
      'Configuraciones electrónicas (Aufbau, Pauli, Hund) y anomalías de Cr/Cu',
      'Tendencias periódicas, carga nuclear efectiva Z_ef y radios',
    ],
    notes: 'Llevar tabla periódica oficial limpia y calculadora científica.',
    guideId: 'santiago-qgi-cuantica-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-qgi-cuantica'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-medidas'],
  },
  {
    id: 'santiago-qgi-informe-1',
    title: 'Informe de Laboratorio de Química: Medidas de Densidad y Cifras Significativas',
    subject: 'Química',
    date: '2026-12-02',
    time: '02:00 PM',
    type: 'TALLER',
    weightPercentage: 15,
    location: 'Laboratorios Docentes de Química · Pabellón 1 UCV',
    topics: [
      'Pesadas en balanza analítica y lectura de probetas',
      'Determinación de densidad de sólidos por desplazamiento de agua',
      'Propagación estricta de cifras significativas',
      'Identificación de metales por comparación con densidades teóricas',
    ],
    notes: 'Entrega de informe formal según normas del departamento.',
    guideId: 'santiago-qgi-propiedades-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-qgi-propiedades'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-medidas'],
  },
  {
    id: 'santiago-qgi-parcial-2',
    title: 'Segundo Parcial de Principios de Química I: Enlace Químico, TRPEV y Estequiometría',
    subject: 'Química',
    date: '2027-01-08',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Facultad de Ciencias UCV · Aula 201',
    topics: [
      'Enlace iónico, energía reticular y ciclo de Born-Haber',
      'Estructuras de Lewis, carga formal, resonancia y octeto expandido',
      'Geometría molecular TRPEV/VSEPR, distorsión angular y polaridad',
      'Hibridación de orbitales (sp, sp2, sp3, sp3d, sp3d2)',
      'Estequiometría de reacción, reactivo limitante, pureza y rendimiento',
    ],
    notes: 'Dominio absoluto de Lewis y balance de masas mol-mol.',
    guideId: 'santiago-qgi-estequiometria-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-qgi-estequiometria'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-estequiometria'],
  },
  {
    id: 'santiago-qgi-parcial-3',
    title: 'Tercer Parcial de Principios de Química I: Reacciones Acuosas, Redox, Gases y Coligativas',
    subject: 'Química',
    date: '2027-01-27',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Facultad de Ciencias UCV · Aula 201',
    topics: [
      'Reglas de solubilidad y ecuaciones iónicas netas',
      'Balanceo redox por ion-electrón en medio ácido y básico',
      'Titulaciones volumétricas ácido-base y punto de equivalencia',
      'Leyes de los gases, PV = nRT, presiones parciales de Dalton sobre agua',
      'Disoluciones ideales, concentraciones (M, m, X) y propiedades coligativas con van t Hoff',
    ],
    notes: 'Examen de alta densidad cuantitativa. Traer calculadora.',
    guideId: 'santiago-qgi-disoluciones-reacciones-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-qgi-disoluciones-reacciones'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-disoluciones'],
  },

  // --- FÍSICA I (MECÁNICA CLÁSICA) ---
  {
    id: 'santiago-fis1-parcial-1',
    title: 'Primer Parcial de Física I: Cinemática Vectorial ℝ³ y Triedro Intrínseco',
    subject: 'Física',
    date: '2026-11-20',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Facultad de Ciencias UCV · Aula Magna / Aula 201',
    topics: [
      'Cinemática diferencial en ℝ³',
      'Aceleración tangencial y normal o centrípeta',
      'Radio de curvatura y círculo osculador',
      'Tiro parabólico con análisis paramétrico',
    ],
    notes: 'Llevar calculadora científica y formulario oficial rubricado.',
    guideId: 'santiago-fis1-kinematics-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-kinematics'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-lab1-airtrack'],
  },
  {
    id: 'santiago-fis1-parcial-2',
    title: 'Segundo Parcial de Física I: Leyes de Newton, Dinámica y Fricción',
    subject: 'Física',
    date: '2026-12-18',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Facultad de Ciencias UCV · Aula 201',
    topics: [
      'Diagramas de cuerpo libre (DCL) en sistemas conectados',
      'Fricción estática máxima vs fricción cinética',
      'Planos inclinados con ligaduras de cuerdas y poleas',
      'Dinámica del movimiento circular y peralte de curvas',
    ],
    notes: 'Aislamiento de cada masa y alineación de ejes con la aceleración.',
    guideId: 'santiago-fis1-dynamics-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-dynamics'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-fis1-newton'],
  },
  {
    id: 'santiago-fis1-parcial-3',
    title: 'Tercer Parcial de Física I: Trabajo, Energía Mecánica y Conservación',
    subject: 'Física',
    date: '2027-01-29',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Facultad de Ciencias UCV · Aula 201',
    topics: [
      'Integral de línea para el trabajo mecánico',
      'Teorema de las fuerzas vivas (W_neto = Delta K)',
      'Fuerzas conservativas y energía potencial gravitatoria y elástica',
      'Disipación mecánica por trabajo de fricción no conservativo',
    ],
    notes: 'Último parcial ordinario antes del cierre de actas.',
    guideId: 'santiago-fis1-energy-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-energy'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-fis1-energia'],
  },
  {
    id: 'santiago-lab1-informe-1',
    title: 'Informe #1 de Lab Física: Medición de Densidad y Propagación de Incertidumbres',
    subject: 'Física',
    date: '2026-11-16',
    time: '02:00 PM',
    type: 'TALLER',
    weightPercentage: 25,
    location: 'Laboratorio Docente de Física I · Pabellón 2',
    topics: [
      'Calibrador vernier y tornillo micrométrico',
      'Apreciación instrumental y error aleatorio',
      'Propagación en cuadratura de Gauss',
      'Redondeo formal de cifras significativas',
    ],
    notes: 'Entrega formal impresa en formato de paper científico.',
    guideId: 'santiago-fis1-kinematics-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-kinematics'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-lab1-density'],
  },
  {
    id: 'santiago-lab1-informe-2',
    title: 'Informe #2 de Lab Física: Cinemática en Riel de Aire y Mínimos Cuadrados',
    subject: 'Física',
    date: '2026-12-14',
    time: '02:00 PM',
    type: 'TALLER',
    weightPercentage: 25,
    location: 'Laboratorio Docente de Física I · Pabellón 2',
    topics: [
      'Fotoceldas en riel de aire',
      'Regresión lineal por mínimos cuadrados y coeficiente R²',
      'Linealización cuadrática de posición vs tiempo²',
      'Determinación experimental de g en Caracas',
    ],
    notes: 'Incluir barras de error experimentales en las gráficas.',
    guideId: 'santiago-fis1-kinematics-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-kinematics'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-lab1-airtrack'],
  },
];

// =====================================================================
// 3. RECORDATORIOS DE ESTUDIO CON BACKWARD SCHEDULING (10, 7, 3 DÍAS)
// =====================================================================
export const SANTIAGO_SEMESTER_1_DEFAULT_REMINDERS: StudyReminder[] = [
  {
    id: 'rem-santiago-sem1-01',
    title: 'Repaso intensivo de Cinemática ℝ³ (10 días antes del Parcial 1 de Física I)',
    subject: 'Física',
    dueDate: '2026-11-10',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-02',
    title: 'Revisión de cálculos del Informe #1 de Física (Densidad e Incertidumbres de Gauss)',
    subject: 'Física',
    dueDate: '2026-11-14',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-03',
    title: 'Resolver batería de Estudio de Curvas y Caminos de Ida/Vuelta (Matemática I)',
    subject: 'Matemática',
    dueDate: '2026-11-18',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-04',
    title: 'Práctica de números cuánticos y configuraciones de Cr/Cu (Química I)',
    subject: 'Química',
    dueDate: '2026-11-20',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-05',
    title: 'Regresión lineal por mínimos cuadrados para el Informe #2 de Riel de Aire',
    subject: 'Física',
    dueDate: '2026-12-11',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-06',
    title: 'Práctica de DCL con fricción estática máxima para Parcial 2 de Física I',
    subject: 'Física',
    dueDate: '2026-12-15',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-07',
    title: 'Cuadros ICF de Reactivo Limitante y Estructuras de Lewis TRPEV (Química I)',
    subject: 'Química',
    dueDate: '2027-01-04',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-08',
    title: 'División polinómica de Hipérbolas Canónicas e Inecuaciones Gráficas (Matemática I)',
    subject: 'Matemática',
    dueDate: '2027-01-09',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-09',
    title: 'Balanceo Redox por Ion-Electrón en medio ácido y gases sobre agua (Química I)',
    subject: 'Química',
    dueDate: '2027-01-23',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-10',
    title: 'Trazado cualitativo de la función derivada f prime a partir de f (Matemática I)',
    subject: 'Matemática',
    dueDate: '2027-01-30',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
];

// =====================================================================
// 4. BANCO DE REACTIVOS CALIBRADOS PARA PRIMER SEMESTRE UCV
// =====================================================================
export { SANTIAGO_SEMESTER_1_QUESTIONS } from './santiago_questions';

// =====================================================================
// 5. MODELOS DE EXAMEN PRECONFIGURADOS PARA PRIMER SEMESTRE UCV
// =====================================================================
export const SANTIAGO_SEMESTER_1_TAILORED_EXAMS = [
  {
    id: 'exam-santiago-sem1-mat1-parcial1',
    profileId: SANTIAGO_PROFILE,
    title: 'Matemática I · Parcial 1: Estudio de Curvas & Soluciones Múltiples',
    subtitle: 'Facultad de Ciencias UCV · Cátedra Pedro Alson',
    durationMinutes: 60,
    questionCount: 6,
    badge: 'Matemática I UCV',
    colorScheme: 'indigo' as const,
    description:
      'Caminos de ida y vuelta, monotonía estricta, cotas superiores e inferiores, curva recíproca 1/f y conteo visual de soluciones en ecuaciones no lineales.',
    targetSubject: 'Matemática' as const,
    targetTopicKeyword: 'Curvas',
  },
  {
    id: 'exam-santiago-sem1-mat1-parcial2',
    profileId: SANTIAGO_PROFILE,
    title: 'Matemática I · Parcial 2: Hipérbolas Homográficas & Inecuaciones',
    subtitle: 'Facultad de Ciencias UCV · Cátedra Pedro Alson',
    durationMinutes: 60,
    questionCount: 6,
    badge: 'Matemática I UCV',
    colorScheme: 'indigo' as const,
    description:
      'Descomposición de hipérbolas canónicas v + k/(x - h), familias de rectas, áreas de triángulos bajo curvas e inecuaciones gráficas con módulo.',
    targetSubject: 'Matemática' as const,
    targetTopicKeyword: 'Hipérbolas',
  },
  {
    id: 'exam-santiago-sem1-qgi-parcial1',
    profileId: SANTIAGO_PROFILE,
    title: 'Principios de Química I · Parcial 1: Cuántica, Configuración & Tabla',
    subtitle: 'Facultad de Ciencias UCV · Escuela de Química (Código 3401)',
    durationMinutes: 60,
    questionCount: 6,
    badge: 'Química I UCV',
    colorScheme: 'indigo' as const,
    description:
      'Cifras significativas y densidad, números cuánticos, reglas de Aufbau y Hund con anomalías de Cr/Cu, y carga nuclear efectiva Z_ef en series isoelectrónicas.',
    targetSubject: 'Química' as const,
    targetTopicKeyword: 'Cuántica',
  },
  {
    id: 'exam-santiago-sem1-qgi-parcial2',
    profileId: SANTIAGO_PROFILE,
    title: 'Principios de Química I · Parcial 2: Enlace, TRPEV & Estequiometría',
    subtitle: 'Facultad de Ciencias UCV · Escuela de Química (Código 3401)',
    durationMinutes: 60,
    questionCount: 6,
    badge: 'Química I UCV',
    colorScheme: 'indigo' as const,
    description:
      'Estructuras de Lewis con octeto expandido, cargas formales, geometría molecular TRPEV, polaridad y cálculos de reactivo limitante y rendimiento.',
    targetSubject: 'Química' as const,
    targetTopicKeyword: 'Estequiometría',
  },
  {
    id: 'exam-santiago-sem1-qgi-parcial3',
    profileId: SANTIAGO_PROFILE,
    title: 'Principios de Química I · Parcial 3: Redox, Gases & Coligativas',
    subtitle: 'Facultad de Ciencias UCV · Escuela de Química (Código 3401)',
    durationMinutes: 60,
    questionCount: 6,
    badge: 'Química I UCV',
    colorScheme: 'indigo' as const,
    description:
      'Balanceo por ion-electrón en medio ácido, gases recolectados sobre agua con ley de Dalton, y cálculo crioscópico con factor de van t Hoff.',
    targetSubject: 'Química' as const,
    targetTopicKeyword: 'Redox',
  },
  {
    id: 'exam-santiago-sem1-fis1-parcial1',
    profileId: SANTIAGO_PROFILE,
    title: 'Física I · Parcial 1: Cinemática Vectorial en ℝ³',
    subtitle: 'Facultad de Ciencias UCV · Escuela de Física',
    durationMinutes: 60,
    questionCount: 6,
    badge: 'Física I UCV',
    colorScheme: 'indigo' as const,
    description:
      'Vectores de posición, velocidad y aceleración, triedro intrínseco (a_t y a_n), radio de curvatura y tiro parabólico tridimensional.',
    targetSubject: 'Física' as const,
    targetTopicKeyword: 'Cinemática',
  },
  {
    id: 'exam-santiago-sem1-fis1-parcial2',
    profileId: SANTIAGO_PROFILE,
    title: 'Física I · Parcial 2: Leyes de Newton & Dinámica de Rozamiento',
    subtitle: 'Facultad de Ciencias UCV · Escuela de Física',
    durationMinutes: 60,
    questionCount: 6,
    badge: 'Física I UCV',
    colorScheme: 'indigo' as const,
    description:
      'Diagramas de cuerpo libre en planos inclinados, fricción estática y cinética, y sistemas de masas acopladas con poleas ideales.',
    targetSubject: 'Física' as const,
    targetTopicKeyword: 'Dinámica',
  },
  {
    id: 'exam-santiago-sem1-fis1-parcial3',
    profileId: SANTIAGO_PROFILE,
    title: 'Física I · Parcial 3: Trabajo, Energía & Fuerzas Conservativas',
    subtitle: 'Facultad de Ciencias UCV · Escuela de Física',
    durationMinutes: 60,
    questionCount: 6,
    badge: 'Física I UCV',
    colorScheme: 'indigo' as const,
    description:
      'Integral de línea del trabajo, teorema de fuerzas vivas, energía potencial gravitatoria y elástica, y balance con trabajo no conservativo.',
    targetSubject: 'Física' as const,
    targetTopicKeyword: 'Energía',
  },
  {
    id: 'exam-santiago-sem1-simulacro-integral',
    profileId: SANTIAGO_PROFILE,
    title: 'Simulacro Integral Semestre I (Matemática I + Química I + Física I)',
    subtitle: 'Batería Multidisciplinaria Completa · Facultad de Ciencias UCV',
    durationMinutes: 90,
    questionCount: 15,
    badge: 'Simulacro Semestre I',
    colorScheme: 'indigo' as const,
    description:
      'Evaluación universitaria de máxima exigencia que integra los conceptos analíticos fundamentales de las tres materias del primer semestre.',
    targetSubject: 'Física' as const,
  },
];

// =====================================================================
// 6. MOTOR DE INGESTA DINÁMICA DE SÍLABOS Y EVALUACIONES (BULK INGESTOR)
// =====================================================================
export interface SantiagoCurriculumInputPayload {
  subjects?: Array<{
    name: string;
    code?: string;
    professor?: string;
    topics?: string[];
  }>;
  evaluations?: Array<{
    subject: string;
    title: string;
    date: string;
    time?: string;
    type?: 'PARCIAL' | 'QUIZ' | 'TALLER' | 'ENTREGA' | 'PROYECTO' | 'RECUPERACION';
    weightPercentage: number;
    location?: string;
    topics?: string[];
    notes?: string;
  }>;
  guides?: DeconstructedAcademicGuide[];
  questions?: Question[];
}

export function ingestSantiagoSemester1Data(
  payload: SantiagoCurriculumInputPayload,
  userId: string = 'santiago_fisica_ucv'
): { evaluationsImported: number; remindersGenerated: number; guidesRegistered: number } {
  const eventsKey = `cpe_${userId}_events_clean_v1`;
  const remindersKey = `cpe_${userId}_reminders_clean_v1`;

  let currentEvents: EvaluationEvent[] = [];
  try {
    const raw = localStorage.getItem(eventsKey);
    if (raw) currentEvents = JSON.parse(raw);
  } catch {
    currentEvents = [];
  }

  let currentReminders: StudyReminder[] = [];
  try {
    const raw = localStorage.getItem(remindersKey);
    if (raw) currentReminders = JSON.parse(raw);
  } catch {
    currentReminders = [];
  }

  let evaluationsImported = 0;
  let remindersGenerated = 0;

  if (payload.evaluations && Array.isArray(payload.evaluations)) {
    payload.evaluations.forEach((item, idx) => {
      const isDuplicate = currentEvents.some(
        (e) =>
          e.subject.toLowerCase() === item.subject.toLowerCase() &&
          e.title.toLowerCase() === item.title.toLowerCase()
      );

      if (!isDuplicate) {
        const newEvent: EvaluationEvent = {
          id: `santiago-eval-dyn-${Date.now()}-${idx}`,
          title: item.title,
          subject: item.subject,
          date: item.date,
          time: item.time || '08:00 AM',
          type: item.type || 'PARCIAL',
          weightPercentage: Number(item.weightPercentage) || 0,
          location: item.location || 'Facultad de Ciencias UCV',
          topics: item.topics || [],
          notes: item.notes || 'Primer Semestre UCV · Escuela de Física',
        };
        currentEvents.push(newEvent);
        evaluationsImported++;

        const remTitle = `Alerta de Estudio: Repaso para ${item.title} (${item.subject})`;
        currentReminders.push({
          id: `santiago-rem-dyn-${Date.now()}-${idx}`,
          title: remTitle,
          subject: item.subject,
          dueDate: item.date,
          priority: 'ALTA',
          completed: false,
          createdAt: new Date().toISOString(),
        });
        remindersGenerated++;
      }
    });

    localStorage.setItem(eventsKey, JSON.stringify(currentEvents));
    localStorage.setItem(remindersKey, JSON.stringify(currentReminders));
  }

  return {
    evaluationsImported,
    remindersGenerated,
    guidesRegistered: payload.guides?.length || 0,
  };
}
