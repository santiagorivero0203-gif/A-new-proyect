/**
 * @file MendelianGeneticsSimulator.tsx
 * @description Simulador de Genética Mendeliana con cuadros de Punnett predictivos interactivos.
 * Soporta cruces monohíbridos (1 par de alelos: A/a) y dihíbridos (2 pares: A/a, B/b).
 * Calcula deterministamente frecuencias genotípicas, fenotípicas y proporciones porcentuales.
 * Función 114 del catálogo académico de ciencias.
 */

import React, { useState, useMemo } from 'react';
import { Dna, BookOpen, Layers } from 'lucide-react';

type CrossMode = 'monohybrid' | 'dihybrid';

interface TraitConfig {
  dominantSymbol: string;
  recessiveSymbol: string;
  dominantName: string;
  recessiveName: string;
}

export const MendelianGeneticsSimulator: React.FC = () => {
  const [crossMode, setCrossMode] = useState<CrossMode>('monohybrid');

  // Configuración Rasgo 1 (A/a)
  const [parent1A, setParent1A] = useState<'AA' | 'Aa' | 'aa'>('Aa');
  const [parent2A, setParent2A] = useState<'AA' | 'Aa' | 'aa'>('Aa');
  const traitA: TraitConfig = {
    dominantSymbol: 'A',
    recessiveSymbol: 'a',
    dominantName: 'Flores Púrpuras',
    recessiveName: 'Flores Blancas'
  };

  // Configuración Rasgo 2 para Dihíbrido (B/b)
  const [parent1B, setParent1B] = useState<'BB' | 'Bb' | 'bb'>('Bb');
  const [parent2B, setParent2B] = useState<'BB' | 'Bb' | 'bb'>('Bb');
  const traitB: TraitConfig = {
    dominantSymbol: 'B',
    recessiveSymbol: 'b',
    dominantName: 'Semilla Lisa',
    recessiveName: 'Semilla Rugosa'
  };

  // Separación de gametos para Monohíbrido
  const gametesMono = useMemo(() => {
    const g1 = [parent1A[0], parent1A[1]];
    const g2 = [parent2A[0], parent2A[1]];
    return { p1: g1, p2: g2 };
  }, [parent1A, parent2A]);

  // Separación de gametos para Dihíbrido (Ley de Segregación Independiente)
  const gametesDi = useMemo(() => {
    const getDiGametes = (a: string, b: string) => [
      `${a[0]}${b[0]}`,
      `${a[0]}${b[1]}`,
      `${a[1]}${b[0]}`,
      `${a[1]}${b[1]}`
    ];
    return {
      p1: getDiGametes(parent1A, parent1B),
      p2: getDiGametes(parent2A, parent2B)
    };
  }, [parent1A, parent2A, parent1B, parent2B]);

  // Resultados y estadísticas Monohíbrido
  const monoAnalysis = useMemo(() => {
    const cells: { g1: string; g2: string; genotype: string; phenotype: string }[] = [];
    const genotypeCounts: Record<string, number> = { AA: 0, Aa: 0, aa: 0 };
    let dominantCount = 0;
    let recessiveCount = 0;

    for (const g2 of gametesMono.p2) {
      for (const g1 of gametesMono.p1) {
        // Orden canónico: A mayúscula siempre primero
        const alleles = [g1, g2].sort();
        const genotype = alleles[0] === 'a' && alleles[1] === 'A' ? 'Aa' : alleles.join('');
        
        // Determinar fenotipo
        const isDominant = genotype.includes('A');
        const phenotype = isDominant ? traitA.dominantName : traitA.recessiveName;

        genotypeCounts[genotype] = (genotypeCounts[genotype] || 0) + 1;
        if (isDominant) dominantCount++;
        else recessiveCount++;

        cells.push({ g1, g2, genotype, phenotype });
      }
    }

    return {
      cells,
      genotypes: genotypeCounts,
      dominantCount,
      recessiveCount,
      total: 4
    };
  }, [gametesMono, traitA]);

  // Resultados y estadísticas Dihíbrido
  const diAnalysis = useMemo(() => {
    const cells: { g1: string; g2: string; genotype: string; phenotype: string }[] = [];
    const genotypeCounts: Record<string, number> = {};
    const phenotypeCounts: Record<string, number> = {};

    for (const g2 of gametesDi.p2) {
      for (const g1 of gametesDi.p1) {
        // Combinar alelos A con A y B con B (mayúsculas primero)
        const aAlleles = [g1[0], g2[0]].sort((x) => (x === 'A' ? -1 : 1)).join('');
        const bAlleles = [g1[1], g2[1]].sort((x) => (x === 'B' ? -1 : 1)).join('');
        const genotype = `${aAlleles}${bAlleles}`;

        // Determinar fenotipos conjuntos
        const phenoA = aAlleles.includes('A') ? traitA.dominantName : traitA.recessiveName;
        const phenoB = bAlleles.includes('B') ? traitB.dominantName : traitB.recessiveName;
        const combinedPheno = `${phenoA} + ${phenoB}`;

        genotypeCounts[genotype] = (genotypeCounts[genotype] || 0) + 1;
        phenotypeCounts[combinedPheno] = (phenotypeCounts[combinedPheno] || 0) + 1;

        cells.push({ g1, g2, genotype, phenotype: combinedPheno });
      }
    }

    return {
      cells,
      genotypes: genotypeCounts,
      phenotypes: phenotypeCounts,
      total: 16
    };
  }, [gametesDi, traitA, traitB]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
      {/* Header del Simulador */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-[#0F52BA] rounded-xl border border-blue-100/60 shadow-xs">
            <Dna className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 tracking-tight">
              Simulador de Genética Mendeliana
            </h3>
            <p className="text-xs text-slate-500">
              Cálculo estocástico y determinista de cruces mono/dihíbridos con Cuadro de Punnett
            </p>
          </div>
        </div>

        {/* Toggle de Modo Monohíbrido / Dihíbrido */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setCrossMode('monohybrid')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              crossMode === 'monohybrid'
                ? 'bg-white text-slate-800 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Monohíbrido (1 Par)
          </button>
          <button
            onClick={() => setCrossMode('dihybrid')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              crossMode === 'dihybrid'
                ? 'bg-white text-slate-800 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Dihíbrido (2 Pares)
          </button>
        </div>
      </div>

      {/* Selectores de Genotipo Parental */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Parental 1 */}
        <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Parental 1 (Óvulo / Gameto ♀)
            </span>
            <span className="text-xs text-blue-600 font-mono font-medium">
              {parent1A}{crossMode === 'dihybrid' ? parent1B : ''}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-medium text-slate-500">Alelos Gen A ({traitA.dominantName}):</label>
            <div className="grid grid-cols-3 gap-2">
              {(['AA', 'Aa', 'aa'] as const).map((g) => (
                <button
                  key={`p1-a-${g}`}
                  onClick={() => setParent1A(g)}
                  className={`py-1.5 text-xs font-mono font-medium rounded-lg border transition-all ${
                    parent1A === g
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {crossMode === 'dihybrid' && (
            <div className="space-y-2 pt-2 border-t border-slate-200/40">
              <label className="text-[11px] font-medium text-slate-500">Alelos Gen B ({traitB.dominantName}):</label>
              <div className="grid grid-cols-3 gap-2">
                {(['BB', 'Bb', 'bb'] as const).map((g) => (
                  <button
                    key={`p1-b-${g}`}
                    onClick={() => setParent1B(g)}
                    className={`py-1.5 text-xs font-mono font-medium rounded-lg border transition-all ${
                      parent1B === g
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Parental 2 */}
        <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Parental 2 (Polen / Gameto ♂)
            </span>
            <span className="text-xs text-blue-600 font-mono font-medium">
              {parent2A}{crossMode === 'dihybrid' ? parent2B : ''}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-medium text-slate-500">Alelos Gen A ({traitA.dominantName}):</label>
            <div className="grid grid-cols-3 gap-2">
              {(['AA', 'Aa', 'aa'] as const).map((g) => (
                <button
                  key={`p2-a-${g}`}
                  onClick={() => setParent2A(g)}
                  className={`py-1.5 text-xs font-mono font-medium rounded-lg border transition-all ${
                    parent2A === g
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {crossMode === 'dihybrid' && (
            <div className="space-y-2 pt-2 border-t border-slate-200/40">
              <label className="text-[11px] font-medium text-slate-500">Alelos Gen B ({traitB.dominantName}):</label>
              <div className="grid grid-cols-3 gap-2">
                {(['BB', 'Bb', 'bb'] as const).map((g) => (
                  <button
                    key={`p2-b-${g}`}
                    onClick={() => setParent2B(g)}
                    className={`py-1.5 text-xs font-mono font-medium rounded-lg border transition-all ${
                      parent2B === g
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cuadro de Punnett Visual */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-500" />
            Matriz de Punnett {crossMode === 'monohybrid' ? '(2 × 2)' : '(4 × 4)'}
          </span>
          <span className="text-[11px] text-slate-400">
            F1 / Generación Filial
          </span>
        </div>

        {crossMode === 'monohybrid' ? (
          /* Cuadro 2x2 */
          <div className="overflow-x-auto">
            <table className="w-full max-w-md mx-auto border-collapse text-center">
              <thead>
                <tr>
                  <th className="p-3 bg-slate-100 text-slate-400 text-xs font-mono rounded-tl-xl border border-slate-200">
                    ♀ \ ♂
                  </th>
                  {gametesMono.p1.map((g, i) => (
                    <th key={`head-${i}`} className="p-3 bg-blue-50/80 text-blue-700 font-mono text-sm font-semibold border border-slate-200">
                      {g}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gametesMono.p2.map((g2, rowIdx) => (
                  <tr key={`row-${rowIdx}`}>
                    <td className="p-3 bg-blue-50/80 text-blue-700 font-mono text-sm font-semibold border border-slate-200">
                      {g2}
                    </td>
                    {gametesMono.p1.map((_g1, colIdx) => {
                      const cellIdx = rowIdx * 2 + colIdx;
                      const cell = monoAnalysis.cells[cellIdx];
                      const isHomocygoteRec = cell?.genotype === 'aa';
                      return (
                        <td
                          key={`cell-${cellIdx}`}
                          className={`p-4 border border-slate-200 transition-colors ${
                            isHomocygoteRec ? 'bg-amber-50/50' : 'bg-slate-50/40'
                          }`}
                        >
                          <div className="font-mono text-base font-bold text-slate-800">
                            {cell?.genotype}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1 truncate max-w-[120px] mx-auto">
                            {cell?.phenotype}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Cuadro 4x4 */
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-center text-xs">
              <thead>
                <tr>
                  <th className="p-2.5 bg-slate-100 text-slate-400 font-mono rounded-tl-xl border border-slate-200">
                    ♀ \ ♂
                  </th>
                  {gametesDi.p1.map((g, i) => (
                    <th key={`head-di-${i}`} className="p-2.5 bg-blue-50/80 text-blue-700 font-mono font-semibold border border-slate-200">
                      {g}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gametesDi.p2.map((g2, rowIdx) => (
                  <tr key={`row-di-${rowIdx}`}>
                    <td className="p-2.5 bg-blue-50/80 text-blue-700 font-mono font-semibold border border-slate-200">
                      {g2}
                    </td>
                    {gametesDi.p1.map((_g1, colIdx) => {
                      const cellIdx = rowIdx * 4 + colIdx;
                      const cell = diAnalysis.cells[cellIdx];
                      return (
                        <td
                          key={`cell-di-${cellIdx}`}
                          className="p-2.5 border border-slate-200 bg-slate-50/30 hover:bg-blue-50/30 transition-colors"
                        >
                          <div className="font-mono font-bold text-slate-800">
                            {cell?.genotype}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Métricas y Frecuencias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Desglose Genotípico */}
        <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/60 space-y-2">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Proporciones Genotípicas
          </span>
          <div className="space-y-1.5">
            {crossMode === 'monohybrid' ? (
              Object.entries(monoAnalysis.genotypes).map(([genotype, count]) => {
                const pct = ((count / monoAnalysis.total) * 100).toFixed(1);
                return (
                  <div key={genotype} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                    <span className="font-mono font-semibold text-slate-700">{genotype}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">{count}/{monoAnalysis.total}</span>
                      <span className="font-semibold text-blue-600 w-12 text-right">{pct}%</span>
                    </div>
                  </div>
                );
              })
            ) : (
              Object.entries(diAnalysis.genotypes).map(([genotype, count]) => {
                const pct = ((count / diAnalysis.total) * 100).toFixed(1);
                return (
                  <div key={genotype} className="flex items-center justify-between text-[11px] py-0.5 border-b border-slate-100 last:border-0">
                    <span className="font-mono font-semibold text-slate-700">{genotype}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">{count}/{diAnalysis.total}</span>
                      <span className="font-semibold text-blue-600 w-10 text-right">{pct}%</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Desglose Fenotípico */}
        <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/60 space-y-2">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Proporciones Fenotípicas
          </span>
          <div className="space-y-1.5">
            {crossMode === 'monohybrid' ? (
              <>
                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                  <span className="text-slate-700">{traitA.dominantName} (Dominante)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{monoAnalysis.dominantCount}/{monoAnalysis.total}</span>
                    <span className="font-semibold text-blue-600 w-12 text-right">
                      {((monoAnalysis.dominantCount / monoAnalysis.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-slate-700">{traitA.recessiveName} (Recesivo)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{monoAnalysis.recessiveCount}/{monoAnalysis.total}</span>
                    <span className="font-semibold text-blue-600 w-12 text-right">
                      {((monoAnalysis.recessiveCount / monoAnalysis.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </>
            ) : (
              Object.entries(diAnalysis.phenotypes).map(([pheno, count]) => {
                const pct = ((count / diAnalysis.total) * 100).toFixed(1);
                return (
                  <div key={pheno} className="flex items-center justify-between text-[11px] py-1 border-b border-slate-100 last:border-0">
                    <span className="text-slate-700 truncate pr-2">{pheno}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-slate-500">{count}/{diAnalysis.total}</span>
                      <span className="font-semibold text-blue-600 w-10 text-right">{pct}%</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Nota Pedagógica / Leyes de Mendel */}
      <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start gap-2.5">
        <BookOpen className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-blue-900">Principio Genético: </strong>
          {crossMode === 'monohybrid'
            ? 'Primera y Segunda Ley de Mendel (Uniformidad y Segregación). Al cruzar dos heterocigotos (Aa × Aa), la proporción fenotípica esperada es 3:1 (75% dominante, 25% recesivo).'
            : 'Tercera Ley de Mendel (Transmisión Independiente). Al cruzar dos dihíbridos (AaBb × AaBb), la proporción clásica fenotípica de fenotipos combinados es 9:3:3:1.'}
        </p>
      </div>
    </div>
  );
};
