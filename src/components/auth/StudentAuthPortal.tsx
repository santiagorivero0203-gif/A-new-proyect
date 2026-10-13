import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_PROFILES } from '../../lib/mockData';
import type { AcademicProfileId } from '../../types';
import { SparklesIcon } from '../common/Icons';

interface StudentAuthPortalProps {
  onOpenSupabaseModal: () => void;
}

export const StudentAuthPortal: React.FC<StudentAuthPortalProps> = ({
  onOpenSupabaseModal,
}) => {
  const { selectStudentAccount } = useAuth();
  const [hoveredProfile, setHoveredProfile] = useState<AcademicProfileId | null>(null);

  const profilesList = [
    {
      id: 'santiago_fisica_ucv' as AcademicProfileId,
      profile: MOCK_PROFILES['santiago_fisica_ucv'],
      description: 'Licenciatura en Física & Cálculo Analítico. Formulario matemático, constantes y laboratorio.',
      badge: 'Universidad (UCV)',
      initials: 'SR',
    },
    {
      id: 'andres_bachillerato_1' as AcademicProfileId,
      profile: MOCK_PROFILES['andres_bachillerato_1'],
      description: 'Transición a bachillerato, guías paso a paso de matemática, biología y técnicas de estudio.',
      badge: '1er Año Secundaria',
      initials: 'AR',
    },
    {
      id: 'prima_bachillerato_5' as AcademicProfileId,
      profile: MOCK_PROFILES['prima_bachillerato_5'],
      description: 'Entrenamiento intensivo para pruebas de admisión universitaria (UCV, OPSU, UCAB) con 1.111 ejercicios.',
      badge: '5to Año Pre-Universitario',
      initials: 'SR',
    },
    {
      id: 'mafe_diseno_ucab' as AcademicProfileId,
      profile: MOCK_PROFILES['mafe_diseno_ucab'],
      description: 'Diseño Integral: Tablero visual de entregas, láminas técnicas de ergonomía y retículas.',
      badge: 'Universidad (UCAB)',
      initials: 'MV',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      {/* Barra Superior Minimalista */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-8 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shadow-soft-sm tracking-tight">
            CP
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 font-sans tracking-tight leading-none">
              Centro de Productividad Estudiantil
            </h1>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5 leading-none">
              Ecosistema Académico Unificado
            </p>
          </div>
        </div>

        <button
          onClick={onOpenSupabaseModal}
          className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-2"
        >
          <SparklesIcon className="w-4 h-4 text-brand-500" />
          <span>Acceso Supabase</span>
        </button>
      </div>

      {/* Contenido Central */}
      <div className="max-w-4xl mx-auto w-full my-auto py-12">
        <div className="max-w-xl mx-auto text-center mb-12 space-y-3">
          <span className="inline-block text-[11px] font-mono uppercase tracking-widest text-brand-500 font-bold bg-brand-50 border border-brand-200/60 px-3 py-1 rounded-full">
            Acceso al Ecosistema
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
            Selecciona tu cuenta académica
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Cada cuenta mantiene su propio espacio de estudio aislado: evaluaciones, notas, entregas y banco de ejercicios sin cruce de información.
          </p>
        </div>

        {/* Rejilla de Cuentas de Estudiantes (Sin tarjetas dentro de tarjetas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {profilesList.map((item) => {
            const isHovered = hoveredProfile === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredProfile(item.id)}
                onMouseLeave={() => setHoveredProfile(null)}
                onClick={() => selectStudentAccount(item.id)}
                className={`p-6 rounded-2xl bg-white border transition-all duration-150 cursor-pointer flex flex-col justify-between h-full active:scale-[0.99] ${
                  isHovered
                    ? 'border-brand-500 shadow-soft-md'
                    : 'border-slate-200/90 shadow-soft hover:border-slate-300'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center tracking-wider shadow-soft-sm">
                      {item.initials}
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200/60">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-sans">
                      {item.profile.full_name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {item.profile.institution}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.profile.email}
                  </span>
                  <span
                    className={`text-xs font-bold flex items-center gap-1 transition-colors duration-150 ${
                      isHovered ? 'text-brand-500' : 'text-slate-700'
                    }`}
                  >
                    <span>Ingresar</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pie Editorial */}
      <div className="max-w-4xl mx-auto w-full pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
        <div>
          <span>Centro de Productividad Estudiantil • v2.0</span>
        </div>
        <div>
          <span>Persistencia aislada por estudiante • Modo Seguro</span>
        </div>
      </div>
    </div>
  );
};
