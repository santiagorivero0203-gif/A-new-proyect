/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - CALCULADORA VECTORIAL INTERACTIVA 2D / 3D
 * ==============================================================================
 * Componente: VectorCalculatorWidget.tsx
 * Función: Cálculo determinista y visualización en tiempo real de álgebra vectorial.
 * Operaciones:
 * - Magnitud o norma euclidiana ||u||
 * - Vector unitario normalizado û
 * - Producto escalar (punto) u · v y ángulo entre vectores en grados
 * - Producto vectorial (cruz) u × v (en 3D con determinantes i, j, k)
 * - Proyección ortogonal de u sobre v
 * Genera notación matemática KaTeX paso a paso sin decimales infinitos.
 * ==============================================================================
 */

import React, { useState } from 'react';
import {
  Compass,
} from 'lucide-react';
import katex from 'katex';

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export const VectorCalculatorWidget: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [dimension, setDimension] = useState<2 | 3>(3);

  // Vector u
  const [u, setU] = useState<Vector3D>({ x: 3, y: -2, z: 4 });
  // Vector v
  const [v, setV] = useState<Vector3D>({ x: 1, y: 5, z: -2 });

  // 1. Magnitud ||u|| y ||v||
  const magU = Math.sqrt(u.x ** 2 + u.y ** 2 + (dimension === 3 ? u.z ** 2 : 0));
  const magV = Math.sqrt(v.x ** 2 + v.y ** 2 + (dimension === 3 ? v.z ** 2 : 0));

  // 2. Producto Escalar (Dot Product)
  const dotProduct = u.x * v.x + u.y * v.y + (dimension === 3 ? u.z * v.z : 0);

  // 3. Ángulo entre u y v (grados)
  const cosTheta = magU > 0 && magV > 0 ? Math.max(-1, Math.min(1, dotProduct / (magU * magV))) : 0;
  const angleDegrees = (Math.acos(cosTheta) * (180 / Math.PI)).toFixed(2);

  // 4. Producto Vectorial (Cross Product) u x v
  const crossProduct: Vector3D = {
    x: u.y * v.z - u.z * v.y,
    y: -(u.x * v.z - u.z * v.x),
    z: u.x * v.y - u.y * v.x,
  };
  const magCross = Math.sqrt(crossProduct.x ** 2 + crossProduct.y ** 2 + crossProduct.z ** 2);

  // 5. Proyección de u sobre v: proj_v(u) = (u . v / ||v||^2) * v
  const projScalar = magV > 0 ? dotProduct / (magV ** 2) : 0;
  const projV = {
    x: (projScalar * v.x).toFixed(2),
    y: (projScalar * v.y).toFixed(2),
    z: (projScalar * v.z).toFixed(2),
  };

  const renderMath = (latexStr: string) => {
    try {
      return { __html: katex.renderToString(latexStr, { throwOnError: false }) };
    } catch {
      return { __html: latexStr };
    }
  };

  return (
    <div className={`app-card p-6 bg-white border border-slate-200/90 shadow-soft space-y-6 ${className}`}>
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0F52BA] border border-blue-100 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-sans">
              Calculadora de Álgebra Vectorial ℝ² / ℝ³
            </h3>
            <p className="text-xs text-slate-500">
              Operaciones de física analítica con magnitudes, producto punto, cruz y proyecciones ortogonales.
            </p>
          </div>
        </div>

        {/* Toggle de Dimensión */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold self-start">
          <button
            onClick={() => setDimension(2)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              dimension === 2 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Plano 2D (ℝ²)
          </button>
          <button
            onClick={() => setDimension(3)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              dimension === 3 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Espacio 3D (ℝ³)
          </button>
        </div>
      </div>

      {/* Inputs de Componentes Vectoriales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Vector u */}
        <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0F52BA] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0F52BA]" />
              Vector u (î, ĵ, k̂)
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              ||u|| = {magU.toFixed(3)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">X (î)</label>
              <input
                type="number"
                value={u.x}
                onChange={(e) => setU({ ...u, x: parseFloat(e.target.value) || 0 })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 text-center focus:border-[#0F52BA] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Y (ĵ)</label>
              <input
                type="number"
                value={u.y}
                onChange={(e) => setU({ ...u, y: parseFloat(e.target.value) || 0 })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 text-center focus:border-[#0F52BA] focus:outline-none"
              />
            </div>
            {dimension === 3 && (
              <div>
                <label className="text-[10px] font-semibold text-slate-500 block mb-1">Z (k̂)</label>
                <input
                  type="number"
                  value={u.z}
                  onChange={(e) => setU({ ...u, z: parseFloat(e.target.value) || 0 })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 text-center focus:border-[#0F52BA] focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Vector v */}
        <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              Vector v (î, ĵ, k̂)
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              ||v|| = {magV.toFixed(3)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">X (î)</label>
              <input
                type="number"
                value={v.x}
                onChange={(e) => setV({ ...v, x: parseFloat(e.target.value) || 0 })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 text-center focus:border-[#0F52BA] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Y (ĵ)</label>
              <input
                type="number"
                value={v.y}
                onChange={(e) => setV({ ...v, y: parseFloat(e.target.value) || 0 })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 text-center focus:border-[#0F52BA] focus:outline-none"
              />
            </div>
            {dimension === 3 && (
              <div>
                <label className="text-[10px] font-semibold text-slate-500 block mb-1">Z (k̂)</label>
                <input
                  type="number"
                  value={v.z}
                  onChange={(e) => setV({ ...v, z: parseFloat(e.target.value) || 0 })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 text-center focus:border-[#0F52BA] focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resultados de Operaciones en Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Producto Escalar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm space-y-1.5">
          <div className="text-[11px] font-bold text-slate-500">Producto Escalar (Punto)</div>
          <div className="text-xl font-bold font-mono text-slate-900">
            {dotProduct}
          </div>
          <div
            className="text-xs text-slate-500 font-serif pt-1"
            dangerouslySetInnerHTML={renderMath(`\\vec{u} \\cdot \\vec{v} = ${dotProduct}`)}
          />
        </div>

        {/* 2. Ángulo entre vectores */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm space-y-1.5">
          <div className="text-[11px] font-bold text-slate-500">Ángulo entre Vectores</div>
          <div className="text-xl font-bold font-mono text-[#0F52BA]">
            {angleDegrees}°
          </div>
          <div className="text-[11px] text-slate-500 font-medium pt-1">
            {parseFloat(angleDegrees) === 90
              ? 'Perpendiculares (Ortogonales)'
              : parseFloat(angleDegrees) < 90
              ? 'Ángulo agudo'
              : 'Ángulo obtuso'}
          </div>
        </div>

        {/* 3. Producto Vectorial (Solo 3D) */}
        {dimension === 3 ? (
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm space-y-1.5">
            <div className="text-[11px] font-bold text-slate-500">Producto Cruz (u × v)</div>
            <div className="text-sm font-bold font-mono text-slate-900 truncate">
              ({crossProduct.x}, {crossProduct.y}, {crossProduct.z})
            </div>
            <div className="text-[11px] font-mono text-slate-400 pt-1">
              Norma: {magCross.toFixed(2)}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm space-y-1.5">
            <div className="text-[11px] font-bold text-slate-500">Área del Paralelogramo</div>
            <div className="text-xl font-bold font-mono text-slate-900">
              {Math.abs(u.x * v.y - u.y * v.x).toFixed(2)}
            </div>
            <div className="text-[11px] text-slate-400 font-serif pt-1">
              |u_x v_y - u_y v_x|
            </div>
          </div>
        )}

        {/* 4. Proyección Ortogonal */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm space-y-1.5">
          <div className="text-[11px] font-bold text-slate-500">Proyección Ortogonal</div>
          <div className="text-sm font-bold font-mono text-slate-900 truncate">
            ({projV.x}, {projV.y}{dimension === 3 ? `, ${projV.z}` : ''})
          </div>
          <div className="text-[11px] text-slate-400 font-mono pt-1">
            Escalar: {projScalar.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Procedimiento Matemático Detallado KaTeX */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
        <span className="text-xs font-bold text-slate-800 block">
          Desarrollo Matemático Demostrativo
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Cálculo del producto punto */}
          <div className="p-3 bg-white rounded-xl border border-slate-200/70 space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-500">Fórmula de Producto Punto:</span>
            <div
              className="overflow-x-auto py-1"
              dangerouslySetInnerHTML={renderMath(
                dimension === 3
                  ? `\\vec{u} \\cdot \\vec{v} = (${u.x})(${v.x}) + (${u.y})(${v.y}) + (${u.z})(${v.z}) = ${dotProduct}`
                  : `\\vec{u} \\cdot \\vec{v} = (${u.x})(${v.x}) + (${u.y})(${v.y}) = ${dotProduct}`
              )}
            />
          </div>

          {/* Cálculo del ángulo */}
          <div className="p-3 bg-white rounded-xl border border-slate-200/70 space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-500">Fórmula de Ángulo $\\theta$:</span>
            <div
              className="overflow-x-auto py-1"
              dangerouslySetInnerHTML={renderMath(
                `\\cos(\\theta) = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\|\\vec{v}\\|} = \\frac{${dotProduct}}{(${magU.toFixed(2)})(${magV.toFixed(2)})} \\implies \\theta = ${angleDegrees}^\\circ`
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
