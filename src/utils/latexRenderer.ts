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
  cleaned = cleaned
    .replace(/\text\{/g, '\\text{')
    .replace(/mathrm\{/g, '\\mathrm{')
    .replace(/\frac\{/g, '\\frac{')
    .replace(/\rightarrow/g, '\\rightarrow')
    .replace(/\rightleftharpoons/g, '\\rightleftharpoons')
    .replace(/\beta/g, '\\beta')
    .replace(/\tau/g, '\\tau')
    .replace(/\theta/g, '\\theta');

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

  // 4. Si aún queda algún \text{ en una expresión con subíndices/superíndices, forzar \mathrm{
  if (cleaned.includes('_') || cleaned.includes('^')) {
    cleaned = cleaned.replace(/\\text\{/g, '\\mathrm{');
  }

  return cleaned;
}

/**
 * Detecta si una cadena corresponde a un párrafo de texto en lenguaje natural
 * en lugar de una fórmula matemática pura.
 */
function isNaturalLanguageParagraph(text: string): boolean {
  if (!text) return false;
  // Si contiene múltiples palabras en español separadas por espacios y no está envuelto en $
  const words = text.trim().split(/\s+/);
  const hasMultipleWords = words.length >= 4;
  const isWrappedInMath =
    (text.startsWith('$') && text.endsWith('$')) ||
    (text.startsWith('\\[') && text.endsWith('\\]')) ||
    (text.startsWith('\\(') && text.endsWith('\\)'));

  return hasMultipleWords && !isWrappedInMath;
}

/**
 * Renderizador de LaTeX a HTML con fallback semántico libre de errores rojos
 */
export function renderLatexToHtml(
  latex: string,
  options: { displayMode?: boolean } = { displayMode: true }
): string {
  if (!latex) return '';

  // PROTECCIÓN VITAL: Si se pasa un párrafo de texto en prosa en vez de una fórmula pura,
  // delegar a renderLatex para evitar que KaTeX una todas las letras en cursiva matemática.
  if (isNaturalLanguageParagraph(latex)) {
    return renderLatex(latex, options.displayMode ?? false);
  }

  const safeLatex = sanitizeLatex(latex);
  if (!safeLatex) return '';

  try {
    return katex.renderToString(safeLatex, {
      displayMode: options.displayMode ?? true,
      throwOnError: true,
      strict: false,
      trust: true,
    });
  } catch {
    // Fallback semántico limpio con <sub> y <sup> (CERO texto rojo)
    return safeLatex
      .replace(/\\(?:mathrm|text|textbf)\{([^{}]+)\}/g, '$1')
      .replace(/\\longrightarrow|\\rightarrow|\\to/g, ' &rarr; ')
      .replace(/\\rightleftharpoons/g, ' &#8652; ')
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

  // 1. Comandos de formato tipo LaTeX en texto
  t = t.replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>');
  t = t.replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>');
  t = t.replace(/\\emph\{([^}]+)\}/g, '<em>$1</em>');
  t = t.replace(/\\underline\{([^}]+)\}/g, '<u>$1</u>');

  // 2. Markdown común dentro del texto
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // 3. Reemplazo de flechas y símbolos matemáticos que hayan quedado sueltos en texto plano
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

  // 4. Limpieza de secuencias anómalas de dólares ($$$ -> $)
  t = t.replace(/\${3,}/g, '$');

  return t;
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
    // Caso A: Modo bloque explícito para fórmulas puras
    if (displayMode && !isNaturalLanguageParagraph(trimmed)) {
      return renderLatexToHtml(trimmed, { displayMode: true });
    }

    // Normalizar triples signos de dólar accidentales
    const normalized = trimmed.replace(/\${3,}/g, '$');

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
          mathExpr = rawToken.slice(1, -1).trim();
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
