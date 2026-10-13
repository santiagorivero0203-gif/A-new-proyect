# Bitácora de Prompts, Decisiones de Arquitectura y Registro de Cambios (Changelog)

Este documento registra de forma cronológica y exhaustiva todos los prompts recibidos del usuario, las decisiones de arquitectura de software, la evolución del diseño visual y cada uno de los cambios técnicos realizados en el **Centro de Productividad Estudiantil**.

---

## 1. Registro de Prompts del Usuario

### Prompt 1: Fase 1 - Arquitectura Base y Enrutamiento de Perfiles
> **Contenido**: Creación de la plataforma integral "Centro de Productividad Estudiantil", escalable y responsiva (PC y móvil). Núcleo basado en la evolución del proyecto anterior "Simulación Simadi" (motor de exámenes con temporizador, renderizado MathJax/KaTeX, base de datos JSON). 4 perfiles iniciales con necesidades distintas: Andrés (1er año bachillerato), Prima (5to año bachillerato / admisión), Santiago (Física teórica UCV), María Fernanda (Diseño Integral UCAB).
> **Objetivo técnico**: Base con React, Vite, Tailwind CSS, Supabase y enrutamiento dinámico.

### Prompt 2: Refinamiento de Estilo y Paleta de Colores
> **Contenido**: Cambio a paleta en tonos claros profesional, eliminando colores saturados innecesarios y adoptando el estilo minimalista de `Invoficlib`. Calculadora como opción desacoplada en herramientas/ajustes. Perfiles con las mismas funciones de productividad y recordatorios, variando guías y tipos de ejercicios. Cobertura de Castellano, Biología, Química, Física básica y avanzada, y Matemática (desde básica hasta vectores y gráficas).
> **Repositorio base**: `https://github.com/santiagorivero0203-gif/A-new-proyect`

### Prompt 3: Fase 2 - Motor de Exámenes, Guías y Storage
> **Contenido**: Migración del motor de simulación de exámenes (originalmente en Vanilla JS en Simadi) a un entorno moderno, modular y reactivo en React con custom hooks y estado global. Preparación para recibir documentos reales y almacenamiento en Supabase Storage.

### Prompt 4: Fase 3 - Inteligencia Artificial, Automatización y Generación Dinámica
> **Contenido**: Integración de la API de Google Gemini (Edge Functions / cliente seguro) para procesar apuntes, PDFs y fotos de pizarras subidas al Storage, extrayendo preguntas estructuradas y fórmulas en LaTeX para alimentar el motor de exámenes.

### Prompt 5: Fase 4 - Auditoría Lógica, Modularidad Universal y Refinamiento UI/UX
> **Contenido**: Eliminación de rutas rígidas por perfil. Implementación del *Dashboard Modular Universal* donde cada usuario dispone de un lienzo personalizable con módulos acoplables y desacoplables (Pomodoro, Tareas, Evaluaciones, Asistente Gemini, Calculadora, Kanban, Guías, Laboratorio LaTeX).

### Prompt 6: Limpia de "AI Slop", Corrección KaTeX, Sistema Real de Evaluaciones & Agenda Académica (Fase Actual)
> **Contenido**:
> 1. **Limpia de diseño AI Slop**: Quitar explicaciones redundantes o condescendientes que explican técnicamente de qué trata cada apartado. Quitar funciones falsas que no existen como los días de racha ("11 días de racha") y XP ficticio. Quitar constantes físicas universales de lugares no pertinentes (ajustes).
> 2. **Tipografía profesional**: Cambiar tipografía a una familia profesional sans-serif de alta precisión (Inter / San Francisco), eliminando fuentes infantiles o redondeadas.
> 3. **Eliminar menciones de marca "Simadi" manteniendo el 100% de la lógica**: Traer toda la lógica de simulación, temporizador, corrección y navegación de preguntas a la app, pero renombrándola con terminología académica estándar ("Evaluaciones", "Exámenes", "Pruebas", "Cuestionarios").
> 4. **Modelos de examen reales**: Adaptar e incluir exámenes reales de carrera (Cálculo I, Dinámica con fricción, Vectores en $\mathbb{R}^3$, Integrales) y de bachillerato (Química, Enlace iónico, Estequiometría, Biología celular, Genética mendeliana, Castellano y analogías verbales).
> 5. **Solución crítica de renderizado matemático (KaTeX)**: Corregir el bug que provocaba que frases en español completas se procesaran como fórmulas matemáticas, eliminando espacios y deformando la visualización con letras itálicas continuas.
> 6. **Sistema Real de Calendario, Recordatorios, Evaluaciones y Notas**: Crear un sistema persistente para registrar fechas de evaluaciones, cortes con porcentajes (ponderaciones del plan de evaluación), recordatorios con prioridad y cuaderno de notas de estudio con soporte de fórmulas LaTeX en vivo.
> 7. **Reducción de llamadas al navegador**: Priorizar auditoría estricta de código y lógica espacial antes que el uso de bots visuales de navegación web.
> 8. **Sin imágenes de IA ni placeholders**: Eliminar imágenes externas o placeholders de stock que generan ruido visual y confusión.
> 9. **Bitácora persistente**: Mantener un archivo de registro con todos los cambios y prompts.

