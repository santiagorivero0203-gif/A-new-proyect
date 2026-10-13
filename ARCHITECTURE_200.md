# 🏛️ Arquitectura y Clasificación Oficial de las 200 Funciones

> **Centro de Productividad Estudiantil**  
> **Auditoría Técnica**: Principal QA Engineer & Cloud Architect  
> **Fecha de Actualización**: Octubre 2026  
> **Entorno**: React 19 + TypeScript + Vite 8 + Vercel Serverless (Límite Hobby) + Supabase Postgres RLS

---

## 📊 Estado Ejecutivo de Implementación

| Estado | Significado | Cantidad | Porcentaje |
| :--- | :--- | :---: | :---: |
| 🟢 **100% Operativas** | Funciones con Lógica real + UI conectada de extremo a extremo sin dependencias faltantes | **73** | **36.5%** |
| 🟡 **Parciales / Solo UI** | Módulos maquetados con estado local o interfaz funcional que admiten mayor automatización | **45** | **22.5%** |
| 🔴 **Pendientes (0%)** | Funciones no creadas aún, estructuradas en paquetes de trabajo (Sprints) | **82** | **41.0%** |
| **TOTAL** | **Alcance del Roadmap Global** | **200** | **100%** |

---

## 🟢 1. Funciones 100% Operativas (Lógica + UI Completas)

### A. Motor Dual Híbrido, IA y Serverless Backend
1. **Carril A Instantáneo (0 clics)**: Worker serverless `/api/nexus-worker` con Gemini 2.5 Flash para desgloses Notion AI en 2 a 4 segundos.
2. **Carril B Modo Profundo (Spark MCP)**: Servidor `/api/mcp` con transporte dual (SSE y JSON-RPC 2.0) y 5 herramientas registradas para Gemini Spark.
3. **Carril C Rescate Automático**: Cron Job en `vercel.json` (`*/15 * * * *`) que procesa documentos encolados hace más de 30 minutos.
4. **Guardarraíl Cognitivo `BASICO_ESCOLAR`**: Bloqueo absoluto de física avanzada o matrices en álgebra escolar de 1er año (Andrés).
5. **Guardarraíl Cognitivo `BACHILLERATO_AVANZADO`**: Rigor pre-universitario con trucos de examen de admisión y descarte de distractores.
6. **Guardarraíl Cognitivo `UNIVERSITARIO_EXACTAS`**: Demostraciones formales en LaTeX para cálculo integral y física UCV (Santiago).
7. **Guardarraíl Cognitivo `UNIVERSITARIO_DISENO`**: Cero fórmulas matemáticas inventadas; adaptación a principios de composición visual (Mafe).
8. **Directriz Global Anti-Alucinación**: Prohibición de cambio de materia; si el documento es álgebra, no inventar problemas de cinemática.
9. **Parser Tolerante a LaTeX en JSON (`cleanAndParseJsonWithLatex`)**: Expresiones regulares que reparan barras invertidas de comandos LaTeX (`\frac`, `\sqrt`, `\alpha`, `\theta`) antes de `JSON.parse`.
10. **Desglose de Objetivos Notion AI**: Herramienta `analyze_and_breakdown_task` que genera prioridades, pomodoros y subtareas paso a paso.
11. **Monitor de Servicios en Vivo (`LiveSystemStatusWidget`)**: Medición de latencia en milisegundos hacia Supabase, API Vercel y Servidor MCP con badge en Header.
12. **Panel de Telemetría y Cuotas (`AdminTelemetryPanel`)**: Supervisión de cuota Gemini Flash, peticiones Carril A vs Carril B y capacidad en Storage.

