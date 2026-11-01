import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Film,
  ArrowRight
} from 'lucide-react';

export interface BeatScene {
  beatNumber: number;
  type: 'hero' | 'points' | 'showcase' | 'cta';
  badge: string;
  title: string;
  sub?: string;
  kicker?: string;
  keyword?: string;
  points?: Array<{ label: string; desc: string }>;
  durationSeconds: number;
}

export interface KineticReelPlayerProps {
  title?: string;
  subject?: string;
  scenes?: BeatScene[];
  videoSrc?: string;
  onCtaClick?: () => void;
  className?: string;
}

const DEFAULT_MAFE_SCENES: BeatScene[] = [
  {
    beatNumber: 1,
    type: 'hero',
    badge: 'SEMIÓTICA VISUAL · CAPÍTULO 1',
    kicker: 'TEORÍA DEL DISEÑO UCAB',
    title: '¿Por qué los objetos cotidianos *nos hablan*?',
    sub: 'Los artefactos no solo cumplen una función utilitaria; actúan como vehículos de comunicación que transmiten estatus, ideología y valores.',
    durationSeconds: 4.5,
  },
  {
    beatNumber: 2,
    type: 'points',
    badge: 'SAUSSURE & BARTHES · MODELO DEL SIGNO',
    kicker: 'ANATOMÍA DEL SIGNO',
    title: 'El plano *material* vs el plano *mental*',
    sub: 'Ferdinand de Saussure y Roland Barthes deconstruyen el objeto en dos niveles inseparables:',
    points: [
      {
        label: 'Significante (Plano Material)',
        desc: 'Lo físico tangible: plástico PET transparente, tapa azul estriada, curvatura ergonómica.',
      },
      {
        label: 'Significado (Plano Mental)',
        desc: 'El concepto cultural activado: pureza del agua, frescura matutina y bienestar.',
      },
      {
        label: 'Arbitrariedad del Signo',
        desc: 'No hay conexión biológica natural entre el plástico y la pureza; es una convención cultural aprendida.',
      },
    ],
    durationSeconds: 5.5,
  },
  {
    beatNumber: 3,
    type: 'showcase',
    badge: 'GESTALT & PERCEPCIÓN · CAPÍTULO 2',
    kicker: 'REGLA DE LOS 3 SEGUNDOS',
    title: 'Leyes de la *Gestalt*: la trampa perceptiva',
    sub: 'Antes de que el usuario razone conscientemente, su cerebro agrupa y completa formas en fracciones de segundo.',
    points: [
      {
        label: 'Proximidad y Semejanza',
        desc: 'Agrupamos visualmente elementos cercanos y con formas o colores análogos.',
      },
      {
        label: 'Cierre (Closure)',
        desc: 'El cerebro rellena vacíos para percibir figuras completas e integradas.',
      },
      {
        label: 'Figura y Fondo',
        desc: 'Separación inmediata entre el elemento protagónico y el contexto espacial.',
      },
    ],
    durationSeconds: 5.0,
  },
  {
    beatNumber: 4,
    type: 'points',
    badge: 'DONALD NORMAN · CAPÍTULO 3',
    kicker: 'USABILIDAD E INTERACCIÓN',
    title: 'Affordance, *Signifiers* y Topografía Natural',
    sub: 'Cómo interactúa el ser humano con los artefactos sin manual de instrucciones:',
    points: [
      {
        label: 'Affordance (Prestación)',
        desc: 'Propiedad física real del objeto: una placa plana invita a empujar; un tirador a jalar.',
      },
      {
        label: 'Signifier (Señalizador)',
        desc: 'Pista gráfica explícita añadida por el diseñador (ej: rótulo textual "EMPUJE").',
      },
      {
        label: 'Topografía Natural (Mapping)',
        desc: 'La disposición espacial de los mandos imita la geometría real de lo que controlan.',
      },
    ],
    durationSeconds: 5.5,
  },
  {
    beatNumber: 5,
    type: 'cta',
    badge: 'MODELO OFICIAL DE EXAMEN',
    kicker: 'BANCO CALIBRADO CPE',
    title: 'Domina los parciales de *DISEÑO UCAB*',
    keyword: 'DISEÑO UCAB',
    sub: '30 preguntas calibradas con pauta oficial, flashcards y deconstrucción analítica disponibles en tu simulador.',
    durationSeconds: 4.5,
  },
];

/**
 * KineticReelPlayer: Reproductor cinético de alta fidelidad vertical 9:16
 * Diseñado según los principios de la Guía Maestra de Producción de Videos Cinéticos con IA (Remotion / HyperFrames).
 */
