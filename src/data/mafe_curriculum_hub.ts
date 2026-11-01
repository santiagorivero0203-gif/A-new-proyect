/**
 * @file mafe_curriculum_hub.ts
 * @description Centro Oficial de Contenidos Académicos para María Fernanda Valderrama
 * (Escuela de Diseño Integral UCAB).
 *
 * Integra:
 * 1. Materia "Teoría del Diseño" (Semiótica, Gestalt, Usabilidad, Actor-Red)
 *    -> Proveniente de los apuntes y exámenes oficiales.
 * 2. Materia "Teoría del Color" (Clase #4 UCAB - EB_LICDISUCAB_COLOR_CLASE4_OCT_09_2026.pdf)
 *    -> Escala acromática (15 a 9 pasos), 3 escalas cromáticas de matices (A>C, C>M, M>A),
 *       escalas de luminosidad (10 pasos a blanco / a negro), síntesis visual y orden del taller.
 * 3. Materia "Matemática para el Diseño" (Guías 1 a 4 UCAB):
 *    -> Guía 1: Geometría plana vs espacio, punto, línea, recta, plano, rectas concurrentes y alabeadas.
 *    -> Guía 2: Rectas, plano cartesiano, distancia, punto medio, pendiente (m), retículas de diseño y ecuaciones.
 *    -> Guía 3: Sistemas de ecuaciones lineales (método gráfico, sustitución, igualación, reducción) para diseño con restricciones.
 *    -> Guía 4: Ángulos, conversión grados a radianes, complementarios, suplementarios, paralelas cortadas por secante y diseño de logotipos/rampas.
 *
 * Arquitectura:
 * - Define las guías deconstruidas en 7 pilares (`DeconstructedAcademicGuide`).
 * - Define las preguntas calibradas (`Question[]`) para el simulador de exámenes.
 * - Registra los modelos de examen específicos en `PROFILE_TAILORED_EXAMS`.
 */

import type { Question } from '../types/exam.types';
import type { DeconstructedAcademicGuide } from '../types/deconstruction.types';
import {
  MAFE_DESIGN_THEORY_GUIDE,
  DESIGN_THEORY_QUESTIONS,
  DESIGN_THEORY_MODEL_A,
  DESIGN_THEORY_MODEL_B,
} from './mafe_design_theory_course';

const MAFE_PROFILE = 'mafe_diseno_ucab' as const;

function buildOptions(texts: [string, string, string, string]) {
  const letters = ['a', 'b', 'c', 'd'] as const;
  return texts.map((text, i) => ({ id: `opt-${letters[i]}`, text }));
}

