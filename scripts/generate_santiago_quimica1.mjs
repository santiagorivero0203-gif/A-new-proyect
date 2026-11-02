/**
 * @file generate_santiago_quimica1.mjs
 * Genera src/data/guides/santiago_quimica1.ts con las 10 guías canónicas de Principios de Química I (Código 3401 UCV),
 * fórmulas KaTeX rigurosas, problemas resueltos paso a paso y 3 preguntas de examen reales por guía (30 preguntas de examen).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, '../src/data/guides/santiago_quimica1.ts');

const QUIMICA1_GUIDES = [
  // 1. PROPIEDADES DE LA MATERIA Y MEDIDAS
  {
    id: "santiago-qgi-propiedades-guide",
    evaluationEventId: "santiago-qgi-parcial-1",
    guideMetadata: {
      title: "Principios de Química I: Materia, Medidas, Cifras Significativas y Densidad",
      area: "Principios de Química I · Código 3401 (UCV Ciencias)",
      summary: "Clasificación sistemática de la materia, transformaciones físicas y químicas, análisis dimensional en cadena por factores unitarios, metrología de laboratorio y propagación estricta de cifras significativas."
    },
    phenomenonAndTheory: "La química estudia la materia mediante la observación de sus transformaciones y la medición cuantitativa de sus magnitudes físicas. La materia se presenta como sustancias puras (elementos formados por un solo tipo de átomo, o compuestos con proporciones fijas e invariables de elementos) o como mezclas (homogéneas o disoluciones con composición uniforme en una sola fase, y heterogéneas con fases físicamente distinguibles). En el laboratorio de la UCV, toda medición experimental conlleva una apreciación instrumental e incertidumbre. Para no inventar exactitud artificial, las cifras significativas dictan cuántos dígitos son físicamente válidos: en sumas y restas manda el menor número de decimales, mientras que en multiplicaciones y divisiones manda el menor número de cifras significativas totales.",
    glossary: [
      {
        term: "Sustancia Pura",
        symbolOrUnit: "\\text{Elementos y Compuestos}",
        definition: "Materia que tiene una composición química fija y propiedades características definidas e inalterables en cualquier muestra."
      },
      {
        term: "Mezcla Homogénea (Disolución)",
        symbolOrUnit: "\\text{Fase única uniforme}",
        definition: "Combinación física de dos o más sustancias que se distribuyen uniformemente a nivel molecular formando una sola fase visual."
      },
      {
        term: "Propiedad Intensiva",
        symbolOrUnit: "\\rho, T, P",
        definition: "Propiedad física que no depende de la cantidad de masa presente en la muestra, como la densidad, temperatura y punto de ebullición."
      },
      {
        term: "Cifras Significativas",
        symbolOrUnit: "\\text{Dígitos seguros } + 1 \\text{ estimado}",
        definition: "Todos los dígitos medidos con certeza por la escala de un instrumento analítico más un único dígito final estimado o incierto."
      }
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: "Densidad de una Sustancia",
          latex: "\\rho = \\frac{m}{V} \\quad [\\mathrm{g/cm^3} \\text{ o } \\mathrm{kg/m^3}]",
          application: "Relación intensiva entre la masa inercial y el volumen ocupado por el material a temperatura fija."
        },
        {
          name: "Propagación en Suma y Resta",
          latex: "\\text{Decimales}(A \\pm B) = \\min(\\text{Dec}(A), \\text{Dec}(B))",
          application: "El resultado no puede tener más decimales que la medida experimental menos precisa."
        },
        {
          name: "Propagación en Multiplicación y División",
          latex: "\\text{Cifras}(A \\cdot B) = \\min(\\text{CS}(A), \\text{CS}(B))",
          application: "El resultado final conserva el número de cifras significativas del factor más limitado."
        }
      ],
      mnemonicsAndPatterns: [
        "Paso 1: Identificar si la muestra es sustancia pura o mezcla verificando si se separa por métodos físicos.",
        "Paso 2: Registrar cada dato experimental con la apreciación del instrumento utilizado.",
        "Paso 3: Para conversiones, plantear factores unitarios fraccionarios cancelando unidades en diagonal.",
        "Paso 4: En sumas/restas, redondear al menor número de decimales entre los sumandos.",
        "Paso 5: En multiplicaciones/divisiones, redondear al menor número de cifras significativas totales.",
        "Regla 1: Los ceros entre dígitos distintos de cero siempre son significativos.",
        "Regla 2: Los ceros a la izquierda jamás son significativos; solo posicionan el punto decimal.",
        "Regla 3: Los factores exactos (ej. 1 kg = 1000 g) tienen infinitas cifras significativas."
      ]
    },
    stepByStepExamples: [
      {
        title: "Problema Canónico UCV (Parcial 1): Cálculo Metrológico de Densidad con Propagación de Cifras",
        problemStatement: "En el laboratorio de Química I de la UCV, un estudiante pesa una barra cilíndrica de metal en balanza analítica registrando 48.362 g. En una probeta graduada con agua hasta 25.0 mL, introduce la barra y el nivel sube a 31.2 mL. Calcule la densidad del metal en g/cm³ aplicando rigurosamente las reglas de cifras significativas, e identifique de qué metal se trata sabiendo que el Hierro tiene densidad 7.87 g/cm³ y el Níquel 8.90 g/cm³.",
        deductiveSteps: [
          "Paso 1: Volumen por desplazamiento: V = V_final - V_inicial = 31.2 mL - 25.0 mL = 6.2 mL.",
          "Paso 2: Cifras en la resta: 31.2 y 25.0 tienen 1 decimal cada uno. La resta 6.2 mL conserva 1 decimal y tiene únicamente 2 cifras significativas.",
          "Paso 3: Cálculo de densidad: d = m / V = 48.362 g / 6.2 mL = 7.800322... g/mL.",
          "Paso 4: Cifras en la división: la masa tiene 5 cifras (48.362) y el volumen tiene 2 cifras (6.2). El resultado debe redondearse a 2 cifras significativas: d = 7.8 g/mL = 7.8 g/cm³.",
          "Paso 5: Identificación: El valor 7.8 g/cm³ concuerda con el Hierro (7.87 g/cm³), con un error experimental menor al 1%."
        ],
        finalResult: "En la química experimental de la UCV, un cálculo con cifras significativas mal redondeadas anula la validez del reporte analítico."
      }
    ],
    commonErrorsAlerts: [
      {
        trap: "Trampa de ceros a la izquierda",
        correction: "Contar 0.0045 como 5 cifras; los ceros a la izquierda solo indican orden de magnitud, el número tiene 2 cifras significativas."
      },
      {
        trap: "Trampa de la resta con pérdida de precisión",
        correction: "Restar 15.42 - 15.40 = 0.02 y creer que tiene 4 cifras; el resultado solo tiene 1 cifra significativa."
      }
    ],
    studyTechniquesHub: {
      activeRecallFlashcards: [
        {
          front: "¿Cuál es la regla de cifras significativas para sumas y restas?",
          back: "El resultado debe redondearse para que coincida con el menor número de lugares decimales de los términos sumados o restados."
        },
        {
          front: "¿Cuál es la regla de cifras significativas para multiplicaciones y divisiones?",
          back: "El resultado debe tener el mismo número de cifras significativas que la medida original con menor número de cifras significativas."
        }
      ],
      cornellSynthesis: {
        cues: ["Propiedad Intensiva", "Regla de Decimales", "Regla de Cifras Totales", "Apreciación"],
        notes: [
          "1. Densidad: magnitud intensiva d = m/V.",
          "2. Sumas/Restas: conservan el menor número de decimales.",
          "3. Multiplicaciones/Divisiones: conservan el menor número de cifras totales.",
          "4. 1 mL = 1 cm³ exactamente."
        ],
        summary: "Metrología química, cifras significativas y clasificación fundamental de la materia en el laboratorio universitario."
      },
      conceptMapNodes: "Medidas y Cifras\n  ├── Materia: Sustancias puras vs Mezclas (homogéneas / heterogéneas)\n  ├── Regla Suma/Resta: Menor número de decimales\n  └── Regla Mult/Div: Menor número de cifras significativas totales"
    },
    generatedQuestions: [
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Cifras Significativas y Densidad",
        tipo: "opcion_multiple",
        pregunta: "Un estudiante de Química I pesa un sólido registrando $25.40\\,\\text{g}$ y mide su volumen en probeta obteniendo un cambio de $10.0\\,\\text{mL}$ a $13.2\\,\\text{mL}$. ¿Cómo debe reportar la densidad aplicando las reglas de cifras significativas?",
        opciones: [
          "$7.9\\,\\text{g/mL}$ (2 cifras significativas)",
          "$7.9375\\,\\text{g/mL}$ (5 cifras significativas)",
          "$7.94\\,\\text{g/mL}$ (3 cifras significativas)",
          "$8\\,\\text{g/mL}$ (1 cifra significativa)"
        ],
        correcta: "$7.9\\,\\text{g/mL}$ (2 cifras significativas)",
        justificacion: "**Concepto Fundamental:** Propagación de Cifras en Resta y División.\n\n**Resolución:** El volumen es $\\Delta V = 13.2 - 10.0 = 3.2\\,\\text{mL}$, con 1 decimal y por tanto solo 2 cifras significativas. En la división $\\rho = \\frac{25.40}{3.2}$, la masa tiene 4 cifras pero el volumen limita a 2 cifras significativas. Por tanto, $7.9375$ se redondea estrictamente a $7.9\\,\\text{g/mL}$."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Cifras Significativas en Operaciones Combinadas",
        tipo: "opcion_multiple",
        pregunta: "¿Cuántas cifras significativas tiene el resultado de la operación combinada $\\frac{12.45 - 12.41}{3.200}$?",
        opciones: [
          "Exactamente 1 cifra significativa",
          "Exactamente 2 cifras significativas",
          "Exactamente 4 cifras significativas",
          "Infinitas cifras por ser factores teóricos"
        ],
        correcta: "Exactamente 1 cifra significativa",
        justificacion: "**Concepto Fundamental:** Pérdida de Precisión en Restas de Magnitudes Cercanas.\n\n**Resolución:** En el numerador: $12.45 - 12.41 = 0.04$ (conserva 2 decimales, pero el valor numérico $0.04$ tiene una sola cifra significativa: el 4). Al dividir $0.04$ (1 cifra) entre $3.200$ (4 cifras), el resultado final $0.0125$ debe redondearse a una sola cifra: $0.01$."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Clasificación de Propiedades",
        tipo: "opcion_multiple",
        pregunta: "¿Cuál de las siguientes magnitudes físicas de una muestra líquida es una propiedad intensiva?",
        opciones: [
          "La densidad a $20^\\circ\\text{C}$",
          "La masa total de la muestra",
          "El volumen en litros que ocupa",
          "La capacidad calorífica total en Joules/K"
        ],
        correcta: "La densidad a $20^\\circ\\text{C}$",
        justificacion: "**Concepto Fundamental:** Propiedades Intensivas vs Extensivas.\n\n**Resolución:** Las propiedades intensivas no dependen de la cantidad de materia de la muestra. La densidad $\\rho = m/V$, el punto de ebullición y la temperatura son intensivas; la masa y el volumen son extensivas porque se duplican si se duplica la cantidad de sustancia."
      }
    ],
    multimediaResources: null,
    researchPrompts: null,
    researchPrompt: null
  },

  // 2. LEYES PONDERALES, MODELOS ATÓMICOS E ISÓTOPOS
  {
    id: "santiago-qgi-atomos-guide",
    evaluationEventId: "santiago-qgi-parcial-1",
    guideMetadata: {
      title: "Principios de Química I: Leyes Ponderales, Modelos Atómicos e Isótopos",
      area: "Principios de Química I · Código 3401 (UCV Ciencias)",
      summary: "Leyes clásicas de la química (Lavoisier, Proust, Dalton), modelos atómicos históricos, número atómico Z, número másico A y cálculo de masa atómica promedio por abundancia isotópica."
    },
    phenomenonAndTheory: "La química moderna descansa sobre las leyes ponderales de combinación química. Lavoisier demostró la conservación de la masa en sistemas cerrados; Proust formuló la Ley de las Proporciones Definidas (un compuesto siempre contiene exactamente la misma proporción en masa de sus elementos); y Dalton formuló la Ley de las Proporciones Múltiples (cuando dos elementos forman más de un compuesto, las masas de uno que se combinan con una masa fija del otro guardan relaciones de números enteros sencillos como 1:2, 1:3). El átomo contiene un núcleo denso con protones (Z) y neutrones (N), rodeado por electrones. Los isótopos son átomos del mismo elemento con idéntico Z pero distinto número másico A; la masa atómica que aparece en la tabla periódica es el promedio ponderado de las masas isotópicas multiplicado por sus abundancias naturales relativas.",
    glossary: [
      {
        term: "Número Atómico (Z)",
        symbolOrUnit: "Z = p^+",
        definition: "Número de protones en el núcleo atómico que define la identidad química irrevocable de cada elemento."
      },
      {
        term: "Número Másico (A)",
        symbolOrUnit: "A = Z + N",
        definition: "Suma total de nucleones (protones más neutrones) presentes en el núcleo del átomo."
      },
      {
        term: "Isótopos",
        symbolOrUnit: "^{A}_{Z}\\text{X}",
        definition: "Átomos con el mismo número de protones pero diferente cantidad de neutrones, teniendo idéntico comportamiento químico pero diferente masa física."
      }
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: "Masa Atómica Promedio Ponderada",
          latex: "\\bar{A} = \\sum_{i=1}^n x_i \\cdot m_i = x_1 m_1 + x_2 m_2 + \\dots",
          application: "Calcular el peso atómico de la tabla periódica sumando el producto de cada masa isotópica por su fracción molar de abundancia."
        },
        {
          name: "Ley de Proporciones Múltiples de Dalton",
          latex: "\\frac{m_B(\\text{Compuesto II})}{m_B(\\text{Compuesto I})} = \\frac{p}{q} \\in \\mathbb{Q}^+",
          application: "Comprobar que las masas de un elemento que se combinan con masa constante de otro están en relación entera pequeña."
        }
      ],
      mnemonicsAndPatterns: [
        "Paso 1: Convertir porcentajes de abundancia a fracciones decimales dividiendo entre 100.",
        "Paso 2: Multiplicar cada masa isotópica exacta por su respectiva fracción de abundancia.",
        "Paso 3: Sumar los productos ponderados y redondear según cifras significativas.",
        "Paso 4: Para proporciones múltiples, fijar 1 gramo del primer elemento en ambos compuestos y dividir las masas del segundo elemento."
      ]
    },
    stepByStepExamples: [
      {
        title: "Problema Canónico UCV (Parcial 1): Cálculo de Masa Atómica Promedio del Cloro",
        problemStatement: "El Cloro natural está formado por dos isótopos estables: Cl-35 con masa 34.96885 u y abundancia natural del 75.77%, y Cl-37 con masa 36.96590 u y abundancia del 24.23%. Calcule la masa atómica promedio del Cloro que debe reportarse en la tabla periódica con 4 cifras significativas.",
        deductiveSteps: [
          "Paso 1: Fracciones decimales: f(Cl-35) = 75.77 / 100 = 0.7577; f(Cl-37) = 24.23 / 100 = 0.2423.",
          "Paso 2: Aporte de Cl-35: 0.7577 * 34.96885 u = 26.49589 u.",
          "Paso 3: Aporte de Cl-37: 0.2423 * 36.96590 u = 8.95683 u.",
          "Paso 4: Suma total: Masa = 26.49589 u + 8.95683 u = 35.4527 u.",
          "Paso 5: Redondeo: Redondeando a 4 cifras significativas según las abundancias: 35.45 u."
        ],
        finalResult: "El valor ponderado 35.45 u coincide exactamente con el valor canónico del Cloro en la tabla periódica oficial de la UCV."
      }
    ],
    commonErrorsAlerts: [
      {
        trap: "Trampa del promedio aritmético simple",
        correction: "Sumar (35 + 37)/2 = 36 u ignorando que el isótopo 35 es tres veces más abundante que el 37."
      }
    ],
    studyTechniquesHub: {
      activeRecallFlashcards: [
        {
          front: "¿Qué enuncia la Ley de las Proporciones Múltiples de Dalton?",
          back: "Cuando dos elementos se combinan para formar más de un compuesto, las masas de uno de ellos que se unen con una masa fija del otro guardan una relación de números enteros sencillos."
        },
        {
          front: "¿Cómo se calcula la masa atómica promedio de un elemento con varios isótopos?",
          back: "Multiplicando la masa exacta de cada isótopo por su abundancia fraccionaria decimal y sumando todos los términos."
        }
      ],
      cornellSynthesis: {
        cues: ["Leyes Ponderales", "Proporciones Definidas", "Proporciones Múltiples", "Isótopos"],
        notes: [
          "1. Lavoisier: Masa reactivos = Masa productos.",
          "2. Proust: Proporción fija de masas en un compuesto.",
          "3. Dalton: Relaciones de enteros sencillos en múltiples compuestos.",
          "4. Masa atómica = Promedio ponderado de isótopos."
        ],
        summary: "Evolución histórica de las leyes de combinación química y estructura atómica fundamental."
      },
      conceptMapNodes: "Leyes Ponderales e Isótopos\n  ├── Leyes: Lavoisier (Masa) | Proust (Definidas) | Dalton (Múltiples)\n  └── Isótopos: Mismo Z, distinto A -> Masa = Promedio ponderado"
    },
    generatedQuestions: [
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Masa Atómica Ponderada de Isótopos",
        tipo: "opcion_multiple",
        pregunta: "El elemento Galio ($Z = 31$) posee dos isótopos estables: $^{69}\\text{Ga}$ ($68.925\\,\\text{u}$, $60.11\\%$) y $^{71}\\text{Ga}$ ($70.925\\,\\text{u}$, $39.89\\%$) . ¿Cuál es su masa atómica promedio?",
        opciones: [
          "$69.72\\,\\text{u}$",
          "$69.93\\,\\text{u}$ (promedio aritmético simple)",
          "$68.93\\,\\text{u}$",
          "$70.50\\,\\text{u}$"
        ],
        correcta: "$69.72\\,\\text{u}$",
        justificacion: "**Concepto Fundamental:** Promedio Ponderado de Isótopos.\n\n**Resolución:** $\\bar{A} = (0.6011)(68.925) + (0.3989)(70.925) = 41.4308 + 28.2920 = 69.7228\\,\\text{u} \\approx 69.72\\,\\text{u}$."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Ley de Proporciones Múltiples",
        tipo: "opcion_multiple",
        pregunta: "El nitrógeno forma dos óxidos: en el primero $14.0\\,\\text{g}$ de N se unen a $16.0\\,\\text{g}$ de O; en el segundo $14.0\\,\\text{g}$ de N se unen a $32.0\\,\\text{g}$ de O. ¿Qué ley fundamental comprueba este hecho?",
        opciones: [
          "La Ley de las Proporciones Múltiples de Dalton, porque la relación de masas de oxígeno es $16:32 = 1:2$",
          "La Ley de la Conservación de la Masa de Lavoisier exclusivamente",
          "La Ley de los Gases Ideales de Charles",
          "El Principio de Exclusión de Pauli"
        ],
        correcta: "La Ley de las Proporciones Múltiples de Dalton, porque la relación de masas de oxígeno es $16:32 = 1:2$",
        justificacion: "**Concepto Fundamental:** Ley de las Proporciones Múltiples.\n\n**Resolución:** Al mantener fija la masa de nitrógeno ($14.0\\,\\text{g}$), las masas de oxígeno que se combinan ($16.0\\,\\text{g}$ en $\\text{NO}$ y $32.0\\,\\text{g}$ en $\\text{NO}_2$) están en relación exacta de números enteros pequeños: $32.0 / 16.0 = 2/1 = 1:2$."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Partículas Subatómicas en Iones",
        tipo: "opcion_multiple",
        pregunta: "Para el ion sulfuro $^{34}_{16}\\text{S}^{2-}$, ¿cuál es el número exacto de protones, neutrones y electrones respectivamente?",
        opciones: [
          "16 protones, 18 neutrones y 18 electrones",
          "16 protones, 16 neutrones y 18 electrones",
          "18 protones, 16 neutrones y 16 electrones",
          "16 protones, 34 neutrones y 18 electrones"
        ],
        correcta: "16 protones, 18 neutrones y 18 electrones",
        justificacion: "**Concepto Fundamental:** Número Atómico, Número Másico y Carga Iónica.\n\n**Resolución:** $Z = 16$ indica 16 protones. El número de neutrones es $A - Z = 34 - 16 = 18$ neutrones. La carga $2-$ indica que ha ganado 2 electrones sobre el átomo neutro: $16 + 2 = 18$ electrones."
      }
    ],
    multimediaResources: null,
    researchPrompts: null,
    researchPrompt: null
  },

  // 3. MECÁNICA CUÁNTICA, NÚMEROS CUÁNTICOS Y CONFIGURACIÓN ELECTRÓNICA
  {
    id: "santiago-qgi-cuantica-guide",
    evaluationEventId: "santiago-qgi-parcial-1",
    guideMetadata: {
      title: "Principios de Química I: Mecánica Cuántica, Números Cuánticos y Configuraciones Electrónicas",
      area: "Principios de Química I · Código 3401 (UCV Ciencias)",
      summary: "Cuantización energética de Planck, modelo atómico de Bohr, números cuánticos (n, l, ml, ms), principios de Aufbau, exclusión de Pauli, regla de Hund y anomalías de estabilidad del Cr y Cu."
    },
    phenomenonAndTheory: "La física clásica falló al explicar por qué los electrones acelerados no colapsaban en el núcleo. Planck y Einstein demostraron que la radiación electromagnética se intercambia en paquetes discretos de energía llamados fotones (E = h*nu). La mecánica ondulatoria de Schrödinger describe los electrones no como partículas con órbitas fijas, sino como funciones de onda de probabilidad en orbitales atómicos. Cuatro números cuánticos especifican unívocamente el estado de cada electrón: n (nivel principal), l (forma del subnivel: s, p, d, f), ml (orientación espacial) y ms (espín intrínseco). Para construir la configuración electrónica en el estado fundamental se aplican tres reglas inviolables: el principio de Aufbau (menor energía primero), el principio de exclusión de Pauli (no puede haber dos electrones con los 4 números cuánticos idénticos) y la regla de Hund (máxima multiplicidad de espín en orbitales degenerados). Además, existen anomalías termodinámicas de subcapa semillena o llena en el Cromo ([Ar] 4s1 3d5) y Cobre ([Ar] 4s1 3d10).",
    glossary: [
      {
        term: "Número Cuántico Principal (n)",
        symbolOrUnit: "n = 1, 2, 3, \\dots",
        definition: "Determina el nivel energético principal y el tamaño o extensión promedio de la nube electrónica."
      },
      {
        term: "Número Cuántico Azimutal (l)",
        symbolOrUnit: "l = 0, 1, \\dots, (n-1)",
        definition: "Define la forma geométrica del orbital atómico: l = 0 (s, esférico), l = 1 (p, bilobular), l = 2 (d), l = 3 (f)."
      },
      {
        term: "Número Cuántico Magnético (ml)",
        symbolOrUnit: "m_l = -l, \\dots, 0, \\dots, +l",
        definition: "Determina la orientación espacial del orbital bajo la influencia de un campo magnético exterior."
      },
      {
        term: "Número Cuántico de Espín (ms)",
        symbolOrUnit: "m_s = \\pm \\frac{1}{2}",
        definition: "Momento angular intrínseco de giro del electrón sobre su propio eje."
      }
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: "Energía del Fotón (Planck-Einstein)",
          latex: "E = h\\nu = \\frac{hc}{\\lambda}, \\quad h = 6.626 \\times 10^{-34}\\,\\mathrm{J\\cdot s}",
          application: "Calcular la energía emitida o absorbida en transiciones electrónicas cuánticas."
        },
        {
          name: "Regla de Energía de Madelung",
          latex: "(n + l) \\text{ determina el orden de llenado}",
          application: "Si dos subniveles tienen igual suma (n+l), se llena primero el de menor n (ej. 4s se llena antes de 3d)."
        },
        {
          name: "Anomalías Cuánticas Canónicas",
          latex: "\\mathrm{Cr}: [\\mathrm{Ar}] 4s^1 3d^5, \\quad \\mathrm{Cu}: [\\mathrm{Ar}] 4s^1 3d^{10}",
          application: "Promoción de un electrón del orbital 4s a la subcapa 3d para maximizar la energía de canje cuántica."
        }
      ],
      mnemonicsAndPatterns: [
        "Paso 1: Determinar el número total de electrones a ubicar a partir del número atómico Z (ajustando por carga neta si es un ion).",
        "Paso 2: Seguir la regla de las diagonales (1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s...).",
        "Paso 3: Verificar si el elemento es Cromo (Z=24) o Cobre (Z=29) para aplicar la anomalía [Ar] 4s1 3d5 o [Ar] 4s1 3d10.",
        "Paso 4: En cationes de metales de transición, retirar primero los electrones del nivel más externo n=4 (los electrones 4s) antes de tocar los 3d.",
        "Paso 5: Dibujar las cajas de orbitales aplicando la regla de Hund (ubicar un electrón con espín paralelo en cada caja antes de aparear)."
      ]
    },
    stepByStepExamples: [
      {
        title: "Problema Canónico UCV (Parcial 1): Configuración Electrónica del Cobre y Números Cuánticos",
        problemStatement: "Escriba la configuración electrónica en el estado fundamental para el átomo neutro de Cobre (Z = 29) y para su catión cuproso Cu+. Indique el conjunto completo de números cuánticos (n, l, ml, ms) para el electrón más externo del átomo neutro y señale si es paramagnético o diamagnético.",
        deductiveSteps: [
          "Paso 1: Configuración estándar de Aufbau: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁹.",
          "Paso 2: Corrección por anomalía cuántica: Una subcapa d totalmente llena (d10) confiere una estabilidad energética superior. La configuración real es: [Ar] 4s¹ 3d¹⁰.",
          "Paso 3: Electrón más externo: El nivel principal más alejado es n = 4, que corresponde al orbital 4s. Contiene un único electrón solitario.",
          "Paso 4: Números cuánticos del electrón 4s: n = 4; l = 0 (subnivel s); ml = 0 (única orientación para l=0); ms = +1/2. Conjunto: (4, 0, 0, +1/2).",
          "Paso 5: Ionización Cu+: Al formar cationes, los metales de transición pierden primero los electrones de la capa más externa (nivel n = 4). Por tanto, pierde el electrón 4s: Cu+: [Ar] 3d¹⁰.",
          "Paso 6: Magnetismo: El átomo neutro de Cu tiene 1 electrón desapareado en 4s, por lo que es PARAMAGNÉTICO. El ion Cu+ tiene todos sus orbitales 3d llenos con pares apareados, por lo que es DIAMAGNÉTICO."
        ],
        finalResult: "Las anomalías cuánticas demuestran que la energía total del sistema prevalece sobre el ordenamiento mnemotécnico simple."
      }
    ],
    commonErrorsAlerts: [
      {
        trap: "Trampa de ionización en metales de transición",
        correction: "Quitar electrones del subnivel 3d en lugar de los 4s al formar iones como Fe²+ o Cu+; siempre se vacía primero el nivel n más alto (4s)."
      },
      {
        trap: "Trampa de números cuánticos permitidos",
        correction: "Aceptar combinaciones inválidas como n=2, l=2 (l solo llega hasta n-1=1) o ml=+2 cuando l=1 (ml solo va de -l a +l)."
      }
    ],
    studyTechniquesHub: {
      activeRecallFlashcards: [
        {
          front: "¿Por qué el Cobre (Z = 29) presenta la configuración [Ar] 4s¹ 3d¹⁰ en lugar de [Ar] 4s² 3d⁹?",
          back: "Porque una subcapa 3d completamente llena (10 electrones) maximiza la simetría esférica y la energía de canje cuántica, reduciendo la energía total del átomo."
        },
        {
          front: "¿Cuál es el orden de remoción de electrones al ionizar un metal de transición?",
          back: "Se remueven primero los electrones del orbital de mayor número cuántico principal n (el orbital 4s) antes de remover electrones de la subcapa interna 3d."
        }
      ],
      cornellSynthesis: {
        cues: ["Números Cuánticos", "Principio de Pauli", "Regla de Hund", "Anomalías Cr y Cu"],
        notes: [
          "1. Cuatro números cuánticos: n (nivel), l (forma), ml (orientación), ms (espín).",
          "2. Pauli: Máximo 2 electrones por orbital con espines opuestos.",
          "3. Hund: Desaparear al máximo en subniveles degenerados.",
          "4. Cr ([Ar] 4s¹ 3d⁵) y Cu ([Ar] 4s¹ 3d¹⁰) son anomalías estables."
        ],
        summary: "Estructura cuántica de la nube electrónica, orbitales atómicos y reglas canónicas de configuración electrónica en la UCV."
      },
      conceptMapNodes: "Mecánica Cuántica y Electrones\n  ├── Números Cuánticos: n, l (0 a n-1), ml (-l a +l), ms (+- 1/2)\n  ├── Reglas: Aufbau (energía) | Pauli (no 4 iguales) | Hund (espín paralelo)\n  └── Excepciones: Cr ([Ar] 4s¹ 3d⁵) y Cu ([Ar] 4s¹ 3d¹⁰)"
    },
    generatedQuestions: [
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Anomalía Cuántica del Cobre",
        tipo: "opcion_multiple",
        pregunta: "¿Cuál es la configuración electrónica en el estado fundamental para el átomo de Cobre ($Z = 29$) y cuántos electrones desapareados posee?",
        opciones: [
          "$[\\text{Ar}] 4s^1 3d^{10}$, con 1 electrón desapareado",
          "$[\\text{Ar}] 4s^2 3d^9$, con 1 electrón desapareado",
          "$[\\text{Ar}] 4s^2 3d^9$, con 0 electrones desapareados",
          "$[\\text{Ar}] 4s^0 3d^{11}$, con 2 electrones desapareados"
        ],
        correcta: "$[\\text{Ar}] 4s^1 3d^{10}$, con 1 electrón desapareado",
        justificacion: "**Concepto Fundamental:** Anomalía de Aufbau por Estabilidad Termodinámica.\n\n**Resolución:** El cobre promociona un electrón del subnivel 4s para completar la subcapa 3d10 (completamente llena). Su configuración real es $[\\text{Ar}] 4s^1 3d^{10}$. El orbital 4s contiene 1 electrón solitario, por lo que tiene exactamente 1 electrón desapareado (paramagnético)."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Conjuntos Válidos de Números Cuánticos",
        tipo: "opcion_multiple",
        pregunta: "¿Cuál de los siguientes conjuntos de números cuánticos $(n, l, m_l, m_s)$ es FÍSICAMENTE IMPOSIBLE para un electrón en un átomo?",
        opciones: [
          "$n = 2, l = 2, m_l = 0, m_s = +\\frac{1}{2}$",
          "$n = 3, l = 1, m_l = -1, m_s = -\\frac{1}{2}$",
          "$n = 4, l = 0, m_l = 0, m_s = +\\frac{1}{2}$",
          "$n = 3, l = 2, m_l = +2, m_s = -\\frac{1}{2}$"
        ],
        correcta: "$n = 2, l = 2, m_l = 0, m_s = +\\frac{1}{2}$",
        justificacion: "**Concepto Fundamental:** Restricciones Cuánticas en los Orbitales.\n\n**Resolución:** El número cuántico azimutal $l$ solo puede tomar valores enteros desde $0$ hasta $n - 1$. Si $n = 2$, los valores permitidos para $l$ son únicamente $0$ y $1$. El valor $l = 2$ es físicamente imposible para el nivel principal $2$."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Ionización de Metales de Transición",
        tipo: "opcion_multiple",
        pregunta: "¿Cuál es la configuración electrónica en el estado fundamental para el ion Hierro(II) $\\text{Fe}^{2+}$ ($Z = 26$) y cuántos electrones desapareados contiene?",
        opciones: [
          "$[\\text{Ar}] 3d^6$, con 4 electrones desapareados",
          "$[\\text{Ar}] 4s^2 3d^4$, con 4 electrones desapareados",
          "$[\\text{Ar}] 3d^6$, con 0 electrones desapareados",
          "$[\\text{Ar}] 4s^1 3d^5$, con 6 electrones desapareados"
        ],
        correcta: "$[\\text{Ar}] 3d^6$, con 4 electrones desapareados",
        justificacion: "**Concepto Fundamental:** Pérdida Preferencial de Electrones 4s en Cationes.\n\n**Resolución:** El átomo neutro de Hierro tiene configuración $[\\text{Ar}] 4s^2 3d^6$. Al ionizarse a $\\text{Fe}^{2+}$, se pierden primero los dos electrones del orbital más externo ($4s$), quedando $[\\text{Ar}] 3d^6$. En los 5 orbitales $d$, al aplicar la regla de Hund hay 1 par apareado y 4 electrones con espines desapareados paralelos."
      }
    ],
    multimediaResources: null,
    researchPrompts: null,
    researchPrompt: null
  },

  // 4. TABLA PERIÓDICA, CARGA NUCLEAR EFECTIVA Y TENDENCIAS
  {
    id: "santiago-qgi-tabla-guide",
    evaluationEventId: "santiago-qgi-parcial-1",
    guideMetadata: {
      title: "Principios de Química I: Tabla Periódica, Carga Nuclear Efectiva y Tendencias",
      area: "Principios de Química I · Código 3401 (UCV Ciencias)",
      summary: "Ley periódica moderna, carga nuclear efectiva Z_ef y reglas de Slater, variación de radios atómicos e iónicos en series isoelectrónicas, energías de ionización sucesivas y afinidad electrónica."
    },
    phenomenonAndTheory: "La tabla periódica moderna organiza los elementos químicos en orden creciente de su número atómico Z, agrupando en columnas verticales (grupos o familias) aquellos con idéntica configuración electrónica de valencia y propiedades análogas. Las variaciones periódicas de tamaño y reactividad no son arbitrarias; responden al balance entre la atracción nuclear de los protones y la repulsión de los electrones internos, cuantificado por la Carga Nuclear Efectiva (Z_ef = Z - S), donde S es la constante de apantallamiento de Slater. A lo largo de un período (de izquierda a derecha), Z aumenta pero los electrones se añaden a la misma capa, por lo que el apantallamiento es imperfecto; Z_ef aumenta drásticamente y contrae la nube electrónica hacia el núcleo. Por ello, el radio atómico disminuye de izquierda a derecha y la primera energía de ionización aumenta sostenidamente, con caídas en subniveles llenos o semillenos.",
    glossary: [
      {
        term: "Carga Nuclear Efectiva (Z_ef)",
        symbolOrUnit: "Z_{\\text{ef}} = Z - S",
        definition: "Carga neta positiva del núcleo que experimenta realmente un electrón de valencia tras descontar el apantallamiento de electrones internos."
      },
      {
        term: "Radio Atómico",
        symbolOrUnit: "r_{\\text{at}} \\quad [\\mathrm{pm} \\text{ o } \\text{\\AA}]",
        definition: "Mitad de la distancia internuclear entre dos átomos idénticos unidos por un enlace covalente simple."
      },
      {
        term: "Serie Isoelectrónica",
        symbolOrUnit: "\\text{Iones con igual número de } e^-",
        definition: "Conjunto de átomos o iones que poseen exactamente la misma configuración y número de electrones (ej. N³⁻, O²⁻, F⁻, Na⁺, Mg²⁺)."
      },
      {
        term: "Energía de Ionización (EI)",
        symbolOrUnit: "\\mathrm{X}(g) \\to \\mathrm{X}^+(g) + e^-",
        definition: "Energía mínima requerida para arrancar el electrón más débilmente unido a un átomo gaseoso en su estado fundamental."
      }
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: "Ecuación de Carga Nuclear Efectiva",
          latex: "Z_{\\text{ef}} = Z - S",
          application: "Calcular la fuerza de atracción efectiva sobre la capa de valencia según las reglas empíricas de Slater."
        },
        {
          name: "Tendencia del Radio en Series Isoelectrónicas",
          latex: "r \\propto \\frac{1}{Z} \\quad (\\text{a electrones constantes})",
          application: "A mayor número de protones Z, mayor contracción nuclear y menor radio iónico en especies isoelectrónicas."
        }
      ],
      mnemonicsAndPatterns: [
        "Paso 1: Identificar la posición en la tabla (período y grupo) para los elementos a comparar.",
        "Paso 2: Al comparar radios atómicos neutros: aumenta hacia abajo en un grupo (más capas n) y aumenta hacia la izquierda en un período (menor Z_ef).",
        "Paso 3: Para series isoelectrónicas: contar los protones Z; el que tenga mayor Z siempre es el más pequeño.",
        "Paso 4: Para aniones vs átomo neutro: el anión siempre es mayor que el átomo neutro (mayor repulsión electrónica).",
        "Paso 5: Para cationes vs átomo neutro: el catión siempre es mucho menor (menor repulsión y pérdida de capa exterior)."
      ]
    },
    stepByStepExamples: [
      {
        title: "Problema Canónico UCV (Parcial 1): Comparación Rigurosa de Radios en Serie Isoelectrónica",
        problemStatement: "Ordene de menor a mayor radio iónico las siguientes especies isoelectrónicas con 10 electrones: O²⁻ (Z=8), F⁻ (Z=9), Na⁺ (Z=11) y Mg²⁺ (Z=12). Justifique formalmente su respuesta en términos de carga nuclear efectiva.",
        deductiveSteps: [
          "Paso 1: Todas las especies tienen exactamente 10 electrones con la configuración del Neón: 1s² 2s² 2p⁶.",
          "Paso 2: Al tener la misma cantidad de electrones en el mismo nivel n = 2, la constante de apantallamiento S es prácticamente constante entre todos los iones.",
          "Paso 3: Evaluamos el número de protones en el núcleo atómico: O²⁻ tiene Z = 8; F⁻ tiene Z = 9; Na⁺ tiene Z = 11; Mg²⁺ tiene Z = 12.",
          "Paso 4: Evaluamos la carga nuclear efectiva Z_ef = Z - S: a mayor Z, mayor Z_ef. El Mg²⁺ tiene 12 protones atrayendo a los mismos 10 electrones, ejerciendo la máxima atracción coulombiana.",
          "Paso 5: El núcleo de Mg²⁺ comprime fuertemente la nube electrónica hacia el centro, dándole el menor radio. Por el contrario, O²⁻ solo tiene 8 protones para frenar la repulsión de 10 electrones, hinchando la nube.",
          "Paso 6: Orden de menor a mayor radio: Mg²⁺ < Na⁺ < F⁻ < O²⁻."
        ],
        finalResult: "En especies isoelectrónicas, el radio iónico disminuye monotónicamente al aumentar el número atómico Z."
      }
    ],
    commonErrorsAlerts: [
      {
        trap: "Trampa de creer que más carga positiva significa mayor radio",
        correction: "Confundir masa o número atómico con radio; a mayor carga positiva nuclear, mayor es la contracción y menor el radio."
      }
    ],
    studyTechniquesHub: {
      activeRecallFlashcards: [
        {
          front: "¿Por qué el radio atómico disminuye de izquierda a derecha a lo largo de un período en la tabla periódica?",
          back: "Porque aumenta la carga nuclear Z mientras los electrones se incorporan al mismo nivel cuántico n; el apantallamiento es imperfecto, Z_ef aumenta y contrae la nube electrónica."
        },
        {
          front: "¿Cuál es la regla para ordenar radios en una serie de iones isoelectrónicos?",
          back: "A igual número de electrones, el radio es inversamente proporcional a Z: a mayor número de protones en el núcleo, menor radio iónico."
        }
      ],
      cornellSynthesis: {
        cues: ["Z_ef = Z - S", "Radio Atómico", "Serie Isoelectrónica", "Energía de Ionización"],
        notes: [
          "1. Z_ef aumenta de izquierda a derecha en un período.",
          "2. Radio atómico aumenta hacia abajo y a la izquierda.",
          "3. Especies isoelectrónicas: mayor Z = menor radio.",
          "4. Cationes son más pequeños; aniones son más grandes."
        ],
        summary: "Fundamento cuántico de las tendencias periódicas y cálculo de carga nuclear efectiva en la UCV."
      },
      conceptMapNodes: "Tendencias Periódicas\n  ├── Carga Nuclear Efectiva: Z_ef = Z - S (Aumenta hacia la derecha)\n  ├── Radio Atómico: Crece hacia abajo e izquierda | Isoelectrónicos: menor radio a mayor Z\n  └── Energía de Ionización: Crece hacia arriba y a la derecha"
    },
    generatedQuestions: [
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Series Isoelectrónicas y Radio",
        tipo: "opcion_multiple",
        pregunta: "Al comparar los iones isoelectrónicos $\\text{N}^{3-}$, $\\text{O}^{2-}$, $\\text{F}^{-}$ y $\\text{Na}^{+}$ (todos con 10 electrones), ¿cuál presenta el menor radio iónico y por qué?",
        opciones: [
          "$\\text{Na}^{+}$, porque posee el mayor número atómico ($Z = 11$) y mayor $Z_{\\text{ef}}$ atrayendo la nube con más fuerza",
          "$\\text{N}^{3-}$, porque tiene la mayor carga negativa neta",
          "$\\text{F}^{-}$, porque el flúor es el elemento con mayor electronegatividad",
          "Todos tienen idéntico radio por poseer exactamente 10 electrones"
        ],
        correcta: "$\\text{Na}^{+}$, porque posee el mayor número atómico ($Z = 11$) y mayor $Z_{\\text{ef}}$ atrayendo la nube con más fuerza",
        justificacion: "**Concepto Fundamental:** Carga Nuclear Efectiva en Series Isoelectrónicas.\n\n**Resolución:** En especies isoelectrónicas el apantallamiento electrónico es similar. El sodio posee 11 protones atrayendo 10 electrones, lo que genera la mayor carga nuclear efectiva y contrae fuertemente la nube hacia el centro, haciéndolo el más pequeño de la serie."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Energías de Ionización Sucesivas",
        tipo: "opcion_multiple",
        pregunta: "Un elemento desconocido del período 3 presenta las siguientes energías de ionización sucesivas: $I_1 = 738\\,\\text{kJ/mol}$, $I_2 = 1450\\,\\text{kJ/mol}$, $I_3 = 7730\\,\\text{kJ/mol}$. ¿A qué grupo de la tabla periódica pertenece?",
        opciones: [
          "Al Grupo 2 (Alcalinotérreos, con 2 electrones de valencia)",
          "Al Grupo 1 (Alcalinos, con 1 electrón de valencia)",
          "Al Grupo 13 (Térreos, con 3 electrones de valencia)",
          "Al Grupo 16 (Calcógenos)"
        ],
        correcta: "Al Grupo 2 (Alcalinotérreos, con 2 electrones de valencia)",
        justificacion: "**Concepto Fundamental:** Salto Abrupto en Energías de Ionización Sucesivas.\n\n**Resolución:** Entre $I_2$ ($1450\\,\\text{kJ/mol}$) e $I_3$ ($7730\\,\\text{kJ/mol}$) hay un salto brusco de más de 5 veces la energía. Esto indica que los dos primeros electrones pertenecían a la capa de valencia, y el tercer electrón proviene de un nivel interno cerrado de gas noble. Por tanto, el elemento tiene 2 electrones de valencia (Grupo 2, Magnesio)."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Variación Periódica del Radio",
        tipo: "opcion_multiple",
        pregunta: "¿Cuál de los siguientes átomos neutros presenta el mayor radio atómico?",
        opciones: [
          "Potasio ($\\text{K}$, $Z = 19$)",
          "Calcio ($\\text{Ca}$, $Z = 20$)",
          "Sodio ($\\text{Na}$, $Z = 11$)",
          "Bromo ($\\text{Br}$, $Z = 35$)"
        ],
        correcta: "Potasio ($\\text{K}$, $Z = 19$)",
        justificacion: "**Concepto Fundamental:** Tendencias del Radio Atómico en la Tabla Periódica.\n\n**Resolución:** El radio atómico aumenta hacia abajo en un grupo (el Potasio en el período 4 tiene más capas que el Sodio en el período 3) y aumenta hacia la izquierda en un período (el Potasio en el Grupo 1 tiene menor $Z_{\\text{ef}}$ que el Calcio en el Grupo 2 y el Bromo en el Grupo 17). Por tanto, el Potasio posee el mayor radio."
      }
    ],
    multimediaResources: null,
    researchPrompts: null,
    researchPrompt: null
  },

  // 5. ENLACES QUÍMICOS, BORN-HABER, LEWIS Y NOMENCLATURA INORGÁNICA IUPAC
  {
    id: "santiago-qgi-enlaces-guide",
    evaluationEventId: "santiago-qgi-parcial-2",
    guideMetadata: {
      title: "Principios de Química I: Enlace Iónico, Born-Haber, Estructuras de Lewis y Nomenclatura IUPAC",
      area: "Principios de Química I · Código 3401 (UCV Ciencias)",
      summary: "Termodinámica del enlace iónico y ciclo de Born-Haber, enlace covalente, reglas de Lewis, cargas formales, resonancia, octetos expandidos y nomenclatura IUPAC sistemática estricta."
    },
    phenomenonAndTheory: "El enlace químico es la fuerza electrostática neta que mantiene unidos a los átomos para formar agregados estables de menor energía libre. Los enlaces iónicos se forman por transferencia de electrones entre metales y no metales; la estabilidad del cristal iónico depende de la Energía Reticular (U_0), deducida mediante el ciclo termodinámico de Born-Haber. Los enlaces covalentes se forman compartiendo pares de electrones. Para dibujar la estructura de Lewis más representativa, calculamos la Carga Formal (CF = V - N - B/2); la estructura más estable es aquella con cargas formales mínimas y cargas negativas en los átomos más electronegativos. Los elementos del tercer período en adelante (P, S, Cl, Xe) pueden expandir su octeto alojando 10 o 12 electrones gracias a sus orbitales 3d vacíos. La Escuela de Química de la UCV exige además el dominio absoluto de la Nomenclatura Sistemática IUPAC, utilizando prefijos multiplicativos (bis, tris, tetraquis) para sales con radicales poliatómicos.",
    glossary: [
      {
        term: "Ciclo de Born-Haber",
        symbolOrUnit: "\\Delta H_f^\\circ = \\Delta H_{\\text{sub}} + \\frac{1}{2}D + EI + AE + U_0",
        definition: "Ciclo termodinámico que desglosa la formación de un cristal iónico en etapas elementales para calcular la energía reticular."
      },
      {
        term: "Carga Formal (CF)",
        symbolOrUnit: "\\mathrm{CF} = V - N - \\frac{B}{2}",
        definition: "Carga electrostática hipotética asignada a cada átomo en una estructura de Lewis asumiendo compartición equitativa."
      },
      {
        term: "Octeto Expandido",
        symbolOrUnit: "> 8\\, e^- \\text{ de valencia}",
        definition: "Capacidad de elementos no metálicos del período 3 o superior para alojar más de 8 electrones utilizando orbitales d disponibles."
      },
      {
        term: "Prefijo Multiplicativo IUPAC",
        symbolOrUnit: "\\text{bis, tris, tetraquis}",
        definition: "Prefijo que se antepone a aniones poliatómicos complejos para evitar ambigüedades numéricas en la nomenclatura sistemática."
      }
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: "Ecuación de Carga Formal",
          latex: "\\mathrm{CF} = V - N - \\frac{B}{2}",
          application: "V: electrones de valencia libres, N: electrones no enlazantes, B: electrones compartidos en enlaces."
        },
        {
          name: "Balance del Ciclo de Born-Haber",
          latex: "U_0 = \\Delta H_f^\\circ - \\left( \\Delta H_{\\text{sub}} + \\mathrm{EI} + \\frac{1}{2}D + \\mathrm{AE} \\right)",
          application: "Deducción de la energía reticular del cristal iónico a partir de magnitudes termoquímicas medibles."
        }
      ],
      mnemonicsAndPatterns: [
        "Paso 1: Contar los electrones de valencia totales sumando los electrones de cada átomo (sumar carga si es anión, restar si es catión).",
        "Paso 2: Elegir el átomo central (el menos electronegativo, excepto el Hidrógeno que siempre es terminal).",
        "Paso 3: Unir los ligandos con enlaces simples y completar octetos de los átomos externos con pares libres.",
        "Paso 4: Colocar electrones sobrantes en el átomo central (octeto expandido si Z >= 15).",
        "Paso 5: Calcular cargas formales para minimizar cargas y evaluar resonancia.",
        "Paso 6: Para nomenclatura sistemática: usar bis, tris, tetraquis cuando el anión ya tiene prefijo numérico interior (ej. Fe2(SO4)3 = tris[tetraoxosulfato] de dihierro)."
      ]
    },
    stepByStepExamples: [
      {
        title: "Problema Canónico UCV (Parcial 2): Estructura de Lewis del Ion Sulfato y Nomenclatura Sistemática",
        problemStatement: "a) Dibuje la estructura de Lewis más representativa del ion sulfato SO4²⁻ justificando la expansión del octeto del Azufre mediante el cálculo de cargas formales; b) Escriba su nombre IUPAC sistemático estricto y el nombre sistemático de la sal Fe2(SO4)3.",
        deductiveSteps: [
          "Paso 1: Electrones de valencia: S (Grupo 16) = 6; 4 átomos de O (Grupo 16) = 4 * 6 = 24; carga 2- = 2. Total = 6 + 24 + 2 = 32 electrones (16 pares).",
          "Paso 2: Estructura con solo enlaces simples (octeto estándar): S en el centro con 4 enlaces simples a cada O (8 electrones compartidos) y 3 pares libres en cada O (24 electrones no enlazantes). Cargas formales: Para cada O: CF = 6 - 6 - 2/2 = -1. Para el S: CF = 6 - 0 - 8/2 = +2. Esta estructura acumula demasiada separación de carga (+2 en S y cuatro cargas -1).",
          "Paso 3: Expansión del octeto: Como el Azufre está en el período 3, puede formar dobles enlaces usando orbitales 3d vacíos. Convertimos dos pares libres de oxígeno en dobles enlaces S=O.",
          "Paso 4: Cargas formales en la estructura expandida (dos enlaces dobles y dos simples): En los dos O con enlace doble: CF = 6 - 4 - 4/2 = 0. En los dos O con enlace simple: CF = 6 - 6 - 2/2 = -1. En el S central: CF = 6 - 0 - 12/2 = 0. Carga neta: 0 + 0 + (-1) + (-1) = -2. Esta estructura minimiza las cargas formales y es la más representativa.",
          "Paso 5: Nomenclatura sistemática del ion SO4²⁻: Se nombra como tetraoxosulfato(2-) o tetraoxosulfato(VI).",
          "Paso 6: Nomenclatura sistemática de Fe2(SO4)3: Al tener radical compuesto tetraoxosulfato, se utiliza el prefijo multiplicativo tris-: tris[tetraoxosulfato] de dihierro (o sulfato de hierro(III))."
        ],
        finalResult: "La expansión del octeto reduce la carga formal del azufre a cero y los prefijos multiplicativos eliminan cualquier ambigüedad estequiométrica."
      }
    ],
    commonErrorsAlerts: [
      {
        trap: "Trampa de intentar expandir octeto en elementos del período 2",
        correction: "Intentar expandir el octeto en Carbono, Nitrógeno u Oxígeno; jamás pueden tener más de 8 electrones por carecer de orbitales d."
      },
      {
        trap: "Trampa de nomenclatura de sales",
        correction: "Llamar a Fe2(SO4)3 'tri-sulfato de di-hierro' en lugar de usar el prefijo multiplicativo canónico 'tris[tetraoxosulfato] de dihierro'."
      }
    ],
    studyTechniquesHub: {
      activeRecallFlashcards: [
        {
          front: "¿Cuál es la fórmula para calcular la carga formal de un átomo en una estructura de Lewis?",
          back: "CF = V - N - B/2, donde V son los electrones de valencia libres, N los no enlazantes y B los electrones en enlaces compartidos."
        },
        {
          front: "¿Por qué elementos como el Fósforo o el Azufre pueden expandir su octeto pero el Nitrógeno y el Oxígeno no?",
          back: "Porque P y S pertenecen al período 3 y tienen orbitales 3d accesibles para albergar más de 8 electrones, mientras que N y O solo tienen orbitales 2s y 2p."
        }
      ],
      cornellSynthesis: {
        cues: ["Ciclo Born-Haber", "Carga Formal", "Octeto Expandido", "Nomenclatura IUPAC"],
        notes: [
          "1. U_0: Energía reticular en ciclo de Born-Haber.",
          "2. CF = V - N - B/2 minimizada en la mejor estructura.",
          "3. Período 3 en adelante puede tener 10 o 12 electrones.",
          "4. Nomenclatura: Prefijos bis, tris, tetraquis para radicales poliatómicos."
        ],
        summary: "Teoría del enlace químico, estructuras de Lewis, cargas formales y nomenclatura sistemática en la UCV."
      },
      conceptMapNodes: "Enlaces Químicos\n  ├── Enlace Iónico: Red cristalina y Ciclo de Born-Haber\n  ├── Enlace Covalente: Lewis -> Carga Formal CF = V - N - B/2 -> Octeto Expandido (n >= 3)\n  └── Nomenclatura IUPAC: Prefijos multiplicativos bis/tris/tetraquis"
    },
    generatedQuestions: [
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Cálculo de Carga Formal",
        tipo: "opcion_multiple",
        pregunta: "En la estructura de Lewis del ion monóxido de carbono $\\text{C}\\equiv\\text{O}$ con enlace triple y un par libre en cada átomo, ¿cuáles son las cargas formales del Carbono y del Oxígeno respectivamente?",
        opciones: [
          "Carbono: $-1$, Oxígeno: $+1$",
          "Carbono: $0$, Oxígeno: $0$",
          "Carbono: $+1$, Oxígeno: $-1$",
          "Carbono: $-2$, Oxígeno: $+2$"
        ],
        correcta: "Carbono: $-1$, Oxígeno: $+1$",
        justificacion: "**Concepto Fundamental:** Cálculo de Cargas Formales $\\text{CF} = V - N - \\frac{B}{2}$.\n\n**Resolución:** El Carbono (Grupo 14) tiene $V = 4$. Posee 1 par libre ($N = 2$) y 3 enlaces ($B = 6$). Por tanto: $\\text{CF}(\\text{C}) = 4 - 2 - 6/2 = -1$. El Oxígeno (Grupo 16) tiene $V = 6$. Posee 1 par libre ($N = 2$) y 3 enlaces ($B = 6$). Por tanto: $\\text{CF}(\\text{O}) = 6 - 2 - 6/2 = +1$."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Octetos Expandidos",
        tipo: "opcion_multiple",
        pregunta: "¿Cuál de las siguientes moléculas NO PUEDE presentar octeto expandido bajo ninguna circunstancia?",
        opciones: [
          "Trifluoruro de nitrógeno ($\\text{NF}_3$)",
          "Hexafluoruro de azufre ($\\text{SF}_6$)",
          "Pentacloruro de fósforo ($\\text{PCl}_5$)",
          "Tetrafluoruro de xenón ($\\text{XeF}_4$)"
        ],
        correcta: "Trifluoruro de nitrógeno ($\\text{NF}_3$)",
        justificacion: "**Concepto Fundamental:** Límite Cuántico del Segundo Período.\n\n**Resolución:** El nitrógeno pertenece al período 2 de la tabla periódica, donde el nivel principal $n = 2$ solo dispone de subniveles $2s$ y $2p$ (máximo 8 electrones). Al carecer de orbitales $d$, no puede expandir el octeto. En cambio, $\\text{S}$, $\\text{P}$ y $\\text{Xe}$ pertenecen a los períodos 3 o superiores y sí pueden expandir su capa de valencia."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Nomenclatura Sistemática IUPAC",
        tipo: "opcion_multiple",
        pregunta: "¿Cuál es el nombre sistemático IUPAC canónico para el compuesto $\\text{Fe}_2(\\text{SO}_4)_3$ según las normas oficiales de la Escuela de Química de la UCV?",
        opciones: [
          "Tris[tetraoxosulfato] de dihierro",
          "Tri-sulfato de di-hierro",
          "Sulfato férrico anhidro simple",
          "Tetraóxido de hierro y azufre"
        ],
        correcta: "Tris[tetraoxosulfato] de dihierro",
        justificacion: "**Concepto Fundamental:** Nomenclatura Sistemática con Prefijos Multiplicativos.\n\n**Resolución:** Cuando el anión poliatómico ya lleva un prefijo de cantidad en su estructura interior (como tetraoxo- en el radical tetraoxosulfato), la IUPAC y la cátedra de la UCV exigen utilizar prefijos multiplicativos griegos entre corchetes: *tris[tetraoxosulfato] de dihierro* para evitar confusiones."
      }
    ],
    multimediaResources: null,
    researchPrompts: null,
    researchPrompt: null
  },

  // 6. MODELO TRPEV, GEOMETRÍA MOLECULAR, POLARIDAD E HIBRIDACIÓN
  {
    id: "santiago-qgi-geometria-guide",
    evaluationEventId: "santiago-qgi-parcial-2",
    guideMetadata: {
      title: "Principios de Química I: Modelo TRPEV, Geometría Molecular, Polaridad e Hibridación",
      area: "Principios de Química I · Código 3401 (UCV Ciencias)",
      summary: "Teoría de Repulsión de Pares de Electrones de la Capa de Valencia (TRPEV/VSEPR), distinción entre geometría electrónica y molecular, ángulos de enlace distorsionados, momento dipolar neto e hibridación."
    },
    phenomenonAndTheory: "La forma tridimensional de una molécula no es plana como se dibuja en el papel de Lewis; está gobernada por la repulsión electrostática de las nubes electrónicas de valencia que rodean al átomo central. El modelo TRPEV establece que los pares de electrones se ubican lo más lejos posible entre sí en el espacio para minimizar la energía potencial de repulsión. Existe una jerarquía estricta de repulsión: los pares libres ocupan un volumen angular mayor y repelen más fuertemente que los pares enlazantes (Par Libre - Par Libre > Par Libre - Enlace > Enlace - Enlace). Por ello, comprimen los ángulos de enlace ideales. Es vital distinguir entre Geometría de Pares de Electrones (que incluye enlaces y pares libres) y la Geometría Molecular (la disposición espacial real de los núcleos atómicos). La suma vectorial de los momentos dipolares individuales determina si la molécula es polar o no polar.",
    glossary: [
      {
        term: "Número Estérico (SN)",
        symbolOrUnit: "\\mathrm{SN} = \\text{enlaces } \\sigma + \\text{pares libres}",
        definition: "Suma total de átomos enlazados más los pares de electrones solitarios que rodean al átomo central."
      },
      {
        term: "Geometría Molecular",
        symbolOrUnit: "\\text{Forma tridimensional real}",
        definition: "Disposición espacial únicamente de los átomos enlazados en la molécula, ignorando visualmente los pares libres."
      },
      {
        term: "Momento Dipolar Neto",
        symbolOrUnit: "\\vec{\\mu} = \\sum \\vec{\\mu}_i \\quad [\\text{Debye, D}]",
        definition: "Suma vectorial de todos los dipolos de enlace individuales en el espacio tridimensional."
      }
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: "Número Estérico e Hibridación",
          latex: "\\mathrm{SN} = 2 \\,(sp), \\quad 3 \\,(sp^2), \\quad 4 \\,(sp^3), \\quad 5 \\,(sp^3d), \\quad 6 \\,(sp^3d^2)",
          application: "Deducir el esquema de hibridación del átomo central a partir del conteo de dominios de electrones."
        },
        {
          name: "Momento Dipolar Resultante",
          latex: "\\vec{\\mu} = q \\cdot \\vec{d}, \\quad \\vec{\\mu}_{\\text{neto}} = \\vec{0} \\implies \\text{No polar}",
          application: "Comprobar si la simetría de la molécula anula vectorialmente los dipolos polares individuales."
        }
      ],
      mnemonicsAndPatterns: [
        "Paso 1: Dibujar la estructura de Lewis correcta minimizando cargas formales.",
        "Paso 2: Calcular el número estérico SN = (átomos enlazados) + (pares libres sobre el átomo central).",
        "Paso 3: Determinar la geometría electrónica básica (2: lineal, 3: trigonal plana, 4: tetraédrica, 5: bipiramidal trigonal, 6: octaédrica).",
        "Paso 4: Ubicar los pares libres en las posiciones de menor repulsión (en SN=5, siempre en posiciones ecuatoriales a 120°; en SN=6, en posiciones axiales opuestas a 180°).",
        "Paso 5: Nombrar la geometría molecular leyendo solo las posiciones de los átomos (balancín, forma de T, lineal, etc.).",
        "Paso 6: Sumar los vectores de enlace para determinar si el momento dipolar neto es nulo o no nulo."
      ]
    },
    stepByStepExamples: [
      {
        title: "Problema Canónico UCV (Parcial 2): Geometría Molecular y Polaridad del Tetrafluoruro de Azufre (SF4)",
        problemStatement: "Para la molécula de tetrafluoruro de azufre (SF4): a) Dibuje la estructura de Lewis; b) Determine el número estérico y la hibridación del átomo central; c) Indique la geometría de pares y la geometría molecular con los ángulos aproximados; d) Justifique si la molécula es polar o no polar.",
        deductiveSteps: [
          "Paso 1: Electrones de valencia: S (6) + 4 F (4 * 7 = 28) = 34 electrones (17 pares).",
          "Paso 2: Estructura de Lewis: S enlazado a 4 átomos de F (8 electrones compartidos). Los 4 F completan sus octetos con 3 pares libres cada uno (24 electrones). Restan: 34 - (8 + 24) = 2 electrones (1 par libre) que se ubican en el átomo central de Azufre.",
          "Paso 3: Número estérico: SN = 4 enlaces + 1 par libre = 5. Hibridación del S: sp³d.",
          "Paso 4: Geometría de pares: Bipiramidal trigonal. Para minimizar repulsión, el par libre se ubica en el plano ecuatorial (interactúa a 120° con solo 2 enlaces axiales a 90°).",
          "Paso 5: Geometría molecular: Al ocultar el par libre ecuatorial, los 4 átomos de flúor forman una estructura de Balancín (see-saw o subibaja).",
          "Paso 6: Ángulos y polaridad: La repulsión del par libre comprime los enlaces axiales hacia adentro, haciendo que el ángulo axial sea menor a 180° (aprox. 173°) y el ecuatorial menor a 120° (aprox. 102°). Debido a esta asimetría angular, los dipolos de enlace S-F altamente polares no se cancelan vectorialmente: momento dipolar neto mu != 0. La molécula es POLAR."
        ],
        finalResult: "En geometrías con SN = 5, los pares libres siempre prefieren posiciones ecuatoriales para minimizar la repulsión a 90 grados."
      }
    ],
    commonErrorsAlerts: [
      {
        trap: "Trampa de confundir geometría de pares con geometría molecular",
        correction: "Responder que el agua o el SF4 son 'tetraédricas'; el tetraedro es la geometría de pares, la geometría molecular del H2O es angular y del SF4 es balancín."
      },
      {
        trap: "Trampa de posición en bipirámide trigonal",
        correction: "Colocar el par libre en una posición axial en SN = 5; en posición axial tendría 3 repulsiones desfavorables a 90 grados."
      }
    ],
    studyTechniquesHub: {
      activeRecallFlashcards: [
        {
          front: "¿Por qué en una geometría bipiramidal trigonal (SN = 5) los pares solitarios se ubican siempre en el plano ecuatorial?",
          back: "Porque en el plano ecuatorial solo tienen 2 vecinos a 90 grados y 2 a 120 grados, minimizando drásticamente la repulsión electrostática comparado con la posición axial."
        },
        {
          front: "¿Cuál es la geometría molecular de una especie con 4 enlaces y 2 pares libres (SN = 6, como el XeF4)?",
          back: "Cuadrada plana (los dos pares libres se ubican en posiciones axiales opuestas a 180 grados para anular sus repulsiones mutuas)."
        }
      ],
      cornellSynthesis: {
        cues: ["Número Estérico SN", "TRPEV / VSEPR", "Balancín vs Cuadrada Plana", "Polaridad Neta"],
        notes: [
          "1. SN = Enlaces sigma + Pares libres.",
          "2. Jerarquía: Par libre - Par libre > Par libre - Enlace > Enlace - Enlace.",
          "3. SN = 5 con 1 par libre: Balancín (polar).",
          "4. SN = 6 con 2 pares libres: Cuadrada plana (no polar)."
        ],
        summary: "Determinación de geometrías moleculares espaciales, hibridación y momentos dipolares netos."
      },
      conceptMapNodes: "Geometría Molecular TRPEV\n  ├── Número Estérico SN = Enlaces + Pares libres\n  ├── Repulsión: Pares libres distorsionan ángulos\n  └── Formas: Balancín (SN 5, 1 par) | Forma de T (SN 5, 2 pares) | Cuadrada plana (SN 6, 2 pares)"
    },
    generatedQuestions: [
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Geometría TRPEV del SF4",
        tipo: "opcion_multiple",
        pregunta: "¿Cuál es la geometría molecular real del tetrafluoruro de azufre ($\\text{SF}_4$) según el modelo de repulsión de pares de electrones de la capa de valencia (TRPEV)?",
        opciones: [
          "Balancín (o subibaja / see-saw)",
          "Tetraédrica regular",
          "Cuadrada plana",
          "Piramidal trigonal"
        ],
        correcta: "Balancín (o subibaja / see-saw)",
        justificacion: "**Concepto Fundamental:** Geometría de Pares vs Geometría Molecular con $\\text{SN} = 5$.\n\n**Resolución:** El átomo central de Azufre (Grupo 16) tiene 6 electrones de valencia. Forma 4 enlaces simples con F (4 electrones) y le queda 1 par libre (2 electrones). El número estérico es $4 + 1 = 5$ (geometría de pares bipiramidal trigonal). El par libre se ubica en el plano ecuatorial a $120^\\circ$ para minimizar repulsión, dejando una geometría molecular de Balancín (see-saw)."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Geometría Cuadrada Plana del XeF4",
        tipo: "opcion_multiple",
        pregunta: "¿Cuál es la geometría molecular y el momento dipolar neto del tetrafluoruro de xenón ($\\text{XeF}_4$)?",
        opciones: [
          "Cuadrada plana, no polar ($\\vec{\\mu} = 0$)",
          "Tetraédrica, polar ($\\vec{\\mu} \\neq 0$)",
          "Balancín, polar ($\\vec{\\mu} \\neq 0$)",
          "Octaédrica perfecta, polar"
        ],
        correcta: "Cuadrada plana, no polar ($\\vec{\\mu} = 0$)",
        justificacion: "**Concepto Fundamental:** Disposición Axial de Pares Libres en $\\text{SN} = 6$.\n\n**Resolución:** El Xenón tiene 8 electrones de valencia. En $\\text{XeF}_4$ forma 4 enlaces y conserva 2 pares libres: $\\text{SN} = 4 + 2 = 6$ (geometría de pares octaédrica). Los dos pares libres se ubican en polos axiales opuestos a $180^\\circ$, cancelando su efecto. Los 4 átomos de Flúor forman una geometría cuadrada plana perfectamente simétrica, cancelando los dipolos de enlace: $\\vec{\\mu}_{\\text{neto}} = 0$ (molécula no polar)."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Distorsión Angular por Pares Libres",
        tipo: "opcion_multiple",
        pregunta: "En la serie de hidruros isoelectrónicos $\\text{CH}_4$, $\\text{NH}_3$ y $\\text{H}_2\\text{O}$ (todos con hibridación aproximada $sp^3$ y $\\text{SN} = 4$), ¿por qué el ángulo de enlace disminuye progresivamente ($109.5^\\circ \\to 107.3^\\circ \\to 104.5^\\circ$)?",
        opciones: [
          "Porque los pares libres ocupan un volumen mayor y ejercen mayor repulsión sobre los pares enlazantes adyacentes, cerrando el ángulo",
          "Porque el hidrógeno cambia de estado de oxidación",
          "Porque la masa del átomo central aumenta",
          "Porque los enlaces dobles acortan la distancia interatómica"
        ],
        correcta: "Porque los pares libres ocupan un volumen mayor y ejercen mayor repulsión sobre los pares enlazantes adyacentes, cerrando el ángulo",
        justificacion: "**Concepto Fundamental:** Jerarquía de Repulsiones Angulares en TRPEV.\n\n**Resolución:** Los pares no enlazantes (solitarios) están atraídos por un solo núcleo atómico, extendiendo su nube de carga y ocupando mayor volumen angular. El metano tiene 0 pares libres ($109.5^\\circ$), el amoníaco tiene 1 par libre que comprime los enlaces a $107.3^\\circ$, y el agua tiene 2 pares libres que ejercen una repulsión aún mayor cerrando el ángulo a $104.5^\\circ$."
      }
    ],
    multimediaResources: null,
    researchPrompts: null,
    researchPrompt: null
  },

  // 7. ESTEQUIOMETRÍA, REACTIVO LIMITANTE, PUREZA Y RENDIMIENTO
  {
    id: "santiago-qgi-estequiometria-guide",
    evaluationEventId: "santiago-qgi-parcial-2",
    guideMetadata: {
      title: "Principios de Química I: Estequiometría, Reactivo Limitante, Pureza y Rendimiento",
      area: "Principios de Química I · Código 3401 (UCV Ciencias)",
      summary: "Concepto de mol y número de Avogadro, balanceo de reacciones químicas, cuadro ICF de balance de masas, cálculo analítico de reactivo limitante, impurezas minerales y porcentaje de rendimiento."
    },
    phenomenonAndTheory: "La estequiometría es el corazón cuantitativo de la química general. Traduce las relaciones microscópicas de átomos y moléculas expresadas en una ecuación química balanceada a magnitudes macroscópicas medibles en el laboratorio (gramos, moles, litros). Un mol equivale exactamente a 6.022 x 10²³ partículas (Número de Avogadro). En la práctica industrial y de laboratorio, los reactivos rara vez se mezclan en proporciones estequiométricas exactas. Aquel reactivo cuya relación molar entre moles disponibles y su coeficiente estequiométrico sea mínima es el Reactivo Limitante: se agota por completo y determina la cantidad máxima teórica de producto que puede sintetizarse. Además, los minerales reales contienen impurezas inertes que deben descontarse antes de realizar cualquier cálculo estequiométrico, y las pérdidas experimentales reducen el rendimiento real por debajo del 100%.",
    glossary: [
      {
        term: "Mol",
        symbolOrUnit: "n = \\frac{m}{M} \\quad [\\mathrm{mol}]",
        definition: "Cantidad de sustancia que contiene exactamente 6.022 x 10²³ entidades elementales (átomos, moléculas, iones)."
      },
      {
        term: "Reactivo Limitante",
        symbolOrUnit: "\\min\\left(\\frac{n_i}{c_i}\\right)",
        definition: "Sustancia que se consume totalmente primero en la reacción química, deteniendo el proceso y fijando el rendimiento teórico."
      },
      {
        term: "Pureza Porcentual",
        symbolOrUnit: "\\%P = \\frac{m_{\\text{pura}}}{m_{\\text{muestra}}} \\times 100",
        definition: "Fracción de masa de sustancia químicamente reactiva contenida en una muestra comercial o mineral impuro."
      },
      {
        term: "Rendimiento Porcentual",
        symbolOrUnit: "\\%R = \\frac{\\text{Rendimiento Real}}{\\text{Rendimiento Teórico}} \\times 100",
        definition: "Porcentaje de producto realmente obtenido en el laboratorio frente al valor estequiométrico ideal calculado."
      }
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: "Conversión Masa a Moles",
          latex: "n = \\frac{m}{M}, \\quad m = n \\cdot M",
          application: "Transformar gramos pesados en balanza a moles moleculares mediante la masa molar."
        },
        {
          name: "Criterio de Reactivo Limitante",
          latex: "\\text{Cociente Molar} = \\frac{n_{\\text{reactivo}}}{\\text{Coeficiente Estequiométrico}}",
          application: "El reactivo con el menor cociente molar es el limitante indiscutible de la reacción."
        },
        {
          name: "Rendimiento Porcentual",
          latex: "\\%\\text{Rendimiento} = \\frac{m_{\\text{real}}}{m_{\\text{teórico}}} \\times 100\\%",
          application: "Comparar la masa obtenida experimentalmente en el laboratorio con el cálculo estequiométrico."
        }
      ],
      mnemonicsAndPatterns: [
        "Paso 1: Escribir y verificar el balanceo estequiométrico de la ecuación química.",
        "Paso 2: Si el problema da pureza del mineral, multiplicar primero la masa de muestra por el porcentaje de pureza para obtener los gramos puros.",
        "Paso 3: Convertir todos los gramos de reactivos a moles dividiendo entre sus masas molares.",
        "Paso 4: Dividir los moles de cada reactivo entre su respectivo coeficiente en la ecuación balanceada.",
        "Paso 5: El reactivo con el menor cociente es el Reactivo Limitante. Descartar los otros para el cálculo de productos.",
        "Paso 6: Usar los moles del reactivo limitante para calcular los moles de producto y multiplicar por el porcentaje de rendimiento si aplica."
      ]
    },
    stepByStepExamples: [
      {
        title: "Problema Canónico UCV (Guía Oficial de Química I): Síntesis de Magnetita con Pureza y Rendimiento",
        problemStatement: "En la guía oficial de la UCV se plantea: Se hacen reaccionar 168.0 g de un mineral de hierro con 80.0% de pureza en Fe con 72.0 g de vapor de agua según: 3 Fe(s) + 4 H2O(g) -> Fe3O4(s) + 4 H2(g). a) Determine cuál es el reactivo limitante; b) Calcule la masa teórica de magnetita (Fe3O4) que se puede obtener; c) Si en el laboratorio se recolectaron 110.0 g de Fe3O4, calcule el rendimiento porcentual de la reacción. (Masas atómicas: Fe = 55.85 g/mol, H = 1.01 g/mol, O = 16.00 g/mol).",
        deductiveSteps: [
          "Paso 1: Masa pura de hierro: m(Fe puro) = 168.0 g * 0.80 = 134.4 g de Fe puro.",
          "Paso 2: Moles disponibles: Moles de Fe = 134.4 g / 55.85 g/mol = 2.406 moles de Fe. Moles de H2O = 72.0 g / 18.02 g/mol = 3.996 moles de H2O.",
          "Paso 3: Identificación del Reactivo Limitante: Para Fe: 2.406 / 3 = 0.802. Para H2O: 3.996 / 4 = 0.999. Como 0.802 < 0.999, el REACTIVO LIMITANTE ES EL HIERRO (Fe).",
          "Paso 4: Moles teóricos de magnetita Fe3O4: Según la estequiometría: 3 moles de Fe producen 1 mol de Fe3O4. Moles de Fe3O4 = 2.406 moles Fe * (1 mol Fe3O4 / 3 moles Fe) = 0.802 moles de Fe3O4.",
          "Paso 5: Masa molar de Fe3O4: M = 3(55.85) + 4(16.00) = 167.55 + 64.00 = 231.55 g/mol. Masa teórica: m_teórica = 0.802 moles * 231.55 g/mol = 185.7 g de Fe3O4.",
          "Paso 6: Rendimiento porcentual: %R = (m_real / m_teórica) * 100 = (110.0 g / 185.7 g) * 100 = 59.2%."
        ],
        finalResult: "El cálculo correcto requiere purificar la masa mineral antes de evaluar el cociente limitante y contrastar con el producto real."
      }
    ],
    commonErrorsAlerts: [
      {
        trap: "Trampa de comparar gramos directamente",
        correction: "Declarar reactivo limitante al que tiene menos gramos; la estequiometría opera en moles atómicos, no en gramos brutos."
      },
      {
        trap: "Trampa de olvidar la pureza",
        correction: "Usar los 168 g del mineral directamente en los cálculos molares sin descontar el 20% de ganga inerte."
      }
    ],
    studyTechniquesHub: {
      activeRecallFlashcards: [
        {
          front: "¿Cómo se identifica con certeza absoluta cuál es el reactivo limitante en una reacción química?",
          back: "Dividiendo los moles disponibles de cada reactivo entre su respectivo coeficiente estequiométrico; el menor cociente resultante identifica al reactivo limitante."
        },
        {
          front: "¿Qué fórmula define el rendimiento porcentual de una reacción química?",
          back: "%Rendimiento = (Cantidad Real Obtenida en Laboratorio / Cantidad Teórica Calculada por Estequiometría) x 100."
        }
      ],
      cornellSynthesis: {
        cues: ["Mol = m / M", "Cociente Molar Limitante", "Descuento de Pureza", "Rendimiento %"],
        notes: [
          "1. Siempre balancear la ecuación primero.",
          "2. Masa pura = Masa total * %Pureza.",
          "3. Limitante: menor moles / coeficiente.",
          "4. Todo cálculo de producto parte del limitante."
        ],
        summary: "Cálculos estequiométricos fundamentales, balance de masas con reactivo limitante y rendimiento de reacción."
      },
      conceptMapNodes: "Estequiometría\n  ├── Pureza: m_pura = m_muestra * %P\n  ├── Moles: n = m / M\n  └── Limitante: min(n_i / c_i) -> Rige la producción y el %Rendimiento"
    },
    generatedQuestions: [
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Reactivo Limitante en Amoníaco",
        tipo: "opcion_multiple",
        pregunta: "Se mezclan $2.0\\,\\text{moles}$ de gas $\\text{N}_2$ con $3.0\\,\\text{moles}$ de gas $\\text{H}_2$ para sintetizar amoníaco según $\\text{N}_2(g) + 3\\,\\text{H}_2(g) \\to 2\\,\\text{NH}_3(g)$. ¿Cuántos moles de $\\text{NH}_3$ se pueden producir como máximo teórico?",
        opciones: [
          "$2.0\\,\\text{moles de } \\text{NH}_3$",
          "$4.0\\,\\text{moles de } \\text{NH}_3$",
          "$1.0\\,\\text{mol de } \\text{NH}_3$",
          "$3.0\\,\\text{moles de } \\text{NH}_3$"
        ],
        correcta: "$2.0\\,\\text{moles de } \\text{NH}_3$",
        justificacion: "**Concepto Fundamental:** Determinación de Reactivo Limitante.\n\n**Resolución:** Comparamos los cocientes moles/coeficiente: Para $\\text{N}_2$: $2.0 / 1 = 2.0$. Para $\\text{H}_2$: $3.0 / 3 = 1.0$. Como $1.0 < 2.0$, el $\\text{H}_2$ es el reactivo limitante. Los $3.0$ moles de $\\text{H}_2$ producen teóricamente: $3.0\\,\\text{mol H}_2 \\times \\frac{2\\,\\text{mol NH}_3}{3\\,\\text{mol H}_2} = 2.0\\,\\text{moles de } \\text{NH}_3$."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Pureza Mineral y Reactivo Limitante",
        tipo: "opcion_multiple",
        pregunta: "Una muestra de $100.0\\,\\text{g}$ de carbonato de calcio comercial $\\text{CaCO}_3$ ($M = 100.09\\,\\text{g/mol}$) con $90.0\\%$ de pureza se descompone térmicamente: $\\text{CaCO}_3(s) \\to \\text{CaO}(s) + \\text{CO}_2(g)$. ¿Cuántos moles de gas $\\text{CO}_2$ se liberan?",
        opciones: [
          "$0.90\\,\\text{moles de } \\text{CO}_2$",
          "$1.00\\,\\text{mol de } \\text{CO}_2$",
          "$0.45\\,\\text{moles de } \\text{CO}_2$",
          "$90.0\\,\\text{moles de } \\text{CO}_2$"
        ],
        correcta: "$0.90\\,\\text{moles de } \\text{CO}_2$",
        justificacion: "**Concepto Fundamental:** Descuento de Pureza en Estequiometría.\n\n**Resolución:** Masa pura de $\\text{CaCO}_3 = 100.0\\,\\text{g} \\times 0.90 = 90.0\\,\\text{g}$. Moles puros de $\\text{CaCO}_3 = 90.0\\,\\text{g} / 100.09\\,\\text{g/mol} \\approx 0.90\\,\\text{moles}$. Según la estequiometría $1:1$, se liberan exactamente $0.90\\,\\text{moles de } \\text{CO}_2$."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Cálculo de Rendimiento Porcentual",
        tipo: "opcion_multiple",
        pregunta: "En una reacción química el cálculo estequiométrico predice una masa teórica de $50.0\\,\\text{g}$ de producto, pero tras el proceso de filtración y secado en laboratorio se obtienen $42.5\\,\\text{g}$. ¿Cuál es el rendimiento porcentual?",
        opciones: [
          "$85.0\\%$",
          "$92.5\\%$",
          "$80.0\\%$",
          "$117.6\\%$"
        ],
        correcta: "$85.0\\%$",
        justificacion: "**Concepto Fundamental:** Rendimiento Porcentual Experimental.\n\n**Resolución:** $\\%R = \\frac{\\text{Masa Real}}{\\text{Masa Teórica}} \\times 100 = \\frac{42.5\\,\\text{g}}{50.0\\,\\text{g}} \\times 100 = 85.0\\%$."
      }
    ],
    multimediaResources: null,
    researchPrompts: null,
    researchPrompt: null
  },

  // 8. REACCIONES ACUOSAS, SOLUBILIDAD, NEUTRALIZACIÓN Y REDOX ION-ELECTRÓN
  {
    id: "santiago-qgi-disoluciones-reacciones-guide",
    evaluationEventId: "santiago-qgi-parcial-3",
    guideMetadata: {
      title: "Principios de Química I: Reacciones Acuosas, Solubilidad, Neutralización y Redox Ion-Electrón",
      area: "Principios de Química I · Código 3401 (UCV Ciencias)",
      summary: "Electrolitos fuertes y débiles, reglas de solubilidad y ecuaciones iónicas netas, neutralización ácido-base, preparación de disoluciones de laboratorio y balanceo redox por ion-electrón en medio ácido y básico."
    },
    phenomenonAndTheory: "La gran mayoría de los procesos químicos tienen lugar en disolución acuosa donde el agua actúa como disolvente polar solvatando iones. Las sustancias se clasifican en electrolitos fuertes (se disocian completamente al 100%), electrolitos débiles y no electrolitos. En las reacciones de precipitación, las reglas de solubilidad permiten predecir qué pares de iones formarán un sólido insoluble, resumiéndose en la Ecuación Iónica Neta eliminando a los iones espectadores. En las reacciones redox (óxido-reducción), hay transferencia de electrones entre especies; para balancearlas rigurosamente en la UCV no se utiliza el tanteo simple, sino el método del Ion-Electrón: se separan las semirreacciones de oxidación y reducción, se balancean los elementos principales, luego el oxígeno con H2O, el hidrógeno con H+ (o OH- en medio básico), y finalmente las cargas eléctricas agregando electrones antes de sumar.",
    glossary: [
      {
        term: "Ecuación Iónica Neta",
        symbolOrUnit: "\\text{Iones participantes reales}",
        definition: "Ecuación que incluye exclusivamente a las especies químicas que participan directamente en la formación de precipitados, gases o electrolitos débiles."
      },
      {
        term: "Semirreacción de Oxidación",
        symbolOrUnit: "\\text{Pérdida de } e^- \\quad (\\text{Aumento de E.O.})",
        definition: "Proceso donde una sustancia pierde electrones aumentando su estado de oxidación y actuando como agente reductor."
      },
      {
        term: "Semirreacción de Reducción",
        symbolOrUnit: "\\text{Ganancia de } e^- \\quad (\\text{Disminución de E.O.})",
        definition: "Proceso donde una sustancia gana electrones reduciendo su estado de oxidación y actuando como agente oxidante."
      }
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: "Método Ion-Electrón (Medio Ácido)",
          latex: "\\text{Oxígenos con } \\mathrm{H_2O}, \\quad \\text{Hidrógenos con } \\mathrm{H^+}, \\quad \\text{Cargas con } e^-",
          application: "Secuencia estricta de balanceo en presencia de ácidos acuosos."
        },
        {
          name: "Conversión a Medio Básico",
          latex: "\\mathrm{H^+} + \\mathrm{OH^-} \\to \\mathrm{H_2O}",
          application: "Sumar a ambos lados tantos OH- como H+ haya presentes y simplificar moléculas de agua."
        },
        {
          name: "Ecuación de Dilución",
          latex: "C_1 V_1 = C_2 V_2",
          application: "Conservación de los moles de soluto al agregar solvente para preparar soluciones diluidas."
        }
      ],
      mnemonicsAndPatterns: [
        "Paso 1: Asignar números de oxidación a todos los elementos para identificar quién se oxida y quién se reduce.",
        "Paso 2: Escribir las semirreacciones de oxidación y reducción en forma iónica (separando sales solubles y ácidos fuertes).",
        "Paso 3: Balancear átomos distintos de H y O.",
        "Paso 4: Balancear O agregando H2O en el lado deficitario.",
        "Paso 5: Balancear H agregando H+ en el lado deficitario.",
        "Paso 6: Balancear cargas eléctricas netas sumando electrones en el lado más positivo.",
        "Paso 7: Multiplicar las semirreacciones por factores mínimos para igualar los electrones transferidos y sumar cancelando términos repetidos."
      ]
    },
    stepByStepExamples: [
      {
        title: "Problema Canónico UCV (Parcial 3): Balanceo Redox por Ion-Electrón en Medio Ácido",
        problemStatement: "Balancee por el método del ion-electrón en medio ácido la siguiente reacción de laboratorio de la UCV: Dicromato de potasio con sulfato de hierro(II) en ácido sulfúrico: Cr2O7²⁻ + Fe²⁺ + H⁺ -> Cr³⁺ + Fe³⁺ + H2O. Identifique el agente oxidante y el agente reductor.",
        deductiveSteps: [
          "Paso 1: Asignamos estados de oxidación: En Cr2O7²⁻, el Cromo pasa de +6 a +3 (se reduce, agente oxidante). El Hierro pasa de Fe²⁺ a Fe³⁺ (se oxida, agente reductor).",
          "Paso 2: Semirreacción de oxidación: Fe²⁺ -> Fe³⁺ + 1 e⁻.",
          "Paso 3: Semirreacción de reducción (átomos distintos de O): Cr2O7²⁻ -> 2 Cr³⁺.",
          "Paso 4: Balance de oxígeno: El lado izquierdo tiene 7 O, agregamos 7 H2O a la derecha: Cr2O7²⁻ -> 2 Cr³⁺ + 7 H2O.",
          "Paso 5: Balance de hidrógeno: La derecha tiene 14 H, agregamos 14 H⁺ a la izquierda: Cr2O7²⁻ + 14 H⁺ -> 2 Cr³⁺ + 7 H2O.",
          "Paso 6: Balance de cargas: Lado izquierdo: (-2) + (+14) = +12. Lado derecho: 2(+3) + 0 = +6. Para pasar de +12 a +6, sumamos 6 e⁻ a la izquierda: Cr2O7²⁻ + 14 H⁺ + 6 e⁻ -> 2 Cr³⁺ + 7 H2O.",
          "Paso 7: Igualar electrones y sumar: Multiplicamos la semirreacción de oxidación por 6: 6 Fe²⁺ -> 6 Fe³⁺ + 6 e⁻. Sumamos ambas semirreacciones cancelando los 6 e⁻: Cr2O7²⁻ + 14 H⁺ + 6 Fe²⁺ -> 2 Cr³⁺ + 6 Fe³⁺ + 7 H2O."
        ],
        finalResult: "El método ion-electrón garantiza la conservación simultánea de masa atómica y carga electrostática neta."
      }
    ],
    commonErrorsAlerts: [
      {
        trap: "Trampa de balancear cargas sin balancear electrones",
        correction: "Olvidar multiplicar las semirreacciones cruzadas para igualar los electrones antes de sumar."
      },
      {
        trap: "Trampa de disociar electrolitos débiles",
        correction: "Disociar ácidos débiles como HF o ácido acético en la ecuación iónica; los electrolitos débiles se escriben enteros en forma molecular."
      }
    ],
    studyTechniquesHub: {
      activeRecallFlashcards: [
        {
          front: "¿Cuál es la diferencia entre un agente oxidante y un agente reductor?",
          back: "El agente oxidante provoca la oxidación de otra especie ganando electrones (él mismo se reduce); el agente reductor pierde electrones (él mismo se oxida)."
        },
        {
          front: "¿Cómo se balancean los oxígenos e hidrógenos en el método ion-electrón en medio ácido?",
          back: "Se añaden moléculas de H2O en el lado que carece de oxígeno, y luego iones H+ en el lado opuesto para balancear los hidrógenos."
        }
      ],
      cornellSynthesis: {
        cues: ["Electrolitos Fuertes", "Iones Espectadores", "Ion-Electrón", "Agente Oxidante"],
        notes: [
          "1. Ecuación iónica neta elimina iones espectadores.",
          "2. Oxidación = Pérdida de electrones; Reducción = Ganancia.",
          "3. Medio ácido: H2O para oxígeno, H+ para hidrógeno.",
          "4. Electrones transferidos deben cancelarse al sumar."
        ],
        summary: "Reacciones acuosas, solubilidad y metodología del ion-electrón en disoluciones de la UCV."
      },
      conceptMapNodes: "Reacciones Acuosas y Redox\n  ├── Acuosas: Precipitaciones -> Ecuación Iónica Neta\n  └── Redox: Ion-Electrón (Oxidación pierde e- | Reducción gana e-) -> Medio ácido (H2O, H+)"
    },
    generatedQuestions: [
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Balanceo Redox Ion-Electrón",
        tipo: "opcion_multiple",
        pregunta: "En el balanceo de la semirreacción de reducción del ion permanganato en medio ácido: $\\text{MnO}_4^- \\to \\text{Mn}^{2+}$, ¿cuántos protones $\\text{H}^+$ y cuántos electrones $e^-$ se requieren en el lado de los reactivos?",
        opciones: [
          "$8\\,\\text{H}^+$ y $5\\,e^-$",
          "$4\\,\\text{H}^+$ y $3\\,e^-$",
          "$8\\,\\text{H}^+$ y $7\\,e^-$",
          "$14\\,\\text{H}^+$ y $6\\,e^-$"
        ],
        correcta: "$8\\,\\text{H}^+$ y $5\\,e^-$",
        justificacion: "**Concepto Fundamental:** Balanceo de Semirreacción por Ion-Electrón.\n\n**Resolución:** Partimos de $\\text{MnO}_4^- \\to \\text{Mn}^{2+}$. Balanceamos 4 oxígenos añadiendo $4\\,\\text{H}_2\\text{O}$ a la derecha. Balanceamos 8 hidrógenos añadiendo $8\\,\\text{H}^+$ a la izquierda. Carga a la izquierda: $-1 + 8 = +7$. Carga a la derecha: $+2$. Para igualar cargas, sumamos $5\\,e^-$ a la izquierda: $\\text{MnO}_4^- + 8\\,\\text{H}^+ + 5\\,e^- \\to \\text{Mn}^{2+} + 4\\,\\text{H}_2\\text{O}$."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Identificación de Agentes Redox",
        tipo: "opcion_multiple",
        pregunta: "En la reacción de laboratorio: $\\text{Zn}(s) + 2\\,\\text{HCl}(aq) \\to \\text{ZnCl}_2(aq) + \\text{H}_2(g)$, ¿cuál especie química actúa como agente reductor?",
        opciones: [
          "El Zinc metálico $\\text{Zn}(s)$, porque se oxida de $0$ a $+2$ cediendo electrones",
          "El ion $\\text{H}^+$, porque se reduce",
          "El ion cloruro $\\text{Cl}^-$, porque es un ion espectador",
          "El gas hidrógeno $\\text{H}_2$"
        ],
        correcta: "El Zinc metálico $\\text{Zn}(s)$, porque se oxida de $0$ a $+2$ cediendo electrones",
        justificacion: "**Concepto Fundamental:** Agente Reductor vs Agente Oxidante.\n\n**Resolución:** El estado de oxidación del Zinc cambia de $0$ (sólido neutro) a $+2$ en $\\text{ZnCl}_2$. Al oxidarse perdiendo electrones, reduce a los protones $\\text{H}^+$ (que pasan de $+1$ a $0$ en $\\text{H}_2$), actuando como agente reductor."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Dilución de Reactivos Concentrados",
        tipo: "opcion_multiple",
        pregunta: "Se desea preparar $500\\,\\text{mL}$ de disolución acuosa de $\\text{HCl}$ $0.20\\,\\text{M}$ a partir de una disolución concentrada patrón de $\\text{HCl}$ $2.0\\,\\text{M}$. ¿Qué volumen de disolución concentrada debe pipetearse?",
        opciones: [
          "$50\\,\\text{mL}$",
          "$25\\,\\text{mL}$",
          "$100\\,\\text{mL}$",
          "$5.0\\,\\text{mL}$"
        ],
        correcta: "$50\\,\\text{mL}$",
        justificacion: "**Concepto Fundamental:** Conservación de Moles en Diluciones $C_1 V_1 = C_2 V_2$.\n\n**Resolución:** Despejamos el volumen inicial: $V_1 = \\frac{C_2 V_2}{C_1} = \\frac{(0.20\\,\\text{M})(500\\,\\text{mL})}{2.0\\,\\text{M}} = \\frac{100}{2.0} = 50\\,\\text{mL}$."
      }
    ],
    multimediaResources: null,
    researchPrompts: null,
    researchPrompt: null
  },

  // 9. GASES IDEALES, DALTON SOBRE AGUA, GRAHAM Y VAN DER WAALS
  {
    id: "santiago-qgi-gases-guide",
    evaluationEventId: "santiago-qgi-parcial-3",
    guideMetadata: {
      title: "Principios de Química I: Gases Ideales, Presiones Parciales de Dalton y Ecuación de Van der Waals",
      area: "Principios de Química I · Código 3401 (UCV Ciencias)",
      summary: "Ecuación de estado del gas ideal PV = nRT, cálculo de densidad y masa molar de gases, ley de presiones parciales de Dalton para gases recolectados sobre agua, ley de efusión de Graham y desviaciones reales por Van der Waals."
    },
    phenomenonAndTheory: "El estado gaseoso se caracteriza por moléculas en movimiento caótico continuo separadas por distancias enormes comparadas con sus diámetros atómicos. El modelo del gas ideal asume dos postulados esenciales: las moléculas no tienen volumen propio (puntos materiales) y no existen fuerzas intermoleculares de atracción o repulsión entre ellas. La ecuación general de estado PV = nRT unifica las leyes empíricas de Boyle, Charles y Avogadro. En mezclas gaseosas, la Ley de Dalton establece que la presión total es la suma de las presiones parciales que ejercería cada gas si ocupara solo el volumen; esto es crucial al recolectar gases sobre agua en laboratorio, donde debe restarse la presión de vapor saturado del agua a esa temperatura. A altas presiones o bajas temperaturas, los gases reales se desvían del comportamiento ideal, requiriendo la ecuación de Van der Waals con correcciones para el volumen molecular propio (b) y las atracciones electrostáticas (a).",
    glossary: [
      {
        term: "Ecuación del Gas Ideal",
        symbolOrUnit: "PV = nRT",
        definition: "Ecuación de estado que relaciona presión (atm), volumen (L), moles y temperatura absoluta (K) con la constante R = 0.08206 atm L / mol K."
      },
      {
        term: "Presión Parcial (Dalton)",
        symbolOrUnit: "P_i = X_i P_{\\text{total}}",
        definition: "Presión que ejerce un gas individual dentro de una mezcla gaseosa, proporcional a su fracción molar Xi."
      },
      {
        term: "Gas Recolectado Sobre Agua",
        symbolOrUnit: "P_{\\text{gas seco}} = P_{\\text{atm}} - P_{\\mathrm{H_2O}}(T)",
        definition: "Corrección barométrica obligatoria para descontar la presión de vapor de agua saturada que se mezcla con el gas."
      },
      {
        term: "Ley de Difusión de Graham",
        symbolOrUnit: "\\frac{r_1}{r_2} = \\sqrt{\\frac{M_2}{M_1}}",
        definition: "Relación inversamente proporcional entre la velocidad de difusión o efusión de un gas y la raíz cuadrada de su masa molar."
      }
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: "Ecuación General de los Gases Ideales",
          latex: "PV = nRT = \\frac{m}{M}RT \\implies \\rho = \\frac{PM}{RT}",
          application: "Calcular variables de estado, densidad o masa molar de cualquier gas en condiciones dadas."
        },
        {
          name: "Corrección de Dalton Sobre Agua",
          latex: "P_{\\text{gas}} = P_{\\text{total}} - P_{\\mathrm{H_2O}}^\\circ(T)",
          application: "Restar la presión de vapor de agua tabulada a la temperatura de trabajo del laboratorio."
        },
        {
          name: "Ecuación de Van der Waals (Gases Reales)",
          latex: "\\left( P + \\frac{n^2 a}{V^2} \\right) (V - nb) = nRT",
          application: "Modelar gases reales corrigiendo atracciones moleculares (a) y volumen co-propio ocupado (b)."
        }
      ],
      mnemonicsAndPatterns: [
        "Paso 1: Convertir siempre la temperatura a Kelvin absolutos sumando 273.15 (T = t °C + 273.15).",
        "Paso 2: Convertir la presión a atmósferas (1 atm = 760 mmHg = 101325 Pa).",
        "Paso 3: Si el gas se recolecta sobre agua, buscar la presión de vapor de agua a esa temperatura y restarla de la presión barométrica total.",
        "Paso 4: Utilizar R = 0.08206 atm L / mol K cuando la presión esté en atmósferas y el volumen en litros.",
        "Paso 5: Para la ley de Graham: el gas más ligero siempre se mueve, difunde o escapa más rápido."
      ]
    },
    stepByStepExamples: [
      {
        title: "Problema Canónico UCV (Parcial 3): Recolección de Oxígeno Sobre Agua en Laboratorio",
        problemStatement: "En el laboratorio de Química I de la UCV, se descompone térmicamente clorato de potasio obteniéndose gas oxígeno (O2), el cual se recolecta sobre agua a 25.0 °C en una probeta invertida. El volumen medido es 450.0 mL y la presión barométrica en Caracas ese día es de 755.0 mmHg. Sabiendo que la presión de vapor del agua a 25.0 °C es 23.8 mmHg, calcule los gramos de O2 seco recolectados.",
        deductiveSteps: [
          "Paso 1: Presión seca de O2 por la ley de Dalton: P(O2) = P_total - P(H2O) = 755.0 mmHg - 23.8 mmHg = 731.2 mmHg.",
          "Paso 2: Conversión de unidades a estándar: Presión: P = 731.2 mmHg / 760.0 mmHg/atm = 0.9621 atm. Volumen: V = 450.0 mL / 1000 mL/L = 0.4500 L. Temperatura: T = 25.0 + 273.15 = 298.15 K.",
          "Paso 3: Moles de gas O2 usando PV = nRT: n = PV / (RT) = (0.9621 atm * 0.4500 L) / (0.08206 atm L / mol K * 298.15 K).",
          "Paso 4: Evaluación numérica: n = 0.4329 / 24.466 = 0.01769 moles de O2.",
          "Paso 5: Masa en gramos de O2: Masa molar de O2 = 2 * 16.00 = 32.00 g/mol. Masa = n * M = 0.01769 moles * 32.00 g/mol = 0.566 g de O2.",
          "Paso 6: Redondeo de cifras significativas: La medida de volumen (450.0 mL) tiene 4 cifras y la presión tiene 4 cifras. Se reportan 0.566 g de O2."
        ],
        finalResult: "Ignorar la presión de vapor del agua sobreestima falsamente la masa de gas recolectada en el laboratorio."
      }
    ],
    commonErrorsAlerts: [
      {
        trap: "Trampa de usar temperatura en grados Celsius",
        correction: "Sustituir t = 25 °C en PV = nRT; la escala de los gases exige temperatura termodinámica absoluta en Kelvin."
      },
      {
        trap: "Trampa de no restar el vapor de agua",
        correction: "Usar la presión atmosférica directa como presión del gas; el gas recolectado está húmedo y saturado de vapor de agua."
      }
    ],
    studyTechniquesHub: {
      activeRecallFlashcards: [
        {
          front: "¿Por qué debe restarse la presión de vapor de agua al recolectar un gas sobre una cuba hidroneumática?",
          back: "Porque el espacio gaseoso no contiene únicamente el gas producido, sino también moléculas de agua que se evaporaron hasta alcanzar el equilibrio líquido-vapor a esa temperatura."
        },
        {
          front: "¿Qué gas difunde más rápido según la ley de Graham: el amoníaco (NH3, M = 17 g/mol) o el cloruro de hidrógeno (HCl, M = 36.5 g/mol)?",
          back: "El amoníaco NH3, porque al tener menor masa molecular sus moléculas se desplazan a mayor velocidad promedio cuadrática (v es inversamente proporcional a la raíz cuadrada de M)."
        }
      ],
      cornellSynthesis: {
        cues: ["PV = nRT", "P_gas = P_total - P_H2O", "Ley de Graham", "Van der Waals"],
        notes: [
          "1. T siempre en Kelvin (T = °C + 273.15).",
          "2. R = 0.08206 atm L / mol K.",
          "3. Gases sobre agua: restar P_vapor de H2O.",
          "4. Graham: velocidad inversamente proporcional a raíz de M."
        ],
        summary: "Ecuaciones de estado de gases ideales y reales, leyes de Dalton y comportamiento cinético-molecular."
      },
      conceptMapNodes: "Gases Ideales y Reales\n  ├── Ecuación de Estado: PV = nRT -> Densidad d = PM / RT\n  ├── Mezclas: Dalton P_total = sum(P_i) | Gases sobre agua: P_gas = P_barométrica - P_H2O(T)\n  └── Cinética: Graham (menor M difunde más rápido) | Reales: Van der Waals"
    },
    generatedQuestions: [
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Gases Recolectados Sobre Agua",
        tipo: "opcion_multiple",
        pregunta: "Se recolecta gas nitrógeno sobre agua a $20^\\circ\\text{C}$ registrándose una presión barométrica total de $760\\,\\text{mmHg}$. Si la presión de vapor del agua a $20^\\circ\\text{C}$ es $17.5\\,\\text{mmHg}$, ¿cuál es la presión parcial del gas nitrógeno seco?",
        opciones: [
          "$742.5\\,\\text{mmHg}$",
          "$777.5\\,\\text{mmHg}$",
          "$760.0\\,\\text{mmHg}$",
          "$17.5\\,\\text{mmHg}$"
        ],
        correcta: "$742.5\\,\\text{mmHg}$",
        justificacion: "**Concepto Fundamental:** Ley de Dalton para Gases Recolectados Sobre Agua.\n\n**Resolución:** Por la ley de Dalton: $P_{\\text{total}} = P_{\\text{gas}} + P_{\\text{vapor } \\text{H}_2\\text{O}} \\implies P_{\\text{N}_2} = 760.0\\,\\text{mmHg} - 17.5\\,\\text{mmHg} = 742.5\\,\\text{mmHg}$."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Ley de Efusión de Graham",
        tipo: "opcion_multiple",
        pregunta: "¿Cuántas veces más rápido se difunde el gas helio ($\\text{He}$, $M = 4.0\\,\\text{g/mol}$) en comparación con el gas dióxido de azufre ($\\text{SO}_2$, $M = 64.0\\,\\text{g/mol}$) a la misma temperatura?",
        opciones: [
          "Exactamente $4.0$ veces más rápido",
          "Exactamente $16.0$ veces más rápido",
          "Exactamente $2.0$ veces más rápido",
          "Ambos se difunden a la misma velocidad por ser gases"
        ],
        correcta: "Exactamente $4.0$ veces más rápido",
        justificacion: "**Concepto Fundamental:** Ley de Graham de Difusión Gaseosa.\n\n**Resolución:** La ley de Graham establece: $\\frac{r_{\\text{He}}}{r_{\\text{SO}_2}} = \\sqrt{\\frac{M_{\\text{SO}_2}}{M_{\\text{He}}}} = \\sqrt{\\frac{64.0}{4.0}} = \\sqrt{16} = 4.0$. El helio se difunde 4 veces más rápido."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Cálculo de Densidad de Gases",
        tipo: "opcion_multiple",
        pregunta: "¿Cuál es la densidad del gas dióxido de carbono $\\text{CO}_2$ ($M = 44.01\\,\\text{g/mol}$) en condiciones normales de presión y temperatura (CNPT: $1.0\\,\\text{atm}$ y $273.15\\,\\text{K}$)?",
        opciones: [
          "$1.96\\,\\text{g/L}$",
          "$0.51\\,\\text{g/L}$",
          "$44.0\\,\\text{g/L}$",
          "$2.85\\,\\text{g/L}$"
        ],
        correcta: "$1.96\\,\\text{g/L}$",
        justificacion: "**Concepto Fundamental:** Densidad de Gases Ideales $\\rho = \\frac{PM}{RT}$.\n\n**Resolución:** $\\rho = \\frac{(1.0\\,\\text{atm})(44.01\\,\\text{g/mol})}{(0.08206\\,\\text{atm L/mol K})(273.15\\,\\text{K})} = \\frac{44.01}{22.414} \\approx 1.963\\,\\text{g/L}$."
      }
    ],
    multimediaResources: null,
    researchPrompts: null,
    researchPrompt: null
  },

  // 10. DISOLUCIONES IDEALES, CONCENTRACIÓN Y PROPIEDADES COLIGATIVAS
  {
    id: "santiago-qgi-disoluciones-coligativas-guide",
    evaluationEventId: "santiago-qgi-parcial-3",
    guideMetadata: {
      title: "Principios de Química I: Disoluciones Ideales, Concentración y Propiedades Coligativas",
      area: "Principios de Química I · Código 3401 (UCV Ciencias)",
      summary: "Unidades de concentración física y química (M, m, X, %m/m, %m/v), Ley de Raoult para presión de vapor, aumento ebulloscópico, descenso crioscópico, presión osmótica y factor de van 't Hoff i."
    },
    phenomenonAndTheory: "Las propiedades coligativas son aquellas propiedades físicas de las disoluciones que dependen exclusivamente del número total de partículas de soluto presentes en una masa o volumen dado de disolvente, y no de la naturaleza química de dichas partículas. Existen cuatro propiedades coligativas fundamentales: la disminución de la presión de vapor (Ley de Raoult), la elevación del punto de ebullición (ebulloscopía), el descenso del punto de congelación (crioscopía) y la presión osmótica. Cuando un soluto no volátil se disuelve en agua, estabiliza la fase líquida reduciendo su potencial químico; por tanto, el agua hierve a mayor temperatura y congela a menor temperatura bajo cero. Si el soluto es un electrolito que se disocia en iones libres (como NaCl o CaCl2), cada mol de sal genera múltiples moles de partículas, amplificando el efecto coligativo según el factor de van 't Hoff (i).",
    glossary: [
      {
        term: "Molaridad (M)",
        symbolOrUnit: "M = \\frac{n_{\\text{soluto}}}{V_{\\text{disolución}} [\\mathrm{L}]}",
        definition: "Concentración expresada en número de moles de soluto por litro de disolución total."
      },
      {
        term: "Molalidad (m)",
        symbolOrUnit: "m = \\frac{n_{\\text{soluto}}}{m_{\\text{disolvente}} [\\mathrm{kg}]}",
        definition: "Concentración independiente de la temperatura expresada en moles de soluto por kilogramo de disolvente puro."
      },
      {
        term: "Factor de van 't Hoff (i)",
        symbolOrUnit: "i = \\frac{\\text{moles de partículas reales en disolución}}{\\text{moles de fórmula disuelta}}",
        definition: "Número de iones disociados en solución ideal: i = 1 para no electrolitos (glucosa), i = 2 para NaCl, i = 3 para CaCl2, i = 4 para AlCl3."
      },
      {
        term: "Presión Osmótica (Pi)",
        symbolOrUnit: "\\Pi = i M R T",
        definition: "Presión hidrostática requerida para detener el flujo espontáneo de disolvente a través de una membrana semipermeable."
      }
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: "Descenso Crioscópico",
          latex: "\\Delta T_f = K_f \\cdot m \\cdot i, \\quad T_f = T_f^\\circ - \\Delta T_f",
          application: "Calcular el nuevo punto de congelación bajo cero de una solución acuosa (Kf = 1.86 °C kg/mol para agua)."
        },
        {
          name: "Aumento Ebulloscópico",
          latex: "\\Delta T_b = K_b \\cdot m \\cdot i, \\quad T_b = T_b^\\circ + \\Delta T_b",
          application: "Calcular la temperatura de ebullición superior a 100 °C (Kb = 0.512 °C kg/mol para agua)."
        },
        {
          name: "Presión Osmótica",
          latex: "\\Pi = i M R T",
          application: "Determinar masas molares de macromoléculas a partir de medidas de presión osmótica."
        }
      ],
      mnemonicsAndPatterns: [
        "Paso 1: Identificar si el soluto es un no electrolito (i = 1, como glucosa, sacarosa o urea) o un electrolito (sales o ácidos fuertes disociados).",
        "Paso 2: Calcular el factor de van 't Hoff ideal i contando los iones producidos por unidad de fórmula (ej. Na2SO4 -> 2 Na+ + 1 SO4²- implica i = 3).",
        "Paso 3: Para crioscopía y ebulloscopía, utilizar estrictamente la Molalidad (moles de soluto / kg de agua), NO la Molaridad.",
        "Paso 4: Multiplicar Delta Tf = Kf * m * i y recordar que la temperatura de congelación es negativa: Tf = 0 - Delta Tf.",
        "Paso 5: Para ebullición, sumar al punto normal: Tb = 100 + Delta Tb."
      ]
    },
    stepByStepExamples: [
      {
        title: "Problema Canónico UCV (Parcial 3): Descenso Crioscópico Comparativo con Factor de van 't Hoff",
        problemStatement: "En el laboratorio se preparan disoluciones acuosas 0.10 m de cuatro sustancias distintas: a) Glucosa (C6H12O6); b) Cloruro de sodio (NaCl); c) Cloruro de calcio (CaCl2); d) Cloruro de aluminio (AlCl3). Calcule el punto de congelación exacto de cada una asumiendo comportamiento ideal (Kf del agua = 1.86 °C kg/mol) y ordénelas de mayor a menor punto de congelación.",
        deductiveSteps: [
          "Paso 1: Determinamos el factor de van 't Hoff i para cada sustancia: Glucosa: no electrolito => i = 1. NaCl: se disocia en Na+ + Cl- => i = 2. CaCl2: se disocia en Ca²⁺ + 2 Cl- => i = 3. AlCl3: se disocia en Al³⁺ + 3 Cl- => i = 4.",
          "Paso 2: Como todas tienen la misma molalidad m = 0.10 mol/kg, el descenso crioscópico es Delta Tf = Kf * m * i = 1.86 * 0.10 * i = 0.186 * i °C.",
          "Paso 3: Calculamos Delta Tf y la temperatura de congelación Tf = 0 - Delta Tf: Para Glucosa: Delta Tf = 0.186 * 1 = 0.186 °C => Tf = -0.186 °C. Para NaCl: Delta Tf = 0.186 * 2 = 0.372 °C => Tf = -0.372 °C. Para CaCl2: Delta Tf = 0.186 * 3 = 0.558 °C => Tf = -0.558 °C. Para AlCl3: Delta Tf = 0.186 * 4 = 0.744 °C => Tf = -0.744 °C.",
          "Paso 4: Orden de mayor a menor punto de congelación (el valor más alto es el más cercano a cero): Tf(Glucosa) [-0.186 °C] > Tf(NaCl) [-0.372 °C] > Tf(CaCl2) [-0.558 °C] > Tf(AlCl3) [-0.744 °C]."
        ],
        finalResult: "A mayor número de iones disociados, mayor es el descenso crioscópico y menor es la temperatura de congelación resultante."
      }
    ],
    commonErrorsAlerts: [
      {
        trap: "Trampa del factor de van 't Hoff en electrolitos",
        correction: "Olvidar multiplicar por i en sales solubles como NaCl o CaCl2, tratando a todas las disoluciones como si fueran glucosa."
      },
      {
        trap: "Trampa de signo en temperatura de congelación",
        correction: "Reportar que el agua congela a +0.74 °C; el descenso significa que congela bajo cero (-0.74 °C)."
      }
    ],
    studyTechniquesHub: {
      activeRecallFlashcards: [
        {
          front: "¿Por qué una disolución 0.1 m de CaCl2 congela a menor temperatura que una disolución 0.1 m de NaCl?",
          back: "Porque CaCl2 genera 3 iones por unidad fórmula (i = 3) mientras que NaCl solo genera 2 iones (i = 2); al haber mayor concentración de partículas en solución, el descenso crioscópico Delta Tf = Kf * m * i es 1.5 veces mayor."
        },
        {
          front: "¿Por qué en crioscopía y ebulloscopía se usa Molalidad (m) en lugar de Molaridad (M)?",
          back: "Porque la molalidad relaciona moles con la masa de disolvente (kg), la cual no varía con la temperatura, mientras que el volumen de la disolución se dilata o contrae al cambiar la temperatura."
        }
      ],
      cornellSynthesis: {
        cues: ["Propiedades Coligativas", "Factor de van 't Hoff i", "Descenso Crioscópico", "Presión Osmótica"],
        notes: [
          "1. Dependen del número de partículas, no de su identidad química.",
          "2. i = iones disociados (1 para no electrolitos).",
          "3. Delta Tf = Kf * m * i (congelación bajo cero).",
          "4. Presión osmótica Pi = i M R T."
        ],
        summary: "Termodinámica de disoluciones ideales, factor de van 't Hoff y cálculo riguroso de propiedades coligativas en la UCV."
      },
      conceptMapNodes: "Propiedades Coligativas\n  ├── Raoult: Disminución de presión de vapor\n  ├── Ebulloscopía: Delta Tb = Kb * m * i  (Sube de 100 °C)\n  ├── Crioscopía: Delta Tf = Kf * m * i  (Baja de 0 °C)\n  └── Presión Osmótica: Pi = i M R T"
    },
    generatedQuestions: [
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Factor de van 't Hoff y Crioscopía",
        tipo: "opcion_multiple",
        pregunta: "¿Cuál de las siguientes disoluciones acuosas $0.10\\,\\text{m}$ registrará el punto de congelación más bajo (menor temperatura bajo cero)?",
        opciones: [
          "Cloruro de aluminio $\\text{AlCl}_3$ ($i \\approx 4$)",
          "Cloruro de sodio $\\text{NaCl}$ ($i \\approx 2$)",
          "Cloruro de calcio $\\text{CaCl}_2$ ($i \\approx 3$)",
          "Glucosa $\\text{C}_6\\text{H}_{12}\\text{O}_6$ ($i = 1$)"
        ],
        correcta: "Cloruro de aluminio $\\text{AlCl}_3$ ($i \\approx 4$)",
        justificacion: "**Concepto Fundamental:** Descenso Crioscópico Proporcional a $m \\cdot i$.\n\n**Resolución:** El descenso crioscópico es $\\Delta T_f = K_f \\cdot m \\cdot i$. A igual molalidad ($0.10\\,\\text{m}$), la sal que produzca mayor número de iones disociados generará el mayor descenso de temperatura. $\\text{AlCl}_3$ se disocia en $1\\,\\text{Al}^{3+}$ y $3\\,\\text{Cl}^-$, dando $i = 4$. Esto produce el mayor $\\Delta T_f$ y por tanto el punto de congelación más bajo."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Ley de Raoult y Presión de Vapor",
        tipo: "opcion_multiple",
        pregunta: "A $25^\\circ\\text{C}$, la presión de vapor del agua pura es $23.8\\,\\text{mmHg}$. Se disuelven $0.50\\,\\text{moles}$ de glucosa (soluto no volátil) en $4.50\\,\\text{moles}$ de agua. Según la Ley de Raoult, ¿cuál es la presión de vapor de la disolución resultante?",
        opciones: [
          "$21.4\\,\\text{mmHg}$",
          "$23.8\\,\\text{mmHg}$",
          "$2.38\\,\\text{mmHg}$",
          "$26.2\\,\\text{mmHg}$"
        ],
        correcta: "$21.4\\,\\text{mmHg}$",
        justificacion: "**Concepto Fundamental:** Ley de Raoult para Solutos No Volátiles.\n\n**Resolución:** La fracción molar del solvente agua es $X_{\\text{agua}} = \\frac{4.50}{0.50 + 4.50} = \\frac{4.50}{5.00} = 0.90$. La presión de vapor de la disolución es $P_{\\text{disolución}} = X_{\\text{agua}} \\cdot P_{\\text{agua}}^\\circ = 0.90 \\times 23.8\\,\\text{mmHg} = 21.42\\,\\text{mmHg} \\approx 21.4\\,\\text{mmHg}$."
      },
      {
        area: "Principios de Química I · Código 3401 (UCV Ciencias)",
        tema: "Cálculo de Molalidad",
        tipo: "opcion_multiple",
        pregunta: "Se disuelven $18.0\\,\\text{g}$ de glucosa ($\\text{C}_6\\text{H}_{12}\\text{O}_6$, $M = 180.16\\,\\text{g/mol}$) en $200.0\\,\\text{g}$ de agua destilada. ¿Cuál es la molalidad ($m$) de la disolución?",
        opciones: [
          "$0.50\\,\\text{m}$ (o $\\text{mol/kg}$)",
          "$0.10\\,\\text{m}$",
          "$0.05\\,\\text{m}$",
          "$0.90\\,\\text{m}$"
        ],
        correcta: "$0.50\\,\\text{m}$ (o $\\text{mol/kg}$)",
        justificacion: "**Concepto Fundamental:** Definición de Molalidad $m = \\frac{n_{\\text{soluto}}}{m_{\\text{solvente}} [\\mathrm{kg}]}$.\n\n**Resolución:** Moles de glucosa: $n = 18.0\\,\\text{g} / 180.16\\,\\text{g/mol} \\approx 0.10\\,\\text{moles}$. Masa de agua en kilogramos: $200.0\\,\\text{g} / 1000 = 0.200\\,\\text{kg}$. Molalidad: $m = \\frac{0.10\\,\\text{mol}}{0.200\\,\\text{kg}} = 0.50\\,\\text{mol/kg}$."
      }
    ],
    multimediaResources: null,
    researchPrompts: null,
    researchPrompt: null
  }
];

// Construir el archivo TypeScript
let content = `/**
 * @file santiago_quimica1.ts
 * @description Guías Académicas Deconstruidas Oficiales (7 Pilares) para SANTIAGO_QUIMICA1_GUIDES.
 * Formato canónico riguroso compatible con DeconstructedAcademicGuide.
 * Basado directamente en la Guía Oficial de Principios de Química I (Código 3401 · UCV Ciencias)
 * y Guías de Problemas de la Escuela de Química (UCV).
 */

