/**
 * @file andres_curriculum_hub.ts
 * @description Centro Oficial de Contenidos Académicos para Andrés Rivero
 * (1er Año de Bachillerato / Educación Media General · Colegio Católico / Carisma Consolación).
 *
 * Integra:
 * 1. Calendario de Evaluaciones Oficial del I Momento Pedagógico (Octubre – Diciembre 2026):
 *    -> Registros directos extraídos de sus cuadernos escolares de clase:
 *       Biología, Física (Prof. Antonio Gonzales), Matemáticas, Castellano, Diseño Digital,
 *       Educación en la Fe y Materia Práctica (Informática/Computación).
 * 2. Cuatro Guías Académicas Deconstruidas en 7 Pilares (`DeconstructedAcademicGuide`):
 *    -> Guía 1 (Matemática): Números Enteros (ℤ), Ley de los Signos, Potenciación y Ecuaciones con la Balanza.
 *    -> Guía 2 (Biología): El Método Científico, Instrumentos de Laboratorio Escolar y Estados de la Materia.
 *    -> Guía 3 (Física 1er Año): Historia de la Física, Medición de Magnitudes y Máquinas Simples.
 *    -> Guía 4 (Castellano): Sintaxis de la Oración Simple, Acentuación y Análisis Literario de "Barrabás" (Uslar Pietri).
 * 3. Banco de Reactivos Calibrados para 1er Año (`ALL_ANDRES_QUESTIONS`):
 *    -> Reactivos de selección simple estrictamente adaptados a nivel de 12 años (cero cálculo universitario,
 *       cero vectores ℝ³, explicaciones deductivas paso a paso con analogías cotidianas).
 * 4. Tareas y Recordatorios con Backward Scheduling (anticipación de 7 días para pruebas, 5 días para talleres).
 */

import type { Question } from '../types/exam.types';
import type { DeconstructedAcademicGuide } from '../types/deconstruction.types';
import type { EvaluationEvent, StudyReminder } from '../types/academicPlanner.types';
import type { TaskItem } from '../services/taskService';
import {
  ALL_ANDRES_EXPANDED_QUESTIONS,
  ANDRES_FE_CONSOLACION_GUIDE,
  ANDRES_INF_COMPUTING_GUIDE,
  ANDRES_INTEGRAL_EXAM_IDS,
  ANDRES_INTEGRAL_EXAM_QUESTIONS,
  getExamIdsForGuide,
  getExpandedGuideQuestions,
} from './andres';

export { ANDRES_FE_CONSOLACION_GUIDE, ANDRES_INF_COMPUTING_GUIDE, ANDRES_INTEGRAL_EXAM_QUESTIONS };

export const ANDRES_PROFILE = 'andres_bachillerato_1' as const;

// =====================================================================
// 1. CALENDARIO DE EVALUACIONES OFICIAL (I MOMENTO PEDAGÓGICO 2026)
// =====================================================================
export const ANDRES_DEFAULT_EVALUATION_EVENTS: EvaluationEvent[] = [
  // --- BIOLOGÍA Y CIENCIAS NATURALES ---
  {
    id: 'andres-bio-01',
    title: 'Taller Práctico: Pasos del Método Científico y Observación',
    subject: 'Biología',
    date: '2026-10-27',
    time: '08:00 AM',
    type: 'TALLER',
    weightPercentage: 20,
    location: 'Laboratorio de Ciencias',
    topics: ['Observación', 'Planteamiento de Hipótesis', 'Variables experimental y control'],
    scoreObtained: 19,
    notes: 'Realizado con éxito. Felicitado por la precisión en la formulación de hipótesis.',
  },
  {
    id: 'andres-bio-02',
    title: 'Laboratorio Escolar: Instrumentos de Medición y Bioseguridad',
    subject: 'Biología',
    date: '2026-11-05',
    time: '08:00 AM',
    type: 'TALLER',
    weightPercentage: 20,
    location: 'Laboratorio de Ciencias',
    topics: ['Uso de la probeta graduada', 'Manejo del microscopio óptico', 'Lectura de menisco', 'Normas de bioseguridad'],
    notes: 'Llevar bata blanca limpia, pañito absorbente y cuaderno de notas.',
  },
  {
    id: 'andres-bio-03',
    title: 'Informe y Defensa: Máquinas Simples en la Naturaleza y el Cuerpo Humano',
    subject: 'Biología',
    date: '2026-11-19',
    time: '08:00 AM',
    type: 'PROYECTO',
    weightPercentage: 20,
    location: 'Aula 1A',
    topics: ['Palancas anatómicas en brazos y piernas', 'Articulaciones como fulcros', 'Ventaja mecánica'],
    notes: 'Presentación en láminas o papel bond con dibujos a color.',
  },
  {
    id: 'andres-bio-04',
    title: 'Prueba Escrita: Estados y Propiedades de la Materia',
    subject: 'Biología',
    date: '2026-12-01',
    time: '08:00 AM',
    type: 'PARCIAL',
    weightPercentage: 20,
    location: 'Aula 1A',
    topics: ['Sólido, líquido, gaseoso', 'Cambios de fase: fusión, condensación, sublimación', 'Masa vs Peso'],
    notes: 'Examen teórico individual de 45 minutos.',
  },
  {
    id: 'andres-bio-05',
    title: 'Entrega de Cuaderno e Informes de Laboratorio Acumulados',
    subject: 'Biología',
    date: '2026-12-03',
    time: '09:30 AM',
    type: 'ENTREGA',
    weightPercentage: 20,
    location: 'Aula 1A',
    topics: ['Todos los temas del I Momento', 'Prácticas de laboratorio rubricadas', 'Rasgos y orden'],
    notes: 'Cuaderno forrado con membrete oficial y márgenes rojos reglamentarios.',
  },

  // --- FÍSICA (Prof. Antonio Gonzales) ---
  {
    id: 'andres-fis-01',
    title: 'Taller Diagnóstico: Historia de la Física y sus Pioneros',
    subject: 'Física',
    date: '2026-10-16',
    time: '09:45 AM',
    type: 'TALLER',
    weightPercentage: 20,
    location: 'Aula 1A',
    topics: ['Aristóteles vs Galileo', 'Isaac Newton y las leyes del movimiento', 'Evolución del método empírico'],
    scoreObtained: 18,
    notes: 'Excelente intervención sobre el experimento de la torre de Pisa de Galileo.',
  },
  {
    id: 'andres-fis-02',
    title: 'Mapa Mixto: Magnitudes Físicas Fundamentales y Derivadas',
    subject: 'Física',
    date: '2026-10-30',
    time: '09:45 AM',
    type: 'ENTREGA',
    weightPercentage: 20,
    location: 'Aula 1A',
    topics: ['Longitud (metro)', 'Masa (kilogramo)', 'Tiempo (segundo)', 'Magnitudes derivadas'],
    scoreObtained: 19,
    notes: 'Mapa conceptual y mental ilustrado a mano en hoja milimetrada.',
  },
  {
    id: 'andres-fis-03',
    title: 'Taller en Parejas: Conversión de Unidades SI y Mediciones',
    subject: 'Física',
    date: '2026-11-06',
    time: '09:45 AM',
    type: 'TALLER',
    weightPercentage: 20,
    location: 'Aula 1A',
    topics: ['Factores de conversión lineal', 'cm a m y km', 'horas a minutos y segundos', 'Uso de la regla graduada'],
    notes: 'Traer calculadora básica o lápiz para operaciones paso a paso.',
  },
  {
    id: 'andres-fis-04',
    title: 'Proyecto Creativo: Tarjeta de Física Navideña y Circuitos Sencillos',
    subject: 'Física',
    date: '2026-11-20',
    time: '09:45 AM',
    type: 'PROYECTO',
    weightPercentage: 15,
    location: 'Taller de Ciencias',
    topics: ['Concepto de energía luminosa', 'Conexión en serie básica con pila de botón y LED', 'Mensaje navideño'],
    notes: 'Materiales: cartulina, cinta de cobre o grafito, LED pequeño y batería 3V.',
  },
  {
    id: 'andres-fis-05',
    title: 'Prueba Escrita Integral: Historia, Medición, Magnitudes y Palancas',
    subject: 'Física',
    date: '2026-11-27',
    time: '09:45 AM',
    type: 'PARCIAL',
    weightPercentage: 25,
    location: 'Aula 1A',
    topics: ['Magnitudes SI', 'Factores de conversión', 'Ley de la Palanca: P·dp = R·dr', '3 géneros de palanca'],
    notes: 'Evaluación sumativa de cierre del I Momento. Requiere justificación matemática en cada reactivo.',
  },

  // --- MATEMÁTICAS ---
  {
    id: 'andres-mat-01',
    title: 'Prueba Escrita: Ecuaciones de 1er Grado en ℕ (La Balanza)',
    subject: 'Matemática',
    date: '2026-10-22',
    time: '07:15 AM',
    type: 'PARCIAL',
    weightPercentage: 20,
    location: 'Aula 1A',
    topics: ['Incógnita x', 'Despeje mediante operaciones inversas', 'Comprobación de la solución'],
    scoreObtained: 19,
    notes: '19/20 puntos. Solo un pequeño error de redondeo en el ejercicio 4.',
  },
  {
    id: 'andres-mat-02',
    title: 'Taller Escrito: Números Enteros ℤ, Recta Numérica y Ley de Signos',
    subject: 'Matemática',
    date: '2026-11-09',
    time: '07:15 AM',
    type: 'PARCIAL',
    weightPercentage: 20,
    location: 'Aula 1A',
    topics: ['Ubicación en la recta real', 'Valor absoluto |x|', 'Suma y resta de signos iguales/diferentes', 'Multiplicación en ℤ'],
    notes: 'Evaluación individual en hojas de examen. Estudiar la diferencia entre sumar negativos y multiplicarlos.',
  },
  {
    id: 'andres-mat-03',
    title: 'Construcción Geométrica y Carta Navideña Matemática',
    subject: 'Matemática',
    date: '2026-11-16',
    time: '07:15 AM',
    type: 'PROYECTO',
    weightPercentage: 20,
    location: 'Aula 1A',
    topics: ['Trazado con regla y compás', 'Ángulos rectos y polígonos regulares', 'Cálculo de perímetros'],
    notes: 'Diseño navideño geométrico en cartulina de hilo con dedicatoria familiar.',
  },
  {
    id: 'andres-mat-04',
    title: 'Prueba Escrita: Potenciación en ℤ, Propiedades, m.c.m. y M.C.D.',
    subject: 'Matemática',
    date: '2026-11-24',
    time: '07:15 AM',
    type: 'PARCIAL',
    weightPercentage: 20,
    location: 'Aula 1A',
    topics: ['Potencia de base negativa', 'Producto y cociente de potencias de igual base', 'Descomposición en factores primos'],
    notes: 'Preparar ejercicios de descomposición simultánea para hallar el mínimo común múltiplo.',
  },
  {
    id: 'andres-mat-05',
    title: 'Revisión General de Cuaderno de Matemáticas con Rúbrica de Rasgos',
    subject: 'Matemática',
    date: '2026-11-30',
    time: '07:15 AM',
    type: 'ENTREGA',
    weightPercentage: 20,
    location: 'Aula 1A',
    topics: ['Ejercicios diarios resueltos', 'Correcciones en tinta verde', 'Puntualidad y pulcritud'],
    notes: 'Revisión de cuaderno completo rubricada por el docente.',
  },

  // --- CASTELLANO Y LITERATURA ---
  {
    id: 'andres-cas-01',
    title: 'Entrega de CV Literario y Biografías Periodísticas',
    subject: 'Castellano',
    date: '2026-10-23',
    time: '11:15 AM',
    type: 'ENTREGA',
    weightPercentage: 30,
    location: 'Aula 1A',
    topics: ['Estructura del currículum vitae', 'Redacción de perfil profesional', 'Entrevista periodística'],
    scoreObtained: 20,
    notes: 'Nota perfecta: 20/20. Caligrafía y redacción impecables.',
  },
  {
    id: 'andres-cas-02',
    title: 'Juego Didáctico de Gramática: Sujeto, Predicado y Acentos',
    subject: 'Castellano',
    date: '2026-11-06',
    time: '11:15 AM',
    type: 'PROYECTO',
    weightPercentage: 20,
    location: 'Aula 1A',
    topics: ['Oración bimembre', 'Núcleo del sujeto y predicado', 'Clasificación de palabras: agudas, graves y esdrújulas'],
    notes: 'Presentación de juego de mesa (lotería o ruleta gramatical) en equipos.',
  },
  {
    id: 'andres-cas-03',
    title: 'Póster Ilustrado: Carisma Consolación y Valores Éticos',
    subject: 'Castellano',
    date: '2026-11-13',
    time: '11:15 AM',
    type: 'PROYECTO',
    weightPercentage: 20,
    location: 'Aula 1A',
    topics: ['Mensaje persuasivo', 'Tipografía y jerarquía textual', 'Valores de la Consolación'],
    notes: 'Afiche tamaño pliego con lema motivacional y figuras recortadas o dibujadas.',
  },
  {
    id: 'andres-cas-04',
    title: 'Prueba de Comprensión Lectora: Cuento "Barrabás" de Arturo Uslar Pietri',
    subject: 'Castellano',
    date: '2026-11-27',
    time: '11:15 AM',
    type: 'PARCIAL',
    weightPercentage: 20,
    location: 'Aula 1A',
    topics: ['Argumento de la obra', 'Análisis psicológico de Barrabás', 'Figuras literarias: metáfora y símil', 'Contexto bíblico y literario'],
    notes: 'Lectura atenta del cuento original de 1928 de la antología "Barrabás y otros relatos".',
  },
  {
    id: 'andres-cas-05',
    title: 'Revisión Integral de Cuaderno de Castellano y Ortografía',
    subject: 'Castellano',
    date: '2026-12-04',
    time: '11:15 AM',
    type: 'ENTREGA',
    weightPercentage: 10,
    location: 'Aula 1A',
    topics: ['Dictados semanales', 'Caligrafía Palmer o script', 'Márgenes reglamentarios y encabezado'],
    notes: 'Cierre del I Momento en lengua materna.',
  },

  // --- DISEÑO DIGITAL ---
  {
    id: 'andres-dd-01',
    title: 'Mapa Mental: Elementos de la Comunicación Visual',
    subject: 'Diseño',
    date: '2026-10-15',
    time: '10:30 AM',
    type: 'ENTREGA',
    weightPercentage: 20,
    location: 'Laboratorio de Informática',
    topics: ['Punto, línea, plano y textura', 'Signos y símbolos visuales'],
    scoreObtained: 19,
    notes: 'Entregado en físico y digital.',
  },
  {
    id: 'andres-dd-02',
    title: 'Taller Práctico: Lenguaje Visual y Retículas Básicas',
    subject: 'Diseño',
    date: '2026-11-05',
    time: '10:30 AM',
    type: 'TALLER',
    weightPercentage: 20,
    location: 'Laboratorio de Informática',
    topics: ['Equilibrio simétrico y asimétrico', 'Márgenes y alineación', 'Jerarquía visual'],
    notes: 'Trabajo en láminas de block de dibujo formato 1/8.',
  },
  {
    id: 'andres-dd-03',
    title: 'Proyecto Práctico: Teoría del Color, Círculo Cromático y Armonía',
    subject: 'Diseño',
    date: '2026-11-19',
    time: '10:30 AM',
    type: 'PROYECTO',
    weightPercentage: 20,
    location: 'Laboratorio de Informática',
    topics: ['Colores primarios, secundarios y terciarios', 'Contraste cálido-frío', 'Aplicación con pintura o digital'],
    notes: 'Círculo cromático de 12 tonos bien delimitado.',
  },
  {
    id: 'andres-dd-04',
    title: 'Taller Práctico: Manejo de Herramientas Digitales y Formas Vectoriales',
    subject: 'Diseño',
    date: '2026-11-26',
    time: '10:30 AM',
    type: 'TALLER',
    weightPercentage: 20,
    location: 'Laboratorio de Informática',
    topics: ['Software de diseño vectorial', 'Herramientas de selección, pluma básica y rectángulos'],
    notes: 'Creación de un isotipo geométrico personal.',
  },
  {
    id: 'andres-dd-05',
    title: 'Entrega Final de Block de Dibujo y Bocetos Completos',
    subject: 'Diseño',
    date: '2026-12-03',
    time: '10:30 AM',
    type: 'ENTREGA',
    weightPercentage: 20,
    location: 'Aula 1A',
    topics: ['Todos los bocetos del I Momento', 'Acabado y limpieza', 'Firma y fecha'],
    notes: 'Revisión final de la carpeta de proyectos.',
  },

  // --- EDUCACIÓN EN LA FE ---
  {
    id: 'andres-fe-01',
    title: 'Taller Formativo: Jornada Mundial de las Misiones (DOMUND)',
    subject: 'Castellano',
    date: '2026-10-16',
    time: '08:45 AM',
    type: 'TALLER',
    weightPercentage: 25,
    location: 'Capilla del Colegio',
    topics: ['Sentido de la misión católica', 'Solidaridad con los pueblos desfavorecidos'],
    scoreObtained: 20,
    notes: 'Participación destacada en la reflexión grupal.',
  },
  {
    id: 'andres-fe-02',
    title: 'Diario de Gratitud y Reflexión Comunitaria',
    subject: 'Castellano',
    date: '2026-11-19',
    time: '08:45 AM',
    type: 'ENTREGA',
    weightPercentage: 25,
    location: 'Aula 1A',
    topics: ['Agradecimiento cotidiano en familia', 'Empatía con los compañeros'],
    notes: 'Cuadernillo personal decorado a mano.',
  },
  {
    id: 'andres-fe-03',
    title: 'Taller Práctico: Vocación, Solidaridad y Servicio al Prójimo',
    subject: 'Castellano',
    date: '2026-11-20',
    time: '08:45 AM',
    type: 'TALLER',
    weightPercentage: 25,
    location: 'Aula 1A',
    topics: ['Testimonio de Santa María Rosa Molas', 'Carisma de la Consolación'],
    notes: 'Lectura de pasajes bíblicos y compromiso de servicio.',
  },
  {
    id: 'andres-fe-04',
    title: 'Evaluación Actitudinal, Asistencia y Convivencia Escolar',
    subject: 'Castellano',
    date: '2026-12-02',
    time: '08:45 AM',
    type: 'TALLER',
    weightPercentage: 25,
    location: 'Aula 1A',
    topics: ['Comportamiento fraterno', 'Respeto al uniforme y a las normas de convivencia'],
    notes: 'Evaluación continua del profesor de pastoral.',
  },

  // --- MATERIA PRÁCTICA (Informática / Computación) ---
  {
    id: 'andres-inf-01',
    title: 'Línea de Tiempo: Evolución de las Computadoras e Internet',
    subject: 'Matemática',
    date: '2026-10-23',
    time: '12:00 PM',
    type: 'ENTREGA',
    weightPercentage: 20,
    location: 'Laboratorio de Computación',
    topics: ['Generaciones de computadoras (válvulas a microprocesadores)', 'Historia de la web'],
    scoreObtained: 20,
    notes: 'Presentación interactiva en diapositivas.',
  },
  {
    id: 'andres-inf-02',
    title: 'Prueba Estructurada: Hardware, Software y Periféricos',
    subject: 'Matemática',
    date: '2026-11-02',
    time: '12:00 PM',
    type: 'PARCIAL',
    weightPercentage: 20,
    location: 'Laboratorio de Computación',
    topics: ['CPU, Memoria RAM y Disco Duro', 'Periféricos de entrada y salida', 'Sistemas operativos'],
    notes: 'Prueba escrita de opciones múltiples y correspondencia.',
  },
  {
    id: 'andres-inf-03',
    title: 'Prueba Práctica: Procesamiento de Textos y Documentos Formales',
    subject: 'Matemática',
    date: '2026-11-17',
    time: '12:00 PM',
    type: 'TALLER',
    weightPercentage: 20,
    location: 'Laboratorio de Computación',
    topics: ['Formato de párrafos, tipografía y sangría', 'Inserción de tablas e imágenes', 'Normas de presentación'],
    notes: 'Ejercicio directo en máquina en la sala de computación.',
  },
  {
    id: 'andres-inf-04',
    title: 'Prueba Práctica: Manejo de Carpetas, Archivos y Sistema Operativo',
    subject: 'Matemática',
    date: '2026-11-24',
    time: '12:00 PM',
    type: 'TALLER',
    weightPercentage: 20,
    location: 'Laboratorio de Computación',
    topics: ['Creación de directorios en árbol', 'Extensiones de archivos (.docx, .pdf, .jpg)', 'Copias de seguridad'],
    notes: 'Evaluación práctica individual.',
  },
  {
    id: 'andres-inf-05',
    title: 'Prueba Práctica: Hojas de Cálculo Básicas y Gráficos',
    subject: 'Matemática',
    date: '2026-12-01',
    time: '12:00 PM',
    type: 'TALLER',
    weightPercentage: 20,
    location: 'Laboratorio de Computación',
    topics: ['Celdas, filas y columnas', 'Fórmulas sencillas: SUMA, PROMEDIO', 'Generación de gráficos de barras'],
    notes: 'Examen final práctico en el computador.',
  },
];

