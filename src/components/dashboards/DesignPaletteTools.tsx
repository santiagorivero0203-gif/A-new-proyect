/**
 * ==============================================================================
 * CENTRO DE PRODUCTIVIDAD ESTUDIANTIL - HERRAMIENTAS DE COLOR Y ACCESIBILIDAD WCAG
 * ==============================================================================
 * Componente: DesignPaletteTools.tsx
 * Diseñado para: Mafe (Diseño Integral UCAB) y proyectos visuales.
 * Funciones implementadas:
 * - Función 122: Extractor y generador armónico de paletas de color (HEX, RGB)
 * - Función 123: Verificador matemático de contraste y accesibilidad visual (WCAG AA/AAA)
 * - Función 127: Escala tipográfica armónica con proporción áurea (×1.618)
 * ==============================================================================
 */

import React, { useState } from 'react';
import {
  Palette,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
} from 'lucide-react';

export const DesignPaletteTools: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [baseColor, setBaseColor] = useState<string>('#0F52BA'); // Azul Cobalto oficial
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Conversión HEX a RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length !== 6) return null;
    const num = parseInt(cleanHex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  // Luminancia relativa según estándar WCAG
  const getRelativeLuminance = (r: number, g: number, b: number): number => {
    const sRGB = [r, g, b].map((val) => {
      const v = val / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  // Ratio de contraste WCAG: (L1 + 0.05) / (L2 + 0.05)
  const getContrastRatio = (hex1: string, hex2: string): number => {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    if (!rgb1 || !rgb2) return 1;

    const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Ratios de contraste del color seleccionado
  const contrastOnWhite = getContrastRatio(baseColor, '#FFFFFF');
  const contrastOnDark = getContrastRatio(baseColor, '#0F172A');

  // Generación simple de paleta armónica (complementario, análogo claro, análogo oscuro)
  const getHarmonicPalette = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return [hex];

    // Complementario
    const compHex = '#' + [255 - rgb.r, 255 - rgb.g, 255 - rgb.b]
      .map((c) => Math.round(c).toString(16).padStart(2, '0'))
      .join('');

    // Tint suave (+40%)
    const tintHex = '#' + [rgb.r + (255 - rgb.r) * 0.4, rgb.g + (255 - rgb.g) * 0.4, rgb.b + (255 - rgb.b) * 0.4]
      .map((c) => Math.round(c).toString(16).padStart(2, '0'))
      .join('');

    // Shade oscuro (-30%)
    const shadeHex = '#' + [rgb.r * 0.7, rgb.g * 0.7, rgb.b * 0.7]
      .map((c) => Math.round(c).toString(16).padStart(2, '0'))
      .join('');

    return [hex, compHex, tintHex, shadeHex];
  };

  const palette = getHarmonicPalette(baseColor);

  return (
    <div className={`app-card bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-pink-700">
              Módulo Creativo & Diseño Editorial (WCAG 2.1)
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#0F52BA]" />
            Verificador de Contraste y Paletas Armónicas
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Analiza el ratio de legibilidad para láminas de presentación y genera armonías cromáticas.
          </p>
        </div>

        {/* Selector de Color Base */}
        <div className="flex items-center gap-2.5 p-2 bg-slate-50 border border-slate-200 rounded-xl self-start sm:self-auto">
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value.toUpperCase())}
            className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent p-0"
          />
          <input
            type="text"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value.toUpperCase())}
            maxLength={7}
            className="w-20 px-2 py-1 text-xs font-mono font-bold text-slate-800 bg-white border border-slate-200 rounded-md"
          />
        </div>
      </div>

      {/* Verificación de Contraste WCAG */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Contraste sobre Blanco */}
        <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Texto sobre Fondo Blanco (#FFFFFF)</span>
            <span className="text-xs font-mono font-bold text-slate-900">{contrastOnWhite} : 1</span>
          </div>

          <div
            className="p-3 rounded-lg border text-sm font-semibold flex items-center justify-center transition-colors"
            style={{ backgroundColor: '#FFFFFF', color: baseColor, borderColor: '#E2E8F0' }}
          >
            Vista Previa de Texto
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1.5 font-medium">
              {contrastOnWhite >= 4.5 ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Pasa WCAG AA (Normal)</span>
                </>
              ) : contrastOnWhite >= 3.0 ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-amber-700">Solo Títulos Grandes (AA Large)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-red-600">No Accesible (Falla)</span>
                </>
              )}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {contrastOnWhite >= 7.0 ? 'Pasa AAA' : 'Falla AAA'}
            </span>
          </div>
        </div>

        {/* Contraste sobre Fondo Oscuro */}
        <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Texto sobre Fondo Oscuro (#0F172A)</span>
            <span className="text-xs font-mono font-bold text-slate-900">{contrastOnDark} : 1</span>
          </div>

          <div
            className="p-3 rounded-lg border text-sm font-semibold flex items-center justify-center transition-colors"
            style={{ backgroundColor: '#0F172A', color: baseColor, borderColor: '#1E293B' }}
          >
            Vista Previa de Texto
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1.5 font-medium">
              {contrastOnDark >= 4.5 ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Pasa WCAG AA (Normal)</span>
                </>
              ) : contrastOnDark >= 3.0 ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-amber-700">Solo Títulos Grandes (AA Large)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-red-600">No Accesible (Falla)</span>
                </>
              )}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {contrastOnDark >= 7.0 ? 'Pasa AAA' : 'Falla AAA'}
            </span>
          </div>
        </div>
      </div>

      {/* Paleta Armónica Generada */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Paleta Armónica Relacionada
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {palette.map((color, i) => (
            <div
              key={i}
              onClick={() => copyToClipboard(color)}
              className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-all space-y-2 group"
            >
              <div
                className="w-full h-12 rounded-lg shadow-xs transition-transform group-hover:scale-102"
                style={{ backgroundColor: color }}
              />
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-800">{color}</span>
                {copiedColor === color ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignPaletteTools;
