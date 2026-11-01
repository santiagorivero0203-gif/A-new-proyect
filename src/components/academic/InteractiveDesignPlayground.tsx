import React, { useState } from 'react';
import {
  Eye,
  Compass,
  Palette,
  Box
} from 'lucide-react';

type PlaygroundTab = 'GESTALT' | 'NORMAN' | 'COLOR' | 'MATH_3D';

export const InteractiveDesignPlayground: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('GESTALT');

  // Estado para Gestalt Playground
  const [gestaltLaw, setGestaltLaw] = useState<'proximity' | 'similarity' | 'closure' | 'figure_ground'>('proximity');
  const [proximityGap, setProximityGap] = useState<number>(36);
  const [similarityShape, setSimilarityShape] = useState<'color' | 'form'>('color');
  const [closureGap, setClosureGap] = useState<number>(45);
  const [figureGroundInvert, setFigureGroundInvert] = useState<boolean>(false);

  // Estado para Usabilidad de Norman
  const [doorType, setDoorType] = useState<'flat_plate' | 'handle' | 'handle_with_sign'>('handle');
  const [doorFeedback, setDoorFeedback] = useState<string | null>(null);

  // Mapeo de Hornillas
  const [mappingType, setMappingType] = useState<'unmapped' | 'natural'>('unmapped');
  const [activeBurner, setActiveBurner] = useState<number | null>(null);

  // Estado para Síntesis de Color (Clase 4)
  const [colorSteps, setColorSteps] = useState<number>(9); // 9 vs 15 escalones

  // Estado para Matemáticas para Diseño (Rectas Alabeadas)
  const [skewAngle, setSkewAngle] = useState<number>(45);

  // Manejo de interacción de la Puerta de Norman
  const handleDoorInteract = (action: 'push' | 'pull') => {
    if (doorType === 'flat_plate') {
      if (action === 'push') {
        setDoorFeedback('✓ ¡Éxito! El affordance de la placa plana invita naturalmente a empujar.');
      } else {
        setDoorFeedback('❌ Falla física: No puedes jalar una placa lisa sin tirador (Affordance negativo).');
      }
    } else if (doorType === 'handle') {
      if (action === 'pull') {
        setDoorFeedback('✓ Correcto: El tirador sugiere jalar físicamente.');
      } else {
        setDoorFeedback('⚠️ Trampa de Norman: Empujaste un tirador. Sin significante explícito, el usuario duda.');
      }
    } else {
      // Handle with sign "EMPUJE"
      if (action === 'push') {
        setDoorFeedback('✓ ¡Éxito! Aunque el pomo invita a jalar, el Signifier textual ("EMPUJE") resolvió la ambigüedad.');
      } else {
        setDoorFeedback('❌ Error de lectura: Ignoraste el significante explícito.');
      }
    }
  };

  return (
    <div className={`p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl space-y-6 ${className}`}>
      {/* 1. CABECERA DEL LABORATORIO INTERACTIVO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-sky-400">
              Laboratorio Cinético & Micro-Interacciones
            </span>
          </div>
          <h3 className="text-xl font-bold font-display text-white">
            Simulador de Fenómenos y Principios de Diseño
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Experimenta en tiempo real con las leyes de la Gestalt, los affordances de Donald Norman, la síntesis cromática de 9 escalones y la geometría espacial 3D.
          </p>
        </div>

        {/* Pestañas del Playground */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950/80 rounded-2xl border border-slate-800 self-start">
          <button
            onClick={() => setActiveTab('GESTALT')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'GESTALT'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            1. Gestalt
          </button>

          <button
            onClick={() => setActiveTab('NORMAN')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'NORMAN'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            2. Norman & Usabilidad
          </button>

          <button
            onClick={() => setActiveTab('COLOR')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'COLOR'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            3. Síntesis Color
          </button>

          <button
            onClick={() => setActiveTab('MATH_3D')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'MATH_3D'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            4. Geometría 3D
          </button>
        </div>
      </div>

      {/* 2. DEMOSTRACIÓN A: LEYES DE LA GESTALT */}
      {activeTab === 'GESTALT' && (
        <div className="space-y-6">
          {/* Sub-selector de leyes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'proximity', title: '1. Proximidad', desc: 'Agrupación por cercanía' },
              { id: 'similarity', title: '2. Semejanza', desc: 'Agrupación por forma/color' },
              { id: 'closure', title: '3. Cierre', desc: 'Completar formas rotas' },
              { id: 'figure_ground', title: '4. Figura-Fondo', desc: 'Separación y contraste' },
            ].map((law) => (
              <button
                key={law.id}
                onClick={() => setGestaltLaw(law.id as any)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  gestaltLaw === law.id
                    ? 'border-sky-400 bg-sky-500/10 text-white ring-1 ring-sky-400'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-white">{law.title}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{law.desc}</div>
              </button>
            ))}
          </div>

          {/* Lienzo Interactivo de Percepción */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 min-h-[260px] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Ley de Proximidad */}
            {gestaltLaw === 'proximity' && (
              <div className="space-y-6 w-full max-w-md text-center">
                <div className="flex items-center justify-center gap-12">
                  {/* Grupo 1 */}
                  <div
                    className="grid grid-cols-3 transition-all duration-300"
                    style={{ gap: `${proximityGap}px` }}
                  >
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                      />
                    ))}
                  </div>

                  {/* Grupo 2 */}
                  <div
                    className="grid grid-cols-3 transition-all duration-300"
                    style={{ gap: `${proximityGap}px` }}
                  >
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-slate-800">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Espaciado entre nodos: {proximityGap}px</span>
                    <span className="text-sky-400">
                      {proximityGap < 20 ? 'Percepción: Un solo bloque' : 'Percepción: Dos columnas diferenciadas'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="64"
                    value={proximityGap}
                    onChange={(e) => setProximityGap(Number(e.target.value))}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Ley de Semejanza */}
            {gestaltLaw === 'similarity' && (
              <div className="space-y-6 w-full max-w-md text-center">
                <div className="grid grid-cols-6 gap-4 justify-items-center">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const isEvenRow = Math.floor(i / 6) % 2 === 0;
                    return (
                      <div
                        key={i}
                        className={`w-7 h-7 transition-all duration-300 ${
                          similarityShape === 'color'
                            ? isEvenRow
                              ? 'rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)]'
                              : 'rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                            : isEvenRow
                            ? 'rounded-full bg-sky-400'
                            : 'rounded-none bg-sky-400 rotate-45'
                        }`}
                      />
                    );
                  })}
                </div>

                <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => setSimilarityShape('color')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                      similarityShape === 'color'
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Agrupación por Color (Azul vs Rosa)
                  </button>
                  <button
                    onClick={() => setSimilarityShape('form')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                      similarityShape === 'form'
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Agrupación por Morfología (Círculo vs Rombo)
                  </button>
                </div>
              </div>
            )}

            {/* Ley de Cierre */}
            {gestaltLaw === 'closure' && (
              <div className="space-y-6 w-full max-w-sm text-center">
                {/* Ilusión de triángulo de Kanizsa incompleto */}
                <svg
                  className="w-48 h-48 mx-auto"
                  viewBox="0 0 200 200"
                  fill="none"
                >
                  {/* Pacmans en las 3 esquinas */}
                  <circle cx="50" cy="150" r="28" fill="#38bdf8" />
                  <path d="M50 150 L80 135 L65 175 Z" fill="#020617" />

                  <circle cx="150" cy="150" r="28" fill="#38bdf8" />
                  <path d="M150 150 L120 135 L135 175 Z" fill="#020617" />

                  <circle cx="100" cy="50" r="28" fill="#38bdf8" />
                  <path d="M100 50 L85 90 L115 90 Z" fill="#020617" />

                  {/* Triángulo aparente cerrado por la mente */}
                  <polygon
                    points="100,50 150,150 50,150"
                    stroke="rgba(255,255,255,0.25)"
                    strokeDasharray={`${closureGap} 15`}
                    strokeWidth="2"
                  />
                </svg>

                <div className="space-y-1.5 border-t border-slate-800 pt-3">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Apertura del contorno: {closureGap}px</span>
                    <span className="text-sky-400">
                      Tu mente "crea" un triángulo blanco inexistente
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={closureGap}
                    onChange={(e) => setClosureGap(Number(e.target.value))}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Ley de Figura-Fondo */}
            {gestaltLaw === 'figure_ground' && (
              <div className="space-y-6 w-full max-w-sm text-center">
                <div
                  onClick={() => setFigureGroundInvert(!figureGroundInvert)}
                  className={`w-52 h-44 mx-auto rounded-2xl flex items-center justify-center p-4 border transition-all cursor-pointer select-none ${
                    figureGroundInvert
                      ? 'bg-sky-500 text-slate-950 border-sky-300'
                      : 'bg-slate-900 text-sky-400 border-slate-700'
                  }`}
                >
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-extrabold tracking-widest font-mono">
                      {figureGroundInvert ? 'COPA RUBIN' : 'DOS PERFILES'}
                    </div>
                    <p className="text-xs opacity-80">
                      Toca para invertir el contraste figura-fondo
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-mono">
                  Demuestra cómo la atención cognitiva no puede procesar el fondo y la figura de forma idéntica al mismo tiempo.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. DEMOSTRACIÓN B: USABILIDAD DE DONALD NORMAN (AFFORDANCE VS SIGNIFIER & MAPPING) */}
      {activeTab === 'NORMAN' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experimento 1: La Puerta de Norman */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
                  A. La Puerta de Norman
                </h4>
                <span className="text-[10px] text-slate-500 font-mono">Affordance vs Signifier</span>
              </div>

              {/* Selector del tipo de puerta */}
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'flat_plate', label: 'Placa Plana' },
                  { id: 'handle', label: 'Tirador Solo' },
                  { id: 'handle_with_sign', label: 'Tirador + "EMPUJE"' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setDoorType(item.id as any);
                      setDoorFeedback(null);
                    }}
                    className={`py-2 px-1 text-[11px] rounded-xl font-medium border text-center transition-all ${
                      doorType === item.id
                        ? 'border-sky-400 bg-sky-500/10 text-white font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Puerta Gráfica */}
              <div className="h-44 rounded-2xl bg-slate-900 border border-slate-800 relative flex items-center justify-center p-4">
                <div className="w-32 h-full bg-slate-800 rounded-lg border-2 border-slate-700 relative flex items-center justify-end pr-3 shadow-lg">
                  {doorType === 'flat_plate' && (
                    <div className="w-4 h-16 bg-slate-400 rounded-sm border border-slate-300 shadow-inner" />
                  )}
                  {doorType === 'handle' && (
                    <div className="w-4 h-16 border-4 border-slate-300 border-l-0 rounded-r-lg shadow-md" />
                  )}
                  {doorType === 'handle_with_sign' && (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[9px] font-mono font-bold bg-amber-400 text-black px-1.5 py-0.5 rounded shadow">
                        EMPUJE
                      </span>
                      <div className="w-4 h-14 border-4 border-slate-300 border-l-0 rounded-r-lg shadow-md" />
                    </div>
                  )}
                </div>
              </div>

              {/* Acciones de Usuario */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleDoorInteract('push')}
                  className="py-2.5 rounded-xl font-bold text-xs bg-sky-500 text-white hover:bg-sky-400 transition-all active:scale-95"
                >
                  Empujar (Push)
                </button>
                <button
                  onClick={() => handleDoorInteract('pull')}
                  className="py-2.5 rounded-xl font-bold text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all active:scale-95"
                >
                  Jalar (Pull)
                </button>
              </div>

              {doorFeedback && (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                  {doorFeedback}
                </div>
              )}
            </div>

            {/* Experimento 2: Topografía Natural (Mapping de Hornillas) */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
                  B. Topografía Natural (Mapping)
                </h4>
                <button
                  onClick={() => setMappingType(mappingType === 'unmapped' ? 'natural' : 'unmapped')}
                  className="text-[11px] font-mono text-sky-400 hover:underline"
                >
                  Cambiar: {mappingType === 'natural' ? 'Topografía Natural' : 'Mandos Alineados (Mala)'}
                </button>
              </div>

              {/* Estufa de 4 hornillas */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-[200px] mx-auto">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${
                      activeBurner === idx
                        ? 'border-rose-500 bg-rose-500/20 shadow-[0_0_16px_rgba(244,63,94,0.6)]'
                        : 'border-slate-700 bg-slate-950'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-slate-400">
                      {idx === 0 ? 'TL' : idx === 1 ? 'TR' : idx === 2 ? 'BL' : 'BR'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mandos de Control */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block mb-2 text-center">
                  {mappingType === 'natural'
                    ? 'Disposición en matriz 2x2 congruente con la estufa (Cero carga mental)'
                    : 'Mandos en fila lineal (Obliga al usuario a descifrar cuál hornilla enciende)'}
                </span>

                {mappingType === 'natural' ? (
                  <div className="grid grid-cols-2 gap-3 max-w-[140px] mx-auto">
                    {[0, 1, 2, 3].map((b) => (
                      <button
                        key={b}
                        onClick={() => setActiveBurner(activeBurner === b ? null : b)}
                        className={`w-12 h-12 rounded-xl text-xs font-bold transition-all ${
                          activeBurner === b
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {b + 1}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    {[0, 1, 2, 3].map((b) => (
                      <button
                        key={b}
                        onClick={() => setActiveBurner(activeBurner === b ? null : b)}
                        className={`w-11 h-11 rounded-xl text-xs font-bold transition-all ${
                          activeBurner === b
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {b + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. DEMOSTRACIÓN C: SÍNTESIS CROMÁTICA (15 A 9 ESCALONES - CLASE 4) */}
      {activeTab === 'COLOR' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Escala de Munsell: Síntesis de Valor y Luminosidad
                </h4>
                <p className="text-xs text-slate-400">
                  Del espectro expandido de 15 niveles al sistema sintético estándar de 9 escalones cromáticos.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setColorSteps(9)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono ${
                    colorSteps === 9
                      ? 'bg-sky-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  9 Escalones (Sintético)
                </button>
                <button
                  onClick={() => setColorSteps(15)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono ${
                    colorSteps === 15
                      ? 'bg-sky-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  15 Escalones (Detallado)
                </button>
              </div>
            </div>

            {/* Muestra Dinámica de Escalones */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 overflow-x-auto py-2">
                {Array.from({ length: colorSteps }).map((_, i) => {
                  const lightness = 10 + (i / (colorSteps - 1)) * 80;
                  return (
                    <div
                      key={i}
                      className="flex-1 min-w-[28px] h-20 rounded-xl border border-white/10 flex flex-col justify-between p-1.5 transition-all transform hover:scale-105"
                      style={{
                        backgroundColor: `hsl(215, 80%, ${lightness}%)`,
                      }}
                    >
                      <span
                        className="text-[10px] font-mono font-bold"
                        style={{ color: lightness > 55 ? '#0f172a' : '#ffffff' }}
                      >
                        N{i + 1}
                      </span>
                      <span
                        className="text-[9px] font-mono opacity-80"
                        style={{ color: lightness > 55 ? '#0f172a' : '#ffffff' }}
                      >
                        {Math.round(lightness)}%
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1">
                <span>N1: Negro / Valor Bajo (Luminosidad 10%)</span>
                <span>N{colorSteps}: Blanco / Valor Alto (Luminosidad 90%)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
              <span className="font-bold text-sky-400 font-mono block mb-1">
                Fundamento de la Guía de Color (Clase 4):
              </span>
              Al diseñar piezas gráficas o artefactos tridimensionales, sintetizar la escala a 9 escalones garantiza suficiente ratio de contraste (WCAG &gt; 4.5:1) sin saturar al observador con micro-variaciones indistinguibles.
            </div>
          </div>
        </div>
      )}

      {/* 5. DEMOSTRACIÓN D: MATEMÁTICAS PARA EL DISEÑO 3D (RECTAS ALABEADAS) */}
      {activeTab === 'MATH_3D' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Posición Relativa en el Espacio: Rectas Alabeadas (Skew Lines)
                </h4>
                <p className="text-xs text-slate-400">
                  Dos rectas en el espacio tridimensional R³ que ni se cortan ni son paralelas; viven en planos distintos.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">
                  Ángulo θ: {skewAngle}°
                </span>
                <input
                  type="range"
                  min="15"
                  max="90"
                  value={skewAngle}
                  onChange={(e) => setSkewAngle(Number(e.target.value))}
                  className="w-24 accent-sky-400"
                />
              </div>
            </div>

            {/* Lienzo 3D Proyectivo */}
            <div className="h-56 rounded-2xl bg-slate-900 border border-slate-800 relative flex items-center justify-center overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Plano Base Inferior */}
                <polygon
                  points="60,160 220,160 340,110 180,110"
                  fill="rgba(56,189,248,0.06)"
                  stroke="rgba(56,189,248,0.3)"
                  strokeWidth="1.5"
                />

                {/* Recta L1 sobre el plano base (Azul) */}
                <line
                  x1="80"
                  y1="150"
                  x2="320"
                  y2="120"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="none"
                />
                <text x="330" y="125" fill="#38bdf8" fontSize="11" fontFamily="monospace">
                  L1 (Plano inferior)
                </text>

                {/* Recta L2 suspendida en el espacio superior (Rosa) con ángulo skew */}
                <line
                  x1="120"
                  y1="40"
                  x2="280"
                  y2={40 + skewAngle}
                  stroke="#f43f5e"
                  strokeWidth="3"
                />
                <text x="290" y={45 + skewAngle} fill="#f43f5e" fontSize="11" fontFamily="monospace">
                  L2 (Elevada en z)
                </text>

                {/* Vector de mínima distancia ortogonal entre las rectas alabeadas */}
                <line
                  x1="200"
                  y1="135"
                  x2="200"
                  y2={40 + skewAngle / 2}
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle cx="200" cy="135" r="4" fill="#a855f7" />
                <circle cx="200" cy={40 + skewAngle / 2} r="4" fill="#a855f7" />
                <text x="210" y="95" fill="#a855f7" fontSize="10" fontFamily="monospace">
                  d mín (ortogonal)
                </text>
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 font-sans">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-bold text-sky-400 font-mono block mb-1">
                  1. Criterio de Alabeamiento:
                </span>
                El producto mixto (u × v) · P₁P₂ ≠ 0. Si el determinante fuera cero, pertenecerían al mismo plano y se cortarían.
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-bold text-rose-400 font-mono block mb-1">
                  2. Aplicación Proyectual en Diseño:
                </span>
                Diseño de estructuras tubulares, mobiliario asimétrico y cables tensados en arquitectura que no deben colisionar.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveDesignPlayground;