---

## 2. Decisiones de Arquitectura y Soluciones Implementadas

### A. Parser Híbrido de LaTeX (`src/utils/latexRenderer.ts`)
* **Problema diagnosticado**: La función anterior tomaba cualquier texto de pregunta (ej. `"Identifica la opción que mantiene la misma relación..."`) y lo enviaba directamente a `katex.renderToString()`. KaTeX interpreta los espacios como inexistentes en modo matemático estándar e itálica cada carácter (`Identificalaopciónquemantiene...`).
* **Solución**:
  - Implementación de un analizador que detecta si el contenido contiene delimitadores matemáticos explícitos (`$...$` en línea o `$$...$$` en bloque).
  - Los segmentos de texto natural en español conservan intactos sus espacios, acentos y tipografía estándar.
  - Únicamente los segmentos matemáticos se compilan mediante KaTeX.
  - Sanitización contra inyección de código y degradación controlada a texto plano en caso de fórmulas mal formadas.

### B. Banco de Preguntas Realista (`src/lib/questionBank.ts`)
* **Problema diagnosticado**: Preguntas de demostración simplistas o genéricas.
* **Solución**:
  - Creación de preguntas reales de nivel universitario:
    1. Cálculo I: Derivada de $f(x) = x^3 \cdot \sin(x) + e^{2x}$.
    2. Álgebra Lineal: Producto vectorial $\vec{u} \times \vec{v}$ con vectores tridimensionales.
    3. Cálculo Integral: Integral definida $\int_{0}^{2} (3x^2 - 4x + 1)\,dx$.
    4. Física Universitaria: Bloque en plano inclinado con fricción dinámica y conservación de la energía mecánica.
  - Preguntas reales de nivel bachillerato diversificado:
    1. Dinámica Newtoniana: Fuerza resultante sobre masa acelerada ($F = m \cdot a$).
    2. Cinemática: Desplazamiento en Movimiento Rectilíneo Uniformemente Variado ($x = v_0 t + \frac{1}{2} a t^2$).
    3. Química: Configuración electrónica y formación de enlace iónico ($NaCl$).
    4. Química Analítica: Estequiometría de combustión del propano ($C_3H_8$).
    5. Biología Celular: Estructura de la bicapa lipídica y fosfolípidos anfipáticos.
    6. Genética Mendeliana: Cruce monohíbrido heterocigoto ($Aa \times Aa$) y proporciones genotípicas.
    7. Castellano / Razonamiento Verbal: Analogías semánticas precisas (`CINCEL : ESCULTOR :: PINCEL : PINTOR`).
    8. Morfosintaxis: Clasificación de proposiciones subordinadas sustantivas y acentuación diacrítica.

### C. Limpieza Radical de "AI Slop" y Falsos Elementos
* **Remoción de Días de Racha**: Eliminadas todas las menciones a rachas ficticias ("11 días de racha", "14 días de racha") en tarjetas de usuario, cabeceras y widgets.
* **Remoción de Explicaciones Condescendientes**: Textos redundantes como `"Módulo desacoplado para cálculos matemáticos..."` o `"Calculadora científica de alta precisión, banco de constantes físicas universales y preferencias del entorno de estudio"` fueron reemplazados por encabezados directos, elegantes y profesionales estilo Linear / Notion.
* **Desacople de Constantes Físicas**: Se retiró el panel forzado de constantes CODATA de los ajustes para mantener esa vista orientada exclusivamente a herramientas de cálculo y configuración de entorno.
* **Eliminación de Imágenes de Stock**: Se purgaron las imágenes de Unsplash y los placeholders en el tablero de entregas y en las tarjetas de proyectos para eliminar ruido visual.

