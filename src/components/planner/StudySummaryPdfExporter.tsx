/**
 * @file StudySummaryPdfExporter.tsx
 * @description Exportador de Resúmenes de Estudio y Fichas Académicas en formato imprimible
 * con diseño editorial estilo revista Apple Minimalist (CSS print pagination y tipografía de precisión).
 * Función 152 del catálogo de arquitectura.
 */

import React, { useState, useRef } from 'react';
import { Printer } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SummarySection {
  title: string;
  keyPoints: string[];
  formulaOrQuote?: string;
  pedagogicalNote?: string;
}

export const StudySummaryPdfExporter: React.FC = () => {
  const { user } = useAuth();
  const printAreaRef = useRef<HTMLDivElement>(null);

  const [documentTitle, setDocumentTitle] = useState<string>(
    'Ficha de Estudio Editorial: Termodinámica & Cinemática'
  );
  const [subject, setSubject] = useState<string>('Física Teórica & Ciencias');
  const [sections] = useState<SummarySection[]>([
    {
      title: '1. Principios de Conservación y Entropía',
      keyPoints: [
        'La energía total de un sistema aislado permanece constante en el tiempo (ΔU = Q - W).',
        'La entropía del universo tiende indefectiblemente hacia un máximo termodinámico.',
        'Los organismos vivos operan como sistemas abiertos que disipan calor para mantener orden estructural.'
      ],
      formulaOrQuote: 'ΔS_{universo} = ΔS_{sistema} + ΔS_{entorno} ≥ 0',
      pedagogicalNote: 'Recordatorio clave de admisión: la vida no viola la termodinámica, solo exporta desorden.'
    },
    {
      title: '2. Movimiento Rectilíneo y Dinámica Newtoniana',
      keyPoints: [
        'En un MRUV, la aceleración se mantiene constante y la velocidad varía de forma lineal respecto al tiempo.',
        'La fuerza de fricción cinética depende del coeficiente dinámico y de la fuerza normal (f_k = μ_k · N).',
        'En un plano inclinado sin rozamiento, la aceleración gravitacional efectiva es a = g · sin(θ).'
      ],
      formulaOrQuote: 'v_f^2 = v_0^2 + 2 · a · Δx',
      pedagogicalNote: 'En ejercicios con fricción, recuerda descomponer siempre las fuerzas en el eje tangencial y normal.'
    }
  ]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-100 text-slate-800 rounded-xl border border-slate-200 shadow-xs">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 tracking-tight">
              Exportador Editorial de Resúmenes de Estudio
            </h3>
            <p className="text-xs text-slate-500">
              Maqueta tus notas en formato PDF imprimible de alta precisión estilo revista académica
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 self-start sm:self-auto shadow-xs"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Imprimir / Guardar como PDF</span>
        </button>
      </div>

      {/* Parámetros de la ficha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
        <div>
          <label className="text-[11px] font-semibold text-slate-600 block mb-1">
            Título del Documento:
          </label>
          <input
            type="text"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-slate-600 block mb-1">
            Materia o Cátedra:
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
          />
        </div>
      </div>

      {/* Vista Previa de la Ficha Editorial (Área Imprimible) */}
      <div
        ref={printAreaRef}
        className="p-8 sm:p-10 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-6 max-w-3xl mx-auto print:border-none print:shadow-none print:p-0"
      >
        {/* Cabecera Editorial */}
        <div className="pb-4 border-b-2 border-slate-900 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              CENTRO DE PRODUCTIVIDAD ESTUDIANTIL • FICHA SINTÉTICA
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-1">
              {documentTitle}
            </h1>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              {subject} • Estudiante: {user?.full_name || 'Santiago Rivero'}
            </p>
          </div>
          <div className="text-right text-[10px] text-slate-400 font-mono shrink-0">
            {new Date().toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Secciones de Contenido */}
        <div className="space-y-6">
          {sections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-200 pb-1">
                {sec.title}
              </h2>

              <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
                {sec.keyPoints.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {sec.formulaOrQuote && (
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70 text-center font-mono text-xs text-slate-800">
                  {sec.formulaOrQuote}
                </div>
              )}

              {sec.pedagogicalNote && (
                <p className="text-[11px] text-slate-500 italic pl-3 border-l-2 border-slate-300">
                  {sec.pedagogicalNote}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Pie Editorial */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>Generado deterministamente • Cero alucinaciones</span>
          <span>Página 1 de 1</span>
        </div>
      </div>
    </div>
  );
};
