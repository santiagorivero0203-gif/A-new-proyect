/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - SOLUCIONADOR DETERMINISTA DE ECUACIONES
 * ==============================================================================
 * Componente: LinearEquationSolver.tsx
 * Propósito: Módulo determinista (0% alucinaciones) para resolución paso a paso
 * de sistemas de ecuaciones lineales 2x2 y 3x3.
 * 
 * Métodos implementados con desglose paso a paso:
 * 1. Método de Reducción (Suma y Resta)
 * 2. Método de Sustitución
 * 3. Método de Igualación
 * 4. Regla de Cramer (Determinantes 2x2 y 3x3 vía Regla de Sarrus)
 * 
 * Soporta aritmética fraccionaria exacta (MCD) y notación LaTeX vía KaTeX.
 * ==============================================================================
 */

import React, { useState } from 'react';
import {
  Calculator,
  CheckCircle2,
} from 'lucide-react';
import katex from 'katex';

// Utilidad matemática para aritmética de fracciones exactas
class Fraction {
  numerator: number;
  denominator: number;

  constructor(num: number, den: number = 1) {
    if (den === 0) throw new Error('División por cero en fracción.');
    if (den < 0) {
      num = -num;
      den = -den;
    }
    const g = Fraction.gcd(Math.abs(num), Math.abs(den));
    this.numerator = num / g;
    this.denominator = den / g;
  }

  static gcd(a: number, b: number): number {
    return b === 0 ? a : Fraction.gcd(b, a % b);
  }

  add(other: Fraction): Fraction {
    return new Fraction(
      this.numerator * other.denominator + other.numerator * this.denominator,
      this.denominator * other.denominator
    );
  }

  sub(other: Fraction): Fraction {
    return new Fraction(
      this.numerator * other.denominator - other.numerator * this.denominator,
      this.denominator * other.denominator
    );
  }

  mul(other: Fraction): Fraction {
    return new Fraction(this.numerator * other.numerator, this.denominator * other.denominator);
  }

  div(other: Fraction): Fraction {
    if (other.numerator === 0) throw new Error('División por cero');
    return new Fraction(this.numerator * other.denominator, this.denominator * other.numerator);
  }

  toLatex(): string {
    if (this.denominator === 1) return `${this.numerator}`;
    if (this.numerator < 0) return `-\\frac{${Math.abs(this.numerator)}}{${this.denominator}}`;
    return `\\frac{${this.numerator}}{${this.denominator}}`;
  }

  toNumber(): number {
    return this.numerator / this.denominator;
  }
}

type SolverMethod = 'REDUCCION' | 'SUSTITUCION' | 'IGUALACION' | 'CRAMER';

