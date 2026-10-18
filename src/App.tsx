import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import type { MainTabType } from './components/layout/Sidebar';
import { ModularWorkspaceDashboard } from './components/workspace/ModularWorkspaceDashboard';
import { AcademicGuidesView } from './components/academic/AcademicGuidesView';
import { AcademicPlannerView } from './components/planner/AcademicPlannerView';
import { SimulatorEngine } from './components/exams/SimulatorEngine';
import { StorageManagerView } from './components/storage/StorageManagerView';
import { CreativeDeliveryBoard } from './components/dashboards/CreativeDeliveryBoard';
import { ToolsAndSettingsView } from './components/tools/ToolsAndSettingsView';
import { UCVIntroCourseHub } from './components/academic/UCVIntroCourseHub';
import { StudentAuthPortal } from './components/auth/StudentAuthPortal';
import { AuthModal } from './components/auth/AuthModal';
import type { ExamConfig, Question } from './types/exam.types';

/**
 * Contenido Principal de la Aplicación
 * Con control de sesión y aislamiento por cuenta de estudiante
 */
const AppContent: React.FC = () => {
  const { user, academicProfile } = useAuth();
  const [currentTab, setCurrentTab] = useState<MainTabType>('PRODUCTIVITY');
  const [aiExamConfig, setAiExamConfig] = useState<ExamConfig | null>(null);
  const [aiExamQuestions, setAiExamQuestions] = useState<Question[] | null>(null);
  const [isSupabaseAuthOpen, setIsSupabaseAuthOpen] = useState(false);

  /**
   * Conecta los componentes de IA con el simulador de exámenes
   */
  const handleStartExamWithAiQuestions = (questions: Question[], title: string) => {
    setAiExamConfig({
      mode: 'AI_GENERATED',
      title: title || 'Simulacro Personalizado por Gemini IA',
      totalQuestions: questions.length,
      timeLimitSeconds: Math.max(questions.length * 3 * 60, 10 * 60),
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

  // Si no hay sesión activa, mostrar el portal de acceso limpio y selección de cuenta
  if (!user) {
    return (
      <>
        <StudentAuthPortal onOpenSupabaseModal={() => setIsSupabaseAuthOpen(true)} />
        <AuthModal
          isOpen={isSupabaseAuthOpen}
          onClose={() => setIsSupabaseAuthOpen(false)}
        />
      </>
    );
  }

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
      case 'PLANNER':
        return (
          <AcademicPlannerView
            onLaunchExam={handleLaunchExam}
            onNavigateToGuides={() => setCurrentTab('GUIDES')}
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
      case 'UCV_COURSE': {
        // El Curso Introductorio UCV es exclusivo del perfil de Santiago Rivero (Facultad de Ciencias UCV)
        const isSantiago =
          academicProfile === 'santiago_fisica_ucv' ||
          user?.academic_profile === 'santiago_fisica_ucv' ||
          user?.username === 'santiago_fisica_ucv' ||
          Boolean(user?.full_name?.toLowerCase().includes('santiago')) ||
          Boolean(user?.email?.toLowerCase().includes('santiago'));

        if (!isSantiago) {
          return (
            <ModularWorkspaceDashboard
              onStartExamWithQuestions={handleStartExamWithAiQuestions}
              onLaunchExam={handleLaunchExam}
              onNavigateToTab={(tab) => setCurrentTab(tab)}
            />
          );
        }
        return (
          <UCVIntroCourseHub
            onStartExam={(config, customQuestions) => {
              setAiExamConfig(config);
              setAiExamQuestions(customQuestions || null);
              setCurrentTab('EXAMS');
            }}
            onNavigateToTab={(tab) => setCurrentTab(tab as MainTabType)}
          />
        );
      }
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
    <MainLayout
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      onLaunchQuickExam={() =>
        handleLaunchExam({
          mode: 'QUICK_PRACTICE',
          title: 'Simulacro Express (Cmd + K)',
          totalQuestions: 5,
          timeLimitSeconds: 15 * 60,
          allowPause: true,
          shuffleQuestions: true,
        })
      }
    >
      {renderCurrentView()}
    </MainLayout>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
