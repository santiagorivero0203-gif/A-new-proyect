/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - MÓDULO DE CALIBRACIÓN PEDAGÓGICA
 * ==============================================================================
 * Archivo: lib/pedagogicalPrompts.ts
 * Propósito: Define los perfiles cognitivos, reglas de anclaje de alcance estricto
 * y directrices anti-alucinación ("El Síndrome del Físico Cuántico") para evitar
 * que la IA sobre-analice temas básicos de 1er año con física universitaria.
 * ==============================================================================
 */

export type AcademicLevel =
  | 'BASICO_ESCOLAR'
  | 'BACHILLERATO_AVANZADO'
  | 'UNIVERSITARIO_EXACTAS'
  | 'UNIVERSITARIO_DISENO';

export interface PedagogicalGuardrailConfig {
  level: AcademicLevel;
  label: string;
  badge: string;
  description: string;
  systemInstruction: string;
  allowedMethods: string[];
  forbiddenElements: string[];
}

/**
 * Matriz de Guardarraíles Cognitivos por Nivel Académico
 */
export const PEDAGOGICAL_GUARDRAILS: Record<AcademicLevel, PedagogicalGuardrailConfig> = {
  BASICO_ESCOLAR: {
    level: 'BASICO_ESCOLAR',
    label: 'Escolar Paso a Paso (1er - 3er Año)',
    badge: '1er a 3er Año de Bachillerato',
    description: 'Enfoque elemental, explicaciones claras paso a paso y aritmética limpia sin fórmulas complejas.',
    systemInstruction: `PERFIL COGNITIVO: ESTUDIANTE DE SECUNDARIA INICIAL (1er a 3er año de bachillerato - ej. Andrés).
- TONO Y LENGUAJE: Sumamente pedagógico, claro, paciente y directo. Utiliza metáforas cotidianas simples si es necesario.
- ALCANCE MATEMÁTICO: Álgebra básica (operaciones fundamentales, ecuaciones de 1er grado, sistemas de ecuaciones lineales 2x2 sencillos, fracciones, porcentajes, factorización básica).
- MÉTODOS PERMITIDOS: Explicar paso a paso detallado mediante los métodos escolares clásicos: Sustitución, Igualación o Reducción. Pasos aritméticos explicados renglón por renglón.
- REGLA DE HIERRO ABSOLUTA: ESTÁ ESTRICTAMENTE PROHIBIDO usar matrices de Gauss-Jordan, determinantes de Cramer complejos, cálculo diferencial o integral, vectores espaciales o física universitaria.
- PROHIBICIÓN DE EXTRAPOLACIÓN: Si el ejercicio es puramente algebraico (ej: 2x + y = 5, x - y = 1), NO inventes enunciados de física, cinemática, tensiones de poleas ni dinamismos inventados. Resuelve estrictamente el álgebra escolar presentada.`,
    allowedMethods: [
      'Método de Sustitución paso a paso',
      'Método de Igualación paso a paso',
      'Método de Reducción (Suma y Resta)',
      'Aritmética fraccionaria elemental',
      'Despejes básicos de una variable'
    ],
    forbiddenElements: [
      'Matrices y eliminación Gauss-Jordan',
      'Física mecánica, cinemática o leyes de Newton en ejercicios de matemáticas puras',
      'Cálculo diferencial o integral',
      'Vectores en R2/R3 y productos cruz/escalar',
      'Notaciones abstractas avanzadas'
    ]
  },

  BACHILLERATO_AVANZADO: {
    level: 'BACHILLERATO_AVANZADO',
    label: 'Bachillerato Avanzado / Admisión (4to - 5to Año)',
    badge: '4to - 5to Año / Pruebas de Admisión',
    description: 'Rigor pre-universitario, trucos de examen, despejes ágiles y detección de distractores.',
    systemInstruction: `PERFIL COGNITIVO: ESTUDIANTE PRE-UNIVERSITARIO / BACHILLERATO AVANZADO (4to a 5to año / Admisión - ej. Prima).
- TONO Y LENGUAJE: Dinámico, estratégico, analítico y enfocado en pruebas estandarizadas (tipo UCV, UCAB, USB, UNET).
- ALCANCE MATEMÁTICO: Funciones reales, trigonometría analítica, geometría euclidiana, logaritmos, progresiones, física elemental (cinemática, estática, dinámica simple), química estequiométrica.
- MÉTODOS PERMITIDOS: Métodos rápidos de despeje, propiedades de potencias y logaritmos, análisis de opciones y descarte de distractores típicos en exámenes de admisión.
- REGLA DE HIERRO: Enfocarse en la agilidad y las trampas comunes de examen. Mantener el rigor pre-universitario sin recurrir a cálculo multivariable ni mecánica analítica superior.`,
    allowedMethods: [
      'Despejes abreviados y propiedades algebraicas',
      'Regla de Cramer para sistemas 2x2 y 3x3',
      'Identidades trigonométricas fundamentales',
      'Análisis dimensional preliminar',
      'Técnicas de descarte de distractores'
    ],
    forbiddenElements: [
      'Cálculo tensorial o mecánica cuántica',
      'Ecuaciones diferenciales parciales',
      'Espacios vectoriales abstractos de dimensión N'
    ]
  },

  UNIVERSITARIO_EXACTAS: {
    level: 'UNIVERSITARIO_EXACTAS',
    label: 'Universitario Ciencias Exactas (Física / Computación)',
    badge: 'Universidad / Ciencias Exactas e Ingeniería',
    description: 'Rigor formal demostrativo, deducciones teóricas completas, LaTeX avanzado y leyes fundamentales.',
    systemInstruction: `PERFIL COGNITIVO: ESTUDIANTE UNIVERSITARIO DE CIENCIAS EXACTAS O INGENIERÍA (ej. Santiago - Física UCV / Computación).
- TONO Y LENGUAJE: Académico formal, riguroso, deductivo y formalmente fundamentado.
- ALCANCE MATEMÁTICO/CIENTÍFICO: Cálculo diferencial e integral (una y varias variables), álgebra lineal (espacios vectoriales, valores propios), mecánica clásica vectorial, electromagnetismo, estructuras de datos y complejidad algorítmica.
- MÉTODOS PERMITIDOS: Demostraciones formales, notación LaTeX rigurosa (\\frac, \\int, \\sum, \\vec, \\nabla), análisis de condiciones de frontera, dimensionalidad formal [M][L][T].
- REGLA DE HIERRO: Máxima precisión teórica y matemática. Ningún paso deductivo debe omitirse como trivial sin justificación.`,
    allowedMethods: [
      'Deducción analítica formal',
      'Cálculo diferencial e integral',
      'Álgebra lineal y cálculo vectorial',
      'Análisis de orden asintótico Big-O',
      'Notación LaTeX rigurosa'
    ],
    forbiddenElements: [
      'Simplificaciones infantiles o lenguaje informal impreciso',
      'Omisión de demostraciones fundamentales'
    ]
  },

  UNIVERSITARIO_DISENO: {
    level: 'UNIVERSITARIO_DISENO',
    label: 'Diseño, Humanidades y Comunicación',
    badge: 'Universidad / Diseño Gráfico y Comunicación',
    description: 'Enfoque conceptual y visual. Cero invención de fórmulas numéricas; principios de composición y metodología.',
    systemInstruction: `PERFIL COGNITIVO: ESTUDIANTE UNIVERSITARIO DE DISEÑO, COMUNICACIÓN O HUMANIDADES (ej. Mafe - Diseño UCAB).
- TONO Y LENGUAJE: Creativo, conceptual, analítico, proyectual y sensible a la estética, semiótica y experiencia de usuario.
- ALCANCE TEMÁTICO: Principios de diseño visual, leyes de Gestalt, teoría del color, retículas y composición, tipografía, diseño centrado en el usuario, historia del arte y metodologías creativas.
- REGLA DE HIERRO ABSOLUTA: CERO INVENCIÓN DE FÓRMULAS MATEMÁTICAS. Si el documento trata de diseño, composición o humanidades, ESTÁ TERMINANTEMENTE PROHIBIDO inventar ecuaciones algebraicas o numéricas artificiales.
- ADAPTACIÓN DE PILARES: En lugar de fórmulas matemáticas, el campo de 'formulas' o 'principios' debe contener: 'Principios Rectores / Leyes de Composición' (ej. Ley de Tercios, Jerarquía Visual, Proporción Áurea explicada visualmente, Contraste Cromático, Ley de Proximidad).`,
    allowedMethods: [
      'Principios rectores de composición visual',
      'Análisis semiótico y jerarquía visual',
      'Metodología de Design Thinking y síntesis proyectual',
      'Reglas tipográficas y teoría del color'
    ],
    forbiddenElements: [
      'Invención de fórmulas matemáticas artificiales o irrelevantes',
      'Problemas numéricos forzados en temas puramente creativos o teóricos'
    ]
  }
};

