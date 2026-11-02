/**
 * @file santiago_curriculum_hub.ts
 * @description Centro Oficial de Contenidos Académicos para Santiago Rivero
 * (Facultad de Ciencias · Escuela de Física · Universidad Central de Venezuela - UCV).
 *
 * Arquitectura modular y escalable para el PRIMER SEMESTRE (Semestre I):
 * 1. Materias Oficiales de la Escuela de Física UCV:
 *    - Física I (Mecánica Clásica, Cinemática Vectorial, Dinámica Newtoniana, Trabajo/Energía y Momento)
 *    - Cálculo I (Análisis Real, Cotas, Límites, Continuidad, Derivación y Optimización)
 *    - Álgebra Lineal & Geometría Analítica (Vectores en ℝ³, Planos, Matrices, Determinantes y Sistemas)
 *    - Laboratorio I de Física (Teoría de Errores, Propagación de Incertidumbres y Mínimos Cuadrados)
 * 2. Calendario de Evaluaciones Base (14 Parciales, Talleres, Proyectos e Informes de Laboratorio)
 *    con enlace a Guía Deconstruida, Recursos Multimedia y Prompt de Investigación con Arquitectura Santiago
 * 3. Tareas y Sesiones de Estudio con Backward Scheduling (Alertas escalonadas de 10, 7 y 3 días)
 * 4. Catorce Guías Académicas Deconstruidas en 7 Pilares (`SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES`)
 * 5. Banco de Reactivos Calibrados para Nivel Universitario Semestre I (`SANTIAGO_SEMESTER_1_QUESTIONS`)
 * 6. Modelos de Examen Preconfigurados (`SANTIAGO_SEMESTER_1_TAILORED_EXAMS`)
 * 7. Motor de Ingesta Dinámica (`ingestSantiagoSemester1Data`)
 */

import type { Question } from '../types/exam.types';
import type { DeconstructedAcademicGuide } from '../types/deconstruction.types';
import type { EvaluationEvent, StudyReminder } from '../types/academicPlanner.types';
import { SANTIAGO_RESEARCH_PROMPTS } from './santiago_prompts';
import { SANTIAGO_MULTIMEDIA_CATALOG } from './santiago_multimedia';
import {
  SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES as RAW_GUIDES,
  questionToDeconstructed,
} from './santiago_guides';

export const SANTIAGO_PROFILE = 'santiago_fisica_ucv' as const;

function buildOptions(texts: [string, string, string, string]) {
  const letters = ['a', 'b', 'c', 'd'] as const;
  return texts.map((text, i) => ({ id: `opt-${letters[i]}`, text }));
}

// =====================================================================
// 1. MATERIAS OFICIALES DEL PRIMER SEMESTRE (ESCUELA DE FÍSICA UCV)
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
    code: 'FIS-1101',
    name: 'Física I',
    department: 'Departamento de Física Aplicada y Teórica',
    credits: 5,
    description:
      'Cinemática vectorial en ℝ³, leyes de Newton, dinámica de partículas, fuerzas dependientes de la velocidad, trabajo, energía potencial y cinética, teorema de conservación del momento lineal y colisiones en 2D.',
    typicalEvalStructure: '3 Parciales (25% c/u) + Proyecto/Taller Computacional (15%) + Quices (10%).',
  },
  {
    code: 'MAT-1102',
    name: 'Cálculo I',
    department: 'Departamento de Matemáticas',
    credits: 5,
    description:
      'Axiomas de cuerpo de los números reales, supremo e ínfimo, sucesiones y límites formales (definición épsilon-delta), continuidad, derivabilidad, teoremas de Rolle y del Valor Medio, regla de la cadena y problemas de optimización física.',
    typicalEvalStructure: '3 Parciales (25% c/u) + Taller de Modelado y Optimización (15%) + Quices (10%).',
  },
  {
    code: 'MAT-1103',
    name: 'Álgebra Lineal & Geometría Analítica',
    department: 'Departamento de Matemáticas',
    credits: 4,
    description:
      'Vectores euclidianos en ℝ² y ℝ³, producto escalar, producto vectorial y mixto, ecuaciones de rectas y planos en el espacio, matrices, determinantes, eliminación gaussiana, transformaciones lineales y autovectores.',
    typicalEvalStructure: '2 Parciales (35% c/u) + Taller Práctico de Rotaciones (20%) + Quices (10%).',
  },
  {
    code: 'FIS-1104',
    name: 'Laboratorio I de Física',
    department: 'Laboratorios Docentes de Física',
    credits: 3,
    description:
      'Instrumentación metrológica (pie de rey, micrómetro, cronómetro digital), teoría de medición y cifras significativas, propagación de incertidumbres sistemáticas y aleatorias por Gauss, ajuste lineal por mínimos cuadrados y redacción formal de informes.',
    typicalEvalStructure: 'Informe #1 Densidades (25%) + Informe #2 Riel de Aire (25%) + Examen Práctico (30%) + Quices de Entrada (20%).',
  },
];