// =====================================================================
// 2. TAREAS Y RECORDATORIOS CON BACKWARD SCHEDULING
// =====================================================================
export const ANDRES_DEFAULT_STUDY_TASKS: TaskItem[] = [
  {
    id: 101,
    title: 'Repasar para el Taller de Biología: Instrumentos de Laboratorio & Menisco',
    subject: 'Biología',
    priority: 'ALTA',
    dueDate: '2026-11-04',
    completed: false,
  },
  {
    id: 102,
    title: 'Preparar bata blanca, pañito y libreta para la práctica de laboratorio',
    subject: 'Biología',
    priority: 'ALTA',
    dueDate: '2026-11-04',
    completed: false,
  },
  {
    id: 103,
    title: 'Estudiar conversiones de tiempo y distancia para Taller de Física en Parejas',
    subject: 'Física',
    priority: 'ALTA',
    dueDate: '2026-11-05',
    completed: false,
  },
  {
    id: 104,
    title: 'Resolver 10 ejercicios de suma y resta con enteros (ℤ) en la recta numérica',
    subject: 'Matemática',
    priority: 'ALTA',
    dueDate: '2026-11-07',
    completed: false,
  },
  {
    id: 105,
    title: 'Simulacro de evaluación: Despeje de incógnitas x con la balanza y signos en ℤ',
    subject: 'Matemática',
    priority: 'ALTA',
    dueDate: '2026-11-08',
    completed: false,
  },
  {
    id: 106,
    title: 'Diseñar el borrador del Póster del Carisma Consolación con lápiz y regla',
    subject: 'Castellano',
    priority: 'MEDIA',
    dueDate: '2026-11-11',
    completed: false,
  },
  {
    id: 107,
    title: 'Revisión nocturna de 2 minutos: cuadernos firmados y uniforme impecable',
    subject: 'Castellano',
    priority: 'MEDIA',
    dueDate: '2026-11-03',
    completed: true,
  },
];

export const ANDRES_DEFAULT_STUDY_REMINDERS: StudyReminder[] = [
  {
    id: 'rem-andres-01',
    title: 'Laboratorio de Biología MAÑANA: Llevar bata obligatoria y probeta de plástico',
    subject: 'Biología',
    dueDate: '2026-11-04',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'rem-andres-02',
    title: 'Taller de Física en Parejas (Prof. Gonzales): Repasar factores de conversión',
    subject: 'Física',
    dueDate: '2026-11-05',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'rem-andres-03',
    title: 'Prueba de Matemáticas de Números Enteros ℤ: Ley de los signos obligatoria',
    subject: 'Matemática',
    dueDate: '2026-11-08',
    priority: 'ALTA',
    completed: false,
    createdAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'rem-andres-04',
    title: 'Castellano: Lectura del cuento "Barrabás" (capítulos 1 al 3)',
    subject: 'Castellano',
    dueDate: '2026-11-15',
    priority: 'MEDIA',
    completed: false,
    createdAt: '2026-11-01T00:00:00.000Z',
  },
];

// =====================================================================
// 3. GUÍA 1 DECONSTRUIDA: MATEMÁTICAS 1ER AÑO
// =====================================================================
export const ANDRES_MATH_Z_EQUATIONS_GUIDE: DeconstructedAcademicGuide = {
  id: 'andres-math-z-equations',
  userId: ANDRES_PROFILE,
  sourceType: 'document',
  discipline: 'science',
  createdAt: '2026-11-01T00:00:00.000Z',
  guideMetadata: {
    title: 'Números Enteros (ℤ), Ley de los Signos, Potenciación y Ecuaciones con la Balanza',
    area: 'Matemática · 1er Año Bachillerato',
    summary:
      'Guía oficial y explicativa para 1er año de bachillerato. Domina la recta numérica, temperaturas bajo cero y deudas, las reglas para sumar y multiplicar números positivos y negativos sin equivocarte, propiedades de potencias y resolución de ecuaciones de primer grado mediante la analogía de la balanza equilibrada.',
  },
  phenomenonAndTheory: [
    '### UNIDAD I: LOS NÚMEROS ENTEROS (ℤ) EN LA VIDA COTIDIANA',
    'Hasta la primaria solo conocías los números naturales ($\\mathbb{N} = \\{0, 1, 2, 3, \\dots\\}$). Sin embargo, en el mundo real existen situaciones donde los naturales se quedan cortos:',
    '• **Temperaturas bajo cero:** En el Pico Espejo en Mérida la temperatura puede bajar a $-5^\\circ\\text{C}$.',
    '• **Economía y compras:** Si tienes 10 dólares en tu bolsillo pero le debes 15 dólares a la cantina, tu saldo real es $-5$ dólares.',
    '• **Nivel del mar y edificios:** La planta baja es el $0$, los pisos altos son positivos ($+1, +2, +3$), y los sótanos de estacionamiento son negativos ($-1, -2$).',
    '',
    'El conjunto de los **Números Enteros ($\\mathbb{Z}$)** incluye a los enteros negativos, el cero y los enteros positivos:',
    '$$\\mathbb{Z} = \\{ \\dots, -3, -2, -1, 0, +1, +2, +3, \\dots \\}$$',
    '',
    '### REGLA DE ORO PARA SUMAR Y RESTAR EN ℤ (¡CUIDADO CON LA CONFUSIÓN!)',
    'Muchos estudiantes cometen el error de decir "menos por menos da más" al hacer una suma. ¡Eso es solo para multiplicar!',
    '1. **Signos Iguales:** Se suman los valores numéricos y se conserva el mismo signo.',
    '   Ejemplo: $(-5) + (-3) = -8$ (debes 5 y debes 3, en total debes 8).',
    '2. **Signos Distintos:** Se restan los dos números (el mayor menos el menor) y se coloca el signo del que tenga mayor valor absoluto.',
    '   Ejemplo: $(-12) + 20 = +8$ (tienes 20 y pagas 12, te sobran 8).',
    '   Ejemplo: $(+4) + (-10) = -6$ (tienes 4 pero debes 10, quedas debiendo 6).',
    '',
    '### LA LEY DE LOS SIGNOS (EXCLUSIVA PARA MULTIPLICACIÓN Y DIVISIÓN)',
    '• $(+) \\cdot (+) = (+)$  |  Positivo por positivo resulta positivo.',
    '• $(-) \\cdot (-) = (+)$  |  Negativo por negativo resulta positivo (¡el enemigo de mi enemigo es mi amigo!).',
    '• $(+) \\cdot (-) = (-)$  |  Signos contrarios siempre dan negativo.',
    '• $(-) \\cdot (+) = (-)$  |  Signos contrarios siempre dan negativo.',
    '',
    '### PROPIEDADES DE LA POTENCIACIÓN EN ℤ',
    '• **Base negativa con exponente par:** El resultado siempre es positivo. Ejemplo: $(-3)^2 = (-3) \\cdot (-3) = +9$.',
    '• **Base negativa con exponente impar:** El resultado siempre es negativo. Ejemplo: $(-2)^3 = (-2) \\cdot (-2) \\cdot (-2) = -8$.',
    '• **Producto de potencias de igual base:** Se copia la base y se suman los exponentes: $a^m \\cdot a^n = a^{m+n}$.',
    '• **Potencia de una potencia:** Se multiplican los exponentes: $(a^m)^n = a^{m \\cdot n}$.',
    '',
    '### ELIMINACIÓN DE SIGNOS DE AGRUPACIÓN ANIDADOS: ( ), [ ] Y { }',
    'En operaciones largas con enteros se resuelven siempre **de adentro hacia afuera** respetando la jerarquía:',
    '1. **Primero los paréntesis $( )$**, luego los **corchetes $[ ]$** y finalmente las **llaves $\\{ \\}$**.',
    '2. Dentro de cada agrupación se ejecutan **primero multiplicaciones y divisiones** y **después sumas y restas**.',
    '3. Un signo negativo delante de cualquier agrupación cambia el signo del resultado interior: $-(-a) = +a$ y $-(+a) = -a$.',
    '',
    '### ECUACIONES DE 1ER GRADO: EL SECRETO DE LA BALANZA',
    'Una ecuación es una balanza de dos platos perfectamente nivelada. Para encontrar el valor de $x$ sin que la balanza se desequilibre:',
    '> **Cualquier operación que apliques al lado izquierdo, debes aplicarla con la misma fuerza y número al lado derecho.**',
    '• Si un número está sumando a la incógnita, restamos ese mismo número en ambos lados.',
    '• Si un número está multiplicando a la incógnita, dividimos ambos lados entre ese mismo número.',
  ].join('\n'),
  glossary: [
    { term: 'Números Enteros (ℤ)', symbolOrUnit: 'ℤ', definition: 'Conjunto formado por los números naturales, el cero y los opuestos negativos de los naturales.' },
    { term: 'Valor Absoluto', symbolOrUnit: '|x|', definition: 'La distancia desde un número hasta el cero en la recta numérica; siempre es un valor positivo o cero.' },
    { term: 'Opuesto de un número', symbolOrUnit: '-a', definition: 'Número que tiene la misma magnitud pero signo contrario. Su suma siempre da 0: a + (-a) = 0.' },
    { term: 'Ley de los Signos', symbolOrUnit: 'Regla Operativa', definition: 'Norma algebraica que indica que signos iguales al multiplicarse resultan positivos, y signos distintos negativos.' },
    { term: 'Incógnita (x)', symbolOrUnit: 'Variable', definition: 'Valor numérico desconocido en una ecuación que debe encontrarse manteniendo el equilibrio.' },
    { term: 'Despeje', symbolOrUnit: 'Algoritmo', definition: 'Procedimiento de aislar la incógnita aplicando operaciones inversas en ambos miembros de la ecuación.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      {
        name: 'Ley de Multiplicación de Signos',
        latex: '$$(+) \\cdot (+) = + \\quad | \\quad (-) \\cdot (-) = + \\quad | \\quad (+) \\cdot (-) = - \\quad | \\quad (-) \\cdot (+) = -$$',
        application: 'Aplica únicamente al multiplicar o dividir cantidades.',
      },
      {
        name: 'Propiedad de Potencias de Igual Base',
        latex: '$$a^m \\cdot a^n = a^{m+n} \\quad | \\quad \\frac{a^m}{a^n} = a^{m-n} \\quad | \\quad (a^m)^n = a^{m \\cdot n}$$',
        application: 'Simplificación de expresiones con exponentes en ℤ.',
      },
      {
        name: 'Ecuación Canónica de Primer Grado',
        latex: '$$a x + b = c \\implies a x = c - b \\implies x = \\frac{c - b}{a}$$',
        application: 'Despeje paso a paso con la balanza equilibrada.',
      },
    ],
    mnemonicsAndPatterns: [
      'Al sumar: ¿Tengo o debo? Si tengo 10 y debo 14, quedo debiendo 4 (-4).',
      'Exponente par siempre hace al resultado positivo: (-5)^2 = +25.',
      'Comprobación obligatoria: sustituye la x hallada en la ecuación original para verificar que ambos lados den igual.',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Resolución de operaciones combinadas en ℤ con signos',
      problemStatement: 'Calcula el valor numérico de la expresión: $E = -8 + 15 - 20 + 7 - (-6)$.',
      deductiveSteps: [
        '1. Eliminación del doble signo: dos signos negativos seguidos se convierten en positivo: $-(-6) = +6$. La expresión queda: $-8 + 15 - 20 + 7 + 6$.',
        '2. Agrupar todos los positivos: $15 + 7 + 6 = +28$.',
        '3. Agrupar todos los negativos: $(-8) + (-20) = -28$.',
        '4. Efectuar la suma final: $+28 - 28 = 0$.',
      ],
      finalResult: '$E = 0$',
    },
    {
      title: 'Operación combinada larga con paréntesis, corchetes, llaves y productos',
      problemStatement: 'Calcula paso a paso el valor de: $M = 30 - 2 \\cdot \\{ 15 - 3 \\cdot [ (-12) \\div 3 + 7 ] - (-5) \\}$.',
      deductiveSteps: [
        '1. Resolvemos primero el corchete interno respetando la división antes de la suma: $(-12) \\div 3 + 7 = -4 + 7 = +3$.',
        '2. Sustituimos dentro de la llave: $\\{ 15 - 3 \\cdot (+3) - (-5) \\}$. Multiplicamos $3 \\cdot 3 = 9$ y cambiamos $-(-5) = +5$: $\\{ 15 - 9 + 5 \\} = +11$.',
        '3. Multiplicamos la llave por el factor exterior $-2$ (¡nunca restes $30 - 2$ antes de multiplicar!): $30 - 2 \\cdot (+11) = 30 - 22 = +8$.',
      ],
      finalResult: '$M = +8$',
    },
    {
      title: 'Despeje de una Ecuación Lineal mediante la Balanza',
      problemStatement: 'Resuelve la ecuación y comprueba el resultado: $4x + 12 = 36$.',
      deductiveSteps: [
        '1. Queremos dejar sola a la bolsa sorpresa con las $x$. En el lado izquierdo nos estorba el $+12$.',
        '2. Restamos 12 a ambos lados de la balanza: $4x + 12 - 12 = 36 - 12 \\implies 4x = 24$.',
        '3. Ahora el 4 está multiplicando a $x$. Dividimos ambos platos entre 4: $\\frac{4x}{4} = \\frac{24}{4} \\implies x = 6$.',
        '4. Comprobación: Sustituimos $x = 6$ en la ecuación original: $4(6) + 12 = 24 + 12 = 36$. ¡Coincide perfectamente!',
      ],
      finalResult: '$x = 6$',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: 'Decir que -4 - 6 = +10 porque "menos por menos da más".',
      correction: '¡Error muy común! "Menos por menos" SOLO se usa al multiplicar. Si debes 4 bolívares y luego te prestan 6 más, tu deuda aumenta a 10 bolívares: -4 - 6 = -10.',
    },
    {
      trap: 'Olvidar cambiar el signo al pasar un término sumando al otro lado de la igualdad.',
      correction: 'Si tienes x + 8 = 20, para eliminar el 8 debes restar 8 en ambos lados: x = 20 - 8 = 12.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      {
        front: '¿Cuál es el resultado de (-3) · (-7)? Justifica con la ley de signos.',
        back: '+21. Porque al multiplicar dos factores con el mismo signo negativo, el resultado siempre es positivo.',
      },
      {
        front: '¿Cuál es el valor absoluto de |-15| y de |+15|?',
        back: 'Ambos dan 15. El valor absoluto representa la distancia al cero en la recta numérica y nunca es negativo.',
      },
      {
        front: '¿Qué signo tendrá (-2)^5 y por qué?',
        back: 'Tendrá signo negativo (-32), porque la base es negativa y el exponente (5) es un número impar.',
      },
      {
        front: 'En la ecuación 3x = 18, ¿qué operación debes hacer en ambos lados para despejar x?',
        back: 'Dividir ambos lados entre 3, resultando x = 18 / 3 = 6.',
      },
    ],
    cornellSynthesis: {
      cues: [
        'Conjunto ℤ',
        'Suma en ℤ',
        'Multiplicación en ℤ',
        'Potencia exponente par vs impar',
        'Analogía de la balanza',
      ],
      notes: [
        'Los enteros abarcan positivos, el cero y negativos.',
        'Signos iguales se suman y mantienen signo; signos distintos se restan.',
        'Menos por menos da más solo al multiplicar o dividir.',
        'Base negativa a exponente par da positivo; a exponente impar da negativo.',
        'En las ecuaciones, lo que haces en un plato debes hacerlo en el otro.',
      ],
      summary:
        'Los números enteros ℤ permiten cuantificar situaciones cotidianas de pérdida y ganancia. La clave del éxito consiste en no confundir las reglas de suma con la ley de signos de la multiplicación, y resolver ecuaciones paso a paso comprobando siempre la respuesta.',
    },
    conceptMapNodes: 'Números Enteros (ℤ) --> Recta Numérica; ℤ --> Suma y Resta (Signos Iguales vs Distintos); ℤ --> Multiplicación (Ley de Signos); Multiplicación --> Potenciación (Base Negativa); ℤ --> Ecuaciones de 1er Grado (Balanza de Despeje)',
  },
  generatedQuestions: getExpandedGuideQuestions('andres-math-z-equations'),
};