import type { DeconstructedAcademicGuide } from '../../types/deconstruction.types';
import { SANTIAGO_MULTIMEDIA_CATALOG } from '../santiago_multimedia';
import { SANTIAGO_RESEARCH_PROMPTS } from '../santiago_prompts';

export const SANTIAGO_QUIMICA1_GUIDES: DeconstructedAcademicGuide[] = [
`;

QUIMICA1_GUIDES.forEach((guide, idx) => {
  const mediaKey = guide.id.replace('-guide', '');
  const promptKey = guide.id.replace('santiago-', 'santiago-prompt-').replace('-guide', '');

  content += `  {
    "id": ${JSON.stringify(guide.id)},
    "evaluationEventId": ${JSON.stringify(guide.evaluationEventId)},
    "guideMetadata": ${JSON.stringify(guide.guideMetadata, null, 6).trim()},
    "phenomenonAndTheory": ${JSON.stringify(guide.phenomenonAndTheory)},
    "glossary": ${JSON.stringify(guide.glossary, null, 6).trim()},
    "formulasAndStrategies": ${JSON.stringify(guide.formulasAndStrategies, null, 6).trim()},
    "stepByStepExamples": ${JSON.stringify(guide.stepByStepExamples, null, 6).trim()},
    "commonErrorsAlerts": ${JSON.stringify(guide.commonErrorsAlerts, null, 6).trim()},
    "studyTechniquesHub": ${JSON.stringify(guide.studyTechniquesHub, null, 6).trim()},
    "generatedQuestions": ${JSON.stringify(guide.generatedQuestions, null, 6).trim()},
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG[${JSON.stringify(mediaKey)}],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS[${JSON.stringify(promptKey)}]],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS[${JSON.stringify(promptKey)}],
  }${idx < QUIMICA1_GUIDES.length - 1 ? ',' : ''}
`;
});

content += `];
`;

fs.writeFileSync(outputPath, content, 'utf8');
console.log(`✅ Archivo santiago_quimica1.ts generado con éxito en ${outputPath}`);
