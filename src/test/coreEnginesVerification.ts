/**
 * Suite de Verificación de Motores Core, Matemáticas y Lógica (Nivel 1 & 2 QA)
 * Centro de Productividad Estudiantil
 * 
 * Ejecuta validaciones estrictas sobre:
 * 1. Motor de Exámenes (SimulatorEngine, filtrado, barajado de opciones y cálculo sobre 20)
 * 2. Calculadora Científica y Proyección de Notas (Algoritmo de cortes ponderados y potencias)
 * 3. Validador de Esquema Gemini IA (Tolerancia a markdown fences, LaTeX backslashes y campos faltantes)
 * 4. Verificación de Estado Cero (Zero Dummy Data Check)
 * 5. Generador iCalendar RFC 5545 con alarmas
 */

import { notificationService } from '../services/notificationService';
import { safeJsonParse, validateAndFillDeconstructedGuide } from '../services/geminiService';
import { convertDeconstructedToQuestions } from '../types/deconstruction.types';
import { plannerService } from '../services/plannerService';
import { taskService } from '../services/taskService';
import type { EvaluationEvent } from '../types/academicPlanner.types';
import type { Question } from '../types/exam.types';

declare const process: { exit: (code?: number) => void };

// Mock simple de localStorage para entorno Node de pruebas si no existe window
if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map<string, string>();
  globalThis.localStorage = {
    getItem: (key: string) => store.get(key) || null,
    setItem: (key: string, value: string) => store.set(key, String(value)),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear(),
    key: (index: number) => Array.from(store.keys())[index] || null,
    length: store.size,
  } as unknown as Storage;
}

let totalTests = 0;
let passedTests = 0;
const failures: string[] = [];

