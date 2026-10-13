import katex from 'katex';

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
 * Renderizador Inteligente de Texto y Fórmulas Matemáticas
 *
 * Resuelve el problema crítico donde oraciones en español (ej. preguntas de Castellano o enunciados)
 * se enviaban completas a KaTeX, eliminando los espacios y cursivando cada letra como si fueran
 * variables algebraicas.
 *
 * Comportamiento:
 * 1. Si el texto es plano (sin delimitadores $ o $$): se sanitiza y se retorna como texto normal.
 * 2. Si el texto tiene fórmulas entre $...$ o $$...$$: el texto regular mantiene su tipografía y espacios,
 *    y ÚNICAMENTE las expresiones matemáticas son compiladas por KaTeX.
 * 3. Si displayMode es true y la cadena es una fórmula explícita pura (inicia con comando LaTeX o viene de un campo de fórmula):
 *    se compila en bloque centrado.
 */
export function renderLatex(content: string | undefined | null, displayMode: boolean = false): string {
  if (!content) return '';

  const trimmed = content.trim();
  if (!trimmed) return '';

  // Caso A: Modo bloque explícito para campos dedicados a fórmulas (ej. latexFormula)
  if (displayMode) {
    let cleanFormula = trimmed;
    if (cleanFormula.startsWith('$$') && cleanFormula.endsWith('$$')) {
      cleanFormula = cleanFormula.slice(2, -2).trim();
    } else if (cleanFormula.startsWith('$') && cleanFormula.endsWith('$')) {
      cleanFormula = cleanFormula.slice(1, -1).trim();
    }

    try {
      return katex.renderToString(cleanFormula, {
        displayMode: true,
        throwOnError: false,
        output: 'htmlAndMathml',
        strict: false,
      });
    } catch {
      return `<div class="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-700 text-center">${escapeHtml(trimmed)}</div>`;
    }
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
    try {
      return katex.renderToString(trimmed, {
        displayMode: false,
        throwOnError: false,
        output: 'htmlAndMathml',
        strict: false,
      });
    } catch {
      return escapeHtml(trimmed);
    }
  }

  // Caso C: Contenido mixto con delimitadores ($...$ o $$...$$)
  try {
    let htmlResult = '';
    // Captura bloques $$...$$ o inline $...$
    const mathRegex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = mathRegex.exec(trimmed)) !== null) {
      // Texto plano anterior a la fórmula
      const plainTextSegment = trimmed.slice(lastIndex, match.index);
      if (plainTextSegment) {
        htmlResult += escapeHtml(plainTextSegment);
      }

      const rawToken = match[0];
      const isBlock = rawToken.startsWith('$$');
      const mathExpr = isBlock ? rawToken.slice(2, -2).trim() : rawToken.slice(1, -1).trim();

      try {
        htmlResult += katex.renderToString(mathExpr, {
          displayMode: isBlock,
          throwOnError: false,
          output: 'htmlAndMathml',
          strict: false,
        });
      } catch {
        htmlResult += `<span class="font-mono text-xs text-slate-800">${escapeHtml(rawToken)}</span>`;
      }

      lastIndex = match.index + rawToken.length;
    }

    // Texto plano restante después del último bloque matemático
    if (lastIndex < trimmed.length) {
      htmlResult += escapeHtml(trimmed.slice(lastIndex));
    }

    return htmlResult;
  } catch (err) {
    console.error('Error procesando contenido LaTeX mixto:', err);
    return escapeHtml(trimmed);
  }
}
