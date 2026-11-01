import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { UserDocument } from '../types';

const BUCKET_NAME = 'documents';
const LOCAL_STORAGE_DOCS_KEY = 'cpe_user_documents_cache';

export interface UploadDocumentParams {
  file: File;
  userId: string;
  title: string;
  description?: string;
  tags?: string[];
}

/**
 * Deduce el MIME type real a partir del nombre o extensión si el navegador no lo reporta.
 */
function inferMimeType(fileName: string, rawType?: string): string {
  if (rawType && rawType !== 'application/octet-stream' && rawType !== '') {
    return rawType;
  }
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  switch (ext) {
    case 'pdf':
      return 'application/pdf';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'doc':
      return 'application/msword';
    case 'txt':
      return 'text/plain';
    case 'md':
      return 'text/markdown';
    case 'csv':
      return 'text/csv';
    case 'pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    case 'ppt':
      return 'application/vnd.ms-powerpoint';
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    default:
      return rawType || 'application/octet-stream';
  }
}

/**
 * Servicio de Almacenamiento y Registro en Supabase Storage & PostgreSQL
 */
export const storageService = {
  /**
   * Valida tamaño y extensión permitida (PDF, Word .doc/.docx, Texto .txt/.md, Presentaciones, Imágenes)
   */
  validateFile(file: File): { valid: boolean; error?: string } {
    const allowedTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/svg+xml',
      'image/gif',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/markdown',
      'text/csv',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ];

    const allowedExtensions = [
      'pdf',
      'doc',
      'docx',
      'txt',
      'md',
      'csv',
      'ppt',
      'pptx',
      'png',
      'jpg',
      'jpeg',
      'webp',
      'svg',
      'gif',
    ];

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const isMimeAllowed = allowedTypes.includes(file.type);
    const isExtAllowed = allowedExtensions.includes(ext);

    const maxSizeBytes = 30 * 1024 * 1024; // 30MB

    if (!isMimeAllowed && !isExtAllowed) {
      return {
        valid: false,
        error:
          'Formato no soportado. Sube archivos PDF, Word (.docx, .doc), Texto (.txt, .md), Presentaciones o imágenes (PNG, JPG, WEBP).',
      };
    }

    if (file.size > maxSizeBytes) {
      return {
        valid: false,
        error: 'El archivo excede el límite máximo de 30 MB.',
      };
    }

    return { valid: true };
  },

  /**
   * Sube un archivo a Supabase Storage y registra su referencia en PostgreSQL
   */
  async uploadDocument(
    params: UploadDocumentParams,
    onProgress?: (progressPercent: number) => void
  ): Promise<{ success: boolean; document?: UserDocument; error?: string }> {
    const { file, userId, title, description, tags = [] } = params;

    const validation = this.validateFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    if (onProgress) onProgress(25);

    const effectiveMimeType = inferMimeType(file.name, file.type);
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const filePath = `${userId}/${Date.now()}_${sanitizedFileName}`;

    try {
      let publicUrl = '';

      if (isSupabaseConfigured()) {
        // 1. Subida al bucket en Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(filePath, file, {
            contentType: effectiveMimeType,
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          console.warn('Error subiendo a Supabase Storage, aplicando fallback:', uploadError);
          // Si el bucket no existe en supabase, generar object URL
          publicUrl = URL.createObjectURL(file);
        } else {
          const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);
          publicUrl = urlData.publicUrl;
        }

        if (onProgress) onProgress(75);

        // 2. Registro en la tabla relacional user_documents de PostgreSQL
        const { data: docData, error: dbError } = await (supabase.from('user_documents') as any)
          .insert({
            user_id: userId,
            title: title || file.name,
            description: description || null,
            file_path: publicUrl || filePath,
            file_type: effectiveMimeType,
            file_size_bytes: file.size,
            tags,
            storage_bucket: BUCKET_NAME,
          })
          .select()
          .single();

        if (dbError) {
          console.warn('Error guardando registro en user_documents:', dbError);
        }

        if (onProgress) onProgress(100);

        if (docData) {
          return { success: true, document: docData as unknown as UserDocument };
        }
      }

      // Modo Demo / Fallback local para desarrollo fluido
      if (onProgress) onProgress(85);
      publicUrl = URL.createObjectURL(file);

      const mockDoc: UserDocument = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        user_id: userId,
        title: title || file.name,
        description,
        file_path: publicUrl,
        file_type: effectiveMimeType,
        file_size_bytes: file.size,
        tags,
        storage_bucket: BUCKET_NAME,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Guardar en cache local con salvaguarda de cuota
      const existing = this.getLocalDocuments(userId);
      const updated = [mockDoc, ...existing].slice(0, 50);
      try {
        localStorage.setItem(`${LOCAL_STORAGE_DOCS_KEY}_${userId}`, JSON.stringify(updated));
      } catch (storageErr) {
        console.warn('[storageService] Advertencia de cuota de almacenamiento local:', storageErr);
      }

      if (onProgress) onProgress(100);
      return { success: true, document: mockDoc };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error desconocido al subir archivo';
      return { success: false, error: msg };
    }
  },

  /**
   * Obtiene los documentos del usuario
   */
  async getUserDocuments(userId: string): Promise<UserDocument[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('user_documents')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data as unknown as UserDocument[];
        }
      } catch (err) {
        console.warn('Error consultando documentos en Supabase:', err);
      }
    }

    return this.getLocalDocuments(userId);
  },

  /**
   * Elimina un documento
   */
  async deleteDocument(documentId: string, userId: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('user_documents').delete().eq('id', documentId);
      } catch (err) {
        console.warn('Error borrando en Supabase:', err);
      }
    }

    const current = this.getLocalDocuments(userId);
    const updated = current.filter((d) => d.id !== documentId);
    localStorage.setItem(`${LOCAL_STORAGE_DOCS_KEY}_${userId}`, JSON.stringify(updated));
    return true;
  },

  getLocalDocuments(userId: string): UserDocument[] {
    try {
      const stored = localStorage.getItem(`${LOCAL_STORAGE_DOCS_KEY}_${userId}`);
      if (stored) return JSON.parse(stored);
    } catch {
      // Ignorar
    }

    // Retornar lista vacía lista para subidas reales del estudiante
    // En caso de que sea María Fernanda, proveer de fábrica los PDFs oficiales de Notion sincronizados
    if (userId === 'mafe_diseno_ucab' || userId.includes('mafe')) {
      const now = '2026-10-25T10:00:00.000Z';
      return [
        {
          id: 'doc-mafe-notion-color-4',
          user_id: userId,
          title: 'Clase 4: Teoría del Color (Escalas & Síntesis)',
          file_path: '/documents/mafe_notion_guides/EB_LICDISUCAB_COLOR_CLASE4_OCT_09_2026.pdf',
          file_type: 'application/pdf',
          file_size_bytes: 107715,
          storage_bucket: 'documents',
          tags: ['Diseño', 'Color', 'UCAB', 'Clase 4'],
          created_at: '2026-10-09T10:00:00.000Z',
          updated_at: now,
        },
        {
          id: 'doc-mafe-notion-math-1',
          user_id: userId,
          title: 'Guía Teórica #1: Geometría (Punto, Recta, Plano y Espacio)',
          file_path: '/documents/mafe_notion_guides/Guia_teorica__1._Punto_recta_y_espacio_V1.3.pdf',
          file_type: 'application/pdf',
          file_size_bytes: 1288024,
          storage_bucket: 'documents',
          tags: ['Diseño', 'Matemática', 'Geometría', 'UCAB'],
          created_at: '2026-10-15T10:00:00.000Z',
          updated_at: now,
        },
        {
          id: 'doc-mafe-notion-math-2',
          user_id: userId,
          title: 'Guía Teórica #2: Rectas, Retículas & Pendientes',
          file_path: '/documents/mafe_notion_guides/Guia_Teorica__2.__Rectas_(1).pdf',
          file_type: 'application/pdf',
          file_size_bytes: 1704613,
          storage_bucket: 'documents',
          tags: ['Diseño', 'Matemática', 'Rectas', 'Retícula'],
          created_at: '2026-10-18T10:00:00.000Z',
          updated_at: now,
        },
        {
          id: 'doc-mafe-notion-math-3-teorica',
          user_id: userId,
          title: 'Guía Teórica #3: Sistemas de Ecuaciones Lineales',
          file_path: '/documents/mafe_notion_guides/Guia_teorica__3._Sistema_de_ecuaciones_(3).pdf',
          file_type: 'application/pdf',
          file_size_bytes: 956337,
          storage_bucket: 'documents',
          tags: ['Diseño', 'Matemática', 'Ecuaciones'],
          created_at: '2026-10-22T10:00:00.000Z',
          updated_at: now,
        },
        {
          id: 'doc-mafe-notion-math-3-ejercicios',
          user_id: userId,
          title: 'Guía de Ejercicios #3: Sistemas de Ecuaciones Lineales',
          file_path: '/documents/mafe_notion_guides/Guia_de_ejercicios__3._Sistema_de_ecuaciones_(3).pdf',
          file_type: 'application/pdf',
          file_size_bytes: 286580,
          storage_bucket: 'documents',
          tags: ['Diseño', 'Matemática', 'Ejercicios'],
          created_at: '2026-10-22T10:30:00.000Z',
          updated_at: now,
        },
        {
          id: 'doc-mafe-notion-math-4-teorica',
          user_id: userId,
          title: 'Guía Teórica #4: Ángulos & Relaciones Geométricas',
          file_path: '/documents/mafe_notion_guides/Guia_teorica__4_._Angulos_._V1.3_(1).pdf',
          file_type: 'application/pdf',
          file_size_bytes: 501457,
          storage_bucket: 'documents',
          tags: ['Diseño', 'Matemática', 'Ángulos'],
          created_at: '2026-10-25T10:00:00.000Z',
          updated_at: now,
        },
        {
          id: 'doc-mafe-notion-math-4-ejercicios',
          user_id: userId,
          title: 'Guía de Ejercicios #4: Ángulos (Conversiones & Aplicaciones)',
          file_path: '/documents/mafe_notion_guides/Guia_de_ejercicios__4._Angulos.V1.2_(2).pdf',
          file_type: 'application/pdf',
          file_size_bytes: 333830,
          storage_bucket: 'documents',
          tags: ['Diseño', 'Matemática', 'Ejercicios'],
          created_at: '2026-10-25T10:30:00.000Z',
          updated_at: now,
        },
      ];
    }

    return [];
  },
};
