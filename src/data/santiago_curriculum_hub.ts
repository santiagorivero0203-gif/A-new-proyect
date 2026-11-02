/**
 * @file santiago_curriculum_hub.ts
 * @description Centro Oficial de Contenidos Académicos para Santiago Rivero
 * (Facultad de Ciencias · Escuela de Física · Universidad Central de Venezuela - UCV).
 *
 * Arquitectura modular y extensible para el PRIMER SEMESTRE (Semestre I):
 * 1. Materias Oficiales de la Escuela de Física UCV:
 *    - Física I (Mecánica Clásica, Cinemática Vectorial, Dinámica Newtoniana, Trabajo/Energía y Momento)
 *    - Cálculo I (Análisis Real, Cotas, Límites, Continuidad, Derivación y Optimización)
 *    - Álgebra Lineal & Geometría Analítica (Vectores en ℝ³, Planos, Matrices, Determinantes y Sistemas)
 *    - Laboratorio I de Física (Teoría de Errores, Propagación de Incertidumbres y Mínimos Cuadrados)
 * 2. Calendario de Evaluaciones Base (Parciales, Talleres, Quices e Informes de Laboratorio)
 * 3. Tareas y Sesiones de Estudio con Backward Scheduling (Alertas escalonadas de 10, 7 y 3 días)
 * 4. Cuatro Guías Académicas Deconstruidas en 7 Pilares (`DeconstructedAcademicGuide`)
 * 5. Banco de Reactivos Calibrados para Nivel Universitario Semestre I (`SANTIAGO_SEMESTER_1_QUESTIONS`)
 * 6. Modelos de Examen Preconfigurados (`SANTIAGO_SEMESTER_1_TAILORED_EXAMS`)
 * 7. Motor de Ingesta Dinámica (`ingestSantiagoSemester1Data`) para procesar en lote el sílabo que suministre el usuario.
 */

import type { Question } from '../types/exam.types';
import type { DeconstructedAcademicGuide, DeconstructedQuestion } from '../types/deconstruction.types';
import type { EvaluationEvent, StudyReminder } from '../types/academicPlanner.types';

export const SANTIAGO_PROFILE = 'santiago_fisica_ucv' as const;


function questionToDeconstructed(q: Question): DeconstructedQuestion {
  return {
    area: q.subject,
    tema: q.topic,
    tipo: 'opcion_multiple',
    pregunta: q.questionText,
    opciones: q.options.map((o) => o.text),
    correcta: q.options.find((o) => o.id === q.correctOptionId)?.text || q.options[0].text,
    justificacion: `**Concepto Fundamental:** ${q.topic}\n\n**Resolución:** ${q.explanation}`,
  };
}

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
    description: 'Cinemática vectorial en ℝ³, leyes de Newton, dinámica de partículas, fuerzas dependientes del tiempo y velocidad, trabajo, energía potencial y cinética, teorema de conservación del momento lineal y colisiones.',
    typicalEvalStructure: '3 Parciales (25% c/u) + Tareas/Quices acumulados (25%) + Examen de Reparación reglamentario.',
  },
  {
    code: 'MAT-1102',
    name: 'Cálculo I',
    department: 'Departamento de Matemáticas',
    credits: 5,
    description: 'Axiomas de cuerpo de los números reales, supremo e ínfimo, sucesiones y límites formales (definición épsilon-delta), continuidad, derivabilidad, teoremas de Rolle y del Valor Medio, regla de la cadena y cálculo de extremos.',
    typicalEvalStructure: '4 Parciales de 25% c/u o 3 Parciales (30%, 35%, 35%).',
  },
  {
    code: 'MAT-1103',
    name: 'Álgebra Lineal & Geometría Analítica',
    department: 'Departamento de Matemáticas',
    credits: 4,
    description: 'Vectores euclidianos en ℝ² y ℝ³, producto escalar, producto vectorial y mixto, ecuaciones de rectas y planos en el espacio, matrices, determinantes, eliminación gaussiana y rango.',
    typicalEvalStructure: '3 Parciales (30%, 35%, 35%) o 3 Parciales + Talleres evaluados.',
  },
  {
    code: 'FIS-1104',
    name: 'Laboratorio I de Física',
    department: 'Laboratorios Docentes de Física',
    credits: 3,
    description: 'Instrumentación metrológica (pie de rey, micrómetro, cronómetro digital), teoría de medición y cifras significativas, propagación de incertidumbres sistemáticas y aleatorias, ajuste lineal por mínimos cuadrados y redacción formal de informes.',
    typicalEvalStructure: 'Quices de entrada previa a cada práctica (20%) + Informes semanales (60%) + Prueba práctica final (20%).',
  },
];

