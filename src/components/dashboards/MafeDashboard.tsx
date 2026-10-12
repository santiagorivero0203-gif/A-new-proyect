import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PaletteIcon, CopyIcon, CheckCircleIcon, SparklesIcon, LayersIcon } from '../common/Icons';

export const MafeDashboard: React.FC = () => {
  const { user } = useAuth();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  // Paleta de Colores Curada del Proyecto de Diseño
  const colorSwatches = [
    { name: 'Azul Cobalto Puro', hex: '#0047AB', usage: 'Acento Principal' },
    { name: 'Cobalto Eléctrico', hex: '#2D72F9', usage: 'Glow / Micro-interacciones' },
    { name: 'Naranja Cítrico', hex: '#FF6B35', usage: 'Contraste Secundario' },
    { name: 'Blanco Nieve', hex: '#F8FAFC', usage: 'Superficie Luz' },
    { name: 'Grafito Ónix', hex: '#0F172A', usage: 'Lienzo Neutro' },
    { name: 'Verde Menta', hex: '#10B981', usage: 'Aprobaciones' },
  ];

  // Tablero Kanban de Entregas del Taller de Diseño Integral
  const [kanbanTasks] = useState([
    {
      id: 1,
      title: 'Investigación de Usuarios & Ergonomía',
      column: 'Investigación & Brief',
      tag: 'Ergonomía',
      dueDate: '16 Oct',
      color: 'border-l-indigo-500',
    },
    {
      id: 2,
      title: 'Moodboard de Texturas y Materiales Sostenibles',
      column: 'Moodboard & Bocetos',
      tag: 'Materialidad',
      dueDate: '20 Oct',
      color: 'border-l-cobalt-500',
    },
    {
      id: 3,
      title: 'Render Tridimensional & Maqueta Escala 1:5',
      column: 'En Proceso',
      tag: '3D CAD',
      dueDate: '25 Oct',
      color: 'border-l-amber-500',
    },
    {
      id: 4,
      title: 'Láminas de Entrega Final & Memoria Descriptiva',
      column: 'Entrega Final',
      tag: 'Editorial',
      dueDate: '30 Oct',
      color: 'border-l-emerald-500',
    },
  ]);

  // Muro de Referencias Visuales Tipo Pinterest
  const visualReferences = [
    {
      id: 1,
      title: 'Composición Tipográfica Suiza',
      category: 'Diseño Editorial',
      imgUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=80',
      aspect: 'aspect-square',
    },
    {
      id: 2,
      title: 'Materialidad: Vidrio Esmerilado & Metal',
      category: 'Diseño de Producto',
      imgUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
      aspect: 'aspect-[4/5]',
    },
    {
      id: 3,
      title: 'Sistema Cromático Asimétrico',
      category: 'Identidad Visual',
      imgUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=80',
      aspect: 'aspect-[3/4]',
    },
    {
      id: 4,
      title: 'Geometría y Estructura Concéntrica',
      category: 'Morfología',
      imgUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80',
      aspect: 'aspect-video',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Banner Visual UCAB */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-950/40 via-surface-900 to-cobalt-950/60 border border-purple-500/20 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <PaletteIcon className="w-3.5 h-3.5" />
              UCAB • Escuela de Diseño Integral
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Taller Creativo: {user?.full_name || 'María Fernanda'} 🎨
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Entorno estético para gestión de proyectos, curaduría de referencias visuales, paletas de colores y seguimiento de entregas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-4 rounded-2xl bg-surface-950/80 border border-purple-500/30 shadow-lg text-center">
              <p className="text-[10px] uppercase font-bold tracking-wider text-purple-400">Entrega de Taller</p>
              <p className="text-xl font-bold text-white mt-0.5">Taller IV</p>
              <p className="text-[10px] text-slate-400">18 Días Restantes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gestor Interactivo de Paletas de Color */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cobalt-950 border border-cobalt-600/30 text-cobalt-400">
              <PaletteIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Paleta Cromática Activa</h3>
              <p className="text-xs text-slate-400">Haz clic en cualquier muestra para copiar su código HEX</p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">Color System • Cobalto Primario</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {colorSwatches.map((swatch) => (
            <div
              key={swatch.hex}
              onClick={() => copyColor(swatch.hex)}
              className="p-3 rounded-2xl bg-surface-950/70 border border-white/[0.06] hover:border-white/20 transition-all cursor-pointer group active:scale-95"
            >
              <div
                className="w-full h-16 rounded-xl shadow-md mb-2.5 transition-transform group-hover:scale-105"
                style={{ backgroundColor: swatch.hex }}
              />
              <p className="text-xs font-semibold text-white truncate">{swatch.name}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[11px] font-mono text-slate-400">{swatch.hex}</span>
                {copiedHex === swatch.hex ? (
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <CopyIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tablero Kanban de Entregas de Diseño */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <LayersIcon className="w-5 h-5 text-cobalt-400" />
            <h3 className="text-base font-semibold text-white">Tablero de Entregas & Fases de Diseño</h3>
          </div>
          <span className="text-xs text-cobalt-400 font-mono">Sprint Taller IV</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Investigación & Brief', 'Moodboard & Bocetos', 'En Proceso', 'Entrega Final'].map((colName) => {
            const colTasks = kanbanTasks.filter((t) => t.column === colName);
            return (
              <div key={colName} className="p-3.5 rounded-2xl bg-surface-950/60 border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 px-1">
                  <span>{colName}</span>
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center font-mono text-[10px]">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3 rounded-xl bg-surface-900/90 border border-white/[0.06] border-l-4 ${task.color} hover:border-cobalt-500/40 transition-all shadow-sm`}
                    >
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-300 font-medium">
                        {task.tag}
                      </span>
                      <h4 className="text-xs font-semibold text-white mt-1.5 leading-snug">{task.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-2 font-mono">Límite: {task.dueDate}</p>
                    </div>
                  ))}

                  {colTasks.length === 0 && (
                    <div className="p-4 rounded-xl border border-dashed border-white/10 text-center text-[11px] text-slate-500">
                      Sin entregas pendientes en esta fase
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Muro de Referencias Estéticas Tipo Pinterest */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-semibold text-white">Muro de Inspiración & Referencias Visuales</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Curaduría de Proyecto</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visualReferences.map((ref) => (
            <div
              key={ref.id}
              className="group overflow-hidden rounded-2xl bg-surface-950/70 border border-white/[0.06] hover:border-cobalt-500/40 transition-all"
            >
              <div className={`overflow-hidden ${ref.aspect}`}>
                <img
                  src={ref.imgUrl}
                  alt={ref.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider">
                  {ref.category}
                </span>
                <p className="text-xs font-semibold text-white mt-0.5 truncate">{ref.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
