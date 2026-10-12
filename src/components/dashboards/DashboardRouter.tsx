import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AndresDashboard } from './AndresDashboard';
import { PrimaDashboard } from './PrimaDashboard';
import { SantiagoDashboard } from './SantiagoDashboard';
import { MafeDashboard } from './MafeDashboard';

/**
 * Enrutador Inteligente de Dashboards
 * Determina qué vista académica montar de forma condicional basándose
 * en el academic_profile del usuario autenticado.
 */
export const DashboardRouter: React.FC = () => {
  const { academicProfile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-cobalt-600 border-t-cobalt-400 animate-spin" />
        <p className="text-xs text-slate-400 font-mono">Cargando ecosistema académico...</p>
      </div>
    );
  }

  switch (academicProfile) {
    case 'andres_bachillerato_1':
      return <AndresDashboard />;
    case 'prima_bachillerato_5':
      return <PrimaDashboard />;
    case 'santiago_fisica_ucv':
      return <SantiagoDashboard />;
    case 'mafe_diseno_ucab':
      return <MafeDashboard />;
    default:
      return <SantiagoDashboard />;
  }
};
