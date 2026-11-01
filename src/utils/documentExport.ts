/**
 * @file documentExport.ts
 * @description Utilidad para la generación y exportación directa de documentos académicos
 * en formato Microsoft Word (.doc con HTML Mime Type) y descarga de PDFs oficiales de Notion.
 *
 * Cumple con:
 * 1. Estándares tipográficos y jerarquía editorial limpia (apertura en Word, LibreOffice, Google Docs).
 * 2. Exportación completa de los 7 pilares pedagógicos de cualquier guía deconstruida.
 * 3. Descarga o apertura directa de los PDFs oficiales alojados en `/documents/mafe_notion_guides/`.
 */

import type { DeconstructedAcademicGuide } from '../types/deconstruction.types';

/**
 * Mapeo de guías oficiales a sus archivos PDF descargables en `public/documents/mafe_notion_guides/`
 */
export const OFFICIAL_NOTION_PDF_LINKS: Record<string, { label: string; filename: string; url: string }[]> = {
  'mafe-design-theory-official': [
    {
      label: 'Temario Oficial Teoría del Diseño (PDF Deconstruido)',
      filename: 'Teoria_Diseno_Temario_Completo_UCAB.pdf',
      url: '/documents/mafe_notion_guides/Teoria_Diseno_Temario_Completo_UCAB.doc',
    },
  ],
  'mafe-color-clase4-ucab': [
    {
      label: 'Clase #4 Color UCAB — Documento Original',
      filename: 'EB_LICDISUCAB_COLOR_CLASE4_OCT_09_2026.pdf',
      url: '/documents/mafe_notion_guides/EB_LICDISUCAB_COLOR_CLASE4_OCT_09_2026.pdf',
    },
  ],
  'mafe-math-design-ucab': [
    {
      label: 'Guía 1 Teórica: Punto, Recta y Espacio (PDF)',
      filename: 'Guia_teorica__1._Punto_recta_y_espacio_V1.3.pdf',
      url: '/documents/mafe_notion_guides/Guia_teorica__1._Punto_recta_y_espacio_V1.3.pdf',
    },
    {
      label: 'Guía 2 Teórica: Rectas & Retículas (PDF)',
      filename: 'Guia_Teorica__2.__Rectas_(1).pdf',
      url: '/documents/mafe_notion_guides/Guia_Teorica__2.__Rectas_(1).pdf',
    },
    {
      label: 'Guía 3 Teórica: Sistemas de Ecuaciones (PDF)',
      filename: 'Guia_teorica__3._Sistema_de_ecuaciones_(3).pdf',
      url: '/documents/mafe_notion_guides/Guia_teorica__3._Sistema_de_ecuaciones_(3).pdf',
    },
    {
      label: 'Guía 3 Ejercicios: Sistemas de Ecuaciones (PDF)',
      filename: 'Guia_de_ejercicios__3._Sistema_de_ecuaciones_(3).pdf',
      url: '/documents/mafe_notion_guides/Guia_de_ejercicios__3._Sistema_de_ecuaciones_(3).pdf',
    },
    {
      label: 'Guía 4 Teórica: Ángulos y Paralelas (PDF)',
      filename: 'Guia_teorica__4_._Angulos_._V1.3_(1).pdf',
      url: '/documents/mafe_notion_guides/Guia_teorica__4_._Angulos_._V1.3_(1).pdf',
    },
    {
      label: 'Guía 4 Ejercicios: Ángulos y Rampas (PDF)',
      filename: 'Guia_de_ejercicios__4._Angulos.V1.2_(2).pdf',
      url: '/documents/mafe_notion_guides/Guia_de_ejercicios__4._Angulos.V1.2_(2).pdf',
    },
  ],
};

/**
 * Genera un archivo Microsoft Word (.doc) completo a partir de una guía deconstruida
 * y dispara automáticamente su descarga en el navegador del estudiante.
 */
