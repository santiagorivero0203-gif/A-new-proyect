import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import type { MainTabType } from './Sidebar';
import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';
import { AuthModal } from '../auth/AuthModal';
import { AccountManagerModal } from '../auth/AccountManagerModal';
import { FloatingCalculatorWidget } from '../tools/FloatingCalculatorWidget';
import { CommandPalette } from '../common/CommandPalette';
import { ScratchpadDrawer } from '../tools/ScratchpadDrawer';

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
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Atajo de teclado global: Cmd + K / Ctrl + K
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

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
      <FloatingCalculatorWidget
        isOpen={isCalculatorOpen}
        onOpenChange={setIsCalculatorOpen}
      />

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

      {/* Botón Flotante para abrir Scratchpad (Borrador Rápido / Canvas) */}
      <button
        onClick={() => setIsScratchpadOpen(true)}
        className="fixed bottom-6 right-20 z-40 p-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 shadow-soft-md hover:shadow-soft-lg transition-all active:scale-95 hidden sm:flex items-center gap-2 group"
        title="Abrir Scratchpad de Dibujo / Bloc LaTeX"
      >
        <span className="text-sm font-bold text-brand-600 group-hover:rotate-12 transition-transform">✎</span>
        <span className="text-xs font-bold text-slate-700">Scratchpad</span>
      </button>

      {/* Cajón Desplegable del Scratchpad */}
      <ScratchpadDrawer
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
      />

      {/* Paleta de Comandos Globales (Cmd + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateToTab={onSelectTab}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenScratchpad={() => setIsScratchpadOpen(true)}
      />
    </div>
  );
};
