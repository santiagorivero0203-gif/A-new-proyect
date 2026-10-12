import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CompassIcon, FlameIcon, TrophyIcon, SparklesIcon, CheckCircleIcon, BookOpenIcon } from '../common/Icons';
import confetti from 'canvas-confetti';

export const AndresDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Repasar operaciones con fracciones equivalentes', subject: 'Matemáticas', done: true },
    { id: 2, title: 'Leer capítulo 2: Estructura de la célula animal', subject: 'Biología', done: false },
    { id: 3, title: 'Elaborar mapa mental de las civilizaciones fluviales', subject: 'Historia Universal', done: false },
    { id: 4, title: 'Realizar sesión Pomodoro Joven (20 min)', subject: 'Hábito Diario', done: true },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.done;
          if (nextState) {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#0047AB', '#10B981', '#F59E0B'],
            });
          }
          return { ...t, done: nextState };
        }
        return t;
      })
    );
  };

  const completedCount = tasks.filter((t) => t.done).length;

  return (
    <div className="space-y-6">
      {/* Banner de Bienvenida Gamificado */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-cobalt-950 via-slate-900 to-emerald-950/40 border border-cobalt-500/20 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <CompassIcon className="w-3.5 h-3.5" />
              1er Año de Bachillerato • Ecosistema Guiado
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              ¡Hola, {user?.full_name || 'Andrés'}! 🚀
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              ¡Excelente ritmo! Estás construyendo las bases para dominar secundaria sin estrés ni sobrecarga.
            </p>
          </div>

          {/* Gamificación: Racha y Nivel */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-surface-900/80 border border-amber-500/30 shadow-lg flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <FlameIcon className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Racha Activa</p>
                <p className="text-xl font-bold text-white">{user?.streak_days || 6} Días</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-900/80 border border-cobalt-500/30 shadow-lg flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cobalt-500/10 text-cobalt-400">
                <TrophyIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Puntos XP</p>
                <p className="text-xl font-bold text-cobalt-300">{user?.xp_points || 1420} XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de progreso de nivel */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-300 font-medium">Nivel 3: Explorador Curioso</span>
            <span className="text-cobalt-300 font-mono font-semibold">1,420 / 2,000 XP hacia Nivel 4</span>
          </div>
          <div className="h-2.5 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-cobalt-600 via-cobalt-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: '71%' }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda / Central: Tareas y Técnicas de Estudio */}
        <div className="lg:col-span-2 space-y-6">
          {/* Misiones del Día */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cobalt-950 border border-cobalt-600/30 text-cobalt-400">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Misiones y Tareas de Hoy</h3>
                  <p className="text-xs text-slate-400">
                    Completadas: {completedCount} de {tasks.length}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                {Math.round((completedCount / tasks.length) * 100)}% Listo
              </span>
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                    task.done
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-400'
                      : 'bg-surface-950/60 border-white/[0.06] hover:border-cobalt-500/40 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                        task.done
                          ? 'bg-emerald-500 text-black'
                          : 'border border-slate-500 hover:border-cobalt-400'
                      }`}
                    >
                      {task.done && <CheckCircleIcon className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${task.done ? 'line-through text-slate-400' : 'text-white'}`}>
                        {task.title}
                      </p>
                      <span className="text-[11px] text-cobalt-400 font-mono">{task.subject}</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">
                    {task.done ? '+50 XP' : 'Pendiente'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Técnicas de Estudio Fundamentales */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-purple-950 border border-purple-600/30 text-purple-400">
                <BookOpenIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Técnicas de Estudio para Bachillerato</h3>
                <p className="text-xs text-slate-400">Metodologías comprobadas adaptadas a tu nivel</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-surface-950/60 border border-white/[0.06] hover:border-cobalt-500/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-cobalt-950 border border-cobalt-600/30 flex items-center justify-center text-cobalt-400 font-bold text-xs mb-2.5">
                  01
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Método Feynman Fácil</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Explícate el tema a ti mismo en voz alta como si le contaras una historia a un amigo.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-950/60 border border-white/[0.06] hover:border-amber-500/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-600/30 flex items-center justify-center text-amber-400 font-bold text-xs mb-2.5">
                  02
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Pomodoro Joven (20/5)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  20 minutos de foco total sin celular y 5 minutos de estiramiento. ¡El cerebro no se cansa!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-950/60 border border-white/[0.06] hover:border-emerald-500/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-600/30 flex items-center justify-center text-emerald-400 font-bold text-xs mb-2.5">
                  03
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Regla de los 2 Minutos</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Si guardar tu cuaderno o copiar un enunciado toma menos de 2 minutos, hazlo de inmediato.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Guía de Transición y Consejos */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-l-4 border-l-cobalt-500">
            <h3 className="text-base font-semibold text-white mb-2">Guía de Transición: De Primaria a Secundaria</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              En primaria tenías 1 solo maestro; en 1er año tienes de 8 a 9 profesores con estilos diferentes.
            </p>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="text-cobalt-400 font-bold">✓</span>
                <span>Usa un cuaderno organizado por colores para cada materia.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-cobalt-400 font-bold">✓</span>
                <span>Anota las fechas de exámenes el mismo día que las dicten.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-cobalt-400 font-bold">✓</span>
                <span>Pregunta en clase sin pena; la duda de hoy es la nota de mañana.</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-cobalt-950/80 to-surface-950 border border-cobalt-600/20 text-center">
            <p className="text-xs font-semibold text-cobalt-400 uppercase tracking-wider mb-1">Próxima Meta</p>
            <h4 className="text-base font-bold text-white mb-2">Medalla de Constancia Semanal</h4>
            <p className="text-xs text-slate-400 mb-4">Completa tus misiones mañana para desbloquear el trofeo dorado.</p>
            <button
              onClick={() => {
                confetti({ particleCount: 30, spread: 45 });
              }}
              className="btn-cobalt w-full text-xs"
            >
              🎉 ¡Celebrar Racha de 6 Días!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