// =====================================================================
// 2. CALENDARIO DE EVALUACIONES ENRIQUECIDO CON GUÍAS, MULTIMEDIA Y PROMPTS
// =====================================================================
export const SANTIAGO_SEMESTER_1_DEFAULT_EVALUATIONS: EvaluationEvent[] = [
  // --- FÍSICA I ---
  {
    id: 'santiago-fis1-parcial-1',
    title: 'Primer Parcial de Física I: Cinemática Vectorial ℝ³',
    subject: 'Física',
    date: '2026-11-20',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Facultad de Ciencias UCV · Aula Magna / Aula 201',
    topics: [
      'Cinemática diferencial en ℝ³',
      'Aceleración tangencial y normal',
      'Tiro parabólico con resistencia del aire',
      'Movimiento circular no uniforme',
    ],
    notes: 'Llevar calculadora científica y formulario oficial rubricado.',
    guideId: 'santiago-fis1-kinematics-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-kinematics'],
  },
  {
    id: 'santiago-fis1-parcial-2',
    title: 'Segundo Parcial de Física I: Leyes de Newton y Dinámica',
    subject: 'Física',
    date: '2026-12-18',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Facultad de Ciencias UCV · Aula 201',
    topics: [
      'Diagramas de cuerpo libre complejos',
      'Rozamiento estático y cinético',
      'Fuerzas elásticas de Hooke',
      'Dinámica en marcos no inerciales (fuerzas ficticias)',
    ],
    notes: 'Requiere dominio absoluto de descomposición vectorial trigonométrica.',
    guideId: 'santiago-fis1-dynamics-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-dynamics'],
  },
  {
    id: 'santiago-fis1-parcial-3',
    title: 'Tercer Parcial de Física I: Trabajo, Energía y Conservación',
    subject: 'Física',
    date: '2027-01-29',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Facultad de Ciencias UCV · Aula 201',
    topics: [
      'Integrales de línea para trabajo mecánico',
      'Energía potencial gravitacional y elástica',
      'Conservación de la energía mecánica',
      'Colisiones elásticas e inelásticas en 2D',
    ],
    notes: 'Último parcial ordinario antes del cierre de actas semestral.',
    guideId: 'santiago-fis1-energy-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-energy'],
  },
  {
    id: 'santiago-fis1-proyecto',
    title: 'Proyecto de Física I: Simulación Mecánica Computacional en Python',
    subject: 'Física',
    date: '2027-01-15',
    time: '11:59 PM',
    type: 'PROYECTO',
    weightPercentage: 15,
    location: 'Campus Virtual UCV / Repositorio GitHub',
    topics: [
      'Integrador numérico Euler-Cromer',
      'Modelado de fricción aerodinámica v y v²',
      'Búsqueda numérica de ángulo óptimo de tiro',
      'Gráficas científicas con Matplotlib',
    ],
    notes: 'Entrega en Jupyter Notebook con código documentado y memoria técnica.',
    guideId: 'santiago-fis1-simulation-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-simulation'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-fis1-simulation'],
  },

  // --- CÁLCULO I ---
  {
    id: 'santiago-calc1-parcial-1',
    title: 'Primer Parcial de Cálculo I: Cotas, Sucesiones y Límites',
    subject: 'Matemática',
    date: '2026-11-27',
    time: '10:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Facultad de Ciencias UCV · Aula 104',
    topics: [
      'Axioma del supremo e ínfimo',
      'Definición rigurosa de límite (ε - δ)',
      'Límites indeterminados racionales y trigonométricos',
      'Continuidad y Teorema de Bolzano',
    ],
    notes: 'Prohibido el uso de calculadora; demostraciones analíticas rigurosas.',
    guideId: 'santiago-calc1-limits-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-calc1-limits'],
  },
  {
    id: 'santiago-calc1-parcial-2',
    title: 'Segundo Parcial de Cálculo I: Derivadas y Regla de la Cadena',
    subject: 'Matemática',
    date: '2026-12-22',
    time: '10:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Facultad de Ciencias UCV · Aula 104',
    topics: [
      'Derivada por definición',
      'Regla de la cadena y derivación implícita',
      'Derivadas de orden superior',
      'Diferenciales y aproximaciones lineales',
    ],
    notes: 'Examen de alta velocidad algebraica.',
    guideId: 'santiago-calc1-derivatives-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-calc1-derivatives'],
  },
  {
    id: 'santiago-calc1-parcial-3',
    title: 'Tercer Parcial de Cálculo I: Teoremas de Valor Medio y Optimización',
    subject: 'Matemática',
    date: '2027-02-05',
    time: '10:00 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Facultad de Ciencias UCV · Aula 104',
    topics: [
      'Teorema de Rolle y del Valor Medio (Cauchy/Lagrange)',
      'Regla de L\'Hôpital',
      'Criterios de primera y segunda derivada',
      'Problemas de optimización aplicada a la física',
    ],
    notes: 'Graficación analítica detallada de funciones con asíntotas oblicuas.',
    guideId: 'santiago-calc1-optimization-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-calc1-optimization'],
  },
  {
    id: 'santiago-calc1-taller',
    title: 'Taller de Cálculo I: Modelado Matemático y Optimización Aplicada',
    subject: 'Matemática',
    date: '2027-01-20',
    time: '02:00 PM',
    type: 'TALLER',
    weightPercentage: 15,
    location: 'Facultad de Ciencias UCV · Aula 104',
    topics: [
      'Modelado de contenedores y recipientes de costo mínimo',
      'Ecuaciones de ligadura geométrica',
      'Teorema de Weierstrass en intervalos cerrados',
      'Comprobación de concavidad con segunda derivada',
    ],
    notes: 'Trabajo individual formal con redacción de deducciones matemáticas.',
    guideId: 'santiago-calc1-modeling-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-calc1-optimization'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-calc1-modeling'],
  },

  // --- ÁLGEBRA LINEAL & GEOMETRÍA ANALÍTICA ---
  {
    id: 'santiago-alg1-parcial-1',
    title: 'Primer Parcial de Álgebra Lineal: Geometría Vectorial en ℝ³',
    subject: 'Matemática',
    date: '2026-12-04',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 35,
    location: 'Facultad de Ciencias UCV · Aula 302',
    topics: [
      'Producto escalar, normas y ortogonalidad',
      'Producto vectorial y áreas de paralelogramos',
      'Triple producto escalar y volúmenes de paralelepípedos',
      'Ecuaciones vectoriales y paramétricas de rectas y planos',
    ],
    notes: 'Enfoque geométrico riguroso para física teórica.',
    guideId: 'santiago-alg1-vectors-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-alg1-vectors'],
  },
  {
    id: 'santiago-alg1-parcial-2',
    title: 'Segundo Parcial de Álgebra Lineal: Matrices, Sistemas y Rango',
    subject: 'Matemática',
    date: '2027-01-22',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 35,
    location: 'Facultad de Ciencias UCV · Aula 302',
    topics: [
      'Álgebra de matrices e inversas',
      'Operaciones elementales de fila y matriz escalonada',
      'Teorema de Rouché-Frobenius',
      'Determinantes, propiedades y regla de Cramer',
    ],
    notes: 'Sistemas homogéneos y no homogéneos de dimensión n.',
    guideId: 'santiago-alg1-matrices-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-alg1-matrices'],
  },
  {
    id: 'santiago-alg1-taller',
    title: 'Taller de Álgebra Lineal: Rotaciones y Gráfica Vectorial en ℝ³',
    subject: 'Matemática',
    date: '2027-01-18',
    time: '10:00 AM',
    type: 'TALLER',
    weightPercentage: 20,
    location: 'Facultad de Ciencias UCV · Laboratorio de Cómputo',
    topics: [
      'Matrices ortogonales de rotación espacial',
      'Autovalores y autovectores en giros',
      'Ejes principales de inercia mecánica',
      'Preservación de ángulos y normas euclidianas',
    ],
    notes: 'Entrega práctica con demostración de ortogonalidad matricial.',
    guideId: 'santiago-alg1-workshop-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-alg1-matrices'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-alg1-workshop'],
  },

  // --- LABORATORIO I DE FÍSICA ---
  {
    id: 'santiago-lab1-informe-1',
    title: 'Informe #1: Medición de Densidades y Propagación de Incertidumbres',
    subject: 'Física',
    date: '2026-11-16',
    time: '02:00 PM',
    type: 'TALLER',
    weightPercentage: 25,
    location: 'Laboratorio Docente de Física I · Pabellón 2',
    topics: [
      'Manejo de calibrador vernier y tornillo micrométrico',
      'Cálculo de error instrumental y aleatorio',
      'Propagación diferencial multivariable de Gauss',
      'Redondeo de cifras significativas',
    ],
    notes: 'Entrega formal impresa en formato de paper científico con tablas.',
    guideId: 'santiago-lab1-density-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-lab1-density'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-lab1-density'],
  },
  {
    id: 'santiago-lab1-informe-2',
    title: 'Informe #2: Cinemática en Riel de Aire y Ajuste por Mínimos Cuadrados',
    subject: 'Física',
    date: '2026-12-14',
    time: '02:00 PM',
    type: 'TALLER',
    weightPercentage: 25,
    location: 'Laboratorio Docente de Física I · Pabellón 2',
    topics: [
      'Fotoceldas y cronómetros digitales en riel de aire',
      'Regresión lineal por mínimos cuadrados y coeficiente R²',
      'Linealización cuadrática x vs t²',
      'Determinación experimental de la aceleración g',
    ],
    notes: 'Incluir barras de error experimentales en las gráficas.',
    guideId: 'santiago-lab1-airtrack-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-lab1-airtrack'],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-lab1-airtrack'],
  },
  {
    id: 'santiago-lab1-examen',
    title: 'Examen Práctico de Laboratorio I: Metrología y Calibración en Vivo',
    subject: 'Física',
    date: '2027-01-25',
    time: '02:00 PM',
    type: 'PARCIAL',
    weightPercentage: 30,
    location: 'Laboratorio Docente de Física I · Pabellón 2',
    topics: [
      'Medición en mesa con trinquete de micrómetro',
      'Identificación y corrección de error de cero',
      'Trazado manual de recta de ajuste con pendiente',
      'Estimación rápida de densidades y errores',
    ],
    notes: 'Prueba individual práctica por estaciones de trabajo.',
    guideId: 'santiago-lab1-exam-guide',
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-lab1-density'],
  },
];