// =====================================================================
// 4. GUÍA 2 DECONSTRUIDA: BIOLOGÍA Y CIENCIAS NATURALES 1ER AÑO
// =====================================================================
export const ANDRES_BIOLOGY_METHOD_LAB_GUIDE: DeconstructedAcademicGuide = {
  id: 'andres-bio-lab-method',
  userId: ANDRES_PROFILE,
  sourceType: 'document',
  discipline: 'science',
  createdAt: '2026-11-01T00:00:00.000Z',
  guideMetadata: {
    title: 'El Método Científico, Instrumentos de Laboratorio Escolar y Estados de la Materia',
    area: 'Biología y Ciencias Naturales · 1er Año',
    summary:
      'Guía completa para las evaluaciones prácticas y escritas de Ciencias Naturales. Conoce los 6 pasos del método científico, las normas de seguridad en el laboratorio, cómo medir volúmenes leyendo el menisco en probetas, el uso del microscopio óptico y los estados y cambios de fase de la materia.',
  },
  phenomenonAndTheory: [
    '### 1. ¿CÓMO INVESTIGAN LOS CIENTÍFICOS? EL MÉTODO CIENTÍFICO',
    'La ciencia no es un conjunto de datos memorizados; es una forma ordenada de hacer preguntas y descubrir verdades comprobables sobre la naturaleza. Consta de 6 pasos rigurosos:',
    '1. **Observación:** Examinar con atención un fenómeno natural utilizando los sentidos o instrumentos especializados.',
    '2. **Planteamiento del Problema:** Formular una pregunta clara y precisa sobre lo observado (por ejemplo: "¿Por qué las plantas crecen más hacia la ventana?").',
    '3. **Formulación de la Hipótesis:** Proponer una posible respuesta o explicación tentativa que se pueda someter a prueba.',
    '4. **Experimentación:** Diseñar y ejecutar un ensayo controlado para verificar o refutar la hipótesis, aislando variables.',
    '5. **Análisis de Resultados:** Recopilar datos cuantitativos y cualitativos, ordenándolos en tablas y gráficos.',
    '6. **Conclusión y Comunicación:** Determinar si la hipótesis fue confirmada o rechazada y compartir los descubrimientos.',
    '',
    '### 2. NORMAS DE BIOSEGURIDAD EN EL LABORATORIO ESCOLAR',
    'El laboratorio de ciencias es un espacio de descubrimiento pero exige respeto absoluto:',
    '• **Bata de laboratorio obligatoria:** De algodón, manga larga y abotonada para proteger la piel y el uniforme.',
    '• **Prohibido comer o beber:** Jamás ingerir alimentos ni llevarse lápices a la boca en el laboratorio.',
    '• **Oler sustancias con precaución:** Nunca acerques la nariz directamente al frasco; abanica suavemente el vapor con la mano hacia tu rostro.',
    '• **Manejo de material de vidrio:** Desechar piezas rotas en recipientes especiales y reportar cualquier derrame al profesor.',
    '',
    '### 3. INSTRUMENTOS BÁSICOS DEL LABORATORIO',
    '• **Material Volumétrico (para medir líquidos):**',
    '   – *Probeta graduada:* Cilindro de vidrio con base ancha y escala marcada para medir volúmenes exactos.',
    '   – *Pipeta:* Tubo delgado de vidrio para transferir volúmenes muy pequeños de líquido gota a gota.',
    '   – *Vaso de precipitado (Beaker):* Recipiente para calentar y mezclar líquidos (no es para medir con alta precisión).',
    '• **Lectura del Menisco:** Cuando un líquido está dentro de un tubo estrecho, su superficie se curva. La lectura correcta se realiza colocando los ojos a la misma altura de la superficie y tomando como referencia el **fondo de la curva** (menisco cóncavo en el agua).',
    '• **El Microscopio Óptico:** Instrumento que permite observar estructuras microscópicas que no se ven a simple vista. Consta de lente ocular, tubo, revólver con objetivos (4x, 10x, 40x), platina con pinzas, diafragma, fuente de luz y tornillos macrométrico (enfoque rápido) y micrométrico (enfoque fino).',
    '',
    '### 4. ESTADOS Y CAMBIOS DE FASE DE LA MATERIA',
    'La materia es todo lo que ocupa un lugar en el espacio y tiene masa. Se presenta principalmente en tres estados:',
    '• **Sólido:** Forma y volumen definidos; moléculas muy unidas con poco movimiento.',
    '• **Líquido:** Volumen definido pero forma variable (adopta la del recipiente); moléculas con libertad para deslizarse.',
    '• **Gaseoso:** Sin forma ni volumen fijos; moléculas muy separadas y en constante movimiento veloz.',
    '• **Cambios de fase:**',
    '   – *Fusión:* De sólido a líquido (hielo que se derrite).',
    '   – *Solidificación:* De líquido a sólido (agua que se congela).',
    '   – *Evaporación:* De líquido a gas (agua que hierve).',
    '   – *Condensación:* De gas a líquido (gotitas en el espejo del baño).',
    '   – *Sublimación:* Paso directo de sólido a gas sin pasar por líquido (hielo seco, naftalina).',
  ].join('\n'),
  glossary: [
    { term: 'Hipótesis', symbolOrUnit: 'Ciencia', definition: 'Explicación tentativa a un problema que debe ser puesta a prueba mediante la experimentación.' },
    { term: 'Menisco', symbolOrUnit: 'Medición', definition: 'Curvatura en la superficie superior de una columna de líquido provocada por la tensión superficial y adherencia al vidrio.' },
    { term: 'Probeta Graduada', symbolOrUnit: 'Volumen (mL)', definition: 'Instrumento volumétrico cilíndrico graduado utilizado para medir volúmenes de líquidos con exactitud.' },
    { term: 'Microscopio Óptico', symbolOrUnit: 'Instrumento', definition: 'Aparato óptico provisto de lentes de aumento para observar organismos unicelulares y tejidos celulares.' },
    { term: 'Tornillo Micrométrico', symbolOrUnit: 'Enfoque', definition: 'Control mecánico del microscopio que desplaza suavemente la platina para lograr una imagen nítida.' },
    { term: 'Sublimación', symbolOrUnit: 'Fase', definition: 'Cambio de estado de la materia en el que un sólido se transforma directamente en gas sin pasar por el estado líquido.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      {
        name: 'Fórmula de Densidad',
        latex: '$$\\rho = \\frac{m}{V}$$',
        application: 'Cálculo de la masa contenida en un volumen de sustancia (unidades: g/cm³ o g/mL).',
      },
      {
        name: 'Medición de Volumen por Desplazamiento',
        latex: '$$V_{\\text{sólido}} = V_{\\text{final}} - V_{\\text{inicial}}$$',
        application: 'Determinar el volumen de un cuerpo irregular sumergiéndolo en agua dentro de una probeta.',
      },
    ],
    mnemonicsAndPatterns: [
      'Menisco: mira siempre a la altura de los ojos en la base de la U (fondo de la curva).',
      'Pasos del método científico: O-P-H-E-A-C (Observar, Plantear, Hipotetizar, Experimentar, Analizar, Concluir).',
      'El tornillo macrométrico se usa primero para ubicar; el micrométrico para afinar.',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Medición del volumen de una roca irregular con probeta',
      problemStatement:
        'Tienes una probeta con 50 mL de agua. Al introducir una piedra pequeña, el nivel del agua asciende hasta marcar 72 mL. ¿Cuál es el volumen real de la piedra?',
      deductiveSteps: [
        '1. Anotar el volumen inicial de agua limpia: $V_{\\text{inicial}} = 50\\,\\text{mL}$.',
        '2. Anotar el volumen final con la piedra sumergida: $V_{\\text{final}} = 72\\,\\text{mL}$.',
        '3. Aplicar el principio de Arquímedes por desplazamiento de líquido: $V_{\\text{piedra}} = V_{\\text{final}} - V_{\\text{inicial}}$.',
        '4. Efectuar la resta: $V_{\\text{piedra}} = 72\\,\\text{mL} - 50\\,\\text{mL} = 22\\,\\text{mL}$.',
      ],
      finalResult: 'El volumen de la piedra es de 22 mL (equivalente a 22 cm³).',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: 'Leer el volumen en la probeta desde arriba mirando hacia abajo.',
      correction: 'Esto produce el "error de paralaje". Siempre debes agacharte para que tu mirada quede en una línea horizontal exacta con el fondo del menisco.',
    },
    {
      trap: 'Pensar que si un experimento no coincide con tu hipótesis, el experimento "salió mal".',
      correction: '¡Falso! En la ciencia, refutar una hipótesis es un gran avance porque descarta un camino incorrecto y abre la puerta a nuevas preguntas.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      {
        front: '¿Cuál es la diferencia entre el tornillo macrométrico y el micrométrico del microscopio?',
        back: 'El macrométrico realiza movimientos rápidos y amplios para acercar la muestra, mientras que el micrométrico realiza ajustes milimétricos muy lentos para lograr el enfoque nítido.',
      },
      {
        front: '¿Cómo se llama el cambio directo de estado de gas a líquido?',
        back: 'Condensación (ejemplo: el vapor de agua en el aire que forma gotitas en un vaso frío).',
      },
      {
        front: '¿Cuál es la regla para oler una sustancia química en el laboratorio?',
        back: 'Nunca acercar la nariz al recipiente; se debe abanicar suavemente el vapor con la mano hacia la nariz manteniendo distancia.',
      },
      {
        front: '¿Qué es una hipótesis científica?',
        back: 'Una posible respuesta o explicación tentativa a un problema observado que puede ser puesta a prueba mediante experimentos.',
      },
    ],
    cornellSynthesis: {
      cues: [
        'Método Científico',
        'Bioseguridad',
        'Probeta y Menisco',
        'Partes del Microscopio',
        'Cambios de Fase',
      ],
      notes: [
        'El método científico sigue 6 pasos lógicos e iterativos.',
        'La bata de laboratorio es obligatoria para proteger cuerpo y ropa.',
        'El menisco del agua se mide por la parte inferior de la curva.',
        'El microscopio amplía la imagen mediante el sistema de lentes ocular-objetivo.',
        'Sólido, líquido y gas cambian por ganancia o pérdida de calor.',
      ],
      summary:
        'La ciencia escolar enseña el rigor experimental. Dominar la lectura del menisco en probetas, el uso seguro de reactivos y el microscopio garantiza evaluaciones prácticas exitosas en el laboratorio de 1er año.',
    },
    conceptMapNodes: 'Método Científico --> Observación --> Hipótesis --> Experimentación --> Conclusión; Laboratorio --> Bioseguridad (Bata, No Comer); Laboratorio --> Instrumentos (Probeta, Menisco, Microscopio); Materia --> Estados (Sólido, Líquido, Gas) --> Cambios de Fase (Fusión, Condensación, Sublimación)',
  },
  generatedQuestions: getExpandedGuideQuestions('andres-bio-lab-method'),
};

