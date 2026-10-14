import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { AcademicProfileId, MainTabType } from '../../types';
import { DEFAULT_PROFILE_SIDEBAR_TABS } from '../../lib/mockData';
import {
  GridIcon,
  BookOpenIcon,
  LayersIcon,
  CalculatorIcon,
  UploadCloudIcon,
  PaletteIcon,
  CalendarIcon,
  AtomIcon,
} from '../common/Icons';
import { RotateCcw, Sliders, X, Sparkles, UserCheck, Check } from 'lucide-react';

interface SidebarCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SectionDefinition {
  id: MainTabType;
  title: string;
  badge?: string;
  description: string;
  icon: React.ReactNode;
  recommendedFor: AcademicProfileId[];
}

export const SidebarCustomizerModal: React.FC<SidebarCustomizerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    user,
    academicProfile,
    getProfileSidebarTabs,
    setProfileSidebarTabs,
  } = useAuth();

  // Perfil que se está editando en el modal (por defecto el activo)
  const [editingProfileId, setEditingProfileId] = useState<AcademicProfileId>(academicProfile);

  // Lista de perfiles disponibles con su metadata
  const profilesMeta: { id: AcademicProfileId; label: string; badge: string; color: string }[] = [
    {
      id: 'santiago_fisica_ucv',
      label: 'Santiago Rivero',
      badge: 'Física UCV',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'prima_bachillerato_5',
      label: 'Sofía Rivero',
      badge: '5to Año / Admisión',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'andres_bachillerato_1',
      label: 'Andrés Rivero',
      badge: '1er Año Bachillerato',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'mafe_diseno_ucab',
      label: 'María Fernanda',
      badge: 'Diseño UCAB',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  // Definición completa de las 7 secciones del sistema
  const allSections: SectionDefinition[] = [
    {
      id: 'PRODUCTIVITY',
      title: 'Dashboard Ejecutivo',
      badge: 'Core',
      description: 'Panel de resumen, progreso académico diario, metas prioritarias y temporizador de estudio.',
      icon: <GridIcon className="w-5 h-5 text-slate-800" />,
      recommendedFor: ['santiago_fisica_ucv', 'prima_bachillerato_5', 'andres_bachillerato_1', 'mafe_diseno_ucab'],
    },
    {
      id: 'EXAMS',
      title: 'Simulador & Exámenes',
      badge: 'Simadi',
      description: 'Pruebas tipo prueba de admisión Simadi/OPSU, diagnósticos rápidos y entrenamiento bajo presión.',
      icon: <LayersIcon className="w-5 h-5 text-emerald-600" />,
      recommendedFor: ['santiago_fisica_ucv', 'prima_bachillerato_5', 'andres_bachillerato_1'],
    },
    {
      id: 'GUIDES',
      title: 'Guías & Deconstrucción',
      badge: 'KaTeX',
      description: 'Deconstrucción de temas complejos con IA, derivaciones paso a paso y fórmulas KaTeX sanitizadas.',
      icon: <BookOpenIcon className="w-5 h-5 text-indigo-600" />,
      recommendedFor: ['santiago_fisica_ucv', 'prima_bachillerato_5', 'andres_bachillerato_1', 'mafe_diseno_ucab'],
    },
    {
      id: 'PLANNER',
      title: 'Agenda & Cortes Académicos',
      badge: 'Ponderado',
      description: 'Calendario de evaluaciones, fechas límite, pesos porcentuales y simulador "Cuánto necesito para pasar".',
      icon: <CalendarIcon className="w-5 h-5 text-blue-600" />,
      recommendedFor: ['santiago_fisica_ucv', 'prima_bachillerato_5', 'andres_bachillerato_1'],
    },
    {
      id: 'STORAGE',
      title: 'Documentos & Vault',
      badge: 'Cloud',
      description: 'Almacenamiento y visor de PDFs de guías, fotos de pizarras y apuntes de clase en Supabase Storage.',
      icon: <UploadCloudIcon className="w-5 h-5 text-cyan-600" />,
      recommendedFor: ['santiago_fisica_ucv', 'andres_bachillerato_1', 'mafe_diseno_ucab'],
    },
    {
      id: 'CREATIVE_BOARD',
      title: 'Proyectos & Entregas Creativas',
      badge: 'Canva Hub',
      description: 'Tablero Kanban, mural visual de entregas tipo Pinterest y Canva Studio Hub para diseño gráfico.',
      icon: <PaletteIcon className="w-5 h-5 text-purple-600" />,
      recommendedFor: ['mafe_diseno_ucab'],
    },
    {
      id: 'TOOLS',
      title: 'Herramientas & Ajustes',
      badge: 'Suite Científica',
      description: 'Laboratorio de química, genética, sintaxis, horarios adaptativos, exportación Notion y telemetría.',
      icon: <CalculatorIcon className="w-5 h-5 text-amber-600" />,
      recommendedFor: ['santiago_fisica_ucv', 'prima_bachillerato_5', 'mafe_diseno_ucab'],
    },
    {
      id: 'UCV_COURSE',
      title: 'Curso Introductorio Ciencias UCV',
      badge: 'Oficial UCV',
      description: 'Programa oficial de 6 semanas: UA I (Método Científico), UA II (Lenguaje) y UA III (Lógico-Matemático).',
      icon: <AtomIcon className="w-5 h-5 text-blue-600" />,
      recommendedFor: ['santiago_fisica_ucv'],
    },
  ];

  if (!isOpen) return null;

  // Tabs actualmente activos para el perfil seleccionado en el modal
  const currentProfileTabs = getProfileSidebarTabs(editingProfileId);

  // El Curso Introductorio UCV solo está disponible para configurar en el perfil de Santiago
  const availableSections = allSections.filter((section) => {
    if (section.id === 'UCV_COURSE' && editingProfileId !== 'santiago_fisica_ucv') {
      return false;
    }
    return true;
  });

  const toggleSection = (sectionId: MainTabType) => {
    const isCurrentlyActive = currentProfileTabs.includes(sectionId);
    let updatedTabs: MainTabType[];

    if (isCurrentlyActive) {
      // No permitir desactivar todo: debe haber al menos 1 pestaña activa
      if (currentProfileTabs.length <= 1) return;
      updatedTabs = currentProfileTabs.filter((id) => id !== sectionId);
    } else {
      updatedTabs = [...currentProfileTabs, sectionId];
    }

    setProfileSidebarTabs(editingProfileId, updatedTabs);
  };

  const handleResetToDefaults = () => {
    const defaults = DEFAULT_PROFILE_SIDEBAR_TABS[editingProfileId] || [
      'PRODUCTIVITY',
      'GUIDES',
      'EXAMS',
      'PLANNER',
      'STORAGE',
      'TOOLS',
    ];
    setProfileSidebarTabs(editingProfileId, defaults);
  };

  const activeProfileMeta = profilesMeta.find((p) => p.id === editingProfileId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Encabezado */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-soft shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight font-sans">
                  Personalizar Barra Lateral
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Por Perfil
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Selecciona qué secciones estarán visibles en el menú de navegación para cada estudiante.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selector de Perfil a Configurar */}
        <div className="px-6 pt-4 pb-3 border-b border-slate-100 bg-white">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 font-mono">
            Configurando el perfil de:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {profilesMeta.map((p) => {
              const isSelected = editingProfileId === p.id;
              const isCurrentSession = user?.academic_profile === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setEditingProfileId(p.id)}
                  className={`p-2.5 rounded-2xl text-left border transition-all relative ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-soft-sm'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-white text-slate-700'
                  }`}
                >
                  {isCurrentSession && (
                    <span
                      className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${
                        isSelected ? 'bg-emerald-400' : 'bg-emerald-500'
                      }`}
                      title="Sesión activa"
                    />
                  )}
                  <div className="font-bold text-xs truncate leading-tight">{p.label}</div>
                  <div
                    className={`text-[10px] truncate mt-0.5 ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {p.badge}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Lista de Secciones Disponibles */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1 divide-y divide-slate-100/80">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-semibold text-slate-600">
              {currentProfileTabs.filter(id => id !== 'UCV_COURSE' || editingProfileId === 'santiago_fisica_ucv').length} de {availableSections.length} secciones visibles en la barra lateral
            </span>
            <button
              onClick={handleResetToDefaults}
              className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1.5 transition-colors"
              title="Restaurar la lista recomendada para este perfil académico"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer recomendadas</span>
            </button>
          </div>

          <div className="space-y-2.5 pt-2">
            {availableSections.map((section) => {
              const isChecked = currentProfileTabs.includes(section.id);
              const isRecommended = section.recommendedFor.includes(editingProfileId);

              return (
                <div
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={`flex items-start justify-between gap-4 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isChecked
                      ? 'border-slate-300 bg-white shadow-soft-xs hover:border-slate-400'
                      : 'border-slate-200/60 bg-slate-50/50 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                      {section.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 font-sans">
                          {section.title}
                        </span>
                        {section.badge && (
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-slate-100 text-slate-600 font-semibold">
                            {section.badge}
                          </span>
                        )}
                        {isRecommended && (
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-md flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Recomendado</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-lg">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  {/* Switch tipo Apple */}
                  <div className="shrink-0 pt-1">
                    <div
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                        isChecked ? 'bg-slate-900' : 'bg-slate-300'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out flex items-center justify-center ${
                          isChecked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      >
                        {isChecked && <Check className="w-2.5 h-2.5 text-slate-900" strokeWidth={3} />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>
              Los cambios para <strong>{activeProfileMeta?.label}</strong> se guardan automáticamente.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-soft transition-all active:scale-95"
          >
            Listo / Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};
