import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ModularWorkspaceDashboard } from '../workspace/ModularWorkspaceDashboard';

interface DashboardRouterProps {
  onStartExamWithQuestions?: (questions: any[], title: string) => void;
  onLaunchExam?: (config: any) => void;
  onNavigateToTab?: (tab: any) => void;
}

/**
 * Enrutador Unificado de Workspace (Fase 4: Modularidad Universal)
 * Se elimina la bifurcación rígida basada en perfiles estáticos.
 * Ahora todos los estudiantes acceden al Workspace Modular omnipotente,
 * donde cada usuario personaliza sus propios widgets y preferencias.
 */
export const DashboardRouter: React.FC<DashboardRouterProps> = (props) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-brand-300 animate-spin" />
        <p className="text-xs text-slate-400 font-mono">Cargando ecosistema modular...</p>
      </div>
    );
  }

  return <ModularWorkspaceDashboard {...props} />;
};
