/**
 * @file UCVInteractiveLabs.tsx
 * @description Suite Oficial de Laboratorios Interactivos del Curso Introductorio UCV (Facultad de Ciencias).
 * Cubre de forma visual, táctil y matemáticamente rigurosa las 3 Unidades de Aprendizaje:
 * 
 * 1. Lab 1: Sistema Internacional, Notación Científica y Aritmética Prima (Descomposición, MCD y MCM con identidad fundamental A·B = MCD·MCM).
 * 2. Lab 2: Recta Numérica en ℝ (Intersección, Unión y Diferencia de Intervalos) y Laboratorio de Ecuaciones Irracionales con detector de raíces extrañas.
 * 3. Lab 3: Geometría Analítica, Círculo Trigonométrico Interactivo y Lienzo Vectorial 2D Cartesiano (Regla del Paralelogramo y Producto Escalar).
 * 4. Lab 4: Dinámica UCV "El Problema de la Caja Negra" con 3 leyes científicas, tabla de diferencias finitas (Δy, Δ²y) y trazado gráfico SVG empírico.
 * 5. Lab 5: Dinámica UCV "La Pregunta Inversa" con 3 modelos científicos, rúbrica dimensional estructurada y enunciados modelo de la cátedra.
 */

import React, { useState, useMemo } from 'react';
import { renderLatexToHtml } from '../../utils/latexRenderer';
import { ArrowRightIcon, CheckCircleIcon } from '../common/Icons';
import {
  Scale,
  Compass,
  Box,
  Split,
  FileText,
  AlertTriangle,
  Lightbulb,
  RotateCcw,
} from 'lucide-react';

export type LabTabId =
  | 'si_arithmetic'
  | 'intervals_algebra'
  | 'venn_vectors'
  | 'caja_negra'
  | 'pregunta_inversa';

interface FactorItem {
  prime: number;
  count: number;
}

/**
 * Función auxiliar para factorizar un entero positivo en factores primos
 */
function getPrimeFactorization(num: number): FactorItem[] {
  let n = Math.abs(Math.floor(num));
  if (n <= 1) return [];
  const factors: FactorItem[] = [];
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) {
      let count = 0;
      while (n % d === 0) {
        count++;
        n /= d;
      }
      factors.push({ prime: d, count });
    }
  }
  if (n > 1) {
    factors.push({ prime: n, count: 1 });
  }
  return factors;
}

/**
 * Algoritmo de Euclides para MCD
 */
