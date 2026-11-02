/**
 * @file santiago_matematica1.ts
 * @description Guías Académicas Deconstruidas Oficiales (7 Pilares) para SANTIAGO_MATEMATICA1_GUIDES.
 * Formato canónico riguroso compatible con DeconstructedAcademicGuide.
 * Cátedra canónica de Métodos de Graficación · Prof. Pedro Alson (Editorial ERRO · UCV Ciencias).
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
            "symbolOrUnit": "x \\to f(x)",
            "definition": "Recorrido geométrico que parte de un valor x en el dominio, sube o baja verticalmente hasta la curva y proyecta horizontalmente su valor f(x) sobre el eje y."
      },
      {
            "term": "Camino de Vuelta",
            "symbolOrUnit": "y \\to f^{-1}(y)",
            "definition": "Recorrido inverso que parte de un valor y fijado en el eje vertical, traza una recta horizontal hacia la curva y baja verticalmente para hallar las preimágenes x."
      },
      {
            "term": "Cota Superior / Inferior",
            "symbolOrUnit": "m \\le f(x) \\le M",
            "definition": "Línea horizontal y = M por encima de la cual la curva jamás sube (cota superior), o y = m por debajo de la cual la curva jamás desciende (cota inferior)."
      },
      {
            "term": "Intervalo de Monotonía",
            "symbolOrUnit": "x_1 < x_2 \\implies f(x_1) < f(x_2)",
            "definition": "Región continua del eje x donde la curva sube estrictamente de izquierda a derecha (creciente) o baja estrictamente (decreciente)."
      },
      {
            "term": "Punto Notable de Corte",
            "symbolOrUnit": "(x_0, 0) \\text{ y } (0, f(0))",
            "definition": "Intersección exacta de la curva con el eje horizontal x (donde la función vale cero) o con el eje vertical y (valor inicial f(0))."
      }
],
    "formulasAndStrategies": {
      "coreFormulas": [
            {
                  "name": "Camino de Ida (Evaluación Directa)",
                  "latex": "y_0 = f(x_0)",
                  "application": "Trazar una vertical desde x_0 hasta la curva y proyectar la altura resultante hacia el eje vertical y."
            },
            {
                  "name": "Camino de Vuelta (Preimágenes)",
                  "latex": "x_0 \\in f^{-1}(y_0) \\iff f(x_0) = y_0",
                  "application": "Trazar la recta horizontal y = y_0, hallar las intersecciones con la curva y bajar verticalmente hacia el eje x."
            },
            {
                  "name": "Franja de Acotamiento",
                  "latex": "m \\le f(x) \\le M, \\quad \\forall x \\in \\mathrm{Dom}(f)",
                  "application": "Delimitar el lienzo gráfico entre dos cotas horizontales infranqueables para evitar trazos fuera de rango."
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
            "title": "Problema Canónico UCV (Parcial 1): Estudio de Curva Continua con Puntos Críticos y Solución Gráfica",
            "problemStatement": "Grafique una curva continua continua y = f(x) en el dominio [-4, 6] que satisfaga: f(-4) = -2, f(0) = 3, f(6) = 1. Presenta un mínimo absoluto en x = -2 con valor f(-2) = -4, un máximo absoluto en x = 3 con valor f(3) = 5, y es estrictamente creciente en [-2, 3] y decreciente en [-4, -2] y [3, 6]. Indique cuántas soluciones tiene la ecuación f(x) = 2 en dicho intervalo y determine gráficamente sus intervalos de preimágenes.",
            "deductiveSteps": [
                  "Paso 1: Dibujamos los ejes cartesianos y delimitamos la caja de acotamiento: x varía en [-4, 6] y f(x) vive estrictamente entre la cota inferior m = -4 y la cota superior M = 5.",
                  "Paso 2: Marcamos en el plano los cinco puntos de paso conocidos con certeza: (-4, -2), (-2, -4), (0, 3), (3, 5) y (6, 1).",
                  "Paso 3: De x = -4 a x = -2 la curva desciende suavemente desde y = -2 hasta el fondo del valle en y = -4 sin ondulaciones extrañas, manteniéndose siempre estrictamente negativa.",
                  "Paso 4: De x = -2 a x = 3 la curva asciende monótonamente, cruzando el eje horizontal en un único cero intermedio entre -2 y 0, pasando por el corte vertical (0, 3), hasta coronar en la cima (3, 5).",
                  "Paso 5: De x = 3 a x = 6 la curva desciende suavemente desde y = 5 hasta finalizar en el punto cerrado (6, 1), permaneciendo siempre por encima de y = 1.",
                  "Paso 6: Para resolver f(x) = 2, trazamos la recta horizontal y = 2 (camino de vuelta). Esta recta corta la curva en exactamente dos puntos: uno en el tramo creciente entre x = -2 y x = 0 (donde pasa de -4 a 3), y otro en el tramo decreciente entre x = 3 y x = 6 (donde pasa de 5 a 1). La ecuación f(x) = 2 tiene exactamente 2 soluciones reales."
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
            "trap": "Error Frecuente de Trazado",
            "correction": "Dibujar ondas adicionales que crucen el eje horizontal más veces de las permitidas por la monotonía del tramo."
      }
],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
            {
                  "front": "¿Cuál es la definición y significado geométrico de: Camino de Ida?",
                  "back": "Recorrido que parte de un valor x en el dominio, sube o baja verticalmente hasta la curva y proyecta horizontalmente su valor f(x) sobre el eje y. (Notación: x -> f(x))"
            },
            {
                  "front": "¿Cuál es la definición y significado geométrico de: Camino de Vuelta?",
                  "back": "Recorrido inverso que parte de un valor y fijado en el eje vertical, traza una recta horizontal hacia la curva y baja verticalmente para hallar las preimágenes x. (Notación: y -> f^(-1)(y))"
            },
            {
                  "front": "¿Cuál es la condición para que una ecuación f(x) = c tenga solución única en un intervalo?",
                  "back": "Que la función sea continua y estrictamente monótona (creciente o decreciente) en dicho intervalo y que c pertenezca al rango [f(a), f(b)]."
            }
      ],
      "cornellSynthesis": {
            "cues": [
                  "Camino de Ida",
                  "Camino de Vuelta",
                  "Cotas m y M",
                  "Monotonía Estricta",
                  "Puntos de Corte"
            ],
            "notes": [
                  "Paso 1: Delimitar el dominio sobre el eje horizontal x identificando puntos de corte y extremos.",
                  "Paso 2: Trazar las líneas horizontales de cota superior e inferior para encerrar la franja de la curva.",
                  "Paso 3: Marcar los puntos fijos conocidos (extremos relativos y cortes con los ejes).",
                  "Paso 4: Trazar la curva uniendo los puntos con suavidad continua respetando la monotonía.",
                  "Paso 5: Emplear rectas horizontales y = c para encontrar todas las preimágenes x mediante el camino de vuelta."
            ],
            "summary": "Lectura geométrica integral de funciones continuas, intervalos de crecimiento, cotas, ceros, puntos notables y determinación gráfica de soluciones mediante caminos directos e inversos."
      },
      "conceptMapNodes": "Matemática I: Estudio de Curvas, Monotonía y Caminos de Ida y Vuelta\n  ├── Fundamento: Cátedra Pedro Alson (UCV Ciencias)\n  ├── Ecuaciones: Camino de Ida, Camino de Vuelta, Cotas m <= f(x) <= M\n  └── Protocolo: Caja de Acotamiento -> Puntos Guía -> Trazado Monótono -> Intersecciones Horizontales"
},
    "generatedQuestions": [
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Estudio de Curvas y Monotonía",
            "tipo": "opcion_multiple",
            "pregunta": "Dada una función continua $f: [-4, 6] \\to \\mathbb{R}$ con $f(-4) = -2$, $f(0) = 3$, $f(6) = 1$, mínimo absoluto en $(-2, -4)$, máximo absoluto en $(3, 5)$, estrictamente creciente en $[-2, 3]$ y decreciente en $[-4, -2]$ y $[3, 6]$. ¿Cuántas soluciones reales posee la ecuación $f(x) = 2$?",
            "opciones": [
                  "Exactamente 2 soluciones reales (una en $(-2, 0)$ y otra en $(3, 6)$)",
                  "Exactamente 3 soluciones reales por el teorema del valor intermedio",
                  "Exactamente 1 única solución real por ser monótona a trozos",
                  "Infinitas soluciones en el intervalo central"
            ],
            "correcta": "Exactamente 2 soluciones reales (una en $(-2, 0)$ y otra en $(3, 6)$)",
            "justificacion": "**Concepto Fundamental:** Caminos de Vuelta y Monotonía Estricta.\n\n**Resolución:** Trazamos la recta horizontal $y = 2$. En el primer tramo $[-4, -2]$, la función desciende de $-2$ a $-4$, por lo que nunca alcanza la altura $2$. En el segundo tramo $[-2, 3]$, la función asciende continuamente desde $-4$ hasta $5$, cruzando la altura $y=2$ exactamente una vez (por inyectividad de tramos monótonos). En el tercer tramo $[3, 6]$, la función decrece de $5$ a $1$, volviendo a cruzar la altura $y=2$ exactamente una vez. Por tanto, la recta horizontal corta la curva en exactamente 2 puntos reales."
      },
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Caminos de Ida y Vuelta",
            "tipo": "opcion_multiple",
            "pregunta": "En el método de caminos de ida y vuelta de Pedro Alson, ¿cuál es la condición geométrica necesaria y suficiente para que el camino de vuelta desde una altura fijada $y_0$ produzca una solución única $x_0$?",
            "opciones": [
                  "Que la recta horizontal $y = y_0$ interseque a la curva $y = f(x)$ en un único punto (inyectividad local)",
                  "Que la función sea estrictamente positiva en todo su dominio",
                  "Que la recta bisectriz $y = x$ corte a la función en el origen",
                  "Que la derivada segunda $f''(x)$ sea nula en todo el intervalo"
            ],
            "correcta": "Que la recta horizontal $y = y_0$ interseque a la curva $y = f(x)$ en un único punto (inyectividad local)",
            "justificacion": "**Concepto Fundamental:** Unicidad en Caminos Inversos.\n\n**Resolución:** El camino de vuelta consiste en trazar la recta horizontal a la altura fijada $y = y_0$ y proyectar ortogonalmente sobre el eje $x$ los puntos de corte con la curva. Para que la preimagen sea única, la recta horizontal no debe tocar la curva en más de un punto, lo que exige inyectividad en el rango evaluado."
      },
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Monotonía y Ceros",
            "tipo": "opcion_multiple",
            "pregunta": "Una función continua $f(x)$ en $[1, 5]$ cumple $f(1) = -4$ y $f(5) = 6$. Se sabe que la ecuación $f(x) = 0$ posee exactamente 3 soluciones reales distintas. ¿Qué se deduce obligatoriamente sobre su comportamiento?",
            "opciones": [
                  "La función no puede ser estrictamente monótona en todo $[1, 5]$; debe cambiar de sentido de crecimiento al menos dos veces",
                  "La función es estrictamente creciente en todo su dominio",
                  "La función es constante en un subintervalo abierto",
                  "La función presenta una discontinuidad inevitable de salto infinito"
            ],
            "correcta": "La función no puede ser estrictamente monótona en todo $[1, 5]$; debe cambiar de sentido de crecimiento al menos dos veces",
            "justificacion": "**Concepto Fundamental:** Monotonía vs Ceros de una Curva.\n\n**Resolución:** Una función estrictamente monótona corta a cualquier recta horizontal (en particular el eje $x$, donde $y = 0$) a lo sumo una sola vez. Como se registran 3 cortes con el eje horizontal, la curva forzosamente debe ascender, descender y volver a ascender, teniendo al menos dos cambios de monotonía (un máximo y un mínimo locales)."
      }
],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG["santiago-mat1-curvas"],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-mat1-curvas"]],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-mat1-curvas"],
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
            "symbolOrUnit": "(f + g)(x) = f(x) + g(x)",
            "definition": "Curva cuya altura en cada posición x es la adición algebraica directa de las ordenadas verticales de f y g."
      },
      {
            "term": "Curva Recíproca 1/f",
            "symbolOrUnit": "y = \\frac{1}{f(x)}",
            "definition": "Transformación donde cada altura y se sustituye por 1/y. Los ceros de f(x) se convierten en asíntotas verticales y los valores +/- 1 permanecen invariantes."
      },
      {
            "term": "Camino de la Bisectriz (y = x)",
            "symbolOrUnit": "x \\to f(x) \\to (f(x), f(x)) \\to g(f(x))",
            "definition": "Técnica gráfica que utiliza la recta a 45 grados para transferir el valor de salida vertical de f al eje de entrada horizontal de g."
      }
],
    "formulasAndStrategies": {
      "coreFormulas": [
            {
                  "name": "Suma Geométrica de Ordenadas",
                  "latex": "S(x) = f(x) + g(x)",
                  "application": "En los ceros de g: S(x) = f(x). En los puntos de corte f(x) = g(x): S(x) = 2f(x)."
            },
            {
                  "name": "Curva Recíproca Canónica",
                  "latex": "r(x) = \\frac{1}{f(x)}, \\quad f(x) \\neq 0",
                  "application": "Si f(x_0) = 0 \\implies r(x) tiene asíntota vertical en x_0. Si f(x) = \\pm 1 \\implies r(x) = \\pm 1."
            },
            {
                  "name": "Composición por Rebote en y = x",
                  "latex": "(g \\circ f)(x) = g(f(x))",
                  "application": "Partir de x, subir a f(x), trazar horizontal a y = x, y desde allí subir o bajar a la curva g."
            }
      ],
      "mnemonicsAndPatterns": [
            "Paso 1: Dibujar las curvas base f(x) y g(x) en el mismo plano cartesiano con trazos contrastantes.",
            "Paso 2: Marcar los puntos notables: ceros de ambas curvas, puntos de corte mutuo y puntos donde valen 1 o -1.",
            "Paso 3: Para la suma f + g, ubicar los puntos directos: en los ceros de g la suma pasa por f, y donde f = g la suma pasa por 2f.",
            "Paso 4: Para la recíproca 1/f, levantar asíntotas verticales en cada corte con el eje x y conservar invariantes los puntos con altura 1 o -1.",
            "Paso 5: Para componer g(f(x)), rebotar la salida vertical de f contra la recta bisectriz y = x antes de consultar la curva g."
      ]
},
    "stepByStepExamples": [
      {
            "title": "Problema Canónico UCV (Taller de Curvas): Trazado Completo de la Recíproca 1/f(x) y Composición",
            "problemStatement": "Sea f(x) una función continua con ceros únicamente en x = -3 y x = 2. Se sabe que f'( -3) > 0 (corta subiendo) y f'(2) < 0 (corta bajando). Posee un máximo en x = 0 con f(0) = 4 y tiende a 0 cuando x -> +infinito. a) Describa las asíntotas y signos de la curva recíproca r(x) = 1/f(x); b) Evalúe gráficamente f(f(0)) utilizando la recta y = x.",
            "deductiveSteps": [
                  "Paso 1: Identificamos los ceros de f(x): en x = -3 y x = 2. Por tanto, la curva recíproca r(x) = 1/f(x) tiene dos asíntotas verticales obligatorias en x = -3 y x = 2.",
                  "Paso 2: Analizamos los signos de los polos: en x = -3, como f corta subiendo, f(x) < 0 para x < -3 y f(x) > 0 para x > -3. Por tanto, r(x) -> -infinito por la izquierda y r(x) -> +infinito por la derecha.",
                  "Paso 3: En x = 2, como f corta bajando, f(x) > 0 para x < 2 y f(x) < 0 para x > 2. Por tanto, r(x) -> +infinito por la izquierda y r(x) -> -infinito por la derecha.",
                  "Paso 4: Inversión del máximo: el máximo local de f en (0, 4) se convierte en un mínimo local de r(x) en el punto (0, 1/4 = 0.25).",
                  "Paso 5: Comportamiento asintótico: cuando x -> +infinito, f(x) -> 0 por valores negativos, haciendo que r(x) -> -infinito.",
                  "Paso 6: Composición f(f(0)) con la bisectriz: Partimos de x = 0. Subimos a f(0) = 4. Desde (0, 4), trazamos una horizontal hasta la recta y = x, llegando al punto (4, 4). Desde allí, bajamos verticalmente hasta encontrar la curva f en x = 4, donde leemos la altura f(4)."
            ],
            "finalResult": "Los ceros de f se convierten en polos de 1/f, los máximos en mínimos, y la bisectriz y = x actúa como puente ortogonal de cambio de variable."
      }
],
    "commonErrorsAlerts": [
      {
            "trap": "Trampa de signos en la recíproca",
            "correction": "Olvidar que 1/f(x) conserva estrictamente el mismo signo algebraico que f(x): si f es negativa, 1/f jamás puede ser positiva."
      },
      {
            "trap": "Trampa de puntos invariantes",
            "correction": "Dibujar la recíproca cortando a la función original en valores distintos de y = 1 o y = -1."
      },
      {
            "trap": "Trampa de la bisectriz",
            "correction": "Trazar la línea hacia y = x de forma inclinada en lugar de estrictamente paralela al eje horizontal."
      }
],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
            {
                  "front": "¿Qué le ocurre a la curva recíproca r(x) = 1/f(x) en cada punto donde f(x) corta al eje x?",
                  "back": "Se genera una asíntota vertical inquebrantable (polo). La curva diverge a +infinito o -infinito según el signo de f(x) a cada lado."
            },
            {
                  "front": "¿En qué puntos se cruzan exactamente una curva f(x) y su recíproca 1/f(x)?",
                  "back": "Únicamente en aquellos puntos donde la altura de f(x) es igual a 1 o igual a -1, pues 1/1 = 1 y 1/(-1) = -1."
            },
            {
                  "front": "¿Cuál es la función pedagógica de la recta y = x en la composición g(f(x))?",
                  "back": "Transformar una coordenada de salida vertical y = f(x) en una coordenada de entrada horizontal x = f(x) mediante un rebote ortogonal a 45 grados."
            }
      ],
      "cornellSynthesis": {
            "cues": [
                  "Suma de Ordenadas",
                  "Ceros en f -> Polos en 1/f",
                  "Alturas Invariantes 1 y -1",
                  "Rebote en Bisectriz y = x"
            ],
            "notes": [
                  "1. Para sumar curvas, adicionar algebraicamente las alturas verticales en cada abscisa x.",
                  "2. Para invertir 1/f, convertir cada corte x en asíntota vertical respetando signos laterales.",
                  "3. Puntos con f(x) = 1 o -1 permanecen fijos.",
                  "4. Para componer g(f(x)), viajar horizontalmente a la recta y = x y luego verticalmente a g."
            ],
            "summary": "Operaciones gráficas directas que permiten sumar, invertir y componer curvas continuas sin recurrir a tabulaciones numéricas ciegas."
      },
      "conceptMapNodes": "Operaciones con Curvas\n  ├── Suma: Adición vertical de ordenadas (doble altura en cortes)\n  ├── Recíproca 1/f: Ceros -> Asíntotas, Máximos -> Mínimos, Invariantes en +-1\n  └── Composición: Entrada x -> f(x) -> Horizontal a y=x -> Vertical a g"
},
    "generatedQuestions": [
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Curva Recíproca 1/f",
            "tipo": "opcion_multiple",
            "pregunta": "Si una curva continua $f(x)$ cruza el eje horizontal en $x = 3$ con pendiente positiva $f'(3) = 2$, ¿qué comportamiento presenta su curva recíproca $r(x) = \\frac{1}{f(x)}$ en las inmediaciones de $x = 3$?",
            "opciones": [
                  "Una asíntota vertical en $x = 3$, divergiendo a $-\\infty$ por la izquierda ($x \\to 3^-$) y a $+\\infty$ por la derecha ($x \\to 3^+$)",
                  "Un cruce suave con el eje horizontal en el punto $(3, 0)$",
                  "Una asíntota vertical que tiende a $+\\infty$ por ambos lados simultáneamente",
                  "Una discontinuidad evitable con agujero en $(3, 1/2)$"
            ],
            "correcta": "Una asíntota vertical en $x = 3$, divergiendo a $-\\infty$ por la izquierda ($x \\to 3^-$) y a $+\\infty$ por la derecha ($x \\to 3^+$)",
            "justificacion": "**Concepto Fundamental:** Ceros y Polos en la Curva Recíproca.\n\n**Resolución:** Cuando $f(x_0) = 0$, la recíproca $1/f(x_0)$ tiene un polo o asíntota vertical. Al tener pendiente positiva en $x = 3$, para $x < 3$ los valores de $f(x)$ son negativos cercanos a cero, haciendo que $1/f(x) \\to -\\infty$. Para $x > 3$, $f(x) > 0$, haciendo que $1/f(x) \\to +\\infty$."
      },
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Suma Geométrica de Curvas",
            "tipo": "opcion_multiple",
            "pregunta": "Al sumar gráficamente dos funciones $(f+g)(x)$ punto a punto según el método de Pedro Alson, ¿qué ocurre en una coordenada $x_1$ donde $g(x_1) = 0$ y en una coordenada $x_2$ donde $f(x_2) = g(x_2)$?",
            "opciones": [
                  "En $x_1$ la curva suma pasa exactamente por $(x_1, f(x_1))$, y en $x_2$ la curva suma pasa por $(x_2, 2f(x_2))$",
                  "En $x_1$ la curva suma se anula, y en $x_2$ la curva suma vale 1",
                  "En ambos puntos la curva suma presenta un extremo relativo horizontal",
                  "En $x_1$ hay una asíntota vertical y en $x_2$ una tangente vertical"
            ],
            "correcta": "En $x_1$ la curva suma pasa exactamente por $(x_1, f(x_1))$, y en $x_2$ la curva suma pasa por $(x_2, 2f(x_2))$",
            "justificacion": "**Concepto Fundamental:** Adición Geométrica de Ordenadas.\n\n**Resolución:** Por definición de adición de funciones: $(f+g)(x_1) = f(x_1) + g(x_1) = f(x_1) + 0 = f(x_1)$. En los cortes mutuos $f(x_2) = g(x_2)$, la suma es $f(x_2) + f(x_2) = 2f(x_2)$, alcanzando el doble de la altura común."
      },
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Composición con Bisectriz",
            "tipo": "opcion_multiple",
            "pregunta": "Para componer gráficamente $y = g(f(x))$ usando la recta bisectriz $y = x$, ¿cuál es la trayectoria canónica de evaluación a partir de un valor de entrada $x_0$?",
            "opciones": [
                  "Subir verticalmente a $f(x_0)$, desplazarse horizontalmente hasta tocar la recta $y = x$, y desde allí moverse verticalmente hasta tocar la curva $g$",
                  "Subir verticalmente a $g(x_0)$ y luego proyectar directamente al eje horizontal",
                  "Trazar una recta perpendicular a $y=x$ desde el origen hasta el punto medio",
                  "Multiplicar las alturas de ambas curvas y dividir entre la pendiente de la recta"
            ],
            "correcta": "Subir verticalmente a $f(x_0)$, desplazarse horizontalmente hasta tocar la recta $y = x$, y desde allí moverse verticalmente hasta tocar la curva $g$",
            "justificacion": "**Concepto Fundamental:** Camino de la Bisectriz en Composición de Curvas.\n\n**Resolución:** El valor intermedio $u = f(x_0)$ es una altura vertical en la gráfica de $f$. Para alimentar a la función $g$, dicha altura debe transformarse en una posición horizontal sobre el eje de abscisas. Al viajar horizontalmente hasta la recta $y = x$, la coordenada $(u, u)$ sitúa la entrada en $u$, desde donde una línea vertical corta a la curva $g$ en la altura final $g(u) = g(f(x_0))$."
      }
],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG["santiago-mat1-operaciones"],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-mat1-operaciones"]],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-mat1-operaciones"],
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
            "symbolOrUnit": "[+c], [\\cdot c], [()^2], [1/()], [\\tan()]",
            "definition": "Bloque funcional que ejecuta una única operación matemática básica sobre un valor numérico que entra a través de una pantalla."
      },
      {
            "term": "Diagrama Lineal",
            "symbolOrUnit": "x \\to [T_1] \\to [T_2] \\to \\dots \\to y",
            "definition": "Flujo de cálculo donde la variable x entra por un único canal y sufre una cadena de transformaciones sucesivas sin ramificaciones."
      },
      {
            "term": "Diagrama Ramificado",
            "symbolOrUnit": "x \\rightrightarrows [T_A], [T_B] \\to [+]",
            "definition": "Flujo donde la variable x se divide en múltiples ramas que no pueden invertirse directamente sin una reestructuración algebraica."
      },
      {
            "term": "Linealización Cuadrática",
            "symbolOrUnit": "y = a(x - h)^2 + k",
            "definition": "Técnica de completación de cuadrados que colapsa dos términos con x (cuadrático y lineal) en una única pantalla cuadrática desplazada."
      }
],
    "formulasAndStrategies": {
      "coreFormulas": [
            {
                  "name": "Cadena de Diagrama Lineal",
                  "latex": "x \\xrightarrow{T_1} P_1 \\xrightarrow{T_2} P_2 \\dots \\xrightarrow{T_n} y",
                  "application": "Permite el despeje unívoco marchando en reversa: x = T_1^{-1}(T_2^{-1}(\\dots T_n^{-1}(y)))."
            },
            {
                  "name": "Completación Canónica de Cuadrados",
                  "latex": "ax^2 + bx + c = a\\left(x + \\frac{b}{2a}\\right)^2 + \\left(c - \\frac{b^2}{4a}\\right)",
                  "application": "Transforma un polinomio cuadrático ramificado en una pantalla lineal de vértice (h, k)."
            },
            {
                  "name": "Inversión de la Tecla Alejada",
                  "latex": "f(g(x)) = y_0 \\iff g(x) = f^{-1}(y_0)",
                  "application": "Identificar la última tecla aplicada a la expresión y aplicar su operación inversa a ambos lados."
            }
      ],
      "mnemonicsAndPatterns": [
            "Paso 1: Identificar cuántas veces aparece la variable x en la expresión dada.",
            "Paso 2: Si x aparece una sola vez, construir el diagrama lineal anotando cada tecla en orden de precedencia de operaciones.",
            "Paso 3: Si x aparece más de una vez (diagrama ramificado), aplicar álgebra para colapsarla a una sola pantalla (completación de cuadrados para cuadráticas, o división polinómica para homográficas).",
            "Paso 4: Identificar la tecla más alejada (la última operación externa en la cadena).",
            "Paso 5: Despejar aplicando la tecla inversa a la más alejada, avanzando de afuera hacia adentro hasta aislar x.",
            "Paso 6: Considerar las ramas múltiples en teclas no inyectivas (ej. elevar al cuadrado genera raíces positivas y negativas)."
      ]
},
    "stepByStepExamples": [
      {
            "title": "Problema Canónico UCV (Parcial 1): Despeje por Teclas y Pantallas de Ecuación Trascendente",
            "problemStatement": "Resuelva la ecuación trascendente tan((x - 0.23)²) = 0.36 en el intervalo x en [0, 2] mediante el modelo de teclas y pantallas de Pedro Alson. Escriba la secuencia directa de teclas, identifique la tecla más alejada y aplique la marcha atrás paso a paso.",
            "deductiveSteps": [
                  "Paso 1: Construimos la cadena directa de cálculo partiendo de la entrada x: Pantalla 0: [ x ] -> Tecla 1: [ - 0.23 ] -> Pantalla 1: [ x - 0.23 ] -> Tecla 2: [ ()² ] -> Pantalla 2: [ (x - 0.23)² ] -> Tecla 3: [ tan ] -> Pantalla 3: [ 0.36 ].",
                  "Paso 2: Identificamos la tecla más alejada: es la Tecla 3 [ tan ]. Para deshacerla, aplicamos su tecla inversa [ arctan ] a la pantalla de salida 0.36.",
                  "Paso 3: Evaluamos: (x - 0.23)² = arctan(0.36). En radianes: arctan(0.36) ≈ 0.3455 rad.",
                  "Paso 4: La siguiente tecla más alejada es [ ()² ]. Su tecla inversa es la raíz cuadrada con doble signo [ ±√ ]: x - 0.23 = ±√(0.3455) ≈ ±0.5878.",
                  "Paso 5: La última tecla por deshacer es [ - 0.23 ]. Su tecla inversa es [ + 0.23 ]: x = 0.23 ± 0.5878.",
                  "Paso 6: Calculamos las dos ramas: Rama positiva: x_1 = 0.23 + 0.5878 = 0.8178 (pertenece al intervalo [0, 2]). Rama negativa: x_2 = 0.23 - 0.5878 = -0.3578 (queda fuera del intervalo [0, 2]). Solución única en [0, 2]: x ≈ 0.818."
            ],
            "finalResult": "El método de pantallas descompone ecuaciones no lineales en una secuencia determinista de inversiones sin ambigüedades de signos."
      }
],
    "commonErrorsAlerts": [
      {
            "trap": "Trampa de la tecla alejada",
            "correction": "Intentar sumar 0.23 al inicio cuando el término está atrapado dentro del cuadrado y de la tangente."
      },
      {
            "trap": "Trampa del doble signo en raíz",
            "correction": "Olvidar que la inversa de la tecla al cuadrado produce dos ramas de salida (positiva y negativa)."
      },
      {
            "trap": "Trampa de radianes vs grados",
            "correction": "Calcular arctan(0.36) con la calculadora en modo DEG en lugar de radianes, falseando el valor físico del problema."
      }
],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
            {
                  "front": "¿Por qué un diagrama de cálculo ramificado no puede despejarse directamente en reversa?",
                  "back": "Porque la variable x ingresa por múltiples canales simultáneos; para despejarla unívocamente es indispensable colapsarla a una sola pantalla mediante manipulación algebraica."
            },
            {
                  "front": "¿Cuál es la regla fundamental para identificar la 'tecla más alejada' en una expresión?",
                  "back": "Es la última operación que se calcularía si sustituyéramos un número en x siguiendo el orden estricto de precedencia de operaciones."
            },
            {
                  "front": "¿Cómo linealiza Pedro Alson una función cuadrática y = ax² + bx + c?",
                  "back": "Completando cuadrados para transformarla a y = a(x - h)² + k, donde x aparece en una sola pantalla lineal de entrada."
            }
      ],
      "cornellSynthesis": {
            "cues": [
                  "Diagrama Lineal",
                  "Diagrama Ramificado",
                  "Tecla más Alejada",
                  "Completación de Cuadrados"
            ],
            "notes": [
                  "1. Escribir la cadena de transformaciones desde x hasta y.",
                  "2. Identificar la última tecla aplicada (la más alejada de x).",
                  "3. Despejar aplicando la tecla inversa a ambos lados de la igualdad.",
                  "4. Si hay ramas con x múltiple, linealizar antes de despejar."
            ],
            "summary": "Representación algorítmica de fórmulas mediante teclas y pantallas que garantiza despejes sistemáticos e inequívocos."
      },
      "conceptMapNodes": "Teclas y Fórmulas de Alson\n  ├── Diagrama Lineal: x -> [T1] -> [T2] -> y (Inversión directa marcha atrás)\n  ├── Diagrama Ramificado: x múltiple -> Requiere linealización previa\n  └── Cuadráticas: ax² + bx + c -> Completación de cuadrados -> a(x-h)² + k"
},
    "generatedQuestions": [
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Diagramas Lineales y Ramificados",
            "tipo": "opcion_multiple",
            "pregunta": "¿Por qué una ecuación cuadrática como $3x^2 - 12x + 5 = y$ no puede resolverse directamente mediante un diagrama lineal de teclas sin completar cuadrados previamente?",
            "opciones": [
                  "Porque la variable $x$ aparece en dos términos distintos ($x^2$ y $x$), generando un diagrama ramificado que no admite inversión secuencial directa",
                  "Porque las funciones cuadráticas no poseen gráfica en el plano cartesiano",
                  "Porque el coeficiente cuadrático 3 es positivo",
                  "Porque las raíces cuadradas siempre son números imaginarios en la cátedra"
            ],
            "correcta": "Porque la variable $x$ aparece en dos términos distintos ($x^2$ y $x$), generando un diagrama ramificado que no admite inversión secuencial directa",
            "justificacion": "**Concepto Fundamental:** Diagramas Lineales vs Ramificados de Pedro Alson.\n\n**Resolución:** Un diagrama lineal solo tiene una entrada $x$ que pasa secuencialmente por una serie de teclas $[T_1] \\to [T_2] \\to \\dots \\to y$, lo que permite despejar invirtiendo de derecha a izquierda. Si $x$ aparece en varios términos, el flujo se bifurca y no se puede aplicar el camino inverso directamente sin colapsar las variables en una sola pantalla mediante completación de cuadrados: $3(x-2)^2 - 7$."
      },
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Algoritmo de Tecla Alejada",
            "tipo": "opcion_multiple",
            "pregunta": "En el examen de Pedro Alson se pide resolver la ecuación $\\tan((x - 0.23)^2) = 0.36$. ¿Cuál es la secuencia de teclas directas y cuál es la tecla más alejada que debe invertirse en primer lugar?",
            "opciones": [
                  "Directas: $[-0.23] \\to [()^2] \\to [\\tan]$; la tecla más alejada es $[\\tan]$ y su inversa es $[\\arctan]$",
                  "Directas: $[\\tan] \\to [()^2] \\to [-0.23]$; la tecla más alejada es $[-0.23]$",
                  "Directas: $[()^2] \\to [-0.23] \\to [\\tan]$; la tecla más alejada es $[()^2]$",
                  "Directas: $[+0.23] \\to [\\sqrt{}] \\to [\\tan]$; la tecla más alejada es $[\\sqrt{}]$"
            ],
            "correcta": "Directas: $[-0.23] \\to [()^2] \\to [\\tan]$; la tecla más alejada es $[\\tan]$ y su inversa es $[\\arctan]$",
            "justificacion": "**Concepto Fundamental:** Algoritmo de Tecla Alejada e Inversión.\n\n**Resolución:** Partiendo de $x$, primero se resta $0.23$, luego se eleva al cuadrado la pantalla resultante, y finalmente se aplica la tangente. La última operación aplicada (la más alejada de $x$) es $[\\tan]$. Para despejar, aplicamos la inversa de la más alejada: $(x - 0.23)^2 = \\arctan(0.36) + k\\pi$, y luego extraemos raíz cuadrada y sumamos $0.23$."
      },
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Linealización Canónica",
            "tipo": "opcion_multiple",
            "pregunta": "Al transformar la expresión cuadrática $y = -2x^2 + 8x + 1$ a la forma canónica de pantalla lineal $a(x - h)^2 + k$, ¿cuáles son los valores del vértice $(h, k)$?",
            "opciones": [
                  "$h = 2$, $k = 9$, quedando $y = -2(x - 2)^2 + 9$",
                  "$h = -2$, $k = 1$, quedando $y = -2(x + 2)^2 + 1$",
                  "$h = 4$, $k = -7$, quedando $y = -2(x - 4)^2 - 7$",
                  "$h = 2$, $k = -7$, quedando $y = -2(x - 2)^2 - 7$"
            ],
            "correcta": "$h = 2$, $k = 9$, quedando $y = -2(x - 2)^2 + 9$",
            "justificacion": "**Concepto Fundamental:** Linealización Cuadrática Canónica.\n\n**Resolución:** Factorizamos el coeficiente principal: $y = -2(x^2 - 4x) + 1$. Completamos el cuadrado dentro del paréntesis sumando y restando $(4/2)^2 = 4$: $y = -2[(x - 2)^2 - 4] + 1 = -2(x - 2)^2 + 8 + 1 = -2(x - 2)^2 + 9$. Por tanto $h = 2$ y $k = 9$."
      }
],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG["santiago-mat1-teclas"],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-mat1-teclas"]],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-mat1-teclas"],
  },
  {
    "id": "santiago-mat1-soluciones-guide",
    "evaluationEventId": "santiago-mat1-parcial-1",
    "guideMetadata": {
      "title": "Matemática I: Soluciones Múltiples, Ecuaciones Trascendentes y Conteo Gráfico",
      "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
      "summary": "Separación de ecuaciones no lineales en pares de curvas elementales f1(x) = f2(x), conteo visual de puntos de intersección, acotamiento de raíces y teoremas de existencia y unicidad."
},
    "phenomenonAndTheory": "Muchas ecuaciones de la física y la ingeniería no admiten soluciones algebraicas exactas despejando la x con operaciones elementales (por ejemplo, e^(-x) = x o sen(x) = x/2). Pedro Alson enseña que para resolverlas no se requiere magia numérica, sino descomponer la ecuación en dos funciones conocidas y trazables f1(x) y f2(x) tales que f1(x) = f2(x). Las soluciones reales corresponden exactamente a las abscisas de los puntos donde ambas curvas se cruzan en el plano. Combinando el trazado cualitativo con el análisis de monotonía y el Teorema del Valor Intermedio (Bolzano), es posible certificar cuántas raíces existen en total y en qué intervalos cerrados viven.",
    "glossary": [
      {
            "term": "Ecuación Trascendente",
            "symbolOrUnit": "f_1(x) = f_2(x)",
            "definition": "Ecuación que contiene funciones no algebraicas (trigonométricas, exponenciales, logarítmicas) donde la variable no puede aislarse mediante operaciones finitas."
      },
      {
            "term": "Separación de Ecuaciones",
            "symbolOrUnit": "F(x) = 0 \\iff f_1(x) = f_2(x)",
            "definition": "Técnica de descomponer una relación compleja en dos curvas elementales cuyas gráficas canónicas son ampliamente conocidas."
      },
      {
            "term": "Conteo Visual de Soluciones",
            "symbolOrUnit": "N = \\#\\{x \\in \\mathbb{R} : f_1(x) = f_2(x)\\}",
            "definition": "Determinación del número exacto de raíces reales mediante la cuenta de intersecciones geométricas entre dos curvas."
      }
],
    "formulasAndStrategies": {
      "coreFormulas": [
            {
                  "name": "Descomposición Canónica",
                  "latex": "F(x) = 0 \\iff f_1(x) = f_2(x)",
                  "application": "Dividir la ecuación en dos funciones fáciles de graficar en un mismo sistema de coordenadas."
            },
            {
                  "name": "Criterio de Existencia (Bolzano)",
                  "latex": "H(a) \\cdot H(b) < 0 \\implies \\exists c \\in (a, b) : H(c) = 0",
                  "application": "Garantizar que existe al menos una raíz en el intervalo donde la curva diferencia cambia de signo."
            },
            {
                  "name": "Criterio de Unicidad por Monotonías Opuestas",
                  "latex": "f_1' > 0 \\text{ y } f_2' < 0 \\implies \\text{a lo sumo 1 solución}",
                  "application": "Si una curva asciende y la otra desciende, no pueden volver a cortarse tras su primer cruce."
            }
      ],
      "mnemonicsAndPatterns": [
            "Paso 1: Reescribir la ecuación pasando un grupo de términos a la derecha para formar dos curvas estándar f1(x) y f2(x).",
            "Paso 2: Graficar f1(x) identificando sus asíntotas, monotonía y puntos notables de corte.",
            "Paso 3: Graficar f2(x) en el mismo sistema cartesiano con la misma escala métrica.",
            "Paso 4: Identificar las regiones de acotamiento donde es imposible que se corten (por ejemplo, si una curva está por encima de 1 y la otra por debajo).",
            "Paso 5: Contar los puntos de cruce e indicar el intervalo numérico cerrado donde se encuentra cada solución.",
            "Paso 6: Justificar formalmente la existencia mediante cambio de signo y la unicidad mediante monotonía estricta."
      ]
},
    "stepByStepExamples": [
      {
            "title": "Problema Canónico UCV (Parcial 1): Conteo Gráfico de Raíces de Ecuación Trascendente",
            "problemStatement": "Determine cuántas soluciones reales tiene la ecuación e^(-x) = x² - 2 en todo el eje real. Ubique cada solución en un intervalo de longitud 1 y demuestre formalmente que no existen más soluciones.",
            "deductiveSteps": [
                  "Paso 1: Separamos la ecuación en dos curvas elementales: f1(x) = e^(-x) (exponencial decreciente) y f2(x) = x² - 2 (parábola canónica con vértice en (0, -2) que abre hacia arriba).",
                  "Paso 2: Trazamos f1(x) = e^(-x): pasa por (0, 1), (-1, e ≈ 2.72), (-2, e² ≈ 7.39). Es estrictamente decreciente, f1(x) > 0 para todo x, y tiende a 0 cuando x -> +infinito.",
                  "Paso 3: Trazamos f2(x) = x² - 2: tiene vértice en (0, -2) y corta al eje horizontal en x = -√2 ≈ -1.41 y x = √2 ≈ 1.41.",
                  "Paso 4: Análisis para x < 0: En x = -1: f1(-1) = e ≈ 2.72 y f2(-1) = 1 - 2 = -1. Aquí f1 > f2. En x = -2: f1(-2) = e² ≈ 7.39 y f2(-2) = 4 - 2 = 2. Aquí f1 > f2. Sin embargo, para x < -2 cuadrático domina cuando x -> -infinito: en x = -3, f1(-3) = e³ ≈ 20.08 y f2(-3) = 7. Notamos que para valores aún más negativos la parábola crece como x² mientras e^(-x) crece exponencialmente más rápido. En efecto, en x = -1, f1 > f2; en x = -2, f1 > f2. Analizamos x = 0: f1(0) = 1 > f2(0) = -2. En x = 1: f1(1) = 1/e ≈ 0.37 y f2(1) = 1 - 2 = -1 (f1 > f2). En x = 2: f1(2) = 1/e² ≈ 0.135 y f2(2) = 4 - 2 = 2 (aquí f2 > f1). Por el teorema de Bolzano para H(x) = f1(x) - f2(x), al cambiar de +0.37 a -1.865 en [1, 2], existe una raíz en (1, 2).",
                  "Paso 5: Análisis en la rama izquierda x < 0: En x = -1, H(-1) = 2.72 - (-1) = 3.72 > 0. En x = -1.5: f1(-1.5) = e^1.5 ≈ 4.48; f2(-1.5) = 2.25 - 2 = 0.25 (H > 0). En x = -2: H(-2) = 7.39 - 2 = 5.39 > 0. ¿Se cortan a la izquierda? La parábola x² - 2 y la exponencial e^(-x) se cortan si f2(x) = f1(x). Evaluando en x = -1.4: f2(-1.4) = -0.04 < f1(-1.4). Como e^(-x) > x² para todo x negativo grande, no hay corte a la izquierda.",
                  "Paso 6: Conclusión rigurosa: La ecuación tiene exactamente 2 soluciones reales si consideramos la intersección completa: una solución positiva en x ∈ (1, 2) y no hay soluciones adicionales porque para x > 2 la parábola supera a la exponencial para siempre."
            ],
            "finalResult": "El conteo gráfico complementado con la función diferencia H(x) descarta soluciones falsas y ubica las raíces reales en intervalos seguros."
      }
],
    "commonErrorsAlerts": [
      {
            "trap": "Trampa de raíces fantasmas",
            "correction": "Asumir que porque una curva crece y otra decrece siempre se cortan, sin verificar si sus rangos coinciden en ese intervalo."
      },
      {
            "trap": "Trampa de escala asimétrica",
            "correction": "Dibujar los ejes x e y con escalas arbitrariamente distintas, deformando las pendientes y perdiendo puntos de intersección reales."
      }
],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
            {
                  "front": "¿Cómo se transforman ecuaciones complejas para contar visualmente sus raíces según Pedro Alson?",
                  "back": "Se separan en dos curvas elementales f1(x) = f2(x) graficadas en el mismo plano cartesiano; el número de soluciones es el número de cruces."
            },
            {
                  "front": "¿Qué condición de monotonía asegura que dos curvas no puedan cortarse más de una vez?",
                  "back": "Que una sea estrictamente creciente y la otra estrictamente decreciente en el intervalo de análisis."
            }
      ],
      "cornellSynthesis": {
            "cues": [
                  "Separación de Curvas",
                  "Intersecciones Reales",
                  "Función Diferencia H(x)",
                  "Teorema de Bolzano"
            ],
            "notes": [
                  "1. Descomponer F(x) = 0 en f1(x) = f2(x).",
                  "2. Graficar ambas curvas con precisión geométrica.",
                  "3. Contar los cruces visuales.",
                  "4. Verificar intervalos de cambio de signo mediante Bolzano."
            ],
            "summary": "Determinación rigurosa del número de soluciones de ecuaciones trascendentes y no lineales mediante separación de curvas elementales."
      },
      "conceptMapNodes": "Soluciones Múltiples\n  ├── Ecuación Trascendente: F(x) = 0\n  ├── Descomposición: f1(x) = f2(x)\n  └── Verificación: Gráfica simultánea + Criterio de Bolzano H(a)H(b) < 0"
},
    "generatedQuestions": [
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Separación de Ecuaciones",
            "tipo": "opcion_multiple",
            "pregunta": "Para determinar el número exacto de soluciones reales de la ecuación trascendente $e^{-x} = x^2 - 2$, ¿cuál es la estrategia geométrica de Pedro Alson?",
            "opciones": [
                  "Descomponer la ecuación en dos curvas elementales $f_1(x) = e^{-x}$ y $f_2(x) = x^2 - 2$, graficarlas en el mismo plano y contar el número de puntos de intersección",
                  "Intentar despejar algebraicamente aplicando logaritmos naturales a ambos lados ciegamente",
                  "Sustituir únicamente números enteros de $-10$ a $10$ en una tabla",
                  "Derivar ambas funciones e igualar sus derivadas a cero"
            ],
            "correcta": "Descomponer la ecuación en dos curvas elementales $f_1(x) = e^{-x}$ y $f_2(x) = x^2 - 2$, graficarlas en el mismo plano y contar el número de puntos de intersección",
            "justificacion": "**Concepto Fundamental:** Separación de Ecuaciones en Pares de Curvas.\n\n**Resolución:** Las ecuaciones trascendentes no admiten despeje elemental cerrado. Al separar en $y = e^{-x}$ (curva exponencial decreciente asintótica al eje horizontal positivo) e $y = x^2 - 2$ (parábola con vértice en $(0, -2)$ que abre hacia arriba), observamos claramente los puntos donde se cruzan ambas curvas en el plano cartesiano."
      },
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Conteo Gráfico en Ecuaciones Periódicas",
            "tipo": "opcion_multiple",
            "pregunta": "Dada la ecuación $\\sin(x) = \\frac{x}{3\\pi}$, ¿cuántas soluciones reales posee en todo $\\mathbb{R}$?",
            "opciones": [
                  "Exactamente 7 soluciones reales (en $x = 0$ y 3 a cada lado en $[-3\\pi, 3\\pi]$)",
                  "Exactamente 1 única solución real en $x = 0$",
                  "Infinitas soluciones porque el seno es periódico",
                  "Ninguna solución porque las unidades no coinciden"
            ],
            "correcta": "Exactamente 7 soluciones reales (en $x = 0$ y 3 a cada lado en $[-3\\pi, 3\\pi]$)",
            "justificacion": "**Concepto Fundamental:** Acotamiento y Conteo Gráfico.\n\n**Resolución:** Como $|\\sin(x)| \\le 1$, cualquier solución debe cumplir $|\\frac{x}{3\\pi}| \\le 1 \\implies |x| \\le 3\\pi$. Fuera del intervalo $[-3\\pi, 3\\pi]$ la recta se escapa de la banda $[-1, 1]$ y no puede cortar al seno. Dentro de $[-3\\pi, 3\\pi]$, la recta pasa por $(0,0)$, $(-3\\pi, -1)$ y $(3\\pi, 1)$, cortando las ondas del seno en $x = 0$, $x = \\pm 3\\pi$ y en 4 puntos intermedios (dos positivos y dos negativos), totalizando $1 + 2 + 4 = 7$ intersecciones."
      },
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Unicidad por Monotonía",
            "tipo": "opcion_multiple",
            "pregunta": "Si en un intervalo cerrado $[a, b]$, la función $f_1(x)$ es continua y estrictamente creciente, mientras que $f_2(x)$ es continua y estrictamente decreciente, ¿cuántas soluciones reales como máximo puede tener la ecuación $f_1(x) = f_2(x)$?",
            "opciones": [
                  "A lo sumo una única solución real en $[a, b]$",
                  "Exactamente dos soluciones reales obligatorias",
                  "Al menos tres soluciones por el teorema del valor intermedio",
                  "Infinitas soluciones si $f_1(a) < f_2(a)$"
            ],
            "correcta": "A lo sumo una única solución real en $[a, b]$",
            "justificacion": "**Concepto Fundamental:** Unicidad por Monotonías Opuestas.\n\n**Resolución:** Consideremos la función diferencia $H(x) = f_1(x) - f_2(x)$. Al ser $f_1$ estrictamente creciente y $f_2$ estrictamente decreciente, su diferencia $H(x)$ es estrictamente creciente en todo $[a, b]$. Una función estrictamente creciente es inyectiva y por tanto solo puede anularse a lo sumo una sola vez ($H(x) = 0$). Así, $f_1(x) = f_2(x)$ tiene como máximo una única solución."
      }
],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG["santiago-mat1-soluciones"],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-mat1-soluciones"]],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-mat1-soluciones"],
  },
  {
    "id": "santiago-mat1-rectas-hiperbolas-guide",
    "evaluationEventId": "santiago-mat1-parcial-2",
    "guideMetadata": {
      "title": "Matemática I: Rectas, Parábolas, Hipérbolas Homográficas y Áreas Geométricas",
      "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
      "summary": "Descomposición canónica de hipérbolas v + k/(x - h), asíntotas ortogonales, familias de rectas secantes y cálculo de áreas geométricas de triángulos bajo curvas."
},
    "phenomenonAndTheory": "Las hipérbolas homográficas f(x) = (ax + b)/(cx + d) constituyen una de las piezas angulares de los exámenes de Pedro Alson. Mediante la división de polinomios o artificios algebraicos, toda función homográfica se descompone en la forma canónica v + k/(x - h), donde x = h es su asíntota vertical, y = v es su asíntota horizontal y k es el parámetro de curvatura. El signo de k define en qué cuadrantes viven las dos ramas respecto al centro de las asíntotas (si k > 0, en los cuadrantes I y III; si k < 0, en el II y IV). En los parciales de la UCV, estas hipérbolas se combinan con rectas tangentes o secantes para delimitar triángulos y trapecios cuyas áreas geométricas deben deducirse mediante integración elemental o geometría analítica euclidiana.",
    "glossary": [
      {
            "term": "Función Homográfica",
            "symbolOrUnit": "f(x) = \\frac{ax + b}{cx + d}",
            "definition": "Cociente de dos polinomios de primer grado, cuya gráfica es una hipérbola equilátera rotada con asíntotas ortogonales."
      },
      {
            "term": "Forma Canónica de Alson",
            "symbolOrUnit": "f(x) = v + \\frac{k}{x - h}",
            "definition": "Descomposición canónica donde (h, v) es el centro de simetría y k determina la dilatación y cuadrantes de las ramas."
      },
      {
            "term": "Asíntota Ortogonal",
            "symbolOrUnit": "x = h \\text{ e } y = v",
            "definition": "Par de rectas mutuamente perpendiculares hacia las cuales las ramas de la hipérbola se aproximan indefinidamente sin tocarlas."
      }
],
    "formulasAndStrategies": {
      "coreFormulas": [
            {
                  "name": "Descomposición Canónica Homográfica",
                  "latex": "\\frac{ax + b}{cx + d} = \\frac{a}{c} + \\frac{b - \\frac{ad}{c}}{cx + d} = v + \\frac{k}{x - h}",
                  "application": "Identificar de inmediato la asíntota vertical h = -d/c y la horizontal v = a/c."
            },
            {
                  "name": "Área del Triángulo Tangente (Hipérbola)",
                  "latex": "\\mathrm{Área} = 2|k|",
                  "application": "Propiedad geométrica constante: el triángulo formado por las asíntotas y cualquier tangente a la hipérbola tiene área constante 2|k|."
            },
            {
                  "name": "Ecuación Punto-Pendiente de Recta",
                  "latex": "y - y_0 = m(x - x_0)",
                  "application": "Trazar rectas secantes que unen dos puntos conocidos de la hipérbola o rectas tangentes con derivada."
            }
      ],
      "mnemonicsAndPatterns": [
            "Paso 1: Para f(x) = (ax + b)/(cx + d), igualar el denominador a cero para hallar la asíntota vertical x = -d/c.",
            "Paso 2: Calcular el límite al infinito para hallar la asíntota horizontal y = a/c.",
            "Paso 3: Dividir polinomios para escribir la forma canónica v + k/(x - h) y extraer el signo del parámetro k.",
            "Paso 4: Si k > 0, ubicar las ramas en cuadrantes I y III respecto al cruce de asíntotas; si k < 0, en II y IV.",
            "Paso 5: Marcar los puntos de corte con los ejes: corte horizontal f(x) = 0 en x = -b/a, y corte vertical f(0) = b/d.",
            "Paso 6: Si el problema pide áreas, hallar los vértices del triángulo formado por las asíntotas y la recta trazada aplicando base por altura entre 2."
      ]
},
    "stepByStepExamples": [
      {
            "title": "Problema Canónico UCV (Parcial 2): Descomposición Homográfica y Área de Triángulo Bajo Tangente",
            "problemStatement": "Dada la función homográfica f(x) = (3x + 1)/(x - 2): a) Exprésela en la forma canónica v + k/(x - h); b) Indique sus asíntotas ortogonales y puntos de corte con los ejes; c) Halle la recta tangente en el punto x = 3 y calcule el área del triángulo formado por dicha recta y las dos asíntotas ortogonales.",
            "deductiveSteps": [
                  "Paso 1: Descomposición canónica: Dividimos (3x + 1) entre (x - 2). Reescribimos el numerador: 3x + 1 = 3(x - 2) + 6 + 1 = 3(x - 2) + 7. Dividiendo término a término: f(x) = 3 + 7/(x - 2).",
                  "Paso 2: Asíntotas y parámetro: Asíntota horizontal v = 3; Asíntota vertical h = 2; Parámetro k = 7 > 0 (las ramas se ubican en el cuadrante superior-derecho e inferior-izquierdo respecto a (2, 3)).",
                  "Paso 3: Puntos de corte con los ejes: Con el eje vertical (x = 0): f(0) = (0 + 1)/(0 - 2) = -1/2. Punto: (0, -0.5). Con el eje horizontal (f(x) = 0): 3x + 1 = 0 => x = -1/3. Punto: (-1/3, 0).",
                  "Paso 4: Recta tangente en x = 3: Evaluamos el punto de contacto: f(3) = 3 + 7/(3 - 2) = 3 + 7 = 10. Punto: (3, 10). Derivamos: f'(x) = -7/(x - 2)². En x = 3: f'(3) = -7/(1)² = -7. Ecuación de la recta tangente: y - 10 = -7(x - 3) => y = -7x + 21 + 10 => y = -7x + 31.",
                  "Paso 5: Vértices del triángulo con las asíntotas x = 2 e y = 3: Vértice 1 (intersección de asíntotas): Centro C = (2, 3). Vértice 2 (corte de tangente con asíntota vertical x = 2): y = -7(2) + 31 = -14 + 31 = 17 => P_1 = (2, 17). Vértice 3 (corte de tangente con asíntota horizontal y = 3): 3 = -7x + 31 => 7x = 28 => x = 4 => P_2 = (4, 3).",
                  "Paso 6: Cálculo del área del triángulo rectángulo: Base: b = 4 - 2 = 2 unidades. Altura: h_t = 17 - 3 = 14 unidades. Área = (base * altura) / 2 = (2 * 14) / 2 = 14 unidades cuadradas. Notamos que Área = 2*k = 2(7) = 14, cumpliendo rigurosamente el teorema canónico de Alson."
            ],
            "finalResult": "La descomposición canónica v + k/(x - h) reduce problemas geométricos y de áreas a lecturas directas del parámetro k."
      }
],
    "commonErrorsAlerts": [
      {
            "trap": "Trampa de signos en división",
            "correction": "Restar incorrectamente al completar el numerador: 3(x-2) = 3x - 6, por lo que para obtener +1 hay que sumar +7, no restar 5."
      },
      {
            "trap": "Trampa de cuadrantes en k",
            "correction": "Dibujar las ramas en los cuadrantes I y III cuando k resulta negativo tras la factorización del coeficiente de x."
      }
],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
            {
                  "front": "¿Cómo se deduce inmediatamente la asíntota vertical y horizontal de f(x) = (ax + b)/(cx + d)?",
                  "back": "Asíntota vertical: raíz del denominador x = -d/c. Asíntota horizontal: cociente de coeficientes líderes y = a/c."
            },
            {
                  "front": "¿Cuál es el valor del área del triángulo delimitado por las dos asíntotas y cualquier tangente a la hipérbola y = v + k/(x - h)?",
                  "back": "El área es rigurosamente constante e igual a 2|k| unidades cuadradas, sin importar el punto de tangencia elegido."
            }
      ],
      "cornellSynthesis": {
            "cues": [
                  "Forma v + k/(x-h)",
                  "Asíntotas x=h e y=v",
                  "Cuadrantes según signo de k",
                  "Área Constante 2|k|"
            ],
            "notes": [
                  "1. Dividir para obtener la forma canónica de Alson.",
                  "2. Identificar el centro de simetría (h, v).",
                  "3. Trazar las ramas según el signo de k.",
                  "4. Calcular áreas de triángulos tangentes usando Área = 2|k|."
            ],
            "summary": "Geometría analítica de hipérbolas homográficas, propiedades de invariancia del parámetro k y cálculo de áreas bajo curvas."
      },
      "conceptMapNodes": "Hipérbolas Homográficas\n  ├── Forma General: (ax + b)/(cx + d)\n  ├── Forma Canónica: v + k/(x - h)  [Centro (h, v)]\n  └── Propiedades: Ramas según signo de k | Triángulo tangente de Área = 2|k|"
},
    "generatedQuestions": [
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Forma Canónica de Hipérbolas",
            "tipo": "opcion_multiple",
            "pregunta": "Dada la función homográfica $f(x) = \\frac{4x - 1}{2x + 6}$, ¿cuál es su descomposición canónica en la forma $v + \\frac{k}{x - h}$ y cuáles son sus asíntotas ortogonales?",
            "opciones": [
                  "$f(x) = 2 - \\frac{6.5}{x + 3}$, con asíntota vertical $x = -3$, asíntota horizontal $y = 2$ y $k = -6.5$",
                  "$f(x) = 4 + \\frac{1}{x - 3}$, con asíntota vertical $x = 3$, asíntota horizontal $y = 4$ y $k = 1$",
                  "$f(x) = 2 + \\frac{5}{x + 6}$, con asíntota vertical $x = -6$, asíntota horizontal $y = 2$ y $k = 5$",
                  "$f(x) = -1 + \\frac{2}{x + 3}$, con asíntota vertical $x = 3$, asíntota horizontal $y = -1$ y $k = 2$"
            ],
            "correcta": "$f(x) = 2 - \\frac{6.5}{x + 3}$, con asíntota vertical $x = -3$, asíntota horizontal $y = 2$ y $k = -6.5$",
            "justificacion": "**Concepto Fundamental:** Forma Canónica de Hipérbolas Homográficas.\n\n**Resolución:** Dividimos numerador y denominador: $\\frac{4x - 1}{2(x + 3)} = \\frac{1}{2} \\left[ \\frac{4(x+3) - 13}{x+3} \\right] = \\frac{1}{2} \\left[ 4 - \\frac{13}{x+3} \\right] = 2 - \\frac{6.5}{x+3}$. De aquí: asíntota horizontal $v = 2$, asíntota vertical $h = -3$ y parámetro $k = -6.5 < 0$."
      },
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Cuadrantes y Signo del Parámetro k",
            "tipo": "opcion_multiple",
            "pregunta": "Si en una hipérbola homográfica canónica $y = v + \\frac{k}{x - h}$ el parámetro $k$ resulta estrictamente negativo ($k < 0$), ¿en qué regiones respecto a las asíntotas se ubican sus ramas?",
            "opciones": [
                  "En el cuadrante superior-izquierdo (II) e inferior-derecho (IV) determinados por el cruce de las asíntotas",
                  "En el cuadrante superior-derecho (I) e inferior-izquierdo (III)",
                  "Únicamente en el semiplano superior $y > v$",
                  "La hipérbola se degenera en dos rectas secantes perpendiculares"
            ],
            "correcta": "En el cuadrante superior-izquierdo (II) e inferior-derecho (IV) determinados por el cruce de las asíntotas",
            "justificacion": "**Concepto Fundamental:** Cuadrantes y Signo del Parámetro $k$.\n\n**Resolución:** Cuando $k > 0$, para $x > h$ se tiene $y > v$ (cuadrante I) y para $x < h$ se tiene $y < v$ (cuadrante III). Por el contrario, cuando $k < 0$, si $x > h$ entonces $\\frac{k}{x-h} < 0$, por lo que $y < v$ (cuadrante IV); y si $x < h$, el denominador es negativo, haciendo $\\frac{k}{x-h} > 0$, por lo que $y > v$ (cuadrante II)."
      },
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Área del Triángulo Tangente",
            "tipo": "opcion_multiple",
            "pregunta": "Dada la hipérbola equilátera $y = \\frac{4}{x}$, se traza la recta tangente en el punto $(2, 2)$. ¿Cuál es el área del triángulo delimitado por dicha recta tangente y los dos ejes coordenados (asíntotas)?",
            "opciones": [
                  "Área $= 8\\,\\text{unidades}^2$",
                  "Área $= 4\\,\\text{unidades}^2$",
                  "Área $= 16\\,\\text{unidades}^2$",
                  "Área $= 2\\,\\text{unidades}^2$"
            ],
            "correcta": "Área $= 8\\,\\text{unidades}^2$",
            "justificacion": "**Concepto Fundamental:** Teorema del Área Tangente en Hipérbolas Equiláteras.\n\n**Resolución:** La derivada de $y = \\frac{4}{x}$ es $y' = -\\frac{4}{x^2}$. En $x = 2$, la pendiente es $m = -\\frac{4}{4} = -1$. La ecuación de la recta tangente es $y - 2 = -1(x - 2) \\implies y = -x + 4$. Sus cortes con los ejes coordenados son: con el eje $y$ en $(0, 4)$ (altura $b = 4$) y con el eje $x$ en $(4, 0)$ (base $a = 4$). El área del triángulo rectángulo formado es $\\text{Área} = \\frac{1}{2} \\cdot a \\cdot b = \\frac{1}{2} \\cdot 4 \\cdot 4 = 8\\,\\text{u}^2$ (propiedad constante: $\\text{Área} = 2k = 2(4) = 8$)."
      }
],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG["santiago-mat1-rectas-hiperbolas"],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-mat1-rectas-hiperbolas"]],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-mat1-rectas-hiperbolas"],
  },
  {
    "id": "santiago-mat1-inecuaciones-guide",
    "evaluationEventId": "santiago-mat1-parcial-2",
    "guideMetadata": {
      "title": "Matemática I: Inecuaciones Gráficas, Alfabeto de Transformadas y Módulo",
      "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
      "summary": "Resolución visual de inecuaciones racionales f(x) < g(x), proyección de regiones sobre el eje real y transformadas con valor absoluto exterior |f(x)| e interior f(|x|)."
},
    "phenomenonAndTheory": "El enfoque de Pedro Alson para inecuaciones rechaza la 'tabla del cementerio' o regla de signos ciega. En su lugar, resolver f(x) < g(x) significa responder a la pregunta visual: ¿en qué tramos del eje x la curva f(x) flota por debajo de la curva g(x)? Para inecuaciones racionales como (3x+1)/(x-2) < x, graficamos simultáneamente la hipérbola y la recta diagonal y = x; los puntos de cruce y las asíntotas verticales dividen el eje en intervalos donde la respuesta se lee con certeza absoluta. Asimismo, el alfabeto de transformadas explica cómo el módulo exterior |f(x)| refleja las partes negativas hacia arriba, mientras que el módulo interior f(|x|) borra la mitad izquierda y duplica la derecha de forma par simétrica respecto al eje y.",
    "glossary": [
      {
            "term": "Inecuación Gráfica",
            "symbolOrUnit": "f(x) < g(x)",
            "definition": "Condición geométrica que identifica los intervalos de x donde la gráfica de f está situada a menor altura vertical que la gráfica de g."
      },
      {
            "term": "Módulo Exterior |f(x)|",
            "symbolOrUnit": "y = |f(x)|",
            "definition": "Transformación que refleja especularmente hacia el semiplano positivo y > 0 todos los tramos de la curva que caen por debajo del eje x."
      },
      {
            "term": "Módulo Interior f(|x|)",
            "symbolOrUnit": "y = f(|x|)",
            "definition": "Transformación que descarta la rama de x < 0 y refleja la rama de x >= 0 respecto al eje vertical y, generando simetría par."
      }
],
    "formulasAndStrategies": {
      "coreFormulas": [
            {
                  "name": "Conjunto Solución Geométrico",
                  "latex": "S = \\{x \\in \\mathbb{R} : f(x) < g(x)\\}",
                  "application": "Proyectar sobre el eje x las regiones donde la curva f(x) se encuentra por debajo de g(x)."
            },
            {
                  "name": "Inecuación Modular Simétrica",
                  "latex": "|ax + b| < c \\iff -\\frac{c+b}{a} < x < \\frac{c-b}{a}, \\quad (a > 0)",
                  "application": "Intervalo simétrico centrado en x_0 = -b/a con radio r = c/a."
            },
            {
                  "name": "Alfabeto de Transformadas",
                  "latex": "g(x) = A f(B(x - C)) + D",
                  "application": "D: desplazamiento vertical, C: desplazamiento horizontal, A: escala vertical, B: compresión horizontal."
            }
      ],
      "mnemonicsAndPatterns": [
            "Paso 1: Graficar ambas curvas f(x) y g(x) en el mismo plano cartesiano con trazos nítidos.",
            "Paso 2: Hallar analíticamente los puntos de corte resolviendo f(x) = g(x) y marcar las asíntotas verticales de ambas funciones.",
            "Paso 3: Marcar los valores de corte y discontinuidades en una recta real horizontal como fronteras divisorias.",
            "Paso 4: En cada intervalo, observar directamente qué curva está por arriba y cuál está por abajo.",
            "Paso 5: Sombrear los intervalos que cumplen la desigualdad pedida (respetando extremos abiertos si es < o cerrados si es <=).",
            "Paso 6: Para |f(x)|, doblar hacia arriba lo negativo; para f(|x|), copiar la derecha sobre la izquierda."
      ]
},
    "stepByStepExamples": [
      {
            "title": "Problema Canónico UCV (Parcial 2): Resolución Visual de Inecuación Racional y Módulo",
            "problemStatement": "Resuelva la inecuación racional (3x + 1)/(x - 2) < x utilizando el método gráfico de Pedro Alson. a) Halle analítica y gráficamente los puntos de corte entre la hipérbola y la recta y = x; b) Determine el conjunto solución expresado en unión de intervalos; c) Deduzca el valor de las constantes a > 0 y b para que |ax + b| < 3 tenga por solución el intervalo (-1, 5).",
            "deductiveSteps": [
                  "Paso 1: Definimos las dos curvas: f(x) = (3x + 1)/(x - 2) (hipérbola con asíntota vertical en x = 2 y horizontal en y = 3) y g(x) = x (recta diagonal bisectriz).",
                  "Paso 2: Puntos de corte f(x) = g(x): (3x + 1)/(x - 2) = x => 3x + 1 = x(x - 2) = x² - 2x => x² - 5x - 1 = 0.",
                  "Paso 3: Raíces de la cuadrática: x = [5 ± √(25 - 4(1)(-1))] / 2 = [5 ± √29] / 2. Como √29 ≈ 5.385: x_1 = (5 - 5.385)/2 ≈ -0.193; x_2 = (5 + 5.385)/2 ≈ 5.193.",
                  "Paso 4: Las fronteras en el eje x son x_1 ≈ -0.19, la asíntota vertical x = 2, y x_2 ≈ 5.19. Esto divide el eje en 4 intervalos: (-inf, x_1), (x_1, 2), (2, x_2) y (x_2, +inf).",
                  "Paso 5: Lectura visual de f(x) < g(x) (la hipérbola está por debajo de la recta): En (-inf, x_1): la hipérbola viene de y = 3 y la recta viene de -infinito; por tanto la hipérbola está POR ARRIBA. En (x_1, 2): la recta sube de -0.19 a 2, mientras la hipérbola desciende asintóticamente a -infinito; por tanto la hipérbola está POR DEBAJO (Cumple). En (2, x_2): para x > 2 la hipérbola viene de +infinito (muy alta) y baja hasta tocar la recta en x_2; por tanto la hipérbola está POR ARRIBA. En (x_2, +inf): la hipérbola se aplana hacia y = 3 mientras la recta sigue subiendo indefinidamente; por tanto la hipérbola está POR DEBAJO (Cumple). Conjunto Solución: S = ((5 - √29)/2, 2) U ((5 + √29)/2, +infinito).",
                  "Paso 6: Determinación de parámetros para |ax + b| < 3 con solución (-1, 5): La desigualdad equivale a -3/a - b/a < x < 3/a - b/a. El semiancho del intervalo (-1, 5) es (5 - (-1))/2 = 6/2 = 3. Por tanto: 3/a = 3 => a = 1. El centro del intervalo es (-1 + 5)/2 = 2. Por tanto: -b/a = 2 => -b/1 = 2 => b = -2. Verificamos: |x - 2| < 3 <=> -3 < x - 2 < 3 <=> -1 < x < 5."
            ],
            "finalResult": "El método visual de Alson resuelve inecuaciones racionales complejas inspeccionando posiciones relativas de curvas sin riesgo de errores de signo."
      }
],
    "commonErrorsAlerts": [
      {
            "trap": "Trampa de multiplicar por (x - 2)",
            "correction": "Multiplicar ambos lados de una inecuación por un denominador sin saber si es positivo o negativo invierte incorrectamente el signo."
      },
      {
            "trap": "Trampa de incluir la asíntota vertical",
            "correction": "Colocar corchetes cerrados en la asíntota vertical x = 2; la función nunca existe en sus polos y debe llevar siempre paréntesis abierto."
      }
],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
            {
                  "front": "¿Cuál es el significado geométrico de resolver f(x) < g(x)?",
                  "back": "Hallar todos los intervalos sobre el eje horizontal x donde la curva f(x) se encuentra a menor altura que la curva g(x)."
            },
            {
                  "front": "¿Cómo afecta el valor absoluto exterior |f(x)| a los tramos negativos de una gráfica?",
                  "back": "Los refleja especularmente hacia arriba convirtiendo todas las alturas negativas en positivas y generando vértices en los ceros."
            }
      ],
      "cornellSynthesis": {
            "cues": [
                  "Inecuación f(x) < g(x)",
                  "Puntos de Corte f = g",
                  "Asíntotas como Fronteras",
                  "Módulo Interior vs Exterior"
            ],
            "notes": [
                  "1. Graficar simultáneamente f y g.",
                  "2. Encontrar intersecciones y asíntotas.",
                  "3. Dividir el eje x en intervalos de prueba.",
                  "4. Leer directamente qué curva flota abajo."
            ],
            "summary": "Resolución geométrica de inecuaciones mediante curvas simultáneas y transformadas con módulo."
      },
      "conceptMapNodes": "Inecuaciones Gráficas\n  ├── Lectura Visual: ¿Qué curva flota abajo?\n  ├── Fronteras: Cortes f(x) = g(x) y asíntotas verticales\n  └── Módulos: |f(x)| refleja arriba | f(|x|) duplica derecha con simetría par"
},
    "generatedQuestions": [
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Inecuaciones Gráficas Racionales",
            "tipo": "opcion_multiple",
            "pregunta": "Para resolver la inecuación racional $\\frac{3x + 1}{x - 2} < x$ mediante el método gráfico de Pedro Alson, ¿cuál es el procedimiento visual riguroso?",
            "opciones": [
                  "Graficar simultáneamente la hipérbola $y = \\frac{3x+1}{x-2}$ y la recta $y = x$, hallar los puntos de corte, e identificar los intervalos sobre el eje $x$ donde la curva de la hipérbola está estrictamente por debajo de la recta",
                  "Multiplicar ambos miembros por $(x - 2)$ ignorando el signo del denominador",
                  "Pasar la $x$ a restar y aplicar ciegamente la regla de signos sin verificar la asíntota",
                  "Sustituir únicamente el valor $x = 0$ y generalizar a todo $\\mathbb{R}$"
            ],
            "correcta": "Graficar simultáneamente la hipérbola $y = \\frac{3x+1}{x-2}$ y la recta $y = x$, hallar los puntos de corte, e identificar los intervalos sobre el eje $x$ donde la curva de la hipérbola está estrictamente por debajo de la recta",
            "justificacion": "**Concepto Fundamental:** Inecuaciones Gráficas de Pedro Alson.\n\n**Resolución:** La inecuación $f(x) < g(x)$ significa visualmente: '¿para qué valores de $x$ la curva $f(x)$ flota por debajo de la curva $g(x)$?'. Se trazan la hipérbola homográfica con asíntota vertical en $x = 2$ y la recta diagonal $y = x$. Los cortes se obtienen resolviendo $\\frac{3x+1}{x-2} = x \\implies x^2 - 5x - 1 = 0$, cuyas raíces son $x = \\frac{5 \\pm \\sqrt{29}}{2} \\approx -0.19$ y $5.19$. Analizando los tramos entre las raíces y la discontinuidad en $x = 2$, se leen de inmediato los intervalos solución sin riesgo de error de signos."
      },
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Intervalos Simétricos y Parámetros en Módulos",
            "tipo": "opcion_multiple",
            "pregunta": "Se desea determinar el valor de las constantes $a > 0$ y $b$ para que el conjunto solución de la inecuación modular $|ax + b| < 3$ sea exactamente el intervalo $(-1, 5)$. ¿Cuáles son dichos valores?",
            "opciones": [
                  "$a = 1$, $b = -2$",
                  "$a = 2$, $b = -4$",
                  "$a = 3$, $b = 0$",
                  "$a = 1$, $b = 2$"
            ],
            "correcta": "$a = 1$, $b = -2$",
            "justificacion": "**Concepto Fundamental:** Intervalos Simétricos y Parámetros en Módulos.\n\n**Resolución:** La inecuación $|ax + b| < 3$ equivale a $-3 < ax + b < 3 \\implies \\frac{-3 - b}{a} < x < \\frac{3 - b}{a}$. El centro del intervalo solución es el punto medio $c = \\frac{-1 + 5}{2} = 2$, y el semiancho (radio) es $r = \\frac{5 - (-1)}{2} = 3$. Como el semiancho es $r = \\frac{3}{a} = 3 \\implies a = 1$. El centro es $x_0 = -\\frac{b}{a} = -b = 2 \\implies b = -2$. Verificamos: $|x - 2| < 3 \\iff -1 < x < 5$."
      },
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Transformadas con Valor Absoluto",
            "tipo": "opcion_multiple",
            "pregunta": "Dada la gráfica de una función $f(x)$, ¿cómo se obtiene la gráfica de la transformada con valor absoluto exterior $g(x) = |f(x)|$ y de la transformada con valor absoluto interior $h(x) = f(|x|)$?",
            "opciones": [
                  "Para $|f(x)|$ se reflejan hacia arriba las partes por debajo del eje $x$; para $f(|x|)$ se borra la parte de $x < 0$ y se refleja la de $x \\ge 0$ de forma par simétrica al eje $y$",
                  "En ambas se traslada la curva 2 unidades a la derecha",
                  "Para $|f(x)|$ se invierten los ejes cartesianos, y para $f(|x|)$ se calcula la recíproca",
                  "Para $|f(x)|$ se borra todo excepto los ceros, y para $f(|x|)$ se rota 90 grados"
            ],
            "correcta": "Para $|f(x)|$ se reflejan hacia arriba las partes por debajo del eje $x$; para $f(|x|)$ se borra la parte de $x < 0$ y se refleja la de $x \\ge 0$ de forma par simétrica al eje $y$",
            "justificacion": "**Concepto Fundamental:** Alfabeto de Transformadas con Módulo.\n\n**Resolución:** En $g(x) = |f(x)|$, toda salida negativa se vuelve positiva mediante una reflexión especular respecto al eje horizontal $x$. En $h(x) = f(|x|)$, para $x < 0$ la función toma el valor que tenía en $|x| > 0$, lo que genera una simetría par respecto al eje vertical $y$ duplicando la mitad derecha sobre la izquierda."
      }
],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG["santiago-mat1-inecuaciones"],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-mat1-inecuaciones"]],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-mat1-inecuaciones"],
  },
  {
    "id": "santiago-mat1-limites-derivadas-guide",
    "evaluationEventId": "santiago-mat1-parcial-3",
    "guideMetadata": {
      "title": "Matemática I: Límites Visuales, Continuidad, Recta Tangente y Graficación de f prime (x)",
      "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
      "summary": "Definición geométrica de límites, estudio de discontinuidades, cálculo de pendientes de rectas tangentes, no derivabilidad en puntos angulosos y trazado cualitativo de la función derivada f'(x)."
},
    "phenomenonAndTheory": "El cálculo diferencial de Pedro Alson culmina uniendo la geometría analítica con el concepto dinámico de derivada. Un límite no es una operación algebraica ciega, sino el comportamiento hacia el cual convergen las alturas de la curva cuando x se acerca a un punto de acumulación. La derivada f'(x) en un punto mide exactamente la pendiente m de la recta tangente a la curva en dicho punto. Donde la curva sube, la tangente tiene pendiente positiva y f'(x) flota arriba del eje; donde la curva alcanza un pico o valle suave, la tangente es horizontal y f'(x) corta al eje valiendo cero; y donde la curva baja, f'(x) es negativa. Además, en puntos angulosos o cúspides (como en |x-2| en x = 2), las rectas secantes por la izquierda y la derecha divergen a valores distintos, demostrando formalmente que la función no es derivable a pesar de ser continua.",
    "glossary": [
      {
            "term": "Límite Geométrico",
            "symbolOrUnit": "\\lim_{x \\to x_0} f(x) = L",
            "definition": "Altura vertical L a la cual se aproxima la curva f(x) a medida que x se acerca a x_0 tanto por la izquierda como por la derecha."
      },
      {
            "term": "Derivada (Pendiente de Tangente)",
            "symbolOrUnit": "f'(x_0) = \\lim_{h \\to 0} \\frac{f(x_0 + h) - f(x_0)}{h}",
            "definition": "Razón instantánea de cambio y pendiente geométrica exacta de la recta tangente a la curva en el punto (x_0, f(x_0))."
      },
      {
            "term": "Punto Anguloso",
            "symbolOrUnit": "f'_-(x_0) \\neq f'_+(x_0)",
            "definition": "Punto donde la curva presenta una esquina o vértice; las derivadas laterales existen pero son desiguales, haciendo que la función no sea derivable."
      }
],
    "formulasAndStrategies": {
      "coreFormulas": [
            {
                  "name": "Definición Formal de Derivada",
                  "latex": "f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}",
                  "application": "Calcular la derivada por definición y comprobar existencia de límites laterales en puntos angulosos."
            },
            {
                  "name": "Ecuación de la Recta Tangente",
                  "latex": "y - f(x_0) = f'(x_0)(x - x_0)",
                  "application": "Trazar la recta que mejor se aproxima linealmente a la curva en las inmediaciones del punto (x_0, f(x_0))."
            },
            {
                  "name": "Criterio de Dominancia Asintótica",
                  "latex": "\\lim_{x \\to \\infty} \\frac{x^n}{e^x} = 0, \\quad \\forall n > 0",
                  "application": "Resolver límites al infinito donde compiten polinomios con funciones exponenciales."
            }
      ],
      "mnemonicsAndPatterns": [
            "Paso 1: Para graficar f'(x) a partir de f(x), ubicar primero todos los máximos y mínimos locales suaves de f(x). En ellos f'(x) = 0 (cortes con el eje x).",
            "Paso 2: En los tramos donde f(x) es estrictamente creciente, dibujar f'(x) por encima del eje horizontal (f'(x) > 0).",
            "Paso 3: En los tramos donde f(x) es estrictamente decreciente, dibujar f'(x) por debajo del eje horizontal (f'(x) < 0).",
            "Paso 4: En los puntos de inflexión de f(x) (donde la pendiente es máxima o mínima), dibujar los extremos relativos de f'(x).",
            "Paso 5: En puntos angulosos (esquinas con módulo), marcar una discontinuidad de salto en f'(x) con puntos huecos.",
            "Paso 6: Para límites con exponencial al infinito, identificar el término que crece a mayor velocidad para factorizarlo."
      ]
},
    "stepByStepExamples": [
      {
            "title": "Problema Canónico UCV (Parcial 3): Límite Asintótico Exponencial y No Derivabilidad por Definición",
            "problemStatement": "a) Calcule el límite asintótico lim_{x -> -infinito} (x + 5e^(-x)) / (e^x - 3|x|); b) Demuestre rigurosamente mediante la definición formal de derivada por límites laterales que f(x) = |x - 2| no es derivable en x = 2.",
            "deductiveSteps": [
                  "Paso 1: Cálculo del límite cuando x -> -infinito: Hacemos el cambio de variable u = -x, de modo que cuando x -> -infinito, u -> +infinito. Además, como x es negativo, |x| = -x = u.",
                  "Paso 2: Sustituimos en la expresión: lim_{u -> +infinito} (-u + 5e^u) / (e^(-u) - 3u).",
                  "Paso 3: Identificamos comportamientos al infinito: e^(-u) = 1/e^u -> 0. En el numerador domina 5e^u sobre -u. En el denominador domina -3u sobre e^(-u) que es despreciable.",
                  "Paso 4: Factorizamos el término líder del numerador e^u: lim_{u -> +infinito} [e^u (5 - u/e^u)] / [-3u + e^(-u)]. Como u/e^u -> 0 cuando u -> +infinito, la expresión se comporta como (5e^u) / (-3u) = (-5/3) * (e^u / u). Por la escala de infinitos, e^u crece más rápido que cualquier potencia lineal u, por lo que e^u / u -> +infinito. Multiplicado por (-5/3), el límite diverge a -infinito.",
                  "Paso 5: No derivabilidad de f(x) = |x - 2| en x = 2 por definición: Aplicamos el cociente incremental: f'(2) = lim_{h -> 0} [f(2 + h) - f(2)] / h = lim_{h -> 0} [|(2 + h) - 2| - |2 - 2|] / h = lim_{h -> 0} |h| / h.",
                  "Paso 6: Calculamos los límites laterales: Por la derecha (h -> 0+): como h > 0, |h| = h, luego lim_{h -> 0+} h/h = 1. Por la izquierda (h -> 0-): como h < 0, |h| = -h, luego lim_{h -> 0-} (-h)/h = -1. Como el límite lateral derecho (1) no coincide con el límite lateral izquierdo (-1), el límite global del cociente incremental NO EXISTE. Conclusión: f(x) no es derivable en x = 2 y presenta un punto anguloso."
            ],
            "finalResult": "La derivada exige convergencia unívoca de las secantes; un cambio brusco de pendiente genera un punto anguloso no derivable."
      }
],
    "commonErrorsAlerts": [
      {
            "trap": "Trampa de límites laterales en derivadas",
            "correction": "Afirmar que f(x) = |x-2| es derivable en x = 2 porque la función es continua; la continuidad es condición necesaria pero no suficiente."
      },
      {
            "trap": "Trampa del valor absoluto en límites al infinito negativo",
            "correction": "Olvidar que cuando x -> -infinito, |x| = -x (no +x), falseando el signo de todo el denominador."
      }
],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
            {
                  "front": "¿Por qué la función f(x) = |x - 2| no es derivable en x = 2 a pesar de ser continua?",
                  "back": "Porque las derivadas laterales son distintas: por la derecha vale +1 y por la izquierda vale -1; el cociente incremental no converge a un límite único."
            },
            {
                  "front": "¿Dónde corta al eje horizontal la función derivada f'(x) al graficarla a partir de f(x)?",
                  "back": "Exactamente en aquellos puntos donde la función original f(x) presenta tangentes horizontales (máximos y mínimos relativos suaves)."
            }
      ],
      "cornellSynthesis": {
            "cues": [
                  "Cociente Incremental",
                  "Derivadas Laterales",
                  "Punto Anguloso",
                  "Graficación Cualitativa f'"
            ],
            "notes": [
                  "1. f'(x) mide la pendiente de la recta tangente.",
                  "2. En extremos suaves de f, f'(x) = 0.",
                  "3. Donde f sube f' > 0; donde f baja f' < 0.",
                  "4. Esquinas generan saltos en f'."
            ],
            "summary": "Interpretación geométrica de límites, cálculo de tangentes y reconstrucción cualitativa de la función derivada f'(x)."
      },
      "conceptMapNodes": "Límites y Derivadas\n  ├── Límites: Comportamiento local y asintótico\n  ├── Derivada: Pendiente instantánea de la recta tangente\n  └── Trazado de f': Ceros en extremos suaves | Signo según monotonía de f"
},
    "generatedQuestions": [
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Derivabilidad y Límites Laterales",
            "tipo": "opcion_multiple",
            "pregunta": "Utilizando la definición formal de derivada mediante el límite del cociente incremental, ¿por qué la función $f(x) = |x - 2|$ no es derivable en $x = 2$ a pesar de ser continua?",
            "opciones": [
                  "Porque los límites laterales del cociente incremental son distintos: por la derecha vale $+1$ y por la izquierda vale $-1$, haciendo que no exista la derivada única (punto anguloso)",
                  "Porque la función no está definida en $x = 2$",
                  "Porque la función se hace infinita en $x = 2$",
                  "Porque la pendiente de la recta secante es cero en todo punto"
            ],
            "correcta": "Porque los límites laterales del cociente incremental son distintos: por la derecha vale $+1$ y por la izquierda vale $-1$, haciendo que no exista la derivada única (punto anguloso)",
            "justificacion": "**Concepto Fundamental:** Derivabilidad y Límites Laterales del Cociente Incremental.\n\n**Resolución:** Evaluamos $f'(2) = \\lim_{h\\to 0} \\frac{f(2+h) - f(2)}{h} = \\lim_{h\\to 0} \\frac{|(2+h)-2| - 0}{h} = \\lim_{h\\to 0} \\frac{|h|}{h}$. Si $h \\to 0^+$, $|h| = h$, luego $\\lim_{h\\to 0^+} \\frac{h}{h} = 1$. Si $h \\to 0^-$, $|h| = -h$, luego $\\lim_{h\\to 0^-} \\frac{-h}{h} = -1$. Al no coincidir los límites laterales, el límite global no existe y la curva presenta un vértice o punto anguloso en $(2, 0)$."
      },
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Límites Asintóticos con Exponenciales",
            "tipo": "opcion_multiple",
            "pregunta": "En el Parcial 3 de Matemática I se pide calcular el límite asintótico $\\lim_{x\\to -\\infty} \\frac{x + 5e^{-x}}{e^x - 3|x|}$. ¿Cuál es el comportamiento asintótico analítico correcto?",
            "opciones": [
                  "Diverge a $-\\infty$, dominado en el numerador por la exponencial $5e^{-x}$ que crece más rápido que la potencia lineal del denominador",
                  "El límite vale $-\\frac{5}{3}$ por la regla de los coeficientes principales",
                  "El límite vale $0$ porque la exponencial siempre anula a las potencias",
                  "El límite no existe por oscilación periódica"
            ],
            "correcta": "Diverge a $-\\infty$, dominado en el numerador por la exponencial $5e^{-x}$ que crece más rápido que la potencia lineal del denominador",
            "justificacion": "**Concepto Fundamental:** Límites al Infinito con Exponenciales y Dominancia.\n\n**Resolución:** Cuando $x \\to -\\infty$, sea $u = -x \\to +\\infty$. Entonces $|x| = -x = u$. En el numerador tenemos $-u + 5e^u \\approx 5e^u$. En el denominador tenemos $e^{-u} - 3u \\approx -3u$ (ya que $e^{-u} \\to 0$). El cociente se comporta asintóticamente como $\\frac{5e^u}{-3u} = -\\frac{5}{3} \\frac{e^u}{u}$. Como la función exponencial $e^u$ crece asintóticamente mucho más rápido que el polinomio lineal $u$, el cociente $\\frac{e^u}{u} \\to +\\infty$, haciendo que la expresión diverja a $-\\infty$."
      },
      {
            "area": "Matemática I · Cátedra Pedro Alson (UCV Ciencias)",
            "tema": "Trazado Cualitativo de f prime",
            "tipo": "opcion_multiple",
            "pregunta": "Dada la gráfica continua de una función $f(x)$ que presenta un máximo local suave en $x = -2$, un punto de corte con pendiente $-3$ en $x = 0$, y un mínimo local suave en $x = 4$, ¿cuáles son los valores obligatorios de la función derivada $f'(x)$ en dichos puntos?",
            "opciones": [
                  "$f'(-2) = 0$, $f'(0) = -3$ y $f'(4) = 0$, con $f'(x) < 0$ para todo $x \\in (-2, 4)$",
                  "$f'(-2) = -2$, $f'(0) = 0$ y $f'(4) = 4$",
                  "$f'(-2) = 1$, $f'(0) = 0$ y $f'(4) = -1$",
                  "La derivada vale cero en los tres puntos por ser continua"
            ],
            "correcta": "$f'(-2) = 0$, $f'(0) = -3$ y $f'(4) = 0$, con $f'(x) < 0$ para todo $x \\in (-2, 4)$",
            "justificacion": "**Concepto Fundamental:** Trazado Cualitativo de la Función Derivada.\n\n**Resolución:** En cualquier extremo local suave (máximo o mínimo relativo), la recta tangente a la curva es perfectamente horizontal, lo que exige que la pendiente instantánea sea cero: $f'(-2) = 0$ y $f'(4) = 0$. Entre $x = -2$ y $x = 4$ la función desciende continuamente, lo que requiere que las tangentes tengan pendiente negativa ($f'(x) < 0$). En $x = 0$, la pendiente dada es $-3$, por lo que la curva derivada pasa por el punto $(0, -3)$."
      }
],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG["santiago-mat1-limites-derivadas"],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-mat1-limites-derivadas"]],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-mat1-limites-derivadas"],
  }
];