// =====================================================================
// 3. RECORDATORIOS DE ESTUDIO CON BACKWARD SCHEDULING (10, 7, 3 DÍAS)
// =====================================================================
export const SANTIAGO_SEMESTER_1_DEFAULT_REMINDERS: StudyReminder[] = [
  {
    id: 'rem-santiago-sem1-01',
    title: 'Repaso intensivo de Cinemática ℝ³ (10 días antes del Parcial I Física I)',
    subject: 'Física',
    dueDate: '2026-11-10',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-02',
    title: 'Entrega y revisión de cálculos del Informe #1 (Densidad e Incertidumbres)',
    subject: 'Física',
    dueDate: '2026-11-14',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-03',
    title: 'Resolver batería de límites formales ε-δ (7 días antes de Cálculo I)',
    subject: 'Matemática',
    dueDate: '2026-11-20',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-04',
    title: 'Demostración de distancias punto-plano en ℝ³ (Álgebra Lineal)',
    subject: 'Matemática',
    dueDate: '2026-11-28',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-05',
    title: 'Ajuste por mínimos cuadrados de datos de riel de aire (Informe #2)',
    subject: 'Física',
    dueDate: '2026-12-11',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-06',
    title: 'Práctica de derivadas implícitas y razones de cambio (Cálculo I)',
    subject: 'Matemática',
    dueDate: '2026-12-17',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-07',
    title: 'Compilar simulación computacional de tiro con fricción en Python',
    subject: 'Física',
    dueDate: '2027-01-12',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
];

// =====================================================================
// 4. BANCO DE REACTIVOS CALIBRADOS PARA PRIMER SEMESTRE UCV
// =====================================================================
export const SANTIAGO_SEMESTER_1_QUESTIONS: Question[] = [
  // --- FÍSICA I ---
  {
    id: 'santiago-q-fis1-001',
    subject: 'Física',
    topic: 'Cinemática en ℝ³',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Una partícula se desplaza en el espacio con vector de posición dado por $\\vec{r}(t) = 3t^2 \\hat{i} + (2t - 5) \\hat{j} + 4 \\cos(2t) \\hat{k}$ (en unidades SI). ¿Cuál es la magnitud de su aceleración en el instante $t = 0\\,\\text{s}$?',
    latexFormula: '\\vec{a}(t) = \\frac{d^2 \\vec{r}}{dt^2}',
    options: buildOptions([
      '$\\sqrt{6^2 + (-16)^2} = \\sqrt{292} \\approx 17.09\\,\\text{m/s}^2$',
      '$6\\,\\text{m/s}^2$',
      '$16\\,\\text{m/s}^2$',
      '$\\sqrt{36 + 4} = \\sqrt{40}\\,\\text{m/s}^2$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Derivamos dos veces respecto al tiempo: $\\vec{v}(t) = 6t \\hat{i} + 2 \\hat{j} - 8\\sin(2t) \\hat{k}$. Luego $\\vec{a}(t) = 6 \\hat{i} + 0 \\hat{j} - 16\\cos(2t) \\hat{k}$. Evaluando en $t = 0$: $\\vec{a}(0) = 6 \\hat{i} - 16 \\hat{k}$. Su magnitud es $|\\vec{a}(0)| = \\sqrt{6^2 + (-16)^2} = \\sqrt{36 + 256} = \\sqrt{292} \\approx 17.09\\,\\text{m/s}^2$.',
  },
  {
    id: 'santiago-q-fis1-002',
    subject: 'Física',
    topic: 'Dinámica de Newton y Fricción',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Un bloque de masa $m = 5\\,\\text{kg}$ reposa sobre un plano inclinado a un ángulo $\\theta = 30^\\circ$. El coeficiente de rozamiento estático es $\\mu_s = 0.4$. ¿Deslizará espontáneamente el bloque bajo la sola acción de la gravedad?',
    latexFormula: '\\tan \\theta_c = \\mu_s',
    options: buildOptions([
      'Sí desliza, porque $\\tan(30^\\circ) \\approx 0.577 > \\mu_s = 0.4$',
      'No desliza, permanece en equilibrio estático',
      'Desliza hacia arriba por inercia',
      'Faltan datos de la aceleración gravitacional',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'El ángulo crítico de reposo cumple $\\tan \\theta_c = \\mu_s = 0.4 \\implies \\theta_c \\approx 21.8^\\circ$. Como el ángulo real es $\\theta = 30^\\circ > 21.8^\\circ$, la componente tangencial del peso ($mg \\sin 30^\\circ$) supera a la fuerza de roce estática máxima ($\\mu_s mg \\cos 30^\\circ$), haciendo que el bloque deslice cuesta abajo.',
  },
  {
    id: 'santiago-q-fis1-003',
    subject: 'Física',
    topic: 'Trabajo y Energía Mecánica',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Una fuerza conservativa unidimensional viene descrita por $F(x) = -kx + 3\\beta x^2$. ¿Cuál es la función de energía potencial $U(x)$ asociada, fijando $U(0) = 0$?',
    latexFormula: 'U(x) = -\\int_0^x F(x\')\\, dx\'',
    options: buildOptions([
      '$U(x) = \\frac{1}{2}kx^2 - \\beta x^3$',
      '$U(x) = -\\frac{1}{2}kx^2 + \\beta x^3$',
      '$U(x) = -kx + 6\\beta x$',
      '$U(x) = kx^2 + 3\\beta x^3$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Por definición de energía potencial: $U(x) = -\\int_0^x (-kx\' + 3\\beta x\'^2)\\, dx\' = \\int_0^x (kx\' - 3\\beta x\'^2)\\, dx\' = \\frac{1}{2}kx^2 - \\beta x^3$.',
  },
  {
    id: 'santiago-q-fis1-004',
    subject: 'Física',
    topic: 'Simulación y Rozamiento del Aire',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Al disparar un proyectil con resistencia del aire proporcional a $v^2$, ¿cómo varía el ángulo de tiro para obtener el alcance máximo comparado con el caso ideal sin fricción?',
    options: buildOptions([
      'Disminuye a un ángulo menor a $45^\\circ$ (típicamente entre $35^\\circ$ y $40^\\circ$)',
      'Aumenta a un ángulo mayor a $45^\\circ$',
      'Permanece exactamente en $45^\\circ$',
      'Se vuelve independiente del ángulo de lanzamiento',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'La resistencia del aire penaliza severamente el tiempo prolongado de vuelo a gran altura. Por tanto, trayectorias más rasantes (ángulos menores a 45 grados) logran un mejor alcance horizontal porque sufren menos desaceleración acumulada.',
  },

  // --- CÁLCULO I ---
  {
    id: 'santiago-q-calc1-001',
    subject: 'Matemática',
    topic: 'Límites Trigonométricos Notables',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText: 'Calcula el límite analítico: $\\lim_{x \\to 0} \\frac{1 - \\cos(4x)}{x^2}$.',
    latexFormula: '\\lim_{x \\to 0} \\frac{1 - \\cos(u)}{u^2} = \\frac{1}{2}',
    options: buildOptions(['$8$', '$4$', '$2$', '$16$']),
    correctOptionId: 'opt-a',
    explanation:
      'Multiplicamos por el conjugado $(1 + \\cos(4x))$ o aplicamos la identidad trigonométrica $1 - \\cos(4x) = 2\\sin^2(2x)$: $\\lim_{x \\to 0} \\frac{2\\sin^2(2x)}{x^2} = 2 \\cdot \\left(\\lim_{x \\to 0} \\frac{\\sin(2x)}{x}\\right)^2 = 2 \\cdot (2)^2 = 8$.',
  },
  {
    id: 'santiago-q-calc1-002',
    subject: 'Matemática',
    topic: 'Regla de la Cadena y Derivadas',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Dada la función $f(x) = \\ln\\left(\\sqrt{\\frac{1 + x}{1 - x}}\\right)$ para $|x| < 1$, su derivada $f\'(x)$ simplificada al máximo es:',
    latexFormula: 'f(x) = \\frac{1}{2}[\\ln(1+x) - \\ln(1-x)]',
    options: buildOptions([
      '$\\frac{1}{1 - x^2}$',
      '$\\frac{x}{1 - x^2}$',
      '$\\frac{2}{1 + x^2}$',
      '$\\frac{1}{\\sqrt{1 - x^2}}$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Aplicando propiedades de logaritmos antes de derivar: $f(x) = \\frac{1}{2}(\\ln(1 + x) - \\ln(1 - x))$. Derivamos: $f\'(x) = \\frac{1}{2} \\left( \\frac{1}{1 + x} + \\frac{1}{1 - x} \\right) = \\frac{1}{2} \\left( \\frac{2}{1 - x^2} \\right) = \\frac{1}{1 - x^2}$.',
  },
  {
    id: 'santiago-q-calc1-003',
    subject: 'Matemática',
    topic: 'Teorema de Rolle y del Valor Medio',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Para la función $f(x) = x^3 - 4x$ en el intervalo cerrado $[0, 2]$, encuentra el punto $c \\in (0, 2)$ que garantiza el Teorema de Rolle tal que $f\'(c) = 0$.',
    latexFormula: 'f\'(c) = 3c^2 - 4 = 0',
    options: buildOptions([
      '$c = \\frac{2}{\\sqrt{3}} = \\frac{2\\sqrt{3}}{3}$',
      '$c = 1$',
      '$c = \\sqrt{2}$',
      '$c = \\frac{4}{3}$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Verificamos hipótesis: $f$ es continua en $[0, 2]$ y derivable en $(0, 2)$, con $f(0) = f(2) = 0$. Por el Teorema de Rolle existe $c \\in (0, 2)$ tal que $f\'(c) = 3c^2 - 4 = 0 \\implies c^2 = 4/3 \\implies c = +2/\\sqrt{3} \\approx 1.155 \\in (0, 2)$.',
  },
  {
    id: 'santiago-q-calc1-004',
    subject: 'Matemática',
    topic: 'Optimización de Contenedores',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Para un envase cilíndrico cerrado de volumen fijo $V$, ¿cuál es la relación óptima entre la altura $h$ y el radio $r$ que minimiza el área total de material?',
    latexFormula: 'h = 2r',
    options: buildOptions([
      '$h = 2r$ (la altura es igual al diámetro)',
      '$h = r$',
      '$h = 4r$',
      '$h = \\frac{r}{2}$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Al minimizar $A(r) = 2\\pi r^2 + 2V/r$ derivando e igualando a cero: $4\\pi r - 2V/r^2 = 0 \\implies 2\\pi r^3 = V$. Como $V = \\pi r^2 h$, sustituyendo queda $2\\pi r^3 = \\pi r^2 h \\implies h = 2r$.',
  },

  // --- ÁLGEBRA LINEAL & GEOMETRÍA ANALÍTICA ---
  {
    id: 'santiago-q-alg1-001',
    subject: 'Matemática',
    topic: 'Ecuación del Plano en ℝ³',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Encuentra la ecuación general del plano $\\pi$ que pasa por el punto $P_0(1, -2, 3)$ y tiene como vector normal $\\vec{n} = (2, -4, 5)$.',
    latexFormula: 'A(x - x_0) + B(y - y_0) + C(z - z_0) = 0',
    options: buildOptions([
      '$2x - 4y + 5z - 25 = 0$',
      '$2x - 4y + 5z + 25 = 0$',
      '$x - 2y + 3z - 10 = 0$',
      '$2x - 4y + 5z = 0$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'La ecuación del plano es $2(x - 1) - 4(y - (-2)) + 5(z - 3) = 0 \\implies 2x - 2 - 4y - 8 + 5z - 15 = 0 \\implies 2x - 4y + 5z - 25 = 0$.',
  },
  {
    id: 'santiago-q-alg1-002',
    subject: 'Matemática',
    topic: 'Determinantes y Rango Matricial',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      '¿Para qué valor de $\\lambda \\in \\mathbb{R}$ la matriz $A = \\begin{pmatrix} 1 & 2 & 1 \\\\ 0 & \\lambda - 1 & 3 \\\\ 0 & 0 & \\lambda - 4 \\end{pmatrix}$ NO tiene inversa (es singular)?',
    latexFormula: '\\det(A) = (1)(\\lambda - 1)(\\lambda - 4) = 0',
    options: buildOptions([
      '$\\lambda = 1$ o $\\lambda = 4$',
      '$\\lambda = 0$ exclusivamente',
      '$\\lambda = -1$ o $\\lambda = -4$',
      'Tiene inversa para todo $\\lambda \\in \\mathbb{R}$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Como $A$ es triangular superior, su determinante es el producto de la diagonal: $\\det(A) = 1 \\cdot (\\lambda - 1) \\cdot (\\lambda - 4)$. Es singular si $\\det(A) = 0$, lo que ocurre cuando $\\lambda = 1$ o $\\lambda = 4$.',
  },
  {
    id: 'santiago-q-alg1-003',
    subject: 'Matemática',
    topic: 'Autovalores en Rotaciones Espaciales',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Toda matriz de rotación pura $R \\in SO(3)$ en el espacio euclidiano posee siempre al menos un autovalor real igual a:',
    latexFormula: 'R \\vec{v} = 1 \\cdot \\vec{v}',
    options: buildOptions([
      '$\\lambda = 1$ (el autovector asociado define el eje de rotación inmóvil)',
      '$\\lambda = 0$',
      '$\\lambda = -1$',
      'No tiene ningún autovalor real',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Por el Teorema de Rotación de Euler, todo giro en 3D deja una línea fija (el eje de giro). Los puntos de ese eje no cambian bajo la rotación, lo que equivale a $R v = 1 \\cdot v$, por lo que siempre existe el autovalor $\\lambda = 1$.',
  },

  // --- LABORATORIO I DE FÍSICA ---
  {
    id: 'santiago-q-lab1-001',
    subject: 'Física',
    topic: 'Propagación de Incertidumbres',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Para determinar la densidad $\\rho = \\frac{m}{V}$ de un cilindro homogéneo, se mide $m = (100.0 \\pm 0.2)\\,\\text{g}$ y su volumen $V = (20.0 \\pm 0.1)\\,\\text{cm}^3$. ¿Cuál es la incertidumbre relativa porcentual $\\epsilon_\\rho$ en la densidad?',
    latexFormula: '\\epsilon_\\rho = \\sqrt{\\left(\\frac{\\Delta m}{m}\\right)^2 + \\left(\\frac{\\Delta V}{V}\\right)^2}',
    options: buildOptions([
      '$\\approx 0.54\\%$',
      '$\\approx 1.50\\%$',
      '$\\approx 0.02\\%$',
      '$\\approx 3.00\\%$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Las incertidumbres relativas son $\\frac{\\Delta m}{m} = 0.002$ ($0.2\\%$) y $\\frac{\\Delta V}{V} = 0.005$ ($0.5\\%$). En cuadratura: $\\epsilon_\\rho = \\sqrt{(0.002)^2 + (0.005)^2} = \\sqrt{0.000029} \\approx 0.00538 = 0.54\\%$.',
  },
  {
    id: 'santiago-q-lab1-002',
    subject: 'Física',
    topic: 'Mínimos Cuadrados y Cinemática',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'En un riel de aire, se ajusta linealmente la posición $x$ frente al tiempo al cuadrado $t^2$ y se obtiene una pendiente $m = (2.45 \\pm 0.05)\\,\\text{m/s}^2$. ¿Cuál es la aceleración $a$ del carro?',
    latexFormula: 'x = \\frac{1}{2} a t^2 \\implies a = 2m',
    options: buildOptions([
      '$a = (4.90 \\pm 0.10)\\,\\text{m/s}^2$',
      '$a = (2.45 \\pm 0.05)\\,\\text{m/s}^2$',
      '$a = (1.22 \\pm 0.03)\\,\\text{m/s}^2$',
      '$a = (9.80 \\pm 0.20)\\,\\text{m/s}^2$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Como $x = \\frac{1}{2}at^2$, la pendiente representa $m = \\frac{1}{2}a$. Por tanto, la aceleración es el doble de la pendiente: $a = 2m = 2(2.45) = 4.90\\,\\text{m/s}^2$ y su error es $\\Delta a = 2\\Delta m = 0.10\\,\\text{m/s}^2$.',
  },
];

// =====================================================================
// 5. GUÍAS DECONSTRUIDAS COMPLETAS (INYECCIÓN DE REACTIVOS Y RE-EXPORTACIÓN)
// =====================================================================
export const SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES: DeconstructedAcademicGuide[] = RAW_GUIDES.map(
  (guide) => {
    // Inyectar preguntas correspondientes si están vacías
    if (!guide.generatedQuestions || guide.generatedQuestions.length === 0) {
      let matchedQs = SANTIAGO_SEMESTER_1_QUESTIONS.filter((q) => {
        if (guide.guideMetadata.area.includes('Física') && q.subject === 'Física') return true;
        if (guide.guideMetadata.area.includes('Cálculo') && q.subject === 'Matemática' && !q.topic.includes('Plano') && !q.topic.includes('Determinantes')) return true;
        if (guide.guideMetadata.area.includes('Álgebra') && (q.topic.includes('Plano') || q.topic.includes('Determinantes') || q.topic.includes('Autovalor'))) return true;
        if (guide.guideMetadata.area.includes('Laboratorio') && (q.topic.includes('Incertidumbre') || q.topic.includes('Mínimos Cuadrados'))) return true;
        return false;
      });
      if (matchedQs.length === 0) matchedQs = SANTIAGO_SEMESTER_1_QUESTIONS.slice(0, 3);
      return {
        ...guide,
        generatedQuestions: matchedQs.map(questionToDeconstructed),
      };
    }
    return guide;
  }
);

// =====================================================================
// 6. MODELOS DE EXAMEN PRECONFIGURADOS PARA PRIMER SEMESTRE UCV
// =====================================================================
export const SANTIAGO_SEMESTER_1_TAILORED_EXAMS = [
  {
    id: 'exam-santiago-sem1-fisica1-parcial1',
    profileId: SANTIAGO_PROFILE,
    title: 'Física I · Parcial 1: Cinemática Vectorial en ℝ³',
    subtitle: 'Facultad de Ciencias UCV · Escuela de Física',
    durationMinutes: 60,
    questionCount: 6,
    badge: 'Física I UCV',
    colorScheme: 'indigo' as const,
    description:
      'Vectores de posición, velocidad y aceleración en 3 dimensiones, componentes intrínsecas, tiro parabólico y movimiento curvilíneo.',
    targetSubject: 'Física' as const,
    targetTopicKeyword: 'Cinemática',
  },
  {
    id: 'exam-santiago-sem1-calculo1-parcial1',
    profileId: SANTIAGO_PROFILE,
    title: 'Cálculo I · Parcial 1: Axiomas de ℝ, Cotas & Límites Notables',
    subtitle: 'Facultad de Ciencias UCV · Departamento de Matemáticas',
    durationMinutes: 60,
    questionCount: 6,
    badge: 'Cálculo I UCV',
    colorScheme: 'indigo' as const,
    description:
      'Propiedad del supremo, demostraciones de límites por épsilon-delta, formas indeterminadas 0/0 e infinito sobre infinito.',
    targetSubject: 'Matemática' as const,
    targetTopicKeyword: 'Límites',
  },
  {
    id: 'exam-santiago-sem1-algebra1-parcial1',
    profileId: SANTIAGO_PROFILE,
    title: 'Álgebra Lineal · Parcial 1: Geometría de Rectas y Planos en ℝ³',
    subtitle: 'Facultad de Ciencias UCV · Departamento de Matemáticas',
    durationMinutes: 50,
    questionCount: 5,
    badge: 'Álgebra Lineal',
    colorScheme: 'indigo' as const,
    description:
      'Producto escalar, producto cruz, ecuaciones simétricas de la recta, planos en el espacio y distancia punto-plano.',
    targetSubject: 'Matemática' as const,
    targetTopicKeyword: 'Plano',
  },
  {
    id: 'exam-santiago-sem1-lab1-practica',
    profileId: SANTIAGO_PROFILE,
    title: 'Laboratorio I de Física · Quiz de Metrología e Incertidumbres',
    subtitle: 'Laboratorios Docentes de Física · UCV',
    durationMinutes: 35,
    questionCount: 5,
    badge: 'Laboratorio I',
    colorScheme: 'indigo' as const,
    description:
      'Propagación de errores de Gauss, cifras significativas, apreciación instrumental y ajuste de rectas por mínimos cuadrados.',
    targetSubject: 'Física' as const,
    targetTopicKeyword: 'Incertidumbre',
  },
  {
    id: 'exam-santiago-sem1-simulacro-integral',
    profileId: SANTIAGO_PROFILE,
    title: 'Simulacro Integral Semestre I (Física I + Cálculo I + Álgebra Lineal)',
    subtitle: 'Batería Completa Primer Semestre · Ciencias UCV',
    durationMinutes: 90,
    questionCount: 15,
    badge: 'Simulacro Semestre I',
    colorScheme: 'indigo' as const,
    description:
      'Evaluación integral multidisciplinaria de alta exigencia analítica que reúne todos los conceptos fundamentales del primer semestre.',
    targetSubject: 'Física' as const,
  },
];

// =====================================================================
// 7. MOTOR DE INGESTA DINÁMICA DE SÍLABOS Y EVALUACIONES (BULK INGESTOR)
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
