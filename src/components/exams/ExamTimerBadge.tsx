import React from 'react';

interface ExamTimerBadgeProps {
  secondsRemaining: number;
}

export const ExamTimerBadge: React.FC<ExamTimerBadgeProps> = ({ secondsRemaining }) => {
  const isTimeCritical = secondsRemaining < 5 * 60; // Menos de 5 minutos

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`px-3 py-1.5 rounded-xl font-mono text-sm font-bold flex items-center gap-2 border transition-all ${
        isTimeCritical
          ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
          : 'bg-slate-100 text-slate-800 border-slate-200'
      }`}
    >
      <span>{formatTimer(secondsRemaining)}</span>
    </div>
  );
};
