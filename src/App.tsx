import React, { Suspense, lazy, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { ExamProvider, useExam } from './context/ExamContext';
import { MainLayout } from './components/layout/MainLayout';
import type { MainTabType } from './types';
import { ModularWorkspaceDashboard } from './components/workspace/ModularWorkspaceDashboard';
import { StudentAuthPortal } from './components/auth/StudentAuthPortal';
import { AuthModal } from './components/auth/AuthModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ViewLoadingSkeleton } from './components/common/ViewLoadingSkeleton';

// ==============================================================================
// CARGA PEREZOSA (CODE-SPLITTING DINÁMICO)
// Desacopla módulos secundarios para reducir drásticamente el bundle inicial
// y evitar congelamiento o lentitud en dispositivos móviles y de baja gama.
// ==============================================================================
const AcademicGuidesView = lazy(() =>
  import('./components/academic/AcademicGuidesView').then((m) => ({ default: m.AcademicGuidesView }))
);
const AcademicPlannerView = lazy(() =>
  import('./components/planner/AcademicPlannerView').then((m) => ({ default: m.AcademicPlannerView }))
);
const SimulatorEngine = lazy(() =>
  import('./components/exams/SimulatorEngine').then((m) => ({ default: m.SimulatorEngine }))
);
const StorageManagerView = lazy(() =>
  import('./components/storage/StorageManagerView').then((m) => ({ default: m.StorageManagerView }))
);
const CreativeDeliveryBoard = lazy(() =>
  import('./components/dashboards/CreativeDeliveryBoard').then((m) => ({ default: m.CreativeDeliveryBoard }))
);
const ToolsAndSettingsView = lazy(() =>
  import('./components/tools/ToolsAndSettingsView').then((m) => ({ default: m.ToolsAndSettingsView }))
);
const ScienceLabView = lazy(() =>
  import('./components/academic/ScienceLabView').then((m) => ({ default: m.ScienceLabView }))
);
const HumanitiesLabView = lazy(() =>
  import('./components/academic/HumanitiesLabView').then((m) => ({ default: m.HumanitiesLabView }))
);
const DesignPaletteView = lazy(() =>
  import('./components/design/DesignPaletteView').then((m) => ({ default: m.DesignPaletteView }))
);
const MathAlgebraView = lazy(() =>
  import('./components/tools/MathAlgebraView').then((m) => ({ default: m.MathAlgebraView }))
);
const UCVIntroCourseHub = lazy(() =>
  import('./components/academic/UCVIntroCourseHub').then((m) => ({ default: m.UCVIntroCourseHub }))
);

/**
 * Contenido Principal de la Aplicación
 * Con control de sesión, límites de error por vista y ruteo centralizado
 */
const AppContent: React.FC = () => {
  const { user, academicProfile } = useAuth();
  const { currentTab, navigateToTab } = useNavigation();
  const { startExam, startExamWithQuestions } = useExam();
  const [isSupabaseAuthOpen, setIsSupabaseAuthOpen] = useState(false);

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

  // Renderizado dinámico de la vista activa según la pestaña actual
  const renderCurrentView = () => {
    switch (currentTab) {
      case 'PRODUCTIVITY':
        return (
          <ModularWorkspaceDashboard
            onStartExamWithQuestions={startExamWithQuestions}
            onLaunchExam={startExam}
            onNavigateToTab={navigateToTab}
          />
        );

      case 'PLANNER':
        return (
          <AcademicPlannerView
            onLaunchExam={startExam}
            onNavigateToGuides={(guideId) => {
              if (guideId) {
                sessionStorage.setItem('cpe_auto_open_guide_id', guideId);
              }
              navigateToTab('GUIDES');
            }}
          />
        );

      case 'GUIDES':
        return (
          <AcademicGuidesView
            onStartExamWithQuestions={startExamWithQuestions}
          />
        );

      case 'EXAMS':
        return <SimulatorEngine />;

      case 'STORAGE':
        return (
          <StorageManagerView
            onStartExamWithQuestions={startExamWithQuestions}
            onNavigateToGuides={() => navigateToTab('GUIDES')}
          />
        );

      case 'CREATIVE_BOARD':
        return <CreativeDeliveryBoard />;

      case 'DESIGN_PALETTE':
        return <DesignPaletteView />;

      case 'SCIENCE_LAB':
        return <ScienceLabView />;

      case 'HUMANITIES_LAB':
        return <HumanitiesLabView />;

      case 'MATH_LAB':
        return <MathAlgebraView />;

      case 'SETTINGS':
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
              onStartExamWithQuestions={startExamWithQuestions}
              onLaunchExam={startExam}
              onNavigateToTab={navigateToTab}
            />
          );
        }

        return (
          <UCVIntroCourseHub
            onStartExam={(config, customQuestions) => {
              startExam(config, customQuestions);
            }}
            onNavigateToTab={(tab) => navigateToTab(tab as MainTabType)}
          />
        );
      }

      default:
        return (
          <ModularWorkspaceDashboard
            onStartExamWithQuestions={startExamWithQuestions}
            onLaunchExam={startExam}
            onNavigateToTab={navigateToTab}
          />
        );
    }
  };

  return (
    <MainLayout
      currentTab={currentTab}
      onSelectTab={navigateToTab}
      onLaunchQuickExam={() =>
        startExam({
          mode: 'QUICK_PRACTICE',
          title: 'Simulacro Express (Cmd + K)',
          totalQuestions: 5,
          timeLimitSeconds: 15 * 60,
          allowPause: true,
          shuffleQuestions: true,
        })
      }
    >
      <ErrorBoundary fallbackTitle="Error al renderizar este módulo académico">
        <Suspense fallback={<ViewLoadingSkeleton label="Cargando módulo académico..." />}>
          {renderCurrentView()}
        </Suspense>
      </ErrorBoundary>
    </MainLayout>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationProvider>
        <ExamProvider>
          <AppContent />
        </ExamProvider>
      </NavigationProvider>
    </AuthProvider>
  );
};

export default App;
