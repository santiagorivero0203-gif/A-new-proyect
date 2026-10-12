import React, { useState } from 'react';
import { renderLatex } from '../../utils/latexRenderer';

export const VectorAndGraphInteractive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'VECTORS' | 'FUNCTIONS'>('VECTORS');

  // Estado para vectores 2D
  const [vectorU, setVectorU] = useState<{ x: number; y: number }>({ x: 3, y: 4 });
  const [vectorV, setVectorV] = useState<{ x: number; y: number }>({ x: -2, y: 3 });

  // Cálculos vectoriales
  const vectorSum = { x: vectorU.x + vectorV.x, y: vectorU.y + vectorV.y };
  const dotProduct = vectorU.x * vectorV.x + vectorU.y * vectorV.y;
  const magU = Math.sqrt(vectorU.x ** 2 + vectorU.y ** 2);
  const magV = Math.sqrt(vectorV.x ** 2 + vectorV.y ** 2);
  const angleRad = Math.acos(Math.max(-1, Math.min(1, dotProduct / (magU * magV || 1))));
  const angleDeg = (angleRad * 180) / Math.PI;

  // Estado para funciones matemáticas
  const [selectedFunc, setSelectedFunc] = useState<'cuadratica' | 'lineal' | 'seno' | 'cubica'>('cuadratica');

  // Mapeo coordenadas SVG (Centro en 200, 160; Escala: 20px por unidad)
  const originX = 200;
  const originY = 160;
  const scale = 22;

  const toSvgX = (x: number) => originX + x * scale;
  const toSvgY = (y: number) => originY - y * scale;

  // Generador de curva para funciones
  const generateFunctionPath = () => {
    const points: string[] = [];
    const step = 0.2;
    for (let x = -8; x <= 8; x += step) {
      let y = 0;
      switch (selectedFunc) {
        case 'cuadratica':
          y = 0.3 * (x ** 2) - 3;
          break;
        case 'lineal':
          y = 0.8 * x + 1;
          break;
        case 'seno':
          y = 2.5 * Math.sin(x);
          break;
        case 'cubica':
          y = 0.1 * (x ** 3) - x;
          break;
      }
      const sx = toSvgX(x);
      const sy = toSvgY(y);
      if (sy >= 10 && sy <= 310) {
        points.push(`${points.length === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
      }
    }
    return points.join(' ');
  };

  return (
    <div className="app-card p-6 space-y-6">
      {/* Selector de Herramienta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-display">
            Laboratorio Interactivo de Matemática: Vectores y Gráficas
          </h3>
          <p className="text-xs text-slate-500">
            Visualizador geométrico dinámico con cálculo de magnitudes, producto punto y funciones continuas
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('VECTORS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'VECTORS' ? 'bg-white text-slate-900 shadow-soft-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Vectores en el Plano
          </button>
          <button
            onClick={() => setActiveTab('FUNCTIONS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'FUNCTIONS' ? 'bg-white text-slate-900 shadow-soft-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Gráficas de Funciones f(x)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Plano Cartesiano SVG */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
          <svg viewBox="0 0 400 320" className="w-full max-w-[420px] h-auto select-none">
            {/* Cuadrícula Cartesiana */}
            {[-8, -6, -4, -2, 2, 4, 6, 8].map((val) => (
              <g key={`grid-x-${val}`}>
                <line
                  x1={toSvgX(val)}
                  y1={10}
                  x2={toSvgX(val)}
                  y2={310}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <text x={toSvgX(val)} y={originY + 12} fontSize="8" fill="#94a3b8" textAnchor="middle">
                  {val}
                </text>
              </g>
            ))}
            {[-6, -4, -2, 2, 4, 6].map((val) => (
              <g key={`grid-y-${val}`}>
                <line
                  x1={10}
                  y1={toSvgY(val)}
                  x2={390}
                  y2={toSvgY(val)}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <text x={originX - 10} y={toSvgY(val) + 3} fontSize="8" fill="#94a3b8" textAnchor="end">
                  {val}
                </text>
              </g>
            ))}

            {/* Ejes X e Y principales */}
            <line x1={10} y1={originY} x2={390} y2={originY} stroke="#64748b" strokeWidth="1.5" />
            <line x1={originX} y1={10} x2={originX} y2={310} stroke="#64748b" strokeWidth="1.5" />
            <polygon points="390,160 384,157 384,163" fill="#64748b" />
            <polygon points="200,10 197,16 203,16" fill="#64748b" />
            <text x="385" y="152" fontSize="9" fontWeight="bold" fill="#64748b">X</text>
            <text x="208" y="18" fontSize="9" fontWeight="bold" fill="#64748b">Y</text>

            {/* Marcador de origen (0,0) */}
            <circle cx={originX} cy={originY} r="3" fill="#0f172a" />

            {activeTab === 'VECTORS' ? (
              <>
                {/* Vector U (Azul) */}
                <line
                  x1={originX}
                  y1={originY}
                  x2={toSvgX(vectorU.x)}
                  y2={toSvgY(vectorU.y)}
                  stroke="#0071e3"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx={toSvgX(vectorU.x)} cy={toSvgY(vectorU.y)} r="4" fill="#0071e3" />
                <text
                  x={toSvgX(vectorU.x) + 6}
                  y={toSvgY(vectorU.y) - 6}
                  fontSize="10"
                  fontWeight="bold"
                  fill="#0071e3"
                >
                  u⃗ ({vectorU.x}, {vectorU.y})
                </text>

                {/* Vector V (Rojo / Frambuesa) */}
                <line
                  x1={originX}
                  y1={originY}
                  x2={toSvgX(vectorV.x)}
                  y2={toSvgY(vectorV.y)}
                  stroke="#e11d48"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx={toSvgX(vectorV.x)} cy={toSvgY(vectorV.y)} r="4" fill="#e11d48" />
                <text
                  x={toSvgX(vectorV.x) + 6}
                  y={toSvgY(vectorV.y) - 6}
                  fontSize="10"
                  fontWeight="bold"
                  fill="#e11d48"
                >
                  v⃗ ({vectorV.x}, {vectorV.y})
                </text>

                {/* Vector Suma Resultante (Verde punteado) */}
                <line
                  x1={originX}
                  y1={originY}
                  x2={toSvgX(vectorSum.x)}
                  y2={toSvgY(vectorSum.y)}
                  stroke="#059669"
                  strokeWidth="2"
                  strokeDasharray="4,3"
                />
                <circle cx={toSvgX(vectorSum.x)} cy={toSvgY(vectorSum.y)} r="3.5" fill="#059669" />
                <text
                  x={toSvgX(vectorSum.x) + 6}
                  y={toSvgY(vectorSum.y) - 6}
                  fontSize="9"
                  fontWeight="bold"
                  fill="#059669"
                >
                  (u⃗+v⃗) ({vectorSum.x}, {vectorSum.y})
                </text>
              </>
            ) : (
              /* Gráfica de Función */
              <path
                d={generateFunctionPath()}
                fill="none"
                stroke="#0071e3"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </div>

        {/* Panel de Controles & Cálculos */}
        <div className="lg:col-span-5 space-y-4">
          {activeTab === 'VECTORS' ? (
            <div className="space-y-4">
              {/* Controles para Vector U */}
              <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-700">Vector u⃗ (Azul)</span>
                  <span className="font-mono text-slate-600">({vectorU.x}, {vectorU.y})</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-500">Componente X: {vectorU.x}</label>
                    <input
                      type="range"
                      min="-7"
                      max="7"
                      value={vectorU.x}
                      onChange={(e) => setVectorU({ ...vectorU, x: parseInt(e.target.value) })}
                      className="w-full accent-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500">Componente Y: {vectorU.y}</label>
                    <input
                      type="range"
                      min="-6"
                      max="6"
                      value={vectorU.y}
                      onChange={(e) => setVectorU({ ...vectorU, y: parseInt(e.target.value) })}
                      className="w-full accent-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Controles para Vector V */}
              <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-700">Vector v⃗ (Rojo)</span>
                  <span className="font-mono text-slate-600">({vectorV.x}, {vectorV.y})</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-500">Componente X: {vectorV.x}</label>
                    <input
                      type="range"
                      min="-7"
                      max="7"
                      value={vectorV.x}
                      onChange={(e) => setVectorV({ ...vectorV, x: parseInt(e.target.value) })}
                      className="w-full accent-rose-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500">Componente Y: {vectorV.y}</label>
                    <input
                      type="range"
                      min="-6"
                      max="6"
                      value={vectorV.y}
                      onChange={(e) => setVectorV({ ...vectorV, y: parseInt(e.target.value) })}
                      className="w-full accent-rose-600"
                    />
                  </div>
                </div>
              </div>

              {/* Fórmulas y Resultados Vectoriales Renderizados con KaTeX */}
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Magnitud ||u⃗||:</span>
                  <span className="font-bold text-slate-800">{magU.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Magnitud ||v⃗||:</span>
                  <span className="font-bold text-slate-800">{magV.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-2">
                  <span className="text-slate-700 font-semibold">Producto Punto u⃗ · v⃗:</span>
                  <span className="font-bold text-blue-700">{dotProduct}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 font-semibold">Ángulo entre ellos θ:</span>
                  <span className="font-bold text-emerald-700">{angleDeg.toFixed(1)}°</span>
                </div>

                <div
                  className="mt-2 pt-2 border-t border-slate-200 text-center font-serif text-slate-800"
                  dangerouslySetInnerHTML={{
                    __html: renderLatex(
                      `\\vec{u} \\cdot \\vec{v} = ||\\vec{u}|| ||\\vec{v}|| \\cos(\\theta) = ${dotProduct}`,
                      false
                    ),
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Selección de Función */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">Seleccionar Tipo de Función:</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setSelectedFunc('cuadratica')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedFunc === 'cuadratica'
                        ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Parábola f(x) = 0.3x² - 3
                  </button>
                  <button
                    onClick={() => setSelectedFunc('seno')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedFunc === 'seno'
                        ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Onda Seno f(x) = 2.5 sin(x)
                  </button>
                  <button
                    onClick={() => setSelectedFunc('lineal')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedFunc === 'lineal'
                        ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Recta f(x) = 0.8x + 1
                  </button>
                  <button
                    onClick={() => setSelectedFunc('cubica')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedFunc === 'cubica'
                        ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Cúbica f(x) = 0.1x³ - x
                  </button>
                </div>
              </div>

              {/* Información Analítica de la Función */}
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2 text-xs text-slate-600">
                <p className="font-semibold text-slate-800">Propiedades de la Curva:</p>
                <p>• Dominio: ℝ (Todos los números reales)</p>
                <p>• Continuidad: Función diferenciable y suave</p>
                <div
                  className="mt-2 pt-2 border-t border-slate-200 text-center font-serif text-slate-900"
                  dangerouslySetInnerHTML={{
                    __html: renderLatex(
                      selectedFunc === 'cuadratica'
                        ? 'f(x) = ax^2 + bx + c \\implies \\frac{df}{dx} = 2ax + b'
                        : selectedFunc === 'seno'
                        ? 'f(x) = A\\sin(kx) \\implies \\frac{df}{dx} = Ak\\cos(kx)'
                        : 'f(x) = mx + b \\implies \\text{Pendiente } m = 0.8',
                      true
                    ),
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
