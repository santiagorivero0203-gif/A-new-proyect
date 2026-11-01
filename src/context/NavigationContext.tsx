import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { MainTabType } from '../types';

interface NavigationContextType {
  currentTab: MainTabType;
  navigateToTab: (tab: MainTabType) => void;
  tabHistory: MainTabType[];
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  initialTab?: MainTabType;
  children: React.ReactNode;
}

/**
 * Proveedor Centralizado de Navegación y Rutas de la Aplicación
 *
 * Desacopla la navegación de jerarquías profundas de componentes (evitando prop-drilling)
 * y mantiene un historial navegable para que la aplicación sea verdaderamente escalable.
 */
export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  initialTab = 'PRODUCTIVITY',
  children,
}) => {
  const [currentTab, setCurrentTab] = useState<MainTabType>(initialTab);
  const [tabHistory, setTabHistory] = useState<MainTabType[]>([initialTab]);

  const navigateToTab = useCallback((tab: MainTabType) => {
    setCurrentTab((prev) => {
      if (prev === tab) return prev;
      setTabHistory((hist) => [...hist.slice(-10), tab]);
      return tab;
    });
  }, []);

  const goBack = useCallback(() => {
    setTabHistory((hist) => {
      if (hist.length <= 1) return hist;
      const nextHist = [...hist];
      nextHist.pop();
      const prevTab = nextHist[nextHist.length - 1] || 'PRODUCTIVITY';
      setCurrentTab(prevTab);
      return nextHist;
    });
  }, []);

  const value = useMemo(
    () => ({
      currentTab,
      navigateToTab,
      tabHistory,
      goBack,
    }),
    [currentTab, navigateToTab, tabHistory, goBack]
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation debe ser utilizado dentro de un NavigationProvider');
  }
  return context;
};