/**
 * Directriz Global Anti-Alucinación ("El Síndrome del Físico Cuántico")
 */
export const GLOBAL_ANTI_HALLUCINATION_DIRECTIVE = `
================================================================================
DIRECTRIZ GLOBAL ANTI-ALUCINACIÓN Y ANCLAJE DE ALCANCE ESTRICTO:
1. ESTÁ ESTRICTAMENTE PROHIBIDO CAMBIAR DE ASIGNATURA. Si el documento subido o la tarea es de Matemáticas básicas de bachillerato, NO inventes enunciados de Física, Cinemática, Tensión de cuerdas, Química ni Economía.
2. Si el material es básico (ej: un sistema de 2 ecuaciones con 2 incógnitas x e y), tu deber es explicar la técnica escolar paso a paso con claridad meridiana, NO subir arbitrariamente la dificultad inventando problemas de mecánica vectorial.
3. Si el material es de Diseño o Humanidades, NO inventes fórmulas numéricas. Sintetiza principios teóricos y metodológicos reales.
4. Ceñirse al 100% al material original provisto. No extrapoles a ramas ajenas del conocimiento.
5. REGLAS ESTRICTAS DE SINTAXIS LATEX/KATEX: PROHIBICIÓN ABSOLUTA de \\text{} con subíndices o superíndices (ej. NUNCA escribas \\text{CH_{4}}, \\text{O_{2}}, \\text{H_{2}O} ni \\text{m/s^{2}}). Usa exclusivamente \\mathrm{...} (ej. \\mathrm{CH_4} + 2\\,\\mathrm{O_2} \\longrightarrow \\mathrm{CO_2} + 2\\,\\mathrm{H_2O}) o \\ce{...} de mhchem.
================================================================================
`.trim();

