import React, { useState, useRef } from 'react';
import { storageService } from '../../services/storageService';
import { useAuth } from '../../context/AuthContext';
import type { UserDocument } from '../../types';
import { SparklesIcon, CheckCircleIcon } from '../common/Icons';

interface DocumentUploaderProps {
  onDocumentUploaded: (doc: UserDocument) => void;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onDocumentUploaded }) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTag, setSelectedTag] = useState('Foto Pizarra');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const availableTags = [
    'Foto Pizarra',
    'Apuntes de Clase',
    'Guía PDF',
    'Física UCV',
    'Matemática',
    'Química',
    'Biología',
    'Castellano',
    'Entrega de Taller',
  ];

  const handleFileChange = (file: File) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const validation = storageService.validateFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Archivo inválido');
      return;
    }

    setSelectedFile(file);
    if (!title) {
      // Usar nombre de archivo sin extensión como título inicial
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      setTitle(baseName);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !user) return;

    setIsUploading(true);
    setUploadProgress(10);
    setErrorMessage(null);

    const result = await storageService.uploadDocument(
      {
        file: selectedFile,
        userId: user.id,
        title: title.trim() || selectedFile.name,
        description: description.trim(),
        tags: [selectedTag],
      },
      (pct) => setUploadProgress(pct)
    );

    setIsUploading(false);

    if (result.success && result.document) {
      setSuccessMessage('¡Documento subido y registrado exitosamente!');
      onDocumentUploaded(result.document);
      setSelectedFile(null);
      setTitle('');
      setDescription('');
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      setErrorMessage(result.error || 'Error al subir el archivo');
    }
  };

  return (
    <div className="app-card p-6 border border-slate-200/90 shadow-soft space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-display">
            Subir Documentos, Apuntes y Pizarras
          </h3>
          <p className="text-xs text-slate-500">
            Sube PDFs de guías o fotografías de la pizarra para almacenamiento seguro en Supabase Storage
          </p>
        </div>
        <span className="app-badge font-mono text-[11px]">Máx 15 MB</span>
      </div>

      {errorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Zona Drag & Drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center ${
          isDragOver
            ? 'border-blue-500 bg-blue-50/50'
            : selectedFile
            ? 'border-emerald-400 bg-emerald-50/20'
            : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
          onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
          className="hidden"
        />

        <div className="space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-soft-sm flex items-center justify-center mx-auto text-blue-600">
            {selectedFile ? '📄' : '☁️'}
          </div>

          {selectedFile ? (
            <div>
              <p className="text-sm font-bold text-slate-900 truncate max-w-sm mx-auto">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Listo para subir
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Arrastra tu PDF o fotografía aquí, o <span className="text-blue-600">haz clic para examinar</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Soporta PDFs, fotos de pizarras (PNG, JPG, WEBP) hasta 15 MB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Formulario de Metadatos si hay archivo seleccionado */}
      {selectedFile && (
        <form onSubmit={handleUploadSubmit} className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Título del Documento</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Apuntes de Cálculo Vectorial"
                className="input-clean text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Categoría / Etiqueta</label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="input-clean text-xs"
              >
                {availableTags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Descripción o Notas (Opcional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej. Ejercicios resueltos en el pizarrón por el profesor"
              className="input-clean text-xs"
            />
          </div>

          {/* Barra de Progreso */}
          {isUploading && (
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Subiendo a Supabase Storage...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              className="btn-secondary text-xs py-2 px-3.5"
              disabled={isUploading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="btn-brand text-xs py-2 px-5 flex items-center gap-2"
            >
              {isUploading ? (
                <span>Subiendo...</span>
              ) : (
                <>
                  <SparklesIcon className="w-3.5 h-3.5" />
                  <span>Guardar Documento</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
