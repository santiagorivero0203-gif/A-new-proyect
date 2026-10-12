import katex from 'katex';

/**
 * Renderiza una fórmula LaTeX a HTML usando KaTeX
 * @param latex Cadena con la fórmula en formato LaTeX
 * @param displayMode Si es true, renderiza en bloque centrado; si es false, en línea
 */
export function renderLatex(latex: string, displayMode: boolean = false): string {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      output: 'htmlAndMathml',
      strict: false,
    });
  } catch (err) {
    console.error('Error renderizando LaTeX:', err);
    return `<span class="text-rose-400 font-mono text-sm">${latex}</span>`;
  }
}
