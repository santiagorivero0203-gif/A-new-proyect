/**
 * @file extraGuides.ts
 * @description Guías Académicas Deconstruidas en 7 Pilares para completar el 100%
 * de las asignaturas del cronograma oficial de Andrés Rivero (1er Año de Bachillerato):
 *
 * - Guía 11 (`andres-inf-computing-office`): Materia Práctica · Informática, Archivos, Word y Hojas de Cálculo.
 * - Guía 12 (`andres-fe-consolacion-values`): Educación en la Fe · DOMUND, Santa María Rosa Molas y Carisma Consolación.
 */

import type { DeconstructedAcademicGuide } from '../../types/deconstruction.types';
import { ANDRES_PROFILE_ID, buildGuideQuestions } from './questionBuilder';
import { ANDRES_INF_SEEDS, ANDRES_FE_SEEDS } from './humanitiesTechQuestions';

// ============================================================================
// GUÍA 11: INFORMÁTICA PRÁCTICA · COMPUTACIÓN, ARCHIVOS, WORD Y EXCEL
// ============================================================================
export const ANDRES_INF_COMPUTING_GUIDE: DeconstructedAcademicGuide = {
  id: 'andres-inf-computing-office',
  userId: ANDRES_PROFILE_ID,
  sourceType: 'document',
  discipline: 'science',
  createdAt: '2026-11-01T00:00:00.000Z',
  guideMetadata: {
    title: 'Informática Práctica: Evolución del PC, Hardware/Software, Archivos y Ofimática',
    area: 'Diseño Digital & Informática · 1er Año Bachillerato',
    summary:
      'Guía oficial completa para las 5 evaluaciones de Materia Práctica (Laboratorio de Computación): generaciones de computadoras e historia de la web, CPU/RAM/SSD y periféricos, documentos formales en Word, árbol de carpetas y extensiones, y fórmulas básicas en Hojas de Cálculo.',
  },
  phenomenonAndTheory: [
    '### UNIDAD I: EVOLUCIÓN DE LAS COMPUTADORAS E INTERNET',
    'Las computadoras modernas evolucionaron a través de hitos electrónicos bien definidos:',
    '• **1ra Generación (1940–1956):** Usaban enormes **válvulas o tubos de vacío** (como ENIAC), generaban mucho calor y ocupaban salones enteros.',
    '• **2da Generación (1956–1963):** El **transistor** reemplazó a las válvulas, haciendo los equipos más pequeños, rápidos y confiables.',
    '• **3ra Generación (1964–1971):** Aparecieron los **circuitos integrados** (chips de silicio).',
    '• **4ta Generación (1971–Presente):** La invención del **microprocesador** integró toda la CPU en un solo chip, dando nacimiento a las computadoras personales (PC) y portátiles.',
    '• **Internet y la Web:** Internet nació como red académica/militar (ARPANET), y Tim Berners-Lee creó la **World Wide Web (WWW)**. Recuerda distinguir entre **Navegador** (programa como Chrome, Edge o Firefox) y **Buscador** (servicio como Google o Bing para consultar palabras clave).',
    '',
    '### UNIDAD II: ARQUITECTURA DEL COMPUTADOR (HARDWARE Y SOFTWARE)',
    '• **Hardware (Parte física y tangible):**',
    '   – *CPU (Unidad Central de Procesamiento):* El cerebro que interpreta instrucciones y realiza cálculos.',
    '   – *Memoria RAM:* Memoria de trabajo ultrarrápida pero **volátil** (se borra al apagar el equipo si no guardaste).',
    '   – *Disco Duro / Unidad SSD:* Almacenamiento **no volátil** donde tus tareas, fotos y programas quedan guardados permanentemente.',
    '   – *Periféricos de Entrada:* Teclado, ratón (mouse), micrófono, escáner, cámara web.',
    '   – *Periféricos de Salida:* Monitor, impresora, cornetas, audífonos.',
    '   – *Periféricos Mixtos (Entrada/Salida):* Pantalla táctil, unidades USB.',
    '• **Software (Parte lógica e intangible):**',
    '   – *Sistema Operativo:* Software base indispensable (Windows, Linux, macOS, Android) que administra el hardware.',
    '   – *Software de Aplicación:* Programas para tareas concretas (Word, Excel, navegadores, editores gráficos).',
    '',
    '### UNIDAD III: SISTEMA DE ARCHIVOS Y PROCESAMIENTO DE TEXTOS',
    '• **Árbol de Directorios:** Consiste en organizar una carpeta raíz (ej. `1er_Año_Andres`) con subcarpetas por asignatura (`Matematica`, `Biologia`, `Castellano`) y respaldos periódicos (**Backup**) en la nube o memoria USB.',
    '• **Extensiones de Archivo:** Indican el tipo de documento tras el punto final: `.docx` (texto editable), `.pdf` (documento fijo portátil listo para imprimir), `.xlsx` (hoja de cálculo), `.jpg` / `.png` (imágenes).',
    '• **Documentos Formales en Procesador de Textos:**',
    '   – Usar **alineación justificada** en los párrafos del cuerpo para que ambos márgenes luzcan rectos y pulcros.',
    '   – Aplicar **sangría de primera línea** e interlineado legible ($1.15$ o $1.5$).',
    '   – Insertar **tablas** ordenadas multiplicando columnas verticales por filas horizontales.',
    '',
    '### UNIDAD IV: HOJAS DE CÁLCULO Y GRÁFICOS ESCOLARES',
    'Una hoja de cálculo (Excel / Calc) organiza datos numéricos en una cuadrícula:',
    '• **Columnas:** Identificadas con letras verticales (`A, B, C, D...`).',
    '• **Filas:** Identificadas con números horizontales (`1, 2, 3, 4...`).',
    '• **Celda:** Intersección exacta de una columna y una fila (ej. `B4`). Un grupo continuo como `B2:B5` se llama **rango**.',
    '> **Regla de Oro en Hojas de Cálculo:** Toda fórmula matemática comienza obligatoriamente con el signo igual (`=`).',
    '   – Sumar notas o gastos: `=SUMA(B2:B5)`',
    '   – Calcular el promedio de calificaciones: `=PROMEDIO(B2:B5)`',
  ].join('\n'),
  glossary: [
    { term: 'Hardware', symbolOrUnit: 'Tangible', definition: 'Conjunto de piezas físicas, electrónicas y mecánicas del computador que podemos tocar.' },
    { term: 'Software', symbolOrUnit: 'Lógico', definition: 'Conjunto de programas, sistema operativo e instrucciones digitales que hacen funcionar al computador.' },
    { term: 'Memoria RAM', symbolOrUnit: 'GB (Volátil)', definition: 'Memoria temporal de acceso aleatorio donde residen los programas abiertos mientras hay energía.' },
    { term: 'Extensión de Archivo', symbolOrUnit: '.pdf / .docx', definition: 'Sufijo después del punto en el nombre de un archivo que identifica su formato y programa asociado.' },
    { term: 'Celda', symbolOrUnit: 'Columna+Fila', definition: 'Unidad básica de una hoja de cálculo nombrada por su letra de columna y número de fila (ej. C5).' },
    { term: 'Backup', symbolOrUnit: 'Respaldo', definition: 'Copia de seguridad de archivos importantes guardada en la nube o dispositivo externo.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      {
        name: 'Escala de Unidades de Almacenamiento Digital',
        latex: '$$1\\,\\text{Byte} = 8\\,\\text{bits} \\quad < \\quad \\text{KB} \\quad < \\quad \\text{MB} \\quad < \\quad \\text{GB} \\quad < \\quad \\text{TB}$$',
        application: 'Comparación del peso de documentos, canciones, memorias USB y discos SSD.',
      },
      {
        name: 'Total de Celdas en una Tabla',
        latex: '$$N_{\\text{celdas}} = \\text{Columnas} \\times \\text{Filas}$$',
        application: 'Diseño rápido de horarios y cuadros comparativos en procesadores de texto.',
      },
      {
        name: 'Sintaxis de Fórmulas en Hoja de Cálculo',
        latex: '$$\\texttt{=SUMA(A1:A5)} \\qquad | \\qquad \\texttt{=PROMEDIO(B2:B5)}$$',
        application: 'Automatización de sumatorias y promedios de notas escolares.',
      },
    ],
    mnemonicsAndPatterns: [
      'Atajos salvavidas: Ctrl+C (Copiar), Ctrl+X (Cortar), Ctrl+V (Pegar), Ctrl+Z (Deshacer un error al instante).',
      'Sin signo igual (=) al principio, Excel cree que estás escribiendo texto normal y NO calcula nada.',
      'La RAM es el pupitre donde trabajas hoy; el SSD/Disco Duro es tu mochila donde todo queda guardado al salir.',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Cálculo automático del promedio del I Momento en Hoja de Cálculo',
      problemStatement:
        'En una hoja de cálculo anotaste tus 4 calificaciones de Biología en las celdas `C2` (19), `C3` (18), `C4` (20) y `C5` (19). ¿Cómo programas la celda `C6` para obtener el promedio exacto?',
      deductiveSteps: [
        '1. Haz clic sobre la celda destino donde quieres ver el resultado (`C6`).',
        '2. Escribe siempre primero el signo igual (`=`) para activar el modo de cálculo.',
        '3. Escribe el nombre de la función estadística `PROMEDIO` seguido de paréntesis y el rango continuo separado por dos puntos: `=PROMEDIO(C2:C5)`.',
        '4. Presiona `Enter`: el programa suma $19 + 18 + 20 + 19 = 76$ y divide entre $4$, mostrando automáticamente `19`.',
      ],
      finalResult: 'Fórmula exacta en C6: `=PROMEDIO(C2:C5)` → Resultado: 19 pts.',
    },
    {
      title: 'Organización de un Árbol de Carpetas Escolar Limpio',
      problemStatement:
        'Debes organizar en el computador del laboratorio los archivos `Tarea_Enteros.docx`, `Menisco_Lab.pdf` y `Presupuesto.xlsx` dentro de una estructura en árbol.',
      deductiveSteps: [
        '1. Crear la carpeta principal o raíz llamada `Andres_Rivero_1er_Año`.',
        '2. Dentro de esa carpeta raíz, crear tres subcarpetas: `01_Matematica`, `02_Biologia` y `03_Informatica`.',
        '3. Mover cada archivo según su tema y extensión: `.docx` de enteros a `01_Matematica`, `.pdf` de laboratorio a `02_Biologia` y `.xlsx` a `03_Informatica`.',
      ],
      finalResult: 'Árbol jerárquico ordenado, sin archivos sueltos en el Escritorio y fácil de respaldar.',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: 'Escribir en Excel `SUMA(A1:A5)` olvidando el signo `=` al comienzo.',
      correction: 'Toda fórmula o función en hojas de cálculo exige empezar con `=` (`=SUMA(A1:A5)`). Si no lo pones, quedará escrito como simple texto.',
    },
    {
      trap: 'Confundir Navegador Web con Buscador Web en el examen teórico.',
      correction: 'Chrome, Edge, Safari y Firefox son NAVEGADORES (programas instalados); Google, Bing y DuckDuckGo son BUSCADORES (sitios para consultar).',
    },
    {
      trap: 'Entregar trabajos formales con todos los párrafos centrados o desalineados.',
      correction: 'Usa alineación Centrada solo para portadas o títulos; el texto de desarrollo debe ir con alineación Justificada.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Qué diferencia hay entre la memoria RAM y una unidad SSD?', back: 'La RAM es memoria temporal volátil (se borra al apagar); el SSD guarda tus archivos de forma permanente.' },
      { front: '¿Qué invención dio inicio a la 4ta Generación de computadoras?', back: 'El microprocesador (integración de la CPU en un solo chip de silicio).' },
      { front: '¿Por qué la pantalla táctil es un periférico mixto?', back: 'Porque muestra imágenes hacia el usuario (salida) y recibe toques/órdenes hacia el sistema (entrada).' },
      { front: '¿Qué indican las extensiones .docx, .pdf y .xlsx?', back: '.docx = documento de texto editable; .pdf = documento fijo portátil; .xlsx = hoja de cálculo.' },
      { front: '¿Cuál es el atajo de teclado para deshacer un borrado accidental?', back: 'Ctrl + Z.' },
      { front: '¿Cómo se nombra la celda situada en la cuarta columna y octava fila?', back: 'Celda D8 (primero la letra de columna D y luego el número de fila 8).' },
    ],
    cornellSynthesis: {
      cues: [
        '4 Generaciones PC',
        'Hardware vs Software',
        'RAM vs SSD',
        'Árbol y Extensiones',
        'Hojas de Cálculo',
      ],
      notes: [
        'Válvulas → Transistores → Circuitos integrados → Microprocesador.',
        'Hardware es físico (CPU, teclado); Software es lógico (SO, Word, Excel).',
        'RAM = temporal volátil; SSD/HDD = permanente.',
        'Carpetas jerárquicas y extensiones (.docx, .pdf, .xlsx, .jpg).',
        'Columnas con letras, filas con números y fórmulas con signo igual (=SUMA, =PROMEDIO).',
      ],
      summary:
        'Dominar la arquitectura del computador, la organización limpia de archivos y las herramientas ofimáticas permite presentar informes impecables y automatizar cálculos durante todo el bachillerato.',
    },
    conceptMapNodes:
      'Informática 1er Año --> Historia (Válvulas a Microprocesador); Computador --> Hardware (CPU, RAM, SSD, Periféricos) + Software (Sistema Operativo, Aplicaciones); Ofimática --> Word (Justificado, Tablas) + Archivos (Árbol, .pdf/.docx) + Excel (Celdas, =SUMA, =PROMEDIO)',
  },
  generatedQuestions: buildGuideQuestions(ANDRES_INF_SEEDS),
};