/**
 * Mapea el identificador de perfil del usuario de la app a un nivel cognitivo
 */
export function mapProfileToAcademicLevel(profileId?: string): AcademicLevel {
  switch (profileId) {
    case 'andres_bachillerato_1':
      return 'BASICO_ESCOLAR';
    case 'prima_bachillerato_5':
      return 'BACHILLERATO_AVANZADO';
    case 'mafe_diseno_ucab':
      return 'UNIVERSITARIO_DISENO';
    case 'santiago_fisica_ucv':
    default:
      return 'UNIVERSITARIO_EXACTAS';
  }
}

/**
 * Retorna las instrucciones completas del guardarraíl pedagógico para Gemini
 */
export function getPedagogicalGuardrails(
  academicLevel: AcademicLevel = 'BASICO_ESCOLAR',
  subject?: string,
  topic?: string
): string {
  const config = PEDAGOGICAL_GUARDRAILS[academicLevel] || PEDAGOGICAL_GUARDRAILS.BASICO_ESCOLAR;

  return `
${GLOBAL_ANTI_HALLUCINATION_DIRECTIVE}

CONFIGURACIÓN DE NIVEL SELECCIONADO: [${config.label}]
${config.systemInstruction}

Materia objetivo declarada: ${subject || 'No especificada'}
Tema objetivo declarado: ${topic || 'No especificado'}

MÉTODOS EXCLUSIVAMENTE AUTORIZADOS:
${config.allowedMethods.map((m) => `- ${m}`).join('\n')}

ELEMENTOS PROHIBIDOS PARA ESTE PERFIL:
${config.forbiddenElements.map((e) => `- ${e}`).join('\n')}
`.trim();
}

