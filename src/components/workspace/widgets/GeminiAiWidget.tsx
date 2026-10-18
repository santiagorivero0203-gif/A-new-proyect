import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { SparklesIcon, BookOpenIcon, UploadCloudIcon, PlayIcon } from '../../common/Icons';
import { geminiService } from '../../../services/geminiService';
import type { Question } from '../../../types/exam.types';
import type { AcademicProfileId } from '../../../types';
import type { DeconstructedAcademicGuide } from '../../../types/deconstruction.types';
import { convertDeconstructedToQuestions } from '../../../types/deconstruction.types';
import { DeconstructedGuideView } from '../../academic/DeconstructedGuideView';

interface GeminiAiWidgetProps {
  onStartExamWithQuestions?: (questions: Question[], title: string) => void;
  onNavigateToStorage?: () => void;
  onNavigateToGuides?: () => void;
}

export const GeminiAiWidget: React.FC<GeminiAiWidgetProps> = ({
  onStartExamWithQuestions,
  onNavigateToStorage,
  onNavigateToGuides,
}) => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMsg, setProgressMsg] = useState<string>('');
  const [deconstructedGuide, setDeconstructedGuide] = useState<DeconstructedAcademicGuide | null>(null);
  const [isFullGuideOpen, setIsFullGuideOpen] = useState(false);

  const handleDeconstruct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isProcessing) return;

    setIsProcessing(true);
    setProgressMsg('Analizando tema y generando material de estudio...');
    setDeconstructedGuide(null);

    try {
      const result = await geminiService.deconstructAcademicContent({
        topicOrText: prompt.trim(),
        userId: user?.id || 'demo-user',
        profile: (user?.academic_profile || 'santiago_fisica_ucv') as AcademicProfileId,
        onProgress: (step) => setProgressMsg(step),
      });

      if (result.success && result.data) {
        setDeconstructedGuide(result.data);
      }
    } catch (err) {
      console.warn('Error en deconstrucción académica:', err);
    } finally {
      setIsProcessing(false);
      setProgressMsg('');
    }
  };

  const handleStartExam = () => {
    if (!deconstructedGuide || !onStartExamWithQuestions) return;
    const questions = convertDeconstructedToQuestions(
      deconstructedGuide.generatedQuestions,
      deconstructedGuide.guideMetadata.title,
      user?.academic_profile
    );
    onStartExamWithQuestions(
      questions,
      `Simulación: ${deconstructedGuide.guideMetadata.title}`
    );
  };

  return (
    <div className="app-card p-6 bg-white border border-slate-200/80 shadow-soft space-y-4">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0F52BA] flex items-center justify-center shrink-0">
            <SparklesIcon className="w-5 h-5 text-[#0F52BA]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-sans">
              Análisis de Estudio con IA
            </h3>
            <p className="text-[11px] text-slate-500">
              Sube tus archivos, fotos o apuntes y saca provecho de ello
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-[#0F52BA] border border-blue-200 font-semibold">
            ✦ Gemini 2.5 Flash
          </span>
          {onNavigateToStorage && (
            <button
              onClick={onNavigateToStorage}
              className="px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 transition-colors flex items-center gap-1.5"
            >
              <UploadCloudIcon className="w-3.5 h-3.5" />
              <span>Sube tus Archivos</span>
            </button>
          )}
          {onNavigateToGuides && (
            <button
              onClick={onNavigateToGuides}
              className="px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 transition-colors flex items-center gap-1.5"
            >
              <BookOpenIcon className="w-3.5 h-3.5" />
              <span>Guías</span>
            </button>
          )}
        </div>
      </div>

      {/* Formulario de Consulta / Tema */}
      <form onSubmit={handleDeconstruct} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe un tema de estudio o sube tus archivos y saca provecho de ello..."
          className="input-clean flex-1 text-xs"
          disabled={isProcessing}
        />
        <button
          type="submit"
          disabled={isProcessing || !prompt.trim()}
          className="btn-brand text-xs font-bold py-2 px-4 rounded-xl shadow-soft flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 transition-all cursor-pointer"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{progressMsg || 'Analizando...'}</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-4 h-4" />
              <span>Analizar con IA</span>
            </>
          )}
        </button>
      </form>

      {/* Resultados de la Deconstrucción */}
      {deconstructedGuide && (
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 animate-fadeIn">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F52BA]">
                Guía de Estudio Generada ({deconstructedGuide.guideMetadata.area})
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                {deconstructedGuide.guideMetadata.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                {deconstructedGuide.guideMetadata.summary}
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold shrink-0">
              {deconstructedGuide.generatedQuestions?.length || 0} Preguntas Certificadas
            </span>
          </div>

          <div className="pt-2 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] text-slate-500 font-mono">
              Glosario SI • Fórmulas KaTeX • Errores de Examen • Cornell & Flashcards
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullGuideOpen(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <BookOpenIcon className="w-3.5 h-3.5 text-[#0F52BA]" />
                <span>Ver Guía Completa</span>
              </button>

              {deconstructedGuide.generatedQuestions?.length > 0 && onStartExamWithQuestions && (
                <button
                  onClick={handleStartExam}
                  className="bg-[#0F52BA] hover:bg-[#0c4396] text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-soft flex items-center gap-1.5 transition-colors"
                >
                  <PlayIcon className="w-3.5 h-3.5 text-white" />
                  <span>Simular Examen de este Tema</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal con la Guía Hiper-Compleja Completa */}
      {isFullGuideOpen && deconstructedGuide && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="max-w-4xl w-full">
            <DeconstructedGuideView
              guide={deconstructedGuide}
              onClose={() => setIsFullGuideOpen(false)}
              onStartExamWithQuestions={(qs, title) => {
                setIsFullGuideOpen(false);
                if (onStartExamWithQuestions) {
                  onStartExamWithQuestions(qs, title);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
