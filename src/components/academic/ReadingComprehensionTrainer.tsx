/**
 * @file ReadingComprehensionTrainer.tsx
 * @description Entrenador de Comprensión Lectora para Exámenes de Admisión y Bachillerato.
 * Presenta textos académicos reales (ensayo filosófico, artículo científico, crítica literaria),
 * con preguntas de inferencia, idea principal, intención del autor y vocabulario contextual.
 * Proporciona análisis pedagógico con justificación de la opción correcta y descarte de distractores.
 * Función 132 del catálogo académico.
 */

import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Lightbulb } from 'lucide-react';

interface ReadingQuestion {
  id: string;
  question: string;
  type: 'Idea Principal' | 'Inferencia' | 'Vocabulario Contextual' | 'Intención del Autor';
  options: string[];
  correctIndex: number;
  explanation: string;
  distractorNotes: string;
}

interface ReadingPassage {
  id: string;
  title: string;
  category: 'Divulgación Científica' | 'Humanidades & Filosofía' | 'Historia & Sociedad';
  author: string;
  wordCount: number;
  text: string;
  questions: ReadingQuestion[];
}

const PASSAGES: ReadingPassage[] = [
  {
    id: 'p1',
    title: 'La ilusión del orden y la entropía cósmica',
    category: 'Divulgación Científica',
    author: 'Adaptación de Termodinámica & Filosofía Natural',
    wordCount: 165,
    text: `Tendemos a pensar que el universo conspira hacia la armonía y la permanencia de las formas. Sin embargo, la segunda ley de la termodinámica dicta de manera implacable que todo sistema aislado evoluciona indefectiblemente hacia un estado de máxima entropía: el desorden estadístico. La vida orgánica y las estructuras complejas no constituyen una violación mágica de esta ley, sino islas transitorias de orden que pagan su coherencia local exportando cantidades masivas de caos térmico a su entorno. El mantenimiento de un organismo vivo exige un consumo incesante de energía libre para impedir que sus moléculas se dispersen en el equilibrio inerte de la muerte térmica. Lejos de ser un estado de perfección estática, la vida es una resistencia tenaz, un torbellino temporal sostenido en la corriente descendente del flujo entrópico.`,
    questions: [
      {
        id: 'q1-1',
        question: '¿Cuál es la tesis central o idea principal sostenida por el autor?',
        type: 'Idea Principal',
        options: [
          'La vida desafía de manera definitiva y permanente las leyes de la termodinámica.',
          'El orden que caracteriza a los seres vivos es una configuración transitoria mantenida a expensas de aumentar la entropía externa.',
          'La muerte térmica del cosmos es evitada por el consumo sostenido de energía molecular.',
          'Los sistemas aislados alcanzan la armonía gracias a la interacción de fuerzas orgánicas.'
        ],
        correctIndex: 1,
        explanation: 'El texto define la vida como "islas transitorias de orden que pagan su coherencia local exportando caos térmico a su entorno", reafirmando que no viola la ley sino que opera disipando energía.',
        distractorNotes: 'La opción A contradice el texto ("no constituyen una violación mágica"). La opción C confunde la escala (la vida no evita la muerte del cosmos, solo retrasa su propio desorden).'
      },
      {
        id: 'q1-2',
        question: 'En el contexto del pasaje, ¿qué sentido asume el término "INDEFECTIBLEMENTE"?',
        type: 'Vocabulario Contextual',
        options: [
          'De modo fortuito o casual.',
          'De manera infalible e inevitable.',
          'Bajo condiciones extraordinarias.',
          'A través de aproximaciones dudosas.'
        ],
        correctIndex: 1,
        explanation: 'En el enunciado "evoluciona indefectiblemente hacia un estado de máxima entropía", el adverbio denota que el proceso no puede fallar ni evitarse, es inexorable.',
        distractorNotes: '"Fortuito" es el antónimo directo (azar). Las demás opciones sugieren contingencia cuando el autor habla de una ley física universal.'
      },
      {
        id: 'q1-3',
        question: 'A partir de la metáfora del "torbellino temporal", se puede inferir legítimamente que:',
        type: 'Inferencia',
        options: [
          'La vida se extingue instantáneamente cuando surge una perturbación exterior.',
          'Las formas vivas dependen de un dinamismo constante y cesan si se detiene el flujo energético.',
          'El caos térmico destruye inmediatamente cualquier estructura en rotación.',
          'Los torbellinos son sistemas mecánicos completamente desordenados y sin entropía.'
        ],
        correctIndex: 1,
        explanation: 'Un torbellino solo conserva su forma mientras siga fluyendo el agua o el aire; del mismo modo, la vida requiere "un consumo incesante de energía libre" para mantener su estructura.',
        distractorNotes: 'No es que se extinga instantáneamente (opción A), sino que requiere flujo continuo. Los torbellinos no carecen de entropía (opción D).'
      }
    ]
  },
  {
    id: 'p2',
    title: 'El mito de la neutralidad tecnológica',
    category: 'Humanidades & Filosofía',
    author: 'Ensayo Crítico de Epistemología Contemporánea',
    wordCount: 158,
    text: `Es común escuchar el aforismo complaciente de que las herramientas son ontológicamente neutras y que solo el uso que el ser humano hace de ellas determina su bondad o malevolencia. Este juicio ignora que ningún artefacto surge en un vacío axiológico. La tecnología no es un mero instrumento pasivo; cada dispositivo materializa una arquitectura de incentivos, privilegia ciertos modos de interacción sobre otros y prefigura los horizontes de lo pensable. Quien empuña un martillo tiende a percibir el mundo en términos de clavos, no por defecto moral, sino porque la herramienta impone un marco operativo específico. Sostener la absoluta pureza de la técnica equivale a eximir a sus creadores del examen ético de las finalidades para las que dicha tecnología fue deliberadamente optimizada.`,
    questions: [
      {
        id: 'q2-1',
        question: '¿Qué persigue fundamentalmente el autor al citar la analogía del martillo y los clavos?',
        type: 'Intención del Autor',
        options: [
          'Demostrar la ineficacia de las herramientas manuales frente a las digitales.',
          'Ilustrar que los instrumentos condicionan y sesgan activamente la perspectiva y conducta de quien los emplea.',
          'Justificar los fallos morales de los inventores a través de limitaciones materiales.',
          'Defender que cualquier objeto contundente produce consecuencias imprevistas.'
        ],
        correctIndex: 1,
        explanation: 'La metáfora sirve para evidenciar cómo la herramienta impone un "marco operativo específico" que moldea la percepción del usuario.',
        distractorNotes: 'El texto no compara herramientas manuales con digitales (opción A) ni busca justificar fallos morales (opción C).'
      },
      {
        id: 'q2-2',
        question: 'Se colige del texto que considerar a la tecnología como "axiológicamente neutra" implica:',
        type: 'Inferencia',
        options: [
          'Un análisis riguroso de las intenciones de los ingenieros.',
          'Una postura ingenua que elude la responsabilidad ética en el diseño técnico.',
          'Una verdad científica universalmente demostrada por la epistemología.',
          'El fomento indispensable del desarrollo tecnológico libre de trabas legales.'
        ],
        correctIndex: 1,
        explanation: 'El autor califica esta postura como un "aforismo complaciente" que "equivale a eximir a sus creadores del examen ético".',
        distractorNotes: 'No es una postura rigurosa ni científica (opciones A y C); el autor argumenta exactamente en contra de esa complacencia.'
      }
    ]
  }
];