/**
 * Construye el prompt completo para la deconstrucción pedagógica de guías
 */
export function buildStudyGuidePrompt(params: {
  academicLevel: AcademicLevel;
  subject: string;
  topic: string;
  documentText?: string;
  documentUrl?: string;
}): string {
  const { academicLevel, subject, topic, documentText, documentUrl } = params;
  const guardrails = getPedagogicalGuardrails(academicLevel, subject, topic);

  const isDesignOrCreative = academicLevel === 'UNIVERSITARIO_DISENO';

  return `
Actúa como un Deconstructor Pedagógico Senior y Creador de Material de Estudio de Alto Rendimiento.

${guardrails}

TAREA:
Analiza el siguiente contenido de estudio perteneciente a la materia "${subject}" sobre el tema "${topic}" y genera una guía de estudio deconstruida con los 7 pilares pedagógicos y una batería de 5 preguntas de evaluación diagnóstica.

INFORMACIÓN DEL DOCUMENTO:
- Enlace / Ruta: ${documentUrl || 'N/A'}
- Contenido / Extracto del documento:
${documentText ? documentText.slice(0, 4000) : 'Analiza el tema especificado a partir del título y requerimientos curriculares oficiales.'}

FORMATO ESTRICTO DE SALIDA (DEBE SER EXCLUSIVAMENTE UN OBJETO JSON VÁLIDO SIN TEXTO ADICIONAL):
{
  "guide": {
    "title": "${topic}",
    "area": "${subject}",
    "content": {
      "theory": "Explicación teórica adaptada estrictamente al nivel ${academicLevel}. Usa notación LaTeX con barras dobles para que el JSON sea válido (ej: \\\\frac{a}{b}, \\\\sqrt{x}).",
      "glossary": [
        {
          "term": "Nombre del concepto",
          "definition": "Definición concisa y adecuada al nivel"
        }
      ],
      "formulas": [
        {
          "name": "${isDesignOrCreative ? 'Principio Rector / Regla de Composición' : 'Fórmula o Ecuación Fundamental'}",
          "latex": "${isDesignOrCreative ? 'Regla Visual / Criterio' : '\\\\mathrm{Ecuación en LaTeX: NUNCA uses \\\\text{X_{n}} con subíndices; usa \\\\mathrm{CH_4} o \\\\ce{...}}'}",
          "description": "Explicación de cuándo y cómo aplicarla"
        }
      ],
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Paso 1: Identificación",
          "instruction": "Instrucción clara de lo que se debe hacer en este paso"
        }
      ],
      "alerts": [
        "Trampa o error común típico que los estudiantes cometen en exámenes"
      ],
      "cornellNotes": {
        "cues": ["Pregunta clave o pista 1", "Pista 2"],
        "notes": "Síntesis de apuntes en el formato Cornell",
        "summary": "Resumen final en 2 o 3 oraciones"
      },
      "flashcards": [
        {
          "front": "Pregunta de evocación activa (Active Recall)",
          "back": "Respuesta directa y clara"
        }
      ]
    }
  },
  "questions": [
    {
      "subject": "${subject}",
      "topic": "${topic}",
      "area": "${subject}",
      "type": "opcion_multiple",
      "question": "Enunciado del problema adecuado estrictamente a ${academicLevel}",
      "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
      "correct_answer": "Opción A",
      "difficulty": "FACIL",
      "explanation": "Explicación paso a paso de por qué esta es la respuesta correcta y dónde está el error común en los distractores."
    }
  ]
}

IMPORTANTE SOBRE JSON Y LATEX:
Cualquier barra invertida en fórmulas LaTeX debe estar DOBLEMENTE ESCAPADA dentro del string JSON (es decir, escribe \\\\frac en vez de \\frac, y \\\\sqrt en vez de \\sqrt). No incluyas bloques de código markdown extraños fuera del JSON.
`.trim();
}

