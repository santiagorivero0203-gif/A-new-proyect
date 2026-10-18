import React, { useState, useEffect } from 'react';
import { TimerIcon, PlayIcon, PauseIcon, RotateCcwIcon } from '../../common/Icons';
import confetti from 'canvas-confetti';
import { useAuth } from '../../../context/AuthContext';

export const PomodoroWidget: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id || user?.academic_profile || 'santiago_fisica_ucv';
  const initialDurationMin = user?.preferences?.focus_duration || 25;

  const [selectedDuration, setSelectedDuration] = useState<number>(initialDurationMin * 60);
  const [timeLeft, setTimeLeft] = useState<number>(initialDurationMin * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessionLabel, setSessionLabel] = useState<string>(`Bloque ${initialDurationMin} min`);
  const [completedToday, setCompletedToday] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(`cpe_${userId}_pomodoros_today`);
      return stored ? parseInt(stored, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  // Actualizar al cambiar de usuario
  useEffect(() => {
    const prefMin = user?.preferences?.focus_duration || 25;
    setSelectedDuration(prefMin * 60);
    setTimeLeft(prefMin * 60);
    setIsRunning(false);
    setSessionLabel(`Bloque ${prefMin} min`);
    try {
      const stored = localStorage.getItem(`cpe_${userId}_pomodoros_today`);
      setCompletedToday(stored ? parseInt(stored, 10) || 0 : 0);
    } catch {
      setCompletedToday(0);
    }
  }, [userId, user?.preferences?.focus_duration]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setCompletedToday((prev) => {
        const next = prev + 1;
        try {
          localStorage.setItem(`cpe_${userId}_pomodoros_today`, String(next));
        } catch {
          // Ignore
        }
        return next;
      });
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#0F52BA', '#3B82F6', '#60A5FA'],
      });
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, userId]);

  const setTimerPreset = (minutes: number, label: string) => {
    setIsRunning(false);
    setSelectedDuration(minutes * 60);
    setTimeLeft(minutes * 60);
    setSessionLabel(label);
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(selectedDuration);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.round(
    ((selectedDuration - timeLeft) / (selectedDuration || 1)) * 100
  );

  return (
    <div className="app-card p-4 sm:p-6 flex flex-col justify-between h-full bg-white border border-slate-200/80 shadow-soft">
      <div>
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
              <TimerIcon className="w-5 h-5 text-brand-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Temporizador Pomodoro
              </h3>
              <p className="text-[11px] text-slate-500">{sessionLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {completedToday > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                {completedToday} completados hoy
              </span>
            )}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                isRunning ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {isRunning ? 'En curso' : 'Listo'}
            </span>
          </div>
        </div>

        {/* Botones de Modos */}
        <div className="grid grid-cols-3 gap-1.5 mb-5">
          <button
            onClick={() => setTimerPreset(25, 'Bloque Estándar 25 min')}
            className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all ${
              selectedDuration === 25 * 60
                ? 'bg-brand-500 text-white shadow-soft-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
            }`}
          >
            25 Min
          </button>
          <button
            onClick={() => setTimerPreset(50, 'Alta Intensidad 50 min')}
            className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all ${
              selectedDuration === 50 * 60
                ? 'bg-brand-500 text-white shadow-soft-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
            }`}
          >
            50 Min
          </button>
          <button
            onClick={() => setTimerPreset(5, 'Descanso 5 min')}
            className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all ${
              selectedDuration === 5 * 60
                ? 'bg-brand-500 text-white shadow-soft-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
            }`}
          >
            5 Min Relax
          </button>
        </div>

        {/* Display del Reloj */}
        <div className="my-5 text-center">
          <div className="text-5xl font-black font-mono text-slate-900 tracking-tight">
            {formatTimer(timeLeft)}
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-brand-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">
            {isRunning ? 'Progreso: ' + progressPercent + '%' : 'Presiona Iniciar para comenzar'}
          </p>
        </div>

        {/* Controles de Acción */}
        <div className="flex items-center justify-center gap-2.5">
          <button
            onClick={toggleTimer}
            className={`px-6 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all shadow-soft-sm ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'btn-brand'
            }`}
          >
            {isRunning ? (
              <>
                <PauseIcon className="w-4 h-4" /> Pausar
              </>
            ) : (
              <>
                <PlayIcon className="w-4 h-4" /> Iniciar Sesión
              </>
            )}
          </button>
          <button
            onClick={resetTimer}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/80 shadow-soft-sm transition-all"
            title="Reiniciar cronómetro"
          >
            <RotateCcwIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="pt-3 mt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Meta diaria: 4 bloques</span>
        <span className="font-semibold text-slate-800 font-mono">2 / 4 completados</span>
      </div>
    </div>
  );
};