// =====================================================================
// 1. GUÍA DECONSTRUIDA: TEORÍA DEL COLOR (CLASE 4 UCAB)
// =====================================================================
export const MAFE_COLOR_CLASE4_GUIDE: DeconstructedAcademicGuide = {
  id: 'mafe-color-clase4-ucab',
  userId: MAFE_PROFILE,
  sourceType: 'document',
  discipline: 'design',
  createdAt: '2026-11-01T00:00:00.000Z',
  guideMetadata: {
    title: 'Teoría del Color: Escalas de Valor, Matiz, Luminosidad y Edición de 15 a 9 Pasos',
    area: 'Diseño · Teoría del Color UCAB',
    summary:
      'Guía oficial de la Clase #4 de la Licenciatura en Diseño UCAB. Construcción de escalas acromáticas y cromáticas en pigmento (15 pasos), escalas de luminosidad (10 pasos a blanco y negro), y ejercicio de síntesis visual para editar a 9 pasos continuos sin saltos visuales.',
  },
  phenomenonAndTheory: [
    '**UNIDAD TEMÁTICA I: TEORÍA DEL COLOR | PROPIEDADES Y ESCALAS (UCAB)**',
    'El color en el diseño es un sistema constructivo y perceptivo riguroso. A través de la experimentación con pigmentos sobre sulfato cortado en tiras, se estudian sus propiedades fundamentales:',
    '',
    '• **Escala Acromática (de Valor):** progresión tonal que va desde el blanco puro (Paso 1) hasta el negro puro (Paso 15). Evalúa la reflectancia de luz sin alteración de matiz.',
    '',
    '• **Escalas Cromáticas (de Matices en 15 Pasos):** mezclas progresivas y ordenadas entre colores primarios sustractivos:',
    '   – **Escala 1:** AMARILLO hacia CYAN (produce la familia de los verdes como secundarios intermedios).',
    '   – **Escala 2:** CYAN hacia MAGENTA (produce la familia de los azules/violetas intermedios).',
    '   – **Escala 3:** MAGENTA hacia AMARILLO (produce la familia de los rojos y naranjas intermedios).',
    '',
    '• **Escalas de Luminosidad (en 10 Pasos):** alteración del valor cromático hacia extremos de luz u oscuridad:',
    '   – Primario puro hacia Blanco (Paso 1 = color puro, Paso 10 = blanco puro): Amarillo > Blanco, Cyan > Blanco, Magenta > Blanco.',
    '   – Primario puro hacia Negro (Paso 1 = color puro, Paso 10 = negro puro): Amarillo > Negro, Cyan > Negro, Magenta > Negro.',
    '',
    '• **Edición y Síntesis Visual (De 15 a 9 Pasos):**',
    '   – Una vez finalizada la tira de 15 pasos con pigmento, el diseñador recorta con tijera los peldaños para seleccionar únicamente **9 pasos** que representen una progresión armónica y equilibrada.',
    '   – *Regla del "Salto Visual":* Si entre dos peldaños contiguos se aprecia un corte brusco o falta de gradualidad, el alumno debe fabricar un nuevo paso de pigmento para sustituir o completar la secuencia rítmica.',
    '   – *Principio Pedagógico:* Pasar de 15 a 9 pasos es un **ejercicio de síntesis**. El diseñador profesional debe saber reducir la complejidad sin perder la información esencial de la transición cromática.',
    '',
    '• **Protocolo del Espacio de Trabajo:** el taller debe mantenerse despejado. Al finalizar: recoger, limpiar pinceles y recipientes, y dejar el lavamanos libre de residuos de pintura.',
  ].join('\n'),
  glossary: [
    { term: 'Escala Acromática', symbolOrUnit: 'Valor', definition: 'Secuencia de 15 pasos desde blanco puro hasta negro puro mediante pigmento, sin matiz visible.' },
    { term: 'Matiz (Hue)', symbolOrUnit: 'Cromático', definition: 'La longitud de onda dominante o cualidad específica del color (Amarillo, Cyan, Magenta y sus mezclas secundarias).' },
    { term: 'Luminosidad', symbolOrUnit: 'Claridad', definition: 'Grado de claridad u oscuridad de un matiz primario al mezclarse gradualmente con blanco o con negro en 10 pasos.' },
    { term: 'Síntesis de 15 a 9 pasos', symbolOrUnit: 'Edición', definition: 'Ejercicio de curaduría visual donde se seleccionan 9 tonos que mejor representen una progresión rítmica sin saltos visuales.' },
    { term: 'Salto Visual', symbolOrUnit: 'Defecto', definition: 'Transición brusca o desbalanceada entre dos peldaños contiguos que rompe la armonía rítmica y exige remezclar.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      {
        name: 'Relación de Reducción y Síntesis',
        latex: '$$\\text{Tira Original (15 pasos)} \\xrightarrow{\\text{Edición y Curaduría}} \\text{Escala Definitiva (9 peldaños)}$$',
        application: 'Aplica el principio de diseño: reducir la complejidad conservando la información esencial de la progresión.',
      },
      {
        name: 'Ciclo Primario Sustractivo',
        latex: '$$\\text{Amarillo} + \\text{Cyan} = \\text{Verde} \\quad | \\quad \\text{Cyan} + \\text{Magenta} = \\text{Azul/Violeta} \\quad | \\quad \\text{Magenta} + \\text{Amarillo} = \\text{Rojo/Naranja}$$',
        application: 'Identificación de los secundarios esperados en las 3 escalas de matices de la Clase #4.',
      },
    ],
    mnemonicsAndPatterns: [
      'Paso 1 siempre es pigmento puro A; Paso 15 (o 10) es el pigmento puro de llegada B.',
      'De 15 a 9 pasos: la síntesis elimina redundancias pero nunca genera escalones bruscos (saltos).',
      'Luminosidad hacia blanco = Aclara el tono; Luminosidad hacia negro = Apaga la energía del matiz.',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Procedimiento de edición de escala de valor (15 a 9 pasos)',
      problemStatement:
        'Tienes una tira de 15 pasos de blanco hacia negro pintada sobre sulfato. Al recortar y colocar 9 muestras sobre la mesa, notas que entre el paso 4 y 5 el gris se oscurece demasiado rápido. ¿Cómo se resuelve según la pauta de cátedra?',
      deductiveSteps: [
        '1. Diagnóstico: se ha detectado un "salto visual" (discontinuidad en la progresión rítmica).',
        '2. Acción correctiva: no conservar un paso desbalanceado; se debe producir un nuevo paso intermedio con pigmento.',
        '3. Prueba de ritmo: colocar la nueva muestra y verificar que los 9 peldaños avancen con la misma cadencia visual.',
      ],
      finalResult: 'Escala balanceada en 9 peldaños con gradación equidistante desde blanco hasta negro.',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: '**Trampa de entrega:** entregar los 15 pasos sin recortar creyendo que más pasos equivalen a mejor nota.',
      correction: 'El objetivo de la Clase #4 es justamente la SÍNTESIS: se deben presentar los 9 pasos editados y conservar los recortes descartados para revisión en taller.',
    },
    {
      trap: '**Trampa de mezcla:** agregar negro a una escala de matices (ej. Amarillo a Cyan).',
      correction: 'Las escalas de matices son estrictamente cromáticas: solo intervienen los dos colores primarios puros, sin blanco ni negro.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Cuántos pasos tiene la escala original en pigmento y a cuántos debe editarse?', back: 'La escala original se construye en 15 pasos y se edita mediante recorte a 9 pasos armónicos.' },
      { front: '¿Cuáles son las 3 escalas de matices de la Clase #4 de Color UCAB?', back: 'Escala 1: Amarillo > Cyan. Escala 2: Cyan > Magenta. Escala 3: Magenta > Amarillo.' },
      { front: '¿Qué se debe hacer si se detecta un "salto visual" en los 9 pasos seleccionados?', back: 'Producir un nuevo paso de pigmento para sustituir la muestra y recuperar la progresión rítmica continua.' },
      { front: '¿En qué consisten las escalas de luminosidad de la tarea?', back: 'Construir 6 escalas de 10 pasos: cada primario (Amarillo, Cyan, Magenta) hacia Blanco y hacia Negro.' },
    ],
    cornellSynthesis: {
      cues: [
        'Propiedades del color (Valor, Matiz, Luminosidad)',
        'Construcción de tiras en 15 pasos',
        'Edición y síntesis a 9 pasos',
        'Manejo del taller y materiales',
      ],
      notes: [
        'Escala de valor: 15 pasos de blanco puro a negro puro sobre sulfato cortado.',
        'Escalas de matices: mezclas entre primarios (A>C, C>M, M>A).',
        'Luminosidad: 10 pasos de primario hacia blanco o hacia negro.',
        'La síntesis a 9 pasos entrena el juicio crítico del diseñador para eliminar redundancias sin crear saltos visuales.',
      ],
      summary:
        'La Clase 4 entrena la precisión física del pigmento y la agudeza perceptiva: se mezclan 15 pasos exactos y luego se sintetizan en 9 peldaños rítmicos.',
    },
    conceptMapNodes: [
      'TEORÍA DEL COLOR (CLASE 4 UCAB)',
      '├── 1. Escala Acromática (15 pasos) → Blanco a Negro',
      '├── 2. Escalas de Matices (15 pasos)',
      '│   ├── Amarillo → Cyan (Verdes)',
      '│   ├── Cyan → Magenta (Azules/Violetas)',
      '│   └── Magenta → Amarillo (Rojos/Naranjas)',
      '├── 3. Edición a 9 Pasos (Síntesis) → Control de "Salto Visual"',
      '└── 4. Escalas de Luminosidad (10 pasos) → Primarios a Blanco / Negro',
    ].join('\n'),
  },
  generatedQuestions: [],
};

