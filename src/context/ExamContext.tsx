import React, { createContext, useContext, useCallback, useMemo } from 'react';
import type { ExamConfig, ExamSessionState, ExamReport, Question } from '../types/exam.types';
import { useExamSimulator } from '../hooks/useExamSimulator';
import { useNavigation } from './NavigationContext';

interface ExamContextType {
  session: ExamSessionState;
  report: ExamReport | null;
  recoverableSession: ExamSessionState | null;
  isExamActive: boolean;
  startExam: (config: ExamConfig, customQuestions?: Question[]) => void;
  startExamWithQuestions: (questions: Question[], title: string) => void;
  selectAnswer: (questionId: string, optionId: string) => void;
  toggleFlagQuestion: (questionId: string) => void;
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  togglePause: () => void;
  finishExam: () => void;
  resetExam: () => void;
  resumeRecoveredSession: () => void;
  discardRecoveredSession: () => void;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

interface ExamProviderProps {
  children: React.ReactNode;
}

/**
 * Proveedor Centralizado del Simulador de Exámenes
 *
 * Mantiene la sesión de examen viva en toda la aplicación, de forma que el estudiante
 * pueda alternar entre pestañas (Planificador, Guías, Lienzo) sin perder el progreso,
 * las respuestas seleccionadas ni el temporizador activo.
 */
export const ExamProvider: React.FC<ExamProviderProps> = ({ children }) => {
  const simulator = useExamSimulator();
  const { navigateToTab } = useNavigation();

  const isExamActive = simulator.session.status === 'IN_PROGRESS';

  // Iniciar examen estándar con navegación automática a la pantalla de examen
  const startExam = useCallback(
    (config: ExamConfig, customQuestions?: Question[]) => {
      simulator.startExam(config, customQuestions);
      navigateToTab('EXAMS');
    },
    [simulator, navigateToTab]
  );

  // Iniciar examen con un array de preguntas directas (desde Guías, IA o Widgets)
  const startExamWithQuestions = useCallback(
    (questions: Question[], title: string) => {
      const config: ExamConfig = {
        mode: 'AI_GENERATED',
        title: title || 'Simulacro Personalizado',
        totalQuestions: questions.length,
        timeLimitSeconds: Math.max(questions.length * 3 * 60, 10 * 60),
        allowPause: true,
        shuffleQuestions: false,
        customQuestions: questions,
      };
      simulator.startExam(config, questions);
      navigateToTab('EXAMS');
    },
    [simulator, navigateToTab]
  );

  // Reanudar sesión y navegar al simulador
  const resumeRecoveredSession = useCallback(() => {
    simulator.resumeRecoveredSession();
    navigateToTab('EXAMS');
  }, [simulator, navigateToTab]);

  const value = useMemo(
    () => ({
      session: simulator.session,
      report: simulator.report,
      recoverableSession: simulator.recoverableSession,
      isExamActive,
      startExam,
      startExamWithQuestions,
      selectAnswer: simulator.selectAnswer,
      toggleFlagQuestion: simulator.toggleFlagQuestion,
      goToQuestion: simulator.goToQuestion,
      nextQuestion: simulator.nextQuestion,
      prevQuestion: simulator.prevQuestion,
      togglePause: simulator.togglePause,
      finishExam: simulator.finishExam,
      resetExam: simulator.resetExam,
      resumeRecoveredSession,
      discardRecoveredSession: simulator.discardRecoveredSession,
    }),
    [
      simulator.session,
      simulator.report,
      simulator.recoverableSession,
      isExamActive,
      startExam,
      startExamWithQuestions,
      simulator.selectAnswer,
      simulator.toggleFlagQuestion,
      simulator.goToQuestion,
      simulator.nextQuestion,
      simulator.prevQuestion,
      simulator.togglePause,
      simulator.finishExam,
      simulator.resetExam,
      resumeRecoveredSession,
      simulator.discardRecoveredSession,
    ]
  );

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
};

export const useExam = (): ExamContextType => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam debe ser utilizado dentro de un ExamProvider');
  }
  return context;
};
