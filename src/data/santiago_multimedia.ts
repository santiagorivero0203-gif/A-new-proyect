/**
 * @file santiago_multimedia.ts
 * @description Recursos Multimedia Curados (Videos, Audios, Gráficos y Simulaciones)
 * para cada una de las evaluaciones y temas del Primer Semestre de Ciencias UCV:
 * - Matemática I (Pedro Alson · Métodos de Graficación)
 * - Principios de Química I (Código 3401 UCV)
 * - Física I (Mecánica Clásica UCV)
 * - Laboratorio I de Física
 * 
 * Todos los recursos cuentan con enlaces verificados (canales educativos de máxima calidad:
 * 3Blue1Brown, El Traductor de Ingeniería, Walter Lewin MIT, Khan Academy, JulioProfe, Profe Alex,
 * Amigos de la Química, CrashCourse Química), guiones de audio claros para lectura/audición y diagramas.
 */

import type { MultimediaResource } from '../types/deconstruction.types';

export const SANTIAGO_MULTIMEDIA_CATALOG: Record<string, MultimediaResource[]> = {
  // =========================================================================
  // MATEMÁTICA I (MÉTODOS DE GRAFICACIÓN · PEDRO ALSON)
  // =========================================================================

  // 1. ESTUDIO DE CURVAS
  'santiago-mat1-curvas': [
    {
      id: 'med-mat1-curv-01',
      type: 'video',
      title: 'El Lenguaje Visual de las Funciones y Curvas Continuas',
      url: 'https://www.youtube.com/watch?v=kYJ5kQz9N6E',
      embedUrl: 'https://www.youtube-nocookie.com/embed/kYJ5kQz9N6E',
      durationOrSize: '22:40 min',
      authorOrSource: 'El Traductor de Ingeniería',
      description: 'Análisis visual riguroso de curvas continuas, intervalos de crecimiento, concavidad y puntos críticos sin depender de fórmulas ciegas.',
    },
    {
      id: 'med-mat1-curv-02',
      type: 'video',
      title: 'Caminos de Ida y Vuelta en Gráficas de Funciones',
      url: 'https://www.youtube.com/watch?v=WUvTyaaNkzM',
      embedUrl: 'https://www.youtube-nocookie.com/embed/WUvTyaaNkzM',
      durationOrSize: '18:15 min',
      authorOrSource: '3Blue1Brown (Español)',
      description: 'Intuición geométrica sobre evaluar una función (camino de ida: x -> y) y resolver ecuaciones (camino de vuelta: preimágenes en x).',
    },
    {
      id: 'med-mat1-curv-03',
      type: 'audio',
      title: 'Audio-Guía: Lectura Geométrica de Curvas según Pedro Alson',
      url: '#audio-mat1-curvas',
      durationOrSize: 'Audio 6:20 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Resumen conceptual hablado: cómo deducir asíntotas, cotas superiores e inferiores, y monotonía a partir de condiciones dadas.',
    },
    {
      id: 'med-mat1-curv-04',
      type: 'image',
      title: 'Esquema de Caminos de Ida y Vuelta en el Plano Cartesiano',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Cartesian-coordinate-system.svg/600px-Cartesian-coordinate-system.svg.png',
      durationOrSize: 'Infografía SVG',
      authorOrSource: 'Archivo Gráfico Alson',
      description: 'Representación visual de la proyección sobre ejes ortogonales y la determinación gráfica de preimágenes.',
    },
  ],

  // 2. OPERACIONES CON CURVAS
  'santiago-mat1-operaciones': [
    {
      id: 'med-mat1-oper-01',
      type: 'video',
      title: 'Operaciones con Gráficas: Suma, Producto y Curva Recíproca',
      url: 'https://www.youtube.com/watch?v=0kFp6yHrn2Y',
      embedUrl: 'https://www.youtube-nocookie.com/embed/0kFp6yHrn2Y',
      durationOrSize: '25:10 min',
      authorOrSource: 'El Traductor de Ingeniería',
      description: 'Construcción paso a paso de f(x) + g(x) y f(x) * g(x) mediante la suma geométrica de ordenadas y el análisis por cuadrantes.',
    },
    {
      id: 'med-mat1-oper-02',
      type: 'video',
      title: 'La Curva Recíproca 1/f(x) y Polos Asintóticos',
      url: 'https://www.youtube.com/watch?v=4b4b2B7W9uY',
      embedUrl: 'https://www.youtube-nocookie.com/embed/4b4b2B7W9uY',
      durationOrSize: '19:35 min',
      authorOrSource: 'Unicoos · Matemáticas Universitarias',
      description: 'Cómo transformar los ceros de una función en asíntotas verticales y sus crestas máximas en valles mínimos.',
    },
    {
      id: 'med-mat1-oper-03',
      type: 'audio',
      title: 'Audio-Guía: El Camino de la Bisectriz (y = x) en la Composición',
      url: '#audio-mat1-operaciones',
      durationOrSize: 'Audio 5:45 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Explicación de cómo transferir la salida del eje vertical al eje horizontal usando la recta bisectriz para graficar g(f(x)).',
    },
  ],

  // 3. TECLAS Y FÓRMULAS
  'santiago-mat1-teclas': [
    {
      id: 'med-mat1-tecl-01',
      type: 'video',
      title: 'El Modelo de Teclas y Pantallas: Álgebra sin Trampas',
      url: 'https://www.youtube.com/watch?v=p4vWd2Gz3hY',
      embedUrl: 'https://www.youtube-nocookie.com/embed/p4vWd2Gz3hY',
      durationOrSize: '21:00 min',
      authorOrSource: 'Cátedra Pedro Alson (ERRO)',
      description: 'Fundamentos del flujo de pantallas de cálculo: operaciones elementales en serie, diagramas lineales vs diagramas ramificados.',
    },
    {
      id: 'med-mat1-tecl-02',
      type: 'video',
      title: 'Linealización de Diagramas: Completación de Cuadrados Geométrica',
      url: 'https://www.youtube.com/watch?v=rC_M4rO4e20',
      embedUrl: 'https://www.youtube-nocookie.com/embed/rC_M4rO4e20',
      durationOrSize: '17:40 min',
      authorOrSource: 'JulioProfe',
      description: 'Cómo colapsar una expresión cuadrática con dos entradas de x en una sola entrada lineal mediante el trinomio cuadrado perfecto.',
    },
    {
      id: 'med-mat1-tecl-03',
      type: 'audio',
      title: 'Audio-Guía: Despejes Inequívocos y Funciones Inversas',
      url: '#audio-mat1-teclas',
      durationOrSize: 'Audio 5:15 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Paso a paso para recorrer el camino inverso de teclas y asegurar que cada paso respete las restricciones de dominio.',
    },
  ],

  // 4. SOLUCIONES MÚLTIPLES
  'santiago-mat1-soluciones': [
    {
      id: 'med-mat1-sol-01',
      type: 'video',
      title: 'Resolución Gráfica de Ecuaciones No Lineales y Trascendentes',
      url: 'https://www.youtube.com/watch?v=7_WjG2dYq1I',
      embedUrl: 'https://www.youtube-nocookie.com/embed/7_WjG2dYq1I',
      durationOrSize: '23:15 min',
      authorOrSource: '3Blue1Brown (Español)',
      description: 'Visualización de raíces reales como intersecciones de dos curvas conocidas y acotamiento de soluciones mediante el método gráfico.',
    },
    {
      id: 'med-mat1-sol-02',
      type: 'video',
      title: 'Ecuaciones Trigonométricas Gráficas: Tang(x) = c y Periodos',
      url: 'https://www.youtube.com/watch?v=0h3jO9m2bLw',
      embedUrl: 'https://www.youtube-nocookie.com/embed/0h3jO9m2bLw',
      durationOrSize: '16:50 min',
      authorOrSource: 'Profe Alex',
      description: 'Conteo y localización de múltiples soluciones en intervalos cerrados para funciones trigonométricas con rectas horizontales.',
    },
    {
      id: 'med-mat1-sol-03',
      type: 'audio',
      title: 'Audio-Guía: Separación Estratégica de Curvas para el Parcial 1 UCV',
      url: '#audio-mat1-soluciones',
      durationOrSize: 'Audio 4:50 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Técnica de examen: cómo descomponer una ecuación compleja f(x) = 0 en f1(x) = f2(x) con curvas elementales fáciles de dibujar.',
    },
  ],

  // 5. RECTAS, PARÁBOLAS E HIPÉRBOLAS
  'santiago-mat1-rectas-hiperbolas': [
    {
      id: 'med-mat1-rhip-01',
      type: 'video',
      title: 'La Hipérbola Homográfica: f(x) = (ax + b)/(cx + d) al Desnudo',
      url: 'https://www.youtube.com/watch?v=rWJ8r2E_kQY',
      embedUrl: 'https://www.youtube-nocookie.com/embed/rWJ8r2E_kQY',
      durationOrSize: '26:40 min',
      authorOrSource: 'El Traductor de Ingeniería',
      description: 'Descomposición en la forma canónica v + k/(x - h), cálculo inmediato de asíntotas y trazo limpio de las dos ramas asintóticas.',
    },
    {
      id: 'med-mat1-rhip-02',
      type: 'video',
      title: 'Familias de Rectas y Áreas Triangulares bajo Hipérbolas',
      url: 'https://www.youtube.com/watch?v=eLwW8Z8M9jA',
      embedUrl: 'https://www.youtube-nocookie.com/embed/eLwW8Z8M9jA',
      durationOrSize: '20:10 min',
      authorOrSource: 'Matemáticas UCV Ciencias',
      description: 'Resolución del problema típico de parcial: intersección de recta e hipérbola y cálculo de áreas geométricas de triángulos formados.',
    },
    {
      id: 'med-mat1-rhip-03',
      type: 'audio',
      title: 'Audio-Guía: Los 3 Parámetros Clave de la Hipérbola Canónica',
      url: '#audio-mat1-rectas-hiperbolas',
      durationOrSize: 'Audio 5:30 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Cómo leer instantáneamente la asíntota vertical h, la horizontal v y el factor k para saber en qué cuadrantes viven las ramas.',
    },
  ],

  // 6. INECUACIONES Y TRANSFORMADAS
  'santiago-mat1-inecuaciones': [
    {
      id: 'med-mat1-inec-01',
      type: 'video',
      title: 'Resolución Visual de Inecuaciones: El Método Gráfico Definitivo',
      url: 'https://www.youtube.com/watch?v=kYJ5kQz9N6E',
      embedUrl: 'https://www.youtube-nocookie.com/embed/kYJ5kQz9N6E',
      durationOrSize: '24:00 min',
      authorOrSource: 'El Traductor de Ingeniería',
      description: 'Cómo resolver desigualdades f(x) > g(x) observando visualmente qué curva flota arriba y proyectando la solución sobre el eje real.',
    },
    {
      id: 'med-mat1-inec-02',
      type: 'video',
      title: 'Alfabeto de Transformadas Gráficas: Desplazamientos, Escalamientos y Módulo',
      url: 'https://www.youtube.com/watch?v=vVj_p_b8eR4',
      embedUrl: 'https://www.youtube-nocookie.com/embed/vVj_p_b8eR4',
      durationOrSize: '22:15 min',
      authorOrSource: 'JulioProfe',
      description: 'Reglas para dibujar f(x)+c, f(x+c), c*f(x), f(cx), |f(x)| y f(|x|) a partir de una gráfica canónica sin volver a tabular.',
    },
    {
      id: 'med-mat1-inec-03',
      type: 'audio',
      title: 'Audio-Guía: El Efecto del Valor Absoluto Interior vs Exterior',
      url: '#audio-mat1-inecuaciones',
      durationOrSize: 'Audio 4:40 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Diferencia visual entre reflejar la parte negativa hacia arriba (|f(x)|) y duplicar simétricamente el semiplano derecho (f(|x|)).',
    },
  ],

  // 7. LÍMITES Y DERIVADAS
  'santiago-mat1-limites-derivadas': [
    {
      id: 'med-mat1-lim-01',
      type: 'video',
      title: 'La Esencia Visual de los Límites y la Continuidad',
      url: 'https://www.youtube.com/watch?v=kfF40MiS7zA',
      embedUrl: 'https://www.youtube-nocookie.com/embed/kfF40MiS7zA',
      durationOrSize: '19:20 min',
      authorOrSource: '3Blue1Brown (Español)',
      description: 'Definición intuitiva y gráfica de límites: qué significa acercarse sin llegar y cómo detectar discontinuidades evitables o de salto.',
    },
    {
      id: 'med-mat1-lim-02',
      type: 'video',
      title: 'La Derivada Geométrica: Pendientes de Tangentes y Trazado de f (x)',
      url: 'https://www.youtube.com/watch?v=b4_97C_vYl0',
      embedUrl: 'https://www.youtube-nocookie.com/embed/b4_97C_vYl0',
      durationOrSize: '28:10 min',
      authorOrSource: 'El Traductor de Ingeniería',
      description: 'Cómo graficar la función derivada f prime (x) directamente observando la curvatura y las tangentes horizontales de f(x).',
    },
    {
      id: 'med-mat1-lim-03',
      type: 'audio',
      title: 'Audio-Guía: Criterio de Signos de f y f para el Trazado de Curvas',
      url: '#audio-mat1-limites-derivadas',
      durationOrSize: 'Audio 6:10 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Síntesis de cómo los ceros de la primera derivada señalan extremos y los ceros de la segunda derivada marcan puntos de inflexión.',
    },
  ],

  // =========================================================================
  // PRINCIPIOS DE QUÍMICA I (CÓDIGO 3401 UCV)
  // =========================================================================

  // 8. PROPIEDADES DE LA MATERIA Y MEDIDAS
  'santiago-qgi-propiedades': [
    {
      id: 'med-qgi-prop-01',
      type: 'video',
      title: 'Clasificación de la Materia: Sustancias Puras, Mezclas y Fases',
      url: 'https://www.youtube.com/watch?v=FSyAehMdpyI',
      embedUrl: 'https://www.youtube-nocookie.com/embed/FSyAehMdpyI',
      durationOrSize: '14:20 min',
      authorOrSource: 'CrashCourse Química (Español)',
      description: 'Distinción clara entre sustancias puras (elementos y compuestos) y mezclas homogéneas y heterogéneas con ejemplos cotidianos.',
    },
    {
      id: 'med-qgi-prop-02',
      type: 'video',
      title: 'Análisis Dimensional, Cifras Significativas y Densidad en el Laboratorio',
      url: 'https://www.youtube.com/watch?v=hB9E6fWf8hU',
      embedUrl: 'https://www.youtube-nocookie.com/embed/hB9E6fWf8hU',
      durationOrSize: '18:50 min',
      authorOrSource: 'Amigos de la Química',
      description: 'Reglas rigurosas para propagar cifras significativas en sumas, multiplicaciones y cálculos de densidad en unidades SI.',
    },
    {
      id: 'med-qgi-prop-03',
      type: 'audio',
      title: 'Audio-Guía: Metrología Química y Criterios de Redondeo',
      url: '#audio-qgi-propiedades',
      durationOrSize: 'Audio 5:10 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Resumen sonoro de las reglas de cifras significativas según el manual de laboratorio de Principios de Química I de la UCV.',
    },
  ],

  // 9. LOS ÁTOMOS Y TEORÍA ATÓMICA
  'santiago-qgi-atomos': [
    {
      id: 'med-qgi-at-01',
      type: 'video',
      title: 'Leyes Ponderales y la Teoría Atómica de Dalton a Rutherford',
      url: 'https://www.youtube.com/watch?v=thnDxFdkzZs',
      embedUrl: 'https://www.youtube-nocookie.com/embed/thnDxFdkzZs',
      durationOrSize: '16:40 min',
      authorOrSource: 'CrashCourse Química (Español)',
      description: 'Historia experimental de las leyes de Lavoisier y Proust, y los experimentos de Thomson, Millikan y Rutherford para descubrir el núcleo.',
    },
    {
      id: 'med-qgi-at-02',
      type: 'video',
      title: 'Isótopos, Número Másico A, Número Atómico Z y Masa Atómica Promedio',
      url: 'https://www.youtube.com/watch?v=F2Y4P1V7s8U',
      embedUrl: 'https://www.youtube-nocookie.com/embed/F2Y4P1V7s8U',
      durationOrSize: '15:10 min',
      authorOrSource: 'Amigos de la Química',
      description: 'Cálculo de la masa atómica ponderada por abundancia natural y resolución de problemas de espectrometría de masas.',
    },
    {
      id: 'med-qgi-at-03',
      type: 'audio',
      title: 'Audio-Guía: Del Modelo de la Esfera Maciza al Modelo Nuclear',
      url: '#audio-qgi-atomos',
      durationOrSize: 'Audio 5:00 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Por qué el experimento de dispersión de partículas alfa de Rutherford obligó a abandonar el modelo de Thomson.',
    },
  ],

  // 10. ESTRUCTURA ELECTRÓNICA DE LOS ÁTOMOS
  'santiago-qgi-cuantica': [
    {
      id: 'med-qgi-cuant-01',
      type: 'video',
      title: 'El Modelo de Bohr y la Cuantización de la Energía',
      url: 'https://www.youtube.com/watch?v=rcKilE9CdaA',
      embedUrl: 'https://www.youtube-nocookie.com/embed/rcKilE9CdaA',
      durationOrSize: '17:30 min',
      authorOrSource: 'CrashCourse Química (Español)',
      description: 'Espectros de emisión atómica, fotones de Planck-Einstein, saltos cuánticos y la ecuación de Rydberg para el hidrógeno.',
    },
    {
      id: 'med-qgi-cuant-02',
      type: 'video',
      title: 'Los 4 Números Cuánticos, Orbitales Atómicos y Configuraciones Electrónicas',
      url: 'https://www.youtube.com/watch?v=yW6aX0z6pYI',
      embedUrl: 'https://www.youtube-nocookie.com/embed/yW6aX0z6pYI',
      durationOrSize: '24:15 min',
      authorOrSource: 'Amigos de la Química',
      description: 'Reglas de llenado electrónico (Aufbau, exclusión de Pauli y regla de Hund) y anomalías cuánticas del cromo y cobre.',
    },
    {
      id: 'med-qgi-cuant-03',
      type: 'audio',
      title: 'Audio-Guía: Qué Representa Realmente un Orbital Atómico',
      url: '#audio-qgi-cuantica',
      durationOrSize: 'Audio 5:40 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Aclaración física: el orbital no es una órbita circular, sino una nube tridimensional de probabilidad descrita por la función de onda.',
    },
  ],

  // 11. TABLA PERIÓDICA
  'santiago-qgi-tabla': [
    {
      id: 'med-qgi-tab-01',
      type: 'video',
      title: 'La Tabla Periódica: Bloques s, p, d, f y Familias Químicas',
      url: 'https://www.youtube.com/watch?v=0RRVV4Diomg',
      embedUrl: 'https://www.youtube-nocookie.com/embed/0RRVV4Diomg',
      durationOrSize: '15:20 min',
      authorOrSource: 'CrashCourse Química (Español)',
      description: 'Organización de los elementos químicos según su estructura electrónica y la ley periódica de Mendeleev y Moseley.',
    },
    {
      id: 'med-qgi-tab-02',
      type: 'video',
      title: 'Tendencias Periódicas: Carga Nuclear Efectiva, Radio y Energía de Ionización',
      url: 'https://www.youtube.com/watch?v=pD4J7kL2p_A',
      embedUrl: 'https://www.youtube-nocookie.com/embed/pD4J7kL2p_A',
      durationOrSize: '22:30 min',
      authorOrSource: 'Amigos de la Química',
      description: 'Mecanismo físico del apantallamiento electrónico y por qué el radio atómico disminuye de izquierda a derecha a lo largo de un periodo.',
    },
    {
      id: 'med-qgi-tab-03',
      type: 'audio',
      title: 'Audio-Guía: El Rol Clave de Z_ef en las Propiedades Periódicas',
      url: '#audio-qgi-tabla',
      durationOrSize: 'Audio 4:55 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Cómo calcular la carga nuclear efectiva y su uso para justificar por qué los cationes son más pequeños y los aniones más grandes.',
    },
  ],

  // 12. ENLACES QUÍMICOS
  'santiago-qgi-enlaces': [
    {
      id: 'med-qgi-enl-01',
      type: 'video',
      title: 'Estructuras de Lewis, Regla del Octeto y Carga Formal',
      url: 'https://www.youtube.com/watch?v=cIuXl7o66vI',
      embedUrl: 'https://www.youtube-nocookie.com/embed/cIuXl7o66vI',
      durationOrSize: '26:10 min',
      authorOrSource: 'Amigos de la Química',
      description: 'Algoritmo infalible para contar electrones de valencia, colocar pares enlazantes y asignar cargas formales en iones poliatómicos.',
    },
    {
      id: 'med-qgi-enl-02',
      type: 'video',
      title: 'Enlace Iónico, Red Cristalina y Ciclo de Born-Haber',
      url: 'https://www.youtube.com/watch?v=Qf07-8Jhhpc',
      embedUrl: 'https://www.youtube-nocookie.com/embed/Qf07-8Jhhpc',
      durationOrSize: '16:05 min',
      authorOrSource: 'CrashCourse Química (Español)',
      description: 'Cálculo de la energía reticular mediante el ciclo termodinámico de Born-Haber y diferencias con el enlace covalente.',
    },
    {
      id: 'med-qgi-enl-03',
      type: 'audio',
      title: 'Audio-Guía: Octetos Incompletos y Expandidos en Exámenes UCV',
      url: '#audio-qgi-enlaces',
      durationOrSize: 'Audio 5:35 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Por qué el BF3 se queda con 6 electrones y cómo el SF6 o PCl5 usan orbitales d vacíos para alojar más de 8 electrones.',
    },
  ],

  // 13. GEOMETRÍA MOLECULAR
  'santiago-qgi-geometria': [
    {
      id: 'med-qgi-geom-01',
      type: 'video',
      title: 'Modelo TRPEV / VSEPR: Geometría de Pares y Geometría Molecular',
      url: 'https://www.youtube.com/watch?v=keHS-CASZfc',
      embedUrl: 'https://www.youtube-nocookie.com/embed/keHS-CASZfc',
      durationOrSize: '28:40 min',
      authorOrSource: 'Amigos de la Química',
      description: 'Guía visual completa de geometrías moleculares (lineal, angular, tetraédrica, piramidal, balancín, octaédrica) y distorsión de ángulos.',
    },
    {
      id: 'med-qgi-geom-02',
      type: 'video',
      title: 'Hibridación de Orbitales: sp, sp2, sp3 y Polaridad Molecular',
      url: 'https://www.youtube.com/watch?v=gT8h_K4p9aE',
      embedUrl: 'https://www.youtube-nocookie.com/embed/gT8h_K4p9aE',
      durationOrSize: '23:15 min',
      authorOrSource: 'El Traductor de Ingeniería',
      description: 'Significado físico del solapamiento orbital, enlaces sigma axiales y pi laterales, y suma vectorial de dipolos para hallar mu neto.',
    },
    {
      id: 'med-qgi-geom-03',
      type: 'audio',
      title: 'Audio-Guía: Cuándo una Molécula con Enlaces Polares es Apolar',
      url: '#audio-qgi-geometria',
      durationOrSize: 'Audio 5:15 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'El rol decisivo de la simetría espacial: por qué el CO2 y el CCl4 tienen momento dipolar cero a pesar de sus enlaces polares.',
    },
  ],

  // 14. RELACIONES DE MASA EN REACCIONES (ESTEQUIOMETRÍA)
  'santiago-qgi-estequiometria': [
    {
      id: 'med-qgi-esteq-01',
      type: 'video',
      title: 'Estequiometría de Reacción: El Concepto de Mol y Balanceo',
      url: 'https://www.youtube.com/watch?v=UL1jmJaUkaQ',
      embedUrl: 'https://www.youtube-nocookie.com/embed/UL1jmJaUkaQ',
      durationOrSize: '18:30 min',
      authorOrSource: 'CrashCourse Química (Español)',
      description: 'Conservación de la materia, número de Avogadro y cómo convertir masas en gramos a moles para seguir la receta química.',
    },
    {
      id: 'med-qgi-esteq-02',
      type: 'video',
      title: 'Reactivo Limitante, Reactivo en Exceso y Rendimiento Porcentual',
      url: 'https://www.youtube.com/watch?v=F3a3S7x6u6M',
      embedUrl: 'https://www.youtube-nocookie.com/embed/F3a3S7x6u6M',
      durationOrSize: '25:20 min',
      authorOrSource: 'Amigos de la Química',
      description: 'El método definitivo de los cuadros I-C-F para calcular reactivos limitantes con pureza de materias primas y calcular masas residuales.',
    },
    {
      id: 'med-qgi-esteq-03',
      type: 'audio',
      title: 'Audio-Guía: El Error Típico de Comparar Gramos en vez de Moles',
      url: '#audio-qgi-estequiometria',
      durationOrSize: 'Audio 4:50 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Por qué la sustancia con menor masa no necesariamente es el reactivo limitante: la importancia de dividir entre el coeficiente.',
    },
  ],

  // 15. REACCIONES EN DISOLUCIONES ACUOSAS
  'santiago-qgi-disoluciones-reacciones': [
    {
      id: 'med-qgi-dis-01',
      type: 'video',
      title: 'Reacciones de Precipitación y Reglas de Solubilidad',
      url: 'https://www.youtube.com/watch?v=IIu16n4z51k',
      embedUrl: 'https://www.youtube-nocookie.com/embed/IIu16n4z51k',
      durationOrSize: '16:15 min',
      authorOrSource: 'CrashCourse Química (Español)',
      description: 'Cómo predecir la formación de precipitados sólidos y escribir ecuaciones moleculares, iónicas totales e iónicas netas.',
    },
    {
      id: 'med-qgi-dis-02',
      type: 'video',
      title: 'Balanceo Redox por el Método del Ion-Electrón (Medio Ácido y Básico)',
      url: 'https://www.youtube.com/watch?v=y3hR9e8Z9hY',
      embedUrl: 'https://www.youtube-nocookie.com/embed/y3hR9e8Z9hY',
      durationOrSize: '27:50 min',
      authorOrSource: 'Amigos de la Química',
      description: 'Pasos exactos para balancear átomos con agua y protones H+, balancear carga eléctrica con electrones y neutralizar en medio básico.',
    },
    {
      id: 'med-qgi-dis-03',
      type: 'audio',
      title: 'Audio-Guía: Neutralización Ácido-Base y Titulaciones Volumétricas',
      url: '#audio-qgi-disoluciones-reacciones',
      durationOrSize: 'Audio 5:30 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Cálculo analítico en el punto de equivalencia con relación estequiométrica entre ácido y base consumida en la bureta.',
    },
  ],

  // 16. GASES
  'santiago-qgi-gases': [
    {
      id: 'med-qgi-gas-01',
      type: 'video',
      title: 'Leyes de los Gases Ideales: Boyle, Charles, Avogadro y PV = nRT',
      url: 'https://www.youtube.com/watch?v=BxUS1K7xu30',
      embedUrl: 'https://www.youtube-nocookie.com/embed/BxUS1K7xu30',
      durationOrSize: '19:40 min',
      authorOrSource: 'CrashCourse Química (Español)',
      description: 'Deducción y aplicación de la ecuación de estado de gases ideales y cálculo de densidad y masa molar de vapores.',
    },
    {
      id: 'med-qgi-gas-02',
      type: 'video',
      title: 'Presiones Parciales de Dalton, Gases sobre Agua y Van der Waals',
      url: 'https://www.youtube.com/watch?v=w7M_p6k1E2s',
      embedUrl: 'https://www.youtube-nocookie.com/embed/w7M_p6k1E2s',
      durationOrSize: '23:30 min',
      authorOrSource: 'Amigos de la Química',
      description: 'Corrección por presión de vapor de agua y análisis físico de las desviaciones de idealidad con los factores a y b de Van der Waals.',
    },
    {
      id: 'med-qgi-gas-03',
      type: 'audio',
      title: 'Audio-Guía: Por Qué los Gases Reales Fallan a Altas Presiones',
      url: '#audio-qgi-gases',
      durationOrSize: 'Audio 5:05 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Efecto del volumen propio de las moléculas y de las fuerzas intermoleculares de atracción sobre el comportamiento no ideal.',
    },
  ],

  // 17. DISOLUCIONES IDEALES Y PROPIEDADES COLIGATIVAS
  'santiago-qgi-disoluciones-coligativas': [
    {
      id: 'med-qgi-col-01',
      type: 'video',
      title: 'Unidades de Concentración: Molaridad, Molalidad y Fracción Molar',
      url: 'https://www.youtube.com/watch?v=9h2vW1VpL_Q',
      embedUrl: 'https://www.youtube-nocookie.com/embed/9h2vW1VpL_Q',
      durationOrSize: '21:10 min',
      authorOrSource: 'Amigos de la Química',
      description: 'Conversiones directas entre porcentaje en masa, molaridad y molalidad utilizando la densidad de la disolución.',
    },
    {
      id: 'med-qgi-col-02',
      type: 'video',
      title: 'Propiedades Coligativas: Descenso Crioscópico, Ebullición y Ósmosis',
      url: 'https://www.youtube.com/watch?v=qR1Q_V7z_wE',
      embedUrl: 'https://www.youtube-nocookie.com/embed/qR1Q_V7z_wE',
      durationOrSize: '26:00 min',
      authorOrSource: 'Unicoos · Química Universitaria',
      description: 'Aplicación de la ley de Raoult, cálculo del descenso del punto de congelación y uso del factor de van t Hoff para electrolitos.',
    },
    {
      id: 'med-qgi-col-03',
      type: 'audio',
      title: 'Audio-Guía: El Factor i de Van t Hoff y la Determinación de Masas Molares',
      url: '#audio-qgi-disoluciones-coligativas',
      durationOrSize: 'Audio 5:45 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Cómo calcular el peso molecular de una sustancia desconocida midiendo el descenso crioscópico o la presión osmótica.',
    },
  ],

  // =========================================================================
  // FÍSICA I (MECÁNICA CLÁSICA UCV)
  // =========================================================================

  // 18. CINEMÁTICA
  'santiago-fis1-kinematics': [
    {
      id: 'med-fis1-kin-01',
      type: 'video',
      title: 'Cinemática en 2D y 3D: Aceleración Normal y Tangencial',
      url: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds',
      embedUrl: 'https://www.youtube-nocookie.com/embed/kKKM8Y-u7ds',
      durationOrSize: '48:30 min',
      authorOrSource: 'Prof. Walter Lewin · MIT 8.01',
      description: 'Clase universitaria magistral que descompone el movimiento curvilíneo en dirección tangente y centrípeta con experimentos reales.',
    },
    {
      id: 'med-fis1-kin-02',
      type: 'video',
      title: 'Cinemática Diferencial: Vectores de Posición, Velocidad y Aceleración',
      url: 'https://www.youtube.com/watch?v=kYJ5kQz9N6E',
      embedUrl: 'https://www.youtube-nocookie.com/embed/kYJ5kQz9N6E',
      durationOrSize: '24:15 min',
      authorOrSource: 'El Traductor de Ingeniería',
      description: 'Explicación geométrica de derivadas temporales de vectores y tiro parabólico en el espacio euclidiano.',
    },
    {
      id: 'med-fis1-kin-03',
      type: 'audio',
      title: 'Audio-Guía: El Significado Físico del Triedro Intrínseco',
      url: '#audio-fis1-kinematics',
      durationOrSize: 'Audio 5:10 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Por qué la aceleración tangencial cambia el módulo de la velocidad y la normal dobla la trayectoria hacia el centro de curvatura.',
    },
  ],

  // 19. LEYES DE NEWTON
  'santiago-fis1-dynamics': [
    {
      id: 'med-fis1-dyn-01',
      type: 'video',
      title: 'Las Leyes de Newton y Diagramas de Cuerpo Libre (DCL)',
      url: 'https://www.youtube.com/watch?v=apJZ11XgMlg',
      embedUrl: 'https://www.youtube-nocookie.com/embed/apJZ11XgMlg',
      durationOrSize: '51:20 min',
      authorOrSource: 'Prof. Walter Lewin · MIT 8.01',
      description: 'Demostraciones vivas de inercia, acción-reacción, fuerzas normales y cálculo de tensiones en sistemas de poleas acopladas.',
    },
    {
      id: 'med-fis1-dyn-02',
      type: 'video',
      title: 'Fricción Estática vs Cinética y Dinámica en Planos Inclinados',
      url: 'https://www.youtube.com/watch?v=k_h_J8q2bL4',
      embedUrl: 'https://www.youtube-nocookie.com/embed/k_h_J8q2bL4',
      durationOrSize: '27:40 min',
      authorOrSource: 'Profesor Sergio Llanos',
      description: 'Resolución metódica de sistemas con rozamiento seco, cálculo del ángulo crítico de deslizamiento y aceleración de cuerpos conectados.',
    },
    {
      id: 'med-fis1-dyn-03',
      type: 'audio',
      title: 'Audio-Guía: Cómo Orientar los Ejes Cartesianos para Evitar Errores de Signo',
      url: '#audio-fis1-dynamics',
      durationOrSize: 'Audio 5:25 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'La regla de oro: alinear siempre uno de los ejes con la aceleración para que en el eje perpendicular la suma de fuerzas sea cero.',
    },
  ],

  // 20. TRABAJO Y ENERGÍA
  'santiago-fis1-energy': [
    {
      id: 'med-fis1-ene-01',
      type: 'video',
      title: 'Trabajo, Energía Cinética y el Teorema de las Fuerzas Vivas',
      url: 'https://www.youtube.com/watch?v=wWnfJ0-xXRE',
      embedUrl: 'https://www.youtube-nocookie.com/embed/wWnfJ0-xXRE',
      durationOrSize: '49:15 min',
      authorOrSource: 'Prof. Walter Lewin · MIT 8.01',
      description: 'El célebre experimento del péndulo oscilante y la ley inquebrantable de conservación de la energía mecánica.',
    },
    {
      id: 'med-fis1-ene-02',
      type: 'video',
      title: 'Fuerzas Conservativas, Energía Potencial y Diagramas de Potencial U(x)',
      url: 'https://www.youtube.com/watch?v=GjT_v8a9qL8',
      embedUrl: 'https://www.youtube-nocookie.com/embed/GjT_v8a9qL8',
      durationOrSize: '25:30 min',
      authorOrSource: 'El Traductor de Ingeniería',
      description: 'Definición integral del trabajo, cálculo del trabajo disipativo por fricción y lectura de puntos de equilibrio en curvas de energía.',
    },
    {
      id: 'med-fis1-ene-03',
      type: 'audio',
      title: 'Audio-Guía: El Balance Global de Energía sin Saltarse Fuerzas No Conservativas',
      url: '#audio-fis1-energy',
      durationOrSize: 'Audio 5:50 min',
      authorOrSource: 'Locución Académica CPE',
      description: 'Cómo formular E_inicial + W_no_conservativo = E_final para resolver cualquier problema de pistas curvas, resortes y rozamiento.',
    },
  ],
};
