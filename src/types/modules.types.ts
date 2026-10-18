/**
 * Arquitectura de Modularidad Universal
 * Sistema de Widgets y Módulos Desacoplados para el Centro de Productividad Estudiantil
 */

export type WorkspaceModuleId =
  | 'tasks'
  | 'pomodoro'
  | 'gemini_assistant'
  | 'quick_exam'
  | 'calculator'
  | 'kanban'
  | 'guides_quick'
  | 'latex_lab';

export type ModuleCategory =
  | 'productivity'
  | 'academic'
  | 'exams'
  | 'ai'
  | 'tools';

export interface WorkspaceModuleConfig {
  id: WorkspaceModuleId;
  name: string;
  shortDescription: string;
  category: ModuleCategory;
  defaultEnabled: boolean;
  gridSpan: {
    desktop: 12 | 8 | 7 | 6 | 5 | 4;
    tablet?: 12 | 6;
  };
  badge?: string;
  accentColor: string;
}

export type WorkspacePresetId =
  | 'balanced'
  | 'simadi'
  | 'scientific'
  | 'creative'
  | 'minimal'
  | 'all';

export interface WorkspacePreset {
  id: WorkspacePresetId;
  name: string;
  tagline: string;
  description: string;
  modules: WorkspaceModuleId[];
  icon: string;
  badge?: string;
}

export const WORKSPACE_MODULES_CATALOG: WorkspaceModuleConfig[] = [
  {
    id: 'tasks',
    name: 'Gestor de Tareas & Metas',
    shortDescription: 'Planificación diaria, prioridades de estudio y recompensas gamificadas.',
    category: 'productivity',
    defaultEnabled: true,
    gridSpan: { desktop: 7 },
    badge: 'Productividad',
    accentColor: '#0F52BA',
  },
  {
    id: 'pomodoro',
    name: 'Temporizador Pomodoro',
    shortDescription: 'Bloques de enfoque de 25m y 50m con descansos y sonido de campana.',
    category: 'productivity',
    defaultEnabled: true,
    gridSpan: { desktop: 5 },
    badge: 'Enfoque',
    accentColor: '#0F52BA',
  },
  {
    id: 'gemini_assistant',
    name: 'Análisis de Estudio con IA',
    shortDescription: 'Sube tus archivos o apuntes y saca provecho con guías y preguntas de prueba.',
    category: 'ai',
    defaultEnabled: true,
    gridSpan: { desktop: 12 },
    badge: 'Inteligencia Artificial',
    accentColor: '#0F52BA',
  },
  {
    id: 'quick_exam',
    name: 'Evaluaciones & Prácticas',
    shortDescription: 'Entrenamiento cronometrado con modelos de examen de carrera y bachillerato.',
    category: 'exams',
    defaultEnabled: true,
    gridSpan: { desktop: 6 },
    badge: 'Evaluación',
    accentColor: '#0F52BA',
  },
  {
    id: 'calculator',
    name: 'Calculadora Científica',
    shortDescription: 'Cálculos trigonométricos, algebraicos y potencias de alta precisión.',
    category: 'tools',
    defaultEnabled: false,
    gridSpan: { desktop: 6 },
    badge: 'Científica',
    accentColor: '#0F52BA',
  },
  {
    id: 'kanban',
    name: 'Tablero Visual de Proyectos',
    shortDescription: 'Gestión por etapas (Brief, Moodboard, En Curso, Final) para entregas y asignaciones.',
    category: 'academic',
    defaultEnabled: false,
    gridSpan: { desktop: 12 },
    badge: 'Proyectos',
    accentColor: '#0F52BA',
  },
  {
    id: 'guides_quick',
    name: 'Acceso Rápido a Guías',
    shortDescription: 'Temarios de 5 materias (Matemática, Física, Química, Biología, Castellano).',
    category: 'academic',
    defaultEnabled: false,
    gridSpan: { desktop: 6 },
    badge: 'Guías',
    accentColor: '#0F52BA',
  },
  {
    id: 'latex_lab',
    name: 'Laboratorio de Vectores & KaTeX',
    shortDescription: 'Visualizador de planos vectoriales y playground interactivo de fórmulas LaTeX.',
    category: 'tools',
    defaultEnabled: false,
    gridSpan: { desktop: 6 },
    badge: 'KaTeX & Gráficas',
    accentColor: '#0F52BA',
  },
];

export const WORKSPACE_PRESETS: WorkspacePreset[] = [
  {
    id: 'balanced',
    name: 'Equilibrado Integral',
    tagline: 'Lo esencial para el día a día',
    description: 'Gestor de tareas, temporizador Pomodoro, Asistente Gemini y simulador rápido.',
    modules: ['tasks', 'pomodoro', 'gemini_assistant', 'quick_exam'],
    icon: '⚡',
    badge: 'Recomendado',
  },
  {
    id: 'simadi',
    name: 'Preparación de Exámenes',
    tagline: 'Intensidad de evaluación y práctica',
    description: 'Prioriza exámenes cronometrados, guías temáticas y sesiones de estudio de 50 minutos.',
    modules: ['quick_exam', 'pomodoro', 'guides_quick', 'gemini_assistant', 'tasks'],
    icon: '🎯',
    badge: 'Exámenes',
  },
  {
    id: 'scientific',
    name: 'Científico & Analítico',
    tagline: 'Física, cálculo y rigor matemático',
    description: 'Calculadora científica integrada, constantes CODATA, laboratorio vectorial y Pomodoro.',
    modules: ['calculator', 'latex_lab', 'quick_exam', 'pomodoro', 'gemini_assistant'],
    icon: '⚛️',
    badge: 'Ciencias Exactas',
  },
  {
    id: 'creative',
    name: 'Creativo & Proyectos',
    tagline: 'Diseño, entregas y organización visual',
    description: 'Tablero Kanban por columnas con portadas, asistente de color/materialidad y tareas.',
    modules: ['kanban', 'tasks', 'gemini_assistant', 'pomodoro'],
    icon: '🎨',
    badge: 'Proyectos & Taller',
  },
  {
    id: 'minimal',
    name: 'Lienzo Minimalista',
    tagline: 'Cero distracciones visuales',
    description: 'Sólo las tareas del día y el cronómetro de concentración sin sobrecarga.',
    modules: ['tasks', 'pomodoro'],
    icon: '🌿',
    badge: 'Zen',
  },
  {
    id: 'all',
    name: 'Omnipotente Completo',
    tagline: 'Todas las herramientas habilitadas',
    description: 'Acceso directo a todos los módulos sin límites.',
    modules: [
      'tasks',
      'pomodoro',
      'gemini_assistant',
      'quick_exam',
      'calculator',
      'kanban',
      'guides_quick',
      'latex_lab',
    ],
    icon: '🚀',
    badge: 'Todo Desplegado',
  },
];