### D. Sistema Real de Agenda, Evaluaciones, Recordatorios y Notas (`AcademicPlannerView.tsx`)
* **Esquema de Datos (`academicPlanner.types.ts`)**:
  - `EvaluationEvent`: Fecha, hora, materia, tipo (`PARCIAL`, `QUIZ`, `TALLER`, `ENTREGA`, `PROYECTO`), ponderación porcentual (ej. 25%), aula/ubicación y calificación obtenida (0 a 20).
  - `SubjectEvaluationPlan`: Agrupación por asignatura con cálculo automático de porcentaje total configurado y nota acumulada sobre 20.
  - `StudyReminder`: Tareas con fecha límite, prioridad (`ALTA`, `MEDIA`, `BAJA`) y estado de completado.
  - `StudyNote`: Apuntes temáticos con editor y previsualización en vivo de fórmulas matemáticas KaTeX (`$...$`).
* **Servicio Persistente (`plannerService.ts`)**:
  - Almacenamiento local mediante `localStorage` con precarga de planes de evaluación académicos reales para Matemática, Física, Química, Biología y Castellano.
  - Métodos CRUD completos sin alucinaciones ni mocks incompletos.

### E. Tipografía Profesional
* Se configuraron `sans` y `display` en `tailwind.config.js` apuntando a `['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif']`.
* Se eliminaron fuentes circenses o decorativas no institucionales, garantizando legibilidad editorial de nivel profesional.

---

## 3. Resumen de Archivos Modificados y Creados

| Archivo | Acción | Descripción |
|---|---|---|
| `src/utils/latexRenderer.ts` | Reescribir | Solución al bug de texto squished. Parser inteligente de delimitadores `$...$` vs texto en español. |
| `src/lib/questionBank.ts` | Actualizar | Banco integral de preguntas reales universitarias y de bachillerato en 5 materias clave. |
| `src/types/exam.types.ts` | Actualizar | Nuevos modos académicos `UNIVERSITY_EXAM`, `HIGH_SCHOOL_EXAM`, `DIAGNOSTIC_EXAM`. |
| `src/hooks/useExamSimulator.ts` | Actualizar | Filtros de preguntas por modalidad académica y cálculo de estadísticas. |
| `src/components/exams/SimulatorEngine.tsx` | Actualizar | Eliminación de "Simadi", interfaces limpias, selección de modalidades reales de carrera y bachillerato. |
| `src/components/exams/ExamRunner.tsx` | Actualizar | Interfaz de examen cronometrado con renderizado tipográfico corregido y selección en azul cobalto. |
| `src/components/exams/ExamSimulatorsView.tsx` | Actualizar | Limpieza de títulos y eliminación de branding informal. |
| `src/components/tools/ToolsAndSettingsView.tsx` | Actualizar | Eliminación de AI slop y del bloque redundante de constantes físicas. |
| `src/components/dashboards/CreativeDeliveryBoard.tsx` | Actualizar | Retiro de imágenes de stock externas de Unsplash y simplificación de tarjetas tipo Notion. |
| `src/components/layout/Sidebar.tsx` | Actualizar | Integración de pestaña `PLANNER` (Agenda & Evaluaciones), remoción de días de racha y etiquetas Simadi. |
| `src/components/layout/Header.tsx` | Actualizar | Remoción de días de racha. |
| `src/components/workspace/ModularWorkspaceDashboard.tsx` | Actualizar | Eliminación de contadores ficticios y estandarización tipográfica `font-sans`. |
| `src/components/workspace/widgets/QuickExamWidget.tsx` | Actualizar | Lanzador de exámenes universitarios y bachillerato sin AI slop. |
| `src/components/workspace/widgets/TasksWidget.tsx` | Actualizar | Limpieza de textos de rachas y estandarización visual. |
| `src/types/academicPlanner.types.ts` | Crear | Modelos de datos para eventos, planes de evaluación con ponderaciones, recordatorios y notas. |
| `src/services/plannerService.ts` | Crear | Servicio de persistencia local con planes de estudio reales precargados. |
| `src/components/planner/AcademicPlannerView.tsx` | Crear | Módulo completo de 4 pestañas: Calendario, Planes de Evaluación, Recordatorios y Cuaderno KaTeX. |
| `src/App.tsx` | Actualizar | Enrutamiento de la nueva pestaña `PLANNER` en el switch de la aplicación. |
| `tailwind.config.js` | Actualizar | Estandarización de `Inter` y fuentes de sistema de alta precisión. |
| `PROMPTS_AND_CHANGELOG.md` | Crear | Bitácora continua de requerimientos y cambios del proyecto. |