export function exportGuideToWord(guide: DeconstructedAcademicGuide): void {
  const { guideMetadata, phenomenonAndTheory, glossary, formulasAndStrategies, stepByStepExamples, commonErrorsAlerts, studyTechniquesHub, generatedQuestions } = guide;

  // Sanitizar título para nombre de archivo
  const safeFilename = (guideMetadata.title || 'Guia_Academica')
    .replace(/[^a-zA-Z0-9_\u00C0-\u017F\s-]/g, '')
    .trim()
    .replace(/\s+/g, '_');

  const htmlContent = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${escapeXml(guideMetadata.title)}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #1e293b;
      margin: 2.5cm 2cm 2.5cm 2cm;
    }
    h1 {
      font-family: 'Segoe UI', 'Arial Black', sans-serif;
      font-size: 20pt;
      color: #0f172a;
      border-bottom: 2pt solid #e11d48;
      padding-bottom: 8pt;
      margin-bottom: 12pt;
    }
    h2 {
      font-family: 'Segoe UI', sans-serif;
      font-size: 14pt;
      color: #be123c;
      margin-top: 18pt;
      margin-bottom: 8pt;
      border-bottom: 1pt solid #fecdd3;
      padding-bottom: 4pt;
    }
    h3 {
      font-family: 'Segoe UI', sans-serif;
      font-size: 12pt;
      color: #334155;
      margin-top: 12pt;
      margin-bottom: 6pt;
    }
    p {
      margin-bottom: 8pt;
    }
    .badge {
      display: inline-block;
      background-color: #ffe4e6;
      color: #9f1239;
      padding: 3pt 8pt;
      font-size: 9pt;
      font-weight: bold;
      border-radius: 4pt;
      margin-bottom: 10pt;
    }
    .meta-box {
      background-color: #f8fafc;
      border: 1pt solid #cbd5e1;
      padding: 10pt;
      margin-bottom: 18pt;
      border-radius: 6pt;
    }
    .callout {
      background-color: #fff1f2;
      border-left: 4pt solid #e11d48;
      padding: 8pt 12pt;
      margin: 10pt 0;
      font-style: italic;
    }
    .card {
      background-color: #ffffff;
      border: 1pt solid #e2e8f0;
      padding: 8pt 12pt;
      margin-bottom: 8pt;
      border-radius: 4pt;
    }
    .example-box {
      background-color: #fefce8;
      border-left: 3pt solid #ca8a04;
      padding: 6pt 10pt;
      margin: 6pt 0;
      font-size: 10pt;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12pt 0;
    }
    th, td {
      border: 1pt solid #cbd5e1;
      padding: 6pt 8pt;
      text-align: left;
      font-size: 10pt;
    }
    th {
      background-color: #f1f5f9;
      font-weight: bold;
      color: #0f172a;
    }
    .footer {
      margin-top: 24pt;
      padding-top: 10pt;
      border-top: 1pt solid #cbd5e1;
      font-size: 9pt;
      color: #64748b;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="meta-box">
    <div class="badge">UNIVERSIDAD CATÓLICA ANDRÉS BELLO · ESCUELA DE DISEÑO INTEGRAL</div>
    <h1>${escapeXml(guideMetadata.title)}</h1>
    <p><strong>Materia / Área:</strong> ${escapeXml(guideMetadata.area || 'Diseño Integral')}</p>
    <p><strong>Síntesis Curricular:</strong> ${escapeXml(guideMetadata.summary)}</p>
    <p><strong>Generado el:</strong> ${new Date().toLocaleDateString('es-VE', { dateStyle: 'full' })}</p>
  </div>

  <h2>1. Fundamentación Teórica & Deconstrucción del Temario</h2>
  <div style="white-space: pre-line; line-height: 1.6;">
    ${formatTheoryToWordHtml(phenomenonAndTheory)}
  </div>

  ${glossary && glossary.length > 0 ? `
  <h2>2. Glosario Clave de Conceptos & Referentes</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Término</th>
        <th style="width: 20%;">Autor / Capítulo</th>
        <th style="width: 55%;">Definición Conceptual</th>
      </tr>
    </thead>
    <tbody>
      ${glossary.map(item => `
        <tr>
          <td><strong>${escapeXml(item.term)}</strong></td>
          <td><code>${escapeXml(item.symbolOrUnit)}</code></td>
          <td>${escapeXml(item.definition)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  ` : ''}

  ${formulasAndStrategies?.coreFormulas && formulasAndStrategies.coreFormulas.length > 0 ? `
  <h2>3. Principios Rectores, Métodos & Modelos</h2>
  ${formulasAndStrategies.coreFormulas.map(f => `
    <div class="card">
      <h3>${escapeXml(f.name)}</h3>
      <p style="font-family: 'Consolas', monospace; color: #0284c7; background: #f0f9ff; padding: 4pt 8pt;">${escapeXml(f.latex)}</p>
      <p><strong>Aplicación práctica:</strong> ${escapeXml(f.application)}</p>
    </div>
  `).join('')}
  ` : ''}

  ${stepByStepExamples && stepByStepExamples.length > 0 ? `
  <h2>4. Casos de Estudio Aplicados & Resolución Paso a Paso</h2>
  ${stepByStepExamples.map((ex, idx) => `
    <div class="card" style="margin-bottom: 14pt;">
      <h3>${escapeXml(ex.title || `Caso ${idx + 1}`)}: ${escapeXml(ex.problemStatement)}</h3>
      <ol style="margin-top: 6pt; padding-left: 18pt;">
        ${(ex.deductiveSteps || []).map(step => `
          <li style="margin-bottom: 6pt;">
            <span>${escapeXml(step)}</span>
          </li>
        `).join('')}
      </ol>
      <div class="callout">
        <strong>Conclusión de diseño:</strong> ${escapeXml(ex.finalResult)}
      </div>
    </div>
  `).join('')}
  ` : ''}

  ${commonErrorsAlerts && commonErrorsAlerts.length > 0 ? `
  <h2>5. Alertas de Examen & Trampas Frecuentes</h2>
  ${commonErrorsAlerts.map(err => `
    <div class="callout" style="background-color: #fffbeb; border-color: #f59e0b;">
      <h3 style="color: #b45309; margin-top: 0;">⚠️ Trampa o Confusión Frecuente</h3>
      <p><strong>Lo que suele confundir:</strong> ${escapeXml(err.trap)}</p>
      <p><strong>Enfoque y Corrección para el Examen:</strong> ${escapeXml(err.correction)}</p>
    </div>
  `).join('')}
  ` : ''}

  ${studyTechniquesHub?.activeRecallFlashcards && studyTechniquesHub.activeRecallFlashcards.length > 0 ? `
  <h2>6. Tarjetas de Evocación Activa (Flashcards)</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 45%;">Anverso / Pregunta Disparadora</th>
        <th style="width: 55%;">Reverso / Concepto y Dominio Requerido</th>
      </tr>
    </thead>
    <tbody>
      ${studyTechniquesHub.activeRecallFlashcards.map(fc => `
        <tr>
          <td><strong>${escapeXml(fc.front)}</strong></td>
          <td>${escapeXml(fc.back)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  ` : ''}

  ${generatedQuestions && generatedQuestions.length > 0 ? `
  <h2>7. Banco de Autoevaluación & Modelos de Examen (${generatedQuestions.length} Reactivos)</h2>
  ${generatedQuestions.map((q, idx) => `
    <div class="card" style="margin-bottom: 12pt;">
      <p><strong>Pregunta ${idx + 1} (${escapeXml(q.tema || 'Evaluación')}):</strong> ${escapeXml(q.pregunta)}</p>
      <ul style="list-style-type: none; padding-left: 0; margin-left: 0;">
        ${q.opciones.map((opt, oIdx) => {
          const letter = ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1);
          const isCorrect = opt.trim().toLowerCase() === (q.correcta || '').trim().toLowerCase();
          return `
            <li style="padding: 3pt 6pt; margin: 2pt 0; ${isCorrect ? 'background-color: #ecfdf5; font-weight: bold; color: #065f46; border: 1pt solid #a7f3d0; border-radius: 3pt;' : ''}">
              ${letter}) ${escapeXml(opt)} ${isCorrect ? '✓ [OPCIÓN CORRECTA]' : ''}
            </li>
          `;
        }).join('')}
      </ul>
      <div style="background-color: #f8fafc; border-left: 3pt solid #64748b; padding: 6pt 10pt; font-size: 9.5pt; margin-top: 6pt;">
        <strong>Justificación Pedagógica:</strong> ${escapeXml(q.justificacion)}
      </div>
    </div>
  `).join('')}
  ` : ''}

  <div class="footer">
    Documento oficial generado por el Centro de Productividad Estudiantil · UCAB & Plataforma Académica Multi-Perfil.
  </div>
</body>
</html>
`;

  const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${safeFilename}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Función auxiliar para escapar caracteres XML/HTML
 */
function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Formatea el texto de la teoría para Word destacando capítulos, términos y ejemplos
 */
function formatTheoryToWordHtml(text: string): string {
  if (!text) return '';
  const lines = text.split('\n');
  return lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return '<br>';

    // Capítulos
    if (trimmed.startsWith('**CAPÍTULO') || trimmed.startsWith('## CAPÍTULO')) {
      const cleanTitle = trimmed.replace(/\*\*/g, '').replace(/^##\s*/, '');
      return `<h3 style="background-color: #ffe4e6; color: #9f1239; padding: 6pt 10pt; border-radius: 4pt; margin-top: 14pt;">${escapeXml(cleanTitle)}</h3>`;
    }

    // Bullets con términos y ejemplos
    if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
      let content = escapeXml(trimmed);
      // Resaltar negrita
      content = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      // Resaltar cursiva de ejemplos
      content = content.replace(/\*([^*]+)\*/g, '<span style="color: #92400e; background-color: #fefce8; padding: 1pt 4pt; border-radius: 2pt;">$1</span>');
      return `<p style="margin-left: 12pt; margin-bottom: 4pt;">${content}</p>`;
    }

    let lineFormatted = escapeXml(trimmed)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
    return `<p>${lineFormatted}</p>`;
  }).join('');
}

/**
 * Formatea el texto de la teoría para la exportación directa a PDF con jerarquía limpia
 */
function formatTheoryToPdfHtml(text: string): string {
  if (!text) return '';
  const sanitized = text
    .replace(/#@|##@|#\s*@/g, '')
    .replace(/@\[[^\]]+\]/g, '')
    .trim();

  const lines = sanitized.split('\n');
  return lines
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '<div style="height: 6px;"></div>';

      // Encabezados
      if (trimmed.startsWith('###') || trimmed.startsWith('**CAPÍTULO') || trimmed.startsWith('##')) {
        const cleanTitle = trimmed.replace(/^#+\s*/, '').replace(/\*\*/g, '').trim();
        return `<h3 style="background-color: #eff6ff; color: #1e40af; border-left: 4px solid #3b82f6; padding: 6px 12px; border-radius: 4px; margin-top: 14px; margin-bottom: 8px; font-size: 11.5pt;">${escapeXml(cleanTitle)}</h3>`;
      }

      // Callouts / Reglas destacadas (> o &gt;)
      if (trimmed.startsWith('>') || trimmed.startsWith('&gt;')) {
        const callout = trimmed.replace(/^(?:>|&gt;)\s*/, '');
        return `<div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 8px 12px; border-radius: 4px; margin: 8px 0; color: #78350f; font-size: 9.5pt;">💡 <strong>Regla / Nota Clave:</strong> ${escapeXml(callout).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</div>`;
      }

      // Bullets
      if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('* ')) {
        let content = escapeXml(trimmed.replace(/^[•\-*]\s*/, ''));
        content = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        content = content.replace(/\*([^*]+)\*/g, '<span style="color: #92400e; background-color: #fefce8; padding: 1px 4px; border-radius: 2px;">$1</span>');
        return `<li style="margin-left: 20px; margin-bottom: 4px; color: #334155; font-size: 9.5pt;">${content}</li>`;
      }

      let lineFormatted = escapeXml(trimmed)
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>');
      return `<p style="margin-bottom: 6px; color: #1e293b; line-height: 1.5; font-size: 9.5pt;">${lineFormatted}</p>`;
    })
    .join('');
}

