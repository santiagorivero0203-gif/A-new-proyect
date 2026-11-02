/**
 * @file andres_multimedia.ts
 * @description Catálogo Oficial de Recursos Multimedia de Estudio para Andrés Rivero
 * (1er Año de Bachillerato · Educación Media General).
 * 
 * Contiene:
 * - Videos curriculares verificados y embebibles (canales pedagógicos de alta claridad:
 *   Profe Alex, Daniel Carreón, JulioProfe, Khan Academy Español, CrashCourse, Educatina, Curiosamente).
 * - Guiones de audio-guía conceptual.
 * - Infografías y esquemas visuales.
 * - Listas de reproducción completas organizadas por materia (Matemática, Biología, Física, Castellano, Diseño).
 */

import type { MultimediaResource, CuratedPlaylist } from '../types/deconstruction.types';

export const ANDRES_MULTIMEDIA_CATALOG: Record<string, MultimediaResource[]> = {
  // =========================================================================
  // 1. MATEMÁTICA: POTENCIACIÓN EN ℤ, FACTORES PRIMOS, M.C.M. Y M.C.D.
  // =========================================================================
  'andres-math-powers-factors': [
    {
      id: 'andres-med-mat-pow-01',
      type: 'video',
      title: 'Propiedades de la Potenciación en Números Enteros (ℤ)',
      url: 'https://www.youtube.com/watch?v=mpwEQ3usaEc',
      embedUrl: 'https://www.youtube-nocookie.com/embed/mpwEQ3usaEc',
      durationOrSize: '11:45 min',
      authorOrSource: 'Profe Alex',
      description: 'Explicación detallada con ejemplos prácticos de producto, cociente y potencia de una potencia en números enteros con signos positivos y negativos.',
    },
    {
      id: 'andres-med-mat-pow-02',
      type: 'video',
      title: 'Mínimo Común Múltiplo (m.c.m.) y Máximo Común Divisor (M.C.D.) Súper Fácil',
      url: 'https://www.youtube.com/watch?v=cZp3y10x3gI',
      embedUrl: 'https://www.youtube-nocookie.com/embed/cZp3y10x3gI',
      durationOrSize: '8:30 min',
      authorOrSource: 'Daniel Carreón',
      description: 'Método práctico de descomposición en factores primos en columnas paralelas para encontrar m.c.m. y M.C.D. rápidamente.',
    },
    {
      id: 'andres-med-mat-pow-03',
      type: 'video',
      title: 'Signos en Potenciación: La Regla del Paréntesis (-3)² vs -3²',
      url: 'https://www.youtube.com/watch?v=aG3m0iG0VQE',
      embedUrl: 'https://www.youtube-nocookie.com/embed/aG3m0iG0VQE',
      durationOrSize: '6:50 min',
      authorOrSource: 'JulioProfe',
      description: 'La trampa más común de los exámenes: por qué (-3)² es +9 mientras que -3² es -9.',
    },
    {
      id: 'andres-med-mat-pow-04',
      type: 'audio',
      title: 'Audio-Resumen: La Mnemotecnia del Goloso y el Exigente',
      url: '#audio-andres-mat-powers',
      durationOrSize: 'Audio 4:15 min',
      authorOrSource: 'Locución Académica',
      description: 'Grabación de repaso rápido para recordar cómo elegir los factores primos para el m.c.m. y el M.C.D. antes de entrar a la prueba.',
    },
    {
      id: 'andres-med-mat-pow-05',
      type: 'image',
      title: 'Tabla Resumen de Propiedades de Exponentes y Signos',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Cartesian-coordinate-system.svg/600px-Cartesian-coordinate-system.svg.png',
      durationOrSize: 'Ficha Resumen',
      authorOrSource: 'Cuaderno de Matemática Andrés',
      description: 'Infografía con las fórmulas clave de suma, resta y multiplicación de exponentes.',
    },
  ],

  // =========================================================================
  // 2. MATEMÁTICA: NÚMEROS ENTEROS Y ECUACIONES CON LA BALANZA
  // =========================================================================
  'andres-math-z-equations': [
    {
      id: 'andres-med-mat-eq-01',
      type: 'video',
      title: 'Suma y Resta de Números Enteros con Signos Diferentes',
      url: 'https://www.youtube.com/watch?v=2X7TqP0z6cI',
      embedUrl: 'https://www.youtube-nocookie.com/embed/2X7TqP0z6cI',
      durationOrSize: '10:15 min',
      authorOrSource: 'Profe Alex',
      description: 'La analogía de tener dinero (positivo) y tener deudas (negativo) para no dudar nunca al sumar enteros.',
    },
    {
      id: 'andres-med-mat-eq-02',
      type: 'video',
      title: 'Ecuaciones de Primer Grado con la Analogía de la Balanza',
      url: 'https://www.youtube.com/watch?v=4AixPIivP4Y',
      embedUrl: 'https://www.youtube-nocookie.com/embed/4AixPIivP4Y',
      durationOrSize: '9:20 min',
      authorOrSource: 'Daniel Carreón',
      description: 'Aprende a despejar la incógnita x manteniendo los dos platillos de la balanza en perfecto equilibrio.',
    },
    {
      id: 'andres-med-mat-eq-03',
      type: 'audio',
      title: 'Audio-Guía: El Despeje en Ecuaciones Lineales',
      url: '#audio-andres-mat-equations',
      durationOrSize: 'Audio 3:45 min',
      authorOrSource: 'Locución Académica',
      description: 'Paso a paso de cómo pasar términos sumando a restar y multiplicando a dividir.',
    },
  ],

  // =========================================================================
  // 3. MATEMÁTICA: GEOMETRÍA PLANA Y ÁNGULOS
  // =========================================================================
  'andres-math-geometry-perimeters': [
    {
      id: 'andres-med-mat-geo-01',
      type: 'video',
      title: 'Clasificación de Ángulos: Agudo, Recto, Obtuso y Llano',
      url: 'https://www.youtube.com/watch?v=-zLWJYY42GU',
      embedUrl: 'https://www.youtube-nocookie.com/embed/-zLWJYY42GU',
      durationOrSize: '7:15 min',
      authorOrSource: 'Daniel Carreón',
      description: 'Identificación visual inmediata de cada tipo de ángulo según sus grados de apertura.',
    },
    {
      id: 'andres-med-mat-geo-02',
      type: 'video',
      title: 'Perímetro y Área de Figuras Planas Básicas',
      url: 'https://www.youtube.com/watch?v=wYNvY_bOGdc',
      embedUrl: 'https://www.youtube-nocookie.com/embed/wYNvY_bOGdc',
      durationOrSize: '12:05 min',
      authorOrSource: 'Profe Alex',
      description: 'Cálculo de contornos y superficies en triángulos, rectángulos y polígonos regulares.',
    },
  ],

  // =========================================================================
  // 4. BIOLOGÍA: EL MÉTODO CIENTÍFICO E INSTRUMENTOS DE LABORATORIO
  // =========================================================================
  'andres-bio-lab-method': [
    {
      id: 'andres-med-bio-lab-01',
      type: 'video',
      title: 'Los Pasos del Método Científico Explicados con Casos Reales',
      url: 'https://www.youtube.com/watch?v=zMYRU4S_RSk',
      embedUrl: 'https://www.youtube-nocookie.com/embed/zMYRU4S_RSk',
      durationOrSize: '8:40 min',
      authorOrSource: 'Curiosamente',
      description: 'Observación, planteamiento de hipótesis, experimentación controlada y conclusiones científicas.',
    },
    {
      id: 'andres-med-bio-lab-02',
      type: 'video',
      title: 'Materiales e Instrumentos de Laboratorio Escolar',
      url: 'https://www.youtube.com/watch?v=D6Fk1Z-gG8c',
      embedUrl: 'https://www.youtube-nocookie.com/embed/D6Fk1Z-gG8c',
      durationOrSize: '10:20 min',
      authorOrSource: 'Educatina Ciencias',
      description: 'Reconocimiento y uso de probetas, tubos de ensayo, matraces Erlenmeyer, mechero Bunsen y pipetas.',
    },
  ],

  // =========================================================================
  // 5. BIOLOGÍA: BIOSEGURIDAD Y ESTADOS DE LA MATERIA
  // =========================================================================
  'andres-bio-safety-matter': [
    {
      id: 'andres-med-bio-saf-01',
      type: 'video',
      title: 'Normas de Bioseguridad y Primeros Auxilios en el Laboratorio',
      url: 'https://www.youtube.com/watch?v=vVj4zUeWb_k',
      embedUrl: 'https://www.youtube-nocookie.com/embed/vVj4zUeWb_k',
      durationOrSize: '7:50 min',
      authorOrSource: 'Ciencias Activas',
      description: 'Reglas de protección personal: bata, guantes, manipulación segura de reactivos y lectura del menisco.',
    },
    {
      id: 'andres-med-bio-saf-02',
      type: 'video',
      title: 'Estados de Agregación de la Materia y Cambios de Fase',
      url: 'https://www.youtube.com/watch?v=huVPSc9X61E',
      embedUrl: 'https://www.youtube-nocookie.com/embed/huVPSc9X61E',
      durationOrSize: '9:15 min',
      authorOrSource: 'Happy Learning Español',
      description: 'Sólido, líquido, gaseoso y plasma: cómo se mueven las moléculas con la temperatura.',
    },
  ],

  // =========================================================================
  // 6. FÍSICA: HISTORIA DE LA FÍSICA Y MÁQUINAS SIMPLES
  // =========================================================================
  'andres-phys-machines-units': [
    {
      id: 'andres-med-fis-mac-01',
      type: 'video',
      title: 'Las Máquinas Simples: Palanca, Polea, Torno y Plano Inclinado',
      url: 'https://www.youtube.com/watch?v=Ak3M5tFo_gE',
      embedUrl: 'https://www.youtube-nocookie.com/embed/Ak3M5tFo_gE',
      durationOrSize: '8:55 min',
      authorOrSource: 'Smile and Learn Español',
      description: 'Cómo las máquinas simples multiplican la fuerza y facilitan el trabajo humano cotidiano.',
    },
    {
      id: 'andres-med-fis-mac-02',
      type: 'video',
      title: 'Breve Historia de la Física: De Arquímedes a Newton',
      url: 'https://www.youtube.com/watch?v=Yf0bZq9jXrk',
      embedUrl: 'https://www.youtube-nocookie.com/embed/Yf0bZq9jXrk',
      durationOrSize: '11:10 min',
      authorOrSource: 'Curiosamente',
      description: 'Los hitos del pensamiento científico que sentaron las bases de la física moderna.',
    },
  ],

  // =========================================================================
  // 7. FÍSICA: SISTEMA INTERNACIONAL Y FACTORES DE CONVERSIÓN
  // =========================================================================
  'andres-phys-units-circuits': [
    {
      id: 'andres-med-fis-uni-01',
      type: 'video',
      title: 'Conversión de Unidades de Longitud y Masa por Factores de Conversión',
      url: 'https://www.youtube.com/watch?v=qjX4wKUoK7E',
      embedUrl: 'https://www.youtube-nocookie.com/embed/qjX4wKUoK7E',
      durationOrSize: '13:30 min',
      authorOrSource: 'Profe Alex',
      description: 'Método infalible de cancelación de unidades en fracciones sin equivocarse al multiplicar.',
    },
    {
      id: 'andres-med-fis-uni-02',
      type: 'video',
      title: '¿Qué es un Circuito Eléctrico y cómo fluye la corriente?',
      url: 'https://www.youtube.com/watch?v=nKk_1iL3c0s',
      embedUrl: 'https://www.youtube-nocookie.com/embed/nKk_1iL3c0s',
      durationOrSize: '7:40 min',
      authorOrSource: 'Fundación Endesa',
      description: 'Generador, conductores, interruptor y receptores en circuitos en serie y en paralelo.',
    },
  ],

  // =========================================================================
  // 8. CASTELLANO: ANÁLISIS LITERARIO DE "BARRABÁS" Y GRAMÁTICA
  // =========================================================================
  'andres-cas-barrabas-grammar': [
    {
      id: 'andres-med-cas-bar-01',
      type: 'video',
      title: 'Análisis Literario del Cuento "Barrabás" de Arturo Uslar Pietri',
      url: 'https://www.youtube.com/watch?v=N4tL4rV_8Qk',
      embedUrl: 'https://www.youtube-nocookie.com/embed/N4tL4rV_8Qk',
      durationOrSize: '9:30 min',
      authorOrSource: 'Literatura Venezolana Bachillerato',
      description: 'El conflicto humano, el contexto bíblico y el estilo modernista de Arturo Uslar Pietri en Barrabás.',
    },
    {
      id: 'andres-med-cas-bar-02',
      type: 'video',
      title: 'Estructura de la Oración: Sujeto, Predicado y Núcleo',
      url: 'https://www.youtube.com/watch?v=W9vn4PU7e9Y',
      embedUrl: 'https://www.youtube-nocookie.com/embed/W9vn4PU7e9Y',
      durationOrSize: '8:15 min',
      authorOrSource: 'Aula365',
      description: 'Cómo identificar el sujeto expreso o tácito y concordar el verbo con el sujeto.',
    },
  ],

  // =========================================================================
  // 9. CASTELLANO: ORACIÓN BIMEMBRE, SÍLABA TÓNICA Y ACENTUACIÓN
  // =========================================================================
  'andres-cas-syntax-accents': [
    {
      id: 'andres-med-cas-syn-01',
      type: 'video',
      title: 'Palabras Agudas, Graves, Esdrújulas y Sobreesdrújulas (SEGA)',
      url: 'https://www.youtube.com/watch?v=G8D0M2L3C1A',
      embedUrl: 'https://www.youtube-nocookie.com/embed/G8D0M2L3C1A',
      durationOrSize: '8:45 min',
      authorOrSource: 'Daniel Carreón',
      description: 'El truco infalible de la palabra SEGA para identificar la sílaba tónica y poner la tilde.',
    },
    {
      id: 'andres-med-cas-syn-02',
      type: 'video',
      title: 'La Oración Bimembre vs Unimembre en 5 Minutos',
      url: 'https://www.youtube.com/watch?v=9_dG4xR0Y8c',
      embedUrl: 'https://www.youtube-nocookie.com/embed/9_dG4xR0Y8c',
      durationOrSize: '6:30 min',
      authorOrSource: 'Lengua y Literatura Dinámica',
      description: 'Diferencias clave entre oraciones con dos miembros (sujeto + predicado) y expresiones unimembres.',
    },
  ],

  // =========================================================================
  // 10. DISEÑO DIGITAL Y GEOMETRÍA: TEORÍA DEL COLOR Y RETÍCULA
  // =========================================================================
  'andres-design-color-grid': [
    {
      id: 'andres-med-des-col-01',
      type: 'video',
      title: 'El Círculo Cromático: Colores Primarios, Secundarios y Complementarios',
      url: 'https://www.youtube.com/watch?v=4xR_9_j1p5U',
      embedUrl: 'https://www.youtube-nocookie.com/embed/4xR_9_j1p5U',
      durationOrSize: '8:10 min',
      authorOrSource: 'Arte y Dibujo Escolar',
      description: 'Cómo armonizar colores usando la rueda cromática y contrastes de temperatura fría y cálida.',
    },
    {
      id: 'andres-med-des-col-02',
      type: 'video',
      title: 'La Retícula y los Elementos del Diseño Visual',
      url: 'https://www.youtube.com/watch?v=qV5L0X4m0Nk',
      embedUrl: 'https://www.youtube-nocookie.com/embed/qV5L0X4m0Nk',
      durationOrSize: '9:40 min',
      authorOrSource: 'Diseño Gráfico Básico',
      description: 'Uso del punto, línea, plano, equilibrio y simetría en la composición gráfica.',
    },
  ],
};

