/**
 * @file mafe_design_theory_course.ts
 * @description Contenido oficial de la materia "Teoría del Diseño" (Semiótica, Percepción,
 * Usabilidad y Teoría del Actor-Red) para el perfil de María Fernanda Valderrama
 * (Escuela de Diseño Integral UCAB).
 *
 * Arquitectura:
 *  - Fuente única de verdad: las preguntas se definen UNA sola vez como `Question[]`
 *    (formato nativo del SimulatorEngine) y se derivan automáticamente al formato
 *    `DeconstructedQuestion[]` para la guía de 7 pilares (`DeconstructedGuideView`).
 *  - `MAFE_DESIGN_THEORY_GUIDE` reutiliza la interfaz `DeconstructedAcademicGuide`, por lo que
 *    se renderiza con el visor existente sin componentes duplicados.
 *  - Los modelos de examen se registran en `PROFILE_TAILORED_EXAMS` (lib/questionBank.ts)
 *    mediante `fixedQuestionIds`, garantizando que cada modelo lance exactamente sus reactivos.
 *
 * Autores citados en el temario: Ferdinand de Saussure, Roland Barthes, Donald Norman, Bruno Latour.
 */

import type { Question } from '../types/exam.types';
import type {
  DeconstructedAcademicGuide,
  DeconstructedQuestion,
} from '../types/deconstruction.types';

/** Perfil destino de todo este contenido (aislamiento pedagógico estricto). */
const MAFE_PROFILE = 'mafe_diseno_ucab' as const;

/** Etiquetas de capítulo reutilizadas como `topic` de cada reactivo (alimentan el desglose por tema del reporte). */
export const DESIGN_THEORY_CHAPTERS = {
  CAP1: 'Cap. 1 · Semiótica Visual',
  CAP2: 'Cap. 2 · Percepción y Emoción',
  CAP3: 'Cap. 3 · Usabilidad e Interacción',
  CAP4: 'Cap. 4 · Actor-Red y Cajas Negras',
} as const;

const { CAP1, CAP2, CAP3, CAP4 } = DESIGN_THEORY_CHAPTERS;

/**
 * Construye las 4 opciones estándar (A–D) de un reactivo de selección simple.
 * @param texts Textos de las opciones en orden A, B, C, D.
 */
function buildOptions(texts: [string, string, string, string]) {
  const letters = ['a', 'b', 'c', 'd'] as const;
  return texts.map((text, i) => ({ id: `opt-${letters[i]}`, text }));
}

