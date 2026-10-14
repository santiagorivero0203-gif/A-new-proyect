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
 * proveniente de JSON estático (simadi_guides.json / simadi_preguntas.json) o de geminiService.ts
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
    .replace(/\mathrm\{/g, '\\mathrm{')
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
 * Renderizador de LaTeX a HTML con fallback semántico libre de errores rojos
 */
export function renderLatexToHtml(
  latex: string,
  options: { displayMode?: boolean } = { displayMode: true }
): string {
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
    // Fallback automático: convierte a HTML semántico limpio con <sub> y <sup> (CERO texto rojo)
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
 * Renderizador Inteligente de Texto y Fórmulas Matemáticas
 * Mantiene la compatibilidad global para renderLatex(...) en todo el proyecto.
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
    // Caso A: Modo bloque explícito para campos dedicados a fórmulas (ej. latexFormula)
    if (displayMode) {
      return renderLatexToHtml(trimmed, { displayMode: true });
    }

    // Caso B: Verificación de presencia de fórmulas matemáticas
    const hasDollarMath = trimmed.includes('$');
    const hasBracketMath = trimmed.includes('\\(') || trimmed.includes('\\[');
    const startsWithLatexMacro = trimmed.startsWith('\\') && !trimmed.startsWith('\\n') && !trimmed.startsWith('\\t');

    // Si no hay delimitadores ni comandos LaTeX, es texto plano natural en español
    if (!hasDollarMath && !hasBracketMath && !startsWithLatexMacro) {
      return escapeHtml(trimmed);
    }

    // Si comienza con un comando de fórmula pura pero no tiene delimitadores $ (ej. \vec{u} \cdot \vec{v})
    if (startsWithLatexMacro && !hasDollarMath && !hasBracketMath) {
      return renderLatexToHtml(trimmed, { displayMode: false });
    }

    // Caso C: Contenido mixto con delimitadores ($...$ o $$...$$)
    try {
      let htmlResult = '';
      const mathRegex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = mathRegex.exec(trimmed)) !== null) {
        const plainTextSegment = trimmed.slice(lastIndex, match.index);
        if (plainTextSegment) {
          htmlResult += escapeHtml(plainTextSegment);
        }

        const rawToken = match[0];
        const isBlock = rawToken.startsWith('$$');
        const mathExpr = isBlock ? rawToken.slice(2, -2).trim() : rawToken.slice(1, -1).trim();

        htmlResult += renderLatexToHtml(mathExpr, { displayMode: isBlock });
        lastIndex = match.index + rawToken.length;
      }

      if (lastIndex < trimmed.length) {
        htmlResult += escapeHtml(trimmed.slice(lastIndex));
      }

      return htmlResult;
    } catch {
      return escapeHtml(trimmed);
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
