import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { UserProfile, AcademicProfileId } from '../types';
import { MOCK_PROFILES } from '../lib/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  academicProfile: AcademicProfileId;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
  switchProfileDemo: (profileId: AcademicProfileId) => void;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (
    email: string,
    password: string,
    fullName: string,
    profileId: AcademicProfileId
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateUserPreferences: (preferences: Partial<UserProfile['preferences']>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'cpe_active_profile_id';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializar con Santiago por defecto o el guardado en localStorage para testing
  const [selectedProfileId, setSelectedProfileId] = useState<AcademicProfileId>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) as AcademicProfileId;
    return saved && MOCK_PROFILES[saved] ? saved : 'santiago_fisica_ucv';
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => MOCK_PROFILES[selectedProfileId]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(!isSupabaseConfigured());

  // Sincronizar usuario cuando cambia selectedProfileId en demo
  useEffect(() => {
    if (isDemoMode) {
      setCurrentUser(MOCK_PROFILES[selectedProfileId]);
      localStorage.setItem(LOCAL_STORAGE_KEY, selectedProfileId);
    }
  }, [selectedProfileId, isDemoMode]);

  // Manejar sesión real de Supabase si está configurado
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (!isSupabaseConfigured()) {
          setIsDemoMode(true);
          setIsLoading(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Consultar perfil de la tabla profiles
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          const profileData = data as unknown as UserProfile | null;

          if (profileData && !error) {
            setCurrentUser(profileData);
            setSelectedProfileId(profileData.academic_profile);
            setIsDemoMode(false);
          } else {
            // Si el trigger aún no se ejecutó, usar metadata
            setIsDemoMode(true);
          }
        } else {
          // Sin sesión activa de Supabase, permanecer en demo para exploración inmediata
          setIsDemoMode(true);
        }
      } catch (err) {
        console.warn('Error inicializando sesión con Supabase, usando modo Demo:', err);
        setIsDemoMode(true);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Listener de cambios de autenticación en Supabase
    if (isSupabaseConfigured()) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          const profileData = data as unknown as UserProfile | null;

          if (profileData) {
            setCurrentUser(profileData);
            setSelectedProfileId(profileData.academic_profile);
            setIsDemoMode(false);
          }
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  /**
   * Cambiar entre perfiles al instante (Andrés, Prima, Santiago, María Fernanda)
   */
  const switchProfileDemo = (profileId: AcademicProfileId) => {
    setSelectedProfileId(profileId);
    setCurrentUser(MOCK_PROFILES[profileId]);
    localStorage.setItem(LOCAL_STORAGE_KEY, profileId);
  };

  /**
   * Inicio de sesión con Supabase Auth
   */
  const signInWithEmail = async (email: string, password: string) => {
    try {
      if (!isSupabaseConfigured()) {
        // En modo demo, simular éxito
        const matchedProfile = Object.values(MOCK_PROFILES).find(p => p.email.toLowerCase() === email.toLowerCase());
        if (matchedProfile) {
          switchProfileDemo(matchedProfile.academic_profile);
          return { success: true };
        }
        return { success: true };
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };

      if (data.user) {
        setIsDemoMode(false);
      }
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      return { success: false, error: message };
    }
  };

  /**
   * Registro con Supabase Auth
   */
  const signUpWithEmail = async (
    email: string,
    password: string,
    fullName: string,
    profileId: AcademicProfileId
  ) => {
    try {
      if (!isSupabaseConfigured()) {
        switchProfileDemo(profileId);
        return { success: true };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            academic_profile: profileId,
          },
        },
      });

      if (error) return { success: false, error: error.message };
      if (data.user) setIsDemoMode(false);
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al registrar usuario';
      return { success: false, error: message };
    }
  };

  /**
   * Cerrar sesión
   */
  const signOut = async () => {
    if (isSupabaseConfigured() && !isDemoMode) {
      await supabase.auth.signOut();
    }
    // Volver a modo Demo predeterminado
    setIsDemoMode(true);
    switchProfileDemo('santiago_fisica_ucv');
  };

  /**
   * Actualizar preferencias
   */
  const updateUserPreferences = (newPrefs: Partial<UserProfile['preferences']>) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      preferences: {
        ...currentUser.preferences,
        ...newPrefs,
      },
    };
    setCurrentUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        academicProfile: selectedProfileId,
        isAuthenticated: Boolean(currentUser),
        isLoading,
        isDemoMode,
        switchProfileDemo,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        updateUserPreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
