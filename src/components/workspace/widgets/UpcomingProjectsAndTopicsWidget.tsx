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
import type { ExamConfig, Question, AcademicSubject } from '../../../types/exam.types';
import { QUESTION_BANK } from '../../../lib/questionBank';
import { ALL_MAFE_QUESTIONS } from '../../../data/mafe_curriculum_hub';
import { ALL_ANDRES_QUESTIONS } from '../../../data/andres_curriculum_hub';
import { getSimulatorQuestionsForGuide } from '../../../data/andres';
import { UCV_EXAM_BANK } from '../../../data/ucv_intro_course_data';

export interface ProjectTopic {
  id: string;
  title: string;
  summary: string;
  guideTab?: MainTabType;
  guideId?: string;
  examSubject?: AcademicSubject;
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
              guideTab: 'GUIDES',
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
              guideTab: 'GUIDES',
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
              guideTab: 'GUIDES',
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
              guideTab: 'GUIDES',
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
              guideTab: 'GUIDES',
              examSubject: 'Matemática',
            },
            {
              id: 'top-sant-05',
              title: 'Operaciones de Conjuntos & Diagramas de Venn',
              summary: 'Unión, intersección, diferencia simétrica y tablas de verdad lógicas.',
              guideTab: 'GUIDES',
              examSubject: 'Matemática',
            },
          ],
        },
      ];
    }

    // Perfil Andrés (1er Año de Bachillerato · Colegio Católico Carisma Consolación)
    if (profileId === 'andres_bachillerato_1') {
      return [
        {
          id: 'proj-andres-01',
          title: 'Laboratorio Escolar: Instrumentos de Medición, Materia & Bioseguridad',
          subject: 'Biología y Ciencias Naturales (1er Año)',
          deadlineText: 'Jueves, 05 de Noviembre',
          daysRemaining: 4,
          urgency: 'HIGH',
          progressPercentage: 75,
          topics: [
            {
              id: 'top-andres-01',
              title: 'Método Científico, Instrumentos de Vidrio & Microscopio Óptico',
              summary: 'Etapas del método científico, variables experimental/control y cálculo del aumento total del microscopio.',
              guideTab: 'GUIDES',
              guideId: 'andres-bio-lab-method',
              examSubject: 'Biología',
              examQuestions: getSimulatorQuestionsForGuide('andres-bio-lab-method'),
            },
            {
              id: 'top-andres-02',
              title: 'Bioseguridad, Menisco, Estados de la Materia & Biomecánica',
              summary: 'Lectura del menisco, principio de Arquímedes, cambios de fase y palancas del cuerpo humano.',
              guideTab: 'GUIDES',
              guideId: 'andres-bio-safety-matter',
              examSubject: 'Biología',
              examQuestions: getSimulatorQuestionsForGuide('andres-bio-safety-matter'),
            },
          ],
        },
        {
          id: 'proj-andres-02',
          title: 'Taller en Parejas: Máquinas Simples, Magnitudes SI & Circuitos LED',
          subject: 'Física 1er Año (Prof. Antonio Gonzales)',
          deadlineText: 'Viernes, 06 de Noviembre',
          daysRemaining: 5,
          urgency: 'HIGH',
          progressPercentage: 65,
          topics: [
            {
              id: 'top-andres-03',
              title: 'Unidades del Sistema Internacional (SI), Conversión & Circuitos LED',
              summary: 'Longitud en metros, masa en kg, tiempo en segundos (1 h = 3600 s) y circuito eléctrico serie/paralelo.',
              guideTab: 'GUIDES',
              guideId: 'andres-phys-units-circuits',
              examSubject: 'Física',
              examQuestions: getSimulatorQuestionsForGuide('andres-phys-units-circuits'),
            },
            {
              id: 'top-andres-04',
              title: 'Máquinas Simples: Ley de la Palanca (1er, 2do y 3er Género) & Poleas',
              summary: 'Equilibrio rotacional P · dp = R · dr, ventaja mecánica en balancines, carretillas y poleas.',
              guideTab: 'GUIDES',
              guideId: 'andres-phys-machines-units',
              examSubject: 'Física',
              examQuestions: getSimulatorQuestionsForGuide('andres-phys-machines-units'),
            },
          ],
        },
        {
          id: 'proj-andres-03',
          title: 'Evaluaciones de Matemática: Enteros ℤ, Potenciación & Geometría',
          subject: 'Matemática 1er Año',
          deadlineText: 'Lunes, 09 de Noviembre',
          daysRemaining: 8,
          urgency: 'MEDIUM',
          progressPercentage: 55,
          topics: [
            {
              id: 'top-andres-05',
              title: 'Números Enteros (ℤ), Ley de Signos & Ecuaciones en ℤ',
              summary: 'Recta numérica, valor absoluto, jerarquía PEMDAS y ecuaciones de primer grado con comprobación.',
              guideTab: 'GUIDES',
              guideId: 'andres-math-z-equations',
              examSubject: 'Matemática',
              examQuestions: getSimulatorQuestionsForGuide('andres-math-z-equations'),
            },
            {
              id: 'top-andres-06',
              title: 'Potenciación en ℤ, Divisibilidad, m.c.m. & M.C.D.',
              summary: 'Leyes de exponentes, signo de base negativa, descomposición prima, coincidencia de tiempos y reparto.',
              guideTab: 'GUIDES',
              guideId: 'andres-math-powers-factors',
              examSubject: 'Matemática',
              examQuestions: getSimulatorQuestionsForGuide('andres-math-powers-factors'),
            },
            {
              id: 'top-andres-06b',
              title: 'Geometría Plana: Polígonos, Perímetros, Áreas & Círculo',
              summary: 'Ángulos complementarios/suplementarios, triángulos, rombo, trapecio y circunferencia.',
              guideTab: 'GUIDES',
              guideId: 'andres-math-geometry-perimeters',
              examSubject: 'Matemática',
              examQuestions: getSimulatorQuestionsForGuide('andres-math-geometry-perimeters'),
            },
          ],
        },
        {
          id: 'proj-andres-04',
          title: 'Castellano & Pastoral: Cuento "Barrabás", Sintaxis & Consolación',
          subject: 'Castellano y Educación en la Fe (1er Año)',
          deadlineText: 'Viernes, 27 de Noviembre',
          daysRemaining: 26,
          urgency: 'NORMAL',
          progressPercentage: 40,
          topics: [
            {
              id: 'top-andres-07',
              title: 'Análisis Literario de "Barrabás" (Uslar Pietri) & Figuras Literarias',
              summary: 'Argumento, personajes, símil, metáfora, humanización, redacción de biografía y CV estudiantil.',
              guideTab: 'GUIDES',
              guideId: 'andres-cas-barrabas-grammar',
              examSubject: 'Castellano',
              examQuestions: getSimulatorQuestionsForGuide('andres-cas-barrabas-grammar'),
            },
            {
              id: 'top-andres-08',
              title: 'Sintaxis de la Oración Bimembre, Acentuación SEGA & Hiatos',
              summary: 'Sujeto, predicado, OD, OI, circunstanciales, agudas/graves/esdrújulas y tilde diacrítica.',
              guideTab: 'GUIDES',
              guideId: 'andres-cas-syntax-accents',
              examSubject: 'Castellano',
              examQuestions: getSimulatorQuestionsForGuide('andres-cas-syntax-accents'),
            },
            {
              id: 'top-andres-09',
              title: 'Educación en la Fe: DOMUND, Santa María Rosa Molas & Valores',
              summary: 'Carisma de la Consolación, Diario de Gratitud y convivencia escolar solidaria.',
              guideTab: 'GUIDES',
              guideId: 'andres-fe-consolacion-values',
              examSubject: 'Castellano',
              examQuestions: getSimulatorQuestionsForGuide('andres-fe-consolacion-values'),
            },
          ],
        },
        {
          id: 'proj-andres-05',
          title: 'Laboratorio Digital: Teoría del Color, Hardware, Word & Excel',
          subject: 'Diseño Digital e Informática Práctica (1er Año)',
          deadlineText: 'Miércoles, 02 de Diciembre',
          daysRemaining: 31,
          urgency: 'NORMAL',
          progressPercentage: 45,
          topics: [
            {
              id: 'top-andres-10',
              title: 'Diseño Digital: Elementos Visuales, Círculo Cromático & Vectores',
              summary: 'Punto, línea, plano, armonías cromáticas, RGB vs CMYK, retícula y gráficos vectoriales SVG.',
              guideTab: 'GUIDES',
              guideId: 'andres-design-color-grid',
              examSubject: 'Diseño',
              examQuestions: getSimulatorQuestionsForGuide('andres-design-color-grid'),
            },
            {
              id: 'top-andres-11',
              title: 'Informática Práctica: Hardware/Software, Archivos, Word & Excel',
              summary: 'Evolución del computador, CPU/RAM/SSD, árbol de carpetas y fórmulas =SUMA y =PROMEDIO.',
              guideTab: 'GUIDES',
              guideId: 'andres-inf-computing-office',
              examSubject: 'Diseño',
              examQuestions: getSimulatorQuestionsForGuide('andres-inf-computing-office'),
            },
          ],
        },
      ];
    }

    // Perfil Sofía (5to de Bachillerato / Admisión OPSU) y fallback general
    return [
      {
        id: 'proj-bach-01',
        title: 'Simulacro Diagnóstico OPSU / Simadi: Razonamiento Integral',
        subject: 'Admisión Universitaria',
        deadlineText: 'Viernes, 24 de Octubre',
        daysRemaining: 3,
        urgency: 'HIGH',
        progressPercentage: 60,
        topics: [
          {
            id: 'top-bach-01',
            title: 'Comprensión Lectora Crítica & Analogías Verbales',
            summary: 'Técnicas de descarte rápido, contexto oracional y comprobación de resultados.',
            guideTab: 'GUIDES',
            examSubject: 'Castellano',
          },
          {
            id: 'top-bach-02',
            title: 'Razonamiento Numérico, Porcentajes & Regla de Tres',
            summary: 'Algoritmos directos sin calculadora y problemas de proporcionalidad inversa.',
            guideTab: 'GUIDES',
            examSubject: 'Matemática',
          },
        ],
      },
    ];
  };

  const projects = getProjectsForProfile();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Banco de preguntas calibrado según el perfil académico activo
  const getProfileQuestions = (): Question[] => {
    if (profileId === 'mafe_diseno_ucab') {
      return ALL_MAFE_QUESTIONS;
    }
    if (profileId === 'santiago_fisica_ucv') {
      return UCV_EXAM_BANK;
    }
    if (profileId === 'andres_bachillerato_1') {
      return ALL_ANDRES_QUESTIONS;
    }
    if (profileId === 'prima_bachillerato_5') {
      return QUESTION_BANK.filter((q) => q.targetProfiles.includes('prima_bachillerato_5'));
    }
    return QUESTION_BANK;
  };

  // Lanzar examen de prueba enfocado estrictamente en el tema y perfil
  const handleLaunchPracticeExam = (topic: ProjectTopic) => {
    if (topic.examQuestions && topic.examQuestions.length > 0) {
      if (onStartExamWithQuestions) {
        onStartExamWithQuestions(topic.examQuestions, `Examen: ${topic.title}`);
      } else if (onLaunchExam) {
        onLaunchExam({
          mode: profileId === 'andres_bachillerato_1' ? 'HIGH_SCHOOL_EXAM' : 'UNIVERSITY_EXAM',
          title: `Examen: ${topic.title}`,
          totalQuestions: topic.examQuestions.length,
          timeLimitSeconds: Math.max(30, topic.examQuestions.length * 2) * 60,
          allowPause: true,
          shuffleQuestions: true,
          customQuestions: topic.examQuestions,
          subject: topic.examSubject,
        });
      }
      return;
    }

    const profileBank = getProfileQuestions();

    // Buscar en el banco del estudiante preguntas que coincidan con la materia o palabras clave del tema
    const searchTokens = topic.title
      .toLowerCase()
      .split(/[\s,·\-_/]+/)
      .filter((t) => t.length > 3);

    const matchingQuestions = profileBank.filter((q) => {
      const matchSubject = topic.examSubject
        ? q.subject.toLowerCase() === topic.examSubject.toLowerCase()
        : true;
      const qText = `${q.topic} ${q.questionText}`.toLowerCase();
      const matchKeyword = searchTokens.some((tok) => qText.includes(tok));
      return matchSubject && matchKeyword;
    });

    const questionsToUse =
      matchingQuestions.length >= 3
        ? matchingQuestions.slice(0, 10)
        : profileBank.slice(0, 10);

    if (onStartExamWithQuestions) {
      onStartExamWithQuestions(questionsToUse, `Práctica: ${topic.title}`);
    } else if (onLaunchExam) {
      onLaunchExam({
        mode: profileId === 'andres_bachillerato_1' ? 'HIGH_SCHOOL_EXAM' : 'UNIVERSITY_EXAM',
        title: `Práctica: ${topic.title}`,
        totalQuestions: questionsToUse.length,
        timeLimitSeconds: 20 * 60,
        allowPause: true,
        shuffleQuestions: true,
        customQuestions: questionsToUse,
        subject: topic.examSubject,
      });
    } else if (onNavigateToTab) {
      onNavigateToTab('EXAMS');
    }
  };

  // Ver guía de estudio correspondiente en la vista oficial de guías
  const handleViewGuide = (topic: ProjectTopic) => {
    if (topic.guideId) {
      sessionStorage.setItem('cpe_auto_open_guide_id', topic.guideId);
    }
    if (onNavigateToTab) {
      onNavigateToTab('GUIDES');
    }
  };

  // Banco combinado de preguntas del proyecto activo (para Simulacro Completo)
  const activeProjectCombinedQuestions = (() => {
    const dedicated = activeProject?.topics.flatMap((t) => t.examQuestions || []) || [];
    if (dedicated.length > 0) {
      const seen = new Set<string>();
      return dedicated.filter((q) => {
        if (seen.has(q.id)) return false;
        seen.add(q.id);
        return true;
      });
    }
    const profileBank = getProfileQuestions();
    return profileBank.slice(0, Math.min(12, profileBank.length));
  })();

  // Lanzar simulacro integral del proyecto con reactivos reales del estudiante
  const handleLaunchFullMockExam = () => {
    const questionsToUse =
      activeProjectCombinedQuestions.length > 36
        ? activeProjectCombinedQuestions.slice(0, 36)
        : activeProjectCombinedQuestions;
    const count = questionsToUse.length;

    if (onStartExamWithQuestions) {
      onStartExamWithQuestions(
        questionsToUse,
        `Simulacro Completo: ${activeProject.title}`
      );
    } else if (onLaunchExam) {
      onLaunchExam({
        mode: profileId === 'andres_bachillerato_1' ? 'HIGH_SCHOOL_EXAM' : 'UNIVERSITY_EXAM',
        title: `Simulacro Completo: ${activeProject.title}`,
        totalQuestions: count,
        timeLimitSeconds: Math.max(30, count * 2) * 60,
        allowPause: true,
        shuffleQuestions: true,
        customQuestions: questionsToUse,
        subject:
          profileId === 'mafe_diseno_ucab'
            ? 'Diseño'
            : profileId === 'santiago_fisica_ucv'
            ? 'Física'
            : profileId === 'andres_bachillerato_1'
            ? 'Matemática'
            : 'Castellano',
      });
    } else if (onNavigateToTab) {
      onNavigateToTab('EXAMS');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* =========================================================================
          PANEL IZQUIERDO: PROYECTOS MÁS CERCANOS (5 columnas en lg)
          ========================================================================= */}
      <div className="lg:col-span-5 app-card p-4 sm:p-6 bg-white border border-slate-200/80 shadow-soft space-y-4">
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

        {/* Lista de Proyectos con Contorno y Sombra Difusa (Sin barras duras) */}
        <div className="space-y-3">
          {projects.map((proj) => {
            const isSelected = proj.id === activeProject.id;
            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative group ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/25 ring-2 ring-brand-500/30 shadow-[0_6px_24px_-4px_rgba(15,82,186,0.18)]'
                    : proj.urgency === 'HIGH'
                    ? 'border-rose-200/90 bg-white hover:border-rose-300 shadow-[0_2px_14px_-2px_rgba(244,63,94,0.10)] hover:shadow-soft-md'
                    : 'border-slate-200/80 bg-white hover:border-slate-300 shadow-soft-xs hover:shadow-soft-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-brand-600 font-sans tracking-tight">
                    {proj.subject}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {proj.progressPercentage}% listo
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                        proj.urgency === 'HIGH'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>{proj.daysRemaining}d</span>
                    </span>
                  </div>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug font-sans group-hover:text-brand-600 transition-colors">
                  {proj.title}
                </h4>

                <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{proj.deadlineText}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-brand-600 group-hover:underline">
                    {isSelected ? 'Seleccionado' : 'Ver temas →'}
                  </span>
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
      <div className="lg:col-span-7 app-card p-4 sm:p-6 bg-white border border-slate-200/80 shadow-soft space-y-4">
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
              className="p-4 rounded-2xl bg-slate-50/60 border border-slate-200/80 hover:bg-white hover:border-brand-300 hover:shadow-[0_4px_18px_-4px_rgba(15,82,186,0.12)] transition-all space-y-2.5 group active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {topic.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed pl-7">
                    {topic.summary}
                  </p>
                </div>
              </div>

              {/* Botones de Acción Inmediata: Ver Guía & Hacer Examen de Prueba */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-end gap-2 pt-2 border-t border-slate-200/60 pl-0 sm:pl-7">
                {/* Botón 1: Ver Guía de Estudio */}
                <button
                  type="button"
                  onClick={() => handleViewGuide(topic)}
                  className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all shadow-soft-xs flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  title="Abrir la guía académica con derivaciones KaTeX y teoría explicada"
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Ver Guía</span>
                </button>

                {/* Botón 2: Hacer Examen de Prueba */}
                <button
                  type="button"
                  onClick={() => handleLaunchPracticeExam(topic)}
                  className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl btn-brand text-white text-xs font-bold transition-all shadow-soft-xs flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  title="Iniciar un simulacro de prueba cronometrado con preguntas de este tema"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>
                    {topic.examQuestions && topic.examQuestions.length > 0
                      ? `Examen (${topic.examQuestions.length} Preguntas)`
                      : 'Examen de Prueba'}
                  </span>
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
              Prueba de {Math.min(36, activeProjectCombinedQuestions.length)} preguntas que integra todos los temas de esta entrega.
            </span>
          </div>

          <button
            onClick={handleLaunchFullMockExam}
            className="btn-brand text-xs py-2 px-4 rounded-xl flex items-center gap-2 shrink-0 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulacro Completo ({Math.min(36, activeProjectCombinedQuestions.length)})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
