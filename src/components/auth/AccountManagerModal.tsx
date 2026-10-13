import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_PROFILES } from '../../lib/mockData';
import type { AcademicProfileId } from '../../types';
import { XIcon } from '../common/Icons';

interface AccountManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSupabaseAuth?: () => void;
}

export const AccountManagerModal: React.FC<AccountManagerModalProps> = ({
  isOpen,
  onClose,
  onOpenSupabaseAuth,
}) => {
  const { user, selectStudentAccount, signOut, isDemoMode } = useAuth();

  if (!isOpen) return null;

  const handleSelectAccount = (profileId: AcademicProfileId) => {
    selectStudentAccount(profileId);
    onClose();
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const allProfiles = Object.values(MOCK_PROFILES);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-soft-lg border border-slate-200/90 overflow-hidden transform transition-transform duration-150 ease-out"
        style={{ transformOrigin: 'center' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight">
              Gestión de Cuenta Estudiantil
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Sesión activa y aislamiento de espacio de estudio
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Cerrar modal"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Cuenta Activa */}
        <div className="p-6 bg-slate-50/60 border-b border-slate-100">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
            Sesión Activa
          </span>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0 tracking-wider shadow-soft-sm">
                {user?.full_name
                  ? user.full_name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()
                  : 'SR'}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate font-sans">
                  {user?.full_name || 'Santiago Rivero'}
                </h4>
                <p className="text-xs text-slate-600 truncate">{user?.institution}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">{user?.email}</p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 font-semibold">
              Activo
            </span>
          </div>
        </div>

        {/* Lista de Cuentas para Cambio Rápido */}
        <div className="p-6 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-1">
            Cambiar a Otra Cuenta de Estudiante
          </span>

          <div className="divide-y divide-slate-100">
            {allProfiles.map((prof) => {
              const isCurrent = user?.academic_profile === prof.academic_profile;
              return (
                <div
                  key={prof.id}
                  className={`py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3 ${
                    isCurrent ? 'opacity-50' : 'hover:bg-slate-50/80 -mx-2 px-2 rounded-xl transition-colors'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {prof.full_name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate font-sans">
                        {prof.full_name}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{prof.institution}</p>
                    </div>
                  </div>

                  {isCurrent ? (
                    <span className="text-[11px] text-slate-400 font-mono shrink-0">En uso</span>
                  ) : (
                    <button
                      onClick={() => handleSelectAccount(prof.academic_profile)}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white transition-colors duration-150 active:scale-[0.98] shrink-0"
                    >
                      Acceder
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer con Acciones */}
        <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between gap-3">
          {onOpenSupabaseAuth && (
            <button
              onClick={() => {
                onClose();
                onOpenSupabaseAuth();
              }}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {isDemoMode ? 'Conectar Supabase Real' : 'Ajustes de Autenticación'}
            </button>
          )}

          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200/80 transition-colors duration-150 active:scale-[0.98] ml-auto"
          >
            Cerrar Sesión Activa
          </button>
        </div>
      </div>
    </div>
  );
};