// =====================================================================
// 2. GUÍA DECONSTRUIDA: MATEMÁTICA Y GEOMETRÍA PARA EL DISEÑO (UCAB)
// =====================================================================
export const MAFE_MATH_DESIGN_GUIDE: DeconstructedAcademicGuide = {
  id: 'mafe-math-design-ucab',
  userId: MAFE_PROFILE,
  sourceType: 'document',
  discipline: 'design',
  createdAt: '2026-11-01T00:00:00.000Z',
  guideMetadata: {
    title: 'Matemática para el Diseño: Geometría, Rectas, Sistemas de Ecuaciones y Ángulos',
    area: 'Diseño · Matemática Aplicada UCAB',
    summary:
      'Compendio oficial de las Guías Teóricas #1 a #4 de la Licenciatura en Diseño UCAB. Deconstrucción de elementos geométricos (punto, línea, plano, espacio), retículas, plano cartesiano, pendiente de la recta, sistemas de ecuaciones lineales y clasificación de ángulos con aplicación a encuadres, marcas y estructuras espaciales.',
  },
  phenomenonAndTheory: [
    '**GUÍA 1 · GEOMETRÍA: PUNTO, LÍNEA, PLANO Y ESPACIO**',
    '• *Mundo abstracto vs. Mundo físico en diseño:* En matemáticas, el punto no tiene dimensión (es una coordenada exacta $(x, y)$ invisible). En diseño, para que comunique debe verse: ocupa un lugar, tiene tamaño y actúa como un imán visual según su escala relativa con el entorno.',
    '• *Línea:* Es el rastro de un punto en movimiento. La recta es infinita; la semirrecta tiene principio pero no fin; el segmento tiene principio y fin medible.',
    '• *Plano:* Superficie bidimensional lisa que define el "soporte o territorio" del diseño. Se define con 3 puntos no colineales o una recta y un punto exterior.',
    '• *Espacio y Rectas Alabeadas:* En el espacio 3D, dos rectas son *alabeadas* si no se intersecan, no son paralelas y no están en el mismo plano (no coplanares).',
    '',
    '**GUÍA 2 · RECTAS, RETÍCULAS Y PENDIENTES**',
    '• *Retícula en Diseño:* Estructura de rectas horizontales y verticales perpendiculares que divide la superficie en módulos y columnas. Es el "esqueleto" que asegura equilibrio, alineación y consistencia.',
    '• *Pendiente ($m$):* Tangente del ángulo de inclinación: $m = \\frac{y_2 - y_1}{x_2 - x_1}$.',
    '   – $m > 0$ (Positiva): asciende de izquierda a derecha (crecimiento, dinamismo).',
    '   – $m < 0$ (Negativa): desciende de izquierda a derecha (fluidez, descanso).',
    '   – $m = 0$ (Cero): recta horizontal ($y = k$), transmite estabilidad y calma.',
    '   – $m$ Indefinida: recta vertical ($x = c$), pura fuerza y tensión estructural.',
    '',
    '**GUÍA 3 · SISTEMAS DE ECUACIONES LINEALES EN DISEÑO**',
    '• *Diseño como solución a restricciones:* Un sistema de ecuaciones determina el punto exacto donde múltiples condiciones espaciales o proporcionales se equilibran.',
    '• *Métodos de resolución:* Método gráfico (intersección en plano), Sustitución (despejar una y meter en otra), Igualación (despejar la misma en ambas e igualar) y Reducción (sumar para eliminar una variable).',
    '',
    '**GUÍA 4 · ÁNGULOS Y RELACIONES GEOMÉTRICAS**',
    '• *Por amplitud:* Agudo ($<90^\\circ$), Recto ($90^\\circ$), Obtuso ($90^\\circ - 180^\\circ$), Llano ($180^\\circ$), Cóncavo ($>180^\\circ$).',
    '• *Por suma:* Complementarios (suman $90^\\circ$), Suplementarios (suman $180^\\circ$).',
    '• *Paralelas cortadas por secante:* Ángulos correspondientes, alternos internos y alternos externos son iguales entre sí; colaterales o conjugados son suplementarios ($180^\\circ$).',
  ].join('\n'),
  glossary: [
    { term: 'Punto en Diseño', symbolOrUnit: 'Imán Visual', definition: 'Representación física visible que atrae la mirada; su tamaño se percibe en relación con el entorno.' },
    { term: 'Rectas Alabeadas', symbolOrUnit: 'Espacio 3D', definition: 'Rectas que no están en el mismo plano, no se cruzan y no son paralelas.' },
    { term: 'Pendiente (m)', symbolOrUnit: 'm = tan(θ)', definition: 'Relación entre el esfuerzo vertical y el desplazamiento horizontal en el plano cartesiano.' },
    { term: 'Retícula', symbolOrUnit: 'Grid', definition: 'Armazón de rectas ortogonales que modulan y equilibran la composición editorial o digital.' },
    { term: 'Ángulos Complementarios', symbolOrUnit: 'α + β = 90°', definition: 'Pareja de ángulos cuyas medidas suman exactamente un ángulo recto.' },
    { term: 'Ángulos Suplementarios', symbolOrUnit: 'α + β = 180°', definition: 'Pareja de ángulos cuyas medidas suman exactamente un ángulo llano.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      {
        name: 'Pendiente de una Recta',
        latex: '$$m = \\frac{y_2 - y_1}{x_2 - x_1} = \\tan(\\theta)$$',
        application: 'Calcula la inclinación de una diagonal en composiciones o maquetaciones gráficas.',
      },
      {
        name: 'Distancia entre dos Puntos',
        latex: '$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$',
        application: 'Permite medir con exactitud la separación modular entre dos nodos de diseño.',
      },
      {
        name: 'Punto Medio de un Segmento',
        latex: '$$M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$$',
        application: 'Determina el centro geométrico para ubicar elementos focales en una retícula.',
      },
      {
        name: 'Ecuación Punto-Pendiente',
        latex: '$$y - y_1 = m(x - x_1)$$',
        application: 'Traza una recta que pasa por un nodo con un ángulo o inclinación prescrita.',
      },
    ],
    mnemonicsAndPatterns: [
      'Pendiente cero = horizonte plano; pendiente vertical = muro sin base divisible (indefinida).',
      'Ángulos Adyacentes: siempre son consecutivos y forman una línea recta (suman 180°).',
      'Alternos = lados opuestos de la transversal (iguales); Colaterales = mismo lado (suman 180°).',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Cálculo de balance angular en logotipo minimalista (Guía #4)',
      problemStatement:
        'En un isotipo cuadrado con una diagonal divisoria, el ángulo superior α y el lateral β deben ser complementarios. Si estéticamente α = 2x + 10° y β = 3x - 5°, determina el valor de x y la medida de cada ángulo.',
      deductiveSteps: [
        '1. Principio: complementarios suman 90° → (2x + 10) + (3x - 5) = 90.',
        '2. Agrupar términos: 5x + 5 = 90 → 5x = 85 → x = 17°.',
        '3. Calcular ángulos: α = 2(17) + 10 = 44°; β = 3(17) - 5 = 46°.',
        '4. Verificación: 44° + 46° = 90° (encuadre perfecto).',
      ],
      finalResult: 'x = 17°, ángulo α = 44° y ángulo β = 46°.',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: '**Trampa en pendientes verticales:** escribir que una recta vertical tiene pendiente igual a 0.',
      correction: 'La recta horizontal tiene pendiente m = 0. La recta vertical tiene pendiente INDEFINIDA porque x2 - x1 = 0 y la división entre cero no existe.',
    },
    {
      trap: '**Trampa de rectas en el espacio:** creer que dos rectas que no se tocan siempre son paralelas.',
      correction: 'En el espacio 3D pueden ser ALABEADAS: no se tocan pero tampoco son paralelas porque no comparten el mismo plano.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Cuál es la diferencia entre el punto matemático y el punto en diseño?', back: 'El punto matemático es una coordenada abstracta invisible sin dimensión; el punto en diseño tiene tamaño físico y actúa como imán visual en relación con su entorno.' },
      { front: '¿Qué es una retícula y cuál es su función en diseño?', back: 'Es una estructura de rectas perpendiculares que divide el espacio en módulos para ordenar texto e imagen con equilibrio y consistencia.' },
      { front: '¿Qué significado visual tiene una pendiente positiva, negativa y cero?', back: 'Positiva = crecimiento/dinamismo; Negativa = fluidez/descanso; Cero (horizontal) = estabilidad y calma.' },
      { front: '¿Qué son rectas alabeadas?', back: 'Rectas en el espacio 3D que no están en el mismo plano, no se intersecan y no son paralelas.' },
      { front: '¿Qué diferencia a los ángulos adyacentes de los simplemente consecutivos?', back: 'Los adyacentes son consecutivos y además sus lados no comunes forman una línea recta (suman 180°).' },
    ],
    cornellSynthesis: {
      cues: [
        'Geometría: abstracción vs. materialización',
        'La recta como vector compositivo',
        'Sistemas lineales para resolver restricciones',
        'Relaciones angulares en marcas y retículas',
      ],
      notes: [
        'Punto, línea, plano y espacio son los ladrillos de la construcción visual.',
        'La pendiente m mide la relación entre esfuerzo vertical y avance horizontal.',
        'Los sistemas de ecuaciones hallan la intersección geométrica exacta.',
        'Ángulos complementarios (90°) y suplementarios (180°) aseguran la ortogonalidad y equilibrio.',
      ],
      summary:
        'La matemática en diseño no es cálculo abstracto: es la herramienta que convierte la intuición estética en retículas, diagonales y estructuras espaciales precisas.',
    },
    conceptMapNodes: [
      'MATEMÁTICA PARA EL DISEÑO (UCAB)',
      '├── Guía 1: Elementos Básicos (Punto, Línea, Plano, Espacio)',
      '├── Guía 2: Rectas, Retículas y Pendiente (m = tan θ)',
      '├── Guía 3: Sistemas de Ecuaciones Lineales (Restricciones y Cruces)',
      '└── Guía 4: Ángulos (Clasificación, Complementos, Suplementos, Paralelas)',
    ].join('\n'),
  },
  generatedQuestions: [],
};

