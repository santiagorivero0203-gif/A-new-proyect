/**
 * @file santiago_questions.ts
 * @description Banco Oficial de Reactivos Calibrados para Santiago Rivero
 * (Semestre I · Escuela de Física · Facultad de Ciencias UCV).
 * Batería de 30 reactivos auténticos y rigurosos basados directamente en:
 * - 'Juego de Parciales' de Pedro Alson (Matemática I · 8206)
 * - Guía Oficial de Principios de Química I (Código 3401 · Alvarado, Sojo, Araujo, Castillo)
 * - Guía de Problemas de Química General I (Prof. Liliana López)
 * - Cátedra de Física General I (Mecánica Clásica · 2103)
 */

import type { Question } from '../types/exam.types';

export const SANTIAGO_PROFILE = 'santiago_fisica_ucv' as const;

function buildOptions(texts: [string, string, string, string]) {
  const letters = ['a', 'b', 'c', 'd'] as const;
  return texts.map((text, i) => ({ id: `opt-${letters[i]}`, text }));
}

export const SANTIAGO_SEMESTER_1_QUESTIONS: Question[] = [
  // =========================================================================
  // FÍSICA I (MECÁNICA CLÁSICA · ESCUELA DE FÍSICA UCV)
  // =========================================================================
  {
    id: 'santiago-q-fis1-001',
    subject: 'Física',
    topic: 'Cinemática en ℝ³',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Una partícula se desplaza en el espacio con vector de posición dado por $\\vec{r}(t) = 3t^2 \\hat{i} + (2t - 5) \\hat{j} + 4 \\cos(2t) \\hat{k}$ (en unidades SI). ¿Cuál es la magnitud de su aceleración en el instante $t = 0\\,\\text{s}$?',
    latexFormula: '\\vec{a}(t) = \\frac{d^2 \\vec{r}}{dt^2}',
    options: buildOptions([
      '$\\sqrt{6^2 + (-16)^2} = \\sqrt{292} \\approx 17.09\\,\\text{m/s}^2$',
      '$6\\,\\text{m/s}^2$',
      '$16\\,\\text{m/s}^2$',
      '$\\sqrt{36 + 4} = \\sqrt{40}\\,\\text{m/s}^2$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Derivamos dos veces respecto al tiempo: $\\vec{v}(t) = 6t \\hat{i} + 2 \\hat{j} - 8\\sin(2t) \\hat{k}$. Luego $\\vec{a}(t) = 6 \\hat{i} + 0 \\hat{j} - 16\\cos(2t) \\hat{k}$. Evaluando en $t = 0$: $\\vec{a}(0) = 6 \\hat{i} - 16 \\hat{k}$. Su magnitud es $|\\vec{a}(0)| = \\sqrt{6^2 + (-16)^2} = \\sqrt{36 + 256} = \\sqrt{292} \\approx 17.09\\,\\text{m/s}^2$.',
  },
  {
    id: 'santiago-q-fis1-002',
    subject: 'Física',
    topic: 'Dinámica de Newton y Fricción',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Un bloque de masa $m = 5\\,\\text{kg}$ reposa sobre un plano inclinado a un ángulo $\\theta = 30^\\circ$. El coeficiente de rozamiento estático es $\\mu_s = 0.4$. ¿Deslizará espontáneamente el bloque bajo la sola acción de la gravedad?',
    latexFormula: '\\tan \\theta_c = \\mu_s',
    options: buildOptions([
      'Sí desliza, porque $\\tan(30^\\circ) \\approx 0.577 > \\mu_s = 0.4$',
      'No desliza, permanece en equilibrio estático',
      'Desliza hacia arriba por inercia',
      'Faltan datos de la aceleración gravitacional',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'El ángulo crítico de reposo cumple $\\tan \\theta_c = \\mu_s = 0.4 \\implies \\theta_c \\approx 21.8^\\circ$. Como el ángulo real es $\\theta = 30^\\circ > 21.8^\\circ$, la componente tangencial del peso ($mg \\sin 30^\\circ$) supera a la fuerza de roce estática máxima ($\\mu_s mg \\cos 30^\\circ$), haciendo que el bloque deslice cuesta abajo.',
  },
  {
    id: 'santiago-q-fis1-003',
    subject: 'Física',
    topic: 'Trabajo y Energía Mecánica',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Una fuerza conservativa unidimensional viene descrita por $F(x) = -kx + 3\\beta x^2$. ¿Cuál es la función de energía potencial $U(x)$ asociada, fijando $U(0) = 0$?',
    latexFormula: 'U(x) = -\\int_0^x F(x\')\\, dx\'',
    options: buildOptions([
      '$U(x) = \\frac{1}{2}kx^2 - \\beta x^3$',
      '$U(x) = -\\frac{1}{2}kx^2 + \\beta x^3$',
      '$U(x) = -kx + 6\\beta x$',
      '$U(x) = kx^2 + 3\\beta x^3$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Por definición de energía potencial: $U(x) = -\\int_0^x (-kx\' + 3\\beta x\'^2)\\, dx\' = \\int_0^x (kx\' - 3\\beta x\'^2)\\, dx\' = \\frac{1}{2}kx^2 - \\beta x^3$.',
  },
  {
    id: 'santiago-q-fis1-004',
    subject: 'Física',
    topic: 'Triedro Intrínseco en Cúspide Parabólica',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Un proyectil se dispara con velocidad inicial $\\vec{v}_0 = 20\\hat{i} + 30\\hat{j}\\,\\text{m/s}$. En el punto más alto de su trayectoria, ¿cuáles son los valores de su aceleración tangencial $a_t$ y aceleración normal $a_n$ (con $g = 9.8\\,\\text{m/s}^2$)?',
    latexFormula: 'a_t = \\frac{\\vec{v}\\cdot\\vec{a}}{|\\vec{v}|}, \\quad a_n = \\sqrt{|a|^2 - a_t^2}',
    options: buildOptions([
      '$a_t = 0\\,\\text{m/s}^2$ y $a_n = 9.8\\,\\text{m/s}^2$',
      '$a_t = 9.8\\,\\text{m/s}^2$ y $a_n = 0\\,\\text{m/s}^2$',
      '$a_t = 4.9\\,\\text{m/s}^2$ y $a_n = 4.9\\,\\text{m/s}^2$',
      '$a_t = 0\\,\\text{m/s}^2$ y $a_n = 0\\,\\text{m/s}^2$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'En la cúspide la velocidad vertical se anula ($v_y = 0$), haciendo que $\\vec{v} = 20\\hat{i}\\,\\text{m/s}$ sea puramente horizontal. La gravedad $\\vec{g} = -9.8\\hat{j}\\,\\text{m/s}^2$ es puramente vertical. Por ser ortogonales, el producto escalar es cero y $a_t = 0$. Por Pitágoras intrínseco, toda la aceleración gravitatoria es aceleración normal: $a_n = 9.8\\,\\text{m/s}^2$.',
  },
  {
    id: 'santiago-q-fis1-005',
    subject: 'Física',
    topic: 'Radio de Curvatura de Trayectorias',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Una partícula describe una trayectoria curva con rapidez constante de $12\\,\\text{m/s}$. Si experimenta una aceleración total de $4.0\\,\\text{m/s}^2$, ¿cuál es el radio de curvatura $\\rho$ de la curva en dicho punto?',
    latexFormula: '\\rho = \\frac{v^2}{a_n}',
    options: buildOptions([
      '$36.0\\,\\text{m}$',
      '$3.0\\,\\text{m}$',
      '$48.0\\,\\text{m}$',
      '$144.0\\,\\text{m}$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Al ser constante la rapidez, la aceleración tangencial es nula: $a_t = d|v|/dt = 0$. Toda la aceleración es aceleración normal centrípeta: $a_n = 4.0\\,\\text{m/s}^2$. Despejando: $\\rho = v^2 / a_n = 12^2 / 4.0 = 144 / 4 = 36.0\\,\\text{m}$.',
  },
  {
    id: 'santiago-q-fis1-006',
    subject: 'Física',
    topic: 'Aceleración en Plano Rugoso con Fricción Cinética',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Un bloque de masa $m = 5.0\\,\\text{kg}$ desliza cuesta abajo en un plano inclinado a $\\theta = 30^\\circ$ con coeficiente de fricción cinética $\\mu_k = 0.25$. ¿Cuál es su aceleración real cuesta abajo (tomando $g = 9.8\\,\\text{m/s}^2$)?',
    latexFormula: 'a = g(\\sin\\theta - \\mu_k\\cos\\theta)',
    options: buildOptions([
      '$a \\approx 2.78\\,\\text{m/s}^2$',
      '$a = 4.90\\,\\text{m/s}^2$',
      '$a = 9.80\\,\\text{m/s}^2$',
      '$a = 1.25\\,\\text{m/s}^2$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Por la Segunda Ley de Newton: $ma = mg\\sin 30^\\circ - \\mu_k mg\\cos 30^\\circ \\implies a = g(\\sin 30^\\circ - \\mu_k \\cos 30^\\circ) = 9.8(0.50 - 0.25 \\times 0.866) = 9.8(0.2835) \\approx 2.78\\,\\text{m/s}^2$.',
  },
  {
    id: 'santiago-q-fis1-007',
    subject: 'Física',
    topic: 'Teorema de las Fuerzas Vivas con Fuerza Variable',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Una partícula de $m = 2.0\\,\\text{kg}$ se mueve en línea recta bajo la acción de una fuerza neta dada por $F(x) = 6x\\,\\text{N}$. Si parte del reposo en $x = 0$, ¿cuál es su rapidez al alcanzar $x = 3.0\\,\\text{m}$?',
    latexFormula: 'W_{\\text{neto}} = \\int_0^x F(x\')\\, dx\' = \\Delta K',
    options: buildOptions([
      '$v = \\sqrt{27} \\approx 5.20\\,\\text{m/s}$',
      '$v = 18.0\\,\\text{m/s}$',
      '$v = 9.0\\,\\text{m/s}$',
      '$v = 3.0\\,\\text{m/s}$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'El trabajo neto es $W = \\int_0^3 6x\\, dx = [3x^2]_0^3 = 27\\,\\text{J}$. Por el teorema de las fuerzas vivas: $W = \\frac{1}{2}m v_f^2 - 0 \\implies 27 = \\frac{1}{2}(2.0) v_f^2 = v_f^2 \\implies v_f = \\sqrt{27} \\approx 5.20\\,\\text{m/s}$.',
  },
  {
    id: 'santiago-q-fis1-008',
    subject: 'Física',
    topic: 'Disipación de Energía Mecánica por Fricción',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Un bloque de $4.0\\,\\text{kg}$ entra a una zona rugosa con rapidez inicial de $10.0\\,\\text{m/s}$. La fricción realiza un trabajo disipativo de $-150\\,\\text{J}$. ¿Cuál es su rapidez final al salir del tramo?',
    latexFormula: 'K_f = K_i + W_{\\text{nc}}',
    options: buildOptions([
      '$v_f = 5.0\\,\\text{m/s}$',
      '$v_f = 0\\,\\text{m/s}$',
      '$v_f = 7.5\\,\\text{m/s}$',
      '$v_f = 2.5\\,\\text{m/s}$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Energía cinética inicial: $K_i = \\frac{1}{2}(4.0)(10^2) = 200\\,\\text{J}$. Balance de energía: $K_f = 200 - 150 = 50\\,\\text{J}$. Despejando: $\\frac{1}{2}(4.0) v_f^2 = 50 \\implies 2.0 v_f^2 = 50 \\implies v_f^2 = 25 \\implies v_f = 5.0\\,\\text{m/s}$.',
  },

  // =========================================================================
  // MATEMÁTICA I (CÁTEDRA PEDRO ALSON · MÉTODOS DE GRAFICACIÓN)
  // =========================================================================
  {
    id: 'santiago-q-mat1-001',
    subject: 'Matemática',
    topic: 'Estudio de Curvas y Monotonía (Pedro Alson)',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Una función continua $f(x)$ está definida en $[-5, 5]$ con $f(-5) = -3$ y $f(5) = 4$. Si $f(x)$ es estrictamente creciente en todo su dominio, ¿cuántas soluciones reales posee la ecuación $f(x) = 1$ según el método de caminos de vuelta de Pedro Alson?',
    latexFormula: 'f(x_1) < f(x_2) \\iff x_1 < x_2',
    options: buildOptions([
      'Exactamente una única solución real',
      'Al menos dos soluciones reales',
      'Ninguna solución porque 1 no está en los extremos',
      'Infinitas soluciones en el intervalo central',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Por el Teorema del Valor Intermedio y la monotonía estricta, la función continua creciente recorre inyectivamente todos los valores entre -3 y 4. Como el valor 1 está dentro del intervalo $(-3, 4)$, la recta horizontal y = 1 corta la curva exactamente una sola vez (inyectividad), garantizando una única preimagen x.',
  },
  {
    id: 'santiago-q-mat1-002',
    subject: 'Matemática',
    topic: 'Curva Recíproca (Pedro Alson)',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Si una curva continua $f(x)$ cruza el eje horizontal en $x = 3$ con pendiente positiva $f\'(3) = 2$, ¿qué comportamiento presenta su curva recíproca $r(x) = \\frac{1}{f(x)}$ en las cercanías de $x = 3$?',
    latexFormula: 'r(x) = \\frac{1}{f(x)}',
    options: buildOptions([
      'Una asíntota vertical en $x = 3$, tendiendo a $-\\infty$ por la izquierda y a $+\\infty$ por la derecha',
      'Un corte con el eje horizontal en $x = 3$',
      'Una asíntota vertical que tiende a $+\\infty$ por ambos lados',
      'Una discontinuidad evitable con agujero en $(3, 1/2)$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Al ser f(3) = 0, la función recíproca tiene un polo vertical en x = 3. Como la pendiente es positiva, f(x) < 0 para x < 3 (haciendo que 1/f(x) tienda a -infinito) y f(x) > 0 para x > 3 (haciendo que 1/f(x) tienda a +infinito).',
  },
  {
    id: 'santiago-q-mat1-003',
    subject: 'Matemática',
    topic: 'Teclas y Pantallas: Linealización Cuadrática',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Al aplicar el modelo de Pedro Alson a la expresión cuadrática $y = 3x^2 - 12x + 5$, ¿cuál es su representación en diagrama lineal de pantallas tras completar el trinomio cuadrado perfecto?',
    latexFormula: 'y = a(x - h)^2 + k',
    options: buildOptions([
      '$y = 3(x - 2)^2 - 7$',
      '$y = 3(x - 4)^2 - 11$',
      '$y = (3x - 2)^2 - 7$',
      '$y = 3(x + 2)^2 + 5$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Factorizamos el 3: y = 3(x^2 - 4x) + 5. Completamos el cuadrado: la mitad de -4 es -2, al cuadrado es 4. Sumamos y restamos 4: y = 3[(x - 2)^2 - 4] + 5 = 3(x - 2)^2 - 12 + 5 = 3(x - 2)^2 - 7.',
  },
  {
    id: 'santiago-q-mat1-004',
    subject: 'Matemática',
    topic: 'Hipérbolas Homográficas Canónicas',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Dada la función homográfica $f(x) = \\frac{4x - 1}{2x + 6}$, ¿cuáles son sus asíntotas ortogonales y su parámetro $k$ en la forma canónica $v + \\frac{k}{x - h}$?',
    latexFormula: 'f(x) = v + \\frac{k}{x - h}',
    options: buildOptions([
      'Asíntota vertical $x = -3$, asíntota horizontal $y = 2$, parámetro $k = -6.5$',
      'Asíntota vertical $x = 3$, asíntota horizontal $y = 4$, parámetro $k = 5$',
      'Asíntota vertical $x = -6$, asíntota horizontal $y = 2$, parámetro $k = -1$',
      'Asíntota vertical $x = 0$, asíntota horizontal $y = -1/6$, parámetro $k = 4$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Dividimos: (4x - 1) / (2x + 6) = (4x - 1) / [2(x + 3)] = (1/2) * [ (4(x+3) - 13)/(x+3) ] = (1/2) * [ 4 - 13/(x+3) ] = 2 - 6.5/(x + 3). Por tanto: asíntota vertical h = -3, horizontal v = 2, y k = -6.5.',
  },
  {
    id: 'santiago-q-mat1-005',
    subject: 'Matemática',
    topic: 'Graficación Cualitativa de la Derivada f prime',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Si una curva continua $f(x)$ alcanza un máximo local suave en $x = -2$ y un mínimo local suave en $x = 4$, ¿cuál es el comportamiento obligatorio de su función derivada $f\'(x)$?',
    latexFormula: 'f\'(x_0) = 0 \\text{ en extremos locales suaves}',
    options: buildOptions([
      '$f\'(-2) = 0$, $f\'(4) = 0$, y $f\'(x) < 0$ para todo $x \\in (-2, 4)$',
      '$f\'(-2) = 4$, $f\'(4) = -2$, y $f\'(x) > 0$ en el tramo central',
      '$f\'(x)$ alcanza un máximo en $x = -2$ y un mínimo en $x = 4$',
      '$f\'(x)$ no puede existir en los extremos de la curva',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'En un máximo local suave, la tangente es horizontal, por lo que f prime (-2) = 0. En un mínimo suave, la tangente también es horizontal, por lo que f prime (4) = 0. Entre el máximo y el mínimo la función decrece, lo que exige rigurosamente que su derivada sea negativa (f prime (x) < 0).',
  },
  {
    id: 'santiago-q-mat1-006',
    subject: 'Matemática',
    topic: 'Caminos de Vuelta y Preimágenes (Pedro Alson)',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Dada una función continua $f: [-4, 6] \\to \\mathbb{R}$ con ceros en $x=-1$ y $x=4$, mínimo absoluto en $(-2, -4)$ y máximo en $(3, 5)$, ¿cuántas soluciones reales tiene la ecuación $f(x) = 2$ en dicho intervalo?',
    latexFormula: 'f(x) = 2',
    options: buildOptions([
      'Exactamente 2 soluciones reales (una en $(-2, 0)$ y otra en $(3, 6)$)',
      'Exactamente 3 soluciones reales',
      'Exactamente 1 única solución real',
      'Infinitas soluciones en el intervalo central',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'La recta horizontal y = 2 corta la curva únicamente en los tramos donde el rango abarca el valor 2. De x = -4 a -2 desciende de -2 a -4 (no alcanza 2). De x = -2 a 3 asciende monótonamente de -4 a 5 (corta exactamente una vez). De x = 3 a 6 desciende de 5 a 1 (vuelve a cortar exactamente una vez). Total: 2 soluciones reales.',
  },
  {
    id: 'santiago-q-mat1-007',
    subject: 'Matemática',
    topic: 'Ecuación Trascendente por Teclas y Pantallas',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'En la ecuación $\\tan((x - 0.23)^2) = 0.36$ de Pedro Alson, ¿cuál es la tecla más alejada y cuál es el primer paso de despeje en reversa?',
    latexFormula: '\\tan((x - 0.23)^2) = 0.36',
    options: buildOptions([
      'La tecla más alejada es $[\\tan]$ y su inversa aplicada es $[\\arctan]$',
      'La tecla más alejada es $[-0.23]$ y su inversa es $[+0.23]$',
      'La tecla más alejada es $[()^2]$ y su inversa es $[\\sqrt{}]$',
      'No se puede despejar sin aproximación de Taylor',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'La cadena directa es x -> [-0.23] -> [()^2] -> [tan] -> 0.36. La última operación aplicada a la expresión completa es la tangente. Por tanto, para marchar en reversa se aplica primero la función inversa arcotangente: (x - 0.23)^2 = arctan(0.36).',
  },
  {
    id: 'santiago-q-mat1-008',
    subject: 'Matemática',
    topic: 'Conteo Gráfico de Ecuaciones Trascendentes',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Para determinar el número de soluciones reales de $e^{-x} = x^2 - 2$, ¿cuál es el procedimiento visual riguroso de Pedro Alson?',
    latexFormula: 'f_1(x) = f_2(x)',
    options: buildOptions([
      'Separar en $f_1(x) = e^{-x}$ y $f_2(x) = x^2 - 2$, graficarlas simultáneamente y contar sus puntos de intersección',
      'Aplicar logaritmos naturales a ambos lados ciegamente',
      'Evaluar únicamente valores enteros en una tabla',
      'Igualar ambas derivadas a cero',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Las ecuaciones trascendentes no admiten despeje algebraico directo. Al separar en la exponencial decreciente e^-x y la parábola x^2 - 2, las intersecciones geométricas corresponden exactamente a las soluciones reales del problema.',
  },
  {
    id: 'santiago-q-mat1-009',
    subject: 'Matemática',
    topic: 'Inecuaciones Gráficas Racionales (Pedro Alson)',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Para resolver $\\frac{3x + 1}{x - 2} < x$, ¿cómo se determina visualmente el conjunto solución?',
    latexFormula: '\\frac{3x+1}{x-2} < x',
    options: buildOptions([
      'Graficando la hipérbola y la recta $y = x$, y leyendo los intervalos sobre el eje $x$ donde la hipérbola está por debajo de la recta',
      'Multiplicando ambos lados por $(x - 2)$ ignorando el cambio de signo',
      'Pasando la $x$ a restar y aplicando signos sin considerar la asíntota',
      'Sustituyendo únicamente $x = 0$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'La inecuación f(x) < g(x) significa: ¿dónde la curva f flota por debajo de la curva g? Se hallan los cortes entre la hipérbola y la recta y = x, y las fronteras de asíntota dividen el eje en intervalos donde se lee directamente la solución.',
  },
  {
    id: 'santiago-q-mat1-010',
    subject: 'Matemática',
    topic: 'No Derivabilidad por Definición',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      '¿Por qué la función $f(x) = |x - 2|$ no es derivable en $x = 2$ a pesar de ser continua en todo $\\mathbb{R}$?',
    latexFormula: '\\lim_{h\\to 0} \\frac{|h|}{h}',
    options: buildOptions([
      'Porque los límites laterales del cociente incremental son distintos ($+1$ y $-1$), generando un punto anguloso',
      'Porque la función no está definida en $x = 2$',
      'Porque diverge a infinito en $x = 2$',
      'Porque la recta secante tiene pendiente cero',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'El cociente incremental es lim_{h->0} |h|/h. Por la derecha (h > 0) vale +1, y por la izquierda (h < 0) vale -1. Al no coincidir las derivadas laterales, la derivada no existe y la gráfica presenta un vértice o punto anguloso.',
  },

  // =========================================================================
  // PRINCIPIOS DE QUÍMICA I (CÓDIGO 3401 · ESCUELA DE QUÍMICA UCV)
  // =========================================================================
  {
    id: 'santiago-q-qgi-001',
    subject: 'Química',
    topic: 'Cifras Significativas y Densidad (Química I)',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Un estudiante de Química I pesa un sólido en balanza analítica registrando $25.40\\,\\text{g}$ y mide su volumen en probeta obteniendo un cambio de nivel de $10.0\\,\\text{mL}$ a $13.2\\,\\text{mL}$. ¿Cómo debe reportar la densidad del sólido aplicando las reglas de cifras significativas?',
    latexFormula: 'd = \\frac{m}{V_f - V_i}',
    options: buildOptions([
      '$7.9\\,\\text{g/mL}$ (2 cifras significativas)',
      '$7.9375\\,\\text{g/mL}$ (5 cifras significativas)',
      '$7.94\\,\\text{g/mL}$ (3 cifras significativas)',
      '$8\\,\\text{g/mL}$ (1 cifra significativa)',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'La diferencia de volumen es 13.2 mL - 10.0 mL = 3.2 mL (conserva 1 decimal, teniendo solo 2 cifras significativas: el 3 y el 2). La masa tiene 4 cifras significativas (25.40). En la división manda el menor número de cifras significativas (2), por lo que 25.40 / 3.2 = 7.9375 debe redondearse estrictamente a 7.9 g/mL.',
  },
  {
    id: 'santiago-q-qgi-002',
    subject: 'Química',
    topic: 'Estructura Electrónica y Anomalía de Aufbau',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      '¿Cuál es la configuración electrónica en el estado fundamental para el átomo de Cobre ($Z = 29$) y cuántos electrones desapareados posee?',
    latexFormula: '[\\text{Ar}] 4s^1 3d^{10}',
    options: buildOptions([
      '$[\\text{Ar}] 4s^1 3d^{10}$, con 1 electrón desapareado',
      '$[\\text{Ar}] 4s^2 3d^9$, con 1 electrón desapareado',
      '$[\\text{Ar}] 4s^2 3d^9$, con 0 electrones desapareados',
      '$[\\text{Ar}] 4s^0 3d^{11}$, con 2 electrones desapareados',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'El cobre presenta una anomalía cuántica de estabilidad termodinámica: promociona un electrón del subnivel 4s para completar la subcapa 3d10 (completamente llena). Su configuración real es [Ar] 4s1 3d10. El orbital 4s contiene 1 electrón solitario, por lo que tiene exactamente 1 electrón desapareado (paramagnético).',
  },
  {
    id: 'santiago-q-qgi-003',
    subject: 'Química',
    topic: 'Tabla Periódica: Carga Nuclear Efectiva',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Al comparar los iones isoelectrónicos $\\text{N}^{3-}$, $\\text{O}^{2-}$, $\\text{F}^{-}$ y $\\text{Na}^{+}$ (todos con 10 electrones), ¿cuál presenta el menor radio iónico y por qué?',
    latexFormula: 'Z_{\\text{ef}} = Z - S',
    options: buildOptions([
      '$\\text{Na}^{+}$, porque posee el mayor número atómico ($Z = 11$) y mayor $Z_{\\text{ef}}$ atrayendo la nube con más fuerza',
      '$\\text{N}^{3-}$, porque tiene la mayor carga negativa',
      '$\\text{F}^{-}$, porque el flúor es el elemento más electronegativo',
      'Todos tienen idéntico radio por poseer exactamente 10 electrones',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'En especies isoelectrónicas el apantallamiento es idéntico. La atracción sobre los 10 electrones depende exclusivamente de los protones del núcleo. El Na+ tiene 11 protones atrayendo 10 electrones, lo que genera la mayor carga nuclear efectiva Z_ef y contrae fuertemente la nube electrónica, haciéndolo el más pequeño de la serie.',
  },
  {
    id: 'santiago-q-qgi-004',
    subject: 'Química',
    topic: 'Geometría Molecular TRPEV / VSEPR',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      '¿Cuál es la geometría molecular real del tetrafluoruro de azufre ($\\text{SF}_4$) según el modelo de repulsión de pares de electrones de la capa de valencia (TRPEV)?',
    latexFormula: '\\text{Número Estérico} = 4 \\text{ enlaces} + 1 \\text{ par libre} = 5',
    options: buildOptions([
      'Balancín (o subibaja / see-saw)',
      'Tetraédrica regular',
      'Cuadrada plana',
      'Piramidal trigonal',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'El átomo central de Azufre (Grupo 16) tiene 6 electrones de valencia. Forma 4 enlaces simples con F (4 electrones) y le queda 1 par libre (2 electrones). El número estérico es 4 + 1 = 5 (geometría de pares bipiramidal trigonal). El par libre se ubica en el plano ecuatorial a 120 grados para minimizar repulsión, dejando una geometría molecular de Balancín (see-saw).',
  },
  {
    id: 'santiago-q-qgi-005',
    subject: 'Química',
    topic: 'Estequiometría y Reactivo Limitante',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Se mezclan $2.0\\,\\text{moles}$ de gas $\\text{N}_2$ con $3.0\\,\\text{moles}$ de gas $\\text{H}_2$ para sintetizar amoníaco según $\\text{N}_2(g) + 3\\,\\text{H}_2(g) \\rightarrow 2\\,\\text{NH}_3(g)$. ¿Cuántos moles de $\\text{NH}_3$ se pueden producir como máximo teórico?',
    latexFormula: '\\frac{n}{\\text{coeficiente}}',
    options: buildOptions([
      '$2.0\\,\\text{moles de } \\text{NH}_3$',
      '$4.0\\,\\text{moles de } \\text{NH}_3$',
      '$1.0\\,\\text{mol de } \\text{NH}_3$',
      '$3.0\\,\\text{moles de } \\text{NH}_3$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Comparamos la relación moles/coeficiente: Para N2: 2.0 / 1 = 2.0. Para H2: 3.0 / 3 = 1.0. Como 1.0 < 2.0, el H2 es el reactivo limitante. Los 3.0 moles de H2 limitante producen: 3.0 moles H2 * (2 moles NH3 / 3 moles H2) = 2.0 moles de NH3 teóricos.',
  },
  {
    id: 'santiago-q-qgi-006',
    subject: 'Química',
    topic: 'Propiedades Coligativas y Factor de van t Hoff',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      '¿Cuál de las siguientes disoluciones acuosas $0.10\\,\\text{m}$ registrará el punto de congelación más bajo (menor temperatura bajo cero)?',
    latexFormula: '\\Delta T_f = K_f \\cdot m \\cdot i',
    options: buildOptions([
      'Cloruro de aluminio $\\text{AlCl}_3$ ($i \\approx 4$)',
      'Cloruro de sodio $\\text{NaCl}$ ($i \\approx 2$)',
      'Cloruro de calcio $\\text{CaCl}_2$ ($i \\approx 3$)',
      'Glucosa $\\text{C}_6\\text{H}_{12}\\text{O}_6$ ($i = 1$)',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'El descenso crioscópico es directamente proporcional al producto m * i. A igual molalidad (0.10 m), la sal que produzca mayor número de iones libres generará el mayor descenso de temperatura. El AlCl3 se disocia en 1 Al(3+) y 3 Cl(-), dando i = 4. Esto produce el mayor Delta Tf y por tanto el punto de congelación más bajo bajo cero.',
  },
  {
    id: 'santiago-q-qgi-007',
    subject: 'Química',
    topic: 'Masa Atómica Ponderada de Isótopos',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'El elemento Galio ($Z = 31$) posee dos isótopos: $^{69}\\text{Ga}$ ($68.925\\,\\text{u}$, $60.11\\%$) y $^{71}\\text{Ga}$ ($70.925\\,\\text{u}$, $39.89\\%$) . ¿Cuál es su masa atómica promedio?',
    latexFormula: '\\bar{A} = \\sum x_i m_i',
    options: buildOptions([
      '$69.72\\,\\text{u}$',
      '$69.93\\,\\text{u}$',
      '$68.93\\,\\text{u}$',
      '$70.50\\,\\text{u}$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Multiplicamos masas por fracciones molares: (0.6011)(68.925) + (0.3989)(70.925) = 41.4308 + 28.2920 = 69.7228 u ≈ 69.72 u.',
  },
  {
    id: 'santiago-q-qgi-008',
    subject: 'Química',
    topic: 'Estructuras de Lewis y Cargas Formales',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'En la estructura de Lewis del monóxido de carbono $\\text{C}\\equiv\\text{O}$ con enlace triple y 1 par libre en cada átomo, ¿cuáles son las cargas formales de C y O?',
    latexFormula: '\\text{CF} = V - N - \\frac{B}{2}',
    options: buildOptions([
      'Carbono: $-1$, Oxígeno: $+1$',
      'Carbono: $0$, Oxígeno: $0$',
      'Carbono: $+1$, Oxígeno: $-1$',
      'Carbono: $-2$, Oxígeno: $+2$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Para C (Grupo 14): CF = 4 - 2 - 6/2 = -1. Para O (Grupo 16): CF = 6 - 2 - 6/2 = +1.',
  },
  {
    id: 'santiago-q-qgi-009',
    subject: 'Química',
    topic: 'Nomenclatura Sistemática IUPAC',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      '¿Cuál es el nombre sistemático canónico IUPAC para $\\text{Fe}_2(\\text{SO}_4)_3$ según las normas oficiales de la Escuela de Química UCV?',
    latexFormula: '\\text{Prefijos multiplicativos bis, tris, tetraquis}',
    options: buildOptions([
      'Tris[tetraoxosulfato] de dihierro',
      'Tri-sulfato de di-hierro',
      'Sulfato férrico anhidro simple',
      'Tetraóxido de hierro y azufre',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Al contener el radical poliatómico tetraoxosulfato, la IUPAC y la Escuela de Química de la UCV exigen usar el prefijo multiplicativo griego tris-: tris[tetraoxosulfato] de dihierro.',
  },
  {
    id: 'santiago-q-qgi-010',
    subject: 'Química',
    topic: 'Balanceo Redox por Ion-Electrón en Medio Ácido',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'En el balanceo de la semirreacción $\\text{MnO}_4^- \\to \\text{Mn}^{2+}$ en medio ácido, ¿cuántos protones $\\text{H}^+$ y cuántos electrones $e^-$ se requieren?',
    latexFormula: '\\text{MnO}_4^- + 8\\text{H}^+ + 5e^- \\to \\text{Mn}^{2+} + 4\\text{H}_2\\text{O}',
    options: buildOptions([
      '$8\\,\\text{H}^+$ y $5\\,e^-$',
      '$4\\,\\text{H}^+$ y $3\\,e^-$',
      '$8\\,\\text{H}^+$ y $7\\,e^-$',
      '$14\\,\\text{H}^+$ y $6\\,e^-$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Balanceamos 4 oxígenos con 4 H2O a la derecha, 8 hidrógenos con 8 H+ a la izquierda. Carga neta a la izquierda: -1 + 8 = +7; a la derecha: +2. Se requieren 5 electrones a la izquierda para igualar.',
  },
  {
    id: 'santiago-q-qgi-011',
    subject: 'Química',
    topic: 'Leyes de los Gases y Dalton Sobre Agua',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'Se recolecta gas nitrógeno sobre agua a $20^\\circ\\text{C}$ con presión barométrica de $760\\,\\text{mmHg}$. Si la presión de vapor del agua a $20^\\circ\\text{C}$ es $17.5\\,\\text{mmHg}$, ¿cuál es la presión del gas seco?',
    latexFormula: 'P_{\\text{gas}} = P_{\\text{total}} - P_{\\mathrm{H_2O}}',
    options: buildOptions([
      '$742.5\\,\\text{mmHg}$',
      '$777.5\\,\\text{mmHg}$',
      '$760.0\\,\\text{mmHg}$',
      '$17.5\\,\\text{mmHg}$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Por la ley de Dalton: P(seco) = P_total - P(H2O) = 760.0 mmHg - 17.5 mmHg = 742.5 mmHg.',
  },
  {
    id: 'santiago-q-qgi-012',
    subject: 'Química',
    topic: 'Ley de Raoult y Presión de Vapor',
    difficulty: 'Avanzado',
    targetProfiles: [SANTIAGO_PROFILE],
    questionText:
      'A $25^\\circ\\text{C}$, el agua pura tiene presión de vapor de $23.8\\,\\text{mmHg}$. Se disuelven $0.50\\,\\text{moles}$ de glucosa en $4.50\\,\\text{moles}$ de agua. ¿Cuál es la presión de vapor de la disolución resultante?',
    latexFormula: 'P_{\\text{sol}} = X_{\\text{solvente}} P^\\circ',
    options: buildOptions([
      '$21.4\\,\\text{mmHg}$',
      '$23.8\\,\\text{mmHg}$',
      '$2.38\\,\\text{mmHg}$',
      '$26.2\\,\\text{mmHg}$',
    ]),
    correctOptionId: 'opt-a',
    explanation:
      'Fracción molar del agua: X = 4.50 / (0.50 + 4.50) = 0.90. Presión: P = 0.90 * 23.8 mmHg = 21.42 mmHg ≈ 21.4 mmHg.',
  },
];
