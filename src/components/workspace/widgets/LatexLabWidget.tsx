import React, { useState } from 'react';
import { VectorAndGraphInteractive } from '../../academic/VectorAndGraphInteractive';
import { renderLatex } from '../../../utils/latexRenderer';
import { AtomIcon, CopyIcon, CheckCircleIcon, SparklesIcon } from '../../common/Icons';
import { SANTIAGO_FORMULAS } from '../../../lib/mockData';

export const LatexLabWidget: React.FC = () => {
  const [customLatex, setCustomLatex] = useState<string>(
    '\\oint_{\\partial \\Sigma} \\vec{B} \\cdot d\\vec{\\ell} = \\mu_0 I_{\\text{enc}} + \\mu_0 \\varepsilon_0 \\frac{d\\Phi_E}{dt}'
  );
  const [copied, setCopied] = useState(false);

  const copyFormula = () => {
    navigator.clipboard.writeText(customLatex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-card p-6 bg-white border border-slate-200/80 shadow-soft space-y-5">
      {/* Cabecera */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <AtomIcon className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Laboratorio de Vectores & Playground KaTeX
            </h3>
            <p className="text-[11px] text-slate-500">
              Visualización interactiva en R² y renderizado formal de fórmulas en vivo
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold">
          KaTeX Live
        </span>
      </div>

      {/* Laboratorio Vectorial */}
      <VectorAndGraphInteractive />

      {/* Playground LaTeX */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-slate-800">Editor de Expresiones Matemáticas</p>
          <button
            onClick={copyFormula}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
          >
            {copied ? (
              <>
                <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-medium">Copiado</span>
              </>
            ) : (
              <>
                <CopyIcon className="w-3.5 h-3.5" />
                <span>Copiar LaTeX</span>
              </>
            )}
          </button>
        </div>

        {/* Fórmulas preestablecidas para carga rápida */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-slate-600 font-medium flex items-center gap-1 mr-1">
            <SparklesIcon className="w-3 h-3 text-blue-700" />
            Presets:
          </span>
          {SANTIAGO_FORMULAS.map((formula, idx) => (
            <button
              key={idx}
              onClick={() => setCustomLatex(formula.latex)}
              className="text-[10px] px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
              title={formula.description}
            >
              {formula.title.split(' ')[0]}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={customLatex}
          onChange={(e) => setCustomLatex(e.target.value)}
          className="input-clean font-mono text-xs w-full"
          placeholder="Escribe código LaTeX aquí..."
        />

        {/* Render en vivo */}
        <div className="p-4 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center min-h-[64px] overflow-x-auto shadow-soft-sm">
          <div
            className="text-sm font-serif text-slate-900 text-center"
            dangerouslySetInnerHTML={{ __html: renderLatex(customLatex, true) }}
          />
        </div>
      </div>
    </div>
  );
};
