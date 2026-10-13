/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - MODAL DE RESPALDO Y RESTAURACIÓN TOTAL
 * ==============================================================================
 * Componente: BackupRestoreModal.tsx
 * Estética: Apple Minimalist (bg-white, rounded-2xl, Azul Cobalto #0F52BA)
 * ==============================================================================
 */

import React, { useState, useRef } from 'react';
import {
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  HardDrive,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { backupRestoreService } from '../../services/backupRestoreService';

interface BackupRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackupRestoreModal: React.FC<BackupRestoreModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isOpen) return null;

  const handleExport = async () => {
    if (!user) return;
    setIsExporting(true);
    setFeedback(null);
    try {
      const payload = await backupRestoreService.exportFullBackup(user);
      backupRestoreService.downloadBackupFile(payload);
      setFeedback({
        type: 'success',
        message: 'Archivo de respaldo descargado exitosamente en tu navegador.',
      });
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.message || 'Error al exportar los datos.',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setFeedback(null);
    try {
      const text = await file.text();
      const payload = JSON.parse(text);
      const result = await backupRestoreService.restoreFromBackup(payload, user?.id);
      setFeedback({
        type: 'success',
        message: result.message,
      });
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: `Fallo al importar el archivo: ${err.message}`,
      });
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0F52BA] flex items-center justify-center">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Respaldo y Portabilidad de Datos
              </h3>
              <p className="text-xs text-slate-500">
                Exporta o restaura todas tus tareas, guías y notas en formato JSON estándar.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {feedback && (
            <div
              className={`p-4 rounded-xl text-xs font-medium flex items-start gap-2.5 ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Opción 1: Exportar */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                  <Download className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">Descargar Copia de Seguridad</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Guarda un archivo `.json` con tus tareas, exámenes, configuraciones y materias.
                </p>
              </div>

              <button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full py-2.5 px-3 rounded-xl bg-[#0F52BA] hover:bg-[#0c4194] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Generando...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar JSON</span>
                  </>
                )}
              </button>
            </div>

            {/* Opción 2: Importar */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                  <Upload className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">Restaurar desde Respaldo</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Carga un archivo de respaldo previo para sincronizar tu cuenta o trabajar offline.
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isImporting}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                {isImporting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Restaurando...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir Archivo</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupRestoreModal;