// ============================================================================
// GUÍA 12: EDUCACIÓN EN LA FE · DOMUND, CARISMA CONSOLACIÓN Y CONVIVENCIA
// ============================================================================
export const ANDRES_FE_CONSOLACION_GUIDE: DeconstructedAcademicGuide = {
  id: 'andres-fe-consolacion-values',
  userId: ANDRES_PROFILE_ID,
  sourceType: 'document',
  discipline: 'design',
  createdAt: '2026-11-01T00:00:00.000Z',
  guideMetadata: {
    title: 'Educación en la Fe: DOMUND, Santa María Rosa Molas, Carisma Consolación y Convivencia',
    area: 'Castellano & Educación en la Fe · 1er Año Bachillerato',
    summary:
      'Guía formativa oficial para Pastoral y Educación en la Fe del Colegio Consolación. Abarca el sentido misionero del DOMUND, la vida y obra de Santa María Rosa Molas, el Diario de Gratitud, la parábola del Buen Samaritano y las normas de convivencia escolar fraterna.',
  },
  phenomenonAndTheory: [
    '### CAPÍTULO 1 · SENTIDO MISIONERO Y JORNADA DEL DOMUND',
    '• **¿Qué es el DOMUND?:** Cada penúltimo domingo de octubre la Iglesia celebra el **Domingo Mundial de las Misiones (DOMUND)**, una jornada universal de oración, toma de conciencia y solidaridad material con los territorios de misión y los pueblos más vulnerables.',
    '• **Misión en lo Cotidiano:** Ser misionero en 1er año de bachillerato significa abrir el corazón sin egoísmo: acoger con respeto al compañero nuevo, compartir el conocimiento y servir con alegría en casa y en el salón.',
    '',
    '### CAPÍTULO 2 · SANTA MARÍA ROSA MOLAS Y EL CARISMA DE LA CONSOLACIÓN',
    '• **Biografía Esencial (1815–1876):** María Rosa Molas Vallvé nació en **Reus (España)** en 1815. Desde joven sintió un profundo llamado a aliviar el dolor humano en hospitales, asilos y escuelas.',
    '• **Fundación (1857):** En Tortosa dio inicio a la Congregación de las **Hermanas de Nuestra Señora de la Consolación**, canonizada por San Juan Pablo II en 1988.',
    '• **El Carisma de la Consolación:** Consiste en ser **rostro visible de la misericordia y el consuelo de Dios** ante cualquier dolor, soledad o ignorancia, educando con cercanía, firmeza serena, paciencia y coherencia entre palabras y obras.',
    '',
    '### CAPÍTULO 3 · GRATITUD, EMPATÍA Y SERVICIO AL PRÓJIMO',
    '• **El Diario de Gratitud:** Ejercicio reflexivo donde reconocemos diariamente los dones recibidos (la vida, la salud, el esfuerzo de nuestros padres, la guía de los maestros y la amistad), superando la queja y fortaleciendo la paz interior.',
    '• **Empatía vs Solidaridad:** La **empatía** es comprender lo que siente el otro poniéndonos en su lugar; la **solidaridad** da el paso siguiente: actuar concretamente para ayudarlo con honestidad.',
    '• **Referente Bíblico (El Buen Samaritano):** Jesús enseña que prójimo es toda persona necesitada y que el verdadero amor no pasa de largo con indiferencia, sino que se detiene, cuida y sana.',
    '',
    '### CAPÍTULO 4 · CONVIVENCIA ESCOLAR FRATERNA Y CUIDADO DE LA CASA COMÚN',
    '• **Diálogo y Escucha Activa:** Los desacuerdos en trabajos grupales se resuelven escuchando sin interrumpir, hablando con respeto y rechazando toda burla o exclusión (*bullying*).',
    '• **Autodisciplina y Pertenencia:** El porte digno del uniforme escolar, la puntualidad y la honestidad en los exámenes expresan respeto por uno mismo y por toda la comunidad.',
    '• **Ecología Escolar:** Cuidar pupitres, salones, jardines, agua y energía honra la Casa Común y el trabajo del personal de mantenimiento.',
  ].join('\n'),
  glossary: [
    { term: 'DOMUND', symbolOrUnit: 'Misión Universal', definition: 'Domingo Mundial de las Misiones: jornada católica anual de solidaridad y apoyo a la labor misionera.' },
    { term: 'Santa María Rosa Molas', symbolOrUnit: 'Reus, 1815–1876', definition: 'Fundadora de las Hermanas de Nuestra Señora de la Consolación y modelo de entrega educativa y caritativa.' },
    { term: 'Carisma Consolación', symbolOrUnit: 'Identidad', definition: 'Don espiritual y educativo centrado en acompañar, aliviar, educar y consolar activamente al prójimo.' },
    { term: 'Empatía', symbolOrUnit: 'Valor Humano', definition: 'Capacidad afectiva y cognitiva de sintonizar y comprender los sentimientos y dificultades de otra persona.' },
    { term: 'Solidaridad', symbolOrUnit: 'Compromiso', definition: 'Virtud ética que transforma la compasión en ayuda efectiva y desinteresada hacia el bien común.' },
    { term: 'Casa Común', symbolOrUnit: 'Ecología Integral', definition: 'Llamado a cuidar responsablemente la naturaleza, el entorno escolar y los bienes compartidos.' },
  ],
  formulasAndStrategies: {
    coreFormulas: [
      {
        name: 'Ruta del Servicio Consolación',
        latex: '$$\\text{Mirar con Atención} \\longrightarrow \\text{Sentir Empatía} \\longrightarrow \\text{Actuar con Solidaridad}$$',
        application: 'Método inspirado en el Buen Samaritano para responder ante las necesidades del aula y la familia.',
      },
      {
        name: 'Coherencia Ética Personal',
        latex: '$$\\text{Pensamiento Recto} + \\text{Palabra Respetuosa} + \\text{Obra Honesta} = \\text{Integridad}$$',
        application: 'Criterio de autoevaluación actitudinal y convivencia diaria.',
      },
    ],
    mnemonicsAndPatterns: [
      'Reus 1815 → Fundación 1857 → Santa María Rosa Molas: educar consolando con el ejemplo.',
      'Ante cualquier conflicto grupal: P.E.D. (Parar antes de gritar, Escuchar al compañero, Dialogar soluciones).',
      'La solidaridad escolar auténtica explica y enseña al amigo; nunca consiste en fomentar la copia.',
    ],
  },
  stepByStepExamples: [
    {
      title: 'Aplicación práctica del Carisma Consolación ante un compañero enfermo',
      problemStatement:
        'Un compañero de tu salón faltó tres días por fiebre y regresa preocupado porque el viernes hay taller de Ciencias. ¿Cómo actúas desde los valores del colegio?',
      deductiveSteps: [
        '1. Acogida y escucha (Empatía): Saludarlo con alegría sincera y preguntarle cómo sigue de salud.',
        '2. Ayuda concreta y honesta (Solidaridad): Prestarle tus apuntes ordenados para que se ponga al día y explicarle en el recreo la lectura del menisco.',
        '3. Integración grupal (Fraternidad): Invitarlo a repasar con tu equipo para que recupere confianza antes de la práctica.',
      ],
      finalResult: 'Tu compañero comprende el tema por mérito propio y experimenta el consuelo y apoyo real de su salón.',
    },
    {
      title: 'Redacción de una entrada significativa en el Diario de Gratitud',
      problemStatement:
        'Debes escribir una reflexión breve en tu Diario de Gratitud uniendo vida familiar y vida escolar.',
      deductiveSteps: [
        '1. Identificar un gesto concreto recibido hoy (ej. el desayuno temprano preparado en casa y la paciencia del profesor al explicar).',
        '2. Reconocer el esfuerzo humano detrás de ese gesto.',
        '3. Formular un compromiso sencillo de reciprocidad (ej. ordenar mi cuarto sin que me lo pidan y escuchar atento en clase).',
      ],
      finalResult: 'Reflexión auténtica que une agradecimiento interior con compromiso práctico.',
    },
  ],
  commonErrorsAlerts: [
    {
      trap: 'Confundir "solidaridad" con dejar que un compañero copie nuestras respuestas en pleno examen.',
      correction: 'Hacer trampa perjudica el aprendizaje de ambos. La verdadera solidaridad es estudiar juntos antes de la prueba y explicar con paciencia.',
    },
    {
      trap: 'Pensar que quedarse callado viendo una burla escolar nos hace "neutrales".',
      correction: 'La indiferencia alimenta la exclusión. Integrar con respeto al compañero afectado y avisar al docente orientador protege la dignidad de todos.',
    },
    {
      trap: 'Creer que el DOMUND es solo una colecta económica sin compromiso personal.',
      correction: 'El DOMUND une oración, conciencia fraterna universal y cambio de corazón hacia los más necesitados.',
    },
  ],
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Qué significa la sigla DOMUND?', back: 'Domingo Mundial de las Misiones.' },
      { front: '¿Quién fundó las Hermanas de Nuestra Señora de la Consolación?', back: 'Santa María Rosa Molas (nacida en Reus, España, 1815–1876).' },
      { front: '¿Cuál es el corazón del Carisma de la Consolación?', back: 'Ser presencia cercana de misericordia, alivio, educación y consuelo activo hacia quien sufre o necesita apoyo.' },
      { front: '¿Qué diferencia hay entre empatía y solidaridad?', back: 'La empatía comprende el sentimiento ajeno; la solidaridad actúa con hechos concretos para ayudar.' },
      { front: '¿Qué parábola bíblica ilustra el servicio sin prejuicios al herido en el camino?', back: 'La parábola del Buen Samaritano.' },
      { front: '¿Qué tres pasos resuelven pacíficamente un desacuerdo en equipo?', back: 'Escucha activa sin interrumpir, diálogo respetuoso y búsqueda de un acuerdo justo.' },
    ],
    cornellSynthesis: {
      cues: [
        'DOMUND',
        'Sta. María Rosa Molas',
        'Carisma Consolación',
        'Gratitud y Samaritano',
        'Convivencia y Casa Común',
      ],
      notes: [
        'Jornada universal misionera de octubre: fraternidad sin fronteras.',
        'Fundadora en 1857; testimonio coherente de caridad y educación.',
        'Consolar es acompañar y aliviar con obras reales.',
        'El Diario de Gratitud y el Buen Samaritano inspiran empatía activa.',
        'Respeto al uniforme, honestidad académica y cuidado ecológico del aula.',
      ],
      summary:
        'La Educación en la Fe forma el corazón y el carácter de 1er año integrando gratitud familiar, excelencia honesta en el estudio y servicio fraterno al estilo de Santa María Rosa Molas.',
    },
    conceptMapNodes:
      'Educación en la Fe --> DOMUND (Misión Universal); Identidad --> Santa María Rosa Molas --> Carisma de la Consolación (Misericordia y Servicio); Valores --> Diario de Gratitud + Empatía + Buen Samaritano; Convivencia --> Escucha Activa + Honestidad + Cuidado de la Casa Común',
  },
  generatedQuestions: buildGuideQuestions(ANDRES_FE_SEEDS),
};
