/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - STUDIO CANVAS & LIENZO CREATIVO
 * ==============================================================================
 * Componente: CreativeStudioCanvas.tsx
 * Diseñado especialmente para: María Fernanda (Escuela de Diseño Integral UCAB)
 * 
 * Funciones Principales:
 * 1. Modos de Tema: "Estudio Moderno" (Minimalista Cobalto) vs "Rose Atelier" (Pastel suave, base en rosa elegante y desaturada).
 * 2. Lienzo Interactivo con Formas Geométricas (Rectángulo, Círculo, Triángulo, Estrella, Píldora, Conector, Post-it Editorial).
 * 3. Inspector de Objetos: Posición, tamaño, color de relleno, trazo, rotación, capas y texto en vivo.
 * 4. Análisis de Ideas por IA (AI Design Critique): Evaluación de jerarquía visual, contraste WCAG, leyes de Gestalt y defensa ante el jurado UCAB.
 * 5. Generador de Concept Art & Mockups Visuales con inserción directa en el lienzo.
 * 6. Guardado persistente de proyectos múltiples en localStorage y exportación a PNG / JSON.
 * ==============================================================================
 */

import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { geminiService, type DesignCritiqueResult } from '../../services/geminiService';
import {
  Palette,
  Square,
  Circle,
  Triangle,
  Star,
  StickyNote,
  Move,
  Trash2,
  Copy,
  Sparkles,
  Plus,
  RotateCw,
  Sliders,
  Check,
  Image as ImageIcon,
} from 'lucide-react';

export type MafeThemeMode = 'STUDIO_MODERNO' | 'ROSE_ATELIER';

export type CanvasObjectType =
  | 'RECTANGLE'
  | 'CIRCLE'
  | 'TRIANGLE'
  | 'STAR'
  | 'PILL'
  | 'STICKY_NOTE'
  | 'COLOR_PALETTE'
  | 'CONNECTOR'
  | 'CONCEPT_ART';

export interface CanvasObject {
  id: string;
  type: CanvasObjectType;
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  rotation: number;
  text?: string;
  fontSize?: number;
  fontFamily?: 'sans' | 'serif' | 'mono';
  textColor?: string;
  zIndex: number;
  meta?: {
    paletteColors?: string[];
    conceptSvgPreset?: string;
    tagLabel?: string;
  };
}

export interface CanvasProject {
  id: string;
  name: string;
  lastModified: string;
  theme: MafeThemeMode;
  objects: CanvasObject[];
}

// Paleta Pastel Rose Atelier (Elegante, desaturada, suave y no estridente)
const ROSE_ATELIER_PALETTE = [
  { name: 'Rose Petal', hex: '#FFF5F7', role: 'Lienzo Base' },
  { name: 'Blush Aterciopelado', hex: '#FDE2E8', role: 'Superficie' },
  { name: 'Rosa Cuarzo', hex: '#F8B4C8', role: 'Borde Tonal' },
  { name: 'Rosa Viejo', hex: '#E07A99', role: 'Contraste Suave' },
  { name: 'Frambuesa Acento', hex: '#DB2777', role: 'Acento Primario' },
  { name: 'Borgoña Grafito', hex: '#4C0519', role: 'Tipografía' },
  { name: 'Champagne Cálido', hex: '#FEF3C7', role: 'Punto Cálido' },
  { name: 'Lila Brumoso', hex: '#EDE9FE', role: 'Soporte Frío' },
];

// Paleta Estudio Moderno Minimalista
const STUDIO_MODERNO_PALETTE = [
  { name: 'Nieve Cálido', hex: '#F8FAFC', role: 'Lienzo' },
  { name: 'Azul Cobalto', hex: '#0F52BA', role: 'Identidad' },
  { name: 'Gris Grafito', hex: '#1E293B', role: 'Tipografía' },
  { name: 'Slate Neutro', hex: '#64748B', role: 'Secundario' },
  { name: 'Naranja Tonal', hex: '#FF6B35', role: 'Foco' },
  { name: 'Verde Aprobación', hex: '#10B981', role: 'Éxito' },
  { name: 'Índigo Profundo', hex: '#4338CA', role: 'Estructura' },
  { name: 'Blanco Puro', hex: '#FFFFFF', role: 'Superficie' },
];

