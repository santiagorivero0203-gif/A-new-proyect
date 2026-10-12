import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import type { UserDocument } from '../../types';
import {
  PaletteIcon,
  XIcon,
} from '../common/Icons';

export interface CreativeDeliveryItem {
  id: string;
  title: string;
  course: string;
  column: 'brief' | 'moodboard' | 'in_progress' | 'final';
  dueDate: string;
  tags: string[];
  coverUrl?: string;
  notes?: string;
}

const INITIAL_DELIVERIES: CreativeDeliveryItem[] = [
  {
    id: 'deliv-1',
    title: 'Investigación de Usuarios & Mapa de Empatía',
    course: 'Taller de Diseño Integral V',
    column: 'brief',
    dueDate: '18 Octubre',
    tags: ['Ergonomía', 'Brief', 'UX'],
    coverUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80',
    notes: 'Entrevistas a 12 usuarios sobre transporte urbano y hábitos de desplazamiento.',
  },
  {
    id: 'deliv-2',
    title: 'Moodboard de Texturas, Metales y Vidrio Esmerilado',
    course: 'Materialidad y Procesos Industriales',
    column: 'moodboard',
    dueDate: '22 Octubre',
    tags: ['Materialidad', 'Acabados', 'Vidrio'],
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    notes: 'Exploración de materiales sostenibles para carcasa translúcida.',
  },
  {
    id: 'deliv-3',
    title: 'Modelo 3D CAD & Render con Luces Físicas',
    course: 'Modelado Tridimensional Asistido',
    column: 'in_progress',
    dueDate: '28 Octubre',
    tags: ['3D Rhinoceros', 'KeyShot', 'Renders'],
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    notes: 'Ajuste de tolerancias para ensamble a presión y costillas de refuerzo.',
  },
  {
    id: 'deliv-4',
    title: 'Láminas Tipográficas Suizas & Memoria Gráfica',
    course: 'Diseño Editorial y Diagramación',
    column: 'final',
    dueDate: '02 Noviembre',
    tags: ['Editorial', 'Retícula', 'Impresión'],
    coverUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    notes: 'Formato A1 montado sobre cartón pluma con acabados mate.',
  },
];

