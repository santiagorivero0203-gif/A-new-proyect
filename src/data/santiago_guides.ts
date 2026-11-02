/**
 * @file santiago_guides.ts
 * @description Guías Académicas Deconstruidas Oficiales (7 Pilares + Multimedia + Prompts)
 * para cada una de las evaluaciones y temas del Primer Semestre de Ciencias UCV.
 * 
 * Reglas de redacción:
 * - Lenguaje directo, claro, simple mas no informal (cero palabrería innecesaria).
 * - Cero subdivisiones anidadas dentro de los puntos (listas planas de un solo nivel).
 * - Integración viva de recursos multimedia y prompts con arquitectura Santiago.
 */

import type { DeconstructedAcademicGuide, DeconstructedQuestion } from '../types/deconstruction.types';
import type { Question } from '../types/exam.types';
import { SANTIAGO_MULTIMEDIA_CATALOG } from './santiago_multimedia';
import { SANTIAGO_RESEARCH_PROMPTS } from './santiago_prompts';

export function questionToDeconstructed(q: Question): DeconstructedQuestion {
  return {
    area: q.subject,
    tema: q.topic,
    tipo: 'opcion_multiple',
    pregunta: q.questionText,
    opciones: q.options.map((o) => o.text),
    correcta: q.options.find((o) => o.id === q.correctOptionId)?.text || q.options[0].text,
    justificacion: `**Concepto Fundamental:** ${q.topic}\n\n**Resolución Directa:** ${q.explanation}`,
  };
}

