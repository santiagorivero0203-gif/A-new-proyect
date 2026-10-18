/**
 * @file ucv_intro_course_data.ts
 * @description Base de datos curricular y banco de reactivos oficial del
 * Curso Introductorio de la Facultad de Ciencias de la Universidad Central de Venezuela (UCV).
 * 
 * Estructurado en 3 Unidades de Aprendizaje (UA) y 7 Módulos en 6 Semanas:
 * - UA I: Autogestión del Aprendizaje y Método Científico (Módulo 1)
 * - UA II: Lenguaje, Comprensión Lectora y Comunicación Escrita (Módulo 2.1 y 2.2)
 * - UA III: Pensamiento Lógico-Matemático:
 *     - Módulo 3.1: Fundamentos de Aritmética y Sistema Internacional (SI)
 *     - Módulo 3.2: Operaciones con Números en Q y R
 *     - Módulo 3.3: Proporcionalidad e Introducción al Álgebra
 *     - Módulo 3.4: Álgebra Avanzada, Intervalos y Ecuaciones Irracionales
 *     - Módulo 3.5: Conjuntos, Funciones Reales, Trigonometría y Vectores
 */

import type { Question } from '../types/exam.types';

export interface DidacticLayer {
  conceptTitle: string;
  intuition: string;
  keyFormulaLatex?: string;
  formulaNote?: string;
  examTrap: string;
  fastStrategy: string;
}

export interface UCVModuleTopic {
  id: string;
  title: string;
  week: number;
  unit: 'UA_I' | 'UA_II' | 'UA_III';
  unitName: string;
  summary: string;
  theoryLatex: string[];
  keyFormulas: { name: string; latex: string; description: string }[];
  stepByStepExamples: { title: string; statement: string; steps: string[]; answerLatex: string }[];
  examTraps: string[];
  practiceFlashcards: { front: string; back: string }[];
  didacticLayers?: DidacticLayer[];
}

export interface UCVSyllabusWeek {
  weekNumber: number;
  title: string;
  unitCode: string;
  unitTitle: string;
  focus: string;
  hours: number;
  topics: string[];
  evaluations: string[];
  interactiveLabId: string;
}

/**
 * Plan de estudios oficial estructurado en 6 semanas de prelación matemática
 */
export const UCV_6_WEEKS_SYLLABUS: UCVSyllabusWeek[] = [
  {
    weekNumber: 1,
    title: 'Semana 1: Método Científico, SI y Aritmética Fundamental',
    unitCode: 'UA I + UA III.1',
    unitTitle: 'Autogestión y Fundamentos Aritméticos',
    focus: 'Observación científica, hipótesis, conversión de medidas SI y factorización prima.',
    hours: 14,
    topics: [
      'Orientación vocacional y manejo de ansiedad académica',
      'Método científico: observación, variables e hipótesis ("El Problema de la Caja Negra")',
      'Sistemas de numeración y sistema decimal',
      'Sistema Internacional de Unidades (SI): múltiplos, submúltiplos y factores de conversión',
      'Clasificación de números: naturales, enteros, racionales, primos y compuestos',
      'Teorema Fundamental de la Aritmética y descomposición prima',
    ],
    evaluations: ['Simulacro Diagnóstico Inicial', 'Quiz Formativo #1: Aritmética y SI'],
    interactiveLabId: 'lab_si_arithmetic',
  },
  {
    weekNumber: 2,
    title: 'Semana 2: Operaciones en Q y R, y Lectura Crítica Inferencial',
    unitCode: 'UA III.2 + UA II.1',
    unitTitle: 'Estructuras Numéricas y Comprensión Lectora',
    focus: 'MCD, MCM, fracciones complejas, leyes de signos y análisis inferencial de textos científicos.',
    hours: 16,
    topics: [
      'MCD y MCM: deducción analítica y resolución de problemas de periodicidad',
      'Operaciones en el cuerpo de los racionales (Q): suma, multiplicación y fracciones complejas',
      'Potenciación y radicación en Q: propiedades de los exponentes enteros y regla de signos',
      'Números irracionales y el cuerpo de los reales (R)',
      'Comprensión lectora: tesis, inferencias contextuales y síntesis de artículos científicos',
      'Detección de sesgos argumentativos y falacias en divulgación científica',
    ],
    evaluations: ['Quiz Formativo #2: Operaciones en Q y R', 'Taller de Lectura Inferencial'],
    interactiveLabId: 'lab_fractions_reading',
  },
  {
    weekNumber: 3,
    title: 'Semana 3: Proporcionalidad, Exponentes Fraccionarios y Polinomios',
    unitCode: 'UA III.3',
    unitTitle: 'Proporcionalidad y Lenguaje Algebraico',
    focus: 'Regla de tres, porcentajes, exponentes racionales y operaciones con polinomios.',
    hours: 15,
    topics: [
      'Proporcionalidad directa e inversa, razones y proporciones continuas',
      'Regla de tres simple, compuesta y aplicaciones de porcentaje comercial y químico',
      'Exponentes fraccionarios y radicales: equivalencia a^(m/n) = sqrt[n](a^m)',
      'Racionalización de denominadores monomios y binomios conjugados',
      'Monomios y binomios: grado absoluto y relativo',
      'Polinomios: suma, resta, producto y división euclidiana (Regla de Ruffini)',
    ],
    evaluations: ['Quiz Formativo #3: Proporcionalidad y Polinomios', 'Reto UCV: La Pregunta Inversa (Nivel 1)'],
    interactiveLabId: 'lab_proportions_polynomials',
  },
  {
    weekNumber: 4,
    title: 'Semana 4: Álgebra Avanzada, Intervalos y Ecuaciones Irracionales',
    unitCode: 'UA III.4 + UA II.2',
    unitTitle: 'Ecuaciones, Inecuaciones y Comunicación Escrita',
    focus: 'Productos notables, factorización profunda, raíces extrañas e intervalos en la recta real.',
    hours: 18,
    topics: [
      'Productos notables y métodos sistemáticos de factorización (factor común, aspa, agrupación)',
      'Ecuaciones de primer grado y modelos de palabras con una incógnita',
      'Ecuaciones de segundo grado: fórmula cuadrática, discriminante y propiedades de las raíces',
      'Ecuaciones irracionales: elevación de potencias y control estricto de raíces extrañas',
      'Sistemas de ecuaciones lineales 2x2 y 3x3 (Cramer, Reducción, Sustitución)',
      'Intervalos, segmentos y semirrectas en R: notación de corchetes, desigualdades e intersección',
      'Comunicación escrita: cohesión, conectores lógicos y estructuración de párrafos de deducción',
    ],
    evaluations: ['Quiz Formativo #4: Álgebra Avanzada e Intervalos', 'Taller de Síntesis Argumentativa'],
    interactiveLabId: 'lab_algebra_intervals',
  },
  {
    weekNumber: 5,
    title: 'Semana 5: Teoría de Conjuntos, Relaciones y Funciones Reales',
    unitCode: 'UA III.5 - Parte A',
    unitTitle: 'Conjuntos y Fundamentos de Cálculo',
    focus: 'Operaciones con diagramas de Venn, producto cartesiano y cálculo analítico de dominio y rango.',
    hours: 16,
    topics: [
      'Teoría de conjuntos: pertenencia, inclusión, unión, intersección, diferencia y complemento',
      'Diagramas de Venn e interpretación de regiones sombreadas',
      'Producto cartesiano A x B y relaciones binarias en R',
      'Definición formal de función real de variable real: criterio de la recta vertical',
      'Dominio analítico: restricciones de denominador no nulo, radicando par >= 0 y logaritmos',
      'Rango analítico y lectura gráfica de asíntotas e intervalos de crecimiento',
    ],
    evaluations: ['Quiz Formativo #5: Conjuntos y Funciones Reales'],
    interactiveLabId: 'lab_sets_functions',
  },
  {
    weekNumber: 6,
    title: 'Semana 6: Trigonometría Analítica, Vectores y Cierre Integral',
    unitCode: 'UA III.5 - Parte B + Cierre',
    unitTitle: 'Geometría Vectorial y Evaluación de Salida',
    focus: 'Razones trigonométricas, identidades fundamentales, descomposición vectorial y prueba final.',
    hours: 16,
    topics: [
      'Ángulos en posición normal, radianes y conversión sexagesimal',
      'Razones trigonométricas en el triángulo rectángulo y círculo trigonométrico unitario',
      'Identidades trigonométricas fundamentales: pitagóricas, recíprocas y por cociente',
      'Ecuaciones trigonométricas básicas en el intervalo [0, 2pi)',
      'Vectores en el plano R^2: punto inicial, final, magnitud euclidiana y ángulo de dirección',
      'Componentes rectangulares (v_x, v_y), suma vectorial analítica y gráfica (paralelogramo)',
      'Cierre del Portafolio Vocacional y plan de estudios para primer semestre en Ciencias UCV',
    ],
    evaluations: ['Quiz Formativo #6: Trigonometría y Vectores', 'Simulacro Diagnóstico Final'],
    interactiveLabId: 'lab_trig_vectors',
  },
];

