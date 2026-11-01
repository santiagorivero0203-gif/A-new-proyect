import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  ExamConfig,
  ExamSessionState,
  ExamReport,
  Question,
} from '../types/exam.types';
import { QUESTION_BANK } from '../lib/questionBank';
import { ALL_MAFE_QUESTIONS } from '../data/mafe_curriculum_hub';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { sessionRecoveryService } from '../services/sessionRecoveryService';

export function useExamSimulator() {
  const { user, academicProfile } = useAuth();

  const [session, setSession] = useState<ExamSessionState>({
    status: 'CONFIG',
    config: {
      mode: 'QUICK_PRACTICE',
      title: 'Simulacro Rápido de Práctica',
      totalQuestions: 5,
      timeLimitSeconds: 15 * 60,
      allowPause: true,
      shuffleQuestions: true,
    },
    questions: [],
    currentIndex: 0,
    userAnswers: {},
    flaggedQuestions: {},
    secondsRemaining: 15 * 60,
    isPaused: false,
    startedAt: '',
  });

  const [report, setReport] = useState<ExamReport | null>(null);
  const [recoverableSession, setRecoverableSession] = useState<ExamSessionState | null>(() => {
    const backup = sessionRecoveryService.getActiveExamSession(user?.id);
    if (backup && backup.status === 'IN_PROGRESS' && backup.questions.length > 0) {
      return backup;
    }
    return null;
  });

  const prevUserIdRef = useRef(user?.id);
  // Escuchar reconexión y detectar sesiones pendientes de recuperación aisladas por cuenta
  useEffect(() => {
    const cleanupSync = sessionRecoveryService.initNetworkSyncListener(user?.id);
    if (prevUserIdRef.current !== user?.id) {
      prevUserIdRef.current = user?.id;
      const backup = sessionRecoveryService.getActiveExamSession(user?.id);
      if (backup && backup.status === 'IN_PROGRESS' && backup.questions.length > 0) {
        setRecoverableSession(backup);
      } else {
        setRecoverableSession(null);
      }
    }
    return cleanupSync;
  }, [user?.id]);

  // Mantener referencia síncrona al estado actual de la sesión para evitar llamadas impuras dentro del updater
  const sessionRef = useRef(session);
  useEffect(() => {
    sessionRef.current = session;
    if (session.status === 'IN_PROGRESS') {
      sessionRecoveryService.saveActiveExamSession(session, user?.id);
    }
  }, [session, user?.id]);

  /**
   * Finaliza el examen y computa el reporte pedagógico con desglose
   * Lógica purificada: el cálculo y persistencia se ejecutan fuera del updater de estado
   */
  const finishExam = useCallback(() => {
    const current = sessionRef.current;
    if (current.status === 'FINISHED') return;

    const timeTaken = Math.max(0, current.config.timeLimitSeconds - current.secondsRemaining);
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    const topicBreakdown: Record<string, { total: number; correct: number }> = {};
    const subjectBreakdown: Record<string, { total: number; correct: number }> = {};

    current.questions.forEach((q) => {
      // Inicializar desglose por tema
      if (!topicBreakdown[q.topic]) {
        topicBreakdown[q.topic] = { total: 0, correct: 0 };
      }
      topicBreakdown[q.topic].total += 1;

      // Inicializar desglose por materia
      if (!subjectBreakdown[q.subject]) {
        subjectBreakdown[q.subject] = { total: 0, correct: 0 };
      }
      subjectBreakdown[q.subject].total += 1;

      const answer = current.userAnswers[q.id];
      if (!answer) {
        unanswered += 1;
      } else if (answer === q.correctOptionId) {
        correct += 1;
        topicBreakdown[q.topic].correct += 1;
        subjectBreakdown[q.subject].correct += 1;
      } else {
        incorrect += 1;
      }
    });

    const total = current.questions.length || 1;
    const scoreOn20 = Number(((correct / total) * 20).toFixed(2));
    const percentage = Math.round((correct / total) * 100);

    const generatedReport: ExamReport = {
      examTitle: current.config.title,
      subject: current.config.subject || 'Evaluación Multidisciplinaria',
      score: scoreOn20,
      percentage,
      totalQuestions: current.questions.length,
      correctAnswers: correct,
      incorrectAnswers: incorrect,
      unansweredAnswers: unanswered,
      timeTakenSeconds: timeTaken,
      breakdownByTopic: topicBreakdown,
      breakdownBySubject: subjectBreakdown,
      questions: current.questions,
      userAnswers: current.userAnswers,
      completedAt: new Date().toISOString(),
    };

    // 1. Despachar reporte
    setReport(generatedReport);

    // 2. Transicionar estado de sesión a FINISHED
    setSession((prev) => ({
      ...prev,
      status: 'FINISHED',
      completedAt: generatedReport.completedAt,
    }));

    // 3. Limpiar respaldo de sesión en curso
    sessionRecoveryService.clearActiveExamSession(user?.id);

    // 4. Persistir en Supabase o encolar para sincronización offline
    if (user?.id) {
      if (!navigator.onLine || !isSupabaseConfigured()) {
        sessionRecoveryService.queuePendingReport(generatedReport, user.id);
        console.info('[useExamSimulator] Sin conexión activa. Reporte encolado en caché offline local.');
      } else {
        (supabase.from('exam_results') as any)
          .insert({
            user_id: user.id,
            exam_title: current.config.title,
            subject: current.config.subject || 'Multidisciplinar',
            area: current.config.subject || 'Multidisciplinar',
            score: scoreOn20,
            percentage,
            total_questions: current.questions.length,
            correct_answers: correct,
            time_taken_seconds: timeTaken,
            time_used_seconds: timeTaken,
            breakdown: topicBreakdown,
            answers: current.userAnswers,
          })
          .then(({ error }: { error: any }) => {
            if (error) {
              console.warn('Fallo guardando en Supabase. Encolando offline:', error.message);
              sessionRecoveryService.queuePendingReport(generatedReport, user.id);
            }
          })
          .catch((err: any) => {
            console.warn('Excepción de red al guardar resultado de examen. Encolando offline:', err);
            sessionRecoveryService.queuePendingReport(generatedReport, user.id);
          });
      }
    }
  }, [user]);

  /**
   * Temporizador estricto con auto-entrega desacoplada al expirar el tiempo
   */
  useEffect(() => {
    if (session.status !== 'IN_PROGRESS' || session.isPaused) return;

    // Si el tiempo llegó a 0, activar la entrega fuera del callback del temporizador
    if (session.secondsRemaining <= 0) {
      finishExam();
      return;
    }

    const timer = setInterval(() => {
      setSession((prev) => {
        if (prev.secondsRemaining <= 1) {
          return { ...prev, secondsRemaining: 0 };
        }
        return { ...prev, secondsRemaining: prev.secondsRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [session.status, session.isPaused, session.secondsRemaining, finishExam]);

  /**
   * Inicia un examen configurando la selección de preguntas (admite banco generado por IA)
   */
  const startExam = useCallback((config: ExamConfig, customQuestions?: Question[]) => {
    const activeProf = user?.academic_profile || academicProfile;

    let pool =
      customQuestions && customQuestions.length > 0
        ? [...customQuestions]
        : config.customQuestions && config.customQuestions.length > 0
        ? [...config.customQuestions]
        : [...QUESTION_BANK];

    if (!customQuestions && !config.customQuestions) {
      if (config.subject) {
        pool = pool.filter((q) => q.subject.toLowerCase() === config.subject?.toLowerCase());
      }

      if (config.mode === 'SIMADI_UCV') {
        pool = pool.filter((q) =>
          q.targetProfiles.includes('santiago_fisica_ucv')
        );
      } else if (config.mode === 'UNIVERSITY_EXAM') {
        if (activeProf === 'mafe_diseno_ucab') {
          pool = pool.filter((q) =>
            q.targetProfiles.includes('mafe_diseno_ucab') || q.subject === 'Diseño'
          );
        } else {
          pool = pool.filter(
            (q) =>
              q.targetProfiles.includes('santiago_fisica_ucv') ||
              q.targetProfiles.includes('prima_bachillerato_5')
          );
        }
      } else if (config.mode === 'HIGH_SCHOOL_EXAM') {
        pool = pool.filter(
          (q) =>
            q.targetProfiles.includes('andres_bachillerato_1') ||
            q.targetProfiles.includes('prima_bachillerato_5')
        );
      } else {
        // En modos genéricos (QUICK_PRACTICE, TIME_PRESSURE, DIAGNOSTIC_EXAM):
        // Priorizar estrictamente las preguntas del estudiante activo para evitar asignarle
        // materias universitarias a bachillerato o física a diseño.
        if (activeProf === 'mafe_diseno_ucab') {
          pool = pool.filter(
            (q) => q.targetProfiles.includes('mafe_diseno_ucab') || q.subject === 'Diseño'
          );
        } else if (activeProf === 'andres_bachillerato_1') {
          pool = pool.filter((q) => q.targetProfiles.includes('andres_bachillerato_1'));
        } else if (activeProf === 'prima_bachillerato_5') {
          pool = pool.filter((q) => q.targetProfiles.includes('prima_bachillerato_5'));
        } else if (activeProf === 'santiago_fisica_ucv') {
          pool = pool.filter((q) => q.targetProfiles.includes('santiago_fisica_ucv'));
        }
      }
    }

    // Salvaguarda: si tras filtrar la lista queda vacía, recuperar preguntas acordes al perfil o materia
    if (pool.length === 0) {
      if (activeProf === 'mafe_diseno_ucab') {
        pool = [...ALL_MAFE_QUESTIONS];
      } else if (config.subject) {
        pool = QUESTION_BANK.filter((q) => q.subject.toLowerCase() === config.subject?.toLowerCase());
      }
      if (pool.length === 0 && activeProf) {
        pool = QUESTION_BANK.filter((q) => q.targetProfiles && q.targetProfiles.includes(activeProf as any));
      }
      if (pool.length === 0) {
        pool = [...QUESTION_BANK];
      }
    }

    if (config.shuffleQuestions) {
      pool.sort(() => Math.random() - 0.5);
    }

    // Asegurar que totalQuestions sea al menos 1 y no exceda la disponibilidad
    const requestedCount = config.totalQuestions && config.totalQuestions > 0 ? config.totalQuestions : 5;
    const finalCount = Math.max(1, Math.min(requestedCount, pool.length));
    const selectedQuestions: Question[] = pool.slice(0, finalCount);

    const finalCustom =
      customQuestions && customQuestions.length > 0
        ? customQuestions
        : config.customQuestions && config.customQuestions.length > 0
        ? config.customQuestions
        : undefined;

    const enrichedConfig: ExamConfig = {
      ...config,
      totalQuestions: finalCount,
      customQuestions: finalCustom,
    };

    setReport(null);
    setSession({
      status: 'IN_PROGRESS',
      config: enrichedConfig,
      questions: selectedQuestions,
      currentIndex: 0,
      userAnswers: {},
      flaggedQuestions: {},
      secondsRemaining: config.timeLimitSeconds,
      isPaused: false,
      startedAt: new Date().toISOString(),
    });
  }, [user, academicProfile]);

  /**
   * Registrar respuesta a una pregunta con soporte para Muerte Súbita (SUDDEN_DEATH)
   */
  const selectAnswer = useCallback((questionId: string, optionId: string) => {
    setSession((prev) => {
      const updatedAnswers = {
        ...prev.userAnswers,
        [questionId]: optionId,
      };

      // Si estamos en Muerte Súbita, verificar si la respuesta es incorrecta
      if (prev.config.mode === 'SUDDEN_DEATH') {
        const question = prev.questions.find((q) => q.id === questionId);
        if (question && question.correctOptionId !== optionId) {
          // Detener y auto-finalizar el examen inmediatamente
          setTimeout(() => {
            finishExam();
          }, 400);
        }
      }

      return {
        ...prev,
        userAnswers: updatedAnswers,
      };
    });
  }, [finishExam]);

  /**
   * Marcar o desmarcar pregunta para revisión
   */
  const toggleFlagQuestion = useCallback((questionId: string) => {
    setSession((prev) => ({
      ...prev,
      flaggedQuestions: {
        ...prev.flaggedQuestions,
        [questionId]: !prev.flaggedQuestions[questionId],
      },
    }));
  }, []);

  const goToQuestion = useCallback((index: number) => {
    setSession((prev) => {
      if (index >= 0 && index < prev.questions.length) {
        return { ...prev, currentIndex: index };
      }
      return prev;
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      currentIndex: Math.min(prev.currentIndex + 1, prev.questions.length - 1),
    }));
  }, []);

  const prevQuestion = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      currentIndex: Math.max(prev.currentIndex - 1, 0),
    }));
  }, []);

  const togglePause = useCallback(() => {
    setSession((prev) => {
      if (prev.config.allowPause) {
        return { ...prev, isPaused: !prev.isPaused };
      }
      return prev;
    });
  }, []);

  const resetExam = useCallback(() => {
    sessionRecoveryService.clearActiveExamSession(user?.id);
    setReport(null);
    setSession((prev) => ({
      ...prev,
      status: 'CONFIG',
      questions: [],
      userAnswers: {},
      flaggedQuestions: {},
    }));
  }, [user?.id]);

  const resumeRecoveredSession = () => {
    if (recoverableSession) {
      setSession(recoverableSession);
      setRecoverableSession(null);
    }
  };

  const discardRecoveredSession = () => {
    sessionRecoveryService.clearActiveExamSession(user?.id);
    setRecoverableSession(null);
  };

  return {
    session,
    report,
    recoverableSession,
    resumeRecoveredSession,
    discardRecoveredSession,
    startExam,
    selectAnswer,
    toggleFlagQuestion,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    togglePause,
    finishExam,
    resetExam,
  };
}
