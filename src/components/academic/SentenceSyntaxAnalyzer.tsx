/**
 * @file SentenceSyntaxAnalyzer.tsx
 * @description Analizador Morfosintáctico Interactivo en Español.
 * Permite descomponer oraciones gramaticales complejas, identificar Sujeto,
 * Predicado, Núcleos, Modificadores (Directo, Indirecto, Aposición) y Complementos
 * (Directo, Indirecto, Circunstanciales de Modo, Tiempo, Lugar, Causa).
 * Función 131 del catálogo académico.
 */

import React, { useState, useMemo } from 'react';
import { BookMarked, Sparkles, CheckCircle2, ChevronRight, Layers, HelpCircle } from 'lucide-react';

interface SentencePreset {
  id: string;
  sentence: string;
  level: 'Básico (Bachillerato)' | 'Intermedio' | 'Avanzado';
  subject: {
    text: string;
    type: string; // Expreso Simple, Expreso Compuesto, Tácito/Omitido
    nucleus: string[];
    directModifiers: string[];
    indirectModifiers: string[];
    apposition?: string;
  };
  predicate: {
    text: string;
    type: string; // Verbal, Nominal
    nucleus: string[];
    directObject?: string; // CD
    indirectObject?: string; // CI
    circumstantials: { type: string; text: string }[]; // CC
  };
  explanation: string;
}

const PRESET_SENTENCES: SentencePreset[] = [
  {
    id: 's1',
    sentence: 'El brillante estudiante de física resolvió el complejo examen en la biblioteca con serenidad.',
    level: 'Básico (Bachillerato)',
    subject: {
      text: 'El brillante estudiante de física',
      type: 'Expreso Simple',
      nucleus: ['estudiante'],
      directModifiers: ['El (Artículo)', 'brillante (Adjetivo)'],
      indirectModifiers: ['de física (SPrep con nexo "de")'],
      apposition: undefined
    },
    predicate: {
      text: 'resolvió el complejo examen en la biblioteca con serenidad',
      type: 'Verbal (Núcleo Predicativo)',
      nucleus: ['resolvió'],
      directObject: 'el complejo examen (¿Qué resolvió? -> Lo resolvió)',
      indirectObject: undefined,
      circumstantials: [
        { type: 'CC de Lugar', text: 'en la biblioteca (¿Dónde?)' },
        { type: 'CC de Modo', text: 'con serenidad (¿Cómo?)' }
      ]
    },
    explanation: 'Oración bimembre simple. El núcleo del sujeto concuerda en tercera persona del singular con el verbo "resolvió".'
  },
  {
    id: 's2',
    sentence: 'Los profesores y tutores entregaron las calificaciones finales a los alumnos ayer por la tarde.',
    level: 'Intermedio',
    subject: {
      text: 'Los profesores y tutores',
      type: 'Expreso Compuesto (Dos núcleos coordinados)',
      nucleus: ['profesores', 'tutores'],
      directModifiers: ['Los (Artículo determinante)'],
      indirectModifiers: [],
      apposition: undefined
    },
    predicate: {
      text: 'entregaron las calificaciones finales a los alumnos ayer por la tarde',
      type: 'Verbal Transitivo',
      nucleus: ['entregaron'],
      directObject: 'las calificaciones finales (CD, conmutable por "las")',
      indirectObject: 'a los alumnos (CI, conmutable por "les")',
      circumstantials: [
        { type: 'CC de Tiempo', text: 'ayer por la tarde (¿Cuándo?)' }
      ]
    },
    explanation: 'Sujeto compuesto unido por la conjunción copulativa "y". Predicado con tránsito bivalente (CD + CI simultáneos).'
  },
  {
    id: 's3',
    sentence: 'Santiago, el delegado del curso, redactó un informe riguroso para la cátedra por motivos de evaluación.',
    level: 'Avanzado',
    subject: {
      text: 'Santiago, el delegado del curso',
      type: 'Expreso con Aposición Explicativa',
      nucleus: ['Santiago'],
      directModifiers: [],
      indirectModifiers: [],
      apposition: 'el delegado del curso (Aposición entre comas)'
    },
    predicate: {
      text: 'redactó un informe riguroso para la cátedra por motivos de evaluación',
      type: 'Verbal',
      nucleus: ['redactó'],
      directObject: 'un informe riguroso (CD)',
      indirectObject: 'para la cátedra (CI destinatario)',
      circumstantials: [
        { type: 'CC de Causa', text: 'por motivos de evaluación (¿Por qué?)' }
      ]
    },
    explanation: 'Presencia de aposición explicativa que aclara al sustantivo propio núcleo sin nexo preposicional directo.'
  },
  {
    id: 's4',
    sentence: 'Durante la tormenta eléctrica, los antiguos ventanales de madera crujían intensamente por el viento.',
    level: 'Básico (Bachillerato)',
    subject: {
      text: 'los antiguos ventanales de madera',
      type: 'Expreso Simple (Con hipérbaton en la oración)',
      nucleus: ['ventanales'],
      directModifiers: ['los (Artículo)', 'antiguos (Adjetivo)'],
      indirectModifiers: ['de madera (Complemento del nombre)'],
      apposition: undefined
    },
    predicate: {
      text: 'Durante la tormenta eléctrica ... crujían intensamente por el viento',
      type: 'Verbal Intransitivo',
      nucleus: ['crujían'],
      directObject: undefined,
      indirectObject: undefined,
      circumstantials: [
        { type: 'CC de Tiempo (al frente)', text: 'Durante la tormenta eléctrica' },
        { type: 'CC de Modo', text: 'intensamente' },
        { type: 'CC de Causa', text: 'por el viento' }
      ]
    },
    explanation: 'Oración con alteración sintáctica (hipérbaton): el circunstancial de tiempo antecede al sujeto.'
  }
];

