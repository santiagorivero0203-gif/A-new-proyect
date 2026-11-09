/**
 * @fileoverview Exportador y Generador de Hojas de Evaluación Escrita y Guía de Estudio Previa
 * en el formato exacto de 5 Partes / 100 Puntos (PDF / Impresión A4 y Word .doc).
 *
 * Reproduce fielmente la maquetación académica del documento modelo:
 * - Título principal en azul marino con línea divisoria gruesa (#1e40af)
 * - Sección "RESUMEN LÓGICO DE REPASO (Leer antes de iniciar la prueba)"
 * - Recuadro azul con borde izquierdo para el "Contraste Clave"
 * - Encabezado formal con marco rectangular y casilla de "CALIFICACIÓN _____ / 100 pts"
 * - Cuadrícula de datos del estudiante (Apellidos y Nombres, Fecha, Grado/Sección, N.º de Lista)
 * - I PARTE a V PARTE en tablas de 4 y 2 columnas con líneas de respuesta y líneas punteadas de procedimiento
 * - Modo "Hoja de Examen en Blanco" y Modo "Solucionario Oficial Resuelto (100/100 pts)"
 */

import {
  normalizeWrittenExamDocument,
  type NormalizedWrittenExamDocument,
  type WrittenExamDocument,
} from '../types/writtenExamDocument.types';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderPartTableHtml(
  part: NormalizedWrittenExamDocument['parts'][number],
  showAnswers: boolean
): string {
  const items = part.items;

  if (part.layout === 'grid-4') {
    const rows: string[] = [];
    for (let i = 0; i < items.length; i += 4) {
      const cells: string[] = [];
      for (let c = 0; c < 4; c++) {
        const item = items[i + c];
        if (item) {
          const blankOrAns = showAnswers
            ? `<span class="ans-inline">${escapeHtml(item.answer)}</span>`
            : `<span class="blank-line">________</span>`;
          cells.push(
            `<td class="cell-4col"><span class="item-num">${item.number})</span> <span class="item-prompt">${escapeHtml(
              item.prompt
            )}</span> ${blankOrAns}</td>`
          );
        } else {
          cells.push(`<td class="cell-4col"></td>`);
        }
      }
      rows.push(`<tr>${cells.join('')}</tr>`);
    }
    return `<table class="exam-table">${rows.join('')}</table>`;
  }

  if (part.layout === 'grid-2' || part.layout === 'contrast-2col') {
    const rows: string[] = [];
    for (let i = 0; i < items.length; i += 2) {
      const left = items[i];
      const right = items[i + 1];
      const renderCell = (it?: typeof left) => {
        if (!it) return `<td class="cell-2col"></td>`;
        const blankOrAns = showAnswers
          ? `<span class="ans-inline">${escapeHtml(it.answer)}</span>`
          : `<span class="blank-line">____________</span>`;
        return `<td class="cell-2col"><span class="item-num">${it.number})</span> <span class="item-prompt">${escapeHtml(
          it.prompt
        )}</span> ${blankOrAns}</td>`;
      };
      rows.push(`<tr>${renderCell(left)}${renderCell(right)}</tr>`);
    }
    return `<table class="exam-table">${rows.join('')}</table>`;
  }

  if (part.layout === 'two-step-2col') {
    const rows: string[] = [];
    for (let i = 0; i < items.length; i += 2) {
      const left = items[i];
      const right = items[i + 1];
      const renderCell = (it?: typeof left) => {
        if (!it) return `<td class="cell-2col"></td>`;
        const stepPart = showAnswers
          ? `<span class="step-inline">${escapeHtml(it.stepBlank || '')}</span>`
          : `<span class="blank-line">___________</span>`;
        const ansPart = showAnswers
          ? `<span class="ans-inline">${escapeHtml(it.answer)}</span>`
          : `<span class="blank-line">_______</span>`;
        return `<td class="cell-2col"><span class="item-num">${it.number})</span> <span class="item-prompt">${escapeHtml(
          it.prompt
        )} =</span> ${stepPart} = ${ansPart}</td>`;
      };
      rows.push(`<tr>${renderCell(left)}${renderCell(right)}</tr>`);
    }
    return `<table class="exam-table">${rows.join('')}</table>`;
  }

  // procedural-2col (V PARTE con líneas punteadas de procedimiento)
  const rows: string[] = [];
  for (let i = 0; i < items.length; i += 2) {
    const left = items[i];
    const right = items[i + 1];
    const renderProcCell = (it?: typeof left) => {
      if (!it) return `<td class="cell-proc"></td>`;
      if (showAnswers) {
        return `<td class="cell-proc">
          <div class="proc-header"><span class="item-num">${it.number})</span> <span class="item-prompt">${escapeHtml(
          it.prompt
        )}</span></div>
          <div class="proc-step-solved"><strong>Procedimiento:</strong> ${escapeHtml(
            it.stepBlank || 'Desarrollo directo'
          )}</div>
          <div class="proc-ans-solved"><strong>Respuesta:</strong> ${escapeHtml(it.answer)}</div>
        </td>`;
      }
      return `<td class="cell-proc">
        <div class="proc-header"><span class="item-num">${it.number})</span> <span class="item-prompt">${escapeHtml(
        it.prompt
      )} =</span> <span class="blank-line">__________</span></div>
        <div class="proc-dots">........................................................................................</div>
        <div class="proc-dots">........................................................................................</div>
      </td>`;
    };
    rows.push(`<tr>${renderProcCell(left)}${renderProcCell(right)}</tr>`);
  }
  return `<table class="exam-table">${rows.join('')}</table>`;
}

