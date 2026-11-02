/**
 * @file generate_mafe_matematica_diseno.mjs
 * @description Generador modular de las Guías Académicas Deconstruidas de Matemática para el Diseño
 * de María Fernanda Valderrama (Licenciatura en Diseño - Universidad Católica Andrés Bello - UCAB).
 * 
 * Basado fielmente en los documentos oficiales de Notion:
 * 1. Guia_teorica__1._Punto_recta_y_espacio_V1.3.pdf (14 páginas)
 * 2. Guia_Teorica__2.__Rectas_(1).pdf (19 páginas)
 * 3. Guia_teorica__3._Sistema_de_ecuaciones_(3).pdf (18 páginas)
 * 4. Guia_de_ejercicios__3._Sistema_de_ecuaciones_(3).pdf (2 páginas)
 * 5. Guia_teorica__4_._Angulos_._V1.3_(1).pdf (16 páginas)
 * 6. Guia_de_ejercicios__4._Angulos.V1.2_(2).pdf (7 páginas)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, '../src/data/guides/mafe_matematica_diseno.ts');

const MAFE_PROFILE = 'mafe_diseno_ucab';

const fileHeader = `/**
 * @file mafe_matematica_diseno.ts
 * @description Catálogo Oficial de Guías Deconstruidas de Matemática para el Diseño (UCAB)
 * para María Fernanda Valderrama (Escuela de Diseño Integral).
 * 
 * Contiene la deconstrucción en 7 pilares pedagógicos de:
 * 1. Guía Teórica #1: Geometría (Punto, Recta, Plano y Espacio Tridimensional)
 * 2. Guía Teórica #2: Rectas (Retículas, Pendiente y Plano Cartesiano)
 * 3. Guía Teórica #3: Sistemas de Ecuaciones Lineales (Métodos de Solución y Compatibilidad)
 * 4. Guía de Ejercicios #3: Banco Práctico y Modelado en Diseño (Tintes, Iluminación LED e Impresoras)
 * 5. Guía Teórica #4: Ángulos (Sistemas de Medida Sexagesimal/Circular y Paralelas con Secante)
 * 6. Guía de Ejercicios #4: Geometría Angular, Proposiciones Lógicas, Rampas y Logotipos
 * 
 * @author Plataforma Académica y de Productividad Estudiantil
 */

import type { DeconstructedAcademicGuide } from '../../types/deconstruction.types';
import type { Question } from '../../types/exam.types';

export const MAFE_PROFILE = '${MAFE_PROFILE}' as const;