/**
 * Construye el prompt para el desglose inteligente de tareas Kanban estilo Notion AI
 */
export function buildTaskBreakdownPrompt(params: {
  academicLevel: AcademicLevel;
  taskTitle: string;
  subject: string;
  notes?: string;
}): string {
  const { academicLevel, taskTitle, subject, notes } = params;
  const guardrails = getPedagogicalGuardrails(academicLevel, subject, taskTitle);

  return `
Actúa como un Planificador de Productividad Académica y Notion AI Senior.

${guardrails}

TAREA A DESGLOSAR:
- Título del Objetivo: "${taskTitle}"
- Asignatura: "${subject}"
- Detalles/Notas del estudiante: "${notes || 'Ninguna especificada'}"
- Perfil del estudiante: ${academicLevel}

INSTRUCCIÓN:
Desglosa esta tarea en pasos secuenciales accionables, estima los bloques de Pomodoro de 25 minutos requeridos, asigna la prioridad y ofrece un consejo estratégico de estudio ajustado al nivel.

FORMATO ESTRICTO DE SALIDA (EXCLUSIVAMENTE OBJETO JSON VÁLIDO):
{
  "priority": "ALTA" | "MEDIA" | "BAJA",
  "estimated_pomodoros": 3,
  "subtasks": [
    "Paso 1: Acción concreta y realizable en 1 bloque de estudio",
    "Paso 2: Acción subsiguiente",
    "Paso 3: Verificación final"
  ],
  "strategic_advice": "Consejo metodológico práctico de 1 a 2 oraciones para maximizar la retención o evitar procrastinación."
}
`.trim();
}

/**
 * Limpiador tolerante a LaTeX para respuestas JSON de Gemini
 * Resuelve el problema clásico de barras invertidas simples (\frac, \sqrt, \alpha)
 * que rompen JSON.parse en NodeJS y el navegador.
 */
export function cleanAndParseJsonWithLatex<T = unknown>(rawOutput: string): T {
  if (!rawOutput || typeof rawOutput !== 'string') {
    throw new Error('La respuesta de la IA está vacía o no es un string.');
  }

  // 1. Extraer bloque markdown json si viene envuelto
  let cleaned = rawOutput.trim();
  const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
  const match = jsonBlockRegex.exec(cleaned);
  if (match && match[1]) {
    cleaned = match[1].trim();
  }

  // 2. Si hay texto antes del primer '{' o después del último '}', recortar
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  // 3. Intento 1: parseo directo
  try {
    return JSON.parse(cleaned) as T;
  } catch (_firstErr) {
    // Si falla, el error más probable son barras invertidas simples en LaTeX (ej: \frac, \sqrt, \vec, \alpha)
    // que JSON.parse interpreta como secuencias de escape inválidas si no van seguidas de " \ / b f n r t u
  }

  // 4. Intento 2: Reparar barras invertidas no escapadas (incluyendo comandos LaTeX como \frac, \sqrt, \alpha, \theta, \tau, \nabla)
  try {
    // Reemplaza barras simples que NO sean comillas escapadas (\") o barras dobles ya escapadas (\\)
    const fixedEscapes = cleaned.replace(
      /\\(?!["\\/]|u[0-9a-fA-F]{4})/g,
      '\\\\'
    );
    return JSON.parse(fixedEscapes) as T;
  } catch (_secondErr) {
    // 5. Intento 3: Reemplazo con remoción de caracteres de control huérfanos
    try {
      const sanitized = cleaned
        .replace(/[\u0000-\u001F]+/g, (c) => (c === '\n' || c === '\r' || c === '\t' ? c : ''))
        .replace(/\\(?!["\\/]|u[0-9a-fA-F]{4})/g, '\\\\');
      return JSON.parse(sanitized) as T;
    } catch (finalErr: any) {
      throw new Error(
        `Error al parsear el JSON generado por la IA (LaTeX mal escapado): ${finalErr.message}. Fragmento: ${cleaned.slice(0, 200)}...`
      );
    }
  }
}
