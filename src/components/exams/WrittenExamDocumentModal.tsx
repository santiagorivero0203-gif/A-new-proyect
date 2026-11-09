/**
 * @fileoverview Visor Interactivo de Hoja de Evaluación Escrita y Guía de Estudio Previa (Formato 5 Partes / 100 Pts).
 *
 * Reproduce en pantalla una hoja editorial idéntica al PDF modelo subido por el usuario:
 * - Selector rápido de todas las materias del estudiante activo
 * - Conmutador instantáneo entre "Hoja de Examen en Blanco" y "Solucionario Oficial Resuelto"
 * - Botones de exportación directa a PDF (Imprimir / Guardar PDF) y Word (.doc)
 */

import React, { useState } from 'react';
import {
  X,
  Printer,
  FileDown,
  CheckCircle2,
  FileText,
  Eye,
  EyeOff,
  BookOpen,
} from 'lucide-react';
import {
  normalizeWrittenExamDocument,
  type NormalizedWrittenExamDocument,
  type WrittenExamDocument,
} from '../../types/writtenExamDocument.types';
import {
  exportWrittenExamToPdf,
  exportWrittenExamToWord,
} from '../../utils/writtenExamExporter';

interface WrittenExamDocumentModalProps {
  document: WrittenExamDocument;
  availableDocuments?: WrittenExamDocument[];
  onSelectDocument?: (doc: WrittenExamDocument) => void;
  onClose: () => void;
}

