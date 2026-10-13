import React, { useState, useRef, useEffect } from 'react';
import { renderLatex } from '../../utils/latexRenderer';
import { XIcon, TrashIcon, DownloadIcon, CopyIcon } from '../common/Icons';

interface ScratchpadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Lienzo de Borrador Rápido (Scratchpad Matemático y Visual)
 * 
 * Permite al estudiante hacer cálculos a mano alzada en un Canvas HTML5 o
 * probar fórmulas LaTeX con renderizado KaTeX en vivo sin salirse de su flujo de estudio.
 */
export const ScratchpadDrawer: React.FC<ScratchpadDrawerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'CANVAS' | 'LATEX'>('CANVAS');

  // Estado del Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#0F52BA'); // Cobalto por defecto
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  // Estado del Bloc LaTeX
  const [latexText, setLatexText] = useState(
    '# Borrador de Fórmulas\n\nDespeje de velocidad angular:\n$$\\omega = \\frac{d\\theta}{dt} = 2\\pi f$$\n\nEnergía cinética relativista:\n$$E_k = (\\gamma - 1)mc^2$$'
  );

  // Inicializar Canvas al abrir
  useEffect(() => {
    if (isOpen && activeTab === 'CANVAS') {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Configurar alta resolución si está limpio
      if (canvas.width !== canvas.offsetWidth) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [isOpen, activeTab]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.strokeStyle = isEraser ? '#ffffff' : strokeColor;
    ctx.lineWidth = isEraser ? strokeWidth * 4 : strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvasImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `despeje-borrador-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white shadow-soft-lg border-l border-slate-200 flex flex-col animate-fadeIn">
      {/* Cabecera */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
            ✎
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-sans">
              Scratchpad de Borrador Rápido
            </h3>
            <p className="text-[11px] text-slate-500">Cálculos a mano alzada y notación LaTeX en vivo</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Selector de Pestaña */}
      <div className="px-5 pt-3 pb-2 flex items-center gap-2 border-b border-slate-100 bg-slate-50/50">
        <button
          onClick={() => setActiveTab('CANVAS')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'CANVAS'
              ? 'bg-white text-slate-900 shadow-soft-sm border border-slate-200/70'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Pizarra Libre (Dibujo)
        </button>
        <button
          onClick={() => setActiveTab('LATEX')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'LATEX'
              ? 'bg-white text-slate-900 shadow-soft-sm border border-slate-200/70'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Bloc LaTeX / KaTeX
        </button>
      </div>

      {/* Contenido según Pestaña */}
      <div className="flex-1 flex flex-col overflow-hidden p-4 space-y-3">
        {activeTab === 'CANVAS' ? (
          <>
            {/* Barra de Herramientas de Dibujo */}
            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-2xl border border-slate-200/80 text-xs">
              <div className="flex items-center gap-1.5">
                {/* Colores */}
                {['#0F52BA', '#0f172a', '#e11d48', '#059669'].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setStrokeColor(c);
                      setIsEraser(false);
                    }}
                    className={`w-5 h-5 rounded-full border-2 transition-transform ${
                      !isEraser && strokeColor === c ? 'scale-110 border-slate-900' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}

                {/* Borrador */}
                <button
                  onClick={() => setIsEraser(!isEraser)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold ${
                    isEraser ? 'bg-amber-100 text-amber-800' : 'bg-white text-slate-600 border'
                  }`}
                >
                  Borrador
                </button>

                {/* Selector de Grosor */}
                <div className="flex items-center gap-1 border-l border-slate-200 pl-1.5 ml-1">
                  {[2, 4, 8].map((w) => (
                    <button
                      key={w}
                      onClick={() => setStrokeWidth(w)}
                      className={`w-6 h-6 flex items-center justify-center rounded-md transition-all ${
                        strokeWidth === w ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-700'
                      }`}
                      title={`Grosor ${w}px`}
                    >
                      <span
                        className="rounded-full bg-current"
                        style={{ width: `${w * 1.5}px`, height: `${w * 1.5}px` }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Acciones */}
              <div className="flex items-center gap-1">
                <button
                  onClick={clearCanvas}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white"
                  title="Limpiar pizarra"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={downloadCanvasImage}
                  className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-white"
                  title="Descargar imagen PNG"
                >
                  <DownloadIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Canvas de Dibujo */}
            <div className="flex-1 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-inner relative">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full cursor-crosshair touch-none"
              />
            </div>
          </>
        ) : (
          <>
            {/* Input de Texto Markdown / LaTeX */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Editor de Expresiones:</label>
              <textarea
                value={latexText}
                onChange={(e) => setLatexText(e.target.value)}
                rows={6}
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs focus:bg-white focus:outline-none focus:border-brand-500"
                placeholder="Escribe texto o fórmulas entre $...$ o $$...$$"
              />
            </div>

            {/* Vista Previa Renderizada en Tiempo Real */}
            <div className="flex-1 border border-slate-200 rounded-2xl p-4 bg-slate-50/50 overflow-y-auto space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 text-xs font-bold text-slate-500">
                <span>VISTA PREVIA COMPILADA:</span>
                <button
                  onClick={() => navigator.clipboard.writeText(latexText)}
                  className="flex items-center gap-1 text-[11px] text-brand-600 hover:underline"
                >
                  <CopyIcon className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </button>
              </div>
              <div className="prose prose-sm max-w-none text-xs text-slate-800 leading-relaxed font-sans">
                {renderLatex(latexText)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