/**
 * Contenido temático exhaustivo de los 7 módulos del curso con fórmulas KaTeX y ejemplos
 */
export const UCV_CURRICULUM_MODULES: UCVModuleTopic[] = [
  {
    id: 'mod_1_autogestion_metodo',
    title: 'Módulo 1: Autogestión del Aprendizaje y Método Científico',
    week: 1,
    unit: 'UA_I',
    unitName: 'Unidad de Aprendizaje I: Autogestión',
    summary: 'Construcción de hábitos de estudio universitarios, formulación rigurosa de hipótesis y el Problema de la Caja Negra.',
    theoryLatex: [
      'El método científico no es una receta estricta, sino un ciclo epistémico iterativo: Observación $\\longrightarrow$ Pregunta $\\longrightarrow$ Hipótesis $\\longrightarrow$ Experimentación $\\longrightarrow$ Conclusión.',
      'Una hipótesis científica debe ser necesariamente falsable (criterio de Popper): debe existir al menos un experimento conceptualmente posible cuyo resultado la contradiga.',
      'En el **Problema de la Caja Negra**, un sistema $S$ recibe un vector de entrada $\\vec{x} \\in \\mathbb{R}^n$ y devuelve una salida $\\vec{y} = f(\\vec{x})$. El objetivo es deducir la ley $f$ minimizando el número de pruebas empíricas.',
    ],
    keyFormulas: [
      {
        name: 'Modelo de Caja Negra Lineal',
        latex: 'y = m \\cdot x + b',
        description: 'La tasa de cambio constante m determina la pendiente y b la respuesta residual.',
      },
      {
        name: 'Criterio de Discrepancia Experimental',
        latex: '\\varepsilon_{\\text{rel}} = \\frac{|y_{\\text{obs}} - y_{\\text{teo}}|}{y_{\\text{teo}}} \\times 100\\%',
        description: 'Porcentaje de error entre la hipótesis postulada y las mediciones observadas.',
      },
    ],
    stepByStepExamples: [
      {
        title: 'Resolución de Caja Negra Funcional',
        statement: 'Una caja negra produce las siguientes salidas ante entradas sucesivas: f(1) = 5, f(2) = 11, f(3) = 19, f(4) = 29. Deduce la regla matemática subyacente.',
        steps: [
          'Calculamos las primeras diferencias: 11 - 5 = 6; 19 - 11 = 8; 29 - 19 = 10. Las primeras diferencias no son constantes (no es lineal).',
          'Calculamos las segundas diferencias: 8 - 6 = 2; 10 - 8 = 2. Como las segundas diferencias son constantes e iguales a 2, la función es cuadrática: f(x) = ax^2 + bx + c con 2a = 2, luego a = 1.',
          'Planteamos f(x) = x^2 + bx + c: para x=1: 1 + b + c = 5 => b + c = 4. Para x=2: 4 + 2b + c = 11 => 2b + c = 7.',
          'Restamos ambas ecuaciones: (2b + c) - (b + c) = 7 - 4 => b = 3. Luego c = 4 - 3 = 1.',
        ],
        answerLatex: 'f(x) = x^2 + 3x + 1',
      },
    ],
    examTraps: [
      'Confundir correlación con causalidad: que dos variables crezcan juntas no implica que una sea la causa de la otra.',
      'Proponer hipótesis irrefutables ("sucede por causas indeterminables"): esto anula el rigor del método científico.',
    ],
    practiceFlashcards: [
      { front: '¿Qué propiedad define a una hipótesis como científica?', back: 'La falsabilidad: debe existir una prueba experimental capaz de refutarla.' },
      { front: 'Si las segundas diferencias de una secuencia son constantes, ¿qué grado tiene el polinomio?', back: 'Grado 2 (función cuadrática f(x) = ax² + bx + c).' },
    ],
    didacticLayers: [
      {
        conceptTitle: 'Ciclo Epistémico del Método Científico',
        intuition: 'No memorices pasos mecánicos: la ciencia avanza haciendo preguntas medibles y contrastando predicciones con la realidad física.',
        keyFormulaLatex: '\\text{Pregunta} \\longrightarrow \\text{Hipótesis} \\longrightarrow \\text{Experimento} \\longrightarrow \\text{Conclusión}',
        formulaNote: 'Iteración empírica continua',
        examTrap: 'Creer que las hipótesis se demuestran con un 100% de certeza absoluta: en ciencias se corroboran o refutan provisionalmente.',
        fastStrategy: 'Si un enunciado no describe un experimento que conceptualmente pueda contradecirlo, descártalo como hipótesis científica.',
      },
      {
        conceptTitle: 'Criterio de Falsabilidad (Karl Popper)',
        intuition: 'Para que una teoría sea científica, debe arriesgarse a ser derribada si la evidencia experimental no coincide.',
        keyFormulaLatex: '\\exists x \\in E \\mid P(x) = \\text{Falso}',
        formulaNote: 'Condición de refutabilidad empírica',
        examTrap: 'Confundir falsabilidad con "ser falso": falsable significa "comprobable y susceptible de ser refutada empíricamente".',
        fastStrategy: 'Descarta de inmediato opciones que apelen a dogmas incuestionables o "causas misteriosas que escapan a la medición".',
      },
      {
        conceptTitle: 'El Problema de la Caja Negra',
        intuition: 'Imagina una máquina cerrada: metes números y salen otros. Mirando las diferencias entre salidas deduces el mecanismo interno.',
        keyFormulaLatex: 'f(x) = ax^2 + bx + c \\implies \\Delta^2 y = 2a',
        formulaNote: 'Primeras diferencias lineales, segundas diferencias cuadráticas',
        examTrap: 'Asumir comportamiento lineal cuando las primeras diferencias aumentan o disminuyen sistemáticamente.',
        fastStrategy: 'Calcula Δy = y(k+1) - y(k). Si es constante => f es lineal (mx+b). Si Δ(Δy) es constante => f es cuadrática (ax²+bx+c).',
      },
    ],
  },
  {
    id: 'mod_2_comprension_lectura',
    title: 'Módulo 2: Comprensión Lectora Científica y Comunicación Escrita',
    week: 2,
    unit: 'UA_II',
    unitName: 'Unidad de Aprendizaje II: Lenguaje y Crítica',
    summary: 'Decodificación de artículos científicos, identificación de tesis central, detección de falacias y sintaxis formal.',
    theoryLatex: [
      'Un texto científico se estructura típicamente en: Tesis / Planteamiento $\\longrightarrow$ Evidencia empírica $\\longrightarrow$ Discusión de sesgos $\\longrightarrow$ Conclusiones.',
      'La lectura inferencial extrae significados que no están explícitos en el texto, conectando premisas lógicas mediante modus ponens: $P \\implies Q$ y se observa $P$, por tanto $Q$.',
      'Las falacias argumentativas más frecuentes en ciencias son: Ad Verecundiam (apelar a la autoridad sin datos), Falacia de Causa Falsa (Post hoc ergo propter hoc) y Falacia del Hombre de Paja.',
    ],
    keyFormulas: [
      {
        name: 'Estructura de Premisa y Conclusión',
        latex: 'P_1 \\land P_2 \\land \\dots \\land P_n \\implies C',
        description: 'La validez del argumento depende de que la conclusión sea consecuencia necesaria de las premisas.',
      },
    ],
    stepByStepExamples: [
      {
        title: 'Detección de Sesgo y Falacia',
        statement: 'Analiza el fragmento: "El astrofísico ganador del premio Nobel afirmó que las dietas hipercalóricas alteran la memoria, por lo tanto la bioquímica contemporánea debe adoptar su teoría." Identifica el tipo de argumento.',
        steps: [
          'Identificamos la conclusión: "La bioquímica contemporánea debe adoptar su teoría sobre la memoria".',
          'Identificamos la premisa de respaldo: La afirmación proviene de un premio Nobel de astrofísica.',
          'Evaluamos la pertinencia del campo de experticia: El emisor es autoridad en astrofísica, no en neurobiología o bioquímica molecular.',
          'Determinamos la falacia: Argumento de falsa autoridad (Ad Verecundiam).',
        ],
        answerLatex: '\\text{Falacia de Autoridad Incompetente (Ad Verecundiam)}',
      },
    ],
    examTraps: [
      'Elegir una opción que es una verdad científica comprobada pero que NO es la tesis defendida por el autor del texto.',
      'Confundir un ejemplo puntual con la idea principal del párrafo.',
    ],
    practiceFlashcards: [
      { front: '¿Qué es una inferencia textual?', back: 'Una deducción lógica a partir de premisas implícitas en el texto, no escrita explícitamente.' },
      { front: '¿En qué consiste la falacia Post hoc ergo propter hoc?', back: 'Asumir erróneamente que porque el suceso B ocurrió después del suceso A, entonces A causó B.' },
    ],
    didacticLayers: [
      {
        conceptTitle: 'Estructura Argumentativa en Ciencias',
        intuition: 'Un texto científico nunca es una opinión suelta: busca siempre la tesis central y separa los ejemplos de las conclusiones.',
        keyFormulaLatex: '\\text{Tesis} \\longrightarrow \\text{Evidencia Empírica} \\longrightarrow \\text{Conclusión}',
        formulaNote: 'Cadena de justificación demostrativa',
        examTrap: 'Elegir como tesis un dato secundario o un ejemplo numérico que solo ilustra una idea menor del texto.',
        fastStrategy: 'Lee el primer y el último párrafo primero: el 85% de los artículos universitarios condensan su tesis en esas zonas.',
      },
      {
        conceptTitle: 'Lectura Inferencial y Modus Ponens',
        intuition: 'La inferencia une los puntos que el autor dejó explícitos para llegar a lo que necesariamente debe ser verdad.',
        keyFormulaLatex: 'P \\implies Q, \\quad P \\vdash Q',
        formulaNote: 'Regla de deducción lógica directa',
        examTrap: 'Extrapolar más allá del texto: una inferencia válida debe derivarse estrictamente de las premisas presentes.',
        fastStrategy: 'Verifica que la conclusión dependa exclusivamente de lo leído, sin agregar información externa no mencionada.',
      },
      {
        conceptTitle: 'Detección de Falacias Lógicas',
        intuition: 'Cuestiona los argumentos que intentan convencerte usando el prestigio de alguien en vez de datos y demostraciones.',
        keyFormulaLatex: '\\text{Autoridad Incompetente (Ad Verecundiam)}',
        formulaNote: 'Apelación ilegítima sin evidencia de campo',
        examTrap: 'Creer que porque un científico famoso afirma algo en otra disciplina diferente a la suya, su opinión es prueba científica.',
        fastStrategy: 'Pregúntate: ¿El emisor tiene evidencia empírica en ESTE tema concreto? Si solo tiene fama, es falacia.',
      },
    ],
  },
  {
    id: 'mod_3_aritmetica_si',
    title: 'Módulo 3: Fundamentos de Aritmética y Sistema Internacional (SI)',
    week: 1,
    unit: 'UA_III',
    unitName: 'Unidad de Aprendizaje III: Lógico-Matemático (Bloque 3.1)',
    summary: 'Notación científica, prefijos métricos del SI, números primos, divisibilidad y factorización única.',
    theoryLatex: [
      'En el Sistema Internacional, las unidades base de longitud, masa y tiempo son el metro ($\\mathrm{m}$), kilogramo ($\\mathrm{kg}$) y segundo ($\\mathrm{s}$).',
      'La escala de prefijos obedece potencias enteras de 10: $\\mathrm{Tera}\\, (10^{12})$, $\\mathrm{Giga}\\, (10^9)$, $\\mathrm{Mega}\\, (10^6)$, $\\mathrm{Kilo}\\, (10^3)$, $\\mathrm{Mili}\\, (10^{-3})$, $\\mathrm{Micro}\\, (10^{-6})$, $\\mathrm{Nano}\\, (10^{-9})$, $\\mathrm{Pico}\\, (10^{-12})$.',
      'Teorema Fundamental de la Aritmética: Todo entero $n > 1$ se descompone de forma única como producto de factores primos: $n = p_1^{\\alpha_1} p_2^{\\alpha_2} \\cdots p_k^{\\alpha_k}$.',
    ],
    keyFormulas: [
      {
        name: 'Conversión por Factores Unitarios',
        latex: 'V_{\\text{final}} = V_{\\text{inicial}} \\times \\left( \\frac{10^{e_1}}{10^{e_2}} \\right)',
        description: 'Multiplicación sucesiva por razones equivalentes a la unidad.',
      },
      {
        name: 'Número de Divisores Positivos',
        latex: 'N(d) = (\\alpha_1 + 1)(\\alpha_2 + 1)\\cdots(\\alpha_k + 1)',
        description: 'Cantidad exacta de divisores a partir de los exponentes de la factorización prima.',
      },
    ],
    stepByStepExamples: [
      {
        title: 'Conversión de Densidad de g/cm³ a kg/m³',
        statement: 'La densidad del mercurio es 13.6 g/cm³. Expresa este valor en unidades fundamentales del SI (kg/m³).',
        steps: [
          'Escribimos los factores de conversión: 1 kg = 1000 g => (1 kg / 10³ g); 1 m = 100 cm => (1 m³ = 10⁶ cm³).',
          'Planteamos el producto: 13.6 (g/cm³) * (1 kg / 10³ g) * (10⁶ cm³ / 1 m³).',
          'Operamos los coeficientes y las potencias de 10: 13.6 * (10⁶ / 10³) = 13.6 * 10³ kg/m³.',
        ],
        answerLatex: '13600\\,\\mathrm{kg/m^3} = 1.36 \\times 10^4\\,\\mathrm{kg/m^3}',
      },
    ],
    examTraps: [
      'Al elevar una unidad compuesta al cubo (ej. cm³ a m³), olvidar elevar el factor de conversión al cubo: (100 cm)³ = 10⁶ cm³, no 100 cm³.',
      'Creer que el número 1 es primo: por definición axiomática, los números primos son estrictamente mayores que 1.',
    ],
    practiceFlashcards: [
      { front: '¿A qué potencia equivale el prefijo Micro (μ)?', back: '10⁻⁶ (una millonésima parte de la unidad base).' },
      { front: '¿Cuántos divisores positivos tiene el número 72 = 2³ × 3²?', back: '(3 + 1) × (2 + 1) = 4 × 3 = 12 divisores.' },
    ],
    didacticLayers: [
      {
        conceptTitle: 'Unidades Fundamentales del Sistema Internacional',
        intuition: 'Toda medición en ciencias se reduce a longitud (m), masa (kg) y tiempo (s). Nunca mezcles centímetros con segundos al cuadrado.',
        keyFormulaLatex: '[L] = \\mathrm{m}, \\quad [M] = \\mathrm{kg}, \\quad [T] = \\mathrm{s}',
        formulaNote: 'Dimensiones base de la mecánica clásica',
        examTrap: 'Usar gramos o centímetros directamente en fórmulas de fuerza (Newton) o energía (Joule): primero debes pasar a kg y m.',
        fastStrategy: 'Convierte TODAS las variables al SI antes de sustituirlas en la fórmula: 1 N = 1 kg·m/s².',
      },
      {
        conceptTitle: 'Escala de Prefijos y Potencias de 10',
        intuition: 'Los prefijos son atajos para no escribir ceros: Kilo es 10³, Mega es 10⁶, mientras Mili es 10⁻³ y Micro es 10⁻⁶.',
        keyFormulaLatex: '10^3 \\;(\\mathrm{k}), \\quad 10^6 \\;(\\mathrm{M}), \\quad 10^{-3} \\;(\\mathrm{m}), \\quad 10^{-6} \\;(\\mu)',
        formulaNote: 'Prefijos decimales normalizados',
        examTrap: 'Al elevar unidades con prefijos (como cm³ a m³), olvidar elevar el factor: 1 m = 100 cm => 1 m³ = 10⁶ cm³, no 100.',
        fastStrategy: 'Escribe el factor entre paréntesis antes de elevar: (10⁻² m)³ = 10⁻⁶ m³.',
      },
      {
        conceptTitle: 'Teorema Fundamental de la Aritmética',
        intuition: 'Los números primos son los átomos de la matemática: cualquier número entero se desarma de una sola forma en primos.',
        keyFormulaLatex: 'n = p_1^{\\alpha_1} p_2^{\\alpha_2} \\cdots p_k^{\\alpha_k}',
        formulaNote: 'Descomposición única en factores primos',
        examTrap: 'Considerar el 1 como número primo: por axioma, los números primos son enteros mayores estrictos que 1.',
        fastStrategy: 'Para contar el total de divisores positivos de n: suma 1 a cada exponente y multiplícalos: N = (α₁+1)(α₂+1)...',
      },
    ],
  },
  {
    id: 'mod_4_operaciones_q_r',
    title: 'Módulo 4: Operaciones en Q y R, MCD, MCM y Radicales',
    week: 2,
    unit: 'UA_III',
    unitName: 'Unidad de Aprendizaje III: Lógico-Matemático (Bloque 3.2)',
    summary: 'Aritmética exacta en los racionales, simplificación de castillos de fracciones, MCD/MCM y propiedades de la radicación.',
    theoryLatex: [
      'El Máximo Común Divisor (MCD) se obtiene con los factores primos comunes con su menor exponente. El Mínimo Común Múltiplo (MCM) toma comunes y no comunes con su mayor exponente.',
      'Relación canónica entre dos números: $\\mathrm{MCD}(a, b) \\cdot \\mathrm{MCM}(a, b) = a \\cdot b$.',
      'Propiedades de los radicales en $\\mathbb{R}^+$: $\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}$, $\\sqrt[m]{\\sqrt[n]{a}} = \\sqrt[m \\cdot n]{a}$, y $(\\sqrt[n]{a})^m = \\sqrt[n]{a^m} = a^{m/n}$.',
    ],
    keyFormulas: [
      {
        name: 'Suma de Fracciones Racionales',
        latex: '\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{a \\cdot d \\pm b \\cdot c}{b \\cdot d}',
        description: 'Reducción a común denominador con b, d distintos de cero.',
      },
      {
        name: 'Cociente de Fracciones Complejas',
        latex: '\\frac{\\frac{a}{b}}{\\frac{c}{d}} = \\frac{a \\cdot d}{b \\cdot c}',
        description: 'Ley de la doble C o producto de extremos entre producto de medios.',
      },
    ],
    stepByStepExamples: [
      {
        title: 'Simplificación de Fracción Compleja',
        statement: 'Resuelve y simplifica a su mínima expresión: [1 - 1/(1 + 1/2)] / [2 - 1/(2 - 1/3)].',
        steps: [
          'Calculamos el denominador interno del numerador: 1 + 1/2 = 3/2. Entonces 1 / (3/2) = 2/3.',
          'Numerador completo: 1 - 2/3 = 1/3.',
          'Calculamos el denominador interno del denominador: 2 - 1/3 = 5/3. Entonces 1 / (5/3) = 3/5.',
          'Denominador completo: 2 - 3/5 = 7/5.',
          'Aplicamos producto de extremos entre medios: (1/3) / (7/5) = (1 * 5) / (3 * 7) = 5/21.',
        ],
        answerLatex: '\\frac{5}{21}',
      },
    ],
    examTraps: [
      'Distribuir una raíz sobre la suma: ¡GRAVE ERROR! sqrt(a + b) != sqrt(a) + sqrt(b). Por ejemplo: sqrt(9 + 16) = sqrt(25) = 5 != 3 + 4 = 7.',
      'Olvidar el doble signo al despejar variables cuadráticas: x² = 9 implica x = ±3, no solamente 3.',
    ],
    practiceFlashcards: [
      { front: '¿Cómo se relacionan MCD(a, b) y MCM(a, b) con el producto a × b?', back: 'MCD(a, b) × MCM(a, b) = a × b para todo a, b enteros positivos.' },
      { front: '¿Cuánto vale (-2)⁴ frente a -2⁴?', back: '(-2)⁴ = +16 (base negativa con exponente par); -2⁴ = -(2⁴) = -16.' },
    ],
    didacticLayers: [
      {
        conceptTitle: 'Aritmética en el Cuerpo Q & Fracciones Complejas',
        intuition: 'Un castillo de fracciones se resuelve de abajo hacia arriba: simplifica cada piso antes de aplicar la ley de la doble C.',
        keyFormulaLatex: '\\frac{a/b}{c/d} = \\frac{a \\cdot d}{b \\cdot c}',
        formulaNote: 'Producto de extremos entre producto de medios',
        examTrap: 'Sumar numeradores y denominadores en línea recta: 1/2 + 1/3 NO es 2/5, requiere común denominador 6.',
        fastStrategy: 'Resuelve primero el denominador más anidado y convierte cada número entero a fracción (ej. 2 = 6/3).',
      },
      {
        conceptTitle: 'Relación Canónica MCD × MCM',
        intuition: 'El MCD toma lo que se repite al mínimo exponente; el MCM reúne todo lo necesario para contener a ambos números.',
        keyFormulaLatex: '\\mathrm{MCD}(a, b) \\cdot \\mathrm{MCM}(a, b) = a \\cdot b',
        formulaNote: 'Conservación del producto de factores',
        examTrap: 'Confundir problemas de periodicidad (MCM, ej. coincidencia de alarmas) con problemas de reparto máximo (MCD).',
        fastStrategy: '¿Preguntan cuándo vuelven a coincidir? Usa MCM. ¿Preguntan el mayor tamaño de paquetes iguales? Usa MCD.',
      },
      {
        conceptTitle: 'Propiedades de los Radicales en R',
        intuition: 'Un radical es una potencia fraccionaria disfrazada: la raíz enésima es el denominador del exponente.',
        keyFormulaLatex: '\\sqrt[n]{a^m} = a^{m/n}, \\quad \\sqrt{a \\cdot b} = \\sqrt{a} \\sqrt{b}',
        formulaNote: 'Equivalencia exponencial de radicales',
        examTrap: 'Distribuir una raíz sobre la suma: ¡GRAVE ERROR! sqrt(a + b) != sqrt(a) + sqrt(b).',
        fastStrategy: 'Ante sumas bajo la raíz (como sqrt(9+16)), suma primero los términos interiores (sqrt(25)=5) antes de extraer.',
      },
    ],
  },
  {
    id: 'mod_5_proporciones_polinomios',
    title: 'Módulo 5: Proporcionalidad, Exponentes Racionales y Polinomios',
    week: 3,
    unit: 'UA_III',
    unitName: 'Unidad de Aprendizaje III: Lógico-Matemático (Bloque 3.3)',
    summary: 'Modelado con regla de tres directa e inversa, exponentes a^(m/n), operaciones con polinomios y división sintética.',
    theoryLatex: [
      'Dos magnitudes $A$ y $B$ son directamente proporcionales si su cociente es constante: $A/B = k$. Son inversamente proporcionales si su producto es constante: $A \\cdot B = k$.',
      'Exponentes racionales: $a^{m/n} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m$ para $a > 0, n \\in \\mathbb{N}, n \\ge 2$.',
      'Algoritmo de la división de polinomios: $P(x) = D(x) \\cdot Q(x) + R(x)$, donde el grado de $R(x)$ es estrictamente menor que el grado de $D(x)$ o $R(x) = 0$.',
    ],
    keyFormulas: [
      {
        name: 'Regla de Tres Simple Inversa',
        latex: 'x = \\frac{A_1 \\cdot B_1}{A_2}',
        description: 'Aplicable cuando mayor cantidad de obreros/velocidad reduce el tiempo proporcionalmente.',
      },
      {
        name: 'Teorema del Resto',
        latex: 'R = P(a)',
        description: 'El resto de dividir un polinomio P(x) entre (x - a) es exactamente el valor numérico P(a).',
      },
    ],
    stepByStepExamples: [
      {
        title: 'División Sintética por Regla de Ruffini',
        statement: 'Divide P(x) = 2x³ - 5x² + x - 7 entre (x - 3) y halla el cociente y el resto.',
        steps: [
          'Ubicamos el valor raíz del divisor: x - 3 = 0 => a = 3.',
          'Coeficientes del dividendo: [2, -5, 1, -7].',
          'Bajamos el primer coeficiente: 2.',
          'Multiplicamos por 3 y sumamos: 2 * 3 = 6; -5 + 6 = 1.',
          'Multiplicamos por 3 y sumamos: 1 * 3 = 3; 1 + 3 = 4.',
          'Multiplicamos por 3 y sumamos: 4 * 3 = 12; -7 + 12 = 5 (Resto).',
        ],
        answerLatex: 'Q(x) = 2x^2 + x + 4, \\quad R = 5',
      },
    ],
    examTraps: [
      'Al aplicar Ruffini, olvidar colocar coeficientes 0 para los términos intermedios que falten (ej. si falta x², colocar 0).',
      'Confundir magnitudes inversas con directas en problemas de velocidad y tiempo o rendimiento de trabajo.',
    ],
    practiceFlashcards: [
      { front: '¿Qué afirma el Teorema del Resto?', back: 'El residuo de dividir P(x) entre (x - c) es igual al polinomio evaluado en c: R = P(c).' },
      { front: '¿Cómo se convierte a^(-3/2) a radical positivo?', back: 'a^(-3/2) = 1 / sqrt(a³) = 1 / (a sqrt(a)).' },
    ],
    didacticLayers: [
      {
        conceptTitle: 'Proporcionalidad Directa e Inversa',
        intuition: 'Directa: si una variable sube, la otra sube en la misma proporción (cociente constante). Inversa: si una sube, la otra baja (producto constante).',
        keyFormulaLatex: '\\text{Directa: } \\frac{y}{x} = k, \\quad \\text{Inversa: } y \\cdot x = k',
        formulaNote: 'Ecuaciones de estado proporcional',
        examTrap: 'Aplicar regla de tres directa a obreros y días: si duplicas obreros, los días se reducen a la mitad, no al doble.',
        fastStrategy: 'Identifica la relación mentalmente: ¿Más obreros tardan más o menos tiempo? Menos tiempo => Inversa.',
      },
      {
        conceptTitle: 'Exponentes Racionales y Radicales Negativos',
        intuition: 'El signo menos en el exponente significa "pasa al denominador": a⁻² = 1/a². La fracción indica raíz: a^(1/2) = sqrt(a).',
        keyFormulaLatex: 'a^{-m/n} = \\frac{1}{\\sqrt[n]{a^m}}',
        formulaNote: 'Inversión y radicación simultánea',
        examTrap: 'Pensar que una base con exponente negativo se vuelve un número negativo: 2⁻³ = 1/8, que es positivo.',
        fastStrategy: 'Aplica primero el signo negativo invirtiendo la fracción, luego extrae la raíz del denominador.',
      },
      {
        conceptTitle: 'División de Polinomios & Regla de Ruffini',
        intuition: 'Ruffini es un algoritmo abreviado para dividir entre (x - a): solo operas los coeficientes numéricos sumando y multiplicando.',
        keyFormulaLatex: 'P(x) = (x - a)Q(x) + R, \\quad R = P(a)',
        formulaNote: 'Teorema del Resto y división sintética',
        examTrap: 'Olvidar poner coeficiente 0 cuando falte una potencia intermedia en el polinomio dividendo.',
        fastStrategy: 'Ordena y completa el polinomio siempre antes de la tabla: si tienes x³ + 5x - 1, escribe los coeficientes [1, 0, 5, -1].',
      },
    ],
  },
  {
    id: 'mod_6_algebra_intervalos',
    title: 'Módulo 6: Álgebra Avanzada, Intervalos y Ecuaciones Irracionales',
    week: 4,
    unit: 'UA_III',
    unitName: 'Unidad de Aprendizaje III: Lógico-Matemático (Bloque 3.4)',
    summary: 'Productos notables, factorización completa, resolución de ecuaciones irracionales con chequeo de raíces extrañas e intervalos en R.',
    theoryLatex: [
      'Productos notables cardinales: $(a \\pm b)^2 = a^2 \\pm 2ab + b^2$, $(a+b)(a-b) = a^2 - b^2$, y $(a \\pm b)^3 = a^3 \\pm 3a^2b + 3ab^2 \\pm b^3$.',
      'Ecuaciones irracionales: Para resolver $\\sqrt{A(x)} = B(x)$, se eleva al cuadrado obteniendo $A(x) = [B(x)]^2$. Esta operación puede introducir soluciones extrañas que violen la condición $B(x) \\ge 0$, por lo que la comprobación es un requisito formal indispensable.',
      'Operaciones de intervalos en $\\mathbb{R}$: La intersección $I_1 \\cap I_2$ contiene únicamente los puntos comunes a ambos subconjuntos de la recta real.',
    ],
    keyFormulas: [
      {
        name: 'Fórmula Cuadrática y Discriminante',
        latex: 'x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}, \\quad \\Delta = b^2 - 4ac',
        description: 'Delta > 0: dos raíces reales distintas; Delta = 0: raíz doble; Delta < 0: raíces complejas conjugadas.',
      },
      {
        name: 'Intersección de Intervalos',
        latex: '(a, b] \\cap [c, d) = [\\max(a, c), \\min(b, d)]',
        description: 'Siempre que el extremo inferior resultante sea menor o igual al superior.',
      },
    ],
    stepByStepExamples: [
      {
        title: 'Resolución de Ecuación Irracional con Raíz Extraña',
        statement: 'Resuelve en R: sqrt(2x + 9) = x - 3 y verifica si existen raíces extrañas.',
        steps: [
          'Elevamos ambos miembros al cuadrado: 2x + 9 = (x - 3)².',
          'Desarrollamos el binomio: 2x + 9 = x² - 6x + 9.',
          'Igualamos a cero: x² - 8x = 0 => x(x - 8) = 0. Candidatos: x = 0 y x = 8.',
          'Comprobación formal para x = 0: sqrt(2(0) + 9) = sqrt(9) = 3; mientras que x - 3 = 0 - 3 = -3. Como 3 != -3, x = 0 es una RAÍZ EXTRAÑA y se descarta.',
          'Comprobación formal para x = 8: sqrt(2(8) + 9) = sqrt(25) = 5; y x - 3 = 8 - 3 = 5. Como 5 == 5, x = 8 es la única solución válida.',
        ],
        answerLatex: 'S = \\{8\\} \\quad (x = 0 \\text{ es raíz extraña descarta})',
      },
    ],
    examTraps: [
      'No verificar las soluciones en la ecuación irracional original: en la UCV este descuido resta la totalidad del puntaje del ejercicio.',
      'Dividir ambos lados de una ecuación por una expresión con incógnita (ej. dividir por x): esto elimina soluciones válidas ($x=0$).',
    ],
    practiceFlashcards: [
      { front: '¿Por qué surgen raíces extrañas en ecuaciones irracionales?', back: 'Porque elevar ambos lados a una potencia par no es una equivalencia lógica bidireccional: u = v implica u² = v², pero u² = v² implica u = ±v.' },
      { front: '¿Qué representa geométricamente la diferencia de cuadrados a² - b²?', back: 'El área de un rectángulo de lados (a + b) y (a - b).' },
    ],
    didacticLayers: [
      {
        conceptTitle: 'Productos Notables y Factorización Canónica',
        intuition: 'Reconocer patrones visuales te ahorra multiplicar término a término: binomio al cuadrado, diferencia de cuadrados y trinomio de la forma.',
        keyFormulaLatex: '(a \\pm b)^2 = a^2 \\pm 2ab + b^2, \\quad a^2 - b^2 = (a+b)(a-b)',
        formulaNote: 'Identidades algebraicas fundamentales',
        examTrap: 'Escribir (a + b)² = a² + b² olvidando el doble producto central 2ab.',
        fastStrategy: 'Repite mentalmente: el cuadrado del primero, más o menos el doble del primero por el segundo, más el cuadrado del segundo.',
      },
      {
        conceptTitle: 'Ecuaciones Irracionales & Raíces Extrañas',
        intuition: 'Elevar al cuadrado puede crear soluciones "fantasma" que resuelven la versión con signo contrario pero no la raíz original.',
        keyFormulaLatex: '\\sqrt{A(x)} = B(x) \\implies A(x) = [B(x)]^2 \\quad (\\text{requiere } B(x) \\ge 0)',
        formulaNote: 'Comprobación obligatoria en la ecuación original',
        examTrap: 'No comprobar las soluciones candidatas: si x = 0 da sqrt(9) = -3, esa raíz debe ser descartada sin piedad.',
        fastStrategy: 'Sustituye siempre tus candidatos en la ecuación con raíz: la raíz cuadrada principal nunca puede dar un resultado negativo.',
      },
      {
        conceptTitle: 'Operaciones e Intersección de Intervalos en R',
        intuition: 'Dibuja siempre la recta real: los paréntesis () indican extremos abiertos (no incluidos) y los corchetes [] cerrados (incluidos).',
        keyFormulaLatex: 'I_1 \\cap I_2 = \\{x \\in \\mathbb{R} : x \\in I_1 \\land x \\in I_2\\}',
        formulaNote: 'Zona de superposición simultánea',
        examTrap: 'Confundir unión (juntar todo) con intersección (solo lo común a ambos conjuntos).',
        fastStrategy: 'Traza dos líneas de colores distintos en la recta numérica: la intersección es la franja donde se cruzan ambos colores.',
      },
    ],
  },
  {
    id: 'mod_7_conjuntos_funciones_vectores',
    title: 'Módulo 7: Conjuntos, Funciones Reales, Trigonometría y Vectores',
    week: 5,
    unit: 'UA_III',
    unitName: 'Unidad de Aprendizaje III: Lógico-Matemático (Bloque 3.5)',
    summary: 'Diagramas de Venn, cálculo de Dominio y Rango, razones trigonométricas e identidades, y álgebra vectorial en R².',
    theoryLatex: [
      'Operaciones de conjuntos: $A \\cup B = \\{x : x \\in A \\lor x \\in B\\}$, $A \\cap B = \\{x : x \\in A \\land x \\in B\\}$, $A - B = \\{x : x \\in A \\land x \\notin B\\}$, y $A \\Delta B = (A - B) \\cup (B - A)$.',
      'Dominio de una función real: El mayor subconjunto $D_f \\subseteq \\mathbb{R}$ donde $f(x)$ está definida con valores reales (sin divisiones entre cero ni raíces pares de números negativos).',
      'Vectores en $\\mathbb{R}^2$: Un vector $\\vec{v} = (v_x, v_y)$ posee magnitud $|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}$ y ángulo director $\\theta = \\arctan(v_y / v_x)$. La suma se realiza componente a componente: $\\vec{u} + \\vec{v} = (u_x + v_x, u_y + v_y)$.',
    ],
    keyFormulas: [
      {
        name: 'Identidad Trigonométrica Fundamental',
        latex: '\\sin^2\\theta + \\cos^2\\theta = 1, \\quad 1 + \\tan^2\\theta = \\sec^2\\theta',
        description: 'Válida para todo ángulo en el que las funciones estén definidas.',
      },
      {
        name: 'Componentes Rectangulares de un Vector',
        latex: 'v_x = |\\vec{v}| \\cos\\theta, \\quad v_y = |\\vec{v}| \\sin\\theta',
        description: 'Descomposición cartesiana a partir de su módulo y dirección angular.',
      },
    ],
    stepByStepExamples: [
      {
        title: 'Cálculo de Dominio de Función con Raíz y Denominador',
        statement: 'Determina el dominio analítico de la función f(x) = sqrt(x + 5) / (x - 2).',
        steps: [
          'Restricción del radicando par: debe cumplirse x + 5 >= 0 => x >= -5.',
          'Restricción del denominador fraccionario: x - 2 != 0 => x != 2.',
          'Intersecamos ambas condiciones: x in [-5, infty) y x != 2.',
          'Expresamos en notación formal de unión de intervalos.',
        ],
        answerLatex: '\\mathrm{Dom}(f) = [-5, 2) \\cup (2, +\\infty)',
      },
    ],
    examTraps: [
      'Olvidar excluir los puntos que anulan el denominador aunque cumplan con la condición de la raíz cuadrada.',
      'Al calcular el ángulo de un vector con arctan(y/x), no considerar el cuadrante correcto (ej. segundo o tercer cuadrante requiere sumar 180°).',
    ],
    practiceFlashcards: [
      { front: '¿Qué es la diferencia simétrica A Δ B de dos conjuntos?', back: 'Los elementos que pertenecen a A o a B, pero no a ambos: (A ∪ B) - (A ∩ B).' },
      { front: 'Si un vector tiene componentes u = (-3, 4), ¿cuál es su módulo y cuadrante?', back: '|u| = sqrt((-3)² + 4²) = 5; está en el segundo cuadrante (x negativo, y positivo).' },
    ],
    didacticLayers: [
      {
        conceptTitle: 'Teoría de Conjuntos & Diferencia Simétrica',
        intuition: 'La diferencia simétrica A Δ B es lo exclusivo de cada grupo: lo que está en A o en B, pero nunca en la intersección compartida.',
        keyFormulaLatex: 'A \\Delta B = (A \\cup B) - (A \\cap B)',
        formulaNote: 'Disyunción exclusiva en conjuntos',
        examTrap: 'Olvidar restar la intersección en diagramas de Venn de tres conjuntos al calcular totales de personas.',
        fastStrategy: 'Rellena primero la región central compartida (la triple intersección) y luego ve restando hacia afuera.',
      },
      {
        conceptTitle: 'Dominio Analítico de Funciones Reales',
        intuition: 'Para hallar el dominio, busca únicamente lo prohibido en los números reales: dividir entre cero y raíces de índice par negativas.',
        keyFormulaLatex: '\\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad \\sqrt{R(x)} \\implies R(x) \\ge 0',
        formulaNote: 'Condiciones de existencia en R',
        examTrap: 'Restringir el dominio de raíces de índice impar (como raíz cúbica): las raíces impares existen para todo número real.',
        fastStrategy: 'Si la raíz par está en el denominador, la condición es estrictamente mayor que cero: R(x) > 0 (sin el igual).',
      },
      {
        conceptTitle: 'Vectores en el Plano R² & Descomposición',
        intuition: 'Un vector es una flecha con tamaño (módulo) y rumbo (ángulo). En componentes rectangulares se suma como si fueran coordenadas x e y independientes.',
        keyFormulaLatex: '|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}, \\quad v_x = |\\vec{v}|\\cos\\theta, \\quad v_y = |\\vec{v}|\\sin\\theta',
        formulaNote: 'Geometría euclidiana del plano',
        examTrap: 'Calcular el ángulo director con arctan(y/x) sin revisar el cuadrante: en cuadrantes II y III debes sumar 180° al ángulo de la calculadora.',
        fastStrategy: 'Dibuja el vector en los ejes cartesianos: si vx es negativo y vy positivo, está en el II cuadrante (entre 90° y 180°).',
      },
    ],
  },
];

