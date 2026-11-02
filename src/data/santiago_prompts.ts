/**
 * @file santiago_prompts.ts
 * @description Banco Oficial de Prompts de Investigación y Elaboración (Arquitectura Santiago Rivero).
 * 
 * Sigue estrictamente la especificación de voz, estilo y flujo de 4 bloques continuos:
 * 1. Disparador de Acción + Método de Entrada ("Quiero que analizando [X] escribas/armes...")
 * 2. Especificación del Entregable + Sub-requisitos ("...aparte de que...")
 * 3. El "Por Qué" Arquitectónico ("...porque voy a...")
 * 4. La Meta de Automatización / Escalabilidad ("...esto para poder que...")
 * 
 * Reglas de Redacción del Usuario:
 * - Lenguaje no más técnico de lo debido manteniendo un tono simple mas no informal (Builder-to-Builder).
 * - Cero subdivisiones anidadas dentro de los puntos (listas planas directas de un solo nivel).
 * - Cero relleno conversacional ni saludos de cortesía robóticos.
 */

import type { SantiagoResearchPrompt } from '../types/deconstruction.types';

export const SANTIAGO_RESEARCH_PROMPTS: Record<string, SantiagoResearchPrompt> = {
  // =========================================================================
  // FÍSICA I & LABORATORIO
  // =========================================================================

  // 1. INFORME DE LABORATORIO #1: DENSIDAD E INCERTIDUMBRES
  'santiago-prompt-lab1-density': {
    id: 'santiago-prompt-lab1-density',
    evaluationId: 'santiago-lab1-informe-1',
    title: 'Informe de Laboratorio #1: Medición de Densidad y Propagación de Incertidumbres',
    deliverableType: 'informe_laboratorio',
    deliverableLabel: 'Informe Científico Formal con Propagación de Gauss',
    promptText:
      'Quiero que analizando las tablas de mediciones directas de masa y dimensiones tomadas con el calibrador vernier y el micrómetro me armes el informe formal de laboratorio sobre el cálculo experimental de la densidad, aparte de que calcules paso a paso las derivadas parciales de la propagación en cuadratura de Gauss, redondees la incertidumbre absoluta a una sola cifra significativa, verifiques que la medida conserve los mismos decimales de su error y añadas un análisis directo de las fuentes de error sistemático y aleatorio, porque voy a entregar este informe como primera práctica evaluada en la Escuela de Física de la Facultad de Ciencias de la UCV, esto para poder que el profesor revise los cálculos con total claridad metodológica y sin tachaduras en el manejo de cifras significativas.',
    targetAudience: 'Facultad de Ciencias UCV · Escuela de Física',
    outputRequirements: [
      'Estructura directa sin saludos iniciales: Título conciso, Resumen en un párrafo, Tabla de datos directos con apreciación instrumental, Deducción analítica de la propagación de errores, Resultados redondeados y Conclusiones físicas.',
      'Todas las fórmulas matemáticas en notación LaTeX limpia y legible.',
      'Cálculo explícito del error porcentual frente al valor de referencia del material medido.',
      'Discusión física clara explicando si el error predominante proviene del instrumento o de la técnica de medición.',
    ],
    suggestedTools: [
      'SciDAVis o Python con NumPy para cálculo de medias y desviaciones estándar',
      'Overleaf / LaTeX para maquetación tipográfica de fórmulas',
      'Hoja de cálculo para tablas de datos crudos',
    ],
    purposeContext:
      'Garantizar la entrega del primer paper experimental de física con rigor metrológico y formato universitario oficial.',
  },

  // 2. INFORME DE LABORATORIO #2: RIEL DE AIRE Y MÍNIMOS CUADRADOS
  'santiago-prompt-lab1-airtrack': {
    id: 'santiago-prompt-lab1-airtrack',
    evaluationId: 'santiago-lab1-informe-2',
    title: 'Informe de Laboratorio #2: Cinemática en Riel de Aire y Ajuste por Mínimos Cuadrados',
    deliverableType: 'informe_laboratorio',
    deliverableLabel: 'Informe de Regresión Lineal y Cinemática Experimental',
    promptText:
      'Quiero que analizando las posiciones y tiempos registrados por las fotoceldas del riel de aire a lo largo de la pista armes el informe completo del experimento de movimiento uniformemente acelerado, aparte de que apliques el método de ajuste lineal por mínimos cuadrados sobre la gráfica de posición frente a tiempo al cuadrado, calcules la pendiente m con su incertidumbre, obtengas el punto de corte b, determines el coeficiente de correlación R² y compares la aceleración experimental con la aceleración teórica de la gravedad, porque voy a defender este informe en la mesa docente de laboratorio de física, esto para poder que la demostración empírica de las ecuaciones de movimiento sea irrefutable y quede demostrada la validez del modelo sin ambigüedades.',
    targetAudience: 'Facultad de Ciencias UCV · Escuela de Física',
    outputRequirements: [
      'Presentación limpia de las sumatorias de Gauss empleadas para hallar la pendiente y el punto de corte.',
      'Gráfica linealizada con indicación de las barras de incertidumbre experimental en cada punto.',
      'Comparación porcentual de discrepancia entre la aceleración medida y el valor local de g en Caracas (9.78 m/s²).',
      'Análisis breve del rozamiento residual con el cojín de aire y posibles descalibraciones en la nivelación del riel.',
    ],
    suggestedTools: [
      'Python con SciPy y Matplotlib para la regresión y gráfico con barras de error',
      'Plantilla institucional de informes de la Escuela de Física UCV',
    ],
    purposeContext:
      'Demostrar capacidad analítica en el procesamiento estadístico de datos cinemáticos y ajuste de modelos.',
  },

  // 3. FÍSICA I: DINÁMICA NEWTONIANA Y COEFICIENTES DE FRICCIÓN
  'santiago-prompt-fis1-newton': {
    id: 'santiago-prompt-fis1-newton',
    evaluationId: 'santiago-fis1-parcial-2',
    title: 'Taller de Dinámica Newtoniana: Diagramas de Cuerpo Libre y Fricción',
    deliverableType: 'taller_practico',
    deliverableLabel: 'Resolución Rigurosa de Sistemas de Partículas Conectadas',
    promptText:
      'Quiero que analizando el sistema mecánico de bloques conectados con cuerdas y poleas sobre planos inclinados con fricción estática y cinética desarrolles la guía completa de resolución paso a paso, aparte de que dibujes y describas cada diagrama de cuerpo libre aislando cada cuerpo, proyectes las sumatorias de fuerzas en los ejes perpendicular y paralelo a la aceleración, determines la condición de desprendimiento de movimiento inminente y calcules la tensión en las cuerdas sin saltarte ningún despeje algebraico, porque voy a presentar este taller evaluado ante el departamento de física, esto para poder que cualquier evaluador compruebe que el equilibrio dinámico fue planteado con impecable coherencia vectorial.',
    targetAudience: 'Facultad de Ciencias UCV · Escuela de Física',
    outputRequirements: [
      'Aislamiento individual de cada masa con enumeración explícita de fuerzas reales de contacto y campo.',
      'Elección de sistemas de coordenadas con el eje x orientado en el sentido predicho de la aceleración.',
      'Diferenciación matemática clara entre fricción estática máxima y fricción cinética en movimiento.',
      'Comprobación dimensional final de las fórmulas obtenidas para la aceleración y las tensiones.',
    ],
    suggestedTools: [
      'GeoGebra para esquemas de planos inclinados y vectores de fuerza',
      'LaTeX / KaTeX para desarrollo algebraico paso a paso',
    ],
    purposeContext:
      'Asegurar el dominio total del modelado vectorial newtoniano para el segundo parcial de Física I.',
  },

  // 4. FÍSICA I: TRABAJO Y ENERGÍA MECÁNICA
  'santiago-prompt-fis1-energia': {
    id: 'santiago-prompt-fis1-energia',
    evaluationId: 'santiago-fis1-parcial-3',
    title: 'Informe de Simulación: Trabajo, Teorema de Fuerzas Vivas y Conservación de Energía',
    deliverableType: 'informe_laboratorio',
    deliverableLabel: 'Modelado Energético de Sistemas Mecánicos Conservativos y Disipativos',
    promptText:
      'Quiero que analizando la trayectoria de una partícula que desliza sobre una pista curva con un resorte al final y un tramo intermedio con rugosidad me redactes la memoria de cálculo del balance energético global, aparte de que calcules el trabajo de la fuerza de fricción por integral de línea, apliques el teorema del trabajo y la energía cinética para hallar la velocidad justo antes de comprimir el resorte, determines la compresión máxima y construyas la gráfica cualitativa de energía potencial frente a posición identificando los puntos de retorno, porque voy a defender este análisis en la entrega final de física mecánica, esto para poder que se demuestre con precisión cómo se disipa la energía mecánica y cómo operan las fuerzas conservativas.',
    targetAudience: 'Facultad de Ciencias UCV · Escuela de Física',
    outputRequirements: [
      'Planteamiento del balance global de energía mecánica con trabajo no conservativo claramente separado.',
      'Cálculo analítico del punto de máxima compresión resolviendo la ecuación cuadrática correspondiente.',
      'Identificación de los estados de equilibrio a partir de la primera y segunda derivada del potencial.',
      'Gráfica conceptual de curvas de energía total, energía potencial gravitatoria y elástica.',
    ],
    suggestedTools: [
      'Simulador PhET Pista de Patinar y Energía',
      'Python con Matplotlib para trazar curvas de energía potencial y líneas de energía total',
    ],
    purposeContext:
      'Garantizar la máxima calificación en el tercer parcial y taller de integración energética de Física I.',
  },

  // =========================================================================
  // MATEMÁTICA I (MÉTODOS DE GRAFICACIÓN · PEDRO ALSON)
  // =========================================================================

  // 5. MATEMÁTICA I: ESTUDIO DE CURVAS
  'santiago-prompt-mat1-curvas': {
    id: 'santiago-prompt-mat1-curvas',
    evaluationId: 'santiago-mat1-parcial-1',
    title: 'Taller de Estudio de Curvas: Caminos de Ida, Vuelta y Síntesis Gráfica',
    deliverableType: 'taller_practico',
    deliverableLabel: 'Monografía Práctica de Métodos de Graficación de Pedro Alson',
    promptText:
      'Quiero que analizando el conjunto de condiciones geométricas sobre dominio, cotas, monotonía, extremos locales y signos de una función desconocida me diseñes la reconstrucción gráfica paso a paso de la curva continua según el método de Pedro Alson, aparte de que traces con exactitud el camino de ida para evaluar puntos de control, el camino de vuelta para hallar preimágenes sobre el eje de abscisas, marques las soluciones de cortes con rectas horizontales y justifiques la imposibilidad de cruces fuera de los intervalos permitidos, porque voy a resolver el primer parcial de Matemática I en Ciencias UCV, esto para poder que la curva cumpla simultáneamente cada restricción sin inventar curvaturas artificiales y con total rigor visual.',
    targetAudience: 'Facultad de Ciencias UCV · Departamento de Matemáticas',
    outputRequirements: [
      'Tabla resumen con intervalos de crecimiento, decrecimiento, signos y cotas superiores e inferiores.',
      'Dibujo esquemático limpio con ejes rotulados, asíntotas punteadas y puntos notables con coordenadas exactas.',
      'Demostración visual del camino de ida y vuelta para preimágenes de valores dados en el enunciado.',
      'Redacción directa justificando por qué no existen más ramas de acuerdo al dominio estipulado.',
    ],
    suggestedTools: [
      'GeoGebra / Desmos para verificación interactiva de la gráfica reconstruida',
      'Texto canonical "Métodos de Graficación" de Pedro Alson (Editorial ERRO)',
    ],
    purposeContext:
      'Dominar el lenguaje gráfico de curvas para responder sin dudas el Parcial 1 de Matemática I.',
  },

  // 6. MATEMÁTICA I: OPERACIONES CON CURVAS
  'santiago-prompt-mat1-operaciones': {
    id: 'santiago-prompt-mat1-operaciones',
    evaluationId: 'santiago-mat1-taller-operaciones',
    title: 'Taller de Operaciones con Curvas: Suma, Producto, Recíproca y Composición',
    deliverableType: 'taller_practico',
    deliverableLabel: 'Guía de Síntesis Geométrica de Operaciones Funcionales',
    promptText:
      'Quiero que analizando dos curvas base f(x) y g(x) dibujadas en el mismo sistema de coordenadas desarrolles la construcción gráfica directa de su suma, producto, curva recíproca 1/f(x) y composición g(f(x)), aparte de que ubiques los ceros de la función recíproca como asíntotas verticales, analices los signos por cuadrantes en el producto, utilices la recta auxiliar de la bisectriz y = x para la composición y destaques el comportamiento en las vecindades de más y menos infinito, porque voy a presentar este taller como asignación obligatoria de Matemática I, esto para poder que la gráfica resultante quede perfectamente deducida sin necesidad de tabular punto por punto.',
    targetAudience: 'Facultad de Ciencias UCV · Escuela de Física',
    outputRequirements: [
      'Reglas de transformación explícitas: cómo los ceros de f(x) se vuelven polos de 1/f(x) y los máximos se vuelven mínimos.',
      'Construcción visual paso a paso de la curva suma mediante la adición geométrica de ordenadas.',
      'Trazado del camino de la bisectriz y = x para transferir valores del eje y al eje x en la función compuesta.',
      'Identificación clara de las asíntotas horizontales resultantes del cociente de grados asintóticos.',
    ],
    suggestedTools: [
      'GeoGebra clásico para visualización en capas de operaciones funcionales',
      'Lápiz de dos colores para diferenciar curvas base de la curva operada',
    ],
    purposeContext:
      'Adquirir agilidad intuitiva en la deducción de curvas compuestas y recíprocas en exámenes de tiempo limitado.',
  },

  // 7. MATEMÁTICA I: TECLAS Y PANTALLAS (LINEALIZACIÓN)
  'santiago-prompt-mat1-teclas': {
    id: 'santiago-prompt-mat1-teclas',
    evaluationId: 'santiago-mat1-parcial-2',
    title: 'Guía de Despeje y Linealización: Modelo de Teclas y Pantallas de Pedro Alson',
    deliverableType: 'trabajo_escrito',
    deliverableLabel: 'Cuaderno Metodológico de Despeje Algebraico y Funciones Inversas',
    promptText:
      'Quiero que analizando expresiones algebraicas con múltiples apariciones de la variable independiente me estructures el procedimiento completo de diagramas de teclas y pantallas, aparte de que conviertas diagramas ramificados en diagramas lineales mediante completación de cuadrados, traces el camino inverso de operaciones elementales para despejar la incógnita de forma inequívoca y verifiques las restricciones de dominio que surgen en cada tecla inversora, porque voy a defender este método en la evaluación de Álgebra y Funciones de Matemática I, esto para poder que cualquier ecuación cuadrática o racional se resuelva mecánicamente y sin cometer errores de signos ni omitir ramas de solución.',
    targetAudience: 'Facultad de Ciencias UCV · Escuela de Física',
    outputRequirements: [
      'Esquema visual de bloques (tecla de suma, tecla de multiplicación, tecla de potencia, tecla recíproca).',
      'Desarrollo algebraico paso a paso de la completación de trinomio cuadrado perfecto.',
      'Cadena de operaciones directas e inversas indicando las pantallas intermedias y sus rangos válidos.',
      'Ejemplo completamente resuelto con comprobación por sustitución numérica directa.',
    ],
    suggestedTools: [
      'Mermaid / Flowcharts para diagramas de bloques y pantallas',
      'Texto de Pedro Alson Capítulo 3 (Teclas y Fórmulas)',
    ],
    purposeContext:
      'Asegurar el 100% de la puntuación en problemas de despeje y funciones inversas de los parciales de la UCV.',
  },

  // 8. MATEMÁTICA I: HIPÉRBOLAS, RECTAS E INECUACIONES
  'santiago-prompt-mat1-inecuaciones': {
    id: 'santiago-prompt-mat1-inecuaciones',
    evaluationId: 'santiago-mat1-parcial-2',
    title: 'Taller de Hipérbolas Homográficas, Inecuaciones Gráficas y Transformadas',
    deliverableType: 'taller_practico',
    deliverableLabel: 'Resolución Visual de Inecuaciones y Familias de Curvas Canónicas',
    promptText:
      'Quiero que analizando la función homográfica f(x) = (ax + b)/(cx + d) y una familia de rectas me armes la resolución gráfica completa de la inecuación f(x) >= g(x), aparte de que descompongas la hipérbola en su forma canónica v + k/(x - h) mediante división sintética, ubiques sus asíntotas ortogonales, calcules el área de los triángulos bajo las tangentes y sombres con precisión sobre el eje real el conjunto solución de la desigualdad, porque voy a resolver el segundo parcial oficial de Matemática I, esto para poder que la solución quede expresada como unión exacta de intervalos abiertos y cerrados sin depender de tablas mecánicas de signos.',
    targetAudience: 'Facultad de Ciencias UCV · Escuela de Física',
    outputRequirements: [
      'Cálculo explícito de los parámetros canónicos de la hipérbola: asíntota vertical h, horizontal v y factor k.',
      'Boceto gráfico identificando los puntos de corte entre la recta y la hipérbola resolviendo la ecuación cuadrática.',
      'Sombreado en el gráfico de las regiones donde la curva superior satisface la desigualdad.',
      'Expresión formal del conjunto solución en notación conjuntista y de intervalos reales.',
    ],
    suggestedTools: [
      'GeoGebra para cálculo de intersecciones y áreas de triángulos geométricos',
      'Exámenes resueltos del Juego de Parciales UCV',
    ],
    purposeContext:
      'Dominar el problema clásico de hipérbolas y rectas que aparece con 6 puntos fijos en el Parcial 2 de Ciencias.',
  },

  // =========================================================================
  // PRINCIPIOS DE QUÍMICA I (CÓDIGO 3401 UCV)
  // =========================================================================

  // 9. QUÍMICA I: MEDIDAS, DENSIDAD Y CIFRAS SIGNIFICATIVAS
  'santiago-prompt-qgi-medidas': {
    id: 'santiago-prompt-qgi-medidas',
    evaluationId: 'santiago-qgi-informe-1',
    title: 'Informe de Laboratorio de Química: Medidas de Masa, Volumen y Densidad de Sólidos y Líquidos',
    deliverableType: 'informe_laboratorio',
    deliverableLabel: 'Reporte Experimental de Metrología Química y Cifras Significativas',
    promptText:
      'Quiero que analizando las pesadas en balanza analítica y las lecturas de volumen en probeta graduada, pipeta volumétrica y bureta armes el informe formal de determinación de densidad de muestras metálicas desconocidas y disoluciones de sacarosa, aparte de que apliques rigurosamente el análisis dimensional con factores de conversión en cadena, conserves las cifras significativas correctas en cada operación, calcules la desviación estándar de la densidad promedio y evalúes la exactitud mediante el porcentaje de error relativo frente a la tabla periódica, porque voy a entregar este reporte en el Laboratorio de Principios de Química I de la Facultad de Ciencias, esto para poder que el preparador certifique el manejo pulcro de instrumentos de vidrio y el rigor analítico de los datos.',
    targetAudience: 'Facultad de Ciencias UCV · Escuela de Química',
    outputRequirements: [
      'Tabla de datos primarios con apreciación de balanza (±0.0001 g) y material volumétrico.',
      'Cálculo de volumen por desplazamiento de agua (método de Arquímedes) y por geometría con propagación.',
      'Cálculo de densidad en g/mL y conversión a unidades SI (kg/m³) con factores en cadena.',
      'Identificación del metal problema por comparación de densidad experimental con valores estándar.',
    ],
    suggestedTools: [
      'Hoja de cálculo para promedio y desviación estándar muestral',
      'Manual de Prácticas de Principios de Química I UCV',
    ],
    purposeContext:
      'Asegurar el cumplimiento estricto de las normas de reporte de datos en el primer laboratorio de química.',
  },

  // 10. QUÍMICA I: ESTEQUIOMETRÍA, REACTIVO LIMITANTE Y RENDIMIENTO
  'santiago-prompt-qgi-estequiometria': {
    id: 'santiago-prompt-qgi-estequiometria',
    evaluationId: 'santiago-qgi-parcial-2',
    title: 'Taller de Estequiometría de Reacción: Reactivo Limitante, Pureza y Rendimiento',
    deliverableType: 'taller_practico',
    deliverableLabel: 'Resolución Algorítmica de Problemas de Masas y Reacciones Químicas',
    promptText:
      'Quiero que analizando una reacción química de síntesis inorgánica con reactivos impuros y cantidades molares no estequiométricas me estructures la resolución analítica completa del proceso, aparte de que balances la ecuación por tanteo y método algebraico, corrijas las masas iniciales por el porcentaje de pureza de las materias primas, determines matemáticamente cuál es el reactivo limitante comparando la relación mol/coeficiente, calcules la masa teórica del precipitado formado, obtengas la masa en gramos que sobra del reactivo en exceso y determines el rendimiento porcentual si se recolectó una masa experimental dada, porque voy a resolver la sección práctica del segundo parcial de Principios de Química I, esto para poder que la cadena de conversiones mol-gramo sea lineal, clara y sin suposiciones ambiguas.',
    targetAudience: 'Facultad de Ciencias UCV · Escuela de Química',
    outputRequirements: [
      'Ecuación química balanceada con estados de agregación explícitos (sólido, acuoso, gas, líquido).',
      'Cuadro I-C-F (Inicio, Cambio, Final) con cantidades expresadas en moles para cada especie.',
      'Deducción inequívoca del reactivo limitante mostrando el cálculo comparativo directo.',
      'Cálculo final del porcentaje de rendimiento con desglose de posibles pérdidas mecánicas por filtración o secado.',
    ],
    suggestedTools: [
      'Tabla Periódica IUPAC con masas atómicas a 4 cifras significativas',
      'Calculadora científica con memoria de factores estequiométricos',
    ],
    purposeContext:
      'Garantizar la máxima calificación en los problemas de estequiometría cuantitativa del Parcial 2.',
  },

  // 11. QUÍMICA I: DISOLUCIONES Y REACCIONES ACUOSAS (REDOX)
  'santiago-prompt-qgi-disoluciones': {
    id: 'santiago-prompt-qgi-disoluciones',
    evaluationId: 'santiago-qgi-parcial-3',
    title: 'Taller de Reacciones en Disolución: Titulaciones Ácido-Base y Balanceo Redox por Ion-Electrón',
    deliverableType: 'taller_practico',
    deliverableLabel: 'Cuaderno Analítico de Neutralización, Solubilidad y Óxido-Reducción',
    promptText:
      'Quiero que analizando una muestra acuosa que contiene una sal precipitante y un analito susceptible a oxidación redactes la guía completa de reacciones químicas en fase acuosa, aparte de que escribas la ecuación molecular, la iónica total y la iónica neta aplicando las reglas de solubilidad de sales, balances paso a paso la reacción de óxido-reducción mediante el método del ion-electrón en medio ácido mostrando las semirreacciones de oxidación y reducción con balance de masa y carga, y calcules la concentración molar y normal en una titulación volumétrica en el punto de equivalencia, porque voy a presentar el tercer parcial de Principios de Química I, esto para poder que no se confundan los electrones transferidos ni los iones espectadores en disolución.',
    targetAudience: 'Facultad de Ciencias UCV · Escuela de Química',
    outputRequirements: [
      'Identificación clara de los estados de oxidación de cada átomo antes y después de la reacción.',
      'Desglose ordenado del método ion-electrón: balance de átomos distintos a O y H, balance de O con H₂O, balance de H con H⁺ y balance de carga con electrones.',
      'Multiplicación cruzada para cancelar electrones y suma de semirreacciones para obtener la ecuación global neta.',
      'Cálculo estequiométrico de titulación relacionando moles de ácido consumidos con moles de base.',
    ],
    suggestedTools: [
      'Guía oficial de Principios de Química I UCV (Código 3401)',
      'Ejercicios del libro de Liliana López (Química General I UCV)',
    ],
    purposeContext:
      'Dominar el balanceo redox y los cálculos de disoluciones que representan el 40% del Parcial 3.',
  },

  // 12. QUÍMICA I: GASES Y PROPIEDADES COLIGATIVAS
  'santiago-prompt-qgi-gases': {
    id: 'santiago-prompt-qgi-gases',
    evaluationId: 'santiago-qgi-parcial-3',
    title: 'Informe Analítico: Leyes de Gases, Mezclas con Vapor de Agua y Propiedades Coligativas',
    deliverableType: 'informe_laboratorio',
    deliverableLabel: 'Reporte Fisicoquímico de Gases Ideales, Reales y Disoluciones',
    promptText:
      'Quiero que analizando los datos de un gas generado en matraz y recolectado sobre agua a temperatura ambiente desarrolles el análisis termodinámico y cuantitativo del sistema gaseoso, aparte de que corrijas la presión barométrica restando la presión de vapor del agua para obtener la presión del gas seco por la ley de Dalton, calcules los moles generados con la ecuación de gas ideal PV = nRT, compares la masa molar obtenida con la masa molar teórica, expliques las desviaciones esperadas a altas presiones mediante los términos correctivos a y b de la ecuación de Van der Waals, y calcules el descenso del punto de congelación de la disolución resultante empleando la constante crioscópica y el factor de van t Hoff, porque voy a entregar esta asignación evaluada en Principios de Química I, esto para poder que la transición de modelos ideales a modelos reales quede sólidamente fundamentada.',
    targetAudience: 'Facultad de Ciencias UCV · Escuela de Química',
    outputRequirements: [
      'Corrección meticulosa de presiones: P_seco = P_atmosférica - P_vapor(T) con unidades coherentes.',
      'Cálculo de densidad del gas y masa molar mediante la ecuación modificada M = (rho * R * T) / P.',
      'Discusión física concisa sobre el significado molecular del parámetro a (atracción) y b (covolumen) en Van der Waals.',
      'Aplicación de la fórmula crioscópica Delta T_f = K_f * m * i con cálculo previo de la molalidad de la solución.',
    ],
    suggestedTools: [
      'Tabla de presión de vapor de agua líquida en función de la temperatura',
      'Calculadora con constantes fisicoquímicas R = 0.08206 atm L / (mol K)',
    ],
    purposeContext:
      'Asegurar el entendimiento cuantitativo de sistemas de fases gas y disolución para el examen final.',
  },
};