export const SentenceSyntaxAnalyzer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('s1');
  const [customInput, setCustomInput] = useState<string>('');
  const [showDetailedGuide, setShowDetailedGuide] = useState<boolean>(false);

  const activePreset = useMemo(() => {
    return PRESET_SENTENCES.find((s) => s.id === selectedId) || PRESET_SENTENCES[0];
  }, [selectedId]);

  // Si el usuario escribe una oración personalizada, analizamos heurísticamente
  const customAnalysis = useMemo(() => {
    if (!customInput.trim()) return null;
    const words = customInput.trim().split(/\s+/);
    return {
      wordCount: words.length,
      estimatedVerb: words.find(w => /(ó|ió|aron|ieron|aba|ían|an|en|emos|ará|án)$/i.test(w)) || 'Verbo principal por identificar'
    };
  }, [customInput]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100/60 shadow-xs">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 tracking-tight">
              Analizador Morfosintáctico de Oraciones
            </h3>
            <p className="text-xs text-slate-500">
              Desglose jerárquico de Sujeto, Predicado, Modificadores (MD, MI, Apos.) y Complementos (CD, CI, CC)
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDetailedGuide(!showDetailedGuide)}
          className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 self-start sm:self-auto bg-indigo-50/70 hover:bg-indigo-100/60 px-3 py-1.5 rounded-xl border border-indigo-200/50 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showDetailedGuide ? 'Ocultar Chuleta' : 'Reglas de Descarte'}</span>
        </button>
      </div>

      {/* Chuleta Gramatical de Descarte */}
      {showDetailedGuide && (
        <div className="p-4 bg-indigo-50/40 rounded-xl border border-indigo-100 space-y-3 text-xs text-slate-700 animate-in fade-in duration-200">
          <h4 className="font-semibold text-indigo-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Métodos Infalibles de Descarte Gramatical para Exámenes de Admisión:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] leading-relaxed">
            <div className="bg-white p-3 rounded-lg border border-indigo-100/80 shadow-xs">
              <strong className="text-indigo-800">1. Complemento Directo (CD):</strong>
              <p className="text-slate-600 mt-0.5">
                Pregunta: ¿Qué + verbo? o sustitución pronominal por <em>lo, la, los, las</em>. Al pasar a voz pasiva, el CD se convierte en el Sujeto Paciente.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-indigo-100/80 shadow-xs">
              <strong className="text-indigo-800">2. Complemento Indirecto (CI):</strong>
              <p className="text-slate-600 mt-0.5">
                Pregunta: ¿A quién / para quién? o sustitución pronominal por <em>le, les</em> (o <em>se</em> si acompaña a un pronombre directo).
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-indigo-100/80 shadow-xs">
              <strong className="text-indigo-800">3. Modificador Indirecto (MI):</strong>
              <p className="text-slate-600 mt-0.5">
                Vive dentro del Sintagma Nominal (Sujeto). Siempre inicia con enlace subordinante / preposición (<em>de, con, sin, para</em>).
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-indigo-100/80 shadow-xs">
              <strong className="text-indigo-800">4. Aposición:</strong>
              <p className="text-slate-600 mt-0.5">
                Sustantivo o frase sustantiva que reitera al núcleo del sujeto. Va casi siempre entre comas y se puede intercambiar de posición con el núcleo.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Selector de Oraciones Modelo */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
          Selecciona una Oración para Análisis Exhaustivo:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {PRESET_SENTENCES.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedId(p.id);
                setCustomInput('');
              }}
              className={`p-3 text-left rounded-xl border transition-all text-xs ${
                selectedId === p.id && !customInput
                  ? 'bg-indigo-50/70 border-indigo-400/80 text-indigo-900 shadow-xs ring-1 ring-indigo-300'
                  : 'bg-slate-50/60 border-slate-200/80 text-slate-700 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-semibold text-slate-800">"{p.sentence.slice(0, 45)}..."</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-white text-indigo-700 border border-indigo-100 shrink-0">
                  {p.level}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1 italic">{p.sentence}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Oración Activa Visualizada con Marcado de Sintagmas */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
          Estructura de la Proposición (Segmentación en Sintagmas)
        </span>
        <div className="p-3.5 bg-white rounded-lg border border-slate-200 text-sm font-serif leading-relaxed text-slate-800">
          <span className="bg-blue-100/70 text-blue-900 px-1.5 py-0.5 rounded border border-blue-200 font-semibold" title="Sintagma Nominal Sujeto">
            [{activePreset.subject.text}]
          </span>{' '}
          <span className="bg-emerald-100/70 text-emerald-900 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold" title="Sintagma Verbal Predicado">
            [{activePreset.predicate.text}]
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-100 border border-blue-300 inline-block" />
            <span className="text-slate-600 font-medium">Sujeto (SN)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300 inline-block" />
            <span className="text-slate-600 font-medium">Predicado (SV)</span>
          </div>
        </div>
      </div>

      {/* Desglose Morfosintáctico de Dos Columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Columna Sujeto */}
        <div className="space-y-4 bg-blue-50/30 p-5 rounded-2xl border border-blue-100">
          <div className="flex items-center justify-between pb-2 border-b border-blue-200/50">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-bold text-blue-900 font-display">
                Sujeto (Sintagma Nominal)
              </h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-semibold">
              {activePreset.subject.type}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 text-[11px] block">Núcleo del Sujeto (NS):</span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {activePreset.subject.nucleus.map((n, i) => (
                  <span key={i} className="px-2.5 py-1 bg-blue-600 text-white font-semibold rounded-lg text-xs shadow-2xs">
                    {n} (Sustantivo)
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-slate-500 text-[11px] block">Modificadores Directos (MD):</span>
              {activePreset.subject.directModifiers.length > 0 ? (
                <ul className="mt-1 space-y-1">
                  {activePreset.subject.directModifiers.map((md, i) => (
                    <li key={i} className="text-slate-700 bg-white/80 px-2.5 py-1 rounded-md border border-blue-100/80">
                      • {md}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-slate-400 italic text-[11px]">Ninguno</span>
              )}
            </div>

            <div>
              <span className="text-slate-500 text-[11px] block">Modificadores Indirectos (MI):</span>
              {activePreset.subject.indirectModifiers.length > 0 ? (
                <ul className="mt-1 space-y-1">
                  {activePreset.subject.indirectModifiers.map((mi, i) => (
                    <li key={i} className="text-slate-700 bg-white/80 px-2.5 py-1 rounded-md border border-blue-100/80">
                      • {mi}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-slate-400 italic text-[11px]">Ninguno</span>
              )}
            </div>

            {activePreset.subject.apposition && (
              <div>
                <span className="text-slate-500 text-[11px] block">Aposición:</span>
                <p className="mt-1 text-slate-700 bg-white/80 px-2.5 py-1 rounded-md border border-blue-100/80 font-medium">
                  {activePreset.subject.apposition}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Columna Predicado */}
        <div className="space-y-4 bg-emerald-50/30 p-5 rounded-2xl border border-emerald-100">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-200/50">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <h4 className="text-sm font-bold text-emerald-900 font-display">
                Predicado (Sintagma Verbal)
              </h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-semibold">
              {activePreset.predicate.type}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 text-[11px] block">Núcleo del Predicado (NP):</span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {activePreset.predicate.nucleus.map((n, i) => (
                  <span key={i} className="px-2.5 py-1 bg-emerald-600 text-white font-semibold rounded-lg text-xs shadow-2xs">
                    {n} (Verbo conjugado)
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-slate-500 text-[11px] block">Complemento Directo (CD / Objeto Directo):</span>
              {activePreset.predicate.directObject ? (
                <p className="mt-1 text-slate-700 bg-white/80 px-2.5 py-1 rounded-md border border-emerald-100/80">
                  {activePreset.predicate.directObject}
                </p>
              ) : (
                <span className="text-slate-400 italic text-[11px]">No posee CD (Verbo intransitivo o copulativo)</span>
              )}
            </div>

            <div>
              <span className="text-slate-500 text-[11px] block">Complemento Indirecto (CI / Objeto Indirecto):</span>
              {activePreset.predicate.indirectObject ? (
                <p className="mt-1 text-slate-700 bg-white/80 px-2.5 py-1 rounded-md border border-emerald-100/80">
                  {activePreset.predicate.indirectObject}
                </p>
              ) : (
                <span className="text-slate-400 italic text-[11px]">No posee CI</span>
              )}
            </div>

            <div>
              <span className="text-slate-500 text-[11px] block">Complementos Circunstanciales (CC):</span>
              {activePreset.predicate.circumstantials.length > 0 ? (
                <ul className="mt-1 space-y-1">
                  {activePreset.predicate.circumstantials.map((cc, i) => (
                    <li key={i} className="text-slate-700 bg-white/80 px-2.5 py-1 rounded-md border border-emerald-100/80 flex items-center justify-between">
                      <span>• {cc.text}</span>
                      <span className="text-[10px] text-emerald-700 font-semibold">{cc.type}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-slate-400 italic text-[11px]">Sin complementos circunstanciales</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dictamen Pedagógico */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <h5 className="text-xs font-semibold text-slate-800">Dictamen y Concordancia:</h5>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
            {activePreset.explanation}
          </p>
        </div>
      </div>

      {/* Espacio para probar oración propia */}
      <div className="pt-2 border-t border-slate-100 space-y-2">
        <label className="text-xs font-medium text-slate-600">
          O escribe una oración propia para inspección rápida:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Ejemplo: La profesora de química explicó el enlace covalente a los alumnos."
            className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
        {customAnalysis && (
          <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-indigo-500" />
            <span>Longitud: {customAnalysis.wordCount} palabras | Verbo detectado preliminarmente: <strong>{customAnalysis.estimatedVerb}</strong></span>
          </p>
        )}
      </div>
    </div>
  );
};
