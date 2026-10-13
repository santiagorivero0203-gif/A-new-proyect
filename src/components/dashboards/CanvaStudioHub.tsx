/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - CANVA STUDIO HUB & BULK CSV CREATOR
 * ==============================================================================
 * Componente: CanvaStudioHub.tsx
 * Función: Módulo de integración para Mafe (Diseño UCAB):
 * 1. Organizador de Embeds e URLs de Proyectos Canva en vivo con visualizador interactivo.
 * 2. Estructurador de Tablas de 4 Columnas con Límite Estricto de 7 y 15 palabras
 *    para evitar cortes en layouts de diapositivas o carruseles.
 * 3. Exportador directo a archivo CSV compatible con "Crear en Lote" (Canva Bulk Create).
 * ==============================================================================
 */

import React, { useState } from 'react';
import {
  Download,
  Plus,
  Trash2,
  ExternalLink,
  Layers,
  FileSpreadsheet,
  Check,
  Copy,
  AlertTriangle,
} from 'lucide-react';

export interface CanvaRowItem {
  id: string;
  slideTitle: string; // Título de la diapositiva/tarjeta (Max 7 palabras)
  mainConcept: string; // Concepto o principio clave (Max 7 palabras)
  bodyCopy: string; // Explicación o contenido (Max 15 palabras)
  callToAction: string; // Llamado a la acción o nota de pie (Max 7 palabras)
}

