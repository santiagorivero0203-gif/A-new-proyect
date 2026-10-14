import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { UserProfile, AcademicProfileId, MainTabType } from '../types';
import { MOCK_PROFILES, DEFAULT_PROFILE_SIDEBAR_TABS } from '../lib/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  academicProfile: AcademicProfileId;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
  switchProfileDemo: (profileId: AcademicProfileId) => void;
  selectStudentAccount: (profileId: AcademicProfileId) => void;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (
    email: string,
    password: string,
    fullName: string,
    profileId: AcademicProfileId
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateUserPreferences: (preferences: Partial<UserProfile['preferences']>) => void;
  setProfileSidebarTabs: (profileId: AcademicProfileId, tabs: MainTabType[]) => void;
  getProfileSidebarTabs: (profileId: AcademicProfileId) => MainTabType[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'cpe_active_profile_id';

/**
 * Obtiene las preferencias combinadas (base mock + personalizadas en localStorage)
 */
function getHydratedProfile(profileId: AcademicProfileId): UserProfile {
  const base = MOCK_PROFILES[profileId] || MOCK_PROFILES['santiago_fisica_ucv'];
  try {
    const savedPrefs = localStorage.getItem(`cpe_profile_prefs_${profileId}`);
    if (savedPrefs) {
      const parsed = JSON.parse(savedPrefs);
      const tabs: MainTabType[] = Array.isArray(parsed.sidebar_tabs)
        ? [...parsed.sidebar_tabs]
        : [...DEFAULT_PROFILE_SIDEBAR_TABS[profileId]];
      
      // Auto-reparar caché local de Santiago para asegurar que siempre tenga acceso al Curso UCV
      if (profileId === 'santiago_fisica_ucv' && !tabs.includes('UCV_COURSE')) {
        tabs.splice(1, 0, 'UCV_COURSE');
      }

      return {
        ...base,
        preferences: {
          ...base.preferences,
          ...parsed,
          sidebar_tabs: tabs,
        },
      };
    }
  } catch (e) {
    console.warn('[AuthContext] Error recuperando preferencias de perfil:', e);
  }

  const defaultTabs: MainTabType[] = [
    ...(base.preferences.sidebar_tabs || DEFAULT_PROFILE_SIDEBAR_TABS[profileId]),
  ];
  if (profileId === 'santiago_fisica_ucv' && !defaultTabs.includes('UCV_COURSE')) {
    defaultTabs.splice(1, 0, 'UCV_COURSE');
  }

  return {
    ...base,
    preferences: {
      ...base.preferences,
      sidebar_tabs: defaultTabs,
    },
  };
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializar con la cuenta guardada en localStorage
  const [selectedProfileId, setSelectedProfileId] = useState<AcademicProfileId>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) as AcademicProfileId;
    return saved && MOCK_PROFILES[saved] ? saved : 'santiago_fisica_ucv';
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) as AcademicProfileId;
    const targetId = saved && MOCK_PROFILES[saved] ? saved : 'santiago_fisica_ucv';
    return getHydratedProfile(targetId);
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(!isSupabaseConfigured());

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
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          const profileData = data as unknown as UserProfile | null;

          if (profileData && !error) {
            const hydrated = {
              ...profileData,
              preferences: {
                ...profileData.preferences,
                sidebar_tabs:
                  profileData.preferences?.sidebar_tabs ||
                  DEFAULT_PROFILE_SIDEBAR_TABS[profileData.academic_profile] ||
                  ['PRODUCTIVITY', 'GUIDES', 'EXAMS', 'PLANNER', 'STORAGE', 'TOOLS'],
              },
            };
            setCurrentUser(hydrated);
            setSelectedProfileId(hydrated.academic_profile);
            localStorage.setItem(LOCAL_STORAGE_KEY, hydrated.academic_profile);
            setIsDemoMode(false);
          } else {
            setIsDemoMode(true);
          }
        } else {
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
            const hydrated = {
              ...profileData,
              preferences: {
                ...profileData.preferences,
                sidebar_tabs:
                  profileData.preferences?.sidebar_tabs ||
                  DEFAULT_PROFILE_SIDEBAR_TABS[profileData.academic_profile] ||
                  ['PRODUCTIVITY', 'GUIDES', 'EXAMS', 'PLANNER', 'STORAGE', 'TOOLS'],
              },
            };
            setCurrentUser(hydrated);
            setSelectedProfileId(hydrated.academic_profile);
            localStorage.setItem(LOCAL_STORAGE_KEY, hydrated.academic_profile);
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
   * Cambiar o seleccionar una cuenta de estudiante de forma segura y aislada
   */
  const switchProfileDemo = (profileId: AcademicProfileId) => {
    setSelectedProfileId(profileId);
    const hydrated = getHydratedProfile(profileId);
    setCurrentUser(hydrated);
    localStorage.setItem(LOCAL_STORAGE_KEY, profileId);
  };

  const selectStudentAccount = (profileId: AcademicProfileId) => {
    switchProfileDemo(profileId);
  };

  /**
   * Obtiene las pestañas de la barra lateral configuradas para cualquier perfil
   */
  const getProfileSidebarTabs = (profileId: AcademicProfileId): MainTabType[] => {
    try {
      const savedPrefs = localStorage.getItem(`cpe_profile_prefs_${profileId}`);
      if (savedPrefs) {
        const parsed = JSON.parse(savedPrefs);
        if (Array.isArray(parsed.sidebar_tabs) && parsed.sidebar_tabs.length > 0) {
          const tabs = [...parsed.sidebar_tabs];
          if (profileId === 'santiago_fisica_ucv' && !tabs.includes('UCV_COURSE')) {
            tabs.splice(1, 0, 'UCV_COURSE');
          }
          return tabs;
        }
      }
    } catch (e) {
      console.warn('Error leyendo pestañas del perfil:', e);
    }
    const defaultTabs = [
      ...(DEFAULT_PROFILE_SIDEBAR_TABS[profileId] || [
        'PRODUCTIVITY',
        'GUIDES',
        'EXAMS',
        'PLANNER',
        'STORAGE',
        'TOOLS',
      ]),
    ];
    if (profileId === 'santiago_fisica_ucv' && !defaultTabs.includes('UCV_COURSE')) {
      defaultTabs.splice(1, 0, 'UCV_COURSE');
    }
    return defaultTabs;
  };

  /**
   * Configura y guarda de forma persistente las pestañas de la barra lateral para un perfil específico
   */
  const setProfileSidebarTabs = (profileId: AcademicProfileId, tabs: MainTabType[]) => {
    try {
      const existing = localStorage.getItem(`cpe_profile_prefs_${profileId}`);
      const currentPrefs = existing ? JSON.parse(existing) : (MOCK_PROFILES[profileId]?.preferences || {});
      const updatedPrefs = { ...currentPrefs, sidebar_tabs: tabs };
      localStorage.setItem(`cpe_profile_prefs_${profileId}`, JSON.stringify(updatedPrefs));

      // Si el perfil que se modificó es el activo en este momento, actualizar el estado reactivo
      if (currentUser && currentUser.academic_profile === profileId) {
        setCurrentUser({
          ...currentUser,
          preferences: {
            ...currentUser.preferences,
            sidebar_tabs: tabs,
          },
        });
      }
    } catch (err) {
      console.warn('Error guardando configuración de barra lateral para el perfil:', err);
    }
  };

  /**
   * Inicio de sesión con Supabase Auth
   */
  const signInWithEmail = async (email: string, password: string) => {
    try {
      if (!isSupabaseConfigured()) {
        const matchedProfile = Object.values(MOCK_PROFILES).find(
          (p) => p.email.toLowerCase() === email.toLowerCase()
        );
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
   * Cerrar sesión por completo
   */
  const signOut = async () => {
    if (isSupabaseConfigured() && !isDemoMode) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setCurrentUser(null);
  };

  /**
   * Actualizar preferencias del usuario activo
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

    try {
      localStorage.setItem(`cpe_profile_prefs_${currentUser.academic_profile}`, JSON.stringify(updated.preferences));
    } catch (err) {
      console.warn('Error persistiendo preferencias de usuario:', err);
    }
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
        selectStudentAccount,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        updateUserPreferences,
        setProfileSidebarTabs,
        getProfileSidebarTabs,
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
