import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import type { MainTabType } from './components/layout/Sidebar';
import { ProductivityDashboard } from './components/productivity/ProductivityDashboard';
import { AcademicGuidesView } from './components/academic/AcademicGuidesView';
import { ExamSimulatorsView } from './components/exams/ExamSimulatorsView';
import { ToolsAndSettingsView } from './components/tools/ToolsAndSettingsView';

/**
 * Componente Raíz de la Aplicación
 * Centro de Productividad Estudiantil (Arquitectura Unificada de Productividad y Guías Adaptativas)
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
        return <ExamSimulatorsView />;
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