export const SANTIAGO_SEMESTER_1_DECONSTRUCTED_GUIDES: DeconstructedAcademicGuide[] = [
  // =========================================================================
  // GUÍA 1: FÍSICA I · PARCIAL 1: CINEMÁTICA VECTORIAL EN ℝ³
  // =========================================================================
  {
    id: 'santiago-fis1-kinematics-guide',
    evaluationEventId: 'santiago-fis1-parcial-1',
    phenomenonAndTheory:
      'La cinemática en tres dimensiones describe con exactitud matemática el movimiento espacial de un cuerpo. Para conocer hacia dónde se mueve y cómo cambia su rapidez, dividimos la aceleración en dos direcciones naturales: la aceleración tangencial, que cambia el valor numérico de la velocidad, y la aceleración normal o centrípeta, que dobla la trayectoria hacia el centro de la curva.',
    guideMetadata: {
      title: 'Física I: Cinemática Vectorial ℝ³, Componentes Intrínsecas y Tiro Parabólico',
      area: 'Física I · UCV Ciencias',
      summary:
        'Vectores de posición, velocidad y aceleración en el espacio euclidiano. Descomposición del movimiento en dirección tangente y perpendicular, radio de curvatura y resolución analítica de trayectorias curvilíneas.',
    },
    glossary: [
      {
        term: 'Vector de Posición r(t)',
        definition: 'Flecha matemática que localiza el cuerpo en el espacio respecto a un origen fijo en cada instante de tiempo.',
        symbolOrUnit: 'r(t) = x(t)i + y(t)j + z(t)k [m]',
      },
      {
        term: 'Aceleración Tangencial a_t',
        definition: 'Componente de la aceleración paralela a la velocidad responsable exclusiva del cambio en la rapidez del objeto.',
        symbolOrUnit: 'a_t = dv/dt [m/s²]',
      },
      {
        term: 'Aceleración Normal o Centrípeta a_n',
        definition: 'Componente perpendicular a la velocidad que curva la trayectoria hacia el centro instantáneo de giro.',
        symbolOrUnit: 'a_n = v² / ρ [m/s²]',
      },
      {
        term: 'Radio de Curvatura ρ',
        definition: 'Radio del círculo imaginario que mejor se adapta a la curva en el punto exacto de la trayectoria.',
        symbolOrUnit: 'ρ [m]',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Vector Velocidad Instantánea',
          latex: '\\vec{v}(t) = \\frac{d\\vec{r}}{dt} = \\dot{x}\\hat{i} + \\dot{y}\\hat{j} + \\dot{z}\\hat{k}',
          application: 'Derivada directa respecto al tiempo de cada componente de la posición.',
        },
        {
          name: 'Descomposición Intrínseca de la Aceleración',
          latex: '\\vec{a} = a_t \\hat{u}_t + a_n \\hat{u}_n = \\frac{dv}{dt}\\hat{u}_t + \\frac{v^2}{\\rho}\\hat{u}_n',
          application: 'Separación física del cambio de módulo y del cambio de dirección.',
        },
        {
          name: 'Módulo Total de la Aceleración',
          latex: '|\\vec{a}| = \\sqrt{a_t^2 + a_n^2}',
          application: 'Teorema de Pitágoras entre las componentes intrínsecas perpendiculares.',
        },
      ],
      mnemonicsAndPatterns: [
        'Regla de los Ejes Naturales: El vector tangente siempre apunta hacia donde avanza el cuerpo, y el vector normal apunta siempre hacia la parte cóncava de la curva.',
        'Rapidez Constante: Si la rapidez no cambia, la aceleración tangencial es cero y toda la aceleración es puramente centrípeta.',
        'Puntos de Inflexión: Cuando una curva cambia de curvatura y se vuelve recta por un instante, el radio de curvatura es infinito y la aceleración normal vale cero.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Cálculo de Aceleración Tangencial y Normal en Tiro Parabólico',
        problemStatement:
          'Un proyectil se lanza con velocidad inicial v0 = (20 i + 20 j) m/s bajo la gravedad g = 9.8 m/s² j. Hallar la aceleración tangencial y normal en el punto más alto.',
        deductiveSteps: [
          'En el punto más alto de la parábola, la velocidad vertical vy se anula por completo.',
          'La velocidad restante es puramente horizontal: v = 20 i m/s con rapidez v = 20 m/s.',
          'La aceleración gravitatoria actúa verticalmente hacia abajo: a = - 9.8 j m/s².',
          'Como la velocidad es horizontal y la gravedad es vertical, ambos vectores forman un ángulo de 90 grados.',
          'El producto escalar entre velocidad y gravedad es cero, por lo que la aceleración tangencial at es exactamente cero.',
          'Toda la gravedad actúa perpendicular a la velocidad, de modo que an = 9.8 m/s² apuntando hacia abajo.',
        ],
        finalResult: 'En la cima del tiro parabólico: at = 0 m/s² y an = 9.8 m/s².',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Creer que la aceleración tangencial es simplemente el módulo del vector aceleración total.',
        correction:
          'La aceleración tangencial es la derivada de la rapidez escalar dv/dt, que equivale a proyectar el vector aceleración sobre la dirección de la velocidad.',
      },
      {
        trap: 'Olvidar que en movimientos curvilíneos con rapidez constante la aceleración NO es cero.',
        correction:
          'Aunque el velocímetro marque siempre el mismo número, el cambio continuo en la dirección genera una aceleración normal v²/ρ distinta de cero.',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: [
          'Vector velocidad instantánea',
          'Aceleración tangencial vs normal',
          'Cálculo del radio de curvatura',
        ],
        notes: [
          'La velocidad siempre es estrictamente tangente a la curva recorrida.',
          'La aceleración total se divide en módulo (tangencial) y dirección (normal).',
          'El radio de curvatura se despeja dividiendo el cuadrado de la rapidez entre an.',
        ],
        summary:
          'La cinemática vectorial descompone cualquier trayectoria espacial en componentes geométricas que facilitan el análisis dinámico de fuerzas.',
      },
      conceptMapNodes:
        'Posición r(t) -> Derivada Primera: Velocidad v(t) -> Derivada Segunda: Aceleración a(t) -> Componentes: Tangencial at + Normal an',
      activeRecallFlashcards: [
        {
          front: '¿Cuál es la función física de la aceleración tangencial y de la aceleración normal?',
          back: 'La tangencial cambia la rapidez del cuerpo (acelera o frena), mientras que la normal curva la trayectoria (cambia la dirección).',
        },
        {
          front: '¿Cómo se calcula el radio de curvatura si conocemos la rapidez v y la aceleración normal an?',
          back: 'El radio de curvatura es ρ = v² / an.',
        },
      ],
    },
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-kinematics'],
    generatedQuestions: [],
  },

  // =========================================================================
  // GUÍA 2: FÍSICA I · PARCIAL 2: DINÁMICA DE NEWTON Y ROZAMIENTO
  // =========================================================================
  {
    id: 'santiago-fis1-dynamics-guide',
    evaluationEventId: 'santiago-fis1-parcial-2',
    phenomenonAndTheory:
      'La dinámica explica las causas del movimiento conectando las fuerzas que actúan sobre un cuerpo con la aceleración que este experimenta. La clave fundamental para resolver cualquier problema de dinámica consiste en aislar el cuerpo mediante un Diagrama de Cuerpo Libre riguroso, proyectar las fuerzas en dos ejes perpendiculares y aplicar la Segunda Ley de Newton de manera sistemática.',
    guideMetadata: {
      title: 'Física I: Leyes de Newton, Diagramas de Cuerpo Libre y Fricción Estática/Cinética',
      area: 'Física I · UCV Ciencias',
      summary:
        'Fundamentos de la mecánica newtoniana: formulación vectorial de las tres leyes, fuerzas de rozamiento con superficies rugosas, tensión en cuerdas ideales y resolución analítica de planos inclinados.',
    },
    glossary: [
      {
        term: 'Fuerza Normal N',
        definition: 'Fuerza de contacto perpendicular que ejerce una superficie para sostener un cuerpo que reposa sobre ella.',
        symbolOrUnit: 'N [Newtons, N]',
      },
      {
        term: 'Fuerza de Roce Estático f_s',
        definition: 'Fuerza de agarre que impide el inicio del deslizamiento entre dos superficies en contacto.',
        symbolOrUnit: 'f_s <= μ_s N [N]',
      },
      {
        term: 'Fuerza de Roce Cinético f_k',
        definition: 'Fuerza de fricción constante que se opone al movimiento cuando las dos superficies ya están resbalando.',
        symbolOrUnit: 'f_k = μ_k N [N]',
      },
      {
        term: 'Diagrama de Cuerpo Libre (DCL)',
        definition: 'Esquema gráfico donde se dibuja el objeto aislado con todas las fuerzas externas que interactúan con él.',
        symbolOrUnit: 'DCL',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Segunda Ley de Newton Vectorial',
          latex: '\\sum \\vec{F} = m \\vec{a}',
          application: 'Ecuación maestra que rige el movimiento en cada eje independiente.',
        },
        {
          name: 'Fuerza de Rozamiento Estático Máxima',
          latex: 'f_{s,\\max} = \\mu_s N',
          application: 'Límite de agarre antes de que el cuerpo comience a deslizar.',
        },
        {
          name: 'Ángulo Crítico de Deslizamiento en Plano Inclinado',
          latex: '\\tan \\theta_c = \\mu_s',
          application: 'Ángulo de inclinación exacto donde el bloque empieza a caer por su propio peso.',
        },
      ],
      mnemonicsAndPatterns: [
        'Regla de Oro del DCL: El peso siempre apunta vertical hacia el centro de la Tierra, la normal siempre es perpendicular a la superficie y el roce siempre se opone al movimiento relativo.',
        'Cuerda Ideal: Si la cuerda y la polea no tienen masa ni fricción, la tensión es la misma en todos los puntos de la cuerda.',
        'Rozamiento Variable: El roce estático no siempre vale μ_s N; vale exactamente lo necesario para mantener el equilibrio hasta llegar a su tope máximo.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Bloque en Plano Inclinado Rugoso con Fuerza Horizontal',
        problemStatement:
          'Un bloque de masa m = 10 kg reposa sobre una rampa inclinada a 30 grados con μ_s = 0.5. Determinar si el bloque desliza espontáneamente bajo la acción de la gravedad.',
        deductiveSteps: [
          'Calculamos la componente tangencial del peso paralela a la rampa: Pt = m g sen(30°) = (10)(9.8)(0.5) = 49 N.',
          'Calculamos la fuerza normal perpendicular a la rampa: N = m g cos(30°) = (10)(9.8)(0.866) = 84.87 N.',
          'Calculamos la fuerza máxima que el rozamiento estático puede soportar: fs_max = μ_s N = (0.5)(84.87) = 42.44 N.',
          'Comparamos la fuerza que tira del bloque hacia abajo (49 N) con la resistencia máxima del suelo (42.44 N).',
          'Como la fuerza hacia abajo supera la resistencia máxima de agarre, el bloque no puede quedarse quieto y comienza a deslizar cuesta abajo.',
        ],
        finalResult: 'El bloque desliza hacia abajo porque 49 N supera los 42.44 N de agarre estático.',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Asumir que la fuerza normal siempre es igual al peso (N = mg).',
        correction:
          'La normal solo es igual al peso en superficies horizontales sin fuerzas inclinadas. En una rampa con ángulo θ, la normal vale mg cos(θ).',
      },
      {
        trap: 'Dibujar la fuerza centrípeta como una flecha adicional en el diagrama de cuerpo libre inercial.',
        correction:
          'La fuerza centrípeta no es una fuerza física nueva; es simplemente el nombre de la suma de fuerzas reales que apuntan hacia el centro del giro.',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: [
          'Condición de equilibrio estático',
          'Diferencia entre roce estático y cinético',
          'Ángulo crítico en rampas',
        ],
        notes: [
          'Si la suma de fuerzas es cero, la aceleración es nula y el cuerpo mantiene velocidad constante.',
          'El coeficiente de roce estático siempre es mayor o igual al cinético.',
          'El ángulo crítico para que empiece el deslizamiento cumple tan(θ) = μ_s.',
        ],
        summary:
          'La dinámica conecta las fuerzas de contacto y gravitatorias con la aceleración real mediante la Segunda Ley de Newton.',
      },
      conceptMapNodes:
        'Fuerzas Aplicadas -> DCL Aislado -> Eje Perpendicular: Normal N -> Fuerza de Roce f_r -> Eje Paralelo: Suma F = m a',
      activeRecallFlashcards: [
        {
          front: '¿Cuál es la relación entre el coeficiente de roce estático μ_s y el ángulo crítico de reposo θ_c en una rampa?',
          back: 'El ángulo crítico cumple estrictamente que tan(θ_c) = μ_s.',
        },
        {
          front: '¿Por qué la fuerza de roce cinético f_k suele ser menor que la fuerza de roce estático máxima f_s,max?',
          back: 'Porque una vez roto el anclaje microscópico entre las rugosidades de las superficies en reposo, mantener el deslizamiento requiere menos fuerza.',
        },
      ],
    },
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-dynamics'],
    generatedQuestions: [],
  },

  // =========================================================================
  // GUÍA 3: FÍSICA I · PARCIAL 3: TRABAJO, ENERGÍA Y MOMENTO LINEAL
  // =========================================================================
  {
    id: 'santiago-fis1-energy-guide',
    evaluationEventId: 'santiago-fis1-parcial-3',
    phenomenonAndTheory:
      'La energía es una cantidad escalar que mide la capacidad de un sistema para producir cambios en su entorno. Cuando una fuerza desplaza un cuerpo realiza trabajo, transfiriendo energía entre movimiento (energía cinética) y posición (energía potencial). Si en el sistema solo actúan fuerzas conservativas como la gravedad o los resortes, la energía mecánica total se mantiene constante sin importar la complejidad del camino recorrido.',
    guideMetadata: {
      title: 'Física I: Trabajo Mecánico, Energía Potencial, Conservación y Colisiones en 2D',
      area: 'Física I · UCV Ciencias',
      summary:
        'Integrales de línea para trabajo, definición de fuerzas conservativas mediante el gradiente de energía potencial, teorema de las fuerzas vivas y conservación del momento lineal en choques elásticos e inelásticos.',
    },
    glossary: [
      {
        term: 'Trabajo Mecánico W',
        definition: 'Energía transferida por una fuerza al desplazar un objeto a lo largo de una distancia.',
        symbolOrUnit: 'W = ∫ F · dr [Joules, J]',
      },
      {
        term: 'Energía Cinética K',
        definition: 'Energía acumulada en un cuerpo debida exclusivamente a su masa y a su velocidad de traslación.',
        symbolOrUnit: 'K = (1/2) m v² [J]',
      },
      {
        term: 'Energía Potencial U',
        definition: 'Energía almacenada en un sistema debido a la posición relativa de sus partes dentro de un campo de fuerza.',
        symbolOrUnit: 'U(x) [J]',
      },
      {
        term: 'Momento Lineal p',
        definition: 'Magnitud vectorial que mide la inercia en movimiento de un cuerpo, dada por el producto de su masa por su velocidad.',
        symbolOrUnit: 'p = m v [kg·m/s]',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Teorema del Trabajo y la Energía Cinética',
          latex: 'W_{net} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2',
          application: 'El trabajo total de todas las fuerzas es igual al cambio en la energía cinética.',
        },
        {
          name: 'Fuerza Conservativa como Gradiente de Potencial',
          latex: 'F(x) = -\\frac{dU}{dx},\\quad \\vec{F} = -\\nabla U',
          application: 'La fuerza siempre empuja al cuerpo hacia donde la energía potencial decrece más rápido.',
        },
        {
          name: 'Conservación del Momento Lineal en Colisiones',
          latex: '\\sum \\vec{p}_i = \\sum \\vec{p}_f \\implies m_1 \\vec{v}_{1i} + m_2 \\vec{v}_{2i} = m_1 \\vec{v}_{1f} + m_2 \\vec{v}_{2f}',
          application: 'Se conserva en cualquier choque aislado donde la resultante de fuerzas externas sea nula.',
        },
      ],
      mnemonicsAndPatterns: [
        'Signo Menos en la Fuerza: F = - dU/dx significa que una pelota rueda hacia el fondo del valle de energía, nunca hacia la cima.',
        'Choque Plástico o Inelástico: Si los cuerpos se quedan pegados después del choque, la energía cinética no se conserva (se pierde en calor y deformación), pero el momento lineal se conserva estrictamente.',
        'Camino Independiente: Si una fuerza es conservativa, el trabajo para ir del punto A al punto B es el mismo por cualquier camino.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Cálculo de la Velocidad de un Vagón con Conservación de Energía',
        problemStatement:
          'Un vagón de montaña rusa de masa m = 500 kg parte del reposo desde una altura h = 20 m. Calcular su velocidad al llegar al nivel del suelo sin fricción.',
        deductiveSteps: [
          'En el punto inicial, el vagón está en reposo (v = 0), por lo que su energía cinética es K1 = 0.',
          'Su energía potencial gravitatoria inicial es U1 = m g h = (500)(9.8)(20) = 98,000 Joules.',
          'La energía mecánica total al inicio es E1 = K1 + U1 = 98,000 Joules.',
          'En el suelo, la altura es h = 0, por lo que la energía potencial final es U2 = 0.',
          'Toda la energía potencial se ha convertido en energía cinética: E2 = (1/2) m v² = 98,000 Joules.',
          'Despejamos la velocidad: v = √(2 g h) = √(2 · 9.8 · 20) = √392 ≈ 19.8 m/s.',
        ],
        finalResult: 'La velocidad final es v = 19.8 m/s (aproximadamente 71.3 km/h).',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Olvidar el signo menos en la relación entre fuerza y energía potencial (escribir F = dU/dx).',
        correction:
          'La fórmula correcta es F = - dU/dx. El signo negativo indica que la fuerza actúa en sentido contrario al aumento de energía potencial.',
      },
      {
        trap: 'Asumir que en un choque la energía cinética siempre se conserva.',
        correction:
          'La energía cinética solo se conserva en colisiones perfectamente elásticas. En colisiones inelásticas o reales, parte de la energía se disipa en calor, sonido y deformación.',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: [
          'Teorema de conservación de la energía',
          'Fuerzas conservativas vs disipativas',
          'Conservación del momento lineal',
        ],
        notes: [
          'La energía no se crea ni se destruye, solo se transforma entre cinética, potencial y calor.',
          'El rozamiento es una fuerza no conservativa que convierte energía mecánica en energía térmica.',
          'El momento lineal total se conserva en cualquier sistema cerrado sin fuerzas externas netas.',
        ],
        summary:
          'Los métodos de energía permiten resolver problemas de velocidad y trayectoria sin necesidad de calcular integrales de aceleración complejas.',
      },
      conceptMapNodes:
        'Fuerzas -> Trabajo W -> Variación de Energía Cinética ΔK -> Energía Potencial U -> Conservación E = K + U',
      activeRecallFlashcards: [
        {
          front: '¿Cuál es la condición para que una fuerza sea considerada conservativa?',
          back: 'Que el trabajo realizado para mover una partícula entre dos puntos sea independiente de la trayectoria y dependa solo de las posiciones inicial y final.',
        },
        {
          front: '¿Qué magnitud física se conserva SIEMPRE en cualquier colisión aislada, sea elástica o inelástica?',
          back: 'El momento lineal total del sistema (p_total = constante).',
        },
      ],
    },
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-energy'],
    generatedQuestions: [],
  },

  // =========================================================================
  // GUÍA 4: FÍSICA I · PROYECTO: SIMULACIÓN MECÁNICA COMPUTACIONAL EN PYTHON
  // =========================================================================
  {
    id: 'santiago-fis1-simulation-guide',
    evaluationEventId: 'santiago-fis1-proyecto',
    phenomenonAndTheory:
      'Muchos problemas reales de la física clásica no tienen una solución matemática con lápiz y papel debido a la presencia de fuerzas que dependen de la velocidad o de posiciones complejas. En estos casos, recurrimos a la integración numérica por computadora: dividimos el tiempo en pequeños pasos dt y calculamos paso a paso la nueva velocidad y posición del cuerpo mediante algoritmos estables como Euler-Cromer.',
    guideMetadata: {
      title: 'Física I: Proyecto de Simulación Computacional con Resistencia del Aire en Python',
      area: 'Física I · UCV Ciencias',
      summary:
        'Resolución de ecuaciones diferenciales cinemáticas por integración numérica. Implementación del método de Euler-Cromer, graficación de trayectorias con Matplotlib y búsqueda numérica del ángulo óptimo de alcance.',
    },
    glossary: [
      {
        term: 'Integración Numérica',
        definition: 'Procedimiento de cálculo computacional que aproxima la solución de una ecuación diferencial avanzando en pasos de tiempo discretos.',
        symbolOrUnit: 'Paso temporal dt [s]',
      },
      {
        term: 'Método de Euler-Cromer',
        definition: 'Algoritmo numérico que actualiza primero la velocidad y usa esa nueva velocidad para calcular la posición, conservando la energía del sistema.',
        symbolOrUnit: 'v(t+dt) y luego x(t+dt)',
      },
      {
        term: 'Fuerza de Arrastre Aerodinámico F_drag',
        definition: 'Fuerza de resistencia que ejerce el aire contra un proyectil, proporcional al cuadrado de su velocidad a velocidades moderadas y altas.',
        symbolOrUnit: 'F_d = (1/2) ρ_aire C_d A v² [N]',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Actualización de Velocidad en Euler-Cromer',
          latex: '\\vec{v}(t + \\Delta t) = \\vec{v}(t) + \\vec{a}(t) \\Delta t',
          application: 'Paso 1 del bucle de integración temporal.',
        },
        {
          name: 'Actualización de Posición en Euler-Cromer',
          latex: '\\vec{r}(t + \\Delta t) = \\vec{r}(t) + \\vec{v}(t + \\Delta t) \\Delta t',
          application: 'Paso 2: Usa la velocidad recién actualizada para mantener la estabilidad del cálculo.',
        },
        {
          name: 'Aceleración Neta con Fricción del Aire Cuadrática',
          latex: '\\vec{a} = -g\\hat{j} - \\frac{b}{m} v \\vec{v}',
          application: 'La resistencia del aire siempre frena al proyectil en sentido opuesto a su vector velocidad.',
        },
      ],
      mnemonicsAndPatterns: [
        'Orden de Euler-Cromer: Primero calcula la nueva velocidad, luego calcula la nueva posición con esa misma velocidad.',
        'Elección de dt: Si el paso de tiempo es muy grande el tiro explota numéricamente; un paso entre 0.001 s y 0.01 s garantiza curvas suaves y estables.',
        'Ángulo Óptimo con Aire: Sin resistencia del aire el ángulo óptimo es 45°; con resistencia del aire el ángulo óptimo siempre baja a valores entre 35° y 40°.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Bucle Básico de Integración Numérica en Python',
        problemStatement:
          'Escribir la estructura fundamental de un bucle temporal para calcular la trayectoria de una partícula lanzada a 50 m/s con paso dt = 0.01 s.',
        deductiveSteps: [
          'Definimos las constantes físicas: gravedad g = 9.8, coeficiente de arrastre b = 0.02, masa m = 1.0 y paso dt = 0.01.',
          'Inicializamos las listas de datos: tiempo t = 0, x = 0, y = 0, vx = 50 * cos(theta), vy = 50 * sen(theta).',
          'Iniciamos un bucle while que se ejecute mientras la altura y sea mayor o igual a cero.',
          'Calculamos la rapidez total v = sqrt(vx² + vy²) y las aceleraciones ax = - (b/m) * v * vx y ay = - g - (b/m) * v * vy.',
          'Actualizamos las velocidades sumando la aceleración multiplicada por dt: vx += ax * dt y vy += ay * dt.',
          'Actualizamos las coordenadas de posición sumando la nueva velocidad multiplicada por dt: x += vx * dt e y += vy * dt.',
          'Guardamos las coordenadas en las listas y avanzamos el reloj t += dt hasta que el proyectil toque el suelo.',
        ],
        finalResult: 'El bucle produce dos listas con las coordenadas X e Y listas para graficar con Matplotlib.',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Usar el método de Euler estándar para sistemas oscilatorios o trayectorias largas.',
        correction:
          'Euler simple acumula energía ficticia y hace que las órbitas se espirales hacia afuera. Euler-Cromer o Runge-Kutta 4 conservan la estabilidad física.',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: [
          'Ecuación de arrastre cuadrático',
          'Estabilidad de paso temporal dt',
          'Optimización numérica de alcance',
        ],
        notes: [
          'La resistencia del aire acopla las componentes horizontal y vertical de la velocidad.',
          'El ángulo de máximo alcance con arrastre siempre es menor a 45 grados.',
          'El paso de tiempo debe elegirse lo bastante pequeño para evitar derivas numéricas.',
        ],
        summary:
          'La simulación numérica extiende el poder de la física teórica a sistemas complejos con fricción y fuerzas no lineales.',
      },
      conceptMapNodes:
        'Fuerza F(v) -> Aceleración a(t) -> Integrador Euler-Cromer -> Listas [x], [y] -> Gráfica Matplotlib',
      activeRecallFlashcards: [
        {
          front: '¿Por qué con resistencia del aire el ángulo de tiro para lograr el máximo alcance es menor a 45 grados?',
          back: 'Porque pasar más tiempo en el aire a gran altura provoca una pérdida mayor de velocidad horizontal debido a la fricción acumulada.',
        },
      ],
    },
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-fis1-simulation'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-fis1-simulation']],
    generatedQuestions: [],
  },

  // =========================================================================
  // GUÍA 5: CÁLCULO I · PARCIAL 1: COTAS, SUCESIONES Y LÍMITES FORMALES (ε-δ)
  // =========================================================================
  {
    id: 'santiago-calc1-limits-guide',
    evaluationEventId: 'santiago-calc1-parcial-1',
    phenomenonAndTheory:
      'El cálculo diferencial se fundamenta en los números reales y en la idea de aproximación continua. Un límite nos dice hacia qué valor se acerca una función cuando la variable se aproxima a un punto de interés, sin necesidad de que la función exista en ese punto exacto. La definición rigurosa con épsilon y delta asegura que podemos hacer que la función esté tan cerca del límite como queramos simplemente acercando la variable lo suficiente.',
    guideMetadata: {
      title: 'Cálculo I: Axiomas de ℝ, Supremo, Límites Formales (ε-δ) y Continuidad',
      area: 'Cálculo I · UCV Ciencias',
      summary:
        'Axioma de completitud de los números reales, cotas superiores e inferiores, demostraciones formales de límites por épsilon-delta, resolución de indeterminaciones y Teorema de Bolzano.',
    },
    glossary: [
      {
        term: 'Supremo de un Conjunto',
        definition: 'La menor de todas las cotas superiores de un conjunto acotado de números reales.',
        symbolOrUnit: 'sup(A)',
      },
      {
        term: 'Ínfimo de un Conjunto',
        definition: 'La mayor de todas las cotas inferiores de un conjunto acotado de números reales.',
        symbolOrUnit: 'inf(A)',
      },
      {
        term: 'Definición Formal de Límite (ε - δ)',
        definition: 'Para cualquier tolerancia ε > 0 existe una distancia δ > 0 tal que si 0 < |x - a| < δ, entonces |f(x) - L| < ε.',
        symbolOrUnit: 'lim f(x) = L',
      },
      {
        term: 'Teorema de Bolzano',
        definition: 'Si una función es continua en un intervalo cerrado [a, b] y cambia de signo en los extremos, cruza al menos una vez el eje cero.',
        symbolOrUnit: 'Existe c tal que f(c) = 0',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Límite Trigonométrico Fundamental',
          latex: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1,\\quad \\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}',
          application: 'Base analítica para derivar funciones trigonométricas y resolver cocientes indeterminados 0/0.',
        },
        {
          name: 'Límite Exponencial del Número de Euler',
          latex: '\\lim_{x \\to \\infty} \\left(1 + \\frac{k}{x}\\right)^x = e^k,\\quad \\lim_{x \\to 0} (1 + x)^{1/x} = e',
          application: 'Resolución de indeterminaciones del tipo 1 elevado a infinito.',
        },
      ],
      mnemonicsAndPatterns: [
        'Regla del Conjugado: Cuando aparezcan raíces cuadradas restándose que generen 0/0, multiplica y divide por la suma de las raíces para eliminar la raíz del numerador.',
        'Grados en el Infinito: Al tomar límites hacia infinito de polinomios P(x)/Q(x), manda el término de mayor exponente de cada uno.',
        'Condición de Continuidad: Una función es continua en un punto si existe la función en ese punto, existe el límite al acercarse y ambos valores coinciden con exactitud.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Cálculo de Límite con Conjugado Racional',
        problemStatement: 'Evaluar analíticamente el límite: lim (x -> 4) de (sqrt(2x + 1) - 3) / (x - 4).',
        deductiveSteps: [
          'Evaluación directa: al sustituir x = 4 obtenemos (sqrt(9) - 3) / (4 - 4) = 0/0, que es una indeterminación.',
          'Multiplicamos el numerador y el denominador por la expresión conjugada: (sqrt(2x + 1) + 3).',
          'En el numerador aplicamos diferencia de cuadrados: (2x + 1) - 3² = 2x + 1 - 9 = 2x - 8.',
          'Sacamos factor común 2 en el numerador: 2(x - 4).',
          'Cancelamos el término nulo (x - 4) que causaba la división entre cero: queda 2 / (sqrt(2x + 1) + 3).',
          'Sustituimos x = 4 en la expresión simplificada: 2 / (3 + 3) = 2 / 6 = 1 / 3.',
        ],
        finalResult: 'El límite converge con exactitud al valor 1/3.',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Aplicar la Regla de L\'Hôpital antes de aprender y dominar la simplificación algebraica de límites.',
        correction:
          'En el primer parcial de Cálculo I de la UCV está terminantemente prohibido usar L\'Hôpital. Todos los límites deben resolverse mediante factorizaciones, conjugados o límites notables.',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: [
          'Axioma del supremo',
          'Definición formal epsilon-delta',
          'Límites laterales y continuidad',
        ],
        notes: [
          'Todo subconjunto de reales no vacío y acotado superiormente posee supremo en R.',
          'Un límite existe si y solo si los dos límites laterales existen y son idénticos.',
          'El Teorema de Bolzano garantiza la existencia de soluciones reales en ecuaciones no lineales.',
        ],
        summary:
          'El estudio riguroso de límites permite construir de forma sólida la derivada y el cálculo integral moderno.',
      },
      conceptMapNodes:
        'Axiomas de ℝ -> Cotas y Supremo -> Límite ε-δ -> Indeterminaciones 0/0 e ∞/∞ -> Continuidad y Bolzano',
      activeRecallFlashcards: [
        {
          front: '¿Cuáles son las tres condiciones formales para que una función sea continua en un punto x = a?',
          back: '1) f(a) está definida; 2) El límite cuando x tiende a a existe y es finito; 3) El límite es exactamente igual a f(a).',
        },
      ],
    },
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-calc1-limits'],
    generatedQuestions: [],
  },

  // =========================================================================
  // GUÍA 6: CÁLCULO I · PARCIAL 2: DERIVADAS Y REGLA DE LA CADENA
  // =========================================================================
  {
    id: 'santiago-calc1-derivatives-guide',
    evaluationEventId: 'santiago-calc1-parcial-2',
    phenomenonAndTheory:
      'La derivada representa la tasa de cambio instantánea de una función. Geométricamente es la pendiente de la recta tangente a la curva en un punto; físicamente es la velocidad instantánea de un proceso. Para derivar funciones compuestas se utiliza la Regla de la Cadena, que permite calcular cómo cambia una función externa cuando se altera una variable interna.',
    guideMetadata: {
      title: 'Cálculo I: Derivada por Definición, Regla de la Cadena y Derivación Implícita',
      area: 'Cálculo I · UCV Ciencias',
      summary:
        'Cálculo de la derivada como límite del cociente incremental, reglas operativas de derivación, diferenciación implícita de curvas no despejables y aproximaciones lineales de primer orden.',
    },
    glossary: [
      {
        term: 'Cociente Incremental',
        definition: 'Cociente entre la variación de la función y la variación de la variable independiente: (f(x+h) - f(x)) / h.',
        symbolOrUnit: 'Δy / Δx',
      },
      {
        term: 'Regla de la Cadena',
        definition: 'Fórmula que permite derivar funciones compuestas: la derivada de f(g(x)) es f\'(g(x)) multiplicado por g\'(x).',
        symbolOrUnit: 'dy/dx = (dy/du) · (du/dx)',
      },
      {
        term: 'Derivación Implícita',
        definition: 'Método para hallar la derivada de y respecto a x cuando la relación entre ambas está dada por una ecuación que no permite despejar y.',
        symbolOrUnit: 'dy/dx',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Definición Formal de la Derivada',
          latex: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}',
          application: 'Pendiente exacta de la recta tangente en el punto x.',
        },
        {
          name: 'Regla del Producto y del Cociente',
          latex: '(uv)\' = u\'v + uv\',\\quad \\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}',
          application: 'Derivación de multiplicaciones y divisiones de funciones algebraicas.',
        },
        {
          name: 'Ecuación de la Recta Tangente',
          latex: 'y - f(x_0) = f\'(x_0)(x - x_0)',
          application: 'Construcción de la recta tangente en un punto dado.',
        },
      ],
      mnemonicsAndPatterns: [
        'Propiedades de Logaritmos Primero: Antes de derivar expresiones con raíces o cocientes complicados, aplica propiedades de logaritmos para transformar productos en sumas y potencias en coeficientes.',
        'Derivación Implícita con Regla de la Cadena: Cada vez que derives un término que contenga la letra y, acompáñalo multiplicando por y\' o dy/dx.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Derivada Simplificada con Logaritmos',
        problemStatement: 'Calcular la derivada de f(x) = ln( sqrt((1 + x) / (1 - x)) ) para |x| < 1.',
        deductiveSteps: [
          'La raíz cuadrada equivale a elevar todo a la potencia 1/2.',
          'Por propiedades de logaritmos, bajamos el exponente: f(x) = (1/2) * ln((1 + x) / (1 - x)).',
          'Separamos la división en resta de logaritmos: f(x) = (1/2) * [ ln(1 + x) - ln(1 - x) ].',
          'Derivamos término a término: la derivada de ln(1+x) es 1/(1+x); la derivada de ln(1-x) es -1/(1-x).',
          'Restamos con cuidado los signos: f\'(x) = (1/2) * [ 1/(1+x) - (-1/(1-x)) ] = (1/2) * [ 1/(1+x) + 1/(1-x) ].',
          'Sumamos las fracciones: (1 - x + 1 + x) / ((1+x)(1-x)) = 2 / (1 - x²).',
          'Multiplicamos por el factor 1/2 exterior: f\'(x) = (1/2) * (2 / (1 - x²)) = 1 / (1 - x²).',
        ],
        finalResult: 'La derivada simplificada al máximo es f\'(x) = 1 / (1 - x²).',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Olvidar derivar el argumento interior al aplicar la regla de la cadena.',
        correction:
          'Recuerda siempre multiplicar por la derivada interna g\'(x). Por ejemplo, la derivada de cos(4x) es -4 sen(4x), no simplemente -sen(4x).',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: [
          'Definición de derivada',
          'Regla de la cadena',
          'Derivación implícita',
        ],
        notes: [
          'Si una función es derivable en un punto, obligatoriamente es continua en ese punto.',
          'La derivada del logaritmo natural de u es u\' sobre u.',
          'La aproximación lineal utiliza el diferencial dy = f\'(x)dx para estimar cambios pequeños.',
        ],
        summary:
          'La derivación es la herramienta matemática fundamental para cuantificar ritmos de cambio en ciencias exactas e ingeniería.',
      },
      conceptMapNodes:
        'Límite Incremental -> Derivada f\'(x) -> Reglas de Operación -> Regla de la Cadena -> Recta Tangente',
      activeRecallFlashcards: [
        {
          front: '¿Toda función continua en un punto es automáticamente derivable en ese punto?',
          back: 'No. Por ejemplo, f(x) = |x| es continua en x = 0 pero tiene un pico y sus derivadas laterales son distintas (-1 y +1), por lo que no es derivable allí.',
        },
      ],
    },
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-calc1-derivatives'],
    generatedQuestions: [],
  },

  // =========================================================================
  // GUÍA 7: CÁLCULO I · PARCIAL 3: TEOREMAS DE VALOR MEDIO Y OPTIMIZACIÓN
  // =========================================================================
  {
    id: 'santiago-calc1-optimization-guide',
    evaluationEventId: 'santiago-calc1-parcial-3',
    phenomenonAndTheory:
      'Los teoremas del valor medio conectan el comportamiento global de una función en un intervalo con el valor puntual de su derivada. El Teorema de Rolle asegura que si una función continua vuelve a la misma altura, en el camino tuvo al menos una tangente horizontal. Esto fundamenta los criterios de optimización: buscar los puntos donde la derivada vale cero para encontrar los máximos y mínimos que optimizan un sistema físico.',
    guideMetadata: {
      title: 'Cálculo I: Teoremas de Rolle, Valor Medio (Lagrange/Cauchy) y Optimización',
      area: 'Cálculo I · UCV Ciencias',
      summary:
        'Hipótesis y tesis de los teoremas de valor medio, Regla de L\'Hôpital para límites complejos, criterios de primera y segunda derivada para extremos y modelado de optimización aplicada.',
    },
    glossary: [
      {
        term: 'Punto Crítico',
        definition: 'Punto del dominio donde la primera derivada de la función vale cero o no existe.',
        symbolOrUnit: 'f\'(c) = 0 o no existe',
      },
      {
        term: 'Teorema de Rolle',
        definition: 'Si f es continua en [a, b], derivable en (a, b) y f(a) = f(b), existe al menos un punto c en (a, b) con f\'(c) = 0.',
        symbolOrUnit: 'f\'(c) = 0',
      },
      {
        term: 'Punto de Inflexión',
        definition: 'Punto de la gráfica donde la función cambia el sentido de su concavidad (de cóncava hacia arriba a cóncava hacia abajo o viceversa).',
        symbolOrUnit: 'f\'\'(c) = 0 con cambio de signo',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Teorema del Valor Medio de Lagrange',
          latex: 'f\'(c) = \\frac{f(b) - f(a)}{b - a},\\quad c \\in (a, b)',
          application: 'Garantiza que la pendiente instantánea coincide con la pendiente media en algún punto.',
        },
        {
          name: 'Criterio de la Segunda Derivada para Extremos',
          latex: 'f\'(c) = 0 \\implies \\begin{cases} f\'\'(c) > 0 \\implies \\text{Mínimo Local} \\\\ f\'\'(c) < 0 \\implies \\text{Máximo Local} \\end{cases}',
          application: 'Clasificación rápida de puntos críticos analíticos.',
        },
      ],
      mnemonicsAndPatterns: [
        'Regla de la Sonrisa: f\'\'(x) > 0 es cóncava hacia arriba (como una sonrisa) y su punto más bajo es un mínimo.',
        'Verificar Hipótesis Siempre: Nunca apliques Rolle o Lagrange sin escribir primero que la función es continua en el intervalo cerrado y derivable en el intervalo abierto.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Verificación del Teorema de Rolle en un Polinomio',
        problemStatement: 'Encontrar el punto c que garantiza el Teorema de Rolle para f(x) = x³ - 4x en el intervalo [0, 2].',
        deductiveSteps: [
          'Verificamos continuidad: f es un polinomio, por lo que es continua en todo R y en particular en el intervalo cerrado [0, 2].',
          'Verificamos derivabilidad: f es derivable en todo R y en particular en el intervalo abierto (0, 2).',
          'Evaluamos los extremos: f(0) = 0³ - 4(0) = 0; f(2) = 2³ - 4(2) = 8 - 8 = 0. Se cumple que f(0) = f(2).',
          'Por el Teorema de Rolle, existe c en (0, 2) tal que f\'(c) = 0.',
          'Calculamos la derivada: f\'(x) = 3x² - 4.',
          'Igualamos a cero: 3c² - 4 = 0 => c² = 4/3 => c = 2 / sqrt(3) = 2 sqrt(3) / 3 ≈ 1.155.',
          'Comprobamos que 1.155 está estrictamente dentro del intervalo (0, 2).',
        ],
        finalResult: 'El punto garantizado por Rolle es c = 2 / sqrt(3) ≈ 1.155.',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Elegir un punto crítico que queda fuera del intervalo del problema.',
        correction:
          'El teorema de Rolle y Lagrange solo garantiza puntos dentro del intervalo abierto (a, b). Si obtienes varias soluciones algebraicas, descarta las que no pertenezcan al intervalo.',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: [
          'Teorema de Rolle y condiciones',
          'Teorema de Lagrange',
          'Criterios para máximos y mínimos',
        ],
        notes: [
          'Las hipótesis de continuidad en [a, b] y derivabilidad en (a, b) son obligatorias.',
          'Si f\'\'(c) = 0 el criterio no decide y debe usarse el criterio de la primera derivada.',
          'En problemas de optimización real siempre se debe analizar los extremos del dominio.',
        ],
        summary:
          'Los teoremas del valor medio permiten localizar de forma rigurosa los estados óptimos en problemas de física y modelado.',
      },
      conceptMapNodes:
        'Funciones Derivables -> Teorema de Rolle -> Teorema de Lagrange -> Puntos Críticos f\'(c)=0 -> Criterio f\'\'(c) -> Máximos y Mínimos',
      activeRecallFlashcards: [
        {
          front: '¿Qué ocurre si en un punto crítico f\'(c) = 0 la segunda derivada también vale cero (f\'\'(c) = 0)?',
          back: 'El criterio de la segunda derivada no decide; es necesario analizar el cambio de signo de la primera derivada antes y después del punto c.',
        },
      ],
    },
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-calc1-optimization'],
    generatedQuestions: [],
  },

  // =========================================================================
  // GUÍA 8: CÁLCULO I · TRABAJO DE MODELADO Y OPTIMIZACIÓN APLICADA
  // =========================================================================
  {
    id: 'santiago-calc1-modeling-guide',
    evaluationEventId: 'santiago-calc1-taller',
    phenomenonAndTheory:
      'El modelado matemático traduce un problema del mundo real a ecuaciones algebraicas. La optimización busca la mejor solución posible bajo restricciones de costo, material o tiempo. Al expresar la magnitud a optimizar como función de una sola variable, el cálculo diferencial permite hallar las dimensiones exactas que minimizan el costo o maximizan el rendimiento.',
    guideMetadata: {
      title: 'Cálculo I: Trabajo de Modelado y Optimización de Fenómenos Físicos y Geométricos',
      area: 'Cálculo I · UCV Ciencias',
      summary:
        'Construcción de funciones objetivo a partir de restricciones geométricas, aplicación del Teorema de Weierstrass para garantizar extremos absolutos y justificación analítica formal.',
    },
    glossary: [
      {
        term: 'Función Objetivo',
        definition: 'Ecuación matemática que describe la magnitud que se desea maximizar (ganancia, volumen) o minimizar (costo, superficie).',
        symbolOrUnit: 'f(x)',
      },
      {
        term: 'Ecuación de Ligadura o Restricción',
        definition: 'Relación física o geométrica fija que vincula las variables del problema entre sí.',
        symbolOrUnit: 'g(x, y) = constante',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Volumen y Área de un Cilindro',
          latex: 'V = \\pi r^2 h,\\quad A = 2\\pi r^2 + 2\\pi r h',
          application: 'Fórmulas clásicas para problemas de diseño de contenedores óptimos.',
        },
      ],
      mnemonicsAndPatterns: [
        'Flujo de Optimización en 4 Pasos: 1) Dibuja la figura y asigna variables; 2) Escribe la ecuación de ligadura y despeja una variable; 3) Sustituye en la función objetivo; 4) Deriva e iguala a cero.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Cilindro de Mínima Área Superficial para un Volumen Fijo',
        problemStatement: 'Demostrar que para un cilindro cerrado de volumen fijo V, el área superficial es mínima cuando la altura es igual al diámetro (h = 2r).',
        deductiveSteps: [
          'Escribimos el volumen fijo: V = pi * r² * h, de donde despejamos la altura: h = V / (pi * r²).',
          'Escribimos la función de área total: A(r) = 2 * pi * r² + 2 * pi * r * h.',
          'Sustituimos h en el área: A(r) = 2 * pi * r² + 2 * pi * r * (V / (pi * r²)) = 2 * pi * r² + 2V / r.',
          'Derivamos respecto a r: A\'(r) = 4 * pi * r - 2V / r².',
          'Igualamos a cero para hallar el punto crítico: 4 * pi * r = 2V / r² => 4 * pi * r³ = 2V => 2 * pi * r³ = V.',
          'Como V = pi * r² * h, sustituimos: 2 * pi * r³ = pi * r² * h => cancelamos pi * r² a ambos lados => 2r = h.',
        ],
        finalResult: 'Queda demostrado formalmente que el área es mínima cuando la altura es igual al diámetro (h = 2r).',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Olvidar verificar que el punto crítico hallado es efectivamente un mínimo y no un máximo.',
        correction:
          'Calcula siempre la segunda derivada A\'\'(r) = 4 pi + 4V / r³. Como r > 0 y V > 0, A\'\'(r) > 0 en todo el dominio, lo que demuestra que es un mínimo absoluto.',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: ['Función objetivo', 'Ecuación de ligadura', 'Comprobación con segunda derivada'],
        notes: [
          'La ligadura reduce las variables a una sola variable independiente.',
          'El dominio físico siempre descarta soluciones con dimensiones negativas o nulas.',
        ],
        summary: 'La optimización analítica permite diseñar estructuras de máxima eficiencia material.',
      },
      conceptMapNodes: 'Problema Físico -> Ligadura -> Función en 1 Variable -> Derivada Cero -> Mínimo Demostrado',
      activeRecallFlashcards: [
        {
          front: '¿Cuál es la proporción entre altura y radio para que un cilindro cerrado tenga mínima superficie?',
          back: 'La altura debe ser exactamente igual al diámetro: h = 2r.',
        },
      ],
    },
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-calc1-optimization'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-calc1-modeling']],
    generatedQuestions: [],
  },

  // =========================================================================
  // GUÍA 9: ÁLGEBRA LINEAL · PARCIAL 1: GEOMETRÍA VECTORIAL EN ℝ³ Y PLANOS
  // =========================================================================
  {
    id: 'santiago-alg1-vectors-guide',
    evaluationEventId: 'santiago-alg1-parcial-1',
    phenomenonAndTheory:
      'El espacio vectorial de tres dimensiones es el escenario geométrico donde ocurren las leyes de la física. Mediante el producto escalar medimos longitudes y ángulos entre vectores; mediante el producto vectorial encontramos un tercer vector perpendicular que define áreas orientadas; y mediante el triple producto escalar calculamos volúmenes de paralelepípedos en el espacio.',
    guideMetadata: {
      title: 'Álgebra Lineal & Geometría: Vectores en ℝ³, Rectas, Planos y Distancias',
      area: 'Álgebra Lineal · UCV Ciencias',
      summary:
        'Producto punto y cruz en tres dimensiones, ecuaciones vectoriales y simétricas de la recta, ecuación general del plano mediante su vector normal y cálculo de distancias mínimas punto-plano.',
    },
    glossary: [
      {
        term: 'Vector Normal n',
        definition: 'Vector perpendicular a todas las direcciones contenidas en un plano.',
        symbolOrUnit: 'n = (A, B, C)',
      },
      {
        term: 'Triple Producto Escalar (Mixto)',
        definition: 'Operación u · (v × w) cuyo valor absoluto representa el volumen del paralelepípedo formado por los tres vectores.',
        symbolOrUnit: 'det([u, v, w]) [u³]',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Ecuación General del Plano en el Espacio',
          latex: 'A(x - x_0) + B(y - y_0) + C(z - z_0) = 0 \\implies Ax + By + Cz + D = 0',
          application: 'Plano que pasa por P0(x0, y0, z0) con vector normal n = (A, B, C).',
        },
        {
          name: 'Distancia de un Punto a un Plano',
          latex: 'd(P, \\pi) = \\frac{|Ax_1 + By_1 + Cz_1 + D|}{\\sqrt{A^2 + B^2 + C^2}}',
          application: 'Fórmula directa para la menor distancia perpendicular a un plano.',
        },
        {
          name: 'Producto Vectorial mediante Determinante',
          latex: '\\vec{u} \\times \\vec{v} = \\det \\begin{pmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{pmatrix}',
          application: 'Vector ortogonal a u y a v simultáneamente.',
        },
      ],
      mnemonicsAndPatterns: [
        'Regla de la Mano Derecha: Los dedos barren desde u hacia v; el pulgar extendido apunta en la dirección exacta de u × v.',
        'Vectores Paralelos y Perpendiculares: Dos vectores son perpendiculares si su producto punto es cero; son paralelos si su producto cruz es el vector cero.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Ecuación del Plano con Punto y Vector Normal',
        problemStatement: 'Hallar la ecuación general del plano que pasa por P(1, -2, 3) y tiene normal n = (2, -4, 5).',
        deductiveSteps: [
          'La ecuación del plano se escribe como: A(x - x0) + B(y - y0) + C(z - z0) = 0.',
          'Sustituimos las componentes del vector normal: A = 2, B = -4, C = 5.',
          'Sustituimos las coordenadas del punto: x0 = 1, y0 = -2, z0 = 3.',
          'Escribimos la expresión: 2(x - 1) - 4(y - (-2)) + 5(z - 3) = 0.',
          'Desarrollamos los productos: 2x - 2 - 4y - 8 + 5z - 15 = 0.',
          'Agrupamos los términos independientes: -2 - 8 - 15 = -25.',
          'La ecuación simplificada es: 2x - 4y + 5z - 25 = 0.',
        ],
        finalResult: 'La ecuación general del plano es 2x - 4y + 5z - 25 = 0.',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Asumir que el producto vectorial es asociativo: u × (v × w) = (u × v) × w.',
        correction:
          'El producto vectorial NO es asociativo. Tampoco es conmutativo: u × v = - (v × u) (es anticonmutativo).',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: ['Ecuación del plano', 'Producto escalar vs vectorial', 'Distancia punto-plano'],
        notes: [
          'El producto punto da un escalar; el producto cruz da un vector perpendicular.',
          'Tres vectores son coplanares si su triple producto escalar vale cero.',
        ],
        summary: 'La geometría vectorial provee el marco analítico para formular la mecánica y el electromagnetismo.',
      },
      conceptMapNodes: 'Vectores ℝ³ -> Producto Punto (Ángulos) -> Producto Cruz (Ortogonalidad) -> Rectas y Planos',
      activeRecallFlashcards: [
        {
          front: '¿Cuándo tres vectores u, v y w en ℝ³ son coplanares (están en el mismo plano)?',
          back: 'Cuando su triple producto escalar u · (v × w) es idénticamente cero (el volumen del paralelepípedo es nulo).',
        },
      ],
    },
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-alg1-vectors'],
    generatedQuestions: [],
  },

  // =========================================================================
  // GUÍA 10: ÁLGEBRA LINEAL · PARCIAL 2: MATRICES, SISTEMAS Y RANGO
  // =========================================================================
  {
    id: 'santiago-alg1-matrices-guide',
    evaluationEventId: 'santiago-alg1-parcial-2',
    phenomenonAndTheory:
      'Una matriz es una tabla ordenada de números que representa una transformación del espacio o un sistema de ecuaciones simultáneas. El método de eliminación de Gauss-Jordan transforma la matriz del sistema en una matriz escalonada para descubrir de inmediato cuántas soluciones tiene mediante el Teorema de Rouché-Frobenius.',
    guideMetadata: {
      title: 'Álgebra Lineal: Matrices, Determinantes, Eliminación Gaussiana y Teorema de Rouché-Frobenius',
      area: 'Álgebra Lineal · UCV Ciencias',
      summary:
        'Operaciones elementales de fila, cálculo de rango matricial, matriz inversa, regla de Cramer y clasificación rigurosa de sistemas lineales de dimensión n.',
    },
    glossary: [
      {
        term: 'Rango de una Matriz rg(A)',
        definition: 'El número de filas no nulas que quedan en la matriz después de escalonarla completamente por eliminación de Gauss.',
        symbolOrUnit: 'rg(A)',
      },
      {
        term: 'Matriz Inversa A⁻¹',
        definition: 'Matriz cuadrada que al multiplicarse por la matriz original produce la matriz identidad: A · A⁻¹ = I.',
        symbolOrUnit: 'A⁻¹',
      },
      {
        term: 'Determinante det(A)',
        definition: 'Número escalar asociado a una matriz cuadrada que mide si la transformación conserva o colapsa el volumen del espacio.',
        symbolOrUnit: 'det(A)',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Teorema de Rouché-Frobenius',
          latex: '\\begin{cases} \\text{rg}(A) \\neq \\text{rg}(A|b) \\implies \\text{Incompatible (Sin Solución)} \\\\ \\text{rg}(A) = \\text{rg}(A|b) = n \\implies \\text{Compatible Determinado (Única Solución)} \\\\ \\text{rg}(A) = \\text{rg}(A|b) < n \\implies \\text{Compatible Indeterminado (Infinitas Soluciones)} \\end{cases}',
          application: 'Criterio universal para saber el número de soluciones de cualquier sistema lineal.',
        },
      ],
      mnemonicsAndPatterns: [
        'Matriz Invertible: Una matriz cuadrada tiene inversa si y solo si su determinante es diferente de cero (det(A) ≠ 0).',
        'Operaciones de Fila Permitidas: Puedes intercambiar dos filas, multiplicar una fila por un número distinto de cero y sumar a una fila el múltiplo de otra fila.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Cálculo de Singularidad de una Matriz Triangular',
        problemStatement: 'Determinar para qué valores del parámetro lambda la matriz A = [[1, 2, 1], [0, lambda - 1, 3], [0, 0, lambda - 4]] no tiene inversa.',
        deductiveSteps: [
          'Observamos la forma de la matriz: tiene ceros debajo de la diagonal principal, por lo que es una matriz triangular superior.',
          'El determinante de cualquier matriz triangular es el producto directo de los elementos de su diagonal principal.',
          'Calculamos el determinante: det(A) = (1) * (lambda - 1) * (lambda - 4).',
          'Una matriz NO tiene inversa si su determinante es igual a cero: det(A) = 0.',
          'Igualamos a cero: (1)(lambda - 1)(lambda - 4) = 0.',
          'Esto ocurre cuando lambda - 1 = 0 => lambda = 1, o cuando lambda - 4 = 0 => lambda = 4.',
        ],
        finalResult: 'La matriz es singular y no tiene inversa cuando lambda = 1 o lambda = 4.',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Confundir el determinante con la matriz misma o asumir que det(A + B) = det(A) + det(B).',
        correction:
          'El determinante NO se distribuye con la suma: det(A + B) ≠ det(A) + det(B). Sin embargo, sí se distribuye con el producto: det(A · B) = det(A) · det(B).',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: ['Eliminación de Gauss', 'Rango matricial', 'Teorema de Rouché-Frobenius'],
        notes: [
          'El rango mide el número de ecuaciones linealmente independientes reales.',
          'Si det(A) ≠ 0, el sistema Ax = b tiene solución única dada por x = A⁻¹ b.',
        ],
        summary: 'El álgebra lineal matricial es el lenguaje computacional de la física moderna y el cálculo multivariable.',
      },
      conceptMapNodes: 'Matriz [A|b] -> Operaciones de Fila -> Matriz Escalonada -> Rango rg(A) -> Teorema Rouché-Frobenius',
      activeRecallFlashcards: [
        {
          front: '¿Cuál es la condición sobre el determinante para que una matriz cuadrada A tenga inversa?',
          back: 'Su determinante debe ser estrictamente distinto de cero: det(A) ≠ 0.',
        },
      ],
    },
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-alg1-matrices'],
    generatedQuestions: [],
  },

  // =========================================================================
  // GUÍA 11: ÁLGEBRA LINEAL · TALLER DE ROTACIONES Y MECÁNICA VECTORIAL
  // =========================================================================
  {
    id: 'santiago-alg1-workshop-guide',
    evaluationEventId: 'santiago-alg1-taller',
    phenomenonAndTheory:
      'Toda rotación espacial alrededor del origen en tres dimensiones es una transformación lineal que conserva las distancias y los ángulos. La matriz que la describe es una matriz ortogonal con determinante igual a 1. Al buscar los vectores propios de esta matriz descubrimos que existe siempre un vector propio con valor propio 1, el cual señala exactamente el eje inmóvil alrededor del cual gira todo el cuerpo.',
    guideMetadata: {
      title: 'Álgebra Lineal: Taller de Transformaciones Lineales, Rotaciones y Autovectores en ℝ³',
      area: 'Álgebra Lineal · UCV Ciencias',
      summary:
        'Matrices ortogonales de rotación en tres dimensiones, cálculo analítico de valores y vectores propios y su correspondencia con los ejes principales de inercia en mecánica clásica.',
    },
    glossary: [
      {
        term: 'Matriz Ortogonal',
        definition: 'Matriz cuadrada cuyas columnas son vectores ortonormales entre sí, cumpliendo que su transpuesta es igual a su inversa: R^T · R = I.',
        symbolOrUnit: 'R^T = R⁻¹',
      },
      {
        term: 'Autovalor y Autovector',
        definition: 'Un vector v es autovector si al aplicarle la matriz solo cambia de escala sin cambiar de dirección: A v = λ v.',
        symbolOrUnit: 'Av = λv',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Ecuación Característica para Autovalores',
          latex: '\\det(A - \\lambda I) = 0',
          application: 'Polinomio cuyas raíces son los autovalores exactos de la transformación.',
        },
      ],
      mnemonicsAndPatterns: [
        'Eje de Giro Invariante: En cualquier rotación pura en el espacio, los puntos situados sobre el eje de rotación no cambian de lugar, lo que equivale a decir que su autovalor es λ = 1.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Cálculo del Eje Fijo de Rotación en el Eje Z',
        problemStatement: 'Comprobar que para la matriz de rotación en Z de ángulo theta, el vector (0, 0, 1) es un autovector con autovalor 1.',
        deductiveSteps: [
          'La matriz de rotación en Z es R = [[cos θ, -sen θ, 0], [sen θ, cos θ, 0], [0, 0, 1]].',
          'Multiplicamos la matriz R por el vector columna v = (0, 0, 1)^T.',
          'Primera fila: (cos θ)(0) + (-sen θ)(0) + (0)(1) = 0.',
          'Segunda fila: (sen θ)(0) + (cos θ)(0) + (0)(1) = 0.',
          'Tercera fila: (0)(0) + (0)(0) + (1)(1) = 1.',
          'El resultado del producto es el mismo vector original: R v = (0, 0, 1)^T = 1 · v.',
        ],
        finalResult: 'El vector (0, 0, 1) permanece invariable bajo la rotación, demostrando que el eje Z es el eje de giro con autovalor 1.',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Confundir una matriz ortogonal con una matriz simétrica.',
        correction:
          'Una matriz ortogonal cumple R^T = R⁻¹. Una simétrica cumple A^T = A. No son lo mismo, aunque las matrices de proyección pueden compartir propiedades.',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: ['Matrices ortogonales', 'Valores propios', 'Eje de giro en física'],
        notes: [
          'Las rotaciones en R3 conservan las normas euclidianas de los vectores.',
          'El determinante de toda matriz de rotación pura es idénticamente +1.',
        ],
        summary: 'Los autovectores permiten encontrar las direcciones naturales invariantes en física y geometría.',
      },
      conceptMapNodes: 'Transformación Lineal -> Matriz R -> det(R-λI)=0 -> Autovalor λ=1 -> Eje de Giro Invariante',
      activeRecallFlashcards: [
        {
          front: '¿Cuál es el valor del determinante de cualquier matriz de rotación pura en tres dimensiones?',
          back: 'Su determinante es siempre exactamente igual a +1 (conserva longitudes y orientación sin invertir el espacio).',
        },
      ],
    },
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-alg1-matrices'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-alg1-workshop']],
    generatedQuestions: [],
  },

  // =========================================================================
  // GUÍA 12: LABORATORIO I · INFORME #1: MEDICIÓN DE DENSIDADES E INCERTIDUMBRES
  // =========================================================================
  {
    id: 'santiago-lab1-density-guide',
    evaluationEventId: 'santiago-lab1-informe-1',
    phenomenonAndTheory:
      'Toda medición física en el laboratorio es una estimación sujeta a incertidumbres. Nunca podemos conocer el valor exacto de una magnitud; solo podemos establecer un intervalo de confianza donde reside el valor verdadero con alta probabilidad. Para magnitudes calculadas a partir de varias medidas directas (como la densidad calculada a partir de masa y volumen), las incertidumbres se propagan mediante derivadas parciales en cuadratura de Gauss.',
    guideMetadata: {
      title: 'Laboratorio I de Física: Metrología, Cifras Significativas y Propagación de Incertidumbres',
      area: 'Laboratorio I · UCV Ciencias',
      summary:
        'Manejo de instrumentos metrológicos (calibrador vernier, micrómetro y balanza analítica), teoría de errores sistemáticos y aleatorios, y propagación diferencial de Gauss para el cálculo de densidad.',
    },
    glossary: [
      {
        term: 'Apreciación Instrumental',
        definition: 'La división más pequeña marcada en la escala del instrumento de medición.',
        symbolOrUnit: 'Δx_inst',
      },
      {
        term: 'Incertidumbre Absoluta Δx',
        definition: 'Margen de tolerancia que acompaña a la medida expresado en las mismas unidades físicas.',
        symbolOrUnit: 'x = (x_0 ± Δx) [unidades]',
      },
      {
        term: 'Incertidumbre Relativa Porcentual ε',
        definition: 'Cociente entre la incertidumbre absoluta y el valor medido expresado en tanto por ciento.',
        symbolOrUnit: 'ε = (Δx / x) · 100%',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Fórmula Maestra de Gauss para Propagación en Cuadratura',
          latex: '\\Delta y = \\sqrt{ \\left(\\frac{\\partial y}{\\partial x_1}\\Delta x_1\\right)^2 + \\left(\\frac{\\partial y}{\\partial x_2}\\Delta x_2\\right)^2 + \\dots + \\left(\\frac{\\partial y}{\\partial x_n}\\Delta x_n\\right)^2 }',
          application: 'Cálculo del error en magnitudes indirectas independientes.',
        },
        {
          name: 'Propagación en Productos y Cocientes',
          latex: 'y = \\frac{m}{V} \\implies \\frac{\\Delta y}{y} = \\sqrt{ \\left(\\frac{\\Delta m}{m}\\right)^2 + \\left(\\frac{\\Delta V}{V}\\right)^2 }',
          application: 'Suma cuadrática de errores relativos para magnitudes multiplicadas o divididas.',
        },
      ],
      mnemonicsAndPatterns: [
        'Regla de Oro de Cifras Significativas: La incertidumbre absoluta SIEMPRE se redondea a una sola cifra significativa (o dos si empieza por 1 o 2). El valor de la medida se corta en esa misma posición decimal.',
        'Error Sistemático vs Aleatorio: El sistemático desvía las medidas siempre hacia el mismo lado por mala calibración; el aleatorio se reduce promediando muchas lecturas.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Cálculo de Densidad y Error Absoluto con Cifras Significativas',
        problemStatement:
          'Se mide la masa de un cilindro m = (100.0 ± 0.2) g y su volumen V = (20.0 ± 0.1) cm³. Hallar la densidad con su incertidumbre correctamente redondeada.',
        deductiveSteps: [
          'Calculamos el valor central de la densidad: ρ = m / V = 100.0 / 20.0 = 5.00 g/cm³.',
          'Calculamos el error relativo en la masa: Δm / m = 0.2 / 100.0 = 0.002 (0.2%).',
          'Calculamos el error relativo en el volumen: ΔV / V = 0.1 / 20.0 = 0.005 (0.5%).',
          'Sumamos en cuadratura los errores relativos: ε_ρ = sqrt((0.002)² + (0.005)²) = sqrt(0.000004 + 0.000025) = sqrt(0.000029) ≈ 0.00538 (0.538%).',
          'Calculamos la incertidumbre absoluta de la densidad: Δρ = ρ * ε_ρ = 5.00 * 0.00538 = 0.0269 g/cm³.',
          'Redondeamos la incertidumbre a una cifra significativa: Δρ = 0.03 g/cm³.',
          'Ajustamos los decimales del valor central a dos cifras decimales para coincidir con el error: ρ = (5.00 ± 0.03) g/cm³.',
        ],
        finalResult: 'La densidad experimental es ρ = (5.00 ± 0.03) g/cm³ con un error porcentual de 0.54%.',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Anotar más decimales en la medida que los que permite la incertidumbre experimental.',
        correction:
          'Escribir ρ = 5.00345 ± 0.03 g/cm³ es un error grave de laboratorio. Los decimales del valor central deben terminar exactamente donde termina la incertidumbre: (5.00 ± 0.03) g/cm³.',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: ['Apreciación instrumental', 'Propagación de Gauss', 'Redondeo de cifras'],
        notes: [
          'Toda medida en física experimental debe incluir su margen de incertidumbre y unidad SI.',
          'La incertidumbre de una sola lectura suele tomarse como la apreciación del instrumento.',
        ],
        summary: 'La teoría de errores permite garantizar la validez científica y reproducibilidad de las medidas de laboratorio.',
      },
      conceptMapNodes: 'Medida Directa (m, V) -> Apreciación -> Derivadas Parciales -> Error Gauss -> Redondeo Riguroso',
      activeRecallFlashcards: [
        {
          front: '¿A cuántas cifras significativas se debe redondear normalmente la incertidumbre absoluta de una medida física?',
          back: 'A una sola cifra significativa (o excepcionalmente dos si el primer dígito es 1 o 2).',
        },
      ],
    },
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-lab1-density'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-lab1-density']],
    generatedQuestions: [],
  },

  // =========================================================================
  // GUÍA 13: LABORATORIO I · INFORME #2: RIEL DE AIRE Y MÍNIMOS CUADRADOS
  // =========================================================================
  {
    id: 'santiago-lab1-airtrack-guide',
    evaluationEventId: 'santiago-lab1-informe-2',
    phenomenonAndTheory:
      'El método de ajuste lineal por mínimos cuadrados encuentra la recta matemática que mejor representa una nube de datos experimentales. Al elevar al cuadrado las distancias verticales entre cada punto medido y la recta teórica, se minimiza el error total acumulado. En el riel de aire sin rozamiento, este método permite calcular experimentalmente el valor local de la aceleración de la gravedad a partir de la pendiente de la recta.',
    guideMetadata: {
      title: 'Laboratorio I de Física: Cinemática en Riel de Aire y Ajuste por Mínimos Cuadrados',
      area: 'Laboratorio I · UCV Ciencias',
      summary:
        'Linealización de datos cinemáticos, fórmulas de sumatorias de Gauss para pendiente y corte, coeficiente de correlación R² y determinación experimental de la aceleración gravitacional.',
    },
    glossary: [
      {
        term: 'Regresión Lineal por Mínimos Cuadrados',
        definition: 'Algoritmo estadístico que calcula la recta óptima y = mx + b minimizando la suma de los residuos al cuadrado.',
        symbolOrUnit: 'y = mx + b',
      },
      {
        term: 'Coeficiente de Correlación R²',
        definition: 'Número entre 0 y 1 que mide la calidad del ajuste: valores cercanos a 1 indican que los datos se adaptan fielmente a la recta.',
        symbolOrUnit: 'R² (adimensional)',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Pendiente de Ajuste Óptimo por Mínimos Cuadrados',
          latex: 'm = \\frac{N \\sum (x_i y_i) - (\\sum x_i)(\\sum y_i)}{N \\sum (x_i^2) - (\\sum x_i)^2}',
          application: 'Cálculo analítico de la pendiente a partir de N parejas de datos experimentales.',
        },
        {
          name: 'Punto de Corte con el Eje Vertical',
          latex: 'b = \\frac{\\sum y_i - m \\sum x_i}{N} = \\bar{y} - m \\bar{x}',
          application: 'Ordenada en el origen de la recta óptima.',
        },
      ],
      mnemonicsAndPatterns: [
        'Linealización Cinemática: La ecuación de posición x = (1/2) a t² es una curva cuadrática; para linealizarla, graficamos x en el eje Y y t² en el eje X, de modo que la pendiente de la recta resultante sea exactamente m = (1/2) a.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Cálculo de la Aceleración a partir de la Pendiente Linealizada',
        problemStatement: 'En un experimento con riel de aire se ajusta la recta x frente a t² y se obtiene una pendiente m = (2.45 ± 0.05) m/s². Calcular la aceleración.',
        deductiveSteps: [
          'La ecuación teórica de movimiento con velocidad inicial nula es x = (1/2) a t².',
          'Al graficar y = x y variable independiente u = t², la ecuación se convierte en la recta y = m u.',
          'Por comparación directa entre ambas ecuaciones: m = (1/2) a.',
          'Despejamos la aceleración multiplicando la pendiente por dos: a = 2 * m.',
          'Calculamos el valor central: a = 2 * 2.45 = 4.90 m/s².',
          'Calculamos la incertidumbre de la aceleración: Δa = 2 * Δm = 2 * 0.05 = 0.10 m/s².',
        ],
        finalResult: 'La aceleración experimental obtenida es a = (4.90 ± 0.10) m/s².',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Ajustar una recta sobre datos que forman una parábola sin haberlos linealizado previamente.',
        correction:
          'Nunca apliques mínimos cuadrados lineales sobre x vs t si el movimiento es acelerado. Debes calcular primero la columna t² y ajustar x frente a t².',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: ['Linealización de datos', 'Pendiente de mínimos cuadrados', 'Significado de R²'],
        notes: [
          'La linealización convierte relaciones potenciales y exponenciales en rectas fáciles de ajustar.',
          'Un R² superior a 0.99 confirma una correlación física muy alta.',
        ],
        summary: 'Los mínimos cuadrados son el puente matemático entre las hipótesis teóricas y las evidencias experimentales.',
      },
      conceptMapNodes: 'Datos Experimentales (x, t) -> Columna t² -> Sumatorias de Gauss -> Pendiente m y Corte b -> Aceleración',
      activeRecallFlashcards: [
        {
          front: 'Si al graficar la posición x frente al tiempo al cuadrado t² obtenemos una pendiente m, ¿cómo se halla la aceleración?',
          back: 'La aceleración es el doble de la pendiente: a = 2m (porque x = (1/2) a t²).',
        },
      ],
    },
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-lab1-airtrack'],
    researchPrompts: [SANTIAGO_RESEARCH_PROMPTS['santiago-prompt-lab1-airtrack']],
    generatedQuestions: [],
  },

  // =========================================================================
  // GUÍA 14: LABORATORIO I · EXAMEN PRÁCTICO Y ANÁLISIS METROLÓGICO
  // =========================================================================
  {
    id: 'santiago-lab1-exam-guide',
    evaluationEventId: 'santiago-lab1-examen',
    phenomenonAndTheory:
      'El examen práctico de laboratorio evalúa la destreza manual y analítica en tiempo real: medir con precisión instrumentos de taller, identificar y corregir errores sistemáticos de cero, estimar la apreciación correcta y propagar la incertidumbre final sin titubeos algebraicos.',
    guideMetadata: {
      title: 'Laboratorio I de Física: Examen Práctico de Medición, Calibración y Tratamiento de Datos',
      area: 'Laboratorio I · UCV Ciencias',
      summary:
        'Lectura en vivo de piezas mecánicas con micrómetro y vernier, corrección de errores de cero, cálculo rápido de densidades y trazado manual de rectas de ajuste con barras de error.',
    },
    glossary: [
      {
        term: 'Error de Cero del Instrumento',
        definition: 'Lectura no nula que marca el instrumento cuando sus mordazas están completamente cerradas; debe sumarse o restarse a todas las medidas posteriores.',
        symbolOrUnit: 'Δx_cero',
      },
    ],
    formulasAndStrategies: {
      coreFormulas: [
        {
          name: 'Corrección por Error de Cero',
          latex: 'x_{\\text{corregido}} = x_{\\text{leído}} - x_{\\text{cero}}',
          application: 'Eliminación del sesgo sistemático en instrumentos descalibrados.',
        },
      ],
      mnemonicsAndPatterns: [
        'Revisa el Cero Primero: Antes de medir cualquier pieza, junta las caras del micrómetro con el trinquete y anota si marca exactamente cero.',
      ],
    },
    stepByStepExamples: [
      {
        title: 'Corrección de Medida con Error de Cero Positivo',
        problemStatement: 'Un micrómetro marca +0.02 mm cuando está cerrado. Al medir el diámetro de una esfera marca 12.45 mm. ¿Cuál es el diámetro real corregido?',
        deductiveSteps: [
          'Identificamos el error sistemático de cero: xcero = +0.02 mm.',
          'Identificamos la lectura bruta del instrumento: xleído = 12.45 mm.',
          'Aplicamos la fórmula de corrección: xcorregido = xleído - xcero.',
          'Restamos el exceso: 12.45 mm - 0.02 mm = 12.43 mm.',
        ],
        finalResult: 'El diámetro real corregido de la esfera es 12.43 mm.',
      },
    ],
    commonErrorsAlerts: [
      {
        trap: 'Apretar el tornillo micrométrico con la rueda grande forzando la rosca en lugar de usar el trinquete.',
        correction:
          'Usa siempre la perilla pequeña del trinquete hasta que haga dos o tres clics; esto garantiza la misma presión en todas las lecturas sin deformar la pieza.',
      },
    ],
    studyTechniquesHub: {
      cornellSynthesis: {
        cues: ['Uso del trinquete', 'Corrección de cero', 'Barras de error en gráficas'],
        notes: [
          'La lectura del vernier se obtiene sumando la regla fija más el número de la línea del nonio que coincide multiplicado por la apreciación.',
        ],
        summary: 'La precisión metrológica depende tanto del cuidado instrumental como del tratamiento estadístico.',
      },
      conceptMapNodes: 'Pieza Real -> Verificación de Cero -> Medición con Trinquete -> Corrección Sistemática -> Informe Final',
      activeRecallFlashcards: [
        {
          front: '¿Cómo se lee la parte decimal en un calibrador vernier de 20 divisiones (apreciación 0.05 mm)?',
          back: 'Se busca cuál marca del nonio coincide perfectamente con una marca de la regla principal y se multiplica ese número por 0.05 mm.',
        },
      ],
    },
    multimediaResources: SANTIAGO_MULTIMEDIA_CATALOG['santiago-lab1-density'],
    generatedQuestions: [],
  },
];