// =====================================================================
// 5. GUÍA 3 DECONSTRUIDA: FÍSICA 1ER AÑO (PROF. ANTONIO GONZALES)
// =====================================================================
export const ANDRES_PHYSICS_MACHINES_GUIDE: DeconstructedAcademicGuide = {
  id: 'andres-phys-machines-units',
  userId: ANDRES_PROFILE,
  sourceType: 'document',
  discipline: 'science',
  createdAt: '2026-11-01T00:00:00.000Z',
  guideMetadata: {
    title: 'Historia de la Física, Medición de Magnitudes y Máquinas Simples',
    area: 'Física · 1er Año Bachillerato (Prof. Antonio Gonzales)',
    summary:
      'Guía oficial para la cátedra de Física de 1er año. Recorrido histórico desde Galileo y Newton, el Sistema Internacional de Unidades (SI), conversión de unidades de longitud y tiempo, y el funcionamiento de las máquinas simples: ley de la palanca (1er, 2do y 3er género) y poleas.',
  },
  phenomenonAndTheory: [
    '### 1. ¿QUÉ ES LA FÍSICA Y CÓMO NACIÓ?',
    'La Física es la ciencia fundamental que estudia la materia, la energía, el espacio, el tiempo y las interacciones que gobiernan el universo. No nació en un laboratorio moderno, sino del asombro humano:',
    '• **Antigüedad (Aristóteles):** Los filósofos griegos creían que las cosas caían porque buscaban su "lugar natural" en el suelo, y que los objetos pesados caían más rápido que los livianos.',
    '• **El Nacimiento de la Física Moderna (Galileo Galilei):** En el siglo XVII, Galileo desafió la creencia aristotélica lanzando bolas de distinto peso y demostró que todos los cuerpos caen con la misma aceleración si no hay resistencia del aire.',
    '• **Isaac Newton:** Formuló la ley de gravitación universal y las tres leyes del movimiento, unificando la física de la Tierra con la de los astros en el cielo.',
    '',
    '### 2. MAGNITUDES FÍSICAS Y EL SISTEMA INTERNACIONAL (SI)',
    'Una **magnitud física** es cualquier propiedad de un cuerpo o fenómeno que se puede medir objetivamente con un número y una unidad.',
    '• **Magnitudes Fundamentales:**',
    '   – *Longitud:* Metro (m).',
    '   – *Masa:* Kilogramo (kg).',
    '   – *Tiempo:* Segundo (s).',
    '• **Magnitudes Derivadas:** Se obtienen combinando magnitudes fundamentales:',
    '   – *Velocidad:* Distancia entre tiempo (m/s).',
    '   – *Área:* Largo por ancho (m²).',
    '   – *Volumen:* Largo por ancho por alto (m³).',
    '',
    '### FACTORES DE CONVERSIÓN RÁPIDOS',
    '• **Longitud:**',
    '   – $1\\,\\text{kilómetro (km)} = 1000\\,\\text{metros (m)}$.',
    '   – $1\\,\\text{metro (m)} = 100\\,\\text{centímetros (cm)}$.',
    '• **Tiempo:**',
    '   – $1\\,\\text{hora (h)} = 60\\,\\text{minutos (min)}$.',
    '   – $1\\,\\text{minuto (min)} = 60\\,\\text{segundos (s)}$.',
    '   – $1\\,\\text{hora (h)} = 3600\\,\\text{segundos (s)}$ ($60 \\times 60$).',
    '',
    '### 3. MÁQUINAS SIMPLES: MULTIPLICANDO NUESTRA FUERZA',
    'Una máquina simple es un dispositivo mecánico elemental que cambia la dirección o la magnitud de una fuerza, facilitando el trabajo humano.',
    '• **La Palanca:** Consiste en una barra rígida que oscila sobre un punto de apoyo o **fulcro**.',
    '   – **Potencia ($P$):** La fuerza que nosotros aplicamos.',
    '   – **Resistencia ($R$):** La carga o peso que deseamos mover.',
    '   – **Brazo de potencia ($d_p$):** Distancia desde el fulcro hasta donde aplicamos la fuerza.',
    '   – **Brazo de resistencia ($d_r$):** Distancia desde el fulcro hasta la carga.',
    '',
    '### LEY DE LA PALANCA (EQUILIBRIO ROTACIONAL)',
    'Para que una palanca esté en perfecto equilibrio, el producto de la potencia por su distancia debe ser igual al producto de la resistencia por la suya:',
    '$$P \\cdot d_p = R \\cdot d_r$$',
    '> **Conclusión fundamental:** Mientras más largo sea el brazo de potencia ($d_p$), menor será la fuerza ($P$) que tendrás que hacer para levantar una carga pesada.',
    '',
    '### LOS TRES GÉNEROS DE PALANCA',
    '1. **Primer Género (Punto de Apoyo en el medio):** Balancín infantil, tijeras, tenazas. ($P - \\text{Fulcro} - R$).',
    '2. **Segundo Género (Resistencia en el medio):** Carretilla, cascanueces. Siempre ahorra fuerza porque $d_p > d_r$. ($\\text{Fulcro} - R - P$).',
    '3. **Tercer Género (Potencia en el medio):** Pinzas de cejas, caña de pescar, brazo humano. Aumenta la velocidad y el alcance, aunque no ahorra fuerza. ($\\text{Fulcro} - P - R$).',
    '',
    '• **Poleas:**',
    '   – *Polea Fija:* No ahorra fuerza ($P = R$), pero cambia la dirección del esfuerzo (es más fácil tirar hacia abajo aprovechando nuestro propio peso corporal).',
    '   – *Polea Móvil:* Reduce la fuerza necesaria exactamente a la mitad: $P = \\frac{R}{2}$.',
  ].join('\n'),
  glossary: [
    { term: 'Magnitud Física', symbolOrUnit: 'SI', definition: 'Toda propiedad medible de un objeto o fenómeno físico a la que se le asigna un número y una unidad.' },
    { term: 'Fulcro', symbolOrUnit: 'Punto de Apoyo', definition: 'El eje inmóvil sobre el cual gira o pivota libremente una barra rígida de palanca.' },
    { term: 'Potencia (P)', symbolOrUnit: 'Fuerza aplicada (N)', definition: 'La fuerza que aplica el usuario o motor para accionar la máquina simple.' },
    { term: 'Resistencia (R)', symbolOrUnit: 'Carga (N)', definition: 'La fuerza o peso que se opone al movimiento y que la máquina busca vencer o desplazar.' },
    { term: 'Ventaja Mecánica', symbolOrUnit: 'Adimensional', definition: 'Razón entre la resistencia vencida y la potencia aplicada (VM = R / P).' },
    { term: 'Polea Fija', symbolOrUnit: 'Máquina', definition: 'Rueda acanalada fija a un soporte que no multiplica la fuerza pero desvía la dirección de la cuerda.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      {
        name: 'Ley de Equilibrio de la Palanca',
        latex: '$$P \\cdot d_p = R \\cdot d_r$$',
        application: 'Cálculo de la fuerza requerida o distancia necesaria para levantar un objeto con una palanca.',
      },
      {
        name: 'Conversión de Horas a Segundos',
        latex: '$$t\\,\\text{[s]} = t\\,\\text{[h]} \\times 3600\\,\\frac{\\text{s}}{\\text{h}}$$',
        application: 'Conversión estándar al Sistema Internacional.',
      },
      {
        name: 'Fuerza en Polea Móvil Simple',
        latex: '$$P = \\frac{R}{2}$$',
        application: 'Cálculo del esfuerzo necesario para izar una carga usando una polea móvil.',
      },
    ],
    mnemonicsAndPatterns: [
      'Los tres géneros de palanca: PAR (1º Apoyo en el medio, 2º Resistencia en el medio, 3º Potencia en el medio).',
      '1 hora siempre equivale a 3600 segundos (nunca a 60 ni a 100).',
      'A mayor brazo de palanca, menos sudor te cuesta levantar el peso.',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Equilibrio de niños en un subibaja (Palanca de 1er Género)',
      problemStatement:
        'Andrés pesa $R = 40\\,\\text{kg}$ y se sienta a $d_r = 1.5\\,\\text{m}$ del fulcro del balancín. Su hermanito menor pesa $P = 20\\,\\text{kg}$. ¿A qué distancia del centro ($d_p$) debe sentarse el hermanito para que el subibaja quede en perfecto equilibrio horizontal?',
      deductiveSteps: [
        '1. Identificar datos conocidos: $R = 40\\,\\text{kg}$, $d_r = 1.5\\,\\text{m}$, $P = 20\\,\\text{kg}$.',
        '2. Plantear la Ley de la Palanca: $P \\cdot d_p = R \\cdot d_r$.',
        '3. Despejar la distancia del hermanito ($d_p$): $d_p = \\frac{R \\cdot d_r}{P}$.',
        '4. Sustituir valores: $d_p = \\frac{40 \\times 1.5}{20} = \\frac{60}{20} = 3\\,\\text{m}$.',
      ],
      finalResult: 'El hermanito menor debe sentarse exactamente a 3 metros del centro.',
    },
    {
      title: 'Conversión de tiempo de horas a segundos',
      problemStatement: 'Un automóvil viaja durante 2.5 horas por la autopista. ¿A cuántos segundos equivale ese tiempo?',
      deductiveSteps: [
        '1. Factor de conversión conocido: $1\\,\\text{h} = 3600\\,\\text{s}$.',
        '2. Multiplicar las horas por 3600: $2.5 \\times 3600$.',
        '3. Cálculo mental: $2 \\times 3600 = 7200$, y $0.5 \\times 3600 = 1800$. Suma: $7200 + 1800 = 9000$.',
      ],
      finalResult: '$2.5\\,\\text{horas} = 9000\\,\\text{segundos}$.',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: 'Creer que una polea fija reduce la mitad del peso.',
      correction: '¡Falso! La polea fija no reduce ni un solo gramo de fuerza; únicamente cambia la dirección de la cuerda para jalar más cómodamente.',
    },
    {
      trap: 'Multiplicar por 60 para convertir horas a segundos.',
      correction: 'Una hora tiene 60 minutos, pero cada minuto tiene 60 segundos. Por tanto, una hora tiene 60 × 60 = 3600 segundos.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      {
        front: '¿Cuáles son las tres magnitudes fundamentales del Sistema Internacional (SI) y sus unidades?',
        back: 'Longitud en metros (m), masa en kilogramos (kg) y tiempo en segundos (s).',
      },
      {
        front: '¿Qué elemento se encuentra en el medio en una palanca de 2do género?',
        back: 'La Resistencia (carga). Ejemplo clásico: la carretilla de construcción.',
      },
      {
        front: 'Escribe la fórmula matemática de la Ley de la Palanca.',
        back: 'P · dp = R · dr (Potencia multiplicada por su brazo es igual a Resistencia multiplicada por su brazo).',
      },
      {
        front: '¿A cuántos segundos equivalen 45 minutos?',
        back: '45 × 60 = 2700 segundos.',
      },
    ],
    cornellSynthesis: {
      cues: [
        'Nacimiento de la física',
        'Magnitudes SI',
        'Ley de la Palanca',
        'Géneros 1, 2 y 3',
        'Polea fija vs móvil',
      ],
      notes: [
        'Galileo y Newton fundaron el método experimental y las leyes del movimiento.',
        'Metro, kilogramo y segundo forman el sistema métrico mks.',
        'P · dp = R · dr garantiza el equilibrio en el balancín.',
        'La mnemotecnia PAR indica qué elemento está en el centro (1º Apoyo, 2º Resistencia, 3º Potencia).',
        'La polea móvil divide el peso entre dos; la polea fija solo cambia el ángulo.',
      ],
      summary:
        'La física escolar de 1er año sienta las bases del pensamiento lógico mediante la observación del movimiento, la medición rigurosa de magnitudes en unidades internacionales y el aprovechamiento de las máquinas simples.',
    },
    conceptMapNodes: 'Física 1er Año --> Historia (Galileo, Newton); Física --> Magnitudes SI (Metro, Kilogramo, Segundo); Magnitudes --> Conversiones (km a m, h a s); Física --> Máquinas Simples (Palancas, Poleas); Palancas --> Ley (P·dp = R·dr) --> 3 Géneros (1º Apoyo, 2º Resistencia, 3º Potencia)',
  },
  generatedQuestions: getExpandedGuideQuestions('andres-phys-machines-units'),
};

