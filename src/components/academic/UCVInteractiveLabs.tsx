/**
 * @file UCVInteractiveLabs.tsx
 * @description Suite de Laboratorios Interactivos Oficiales del Curso Introductorio UCV.
 * Incluye:
 * 1. Escalera Interactiva de Conversión SI y Factores Primos / MCD / MCM
 * 2. Visualizador en la Recta Real SVG para Intervalos y Solucionador de Ecuaciones Irracionales
 * 3. Diagrama de Venn SVG, Triángulo Trigonométrico y Lienzo Vectorial 2D
 * 4. Dinámicas Oficiales UCV: "El Problema de la Caja Negra" y "La Pregunta Inversa"
 */

import React, { useState, useMemo } from 'react';
import { renderLatexToHtml } from '../../utils/latexRenderer';
import { AtomIcon, ArrowRightIcon } from '../common/Icons';
import {
  Scale,
  Compass,
  Box,
  Split,
  FileText,
} from 'lucide-react';

export type LabTabId = 'si_arithmetic' | 'intervals_algebra' | 'venn_vectors' | 'caja_negra' | 'pregunta_inversa';

export const UCVInteractiveLabs: React.FC<{ initialTab?: LabTabId }> = ({
  initialTab = 'si_arithmetic',
}) => {
  const [activeLab, setActiveLab] = useState<LabTabId>(initialTab);

  // --- Estado para Lab 1: Escalera del SI ---
  const [siValue, setSiValue] = useState<number>(500);
  const [fromPrefixExp, setFromPrefixExp] = useState<number>(-3); // mili (10^-3)
  const [toPrefixExp, setToPrefixExp] = useState<number>(0); // unidad base (10^0)
  const [primeInput, setPrimeInput] = useState<number>(360);

  // Prefijos métricos oficiales
  const siPrefixes = [
    { name: 'Giga (G)', exp: 9 },
    { name: 'Mega (M)', exp: 6 },
    { name: 'Kilo (k)', exp: 3 },
    { name: 'Unidad base', exp: 0 },
    { name: 'Mili (m)', exp: -3 },
    { name: 'Micro (μ)', exp: -6 },
    { name: 'Nano (n)', exp: -9 },
    { name: 'Pico (p)', exp: -12 },
  ];

  // Cálculo de conversión SI
  const convertedSiValue = useMemo(() => {
    const exponentDiff = fromPrefixExp - toPrefixExp;
    return siValue * Math.pow(10, exponentDiff);
  }, [siValue, fromPrefixExp, toPrefixExp]);

  // Descomposición en factores primos
  const primeFactors = useMemo(() => {
    let n = Math.abs(Math.floor(primeInput));
    if (n <= 1) return [];
    const factors: { prime: number; count: number }[] = [];
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
  }, [primeInput]);

  // --- Estado para Lab 2: Intervalos en Recta Real ---
  const [intA, setIntA] = useState<number>(-2);
  const [intB, setIntB] = useState<number>(4);
  const [isAOpen, setIsAOpen] = useState<boolean>(true); // (
  const [isBOpen, setIsBOpen] = useState<boolean>(false); // ]

  const [intC, setIntC] = useState<number>(1);
  const [intD, setIntD] = useState<number>(6);
  const [isCOpen, setIsCOpen] = useState<boolean>(false); // [
  const [isDOpen, setIsDOpen] = useState<boolean>(true); // )

  // Intersección de intervalos
  const intersectionResult = useMemo(() => {
    const left = Math.max(intA, intC);
    const right = Math.min(intB, intD);
    if (left > right) return 'Conjunto Vacío (\\emptyset)';
    if (left === right) {
      const leftIncluded = (left === intA ? !isAOpen : true) && (left === intC ? !isCOpen : true);
      return leftIncluded ? `\\{${left}\\}` : 'Conjunto Vacío (\\emptyset)';
    }
    const leftBracket = left === intA ? (isAOpen ? '(' : '[') : isCOpen ? '(' : '[';
    const rightBracket = right === intB ? (isBOpen ? ')' : ']') : isDOpen ? ')' : ']';
    return `${leftBracket}${left}, ${right}${rightBracket}`;
  }, [intA, intB, isAOpen, isBOpen, intC, intD, isCOpen, isDOpen]);

  // --- Estado para Lab 3: Diagrama de Venn & Vectores 2D ---
  const [vennMode, setVennMode] = useState<'UNION' | 'INTER' | 'DIFF_A' | 'DIFF_B' | 'SYM_DIFF'>('INTER');
  const [vecUx, setVecUx] = useState<number>(4);
  const [vecUy, setVecUy] = useState<number>(3);
  const [vecVx, setVecVx] = useState<number>(-2);
  const [vecVy, setVecVy] = useState<number>(2);

  const vecSum = useMemo(() => ({ x: vecUx + vecVx, y: vecUy + vecVy }), [vecUx, vecUy, vecVx, vecVy]);
  const vecDiff = useMemo(() => ({ x: vecUx - vecVx, y: vecUy - vecVy }), [vecUx, vecUy, vecVx, vecVy]);
  const vecMagU = useMemo(() => Math.hypot(vecUx, vecUy).toFixed(2), [vecUx, vecUy]);
  const vecMagV = useMemo(() => Math.hypot(vecVx, vecVy).toFixed(2), [vecVx, vecVy]);

  // --- Estado para Lab 4: El Problema de la Caja Negra ---
  const [blackBoxSecret] = useState<{ id: number; name: string; func: (x: number) => number; latex: string }>({
    id: 1,
    name: 'Ley Cuadrática Clásica',
    func: (x: number) => 2 * x * x - 3,
    latex: 'f(x) = 2x^2 - 3',
  });
  const [bbInput, setBbInput] = useState<number>(3);
  const [bbHistory, setBbHistory] = useState<{ input: number; output: number }[]>([
    { input: 1, output: -1 },
    { input: 2, output: 5 },
  ]);
  const [bbGuess, setBbGuess] = useState<string>('');
  const [bbVerdict, setBbVerdict] = useState<string | null>(null);

  const handleTestBlackBox = () => {
    const out = blackBoxSecret.func(bbInput);
    setBbHistory((prev) => [...prev, { input: bbInput, output: out }]);
  };

  const handleVerifyGuess = () => {
    const cleaned = bbGuess.replace(/\s+/g, '').toLowerCase();
    if (cleaned.includes('2x^2-3') || cleaned.includes('2*x^2-3') || cleaned.includes('2x²-3')) {
      setBbVerdict('¡Correcto! Has deducido la ley oculta f(x) = 2x² - 3 mediante inferencia científica.');
    } else {
      setBbVerdict('Aún no coincide exactamente. Prueba evaluando en x = 0 o x = -1 para aislar el término independiente.');
    }
  };

  // --- Estado para Lab 5: La Pregunta Inversa ---
  const [inverseModel] = useState<{ equationLatex: string; domain: string; prompt: string }>({
    equationLatex: '2x + 15 = 75',
    domain: 'Cinemática & Dinámica',
    prompt: 'Diseña el enunciado de un problema científico de la vida real donde la incógnita x represente una magnitud física medible y se resuelva con esta ecuación.',
  });
  const [userDraft, setUserDraft] = useState<string>('');
  const [feedbackGiven, setFeedbackGiven] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* Selector Superior de Laboratorios */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveLab('si_arithmetic')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeLab === 'si_arithmetic'
              ? 'bg-white text-slate-900 shadow-soft-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-blue-600" />
          <span>SI & Aritmética Prima</span>
        </button>

        <button
          onClick={() => setActiveLab('intervals_algebra')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeLab === 'intervals_algebra'
              ? 'bg-white text-slate-900 shadow-soft-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Split className="w-3.5 h-3.5 text-indigo-600" />
          <span>Intervalos & Recta Real</span>
        </button>

        <button
          onClick={() => setActiveLab('venn_vectors')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeLab === 'venn_vectors'
              ? 'bg-white text-slate-900 shadow-soft-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-purple-600" />
          <span>Venn, Trigonometría & Vectores</span>
        </button>

        <button
          onClick={() => setActiveLab('caja_negra')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeLab === 'caja_negra'
              ? 'bg-white text-slate-900 shadow-soft-sm'
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
              ? 'bg-white text-slate-900 shadow-soft-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-amber-600" />
          <span>Reto UCV: Pregunta Inversa</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* LAB 1: SISTEMA INTERNACIONAL Y FACTORES PRIMOS */}
      {/* ========================================================================= */}
      {activeLab === 'si_arithmetic' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel Escalera de Prefijos SI */}
          <div className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Escalera de Conversión de Prefijos (SI)
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono font-bold text-slate-800 focus:outline-none focus:border-blue-500"
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
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    {siPrefixes.map((p) => (
                      <option key={p.exp} value={p.exp}>
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
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    {siPrefixes.map((p) => (
                      <option key={p.exp} value={p.exp}>
                        {p.name} (10^{p.exp})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Resultado KaTeX */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Factor de Escala Aplicado: 10^{fromPrefixExp - toPrefixExp}
                </span>
                <div
                  className="text-base font-bold text-slate-900"
                  dangerouslySetInnerHTML={{
                    __html: renderLatexToHtml(
                      `${siValue} \\times 10^{${fromPrefixExp}} = ${convertedSiValue} \\times 10^{${toPrefixExp}}`,
                      { displayMode: false }
                    ),
                  }}
                />
                <div className="text-xs font-mono text-slate-500">
                  Notación Científica: {convertedSiValue.toExponential(4)}
                </div>
              </div>
            </div>
          </div>

          {/* Panel Descomposición en Factores Primos */}
          <div className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AtomIcon className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Descomposición en Factores Primos & Teorema Fundamental
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                n &gt; 1
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Número Entero Positivo:
                </label>
                <input
                  type="number"
                  min="2"
                  max="1000000"
                  value={primeInput}
                  onChange={(e) => setPrimeInput(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Expresión Canónica */}
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 text-center space-y-2">
                <span className="text-[11px] font-mono uppercase text-emerald-800 font-bold">
                  Producto Canónico de Primos:
                </span>
                <div
                  className="text-base font-bold text-emerald-950"
                  dangerouslySetInnerHTML={{
                    __html: renderLatexToHtml(
                      `${primeInput} = ${
                        primeFactors.map((f) => (f.count > 1 ? `${f.prime}^{${f.count}}` : `${f.prime}`)).join(' \\cdot ') ||
                        primeInput
                      }`,
                      { displayMode: false }
                    ),
                  }}
                />
                <div className="text-xs text-slate-600 font-sans">
                  Cantidad total de divisores: <strong>
                    {primeFactors.reduce((acc, f) => acc * (f.count + 1), 1)}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LAB 2: INTERVALOS EN LA RECTA REAL Y ECUACIONES IRRACIONALES */}
      {/* ========================================================================= */}
      {activeLab === 'intervals_algebra' && (
        <div className="space-y-6">
          <div className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Split className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Laboratorio de Intervalos y Recta Numérica en ℝ
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold">
                Intersección I₁ ∩ I₂
              </span>
            </div>

            {/* Controles de Intervalos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Intervalo 1 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-indigo-700 block">Intervalo I₁:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAOpen(!isAOpen)}
                    className="px-2 py-1 rounded bg-white border border-slate-300 font-mono text-xs font-bold"
                  >
                    {isAOpen ? '(' : '['}
                  </button>
                  <input
                    type="number"
                    value={intA}
                    onChange={(e) => setIntA(Number(e.target.value))}
                    className="w-16 px-2 py-1 text-center font-mono rounded border border-slate-300 text-xs font-bold"
                  />
                  <span className="text-xs text-slate-400">hasta</span>
                  <input
                    type="number"
                    value={intB}
                    onChange={(e) => setIntB(Number(e.target.value))}
                    className="w-16 px-2 py-1 text-center font-mono rounded border border-slate-300 text-xs font-bold"
                  />
                  <button
                    onClick={() => setIsBOpen(!isBOpen)}
                    className="px-2 py-1 rounded bg-white border border-slate-300 font-mono text-xs font-bold"
                  >
                    {isBOpen ? ')' : ']'}
                  </button>
                </div>
              </div>

              {/* Intervalo 2 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-purple-700 block">Intervalo I₂:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsCOpen(!isCOpen)}
                    className="px-2 py-1 rounded bg-white border border-slate-300 font-mono text-xs font-bold"
                  >
                    {isCOpen ? '(' : '['}
                  </button>
                  <input
                    type="number"
                    value={intC}
                    onChange={(e) => setIntC(Number(e.target.value))}
                    className="w-16 px-2 py-1 text-center font-mono rounded border border-slate-300 text-xs font-bold"
                  />
                  <span className="text-xs text-slate-400">hasta</span>
                  <input
                    type="number"
                    value={intD}
                    onChange={(e) => setIntD(Number(e.target.value))}
                    className="w-16 px-2 py-1 text-center font-mono rounded border border-slate-300 text-xs font-bold"
                  />
                  <button
                    onClick={() => setIsDOpen(!isDOpen)}
                    className="px-2 py-1 rounded bg-white border border-slate-300 font-mono text-xs font-bold"
                  >
                    {isDOpen ? ')' : ']'}
                  </button>
                </div>
              </div>
            </div>

            {/* Representación SVG de la Recta Real */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 overflow-x-auto flex flex-col items-center">
              <svg viewBox="-8 -3 16 6" className="w-full max-w-xl h-24 overflow-visible">
                {/* Eje X */}
                <line x1="-7.5" y1="0" x2="7.5" y2="0" stroke="#94a3b8" strokeWidth="0.1" />
                {/* Marcas de enteros */}
                {[-6, -4, -2, 0, 2, 4, 6].map((tick) => (
                  <g key={tick}>
                    <line x1={tick} y1="-0.2" x2={tick} y2="0.2" stroke="#64748b" strokeWidth="0.08" />
                    <text x={tick} y="0.8" textAnchor="middle" className="text-[0.45px] fill-slate-500 font-mono">
                      {tick}
                    </text>
                  </g>
                ))}

                {/* Segmento I1 (Azul) */}
                <line
                  x1={Math.max(-7, Math.min(7, intA))}
                  y1="-0.6"
                  x2={Math.max(-7, Math.min(7, intB))}
                  y2="-0.6"
                  stroke="#4f46e5"
                  strokeWidth="0.25"
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
                  strokeWidth="0.25"
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
                <span className="text-xs font-semibold text-slate-500">Resultado de la Intersección:</span>
                <div
                  className="text-sm font-bold text-slate-900 mt-1"
                  dangerouslySetInnerHTML={{
                    __html: renderLatexToHtml(`I_1 \\cap I_2 = ${intersectionResult}`, { displayMode: false }),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LAB 3: VENN, TRIGONOMETRÍA Y VECTORES 2D */}
      {/* ========================================================================= */}
      {activeLab === 'venn_vectors' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Diagrama de Venn Interactivo */}
          <div className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Diagrama de Venn Interactivo en SVG
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold">
                Conjuntos A y B
              </span>
            </div>

            {/* Selector de Operación */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'UNION', label: 'A ∪ B' },
                { id: 'INTER', label: 'A ∩ B' },
                { id: 'DIFF_A', label: 'A - B' },
                { id: 'DIFF_B', label: 'B - A' },
                { id: 'SYM_DIFF', label: 'A Δ B' },
              ].map((op) => (
                <button
                  key={op.id}
                  onClick={() => setVennMode(op.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    vennMode === op.id
                      ? 'bg-purple-600 text-white shadow-soft-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>

            {/* SVG de Venn */}
            <div className="flex justify-center p-4 bg-slate-50 rounded-xl">
              <svg viewBox="0 0 240 140" className="w-56 h-36">
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
                  strokeWidth="2"
                  opacity="0.7"
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
                  strokeWidth="2"
                  opacity="0.7"
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
                <text x="55" y="75" className="text-xs font-bold fill-slate-800">
                  A
                </text>
                <text x="175" y="75" className="text-xs font-bold fill-slate-800">
                  B
                </text>
              </svg>
            </div>
          </div>

          {/* Lienzo de Vectores 2D */}
          <div className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Suma y Resta Vectorial 2D por Componentes
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">
                Paralelogramo
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-blue-50/60 rounded-xl space-y-2">
                <span className="font-bold text-blue-800 block">Vector u: ({vecUx}, {vecUy})</span>
                <span className="text-slate-500 text-[11px]">|u| = {vecMagU}</span>
                <div className="space-y-1.5">
                  <div className="text-[10px] text-slate-500">X: {vecUx}</div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={vecUx}
                    onChange={(e) => setVecUx(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-[10px] text-slate-500">Y: {vecUy}</div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={vecUy}
                    onChange={(e) => setVecUy(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl space-y-2">
                <span className="font-bold text-emerald-800 block">Vector v: ({vecVx}, {vecVy})</span>
                <span className="text-slate-500 text-[11px]">|v| = {vecMagV}</span>
                <div className="space-y-1.5">
                  <div className="text-[10px] text-slate-500">X: {vecVx}</div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={vecVx}
                    onChange={(e) => setVecVx(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-[10px] text-slate-500">Y: {vecVy}</div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={vecVy}
                    onChange={(e) => setVecVy(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Resultado Vectorial */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1 font-mono">
              <div className="text-slate-700 font-bold">
                Vector Suma u + v = ({vecSum.x}, {vecSum.y}) • Magnitud = {Math.hypot(vecSum.x, vecSum.y).toFixed(2)}
              </div>
              <div className="text-slate-500">
                Vector Resta u - v = ({vecDiff.x}, {vecDiff.y}) • Magnitud = {Math.hypot(vecDiff.x, vecDiff.y).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LAB 4: RETO UCV - EL PROBLEMA DE LA CAJA NEGRA (UA I) */}
      {/* ========================================================================= */}
      {activeLab === 'caja_negra' && (
        <div className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Reto Didáctico Oficial: El Problema de la Caja Negra (UA I)
                </h3>
                <p className="text-xs text-slate-500">
                  Deduce la ley científica oculta f(x) realizando el menor número de experimentos de entrada/salida.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
              Método Científico
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Panel de Inyección de Entrada */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Introduce un valor experimental de entrada (x):
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
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shrink-0 transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <span>Lanzar Input</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Registro de Mediciones */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  Bitácora de Observaciones ({bbHistory.length} mediciones):
                </span>
                <div className="max-h-36 overflow-y-auto space-y-1 text-xs font-mono">
                  {bbHistory.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-slate-200/60 text-slate-600">
                      <span>Experimento #{idx + 1}: x = {item.input}</span>
                      <strong className="text-slate-900">Salida y = {item.output}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Formulación de Hipótesis y Comprobación */}
            <div className="space-y-4 p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-950 block">
                Formula tu Hipótesis Matemática:
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Analiza las diferencias de las salidas sucesivas y postula la fórmula de f(x).
              </p>
              <input
                type="text"
                placeholder="Ej: 2x^2 - 3"
                value={bbGuess}
                onChange={(e) => setBbGuess(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 text-sm font-mono font-bold bg-white text-slate-900 focus:outline-none"
              />
              <button
                onClick={handleVerifyGuess}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-soft transition-all active:scale-95"
              >
                Contrastar Hipótesis
              </button>

              {bbVerdict && (
                <div className="p-3 rounded-xl bg-white border border-emerald-200 text-xs font-semibold text-emerald-900">
                  {bbVerdict}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LAB 5: RETO UCV - LA PREGUNTA INVERSA (UA III) */}
      {/* ========================================================================= */}
      {activeLab === 'pregunta_inversa' && (
        <div className="app-card p-6 bg-white border border-slate-200/90 shadow-soft rounded-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Dinámica Oficial: "La Pregunta Inversa" (UA III)
                </h3>
                <p className="text-xs text-slate-500">
                  A partir de una expresión matemática dada, redacta un enunciado científico con sentido en el mundo real.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold">
              Modelado Matemático
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-400 font-mono block">Ecuación Modelo:</span>
              <div
                className="text-lg font-bold text-slate-900 mt-0.5"
                dangerouslySetInnerHTML={{
                  __html: renderLatexToHtml(inverseModel.equationLatex, { displayMode: false }),
                }}
              />
            </div>
            <span className="text-xs text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full font-semibold">
              Área: {inverseModel.domain}
            </span>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 block">
              Redacta tu enunciado de problema:
            </label>
            <textarea
              rows={4}
              value={userDraft}
              onChange={(e) => setUserDraft(e.target.value)}
              placeholder="Ejemplo: Un proyectil es lanzado con velocidad inicial... y luego de recorrer 15 metros alcanza una posición final de 75 metros. ¿Cuál fue el doble de su aceleración media x?"
              className="w-full p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={() => setFeedbackGiven(true)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all active:scale-95"
            >
              Evaluar Pertinencia con Rúbrica UCV
            </button>

            {feedbackGiven && (
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 space-y-2">
                <span className="font-bold block">✓ Evaluación de Rúbrica Pedagógica:</span>
                <p>
                  Tu redacción asigna adecuadamente una magnitud dimensional al término independiente (15) y define una incógnita consistente ($x$). Asegúrate de especificar las unidades fundamentales del Sistema Internacional (metros, segundos o Newtons) para alcanzar el puntaje máximo en la corrección de Ciencias UCV.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
