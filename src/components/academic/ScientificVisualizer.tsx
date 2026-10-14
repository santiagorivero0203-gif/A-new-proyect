/**
 * @file ScientificVisualizer.tsx
 * @description Sistema de Visualización Científica Todo-en-Uno (React + KaTeX + SVG).
 * Soporta Química Inorgánica, Química Orgánica (IUPAC, semidesarrollada, hibridación)
 * y Física Clásica (Diagrama de Cuerpo Libre vectorial e interactivo en SVG).
 */

import React, { useMemo, useState } from 'react';
import { renderLatexToHtml, sanitizeLatex } from '../../utils/latexRenderer';

export { sanitizeLatex as sanitizeScientificLatex };

export interface PhysicsVector {
  id: string;
  label: string;       // Ej: "N", "mg", "F_{roz}", "T"
  angleDeg: number;    // Ángulo en grados (0 = +X, 90 = +Y, 180 = -X, 270 = -Y)
  magnitude: number;   // Valor numérico en N
  color?: string;
}

export interface OrganicCompoundData {
  iupacName: string;
  commonName?: string;
  semiDevelopedFormula: string; // Ej: "CH_3 - CH_2 - OH"
  molecularFormula: string;     // Ej: "C_2H_6O"
  functionalGroup: string;      // Ej: "Alcohol primario (-OH)"
  hybridization: string;        // Ej: "sp^3"
}

export interface ScientificExerciseProps {
  category: 'quimica_inorganica' | 'quimica_organica' | 'fisica';
  title: string;
  subtitle?: string;
  mainEquationLatex: string;
  steps?: { label: string; latex: string; note?: string }[];
  organicData?: OrganicCompoundData;
  physicsData?: {
    massKg: number;
    inclineDeg: number;
    vectors: PhysicsVector[];
  };
}

export const ScientificVisualizer: React.FC<ScientificExerciseProps> = ({
  category,
  title,
  subtitle,
  mainEquationLatex,
  steps = [],
  organicData,
  physicsData,
}) => {
  const [showSteps, setShowSteps] = useState(true);

  const mainHtml = useMemo(
    () => renderLatexToHtml(mainEquationLatex, { displayMode: true }),
    [mainEquationLatex]
  );

  const badgeConfig = {
    quimica_inorganica: { label: 'Química Inorgánica', classes: 'bg-teal-50 text-teal-700 border-teal-200' },
    quimica_organica: { label: 'Química Orgánica', classes: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    fisica: { label: 'Física & Mecánica', classes: 'bg-blue-50 text-blue-700 border-blue-200' },
  }[category];

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm transition-all">
      {/* Encabezado */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        <span className={`rounded-full border px-3 py-0.5 text-xs font-medium ${badgeConfig.classes}`}>
          {badgeConfig.label}
        </span>
      </div>

      {/* Caja Principal de Ecuación Renderizada */}
      <div
        className="flex min-h-[76px] items-center justify-center rounded-xl border border-slate-200/80 bg-white px-6 py-4 text-slate-900 shadow-inner overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: mainHtml }}
      />

      {/* Panel de Química Orgánica */}
      {category === 'quimica_organica' && organicData && (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4 rounded-xl border border-slate-200/70 bg-white p-4">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Nombre IUPAC</span>
            <p className="mt-0.5 text-sm font-bold text-slate-800">{organicData.iupacName}</p>
          </div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Fórmula Semidesarrollada</span>
            <div
              className="mt-0.5 text-sm font-semibold text-indigo-700"
              dangerouslySetInnerHTML={{
                __html: renderLatexToHtml(`\\mathrm{${organicData.semiDevelopedFormula}}`, { displayMode: false }),
              }}
            />
          </div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Grupo Funcional</span>
            <p className="mt-0.5 text-xs font-semibold text-amber-700 bg-amber-50 inline-block px-2 py-0.5 rounded border border-amber-200">
              {organicData.functionalGroup}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Hibridación</span>
            <div
              className="mt-0.5 text-sm font-semibold text-slate-700"
              dangerouslySetInnerHTML={{
                __html: renderLatexToHtml(`\\mathrm{${organicData.hybridization}}`, { displayMode: false }),
              }}
            />
          </div>
        </div>
      )}

      {/* Panel de Física: Diagrama de Cuerpo Libre Vectorial */}
      {category === 'fisica' && physicsData && (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 rounded-xl border border-slate-200/70 bg-white p-4 items-center">
          <div className="flex justify-center">
            <svg viewBox="-130 -130 260 260" className="h-48 w-48 overflow-visible">
              <defs>
                <marker id="vec-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor" />
                </marker>
              </defs>
              {/* Plano inclinado */}
              <line
                x1="-105" y1="0" x2="105" y2="0"
                stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 4"
                transform={`rotate(${-physicsData.inclineDeg})`}
              />
              {/* Bloque de masa m */}
              <g transform={`rotate(${-physicsData.inclineDeg})`}>
                <rect x="-22" y="-22" width="44" height="44" rx="6" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
                <text x="0" y="4" textAnchor="middle" className="text-[11px] font-bold fill-slate-700">
                  {physicsData.massKg} kg
                </text>
              </g>
              {/* Vectores de fuerza */}
              {physicsData.vectors.map((v) => {
                const rad = (v.angleDeg * Math.PI) / 180;
                const length = Math.min(95, Math.max(45, v.magnitude));
                const x2 = Math.cos(rad) * length;
                const y2 = -Math.sin(rad) * length;
                const lx = Math.cos(rad) * (length + 16);
                const ly = -Math.sin(rad) * (length + 16);
                return (
                  <g key={v.id} style={{ color: v.color || '#2563eb' }}>
                    <line x1="0" y1="0" x2={x2} y2={y2} stroke="currentColor" strokeWidth="2.5" markerEnd="url(#vec-arrow)" />
                    <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="text-xs font-bold fill-current">
                      {v.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="font-semibold text-slate-800 border-b pb-1">Descomposición de Fuerzas Actuantes</div>
            {physicsData.vectors.map((v) => (
              <div key={v.id} className="flex items-center justify-between py-1 border-b border-slate-100 tabular-nums">
                <span className="font-medium text-slate-700">{v.label} ({v.angleDeg}°)</span>
                <span className="font-bold text-slate-900">{v.magnitude.toFixed(2)} N</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resolución Paso a Paso desplegable */}
      {steps.length > 0 && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowSteps(!showSteps)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            {showSteps ? '▼ Ocultar desarrollo paso a paso' : '▶ Ver desarrollo paso a paso'}
          </button>
          {showSteps && (
            <div className="mt-2 space-y-2">
              {steps.map((s, idx) => (
                <div key={idx} className="rounded-lg bg-white p-3 border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-medium text-slate-600">
                    <strong className="text-slate-800">{idx + 1}.</strong> {s.label}
                  </span>
                  <div
                    className="text-sm overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderLatexToHtml(s.latex, { displayMode: false }) }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