// =====================================================================
// 6. GUÍA 4 DECONSTRUIDA: CASTELLANO Y LITERATURA 1ER AÑO
// =====================================================================
export const ANDRES_SPANISH_BARRABAS_GUIDE: DeconstructedAcademicGuide = {
  id: 'andres-cas-barrabas-grammar',
  userId: ANDRES_PROFILE,
  sourceType: 'document',
  discipline: 'design',
  createdAt: '2026-11-01T00:00:00.000Z',
  guideMetadata: {
    title: 'Sintaxis de la Oración Simple, Acentuación y Análisis Literario de "Barrabás" (Uslar Pietri)',
    area: 'Castellano y Literatura · 1er Año',
    summary:
      'Guía oficial para Castellano de 1er año de bachillerato. Descompón oraciones bimembres (sujeto, predicado, objeto directo e indirecto), domina las reglas de acentuación de agudas, graves y esdrújulas, y analiza a fondo el argumento, personajes y reflexiones morales del célebre cuento "Barrabás" de Arturo Uslar Pietri.',
  },
  phenomenonAndTheory: [
    '### 1. LA ORACIÓN BIMEMBRE: SUJETO Y PREDICADO',
    'Una oración bimembre es aquella que tiene dos miembros o componentes fundamentales que concuerdan en número y persona:',
    '• **El Sujeto (S):** Es la persona, animal o cosa de quien se dice algo en la oración.',
    '   – *Núcleo del Sujeto (NS):* Es siempre un sustantivo o pronombre. Ejemplo: "Los **estudiantes** leen un cuento".',
    '   – *Modificador Directo (MD):* Artículos y adjetivos que acompañan directamente al sustantivo sin preposición (Ej: "**El** gato **negro**").',
    '• **El Predicado (P):** Es todo lo que se dice o predica sobre el sujeto.',
    '   – *Núcleo del Predicado (NP):* Es siempre un **verbo conjugado** (Ej: "Andrés **estudió** toda la tarde").',
    '   – *Objeto Directo (OD):* Recibe la acción directa del verbo. Se identifica preguntando: *¿Qué es lo que + verbo?* (Ej: "Andrés redactó **un informe**").',
    '   – *Objeto Indirecto (OI):* Indica quién se beneficia o perjudica con la acción. Se identifica preguntando: *¿A quién o para quién?* (Ej: "Entregó el trabajo **a su profesora**").',
    '   – *Complementos Circunstanciales (CC):* Expresan tiempo (¿cuándo?), lugar (¿dónde?), modo (¿cómo?) o cantidad.',
    '',
    '### 2. REGLAS FUNDAMENTALES DE ACENTUACIÓN ORTOGRÁFICA',
    'En castellano toda palabra tiene una **sílaba tónica** (la que suena con mayor fuerza de voz). Sin embargo, solo algunas llevan **tilde** (acento gráfico):',
    '• **Palabras Agudas:** Tienen la fuerza en la **última sílaba**.',
    '   – Llevan tilde si terminan en vocal, en **N** o en **S** (Ejemplos: *can-ción*, *so-fá*, *a-trás*).',
    '   – No llevan tilde si terminan en otra consonante (Ejemplos: *re-loj*, *pa-pel*, *es-cri-bir*).',
    '• **Palabras Graves (o Llanas):** Tienen la fuerza en la **penúltima sílaba**.',
    '   – Llevan tilde cuando terminan en cualquier consonante que **NO sea N ni S**, ni vocal (Ejemplos: *ár-bol*, *lá-piz*, *fá-cil*).',
    '   – No llevan tilde si terminan en N, S o vocal (Ejemplos: *li-bro*, *me-sa*, *jo-ven*).',
    '• **Palabras Esdrújulas:** Tienen la fuerza en la **antepenúltima sílaba**.',
    '   – **¡SIEMPRE llevan tilde sin excepción!** (Ejemplos: *brú-ju-la*, *nú-me-ro*, *pá-gi-na*).',
    '',
    '### 3. ANÁLISIS LITERARIO: "BARRABÁS" DE ARTURO USLAR PIETRI',
    'Arturo Uslar Pietri publicó en 1928 su célebre libro "Barrabás y otros relatos", marcando la entrada de la narrativa moderna en Venezuela.',
    '• **Argumento:** El cuento narra la liberación de Barrabás, el bandolero y rebelde judío que es indultado por Poncio Pilatos en lugar de Jesús de Nazaret.',
    '• **Conflicto Psicológico:** Tras ser liberado de la oscura y fétida prisión, Barrabás no siente la alegría esperada. Se siente desorientado, solitario y perplejo por no comprender por qué la multitud eligió salvar a un criminal violento como él y condenar a un hombre inocente y manso.',
    '• **Temas Centrales:**',
    '   – La culpa y el peso de la libertad no merecida.',
    '   – El misterio del destino y la redención.',
    '   – La soledad existencial en medio de la muchedumbre de Jerusalén.',
    '• **Estilo:** Descripciones sensoriales potentes (la luz cegadora del sol al salir de la celda, el sudor, el polvo del desierto) y monólogo interior.',
  ].join('\n'),
  glossary: [
    { term: 'Oración Bimembre', symbolOrUnit: 'Sintaxis', definition: 'Estructura gramatical formada por dos miembros interdependientes: sujeto y predicado.' },
    { term: 'Núcleo del Sujeto', symbolOrUnit: 'NS', definition: 'Sustantivo principal sobre el cual gira el sujeto de la oración.' },
    { term: 'Objeto Directo', symbolOrUnit: 'OD', definition: 'Complemento verbal que recibe la acción inmediata del verbo transitivo.' },
    { term: 'Sílaba Tónica', symbolOrUnit: 'Fonética', definition: 'La sílaba que se pronuncia con mayor intensidad o relieve acústico dentro de una palabra.' },
    { term: 'Palabra Esdrújula', symbolOrUnit: 'Ortografía', definition: 'Palabra cuya sílaba tónica es la antepenúltima; todas llevan tilde según la norma de la RAE.' },
    { term: 'Barrabás', symbolOrUnit: 'Personaje', definition: 'Protagonista del cuento de Uslar Pietri; hombre rudo marcado por la contradicción de su libertad.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      {
        name: 'Pregunta para identificar el Sujeto',
        latex: '$$\\text{¿Quién(es) realiza la acción del verbo?} \\implies \\text{Sujeto (S)}$$',
        application: 'Identificación rápida sin confundir con complementos.',
      },
      {
        name: 'Pregunta para identificar el Objeto Directo',
        latex: '$$\\text{¿Qué es lo que } + \\text{verbo}? \\implies \\text{Objeto Directo (OD)}$$',
        application: 'Identificar el complemento transitivo en el predicado.',
      },
    ],
    mnemonicsAndPatterns: [
      'SEGA: Sobresdrújula, Esdrújula, Grave, Aguda (de izquierda a derecha contando desde la última sílaba).',
      'Las esdrújulas son las más amables: ¡todas llevan tilde siempre!',
      'En "Barrabás": la libertad física no siempre produce paz en el alma.',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Análisis sintáctico paso a paso de una oración simple',
      problemStatement: 'Analiza la oración: "Andrés compró un libro de ciencias para su mamá ayer".',
      deductiveSteps: [
        '1. Buscar el verbo conjugado principal: "compró" $\\implies$ Núcleo del Predicado (NP).',
        '2. Preguntar al verbo: ¿Quién compró? Respuesta: "Andrés" $\\implies$ Sujeto (S), y "Andrés" es su Núcleo (NS).',
        '3. Preguntar: ¿Qué es lo que compró? Respuesta: "un libro de ciencias" $\\implies$ Objeto Directo (OD).',
        '4. Preguntar: ¿Para quién lo compró? Respuesta: "para su mamá" $\\implies$ Objeto Indirecto (OI).',
        '5. Preguntar: ¿Cuándo lo compró? Respuesta: "ayer" $\\implies$ Complemento Circunstancial de Tiempo (CCT).',
      ],
      finalResult: 'Sujeto: [Andrés] | Predicado: [compró (NP) un libro de ciencias (OD) para su mamá (OI) ayer (CCT)].',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: 'Ponerle tilde a palabras graves que terminan en letra "s" como "crisis" o "lunes".',
      correction: 'Las palabras graves llevan tilde SOLO cuando NO terminan en N, S ni vocal. Como "crisis" termina en s, no lleva tilde.',
    },
    {
      trap: 'Confundir el sujeto con el vocativo. Ejemplo: "Mamá, Andrés come pan".',
      correction: '"Mamá" es solo a quien le hablamos (vocativo); el que realiza la acción de comer es "Andrés" (sujeto real).',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      {
        front: '¿Cuál es la regla de oro para acentuar palabras esdrújulas?',
        back: 'Todas las palabras esdrújulas llevan tilde ortográfica en su antepenúltima sílaba sin ninguna excepción.',
      },
      {
        front: '¿Cómo se comprueba si un elemento es Objeto Directo en la oración?',
        back: 'Se pregunta "¿Qué es lo que + verbo?" o se sustituye por los pronombres lo, la, los, las (Ej: "compró un libro" -> "lo compró").',
      },
      {
        front: '¿Cuál es el dilema interior que vive Barrabás en el relato de Uslar Pietri?',
        back: 'Siente desorientación y vacío existencial al no comprender por qué el pueblo condenó al hombre justo (Jesús) para liberarlo a él, un ladrón violento.',
      },
      {
        front: 'Clasifica la palabra "difícil" por su acento y justifica.',
        back: 'Es una palabra grave con fuerza en la penúltima sílaba (di-fí-cil) y lleva tilde porque termina en la consonante L (distinta de n o s).',
      },
    ],
    cornellSynthesis: {
      cues: [
        'Sujeto y Predicado',
        'Objeto Directo e Indirecto',
        'Acentuación SEGA',
        'Cuento "Barrabás"',
        'Uslar Pietri (1928)',
      ],
      notes: [
        'La oración bimembre une sujeto y predicado con concordancia.',
        'El OD responde a ¿qué cosa? y el OI responde a ¿para quién?.',
        'Agudas se tildan con n, s o vocal; graves sin n, s o vocal; esdrújulas siempre.',
        'Arturo Uslar Pietri renovó el cuento venezolano con técnicas modernas.',
        'Barrabás experimenta la amargura de una salvación no comprendida.',
      ],
      summary:
        'El dominio de la gramática bimembre y las normas ortográficas de acentuación potencia la expresión escrita en 1er año, complementado con la lectura crítica de clásicos literarios como "Barrabás".',
    },
    conceptMapNodes: 'Castellano 1er Año --> Oración Bimembre (Sujeto + Predicado); Predicado --> Núcleo (Verbo) + Complementos (OD, OI, CC); Ortografía --> Acentuación (Agudas, Graves, Esdrújulas); Literatura --> "Barrabás" (Uslar Pietri 1928, Conflicto de la culpa y la libertad)',
  },
  generatedQuestions: getExpandedGuideQuestions('andres-cas-barrabas-grammar'),
};

// =====================================================================
// GUÍA 5: MATEMÁTICAS · POTENCIACIÓN EN ℤ, FACTORES PRIMOS Y M.C.M.
// =====================================================================
export const ANDRES_MATH_POWERS_MCM_GUIDE: DeconstructedAcademicGuide = {
  id: 'andres-math-powers-factors',
  userId: ANDRES_PROFILE,
  sourceType: 'document',
  discipline: 'science',
  createdAt: '2026-11-01T00:00:00.000Z',
  guideMetadata: {
    title: 'Potenciación en ℤ, Factores Primos, m.c.m. y M.C.D.',
    area: 'Matemática · 1er Año Bachillerato',
    summary:
      'Guía oficial para la evaluación sumativa de matemática. Domina las propiedades de los exponentes en números enteros, el comportamiento del signo según exponente par o impar, descomposición en factores primos y las reglas mnemotécnicas para calcular m.c.m. y M.C.D. sin dudar.',
  },
  phenomenonAndTheory: [
    '### UNIDAD I: POTENCIACIÓN EN ℤ Y COMPORTAMIENTO DEL SIGNO',
    'La potenciación es una multiplicación abreviada donde la **base** se multiplica por sí misma tantas veces como indique el **exponente**:',
    '$$a^n = a \\cdot a \\cdot \\dots \\cdot a \\quad (n\\text{ veces})$$',
    '',
    '> **Regla de Oro de los Signos en Potenciación:**',
    '> • Base negativa elevada a exponente PAR da resultado POSITIVO: $(-3)^2 = (-3) \\cdot (-3) = +9$.',
    '> • Base negativa elevada a exponente IMPAR da resultado NEGATIVO: $(-2)^3 = (-2) \\cdot (-2) \\cdot (-2) = -8$.',
    '> • ¡Cuidado con el paréntesis! $-3^2 = -(3 \\cdot 3) = -9$, mientras que $(-3)^2 = +9$.',
    '',
    '### UNIDAD II: PROPIEDADES FUNDAMENTALES DE LAS POTENCIAS',
    '• **Producto de potencias de igual base:** Se copia la base y se suman los exponentes: $a^m \\cdot a^n = a^{m+n}$.',
    '• **Cociente de potencias de igual base:** Se copia la base y se restan los exponentes: $\\frac{a^m}{a^n} = a^{m-n}$.',
    '• **Potencia de una potencia:** Se multiplican los exponentes: $(a^m)^n = a^{m \\cdot n}$.',
    '• **Exponente cero:** Todo número distinto de cero elevado a la cero es igual a 1: $a^0 = 1$.',
    '',
    '### UNIDAD III: DESCOMPOSICIÓN EN FACTORES PRIMOS',
    'Un número primo solo tiene dos divisores: el 1 y él mismo ($2, 3, 5, 7, 11, 13, \\dots$).',
    'Para descomponer un número compuesto, dividimos sucesivamente entre números primos:',
    'Ejemplo: $60 = 2^2 \\cdot 3 \\cdot 5$.',
    '',
    '### UNIDAD IV: MÍNIMO COMÚN MÚLTIPLO (m.c.m.) Y MÁXIMO COMÚN DIVISOR (M.C.D.)',
    '> **Regla Mnemotécnica Infalible:**',
    '> • **m.c.m. (El Goloso):** Factores COMUNES Y NO COMUNES con su MAYOR exponente. Es el número más pequeño que contiene a todos.',
    '> • **M.C.D. (El Exigente):** SOLO factores COMUNES con su MENOR exponente. Es el divisor más grande que divide exactamente a todos.',
  ].join('\n'),
  glossary: [
    { term: 'Base', symbolOrUnit: 'a', definition: 'Factor numérico que se repite en una multiplicación abreviada.' },
    { term: 'Exponente', symbolOrUnit: 'n', definition: 'Indica cuántas veces se multiplica la base por sí misma.' },
    { term: 'Número Primo', symbolOrUnit: 'p ∈ ℙ', definition: 'Entero mayor que 1 divisible únicamente entre 1 y sí mismo.' },
    { term: 'm.c.m.', symbolOrUnit: 'm.c.m.(a,b)', definition: 'Mínimo Común Múltiplo: menor entero positivo divisible entre los números dados.' },
    { term: 'M.C.D.', symbolOrUnit: 'M.C.D.(a,b)', definition: 'Máximo Común Divisor: mayor entero positivo que divide simultáneamente a los números dados.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      { name: 'Producto de Potencias', latex: '$$a^m \\cdot a^n = a^{m+n}$$', application: 'Suma de exponentes al multiplicar bases iguales.' },
      { name: 'Cociente de Potencias', latex: '$$\\frac{a^m}{a^n} = a^{m-n}$$', application: 'Resta de exponentes al dividir bases iguales.' },
      { name: 'Potencia de Potencia', latex: '$$(a^m)^n = a^{m \\cdot n}$$', application: 'Multiplicación directa de exponentes.' },
      { name: 'Fórmula del m.c.m. y M.C.D.', latex: '$$\\text{m.c.m.}(a,b) \\cdot \\text{M.C.D.}(a,b) = a \\cdot b$$', application: 'Comprobación de cálculo para dos números enteros.' },
    ],
    mnemonicsAndPatterns: [
      'El m.c.m. es "goloso": quiere todos los factores (comunes y no comunes) al mayor exponente.',
      'El M.C.D. es "exigente": solo admite los que están repetidos en todos al menor exponente.',
      'Base negativa + exponente par = ¡Fiesta positiva (+)!',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Cálculo del m.c.m. y M.C.D. entre 24 y 36',
      problemStatement: 'Descomponer 24 y 36 en factores primos y hallar su m.c.m. y su M.C.D.',
      deductiveSteps: [
        'Paso 1: Descomponer 24 = 24/2 = 12, 12/2 = 6, 6/2 = 3, 3/3 = 1 => 24 = 2³ · 3¹.',
        'Paso 2: Descomponer 36 = 36/2 = 18, 18/2 = 9, 9/3 = 3, 3/3 = 1 => 36 = 2² · 3².',
        'Paso 3: Para M.C.D.: Tomamos comunes con menor exponente => 2² · 3¹ = 4 · 3 = 12.',
        'Paso 4: Para m.c.m.: Tomamos comunes y no comunes con mayor exponente => 2³ · 3² = 8 · 9 = 72.',
      ],
      finalResult: 'M.C.D.(24, 36) = 12  |  m.c.m.(24, 36) = 72.',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: 'Olvidar el paréntesis al elevar números negativos: escribir -5² creyendo que da +25.',
      correction: 'El exponente solo afecta al signo si está encerrado entre paréntesis: (-5)² = +25, mientras que -5² = -25.',
    },
    {
      trap: 'Confundir las reglas de m.c.m. y M.C.D., tomando el mayor exponente para el M.C.D.',
      correction: 'El divisor común no puede ser más grande que los números originales. Recuerda: M.C.D. = menor exponente.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Cuál es el signo del resultado de (-2)⁵?', back: 'Negativo (-32), porque la base es negativa y el exponente es impar.' },
      { front: '¿Qué regla se aplica al multiplicar x⁴ · x³?', back: 'Se copia la base y se suman los exponentes: x⁴⁺³ = x⁷.' },
      { front: '¿Cómo se elige el m.c.m. a partir de factores primos?', back: 'Factores comunes y no comunes con su mayor exponente.' },
      { front: '¿Cuánto vale cualquier número elevado a la 0 (distinto de 0)?', back: 'Vale exactamente 1 (a⁰ = 1).' },
    ],
    cornellSynthesis: {
      cues: ['Potencia de base negativa', 'Propiedades de potencias', 'Factores primos', 'm.c.m. vs M.C.D.'],
      notes: [
        'Exponente par = positivo; exponente impar = negativo.',
        'Bases iguales al multiplicar = se suman exponentes.',
        'Bases iguales al dividir = se restan exponentes.',
        'm.c.m. = comunes y no comunes con mayor exponente.',
        'M.C.D. = solo comunes con menor exponente.',
      ],
      summary: 'La potenciación simplifica cálculos algebraicos. Dominar los factores primos y la regla de m.c.m./M.C.D. es la llave para aprobar fracciones y ecuaciones.',
    },
    conceptMapNodes: 'Potenciación -> Exponentes -> Factores Primos -> m.c.m. / M.C.D.',
  },
  generatedQuestions: getExpandedGuideQuestions('andres-math-powers-factors'),
};

