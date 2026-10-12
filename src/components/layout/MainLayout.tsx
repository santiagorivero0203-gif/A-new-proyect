import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import type { MainTabType } from './Sidebar';
import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';
import { AuthModal } from '../auth/AuthModal';
import { FloatingCalculatorWidget } from '../tools/FloatingCalculatorWidget';

interface MainLayoutProps {
  currentTab: MainTabType;
  onSelectTab: (tab: MainTabType) => void;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  currentTab,
  onSelectTab,
  children,
}) => {
  const [isOpenMobileSidebar, setIsOpenMobileSidebar] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {/* Sidebar para pantallas de escritorio y cajón desplegable en móvil */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={onSelectTab}
        isOpenMobile={isOpenMobileSidebar}
        onCloseMobile={() => setIsOpenMobileSidebar(false)}
      />

      {/* Área Principal con margen adaptativo */}
      <div className="lg:pl-72 flex flex-col min-h-screen transition-all duration-200">
        <Header
          currentTab={currentTab}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onToggleMobileSidebar={() => setIsOpenMobileSidebar(!isOpenMobileSidebar)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-12">
          {children}
        </main>
      </div>

      {/* Widget Flotante de Calculadora Científica (Módulo Analítico) */}
      <FloatingCalculatorWidget />

      {/* Barra de Navegación Inferior Móvil */}
      <MobileNavigation
        currentTab={currentTab}
        onSelectTab={onSelectTab}
      />

      {/* Modal de Autenticación Supabase / Demo */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};