// =====================================================================
// 2. CALENDARIO DE EVALUACIONES PREPARADO PARA PRIMER SEMESTRE UCV
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
    topics: ['Cinemática diferencial en ℝ³', 'Aceleración tangencial y normal', 'Tiro parabólico con resistencia del aire', 'Movimiento circular no uniforme'],
    notes: 'Llevar calculadora científica y formulario oficial rubricado.',
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
    topics: ['Diagramas de cuerpo libre complejos', 'Rozamiento estático y cinético', 'Fuerzas elásticas de Hooke', 'Dinámica en marcos no inerciales (fuerzas ficticias)'],
    notes: 'Requiere dominio absoluto de descomposición vectorial trigonométrica.',
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
    topics: ['Integrales de línea para trabajo mecánico', 'Energía potencial gravitacional y elástica', 'Conservación de la energía mecánica', 'Colisiones elásticas e inelásticas en 2D'],
    notes: 'Último parcial ordinario antes del cierre de actas semestral.',
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
    topics: ['Axioma del supremo e ínfimo', 'Definición rigurosa de límite (ε - δ)', 'Límites indeterminados racionales y trigonométricos', 'Continuidad y Teorema de Bolzano'],
    notes: 'Prohibido el uso de calculadora; demostraciones analíticas rigurosas.',
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
    topics: ['Derivada por definición', 'Regla de la cadena y derivación implícita', 'Derivadas de orden superior', 'Diferenciales y aproximaciones lineales'],
    notes: 'Examen de alta velocidad algebraica.',
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
    topics: ['Teorema de Rolle y del Valor Medio (Cauchy/Lagrange)', 'Regla de L\'Hôpital', 'Criterios de primera y segunda derivada', 'Problemas de optimización aplicada a la física'],
    notes: 'Graficación analítica detallada de funciones con asíntotas oblicuas.',
  },

  // --- ÁLGEBRA LINEAL & GEOMETRÍA ANALÍTICA ---
  {
    id: 'santiago-alg1-parcial-1',
    title: 'Primer Parcial de Álgebra Lineal: Geometría Vectorial en ℝ³',
    subject: 'Matemática',
    date: '2026-12-04',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 30,
    location: 'Facultad de Ciencias UCV · Aula 302',
    topics: ['Producto escalar, normas y ortogonalidad', 'Producto vectorial y áreas de paralelogramos', 'Triple producto escalar y volúmenes de paralelepípedos', 'Ecuaciones vectoriales y paramétricas de rectas y planos'],
    notes: 'Enfoque geométrico riguroso para física teórica.',
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
    topics: ['Álgebra de matrices e inversas', 'Operaciones elementales de fila y matriz escalonada', 'Teorema de Rouché-Frobenius', 'Determinantes, propiedades y regla de Cramer'],
    notes: 'Sistemas homogéneos y no homogéneos de dimensión n.',
  },

  // --- LABORATORIO I DE FÍSICA ---
  {
    id: 'santiago-lab1-informe-1',
    title: 'Informe #1: Medición de Densidades y Propagación de Incertidumbres',
    subject: 'Física',
    date: '2026-11-16',
    time: '02:00 PM',
    type: 'TALLER',
    weightPercentage: 15,
    location: 'Laboratorio Docente de Física I · Pabellón 2',
    topics: ['Manejo de calibrador vernier y tornillo micrométrico', 'Cálculo de error instrumental y aleatorio', 'Propagación diferencial multivariable'],
    notes: 'Entrega formal impresa en formato de paper científico con gráficas.',
  },
  {
    id: 'santiago-lab1-informe-2',
    title: 'Informe #2: Cinemática en Riel de Aire y Ajuste por Mínimos Cuadrados',
    subject: 'Física',
    date: '2026-12-14',
    time: '02:00 PM',
    type: 'TALLER',
    weightPercentage: 15,
    location: 'Laboratorio Docente de Física I · Pabellón 2',
    topics: ['Fotoceldas y cronómetros digitales', 'Regresión lineal y coeficiente de correlación R²', 'Determinación experimental de la aceleración g'],
    notes: 'Incluir barras de error experimentales en las gráficas.',
  },
];