// =====================================================================
// MODELO A — Simulacro oficial tipo parcial (10 reactivos del temario)
// =====================================================================
export const DESIGN_THEORY_MODEL_A: Question[] = [
  {
    id: 'mafe-td-a01',
    subject: 'Diseño',
    topic: CAP1,
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo A · Teoría del Diseño',
    questionText:
      'Cuando un usuario escucha el característico sonido de inicio de Netflix ("Tudum") desde otra habitación y sabe inmediatamente que alguien abrió la plataforma sin necesidad de ver el televisor, estamos ante un fenómeno estudiado por la semiótica como:',
    options: buildOptions([
      'Topografía natural auditiva.',
      'Un signo, ya que habla de algo que no está presente físicamente pero lo entendemos porque conocemos el código por cultura y costumbre.',
      'Ley de cierre perceptivo.',
      'Un intermediario no humano.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** El signo es una unidad de sentido que representa algo ausente físicamente y que comprendemos porque compartimos un código previo.\n\n**Resolución:** El "Tudum" remite a Netflix sin ver el logotipo gracias a la cultura y la costumbre. No es mapping (Cap. 3), ni Gestalt (Cap. 2), ni un rol de la red (Cap. 4).',
  },
  {
    id: 'mafe-td-a02',
    subject: 'Diseño',
    topic: CAP1,
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo A · Teoría del Diseño',
    questionText:
      'En el análisis semiótico de una botella de agua envasada en plástico PET transparente con tapa azul, afirmar que dicho envase transmite "pureza, frescura y salud" corresponde a:',
    options: buildOptions([
      'El significante y la denotación literal del envase.',
      'El significado culturalmente asociado, demostrando la arbitrariedad del signo (pues no hay conexión natural entre el plástico PET y la salud).',
      'El affordance físico del plástico PET.',
      'El nivel conductual de Donald Norman.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** Significante = plano material (plástico transparente, tapa azul). Significado = idea cultural que se activa en la mente.\n\n**Resolución:** "Pureza, frescura y salud" son ideas, no materia: es el significado. Como no existe vínculo natural entre el PET y la salud, el caso demuestra la arbitrariedad del signo.',
  },
  {
    id: 'mafe-td-a03',
    subject: 'Diseño',
    topic: CAP1,
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo A · Teoría del Diseño',
    questionText:
      'Según las capas de lectura de Roland Barthes, si describimos un logotipo diciendo únicamente "es una figura geométrica roja rodeada de trazos amarillos en forma de llamas", estamos realizando una lectura a nivel de:',
    options: buildOptions(['Connotación.', 'Ideología oculta.', 'Denotación.', 'Nivel reflexivo.']),
    correctOptionId: 'opt-c',
    explanation:
      '**Concepto Fundamental:** La denotación es la descripción visual, objetiva y literal, sin juicios de valor ni emociones.\n\n**Resolución:** La frase solo enumera forma, color y trazos verificables. Si dijera "transmite pasión", pasaría a ser connotación.',
  },
  {
    id: 'mafe-td-a04',
    subject: 'Diseño',
    topic: CAP1,
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo A · Teoría del Diseño',
    questionText:
      'Un diseñador industrial crea una afeitadora para hombres utilizando plástico negro mate y ángulos rectos pronunciados, y otra para mujeres usando tonos rosa pastel y bordes curvos. Según el Capítulo 1, esto ejemplifica cómo operan:',
    options: buildOptions([
      'Los códigos visuales y la ideología oculta que asocian formas y colores a construcciones culturales de género.',
      'Las leyes de figura-fondo y cercanía de la Gestalt.',
      'La topografía arbitraria de los artefactos.',
      'El cierre de cajas negras.',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      '**Concepto Fundamental:** Los artefactos reproducen estereotipos y normas sociales a través de sus códigos formales y cromáticos (ideología oculta).\n\n**Resolución:** Oscuro + ángulos rectos se asocia culturalmente a lo "masculino" (fuerza, tecnología); pastel + curvas a lo "femenino" (delicadeza). Es un código cultural, no una ley perceptiva.',
  },
  {
    id: 'mafe-td-a05',
    subject: 'Diseño',
    topic: CAP2,
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo A · Teoría del Diseño',
    questionText:
      'El logotipo de la organización WWF (un oso panda cuyas partes blancas no tienen líneas de contorno completas, pero nuestro cerebro reconstruye la silueta del animal automáticamente) se apoya principalmente en la Ley de la Gestalt denominada:',
    options: buildOptions(['Ley de Similaridad.', 'Ley de Cercanía.', 'Ley de Cierre.', 'Topografía natural.']),
    correctOptionId: 'opt-c',
    explanation:
      '**Concepto Fundamental:** La Ley de Cierre es la "trampa perceptiva" con la que la mente rellena vacíos y completa formas físicamente incompletas.\n\n**Resolución:** El contorno del panda está abierto y aun así lo vemos completo. La topografía natural pertenece al Cap. 3 (controles), no a la Gestalt.',
  },
  {
    id: 'mafe-td-a06',
    subject: 'Diseño',
    topic: CAP2,
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo A · Teoría del Diseño',
    questionText:
      'Una persona compra un termo para agua porque su color tornasolado le llamó la atención en la vitrina en menos de 3 segundos. Sin embargo, al usarlo en el gimnasio descubre que la tapa gotea y es incómodo de abrir con una sola mano. Según Donald Norman, el termo tuvo éxito en el nivel __________, pero fracasó en el nivel __________:',
    options: buildOptions([
      'Reflexivo / Visceral.',
      'Conductual / Reflexivo.',
      'Visceral / Conductual.',
      'Denotativo / Connotativo.',
    ]),
    correctOptionId: 'opt-c',
    explanation:
      '**Concepto Fundamental:** Visceral = respuesta instintiva que llama la atención a primera vista. Conductual = no importa la apariencia, sino el uso.\n\n**Resolución:** El color atrajo en menos de 3 segundos (éxito visceral); la tapa que gotea y es incómoda es una falla de uso (fracaso conductual). "Denotativo/Connotativo" son capas de Barthes, no niveles de Norman.',
  },
  {
    id: 'mafe-td-a07',
    subject: 'Diseño',
    topic: CAP3,
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo A · Teoría del Diseño',
    questionText:
      'Llegas a la puerta de vidrio de un banco que tiene una gran manilla vertical de acero inoxidable. Instintivamente la agarras y jalas hacia ti, pero no abre; entonces ves un pequeño adhesivo que dice "EMPUJE". En este caso:',
    options: buildOptions([
      'El adhesivo es el Affordance y la manilla es el Signifier.',
      'La manilla ofrece el Affordance físico de jalar, mientras que el letrero "EMPUJE" actúa como un Signifier (señal explícita) para corregir cómo debes actuar.',
      'Ambos son ejemplos de topografía natural.',
      'La puerta actúa como un actor humano regulador.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** Affordance = propiedad física real que sugiere el uso. Signifier = pista explícita añadida por el diseñador que indica dónde y cómo actuar.\n\n**Resolución:** La manilla invita a jalar (affordance) y el letrero corrige la acción (signifier). Como ambos se contradicen, es una clásica "Puerta de Norman" (mal diseño). La puerta es un actor no humano, nunca humano.',
  },
  {
    id: 'mafe-td-a08',
    subject: 'Diseño',
    topic: CAP3,
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo A · Teoría del Diseño',
    questionText:
      'En la pared de un salón de clases hay una placa con 5 interruptores exactamente iguales en fila. Para encender la luz del proyector, el profesor tiene que presionar uno por uno hasta adivinar cuál es. Este mal diseño de Mapping se conoce como:',
    options: buildOptions([
      'Topografía natural.',
      'Topografía arbitraria, porque obliga al usuario a aprender los controles a prueba y error.',
      'Ley de pregnancia.',
      'Caja negra cerrada.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** Topografía arbitraria = controles iguales, sin orden lógico ni espacial respecto a lo que controlan.\n\n**Resolución:** Los 5 interruptores idénticos no revelan qué lámpara enciende cada uno, por lo que exigen prueba y error.',
  },
  {
    id: 'mafe-td-a09',
    subject: 'Diseño',
    topic: CAP4,
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo A · Teoría del Diseño',
    questionText:
      'En la Teoría del Actor-Red (Cap. 4), un sensor de temperatura que detecta calor excesivo y traduce esa señal física en una alerta que apaga el motor de una máquina actúa como un:',
    options: buildOptions([
      'Actor humano regulador.',
      'Intermediario no humano, porque transporta algo sin cambiarlo.',
      'Mediador no humano, porque traduce y transforma lo que pasa por él.',
      'Significante denotativo.',
    ]),
    correctOptionId: 'opt-c',
    explanation:
      '**Concepto Fundamental:** Intermediario = transporta sin cambiar (entrada = salida). Mediador = traduce, transforma o modifica lo que pasa por él.\n\n**Resolución:** El sensor es un actante (no humano) y convierte "calor" en "apagar el motor": la salida es distinta de la entrada, por lo tanto es mediador.',
  },
  {
    id: 'mafe-td-a10',
    subject: 'Diseño',
    topic: CAP4,
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo A · Teoría del Diseño',
    questionText: '¿Qué significa la premisa "Diseñar es cerrar cajas negras"?',
    options: buildOptions([
      'Que todos los objetos tecnológicos deben usar colores oscuros y ángulos rectos.',
      'Hacer que un sistema interno complicado se vea y sirva como algo simple y fácil para el usuario.',
      'Obligar al usuario a usar controles a prueba y error.',
      'Separar la figura importante del fondo.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** Cerrar una caja negra es encapsular la complejidad técnica (circuitos, algoritmos, mecanismos) para que el usuario solo perciba una función simple.\n\n**Resolución:** La opción A confunde "negra" con color (es una trampa del Cap. 1); C describe topografía arbitraria y D la ley de figura-fondo.',
  },
];

// =====================================================================
// MODELO B — Casos aplicados de refuerzo (12 reactivos inéditos)
// Redactados estrictamente con las definiciones del temario oficial.
// =====================================================================
export const DESIGN_THEORY_MODEL_B: Question[] = [
  {
    id: 'mafe-td-b01',
    subject: 'Diseño',
    topic: CAP1,
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo B · Teoría del Diseño',
    questionText:
      'La ciencia que estudia cómo los objetos, las imágenes y los mensajes se comunican y transmiten significados dentro de una sociedad se denomina:',
    options: buildOptions([
      'Ergonomía.',
      'Semiótica.',
      'Teoría del Actor-Red.',
      'Psicología de la Gestalt.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** La semiótica estudia cómo se comunican y transmiten significados los objetos, imágenes y mensajes en sociedad.\n\n**Resolución:** La Gestalt estudia la organización perceptiva (Cap. 2) y la Teoría del Actor-Red las redes sociotécnicas (Cap. 4).',
  },
  {
    id: 'mafe-td-b02',
    subject: 'Diseño',
    topic: CAP1,
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo B · Teoría del Diseño',
    questionText:
      'Un perfume se vende en un frasco de vidrio negro facetado con tapa metálica dorada. Según el modelo de Saussure, ¿qué constituye el SIGNIFICANTE de este envase?',
    options: buildOptions([
      'La idea de lujo y misterio que evoca en el comprador.',
      'El vidrio negro, las facetas y la tapa dorada: todo lo que se puede ver y tocar.',
      'El estatus social que obtiene quien lo usa.',
      'La pista explícita que indica cómo abrir la tapa.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** El significante es el plano material/sensorial del signo: color, textura, material, forma, sonido.\n\n**Resolución:** "Lujo y misterio" es significado; el estatus pertenece al nivel reflexivo de Norman; y la "pista explícita" describe un Signifier de Norman (Cap. 3), no el significante de Saussure.',
  },
  {
    id: 'mafe-td-b03',
    subject: 'Diseño',
    topic: CAP1,
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo B · Teoría del Diseño',
    questionText:
      'Sobre el mismo frasco de perfume, ¿cuál de las siguientes afirmaciones es una DENOTACIÓN válida según Roland Barthes?',
    options: buildOptions([
      'Transmite elegancia nocturna.',
      'Es un cilindro de vidrio negro de 10 cm con tapa metálica dorada.',
      'Proyecta poder y seducción.',
      'Es un símbolo de exclusividad.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** La denotación solo admite datos físicos verificables; las emociones y valores son connotación.\n\n**Resolución:** Únicamente la opción B describe medidas, material y color. Las demás expresan valores culturales (connotación).',
  },
  {
    id: 'mafe-td-b04',
    subject: 'Diseño',
    topic: CAP1,
    difficulty: 'Avanzado',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo B · Teoría del Diseño',
    questionText:
      'Un estudiante escribe en su parcial: "El significante de la puerta es el letrero que dice EMPUJE". ¿Cuál es el error conceptual?',
    options: buildOptions([
      'Ninguno: el letrero es el significante en ambos autores.',
      'Confunde el Significante de Saussure (toda la parte física del objeto) con el Signifier de Norman (pista explícita que indica dónde y cómo actuar).',
      'Confunde la denotación con la connotación.',
      'Confunde al mediador con el intermediario.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** Trampa 1 del temario: Significante (Saussure, Cap. 1) ≠ Signifier (Norman, Cap. 3).\n\n**Resolución:** El letrero "EMPUJE" es un Signifier de Norman. El significante semiótico de la puerta sería toda su materialidad: vidrio, acero, forma, color.',
  },
  {
    id: 'mafe-td-b05',
    subject: 'Diseño',
    topic: CAP2,
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo B · Teoría del Diseño',
    questionText:
      'En el menú de un café, los platos y precios de cada sección están separados por poco espacio entre sí y por mucho espacio respecto a la sección siguiente. El lector percibe bloques independientes sin necesidad de líneas divisorias. ¿Qué ley de la Gestalt se aplica?',
    options: buildOptions(['Ley de Cercanía.', 'Ley de Similaridad.', 'Ley de Cierre.', 'Ley de Pregnancia.']),
    correctOptionId: 'opt-a',
    explanation:
      '**Concepto Fundamental:** Ley de Cercanía (Proximidad): agrupamos como un mismo conjunto los elementos ubicados cerca entre sí.\n\n**Resolución:** Es el espacio (no el color ni la forma) lo que crea los grupos, por eso no es similaridad.',
  },
  {
    id: 'mafe-td-b06',
    subject: 'Diseño',
    topic: CAP2,
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo B · Teoría del Diseño',
    questionText:
      'En un tablero de control, todos los botones de emergencia son rojos y redondos, y el resto son grises y cuadrados, aunque están mezclados en el panel. El usuario agrupa mentalmente los rojos como una misma familia. ¿Qué ley explica este fenómeno?',
    options: buildOptions([
      'Ley de Cercanía.',
      'Ley de Figura-Fondo.',
      'Ley de Similaridad.',
      'Topografía arbitraria.',
    ]),
    correctOptionId: 'opt-c',
    explanation:
      '**Concepto Fundamental:** Ley de Similaridad (Semejanza): agrupamos los elementos que se parecen en color, forma, tamaño o textura.\n\n**Resolución:** Los botones están mezclados (no hay cercanía), pero comparten color y forma: es similaridad.',
  },
  {
    id: 'mafe-td-b07',
    subject: 'Diseño',
    topic: CAP2,
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo B · Teoría del Diseño',
    questionText:
      'Un afiche de concierto presenta el nombre de la banda en gran tamaño y alto contraste sobre un fondo oscuro. ¿Qué describe mejor el comportamiento del ojo del espectador en los primeros 3 segundos?',
    options: buildOptions([
      'Lee todo el texto de forma lineal y continua, de arriba hacia abajo.',
      'Da saltos rápidos y hace pausas estratégicas (fijaciones) sobre los elementos de mayor jerarquía, como el nombre de la banda.',
      'Ignora la figura y se concentra primero en el fondo oscuro.',
      'Completa las letras incompletas mediante la Ley de Cierre.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** El escaneo visual no es lineal: los ojos saltan y se detienen en fijaciones. Un diseño efectivo comunica su jerarquía en los primeros 3 segundos.\n\n**Resolución:** El nombre grande y contrastado es la figura que recibe la fijación; el fondo oscuro es contexto (Figura-Fondo).',
  },
  {
    id: 'mafe-td-b08',
    subject: 'Diseño',
    topic: CAP2,
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo B · Teoría del Diseño',
    questionText:
      'Una persona paga mucho más por un reloj de una marca de lujo, aunque marca la misma hora que uno económico, porque le hace sentir orgullo y comunica su estatus. Según Donald Norman, la decisión se explica por el nivel:',
    options: buildOptions(['Visceral.', 'Conductual.', 'Reflexivo.', 'Denotativo.']),
    correctOptionId: 'opt-c',
    explanation:
      '**Concepto Fundamental:** El nivel reflexivo transmite un mensaje o gesto: significado intelectual, orgullo de posesión, estatus y valores personales.\n\n**Resolución:** La función (dar la hora) es igual en ambos, así que no es conductual; lo decisivo es el mensaje de estatus.',
  },
  {
    id: 'mafe-td-b09',
    subject: 'Diseño',
    topic: CAP3,
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo B · Teoría del Diseño',
    questionText:
      'En una cocina, las cuatro perillas están dispuestas en el mismo patrón cuadrado que las cuatro hornillas, de modo que cada perilla corresponde a la hornilla ubicada en su misma posición. Este diseño de Mapping es:',
    options: buildOptions([
      'Topografía arbitraria, porque las perillas son todas iguales.',
      'Topografía natural, porque el control imita la disposición espacial de aquello que controla.',
      'Un affordance de empuje.',
      'Una caja negra abierta.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** Topografía natural: el mando imita la forma o la disposición espacial de lo que controla, y su uso es inmediato.\n\n**Resolución:** Aunque las perillas sean iguales, su ubicación replica la de las hornillas, lo que elimina la prueba y error.',
  },
  {
    id: 'mafe-td-b10',
    subject: 'Diseño',
    topic: CAP3,
    difficulty: 'Básico',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo B · Teoría del Diseño',
    questionText:
      'Una placa plana de metal colocada en una puerta, sin ningún letrero, hace que el usuario la empuje de forma natural. Esa placa es un ejemplo de:',
    options: buildOptions([
      'Signifier, porque es una señal escrita añadida por el diseñador.',
      'Affordance, porque es una propiedad física real que comunica intuitivamente cómo usar el objeto.',
      'Topografía arbitraria.',
      'Connotación cultural.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** Affordance = propiedad física real que indica de forma natural cómo se usa un objeto según las capacidades del cuerpo humano.\n\n**Resolución:** No hay texto ni ícono (no es signifier): la propia forma plana invita a empujar.',
  },
  {
    id: 'mafe-td-b11',
    subject: 'Diseño',
    topic: CAP4,
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo B · Teoría del Diseño',
    questionText:
      'Un cable USB transmite los archivos de una cámara a la computadora exactamente como estaban, sin alterarlos. En la Teoría del Actor-Red, el cable actúa como:',
    options: buildOptions([
      'Mediador, porque traduce los archivos.',
      'Intermediario, porque transporta algo sin cambiarlo (entrada = salida).',
      'Actor humano.',
      'Regulador de la red.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** Intermediario = transporta sin cambiar; es predecible y neutro.\n\n**Resolución:** Lo que entra (archivos) es igual a lo que sale. Si el cable comprimiera o convirtiera los archivos, sería mediador.',
  },
  {
    id: 'mafe-td-b12',
    subject: 'Diseño',
    topic: CAP4,
    difficulty: 'Intermedio',
    targetProfiles: [MAFE_PROFILE],
    sourceExam: 'Modelo B · Teoría del Diseño',
    questionText:
      'En la red sociotécnica de un semáforo inteligente (sensor de tráfico, cámara, software, conductores, ingeniero y la autoridad de tránsito), ¿cuál de los siguientes es un ACTOR HUMANO según Latour?',
    options: buildOptions([
      'El sensor de tráfico.',
      'La autoridad de tránsito que crea las normas (regulador).',
      'El software que controla los tiempos.',
      'La cámara que detecta los vehículos.',
    ]),
    correctOptionId: 'opt-b',
    explanation:
      '**Concepto Fundamental:** Actores humanos = personas o instituciones (diseñador, usuario, regulador). Actores no humanos (actantes) = objetos, tecnologías o sistemas que condicionan el comportamiento.\n\n**Resolución:** El sensor, el software y la cámara son actantes; la autoridad que dicta normas es el regulador humano.',
  },
];

/** Banco completo de la materia (Modelo A + Modelo B), consumido por `QUESTION_BANK`. */
export const DESIGN_THEORY_QUESTIONS: Question[] = [
  ...DESIGN_THEORY_MODEL_A,
  ...DESIGN_THEORY_MODEL_B,
];

/**
 * Adapta reactivos nativos (`Question`) al formato de la guía de 7 pilares (`DeconstructedQuestion`).
 * Evita duplicar el contenido: el texto de la opción correcta se resuelve desde `correctOptionId`.
 */
function toDeconstructedQuestions(questions: Question[]): DeconstructedQuestion[] {
  return questions.map((q) => ({
    area: 'Diseño · Teoría del Diseño',
    tema: q.topic,
    tipo: 'opcion_multiple',
    pregunta: q.questionText,
    opciones: q.options.map((o) => o.text),
    correcta: q.options.find((o) => o.id === q.correctOptionId)?.text ?? q.options[0].text,
    justificacion: q.explanation,
  }));
}

// =====================================================================
// GUÍA DE 7 PILARES — Teoría del Diseño (renderizada por DeconstructedGuideView)
// =====================================================================
export const MAFE_DESIGN_THEORY_GUIDE: DeconstructedAcademicGuide = {
  id: 'mafe-design-theory-official',
  userId: MAFE_PROFILE,
  sourceType: 'topic_prompt',
  discipline: 'design',
  createdAt: '2026-11-01T00:00:00.000Z',
  guideMetadata: {
    title: 'Teoría del Diseño: Semiótica, Percepción, Usabilidad y Actor-Red',
    area: 'Diseño · Teoría del Diseño',
    summary:
      'Temario oficial deconstruido en 4 capítulos: cómo HABLAN (Saussure, Barthes), cómo LLAMAN LA ATENCIÓN (Gestalt, Norman emocional), cómo ORIENTAN (affordance, signifier, mapping) y en qué REDES viven los artefactos (Latour, cajas negras). Incluye método de 4 pasos para casos, trampas de examen y 2 modelos de parcial.',
  },

  // PILAR 1 — Teoría por capítulos (se renderiza con saltos de línea preservados)
  phenomenonAndTheory: [
    '**CAPÍTULO 1 · ¿Cómo hablan los artefactos de diseño? (Semiótica Visual)**',
    'Los objetos cotidianos no solo cumplen una función material: son vehículos de comunicación que transmiten valores, estatus e instrucciones culturales.',
    '• **Semiótica:** ciencia que estudia cómo los objetos, imágenes y mensajes se comunican y transmiten significados dentro de una sociedad.',
    '• **Signo:** unidad de sentido que representa algo que no está presente físicamente, pero que comprendemos porque compartimos un código previo. *Ej.: el "Tudum" de Netflix se reconoce sin ver el logo, por cultura y costumbre.*',
    '• **Significante (Saussure · plano material):** todo lo que se ve, toca o escucha: color, textura, material, forma, sonido.',
    '• **Significado (Saussure · plano mental):** la idea o costumbre cultural que se activa de inmediato al percibir el significante.',
    '• **Arbitrariedad del signo:** no existe conexión natural entre el material (significante) y el concepto (significado); es un acuerdo cultural aprendido. *Ej.: botella PET transparente con tapa azul → "pureza, frescura, salud".*',
    '• **Denotación (Barthes · nivel literal):** descripción objetiva de lo que el objeto es físicamente. *Ej.: corazón rojo con llamas.*',
    '• **Connotación (Barthes · nivel simbólico):** lectura cultural y emocional de esa forma. *Ej.: ese corazón connota "pasión" o "amor intenso".*',
    '• **Código:** reglas visuales y culturales implícitas que permiten interpretar un signo en un contexto.',
    '• **Ideología oculta:** los artefactos reproducen estereotipos mediante códigos formales y cromáticos. *Ej.: oscuro + ángulos rectos = "masculino"; pastel + curvas = "femenino".*',
    '',
    '**CAPÍTULO 2 · ¿Cómo llaman la atención? (Percepción y Emoción)**',
    'Antes de leer o interactuar, el cerebro procesa estímulos visuales e instintivos en fracciones de segundo.',
    '• **Leyes de la Gestalt:** explican cómo el cerebro organiza automáticamente lo que ve.',
    '   – **Cercanía:** agrupamos lo que está cerca.',
    '   – **Similaridad:** agrupamos lo que se parece (color, forma, tamaño, textura).',
    '   – **Cierre:** la mente completa formas incompletas ("trampa perceptiva").',
    '   – **Pregnancia (buena forma):** preferimos la estructura más simple, simétrica y estable.',
    '   – **Figura-Fondo:** separamos lo importante (figura) del contexto (fondo).',
    '• **Escaneo visual y regla de los 3 segundos:** el ojo no lee de forma lineal; salta y hace pausas llamadas **fijaciones**. Un buen diseño comunica su jerarquía en los primeros 3 segundos.',
    '• **3 niveles del diseño emocional (Norman):**',
    '   – **Visceral:** respuesta automática e instintiva; lo que atrae a primera vista (colores, brillos, formas).',
    '   – **Conductual:** no importa la apariencia, sino el uso (funcionalidad, usabilidad, comodidad).',
    '   – **Reflexivo:** transmite un mensaje o gesto (orgullo, estatus, memoria afectiva, valores).',
    '',
    '**CAPÍTULO 3 · ¿Cómo me orientan? (Usabilidad e Interacción · Norman)**',
    '• **Affordance (prestación):** propiedad física real que indica de forma natural cómo usar el objeto. *Ej.: silla → sentarse; placa plana → empujar; tirador → jalar.*',
    '• **Signifier (señalizador):** pista explícita (visual, textual o sonora) añadida por el diseñador que indica dónde y cómo actuar, sobre todo cuando el affordance es ambiguo. *Ej.: letrero "Empuje".*',
    '• **Mapping (topografía de controles):** relación espacial entre los controles y su efecto. *Ej.: perillas vs. hornillas de una cocina.*',
    '   – **Topografía natural:** el mando imita la forma o disposición de lo que controla. *Ej.: botón con forma de asiento de auto.*',
    '   – **Topografía arbitraria:** controles iguales y sin orden lógico; obligan a prueba y error. *Ej.: hilera de interruptores idénticos.*',
    '',
    '**CAPÍTULO 4 · Teoría del Actor-Red (Latour) y Cajas Negras**',
    'El diseño no ocurre en el vacío: personas y artefactos forman redes sociotécnicas y se influyen mutuamente (simetría humano / no humano).',
    '• **Actores humanos:** diseñador, usuario, regulador (quien crea normas).',
    '• **Actores no humanos (actantes):** objetos, tecnologías o sistemas que condicionan la conducta. *Ej.: sensor de temperatura, código de barras.*',
    '• **Intermediario:** transporta sin cambiar (entrada = salida; predecible y neutro).',
    '• **Mediador:** traduce, transforma o modifica lo que pasa por él.',
    '• **Cajas negras:** "Diseñar es cerrar cajas negras": hacer que algo técnicamente complejo se vea y sirva como algo simple. Si funciona bien, la complejidad interna queda invisible.',
  ].join('\n'),

  // PILAR 2 — Glosario (symbolOrUnit = autor / capítulo de referencia)
  glossary: [
    { term: 'Semiótica', symbolOrUnit: 'Cap. 1', definition: 'Ciencia que estudia cómo los objetos, imágenes y mensajes se comunican y transmiten significados en una sociedad.' },
    { term: 'Signo', symbolOrUnit: 'Cap. 1', definition: 'Unidad de sentido que representa algo ausente físicamente y que entendemos porque compartimos un código previo.' },
    { term: 'Significante', symbolOrUnit: 'Saussure', definition: 'Plano material/sensorial del signo: color, textura, material, forma o sonido.' },
    { term: 'Significado', symbolOrUnit: 'Saussure', definition: 'Idea, concepto o costumbre cultural que se activa en la mente al percibir el significante.' },
    { term: 'Arbitrariedad del signo', symbolOrUnit: 'Saussure', definition: 'No hay conexión natural entre significante y significado; es un acuerdo cultural aprendido.' },
    { term: 'Denotación', symbolOrUnit: 'Barthes', definition: 'Nivel literal: descripción objetiva y verificable del objeto, sin juicios ni emociones.' },
    { term: 'Connotación', symbolOrUnit: 'Barthes', definition: 'Nivel simbólico: representación cultural, subjetiva y emocional asociada a la forma literal.' },
    { term: 'Código', symbolOrUnit: 'Cap. 1', definition: 'Reglas visuales y culturales implícitas que permiten interpretar un signo en un contexto.' },
    { term: 'Ideología oculta', symbolOrUnit: 'Cap. 1', definition: 'Estereotipos o normas sociales que los artefactos reproducen mediante sus códigos formales y cromáticos.' },
    { term: 'Leyes de la Gestalt', symbolOrUnit: 'Cap. 2', definition: 'Principios con los que el cerebro organiza automáticamente lo visual: cercanía, similaridad, cierre, pregnancia y figura-fondo.' },
    { term: 'Fijaciones', symbolOrUnit: 'Cap. 2', definition: 'Pausas estratégicas del ojo durante el escaneo visual; el diseño debe comunicar su jerarquía en 3 segundos.' },
    { term: 'Nivel visceral / conductual / reflexivo', symbolOrUnit: 'Norman', definition: 'Instinto y atracción inmediata / uso y funcionalidad / mensaje, estatus y valores.' },
    { term: 'Affordance', symbolOrUnit: 'Norman', definition: 'Propiedad física real que comunica de forma natural cómo se usa un objeto.' },
    { term: 'Signifier', symbolOrUnit: 'Norman', definition: 'Pista explícita añadida por el diseñador que indica dónde y cómo actuar.' },
    { term: 'Mapping', symbolOrUnit: 'Norman', definition: 'Organización espacial de los controles respecto a su efecto: topografía natural o arbitraria.' },
    { term: 'Actante', symbolOrUnit: 'Latour', definition: 'Actor no humano (objeto, tecnología, sistema) que ejerce acción o condiciona conductas en la red.' },
    { term: 'Intermediario / Mediador', symbolOrUnit: 'Latour', definition: 'Transporta sin cambiar / traduce y transforma lo que pasa por él.' },
    { term: 'Caja negra', symbolOrUnit: 'Latour', definition: 'Artefacto cuya complejidad interna queda oculta tras una función simple para el usuario.' },
  ],

  // PILAR 3 — Modelos teóricos expresados como "ecuaciones conceptuales" + mnemotecnias
  formulasAndStrategies: {
    coreFormulas: [
      {
        name: 'Modelo del Signo (Saussure)',
        latex: '$$\\text{Signo} = \\text{Significante (material)} + \\text{Significado (mental)}$$',
        application: 'Úsalo para abrir el Paso 1 de cualquier caso: primero lista lo físico, luego la idea cultural que activa.',
      },
      {
        name: 'Capas de Lectura (Barthes)',
        latex: '$$\\text{Denotación (literal)} \\rightarrow \\text{Connotación (cultural)}$$',
        application: 'Describe siempre primero lo verificable (medidas, material, color) y solo después las emociones o valores.',
      },
      {
        name: 'Diseño Emocional (Norman)',
        latex: '$$\\text{Experiencia} = \\text{Visceral} + \\text{Conductual} + \\text{Reflexivo}$$',
        application: 'Evalúa cada nivel por separado: un objeto puede triunfar en uno y fracasar en otro (caso del termo).',
      },
      {
        name: 'Orientación del Usuario (Norman)',
        latex: '$$\\text{Uso intuitivo} = \\text{Affordance} + \\text{Signifier} + \\text{Mapping}$$',
        application: 'Si el affordance basta, sobran letreros. Si affordance y signifier se contradicen, es una "Puerta de Norman".',
      },
      {
        name: 'Roles en la Red (Latour)',
        latex: '$$\\text{Intermediario: entrada} = \\text{salida} \\qquad \\text{Mediador: entrada} \\neq \\text{salida}$$',
        application: 'Pregúntate: ¿lo que sale es igual a lo que entró? Si cambia, es mediador.',
      },
    ],
    mnemonicsAndPatterns: [
      'SIGNIFICANTE = lo que Siento con los sentidos · SIGNIFICADO = lo que se Despierta en mi mente.',
      'Denotación = Datos (D-D) · Connotación = Cultura y Corazón (C-C).',
      'Affordance = lo que el objeto Ofrece por sí mismo · Signifier = lo que el diseñador Señala.',
      'Norman emocional V-C-R: Veo (visceral) → Consigo usarlo (conductual) → Represento algo (reflexivo).',
      'Intermediario = Igual (I-I) · Mediador = Modifica (M-M).',
      'Cierre = completo lo que FALTA · Pregnancia = elijo lo más SIMPLE.',
      'Topografía Natural = Nace de la forma de lo que controla · Arbitraria = Adivinar a prueba y error.',
    ],
  },

  // PILAR 4 — Método de 4 pasos + casos resueltos
  stepByStepExamples: [
    {
      title: 'Método de 4 pasos para resolver cualquier caso de examen',
      problemStatement:
        'En el parcial te piden "Analiza el objeto X" (una cafetera, un envase de perfume, una puerta de centro comercial…). Aplica esta plantilla en orden para cubrir los 4 capítulos.',
      deductiveSteps: [
        '**Paso 1 · Deconstrucción semiótica (Cap. 1):** identifica el Significante (materiales, colores, ángulos/curvas) y el Significado cultural. Separa Denotación (lo literal) de Connotación (emociones/valores). Señala si hay Arbitrariedad o Ideología oculta.',
        '**Paso 2 · Diagnóstico perceptivo y emocional (Cap. 2):** indica qué leyes Gestalt aplican (Cercanía, Similaridad, Cierre, Pregnancia, Figura-Fondo), dónde caen las fijaciones en los primeros 3 segundos, y desglosa los niveles Visceral, Conductual y Reflexivo.',
        '**Paso 3 · Auditoría de orientación (Cap. 3):** ¿se explica solo con su Affordance o necesita Signifiers? Clasifica los controles como Topografía Natural o Arbitraria.',
        '**Paso 4 · Mapeo de la red (Cap. 4):** lista actores Humanos y No Humanos, decide si el artefacto es Intermediario o Mediador, y explica cómo se cerró la caja negra.',
      ],
      finalResult: 'Respuesta completa = 4 bloques (Semiótica → Percepción → Usabilidad → Red), cada uno con su vocabulario técnico.',
    },
    {
      title: 'Caso resuelto: puerta de vidrio de un centro comercial',
      problemStatement:
        'Puerta de vidrio templado con una manilla vertical cilíndrica de acero inoxidable y un adhesivo pequeño que dice "EMPUJE". Tiene un sensor que la bloquea al cerrar el local.',
      deductiveSteps: [
        '**Cap. 1:** Significante = vidrio transparente, acero brillante, líneas rectas. Denotación: "panel de vidrio con barra metálica vertical". Connotación: modernidad, limpieza, apertura y acceso.',
        '**Cap. 2:** Figura-Fondo: la manilla metálica es la figura que recibe la primera fijación sobre el fondo transparente. Visceral: atractiva y limpia. Conductual: falla, porque el usuario jala y la puerta no abre.',
        '**Cap. 3:** La manilla cilíndrica ofrece el Affordance de jalar; el adhesivo "EMPUJE" es un Signifier que lo contradice → "Puerta de Norman" (mal diseño). Solución: sustituir la manilla por una placa plana de empuje.',
        '**Cap. 4:** Humanos: diseñador, usuario, administración del centro (regulador de horarios). No humano: el sensor de bloqueo, que actúa como Mediador porque traduce "hora de cierre" en "puerta bloqueada".',
      ],
      finalResult: 'Diagnóstico: éxito visceral, fracaso conductual por contradicción affordance–signifier; sensor = mediador no humano.',
    },
    {
      title: 'Caso resuelto: cafetera de cápsulas de un solo botón',
      problemStatement:
        'Cafetera compacta de plástico negro brillante con detalles cromados, un único botón circular iluminado y un compartimento con la silueta de una cápsula. Internamente tiene bomba de presión, calentador y sensores.',
      deductiveSteps: [
        '**Cap. 1:** Significante = plástico negro brillante, cromo, formas compactas. Connotación: sofisticación, rapidez, "café de barista en casa". Arbitrariedad: el negro brillante no tiene vínculo natural con un café de calidad; es un acuerdo cultural.',
        '**Cap. 2:** Pregnancia: forma simple y simétrica fácil de entender. Visceral: el brillo atrae en la tienda. Conductual: un solo botón, uso cómodo. Reflexivo: estatus de "tener una cafetera de diseño".',
        '**Cap. 3:** El compartimento con forma de cápsula es un Affordance (solo encaja de una manera). El botón iluminado funciona como Signifier (indica dónde y cuándo actuar). Mapping simple: 1 botón = 1 acción.',
        '**Cap. 4:** La cafetera es Mediadora: transforma cápsula + agua en un espresso. El diseño cerró la caja negra: bomba, calentador y sensores quedan invisibles tras un solo botón.',
      ],
      finalResult: 'Diagnóstico: éxito en los 3 niveles de Norman y caja negra perfectamente cerrada.',
    },
  ],

  // PILAR 5 — Trampas frecuentes de examen
  commonErrorsAlerts: [
    {
      trap: '**Trampa 1:** confundir el Significante de Saussure (Cap. 1) con el Signifier de Donald Norman (Cap. 3).',
      correction: 'Significante (Saussure) = TODA la parte física del objeto (ej.: plástico transparente y tapa azul). Signifier (Norman) = pista explícita que indica dónde y cómo actuar (ej.: cartel "Empuje").',
    },
    {
      trap: '**Trampa 2:** confundir Affordance con Signifier.',
      correction: 'Un tirador cilíndrico que invita a jalar es Affordance. La calcomanía "Empuje" pegada en esa misma puerta es Signifier, y como contradice al affordance es una "Puerta de Norman" (mal diseño).',
    },
    {
      trap: '**Trampa 3:** confundir Denotación con Connotación.',
      correction: 'Si describes emociones ("transmite elegancia, pasión, pureza") es Connotación o Significado. La Denotación solo admite datos verificables ("cilindro de vidrio negro de 10 cm").',
    },
    {
      trap: '**Trampa 4:** confundir Intermediario con Mediador.',
      correction: 'Intermediario = transporta sin cambiar. Mediador = traduce y transforma lo que pasa por él. Pregunta clave: ¿la salida es igual a la entrada?',
    },
    {
      trap: '**Trampa 5:** confundir la Ley de Cierre con la Ley de Pregnancia.',
      correction: 'Cierre = la mente completa una forma incompleta (logo de WWF). Pregnancia = el cerebro prefiere la forma más simple, simétrica y estable.',
    },
  ],

  // PILAR 6 — Técnicas de estudio
  studyTechniquesHub: {
    activeRecallFlashcards: [
      { front: '¿Por qué entendemos un Signo si lo que representa no está presente físicamente?', back: 'Porque conocemos el código por cultura y costumbre (ej.: el sonido "Tudum" de Netflix).' },
      { front: '¿Qué es la Arbitrariedad del signo y cuál es su ejemplo clásico?', back: 'No hay conexión natural entre el material del objeto y lo que significa. Ej.: botella PET transparente con tapa azul (significante) = "pureza, frescura y salud" (significado).' },
      { front: 'Diferencia entre Denotación y Connotación según Roland Barthes', back: 'Denotación: descripción visual literal (corazón rojo con fuego). Connotación: representación cultural y emocional (pasión, amor intenso).' },
      { front: '¿Qué es un Código y qué es la Ideología oculta?', back: 'Código: reglas visuales y culturales implícitas para interpretar un signo. Ideología oculta: estereotipos que el objeto reproduce con sus formas y colores (oscuro/recto = "masculino"; pastel/curvo = "femenino").' },
      { front: '¿Cuál es la diferencia entre la Ley de Cierre y la Ley de Pregnancia (Gestalt)?', back: 'Cierre: trampa mental para completar formas incompletas. Pregnancia: preferencia del cerebro por la forma más simple y fácil de entender.' },
      { front: '¿Qué son las fijaciones en el escaneo visual?', back: 'Las pausas que hacen nuestros ojos al ver algo durante los primeros 3 segundos; el ojo salta, no lee de forma lineal.' },
      { front: 'Resume los 3 Niveles de Donald Norman en una frase cada uno', back: 'Visceral: respuesta automática e instintiva que llama la atención. Conductual: no importa la apariencia, sino el uso. Reflexivo: transmite un mensaje o gesto.' },
      { front: 'Diferencia entre Affordance y Signifier (con ejemplo de puerta)', back: 'Affordance: propiedad física real que indica cómo usar el objeto (placa = empujar; tirador = jalar). Signifier: señal explícita que dice dónde y cómo actuar (letrero "Empuje").' },
      { front: 'Topografía Natural vs. Topografía Arbitraria (Mapping)', back: 'Natural: el mando imita la forma de lo que controla (botón con forma de asiento de auto). Arbitraria: controles iguales sin orden lógico, obligan a prueba y error (hilera de interruptores idénticos).' },
      { front: 'Intermediario vs. Mediador (Latour)', back: 'Intermediario: transporta sin cambiar (entrada = salida). Mediador: traduce o transforma lo que pasa por él (sensor que convierte calor en apagado del motor).' },
      { front: '¿Qué significa que "Diseñar es cerrar cajas negras"?', back: 'Hacer que algo técnico y complicado se vea y sirva como algo simple y fácil para el usuario.' },
    ],
    cornellSynthesis: {
      cues: [
        '¿Cómo HABLA el objeto? (Saussure, Barthes)',
        '¿Cómo LLAMA LA ATENCIÓN? (Gestalt, 3 segundos)',
        '¿Qué SIENTO al verlo, usarlo y poseerlo? (Norman)',
        '¿Cómo me ORIENTA? (Affordance, Signifier, Mapping)',
        '¿En qué RED vive? (Latour, cajas negras)',
      ],
      notes: [
        'Signo = Significante (material) + Significado (mental); su relación es arbitraria y cultural.',
        'Denotación = literal y verificable; Connotación = emoción y cultura. Los códigos pueden esconder ideología.',
        'Gestalt: Cercanía, Similaridad, Cierre, Pregnancia, Figura-Fondo. El ojo hace fijaciones; el diseño gana o pierde en 3 segundos.',
        'Norman emocional: Visceral (atracción) · Conductual (uso) · Reflexivo (mensaje/estatus).',
        'Affordance = lo físico sugiere el uso; Signifier = pista explícita; Mapping natural vs. arbitrario.',
        'Actores humanos y no humanos (actantes); Intermediario no cambia, Mediador traduce; diseñar es cerrar cajas negras.',
      ],
      summary:
        'Un artefacto de diseño comunica (semiótica), seduce (percepción y emoción), guía (usabilidad) y actúa dentro de una red (Latour). Para el examen: analiza siempre en ese orden y vigila las 5 trampas conceptuales.',
    },
    conceptMapNodes: [
      'TEORÍA DEL DISEÑO',
      '├── Cap. 1 · Semiótica (¿cómo HABLA?)',
      '│   ├── Signo → Significante + Significado → Arbitrariedad',
      '│   ├── Barthes → Denotación → Connotación',
      '│   └── Código → Ideología oculta',
      '├── Cap. 2 · Percepción (¿cómo LLAMA LA ATENCIÓN?)',
      '│   ├── Gestalt → Cercanía · Similaridad · Cierre · Pregnancia · Figura-Fondo',
      '│   ├── Escaneo visual → Fijaciones → Regla de 3 segundos',
      '│   └── Norman → Visceral · Conductual · Reflexivo',
      '├── Cap. 3 · Usabilidad (¿cómo ORIENTA?)',
      '│   ├── Affordance (propiedad física)',
      '│   ├── Signifier (pista explícita)',
      '│   └── Mapping → Natural · Arbitrario',
      '└── Cap. 4 · Actor-Red (¿en qué RED vive?)',
      '    ├── Actores → Humanos · No humanos (actantes)',
      '    ├── Roles → Intermediario · Mediador',
      '    └── Cajas negras → complejidad oculta tras simplicidad',
    ].join('\n'),
  },

  // PILAR 7 — Autoevaluación (derivada del banco único: Modelo A + Modelo B)
  generatedQuestions: toDeconstructedQuestions(DESIGN_THEORY_QUESTIONS),
};
