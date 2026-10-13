import React, { useState } from 'react';
import { ScientificCalculator } from '../../dashboards/ScientificCalculator';
import { PHYSICS_CONSTANTS } from '../../../lib/mockData';
import { renderLatex } from '../../../utils/latexRenderer';
import { CalculatorIcon, CopyIcon, CheckCircleIcon } from '../../common/Icons';

export const CalculatorWidget: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="app-card p-6 bg-white border border-slate-200/80 shadow-soft space-y-5">
      {/* Cabecera */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <CalculatorIcon className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Calculadora Científica & Constantes
            </h3>
            <p className="text-[11px] text-slate-500">
              Operaciones trigonométricas, algebraicas y prontuario físico
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
          Alta Precisión
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Calculadora */}
        <div className="md:col-span-7">
          <ScientificCalculator isEmbedded={true} />
        </div>

        {/* Constantes Rápidas */}
        <div className="md:col-span-5 space-y-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Constantes Físicas CODATA
          </p>
          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {PHYSICS_CONSTANTS.map((c, i) => (
              <div
                key={i}
                className="p-2.5 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between gap-2"
              >
                <div>
                  <p className="text-[11px] font-semibold text-slate-800">{c.name}</p>
                  <div
                    className="text-[10px] text-slate-600 font-serif"
                    dangerouslySetInnerHTML={{ __html: renderLatex(c.latex, false) }}
                  />
                </div>
                <button
                  onClick={() => copyToClipboard(c.value, `calc-const-${i}`)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors shrink-0"
                  title="Copiar valor"
                >
                  {copiedKey === `calc-const-${i}` ? (
                    <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <CopyIcon className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