// =====================================================================
// GUÍA 6: MATEMÁTICAS · GEOMETRÍA BÁSICA, POLÍGONOS Y PERÍMETROS
// =====================================================================
export const ANDRES_MATH_GEOMETRY_GUIDE: DeconstructedAcademicGuide = {
  id: 'andres-math-geometry-perimeters',
  userId: ANDRES_PROFILE,
  sourceType: 'document',
  discipline: 'science',
  createdAt: '2026-11-01T00:00:00.000Z',
  guideMetadata: {
    title: 'Geometría Básica, Polígonos, Ángulos y Perímetros',
    area: 'Matemática · 1er Año Bachillerato',
    summary:
      'Guía oficial para el proyecto de geometría y dibujo técnico escolar. Aprende a clasificar ángulos, polígonos regulares e irregulares, el uso correcto de regla y compás, y el cálculo deductivo de perímetros en figuras cotidianas.',
  },
  phenomenonAndTheory: [
    '### UNIDAD I: ELEMENTOS GEOMÉTRICOS FUNDAMENTALES',
    '• **Punto:** Marca sin dimensiones que indica una posición en el plano.',
    '• **Recta:** Sucesión infinita de puntos alineados en una misma dirección.',
    '• **Segmento:** Porción de recta delimitada por dos puntos extremos ($A$ y $B$).',
    '• **Semirrecta:** Recta con punto de origen pero sin fin.',
    '',
    '### UNIDAD II: CLASIFICACIÓN DE ÁNGULOS',
    '> **Tipos de Ángulos:**',
    '> • **Agudo:** Mide menos de $90^\\circ$ (abertura cerrada).',
    '> • **Recto:** Mide exactamente $90^\\circ$ (forma de esquina perfecta "L").',
    '> • **Obtuso:** Mide más de $90^\\circ$ y menos de $180^\\circ$.',
    '> • **Llano:** Mide exactamente $180^\\circ$ (línea recta completa).',
    '',
    '### UNIDAD III: POLÍGONOS Y SU PERÍMETRO',
    'Un polígono es una figura geométrica plana y cerrada formada por segmentos rectos.',
    'El **Perímetro ($P$)** es la suma total de las longitudes de todos sus lados:',
    '$$P = l_1 + l_2 + l_3 + \\dots + l_n$$',
    '• **Triángulo equilátero:** $P = 3 \\cdot l$.',
    '• **Cuadrado:** $P = 4 \\cdot l$.',
    '• **Rectángulo:** $P = 2 \\cdot b + 2 \\cdot h$.',
  ].join('\n'),
  glossary: [
    { term: 'Perímetro', symbolOrUnit: 'P (cm / m)', definition: 'Medida del contorno o frontera exterior de una figura geométrica cerrada.' },
    { term: 'Ángulo Recto', symbolOrUnit: '90°', definition: 'Ángulo formado por dos rectas perpendiculares; equivale a un cuarto de vuelta.' },
    { term: 'Polígono Regular', symbolOrUnit: 'Figura n-lados', definition: 'Figura plana cuyos lados y ángulos interiores son todos exactamente iguales.' },
    { term: 'Compás', symbolOrUnit: 'Instrumento', definition: 'Herramienta de precisión para trazar circunferencias y transportar distancias iguales.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      { name: 'Perímetro del Rectángulo', latex: '$$P = 2b + 2h$$', application: 'Cálculo del borde de canchas, hojas y tarjetas navideñas.' },
      { name: 'Perímetro del Polígono Regular', latex: '$$P = n \\cdot l$$', application: 'Multiplicar número de lados por la longitud de un lado.' },
    ],
    mnemonicsAndPatterns: [
      'Perímetro viene de "peri" (alrededor) y "metrón" (medida): medir lo que caminas alrededor.',
      'Ángulo recto = la esquina de tu cuaderno (90°).',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Perímetro de una Tarjeta Navideña Rectangular',
      problemStatement: 'Andrés desea colocar una cinta dorada alrededor de su tarjeta navideña de 15 cm de ancho y 20 cm de largo. ¿Cuánta cinta necesita?',
      deductiveSteps: [
        'Paso 1: Identificar la figura: Es un rectángulo con base b = 15 cm y altura h = 20 cm.',
        'Paso 2: Aplicar la fórmula: P = 2b + 2h.',
        'Paso 3: Sustituir datos: P = 2(15 cm) + 2(20 cm) = 30 cm + 40 cm = 70 cm.',
      ],
      finalResult: 'Andrés necesita exactamente 70 cm de cinta dorada.',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: 'Confundir perímetro con área y multiplicar base por altura en lugar de sumar los lados.',
      correction: 'Perímetro es longitud lineal (cm), área es superficie plana (cm²). Para perímetro siempre sumas los bordes.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Cuánto mide un ángulo recto?', back: 'Exactamente 90 grados.' },
      { front: '¿Cómo se calcula el perímetro de un pentágono regular de lado 6 cm?', back: 'P = 5 · 6 cm = 30 cm.' },
      { front: '¿Qué es un ángulo agudo?', back: 'Un ángulo que mide menos de 90 grados.' },
    ],
    cornellSynthesis: {
      cues: ['Punto y recta', 'Tipos de ángulos', 'Perímetro'],
      notes: [
        'Rectas perpendiculares forman 90°.',
        'Perímetro = suma de todos los lados.',
        'Figuras regulares: P = n × lado.',
      ],
      summary: 'La geometría elemental permite dimensionar objetos del mundo real mediante la suma de sus bordes y el trazado con instrumentos técnicos.',
    },
    conceptMapNodes: 'Geometría -> Ángulos -> Polígonos -> Perímetro',
  },
  generatedQuestions: getExpandedGuideQuestions('andres-math-geometry-perimeters'),
};

// =====================================================================
// GUÍA 7: BIOLOGÍA · BIOSEGURIDAD, MENISCO Y CAMBIOS DE FASE
// =====================================================================
export const ANDRES_BIOLOGY_SAFETY_MATTER_GUIDE: DeconstructedAcademicGuide = {
  id: 'andres-bio-safety-matter',
  userId: ANDRES_PROFILE,
  sourceType: 'document',
  discipline: 'science',
  createdAt: '2026-11-01T00:00:00.000Z',
  guideMetadata: {
    title: 'Bioseguridad, Menisco Volumétrico y Cambios de Fase',
    area: 'Biología y Ciencias Naturales · 1er Año Bachillerato',
    summary:
      'Guía oficial para la práctica de laboratorio y la prueba de estados de la materia. Conoce el protocolo de seguridad escolar, técnica de lectura a la base del menisco, y las diferencias moleculares entre sólido, líquido y gas.',
  },
  phenomenonAndTheory: [
    '### UNIDAD I: NORMAS DE BIOSEGURIDAD EN EL LABORATORIO ESCOLAR',
    'El laboratorio de ciencias es un entorno de descubrimiento que exige máxima disciplina:',
    '• **Bata de laboratorio:** Blanca, de manga larga y abotonada para proteger piel y ropa.',
    '• **Comportamiento:** Prohibido correr, jugar o probar sustancias químicas con la boca.',
    '• **Calentamiento:** Nunca apuntar la boca de un tubo de ensayo hacia un compañero.',
    '',
    '### UNIDAD II: MEDICIÓN DE VOLUMEN Y LECTURA DEL MENISCO',
    'Cuando se vierte agua en una probeta de vidrio, la superficie del líquido se curva debido a la tensión superficial:',
    '> **Técnica del Menisco Cóncavo:**',
    '> • Coloca la probeta sobre una mesa plana.',
    '> • Sitúa tu ojo **exactamente a la misma altura** horizontal de la superficie del líquido (evitando el error de paralaje).',
    '> • La medida correcta se toma en la **base o punto más bajo** de la curva del menisco.',
    '',
    '### UNIDAD III: ESTADOS DE LA MATERIA Y CAMBIOS DE FASE',
    '• **Sólido:** Forma y volumen definidos; moléculas muy unidas vibrando en su lugar.',
    '• **Líquido:** Volumen constante, forma adaptable al recipiente; moléculas resbalan entre sí.',
    '• **Gaseoso:** Forma y volumen variables; partículas dispersas a gran velocidad.',
    '',
    '**Cambios de Estado Térmicos:**',
    '• **Fusión:** Sólido a líquido (hielo derritiéndose).',
    '• **Evaporación/Ebullición:** Líquido a gas.',
    '• **Condensación:** Gas a líquido (rocío en las ventanas).',
    '• **Solidificación:** Líquido a sólido (agua en el congelador).',
  ].join('\n'),
  glossary: [
    { term: 'Menisco', symbolOrUnit: 'Curvatura', definition: 'Curva que forma la superficie libre de un líquido en un tubo estrecho o probeta.' },
    { term: 'Error de Paralaje', symbolOrUnit: 'Desviación', definition: 'Error de lectura producido al no colocar la vista perpendicular a la escala de medición.' },
    { term: 'Probeta Graduada', symbolOrUnit: 'mL', definition: 'Instrumento cilíndrico de vidrio o plástico con escala para medir volúmenes líquidos.' },
    { term: 'Fusión', symbolOrUnit: 'Sólido -> Líquido', definition: 'Cambio de fase que experimenta una sustancia al absorber calor.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      { name: 'Volumen por Desplazamiento', latex: '$$V_{\\text{sólido}} = V_{\\text{final}} - V_{\\text{inicial}}$$', application: 'Medición de sólidos irregulares sumergidos en probeta.' },
      { name: 'Masa vs Peso', latex: '$$P = m \\cdot g$$', application: 'Distinción entre cantidad de materia (kg) y fuerza gravitatoria (N).' },
    ],
    mnemonicsAndPatterns: [
      'Al menisco míralo "ojo a ojo": si lo miras desde arriba o abajo, la lectura se falsea.',
      'Sólido = soldados en fila; Líquido = personas bailando; Gas = niños corriendo en el patio.',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Medir el Volumen de una Piedra Irregular',
      problemStatement: 'Una probeta tiene 50 mL de agua. Al introducir una piedra, el nivel sube a 68 mL. ¿Cuál es el volumen de la piedra?',
      deductiveSteps: [
        'Paso 1: Anotar volumen inicial de líquido: V₁ = 50 mL.',
        'Paso 2: Anotar volumen con la piedra sumergida: V₂ = 68 mL.',
        'Paso 3: Aplicar fórmula: V = V₂ - V₁ = 68 mL - 50 mL = 18 mL.',
      ],
      finalResult: 'El volumen de la piedra es exactamente 18 mL (o 18 cm³).',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: 'Tomar la lectura en la parte alta de los bordes del agua en lugar de la base del menisco.',
      correction: 'Siempre se lee la parte inferior más profunda de la curva del menisco con el ojo a la misma altura.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Cómo se lee correctamente el menisco en una probeta?', back: 'A la altura visual de la base o punto más bajo de la curvatura.' },
      { front: '¿Qué cambio de estado ocurre cuando el vapor de agua forma gotas en el espejo?', back: 'Condensación (gas a líquido).' },
      { front: '¿Por qué es obligatorio abotonarse la bata en el laboratorio?', back: 'Para evitar que reactivos derramados alcancen la ropa o la piel.' },
    ],
    cornellSynthesis: {
      cues: ['Bioseguridad', 'Lectura de menisco', 'Estados de materia', 'Cambios térmicos'],
      notes: [
        'Bata blanca abotonada obligatoria.',
        'Menisco: lectura en el fondo de la curva.',
        'Fusión = sólido a líquido.',
        'Condensación = gas a líquido.',
      ],
      summary: 'El trabajo de laboratorio combina rigor de seguridad personal con precisión en la lectura de instrumentos volumétricos.',
    },
    conceptMapNodes: 'Ciencias -> Laboratorio -> Menisco -> Estados de la Materia',
  },
  generatedQuestions: getExpandedGuideQuestions('andres-bio-safety-matter'),
};

