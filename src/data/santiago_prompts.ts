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
      'Python con Matplotlib y SciPy para graficación con barras de error',
      'OriginLab o SciDAVis para el ajuste por mínimos cuadrados',
      'Tracker Video Analysis para corroboración de fotogramas',
    ],
    purposeContext:
      'Respaldar la contrastación estadística entre datos empíricos y leyes cinemáticas en el laboratorio de mecánica.',
  },

  // 3. FÍSICA I: PROYECTO DE SIMULACIÓN MECÁNICA EN PYTHON
  'santiago-prompt-fis1-simulation': {
    id: 'santiago-prompt-fis1-simulation',
    evaluationId: 'santiago-fis1-proyecto',
    title: 'Proyecto de Simulación: Trayectorias Mecánicas con Resistencia del Aire en Python',
    deliverableType: 'proyecto_simulacion',
    deliverableLabel: 'Script en Python y Memoria Técnica de Simulación Física',
    promptText:
      'Quiero que analizando las ecuaciones diferenciales del movimiento balístico en dos dimensiones bajo la fuerza de rozamiento del aire proporcional a la velocidad y al cuadrado de la velocidad estructures el script completo en Python y la memoria explicativa del proyecto, aparte de que implementes el método de integración numérica de Euler-Cromer frente a Runge-Kutta de orden 4, generes las curvas comparativas de trayectoria con Matplotlib, calcules numéricamente el ángulo de disparo que maximiza el alcance horizontal y comentes cada bloque de código de forma clara, porque voy a presentar esta simulación como proyecto práctico y taller especial de la cátedra de Física I, esto para poder que el código se ejecute limpiamente en Google Colab o Jupyter sin dependencias pesadas y exporte los gráficos en formato vectorial de alta calidad.',
    targetAudience: 'Facultad de Ciencias UCV · Escuela de Física',
    outputRequirements: [
      'Código modular en Python con funciones separadas para cálculo de derivadas, bucle de integración y graficación.',
      'Explicación sencilla del criterio de estabilidad del paso de tiempo dt en el integrador numérico.',
      'Tabla comparativa del alcance máximo para 5 ángulos distintos con y sin resistencia del aire.',
      'Cero saludos ni introducciones genéricas en la respuesta.',
    ],
    suggestedTools: [
      'Google Colab / Jupyter Notebook para ejecución interactiva',
      'Python con NumPy y Matplotlib para integración y gráficos',
      'VS Code con extensión de Python',
    ],
    purposeContext:
      'Construir un modelo computacional reutilizable para simular fenómenos mecánicos continuos sin solución analítica simple.',
  },

  // 4. CÁLCULO I: TRABAJO DE MODELADO Y OPTIMIZACIÓN
  'santiago-prompt-calc1-modeling': {
    id: 'santiago-prompt-calc1-modeling',
    evaluationId: 'santiago-calc1-taller',
    title: 'Trabajo de Modelado: Optimización Geométrica y Física con Criterios de Derivada',
    deliverableType: 'trabajo_escrito',
    deliverableLabel: 'Deducción Matemática Formal de Optimización',
    promptText:
      'Quiero que analizando el problema de diseño de un contenedor cilíndrico cerrado de costo mínimo con volumen fijo y materiales de diferente costo para la base y el cuerpo lateral armes la solución analítica completa y formal, aparte de que definas con precisión la función objetivo en una sola variable, calcules la primera y segunda derivada para localizar y verificar el mínimo absoluto, fundamentes la solución con el Teorema del Valor Extremo de Weierstrass en un intervalo cerrado admisible y muestres la relación óptima entre la altura y el radio de la base, porque voy a incorporar este trabajo de modelado como taller evaluado de Cálculo I, esto para poder que me sirva de plantilla rigurosa para abordar cualquier problema de optimización en los exámenes parciales.',
    targetAudience: 'Facultad de Ciencias UCV · Departamento de Matemáticas',
    outputRequirements: [
      'Planteamiento inicial claro indicando variables, restricciones geométricas y dominio físico de las magnitudes.',
      'Deducción paso a paso de los puntos críticos igualando la derivada a cero con álgebra impecable.',
      'Verificación formal de la concavidad mediante el criterio de la segunda derivada.',
      'Conclusión geométrica que resuma la proporción final entre las dimensiones del contenedor.',
    ],
    suggestedTools: [
      'GeoGebra para graficar la función de costo y visualizar el punto mínimo',
      'Overleaf / LaTeX para la redacción final',
      'Wolfram Alpha para comprobación simbólica',
    ],
    purposeContext:
      'Demostrar la aplicación del cálculo infinitesimal en problemas de optimización real con fundamento analítico riguroso.',
  },

  // 5. ÁLGEBRA LINEAL: TALLER DE TRANSFORMACIONES LINEALES Y GRÁFICA VECTORIAL
  'santiago-prompt-alg1-workshop': {
    id: 'santiago-prompt-alg1-workshop',
    evaluationId: 'santiago-alg1-taller',
    title: 'Taller Práctico: Transformaciones Lineales, Matrices de Rotación y Autovectores en ℝ³',
    deliverableType: 'taller_practico',
    deliverableLabel: 'Guía de Resolución y Modelado Vectorial en el Espacio',
    promptText:
      'Quiero que analizando una rotación espacial de ángulo theta alrededor de un eje arbitrario en ℝ³ estructures la memoria técnica de resolución para el taller práctico de transformaciones lineales, aparte de que construyas la matriz de rotación de Rodrigues paso a paso, calcules su determinante para comprobar que preserva longitudes y orientaciones, obtengas sus valores y vectores propios demostrando que el autovector con autovalor 1 corresponde al eje de giro y vincules este resultado con la rotación de cuerpos rígidos en física, porque voy a entregar este taller evaluado en la cátedra de Álgebra Lineal y Geometría Analítica, esto para poder que la conexión entre matrices y rotaciones tridimensionales quede clara tanto para física como para programación gráfica.',
    targetAudience: 'Facultad de Ciencias UCV · Departamento de Matemáticas',
    outputRequirements: [
      'Fórmulas matriciales completas escritas en notación LaTeX sin omisión de coeficientes.',
      'Demostración explícita de que la matriz es ortogonal verificando que su transpuesta es igual a su inversa.',
      'Explicación conceptual sin jerga excesiva de por qué todo giro en el espacio tiene al menos un eje invariante.',
      'Cero rodeos conversacionales ni preámbulos robóticos.',
    ],
    suggestedTools: [
      'SymPy en Python para cálculo simbólico de autovalores y determinantes',
      'GeoGebra 3D para graficar el eje de rotación y el vector transformado',
      'Jupyter Notebook para documentación interactiva',
    ],
    purposeContext:
      'Dominar el tratamiento matricial de giros en el espacio euclidiano y su aplicación directa a la física del sólido rígido.',
  },

  // 6. ANDRÉS RIVERO - BIOLOGÍA: INFORME DE MÁQUINAS SIMPLES EN EL CUERPO
  'andres-prompt-bio-machines': {
    id: 'andres-prompt-bio-machines',
    evaluationId: 'andres-bio-03',
    title: 'Informe Escolar: Máquinas Simples en la Naturaleza y el Cuerpo Humano',
    deliverableType: 'trabajo_escrito',
    deliverableLabel: 'Guion e Informe Escolar para Exposición en Láminas',
    promptText:
      'Quiero que analizando cómo funcionan los huesos y los músculos como palancas armes el guion de exposición y el informe escolar para Andrés sobre máquinas simples en el cuerpo, aparte de que me expliques con ejemplos cotidianos como masticar un trozo de pan, pararse de puntillas o levantar una mochila dónde se ubican el punto de apoyo, la fuerza que hace el músculo y la resistencia en cada una de las tres clases de palancas, porque Andrés va a defender este tema frente a sus compañeros en el colegio Consolación, esto para poder que él lo entienda con palabras claras de su edad, se aprenda las partes rápido y conteste con total seguridad las preguntas del profesor.',
    targetAudience: '1er Año de Bachillerato · Educación Media General',
    outputRequirements: [
      'Lenguaje simple, cercano y motivador adaptado a un estudiante de 12 años sin tecnicismos innecesarios.',
      'Tres ejemplos claros y visuales: la cabeza como palanca de 1er grado, el pie como palanca de 2do grado y el brazo como palanca de 3er grado.',
      'Puntos cortos y directos para colocar en las láminas de papel bond sin párrafos saturados.',
      'Una pequeña sección de preguntas probables del profesor con sus respuestas sencillas en dos líneas.',
    ],
    suggestedTools: [
      'Papel bond con marcadores y dibujos a color',
      'Maqueta simple de cartón con chinches para mostrar el brazo doblándose',
      'Fichas de cartulina para recordar los puntos al exponer',
    ],
    purposeContext:
      'Asegurar que Andrés comprenda la física básica del cuerpo humano de forma entretenida y obtenga la máxima nota en su exposición.',
  },

  // 7. ANDRÉS RIVERO - CASTELLANO: ANÁLISIS LITERARIO DE BARRABÁS
  'andres-prompt-cast-barrabas': {
    id: 'andres-prompt-cast-barrabas',
    evaluationId: 'andres-cast-01',
    title: 'Análisis Literario: Cuento "Barrabás" de Arturo Uslar Pietri',
    deliverableType: 'analisis_literario',
    deliverableLabel: 'Guía de Preguntas y Análisis Literario Escolar',
    promptText:
      'Quiero que analizando el cuento Barrabás de Arturo Uslar Pietri estructures el trabajo de análisis literario escolar para el cuaderno de Andrés, aparte de que expliques el tema central de la culpa y la libertad, identifiques quién es el narrador, describas la personalidad de Barrabás frente a la multitud y prepares un glosario con las cinco palabras venezolanas o literarias más difíciles del cuento, porque Andrés debe entregar este informe escrito a mano con las pautas de su profesor de Castellano, esto para poder que comprenda bien la historia humana que cuenta el autor y redacte sus respuestas con buena letra, excelente ortografía y oraciones ordenadas.',
    targetAudience: '1er Año de Bachillerato · Colegio Consolación',
    outputRequirements: [
      'Respuestas breves y ordenadas a las preguntas clásicas de lectura: tema, argumento, personajes principales y secundarios.',
      'Glosario de 5 palabras del cuento explicadas de manera sencilla para su edad.',
      'Una reflexión de tres líneas sobre la lección moral que deja el relato.',
      'Pautas de presentación cuidando los márgenes rojos y el membrete oficial del colegio.',
    ],
    suggestedTools: [
      'Cuaderno escolar reglamentario de una línea',
      'Bolígrafo azul y regla para márgenes',
      'Diccionario de la Real Academia Española para corroborar significados',
    ],
    purposeContext:
      'Facilitar a Andrés la lectura crítica de la literatura venezolana y mejorar su capacidad de redacción estructurada.',
  },
};