export const LinearEquationSolver: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [dimension, setDimension] = useState<2 | 3>(2);

  // Coeficientes para el sistema 2x2:
  // Ecuación 1: a1*x + b1*y = c1
  // Ecuación 2: a2*x + b2*y = c2
  const [a1, setA1] = useState<number>(2);
  const [b1, setB1] = useState<number>(1);
  const [c1, setC1] = useState<number>(5);

  const [a2, setA2] = useState<number>(1);
  const [b2, setB2] = useState<number>(-1);
  const [c2, setC2] = useState<number>(1);

  // Coeficientes adicionales para el sistema 3x3:
  // Eq 1: a1*x + b1*y + d1*z = c1
  // Eq 2: a2*x + b2*y + d2*z = c2
  // Eq 3: a3*x + b3*y + d3*z = c3
  const [d1, setD1] = useState<number>(1);
  const [d2, setD2] = useState<number>(-2);
  const [a3, setA3] = useState<number>(1);
  const [b3, setB3] = useState<number>(2);
  const [d3, setD3] = useState<number>(1);
  const [c3, setC3] = useState<number>(8);

  const [selectedMethod, setSelectedMethod] = useState<SolverMethod>('REDUCCION');

  // Renderizador seguro de fórmulas KaTeX
  const renderLatex = (formula: string): string => {
    try {
      return katex.renderToString(formula, { throwOnError: false, displayMode: false });
    } catch {
      return formula;
    }
  };

  // Cálculo determinista de determinante 3x3 (Regla de Sarrus)
  const det3x3 = (
    m11: number, m12: number, m13: number,
    m21: number, m22: number, m23: number,
    m31: number, m32: number, m33: number
  ) => {
    return (
      m11 * (m22 * m33 - m23 * m32) -
      m12 * (m21 * m33 - m23 * m31) +
      m13 * (m21 * m32 - m22 * m31)
    );
  };

  // Cálculo determinista según dimensión (2x2 o 3x3)
  const solveSystem = () => {
    if (dimension === 2) {
      const det = a1 * b2 - a2 * b1;
      if (det === 0) {
        const detX = c1 * b2 - c2 * b1;
        if (detX === 0) {
          return {
            type: 'INFINITAS',
            message: 'El sistema es compatible indeterminado: tiene infinitas soluciones.',
          };
        }
        return {
          type: 'INCOMPATIBLE',
          message: 'El sistema es incompatible: no tiene solución (las rectas son paralelas).',
        };
      }

      const detX = c1 * b2 - c2 * b1;
      const detY = a1 * c2 - a2 * c1;

      return {
        type: 'UNICAS',
        x: new Fraction(detX, det),
        y: new Fraction(detY, det),
        det,
        detX,
        detY,
      };
    } else {
      // Sistema 3x3 por Regla de Cramer (Matriz Sarrus)
      const det = det3x3(a1, b1, d1, a2, b2, d2, a3, b3, d3);
      if (det === 0) {
        return {
          type: 'INCOMPATIBLE',
          message: 'El determinante principal es cero (Δ = 0): el sistema 3x3 no tiene solución única.',
        };
      }

      const detX = det3x3(c1, b1, d1, c2, b2, d2, c3, b3, d3);
      const detY = det3x3(a1, c1, d1, a2, c2, d2, a3, c3, d3);
      const detZ = det3x3(a1, b1, c1, a2, b2, c2, a3, b3, c3);

      return {
        type: 'UNICAS',
        x: new Fraction(detX, det),
        y: new Fraction(detY, det),
        z: new Fraction(detZ, det),
        det,
        detX,
        detY,
        detZ,
      };
    }
  };

  const solution = solveSystem();

  // Generador de explicaciones paso a paso según el método escolar
  const getStepByStep = () => {
    if (solution.type !== 'UNICAS' || !solution.x || !solution.y) {
      return [];
    }

    const xLat = solution.x.toLatex();
    const yLat = solution.y.toLatex();
    const zLat = solution.z ? solution.z.toLatex() : '';

    if (dimension === 3) {
      return [
        {
          step: 1,
          title: 'Matriz Principal y Determinante del Sistema (Δ)',
          desc: 'Se construye la matriz 3×3 con los coeficientes de las variables x, y, z y se aplica la regla de Sarrus:',
          math: `\\Delta = \\begin{vmatrix} ${a1} & ${b1} & ${d1} \\\\ ${a2} & ${b2} & ${d2} \\\\ ${a3} & ${b3} & ${d3} \\end{vmatrix} = ${solution.det}`,
        },
        {
          step: 2,
          title: 'Determinantes de las Incógnitas (Δx, Δy, Δz)',
          desc: 'Se reemplaza sucesivamente la columna correspondiente por el vector de términos independientes (c1, c2, c3):',
          math: `\\Delta_x = ${solution.detX}, \\quad \\Delta_y = ${solution.detY}, \\quad \\Delta_z = ${solution.detZ}`,
        },
        {
          step: 3,
          title: 'Aplicación de la Regla de Cramer',
          desc: 'Se dividen los determinantes individuales entre el determinante principal del sistema:',
          math: `x = \\frac{\\Delta_x}{\\Delta} = ${xLat}, \\quad y = \\frac{\\Delta_y}{\\Delta} = ${yLat}, \\quad z = \\frac{\\Delta_z}{\\Delta} = ${zLat}`,
        },
        {
          step: 4,
          title: 'Solución Final en ℝ³',
          desc: 'El conjunto solución ordenado en el espacio tridimensional es:',
          math: `S = \\left\\{ \\left( ${xLat}, \\; ${yLat}, \\; ${zLat} \\right) \\right\\}`,
        },
      ];
    }

    // Pasos para sistemas 2x2:
    if (selectedMethod === 'REDUCCION') {
      const mult1 = Math.abs(b2);
      const mult2 = Math.abs(b1);
      const sign = (b1 * b2 > 0) ? -1 : 1;

      return [
        {
          step: 1,
          title: 'Igualar coeficientes de una variable (opuestos)',
          desc: `Multiplicamos la ecuación (1) por ${mult1} y la ecuación (2) por ${mult2 * (sign === -1 ? -1 : 1)} para que los coeficientes de y sean opuestos:`,
          math: `\\begin{cases} ${mult1}(${a1}x ${b1 >= 0 ? '+' : ''}${b1}y) = ${mult1}(${c1}) \\\\ ${sign === -1 ? -mult2 : mult2}(${a2}x ${b2 >= 0 ? '+' : ''}${b2}y) = ${sign === -1 ? -mult2 : mult2}(${c2}) \\end{cases}`,
        },
        {
          step: 2,
          title: 'Sumar las ecuaciones miembro a miembro',
          desc: 'Al sumar ambas ecuaciones, la variable y se elimina completamente:',
          math: `(${a1 * mult1 + a2 * (sign === -1 ? -mult2 : mult2)})x = ${c1 * mult1 + c2 * (sign === -1 ? -mult2 : mult2)} \\implies x = ${xLat}`,
        },
        {
          step: 3,
          title: 'Sustituir x en la primera ecuación para hallar y',
          desc: `Reemplazamos x = ${xLat} en la ecuación (1):`,
          math: `${a1}(${xLat}) ${b1 >= 0 ? '+' : ''}${b1}y = ${c1} \\implies y = ${yLat}`,
        },
        {
          step: 4,
          title: 'Solución Final del Sistema',
          desc: 'El conjunto solución ordenado es:',
          math: `S = \\left\\{ \\left( ${xLat}, ${yLat} \\right) \\right\\}`,
        },
      ];
    }

    if (selectedMethod === 'SUSTITUCION') {
      return [
        {
          step: 1,
          title: 'Despejar una incógnita en una de las ecuaciones',
          desc: 'Despejamos la variable y en la primera ecuación:',
          math: `y = \\frac{${c1} - (${a1}x)}{${b1}}`,
        },
        {
          step: 2,
          title: 'Sustituir la expresión en la segunda ecuación',
          desc: 'Reemplazamos el valor de y en la ecuación (2) para obtener una ecuación lineal de una sola incógnita:',
          math: `${a2}x + (${b2})\\left( \\frac{${c1} - (${a1}x)}{${b1}} \\right) = ${c2}`,
        },
        {
          step: 3,
          title: 'Resolver la ecuación de 1er grado para x',
          desc: 'Operando los términos semejantes y agrupando constantes:',
          math: `x = ${xLat}`,
        },
        {
          step: 4,
          title: 'Calcular el valor de y',
          desc: `Sustituimos x = ${xLat} en la expresión despejada de y:`,
          math: `y = ${yLat}`,
        },
      ];
    }

    if (selectedMethod === 'CRAMER') {
      return [
        {
          step: 1,
          title: 'Calcular el determinante principal (Δ)',
          desc: 'Matriz formada por los coeficientes de las variables x e y:',
          math: `\\Delta = \\begin{vmatrix} ${a1} & ${b1} \\\\ ${a2} & ${b2} \\end{vmatrix} = (${a1})(${b2}) - (${a2})(${b1}) = ${solution.det}`,
        },
        {
          step: 2,
          title: 'Calcular el determinante de x (Δx)',
          desc: 'Reemplazamos la columna de x por los términos independientes:',
          math: `\\Delta_x = \\begin{vmatrix} ${c1} & ${b1} \\\\ ${c2} & ${b2} \\end{vmatrix} = (${c1})(${b2}) - (${c2})(${b1}) = ${solution.detX}`,
        },
        {
          step: 3,
          title: 'Calcular el determinante de y (Δy)',
          desc: 'Reemplazamos la columna de y por los términos independientes:',
          math: `\\Delta_y = \\begin{vmatrix} ${a1} & ${c1} \\\\ ${a2} & ${c2} \\end{vmatrix} = (${a1})(${c2}) - (${a2})(${c1}) = ${solution.detY}`,
        },
        {
          step: 4,
          title: 'Calcular los valores de x e y',
          desc: 'Aplicamos la regla de Cramer: x = Δx / Δ  e  y = Δy / Δ:',
          math: `x = \\frac{${solution.detX}}{${solution.det}} = ${xLat}, \\quad y = \\frac{${solution.detY}}{${solution.det}} = ${yLat}`,
        },
      ];
    }

    // Método de Igualación
    return [
      {
        step: 1,
        title: 'Despejar la misma incógnita en ambas ecuaciones',
        desc: 'Despejamos la variable x en la ecuación (1) y en la ecuación (2):',
        math: `x = \\frac{${c1} - (${b1}y)}{${a1}}, \\quad x = \\frac{${c2} - (${b2}y)}{${a2}}`,
      },
      {
        step: 2,
        title: 'Igualar las dos expresiones resultantes',
        desc: 'Como ambas expresiones equivalen a x, las igualamos entre sí:',
        math: `\\frac{${c1} - (${b1}y)}{${a1}} = \\frac{${c2} - (${b2}y)}{${a2}}`,
      },
      {
        step: 3,
        title: 'Multiplicar en cruz y despejar y',
        desc: 'Eliminamos denominadores y resolvemos la ecuación resultante:',
        math: `y = ${yLat}`,
      },
      {
        step: 4,
        title: 'Sustituir y para calcular x',
        desc: `Reemplazamos y = ${yLat} en cualquiera de las ecuaciones despejadas:`,
        math: `x = ${xLat}`,
      },
    ];
  };

  const steps = getStepByStep();

  return (
    <div className={`app-card bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden ${className}`}>
      {/* Encabezado */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-700">
              Motor Determinista 100% Sin Alucinaciones
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#0F52BA]" />
            Solucionador Paso a Paso de Sistemas ({dimension}×{dimension})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Ingresa los coeficientes de tu sistema y observa la deducción detallada para contrastar tu cuaderno.
          </p>
        </div>

        {/* Toggle de Dimensión y Presets */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setDimension(2)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                dimension === 2 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sistema 2×2
            </button>
            <button
              onClick={() => {
                setDimension(3);
                setSelectedMethod('CRAMER');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                dimension === 3 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sistema 3×3
            </button>
          </div>

          {dimension === 2 && (
            <button
              onClick={() => {
                setA1(2); setB1(1); setC1(5);
                setA2(1); setB2(-1); setC2(1);
              }}
              className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
            >
              Ejemplo Andrés (2x+y=5)
            </button>
          )}
        </div>
      </div>

      {/* Formulario de Coeficientes */}
      <div className="p-6 bg-slate-50/60 border-b border-slate-100 space-y-4">
        {dimension === 2 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ecuación 1 */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                Ecuación 1: a₁x + b₁y = c₁
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={a1}
                  onChange={(e) => setA1(Number(e.target.value))}
                  className="w-16 px-2.5 py-1.5 border border-slate-200 rounded-lg text-center text-sm font-semibold focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA]"
                />
                <span className="font-serif font-bold text-slate-700">x +</span>
                <input
                  type="number"
                  value={b1}
                  onChange={(e) => setB1(Number(e.target.value))}
                  className="w-16 px-2.5 py-1.5 border border-slate-200 rounded-lg text-center text-sm font-semibold focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA]"
                />
                <span className="font-serif font-bold text-slate-700">y =</span>
                <input
                  type="number"
                  value={c1}
                  onChange={(e) => setC1(Number(e.target.value))}
                  className="w-20 px-2.5 py-1.5 border border-slate-200 rounded-lg text-center text-sm font-semibold focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA]"
                />
              </div>
            </div>

            {/* Ecuación 2 */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block">
                Ecuación 2: a₂x + b₂y = c₂
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={a2}
                  onChange={(e) => setA2(Number(e.target.value))}
                  className="w-16 px-2.5 py-1.5 border border-slate-200 rounded-lg text-center text-sm font-semibold focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA]"
                />
                <span className="font-serif font-bold text-slate-700">x +</span>
                <input
                  type="number"
                  value={b2}
                  onChange={(e) => setB2(Number(e.target.value))}
                  className="w-16 px-2.5 py-1.5 border border-slate-200 rounded-lg text-center text-sm font-semibold focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA]"
                />
                <span className="font-serif font-bold text-slate-700">y =</span>
                <input
                  type="number"
                  value={c2}
                  onChange={(e) => setC2(Number(e.target.value))}
                  className="w-20 px-2.5 py-1.5 border border-slate-200 rounded-lg text-center text-sm font-semibold focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA]"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Sistema 3x3 Formulario */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Eq 1 */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                Ecuación 1 (x, y, z)
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <input
                  type="number"
                  value={a1}
                  onChange={(e) => setA1(Number(e.target.value))}
                  className="w-12 px-1.5 py-1 border border-slate-200 rounded text-center"
                />
                <span>x+</span>
                <input
                  type="number"
                  value={b1}
                  onChange={(e) => setB1(Number(e.target.value))}
                  className="w-12 px-1.5 py-1 border border-slate-200 rounded text-center"
                />
                <span>y+</span>
                <input
                  type="number"
                  value={d1}
                  onChange={(e) => setD1(Number(e.target.value))}
                  className="w-12 px-1.5 py-1 border border-slate-200 rounded text-center"
                />
                <span>z=</span>
                <input
                  type="number"
                  value={c1}
                  onChange={(e) => setC1(Number(e.target.value))}
                  className="w-14 px-1.5 py-1 border border-slate-200 rounded text-center"
                />
              </div>
            </div>

            {/* Eq 2 */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block">
                Ecuación 2 (x, y, z)
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <input
                  type="number"
                  value={a2}
                  onChange={(e) => setA2(Number(e.target.value))}
                  className="w-12 px-1.5 py-1 border border-slate-200 rounded text-center"
                />
                <span>x+</span>
                <input
                  type="number"
                  value={b2}
                  onChange={(e) => setB2(Number(e.target.value))}
                  className="w-12 px-1.5 py-1 border border-slate-200 rounded text-center"
                />
                <span>y+</span>
                <input
                  type="number"
                  value={d2}
                  onChange={(e) => setD2(Number(e.target.value))}
                  className="w-12 px-1.5 py-1 border border-slate-200 rounded text-center"
                />
                <span>z=</span>
                <input
                  type="number"
                  value={c2}
                  onChange={(e) => setC2(Number(e.target.value))}
                  className="w-14 px-1.5 py-1 border border-slate-200 rounded text-center"
                />
              </div>
            </div>

            {/* Eq 3 */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                Ecuación 3 (x, y, z)
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <input
                  type="number"
                  value={a3}
                  onChange={(e) => setA3(Number(e.target.value))}
                  className="w-12 px-1.5 py-1 border border-slate-200 rounded text-center"
                />
                <span>x+</span>
                <input
                  type="number"
                  value={b3}
                  onChange={(e) => setB3(Number(e.target.value))}
                  className="w-12 px-1.5 py-1 border border-slate-200 rounded text-center"
                />
                <span>y+</span>
                <input
                  type="number"
                  value={d3}
                  onChange={(e) => setD3(Number(e.target.value))}
                  className="w-12 px-1.5 py-1 border border-slate-200 rounded text-center"
                />
                <span>z=</span>
                <input
                  type="number"
                  value={c3}
                  onChange={(e) => setC3(Number(e.target.value))}
                  className="w-14 px-1.5 py-1 border border-slate-200 rounded text-center"
                />
              </div>
            </div>
          </div>
        )}

        {/* Selector de Método de Resolución y Resultado Resumen */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          {dimension === 2 ? (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-slate-500 mr-1">Método:</span>
              {(['REDUCCION', 'SUSTITUCION', 'IGUALACION', 'CRAMER'] as SolverMethod[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMethod(m)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedMethod === m
                      ? 'bg-[#0F52BA] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {m === 'REDUCCION' ? 'Reducción (Suma/Resta)' : m.charAt(0) + m.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-xs text-slate-500 font-medium">
              Método activo: <span className="font-bold text-slate-800">Regla de Cramer con Determinantes 3×3 (Sarrus)</span>
            </div>
          )}

          {/* Resultado Resumen */}
          {solution.type === 'UNICAS' && solution.x && solution.y && (
            <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-sm font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                Solución:{' '}
                <span
                  dangerouslySetInnerHTML={{
                    __html: renderLatex(
                      dimension === 3 && solution.z
                        ? `x = ${solution.x.toLatex()}, \\; y = ${solution.y.toLatex()}, \\; z = ${solution.z.toLatex()}`
                        : `x = ${solution.x.toLatex()}, \\; y = ${solution.y.toLatex()}`
                    ),
                  }}
                />
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Visualización de Pasos */}
      <div className="p-6 space-y-4">
        {solution.type !== 'UNICAS' ? (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium">
            {solution.message}
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Desglose Deductivo Paso a Paso ({dimension === 3 ? 'Cramer 3×3' : selectedMethod})
            </h4>

            <div className="space-y-3">
              {steps.map((st) => (
                <div
                  key={st.step}
                  className="p-4 rounded-xl border border-slate-200/70 bg-white hover:border-slate-300 transition-all space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0F52BA] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {st.step}
                    </span>
                    <h5 className="text-sm font-bold text-slate-800">{st.title}</h5>
                  </div>
                  <p className="text-xs text-slate-600 pl-8 leading-relaxed">{st.desc}</p>
                  <div className="pl-8 pt-1">
                    <div
                      className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 font-mono text-sm overflow-x-auto text-slate-900"
                      dangerouslySetInnerHTML={{
                        __html: renderLatex(st.math),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinearEquationSolver;
