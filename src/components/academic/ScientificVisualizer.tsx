/**
 * @file ScientificVisualizer.tsx
 * @description Sistema de Visualización Científica Todo-en-Uno (React + KaTeX + SVG).
 * Integra sanitizador determinista contra errores de subíndices/superíndices en \text{},
 * soporte para Química Inorgánica (KaTeX + mhchem), Química Orgánica y
 * Física Clásica (Diagramas de Cuerpo Libre vectoriales interactivos).
 */

import React, { useMemo } from 'react';
import katex from 'katex';

/**
 * Sanitizador determinista que repara el bug de \text{X_{n}} -> \mathrm{X_{n}}
 * antes de que llegue a KaTeX, eliminando el fallo en rojo #cc0000.
 */
export function sanitizeScientificLatex(raw: string): string {
  if (!raw) return '';

  let cleaned = raw
    // 1. Elimina delimitadores envolventes $...$ o $$...$$ si vienen del LLM o inputs
    .replace(/^\$\$|\$\$$/g, '')
    .replace(/^\$|\$$/g, '')
    .trim();

  // 2. REPARACIÓN CRÍTICA: Convierte \text{..._...} o \text{...^...} en \mathrm{...}
  // Esto soluciona directamente el bug de \text{CH_{4}} en KaTeX
  cleaned = cleaned.replace(/\\text\{([^{}]*[_^][^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g, '\\mathrm{$1}');

  // 3. Si aún quedan \text{...} con subíndices anidados complejos, reemplaza \text{ por \mathrm{
  if (/\\text\{[^}]*[_^]/.test(cleaned)) {
    cleaned = cleaned.replace(/\\text\{/g, '\\mathrm{');
  }

  return cleaned;
}

export interface ForceVector {
  label: string; // Ej: "N", "mg", "F_r"
  angleDeg: number; // 0 = derecha, 90 = arriba, 180 = izquierda, 270 = abajo
  magnitude: number; // Escala relativa (1 a 100)
  color?: string;
}

export interface ScientificVisualProps {
  domain: 'inorganica' | 'organica' | 'fisica';
  latex: string; // Ecuación principal o fórmula
  organicStructure?: {
    iupacName: string;
    condensedFormula: string;
    svgPaths?: string;
    functionalGroup: string;
  };
  physicsDiagram?: {
    bodyLabel: string;
    inclineAngleDeg?: number;
    vectors: ForceVector[];
  };
  className?: string;
}

export const ScientificVisualizer: React.FC<ScientificVisualProps> = ({
  domain,
  latex,
  organicStructure,
  physicsDiagram,
  className = '',
}) => {
  const renderedHtml = useMemo(() => {
    const safeLatex = sanitizeScientificLatex(latex);
    return katex.renderToString(safeLatex, {
      displayMode: true,
      throwOnError: false,
      strict: false,
      trust: true,
    });
  }, [latex]);

  return (
    <div className={`rounded-2xl border border-slate-200 bg-slate-50/60 p-5 shadow-sm space-y-4 ${className}`}>
      {/* Cabecera dinámica según la rama científica */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide text-slate-600 uppercase">
          {domain === 'fisica'
            ? 'Modelo Matemático & Diagrama de Cuerpo Libre'
            : 'Ecuación Química Balanceada (Ley de Lavoisier)'}
        </span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-200 font-mono">
          {domain === 'inorganica' && 'Química Inorgánica'}
          {domain === 'organica' && 'Química Orgánica'}
          {domain === 'fisica' && 'Física Clásica'}
        </span>
      </div>

      {/* Renderizador KaTeX Blindado */}
      <div
        className="flex min-h-[72px] items-center justify-center rounded-xl bg-white px-6 py-4 text-lg text-slate-800 shadow-inner border border-slate-100 overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />

      {/* Vista suplementaria para Química Orgánica */}
      {domain === 'organica' && organicStructure && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 rounded-xl bg-white p-4 border border-slate-100 text-sm">
          <div>
            <span className="text-xs text-slate-400 block">Nomenclatura IUPAC</span>
            <strong className="text-slate-800">{organicStructure.iupacName}</strong>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Fórmula Semidesarrollada</span>
            <code className="text-indigo-600 font-semibold">{organicStructure.condensedFormula}</code>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Grupo Funcional</span>
            <span className="inline-block mt-0.5 rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800">
              {organicStructure.functionalGroup}
            </span>
          </div>
        </div>
      )}

      {/* Vista suplementaria para Física (Diagrama de Cuerpo Libre SVG automático) */}
      {domain === 'fisica' && physicsDiagram && (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white p-4 border border-slate-100">
          <svg viewBox="-140 -140 280 280" className="h-52 w-52 overflow-visible">
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor" />
              </marker>
            </defs>
            {/* Plano de referencia */}
            <line
              x1="-110"
              y1="0"
              x2="110"
              y2="0"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="4 4"
              transform={`rotate(${-(physicsDiagram.inclineAngleDeg || 0)})`}
            />
            {/* Masa central */}
            <rect
              x="-24"
              y="-24"
              width="48"
              height="48"
              rx="8"
              fill="#f8fafc"
              stroke="#334155"
              strokeWidth="2"
              transform={`rotate(${-(physicsDiagram.inclineAngleDeg || 0)})`}
            />
            <text x="0" y="5" textAnchor="middle" className="text-xs font-bold fill-slate-700">
              {physicsDiagram.bodyLabel}
            </text>
            {/* Vectores de fuerza */}
            {physicsDiagram.vectors.map((vec, i) => {
              const rad = (vec.angleDeg * Math.PI) / 180;
              const len = Math.max(40, Math.min(100, vec.magnitude));
              const x2 = Math.cos(rad) * len;
              const y2 = -Math.sin(rad) * len; // SVG Y crece hacia abajo
              const labelX = Math.cos(rad) * (len + 18);
              const labelY = -Math.sin(rad) * (len + 18);
              return (
                <g key={i} style={{ color: vec.color || '#2563eb' }}>
                  <line
                    x1="0"
                    y1="0"
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="2.5"
                    markerEnd="url(#arrow)"
                  />
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-bold fill-current"
                  >
                    {vec.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}
    </div>
  );
};