/**
 * Genera un documento PDF académico impecable a partir de los 7 pilares de una guía deconstruida
 * y abre automáticamente el diálogo de impresión / Guardar como PDF de alta resolución.
 */
export function exportGuideToPdf(guide: DeconstructedAcademicGuide): void {
  const {
    discipline,
    guideMetadata,
    phenomenonAndTheory,
    glossary,
    formulasAndStrategies,
    stepByStepExamples,
    commonErrorsAlerts,
    studyTechniquesHub,
    generatedQuestions,
  } = guide;

  const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>${escapeXml(guideMetadata.title)} · Guía Oficial de Estudio</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <style>
    @page {
      size: A4 portrait;
      margin: 16mm 14mm 16mm 14mm;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .page-break {
        page-break-before: always;
      }
      .avoid-break {
        page-break-inside: avoid;
        break-inside: avoid;
      }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 9.5pt;
      line-height: 1.5;
      color: #1e293b;
      margin: 0;
      padding: 0;
    }
    h1 {
      font-size: 17pt;
      color: #0f172a;
      border-bottom: 2.5px solid #0f52ba;
      padding-bottom: 6px;
      margin-top: 0;
      margin-bottom: 8px;
    }
    h2 {
      font-size: 12pt;
      color: #0f52ba;
      margin-top: 18px;
      margin-bottom: 8px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 3px;
    }
    .badge {
      display: inline-block;
      background-color: #dbeafe;
      color: #1e40af;
      padding: 3px 8px;
      font-size: 8pt;
      font-weight: bold;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .meta-box {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 12px;
      margin-bottom: 14px;
      font-size: 9pt;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 12px;
      font-size: 9pt;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 8px;
      text-align: left;
    }
    th {
      background-color: #f1f5f9;
      color: #0f172a;
      font-weight: 600;
    }
    .card {
      border: 1px solid #e2e8f0;
      background-color: #ffffff;
      border-radius: 6px;
      padding: 9px 12px;
      margin-bottom: 8px;
    }
    .alert-card {
      background-color: #fff1f2;
      border: 1px solid #fecdd3;
      border-left: 4px solid #e11d48;
      border-radius: 6px;
      padding: 9px 12px;
      margin-bottom: 8px;
    }
    .step-card {
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 9px 12px;
      margin-bottom: 8px;
    }
    .footer {
      margin-top: 24px;
      border-top: 1px solid #e2e8f0;
      padding-top: 8px;
      font-size: 8pt;
      color: #94a3b8;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="badge">Guía Oficial Deconstruida · 7 Pilares Pedagógicos</div>
  <h1>${escapeXml(guideMetadata.title)}</h1>

  <div class="meta-box">
    <strong>Área de Estudio:</strong> ${escapeXml(guideMetadata.area)} &nbsp;|&nbsp;
    <strong>Disciplina:</strong> ${escapeXml(discipline || 'Ciencias & Humanidades')} &nbsp;|&nbsp;
    <strong>Fecha de Generación:</strong> ${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
    <p style="margin: 6px 0 0 0; color: #475569; font-style: italic;">${escapeXml(guideMetadata.summary)}</p>
  </div>

  <h2>1. Núcleo Teórico y Sustancia de Estudio</h2>
  <div>${formatTheoryToPdfHtml(phenomenonAndTheory)}</div>

  ${glossary && glossary.length > 0 ? `
  <div class="avoid-break">
    <h2>2. Glosario Técnico y Notación Rigurosa</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Término</th>
          <th style="width: 20%;">Símbolo / Unidad / Autor</th>
          <th style="width: 55%;">Definición Conceptual de Examen</th>
        </tr>
      </thead>
      <tbody>
        ${glossary.map((item) => `
          <tr>
            <td><strong>${escapeXml(item.term)}</strong></td>
            <td><code>${escapeXml(item.symbolOrUnit || '-')}</code></td>
            <td>${escapeXml(item.definition)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
  ` : ''}

  ${formulasAndStrategies ? `
  <div class="avoid-break">
    <h2>3. Fórmulas, Patrones & Reglas Mnemotécnicas</h2>
    ${formulasAndStrategies.coreFormulas && formulasAndStrategies.coreFormulas.length > 0 ? `
      <div>
        ${formulasAndStrategies.coreFormulas.map((f) => `
          <div class="card avoid-break">
            <strong style="color: #0f172a; font-size: 10pt;">${escapeXml(f.name)}</strong>
            <div style="background-color: #f8fafc; padding: 6px 10px; margin: 4px 0; font-family: monospace; font-size: 9pt; border-left: 3px solid #0f52ba;">
              ${escapeXml(f.latex)}
            </div>
            <p style="margin: 2px 0; color: #475569; font-size: 8.5pt;"><strong>Aplicación en Examen:</strong> ${escapeXml(f.application)}</p>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${formulasAndStrategies.mnemonicsAndPatterns && formulasAndStrategies.mnemonicsAndPatterns.length > 0 ? `
      <div style="margin-top: 10px;">
        <strong style="font-size: 9.5pt; color: #334155;">Trucos Mnemotécnicos de Evocación:</strong>
        <ul style="margin-top: 4px; padding-left: 18px;">
          ${formulasAndStrategies.mnemonicsAndPatterns.map((m: string) => `
            <li style="margin-bottom: 3px; font-size: 9pt;">${escapeXml(m)}</li>
          `).join('')}
        </ul>
      </div>
    ` : ''}
  </div>
  ` : ''}

  ${stepByStepExamples && stepByStepExamples.length > 0 ? `
  <div class="avoid-break">
    <h2>4. Metodología de Resolución Paso a Paso</h2>
    ${stepByStepExamples.map((ex, idx) => `
      <div class="step-card avoid-break">
        <strong style="color: #0f172a;">Caso Representativo #${idx + 1}: ${escapeXml(ex.title || `Caso ${idx + 1}`)}</strong>
        <p style="margin: 4px 0; color: #334155;"><strong>Planteamiento:</strong> ${escapeXml(ex.problemStatement)}</p>
        <div style="margin-top: 6px; padding-left: 12px; border-left: 2px solid #3b82f6;">
          ${(ex.deductiveSteps || []).map((st: string) => `<p style="margin: 3px 0; font-size: 9pt;">${escapeXml(st)}</p>`).join('')}
        </div>
        <p style="margin: 6px 0 0 0; color: #047857; font-weight: bold;">Resultado y Análisis Crítico: ${escapeXml(ex.finalResult)}</p>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${commonErrorsAlerts && commonErrorsAlerts.length > 0 ? `
  <div class="avoid-break">
    <h2>5. Alertas de Examen & Errores Frecuentes</h2>
    ${commonErrorsAlerts.map((err) => `
      <div class="alert-card avoid-break">
        <strong style="color: #be123c;">⚠️ Trampa Típica: ${escapeXml(err.trap)}</strong>
        <p style="margin: 3px 0; color: #047857; font-weight: bold;">Corrección Estratégica: ${escapeXml(err.correction)}</p>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${studyTechniquesHub ? `
  <div class="avoid-break">
    <h2>6. Técnicas de Retención & Active Recall</h2>
    ${studyTechniquesHub.cornellSynthesis ? `
      <div class="card avoid-break">
        <strong style="color: #0f172a;">Estructura de Notas Cornell</strong>
        <div style="display: flex; gap: 12px; margin-top: 6px;">
          <div style="width: 35%; border-right: 1px solid #cbd5e1; padding-right: 8px;">
            <span style="font-size: 8pt; font-weight: bold; color: #64748b; text-transform: uppercase;">Pistas / Cues:</span>
            <ul style="padding-left: 14px; margin: 4px 0;">
              ${(studyTechniquesHub.cornellSynthesis.cues || []).map((cue: string) => `<li style="font-size: 8.5pt;">${escapeXml(cue)}</li>`).join('')}
            </ul>
          </div>
          <div style="width: 65%;">
            <span style="font-size: 8pt; font-weight: bold; color: #64748b; text-transform: uppercase;">Apuntes Principales:</span>
            <div style="font-size: 8.5pt; margin-top: 4px;">
              ${(studyTechniquesHub.cornellSynthesis.notes || []).map((n: string) => `<p style="margin: 2px 0;">${escapeXml(n)}</p>`).join('')}
            </div>
          </div>
        </div>
        <div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed #cbd5e1; font-size: 8.5pt; color: #334155;">
          <strong>Resumen de Cierre:</strong> ${escapeXml(studyTechniquesHub.cornellSynthesis.summary)}
        </div>
      </div>
    ` : ''}

    ${studyTechniquesHub.activeRecallFlashcards && studyTechniquesHub.activeRecallFlashcards.length > 0 ? `
      <div style="margin-top: 10px;">
        <strong style="font-size: 9.5pt; color: #334155;">Tarjetas de Evocación Activa (Flashcards):</strong>
        <div style="margin-top: 6px;">
          ${studyTechniquesHub.activeRecallFlashcards.slice(0, 8).map((card, idx) => `
            <div class="card avoid-break" style="font-size: 8.5pt; margin-bottom: 6px;">
              <span style="font-weight: bold; color: #0f52ba;">Q${idx + 1}: ${escapeXml(card.front)}</span>
              <p style="margin: 3px 0 0 0; color: #334155;"><strong>R:</strong> ${escapeXml(card.back)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  </div>
  ` : ''}

  ${generatedQuestions && generatedQuestions.length > 0 ? `
  <div class="avoid-break page-break">
    <h2>7. Banco de Preguntas Calibradas de Examen (${generatedQuestions.length} Reactivos)</h2>
    ${generatedQuestions.map((q, idx) => `
      <div class="card avoid-break" style="margin-bottom: 10px;">
        <p style="margin: 0 0 6px 0; font-weight: bold; color: #0f172a;">${idx + 1}. [${escapeXml(q.tema || 'Evaluación')}] ${escapeXml(q.pregunta)}</p>
        <div style="padding-left: 12px;">
          ${q.opciones.map((opt, oIdx) => {
            const letter = ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1);
            const isCorrect = opt.trim().toLowerCase() === (q.correcta || '').trim().toLowerCase();
            return `
              <div style="margin: 2px 0; font-size: 9pt; ${isCorrect ? 'color: #047857; font-weight: bold;' : 'color: #475569;'}">
                ${letter}) ${escapeXml(opt)} ${isCorrect ? '✓ [Opción Correcta]' : ''}
              </div>
            `;
          }).join('')}
        </div>
        <div style="background-color: #f8fafc; border-left: 3px solid #64748b; padding: 4px 8px; font-size: 8.5pt; margin-top: 6px; color: #334155;">
          <strong>Justificación Pedagógica:</strong> ${escapeXml(q.justificacion)}
        </div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  <div class="footer">
    Documento oficial generado por la Plataforma Académica y de Productividad Estudiantil · Formato Imprimible / Guardar como PDF.
  </div>
</body>
</html>`;

  // Crear un iframe invisible para la impresión aislada
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (doc) {
    doc.open();
    doc.write(htmlContent);
    doc.close();
    iframe.contentWindow?.focus();
    setTimeout(() => {
      try {
        iframe.contentWindow?.print();
      } catch (err) {
        console.error('Error al imprimir PDF:', err);
        const printWin = window.open('', '_blank');
        if (printWin) {
          printWin.document.write(htmlContent);
          printWin.document.close();
          printWin.focus();
          printWin.print();
        }
      } finally {
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 2000);
      }
    }, 450);
  }
}