function computeGcd(a: number, b: number): number {
  let x = Math.abs(Math.floor(a));
  let y = Math.abs(Math.floor(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export const UCVInteractiveLabs: React.FC<{ initialTab?: LabTabId }> = ({
  initialTab = 'si_arithmetic',
}) => {
  const [activeLab, setActiveLab] = useState<LabTabId>(initialTab);

  // =========================================================================
  // ESTADOS - LAB 1: SI & ARITMÉTICA PRIMA (MCD / MCM)
  // =========================================================================
  const [siValue, setSiValue] = useState<number>(450);
  const [fromPrefixExp, setFromPrefixExp] = useState<number>(-3); // mili (10^-3)
  const [toPrefixExp, setToPrefixExp] = useState<number>(0); // unidad base (10^0)

  // Descomposición simultánea de dos números para MCD y MCM
  const [numA, setNumA] = useState<number>(72);
  const [numB, setNumB] = useState<number>(120);

  const siPrefixes = [
    { name: 'Giga (G)', exp: 9, symbol: 'G' },
    { name: 'Mega (M)', exp: 6, symbol: 'M' },
    { name: 'Kilo (k)', exp: 3, symbol: 'k' },
    { name: 'Unidad base', exp: 0, symbol: 'u' },
    { name: 'Mili (m)', exp: -3, symbol: 'm' },
    { name: 'Micro (μ)', exp: -6, symbol: 'μ' },
    { name: 'Nano (n)', exp: -9, symbol: 'n' },
    { name: 'Pico (p)', exp: -12, symbol: 'p' },
  ];

  // Cálculo de conversión y notación científica
  const convertedSiValue = useMemo(() => {
    const diff = fromPrefixExp - toPrefixExp;
    return siValue * Math.pow(10, diff);
  }, [siValue, fromPrefixExp, toPrefixExp]);

  const siScientificNotation = useMemo(() => {
    if (convertedSiValue === 0) return '0';
    const exp = Math.floor(Math.log10(Math.abs(convertedSiValue)));
    const mantissa = (convertedSiValue / Math.pow(10, exp)).toFixed(3);
    return `${mantissa} \\times 10^{${exp}}`;
  }, [convertedSiValue]);

  // Factores primos de A y B
  const factorsA = useMemo(() => getPrimeFactorization(numA), [numA]);
  const factorsB = useMemo(() => getPrimeFactorization(numB), [numB]);

  // Cálculo de MCD y MCM
  const calculatedGcd = useMemo(() => computeGcd(numA, numB), [numA, numB]);
  const calculatedLcm = useMemo(() => {
    const a = Math.abs(Math.floor(numA));
    const b = Math.abs(Math.floor(numB));
    if (a === 0 || b === 0) return 0;
    return (a * b) / calculatedGcd;
  }, [numA, numB, calculatedGcd]);

  // Formato LaTeX de factores primos
  const formatFactorsLatex = (factors: FactorItem[]) => {
    if (factors.length === 0) return '1';
    return factors.map((f) => (f.count > 1 ? `${f.prime}^{${f.count}}` : `${f.prime}`)).join(' \\cdot ');
  };

  // =========================================================================
  // ESTADOS - LAB 2: INTERVALOS EN ℝ Y ECUACIONES IRRACIONALES
  // =========================================================================
  const [intervalOp, setIntervalOp] = useState<'INTER' | 'UNION' | 'DIFF_A_B' | 'DIFF_B_A'>('INTER');
  const [intA, setIntA] = useState<number>(-3);
  const [intB, setIntB] = useState<number>(4);
  const [isAOpen, setIsAOpen] = useState<boolean>(true); // (
  const [isBOpen, setIsBOpen] = useState<boolean>(false); // ]

  const [intC, setIntC] = useState<number>(1);
  const [intD, setIntD] = useState<number>(6);
  const [isCOpen, setIsCOpen] = useState<boolean>(false); // [
  const [isDOpen, setIsDOpen] = useState<boolean>(true); // )

  // Resultado formal de la operación de intervalos
  const intervalResultLatex = useMemo(() => {
    if (intA > intB || intC > intD) return '\\text{Error: Extremo izquierdo > Extremo derecho}';

    if (intervalOp === 'INTER') {
      const left = Math.max(intA, intC);
      const right = Math.min(intB, intD);
      if (left > right) return '\\emptyset';
      if (left === right) {
        const incl = (left === intA ? !isAOpen : true) && (left === intC ? !isCOpen : true);
        return incl ? `\\{${left}\\}` : '\\emptyset';
      }
      const brL = left === intA ? (isAOpen ? '(' : '[') : isCOpen ? '(' : '[';
      const brR = right === intB ? (isBOpen ? ')' : ']') : isDOpen ? ')' : ']';
      return `${brL}${left}, ${right}${brR}`;
    }

    if (intervalOp === 'UNION') {
      const left = Math.min(intA, intC);
      const right = Math.max(intB, intD);
      // Chequear si se solapan o son disjuntos
      const maxLeft = Math.max(intA, intC);
      const minRight = Math.min(intB, intD);
      if (maxLeft > minRight) {
        // Disjuntos: escribir I1 U I2
        const b1 = `${isAOpen ? '(' : '['}${intA}, ${intB}${isBOpen ? ')' : ']'}`;
        const b2 = `${isCOpen ? '(' : '['}${intC}, ${intD}${isDOpen ? ')' : ']'}`;
        return `${b1} \\cup ${b2}`;
      }
      const brL = left === intA ? (isAOpen ? '(' : '[') : isCOpen ? '(' : '[';
      const brR = right === intB ? (isBOpen ? ')' : ']') : isDOpen ? ')' : ']';
      return `${brL}${left}, ${right}${brR}`;
    }

    if (intervalOp === 'DIFF_A_B') {
      return `I_1 \\setminus I_2 = \\{ x \\in I_1 \\mid x \\notin I_2 \\}`;
    }

    return `I_2 \\setminus I_1 = \\{ x \\in I_2 \\mid x \\notin I_1 \\}`;
  }, [intA, intB, isAOpen, isBOpen, intC, intD, isCOpen, isDOpen, intervalOp]);

  // Ecuaciones Irracionales Oficiales UCV (Detector de raíces extrañas)
  const IRRATIONAL_CASES = [
    {
      id: 'case_1',
      title: 'Caso 1: \\sqrt{2x + 3} = x',
      description: 'Una raíz válida y una raíz extraña introducida por elevar al cuadrado.',
      latexEquation: '\\sqrt{2x + 3} = x',
      step1Latex: '2x + 3 = x^2 \\implies x^2 - 2x - 3 = 0',
      step2Latex: '(x - 3)(x + 1) = 0 \\implies x_1 = 3,\\; x_2 = -1',
      candidate1: {
        val: 3,
        lhs: '\\sqrt{2(3) + 3} = \\sqrt{9} = 3',
        rhs: '3',
        isValid: true,
        reason: 'Satisface la igualdad 3 = 3.',
      },
      candidate2: {
        val: -1,
        lhs: '\\sqrt{2(-1) + 3} = \\sqrt{1} = 1',
        rhs: '-1',
        isValid: false,
        reason: '¡Raíz Extraña! 1 \\neq -1. La función raíz cuadrada aritmética siempre produce valores \\ge 0.',
      },
      conclusionLatex: 'S = \\{3\\}',
    },
    {
      id: 'case_2',
      title: 'Caso 2: \\sqrt{x + 2} = x - 4',
      description: 'Condición de contorno: el miembro derecho debe ser x - 4 \\ge 0 \\implies x \\ge 4.',
      latexEquation: '\\sqrt{x + 2} = x - 4',
      step1Latex: 'x + 2 = (x - 4)^2 = x^2 - 8x + 16 \\implies x^2 - 9x + 14 = 0',
      step2Latex: '(x - 7)(x - 2) = 0 \\implies x_1 = 7,\\; x_2 = 2',
      candidate1: {
        val: 7,
        lhs: '\\sqrt{7 + 2} = \\sqrt{9} = 3',
        rhs: '7 - 4 = 3',
        isValid: true,
        reason: 'Satisface la igualdad 3 = 3.',
      },
      candidate2: {
        val: 2,
        lhs: '\\sqrt{2 + 2} = \\sqrt{4} = 2',
        rhs: '2 - 4 = -2',
        isValid: false,
        reason: '¡Raíz Extraña! 2 \\neq -2. Viola la restricción x \\ge 4 del miembro derecho.',
      },
      conclusionLatex: 'S = \\{7\\}',
    },
    {
      id: 'case_3',
      title: 'Caso 3: \\sqrt{5x - 6} = x',
      description: 'Ambas soluciones son reales y válidas.',
      latexEquation: '\\sqrt{5x - 6} = x',
      step1Latex: '5x - 6 = x^2 \\implies x^2 - 5x + 6 = 0',
      step2Latex: '(x - 2)(x - 3) = 0 \\implies x_1 = 2,\\; x_2 = 3',
      candidate1: {
        val: 2,
        lhs: '\\sqrt{5(2) - 6} = \\sqrt{4} = 2',
        rhs: '2',
        isValid: true,
        reason: 'Satisface la igualdad 2 = 2.',
      },
      candidate2: {
        val: 3,
        lhs: '\\sqrt{5(3) - 6} = \\sqrt{9} = 3',
        rhs: '3',
        isValid: true,
        reason: 'Satisface la igualdad 3 = 3.',
      },
      conclusionLatex: 'S = \\{2, 3\\}',
    },
  ];

  const [selectedIrrationalId, setSelectedIrrationalId] = useState<string>('case_1');
  const currentIrrational =
    IRRATIONAL_CASES.find((c) => c.id === selectedIrrationalId) || IRRATIONAL_CASES[0];

  // =========================================================================
  // ESTADOS - LAB 3: VECTORES 2D CARTESIANOS, TRIGONOMETRÍA Y VENN
  // =========================================================================
  const [lab3SubTab, setLab3SubTab] = useState<'VECTORS' | 'TRIGONOMETRY' | 'VENN'>('VECTORS');

  // Vectores 2D
  const [vecUx, setVecUx] = useState<number>(4);
  const [vecUy, setVecUy] = useState<number>(2);
  const [vecVx, setVecVx] = useState<number>(-2);
  const [vecVy, setVecVy] = useState<number>(3);

  const vecSum = useMemo(() => ({ x: vecUx + vecVx, y: vecUy + vecVy }), [vecUx, vecUy, vecVx, vecVy]);
  const vecDiff = useMemo(() => ({ x: vecUx - vecVx, y: vecUy - vecVy }), [vecUx, vecUy, vecVx, vecVy]);
  const vecMagU = useMemo(() => Math.hypot(vecUx, vecUy), [vecUx, vecUy]);
  const vecMagV = useMemo(() => Math.hypot(vecVx, vecVy), [vecVx, vecVy]);
  const vecMagSum = useMemo(() => Math.hypot(vecSum.x, vecSum.y), [vecSum]);
  const vecDotProduct = useMemo(() => vecUx * vecVx + vecUy * vecVy, [vecUx, vecUy, vecVx, vecVy]);
  const vecAngleDeg = useMemo(() => {
    const denom = vecMagU * vecMagV;
    if (denom === 0) return 0;
    const cosVal = Math.max(-1, Math.min(1, vecDotProduct / denom));
    return (Math.acos(cosVal) * (180 / Math.PI)).toFixed(1);
  }, [vecMagU, vecMagV, vecDotProduct]);

  // Círculo Trigonométrico & Ángulo Notable
  const [trigAngleDeg, setTrigAngleDeg] = useState<number>(45);
  const trigAngleRad = useMemo(() => (trigAngleDeg * Math.PI) / 180, [trigAngleDeg]);
  const trigCos = useMemo(() => Math.cos(trigAngleRad), [trigAngleRad]);
  const trigSin = useMemo(() => Math.sin(trigAngleRad), [trigAngleRad]);
  const trigTan = useMemo(() => {
    if (Math.abs(trigCos) < 1e-5) return 'Indefinido (\\infty)';
    return (trigSin / trigCos).toFixed(3);
  }, [trigSin, trigCos]);

  // Diagrama de Venn
  const [vennMode, setVennMode] = useState<'UNION' | 'INTER' | 'DIFF_A' | 'DIFF_B' | 'SYM_DIFF'>('INTER');

  // =========================================================================
  // ESTADOS - LAB 4: EL PROBLEMA DE LA CAJA NEGRA (UA I - Método Científico)
  // =========================================================================
  interface BlackBoxModel {
    id: string;
    level: string;
    name: string;
    domain: string;
    func: (x: number) => number;
    latexFormula: string;
    description: string;
    hints: string[];
  }

  const BLACK_BOX_MODELS: BlackBoxModel[] = [
    {
      id: 'linear',
      level: 'Nivel 1: Básico',
      name: 'Ley de Proporcionalidad Lineal',
      domain: 'Dinámica de Masa Constante',
      func: (x: number) => 3 * x - 5,
      latexFormula: 'f(x) = 3x - 5',
      description: 'La tasa de variación media Δy/Δx permanece rigurosamente constante.',
      hints: [
        'Evalúa en x = 0 para obtener el término independiente.',
        'Calcula la diferencia Δy = y(x+1) - y(x); notarás que es fija.',
      ],
    },
    {
      id: 'quadratic',
      level: 'Nivel 2: Intermedio',
      name: 'Ley Cuadrática de Aceleración',
      domain: 'Cinemática & Gravitación',
      func: (x: number) => 2 * x * x - 3,
      latexFormula: 'f(x) = 2x^2 - 3',
      description: 'La segunda diferencia finita Δ²y permanece constante (2a = constante).',
      hints: [
        'Prueba con valores negativos de x (ej: x = -2 y x = 2); observa si f(x) = f(-x).',
        'La primera diferencia crece linealmente, lo que delata un grado 2.',
      ],
    },
    {
      id: 'cubic',
      level: 'Nivel 3: Avanzado',
      name: 'Ley Cúbica de Dilución',
      domain: 'Termodinámica de Gases',
      func: (x: number) => Math.pow(x, 3) - 4 * x,
      latexFormula: 'f(x) = x^3 - 4x',
      description: 'Función impar: f(-x) = -f(x). Posee raíces en x = -2, 0, 2.',
      hints: [
        'Evalúa en x = 0 y luego en x = 2 y x = -2.',
        'Observa que f(-x) tiene exactamente el signo opuesto de f(x).',
      ],
    },
  ];

  const [selectedBbId, setSelectedBbId] = useState<string>('quadratic');
  const currentBb = BLACK_BOX_MODELS.find((m) => m.id === selectedBbId) || BLACK_BOX_MODELS[0];

  const [bbInput, setBbInput] = useState<number>(2);
  const [bbHistory, setBbHistory] = useState<{ input: number; output: number }[]>([
    { input: 0, output: currentBb.func(0) },
    { input: 1, output: currentBb.func(1) },
    { input: 2, output: currentBb.func(2) },
  ]);
  const [bbGuess, setBbGuess] = useState<string>('');
  const [bbVerdict, setBbVerdict] = useState<string | null>(null);
  const [showBbSecret, setShowBbSecret] = useState<boolean>(false);

  // Cambiar de modelo en la Caja Negra
  const handleSelectBbModel = (id: string) => {
    setSelectedBbId(id);
    const mod = BLACK_BOX_MODELS.find((m) => m.id === id) || BLACK_BOX_MODELS[0];
    setBbHistory([
      { input: 0, output: mod.func(0) },
      { input: 1, output: mod.func(1) },
      { input: 2, output: mod.func(2) },
    ]);
    setBbGuess('');
    setBbVerdict(null);
    setShowBbSecret(false);
  };

  const handleTestBlackBox = () => {
    const out = currentBb.func(bbInput);
    setBbHistory((prev) => {
      // Evitar duplicados idénticos consecutivos
      return [...prev, { input: bbInput, output: out }];
    });
  };

  const handleVerifyGuess = () => {
    const cleaned = bbGuess.replace(/\s+/g, '').toLowerCase();
    const targetClean = currentBb.latexFormula.replace(/f\(x\)=/g, '').replace(/\s+/g, '').toLowerCase();
    if (cleaned.includes(targetClean) || (currentBb.id === 'quadratic' && cleaned.includes('2x^2-3'))) {
      setBbVerdict(`¡Brillante! Has descubierto con éxito la ley ${currentBb.latexFormula} mediante inducción científica.`);
    } else {
      setBbVerdict(
        'La ley propuesta no reproduce con fidelidad los puntos experimentales. Revisa los indicios o evalúa x = 3 y x = -1.'
      );
    }
  };

  // =========================================================================
  // ESTADOS - LAB 5: LA PREGUNTA INVERSA (UA III - Modelado Científico)
  // =========================================================================
  interface InverseCase {
    id: string;
    title: string;
    equationLatex: string;
    scientificDomain: string;
    prompt: string;
    standardAnswer: string;
    rubricPoints: { label: string; explanation: string }[];
  }

  const INVERSE_CASES: InverseCase[] = [
    {
      id: 'cinematica',
      title: 'Caso A: Movimiento Rectilíneo con Velocidad Inicial',
      equationLatex: '2x + 15 = 75',
      scientificDomain: 'Física Clásica (Cinemática)',
      prompt:
        'Redacta un problema real donde un móvil con velocidad constante x o aceleración parte de una posición x₀ = 15 m y llega a 75 m.',
      standardAnswer:
        'Un móvil se desplaza por una pista horizontal rectilínea con rapidez constante. Al activar el cronómetro (t = 0 s), se encuentra en la posición s₀ = 15 m. Tras transcurrir 2 segundos, el móvil alcanza la marca de 75 m. ¿Cuál es la rapidez v (en m/s) que lleva el móvil?',
      rubricPoints: [
        { label: 'Magnitud de la incógnita', explanation: 'x representa la velocidad media (m/s).' },
        { label: 'Significado de 15 y 75', explanation: '15 m es la posición inicial y 75 m es la posición final.' },
        { label: 'Consistencia física', explanation: 'La ecuación 2v + 15 = 75 cumple s(t) = s₀ + vt.' },
      ],
    },
    {
      id: 'quimica',
      title: 'Caso B: Soluciones Químicas y Dilución',
      equationLatex: '0.15x + 0.35(50 - x) = 12.5',
      scientificDomain: 'Química General (Estequiometría)',
      prompt:
        'Redacta un problema de laboratorio donde se mezclan dos soluciones de ácido clorhídrico al 15% y 35% para obtener 50 mL al 25%.',
      standardAnswer:
        'En el laboratorio de Química de Ciencias UCV se dispone de dos frascos de HCl: uno al 15% de concentración en masa y otro al 35%. Se desean preparar 50 mL de una solución intermedia que contenga exactamente 12.5 mL de ácido puro (concentración final del 25%). ¿Cuántos mililitros x de la solución al 15% deben medirse con la pipeta?',
      rubricPoints: [
        { label: 'Conservación de materia', explanation: 'La masa de soluto puro de ambas partes suma el soluto final.' },
        { label: 'Volumen total', explanation: 'Si la primera alícuota es x mL, la segunda debe ser (50 - x) mL.' },
        { label: 'Unidades del SI', explanation: 'Se explicitan mililitros (mL) y porcentaje en masa.' },
      ],
    },
    {
      id: 'sistemas',
      title: 'Caso C: Sistema Lineal 2x2 en Ecología de Poblaciones',
      equationLatex: '\\begin{cases} x + y = 60 \\\\ 2x + 4y = 180 \\end{cases}',
      scientificDomain: 'Biología & Ecología Cuantitativa',
      prompt:
        'Redacta un problema de muestreo de campo biológico que involucre conteo de individuos y extremidades de dos especies animales.',
      standardAnswer:
        'Durante una salida de campo a los Llanos venezolanos, un equipo de biólogos contabiliza un total de 60 individuos entre aves zancudas (2 patas) y chigüires (4 patas). Si en el censo se registraron exactamente 180 extremidades locomotoras, ¿cuántos ejemplares x de aves y cuántos y de chigüires conforman la muestra estudiada?',
      rubricPoints: [
        { label: 'Ecuación 1 (Individuos)', explanation: 'x + y = 60 contabiliza el total de organismos vivos.' },
        { label: 'Ecuación 2 (Extremidades)', explanation: '2x + 4y = 180 asocia los coeficientes anatómicos correctos.' },
        { label: 'Plausibilidad biológica', explanation: 'Los valores de x e y deben ser enteros estrictamente no negativos.' },
      ],
    },
  ];

  const [selectedInverseId, setSelectedInverseId] = useState<string>('cinematica');
  const currentInverse =
    INVERSE_CASES.find((c) => c.id === selectedInverseId) || INVERSE_CASES[0];
  const [userDraft, setUserDraft] = useState<string>('');
  const [feedbackGiven, setFeedbackGiven] = useState<boolean>(false);
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* Selector Superior de los 5 Laboratorios UCV */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveLab('si_arithmetic')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeLab === 'si_arithmetic'
              ? 'bg-white text-slate-900 shadow-soft-sm font-sans'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-[#0F52BA]" />
          <span>SI & Aritmética Prima (MCD/MCM)</span>
        </button>

        <button
          onClick={() => setActiveLab('intervals_algebra')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeLab === 'intervals_algebra'
              ? 'bg-white text-slate-900 shadow-soft-sm font-sans'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Split className="w-3.5 h-3.5 text-indigo-600" />
          <span>Intervalos en ℝ & Ecuaciones Irracionales</span>
        </button>

        <button
          onClick={() => setActiveLab('venn_vectors')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeLab === 'venn_vectors'
              ? 'bg-white text-slate-900 shadow-soft-sm font-sans'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-purple-600" />
          <span>Vectores 2D, Círculo Trigonométrico & Venn</span>
        </button>

        <button
          onClick={() => setActiveLab('caja_negra')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeLab === 'caja_negra'
              ? 'bg-white text-slate-900 shadow-soft-sm font-sans'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Box className="w-3.5 h-3.5 text-emerald-600" />
          <span>Reto UCV: La Caja Negra</span>
        </button>

        <button
          onClick={() => setActiveLab('pregunta_inversa')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeLab === 'pregunta_inversa'
              ? 'bg-white text-slate-900 shadow-soft-sm font-sans'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-amber-600" />
          <span>Reto UCV: La Pregunta Inversa</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* LAB 1: SISTEMA INTERNACIONAL, NOTACIÓN CIENTÍFICA Y ARITMÉTICA PRIMA */}
      {/* ========================================================================= */}
      {activeLab === 'si_arithmetic' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Panel 1.1: Escalera del SI y Notación Científica */}
            <div className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-3xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#0F52BA]" />
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Escalera de Conversión de Prefijos (SI)
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                  Potencias de 10
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Valor Numérico Base:
                  </label>
                  <input
                    type="number"
                    value={siValue}
                    onChange={(e) => setSiValue(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono font-bold text-slate-800 focus:outline-none focus:border-[#0F52BA]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                      Prefijo Origen:
                    </label>
                    <select
                      value={fromPrefixExp}
                      onChange={(e) => setFromPrefixExp(Number(e.target.value))}
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
                    >
                      {siPrefixes.map((p) => (
                        <option key={`from-${p.exp}`} value={p.exp}>
                          {p.name} (10^{p.exp})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                      Prefijo Destino:
                    </label>
                    <select
                      value={toPrefixExp}
                      onChange={(e) => setToPrefixExp(Number(e.target.value))}
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
                    >
                      {siPrefixes.map((p) => (
                        <option key={`to-${p.exp}`} value={p.exp}>
                          {p.name} (10^{p.exp})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Resultado de la Conversión */}
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-200/80 space-y-2">
                  <span className="text-[11px] font-mono uppercase font-bold text-blue-700 block">
                    Resultado de la Transformación:
                  </span>
                  <div className="text-lg font-bold text-slate-900 font-mono">
                    {convertedSiValue.toLocaleString('es-VE', { maximumFractionDigits: 8 })}{' '}
                    <span className="text-xs font-sans text-slate-500">
                      (Factor 10^{fromPrefixExp - toPrefixExp})
                    </span>
                  </div>
                  <div className="pt-2 border-t border-blue-200/60">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block font-mono">
                      Notación Científica Normalizada:
                    </span>
                    <div
                      className="text-sm font-bold text-[#0F52BA] pt-0.5"
                      dangerouslySetInnerHTML={{
                        __html: renderLatexToHtml(siScientificNotation, { displayMode: false }),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 1.2: Descomposición Simultánea, MCD y MCM */}
            <div className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-3xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Aritmética Prima: MCD y MCM Oficial UCV
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                  Módulo 3.2
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Número A:
                    </label>
                    <input
                      type="number"
                      min="2"
                      value={numA}
                      onChange={(e) => setNumA(Math.max(2, Number(e.target.value)))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono font-bold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Número B:
                    </label>
                    <input
                      type="number"
                      min="2"
                      value={numB}
                      onChange={(e) => setNumB(Math.max(2, Number(e.target.value)))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono font-bold text-slate-800"
                    />
                  </div>
                </div>

                {/* Descomposiciones en Factores Primos */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-bold">A = {numA}:</span>
                    <div
                      className="text-indigo-700 font-bold"
                      dangerouslySetInnerHTML={{
                        __html: renderLatexToHtml(formatFactorsLatex(factorsA), { displayMode: false }),
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                    <span className="text-slate-600 font-bold">B = {numB}:</span>
                    <div
                      className="text-purple-700 font-bold"
                      dangerouslySetInnerHTML={{
                        __html: renderLatexToHtml(formatFactorsLatex(factorsB), { displayMode: false }),
                      }}
                    />
                  </div>
                </div>

                {/* Tarjetas de MCD y MCM */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 font-mono block">
                      MCD (Factores Comunes Menor Exp.)
                    </span>
                    <div className="text-lg font-extrabold text-emerald-950 font-mono">
                      {calculatedGcd}
                    </div>
                  </div>

                  <div className="p-3.5 bg-purple-50/60 border border-purple-200 rounded-2xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-purple-800 font-mono block">
                      MCM (Comunes & No Comunes Mayor Exp.)
                    </span>
                    <div className="text-lg font-extrabold text-purple-950 font-mono">
                      {calculatedLcm}
                    </div>
                  </div>
                </div>

                {/* Identidad de Oro de Teoría de Números */}
                <div className="p-3 bg-slate-100 rounded-xl text-center text-xs text-slate-600 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono block">
                    Comprobación Formal UCV:
                  </span>
                  <div
                    className="font-bold text-slate-800"
                    dangerouslySetInnerHTML={{
                      __html: renderLatexToHtml(
                        `A \\cdot B = ${numA} \\times ${numB} = ${numA * numB} = \\text{MCD} \\cdot \\text{MCM} = ${calculatedGcd} \\times ${calculatedLcm}`,
                        { displayMode: false }
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LAB 2: INTERVALOS EN ℝ Y DETECTOR DE RAÍCES EXTRAÑAS */}
      {/* ========================================================================= */}
      {activeLab === 'intervals_algebra' && (
        <div className="space-y-6">
          {/* Subpanel 2.1: Operaciones en la Recta Numérica */}
          <div className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-3xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2">
                <Split className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Laboratorio de Intervalos y Recta Numérica en ℝ
                </h3>
              </div>
              {/* Selector de Operación */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {[
                  { id: 'INTER', label: 'I₁ ∩ I₂' },
                  { id: 'UNION', label: 'I₁ ∪ I₂' },
                  { id: 'DIFF_A_B', label: 'I₁ ∖ I₂' },
                  { id: 'DIFF_B_A', label: 'I₂ ∖ I₁' },
                ].map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setIntervalOp(op.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      intervalOp === op.id
                        ? 'bg-indigo-600 text-white shadow-soft-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Controles de Intervalos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Intervalo 1 */}
              <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-200/80 space-y-3">
                <span className="text-xs font-bold text-indigo-900 block">Intervalo I₁:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAOpen(!isAOpen)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-indigo-300 font-mono text-xs font-bold shadow-soft-xs"
                  >
                    {isAOpen ? '( Abierto' : '[ Cerrado'}
                  </button>
                  <input
                    type="number"
                    value={intA}
                    onChange={(e) => setIntA(Number(e.target.value))}
                    className="w-16 px-2 py-1 text-center font-mono rounded-lg border border-indigo-300 text-xs font-bold bg-white"
                  />
                  <span className="text-xs text-indigo-400 font-semibold">hasta</span>
                  <input
                    type="number"
                    value={intB}
                    onChange={(e) => setIntB(Number(e.target.value))}
                    className="w-16 px-2 py-1 text-center font-mono rounded-lg border border-indigo-300 text-xs font-bold bg-white"
                  />
                  <button
                    onClick={() => setIsBOpen(!isBOpen)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-indigo-300 font-mono text-xs font-bold shadow-soft-xs"
                  >
                    {isBOpen ? ') Abierto' : '] Cerrado'}
                  </button>
                </div>
              </div>

              {/* Intervalo 2 */}
              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/80 space-y-3">
                <span className="text-xs font-bold text-purple-900 block">Intervalo I₂:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsCOpen(!isCOpen)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-purple-300 font-mono text-xs font-bold shadow-soft-xs"
                  >
                    {isCOpen ? '( Abierto' : '[ Cerrado'}
                  </button>
                  <input
                    type="number"
                    value={intC}
                    onChange={(e) => setIntC(Number(e.target.value))}
                    className="w-16 px-2 py-1 text-center font-mono rounded-lg border border-purple-300 text-xs font-bold bg-white"
                  />
                  <span className="text-xs text-purple-400 font-semibold">hasta</span>
                  <input
                    type="number"
                    value={intD}
                    onChange={(e) => setIntD(Number(e.target.value))}
                    className="w-16 px-2 py-1 text-center font-mono rounded-lg border border-purple-300 text-xs font-bold bg-white"
                  />
                  <button
                    onClick={() => setIsDOpen(!isDOpen)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-purple-300 font-mono text-xs font-bold shadow-soft-xs"
                  >
                    {isDOpen ? ') Abierto' : '] Cerrado'}
                  </button>
                </div>
              </div>
            </div>

            {/* Representación SVG de la Recta Real */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 overflow-x-auto flex flex-col items-center">
              <svg viewBox="-8 -3 16 6" className="w-full max-w-xl h-24 overflow-visible">
                {/* Eje X Principal */}
                <line x1="-7.5" y1="0" x2="7.5" y2="0" stroke="#94a3b8" strokeWidth="0.08" />
                {/* Marcas de enteros */}
                {[-6, -4, -2, 0, 2, 4, 6].map((tick) => (
                  <g key={tick}>
                    <line x1={tick} y1="-0.2" x2={tick} y2="0.2" stroke="#64748b" strokeWidth="0.06" />
                    <text x={tick} y="0.8" textAnchor="middle" className="text-[0.45px] fill-slate-500 font-mono font-bold">
                      {tick}
                    </text>
                  </g>
                ))}

                {/* Segmento I1 (Azul Cobalto) */}
                <line
                  x1={Math.max(-7, Math.min(7, intA))}
                  y1="-0.6"
                  x2={Math.max(-7, Math.min(7, intB))}
                  y2="-0.6"
                  stroke="#4f46e5"
                  strokeWidth="0.22"
                />
                <circle
                  cx={Math.max(-7, Math.min(7, intA))}
                  cy="-0.6"
                  r="0.2"
                  fill={isAOpen ? '#ffffff' : '#4f46e5'}
                  stroke="#4f46e5"
                  strokeWidth="0.08"
                />
                <circle
                  cx={Math.max(-7, Math.min(7, intB))}
                  cy="-0.6"
                  r="0.2"
                  fill={isBOpen ? '#ffffff' : '#4f46e5'}
                  stroke="#4f46e5"
                  strokeWidth="0.08"
                />

                {/* Segmento I2 (Púrpura) */}
                <line
                  x1={Math.max(-7, Math.min(7, intC))}
                  y1="-1.2"
                  x2={Math.max(-7, Math.min(7, intD))}
                  y2="-1.2"
                  stroke="#9333ea"
                  strokeWidth="0.22"
                />
                <circle
                  cx={Math.max(-7, Math.min(7, intC))}
                  cy="-1.2"
                  r="0.2"
                  fill={isCOpen ? '#ffffff' : '#9333ea'}
                  stroke="#9333ea"
                  strokeWidth="0.08"
                />
                <circle
                  cx={Math.max(-7, Math.min(7, intD))}
                  cy="-1.2"
                  r="0.2"
                  fill={isDOpen ? '#ffffff' : '#9333ea'}
                  stroke="#9333ea"
                  strokeWidth="0.08"
                />
              </svg>

              <div className="mt-3 text-center">
                <span className="text-xs font-semibold text-slate-500">Resultado Formal de la Operación:</span>
                <div
                  className="text-base font-bold text-slate-900 mt-1"
                  dangerouslySetInnerHTML={{
                    __html: renderLatexToHtml(intervalResultLatex, { displayMode: false }),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Subpanel 2.2: Solucionador y Detector de Raíces Extrañas en Ecuaciones Irracionales */}
          <div className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-3xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Detector Interactivo de Raíces Extrañas en Ecuaciones Irracionales (Módulo 4)
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                {IRRATIONAL_CASES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedIrrationalId(c.id)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                      selectedIrrationalId === c.id
                        ? 'bg-amber-600 text-white shadow-soft-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {c.title.split(':')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-800 block">
                    Ecuación a Resolver:
                  </span>
                  <div
                    className="text-lg font-bold text-slate-900"
                    dangerouslySetInnerHTML={{
                      __html: renderLatexToHtml(currentIrrational.latexEquation, { displayMode: false }),
                    }}
                  />
                </div>
                <p className="text-xs text-slate-600 max-w-sm">{currentIrrational.description}</p>
              </div>

              {/* Pasos de Resolución */}
              <div className="p-3.5 bg-white rounded-xl border border-amber-200/80 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="font-bold text-slate-900">Paso 1 (Elevar al cuadrado):</span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderLatexToHtml(currentIrrational.step1Latex, { displayMode: false }),
                    }}
                  />
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="font-bold text-slate-900">Paso 2 (Factorización):</span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderLatexToHtml(currentIrrational.step2Latex, { displayMode: false }),
                    }}
                  />
                </div>
              </div>

              {/* Verificación de Candidatos y Detección de Raíz Extraña */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* Candidato 1 */}
                <div
                  className={`p-3.5 rounded-2xl border ${
                    currentIrrational.candidate1.isValid
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50/70 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold font-mono text-xs">
                      Candidato x₁ = {currentIrrational.candidate1.val}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        currentIrrational.candidate1.isValid
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-rose-200 text-rose-900'
                      }`}
                    >
                      {currentIrrational.candidate1.isValid ? '✓ Raíz Válida' : '✗ Raíz Extraña'}
                    </span>
                  </div>
                  <div
                    className="text-xs py-1"
                    dangerouslySetInnerHTML={{
                      __html: renderLatexToHtml(
                        `\\text{LHS: } ${currentIrrational.candidate1.lhs} \\;\\; \\text{vs} \\;\\; \\text{RHS: } ${currentIrrational.candidate1.rhs}`,
                        { displayMode: false }
                      ),
                    }}
                  />
                  <p className="text-[11px] leading-relaxed opacity-90">
                    {currentIrrational.candidate1.reason}
                  </p>
                </div>

                {/* Candidato 2 */}
                <div
                  className={`p-3.5 rounded-2xl border ${
                    currentIrrational.candidate2.isValid
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50/70 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold font-mono text-xs">
                      Candidato x₂ = {currentIrrational.candidate2.val}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        currentIrrational.candidate2.isValid
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-rose-200 text-rose-900'
                      }`}
                    >
                      {currentIrrational.candidate2.isValid ? '✓ Raíz Válida' : '✗ Raíz Extraña'}
                    </span>
                  </div>
                  <div
                    className="text-xs py-1"
                    dangerouslySetInnerHTML={{
                      __html: renderLatexToHtml(
                        `\\text{LHS: } ${currentIrrational.candidate2.lhs} \\;\\; \\text{vs} \\;\\; \\text{RHS: } ${currentIrrational.candidate2.rhs}`,
                        { displayMode: false }
                      ),
                    }}
                  />
                  <p className="text-[11px] leading-relaxed opacity-90">
                    {currentIrrational.candidate2.reason}
                  </p>
                </div>
              </div>

              <div className="text-center pt-2">
                <span className="text-xs font-semibold text-slate-500">Conjunto Solución Verdadero:</span>
                <div
                  className="text-sm font-bold text-slate-900 mt-0.5"
                  dangerouslySetInnerHTML={{
                    __html: renderLatexToHtml(currentIrrational.conclusionLatex, { displayMode: false }),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LAB 3: VECTORES 2D CARTESIANOS, TRIGONOMETRÍA Y DIAGRAMA DE VENN */}
      {/* ========================================================================= */}
      {activeLab === 'venn_vectors' && (
        <div className="space-y-6">
          {/* Subpestañas del Laboratorio 3 */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setLab3SubTab('VECTORS')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                lab3SubTab === 'VECTORS'
                  ? 'bg-white text-slate-900 shadow-soft-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lienzo Cartesiano de Vectores 2D (Paralelogramo)
            </button>
            <button
              onClick={() => setLab3SubTab('TRIGONOMETRY')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                lab3SubTab === 'TRIGONOMETRY'
                  ? 'bg-white text-slate-900 shadow-soft-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Círculo Trigonométrico & Ángulos Notables
            </button>
            <button
              onClick={() => setLab3SubTab('VENN')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                lab3SubTab === 'VENN'
                  ? 'bg-white text-slate-900 shadow-soft-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Diagrama de Venn Interactivo
            </button>
          </div>

          {/* 3.1: Lienzo de Vectores 2D */}
          {lab3SubTab === 'VECTORS' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Controles de Sliders (5 cols) */}
              <div className="lg:col-span-5 app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-3xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-sm font-bold text-slate-900 font-sans">
                    Componentes Vectoriales
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">
                    ℝ² Cartesiano
                  </span>
                </div>

                {/* Vector u (Azul Cobalto) */}
                <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#0F52BA]">Vector u: ({vecUx}, {vecUy})</span>
                    <span className="font-mono text-slate-500 font-semibold">|u| = {vecMagU.toFixed(2)}</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                      <span>uₓ = {vecUx}</span>
                      <span>Rango: [-6, 6]</span>
                    </div>
                    <input
                      type="range"
                      min="-6"
                      max="6"
                      value={vecUx}
                      onChange={(e) => setVecUx(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                      <span>uᵧ = {vecUy}</span>
                      <span>Rango: [-6, 6]</span>
                    </div>
                    <input
                      type="range"
                      min="-6"
                      max="6"
                      value={vecUy}
                      onChange={(e) => setVecUy(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Vector v (Verde Esmeralda) */}
                <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-800">Vector v: ({vecVx}, {vecVy})</span>
                    <span className="font-mono text-slate-500 font-semibold">|v| = {vecMagV.toFixed(2)}</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                      <span>vₓ = {vecVx}</span>
                      <span>Rango: [-6, 6]</span>
                    </div>
                    <input
                      type="range"
                      min="-6"
                      max="6"
                      value={vecVx}
                      onChange={(e) => setVecVx(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                      <span>vᵧ = {vecVy}</span>
                      <span>Rango: [-6, 6]</span>
                    </div>
                    <input
                      type="range"
                      min="-6"
                      max="6"
                      value={vecVy}
                      onChange={(e) => setVecVy(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Métricas Vectoriales */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono space-y-1.5">
                  <div className="flex justify-between text-purple-900 font-bold">
                    <span>Suma u + v:</span>
                    <span>({vecSum.x}, {vecSum.y}) |R| = {vecMagSum.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Resta u - v:</span>
                    <span>({vecDiff.x}, {vecDiff.y}) |D| = {Math.hypot(vecDiff.x, vecDiff.y).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Producto Escalar u · v:</span>
                    <span className="font-bold">{vecDotProduct}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Ángulo entre vectores θ:</span>
                    <span className="font-bold">{vecAngleDeg}°</span>
                  </div>
                </div>
              </div>

              {/* Lienzo SVG Gráfico 2D (7 cols) */}
              <div className="lg:col-span-7 app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-3xl flex flex-col items-center">
                <span className="text-[11px] font-mono uppercase text-slate-400 font-bold mb-3">
                  Visualización Cartesiana Interactiva con Regla del Paralelogramo
                </span>

                <svg viewBox="-10 -10 20 20" className="w-full max-w-md h-80 bg-slate-50 rounded-2xl border border-slate-200">
                  <defs>
                    <marker id="arrow-u" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <polygon points="0 0, 6 3, 0 6" fill="#0F52BA" />
                    </marker>
                    <marker id="arrow-v" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <polygon points="0 0, 6 3, 0 6" fill="#059669" />
                    </marker>
                    <marker id="arrow-sum" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <polygon points="0 0, 6 3, 0 6" fill="#7e22ce" />
                    </marker>
                  </defs>

                  {/* Rejilla */}
                  {[-8, -6, -4, -2, 2, 4, 6, 8].map((t) => (
                    <g key={`grid-${t}`}>
                      <line x1={t} y1="-10" x2={t} y2="10" stroke="#e2e8f0" strokeWidth="0.05" />
                      <line x1="-10" y1={t} x2="10" y2={t} stroke="#e2e8f0" strokeWidth="0.05" />
                    </g>
                  ))}

                  {/* Ejes Principales (Y invertido para SVG estándar) */}
                  <line x1="-9.5" y1="0" x2="9.5" y2="0" stroke="#64748b" strokeWidth="0.1" />
                  <line x1="0" y1="-9.5" x2="0" y2="9.5" stroke="#64748b" strokeWidth="0.1" />

                  {/* Líneas punteadas del Paralelogramo */}
                  <line
                    x1={vecUx}
                    y1={-vecUy}
                    x2={vecSum.x}
                    y2={-vecSum.y}
                    stroke="#94a3b8"
                    strokeWidth="0.08"
                    strokeDasharray="0.3 0.2"
                  />
                  <line
                    x1={vecVx}
                    y1={-vecVy}
                    x2={vecSum.x}
                    y2={-vecSum.y}
                    stroke="#94a3b8"
                    strokeWidth="0.08"
                    strokeDasharray="0.3 0.2"
                  />

                  {/* Vector u (Azul) */}
                  <line
                    x1="0"
                    y1="0"
                    x2={vecUx}
                    y2={-vecUy}
                    stroke="#0F52BA"
                    strokeWidth="0.25"
                    markerEnd="url(#arrow-u)"
                  />

                  {/* Vector v (Verde) */}
                  <line
                    x1="0"
                    y1="0"
                    x2={vecVx}
                    y2={-vecVy}
                    stroke="#059669"
                    strokeWidth="0.25"
                    markerEnd="url(#arrow-v)"
                  />

                  {/* Vector Suma u + v (Púrpura) */}
                  <line
                    x1="0"
                    y1="0"
                    x2={vecSum.x}
                    y2={-vecSum.y}
                    stroke="#7e22ce"
                    strokeWidth="0.32"
                    markerEnd="url(#arrow-sum)"
                  />

                  {/* Etiquetas */}
                  <text x={vecUx + 0.3} y={-vecUy - 0.3} className="text-[0.6px] font-bold fill-[#0F52BA]">
                    u
                  </text>
                  <text x={vecVx + 0.3} y={-vecVy - 0.3} className="text-[0.6px] font-bold fill-[#059669]">
                    v
                  </text>
                  <text x={vecSum.x + 0.3} y={-vecSum.y - 0.3} className="text-[0.6px] font-bold fill-[#7e22ce]">
                    u + v
                  </text>
                </svg>

                <div className="flex items-center gap-4 text-xs font-bold mt-4">
                  <div className="flex items-center gap-1.5 text-[#0F52BA]">
                    <span className="w-3 h-3 rounded-full bg-[#0F52BA]" />
                    <span>Vector u</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#059669]">
                    <span className="w-3 h-3 rounded-full bg-[#059669]" />
                    <span>Vector v</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-purple-700">
                    <span className="w-3 h-3 rounded-full bg-purple-700" />
                    <span>Resultante u + v</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3.2: Círculo Trigonométrico & Ángulos Notables */}
          {lab3SubTab === 'TRIGONOMETRY' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-3xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-sm font-bold text-slate-900 font-sans">
                    Ángulo y Relaciones Goniométricas
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold">
                    Círculo Unitario
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span className="font-bold">Ángulo θ: {trigAngleDeg}°</span>
                    <span className="font-mono">{(trigAngleRad / Math.PI).toFixed(2)}π rad</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={trigAngleDeg}
                    onChange={(e) => setTrigAngleDeg(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Botones de Ángulos Notables UCV */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                    Ángulos Notables Oficiales:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[0, 30, 45, 60, 90, 180, 270, 360].map((deg) => (
                      <button
                        key={deg}
                        onClick={() => setTrigAngleDeg(deg)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          trigAngleDeg === deg
                            ? 'bg-purple-600 text-white shadow-soft-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {deg}°
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tarjetas de Razones Trigonométricas */}
                <div className="space-y-2 pt-2">
                  <div className="p-3 bg-red-50/60 border border-red-200 rounded-xl flex justify-between items-center text-xs">
                    <span className="font-bold text-red-800">Seno (sen θ = Cateto Opuesto):</span>
                    <span className="font-mono font-extrabold text-red-950 text-sm">
                      {trigSin.toFixed(4)}
                    </span>
                  </div>

                  <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl flex justify-between items-center text-xs">
                    <span className="font-bold text-blue-800">Coseno (cos θ = Cateto Adyacente):</span>
                    <span className="font-mono font-extrabold text-blue-950 text-sm">
                      {trigCos.toFixed(4)}
                    </span>
                  </div>

                  <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl flex justify-between items-center text-xs">
                    <span className="font-bold text-emerald-800">Tangente (tan θ = sen θ / cos θ):</span>
                    <span className="font-mono font-extrabold text-emerald-950 text-sm">
                      {trigTan}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-600">
                  <span className="font-bold text-slate-800">Identidad Fundamental:</span>{' '}
                  <span className="font-mono">
                    sen²({trigAngleDeg}°) + cos²({trigAngleDeg}°) = {(trigSin * trigSin + trigCos * trigCos).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Gráfica del Círculo Unitario SVG (7 cols) */}
              <div className="lg:col-span-7 app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-3xl flex flex-col items-center">
                <span className="text-[11px] font-mono uppercase text-slate-400 font-bold mb-3">
                  Proyecciones en el Círculo Goniométrico (Radio r = 1)
                </span>

                <svg viewBox="-2 -2 4 4" className="w-full max-w-md h-80 bg-slate-50 rounded-2xl border border-slate-200">
                  {/* Ejes */}
                  <line x1="-1.8" y1="0" x2="1.8" y2="0" stroke="#94a3b8" strokeWidth="0.02" />
                  <line x1="0" y1="-1.8" x2="0" y2="1.8" stroke="#94a3b8" strokeWidth="0.02" />

                  {/* Círculo Unitario */}
                  <circle cx="0" cy="0" r="1" fill="none" stroke="#64748b" strokeWidth="0.03" />

                  {/* Triángulo Rectángulo Proyectado */}
                  {/* Base cos (Azul) */}
                  <line x1="0" y1="0" x2={trigCos} y2="0" stroke="#2563eb" strokeWidth="0.06" />
                  {/* Altura sen (Rojo) */}
                  <line x1={trigCos} y1="0" x2={trigCos} y2={-trigSin} stroke="#dc2626" strokeWidth="0.06" />
                  {/* Hipotenusa radio (Púrpura) */}
                  <line x1="0" y1="0" x2={trigCos} y2={-trigSin} stroke="#9333ea" strokeWidth="0.05" />

                  {/* Punto en la circunferencia */}
                  <circle cx={trigCos} cy={-trigSin} r="0.05" fill="#9333ea" />

                  {/* Etiquetas */}
                  <text x={trigCos / 2} y="0.15" textAnchor="middle" className="text-[0.1px] font-bold fill-blue-700">
                    cos θ
                  </text>
                  <text x={trigCos + (trigCos >= 0 ? 0.1 : -0.2)} y={-trigSin / 2} textAnchor="middle" className="text-[0.1px] font-bold fill-red-700">
                    sen θ
                  </text>
                </svg>

                <div className="flex items-center gap-4 text-xs font-bold mt-4">
                  <div className="flex items-center gap-1.5 text-blue-700">
                    <span className="w-3 h-3 rounded-full bg-blue-600" />
                    <span>Coseno (Eje X)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-red-600">
                    <span className="w-3 h-3 rounded-full bg-red-600" />
                    <span>Seno (Eje Y)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-purple-700">
                    <span className="w-3 h-3 rounded-full bg-purple-700" />
                    <span>Radio Vector r = 1</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3.3: Diagrama de Venn */}
          {lab3SubTab === 'VENN' && (
            <div className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-3xl space-y-4 max-w-xl mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 font-sans">
                  Operaciones Fundamentales entre Conjuntos A y B
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold">
                  Teoría de Conjuntos
                </span>
              </div>

              {/* Selector de Operación */}
              <div className="flex flex-wrap gap-1.5 justify-center">
                {[
                  { id: 'UNION', label: 'Unión (A ∪ B)' },
                  { id: 'INTER', label: 'Intersección (A ∩ B)' },
                  { id: 'DIFF_A', label: 'Diferencia (A ∖ B)' },
                  { id: 'DIFF_B', label: 'Diferencia (B ∖ A)' },
                  { id: 'SYM_DIFF', label: 'Diferencia Simétrica (A Δ B)' },
                ].map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setVennMode(op.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      vennMode === op.id
                        ? 'bg-purple-600 text-white shadow-soft-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>

              {/* Gráfico SVG de Venn */}
              <div className="flex justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <svg viewBox="0 0 240 140" className="w-72 h-44">
                  <defs>
                    <mask id="venn-mask-inter">
                      <circle cx="85" cy="70" r="50" fill="white" />
                    </mask>
                  </defs>

                  {/* Conjunto A */}
                  <circle
                    cx="85"
                    cy="70"
                    r="50"
                    fill={
                      vennMode === 'UNION' || vennMode === 'DIFF_A' || vennMode === 'SYM_DIFF'
                        ? '#c084fc'
                        : 'transparent'
                    }
                    stroke="#7e22ce"
                    strokeWidth="2.5"
                    opacity="0.75"
                  />

                  {/* Conjunto B */}
                  <circle
                    cx="155"
                    cy="70"
                    r="50"
                    fill={
                      vennMode === 'UNION' || vennMode === 'DIFF_B' || vennMode === 'SYM_DIFF'
                        ? '#a855f7'
                        : 'transparent'
                    }
                    stroke="#6b21a8"
                    strokeWidth="2.5"
                    opacity="0.75"
                  />

                  {/* Intersección resaltada */}
                  {(vennMode === 'INTER' || vennMode === 'UNION') && (
                    <circle
                      cx="155"
                      cy="70"
                      r="50"
                      fill="#0F52BA"
                      mask="url(#venn-mask-inter)"
                      opacity="0.85"
                    />
                  )}

                  <text x="50" y="75" className="text-sm font-bold fill-slate-800">
                    A
                  </text>
                  <text x="180" y="75" className="text-sm font-bold fill-slate-800">
                    B
                  </text>
                </svg>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* LAB 4: RETO UCV - EL PROBLEMA DE LA CAJA NEGRA (UA I) */}
      {/* ========================================================================= */}
      {activeLab === 'caja_negra' && (
        <div className="app-card p-6 sm:p-7 bg-white border border-slate-200/90 shadow-soft rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
            <div className="flex items-center gap-2.5">
              <Box className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Reto Didáctico Oficial: El Problema de la Caja Negra (UA I)
                </h3>
                <p className="text-xs text-slate-500">
                  Deduce la ley funcional f(x) realizando el menor número de experimentos de estímulo/respuesta.
                </p>
              </div>
            </div>
            {/* Selector de Dificultad / Modelo */}
            <div className="flex items-center gap-1.5">
              {BLACK_BOX_MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleSelectBbModel(m.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedBbId === m.id
                      ? 'bg-emerald-600 text-white shadow-soft-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {m.level.split(':')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Panel de Experimentación (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-emerald-800 font-mono block">
                  Enigma Activo: {currentBb.name}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">{currentBb.description}</p>
                <div className="text-[11px] text-emerald-900 font-semibold pt-1">
                  💡 Pistas de la Cátedra:
                  <ul className="list-disc list-inside mt-0.5 space-y-0.5 font-normal text-slate-600">
                    {currentBb.hints.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Introduce un valor experimental x:
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={bbInput}
                    onChange={(e) => setBbInput(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono font-bold"
                  />
                  <button
                    onClick={handleTestBlackBox}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shrink-0 transition-all active:scale-95 flex items-center gap-1.5 shadow-soft-xs"
                  >
                    <span>Medir Salida</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Registro de Mediciones */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    Bitácora Experimental ({bbHistory.length} ensayos):
                  </span>
                  <button
                    onClick={() =>
                      setBbHistory([
                        { input: 0, output: currentBb.func(0) },
                        { input: 1, output: currentBb.func(1) },
                      ])
                    }
                    className="text-[10px] text-slate-400 hover:text-slate-700 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reiniciar</span>
                  </button>
                </div>

                <div className="max-h-40 overflow-y-auto space-y-1 text-xs font-mono">
                  {bbHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between py-1 px-2 rounded-lg bg-white border border-slate-200/60 text-slate-600"
                    >
                      <span>Ensayo #{idx + 1}: x = {item.input}</span>
                      <strong className="text-emerald-800">f(x) = {item.output}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel de Deducción e Hipótesis (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Mini Gráfica SVG de Puntos Experimentales */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2">
                  Plano Cartesiano Empírico (Puntos Medidos vs Hipótesis)
                </span>
                <svg viewBox="-6 -10 12 20" className="w-full max-w-sm h-48 bg-white rounded-xl border border-slate-200">
                  {/* Ejes */}
                  <line x1="-5.5" y1="0" x2="5.5" y2="0" stroke="#94a3b8" strokeWidth="0.08" />
                  <line x1="0" y1="-9.5" x2="0" y2="9.5" stroke="#94a3b8" strokeWidth="0.08" />

                  {/* Puntos Medidos */}
                  {bbHistory.map((p, idx) => {
                    const cx = Math.max(-5, Math.min(5, p.input));
                    // Escalar salida verticalmente para que quepa en el viewBox
                    const cy = Math.max(-9, Math.min(9, -p.output * 0.8));
                    return (
                      <g key={idx}>
                        <circle cx={cx} cy={cy} r="0.25" fill="#059669" />
                        <text x={cx + 0.3} y={cy} className="text-[0.4px] fill-slate-500 font-mono">
                          ({p.input}, {p.output})
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Formulación de Hipótesis */}
              <div className="space-y-3 p-4 rounded-2xl bg-white border border-slate-200">
                <span className="text-xs font-bold text-slate-800 block">
                  Formula tu Postulado Funcional:
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ejemplo: 2x^2 - 3 o 3x - 5"
                    value={bbGuess}
                    onChange={(e) => setBbGuess(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleVerifyGuess}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-soft-xs shrink-0"
                  >
                    Contrastar
                  </button>
                </div>

                {bbVerdict && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 animate-fadeIn">
                    {bbVerdict}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setShowBbSecret(!showBbSecret)}
                    className="text-xs text-slate-400 hover:text-slate-600 font-semibold flex items-center gap-1"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>{showBbSecret ? 'Ocultar Deducción Teórica' : 'Ver Deducción Epistemológica'}</span>
                  </button>

                  {showBbSecret && (
                    <div
                      className="text-xs font-bold text-[#0F52BA]"
                      dangerouslySetInnerHTML={{
                        __html: renderLatexToHtml(`f(x) = ${currentBb.latexFormula}`, { displayMode: false }),
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LAB 5: RETO UCV - LA PREGUNTA INVERSA (UA III) */}
      {/* ========================================================================= */}
      {activeLab === 'pregunta_inversa' && (
        <div className="app-card p-6 sm:p-7 bg-white border border-slate-200/90 shadow-soft rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Dinámica Oficial: "La Pregunta Inversa" (UA III)
                </h3>
                <p className="text-xs text-slate-500">
                  Construye un enunciado científico en prosa donde la incógnita x represente una magnitud física real.
                </p>
              </div>
            </div>

            {/* Selector de Modelos Científicos */}
            <div className="flex items-center gap-1.5">
              {INVERSE_CASES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedInverseId(c.id);
                    setUserDraft('');
                    setFeedbackGiven(false);
                    setShowModelAnswer(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedInverseId === c.id
                      ? 'bg-amber-600 text-white shadow-soft-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c.title.split(':')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Tarjeta de Ecuación Modelo */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-800 font-mono block">
                Ecuación Modelo a Contextualizar:
              </span>
              <div
                className="text-lg font-bold text-slate-900 mt-0.5"
                dangerouslySetInnerHTML={{
                  __html: renderLatexToHtml(currentInverse.equationLatex, { displayMode: false }),
                }}
              />
            </div>
            <span className="text-xs text-amber-800 bg-white border border-amber-300 px-3 py-1.5 rounded-xl font-bold self-start sm:self-auto">
              Área: {currentInverse.scientificDomain}
            </span>
          </div>

          <p className="text-xs text-slate-600">{currentInverse.prompt}</p>

          {/* Área de Redacción del Estudiante */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 block">
              Tu Redacción en Prosa Científica:
            </label>
            <textarea
              rows={4}
              value={userDraft}
              onChange={(e) => setUserDraft(e.target.value)}
              placeholder="Ejemplo: Un proyectil es lanzado con velocidad inicial... Al cabo de cierto tiempo..."
              className="w-full p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-amber-500 bg-white"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setFeedbackGiven(true)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all active:scale-95 shadow-soft-xs"
              >
                Evaluar con Rúbrica Pedagógica UCV
              </button>

              <button
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1.5"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showModelAnswer ? 'Ocultar Enunciado Modelo' : 'Ver Enunciado Modelo de la Cátedra'}</span>
              </button>
            </div>

            {/* Rúbrica de Evaluación */}
            {feedbackGiven && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3 animate-fadeIn">
                <span className="text-xs font-bold text-amber-950 block">
                  ✓ Rúbrica Dimensional de Ciencias UCV:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {currentInverse.rubricPoints.map((pt, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-amber-200/80 space-y-1">
                      <span className="text-[11px] font-bold text-amber-900 block flex items-center gap-1">
                        <CheckCircleIcon className="w-3 h-3 text-emerald-600" />
                        <span>{pt.label}</span>
                      </span>
                      <p className="text-[11px] text-slate-600 leading-snug">{pt.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enunciado Modelo de la Cátedra */}
            {showModelAnswer && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 animate-fadeIn">
                <span className="text-[11px] font-mono uppercase font-bold text-slate-500 block">
                  Enunciado de Excelencia según el Curso Introductorio:
                </span>
                <p className="text-xs text-slate-800 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-200">
                  "{currentInverse.standardAnswer}"
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