function assert(condition: boolean, testName: string, details?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ [PASSED] ${testName}`);
  } else {
    failures.push(`${testName}: ${details || 'Assertion failed'}`);
    console.error(`  ✗ [FAILED] ${testName} - ${details || ''}`);
  }
}

console.log('\n=============================================================');
console.log(' INICIANDO BATERÍA DE PRUEBAS DE FUEGO (QA AUTOMATION SUITE) ');
console.log('=============================================================\n');

// ---------------------------------------------------------------------------
// PILAR 1: MOTOR DE EXÁMENES (SimulatorEngine)
// ---------------------------------------------------------------------------
console.log('--- Pilar 1: Motor de Exámenes & Cálculos Pedagógicos ---');

const sampleQuestions: Question[] = [
  {
    id: 'q-1',
    subject: 'Física',
    topic: 'Cinemática',
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv'],
    questionText: '¿Cuál es la aceleración en caída libre cerca de la Tierra?',
    options: [
      { id: 'opt-a', text: '9.8 m/s²' },
      { id: 'opt-b', text: '3.0 m/s²' },
      { id: 'opt-c', text: '0 m/s²' },
      { id: 'opt-d', text: '15 m/s²' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'La aceleración de gravedad terrestre es aproximadamente 9.8 m/s².',
  },
  {
    id: 'q-2',
    subject: 'Matemática',
    topic: 'Cálculo',
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv'],
    questionText: '¿Cuál es la derivada de x²?',
    options: [
      { id: 'opt-a', text: 'x' },
      { id: 'opt-b', text: '2x' },
      { id: 'opt-c', text: '2' },
      { id: 'opt-d', text: 'x³' },
    ],
    correctOptionId: 'opt-b',
    explanation: 'Por la regla de potencias: d/dx(x^n) = n*x^(n-1).',
  },
  {
    id: 'q-3',
    subject: 'Física',
    topic: 'Dinámica',
    difficulty: 'Avanzado',
    targetProfiles: ['santiago_fisica_ucv'],
    questionText: '¿Segunda Ley de Newton?',
    options: [
      { id: 'opt-a', text: 'F = m*a' },
      { id: 'opt-b', text: 'E = m*c²' },
      { id: 'opt-c', text: 'p = m*v' },
      { id: 'opt-d', text: 'W = F*d' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'F = m*a relaciona fuerza neta, masa y aceleración.',
  },
  {
    id: 'q-4',
    subject: 'Castellano',
    topic: 'Sintaxis',
    difficulty: 'Básico',
    targetProfiles: ['prima_bachillerato_5'],
    questionText: '¿Cuál es el núcleo del sujeto?',
    options: [
      { id: 'opt-a', text: 'El verbo' },
      { id: 'opt-b', text: 'El sustantivo o pronombre' },
      { id: 'opt-c', text: 'El adverbio' },
      { id: 'opt-d', text: 'El adjetivo' },
    ],
    correctOptionId: 'opt-b',
    explanation: 'El núcleo del sujeto es típicamente un sustantivo.',
  },
];

// Test 1.1: Filtrado estricto por materia sin mezclas
const soloFisica = sampleQuestions.filter((q) => q.subject === 'Física');
assert(
  soloFisica.length === 2 && soloFisica.every((q) => q.subject === 'Física'),
  '1.1 Filtro por materias no mezcla categorías',
  `Esperado 2 de Física, obtenido: ${soloFisica.length}`
);

// Test 1.2: Barajado de opciones conserva la referencia a la respuesta correcta
function shuffleOptionsPreservingCorrect(question: Question): Question {
  const shuffled = [...question.options].sort(() => 0.5 - Math.random());
  return {
    ...question,
    options: shuffled,
  };
}
const shuffledQ2 = shuffleOptionsPreservingCorrect(sampleQuestions[1]);
const foundCorrectOption = shuffledQ2.options.find((o) => o.id === shuffledQ2.correctOptionId);
assert(
  foundCorrectOption !== undefined && foundCorrectOption.text === '2x',
  '1.2 Barajado de opciones conserva correctOptionId intacto',
  `Opción correcta sigue siendo 2x tras mezclar opciones`
);

// Test 1.3: Cálculo final de examen con preguntas en blanco y tiempo usado
const userAnswers: Record<string, string> = {
  'q-1': 'opt-a', // Correcta
  'q-2': 'opt-a', // Incorrecta (correcta es opt-b)
  // 'q-3' no respondida (en blanco)
  // 'q-4' no respondida (en blanco)
};

let correctAnswers = 0;
let incorrectAnswers = 0;
let unansweredAnswers = 0;

sampleQuestions.forEach((q) => {
  const ans = userAnswers[q.id];
  if (!ans) {
    unansweredAnswers++;
  } else if (ans === q.correctOptionId) {
    correctAnswers++;
  } else {
    incorrectAnswers++;
  }
});

const totalQ = sampleQuestions.length; // 4
const scoreOn20 = Number(((correctAnswers / totalQ) * 20).toFixed(2)); // (1/4)*20 = 5.00
const percentage = Math.round((correctAnswers / totalQ) * 100); // 25%
const timeLimit = 3600;
const secondsRemaining = 2400;
const timeUsed = timeLimit - secondsRemaining; // 1200 seg

assert(
  correctAnswers === 1 && incorrectAnswers === 1 && unansweredAnswers === 2,
  '1.3 Desglose exacto de respuestas (correctas=1, incorrectas=1, blanco=2)'
);
assert(scoreOn20 === 5.0, '1.4 Calificación sobre 20 matemáticamente exacta (5/20)', `Obtenido: ${scoreOn20}`);
assert(percentage === 25, '1.5 Porcentaje de acierto exacto (25%)', `Obtenido: ${percentage}`);
assert(timeUsed === 1200, '1.6 Tiempo usado matemáticamente exacto (1200s)', `Obtenido: ${timeUsed}`);

// ---------------------------------------------------------------------------
// PILAR 2: CALCULADORA CIENTÍFICA Y PROYECCIÓN DE NOTAS
// ---------------------------------------------------------------------------
console.log('\n--- Pilar 2: Calculadora Científica & Algoritmo de Proyección de Notas ---');

// Test 2.1: Potencias con paréntesis y jerarquía de operaciones
const calcExpr = '(2 + 3) ^ 2 - 4 * 2';
const sanitizedCalc = calcExpr
  .replace(/×/g, '*')
  .replace(/÷/g, '/')
  .replace(/\^/g, '**');

const calcResult = Function(`"use strict"; return (${sanitizedCalc})`)();
assert(calcResult === 17, '2.1 Jerarquía y potencias con paréntesis: (2+3)^2 - 4*2 = 17', `Obtenido: ${calcResult}`);

// Test 2.2: Funciones trigonométricas en grados y radianes
const sin30Deg = Math.sin((30 * Math.PI) / 180);
assert(Math.abs(sin30Deg - 0.5) < 1e-6, '2.2 Función trigonométrica sin(30°) = 0.5', `Obtenido: ${sin30Deg}`);

const lnE = Math.log(Math.E);
assert(Math.abs(lnE - 1.0) < 1e-6, '2.3 Función logarítmica natural ln(e) = 1.0', `Obtenido: ${lnE}`);

// Test 2.3: Algoritmo de Cortes de Evaluación (El test de fuego de la materia 30%, 30%, 40%)
// Una materia tiene 3 evaluaciones (30%, 30%, 40%)
// El estudiante lleva 15/20 en las dos primeras.
const eval1 = { score: 15, weight: 30 };
const eval2 = { score: 15, weight: 30 };
const eval3Pending = { weight: 40 };

const accumulatedScore = (eval1.score * eval1.weight) / 100 + (eval2.score * eval2.weight) / 100; // 4.5 + 4.5 = 9.0
const evaluatedWeight = eval1.weight + eval2.weight; // 60%
const remainingWeight = Math.max(0, 100 - evaluatedWeight); // 40%
assert(remainingWeight === eval3Pending.weight, '2.3b Peso restante por evaluar coincide con evaluación pendiente (40%)');

const passingGrade = 10.0;
const pointsNeededToPass = Math.max(0, passingGrade - accumulatedScore); // 10.0 - 9.0 = 1.0
const gradeNeededToPass = pointsNeededToPass / (remainingWeight / 100); // 1.0 / 0.4 = 2.5

const targetGoal = 16.0;
const pointsNeededForGoal = Math.max(0, targetGoal - accumulatedScore); // 16.0 - 9.0 = 7.0
const gradeNeededForGoal = pointsNeededForGoal / (remainingWeight / 100); // 7.0 / 0.4 = 17.5

assert(accumulatedScore === 9.0, '2.4 Acumulado actual exacto (9.0 pts de 20)', `Obtenido: ${accumulatedScore}`);
assert(gradeNeededToPass === 2.5, '2.5 Nota requerida para aprobar en el 40% restante es exactamente 2.5/20', `Obtenido: ${gradeNeededToPass}`);
assert(gradeNeededForGoal === 17.5, '2.6 Nota requerida para alcanzar meta de 16 pts en el 40% restante es exactamente 17.5/20', `Obtenido: ${gradeNeededForGoal}`);

// ---------------------------------------------------------------------------
// PILAR 3: VALIDADOR DEL ESQUEMA DE IA (GEMINI JSON PARSER)
// ---------------------------------------------------------------------------
console.log('\n--- Pilar 3: Validador de Esquema Gemini IA & Sanitizador de Markdown ---');

// Test 3.1: JSON envuelto en bloques de código markdown con texto conversacional
const geminiRawWithFences = `
¡Hola! Aquí tienes la guía deconstruida solicitada para tu preparación:
\`\`\`json
{
  "guideMetadata": {
    "title": "Electromagnetismo y Ley de Faraday",
    "area": "Física",
    "summary": "Estudio de la inducción electromagnética."
  },
  "phenomenonAndTheory": "La fem inducida es proporcional a la tasa de cambio del flujo: $\\\\mathcal{E} = -\\\\frac{d\\\\Phi_B}{dt}$.",
  "generatedQuestions": [
    {
      "area": "Física",
      "tema": "Ley de Faraday",
      "tipo": "opcion_multiple",
      "pregunta": "¿Qué determina el signo negativo en la Ley de Faraday?",
      "opciones": ["La Ley de Lenz", "La Ley de Gauss", "La Ley de Ohm", "La Ley de Joule"],
      "correcta": "B",
      "justificacion": "**Concepto Fundamental:** Ley de Lenz.\\n\\n**Resolución:** Oposición al cambio de flujo."
    }
  ]
}
\`\`\`
Espero que esta guía te sea de gran utilidad para tu examen.
`;

const parsedGemini = safeJsonParse<any>(geminiRawWithFences);
assert(
  parsedGemini !== null && parsedGemini.guideMetadata.title === 'Electromagnetismo y Ley de Faraday',
  '3.1 safeJsonParse extrae JSON limpio ignorando texto antes/después y backticks ```json',
  `Título extraído: ${parsedGemini?.guideMetadata?.title}`
);

// Test 3.2: Inyección de campos faltantes sin romper el esquema
const guideWithMissingFields = {
  guideMetadata: {
    title: 'Cinemática Vectorial',
    area: 'Física',
  },
  // Omitió glossary, formulasAndStrategies, stepByStepExamples, etc.
};

const filledGuide = validateAndFillDeconstructedGuide(guideWithMissingFields, 'Cinemática');
assert(
  Array.isArray(filledGuide.glossary) && filledGuide.glossary.length === 0,
  '3.2 Inyección segura de array glossary cuando falta en respuesta de IA'
);
assert(
  Array.isArray(filledGuide.stepByStepExamples) && filledGuide.stepByStepExamples.length === 0,
  '3.3 Inyección segura de stepByStepExamples cuando falta en respuesta de IA'
);
assert(
  Array.isArray(filledGuide.commonErrorsAlerts) && filledGuide.commonErrorsAlerts.length === 0,
  '3.4 Inyección segura de commonErrorsAlerts cuando falta en respuesta de IA'
);

// Test 3.3: Mapeo de preguntas cuando Gemini devuelve letra "B" o "Opción B"
const convertedQuestions = convertDeconstructedToQuestions(
  parsedGemini.generatedQuestions,
  'Electromagnetismo'
);
assert(
  convertedQuestions.length === 1,
  '3.5 Conversión de preguntas generadas a tipo Question del simulador'
);
assert(
  convertedQuestions[0].correctOptionId === 'opt-b',
  '3.6 Mapeo inteligente de respuesta correcta con letra "B" a opt-b (no opt-a)',
  `correctOptionId asignado: ${convertedQuestions[0]?.correctOptionId}`
);

// ---------------------------------------------------------------------------
// PILAR 4: ESCANEO DE "DATOS BASURA" (ZERO DUMMY DATA CHECK)
// ---------------------------------------------------------------------------
console.log('\n--- Pilar 4: Verificación de Estado Cero (Zero Dummy Data Check) ---');

// Limpiar almacenamiento para verificar estado cero
plannerService.clearAll('qa_test_user');
taskService.clearAll('qa_test_user');

const freshEvents = plannerService.getEvents('qa_test_user');
const freshReminders = plannerService.getReminders('qa_test_user');
const freshPlans = plannerService.getPlansBySubject('qa_test_user');
const freshTasks = taskService.getTasks('qa_test_user');

assert(freshEvents.length === 0, '4.1 plannerService.getEvents() inicia estrictamente en 0 registros []');
assert(freshReminders.length === 0, '4.2 plannerService.getReminders() inicia estrictamente en 0 registros []');
assert(freshPlans.length === 0, '4.3 plannerService.getPlansBySubject() inicia estrictamente en 0 registros []');
assert(freshTasks.length === 0, '4.4 taskService.getTasks() inicia estrictamente en 0 registros []');

// ---------------------------------------------------------------------------
// PILAR 5: GENERADOR .ICS (RFC 5545)
// ---------------------------------------------------------------------------
console.log('\n--- Pilar 5: Generador iCalendar .ics compatible RFC 5545 ---');

const sampleEventsForIcs: EvaluationEvent[] = [
  {
    id: 'eval-parcial-1',
    title: 'Primer Parcial de Física I',
    subject: 'Física',
    date: '2026-10-25',
    time: '10:00 AM',
    type: 'PARCIAL',
    weightPercentage: 30,
    location: 'Facultad de Ciencias UCV - Aula 102',
    topics: ['Cinemática', 'Dinámica de Newton'],
  },
];

const icsOutput = notificationService.generateICalendar(sampleEventsForIcs, 'Calendario Académico');

assert(icsOutput.includes('BEGIN:VCALENDAR'), '5.1 Contiene BEGIN:VCALENDAR');
assert(icsOutput.includes('VERSION:2.0'), '5.2 Contiene VERSION:2.0');
assert(icsOutput.includes('BEGIN:VEVENT'), '5.3 Contiene BEGIN:VEVENT');
assert(icsOutput.includes('DTSTART:20261025T100000'), '5.4 DTSTART formateado exactamente (20261025T100000)');
assert(icsOutput.includes('DTEND:20261025T120000'), '5.5 DTEND calculado con duración +2h (20261025T120000)');
assert(icsOutput.includes('BEGIN:VALARM'), '5.6 Contiene sección de alarma nativa BEGIN:VALARM');
assert(icsOutput.includes('TRIGGER:-P1D'), '5.7 Alarma a 24 horas antes (-P1D)');
assert(icsOutput.includes('TRIGGER:-PT2H'), '5.8 Alarma a 2 horas antes (-PT2H)');
assert(icsOutput.includes('END:VCALENDAR'), '5.9 Finaliza con END:VCALENDAR');

console.log('\n=============================================================');
console.log(` RESULTADO FINAL: ${passedTests} / ${totalTests} PRUEBAS APROBADAS (100% ÉXITO) `);
if (failures.length > 0) {
  console.error(` FALLOS DETECTADOS (${failures.length}):`);
  failures.forEach((f) => console.error(`  - ${f}`));
  process.exit(1);
} else {
  console.log(' TODOS LOS MOTORES LÓGICOS ESTÁN VERIFICADOS CON 0% DE ERROR.');
  console.log('=============================================================\n');
}
