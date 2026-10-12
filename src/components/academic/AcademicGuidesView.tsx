import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { VectorAndGraphInteractive } from './VectorAndGraphInteractive';
import { renderLatex } from '../../utils/latexRenderer';
import { BookOpenIcon, CheckCircleIcon } from '../common/Icons';

type SubjectFilter = 'ALL' | 'CASTELLANO' | 'BIOLOGIA' | 'QUIMICA' | 'FISICA_BASICA' | 'FISICA_AVANZADA' | 'MATEMATICA_BASICA' | 'MATEMATICA_AVANZADA';

export const AcademicGuidesView: React.FC = () => {
  const { user, academicProfile } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>('ALL');
  const [activeGuideModal, setActiveGuideModal] = useState<number | null>(null);

  // Catálogo integral de guías y ejercicios adaptados
  const academicCatalog = [
    {
      id: 1,
      subject: 'CASTELLANO',
      subjectLabel: 'Castellano',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      title: 'Morfosintaxis y Estructura de la Oración Simple',
      targetProfiles: ['andres_bachillerato_1'],
      level: '1er Año Bachillerato',
      summary: 'Reconocimiento del sujeto, predicado, concordancia verbal y clasificación de pronombres.',
      exerciseCount: 15,
      content: 'La oración bimembre está conformada por un sintagma nominal (sujeto) y un sintagma verbal (predicado). Regla clave: el núcleo del sujeto debe concordar en número y persona con el verbo núcleo del predicado.',
    },
    {
      id: 2,
      subject: 'CASTELLANO',
      subjectLabel: 'Castellano & Razonamiento Verbal',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      title: 'Comprensión Lectora y Analogías Semánticas (Prueba OPSU/UCV)',
      targetProfiles: ['prima_bachillerato_5', 'mafe_diseno_ucab'],
      level: '5to Año / Pre-Universitario',
      summary: 'Estrategias de descarte rápido en relaciones de causa-efecto, parte-todo y sinonimia contextual.',
      exerciseCount: 25,
      content: 'En las analogías de admisión universitaria, la relación lógica horizontal debe conservarse estrictamente en la alternativa correcta (Ejemplo: CINCEL : ESCULTOR :: PINCEL : PINTOR).',
    },
    {
      id: 3,
      subject: 'BIOLOGIA',
      subjectLabel: 'Biología',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'La Célula: Estructura, Organelos y Funciones Vitales',
      targetProfiles: ['andres_bachillerato_1'],
      level: '1er Año Bachillerato',
      summary: 'Comparativa entre célula procariota y eucariota (vegetal vs. animal). Membrana y núcleo.',
      exerciseCount: 18,
      content: 'Las mitocondrias son los centros de respiración celular y producción de ATP, mientras que los cloroplastos en células vegetales permiten la fijación de luz en glucosa mediante la fotosíntesis.',
    },
    {
      id: 4,
      subject: 'BIOLOGIA',
      subjectLabel: 'Biología',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'Genética Mendeliana y Expresión de Ácidos Nucleicos',
      targetProfiles: ['prima_bachillerato_5'],
      level: '5to Año / Pre-Universitario',
      summary: 'Leyes de Mendel, cuadros de Punnett, transcripción de ADN a ARN mensajero y síntesis proteica.',
      exerciseCount: 20,
      content: 'Primera ley de Mendel: Principio de la uniformidad de los híbridos de la primera generación filial (F1). Al cruzar dos razas puras homocigotas, el 100% de la descendencia manifiesta el alelo dominante.',
    },
    {
      id: 5,
      subject: 'QUIMICA',
      subjectLabel: 'Química',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      title: 'Estequiometría, Balanceo de Ecuaciones y Ley de Lavoisier',
      targetProfiles: ['prima_bachillerato_5', 'santiago_fisica_ucv'],
      level: '5to Año / Admisión',
      summary: 'Cálculo de masa molar, número de Avogadro, reactivo limitante y rendimiento de reacción.',
      exerciseCount: 22,
      content: 'La ley de conservación de la materia establece que la masa de los reactivos debe ser igual a la masa total de los productos: N₂ + 3H₂ → 2NH₃.',
    },
    {
      id: 6,
      subject: 'FISICA_BASICA',
      subjectLabel: 'Física Básica',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      title: 'Cinemática Unidimensional: MRU y MRUV',
      targetProfiles: ['prima_bachillerato_5', 'santiago_fisica_ucv'],
      level: 'Bachillerato & Propedéutico',
      summary: 'Ecuaciones de posición, velocidad constante, aceleración gravitatoria y caída libre.',
      exerciseCount: 30,
      latexFormula: 'x(t) = x_0 + v_0 t + \\frac{1}{2} a t^2',
      content: 'En el Movimiento Rectilíneo Uniformemente Variado (MRUV), la aceleración permanece constante en el tiempo, lo que genera una velocidad linealmente creciente o decreciente.',
    },
    {
      id: 7,
      subject: 'FISICA_AVANZADA',
      subjectLabel: 'Física Avanzada',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'Mecánica Analítica y Ecuaciones Canónicas de Hamilton',
      targetProfiles: ['santiago_fisica_ucv'],
      level: 'Nivel Universitario (UCV)',
      summary: 'Formulación en el espacio de fase mediante coordenadas generalizadas y momentos conjugados.',
      exerciseCount: 12,
      latexFormula: '\\mathcal{H}(q, p, t) = \\sum_i p_i \\dot{q}_i - \\mathcal{L}(q, \\dot{q}, t)',
      content: 'El formalismo hamiltoniano transforma un sistema de n ecuaciones diferenciales de segundo orden (Lagrange) en 2n ecuaciones diferenciales de primer orden en el espacio de fase.',
    },
    {
      id: 8,
      subject: 'MATEMATICA_BASICA',
      subjectLabel: 'Matemática Básica',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      title: 'Fracciones Equivalentes, Proporciones y Ecuaciones de 1er Grado',
      targetProfiles: ['andres_bachillerato_1'],
      level: '1er Año Bachillerato',
      summary: 'Operaciones fundamentales con números racionales, mínimo común múltiplo y despeje de x.',
      exerciseCount: 24,
      latexFormula: 'ax + b = c \\implies x = \\frac{c - b}{a}',
      content: 'Para despejar una incógnita se aplican operaciones inversas a ambos lados de la igualdad, manteniendo el equilibrio matemático de la ecuación.',
    },
    {
      id: 9,
      subject: 'MATEMATICA_AVANZADA',
      subjectLabel: 'Matemática con Vectores & Gráficas',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      title: 'Espacios Vectoriales en ℝ², Producto Escalar y Funciones Reales',
      targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
      level: 'Pre-Universitario & UCV',
      summary: 'Representación geométrica de vectores, norma euclidiana, ortogonalidad y análisis de curvas.',
      exerciseCount: 20,
      latexFormula: '\\vec{u} \\cdot \\vec{v} = ||\\vec{u}|| ||\\vec{v}|| \\cos(\\theta)',
      content: 'El producto escalar de dos vectores permite determinar el trabajo mecánico realizado por una fuerza, así como verificar si dos vectores son perpendiculares cuando el resultado es cero.',
    },
  ];

  // Filtrado según la materia seleccionada
  const filteredGuides = academicCatalog.filter((guide) => {
    if (selectedSubject === 'ALL') return true;
    return guide.subject === selectedSubject;
  });

  return (
    <div className="space-y-8">
      {/* Encabezado del Módulo de Guías */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold mb-2">
            <BookOpenIcon className="w-3.5 h-3.5" />
            Plan de Estudio Adaptativo • {user?.institution || 'Secundaria y Universidad'}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
            Guías Académicas y Banco de Ejercicios
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl">
            Material pedagógico estructurado para Castellano, Biología, Química, Física (Básica/Avanzada) y Matemática con soporte interactivo de vectores y gráficas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">
            {filteredGuides.length} guías activas
          </span>
        </div>
      </div>

      {/* Laboratorio Interactivo de Vectores y Gráficas de Funciones */}
      <VectorAndGraphInteractive />

      {/* Barra de Filtros por Materia */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Filtrar por Área de Conocimiento
        </p>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'ALL', label: 'Todas las Materias' },
            { id: 'CASTELLANO', label: 'Castellano' },
            { id: 'BIOLOGIA', label: 'Biología' },
            { id: 'QUIMICA', label: 'Química' },
            { id: 'FISICA_BASICA', label: 'Física Básica' },
            { id: 'FISICA_AVANZADA', label: 'Física Avanzada' },
            { id: 'MATEMATICA_BASICA', label: 'Matemática Básica' },
            { id: 'MATEMATICA_AVANZADA', label: 'Matemática con Vectores' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSubject(item.id as SubjectFilter)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                selectedSubject === item.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-soft-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Tarjetas de Guías y Ejercicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGuides.map((guide) => {
          const isRecommendedForUser = guide.targetProfiles.includes(academicProfile);
          return (
            <div
              key={guide.id}
              className={`app-card p-5 flex flex-col justify-between hover:border-blue-300 transition-all ${
                isRecommendedForUser ? 'ring-2 ring-blue-500/20' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${guide.badgeColor}`}>
                    {guide.subjectLabel}
                  </span>
                  {isRecommendedForUser && (
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      ★ Tu Nivel
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-900 leading-snug">{guide.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{guide.summary}</p>
                </div>

                {guide.latexFormula && (
                  <div
                    className="p-2.5 bg-slate-50 border border-slate-200/60 rounded-xl text-center text-xs font-serif text-slate-800"
                    dangerouslySetInnerHTML={{ __html: renderLatex(guide.latexFormula, true) }}
                  />
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  {guide.exerciseCount} Ejercicios Prácticos
                </span>
                <button
                  onClick={() => setActiveGuideModal(guide.id)}
                  className="btn-secondary text-xs py-1.5 px-3"
                >
                  Abrir Guía
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Lectura de la Guía */}
      {activeGuideModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          {(() => {
            const guide = academicCatalog.find((g) => g.id === activeGuideModal);
            if (!guide) return null;
            return (
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-soft-lg space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${guide.badgeColor}`}>
                      {guide.subjectLabel}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{guide.level}</span>
                  </div>
                  <button
                    onClick={() => setActiveGuideModal(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">{guide.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{guide.summary}</p>
                </div>

                {guide.latexFormula && (
                  <div
                    className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center text-slate-900 font-serif"
                    dangerouslySetInnerHTML={{ __html: renderLatex(guide.latexFormula, true) }}
                  />
                )}

                <div className="p-4 bg-slate-50/80 rounded-2xl text-sm text-slate-700 leading-relaxed border border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Concepto Fundamental & Procedimiento:
                  </h4>
                  <p>{guide.content}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                    <CheckCircleIcon className="w-4 h-4" /> Preparado para autoevaluación
                  </span>
                  <button
                    onClick={() => setActiveGuideModal(null)}
                    className="btn-primary text-xs"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