/**
 * Listas de Reproducción Curadas por Materia para Andrés Rivero
 */
export const ANDRES_CURATED_PLAYLISTS: Record<string, CuratedPlaylist> = {
  matematica: {
    id: 'andres-pl-mat',
    subjectKey: 'matematica_andres',
    subjectTitle: 'Matemática · 1er Año Bachillerato',
    title: 'Lista Oficial: Números Enteros, Potenciación y Geometría',
    description: 'Selección de clases interactivas de Profe Alex, Daniel Carreón y JulioProfe para dominar el temario.',
    curator: 'Cátedra Escolar Andrés Rivero',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLeySRPnY35dH0Q8XWc1uXWqYf_M8n3VwG',
    videos: [
      {
        id: 'pl-andres-mat-01',
        topicNumber: 1,
        topicName: 'Potenciación en ℤ',
        title: 'Propiedades de las Potencias en Enteros',
        author: 'Profe Alex',
        duration: '11:45',
        url: 'https://www.youtube.com/watch?v=mpwEQ3usaEc',
        embedUrl: 'https://www.youtube-nocookie.com/embed/mpwEQ3usaEc',
        description: 'Multiplicación y cociente de potencias de igual base con signos.',
      },
      {
        id: 'pl-andres-mat-02',
        topicNumber: 2,
        topicName: 'm.c.m. y M.C.D.',
        title: 'm.c.m. y M.C.D. con Descomposición en Factores Primos',
        author: 'Daniel Carreón',
        duration: '8:30',
        url: 'https://www.youtube.com/watch?v=cZp3y10x3gI',
        embedUrl: 'https://www.youtube-nocookie.com/embed/cZp3y10x3gI',
        description: 'Método rápido con tabla de descomposición simultánea.',
      },
      {
        id: 'pl-andres-mat-03',
        topicNumber: 3,
        topicName: 'Ecuaciones Lineales',
        title: 'Ecuaciones de Primer Grado con la Balanza',
        author: 'Daniel Carreón',
        duration: '9:20',
        url: 'https://www.youtube.com/watch?v=4AixPIivP4Y',
        embedUrl: 'https://www.youtube-nocookie.com/embed/4AixPIivP4Y',
        description: 'Despeje intuitivo paso a paso manteniendo el equilibrio.',
      },
      {
        id: 'pl-andres-mat-04',
        topicNumber: 4,
        topicName: 'Geometría Plana',
        title: 'Clasificación de Ángulos y Polígonos',
        author: 'Profe Alex',
        duration: '12:05',
        url: 'https://www.youtube.com/watch?v=wYNvY_bOGdc',
        embedUrl: 'https://www.youtube-nocookie.com/embed/wYNvY_bOGdc',
        description: 'Ángulos agudos, rectos, obtusos y cálculo de perímetros.',
      },
    ],
  },
  biologia: {
    id: 'andres-pl-bio',
    subjectKey: 'biologia_andres',
    subjectTitle: 'Biología · 1er Año Bachillerato',
    title: 'Lista Oficial: El Método Científico y Laboratorio Escolar',
    description: 'Videos didácticos de normas de seguridad, observación científica y materia.',
    curator: 'Cátedra Escolar Andrés Rivero',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLeySRPnY35dFQ9eXz1mY9Qn0u8w_3Zk1m',
    videos: [
      {
        id: 'pl-andres-bio-01',
        topicNumber: 1,
        topicName: 'Método Científico',
        title: 'El Método Científico en la Vida Diaria',
        author: 'Curiosamente',
        duration: '8:40',
        url: 'https://www.youtube.com/watch?v=zMYRU4S_RSk',
        embedUrl: 'https://www.youtube-nocookie.com/embed/zMYRU4S_RSk',
        description: 'Los 5 pasos fundamentales de toda investigación científica.',
      },
      {
        id: 'pl-andres-bio-02',
        topicNumber: 2,
        topicName: 'Instrumentos de Laboratorio',
        title: 'Instrumentos del Laboratorio de Biología Escolar',
        author: 'Educatina Ciencias',
        duration: '10:20',
        url: 'https://www.youtube.com/watch?v=D6Fk1Z-gG8c',
        embedUrl: 'https://www.youtube-nocookie.com/embed/D6Fk1Z-gG8c',
        description: 'Uso de la probeta, vaso de precipitados, matraz y pipeta.',
      },
      {
        id: 'pl-andres-bio-03',
        topicNumber: 3,
        topicName: 'Bioseguridad y Menisco',
        title: 'Normas de Bioseguridad y Menisco',
        author: 'Ciencias Activas',
        duration: '7:50',
        url: 'https://www.youtube.com/watch?v=vVj4zUeWb_k',
        embedUrl: 'https://www.youtube-nocookie.com/embed/vVj4zUeWb_k',
        description: 'Lectura correcta del volumen líquido en probetas y bioseguridad.',
      },
    ],
  },
  fisica: {
    id: 'andres-pl-fis',
    subjectKey: 'fisica_andres',
    subjectTitle: 'Física · 1er Año Bachillerato',
    title: 'Lista Oficial: Máquinas Simples y Conversión de Unidades',
    description: 'Lecciones visuales de magnitudes físicas, palancas y circuitos eléctricos.',
    curator: 'Cátedra Escolar Andrés Rivero',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLeySRPnY35dGz6_qW_8Y2mX4k0v1N8r2P',
    videos: [
      {
        id: 'pl-andres-fis-01',
        topicNumber: 1,
        topicName: 'Máquinas Simples',
        title: 'Máquinas Simples y Ventaja Mecánica',
        author: 'Smile and Learn',
        duration: '8:55',
        url: 'https://www.youtube.com/watch?v=Ak3M5tFo_gE',
        embedUrl: 'https://www.youtube-nocookie.com/embed/Ak3M5tFo_gE',
        description: 'Palancas de primer, segundo y tercer género.',
      },
      {
        id: 'pl-andres-fis-02',
        topicNumber: 2,
        topicName: 'Conversión de Unidades',
        title: 'Conversión de Unidades por Factores de Conversión',
        author: 'Profe Alex',
        duration: '13:30',
        url: 'https://www.youtube.com/watch?v=qjX4wKUoK7E',
        embedUrl: 'https://www.youtube-nocookie.com/embed/qjX4wKUoK7E',
        description: 'Método de cancelación de fracciones para longitud y masa.',
      },
      {
        id: 'pl-andres-fis-03',
        topicNumber: 3,
        topicName: 'Circuitos Eléctricos',
        title: 'Circuitos Eléctricos Básicos',
        author: 'Fundación Endesa',
        duration: '7:40',
        url: 'https://www.youtube.com/watch?v=nKk_1iL3c0s',
        embedUrl: 'https://www.youtube-nocookie.com/embed/nKk_1iL3c0s',
        description: 'Cómo fluyen los electrones en un circuito en serie.',
      },
    ],
  },
  castellano: {
    id: 'andres-pl-cas',
    subjectKey: 'castellano_andres',
    subjectTitle: 'Castellano y Literatura · 1er Año Bachillerato',
    title: 'Lista Oficial: Sintaxis de la Oración y Acentuación',
    description: 'Análisis gramatical, reglas de acentuación SEGA y cuento Barrabás.',
    curator: 'Cátedra Escolar Andrés Rivero',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLeySRPnY35dE2v9mY_0xW4r8k1N6t7P3L',
    videos: [
      {
        id: 'pl-andres-cas-01',
        topicNumber: 1,
        topicName: 'Literatura Venezolana',
        title: 'El Cuento Barrabás de Arturo Uslar Pietri',
        author: 'Literatura Venezolana',
        duration: '9:30',
        url: 'https://www.youtube.com/watch?v=N4tL4rV_8Qk',
        embedUrl: 'https://www.youtube-nocookie.com/embed/N4tL4rV_8Qk',
        description: 'Argumento, personajes y temas centrales del relato.',
      },
      {
        id: 'pl-andres-cas-02',
        topicNumber: 2,
        topicName: 'Sintaxis',
        title: 'Sujeto, Predicado y Núcleos de la Oración',
        author: 'Aula365',
        duration: '8:15',
        url: 'https://www.youtube.com/watch?v=W9vn4PU7e9Y',
        embedUrl: 'https://www.youtube-nocookie.com/embed/W9vn4PU7e9Y',
        description: 'Estructura bimembre de la oración simple.',
      },
      {
        id: 'pl-andres-cas-03',
        topicNumber: 3,
        topicName: 'Acentuación',
        title: 'Reglas de Acentuación: SEGA y Tildes',
        author: 'Daniel Carreón',
        duration: '8:45',
        url: 'https://www.youtube.com/watch?v=G8D0M2L3C1A',
        embedUrl: 'https://www.youtube-nocookie.com/embed/G8D0M2L3C1A',
        description: 'Clasificación de palabras agudas, graves, esdrújulas y sobresdrújulas.',
      },
    ],
  },
};