export const CanvaStudioHub: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [canvaEmbedUrl, setCanvaEmbedUrl] = useState<string>(
    'https://www.canva.com/design/DAFexample/view?embed'
  );
  const [activeTab, setActiveTab] = useState<'BULK_TABLE' | 'CANVA_EMBED'>('BULK_TABLE');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Filas estructuradas para Canva Bulk Create
  const [rows, setRows] = useState<CanvaRowItem[]>([
    {
      id: '1',
      slideTitle: 'Principios de Composición Visual',
      mainConcept: 'Equilibrio Asimétrico y Peso',
      bodyCopy: 'La tensión visual entre elementos genera dinamismo sin saturar la atención del usuario en pantalla.',
      callToAction: 'Revisar Ley de Tercios',
    },
    {
      id: '2',
      slideTitle: 'Teoría del Color Aplicada',
      mainConcept: 'Contraste y Ratio WCAG',
      bodyCopy: 'Garantizar legibilidad absoluta entre fondo y tipografía aplicando estándares de accesibilidad universal.',
      callToAction: 'Verificar Ratio 4.5 a 1',
    },
    {
      id: '3',
      slideTitle: 'Jerarquía Tipográfica',
      mainConcept: 'Escala Modular Armónica',
      bodyCopy: 'Diferenciar títulos y subtítulos con peso y tamaño elimina la necesidad de líneas divisorias.',
      callToAction: 'Aplicar Escala 1.25 Mayor',
    },
  ]);

  // Contadores de palabras
  const countWords = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const handleUpdateRow = (id: string, field: keyof CanvaRowItem, value: string) => {
    setRows(
      rows.map((r) => {
        if (r.id !== id) return r;
        return { ...r, [field]: value };
      })
    );
  };

  const handleAddRow = () => {
    const newRow: CanvaRowItem = {
      id: `row-${Date.now()}`,
      slideTitle: 'Nuevo Título Breve',
      mainConcept: 'Concepto Clave',
      bodyCopy: 'Descripción concisa y directa diseñada especialmente para ajustarse al diseño de Canva.',
      callToAction: 'Continuar Leyendo',
    };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (id: string) => {
    if (rows.length <= 1) return;
    setRows(rows.filter((r) => r.id !== id));
  };

  // Exportar a CSV compatible con Canva Bulk Create (UTF-8 con BOM para acentos en Excel/Canva)
  const exportToCsv = () => {
    const headers = ['Título_Slide', 'Concepto_Clave', 'Cuerpo_Texto', 'Call_To_Action'];
    const csvRows = rows.map((r) => {
      const escape = (str: string) => `"${str.replace(/"/g, '""')}"`;
      return [
        escape(r.slideTitle),
        escape(r.mainConcept),
        escape(r.bodyCopy),
        escape(r.callToAction),
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...csvRows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `canva_bulk_create_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyCsvText = () => {
    const headers = ['Título_Slide', 'Concepto_Clave', 'Cuerpo_Texto', 'Call_To_Action'];
    const csvRows = rows.map((r) => {
      const escape = (str: string) => `"${str.replace(/"/g, '""')}"`;
      return [
        escape(r.slideTitle),
        escape(r.mainConcept),
        escape(r.bodyCopy),
        escape(r.callToAction),
      ].join(',');
    });
    const text = [headers.join(','), ...csvRows].join('\n');
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className={`app-card p-6 bg-white border border-slate-200/90 shadow-soft space-y-6 ${className}`}>
      {/* Encabezado del Módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00C4CC] to-[#7D2AE8] text-white flex items-center justify-center shrink-0 shadow-soft-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
              Canva Studio Hub & Bulk Creator
            </h3>
            <p className="text-xs text-slate-500">
              Estructurador de 4 columnas con límite estricto de palabras y exportación CSV para Canva Crear en Lote.
            </p>
          </div>
        </div>

        {/* Selector de Pestaña */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold self-start">
          <button
            onClick={() => setActiveTab('BULK_TABLE')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'BULK_TABLE'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Tabla Bulk CSV (4 Cols)</span>
          </button>
          <button
            onClick={() => setActiveTab('CANVA_EMBED')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'CANVA_EMBED'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lienzo / Embed Canva</span>
          </button>
        </div>
      </div>

      {activeTab === 'BULK_TABLE' ? (
        <div className="space-y-4">
          {/* Barra de Acciones de la Tabla */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            <div className="text-xs text-slate-600">
              <span className="font-bold text-slate-900">{rows.length}</span> registros listos para inyección en plantillas de diseño.
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyCsvText}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              >
                {copiedNotification ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedNotification ? 'Copiado al portapapeles' : 'Copiar CSV'}</span>
              </button>

              <button
                onClick={exportToCsv}
                className="px-3.5 py-1.5 rounded-xl bg-[#0F52BA] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar CSV para Canva</span>
              </button>
            </div>
          </div>

          {/* Tabla Reactiva con Guardarraíles de Palabras */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-soft-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3 w-10 text-center">#</th>
                    <th className="p-3 min-w-[200px]">
                      Col 1: Título Slide
                      <span className="block text-[10px] font-normal text-slate-500">Máx 7 palabras</span>
                    </th>
                    <th className="p-3 min-w-[200px]">
                      Col 2: Concepto Clave
                      <span className="block text-[10px] font-normal text-slate-500">Máx 7 palabras</span>
                    </th>
                    <th className="p-3 min-w-[320px]">
                      Col 3: Cuerpo / Explicación
                      <span className="block text-[10px] font-normal text-slate-500">Máx 15 palabras</span>
                    </th>
                    <th className="p-3 min-w-[180px]">
                      Col 4: Call to Action / Footer
                      <span className="block text-[10px] font-normal text-slate-500">Máx 7 palabras</span>
                    </th>
                    <th className="p-3 w-12 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map((row, idx) => {
                    const titleWords = countWords(row.slideTitle);
                    const conceptWords = countWords(row.mainConcept);
                    const bodyWords = countWords(row.bodyCopy);
                    const ctaWords = countWords(row.callToAction);

                    return (
                      <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-3 text-center font-mono font-bold text-slate-400">
                          {idx + 1}
                        </td>

                        {/* Columna 1 */}
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={row.slideTitle}
                            onChange={(e) => handleUpdateRow(row.id, 'slideTitle', e.target.value)}
                            className={`w-full px-2.5 py-1.5 rounded-xl border text-xs font-semibold text-slate-800 focus:outline-none transition-all ${
                              titleWords > 7
                                ? 'border-amber-400 bg-amber-50/50 focus:border-amber-500'
                                : 'border-slate-200 bg-white focus:border-[#0F52BA]'
                            }`}
                          />
                          <div className="flex items-center justify-between text-[10px] mt-1 px-1">
                            <span className={titleWords > 7 ? 'text-amber-600 font-bold' : 'text-slate-400 font-mono'}>
                              {titleWords} / 7 palabras
                            </span>
                            {titleWords > 7 && <span className="text-amber-600 font-medium text-[10px]">Excede límite</span>}
                          </div>
                        </td>

                        {/* Columna 2 */}
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={row.mainConcept}
                            onChange={(e) => handleUpdateRow(row.id, 'mainConcept', e.target.value)}
                            className={`w-full px-2.5 py-1.5 rounded-xl border text-xs font-medium text-slate-800 focus:outline-none transition-all ${
                              conceptWords > 7
                                ? 'border-amber-400 bg-amber-50/50 focus:border-amber-500'
                                : 'border-slate-200 bg-white focus:border-[#0F52BA]'
                            }`}
                          />
                          <div className="flex items-center justify-between text-[10px] mt-1 px-1">
                            <span className={conceptWords > 7 ? 'text-amber-600 font-bold' : 'text-slate-400 font-mono'}>
                              {conceptWords} / 7 palabras
                            </span>
                            {conceptWords > 7 && <span className="text-amber-600 font-medium text-[10px]">Excede límite</span>}
                          </div>
                        </td>

                        {/* Columna 3 */}
                        <td className="p-2.5">
                          <textarea
                            rows={2}
                            value={row.bodyCopy}
                            onChange={(e) => handleUpdateRow(row.id, 'bodyCopy', e.target.value)}
                            className={`w-full px-2.5 py-1.5 rounded-xl border text-xs leading-relaxed text-slate-700 focus:outline-none transition-all resize-none ${
                              bodyWords > 15
                                ? 'border-amber-400 bg-amber-50/50 focus:border-amber-500'
                                : 'border-slate-200 bg-white focus:border-[#0F52BA]'
                            }`}
                          />
                          <div className="flex items-center justify-between text-[10px] mt-0.5 px-1">
                            <span className={bodyWords > 15 ? 'text-amber-600 font-bold' : 'text-slate-400 font-mono'}>
                              {bodyWords} / 15 palabras
                            </span>
                            {bodyWords > 15 && <span className="text-amber-600 font-medium text-[10px]">Excede límite de slide</span>}
                          </div>
                        </td>

                        {/* Columna 4 */}
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={row.callToAction}
                            onChange={(e) => handleUpdateRow(row.id, 'callToAction', e.target.value)}
                            className={`w-full px-2.5 py-1.5 rounded-xl border text-xs font-medium text-slate-800 focus:outline-none transition-all ${
                              ctaWords > 7
                                ? 'border-amber-400 bg-amber-50/50 focus:border-amber-500'
                                : 'border-slate-200 bg-white focus:border-[#0F52BA]'
                            }`}
                          />
                          <div className="flex items-center justify-between text-[10px] mt-1 px-1">
                            <span className={ctaWords > 7 ? 'text-amber-600 font-bold' : 'text-slate-400 font-mono'}>
                              {ctaWords} / 7 palabras
                            </span>
                            {ctaWords > 7 && <span className="text-amber-600 font-medium text-[10px]">Excede límite</span>}
                          </div>
                        </td>

                        {/* Acción Borrar */}
                        <td className="p-2.5 text-center">
                          <button
                            onClick={() => handleRemoveRow(row.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Eliminar fila"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={handleAddRow}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-blue-600" />
                <span>Añadir Fila de Contenido</span>
              </button>

              <span className="text-[11px] text-slate-400">
                Límites automáticos para evitar texto desbordado en plantillas de Canva.
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Pestaña de Embed de Canva en vivo */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700 whitespace-nowrap">URL del Diseño en Canva:</span>
            <input
              type="text"
              value={canvaEmbedUrl}
              onChange={(e) => setCanvaEmbedUrl(e.target.value)}
              placeholder="https://www.canva.com/design/.../view?embed"
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:border-[#0F52BA] focus:outline-none"
            />
            <a
              href={canvaEmbedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 whitespace-nowrap shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir en Canva</span>
            </a>
          </div>

          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shadow-inner">
            {canvaEmbedUrl.includes('canva.com') ? (
              <iframe
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
                src={canvaEmbedUrl}
                allow="fullscreen"
                title="Lienzo de Canva"
              />
            ) : (
              <div className="text-center p-6 space-y-2 text-xs text-slate-400">
                <AlertTriangle className="w-6 h-6 text-amber-500 mx-auto" />
                <p>Ingresa una URL válida de inserción (embed) de Canva para visualizar el proyecto en vivo.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