// =====================================================================
// GUÍA 8: FÍSICA · CONVERSIÓN DE UNIDADES SI Y CIRCUITOS BÁSICOS
// =====================================================================
export const ANDRES_PHYSICS_UNITS_CIRCUITS_GUIDE: DeconstructedAcademicGuide = {
  id: 'andres-phys-units-circuits',
  userId: ANDRES_PROFILE,
  sourceType: 'document',
  discipline: 'science',
  createdAt: '2026-11-01T00:00:00.000Z',
  guideMetadata: {
    title: 'Magnitudes SI, Factores de Conversión y Circuitos Eléctricos',
    area: 'Física · 1er Año Bachillerato (Prof. Antonio Gonzales)',
    summary:
      'Guía oficial para el taller en parejas y la tarjeta navideña de física. Domina la conversión de unidades de longitud, masa y tiempo en el Sistema Internacional, y la estructura de un circuito cerrado con batería de 3V y LED.',
  },
  phenomenonAndTheory: [
    '### UNIDAD I: EL SISTEMA INTERNACIONAL DE UNIDADES (SI)',
    'Para que los científicos de todo el mundo se entiendan, se acordaron unidades oficiales:',
    '• **Longitud:** metro ($\\text{m}$).',
    '• **Masa:** kilogramo ($\\text{kg}$).',
    '• **Tiempo:** segundo ($\\text{s}$).',
    '',
    '### UNIDAD II: MÉTODO DEL FACTOR DE CONVERSIÓN',
    'Un factor de conversión es una fracción igual a la unidad que cancela la unidad antigua y coloca la nueva:',
    '> **Equivalencias Fundamentales:**',
    '> • $1\\text{ km} = 1000\\text{ m}$',
    '> • $1\\text{ m} = 100\\text{ cm} = 1000\\text{ mm}$',
    '> • $1\\text{ kg} = 1000\\text{ g}$',
    '> • $1\\text{ hora} = 60\\text{ min} = 3600\\text{ segundos}$',
    '',
    '### UNIDAD III: CIRCUITOS ELÉCTRICOS BÁSICOS',
    'La corriente eléctrica es el flujo ordenado de electrones a través de un conductor cerrado:',
    '• **Fuente de energía:** Pila de botón o batería ($3\\text{V}$).',
    '• **Conductor:** Cable de cobre o cinta adhesiva de cobre.',
    '• **Receptor:** Diodo LED (transforma energía eléctrica en luz).',
    '• **Interruptor:** Dispositivo que abre (apaga) o cierra (enciende) el paso de corriente.',
  ].join('\n'),
  glossary: [
    { term: 'Magnitud Fundamental', symbolOrUnit: 'SI', definition: 'Propiedad física que se mide directamente sin depender de otras (longitud, masa, tiempo).' },
    { term: 'Factor de Conversión', symbolOrUnit: 'Fracción', definition: 'Razón matemática que permite cambiar de una unidad a otra manteniendo la misma cantidad.' },
    { term: 'Diodo LED', symbolOrUnit: 'Componente', definition: 'Semiconductor que emite luz cuando la corriente circula en el sentido correcto (polo positivo a ánodo).' },
    { term: 'Circuito Cerrado', symbolOrUnit: 'Bucle', definition: 'Camino continuo sin cortes que permite el paso constante de corriente eléctrica.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      { name: 'Conversión de Horas a Segundos', latex: '$$t(\\text{s}) = t(\\text{h}) \\cdot 3600$$', application: 'Cálculo de tiempo en problemas cinemáticos del SI.' },
      { name: 'Conversión de Kilómetros a Metros', latex: '$$d(\\text{m}) = d(\\text{km}) \\cdot 1000$$', application: 'Conversión de distancias en problemas de física.' },
    ],
    mnemonicsAndPatterns: [
      'De unidad grande a pequeña: MULTIPLICAS (bajas escalones).',
      'De unidad pequeña a grande: DIVIDES (subes escalones).',
      'La pata larga del LED va al polo positivo (+) de la pila.',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Convertir 2.5 Horas a Segundos',
      problemStatement: 'Un automóvil viaja durante 2.5 horas. Expresa ese tiempo en segundos en el Sistema Internacional.',
      deductiveSteps: [
        'Paso 1: Plantear la equivalencia: 1 hora = 3600 segundos.',
        'Paso 2: Escribir el factor de conversión: 2.5 h · (3600 s / 1 h).',
        'Paso 3: Cancelar las horas y multiplicar: 2.5 · 3600 = 9000 s.',
      ],
      finalResult: '2.5 horas equivalen a 9000 segundos.',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: 'Creer que 1 hora tiene 100 segundos o 60 segundos.',
      correction: '1 hora = 60 minutos, y cada minuto tiene 60 segundos: 60 × 60 = 3600 segundos.',
    },
    {
      trap: 'Conectar el LED al revés en la tarjeta de física navideña.',
      correction: 'Los LEDs tienen polaridad: la pata más larga es el ánodo (+) y debe tocar el polo positivo de la pila.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Cuál es la unidad oficial de tiempo en el Sistema Internacional?', back: 'El segundo (s).' },
      { front: '¿Cuántos metros hay en 3.2 kilómetros?', back: '3200 metros (3.2 × 1000).' },
      { front: '¿Qué se necesita para que un LED encienda?', back: 'Un circuito cerrado conectado a una fuente de energía con polaridad correcta.' },
    ],
    cornellSynthesis: {
      cues: ['Unidades SI', 'Factores de conversión', 'Circuito eléctrico', 'Polaridad LED'],
      notes: [
        'SI: metro (m), kilogramo (kg), segundo (s).',
        '1 h = 3600 s; 1 km = 1000 m.',
        'Circuito cerrado = enciende.',
        'Ánodo (+) = pata larga.',
      ],
      summary: 'La física exige precisión matemática en las unidades para describir fenómenos reales como el movimiento y la electricidad.',
    },
    conceptMapNodes: 'Física -> Sistema Internacional -> Conversiones -> Circuitos',
  },
  generatedQuestions: getExpandedGuideQuestions('andres-phys-units-circuits'),
};

// =====================================================================
// GUÍA 9: CASTELLANO · ORACIÓN BIMEMBRE, ACENTUACIÓN Y ORTOGRAFÍA
// =====================================================================
export const ANDRES_SPANISH_SYNTAX_ACCENTS_GUIDE: DeconstructedAcademicGuide = {
  id: 'andres-cas-syntax-accents',
  userId: ANDRES_PROFILE,
  sourceType: 'document',
  discipline: 'design',
  createdAt: '2026-11-01T00:00:00.000Z',
  guideMetadata: {
    title: 'Sintaxis de la Oración Bimembre, Núcleos y Reglas de Acentuación',
    area: 'Castellano y Literatura · 1er Año Bachillerato',
    summary:
      'Guía oficial para el juego didáctico de gramática y la evaluación de ortografía. Aprende a separar sujeto y predicado, ubicar los núcleos oracionales, y aplicar con seguridad las reglas de tildación en agudas, graves y esdrújulas.',
  },
  phenomenonAndTheory: [
    '### UNIDAD I: LA ORACIÓN BIMEMBRE (DOS MIEMBROS)',
    'Una oración bimembre comunica un sentido completo y se divide en dos bloques inseparables:',
    '• **Sujeto ($S$):** De quién o de qué se habla en la oración.',
    '  - **Núcleo del Sujeto ($NS$):** Es la palabra más importante del sujeto; siempre es un sustantivo o pronombre.',
    '• **Predicado ($P$):** Lo que se dice o predica sobre el sujeto.',
    '  - **Núcleo del Predicado ($NP$):** Siempre es un **verbo conjugado**.',
    '',
    'Ejemplo: `[Los científicos del colegio] [investigan en el laboratorio].`',
    '- Sujeto: "Los científicos del colegio" (Núcleo: científicos).',
    '- Predicado: "investigan en el laboratorio" (Núcleo: investigan).',
    '',
    '### UNIDAD II: SÍLABA TÓNICA Y CLASIFICACIÓN DE PALABRAS',
    'La **sílaba tónica** es aquella que se pronuncia con mayor fuerza o intensidad de voz:',
    '> **Las 3 Reglas de Oro de Acentuación Española:**',
    '> 1. **Agudas:** Fuerza en la **última sílaba**. Llevan tilde SOLO si terminan en **N, S o VOCAL** (ej: camión, compás, café).',
    '> 2. **Graves o Llanas:** Fuerza en la **penúltima sílaba**. Llevan tilde si NO terminan en N, S ni Vocal (ej: árbol, lápiz, cóndor).',
    '> 3. **Esdrújulas:** Fuerza en la **antepenúltima sílaba**. ¡LLEVAN TILDE SIEMPRE sin excepción! (ej: brújula, química, teléfono).',
  ].join('\n'),
  glossary: [
    { term: 'Oración Bimembre', symbolOrUnit: 'S + P', definition: 'Estructura sintáctica compuesta por sujeto y predicado con sentido completo.' },
    { term: 'Sílaba Tónica', symbolOrUnit: 'Acento Prosódico', definition: 'Sílaba que recibe la mayor fuerza de pronunciación en una palabra.' },
    { term: 'Tilde', symbolOrUnit: '´ (signo)', definition: 'Signo gráfico que se escribe sobre la vocal tónica según las reglas ortográficas.' },
    { term: 'Palabra Esdrújula', symbolOrUnit: 'Antepenúltima', definition: 'Palabra cuya sílaba tónica es la antepenúltima; siempre se acentúa ortográficamente.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      { name: 'Estructura Bimembre', latex: '$$\\text{Oración} = \\text{Sujeto}(NS) + \\text{Predicado}(NP)$$', application: 'Análisis sintáctico escolar de oraciones.' },
      { name: 'Regla SEGA', latex: '$$\\text{Sobreesdrújula} \\leftarrow \\text{Esdrújula} \\leftarrow \\text{Grave} \\leftarrow \\text{Aguda}$$', application: 'Mnemotecnia de derecha a izquierda para ubicar la sílaba tónica.' },
    ],
    mnemonicsAndPatterns: [
      'Aprende la palabra "SEGA" de derecha a izquierda: A (última), G (penúltima), E (antepenúltima), S (ante-antepenúltima).',
      'Las esdrújulas son las más fáciles del idioma: ¡toditas llevan tilde!',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Análisis Sintáctico y Acentuación',
      problemStatement: 'Analiza la oración: "Andrés resolvió la ecuación difícil".',
      deductiveSteps: [
        'Paso 1: ¿De quién se habla? De "Andrés" (Sujeto). Su núcleo es Andrés (sustantivo propio).',
        'Paso 2: ¿Qué se dice? "resolvió la ecuación difícil" (Predicado). Su núcleo es resolvió (verbo).',
        'Paso 3: Analizar "difícil": sílaba tónica "fí" (penúltima). Termina en consonante "l" (no es n, s ni vocal) => Lleva tilde por ser grave.',
      ],
      finalResult: 'Sujeto: Andrés (NS). Predicado: resolvió (NP). "Difícil" lleva tilde por regla de palabra grave.',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: 'Poner tilde a palabras graves que terminan en vocal (escribir "exámen" en singular).',
      correction: 'Examen es grave terminada en n, por lo que NO lleva tilde en singular. En plural sí: exámenes (esdrújula).',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Cuándo se tildan las palabras agudas?', back: 'Cuando terminan en N, S o Vocal.' },
      { front: '¿Cuál es el núcleo del predicado en una oración?', back: 'El verbo conjugado.' },
      { front: '¿Por qué la palabra "música" lleva tilde obligatoria?', back: 'Porque es una palabra esdrújula y todas las esdrújulas se tildan.' },
    ],
    cornellSynthesis: {
      cues: ['Sujeto y Predicado', 'Núcleos oracionales', 'Regla SEGA', 'Acentuación'],
      notes: [
        'Sujeto = quién realiza la acción (NS: sustantivo).',
        'Predicado = la acción realizada (NP: verbo).',
        'Aguda = última sílaba (tilda en n, s, vocal).',
        'Grave = penúltima sílaba (tilda si no termina en n, s, vocal).',
        'Esdrújula = antepenúltima (se tildan todas).',
      ],
      summary: 'La sintaxis y la acentuación son las herramientas maestras para escribir y comunicar ideas con claridad e impecabilidad.',
    },
    conceptMapNodes: 'Gramática -> Sintaxis (S + P) -> Sílaba Tónica -> Regla SEGA',
  },
  generatedQuestions: getExpandedGuideQuestions('andres-cas-syntax-accents'),
};

// =====================================================================
// GUÍA 10: DISEÑO E INFORMÁTICA · LENGUAJE VISUAL, COLOR Y HARDWARE
// =====================================================================
export const ANDRES_DESIGN_COLOR_GRID_GUIDE: DeconstructedAcademicGuide = {
  id: 'andres-design-color-grid',
  userId: ANDRES_PROFILE,
  sourceType: 'document',
  discipline: 'design',
  createdAt: '2026-11-01T00:00:00.000Z',
  guideMetadata: {
    title: 'Elementos Visuales, Círculo Cromático y Hardware Escolar',
    area: 'Diseño Digital & Informática · 1er Año Bachillerato',
    summary:
      'Guía oficial para los proyectos de dibujo técnico, láminas de color y examen de computación. Comprende los bloques visuales fundamentales (punto, línea, plano), armonías cromáticas de 12 tonos y la arquitectura básica del computador.',
  },
  phenomenonAndTheory: [
    '### UNIDAD I: LOS ELEMENTOS BÁSICOS DEL LENGUAJE VISUAL',
    'Toda imagen, afiche o interfaz se construye a partir de elementos primarios:',
    '• **Punto:** La unidad gráfica más simple; genera atracción visual y foco de atención.',
    '• **Línea:** El punto en movimiento; define formas, contornos y direcciones (vertical = estabilidad, diagonal = dinamismo).',
    '• **Plano:** Superficie bidimensional delimitada por líneas.',
    '• **Textura:** Cualidad táctil o visual de una superficie (suave, rugosa, metálica).',
    '',
    '### UNIDAD II: TEORÍA DEL COLOR Y CÍRCULO CROMÁTICO',
    'El círculo cromático de 12 tonos organiza los colores según su origen:',
    '> **Clasificación Cromática:**',
    '> • **Colores Primarios:** No se obtienen por mezcla: Amarillo, Azul y Rojo.',
    '> • **Colores Secundarios:** Mezcla de dos primarios en partes iguales: Verde (Azul+Amarillo), Naranja (Amarillo+Rojo), Violeta (Azul+Rojo).',
    '> • **Colores Terciarios:** Mezcla de un primario con un secundario adyacente (ej: Amarillo-Verdoso, Azul-Violáceo).',
    '> • **Temperatura:** Cálidos (rojos, amarillos, naranjas) transmiten energía; Fríos (azules, verdes, violetas) transmiten calma.',
    '',
    '### UNIDAD III: COMPUTACIÓN Y HARDWARE ESCOLAR',
    'Un computador es un sistema que procesa datos mediante dos componentes inseparables:',
    '• **Hardware:** Parte física y tangible que puedes tocar.',
    '  - **CPU (Procesador):** El cerebro que ejecuta instrucciones.',
    '  - **Memoria RAM:** Memoria rápida y volátil que guarda lo que estás usando en el momento.',
    '  - **Almacenamiento (Disco Duro/SSD):** Guarda tus archivos y fotos de forma permanente.',
    '  - **Periféricos:** Entrada (teclado, ratón) y Salida (monitor, impresora).',
    '• **Software:** Programas e instrucciones lógicas que dan órdenes al hardware.',
  ].join('\n'),
  glossary: [
    { term: 'Círculo Cromático', symbolOrUnit: 'Rueda 12 Colores', definition: 'Representación gráfica circular ordenada de los colores primarios, secundarios y terciarios.' },
    { term: 'Hardware', symbolOrUnit: 'Físico', definition: 'Conjunto de componentes electrónicos y mecánicos tangibles de una computadora.' },
    { term: 'CPU', symbolOrUnit: 'Unidad Central', definition: 'Procesador principal del computador que ejecuta los programas e instrucciones.' },
    { term: 'Memoria RAM', symbolOrUnit: 'Memoria Volátil', definition: 'Memoria de acceso aleatorio que almacena datos temporales mientras el equipo está encendido.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      { name: 'Mezcla Secundaria', latex: '$$\\text{Primario A} + \\text{Primario B} = \\text{Secundario}$$', application: 'Obtención de Verde, Naranja y Violeta con pintura o tintas.' },
      { name: 'Esquema de Von Neumann', latex: '$$\\text{Entrada} \\rightarrow \\text{Procesador (CPU/RAM)} \\rightarrow \\text{Salida}$$', application: 'Flujo universal de información en computadoras.' },
    ],
    mnemonicsAndPatterns: [
      'Primarios = los 3 mosqueteros que no se mezclan (Amarillo, Azul, Rojo).',
      'RAM es como la pizarra del salón (se borra al apagar); Disco Duro es tu cuaderno (queda guardado).',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Creación de un Color Terciario',
      problemStatement: '¿Cómo se obtiene el color Azul-Verdoso en el círculo cromático?',
      deductiveSteps: [
        'Paso 1: Identificar el color primario: Azul.',
        'Paso 2: Identificar el color secundario adyacente: Verde (que proviene de Azul + Amarillo).',
        'Paso 3: Al mezclar mayor proporción de Azul con Verde se obtiene el terciario Azul-Verdoso (o Turquesa).',
      ],
      finalResult: 'Azul (primario) + Verde (secundario) = Azul-Verdoso (terciario).',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: 'Confundir la memoria RAM con el disco de almacenamiento y temer que al apagar se borren las fotos guardadas en el disco.',
      correction: 'El disco duro o SSD guarda de forma permanente. La RAM solo guarda lo que tienes abierto en pantalla en ese segundo.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Cuáles son los 3 colores primarios tradicionales?', back: 'Amarillo, Azul y Rojo.' },
      { front: '¿Qué diferencia hay entre hardware y software?', back: 'Hardware es la parte física tangible; software son los programas e instrucciones digitales.' },
      { front: '¿Qué sensaciones transmiten los colores cálidos vs fríos?', back: 'Cálidos transmiten energía y cercanía; fríos transmiten calma y serenidad.' },
    ],
    cornellSynthesis: {
      cues: ['Punto y línea', 'Círculo cromático', 'Hardware vs Software', 'CPU y RAM'],
      notes: [
        'Primarios: Amarillo, Azul, Rojo.',
        'Secundarios: Verde, Naranja, Violeta.',
        'Hardware = lo que se puede tocar.',
        'CPU = cerebro; RAM = memoria temporal.',
      ],
      summary: 'El diseño y la tecnología se unen para comunicar ideas visuales y materializarlas a través de herramientas informáticas estructuradas.',
    },
    conceptMapNodes: 'Diseño & Computación -> Color -> Hardware -> Software',
  },
  generatedQuestions: getExpandedGuideQuestions('andres-design-color-grid'),
};

