/**
 * @file santiago_quimica1.ts
 * @description Guías Académicas Deconstruidas Oficiales (7 Pilares) para SANTIAGO_QUIMICA1_GUIDES.
 * Formato canónico riguroso compatible con DeconstructedAcademicGuide.
 */

import type { DeconstructedAcademicGuide } from '../../types/deconstruction.types';
import { SANTIAGO_MULTIMEDIA_CATALOG } from '../santiago_multimedia';
import { SANTIAGO_RESEARCH_PROMPTS } from '../santiago_prompts';

export const SANTIAGO_QUIMICA1_GUIDES: DeconstructedAcademicGuide[] = [
  {
    "id": "santiago-qgi-propiedades-guide",
    "evaluationEventId": "santiago-qgi-parcial-1",
    "guideMetadata": {
      "title": "Principios de Química I: Materia, Medidas, Cifras Significativas y Densidad",
      "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
      "summary": "Clasificación sistemática de la materia, transformaciones físicas y químicas, análisis dimensional en cadena por factores unitarios, metrología de laboratorio y propagación estricta de cifras significativas."
    },
    "phenomenonAndTheory": "La química estudia la materia mediante la observación de sus transformaciones y la medición cuantitativa de sus magnitudes físicas. La materia se presenta como sustancias puras (elementos formados por un solo tipo de átomo, o compuestos con proporciones fijas e invariables de elementos) o como mezclas (homogéneas o disoluciones con composición uniforme en una sola fase, y heterogéneas con fases físicamente distinguibles). En el laboratorio de la UCV, toda medición experimental conlleva una apreciación instrumental e incertidumbre. Para no inventar exactitud artificial, las cifras significativas dictan cuántos dígitos son físicamente válidos: en sumas y restas manda el menor número de decimales, mientras que en multiplicaciones y divisiones manda el menor número de cifras significativas totales.",
    "glossary": [
      {
        "term": "Sustancia Pura",
        "definition": "Materia que tiene una composición química fija y propiedades características definidas e inalterables en cualquier muestra.",
        "symbolOrUnit": "Elementos y Compuestos"
      },
      {
        "term": "Mezcla Homogénea (Disolución)",
        "definition": "Combinación física de dos o más sustancias que se distribuyen uniformemente a nivel molecular formando una sola fase visual.",
        "symbolOrUnit": "Fase única"
      },
      {
        "term": "Propiedad Intensiva",
        "definition": "Propiedad física que no depende de la cantidad de masa presente en la muestra, como la densidad, temperatura y punto de ebullición.",
        "symbolOrUnit": "Independiente de la masa"
      },
      {
        "term": "Análisis Dimensional",
        "definition": "Método algorítmico de conversión que multiplica cantidades por factores unitarios fraccionarios para cancelar unidades no deseadas.",
        "symbolOrUnit": "Factores de conversión"
      },
      {
        "term": "Cifras Significativas",
        "definition": "Todos los dígitos medidos con certeza por la escala de un instrumento analítico más un único dígito final estimado o incierto.",
        "symbolOrUnit": "Dígitos válidos"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Sustancia Pura",
          "latex": "Elementos y Compuestos",
          "application": "Materia que tiene una composición química fija y propiedades características definidas e inalterables en cualquier muestra."
        },
        {
          "name": "Mezcla Homogénea (Disolución)",
          "latex": "Fase única",
          "application": "Combinación física de dos o más sustancias que se distribuyen uniformemente a nivel molecular formando una sola fase visual."
        },
        {
          "name": "Propiedad Intensiva",
          "latex": "Independiente de la masa",
          "application": "Propiedad física que no depende de la cantidad de masa presente en la muestra, como la densidad, temperatura y punto de ebullición."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Identificar si la muestra bajo estudio es una sustancia pura o una mezcla examinando si puede separarse por métodos físicos simples.",
        "Paso 2: Registrar cada dato experimental anotando la magnitud numérica junto con la apreciación del instrumento utilizado.",
        "Paso 3: Para conversiones de unidades, escribir la cadena de factores unitarios cancelando las unidades intermedias en diagonal.",
        "Paso 4: En sumas o restas de datos, redondear el resultado final para que conserve exactamente el mismo número de decimales que la medida con menos decimales.",
        "Paso 5: En multiplicaciones o divisiones (como el cálculo de densidad d = m / V), redondear el resultado final al número de cifras significativas de la medida más pobre.",
        "Paso 6: Comparar el valor experimental de densidad obtenido con la literatura de referencia y calcular el error relativo porcentual.",
        "Regla 1: Los ceros entre dígitos distintos de cero siempre son significativos (ej. 405 tiene 3 cifras).",
        "Regla 2: Los ceros a la izquierda del primer dígito distinto de cero nunca son significativos; solo ubican el punto decimal (ej. 0.02 tiene 1 cifra).",
        "Regla 3: Los ceros a la derecha del punto decimal en un número con coma sí son significativos (ej. 3.00 tiene 3 cifras).",
        "Regla 4: Los factores de conversión exactos (ej. 1 pulgada = 2.54 cm exactamente, o 1 kg = 1000 g) tienen infinitas cifras significativas y no limitan la precisión."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: En el laboratorio de Química I de la UCV, un estudiante...",
        "problemStatement": "En el laboratorio de Química I de la UCV, un estudiante pesa una barra cilíndrica de metal desconocido en una balanza analítica registrando 48.362 g. Para medir su volumen, vierte agua en una probeta graduada hasta 25.0 mL, introduce la barra y el nivel sube a 31.2 mL. Calcule la densidad del metal en g/cm³ y en unidades SI (kg/m³) aplicando rigurosamente las reglas de cifras significativas, e identifique de qué metal se trata si los valores teóricos son Hierro (7.87 g/cm³) y Níquel (8.90 g/cm³).",
        "deductiveSteps": [
          "Paso 1: Calculamos el volumen de la barra por diferencia de lecturas en la probeta: V = V_final - V_inicial = 31.2 mL - 25.0 mL = 6.2 mL.",
          "Paso 2: Aplicamos la regla de cifras en la resta: 31.2 tiene 1 decimal y 25.0 tiene 1 decimal. El resultado 6.2 mL conserva 1 decimal y tiene únicamente 2 cifras significativas (el 6 es seguro y el 2 es incierto).",
          "Paso 3: Calculamos la densidad dividiendo masa entre volumen: d = 48.362 g / 6.2 mL = 7.80032... g/mL.",
          "Paso 4: Aplicamos la regla de cifras en la división: la masa tiene 5 cifras significativas (48.362) y el volumen tiene 2 cifras significativas (6.2). El resultado final debe redondearse estrictamente a 2 cifras significativas: d = 7.8 g/mL = 7.8 g/cm³.",
          "Paso 5: Convertimos a unidades del SI (kg/m³) usando análisis dimensional en cadena: (7.8 g / 1 cm³) * (1 kg / 1000 g) * (100 cm / 1 m)³ = (7.8 / 1000) * 1,000,000 kg/m³ = 7.8 * 10³ kg/m³.",
          "Paso 6: Comparando con los valores teóricos, 7.8 g/cm³ concuerda estrechamente con el Hierro (7.87 g/cm³), con un error relativo de solo 0.9%."
        ],
        "finalResult": "En el laboratorio de la UCV, un cálculo con cifras significativas mal redondeadas anula automáticamente la validez analítica de la respuesta."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 1 UCV",
        "correction": "Preguntar cuántas cifras significativas tiene la operación (12.45 - 12.41) / 3.20. La resta da 0.04 (solo 1 cifra significativa), por lo que el resultado final solo puede tener una cifra."
      },
      {
        "trap": "Trampa de unidades",
        "correction": "Mezclar mililitros (mL) con metros cúbicos (m³) sin usar la equivalencia puente fundamental: 1 mL = 1 cm³."
      },
      {
        "trap": "Trampa de propiedad intensiva",
        "correction": "Afirmar que si se duplica la masa de un líquido su densidad se duplica, ignorando que el volumen también se duplica."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Reportar la densidad con 5 cifras significativas (7.8003 g/cm³) porque la calculadora arrojó todos los dígitos en pantalla."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Olvidar elevar al cubo el factor de conversión de centímetros a metros al transformar unidades de volumen cúbico."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Contar los ceros a la izquierda como cifras significativas: en 0.0045 g solo hay dos cifras significativas (el 4 y el 5)."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Sustancia Pura?",
          "back": "Materia que tiene una composición química fija y propiedades características definidas e inalterables en cualquier muestra. (Notación: Elementos y Compuestos)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Mezcla Homogénea (Disolución)?",
          "back": "Combinación física de dos o más sustancias que se distribuyen uniformemente a nivel molecular formando una sola fase visual. (Notación: Fase única)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Propiedad Intensiva?",
          "back": "Propiedad física que no depende de la cantidad de masa presente en la muestra, como la densidad, temperatura y punto de ebullición. (Notación: Independiente de la masa)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Análisis Dimensional?",
          "back": "Método algorítmico de conversión que multiplica cantidades por factores unitarios fraccionarios para cancelar unidades no deseadas. (Notación: Factores de conversión)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Cifras Significativas?",
          "back": "Todos los dígitos medidos con certeza por la escala de un instrumento analítico más un único dígito final estimado o incierto. (Notación: Dígitos válidos)"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Sustancia Pura",
          "Mezcla Homogénea (Disolución)",
          "Propiedad Intensiva",
          "Análisis Dimensional",
          "Cifras Significativas"
        ],
        "notes": [
          "Paso 1: Identificar si la muestra bajo estudio es una sustancia pura o una mezcla examinando si puede separarse por métodos físicos simples.",
          "Paso 2: Registrar cada dato experimental anotando la magnitud numérica junto con la apreciación del instrumento utilizado.",
          "Paso 3: Para conversiones de unidades, escribir la cadena de factores unitarios cancelando las unidades intermedias en diagonal.",
          "Paso 4: En sumas o restas de datos, redondear el resultado final para que conserve exactamente el mismo número de decimales que la medida con menos decimales.",
          "Paso 5: En multiplicaciones o divisiones (como el cálculo de densidad d = m / V), redondear el resultado final al número de cifras significativas de la medida más pobre."
        ],
        "summary": "Clasificación sistemática de la materia, transformaciones físicas y químicas, análisis dimensional en cadena por factores unitarios, metrología de laboratorio y propagación estricta de cifras significativas."
      },
      "conceptMapNodes": "Principios de Química I: Materia, Medidas, Cifras Significativas y Densidad\n  ├── Fundamento: Principios de Química I · Código 3401 (UCV Ciencias)\n  ├── Ecuaciones: Sustancia Pura, Mezcla Homogénea (Disolución), Propiedad Intensiva\n  └── Protocolo: Paso 1: Identificar si la muestra bajo estudio es una sustancia pura o una mezcla examinando si puede separarse por métodos físicos simples. -> Paso 2: Registrar cada dato experimental anotando la magnitud numérica junto con la apreciación del instrumento utilizado. -> Paso 3: Para conversiones de unidades, escribir la cadena de factores unitarios cancelando las unidades intermedias en diagonal."
    },
    "generatedQuestions": [
      {
        "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
        "tema": "Principios de Química I: Materia, Medidas, Cifras Significativas y Densidad",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Principios de Química I: Materia, Medidas, Cifras Significativas y Densidad?",
        "opciones": [
          "Clasificación sistemática de la materia, transformaciones físicas y químicas, análisis dimensional e",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Clasificación sistemática de la materia, transformaciones físicas y químicas, análisis dimensional e",
        "justificacion": "**Concepto Fundamental:** Principios de Química I: Materia, Medidas, Cifras Significativas y Densidad\n\n**Resolución Directa:** La química estudia la materia mediante la observación de sus transformaciones y la medición cuantitativa de sus magnitudes físicas. La materia se presenta como sustancias puras (el..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-qgi-propiedades'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-medidas']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-medidas'],
  },
  {
    "id": "santiago-qgi-atomos-guide",
    "evaluationEventId": "santiago-qgi-parcial-1",
    "guideMetadata": {
      "title": "Principios de Química I: Leyes Ponderales, Modelos Atómicos e Isótopos",
      "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
      "summary": "Fundamentos cuantitativos de las leyes clásicas de la química, evolución de modelos atómicos (Dalton, Thomson, Rutherford), número atómico Z, número másico A y cálculo de masa atómica promedio."
    },
    "phenomenonAndTheory": "La teoría atómica moderna se construyó sobre las tres leyes ponderales clásicas de la química: la Ley de Conservación de la Masa de Lavoisier (la masa total no se crea ni se destruye en una reacción química ordinaria), la Ley de las Proporciones Definidas de Proust (un compuesto puro siempre contiene exactamente los mismos elementos en idéntica proporción de masa), y la Ley de las Proporciones Múltiples de Dalton (cuando dos elementos forman más de un compuesto, las masas de uno que se combinan con una masa fija del otro guardan una relación de números enteros sencillos). Los experimentos de Thomson con tubos de rayos catódicos revelaron el electrón, Millikan midió su carga elemental, y el bombardeo de láminas de oro por Rutherford demostró que el átomo posee un núcleo diminuto y denso cargado positivamente.",
    "glossary": [
      {
        "term": "Número Atómico Z",
        "definition": "Cantidad total de protones que residen en el núcleo atómico, que define la identidad química inmutable de cada elemento.",
        "symbolOrUnit": "Z = protones"
      },
      {
        "term": "Número Másico A",
        "definition": "Suma entera total de nucleones (protones más neutrones) presentes en el núcleo de un átomo individual.",
        "symbolOrUnit": "A = Z + N"
      },
      {
        "term": "Isótopos",
        "definition": "Átomos del mismo elemento químico que poseen idéntico número atómico Z pero diferente número de neutrones N y diferente masa másica A.",
        "symbolOrUnit": "Mismo Z, distinto A"
      },
      {
        "term": "Masa Atómica Promedio",
        "definition": "Media ponderada de las masas isotópicas de un elemento considerando la abundancia relativa natural de cada isótopo en la Tierra.",
        "symbolOrUnit": "u o g/mol"
      },
      {
        "term": "Ley de Proporciones Múltiples",
        "definition": "Principio de Dalton que establece que las razones entre masas de un elemento que reaccionan con masa fija de otro son fracciones de enteros pequeños (1:1, 1:2, 2:3).",
        "symbolOrUnit": "m1 / m2 = n1 / n2"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Número Atómico Z",
          "latex": "Z = protones",
          "application": "Cantidad total de protones que residen en el núcleo atómico, que define la identidad química inmutable de cada elemento."
        },
        {
          "name": "Número Másico A",
          "latex": "A = Z + N",
          "application": "Suma entera total de nucleones (protones más neutrones) presentes en el núcleo de un átomo individual."
        },
        {
          "name": "Isótopos",
          "latex": "Mismo Z, distinto A",
          "application": "Átomos del mismo elemento químico que poseen idéntico número atómico Z pero diferente número de neutrones N y diferente masa másica A."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Para demostrar la Ley de Proporciones Múltiples, tomar las masas de los compuestos y normalizar respecto a un gramo fijo del primer elemento.",
        "Paso 2: Dividir las masas normalizadas del segundo elemento entre sí y simplificar para obtener una razón de números enteros pequeños.",
        "Paso 3: Identificar nucleidos escribiendo el símbolo químico con el número másico A como superíndice izquierdo y el número atómico Z como subíndice.",
        "Paso 4: Calcular el número de neutrones restando directamente: N = A - Z.",
        "Paso 5: Para calcular la masa atómica promedio ponderada, multiplicar la masa exacta de cada isótopo por su porcentaje de abundancia dividido entre 100.",
        "Paso 6: Sumar todas las contribuciones isotópicas y redondear al número de cifras significativas dictado por las abundancias medidas.",
        "Regla 1: El número atómico Z es la huella digital del elemento; si cambia Z, cambia de elemento químico.",
        "Regla 2: En un ion monoatómico con carga q, el número de electrones es siempre e- = Z - q (restando la carga algebraica).",
        "Regla 3: Dos sustancias cumplen la ley de proporciones múltiples solo si están formadas exactamente por los mismos dos elementos químicos en relaciones cuantitativas distintas.",
        "Regla 4: La suma de los porcentajes de abundancia de todos los isótopos de un elemento debe sumar exactamente el 100%."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: El elemento cloro existe en la naturaleza como una mezc...",
        "problemStatement": "El elemento cloro existe en la naturaleza como una mezcla de dos isótopos estables: Cloro-35 con masa isotópica de 34.969 u y abundancia natural de 75.77%, y Cloro-37 con masa isotópica de 36.966 u y abundancia natural de 24.23%. Calcule la masa atómica promedio del cloro natural y determine el número de protones, neutrones y electrones en el anión cloruro 37Cl- (Z = 17).",
        "deductiveSteps": [
          "Paso 1: Planteamos la media ponderada para la masa atómica: Masa promedio = (Masa_Cl35 * %_Cl35 + Masa_Cl37 * %_Cl37) / 100.",
          "Paso 2: Sustituimos los valores numéricos: Masa promedio = (34.969 u * 75.77 + 36.966 u * 24.23) / 100.",
          "Paso 3: Calculamos cada sumando: primer término = 2649.5911 u; segundo término = 895.6862 u. Suma = 3545.2773 u.",
          "Paso 4: Dividimos entre 100: Masa promedio = 35.452773 u. Redondeando a 4 cifras significativas (debido a las abundancias 75.77% y 24.23%), obtenemos: 35.45 u (exactamente el valor de la tabla periódica).",
          "Paso 5: Analizamos la especie subatómica 37Cl- con Z = 17 y A = 37: Protones = Z = 17.",
          "Paso 6: Neutrones = A - Z = 37 - 17 = 20 neutrones. Como es un anión con carga negativa -1, ha ganado un electrón respecto al átomo neutro: Electrones = 17 + 1 = 18 electrones."
        ],
        "finalResult": "La masa atómica de la tabla periódica nunca es la masa de un átomo real, sino el promedio estadístico de la mezcla isotópica terrestre."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 1 UCV",
        "correction": "Preguntar si el CO y el CO2 demuestran la ley de proporciones definidas o múltiples. Son compuestos distintos formados por los mismos elementos, por lo que demuestran la ley de proporciones múltiples."
      },
      {
        "trap": "Trampa de Thomson vs Rutherford",
        "correction": "Atribuir el descubrimiento del núcleo a Thomson cuando fue Rutherford con la dispersión alfa quien lo demostró."
      },
      {
        "trap": "Trampa de número de masa",
        "correction": "Olvidar que los electrones no se cuentan en el número másico A porque su masa es despreciable frente a protones y neutrones."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Calcular el promedio aritmético simple sumando las dos masas y dividiendo entre 2, ignorando que uno de los isótopos es tres veces más abundante."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Confundir número másico A (un número entero de conteo) con masa atómica u (un valor decimal con unidades físicas)."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Restar electrones en un ion negativo en lugar de sumarlos."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Número Atómico Z?",
          "back": "Cantidad total de protones que residen en el núcleo atómico, que define la identidad química inmutable de cada elemento. (Notación: Z = protones)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Número Másico A?",
          "back": "Suma entera total de nucleones (protones más neutrones) presentes en el núcleo de un átomo individual. (Notación: A = Z + N)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Isótopos?",
          "back": "Átomos del mismo elemento químico que poseen idéntico número atómico Z pero diferente número de neutrones N y diferente masa másica A. (Notación: Mismo Z, distinto A)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Masa Atómica Promedio?",
          "back": "Media ponderada de las masas isotópicas de un elemento considerando la abundancia relativa natural de cada isótopo en la Tierra. (Notación: u o g/mol)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Ley de Proporciones Múltiples?",
          "back": "Principio de Dalton que establece que las razones entre masas de un elemento que reaccionan con masa fija de otro son fracciones de enteros pequeños (1:1, 1:2, 2:3). (Notación: m1 / m2 = n1 / n2)"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Número Atómico Z",
          "Número Másico A",
          "Isótopos",
          "Masa Atómica Promedio",
          "Ley de Proporciones Múltiples"
        ],
        "notes": [
          "Paso 1: Para demostrar la Ley de Proporciones Múltiples, tomar las masas de los compuestos y normalizar respecto a un gramo fijo del primer elemento.",
          "Paso 2: Dividir las masas normalizadas del segundo elemento entre sí y simplificar para obtener una razón de números enteros pequeños.",
          "Paso 3: Identificar nucleidos escribiendo el símbolo químico con el número másico A como superíndice izquierdo y el número atómico Z como subíndice.",
          "Paso 4: Calcular el número de neutrones restando directamente: N = A - Z.",
          "Paso 5: Para calcular la masa atómica promedio ponderada, multiplicar la masa exacta de cada isótopo por su porcentaje de abundancia dividido entre 100."
        ],
        "summary": "Fundamentos cuantitativos de las leyes clásicas de la química, evolución de modelos atómicos (Dalton, Thomson, Rutherford), número atómico Z, número másico A y cálculo de masa atómica promedio."
      },
      "conceptMapNodes": "Principios de Química I: Leyes Ponderales, Modelos Atómicos e Isótopos\n  ├── Fundamento: Principios de Química I · Código 3401 (UCV Ciencias)\n  ├── Ecuaciones: Número Atómico Z, Número Másico A, Isótopos\n  └── Protocolo: Paso 1: Para demostrar la Ley de Proporciones Múltiples, tomar las masas de los compuestos y normalizar respecto a un gramo fijo del primer elemento. -> Paso 2: Dividir las masas normalizadas del segundo elemento entre sí y simplificar para obtener una razón de números enteros pequeños. -> Paso 3: Identificar nucleidos escribiendo el símbolo químico con el número másico A como superíndice izquierdo y el número atómico Z como subíndice."
    },
    "generatedQuestions": [
      {
        "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
        "tema": "Principios de Química I: Leyes Ponderales, Modelos Atómicos e Isótopos",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Principios de Química I: Leyes Ponderales, Modelos Atómicos e Isótopos?",
        "opciones": [
          "Fundamentos cuantitativos de las leyes clásicas de la química, evolución de modelos atómicos (Dalton",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Fundamentos cuantitativos de las leyes clásicas de la química, evolución de modelos atómicos (Dalton",
        "justificacion": "**Concepto Fundamental:** Principios de Química I: Leyes Ponderales, Modelos Atómicos e Isótopos\n\n**Resolución Directa:** La teoría atómica moderna se construyó sobre las tres leyes ponderales clásicas de la química: la Ley de Conservación de la Masa de Lavoisier (la masa total no se crea ni se destru..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-qgi-atomos'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-medidas']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-medidas'],
  },
  {
    "id": "santiago-qgi-cuantica-guide",
    "evaluationEventId": "santiago-qgi-parcial-1",
    "guideMetadata": {
      "title": "Principios de Química I: Mecánica Cuántica, Números Cuánticos y Configuraciones Electrónicas",
      "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
      "summary": "Cuantización de la energía, modelo de Bohr, números cuánticos principal, secundario, magnético y de espín, formas de orbitales s, p, d, f y reglas de llenado electrónico con anomalías del cromo y cobre."
    },
    "phenomenonAndTheory": "La estructura electrónica de los átomos explica el comportamiento químico de la materia a través de la física cuántica. La radiación electromagnética transporta energía en paquetes discretos llamados fotones, descritos por la ecuación de Planck E = h*nu. El modelo atómico de Bohr demostró que los electrones no caen en espiral hacia el núcleo porque viven en niveles de energía estacionarios y cuantizados. La mecánica cuántica moderna, mediante la dualidad onda-partícula de De Broglie y el principio de incertidumbre de Heisenberg, sustituyó la noción de trayectorias u órbitas rígidas por orbitales atómicos: regiones tridimensionales del espacio donde existe una probabilidad del 90% de hallar al electrón, descritas por cuatro números cuánticos (n, l, ml, ms) y gobernadas por las reglas de Aufbau, Pauli y Hund.",
    "glossary": [
      {
        "term": "Número Cuántico Principal n",
        "definition": "Entero positivo (1, 2, 3...) que determina el nivel de energía principal y el tamaño promedio de la nube electrónica respecto al núcleo.",
        "symbolOrUnit": "n = 1, 2, 3..."
      },
      {
        "term": "Número Cuántico Azimutal l",
        "definition": "Entero que determina la forma geométrica del orbital atómico: l = 0 (orbital s esférico), l = 1 (orbital p bilobular), l = 2 (orbital d), l = 3 (orbital f).",
        "symbolOrUnit": "0 <= l <= n - 1"
      },
      {
        "term": "Número Cuántico Magnético ml",
        "definition": "Entero que especifica la orientación espacial tridimensional del orbital respecto a un campo magnético exterior.",
        "symbolOrUnit": "-l <= ml <= +l"
      },
      {
        "term": "Número Cuántico de Espín ms",
        "definition": "Momento angular intrínseco del electrón, que solo puede adoptar dos orientaciones posibles: +1/2 (giro hacia arriba) o -1/2 (giro hacia abajo).",
        "symbolOrUnit": "ms = +1/2, -1/2"
      },
      {
        "term": "Principio de Aufbau",
        "definition": "Regla de construcción progresiva que establece que los electrones ocupan primero los orbitales de menor energía disponible siguiendo la suma n + l.",
        "symbolOrUnit": "Regla n + l"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Número Cuántico Principal n",
          "latex": "n = 1, 2, 3...",
          "application": "Entero positivo (1, 2, 3...) que determina el nivel de energía principal y el tamaño promedio de la nube electrónica respecto al núcleo."
        },
        {
          "name": "Número Cuántico Azimutal l",
          "latex": "0 <= l <= n - 1",
          "application": "Entero que determina la forma geométrica del orbital atómico: l = 0 (orbital s esférico), l = 1 (orbital p bilobular), l = 2 (orbital d), l = 3 (orbital f)."
        },
        {
          "name": "Número Cuántico Magnético ml",
          "latex": "-l <= ml <= +l",
          "application": "Entero que especifica la orientación espacial tridimensional del orbital respecto a un campo magnético exterior."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Obtener el número atómico Z del elemento neutro para conocer la cantidad total de electrones que se deben acomodar.",
        "Paso 2: Seguir la regla de las diagonales (orden creciente de n + l): 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s...",
        "Paso 3: Llenar cada subnivel respetando las capacidades máximas: s aloja 2 e-, p aloja 6 e-, d aloja 10 e-, f aloja 14 e-.",
        "Paso 4: Aplicar el Principio de Exclusión de Pauli: jamás colocar más de dos electrones por cajita cuántica y con espines antiparalelos.",
        "Paso 5: Aplicar la Regla de Hund: en subniveles degenerados (como los 3 orbitales p o 5 orbitales d), colocar primero un electrón con espín paralelo en cada orbital antes de aparear.",
        "Paso 6: Verificar posibles excepciones termodinámicas de estabilidad: los metales de transición con d4 (como Cr) o d9 (como Cu) promocionan un electrón desde el subnivel s para alcanzar semilleno (d5) o lleno (d10).",
        "Regla 1: Dos electrones en el mismo átomo jamás pueden tener exactamente el mismo conjunto de los cuatro números cuánticos (Principio de Pauli).",
        "Regla 2: El número de orbitales dentro de un subnivel l es siempre 2*l + 1; por eso p tiene 3 orbitales y d tiene 5 orbitales.",
        "Regla 3: Si una especie tiene electrones desapareados es paramagnética; si todos sus electrones están en parejas de espines opuestos es diamagnética.",
        "Regla 4: Los electrones de valencia determinan la reactividad y corresponden a los electrones ubicados en la capa más externa n."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: Escriba la configuración electrónica completa y la abre...",
        "problemStatement": "Escriba la configuración electrónica completa y la abreviada con gas noble para el átomo neutro de Cromo (Z = 24) y para su catión Cr3+. Indique el conjunto completo de los cuatro números cuánticos (n, l, ml, ms) para el electrón más externo del átomo neutro y señale si el catión es paramagnético o diamagnético justificando su respuesta.",
        "deductiveSteps": [
          "Paso 1: Para Z = 24, el llenado estándar predeciría: 1s2 2s2 2p6 3s2 3p6 4s2 3d4.",
          "Paso 2: Excepción del Cromo: la subcapa 3d semillena (3d5) ofrece una estabilidad cuántica especial por minimización de la repulsión interelectrónica y maximización de la energía de canje. Por tanto, un electrón del orbital 4s es promovido al 3d.",
          "Paso 3: Configuración electrónica real del Cromo neutro: 1s2 2s2 2p6 3s2 3p6 4s1 3d5. Con gas noble: [Ar] 4s1 3d5.",
          "Paso 4: El electrón más externo reside en el nivel cuántico superior n = 4, que es el orbital 4s1. Sus cuatro números cuánticos son: n = 4, l = 0 (tipo s), ml = 0, ms = +1/2.",
          "Paso 5: Para formar el catión Cr3+, se deben perder 3 electrones. Regla de ionización en metales de transición: siempre se pierden primero los electrones del nivel más externo n (los 4s) antes de tocar los electrones 3d. Se pierde 1 electrón del 4s y 2 electrones del 3d. Configuración del Cr3+: [Ar] 3d3.",
          "Paso 6: En la subcapa 3d3, por la regla de Hund, los 3 electrones ocupan tres orbitales d diferentes de forma desapareada con espines paralelos: [Ar] (u_ )(u_ )(u_ )( _ )( _ ). Al tener 3 electrones desapareados, el ion Cr3+ es fuertemente paramagnético (es atraído por campos magnéticos externos)."
        ],
        "finalResult": "En la química de los metales de transición, el nivel 4s se llena primero al construir el átomo, pero también se vacía primero al formar cationes."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 1 UCV",
        "correction": "Preguntar si el conjunto (n=3, l=3, ml=0, ms=+1/2) es válido. Es totalmente falso porque para n=3 el valor máximo de l es 2 (orbitales s, p, d)."
      },
      {
        "trap": "Trampa de ionización del Cobre",
        "correction": "Al ionizar Cu (Z=29, [Ar] 4s1 3d10) a Cu2+, el estudiante escribe [Ar] 4s1 3d8 en vez de [Ar] 3d9."
      },
      {
        "trap": "Trampa del signo de ml",
        "correction": "Olvidar que ml puede ser negativo y va desde -l pasando por cero hasta +l."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Escribir para el Cromo 4s2 3d4 olvidando la anomalía de estabilidad del d5 semilleno."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Al ionizar metales de transición, quitar electrones del orbital 3d antes de vaciar el orbital 4s."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Asignar al número cuántico azimutal l un valor igual o mayor que n: l jamás puede ser igual a n."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Número Cuántico Principal n?",
          "back": "Entero positivo (1, 2, 3...) que determina el nivel de energía principal y el tamaño promedio de la nube electrónica respecto al núcleo. (Notación: n = 1, 2, 3...)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Número Cuántico Azimutal l?",
          "back": "Entero que determina la forma geométrica del orbital atómico: l = 0 (orbital s esférico), l = 1 (orbital p bilobular), l = 2 (orbital d), l = 3 (orbital f). (Notación: 0 <= l <= n - 1)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Número Cuántico Magnético ml?",
          "back": "Entero que especifica la orientación espacial tridimensional del orbital respecto a un campo magnético exterior. (Notación: -l <= ml <= +l)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Número Cuántico de Espín ms?",
          "back": "Momento angular intrínseco del electrón, que solo puede adoptar dos orientaciones posibles: +1/2 (giro hacia arriba) o -1/2 (giro hacia abajo). (Notación: ms = +1/2, -1/2)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Principio de Aufbau?",
          "back": "Regla de construcción progresiva que establece que los electrones ocupan primero los orbitales de menor energía disponible siguiendo la suma n + l. (Notación: Regla n + l)"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Número Cuántico Principal n",
          "Número Cuántico Azimutal l",
          "Número Cuántico Magnético ml",
          "Número Cuántico de Espín ms",
          "Principio de Aufbau"
        ],
        "notes": [
          "Paso 1: Obtener el número atómico Z del elemento neutro para conocer la cantidad total de electrones que se deben acomodar.",
          "Paso 2: Seguir la regla de las diagonales (orden creciente de n + l): 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s...",
          "Paso 3: Llenar cada subnivel respetando las capacidades máximas: s aloja 2 e-, p aloja 6 e-, d aloja 10 e-, f aloja 14 e-.",
          "Paso 4: Aplicar el Principio de Exclusión de Pauli: jamás colocar más de dos electrones por cajita cuántica y con espines antiparalelos.",
          "Paso 5: Aplicar la Regla de Hund: en subniveles degenerados (como los 3 orbitales p o 5 orbitales d), colocar primero un electrón con espín paralelo en cada orbital antes de aparear."
        ],
        "summary": "Cuantización de la energía, modelo de Bohr, números cuánticos principal, secundario, magnético y de espín, formas de orbitales s, p, d, f y reglas de llenado electrónico con anomalías del cromo y cobre."
      },
      "conceptMapNodes": "Principios de Química I: Mecánica Cuántica, Números Cuánticos y Configuraciones Electrónicas\n  ├── Fundamento: Principios de Química I · Código 3401 (UCV Ciencias)\n  ├── Ecuaciones: Número Cuántico Principal n, Número Cuántico Azimutal l, Número Cuántico Magnético ml\n  └── Protocolo: Paso 1: Obtener el número atómico Z del elemento neutro para conocer la cantidad total de electrones que se deben acomodar. -> Paso 2: Seguir la regla de las diagonales (orden creciente de n + l): 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s... -> Paso 3: Llenar cada subnivel respetando las capacidades máximas: s aloja 2 e-, p aloja 6 e-, d aloja 10 e-, f aloja 14 e-."
    },
    "generatedQuestions": [
      {
        "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
        "tema": "Principios de Química I: Mecánica Cuántica, Números Cuánticos y Configuraciones Electrónicas",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Principios de Química I: Mecánica Cuántica, Números Cuánticos y Configuraciones Electrónicas?",
        "opciones": [
          "Cuantización de la energía, modelo de Bohr, números cuánticos principal, secundario, magnético y de ",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Cuantización de la energía, modelo de Bohr, números cuánticos principal, secundario, magnético y de ",
        "justificacion": "**Concepto Fundamental:** Principios de Química I: Mecánica Cuántica, Números Cuánticos y Configuraciones Electrónicas\n\n**Resolución Directa:** La estructura electrónica de los átomos explica el comportamiento químico de la materia a través de la física cuántica. La radiación electromagnética transporta energía en paquetes..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-qgi-cuantica'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-medidas']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-medidas'],
  },
  {
    "id": "santiago-qgi-tabla-guide",
    "evaluationEventId": "santiago-qgi-parcial-1",
    "guideMetadata": {
      "title": "Principios de Química I: Tabla Periódica, Carga Nuclear Efectiva y Tendencias",
      "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
      "summary": "Fundamentos mecánicos de la ley periódica, cálculo de apantallamiento según las reglas de Slater, variación periódica de radios atómicos e iónicos, energías de ionización sucesivas y electronegatividad."
    },
    "phenomenonAndTheory": "La tabla periódica moderna organiza los elementos químicos según el orden creciente de su número atómico Z, reflejando la repetición periódica de sus configuraciones electrónicas de valencia. Todas las tendencias periódicas (radio atómico, radio iónico, energía de ionización, afinidad electrónica y electronegatividad) se explican mecanísticamente mediante dos factores físicos competitivos: el número cuántico principal n (que añade capas electrónicas haciendo crecer el átomo al descender en un grupo) y la Carga Nuclear Efectiva Z_ef = Z - S (la fuerza neta positiva que los electrones de valencia sienten del núcleo tras descontar el apantallamiento de los electrones internos). Al movernos de izquierda a derecha en un periodo, n permanece constante pero Z_ef aumenta drásticamente, atrayendo la nube electrónica con mayor fuerza y contrayendo el tamaño del átomo.",
    "glossary": [
      {
        "term": "Carga Nuclear Efectiva Z_ef",
        "definition": "Carga nuclear positiva real que experimenta un electrón externo, reducida por la repulsión y blindaje de los electrones de capas interiores.",
        "symbolOrUnit": "Z_ef = Z - S"
      },
      {
        "term": "Efecto Pantalla (Apantallamiento S)",
        "definition": "Disminución de la atracción nuclear sobre los electrones exteriores provocada por la nube electrónica intermedia que se interpone.",
        "symbolOrUnit": "Constante S de Slater"
      },
      {
        "term": "Radio Atómico",
        "definition": "Mitad de la distancia internuclear entre dos átomos idénticos unidos mediante un enlace químico covalente.",
        "symbolOrUnit": "pm o Angstroms"
      },
      {
        "term": "Energía de Primera Ionización",
        "definition": "Energía mínima requerida para arrancar el electrón más débilmente unido de un átomo gaseoso neutro en su estado fundamental.",
        "symbolOrUnit": "kJ/mol"
      },
      {
        "term": "Electronegatividad",
        "definition": "Capacidad intrínseca que tiene un átomo enlazado en una molécula para atraer hacia sí los pares de electrones compartidos.",
        "symbolOrUnit": "Escala de Pauling (0 a 4.0)"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Carga Nuclear Efectiva Z_ef",
          "latex": "Z_ef = Z - S",
          "application": "Carga nuclear positiva real que experimenta un electrón externo, reducida por la repulsión y blindaje de los electrones de capas interiores."
        },
        {
          "name": "Efecto Pantalla (Apantallamiento S)",
          "latex": "Constante S de Slater",
          "application": "Disminución de la atracción nuclear sobre los electrones exteriores provocada por la nube electrónica intermedia que se interpone."
        },
        {
          "name": "Radio Atómico",
          "latex": "pm o Angstroms",
          "application": "Mitad de la distancia internuclear entre dos átomos idénticos unidos mediante un enlace químico covalente."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Localizar los elementos bajo estudio en la tabla periódica identificando su periodo (nivel n) y grupo (columna de valencia).",
        "Paso 2: Si los elementos están en el mismo periodo, evaluar el incremento de Z_ef: a mayor Z, mayor Z_ef, menor radio atómico y mayor energía de ionización.",
        "Paso 3: Si los elementos están en el mismo grupo, evaluar el incremento de n: a mayor n, hay más capas de apantallamiento, mayor radio y menor energía de ionización.",
        "Paso 4: Para comparar radios de especies isoelectrónicas (con igual número de electrones), ordenar por número atómico Z: la especie con más protones comprime más la nube y tiene menor radio.",
        "Paso 5: Para justificar anomalías en energía de ionización (como N > O o Be > B), dibujar las cajitas de valencia mostrando subniveles llenos (s2) o semillenos (p3) con estabilidad extra.",
        "Paso 6: Comparar el tamaño de cationes y aniones respecto a su átomo neutro: los cationes siempre son más pequeños y los aniones siempre son más grandes.",
        "Regla 1: El radio atómico disminuye de izquierda a derecha a lo largo de un periodo y aumenta de arriba hacia abajo en un grupo.",
        "Regla 2: La energía de ionización y la electronegatividad aumentan de izquierda a derecha y disminuyen de arriba hacia abajo.",
        "Regla 3: Un catión siempre es significativamente más pequeño que su átomo neutro porque pierde electrones externos y aumenta Z_ef.",
        "Regla 4: Un anión siempre es significativamente más grande que su átomo neutro debido a la repulsión entre electrones adicionales en la misma capa."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: Ordene las siguientes especies químicas en orden crecie...",
        "problemStatement": "Ordene las siguientes especies químicas en orden creciente de radio iónico justiciando su respuesta mediante carga nuclear efectiva y estructura electrónica: O2- (Z = 8), F- (Z = 9), Na+ (Z = 11), Mg2+ (Z = 12). Explique además por qué la primera energía de ionización del Nitrógeno (Z = 7) es mayor que la del Oxígeno (Z = 8), a pesar de que el oxígeno tiene mayor número atómico.",
        "deductiveSteps": [
          "Paso 1: Analizamos el número de electrones de la serie O2-, F-, Na+, Mg2+: O2- tiene 8 + 2 = 10 e-; F- tiene 9 + 1 = 10 e-; Na+ tiene 11 - 1 = 10 e-; Mg2+ tiene 12 - 2 = 10 e-. Las cuatro especies tienen exactamente 10 electrones (son especies isoelectrónicas con configuración [Ne] 1s2 2s2 2p6).",
          "Paso 2: Al tener exactamente la misma cantidad de electrones, el apantallamiento S es idéntico entre ellas. La fuerza de atracción nuclear depende exclusivamente del número de protones Z en el núcleo.",
          "Paso 3: Evaluamos los protones: Mg2+ tiene 12 protones para atraer 10 electrones (Z_ef más alta, máxima contracción de la nube); Na+ tiene 11 protones; F- tiene 9 protones; O2- tiene solo 8 protones para retener 10 electrones (Z_ef más débil, mayor repulsión e expansión).",
          "Paso 4: Orden creciente de radio iónico: Mg2+ < Na+ < F- < O2-.",
          "Paso 5: Analizamos la anomalía de energía de ionización entre Nitrógeno (Z = 7) y Oxígeno (Z = 8). La configuración de valencia del Nitrógeno es 2s2 2p3 (subnivel 2p semilleno, con un electrón en cada uno de los orbitales 2px, 2py, 2pz sin repulsión mutua). La del Oxígeno es 2s2 2p4 (posee un orbital 2p con un par de electrones apareados).",
          "Paso 6: En el átomo de oxígeno, los dos electrones que comparten el mismo orbital 2p experimentan una fuerte repulsión culombiana mutua. Esta repulsión facilita la expulsión de uno de ellos, haciendo que se requiera menos energía para ionizar al oxígeno (1314 kJ/mol) que al nitrógeno (1402 kJ/mol)."
        ],
        "finalResult": "En series isoelectrónicas, a mayor número atómico Z, mayor fuerza de atracción del núcleo y menor radio atómico o iónico."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 1 UCV",
        "correction": "Preguntar cuál es el elemento más electronegativo y el estudiante duda entre el Flúor y los gases nobles. Los gases nobles no tienen electronegatividad definida en la escala de Pauling por no formar enlaces ordinarios."
      },
      {
        "trap": "Trampa de saltos de ionización",
        "correction": "Preguntar cuántos electrones de valencia tiene un elemento si I1 = 800, I2 = 2420, I3 = 3660, I4 = 25000 kJ/mol. El salto gigantesco entre I3 e I4 demuestra que el elemento tiene exactamente 3 electrones de valencia (Grupo 13)."
      },
      {
        "trap": "Trampa del radio atómico",
        "correction": "Comparar dos elementos de grupos distintos sin verificar primero si están en periodos diferentes."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Decir que el oxígeno tiene mayor energía de ionización simplemente porque está más a la derecha, ignorando la excepción del subnivel p3 semilleno."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Creer que el anión O2- es más pequeño que el catión Mg2+ porque tiene menos protones."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Confundir energía de ionización (arrancar un electrón) con afinidad electrónica (capturar un electrón)."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Carga Nuclear Efectiva Z_ef?",
          "back": "Carga nuclear positiva real que experimenta un electrón externo, reducida por la repulsión y blindaje de los electrones de capas interiores. (Notación: Z_ef = Z - S)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Efecto Pantalla (Apantallamiento S)?",
          "back": "Disminución de la atracción nuclear sobre los electrones exteriores provocada por la nube electrónica intermedia que se interpone. (Notación: Constante S de Slater)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Radio Atómico?",
          "back": "Mitad de la distancia internuclear entre dos átomos idénticos unidos mediante un enlace químico covalente. (Notación: pm o Angstroms)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Energía de Primera Ionización?",
          "back": "Energía mínima requerida para arrancar el electrón más débilmente unido de un átomo gaseoso neutro en su estado fundamental. (Notación: kJ/mol)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Electronegatividad?",
          "back": "Capacidad intrínseca que tiene un átomo enlazado en una molécula para atraer hacia sí los pares de electrones compartidos. (Notación: Escala de Pauling (0 a 4.0))"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Carga Nuclear Efectiva Z_ef",
          "Efecto Pantalla (Apantallamiento S)",
          "Radio Atómico",
          "Energía de Primera Ionización",
          "Electronegatividad"
        ],
        "notes": [
          "Paso 1: Localizar los elementos bajo estudio en la tabla periódica identificando su periodo (nivel n) y grupo (columna de valencia).",
          "Paso 2: Si los elementos están en el mismo periodo, evaluar el incremento de Z_ef: a mayor Z, mayor Z_ef, menor radio atómico y mayor energía de ionización.",
          "Paso 3: Si los elementos están en el mismo grupo, evaluar el incremento de n: a mayor n, hay más capas de apantallamiento, mayor radio y menor energía de ionización.",
          "Paso 4: Para comparar radios de especies isoelectrónicas (con igual número de electrones), ordenar por número atómico Z: la especie con más protones comprime más la nube y tiene menor radio.",
          "Paso 5: Para justificar anomalías en energía de ionización (como N > O o Be > B), dibujar las cajitas de valencia mostrando subniveles llenos (s2) o semillenos (p3) con estabilidad extra."
        ],
        "summary": "Fundamentos mecánicos de la ley periódica, cálculo de apantallamiento según las reglas de Slater, variación periódica de radios atómicos e iónicos, energías de ionización sucesivas y electronegatividad."
      },
      "conceptMapNodes": "Principios de Química I: Tabla Periódica, Carga Nuclear Efectiva y Tendencias\n  ├── Fundamento: Principios de Química I · Código 3401 (UCV Ciencias)\n  ├── Ecuaciones: Carga Nuclear Efectiva Z_ef, Efecto Pantalla (Apantallamiento S), Radio Atómico\n  └── Protocolo: Paso 1: Localizar los elementos bajo estudio en la tabla periódica identificando su periodo (nivel n) y grupo (columna de valencia). -> Paso 2: Si los elementos están en el mismo periodo, evaluar el incremento de Z_ef: a mayor Z, mayor Z_ef, menor radio atómico y mayor energía de ionización. -> Paso 3: Si los elementos están en el mismo grupo, evaluar el incremento de n: a mayor n, hay más capas de apantallamiento, mayor radio y menor energía de ionización."
    },
    "generatedQuestions": [
      {
        "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
        "tema": "Principios de Química I: Tabla Periódica, Carga Nuclear Efectiva y Tendencias",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Principios de Química I: Tabla Periódica, Carga Nuclear Efectiva y Tendencias?",
        "opciones": [
          "Fundamentos mecánicos de la ley periódica, cálculo de apantallamiento según las reglas de Slater, va",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Fundamentos mecánicos de la ley periódica, cálculo de apantallamiento según las reglas de Slater, va",
        "justificacion": "**Concepto Fundamental:** Principios de Química I: Tabla Periódica, Carga Nuclear Efectiva y Tendencias\n\n**Resolución Directa:** La tabla periódica moderna organiza los elementos químicos según el orden creciente de su número atómico Z, reflejando la repetición periódica de sus configuraciones electrónicas d..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-qgi-tabla'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-medidas']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-medidas'],
  },
  {
    "id": "santiago-qgi-enlaces-guide",
    "evaluationEventId": "santiago-qgi-parcial-2",
    "guideMetadata": {
      "title": "Principios de Química I: Enlace Iónico, Born-Haber, Estructuras de Lewis y Resonancia",
      "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
      "summary": "Termodinámica del enlace iónico, balance entálpico de Born-Haber, algoritmo para estructuras de Lewis de moléculas poliatómicas, carga formal, híbridos de resonancia y octetos expandidos."
    },
    "phenomenonAndTheory": "Los átomos se combinan químicamente para alcanzar estados de mínima energía potencial compartiendo o transfiriendo electrones para adoptar la configuración estable de gas noble. En el enlace iónico, electrones de valencia se transfieren de metales electropositivos a no metales electronegativos, formando una red tridimensional cristalina estabilizada por la energía reticular (calculable mediante el ciclo termodinámico de Born-Haber). En el enlace covalente, los átomos comparten pares de electrones. Las estructuras de Lewis permiten representar las fórmulas moleculares mediante un recuento estricto de electrones de valencia. La carga formal CF = V - N - B/2 permite seleccionar la estructura más representativa entre posibles isómeros resonantes, identificando además las excepciones a la regla del octeto (octetos incompletos como BF3, radicales libres como NO y octetos expandidos como SF6 o PCl5).",
    "glossary": [
      {
        "term": "Energía Reticular (U)",
        "definition": "Energía liberada cuando un mol de un compuesto iónico sólido cristalino se forma a partir de sus iones gaseosos infinitamente separados.",
        "symbolOrUnit": "kJ/mol (siempre exotérmica)"
      },
      {
        "term": "Ciclo de Born-Haber",
        "definition": "Ciclo termodinámico que aplica la Ley de Hess relacionando la entalpía estándar de formación con sublimación, ionización, disociación y afinidad electrónica.",
        "symbolOrUnit": "Delta H_f = sumatoria de pasos"
      },
      {
        "term": "Carga Formal (CF)",
        "definition": "Carga eléctrica hipotética asignada a cada átomo en una estructura de Lewis asumiendo que los electrones enlazantes se comparten equitativamente.",
        "symbolOrUnit": "CF = V - N - B/2"
      },
      {
        "term": "Híbrido de Resonancia",
        "definition": "Estructura electrónica real de una molécula que no puede describirse con una sola estructura de Lewis, resultante de la deslocalización de electrones pi.",
        "symbolOrUnit": "Flecha de doble punta <->"
      },
      {
        "term": "Octeto Expandido",
        "definition": "Capacidad de elementos del tercer periodo en adelante (Si, P, S, Cl, Xe) para alojar más de 8 electrones de valencia usando orbitales d vacíos.",
        "symbolOrUnit": "10 o 12 electrones de valencia"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Energía Reticular (U)",
          "latex": "kJ/mol (siempre exotérmica)",
          "application": "Energía liberada cuando un mol de un compuesto iónico sólido cristalino se forma a partir de sus iones gaseosos infinitamente separados."
        },
        {
          "name": "Ciclo de Born-Haber",
          "latex": "Delta H_f = sumatoria de pasos",
          "application": "Ciclo termodinámico que aplica la Ley de Hess relacionando la entalpía estándar de formación con sublimación, ionización, disociación y afinidad electrónica."
        },
        {
          "name": "Carga Formal (CF)",
          "latex": "CF = V - N - B/2",
          "application": "Carga eléctrica hipotética asignada a cada átomo en una estructura de Lewis asumiendo que los electrones enlazantes se comparten equitativamente."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Para estructuras de Lewis, sumar todos los electrones de valencia del grupo de cada átomo, añadiendo electrones si es un anión o restando si es un catión.",
        "Paso 2: Elegir como átomo central al elemento menos electronegativo (el hidrógeno jamás puede ser central).",
        "Paso 3: Conectar el átomo central con los átomos periféricos mediante enlaces simples (2 electrones cada uno).",
        "Paso 4: Distribuir los electrones restantes como pares libres completando primero los octetos de los átomos periféricos (excepto H que solo admite 2).",
        "Paso 5: Si sobran electrones, colocarlos como pares solitarios directamente sobre el átomo central.",
        "Paso 6: Si al átomo central le faltan electrones para completar el octeto, convertir pares libres de los periféricos en enlaces dobles o triples, y calcular cargas formales.",
        "Regla 1: La suma algebraica de las cargas formales de todos los átomos debe coincidir exactamente con la carga neta de la molécula o ion.",
        "Regla 2: Las estructuras con cargas formales más cercanas a cero son siempre más estables que aquellas con cargas altas (+2, -2).",
        "Regla 3: Si debe existir una carga formal negativa, debe residir sobre el átomo más electronegativo de la estructura.",
        "Regla 4: Los elementos Boro y Berilio forman frecuentemente moléculas con octeto incompleto (BF3 tiene 6 electrones de valencia en B)."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: Dibuje la estructura de Lewis más estable para el ion s...",
        "problemStatement": "Dibuje la estructura de Lewis más estable para el ion sulfato SO4(2-), determine la carga formal de cada átomo en dicha estructura explicando si cumple la regla del octeto estricto o si expande su octeto, y justifique por qué todas las longitudes de enlace S-O en el ion son idénticas en la realidad experimental.",
        "deductiveSteps": [
          "Paso 1: Contamos los electrones de valencia totales: Azufre (Grupo 16) aporta 6 e-; 4 Oxígenos (Grupo 16) aportan 4 * 6 = 24 e-; la carga negativa -2 aporta 2 e-. Total = 6 + 24 + 2 = 32 electrones de valencia (16 pares).",
          "Paso 2: El átomo central es el Azufre (menos electronegativo que el oxígeno). Conectamos el S con 4 átomos de O mediante enlaces simples: 4 enlaces * 2 = 8 electrones consumidos. Quedan 32 - 8 = 24 electrones.",
          "Paso 3: Completamos los octetos de los 4 oxígenos periféricos colocando 3 pares libres (6 electrones) en cada uno: 4 * 6 = 24 electrones consumidos. Quedan 0 electrones.",
          "Paso 4: Evaluamos las cargas formales en la estructura con enlaces simples: para el Azufre: CF(S) = 6 - 0 - 8/2 = +2. Para cada Oxígeno: CF(O) = 6 - 6 - 2/2 = -1. La suma da (+2) + 4*(-1) = -2 (correcto). Sin embargo, una carga formal de +2 en el átomo central es desfavorable.",
          "Paso 5: Como el Azufre pertenece al Periodo 3 de la tabla periódica, tiene orbitales 3d disponibles para expandir su octeto. Convertimos dos pares libres de dos oxígenos distintos en dos dobles enlaces S=O. Recalculamos cargas formales: para los dos oxígenos con doble enlace: CF = 6 - 4 - 4/2 = 0. Para los dos oxígenos con enlace simple: CF = 6 - 6 - 2/2 = -1. Para el Azufre central: CF(S) = 6 - 0 - 12/2 = 0. El azufre queda rodeado por 12 electrones pero con carga formal cero, logrando la estructura termodinámica más estable.",
          "Paso 6: En la realidad física, los dobles enlaces no están fijos: existen 6 estructuras de resonancia equivalentes donde el doble enlace rota entre los 4 oxígenos. El ion real es un híbrido de resonancia con orden de enlace de 1.5 para cada enlace S-O, lo que explica por qué los cuatro enlaces tienen exactamente la misma longitud y fuerza."
        ],
        "finalResult": "La estructura de Lewis más estable minimiza las cargas formales a cero o coloca las cargas negativas en los átomos más electronegativos."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 2 UCV",
        "correction": "Preguntar por la estructura del ozono O3 y olvidar colocar la carga formal +1 en el oxígeno central y -1 en el terminal."
      },
      {
        "trap": "Trampa de Born-Haber",
        "correction": "Confundir la afinidad electrónica (que suele ser exotérmica y tener signo negativo) con la energía de ionización al sumar los términos de la ley de Hess."
      },
      {
        "trap": "Trampa de resonancia",
        "correction": "Creer que la molécula oscila en el tiempo entre una estructura y otra: la molécula real es un híbrido estático permanente con electrones pi deslocalizados."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Intentar expandir el octeto en elementos del Periodo 2 como Nitrógeno, Carbono u Oxígeno: no tienen orbitales d y jamás pueden superar 8 electrones."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Dejar cargas formales de signo igual en átomos adyacentes sin intentar formar enlaces múltiples."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Olvidar encerrar el ion entre corchetes con su carga neta exterior al escribir la estructura de Lewis."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Energía Reticular (U)?",
          "back": "Energía liberada cuando un mol de un compuesto iónico sólido cristalino se forma a partir de sus iones gaseosos infinitamente separados. (Notación: kJ/mol (siempre exotérmica))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Ciclo de Born-Haber?",
          "back": "Ciclo termodinámico que aplica la Ley de Hess relacionando la entalpía estándar de formación con sublimación, ionización, disociación y afinidad electrónica. (Notación: Delta H_f = sumatoria de pasos)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Carga Formal (CF)?",
          "back": "Carga eléctrica hipotética asignada a cada átomo en una estructura de Lewis asumiendo que los electrones enlazantes se comparten equitativamente. (Notación: CF = V - N - B/2)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Híbrido de Resonancia?",
          "back": "Estructura electrónica real de una molécula que no puede describirse con una sola estructura de Lewis, resultante de la deslocalización de electrones pi. (Notación: Flecha de doble punta <->)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Octeto Expandido?",
          "back": "Capacidad de elementos del tercer periodo en adelante (Si, P, S, Cl, Xe) para alojar más de 8 electrones de valencia usando orbitales d vacíos. (Notación: 10 o 12 electrones de valencia)"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Energía Reticular (U)",
          "Ciclo de Born-Haber",
          "Carga Formal (CF)",
          "Híbrido de Resonancia",
          "Octeto Expandido"
        ],
        "notes": [
          "Paso 1: Para estructuras de Lewis, sumar todos los electrones de valencia del grupo de cada átomo, añadiendo electrones si es un anión o restando si es un catión.",
          "Paso 2: Elegir como átomo central al elemento menos electronegativo (el hidrógeno jamás puede ser central).",
          "Paso 3: Conectar el átomo central con los átomos periféricos mediante enlaces simples (2 electrones cada uno).",
          "Paso 4: Distribuir los electrones restantes como pares libres completando primero los octetos de los átomos periféricos (excepto H que solo admite 2).",
          "Paso 5: Si sobran electrones, colocarlos como pares solitarios directamente sobre el átomo central."
        ],
        "summary": "Termodinámica del enlace iónico, balance entálpico de Born-Haber, algoritmo para estructuras de Lewis de moléculas poliatómicas, carga formal, híbridos de resonancia y octetos expandidos."
      },
      "conceptMapNodes": "Principios de Química I: Enlace Iónico, Born-Haber, Estructuras de Lewis y Resonancia\n  ├── Fundamento: Principios de Química I · Código 3401 (UCV Ciencias)\n  ├── Ecuaciones: Energía Reticular (U), Ciclo de Born-Haber, Carga Formal (CF)\n  └── Protocolo: Paso 1: Para estructuras de Lewis, sumar todos los electrones de valencia del grupo de cada átomo, añadiendo electrones si es un anión o restando si es un catión. -> Paso 2: Elegir como átomo central al elemento menos electronegativo (el hidrógeno jamás puede ser central). -> Paso 3: Conectar el átomo central con los átomos periféricos mediante enlaces simples (2 electrones cada uno)."
    },
    "generatedQuestions": [
      {
        "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
        "tema": "Principios de Química I: Enlace Iónico, Born-Haber, Estructuras de Lewis y Resonancia",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Principios de Química I: Enlace Iónico, Born-Haber, Estructuras de Lewis y Resonancia?",
        "opciones": [
          "Termodinámica del enlace iónico, balance entálpico de Born-Haber, algoritmo para estructuras de Lewi",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Termodinámica del enlace iónico, balance entálpico de Born-Haber, algoritmo para estructuras de Lewi",
        "justificacion": "**Concepto Fundamental:** Principios de Química I: Enlace Iónico, Born-Haber, Estructuras de Lewis y Resonancia\n\n**Resolución Directa:** Los átomos se combinan químicamente para alcanzar estados de mínima energía potencial compartiendo o transfiriendo electrones para adoptar la configuración estable de gas noble. En..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-qgi-enlaces'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-estequiometria']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-estequiometria'],
  },
  {
    "id": "santiago-qgi-geometria-guide",
    "evaluationEventId": "santiago-qgi-parcial-2",
    "guideMetadata": {
      "title": "Principios de Química I: Modelo TRPEV, Geometría Molecular, Polaridad e Hibridación",
      "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
      "summary": "Predicción tridimensional según dominios electrónicos de VSEPR, distorsión angular por pares solitarios, suma vectorial de dipolos moleculares y teoría de orbitales híbridos sp, sp2, sp3, sp3d y sp3d2."
    },
    "phenomenonAndTheory": "La forma tridimensional de las moléculas gobierna sus propiedades químicas, reactividad biológica y estados físicos. El modelo de Repulsión de Pares de Electrones de la Capa de Valencia (TRPEV / VSEPR) establece que los pares de electrones que rodean al átomo central se repelen electrostáticamente y adoptan la disposición geométrica que maximiza su separación angular. Existe una distinción fundamental entre la geometría de pares de electrones (que incluye todos los dominios electrónicos) y la geometría molecular real (que describe únicamente la posición espacial de los núcleos atómicos). Los pares de electrones libres ocupan mayor volumen espacial y ejercen repulsiones más intensas que los pares enlazantes, comprimiendo los ángulos de enlace ideales. La suma vectorial de los momentos dipolares de enlace determina si la molécula presenta un momento dipolar neto y polaridad macroscópica.",
    "glossary": [
      {
        "term": "Dominio de Electrones (Número Estérico)",
        "definition": "Cada par libre de electrones, enlace simple, enlace doble o enlace triple conectado al átomo central, que cuenta como una sola región de repulsión espacial.",
        "symbolOrUnit": "NE = Enlaces sigma + Pares libres"
      },
      {
        "term": "Geometría de Pares de Electrones",
        "definition": "Arreglo espacial tridimensional adoptado por todos los dominios electrónicos: lineal (2), trigonal plana (3), tetraédrica (4), bipiramidal trigonal (5), octaédrica (6).",
        "symbolOrUnit": "Geometría electrónica"
      },
      {
        "term": "Geometría Molecular",
        "definition": "Disposición física real de los átomos en el espacio observada experimentalmente, sin incluir visualmente los pares libres.",
        "symbolOrUnit": "Geometría de los núcleos"
      },
      {
        "term": "Momento Dipolar Neto (mu)",
        "definition": "Magnitud vectorial resultante de la suma vectorial de todos los momentos dipolares individuales de enlace en la molécula.",
        "symbolOrUnit": "Debyes (D)"
      },
      {
        "term": "Hibridación de Orbitales",
        "definition": "Mezcla matemática de orbitales atómicos puros (s, p, d) en el átomo central para formar nuevos orbitales híbridos degenerados idénticos en energía y orientados geométricamente.",
        "symbolOrUnit": "sp, sp2, sp3, sp3d, sp3d2"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Dominio de Electrones (Número Estérico)",
          "latex": "NE = Enlaces sigma + Pares libres",
          "application": "Cada par libre de electrones, enlace simple, enlace doble o enlace triple conectado al átomo central, que cuenta como una sola región de repulsión espacial."
        },
        {
          "name": "Geometría de Pares de Electrones",
          "latex": "Geometría electrónica",
          "application": "Arreglo espacial tridimensional adoptado por todos los dominios electrónicos: lineal (2), trigonal plana (3), tetraédrica (4), bipiramidal trigonal (5), octaédrica (6)."
        },
        {
          "name": "Geometría Molecular",
          "latex": "Geometría de los núcleos",
          "application": "Disposición física real de los átomos en el espacio observada experimentalmente, sin incluir visualmente los pares libres."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Dibujar la estructura de Lewis más estable de la molécula o ion poliatómico.",
        "Paso 2: Contar el número estérico NE alrededor del átomo central sumando los átomos enlazados más los pares libres de electrones.",
        "Paso 3: Determinar la geometría de pares electrónicos: 2 = lineal (180°), 3 = trigonal plana (120°), 4 = tetraédrica (109.5°), 5 = bipiramidal trigonal (90°/120°), 6 = octaédrica (90°).",
        "Paso 4: Deducir la geometría molecular considerando los pares libres: si hay pares libres, la geometría molecular cambia (ej. tetraédrica con 1 par libre es piramidal trigonal; con 2 pares libres es angular).",
        "Paso 5: Predecir la hibridación del átomo central asociando directamente el número de dominios: 2 dominios = sp, 3 = sp2, 4 = sp3, 5 = sp3d, 6 = sp3d2.",
        "Paso 6: Evaluar la polaridad molecular: dibujar flechas de dipolo hacia los átomos más electronegativos y verificar si la simetría espacial anula la suma vectorial a cero.",
        "Regla 1: Las repulsiones electrónicas decrecen en el orden: Par libre - Par libre > Par libre - Par enlazante > Par enlazante - Par enlazante.",
        "Regla 2: Un enlace múltiple (doble o triple) cuenta como un único dominio electrónico al calcular la geometría VSEPR y la hibridación.",
        "Regla 3: En geometrías bipiramidales trigonales (5 dominios), los pares solitarios siempre ocupan posiciones ecuatoriales.",
        "Regla 4: La hibridación depende exclusivamente del número estérico de dominios: 2 = sp, 3 = sp2, 4 = sp3, 5 = sp3d, 6 = sp3d2."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: Para las moléculas Agua (H2O), Trifluoruro de Boro (BF3...",
        "problemStatement": "Para las moléculas Agua (H2O), Trifluoruro de Boro (BF3) y Tetrafluoruro de Xenón (XeF4): determine para cada una el número de dominios electrónicos en el átomo central, su geometría de pares electrónicos, su geometría molecular real, el ángulo de enlace aproximado, el estado de hibridación del átomo central y determine de forma analítica si la molécula es polar o apolar.",
        "deductiveSteps": [
          "Paso 1: Analizamos el Agua (H2O): Estructura de Lewis: el Oxígeno central tiene 2 enlaces simples con H y 2 pares libres de electrones. Número estérico NE = 2 + 2 = 4 dominios electrónicos.",
          "Paso 2: Geometría de pares electrónicos del H2O: Tetraédrica. Geometría molecular: como hay 2 pares libres, los átomos de H forman una geometría Angular. Los 2 pares libres ejercen fuerte repulsión cerrando el ángulo tetraédrico ideal de 109.5° a 104.5°. Hibridación del O: sp3 (4 dominios). Polaridad: los enlaces O-H son muy polares y al tener geometría angular asimétrica, los dipolos no se cancelan: mu != 0, es una molécula Polar.",
          "Paso 3: Analizamos el Trifluoruro de Boro (BF3): Estructura de Lewis: el Boro tiene 3 enlaces simples con F y 0 pares libres (octeto incompleto de 6 electrones). Número estérico NE = 3 + 0 = 3 dominios electrónicos.",
          "Paso 4: Geometría de pares electrónicos de BF3: Trigonal Plana. Geometría molecular: Trigonal Plana. Ángulo de enlace: exactamente 120°. Hibridación del B: sp2 (3 dominios). Polaridad: los enlaces B-F son altamente polares, pero al estar orientados simétricamente a 120° en un plano coplanar, sus tres vectores se cancelan vectorialmente: mu = 0, es una molécula Apolar.",
          "Paso 5: Analizamos el Tetrafluoruro de Xenón (XeF4): Estructura de Lewis: Xenón aporta 8 e- y 4 F aportan 4 * 7 = 28 e-. Total = 36 e- (18 pares). Se forman 4 enlaces Xe-F (8 e-) y se completan octetos de F (24 e-). Sobran 4 electrones que se colocan como 2 pares libres sobre el Xe. Número estérico NE = 4 enlaces + 2 pares libres = 6 dominios electrónicos.",
          "Paso 6: Geometría de pares electrónicos de XeF4: Octaédrica. Geometría molecular: para minimizar repulsión, los dos pares libres se ubican en posiciones axiales opuestas a 180°, dejando a los 4 átomos de flúor en el plano ecuatorial: geometría Cuadrada Plana. Ángulos de enlace F-Xe-F: 90°. Hibridación del Xe: sp3d2 (6 dominios). Polaridad: por la simetría centrosimétrica cuadrada, los 4 dipolos Xe-F opuestos se cancelan dos a dos, y los dos pares libres también se cancelan mutuamente: mu = 0, es una molécula Apolar."
        ],
        "finalResult": "Una molécula es no polar si todos sus enlaces periféricos son idénticos y su geometría molecular no tiene pares libres que rompan la simetría."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 2 UCV",
        "correction": "Preguntar por la geometría del ion I3- (triyoduro). Tiene 3 pares libres y 2 enlaces en el átomo central (5 dominios), por lo que su geometría molecular es perfectamente Lineal con ángulo de 180°."
      },
      {
        "trap": "Trampa de hibridación",
        "correction": "Atribuir hibridación sp3 al Boro en BF3 porque tiene tres enlaces, olvidando que solo tiene 3 dominios (hibridación sp2)."
      },
      {
        "trap": "Trampa del NH3 vs BF3",
        "correction": "Creer que el amoníaco es plano trigonal como el BF3; el amoníaco tiene un par libre en el nitrógeno que lo hace piramidal trigonal y fuertemente polar."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Confundir geometría electrónica con geometría molecular: decir que el agua es tetraédrica en vez de angular."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Asumir que una molécula con enlaces polares siempre es polar: olvidar que la simetría espacial puede anular el momento dipolar resultante."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "En bipirámide trigonal (5 dominios), colocar los pares libres en posiciones axiales en vez de ecuatoriales: en el ecuador tienen ángulos de 120° con menor repulsión."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Dominio de Electrones (Número Estérico)?",
          "back": "Cada par libre de electrones, enlace simple, enlace doble o enlace triple conectado al átomo central, que cuenta como una sola región de repulsión espacial. (Notación: NE = Enlaces sigma + Pares libres)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Geometría de Pares de Electrones?",
          "back": "Arreglo espacial tridimensional adoptado por todos los dominios electrónicos: lineal (2), trigonal plana (3), tetraédrica (4), bipiramidal trigonal (5), octaédrica (6). (Notación: Geometría electrónica)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Geometría Molecular?",
          "back": "Disposición física real de los átomos en el espacio observada experimentalmente, sin incluir visualmente los pares libres. (Notación: Geometría de los núcleos)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Momento Dipolar Neto (mu)?",
          "back": "Magnitud vectorial resultante de la suma vectorial de todos los momentos dipolares individuales de enlace en la molécula. (Notación: Debyes (D))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Hibridación de Orbitales?",
          "back": "Mezcla matemática de orbitales atómicos puros (s, p, d) en el átomo central para formar nuevos orbitales híbridos degenerados idénticos en energía y orientados geométricamente. (Notación: sp, sp2, sp3, sp3d, sp3d2)"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Dominio de Electrones (Número Estérico)",
          "Geometría de Pares de Electrones",
          "Geometría Molecular",
          "Momento Dipolar Neto (mu)",
          "Hibridación de Orbitales"
        ],
        "notes": [
          "Paso 1: Dibujar la estructura de Lewis más estable de la molécula o ion poliatómico.",
          "Paso 2: Contar el número estérico NE alrededor del átomo central sumando los átomos enlazados más los pares libres de electrones.",
          "Paso 3: Determinar la geometría de pares electrónicos: 2 = lineal (180°), 3 = trigonal plana (120°), 4 = tetraédrica (109.5°), 5 = bipiramidal trigonal (90°/120°), 6 = octaédrica (90°).",
          "Paso 4: Deducir la geometría molecular considerando los pares libres: si hay pares libres, la geometría molecular cambia (ej. tetraédrica con 1 par libre es piramidal trigonal; con 2 pares libres es angular).",
          "Paso 5: Predecir la hibridación del átomo central asociando directamente el número de dominios: 2 dominios = sp, 3 = sp2, 4 = sp3, 5 = sp3d, 6 = sp3d2."
        ],
        "summary": "Predicción tridimensional según dominios electrónicos de VSEPR, distorsión angular por pares solitarios, suma vectorial de dipolos moleculares y teoría de orbitales híbridos sp, sp2, sp3, sp3d y sp3d2."
      },
      "conceptMapNodes": "Principios de Química I: Modelo TRPEV, Geometría Molecular, Polaridad e Hibridación\n  ├── Fundamento: Principios de Química I · Código 3401 (UCV Ciencias)\n  ├── Ecuaciones: Dominio de Electrones (Número Estérico), Geometría de Pares de Electrones, Geometría Molecular\n  └── Protocolo: Paso 1: Dibujar la estructura de Lewis más estable de la molécula o ion poliatómico. -> Paso 2: Contar el número estérico NE alrededor del átomo central sumando los átomos enlazados más los pares libres de electrones. -> Paso 3: Determinar la geometría de pares electrónicos: 2 = lineal (180°), 3 = trigonal plana (120°), 4 = tetraédrica (109.5°), 5 = bipiramidal trigonal (90°/120°), 6 = octaédrica (90°)."
    },
    "generatedQuestions": [
      {
        "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
        "tema": "Principios de Química I: Modelo TRPEV, Geometría Molecular, Polaridad e Hibridación",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Principios de Química I: Modelo TRPEV, Geometría Molecular, Polaridad e Hibridación?",
        "opciones": [
          "Predicción tridimensional según dominios electrónicos de VSEPR, distorsión angular por pares solitar",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Predicción tridimensional según dominios electrónicos de VSEPR, distorsión angular por pares solitar",
        "justificacion": "**Concepto Fundamental:** Principios de Química I: Modelo TRPEV, Geometría Molecular, Polaridad e Hibridación\n\n**Resolución Directa:** La forma tridimensional de las moléculas gobierna sus propiedades químicas, reactividad biológica y estados físicos. El modelo de Repulsión de Pares de Electrones de la Capa de Val..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-qgi-geometria'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-estequiometria']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-estequiometria'],
  },
  {
    "id": "santiago-qgi-estequiometria-guide",
    "evaluationEventId": "santiago-qgi-parcial-2",
    "guideMetadata": {
      "title": "Principios de Química I: Estequiometría, Reactivo Limitante, Pureza y Rendimiento",
      "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
      "summary": "Conversiones mol-gramo, balanceo sistemático de ecuaciones, identificación matemática del reactivo limitante por relaciones estequiométricas, corrección por pureza y cálculo de rendimiento porcentual."
    },
    "phenomenonAndTheory": "La estequiometría es la contabilidad cuantitativa de la materia en las reacciones químicas, cimentada en la Ley de Conservación de la Masa. Dado que los átomos no se pueden contar individualmente en una balanza ordinaria, el mol conecta el microcosmos molecular con las masas macroscópicas mediante el número de Avogadro (6.022 * 10^23 entidades/mol). Toda ecuación química debe balancearse para que la cantidad de átomos de cada elemento sea idéntica en reactivos y productos. En la práctica real, los reactivos rara vez se mezclan en proporciones exactas: aquel reactivo que se consume completamente primero frena en seco la reacción y se denomina reactivo limitante. Todos los cálculos teóricos de producto formado y reactivo en exceso sobrante deben derivarse obligatoriamente a partir del reactivo limitante.",
    "glossary": [
      {
        "term": "Mol",
        "definition": "Cantidad de sustancia que contiene exactamente tantas partículas elementales como átomos hay en exactamente 12 gramos del isótopo puro de Carbono-12.",
        "symbolOrUnit": "6.022 * 10^23 partículas"
      },
      {
        "term": "Masa Molar (M)",
        "definition": "Masa en gramos de exactamente un mol de átomos, moléculas o unidades fórmula de una sustancia química.",
        "symbolOrUnit": "g/mol"
      },
      {
        "term": "Reactivo Limitante",
        "definition": "Sustancia que se agota por completo en primer lugar durante una reacción química, determinando el límite máximo teórico de producto formado.",
        "symbolOrUnit": "Determina el rendimiento"
      },
      {
        "term": "Reactivo en Exceso",
        "definition": "Sustancia presente en una cantidad molar superior a la requerida por la estequiometría de la reacción, de la cual queda una porción sin reaccionar.",
        "symbolOrUnit": "Masa sobrante > 0"
      },
      {
        "term": "Rendimiento Porcentual",
        "definition": "Razón porcentual entre la masa de producto realmente obtenida en el laboratorio y la masa teórica máxima predicha por la estequiometría.",
        "symbolOrUnit": "% = (Real / Teórico) * 100"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Mol",
          "latex": "6.022 * 10^23 partículas",
          "application": "Cantidad de sustancia que contiene exactamente tantas partículas elementales como átomos hay en exactamente 12 gramos del isótopo puro de Carbono-12."
        },
        {
          "name": "Masa Molar (M)",
          "latex": "g/mol",
          "application": "Masa en gramos de exactamente un mol de átomos, moléculas o unidades fórmula de una sustancia química."
        },
        {
          "name": "Reactivo Limitante",
          "latex": "Determina el rendimiento",
          "application": "Sustancia que se agota por completo en primer lugar durante una reacción química, determinando el límite máximo teórico de producto formado."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Escribir la ecuación química con fórmulas correctas y balancear todos los coeficientes estequiométricos por tanteo o método algebraico.",
        "Paso 2: Si los reactivos tienen impurezas, multiplicar la masa cruda por el porcentaje de pureza dividido entre 100 para obtener la masa pura real.",
        "Paso 3: Convertir las masas puras de todos los reactivos suministrados a moles dividiendo entre sus respectivas masas molares: n = m / M.",
        "Paso 4: Identificar el reactivo limitante dividiendo los moles calculados de cada reactivo entre su propio coeficiente estequiométrico: el menor valor numérico es el reactivo limitante.",
        "Paso 5: Utilizar exclusivamente los moles del reactivo limitante para calcular los moles teóricos de producto formado mediante la razón de coeficientes.",
        "Paso 6: Convertir los moles de producto a gramos teóricos y calcular el rendimiento porcentual si el enunciado reporta una masa experimental.",
        "Regla 1: Nunca realices un cálculo estequiométrico sin verificar primero que la ecuación química esté perfectamente balanceada.",
        "Regla 2: Siempre convierte gramos a moles antes de aplicar los factores de conversión estequiométricos de la ecuación.",
        "Regla 3: El reactivo limitante es el único dato válido para calcular la cantidad teórica de cualquier producto formado.",
        "Regla 4: El rendimiento porcentual de una reacción química jamás puede superar el 100% en condiciones reales sin violar las leyes de la física."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: En un proceso de síntesis inorgánica en el laboratorio ...",
        "problemStatement": "En un proceso de síntesis inorgánica en el laboratorio de la UCV, se hacen reaccionar 50.0 g de dióxido de manganeso impuro (MnO2 con pureza del 87.0%, Masa molar = 86.94 g/mol) con 120.0 mL de una disolución concentrada de ácido clorhídrico comercial (densidad = 1.18 g/mL, 37.0% en masa de HCl, Masa molar = 36.46 g/mol) según la reacción: MnO2(s) + 4 HCl(ac) -> MnCl2(ac) + Cl2(g) + 2 H2O(l). Calcule: a) Cuál es el reactivo limitante; b) Los gramos de Cloro gaseoso Cl2 (Masa molar = 70.90 g/mol) que se forman teóricamente; c) Los gramos del reactivo en exceso que quedan sin reaccionar; d) El rendimiento de la reacción si se recolectan 24.5 g de gas cloro.",
        "deductiveSteps": [
          "Paso 1: Verificamos el balanceo de la ecuación: 1 Mn, 2 O, 4 H, 4 Cl a ambos lados. La ecuación está balanceada.",
          "Paso 2: Calculamos la masa pura y moles disponibles de MnO2: Masa pura = 50.0 g * (87.0 / 100) = 43.5 g de MnO2 puro. Moles de MnO2 = 43.5 g / 86.94 g/mol = 0.5003 moles.",
          "Paso 3: Calculamos la masa pura y moles disponibles de HCl: Masa de disolución = 120.0 mL * 1.18 g/mL = 141.6 g. Masa pura de HCl = 141.6 g * (37.0 / 100) = 52.392 g de HCl puro. Moles de HCl = 52.392 g / 36.46 g/mol = 1.437 moles.",
          "Paso 4: Determinamos el reactivo limitante comparando la relación mol/coeficiente: Para MnO2: 0.5003 / 1 = 0.5003. Para HCl: 1.437 / 4 = 0.3592. Como 0.3592 < 0.5003, el Ácido Clorhídrico (HCl) es el reactivo limitante en seco. El MnO2 es el reactivo en exceso.",
          "Paso 5: Calculamos el rendimiento teórico de Cl2 a partir de los 1.437 moles de HCl limitante: según la estequiometría, 4 moles de HCl producen 1 mol de Cl2. Moles de Cl2 teóricos = 1.437 moles HCl * (1 mol Cl2 / 4 moles HCl) = 0.35925 moles de Cl2. Masa teórica de Cl2 = 0.35925 moles * 70.90 g/mol = 25.47 g de Cl2.",
          "Paso 6: Calculamos el exceso consumido y sobrante de MnO2: Moles de MnO2 consumidos = 1.437 moles HCl * (1 mol MnO2 / 4 moles HCl) = 0.35925 moles de MnO2. Moles de MnO2 sobrantes = 0.5003 - 0.35925 = 0.14105 moles. Masa de MnO2 puro sobrante = 0.14105 moles * 86.94 g/mol = 12.26 g de MnO2 sin reaccionar.",
          "Paso 7: Calculamos el porcentaje de rendimiento: % Rendimiento = (Masa real experimental / Masa teórica) * 100 = (24.5 g / 25.47 g) * 100 = 96.2%."
        ],
        "finalResult": "El reactivo limitante es siempre aquel que arroja el menor cociente entre sus moles disponibles y su coeficiente estequiométrico en la ecuación."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 2 UCV",
        "correction": "Dar la disolución de un reactivo con densidad y porcentaje en masa (% m/m) y el estudiante olvida multiplicar volumen por densidad para hallar la masa total de la solución."
      },
      {
        "trap": "Trampa de moléculas biatómicas",
        "correction": "Calcular la masa molar del gas cloro Cl2 como 35.45 g/mol en vez de multiplicarla por 2 (70.90 g/mol)."
      },
      {
        "trap": "Trampa del reactivo sobrante",
        "correction": "Reportar los moles consumidos en vez de restar los moles consumidos a los moles iniciales para dar los sobrantes."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Comparar las masas en gramos (50 g vs 52 g) para decir cuál es el reactivo limitante: la química no reacciona gramo a gramo sino mol a mol."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "No corregir la masa por el porcentaje de pureza antes de calcular los moles."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Calcular el producto a partir del reactivo en exceso en lugar del reactivo limitante, obteniendo una cantidad de producto que viola la conservación de masa."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Mol?",
          "back": "Cantidad de sustancia que contiene exactamente tantas partículas elementales como átomos hay en exactamente 12 gramos del isótopo puro de Carbono-12. (Notación: 6.022 * 10^23 partículas)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Masa Molar (M)?",
          "back": "Masa en gramos de exactamente un mol de átomos, moléculas o unidades fórmula de una sustancia química. (Notación: g/mol)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Reactivo Limitante?",
          "back": "Sustancia que se agota por completo en primer lugar durante una reacción química, determinando el límite máximo teórico de producto formado. (Notación: Determina el rendimiento)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Reactivo en Exceso?",
          "back": "Sustancia presente en una cantidad molar superior a la requerida por la estequiometría de la reacción, de la cual queda una porción sin reaccionar. (Notación: Masa sobrante > 0)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Rendimiento Porcentual?",
          "back": "Razón porcentual entre la masa de producto realmente obtenida en el laboratorio y la masa teórica máxima predicha por la estequiometría. (Notación: % = (Real / Teórico) * 100)"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Mol",
          "Masa Molar (M)",
          "Reactivo Limitante",
          "Reactivo en Exceso",
          "Rendimiento Porcentual"
        ],
        "notes": [
          "Paso 1: Escribir la ecuación química con fórmulas correctas y balancear todos los coeficientes estequiométricos por tanteo o método algebraico.",
          "Paso 2: Si los reactivos tienen impurezas, multiplicar la masa cruda por el porcentaje de pureza dividido entre 100 para obtener la masa pura real.",
          "Paso 3: Convertir las masas puras de todos los reactivos suministrados a moles dividiendo entre sus respectivas masas molares: n = m / M.",
          "Paso 4: Identificar el reactivo limitante dividiendo los moles calculados de cada reactivo entre su propio coeficiente estequiométrico: el menor valor numérico es el reactivo limitante.",
          "Paso 5: Utilizar exclusivamente los moles del reactivo limitante para calcular los moles teóricos de producto formado mediante la razón de coeficientes."
        ],
        "summary": "Conversiones mol-gramo, balanceo sistemático de ecuaciones, identificación matemática del reactivo limitante por relaciones estequiométricas, corrección por pureza y cálculo de rendimiento porcentual."
      },
      "conceptMapNodes": "Principios de Química I: Estequiometría, Reactivo Limitante, Pureza y Rendimiento\n  ├── Fundamento: Principios de Química I · Código 3401 (UCV Ciencias)\n  ├── Ecuaciones: Mol, Masa Molar (M), Reactivo Limitante\n  └── Protocolo: Paso 1: Escribir la ecuación química con fórmulas correctas y balancear todos los coeficientes estequiométricos por tanteo o método algebraico. -> Paso 2: Si los reactivos tienen impurezas, multiplicar la masa cruda por el porcentaje de pureza dividido entre 100 para obtener la masa pura real. -> Paso 3: Convertir las masas puras de todos los reactivos suministrados a moles dividiendo entre sus respectivas masas molares: n = m / M."
    },
    "generatedQuestions": [
      {
        "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
        "tema": "Principios de Química I: Estequiometría, Reactivo Limitante, Pureza y Rendimiento",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Principios de Química I: Estequiometría, Reactivo Limitante, Pureza y Rendimiento?",
        "opciones": [
          "Conversiones mol-gramo, balanceo sistemático de ecuaciones, identificación matemática del reactivo l",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Conversiones mol-gramo, balanceo sistemático de ecuaciones, identificación matemática del reactivo l",
        "justificacion": "**Concepto Fundamental:** Principios de Química I: Estequiometría, Reactivo Limitante, Pureza y Rendimiento\n\n**Resolución Directa:** La estequiometría es la contabilidad cuantitativa de la materia en las reacciones químicas, cimentada en la Ley de Conservación de la Masa. Dado que los átomos no se pueden contar ..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-qgi-estequiometria'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-estequiometria']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-estequiometria'],
  },
  {
    "id": "santiago-qgi-disoluciones-reacciones-guide",
    "evaluationEventId": "santiago-qgi-parcial-3",
    "guideMetadata": {
      "title": "Principios de Química I: Reacciones Acuosas, Solubilidad, Neutralización y Redox Ion-Electrón",
      "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
      "summary": "Disociación electrolítica, reglas de solubilidad de sales inorgánicas, ecuaciones moleculares e iónicas netas, estequiometría de titulaciones ácido-base y balanceo metódico de semirreacciones redox."
    },
    "phenomenonAndTheory": "La gran mayoría de los procesos químicos ocurren en fase acuosa, donde el agua polar actúa como disolvente facilitando la interacción iónica. Los solutos se dividen en electrolitos fuertes (que se disocian al 100% en iones libres conduciendo fuertemente la corriente), electrolitos débiles (que se ionizan parcialmente en equilibrio dinámico) y no electrolitos (que se disuelven como moléculas neutras intactas). Las reacciones acuosas abarcan tres grandes familias: 1) Reacciones de precipitación, descritas por reglas de solubilidad y sintetizadas en ecuaciones iónicas netas donde se eliminan los iones espectadores; 2) Reacciones ácido-base de Brønsted-Lowry, basadas en la transferencia de protones H+ y analizadas mediante titulaciones volumétricas estandarizadas; y 3) Reacciones de óxido-reducción (Redox), donde ocurre transferencia neta de electrones, balanceadas rigurosamente por el método del ion-electrón en medio ácido o básico.",
    "glossary": [
      {
        "term": "Ecuación Iónica Neta",
        "definition": "Ecuación química depurada que muestra exclusivamente las especies iónicas y moleculares que participan directamente en la formación de precipitados o enlaces.",
        "symbolOrUnit": "Sin iones espectadores"
      },
      {
        "term": "Ion Espectador",
        "definition": "Ion presente en la disolución acuosa que no experimenta ninguna transformación química ni cambio en su estado de agregación durante el proceso.",
        "symbolOrUnit": "Se cancela a ambos lados"
      },
      {
        "term": "Punto de Equivalencia",
        "definition": "Momento estequiométrico en una titulación donde la cantidad de equivalentes o moles de ácido añadidos neutraliza exactamente a la base presente.",
        "symbolOrUnit": "Moles H+ = Moles OH-"
      },
      {
        "term": "Oxidación / Reducción",
        "definition": "La oxidación es la pérdida neta de electrones (aumento de número de oxidación); la reducción es la ganancia de electrones (disminución de número de oxidación).",
        "symbolOrUnit": "LEO dice GER"
      },
      {
        "term": "Método del Ion-Electrón",
        "definition": "Procedimiento algorítmico que separa la reacción redox en dos semirreacciones balanceando sucesivamente elementos, oxígeno (con H2O), hidrógeno (con H+) y carga (con e-).",
        "symbolOrUnit": "Balance de masa y carga"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Ecuación Iónica Neta",
          "latex": "Sin iones espectadores",
          "application": "Ecuación química depurada que muestra exclusivamente las especies iónicas y moleculares que participan directamente en la formación de precipitados o enlaces."
        },
        {
          "name": "Ion Espectador",
          "latex": "Se cancela a ambos lados",
          "application": "Ion presente en la disolución acuosa que no experimenta ninguna transformación química ni cambio en su estado de agregación durante el proceso."
        },
        {
          "name": "Punto de Equivalencia",
          "latex": "Moles H+ = Moles OH-",
          "application": "Momento estequiométrico en una titulación donde la cantidad de equivalentes o moles de ácido añadidos neutraliza exactamente a la base presente."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Para precipitación, consultar las reglas de solubilidad: sales de metales alcalinos y nitratos (NO3-) son siempre solubles; haluros son solubles excepto con Ag+, Pb(2+), Hg2(2+).",
        "Paso 2: Escribir la ecuación molecular balanceada y disociar en iones acuosos únicamente las sustancias solubles y electrolitos fuertes (sólidos, líquidos y gases permanecen intactos).",
        "Paso 3: Cancelar los iones espectadores que aparecen idénticos a la izquierda y derecha para obtener la ecuación iónica neta.",
        "Paso 4: Para balanceo redox por ion-electrón en medio ácido, identificar los números de oxidación y escribir las dos semirreacciones separadas.",
        "Paso 5: En cada semirreacción: balancear átomos distintos de O y H; balancear O agregando moléculas de H2O; balancear H agregando protones H+; balancear la carga neta agregando electrones e-.",
        "Paso 6: Multiplicar las semirreacciones por números enteros para igualar el número de electrones transferidos, sumarlas cancelando electrones e intermediarios, y simplificar.",
        "Regla 1: Todos los nitratos (NO3-), acetatos (CH3COO-) y sales de metales alcalinos del Grupo 1 son 100% solubles en agua.",
        "Regla 2: Los precipitados insolubles, los gases desprendidos y el agua líquida jamás se disocian en la ecuación iónica neta.",
        "Regla 3: En medio ácido los oxígenos se balancean con H2O y los hidrógenos con protones H+; en medio básico se neutralizan los H+ añadiendo OH- a ambos lados.",
        "Regla 4: El número total de electrones cedidos en la oxidación debe ser idéntico al número total de electrones captados en la reducción."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: En el laboratorio de la Escuela de Química de la UCV, s...",
        "problemStatement": "En el laboratorio de la Escuela de Química de la UCV, se mezcla una disolución de permanganato de potasio (KMnO4) con oxalato de sodio (Na2C2O4) en medio ácido acuoso con ácido sulfúrico (H2SO4), generando iones Manganeso (Mn2+) y desprendimiento de gas Dióxido de Carbono (CO2). Balancee la reacción redox completa mediante el método del ion-electrón en medio ácido y determine cuántos mililitros de una disolución 0.0200 M de KMnO4 se requieren para titular exactamente 25.0 mL de una disolución 0.0500 M de Na2C2O4.",
        "deductiveSteps": [
          "Paso 1: Identificamos las especies iónicas activas en la reacción: el ion permanganato MnO4(-) se reduce a Mn(2+) (el manganeso baja de estado de oxidación +7 a +2). El ion oxalato C2O4(2-) se oxida a CO2 (el carbono sube de +3 a +4). El K+, Na+ y SO4(2-) son iones espectadores.",
          "Paso 2: Balanceamos la semirreacción de reducción: MnO4(-) -> Mn(2+). 1 Mn a ambos lados. Agregamos 4 H2O a la derecha para balancear los 4 oxígenos: MnO4(-) -> Mn(2+) + 4 H2O. Agregamos 8 H(+) a la izquierda para balancear hidrógenos: MnO4(-) + 8 H(+) -> Mn(2+) + 4 H2O. Balanceamos carga: izquierda tiene -1 + 8 = +7; derecha tiene +2. Agregamos 5 e- a la izquierda: MnO4(-) + 8 H(+) + 5 e- -> Mn(2+) + 4 H2O.",
          "Paso 3: Balanceamos la semirreacción de oxidación: C2O4(2-) -> CO2. Balanceamos carbonos colocando coeficiente 2 al CO2: C2O4(2-) -> 2 CO2. Oxígenos ya balanceados (4 = 4). Balanceamos carga: izquierda tiene -2; derecha tiene 0. Agregamos 2 e- a la derecha: C2O4(2-) -> 2 CO2 + 2 e-.",
          "Paso 4: Igualamos electrones multiplicando la reducción por 2 y la oxidación por 5 (mínimo común múltiplo 10 e-): 2 MnO4(-) + 16 H(+) + 10 e- -> 2 Mn(2+) + 8 H2O, y 5 C2O4(2-) -> 10 CO2 + 10 e-.",
          "Paso 5: Sumamos y cancelamos los 10 e-: 2 MnO4(-) + 5 C2O4(2-) + 16 H(+) -> 2 Mn(2+) + 10 CO2 + 8 H2O. Verificamos balance de átomos y carga: átomos balanceados; carga izquierda = 2*(-1) + 5*(-2) + 16*(+1) = +4; carga derecha = 2*(+2) = +4. Ecuación iónica neta perfectamente balanceada.",
          "Paso 6: Calculamos la titulación volumétrica: Moles de oxalato disponibles = M * V = 0.0500 mol/L * 0.0250 L = 0.00125 moles de C2O4(2-). Por la estequiometría de la ecuación neta, 5 moles de oxalato reaccionan con 2 moles de permanganato: Moles de KMnO4 necesarios = 0.00125 moles oxalato * (2 moles KMnO4 / 5 moles oxalato) = 0.000500 moles de KMnO4. Calculamos el volumen de KMnO4 0.0200 M: V = n / M = 0.000500 mol / 0.0200 mol/L = 0.0250 L = 25.0 mL."
        ],
        "finalResult": "En el método ion-electrón, el balance de carga es tan obligatorio como el balance de masa: si las cargas no coinciden, la ecuación está mala."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 3 UCV",
        "correction": "Pedir balancear en medio básico y el estudiante deja protones H+ en la ecuación final. Se deben neutralizar sumando OH- en ambos lados para formar agua."
      },
      {
        "trap": "Trampa de iones espectadores",
        "correction": "Escribir el precipitado AgCl(s) como iones separados Ag+ + Cl- en la ecuación iónica neta."
      },
      {
        "trap": "Trampa del peróxido de hidrógeno",
        "correction": "Olvidar que en el H2O2 el estado de oxidación del oxígeno es -1 y no -2."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Balancear el oxígeno con átomos elementales de O o con gas O2 en vez de usar agua H2O en medio acuoso."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Olvidar verificar el balance de carga eléctrica al terminar el método ion-electrón."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Aplicar la fórmula ciega C1*V1 = C2*V2 en titulaciones redox sin considerar la razón estequiométrica (2 a 5 en este caso)."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Ecuación Iónica Neta?",
          "back": "Ecuación química depurada que muestra exclusivamente las especies iónicas y moleculares que participan directamente en la formación de precipitados o enlaces. (Notación: Sin iones espectadores)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Ion Espectador?",
          "back": "Ion presente en la disolución acuosa que no experimenta ninguna transformación química ni cambio en su estado de agregación durante el proceso. (Notación: Se cancela a ambos lados)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Punto de Equivalencia?",
          "back": "Momento estequiométrico en una titulación donde la cantidad de equivalentes o moles de ácido añadidos neutraliza exactamente a la base presente. (Notación: Moles H+ = Moles OH-)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Oxidación / Reducción?",
          "back": "La oxidación es la pérdida neta de electrones (aumento de número de oxidación); la reducción es la ganancia de electrones (disminución de número de oxidación). (Notación: LEO dice GER)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Método del Ion-Electrón?",
          "back": "Procedimiento algorítmico que separa la reacción redox en dos semirreacciones balanceando sucesivamente elementos, oxígeno (con H2O), hidrógeno (con H+) y carga (con e-). (Notación: Balance de masa y carga)"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Ecuación Iónica Neta",
          "Ion Espectador",
          "Punto de Equivalencia",
          "Oxidación / Reducción",
          "Método del Ion-Electrón"
        ],
        "notes": [
          "Paso 1: Para precipitación, consultar las reglas de solubilidad: sales de metales alcalinos y nitratos (NO3-) son siempre solubles; haluros son solubles excepto con Ag+, Pb(2+), Hg2(2+).",
          "Paso 2: Escribir la ecuación molecular balanceada y disociar en iones acuosos únicamente las sustancias solubles y electrolitos fuertes (sólidos, líquidos y gases permanecen intactos).",
          "Paso 3: Cancelar los iones espectadores que aparecen idénticos a la izquierda y derecha para obtener la ecuación iónica neta.",
          "Paso 4: Para balanceo redox por ion-electrón en medio ácido, identificar los números de oxidación y escribir las dos semirreacciones separadas.",
          "Paso 5: En cada semirreacción: balancear átomos distintos de O y H; balancear O agregando moléculas de H2O; balancear H agregando protones H+; balancear la carga neta agregando electrones e-."
        ],
        "summary": "Disociación electrolítica, reglas de solubilidad de sales inorgánicas, ecuaciones moleculares e iónicas netas, estequiometría de titulaciones ácido-base y balanceo metódico de semirreacciones redox."
      },
      "conceptMapNodes": "Principios de Química I: Reacciones Acuosas, Solubilidad, Neutralización y Redox Ion-Electrón\n  ├── Fundamento: Principios de Química I · Código 3401 (UCV Ciencias)\n  ├── Ecuaciones: Ecuación Iónica Neta, Ion Espectador, Punto de Equivalencia\n  └── Protocolo: Paso 1: Para precipitación, consultar las reglas de solubilidad: sales de metales alcalinos y nitratos (NO3-) son siempre solubles; haluros son solubles excepto con Ag+, Pb(2+), Hg2(2+). -> Paso 2: Escribir la ecuación molecular balanceada y disociar en iones acuosos únicamente las sustancias solubles y electrolitos fuertes (sólidos, líquidos y gases permanecen intactos). -> Paso 3: Cancelar los iones espectadores que aparecen idénticos a la izquierda y derecha para obtener la ecuación iónica neta."
    },
    "generatedQuestions": [
      {
        "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
        "tema": "Principios de Química I: Reacciones Acuosas, Solubilidad, Neutralización y Redox Ion-Electrón",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Principios de Química I: Reacciones Acuosas, Solubilidad, Neutralización y Redox Ion-Electrón?",
        "opciones": [
          "Disociación electrolítica, reglas de solubilidad de sales inorgánicas, ecuaciones moleculares e ióni",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Disociación electrolítica, reglas de solubilidad de sales inorgánicas, ecuaciones moleculares e ióni",
        "justificacion": "**Concepto Fundamental:** Principios de Química I: Reacciones Acuosas, Solubilidad, Neutralización y Redox Ion-Electrón\n\n**Resolución Directa:** La gran mayoría de los procesos químicos ocurren en fase acuosa, donde el agua polar actúa como disolvente facilitando la interacción iónica. Los solutos se dividen en electrolitos..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-qgi-disoluciones-reacciones'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-disoluciones']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-disoluciones'],
  },
  {
    "id": "santiago-qgi-gases-guide",
    "evaluationEventId": "santiago-qgi-parcial-3",
    "guideMetadata": {
      "title": "Principios de Química I: Gases Ideales, Presiones Parciales de Dalton y Ecuación de Van der Waals",
      "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
      "summary": "Leyes clásicas de los gases, ecuación general PV=nRT, densidad y masa molar de vapores, recolección de gases sobre agua, teoría cinético-molecular y desviaciones reales por Van der Waals."
    },
    "phenomenonAndTheory": "El estado gaseoso se distingue por la ausencia de volumen y forma fijos, ocupando la totalidad del recipiente que lo contiene mediante colisiones moleculares elásticas contra las paredes que originan la presión macroscópica. Las leyes empíricas de Boyle (P*V constante a T fija), Charles (V/T constante a P fija) y Avogadro (V/n constante a T y P fijas) se integran en la Ecuación de Estado del Gas Ideal PV = nRT. En mezclas gaseosas, la Ley de Presiones Parciales de Dalton establece que la presión total es la suma directa de las presiones que ejercería cada gas individualmente. En los gases recolectados sobre agua en el laboratorio, se debe corregir la presión barométrica restando la presión de vapor saturado del agua. A presiones elevadas y bajas temperaturas, los gases reales se desvían de la idealidad debido a las fuerzas atractivas intermoleculares (corregidas por el factor a) y al volumen propio excluido de las moléculas (corregido por el factor b) en la ecuación de Van der Waals.",
    "glossary": [
      {
        "term": "Gas Ideal",
        "definition": "Modelo físico hipotético de partículas puntuales sin volumen propio entre las cuales no existen fuerzas de atracción ni repulsión interpersonal.",
        "symbolOrUnit": "PV = nRT"
      },
      {
        "term": "Presión Parcial (Pi)",
        "definition": "Presión que ejercería un componente gaseoso individual si ocupara por sí solo el volumen total del recipiente a la misma temperatura.",
        "symbolOrUnit": "Pi = Xi * P_total"
      },
      {
        "term": "Presión de Vapor del Agua (P_H2O)",
        "definition": "Presión ejercida por el vapor en equilibrio dinámico con su líquido a una temperatura fija, que se debe restar al recolectar gases sobre agua.",
        "symbolOrUnit": "P_seco = P_total - P_H2O"
      },
      {
        "term": "Constante Universal de los Gases (R)",
        "definition": "Constante física fundamental que relaciona la energía térmica con la temperatura y la cantidad de sustancia.",
        "symbolOrUnit": "0.08206 atm L / (mol K) = 8.314 J / (mol K)"
      },
      {
        "term": "Ecuación de Van der Waals",
        "definition": "Modificación de la ley del gas ideal que introduce correcciones empíricas a y b para modelar las atracciones intermoleculares y el volumen molecular finito.",
        "symbolOrUnit": "(P + a*n^2/V^2)(V - n*b) = nRT"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Gas Ideal",
          "latex": "PV = nRT",
          "application": "Modelo físico hipotético de partículas puntuales sin volumen propio entre las cuales no existen fuerzas de atracción ni repulsión interpersonal."
        },
        {
          "name": "Presión Parcial (Pi)",
          "latex": "Pi = Xi * P_total",
          "application": "Presión que ejercería un componente gaseoso individual si ocupara por sí solo el volumen total del recipiente a la misma temperatura."
        },
        {
          "name": "Presión de Vapor del Agua (P_H2O)",
          "latex": "P_seco = P_total - P_H2O",
          "application": "Presión ejercida por el vapor en equilibrio dinámico con su líquido a una temperatura fija, que se debe restar al recolectar gases sobre agua."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Convertir todas las variables dadas a unidades consistentes con la constante R elegida: P en atm, V en litros, T en Kelvin (K = °C + 273.15) y n en moles.",
        "Paso 2: Si el gas se recolecta en laboratorio sobre agua, restar inmediatamente la presión de vapor del agua a la temperatura del experimento: P_gas_seco = P_barométrica - P_vapor.",
        "Paso 3: Para calcular la densidad o masa molar de un gas desconocido, emplear la fórmula derivada: M = (rho * R * T) / P o rho = (P * M) / (R * T).",
        "Paso 4: En mezclas gaseosas, calcular la fracción molar Xi = ni / n_total y determinar las presiones parciales mediante Pi = Xi * P_total.",
        "Paso 5: En problemas estequiométricos con gases, usar la relación PV = nRT para convertir volúmenes a moles antes de usar los coeficientes de la reacción.",
        "Paso 6: Si el problema exige modelado real de Van der Waals, sustituir los coeficientes a y b resolviendo la ecuación de presión o volumen correspondiente.",
        "Regla 1: La temperatura en cualquier ecuación de estado de gases debe expresarse estrictamente en la escala absoluta de Kelvin.",
        "Regla 2: En CNTP (Condiciones Normales de Presión y Temperatura: 1 atm y 0 °C), exactamente un mol de cualquier gas ideal ocupa 22.414 Litros.",
        "Regla 3: La presión parcial de un gas es directamente proporcional a su fracción molar: Pi = Xi * P_total.",
        "Regla 4: Los gases reales se comportan de forma más ideal a presiones muy bajas y temperaturas muy altas (lejos de la condensación)."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: En el laboratorio de Principios de Química I de la UCV,...",
        "problemStatement": "En el laboratorio de Principios de Química I de la UCV, se calienta una muestra de 1.500 g de clorato de potasio impuro (KClO3, Masa molar = 122.55 g/mol) descomponiéndose según: 2 KClO3(s) -> 2 KCl(s) + 3 O2(g). El gas oxígeno generado se recolecta sobre agua en una probeta invertida a 25.0 °C y una presión barométrica de 754.0 mmHg, ocupando un volumen de 425.0 mL. Sabiendo que la presión de vapor del agua a 25.0 °C es 23.8 mmHg: a) Calcule los moles de oxígeno seco recolectados; b) Calcule la masa de KClO3 puro que reaccionó; c) Determine el porcentaje de pureza de la muestra inicial.",
        "deductiveSteps": [
          "Paso 1: Corregimos la presión del gas oxígeno seco aplicando la ley de presiones parciales de Dalton: P_O2 = P_total - P_vapor_agua = 754.0 mmHg - 23.8 mmHg = 730.2 mmHg.",
          "Paso 2: Convertimos todas las variables a unidades estándar: Presión P = 730.2 mmHg / 760 mmHg/atm = 0.9608 atm. Volumen V = 425.0 mL / 1000 = 0.4250 L. Temperatura absoluta T = 25.0 + 273.15 = 298.15 K.",
          "Paso 3: Calculamos los moles de O2 seco mediante la ecuación del gas ideal PV = nRT: n_O2 = (P * V) / (R * T) = (0.9608 atm * 0.4250 L) / (0.08206 atm L / (mol K) * 298.15 K) = 0.40834 / 24.466 = 0.01669 moles de O2.",
          "Paso 4: Por la estequiometría de la reacción, 2 moles de KClO3 producen 3 moles de O2: Moles de KClO3 puro reaccionado = 0.01669 moles O2 * (2 moles KClO3 / 3 moles O2) = 0.01113 moles de KClO3.",
          "Paso 5: Calculamos la masa en gramos de KClO3 puro: Masa pura = 0.01113 moles * 122.55 g/mol = 1.364 g de KClO3.",
          "Paso 6: Calculamos el porcentaje de pureza de la muestra inicial: % Pureza = (Masa pura de KClO3 / Masa total de la muestra) * 100 = (1.364 g / 1.500 g) * 100 = 90.9% de pureza."
        ],
        "finalResult": "Recolectar un gas sobre agua siempre atrapa vapor de agua; la presión del gas seco es la diferencia entre la presión atmosférica y el vapor saturado."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 3 UCV",
        "correction": "Preguntar cuál gas se desvía más de la idealidad entre He, CH4 y NH3 a presiones altas. El NH3 se desvía más por poseer enlaces de hidrógeno intermoleculares intensos (factor a grande)."
      },
      {
        "trap": "Trampa de unidades de presión",
        "correction": "Mezclar Torr con Pascales sin usar la relación: 1 atm = 760 Torr = 101325 Pa."
      },
      {
        "trap": "Trampa de la velocidad cuadrática media",
        "correction": "Olvidar que la masa molar M en v_rms = sqrt(3RT/M) debe expresarse en kg/mol y R en 8.314 J/(mol K)."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Usar la temperatura en grados Celsius (°C) en la ecuación PV = nRT en lugar de sumar 273.15 para convertir a Kelvin."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Olvidar restar la presión de vapor del agua al recolectar gases sobre agua, sobrestimando los moles de gas producidos."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Emplear la constante R = 8.314 J/(mol K) cuando la presión está en atmósferas y el volumen en litros: debe usarse R = 0.08206."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Gas Ideal?",
          "back": "Modelo físico hipotético de partículas puntuales sin volumen propio entre las cuales no existen fuerzas de atracción ni repulsión interpersonal. (Notación: PV = nRT)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Presión Parcial (Pi)?",
          "back": "Presión que ejercería un componente gaseoso individual si ocupara por sí solo el volumen total del recipiente a la misma temperatura. (Notación: Pi = Xi * P_total)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Presión de Vapor del Agua (P_H2O)?",
          "back": "Presión ejercida por el vapor en equilibrio dinámico con su líquido a una temperatura fija, que se debe restar al recolectar gases sobre agua. (Notación: P_seco = P_total - P_H2O)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Constante Universal de los Gases (R)?",
          "back": "Constante física fundamental que relaciona la energía térmica con la temperatura y la cantidad de sustancia. (Notación: 0.08206 atm L / (mol K) = 8.314 J / (mol K))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Ecuación de Van der Waals?",
          "back": "Modificación de la ley del gas ideal que introduce correcciones empíricas a y b para modelar las atracciones intermoleculares y el volumen molecular finito. (Notación: (P + a*n^2/V^2)(V - n*b) = nRT)"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Gas Ideal",
          "Presión Parcial (Pi)",
          "Presión de Vapor del Agua (P_H2O)",
          "Constante Universal de los Gases (R)",
          "Ecuación de Van der Waals"
        ],
        "notes": [
          "Paso 1: Convertir todas las variables dadas a unidades consistentes con la constante R elegida: P en atm, V en litros, T en Kelvin (K = °C + 273.15) y n en moles.",
          "Paso 2: Si el gas se recolecta en laboratorio sobre agua, restar inmediatamente la presión de vapor del agua a la temperatura del experimento: P_gas_seco = P_barométrica - P_vapor.",
          "Paso 3: Para calcular la densidad o masa molar de un gas desconocido, emplear la fórmula derivada: M = (rho * R * T) / P o rho = (P * M) / (R * T).",
          "Paso 4: En mezclas gaseosas, calcular la fracción molar Xi = ni / n_total y determinar las presiones parciales mediante Pi = Xi * P_total.",
          "Paso 5: En problemas estequiométricos con gases, usar la relación PV = nRT para convertir volúmenes a moles antes de usar los coeficientes de la reacción."
        ],
        "summary": "Leyes clásicas de los gases, ecuación general PV=nRT, densidad y masa molar de vapores, recolección de gases sobre agua, teoría cinético-molecular y desviaciones reales por Van der Waals."
      },
      "conceptMapNodes": "Principios de Química I: Gases Ideales, Presiones Parciales de Dalton y Ecuación de Van der Waals\n  ├── Fundamento: Principios de Química I · Código 3401 (UCV Ciencias)\n  ├── Ecuaciones: Gas Ideal, Presión Parcial (Pi), Presión de Vapor del Agua (P_H2O)\n  └── Protocolo: Paso 1: Convertir todas las variables dadas a unidades consistentes con la constante R elegida: P en atm, V en litros, T en Kelvin (K = °C + 273.15) y n en moles. -> Paso 2: Si el gas se recolecta en laboratorio sobre agua, restar inmediatamente la presión de vapor del agua a la temperatura del experimento: P_gas_seco = P_barométrica - P_vapor. -> Paso 3: Para calcular la densidad o masa molar de un gas desconocido, emplear la fórmula derivada: M = (rho * R * T) / P o rho = (P * M) / (R * T)."
    },
    "generatedQuestions": [
      {
        "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
        "tema": "Principios de Química I: Gases Ideales, Presiones Parciales de Dalton y Ecuación de Van der Waals",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Principios de Química I: Gases Ideales, Presiones Parciales de Dalton y Ecuación de Van der Waals?",
        "opciones": [
          "Leyes clásicas de los gases, ecuación general PV=nRT, densidad y masa molar de vapores, recolección ",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Leyes clásicas de los gases, ecuación general PV=nRT, densidad y masa molar de vapores, recolección ",
        "justificacion": "**Concepto Fundamental:** Principios de Química I: Gases Ideales, Presiones Parciales de Dalton y Ecuación de Van der Waals\n\n**Resolución Directa:** El estado gaseoso se distingue por la ausencia de volumen y forma fijos, ocupando la totalidad del recipiente que lo contiene mediante colisiones moleculares elásticas contra las p..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-qgi-gases'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-gases']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-gases'],
  },
  {
    "id": "santiago-qgi-disoluciones-coligativas-guide",
    "evaluationEventId": "santiago-qgi-parcial-3",
    "guideMetadata": {
      "title": "Principios de Química I: Disoluciones Ideales, Concentración y Propiedades Coligativas",
      "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
      "summary": "Termodinámica de la disolución, conversiones directas entre Molaridad y Molalidad mediante densidad, Ley de Raoult, descenso crioscópico, presión osmótica y factor i de van t Hoff."
    },
    "phenomenonAndTheory": "Una disolución ideal es una mezcla homogénea donde las fuerzas intermoleculares entre moléculas de soluto y disolvente son idénticas a las fuerzas entre moléculas del disolvente puro, ocurriendo sin cambio neto de entalpía (Delta H_disolución = 0). Las formas cuantitativas de concentración física y química (molaridad, molalidad, fracción molar y porcentajes en masa) permiten cuantificar con precisión la composición de la fase. Las propiedades coligativas son aquellas propiedades físicas de las disoluciones que dependen exclusivamente de la cantidad numérica de partículas de soluto presentes en una masa fija de disolvente y no de la identidad química de las mismas. Comprenden cuatro efectos fundamentales: 1) El descenso de la presión de vapor del disolvente (Ley de Raoult); 2) El aumento ebulloscópico; 3) El descenso crioscópico del punto de congelación; y 4) La presión osmótica. En solutos electrolíticos que se disocian en iones, estas fórmulas se multiplican por el factor de van t Hoff (i).",
    "glossary": [
      {
        "term": "Molaridad (M)",
        "definition": "Concentración volumétrica definida como el número de moles de soluto disueltos en exactamente un litro de disolución total.",
        "symbolOrUnit": "mol / L"
      },
      {
        "term": "Molalidad (m)",
        "definition": "Concentración gravimétrica definida como el número de moles de soluto disueltos por cada kilogramo de disolvente puro (independiente de la temperatura).",
        "symbolOrUnit": "mol / kg disolvente"
      },
      {
        "term": "Ley de Raoult",
        "definition": "Ley que establece que la presión de vapor de un disolvente en una disolución ideal es igual a su presión de vapor puro multiplicada por su fracción molar.",
        "symbolOrUnit": "P1 = X1 * P1°"
      },
      {
        "term": "Descenso Crioscópico (Delta Tf)",
        "definition": "Disminución en la temperatura de congelación de una disolución respecto al disolvente puro, proporcional a la molalidad de partículas disueltas.",
        "symbolOrUnit": "Delta Tf = Kf * m * i"
      },
      {
        "term": "Factor de van t Hoff (i)",
        "definition": "Número real de partículas o iones que se generan por cada unidad de soluto que se disuelve en el medio acuoso.",
        "symbolOrUnit": "i = 1 para no electrolitos; i > 1 para sales"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Molaridad (M)",
          "latex": "mol / L",
          "application": "Concentración volumétrica definida como el número de moles de soluto disueltos en exactamente un litro de disolución total."
        },
        {
          "name": "Molalidad (m)",
          "latex": "mol / kg disolvente",
          "application": "Concentración gravimétrica definida como el número de moles de soluto disueltos por cada kilogramo de disolvente puro (independiente de la temperatura)."
        },
        {
          "name": "Ley de Raoult",
          "latex": "P1 = X1 * P1°",
          "application": "Ley que establece que la presión de vapor de un disolvente en una disolución ideal es igual a su presión de vapor puro multiplicada por su fracción molar."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Asumir una base de cálculo conveniente (por ejemplo, 100 g de disolución si se dan porcentajes en masa, o 1 L si se da molaridad).",
        "Paso 2: Emplear la densidad de la disolución (d = masa / volumen) como puente de conversión entre magnitudes de masa y magnitudes de volumen.",
        "Paso 3: Calcular por separado la masa de soluto y la masa neta de disolvente puro (Masa_disolvente = Masa_total - Masa_soluto).",
        "Paso 4: Identificar si el soluto es un no electrolito molecular (i = 1) o un electrolito iónico (contar los iones formados, ej. NaCl -> 2 iones, i aprox 2; CaCl2 -> 3 iones, i aprox 3).",
        "Paso 5: Para descenso crioscópico o aumento ebulloscópico, calcular la molalidad m = moles_soluto / kg_disolvente y sustituir en Delta T = K * m * i.",
        "Paso 6: Para determinar la masa molar desconocida de una macromolécula, despejar M a partir de la presión osmótica Pi = (moles / V) * R * T * i = (m_soluto / (M * V)) * R * T.",
        "Regla 1: Para pasar de concentraciones en masa a concentraciones volumétricas, la densidad de la disolución es el puente imprescindible.",
        "Regla 2: El factor i de van t Hoff para solutos moleculares neutros como glucosa, sacarosa o urea es estrictamente igual a 1.",
        "Regla 3: En el cálculo de propiedades coligativas, la adición de un soluto no volátil siempre disminuye la presión de vapor, eleva el punto de ebullición y disminuye el punto de congelación.",
        "Regla 4: La presión osmótica Pi = M*R*T*i es la técnica experimental más precisa para determinar pesos moleculares de proteínas y polímeros."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: Una disolución acuosa concentrada contiene 24.0% en mas...",
        "problemStatement": "Una disolución acuosa concentrada contiene 24.0% en masa de cloruro de calcio (CaCl2, Masa molar = 110.98 g/mol) y posee una densidad de 1.21 g/mL a 20 °C. a) Calcule la molaridad y la molalidad de la disolución; b) Sabiendo que la constante crioscópica del agua es Kf = 1.86 °C kg/mol y asumiendo disociación iónica completa de la sal, determine la temperatura a la cual comenzará a congelar dicha disolución.",
        "deductiveSteps": [
          "Paso 1: Tomamos como base de cálculo exactamente 100.0 g de disolución. Por tener 24.0% en masa: Masa de soluto CaCl2 = 24.0 g; Masa de disolvente agua = 100.0 g - 24.0 g = 76.0 g de H2O = 0.0760 kg.",
          "Paso 2: Calculamos los moles de CaCl2 presentes en la muestra: Moles = 24.0 g / 110.98 g/mol = 0.2163 moles de CaCl2.",
          "Paso 3: Calculamos la molalidad (m): m = moles de soluto / kg de agua = 0.2163 moles / 0.0760 kg = 2.846 mol/kg = 2.85 m.",
          "Paso 4: Calculamos el volumen de los 100.0 g de disolución usando la densidad d = 1.21 g/mL: Volumen = Masa / d = 100.0 g / 1.21 g/mL = 82.64 mL = 0.08264 L.",
          "Paso 5: Calculamos la molaridad (M): M = moles de soluto / litros de disolución = 0.2163 moles / 0.08264 L = 2.617 mol/L = 2.62 M.",
          "Paso 6: Evaluamos la congelación: el cloruro de calcio es un electrolito fuerte que se disocia en tres iones: CaCl2(ac) -> Ca(2+) + 2 Cl(-). Por tanto, el factor de van t Hoff teórico es i = 1 + 2 = 3 partículas por unidad fórmula.",
          "Paso 7: Calculamos el descenso del punto de congelación: Delta Tf = Kf * m * i = 1.86 °C kg/mol * 2.846 mol/kg * 3 = 15.88 °C. Como el agua pura congela a 0.00 °C, la temperatura de congelación final de la disolución es: T_congelación = 0.00 °C - 15.88 °C = -15.88 °C (aprox -15.9 °C)."
        ],
        "finalResult": "La molalidad no cambia con la temperatura porque se basa en masas, mientras que la molaridad sí varía por la dilatación térmica del volumen."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 3 UCV",
        "correction": "Preguntar cuál disolución acuosa 0.1 m tiene el menor punto de congelación entre Glucosa, NaCl y AlCl3. El AlCl3 se disocia en 4 iones (i = 4), produciendo el mayor descenso crioscópico y por ende la temperatura más baja bajo cero."
      },
      {
        "trap": "Trampa de la fracción molar",
        "correction": "En la ley de Raoult Delta P = X_soluto * P_disolvente°, usar la fracción molar del disolvente en lugar de la del soluto al calcular la caída directa de presión."
      },
      {
        "trap": "Trampa de unidades en ósmosis",
        "correction": "Usar la presión en mmHg en la fórmula Pi = MRT sin convertir a atmósferas."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Confundir kilogramos de disolución con kilogramos de disolvente en el denominador de la molalidad: se debe restar la masa del soluto."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Olvidar incluir el factor de van t Hoff i para sales iónicas, cometiendo un error de factor 2 o 3 en la respuesta."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Reportar la temperatura de congelación con signo positivo: el descenso crioscópico implica que la solución congela por debajo de 0 °C."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Molaridad (M)?",
          "back": "Concentración volumétrica definida como el número de moles de soluto disueltos en exactamente un litro de disolución total. (Notación: mol / L)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Molalidad (m)?",
          "back": "Concentración gravimétrica definida como el número de moles de soluto disueltos por cada kilogramo de disolvente puro (independiente de la temperatura). (Notación: mol / kg disolvente)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Ley de Raoult?",
          "back": "Ley que establece que la presión de vapor de un disolvente en una disolución ideal es igual a su presión de vapor puro multiplicada por su fracción molar. (Notación: P1 = X1 * P1°)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Descenso Crioscópico (Delta Tf)?",
          "back": "Disminución en la temperatura de congelación de una disolución respecto al disolvente puro, proporcional a la molalidad de partículas disueltas. (Notación: Delta Tf = Kf * m * i)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Factor de van t Hoff (i)?",
          "back": "Número real de partículas o iones que se generan por cada unidad de soluto que se disuelve en el medio acuoso. (Notación: i = 1 para no electrolitos; i > 1 para sales)"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Molaridad (M)",
          "Molalidad (m)",
          "Ley de Raoult",
          "Descenso Crioscópico (Delta Tf)",
          "Factor de van t Hoff (i)"
        ],
        "notes": [
          "Paso 1: Asumir una base de cálculo conveniente (por ejemplo, 100 g de disolución si se dan porcentajes en masa, o 1 L si se da molaridad).",
          "Paso 2: Emplear la densidad de la disolución (d = masa / volumen) como puente de conversión entre magnitudes de masa y magnitudes de volumen.",
          "Paso 3: Calcular por separado la masa de soluto y la masa neta de disolvente puro (Masa_disolvente = Masa_total - Masa_soluto).",
          "Paso 4: Identificar si el soluto es un no electrolito molecular (i = 1) o un electrolito iónico (contar los iones formados, ej. NaCl -> 2 iones, i aprox 2; CaCl2 -> 3 iones, i aprox 3).",
          "Paso 5: Para descenso crioscópico o aumento ebulloscópico, calcular la molalidad m = moles_soluto / kg_disolvente y sustituir en Delta T = K * m * i."
        ],
        "summary": "Termodinámica de la disolución, conversiones directas entre Molaridad y Molalidad mediante densidad, Ley de Raoult, descenso crioscópico, presión osmótica y factor i de van t Hoff."
      },
      "conceptMapNodes": "Principios de Química I: Disoluciones Ideales, Concentración y Propiedades Coligativas\n  ├── Fundamento: Principios de Química I · Código 3401 (UCV Ciencias)\n  ├── Ecuaciones: Molaridad (M), Molalidad (m), Ley de Raoult\n  └── Protocolo: Paso 1: Asumir una base de cálculo conveniente (por ejemplo, 100 g de disolución si se dan porcentajes en masa, o 1 L si se da molaridad). -> Paso 2: Emplear la densidad de la disolución (d = masa / volumen) como puente de conversión entre magnitudes de masa y magnitudes de volumen. -> Paso 3: Calcular por separado la masa de soluto y la masa neta de disolvente puro (Masa_disolvente = Masa_total - Masa_soluto)."
    },
    "generatedQuestions": [
      {
        "area": "Principios de Química I · Código 3401 (UCV Ciencias)",
        "tema": "Principios de Química I: Disoluciones Ideales, Concentración y Propiedades Coligativas",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Principios de Química I: Disoluciones Ideales, Concentración y Propiedades Coligativas?",
        "opciones": [
          "Termodinámica de la disolución, conversiones directas entre Molaridad y Molalidad mediante densidad,",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Termodinámica de la disolución, conversiones directas entre Molaridad y Molalidad mediante densidad,",
        "justificacion": "**Concepto Fundamental:** Principios de Química I: Disoluciones Ideales, Concentración y Propiedades Coligativas\n\n**Resolución Directa:** Una disolución ideal es una mezcla homogénea donde las fuerzas intermoleculares entre moléculas de soluto y disolvente son idénticas a las fuerzas entre moléculas del disolvente pu..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-qgi-disoluciones-coligativas'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-gases']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-qgi-gases'],
  }
];
