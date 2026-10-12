import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LayersIcon } from '../common/Icons';

export const ExamSimulatorsView: React.FC = () => {
  const { user } = useAuth();
  const [activeExam, setActiveExam] = useState<string | null>(null);

  const exams = [
    {
      id: 'simadi-diagnostico',
      title: 'Prueba Diagnóstica Integral Simadi: Razonamiento Lógico & Verbal',
      subject: 'Exploración Vocacional & Habilidad Numérica',
      questions: 40,
      durationMinutes: 60,
      difficulty: 'Intermedio',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      description: 'Evaluación rápida de 40 preguntas cronometradas con desglose de áreas de oportunidad.',
    },
    {
      id: 'simadi-ucv-ciencias',
      title: 'Simulacro Tipo Prueba Interna UCV (Facultad de Ciencias e Ingeniería)',
      subject: 'Física, Matemática & Razonamiento Abstracto',
      questions: 60,
      durationMinutes: 120,
      difficulty: 'Avanzado',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'Formato riguroso con penalización por respuesta errónea idéntico a las pruebas de admisión UCV.',
    },
    {
      id: 'simadi-bachillerato-ciencias',
      title: 'Evaluación Sumativa de Ciencias Básicas (Biología & Química)',
      subject: 'Ciencias Naturales',
      questions: 35,
      durationMinutes: 45,
      difficulty: 'Fundamental',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Preguntas sobre balanceo químico, genética y funciones celulares clave.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            <LayersIcon className="w-3.5 h-3.5" />
            Motor de Exámenes Cronometrados • Simulación Simadi
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
            Simuladores de Admisión y Evaluaciones
          </h2>
          <p className="text-sm text-slate-500">
            Pon a prueba tus conocimientos bajo condiciones reales de tiempo y presión académica.
          </p>
        </div>

        <span className="text-xs font-mono text-slate-400">
          Historial activo para {user?.full_name}
        </span>
      </div>

      {/* Lista de Exámenes */}
      <div className="space-y-4">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="app-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-300 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${exam.badgeColor}`}>
                  {exam.subject}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {exam.questions} Preguntas • {exam.durationMinutes} Minutos
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{exam.title}</h3>
              <p className="text-xs text-slate-500">{exam.description}</p>
            </div>

            <button
              onClick={() => setActiveExam(exam.id)}
              className="btn-primary text-xs py-2.5 px-5 shrink-0"
            >
              Comenzar Prueba
            </button>
          </div>
        ))}
      </div>

      {/* Modal simulador activo */}
      {activeExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-soft-lg space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold">
              ⏱
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              ¿Listo para comenzar el simulacro?
            </h3>
            <p className="text-xs text-slate-500">
              El temporizador comenzará de inmediato. Asegúrate de tener lápiz, papel borrador y tu calculadora a mano.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => setActiveExam(null)}
                className="btn-secondary text-xs px-4"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert('¡Simulacro iniciado con temporizador en segundo plano!');
                  setActiveExam(null);
                }}
                className="btn-brand text-xs px-5"
              >
                Iniciar Ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
