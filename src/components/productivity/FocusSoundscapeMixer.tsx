/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - MEZCLADOR DE PAISAJES SONOROS
 * ==============================================================================
 * Componente: FocusSoundscapeMixer.tsx
 * Estética: Apple Minimalist (bg-white, rounded-2xl, Azul Cobalto #0F52BA)
 * Funcionalidad: Mezclador de audio ambiental para concentración profunda.
 * ==============================================================================
 */

import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  CloudRain,
  Activity,
  Flame,
  Waves,
  Sparkles,
} from 'lucide-react';
import { soundscapeService, type SoundTrackId } from '../../services/soundscapeService';

interface TrackConfig {
  id: SoundTrackId;
  name: string;
  desc: string;
  icon: React.ReactNode;
  defaultVol: number;
}

const TRACKS: TrackConfig[] = [
  {
    id: 'rain',
    name: 'Lluvia Suave',
    desc: 'Ruido rosa filtrado para enmascarar distracciones externas',
    icon: <CloudRain className="w-4 h-4 text-blue-500" />,
    defaultVol: 60,
  },
  {
    id: 'binaural40',
    name: 'Ondas Gamma (40 Hz)',
    desc: 'Batimiento binaural para enfoque y procesamiento cognitivo',
    icon: <Activity className="w-4 h-4 text-purple-500" />,
    defaultVol: 45,
  },
  {
    id: 'campfire',
    name: 'Fuego y Crepitar',
    desc: 'Calidez ambiental para lectura y redacción nocturna',
    icon: <Flame className="w-4 h-4 text-amber-500" />,
    defaultVol: 0,
  },
  {
    id: 'stream',
    name: 'Corriente de Agua',
    desc: 'Sonido hidrodinámico para reducir la fatiga mental',
    icon: <Waves className="w-4 h-4 text-cyan-500" />,
    defaultVol: 0,
  },
];

export const FocusSoundscapeMixer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumes, setVolumes] = useState<Record<SoundTrackId, number>>({
    rain: 60,
    binaural40: 45,
    campfire: 0,
    stream: 0,
  });

  const handleTogglePlay = () => {
    const nextState = soundscapeService.toggleMaster();
    setIsPlaying(nextState);

    if (nextState) {
      // Activar los volúmenes configurados
      Object.entries(volumes).forEach(([id, vol]) => {
        soundscapeService.setTrackVolume(id as SoundTrackId, vol);
      });
    }
  };

  const handleVolumeChange = (id: SoundTrackId, vol: number) => {
    setVolumes((prev) => ({ ...prev, [id]: vol }));
    if (isPlaying) {
      soundscapeService.setTrackVolume(id, vol);
    }
  };

  const applyPreset = (presetName: string) => {
    let newVols: Record<SoundTrackId, number> = { rain: 0, binaural40: 0, campfire: 0, stream: 0 };
    if (presetName === 'deep_focus') {
      newVols = { rain: 65, binaural40: 60, campfire: 0, stream: 20 };
    } else if (presetName === 'night_reading') {
      newVols = { rain: 30, binaural40: 0, campfire: 70, stream: 0 };
    } else if (presetName === 'gamma_boost') {
      newVols = { rain: 20, binaural40: 80, campfire: 0, stream: 0 };
    }

    setVolumes(newVols);
    if (isPlaying) {
      Object.entries(newVols).forEach(([id, vol]) => {
        soundscapeService.setTrackVolume(id as SoundTrackId, vol);
      });
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup
    };
  }, []);

  return (
    <div className={`app-card bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-purple-700">
              Audio Procedural Web Audio API
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-[#0F52BA]" />
            Mezclador de Sonido Ambiental de Concentración
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Genera ondas binaurales de 40 Hz y ruido de lluvia en local para aislar distracciones sin gastar datos.
          </p>
        </div>

        {/* Botón Principal Play/Pause */}
        <button
          onClick={handleTogglePlay}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 self-start sm:self-auto shadow-sm active:scale-95 ${
            isPlaying
              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
              : 'bg-[#0F52BA] hover:bg-[#0c4194] text-white shadow-[#0F52BA]/20'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-white" />
              <span>Pausar Sonido</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Iniciar Concentración</span>
            </>
          )}
        </button>
      </div>

      {/* Presets Rápidos */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-slate-400">Presets de Estudio:</span>
        <button
          onClick={() => applyPreset('deep_focus')}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Foco Profundo
        </button>
        <button
          onClick={() => applyPreset('gamma_boost')}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5"
        >
          <Activity className="w-3.5 h-3.5 text-purple-600" />
          Ondas Gamma 40Hz
        </button>
        <button
          onClick={() => applyPreset('night_reading')}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5"
        >
          <Flame className="w-3.5 h-3.5 text-amber-600" />
          Lectura Nocturna
        </button>
      </div>

      {/* Sliders de Pistas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TRACKS.map((t) => {
          const vol = volumes[t.id];
          return (
            <div
              key={t.id}
              className={`p-4 rounded-xl border transition-all ${
                vol > 0 && isPlaying
                  ? 'border-blue-200 bg-blue-50/40 shadow-xs'
                  : 'border-slate-200/80 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                    {t.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{t.name}</h4>
                    <span className="text-[10px] text-slate-400 block">{vol}% volumen</span>
                  </div>
                </div>
                {vol === 0 ? (
                  <VolumeX className="w-4 h-4 text-slate-300" />
                ) : (
                  <Volume2 className="w-4 h-4 text-blue-600" />
                )}
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={vol}
                onChange={(e) => handleVolumeChange(t.id, Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0F52BA]"
              />
              <p className="text-[10px] text-slate-400 mt-1 leading-tight">{t.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FocusSoundscapeMixer;
