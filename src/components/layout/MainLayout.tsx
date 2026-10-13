import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import type { MainTabType } from './Sidebar';
import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';
import { AuthModal } from '../auth/AuthModal';
import { AccountManagerModal } from '../auth/AccountManagerModal';
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
  const [isAccountManagerOpen, setIsAccountManagerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {/* Sidebar para pantallas de escritorio y cajón desplegable en móvil */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={onSelectTab}
        isOpenMobile={isOpenMobileSidebar}
        onCloseMobile={() => setIsOpenMobileSidebar(false)}
        onOpenAccountManager={() => setIsAccountManagerOpen(true)}
      />

      {/* Área Principal con margen adaptativo */}
      <div className="lg:pl-72 flex flex-col min-h-screen transition-all duration-200">
        <Header
          currentTab={currentTab}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onToggleMobileSidebar={() => setIsOpenMobileSidebar(!isOpenMobileSidebar)}
          onOpenAccountManager={() => setIsAccountManagerOpen(true)}
        />

        <main className="flex-1 px-4 sm:px-8 lg:px-10 py-8 max-w-[1600px] w-full mx-auto pb-24 lg:pb-16">
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

      {/* Modal de Gestión y Cambio Aislado de Cuentas */}
      <AccountManagerModal
        isOpen={isAccountManagerOpen}
        onClose={() => setIsAccountManagerOpen(false)}
        onOpenSupabaseAuth={() => setIsAuthModalOpen(true)}
      />
    </div>
  );
};
