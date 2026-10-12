import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

// Obtener credenciales desde variables de entorno Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Determina si la aplicación cuenta con credenciales activas de Supabase
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-id')
  );
};

/**
 * Cliente de Supabase inicializado con tipado estricto
 * Si no hay credenciales válidas, inicializa un cliente con valores dummy seguros
 * para evitar excepciones de inicialización mientras se trabaja en modo Demo/Desarrollo.
 */
export const supabase = createClient<Database>(
  supabaseUrl && supabaseUrl.startsWith('https://') ? supabaseUrl : 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