// =====================================================================
// 7. GUÍAS OFICIALES REUNIDAS PARA EL PERFIL DE ANDRÉS (12 GUÍAS TOTALES)
// =====================================================================
export const ALL_ANDRES_DECONSTRUCTED_GUIDES: DeconstructedAcademicGuide[] = [
  ANDRES_MATH_Z_EQUATIONS_GUIDE,
  ANDRES_MATH_POWERS_MCM_GUIDE,
  ANDRES_MATH_GEOMETRY_GUIDE,
  ANDRES_BIOLOGY_METHOD_LAB_GUIDE,
  ANDRES_BIOLOGY_SAFETY_MATTER_GUIDE,
  ANDRES_PHYSICS_MACHINES_GUIDE,
  ANDRES_PHYSICS_UNITS_CIRCUITS_GUIDE,
  ANDRES_SPANISH_BARRABAS_GUIDE,
  ANDRES_SPANISH_SYNTAX_ACCENTS_GUIDE,
  ANDRES_FE_CONSOLACION_GUIDE,
  ANDRES_DESIGN_COLOR_GRID_GUIDE,
  ANDRES_INF_COMPUTING_GUIDE,
];

// =====================================================================
// 8. BANCO COMPLETO DE REACTIVOS CALIBRADOS PARA 1ER AÑO (212 REACTIVOS)
// =====================================================================
export const ALL_ANDRES_QUESTIONS: Question[] = ALL_ANDRES_EXPANDED_QUESTIONS;

// =====================================================================
// 9. MODELOS DE EXAMEN PRECONFIGURADOS PARA ANDRÉS RIVERO (13 EXÁMENES)
// =====================================================================
export const ANDRES_TAILORED_EXAMS = [
  // 1. Matemática: Números Enteros ℤ, Operaciones Combinadas Largas y Ecuaciones (30 preguntas)
  {
    id: 'exam-andres-math-1',
    profileId: ANDRES_PROFILE,
    title: 'Matemática · Números Enteros ℤ, Signos de Agrupación y Ecuaciones',
    subtitle: 'Evaluación Parcial Completa · I Momento',
    durationMinutes: 60,
    questionCount: 30,
    badge: 'Matemática ℤ (30Q)',
    colorScheme: 'emerald' as const,
    description:
      '30 reactivos de operaciones en ℤ: sumas algebraicas largas, eliminación jerárquica de paréntesis, corchetes y llaves, operaciones combinadas con productos y cocientes, valor absoluto y ecuaciones con paréntesis.',
    targetSubject: 'Matemática' as const,
    targetTopicKeyword: 'ℤ',
    fixedQuestionIds: getExamIdsForGuide('andres-math-z-equations'),
  },

  // 2. Matemática: Potenciación, Factores Primos, m.c.m. y M.C.D. (20 preguntas)
  {
    id: 'exam-andres-math-2',
    profileId: ANDRES_PROFILE,
    title: 'Matemática · Potenciación en ℤ, Factores Primos, m.c.m. y M.C.D.',
    subtitle: 'Prueba Sumativa Temática · I Momento',
    durationMinutes: 45,
    questionCount: 20,
    badge: 'Potencias & m.c.m.',
    colorScheme: 'emerald' as const,
    description:
      '20 reactivos sobre signo de potencias pares/impares, propiedades de igual base, números primos, descomposición factorial, m.c.m. y M.C.D. aplicados.',
    targetSubject: 'Matemática' as const,
    targetTopicKeyword: 'Potenciación',
    fixedQuestionIds: getExamIdsForGuide('andres-math-powers-factors'),
  },

  // 3. Matemática: Geometría Plana, Ángulos, Perímetros y Áreas (18 preguntas)
  {
    id: 'exam-andres-math-3',
    profileId: ANDRES_PROFILE,
    title: 'Matemática · Geometría Plana, Ángulos, Polígonos y Áreas',
    subtitle: 'Taller Evaluado de Dibujo Geométrico & Medidas',
    durationMinutes: 40,
    questionCount: 18,
    badge: 'Geometría Plana',
    colorScheme: 'emerald' as const,
    description:
      '18 reactivos sobre rectas, ángulos complementarios y suplementarios, triángulos ($180^\\circ$), polígonos regulares, radio/diámetro, perímetros y áreas.',
    targetSubject: 'Matemática' as const,
    targetTopicKeyword: 'Geometría',
    fixedQuestionIds: getExamIdsForGuide('andres-math-geometry-perimeters'),
  },

  // 4. Biología: Método Científico, Variables, Laboratorio y Microscopía (18 preguntas)
  {
    id: 'exam-andres-bio-1',
    profileId: ANDRES_PROFILE,
    title: 'Biología · Método Científico, Instrumentos y Microscopía',
    subtitle: 'Práctica Evaluada de Laboratorio de Ciencias',
    durationMinutes: 40,
    questionCount: 18,
    badge: 'Método & Laboratorio',
    colorScheme: 'emerald' as const,
    description:
      '18 reactivos sobre etapas del método científico, variables experimental y control, reconocimiento de instrumentos de vidrio y cálculo de aumento del microscopio.',
    targetSubject: 'Biología' as const,
    targetTopicKeyword: 'Laboratorio',
    fixedQuestionIds: getExamIdsForGuide('andres-bio-lab-method'),
  },

  // 5. Biología: Bioseguridad, Menisco, Estados de la Materia y Biomecánica (18 preguntas)
  {
    id: 'exam-andres-bio-2',
    profileId: ANDRES_PROFILE,
    title: 'Biología · Bioseguridad, Materia, Célula y Palancas del Cuerpo',
    subtitle: 'Evaluación Sumativa · Materia & Biomecánica',
    durationMinutes: 40,
    questionCount: 18,
    badge: 'Materia & Bioseguridad',
    colorScheme: 'emerald' as const,
    description:
      '18 reactivos sobre normas de bata, lectura del menisco, volumen por Arquímedes, masa vs peso, los 6 cambios de fase, célula vegetal y palancas anatómicas.',
    targetSubject: 'Biología' as const,
    targetTopicKeyword: 'Materia',
    fixedQuestionIds: getExamIdsForGuide('andres-bio-safety-matter'),
  },

  // 6. Física: Historia, Fuerza, Ley de la Palanca y Máquinas Simples (18 preguntas)
  {
    id: 'exam-andres-phys-1',
    profileId: ANDRES_PROFILE,
    title: 'Física · Historia, Ley de la Palanca y Máquinas Simples',
    subtitle: 'Cátedra Prof. Antonio Gonzales · Mecánica Básica',
    durationMinutes: 45,
    questionCount: 18,
    badge: 'Palancas & Poleas',
    colorScheme: 'emerald' as const,
    description:
      '18 reactivos sobre Galileo, Arquímedes y Newton, dinamómetro, equilibrio $P \\cdot d_p = R \\cdot d_r$, los 3 géneros de palanca, poleas, plano inclinado y torno.',
    targetSubject: 'Física' as const,
    targetTopicKeyword: 'Palanca',
    fixedQuestionIds: getExamIdsForGuide('andres-phys-machines-units'),
  },

  // 7. Física: Magnitudes SI, Factores de Conversión y Circuitos Eléctricos (18 preguntas)
  {
    id: 'exam-andres-phys-2',
    profileId: ANDRES_PROFILE,
    title: 'Física · Unidades SI, Conversión y Circuitos Eléctricos LED',
    subtitle: 'Cátedra Prof. Antonio Gonzales · Medición & Electricidad',
    durationMinutes: 45,
    questionCount: 18,
    badge: 'Unidades SI & Circuitos',
    colorScheme: 'emerald' as const,
    description:
      '18 reactivos sobre magnitudes fundamentales y derivadas, conversiones de km, m, kg, h y s, apreciación instrumental, circuito navideño LED y serie vs paralelo.',
    targetSubject: 'Física' as const,
    targetTopicKeyword: 'Unidades',
    fixedQuestionIds: getExamIdsForGuide('andres-phys-units-circuits'),
  },

  // 8. Castellano: Cuento "Barrabás", Figuras Literarias y Redacción (18 preguntas)
  {
    id: 'exam-andres-cas-1',
    profileId: ANDRES_PROFILE,
    title: 'Castellano · Cuento "Barrabás" (Uslar Pietri) y Figuras Literarias',
    subtitle: 'Prueba de Comprensión Lectora & Expresión Escrita',
    durationMinutes: 40,
    questionCount: 18,
    badge: 'Literatura & Barrabás',
    colorScheme: 'emerald' as const,
    description:
      '18 reactivos sobre el argumento, personajes y dilema moral en "Barrabás" (1928), imágenes sensoriales, símil, metáfora, humanización, biografía y CV.',
    targetSubject: 'Castellano' as const,
    targetTopicKeyword: 'Barrabás',
    fixedQuestionIds: getExamIdsForGuide('andres-cas-barrabas-grammar'),
  },

  // 9. Castellano: Sintaxis Bimembre, Regla SEGA, Diptongos y Hiatos (18 preguntas)
  {
    id: 'exam-andres-cas-2',
    profileId: ANDRES_PROFILE,
    title: 'Castellano · Sintaxis de la Oración, Acentuación SEGA y Hiatos',
    subtitle: 'Evaluación Integral de Gramática y Ortografía',
    durationMinutes: 40,
    questionCount: 18,
    badge: 'Sintaxis & Acentuación',
    colorScheme: 'emerald' as const,
    description:
      '18 reactivos sobre oración unimembre/bimembre, NS, MD, MI, NP, OD, OI, circunstanciales, agudas/graves/esdrújulas, diptongos, hiato acentual y diacríticos.',
    targetSubject: 'Castellano' as const,
    targetTopicKeyword: 'Acentuación',
    fixedQuestionIds: getExamIdsForGuide('andres-cas-syntax-accents'),
  },

  // 10. Educación en la Fe: DOMUND, Santa María Rosa Molas y Consolación (14 preguntas)
  {
    id: 'exam-andres-fe-1',
    profileId: ANDRES_PROFILE,
    title: 'Educación en la Fe · DOMUND, Carisma Consolación y Valores',
    subtitle: 'Evaluación Formativa de Pastoral · Colegio Consolación',
    durationMinutes: 30,
    questionCount: 14,
    badge: 'Carisma Consolación',
    colorScheme: 'emerald' as const,
    description:
      '14 reactivos sobre la misión del DOMUND, vida de Santa María Rosa Molas, Diario de Gratitud, parábola del Buen Samaritano y convivencia escolar fraterna.',
    targetSubject: 'Castellano' as const,
    targetTopicKeyword: 'Consolación',
    fixedQuestionIds: getExamIdsForGuide('andres-fe-consolacion-values'),
  },

  // 11. Diseño Digital: Lenguaje Visual, Círculo Cromático y Vectores (16 preguntas)
  {
    id: 'exam-andres-design-1',
    profileId: ANDRES_PROFILE,
    title: 'Diseño Digital · Elementos Visuales, Círculo Cromático y Vectores',
    subtitle: 'Evaluación de Comunicación Visual & Dibujo',
    durationMinutes: 35,
    questionCount: 16,
    badge: 'Color & Diseño',
    colorScheme: 'emerald' as const,
    description:
      '16 reactivos sobre punto, línea, plano, textura, signos visuales, círculo cromático de 12 tonos, complementarios, RGB vs CMYK, retícula y gráficos vectoriales.',
    targetSubject: 'Diseño' as const,
    targetTopicKeyword: 'Color',
    fixedQuestionIds: getExamIdsForGuide('andres-design-color-grid'),
  },

  // 12. Informática Práctica: Evolución PC, Hardware/Software, Archivos y Excel (16 preguntas)
  {
    id: 'exam-andres-inf-1',
    profileId: ANDRES_PROFILE,
    title: 'Informática Práctica · Hardware, Archivos, Word y Hojas de Cálculo',
    subtitle: 'Prueba Estructurada de Laboratorio de Computación',
    durationMinutes: 35,
    questionCount: 16,
    badge: 'Informática & Excel',
    colorScheme: 'emerald' as const,
    description:
      '16 reactivos sobre generaciones del computador, CPU/RAM/SSD, periféricos, documentos justificados, árbol de carpetas, extensiones y fórmulas =SUMA y =PROMEDIO.',
    targetSubject: 'Diseño' as const,
    targetTopicKeyword: 'Informática',
    fixedQuestionIds: getExamIdsForGuide('andres-inf-computing-office'),
  },

  // 13. Gran Simulacro General Integrado (Todas las Materias · 36 preguntas)
  {
    id: 'exam-andres-simulacro-integral',
    profileId: ANDRES_PROFILE,
    title: 'Gran Simulacro General 1er Año (Todas las 12 Unidades)',
    subtitle: 'Diagnóstico Integral Multidisciplinario · Colegio Consolación',
    durationMinutes: 60,
    questionCount: 36,
    badge: 'Simulacro Integral 36Q',
    colorScheme: 'emerald' as const,
    description:
      'Evaluación diagnóstica completa con 36 reactivos seleccionados equitativamente (3 por cada uno de los 12 temas de Matemática, Biología, Física, Castellano, Fe, Diseño e Informática).',
    targetSubject: 'Matemática' as const,
    fixedQuestionIds: ANDRES_INTEGRAL_EXAM_IDS,
  },
];
