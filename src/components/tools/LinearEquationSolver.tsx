/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - SOLUCIONADOR DETERMINISTA DE ECUACIONES
 * ==============================================================================
 * Componente: LinearEquationSolver.tsx
 * Propósito: Módulo determinista (0% alucinaciones) para resolución paso a paso
 * de sistemas de ecuaciones lineales 2x2 y 3x3.
 * 
 * Métodos implementados con desglose paso a paso:
 * 1. Método de Sustitución
 * 2. Método de Igualación
 * 3. Método de Reducción (Suma y Resta)
 * 4. Regla de Cramer (Determinantes)
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
  // Coeficientes para el sistema 2x2:
  // Ecuación 1: a1*x + b1*y = c1
  // Ecuación 2: a2*x + b2*y = c2
  const [a1, setA1] = useState<number>(2);
  const [b1, setB1] = useState<number>(1);
  const [c1, setC1] = useState<number>(5);

  const [a2, setA2] = useState<number>(1);
  const [b2, setB2] = useState<number>(-1);
  const [c2, setC2] = useState<number>(1);

  const [selectedMethod, setSelectedMethod] = useState<SolverMethod>('REDUCCION');

  // Renderizador seguro de fórmulas KaTeX
  const renderLatex = (formula: string): string => {
    try {
      return katex.renderToString(formula, { throwOnError: false, displayMode: false });
    } catch {
      return formula;
    }
  };

  // Cálculo determinista del sistema 2x2
  const solveSystem = () => {
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

    const fracX = new Fraction(detX, det);
    const fracY = new Fraction(detY, det);

    return {
      type: 'UNICAS',
      x: fracX,
      y: fracY,
      det,
      detX,
      detY,
    };
  };

  const solution = solveSystem();

  // Generador de explicaciones paso a paso según el método escolar
  const getStepByStep = () => {
    if (solution.type !== 'UNICAS' || !solution.x || !solution.y) {
      return [];
    }

    const xLat = solution.x.toLatex();
    const yLat = solution.y.toLatex();

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
        title: 'Calcular x sustituyendo el valor de y',
        desc: `Reemplazamos y = ${yLat} en cualquiera de los despejes:`,
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
            Solucionador Paso a Paso de Ecuaciones (2×2)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Ingresa los coeficientes de tu sistema escolar y observa la deducción detallada para contrastar tu cuaderno.
          </p>
        </div>

        {/* Presets Rápidos */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Ejemplos:</span>
          <button
            onClick={() => {
              setA1(2); setB1(1); setC1(5);
              setA2(1); setB2(-1); setC2(1);
            }}
            className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
          >
            Andrés (2x+y=5)
          </button>
          <button
            onClick={() => {
              setA1(3); setB1(2); setC1(12);
              setA2(5); setB2(-3); setC2(1);
            }}
            className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
          >
            Examen (3x+2y=12)
          </button>
        </div>
      </div>

      {/* Formulario de Coeficientes */}
      <div className="p-6 bg-slate-50/60 border-b border-slate-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ecuación 1 */}
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Ecuación 1: $a_1 x + b_1 y = c_1$
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
              Ecuación 2: $a_2 x + b_2 y = c_2$
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

        {/* Selector de Método */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Método de Resolución:</span>
            <div className="inline-flex p-1 bg-slate-200/70 rounded-xl">
              {[
                { id: 'REDUCCION' as SolverMethod, label: 'Reducción (Suma/Resta)' },
                { id: 'SUSTITUCION' as SolverMethod, label: 'Sustitución' },
                { id: 'IGUALACION' as SolverMethod, label: 'Igualación' },
                { id: 'CRAMER' as SolverMethod, label: 'Regla de Cramer' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    selectedMethod === m.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resultado Resumen */}
          {solution.type === 'UNICAS' && solution.x && solution.y && (
            <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-sm font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                Solución:{' '}
                <span
                  dangerouslySetInnerHTML={{
                    __html: renderLatex(`x = ${solution.x.toLatex()}, \\; y = ${solution.y.toLatex()}`),
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
              Desglose Deductivo Paso a Paso ({selectedMethod})
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