// =====================================================================
// 3. RECORDATORIOS DE ESTUDIO CON BACKWARD SCHEDULING (10, 7, 3 DÍAS)
// =====================================================================
export const SANTIAGO_SEMESTER_1_DEFAULT_REMINDERS: StudyReminder[] = [
  {
    id: 'rem-santiago-sem1-01',
    title: 'Comenzar repaso intensivo de Cinemática ℝ³ (10 días antes del Parcial I Física I)',
    subject: 'Física',
    dueDate: '2026-11-10',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-02',
    title: 'Resolver batería de límites formales ε-δ (7 días antes de Cálculo I)',
    subject: 'Matemática',
    dueDate: '2026-11-20',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'rem-santiago-sem1-03',
    title: 'Demostración de distancias punto-plano en ℝ³ (Álgebra Lineal)',
    subject: 'Matemática',
    dueDate: '2026-11-28',
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
    questionText: 'Una partícula se desplaza en el espacio con vector de posición dado por $\\vec{r}(t) = 3t^2 \\hat{i} + (2t - 5) \\hat{j} + 4 \\cos(2t) \\hat{k}$ (en unidades SI). ¿Cuál es la magnitud de su aceleración en el instante $t = 0\\,\\text{s}$?',
    latexFormula: '\\vec{a}(t) = \\frac{d^2 \\vec{r}}{dt^2}',
    options: buildOptions([
      '$\\sqrt{6^2 + (-16)^2} = \\sqrt{292} \\approx 17.09\\,\\text{m/s}^2$',
      '$6\\,\\text{m/s}^2$',
      '$16\\,\\text{m/s}^2$',
      '$\\sqrt{36 + 4} = \\sqrt{40}\\,\\text{m/s}^2$',
    ]),
    correctOptionId: 'opt-a',
    explanation: 'Derivamos dos veces respecto al tiempo: $\\vec{v}(t) = 6t \\hat{i} + 2 \\hat{j} - 8\\sin(2t) \\hat{k}$. Luego $\\vec{a}(t) = 6 \\hat{i} + 0 \\hat{j} - 16\\cos(2t) \\hat{k}$. Evaluando en $t = 0$: $\\vec{a}(0) = 6 \\hat{i} - 16 \\hat{k}$. Su magnitud es $|\\vec{a}(0)| = \\sqrt{6^2 + (-16)^2} = \\sqrt{36 + 256} = \\sqrt{292} \\approx 17.09\\,\\text{m/s}^2$.',
  },
  {
    id: 'santiago-q-fis1-002',
    subject: 'Física',
    topic: 'Dinámica de Newton y Fricción',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText: 'Un bloque de masa $m = 5\\,\\text{kg}$ reposa sobre un plano inclinado a un ángulo $\\theta = 30^\\circ$. El coeficiente de rozamiento estático es $\\mu_s = 0.4$. Si se aplica una fuerza horizontal hacia el plano, ¿deslizará espontáneamente el bloque bajo la sola acción de la gravedad?',
    latexFormula: '\\tan \\theta_c = \\mu_s',
    options: buildOptions([
      'Sí desliza, porque $\\tan(30^\\circ) \\approx 0.577 > \\mu_s = 0.4$',
      'No desliza, permanece en equilibrio estático',
      'Desliza hacia arriba por inercia',
      'Faltan datos de la aceleración gravitacional',
    ]),
    correctOptionId: 'opt-a',
    explanation: 'El ángulo crítico de reposo cumple $\\tan \\theta_c = \\mu_s = 0.4 \\implies \\theta_c \\approx 21.8^\\circ$. Como el ángulo real es $\\theta = 30^\\circ > 21.8^\\circ$, la componente tangencial del peso ($mg \\sin 30^\\circ$) supera a la fuerza de roce estática máxima ($\\mu_s mg \\cos 30^\\circ$), haciendo que el bloque deslice cuesta abajo.',
  },
  {
    id: 'santiago-q-fis1-003',
    subject: 'Física',
    topic: 'Trabajo y Energía Mecánica',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText: 'Una fuerza conservativa unidimensional viene descrita por $F(x) = -kx + 3\\beta x^2$. ¿Cuál es la función de energía potencial $U(x)$ asociada, fijando $U(0) = 0$?',
    latexFormula: 'U(x) = -\\int_0^x F(x\')\\, dx\'',
    options: buildOptions([
      '$U(x) = \\frac{1}{2}kx^2 - \\beta x^3$',
      '$U(x) = -\\frac{1}{2}kx^2 + \\beta x^3$',
      '$U(x) = -kx + 6\\beta x$',
      '$U(x) = kx^2 + 3\\beta x^3$',
    ]),
    correctOptionId: 'opt-a',
    explanation: 'Por definición de energía potencial: $U(x) = -\\int_0^x (-kx\' + 3\\beta x\'^2)\\, dx\' = \\int_0^x (kx\' - 3\\beta x\'^2)\\, dx\' = \\frac{1}{2}kx^2 - \\beta x^3$.',
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
    explanation: 'Multiplicamos por el conjugado $(1 + \\cos(4x))$ o aplicamos la identidad trigonométrica $1 - \\cos(4x) = 2\\sin^2(2x)$: $\\lim_{x \\to 0} \\frac{2\\sin^2(2x)}{x^2} = 2 \\cdot \\left(\\lim_{x \\to 0} \\frac{\\sin(2x)}{x}\\right)^2 = 2 \\cdot (2)^2 = 8$. Por regla de L\'Hôpital se corrobora: $\\frac{4\\sin(4x)}{2x} \\to \\frac{16\\cos(4x)}{2} = 8$.',
  },
  {
    id: 'santiago-q-calc1-002',
    subject: 'Matemática',
    topic: 'Regla de la Cadena y Derivadas',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText: 'Dada la función $f(x) = \\ln\\left(\\sqrt{\\frac{1 + x}{1 - x}}\\right)$ para $|x| < 1$, su derivada $f\'(x)$ simplificada al máximo es:',
    latexFormula: 'f(x) = \\frac{1}{2}[\\ln(1+x) - \\ln(1-x)]',
    options: buildOptions([
      '$\\frac{1}{1 - x^2}$',
      '$\\frac{x}{1 - x^2}$',
      '$\\frac{2}{1 + x^2}$',
      '$\\frac{1}{\\sqrt{1 - x^2}}$',
    ]),
    correctOptionId: 'opt-a',
    explanation: 'Aplicando propiedades de logaritmos antes de derivar: $f(x) = \\frac{1}{2}(\\ln(1 + x) - \\ln(1 - x))$. Derivamos término a término: $f\'(x) = \\frac{1}{2} \\left( \\frac{1}{1 + x} - \\frac{-1}{1 - x} \\right) = \\frac{1}{2} \\left( \\frac{1 - x + 1 + x}{(1 + x)(1 - x)} \\right) = \\frac{1}{2} \\left( \\frac{2}{1 - x^2} \\right) = \\frac{1}{1 - x^2}$.',
  },
  {
    id: 'santiago-q-calc1-003',
    subject: 'Matemática',
    topic: 'Teorema de Rolle y del Valor Medio',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText: 'Para la función $f(x) = x^3 - 4x$ en el intervalo cerrado $[0, 2]$, encuentra el punto $c \\in (0, 2)$ que garantiza el Teorema de Rolle tal que $f\'(c) = 0$.',
    latexFormula: 'f\'(c) = 3c^2 - 4 = 0',
    options: buildOptions([
      '$c = \\frac{2}{\\sqrt{3}} = \\frac{2\\sqrt{3}}{3}$',
      '$c = 1$',
      '$c = \\sqrt{2}$',
      '$c = \\frac{4}{3}$',
    ]),
    correctOptionId: 'opt-a',
    explanation: 'Verificamos hipótesis: $f$ es polinómica, por tanto continua en $[0, 2]$ y derivable en $(0, 2)$. Además $f(0) = 0$ y $f(2) = 2^3 - 4(2) = 0$. Por el Teorema de Rolle existe $c \\in (0, 2)$ tal que $f\'(c) = 3c^2 - 4 = 0 \\implies c^2 = 4/3 \\implies c = +2/\\sqrt{3} \\approx 1.155 \\in (0, 2)$.',
  },

  // --- ÁLGEBRA LINEAL & GEOMETRÍA ANALÍTICA ---
  {
    id: 'santiago-q-alg1-001',
    subject: 'Matemática',
    topic: 'Ecuación del Plano en ℝ³',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText: 'Encuentra la ecuación general del plano $\\pi$ que pasa por el punto $P_0(1, -2, 3)$ y tiene como vector normal $\\vec{n} = (2, -4, 5)$.',
    latexFormula: 'A(x - x_0) + B(y - y_0) + C(z - z_0) = 0',
    options: buildOptions([
      '$2x - 4y + 5z - 25 = 0$',
      '$2x - 4y + 5z + 25 = 0$',
      '$x - 2y + 3z - 10 = 0$',
      '$2x - 4y + 5z = 0$',
    ]),
    correctOptionId: 'opt-a',
    explanation: 'La ecuación del plano es $2(x - 1) - 4(y - (-2)) + 5(z - 3) = 0 \\implies 2x - 2 - 4y - 8 + 5z - 15 = 0 \\implies 2x - 4y + 5z - 25 = 0$.',
  },
  {
    id: 'santiago-q-alg1-002',
    subject: 'Matemática',
    topic: 'Determinantes y Rango Matricial',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText: '¿Para qué valor de $\\lambda \\in \\mathbb{R}$ la matriz $A = \\begin{pmatrix} 1 & 2 & 1 \\\\ 0 & \\lambda - 1 & 3 \\\\ 0 & 0 & \\lambda - 4 \\end{pmatrix}$ NO tiene inversa (es singular)?',
    latexFormula: '\\det(A) = (1)(\\lambda - 1)(\\lambda - 4) = 0',
    options: buildOptions([
      '$\\lambda = 1$ o $\\lambda = 4$',
      '$\\lambda = 0$ exclusivamente',
      '$\\lambda = -1$ o $\\lambda = -4$',
      'Tiene inversa para todo $\\lambda \\in \\mathbb{R}$',
    ]),
    correctOptionId: 'opt-a',
    explanation: 'Como $A$ es una matriz triangular superior, su determinante es el producto de los elementos de su diagonal principal: $\\det(A) = 1 \\cdot (\\lambda - 1) \\cdot (\\lambda - 4)$. La matriz es singular si y solo si $\\det(A) = 0$, lo que ocurre cuando $\\lambda = 1$ o $\\lambda = 4$.',
  },

  // --- LABORATORIO I DE FÍSICA ---
  {
    id: 'santiago-q-lab1-001',
    subject: 'Física',
    topic: 'Propagación de Incertidumbres',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText: 'Para determinar la densidad $\\rho = \\frac{m}{V}$ de un cilindro homogéneo, se mide $m = (100.0 \\pm 0.2)\\,\\text{g}$ y su volumen $V = (20.0 \\pm 0.1)\\,\\text{cm}^3$. ¿Cuál es la incertidumbre relativa porcentual $\\epsilon_\\rho$ en la densidad?',
    latexFormula: '\\epsilon_\\rho = \\sqrt{\\left(\\frac{\\Delta m}{m}\\right)^2 + \\left(\\frac{\\Delta V}{V}\\right)^2}',
    options: buildOptions([
      '$\\approx 0.54\\%$',
      '$\\approx 1.50\\%$',
      '$\\approx 0.02\\%$',
      '$\\approx 3.00\\%$',
    ]),
    correctOptionId: 'opt-a',
    explanation: 'Las incertidumbres relativas son $\\frac{\\Delta m}{m} = \\frac{0.2}{100.0} = 0.002$ ($0.2\\%$) y $\\frac{\\Delta V}{V} = \\frac{0.1}{20.0} = 0.005$ ($0.5\\%$). En cuadratura (propagación estándar independiente): $\\epsilon_\\rho = \\sqrt{(0.002)^2 + (0.005)^2} = \\sqrt{0.000004 + 0.000025} = \\sqrt{0.000029} \\approx 0.00538 = 0.54\\%$.',
  },
];