export const ReadingComprehensionTrainer: React.FC = () => {
  const [selectedPassageId, setSelectedPassageId] = useState<string>('p1');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const activePassage = PASSAGES.find((p) => p.id === selectedPassageId) || PASSAGES[0];
  const activeQuestion = activePassage.questions[currentQuestionIdx];

  const handleSelectOption = (idx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: idx
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < activePassage.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setShowSummary(false);
  };

  const answeredCurrent = selectedAnswers[activeQuestion.id] !== undefined;
  const isCorrect = answeredCurrent && selectedAnswers[activeQuestion.id] === activeQuestion.correctIndex;

  // Estadísticas globales del texto
  const totalQuestions = activePassage.questions.length;
  const correctCount = activePassage.questions.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl border border-amber-100/60 shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 tracking-tight">
              Entrenador de Comprensión Lectora e Inferencia
            </h3>
            <p className="text-xs text-slate-500">
              Lectura analítica para pruebas de admisión universitaria con descarte razonado de distractores
            </p>
          </div>
        </div>

        {/* Selector de Texto */}
        <div className="flex items-center gap-2">
          {PASSAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPassageId(p.id);
                handleRestart();
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                selectedPassageId === p.id
                  ? 'bg-amber-100/70 text-amber-900 border-amber-300 font-semibold shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {p.category}
            </button>
          ))}
        </div>
      </div>

      {/* Vista Principal Dividida: Texto a la Izquierda, Preguntas a la Derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna de Texto Editorial */}
        <div className="lg:col-span-6 bg-slate-50/80 p-5 rounded-2xl border border-slate-200/70 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                {activePassage.category}
              </span>
              <h4 className="text-sm font-bold text-slate-900 font-display mt-0.5">
                {activePassage.title}
              </h4>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              {activePassage.wordCount} palabras
            </span>
          </div>

          <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700 font-serif text-justify whitespace-pre-line selection:bg-amber-200">
            {activePassage.text}
          </p>

          <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-400 italic">
            Fuente / Autoría: {activePassage.author}
          </div>
        </div>

        {/* Columna de Reactivos e Inferencia */}
        <div className="lg:col-span-6 space-y-4">
          {!showSummary ? (
            <div className="space-y-4">
              {/* Barra de Progreso de Preguntas */}
              <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                <span className="font-medium text-slate-700">
                  Pregunta {currentQuestionIdx + 1} de {totalQuestions}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600 border border-slate-200">
                  Tipo: {activeQuestion.type}
                </span>
              </div>

              {/* Enunciado */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h5 className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                  {activeQuestion.question}
                </h5>
              </div>

              {/* Opciones */}
              <div className="space-y-2">
                {activeQuestion.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[activeQuestion.id] === idx;
                  const isOptCorrect = idx === activeQuestion.correctIndex;

                  let btnStyle = 'bg-white border-slate-200 hover:border-slate-300 text-slate-700';

                  if (answeredCurrent) {
                    if (isOptCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-medium ring-1 ring-emerald-300';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-50 border-rose-300 text-rose-800 line-through';
                    } else {
                      btnStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={answeredCurrent}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 border mt-0.5 bg-slate-100 text-slate-600 border-slate-300">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explicación y Descarte de Distractores */}
              {answeredCurrent && (
                <div className={`p-4 rounded-xl border space-y-2 text-xs animate-in fade-in duration-200 ${
                  isCorrect ? 'bg-emerald-50/70 border-emerald-200' : 'bg-amber-50/70 border-amber-200'
                }`}>
                  <div className="flex items-center gap-1.5 font-semibold">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-900">¡Respuesta Correcta! Justificación:</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span className="text-rose-900">Opción Incorrecta. Razonamiento:</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {activeQuestion.explanation}
                  </p>
                  <div className="pt-2 border-t border-slate-200/50 flex items-start gap-1.5 text-[11px] text-slate-600">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Por qué se descartan las otras:</strong> {activeQuestion.distractorNotes}</span>
                  </div>
                </div>
              )}

              {/* Botón Siguiente / Concluir */}
              <div className="flex justify-end pt-2">
                <button
                  disabled={!answeredCurrent}
                  onClick={handleNext}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-xs"
                >
                  <span>{currentQuestionIdx === totalQuestions - 1 ? 'Ver Resultado' : 'Siguiente Reactivo'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Resumen de Calificación del Pasaje */
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Prueba de Lectura Concluida
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Has respondido correctamente <strong>{correctCount} de {totalQuestions}</strong> preguntas ({((correctCount / totalQuestions) * 100).toFixed(0)}%).
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 text-left space-y-1">
                <span className="font-semibold text-slate-900 block">Diagnóstico Pedagógico:</span>
                {correctCount === totalQuestions ? (
                  <p className="text-emerald-700">
                    Dominio sobresaliente del nivel inferencial y vocabulario contextual. Preparado para preguntas de alto rigor en exámenes de admisión.
                  </p>
                ) : correctCount >= 1 ? (
                  <p className="text-amber-700">
                    Buen nivel literal, pero presta especial atención a los distractores que generalizan o invierten las relaciones causales.
                  </p>
                ) : (
                  <p className="text-rose-700">
                    Se recomienda realizar una segunda lectura atenta prestando atención a los conectores de contraste como "sin embargo", "no obstante" y "lejos de".
                  </p>
                )}
              </div>

              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-all shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reintentar Lectura</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
