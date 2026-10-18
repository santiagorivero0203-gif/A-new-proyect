import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import type { UserDocument } from '../../types';
import {
  PaletteIcon,
  XIcon,
} from '../common/Icons';

import { EmptyState } from '../common/EmptyState';
import { CanvaStudioHub } from './CanvaStudioHub';
import { CreativeStudioCanvas, type MafeThemeMode } from './CreativeStudioCanvas';
import { notificationService } from '../../services/notificationService';
import { Bell, BellOff } from 'lucide-react';

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

const COLUMNS = [
  { id: 'brief', label: '1. Brief & Análisis', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'moodboard', label: '2. Bocetos & Moodboard', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'in_progress', label: '3. Prototipado / En Proceso', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'final', label: '4. Entrega Jurado Final', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
] as const;

/**
 * Tablero Visual de Entregas Creativas (Directriz Estado Cero)
 * Estilo Kanban, Mural Masonry y Lienzo Creativo con Temas Personalizables.
 */
export const CreativeDeliveryBoard: React.FC = () => {
  const { user } = useAuth();
  const userStorageKey = `cpe_${user?.id || 'default'}_creative_deliveries_clean_v1`;
  const themeStorageKey = `cpe_${user?.id || 'default'}_mafe_theme_mode_v1`;

  const [themeMode, setThemeMode] = useState<MafeThemeMode>(() => {
    try {
      const saved = localStorage.getItem(themeStorageKey);
      if (saved === 'STUDIO_MODERNO' || saved === 'ROSE_ATELIER') {
        return saved;
      }
      return 'ROSE_ATELIER';
    } catch {
      return 'ROSE_ATELIER';
    }
  });

  const handleToggleTheme = (newTheme: MafeThemeMode) => {
    setThemeMode(newTheme);
    try {
      localStorage.setItem(themeStorageKey, newTheme);
    } catch {
      // Ignorar fallo de almacenamiento
    }
  };

  const [deliveries, setDeliveries] = useState<CreativeDeliveryItem[]>(() => {
    try {
      const saved = localStorage.getItem(userStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return [];
    } catch {
      return [];
    }
  });

  const [prevUserId, setPrevUserId] = useState(user?.id);
  if (user?.id !== prevUserId) {
    setPrevUserId(user?.id);
    try {
      const saved = localStorage.getItem(userStorageKey);
      setDeliveries(saved ? JSON.parse(saved) : []);
    } catch {
      setDeliveries([]);
    }
    try {
      const savedTheme = localStorage.getItem(themeStorageKey);
      if (savedTheme === 'STUDIO_MODERNO' || savedTheme === 'ROSE_ATELIER') {
        setThemeMode(savedTheme);
      } else {
        setThemeMode('ROSE_ATELIER');
      }
    } catch {
      setThemeMode('ROSE_ATELIER');
    }
  }

  const saveDeliveries = (items: CreativeDeliveryItem[]) => {
    setDeliveries(items);
    localStorage.setItem(userStorageKey, JSON.stringify(items));
  };

  const [viewMode, setViewMode] = useState<'KANBAN' | 'MASONRY' | 'CANVAS' | 'CANVA'>('CANVAS');
  const [userDocs, setUserDocs] = useState<UserDocument[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourse, setNewCourse] = useState('Taller de Diseño Integral V');
  const [newDueDate, setNewDueDate] = useState('');
  const [newTag, setNewTag] = useState('');
  const [selectedStorageDocUrl, setSelectedStorageDocUrl] = useState('');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Paletas Curadas según el Tema Activo
  const studioPalette = [
    { name: 'Cobalto Puro', hex: '#0047AB', usage: 'Identidad' },
    { name: 'Azul Eléctrico', hex: '#2D72F9', usage: 'Acento UI' },
    { name: 'Naranja Cítrico', hex: '#FF6B35', usage: 'Contraste' },
    { name: 'Gris Grafito', hex: '#1E293B', usage: 'Estructura' },
    { name: 'Nieve Cálido', hex: '#F8FAFC', usage: 'Fondos' },
    { name: 'Verde Éxito', hex: '#10B981', usage: 'Aprobaciones' },
  ];

  const roseAtelierPalette = [
    { name: 'Rosa Cenizo', hex: '#E29578', usage: 'Acento Suave' },
    { name: 'Blush Atelier', hex: '#FBCFE8', usage: 'Base Lumínica' },
    { name: 'Vino Grafito', hex: '#4A2835', usage: 'Jerarquía Tipográfica' },
    { name: 'Melocotón Desaturado', hex: '#F4ACB7', usage: 'Identidad' },
    { name: 'Salvia Silencioso', hex: '#839788', usage: 'Contrapunto' },
    { name: 'Marfil Crema', hex: '#FFF8F6', usage: 'Lienzo Neutro' },
  ];

  const activePalette = themeMode === 'ROSE_ATELIER' ? roseAtelierPalette : studioPalette;

  const [notifGranted, setNotifGranted] = useState<boolean>(() => {
    return notificationService.getPermissionStatus() === 'granted';
  });

  const handleRequestDeliveryNotifications = async () => {
    const granted = await notificationService.requestNotificationPermission();
    setNotifGranted(granted);
    if (granted) {
      notificationService.sendNativeNotification('🎨 Alertas de Entregas Activadas', {
        body: 'El sistema monitoreará tus fechas de jurado y te notificará 48h antes de cada entrega.',
      });
      if (deliveries.length > 0) {
        notificationService.checkAndNotifyUpcomingDeadlines({
          deliveries: deliveries.map((d) => ({
            id: d.id,
            title: d.title,
            course: d.course,
            dueDate: d.dueDate,
          })),
        });
      }
    }
  };

  // Monitoreo automático de plazos de entregas próximas (< 48h)
  useEffect(() => {
    if (notificationService.getPermissionStatus() === 'granted' && deliveries.length > 0) {
      notificationService.checkAndNotifyUpcomingDeadlines({
        deliveries: deliveries.map((d) => ({
          id: d.id,
          title: d.title,
          course: d.course,
          dueDate: d.dueDate,
        })),
      });
    }
  }, [deliveries]);

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
      coverUrl: selectedStorageDocUrl || undefined,
    };

    saveDeliveries([newItem, ...deliveries]);

    if (newDueDate && notifGranted) {
      notificationService.scheduleDeliveryNotification({
        id: newItem.id,
        title: newItem.title,
        course: newItem.course,
        dueDate: newItem.dueDate,
      });
    }

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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold mb-2">
            <PaletteIcon className={`w-3.5 h-3.5 ${themeMode === 'ROSE_ATELIER' ? 'text-rose-500' : 'text-brand-500'}`} />
            <span>Entregas & Proyectos Creativos</span>
            <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono uppercase ${
              themeMode === 'ROSE_ATELIER' ? 'bg-rose-100/80 text-rose-800' : 'bg-slate-200 text-slate-800'
            }`}>
              {themeMode === 'ROSE_ATELIER' ? 'Tema Rose Atelier' : 'Tema Estudio'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
            Atelier de Diseño & Tablero de Entregas
          </h2>
          <p className="text-sm text-slate-500">
            Lienzo interactivo, objetos geométricos, análisis crítico por IA y gestión de entregas académicas UCAB.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Conmutador de Temas Personalizados */}
          <div className="inline-flex p-1 bg-slate-100/90 rounded-2xl border border-slate-200/90 shadow-soft-xs">
            <button
              onClick={() => handleToggleTheme('STUDIO_MODERNO')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                themeMode === 'STUDIO_MODERNO'
                  ? 'bg-slate-900 text-white shadow-soft-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tema Estudio Minimalista Neutro"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>Estudio</span>
            </button>
            <button
              onClick={() => handleToggleTheme('ROSE_ATELIER')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                themeMode === 'ROSE_ATELIER'
                  ? 'bg-rose-500 text-white shadow-soft-sm'
                  : 'text-rose-700 hover:text-rose-900'
              }`}
              title="Tema Rose Atelier Pastel (Paleta no saturada, tono rosado editorial)"
            >
              <span className="w-2 h-2 rounded-full bg-rose-200" />
              <span>Rose Atelier</span>
            </button>
          </div>

          {/* Selector de Modos de Vista */}
          <div className="inline-flex p-1 bg-slate-200/70 rounded-2xl border border-slate-200">
            <button
              onClick={() => setViewMode('CANVAS')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'CANVAS'
                  ? themeMode === 'ROSE_ATELIER'
                    ? 'bg-white text-rose-800 shadow-soft-sm ring-1 ring-rose-200'
                    : 'bg-white text-slate-900 shadow-soft-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>📐</span>
              <span>Lienzo & Formas</span>
            </button>
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
              Mural
            </button>
            <button
              onClick={() => setViewMode('CANVA')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'CANVA'
                  ? 'bg-white text-slate-900 shadow-soft-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Canva & Bulk
            </button>
          </div>

          <button
            onClick={handleRequestDeliveryNotifications}
            className={`px-3 py-2 rounded-2xl text-xs font-semibold border transition-all flex items-center gap-1.5 shadow-soft-xs active:scale-95 ${
              notifGranted
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
            }`}
            title={
              notifGranted
                ? 'Alertas de entrega activas (notificaciones nativas 48h y 24h antes de fechas de jurado)'
                : 'Haz clic para activar recordatorios nativos de entregas'
            }
          >
            {notifGranted ? (
              <>
                <Bell className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Alertas Activas ✓</span>
              </>
            ) : (
              <>
                <BellOff className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden sm:inline">Activar Alertas</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className={`text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-soft rounded-2xl font-bold transition-all ${
              themeMode === 'ROSE_ATELIER'
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'btn-primary'
            }`}
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
          {activePalette.map((swatch) => (
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

      {/* Banner de Estado Cero si no hay entregas y estamos en vistas de entrega */}
      {(viewMode === 'KANBAN' || viewMode === 'MASONRY') && deliveries.length === 0 && (
        <EmptyState
          title="No tienes entregas ni proyectos en el tablero"
          description="Organiza tus proyectos por etapas (Brief, Bocetos, Prototipado, Jurado Final) con imágenes de referencia y notas de entrega."
          actionLabel="+ Crear Primera Entrega"
          onAction={() => setShowAddModal(true)}
        />
      )}

      {/* VISTA 0: LIENZO CREATIVO INTERACTIVO CON FORMAS, IA Y EXPORTACIÓN */}
      {viewMode === 'CANVAS' ? (
        <CreativeStudioCanvas themeMode={themeMode} onThemeChange={handleToggleTheme} />
      ) : viewMode === 'KANBAN' ? (
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
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-400 font-mono">
                              📅 {item.dueDate}
                            </span>
                            <button
                              onClick={() => {
                                notificationService.scheduleDeliveryNotification({
                                  id: item.id,
                                  title: item.title,
                                  course: item.course,
                                  dueDate: item.dueDate,
                                });
                                alert(`Alerta programada para "${item.title}". Te notificaremos 48h antes del cierre.`);
                              }}
                              className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Configurar recordatorio nativo para esta entrega"
                            >
                              <Bell className="w-3 h-3" />
                            </button>
                          </div>

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
      ) : viewMode === 'MASONRY' ? (
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
      ) : (
        /* VISTA 3: CANVA STUDIO HUB (EMBEDS Y TABLA BULK CSV) */
        <CanvaStudioHub />
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
