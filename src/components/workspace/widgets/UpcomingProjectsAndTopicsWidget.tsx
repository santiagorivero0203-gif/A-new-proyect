/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - PROYECTOS PRÓXIMOS & TEMAS CLAVE
 * ==============================================================================
 * Componente de Prioridad Máxima del Dashboard:
 * - Panel Izquierdo: Proyectos y entregas más cercanas ordenadas por fecha límite.
 * - Panel Derecho: Temas de estudio del proyecto seleccionado con acceso DIRECTO
 *   a sus Guías explicadas (KaTeX) y Exámenes de Prueba interactivos.
 * 
 * Reglas de diseño: Alto contraste, radios concéntricos, feedback háptico/visual inmediato.
 * ==============================================================================
 */

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import {
  Calendar,
  Clock,
  BookOpen,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import type { MainTabType } from '../../layout/Sidebar';
import type { ExamConfig, Question } from '../../../types/exam.types';
import { QUESTION_BANK } from '../../../lib/questionBank';

export interface ProjectTopic {
  id: string;
  title: string;
  summary: string;
  guideTab?: MainTabType;
  examSubject?: string;
  examQuestions?: Question[];
}

export interface UpcomingProject {
  id: string;
  title: string;
  subject: string;
  deadlineText: string;
  daysRemaining: number;
  urgency: 'HIGH' | 'MEDIUM' | 'NORMAL';
  progressPercentage: number;
  topics: ProjectTopic[];
}

interface UpcomingProjectsAndTopicsWidgetProps {
  onNavigateToTab?: (tab: MainTabType) => void;
  onLaunchExam?: (config: ExamConfig) => void;
  onStartExamWithQuestions?: (questions: Question[], title: string) => void;
}

export const UpcomingProjectsAndTopicsWidget: React.FC<UpcomingProjectsAndTopicsWidgetProps> = ({
  onNavigateToTab,
  onLaunchExam,
  onStartExamWithQuestions,
}) => {
  const { user } = useAuth();
  const profileId = user?.academic_profile || 'mafe_diseno_ucab';

  // Proyectos adaptados al perfil académico activo
  const getProjectsForProfile = (): UpcomingProject[] => {
    if (profileId === 'mafe_diseno_ucab') {
      return [
        {
          id: 'proj-mafe-01',
          title: 'Entrega 1: Manual de Identidad & Branding Corporativo',
          subject: 'Taller de Diseño Integral V',
          deadlineText: 'Viernes, 24 de Octubre',
          daysRemaining: 3,
          urgency: 'HIGH',
          progressPercentage: 65,
          topics: [
            {
              id: 'top-mafe-01',
              title: 'Teoría del Color, Espacios HSL & Armonías Cromáticas',
              summary: 'Rueda cromática, curvas de luminancia perceptual y contraste WCAG 2.1 AAA para UI.',
              guideTab: 'DESIGN_PALETTE',
              examSubject: 'Diseño',
            },
            {
              id: 'top-mafe-02',
              title: 'Tipografía Editorial, Retículas & Jerarquía Visual',
              summary: 'Escalas armónicas matemáticas (1.25, 1.333), kerning y legibilidad en soportes editoriales.',
              guideTab: 'GUIDES',
              examSubject: 'Diseño',
            },
            {
              id: 'top-mafe-03',
              title: 'Ergonomía Visual & Accesibilidad Universal',
              summary: 'Diseño inclusivo, reducción de carga cognitiva y lineamientos de interacción humana.',
              guideTab: 'CREATIVE_BOARD',
              examSubject: 'Diseño',
            },
          ],
        },
        {
          id: 'proj-mafe-02',
          title: 'Entrega 2: Sistema de Empaques y Ergonomía Tridimensional',
          subject: 'Ergonomía & Prototipado',
          deadlineText: 'Jueves, 30 de Octubre',
          daysRemaining: 9,
          urgency: 'MEDIUM',
          progressPercentage: 30,
          topics: [
            {
              id: 'top-mafe-04',
              title: 'Antropometría & Proporciones Funcionales',
              summary: 'Dimensionamiento estándar para interacción física de productos y cajas de empaque.',
              guideTab: 'CREATIVE_BOARD',
              examSubject: 'Diseño',
            },
            {
              id: 'top-mafe-05',
              title: 'Semántica del Producto & Materiales Sustentables',
              summary: 'Leyes de percepción Gestalt aplicadas a envases ecológicos y señalética.',
              guideTab: 'GUIDES',
              examSubject: 'Diseño',
            },
          ],
        },
      ];
    }

    if (profileId === 'santiago_fisica_ucv') {
      return [
        {
          id: 'proj-sant-01',
          title: 'Segundo Examen Parcial: Dinámica, Fuerzas & Leyes de Newton',
          subject: 'Física I (Facultad de Ciencias UCV)',
          deadlineText: 'Sábado, 24 de Octubre',
          daysRemaining: 3,
          urgency: 'HIGH',
          progressPercentage: 70,
          topics: [
            {
              id: 'top-sant-01',
              title: 'Leyes de Newton, Diagramas de Cuerpo Libre & Rozamiento',
              summary: 'Ecuaciones fundamentales ΣF = ma, coeficientes de roce estático/cinético y planos inclinados.',
              guideTab: 'GUIDES',
              examSubject: 'Física',
            },
            {
              id: 'top-sant-02',
              title: 'Trabajo, Potencia Mecánica & Teorema del Trabajo-Energía',
              summary: 'Cálculo de W = ∫F·dr, energía cinética y conservación de la energía mecánica en campos conservativos.',
              guideTab: 'GUIDES',
              examSubject: 'Física',
            },
            {
              id: 'top-sant-03',
              title: 'Álgebra Vectorial 2D/3D & Producto Escalar / Vectorial',
              summary: 'Vectores unitarios i,j,k, proyecciones ortogonales y producto cruz con determinantes 3x3.',
              guideTab: 'MATH_LAB',
              examSubject: 'Matemática',
            },
          ],
        },
        {
          id: 'proj-sant-02',
          title: 'Evaluación Formativa UA III: Recta Real & Lógica Proposicional',
          subject: 'Curso Introductorio Ciencias UCV',
          deadlineText: 'Martes, 27 de Octubre',
          daysRemaining: 6,
          urgency: 'MEDIUM',
          progressPercentage: 85,
          topics: [
            {
              id: 'top-sant-04',
              title: 'Intervalos en la Recta Real & Valor Absoluto',
              summary: 'Desigualdades lineales y cuadráticas, cotas superiores y vecindades.',
              guideTab: 'UCV_COURSE',
              examSubject: 'Matemática',
            },
            {
              id: 'top-sant-05',
              title: 'Operaciones de Conjuntos & Diagramas de Venn',
              summary: 'Unión, intersección, diferencia simétrica y tablas de verdad lógicas.',
              guideTab: 'UCV_COURSE',
              examSubject: 'Matemática',
            },
          ],
        },
      ];
    }

    // Perfiles de Bachillerato (Andrés y Sofía)
    return [
      {
        id: 'proj-bach-01',
        title: profileId === 'prima_bachillerato_5'
          ? 'Simulacro Diagnóstico OPSU / Simadi: Razonamiento Integral'
          : 'Evaluación Parcial: Ecuaciones de 1er Grado & Fracciones',
        subject: profileId === 'prima_bachillerato_5' ? 'Admisión Universitaria' : 'Matemática 1er Año',
        deadlineText: 'Viernes, 24 de Octubre',
        daysRemaining: 3,
        urgency: 'HIGH',
        progressPercentage: 60,
        topics: [
          {
            id: 'top-bach-01',
            title: profileId === 'prima_bachillerato_5'
              ? 'Comprensión Lectora Crítica & Analogías Verbales'
              : 'Resolución Paso a Paso de Ecuaciones Lineales',
            summary: 'Técnicas de descarte rápido, contexto oracional y comprobación de resultados.',
            guideTab: 'HUMANITIES_LAB',
            examSubject: 'Castellano',
          },
          {
            id: 'top-bach-02',
            title: profileId === 'prima_bachillerato_5'
              ? 'Razonamiento Numérico, Porcentajes & Regla de Tres'
              : 'Operaciones con Fracciones & Mínimo Común Múltiplo',
            summary: 'Algoritmos directos sin calculadora y problemas de proporcionalidad inversa.',
            guideTab: 'MATH_LAB',
            examSubject: 'Matemática',
          },
          {
            id: 'top-bach-03',
            title: profileId === 'prima_bachillerato_5'
              ? 'Química: Estequiometría, Mol & Molaridad de Disoluciones'
              : 'Ciencias Naturales: La Célula & Reinos Biológicos',
            summary: 'Balanceo de masa molecular y relaciones estequiométricas fundamentales.',
            guideTab: 'SCIENCE_LAB',
            examSubject: 'Química',
          },
        ],
      },
      {
        id: 'proj-bach-02',
        title: 'Taller de Síntesis: Análisis Sintáctico de Oraciones',
        subject: 'Castellano & Literatura',
        deadlineText: 'Miércoles, 28 de Octubre',
        daysRemaining: 7,
        urgency: 'MEDIUM',
        progressPercentage: 45,
        topics: [
          {
            id: 'top-bach-04',
            title: 'Sujeto, Predicado & Sintagmas Nominales / Verbales',
            summary: 'Identificación de núcleos, complementos directos, indirectos y circunstanciales.',
            guideTab: 'HUMANITIES_LAB',
            examSubject: 'Castellano',
          },
        ],
      },
    ];
  };

  const projects = getProjectsForProfile();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Lanzar examen de prueba enfocado en el tema
  const handleLaunchPracticeExam = (topic: ProjectTopic) => {
    // Buscar preguntas reales que coincidan con el tema o materia
    const matchingQuestions = QUESTION_BANK.filter((q) => {
      const matchSubject = topic.examSubject ? q.subject.toLowerCase() === topic.examSubject.toLowerCase() : true;
      const matchTopic = q.topic.toLowerCase().includes(topic.title.toLowerCase()) || topic.title.toLowerCase().includes(q.topic.toLowerCase());
      return matchSubject || matchTopic;
    });

    const questionsToUse = matchingQuestions.length >= 3 ? matchingQuestions.slice(0, 5) : QUESTION_BANK.slice(0, 5);

    if (onStartExamWithQuestions) {
      onStartExamWithQuestions(questionsToUse, `Práctica: ${topic.title}`);
    } else if (onLaunchExam) {
      onLaunchExam({
        mode: 'QUICK_PRACTICE',
        title: `Práctica Rápida: ${topic.title}`,
        totalQuestions: 5,
        timeLimitSeconds: 15 * 60,
        allowPause: true,
        shuffleQuestions: true,
      });
    } else if (onNavigateToTab) {
      onNavigateToTab('EXAMS');
    }
  };

  // Ver guía de estudio correspondiente
  const handleViewGuide = (topic: ProjectTopic) => {
    if (onNavigateToTab) {
      onNavigateToTab(topic.guideTab || 'GUIDES');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* =========================================================================
          PANEL IZQUIERDO: PROYECTOS MÁS CERCANOS (5 columnas en lg)
          ========================================================================= */}
      <div className="lg:col-span-5 app-card p-6 bg-white border border-slate-200/80 shadow-soft space-y-4">
        {/* Encabezado del Panel Izquierdo */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Proyectos & Entregas Cercanas
              </h3>
              <p className="text-[11px] text-slate-500">
                Selecciona un proyecto para ver sus temas de estudio
              </p>
            </div>
          </div>
          <span className="app-badge font-mono text-[10px] font-bold">
            {projects.length} activos
          </span>
        </div>

        {/* Lista de Proyectos Priorizados */}
        <div className="space-y-3">
          {projects.map((proj) => {
            const isSelected = proj.id === activeProject.id;
            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative group ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/20 shadow-soft-sm ring-1 ring-brand-500'
                    : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-bold text-brand-600 font-sans tracking-tight">
                    {proj.subject}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                      proj.urgency === 'HIGH'
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>Faltan {proj.daysRemaining} días</span>
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-snug font-sans group-hover:text-brand-600 transition-colors">
                  {proj.title}
                </h4>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{proj.deadlineText}</span>
                  </div>
                  <span className="font-mono text-slate-700 font-bold">
                    {proj.progressPercentage}%
                  </span>
                </div>

                {/* Barra de progreso sutil y elegante */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-all duration-300"
                    style={{ width: `${proj.progressPercentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Acceso a Agenda Completa */}
        <button
          onClick={() => onNavigateToTab?.('PLANNER')}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-bold text-slate-700 transition-all flex items-center justify-center gap-1.5"
        >
          <span>Ver Calendario & Horario Completo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* =========================================================================
          PANEL DERECHO: TEMAS DEL PROYECTO + GUÍAS & EXÁMENES (7 columnas en lg)
          ========================================================================= */}
      <div className="lg:col-span-7 app-card p-6 bg-white border border-slate-200/80 shadow-soft space-y-4">
        {/* Encabezado del Panel Derecho */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="app-badge text-[10px] font-mono font-bold">
                Temas de Estudio Asignados
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                {activeProject.subject}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              {activeProject.title}
            </h3>
          </div>

          <span className="text-[11px] text-slate-400 font-medium">
            {activeProject.topics.length} temas clave
          </span>
        </div>

        {/* Lista de Temas con Acciones Directas a Guías y Exámenes */}
        <div className="space-y-3">
          {activeProject.topics.map((topic, index) => (
            <div
              key={topic.id}
              className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-soft-sm transition-all space-y-2.5 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {topic.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed pl-7">
                    {topic.summary}
                  </p>
                </div>
              </div>

              {/* Botones de Acción Inmediata: Ver Guía & Hacer Examen de Prueba */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60 pl-7">
                {/* Botón 1: Ver Guía de Estudio */}
                <button
                  type="button"
                  onClick={() => handleViewGuide(topic)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all shadow-soft-xs flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  title="Abrir la guía académica con derivaciones KaTeX y teoría explicada"
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Ver Guía</span>
                </button>

                {/* Botón 2: Hacer Examen de Prueba */}
                <button
                  type="button"
                  onClick={() => handleLaunchPracticeExam(topic)}
                  className="px-3 py-1.5 rounded-xl btn-brand text-white text-xs font-bold transition-all shadow-soft-xs flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  title="Iniciar un simulacro de prueba cronometrado con preguntas de este tema"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Examen de Prueba</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Simulacro Completo del Proyecto */}
        <div className="p-3.5 rounded-2xl bg-brand-50/50 border border-brand-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-xs font-bold text-slate-900 block font-sans">
              ¿Listo para medir tu preparación integral?
            </span>
            <span className="text-[11px] text-slate-500">
              Prueba de 10 preguntas que integra todos los temas de esta entrega.
            </span>
          </div>

          <button
            onClick={() => {
              if (onLaunchExam) {
                onLaunchExam({
                  mode: 'QUICK_PRACTICE',
                  title: `Evaluación Integral: ${activeProject.title}`,
                  totalQuestions: 10,
                  timeLimitSeconds: 25 * 60,
                  allowPause: true,
                  shuffleQuestions: true,
                });
              } else if (onNavigateToTab) {
                onNavigateToTab('EXAMS');
              }
            }}
            className="btn-brand text-xs py-2 px-4 rounded-xl flex items-center gap-2 shrink-0 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulacro Completo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
