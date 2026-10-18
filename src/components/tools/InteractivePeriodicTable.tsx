/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - TABLA PERIÓDICA INTERACTIVA DE ELEMENTOS
 * ==============================================================================
 * Componente: InteractivePeriodicTable.tsx (Función 112)
 * Propósito: Explorador interactivo de los elementos químicos para bachillerato y ciencias.
 * Proporciona:
 * - Número atómico (Z), masa atómica, símbolo y configuración electrónica.
 * - Electronegatividad de Pauling y radio atómico (pm).
 * - Clasificación por grupos (Metales alcalinos, transición, no metales, gases nobles).
 * - Búsqueda rápida por nombre o símbolo.
 * ==============================================================================
 */

import React, { useState } from 'react';
import {
  Atom,
  Search,
} from 'lucide-react';

export interface ChemicalElement {
  z: number;
  symbol: string;
  name: string;
  mass: number;
  category: 'alcalino' | 'alcalinoterreo' | 'transicion' | 'post-transicion' | 'no-metal' | 'gas-noble' | 'halogeno' | 'metaloide';
  electronegativity: number | null;
  electronConfig: string;
  atomicRadiusPm: number;
  row: number;
  col: number;
}

const PERIODIC_ELEMENTS: ChemicalElement[] = [
  // Periodo 1
  { z: 1, symbol: 'H', name: 'Hidrógeno', mass: 1.008, category: 'no-metal', electronegativity: 2.20, electronConfig: '1s¹', atomicRadiusPm: 53, row: 1, col: 1 },
  { z: 2, symbol: 'He', name: 'Helio', mass: 4.0026, category: 'gas-noble', electronegativity: null, electronConfig: '1s²', atomicRadiusPm: 31, row: 1, col: 18 },

  // Periodo 2
  { z: 3, symbol: 'Li', name: 'Litio', mass: 6.94, category: 'alcalino', electronegativity: 0.98, electronConfig: '[He] 2s¹', atomicRadiusPm: 167, row: 2, col: 1 },
  { z: 4, symbol: 'Be', name: 'Berilio', mass: 9.0122, category: 'alcalinoterreo', electronegativity: 1.57, electronConfig: '[He] 2s²', atomicRadiusPm: 112, row: 2, col: 2 },
  { z: 5, symbol: 'B', name: 'Boro', mass: 10.81, category: 'metaloide', electronegativity: 2.04, electronConfig: '[He] 2s² 2p¹', atomicRadiusPm: 87, row: 2, col: 13 },
  { z: 6, symbol: 'C', name: 'Carbono', mass: 12.011, category: 'no-metal', electronegativity: 2.55, electronConfig: '[He] 2s² 2p²', atomicRadiusPm: 67, row: 2, col: 14 },
  { z: 7, symbol: 'N', name: 'Nitrógeno', mass: 14.007, category: 'no-metal', electronegativity: 3.04, electronConfig: '[He] 2s² 2p³', atomicRadiusPm: 56, row: 2, col: 15 },
  { z: 8, symbol: 'O', name: 'Oxígeno', mass: 15.999, category: 'no-metal', electronegativity: 3.44, electronConfig: '[He] 2s² 2p⁴', atomicRadiusPm: 48, row: 2, col: 16 },
  { z: 9, symbol: 'F', name: 'Flúor', mass: 18.998, category: 'halogeno', electronegativity: 3.98, electronConfig: '[He] 2s² 2p⁵', atomicRadiusPm: 42, row: 2, col: 17 },
  { z: 10, symbol: 'Ne', name: 'Neón', mass: 20.180, category: 'gas-noble', electronegativity: null, electronConfig: '[He] 2s² 2p⁶', atomicRadiusPm: 38, row: 2, col: 18 },

  // Periodo 3
  { z: 11, symbol: 'Na', name: 'Sodio', mass: 22.990, category: 'alcalino', electronegativity: 0.93, electronConfig: '[Ne] 3s¹', atomicRadiusPm: 190, row: 3, col: 1 },
  { z: 12, symbol: 'Mg', name: 'Magnesio', mass: 24.305, category: 'alcalinoterreo', electronegativity: 1.31, electronConfig: '[Ne] 3s²', atomicRadiusPm: 145, row: 3, col: 2 },
  { z: 13, symbol: 'Al', name: 'Aluminio', mass: 26.982, category: 'post-transicion', electronegativity: 1.61, electronConfig: '[Ne] 3s² 3p¹', atomicRadiusPm: 118, row: 3, col: 13 },
  { z: 14, symbol: 'Si', name: 'Silicio', mass: 28.085, category: 'metaloide', electronegativity: 1.90, electronConfig: '[Ne] 3s² 3p²', atomicRadiusPm: 111, row: 3, col: 14 },
  { z: 15, symbol: 'P', name: 'Fósforo', mass: 30.974, category: 'no-metal', electronegativity: 2.19, electronConfig: '[Ne] 3s² 3p³', atomicRadiusPm: 98, row: 3, col: 15 },
  { z: 16, symbol: 'S', name: 'Azufre', mass: 32.06, category: 'no-metal', electronegativity: 2.58, electronConfig: '[Ne] 3s² 3p⁴', atomicRadiusPm: 88, row: 3, col: 16 },
  { z: 17, symbol: 'Cl', name: 'Cloro', mass: 35.45, category: 'halogeno', electronegativity: 3.16, electronConfig: '[Ne] 3s² 3p⁵', atomicRadiusPm: 79, row: 3, col: 17 },
  { z: 18, symbol: 'Ar', name: 'Argón', mass: 39.948, category: 'gas-noble', electronegativity: null, electronConfig: '[Ne] 3s² 3p⁶', atomicRadiusPm: 71, row: 3, col: 18 },

  // Periodo 4 Clave
  { z: 19, symbol: 'K', name: 'Potasio', mass: 39.098, category: 'alcalino', electronegativity: 0.82, electronConfig: '[Ar] 4s¹', atomicRadiusPm: 243, row: 4, col: 1 },
  { z: 20, symbol: 'Ca', name: 'Calcio', mass: 40.078, category: 'alcalinoterreo', electronegativity: 1.00, electronConfig: '[Ar] 4s²', atomicRadiusPm: 194, row: 4, col: 2 },
  { z: 26, symbol: 'Fe', name: 'Hierro', mass: 55.845, category: 'transicion', electronegativity: 1.83, electronConfig: '[Ar] 3d⁶ 4s²', atomicRadiusPm: 156, row: 4, col: 8 },
  { z: 29, symbol: 'Cu', name: 'Cobre', mass: 63.546, category: 'transicion', electronegativity: 1.90, electronConfig: '[Ar] 3d¹⁰ 4s¹', atomicRadiusPm: 145, row: 4, col: 11 },
  { z: 30, symbol: 'Zn', name: 'Zinc', mass: 65.38, category: 'transicion', electronegativity: 1.65, electronConfig: '[Ar] 3d¹⁰ 4s²', atomicRadiusPm: 142, row: 4, col: 12 },
  { z: 35, symbol: 'Br', name: 'Bromo', mass: 79.904, category: 'halogeno', electronegativity: 2.96, electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁵', atomicRadiusPm: 94, row: 4, col: 17 },
  { z: 47, symbol: 'Ag', name: 'Plata', mass: 107.87, category: 'transicion', electronegativity: 1.93, electronConfig: '[Kr] 4d¹⁰ 5s¹', atomicRadiusPm: 165, row: 5, col: 11 },
  { z: 79, symbol: 'Au', name: 'Oro', mass: 196.97, category: 'transicion', electronegativity: 2.54, electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', atomicRadiusPm: 174, row: 6, col: 11 },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  alcalino: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  alcalinoterreo: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  transicion: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'post-transicion': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  'no-metal': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'gas-noble': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  halogeno: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  metaloide: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
};

export const InteractivePeriodicTable: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState<ChemicalElement>(PERIODIC_ELEMENTS[5]); // Carbono por defecto

  const filtered = PERIODIC_ELEMENTS.filter(
    (el) =>
      el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      el.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      el.z.toString() === searchTerm.trim()
  );

  return (
    <div className={`app-card p-6 bg-white border border-slate-200/90 shadow-soft space-y-6 ${className}`}>
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center shrink-0">
            <Atom className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
              Tabla Periódica Interactiva de los Elementos
            </h3>
            <p className="text-xs text-slate-500">
              Explora números atómicos, masas, electronegatividad de Pauling y configuraciones electrónicas.
            </p>
          </div>
        </div>

        {/* Buscador de elementos */}
        <div className="relative self-start sm:self-auto w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por símbolo (ej. Fe) o nombre..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Grilla / Matriz de Elementos (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Haz clic en un elemento para ver su ficha atómica detallada:</span>
            <span className="font-mono text-[11px] font-bold text-indigo-600">
              {filtered.length} elementos
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {filtered.map((el) => {
              const isSelected = selectedElement.z === el.z;
              const catStyle = CATEGORY_COLORS[el.category] || CATEGORY_COLORS['no-metal'];

              return (
                <button
                  key={el.z}
                  onClick={() => setSelectedElement(el)}
                  className={`p-2 rounded-xl text-left transition-all border flex flex-col justify-between h-20 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105 z-10'
                      : `${catStyle.bg} ${catStyle.border} hover:border-slate-400 hover:shadow-xs`
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono leading-none">
                    <span className={isSelected ? 'text-slate-300' : 'text-slate-500'}>
                      {el.z}
                    </span>
                    <span className={`text-[9px] font-bold ${isSelected ? 'text-indigo-300' : catStyle.text}`}>
                      {el.mass.toFixed(1)}
                    </span>
                  </div>

                  <div className="text-center my-auto">
                    <div className="text-base font-extrabold font-sans leading-none">
                      {el.symbol}
                    </div>
                  </div>

                  <div className={`text-[9px] truncate font-medium ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                    {el.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ficha Atómica Detallada del Elemento Seleccionado (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/40 border border-indigo-100/90 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-700">
              {selectedElement.category.replace('-', ' ')}
            </span>
            <span className="text-xs font-mono font-bold text-indigo-700">
              Periodo {selectedElement.row}
            </span>
          </div>

          {/* Tarjeta de Identidad Gigante */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-1">
            <div className="text-xs font-mono text-slate-400">Número Atómico (Z) = {selectedElement.z}</div>
            <div className="text-4xl font-extrabold font-sans text-slate-900 tracking-tight">
              {selectedElement.symbol}
            </div>
            <div className="text-sm font-bold text-slate-800">{selectedElement.name}</div>
            <div className="text-xs font-mono text-indigo-600 font-semibold pt-1">
              Masa: {selectedElement.mass} u
            </div>
          </div>

          {/* Propiedades Cuánticas y Físicas */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200/60">
              <span className="text-slate-500">Configuración Electrónica:</span>
              <span className="font-mono font-bold text-slate-900">{selectedElement.electronConfig}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200/60">
              <span className="text-slate-500">Electronegatividad (Pauling):</span>
              <span className="font-mono font-bold text-indigo-700">
                {selectedElement.electronegativity !== null ? selectedElement.electronegativity : 'N/A (Inerte)'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200/60">
              <span className="text-slate-500">Radio Atómico:</span>
              <span className="font-mono font-bold text-slate-800">{selectedElement.atomicRadiusPm} pm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
