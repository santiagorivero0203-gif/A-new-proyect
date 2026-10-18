/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - PALETAS & COLOR WCAG
 * ==============================================================================
 * Vista de estudio e inspección visual para Estudiantes de Diseño (UCAB / Arte):
 * - Extractor de armonías cromáticas (análogas, complementarias, tríadas).
 * - Verificador de contraste accesible WCAG 2.1 (AA / AAA).
 * - Generador de tokens HSL / HEX y exportador rápido.
 * 
 * Estética: Editorial de Diseño Gráfico, respiración espacial y micro-interacciones.
 * ==============================================================================
 */

import React from 'react';
import { Palette, Eye } from 'lucide-react';
import { DesignPaletteTools } from '../dashboards/DesignPaletteTools';
import { useAuth } from '../../context/AuthContext';

export const DesignPaletteView: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Encabezado Editorial */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="app-badge font-mono text-[11px] font-bold">
              <Palette className="w-3.5 h-3.5 text-pink-600" />
              Taller de Identidad Visual & Ergonomía
            </span>
            <span className="text-xs font-mono text-slate-400">
              📌 Fijado para {user?.full_name || 'Estudiante'}
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight font-display text-slate-900">
            Laboratorio de Color & Accesibilidad WCAG
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Composición armónica de paletas, curvas de luminancia perceptual y ratios de contraste legibles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 font-bold flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>WCAG 2.1 AAA Ready</span>
          </span>
        </div>
      </div>

      {/* Herramienta Principal de Paletas */}
      <div className="transition-opacity duration-200">
        <DesignPaletteTools />
      </div>
    </div>
  );
};
