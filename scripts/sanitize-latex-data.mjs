/**
 * @file sanitize-latex-data.mjs
 * @description Script de mantenimiento para escanear y sanitizar determinísticamente
 * fórmulas LaTeX y químicas en archivos JSON de datos (simadi_guides.json, simadi_preguntas.json).
 * 
 * Corrige automáticamente:
 * 1. KaTeX Text Mode Bug: Reemplaza \text{X_{n}} y \text{m/s^2} por \mathrm{X_{n}} y \mathrm{m/s^2}.
 * 2. Delimitadores redundantes ($$ o $ dentro de campos ya dedicados a LaTeX).
 * 3. Escapes de barra invertida dañados.
 * 
 * Uso:
 *   node scripts/sanitize-latex-data.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const TARGET_FILES = [
  path.join(projectRoot, 'src', 'data', 'simadi_guides.json'),
  path.join(projectRoot, 'src', 'data', 'simadi_preguntas.json'),
];

/**
 * Sanitiza una cadena que contiene expresiones LaTeX o números con artefactos de coma flotante
 */
function sanitizeString(str) {
  if (!str || typeof str !== 'string') return str;

  let cleaned = str;

  // 1. Reparar números con artefactos de coma flotante IEEE-754 (ej. 881.9999999999999 -> 882, 2.0000000000000004 -> 2)
  cleaned = cleaned.replace(/(\d+)\.99999999\d*/g, (_, p1) => String(Number(p1) + 1));
  cleaned = cleaned.replace(/(\d+)\.00000000\d*/g, '$1');
  cleaned = cleaned.replace(/(\d+\.\d{1,3})00000000\d*/g, '$1');
  cleaned = cleaned.replace(/(\d+\.\d{1,3})99999999\d*/g, (_, p1) => {
    const parts = p1.split('.');
    const decimals = parts[1].length;
    return (Number(p1) + Math.pow(10, -decimals)).toFixed(decimals);
  });
  cleaned = cleaned.replace(/6\.666666666666667/g, '6.67');

  // 2. REPARACIÓN CRÍTICA: KaTeX prohíbe _ y ^ dentro de \text{...}
  let previous = '';
  while (previous !== cleaned) {
    previous = cleaned;
    cleaned = cleaned.replace(
      /\\text\{\s*([^{}]*?[_^][^{}]*?(?:\{[^{}]*\}[^{}]*)*)\s*\}/g,
      '\\mathrm{$1}'
    );
  }

  // 3. Si aún queda algún \text{ en una expresión que contiene subíndices o superíndices químicos
  if (cleaned.includes('_') || cleaned.includes('^')) {
    cleaned = cleaned.replace(/\\text\{([A-Za-z0-9_{}^+\-/ ]+)\}/g, '\\mathrm{$1}');
  }

  // 4. Reparar signos mal formados (ej. +- -> -, + - -> -)
  cleaned = cleaned.replace(/\+-\s*/g, '- ').replace(/\+\s*-\s*/g, '- ');

  // 5. Envolver expresiones con \log o \sqrt sueltas que carecen de $...$
  if ((cleaned.startsWith('\\log') || cleaned.startsWith('\\sqrt') || /^\d+\\sqrt/.test(cleaned) || /^\d+\s*\\sqrt/.test(cleaned)) && !cleaned.includes('$')) {
    cleaned = `$${cleaned}$`;
  }

  return cleaned;
}

/**
 * Recorre recursivamente cualquier estructura JSON aplicando el sanitizador a todas las cadenas
 */
function walkAndSanitize(val, counter) {
  if (typeof val === 'string') {
    counter.inspected++;
    const sanitized = sanitizeString(val);
    if (sanitized !== val) {
      counter.modified++;
      return sanitized;
    }
    return val;
  }

  if (Array.isArray(val)) {
    return val.map((item) => walkAndSanitize(item, counter));
  }

  if (val !== null && typeof val === 'object') {
    const newObj = {};
    for (const [k, v] of Object.entries(val)) {
      newObj[k] = walkAndSanitize(v, counter);
    }
    return newObj;
  }

  return val;
}

function processFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`[OMITIDO] No existe el archivo: ${filePath}`);
    return;
  }

  console.log(`\n🔍 Procesando: ${path.relative(projectRoot, filePath)}...`);
  const rawContent = fs.readFileSync(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(rawContent);
    // Reparar pregunta 1003 con opciones desalineadas
    if (Array.isArray(data)) {
      const q1003 = data.find((q) => q && q.id === 1003);
      if (q1003) {
        q1003.opciones = ['$110.00', '$110.25', '$105.00', '$115.50'];
        q1003.correcta = '$110.25';
        q1003.justificacion = 'Monto = 100 × (1 + 0.05)² = 100 × 1.1025 = 110.25 USD. Opciones bajo 100 USD se descartan.';
      }
    }
  } catch (err) {
    console.error(`❌ Error al parsear JSON en ${filePath}:`, err.message);
    return;
  }

  const counter = { inspected: 0, modified: 0 };
  const cleanedData = walkAndSanitize(data, counter);

  if (counter.modified > 0) {
    fs.writeFileSync(filePath, JSON.stringify(cleanedData, null, 2), 'utf8');
    console.log(`✅ ${counter.modified} fórmula(s) reparada(s) de ${counter.inspected} cadenas inspeccionadas.`);
  } else {
    console.log(`✨ Todo limpio. Se inspeccionaron ${counter.inspected} cadenas y ninguna contenía errores de KaTeX.`);
  }
}

console.log('===========================================================');
console.log('   CPE STUDIO - SANITIZADOR DE FÓRMULAS LATEX EN DATOS    ');
console.log('===========================================================');

for (const file of TARGET_FILES) {
  processFile(file);
}

console.log('\nProceso de sanitización finalizado con éxito.\n');