export function getAndresMultimedia(idOrEvent: string): MultimediaResource[] {
  if (!idOrEvent) return [];
  const cleanId = idOrEvent.replace(/-guide$/, '');
  return ANDRES_MULTIMEDIA_CATALOG[cleanId] || [];
}

/**
 * Obtiene la lista de reproducción oficial correspondiente al área o materia de Andrés
 */
export function getAndresPlaylistForSubject(subjectOrArea: string): CuratedPlaylist | null {
  if (!subjectOrArea) return null;
  const s = subjectOrArea.toLowerCase();
  if (s.includes('matemática') || s.includes('math') || s.includes('potenciación') || s.includes('ecuaciones') || s.includes('geometría')) {
    return ANDRES_CURATED_PLAYLISTS.matematica;
  }
  if (s.includes('biología') || s.includes('bio') || s.includes('laboratorio')) {
    return ANDRES_CURATED_PLAYLISTS.biologia;
  }
  if (s.includes('física') || s.includes('phys') || s.includes('máquinas') || s.includes('conversión')) {
    return ANDRES_CURATED_PLAYLISTS.fisica;
  }
  if (s.includes('castellano') || s.includes('lengua') || s.includes('literatura') || s.includes('barrabás') || s.includes('sintaxis')) {
    return ANDRES_CURATED_PLAYLISTS.castellano;
  }
  return null;
}
