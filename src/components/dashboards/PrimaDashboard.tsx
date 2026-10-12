import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TimerIcon, PlayIcon, PauseIcon, RotateCcwIcon, FlameIcon, SparklesIcon } from '../common/Icons';

export const PrimaDashboard: React.FC = () => {
  const { user } = useAuth();

  // Cronómetro de Alta Intensidad (50 min / 10 min)
  const [timeLeft, setTimeLeft] = useState<number>(50 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessionType, setSessionType] = useState<'FOCUS' | 'BREAK'>('FOCUS');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (sessionType === 'FOCUS') {
        setSessionType('BREAK');
        setTimeLeft(10 * 60);
      } else {
        setSessionType('FOCUS');
        setTimeLeft(50 * 60);
      }
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, sessionType]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(sessionType === 'FOCUS' ? 50 * 60 : 10 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulación Simadi datasets
  const simadiExams = [
    {
      id: 'ucv-ciencias',
      title: 'Simulacro Tipo Prueba Interna UCV (Facultad de Ciencias & Ingeniería)',
      questions: 60,
      timeMinutes: 120,
      lastScore: '16.8 / 20 (84%)',
      badge: 'Prioridad Alta',
      status: 'Disponible',
    },
    {
      id: 'opsu-nacional',
      title: 'Prueba Nacional de Exploración Vocacional & Razonamiento OPSU',
      questions: 80,
      timeMinutes: 90,
      lastScore: '91 / 100 (91%)',
      badge: 'Validado',
      status: 'Completado',
    },
    {
      id: 'ucab-admision',
      title: 'Examen de Admisión General UCAB (Razonamiento Verbal & Cuantitativo)',
      questions: 50,
      timeMinutes: 75,
      lastScore: 'Pendiente',
      badge: 'Programado',
      status: 'Por Realizar',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Banner de Alta Intensidad Pre-Universitario */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-950/40 via-surface-900 to-cobalt-950/60 border border-amber-500/20 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              5to Año de Bachillerato • Modo Admisión Universitaria
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Modo Alta Intensidad: {user?.full_name || 'Prima'} ⚡
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Foco implacable en simulación de exámenes bajo presión cronometrada, rendimiento en percentil superior y técnicas de descarte rápido.
            </p>
          </div>

          {/* Contador de Días para Admisión */}
          <div className="flex items-center gap-3">
            <div className="p-4 rounded-2xl bg-surface-950/90 border border-amber-500/30 text-center shadow-lg">
              <p className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Cuenta Regresiva OPSU</p>
              <p className="text-3xl font-black text-white font-mono mt-0.5">42</p>
              <p className="text-[10px] text-slate-400">Días Restantes</p>
            </div>
            <div className="p-4 rounded-2xl bg-surface-950/90 border border-cobalt-500/30 text-center shadow-lg">
              <p className="text-[10px] uppercase font-bold tracking-wider text-cobalt-400">Prueba Interna UCV</p>
              <p className="text-3xl font-black text-white font-mono mt-0.5">68</p>
              <p className="text-[10px] text-slate-400">Días Restantes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda: Cronómetro Pomodoro 50/10 de Alta Concentración */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-950 border border-amber-500/30 text-amber-400">
                  <TimerIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Cronómetro de Alta Intensidad</h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {sessionType === 'FOCUS' ? 'Bloque de Foco: 50 Min' : 'Descanso Estratégico: 10 Min'}
                  </span>
                </div>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  sessionType === 'FOCUS'
                    ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {sessionType}
              </span>
            </div>

            {/* Display de Tiempo */}
            <div className="my-6 text-center">
              <div className="text-5xl sm:text-6xl font-black font-mono text-white tracking-widest drop-shadow-md">
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {isRunning ? '🔥 Concentración activa: cero distracciones' : '⏸ Pausado o listo para iniciar'}
              </p>
            </div>

            {/* Controles de Cronómetro */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={toggleTimer}
                className={`px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95 ${
                  isRunning
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/40'
                    : 'bg-cobalt-700 hover:bg-cobalt-600 text-white shadow-cobalt-900/50'
                }`}
              >
                {isRunning ? (
                  <>
                    <PauseIcon className="w-4 h-4" /> Pausar Foco
                  </>
                ) : (
                  <>
                    <PlayIcon className="w-4 h-4" /> Iniciar Pulso 50m
                  </>
                )}
              </button>
              <button
                onClick={resetTimer}
                className="p-3 rounded-xl bg-surface-900 hover:bg-surface-800 text-slate-300 border border-white/[0.08] active:scale-95 transition-all"
                title="Reiniciar cronómetro"
              >
                <RotateCcwIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.08] text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <FlameIcon className="w-4 h-4 text-amber-400" /> Racha: {user?.streak_days || 14} días seguidos
            </span>
            <span className="font-mono text-slate-300">4 bloques completados hoy</span>
          </div>
        </div>

        {/* Columna Central y Derecha: Simuladores Simadi y Métricas de Rendimiento */}
        <div className="lg:col-span-2 space-y-6">
          {/* Módulo de Exámenes - Núcleo Simulación Simadi */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cobalt-950 border border-cobalt-600/30 text-cobalt-400">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Simuladores de Admisión (Motor Simadi)</h3>
                  <p className="text-xs text-slate-400">
                    Bancos de preguntas cronometrados con desglose de aciertos por área
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cobalt-950 text-cobalt-300 border border-cobalt-600/30">
                v2.0 Motor Activo
              </span>
            </div>

            <div className="space-y-3">
              {simadiExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 rounded-xl bg-surface-950/70 border border-white/[0.06] hover:border-cobalt-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-cobalt-400 font-mono">
                        {exam.questions} Preguntas • {exam.timeMinutes} Min
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10 font-semibold">
                        {exam.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white">{exam.title}</h4>
                    <p className="text-xs text-slate-400">Último resultado registrado: {exam.lastScore}</p>
                  </div>
                  <button className="btn-cobalt shrink-0 text-xs py-2 px-3.5">
                    Lanzar Simulacro
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Métricas de Acierto por Área Temática */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Desglose de Desempeño Histórico (Percentil OPSU)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-surface-950/60 border border-white/[0.06]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-300 font-medium">Razonamiento Verbal</span>
                  <span className="text-emerald-400 font-bold font-mono">88%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }} />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Excelente dominio semántico y analogías</p>
              </div>

              <div className="p-4 rounded-xl bg-surface-950/60 border border-white/[0.06]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-300 font-medium">Razonamiento Lógico</span>
                  <span className="text-amber-400 font-bold font-mono">76%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '76%' }} />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Reforzar series numéricas y matrices</p>
              </div>

              <div className="p-4 rounded-xl bg-surface-950/60 border border-white/[0.06]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-300 font-medium">Ciencias Básicas</span>
                  <span className="text-cobalt-400 font-bold font-mono">82%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cobalt-500 rounded-full" style={{ width: '82%' }} />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Química orgánica y estequiometría</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
