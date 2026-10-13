import type { Question } from '../types/exam.types';

/**
 * Banco Integral de Preguntas Académicas Reales
 * Modelos de evaluación de Bachillerato y Carreras Universitarias (Ciencias e Ingeniería)
 * Estructurado con fórmulas matemáticas en LaTeX delimitadas con $...$ para compilación limpia.
 */
export const QUESTION_BANK: Question[] = [
  // ==========================================
  // 1. MATEMÁTICA - UNIVERSITARIO & ANALÍTICO
  // ==========================================
  {
    id: 'mat-univ-001',
    subject: 'Matemática',
    topic: 'Cálculo Diferencial (Derivadas)',
    difficulty: 'Avanzado',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Calcula la derivada de primer orden $f\'(x)$ para la función $f(x) = x^3 \\cdot e^{2x}$ aplicando la regla del producto:',
    latexFormula: 'f(x) = x^3 e^{2x}',
    options: [
      { id: 'opt-a', text: '$f\'(x) = 3x^2 e^{2x}$' },
      { id: 'opt-b', text: '$f\'(x) = x^2 e^{2x} (3 + 2x)$' },
      { id: 'opt-c', text: '$f\'(x) = 6x^2 e^{2x}$' },
      { id: 'opt-d', text: '$f\'(x) = x^3 e^{2x} + 3x^2$' },
    ],
    correctOptionId: 'opt-b',
    explanation: 'Aplicando la regla del producto $(uv)\' = u\'v + uv\'$: siendo $u = x^3 \\implies u\' = 3x^2$, y $v = e^{2x} \\implies v\' = 2e^{2x}$. Obtenemos: $f\'(x) = 3x^2 e^{2x} + x^3 (2e^{2x}) = x^2 e^{2x}(3 + 2x)$.',
    explanationLatex: 'f\'(x) = 3x^2 e^{2x} + 2x^3 e^{2x} = x^2 e^{2x}(3 + 2x)',
  },
  {
    id: 'mat-univ-002',
    subject: 'Matemática',
    topic: 'Álgebra Lineal & Vectores en R³',
    difficulty: 'Avanzado',
    targetProfiles: ['santiago_fisica_ucv'],
    questionText: 'Dados los vectores $\\vec{u} = (2, -1, 3)$ y $\\vec{v} = (1, 4, -2)$ en $\\mathbb{R}^3$, calcula su producto escalar (producto punto) $\\vec{u} \\cdot \\vec{v}$:',
    latexFormula: '\\vec{u} \\cdot \\vec{v} = u_x v_x + u_y v_y + u_z v_z',
    options: [
      { id: 'opt-a', text: '$-8$' },
      { id: 'opt-b', text: '$4$' },
      { id: 'opt-c', text: '$-4$' },
      { id: 'opt-d', text: '$12$' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'El producto escalar se calcula sumando el producto de cada componente cartesiana: $\\vec{u} \\cdot \\vec{v} = (2)(1) + (-1)(4) + (3)(-2) = 2 - 4 - 6 = -8$.',
    explanationLatex: '\\vec{u} \\cdot \\vec{v} = 2(1) + (-1)(4) + 3(-2) = 2 - 4 - 6 = -8',
  },
  {
    id: 'mat-univ-003',
    subject: 'Matemática',
    topic: 'Cálculo Integral (Integrales Inmediatas)',
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Resuelve la integral indefinida $\\int (4x^3 - 6x + 5)\\,dx$:',
    latexFormula: '\\int (4x^3 - 6x + 5)\\,dx',
    options: [
      { id: 'opt-a', text: '$x^4 - 3x^2 + 5x + C$' },
      { id: 'opt-b', text: '$12x^2 - 6 + C$' },
      { id: 'opt-c', text: '$4x^4 - 6x^2 + 5x + C$' },
      { id: 'opt-d', text: '$x^4 - 6x^2 + C$' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Integrando término a término mediante la regla de la potencia $\\int x^n dx = \\frac{x^{n+1}}{n+1}$: $4\\frac{x^4}{4} - 6\\frac{x^2}{2} + 5x + C = x^4 - 3x^2 + 5x + C$.',
    explanationLatex: '\\int (4x^3 - 6x + 5)\\,dx = x^4 - 3x^2 + 5x + C',
  },

  // ==========================================
  // 2. MATEMÁTICA - BACHILLERATO & ADMISIÓN
  // ==========================================
  {
    id: 'mat-bach-001',
    subject: 'Matemática',
    topic: 'Ecuaciones de Primer Grado',
    difficulty: 'Básico',
    targetProfiles: ['andres_bachillerato_1', 'prima_bachillerato_5'],
    questionText: 'Halla el valor de $x$ que satisface la siguiente ecuación lineal:',
    latexFormula: '5(2x - 4) = 3x + 8',
    options: [
      { id: 'opt-a', text: '$x = 2$' },
      { id: 'opt-b', text: '$x = 4$' },
      { id: 'opt-c', text: '$x = 5$' },
      { id: 'opt-d', text: '$x = -4$' },
    ],
    correctOptionId: 'opt-b',
    explanation: 'Aplicamos la propiedad distributiva: $10x - 20 = 3x + 8$. Agrupando variables: $10x - 3x = 8 + 20 \\implies 7x = 28 \\implies x = 4$.',
    explanationLatex: '10x - 3x = 8 + 20 \\implies 7x = 28 \\implies x = 4',
  },
  {
    id: 'mat-bach-002',
    subject: 'Matemática',
    topic: 'Funciones Cuadráticas y Raíces',
    difficulty: 'Intermedio',
    targetProfiles: ['prima_bachillerato_5'],
    questionText: '¿Cuáles son las soluciones o raíces reales de la ecuación cuadrática $x^2 - 5x + 6 = 0$?',
    latexFormula: 'x^2 - 5x + 6 = 0',
    options: [
      { id: 'opt-a', text: '$x_1 = 2, \\; x_2 = 3$' },
      { id: 'opt-b', text: '$x_1 = -2, \\; x_2 = -3$' },
      { id: 'opt-c', text: '$x_1 = 1, \\; x_2 = 6$' },
      { id: 'opt-d', text: '$x_1 = -1, \\; x_2 = -6$' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Factorizando el trinomio de la forma $x^2 + bx + c$: buscamos dos números que multiplicados den $6$ y sumados den $-5$. Estos números son $-2$ y $-3$: $(x - 2)(x - 3) = 0 \\implies x = 2$ y $x = 3$.',
    explanationLatex: '(x - 2)(x - 3) = 0 \\implies x_1 = 2, \\quad x_2 = 3',
  },
  {
    id: 'mat-bach-003',
    subject: 'Matemática',
    topic: 'Trigonometría Básica',
    difficulty: 'Intermedio',
    targetProfiles: ['prima_bachillerato_5', 'santiago_fisica_ucv'],
    questionText: 'En un triángulo rectángulo, si el cateto opuesto a un ángulo $\\theta$ mide $3\\,\\text{cm}$ y el cateto adyacente mide $4\\,\\text{cm}$, ¿cuál es el valor de $\\cos(\\theta)$?',
    latexFormula: '\\cos(\\theta) = \\frac{\\text{Cateto Adyacente}}{\\text{Hipotenusa}}',
    options: [
      { id: 'opt-a', text: '$\\frac{3}{5}$' },
      { id: 'opt-b', text: '$\\frac{4}{5}$' },
      { id: 'opt-c', text: '$\\frac{3}{4}$' },
      { id: 'opt-d', text: '$\\frac{5}{4}$' },
    ],
    correctOptionId: 'opt-b',
    explanation: 'Por el Teorema de Pitágoras, la hipotenusa es $h = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = 5\\,\\text{cm}$. Por definición, $\\cos(\\theta) = \\frac{\\text{adyacente}}{\\text{hipotenusa}} = \\frac{4}{5} = 0.8$.',
    explanationLatex: 'h = \\sqrt{3^2 + 4^2} = 5 \\implies \\cos(\\theta) = \\frac{4}{5}',
  },

  // ==========================================
  // 3. FÍSICA - UNIVERSITARIO & ANALÍTICO
  // ==========================================
  {
    id: 'fis-univ-001',
    subject: 'Física',
    topic: 'Dinámica & Fuerza de Rozamiento',
    difficulty: 'Avanzado',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Un bloque de masa $m = 10\\,\\text{kg}$ se encuentra sobre un plano horizontal con coeficiente de fricción cinético $\\mu_c = 0.2$. Si se le aplica una fuerza horizontal constante $F = 50\\,\\text{N}$, ¿cuál es la aceleración del bloque? (Toma $g = 9.8\\,\\text{m/s}^2$)',
    latexFormula: '\\Sigma F_x = F - f_k = m a, \\quad f_k = \\mu_c m g',
    options: [
      { id: 'opt-a', text: '$a = 3.04\\,\\text{m/s}^2$' },
      { id: 'opt-b', text: '$a = 5.00\\,\\text{m/s}^2$' },
      { id: 'opt-c', text: '$a = 1.96\\,\\text{m/s}^2$' },
      { id: 'opt-d', text: '$a = 0.50\\,\\text{m/s}^2$' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'La normal es $N = mg = 10(9.8) = 98\\,\\text{N}$. La fuerza de fricción cinética es $f_k = \\mu_c N = 0.2(98) = 19.6\\,\\text{N}$. La fuerza neta es $F - f_k = 50 - 19.6 = 30.4\\,\\text{N}$. Entonces $a = \\frac{30.4}{10} = 3.04\\,\\text{m/s}^2$.',
    explanationLatex: 'a = \\frac{F - \\mu_c mg}{m} = \\frac{50 - 19.6}{10} = 3.04\\,\\text{m/s}^2',
  },
  {
    id: 'fis-univ-002',
    subject: 'Física',
    topic: 'Conservación de la Energía Mecánica',
    difficulty: 'Intermedio',
    targetProfiles: ['santiago_fisica_ucv', 'prima_bachillerato_5'],
    questionText: 'Una esfera de $m = 2\\,\\text{kg}$ se suelta desde el reposo desde una altura $h = 20\\,\\text{m}$ sobre el suelo. Despreciando la resistencia del aire, ¿cuál es su rapidez justo antes de impactar el suelo? (Toma $g = 9.8\\,\\text{m/s}^2$)',
    latexFormula: 'E_m = m g h = \\frac{1}{2} m v^2 \\implies v = \\sqrt{2 g h}',
    options: [
      { id: 'opt-a', text: '$v = 14.0\\,\\text{m/s}$' },
      { id: 'opt-b', text: '$v = 19.8\\,\\text{m/s}$' },
      { id: 'opt-c', text: '$v = 28.0\\,\\text{m/s}$' },
      { id: 'opt-d', text: '$v = 9.8\\,\\text{m/s}$' },
    ],
    correctOptionId: 'opt-b',
    explanation: 'Por conservación de la energía mecánica, la energía potencial gravitatoria inicial se transforma íntegramente en energía cinética: $mgh = \\frac{1}{2}mv^2 \\implies v = \\sqrt{2gh} = \\sqrt{2(9.8)(20)} = \\sqrt{392} \\approx 19.799\\,\\text{m/s} \\approx 19.8\\,\\text{m/s}$.',
    explanationLatex: 'v = \\sqrt{2(9.8)(20)} = \\sqrt{392} \\approx 19.8\\,\\text{m/s}',
  },

  // ==========================================
  // 4. FÍSICA - BACHILLERATO & CINEMÁTICA
  // ==========================================
  {
    id: 'fis-bach-001',
    subject: 'Física',
    topic: 'Cinemática MRUV',
    difficulty: 'Intermedio',
    targetProfiles: ['prima_bachillerato_5', 'andres_bachillerato_1'],
    questionText: 'Un automóvil parte del reposo con aceleración constante de $a = 3\\,\\text{m/s}^2$. ¿Qué distancia recorre en un intervalo de tiempo de $t = 6\\,\\text{s}$?',
    latexFormula: 'x(t) = v_0 t + \\frac{1}{2} a t^2',
    options: [
      { id: 'opt-a', text: '$18\\,\\text{metros}$' },
      { id: 'opt-b', text: '$54\\,\\text{metros}$' },
      { id: 'opt-c', text: '$108\\,\\text{metros}$' },
      { id: 'opt-d', text: '$36\\,\\text{metros}$' },
    ],
    correctOptionId: 'opt-b',
    explanation: 'Como parte del reposo, $v_0 = 0$. La distancia recorrida es $x = \\frac{1}{2} a t^2 = \\frac{1}{2}(3)(6)^2 = \\frac{1}{2}(3)(36) = 3 \\times 18 = 54\\,\\text{m}$.',
    explanationLatex: 'x = \\frac{1}{2}(3)(36) = 54\\,\\text{m}',
  },
  {
    id: 'fis-bach-002',
    subject: 'Física',
    topic: 'Leyes de Newton',
    difficulty: 'Básico',
    targetProfiles: ['andres_bachillerato_1', 'prima_bachillerato_5'],
    questionText: 'Si una fuerza neta de $F = 45\\,\\text{N}$ acelera un cuerpo a razón de $a = 5\\,\\text{m/s}^2$, ¿cuál es la masa del cuerpo?',
    latexFormula: 'F = m a \\implies m = \\frac{F}{a}',
    options: [
      { id: 'opt-a', text: '$m = 9\\,\\text{kg}$' },
      { id: 'opt-b', text: '$m = 225\\,\\text{kg}$' },
      { id: 'opt-c', text: '$m = 0.11\\,\\text{kg}$' },
      { id: 'opt-d', text: '$m = 40\\,\\text{kg}$' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Por la Segunda Ley de Newton, la masa es el cociente entre la fuerza neta y la aceleración: $m = \\frac{F}{a} = \\frac{45\\,\\text{N}}{5\\,\\text{m/s}^2} = 9\\,\\text{kg}$.',
    explanationLatex: 'm = \\frac{45}{5} = 9\\,\\text{kg}',
  },

  // ==========================================
  // 5. QUÍMICA - ESTEQUIOMETRÍA Y REACCIONES
  // ==========================================
  {
    id: 'qui-001',
    subject: 'Química',
    topic: 'Estequiometría y Balanceo',
    difficulty: 'Intermedio',
    targetProfiles: ['prima_bachillerato_5'],
    questionText: 'En la combustión completa del gas propano según la ecuación balanceada $\\text{C}_3\\text{H}_8 + 5\\text{O}_2 \\rightarrow 3\\text{CO}_2 + 4\\text{H}_2\\text{O}$, ¿cuántos moles de dióxido de carbono ($\text{CO}_2$) se producen al reaccionar completamente $2\\,\\text{moles}$ de propano?',
    latexFormula: '\\text{C}_3\\text{H}_8 + 5\\text{O}_2 \\rightarrow 3\\text{CO}_2 + 4\\text{H}_2\\text{O}',
    options: [
      { id: 'opt-a', text: '$3\\,\\text{moles}$' },
      { id: 'opt-b', text: '$6\\,\\text{moles}$' },
      { id: 'opt-c', text: '$5\\,\\text{moles}$' },
      { id: 'opt-d', text: '$8\\,\\text{moles}$' },
    ],
    correctOptionId: 'opt-b',
    explanation: 'La relación estequiométrica molar entre el propano y el dióxido de carbono es de $1:3$. Por lo tanto, si reaccionan $2\\,\\text{moles}$ de propano: $2\\,\\text{mol C}_3\\text{H}_8 \\times \\frac{3\\,\\text{mol CO}_2}{1\\,\\text{mol C}_3\\text{H}_8} = 6\\,\\text{moles de CO}_2$.',
    explanationLatex: '2 \\times 3 = 6\\,\\text{moles de CO}_2',
  },
  {
    id: 'qui-002',
    subject: 'Química',
    topic: 'Estructura Atómica y Enlace Químico',
    difficulty: 'Básico',
    targetProfiles: ['andres_bachillerato_1', 'prima_bachillerato_5'],
    questionText: '¿Qué tipo de enlace químico se forma fundamentalmente entre un elemento metal alcalino (como el Sodio, Na) y un no metal halógeno (como el Cloro, Cl) debido a la transferencia completa de electrones?',
    options: [
      { id: 'opt-a', text: 'Enlace Covalente Apolar' },
      { id: 'opt-b', text: 'Enlace Iónico o Electrovalente' },
      { id: 'opt-c', text: 'Enlace Metálico' },
      { id: 'opt-d', text: 'Enlace Covalente Coordinado' },
    ],
    correctOptionId: 'opt-b',
    explanation: 'Debido a la gran diferencia de electronegatividad entre metales del grupo 1 y no metales del grupo 17, el metal cede su electrón de valencia formando un catión y el no metal lo capta formando un anión, generándose atracción electrostática iónica.',
  },
  {
    id: 'qui-003',
    subject: 'Química',
    topic: 'Soluciones y Concentración Molar',
    difficulty: 'Intermedio',
    targetProfiles: ['prima_bachillerato_5'],
    questionText: 'Se disuelven $40\\,\\text{g}$ de hidróxido de sodio ($\\text{NaOH}$, masa molar $\\approx 40\\,\\text{g/mol}$) en agua hasta alcanzar un volumen total de $2\\,\\text{litros}$ de solución. ¿Cuál es la concentración molar (Molaridad) de la solución?',
    latexFormula: 'M = \\frac{n_{\\text{soluto}}}{V_{\\text{solución (L)}}}',
    options: [
      { id: 'opt-a', text: '$0.5\\,\\text{M}$' },
      { id: 'opt-b', text: '$1.0\\,\\text{M}$' },
      { id: 'opt-c', text: '$2.0\\,\\text{M}$' },
      { id: 'opt-d', text: '$0.25\\,\\text{M}$' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'El número de moles de soluto es $n = \\frac{40\\,\\text{g}}{40\\,\\text{g/mol}} = 1\\,\\text{mol}$. La molaridad es $M = \\frac{n}{V} = \\frac{1\\,\\text{mol}}{2\\,\\text{L}} = 0.5\\,\\text{mol/L} = 0.5\\,\\text{M}$.',
    explanationLatex: 'n = \\frac{40}{40} = 1\\,\\text{mol} \\implies M = \\frac{1}{2} = 0.5\\,\\text{M}',
  },

  // ==========================================
  // 6. BIOLOGÍA - CELULAR, GENÉTICA & METABOLISMO
  // ==========================================
  {
    id: 'bio-001',
    subject: 'Biología',
    topic: 'Biología Celular & Energética',
    difficulty: 'Básico',
    targetProfiles: ['andres_bachillerato_1', 'prima_bachillerato_5'],
    questionText: '¿Cuál es el organelo citoplasmático responsable de llevar a cabo la respiración celular aeróbica y la fosforilación oxidativa para sintetizar la mayor parte del ATP?',
    options: [
      { id: 'opt-a', text: 'Aparato de Golgi' },
      { id: 'opt-b', text: 'Mitocondria' },
      { id: 'opt-c', text: 'Retículo Endoplasmático Rugoso' },
      { id: 'opt-d', text: 'Lisosoma' },
    ],
    correctOptionId: 'opt-b',
    explanation: 'La mitocondria lleva a cabo el ciclo de Krebs en su matriz y la cadena de transporte de electrones con la ATP sintasa en sus crestas internas, produciendo la energía química utilizable por la célula eucariota.',
  },
  {
    id: 'bio-002',
    subject: 'Biología',
    topic: 'Genética Mendeliana',
    difficulty: 'Intermedio',
    targetProfiles: ['prima_bachillerato_5'],
    questionText: 'Al cruzar dos individuos heterocigotos para un carácter con dominancia completa ($Aa \\times Aa$), ¿cuál es la probabilidad genotípica esperada de obtener descendientes homocigotos recesivos ($aa$)?',
    options: [
      { id: 'opt-a', text: '25% (1 de 4)' },
      { id: 'opt-b', text: '50% (2 de 4)' },
      { id: 'opt-c', text: '75% (3 de 4)' },
      { id: 'opt-d', text: '0%' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Según la Primera Ley de Mendel, en el cuadro de Punnett para $Aa \\times Aa$ se obtienen las proporciones genotípicas: $1/4\\, AA$ (25%), $2/4\\, Aa$ (50%) y $1/4\\, aa$ (25%).',
  },
  {
    id: 'bio-003',
    subject: 'Biología',
    topic: 'Fotosíntesis y Células Vegetales',
    difficulty: 'Básico',
    targetProfiles: ['andres_bachillerato_1', 'prima_bachillerato_5'],
    questionText: '¿Cuál es la función primordial de los cloroplastos en las células vegetales y algas?',
    options: [
      { id: 'opt-a', text: 'Sintetizar proteínas a partir de ARN mensajero' },
      { id: 'opt-b', text: 'Captar energía luminosa para sintetizar glucosa y liberar oxígeno mediante fotosíntesis' },
      { id: 'opt-c', text: 'Degradar desechos celulares mediante enzimas hidrolíticas' },
      { id: 'opt-d', text: 'Almacenar información genética en cromosomas lineales' },
    ],
    correctOptionId: 'opt-b',
    explanation: 'Los cloroplastos contienen clorofila en los tilacoides, organelo en el cual se realiza la fase lumínica y la fase oscura (ciclo de Calvin) para transformar energía solar en enlaces químicos de glucosa.',
  },

  // ==========================================
  // 7. CASTELLANO & RAZONAMIENTO VERBAL
  // ==========================================
  {
    id: 'cas-001',
    subject: 'Castellano',
    topic: 'Razonamiento Verbal (Analogías)',
    difficulty: 'Intermedio',
    targetProfiles: ['prima_bachillerato_5', 'mafe_diseno_ucab'],
    questionText: 'Identifica la opción que mantiene la misma relación analógica que el par base: CINCEL : ESCULTOR ::',
    options: [
      { id: 'opt-a', text: 'Pincel : Pintor' },
      { id: 'opt-b', text: 'Madera : Carpintero' },
      { id: 'opt-c', text: 'Escuela : Estudiante' },
      { id: 'opt-d', text: 'Partitura : Violín' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'La relación analógica es de INSTRUMENTO/HERRAMIENTA : PROFESIONAL O ARTISTA QUE LA EMPLEA. El cincel es la herramienta con la que trabaja el escultor, al igual que el pincel es la herramienta del pintor.',
  },
  {
    id: 'cas-002',
    subject: 'Castellano',
    topic: 'Morfosintaxis (Estructura de la Oración)',
    difficulty: 'Básico',
    targetProfiles: ['andres_bachillerato_1'],
    questionText: 'En la oración: "Los estudiantes diligentes entregaron sus proyectos a tiempo", ¿cuál es el núcleo del sujeto?',
    options: [
      { id: 'opt-a', text: 'diligentes' },
      { id: 'opt-b', text: 'estudiantes' },
      { id: 'opt-c', text: 'proyectos' },
      { id: 'opt-d', text: 'entregaron' },
    ],
    correctOptionId: 'opt-b',
    explanation: 'El sintagma nominal sujeto es "Los estudiantes diligentes". El núcleo sustantivo principal sobre el cual recaen los modificadores "Los" (determinante) y "diligentes" (adjetivo) es "estudiantes".',
  },
  {
    id: 'cas-003',
    subject: 'Castellano',
    topic: 'Ortografía Acentual y Conectores Lógicos',
    difficulty: 'Intermedio',
    targetProfiles: ['prima_bachillerato_5'],
    questionText: 'Selecciona la opción en la que las palabras en negrita cumplen la función correcta de acentuación diacrítica:',
    options: [
      { id: 'opt-a', text: 'Él me dijo que sí vendría a la clase, pero aún no sé a qué hora.' },
      { id: 'opt-b', text: 'El me dijo que si vendria a la clase, pero aun no se a que hora.' },
      { id: 'opt-c', text: 'Él me dijo que si vendría a la clase, pero aún no se a que hora.' },
      { id: 'opt-d', text: 'El me dijo que sí vendría a la clase, pero aun no sé a qué hora.' },
    ],
    correctOptionId: 'opt-a',
    explanation: '"Él" lleva tilde diacrítica por ser pronombre personal; "sí" lleva tilde por ser adverbio afirmativo; "aún" lleva tilde por equivaler a "todavía"; "sé" lleva tilde por ser forma del verbo saber; y "qué" lleva tilde por tener función interrogativa indirecta.',
  },
];