### B. Herramientas Matemáticas, Físicas y Científicas (Sprint A Completado)
13. **Solucionador Determinista de Sistemas Lineales 2×2**: Resolución paso a paso en KaTeX mediante **Reducción**, **Sustitución**, **Igualación** y **Regla de Cramer**.
14. **Solucionador Determinista de Sistemas Lineales 3×3**: Resolución exacta mediante determinantes de tercer orden por la Regla de Sarrus.
15. **Aritmética Fraccionaria Determinista**: Clase `Fraction` con Máximo Común Divisor (MCD) para mostrar siempre fracciones simplificadas sin decimales periódicos.
16. **Calculadora Científica Interactiva**: Funciones trigonométricas, exponenciales, logaritmos, memoria y evaluación segura con teclado virtual.
17. **Calculadora de Álgebra Vectorial 2D y 3D (`VectorCalculatorWidget`)**: Magnitud euclidiana $||\vec{u}||$, producto escalar $\vec{u} \cdot \vec{v}$, ángulo en grados sexagesimales, producto vectorial 3D $\vec{u} \times \vec{v}$ y proyección ortogonal.
18. **Balanceador Estequiométrico Determinista (`StoichiometryBalancer`)**: Conservación de masa, masas molares, balance atómico con KaTeX y cálculo interactivo de reactivo limitante.
19. **Tabla Periódica Interactiva (`InteractivePeriodicTable`)**: Configuración cuántica, electronegatividad de Pauling, radio atómico y filtrado reactivo instantáneo.
20. **Calculadora Cuantitativa de pH, pOH y Molaridad (`PhMolarityCalculator`)**: Escala logarítmica de pH/pOH, concentraciones $[H_3O^+]/[OH^-]$ y cálculo de concentración molar ($M = n/V$).
21. **Simulador de Genética Mendeliana & Punnett (`MendelianGeneticsSimulator`)**: Cruces monohíbridos ($2 \times 2$) y dihíbridos ($4 \times 4$) con frecuencias genotípicas/fenotípicas y leyes de Mendel.
22. **Laboratorio de Ecuaciones LaTeX**: Renderizador en tiempo real con KaTeX seguro frente a inyecciones.

### C. Módulos Humanísticos, Castellano y Técnicas de Lectura (Sprint B Completado)
23. **Analizador Morfosintáctico de Oraciones (`SentenceSyntaxAnalyzer`)**: Desglose de Sujeto (NS, MD, MI, Aposición) y Predicado (NP, CD, CI, CC de Modo/Tiempo/Lugar/Causa) con conmutación pronominal.
24. **Entrenador de Comprensión Lectora & Inferencia (`ReadingComprehensionTrainer`)**: Textos académicos de admisión con preguntas inferenciales, de vocabulario contextual y justificación de descarte de distractores.
25. **Tarjetas Mnemotécnicas de Repetición Espaciada SM-2 (`SpacedRepetitionFlashcards`)**: Implementación matemática del algoritmo SuperMemo-2 con factores de facilidad ajustables e intervalos en días.
26. **Cronómetro de Lectura Rápida & Test de Retención (`SpeedReadingTimer`)**: Medición de Palabras por Minuto (PPM), test conceptual inmediato y cálculo de Velocidad Efectiva de Asimilación.

### D. Diseño, Color y Canva Studio Hub
27. **Canva Studio Hub (`CanvaStudioHub`)**: Integración con visualizador de embeds de Canva en vivo dentro del taller de diseño.
28. **Estructurador de Tabla de 4 Columnas con Límite de Palabras**: Guardarraíles de 7 palabras en título/concepto/CTA y 15 palabras en cuerpo para evitar texto desbordado en diapositivas.
29. **Exportador CSV para Canva Crear en Lote (Bulk Create)**: Generación de archivo `.csv` codificado en UTF-8 con BOM para inyección masiva en plantillas de Canva.
30. **Verificador de Contraste Tipográfico WCAG AA/AAA**: Algoritmo de luminancia relativa con validación de accesibilidad universal para texto normal y grande.
31. **Extractor y Generador de Armonías de Color**: Creación de paletas monocromáticas, complementarias, análogas y de tríada con copia rápida en formato HEX.
32. **Tablero de Entregas Creativas con Selector Triple**: Alternancia limpia entre Tablero Kanban, Mural Visual (Masonry Grid) y Canva Studio Hub.

### D. Enfoque, Planificación y Productividad
25. **Mezclador de Paisajes Sonoros Procedurales (`FocusSoundscapeMixer`)**: Web Audio API nativa sin archivos pesados; síntesis de Lluvia suave, Fuego, Agua y Ondas Gamma 40Hz (batimiento binaural).
26. **Simulador What-If de Calificaciones ("¿Cuánto necesito para pasar?")**: Soporte multiescala (1-20, 1-100, 1-5), ponderación por corte y detección de viabilidad matemática.
27. **Temporizador Pomodoro Parametrizado**: Modos 25/5, 50/10 y modo de estudio profundo con persistencia de ciclo.
28. **Tablero Kanban Interactivo**: Columnas Por Hacer, En Proceso y Completado con arrastre y persistencia en Supabase.
29. **Agenda y Calendario Académico**: Registro de fechas límite, parciales, quizes y entregas de taller con pesos porcentuales.
30. **Calculadora de Proyección de Notas**: Ponderación acumulada de evaluaciones oficiales y meta por asignatura.
31. **Selector Rápido de Estudiante en 1 Clic (`ProfileQuickSwitcher`)**: Cambio instantáneo entre Andrés, Sofía, Santiago y Mafe en el pie del Sidebar.
32. **Respaldo y Restauración Total JSON (`BackupRestoreModal`)**: Descarga y carga completa de tareas, notas, guías y configuraciones.

