/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - ESTACIÓN DE SUBIDA DE DOCUMENTOS (IA NEXUS)
 * ==============================================================================
 * Componente: UploadStation.tsx / UploadStation.jsx
 * Estética: Apple-inspired (bg-slate-50, contenedores blancos suaves, Azul Cobalto #0F52BA)
 * Funcionalidades:
 * 1. Zona Drag-and-Drop y selector de archivos (Imágenes/PDFs).
 * 2. Inputs para Asignatura (Materia) y Tema.
 * 3. Subida a Supabase Storage (bucket user_documents / documents con timestamp único).
 * 4. Inserción de registro en la tabla ai_processing_queue (status: 'queued').
 * 5. Escucha en tiempo real vía Supabase Realtime (postgres_changes sobre la fila).
 * 6. Transición visual elegante (Pulso de Nexus -> Botón "Ver Guía y Examen" al completarse).
 * ==============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  BookOpen,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

// Bucket predeterminado según la arquitectura de Supabase Storage
const PRIMARY_BUCKET = 'user_documents';
const FALLBACK_BUCKET = 'documents';

export interface UploadStationProps {
  /**
   * Callback invocado cuando la deconstrucción finaliza y el estudiante pulsa "Ver Guía y Examen"
   */
  onViewGuideAndExam?: (data: {
    queueId: string;
    topicTitle: string;
    documentUrl: string;
    subject: string;
    topic: string;
  }) => void;
  /**
   * Clase CSS opcional para el contenedor exterior
   */
  className?: string;
}

type StationState = 'idle' | 'uploading' | 'processing' | 'completed' | 'error';

export const UploadStation: React.FC<UploadStationProps> = ({
  onViewGuideAndExam,
  className = '',
}) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados del formulario
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Estados del ciclo de vida de procesamiento
  const [stationState, setStationState] = useState<StationState>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentQueueId, setCurrentQueueId] = useState<string | null>(null);
  const [uploadedDocUrl, setUploadedDocUrl] = useState<string | null>(null);

  // Formato legible de tamaño de archivo
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Manejo de selección de archivo con validación
  const handleFileSelect = (file: File) => {
    setErrorMessage(null);
    const validTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
    ];

    if (!validTypes.includes(file.type)) {
      setErrorMessage(
        'Formato no compatible. Por favor sube una imagen (PNG, JPG, WEBP) o un documento PDF.'
      );
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage('El archivo excede el tamaño máximo permitido de 20 MB.');
      return;
    }

    setSelectedFile(file);

    // Si es imagen, generar vista previa en memoria
    if (file.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);
    } else {
      setFilePreview(null);
    }

    // Sugerencia automática de tema a partir del nombre del archivo si está vacío
    if (!topic) {
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[_-]/g, ' ')
        .trim();
      setTopic(cleanName);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ----------------------------------------------------------------------------
  // EFECTO REALTIME: Suscripción a cambios en la tabla ai_processing_queue
  // ----------------------------------------------------------------------------
  useEffect(() => {
    if (!currentQueueId || stationState !== 'processing') return;

    console.log(
      `[UploadStation Realtime] Iniciando suscripción para fila: ${currentQueueId}`
    );

    const channelName = `realtime-ai-queue-${currentQueueId}`;

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'ai_processing_queue',
          filter: `id=eq.${currentQueueId}`,
        },
        (payload) => {
          console.log('[UploadStation Realtime] Cambio detectado:', payload);
          const updatedRow = payload.new as {
            id: string;
            status: string;
            error_message?: string;
          };

          if (updatedRow && updatedRow.status === 'completed') {
            setStationState('completed');
            // Celebración háptica visual Apple-style
            try {
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#0F52BA', '#3b82f6', '#60a5fa', '#93c5fd'],
              });
            } catch {
              // Confetti no disponible
            }
          } else if (updatedRow && updatedRow.status === 'failed') {
            setStationState('error');
            setErrorMessage(
              updatedRow.error_message ||
                'Nexus encontró un error al analizar el documento. Intenta nuevamente.'
            );
          }
        }
      )
      .subscribe((status) => {
        console.log(`[UploadStation Realtime] Estado de canal: ${status}`);
      });

    // Sondeo de respaldo (Poller cada 5s por si el websocket pierde conexión)
    const backupPoller = setInterval(async () => {
      try {
        const { data } = await (supabase.from('ai_processing_queue') as any)
          .select('status, error_message')
          .eq('id', currentQueueId)
          .single();

        if (data && data.status === 'completed') {
          setStationState('completed');
          clearInterval(backupPoller);
        } else if (data && data.status === 'failed') {
          setStationState('error');
          setErrorMessage(data.error_message || 'Fallo durante el procesamiento.');
          clearInterval(backupPoller);
        }
      } catch {
        // Ignorar fallas de sondeo silencioso
      }
    }, 5000);

    return () => {
      console.log(`[UploadStation Realtime] Limpiando suscripción: ${channelName}`);
      supabase.removeChannel(channel);
      clearInterval(backupPoller);
    };
  }, [currentQueueId, stationState]);

  // ----------------------------------------------------------------------------
  // ACCIÓN PRINCIPAL: Subida al Storage e Inserción en la Cola
  // ----------------------------------------------------------------------------
  const handleAnalyzeWithAI = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setErrorMessage('Por favor selecciona un archivo PDF o imagen.');
      return;
    }
    if (!subject.trim()) {
      setErrorMessage('Por favor ingresa la materia (ej: Física I, Álgebra Lineal).');
      return;
    }
    if (!topic.trim()) {
      setErrorMessage('Por favor ingresa el tema específico a analizar.');
      return;
    }

    setErrorMessage(null);
    setStationState('uploading');
    setUploadProgress(15);

    try {
      // 1. Resolver ID del usuario (autenticado o fallback para pruebas)
      let userId = user?.id;
      if (!userId) {
        const { data: authData } = await supabase.auth.getUser();
        userId = authData?.user?.id;
      }

      if (!userId) {
        throw new Error(
          'Debes iniciar sesión con tu cuenta estudiantil para enviar documentos al procesador de IA.'
        );
      }

      // 2. Preparar ruta de almacenamiento segura: {user_id}/{timestamp}_{nombre_sanitizado}
      const sanitizedName = selectedFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const timestamp = Date.now();
      const storageFilePath = `${userId}/${timestamp}_${sanitizedName}`;

      setUploadProgress(40);

      // 3. Subir archivo al bucket de Supabase Storage (con tolerancia a user_documents o documents)
      let uploadTargetBucket = PRIMARY_BUCKET;
      let uploadResult = await supabase.storage
        .from(uploadTargetBucket)
        .upload(storageFilePath, selectedFile, {
          cacheControl: '3600',
          upsert: false,
        });

      // Si falla por bucket no encontrado, intentar con FALLBACK_BUCKET
      if (uploadResult.error && uploadResult.error.message?.includes('bucket')) {
        uploadTargetBucket = FALLBACK_BUCKET;
        uploadResult = await supabase.storage
          .from(uploadTargetBucket)
          .upload(storageFilePath, selectedFile, {
            cacheControl: '3600',
            upsert: false,
          });
      }

      if (uploadResult.error) {
        throw new Error(
          `Error al subir a Supabase Storage (${uploadTargetBucket}): ${uploadResult.error.message}`
        );
      }

      setUploadProgress(75);

      // 4. Obtener URL pública o firmada del archivo
      const { data: urlData } = supabase.storage
        .from(uploadTargetBucket)
        .getPublicUrl(storageFilePath);

      const finalDocumentUrl = urlData?.publicUrl || storageFilePath;
      setUploadedDocUrl(finalDocumentUrl);

      // 5. Insertar en la cola ai_processing_queue
      const combinedTitle = `${subject.trim()}: ${topic.trim()}`;

      const { data: queueData, error: queueError } = await (supabase
        .from('ai_processing_queue') as any)
        .insert({
          user_id: userId,
          topic_title: combinedTitle,
          document_url: finalDocumentUrl,
          status: 'queued',
          metadata: {
            subject: subject.trim(),
            topic: topic.trim(),
            file_name: selectedFile.name,
            file_size: selectedFile.size,
            file_type: selectedFile.type,
            storage_bucket: uploadTargetBucket,
            storage_path: storageFilePath,
            uploaded_at: new Date().toISOString(),
          },
        })
        .select()
        .single();

      if (queueError) {
        throw new Error(`Error al registrar en la cola de IA: ${queueError.message}`);
      }

      setUploadProgress(100);
      setCurrentQueueId(queueData.id);
      setStationState('processing');
    } catch (err: any) {
      console.error('[UploadStation Error]:', err);
      setStationState('error');
      setErrorMessage(
        err.message || 'Ocurrió un error inesperado durante la subida del archivo.'
      );
    }
  };

  // Reiniciar estado para subir un nuevo documento
  const handleReset = () => {
    handleRemoveFile();
    setSubject('');
    setTopic('');
    setStationState('idle');
    setUploadProgress(0);
    setErrorMessage(null);
    setCurrentQueueId(null);
    setUploadedDocUrl(null);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Contenedor Principal: Filosofía Apple-inspired */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-300">
        
        {/* Encabezado Sutil */}
        <div className="px-8 pt-8 pb-6 border-b border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F52BA] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-600">
                Nexus AI Studio
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
              Estación de Deconstrucción
            </h2>
            <p className="text-sm text-slate-500 font-normal">
              Sube fotos de pizarras, apuntes o guías PDF. Nexus los convertirá en teoría con LaTeX y exámenes.
            </p>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* ESTADO 1: FORMULARIO Y SELECCIÓN DE DOCUMENTOS (IDLE / UPLOADING)   */}
        {/* ==================================================================== */}
        {(stationState === 'idle' || stationState === 'uploading') && (
          <form onSubmit={handleAnalyzeWithAI} className="p-8 space-y-6">
            {/* Mensaje de Error si aplica */}
            {errorMessage && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200/80 text-red-700 text-sm animate-in fade-in">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                <div className="flex-1">
                  <p className="font-medium">No se pudo iniciar el análisis</p>
                  <p className="text-xs text-red-600/90 mt-0.5">{errorMessage}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Inputs de Materia y Tema */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Materia / Asignatura
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ej: Física I, Álgebra, Química"
                  disabled={stationState === 'uploading'}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA] transition-all disabled:opacity-60"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Tema Específico
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ej: Cinemática, Leyes de Newton"
                  disabled={stationState === 'uploading'}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA] transition-all disabled:opacity-60"
                  required
                />
              </div>
            </div>

            {/* Zona de Drop / Selección de Archivo */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Material de Estudio (Foto o PDF)
              </label>

              {!selectedFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all duration-200 ${
                    isDragOver
                      ? 'border-[#0F52BA] bg-blue-50/50 scale-[1.01]'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,application/pdf"
                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                    className="hidden"
                  />

                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-[#0F52BA] group-hover:scale-105 transition-transform">
                      <UploadCloud className="w-7 h-7" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Arrastra tu archivo aquí o{' '}
                        <span className="text-[#0F52BA] hover:underline">explora tus carpetas</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Fotos de pizarra (JPG, PNG, WEBP) o documentos PDF hasta 20 MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Archivo Seleccionado con Vista Previa */
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {filePreview ? (
                      <img
                        src={filePreview}
                        alt="Vista previa"
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-blue-100/80 border border-blue-200 text-[#0F52BA] flex items-center justify-center shrink-0">
                        <FileText className="w-7 h-7" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {formatFileSize(selectedFile.size)} •{' '}
                        {selectedFile.type.includes('pdf') ? 'Documento PDF' : 'Imagen de estudio'}
                      </p>
                    </div>
                  </div>

                  {stationState !== 'uploading' && (
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white transition-colors shrink-0"
                      title="Eliminar archivo"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Barra de progreso si está subiendo */}
            {stationState === 'uploading' && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0F52BA]" />
                    Subiendo archivo a Supabase Storage...
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0F52BA] transition-all duration-300 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Botón de Acción Principal */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={
                  !selectedFile ||
                  !subject.trim() ||
                  !topic.trim() ||
                  stationState === 'uploading'
                }
                className="w-full py-3.5 px-6 rounded-xl font-medium text-sm text-white bg-[#0F52BA] hover:bg-[#0c4194] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                {stationState === 'uploading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Registrando en cola...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Analizar con IA
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ==================================================================== */}
        {/* ESTADO 2: CARGA ELEGANTE / PROCESAMIENTO ACTIVO (SUPABASE REALTIME)  */}
        {/* ==================================================================== */}
        {stationState === 'processing' && (
          <div className="p-10 sm:p-14 text-center space-y-6">
            {/* Animación Apple de Pulso Concétrico */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-60" />
              <span className="absolute inset-2 rounded-full bg-blue-50 border border-blue-200 animate-pulse" />
              <div className="relative w-16 h-16 rounded-full bg-[#0F52BA] text-white flex items-center justify-center shadow-lg shadow-[#0F52BA]/25">
                <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-semibold text-[#0F52BA]">
                <span className="w-2 h-2 rounded-full bg-[#0F52BA] animate-pulse" />
                Vigilancia Realtime Activa
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Nexus está analizando y deconstruyendo el material...
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Extrayendo teoría formal en LaTeX, glosario esencial, fórmulas paso a paso y generando
                la batería de preguntas para tu simulador.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 max-w-sm mx-auto text-left space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Asignatura:</span>
                <span className="font-semibold text-slate-800">{subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tema:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[180px]">{topic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estado de cola:</span>
                <span className="font-medium text-amber-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  queued (procesando)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ESTADO 3: PROCESAMIENTO COMPLETADO CON ÉXITO                         */}
        {/* ==================================================================== */}
        {stationState === 'completed' && (
          <div className="p-10 sm:p-14 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                ¡Guía y Examen Deconstruidos!
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Nexus y Gemini Spark han estructurado la teoría de <strong className="text-slate-700">{topic}</strong> con
                fórmulas matemáticas completas y cargado las preguntas al banco de exámenes.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (onViewGuideAndExam && currentQueueId) {
                    onViewGuideAndExam({
                      queueId: currentQueueId,
                      topicTitle: `${subject} - ${topic}`,
                      documentUrl: uploadedDocUrl || '',
                      subject,
                      topic,
                    });
                  }
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium text-sm text-white bg-[#0F52BA] hover:bg-[#0c4194] shadow-md shadow-[#0F52BA]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <BookOpen className="w-4 h-4" />
                Ver Guía y Examen
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Subir otro documento
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ESTADO 4: ERROR CON OPCIÓN DE REINTENTO                               */}
        {/* ==================================================================== */}
        {stationState === 'error' && (
          <div className="p-10 sm:p-14 text-center space-y-6 animate-in fade-in">
            <div className="w-20 h-20 rounded-2xl bg-red-50 border border-red-200 text-red-600 mx-auto flex items-center justify-center shadow-sm">
              <AlertCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Ocurrió un problema
              </h3>
              <p className="text-sm text-red-600 bg-red-50/60 p-3 rounded-xl border border-red-100 leading-relaxed">
                {errorMessage || 'No se pudo completar el procesamiento del documento.'}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStationState('idle')}
                className="px-6 py-3 rounded-xl font-medium text-sm text-white bg-slate-900 hover:bg-slate-800 transition-all inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reintentar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UploadStation;
