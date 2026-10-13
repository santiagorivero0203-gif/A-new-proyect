import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  ExamConfig,
  ExamSessionState,
  ExamReport,
  Question,
} from '../types/exam.types';
import { QUESTION_BANK } from '../lib/questionBank';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function useExamSimulator() {
  const { user } = useAuth();

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

  // Mantener referencia síncrona al estado actual de la sesión para evitar llamadas impuras dentro del updater
  const sessionRef = useRef(session);
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

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

    // 3. Persistir asíncronamente en Supabase de forma segura y desacoplada
    if (user?.id && isSupabaseConfigured()) {
      (supabase.from('exam_results') as any)
        .insert({
          user_id: user.id,
          exam_title: current.config.title,
          subject: current.config.subject || 'Multidisciplinar',
          score: scoreOn20,
          total_questions: current.questions.length,
          correct_answers: correct,
          time_taken_seconds: timeTaken,
          breakdown: topicBreakdown,
          answers: current.userAnswers,
        })
        .then(({ error }: { error: any }) => {
          if (error) console.warn('No se pudo guardar resultado en Supabase:', error.message);
        })
        .catch((err: any) => {
          console.warn('Excepción de red al guardar resultado de examen:', err);
        });
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
  const startExam = (config: ExamConfig, customQuestions?: Question[]) => {
    let pool =
      customQuestions && customQuestions.length > 0
        ? [...customQuestions]
        : config.customQuestions && config.customQuestions.length > 0
        ? [...config.customQuestions]
        : [...QUESTION_BANK];

    if (!customQuestions && !config.customQuestions) {
      if (config.subject) {
        pool = pool.filter((q) => q.subject === config.subject);
      }

      if (config.mode === 'SIMADI_UCV') {
        pool = pool.filter(
          (q) =>
            q.targetProfiles.includes('santiago_fisica_ucv') ||
            q.targetProfiles.includes('prima_bachillerato_5')
        );
      }
    }

    if (config.shuffleQuestions) {
      pool.sort(() => Math.random() - 0.5);
    }

    const selectedQuestions: Question[] = pool.slice(0, Math.min(config.totalQuestions, pool.length));

    setReport(null);
    setSession({
      status: 'IN_PROGRESS',
      config,
      questions: selectedQuestions,
      currentIndex: 0,
      userAnswers: {},
      flaggedQuestions: {},
      secondsRemaining: config.timeLimitSeconds,
      isPaused: false,
      startedAt: new Date().toISOString(),
    });
  };

  /**
   * Registrar respuesta a una pregunta
   */
  const selectAnswer = (questionId: string, optionId: string) => {
    setSession((prev) => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [questionId]: optionId,
      },
    }));
  };

  /**
   * Marcar o desmarcar pregunta para revisión
   */
  const toggleFlagQuestion = (questionId: string) => {
    setSession((prev) => ({
      ...prev,
      flaggedQuestions: {
        ...prev.flaggedQuestions,
        [questionId]: !prev.flaggedQuestions[questionId],
      },
    }));
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < session.questions.length) {
      setSession((prev) => ({ ...prev, currentIndex: index }));
    }
  };

  const nextQuestion = () => {
    setSession((prev) => ({
      ...prev,
      currentIndex: Math.min(prev.currentIndex + 1, prev.questions.length - 1),
    }));
  };

  const prevQuestion = () => {
    setSession((prev) => ({
      ...prev,
      currentIndex: Math.max(prev.currentIndex - 1, 0),
    }));
  };

  const togglePause = () => {
    if (session.config.allowPause) {
      setSession((prev) => ({ ...prev, isPaused: !prev.isPaused }));
    }
  };

  const resetExam = () => {
    setReport(null);
    setSession((prev) => ({
      ...prev,
      status: 'CONFIG',
      questions: [],
      userAnswers: {},
      flaggedQuestions: {},
    }));
  };

  return {
    session,
    report,
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
