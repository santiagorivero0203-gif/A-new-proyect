/**
 * @file santiago_fisica1.ts
 * @description Guías Académicas Deconstruidas Oficiales (7 Pilares) para SANTIAGO_FISICA1_GUIDES.
 * Formato canónico riguroso compatible con DeconstructedAcademicGuide.
 * Cátedra de Física General I (Mecánica Clásica · Escuela de Física · UCV Ciencias).
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
      "summary": "Cinemática tridimensional en ℝ³, vector posición r(t), velocidad v(t), aceleración a(t), triedro de Frenet-Serret, aceleración tangencial a_t, aceleración centrípeta a_n y radio de curvatura local."
},
    "phenomenonAndTheory": "La cinemática describe cuantitativamente el movimiento espacial de las partículas sin atender las fuerzas dinámicas que lo producen. En la Escuela de Física de la UCV, el movimiento se modela vectorialmente en ℝ³ mediante funciones continuas del tiempo t. El vector velocidad instantánea v(t) = dr/dt es estrictamente colineal a la recta tangente a la trayectoria en todo punto. La aceleración total a(t) = dv/dt rara vez apunta en la dirección de la velocidad; se descompone naturalmente en el triedro intrínseco de Frenet-Serret en dos componentes ortogonales fundamentales: la Aceleración Tangencial a_t = d|v|/dt (que cuantifica la variación del módulo o rapidez del cuerpo en el tiempo) y la Aceleración Normal o Centrípeta a_n = |v|²/rho (que cuantifica el cambio en la dirección espacial de la velocidad, curvando la trayectoria hacia el centro del círculo osculador de radio de curvatura rho).",
    "glossary": [
      {
            "term": "Vector Posición r(t)",
            "symbolOrUnit": "\\vec{r}(t) = x(t)\\hat{i} + y(t)\\hat{j} + z(t)\\hat{k} \\quad [\\mathrm{m}]",
            "definition": "Vector tridimensional que localiza la posición puntual del cuerpo respecto a un sistema inercial de coordenadas cartesianas."
      },
      {
            "term": "Vector Velocidad v(t)",
            "symbolOrUnit": "\\vec{v}(t) = \\frac{d\\vec{r}}{dt} \\quad [\\mathrm{m/s}]",
            "definition": "Razón instantánea de cambio del vector de posición con el tiempo, siempre tangente a la trayectoria del movimiento."
      },
      {
            "term": "Aceleración Tangencial (a_t)",
            "symbolOrUnit": "a_t = \\frac{d|\\vec{v}|}{dt} = \\frac{\\vec{v} \\cdot \\vec{a}}{|\\vec{v}|} \\quad [\\mathrm{m/s^2}]",
            "definition": "Componente escalar de la aceleración paralela a la velocidad instantánea que mide el ritmo de cambio de la rapidez escalar."
      },
      {
            "term": "Aceleración Normal (a_n)",
            "symbolOrUnit": "a_n = \\frac{|\\vec{v}|^2}{\\rho} = \\sqrt{|\\vec{a}|^2 - a_t^2} \\quad [\\mathrm{m/s^2}]",
            "definition": "Componente escalar de la aceleración perpendicular a la velocidad que mide cómo gira y se curva la trayectoria hacia el centro del círculo osculador."
      },
      {
            "term": "Radio de Curvatura (rho)",
            "symbolOrUnit": "\\rho = \\frac{|\\vec{v}|^2}{a_n} = \\frac{|\\vec{v}|^3}{|\\vec{v} \\times \\vec{a}|} \\quad [\\mathrm{m}]",
            "definition": "Radio del círculo osculador tangente que mejor se ajusta localmente a la curva de la trayectoria espacial."
      }
],
    "formulasAndStrategies": {
      "coreFormulas": [
            {
                  "name": "Ecuaciones Diferenciales Cinemáticas",
                  "latex": "\\vec{v}(t) = \\frac{d\\vec{r}}{dt}, \\quad \\vec{a}(t) = \\frac{d\\vec{v}}{dt} = \\frac{d^2 \\vec{r}}{dt^2}",
                  "application": "Deducción de velocidades y aceleraciones instantáneas por diferenciación analítica directa."
            },
            {
                  "name": "Descomposición Intrínseca Pitagórica",
                  "latex": "|\\vec{a}|^2 = a_t^2 + a_n^2 \\iff a_n = \\sqrt{|\\vec{a}|^2 - a_t^2}",
                  "application": "Cálculo directo de la aceleración normal a partir del módulo total y la componente tangencial."
            },
            {
                  "name": "Radio de Curvatura Paramétrico",
                  "latex": "\\rho = \\frac{|\\vec{v}|^3}{|\\vec{v} \\times \\vec{a}|}",
                  "application": "Fórmula universal para determinar el radio de curvatura en trayectorias tridimensionales generales."
            }
      ],
      "mnemonicsAndPatterns": [
            "Paso 1: Escribir las ecuaciones paramétricas x(t), y(t), z(t) del vector de posición r(t).",
            "Paso 2: Derivar r(t) respecto al tiempo para obtener el vector v(t) y calcular la rapidez escalar |v(t)| = sqrt(vx² + vy² + vz²).",
            "Paso 3: Derivar v(t) respecto al tiempo para obtener el vector aceleración total a(t) y su módulo |a(t)|.",
            "Paso 4: Calcular la aceleración tangencial a_t mediante el producto escalar (v · a) / |v| o derivando la rapidez d|v|/dt.",
            "Paso 5: Calcular la aceleración centrípeta a_n = sqrt(|a|² - a_t²).",
            "Paso 6: Despejar el radio de curvatura rho = |v|² / a_n.",
            "Regla 1: En movimiento rectilíneo a_n = 0 y rho tiende a infinito.",
            "Regla 2: En la cúspide de un tiro parabólico vy = 0, por lo que |v| = vx y a_t = 0 (toda la aceleración es normal)."
      ]
},
    "stepByStepExamples": [
      {
            "title": "Problema Canónico UCV (Parcial 1): Triedro Intrínseco y Curvatura en Tiro Parabólico",
            "problemStatement": "Una partícula en el plano vertical describe un movimiento dado por r(t) = (6.0 t) i + (20.0 t - 5.0 t²) j en unidades SI (t en segundos, r en metros). Para el instante t = 2.0 s: a) Calcule los vectores velocidad v(2) y aceleración a(2); b) Determine la aceleración tangencial a_t y la aceleración normal a_n; c) Calcule el radio de curvatura rho de la trayectoria en dicho punto.",
            "deductiveSteps": [
                  "Paso 1: Derivamos el vector posición: v_x(t) = 6.0 m/s; v_y(t) = 20.0 - 10.0 t m/s. Vector velocidad: v(t) = 6.0 i + (20.0 - 10.0 t) j.",
                  "Paso 2: Evaluamos en t = 2.0 s: v_x(2) = 6.0 m/s; v_y(2) = 20.0 - 10.0(2.0) = 0 m/s. Vector v(2) = 6.0 i + 0 j m/s. Rapidez escalar |v(2)| = 6.0 m/s (la partícula está exactamente en el vértice superior o cúspide de la parábola).",
                  "Paso 3: Derivamos para la aceleración: a_x(t) = 0; a_y(t) = -10.0 m/s². Vector aceleración: a(t) = 0 i - 10.0 j m/s² constante. Módulo: |a(2)| = 10.0 m/s².",
                  "Paso 4: Aceleración tangencial a_t: a_t = (v · a) / |v| = (6.0 * 0 + 0 * (-10.0)) / 6.0 = 0 / 6.0 = 0 m/s². Como la rapidez alcanza un mínimo local en la cúspide, su derivada instantánea es nula: a_t = 0 m/s².",
                  "Paso 5: Aceleración normal a_n: a_n = sqrt(|a|² - a_t²) = sqrt(10.0² - 0²) = 10.0 m/s². Toda la gravedad actúa de forma puramente perpendicular a la velocidad en este punto.",
                  "Paso 6: Radio de curvatura rho: rho = |v|² / a_n = (6.0 m/s)² / (10.0 m/s²) = 36.0 / 10.0 = 3.6 metros."
            ],
            "finalResult": "En la cúspide de un proyectil la velocidad es horizontal pura, la aceleración tangencial es nula y el radio de curvatura es mínimo."
      }
],
    "commonErrorsAlerts": [
      {
            "trap": "Trampa de afirmar que la rapidez es cero en la cúspide",
            "correction": "Confundir velocidad vertical nula (v_y = 0) con rapidez total cero; la componente horizontal v_x = 6 m/s se mantiene constante durante todo el vuelo."
      },
      {
            "trap": "Trampa de calcular a_t sin dividir entre la rapidez",
            "correction": "Calcular el producto escalar v · a y olvidar dividir entre |v|; a_t tiene unidades de aceleración (m/s²), no de energía ni potencia."
      }
],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
            {
                  "front": "¿Cuál es el significado físico de la aceleración tangencial a_t versus la aceleración normal a_n?",
                  "back": "a_t mide la razón de cambio del módulo de la velocidad (rapidez); a_n mide la razón de cambio de la dirección de la velocidad (curvatura espacial hacia el centro osculador)."
            },
            {
                  "front": "¿Por qué en la cúspide de un tiro parabólico la aceleración tangencial es estrictamente cero?",
                  "back": "Porque la velocidad es puramente horizontal y la gravedad es puramente vertical: al ser vectores perpendiculares, su producto escalar es nulo y la rapidez no cambia en ese instante."
            }
      ],
      "cornellSynthesis": {
            "cues": [
                  "Vector r(t)",
                  "Vector v(t)",
                  "Aceleración Tangencial a_t",
                  "Aceleración Normal a_n",
                  "Radio de Curvatura rho"
            ],
            "notes": [
                  "1. v(t) = dr/dt siempre es tangente a la curva.",
                  "2. a_t = d|v|/dt mide el cambio de rapidez.",
                  "3. a_n = v²/rho mide el giro centrípeto.",
                  "4. rho = |v|² / a_n = |v|³ / |v x a|."
            ],
            "summary": "Cinemática vectorial de partículas en tres dimensiones y descomposición intrínseca en componentes tangencial y normal."
      },
      "conceptMapNodes": "Cinemática Vectorial\n  ├── Posición r(t) -> Velocidad v(t) = dr/dt (Tangente)\n  ├── Aceleración a(t) = dv/dt\n  └── Descomposición Intrínseca: Tangencial a_t = (v·a)/|v| | Normal a_n = v²/rho"
},
    "generatedQuestions": [
      {
            "area": "Física I · Escuela de Física (UCV Ciencias)",
            "tema": "Cinemática Vectorial en ℝ³",
            "tipo": "opcion_multiple",
            "pregunta": "Una partícula se desplaza con vector de posición $\\vec{r}(t) = 3t^2 \\hat{i} + (2t - 5)\\hat{j} + 4\\cos(2t)\\hat{k}$ (en unidades SI). ¿Cuál es la magnitud de su aceleración en el instante $t = 0\\,\\text{s}$?",
            "opciones": [
                  "$\\sqrt{6^2 + (-16)^2} = \\sqrt{292} \\approx 17.09\\,\\text{m/s}^2$",
                  "$6.0\\,\\text{m/s}^2$",
                  "$16.0\\,\\text{m/s}^2$",
                  "$\\sqrt{36 + 4} = \\sqrt{40}\\,\\text{m/s}^2$"
            ],
            "correcta": "$\\sqrt{6^2 + (-16)^2} = \\sqrt{292} \\approx 17.09\\,\\text{m/s}^2$",
            "justificacion": "**Concepto Fundamental:** Doble Diferenciación Vectorial.\n\n**Resolución:** Derivamos dos veces: $\\vec{v}(t) = 6t \\hat{i} + 2\\hat{j} - 8\\sin(2t)\\hat{k}$. Luego $\\vec{a}(t) = 6\\hat{i} + 0\\hat{j} - 16\\cos(2t)\\hat{k}$. En $t = 0$: $\\vec{a}(0) = 6\\hat{i} - 16\\hat{k}$. Magnitud: $|\\vec{a}(0)| = \\sqrt{6^2 + (-16)^2} = \\sqrt{36 + 256} = \\sqrt{292} \\approx 17.09\\,\\text{m/s}^2$."
      },
      {
            "area": "Física I · Escuela de Física (UCV Ciencias)",
            "tema": "Componentes Intrínsecas en la Cúspide Parabólica",
            "tipo": "opcion_multiple",
            "pregunta": "Un proyectil se dispara con velocidad inicial $\\vec{v}_0 = 20\\hat{i} + 30\\hat{j}\\,\\text{m/s}$. En el punto más alto de su trayectoria, ¿cuáles son los valores de su aceleración tangencial $a_t$ y aceleración normal $a_n$ (tomando $g = 9.8\\,\\text{m/s}^2$)?",
            "opciones": [
                  "$a_t = 0\\,\\text{m/s}^2$ y $a_n = 9.8\\,\\text{m/s}^2$",
                  "$a_t = 9.8\\,\\text{m/s}^2$ y $a_n = 0\\,\\text{m/s}^2$",
                  "$a_t = 4.9\\,\\text{m/s}^2$ y $a_n = 4.9\\,\\text{m/s}^2$",
                  "$a_t = 0\\,\\text{m/s}^2$ y $a_n = 0\\,\\text{m/s}^2$"
            ],
            "correcta": "$a_t = 0\\,\\text{m/s}^2$ y $a_n = 9.8\\,\\text{m/s}^2$",
            "justificacion": "**Concepto Fundamental:** Ortogonalidad en la Cúspide de la Trayectoria.\n\n**Resolución:** En el punto más alto, la velocidad vertical es cero ($v_y = 0$), por lo que el vector velocidad es puramente horizontal: $\\vec{v} = 20\\hat{i}\\,\\text{m/s}$. La aceleración de la gravedad es puramente vertical: $\\vec{g} = -9.8\\hat{j}\\,\\text{m/s}^2$. Al ser perpendiculares, su producto escalar es nulo, lo que hace $a_t = 0$. Por el teorema de Pitágoras intrínseco, toda la aceleración gravitatoria es aceleración normal: $a_n = 9.8\\,\\text{m/s}^2$."
      },
      {
            "area": "Física I · Escuela de Física (UCV Ciencias)",
            "tema": "Radio de Curvatura de Trayectorias",
            "tipo": "opcion_multiple",
            "pregunta": "Una partícula describe una trayectoria curva con rapidez constante de $12\\,\\text{m/s}$. Si en cierto punto experimenta una aceleración total de $4.0\\,\\text{m/s}^2$, ¿cuál es el radio de curvatura $\\rho$ de la curva en dicho punto?",
            "opciones": [
                  "$36.0\\,\\text{m}$",
                  "$3.0\\,\\text{m}$",
                  "$48.0\\,\\text{m}$",
                  "$144.0\\,\\text{m}$"
            ],
            "correcta": "$36.0\\,\\text{m}$",
            "justificacion": "**Concepto Fundamental:** Radio de Curvatura $\\rho = \\frac{v^2}{a_n}$.\n\n**Resolución:** Como la rapidez es constante ($|v| = 12\\,\\text{m/s}$), la aceleración tangencial es nula: $a_t = \\frac{d|v|}{dt} = 0$. Por tanto, toda la aceleración experimentada es normal: $a_n = 4.0\\,\\text{m/s}^2$. Despejando el radio de curvatura: $\\rho = \\frac{v^2}{a_n} = \\frac{12^2}{4.0} = \\frac{144}{4.0} = 36.0\\,\\text{metros}$."
      }
],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG["santiago-fis1-kinematics"],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-fis1-kinematics"]],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-fis1-kinematics"],
  },
  {
    "id": "santiago-fis1-dynamics-guide",
    "evaluationEventId": "santiago-fis1-parcial-2",
    "guideMetadata": {
      "title": "Física I: Leyes de Newton, Diagramas de Cuerpo Libre, Fricción y Dinámica Circular",
      "area": "Física I · Escuela de Física (UCV Ciencias)",
      "summary": "Principio de inercia, ecuación fundamental F = ma, acción y reacción, diagramas de cuerpo libre (DCL), modelos de fricción seca (estática crítica vs cinética) y fuerzas en curvas con peralte."
},
    "phenomenonAndTheory": "La dinámica newtoniana estudia las causas mecánicas del movimiento estableciendo la relación causal entre las fuerzas exteriores y la aceleración adquirida por los cuerpos macroscópicos. La Primera Ley define los sistemas inerciales de referencia; la Segunda Ley postula la ecuación vectorial fundamental Sigma F = m*a; y la Tercera Ley impone que toda fuerza de interacción aparece como un par de acción y reacción de igual magnitud, misma dirección y sentidos opuestos aplicados sobre cuerpos distintos (por lo que nunca se anulan entre sí). La técnica analítica indispensable en la UCV es el Diagrama de Cuerpo Libre (DCL), aislando cada bloque y proyectando las fuerzas en ejes coordenados ortogonales adaptados a la geometría del plano. El modelo de fricción de Coulomb establece que el rozamiento estático es una fuerza reactiva de ajuste que solo alcanza su valor máximo fs_max = mu_s * N al borde del deslizamiento inminente.",
    "glossary": [
      {
            "term": "Diagrama de Cuerpo Libre (DCL)",
            "symbolOrUnit": "\\text{Aislamiento vectorial}",
            "definition": "Representación gráfica donde se aísla un único cuerpo y se dibujan todas las fuerzas reales que el entorno exterior ejerce sobre él."
      },
      {
            "term": "Fuerza Normal (N)",
            "symbolOrUnit": "\\vec{N} \\perp \\text{superficie}",
            "definition": "Fuerza de contacto electrostática perpendicular ejercida por una superficie rígida para evitar la penetración molecular del cuerpo."
      },
      {
            "term": "Fricción Estática Máxima",
            "symbolOrUnit": "f_{s,\\max} = \\mu_s N",
            "definition": "Límite superior de la fuerza de rozamiento estático que el plano puede ejercer antes de que el bloque empiece a deslizar."
      },
      {
            "term": "Fricción Cinética (f_k)",
            "symbolOrUnit": "f_k = \\mu_k N \\quad (\\mu_k < \\mu_s)",
            "definition": "Fuerza de rozamiento constante que se opone al movimiento relativo de deslizamiento efectivo entre las superficies."
      }
],
    "formulasAndStrategies": {
      "coreFormulas": [
            {
                  "name": "Segunda Ley de Newton Vectorial",
                  "latex": "\\sum \\vec{F} = m\\vec{a} \\iff \\sum F_x = m a_x, \\quad \\sum F_y = m a_y",
                  "application": "Planteamiento escalar del balance dinámico en ejes cartesianos adaptados."
            },
            {
                  "name": "Condición de Deslizamiento en Plano Inclinado",
                  "latex": "\\tan \\theta_c = \\mu_s",
                  "application": "El bloque desliza espontáneamente si el ángulo de inclinación theta supera al ángulo crítico de fricción."
            },
            {
                  "name": "Fuerza Centrípeta Dinámica",
                  "latex": "F_c = m \\frac{v^2}{R}",
                  "application": "Fuerza neta radial que debe apuntar hacia el centro de la trayectoria para mantener el giro circular."
            }
      ],
      "mnemonicsAndPatterns": [
            "Paso 1: Aislar cada cuerpo del sistema y dibujar un DCL independiente para cada uno.",
            "Paso 2: Elegir un sistema de ejes donde uno de los ejes coincida con la dirección de la aceleración (o posible movimiento).",
            "Paso 3: Descomponer el peso (mg) en planos inclinados: componente paralela mg*sen(theta), componente perpendicular mg*cos(theta).",
            "Paso 4: Sumar fuerzas perpendiculares para hallar la fuerza normal N (Sigma F_perp = 0).",
            "Paso 5: Comparar la fuerza impulsora paralela con la fricción estática máxima mu_s * N; si la supera, el bloque acelera con fricción cinética mu_k * N.",
            "Paso 6: Resolver el sistema algebraico de ecuaciones para obtener la aceleración a y las tensiones T."
      ]
},
    "stepByStepExamples": [
      {
            "title": "Problema Canónico UCV (Parcial 2): Bloque en Plano Inclinado con Fricción Estática y Cinética",
            "problemStatement": "Un bloque de masa m = 5.0 kg descansa sobre un plano inclinado a un ángulo theta = 30.0°. Los coeficientes de fricción entre el bloque y el plano son mu_s = 0.40 (estático) y mu_k = 0.25 (cinético). a) Determine si el bloque desliza espontáneamente bajo la sola acción de la gravedad; b) Si desliza, calcule su aceleración cuesta abajo. (g = 9.8 m/s²).",
            "deductiveSteps": [
                  "Paso 1: Dibujamos el DCL: Peso hacia abajo mg, Normal perpendicular al plano N, y Fricción hacia arriba paralela al plano f_s.",
                  "Paso 2: Elegimos ejes: eje x paralelo al plano apuntando hacia abajo, eje y perpendicular saliendo del plano.",
                  "Paso 3: Descomponemos el peso: P_x = mg sen(30°) = 5.0 * 9.8 * 0.50 = 24.5 N. P_y = mg cos(30°) = 5.0 * 9.8 * cos(30°) = 49.0 * 0.866 = 42.44 N.",
                  "Paso 4: Equilibrio perpendicular (eje y): Sigma F_y = 0 => N - P_y = 0 => N = 42.44 N.",
                  "Paso 5: Cálculo de la fuerza de fricción estática máxima: f_s,max = mu_s * N = 0.40 * 42.44 N = 16.98 N.",
                  "Paso 6: Comparación de fuerzas en x: La fuerza que empuja hacia abajo es P_x = 24.5 N. Como P_x (24.5 N) > f_s,max (16.98 N), la fricción estática no puede retener el bloque: EL BLOQUE DESLIZA ESPONTÁNEAMENTE CUESTA ABAJO.",
                  "Paso 7: Cálculo de la aceleración con fricción cinética: Al estar en movimiento relativo, la fricción que actúa es la cinética: f_k = mu_k * N = 0.25 * 42.44 N = 10.61 N. Segunda Ley de Newton en x: Sigma F_x = m * a => P_x - f_k = m * a => 24.5 N - 10.61 N = (5.0 kg) * a => 13.89 N = 5.0 * a => a = 13.89 / 5.0 = 2.78 m/s²."
            ],
            "finalResult": "El bloque rompe el reposo porque tan(30°) ≈ 0.577 > mu_s = 0.40, acelerando cuesta abajo a 2.78 m/s²."
      }
],
    "commonErrorsAlerts": [
      {
            "trap": "Trampa de usar fricción estática cuando ya está deslizando",
            "correction": "Calcular la aceleración restando mu_s * N en lugar de la fricción cinética mu_k * N; una vez roto el reposo, rige estrictamente el coeficiente cinético."
      },
      {
            "trap": "Trampa de asumir N = mg en planos inclinados",
            "correction": "Olvidar que en un plano inclinado la normal es N = mg cos(theta), no mg."
      }
],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
            {
                  "front": "¿Cuál es la condición geométrica y física para que un bloque en plano inclinado empiece a deslizar por su propio peso?",
                  "back": "Que la tangente del ángulo de inclinación supere al coeficiente de rozamiento estático: tan(theta) > mu_s."
            },
            {
                  "front": "¿Por qué las fuerzas del par de acción y reacción de la Tercera Ley de Newton nunca se cancelan entre sí?",
                  "back": "Porque están aplicadas sobre cuerpos físicos diferentes (el cuerpo A actúa sobre el B, y el B actúa sobre el A); jamás actúan sobre el mismo cuerpo en un mismo DCL."
            }
      ],
      "cornellSynthesis": {
            "cues": [
                  "DCL",
                  "Segunda Ley de Newton",
                  "tan(theta_c) = mu_s",
                  "Fricción Cinética f_k"
            ],
            "notes": [
                  "1. DCL individual para cada masa.",
                  "2. Ejes: uno alineado con la aceleración.",
                  "3. Desliza si tan(theta) > mu_s.",
                  "4. En movimiento actúa f_k = mu_k * N."
            ],
            "summary": "Fundamentos de la dinámica clásica de Newton, análisis vectorial de fuerzas de fricción y movimiento acelerado."
      },
      "conceptMapNodes": "Dinámica y Leyes de Newton\n  ├── DCL: Aislamiento y descomposición de fuerzas\n  ├── Ejes: Normal N = mg cos(theta) | Impulso P_x = mg sen(theta)\n  └── Fricción: Estática límite f_s <= mu_s N -> Desliza si tan(theta) > mu_s -> f_k = mu_k N"
},
    "generatedQuestions": [
      {
            "area": "Física I · Escuela de Física (UCV Ciencias)",
            "tema": "Dinámica de Fricción en Plano Inclinado",
            "tipo": "opcion_multiple",
            "pregunta": "Un bloque de masa $m = 5.0\\,\\text{kg}$ reposa sobre un plano inclinado a $\\theta = 30^\\circ$. El coeficiente de fricción estática es $\\mu_s = 0.40$ y el cinético es $\\mu_k = 0.25$. ¿Deslizará espontáneamente el bloque bajo la gravedad?",
            "opciones": [
                  "Sí desliza, porque $\\tan(30^\\circ) \\approx 0.577 > \\mu_s = 0.40$",
                  "No desliza, permanece en equilibrio estático porque el peso normal lo frena",
                  "Desliza hacia arriba por inercia reactiva",
                  "Faltan datos de la longitud del plano inclinado"
            ],
            "correcta": "Sí desliza, porque $\\tan(30^\\circ) \\approx 0.577 > \\mu_s = 0.40$",
            "justificacion": "**Concepto Fundamental:** Ángulo Crítico de Reposo en Planos Inclinados.\n\n**Resolución:** El ángulo crítico cumple $\\tan\\theta_c = \\mu_s = 0.40 \\implies \\theta_c \\approx 21.8^\\circ$. Como el ángulo real es $\\theta = 30^\\circ > 21.8^\\circ$, la componente tangencial del peso ($mg\\sin 30^\\circ$) supera a la fuerza de roce estático máxima ($\\mu_s mg \\cos 30^\\circ$), haciendo que el bloque rompa el reposo y deslice cuesta abajo."
      },
      {
            "area": "Física I · Escuela de Física (UCV Ciencias)",
            "tema": "Aceleración de Bloque en Plano Rugoso",
            "tipo": "opcion_multiple",
            "pregunta": "Tomando los datos de la pregunta anterior ($m = 5.0\\,\\text{kg}$, $\\theta = 30^\\circ$, $\\mu_k = 0.25$ y $g = 9.8\\,\\text{m/s}^2$), ¿cuál es la aceleración del bloque cuesta abajo una vez iniciado el movimiento?",
            "opciones": [
                  "$a = g(\\sin 30^\\circ - \\mu_k \\cos 30^\\circ) \\approx 2.78\\,\\text{m/s}^2$",
                  "$a = 4.90\\,\\text{m/s}^2$ (aceleración sin rozamiento)",
                  "$a = 9.80\\,\\text{m/s}^2$",
                  "$a = 1.25\\,\\text{m/s}^2$"
            ],
            "correcta": "$a = g(\\sin 30^\\circ - \\mu_k \\cos 30^\\circ) \\approx 2.78\\,\\text{m/s}^2$",
            "justificacion": "**Concepto Fundamental:** Segunda Ley de Newton con Fricción Cinética.\n\n**Resolución:** En el eje paralelo al plano: $\\Sigma F_x = mg \\sin\\theta - f_k = ma$. Como $f_k = \\mu_k N = \\mu_k mg \\cos\\theta$, dividiendo entre $m$ obtenemos: $a = g(\\sin\\theta - \\mu_k \\cos\\theta) = 9.8(0.50 - 0.25 \\times 0.866) = 9.8(0.50 - 0.2165) = 9.8(0.2835) \\approx 2.78\\,\\text{m/s}^2$."
      },
      {
            "area": "Física I · Escuela de Física (UCV Ciencias)",
            "tema": "Tercera Ley de Newton y Pares de Acción-Reacción",
            "tipo": "opcion_multiple",
            "pregunta": "Un caballo tira de un carro con una fuerza hacia adelante de $500\\,\\text{N}$. Según la Tercera Ley de Newton, el carro ejerce sobre el caballo una fuerza exactamente igual y opuesta de $500\\,\\text{N}$ hacia atrás. ¿Por qué el conjunto logra acelerar hacia adelante?",
            "opciones": [
                  "Porque el par de acción y reacción actúa sobre cuerpos distintos; el carro acelera por la fuerza neta que actúa sobre él, y el caballo acelera porque el suelo ejerce sobre sus cascos una fuerza de fricción hacia adelante mayor a $500\\,\\text{N}$",
                  "Porque la fuerza del caballo se aplica una fracción de segundo antes que la reacción",
                  "Porque la masa del caballo siempre es mayor que la masa del carro",
                  "Porque la Tercera Ley solo se cumple en sistemas en reposo"
            ],
            "correcta": "Porque el par de acción y reacción actúa sobre cuerpos distintos; el carro acelera por la fuerza neta que actúa sobre él, y el caballo acelera porque el suelo ejerce sobre sus cascos una fuerza de fricción hacia adelante mayor a $500\\,\\text{N}$",
            "justificacion": "**Concepto Fundamental:** No Anulación de Fuerzas en Cuerpos Distintos.\n\n**Resolución:** Las fuerzas de acción y reacción jamás actúan sobre el mismo cuerpo y por tanto no se anulan mutuamente en el DCL de un solo cuerpo. El movimiento del sistema caballo-carro depende de las fuerzas externas ejercidas por el suelo: la fricción del suelo hacia adelante sobre las patas del caballo supera las resistencias de fricción sobre las ruedas del carro, produciendo aceleración hacia adelante."
      }
],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG["santiago-fis1-dynamics"],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-fis1-dynamics"]],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-fis1-dynamics"],
  },
  {
    "id": "santiago-fis1-energy-guide",
    "evaluationEventId": "santiago-fis1-parcial-3",
    "guideMetadata": {
      "title": "Física I: Trabajo Mecánico, Teorema de Fuerzas Vivas, Energía Potencial y Conservación",
      "area": "Física I · Escuela de Física (UCV Ciencias)",
      "summary": "Integral de línea del trabajo de fuerzas variables W = ∫ F·dr, Teorema del Trabajo y la Energía Cinética, fuerzas conservativas, gradiente de potencial U(x) y balance energético con fuerzas disipativas."
},
    "phenomenonAndTheory": "El enfoque energético constituye uno de los métodos más elegantes y potentes de la mecánica teórica. Permite resolver problemas dinámicos complejos calculando integrales escalares entre un estado inicial y un estado final sin necesidad de integrar las aceleraciones vectoriales instantáneas momento a momento. El Trabajo Mecánico de una fuerza general es la integral de línea W = int F · dr. El Teorema de las Fuerzas Vivas demuestra que el trabajo neto total realizado por todas las fuerzas sobre una partícula equivale exactamente al cambio en su energía cinética: W_neto = Delta K = 1/2 m v_f² - 1/2 m v_i². Una fuerza es conservativa si su trabajo a lo largo de una trayectoria cerrada es estrictamente nulo, lo que permite asociarle una función de Energía Potencial escalar U(x) tal que F = -dU/dx. Cuando sobre el sistema actúan fuerzas disipativas no conservativas (como la fricción), la energía mecánica no se destruye, pero el balance mecánico macroscópico disminuye en una cantidad igual al trabajo no conservativo: E_mec,f - E_mec,i = W_nc.",
    "glossary": [
      {
            "term": "Trabajo Mecánico (W)",
            "symbolOrUnit": "W = \\int_{A}^{B} \\vec{F} \\cdot d\\vec{r} \\quad [\\mathrm{Joule, J}]",
            "definition": "Transferencia escalar de energía a un cuerpo mediante una fuerza aplicada a lo largo de un desplazamiento espacial."
      },
      {
            "term": "Energía Cinética (K)",
            "symbolOrUnit": "K = \\frac{1}{2} m |\\vec{v}|^2 \\quad [\\mathrm{J}]",
            "definition": "Energía mecánica acumulada por una masa inercial en virtud de su rapidez de movimiento escalar."
      },
      {
            "term": "Fuerza Conservativa",
            "symbolOrUnit": "\\oint \\vec{F} \\cdot d\\vec{r} = 0 \\iff \\vec{F} = -\\vec{\\nabla} U",
            "definition": "Fuerza cuyo trabajo entre dos puntos depende exclusivamente de las posiciones inicial y final, independientemente de la trayectoria recorrida."
      },
      {
            "term": "Energía Mecánica Total",
            "symbolOrUnit": "E_{\\text{mec}} = K + U_g + U_e \\quad [\\mathrm{J}]",
            "definition": "Suma de la energía cinética de movimiento más las energías potenciales gravitatoria y elástica del sistema."
      }
],
    "formulasAndStrategies": {
      "coreFormulas": [
            {
                  "name": "Teorema de las Fuerzas Vivas",
                  "latex": "W_{\\text{neto}} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2",
                  "application": "Relaciona el trabajo de todas las fuerzas actuantes con el cambio en la rapidez escalar."
            },
            {
                  "name": "Deducción de Energía Potencial",
                  "latex": "U(x) - U(x_0) = -\\int_{x_0}^x F(x')\\, dx'",
                  "application": "Integrar la fuerza conservativa con signo negativo para hallar la función de energía potencial escalar."
            },
            {
                  "name": "Balance con Trabajo No Conservativo",
                  "latex": "E_{\\text{mec},f} - E_{\\text{mec},i} = W_{\\text{nc}} = -f_k \\cdot d",
                  "application": "Calcular la pérdida de energía mecánica provocada por la fuerza disipativa de fricción."
            }
      ],
      "mnemonicsAndPatterns": [
            "Paso 1: Identificar con claridad el Estado Inicial A y el Estado Final B del proceso físico.",
            "Paso 2: Fijar un nivel de referencia de altura h = 0 para la energía potencial gravitatoria Ug = mgh.",
            "Paso 3: Calcular la energía mecánica total en el estado inicial: E_A = 1/2 m v_A² + m g h_A + 1/2 k x_A².",
            "Paso 4: Identificar si hay fuerzas no conservativas en el trayecto (como fricción de Coulomb f_k = mu_k N).",
            "Paso 5: Si no hay fricción, aplicar conservación rigurosa: E_A = E_B.",
            "Paso 6: Si hay fricción en un tramo de longitud d, plantear el balance: E_A + W_nc = E_B, donde W_nc = -f_k * d."
      ]
},
    "stepByStepExamples": [
      {
            "title": "Problema Canónico UCV (Parcial 3): Pista con Rampa Curva y Trampo Rugoso de Fricción",
            "problemStatement": "Un bloque de masa m = 2.0 kg parte del reposo desde una altura h = 5.0 m sobre una rampa curva sin rozamiento. Al llegar a la base horizontal, entra en un tramo rugoso de longitud d = 8.0 m con coeficiente de fricción cinética mu_k = 0.25, tras el cual choca contra un resorte ideal de constante k = 400 N/m. Calcule: a) La velocidad del bloque al llegar a la base de la rampa; b) La energía mecánica perdida por fricción en el tramo rugoso; c) La compresión máxima x_max que sufre el resorte. (g = 9.8 m/s²).",
            "deductiveSteps": [
                  "Paso 1: Rampa sin fricción (de altura h a base): Solo actúa la gravedad (fuerza conservativa). Fijamos h = 0 en la base horizontal. E_mec,A = m g h = 2.0 kg * 9.8 m/s² * 5.0 m = 98.0 Joules.",
                  "Paso 2: Velocidad al pie de la rampa (Punto B): E_mec,B = 1/2 m v_B² = 98.0 J => v_B = sqrt(2 * 98.0 / 2.0) = sqrt(98.0) ≈ 9.899 m/s.",
                  "Paso 3: Fuerza de fricción en el tramo horizontal rugoso: En el plano horizontal, la normal es N = mg = 2.0 * 9.8 = 19.6 N. Fuerza de rozamiento: f_k = mu_k * N = 0.25 * 19.6 N = 4.9 N.",
                  "Paso 4: Trabajo no conservativo disipativo en el tramo d = 8.0 m: W_nc = -f_k * d = -(4.9 N) * (8.0 m) = -39.2 Joules. Esta energía se transforma irreversiblemente en calor térmico.",
                  "Paso 5: Energía mecánica remanente tras cruzar el tramo rugoso (Punto C): E_mec,C = E_mec,B + W_nc = 98.0 J - 39.2 J = 58.8 Joules.",
                  "Paso 6: Compresión máxima del resorte (Punto D): En la compresión máxima, el bloque se detiene instantáneamente (K_D = 0) y toda la energía remanente se almacena como energía potencial elástica: E_mec,D = 1/2 k x_max² = 58.8 J => 1/2 (400 N/m) x_max² = 58.8 J => 200 x_max² = 58.8 => x_max² = 58.8 / 200 = 0.294 => x_max = sqrt(0.294) ≈ 0.542 metros = 54.2 cm."
            ],
            "finalResult": "El balance de energía mecánica E_i + W_nc = E_f resuelve problemas con múltiples fuerzas combinadas de forma directa y rigurosa."
      }
],
    "commonErrorsAlerts": [
      {
            "trap": "Trampa de signo en la deducción de U(x)",
            "correction": "Olvidar el signo menos en F = -dU/dx; la fuerza conservativa siempre empuja hacia las regiones de menor energía potencial."
      },
      {
            "trap": "Trampa de signo en el trabajo de fricción",
            "correction": "Sumar el trabajo de rozamiento como positivo; la fuerza de fricción siempre se opone al desplazamiento relativo, realizando trabajo negativo (W_nc < 0)."
      }
],
    "studyTechniquesHub": {
      "activeRecallFlashcards": [
            {
                  "front": "¿Cuál es la relación matemática exacta entre una fuerza conservativa unidimensional F(x) y su energía potencial U(x)?",
                  "back": "F(x) = -dU/dx, o en forma integral: U(x) = -∫ F(x') dx'. La fuerza siempre apunta hacia el gradiente negativo de la energía potencial."
            },
            {
                  "front": "¿Qué enuncia el Teorema de las Fuerzas Vivas (Trabajo y Energía Cinética)?",
                  "back": "El trabajo neto total realizado por TODAS las fuerzas actuantes sobre una partícula es exactamente igual al cambio en su energía cinética: W_neto = Delta K."
            }
      ],
      "cornellSynthesis": {
            "cues": [
                  "W = int F·dr",
                  "W_neto = Delta K",
                  "F = -dU/dx",
                  "W_nc = Delta E_mec"
            ],
            "notes": [
                  "1. W_neto = K_f - K_i (Teorema de fuerzas vivas).",
                  "2. Fuerzas conservativas: el trabajo no depende de la trayectoria.",
                  "3. U(x) = -int F dx.",
                  "4. Fricción realiza trabajo negativo: E_f = E_i + W_nc."
            ],
            "summary": "Integrales de trabajo mecánico, conservación de energía mecánica y balance con fuerzas disipativas en la UCV."
      },
      "conceptMapNodes": "Trabajo y Energía\n  ├── Teorema de Fuerzas Vivas: W_neto = Delta K = 1/2 m vf² - 1/2 m vi²\n  ├── Conservativas: F = -dU/dx | Conservación E_mec = K + U = cte\n  └── No Conservativas: E_f - E_i = W_nc = -f_k * d"
},
    "generatedQuestions": [
      {
            "area": "Física I · Escuela de Física (UCV Ciencias)",
            "tema": "Energía Potencial y Fuerza Conservativa",
            "tipo": "opcion_multiple",
            "pregunta": "Una fuerza conservativa unidimensional viene descrita por $F(x) = -kx + 3\\beta x^2$. ¿Cuál es la función de energía potencial $U(x)$ asociada, fijando $U(0) = 0$?",
            "opciones": [
                  "$U(x) = \\frac{1}{2}kx^2 - \\beta x^3$",
                  "$U(x) = -\\frac{1}{2}kx^2 + \\beta x^3$",
                  "$U(x) = -kx + 6\\beta x$",
                  "$U(x) = kx^2 + 3\\beta x^3$"
            ],
            "correcta": "$U(x) = \\frac{1}{2}kx^2 - \\beta x^3$",
            "justificacion": "**Concepto Fundamental:** Definición de Energía Potencial $U(x) = -\\int_0^x F(x')\\, dx'$.\n\n**Resolución:** Por definición de energía potencial: $U(x) = -\\int_0^x (-kx' + 3\\beta x'^2)\\, dx' = \\int_0^x (kx' - 3\\beta x'^2)\\, dx' = \\frac{1}{2}kx^2 - \\beta x^3$."
      },
      {
            "area": "Física I · Escuela de Física (UCV Ciencias)",
            "tema": "Teorema de las Fuerzas Vivas",
            "tipo": "opcion_multiple",
            "pregunta": "Una partícula de masa $m = 2.0\\,\\text{kg}$ se mueve en línea recta bajo la acción de una fuerza neta variable dada por $F(x) = 6x\\,\\text{N}$. Si la partícula parte del reposo en $x = 0$, ¿cuál es su rapidez al alcanzar la posición $x = 3.0\\,\\text{m}$?",
            "opciones": [
                  "$v = \\sqrt{27} \\approx 5.20\\,\\text{m/s}$",
                  "$v = 18.0\\,\\text{m/s}$",
                  "$v = 9.0\\,\\text{m/s}$",
                  "$v = 3.0\\,\\text{m/s}$"
            ],
            "correcta": "$v = \\sqrt{27} \\approx 5.20\\,\\text{m/s}$",
            "justificacion": "**Concepto Fundamental:** Teorema del Trabajo y la Energía Cinética $W_{\\text{neto}} = \\Delta K$.\n\n**Resolución:** Calculamos el trabajo neto integrando la fuerza: $W_{\\text{neto}} = \\int_0^3 6x\\, dx = \\left[ 3x^2 \\right]_0^3 = 3(3^2) - 0 = 27.0\\,\\text{Joules}$. Por el teorema de las fuerzas vivas: $W_{\\text{neto}} = \\frac{1}{2}m v_f^2 - 0 \\implies 27.0 = \\frac{1}{2}(2.0) v_f^2 = v_f^2 \\implies v_f = \\sqrt{27} \\approx 5.20\\,\\text{m/s}$."
      },
      {
            "area": "Física I · Escuela de Física (UCV Ciencias)",
            "tema": "Pérdida de Energía Mecánica por Fricción",
            "tipo": "opcion_multiple",
            "pregunta": "Un bloque de $4.0\\,\\text{kg}$ entra a una zona rugosa con rapidez inicial de $10.0\\,\\text{m/s}$. La fuerza de fricción constante realiza un trabajo de $-150\\,\\text{J}$ antes de que el bloque salga de la zona. ¿Cuál es su rapidez final?",
            "opciones": [
                  "$v_f = 5.0\\,\\text{m/s}$",
                  "$v_f = 0\\,\\text{m/s}$ (se detiene totalmente)",
                  "$v_f = 7.5\\,\\text{m/s}$",
                  "$v_f = 2.5\\,\\text{m/s}$"
            ],
            "correcta": "$v_f = 5.0\\,\\text{m/s}$",
            "justificacion": "**Concepto Fundamental:** Balance Energético con Trabajo Disipativo.\n\n**Resolución:** Energía cinética inicial: $K_i = \\frac{1}{2}m v_i^2 = \\frac{1}{2}(4.0)(10.0^2) = 200.0\\,\\text{J}$. Como el movimiento es puramente horizontal, la energía potencial no cambia. Balance: $K_f = K_i + W_{\\text{nc}} = 200.0\\,\\text{J} + (-150.0\\,\\text{J}) = 50.0\\,\\text{J}$. Despejando la rapidez final: $\\frac{1}{2}(4.0) v_f^2 = 50.0 \\implies 2.0 v_f^2 = 50.0 \\implies v_f^2 = 25.0 \\implies v_f = 5.0\\,\\text{m/s}$."
      }
],
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG["santiago-fis1-energy"],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-fis1-energy"]],
    researchPrompt: SANTIAGO_RESEARCH_PROMPTS["santiago-prompt-fis1-energy"],
  }
];
