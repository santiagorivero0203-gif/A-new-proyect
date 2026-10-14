/**
 * @file NotionWorkspaceExporterModal.tsx
 * @description Conector y Exportador de Guías Deconstruidas hacia Notion Workspace.
 * Permite transformar guías académicas con fórmulas LaTeX y preguntas generadas
 * en bloques oficiales de Notion (Heading, Callouts, Equation Blocks, To-Do items)
 * con simulación interactiva y conexión de credenciales Notion Token / Database ID.
 * Función 153 del catálogo de arquitectura.
 */

import React, { useState } from 'react';
import { CheckCircle2, Copy, Send, Database, Key } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NotionWorkspaceExporterModalProps {
  guideTitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const NotionWorkspaceExporterModal: React.FC<NotionWorkspaceExporterModalProps> = ({
  guideTitle = 'Guía Deconstruida: Cinemática y Dinámica Newtoniana',
  isOpen,
  onClose
}) => {
  const { user } = useAuth();
  const [apiKey, setApiKey] = useState<string>('');
  const [databaseId, setDatabaseId] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);

  if (!isOpen) return null;

  // Estructura de bloques en formato estándar Notion API Block Object
  const notionBlocksPreview = {
    parent: { database_id: databaseId || 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
    properties: {
      Title: {
        title: [{ text: { content: guideTitle } }]
      },
      Estudiante: {
        select: { name: user?.full_name || 'Estudiante Activo' }
      },
      Estado: {
        status: { name: 'En Estudio' }
      }
    },
    children: [
      {
        object: 'block',
        type: 'heading_1',
        heading_1: {
          rich_text: [{ type: 'text', text: { content: 'Resumen Ejecutivo & Conceptos Clave' } }]
        }
      },
      {
        object: 'block',
        type: 'callout',
        callout: {
          rich_text: [{ type: 'text', text: { content: 'Guardarraíl Cognitivo Activo: Sin fórmulas inventadas ni conceptos fuera de programa.' } }],
          icon: { emoji: '🎯' }
        }
      },
      {
        object: 'block',
        type: 'equation',
        equation: { expression: 'F_{neta} = m \\cdot a = \\frac{dp}{dt}' }
      },
      {
        object: 'block',
        type: 'to_do',
        to_do: {
          rich_text: [{ type: 'text', text: { content: 'Repasar 10 reactivos en Modo Muerte Súbita' } }],
          checked: false
        }
      }
    ]
  };

  const handleExport = () => {
    setIsExporting(true);
    // Simulación de despacho a API Notion o copia a portapapeles
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
    }, 1200);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(notionBlocksPreview, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-lg w-full p-6 space-y-5">
        {/* Header del Modal */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 border border-slate-200 font-bold">
              N
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Exportar a Notion Workspace
              </h3>
              <p className="text-xs text-slate-500">
                Inyección de bloques estructurados, LaTeX y tareas en tu Notion
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm font-semibold p-1"
          >
            ✕
          </button>
        </div>

        {/* Guía a Exportar */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
            Documento Seleccionado:
          </span>
          <span className="font-semibold text-slate-800">{guideTitle}</span>
        </div>

        {/* Configuración de Credenciales */}
        <div className="space-y-3 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5 mb-1">
              <Key className="w-3.5 h-3.5 text-slate-500" />
              <span>Notion Internal Integration Token (Opcional):</span>
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5 mb-1">
              <Database className="w-3.5 h-3.5 text-slate-500" />
              <span>Database ID de Destino:</span>
            </label>
            <input
              type="text"
              value={databaseId}
              onChange={(e) => setDatabaseId(e.target.value)}
              placeholder="32 caracteres hex del enlace de la base Notion"
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Previsualización del Payload de Bloques */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Estructura de Bloques Notion (API Payload):</span>
            <button
              onClick={handleCopyJson}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              <span>{copiedPayload ? '¡Copiado!' : 'Copiar JSON'}</span>
            </button>
          </div>
          <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl text-[10px] font-mono overflow-x-auto max-h-32 border border-slate-800">
            {JSON.stringify(notionBlocksPreview, null, 2)}
          </pre>
        </div>

        {/* Notificación de Éxito */}
        {exportSuccess && (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Página formateada y preparada para sincronización con tu Notion Database.</span>
          </div>
        )}

        {/* Acciones */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl"
          >
            Cerrar
          </button>
          <button
            disabled={isExporting}
            onClick={handleExport}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Sincronizando...' : 'Exportar a Notion'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
