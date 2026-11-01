import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Límite de Error (Error Boundary) de Grado Industrial
 *
 * Captura excepciones en el ciclo de vida o renderizado de cualquier vista o widget,
 * evitando que la pantalla quede en blanco o la aplicación se congele ("estancada").
 * Cumple con los lineamientos de rulesofdesign.md: minimalismo, sombra difusa y feedback inmediato.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Error no capturado en la vista:', error, errorInfo);
  }

  private handleReload = (): void => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  private handleGoHome = (): void => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '';
    window.location.reload();
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 animate-fadeIn">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-[0_10px_35px_-4px_rgba(0,0,0,0.08)] text-center space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto border border-rose-200 dark:border-rose-900/60 shadow-soft-xs">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans tracking-tight">
                {this.props.fallbackTitle || 'Interrupción temporal en este módulo'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                Ocurrió una excepción inesperada al procesar este contenido. Tus datos y progreso guardado siguen a salvo.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-left">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Detalle del error
                </span>
                <p className="text-[11px] font-mono text-rose-600 dark:text-rose-400 break-words line-clamp-2">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="py-2.5 px-4 rounded-xl bg-[#0F52BA] hover:bg-[#0c4396] text-white text-xs font-bold transition-all shadow-soft flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reintentar módulo</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