// =====================================================================
// 5. GUÍAS DECONSTRUIDAS EN 7 PILARES PARA PRIMER SEMESTRE UCV
// =====================================================================
export const SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES: DeconstructedAcademicGuide[] = [
  {
    id: 'santiago-calc1-limits-guide',
    phenomenonAndTheory: 'El cálculo diferencial e infinitesimal se fundamenta en la noción analítica de aproximación local y continuidad bajo los axiomas de completitud de los números reales.',
    guideMetadata: {
      title: 'Cálculo I: Análisis Real, Definición Rigurosa de Límites (ε-δ) y Continuidad',
      area: 'Cálculo I · UCV Ciencias',
      summary: 'Fundamentos axiomáticos de los números reales, propiedad del supremo, límites laterales, infinitos y en el infinito. Técnicas analíticas para resolver indeterminaciones 0/0 e infinito sobre infinito.',
    },
    glossary: [
      {
        term: 'Supremo (Ínfimo)',
        definition: 'La menor de las cotas superiores (o la mayor de las cotas inferiores) de un subconjunto no vacío y acotado de números reales.',
        symbolOrUnit: 'sup(A), inf(A)',
      },
      {
        term: 'Límite Formal (ε - δ)',
        definition: 'Para todo ε > 0 existe δ > 0 tal que si 0 < |x - a| < δ, entonces |f(x) - L| < ε.',
        symbolOrUnit: 'lim f(x) = L',
      },
      {
        term: 'Teorema de Bolzano',
        definition: 'Si f es continua en [a, b] y f(a)·f(b) < 0, existe al menos un c ∈ (a, b) tal que f(c) = 0.',
        symbolOrUnit: 'f(c) = 0',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Límite Trigonométrico Fundamental',
          latex: '\\lim_{u \\to 0} \\frac{\\sin u}{u} = 1,\\quad \\lim_{u \\to 0} \\frac{1 - \\cos u}{u^2} = \\frac{1}{2}',
          application: 'Pilar para simplificar indeterminaciones de cocientes trigonométricos sin necesidad de L\'Hôpital.',
        },
        {
          name: 'Límite del Número de Euler',
          latex: '\\lim_{x \\to 0} (1 + x)^{1/x} = e,\\quad \\lim_{x \\to \\infty} \\left(1 + \\frac{k}{x}\\right)^x = e^k',
          application: 'Resolución de indeterminaciones del tipo 1 elevado a infinito.',
        },
      ],
      mnemonicsAndPatterns: [
        'Regla de los Grados para x → ∞: Si grado(P) > grado(Q) diverge a ±∞; si son iguales es el cociente de coeficientes líderes; si grado(P) < grado(Q) converge a 0.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Cálculo de Límite con Conjugado Racional',
        problemStatement: 'Evaluar $\\lim_{x \\to 4} \\frac{\\sqrt{2x + 1} - 3}{x - 4}$.',
        deductiveSteps: [
          'Evaluación directa: $\\sqrt{2(4)+1} - 3 = 3 - 3 = 0$ y $4 - 4 = 0$ (Indeterminación 0/0).',
          'Multiplicamos numerador y denominador por el conjugado $(\\sqrt{2x + 1} + 3)$.',
          'En el numerador aplicamos diferencia de cuadrados: $(\\sqrt{2x+1})^2 - 3^2 = 2x + 1 - 9 = 2x - 8 = 2(x - 4)$.',
          'Cancelamos el factor nulo $(x - 4)$: $\\frac{2(x - 4)}{(x - 4)(\\sqrt{2x+1} + 3)} = \\frac{2}{\\sqrt{2x+1} + 3}$.',
          'Tomamos límite cuando $x \\to 4$: $\\frac{2}{3 + 3} = \\frac{2}{6} = \\frac{1}{3}$.',
        ],
        finalResult: 'El límite converge exactamente a 1/3.',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Aplicar la Regla de L\'Hôpital cuando la expresión NO es una forma indeterminada (ej. si el denominador no tiende a cero).',
        correction: 'Verificar siempre que el cociente sea estrictamente de la forma [0/0] o [∞/∞] antes de derivar numerador y denominador.',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: ['Límite formal', 'Límites laterales', 'Asíntotas oblicuas'],
        notes: [
          'Un límite existe si y solo si los dos límites laterales coinciden y son finitos.',
          'Para asíntotas oblicuas y = mx + b: m = lim f(x)/x y b = lim [f(x) - mx].',
        ],
        summary: 'El análisis de límites constituye la base lógica del cálculo infinitesimal y la mecánica clásica.',
      },
      conceptMapNodes: 'Límites -> Continuidad -> Derivabilidad -> Teoremas de Valor Medio',
      activeRecallFlashcards: [
        {
          front: '¿Cuál es la condición formal para que una función f sea continua en un punto x = a?',
          back: '1) f(a) está definida; 2) lim_{x→a} f(x) existe y es finito; 3) lim_{x→a} f(x) = f(a).',
        },
      ],
    },
    generatedQuestions: SANTIAGO_SEMESTER_1_QUESTIONS.filter((q) => q.topic.includes('Límites') || q.topic.includes('Derivada')).map(questionToDeconstructed),
  },
  {
    id: 'santiago-fis1-mechanics-guide',
    phenomenonAndTheory: 'La mecánica clásica describe y predice la evolución temporal del estado de movimiento de partículas y sistemas bajo la acción de interacciones vectoriales conservativas y disipativas.',
    guideMetadata: {
      title: 'Física I: Cinemática Vectorial ℝ³, Dinámica de Newton y Energía',
      area: 'Física I · UCV Ciencias',
      summary: 'Mecánica clásica newtoniana: movimiento en tres dimensiones, aceleraciones tangencial y centrípeta, fuerzas conservativas y disipativas, y principios universales de conservación.',
    },
    glossary: [
      {
        term: 'Aceleración Centrípeta',
        definition: 'Componente normal de la aceleración dirigida hacia el centro de curvatura: a_c = v² / ρ.',
        symbolOrUnit: 'a_c [m/s²]',
      },
      {
        term: 'Fuerza Conservativa',
        definition: 'Aquella cuyo trabajo a lo largo de cualquier trayectoria cerrada es idénticamente nulo: ∮ F·dr = 0.',
        symbolOrUnit: '∮ F·dr = 0 [J]',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Segunda Ley de Newton en Coordenadas Intrínsecas',
          latex: '\\vec{F}_{net} = m \\left( \\frac{dv}{dt} \\hat{u}_t + \\frac{v^2}{\\rho} \\hat{u}_n \\right)',
          application: 'Descomposición del movimiento en dirección tangente y perpendicular al vector velocidad.',
        },
        {
          name: 'Teorema de las Fuerzas Vivas (Trabajo y Energía Cinética)',
          latex: 'W_{net} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2',
          application: 'El trabajo realizado por todas las fuerzas aplicadas es igual a la variación de la energía cinética.',
        },
      ],
      mnemonicsAndPatterns: [
        'Diagrama de Cuerpo Libre (DCL): Aísla el cuerpo, dibuja gravedad vertical hacia abajo, normales perpendiculares a la superficie, rozamiento opuesto a la tendencia de deslizamiento y tensiones a lo largo de las cuerdas.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Bloque con Fricción en Plano Inclinado con Polea',
        problemStatement: 'Calcular la aceleración de dos masas conectadas por una cuerda ideal en un plano inclinado.',
        deductiveSteps: [
          'Escribir la segunda ley de Newton para cada cuerpo en su sistema de coordenadas local.',
          'Vincular las aceleraciones mediante la ligadura cinemática de la cuerda inextensible: a_1 = a_2 = a.',
          'Despejar la tensión común y obtener la aceleración analítica del sistema.',
        ],
        finalResult: 'La aceleración depende de la diferencia entre la fuerza tractora y el rozamiento estático/cinético.',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Confundir la fuerza centrípeta con una "fuerza real adicional" en el diagrama de cuerpo libre inercial.',
        correction: 'La fuerza centrípeta es el nombre de la componente neta resultante que apunta al centro, no un vector independiente extra.',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: ['Leyes de Newton', 'Energía mecánica', 'Conservación de momento'],
        notes: [
          'Si la sumatoria de fuerzas externas es cero, el momento lineal se conserva.',
          'Si solo actúan fuerzas conservativas, la energía mecánica E = K + U permanece constante.',
        ],
        summary: 'La mecánica analítica es el cimiento de toda la física moderna, desde la termodinámica hasta la mecánica cuántica.',
      },
      conceptMapNodes: 'Cinemática ℝ³ -> Leyes de Newton -> DCL -> Trabajo y Energía -> Conservación',
      activeRecallFlashcards: [
        {
          front: '¿Cuál es la relación matemática entre una fuerza conservativa unidimensional F(x) y su energía potencial U(x)?',
          back: 'F(x) = - dU/dx (la fuerza apunta hacia donde la energía potencial decrece más rápidamente).',
        },
      ],
    },
    generatedQuestions: SANTIAGO_SEMESTER_1_QUESTIONS.filter((q) => q.subject === 'Física').map(questionToDeconstructed),
  },
  {
    id: 'santiago-alg1-vectors-guide',
    phenomenonAndTheory: 'El espacio vectorial ℝ³ provee el marco geométrico y algebraico para formular las leyes de la física mediante transformaciones lineales, invariancia y ortogonalidad.',
    guideMetadata: {
      title: 'Álgebra Lineal & Geometría: Vectores en ℝ³, Planos, Matrices y Eliminación Gaussiana',
      area: 'Álgebra Lineal · UCV Ciencias',
      summary: 'Tratamiento vectorial formal en tres dimensiones: producto punto, producto cruz, ecuaciones simétricas y paramétricas de rectas, planos en el espacio y resolución de sistemas lineales mediante matrices aumentadas.',
    },
    glossary: [
      {
        term: 'Vector Normal a un Plano',
        definition: 'Vector no nulo perpendicular a todos los vectores contenidos en el plano.',
        symbolOrUnit: 'n = (A, B, C)',
      },
      {
        term: 'Rango de una Matriz',
        definition: 'El número máximo de filas (o columnas) linealmente independientes de la matriz.',
        symbolOrUnit: 'rg(A)',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Triple Producto Escalar (Volumen de Paralelepípedo)',
          latex: 'V = |\\vec{u} \\cdot (\\vec{v} \\times \\vec{w})| = \\left| \\det \\begin{pmatrix} u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\\\ w_1 & w_2 & w_3 \\end{pmatrix} \\right|',
          application: 'Determina si tres vectores son coplanares (volumen cero) o el volumen espacial encerrado.',
        },
        {
          name: 'Distancia de un Punto P a un Plano π',
          latex: 'd(P, \\pi) = \\frac{|A x_0 + B y_0 + C z_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}',
          application: 'Fórmula directa para medir la distancia ortogonal mínima a un plano.',
        },
      ],
      mnemonicsAndPatterns: [
        'Regla de la Mano Derecha: Apunta los dedos en la dirección de u, ciérralos hacia v; el pulgar extendido señala la dirección exacta del producto vectorial u × v.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Intersección de Dos Planos en el Espacio',
        problemStatement: 'Hallar la recta de intersección entre los planos x + y + z = 1 y 2x - y + 3z = 2.',
        deductiveSteps: [
          'El vector director de la recta de intersección es perpendicular a las dos normales: d = n_1 × n_2.',
          'Calculamos el producto cruz: (1, 1, 1) × (2, -1, 3) = (4, -1, -3).',
          'Encontramos un punto común fijando z = 0 y resolviendo el sistema 2×2: x + y = 1 y 2x - y = 2 => 3x = 3 => x = 1, y = 0.',
          'Escribimos la ecuación paramétrica de la recta: r(t) = (1, 0, 0) + t(4, -1, -3).',
        ],
        finalResult: 'La recta pasa por (1, 0, 0) con vector director (4, -1, -3).',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Asumir que el producto vectorial es asociativo: u × (v × w) ≠ (u × v) × w.',
        correction: 'El producto cruz no es asociativo ni conmutativo (es anticonmutativo: u × v = - v × u).',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: ['Planos en ℝ³', 'Producto cruz', 'Sistemas lineales'],
        notes: [
          'Un sistema lineal Ax = b tiene solución única si det(A) ≠ 0.',
          'Si det(A) = 0 puede tener infinitas soluciones o ninguna.',
        ],
        summary: 'El álgebra lineal es el lenguaje computacional y conceptual de la física teórica y experimental.',
      },
      conceptMapNodes: 'Vectores ℝ³ -> Producto Punto/Cruz -> Rectas y Planos -> Matrices -> Determinantes',
      activeRecallFlashcards: [
        {
          front: '¿Cuándo dos vectores no nulos u y v en ℝ³ son ortogonales?',
          back: 'Cuando su producto escalar es idénticamente cero: u · v = 0.',
        },
      ],
    },
    generatedQuestions: SANTIAGO_SEMESTER_1_QUESTIONS.filter((q) => q.topic.includes('Plano') || q.topic.includes('Determinantes')).map(questionToDeconstructed),
  },
  {
    id: 'santiago-lab1-errors-guide',
    phenomenonAndTheory: 'Toda medición empírica de un fenómeno físico está sujeta a limitaciones metrológicas intrínsecas e incertidumbres estocásticas que deben cuantificarse con rigor gaussiano.',
    guideMetadata: {
      title: 'Laboratorio I de Física: Metrología, Teoría de Errores y Mínimos Cuadrados',
      area: 'Laboratorio I · UCV Ciencias',
      summary: 'Tratamiento cuantitativo de datos experimentales: cifras significativas, incertidumbre instrumental y aleatoria, propagación multivariable y regresión lineal por mínimos cuadrados con cálculo de pendientes y puntos de corte.',
    },
    glossary: [
      {
        term: 'Apreciación Instrumental',
        definition: 'La menor división o lectura que puede realizarse de forma directa en la escala de un instrumento de medición.',
        symbolOrUnit: 'Δx_inst',
      },
      {
        term: 'Regresión Lineal por Mínimos Cuadrados',
        definition: 'Método matemático que minimiza la suma de los cuadrados de las distancias verticales entre los puntos experimentales y la recta de ajuste.',
        symbolOrUnit: 'y = mx + b, R²',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Propagación Diferencial General de Incertidumbre',
          latex: '\\Delta y = \\sqrt{ \\sum_{i=1}^n \\left( \\frac{\\partial y}{\\partial x_i} \\Delta x_i \\right)^2 }',
          application: 'Fórmula maestra de Gauss para magnitudes indirectas independientes no correlacionadas.',
        },
        {
          name: 'Pendiente de Ajuste por Mínimos Cuadrados',
          latex: 'm = \\frac{N \\sum (x_i y_i) - (\\sum x_i)(\\sum y_i)}{N \\sum (x_i^2) - (\\sum x_i)^2}',
          application: 'Cálculo de la pendiente óptima para una nube de N puntos experimentales.',
        },
      ],
      mnemonicsAndPatterns: [
        'Regla de Cifras Significativas: Las incertidumbres experimentales se redondean a UNA sola cifra significativa (o dos si es 1 o 2), y la medida se redondea en la misma posición decimal que su incertidumbre.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Medición de la Resistencia de un Conductor con Ley de Ohm',
        problemStatement: 'Calcular el valor de R y su error a partir de V = (12.0 ± 0.1) V e I = (2.00 ± 0.05) A.',
        deductiveSteps: [
          'Valor central: R = V / I = 12.0 / 2.00 = 6.00 Ω.',
          'Derivadas parciales: ∂R/∂V = 1/I = 1/2.00 = 0.5 A⁻¹; ∂R/∂I = -V/I² = -12.0 / 4.00 = -3.00 V/A².',
          'Incertidumbre: ΔR = √[ (0.5 · 0.1)² + (-3.00 · 0.05)² ] = √[ (0.05)² + (-0.15)² ] = √[ 0.0025 + 0.0225 ] = √0.025 ≈ 0.158 Ω.',
          'Redondeo: ΔR = 0.16 Ω (o 0.2 Ω). Resultado final: R = (6.00 ± 0.16) Ω.',
        ],
        finalResult: 'R = (6.00 ± 0.16) Ω con error relativo porcentual de 2.67%.',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Anotar más decimales en la medida que los que permite la incertidumbre experimental.',
        correction: 'La última cifra significativa de la medida debe coincidir con la posición del dígito de la incertidumbre.',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: ['Incertidumbre', 'Mínimos cuadrados', 'Cifras significativas'],
        notes: [
          'Una medición física carece de validez si no viene acompañada de su incertidumbre.',
          'Las incertidumbres se redondean a una sola cifra significativa.',
        ],
        summary: 'El laboratorio experimental contrasta las teorías matemáticas de la física teórica con la realidad del universo.',
      },
      conceptMapNodes: 'Medición -> Cifras Significativas -> Propagación Gauss -> Regresión Lineal',
      activeRecallFlashcards: [
        {
          front: '¿Cuál es la diferencia fundamental entre un error sistemático y uno aleatorio?',
          back: 'El sistemático desvía las medidas siempre en la misma dirección (calibración defectuosa); el aleatorio fluctúa simétricamente y puede reducirse promediando muchas medidas.',
        },
      ],
    },
    generatedQuestions: SANTIAGO_SEMESTER_1_QUESTIONS.filter((q) => q.topic.includes('Incertidumbre') || q.topic.includes('Laboratorio')).map(questionToDeconstructed),
  },
];

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
    description: 'Vectores de posición, velocidad y aceleración en 3 dimensiones, componentes intrínsecas, tiro parabólico y movimiento curvilíneo.',
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
    description: 'Propiedad del supremo, demostraciones de límites por épsilon-delta, formas indeterminadas 0/0 e infinito sobre infinito.',
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
    description: 'Producto escalar, producto cruz, ecuaciones simétricas de la recta, planos en el espacio y distancia punto-plano.',
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
    description: 'Propagación de errores de Gauss, cifras significativas, apreciación instrumental y ajuste de rectas por mínimos cuadrados.',
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
    description: 'Evaluación integral multidisciplinaria de alta exigencia analítica que reúne todos los conceptos fundamentales del primer semestre.',
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

/**
 * Ingesta de forma segura la información que suministre el estudiante para su primer semestre,
 * actualizando el almacenamiento persistente (localStorage) de evaluaciones, recordatorios y metas.
 */
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
        (e) => e.subject.toLowerCase() === item.subject.toLowerCase() && e.title.toLowerCase() === item.title.toLowerCase()
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

        // Generar recordatorio escalonado automático
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
