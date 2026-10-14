import type { UserProfile, AcademicProfileId, MainTabType } from '../types';

/**
 * Pestañas de la barra lateral recomendadas por perfil académico
 */
export const DEFAULT_PROFILE_SIDEBAR_TABS: Record<AcademicProfileId, MainTabType[]> = {
  andres_bachillerato_1: ['PRODUCTIVITY', 'PLANNER', 'GUIDES', 'EXAMS', 'STORAGE'],
  prima_bachillerato_5: ['PRODUCTIVITY', 'UCV_COURSE', 'EXAMS', 'GUIDES', 'PLANNER', 'TOOLS'],
  santiago_fisica_ucv: ['PRODUCTIVITY', 'UCV_COURSE', 'EXAMS', 'GUIDES', 'PLANNER', 'STORAGE', 'TOOLS'],
  mafe_diseno_ucab: ['PRODUCTIVITY', 'CREATIVE_BOARD', 'STORAGE', 'TOOLS', 'GUIDES'],
};

/**
 * Perfiles base precargados con metadata personalizada según las necesidades académicas
 */
export const MOCK_PROFILES: Record<AcademicProfileId, UserProfile> = {
  andres_bachillerato_1: {
    id: 'andres-001-uuid',
    email: 'andres.rivero@liceo.edu.ve',
    full_name: 'Andrés Rivero',
    username: 'andres_rivero',
    academic_profile: 'andres_bachillerato_1',
    institution: '1er Año de Bachillerato (Secundaria)',
    academic_goal: 'Transición a bachillerato y técnicas de estudio fundamentales',
    preferences: {
      theme: 'light',
      sound_enabled: true,
      focus_duration: 25,
      compact_mode: false,
      sidebar_tabs: ['PRODUCTIVITY', 'PLANNER', 'GUIDES', 'EXAMS', 'STORAGE'],
    },
    created_at: '2026-09-15T10:00:00Z',
    updated_at: '2026-10-12T14:30:00Z',
  },

  prima_bachillerato_5: {
    id: 'prima-002-uuid',
    email: 'sofia.rivero@admisiones.edu.ve',
    full_name: 'Sofía Rivero',
    username: 'sofia_rivero_5to',
    academic_profile: 'prima_bachillerato_5',
    institution: '5to Año de Bachillerato (Pre-Universitario)',
    academic_goal: 'Ingreso Universitario (OPSU / Prueba UCV / Admisión UCAB)',
    preferences: {
      theme: 'light',
      sound_enabled: true,
      focus_duration: 45,
      compact_mode: false,
      sidebar_tabs: ['PRODUCTIVITY', 'EXAMS', 'GUIDES', 'PLANNER', 'TOOLS'],
    },
    created_at: '2026-08-01T08:00:00Z',
    updated_at: '2026-10-12T17:15:00Z',
  },

  santiago_fisica_ucv: {
    id: 'santiago-003-uuid',
    email: 'santiago.rivero@ciencias.ucv.ve',
    full_name: 'Santiago Rivero',
    username: 'santiago_fisica_ucv',
    academic_profile: 'santiago_fisica_ucv',
    institution: 'UCV - Facultad de Ciencias (Física)',
    academic_goal: 'Licenciatura en Física & Cálculo Analítico',
    preferences: {
      theme: 'light',
      sound_enabled: false,
      focus_duration: 50,
      calculator_docked: true,
      compact_mode: false,
      sidebar_tabs: ['PRODUCTIVITY', 'EXAMS', 'GUIDES', 'PLANNER', 'STORAGE', 'TOOLS'],
    },
    created_at: '2026-07-10T12:00:00Z',
    updated_at: '2026-10-12T18:00:00Z',
  },

  mafe_diseno_ucab: {
    id: 'mafe-004-uuid',
    email: 'maria.valderrama@ucab.edu.ve',
    full_name: 'María Fernanda Valderrama',
    username: 'mafe_valderrama_ucab',
    academic_profile: 'mafe_diseno_ucab',
    institution: 'UCAB - Escuela de Diseño Integral',
    academic_goal: 'Taller de Identidad Visual y Ergonomía',
    preferences: {
      theme: 'light',
      sound_enabled: true,
      focus_duration: 35,
      compact_mode: false,
      sidebar_tabs: ['PRODUCTIVITY', 'CREATIVE_BOARD', 'STORAGE', 'TOOLS', 'GUIDES'],
    },
    created_at: '2026-08-20T09:00:00Z',
    updated_at: '2026-10-12T16:45:00Z',
  },
};

/**
 * Constantes físicas universales para el módulo de Santiago
 */
export const PHYSICS_CONSTANTS = [
  { name: 'Velocidad de la luz (c)', symbol: 'c', value: '299,792,458 m/s', latex: 'c \\approx 3 \\times 10^8 \\text{ m/s}' },
  { name: 'Constante de Planck (h)', symbol: 'h', value: '6.62607015 × 10⁻³⁴ J·s', latex: 'h = 6.626 \\times 10^{-34} \\text{ J}\\cdot\\text{s}' },
  { name: 'Constante reducida (ℏ)', symbol: '\\hbar', value: '1.054571817 × 10⁻³⁴ J·s', latex: '\\hbar = \\frac{h}{2\\pi}' },
  { name: 'Gravitación Universal (G)', symbol: 'G', value: '6.67430 × 10⁻¹¹ N·m²/kg²', latex: 'G = 6.674 \\times 10^{-11} \\frac{\\text{N}\\cdot\\text{m}^2}{\\text{kg}^2}' },
  { name: 'Carga elemental (e)', symbol: 'e', value: '1.602176634 × 10⁻¹⁹ C', latex: 'e = 1.602 \\times 10^{-19} \\text{ C}' },
  { name: 'Permitividad del vacío (ε₀)', symbol: '\\varepsilon_0', value: '8.85418781 × 10⁻¹² F/m', latex: '\\varepsilon_0 = 8.854 \\times 10^{-12} \\text{ F/m}' },
];

/**
 * Banco de fórmulas destacadas con LaTeX para Santiago
 */
export const SANTIAGO_FORMULAS = [
  {
    topic: 'Mecánica Clásica & Hamiltoniana',
    title: 'Ecuaciones Canónicas de Hamilton',
    latex: '\\dot{q}_i = \\frac{\\partial \\mathcal{H}}{\\partial p_i}, \\quad \\dot{p}_i = -\\frac{\\partial \\mathcal{H}}{\\partial q_i}',
    description: 'Evolución temporal del espacio de fase para sistemas conservativos.',
  },
  {
    topic: 'Electromagnetismo',
    title: 'Ecuación de Maxwell-Ampère con corrección',
    latex: '\\nabla \\times \\vec{B} = \\mu_0 \\vec{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\vec{E}}{\\partial t}',
    description: 'Generación de campos magnéticos por corrientes y flujo eléctrico variable.',
  },
  {
    topic: 'Mecánica Cuántica',
    title: 'Ecuación de Schrödinger Dependiente del Tiempo',
    latex: 'i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\vec{r}, t) = \\left[ -\\frac{\\hbar^2}{2m} \\nabla^2 + V(\\vec{r}, t) \\right] \\Psi(\\vec{r}, t)',
    description: 'Dinámica ondulatoria fundamental del estado cuántico.',
  },
  {
    topic: 'Relatividad Especial',
    title: 'Relación Energía - Momento Generalizada',
    latex: 'E^2 = (pc)^2 + (m_0 c^2)^2',
    description: 'Válida para partículas con masa y partículas sin masa (fotones donde m₀ = 0).',
  },
];