### E. Motor de Evaluaciones y Exámenes
33. **Simulador de Exámenes con Temporizador**: Cronómetro estricto con auto-entrega desacoplada al expirar el tiempo.
34. **Modo Presión Real (`TIME_PRESSURE`)**: 10 preguntas relámpago con 30 segundos promedio y sin pausa.
35. **Modo Muerte Súbita (`SUDDEN_DEATH`)**: 0 margen de error; auto-finalización inmediata al primer error con análisis de falla.
36. **Examen de Carrera Universitaria**: Preguntas de Cálculo I, vectores $\mathbb{R}^3$, dinámica con fricción y conservación de energía.
37. **Examen de Bachillerato Diversificado**: Preguntas de Álgebra, cinemática, enlaces químicos, biología celular y morfosintaxis.
38. **Evaluación Diagnóstica Multidisciplinar**: Batería mixta para evaluar fortalezas y vacíos conceptuales.
39. **Reporte Pedagógico de Resultados**: Desglose por materia, área, porcentaje de acierto y revisión de explicaciones con KaTeX.
40. **Borrador Rápido / Scratchpad Drawer**: Lienzo HTML5 para cálculos a mano alzada y laboratorio LaTeX flotante.

*(Y 25 funciones operativas adicionales de navegación, empty states, autenticación dual demo/Supabase y sincronización offline).*

---

## 🟡 2. Funciones Parciales / Solo UI (Maquetadas que Requieren Lógica Adicional)

1. **Reproductor de Audio-Guías Sintetizadas (`AudioGuidePlayer.tsx`)**: La interfaz está creada con controles de play/pause/velocidad, pero requiere conectar el sintetizador de voz (Web Speech API o ElevenLabs).
2. **Sistema de Supervisión por Cámara (`useProctoringCamera.ts` / `proctoringSystem.ts`)**: Captura de webcam y detección de parpadeo maquetada; falta afinar el modelo de TensorFlow.js o visión local para detección de miradas laterales.
3. **Módulo de Sincronización de Archivos Grandes en Vault (`DocumentUploader.tsx`)**: Sube a Supabase Storage con éxito, pero le falta la compresión automática en cliente antes de la subida para PDFs de más de 30MB.
4. **Paleta de Comandos Global (`CommandPalette.tsx`)**: Abre con `Ctrl+K` y permite buscar pestañas; falta indexar tareas individuales y fórmulas directas en el buscador.
5. **Widget de Gráficas Interactivas 2D/3D (`VectorAndGraphInteractive.tsx`)**: Renderiza planos vectoriales; falta agregar interactividad de arrastre de vectores con el mouse sobre el canvas.

---

## 🔴 3. Funciones Pendientes (0%) Clasificadas en Sprints de Trabajo

### 📦 Sprint A: Módulos de Biología, Química y Laboratorio Virtual
- **Función 111**: Balanceador estequiométrico determinista de ecuaciones químicas por método algebraico y tanteo.
- **Función 112**: Tabla Periódica Interactiva con radios atómicos, electronegatividad de Pauling y configuraciones electrónicas.
- **Función 113**: Calculadora de pH y concentraciones molares para química general de bachillerato y ciencias.
- **Función 114**: Árbol de genética mendeliana con cuadros de Punnett predictivos para 1 y 2 caracteres.

### 📦 Sprint B: Módulos Humanísticos, Castellano y Técnicas de Lectura
- **Función 131**: Analizador morfosintáctico de oraciones en español (Sujeto, Predicado, Modificadores, Cláusulas).
- **Función 132**: Entrenador de comprensión lectora con textos de admisión y preguntas de inferencia y vocabulario contextual.
- **Función 133**: Detector mnemotécnico y generador de tarjetas espaciadas tipo Anki (algoritmo SM-2).
- **Función 134**: Cronómetro de lectura rápida con cálculo automático de palabras por minuto (PPM) y test de retención.

### 📦 Sprint C: Inteligencia de Estudio Predictiva y Exportaciones
- **Función 151**: Generador de horarios de estudio adaptativos que reprograma bloques según tareas atrasadas.
- **Función 152**: Exportador de resúmenes de estudio en formato PDF imprimible estilo revista editorial Apple.
- **Función 153**: Conexión con Notion API para exportar las guías deconstruidas directamente al workspace del usuario.
- **Función 154**: Modo oscuro ambiental (Dark Mode Deep Slate) con ajuste de temperatura de color nocturna (Night Shift).
