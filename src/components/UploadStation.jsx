/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - ESTACIÓN DE SUBIDA DE DOCUMENTOS (IA NEXUS)
 * ==============================================================================
 * Archivo: UploadStation.jsx
 * Estética de Diseño: Apple-inspired (bg-slate-50, rounded-2xl, Azul Cobalto #0F52BA)
 * Arquitectura: Motor Dual Híbrido (Carril A Auto API + Carril B Spark MCP)
 * Calibración: Guardarraíl de Nivel Cognitivo y Anclaje Estricto Anti-Alucinación
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
  Zap,
  Brain,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import {
  mapProfileToAcademicLevel,
  PEDAGOGICAL_GUARDRAILS
} from '../lib/pedagogicalPrompts';

const PRIMARY_BUCKET = 'user_documents';
const FALLBACK_BUCKET = 'documents';

export const UploadStation = ({ onViewGuideAndExam, className = '' }) => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  // Estados del formulario básico
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Estados del Motor Dual Híbrido y Nivel Cognitivo
  const [routingMode, setRoutingMode] = useState('auto_api'); // 'auto_api' | 'spark_mcp'
  const [academicLevel, setAcademicLevel] = useState(() =>
    mapProfileToAcademicLevel(user?.academic_profile)
  );

  // Actualizar el nivel por defecto cuando cambia el perfil del usuario activo
  useEffect(() => {
    if (user?.academic_profile) {
      setAcademicLevel(mapProfileToAcademicLevel(user.academic_profile));
    }
  }, [user?.academic_profile]);

  // Estados del ciclo de vida
  const [stationState, setStationState] = useState('idle'); // 'idle' | 'uploading' | 'processing' | 'completed' | 'error'
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentQueueId, setCurrentQueueId] = useState(null);
  const [uploadedDocUrl, setUploadedDocUrl] = useState(null);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileSelect = (file) => {
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

    if (file.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);
    } else {
      setFilePreview(null);
    }

    if (!topic) {
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[_-]/g, ' ')
        .trim();
      setTopic(cleanName);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
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
  // SUSCRIPCIÓN EN TIEMPO REAL VÍA SUPABASE REALTIME
  // ----------------------------------------------------------------------------
  useEffect(() => {
    if (!currentQueueId || stationState !== 'processing') return;

    console.log(`[UploadStation Realtime] Suscribiéndose a fila ${currentQueueId}`);
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
          console.log('[UploadStation Realtime] Evento recibido:', payload);
          const updatedRow = payload.new;

          if (updatedRow && updatedRow.status === 'completed') {
            setStationState('completed');
            try {
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#0F52BA', '#3b82f6', '#60a5fa', '#93c5fd'],
              });
            } catch {
              // fallback
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
      .subscribe();

    // Sondeo de respaldo cada 4s
    const poller = setInterval(async () => {
      try {
        const { data } = await supabase
          .from('ai_processing_queue')
          .select('status, error_message')
          .eq('id', currentQueueId)
          .single();

        if (data && data.status === 'completed') {
          setStationState('completed');
          clearInterval(poller);
        } else if (data && data.status === 'failed') {
          setStationState('error');
          setErrorMessage(data.error_message || 'Fallo durante el procesamiento.');
          clearInterval(poller);
        }
      } catch {
        // Sondeo silencioso
      }
    }, 4000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(poller);
    };
  }, [currentQueueId, stationState]);

  // ----------------------------------------------------------------------------
  // SUBIDA Y ENRUTAMIENTO INTELIGENTE (AUTO_API vs SPARK_MCP)
  // ----------------------------------------------------------------------------
  const handleAnalyzeWithAI = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setErrorMessage('Por favor selecciona un archivo PDF o imagen.');
      return;
    }
    if (!subject.trim()) {
      setErrorMessage('Por favor ingresa la materia (ej: Física I, Álgebra).');
      return;
    }
    if (!topic.trim()) {
      setErrorMessage('Por favor ingresa el tema a analizar.');
      return;
    }

    setErrorMessage(null);
    setStationState('uploading');
    setUploadProgress(20);

    try {
      let userId = user?.id;
      if (!userId) {
        const { data: authData } = await supabase.auth.getUser();
        userId = authData?.user?.id;
      }

      if (!userId) {
        throw new Error('Debes iniciar sesión para procesar documentos con la IA.');
      }

      const sanitizedName = selectedFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const timestamp = Date.now();
      const storageFilePath = `${userId}/${timestamp}_${sanitizedName}`;

      setUploadProgress(45);

      // Subir archivo al bucket de Supabase Storage
      let uploadTargetBucket = PRIMARY_BUCKET;
      let uploadResult = await supabase.storage
        .from(uploadTargetBucket)
        .upload(storageFilePath, selectedFile, {
          cacheControl: '3600',
          upsert: false,
        });

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
          `Error en Supabase Storage (${uploadTargetBucket}): ${uploadResult.error.message}`
        );
      }

      setUploadProgress(75);

      // Obtener URL del archivo
      const { data: urlData } = supabase.storage
        .from(uploadTargetBucket)
        .getPublicUrl(storageFilePath);

      const finalDocumentUrl = urlData?.publicUrl || storageFilePath;
      setUploadedDocUrl(finalDocumentUrl);

      // Insertar en ai_processing_queue con routing_mode y academic_level
      const combinedTitle = `${subject.trim()}: ${topic.trim()}`;

      const { data: queueData, error: queueError } = await supabase
        .from('ai_processing_queue')
        .insert({
          user_id: userId,
          topic_title: combinedTitle,
          document_url: finalDocumentUrl,
          status: 'queued',
          processing_mode: routingMode,
          routing_mode: routingMode,
          academic_level: academicLevel,
          metadata: {
            subject: subject.trim(),
            topic: topic.trim(),
            academic_level: academicLevel,
            routing_mode: routingMode,
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
        throw new Error(`Error en la cola de IA: ${queueError.message}`);
      }

      setUploadProgress(100);
      setCurrentQueueId(queueData.id);
      setStationState('processing');

      // Carril A: Si es Modo Instantáneo (auto_api), disparar de inmediato /api/nexus-worker
      if (routingMode === 'auto_api') {
        fetch('/api/nexus-worker', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'process_queue',
            queueId: queueData.id,
          }),
        })
          .then(async (res) => {
            if (!res.ok) {
              const errJson = await res.json().catch(() => ({}));
              console.warn('[UploadStation] Nexus worker retornó status no ok:', errJson);
            }
          })
          .catch((workerErr) => {
            console.warn('[UploadStation] Disparo autónomo a nexus-worker:', workerErr);
          });
      }
    } catch (err) {
      console.error('[UploadStation Error]:', err);
      setStationState('error');
      setErrorMessage(
        err.message || 'Ocurrió un error inesperado al subir el documento.'
      );
    }
  };

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

  const activeGuardrail = PEDAGOGICAL_GUARDRAILS[academicLevel] || PEDAGOGICAL_GUARDRAILS.BASICO_ESCOLAR;

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Contenedor Principal Apple-inspired */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-300">
        
        {/* Encabezado */}
        <div className="px-8 pt-8 pb-6 border-b border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F52BA] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-600">
                Nexus AI Studio • Motor Dual Híbrido
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
              Estación de Deconstrucción
            </h2>
            <p className="text-sm text-slate-500 font-normal">
              Sube fotos de pizarras o guías PDF. Nexus las deconstruirá según tu perfil académico sin inventar asignaturas ajenas.
            </p>
          </div>
        </div>

        {/* 1. SELECCIÓN Y CONFIGURACIÓN */}
        {(stationState === 'idle' || stationState === 'uploading') && (
          <form onSubmit={handleAnalyzeWithAI} className="p-8 space-y-6">
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

            {/* SELECTOR DE MOTOR DUAL: AUTO API VS SPARK MCP */}
            <div className="space-y-2.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Carril de Procesamiento de IA
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Carril A: Instantáneo */}
                <button
                  type="button"
                  onClick={() => setRoutingMode('auto_api')}
                  className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    routingMode === 'auto_api'
                      ? 'border-[#0F52BA] bg-blue-50/50 shadow-sm ring-1 ring-[#0F52BA]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                      <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                      ⚡ Modo Instantáneo
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      3 a 8s • 0 clics
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">
                    Ejecuta <span className="font-mono text-slate-600">/api/nexus-worker</span> al instante con Gemini 2.5 Flash en la nube.
                  </p>
                </button>

                {/* Carril B: Spark Pro */}
                <button
                  type="button"
                  onClick={() => setRoutingMode('spark_mcp')}
                  className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    routingMode === 'spark_mcp'
                      ? 'border-[#0F52BA] bg-blue-50/50 shadow-sm ring-1 ring-[#0F52BA]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                      <Brain className="w-4 h-4 text-purple-600" />
                      🧠 Análisis Profundo (Spark Pro)
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                      MCP • Modelo 3.8
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">
                    Encola para revisión manual exhaustiva en tu sesión de Gemini Spark con rescate automático a los 30 min.
                  </p>
                </button>
              </div>
            </div>

            {/* SELECTOR DE NIVEL COGNITIVO DEL MATERIAL */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Nivel Cognitivo del Material
                </label>
                <span className="text-[11px] text-blue-600 font-medium flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Perfil activo: {activeGuardrail.badge}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'BASICO_ESCOLAR', title: '1er-3er Año', subtitle: 'Escolar Básico', icon: '📘' },
                  { id: 'BACHILLERATO_AVANZADO', title: '4to-5to Año', subtitle: 'Admisión', icon: '🎯' },
                  { id: 'UNIVERSITARIO_EXACTAS', title: 'Exactas', subtitle: 'Física/Cálculo', icon: '🔬' },
                  { id: 'UNIVERSITARIO_DISENO', title: 'Diseño', subtitle: 'Humanidades', icon: '🎨' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAcademicLevel(item.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      academicLevel === item.id
                        ? 'border-[#0F52BA] bg-blue-50/70 text-blue-900 font-bold shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <span className="text-base block mb-0.5">{item.icon}</span>
                    <span className="text-xs block leading-tight">{item.title}</span>
                    <span className="text-[10px] text-slate-400 block">{item.subtitle}</span>
                  </button>
                ))}
              </div>

              {/* Guardarraíl Anti-Alucinación Activo */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Guardarraíl Activo: </span>
                  {activeGuardrail.description}
                  {academicLevel === 'BASICO_ESCOLAR' && (
                    <span className="text-blue-700 block mt-0.5 font-medium">
                      🛡️ Prohibido extrapolar a física o cálculo. Solo métodos escolares paso a paso con aritmética limpia.
                    </span>
                  )}
                  {academicLevel === 'UNIVERSITARIO_DISENO' && (
                    <span className="text-purple-700 block mt-0.5 font-medium">
                      🎨 Cero fórmulas numéricas inventadas. En su lugar se deconstruyen principios de composición visual.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* MATERIA Y TEMA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Materia / Asignatura
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ej: Matemáticas, Física I, Álgebra, Diseño"
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
                  placeholder="Ej: Sistemas de Ecuaciones 2x2, Cinemática"
                  disabled={stationState === 'uploading'}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA] transition-all disabled:opacity-60"
                  required
                />
              </div>
            </div>

            {/* ZONA DE DROP / SELECCIÓN DE ARCHIVOS */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Material de Estudio (Foto de Cuaderno/Pizarra o PDF)
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
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-[#0F52BA] transition-transform">
                      <UploadCloud className="w-7 h-7" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Arrastra tu archivo aquí o{' '}
                        <span className="text-[#0F52BA] hover:underline">explora tus carpetas</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Fotos de pizarra/cuaderno (JPG, PNG, WEBP) o guías PDF de hasta 20 MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
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
                    {routingMode === 'auto_api'
                      ? 'Analizar de Inmediato (Modo Instantáneo)'
                      : 'Encolar para Gemini Spark Pro (MCP)'}
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* 2. PROCESAMIENTO ACTIVO (REALTIME) */}
        {stationState === 'processing' && (
          <div className="p-10 sm:p-14 text-center space-y-6">
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
                {routingMode === 'auto_api' ? 'Carril A: Nexus Worker en Ejecución' : 'Carril B: Esperando Gemini Spark (MCP)'}
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                {routingMode === 'auto_api'
                  ? 'Generando Guía y Examen con Gemini 2.5 Flash...'
                  : 'Documento Listo en la Cola de Gemini Spark Pro'}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {routingMode === 'auto_api'
                  ? 'Nexus Worker está construyendo la teoría formal adaptada a tu nivel, el glosario, el paso a paso deductivo y la batería de preguntas de examen.'
                  : 'El documento ha sido encolado para ser procesado por Gemini Spark vía MCP. Si pasas más de 30 minutos sin procesarlo, el rescate automático lo ejecutará.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 max-w-sm mx-auto text-left space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Asignatura:</span>
                <span className="font-semibold text-slate-800">{subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tema:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[180px]">{topic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Nivel Calibrado:</span>
                <span className="font-semibold text-blue-700">{activeGuardrail.badge}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                <span className="text-slate-400">Estado:</span>
                <span className="font-medium text-amber-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  {routingMode === 'auto_api' ? 'Procesando (3-8s)...' : 'En cola MCP (Spark Pro)'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3. COMPLETADO */}
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
                Nexus ha estructurado la teoría de <strong className="text-slate-700">{topic}</strong> calibrada
                exactamente para el nivel <strong className="text-slate-700">{activeGuardrail.badge}</strong> y ha cargado las preguntas al banco.
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
                      academicLevel,
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

        {/* 4. ERROR */}
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
                Intentar Nuevamente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadStation;