/**
 * Genera el documento HTML completo con los estilos exactos del modelo PDF de 5 páginas.
 */
export function generateWrittenExamHtml(
  rawDoc: WrittenExamDocument,
  options: { showAnswers?: boolean } = {}
): string {
  const doc = normalizeWrittenExamDocument(rawDoc);
  const showAnswers = Boolean(options.showAnswers);

  const studySectionsHtml = doc.studySections
    .map(
      (sec) => `
      <div class="study-section">
        <div class="study-sec-title">${escapeHtml(sec.number)} ${escapeHtml(sec.title)}</div>
        ${sec.leadIn ? `<div class="repaso-intro">${escapeHtml(sec.leadIn)}</div>` : ''}
        <ul class="study-rules">
          ${sec.rules
            .map(
              (r) =>
                `<li><strong>${escapeHtml(r.boldLead)}</strong> ${escapeHtml(r.body)}${
                  r.example ? ` <em>(${escapeHtml(r.example)})</em>` : ''
                }</li>`
            )
            .join('')}
        </ul>
      </div>
    `
    )
    .join('');

  const partsHtml = doc.parts
    .map(
      (part) => `
      <div class="exam-part">
        <div class="part-title-bar">
          ${escapeHtml(part.partLabel)}: ${escapeHtml(part.title)} (${part.points} Puntos)
        </div>
        <div class="part-instructions">${escapeHtml(part.instructions)}</div>
        ${renderPartTableHtml(part, showAnswers)}
      </div>
    `
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(doc.guideTitle)}${showAnswers ? ' — SOLUCIONARIO' : ''}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 14mm 16mm 14mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: 'Segoe UI', 'Calibri', 'Arial', sans-serif;
      color: #1e293b;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 10.5pt;
      line-height: 1.42;
    }
    .page-container {
      max-width: 210mm;
      margin: 0 auto;
      padding: 6mm 4mm;
    }
    .main-guide-title {
      font-size: 15pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: -0.01em;
      padding-bottom: 6px;
      border-bottom: 3px solid #1e40af;
      margin-bottom: 10px;
    }
    .solucionario-badge {
      display: inline-block;
      background: #059669;
      color: #ffffff;
      font-size: 8.5pt;
      font-weight: 800;
      padding: 2px 9px;
      border-radius: 4px;
      margin-left: 8px;
      vertical-align: middle;
    }
    .repaso-heading {
      font-size: 11.5pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      margin: 8px 0 4px 0;
    }
    .repaso-intro {
      margin: 0 0 8px 0;
      color: #334155;
      font-size: 10pt;
    }
    .study-section {
      margin-bottom: 8px;
    }
    .study-sec-title {
      font-size: 10.5pt;
      font-weight: 700;
      color: #1e3a8a;
      margin-bottom: 3px;
    }
    .study-rules {
      margin: 0 0 4px 0;
      padding-left: 20px;
    }
    .study-rules li {
      margin-bottom: 3px;
      font-size: 9.8pt;
      color: #1e293b;
    }
    .contrast-callout {
      background: #eff6ff;
      border-left: 4px solid #1d4ed8;
      padding: 8px 12px;
      margin: 10px 0 14px 0;
      font-size: 9.6pt;
      color: #1e293b;
    }
    .contrast-callout strong {
      color: #1e3a8a;
      display: block;
      margin-bottom: 2px;
    }
    .exam-header-box {
      width: 100%;
      border: 2px solid #0f172a;
      border-collapse: collapse;
      margin-top: 10px;
      margin-bottom: 8px;
    }
    .exam-header-box td {
      padding: 8px 12px;
      vertical-align: middle;
    }
    .exam-header-title {
      font-size: 12pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .exam-header-sub {
      font-size: 9.2pt;
      color: #334155;
    }
    .score-box-cell {
      width: 155px;
      text-align: center;
      border-left: 1.5px solid #cbd5e1;
      background: #f8fafc;
    }
    .score-label {
      font-size: 8.5pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .score-value {
      font-size: 12pt;
      font-weight: 800;
      color: #0f172a;
      margin-top: 6px;
    }
    .student-grid {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
    }
    .student-grid td {
      border: 1px solid #94a3b8;
      padding: 6px 9px;
      font-size: 9.5pt;
      color: #0f172a;
    }
    .exam-part {
      margin-top: 12px;
      margin-bottom: 14px;
    }
    .part-title-bar {
      font-size: 11pt;
      font-weight: 800;
      color: #1e3a8a;
      border-bottom: 1.5px solid #93c5fd;
      padding-bottom: 3px;
      margin-bottom: 4px;
      page-break-after: avoid;
    }
    .part-instructions {
      font-size: 9.6pt;
      color: #334155;
      margin-bottom: 6px;
      page-break-after: avoid;
    }
    .exam-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    .exam-table tr {
      page-break-inside: avoid;
    }
    .cell-4col {
      width: 25%;
      border: 1px solid #cbd5e1;
      padding: 6px 7px;
      font-size: 9.4pt;
      vertical-align: middle;
      word-wrap: break-word;
    }
    .cell-2col {
      width: 50%;
      border: 1px solid #cbd5e1;
      padding: 6px 9px;
      font-size: 9.5pt;
      vertical-align: middle;
      word-wrap: break-word;
    }
    .cell-proc {
      width: 50%;
      border: 1px solid #cbd5e1;
      padding: 7px 10px;
      font-size: 9.5pt;
      vertical-align: top;
      word-wrap: break-word;
    }
    .item-num {
      font-weight: 700;
      color: #0f172a;
    }
    .item-prompt {
      color: #1e293b;
    }
    .blank-line {
      color: #64748b;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .ans-inline {
      display: inline-block;
      color: #047857;
      font-weight: 800;
      background: #ecfdf5;
      border-bottom: 1.5px solid #059669;
      padding: 0 5px;
      border-radius: 3px;
    }
    .step-inline {
      display: inline-block;
      color: #1d4ed8;
      font-weight: 600;
      background: #eff6ff;
      border-bottom: 1px dashed #3b82f6;
      padding: 0 4px;
      font-size: 9pt;
    }
    .proc-header {
      margin-bottom: 5px;
    }
    .proc-dots {
      color: #94a3b8;
      font-size: 9pt;
      letter-spacing: 1px;
      line-height: 1.55;
      overflow: hidden;
      white-space: nowrap;
    }
    .proc-step-solved {
      font-size: 8.8pt;
      color: #1e40af;
      background: #eff6ff;
      padding: 3px 6px;
      border-radius: 3px;
      margin-bottom: 3px;
    }
    .proc-ans-solved {
      font-size: 9.2pt;
      color: #065f46;
      background: #ecfdf5;
      padding: 3px 6px;
      border-radius: 3px;
      border-left: 3px solid #059669;
    }
    .exam-footer {
      margin-top: 16px;
      padding-top: 6px;
      border-top: 1px solid #cbd5e1;
      display: flex;
      justify-content: space-between;
      font-size: 8.5pt;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="page-container">
    <div class="main-guide-title">
      ${escapeHtml(doc.guideTitle)}
      ${showAnswers ? '<span class="solucionario-badge">SOLUCIONARIO OFICIAL RESUELTO</span>' : ''}
    </div>

    <div class="repaso-heading">RESUMEN LÓGICO DE REPASO (Leer antes de iniciar la prueba)</div>
    <p class="repaso-intro">${escapeHtml(doc.summaryIntro)}</p>

    ${studySectionsHtml}

    <div class="contrast-callout">
      <strong>${escapeHtml(doc.keyContrast.title)}</strong>
      <div>${escapeHtml(doc.keyContrast.explanation).replace(/\n/g, '<br/>')}</div>
    </div>

    <table class="exam-header-box">
      <tr>
        <td>
          <div class="exam-header-title">${escapeHtml(doc.examTitle)}</div>
          <div class="exam-header-sub">${escapeHtml(doc.generalInstructions)}</div>
        </td>
        <td class="score-box-cell">
          <div class="score-label">CALIFICACIÓN</div>
          <div class="score-value">${showAnswers ? '100 / 100 pts' : '_____ / 100 pts'}</div>
        </td>
      </tr>
    </table>

    <table class="student-grid">
      <tr>
        <td style="width: 42%;"><strong>Apellidos y Nombres:</strong> ${
          showAnswers ? escapeHtml(doc.studentName) : '___________________________'
        }</td>
        <td style="width: 18%;"><strong>Fecha:</strong> ____/____/2026</td>
        <td style="width: 24%;"><strong>Grado / Sección:</strong> ${escapeHtml(doc.gradeLabel)}</td>
        <td style="width: 16%;"><strong>N.º de Lista:</strong> ______</td>
      </tr>
    </table>

    ${partsHtml}

    <div class="exam-footer">
      <span>Evaluación Escrita de ${escapeHtml(doc.subject)} — ${escapeHtml(doc.unitTitle)} (${escapeHtml(
    doc.institution
  )})</span>
      <span>Total: ${doc.totalPoints} Puntos · ${doc.parts.reduce((acc, p) => acc + p.items.length, 0)} Reactivos</span>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Abre la ventana de impresión / Guardar como PDF (A4) con la Hoja de Examen en Blanco o el Solucionario.
 */
export function exportWrittenExamToPdf(doc: WrittenExamDocument, showAnswers = false): void {
  const html = generateWrittenExamHtml(doc, { showAnswers });
  const printWindow = window.open('', '_blank', 'width=1024,height=840');
  if (!printWindow) {
    // Fallback: descarga como HTML imprimible si el navegador bloquea popups
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.id}${showAnswers ? '-solucionario' : '-examen'}.html`;
    link.click();
    URL.revokeObjectURL(url);
    return;
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 350);
}

/**
 * Descarga el documento de evaluación escrita en formato Microsoft Word (.doc) editable.
 */
export function exportWrittenExamToWord(doc: WrittenExamDocument, showAnswers = false): void {
  const html = generateWrittenExamHtml(doc, { showAnswers });
  const wordHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">${html.replace(
    '<!DOCTYPE html>\n<html lang="es">',
    ''
  )}`;

  const blob = new Blob(['\ufeff', wordHtml], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const suffix = showAnswers ? 'SOLUCIONARIO' : 'HOJA_EXAMEN';
  link.href = url;
  link.download = `${doc.subject.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_-]+/g, '_')}_${suffix}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
