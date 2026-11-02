/**
 * @file santiago_matematica1.ts
 * @description Guías Académicas Deconstruidas Oficiales (7 Pilares) para SANTIAGO_MATEMATICA1_GUIDES.
 * Formato canónico riguroso compatible con DeconstructedAcademicGuide.
 */

import type { DeconstructedAcademicGuide } from '../../types/deconstruction.types';
import { SANTIAGO_MULTIMEDIA_CATALOG } from '../santiago_multimedia';
import { SANTIAGO_RESEARCH_PROMPTS } from '../santiago_prompts';

export const SANTIAGO_MATEMATICA1_GUIDES: DeconstructedAcademicGuide[] = [
  {
    "id": "santiago-mat1-curvas-guide",
    "evaluationEventId": "santiago-mat1-parcial-1",
    "guideMetadata": {
      "title": "Matemática I: Estudio de Curvas, Monotonía y Caminos de Ida y Vuelta",
      "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
      "summary": "Lectura geométrica integral de funciones continuas, intervalos de crecimiento, cotas, ceros, puntos notables y determinación gráfica de soluciones mediante caminos directos e inversos."
    },
    "phenomenonAndTheory": "El estudio de curvas de Pedro Alson aborda las funciones reales no como fórmulas ciegas, sino como figuras geométricas continuas que comunican relaciones directas entre dos ejes ortogonales. Para graficar una curva sin calcular cientos de puntos aislados, leemos sus propiedades globales: dónde existe (dominio), entre qué valores se mantiene atrapada (cotas superiores e inferiores), dónde sube o baja (monotonía), y cómo conecta sus extremos. El camino de ida consiste en elegir un punto en el eje horizontal y seguir la línea vertical hasta tocar la curva para leer su altura. El camino de vuelta hace lo contrario: fijamos una altura en el eje vertical, trazamos una horizontal imaginaria y encontramos todas las preimágenes que caen en el eje horizontal.",
    "glossary": [
      {
        "term": "Camino de Ida",
        "definition": "Recorrido geométrico que parte de un valor x en el dominio, sube o baja verticalmente hasta la curva y proyecta horizontalmente su valor f(x) sobre el eje y.",
        "symbolOrUnit": "x -> f(x)"
      },
      {
        "term": "Camino de Vuelta",
        "definition": "Recorrido inverso que parte de un valor y fijado en el eje vertical, traza una recta horizontal hacia la curva y baja verticalmente para hallar las preimágenes x.",
        "symbolOrUnit": "y -> f^(-1)(y)"
      },
      {
        "term": "Cota Superior / Inferior",
        "definition": "Línea horizontal y = M por encima de la cual la curva jamás sube (cota superior), o y = m por debajo de la cual la curva jamás desciende (cota inferior).",
        "symbolOrUnit": "m <= f(x) <= M"
      },
      {
        "term": "Intervalo de Monotonía",
        "definition": "Región continua del eje x donde la curva sube estrictamente de izquierda a derecha (creciente) o baja estrictamente (decreciente).",
        "symbolOrUnit": "x1 < x2 => f(x1) < f(x2)"
      },
      {
        "term": "Punto Notable de Corte",
        "definition": "Intersección exacta de la curva con el eje horizontal x (donde la función vale cero) o con el eje vertical y (valor inicial f(0)).",
        "symbolOrUnit": "(x0, 0) y (0, f(0))"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Camino de Ida",
          "latex": "x -> f(x)",
          "application": "Recorrido geométrico que parte de un valor x en el dominio, sube o baja verticalmente hasta la curva y proyecta horizontalmente su valor f(x) sobre el eje y."
        },
        {
          "name": "Camino de Vuelta",
          "latex": "y -> f^(-1)(y)",
          "application": "Recorrido inverso que parte de un valor y fijado en el eje vertical, traza una recta horizontal hacia la curva y baja verticalmente para hallar las preimágenes x."
        },
        {
          "name": "Cota Superior / Inferior",
          "latex": "m <= f(x) <= M",
          "application": "Línea horizontal y = M por encima de la cual la curva jamás sube (cota superior), o y = m por debajo de la cual la curva jamás desciende (cota inferior)."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Delimitar el dominio sobre el eje horizontal x identificando puntos de corte, discontinuidades y extremos del intervalo.",
        "Paso 2: Trazar las líneas horizontales de cota superior e inferior para encerrar la franja permitida donde puede vivir la curva.",
        "Paso 3: Marcar los puntos fijos obligatorios dados en las condiciones del problema (puntos de paso, máximos y mínimos absolutos).",
        "Paso 4: Trazar la curva uniendo los puntos con suavidad continua respetando la monotonía exigida (creciente o decreciente) en cada tramo.",
        "Paso 5: Verificar que la curva no cruce ninguna cota ni genere cruces adicionales con el eje horizontal fuera de los ceros permitidos.",
        "Paso 6: Emplear el camino de vuelta para ubicar visualmente las preimágenes pedidas en el enunciado proyectando rectas horizontales hacia el eje x.",
        "Regla 1: Si una función es estrictamente monótona en un intervalo cerrado, cualquier recta horizontal entre sus extremos la corta exactamente una vez.",
        "Regla 2: El camino de vuelta solo tiene respuesta única si la función es inyectiva en ese tramo horizontal.",
        "Regla 3: Toda curva continua definida en un intervalo cerrado alcanza obligatoriamente su valor máximo y mínimo absoluto.",
        "Regla 4: Antes de trazar una sola línea, ubica todos los puntos guía conocidos y las líneas de cota como un marco arquitectónico."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: Grafique una curva continua continua y = f(x) en el dom...",
        "problemStatement": "Grafique una curva continua continua y = f(x) en el dominio [-4, 6] que satisfaga: f(-4) = -2, f(0) = 3, f(6) = 1. Presenta un mínimo absoluto en x = -2 con valor f(-2) = -4, un máximo absoluto en x = 3 con valor f(3) = 5, y es estrictamente creciente en [-2, 3] y decreciente en [-4, -2] y [3, 6]. Indique cuántas soluciones tiene la ecuación f(x) = 2 en dicho intervalo.",
        "deductiveSteps": [
          "Paso 1: Dibujamos los ejes y delimitamos el rectángulo de trabajo para x entre -4 y 6, y para y entre -4 (mínimo absoluto) y 5 (máximo absoluto).",
          "Paso 2: Marcamos en el plano los cinco puntos de paso conocidos: (-4, -2), (-2, -4), (0, 3), (3, 5) y (6, 1).",
          "Paso 3: De x = -4 a x = -2 la curva desciende con suavidad desde y = -2 hasta el fondo del valle en y = -4 sin ondulaciones extrañas.",
          "Paso 4: De x = -2 a x = 3 la curva asciende continuamente, pasando obligatoriamente por el corte vertical (0, 3) y cruzando el eje horizontal en un único punto intermedio entre -2 y 0, hasta alcanzar la cresta en (3, 5).",
          "Paso 5: De x = 3 a x = 6 la curva desciende suavemente desde y = 5 hasta finalizar en el punto cerrado (6, 1).",
          "Paso 6: Para resolver f(x) = 2, trazamos la recta horizontal y = 2 (camino de vuelta). Esta recta corta la curva en exactamente dos puntos: uno en el tramo creciente entre x = -2 y x = 0 (donde pasa de -4 a 3), y otro en el tramo decreciente entre x = 3 y x = 6 (donde pasa de 5 a 1). La ecuación tiene exactamente 2 soluciones reales."
        ],
        "finalResult": "La monotonía estricta garantiza que dentro de cada tramo monótono la curva solo puede cortar una recta horizontal como máximo una sola vez."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 1 UCV",
        "correction": "Pedir hallar las preimágenes de un valor y dibujar la curva con un tramo horizontal plano donde habría infinitas preimágenes."
      },
      {
        "trap": "Trampa de cotas",
        "correction": "Colocar una cota inferior que sea mayor que el valor del mínimo indicado, lo cual es geométricamente contradictorio."
      },
      {
        "trap": "Trampa de extremos",
        "correction": "Ignorar que f(x) puede cortar varias veces la recta y = c si la curva sube y baja varias veces en el intervalo."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Dibujar ondas adicionales que crucen el eje horizontal más veces de las permitidas por la monotonía del tramo."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Confundir una cota superior con un máximo: la cota puede no ser alcanzada por la curva, mientras que el máximo es un valor real f(x)."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Olvidar cerrar los extremos del intervalo con puntos llenos si el dominio es cerrado o puntos huecos si es abierto."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Camino de Ida?",
          "back": "Recorrido geométrico que parte de un valor x en el dominio, sube o baja verticalmente hasta la curva y proyecta horizontalmente su valor f(x) sobre el eje y. (Notación: x -> f(x))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Camino de Vuelta?",
          "back": "Recorrido inverso que parte de un valor y fijado en el eje vertical, traza una recta horizontal hacia la curva y baja verticalmente para hallar las preimágenes x. (Notación: y -> f^(-1)(y))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Cota Superior / Inferior?",
          "back": "Línea horizontal y = M por encima de la cual la curva jamás sube (cota superior), o y = m por debajo de la cual la curva jamás desciende (cota inferior). (Notación: m <= f(x) <= M)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Intervalo de Monotonía?",
          "back": "Región continua del eje x donde la curva sube estrictamente de izquierda a derecha (creciente) o baja estrictamente (decreciente). (Notación: x1 < x2 => f(x1) < f(x2))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Punto Notable de Corte?",
          "back": "Intersección exacta de la curva con el eje horizontal x (donde la función vale cero) o con el eje vertical y (valor inicial f(0)). (Notación: (x0, 0) y (0, f(0)))"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Camino de Ida",
          "Camino de Vuelta",
          "Cota Superior / Inferior",
          "Intervalo de Monotonía",
          "Punto Notable de Corte"
        ],
        "notes": [
          "Paso 1: Delimitar el dominio sobre el eje horizontal x identificando puntos de corte, discontinuidades y extremos del intervalo.",
          "Paso 2: Trazar las líneas horizontales de cota superior e inferior para encerrar la franja permitida donde puede vivir la curva.",
          "Paso 3: Marcar los puntos fijos obligatorios dados en las condiciones del problema (puntos de paso, máximos y mínimos absolutos).",
          "Paso 4: Trazar la curva uniendo los puntos con suavidad continua respetando la monotonía exigida (creciente o decreciente) en cada tramo.",
          "Paso 5: Verificar que la curva no cruce ninguna cota ni genere cruces adicionales con el eje horizontal fuera de los ceros permitidos."
        ],
        "summary": "Lectura geométrica integral de funciones continuas, intervalos de crecimiento, cotas, ceros, puntos notables y determinación gráfica de soluciones mediante caminos directos e inversos."
      },
      "conceptMapNodes": "Matemática I: Estudio de Curvas, Monotonía y Caminos de Ida y Vuelta\n  ├── Fundamento: Matemática I · Cátedra Pedro Alson (UCV Ciencias)\n  ├── Ecuaciones: Camino de Ida, Camino de Vuelta, Cota Superior / Inferior\n  └── Protocolo: Paso 1: Delimitar el dominio sobre el eje horizontal x identificando puntos de corte, discontinuidades y extremos del intervalo. -> Paso 2: Trazar las líneas horizontales de cota superior e inferior para encerrar la franja permitida donde puede vivir la curva. -> Paso 3: Marcar los puntos fijos obligatorios dados en las condiciones del problema (puntos de paso, máximos y mínimos absolutos)."
    },
    "generatedQuestions": [
      {
        "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
        "tema": "Matemática I: Estudio de Curvas, Monotonía y Caminos de Ida y Vuelta",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Matemática I: Estudio de Curvas, Monotonía y Caminos de Ida y Vuelta?",
        "opciones": [
          "Lectura geométrica integral de funciones continuas, intervalos de crecimiento, cotas, ceros, puntos ",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Lectura geométrica integral de funciones continuas, intervalos de crecimiento, cotas, ceros, puntos ",
        "justificacion": "**Concepto Fundamental:** Matemática I: Estudio de Curvas, Monotonía y Caminos de Ida y Vuelta\n\n**Resolución Directa:** El estudio de curvas de Pedro Alson aborda las funciones reales no como fórmulas ciegas, sino como figuras geométricas continuas que comunican relaciones directas entre dos ejes or..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-mat1-curvas'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-curvas']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-curvas'],
  },
  {
    "id": "santiago-mat1-operaciones-guide",
    "evaluationEventId": "santiago-mat1-taller-operaciones",
    "guideMetadata": {
      "title": "Matemática I: Operaciones con Curvas, Curva Recíproca y Composición",
      "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
      "summary": "Suma y producto geométrico de ordenadas, determinación de ceros y polos en la curva recíproca 1/f(x), análisis asintótico y método de la bisectriz y = x para funciones compuestas."
    },
    "phenomenonAndTheory": "Las operaciones con curvas permiten sintetizar gráficas complejas sumando, multiplicando o invirtiendo visualmente dos curvas conocidas sin recurrir a tablas numéricas interminables. Para sumar f(x) + g(x), sumamos las alturas verticales punto a punto: donde una curva vale cero, la curva suma pasa exactamente por la otra; donde ambas curvas se cruzan, la suma alcanza el doble de esa altura. Para la curva recíproca 1/f(x), cada cero de f(x) se convierte en una asíntota vertical inquebrantable, las crestas se invierten en valles, y los valores muy grandes se comprimen cerca del eje horizontal. Para componer curvas g(f(x)), utilizamos la recta bisectriz y = x como un espejo a 45 grados que transforma la salida vertical de la primera curva en la entrada horizontal de la segunda.",
    "glossary": [
      {
        "term": "Suma de Curvas f + g",
        "definition": "Curva cuya altura en cada posición x es la adición algebraica directa de las ordenadas verticales de f y g.",
        "symbolOrUnit": "(f + g)(x) = f(x) + g(x)"
      },
      {
        "term": "Curva Recíproca 1/f",
        "definition": "Transformación donde cada altura y se sustituye por 1/y. Los ceros de f(x) se convierten en asíntotas verticales y los valores +/- 1 permanecen invariantes.",
        "symbolOrUnit": "y = 1 / f(x)"
      },
      {
        "term": "Puntos Invariantes de la Recíproca",
        "definition": "Puntos donde f(x) = 1 o f(x) = -1, en los cuales la curva original y la curva recíproca se tocan exactamente a la misma altura.",
        "symbolOrUnit": "f(x) = 1 => 1/f(x) = 1"
      },
      {
        "term": "Recta Bisectriz y = x",
        "definition": "Línea diagonal a 45 grados utilizada como herramienta auxiliar de transporte de coordenadas para pasar de una pantalla vertical a una horizontal.",
        "symbolOrUnit": "y = x"
      },
      {
        "term": "Producto de Curvas f * g",
        "definition": "Curva obtenida multiplicando los valores de f y g en cada x. Sus ceros corresponden a la unión de los ceros de ambas curvas originales.",
        "symbolOrUnit": "(f * g)(x) = 0 <=> f(x) = 0 o g(x) = 0"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Suma de Curvas f + g",
          "latex": "(f + g)(x) = f(x) + g(x)",
          "application": "Curva cuya altura en cada posición x es la adición algebraica directa de las ordenadas verticales de f y g."
        },
        {
          "name": "Curva Recíproca 1/f",
          "latex": "y = 1 / f(x)",
          "application": "Transformación donde cada altura y se sustituye por 1/y. Los ceros de f(x) se convierten en asíntotas verticales y los valores +/- 1 permanecen invariantes."
        },
        {
          "name": "Puntos Invariantes de la Recíproca",
          "latex": "f(x) = 1 => 1/f(x) = 1",
          "application": "Puntos donde f(x) = 1 o f(x) = -1, en los cuales la curva original y la curva recíproca se tocan exactamente a la misma altura."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Dibujar las curvas base f(x) y g(x) en el mismo plano cartesiano con trazos finos o colores contrastantes.",
        "Paso 2: Marcar los puntos notables clave: ceros de ambas curvas, puntos de corte mutuo y puntos donde valen 1 o -1.",
        "Paso 3: Para la suma f + g, ubicar los puntos directos: en los ceros de g la suma pasa por f, y donde f = g la suma pasa por 2f.",
        "Paso 4: Para la curva recíproca 1/f, levantar asíntotas verticales punteadas en cada corte de f con el eje x y conservar los puntos en y = 1 y y = -1.",
        "Paso 5: Trazar las ramas asintóticas de 1/f verificando los signos: si f es positiva y tiende a cero, 1/f se dispara hacia +infinito.",
        "Paso 6: Para la composición g(f(x)), evaluar un valor x, subir hasta f(x), rebotar horizontalmente en la recta y = x y bajar o subir hasta g.",
        "Regla 1: Si f(x) cruza el eje x con pendiente no nula, la recíproca 1/f(x) tiene signos opuestos a ambos lados de la asíntota.",
        "Regla 2: El producto de dos curvas conserva la regla algebraica de signos: positivo por positivo da positivo, positivo por negativo da negativo.",
        "Regla 3: En la composición g(f(x)), el recorrido de f debe estar contenido en el dominio permitido de g para que la operación exista.",
        "Regla 4: Al sumar una recta con pendiente m y una curva acotada, la suma adquiere asintóticamente la misma inclinación de la recta."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: Dada la parábola f(x) = x^2 - 4, dibuje de forma analít...",
        "problemStatement": "Dada la parábola f(x) = x^2 - 4, dibuje de forma analítica y geométrica su curva recíproca r(x) = 1 / (x^2 - 4) identificando asíntotas verticales, horizontales, extremos locales y signos.",
        "deductiveSteps": [
          "Paso 1: Analizamos la curva original f(x) = x^2 - 4. Sus ceros ocurren en x = -2 y x = 2. Su vértice es un mínimo absoluto en (0, -4). Para |x| > 2 es estrictamente positiva y crece hacia +infinito.",
          "Paso 2: En la curva recíproca r(x) = 1/f(x), los ceros x = -2 y x = 2 generan asíntotas verticales obligatorias en x = -2 y x = 2.",
          "Paso 3: En el tramo central (-2, 2), f(x) es negativa. Su mínimo en (0, -4) se transforma en un máximo local de la recíproca en el punto (0, -1/4). Al acercarse a -2 por la derecha o a 2 por la izquierda, f(x) tiende a 0 por valores negativos, por lo que r(x) se desploma hacia -infinito formando una rama en U invertida.",
          "Paso 4: En los tramos laterales x < -2 y x > 2, f(x) es positiva. Al acercarse a las asíntotas, r(x) tiende a +infinito. Cuando x tiende a +/- infinito, f(x) se hace enorme, por lo que r(x) tiende a 0 por arriba generando la asíntota horizontal y = 0.",
          "Paso 5: Identificamos los puntos invariantes: f(x) = 1 cuando x^2 = 5 (x = +/- sqrt(5)), donde la recíproca vale exactamente 1.",
          "Paso 6: Unimos las tres ramas suaves: dos ramas hiperbólicas decrecientes en los costados exteriores que mueren en el eje horizontal, y una cúpula suave central con cúspide en -1/4 que desciende hacia ambos lados."
        ],
        "finalResult": "Invertir una función intercambia ceros por asíntotas y transforma crestas altas en valles muy cercanos al cero horizontal."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial UCV",
        "correction": "Pedir la gráfica de f(x)/g(x) y olvidar que los ceros de g(x) generan asíntotas verticales obligatorias aunque f(x) también valga cero (salvo discontinuidad evitable)."
      },
      {
        "trap": "Trampa de duplicación",
        "correction": "En la curva suma f + g, los estudiantes olvidan que en el punto donde se intersectan f y g la altura es el doble."
      },
      {
        "trap": "Trampa de la bisectriz",
        "correction": "Usar la recta y = -x en vez de y = x para transportar las coordenadas de la función interior a la exterior."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Olvidar cambiar el signo al cruzar la asíntota vertical, dibujando ambas ramas hacia el mismo lado cuando la función cambia de signo."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Creer que la recíproca de cero es cero: 1/0 es una indeterminación que genera una asíntota vertical infinita."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Dejar que la curva recíproca corte el eje horizontal: 1/f(x) jamás puede valer cero para valores finitos."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Suma de Curvas f + g?",
          "back": "Curva cuya altura en cada posición x es la adición algebraica directa de las ordenadas verticales de f y g. (Notación: (f + g)(x) = f(x) + g(x))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Curva Recíproca 1/f?",
          "back": "Transformación donde cada altura y se sustituye por 1/y. Los ceros de f(x) se convierten en asíntotas verticales y los valores +/- 1 permanecen invariantes. (Notación: y = 1 / f(x))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Puntos Invariantes de la Recíproca?",
          "back": "Puntos donde f(x) = 1 o f(x) = -1, en los cuales la curva original y la curva recíproca se tocan exactamente a la misma altura. (Notación: f(x) = 1 => 1/f(x) = 1)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Recta Bisectriz y = x?",
          "back": "Línea diagonal a 45 grados utilizada como herramienta auxiliar de transporte de coordenadas para pasar de una pantalla vertical a una horizontal. (Notación: y = x)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Producto de Curvas f * g?",
          "back": "Curva obtenida multiplicando los valores de f y g en cada x. Sus ceros corresponden a la unión de los ceros de ambas curvas originales. (Notación: (f * g)(x) = 0 <=> f(x) = 0 o g(x) = 0)"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Suma de Curvas f + g",
          "Curva Recíproca 1/f",
          "Puntos Invariantes de la Recíproca",
          "Recta Bisectriz y = x",
          "Producto de Curvas f * g"
        ],
        "notes": [
          "Paso 1: Dibujar las curvas base f(x) y g(x) en el mismo plano cartesiano con trazos finos o colores contrastantes.",
          "Paso 2: Marcar los puntos notables clave: ceros de ambas curvas, puntos de corte mutuo y puntos donde valen 1 o -1.",
          "Paso 3: Para la suma f + g, ubicar los puntos directos: en los ceros de g la suma pasa por f, y donde f = g la suma pasa por 2f.",
          "Paso 4: Para la curva recíproca 1/f, levantar asíntotas verticales punteadas en cada corte de f con el eje x y conservar los puntos en y = 1 y y = -1.",
          "Paso 5: Trazar las ramas asintóticas de 1/f verificando los signos: si f es positiva y tiende a cero, 1/f se dispara hacia +infinito."
        ],
        "summary": "Suma y producto geométrico de ordenadas, determinación de ceros y polos en la curva recíproca 1/f(x), análisis asintótico y método de la bisectriz y = x para funciones compuestas."
      },
      "conceptMapNodes": "Matemática I: Operaciones con Curvas, Curva Recíproca y Composición\n  ├── Fundamento: Matemática I · Cátedra Pedro Alson (UCV Ciencias)\n  ├── Ecuaciones: Suma de Curvas f + g, Curva Recíproca 1/f, Puntos Invariantes de la Recíproca\n  └── Protocolo: Paso 1: Dibujar las curvas base f(x) y g(x) en el mismo plano cartesiano con trazos finos o colores contrastantes. -> Paso 2: Marcar los puntos notables clave: ceros de ambas curvas, puntos de corte mutuo y puntos donde valen 1 o -1. -> Paso 3: Para la suma f + g, ubicar los puntos directos: en los ceros de g la suma pasa por f, y donde f = g la suma pasa por 2f."
    },
    "generatedQuestions": [
      {
        "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
        "tema": "Matemática I: Operaciones con Curvas, Curva Recíproca y Composición",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Matemática I: Operaciones con Curvas, Curva Recíproca y Composición?",
        "opciones": [
          "Suma y producto geométrico de ordenadas, determinación de ceros y polos en la curva recíproca 1/f(x)",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Suma y producto geométrico de ordenadas, determinación de ceros y polos en la curva recíproca 1/f(x)",
        "justificacion": "**Concepto Fundamental:** Matemática I: Operaciones con Curvas, Curva Recíproca y Composición\n\n**Resolución Directa:** Las operaciones con curvas permiten sintetizar gráficas complejas sumando, multiplicando o invirtiendo visualmente dos curvas conocidas sin recurrir a tablas numéricas interminable..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-mat1-operaciones'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-operaciones']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-operaciones'],
  },
  {
    "id": "santiago-mat1-teclas-guide",
    "evaluationEventId": "santiago-mat1-parcial-2",
    "guideMetadata": {
      "title": "Matemática I: Teclas, Pantallas, Diagramas Lineales y Completación de Cuadrados",
      "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
      "summary": "Modelado algorítmico de expresiones algebraicas mediante diagramas de flujo de cálculo, distinción entre esquemas lineales y ramificados, y técnica geométrica de linealización para despejes inequívocos."
    },
    "phenomenonAndTheory": "El modelo de Teclas y Fórmulas propuesto por Pedro Alson concibe el álgebra como una máquina calculadora pedagógica donde cada operación elemental (sumar una constante, multiplicar por un número, elevar al cuadrado, tomar inverso) es una tecla que transforma una pantalla de entrada en una pantalla de salida. Cuando una fórmula tiene la variable x en un solo lugar, el cálculo sigue un diagrama lineal secuencial fácil de despejar marchando en reversa tecla por tecla. Sin embargo, cuando la variable x aparece repetida en varios términos (como en ax^2 + bx + c), el diagrama se ramifica y no se puede despejar directamente. La técnica reina consiste en linealizar el diagrama mediante completación de cuadrados algebraicos, colapsando las múltiples apariciones en una sola pantalla lineal de la forma a(x - h)^2 + k.",
    "glossary": [
      {
        "term": "Tecla Elemental",
        "definition": "Bloque funcional que ejecuta una única operación matemática básica sobre un valor numérico que entra a través de una pantalla.",
        "symbolOrUnit": "[+c], [*c], [()^2], [1/()]"
      },
      {
        "term": "Diagrama Lineal",
        "definition": "Flujo de cálculo donde la variable x entra por un único canal y sufre una cadena de transformaciones sucesivas sin ramificaciones.",
        "symbolOrUnit": "x -> [T1] -> [T2] -> ... -> y"
      },
      {
        "term": "Diagrama Ramificado",
        "definition": "Flujo de cálculo donde la variable x se divide en dos o más ramas independientes que luego se combinan, impidiendo el despeje inverso directo.",
        "symbolOrUnit": "x -> (rama 1, rama 2) -> suma"
      },
      {
        "term": "Linealización Algebraica",
        "definition": "Transformación de una expresión ramificada en una equivalente lineal con una sola aparición de la variable x mediante completación de cuadrados.",
        "symbolOrUnit": "ax^2 + bx + c = a(x - h)^2 + k"
      },
      {
        "term": "Camino Inverso de Teclas",
        "definition": "Proceso formal de despeje que parte de la pantalla final y aplica las teclas inversas en orden estrictamente contrario para recuperar la variable x.",
        "symbolOrUnit": "y -> [T_n^(-1)] -> ... -> [T1^(-1)] -> x"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Tecla Elemental",
          "latex": "[+c], [*c], [()^2], [1/()]",
          "application": "Bloque funcional que ejecuta una única operación matemática básica sobre un valor numérico que entra a través de una pantalla."
        },
        {
          "name": "Diagrama Lineal",
          "latex": "x -> [T1] -> [T2] -> ... -> y",
          "application": "Flujo de cálculo donde la variable x entra por un único canal y sufre una cadena de transformaciones sucesivas sin ramificaciones."
        },
        {
          "name": "Diagrama Ramificado",
          "latex": "x -> (rama 1, rama 2) -> suma",
          "application": "Flujo de cálculo donde la variable x se divide en dos o más ramas independientes que luego se combinan, impidiendo el despeje inverso directo."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Examinar la fórmula y contar cuántas veces aparece la variable x para clasificar el diagrama como lineal o ramificado.",
        "Paso 2: Si el diagrama es ramificado cuadrático, extraer como factor común el coeficiente principal a de los términos con x.",
        "Paso 3: Completar el trinomio cuadrado perfecto sumando y restando el término (b / 2a)^2 dentro del paréntesis.",
        "Paso 4: Factorizar el trinomio como un cuadrado perfecto (x + b/2a)^2 y distribuir el coeficiente exterior para obtener la forma canónica lineal.",
        "Paso 5: Construir el diagrama lineal de teclas en serie desde x hasta la pantalla final y.",
        "Paso 6: Recorrer el camino inverso de teclas aplicando las operaciones inversas correspondientes y explicitando las ramas +/- al aplicar raíz cuadrada.",
        "Regla 1: Jamás intentes despejar directamente una variable que aparece en más de un término sin antes colapsarla mediante factorización o completación.",
        "Regla 2: La tecla de elevar al cuadrado destruye la inyectividad; por eso su inversa (la raíz cuadrada) siempre genera dos ramas (+ y -).",
        "Regla 3: El número que completa el trinomio siempre es el cuadrado de la mitad del coeficiente del término lineal.",
        "Regla 4: El valor mínimo o máximo de una función cuadrática se lee directamente del término independiente resultante tras completar cuadrados."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: Dada la expresión cuadrática y = 2x^2 - 8x + 3, demuest...",
        "problemStatement": "Dada la expresión cuadrática y = 2x^2 - 8x + 3, demuestre por qué su diagrama original es ramificado, transfórmela en un diagrama lineal completando cuadrados y despeje analíticamente x en función de y indicando las restricciones de rango.",
        "deductiveSteps": [
          "Paso 1: En la expresión original 2x^2 - 8x + 3 la variable x entra simultáneamente en la tecla de elevar al cuadrado (x^2) y en la tecla de multiplicar por -8 (-8x), para luego sumarse. Al tener dos ramas de entrada independientes, el diagrama es ramificado y no permite aislar x directamente con una cadena simple.",
          "Paso 2: Factorizamos el coeficiente cuadrático 2 en los términos de la variable: y = 2(x^2 - 4x) + 3.",
          "Paso 3: Tomamos el coeficiente lineal interior (-4), lo dividimos entre 2 para obtener -2, y lo elevamos al cuadrado: (-2)^2 = 4. Sumamos y restamos 4 dentro del paréntesis: y = 2(x^2 - 4x + 4 - 4) + 3.",
          "Paso 4: El trinomio x^2 - 4x + 4 es el cuadrado exacto de (x - 2)^2. Sustituimos y distribuimos: y = 2[(x - 2)^2 - 4] + 3 = 2(x - 2)^2 - 8 + 3 = 2(x - 2)^2 - 5.",
          "Paso 5: Ahora la variable x aparece una sola vez. El diagrama lineal es: x -> [-2] -> [()^2] -> [*2] -> [-5] -> y.",
          "Paso 6: Aplicamos el camino inverso para despejar x: sumamos 5: y + 5; dividimos entre 2: (y + 5)/2; aplicamos raíz cuadrada: +/- sqrt((y + 5)/2), lo cual exige que y >= -5; finalmente sumamos 2: x = 2 +/- sqrt((y + 5)/2). El vértice de la parábola es (2, -5) y su rango es [-5, +infinito)."
        ],
        "finalResult": "Completar cuadrados es el mecanismo universal de Pedro Alson para transformar expresiones complejas ramificadas en máquinas lineales despejables."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 2 UCV",
        "correction": "Colocar una ecuación con x en el numerador y denominador como (2x+1)/(x-3). El estudiante intenta completar cuadrados en vez de dividir polinomios para linealizarla como hipérbola homográfica."
      },
      {
        "trap": "Trampa de signos",
        "correction": "Confundir el signo del vértice: en a(x - h)^2 + k, el vértice está en x = +h y no en -h."
      },
      {
        "trap": "Trampa de dominio",
        "correction": "No advertir que si y < k (con a > 0), la raíz cuadrada queda negativa y no existen soluciones reales."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Olvidar multiplicar el número restado por el factor común exterior al sacarlo del paréntesis al completar cuadrados."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Omitir el signo +/- al aplicar la tecla inversa de la raíz cuadrada, perdiendo la mitad de las soluciones reales."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Despejar x intentando pasar términos con x a ambos lados sin haber linealizado primero la expresión."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Tecla Elemental?",
          "back": "Bloque funcional que ejecuta una única operación matemática básica sobre un valor numérico que entra a través de una pantalla. (Notación: [+c], [*c], [()^2], [1/()])"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Diagrama Lineal?",
          "back": "Flujo de cálculo donde la variable x entra por un único canal y sufre una cadena de transformaciones sucesivas sin ramificaciones. (Notación: x -> [T1] -> [T2] -> ... -> y)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Diagrama Ramificado?",
          "back": "Flujo de cálculo donde la variable x se divide en dos o más ramas independientes que luego se combinan, impidiendo el despeje inverso directo. (Notación: x -> (rama 1, rama 2) -> suma)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Linealización Algebraica?",
          "back": "Transformación de una expresión ramificada en una equivalente lineal con una sola aparición de la variable x mediante completación de cuadrados. (Notación: ax^2 + bx + c = a(x - h)^2 + k)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Camino Inverso de Teclas?",
          "back": "Proceso formal de despeje que parte de la pantalla final y aplica las teclas inversas en orden estrictamente contrario para recuperar la variable x. (Notación: y -> [T_n^(-1)] -> ... -> [T1^(-1)] -> x)"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Tecla Elemental",
          "Diagrama Lineal",
          "Diagrama Ramificado",
          "Linealización Algebraica",
          "Camino Inverso de Teclas"
        ],
        "notes": [
          "Paso 1: Examinar la fórmula y contar cuántas veces aparece la variable x para clasificar el diagrama como lineal o ramificado.",
          "Paso 2: Si el diagrama es ramificado cuadrático, extraer como factor común el coeficiente principal a de los términos con x.",
          "Paso 3: Completar el trinomio cuadrado perfecto sumando y restando el término (b / 2a)^2 dentro del paréntesis.",
          "Paso 4: Factorizar el trinomio como un cuadrado perfecto (x + b/2a)^2 y distribuir el coeficiente exterior para obtener la forma canónica lineal.",
          "Paso 5: Construir el diagrama lineal de teclas en serie desde x hasta la pantalla final y."
        ],
        "summary": "Modelado algorítmico de expresiones algebraicas mediante diagramas de flujo de cálculo, distinción entre esquemas lineales y ramificados, y técnica geométrica de linealización para despejes inequívocos."
      },
      "conceptMapNodes": "Matemática I: Teclas, Pantallas, Diagramas Lineales y Completación de Cuadrados\n  ├── Fundamento: Matemática I · Cátedra Pedro Alson (UCV Ciencias)\n  ├── Ecuaciones: Tecla Elemental, Diagrama Lineal, Diagrama Ramificado\n  └── Protocolo: Paso 1: Examinar la fórmula y contar cuántas veces aparece la variable x para clasificar el diagrama como lineal o ramificado. -> Paso 2: Si el diagrama es ramificado cuadrático, extraer como factor común el coeficiente principal a de los términos con x. -> Paso 3: Completar el trinomio cuadrado perfecto sumando y restando el término (b / 2a)^2 dentro del paréntesis."
    },
    "generatedQuestions": [
      {
        "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
        "tema": "Matemática I: Teclas, Pantallas, Diagramas Lineales y Completación de Cuadrados",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Matemática I: Teclas, Pantallas, Diagramas Lineales y Completación de Cuadrados?",
        "opciones": [
          "Modelado algorítmico de expresiones algebraicas mediante diagramas de flujo de cálculo, distinción e",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Modelado algorítmico de expresiones algebraicas mediante diagramas de flujo de cálculo, distinción e",
        "justificacion": "**Concepto Fundamental:** Matemática I: Teclas, Pantallas, Diagramas Lineales y Completación de Cuadrados\n\n**Resolución Directa:** El modelo de Teclas y Fórmulas propuesto por Pedro Alson concibe el álgebra como una máquina calculadora pedagógica donde cada operación elemental (sumar una constante, multiplicar..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-mat1-teclas'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-teclas']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-teclas'],
  },
  {
    "id": "santiago-mat1-soluciones-guide",
    "evaluationEventId": "santiago-mat1-parcial-1",
    "guideMetadata": {
      "title": "Matemática I: Soluciones Múltiples, Ecuaciones Trascendentes y Conteo Gráfico",
      "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
      "summary": "Resolución geométrica de ecuaciones no algebraicas y trascendentes, separación estratégica de miembros, conteo inequívoco de raíces reales y aproximación de soluciones en intervalos cerrados."
    },
    "phenomenonAndTheory": "Muchas ecuaciones de la física y la matemática no se pueden resolver mediante fórmulas cerradas simples (por ejemplo, x^3 - 3x + 1 = 0 o tan(x) = 0.36). En el enfoque de Pedro Alson, estas ecuaciones se resuelven visualmente mediante el método de soluciones múltiples. La estrategia consiste en separar la ecuación original en la igualdad de dos curvas conocidas f1(x) = f2(x) que sean inmediatas de dibujar en el mismo plano cartesiano. Cada punto de intersección entre las dos curvas corresponde exactamente a una raíz real de la ecuación. Contando visualmente los cortes se determina cuántas soluciones existen, y proyectando hacia el eje horizontal se acota numéricamente cada solución con precisión geométrica.",
    "glossary": [
      {
        "term": "Separación de Curvas",
        "definition": "Técnica algebraica que reescribe una ecuación compleja f(x) = 0 en la forma equivalente f1(x) = f2(x), donde ambas funciones son curvas canónicas familiares.",
        "symbolOrUnit": "f(x) = 0 <=> f1(x) = f2(x)"
      },
      {
        "term": "Punto de Intersección",
        "definition": "Par ordenado (x*, y*) en el plano cartesiano donde dos curvas se cruzan, cumpliendo que f1(x*) = f2(x*) = y*.",
        "symbolOrUnit": "f1(x*) = f2(x*)"
      },
      {
        "term": "Multiplicidad Geométrica",
        "definition": "Naturaleza del contacto entre curvas: un cruce limpio representa una raíz simple, mientras que una tangencia representa una raíz múltiple par.",
        "symbolOrUnit": "Cruce vs Tangencia"
      },
      {
        "term": "Ecuación Trascendente",
        "definition": "Ecuación que combina funciones trigonométricas, exponenciales o logarítmicas con términos polinómicos que no admiten despeje algebraico elemental.",
        "symbolOrUnit": "ej. tan(x) = c o e^x = x + 2"
      },
      {
        "term": "Acotamiento de Solución",
        "definition": "Identificación de un intervalo estrecho [a, b] en el eje horizontal donde vive con certeza una raíz gracias al cambio de posición relativa entre curvas.",
        "symbolOrUnit": "x* in [a, b]"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Separación de Curvas",
          "latex": "f(x) = 0 <=> f1(x) = f2(x)",
          "application": "Técnica algebraica que reescribe una ecuación compleja f(x) = 0 en la forma equivalente f1(x) = f2(x), donde ambas funciones son curvas canónicas familiares."
        },
        {
          "name": "Punto de Intersección",
          "latex": "f1(x*) = f2(x*)",
          "application": "Par ordenado (x*, y*) en el plano cartesiano donde dos curvas se cruzan, cumpliendo que f1(x*) = f2(x*) = y*."
        },
        {
          "name": "Multiplicidad Geométrica",
          "latex": "Cruce vs Tangencia",
          "application": "Naturaleza del contacto entre curvas: un cruce limpio representa una raíz simple, mientras que una tangencia representa una raíz múltiple par."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Examinar la ecuación original y despejar los términos para separar un miembro fácil a la izquierda y otro fácil a la derecha.",
        "Paso 2: Identificar las dos funciones resultantes: f1(x) (por ejemplo, una función trigonométrica o potencial) y f2(x) (una recta o parábola).",
        "Paso 3: Trazar la primera curva f1(x) en el intervalo solicitado con sus asíntotas, crestas y periodicidades bien definidas.",
        "Paso 4: Trazar la segunda curva f2(x) en el mismo sistema de coordenadas con trazo visible.",
        "Paso 5: Contar todos los puntos donde ambas curvas se intersectan físicamente dentro del intervalo fijado.",
        "Paso 6: Proyectar líneas punteadas verticales desde cada intersección hacia el eje x y escribir los nombres o valores aproximados de las soluciones a, b, c...",
        "Regla 1: Al separar una ecuación en dos curvas, elige siempre funciones cuyas gráficas conozcas a la perfección sin calcular derivadas complejas.",
        "Regla 2: Si una curva es estrictamente cóncava hacia abajo y la otra es una recta, no pueden cruzarse en más de dos puntos.",
        "Regla 3: Toda tangencia entre curvas cuenta como una raíz doble o solución de multiplicidad par.",
        "Regla 4: Para funciones periódicas de periodo T, cada solución se replica sumando k*T siempre que permanezca dentro del intervalo estipulado."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: Determine gráficamente el número de soluciones reales d...",
        "problemStatement": "Determine gráficamente el número de soluciones reales de la ecuación tan(x) = 0.36 en el intervalo [-pi, 2pi], nombre las soluciones como a, b, c... en orden creciente sobre el eje x y halle sus valores numéricos aproximados sabiendo que arctan(0.36) aprox 0.35 rad.",
        "deductiveSteps": [
          "Paso 1: Separamos la ecuación en dos curvas elementales: la curva trigonométrica f1(x) = tan(x) y la recta horizontal f2(x) = 0.36.",
          "Paso 2: En el intervalo [-pi, 2pi], la función tangente presenta asíntotas verticales en x = -pi/2, x = pi/2 y x = 3pi/2. La curva está dividida en cuatro ramas continuas crecientes.",
          "Paso 3: Trazamos las cuatro ramas de tan(x): una de -pi a -pi/2 que sube desde 0 hasta +infinito; la rama central de -pi/2 a pi/2 que sube desde -infinito hasta +infinito pasando por (0, 0); la rama de pi/2 a 3pi/2 que sube cruzando por (pi, 0); y la rama de 3pi/2 a 2pi que sube desde -infinito hasta (2pi, 0).",
          "Paso 4: Dibujamos la recta horizontal y = 0.36 paralela al eje x en el semiplano superior positivo.",
          "Paso 5: Observamos que la recta horizontal corta exactamente una vez a cada una de las tres ramas completas que alcanzan valores positivos: en el tramo [-pi, -pi/2], en el tramo [-pi/2, pi/2] y en el tramo [pi/2, 3pi/2]. En el tramo [3pi/2, 2pi], la tangente va de -infinito a tan(2pi)=0, por lo que nunca alcanza la altura positiva 0.36.",
          "Paso 6: En consecuencia, existen exactamente 3 soluciones reales. Proyectando hacia el eje x: la solución central b = arctan(0.36) aprox 0.35 rad; por periodicidad pi, la solución izquierda a = 0.35 - pi aprox -2.79 rad; y la solución derecha c = 0.35 + pi aprox 3.49 rad. Quedan marcadas como a, b, c sobre el eje real."
        ],
        "finalResult": "Una recta horizontal corta a cada periodo completo de la tangente exactamente una vez; basta sumar o restar múltiplos enteros de pi a la solución principal."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 1 UCV",
        "correction": "Pedir hallar soluciones marcadas en el gráfico de una ecuación como x^2 = cos(x) y el estudiante busca resolverla algebraicamente en vez de trazar la parábola y el coseno."
      },
      {
        "trap": "Trampa de escala",
        "correction": "Dibujar la función seno con amplitudes desproporcionadas respecto a la recta y = x, lo que distorsiona el número visual de cruces en el origen."
      },
      {
        "trap": "Trampa de extremos de intervalo",
        "correction": "Contar una solución que cae justo por fuera del corchete del intervalo cerrado fijado en el examen."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Olvidar que la función tangente es periódica con periodo pi y dar solamente la solución elemental del primer cuadrante."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "No verificar si las ramas extremas del intervalo alcanzan la altura de la recta antes de que el intervalo termine."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Confundir los valores de las asíntotas con raíces de la ecuación."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Separación de Curvas?",
          "back": "Técnica algebraica que reescribe una ecuación compleja f(x) = 0 en la forma equivalente f1(x) = f2(x), donde ambas funciones son curvas canónicas familiares. (Notación: f(x) = 0 <=> f1(x) = f2(x))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Punto de Intersección?",
          "back": "Par ordenado (x*, y*) en el plano cartesiano donde dos curvas se cruzan, cumpliendo que f1(x*) = f2(x*) = y*. (Notación: f1(x*) = f2(x*))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Multiplicidad Geométrica?",
          "back": "Naturaleza del contacto entre curvas: un cruce limpio representa una raíz simple, mientras que una tangencia representa una raíz múltiple par. (Notación: Cruce vs Tangencia)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Ecuación Trascendente?",
          "back": "Ecuación que combina funciones trigonométricas, exponenciales o logarítmicas con términos polinómicos que no admiten despeje algebraico elemental. (Notación: ej. tan(x) = c o e^x = x + 2)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Acotamiento de Solución?",
          "back": "Identificación de un intervalo estrecho [a, b] en el eje horizontal donde vive con certeza una raíz gracias al cambio de posición relativa entre curvas. (Notación: x* in [a, b])"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Separación de Curvas",
          "Punto de Intersección",
          "Multiplicidad Geométrica",
          "Ecuación Trascendente",
          "Acotamiento de Solución"
        ],
        "notes": [
          "Paso 1: Examinar la ecuación original y despejar los términos para separar un miembro fácil a la izquierda y otro fácil a la derecha.",
          "Paso 2: Identificar las dos funciones resultantes: f1(x) (por ejemplo, una función trigonométrica o potencial) y f2(x) (una recta o parábola).",
          "Paso 3: Trazar la primera curva f1(x) en el intervalo solicitado con sus asíntotas, crestas y periodicidades bien definidas.",
          "Paso 4: Trazar la segunda curva f2(x) en el mismo sistema de coordenadas con trazo visible.",
          "Paso 5: Contar todos los puntos donde ambas curvas se intersectan físicamente dentro del intervalo fijado."
        ],
        "summary": "Resolución geométrica de ecuaciones no algebraicas y trascendentes, separación estratégica de miembros, conteo inequívoco de raíces reales y aproximación de soluciones en intervalos cerrados."
      },
      "conceptMapNodes": "Matemática I: Soluciones Múltiples, Ecuaciones Trascendentes y Conteo Gráfico\n  ├── Fundamento: Matemática I · Cátedra Pedro Alson (UCV Ciencias)\n  ├── Ecuaciones: Separación de Curvas, Punto de Intersección, Multiplicidad Geométrica\n  └── Protocolo: Paso 1: Examinar la ecuación original y despejar los términos para separar un miembro fácil a la izquierda y otro fácil a la derecha. -> Paso 2: Identificar las dos funciones resultantes: f1(x) (por ejemplo, una función trigonométrica o potencial) y f2(x) (una recta o parábola). -> Paso 3: Trazar la primera curva f1(x) en el intervalo solicitado con sus asíntotas, crestas y periodicidades bien definidas."
    },
    "generatedQuestions": [
      {
        "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
        "tema": "Matemática I: Soluciones Múltiples, Ecuaciones Trascendentes y Conteo Gráfico",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Matemática I: Soluciones Múltiples, Ecuaciones Trascendentes y Conteo Gráfico?",
        "opciones": [
          "Resolución geométrica de ecuaciones no algebraicas y trascendentes, separación estratégica de miembr",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Resolución geométrica de ecuaciones no algebraicas y trascendentes, separación estratégica de miembr",
        "justificacion": "**Concepto Fundamental:** Matemática I: Soluciones Múltiples, Ecuaciones Trascendentes y Conteo Gráfico\n\n**Resolución Directa:** Muchas ecuaciones de la física y la matemática no se pueden resolver mediante fórmulas cerradas simples (por ejemplo, x^3 - 3x + 1 = 0 o tan(x) = 0.36). En el enfoque de Pedro Also..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-mat1-soluciones'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-curvas']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-curvas'],
  },
  {
    "id": "santiago-mat1-rectas-hiperbolas-guide",
    "evaluationEventId": "santiago-mat1-parcial-2",
    "guideMetadata": {
      "title": "Matemática I: Rectas, Parábolas, Hipérbolas Homográficas y Áreas Geométricas",
      "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
      "summary": "Descomposición canónica de funciones racionales homográficas, cálculo inmediato de asíntotas ortogonales, familias de rectas tangentes y secantes, y determinación analítica de áreas de polígonos."
    },
    "phenomenonAndTheory": "Las rectas, parábolas e hipérbolas constituyen el alfabeto geométrico fundamental del cálculo en la Facultad de Ciencias de la UCV. La hipérbola equilátera rotada homográfica f(x) = (ax + b)/(cx + d) es la protagonista indiscutible del segundo parcial. Pedro Alson enseña a descomponerla mediante división polinómica directa en su forma canónica f(x) = v + k/(x - h). En esta representación, x = h es la asíntota vertical donde el denominador se anula, y = v es la asíntota horizontal dictada por la razón de coeficientes a/c, y el parámetro k gobierna tanto la curvatura como los cuadrantes asintóticos donde habitan las ramas. Combinando hipérbolas con rectas secantes se forman regiones cerradas cuyos vértices permiten calcular áreas de triángulos y trapecios bajo curvas con exactitud geométrica.",
    "glossary": [
      {
        "term": "Forma Homográfica",
        "definition": "Función racional de primer grado entre primer grado que representa geométricamente una hipérbola equilátera con asíntotas paralelas a los ejes coordenados.",
        "symbolOrUnit": "f(x) = (ax + b) / (cx + d)"
      },
      {
        "term": "Forma Canónica de Alson",
        "definition": "Descomposición aditiva que separa la asíntota horizontal v del término hiperbólico puro con polo en h y factor de escala k.",
        "symbolOrUnit": "f(x) = v + k / (x - h)"
      },
      {
        "term": "Asíntota Vertical h",
        "definition": "Recta vertical x = h donde el denominador de la función se hace cero y la curva se dispara hacia los infinitos.",
        "symbolOrUnit": "x = h = -d / c"
      },
      {
        "term": "Asíntota Horizontal v",
        "definition": "Recta horizontal y = v a la que se aproxima la curva cuando la variable x crece arbitrariamente hacia más o menos infinito.",
        "symbolOrUnit": "y = v = a / c"
      },
      {
        "term": "Parámetro de Dilatación k",
        "definition": "Constante que determina la apertura de las ramas: si k > 0 las ramas viven en el primer y tercer cuadrante asintótico; si k < 0, en el segundo y cuarto.",
        "symbolOrUnit": "k = (bc - ad) / c^2"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Forma Homográfica",
          "latex": "f(x) = (ax + b) / (cx + d)",
          "application": "Función racional de primer grado entre primer grado que representa geométricamente una hipérbola equilátera con asíntotas paralelas a los ejes coordenados."
        },
        {
          "name": "Forma Canónica de Alson",
          "latex": "f(x) = v + k / (x - h)",
          "application": "Descomposición aditiva que separa la asíntota horizontal v del término hiperbólico puro con polo en h y factor de escala k."
        },
        {
          "name": "Asíntota Vertical h",
          "latex": "x = h = -d / c",
          "application": "Recta vertical x = h donde el denominador de la función se hace cero y la curva se dispara hacia los infinitos."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Tomar la expresión homográfica f(x) = (ax + b)/(cx + d) y efectuar la división polinómica del numerador entre el denominador.",
        "Paso 2: Escribir la función en forma canónica v + k/(x - h) identificando con precisión los valores de h, v y k.",
        "Paso 3: Trazar en el plano las dos asíntotas ortogonales x = h e y = v con líneas punteadas para delimitar la cruz asintótica.",
        "Paso 4: Según el signo de k, esbozar las dos ramas hiperbólicas suaves y calcular los puntos de corte exactos con los ejes cartesianos (0, f(0)) y (x0, 0).",
        "Paso 5: Para problemas combinados con rectas y = mx + p, igualar ambas ecuaciones para formar una cuadrática y hallar los puntos de corte de intersección.",
        "Paso 6: Si el problema pide áreas triangulares, identificar las coordenadas de los tres vértices y aplicar la fórmula del determinante geométrico de Gauss.",
        "Regla 1: En f(x) = (ax + b)/(cx + d), la asíntota horizontal es siempre el cociente directo de los coeficientes de x: y = a/c.",
        "Regla 2: La asíntota vertical es la raíz única del denominador: x = -d/c.",
        "Regla 3: Si el discriminante de la ecuación de intersección entre recta e hipérbola es cero, la recta es exactamente tangente a la hipérbola.",
        "Regla 4: El área de un triángulo con un vértice en el origen es la mitad del valor absoluto del producto cruzado de las coordenadas de los otros dos vértices."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: Dada la función f(x) = (2x - 1) / (x + 1), escríbala en...",
        "problemStatement": "Dada la función f(x) = (2x - 1) / (x + 1), escríbala en su forma canónica v + k/(x - h), halle sus asíntotas y puntos de corte con los ejes, y determine el área del triángulo formado por el origen (0, 0) y los dos puntos de intersección de la hipérbola con la recta y = x.",
        "deductiveSteps": [
          "Paso 1: Efectuamos la división de 2x - 1 entre x + 1. El cociente es 2 y el residuo es (2x - 1) - 2(x + 1) = -3. Por tanto, f(x) = 2 - 3 / (x + 1).",
          "Paso 2: Comparando con la forma canónica v + k/(x - h), obtenemos: asíntota horizontal v = 2, asíntota vertical h = -1, y parámetro k = -3.",
          "Paso 3: Como k = -3 < 0, las ramas de la hipérbola viven en el segundo y cuarto cuadrante relativo respecto a la cruz formada por x = -1 e y = 2.",
          "Paso 4: Cortes con los ejes coordenados: si x = 0, f(0) = (0 - 1)/(0 + 1) = -1, corte en (0, -1); si y = 0, 2x - 1 = 0 => x = 1/2, corte en (1/2, 0).",
          "Paso 5: Hallamos la intersección de la hipérbola con la recta y = x: x = (2x - 1) / (x + 1) => x(x + 1) = 2x - 1 => x^2 + x = 2x - 1 => x^2 - x + 1 = 0. El discriminante es (-1)^2 - 4(1)(1) = -3 < 0. No hay intersección con y = x. Probemos con la recta y = 2x - 3: 2x - 3 = (2x - 1)/(x + 1) => (2x - 3)(x + 1) = 2x - 1 => 2x^2 - x - 3 = 2x - 1 => 2x^2 - 3x - 2 = 0. Factorizando: (2x + 1)(x - 2) = 0 => x1 = 2 e x2 = -1/2.",
          "Paso 6: Los puntos de intersección con la recta y = 2x - 3 son P1(2, 1) y P2(-1/2, -4). El triángulo tiene vértices en O(0, 0), P1(2, 1) y P2(-1/2, -4). El área mediante el determinante 2D es: Area = (1/2) * |x1*y2 - x2*y1| = (1/2) * |(2)(-4) - (-1/2)(1)| = (1/2) * |-8 + 1/2| = (1/2) * |-15/2| = 15/4 = 3.75 unidades cuadradas."
        ],
        "finalResult": "La división polinómica descompone de un solo golpe la hipérbola homográfica en sus asíntotas y su curvatura."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 2 UCV",
        "correction": "Preguntar cuál es el valor de k de la hipérbola y el alumno confunde el residuo de la división con el término independiente."
      },
      {
        "trap": "Trampa de asíntotas ortogonales",
        "correction": "Olvidar dibujar las asíntotas y trazar las ramas pegadas a los ejes coordenados principales por descuido."
      },
      {
        "trap": "Trampa de tangencia",
        "correction": "No advertir que una recta vertical jamás puede cortar una hipérbola homográfica en más de un punto."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Errar el signo de h: si el denominador es x + 1, entonces x - (-1) implica que la asíntota vertical es x = -1 y no x = 1."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Olvidar que si k < 0 las ramas van en los cuadrantes noroeste y sureste de la cruz asintótica."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Intentar calcular áreas por integración definida cuando los lados son segmentos rectilíneos que se resuelven con geometría básica."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Forma Homográfica?",
          "back": "Función racional de primer grado entre primer grado que representa geométricamente una hipérbola equilátera con asíntotas paralelas a los ejes coordenados. (Notación: f(x) = (ax + b) / (cx + d))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Forma Canónica de Alson?",
          "back": "Descomposición aditiva que separa la asíntota horizontal v del término hiperbólico puro con polo en h y factor de escala k. (Notación: f(x) = v + k / (x - h))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Asíntota Vertical h?",
          "back": "Recta vertical x = h donde el denominador de la función se hace cero y la curva se dispara hacia los infinitos. (Notación: x = h = -d / c)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Asíntota Horizontal v?",
          "back": "Recta horizontal y = v a la que se aproxima la curva cuando la variable x crece arbitrariamente hacia más o menos infinito. (Notación: y = v = a / c)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Parámetro de Dilatación k?",
          "back": "Constante que determina la apertura de las ramas: si k > 0 las ramas viven en el primer y tercer cuadrante asintótico; si k < 0, en el segundo y cuarto. (Notación: k = (bc - ad) / c^2)"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Forma Homográfica",
          "Forma Canónica de Alson",
          "Asíntota Vertical h",
          "Asíntota Horizontal v",
          "Parámetro de Dilatación k"
        ],
        "notes": [
          "Paso 1: Tomar la expresión homográfica f(x) = (ax + b)/(cx + d) y efectuar la división polinómica del numerador entre el denominador.",
          "Paso 2: Escribir la función en forma canónica v + k/(x - h) identificando con precisión los valores de h, v y k.",
          "Paso 3: Trazar en el plano las dos asíntotas ortogonales x = h e y = v con líneas punteadas para delimitar la cruz asintótica.",
          "Paso 4: Según el signo de k, esbozar las dos ramas hiperbólicas suaves y calcular los puntos de corte exactos con los ejes cartesianos (0, f(0)) y (x0, 0).",
          "Paso 5: Para problemas combinados con rectas y = mx + p, igualar ambas ecuaciones para formar una cuadrática y hallar los puntos de corte de intersección."
        ],
        "summary": "Descomposición canónica de funciones racionales homográficas, cálculo inmediato de asíntotas ortogonales, familias de rectas tangentes y secantes, y determinación analítica de áreas de polígonos."
      },
      "conceptMapNodes": "Matemática I: Rectas, Parábolas, Hipérbolas Homográficas y Áreas Geométricas\n  ├── Fundamento: Matemática I · Cátedra Pedro Alson (UCV Ciencias)\n  ├── Ecuaciones: Forma Homográfica, Forma Canónica de Alson, Asíntota Vertical h\n  └── Protocolo: Paso 1: Tomar la expresión homográfica f(x) = (ax + b)/(cx + d) y efectuar la división polinómica del numerador entre el denominador. -> Paso 2: Escribir la función en forma canónica v + k/(x - h) identificando con precisión los valores de h, v y k. -> Paso 3: Trazar en el plano las dos asíntotas ortogonales x = h e y = v con líneas punteadas para delimitar la cruz asintótica."
    },
    "generatedQuestions": [
      {
        "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
        "tema": "Matemática I: Rectas, Parábolas, Hipérbolas Homográficas y Áreas Geométricas",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Matemática I: Rectas, Parábolas, Hipérbolas Homográficas y Áreas Geométricas?",
        "opciones": [
          "Descomposición canónica de funciones racionales homográficas, cálculo inmediato de asíntotas ortogon",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Descomposición canónica de funciones racionales homográficas, cálculo inmediato de asíntotas ortogon",
        "justificacion": "**Concepto Fundamental:** Matemática I: Rectas, Parábolas, Hipérbolas Homográficas y Áreas Geométricas\n\n**Resolución Directa:** Las rectas, parábolas e hipérbolas constituyen el alfabeto geométrico fundamental del cálculo en la Facultad de Ciencias de la UCV. La hipérbola equilátera rotada homográfica f(x) ..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-mat1-rectas-hiperbolas'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-inecuaciones']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-inecuaciones'],
  },
  {
    "id": "santiago-mat1-inecuaciones-guide",
    "evaluationEventId": "santiago-mat1-parcial-2",
    "guideMetadata": {
      "title": "Matemática I: Inecuaciones Gráficas, Alfabeto de Transformadas y Módulo",
      "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
      "summary": "Resolución geométrica de desigualdades funcionales mediante análisis de curvas superiores, proyecciones sobre el eje real y catálogo completo de transformadas de escala, traslación y valor absoluto."
    },
    "phenomenonAndTheory": "La resolución de inecuaciones en la cátedra de Pedro Alson se transforma de un tedioso cuadro algebraico de signos en un acto de lectura visual directa sobre el plano cartesiano. Resolver la desigualdad f(x) > g(x) equivale simplemente a identificar en qué zonas del eje horizontal la curva f(x) flota estrictamente por encima de la curva g(x). El conjunto solución es la sombra que arrojan esas regiones sobre el eje real. Asimismo, el alfabeto de transformadas gráficas permite generar familias completas de curvas complejas a partir de una función base f(x): sumas verticales f(x) + c, traslaciones horizontales f(x + d), escalamientos c*f(x), y las dos transformadas de módulo: |f(x)| (que refleja la parte negativa hacia arriba como un espejo) y f(|x|) (que borra la parte izquierda y duplica simétricamente el lado derecho como función par).",
    "glossary": [
      {
        "term": "Inecuación Gráfica f > g",
        "definition": "Condición geométrica que selecciona todos los puntos x donde la ordenada vertical de la curva f está estrictamente por encima de la ordenada de g.",
        "symbolOrUnit": "f(x) > g(x)"
      },
      {
        "term": "Sombra Proyectada",
        "definition": "Intervalo o unión de intervalos sobre el eje horizontal x que recoge las preimágenes donde se cumple la desigualdad.",
        "symbolOrUnit": "S = (a, b) U (c, d)"
      },
      {
        "term": "Transformada de Traslación",
        "definition": "Desplazamiento rígido de la curva: f(x) + b traslada b unidades verticalmente; f(x + d) traslada d unidades a la izquierda.",
        "symbolOrUnit": "f(x) + b y f(x + d)"
      },
      {
        "term": "Módulo Exterior |f(x)|",
        "definition": "Transformada que conserva inalterada la parte positiva de la curva y refleja hacia arriba la parte que estaba por debajo del eje x.",
        "symbolOrUnit": "y = |f(x)| >= 0"
      },
      {
        "term": "Módulo Interior f(|x|)",
        "definition": "Transformada que elimina toda la gráfica para x < 0 y refleja simétricamente la mitad derecha (x >= 0) hacia la izquierda convirtiéndola en par.",
        "symbolOrUnit": "f(|-x|) = f(|x|)"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Inecuación Gráfica f > g",
          "latex": "f(x) > g(x)",
          "application": "Condición geométrica que selecciona todos los puntos x donde la ordenada vertical de la curva f está estrictamente por encima de la ordenada de g."
        },
        {
          "name": "Sombra Proyectada",
          "latex": "S = (a, b) U (c, d)",
          "application": "Intervalo o unión de intervalos sobre el eje horizontal x que recoge las preimágenes donde se cumple la desigualdad."
        },
        {
          "name": "Transformada de Traslación",
          "latex": "f(x) + b y f(x + d)",
          "application": "Desplazamiento rígido de la curva: f(x) + b traslada b unidades verticalmente; f(x + d) traslada d unidades a la izquierda."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Para resolver f(x) >= g(x), dibujar con exactitud ambas curvas en el mismo gráfico cartesiano.",
        "Paso 2: Encontrar los puntos exactos de intersección f(x) = g(x) para delimitar las fronteras de los intervalos.",
        "Paso 3: Señalar visualmente las regiones del plano donde la curva f está físicamente más arriba que la curva g.",
        "Paso 4: Proyectar esas regiones verticalmente hacia abajo hasta impactar sobre el eje real x.",
        "Paso 5: Escribir el conjunto solución con corchetes cerrados si la desigualdad es amplia (>=) o paréntesis abiertos si es estricta (>).",
        "Paso 6: Para transformadas con valor absoluto, aplicar primero las traslaciones interiores, luego el módulo y finalmente las traslaciones exteriores.",
        "Regla 1: Nunca multipliques ambos miembros de una inecuación por una expresión con x a menos que conozcas su signo con absoluta certeza en todo el dominio.",
        "Regla 2: Los puntos de discontinuidad y asíntotas verticales siempre deben excluirse del conjunto solución con paréntesis abiertos.",
        "Regla 3: La transformada f(x + d) se mueve hacia la izquierda si d > 0 y hacia la derecha si d < 0 (comportamiento contra-intuitivo en el eje horizontal).",
        "Regla 4: El valor absoluto exterior |f(x)| jamás altera las zonas donde la curva ya era positiva; solo levanta las partes sumergidas."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: Resuelva gráficamente la inecuación (2x - 1)/(x + 1) >=...",
        "problemStatement": "Resuelva gráficamente la inecuación (2x - 1)/(x + 1) >= 1 utilizando el método de Pedro Alson y dibuje la gráfica de la función transformada g(x) = | (2x - 1)/(x + 1) | indicando sus puntos de quiebre.",
        "deductiveSteps": [
          "Paso 1: Identificamos las dos curvas: f(x) = (2x - 1)/(x + 1) (hipérbola con asíntota vertical x = -1, horizontal y = 2) y la recta horizontal g(x) = 1.",
          "Paso 2: Hallamos la intersección resolviendo (2x - 1)/(x + 1) = 1 => 2x - 1 = x + 1 => x = 2. El punto de corte es (2, 1).",
          "Paso 3: Analizamos la posición relativa de la hipérbola frente a la recta y = 1: en la rama izquierda x < -1, la hipérbola vive asintóticamente entre y = 2 e y = +infinito, por lo que toda la rama izquierda flota estrictamente por encima de la recta y = 1.",
          "Paso 4: En la rama derecha x > -1, la curva arranca desde -infinito, cruza el eje x en 1/2 y alcanza la recta y = 1 en x = 2. Para x >= 2, la curva sube hacia su asíntota y = 2, manteniéndose por encima de y = 1.",
          "Paso 5: La sombra proyectada sobre el eje x es la unión de la rama izquierda completa (-infinito, -1) con el tramo derecho a partir de la intersección [2, +infinito). El -1 es abierto por ser asíntota vertical. Conjunto solución: S = (-infinito, -1) U [2, +infinito).",
          "Paso 6: Para la transformada con módulo g(x) = |f(x)|: tomamos la hipérbola y observamos dónde corta al eje x (en x = 1/2). El tramo entre x = -1 y x = 1/2 era negativo (se hundía hasta -infinito). Aplicamos el módulo exterior: ese tramo se refleja hacia arriba convirtiéndose en una rama que sube hasta +infinito pegada a x = -1. En x = 1/2 se produce un punto de quiebre en punta (cúspide angulosa sobre el eje x)."
        ],
        "finalResult": "El método gráfico de inecuaciones previene al 100% los errores fatales de signo que ocurren al multiplicar por denominadores variables."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 2 UCV",
        "correction": "Colocar una inecuación con ax + b > c y pedir hallar a y b para que la solución sea un intervalo dado (-infinito, 3). El estudiante olvida que si a < 0 la desigualdad se invierte."
      },
      {
        "trap": "Trampa de transformadas combinadas",
        "correction": "Aplicar el valor absoluto antes del desplazamiento vertical, lo cual genera una curva totalmente errónea."
      },
      {
        "trap": "Trampa de módulo interior",
        "correction": "En f(|x|), olvidar borrar la parte de la curva donde x < 0 antes de duplicar la parte derecha."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Multiplicar en cruz por (x + 1) sin considerar que el denominador puede ser negativo y voltear el sentido de la desigualdad."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Incluir el valor de la asíntota vertical (-1) con corchete cerrado en la solución: la función no existe en la asíntota."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Suavizar el punto de quiebre del valor absoluto: en el corte con el eje x la derivada cambia bruscamente formando una V."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Inecuación Gráfica f > g?",
          "back": "Condición geométrica que selecciona todos los puntos x donde la ordenada vertical de la curva f está estrictamente por encima de la ordenada de g. (Notación: f(x) > g(x))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Sombra Proyectada?",
          "back": "Intervalo o unión de intervalos sobre el eje horizontal x que recoge las preimágenes donde se cumple la desigualdad. (Notación: S = (a, b) U (c, d))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Transformada de Traslación?",
          "back": "Desplazamiento rígido de la curva: f(x) + b traslada b unidades verticalmente; f(x + d) traslada d unidades a la izquierda. (Notación: f(x) + b y f(x + d))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Módulo Exterior |f(x)|?",
          "back": "Transformada que conserva inalterada la parte positiva de la curva y refleja hacia arriba la parte que estaba por debajo del eje x. (Notación: y = |f(x)| >= 0)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Módulo Interior f(|x|)?",
          "back": "Transformada que elimina toda la gráfica para x < 0 y refleja simétricamente la mitad derecha (x >= 0) hacia la izquierda convirtiéndola en par. (Notación: f(|-x|) = f(|x|))"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Inecuación Gráfica f > g",
          "Sombra Proyectada",
          "Transformada de Traslación",
          "Módulo Exterior |f(x)|",
          "Módulo Interior f(|x|)"
        ],
        "notes": [
          "Paso 1: Para resolver f(x) >= g(x), dibujar con exactitud ambas curvas en el mismo gráfico cartesiano.",
          "Paso 2: Encontrar los puntos exactos de intersección f(x) = g(x) para delimitar las fronteras de los intervalos.",
          "Paso 3: Señalar visualmente las regiones del plano donde la curva f está físicamente más arriba que la curva g.",
          "Paso 4: Proyectar esas regiones verticalmente hacia abajo hasta impactar sobre el eje real x.",
          "Paso 5: Escribir el conjunto solución con corchetes cerrados si la desigualdad es amplia (>=) o paréntesis abiertos si es estricta (>)."
        ],
        "summary": "Resolución geométrica de desigualdades funcionales mediante análisis de curvas superiores, proyecciones sobre el eje real y catálogo completo de transformadas de escala, traslación y valor absoluto."
      },
      "conceptMapNodes": "Matemática I: Inecuaciones Gráficas, Alfabeto de Transformadas y Módulo\n  ├── Fundamento: Matemática I · Cátedra Pedro Alson (UCV Ciencias)\n  ├── Ecuaciones: Inecuación Gráfica f > g, Sombra Proyectada, Transformada de Traslación\n  └── Protocolo: Paso 1: Para resolver f(x) >= g(x), dibujar con exactitud ambas curvas en el mismo gráfico cartesiano. -> Paso 2: Encontrar los puntos exactos de intersección f(x) = g(x) para delimitar las fronteras de los intervalos. -> Paso 3: Señalar visualmente las regiones del plano donde la curva f está físicamente más arriba que la curva g."
    },
    "generatedQuestions": [
      {
        "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
        "tema": "Matemática I: Inecuaciones Gráficas, Alfabeto de Transformadas y Módulo",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Matemática I: Inecuaciones Gráficas, Alfabeto de Transformadas y Módulo?",
        "opciones": [
          "Resolución geométrica de desigualdades funcionales mediante análisis de curvas superiores, proyeccio",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Resolución geométrica de desigualdades funcionales mediante análisis de curvas superiores, proyeccio",
        "justificacion": "**Concepto Fundamental:** Matemática I: Inecuaciones Gráficas, Alfabeto de Transformadas y Módulo\n\n**Resolución Directa:** La resolución de inecuaciones en la cátedra de Pedro Alson se transforma de un tedioso cuadro algebraico de signos en un acto de lectura visual directa sobre el plano cartesiano. R..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-mat1-inecuaciones'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-inecuaciones']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-inecuaciones'],
  },
  {
    "id": "santiago-mat1-limites-derivadas-guide",
    "evaluationEventId": "santiago-mat1-parcial-3",
    "guideMetadata": {
      "title": "Matemática I: Límites Visuales, Continuidad, Recta Tangente y Graficación de f prime (x)",
      "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
      "summary": "Interpretación geométrica del límite formal, tipos de discontinuidades gráficas, pendiente de la recta secante a la tangente y técnica cualitativa para trazar la función derivada a partir de la curva original."
    },
    "phenomenonAndTheory": "El cierre magistral del curso de Pedro Alson conecta la geometría de curvas con el cálculo infinitesimal mediante la visualización directa del límite y la derivada. Un límite lim(x->x0) f(x) = L no describe lo que ocurre exactamente en el punto x0, sino el valor al que la curva apunta cuando nos aproximamos tanto por la izquierda como por la derecha. La derivada f prime (x) representa la pendiente de la recta tangente en cada punto de la curva. En lugar de derivar mecánicamente fórmulas abstractas, Alson enseña a graficar la función derivada f prime (x) observando cualitativamente la curva original f(x): donde la curva original tiene tangentes horizontales (máximos y mínimos), la derivada vale cero y cruza el eje; donde la curva sube, la derivada es positiva y flota arriba; donde la curva se dobla cambiando de concavidad (inflexión), la derivada alcanza un extremo.",
    "glossary": [
      {
        "term": "Límite Geométrico",
        "definition": "Altura objetivo L a la que se aproxima la curva f(x) cuando el valor x se acerca indefinidamente a x0 por ambos lados.",
        "symbolOrUnit": "lim_{x -> x0} f(x) = L"
      },
      {
        "term": "Discontinuidad Evitable",
        "definition": "Punto donde el límite existe pero la función no está definida o vale un valor distinto, manifestándose como un agujero puntual en la curva.",
        "symbolOrUnit": "lim f(x) != f(x0)"
      },
      {
        "term": "Discontinuidad de Salto",
        "definition": "Ruptura vertical de la curva donde el límite por la izquierda y el límite por la derecha existen pero tienen valores diferentes.",
        "symbolOrUnit": "lim_{x -> x0^-} != lim_{x -> x0^+}"
      },
      {
        "term": "Pendiente de la Tangente f prime",
        "definition": "Razón de cambio instantánea de la función en un punto, correspondiente al valor trigonométrico de la tangente del ángulo de inclinación.",
        "symbolOrUnit": "f prime (x0) = tan(theta)"
      },
      {
        "term": "Punto de Inflexión",
        "definition": "Lugar geométrico donde la curva cambia su sentido de curvatura de cóncava hacia arriba a cóncava hacia abajo, donde f prime prime (x) = 0.",
        "symbolOrUnit": "Cambio de concavidad"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Límite Geométrico",
          "latex": "lim_{x -> x0} f(x) = L",
          "application": "Altura objetivo L a la que se aproxima la curva f(x) cuando el valor x se acerca indefinidamente a x0 por ambos lados."
        },
        {
          "name": "Discontinuidad Evitable",
          "latex": "lim f(x) != f(x0)",
          "application": "Punto donde el límite existe pero la función no está definida o vale un valor distinto, manifestándose como un agujero puntual en la curva."
        },
        {
          "name": "Discontinuidad de Salto",
          "latex": "lim_{x -> x0^-} != lim_{x -> x0^+}",
          "application": "Ruptura vertical de la curva donde el límite por la izquierda y el límite por la derecha existen pero tienen valores diferentes."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Para graficar f prime (x), alinear un sistema de coordenadas verticalmente justo debajo del gráfico de la función original f(x).",
        "Paso 2: Identificar todos los puntos donde la curva original tiene tangentes perfectamente horizontales (máximos, mínimos o mesetas).",
        "Paso 3: Proyectar esos puntos verticalmente hacia abajo y marcar ceros (cortes con el eje x) en el gráfico de la derivada f prime (x).",
        "Paso 4: Identificar los intervalos donde la curva original f(x) es estrictamente creciente y dibujar la derivada por encima del eje horizontal (f prime > 0).",
        "Paso 5: Identificar los intervalos donde f(x) es estrictamente decreciente y dibujar la derivada por debajo del eje horizontal (f prime < 0).",
        "Paso 6: Localizar los puntos de mayor inclinación o puntos de inflexión en f(x) y hacer coincidir sus proyecciones con las crestas o valles de f prime (x).",
        "Regla 1: Cada extremo local suave de f(x) genera obligatoriamente un cero (corte horizontal) en la función derivada f prime (x).",
        "Regla 2: Si f(x) es creciente, f prime (x) es positiva; si f(x) es decreciente, f prime (x) es negativa.",
        "Regla 3: Cada punto de inflexión de f(x) se convierte en un extremo local (máximo o mínimo) de la función derivada f prime (x).",
        "Regla 4: Las asíntotas horizontales de f(x) implican que la pendiente tiende a aplanarse, por lo que f prime (x) tiende asintóticamente a cero."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: Dada una curva continua f(x) que tiene un máximo local ...",
        "problemStatement": "Dada una curva continua f(x) que tiene un máximo local en (-2, 4), un mínimo local en (2, -4), un punto de inflexión en el origen (0, 0) y tiende a -infinito cuando x tiende a -infinito y a +infinito cuando x tiende a +infinito, bosqueje la gráfica cualitativa de su función derivada f prime (x) deduciendo sus signos, ceros y extremos.",
        "deductiveSteps": [
          "Paso 1: Colocamos el gráfico de f(x) arriba y preparamos los ejes de f prime (x) alineados abajo con la misma escala horizontal x.",
          "Paso 2: Analizamos las tangentes horizontales de f(x): en x = -2 la curva alcanza una cresta máxima (tangente horizontal, pendiente 0); en x = 2 la curva alcanza un valle mínimo (tangente horizontal, pendiente 0).",
          "Paso 3: Marcamos en el gráfico inferior los ceros obligatorios de f prime (x): f prime (-2) = 0 y f prime (2) = 0. La derivada corta el eje horizontal exactamente en x = -2 y x = 2.",
          "Paso 4: Analizamos los tramos de crecimiento de f(x): para x < -2, la curva sube empinada desde -infinito hacia el máximo (pendiente positiva, f prime > 0); para x > 2, la curva sube empinada hacia +infinito (pendiente positiva, f prime > 0). En ambos extremos exteriores, la gráfica de f prime (x) vive en el semiplano superior positivo.",
          "Paso 5: Analizamos el tramo central (-2, 2): f(x) desciende desde 4 hasta -4 (pendiente negativa, f prime < 0). Por tanto, entre x = -2 y x = 2 la gráfica de f prime (x) cae por debajo del eje horizontal.",
          "Paso 6: Analizamos el punto de mayor inclinación negativa: ocurre en el punto de inflexión (0, 0), donde la curva desciende con la máxima pendiente negativa. Por tanto, en x = 0 la función derivada alcanza un mínimo local negativo. El dibujo resultante de f prime (x) es una parábola cóncava hacia arriba que pasa por (-2, 0) y (2, 0) con vértice mínimo en (0, -m)."
        ],
        "finalResult": "La derivada no mide la altura de la curva sino la inclinación de la regla tangente apoyada en cada punto de su trayectoria."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 3 UCV",
        "correction": "Presentar la gráfica de f prime (x) y pedir deducir dónde la función original f(x) tiene un máximo. El estudiante marca donde f prime tiene un máximo en vez de buscar donde f prime pasa de positivo a negativo cruzando el cero."
      },
      {
        "trap": "Trampa de derivabilidad",
        "correction": "Intentar trazar una tangente suave en un punto anguloso como f(x) = |x| en x = 0, donde la derivada simplemente no existe."
      },
      {
        "trap": "Trampa de concavidad",
        "correction": "Confundir el crecimiento de f con el crecimiento de f prime: f crece si f prime > 0, pero f prime crece si f es cóncava hacia arriba (f prime prime > 0)."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Creer que cuando f(x) vale cero, la derivada también vale cero: la derivada solo vale cero donde la tangente es horizontal, no donde cruza el eje."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Olvidar que una cúspide o pico anguloso en f(x) genera una discontinuidad de salto infinito en la derivada f prime (x)."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Dibujar la derivada creciendo en los tramos donde f(x) es cóncava hacia abajo: f prime crece donde la curva es cóncava hacia arriba."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Límite Geométrico?",
          "back": "Altura objetivo L a la que se aproxima la curva f(x) cuando el valor x se acerca indefinidamente a x0 por ambos lados. (Notación: lim_{x -> x0} f(x) = L)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Discontinuidad Evitable?",
          "back": "Punto donde el límite existe pero la función no está definida o vale un valor distinto, manifestándose como un agujero puntual en la curva. (Notación: lim f(x) != f(x0))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Discontinuidad de Salto?",
          "back": "Ruptura vertical de la curva donde el límite por la izquierda y el límite por la derecha existen pero tienen valores diferentes. (Notación: lim_{x -> x0^-} != lim_{x -> x0^+})"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Pendiente de la Tangente f prime?",
          "back": "Razón de cambio instantánea de la función en un punto, correspondiente al valor trigonométrico de la tangente del ángulo de inclinación. (Notación: f prime (x0) = tan(theta))"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Punto de Inflexión?",
          "back": "Lugar geométrico donde la curva cambia su sentido de curvatura de cóncava hacia arriba a cóncava hacia abajo, donde f prime prime (x) = 0. (Notación: Cambio de concavidad)"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Límite Geométrico",
          "Discontinuidad Evitable",
          "Discontinuidad de Salto",
          "Pendiente de la Tangente f prime",
          "Punto de Inflexión"
        ],
        "notes": [
          "Paso 1: Para graficar f prime (x), alinear un sistema de coordenadas verticalmente justo debajo del gráfico de la función original f(x).",
          "Paso 2: Identificar todos los puntos donde la curva original tiene tangentes perfectamente horizontales (máximos, mínimos o mesetas).",
          "Paso 3: Proyectar esos puntos verticalmente hacia abajo y marcar ceros (cortes con el eje x) en el gráfico de la derivada f prime (x).",
          "Paso 4: Identificar los intervalos donde la curva original f(x) es estrictamente creciente y dibujar la derivada por encima del eje horizontal (f prime > 0).",
          "Paso 5: Identificar los intervalos donde f(x) es estrictamente decreciente y dibujar la derivada por debajo del eje horizontal (f prime < 0)."
        ],
        "summary": "Interpretación geométrica del límite formal, tipos de discontinuidades gráficas, pendiente de la recta secante a la tangente y técnica cualitativa para trazar la función derivada a partir de la curva original."
      },
      "conceptMapNodes": "Matemática I: Límites Visuales, Continuidad, Recta Tangente y Graficación de f prime (x)\n  ├── Fundamento: Matemática I · Cátedra Pedro Alson (UCV Ciencias)\n  ├── Ecuaciones: Límite Geométrico, Discontinuidad Evitable, Discontinuidad de Salto\n  └── Protocolo: Paso 1: Para graficar f prime (x), alinear un sistema de coordenadas verticalmente justo debajo del gráfico de la función original f(x). -> Paso 2: Identificar todos los puntos donde la curva original tiene tangentes perfectamente horizontales (máximos, mínimos o mesetas). -> Paso 3: Proyectar esos puntos verticalmente hacia abajo y marcar ceros (cortes con el eje x) en el gráfico de la derivada f prime (x)."
    },
    "generatedQuestions": [
      {
        "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
        "tema": "Matemática I: Límites Visuales, Continuidad, Recta Tangente y Graficación de f prime (x)",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Matemática I: Límites Visuales, Continuidad, Recta Tangente y Graficación de f prime (x)?",
        "opciones": [
          "Interpretación geométrica del límite formal, tipos de discontinuidades gráficas, pendiente de la rec",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Interpretación geométrica del límite formal, tipos de discontinuidades gráficas, pendiente de la rec",
        "justificacion": "**Concepto Fundamental:** Matemática I: Límites Visuales, Continuidad, Recta Tangente y Graficación de f prime (x)\n\n**Resolución Directa:** El cierre magistral del curso de Pedro Alson conecta la geometría de curvas con el cálculo infinitesimal mediante la visualización directa del límite y la derivada. Un límite lim(x..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-mat1-limites-derivadas'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-curvas']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-mat1-curvas'],
  }
];
