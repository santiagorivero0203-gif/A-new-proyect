import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import type { MainTabType } from './components/layout/Sidebar';
import { ProductivityDashboard } from './components/productivity/ProductivityDashboard';
import { AcademicGuidesView } from './components/academic/AcademicGuidesView';
import { SimulatorEngine } from './components/exams/SimulatorEngine';
import { StorageManagerView } from './components/storage/StorageManagerView';
import { CreativeDeliveryBoard } from './components/dashboards/CreativeDeliveryBoard';
import { ToolsAndSettingsView } from './components/tools/ToolsAndSettingsView';

/**
 * Componente Raíz de la Aplicación
 * Centro de Productividad Estudiantil (Fase 2: Motor de Exámenes, Guías Interactivas y Storage)
 */
export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<MainTabType>('PRODUCTIVITY');

  const renderCurrentView = () => {
    switch (currentTab) {
      case 'PRODUCTIVITY':
        return <ProductivityDashboard />;
      case 'GUIDES':
        return <AcademicGuidesView />;
      case 'EXAMS':
        return <SimulatorEngine />;
      case 'STORAGE':
        return <StorageManagerView />;
      case 'CREATIVE_BOARD':
        return <CreativeDeliveryBoard />;
      case 'TOOLS':
        return <ToolsAndSettingsView />;
      default:
        return <ProductivityDashboard />;
    }
  };

  return (
    <AuthProvider>
      <MainLayout currentTab={currentTab} onSelectTab={setCurrentTab}>
        {renderCurrentView()}
      </MainLayout>
    </AuthProvider>
  );
};

export default App;
