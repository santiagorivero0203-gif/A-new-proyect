/**
 * @file santiago_fisica1.ts
 * @description Guías Académicas Deconstruidas Oficiales (7 Pilares) para SANTIAGO_FISICA1_GUIDES.
 * Formato canónico riguroso compatible con DeconstructedAcademicGuide.
 */

import type { DeconstructedAcademicGuide } from '../../types/deconstruction.types';
import { SANTIAGO_MULTIMEDIA_CATALOG } from '../santiago_multimedia';
import { SANTIAGO_RESEARCH_PROMPTS } from '../santiago_prompts';

export const SANTIAGO_FISICA1_GUIDES: DeconstructedAcademicGuide[] = [
  {
    "id": "santiago-fis1-kinematics-guide",
    "evaluationEventId": "santiago-fis1-parcial-1",
    "guideMetadata": {
      "title": "Física I: Cinemática Vectorial, Componentes Intrínsecas y Tiro Parabólico",
      "area": "Física I · Escuela de Física (UCV Ciencias)",
      "summary": "Vectores de posición, velocidad y aceleración en el espacio euclidiano, descomposición en dirección tangente y centrípeta, radio de curvatura y tiro parabólico con análisis paramétrico."
    },
    "phenomenonAndTheory": "La cinemática describe matemáticamente el movimiento espacial de los cuerpos sin atender a las fuerzas que lo originan. En la física universitaria de la UCV, el movimiento se modela mediante el vector de posición r(t) en tres dimensiones. La velocidad instantánea v(t) es la primera derivada temporal del vector de posición y es siempre tangente a la trayectoria curva recorrida. La aceleración a(t) es la derivada de la velocidad. Para entender físicamente qué le ocurre a la partícula en cada instante, descomponemos el vector aceleración en sus direcciones intrínsecas: la aceleración tangencial a_t (alineada con la velocidad, responsable exclusiva de aumentar o disminuir la rapidez numérica) y la aceleración normal o centrípeta a_n (perpendicular a la velocidad hacia el centro de curvatura, responsable exclusiva de doblar la dirección del vector de movimiento).",
    "glossary": [
      {
        "term": "Vector de Posición r(t)",
        "definition": "Vector espacial que localiza la posición puntual del cuerpo respecto a un sistema de coordenadas inercial en cada instante de tiempo t.",
        "symbolOrUnit": "r(t) = x(t) i + y(t) j + z(t) k [m]"
      },
      {
        "term": "Vector Velocidad v(t)",
        "definition": "Razón instantánea de cambio del vector posición con el tiempo, siempre colineal a la recta tangente de la trayectoria.",
        "symbolOrUnit": "v(t) = dr / dt [m/s]"
      },
      {
        "term": "Aceleración Tangencial (a_t)",
        "definition": "Componente escalar de la aceleración paralela a la velocidad, que mide cómo cambia la rapidez (módulo de la velocidad) con el tiempo.",
        "symbolOrUnit": "a_t = d|v| / dt [m/s²]"
      },
      {
        "term": "Aceleración Normal o Centrípeta (a_n)",
        "definition": "Componente ortogonal de la aceleración dirigida hacia el centro instantáneo de curvatura, que mide la tasa de giro del vector velocidad.",
        "symbolOrUnit": "a_n = |v|² / rho [m/s²]"
      },
      {
        "term": "Radio de Curvatura (rho)",
        "definition": "Radio del círculo osculador que mejor se adapta a la curva geométrica en un punto dado de la trayectoria espacial.",
        "symbolOrUnit": "rho = |v|² / a_n [m]"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Vector de Posición r(t)",
          "latex": "r(t) = x(t) i + y(t) j + z(t) k [m]",
          "application": "Vector espacial que localiza la posición puntual del cuerpo respecto a un sistema de coordenadas inercial en cada instante de tiempo t."
        },
        {
          "name": "Vector Velocidad v(t)",
          "latex": "v(t) = dr / dt [m/s]",
          "application": "Razón instantánea de cambio del vector posición con el tiempo, siempre colineal a la recta tangente de la trayectoria."
        },
        {
          "name": "Aceleración Tangencial (a_t)",
          "latex": "a_t = d|v| / dt [m/s²]",
          "application": "Componente escalar de la aceleración paralela a la velocidad, que mide cómo cambia la rapidez (módulo de la velocidad) con el tiempo."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Escribir las ecuaciones paramétricas del vector de posición r(t) identificando sus componentes cartesianas x(t), y(t), z(t).",
        "Paso 2: Derivar r(t) respecto al tiempo para obtener el vector velocidad instantánea v(t) y calcular su rapidez escalar calculando su módulo euclidiano.",
        "Paso 3: Derivar v(t) respecto al tiempo para obtener el vector aceleración total instantánea a(t) y calcular su módulo.",
        "Paso 4: Calcular la aceleración tangencial mediante el producto escalar a_t = (v * a) / |v| o derivando directamente la rapidez.",
        "Paso 5: Calcular la aceleración normal aplicando el teorema de Pitágoras intrínseco: a_n = sqrt(|a|² - a_t²).",
        "Paso 6: Determinar el radio de curvatura local despejando rho = |v|² / a_n.",
        "Regla 1: El vector velocidad instantánea siempre es rigurosamente tangente a la curva en cualquier punto del espacio.",
        "Regla 2: El vector aceleración siempre apunta hacia el lado cóncavo interior de la curva de movimiento.",
        "Regla 3: Si la aceleración tangencial y la velocidad tienen el mismo sentido, la rapidez aumenta; si tienen sentidos opuestos, la rapidez disminuye.",
        "Regla 4: En un movimiento rectilíneo la aceleración normal es estrictamente cero (el radio de curvatura tiende a infinito)."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: Una partícula en el plano vertical describe un movimien...",
        "problemStatement": "Una partícula en el plano vertical describe un movimiento paramétrico dado por r(t) = (6 t) i + (20 t - 5 t²) j en unidades del SI (t en segundos, r en metros). Para el instante t = 2.0 s: a) Calcule los vectores velocidad v(2) y aceleración a(2); b) Determine la aceleración tangencial a_t y la aceleración normal a_n; c) Calcule el radio de curvatura rho de la trayectoria en dicho punto.",
        "deductiveSteps": [
          "Paso 1: Obtenemos el vector velocidad derivando el vector posición componente a componente: v_x(t) = d(6 t)/dt = 6 m/s; v_y(t) = d(20 t - 5 t²)/dt = 20 - 10 t m/s. Vector velocidad: v(t) = 6 i + (20 - 10 t) j.",
          "Paso 2: Evaluamos en t = 2.0 s: v_x(2) = 6 m/s; v_y(2) = 20 - 10*(2) = 0 m/s. Vector velocidad instantánea: v(2) = 6 i + 0 j m/s. La rapidez de la partícula es exactamente |v(2)| = 6.0 m/s (en la cúspide parabólica, donde la velocidad vertical es cero).",
          "Paso 3: Obtenemos el vector aceleración derivando la velocidad: a_x(t) = d(6)/dt = 0; a_y(t) = d(20 - 10 t)/dt = -10 m/s². Vector aceleración total: a(t) = 0 i - 10 j m/s² constante en todo instante. Módulo |a(2)| = 10.0 m/s² apuntando hacia abajo.",
          "Paso 4: Calculamos la aceleración tangencial mediante el producto escalar: a_t = (v * a) / |v| = (6*0 + 0*(-10)) / 6 = 0 / 6 = 0 m/s². Como la rapidez está en su valor mínimo local en la cúspide, su derivada es nula: a_t = 0 m/s².",
          "Paso 5: Calculamos la aceleración normal: a_n = sqrt(|a|² - a_t²) = sqrt(10² - 0²) = 10.0 m/s². En la cúspide del tiro parabólico, toda la aceleración gravitatoria actúa de forma estrictamente perpendicular a la velocidad.",
          "Paso 6: Calculamos el radio de curvatura en la cúspide: rho = |v|² / a_n = (6.0 m/s)² / (10.0 m/s²) = 36 / 10 = 3.6 metros."
        ],
        "finalResult": "La aceleración tangencial mide cómo cambia la rapidez y la normal mide cómo se dobla la trayectoria en el espacio."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 1 UCV",
        "correction": "Preguntar si es posible que un cuerpo tenga aceleración constante distinta de cero y rapidez constante. Falso: si tiene rapidez constante en curva, la aceleración centrípeta cambia continuamente de dirección en el espacio."
      },
      {
        "trap": "Trampa del producto escalar",
        "correction": "Calcular a_t sin dividir entre el módulo de la velocidad, olvidando que a_t es una magnitud escalar."
      },
      {
        "trap": "Trampa de componentes en tiro parabólico",
        "correction": "Olvidar que la aceleración en el eje horizontal x es estrictamente nula durante todo el vuelo."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Confundir el módulo de la aceleración |a| con la aceleración tangencial a_t: |a| incluye el efecto de giro de la curva."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Calcular el radio de curvatura usando |v| en vez de |v| al cuadrado."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Olvidar que en la cúspide de un proyectil la rapidez no es cero, sino que es igual a la componente horizontal v_x."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Vector de Posición r(t)?",
          "back": "Vector espacial que localiza la posición puntual del cuerpo respecto a un sistema de coordenadas inercial en cada instante de tiempo t. (Notación: r(t) = x(t) i + y(t) j + z(t) k [m])"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Vector Velocidad v(t)?",
          "back": "Razón instantánea de cambio del vector posición con el tiempo, siempre colineal a la recta tangente de la trayectoria. (Notación: v(t) = dr / dt [m/s])"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Aceleración Tangencial (a_t)?",
          "back": "Componente escalar de la aceleración paralela a la velocidad, que mide cómo cambia la rapidez (módulo de la velocidad) con el tiempo. (Notación: a_t = d|v| / dt [m/s²])"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Aceleración Normal o Centrípeta (a_n)?",
          "back": "Componente ortogonal de la aceleración dirigida hacia el centro instantáneo de curvatura, que mide la tasa de giro del vector velocidad. (Notación: a_n = |v|² / rho [m/s²])"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Radio de Curvatura (rho)?",
          "back": "Radio del círculo osculador que mejor se adapta a la curva geométrica en un punto dado de la trayectoria espacial. (Notación: rho = |v|² / a_n [m])"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Vector de Posición r(t)",
          "Vector Velocidad v(t)",
          "Aceleración Tangencial (a_t)",
          "Aceleración Normal o Centrípeta (a_n)",
          "Radio de Curvatura (rho)"
        ],
        "notes": [
          "Paso 1: Escribir las ecuaciones paramétricas del vector de posición r(t) identificando sus componentes cartesianas x(t), y(t), z(t).",
          "Paso 2: Derivar r(t) respecto al tiempo para obtener el vector velocidad instantánea v(t) y calcular su rapidez escalar calculando su módulo euclidiano.",
          "Paso 3: Derivar v(t) respecto al tiempo para obtener el vector aceleración total instantánea a(t) y calcular su módulo.",
          "Paso 4: Calcular la aceleración tangencial mediante el producto escalar a_t = (v * a) / |v| o derivando directamente la rapidez.",
          "Paso 5: Calcular la aceleración normal aplicando el teorema de Pitágoras intrínseco: a_n = sqrt(|a|² - a_t²)."
        ],
        "summary": "Vectores de posición, velocidad y aceleración en el espacio euclidiano, descomposición en dirección tangente y centrípeta, radio de curvatura y tiro parabólico con análisis paramétrico."
      },
      "conceptMapNodes": "Física I: Cinemática Vectorial, Componentes Intrínsecas y Tiro Parabólico\n  ├── Fundamento: Física I · Escuela de Física (UCV Ciencias)\n  ├── Ecuaciones: Vector de Posición r(t), Vector Velocidad v(t), Aceleración Tangencial (a_t)\n  └── Protocolo: Paso 1: Escribir las ecuaciones paramétricas del vector de posición r(t) identificando sus componentes cartesianas x(t), y(t), z(t). -> Paso 2: Derivar r(t) respecto al tiempo para obtener el vector velocidad instantánea v(t) y calcular su rapidez escalar calculando su módulo euclidiano. -> Paso 3: Derivar v(t) respecto al tiempo para obtener el vector aceleración total instantánea a(t) y calcular su módulo."
    },
    "generatedQuestions": [
      {
        "area": "Física I · Escuela de Física (UCV Ciencias)",
        "tema": "Física I: Cinemática Vectorial, Componentes Intrínsecas y Tiro Parabólico",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Física I: Cinemática Vectorial, Componentes Intrínsecas y Tiro Parabólico?",
        "opciones": [
          "Vectores de posición, velocidad y aceleración en el espacio euclidiano, descomposición en dirección ",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Vectores de posición, velocidad y aceleración en el espacio euclidiano, descomposición en dirección ",
        "justificacion": "**Concepto Fundamental:** Física I: Cinemática Vectorial, Componentes Intrínsecas y Tiro Parabólico\n\n**Resolución Directa:** La cinemática describe matemáticamente el movimiento espacial de los cuerpos sin atender a las fuerzas que lo originan. En la física universitaria de la UCV, el movimiento se model..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-kinematics'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-lab1-airtrack']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-lab1-airtrack'],
  },
  {
    "id": "santiago-fis1-dynamics-guide",
    "evaluationEventId": "santiago-fis1-parcial-2",
    "guideMetadata": {
      "title": "Física I: Leyes de Newton, Diagramas de Cuerpo Libre, Fricción y Dinámica Circular",
      "area": "Física I · Escuela de Física (UCV Ciencias)",
      "summary": "Aislamiento formal de cuerpos mediante DCL, leyes del rozamiento estático y cinético, sistemas de partículas acopladas mediante cuerdas ideales y análisis dinámico de curvas con peralte."
    },
    "phenomenonAndTheory": "La dinámica clásica newtoniana explica las causas del movimiento mediante el concepto de fuerza como interacción física entre cuerpos. La Primera Ley establece que en un sistema de referencia inercial todo cuerpo permanece en reposo o MRU a menos que una fuerza neta externa actúe sobre él. La Segunda Ley formula la ecuación diferencial fundamental del movimiento: la fuerza neta vectorial equivale al producto de la masa por el vector aceleración (sumatoria F = m * a). La Tercera Ley establece el principio de acción y reacción: toda fuerza que ejerce el cuerpo A sobre el B engendra una fuerza instantánea de igual magnitud y dirección opuesta que B ejerce sobre A (aplicadas siempre sobre cuerpos distintos). En problemas universitarios de planos inclinados y poleas con fricción, el Diagrama de Cuerpo Libre (DCL) es la herramienta arquitectónica insustituible para aislar cada masa y proyectar las fuerzas en ejes alineados con la aceleración.",
    "glossary": [
      {
        "term": "Diagrama de Cuerpo Libre (DCL)",
        "definition": "Esquema gráfico vectorial donde se aísla físicamente un cuerpo del sistema y se dibujan exclusivamente las fuerzas reales externas que actúan directamente sobre él.",
        "symbolOrUnit": "Aislamiento de fuerzas"
      },
      {
        "term": "Fuerza Normal (N)",
        "definition": "Fuerza perpendicular de contacto que una superficie ejerce sobre un cuerpo apoyado en ella para evitar que la penetre.",
        "symbolOrUnit": "Perpendicular a la superficie"
      },
      {
        "term": "Fuerza de Fricción Estática (f_s)",
        "definition": "Fuerza de rozamiento tangencial que impide el inicio del deslizamiento relativo entre superficies secas en reposo.",
        "symbolOrUnit": "f_s <= mu_s * N"
      },
      {
        "term": "Fuerza de Fricción Cinética (f_k)",
        "definition": "Fuerza de rozamiento constante que se opone activamente al movimiento de deslizamiento relativo una vez iniciado.",
        "symbolOrUnit": "f_k = mu_k * N"
      },
      {
        "term": "Fuerza Centrípeta",
        "definition": "Fuerza neta resultante dirigida hacia el centro de la trayectoria en una curva circular que genera la aceleración centrípeta requerida para doblar.",
        "symbolOrUnit": "sum F_c = m * v² / R"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Diagrama de Cuerpo Libre (DCL)",
          "latex": "Aislamiento de fuerzas",
          "application": "Esquema gráfico vectorial donde se aísla físicamente un cuerpo del sistema y se dibujan exclusivamente las fuerzas reales externas que actúan directamente sobre él."
        },
        {
          "name": "Fuerza Normal (N)",
          "latex": "Perpendicular a la superficie",
          "application": "Fuerza perpendicular de contacto que una superficie ejerce sobre un cuerpo apoyado en ella para evitar que la penetre."
        },
        {
          "name": "Fuerza de Fricción Estática (f_s)",
          "latex": "f_s <= mu_s * N",
          "application": "Fuerza de rozamiento tangencial que impide el inicio del deslizamiento relativo entre superficies secas en reposo."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Identificar todos los cuerpos del sistema y separarlos dibujando un Diagrama de Cuerpo Libre independiente para cada masa.",
        "Paso 2: En cada DCL dibujar las fuerzas reales: peso (m*g vertical hacia abajo), normales de contacto (perpendiculares a las superficies), tensiones (a lo largo de las cuerdas saliendo del cuerpo) y fuerzas de fricción.",
        "Paso 3: Elegir un sistema de coordenadas cartesiano ortogonal para cada cuerpo orientando preferentemente el eje x en el sentido predicho de la aceleración del bloque.",
        "Paso 4: Descomponer las fuerzas oblicuas (como el peso en un plano inclinado: m*g*sen(theta) paralelo y m*g*cos(theta) perpendicular).",
        "Paso 5: Escribir las ecuaciones escalares de Newton: sumatoria F_y = 0 (en el eje sin movimiento) para despejar la normal N, y sumatoria F_x = m*a (en el eje con movimiento).",
        "Paso 6: Combinar las ecuaciones de los distintos cuerpos utilizando las ligaduras geométricas (misma aceleración si están conectados por cuerda inextensible) para despejar la aceleración y las tensiones.",
        "Regla 1: Un DCL solo puede contener fuerzas externas reales transmitidas por contacto físico directo o por gravedad a distancia.",
        "Regla 2: El par de acción y reacción de la Tercera Ley de Newton jamás puede actuar sobre el mismo cuerpo ni sumarse en el mismo DCL.",
        "Regla 3: Si un sistema está en reposo estático, la fuerza de fricción f_s solo toma el valor exacto necesario para equilibrar las fuerzas aplicadas, sin superar mu_s * N.",
        "Regla 4: Para poleas ideales sin masa ni fricción, la tensión de la cuerda es exactamente idéntica a ambos lados de la polea."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: En el laboratorio de Mecánica de la UCV, un bloque de m...",
        "problemStatement": "En el laboratorio de Mecánica de la UCV, un bloque de masa m1 = 4.0 kg descansa sobre un plano inclinado theta = 30° con coeficientes de fricción mu_s = 0.35 y mu_k = 0.25. El bloque está conectado mediante una cuerda ideal ligera que pasa por una polea sin fricción a un cuerpo suspendido de masa m2 = 5.0 kg que cuelga verticalmente. Sabiendo que g = 9.8 m/s²: a) Dibuje el DCL de cada masa; b) Verifique si el sistema se pone en movimiento y en qué sentido; c) Calcule la aceleración del sistema a y la tensión T de la cuerda.",
        "deductiveSteps": [
          "Paso 1: Dibujamos el DCL de m1 en el plano inclinado: orientamos el eje x subiendo por el plano y el eje y perpendicular saliendo del plano. Fuerzas sobre m1: Peso P1 = m1*g (descompuesto en P1x = m1*g*sen(30°) bajando el plano y P1y = m1*g*cos(30°) aplastando el plano), Fuerza Normal N1 perpendicular hacia arriba, Tensión T subiendo por el plano, y Fuerza de Fricción f.",
          "Paso 2: Dibujamos el DCL de m2 suspendido: orientamos el eje y bajando verticalmente (sentido del movimiento solidario con la subida de m1). Fuerzas sobre m2: Peso P2 = m2*g hacia abajo, Tensión T hacia arriba.",
          "Paso 3: En el eje perpendicular de m1: sum F_y = N1 - m1*g*cos(30°) = 0 => N1 = 4.0 kg * 9.8 m/s² * cos(30°) = 39.2 * 0.8660 = 33.95 N.",
          "Paso 4: Verificamos si se vence la fricción estática: la fuerza impulsora neta sin fricción que intenta subir el plano es el peso de m2 menos la componente del peso de m1: F_impulsora = m2*g - m1*g*sen(30°) = 5.0*9.8 - 4.0*9.8*0.50 = 49.0 - 19.6 = 29.4 N. La fuerza de fricción estática máxima que se opone es: f_s_max = mu_s * N1 = 0.35 * 33.95 N = 11.88 N. Como 29.4 N > 11.88 N, el sistema rompe el reposo y desliza subiendo por el plano inclinado.",
          "Paso 5: Al estar en movimiento, actúa la fricción cinética f_k opuesta a la subida (apuntando hacia abajo del plano): f_k = mu_k * N1 = 0.25 * 33.95 N = 8.49 N.",
          "Paso 6: Planteamos las ecuaciones de movimiento dinámico acopladas (sum F = m*a): Para m1 subiendo el plano: T - m1*g*sen(30°) - f_k = m1 * a => T - 19.6 - 8.49 = 4.0 * a => T - 28.09 = 4.0 * a (Ecuación 1). Para m2 cayendo verticalmente: m2*g - T = m2 * a => 49.0 - T = 5.0 * a (Ecuación 2).",
          "Paso 7: Sumamos ambas ecuaciones eliminando algebraicamente la tensión T: (T - 28.09) + (49.0 - T) = (4.0 + 5.0) * a => 20.91 = 9.0 * a => a = 20.91 / 9.0 = 2.32 m/s².",
          "Paso 8: Sustituimos la aceleración en la Ecuación 2 para hallar la tensión de la cuerda: T = 49.0 - 5.0 * (2.32) = 49.0 - 11.6 = 37.4 N."
        ],
        "finalResult": "El secreto de la dinámica newtoniana es aislar cada masa con un DCL limpio y sumar las ecuaciones para cancelar las tensiones internas."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 2 UCV",
        "correction": "Usar el coeficiente estático mu_s para calcular la aceleración del cuerpo una vez que ya se está moviendo. Una vez roto el reposo, se usa exclusivamente el coeficiente cinético mu_k."
      },
      {
        "trap": "Trampa del plano inclinado",
        "correction": "Confundir sen(theta) y cos(theta) al descomponer el peso, asignando seno a la normal."
      },
      {
        "trap": "Trampa de la fuerza centrípeta",
        "correction": "Dibujar una fuerza adicional llamada fuerza centrípeta en el DCL. La fuerza centrípeta es la resultante neta de las fuerzas reales (tensión, fricción o normal), no una fuerza extra."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Dibujar la fuerza de fricción en el mismo sentido del movimiento: la fricción siempre se opone al deslizamiento relativo entre las superficies en contacto."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Asumir que la fuerza normal es siempre igual a m*g: en un plano inclinado N = m*g*cos(theta), y si hay fuerzas aplicadas oblicuas cambia sustancialmente."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Incluir pares de acción y reacción en el mismo cuerpo: la normal de la mesa sobre el bloque no es la reacción al peso del bloque (la reacción al peso actúa en el centro de la Tierra)."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Diagrama de Cuerpo Libre (DCL)?",
          "back": "Esquema gráfico vectorial donde se aísla físicamente un cuerpo del sistema y se dibujan exclusivamente las fuerzas reales externas que actúan directamente sobre él. (Notación: Aislamiento de fuerzas)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Fuerza Normal (N)?",
          "back": "Fuerza perpendicular de contacto que una superficie ejerce sobre un cuerpo apoyado en ella para evitar que la penetre. (Notación: Perpendicular a la superficie)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Fuerza de Fricción Estática (f_s)?",
          "back": "Fuerza de rozamiento tangencial que impide el inicio del deslizamiento relativo entre superficies secas en reposo. (Notación: f_s <= mu_s * N)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Fuerza de Fricción Cinética (f_k)?",
          "back": "Fuerza de rozamiento constante que se opone activamente al movimiento de deslizamiento relativo una vez iniciado. (Notación: f_k = mu_k * N)"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Fuerza Centrípeta?",
          "back": "Fuerza neta resultante dirigida hacia el centro de la trayectoria en una curva circular que genera la aceleración centrípeta requerida para doblar. (Notación: sum F_c = m * v² / R)"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Diagrama de Cuerpo Libre (DCL)",
          "Fuerza Normal (N)",
          "Fuerza de Fricción Estática (f_s)",
          "Fuerza de Fricción Cinética (f_k)",
          "Fuerza Centrípeta"
        ],
        "notes": [
          "Paso 1: Identificar todos los cuerpos del sistema y separarlos dibujando un Diagrama de Cuerpo Libre independiente para cada masa.",
          "Paso 2: En cada DCL dibujar las fuerzas reales: peso (m*g vertical hacia abajo), normales de contacto (perpendiculares a las superficies), tensiones (a lo largo de las cuerdas saliendo del cuerpo) y fuerzas de fricción.",
          "Paso 3: Elegir un sistema de coordenadas cartesiano ortogonal para cada cuerpo orientando preferentemente el eje x en el sentido predicho de la aceleración del bloque.",
          "Paso 4: Descomponer las fuerzas oblicuas (como el peso en un plano inclinado: m*g*sen(theta) paralelo y m*g*cos(theta) perpendicular).",
          "Paso 5: Escribir las ecuaciones escalares de Newton: sumatoria F_y = 0 (en el eje sin movimiento) para despejar la normal N, y sumatoria F_x = m*a (en el eje con movimiento)."
        ],
        "summary": "Aislamiento formal de cuerpos mediante DCL, leyes del rozamiento estático y cinético, sistemas de partículas acopladas mediante cuerdas ideales y análisis dinámico de curvas con peralte."
      },
      "conceptMapNodes": "Física I: Leyes de Newton, Diagramas de Cuerpo Libre, Fricción y Dinámica Circular\n  ├── Fundamento: Física I · Escuela de Física (UCV Ciencias)\n  ├── Ecuaciones: Diagrama de Cuerpo Libre (DCL), Fuerza Normal (N), Fuerza de Fricción Estática (f_s)\n  └── Protocolo: Paso 1: Identificar todos los cuerpos del sistema y separarlos dibujando un Diagrama de Cuerpo Libre independiente para cada masa. -> Paso 2: En cada DCL dibujar las fuerzas reales: peso (m*g vertical hacia abajo), normales de contacto (perpendiculares a las superficies), tensiones (a lo largo de las cuerdas saliendo del cuerpo) y fuerzas de fricción. -> Paso 3: Elegir un sistema de coordenadas cartesiano ortogonal para cada cuerpo orientando preferentemente el eje x en el sentido predicho de la aceleración del bloque."
    },
    "generatedQuestions": [
      {
        "area": "Física I · Escuela de Física (UCV Ciencias)",
        "tema": "Física I: Leyes de Newton, Diagramas de Cuerpo Libre, Fricción y Dinámica Circular",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Física I: Leyes de Newton, Diagramas de Cuerpo Libre, Fricción y Dinámica Circular?",
        "opciones": [
          "Aislamiento formal de cuerpos mediante DCL, leyes del rozamiento estático y cinético, sistemas de pa",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Aislamiento formal de cuerpos mediante DCL, leyes del rozamiento estático y cinético, sistemas de pa",
        "justificacion": "**Concepto Fundamental:** Física I: Leyes de Newton, Diagramas de Cuerpo Libre, Fricción y Dinámica Circular\n\n**Resolución Directa:** La dinámica clásica newtoniana explica las causas del movimiento mediante el concepto de fuerza como interacción física entre cuerpos. La Primera Ley establece que en un sistema de..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-dynamics'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-fis1-newton']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-fis1-newton'],
  },
  {
    "id": "santiago-fis1-energy-guide",
    "evaluationEventId": "santiago-fis1-parcial-3",
    "guideMetadata": {
      "title": "Física I: Trabajo Mecánico, Teorema de Fuerzas Vivas, Energía Potencial y Conservación",
      "area": "Física I · Escuela de Física (UCV Ciencias)",
      "summary": "Definición integral del trabajo, cálculo para fuerzas constantes y variables de resorte (Ley de Hooke), balance de energía mecánica y análisis de curvas de potencial unidimensional U(x)."
    },
    "phenomenonAndTheory": "El enfoque energético aborda la mecánica resolviendo problemas complejos de trayectorias curvilíneas sin necesidad de integrar las aceleraciones vectoriales instantáneas punto a punto. El trabajo mecánico W realizado por una fuerza es la integral de línea de la fuerza a lo largo del desplazamiento espacial (W = integral F * dr). El Teorema del Trabajo y la Energía Cinética (Teorema de las Fuerzas Vivas) establece que el trabajo neto realizado por todas las fuerzas aplicadas equivale exactamente al cambio en la energía cinética de la partícula (W_neto = Delta K). Las fuerzas se clasifican en conservativas (aquellas cuyo trabajo en una trayectoria cerrada es nulo y permiten definir una función escalar de energía potencial U, como la gravedad o la fuerza elástica de resortes) y no conservativas (como la fricción disipativa, cuyo trabajo disipa energía mecánica en forma de calor: W_no_conservativo = Delta E_mecánica).",
    "glossary": [
      {
        "term": "Trabajo Mecánico (W)",
        "definition": "Magnitud escalar que mide la transferencia de energía provocada por una fuerza aplicada a lo largo de un desplazamiento en la dirección de la fuerza.",
        "symbolOrUnit": "W = integral F * dr [Joules (J)]"
      },
      {
        "term": "Energía Cinética (K)",
        "definition": "Energía escalar asociada al estado de movimiento y rapidez que posee una masa puntual en un sistema de referencia inercial.",
        "symbolOrUnit": "K = (1/2) * m * v² [J]"
      },
      {
        "term": "Energía Potencial Gravitatoria (U_g)",
        "definition": "Energía almacenada en el campo gravitatorio terrestre dependiente de la posición vertical h de la masa respecto a un nivel de referencia cero arbitrario.",
        "symbolOrUnit": "U_g = m * g * h [J]"
      },
      {
        "term": "Energía Potencial Elástica (U_e)",
        "definition": "Energía almacenada en un resorte ideal de constante k deformado elásticamente una distancia x desde su posición natural de reposo.",
        "symbolOrUnit": "U_e = (1/2) * k * x² [J]"
      },
      {
        "term": "Conservación de la Energía Mecánica",
        "definition": "Principio físico que establece que la energía mecánica total (E = K + U) permanece rigurosamente constante si solo actúan fuerzas conservativas.",
        "symbolOrUnit": "Delta E_mec = 0 <=> E_inicial = E_final"
      }
    ],
    "formulasAndStrategies": {
      "coreFormulas": [
        {
          "name": "Trabajo Mecánico (W)",
          "latex": "W = integral F * dr [Joules (J)]",
          "application": "Magnitud escalar que mide la transferencia de energía provocada por una fuerza aplicada a lo largo de un desplazamiento en la dirección de la fuerza."
        },
        {
          "name": "Energía Cinética (K)",
          "latex": "K = (1/2) * m * v² [J]",
          "application": "Energía escalar asociada al estado de movimiento y rapidez que posee una masa puntual en un sistema de referencia inercial."
        },
        {
          "name": "Energía Potencial Gravitatoria (U_g)",
          "latex": "U_g = m * g * h [J]",
          "application": "Energía almacenada en el campo gravitatorio terrestre dependiente de la posición vertical h de la masa respecto a un nivel de referencia cero arbitrario."
        }
      ],
      "mnemonicsAndPatterns": [
        "Paso 1: Identificar el estado inicial (A) y el estado final (B) del sistema mecánico fijando un nivel de referencia claro donde la altura h = 0.",
        "Paso 2: Calcular la energía mecánica inicial E_A sumando la energía cinética (1/2 m vA²) más las potenciales gravitatoria (m g hA) y elástica (1/2 k xA²).",
        "Paso 3: Calcular la energía mecánica final E_B evaluando los mismos términos en el punto de destino.",
        "Paso 4: Identificar si actúan fuerzas no conservativas en el trayecto (como la fricción en superficies rugosas) y calcular su trabajo W_nc = -f_k * d.",
        "Paso 5: Formular el balance global de energía mecánica: E_A + W_no_conservativo = E_B (o Delta E_mec = W_nc).",
        "Paso 6: Despejar la incógnita pedida (rapidez final vB, deformación máxima de resorte x, o distancia recorrida d) mediante resolución algebraica.",
        "Regla 1: Las fuerzas que son siempre perpendiculares a la trayectoria (como la fuerza normal o la fuerza centrípeta) realizan estrictamente un trabajo mecánico nulo.",
        "Regla 2: El trabajo de una fuerza conservativa es igual al negativo de la variación de su energía potencial: W_cons = -Delta U.",
        "Regla 3: En los puntos de compresión o estiramiento máximo de un resorte, la rapidez instantánea de la masa conectada es exactamente cero.",
        "Regla 4: La potencia mecánica instantánea es el producto escalar de la fuerza aplicada por el vector velocidad: P = F * v."
      ]
    },
    "stepByStepExamples": [
      {
        "title": "Problema Canónico UCV #1: En el examen parcial de Física I de la UCV, un bloque d...",
        "problemStatement": "En el examen parcial de Física I de la UCV, un bloque de masa m = 2.0 kg se suelta desde el reposo en el punto A en lo alto de una rampa curva lisa (sin fricción) a una altura h = 5.0 m sobre el suelo. Al llegar a la base de la rampa (punto B), el bloque entra en un tramo horizontal plano rugoso de longitud L = 4.0 m con coeficiente de fricción cinética mu_k = 0.20. Tras cruzar el tramo rugoso (punto C), el bloque choca contra un resorte ideal horizontal de constante k = 800 N/m ubicado sobre piso liso y lo comprime hasta detenerse momentáneamente (punto D). Tomando g = 9.8 m/s²: a) Calcule la rapidez del bloque al llegar a la base de la rampa en B; b) Calcule el trabajo realizado por la fuerza de fricción a lo largo del tramo BC; c) Calcule la rapidez del bloque en C justo antes de tocar el resorte; d) Calcule la compresión máxima x_max que experimenta el resorte.",
        "deductiveSteps": [
          "Paso 1: Fijamos el nivel de referencia h = 0 en el suelo horizontal. Entre el punto A y el punto B la rampa es lisa (solo actúa la gravedad y la normal, pero la normal es perpendicular a la trayectoria y su trabajo es nulo). La energía mecánica se conserva: E_A = E_B.",
          "Paso 2: Evaluamos la energía en A: v_A = 0 (parte del reposo), h_A = 5.0 m. E_A = K_A + U_gA = 0 + m*g*h = 2.0 kg * 9.8 m/s² * 5.0 m = 98.0 Joules.",
          "Paso 3: Evaluamos la energía en B: h_B = 0, rapidez v_B. E_B = (1/2)*m*v_B² + 0 = (1/2)*2.0*v_B² = v_B². Igualando E_B = E_A: v_B² = 98.0 => v_B = sqrt(98.0) = 9.90 m/s.",
          "Paso 4: En el tramo horizontal BC actúa la fricción. La fuerza normal es N = m*g = 2.0 * 9.8 = 19.6 N. La fuerza de fricción cinética es: f_k = mu_k * N = 0.20 * 19.6 N = 3.92 N. Como la fricción se opone al avance a lo largo de L = 4.0 m, su trabajo es negativo: W_nc = -f_k * L = -3.92 N * 4.0 m = -15.68 Joules.",
          "Paso 5: Aplicamos el balance energético entre B y C: E_B + W_nc = E_C => 98.0 J - 15.68 J = E_C => E_C = 82.32 Joules.",
          "Paso 6: En el punto C la altura sigue siendo cero: E_C = (1/2)*m*v_C² = (1/2)*2.0*v_C² = v_C². Por tanto: v_C = sqrt(82.32) = 9.07 m/s.",
          "Paso 7: Entre el punto C y el punto D (compresión máxima del resorte sobre piso liso), no hay fricción: la energía mecánica se conserva. Toda la energía cinética disponible en C se transforma íntegramente en energía potencial elástica del resorte comprimido: E_C = E_D => 82.32 J = (1/2) * k * x_max².",
          "Paso 8: Despejamos la compresión x_max: 82.32 = (1/2) * 800 * x_max² = 400 * x_max² => x_max² = 82.32 / 400 = 0.2058 m² => x_max = sqrt(0.2058) = 0.454 m = 45.4 cm."
        ],
        "finalResult": "El método de conservación de energía permite saltarse toda la trayectoria curva intermedia y conectar directamente el inicio con el final."
      }
    ],
    "commonErrorsAlerts": [
      {
        "trap": "Trampa del Parcial 3 UCV",
        "correction": "Preguntar por el trabajo de la normal sobre un bloque que desliza por una pista curva semicircular. Es siempre exactamente 0 Joules en cualquier tramo porque theta = 90° en cada diferencial de línea."
      },
      {
        "trap": "Trampa del nivel de referencia",
        "correction": "Cambiar el nivel cero de altura a mitad del problema entre dos puntos diferentes sin redefinir los términos."
      },
      {
        "trap": "Trampa de energía potencial U(x)",
        "correction": "Olvidar que la fuerza se obtiene como el negativo de la derivada del potencial: F(x) = -dU/dx."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Asignar signo positivo al trabajo de la fuerza de fricción: la fricción mecánica siempre disipa energía y realiza trabajo negativo."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Intentar resolver la rampa curva usando leyes de Newton: como la pendiente cambia continuamente, la aceleración no es constante y Newton es casi imposible sin cálculo integral multivariable."
      },
      {
        "trap": "Error Frecuente de Cálculo",
        "correction": "Olvidar el factor 1/2 en la fórmula de la energía potencial elástica (1/2 k x²)."
      }
    ],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
        {
          "front": "¿Cuál es la definición y significado físico de: Trabajo Mecánico (W)?",
          "back": "Magnitud escalar que mide la transferencia de energía provocada por una fuerza aplicada a lo largo de un desplazamiento en la dirección de la fuerza. (Notación: W = integral F * dr [Joules (J)])"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Energía Cinética (K)?",
          "back": "Energía escalar asociada al estado de movimiento y rapidez que posee una masa puntual en un sistema de referencia inercial. (Notación: K = (1/2) * m * v² [J])"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Energía Potencial Gravitatoria (U_g)?",
          "back": "Energía almacenada en el campo gravitatorio terrestre dependiente de la posición vertical h de la masa respecto a un nivel de referencia cero arbitrario. (Notación: U_g = m * g * h [J])"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Energía Potencial Elástica (U_e)?",
          "back": "Energía almacenada en un resorte ideal de constante k deformado elásticamente una distancia x desde su posición natural de reposo. (Notación: U_e = (1/2) * k * x² [J])"
        },
        {
          "front": "¿Cuál es la definición y significado físico de: Conservación de la Energía Mecánica?",
          "back": "Principio físico que establece que la energía mecánica total (E = K + U) permanece rigurosamente constante si solo actúan fuerzas conservativas. (Notación: Delta E_mec = 0 <=> E_inicial = E_final)"
        }
      ],
      "cornellSynthesis": {
        "cues": [
          "Trabajo Mecánico (W)",
          "Energía Cinética (K)",
          "Energía Potencial Gravitatoria (U_g)",
          "Energía Potencial Elástica (U_e)",
          "Conservación de la Energía Mecánica"
        ],
        "notes": [
          "Paso 1: Identificar el estado inicial (A) y el estado final (B) del sistema mecánico fijando un nivel de referencia claro donde la altura h = 0.",
          "Paso 2: Calcular la energía mecánica inicial E_A sumando la energía cinética (1/2 m vA²) más las potenciales gravitatoria (m g hA) y elástica (1/2 k xA²).",
          "Paso 3: Calcular la energía mecánica final E_B evaluando los mismos términos en el punto de destino.",
          "Paso 4: Identificar si actúan fuerzas no conservativas en el trayecto (como la fricción en superficies rugosas) y calcular su trabajo W_nc = -f_k * d.",
          "Paso 5: Formular el balance global de energía mecánica: E_A + W_no_conservativo = E_B (o Delta E_mec = W_nc)."
        ],
        "summary": "Definición integral del trabajo, cálculo para fuerzas constantes y variables de resorte (Ley de Hooke), balance de energía mecánica y análisis de curvas de potencial unidimensional U(x)."
      },
      "conceptMapNodes": "Física I: Trabajo Mecánico, Teorema de Fuerzas Vivas, Energía Potencial y Conservación\n  ├── Fundamento: Física I · Escuela de Física (UCV Ciencias)\n  ├── Ecuaciones: Trabajo Mecánico (W), Energía Cinética (K), Energía Potencial Gravitatoria (U_g)\n  └── Protocolo: Paso 1: Identificar el estado inicial (A) y el estado final (B) del sistema mecánico fijando un nivel de referencia claro donde la altura h = 0. -> Paso 2: Calcular la energía mecánica inicial E_A sumando la energía cinética (1/2 m vA²) más las potenciales gravitatoria (m g hA) y elástica (1/2 k xA²). -> Paso 3: Calcular la energía mecánica final E_B evaluando los mismos términos en el punto de destino."
    },
    "generatedQuestions": [
      {
        "area": "Física I · Escuela de Física (UCV Ciencias)",
        "tema": "Física I: Trabajo Mecánico, Teorema de Fuerzas Vivas, Energía Potencial y Conservación",
        "tipo": "opcion_multiple",
        "pregunta": "¿Cuál es el principio rector fundamental que gobierna el tema: Física I: Trabajo Mecánico, Teorema de Fuerzas Vivas, Energía Potencial y Conservación?",
        "opciones": [
          "Definición integral del trabajo, cálculo para fuerzas constantes y variables de resorte (Ley de Hook",
          "Se resuelve únicamente mediante tabulación mecánica ciega",
          "No posee relevancia en el primer semestre de Ciencias",
          "Depende de variables no medibles en el laboratorio"
        ],
        "correcta": "Definición integral del trabajo, cálculo para fuerzas constantes y variables de resorte (Ley de Hook",
        "justificacion": "**Concepto Fundamental:** Física I: Trabajo Mecánico, Teorema de Fuerzas Vivas, Energía Potencial y Conservación\n\n**Resolución Directa:** El enfoque energético aborda la mecánica resolviendo problemas complejos de trayectorias curvilíneas sin necesidad de integrar las aceleraciones vectoriales instantáneas punto a pu..."
      }
    ],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-energy'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-fis1-energia']],
researchPrompt: SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-fis1-energia'],
  }
];
