import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { SparklesIcon, BookOpenIcon, UploadCloudIcon } from '../../common/Icons';
import { geminiService } from '../../../services/geminiService';
import type { Question } from '../../../types/exam.types';
import type { AcademicProfileId } from '../../../types';

interface GeminiAiWidgetProps {
  onStartExamWithQuestions?: (questions: Question[], title: string) => void;
  onNavigateToStorage?: () => void;
}

export const GeminiAiWidget: React.FC<GeminiAiWidgetProps> = ({
  onStartExamWithQuestions,
  onNavigateToStorage,
}) => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [responseSnippet, setResponseSnippet] = useState<string | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[] | null>(null);

  const handleAskGemini = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isProcessing) return;

    setIsProcessing(true);
    setResponseSnippet(null);
    setGeneratedQuestions(null);

    try {
      const mockDoc: any = {
        id: `widget-ai-${Date.now()}`,
        title: prompt.trim(),
        description: 'Consulta directa desde el Workspace Modular',
        file_path: '',
        file_type: 'text/plain',
        tags: ['Asistente Workspace'],
        storage_bucket: 'documents',
      };

      const result = await geminiService.analyzeDocument({
        document: mockDoc,
        profile: (user?.academic_profile || 'santiago_fisica_ucv') as AcademicProfileId,
      });

      if (result.success && result.data) {
        setResponseSnippet(result.data.documentSummary);
        if (result.data.generatedQuestions && result.data.generatedQuestions.length > 0) {
          setGeneratedQuestions(result.data.generatedQuestions);
        }
      }
    } catch (err) {
      console.warn('Error en consulta de Gemini:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="app-card p-6 bg-white border border-slate-200/80 shadow-soft space-y-4">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
            <SparklesIcon className="w-5 h-5 text-brand-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Asistente Multimodal Google Gemini
            </h3>
            <p className="text-[11px] text-slate-500">
              Genera resúmenes ejecutivos, deduce fórmulas y crea simulacros al instante
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
            ✦ Gemini 2.5 Flash
          </span>
          {onNavigateToStorage && (
            <button
              onClick={onNavigateToStorage}
              className="px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 transition-colors flex items-center gap-1.5"
            >
              <UploadCloudIcon className="w-4 h-4" />
              <span>Ver Storage</span>
            </button>
          )}
        </div>
      </div>

      {/* Formulario de consulta inteligente */}
      <form onSubmit={handleAskGemini} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe un tema (ej: Ley de Faraday, respiración celular, derivadas por partes)..."
          className="input-clean flex-1 text-xs"
          disabled={isProcessing}
        />
        <button
          type="submit"
          disabled={isProcessing || !prompt.trim()}
          className="btn-brand text-xs py-2 px-4 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analizando...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-4 h-4" />
              <span>Consultar IA</span>
            </>
          )}
        </button>
      </form>

      {/* Resultados de la consulta */}
      {responseSnippet && (
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3 animate-fadeIn">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
              Resumen Pedagógico Generado:
            </span>
            <p className="text-xs text-slate-700 leading-relaxed mt-1">
              {responseSnippet}
            </p>
          </div>

          {generatedQuestions && generatedQuestions.length > 0 && onStartExamWithQuestions && (
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                {generatedQuestions.length} pregunta(s) KaTeX listas para entrenar
              </span>
              <button
                onClick={() =>
                  onStartExamWithQuestions(
                    generatedQuestions,
                    `Simulacro Exprés Gemini: ${prompt.trim()}`
                  )
                }
                className="btn-brand text-xs py-1.5 px-3 flex items-center gap-1.5"
              >
                <BookOpenIcon className="w-3 h-3" />
                <span>Evaluarme con estas preguntas</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
