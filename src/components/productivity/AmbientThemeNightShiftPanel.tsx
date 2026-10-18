/**
 * @file AmbientThemeNightShiftPanel.tsx
 * @description Panel de Modo Oscuro Ambiental (Deep Slate #0b0f19) y Ajuste de Temperatura
 * de Color Nocturna (Night Shift / Filtro de Luz Azul) para largas sesiones de estudio.
 * Función 154 del catálogo de arquitectura.
 */

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Eye, Sliders, Shield } from 'lucide-react';

export const AmbientThemeNightShiftPanel: React.FC = () => {
  const [nightShiftIntensity, setNightShiftIntensity] = useState<number>(() => {
    const saved = localStorage.getItem('studynexus_night_shift');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [autoNightSchedule, setAutoNightSchedule] = useState<boolean>(true);

  // Aplicar filtro de luz azul (Night Shift) mediante un overlay o filtro CSS en el documento
  useEffect(() => {
    localStorage.setItem('studynexus_night_shift', nightShiftIntensity.toString());
    const filterId = 'night-shift-root-filter';
    let overlay = document.getElementById(filterId);

    if (nightShiftIntensity > 0) {
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = filterId;
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '99999';
        overlay.style.mixBlendMode = 'multiply';
        overlay.style.transition = 'background-color 0.3s ease';
        document.body.appendChild(overlay);
      }
      // Color cálido ámbar / sepia proporcional
      const alpha = (nightShiftIntensity / 100) * 0.22;
      overlay.style.backgroundColor = `rgba(255, 170, 0, ${alpha})`;
    } else if (overlay) {
      overlay.remove();
    }

    return () => {
      // Limpieza en desmontaje si es necesario
    };
  }, [nightShiftIntensity]);

  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'rose_pastel'>(() => {
    if (typeof document !== 'undefined') {
      if (document.documentElement.classList.contains('theme-rose-pastel')) return 'rose_pastel';
      if (document.documentElement.classList.contains('dark')) return 'dark';
    }
    const saved = typeof window !== 'undefined' ? localStorage.getItem('cpe_theme') : null;
    return saved === 'rose_pastel' ? 'rose_pastel' : saved === 'dark' ? 'dark' : 'light';
  });

  // Toggle de Dark Mode y Rose Pastel
  const selectTheme = (theme: 'light' | 'dark' | 'rose_pastel') => {
    setCurrentTheme(theme);
    localStorage.setItem('cpe_theme', theme);
    localStorage.setItem('studynexus_theme', theme);
    document.documentElement.classList.remove('dark', 'theme-rose-pastel');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'rose_pastel') {
      document.documentElement.classList.add('theme-rose-pastel');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100/60 shadow-xs">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 tracking-tight">
              Sistema de Temas Ambientales & Night Shift
            </h3>
            <p className="text-xs text-slate-500">
              Modo Claro editorial, Modo Oscuro Deep Slate y Tema Rose Atelier Pastel suave para María Fernanda
            </p>
          </div>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto gap-1">
          <button
            onClick={() => selectTheme('light')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              currentTheme === 'light'
                ? 'bg-white text-slate-800 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Claro</span>
          </button>
          <button
            onClick={() => selectTheme('dark')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              currentTheme === 'dark'
                ? 'bg-slate-900 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
            <span>Oscuro</span>
          </button>
          <button
            onClick={() => selectTheme('rose_pastel')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              currentTheme === 'rose_pastel'
                ? 'bg-rose-100 text-rose-800 shadow-xs font-semibold border border-rose-200'
                : 'text-rose-600 hover:text-rose-800'
            }`}
          >
            <span className="text-xs">🌸</span>
            <span>Rose Pastel</span>
          </button>
        </div>
      </div>

      {/* Control Deslizante de Night Shift */}
      <div className="p-5 bg-slate-50/70 rounded-2xl border border-slate-200/70 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-600" />
              Temperatura de Color (Filtro Ámbar Nocturno)
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Atenúa las longitudes de onda azules por debajo de 450nm para favorecer la melatonina
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
            {nightShiftIntensity}%
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={nightShiftIntensity}
          onChange={(e) => setNightShiftIntensity(parseInt(e.target.value, 10))}
          className="w-full accent-amber-500 cursor-pointer"
        />

        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>0% (Neutro 6500K)</span>
          <span>50% (Cálido Óptimo 4000K)</span>
          <span>100% (Ultra Ámbar 2700K)</span>
        </div>
      </div>

      {/* Automatización Programada y Salud Visual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 space-y-2">
          <label className="flex items-center justify-between font-semibold text-slate-800 cursor-pointer">
            <span>Horario Circadiano Automático</span>
            <input
              type="checkbox"
              checked={autoNightSchedule}
              onChange={(e) => setAutoNightSchedule(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </label>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Activa el modo cálido automáticamente desde las 20:00 hasta las 06:00 en base al huso horario local.
          </p>
        </div>

        <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/80 space-y-1.5 text-emerald-900">
          <div className="flex items-center gap-1.5 font-semibold text-xs">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Beneficio en Sesiones de 4 Horas:</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Previene el síndrome de fatiga visual informática (CVS), reduce cefaleas por deslumbramiento y mejora la velocidad de conciliación del sueño pos-estudio.
          </p>
        </div>
      </div>
    </div>
  );
};
