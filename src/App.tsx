import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import type { MainTabType } from './components/layout/Sidebar';
import { ModularWorkspaceDashboard } from './components/workspace/ModularWorkspaceDashboard';
import { AcademicGuidesView } from './components/academic/AcademicGuidesView';
import { SimulatorEngine } from './components/exams/SimulatorEngine';
import { StorageManagerView } from './components/storage/StorageManagerView';
import { CreativeDeliveryBoard } from './components/dashboards/CreativeDeliveryBoard';
import { ToolsAndSettingsView } from './components/tools/ToolsAndSettingsView';
import type { ExamConfig, Question } from './types/exam.types';

/**
 * Componente Raíz de la Aplicación
 * Centro de Productividad Estudiantil (Fase 4: Auditoría Lógica, Modularidad Universal y Refinamiento UI/UX)
 */
export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<MainTabType>('PRODUCTIVITY');
  const [aiExamConfig, setAiExamConfig] = useState<ExamConfig | null>(null);
  const [aiExamQuestions, setAiExamQuestions] = useState<Question[] | null>(null);

  /**
   * Conecta los componentes de IA con el simulador de exámenes
   */
  const handleStartExamWithAiQuestions = (questions: Question[], title: string) => {
    setAiExamConfig({
      mode: 'AI_GENERATED',
      title: title || 'Simulacro Personalizado por Gemini IA',
      totalQuestions: questions.length,
      timeLimitSeconds: Math.max(questions.length * 3 * 60, 10 * 60), // Mínimo 10 min
      allowPause: true,
      shuffleQuestions: false,
      customQuestions: questions,
    });
    setAiExamQuestions(questions);
    setCurrentTab('EXAMS');
  };

  /**
   * Lanzar examen preconfigurado desde el widget de inicio
   */
  const handleLaunchExam = (config: ExamConfig) => {
    setAiExamConfig(config);
    setAiExamQuestions(config.customQuestions || null);
    setCurrentTab('EXAMS');
  };

  const renderCurrentView = () => {
    switch (currentTab) {
      case 'PRODUCTIVITY':
        return (
          <ModularWorkspaceDashboard
            onStartExamWithQuestions={handleStartExamWithAiQuestions}
            onLaunchExam={handleLaunchExam}
            onNavigateToTab={(tab) => setCurrentTab(tab)}
          />
        );
      case 'GUIDES':
        return (
          <AcademicGuidesView
            onStartExamWithQuestions={handleStartExamWithAiQuestions}
          />
        );
      case 'EXAMS':
        return (
          <SimulatorEngine
            initialConfig={aiExamConfig}
            initialQuestions={aiExamQuestions}
            onClearInitial={() => {
              setAiExamConfig(null);
              setAiExamQuestions(null);
            }}
          />
        );
      case 'STORAGE':
        return (
          <StorageManagerView
            onStartExamWithQuestions={handleStartExamWithAiQuestions}
            onNavigateToGuides={() => setCurrentTab('GUIDES')}
          />
        );
      case 'CREATIVE_BOARD':
        return <CreativeDeliveryBoard />;
      case 'TOOLS':
        return <ToolsAndSettingsView />;
      default:
        return (
          <ModularWorkspaceDashboard
            onStartExamWithQuestions={handleStartExamWithAiQuestions}
            onLaunchExam={handleLaunchExam}
            onNavigateToTab={(tab) => setCurrentTab(tab)}
          />
        );
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