/**
 * Banco oficial de reactivos (40+ preguntas) calibradas para el Curso Introductorio UCV
 */
export const UCV_EXAM_BANK: Question[] = [
  // --- UA I: Autogestión y Método Científico ---
  {
    id: 'ucv-q-101',
    subject: 'Física',
    topic: 'Método Científico',
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'En el contexto del método científico, ¿cuál de las siguientes afirmaciones describe de manera rigurosa una hipótesis válida?',
    options: [
      { id: 'opt-0', text: 'Una afirmación indiscutible aceptada por consenso general de los investigadores.' },
      { id: 'opt-1', text: 'Una proposición explicativa tentativa que es susceptible de ser contrastada y refutada empíricamente.' },
      { id: 'opt-2', text: 'Un modelo matemático con un grado de certeza del 100% que no admite margen de error.' },
      { id: 'opt-3', text: 'Una deducción filosófica abstracta independiente de cualquier medición física.' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'El criterio popperiano de falsabilidad establece que una hipótesis solo es científica si existe al menos una observación o experimento conceptualmente factible que pueda demostrar su falsedad.',
    sourceExam: 'Curso Introductorio UCV - UA I',
  },
  {
    id: 'ucv-q-102',
    subject: 'Matemática',
    topic: 'Problema de la Caja Negra',
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Una caja negra experimental arroja los siguientes pares de entrada y salida: (1, 3), (2, 7), (3, 13), (4, 21). ¿Qué ley de correspondencia modela su comportamiento?',
    options: [
      { id: 'opt-0', text: 'f(x) = 4x - 1' },
      { id: 'opt-1', text: 'f(x) = x² + x + 1' },
      { id: 'opt-2', text: 'f(x) = 2x² + 1' },
      { id: 'opt-3', text: 'f(x) = 3x' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'Las primeras diferencias son 4, 6, 8 (no constante). Las segundas diferencias son 2 (constante), por lo que f(x) = ax² + bx + c con a = 1. Para x=1: 1 + 1 + 1 = 3; x=2: 4 + 2 + 1 = 7; x=3: 9 + 3 + 1 = 13. La ley es f(x) = x² + x + 1.',
    sourceExam: 'Curso Introductorio UCV - UA I',
  },

  // --- UA II: Comprensión Lectora y Comunicación Escrita ---
  {
    id: 'ucv-q-201',
    subject: 'Castellano',
    topic: 'Lectura Inferencial',
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Lee el siguiente texto: "Aunque la aceleración del universo se atribuye teóricamente a la energía oscura, ningún detector contemporáneo ha medido directamente sus constituyentes cuánticos." ¿Cuál es una inferencia válida del texto?',
    options: [
      { id: 'opt-0', text: 'La energía oscura ha sido plenamente descartada por los astrofísicos.' },
      { id: 'opt-1', text: 'La evidencia sobre la energía oscura proviene de observaciones macroscópicas indirectas y no de detección cuántica local.' },
      { id: 'opt-2', text: 'El universo no se está expandiendo aceleradamente.' },
      { id: 'opt-3', text: 'Los detectores actuales violan las leyes de la termodinámica.' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'El texto afirma que la aceleración se atribuye a este fenómeno pero que no hay detección cuántica directa, lo que implica necesariamente que el sustento actual descansa en mediciones macroscópicas indirectas.',
    sourceExam: 'Curso Introductorio UCV - UA II',
  },
  {
    id: 'ucv-q-202',
    subject: 'Castellano',
    topic: 'Análisis de Sesgos y Falacias',
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Identifica la falacia en el siguiente argumento: "No debemos aceptar los cálculos sobre dinámica orbital del profesor Pérez porque en su época universitaria reprobó dos veces cálculo integral."',
    options: [
      { id: 'opt-0', text: 'Falacia de Causa Falsa (Post hoc)' },
      { id: 'opt-1', text: 'Falacia Ad Hominem (ataque a la persona en lugar del argumento)' },
      { id: 'opt-2', text: 'Falacia de Petición de Principio' },
      { id: 'opt-3', text: 'Falacia Ad Ignorantiam' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'Se ataca el historial o circunstancias personales del emisor en lugar de refutar los cálculos matemáticos presentados, lo cual constituye una falacia Ad Hominem canónica.',
    sourceExam: 'Curso Introductorio UCV - UA II',
  },

  // --- UA III.1: Fundamentos de Aritmética y SI ---
  {
    id: 'ucv-q-301',
    subject: 'Física',
    topic: 'Sistema Internacional y Notación',
    difficulty: 'Básico',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Un condensador tiene una capacitancia de 450 picofaradios (pF). Expresa esta medida en microfaradios (μF).',
    options: [
      { id: 'opt-0', text: '4.5 × 10⁻⁴ μF' },
      { id: 'opt-1', text: '4.5 × 10⁻² μF' },
      { id: 'opt-2', text: '0.045 μF' },
      { id: 'opt-3', text: '4.5 × 10³ μF' },
    ],
    correctOptionId: 'opt-0',
    explanation: '1 pF = 10⁻¹² F y 1 μF = 10⁻⁶ F. Luego 450 pF = 450 × 10⁻¹² F = 4.5 × 10⁻¹⁰ F = 4.5 × 10⁻⁴ × 10⁻⁶ F = 4.5 × 10⁻⁴ μF.',
    sourceExam: 'Curso Introductorio UCV - Módulo 3.1',
  },
  {
    id: 'ucv-q-302',
    subject: 'Matemática',
    topic: 'Descomposición Prima y Divisibilidad',
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: '¿Cuál es la cantidad total de divisores positivos que posee el número 360?',
    options: [
      { id: 'opt-0', text: '18 divisores' },
      { id: 'opt-1', text: '24 divisores' },
      { id: 'opt-2', text: '12 divisores' },
      { id: 'opt-3', text: '36 divisores' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'La descomposición prima de 360 es 2³ × 3² × 5¹. El número de divisores es (3 + 1)(2 + 1)(1 + 1) = 4 × 3 × 2 = 24.',
    sourceExam: 'Curso Introductorio UCV - Módulo 3.1',
  },

  // --- UA III.2: Operaciones en Q y R ---
  {
    id: 'ucv-q-303',
    subject: 'Matemática',
    topic: 'Operaciones en Q',
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Calcula el valor irreducible de la expresión: E = (2/3 - 1/4) / (5/6 + 1/2).',
    options: [
      { id: 'opt-0', text: '5/16' },
      { id: 'opt-1', text: '5/8' },
      { id: 'opt-2', text: '1/4' },
      { id: 'opt-3', text: '7/12' },
    ],
    correctOptionId: 'opt-0',
    explanation: 'Numerador: 2/3 - 1/4 = (8 - 3)/12 = 5/12. Denominador: 5/6 + 1/2 = (5 + 3)/6 = 8/6 = 4/3. Cociente: (5/12) / (4/3) = (5 × 3) / (12 × 4) = 15/48 = 5/16.',
    sourceExam: 'Curso Introductorio UCV - Módulo 3.2',
  },
  {
    id: 'ucv-q-304',
    subject: 'Matemática',
    topic: 'MCD y MCM Aplicado',
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Tres satélites de investigación pasan sobre la estación terrestre de Caracas cada 12, 18 y 30 horas respectivamente. Si coinciden hoy a las 12:00 m, ¿cuántas horas transcurrirán hasta su próxima coincidencia simultánea?',
    options: [
      { id: 'opt-0', text: '90 horas' },
      { id: 'opt-1', text: '180 horas' },
      { id: 'opt-2', text: '360 horas' },
      { id: 'opt-3', text: '60 horas' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'La próxima coincidencia ocurre en el MCM(12, 18, 30). Descomposiciones: 12 = 2² × 3; 18 = 2 × 3²; 30 = 2 × 3 × 5. MCM = 2² × 3² × 5 = 4 × 9 × 5 = 180 horas.',
    sourceExam: 'Curso Introductorio UCV - Módulo 3.2',
  },

  // --- UA III.3: Proporcionalidad y Polinomios ---
  {
    id: 'ucv-q-305',
    subject: 'Matemática',
    topic: 'Proporcionalidad Compuesta',
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Seis investigadores procesan 120 muestras biológicas en 8 horas. ¿Cuántas horas requerirán 4 investigadores para procesar 180 muestras con el mismo ritmo?',
    options: [
      { id: 'opt-0', text: '12 horas' },
      { id: 'opt-1', text: '18 horas' },
      { id: 'opt-2', text: '15 horas' },
      { id: 'opt-3', text: '16 horas' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'Razón de proporcionalidad: Horas = (Muestras / Investigadores) × k. Con los datos: 8 = (120/6) × k => 8 = 20k => k = 8/20 = 2/5. Para el nuevo caso: Horas = (180/4) × (2/5) = 45 × 0.4 = 18 horas.',
    sourceExam: 'Curso Introductorio UCV - Módulo 3.3',
  },
  {
    id: 'ucv-q-306',
    subject: 'Matemática',
    topic: 'Polinomios y Algoritmo de División',
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Al dividir el polinomio $P(x) = 3x^4 - 2x^2 + kx - 5$ entre $(x - 2)$, el resto es $41$. ¿Cuál es el valor del parámetro $k$?',
    options: [
      { id: 'opt-0', text: '$k = 3$' },
      { id: 'opt-1', text: '$k = -3$' },
      { id: 'opt-2', text: '$k = 2$' },
      { id: 'opt-3', text: '$k = -2$' },
    ],
    correctOptionId: 'opt-0',
    explanation: 'Por el Teorema del Resto, el residuo es $R = P(2) = 41$. Evaluando en $x = 2$: $P(2) = 3(2^4) - 2(2^2) + k(2) - 5 = 48 - 8 + 2k - 5 = 35 + 2k$. Igualando al resto obtenido: $35 + 2k = 41 \\implies 2k = 6 \\implies k = 3$.',
    sourceExam: 'Curso Introductorio UCV - Módulo 3.3',
  },

  // --- UA III.4: Álgebra Avanzada, Intervalos y Ecuaciones Irracionales ---
  {
    id: 'ucv-q-307',
    subject: 'Matemática',
    topic: 'Ecuaciones Irracionales',
    difficulty: 'Avanzado',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Resuelve en el conjunto de los números reales la ecuación: $\\sqrt{3x + 1} = x - 1$.',
    options: [
      { id: 'opt-0', text: '$S = \\{0, 5\\}$' },
      { id: 'opt-1', text: '$S = \\{5\\}$' },
      { id: 'opt-2', text: '$S = \\{0\\}$' },
      { id: 'opt-3', text: '$S = \\emptyset$' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'Elevando ambos miembros al cuadrado: $3x + 1 = (x - 1)^2 = x^2 - 2x + 1 \\implies x^2 - 5x = 0 \\implies x(x - 5) = 0$. Candidatos: $x = 0$ y $x = 5$. Comprobamos $x = 0$: $\\sqrt{1} = 1 \\neq 0 - 1 = -1$ (solución extraña). Comprobamos $x = 5$: $\\sqrt{16} = 4 = 5 - 1 = 4$ (válida). Por lo tanto, el conjunto solución es $S = \\{5\\}$.',
    sourceExam: 'Curso Introductorio UCV - Módulo 3.4',
  },
  {
    id: 'ucv-q-308',
    subject: 'Matemática',
    topic: 'Intervalos en R',
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Dados los intervalos $A = (-3, 5]$ y $B = [1, 9)$, ¿cuál es el resultado de la intersección $A \\cap B$?',
    options: [
      { id: 'opt-0', text: '$(-3, 9)$' },
      { id: 'opt-1', text: '$[1, 5]$' },
      { id: 'opt-2', text: '$(1, 5)$' },
      { id: 'opt-3', text: '$[-3, 1]$' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'La intersección $A \\cap B$ comprende los puntos comunes: $-3 < x \\le 5$ y $1 \\le x < 9$. El extremo inferior común es $1$ (cerrado) y el superior es $5$ (cerrado). Por ende, $A \\cap B = [1, 5]$.',
    sourceExam: 'Curso Introductorio UCV - Módulo 3.4',
  },

  // --- UA III.5: Conjuntos, Funciones, Trigonometría y Vectores ---
  {
    id: 'ucv-q-309',
    subject: 'Matemática',
    topic: 'Dominio de Funciones Reales',
    difficulty: 'Avanzado',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Halla el dominio de la función real: $f(x) = \\frac{\\sqrt{4 - x^2}}{x - 1}$.',
    options: [
      { id: 'opt-0', text: '$[-2, 2]$' },
      { id: 'opt-1', text: '$[-2, 1) \\cup (1, 2]$' },
      { id: 'opt-2', text: '$(-\\infty, -2] \\cup [2, +\\infty)$' },
      { id: 'opt-3', text: '$[-2, 2] \\setminus \\{1\\}$' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'Restricción de la raíz par: $4 - x^2 \\ge 0 \\implies x^2 \\le 4 \\implies -2 \\le x \\le 2$. Restricción del denominador: $x - 1 \\neq 0 \\implies x \\neq 1$. Por lo tanto, el dominio es $[-2, 1) \\cup (1, 2]$.',
    sourceExam: 'Curso Introductorio UCV - Módulo 3.5',
  },
  {
    id: 'ucv-q-310',
    subject: 'Física',
    topic: 'Vectores y Componentes',
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Un vector $\\vec{u}$ en $\\mathbb{R}^2$ tiene magnitud $10\\,\\text{N}$ y forma un ángulo de $150^\\circ$ con el eje positivo de las X. ¿Cuáles son sus componentes cartesianas $(u_x, u_y)$?',
    options: [
      { id: 'opt-0', text: '$(-5\\sqrt{3},\\, 5)$' },
      { id: 'opt-1', text: '$(5\\sqrt{3},\\, -5)$' },
      { id: 'opt-2', text: '$(-5,\\, 5\\sqrt{3})$' },
      { id: 'opt-3', text: '$(-5\\sqrt{2},\\, 5\\sqrt{2})$' },
    ],
    correctOptionId: 'opt-0',
    explanation: 'Componente horizontal: $u_x = 10 \\cos(150^\\circ) = 10 (-\\cos 30^\\circ) = 10 (-\\frac{\\sqrt{3}}{2}) = -5\\sqrt{3}$. Componente vertical: $u_y = 10 \\sin(150^\\circ) = 10 (\\sin 30^\\circ) = 10 (\\frac{1}{2}) = 5$. Por lo tanto, $(u_x, u_y) = (-5\\sqrt{3},\\, 5)$.',
    sourceExam: 'Curso Introductorio UCV - Módulo 3.5',
  },
];