const COLUMNS = [
  { id: 'brief', label: '1. Brief & Análisis', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'moodboard', label: '2. Bocetos & Moodboard', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'in_progress', label: '3. Prototipado / En Proceso', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'final', label: '4. Entrega Jurado Final', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
] as const;

/**
 * Tablero Visual de Entregas Creativas (Módulo Creativo - María Fernanda UCAB)
 * Estilo Kanban y Masonry Grid con integración directa a imágenes del Storage.
 */
export const CreativeDeliveryBoard: React.FC = () => {
  const { user } = useAuth();
  const [deliveries, setDeliveries] = useState<CreativeDeliveryItem[]>(() => {
    try {
      const saved = localStorage.getItem('cpe_creative_deliveries');
      return saved ? JSON.parse(saved) : INITIAL_DELIVERIES;
    } catch {
      return INITIAL_DELIVERIES;
    }
  });

  const [viewMode, setViewMode] = useState<'KANBAN' | 'MASONRY'>('KANBAN');
  const [userDocs, setUserDocs] = useState<UserDocument[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourse, setNewCourse] = useState('Taller de Diseño Integral V');
  const [newDueDate, setNewDueDate] = useState('');
  const [newTag, setNewTag] = useState('');
  const [selectedStorageDocUrl, setSelectedStorageDocUrl] = useState('');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Paleta de Color Curada de Diseño UCAB
  const palette = [
    { name: 'Cobalto Puro', hex: '#0047AB', usage: 'Identidad' },
    { name: 'Azul Eléctrico', hex: '#2D72F9', usage: 'Acento UI' },
    { name: 'Naranja Cítrico', hex: '#FF6B35', usage: 'Contraste' },
    { name: 'Gris Grafito', hex: '#1E293B', usage: 'Estructura' },
    { name: 'Nieve Cálido', hex: '#F8FAFC', usage: 'Fondos' },
    { name: 'Verde Éxito', hex: '#10B981', usage: 'Aprobaciones' },
  ];

  // Cargar documentos del usuario desde Supabase Storage para poder vincularlos
  useEffect(() => {
    if (!user) return;
    storageService.getUserDocuments(user.id).then((docs) => {
      setUserDocs(docs);
      if (docs.length > 0 && docs[0].file_path) {
        setSelectedStorageDocUrl(docs[0].file_path);
      }
    });
  }, [user]);

  const saveDeliveries = (items: CreativeDeliveryItem[]) => {
    setDeliveries(items);
    localStorage.setItem('cpe_creative_deliveries', JSON.stringify(items));
  };

  const moveItem = (itemId: string, direction: 'prev' | 'next') => {
    const colOrder: ('brief' | 'moodboard' | 'in_progress' | 'final')[] = [
      'brief',
      'moodboard',
      'in_progress',
      'final',
    ];

    const updated = deliveries.map((item) => {
      if (item.id !== itemId) return item;
      const currentIndex = colOrder.indexOf(item.column);
      const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= 0 && nextIndex < colOrder.length) {
        return { ...item, column: colOrder[nextIndex] };
      }
      return item;
    });

    saveDeliveries(updated);
  };

  const handleCreateDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: CreativeDeliveryItem = {
      id: `deliv-${Date.now()}`,
      title: newTitle.trim(),
      course: newCourse,
      column: 'brief',
      dueDate: newDueDate || 'Por definir',
      tags: newTag ? newTag.split(',').map((t) => t.trim()) : ['Diseño'],
      coverUrl: selectedStorageDocUrl || INITIAL_DELIVERIES[0].coverUrl,
    };

    saveDeliveries([newItem, ...deliveries]);
    setNewTitle('');
    setNewDueDate('');
    setNewTag('');
    setShowAddModal(false);
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Barra de Encabezado y Selector de Vista */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold mb-2">
            <PaletteIcon className="w-3.5 h-3.5" />
            Módulo Creativo • María Fernanda (Diseño UCAB)
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
            Tablero de Entregas & Gestión Visual
          </h2>
          <p className="text-sm text-slate-500">
            Organiza tus proyectos de taller, vincula imágenes de Supabase Storage y controla fechas de jurado.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Selector Kanban / Masonry */}
          <div className="inline-flex p-1 bg-slate-200/70 rounded-2xl border border-slate-200">
            <button
              onClick={() => setViewMode('KANBAN')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'KANBAN'
                  ? 'bg-white text-slate-900 shadow-soft-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tablero Kanban
            </button>
            <button
              onClick={() => setViewMode('MASONRY')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'MASONRY'
                  ? 'bg-white text-slate-900 shadow-soft-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mural Visual
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-soft"
          >
            <span>+</span>
            <span>Nueva Entrega</span>
          </button>
        </div>
      </div>

      {/* Paleta Rápida de Diseño */}
      <div className="app-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
            🎨
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Paleta del Semestre</h4>
            <p className="text-[11px] text-slate-500">Haz clic en cualquier muestra para copiar su HEX</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {palette.map((swatch) => (
            <button
              key={swatch.hex}
              onClick={() => copyColor(swatch.hex)}
              className="flex items-center gap-2 px-2.5 py-1 rounded-xl border border-slate-200/80 bg-slate-50 hover:bg-slate-100 transition-all text-left"
              title={`${swatch.name}: ${swatch.hex}`}
            >
              <span
                className="w-4 h-4 rounded-md shadow-inner border border-black/10 shrink-0"
                style={{ backgroundColor: swatch.hex }}
              />
              <span className="text-[11px] font-mono font-medium text-slate-700">
                {copiedHex === swatch.hex ? '✓ Copiado' : swatch.hex}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* VISTA 1: TABLERO KANBAN */}
      {viewMode === 'KANBAN' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLUMNS.map((col) => {
            const itemsInCol = deliveries.filter((item) => item.column === col.id);

            return (
              <div
                key={col.id}
                className="bg-slate-50/70 rounded-2xl p-3 border border-slate-200/70 flex flex-col min-h-[500px]"
              >
                {/* Header de Columna */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border ${col.badgeColor}`}>
                    {col.label}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {itemsInCol.length}
                  </span>
                </div>

                {/* Tarjetas de la Columna */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {itemsInCol.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-soft-sm overflow-hidden hover:shadow-soft transition-all"
                    >
                      {item.coverUrl && (
                        <div className="aspect-video w-full bg-slate-100 overflow-hidden relative">
                          <img
                            src={item.coverUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-[10px] font-medium text-white rounded-md">
                            {item.course}
                          </span>
                        </div>
                      )}

                      <div className="p-3.5 space-y-2">
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {item.title}
                        </h4>

                        {item.notes && (
                          <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                            {item.notes}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>

                        {/* Pie de Tarjeta: Fecha de Jurado y Flechas de Movimiento */}
                        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 font-mono">
                            📅 {item.dueDate}
                          </span>

                          <div className="flex items-center gap-1">
                            {col.id !== 'brief' && (
                              <button
                                onClick={() => moveItem(item.id, 'prev')}
                                className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
                                title="Mover a etapa previa"
                              >
                                ←
                              </button>
                            )}
                            {col.id !== 'final' && (
                              <button
                                onClick={() => moveItem(item.id, 'next')}
                                className="w-6 h-6 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center font-bold"
                                title="Avanzar etapa"
                              >
                                →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {itemsInCol.length === 0 && (
                    <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-[11px] text-slate-400">
                      Sin entregas en esta etapa
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* VISTA 2: MURAL VISUAL / MASONRY GRID */
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {deliveries.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid bg-white rounded-2xl border border-slate-200/90 shadow-soft-sm overflow-hidden hover:shadow-soft transition-all"
            >
              {item.coverUrl && (
                <img
                  src={item.coverUrl}
                  alt={item.title}
                  className="w-full object-cover rounded-t-2xl"
                />
              )}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    {item.course}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {item.dueDate}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                {item.notes && (
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.notes}
                  </p>
                )}
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para Crear Nueva Entrega con Vinculación a Storage */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-soft-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Nueva Entrega o Proyecto de Taller
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDelivery} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Título del Proyecto
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. Rediseño de Cafetera Espresso"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Cátedra / Materia
                </label>
                <select
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Taller de Diseño Integral V">Taller de Diseño Integral V</option>
                  <option value="Materialidad y Procesos Industriales">Materialidad y Procesos Industriales</option>
                  <option value="Modelado Tridimensional Asistido">Modelado Tridimensional Asistido</option>
                  <option value="Diseño Editorial y Diagramación">Diseño Editorial y Diagramación</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Fecha de Entrega
                  </label>
                  <input
                    type="text"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    placeholder="Ej. 25 Octubre"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Etiquetas (separadas por coma)
                  </label>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="3D, Render, Ergonomía"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Selector de Imagen de Supabase Storage */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Vincular Portada desde Supabase Storage
                </label>
                {userDocs.length > 0 ? (
                  <select
                    value={selectedStorageDocUrl}
                    onChange={(e) => setSelectedStorageDocUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    {userDocs.map((doc) => (
                      <option key={doc.id} value={doc.file_path}>
                        {doc.title} ({doc.file_type.includes('image') ? 'Foto' : 'Doc'})
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-[11px] text-slate-400 italic">
                    No tienes fotos en Storage aún. Se usará una portada por defecto.
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary text-xs py-2 px-3.5"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4"
                >
                  Guardar en Tablero
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
