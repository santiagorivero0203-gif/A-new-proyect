import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { AcademicProfileId } from '../../types';
import { SparklesIcon } from '../common/Icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signInWithEmail, signUpWithEmail, isDemoMode } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<AcademicProfileId>('santiago_fisica_ucv');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (isRegister) {
        const result = await signUpWithEmail(email, password, fullName, selectedProfile);
        if (!result.success) {
          setErrorMsg(result.error || 'Error al crear la cuenta');
        } else {
          onClose();
        }
      } else {
        const result = await signInWithEmail(email, password);
        if (!result.success) {
          setErrorMsg(result.error || 'Credenciales incorrectas');
        } else {
          onClose();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-soft-lg p-6 sm:p-8 text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <h3 className="text-lg font-bold text-slate-900 font-display">
                {isRegister ? 'Registrar Estudiante' : 'Acceso al Ecosistema'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isDemoMode ? 'Modo de demostración con integración Supabase Auth' : 'Conexión activa con Supabase'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-800 transition-colors p-1 rounded-lg hover:bg-slate-100"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre Completo</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej. Andrés Mendoza"
                className="input-clean"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Correo Electrónico</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="estudiante@universidad.edu.ve"
              className="input-clean"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-clean"
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Perfil Académico Inicial</label>
              <select
                value={selectedProfile}
                onChange={(e) => setSelectedProfile(e.target.value as AcademicProfileId)}
                className="input-clean"
              >
                <option value="andres_bachillerato_1">Andrés - 1er Año Bachillerato</option>
                <option value="prima_bachillerato_5">Prima - 5to Año / Admisión</option>
                <option value="santiago_fisica_ucv">Santiago - Física UCV</option>
                <option value="mafe_diseno_ucab">María Fernanda - Diseño UCAB</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 mt-2"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <SparklesIcon className="w-4 h-4 text-blue-400" />
                {isRegister ? 'Crear Perfil Estudiantil' : 'Ingresar al Dashboard'}
              </>
            )}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            {isRegister
              ? '¿Ya tienes cuenta registrada? Inicia sesión aquí'
              : '¿Nuevo estudiante? Regístrate y asigna tu perfil'}
          </button>
        </div>
      </div>
    </div>
  );
};
