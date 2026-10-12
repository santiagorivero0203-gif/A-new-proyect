import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import type { UserDocument } from '../../types';
import {
  FileTextIcon,
  TrashIcon,
  DownloadIcon,
  SearchIcon,
  SparklesIcon,
  EyeIcon,
  XIcon,
} from '../common/Icons';

interface DocumentGalleryProps {
  onSelectDocument?: (doc: UserDocument) => void;
  filterTag?: string;
  refreshTrigger?: number;
}

/**
 * Galería y Listado de Documentos Almacenados en Supabase Storage & PostgreSQL
 * Soporta previsualización de imágenes, filtrado por materias/tags y descarga de PDFs.
 */
export const DocumentGallery: React.FC<DocumentGalleryProps> = ({
  onSelectDocument,
  filterTag,
  refreshTrigger = 0,
}) => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>(filterTag || 'TODOS');
  const [previewImage, setPreviewImage] = useState<UserDocument | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchDocuments = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const docs = await storageService.getUserDocuments(user.id);
      setDocuments(docs);
    } catch (err) {
      console.error('Error cargando documentos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [user, refreshTrigger]);

  const handleDelete = async (docId: string) => {
    if (!user) return;
    if (!window.confirm('¿Seguro que deseas eliminar este documento del almacenamiento?')) {
      return;
    }

    setDeletingId(docId);
    try {
      await storageService.deleteDocument(docId, user.id);
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
    } catch (err) {
      console.error('Error al eliminar:', err);
    } finally {
      setDeletingId(null);
    }
  };

  // Extraer todos los tags disponibles
  const allTags = ['TODOS', ...Array.from(new Set(documents.flatMap((d) => d.tags || [])))];

  // Filtrado de documentos
  const filteredDocuments = documents.filter((doc) => {
    const matchesTag =
      selectedTag === 'TODOS' || (doc.tags && doc.tags.includes(selectedTag));
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  const formatFileSize = (bytes?: number | null) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Input de Búsqueda */}
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título, contenido o apunte..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Tags Filtros */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-slate-900 text-white shadow-soft-sm font-semibold'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Estado de Carga */}
      {isLoading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500">Consultando almacenamiento en Supabase...</p>
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3 text-lg">
            📂
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">
            No se encontraron documentos
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery || selectedTag !== 'TODOS'
              ? 'Intenta con otro término de búsqueda o limpia los filtros.'
              : 'Aún no has subido apuntes ni archivos. Utiliza la pestaña superior para cargar tu primer documento.'}
          </p>
        </div>
      ) : (
        /* Cuadrícula de Documentos */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocuments.map((doc) => {
            const isImage = doc.file_type.startsWith('image/');
            const isPdf = doc.file_type === 'application/pdf';

            return (
              <div
                key={doc.id}
                className="app-card overflow-hidden flex flex-col justify-between hover:shadow-soft transition-all group border border-slate-200/80"
              >
                {/* Cabecera / Miniatura */}
                {isImage ? (
                  <div className="relative aspect-video bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setPreviewImage(doc)}>
                    <img
                      src={doc.file_path}
                      alt={doc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                      <EyeIcon className="w-4 h-4" />
                      <span>Ver imagen completa</span>
                    </div>
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-700 shadow-soft-sm">
                      FOTO / APUNTE
                    </span>
                  </div>
                ) : (
                  <div className="p-5 pb-3 bg-gradient-to-br from-blue-50/50 to-slate-50 border-b border-slate-100 flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shadow-soft-sm shrink-0">
                      <FileTextIcon className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-bold text-slate-600 border border-slate-200">
                      {isPdf ? 'DOCUMENTO PDF' : 'ARCHIVO'}
                    </span>
                  </div>
                )}

                {/* Contenido */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                      {doc.title}
                    </h4>
                    {doc.description && (
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  {/* Etiquetas */}
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Metadatos y Acciones */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{formatFileSize(doc.file_size_bytes)}</span>
                    <span>{formatDate(doc.created_at)}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    {isImage ? (
                      <button
                        onClick={() => setPreviewImage(doc)}
                        className="btn-secondary text-[11px] py-1.5 px-3 flex-1 flex items-center justify-center gap-1.5"
                      >
                        <EyeIcon className="w-3.5 h-3.5 text-blue-600" />
                        <span>Visualizar</span>
                      </button>
                    ) : (
                      <a
                        href={doc.file_path}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary text-[11px] py-1.5 px-3 flex-1 flex items-center justify-center gap-1.5"
                      >
                        <DownloadIcon className="w-3.5 h-3.5 text-blue-600" />
                        <span>Abrir PDF</span>
                      </a>
                    )}

                    {onSelectDocument && (
                      <button
                        onClick={() => onSelectDocument(doc)}
                        className="btn-primary text-[11px] py-1.5 px-3 flex items-center justify-center gap-1"
                      >
                        <SparklesIcon className="w-3 h-3" />
                        <span>Vincular</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(doc.id)}
                      disabled={deletingId === doc.id}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Eliminar documento"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Previsualización de Imagen en Alta Resolución */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-white rounded-3xl p-4 sm:p-6 max-w-3xl w-full border border-slate-200 shadow-soft-lg space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{previewImage.title}</h3>
                <p className="text-[11px] text-slate-500">
                  {formatFileSize(previewImage.file_size_bytes)} • {formatDate(previewImage.created_at)}
                </p>
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={previewImage.file_path}
                alt={previewImage.title}
                className="w-full max-h-[60vh] object-contain mx-auto"
              />
            </div>

            {previewImage.description && (
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {previewImage.description}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <a
                href={previewImage.file_path}
                download={previewImage.title}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span>Descargar Original</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