function buildOptions(texts: [string, string, string, string]) {
  const letters = ['a', 'b', 'c', 'd'] as const;
  return texts.map((text, i) => ({ id: \`opt-\${letters[i]}\`, text }));
}
`;

// Declaración de las 6 Guías
const codeContent = `
// ============================================================================
// 1. GUÍA TEÓRICA #1: GEOMETRÍA (PUNTO, RECTA, PLANO Y ESPACIO 3D)
// ============================================================================
export const MAFE_MATH_GUIA1_GEOMETRIA_GUIDE: DeconstructedAcademicGuide = {
  id: 'mafe-math-guia1-geometria',
  userId: MAFE_PROFILE,
  sourceType: 'document',
  discipline: 'design',
  createdAt: '2026-11-02T00:00:00.000Z',
  guideMetadata: {
    title: 'Guía Teórica #1: Geometría — Punto, Recta, Plano y Espacio Tridimensional',
    area: 'Diseño · Matemática Aplicada UCAB',
    summary:
      'Fundamentos euclidianos y espaciales para la Licenciatura en Diseño UCAB. Diferenciación entre el punto abstracto matemático y el punto visible en diseño (imán visual, escala relativa), clasificaciones de líneas, planos como territorio compositivo, y posiciones en el espacio 3D (rectas secantes, concurrentes, paralelas y alabeadas).',
  },
  phenomenonAndTheory: [
    '**1. LA GEOMETRÍA EN EL DISEÑO (DEL GRIEGO GEO: TIERRA, METRON: MEDIDA)**',
    'La geometría es la rama de las matemáticas que estudia las propiedades de las figuras y las relaciones espaciales entre puntos, líneas, ángulos, curvas, superficies y cuerpos en el espacio. En el diseño integral, no se concibe como una abstracción aislada, sino como la gramática fundamental que permite estructurar planos, calcular dimensiones, modelar volúmenes y proyectar el espacio físico habitable.',
    '',
    '**2. EL PUNTO: MUNDO ABSTRACTO VS. MUNDO DEL DISEÑO**',
    '• **En Matemáticas:** El punto carece de dimensiones (longitud, anchura o profundidad cero). Es únicamente una posición o coordenada exacta $(x, y)$ o $(x, y, z)$ en el espacio.',
    '• **En Diseño:** Para que el punto comunique una idea visual debe materializarse físicamente. Adquiere un tamaño visible, una forma, un color y una textura. Actúa como un **imán visual** que focaliza la atención del observador. Su escala relativa con respecto al soporte determina si se percibe como una textura de fondo, un nodo rítmico o un elemento jerárquico protagónico.',
    '',
    '**3. LA LÍNEA, LA RECTA Y SUS PORCIONES**',
    '• **Línea:** Rastro dejado por un punto en movimiento continuo. Solo posee longitud (una dimensión).',
    '• **Recta:** Sucesión infinita y continua de puntos alineados que se extiende en una sola dirección sin principio ni final.',
    '• **Semirrecta:** Parte de una recta que tiene un punto de origen determinado, pero se proyecta infinitamente en un sentido.',
    '• **Segmento:** Porción de recta delimitada por dos puntos extremos. Posee principio y fin exactos, lo que permite medir su longitud.',
    '',
    '**4. EL PLANO Y EL ESPACIO TRIDIMENSIONAL**',
    '• **El Plano:** Superficie bidimensional lisa y continua que carece de espesor. En diseño actúa como el "soporte o territorio" sobre el cual se articulan las composiciones gráficas o arquitectónicas. Queda unívocamente determinado por: (a) Tres puntos no colineales, (b) Una recta y un punto exterior a ella, o (c) Dos rectas secantes o paralelas.',
    '• **Puntos Coplanares:** Puntos que residen en el mismo plano. Puntos no coplanares no comparten una superficie plana común.',
    '• **Rectas en el Espacio 3D:**',
    '   – **Rectas Coplanares:** Pertenecen al mismo plano (pueden ser secantes si se cortan en un punto, o paralelas si no tienen puntos comunes).',
    '   – **Rectas Concurrentes:** Tres o más rectas distintas que coinciden y atraviesan un mismo punto focal (punto de concurrencia).',
    '   – **Rectas Alabeadas:** Rectas tridimensionales que **no están en el mismo plano (no coplanares), no se intersecan y no son paralelas**. Representan la relación más común de aristas espaciales en objetos tridimensionales complejos.',
  ].join('\\n'),
  glossary: [
    { term: 'Punto en Diseño', symbolOrUnit: 'Imán Visual', definition: 'Entidad gráfica visible con tamaño, forma y color relativos a su entorno, que actúa como centro focal de atención.' },
    { term: 'Punto Matemático', symbolOrUnit: 'Dimensión 0', definition: 'Posición exacta en el espacio euclidiano carente de longitud, anchura y altura.' },
    { term: 'Rectas Alabeadas', symbolOrUnit: 'Espacio 3D', definition: 'Par de rectas que no son coplanares, no se cruzan y no tienen la misma dirección.' },
    { term: 'Rectas Concurrentes', symbolOrUnit: 'Punto de Concurrencia', definition: 'Conjunto de tres o más rectas distintas que se cortan exactamente en un único punto común.' },
    { term: 'Plano', symbolOrUnit: 'Dimensión 2', definition: 'Superficie continua sin espesor que sirve como soporte o marco delimitador de una composición.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      {
        name: 'Condición de Determinación de un Plano',
        latex: '$$\\\\Pi = \\\\operatorname{plano}(A, B, C) \\\\quad \\\\text{con } A, B, C \\\\text{ no colineales}$$',
        application: 'Establece la base dimensional mínima para fijar una superficie plana en el espacio.',
      },
      {
        name: 'Relación de Rectas Alabeadas en el Espacio',
        latex: '$$r_1 \\\\not\\\\subset \\\\Pi, \\\\quad r_2 \\\\not\\\\subset \\\\Pi, \\\\quad r_1 \\\\cap r_2 = \\\\emptyset, \\\\quad r_1 \\\\not\\\\parallel r_2$$',
        application: 'Identificación de diagonales y elementos estructurales en volumetría y productos tridimensionales.',
      },
    ],
    mnemonicsAndPatterns: [
      'Segmento = dos límites fijos medibles; Semirrecta = un origen y un infinito; Recta = infinito a ambos lados.',
      'Dos rectas que no se tocan: si están en la misma hoja son paralelas; si están en el espacio 3D son alabeadas.',
      'Puntos colineales = descansan sobre una misma recta.',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Identificación de Rectas Alabeadas en una Estructura Cúbica de Mobiliario',
      problemStatement:
        'En el diseño de una mesa auxiliar cúbica con vértices inferiores ABCD y superiores EFGH, analiza la relación espacial entre la arista vertical AE (pata delantera izquierda) y la arista horizontal posterior GH (borde superior trasero). Determina si son paralelas, secantes o alabeadas.',
      deductiveSteps: [
        '1. Análisis de plano común: la recta que contiene a AE está en el plano frontal y lateral izquierdo. La recta GH está en el plano superior y plano posterior.',
        '2. Verificación de intersección: AE no comparte ningún vértice con GH (A, E vs G, H); por lo tanto, no se cortan (intersección vacía).',
        '3. Verificación de paralelismo: AE es perpendicular al plano de la base (vertical), mientras que GH es paralela al plano de la base (horizontal). Tienen direcciones ortogonales, por lo que no son paralelas.',
        '4. Conclusión deductiva: no comparten el mismo plano, no se cruzan y no son paralelas.',
      ],
      finalResult: 'Las rectas AE y GH son estrictamente ALABEADAS en el espacio tridimensional.',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: '**Trampa de rectas que no se tocan:** Asumir que dos rectas que nunca se cortan son obligatoriamente paralelas.',
      correction: 'Esta regla solo es válida en el plano 2D. En el espacio tridimensional (3D) existen las rectas alabeadas, que no se cruzan pero tampoco son paralelas porque pertenecen a planos distintos.',
    },
    {
      trap: '**Confundir punto matemático con nodo de diseño:** Diseñar sin considerar la escala relativa del punto.',
      correction: 'En diseño gráfico el tamaño del punto respecto al marco determina si se lee como una mota de ruido o como un centro de peso visual dominante.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Cuál es la diferencia entre un punto geométrico y un punto en el diseño gráfico?', back: 'El punto geométrico es una coordenada invisible sin dimensión; el punto en diseño tiene tamaño físico, color, forma y actúa como imán visual.' },
      { front: '¿Qué condiciones determinan un plano en el espacio según la Guía #1?', back: 'Tres puntos no colineales, una recta y un punto exterior, o dos rectas secantes/paralelas.' },
      { front: '¿Qué son rectas concurrentes?', back: 'Tres o más rectas que coinciden en un mismo punto focal de concurrencia.' },
      { front: '¿Por qué dos rectas alabeadas no son paralelas a pesar de no cruzarse?', back: 'Porque no pertenecen al mismo plano; ocupan planos distintos en el espacio 3D.' },
    ],
    cornellSynthesis: {
      cues: ['Punto abstracto vs Punto visual', 'Línea, recta, segmento', 'Planos en el espacio', 'Rectas coplanares vs alabeadas'],
      notes: [
        'El punto en diseño actúa como centro de atracción y peso visual.',
        'El segmento es la única porción de la recta con magnitud medible.',
        'El plano es el territorio bidimensional del proyecto.',
        'En 3D existen rectas alabeadas: no coplanares, no secantes y no paralelas.',
      ],
      summary: 'La geometría elemental dota al diseñador de vocabulario técnico para transformar ideas espaciales en estructuras volumétricas medibles y armónicas.',
    },
    conceptMapNodes: [
      'GEOMETRÍA Y ESPACIO (GUÍA 1 UCAB)',
      '├── Punto → Dimensión 0 (Abstracto) vs Imán Visual (Diseño)',
      '├── Línea → Recta (Infinita) | Semirrecta (1 extremo) | Segmento (Medible)',
      '├── Plano → 2D (Territorio/Soporte) definido por 3 puntos no colineales',
      '└── Rectas en el Espacio',
      '    ├── Coplanares: Secantes (1 corte) o Paralelas (0 cortes)',
      '    ├── Concurrentes: Múltiples rectas pasando por un mismo nodo',
      '    └── Alabeadas: Planos distintos, no se cruzan y no son paralelas',
    ].join('\\n'),
  },
  generatedQuestions: [],
};

// ============================================================================
// 2. GUÍA TEÓRICA #2: RECTAS (RETÍCULAS, PENDIENTE Y PLANO CARTESIANO)
// ============================================================================
export const MAFE_MATH_GUIA2_RECTAS_GUIDE: DeconstructedAcademicGuide = {
  id: 'mafe-math-guia2-rectas',
  userId: MAFE_PROFILE,
  sourceType: 'document',
  discipline: 'design',
  createdAt: '2026-11-02T00:00:00.000Z',
  guideMetadata: {
    title: 'Guía Teórica #2: Rectas, Retículas, Pendiente y Plano Cartesiano',
    area: 'Diseño · Matemática Aplicada UCAB',
    summary:
      'Cálculo formal y visual de la recta en el plano cartesiano $R^2$. La retícula modular ortogonal como esqueleto del diseño editorial y digital, distancias y puntos medios, interpretación perceptual de la pendiente ($m = \\\\tan\\\\theta$), ecuaciones punto-pendiente y general, paralelismo y perpendicularidad aplicados a logotipos.',
  },
  phenomenonAndTheory: [
    '**1. LA RETÍCULA COMO ARMAZÓN MODULAR EN EL DISEÑO**',
    'En diseño editorial, diseño de interfaces (UI) y branding, una **retícula (grid)** es una estructura de rectas horizontales y verticales que se intersectan perpendicularmente a intervalos regulares. Funciona como un esqueleto invisible que modula la superficie, permitiendo alinear tipografía, iconografía e imágenes para asegurar orden, consistencia, ritmo y jerarquía visual en la composición.',
    '',
    '**2. EL PLANO CARTESIANO 2D, DISTANCIA Y PUNTO MEDIO**',
    '• **Coordenadas Cartesianas:** Sistema ortogonal con eje horizontal $x$ (abscisas) y eje vertical $y$ (ordenadas) que divide el espacio en 4 cuadrantes.',
    '• **Distancia entre dos puntos:** Mide la longitud de un segmento diagonal en la retícula aplicando el teorema de Pitágoras: $d = \\\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.',
    '• **Punto Medio ($M$):** Coordenada central equidistante de los extremos: $M = \\\\left(\\\\frac{x_1 + x_2}{2}, \\\\frac{y_1 + y_2}{2}\\\\right)$. Esencial para ubicar elementos con centrado óptico.',
    '',
    '**3. LA PENDIENTE ($m$) Y SU SIGNIFICADO PERCEPTUAL**',
    'La pendiente mide la inclinación de una recta y corresponde a la tangente trigonométrica del ángulo $\\\\theta$ que forma la recta con el eje horizontal positivo: $m = \\\\frac{y_2 - y_1}{x_2 - x_1} = \\\\frac{\\\\Delta y}{\\\\Delta x} = \\\\tan(\\\\theta)$.',
    '• **Pendiente Positiva ($m > 0$):** La recta asciende de izquierda a derecha ($0^\\\\circ < \\\\theta < 90^\\\\circ$). Comunica dinamismo, avance, crecimiento y energía.',
    '• **Pendiente Negativa ($m < 0$):** La recta desciende de izquierda a derecha ($90^\\\\circ < \\\\theta < 180^\\\\circ$). Transmite relajación, desaceleración o declive.',
    '• **Pendiente Nula ($m = 0$):** Recta perfectamente horizontal ($y = b$). Evoca calma, descanso, soporte y estabilidad absoluta como el horizonte.',
    '• **Pendiente Indefinida ($m$ no existe):** Recta estrictamente vertical ($x = c$, división entre cero $\\\\Delta x = 0$). Proyecta firmeza, altura, contención y tensión estructural.',
    '',
    '**4. ECUACIONES DE LA RECTA**',
    '• **Punto-Pendiente:** Con un punto $P_1(x_1, y_1)$ y la pendiente $m$: $y - y_1 = m(x - x_1)$.',
    '• **Pendiente-Ordenada al Origen:** Con pendiente $m$ y corte vertical $(0, b)$: $y = mx + b$.',
    '• **Forma General:** $Ax + By + C = 0$, donde la pendiente es $m = -\\\\frac{A}{B}$.',
    '• **Condición de Paralelismo:** Dos rectas son paralelas si y solo si poseen pendientes idénticas: $m_1 = m_2$.',
    '• **Condición de Perpendicularidad:** Dos rectas son perpendiculares si sus pendientes son inversas y opuestas: $m_1 \\\\cdot m_2 = -1 \\\\implies m_2 = -\\\\frac{1}{m_1}$.',
  ].join('\\n'),
  glossary: [
    { term: 'Retícula (Grid)', symbolOrUnit: 'Estructura Modular', definition: 'Armazón de rectas perpendiculares que divide el soporte para ordenar elementos con balance y armonía.' },
    { term: 'Pendiente (m)', symbolOrUnit: 'm = Δy / Δx', definition: 'Relación entre la variación vertical y la variación horizontal que define la inclinación de la recta.' },
    { term: 'Punto Medio', symbolOrUnit: 'M((x1+x2)/2, (y1+y2)/2)', definition: 'Punto que biseca exactamente a un segmento, equidistando de sus dos puntos terminales.' },
    { term: 'Rectas Paralelas', symbolOrUnit: 'm1 = m2', definition: 'Rectas en el plano con el mismo ángulo de inclinación que jamás se intersectan.' },
    { term: 'Rectas Perpendiculares', symbolOrUnit: 'm1 · m2 = -1', definition: 'Rectas que se cortan formando un ángulo recto exacto de 90°.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      {
        name: 'Pendiente de una Recta',
        latex: '$$m = \\\\frac{y_2 - y_1}{x_2 - x_1} = \\\\tan(\\\\theta)$$',
        application: 'Determina el ángulo e inclinación de diagonales visuales en logotipos y layouts.',
      },
      {
        name: 'Distancia Euclidiana',
        latex: '$$d = \\\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$',
        application: 'Mide la distancia exacta entre dos anclas o nodos en el lienzo de diseño.',
      },
      {
        name: 'Ecuación Punto-Pendiente',
        latex: '$$y - y_1 = m(x - x_1)$$',
        application: 'Permite trazar vectores o líneas de fuga partiendo de un punto clave del diseño.',
      },
      {
        name: 'Condición de Perpendicularidad',
        latex: '$$m_1 \\\\cdot m_2 = -1 \\\\iff m_2 = -\\\\frac{1}{m_1}$$',
        application: 'Asegura la ortogonalidad en esquinas, recuadros y tipografía simétrica.',
      },
    ],
    mnemonicsAndPatterns: [
      'Pendiente cero = horizonte plano; pendiente infinita/indefinida = pared vertical sin base.',
      'Perpendicular: gira 90°, invierte la fracción y cambia de signo (ejemplo: 2/3 se convierte en -3/2).',
      'Distancia siempre da un valor positivo o cero, nunca negativo.',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Trazado de Flecha de Identidad Visual entre Nodos (Ejemplo Oficial Guía #2)',
      problemStatement:
        'Un diseñador construye una flecha estilizada para una identidad corporativa. La línea directriz pasa por dos nodos clave: A(2, 4) y B(8, 7). Determina la pendiente de la directriz y su ecuación general.',
      deductiveSteps: [
        '1. Identificar coordenadas: x1 = 2, y1 = 4, x2 = 8, y2 = 7.',
        '2. Calcular la pendiente: m = (7 - 4) / (8 - 2) = 3 / 6 = 1/2.',
        '3. Interpretar el valor: m = 1/2 > 0 indica ascenso dinámico suave (sube 1 unidad por cada 2 que avanza a la derecha).',
        '4. Aplicar ecuación punto-pendiente con A(2, 4): y - 4 = (1/2)(x - 2).',
        '5. Despejar a la forma general: 2(y - 4) = x - 2 → 2y - 8 = x - 2 → x - 2y + 6 = 0.',
      ],
      finalResult: 'Pendiente m = 1/2 y Ecuación General: x - 2y + 6 = 0.',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: '**Trampa en pendientes verticales:** Escribir que una recta vertical tiene pendiente m = 0.',
      correction: 'Una recta horizontal tiene m = 0. Una recta vertical tiene pendiente INDEFINIDA (o no existe) porque el denominador x2 - x1 es igual a cero y la división por cero es una indeterminación.',
    },
    {
      trap: '**Invertir los ejes en el cálculo de m:** Calcular (x2 - x1) / (y2 - y1).',
      correction: 'La pendiente siempre es la relación entre el esfuerzo vertical y el desplazamiento horizontal: Δy en el numerador sobre Δx en el denominador.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Qué es una retícula en diseño y cuál es su objetivo compositivo?', back: 'Es un armazón ortogonal de rectas que divide el espacio en módulos para alinear elementos con orden, equilibrio y consistencia.' },
      { front: '¿Qué significa perceptualmente una pendiente m = 0, m > 0 y m < 0?', back: 'm = 0 evoca calma y estabilidad horizontal; m > 0 comunica dinamismo y crecimiento ascendente; m < 0 sugiere descenso o descanso.' },
      { front: '¿Cuál es la fórmula de la pendiente dados dos puntos?', back: 'm = (y2 - y1) / (x2 - x1).' },
      { front: '¿Cuál es la condición para que dos rectas sean perpendiculares?', back: 'El producto de sus pendientes debe ser -1 (m1 · m2 = -1), es decir, pendientes inversas y con signo opuesto.' },
    ],
    cornellSynthesis: {
      cues: ['Retículas modulares', 'Distancia y punto medio', 'Sentido de la pendiente m', 'Ecuación general de la recta', 'Paralelismo y ortogonalidad'],
      notes: [
        'La retícula organiza el caos visual mediante rectas de referencia.',
        'El punto medio M permite balancear composiciones en torno al centro óptico.',
        'La pendiente mide la inclinación trigonométrica: m = tan(θ).',
        'Dos rectas son paralelas si m1 = m2; son perpendiculares si m1 · m2 = -1.',
      ],
      summary: 'El cálculo cartesiano de rectas proporciona la base métrica para maquetar interfaces, crear logotipos proporcionales y construir retículas estructuradas.',
    },
    conceptMapNodes: [
      'RECTAS Y RETÍCULAS (GUÍA 2 UCAB)',
      '├── Retícula → Modularidad, alineación y consistencia visual',
      '├── Plano Cartesiano → Distancia d = √((Δx)² + (Δy)²) | Punto Medio M((x1+x2)/2, (y1+y2)/2)',
      '├── Pendiente (m = Δy / Δx = tan θ)',
      '│   ├── m > 0: Ascendente (Crecimiento/Dinamismo)',
      '│   ├── m < 0: Descendente (Fluidez/Relajación)',
      '│   ├── m = 0: Horizontal (Estabilidad/Calma)',
      '│   └── m Indefinida: Vertical (Tensión/Estructura)',
      '└── Ecuaciones de la Recta',
      '    ├── Punto-Pendiente: y - y1 = m(x - x1)',
      '    ├── General: Ax + By + C = 0',
      '    ├── Paralelas: m1 = m2',
      '    └── Perpendiculares: m1 · m2 = -1',
    ].join('\\n'),
  },
  generatedQuestions: [],
};

// ============================================================================
// 3. GUÍA TEÓRICA #3: SISTEMAS DE ECUACIONES LINEALES (MÉTODOS Y COMPATIBILIDAD)
// ============================================================================
export const MAFE_MATH_GUIA3_SISTEMAS_TEORIA_GUIDE: DeconstructedAcademicGuide = {
  id: 'mafe-math-guia3-sistemas-teoria',
  userId: MAFE_PROFILE,
  sourceType: 'document',
  discipline: 'design',
  createdAt: '2026-11-02T00:00:00.000Z',
  guideMetadata: {
    title: 'Guía Teórica #3: Sistemas de Ecuaciones Lineales y Métodos de Solución',
    area: 'Diseño · Matemática Aplicada UCAB',
    summary:
      'Álgebra lineal aplicada a la resolución de restricciones geométricas y de proporciones en el diseño. Clasificación analítica y geométrica de sistemas lineales 2x2 (Compatible Determinado, Compatible Indeterminado e Incompatible) y dominio de los cuatro métodos fundamentales: Gráfico, Sustitución, Igualación y Reducción.',
  },
  phenomenonAndTheory: [
    '**1. LOS SISTEMAS DE ECUACIONES COMO HERRAMIENTA DE DISEÑO**',
    'En el diseño integral, un sistema de ecuaciones lineales no es una simple abstracción numérica: es el instrumento matemático para encontrar el **punto exacto de equilibrio o convergencia** donde múltiples restricciones se satisfacen al mismo tiempo (por ejemplo, cruce de líneas directrices, distribución de presupuestos de producción, o mezclas exactas de pigmentos y tintas).',
    '',
    '**2. REPRESENTACIÓN GEOMÉTRICA Y CLASIFICACIÓN DE SISTEMAS 2x2**',
    'Cada ecuación lineal de la forma $ax + by = c$ representa una recta en el plano cartesiano. Al analizar dos rectas simultáneamente, se presentan tres escenarios geométricos:',
    '• **Sistema Compatible Determinado (SCD):** Las dos rectas son **secantes** y se cortan en un **único punto** $(x_0, y_0)$. Posee solución única y representa una solución exacta de diseño.',
    '• **Sistema Compatible Indeterminado (SCI):** Las dos ecuaciones representan la **misma recta (rectas coincidentes)**. Posee **infinitas soluciones** (todo punto sobre la recta satisface el sistema). Representa redundancia de condiciones.',
    '• **Sistema Incompatible (SI):** Las dos rectas son **paralelas y distintas** ($m_1 = m_2, b_1 \\\\neq b_2$). No se cortan jamás en ningún punto; por tanto, **no tiene solución**. Representa restricciones mutuamente excluyentes o contradictorias en el diseño.',
    '',
    '**3. LOS CUATRO MÉTODOS DE RESOLUCIÓN ANALÍTICA Y GRÁFICA**',
    '• **Método Gráfico:** Se tabulan al menos dos puntos notables (preferiblemente los cortes con los ejes $x=0$ y $y=0$) para cada recta, se trazan sobre la cuadrícula y se lee la coordenada de intersección.',
    '• **Método de Sustitución:** Se despeja una incógnita de una de las ecuaciones y se sustituye la expresión resultante en la otra ecuación, reduciendo el sistema a una ecuación lineal de una variable.',
    '• **Método de Igualación:** Se despeja la **misma variable** en ambas ecuaciones y se igualan sus miembros correspondientes: $x_1 = x_2$ o $y_1 = y_2$.',
    '• **Método de Reducción (Eliminación por Suma y Resta):** Se multiplican una o ambas ecuaciones por factores numéricos convenientes para que los coeficientes de una de las variables sean opuestos ($+k$ y $-k$), sumando algebraicamente las ecuaciones para anular dicha variable.',
  ].join('\\n'),
  glossary: [
    { term: 'Sistema Compatible Determinado', symbolOrUnit: '1 Solución Única', definition: 'Sistema cuyas rectas se cortan en un único punto (rectas secantes con pendientes distintas).' },
    { term: 'Sistema Compatible Indeterminado', symbolOrUnit: 'Infinitas Soluciones', definition: 'Sistema donde ambas ecuaciones representan la misma recta geométrica (rectas coincidentes).' },
    { term: 'Sistema Incompatible', symbolOrUnit: '0 Soluciones', definition: 'Sistema cuyas rectas son paralelas y no tienen ningún punto en común.' },
    { term: 'Método de Reducción', symbolOrUnit: 'Eliminación', definition: 'Estrategia de multiplicar por constantes para cancelar una variable mediante suma algebraica.' },
    { term: 'Punto de Intersección', symbolOrUnit: '(x, y)', definition: 'Par ordenado de números reales que satisface simultáneamente ambas ecuaciones del sistema.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      {
        name: 'Forma General del Sistema Lineal 2x2',
        latex: '$$\\\\begin{cases} a_1 x + b_1 y = c_1 \\\\\\\\ a_2 x + b_2 y = c_2 \\\\end{cases}$$',
        application: 'Estructura canónica para relacionar dos restricciones proyectuales simultáneas.',
      },
      {
        name: 'Criterio de Compatibilidad por Pendientes',
        latex: '$$m_1 \\\\neq m_2 \\\\implies \\\\text{SCD (Solución Única)}, \\\\quad m_1 = m_2 \\\\text{ y } b_1 \\\\neq b_2 \\\\implies \\\\text{SI (Sin Solución)}$$',
        application: 'Diagnóstico visual rápido de si dos directrices de diseño convergen o son paralelas.',
      },
    ],
    mnemonicsAndPatterns: [
      'Determinado = se cortan (una X en el plano).',
      'Indeterminado = una encima de la otra (la misma línea).',
      'Incompatible = vías del tren paralelas que nunca se cruzan.',
      'Sustituir: despeja la que tenga coeficiente 1 para evitar fracciones.',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Resolución de Sistema Compatible Determinado por Igualación (Ejemplo Oficial Guía #3)',
      problemStatement:
        'Resuelve analíticamente por el método de igualación y clasifica geométricamente el sistema: { x + 7y = 18 ; x - 5y = -6 }.',
      deductiveSteps: [
        '1. Despejar la variable x en ambas ecuaciones: En la primera: x = 18 - 7y. En la segunda: x = 5y - 6.',
        '2. Igualar ambas expresiones de x: 18 - 7y = 5y - 6.',
        '3. Agrupar términos semejantes: 18 + 6 = 5y + 7y → 24 = 12y → y = 24 / 12 = 2.',
        '4. Sustituir y = 2 para hallar x: x = 18 - 7(2) = 18 - 14 = 4.',
        '5. Verificación en la segunda ecuación: 4 - 5(2) = 4 - 10 = -6 (Cumple exactamente).',
      ],
      finalResult: 'Punto de intersección único P(4, 2). Sistema Compatible Determinado (rectas secantes).',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: '**Olvidar los signos al despejar:** Cambiar de miembro sin invertir el signo (ej. x - 5y = -6 → x = -6 - 5y).',
      correction: 'Al trasponer términos entre miembros, todo término que resta pasa sumando: x = 5y - 6.',
    },
    {
      trap: '**Interpretar 0 = k como infinitas soluciones:** Creer que cuando las variables se cancelan siempre hay infinitas soluciones.',
      correction: 'Si se cancelan y queda 0 = 0, es Compatible Indeterminado (infinitas soluciones). Si queda una contradicción como 0 = 8, el sistema es Incompatible (sin solución).',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Qué representan geométricamente las soluciones de un sistema de ecuaciones lineales 2x2?', back: 'Los puntos de intersección entre las dos rectas en el plano cartesiano.' },
      { front: '¿Qué caracteriza a un sistema Incompatible?', back: 'Las rectas son paralelas con la misma pendiente y distinta ordenada al origen; no se tocan jamás (cero soluciones).' },
      { front: '¿En qué consiste el método de reducción?', back: 'En multiplicar las ecuaciones para obtener coeficientes opuestos en una incógnita y sumarlas para cancelarla.' },
      { front: '¿Qué resultado algebraico indica que un sistema es Compatible Indeterminado?', back: 'Se eliminan las incógnitas y se obtiene una identidad verdadera como 0 = 0 (rectas coincidentes).' },
    ],
    cornellSynthesis: {
      cues: ['Definición de sistema 2x2', 'SCD, SCI y SI', 'Método gráfico', 'Métodos algebraicos (Sustitución, Igualación, Reducción)'],
      notes: [
        'Un sistema formaliza restricciones simultáneas de diseño.',
        'SCD = 1 punto; SCI = infinitos puntos; SI = ningún punto.',
        'El método gráfico ubica cortes con los ejes x = 0 y y = 0.',
        'La reducción es el método más veloz cuando hay coeficientes fraccionarios o múltiplos.',
      ],
      summary: 'El dominio de los sistemas lineales permite resolver cualquier intersección de directrices o balance de recursos en proyectos de diseño con total certidumbre geométrica.',
    },
    conceptMapNodes: [
      'SISTEMAS DE ECUACIONES LINEALES (GUÍA 3 TEORÍA UCAB)',
      '├── Concepto: Intersección de condiciones y restricciones de diseño',
      '├── Clasificación Geométrica',
      '│   ├── SCD: Rectas Secantes → 1 Solución Única (x, y)',
      '│   ├── SCI: Rectas Coincidentes → Infinitas Soluciones (0 = 0)',
      '│   └── SI: Rectas Paralelas → Sin Solución (0 = k)',
      '└── Métodos de Resolución',
      '    ├── Gráfico: Cortes con ejes x = 0 e y = 0',
      '    ├── Sustitución: Despejar en una e insertar en otra',
      '    ├── Igualación: Despejar la misma variable en ambas',
      '    └── Reducción: Coeficientes opuestos y suma algebraica',
    ].join('\\n'),
  },
  generatedQuestions: [],
};

// ============================================================================
// 4. GUÍA DE EJERCICIOS #3: BANCO PRÁCTICO Y MODELADO EN DISEÑO
// ============================================================================
export const MAFE_MATH_GUIA3_SISTEMAS_EJERCICIOS_GUIDE: DeconstructedAcademicGuide = {
  id: 'mafe-math-guia3-sistemas-ejercicios',
  userId: MAFE_PROFILE,
  sourceType: 'document',
  discipline: 'design',
  createdAt: '2026-11-02T00:00:00.000Z',
  guideMetadata: {
    title: 'Guía de Ejercicios #3: Banco Práctico y Modelado de Sistemas Lineales en Diseño',
    area: 'Diseño · Matemática Aplicada UCAB',
    summary:
      'Taller práctico con la resolución paso a paso de los 8 bloques de ejercicios oficiales de la UCAB: sistemas algebraicos por sustitución, igualación y reducción, y modelado matemático de problemas reales en diseño (mezcla de tintes pigmentarios, balance de carga eléctrica en iluminación LED, y cálculo de rendimiento de impresión publicitaria).',
  },
  phenomenonAndTheory: [
    '**1. LA MATEMÁTICA COMO HERRAMIENTA PROYECTUAL EN EL TALLER DE DISEÑO**',
    'La Guía de Ejercicios #3 de la UCAB entrena la capacidad del diseñador para traducir problemáticas físicas y operativas del taller a modelos algebraicos precisos. Resolver sistemas de ecuaciones permite optimizar recursos limitados, tales como presupuestos de pigmentos costosos, potencias energéticas en iluminación de interiores y tiempos de máquina en imprenta.',
    '',
    '**2. ESTRUCTURA DEL CUADERNO DE EJERCICIOS OFICIAL UCAB**',
    '• **Bloque 1 (Método de Sustitución):** Ejercicios 1a, 1b, 1c.',
    '• **Bloque 2 (Método de Igualación):** Ejercicios 2a, 2b, 2c.',
    '• **Bloque 3 (Método de Reducción):** Ejercicios 3a, 3b, 3c.',
    '• **Bloque 4 (Sistemas Generales y Casos Especiales):** Rectas ortogonales simples ($x=a, y=b$) y simplificación de términos agrupados.',
    '• **Bloque 5 a 8 (Modelado de Problemas Reales en Diseño):**',
    '   – *Ejercicio 5 (Tintes Pigmentarios):* Mezcla de dos tintes A ($5/ml) y B ($8/ml) para obtener 30 ml con un costo de $180.',
    '   – *Ejercicio 6 (Iluminación LED de Espacios):* Lámparas ambientales de 10W y acento de 25W en un total de 15 luminarias con 210W totales.',
    '   – *Ejercicio 7 (Impresión Publicitaria):* Rendimiento y tiempo de operación de dos impresoras A (40 ppm) y B (60 ppm) produciendo 5.200 páginas en 100 minutos.',
    '   – *Ejercicio 8 (Diseño Textil Híbrido):* Mezcla de hilos de seda y lino para balancear peso y resistencia en telar.',
  ].join('\\n'),
  glossary: [
    { term: 'Modelado Lineal en Diseño', symbolOrUnit: 'Traducción Proyectual', definition: 'Proceso de convertir requerimientos de materiales, costos o tiempos en variables algebraicas interconectadas.' },
    { term: 'Restricción de Volumen / Cantidad', symbolOrUnit: 'x + y = Total', definition: 'Ecuación que fija el límite físico de unidades, mililitros o luminarias disponibles.' },
    { term: 'Restricción de Costo / Energía', symbolOrUnit: 'c1·x + c2·y = Presupuesto', definition: 'Ecuación ponderada por coeficientes de costo unitario, potencia en watts o velocidad.' },
    { term: 'Validación en Contexto Real', symbolOrUnit: 'x, y ≥ 0', definition: 'Comprobación de que las soluciones matemáticas tengan sentido físico (cantidades no negativas).' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      {
        name: 'Modelo de Mezcla de Tintes Pigmentarios',
        latex: '$$\\\\begin{cases} A + B = 30 \\\\\\\\ 5A + 8B = 180 \\\\end{cases}$$',
        application: 'Cálculo de proporciones exactas de mililitros de tintes artísticos para tonos específicos.',
      },
      {
        name: 'Modelo de Iluminación y Carga Eléctrica',
        latex: '$$\\\\begin{cases} A + B = 15 \\\\\\\\ 10A + 25B = 210 \\\\end{cases}$$',
        application: 'Distribución de luminarias LED de ambiente y de acento sin sobrecargar la red.',
      },
      {
        name: 'Modelo de Producción Editorial e Impresión',
        latex: '$$\\\\begin{cases} A + B = 100 \\\\\\\\ 40A + 60B = 5200 \\\\end{cases}$$',
        application: 'Asignación de tiempos operativos en minutos para maquinaria de artes gráficas.',
      },
    ],
    mnemonicsAndPatterns: [
      'Primera ecuación siempre suma unidades físicas simples: A + B = Total.',
      'Segunda ecuación multiplica cada variable por su tasa específica: (tasa A)·A + (tasa B)·B = Total monetario o energético.',
      'Resta de reducción: multiplica la primera ecuación por el coeficiente menor para eliminar rápido.',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Resolución del Problema #5: Mezcla de Tintes para Coloración Específica',
      problemStatement:
        'Para obtener un tono de pintura específico, un artista mezcla dos tipos de tintes. El tinte A cuesta $5 el mililitro y el tinte B cuesta $8 el mililitro. Si al final se obtienen 30 ml de mezcla con un costo total de $180, determina cuántos ml de cada tinte se utilizaron.',
      deductiveSteps: [
        '1. Definir variables: A = mililitros de tinte A; B = mililitros de tinte B.',
        '2. Plantear el sistema de ecuaciones: (1) A + B = 30; (2) 5A + 8B = 180.',
        '3. Aplicar el método de sustitución: despejar A en (1) → A = 30 - B.',
        '4. Sustituir en (2): 5(30 - B) + 8B = 180 → 150 - 5B + 8B = 180.',
        '5. Reducir términos: 3B = 180 - 150 → 3B = 30 → B = 10 ml.',
        '6. Calcular A: A = 30 - 10 = 20 ml.',
        '7. Verificación del costo: 20 ml × $5/ml + 10 ml × $8/ml = $100 + $80 = $180 (Coincidencia exacta).',
      ],
      finalResult: 'Se utilizaron 20 ml del tinte A y 10 ml del tinte B.',
    },
    {
      title: 'Resolución del Problema #6: Iluminación LED y Eficiencia Energética',
      problemStatement:
        'En un proyecto de iluminación se instalan dos tipos de lámparas LED. Las de ambiente consumen 10W cada una y las de acento 25W. El diseño total utiliza 15 lámparas con un consumo simultáneo de 210W. Calcula cuántas lámparas de cada tipo se instalaron.',
      deductiveSteps: [
        '1. Variables: x = lámparas de ambiente (10W); y = lámparas de acento (25W).',
        '2. Sistema: (1) x + y = 15; (2) 10x + 25y = 210.',
        '3. Método de reducción: multiplicar (1) por -10 → -10x - 10y = -150.',
        '4. Sumar con la ecuación (2): (-10x + 10x) + (-10y + 25y) = -150 + 210 → 15y = 60 → y = 4.',
        '5. Hallar x: x = 15 - 4 = 11.',
        '6. Comprobación: 11(10W) + 4(25W) = 110W + 100W = 210W.',
      ],
      finalResult: 'Se instalaron 11 lámparas de ambiente y 4 lámparas de acento.',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: '**Mezclar unidades de medida en el planteamiento:** Sumar minutos con horas o watts con kilowatts.',
      correction: 'Asegúrate de que todas las variables y constantes estén en la misma unidad antes de operar algebraicamente.',
    },
    {
      trap: '**Obtener valores negativos de materiales o tiempo:** Aceptar resultados como A = -5 ml sin revisar signos.',
      correction: 'En problemas de diseño del mundo real, las cantidades físicas son estrictamente positivas. Si obtienes un negativo, revisa la trasposición de términos.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Cuáles son las dos ecuaciones estándar en un problema de mezclas en diseño?', back: 'La ecuación de volumen total (A + B = Volumen) y la ecuación de costo o concentración ponderada (c1·A + c2·B = Total).' },
      { front: 'En el problema de los tintes (Guía #3), ¿cuántos ml de cada tinte se requieren para 30 ml a $180?', back: '20 ml del tinte A ($5/ml) y 10 ml del tinte B ($8/ml).' },
      { front: 'En el problema de iluminación LED, ¿cuántas lámparas de ambiente (10W) y acento (25W) suman 15 lámparas y 210W?', back: '11 lámparas de ambiente y 4 lámparas de acento.' },
      { front: 'En el problema de las impresoras de la agencia, ¿cuánto tiempo operó cada máquina para 5.200 páginas en 100 min?', back: 'La impresora A (40 ppm) operó 40 min y la impresora B (60 ppm) operó 60 min.' },
    ],
    cornellSynthesis: {
      cues: ['Planteamiento de sistemas reales', 'Problema de tintes de arte', 'Problema de luminotecnia LED', 'Problema de producción editorial'],
      notes: [
        'El modelado comienza aislando dos variables claras x e y.',
        'Se formulan dos restricciones independientes: física y financiera/técnica.',
        'El método de reducción es el más directo multiplicando por el coeficiente menor.',
        'La solución debe satisfacer ambas condiciones simultáneamente.',
      ],
      summary: 'La resolución de problemas aplicados entrena el pensamiento proyectual del diseñador para gestionar recursos de fabricación con rigor matemático.',
    },
    conceptMapNodes: [
      'BANCO DE EJERCICIOS Y APLICACIONES (GUÍA 3 EJERCICIOS UCAB)',
      '├── Métodos Algebraicos Directos',
      '│   ├── Sustitución (Ejercicios 1a, 1b, 1c)',
      '│   ├── Igualación (Ejercicios 2a, 2b, 2c)',
      '│   └── Reducción (Ejercicios 3a, 3b, 3c)',
      '└── Aplicaciones Reales en Diseño',
      '    ├── Tintes de Pigmento: A + B = 30 | 5A + 8B = 180 → A=20 ml, B=10 ml',
      '    ├── Luminotecnia LED: x + y = 15 | 10x + 25y = 210 → x=11 amb, y=4 acento',
      '    └── Editorial: A + B = 100 | 40A + 60B = 5200 → A=40 min, B=60 min',
    ].join('\\n'),
  },
  generatedQuestions: [],
};

// ============================================================================
// 5. GUÍA TEÓRICA #4: ÁNGULOS (SISTEMAS DE MEDIDA Y PARALELAS CON SECANTE)
// ============================================================================
export const MAFE_MATH_GUIA4_ANGULOS_TEORIA_GUIDE: DeconstructedAcademicGuide = {
  id: 'mafe-math-guia4-angulos-teoria',
  userId: MAFE_PROFILE,
  sourceType: 'document',
  discipline: 'design',
  createdAt: '2026-11-02T00:00:00.000Z',
  guideMetadata: {
    title: 'Guía Teórica #4: Ángulos, Sistemas Sexagesimal/Circular y Rectas Paralelas con Secante',
    area: 'Diseño · Matemática Aplicada UCAB',
    summary:
      'Geometría angular rigurosa aplicada al diseño visual y estructural. Definición del ángulo, posición estándar y sentido de giro, conversión exacta entre sistema sexagesimal (grados) y circular (radianes), clasificaciones por amplitud y posición (consecutivos, adyacentes, opuestos por el vértice), relaciones por suma (complementarios y suplementarios) y los 8 tipos de ángulos formados por rectas paralelas cortadas por una secante.',
  },
  phenomenonAndTheory: [
    '**1. EL ÁNGULO EN EL DISEÑO VISUAL Y ESTRUCTURAL**',
    'Los ángulos son la base del diseño visual: no solo definen la apertura entre dos líneas o planos, sino que transmiten sensaciones psicológicas determinantes. Mientras que los ángulos rectos ($90^\\\\circ$) proyectan orden, estabilidad, solidez y equilibrio institucional, los ángulos agudos ($<90^\\\\circ$) y obtusos ($>90^\\\\circ$) aportan dinamismo, agresividad, fluidez, dirección y perspectiva.',
    '',
    '**2. POSICIÓN ESTÁNDAR Y SENTIDO DE GIRO**',
    '• **Ángulo en posición estándar:** Es aquel cuyo vértice coincide con el origen de coordenadas $(0, 0)$ y su lado inicial reposa sobre el semieje positivo de las abscisas ($+x$).',
    '• **Barrida Positiva:** Giro en sentido **antihorario** (contrario a las agujas del reloj). Es la convención matemática positiva.',
    '• **Barrida Negativa:** Giro en sentido **horario** (en la dirección de las agujas del reloj). Posee signo negativo.',
    '',
    '**3. SISTEMAS DE MEDIDAS: SEXAGESIMAL VS. CIRCULAR**',
    "• **Sistema Sexagesimal:** La circunferencia se divide en 360 partes iguales denominadas grados sexagesimales (1 grado = 60 minutos = 3600 segundos).",
    '• **Sistema Circular:** Su unidad es el **Radián (rad)**, que corresponde al ángulo central que subtiende un arco de circunferencia cuya longitud es exactamente igual al radio de la misma.',
    '• **Equivalencia Fundamental:** $360^\\\\circ = 2\\\\pi\\\\text{ rad} \\\\iff 180^\\\\circ = \\\\pi\\\\text{ rad}$.',
    '• **Factores de Conversión Directa:**',
    '   – De Grados a Radianes: multiplicar por $\\\\frac{\\\\pi}{180^\\\\circ}$.',
    '   – De Radianes a Grados: multiplicar por $\\\\frac{180^\\\\circ}{\\\\pi}$.',
    '',
    '**4. CLASIFICACIÓN DE ÁNGULOS**',
    '• **Por su Amplitud:** Nulo ($0^\\\\circ$), Agudo ($0^\\\\circ < \\\\theta < 90^\\\\circ$), Recto ($90^\\\\circ$), Obtuso ($90^\\\\circ < \\\\theta < 180^\\\\circ$), Llano ($180^\\\\circ$), Cóncavo o Reflejo ($180^\\\\circ < \\\\theta < 360^\\\\circ$) y Completo ($360^\\\\circ$).',
    '• **Por su Posición (Parejas de Ángulos):**',
    '   – **Consecutivos:** Comparten el vértice y un lado común interior.',
    '   – **Adyacentes:** Son consecutivos y sus lados no comunes forman una línea recta continua. **Siempre suman $180^\\\\circ$ (son suplementarios)**. "Todos los adyacentes son consecutivos, pero no todos los consecutivos son adyacentes".',
    '   – **Opuestos por el Vértice:** Los lados de uno son la prolongación de los lados del otro. **Tienen exactamente la misma medida**. ',
    '• **Por su Suma:**',
    '   – **Complementarios:** Dos ángulos cuyas medidas suman un ángulo recto: $\\\\alpha + \\\\beta = 90^\\\\circ$.',
    '   – **Suplementarios:** Dos ángulos cuyas medidas suman un ángulo llano: $\\\\alpha + \\\\beta = 180^\\\\circ$.',
    '',
    '**5. RECTAS PARALELAS CORTADAS POR UNA RECTA SECANTE ($l_1 \\\\parallel l_2$)**',
    'Al cortar dos rectas paralelas con una transversal secante, se generan 8 ángulos con propiedades invariantes:',
    '• **Ángulos Iguales entre sí:**',
    '   – Opuestos por el vértice: $(1, 3), (2, 4), (5, 7), (6, 8)$.',
    '   – Correspondientes (misma posición relativa): $(1, 5), (2, 6), (3, 7), (4, 8)$.',
    '   – Alternos Internos (lados opuestos dentro de las paralelas): $(3, 5), (4, 6)$.',
    '   – Alternos Externos (lados opuestos fuera de las paralelas): $(1, 7), (2, 8)$.',
    '• **Ángulos Suplementarios (Suman $180^\\\\circ$):**',
    '   – Adyacentes sobre una misma recta: $(1, 2), (2, 3), (3, 4), (4, 1), (5, 6), (6, 7), (7, 8), (8, 5)$.',
    '   – Colaterales Internos (Conjugados Internos): $(3, 6)$ y $(4, 5)$.',
    '   – Colaterales Externos (Conjugados Externos): $(1, 8)$ y $(2, 7)$.',
  ].join('\\n'),
  glossary: [
    { term: 'Radián (rad)', symbolOrUnit: 'Sistema Circular', definition: 'Ángulo central subtendido por un arco con longitud idéntica al radio de la circunferencia.' },
    { term: 'Ángulos Adyacentes', symbolOrUnit: 'α + β = 180°', definition: 'Ángulos consecutivos cuyos lados no compartidos forman una línea recta continua.' },
    { term: 'Ángulos Complementarios', symbolOrUnit: 'α + β = 90°', definition: 'Pareja de ángulos cuyas amplitudes suman exactamente noventa grados.' },
    { term: 'Ángulos Suplementarios', symbolOrUnit: 'α + β = 180°', definition: 'Pareja de ángulos cuyas amplitudes suman exactamente ciento ochenta grados.' },
    { term: 'Ángulos Alternos Internos', symbolOrUnit: '∠3 = ∠5', definition: 'Ángulos interiores situados a lados opuestos de la recta secante, iguales entre sí cuando l1 || l2.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      {
        name: 'Equivalencia Sexagesimal a Circular',
        latex: '$$\\\\theta_{\\\\text{rad}} = \\\\theta^\\\\circ \\\\cdot \\\\frac{\\\\pi}{180^\\\\circ}$$',
        application: 'Conversión de grados a radianes para programación visual y diseño paramétrico.',
      },
      {
        name: 'Conversión Circular a Sexagesimal',
        latex: '$$\\\\theta^\\\\circ = \\\\theta_{\\\\text{rad}} \\\\cdot \\\\frac{180^\\\\circ}{\\\\pi}$$',
        application: 'Conversión de radianes a grados para calibración de herramientas físicas de corte y dibujo.',
      },
      {
        name: 'Relación de Ángulos Conjugados (Colaterales)',
        latex: '$$\\\\angle_{\\\\text{colateral 1}} + \\\\angle_{\\\\text{colateral 2}} = 180^\\\\circ$$',
        application: 'Cálculo de vigas inclinadas y tensores de apoyo en diseño de stands e interiores.',
      },
    ],
    mnemonicsAndPatterns: [
      'Giro antihorario = positivo; giro horario = negativo.',
      'Alternos = se alternan a los lados de la secante (son IGUALES).',
      'Colaterales = van del mismo lado (son SUPLEMENTARIOS, suman 180°).',
      'Complementarios = esquina de 90° (C); Suplementarios = línea recta de 180° (S).',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Conversión de Ángulo de Giro Paramétrico en Software 3D (Ejemplo Oficial)',
      problemStatement:
        'Un modelador 3D debe introducir el valor exacto en radianes para una rotación de cámara de 240° y verificar su equivalente canónico simplificado.',
      deductiveSteps: [
        '1. Aplicar factor de conversión: rad = 240° × (π / 180°).',
        '2. Simplificar la fracción: 240 / 180 dividiendo entre 10 → 24 / 18.',
        '3. Dividir entre 6 numerador y denominador: 24 / 6 = 4 ; 18 / 6 = 3.',
        '4. Expresión canónica en radianes: (4/3)π rad.',
      ],
      finalResult: '240° equivale exactamente a (4π / 3) radianes.',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: '**Confundir ángulos consecutivos con adyacentes:** Decir que cualquier pareja de ángulos consecutivos suma 180°.',
      correction: 'Dos ángulos consecutivos solo son adyacentes si sus lados exteriores forman una línea recta. Si no forman una recta, son simplemente consecutivos y su suma no es necesariamente 180°.',
    },
    {
      trap: '**Olvidar simplificar múltiplos de π al convertir a grados:** Tratar de aproximar π con 3.1416.',
      correction: 'En geometría formal de diseño, π del numerador se cancela con π del factor 180°/π, dando un número entero o fraccionario exacto sin decimales erróneos.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Cuál es la diferencia fundamental entre ángulos consecutivos y adyacentes?', back: 'Los consecutivos solo comparten el vértice y un lado; los adyacentes son consecutivos y además sus lados no comunes forman una recta (suman 180°).' },
      { front: '¿Cuánto mide un radián en grados sexagesimales aproximadamente y cuál es la equivalencia exacta?', back: 'Aproximadamente 57.3°; la equivalencia matemática exacta es π rad = 180°.' },
      { front: 'Si dos rectas paralelas son cortadas por una secante, ¿cuáles parejas de ángulos son iguales?', back: 'Los correspondientes, los alternos internos, los alternos externos y los opuestos por el vértice.' },
      { front: '¿Cuáles parejas de ángulos formados por paralelas y secante son suplementarias?', back: 'Los ángulos adyacentes y los colaterales (tanto internos como externos).' },
    ],
    cornellSynthesis: {
      cues: ['Sentido de giro angular', 'Grados vs Radianes', 'Clasificación de ángulos', 'Paralelas cortadas por secante'],
      notes: [
        'Sentido antihorario es positivo; horario es negativo.',
        'Factor π/180° convierte a radianes; 180°/π convierte a grados.',
        'Complementarios suman 90°; suplementarios suman 180°.',
        'Los alternos son congruentes; los colaterales son suplementarios.',
      ],
      summary: 'La geometría angular ofrece control milimétrico sobre giros, líneas secantes y proporciones estéticas en la construcción de marcas y soportes tridimensionales.',
    },
    conceptMapNodes: [
      'TEORÍA DE ÁNGULOS (GUÍA 4 TEORÍA UCAB)',
      '├── Posición Estándar: Vértice en origen, lado inicial en +x',
      '│   ├── Antihorario → Positivo (+)',
      '│   └── Horario → Negativo (-)',
      '├── Sistemas de Medida: π rad = 180°',
      '│   ├── Grados a Radianes: × (π / 180°)',
      '│   └── Radianes a Grados: × (180° / π)',
      '├── Clasificación por Amplitud: Agudo (<90°) | Recto (90°) | Obtuso (>90°) | Llano (180°)',
      '├── Parejas de Ángulos: Consecutivos | Adyacentes (180°) | Opuestos por el vértice (=)',
      '└── Paralelas con Secante (l1 || l2)',
      '    ├── Ángulos Iguales: Alternos Internos/Externos | Correspondientes',
      '    └── Ángulos Suplementarios: Colaterales Internos/Externos (suman 180°)',
    ].join('\\n'),
  },
  generatedQuestions: [],
};

// ============================================================================
// 6. GUÍA DE EJERCICIOS #4: GEOMETRÍA ANGULAR, PROPOSICIONES Y RAMPAS
// ============================================================================
export const MAFE_MATH_GUIA4_ANGULOS_EJERCICIOS_GUIDE: DeconstructedAcademicGuide = {
  id: 'mafe-math-guia4-angulos-ejercicios',
  userId: MAFE_PROFILE,
  sourceType: 'document',
  discipline: 'design',
  createdAt: '2026-11-02T00:00:00.000Z',
  guideMetadata: {
    title: 'Guía de Ejercicios #4: Geometría Angular, Conversiones, Rampas y Logotipos',
    area: 'Diseño · Matemática Aplicada UCAB',
    summary:
      'Cuaderno de resolución integral de los problemas prácticos de la Guía Oficial #4 de la UCAB: conversiones angulares bidireccionales con múltiplos de $\\\\pi$, análisis de veracidad y justificaciones lógicas de proposiciones geométricas, bisectrices, cálculo de balances angulares en isotipos minimalistas, soporte estructural de rampas y determinación de incógnitas $x$ e $y$ en sistemas de rectas paralelas.',
  },
  phenomenonAndTheory: [
    '**1. APLICACIÓN PRÁCTICA DEL ANÁLISIS ANGULAR EN EL DISEÑO INTEGRAL**',
    'La Guía de Ejercicios #4 de la UCAB aborda el razonamiento deductivo visual. A través de 22 secciones de problemas, el alumno ejercita la precisión matemática para calcular inclinaciones de rampas accesibles, determinar bisectrices simétricas en isotipos y resolver incógnitas en estructuras reticulares de rectas paralelas.',
    '',
    '**2. CONVERSIONES FUNDAMENTALES DE LA GUÍA OFICIAL**',
    '• **Conversión al Sistema Circular (Radianes):**',
    '   – $240^\\\\circ = \\\\frac{4\\\\pi}{3}\\\\text{ rad}$ | $144^\\\\circ = \\\\frac{4\\\\pi}{5}\\\\text{ rad}$ | $270^\\\\circ = \\\\frac{3\\\\pi}{2}\\\\text{ rad}$',
    '   – $40^\\\\circ = \\\\frac{2\\\\pi}{9}\\\\text{ rad}$ | $315^\\\\circ = \\\\frac{7\\\\pi}{4}\\\\text{ rad}$ | $12^\\\\circ = \\\\frac{\\\\pi}{15}\\\\text{ rad}$',
    '   – $138^\\\\circ = \\\\frac{23\\\\pi}{30}\\\\text{ rad}$ | $84^\\\\circ = \\\\frac{7\\\\pi}{15}\\\\text{ rad}$ | $252^\\\\circ = \\\\frac{7\\\\pi}{5}\\\\text{ rad}$',
    '• **Conversión al Sistema Sexagesimal (Grados):**',
    '   – $\\\\frac{2\\\\pi}{5}\\\\text{ rad} = 72^\\\\circ$ | $\\\\frac{13\\\\pi}{8}\\\\text{ rad} = 292.5^\\\\circ$ | $\\\\frac{7\\\\pi}{9}\\\\text{ rad} = 140^\\\\circ$',
    '   – $\\\\frac{17\\\\pi}{10}\\\\text{ rad} = 306^\\\\circ$ | $\\\\frac{7\\\\pi}{4}\\\\text{ rad} = 315^\\\\circ$ | $\\\\frac{\\\\pi}{12}\\\\text{ rad} = 15^\\\\circ$',
    '',
    '**3. ANÁLISIS DE VERACIDAD Y PROPOSICIONES GEOMÉTRICAS (EJERCICIO 3 UCAB)**',
    '• *(a) "Si la medida de un ángulo es 91°, entonces es obtuso":* **VERDADERO**. Por definición, un ángulo obtuso mide estrictamente más de 90° y menos de 180° ($90^\\\\circ < 91^\\\\circ < 180^\\\\circ$).',
    '• *(b) "Si la suma de dos ángulos es 120°, podemos asegurar que ambos son agudos":* **FALSO**. Contraejemplo: $\\\\alpha = 100^\\\\circ$ (obtuso) y $\\\\beta = 20^\\\\circ$ (agudo); su suma es 120° y uno de ellos no es agudo.',
    '• *(c) Relación de suplementos y tercios de ángulos:* Demuestra deductivamente si $\\\\alpha$ y $\\\\beta$ tienen igual medida.',
    '',
    '**4. PROBLEMAS DE APLICACIÓN EN DISEÑO Y ARQUITECTURA**',
    '• **Balance en Isotipo Minimalista:** Un logotipo cuadrado requiere que el ángulo superior $\\\\alpha = 2x + 10^\\\\circ$ y el lateral $\\\\beta = 3x - 5^\\\\circ$ sean complementarios. Se deduce $x = 17^\\\\circ$, obteniendo $\\\\alpha = 44^\\\\circ$ y $\\\\beta = 46^\\\\circ$.',
    '• **Soporte de Rampa:** Una rampa estructural debe formar un ángulo recto ($90^\\\\circ$) con el plano vertical. Si el suelo y la rampa forman $30^\\\\circ$, el ángulo restante para el soporte superior es $90^\\\\circ - 30^\\\\circ = 60^\\\\circ$.',
    '• **Sistemas de Rectas Paralelas Cortadas por Transversal (Ejercicio 22):** Determinación algebraica de $x$ e $y$ igualando ángulos alternos internos o sumando colaterales a $180^\\\\circ$ o $\\\\pi$ radianes.',
  ].join('\\n'),
  glossary: [
    { term: 'Bisectriz', symbolOrUnit: 'Eje de Simetría', definition: 'Semirrecta que nace en el vértice de un ángulo y lo divide en dos ángulos exactamente congruentes de igual medida.' },
    { term: 'Contraejemplo Geométrico', symbolOrUnit: 'Refutación Lógica', definition: 'Caso particular que demuestra la falsedad de una proposición universal hipotética.' },
    { term: 'Ángulo Obtuso', symbolOrUnit: '90° < θ < 180°', definition: 'Ángulo cuya amplitud es mayor a un ángulo recto y menor a un ángulo llano.' },
    { term: 'Encuadre Complementario', symbolOrUnit: 'α + β = 90°', definition: 'Alineación de dos líneas directrices de un logotipo que se cierran ortogonalmente.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      {
        name: 'Conversión Grados a Radianes Canónicos',
        latex: '$$\\\\theta_{\\\\text{rad}} = \\\\frac{\\\\theta^\\\\circ}{180^\\\\circ} \\\\cdot \\\\pi$$',
        application: 'Cálculo de radianes reduciendo la fracción a sus factores primos irreducibles.',
      },
      {
        name: 'Ecuación de Balance Angular en Isotipo',
        latex: '$$(2x + 10^\\\\circ) + (3x - 5^\\\\circ) = 90^\\\\circ \\\\implies 5x + 5 = 90 \\\\implies x = 17^\\\\circ$$',
        application: 'Alineación precisa de diagonales y proporciones en marcas de identidad visual.',
      },
      {
        name: 'Resolución de Paralelas con Ángulos en Radianes',
        latex: '$$\\\\begin{cases} 7x - 5y = \\\\frac{5\\\\pi}{12} \\\\\\\\ x + y = \\\\frac{\\\\pi}{12} \\\\end{cases}$$',
        application: 'Determinación de coordenadas angulares en tramas y celosías de diseño industrial.',
      },
    ],
    mnemonicsAndPatterns: [
      'Para saber si una afirmación es falsa, basta con encontrar un solo contraejemplo numérico.',
      'Suma de dos ángulos = 120°: uno puede ser 110° y el otro 10° (no todos tienen que ser agudos).',
      'La bisectriz siempre divide el ángulo a la mitad exacta: cada porción mide θ / 2.',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Resolución del Ejercicio 3b: Refutación de Proposición mediante Contraejemplo',
      problemStatement:
        'Evalúa la proposición de la Guía Oficial #4: "Si la suma de las medidas de dos ángulos es 120°, entonces podemos asegurar que ambos ángulos son agudos". Determina su veracidad y justifica.',
      deductiveSteps: [
        '1. Análisis del enunciado: la hipótesis es α + β = 120°. La tesis condicional afirma que obligatoriamente α < 90° y β < 90°.',
        '2. Búsqueda de contraejemplo: elijamos un ángulo obtuso, por ejemplo α = 100° (ya que 90° < 100° < 180°).',
        '3. Calcular el segundo ángulo: β = 120° - 100° = 20° (cumple con ser positivo).',
        '4. Evaluar la tesis: α = 100° NO es agudo (es obtuso). La suma 100° + 20° = 120° cumple la hipótesis pero refuta la tesis.',
      ],
      finalResult: 'La proposición es FALSA. Contraejemplo demostrativo: 100° (obtuso) + 20° (agudo) = 120°.',
    },
    {
      title: 'Resolución del Ejercicio 10: Ángulos Consecutivos y Bisectrices',
      problemStatement:
        'Cuatro semirrectas OA, OB, OC y OD forman los ángulos consecutivos ∠AOB, ∠BOC y ∠COD. OA y OD son semirrectas opuestas (forman una recta de 180°) y ∠BOC mide 120°. Calcula la medida del ángulo formado por las bisectrices de ∠AOB y ∠COD.',
      deductiveSteps: [
        '1. Como OA y OD son semirrectas opuestas, la suma total es 180°: ∠AOB + ∠BOC + ∠COD = 180°.',
        '2. Sustituir ∠BOC = 120°: ∠AOB + 120° + ∠COD = 180° → ∠AOB + ∠COD = 60°.',
        '3. Las bisectrices dividen a cada ángulo por la mitad: la semirrecta bisectriz de ∠AOB forma un ángulo (∠AOB / 2) con OB; la bisectriz de ∠COD forma (∠COD / 2) con OC.',
        '4. El ángulo total entre ambas bisectrices es: (∠AOB / 2) + ∠BOC + (∠COD / 2).',
        '5. Factorizar: (∠AOB + ∠COD) / 2 + ∠BOC = (60° / 2) + 120° = 30° + 120° = 150°.',
      ],
      finalResult: 'El ángulo formado por las dos bisectrices mide exactamente 150°.',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: '**Creer que π/12 rad es igual a 12°:** Confundir el denominador con el valor en grados.',
      correction: 'π rad = 180°; por lo tanto, π / 12 = 180° / 12 = 15°, no 12°.',
    },
    {
      trap: '**No considerar la apertura total al sumar bisectrices:** Sumar solo las mitades e ignorar el ángulo central ∠BOC.',
      correction: 'Entre las dos bisectrices se encuentra el ángulo intermedio ∠BOC (120°), por lo que debe sumarse al cálculo total: 30° + 120° = 150°.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Cuánto vale 144° en radianes simplificados?', back: '144° = (4π / 5) radianes.' },
      { front: '¿Cuánto vale 7π/9 rad en grados sexagesimales?', back: '7(180°) / 9 = 7(20°) = 140°.' },
      { front: 'Si dos ángulos suman 120°, ¿es obligatorio que ambos sean agudos?', back: 'No, es falso; pueden medir 100° (obtuso) y 20° (agudo).' },
      { front: 'Si ∠AOB + ∠COD = 60° y están separados por ∠BOC = 120°, ¿cuánto mide el ángulo entre sus bisectrices?', back: 'Mide 150° (30° de las mitades + 120° centrales).' },
    ],
    cornellSynthesis: {
      cues: ['Conversión 180° = π', 'Análisis de proposiciones geométricas', 'Problemas con bisectrices', 'Ángulos en estructuras y logotipos'],
      notes: [
        'Las conversiones exigen simplificar factores primos sin convertir π a decimales.',
        'Las proposiciones universales se invalidan con un solo contraejemplo.',
        'Las bisectrices aportan simetría formal en el diseño de marcas.',
        'Los ángulos complementarios y suplementarios articulan la ortogonalidad visual.',
      ],
      summary: 'El análisis angular práctico ejercita el razonamiento deductivo del estudiante para tomar decisiones geométricas fundamentadas en branding, producto y diseño de espacios.',
    },
    conceptMapNodes: [
      'BANCO DE PROBLEMAS ANGULARES (GUÍA 4 EJERCICIOS UCAB)',
      '├── Conversiones Angulares',
      '│   ├── Grados a Radianes: 240° → 4π/3 | 144° → 4π/5 | 315° → 7π/4',
      '│   └── Radianes a Grados: 2π/5 → 72° | 7π/9 → 140° | π/12 → 15°',
      '├── Proposiciones y Lógica Visual',
      '│   ├── 91° es obtuso → VERDADERO (90° < 91° < 180°)',
      '│   └── Suma 120° implica agudos → FALSO (Contraejemplo: 100° y 20°)',
      '└── Aplicaciones en Diseño',
      '    ├── Isotipo minimalista: α = 2x+10°, β = 3x-5° complementarios → x = 17°',
      '    ├── Rampa de soporte: Suelo a 30° → Ángulo vertical restante = 60°',
      '    └── Bisectrices: Mitad de exteriores (30°) + Central (120°) = 150°',
    ].join('\\n'),
  },
  generatedQuestions: [],
};
`;

// Preguntas Calibradas para las 6 Guías
const questionsContent = `
// ============================================================================
// REACTIVOS CALIBRADOS DE EXAMEN PARA LAS GUÍAS DE MATEMÁTICA PARA EL DISEÑO
// ============================================================================
export const MAFE_GUIA1_QUESTIONS: Question[] = [
  {
    id: 'mafe-g1-01',
    subject: 'Diseño',
    topic: 'Geometría · Punto Abstracto vs. Punto en Diseño',
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía Teórica #1 UCAB · Notion',
    questionText: 'En el marco curricular de Diseño Integral UCAB, ¿cómo se diferencia el punto matemático del punto en el diseño?',
    options: buildOptions([
      'El punto matemático tiene color y textura fija, mientras que en diseño es una entidad matemática sin peso visual.',
      'En matemáticas el punto es una posición exacta invisible y adimensional; en diseño adquiere escala física, forma, color y actúa como un imán visual.',
      'Ambos son idénticos y solo pueden representarse con lápiz de grafito sobre papel milimetrado.',
      'El punto matemático tiene dimensión 1 y el punto de diseño carece de dimensión.',
    ]),
    correctOptionId: 'opt-b',
    explanation: '**Concepto Fundamental:** La Guía #1 enfatiza que en el mundo abstracto el punto es dimensión cero (coordenada exacta), mientras que en diseño debe materializarse con tamaño visible para estructurar composiciones y actuar como centro focal de atención.',
  },
  {
    id: 'mafe-g1-02',
    subject: 'Diseño',
    topic: 'Geometría Espacial · Rectas Alabeadas',
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía Teórica #1 UCAB · Notion',
    questionText: 'En una estructura tridimensional de producto o mobiliario, ¿cómo se definen estrictamente dos rectas alabeadas?',
    options: buildOptions([
      'Son rectas que pertenecen al mismo plano y forman un ángulo de 90° entre sí.',
      'Son rectas que no están en el mismo plano (no coplanares), no se intersecan y no son paralelas.',
      'Son rectas coplanares que poseen idéntica pendiente y ordenada al origen.',
      'Son rectas que atraviesan exactamente el mismo punto de concurrencia.',
    ]),
    correctOptionId: 'opt-b',
    explanation: '**Concepto Fundamental:** En el espacio tridimensional (3D), las rectas alabeadas no comparten un plano común, nunca se cortan y tampoco tienen la misma dirección ni son paralelas.',
  },
  {
    id: 'mafe-g1-03',
    subject: 'Diseño',
    topic: 'Geometría Plana · Rectas Concurrentes',
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía Teórica #1 UCAB · Notion',
    questionText: '¿Qué propiedad define a un conjunto de rectas concurrentes en una composición de diseño?',
    options: buildOptions([
      'Son rectas paralelas que se extienden con la misma pendiente.',
      'Son tres o más rectas distintas que se cortan todas exactamente en un único punto común llamado punto de concurrencia.',
      'Son rectas que nunca pertenecen al mismo plano.',
      'Son segmentos que unen los puntos medios de un cuadrilátero.',
    ]),
    correctOptionId: 'opt-b',
    explanation: '**Concepto Fundamental:** Las rectas concurrentes convergen o divergen desde un mismo punto focal, creando centros de tensión visual e irradiación geométrica.',
  },
];

export const MAFE_GUIA2_QUESTIONS: Question[] = [
  {
    id: 'mafe-g2-01',
    subject: 'Diseño',
    topic: 'Rectas y Retículas · Retícula en Diseño',
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía Teórica #2 UCAB · Notion',
    questionText: '¿Cuál es la función compositiva primordial de una retícula (grid) en diseño editorial y digital según la Guía #2?',
    options: buildOptions([
      'Generar efectos de distorsión óptica para sobrecargar la atención del usuario.',
      'Actuar como un armazón estructural ortogonal de rectas que modula el espacio para alinear elementos con orden, equilibrio y consistencia.',
      'Eliminar por completo el uso de márgenes y columnas en la maquetación.',
      'Evitar el uso de fórmulas matemáticas en proyectos de diseño.',
    ]),
    correctOptionId: 'opt-b',
    explanation: '**Concepto Fundamental:** La retícula es el esqueleto de referencia que asegura coherencia visual y orden jerárquico entre texto e imagen en soportes bidimensionales.',
  },
  {
    id: 'mafe-g2-02',
    subject: 'Diseño',
    topic: 'Rectas · Significado Perceptual de la Pendiente',
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía Teórica #2 UCAB · Notion',
    questionText: 'Si un diseñador traza una línea con pendiente m = 0 en su composición, ¿qué tipo de recta es y qué sensación perceptiva transmite?',
    options: buildOptions([
      'Es una recta vertical que transmite tensión y fuerza estructural.',
      'Es una recta horizontal (paralela al eje x) que transmite estabilidad, reposo y calma como el horizonte.',
      'Es una recta inclinada a 45° que sugiere avance y crecimiento dinámico.',
      'Es una curva sinusoidal con aceleración variable.',
    ]),
    correctOptionId: 'opt-b',
    explanation: '**Concepto Fundamental:** La pendiente nula (m = 0) define una recta horizontal sin inclinación, evocando calma, base sólida y reposo.',
  },
  {
    id: 'mafe-g2-03',
    subject: 'Diseño',
    topic: 'Rectas · Condición de Perpendicularidad',
    difficulty: 'Avanzado',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía Teórica #2 UCAB · Notion',
    questionText: 'Si una directriz gráfica tiene pendiente m1 = 3/4, ¿cuál debe ser la pendiente m2 de una segunda recta para que ambas sean estrictamente perpendiculares?',
    options: buildOptions([
      'm2 = 3/4',
      'm2 = -3/4',
      'm2 = -4/3',
      'm2 = 4/3',
    ]),
    correctOptionId: 'opt-c',
    explanation: '**Concepto Fundamental:** Dos rectas son perpendiculares si y solo si m1 · m2 = -1. Por lo tanto, m2 = -1 / (3/4) = -4/3.',
  },
];

export const MAFE_GUIA3_TEORIA_QUESTIONS: Question[] = [
  {
    id: 'mafe-g3t-01',
    subject: 'Diseño',
    topic: 'Sistemas Lineales · Clasificación Geométrica',
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía Teórica #3 UCAB · Notion',
    questionText: 'En el análisis de un sistema 2x2, ¿qué significado geométrico tiene un Sistema Incompatible (SI)?',
    options: buildOptions([
      'Las rectas se cortan en un punto único que representa una solución exacta de diseño.',
      'Las dos ecuaciones representan la misma recta coincidente con infinitas soluciones.',
      'Las dos rectas son paralelas y distintas, por lo que jamás se intersectan y el sistema no tiene solución.',
      'Las rectas forman una circunferencia en el origen.',
    ]),
    correctOptionId: 'opt-c',
    explanation: '**Concepto Fundamental:** Un sistema incompatible representa rectas paralelas con pendientes idénticas pero distinta ordenada al origen (m1 = m2, b1 ≠ b2), lo que implica cero puntos de contacto.',
  },
  {
    id: 'mafe-g3t-02',
    subject: 'Diseño',
    topic: 'Sistemas Lineales · Método de Reducción',
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía Teórica #3 UCAB · Notion',
    questionText: '¿Cuál es el principio operativo fundamental del método de reducción para resolver un sistema de ecuaciones lineales?',
    options: buildOptions([
      'Graficar las rectas en papel milimetrado y aproximar a ojo el punto de cruce.',
      'Multiplicar una o ambas ecuaciones por constantes para lograr coeficientes opuestos en una incógnita y cancelarla mediante suma algebraica.',
      'Despejar la misma incógnita en ambas ecuaciones e igualarlas.',
      'Reemplazar x por 0 para encontrar la ordenada en el origen únicamente.',
    ]),
    correctOptionId: 'opt-b',
    explanation: '**Concepto Fundamental:** El método de reducción (eliminación) busca que una variable tenga coeficientes opuestos (ej. +5y y -5y) para que se anule al sumar miembro a miembro ambas ecuaciones.',
  },
  {
    id: 'mafe-g3t-03',
    subject: 'Diseño',
    topic: 'Sistemas Lineales · Compatible Indeterminado',
    difficulty: 'Avanzado',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía Teórica #3 UCAB · Notion',
    questionText: 'Si al resolver un sistema lineal 2x2 por métodos algebraicos se cancelan todas las incógnitas y se obtiene la igualdad 0 = 0, ¿cómo se clasifica el sistema?',
    options: buildOptions([
      'Sistema Incompatible (no tiene solución).',
      'Sistema Compatible Determinado con solución en el origen (0, 0).',
      'Sistema Compatible Indeterminado (las rectas son coincidentes y existen infinitas soluciones).',
      'Error de sintaxis matemática.',
    ]),
    correctOptionId: 'opt-c',
    explanation: '**Concepto Fundamental:** La identidad 0 = 0 indica que ambas ecuaciones son equivalentes y describen la misma recta en el plano (rectas coincidentes con infinitos puntos comunes).',
  },
];

export const MAFE_GUIA3_EJERCICIOS_QUESTIONS: Question[] = [
  {
    id: 'mafe-g3e-01',
    subject: 'Diseño',
    topic: 'Sistemas Lineales · Modelado de Tintes (Problema #5)',
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía de Ejercicios #3 UCAB · Notion',
    questionText: 'Un diseñador mezcla tinte A ($5/ml) y tinte B ($8/ml) para obtener 30 ml de pintura por un costo total de $180. ¿Cuántos ml de cada tinte utilizó?',
    options: buildOptions([
      '15 ml de tinte A y 15 ml de tinte B.',
      '20 ml de tinte A y 10 ml de tinte B.',
      '10 ml de tinte A y 20 ml de tinte B.',
      '25 ml de tinte A y 5 ml de tinte B.',
    ]),
    correctOptionId: 'opt-b',
    explanation: '**Concepto Fundamental:** Planteando A + B = 30 y 5A + 8B = 180: sustituyendo A = 30 - B → 5(30 - B) + 8B = 180 → 150 + 3B = 180 → 3B = 30 → B = 10 ml y A = 20 ml. Costo: 20(5) + 10(8) = 100 + 80 = $180.',
  },
  {
    id: 'mafe-g3e-02',
    subject: 'Diseño',
    topic: 'Sistemas Lineales · Iluminación LED (Problema #6)',
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía de Ejercicios #3 UCAB · Notion',
    questionText: 'En un proyecto de luminotecnia se instalan 15 lámparas LED en total: de ambiente (10W c/u) y de acento (25W c/u). Si el consumo total es de 210W, ¿cuántas lámparas de cada tipo hay?',
    options: buildOptions([
      '11 lámparas de ambiente y 4 lámparas de acento.',
      '8 lámparas de ambiente y 7 lámparas de acento.',
      '10 lámparas de ambiente y 5 lámparas de acento.',
      '5 lámparas de ambiente y 10 lámparas de acento.',
    ]),
    correctOptionId: 'opt-a',
    explanation: '**Concepto Fundamental:** Sistema: x + y = 15 y 10x + 25y = 210. Multiplicando la primera por -10: -10x - 10y = -150. Sumando: 15y = 60 → y = 4 (acento) y x = 11 (ambiente). Potencia: 11(10) + 4(25) = 110 + 100 = 210W.',
  },
  {
    id: 'mafe-g3e-03',
    subject: 'Diseño',
    topic: 'Sistemas Lineales · Producción Editorial (Problema #7)',
    difficulty: 'Avanzado',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía de Ejercicios #3 UCAB · Notion',
    questionText: 'Una agencia publicitaria imprime 5.200 folletos con dos impresoras A (40 ppm) y B (60 ppm). Si funcionaron un total combinado de 100 minutos, ¿cuánto tiempo operó cada impresora?',
    options: buildOptions([
      '50 minutos cada una.',
      '40 minutos la impresora A y 60 minutos la impresora B.',
      '60 minutos la impresora A y 40 minutos la impresora B.',
      '30 minutos la impresora A y 70 minutos la impresora B.',
    ]),
    correctOptionId: 'opt-b',
    explanation: '**Concepto Fundamental:** Sistema: A + B = 100 y 40A + 60B = 5200. Multiplicando por -40: -40A - 40B = -4000. Sumando: 20B = 1200 → B = 60 minutos y A = 40 minutos. Páginas: 40(40) + 60(60) = 1600 + 3600 = 5200 páginas.',
  },
];

export const MAFE_GUIA4_TEORIA_QUESTIONS: Question[] = [
  {
    id: 'mafe-g4t-01',
    subject: 'Diseño',
    topic: 'Ángulos · Conversión Sexagesimal a Circular',
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía Teórica #4 UCAB · Notion',
    questionText: '¿A cuántos radianes equivale un ángulo de 240° según el factor de conversión canónico de la Guía #4?',
    options: buildOptions([
      '3π / 2 rad',
      '4π / 3 rad',
      '5π / 4 rad',
      '2π / 3 rad',
    ]),
    correctOptionId: 'opt-b',
    explanation: '**Concepto Fundamental:** Multiplicando por π / 180°: 240° × (π / 180°) = 24π / 18 = 4π / 3 radianes.',
  },
  {
    id: 'mafe-g4t-02',
    subject: 'Diseño',
    topic: 'Ángulos · Ángulos Adyacentes',
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía Teórica #4 UCAB · Notion',
    questionText: '¿Cuál es la relación matemática y geométrica estricta entre dos ángulos adyacentes?',
    options: buildOptions([
      'Son ángulos que siempre son opuestos por el vértice y miden 90°.',
      'Son ángulos consecutivos cuyos lados no comunes forman una recta; por lo tanto, siempre son suplementarios (suman 180°).',
      'Son ángulos complementarios que nunca comparten vértice.',
      'Son ángulos alternos internos de igual apertura.',
    ]),
    correctOptionId: 'opt-b',
    explanation: '**Concepto Fundamental:** "Todos los ángulos adyacentes son consecutivos, pero no todos los consecutivos son adyacentes". La adyacencia exige que los lados exteriores formen una línea recta continua de 180°.',
  },
  {
    id: 'mafe-g4t-03',
    subject: 'Diseño',
    topic: 'Ángulos · Paralelas Cortadas por Secante',
    difficulty: 'Avanzado',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía Teórica #4 UCAB · Notion',
    questionText: 'Si dos rectas paralelas l1 || l2 son cortadas por una recta secante, ¿cuáles de las siguientes parejas de ángulos son SIEMPRE iguales entre sí?',
    options: buildOptions([
      'Los ángulos colaterales internos.',
      'Los ángulos alternos internos y los correspondientes.',
      'Los ángulos adyacentes sobre la misma recta.',
      'Los ángulos conjugados externos.',
    ]),
    correctOptionId: 'opt-b',
    explanation: '**Concepto Fundamental:** En rectas paralelas cortadas por secante, los alternos internos, alternos externos, correspondientes y opuestos por el vértice son idénticos entre sí. Los colaterales o conjugados son suplementarios (suman 180°).',
  },
];

export const MAFE_GUIA4_EJERCICIOS_QUESTIONS: Question[] = [
  {
    id: 'mafe-g4e-01',
    subject: 'Diseño',
    topic: 'Ángulos · Análisis Lógico de Proposiciones (Ejercicio 3b)',
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía de Ejercicios #4 UCAB · Notion',
    questionText: 'Evalúa la proposición de la Guía de Ejercicios #4: "Si la suma de las medidas de dos ángulos es 120°, entonces podemos asegurar que ambos son agudos". ¿Es verdadera o falsa y por qué?',
    options: buildOptions([
      'Verdadera, porque 120° / 2 = 60° y 60° es agudo.',
      'Falsa, porque existe el contraejemplo de un ángulo de 100° (obtuso) y otro de 20° (agudo) que suman 120° sin que ambos sean agudos.',
      'Verdadera, porque todo ángulo menor a 180° es forzosamente agudo.',
      'Falsa, porque la suma de dos ángulos jamás puede superar 90°.',
    ]),
    correctOptionId: 'opt-b',
    explanation: '**Concepto Fundamental:** Una proposición universal se refuta con un solo contraejemplo: si α = 100° (obtuso) y β = 20° (agudo), su suma es 120° pero no ambos son agudos.',
  },
  {
    id: 'mafe-g4e-02',
    subject: 'Diseño',
    topic: 'Ángulos · Isotipo Minimalista Complementario',
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía de Ejercicios #4 UCAB · Notion',
    questionText: 'En un isotipo cuadrado, el ángulo superior α = 2x + 10° y el lateral β = 3x - 5° deben ser complementarios. ¿Cuánto vale x y cuánto mide cada ángulo?',
    options: buildOptions([
      'x = 17°; α = 44° y β = 46°',
      'x = 15°; α = 40° y β = 50°',
      'x = 20°; α = 50° y β = 40°',
      'x = 18°; α = 46° y β = 44°',
    ]),
    correctOptionId: 'opt-a',
    explanation: '**Concepto Fundamental:** Complementarios suman 90°: (2x + 10) + (3x - 5) = 90 → 5x + 5 = 90 → 5x = 85 → x = 17°. Ángulos: α = 2(17) + 10 = 44° y β = 3(17) - 5 = 46° (44° + 46° = 90°).',
  },
  {
    id: 'mafe-g4e-03',
    subject: 'Diseño',
    topic: 'Ángulos · Conversión de Radianes a Grados',
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Guía de Ejercicios #4 UCAB · Notion',
    questionText: '¿A cuántos grados sexagesimales equivale el ángulo circular de 7π / 9 radianes?',
    options: buildOptions([
      '120°',
      '140°',
      '150°',
      '135°',
    ]),
    correctOptionId: 'opt-b',
    explanation: '**Concepto Fundamental:** Multiplicando por 180° / π: (7π / 9) × (180° / π) = 7 × 20° = 140° sexagesimales.',
  },
];
`;

const integrationContent = `
// ============================================================================
// CONEXIÓN DE REACTIVOS CALIBRADOS A SUS RESPECTIVAS GUÍAS DECONSTRUIDAS
// ============================================================================
MAFE_MATH_GUIA1_GEOMETRIA_GUIDE.generatedQuestions = MAFE_GUIA1_QUESTIONS.map((q) => ({
  area: 'Diseño · Matemática Aplicada UCAB',
  tema: q.topic,
  tipo: 'opcion_multiple',
  pregunta: q.questionText,
  opciones: q.options.map((o) => o.text),
  correcta: q.options.find((o) => o.id === q.correctOptionId)?.text ?? q.options[0].text,
  justificacion: q.explanation,
}));

MAFE_MATH_GUIA2_RECTAS_GUIDE.generatedQuestions = MAFE_GUIA2_QUESTIONS.map((q) => ({
  area: 'Diseño · Matemática Aplicada UCAB',
  tema: q.topic,
  tipo: 'opcion_multiple',
  pregunta: q.questionText,
  opciones: q.options.map((o) => o.text),
  correcta: q.options.find((o) => o.id === q.correctOptionId)?.text ?? q.options[0].text,
  justificacion: q.explanation,
}));

MAFE_MATH_GUIA3_SISTEMAS_TEORIA_GUIDE.generatedQuestions = MAFE_GUIA3_TEORIA_QUESTIONS.map((q) => ({
  area: 'Diseño · Matemática Aplicada UCAB',
  tema: q.topic,
  tipo: 'opcion_multiple',
  pregunta: q.questionText,
  opciones: q.options.map((o) => o.text),
  correcta: q.options.find((o) => o.id === q.correctOptionId)?.text ?? q.options[0].text,
  justificacion: q.explanation,
}));

MAFE_MATH_GUIA3_SISTEMAS_EJERCICIOS_GUIDE.generatedQuestions = MAFE_GUIA3_EJERCICIOS_QUESTIONS.map((q) => ({
  area: 'Diseño · Matemática Aplicada UCAB',
  tema: q.topic,
  tipo: 'opcion_multiple',
  pregunta: q.questionText,
  opciones: q.options.map((o) => o.text),
  correcta: q.options.find((o) => o.id === q.correctOptionId)?.text ?? q.options[0].text,
  justificacion: q.explanation,
}));

MAFE_MATH_GUIA4_ANGULOS_TEORIA_GUIDE.generatedQuestions = MAFE_GUIA4_TEORIA_QUESTIONS.map((q) => ({
  area: 'Diseño · Matemática Aplicada UCAB',
  tema: q.topic,
  tipo: 'opcion_multiple',
  pregunta: q.questionText,
  opciones: q.options.map((o) => o.text),
  correcta: q.options.find((o) => o.id === q.correctOptionId)?.text ?? q.options[0].text,
  justificacion: q.explanation,
}));

MAFE_MATH_GUIA4_ANGULOS_EJERCICIOS_GUIDE.generatedQuestions = MAFE_GUIA4_EJERCICIOS_QUESTIONS.map((q) => ({
  area: 'Diseño · Matemática Aplicada UCAB',
  tema: q.topic,
  tipo: 'opcion_multiple',
  pregunta: q.questionText,
  opciones: q.options.map((o) => o.text),
  correcta: q.options.find((o) => o.id === q.correctOptionId)?.text ?? q.options[0].text,
  justificacion: q.explanation,
}));

// Catálogo consolidado de las 6 guías matemáticas deconstruidas
export const MAFE_ALL_MATH_DECONSTRUCTED_GUIDES: DeconstructedAcademicGuide[] = [
  MAFE_MATH_GUIA1_GEOMETRIA_GUIDE,
  MAFE_MATH_GUIA2_RECTAS_GUIDE,
  MAFE_MATH_GUIA3_SISTEMAS_TEORIA_GUIDE,
  MAFE_MATH_GUIA3_SISTEMAS_EJERCICIOS_GUIDE,
  MAFE_MATH_GUIA4_ANGULOS_TEORIA_GUIDE,
  MAFE_MATH_GUIA4_ANGULOS_EJERCICIOS_GUIDE,
];

// Banco integral de reactivos matemáticos calibrados
export const MAFE_ALL_MATH_QUESTIONS: Question[] = [
  ...MAFE_GUIA1_QUESTIONS,
  ...MAFE_GUIA2_QUESTIONS,
  ...MAFE_GUIA3_TEORIA_QUESTIONS,
  ...MAFE_GUIA3_EJERCICIOS_QUESTIONS,
  ...MAFE_GUIA4_TEORIA_QUESTIONS,
  ...MAFE_GUIA4_EJERCICIOS_QUESTIONS,
];
`;

const fullFile = fileHeader + codeContent + questionsContent + integrationContent;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, fullFile, 'utf8');
console.log('Archivo generado exitosamente en:', outputPath);