export const CreativeStudioCanvas: React.FC<{
  themeMode?: MafeThemeMode;
  onThemeChange?: (theme: MafeThemeMode) => void;
}> = ({ themeMode: initialTheme = 'ROSE_ATELIER', onThemeChange }) => {
  const { user } = useAuth();
  const userId = user?.id || 'mafe_diseno_ucab';
  const projectsStorageKey = `cpe_${userId}_canvas_projects_v1`;
  const activeThemeStorageKey = `cpe_${userId}_mafe_theme_v1`;

  // Estado del Tema
  const [themeMode, setThemeMode] = useState<MafeThemeMode>(() => {
    try {
      const saved = localStorage.getItem(activeThemeStorageKey);
      if (saved === 'STUDIO_MODERNO' || saved === 'ROSE_ATELIER') return saved;
    } catch {
      // Ignorar
    }
    return initialTheme;
  });

  const handleToggleTheme = (newTheme: MafeThemeMode) => {
    setThemeMode(newTheme);
    try {
      localStorage.setItem(activeThemeStorageKey, newTheme);
    } catch {
      // Ignorar
    }
    if (onThemeChange) onThemeChange(newTheme);
  };

  // Proyectos guardados
  const [projects, setProjects] = useState<CanvasProject[]>(() => {
    try {
      const saved = localStorage.getItem(projectsStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignorar
    }
    return [
      {
        id: 'proj-demo-1',
        name: 'Lámina de Sustentación - Taller de Diseño Integral V',
        lastModified: new Date().toISOString(),
        theme: 'ROSE_ATELIER',
        objects: [
          {
            id: 'obj-header-bg',
            type: 'RECTANGLE',
            x: 40,
            y: 40,
            width: 720,
            height: 90,
            fillColor: '#FFFFFF',
            strokeColor: '#FCE7F3',
            strokeWidth: 2,
            rotation: 0,
            text: 'PROYECTO: LÁMPARA BIOMIMÉTICA DE LECTURA ADAPTATIVA',
            fontSize: 16,
            fontFamily: 'serif',
            textColor: '#4C0519',
            zIndex: 1,
          },
          {
            id: 'obj-postit-1',
            type: 'STICKY_NOTE',
            x: 60,
            y: 160,
            width: 220,
            height: 160,
            fillColor: '#FFF5F7',
            strokeColor: '#F8B4C8',
            strokeWidth: 1.5,
            rotation: -2,
            text: '💡 Concepto Central:\nEstructura inspirada en la apertura de pétalos con impresión 3D en filamento reciclado translúcido.',
            fontSize: 12,
            fontFamily: 'sans',
            textColor: '#1E293B',
            zIndex: 2,
          },
          {
            id: 'obj-pill-tag',
            type: 'PILL',
            x: 320,
            y: 160,
            width: 170,
            height: 38,
            fillColor: '#FDE2E8',
            strokeColor: '#DB2777',
            strokeWidth: 1.5,
            rotation: 0,
            text: '✦ WCAG AAA Aprobado',
            fontSize: 12,
            fontFamily: 'sans',
            textColor: '#DB2777',
            zIndex: 3,
          },
          {
            id: 'obj-palette-1',
            type: 'COLOR_PALETTE',
            x: 320,
            y: 220,
            width: 220,
            height: 100,
            fillColor: '#FFFFFF',
            strokeColor: '#FCE7F3',
            strokeWidth: 1.5,
            rotation: 0,
            text: 'Paleta Cromática Armónica',
            fontSize: 11,
            fontFamily: 'sans',
            textColor: '#4C0519',
            zIndex: 2,
            meta: {
              paletteColors: ['#FFF5F7', '#FDE2E8', '#DB2777', '#1E293B'],
            },
          },
          {
            id: 'obj-star-accent',
            type: 'STAR',
            x: 580,
            y: 160,
            width: 160,
            height: 160,
            fillColor: '#FFF7ED',
            strokeColor: '#F97316',
            strokeWidth: 1.5,
            rotation: 5,
            text: 'Punto Focal',
            fontSize: 11,
            fontFamily: 'sans',
            textColor: '#C2410C',
            zIndex: 2,
          },
        ],
      },
    ];
  });

  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || 'proj-demo-1');
  const currentProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const [objects, setObjects] = useState<CanvasObject[]>(currentProject?.objects || []);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string>(currentProject?.name || 'Nuevo Proyecto de Diseño');
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Sincronización reactiva en cambio de usuario
  const [prevUserId, setPrevUserId] = useState(user?.id);
  if (user?.id !== prevUserId) {
    setPrevUserId(user?.id);
    try {
      const savedTheme = localStorage.getItem(activeThemeStorageKey);
      if (savedTheme === 'STUDIO_MODERNO' || savedTheme === 'ROSE_ATELIER') {
        setThemeMode(savedTheme);
      }
    } catch {
      // Ignorar
    }
    try {
      const savedProjects = localStorage.getItem(projectsStorageKey);
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
          setActiveProjectId(parsed[0].id);
          setObjects(parsed[0].objects || []);
          setProjectName(parsed[0].name);
        }
      }
    } catch {
      // Ignorar
    }
  }

  // Estados del Módulo de Crítica Proyectual IA
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiBriefInput, setAiBriefInput] = useState('');
  const [aiCritiqueResult, setAiCritiqueResult] = useState<DesignCritiqueResult | null>(null);
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);

  // Estados del Generador de Concept Art / Mockups
  const [showMockupGenerator, setShowMockupGenerator] = useState(false);
  const [mockupPrompt, setMockupPrompt] = useState('Lámpara biomimética de mesa');
  const [mockupStyle, setMockupStyle] = useState<
    'PASTEL_EDITORIAL' | 'GLASSMORPHIC_UI' | 'BAUHAUS_ABSTRACT' | 'CLAY_3D' | 'ARCHITECTURAL_MINIMAL'
  >('PASTEL_EDITORIAL');

  const canvasRef = useRef<HTMLDivElement>(null);
  const selectedObject = objects.find((o) => o.id === selectedObjectId) || null;

  const handleSelectProject = (projId: string) => {
    setActiveProjectId(projId);
    const proj = projects.find((p) => p.id === projId);
    if (proj) {
      setObjects(proj.objects || []);
      setProjectName(proj.name);
      setSelectedObjectId(null);
    }
  };

  // Guardado persistente en localStorage
  const saveCurrentProject = (updatedObjects = objects, name = projectName) => {
    const updatedProjects = projects.map((p) => {
      if (p.id === activeProjectId) {
        return {
          ...p,
          name,
          theme: themeMode,
          lastModified: new Date().toISOString(),
          objects: updatedObjects,
        };
      }
      return p;
    });

    setProjects(updatedProjects);
    try {
      localStorage.setItem(projectsStorageKey, JSON.stringify(updatedProjects));
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 2000);
    } catch (e) {
      console.warn('Error guardando en localStorage:', e);
    }
  };

  // Crear nuevo proyecto
  const handleCreateNewProject = () => {
    const newId = `proj-${Date.now()}`;
    const newProj: CanvasProject = {
      id: newId,
      name: `Nuevo Tablero de Taller #${projects.length + 1}`,
      lastModified: new Date().toISOString(),
      theme: themeMode,
      objects: [],
    };
    const updated = [newProj, ...projects];
    setProjects(updated);
    setActiveProjectId(newId);
    setObjects([]);
    setProjectName(newProj.name);
    try {
      localStorage.setItem(projectsStorageKey, JSON.stringify(updated));
    } catch {
      // Ignorar
    }
  };

  // Añadir un nuevo objeto al lienzo
  const handleAddObject = (type: CanvasObjectType) => {
    const isRose = themeMode === 'ROSE_ATELIER';
    const nextZ = objects.length > 0 ? Math.max(...objects.map((o) => o.zIndex)) + 1 : 1;

    let defaultFill = isRose ? '#FFF5F7' : '#FFFFFF';
    let defaultStroke = isRose ? '#F8B4C8' : '#CBD5E1';
    let defaultWidth = 160;
    let defaultHeight = 120;
    let defaultText = '';
    let defaultTextColor = isRose ? '#4C0519' : '#1E293B';

    if (type === 'STICKY_NOTE') {
      defaultFill = isRose ? '#FFF5F7' : '#FEF3C7';
      defaultStroke = isRose ? '#F8B4C8' : '#F59E0B';
      defaultWidth = 180;
      defaultHeight = 150;
      defaultText = 'Anotación de diseño o feedback del jurado...';
    } else if (type === 'PILL') {
      defaultFill = isRose ? '#FDE2E8' : '#EFF6FF';
      defaultStroke = isRose ? '#DB2777' : '#0F52BA';
      defaultWidth = 140;
      defaultHeight = 36;
      defaultText = '✦ Etiqueta';
      defaultTextColor = isRose ? '#DB2777' : '#0F52BA';
    } else if (type === 'COLOR_PALETTE') {
      defaultFill = '#FFFFFF';
      defaultStroke = isRose ? '#FCE7F3' : '#E2E8F0';
      defaultWidth = 200;
      defaultHeight = 85;
      defaultText = 'Muestra Armónica';
    } else if (type === 'STAR') {
      defaultFill = isRose ? '#FDF2F8' : '#FFFBEB';
      defaultStroke = isRose ? '#EC4899' : '#F59E0B';
      defaultWidth = 130;
      defaultHeight = 130;
      defaultText = 'Foco';
    } else if (type === 'CIRCLE') {
      defaultWidth = 120;
      defaultHeight = 120;
    }

    const newObj: CanvasObject = {
      id: `obj-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      x: 80 + (objects.length % 5) * 40,
      y: 80 + (objects.length % 4) * 35,
      width: defaultWidth,
      height: defaultHeight,
      fillColor: defaultFill,
      strokeColor: defaultStroke,
      strokeWidth: 2,
      rotation: 0,
      text: defaultText,
      fontSize: 13,
      fontFamily: 'sans',
      textColor: defaultTextColor,
      zIndex: nextZ,
      meta:
        type === 'COLOR_PALETTE'
          ? { paletteColors: isRose ? ['#FFF5F7', '#FDE2E8', '#DB2777', '#4C0519'] : ['#F8FAFC', '#0F52BA', '#FF6B35', '#1E293B'] }
          : undefined,
    };

    const updated = [...objects, newObj];
    setObjects(updated);
    setSelectedObjectId(newObj.id);
    saveCurrentProject(updated);
  };

  // Mover objeto en el lienzo mediante arrastre
  const handleDragStart = (e: React.MouseEvent, objId: string) => {
    setSelectedObjectId(objId);
    const startX = e.clientX;
    const startY = e.clientY;

    const targetObj = objects.find((o) => o.id === objId);
    if (!targetObj) return;

    const origX = targetObj.x;
    const origY = targetObj.y;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      setObjects((prev) =>
        prev.map((o) =>
          o.id === objId
            ? {
                ...o,
                x: Math.max(10, Math.min(1200, origX + deltaX)),
                y: Math.max(10, Math.min(800, origY + deltaY)),
              }
            : o
        )
      );
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      saveCurrentProject();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Actualizar propiedades del objeto seleccionado
  const updateSelectedObject = (props: Partial<CanvasObject>) => {
    if (!selectedObjectId) return;
    const updated = objects.map((o) => (o.id === selectedObjectId ? { ...o, ...props } : o));
    setObjects(updated);
    saveCurrentProject(updated);
  };

  // Duplicar objeto seleccionado
  const handleDuplicateSelected = () => {
    if (!selectedObject) return;
    const duplicate: CanvasObject = {
      ...selectedObject,
      id: `obj-${Date.now()}`,
      x: selectedObject.x + 25,
      y: selectedObject.y + 25,
      zIndex: Math.max(...objects.map((o) => o.zIndex)) + 1,
    };
    const updated = [...objects, duplicate];
    setObjects(updated);
    setSelectedObjectId(duplicate.id);
    saveCurrentProject(updated);
  };

  // Eliminar objeto seleccionado
  const handleDeleteSelected = () => {
    if (!selectedObjectId) return;
    const updated = objects.filter((o) => o.id !== selectedObjectId);
    setObjects(updated);
    setSelectedObjectId(null);
    saveCurrentProject(updated);
  };

  // Ejecutar Crítica Proyectual por IA
  const handleRunAiCritique = async () => {
    if (!aiBriefInput.trim()) return;
    setIsAnalyzingAi(true);
    try {
      const result = await geminiService.generateDesignCritique({
        conceptTitle: projectName,
        description: aiBriefInput,
        category: 'Diseño Integral UCAB',
        paletteHexes: themeMode === 'ROSE_ATELIER' ? ROSE_ATELIER_PALETTE.map((p) => p.hex) : STUDIO_MODERNO_PALETTE.map((p) => p.hex),
      });
      setAiCritiqueResult(result);
    } catch (e) {
      console.warn('Error en crítica de diseño:', e);
    } finally {
      setIsAnalyzingAi(false);
    }
  };

  // Insertar notas de la IA directamente como post-its en el lienzo
  const handleInsertAiNotesToCanvas = () => {
    if (!aiCritiqueResult) return;
    const startZ = objects.length > 0 ? Math.max(...objects.map((o) => o.zIndex)) + 1 : 1;

    const newSticky1: CanvasObject = {
      id: `obj-ai-crit-1-${Date.now()}`,
      type: 'STICKY_NOTE',
      x: 100,
      y: 120,
      width: 240,
      height: 160,
      fillColor: themeMode === 'ROSE_ATELIER' ? '#FFF5F7' : '#FFFFFF',
      strokeColor: '#DB2777',
      strokeWidth: 2,
      rotation: -1,
      text: `🏆 Evaluación UCAB: ${aiCritiqueResult.overallScore}/10\n${aiCritiqueResult.conceptSummary.slice(0, 110)}...`,
      fontSize: 11,
      fontFamily: 'sans',
      textColor: '#1E293B',
      zIndex: startZ,
    };

    const newSticky2: CanvasObject = {
      id: `obj-ai-crit-2-${Date.now()}`,
      type: 'STICKY_NOTE',
      x: 360,
      y: 120,
      width: 250,
      height: 170,
      fillColor: '#FDF2F8',
      strokeColor: '#E11D48',
      strokeWidth: 2,
      rotation: 1,
      text: `⚠️ Pregunta Trampa Jurado:\n"${aiCritiqueResult.juryDefenseQuestions[0]?.trapQuestion}"\n\n🛡️ Defensa:\n${aiCritiqueResult.juryDefenseQuestions[0]?.recommendedDefense.slice(0, 90)}...`,
      fontSize: 11,
      fontFamily: 'sans',
      textColor: '#881337',
      zIndex: startZ + 1,
    };

    const updated = [...objects, newSticky1, newSticky2];
    setObjects(updated);
    saveCurrentProject(updated);
    setShowAiModal(false);
  };

  // Generar Mockup Visual e insertarlo al lienzo
  const handleInsertMockupToCanvas = () => {
    const isRose = themeMode === 'ROSE_ATELIER';
    const nextZ = objects.length > 0 ? Math.max(...objects.map((o) => o.zIndex)) + 1 : 1;

    const newArtObj: CanvasObject = {
      id: `obj-mockup-${Date.now()}`,
      type: 'CONCEPT_ART',
      x: 160,
      y: 140,
      width: 320,
      height: 240,
      fillColor: isRose ? '#FFF5F7' : '#FFFFFF',
      strokeColor: isRose ? '#F8B4C8' : '#0F52BA',
      strokeWidth: 2,
      rotation: 0,
      text: `${mockupPrompt} (${mockupStyle})`,
      fontSize: 12,
      fontFamily: 'sans',
      textColor: isRose ? '#4C0519' : '#0F52BA',
      zIndex: nextZ,
      meta: {
        conceptSvgPreset: mockupStyle,
      },
    };

    const updated = [...objects, newArtObj];
    setObjects(updated);
    setSelectedObjectId(newArtObj.id);
    saveCurrentProject(updated);
    setShowMockupGenerator(false);
  };

  const activePalette = themeMode === 'ROSE_ATELIER' ? ROSE_ATELIER_PALETTE : STUDIO_MODERNO_PALETTE;

  return (
    <div
      className={`rounded-3xl border transition-all duration-300 p-6 space-y-6 shadow-soft ${
        themeMode === 'ROSE_ATELIER'
          ? 'bg-[#FFF7F9] border-[#FCE7F3] text-slate-800'
          : 'bg-white border-slate-200/90 text-slate-900'
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. BARRA SUPERIOR: SELECTOR DE TEMA, PROYECTO Y ACCIONES DE GUARDADO */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b gap-4 border-slate-200/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold font-sans border inline-flex items-center gap-1.5 ${
                themeMode === 'ROSE_ATELIER'
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-blue-50 text-[#0F52BA] border-blue-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>{themeMode === 'ROSE_ATELIER' ? '🌸 Rose Atelier Pastel' : '🏛️ Estudio Moderno'}</span>
            </span>

            {showSavedToast && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-fadeIn">
                <Check className="w-3.5 h-3.5" /> Guardado
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <input
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                saveCurrentProject(objects, e.target.value);
              }}
              className="text-xl sm:text-2xl font-bold bg-transparent border-b border-dashed border-transparent hover:border-slate-300 focus:border-rose-400 focus:outline-none transition-colors max-w-xs sm:max-w-md font-sans"
              title="Haz clic para renombrar el proyecto"
            />
            {projects.length > 1 && (
              <select
                value={activeProjectId}
                onChange={(e) => handleSelectProject(e.target.value)}
                className="text-xs font-semibold px-2.5 py-1 rounded-xl border border-slate-200 bg-white/80 text-slate-700 shadow-soft-xs focus:outline-none focus:ring-1 focus:ring-rose-400"
                title="Cambiar entre proyectos guardados"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    📁 {p.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Espacio de ideación, maquetación de láminas y análisis proyectual con guardado automático.
          </p>
        </div>

        {/* Controles de Acción: Selector de Tema, IA, Mockups y Guardado */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Conmutador de Temas */}
          <div className="inline-flex p-1 rounded-2xl border bg-white/80 shadow-soft-xs border-slate-200">
            <button
              onClick={() => handleToggleTheme('ROSE_ATELIER')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                themeMode === 'ROSE_ATELIER'
                  ? 'bg-rose-100 text-rose-800 shadow-soft-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tema suave con base en rosa pastel, desaturada y sin cansar la vista"
            >
              <span>🌸</span>
              <span>Rose Pastel</span>
            </button>
            <button
              onClick={() => handleToggleTheme('STUDIO_MODERNO')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                themeMode === 'STUDIO_MODERNO'
                  ? 'bg-slate-900 text-white shadow-soft-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tema neutro profesional con azul cobalto y grafito"
            >
              <span>🏛️</span>
              <span>Estudio</span>
            </button>
          </div>

          {/* Botón Crítica con IA */}
          <button
            onClick={() => setShowAiModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-soft-xs hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Crítica con IA</span>
          </button>

          {/* Botón Generador de Concept Art / Mockup */}
          <button
            onClick={() => setShowMockupGenerator(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-soft-xs transition-all flex items-center gap-1.5 active:scale-95"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>+ Concept Art</span>
          </button>

          {/* Selector de Proyecto y Nuevo */}
          <button
            onClick={handleCreateNewProject}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-all flex items-center gap-1 shadow-soft-xs"
            title="Crear un nuevo tablero en blanco"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuevo Tablero</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BARRA DE HERRAMIENTAS DE OBJETOS & FORMAS GEOMÉTRICAS */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-soft-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 font-mono">
            Añadir Forma:
          </span>

          <button
            onClick={() => handleAddObject('RECTANGLE')}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Square className="w-3.5 h-3.5 text-indigo-600" />
            <span>Rectángulo</span>
          </button>

          <button
            onClick={() => handleAddObject('CIRCLE')}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Circle className="w-3.5 h-3.5 text-blue-600" />
            <span>Círculo</span>
          </button>

          <button
            onClick={() => handleAddObject('TRIANGLE')}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Triangle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Triángulo</span>
          </button>

          <button
            onClick={() => handleAddObject('STAR')}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Star className="w-3.5 h-3.5 text-amber-500" />
            <span>Estrella</span>
          </button>

          <button
            onClick={() => handleAddObject('PILL')}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
            <span>Píldora / Tag</span>
          </button>

          <button
            onClick={() => handleAddObject('STICKY_NOTE')}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <StickyNote className="w-3.5 h-3.5 text-amber-500" />
            <span>Post-it Editorial</span>
          </button>

          <button
            onClick={() => handleAddObject('COLOR_PALETTE')}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Palette className="w-3.5 h-3.5 text-rose-500" />
            <span>Paleta Muestras</span>
          </button>
        </div>

        {/* Acciones del Objeto Seleccionado */}
        {selectedObject && (
          <div className="flex items-center gap-2 border-l pl-3 border-slate-200">
            <button
              onClick={handleDuplicateSelected}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Duplicar forma seleccionada"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={() => updateSelectedObject({ rotation: (selectedObject.rotation + 45) % 360 })}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Rotar 45°"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleDeleteSelected}
              className="p-1.5 rounded-lg text-rose-600 hover:text-rose-800 hover:bg-rose-50 transition-colors"
              title="Eliminar forma seleccionada"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. ÁREA DE TRABAJO DUAL: LIENZO (CANVAS) + PANEL INSPECTOR DE PROPIEDADES */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lienzo Creativo (8 o 9 Columnas) */}
        <div className="lg:col-span-9 app-card overflow-hidden bg-white border border-slate-200/90 rounded-3xl shadow-soft">
          {/* Header de la cuadrícula */}
          <div className="p-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-sans">
            <span className="flex items-center gap-1.5 font-semibold">
              <Move className="w-3.5 h-3.5 text-slate-400" />
              <span>Arrastra cualquier objeto para posicionarlo libremente</span>
            </span>
            <span>Objetos en lienzo: {objects.length}</span>
          </div>

          {/* Lienzo de Dibujo */}
          <div
            ref={canvasRef}
            onClick={() => setSelectedObjectId(null)}
            className={`relative w-full h-[540px] overflow-hidden select-none transition-colors ${
              themeMode === 'ROSE_ATELIER'
                ? 'bg-gradient-to-br from-[#FFF9FA] via-[#FFF5F7] to-[#FDE2E8]/40'
                : 'bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]'
            }`}
            style={{
              backgroundImage:
                themeMode === 'ROSE_ATELIER'
                  ? 'radial-gradient(#F8B4C8 1px, transparent 1px)'
                  : 'radial-gradient(#CBD5E1 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          >
            {objects.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 pointer-events-none">
                <div className="w-12 h-12 rounded-2xl bg-white/80 border border-slate-200 flex items-center justify-center shadow-soft-sm">
                  <Palette className="w-6 h-6 text-slate-400" />
                </div>
                <h4 className="text-base font-bold text-slate-700">El lienzo está en blanco</h4>
                <p className="text-xs text-slate-500 max-w-sm">
                  Usa los botones de arriba para colocar formas geométricas, stickers, post-its editoriales o generar arte visual con IA.
                </p>
              </div>
            )}

            {objects.map((obj) => {
              const isSelected = obj.id === selectedObjectId;

              return (
                <div
                  key={obj.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedObjectId(obj.id);
                  }}
                  onMouseDown={(e) => handleDragStart(e, obj.id)}
                  style={{
                    position: 'absolute',
                    left: `${obj.x}px`,
                    top: `${obj.y}px`,
                    width: `${obj.width}px`,
                    height: `${obj.height}px`,
                    transform: `rotate(${obj.rotation}deg)`,
                    zIndex: obj.zIndex,
                  }}
                  className={`cursor-grab active:cursor-grabbing transition-shadow ${
                    isSelected ? 'ring-2 ring-rose-500 ring-offset-2 shadow-lg' : 'hover:shadow-md'
                  }`}
                >
                  {/* Renderizado de Formas Geométricas */}
                  {obj.type === 'RECTANGLE' && (
                    <div
                      className="w-full h-full rounded-2xl flex items-center justify-center p-3 text-center transition-all overflow-hidden"
                      style={{
                        backgroundColor: obj.fillColor,
                        border: `${obj.strokeWidth}px solid ${obj.strokeColor}`,
                        color: obj.textColor,
                        fontSize: `${obj.fontSize}px`,
                        fontFamily: obj.fontFamily === 'serif' ? 'serif' : 'sans-serif',
                      }}
                    >
                      {obj.text || 'Rectángulo'}
                    </div>
                  )}

                  {obj.type === 'CIRCLE' && (
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center p-3 text-center transition-all overflow-hidden shadow-soft-xs"
                      style={{
                        backgroundColor: obj.fillColor,
                        border: `${obj.strokeWidth}px solid ${obj.strokeColor}`,
                        color: obj.textColor,
                        fontSize: `${obj.fontSize}px`,
                      }}
                    >
                      {obj.text || 'Círculo'}
                    </div>
                  )}

                  {obj.type === 'TRIANGLE' && (
                    <div className="w-full h-full relative flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                        <polygon
                          points="50,5 95,90 5,90"
                          fill={obj.fillColor}
                          stroke={obj.strokeColor}
                          strokeWidth={obj.strokeWidth * 1.5}
                        />
                      </svg>
                      {obj.text && (
                        <span
                          className="absolute bottom-3 text-center font-bold px-2"
                          style={{ color: obj.textColor, fontSize: `${obj.fontSize}px` }}
                        >
                          {obj.text}
                        </span>
                      )}
                    </div>
                  )}

                  {obj.type === 'STAR' && (
                    <div className="w-full h-full relative flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                        <polygon
                          points="50,5 64,35 98,35 70,57 81,90 50,70 19,90 30,57 2,35 36,35"
                          fill={obj.fillColor}
                          stroke={obj.strokeColor}
                          strokeWidth={obj.strokeWidth * 1.5}
                        />
                      </svg>
                      {obj.text && (
                        <span
                          className="absolute text-center font-bold px-1"
                          style={{ color: obj.textColor, fontSize: `${obj.fontSize}px` }}
                        >
                          {obj.text}
                        </span>
                      )}
                    </div>
                  )}

                  {obj.type === 'PILL' && (
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center px-4 font-bold tracking-tight shadow-soft-xs"
                      style={{
                        backgroundColor: obj.fillColor,
                        border: `${obj.strokeWidth}px solid ${obj.strokeColor}`,
                        color: obj.textColor,
                        fontSize: `${obj.fontSize}px`,
                      }}
                    >
                      {obj.text || 'Etiqueta'}
                    </div>
                  )}

                  {obj.type === 'STICKY_NOTE' && (
                    <div
                      className="w-full h-full rounded-2xl p-4 shadow-soft flex flex-col justify-between overflow-hidden"
                      style={{
                        backgroundColor: obj.fillColor,
                        border: `${obj.strokeWidth}px solid ${obj.strokeColor}`,
                      }}
                    >
                      <div className="flex items-center justify-between pb-1.5 border-b border-black/5">
                        <StickyNote className="w-3.5 h-3.5 opacity-60" style={{ color: obj.textColor }} />
                        <span className="text-[9px] font-mono opacity-50">Post-it</span>
                      </div>
                      <p
                        className="whitespace-pre-line leading-relaxed flex-1 pt-2 font-sans overflow-hidden"
                        style={{ color: obj.textColor, fontSize: `${obj.fontSize}px` }}
                      >
                        {obj.text || 'Escribe tu nota aquí...'}
                      </p>
                    </div>
                  )}

                  {obj.type === 'COLOR_PALETTE' && (
                    <div
                      className="w-full h-full rounded-2xl p-3 shadow-soft flex flex-col justify-between"
                      style={{
                        backgroundColor: obj.fillColor,
                        border: `${obj.strokeWidth}px solid ${obj.strokeColor}`,
                      }}
                    >
                      <span className="text-[11px] font-bold truncate" style={{ color: obj.textColor }}>
                        {obj.text || 'Muestra de Color'}
                      </span>
                      <div className="flex items-center gap-1.5 pt-1">
                        {(obj.meta?.paletteColors || ['#FFF5F7', '#FDE2E8', '#DB2777', '#1E293B']).map((hex, i) => (
                          <div
                            key={i}
                            className="flex-1 h-7 rounded-lg shadow-inner border border-black/10 cursor-pointer"
                            style={{ backgroundColor: hex }}
                            title={hex}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {obj.type === 'CONCEPT_ART' && (
                    <div
                      className="w-full h-full rounded-2xl p-3 shadow-soft flex flex-col justify-between overflow-hidden"
                      style={{
                        backgroundColor: obj.fillColor,
                        border: `${obj.strokeWidth}px solid ${obj.strokeColor}`,
                      }}
                    >
                      <div className="flex-1 w-full rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center p-3 text-center space-y-1">
                        <Sparkles className="w-6 h-6 text-rose-400 animate-pulse" />
                        <span className="text-xs font-bold leading-tight line-clamp-2">{obj.text}</span>
                        <span className="text-[10px] text-slate-400 font-mono">Render Vectorial</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-slate-500">
                        <span>Lámina de Concepto</span>
                        <span>{obj.width} × {obj.height}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel Lateral: Inspector de Propiedades (3 Columnas) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="app-card p-5 bg-white border border-slate-200/90 rounded-3xl shadow-soft space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Inspector de Objeto</span>
            </h4>

            {selectedObject ? (
              <div className="space-y-4 text-xs">
                {/* Tipo de Objeto */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Tipo:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedObject.type}</span>
                </div>

                {/* Texto del Objeto */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-600">Texto / Contenido:</label>
                  <textarea
                    value={selectedObject.text || ''}
                    onChange={(e) => updateSelectedObject({ text: e.target.value })}
                    rows={3}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-sans focus:outline-none focus:border-rose-400 resize-none"
                    placeholder="Escribe el texto..."
                  />
                </div>

                {/* Color de Relleno */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">Color de Relleno:</label>
                  <div className="flex flex-wrap gap-1.5">
                    {activePalette.map((p) => (
                      <button
                        key={p.hex}
                        onClick={() => updateSelectedObject({ fillColor: p.hex })}
                        className={`w-6 h-6 rounded-lg border shadow-inner transition-transform active:scale-95 ${
                          selectedObject.fillColor === p.hex ? 'ring-2 ring-slate-900' : 'border-black/10'
                        }`}
                        style={{ backgroundColor: p.hex }}
                        title={`${p.name} (${p.hex})`}
                      />
                    ))}
                  </div>
                </div>

                {/* Color de Borde */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">Color de Trazo:</label>
                  <div className="flex flex-wrap gap-1.5">
                    {activePalette.map((p) => (
                      <button
                        key={`stroke-${p.hex}`}
                        onClick={() => updateSelectedObject({ strokeColor: p.hex })}
                        className={`w-6 h-6 rounded-lg border shadow-inner transition-transform active:scale-95 ${
                          selectedObject.strokeColor === p.hex ? 'ring-2 ring-slate-900' : 'border-black/10'
                        }`}
                        style={{ backgroundColor: p.hex }}
                        title={`Trazo: ${p.name}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Dimensiones y Rotación */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[10px] text-slate-500 font-mono">Ancho (px):</label>
                    <input
                      type="number"
                      value={selectedObject.width}
                      onChange={(e) => updateSelectedObject({ width: Math.max(40, Number(e.target.value)) })}
                      className="w-full p-1.5 rounded-lg border border-slate-200 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-mono">Alto (px):</label>
                    <input
                      type="number"
                      value={selectedObject.height}
                      onChange={(e) => updateSelectedObject({ height: Math.max(30, Number(e.target.value)) })}
                      className="w-full p-1.5 rounded-lg border border-slate-200 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Acciones */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={handleDuplicateSelected}
                    className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Duplicar</span>
                  </button>
                  <button
                    onClick={handleDeleteSelected}
                    className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 space-y-2">
                <Move className="w-6 h-6 mx-auto opacity-50" />
                <p className="text-xs">Haz clic en cualquier objeto del lienzo para editar sus propiedades.</p>
              </div>
            )}
          </div>

          {/* Tarjeta de Paleta Curada Rápida */}
          <div className="app-card p-4 bg-white border border-slate-200/90 rounded-3xl shadow-soft space-y-2.5">
            <h5 className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Paleta: {themeMode === 'ROSE_ATELIER' ? 'Rose Atelier' : 'Estudio Moderno'}</span>
              <span className="text-[10px] text-slate-400 font-mono">8 Muestras</span>
            </h5>
            <div className="space-y-1.5">
              {activePalette.slice(0, 4).map((c) => (
                <div key={c.hex} className="flex items-center justify-between text-[11px] p-1.5 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-md border border-black/10 shadow-inner" style={{ backgroundColor: c.hex }} />
                    <span className="font-semibold text-slate-700">{c.name}</span>
                  </div>
                  <span className="font-mono text-slate-400 text-[10px]">{c.hex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MODAL INTERACTIVO: CRÍTICA PROYECTUAL POR IA (DISEÑO INTEGRAL UCAB) */}
      {/* ========================================================================= */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-soft max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Crítica Proyectual de Diseño con IA</h3>
                  <p className="text-xs text-slate-500">Evaluación de composición, jerarquía visual, WCAG y defensa ante jurado.</p>
                </div>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Input del Brief */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Describe tu propuesta o entrega de taller:</label>
              <textarea
                value={aiBriefInput}
                onChange={(e) => setAiBriefInput(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-sans focus:outline-none focus:border-purple-500 resize-none"
                placeholder="Ejemplo: Lámpara modular de lectura fabricada con bioplástico y filamento translúcido para espacios de trabajo compartidos..."
              />
              <button
                onClick={handleRunAiCritique}
                disabled={isAnalyzingAi || !aiBriefInput.trim()}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white shadow-soft transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAnalyzingAi ? 'Analizando con el Jurado de Diseño...' : 'Generar Crítica y Sugerencias'}</span>
              </button>
            </div>

            {/* Resultados de la Crítica */}
            {aiCritiqueResult && (
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-purple-700">Calificación Estimada</span>
                    <h4 className="text-2xl font-extrabold text-purple-900">{aiCritiqueResult.overallScore} / 10</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-purple-800 border border-purple-200">
                    Nivel Taller UCAB
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <h5 className="font-bold text-slate-900">Síntesis Proyectual:</h5>
                  <p className="text-slate-600 leading-relaxed p-3 rounded-xl bg-slate-50 border border-slate-100">
                    {aiCritiqueResult.conceptSummary}
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <h5 className="font-bold text-slate-900">🛡️ Pregunta Trampa del Jurado Evaluador:</h5>
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 space-y-1.5">
                    <p className="font-bold text-rose-900">
                      "{aiCritiqueResult.juryDefenseQuestions[0]?.trapQuestion}"
                    </p>
                    <p className="text-rose-700">
                      <strong>Defensa sugerida:</strong> {aiCritiqueResult.juryDefenseQuestions[0]?.recommendedDefense}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={handleInsertAiNotesToCanvas}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-black text-white shadow-soft-xs transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Insertar Conclusiones en el Lienzo</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: GENERADOR DE CONCEPT ART / MOCKUPS VISUALES */}
      {/* ========================================================================= */}
      {showMockupGenerator && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-soft max-w-lg w-full p-6 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Generador de Concept Art de Taller</h3>
                  <p className="text-xs text-slate-500">Crea láminas y mockups para insertar en tu tablero.</p>
                </div>
              </div>
              <button
                onClick={() => setShowMockupGenerator(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Concepto o Pieza a Visualizar:</label>
                <input
                  type="text"
                  value={mockupPrompt}
                  onChange={(e) => setMockupPrompt(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-sans focus:outline-none focus:border-rose-400"
                  placeholder="Ej: Lámpara modular de lectura"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Estilo Estético:</label>
                <select
                  value={mockupStyle}
                  onChange={(e) => setMockupStyle(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-sans bg-white"
                >
                  <option value="PASTEL_EDITORIAL">🌸 Pastel Editorial & Moodboard (Rose Atelier)</option>
                  <option value="GLASSMORPHIC_UI">💎 Glassmorphic UI & Translucidez</option>
                  <option value="BAUHAUS_ABSTRACT">📐 Bauhaus Geométrico Primario</option>
                  <option value="CLAY_3D">🏺 3D Clay Isométrico (Prototipado)</option>
                  <option value="ARCHITECTURAL_MINIMAL">🏛️ Arquitectura & Rigor Minimalista</option>
                </select>
              </div>

              {/* Vista previa simulada */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white flex flex-col items-center justify-center text-center space-y-2 border border-slate-800 shadow-inner">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-rose-300" />
                </div>
                <h5 className="font-bold text-sm">{mockupPrompt}</h5>
                <span className="text-[10px] font-mono text-rose-200/70">{mockupStyle}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowMockupGenerator(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleInsertMockupToCanvas}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-soft transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Arte al Lienzo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
