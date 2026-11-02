/**
 * @file latexRenderer.ts
 * @description Motor de renderizado de LaTeX, KaTeX y texto mixto para fórmulas científicas y pedagógicas.
 * Diseñado con protección total contra letras pegadas, símbolos huérfanos y texto rojo de error.
 */

import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Escapa caracteres HTML para evitar inyecciones en partes de texto plano
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sanitiza determinísticamente cualquier expresión LaTeX/Química/Física
 * proveniente de JSON estático o generación dinámica.
 */
export function sanitizeLatex(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';

  let cleaned = raw
    .trim()
    // 1. Eliminar delimitadores envolventes duplicados ($...$, $$...$$, \[...\], \(...\))
    .replace(/^\$\$([\s\S]*)\$\$$/, '$1')
    .replace(/^\$([\s\S]*)\$$/, '$1')
    .replace(/^\\\[([\s\S]*)\\\]$/, '$1')
    .replace(/^\\\(([\s\S]*)\\\)$/, '$1')
    .trim();

  // 2. Recuperar comandos LaTeX dañados por secuencias de escape JSON (\t, \f, \r, \b)
  /* oxlint-disable no-control-regex */
  /* eslint-disable no-control-regex */
  cleaned = cleaned
    .replace(/\text\{/g, '\\text{')
    .replace(/(?<!\\)text\{/g, '\\text{')
    .replace(/(?<!\\)mathrm\{/g, '\\mathrm{')
    .replace(/\frac\{/g, '\\frac{')
    .replace(/(?<!\\)frac\{/g, '\\frac{')
    .replace(/\right/g, '\\right')
    .replace(/(?<!\\)left/g, '\\left')
    .replace(/\begin\{/g, '\\begin{')
    .replace(/(?<!\\)end\{/g, '\\end{')
    .replace(/(?<!\\)rightarrow/g, '\\rightarrow')
    .replace(/(?<!\\)rightleftharpoons/g, '\\rightleftharpoons')
    .replace(/(?<!\\)beta/g, '\\beta')
    .replace(/(?<!\\)tau/g, '\\tau')
    .replace(/(?<!\\)theta/g, '\\theta');
  /* oxlint-enable no-control-regex */
  /* eslint-enable no-control-regex */

  // 3. REPARACIÓN CRÍTICA: KaTeX prohíbe _ y ^ dentro de \text{...}.
  // Convierte recursivamente \text{CH_{4}} o \text{m/s^2} en \mathrm{CH_{4}}
  let previous = '';
  while (previous !== cleaned) {
    previous = cleaned;
    cleaned = cleaned.replace(
      /\\text\{\s*([^{}]*?[_^][^{}]*?(?:\{[^{}]*\}[^{}]*)*)\s*\}/g,
      '\\mathrm{$1}'
    );
  }

  return cleaned;
}

/**
 * Detecta si una cadena corresponde a un párrafo de texto en lenguaje natural en prosa
 * en lugar de una fórmula matemática pura.
 */
function isNaturalLanguageParagraph(text: string): boolean {
  if (!text) return false;
  // Si contiene comandos matemáticos explícitos de LaTeX, NUNCA es prosa simple
  if (/\\(frac|sqrt|cdot|dots|quad|sum|int|lim|to|right|left|alpha|beta|gamma|Delta|pi|in|neq|le|ge|mathbb)/.test(text)) {
    return false;
  }
  // Palabras comunes gramaticales del español que denotan oraciones completas
  const spanishWords = /\b(el|la|los|las|un|una|unos|unas|de|del|en|para|por|con|que|como|es|son|se|al|su|sus|este|esta|estos|estas)\b/i;
  const words = text.trim().split(/\s+/);
  const isWrappedInMath =
    (text.startsWith('$') && text.endsWith('$')) ||
    (text.startsWith('\\[') && text.endsWith('\\]')) ||
    (text.startsWith('\\(') && text.endsWith('\\)'));

  return words.length >= 6 && spanishWords.test(text) && !isWrappedInMath;
}

/**
 * Renderizador de LaTeX a HTML con fallback semántico libre de errores rojos
 */
export function renderLatexToHtml(
  latex: string,
  options: { displayMode?: boolean } = { displayMode: true }
): string {
  if (!latex) return '';

  // PROTECCIÓN: Si accidentalmente se pasa un párrafo de texto en prosa en vez de una fórmula pura
  if (isNaturalLanguageParagraph(latex)) {
    return renderLatex(latex, false);
  }

  const safeLatex = sanitizeLatex(latex);
  if (!safeLatex) return '';

  try {
    return katex.renderToString(safeLatex, {
      displayMode: options.displayMode ?? true,
      throwOnError: false, // Permite a KaTeX renderizar sin abortar
      strict: false,
      trust: true,
    });
  } catch {
    // Fallback semántico limpio con <sub> y <sup> (CERO texto rojo ni comandos crudos)
    return safeLatex
      .replace(/\\(?:mathrm|text|textbf)\{([^{}]+)\}/g, '$1')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '<span class="inline-flex flex-col items-center justify-center align-middle mx-1 text-xs"><span class="border-b border-current px-1">$1</span><span class="px-1">$2</span></span>')
      .replace(/\\longrightarrow|\\rightarrow|\\to/g, ' &rarr; ')
      .replace(/\\rightleftharpoons/g, ' &#8652; ')
      .replace(/\\cdot/g, ' &sdot; ')
      .replace(/\\dots/g, ' &hellip; ')
      .replace(/\\quad/g, ' &emsp; ')
      .replace(/\\mathbb\{Z\}/g, 'ℤ')
      .replace(/\\mathbb\{R\}/g, 'ℝ')
      .replace(/\\mathbb\{N\}/g, 'ℕ')
      .replace(/\\mathbb\{Q\}/g, 'ℚ')
      .replace(/_\{([^}]+)\}|_([0-9a-zA-Z]+)/g, '<sub>$1$2</sub>')
      .replace(/\^\{([^}]+)\}|\^([0-9a-zA-Z+-]+)/g, '<sup>$1$2</sup>')
      .replace(/\\,/g, ' ')
      .replace(/[{}]/g, '');
  }
}

// Caché de alto rendimiento en memoria para evitar re-compilaciones costosas de KaTeX
const latexCache = new Map<string, string>();
const MAX_CACHE_SIZE = 1500;

/**
 * Sanitiza texto plano sustituyendo comandos LaTeX de estilo y símbolos
 * comunes sueltos por su correspondiente HTML/Unicode.
 */
function formatPlainTextSegment(rawText: string): string {
  if (!rawText) return '';

  let t = rawText;

  // 0. Sanitizar artefactos tipo #@, @[...] o referencias huérfanas
  t = t.replace(/#@|##@|#\s*@/g, '');
  t = t.replace(/@\[[^\]]+\]/g, '');

  // 1. Comandos de formato tipo LaTeX en texto
  t = t.replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>');
  t = t.replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>');
  t = t.replace(/\\emph\{([^}]+)\}/g, '<em>$1</em>');
  t = t.replace(/\\underline\{([^}]+)\}/g, '<u>$1</u>');

  // 2. Markdown común dentro del texto
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // 2b. Encabezados markdown (#, ##, ###) limpios de símbolos extraños
  t = t.replace(/(?:^|\n)###\s+([^\n]+)/g, '<h4 class="font-bold text-slate-900 dark:text-white text-base mt-3 mb-1.5">$1</h4>');
  t = t.replace(/(?:^|\n)##\s+([^\n]+)/g, '<h3 class="font-bold text-slate-900 dark:text-white text-lg mt-4 mb-2">$1</h3>');
  t = t.replace(/(?:^|\n)#\s+([^\n]+)/g, '<h2 class="font-extrabold text-slate-900 dark:text-white text-xl mt-5 mb-2.5">$1</h2>');

  // 2c. Citas y notas destacadas tipo blockquote (> o &gt;)
  t = t.replace(/(?:^|\n)&gt;\s*([^\n]+)/g, '<div class="my-2.5 pl-3.5 py-2 border-l-4 border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 rounded-r-xl text-slate-800 dark:text-slate-200 font-medium">$1</div>');

  // 3. Reemplazo de comandos de LaTeX sueltos que hayan quedado en texto plano
  t = t.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '<span class="inline-flex flex-col items-center justify-center align-middle mx-1 text-xs"><span class="border-b border-current px-1">$1</span><span class="px-1">$2</span></span>');
  t = t.replace(/\\dots/g, '&hellip;');
  t = t.replace(/\\quad/g, '&emsp;');
  t = t.replace(/\\cdot/g, '&sdot;');
  t = t.replace(/\\mathbb\{Z\}/g, 'ℤ');
  t = t.replace(/\\mathbb\{R\}/g, 'ℝ');
  t = t.replace(/\\mathbb\{N\}/g, 'ℕ');
  t = t.replace(/\\mathbb\{Q\}/g, 'ℚ');
  t = t.replace(/\\longrightarrow/g, ' &rarr; ');
  t = t.replace(/\\longleftarrow/g, ' &larr; ');
  t = t.replace(/\\rightarrow/g, ' &rarr; ');
  t = t.replace(/\\leftarrow/g, ' &larr; ');
  t = t.replace(/\\implies/g, ' &rArr; ');
  t = t.replace(/\\iff/g, ' &hArr; ');
  t = t.replace(/\\pm/g, '&plusmn;');
  t = t.replace(/\\times/g, '&times;');
  t = t.replace(/\\approx/g, '&asymp;');
  t = t.replace(/\\neq/g, '&ne;');
  t = t.replace(/\\le(?:q)?/g, '&le;');
  t = t.replace(/\\ge(?:q)?/g, '&ge;');
  t = t.replace(/\\in\b/g, '&isin;');
  t = t.replace(/\\notin\b/g, '&notin;');
  t = t.replace(/\\subset\b/g, '&sub;');
  t = t.replace(/\\cup\b/g, '&cup;');
  t = t.replace(/\\cap\b/g, '&cap;');
  t = t.replace(/\\emptyset\b/g, '&empty;');
  t = t.replace(/\\Delta\b/g, '&Delta;');
  t = t.replace(/\\Sigma\b/g, '&Sigma;');
  t = t.replace(/\\pi\b/g, '&pi;');
  t = t.replace(/\\theta\b/g, '&theta;');
  t = t.replace(/\\alpha\b/g, '&alpha;');
  t = t.replace(/\\gamma\b/g, '&gamma;');
  t = t.replace(/\\omega\b/g, '&omega;');
  t = t.replace(/\\infty\b/g, '&infin;');

  // 4. Limpieza de secuencias anómalas de dólares ($$$ -> $)
  t = t.replace(/\${3,}/g, '$');

  return t;
}

/**
 * Normaliza y repara fórmulas matemáticas en textos donde faltan delimitadores de cierre
 */
function repairUnclosedMathDelimiters(text: string): string {
  let res = text;
  // Reparar casos comunes donde se abrió $ pero terminó con signo de puntuación sin cerrar $:
  // Ej: "resultado: $(-3)^2 = (+9)." -> "resultado: $(-3)^2 = (+9)$."
  res = res.replace(/\$([^\$\n]*?[=+\-*/^_{}][^\$\n]*?)(\s*[.,;:]\s*|\s*$)/g, '$$$1$$$2');
  return res;
}

/**
 * Renderizador Inteligente de Texto y Fórmulas Matemáticas.
 * Conserva el texto en español con espaciado natural, tildes y formato,
 * procesando exclusivamente las expresiones matemáticas delimitadas ($...$ o $$...$$).
 */
export function renderLatex(content: string | undefined | null, displayMode: boolean = false): string {
  if (!content) return '';

  const trimmed = content.trim();
  if (!trimmed) return '';

  const cacheKey = `${displayMode ? 'D:' : 'I:'}${trimmed}`;
  const cached = latexCache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }

  const computeResult = (): string => {
    // Si la cadena completa es un bloque matemático $$...$$ o \[...\]
    if (
      (trimmed.startsWith('$$') && trimmed.endsWith('$$')) ||
      (trimmed.startsWith('\\[') && trimmed.endsWith('\\]'))
    ) {
      const expr = trimmed.startsWith('$$') ? trimmed.slice(2, -2) : trimmed.slice(2, -2);
      return renderLatexToHtml(expr, { displayMode: true });
    }

    // Caso A: Modo bloque explícito para fórmulas puras
    if (displayMode && !isNaturalLanguageParagraph(trimmed)) {
      return renderLatexToHtml(trimmed, { displayMode: true });
    }

    // Normalizar triples signos de dólar accidentales y auto-reparar delimitadores incompletos
    let normalized = trimmed.replace(/\${3,}/g, '$');
    normalized = repairUnclosedMathDelimiters(normalized);

    // Caso B: Verificación de presencia de fórmulas matemáticas
    const hasDollarMath = normalized.includes('$');
    const hasBracketMath = normalized.includes('\\(') || normalized.includes('\\[');

    // Si no contiene delimitadores de fórmula matemática
    if (!hasDollarMath && !hasBracketMath) {
      // Si comienza directamente con un macro de fórmula pura sin texto en español (ej: "\frac{a}{b}")
      const isPureLatexFormula =
        normalized.startsWith('\\') &&
        !normalized.startsWith('\\text') &&
        !normalized.startsWith('\\textit') &&
        !normalized.startsWith('\\textbf') &&
        !isNaturalLanguageParagraph(normalized);

      if (isPureLatexFormula) {
        return renderLatexToHtml(normalized, { displayMode: false });
      }

      // De lo contrario es texto plano enriquecido
      return formatPlainTextSegment(escapeHtml(normalized));
    }

    // Caso C: Contenido mixto con delimitadores ($...$, $$...$$, \[...\], \(...\))
    try {
      let htmlResult = '';
      const mathRegex = /(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = mathRegex.exec(normalized)) !== null) {
        const plainTextSegment = normalized.slice(lastIndex, match.index);
        if (plainTextSegment) {
          htmlResult += formatPlainTextSegment(escapeHtml(plainTextSegment));
        }

        const rawToken = match[0];
        let mathExpr = '';
        let isBlock = false;

        if (rawToken.startsWith('$$') && rawToken.endsWith('$$')) {
          mathExpr = rawToken.slice(2, -2).trim();
          isBlock = true;
        } else if (rawToken.startsWith('$') && rawToken.endsWith('$')) {
          const inner = rawToken.slice(1, -1).trim();
          // Descarte de falsos positivos de precios en dólares (ej. "$110.25... de $")
          if (/^\d+(?:[.,]\d+)?\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,}/.test(inner) && !/[=+\-*/\\^_<>{}]/.test(inner)) {
            htmlResult += escapeHtml(rawToken);
            lastIndex = match.index + rawToken.length;
            continue;
          }
          mathExpr = inner;
          isBlock = false;
        } else if (rawToken.startsWith('\\[') && rawToken.endsWith('\\]')) {
          mathExpr = rawToken.slice(2, -2).trim();
          isBlock = true;
        } else if (rawToken.startsWith('\\(') && rawToken.endsWith('\\)')) {
          mathExpr = rawToken.slice(2, -2).trim();
          isBlock = false;
        }

        htmlResult += renderLatexToHtml(mathExpr, { displayMode: isBlock });
        lastIndex = match.index + rawToken.length;
      }

      if (lastIndex < normalized.length) {
        htmlResult += formatPlainTextSegment(escapeHtml(normalized.slice(lastIndex)));
      }

      return htmlResult;
    } catch {
      return formatPlainTextSegment(escapeHtml(normalized));
    }
  };

  const finalHtml = computeResult();

  if (latexCache.size >= MAX_CACHE_SIZE) {
    const firstKey = latexCache.keys().next().value;
    if (firstKey) latexCache.delete(firstKey);
  }
  latexCache.set(cacheKey, finalHtml);

  return finalHtml;
}