export const WrittenExamDocumentModal: React.FC<WrittenExamDocumentModalProps> = ({
  document: rawDoc,
  availableDocuments = [],
  onSelectDocument,
  onClose,
}) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const activeDoc = normalizeWrittenExamDocument(rawDoc);

  const totalExercises = activeDoc.parts.reduce((acc, p) => acc + p.items.length, 0);

  const renderPartTable = (part: NormalizedWrittenExamDocument['parts'][number]) => {
    const items = part.items;

    if (part.layout === 'grid-4') {
      const rows: NormalizedWrittenExamDocument['parts'][number]['items'][] = [];
      for (let i = 0; i < items.length; i += 4) {
        rows.push(items.slice(i, i + 4));
      }
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300 text-[13px]">
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="even:bg-slate-50/60">
                  {[0, 1, 2, 3].map((cIdx) => {
                    const it = row[cIdx];
                    if (!it) {
                      return <td key={cIdx} className="w-1/4 border border-slate-300 p-2" />;
                    }
                    return (
                      <td
                        key={it.number}
                        className="w-1/4 border border-slate-300 px-2.5 py-2 align-middle text-slate-800"
                      >
                        <span className="font-bold text-slate-900">{it.number}) </span>
                        <span>{it.prompt} </span>
                        {showAnswers ? (
                          <span className="inline-block rounded bg-emerald-50 px-1.5 py-0.5 font-bold text-emerald-700 border-b-2 border-emerald-600">
                            {it.answer}
                          </span>
                        ) : (
                          <span className="font-semibold text-slate-400">________</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (part.layout === 'grid-2' || part.layout === 'contrast-2col') {
      const rows: [
        NormalizedWrittenExamDocument['parts'][number]['items'][0] | undefined,
        NormalizedWrittenExamDocument['parts'][number]['items'][0] | undefined,
      ][] = [];
      for (let i = 0; i < items.length; i += 2) {
        rows.push([items[i], items[i + 1]]);
      }
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300 text-[13px]">
            <tbody>
              {rows.map(([left, right], rIdx) => (
                <tr key={rIdx} className="even:bg-slate-50/60">
                  {[left, right].map((it, cIdx) =>
                    it ? (
                      <td
                        key={it.number}
                        className="w-1/2 border border-slate-300 px-3 py-2 align-middle text-slate-800"
                      >
                        <span className="font-bold text-slate-900">{it.number}) </span>
                        <span>{it.prompt} </span>
                        {showAnswers ? (
                          <span className="inline-block rounded bg-emerald-50 px-1.5 py-0.5 font-bold text-emerald-700 border-b-2 border-emerald-600">
                            {it.answer}
                          </span>
                        ) : (
                          <span className="font-semibold text-slate-400">____________</span>
                        )}
                      </td>
                    ) : (
                      <td key={cIdx} className="w-1/2 border border-slate-300 px-3 py-2" />
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (part.layout === 'two-step-2col') {
      const rows: [
        NormalizedWrittenExamDocument['parts'][number]['items'][0] | undefined,
        NormalizedWrittenExamDocument['parts'][number]['items'][0] | undefined,
      ][] = [];
      for (let i = 0; i < items.length; i += 2) {
        rows.push([items[i], items[i + 1]]);
      }
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300 text-[13px]">
            <tbody>
              {rows.map(([left, right], rIdx) => (
                <tr key={rIdx} className="even:bg-slate-50/60">
                  {[left, right].map((it, cIdx) =>
                    it ? (
                      <td
                        key={it.number}
                        className="w-1/2 border border-slate-300 px-3 py-2 align-middle text-slate-800"
                      >
                        <span className="font-bold text-slate-900">{it.number}) </span>
                        <span>{it.prompt} = </span>
                        {showAnswers ? (
                          <>
                            <span className="inline-block rounded bg-blue-50 px-1.5 py-0.5 text-xs font-semibold text-blue-800 border-b border-dashed border-blue-500">
                              {it.stepBlank}
                            </span>
                            <span> = </span>
                            <span className="inline-block rounded bg-emerald-50 px-1.5 py-0.5 font-bold text-emerald-700 border-b-2 border-emerald-600">
                              {it.answer}
                            </span>
                          </>
                        ) : (
                          <span className="font-semibold text-slate-400">
                            ___________ = _______
                          </span>
                        )}
                      </td>
                    ) : (
                      <td key={cIdx} className="w-1/2 border border-slate-300 px-3 py-2" />
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // procedural-2col (V PARTE con líneas punteadas de procedimiento)
    const rows: [
      NormalizedWrittenExamDocument['parts'][number]['items'][0] | undefined,
      NormalizedWrittenExamDocument['parts'][number]['items'][0] | undefined,
    ][] = [];
    for (let i = 0; i < items.length; i += 2) {
      rows.push([items[i], items[i + 1]]);
    }
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-slate-300 text-[13px]">
          <tbody>
            {rows.map(([left, right], rIdx) => (
              <tr key={rIdx} className="even:bg-slate-50/40">
                {[left, right].map((it, cIdx) =>
                  it ? (
                    <td
                      key={it.number}
                      className="w-1/2 border border-slate-300 px-3.5 py-2.5 align-top text-slate-800"
                    >
                      <div className="mb-1.5">
                        <span className="font-bold text-slate-900">{it.number}) </span>
                        <span className="font-medium">{it.prompt}</span>
                        {!showAnswers && (
                          <span className="font-semibold text-slate-400"> = __________</span>
                        )}
                      </div>
                      {showAnswers ? (
                        <div className="space-y-1 mt-1.5">
                          <div className="rounded bg-blue-50/90 px-2.5 py-1 text-xs text-blue-900 border-l-2 border-blue-600">
                            <span className="font-bold">Procedimiento: </span>
                            {it.stepBlank || 'Aplicación directa'}
                          </div>
                          <div className="rounded bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 border-l-2 border-emerald-600">
                            <span>Respuesta: </span>
                            {it.answer}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1 text-xs tracking-widest text-slate-400 select-none overflow-hidden">
                          <div className="truncate">
                            ................................................................................................
                          </div>
                          <div className="truncate">
                            ................................................................................................
                          </div>
                        </div>
                      )}
                    </td>
                  ) : (
                    <td key={cIdx} className="w-1/2 border border-slate-300 px-3.5 py-2.5" />
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/85 backdrop-blur-md">
      {/* Barra de Herramientas Superior */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900 px-4 py-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Documento Oficial de Evaluación Escrita · 100 Pts
              </span>
              <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] font-semibold text-slate-300 border border-slate-700">
                {totalExercises} Ejercicios · 5 Partes
              </span>
            </div>
            <h2 className="text-sm md:text-base font-bold text-white line-clamp-1">
              {activeDoc.subject} — {activeDoc.studentName}
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Hoja en Blanco vs Solucionario */}
          <button
            type="button"
            onClick={() => setShowAnswers((prev) => !prev)}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all border ${
              showAnswers
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {showAnswers ? (
              <>
                <EyeOff className="h-4 w-4" />
                Ver Hoja en Blanco
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 text-emerald-400" />
                Mostrar Solucionario ({totalExercises} Respuestas)
              </>
            )}
          </button>

          {/* Imprimir / PDF en Blanco */}
          <button
            type="button"
            onClick={() => exportWrittenExamToPdf(rawDoc, false)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-3.5 py-2 text-xs font-bold text-white shadow transition-all"
            title="Imprimir o Guardar como PDF la Hoja de Examen en Blanco"
          >
            <Printer className="h-4 w-4" />
            PDF Examen
          </button>

          {/* Imprimir / PDF con Solucionario */}
          <button
            type="button"
            onClick={() => exportWrittenExamToPdf(rawDoc, true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow transition-all"
            title="Imprimir o Guardar como PDF con todas las respuestas resueltas"
          >
            <CheckCircle2 className="h-4 w-4" />
            PDF Solucionario
          </button>

          {/* Descargar Word (.doc) */}
          <button
            type="button"
            onClick={() => exportWrittenExamToWord(rawDoc, showAnswers)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3.5 py-2 text-xs font-bold text-white shadow transition-all"
            title="Descargar archivo editable en Microsoft Word (.doc)"
          >
            <FileDown className="h-4 w-4" />
            Word (.doc)
          </button>

          <button
            type="button"
            onClick={onClose}
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-rose-600 hover:text-white transition-colors"
            aria-label="Cerrar visor de examen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Barra Selectora de Materias del Estudiante (si hay varios documentos) */}
      {availableDocuments.length > 1 && onSelectDocument && (
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 bg-slate-900/90 px-4 py-2">
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            <BookOpen className="h-3.5 w-3.5 text-blue-400" />
            Exámenes Escritos de {activeDoc.studentName}:
          </span>
          {availableDocuments.map((docItem) => {
            const isSelected = docItem.id === activeDoc.id;
            return (
              <button
                key={docItem.id}
                type="button"
                onClick={() => onSelectDocument(docItem)}
                className={`shrink-0 rounded-lg px-3 py-1 text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-400 shadow'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {docItem.subject}
              </button>
            );
          })}
        </div>
      )}

      {/* Lienzo de Hoja de Papel A4 (Idéntico al PDF Modelo) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-5xl rounded-sm bg-white p-6 md:p-12 text-slate-900 shadow-2xl ring-1 ring-slate-300">
          {/* Título Principal con línea inferior azul gruesa */}
          <div className="border-b-[3px] border-blue-800 pb-2 mb-4 flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-lg md:text-2xl font-extrabold uppercase tracking-tight text-slate-900">
              {activeDoc.guideTitle}
            </h1>
            {showAnswers && (
              <span className="rounded bg-emerald-600 px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider text-white">
                Solucionario Oficial Resuelto
              </span>
            )}
          </div>

          {/* Resumen Lógico de Repaso */}
          <div className="mb-4">
            <h2 className="text-sm md:text-base font-extrabold uppercase text-blue-900 mb-1.5">
              RESUMEN LÓGICO DE REPASO (Leer antes de iniciar la prueba)
            </h2>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed mb-3">
              {activeDoc.summaryIntro}
            </p>

            <div className="space-y-3">
              {activeDoc.studySections.map((sec, idx) => (
                <div key={idx}>
                  <h3 className="text-xs md:text-sm font-bold text-blue-900 mb-1">
                    {sec.number} {sec.title}
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-xs md:text-[13.5px] text-slate-800">
                    {sec.rules.map((rule, rIdx) => (
                      <li key={rIdx} className="leading-relaxed">
                        <strong className="font-bold text-slate-900">{rule.boldLead} </strong>
                        <span>{rule.body}</span>
                        {rule.example && (
                          <em className="text-slate-600"> ({rule.example})</em>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Recuadro de Contraste Clave */}
          <div className="my-4 border-l-4 border-blue-700 bg-blue-50/90 px-4 py-3 text-xs md:text-[13.5px] text-slate-800">
            <div className="font-bold text-blue-950 mb-1">{activeDoc.keyContrast.title}</div>
            <div className="whitespace-pre-line leading-relaxed">
              {activeDoc.keyContrast.explanation}
            </div>
          </div>

          {/* Encabezado Formal de Evaluación con Casilla de Calificación 100 pts */}
          <div className="mt-5 mb-3 border-2 border-slate-900 flex flex-col md:flex-row items-stretch justify-between">
            <div className="p-3.5 flex-1">
              <div className="text-sm md:text-base font-extrabold uppercase text-slate-900">
                {activeDoc.examTitle}
              </div>
              <div className="mt-1 text-xs text-slate-700">
                {activeDoc.generalInstructions}
              </div>
            </div>
            <div className="border-t-2 md:border-t-0 md:border-l-2 border-slate-300 bg-slate-50 px-5 py-3 flex flex-col items-center justify-center shrink-0 min-w-[175px]">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900">
                CALIFICACIÓN
              </span>
              <span className="mt-1 text-base font-extrabold text-slate-900">
                {showAnswers ? '100 / 100 pts' : '_____ / 100 pts'}
              </span>
            </div>
          </div>

          {/* Cuadrícula de Identificación del Estudiante */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-12 border border-slate-400 text-xs md:text-[13px] text-slate-900">
            <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-slate-400 px-3 py-2">
              <strong>Apellidos y Nombres:</strong>{' '}
              {showAnswers ? (
                <span className="font-semibold text-blue-900">{activeDoc.studentName}</span>
              ) : (
                <span className="text-slate-400">___________________________</span>
              )}
            </div>
            <div className="md:col-span-2 border-b md:border-b-0 md:border-r border-slate-400 px-3 py-2">
              <strong>Fecha:</strong> ____/____/2026
            </div>
            <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-slate-400 px-3 py-2">
              <strong>Grado / Semestre:</strong> {activeDoc.gradeLabel}
            </div>
            <div className="md:col-span-2 px-3 py-2">
              <strong>N.º Lista:</strong> ______
            </div>
          </div>

          {/* las 5 Partes del Examen */}
          <div className="space-y-6">
            {activeDoc.parts.map((part, pIdx) => (
              <div key={pIdx}>
                <div className="border-b-2 border-blue-300 pb-1 mb-1.5">
                  <h3 className="text-sm md:text-[15px] font-extrabold uppercase text-blue-900">
                    {part.partLabel}: {part.title} ({part.points} Puntos)
                  </h3>
                </div>
                <p className="text-xs md:text-[13px] text-slate-700 mb-2.5">
                  {part.instructions}
                </p>
                {renderPartTable(part)}
              </div>
            ))}
          </div>

          {/* Pie de Página Académico */}
          <div className="mt-8 border-t border-slate-300 pt-3 flex flex-wrap items-center justify-between text-xs text-slate-500">
            <span>
              Evaluación Escrita de {activeDoc.subject} — {activeDoc.unitTitle} ({activeDoc.institution})
            </span>
            <span>
              Total: {activeDoc.totalPoints} Puntos · {totalExercises} Ejercicios Oficiales
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