export const KineticReelPlayer: React.FC<KineticReelPlayerProps> = ({
  title = 'Teoría del Diseño · Reel Cinético de Estudio',
  subject = 'Diseño Integral',
  scenes = DEFAULT_MAFE_SCENES,
  videoSrc = '/videos/mafe_teoria_diseno.mp4',
  onCtaClick,
  className = '',
}) => {
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const [playerMode, setPlayerMode] = useState<'kinetic' | 'mp4'>('kinetic');
  const [hasMp4Video, setHasMp4Video] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bgmAudioRef = useRef<HTMLAudioElement | null>(null);
  const sfxAudioRef = useRef<HTMLAudioElement | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  const currentScene = scenes[currentBeatIndex] || scenes[0];

  // Verificar si existe el archivo MP4 exportado
  useEffect(() => {
    if (!videoSrc) return;
    fetch(videoSrc, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setHasMp4Video(true);
      })
      .catch(() => setHasMp4Video(false));
  }, [videoSrc]);

  // Manejo de SFX y Audio BGM
  const playSfx = (sfxName: string) => {
    if (isMuted) return;
    try {
      if (!sfxAudioRef.current) {
        sfxAudioRef.current = new Audio();
      }
      sfxAudioRef.current.src = `/audio/sfx/${sfxName}`;
      sfxAudioRef.current.volume = 0.45;
      sfxAudioRef.current.play().catch(() => {});
    } catch {
      // Ignorar bloqueos de autoplay del navegador
    }
  };

  // Reproducción de música de fondo (BGM)
  useEffect(() => {
    if (!bgmAudioRef.current) {
      bgmAudioRef.current = new Audio('/audio/bgm/tech_ambient_bed.mp3');
      bgmAudioRef.current.loop = true;
      bgmAudioRef.current.volume = 0.18;
    }

    if (isPlaying && !isMuted && playerMode === 'kinetic') {
      bgmAudioRef.current.play().catch(() => {});
    } else {
      bgmAudioRef.current.pause();
    }

    return () => {
      bgmAudioRef.current?.pause();
    };
  }, [isPlaying, isMuted, playerMode]);

  // Cronómetro del beat cinético
  useEffect(() => {
    if (!isPlaying || playerMode !== 'kinetic') return;

    const durationMs = currentScene.durationSeconds * 1000;
    const intervalTime = 50;
    const stepPercent = (intervalTime / durationMs) * 100;

    const timer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          // Avanzar al siguiente beat
          if (currentBeatIndex < scenes.length - 1) {
            setCurrentBeatIndex((idx) => idx + 1);
            playSfx('whoosh-short.mp3');
            return 0;
          } else {
            // Loop al inicio con chime de fin
            playSfx('chime.mp3');
            setCurrentBeatIndex(0);
            return 0;
          }
        }
        return prev + stepPercent;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, currentBeatIndex, currentScene.durationSeconds, scenes.length, playerMode, isMuted]);

  // Cambio manual de beat
  const goToBeat = (index: number) => {
    setCurrentBeatIndex(index);
    setProgressPercent(0);
    playSfx('click-soft.mp3');
  };

  // Parsear texto cinético con palabras clave en asteriscos: *palabra*
  const renderKineticText = (text: string, accentClass = 'text-sky-400') => {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        const word = part.slice(1, -1);
        return (
          <span
            key={i}
            className={`${accentClass} font-bold inline-block drop-shadow-[0_0_12px_rgba(56,189,248,0.45)]`}
          >
            {word}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[420px] mx-auto aspect-[9/16] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-between select-none ${className}`}
      style={{
        background: 'radial-gradient(ellipse at 50% 10%, #1e1b4b 0%, #0f172a 50%, #030712 100%)',
      }}
    >
      {/* 1. BARRA SUPERIOR DE HISTORIAS / PROGRESS BARS POR BEAT */}
      <div className="absolute top-0 inset-x-0 z-30 p-4 pt-3.5 space-y-2 bg-gradient-to-b from-black/80 via-black/30 to-transparent">
        {/* Barras de progreso de cada Beat */}
        <div className="flex items-center gap-1.5" title={title}>
          {scenes.map((_, idx) => (
            <div
              key={idx}
              onClick={() => goToBeat(idx)}
              className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:h-1.5 transition-all"
            >
              <div
                className="h-full bg-sky-400 transition-all duration-75 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                style={{
                  width:
                    idx < currentBeatIndex
                      ? '100%'
                      : idx === currentBeatIndex
                      ? `${progressPercent}%`
                      : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* Header de Metadatos y Controles de Audio */}
        <div className="flex items-center justify-between text-white/90 pt-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span className="text-[11px] font-mono tracking-wider uppercase text-sky-300 font-bold">
              BEAT {currentScene.beatNumber} / {scenes.length}
            </span>
            <span className="text-[10px] text-white/50 hidden sm:inline">• {subject}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {hasMp4Video && (
              <button
                onClick={() => setPlayerMode(playerMode === 'kinetic' ? 'mp4' : 'kinetic')}
                className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
                  playerMode === 'mp4'
                    ? 'bg-sky-500 text-white font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-white/80'
                }`}
                title={playerMode === 'mp4' ? 'Modo Interactivo' : 'Modo Video MP4'}
              >
                <Film className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
              title={isMuted ? 'Activar Sonido y Efectos' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-white/60" /> : <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL SEGÚN MODO (KINETIC VS MP4) */}
      {playerMode === 'mp4' && videoSrc ? (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
          <video
            ref={videoElementRef}
            src={videoSrc}
            controls
            autoPlay
            loop
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        /* ESCENA CINÉTICA REACTIVA (HYPERFRAMES ENGINE) */
        <div className="relative w-full h-full flex flex-col justify-between px-6 pt-20 pb-20 z-10 overflow-hidden">
          {/* Halo de luz difusa ambiental (Aura Motion) */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-sky-500/15 blur-3xl pointer-events-none animate-pulse" />

          {/* Bloque Superior: Badge y Kicker */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-[11px] font-mono font-bold tracking-wide shadow-sm">
              <Sparkles className="w-3 h-3 text-sky-400" />
              {currentScene.badge}
            </div>
            {currentScene.kicker && (
              <p className="text-[11px] font-mono text-white/60 uppercase tracking-widest">
                {currentScene.kicker}
              </p>
            )}
          </div>

          {/* Bloque Central: Tipografía Cinética con Revelado y Puntos */}
          <div className="space-y-4 my-auto">
            {/* Titular Principal */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {renderKineticText(currentScene.title)}
            </h2>

            {/* Subtítulo o Descripción */}
            {currentScene.sub && (
              <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed font-sans">
                {currentScene.sub}
              </p>
            )}

            {/* Puntos Secuenciales de Estudio */}
            {currentScene.points && currentScene.points.length > 0 && (
              <div className="space-y-2.5 pt-2">
                {currentScene.points.map((pt, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md space-y-1 hover:border-sky-400/50 transition-all transform hover:translate-x-1 duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
                      <span className="text-xs font-bold text-white tracking-tight">
                        {pt.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 pl-3.5 leading-snug">
                      {pt.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Llamado a la Acción (Beat 5 CTA) */}
            {currentScene.type === 'cta' && (
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => onCtaClick && onCtaClick()}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all shadow-[0_0_24px_rgba(56,189,248,0.5)] flex items-center justify-center gap-2 active:scale-95"
                >
                  Abrir Simulador y Guías
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Bloque Inferior: Indicador de marca */}
          <div className="flex items-center justify-between text-[11px] font-mono text-white/40 pt-2 border-t border-white/10">
            <span>@mafe.diseno · UCAB</span>
            <span>Retención 17.5s • 60 FPS</span>
          </div>
        </div>
      )}

      {/* 3. BARRA INFERIOR DE NAVEGACIÓN Y REPRODUCCIÓN */}
      <div className="absolute bottom-0 inset-x-0 z-30 p-3.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between">
        <button
          onClick={() => goToBeat(Math.max(0, currentBeatIndex - 1))}
          disabled={currentBeatIndex === 0}
          className="p-2 rounded-xl text-white/70 hover:text-white disabled:opacity-20 hover:bg-white/10 transition-colors"
          title="Beat Anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              playSfx('click.mp3');
            }}
            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md shadow-md transition-all active:scale-90"
            title={isPlaying ? 'Pausar Reel' : 'Continuar Reel'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            onClick={() => goToBeat(0)}
            className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            title="Reiniciar Reel"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={() => goToBeat(Math.min(scenes.length - 1, currentBeatIndex + 1))}
          disabled={currentBeatIndex >= scenes.length - 1}
          className="p-2 rounded-xl text-white/70 hover:text-white disabled:opacity-20 hover:bg-white/10 transition-colors"
          title="Siguiente Beat"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default KineticReelPlayer;
