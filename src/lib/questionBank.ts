import type { AcademicSubject, Question } from '../types/exam.types';

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
    questionText: 'En la combustión completa del gas propano según la ecuación balanceada $\\mathrm{C}_3\\mathrm{H}_8 + 5\\mathrm{O}_2 \\rightarrow 3\\mathrm{CO}_2 + 4\\mathrm{H}_2\\mathrm{O}$, ¿cuántos moles de dióxido de carbono ($\\mathrm{CO}_2$) se producen al reaccionar completamente $2\\,\\text{moles}$ de propano?',
    latexFormula: '\\mathrm{C}_3\\mathrm{H}_8 + 5\\mathrm{O}_2 \\rightarrow 3\\mathrm{CO}_2 + 4\\mathrm{H}_2\\mathrm{O}',
    options: [
      { id: 'opt-a', text: '$3\\,\\text{moles}$' },
      { id: 'opt-b', text: '$6\\,\\text{moles}$' },
      { id: 'opt-c', text: '$5\\,\\text{moles}$' },
      { id: 'opt-d', text: '$8\\,\\text{moles}$' },
    ],
    correctOptionId: 'opt-b',
    explanation: 'La relación estequiométrica molar entre el propano y el dióxido de carbono es de $1:3$. Por lo tanto, si reaccionan $2\\,\\text{moles}$ de propano: $2\\,\\text{mol }\\mathrm{C}_3\\mathrm{H}_8 \\times \\frac{3\\,\\text{mol }\\mathrm{CO}_2}{1\\,\\text{mol }\\mathrm{C}_3\\mathrm{H}_8} = 6\\,\\text{moles de }\\mathrm{CO}_2$.',
    explanationLatex: '2 \\times 3 = 6\\,\\text{moles de }\\mathrm{CO}_2',
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

  // ==========================================
  // 8. DISEÑO INTEGRAL, COLOR & WCAG (UCAB)
  // ==========================================
  {
    id: 'des-001',
    subject: 'Castellano', // categorizado en humanidades/diseño
    topic: 'Accesibilidad Web & Contraste WCAG 2.1',
    difficulty: 'Intermedio',
    targetProfiles: ['mafe_diseno_ucab'],
    questionText: 'Según las pautas internacionales de accesibilidad WCAG 2.1 (Nivel AA), ¿cuál es la relación de contraste mínima recomendada entre el texto de cuerpo estándar y su color de fondo?',
    options: [
      { id: 'opt-a', text: '3:1' },
      { id: 'opt-b', text: '4.5:1' },
      { id: 'opt-c', text: '7:1' },
      { id: 'opt-d', text: '2:1' },
    ],
    correctOptionId: 'opt-b',
    explanation: 'WCAG 2.1 Nivel AA exige un ratio mínimo de contraste de 4.5:1 para texto normal y 3:1 para texto grande (18pt o 14pt negrita) para asegurar legibilidad a personas con baja agudeza visual o discromatopsia.',
  },
  {
    id: 'des-002',
    subject: 'Castellano',
    topic: 'Leyes de la Gestalt & Composición Visual',
    difficulty: 'Intermedio',
    targetProfiles: ['mafe_diseno_ucab'],
    questionText: 'En el diseño de interfaces y láminas editoriales, ¿qué principio de la Gestalt postula que los objetos cercanos entre sí tienden a percibirse como un grupo o unidad funcional coherente?',
    options: [
      { id: 'opt-a', text: 'Ley de Proximidad' },
      { id: 'opt-b', text: 'Ley de Cierre o Clausura' },
      { id: 'opt-c', text: 'Ley de Continuidad' },
      { id: 'opt-d', text: 'Ley de Pregnancia' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'La Ley de Proximidad establece que la distancia espacial condiciona la relación semántica: los elementos con menor separación entre sí son procesados cognitivamente como partes de un mismo bloque informativo.',
  },
  {
    id: 'des-003',
    subject: 'Castellano',
    topic: 'Teoría del Color & Armonía 60-30-10',
    difficulty: 'Básico',
    targetProfiles: ['mafe_diseno_ucab'],
    questionText: 'En la regla de armonía cromática 60-30-10 aplicada al diseño de espacios e interfaces, ¿a cuál de los siguientes elementos corresponde preferentemente el 10%?',
    options: [
      { id: 'opt-a', text: 'Al color de acento reservado para botones de acción (CTA), insignias y puntos focales' },
      { id: 'opt-b', text: 'Al lienzo de fondo que ocupa la mayor superficie' },
      { id: 'opt-c', text: 'A las tarjetas secundarias de contenido y barras laterales' },
      { id: 'opt-d', text: 'A los bordes y sombras difusas' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'El 60% se reserva para el color dominante neutro, el 30% para el color secundario de soporte, y el 10% para el color de acento vibrante que guía la vista del usuario a las acciones más críticas.',
  },
  {
    id: 'des-004',
    subject: 'Castellano',
    topic: 'Tipografía & Jerarquía Editorial',
    difficulty: 'Intermedio',
    targetProfiles: ['mafe_diseno_ucab'],
    questionText: 'En diagramación editorial y diseño tipográfico, ¿cuál es la diferencia técnica entre el "leading" (interlineado) y el "tracking"?',
    options: [
      { id: 'opt-a', text: 'El leading mide la distancia vertical entre líneas base; el tracking ajusta el espaciado global entre todos los caracteres del bloque.' },
      { id: 'opt-b', text: 'El leading ajusta el espacio óptico entre solo dos letras; el tracking mide la altura de las mayúsculas.' },
      { id: 'opt-c', text: 'El leading es exclusivo de fuentes con serifa; el tracking solo se aplica a fuentes palo seco.' },
      { id: 'opt-d', text: 'Ambos términos son sinónimos del espaciado entre palabras.' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Leading (proveniente de las antiguas tiras de plomo o "lead") es el espacio vertical entre líneas consecutivas de texto; tracking es el espaciado horizontal uniforme en una cadena completa.',
  },

  // ==========================================
  // 9. MATEMÁTICA Y CIENCIAS BÁSICAS 1ER AÑO (ANDRÉS)
  // ==========================================
  {
    id: 'mat-bach-004',
    subject: 'Matemática',
    topic: 'Ecuaciones Básicas (Analogía de la Balanza)',
    difficulty: 'Básico',
    targetProfiles: ['andres_bachillerato_1'],
    questionText: 'Si una balanza está perfectamente equilibrada con un plato que tiene una caja desconocida $x$ junto con $7$ pesas de 1 kg, y el otro plato tiene $19$ pesas de 1 kg ($x + 7 = 19$), ¿cuántas pesas pesa la caja $x$?',
    latexFormula: 'x + 7 = 19',
    options: [
      { id: 'opt-a', text: '$x = 12$' },
      { id: 'opt-b', text: '$x = 26$' },
      { id: 'opt-c', text: '$x = 14$' },
      { id: 'opt-d', text: '$x = 7$' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Para mantener la balanza en equilibrio, retiramos 7 pesas de ambos lados al mismo tiempo: $x = 19 - 7 = 12$.',
    explanationLatex: 'x = 19 - 7 = 12',
  },
  {
    id: 'mat-bach-005',
    subject: 'Matemática',
    topic: 'Fracciones Homogéneas',
    difficulty: 'Básico',
    targetProfiles: ['andres_bachillerato_1'],
    questionText: 'Si divides una pizza en 8 porciones iguales y tomaste 3 porciones al mediodía y 2 porciones en la cena, ¿qué fracción total de la pizza comiste?',
    latexFormula: '\\frac{3}{8} + \\frac{2}{8}',
    options: [
      { id: 'opt-a', text: '$\\frac{5}{8}$' },
      { id: 'opt-b', text: '$\\frac{5}{16}$' },
      { id: 'opt-c', text: '$\\frac{6}{8}$' },
      { id: 'opt-d', text: '$\\frac{1}{8}$' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Al tener el mismo denominador (fracciones homogéneas), se suman directamente los numeradores manteniendo el denominador: $\\frac{3+2}{8} = \\frac{5}{8}$.',
    explanationLatex: '\\frac{3}{8} + \\frac{2}{8} = \\frac{5}{8}',
  },
  {
    id: 'cie-bach-002',
    subject: 'Biología',
    topic: 'Célula Vegetal vs Animal (1er Año)',
    difficulty: 'Básico',
    targetProfiles: ['andres_bachillerato_1'],
    questionText: '¿Cuál de las siguientes estructuras está presente en las células vegetales para darles rigidez y realizar fotosíntesis, pero NO está en las células animales?',
    options: [
      { id: 'opt-a', text: 'Pared celular y cloroplastos' },
      { id: 'opt-b', text: 'Membrana plasmática y citoplasma' },
      { id: 'opt-c', text: 'Núcleo y mitocondrias' },
      { id: 'opt-d', text: 'Ribosomas y lisosomas' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Las células vegetales cuentan con una pared celular rígida de celulosa y cloroplastos con clorofila para captar luz solar, organelos ausentes en la célula animal.',
  },

  // ==========================================
  // 10. FÍSICA & CÁLCULO INTRODUCTORIO UCV (SANTIAGO)
  // ==========================================
  {
    id: 'fis-univ-004',
    subject: 'Física',
    topic: 'Cinemática & Derivadas Instantáneas UCV',
    difficulty: 'Avanzado',
    targetProfiles: ['santiago_fisica_ucv'],
    questionText: 'La posición de una partícula en línea recta está descrita por $x(t) = 4t^3 - 5t + 2$ (en metros y segundos). ¿Cuál es su aceleración instantánea $a(t)$ al transcurrir $t = 2\\text{ s}$?',
    latexFormula: 'a(t) = \\frac{d^2x}{dt^2}',
    options: [
      { id: 'opt-a', text: '$a(2) = 48\\text{ m/s}^2$' },
      { id: 'opt-b', text: '$a(2) = 24\\text{ m/s}^2$' },
      { id: 'opt-c', text: '$a(2) = 43\\text{ m/s}^2$' },
      { id: 'opt-d', text: '$a(2) = 96\\text{ m/s}^2$' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Calculamos la primera derivada para la velocidad: $v(t) = \\frac{dx}{dt} = 12t^2 - 5$. Calculamos la segunda derivada para la aceleración: $a(t) = \\frac{dv}{dt} = 24t$. Evaluando en $t = 2$: $a(2) = 24(2) = 48\\text{ m/s}^2$.',
    explanationLatex: 'a(t) = \\frac{d^2x}{dt^2} = 24t \\implies a(2) = 48\\,\\text{m/s}^2',
  },
  {
    id: 'mat-univ-004',
    subject: 'Matemática',
    topic: 'Límites Trigonométricos Notables UCV',
    difficulty: 'Avanzado',
    targetProfiles: ['santiago_fisica_ucv'],
    questionText: 'Evalúa el límite analítico: $\\lim_{x \\to 0} \\frac{\\sin(5x)}{2x}$ aplicando el límite notable fundamental $\\lim_{u \\to 0} \\frac{\\sin u}{u} = 1$:',
    latexFormula: '\\lim_{x \\to 0} \\frac{\\sin(5x)}{2x}',
    options: [
      { id: 'opt-a', text: '$\\frac{5}{2}$' },
      { id: 'opt-b', text: '$1$' },
      { id: 'opt-c', text: '$0$' },
      { id: 'opt-d', text: '$\\frac{2}{5}$' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Multiplicamos y dividimos por 5: $\\lim_{x \\to 0} \\frac{\\sin(5x)}{2x} = \\frac{5}{2} \\lim_{x \\to 0} \\frac{\\sin(5x)}{5x} = \\frac{5}{2} \\cdot 1 = \\frac{5}{2}$.',
    explanationLatex: '\\lim_{x \\to 0} \\frac{\\sin(5x)}{2x} = \\frac{5}{2} \\lim_{5x \\to 0} \\frac{\\sin(5x)}{5x} = \\frac{5}{2}',
  },

  // ==========================================
  // SANTIAGO (FÍSICA I, CÁLCULO I, ÁLGEBRA LINEAL UCV)
  // ==========================================
  {
    id: 'fis-univ-005',
    subject: 'Física',
    topic: 'Torque & Producto Vectorial en R³',
    difficulty: 'Avanzado',
    targetProfiles: ['santiago_fisica_ucv'],
    questionText: 'Se aplica una fuerza $\\vec{F} = (0, 10, -5)\\,\\text{N}$ en el punto $\\vec{r} = (2, 3, 0)\\,\\text{m}$ con respecto al origen. ¿Cuál es el vector torque $\\vec{\\tau} = \\vec{r} \\times \\vec{F}$ resultante?',
    latexFormula: '\\vec{\\tau} = \\vec{r} \\times \\vec{F}',
    options: [
      { id: 'opt-a', text: '$\\vec{\\tau} = (-15, 10, 20)\\,\\text{N}\\cdot\\text{m}$' },
      { id: 'opt-b', text: '$\\vec{\\tau} = (15, -10, -20)\\,\\text{N}\\cdot\\text{m}$' },
      { id: 'opt-c', text: '$\\vec{\\tau} = (0, 30, 0)\\,\\text{N}\\cdot\\text{m}$' },
      { id: 'opt-d', text: '$\\vec{\\tau} = (-15, -10, 20)\\,\\text{N}\\cdot\\text{m}$' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Calculamos el determinante con la base $(\\hat{i}, \\hat{j}, \\hat{k})$: $\\tau_x = (3)(-5) - (0)(10) = -15$, $\\tau_y = -[(2)(-5) - (0)(0)] = 10$, $\\tau_z = (2)(10) - (3)(0) = 20$. Resulta $\\vec{\\tau} = (-15, 10, 20)\\,\\text{N}\\cdot\\text{m}$.',
    explanationLatex: '\\vec{\\tau} = (-15)\\hat{i} + (10)\\hat{j} + (20)\\hat{k}\\,\\text{N}\\cdot\\text{m}',
  },
  {
    id: 'mat-univ-005',
    subject: 'Matemática',
    topic: 'Cálculo Diferencial (Regla de la Cadena)',
    difficulty: 'Avanzado',
    targetProfiles: ['santiago_fisica_ucv'],
    questionText: 'Calcula la derivada $f\'(x)$ de la función compuesta $f(x) = \\ln(x^2 + 4)$ aplicando la regla de la cadena:',
    latexFormula: '\\frac{d}{dx}[\\ln(u)] = \\frac{u\'}{u}',
    options: [
      { id: 'opt-a', text: '$f\'(x) = \\frac{2x}{x^2 + 4}$' },
      { id: 'opt-b', text: '$f\'(x) = \\frac{1}{x^2 + 4}$' },
      { id: 'opt-c', text: '$f\'(x) = \\frac{2x}{(x^2 + 4)^2}$' },
      { id: 'opt-d', text: '$f\'(x) = 2x \\ln(x^2 + 4)$' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Siendo $u = x^2 + 4 \\implies u\' = 2x$. Por regla de la cadena para el logaritmo natural, $f\'(x) = \\frac{u\'}{u} = \\frac{2x}{x^2 + 4}$.',
    explanationLatex: 'f\'(x) = \\frac{2x}{x^2 + 4}',
  },
  {
    id: 'mat-univ-006',
    subject: 'Matemática',
    topic: 'Álgebra Lineal (Determinante 3x3)',
    difficulty: 'Avanzado',
    targetProfiles: ['santiago_fisica_ucv'],
    questionText: 'Calcula el determinante de la matriz $A = \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & 3 & 4 \\\\ 1 & 0 & 2 \\end{pmatrix}$:',
    latexFormula: '\\det(A) = a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33} - a_{23}a_{31}) + a_{13}(...)',
    options: [
      { id: 'opt-a', text: '$\\det(A) = 14$' },
      { id: 'opt-b', text: '$\\det(A) = -2$' },
      { id: 'opt-c', text: '$\\det(A) = 10$' },
      { id: 'opt-d', text: '$\\det(A) = 6$' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Desarrollando por la primera fila: $1 \\cdot (3\\cdot 2 - 4\\cdot 0) - 2 \\cdot (0\\cdot 2 - 4\\cdot 1) + 0 = 1(6) - 2(-4) = 6 + 8 = 14$.',
    explanationLatex: '\\det(A) = 1(6) - 2(-4) = 14',
  },

  // ==========================================
  // ANDRÉS (ÁLGEBRA BÁSICA & CIENCIAS 1ER AÑO)
  // ==========================================
  {
    id: 'mat-andres-001',
    subject: 'Matemática',
    topic: 'Regla de Signos en Multiplicación',
    difficulty: 'Básico',
    targetProfiles: ['andres_bachillerato_1'],
    questionText: '¿Cuál es el resultado de multiplicar $(-4) \\times (-7)$?',
    options: [
      { id: 'opt-a', text: '$28$' },
      { id: 'opt-b', text: '$-28$' },
      { id: 'opt-c', text: '$-11$' },
      { id: 'opt-d', text: '$11$' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Por la ley de los signos para números enteros: menos por menos da más (signos iguales dan positivo). $(-4) \\times (-7) = +28$.',
    explanationLatex: '(-4) \\times (-7) = 28',
  },
  {
    id: 'mat-andres-002',
    subject: 'Matemática',
    topic: 'Jerarquía de Operaciones Básica',
    difficulty: 'Básico',
    targetProfiles: ['andres_bachillerato_1'],
    questionText: '¿Cuál es el resultado de la siguiente operación combinada: $15 - 3 \\times 4 + 2$?',
    options: [
      { id: 'opt-a', text: '$5$' },
      { id: 'opt-b', text: '$50$' },
      { id: 'opt-c', text: '$25$' },
      { id: 'opt-d', text: '$-1$' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Por jerarquía de operaciones, primero se resuelve la multiplicación: $3 \\times 4 = 12$. Luego las sumas y restas de izquierda a derecha: $15 - 12 + 2 = 3 + 2 = 5$.',
    explanationLatex: '15 - (3 \\times 4) + 2 = 15 - 12 + 2 = 5',
  },
  {
    id: 'cie-andres-001',
    subject: 'Biología',
    topic: 'Estructura Atómica Fundamental',
    difficulty: 'Básico',
    targetProfiles: ['andres_bachillerato_1'],
    questionText: '¿Cuáles son las partículas con carga positiva ubicadas en el núcleo del átomo?',
    options: [
      { id: 'opt-a', text: 'Protones' },
      { id: 'opt-b', text: 'Electrones' },
      { id: 'opt-c', text: 'Neutrones' },
      { id: 'opt-d', text: 'Fotones' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Los protones poseen carga eléctrica positiva y se ubican en el núcleo junto a los neutrones (sin carga). Los electrones poseen carga negativa y orbitan en la corteza.',
  },
  {
    id: 'cas-andres-001',
    subject: 'Castellano',
    topic: 'Clasificación de Palabras por Acento',
    difficulty: 'Básico',
    targetProfiles: ['andres_bachillerato_1'],
    questionText: '¿Por qué la palabra "canción" lleva tilde en la vocal o?',
    options: [
      { id: 'opt-a', text: 'Porque es una palabra aguda que termina en consonante n' },
      { id: 'opt-b', text: 'Porque es una palabra grave que termina en vocal' },
      { id: 'opt-c', text: 'Porque es una palabra esdrújula' },
      { id: 'opt-d', text: 'Porque todas las palabras con cón llevan tilde' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'Las palabras agudas tienen la sílaba tónica en la última posición y llevan tilde ortográfica cuando terminan en n, s o vocal. En "can-ción", la fuerza está en la última sílaba y termina en "n".',
  },

  // ==========================================
  // MAFE (COLOR, ACCESIBILIDAD, GESTALT, EDITORIAL)
  // ==========================================
  {
    id: 'des-005',
    subject: 'Castellano',
    topic: 'WCAG 2.1 Texto Grande & Insignias',
    difficulty: 'Intermedio',
    targetProfiles: ['mafe_diseno_ucab'],
    questionText: 'Para titulares de gran escala (18pt / 24px estándar o 14pt negrita), ¿cuál es el ratio de contraste mínimo exigido por WCAG 2.1 Nivel AA?',
    options: [
      { id: 'opt-a', text: '3:1' },
      { id: 'opt-b', text: '4.5:1' },
      { id: 'opt-c', text: '2:1' },
      { id: 'opt-d', text: '7:1' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'El estándar WCAG 2.1 estipula que el texto grande es más fácil de percibir con menor luminancia relativa, requiriendo un ratio mínimo de 3:1 para Nivel AA, frente al 4.5:1 exigido al texto de cuerpo.',
  },
  {
    id: 'des-006',
    subject: 'Castellano',
    topic: 'Principio Gestalt de Figura y Fondo',
    difficulty: 'Intermedio',
    targetProfiles: ['mafe_diseno_ucab'],
    questionText: '¿En qué consiste el principio gestáltico de segregación "Figura y Fondo" en una lámina de sustentación?',
    options: [
      { id: 'opt-a', text: 'En la capacidad del ojo humano de separar visualmente el objeto de interés protagónico (figura) del plano de soporte sobre el que reposa (fondo)' },
      { id: 'opt-b', text: 'En rellenar todos los espacios vacíos con texturas de fondo complejas' },
      { id: 'opt-c', text: 'En usar únicamente colores primarios en la figura' },
      { id: 'opt-d', text: 'En alinear todos los textos a la izquierda' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'La relación figura-fondo permite al cerebro humano jerarquizar la información: la figura tiene contorno delimitado y mayor prominencia visual, mientras el fondo se percibe como continuo y subordinado.',
  },
  {
    id: 'des-007',
    subject: 'Castellano',
    topic: 'Diseño Inclusivo sin Dependencia Única del Color',
    difficulty: 'Intermedio',
    targetProfiles: ['mafe_diseno_ucab'],
    questionText: '¿Por qué la pauta WCAG 1.4.1 prohíbe transmitir información crítica (como errores de formulario o estados de éxito) usando EXCLUSIVAMENTE el color verde o rojo?',
    options: [
      { id: 'opt-a', text: 'Porque personas con daltonismo (protanopia/deuteranopia) o en pantallas monocromáticas no pueden distinguir la diferencia; debe añadirse texto descriptivo o un icono explícito' },
      { id: 'opt-b', text: 'Porque el rojo está reservado solo para alertas gubernamentales' },
      { id: 'opt-c', text: 'Porque los navegadores antiguos no renderizan colores hexadecimales' },
      { id: 'opt-d', text: 'Porque aumenta el consumo de batería en pantallas OLED' },
    ],
    correctOptionId: 'opt-a',
    explanation: 'La accesibilidad universal exige doble codificación perceptiva: el color debe complementarse siempre con iconos, patrones o etiquetas textuales para no excluir a usuarios con discromatopsias.',
  },
];

/**
 * Registro de Exámenes Individuales y Calibrados por Perfil de Estudiante
 */
export interface ProfileTailoredExam {
  id: string;
  profileId: 'santiago_fisica_ucv' | 'andres_bachillerato_1' | 'mafe_diseno_ucab' | 'prima_bachillerato_5';
  title: string;
  subtitle: string;
  durationMinutes: number;
  questionCount: number;
  badge: string;
  colorScheme: 'indigo' | 'rose' | 'amber' | 'emerald';
  description: string;
  targetSubject: AcademicSubject;
  targetTopicKeyword?: string;
}

export const PROFILE_TAILORED_EXAMS: ProfileTailoredExam[] = [
  // 1. Santiago (Ciencias UCV)
  {
    id: 'exam-santiago-fisica-1',
    profileId: 'santiago_fisica_ucv',
    title: 'Física I & Análisis de Partícula (UCV)',
    subtitle: 'Curso Introductorio & Semestre I',
    durationMinutes: 45,
    questionCount: 6,
    badge: 'Física UCV',
    colorScheme: 'indigo',
    description: 'Cinemática diferencial, vectores en ℝ³, diagramas de cuerpo libre y conservación de energía mecánica.',
    targetSubject: 'Física',
    targetTopicKeyword: 'Física',
  },
  {
    id: 'exam-santiago-calculo-1',
    profileId: 'santiago_fisica_ucv',
    title: 'Cálculo Diferencial & Límites Notables (UCV)',
    subtitle: 'Facultad de Ciencias UCV',
    durationMinutes: 50,
    questionCount: 6,
    badge: 'Cálculo I',
    colorScheme: 'indigo',
    description: 'Límites indeterminados, continuidad, regla de la cadena y cálculo de derivadas polinómicas/exponenciales.',
    targetSubject: 'Matemática',
    targetTopicKeyword: 'Cálculo',
  },
  {
    id: 'exam-santiago-algebra-1',
    profileId: 'santiago_fisica_ucv',
    title: 'Álgebra Lineal & Geometría Analítica (UCV)',
    subtitle: 'Facultad de Ciencias UCV',
    durationMinutes: 45,
    questionCount: 6,
    badge: 'Álgebra Lineal',
    colorScheme: 'indigo',
    description: 'Matrices, determinantes, producto vectorial en ℝ³, sistemas de ecuaciones lineales y proyecciones ortogonales.',
    targetSubject: 'Matemática',
    targetTopicKeyword: 'Álgebra Lineal',
  },

  // 2. Andrés (1er Año Bachillerato)
  {
    id: 'exam-andres-school-1',
    profileId: 'andres_bachillerato_1',
    title: 'Álgebra Inicial & Razonamiento Gráfico',
    subtitle: 'Nivel 1er Año de Bachillerato',
    durationMinutes: 25,
    questionCount: 5,
    badge: '1er Año Básico',
    colorScheme: 'emerald',
    description: 'Ecuaciones con la analogía de la balanza, suma de fracciones de pizza y números enteros paso a paso.',
    targetSubject: 'Matemática',
    targetTopicKeyword: 'Ecuaciones',
  },
  {
    id: 'exam-andres-ciencias-1',
    profileId: 'andres_bachillerato_1',
    title: 'Ciencias Naturales & Lengua Materna',
    subtitle: 'Nivel 1er Año de Bachillerato',
    durationMinutes: 25,
    questionCount: 5,
    badge: 'Ciencias 1er Año',
    colorScheme: 'emerald',
    description: 'La célula vegetal y animal, fotosíntesis básica y partes de la oración (sujeto y predicado).',
    targetSubject: 'Biología',
    targetTopicKeyword: 'Célula',
  },

  // 3. María Fernanda (Diseño Integral UCAB)
  {
    id: 'exam-mafe-design-1',
    profileId: 'mafe_diseno_ucab',
    title: 'Fundamentos del Diseño: Color & Accesibilidad WCAG',
    subtitle: 'Escuela de Diseño Integral UCAB',
    durationMinutes: 30,
    questionCount: 5,
    badge: 'Diseño UCAB',
    colorScheme: 'rose',
    description: 'Ratios de contraste WCAG 2.1, regla armónica 60-30-10, psicología cromática y diseño universal.',
    targetSubject: 'Castellano',
    targetTopicKeyword: 'Accesibilidad',
  },
  {
    id: 'exam-mafe-gestalt-1',
    profileId: 'mafe_diseno_ucab',
    title: 'Percepción Visual, Gestalt & Tipografía Editorial',
    subtitle: 'Escuela de Diseño Integral UCAB',
    durationMinutes: 30,
    questionCount: 5,
    badge: 'Gestalt & Editorial',
    colorScheme: 'rose',
    description: 'Leyes de proximidad y cierre, tracking vs leading y jerarquía tipográfica para jurados de taller.',
    targetSubject: 'Castellano',
    targetTopicKeyword: 'Gestalt',
  },

  // 4. Prima (Admisión Universitaria / 5to Año)
  {
    id: 'exam-prima-admision-1',
    profileId: 'prima_bachillerato_5',
    title: 'Simulacro de Admisión: Química & Razonamiento Cuantitativo',
    subtitle: 'Prueba de Aptitud Universitaria',
    durationMinutes: 40,
    questionCount: 6,
    badge: 'Admisión 5to Año',
    colorScheme: 'amber',
    description: 'Estequiometría de reacciones, leyes de Newton aplicadas, ortografía diacrítica y analogías verbales.',
    targetSubject: 'Química',
    targetTopicKeyword: 'Química',
  },
];

/**
 * Obtiene las preguntas filtradas estrictamente para el perfil de estudiante solicitado,
 * con soporte para discriminación por materia (subject) y palabra clave temática (topicKeyword).
 * Garantiza aislamiento pedagógico estricto: estudiantes de nivel escolar básico jamás reciben
 * reactivos universitarios de cálculo o física analítica.
 */
export function getQuestionsForProfile(
  profileId: string,
  subject?: AcademicSubject | string,
  topicKeyword?: string,
  limit = 10
): Question[] {
  // 1. Filtrar estrictamente por perfil destino
  const strictProfileMatches = QUESTION_BANK.filter(
    (q) => q.targetProfiles && q.targetProfiles.includes(profileId as any)
  );

  // 2. Si se solicitó subject, intentar filtrar por materia dentro del perfil
  let filtered = strictProfileMatches;
  if (subject && subject !== 'TODAS') {
    const subjectMatches = filtered.filter((q) => q.subject.toLowerCase() === subject.toLowerCase());
    if (subjectMatches.length > 0) {
      filtered = subjectMatches;
    }
  }

  // 3. Si se solicitó palabra clave temática, refinar si hay coincidencias
  if (topicKeyword) {
    const lowerKeyword = topicKeyword.toLowerCase();
    const keywordMatches = filtered.filter(
      (q) =>
        q.topic?.toLowerCase().includes(lowerKeyword) ||
        q.questionText.toLowerCase().includes(lowerKeyword)
    );
    if (keywordMatches.length >= 2) {
      filtered = keywordMatches;
    }
  }

  // 4. Si el conjunto filtrado es menor a 2, devolver las del perfil sin romper el aislamiento
  if (filtered.length === 0) {
    filtered = strictProfileMatches.length > 0
      ? strictProfileMatches
      : QUESTION_BANK.filter((q) => q.difficulty === 'Básico');
  }

  return filtered.slice(0, limit);
}

