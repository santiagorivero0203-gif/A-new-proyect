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
 * Servicio de Almacenamiento y Registro en Supabase Storage & PostgreSQL
 */
export const storageService = {
  /**
   * Valida tamaño y extensión permitida
   */
  validateFile(file: File): { valid: boolean; error?: string } {
    const allowedTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
    ];
    const maxSizeBytes = 15 * 1024 * 1024; // 15MB

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Formato no soportado. Sube archivos PDF o imágenes (PNG, JPG, WEBP).',
      };
    }

    if (file.size > maxSizeBytes) {
      return {
        valid: false,
        error: 'El archivo excede el límite máximo de 15 MB.',
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

    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const filePath = `${userId}/${Date.now()}_${sanitizedFileName}`;

    try {
      let publicUrl = '';

      if (isSupabaseConfigured()) {
        // 1. Subida al bucket en Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(filePath, file, {
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
            file_type: file.type,
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
        file_type: file.type,
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
    return [];
  },
};
