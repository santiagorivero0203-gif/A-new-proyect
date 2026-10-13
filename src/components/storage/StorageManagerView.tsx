import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import { DocumentUploader } from './DocumentUploader';
import { DocumentGallery } from './DocumentGallery';
import type { UserDocument } from '../../types';
import type { Question } from '../../types/exam.types';
import {
  UploadCloudIcon,
  FileTextIcon,
  SparklesIcon,
} from '../common/Icons';

interface StorageManagerViewProps {
  onStartExamWithQuestions?: (questions: Question[], title: string) => void;
  onNavigateToGuides?: () => void;
}

/**
 * Gestor Integral de Documentos y Supabase Storage
 * Proporciona subida directa, galería organizada, extracción de temarios
 * y lanzamiento instantáneo de exámenes pedagógicos.
 */
export const StorageManagerView: React.FC<StorageManagerViewProps> = ({
  onStartExamWithQuestions,
  onNavigateToGuides,
}) => {
  const { user, isDemoMode } = useAuth();
  const [activeTab, setActiveTab] = useState<'GALLERY' | 'UPLOAD'>('GALLERY');
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const [stats, setStats] = useState({
    totalDocs: 0,
    totalMB: 0,
    imagesCount: 0,
    pdfCount: 0,
  });

  useEffect(() => {
    if (!user) return;
    const loadStats = async () => {
      try {
        const docs = await storageService.getUserDocuments(user.id);
        const totalBytes = docs.reduce((acc, d) => acc + (d.file_size_bytes || 0), 0);
        const images = docs.filter((d) => d.file_type.startsWith('image/')).length;
        const pdfs = docs.filter((d) => d.file_type === 'application/pdf').length;

        setStats({
          totalDocs: docs.length,
          totalMB: Number((totalBytes / (1024 * 1024)).toFixed(2)),
          imagesCount: images,
          pdfCount: pdfs,
        });
      } catch (err) {
        console.error('Error calculando estadísticas de almacenamiento:', err);
      }
    };

    loadStats();
  }, [user, refreshTrigger]);

  const handleUploadSuccess = (_doc: UserDocument) => {
    setRefreshTrigger((prev) => prev + 1);
    setActiveTab('GALLERY');
  };

  return (
    <div className="space-y-8">
      {/* Cabecera Principal */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold mb-2">
            <UploadCloudIcon className="w-3.5 h-3.5" />
            Supabase Storage & Google Gemini 2.5 Flash
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
            Almacén de Documentos & Apuntes
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl">
            Sube PDFs, fotos de la pizarra y apuntes en alta resolución. Analízalos con IA para generar bancos de preguntas automáticos.
          </p>
        </div>

        {/* Pestañas de Vista */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <div className="inline-flex p-1 bg-slate-200/70 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab('GALLERY')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'GALLERY'
                  ? 'bg-white text-slate-900 shadow-soft-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileTextIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>Mis Documentos ({stats.totalDocs})</span>
            </button>
            <button
              onClick={() => setActiveTab('UPLOAD')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'UPLOAD'
                  ? 'bg-white text-slate-900 shadow-soft-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UploadCloudIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>Subir Archivo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tarjetas de Métricas de Almacenamiento */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="app-card p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
            📁
          </div>
          <div>
            <p className="text-[11px] text-slate-500 font-medium">Archivos Totales</p>
            <h4 className="text-lg font-bold text-slate-900 font-mono leading-tight">
              {stats.totalDocs}
            </h4>
          </div>
        </div>

        <div className="app-card p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm shrink-0">
            💾
          </div>
          <div>
            <p className="text-[11px] text-slate-500 font-medium">Espacio Utilizado</p>
            <h4 className="text-lg font-bold text-slate-900 font-mono leading-tight">
              {stats.totalMB} <span className="text-xs text-slate-400 font-normal">MB</span>
            </h4>
          </div>
        </div>

        <div className="app-card p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">
            🖼️
          </div>
          <div>
            <p className="text-[11px] text-slate-500 font-medium">Fotos de Pizarra</p>
            <h4 className="text-lg font-bold text-slate-900 font-mono leading-tight">
              {stats.imagesCount}
            </h4>
          </div>
        </div>

        <div className="app-card p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm shrink-0">
            📑
          </div>
          <div>
            <p className="text-[11px] text-slate-500 font-medium">Guías en PDF</p>
            <h4 className="text-lg font-bold text-slate-900 font-mono leading-tight">
              {stats.pdfCount}
            </h4>
          </div>
        </div>
      </div>

      {/* Contenido según Pestaña Activa */}
      {activeTab === 'GALLERY' ? (
        <DocumentGallery
          refreshTrigger={refreshTrigger}
          onStartExamWithQuestions={onStartExamWithQuestions}
          onNavigateToGuides={onNavigateToGuides}
          onUploadClick={() => setActiveTab('UPLOAD')}
        />
      ) : (
        <div className="max-w-2xl mx-auto">
          <DocumentUploader onDocumentUploaded={handleUploadSuccess} />
        </div>
      )}

      {/* Banner de Sincronización con Supabase y Gemini */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            {isDemoMode
              ? 'Modo Demo activo: Los análisis de Gemini y documentos se persisten localmente en caché.'
              : 'Conexión activa con Supabase Storage (bucket `documents`) y tabla `user_documents`.'}
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-400">
          Gemini 2.5 Flash • Multimodal Ready
        </span>
      </div>
    </div>
  );
};
