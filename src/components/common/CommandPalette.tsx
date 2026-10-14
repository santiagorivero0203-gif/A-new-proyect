import React, { useState, useEffect, useRef } from 'react';
import type { MainTabType } from '../layout/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { notificationService } from '../../services/notificationService';
import {
  SearchIcon,
  LayersIcon,
  BookOpenIcon,
  CalculatorIcon,
  DownloadIcon,
  UploadCloudIcon,
  PaletteIcon,
  CalendarIcon,
  SparklesIcon,
  GridIcon,
  AtomIcon,
} from './Icons';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: MainTabType) => void;
  onOpenCalculator?: () => void;
  onOpenScratchpad?: () => void;
  onLaunchQuickExam?: () => void;
}

interface CommandAction {
  id: string;
  title: string;
  category: 'NAVEGACIÓN' | 'ESTUDIO' | 'HERRAMIENTAS' | 'NOTIFICACIONES';
  icon: React.ReactNode;
  shortcut?: string;
  run: () => void;
}

/**
 * Paleta de Comandos Global (Cmd + K / Ctrl + K)
 * 
 * Permite ejecutar acciones al instante sin usar el ratón:
 * abrir calculadora, lanzar simulacro express, buscar guías o exportar calendarios.
 */
export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
  onOpenCalculator,
  onOpenScratchpad,
  onLaunchQuickExam,
}) => {
  const { academicProfile } = useAuth();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: CommandAction[] = [
    {
      id: 'quick-exam',
      title: 'Lanzar Simulacro Express (5 Preguntas)',
      category: 'ESTUDIO',
      icon: <LayersIcon className="w-4 h-4 text-[#0F52BA]" />,
      shortcut: '↵ Enter',
      run: () => {
        onClose();
        if (onLaunchQuickExam) onLaunchQuickExam();
        else onNavigateToTab('EXAMS');
      },
    },
    {
      id: 'deconstruct',
      title: 'Deconstruir Material o Tema con Gemini IA',
      category: 'ESTUDIO',
      icon: <SparklesIcon className="w-4 h-4 text-amber-500" />,
      run: () => {
        onClose();
        onNavigateToTab('GUIDES');
      },
    },
    ...(academicProfile === 'santiago_fisica_ucv'
      ? [
          {
            id: 'nav-ucv-course',
            title: 'Ir al Curso Introductorio Ciencias UCV (6 Semanas)',
            category: 'ESTUDIO' as const,
            icon: <AtomIcon className="w-4 h-4 text-[#0F52BA]" />,
            run: () => {
              onClose();
              onNavigateToTab('UCV_COURSE');
            },
          },
        ]
      : []),
    {
      id: 'scratchpad',
      title: 'Abrir Scratchpad (Lienzo Canvas & Bloc LaTeX)',
      category: 'HERRAMIENTAS',
      icon: <span className="text-sm font-bold">✎</span>,
      run: () => {
        onClose();
        if (onOpenScratchpad) onOpenScratchpad();
      },
    },
    {
      id: 'calc',
      title: 'Abrir Calculadora Científica',
      category: 'HERRAMIENTAS',
      icon: <CalculatorIcon className="w-4 h-4 text-slate-700" />,
      run: () => {
        onClose();
        if (onOpenCalculator) onOpenCalculator();
        else onNavigateToTab('TOOLS');
      },
    },
    {
      id: 'export-ics',
      title: 'Exportar Cronograma a Calendario Nativo (.ics)',
      category: 'HERRAMIENTAS',
      icon: <DownloadIcon className="w-4 h-4 text-emerald-600" />,
      run: () => {
        onClose();
        onNavigateToTab('PLANNER');
      },
    },
    {
      id: 'push-test',
      title: 'Probar Alerta Nativa Web Push',
      category: 'NOTIFICACIONES',
      icon: <SparklesIcon className="w-4 h-4 text-purple-600" />,
      run: () => {
        onClose();
        notificationService.sendNativeNotification('Recordatorio de Estudio Activo', {
          body: 'Tu sesión de concentración comienza en breve. ¡Todo listo!',
        });
      },
    },
    {
      id: 'nav-dashboard',
      title: 'Ir al Dashboard Principal',
      category: 'NAVEGACIÓN',
      icon: <GridIcon className="w-4 h-4 text-slate-600" />,
      run: () => {
        onClose();
        onNavigateToTab('PRODUCTIVITY');
      },
    },
    {
      id: 'nav-planner',
      title: 'Ir a Agenda Académica & Calendario',
      category: 'NAVEGACIÓN',
      icon: <CalendarIcon className="w-4 h-4 text-slate-600" />,
      run: () => {
        onClose();
        onNavigateToTab('PLANNER');
      },
    },
    {
      id: 'nav-guides',
      title: 'Ir a Guías de Estudio & Deconstrucción',
      category: 'NAVEGACIÓN',
      icon: <BookOpenIcon className="w-4 h-4 text-slate-600" />,
      run: () => {
        onClose();
        onNavigateToTab('GUIDES');
      },
    },
    {
      id: 'nav-vault',
      title: 'Ir a Documentos & Supabase Vault',
      category: 'NAVEGACIÓN',
      icon: <UploadCloudIcon className="w-4 h-4 text-slate-600" />,
      run: () => {
        onClose();
        onNavigateToTab('STORAGE');
      },
    },
    {
      id: 'nav-kanban',
      title: 'Ir al Tablero Visual de Proyectos Kanban',
      category: 'NAVEGACIÓN',
      icon: <PaletteIcon className="w-4 h-4 text-slate-600" />,
      run: () => {
        onClose();
        onNavigateToTab('CREATIVE_BOARD');
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].run();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-start justify-center pt-20 sm:pt-28 p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-xl w-full shadow-soft-lg border border-slate-200/90 overflow-hidden flex flex-col max-h-[500px]"
      >
        {/* Input de Búsqueda de Comandos */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <SearchIcon className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Escribe un comando o busca una herramienta..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono font-bold text-slate-500 border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Lista de Acciones */}
        <div className="p-2 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No se encontraron comandos que coincidan con &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((action, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={action.id}
                  onClick={() => action.run()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all text-left ${
                    isSelected
                      ? 'bg-[#0F52BA] text-white shadow-soft-sm'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {action.icon}
                    </div>
                    <span className="truncate">{action.title}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {action.category}
                    </span>
                    {action.shortcut && (
                      <kbd
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {action.shortcut}
                      </kbd>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Pie de la Paleta */}
        <div className="px-5 py-2.5 bg-slate-50/70 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between font-mono">
          <span>Usa ↑ ↓ para navegar • ↵ para ejecutar</span>
          <span>Cmd + K</span>
        </div>
      </div>
    </div>
  );
};