// =====================================================================
// 3. REACTIVOS CALIBRADOS DE LAS GUÍAS DESCARGADAS DE NOTION
// =====================================================================
export const NOTION_COLOR_QUESTIONS: Question[] = [
  {
    id: 'mafe-col-01',
    subject: 'Diseño',
    topic: 'Teoría del Color · Escala Acromática',
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Clase 4 Color UCAB · Notion',
    questionText:
      'En la Clase #4 de Teoría del Color (UCAB), ¿cómo se define la construcción inicial de la escala acromática en pigmento sobre sulfato?',
    options: buildOptions([
      'En 9 pasos desde gris medio hacia blanco.',
      'En 15 pasos desde blanco puro (Paso 1) hacia negro puro (Paso 15).',
      'En 10 pasos mezclando blanco con magenta.',
      'En 12 pasos usando acuarela sobre cartulina lisa.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** La pauta oficial estipula construir una escala de valor con pigmento en 15 pasos, donde el paso 1 es pigmento puro blanco y el paso 15 es pigmento puro negro.',
  },
  {
    id: 'mafe-col-02',
    subject: 'Diseño',
    topic: 'Teoría del Color · Escalas de Matices',
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Clase 4 Color UCAB · Notion',
    questionText:
      '¿Cuáles son las 3 escalas cromáticas de matices que el estudiante de Diseño UCAB debe construir en 15 pasos según la Clase #4?',
    options: buildOptions([
      'Amarillo > Azul, Rojo > Verde, Blanco > Negro.',
      'Amarillo > Cyan, Cyan > Magenta, y Magenta > Amarillo.',
      'Rojo > Amarillo, Azul > Magenta, Verde > Cyan.',
      'Naranja > Violeta, Verde > Naranja, Violeta > Verde.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** En el modelo sustractivo primario de diseño, se trabajan las tres transiciones entre primarios puros: Escala 1 (Amarillo > Cyan), Escala 2 (Cyan > Magenta) y Escala 3 (Magenta > Amarillo).',
  },
  {
    id: 'mafe-col-03',
    subject: 'Diseño',
    topic: 'Teoría del Color · Edición y Síntesis',
    difficulty: 'Avanzado',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Clase 4 Color UCAB · Notion',
    questionText:
      '¿Qué debe hacer el alumno si al recortar y presentar los 9 fragmentos seleccionados de su escala detecta un "salto visual" (transición brusca o desbalanceada)?',
    options: buildOptions([
      'Aceptar el salto porque refleja el contraste natural del pigmento.',
      'Mezclar blanco en el paso más oscuro para rebajarlo con agua.',
      'Deberá producir un nuevo paso de pigmento para sustituir o completar la secuencia hasta lograr la progresión rítmica continua.',
      'Descartar toda la escala y comenzar desde la teoría de la Gestalt.',
    ]),
    correctOptionId: 'opt-c',
    explanation:
      '**Concepto Fundamental:** La pauta de edición exige evaluar la cadencia rítmica: ante un salto visual, el estudiante debe crear un peldaño correctivo en pigmento para que los 9 pasos avancen sin discontinuidades.',
  },
  {
    id: 'mafe-col-04',
    subject: 'Diseño',
    topic: 'Teoría del Color · Escalas de Luminosidad',
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Clase 4 Color UCAB · Notion',
    questionText:
      'En la tarea asignada para la sesión siguiente, ¿cuántos pasos tienen las escalas de luminosidad y qué combinaciones se construyen?',
    options: buildOptions([
      '15 pasos de cada secundario hacia blanco.',
      '10 pasos de cada primario (Amarillo, Cyan, Magenta) hacia Blanco y 10 pasos de cada primario hacia Negro.',
      '5 pasos de blanco hacia gris medio y 5 hacia gris oscuro.',
      '9 pasos con abrehuecos para evaluar la transparencia.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** La tarea exige construir 6 escalas de luminosidad en 10 pasos: tres de cada primario hacia Blanco (paso 1 primario, paso 10 blanco) y tres hacia Negro (paso 1 primario, paso 10 negro).',
  },
];

export const NOTION_MATH_QUESTIONS: Question[] = [
  {
    id: 'mafe-mat-01',
    subject: 'Diseño',
    topic: 'Matemática para el Diseño · Punto y Espacio',
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía 1 Geometría UCAB · Notion',
    questionText:
      'Según la Guía Teórica #1 de Matemática para el Diseño UCAB, ¿cuál es la diferencia fundamental entre el punto matemático y el punto en diseño?',
    options: buildOptions([
      'El punto matemático siempre tiene radio de 2 mm y el de diseño no tiene color.',
      'En matemáticas el punto es una posición exacta invisible y sin dimensión; en diseño es un objeto visible con tamaño relativo que atrae la mirada como un imán visual.',
      'No existe diferencia: ambos carecen de tamaño y de representación física.',
      'El punto de diseño solo puede dibujarse con tinta china sobre retícula.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** La guía subraya que en el mundo abstracto el punto es dimensión cero (coordenada exacta), mientras en el diseño debe materializarse para actuar como centro focal compositivo.',
  },
  {
    id: 'mafe-mat-02',
    subject: 'Diseño',
    topic: 'Matemática para el Diseño · Rectas Alabeadas',
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía 1 Geometría UCAB · Notion',
    questionText:
      'En el espacio tridimensional de un producto o estructura, ¿cómo se definen dos rectas alabeadas?',
    options: buildOptions([
      'Son rectas que se cortan en un ángulo exacto de 90°.',
      'Son rectas que están en el mismo plano y son paralelas.',
      'Son rectas que no se encuentran en el mismo plano, no se intersecan y no son paralelas.',
      'Son rectas que tienen exactamente la misma pendiente y ordenada en el origen.',
    ]),
    correctOptionId: 'opt-c',
    explanation:
      '**Concepto Fundamental:** En geometría del espacio (3D), las rectas alabeadas son no coplanares, no se cruzan y nunca tienen la misma dirección ni plano común.',
  },
  {
    id: 'mafe-mat-03',
    subject: 'Diseño',
    topic: 'Matemática para el Diseño · Pendiente y Retícula',
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía 2 Rectas UCAB · Notion',
    questionText:
      'Si un diseñador traza una línea con pendiente m = 0 en su composición, ¿qué tipo de recta es y qué sensación perceptiva transmite según la Guía #2?',
    options: buildOptions([
      'Es una recta vertical que transmite tensión y fuerza estructural.',
      'Es una recta horizontal (paralela al eje x) que transmite estabilidad y calma.',
      'Es una recta inclinada a 45° que transmite dinamismo y ascenso.',
      'Es una recta secante que divide la retícula en cuartos.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** La pendiente cero (m = 0) define una recta horizontal como el horizonte, comunicando quietud y estabilidad estructural.',
  },
  {
    id: 'mafe-mat-04',
    subject: 'Diseño',
    topic: 'Matemática para el Diseño · Clasificación de Ángulos',
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía 4 Ángulos UCAB · Notion',
    questionText:
      '¿Cuál es la relación matemática estricta entre dos ángulos adyacentes según la Guía Teórica #4?',
    options: buildOptions([
      'Siempre son opuestos por el vértice y suman 90°.',
      'Son ángulos consecutivos cuyos lados no comunes forman una recta; por lo tanto, siempre son suplementarios (suman 180°).',
      'Son ángulos complementarios que nunca comparten vértice.',
      'Son ángulos con la misma orientación respecto a una recta transversal.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** "Todos los ángulos adyacentes son consecutivos, pero no todos los consecutivos son adyacentes". La condición de adyacencia exige que los lados no comunes sean semirrectas opuestas (sumando 180°).',
  },
];

// Completar generatedQuestions en las guías
MAFE_COLOR_CLASE4_GUIDE.generatedQuestions = NOTION_COLOR_QUESTIONS.map((q) => ({
  area: 'Diseño · Teoría del Color UCAB',
  tema: q.topic,
  tipo: 'opcion_multiple',
  pregunta: q.questionText,
  opciones: q.options.map((o) => o.text),
  correcta: q.options.find((o) => o.id === q.correctOptionId)?.text ?? q.options[0].text,
  justificacion: q.explanation,
}));

MAFE_MATH_DESIGN_GUIDE.generatedQuestions = NOTION_MATH_QUESTIONS.map((q) => ({
  area: 'Diseño · Matemática Aplicada UCAB',
  tema: q.topic,
  tipo: 'opcion_multiple',
  pregunta: q.questionText,
  opciones: q.options.map((o) => o.text),
  correcta: q.options.find((o) => o.id === q.correctOptionId)?.text ?? q.options[0].text,
  justificacion: q.explanation,
}));

// =====================================================================
// REGISTRO TOTAL DE GUÍAS Y PREGUNTAS DE MARÍA FERNANDA
// =====================================================================
export const ALL_MAFE_DECONSTRUCTED_GUIDES: DeconstructedAcademicGuide[] = [
  MAFE_DESIGN_THEORY_GUIDE,
  MAFE_COLOR_CLASE4_GUIDE,
  MAFE_MATH_DESIGN_GUIDE,
];

export const ALL_MAFE_QUESTIONS: Question[] = [
  ...DESIGN_THEORY_QUESTIONS,
  ...NOTION_COLOR_QUESTIONS,
  ...NOTION_MATH_QUESTIONS,
];

// Re-exportar subconjuntos para conveniencia
export {
  MAFE_DESIGN_THEORY_GUIDE,
  DESIGN_THEORY_QUESTIONS,
  DESIGN_THEORY_MODEL_A,
  DESIGN_THEORY_MODEL_B,
};
