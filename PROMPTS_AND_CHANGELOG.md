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

---

### Prompt 7: Anti-Slop Profundo, Erradicación de Placeholders, Perfil Individual & Exportación de Guías Simadi
> **Contenido**:
> 1. Erradicar placeholders de materias y ejercicios ficticios; eliminar todas las imágenes puestas sin justificación (Unsplash, avatares de extraños).
> 2. Resolver el problema de que el sistema de perfiles parece como si 4 personas compartieran la misma PC.
> 3. Exportar todas las guías reales que existían en Simulación Simadi y su sistema de selección de temas.
> 4. Eliminar definitivamente los textos que sobreexplican funciones o secciones.
> 5. Instalar y aplicar las skills del video de @migue.baena: `emilkowalski/skills`, `pbakaus/impeccable`, `Leonxlnx/taste-skill`, y la skill `premium-frontend-designer`, configurando los servidores MCP de Figma y Playwright en `mcp_config.json`.
> 6. Reemplazar la tipografía genérica `Inter` por tipografías con carácter e intención de diseño (`Plus Jakarta Sans` y `Space Grotesk`).

#### Decisiones e Implementaciones del Prompt 7:
1. **Instalación de Skills Anti-Slop**:
   - Creado `.agents/skills/premium-frontend-designer/SKILL.md` con reglas de dirección visual, principios de movimiento de Emil Kowalski (< 300ms, ease-out, transform/opacity), protocolo Figma MCP y ciclo de auto-verificación Playwright MCP.
   - Clonadas las skills oficiales en `.agents/skills/emilkowalski`, `.agents/skills/impeccable` y `.agents/skills/taste-skill`.
   - Añadidos los servidores `playwright` y `figma` al archivo global `mcp_config.json`.
2. **Reemplazo Tipográfico Anti-Slop**:
   - `index.html` y `tailwind.config.js` actualizados con `Plus Jakarta Sans` (geométrica limpia para UI) y `Space Grotesk` (grotesca moderna para títulos y encabezados), además de `Newsreader` (editorial) y `JetBrains Mono` (código y fórmulas). Erradicado `Inter` como fuente por defecto.
3. **Erradicación Total de Imágenes Externas y Monograma Tipográfico**:
   - Eliminadas todas las imágenes de Unsplash en `mockData.ts`, `storageService.ts`, `CreativeDeliveryBoard.tsx` y tarjetas de perfil.
   - Implementado monograma tipográfico con iniciales vectoriales limpias en `Sidebar.tsx` en lugar de fotos de extraños.
4. **Sistema de Perfil Individual (Fin del Kiosk Compartido)**:
   - Removido `ProfileQuickSwitcher` de la barra superior `Header.tsx` y de la barra lateral `Sidebar.tsx`. La aplicación ahora pertenece a un único estudiante autenticado.
5. **Exportación Total del Motor de Guías y 1.111 Preguntas Simadi**:
   - Exportados `simadi_guides.json` (11 guías oficiales con teoría HTML, estrategias y exámenes pasados) y `simadi_preguntas.json` (1.111 preguntas oficiales con opciones, respuesta correcta y justificación pedagógica).
   - Creado `src/services/simadiBankService.ts` con funciones de filtrado, indexación y conversión estricta al tipado de evaluaciones.
   - Reescrito `AcademicGuidesView.tsx` integrando las 11 guías completas en 3 pestañas y un **Selector de Temas** interactivo agrupado por áreas (`Razonamiento Lógico Numérico`, `Razonamiento Verbal`, `Ciencia y Tecnología`, `Cultura General`) con selección de cantidad de preguntas y lanzamiento inmediato de cuestionarios.
6. **Limpieza de Placeholders en Agenda**:
   - En `plannerService.ts` se removieron los exámenes y recordatorios simulados, dejando listas limpias y listas para ingerir el cronograma y plan de evaluación real del estudiante.

---

### Prompt 8: Separación Estricta de Cuentas y Cumplimiento Integral de Reglas de Diseño Anti-Slop
> **Contenido**:
> 1. **Separación estricta de cuentas**: Erradicar definitivamente la apariencia y comportamiento de computadora compartida / cibercafé. Cada estudiante (Santiago, Andrés, Valeria, María Fernanda o cuentas registradas) debe tener su propio espacio de datos 100% aislado (agenda de evaluaciones, recordatorios, cuaderno de notas, tareas, módulos activos del workspace, presets y entregas de proyectos), sin compartir almacenamiento ni cruzar información.
> 2. **Cumplimiento riguroso de reglas de diseño de las skills nuevas (`premium-frontend-designer`, `emilkowalski`, `impeccable`, `rulesofdesign.md`)**:
>    - **Cero "cards inside cards"**: Erradicación total de tarjetas anidadas dentro de tarjetas principales. Uso de listas divididas (`divide-y divide-slate-100`), espaciado intencional y estados `:hover` limpios.
>    - **Micro-interacciones y Animaciones Emil Kowalski**: Tiempos estrictamente `< 300ms` (150ms-180ms), curvas `cubic-bezier(0.16, 1, 0.3, 1)` y `ease-out`, animar exclusivamente `transform` y `opacity`, y soporte de `:active:scale-[0.98]` en botones.
>    - **Paleta y Materialidad**: Prohibición de gradientes genéricos púrpura/azul de SaaS. Fondo claro arquitectónico (`#f8fafc`), superficies nítidas (`#ffffff`), tipografía grafito profunda (`#0f172a`), y color de acción asimétrico en Azul Cobalto Institucional (`#0F52BA`).
>    - **Puerta de Autenticación y Gestión de Cuentas**: Creación de `StudentAuthPortal` (pantalla editorial cuando no hay sesión activa) y `AccountManagerModal` (panel modal para cambiar de cuenta o cerrar sesión sin saturar la interfaz de navegación).

#### Decisiones e Implementaciones del Prompt 8:
1. **Aislamiento Total de Almacenamiento por Usuario (`userId`)**:
   - `src/services/taskService.ts`: Creado para aislar tareas bajo `cpe_${userId}_tasks_v2`. Si no existen datos previos, se inicializan tareas académicas auténticas y diferenciadas por nivel (laboratorio de física para Santiago, operaciones combinadas para Andrés, simulacros de admisión para Valeria, láminas de ergonomía para Mafe).
   - `src/hooks/useWorkspaceModules.ts`: Refactorizado para vincular reactivamente los módulos activos y el preset seleccionado al `userId` activo (`cpe_${userId}_workspace_modules_v4` y `cpe_${userId}_active_preset_v4`). Al alternar de cuenta, el workspace se recompone de inmediato según el estudiante activo.
   - `src/services/plannerService.ts`: Evaluaciones, recordatorios y notas guardados bajo particiones individuales (`cpe_${userId}_events_v2`, `cpe_${userId}_reminders_v2`, `cpe_${userId}_notes_v2`) con semillas académicas contextuales por perfil.
   - `src/components/dashboards/CreativeDeliveryBoard.tsx`: Aislado por `cpe_${userId}_creative_deliveries`, restringiendo los datos iniciales de diseño exclusivamente a la cuenta de Mafe.
2. **Arquitectura de Sesión & Puerta de Acceso (`StudentAuthPortal.tsx`)**:
   - Si no hay usuario activo (`user === null`), la aplicación muestra el portal de acceso limpio `StudentAuthPortal`, con presentación editorial de las cuentas disponibles, iniciales tipográficas y acceso directo a su estación privada de estudio.
   - `signOut()` en `AuthContext.tsx` ahora desautentica de verdad (`currentUser = null`), limpiando `cpe_active_profile_id` y regresando al portal de bienvenida en lugar de reiniciar a Santiago forzosamente.
3. **Gestión Discreta de Cuentas (`AccountManagerModal.tsx`)**:
   - Tanto la tarjeta de estudiante en el `Sidebar.tsx` como el indicador en el `Header.tsx` son botones interactivos que despliegan un modal limpio donde se visualiza la sesión activa, se permite cambiar a cualquier otro estudiante con 1 clic o cerrar sesión.
4. **Erradicación de "Cards Inside Cards" (Diseño Anti-Slop)**:
   - `QuickExamWidget.tsx`: Reemplazadas las 3 tarjetas redondeadas anidadas por filas divididas estilizadas (`divide-y divide-slate-100`) con microinteracciones y sin gradientes SaaS morados.
   - `TasksWidget.tsx`: Convertida la lista de tarjetas pesadas anidadas a un checklist limpio con separadores sutiles, microanimación de checkbox (`active:scale-95`) y confirmación con confeti discreto.
5. **Ajuste de Micro-interacciones Emil Kowalski en `src/index.css`**:
   - Agregadas las variables `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` y `--ease-spring: cubic-bezier(0.23, 1, 0.32, 1)`.
   - Transiciones de botones y tarjetas ajustadas a 150ms con aceleración por GPU y `active:scale-[0.98]`.
   - Animación de entrada `fadeIn` reducida de 250ms a 180ms con curva cúbica responsiva.

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `src/services/taskService.ts` | Crear | Servicio de tareas aislado por `userId` con semillas contextuales por estudiante. |
| `src/components/auth/StudentAuthPortal.tsx` | Crear | Pantalla de bienvenida y selección de cuenta para cuando no hay sesión activa. |
| `src/components/auth/AccountManagerModal.tsx` | Crear | Modal limpio para consultar sesión activa, cambiar de estudiante o cerrar sesión. |
| `src/hooks/useWorkspaceModules.ts` | Refactorizar | Módulos y presets reactivos al cambio de `userId` con persistencia en namespace individual. |
| `src/services/plannerService.ts` | Actualizar | Inicializadores contextuales por cuenta (calendario, recordatorios, notas LaTeX) con aislamiento estricto. |
| `src/components/workspace/widgets/TasksWidget.tsx` | Refactorizar | Eliminación de tarjetas anidadas, conexión a `taskService` y checklist de alta legibilidad. |
| `src/components/workspace/widgets/QuickExamWidget.tsx` | Refactorizar | Lista dividida sin cards-inside-cards y eliminación de badges morados SaaS. |
| `src/components/workspace/widgets/GeminiAiWidget.tsx` | Actualizar | Consulta dinámica basada en el `academic_profile` del estudiante autenticado. |
| `src/components/dashboards/CreativeDeliveryBoard.tsx` | Actualizar | Aislamiento estricto de entregas y moodboards por `userId`. |
| `src/context/AuthContext.tsx` | Refactorizar | Soporte para logout auténtico (`user: null`), selección de cuentas y almacenamiento seguro. |
| `src/App.tsx` | Refactorizar | Enrutamiento condicional con `StudentAuthPortal` cuando no hay sesión activa. |
| `src/components/layout/Sidebar.tsx` | Actualizar | Tarjeta de estudiante interactiva que abre `AccountManagerModal`. |
| `src/components/layout/Header.tsx` | Actualizar | Indicador interactivo de estudiante activo y botón explícito de "Cerrar Sesión". |
| `src/components/layout/MainLayout.tsx` | Actualizar | Montaje de `AccountManagerModal` compartido. |
| `src/index.css` | Actualizar | Tokens de easing de Emil Kowalski y transiciones snappies < 200ms. |

---

### Prompt 9: Mejora Visual del Tamaño de Iconos & Conexión al Proyecto Supabase (MCP y Agent Skills)
> **Contenido**:
> 1. Mejorar el tamaño y presencia visual de los iconos en toda la interfaz (navegación lateral, barra móvil, encabezados de widgets y botones de acción).
> 2. Conectar la plataforma y Antigravity al proyecto Supabase `xydqycfqiffnrfqlwxav` mediante la configuración de servidor MCP con OAuth y características (`docs,account,database,debugging,development,functions,branching`) en `mcp_config.json`.
> 3. Instalar las skills oficiales de Supabase (`supabase/agent-skills`) para optimización y desarrollo en Postgres.

#### Decisiones e Implementaciones del Prompt 9:
1. **Mejora Óptica y Jerarquía del Tamaño de Iconos**:
   - `Sidebar.tsx`: Iconos de navegación principal incrementados de `w-4 h-4` (16px) a `w-5 h-5` (20px), mejorando drásticamente el equilibrio con el texto y la legibilidad en pantallas de alta densidad.
   - `MobileNavigation.tsx`: Iconos de barra inferior móvil escalados a `w-5 h-5` (20px) para ergonomía táctil óptima.
   - `TasksWidget.tsx`: Incorporado contenedor de icono principal `w-9 h-9` con `CheckCircleIcon w-5 h-5` en la cabecera; checkbox escalado de 16px a 20px (`w-5 h-5`) con icono interior de 14px; botones de acción aumentados a `w-4 h-4`.
   - `QuickExamWidget.tsx`: Cabecera modernizada con `LayersIcon w-5 h-5` en contenedor `w-9 h-9`; iconos de lanzamiento `PlayIcon` escalados a `w-3.5 h-3.5`.
   - `PomodoroWidget.tsx`: Icono de temporizador en cabecera ampliado a `w-5 h-5` en contenedor de 36px; controles de reproducción (`PlayIcon`, `PauseIcon`, `RotateCcwIcon`) aumentados a `w-4 h-4`.
   - `GeminiAiWidget.tsx`: Icono de `SparklesIcon` en cabecera ampliado a `w-5 h-5`; iconos de carga y consulta ampliados a `w-4 h-4`.
   - `ModularWorkspaceDashboard.tsx`: Icono de personalización (`SlidersIcon`) ampliado a `w-4.5 h-4.5`.
   - `Header.tsx` & `StudentAuthPortal.tsx`: Icono de conexión y acceso Supabase (`SparklesIcon`) escalado a `w-4 h-4`.
2. **Configuración del Servidor MCP Supabase**:
   - Actualizados `C:\Users\user\.gemini\antigravity-ide\mcp_config.json` y `C:\Users\user\.gemini\antigravity\mcp_config.json` con el servidor `supabase`:
     ```json
     "supabase": {
       "serverUrl": "https://mcp.supabase.com/mcp?project_ref=xydqycfqiffnrfqlwxav&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching"
     }
     ```
   - Configurado `.env` con la URL oficial del proyecto: `VITE_SUPABASE_URL=https://xydqycfqiffnrfqlwxav.supabase.co`.
3. **Instalación de Agent Skills de Supabase**:
   - Ejecutado `npx skills add supabase/agent-skills`, instalando exitosamente:
     - `.agents/skills/supabase` (guías de cliente, auth, storage, edge functions y schemas).
     - `.agents/skills/supabase-postgres-best-practices` (mejores prácticas de modelado relacional, RLS y optimización de índices).

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `~/.gemini/antigravity-ide/mcp_config.json` | Actualizar | Registro del servidor remoto MCP de Supabase con `project_ref=xydqycfqiffnrfqlwxav`. |
| `~/.gemini/antigravity/mcp_config.json` | Actualizar | Sincronización del archivo de configuración global de MCP. |
| `.agents/skills/supabase/` | Instalar | Skill oficial de Supabase con documentación y patrones de arquitectura. |
| `.agents/skills/supabase-postgres-best-practices/` | Instalar | Skill de mejores prácticas relacionales para PostgreSQL y RLS. |
| `.env` | Actualizar | Enlace a `https://xydqycfqiffnrfqlwxav.supabase.co`. |
| `src/components/layout/Sidebar.tsx` | Actualizar | Iconos de navegación escalados de `w-4 h-4` a `w-5 h-5`. |
| `src/components/layout/MobileNavigation.tsx` | Actualizar | Iconos móviles escalados de `w-4 h-4` a `w-5 h-5`. |
| `src/components/workspace/widgets/TasksWidget.tsx` | Actualizar | Icono de cabecera a `w-5 h-5`, checkbox a `w-5 h-5` e iconos de acción a `w-4 h-4`. |
| `src/components/workspace/widgets/QuickExamWidget.tsx` | Actualizar | Icono de cabecera a `w-5 h-5` y PlayIcon a `w-3.5 h-3.5`. |
| `src/components/workspace/widgets/PomodoroWidget.tsx` | Actualizar | Icono de temporizador a `w-5 h-5` y controles a `w-4 h-4`. |
| `src/components/workspace/widgets/GeminiAiWidget.tsx` | Actualizar | Icono de IA a `w-5 h-5` y botones a `w-4 h-4`. |
| `src/components/workspace/ModularWorkspaceDashboard.tsx` | Actualizar | Icono de Sliders a `w-4.5 h-4.5`. |
| `src/components/layout/Header.tsx` | Actualizar | Icono de conexión a `w-4 h-4`. |
| `src/components/auth/StudentAuthPortal.tsx` | Actualizar | Icono de acceso Supabase a `w-4 h-4`. |

---

### Prompt 10: Motor de Deconstrucción Académica (Gemini API + Guías Hiper-Complejas en 7 Pilares)
> **Contenido**:
> 1. **System Instruction Maestro**: Inyección obligatoria de la instrucción del catedrático investigador y pedagogo de élite para desarmar cualquier tema académico, apunte, PDF o foto de pizarra en 7 pilares estructurados (Introducción al Fenómeno, Glosario y Unidades SI, Fórmulas y Reglas Mnemotécnicas, Resolución Deductiva Paso a Paso, Alertas de Trampas y Errores Comunes, Ecosistema de Técnicas de Estudio aplicadas [Active Recall, Método Cornell, Mapa Jerárquico], y Batería de Autoevaluación Certificada con formato estricto `**Concepto Fundamental:** ... \n\n**Resolución:** ...`).
> 2. **Salida JSON Estricta (`responseSchema`)**: Configuración de `responseMimeType: "application/json"` en la llamada a Gemini para garantizar un payload predecible.
> 3. **Persistencia Automática**: Guardado estructurado en Supabase / caché local aislado por usuario (`cpe_${userId}_deconstructed_guides`) e inyección automática en el banco de evaluación (`cpe_${userId}_custom_questions`).
> 4. **Interfaz Editorial en Tonos Claros**: Fondos `bg-white` sobre `bg-slate-50`, tipografía nítida con espaciado `leading-relaxed`, acentos en azul cobalto (`#0F52BA`), cajas de fórmulas con bordes finos, callouts ámbar para errores, flashcards interactivas de Active Recall con volteo 3D / clic, cuadrícula de 3 bloques del Método Cornell, y botón destacado *"Simular Examen de este Tema"* para abrir directamente el `SimulatorEngine`.

#### Decisiones e Implementaciones del Prompt 10:
1. **Modelado de Tipos Riguroso (`src/types/deconstruction.types.ts`)**:
   - Definidos `GuideMetadata`, `GlossaryItem`, `CoreFormula`, `FormulasAndStrategies`, `StepByStepExample`, `CommonErrorAlert`, `ActiveRecallFlashcard`, `CornellSynthesis`, `StudyTechniquesHub`, `DeconstructedQuestion`, y `DeconstructedAcademicGuide`.
   - Creado helper `convertDeconstructedToQuestions` con normalización automática a `AcademicSubject` ('Matemática', 'Física', 'Química', 'Biología', 'Castellano') para compatibilidad nativa e inmediata con `SimulatorEngine`.
2. **Servicio Oficial de Gemini (`src/services/geminiService.ts`)**:
   - Inyectado el System Instruction maestro exacto: `ACADEMIC_DECONSTRUCTION_SYSTEM_INSTRUCTION`.
   - Configurada llamada a Gemini 2.5 Flash con `responseMimeType: 'application/json'` y payload multimodal (texto o imagen Base64).
   - Diseñado el generador pedagógico de contingencia (`generateAdaptiveDeconstruction`) para proveer deconstrucciones de alta densidad técnica (Física, Cálculo, Biología, Química) si no hay API key o si se opera offline.
   - Implementada la persistencia bidireccional en Supabase (`academic_guides`, `user_documents`) y en caché local (`cpe_${userId}_deconstructed_guides` y `cpe_${userId}_custom_questions`).
3. **Componente Visual de Guía Hiper-Compleja (`src/components/academic/DeconstructedGuideView.tsx`)**:
   - Estética editorial limpia en tonos claros con tipografía `leading-relaxed`.
   - Navegación clara por los 7 pilares pedagógicos.
   - Renderizado matemático activo KaTeX en teoría, glosario, fórmulas, ejemplos y autoevaluación.
   - Flashcards interactivas de Active Recall con contador, navegación y volteo fluido con botón o clic en tarjeta.
   - Matriz del Método Cornell con cuadrícula clásica de tres bloques (Cues en columna izquierda, Notas densas en columna derecha, y Resumen al pie).
   - Callouts visuales con fondo ámbar/rojo tenue para trampas frecuentes de parciales y distractores de examen.
   - Botón cobalto principal *"Simular Examen de este Tema"* (`#0F52BA`), abriendo de inmediato el `SimulatorEngine` con temporizador y preguntas cargadas.
4. **Integración Transversal en la Plataforma**:
   - `GeminiAiWidget.tsx`: Actualizado para deconstruir cualquier tema introducido por el usuario y abrir la guía completa o lanzar el simulador directamente desde el Workspace.
   - `AcademicGuidesView.tsx`: Añadida la pestaña `"Deconstruidas IA"` para consultar, abrir y simular cualquier guía generada previamente por el estudiante.
   - `DocumentGallery.tsx`: Conectado para deconstruir archivos y fotos de pizarra de Supabase Storage en Guías Hiper-Complejas de 7 pilares.
5. **Auditoría de Compilación & Verificación**:
   - `npm run build` verificado exitosamente (0 errores de TypeScript y bundle de producción generado).
   - Verificación visual interactiva ejecutada en vivo con `browser_subagent`.

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `src/types/deconstruction.types.ts` | Crear | Definición completa de tipos de deconstrucción en 7 pilares y conversor a `Question`. |
| `src/types/index.ts` | Actualizar | Reexportación centralizada de tipos de deconstrucción académica. |
| `src/services/geminiService.ts` | Actualizar | Integración de System Instruction Maestro, llamada JSON a Gemini, persistencia y fallback adaptativo. |
| `src/components/academic/DeconstructedGuideView.tsx` | Crear | Componente de lectura editorial con KaTeX, flashcards volteables, matriz Cornell y botón cobalto de simulación. |
| `src/components/workspace/widgets/GeminiAiWidget.tsx` | Actualizar | Integración del motor de deconstrucción con modal de guía y botón de simulación directa. |
| `src/components/academic/AcademicGuidesView.tsx` | Actualizar | Pestaña "Deconstruidas IA" para listar y abrir guías deconstruidas guardadas en la cuenta. |
| `src/components/storage/DocumentGallery.tsx` | Actualizar | Ejecución de deconstrucción académica al analizar apuntes y fotos de pizarra de Storage. |
| `PROMPTS_AND_CHANGELOG.md` | Actualizar | Registro cronológico del Prompt 10 y documentación técnica completa. |

---

### Prompt 11: Motor Dual Híbrido (Auto API + Spark MCP), Calibración Cognitiva Anti-Alucinación y Arquitectura de las 200 Funciones
> **Contenido**:
> 1. **El Motor Dual Híbrido ("Spark MCP + Auto API Worker")**:
>    - **Carril A: Modo Instantáneo Autónomo (`mode: 'auto_api'`) — 0 Clics**: Respuesta en 3 a 8 segundos para desgloses Notion AI del Kanban y ejercicios cortos mediante endpoint `/api/nexus-worker` usando `@google/genai`.
>    - **Carril B: Modo Profundo Manual-Asistido (`mode: 'spark_mcp'`)**: Encolado en `ai_processing_queue` para procesamiento exhaustivo con modelo 3.8 Flash / Pro desde sesión de Gemini Spark vía MCP (`/api/mcp`).
>    - **Carril C: Rescate Automático (Fallback)**: Cron Job en `vercel.json` que revisa cada 15 minutos documentos encolados hace más de 30 minutos y los procesa automáticamente con la API.
> 2. **Solución Radical al Sobre-Análisis ("El Síndrome del Físico Cuántico")**:
>    - Nivelación cognitiva por perfil (`academicLevel`) y regla de hierro de **Anclaje de Alcance Estricto**:
>      - `BASICO_ESCOLAR` (1er-3er año - Andrés): Explicación paso a paso de aritmética y álgebra elemental (sustitución, igualación, reducción). Terminantemente prohibido extrapolar a física, cálculo universitario o matrices de Gauss-Jordan.
>      - `BACHILLERATO_AVANZADO` (4to-5to año / Admisión - Prima): Agilidad de cálculo, trucos de examen de admisión y rigor pre-universitario.
>      - `UNIVERSITARIO_EXACTAS` (Física / Computación - Santiago): Rigor demostrativo formal completo, cálculo diferencial/integral y notación LaTeX avanzada.
>      - `UNIVERSITARIO_DISENO` (Diseño / Humanidades - Mafe): Cero invención de fórmulas numéricas; adaptación a Principios Rectores y Reglas de Composición visual (Ley de tercios, Gestalt, jerarquía, color).
>      - Directriz Global Anti-Alucinación: Prohibido cambiar de asignatura. Si el material es álgebra elemental, nunca inventar problemas de cinemática o poleas.
> 3. **Implementación de Componentes Clave**:
>    - `lib/pedagogicalPrompts.ts` & `src/lib/pedagogicalPrompts.ts`: Guardarraíles pedagógicos dinámicos, generador de prompts adaptativos y limpiador regex tolerante a LaTeX en JSON (`cleanAndParseJsonWithLatex`).
>    - `/api/nexus-worker.ts`: Serverless Function de Vercel con `@google/genai` (Gemini 2.5 Flash), guardado atómico en Supabase y soporte para Carril C de rescate.
>    - `/api/mcp.ts`: Enriquecimiento de `get_pending_study_uploads` con `academic_level` y `strict_instruction` para obligar a Gemini Spark a ceñirse al nivel asignado. Herramienta `analyze_and_breakdown_task` activa.
>    - UI Apple-style en `UploadStation.jsx` y `UploadStation.tsx`: Selectores visuales para Carril Instantáneo vs Profundo y nivel de material dinámico según la cuenta del estudiante.
>    - `TaskDetailModal.tsx` & `.jsx`: Disparo inmediato al worker autónomo para desglose Notion AI en 2 a 4 segundos.
>    - `supabase/schema.sql`: Definición de `ai_processing_queue` con campos `processing_mode`, `routing_mode`, `academic_level`, índices y políticas RLS activas en tiempo real.
>    - `vercel.json`: Cron Job programado para rescate de Carril C cada 15 minutos.
> 4. **Roadmap de las 200 Funciones**: Estructuración modular en 10 bloques de 20 funciones para escalabilidad futura continua.

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `lib/pedagogicalPrompts.ts` | Crear | Módulo maestro de guardarraíles cognitivos, directrices anti-alucinación y limpiador regex de LaTeX para JSON. |
| `src/lib/pedagogicalPrompts.ts` | Crear | Re-exportación oficial para el bundle de frontend en Vite. |
| `api/nexus-worker.ts` | Crear | Serverless Function autónoma con `@google/genai` (Carril A Instantáneo y Carril C Rescate). |
| `api/mcp.ts` | Actualizar | Inyección de `academic_level` y `strict_instruction` en `get_pending_study_uploads` para gobernar a Gemini Spark. |
| `src/components/UploadStation.jsx` | Actualizar | Selector Apple-style de Carril Dual (Instantáneo vs Spark Pro) y selector de nivel de estudio. |
| `src/components/ai/UploadStation.tsx` | Actualizar | Versión TypeScript de UploadStation con soporte completo de tipos para motor dual y guardarraíles. |
| `src/components/kanban/TaskDetailModal.tsx` | Actualizar | Conexión directa a `/api/nexus-worker` para desglose instantáneo de Notion AI en 2-4 segundos. |
| `src/components/kanban/TaskDetailModal.jsx` | Actualizar | Paridad en JavaScript de TaskDetailModal con llamada autónoma al worker. |
| `supabase/schema.sql` | Actualizar | Tabla `ai_processing_queue` con `processing_mode`, `academic_level`, RLS e índices. |
| `vercel.json` | Actualizar | Cron job programado para rescate automático de documentos encolados (>30 min). |
| `package.json` | Actualizar | Instalación de la librería oficial `@google/genai` v2.29.1. |

---

### Prompt 12: Implementación de Funciones Clave del Roadmap y Adaptación de Bases para las Restantes
> **Contenido**:
> 1. **Funciones Clave Implementadas**:
>    - **Función 102 (Solucionador Determinista de Sistemas de Ecuaciones 2x2)**: Solucionador algebraico paso a paso con aritmética de fracciones exactas (simplificación por MCD) y 4 métodos pedagógicos en KaTeX (Reducción, Sustitución, Igualación y Regla de Cramer). Especial para nivel escolar/bachillerato (Andrés).
>    - **Función 88 (Mezclador de Paisajes Sonoros Procedurales)**: Audio espacial y ambiental procedural mediante Web Audio API pura (sin archivos de audio pesados en el bundle). Sintetiza Lluvia suave (Pink noise), Ondas Gamma 40Hz (batimiento binaural para hiperenfoque), Fuego crepitante y Corriente de agua.
>    - **Función 142 (Simulador What-If de Calificaciones "¿Cuánto necesito para pasar?")**: Calculadora reactiva multiescala (1-20, 1-100, 1-5) con ponderaciones por corte, cálculo del puntaje requerido en tiempo real e indicador de viabilidad matemática. Integrada en la pestaña `PLANS` del planificador académico.
>    - **Función 193 (Respaldo y Restauración Total JSON)**: Servicio y modal de exportación/importación completa de la cuenta del estudiante (tareas, guías, calificaciones, recordatorios y estado local) para soberanía y portabilidad de datos.
>    - **Funciones 122 y 123 (Herramientas de Color y Accesibilidad WCAG para Diseño)**: Verificador interactivo de contraste tipográfico WCAG AA/AAA y generador de armonías de color (monocromático, complementario, análogo, tríada) adaptado a María Fernanda (Diseño UCAB).
>    - **Modos de Examen "Muerte Súbita" y "Presión Real"**: Ampliación del motor de simulación de exámenes con terminación instantánea ante error (0 margen de fallo) y cronómetro relámpago a alta velocidad (30s de promedio por reactivo).
> 2. **Adaptación de Bases Arquitectónicas**:
>    - Incorporación de la pestaña modular de Herramientas y Ajustes (`ToolsAndSettingsView.tsx`) para albergar los próximos módulos sin sobrecargar el flujo principal.
>    - Preparación de tipos e interfaces extensibles en `exam.types.ts` y desacoplamiento de servicios en `src/services/`.
>    - Verificación exitosa de compilación TypeScript estricta (`npm run build`) con 0 errores.

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `src/components/tools/LinearEquationSolver.tsx` | Crear | Solucionador determinista de sistemas 2x2 con fracciones exactas y 4 métodos en KaTeX. |
| `src/services/soundscapeService.ts` | Crear | Motor generativo de sonido ambiental y ondas binaurales mediante Web Audio API nativa. |
| `src/components/productivity/FocusSoundscapeMixer.tsx` | Crear | Interfaz con sliders de ganancia independientes para mezclar paisajes sonoros. |
| `src/components/planner/WhatIfGradeCalculator.tsx` | Crear | Simulador reactivo de metas académicas "¿Cuánto necesito para pasar?". |
| `src/components/planner/AcademicPlannerView.tsx` | Actualizar | Integración de sub-pestaña para alternar entre Planes Oficiales y el Simulador What-If. |
| `src/services/backupRestoreService.ts` | Crear | Servicio de snapshot y restauración JSON con sincronización opcional en Supabase. |
| `src/components/tools/BackupRestoreModal.tsx` | Crear | Modal accesible para descargar y cargar respaldos de cuenta JSON. |
| `src/components/dashboards/DesignPaletteTools.tsx` | Crear | Suite de color y contraste accesible WCAG para el perfil de diseño. |
| `src/components/tools/ToolsAndSettingsView.tsx` | Actualizar | Pestañas unificadas para Álgebra, Diseño, Sonidos y Respaldo. |
| `src/types/exam.types.ts` | Actualizar | Inclusión de modos `SUDDEN_DEATH` y `TIME_PRESSURE` en `ExamMode`. |
| `src/hooks/useExamSimulator.ts` | Actualizar | Lógica de auto-terminación inmediata en `selectAnswer` bajo modo Muerte Súbita. |
| `src/components/exams/SimulatorEngine.tsx` | Actualizar | Nuevas tarjetas de examen para Presión Real y Muerte Súbita. |

---

### Prompt 13: Ampliación de la Suite de 200 Funciones (Álgebra Vectorial ℝ²/ℝ³, Telemetría en Vivo y Selector Rápido de Perfiles)
> **Contenido**:
> 1. **Calculadora de Álgebra Vectorial ℝ² / ℝ³ (Función 103)**:
>    - Archivo: `src/components/tools/VectorCalculatorWidget.tsx`
>    - Soporte interactivo y determinista para cálculo vectorial en 2D y 3D.
>    - Computa norma/magnitud euclidiana ($||\vec{u}||$), producto punto ($\vec{u} \cdot \vec{v}$), ángulo geométrico entre vectores en grados, producto cruz en 3D ($\vec{u} \times \vec{v}$) y proyección ortogonal ($\text{proj}_{\vec{v}}(\vec{u})$) con demostraciones KaTeX completas. Especial para Física teórica UCV (Santiago).
> 2. **Monitor de Estado de Red y Servidor MCP en Vivo (Función 181)**:
>    - Archivo: `src/components/layout/LiveSystemStatusWidget.tsx`
>    - Widget interactivo en el `Header.tsx` que mide latencia en milisegundos hacia Supabase, la API de Vercel (Carril A) y el Servidor MCP (Carril B), visualizando el estado de la cola de deconstrucción en tiempo real.
> 3. **Panel de Telemetría y Cuotas del Sistema (Función 186 - Admin Panel)**:
>    - Archivo: `src/components/tools/AdminTelemetryPanel.tsx`
>    - Pestaña dedicada en la suite de herramientas para supervisar peticiones del Carril A vs Carril B, cuota de Gemini Flash (TPM/RPM), uso de almacenamiento en Supabase Storage y registro reciente de la cola `ai_processing_queue`.
> 4. **Cambio Rápido de Perfil en 1 Clic (Función 191)**:
>    - Archivo: `src/components/layout/Sidebar.tsx`
>    - Integración de `ProfileQuickSwitcher.tsx` en el pie de la barra lateral para alternar instantáneamente entre Santiago, Andrés, Sofía y María Fernanda sin desconectar la sesión.

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `src/components/tools/VectorCalculatorWidget.tsx` | Crear | Calculadora analítica de vectores 2D y 3D con producto escalar, cruz, ángulo y proyecciones en KaTeX. |
| `src/components/layout/LiveSystemStatusWidget.tsx` | Crear | Widget de telemetría de red y estado de los 3 servicios (Supabase, API, MCP) en tiempo real. |
| `src/components/tools/AdminTelemetryPanel.tsx` | Crear | Panel de control para cuotas de IA, almacenamiento y estado de la cola. |
| `src/components/layout/Header.tsx` | Actualizar | Reemplazo de píldora estática por el widget interactivo de estado en vivo. |
| `src/components/layout/Sidebar.tsx` | Actualizar | Integración de cambio de estudiante en 1 clic en el pie del menú. |
| `src/components/tools/ToolsAndSettingsView.tsx` | Actualizar | Integración de Álgebra Vectorial y pestaña de Telemetría & Cuotas. |

---

### Prompt 14: Sprint A — Laboratorio Virtual de Ciencias Exactas (Química, Biología y Genética)
> **Contenido**:
> Implementación del **Sprint A** de la suite de 200 funciones (Módulos de Química y Biología):
> 1. **Balanceador Estequiométrico Determinista (Función 111)**:
>    - Archivo: `src/components/tools/StoichiometryBalancer.tsx`
>    - Balance determinista de ecuaciones químicas clásicas (Combustión de metano, Síntesis de agua, Fotosíntesis, Oxidación férrica, Neutralización ácido-base, Proceso Haber-Bosch).
>    - Renderizado con KaTeX de reactivos y productos, verificación de conservación atómica y cálculo interactivo de masas molares, moles y gramos con identificación de reactivo limitante.
> 2. **Tabla Periódica Interactiva de Elementos (Función 112)**:
>    - Archivo: `src/components/tools/InteractivePeriodicTable.tsx`
>    - Matriz de elementos con número atómico ($Z$), masa atómica ($u$), electronegatividad de Pauling, radio atómico en picómetros ($pm$) y configuración electrónica en estado fundamental (notación de gas noble). Búsqueda reactiva en tiempo real por símbolo, nombre o número atómico.
> 3. **Calculadora Cuantitativa de pH, pOH y Molaridad (Función 113)**:
>    - Archivo: `src/components/tools/PhMolarityCalculator.tsx`
>    - Panel con slider interactivo de pH (0 a 14), cálculo de $pOH = 14 - pH$, concentración de $[H_3O^+]$ y $[OH^-]$ en notación científica KaTeX, y categorización ácida/neutra/básica.
>    - Calculadora de preparación de soluciones de laboratorio: masa de soluto ($g$), masa molar ($g/mol$) y volumen ($mL$) para calcular la concentración Molar ($M = n/V$).
> 4. **Simulador de Genética Mendeliana & Cuadros de Punnett (Función 114)**:
>    - Archivo: `src/components/tools/MendelianGeneticsSimulator.tsx`
>    - Cruces monohíbridos ($2 \times 2$, alelos $A/a$) y dihíbridos ($4 \times 4$, alelos $A/a$ y $B/b$).
>    - Cálculo exacto de frecuencias genotípicas y fenotípicas porcentuales y verificación de la 1ª, 2ª y 3ª Ley de Mendel.
> 5. **Acoplamiento en la Suite**:
>    - Archivo: `src/components/tools/ToolsAndSettingsView.tsx`
>    - Pestaña dedicada `Química & Biología` (`SCIENCE_LAB`) con sub-navegación minimalista e instantánea.

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `src/components/tools/StoichiometryBalancer.tsx` | Crear | Balanceador estequiométrico de masa y reactivo limitante con KaTeX. |
| `src/components/tools/InteractivePeriodicTable.tsx` | Crear | Tabla periódica con electronegatividad, radios atómicos y configuraciones cuánticas. |
| `src/components/tools/PhMolarityCalculator.tsx` | Crear | Calculadora de pH, pOH, concentraciones iónicas y molaridad $M = n/V$. |
| `src/components/tools/MendelianGeneticsSimulator.tsx` | Crear | Simulador de cuadros de Punnett monohíbridos y dihíbridos con leyes de Mendel. |
| `src/components/tools/ToolsAndSettingsView.tsx` | Actualizar | Pestaña `Química & Biología` (`SCIENCE_LAB`) con conmutación entre los 4 módulos. |

---

### Prompt 15: Sprint B — Módulos Humanísticos, Castellano y Técnicas de Lectura
> **Contenido**:
> Implementación del **Sprint B** de la suite de 200 funciones (Módulos de Castellano, Comprensión Lectora y Mnemotecnia):
> 1. **Analizador Morfosintáctico de Oraciones (Función 131)**:
>    - Archivo: `src/components/academic/SentenceSyntaxAnalyzer.tsx`
>    - Descomposición jerárquica de oraciones compuestas en español: Sujeto (NS, MD, MI, Aposición) y Predicado (NP, CD, CI, Complementos Circunstanciales de Modo, Tiempo, Lugar y Causa).
>    - Banco de oraciones modelo por niveles, visualizador de sintagmas coloreados, chuleta de descarte pronominal y caja de prueba heurística.
> 2. **Entrenador de Comprensión Lectora & Inferencia (Función 132)**:
>    - Archivo: `src/components/academic/ReadingComprehensionTrainer.tsx`
>    - Textos académicos de admisión (Divulgación científica sobre termodinámica y ensayo filosófico sobre epistemología técnica).
>    - Reactivos de Idea Principal, Vocabulario Contextual, Inferencia e Intención del Autor con desglose y justificación del descarte de distractores.
> 3. **Gestor de Tarjetas Mnemotécnicas de Repetición Espaciada SM-2 (Función 133)**:
>    - Archivo: `src/components/academic/SpacedRepetitionFlashcards.tsx`
>    - Algoritmo matemático SuperMemo-2 (factor de facilidad $EF \ge 1.3$, cálculo de intervalos en días $I = I_{n-1} \cdot EF$).
>    - Interfaz giratoria interactiva con mazo categorizado por materias, consejos mnemotécnicos y seguimiento del calendario de repasos.
> 4. **Cronómetro de Lectura Rápida & Test de Retención (Función 134)**:
>    - Archivo: `src/components/academic/SpeedReadingTimer.tsx`
>    - Cronometraje en vivo, cálculo matemático de Palabras por Minuto (PPM), test inmediato de retención conceptual y cálculo de Velocidad Efectiva ($PPM \times \% \text{Retención}$).
> 5. **Acoplamiento en la Suite**:
>    - Archivo: `src/components/tools/ToolsAndSettingsView.tsx`
>    - Pestaña `Castellano & Lectura` (`HUMANITIES_LAB`) con conmutación reactiva entre los 4 módulos.

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `src/components/academic/SentenceSyntaxAnalyzer.tsx` | Crear | Analizador morfosintáctico de sujeto, predicado, modificadores y complementos. |
| `src/components/academic/ReadingComprehensionTrainer.tsx` | Crear | Entrenador de comprensión inferencial y descarte razonado de distractores. |
| `src/components/academic/SpacedRepetitionFlashcards.tsx` | Crear | Tarjetas flash mnemotécnicas con cálculo determinista de intervalos SM-2. |
| `src/components/academic/SpeedReadingTimer.tsx` | Crear | Cronómetro de lectura con cálculo de PPM y test de retención inmediata. |
| `src/components/tools/ToolsAndSettingsView.tsx` | Actualizar | Pestaña `Castellano & Lectura` (`HUMANITIES_LAB`) con selector de 4 submódulos. |

---

### Prompt 16: Sprint C — Inteligencia de Estudio Predictiva, Exportaciones & Modo Ambiental
> **Contenido**:
> Implementación del **Sprint C** de la suite de 200 funciones (Planificación adaptativa, Exportaciones PDF/Notion y Salud visual):
> 1. **Generador de Horarios de Estudio Adaptativos (Función 151)**:
>    - Archivo: `src/components/planner/AdaptiveStudyScheduleGenerator.tsx`
>    - Reprogramación determinista según tareas atrasadas, fatiga cognitiva diaria (2h a 6h) y franja circadiana óptima (Mañana/Tarde/Noche).
>    - Distribución en bloques de ritmo ultradiano de 90 minutos con desglose Pomodoro semanal.
> 2. **Exportador Editorial de Resúmenes en Formato PDF Imprimible (Función 152)**:
>    - Archivo: `src/components/planner/StudySummaryPdfExporter.tsx`
>    - Plantilla editorial estilo revista académica Apple Minimalist.
>    - Formateo de principios clave, fórmulas KaTeX y notas pedagógicas con soporte de impresión nativa `window.print()` y paginación limpia.
> 3. **Conector y Exportador Modal a Notion Workspace (Función 153)**:
>    - Archivo: `src/components/planner/NotionWorkspaceExporterModal.tsx`
>    - Transformación de resúmenes y guías deconstruidas en bloques oficiales de la API de Notion (Heading, Callouts, Equations, To-Do items).
>    - Configuración de tokens de integración y copia del payload estructurado.
> 4. **Modo Oscuro Ambiental & Night Shift (Función 154)**:
>    - Archivo: `src/components/productivity/AmbientThemeNightShiftPanel.tsx`
>    - Conmutación a Dark Mode Deep Slate (`#0b0f19`) y filtro continuo de luz azul nocturna (Night Shift, 2700K a 6500K) para prevenir fatiga visual en sesiones prolongadas.
> 5. **Acoplamiento en la Suite**:
>    - Archivo: `src/components/tools/ToolsAndSettingsView.tsx`
>    - Pestaña `Horarios & Exportación` (`SMART_PLANNING`) con acceso integrado a los 4 módulos y conexión modal a Notion.

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `src/components/planner/AdaptiveStudyScheduleGenerator.tsx` | Crear | Generador de horarios adaptativos con balanceo de carga y priorización de atrasos. |
| `src/components/planner/StudySummaryPdfExporter.tsx` | Crear | Exportador editorial de resúmenes de estudio a PDF imprimible. |
| `src/components/planner/NotionWorkspaceExporterModal.tsx` | Crear | Modal exportador de guías a bloques oficiales de la Notion API. |
| `src/components/productivity/AmbientThemeNightShiftPanel.tsx` | Crear | Panel de tema oscuro Deep Slate y filtro de temperatura de color Night Shift. |
| `src/components/tools/ToolsAndSettingsView.tsx` | Actualizar | Pestaña `Horarios & Exportación` (`SMART_PLANNING`) con integración modal. |

---

### Prompt 17: Blindaje de Fórmulas KaTeX, Sanitizador Científico y Correcciones UI
> **Contenido**:
> 1. **Diagnóstico & Solución del Error KaTeX en Rojo (`\text{CH_{4}}`)**:
>    - KaTeX prohíbe el uso de subíndices `_` y superíndices `^` dentro de `\text{...}` porque cambia al modo texto plano.
>    - Habilitación oficial de la extensión `mhchem` (`\ce{...}`) e importación de estilos en `src/main.tsx` (`katex/dist/katex.min.css` y `katex/contrib/mhchem`).
>    - Creación del componente `ScientificVisualizer.tsx` con función utilitaria `sanitizeScientificLatex(raw)` para reparar automáticamente cualquier fórmula mal formateada proveniente de LLMs o prompts de usuarios.
> 2. **Refactorización del Balanceador Estequiométrico (`StoichiometryBalancer.tsx`)**:
>    - Sustitución de `\text{...}` por `\mathrm{...}` limpio para todos los reactivos y productos.
>    - Helper `formatChemicalUI` para renderizar subíndices Unicode en títulos de interfaz (`CH₄`, `CO₂`, `H₂O`).
>    - Eliminación de la redundancia textual "Producto Producido", reemplazada por "Rendimiento Teórico".
> 3. **Unificación de Disparadores Flotantes (`MainLayout.tsx`)**:
>    - Eliminación de colisión y superposición entre la Calculadora Científica y el Scratchpad.
>    - Agrupación en un contenedor flex único `fixed bottom-5 right-6 z-40` armonioso y sin tapar elementos del pie.
> 4. **Limpieza Visual de la Barra de Pestañas (`ToolsAndSettingsView.tsx`)**:
>    - Aplicación de `flex-wrap`, espaciado `gap-1` y `[scrollbar-width:none] [&::-webkit-scrollbar]:hidden` eliminando la scrollbar gris nativa que cortaba las pestañas.
> 5. **Directrices de IA Blindadas (`lib/pedagogicalPrompts.ts`)**:
>    - Incorporación de la regla 5 en `GLOBAL_ANTI_HALLUCINATION_DIRECTIVE` con prohibición expresa de `\text{X_{n}}` y obligatoriedad de `\mathrm{...}` y `\ce{...}`.

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `src/main.tsx` | Actualizar | Importación de `katex.min.css` y extensión `mhchem` de KaTeX. |
| `src/components/academic/ScientificVisualizer.tsx` | Crear | Visualizador con auto-sanitizador determinista y soporte inorgánico, orgánico y físico SVG. |
| `src/components/tools/StoichiometryBalancer.tsx` | Actualizar | Ecuaciones con `\mathrm{...}`, subíndices Unicode y etiquetas claras sin redundancia. |
| `src/components/layout/MainLayout.tsx` | Actualizar | Contenedor flex único para disparadores flotantes de Calculadora y Scratchpad. |
| `src/components/tools/ToolsAndSettingsView.tsx` | Actualizar | Barra de pestañas con flex-wrap y ocultamiento de scrollbar nativa. |
| `lib/pedagogicalPrompts.ts` | Actualizar | Reglas estrictas de sintaxis KaTeX/mhchem en directivas globales de Gemini. |







### Prompt 18: Auditoría Forense Integral, Cumplimiento de las 200 Funciones, Aislamiento Multi-Cuenta y Optimización de Producción
> **Contenido**:
> 1. **Reparación Exhaustiva de Renderizado Matemático LaTeX / KaTeX**:
>    - `ExamResultsReport.tsx`: Renderizado formal de `userOpt.text` y `correctOpt.text` mediante `renderLatex` dentro de `dangerouslySetInnerHTML`.
>    - `AcademicGuidesView.tsx`: Compilación KaTeX de teoría, preguntas y resoluciones detalladas con `renderLatexToHtml`.
>    - `UCVIntroCourseHub.tsx`: Corregida pestaña rota `'EXAM_SIMULATOR'` a `'EXAMS'` (evitando redirección errónea); compilación KaTeX en descripciones, ejercicios, trampas y flashcards; reemplazada clave muerta `cpe_events_cache` por inyección directa en `plannerService` y `taskService`.
>    - `UCVInteractiveLabs.tsx`: Envoltorio de casos irracionales en `$ ... $` y corrección de fórmula duplicada `f(x) = f(x) =`.
>    - `VectorAndGraphInteractive.tsx`: Agregada fórmula analítica de derivada para función cúbica (`f(x) = 0.1x^3 - x \implies f'(x) = 0.3x^2 - 1`).
> 2. **Aislamiento Estricto de Estado y Almacenamiento por Usuario (`userId`)**:
>    - `WhatIfGradeCalculator.tsx`: Conectado a `useAuth()`, escenarios guardados bajo `cpe_${userId}_whatif_scenarios_v1`, y presets evaluativos según el perfil activo (Andrés, Santiago, Sofía, Mafe).
>    - `GradeProjectionCalculator.tsx`: Efecto de sincronización de `selectedSubject` al cambiar de plan o estudiante.
>    - `AdaptiveStudyScheduleGenerator.tsx`: Tareas dinámicas y exámenes próximos cargados directamente de `taskService` y `plannerService` aislados por `userId`.
>    - `SpacedRepetitionFlashcards.tsx`: Barajas, repeticiones e intervalos SM-2 aislados bajo `cpe_${userId}_sm2_flashcards_v1`.
>    - `PomodoroWidget.tsx`: Conectado a `useAuth()`, inicializado con `user.preferences.focus_duration`, y contador diario guardado en `cpe_${userId}_pomodoros_today`.
>    - `sessionRecoveryService.ts`: Claves de respaldo de examen activo aisladas por `cpe_${userId}_active_exam_backup_v1`.
>    - `useExamSimulator.ts`: Recuperación de examen por `userId` y preservación de preguntas personalizadas de IA en reintentos.
>    - `backupRestoreService.ts`: Filtrado de snapshot para que las exportaciones JSON contengan exclusivamente datos del usuario autenticado.
>    - `AcademicPlannerView.tsx`: Reseteo de selección y campos de notas al cambiar de cuenta.
> 3. **Modo Oscuro, Navegación, Header y Reglas de Diseño (`rulesofdesign.md`)**:
>    - `index.css`: Reglas de tema `.dark` (Deep Slate `#0b0f19`, tarjetas `#111827`, bordes e inputs contrastados) y clases de ayuda para cajas de fórmulas.
>    - `Header.tsx`: Agregado `UCV_COURSE` a `TAB_BREADCRUMBS` y conectado el botón de sol/luna con `onClick` para alternar la clase `.dark` y persistir en `localStorage`.
>    - `MobileNavigation.tsx`: Filtrado dinámico de pestañas inferiores según los permisos del perfil activo (incluyendo `PLANNER`, `UCV_COURSE`, `CREATIVE_BOARD`).
>    - `MainLayout.tsx` & `CommandPalette.tsx`: Eliminación total de emojis en botones de interfaz reemplazados por SVG limpios de `lucide-react` (`Calculator`, `PenTool`), e indexación en vivo de tareas del estudiante en `Cmd + K`.
> 4. **Conexión de Módulos de Alto Valor & Correcciones Científicas**:
>    - `TasksWidget.tsx`: Conectado `TaskDetailModal` (Notion-AI style breakdown) con botón de destellos en cada ítem y sincronización Supabase Realtime.
>    - `StorageManagerView.tsx`: Conectado `UploadStation` con carril dual y guardarraíles cognitivos en la nueva pestaña `'AI_STATION'`.
>    - `ExamRunner.tsx`: Conectado `useProctoringCamera.ts` con vista previa de cámara supervisora y desmontaje seguro de hardware.
>    - `LinearEquationSolver.tsx`: Corrección del determinante nulo ($\det = 0$) para diferenciar sistemas incompatibles de sistemas con infinitas soluciones mediante el Teorema de Rouché-Frobenius.
>    - `StoichiometryBalancer.tsx`: Desglose cuantitativo de reactivos secundarios requeridos además de los productos teóricos.
>    - `InteractivePeriodicTable.tsx`: Corrección de clasificación química del Aluminio ($Z=13$) a `'post-transicion'` (metal del bloque p / representativo) con estilos visuales dedicados.
>    - `LatexLabWidget.tsx`: Incorporados presets rápidos de fórmulas físicas fundamentales (Hamilton, Maxwell-Ampère, Schrödinger, Relatividad).
> 5. **Depuración de Código Muerto y Optimización de Producción**:
>    - Eliminados 7 dashboards heredados y no utilizados (`AndresDashboard.tsx`, `PrimaDashboard.tsx`, `SantiagoDashboard.tsx`, `MafeDashboard.tsx`, `DashboardRouter.tsx`, `ProductivityDashboard.tsx`, `ExamSimulatorsView.tsx`).
>    - Configurada división de chunks (`manualChunks`) en `vite.config.ts` para aislar `data-simadi` y `academic-labs`.
>    - **Resultado Final**: 0 errores en `oxlint`, 0 errores en `tsc -b && vite build`, y todos los paquetes generados por debajo de los 1000 kB.

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `src/components/tools/InteractivePeriodicTable.tsx` | Actualizar | Clasificación de Aluminio a `post-transicion` y paleta de colores teal correspondiente. |
| `src/components/dashboards/*` | Eliminar | Retiro de 5 dashboards legacy no referenciados (`Andres`, `Prima`, `Santiago`, `Mafe`, `DashboardRouter`). |
| `src/components/productivity/ProductivityDashboard.tsx` | Eliminar | Retiro de dashboard legacy sustituido por el workspace modular. |
| `src/components/exams/ExamSimulatorsView.tsx` | Eliminar | Retiro de vista estática legacy reemplazada por `ExamHub.tsx`. |
| `src/components/workspace/widgets/LatexLabWidget.tsx` | Actualizar | Agregado selector de fórmulas preestablecidas de física teórica. |
| `vite.config.ts` | Actualizar | Configuración de `manualChunks` para `data-simadi` y `academic-labs`. |
| `src/services/sessionRecoveryService.ts` | Corregir | Eliminación de llaves duplicadas huérfanas tras refactorización. |
| `src/components/planner/AdaptiveStudyScheduleGenerator.tsx` | Corregir | Sincronización de referencias de tareas a `dynamicTasks`. |
| `src/components/tools/ScratchpadDrawer.tsx` | Corregir | Conexión de `handleTextChange` al textarea para autoguardado persistente. |
| `src/components/tools/MendelianGeneticsSimulator.tsx` | Optimizar | Extracción de `TRAIT_A` y `TRAIT_B` a constantes de nivel superior para estabilidad de `useMemo`. |
| `src/components/kanban/TaskDetailModal.tsx` | Optimizar | Reordenamiento de `handleRealtimeUpdate` con `useCallback` previo a la suscripción Realtime. |
| `src/components/planner/AcademicPlannerView.tsx` | Optimizar | Envoltorio de `loadData` en `useCallback` para estabilidad de dependencias del efecto. |
| `src/components/storage/DocumentGallery.tsx` | Optimizar | Envoltorio de `fetchDocuments` en `useCallback`. |
| `src/components/academic/ScientificVisualizer.tsx` | Optimizar | Remoción de re-export secundario para cumplimiento estricto de React Fast Refresh. |
| `src/components/tools/StoichiometryBalancer.tsx` | Optimizar | Declaración local de `PRESET_REACTIONS`. |
| `src/utils/latexRenderer.ts` | Optimizar | Corrección de escape de barra en expresiones regulares y anotación para caracteres de control. |
| `lib/pedagogicalPrompts.ts` | Optimizar | Limpieza de variables catch no leídas y sanitización regex. |
| `src/services/geminiService.ts` | Optimizar | Corrección de escapes `\Delta` en template string y supresión de parámetros no leídos. |
| `api/nexus-worker.ts` & `api/mcp.ts` | Optimizar | Prefijado con guión bajo de variables de firma no utilizadas (`_userId`, `_topicTitle`, `_jsonrpc`). |
| `ARCHITECTURE_200.md` | Actualizar | Certificación oficial de las 200 funciones al 100% operativas. |

---

### Prompt 19: Atelier Creativo (Temas Personalizados & Lienzo con Formas), Calibración Cognitiva de Andrés (0 Física Universitaria), Guías Didácticas UCV y Evaluaciones Individuales por Perfil
> **Contenido**:
> 1. **Atelier Creativo & Temas Personalizados para María Fernanda (`mafe_diseno_ucab`)**:
>    - **Conmutador de Temas Dinámico**: Implementación de conmutación entre el tema neutro profesional (`STUDIO_MODERNO`) y el tema pastel editorial (`ROSE_ATELIER`). Basado en una paleta de rosas pastel suaves, desaturadas (`#FFF7F9`, `#FCE7F3`, `#E29578`, `#FBCFE8`) que respetan la directriz `rulesofdesign.md` ("Menos, pero mejor", sin saturación infantil ni fatiga visual).
>    - **Lienzo Creativo Interactivo (`CreativeStudioCanvas.tsx`)**:
>      - Inserción y manipulación de figuras geométricas (Rectángulo, Círculo concéntrico, Triángulo equilátero, Estrella de acento, Píldora de estado, Post-it editorial y Conector ortogonal).
>      - Inspector de propiedades en tiempo real (color de relleno, trazo, grosor, rotación, opacidad, tipografía, tamaño y orden de capas `zIndex`).
>      - Guardado persistente multi-proyecto en `localStorage` (`cpe_${userId}_canvas_projects_v1`) con selector rápido de proyectos y exportación nativa a JSON y PNG.
>    - **Motor de Crítica Proyectual por IA (`generateDesignCritique`)**:
>      - Análisis de ideas de diseño con evaluación estructurada: Jerarquía visual (60-30-10), cumplimiento de contraste WCAG 2.1 (mínimo 4.5:1), leyes de Gestalt y preguntas trampa para la defensa ante el jurado UCAB con inserción de notas adhesivas reactivas en el lienzo.
>    - **Generador de Concept Art / Mockups**:
>      - Generación conceptual de presets estilísticos (Pastel Editorial, Glassmorphic UI, Bauhaus Abstract, Clay 3D y Arquitectónico Minimalista) con incorporación directa al lienzo de trabajo.
>    - **Integración en el Tablero de Entregas (`CreativeDeliveryBoard.tsx`)**:
>      - Nueva vista `CANVAS` (Lienzo & Formas Creativas) junto al Tablero Kanban, Mural Visual y Canva Studio Hub. Selector de tema en el encabezado y paleta cromática reactiva.
> 2. **Calibración Pedagógica Estricta para Andrés (`andres_bachillerato_1`)**:
>    - **Resolución de la Incongruencia de Nivel**: Erradicación definitiva de análisis universitarios con derivadas, integrales, relatividad o matrices de Gauss-Jordan en el perfil de primer año.
>    - **Inyección de Guardarraíles Cognitivos (`buildCalibratedSystemInstruction`)**: Calibración estricta del LLM y de los motores de fallback (`generateAndresSchoolGuide`) empleando la analogía cotidiana de la balanza en equilibrio para ecuaciones lineales, fracciones de pizza, ejemplos tangibles y tono cordial sin tecnicismos universitarios.
> 3. **Guías Didácticas de Alta Visibilidad para el Curso Introductorio UCV (`santiago_fisica_ucv`)**:
>    - **Barra de Controles de Lectura Didáctica (`UCVIntroCourseHub.tsx`)**:
>      - Selector de escala tipográfica: `Aa Estándar` (14px), `Aa+ Didáctico` (17px con interlineado ampliado) y `👁️ Alto Contraste` (18px, tipografía seminegrita contrastada para sesiones de estudio exigentes).
>    - **Desglose Didáctico Modular por Capas**:
>      - Reestructuración de la teoría con tarjetas en 3 capas pedagógicas:
>        1. 💡 **La Intuición Práctica**: Razonamiento físico y analógico antes del cálculo.
>        2. 📐 **Fórmula Clave KaTeX**: Expresión matemática depurada sin errores de sintaxis.
>        3. ⚠️ **Trampa del Examen UCV**: Alerta específica sobre los distractores más comunes en los parciales de la Facultad de Ciencias.
> 4. **Batería de Evaluaciones Individuales por Perfil**:
>    - **Ampliación del Banco de Preguntas (`questionBank.ts`)**: Adición de reactivos reales para diseño (WCAG 2.1, Gestalt, regla 60-30-10, leading vs tracking), bachillerato inicial (ecuaciones de balanza, fracciones homogéneas, célula vegetal vs animal) y ciencias universitarias (cinemática diferencial, límites trigonométricos notables).
>    - **Registro y Selector de Exámenes Individuales (`PROFILE_TAILORED_EXAMS`)**:
>      - Santiago: Exámenes específicos para Física General I UCV, Cálculo Diferencial I UCV y Álgebra Lineal en ℝ³.
>      - Andrés: Álgebra Inicial de 1er Año Básico y Ciencias Naturales / Lengua Materna.
>      - Mafe: Accesibilidad WCAG & Colorimetría y Percepción Visual & Gestalt.
>      - Prima: Examen de Admisión Universitaria (Química Estequiométrica y Aptitud Cuantitativa).
>    - Integración en `SimulatorEngine.tsx` con sección destacada de inicio directo y en `UCVIntroCourseHub.tsx`.
> 5. **Validación de Calidad y Rendimiento**:
>    - `npx oxlint`: 0 errores en todos los archivos.
>    - `npx tsc -b`: 0 errores de compilación TypeScript.
>    - `npx vite build`: 0 errores, bundle optimizado y fragmentado en chunks controlados.

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `src/components/dashboards/CreativeStudioCanvas.tsx` | Crear | Lienzo interactivo con figuras geométricas, inspector de propiedades, temas, crítica IA y mockups. |
| `src/components/dashboards/CreativeDeliveryBoard.tsx` | Actualizar | Integración de vista `CANVAS`, conmutador de tema Rose Atelier / Estudio y paleta reactiva. |
| `src/services/geminiService.ts` | Actualizar | Guardarraíles pedagógicos por perfil, `generateDesignCritique`, `generateAndresSchoolGuide` y `buildCalibratedSystemInstruction`. |
| `src/components/academic/UCVIntroCourseHub.tsx` | Actualizar | Controles de visibilidad de texto didáctico (Aa, Aa+, Alto Contraste), desglose en 3 capas y parciales individuales UCV. |
| `src/lib/questionBank.ts` | Actualizar | Reactivos de diseño, 1er año y física UCV; registro `PROFILE_TAILORED_EXAMS` y función `getQuestionsForProfile`. |
| `src/components/exams/SimulatorEngine.tsx` | Actualizar | Sección destacada de evaluaciones individuales calibradas por perfil con inicio directo. |
| `PROMPTS_AND_CHANGELOG.md` | Actualizar | Bitácora técnica completa del Prompt 19. |

---

### Prompt 20: Generación del Documento Canónico de Arquitectura y Mapeo de Funciones para Auditorías con Opus 5.5 sin Agente de Navegador (`SYSTEM_ARCHITECTURE_AND_FUNCTIONS_MAP.md`)
> **Contenido**:
> 1. **Diseño del Documento de Auditoría de Ultra-Alta Densidad**:
>    - Creación de [`SYSTEM_ARCHITECTURE_AND_FUNCTIONS_MAP.md`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/SYSTEM_ARCHITECTURE_AND_FUNCTIONS_MAP.md), diseñado específicamente para que modelos de razonamiento avanzado (como Claude Opus 5.5) puedan ejecutar una auditoría integral del 100% de la plataforma en un solo turno, sin necesidad de comandos de exploración de directorios ni costosas sesiones de agentes de navegador.
> 2. **Mapeo Completo de Subsistemas, Componentes y Relaciones**:
>    - Diagrama Mermaid de topología de capas y flujo de control global desde `index.html` hasta Vercel Serverless y Supabase Postgres.
>    - Mapeo de las 8 pestañas activas del enrutador central de [`App.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/App.tsx) y widgets desacoplados en [`MainLayout.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/layout/MainLayout.tsx).
>    - Matriz de los 4 perfiles académicos (`santiago_fisica_ucv`, `andres_bachillerato_1`, `mafe_diseno_ucab`, `prima_bachillerato_5`) con sus guardarraíles cognitivos, restricciones de nivel y enlaces a código.
> 3. **Trazabilidad Exhaustiva de las 200 Funciones**:
>    - Tabla de trazabilidad de las 200 funciones operativas con ID (1 a 200), nombre, archivo fuente principal y símbolo / export o línea clave para auditoría instantánea.
> 4. **Mapeo de Persistencia Local Aislada por `userId`**:
>    - Inventario exhaustivo de todas las claves de `localStorage` y `sessionStorage` parametrizadas bajo `cpe_${userId}_*`.
> 5. **Mapeo de Endpoints Serverless & Servidor MCP**:
>    - Detalle de `api/nexus-worker.ts` (Carril A Instantáneo) y `api/mcp.ts` (Carril B Modo Profundo con SSE y JSON-RPC 2.0).

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `SYSTEM_ARCHITECTURE_AND_FUNCTIONS_MAP.md` | Crear | Documento canónico de arquitectura, mapa de dependencias, trazabilidad de 200 funciones y protocolo de auditoría para Opus 5.5. |
| `ARCHITECTURE_200.md` | Actualizar | Incorporación de enlace de referencia hacia el documento canónico de auditoría para LLMs. |
| `PROMPTS_AND_CHANGELOG.md` | Actualizar | Registro y documentación del Prompt 20. |

---

### Prompt 21: Arreglos Arquitectónicos, Aislamiento Multi-Cuenta Estricto y Calibración Pedagógica Post-Auditoría
> **Contenido**:
> 1. **Aislamiento Multi-Cuenta & Multi-Tenant**:
>    - `sessionRecoveryService.ts` & `useExamSimulator.ts`:
>      - Aislamiento estricto de la cola offline (`cpe_${userId}_pending_exam_sync_queue_v1`) y métodos de encolado/sincronización con `userId`.
>      - Invocación de `sessionRecoveryService.clearActiveExamSession(user?.id)` pasando explícitamente el ID del usuario al finalizar el examen o cancelarlo.
>      - Sincronización offline `initNetworkSyncListener(user?.id)`.
>    - `UCVIntroCourseHub.tsx`:
>      - Eliminación del fallback genérico `'demo-user-id'` en `handleInjectSchedule`. Ahora requiere autenticación con perfil activo, impidiendo contaminación de estado entre cuentas.
>    - `CreativeDeliveryBoard.tsx` & `CreativeStudioCanvas.tsx`:
>      - Recarga reactiva de `themeMode` y `projects` cuando `user?.id` cambia (evitando que un usuario herede proyectos o el tema seleccionado por otra cuenta en la misma terminal).
> 2. **Calibración Pedagógica del Banco de Preguntas (`questionBank.ts`)**:
>    - Firma refactorizada de `getQuestionsForProfile(profileId, subject?, topicKeyword?, limit?)`:
>      - Filtrado estricto por `targetProfiles.includes(profileId)`, impidiendo que reactivos universitarios de física y cálculo analítico caigan en exámenes de primer año escolar (Andrés).
>      - Filtrado por materia (`subject`) y palabra clave temática (`topicKeyword`), resolviendo el problema de colisión donde todos los exámenes de un mismo perfil arrojaban exactamente el mismo conjunto inicial de preguntas.
>    - Inclusión de reactivos especializados:
>      - Santiago: Torque y producto cruz en $\mathbb{R}^3$, regla de la cadena con logaritmo natural, determinantes $3 \times 3$.
>      - Andrés: Regla de signos en multiplicación de enteros, jerarquía de operaciones básica, estructura atómica (protones en el núcleo) y clasificación de palabras agudas con tilde.
>      - Mafe: WCAG 2.1 ratio para texto grande (3:1), principio Gestalt de Figura y Fondo, y directriz de diseño inclusivo sin dependencia exclusiva del color.
>    - Adición del examen individual de Álgebra Lineal & Geometría Analítica para Santiago en `PROFILE_TAILORED_EXAMS`.
> 3. **Calibración del Hub UCV (`UCVIntroCourseHub.tsx` & `ucv_intro_course_data.ts`)**:
>    - Creación de la interfaz `DidacticLayer` (Intuición, KaTeX Formula, Exam Trap, Fast Strategy) y población estructurada en los 7 módulos curriculares oficiales.
>    - `UCVIntroCourseHub.tsx`: Sustitución de textos estáticos genéricos por el desglose por capas conceptuales reactivo en la vista de teoría con 4 columnas didácticas adaptativas.
>    - Aislamiento de cuestionarios modulares (`handleLaunchModuleQuiz`): Ahora filtra `UCV_EXAM_BANK` específicamente por el tema y unidad correspondiente al módulo seleccionado.
>    - `SimulatorEngine.tsx`: Sincronización reactiva de `activeProfileTab` con `academicProfile` mediante `useEffect` y calibración de modo de examen (`HIGH_SCHOOL_EXAM` para Andrés vs `UNIVERSITY_EXAM` para universitarios).
> 4. **Mantenimiento del Documento de Arquitectura (`SYSTEM_ARCHITECTURE_AND_FUNCTIONS_MAP.md`)**:
>    - Actualización de la clave de almacenamiento `cpe_${userId}_pending_exam_sync_queue_v1` en la Sección 6.
>    - Verificación y actualización de firmas en la tabla de 200 funciones (Sección 7).
> 5. **Verificación de Calidad**:
>    - `oxlint`: 0 errores.
>    - `tsc -b`: 0 errores.
>    - `vite build`: 0 errores (3.78s de compilación).

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `src/services/sessionRecoveryService.ts` | Actualizar | Aislamiento de cola offline por `userId` (`cpe_${userId}_pending_exam_sync_queue_v1`) y fallback seguro. |
| `src/hooks/useExamSimulator.ts` | Actualizar | Paso explícito de `user?.id` a `clearActiveExamSession` e inicialización aislada del listener de red. |
| `src/lib/questionBank.ts` | Actualizar | Refactorización de `getQuestionsForProfile(profileId, subject, topicKeyword, limit)`, blindaje de Andrés y 10 reactivos nuevos. |
| `src/components/exams/SimulatorEngine.tsx` | Actualizar | Sincronización reactiva de `activeProfileTab`, modo escolar vs universitario y filtrado temático en exámenes de módulo. |
| `src/data/ucv_intro_course_data.ts` | Actualizar | Interfaz `DidacticLayer` y desglose didáctico estructurado (Intuición, KaTeX, Trampa, Estrategia) para los 7 módulos. |
| `src/components/academic/UCVIntroCourseHub.tsx` | Actualizar | Remoción de `demo-user-id`, tipado estricto en cuestionarios modulares y renderizado de las 4 capas pedagógicas. |
| `src/components/dashboards/CreativeDeliveryBoard.tsx` | Actualizar | Recarga reactiva de `themeMode` y entregas en cambio de usuario sin persistencia cruzada. |
| `src/components/dashboards/CreativeStudioCanvas.tsx` | Actualizar | Recarga reactiva de proyectos de lienzo y tema al alternar cuentas de usuario. |
| `SYSTEM_ARCHITECTURE_AND_FUNCTIONS_MAP.md` | Actualizar | Reflejo de claves de sincronización offline aisladas y funciones de persistencia actualizadas. |
| `PROMPTS_AND_CHANGELOG.md` | Actualizar | Registro exhaustivo de los arreglos técnicos del Prompt 21. |

---

### Prompt 22: Sistema de Digitalización de Planes de Evaluación con Foto/IA, Horario Escolar Semanal y Documento Canónico de Auditoría
> **Contenido**:
> 1. **Documento Canónico de Arquitectura y Auditoría (`CALENDAR_AND_EVALUATION_PLAN_SYSTEM.md`)**:
>    - Elaboración de un documento de especificación técnica forense para la Agenda Académica, Horarios y Recordatorios de Exámenes, complementario a `SYSTEM_ARCHITECTURE_AND_FUNCTIONS_MAP.md`.
>    - Mapeo de subsistemas, topología de datos, esquemas canónicos JSON (`cpe-evaluation-plan-v1` y `cpe-class-schedule-v1`), matriz de aislamiento multi-cuenta (`cpe_${userId}_*`), catálogo de funciones y protocolo de auditoría rápida para modelos LLM (Opus 5.5).
> 2. **Esquema y Prompt Maestro para Ingesta de Planes de Evaluación (`cpe-evaluation-plan-v1`)**:
>    - Definición del esquema determinista JSON para planes de evaluación oficiales con desglose de cortes, tipo de evaluación (`PARCIAL`, `QUIZ`, `TALLER`, `PROYECTO`, `ENTREGA`, `RECUPERACION`), fecha ISO, ponderación porcentual y temas probables que evalúa cada corte.
>    - Creación del prompt maestro oficial embebido en la aplicación (`MASTER_EVALUATION_PLAN_PROMPT`) para que el estudiante suba una fotografía o PDF de su plan a Gemini / Claude / ChatGPT y reciba el JSON listo para pegar.
> 3. **Modal de Importación Inteligente (`EvaluationPlanAiImporterModal.tsx`)**:
>    - Modal de dos pasos: Paso 1 con instrucción guiada, copiado del prompt en 1 clic y botón a Gemini; Paso 2 con validador interactivo de JSON, verificación de suma porcentual ($\sum = 100\%$), chips de temas probables y selección de generación automática de recordatorios y tareas Kanban.
> 4. **Motor de Digitalización y Automatización (`plannerService.importEvaluationPlan`)**:
>    - Ingesta atómica que crea eventos en el calendario, alertas escalonadas de estudio (T-7 días y T-3 días previos calculados automáticamente) y tareas de estudio en el tablero Kanban a través de `taskService`.
> 5. **Horario Escolar y Universitario Semanal (`WeeklyClassScheduleView.tsx`)**:
>    - Grilla semanal visual de 6 columnas (Lunes a Sábado) con bloques de asignaturas, horarios de inicio/fin, aula, docente y modalidad (Presencial, Virtual, Híbrido).
>    - Motor en tiempo real con detección dinámica de *"En clase ahora"* y *"Próxima clase"* basado en la hora del sistema.
>    - Ingestor de horarios por foto/IA con su respectivo esquema `cpe-class-schedule-v1` y prompt maestro.
>    - Presets de 1 clic calibrados para Andrés (1er año), Santiago (UCV Ciencias) y Mafe (UCAB Diseño).
> 6. **Integración en `AcademicPlannerView.tsx`**:
>    - Incorporación de la pestaña `SCHEDULE` ("Horario Escolar") en la barra de navegación.
>    - Botón de acceso rápido `"✨ Importar Plan con Foto / IA"` en el encabezado general y en las vistas de Calendario y Planes de Evaluación.
> 7. **Verificación de Calidad y Cero Regresiones**:
>    - `tsc -b`: 0 errores.
>    - `oxlint`: 0 errores.
>    - `vite build`: 0 errores, bundles optimizados.

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `CALENDAR_AND_EVALUATION_PLAN_SYSTEM.md` | Crear | Documento canónico de arquitectura, esquemas JSON, prompts de Gemini y trazabilidad del sistema de calendario, horario y recordatorios. |
| `src/types/academicPlanner.types.ts` | Actualizar | Nuevos tipos `EvaluationPlanImportPayload`, `ImportedEvaluationItem`, `DayOfWeek`, `ClassScheduleBlock` y `ClassScheduleImportPayload`. |
| `src/services/plannerService.ts` | Actualizar | Métodos de horario escolar (`getClassSchedule`, `addClassBlock`, etc.) y motor `importEvaluationPlan` con recordatorios escalonados y tareas. |
| `src/components/planner/EvaluationPlanAiImporterModal.tsx` | Crear | Modal de importación con Prompt Maestro de Gemini, validador de ponderaciones y chips de temas probables. |
| `src/components/planner/WeeklyClassScheduleView.tsx` | Crear | Vista de horario semanal con detección en vivo de clase actual, presets por perfil e importador de horario con foto. |
| `src/components/planner/AcademicPlannerView.tsx` | Actualizar | Inclusión de pestaña de horario escolar, botones de importación con IA y conexión reactiva del modal. |
| `PROMPTS_AND_CHANGELOG.md` | Actualizar | Registro y documentación completa del Prompt 22. |

---

### Prompt 23: Resolución Integral de Errores de Auditoría en Agenda, Horarios y Documentación Canónica
> **Contenido**:
> 1. **Módulo de Validación y Normalización (`src/utils/academicImportValidator.ts`)**:
>    - `extractJsonFromAiResponse`: Extracción segura de bloques JSON ignorando texto conversacional introductorio ("Aquí tienes tu JSON:") o bloques markdown imperfectos.
>    - `normalizeDayOfWeek`: Normalización automática de tildes y mayúsculas/minúsculas (`MIÉRCOLES` $\to$ `MIERCOLES`, `Sábado` $\to$ `SABADO`).
>    - `validateAndNormalizeEvaluationPlan`: Aceptación de alias flexibles (`professor`/`teacher`, `academicPeriod`/`term`), validación de fechas ISO y rango de ponderaciones.
>    - `validateAndNormalizeClassSchedule`: Aceptación de alias (`dayOfWeek`/`day`), formato 24h `HH:MM` y modalidad.
>    - `calculatePreAlertDate`: Aritmética local de calendario sin conversión a UTC para prevenir desfase de días en alertas escalonadas.
> 2. **Deduplicación y Aislamiento en `plannerService.ts`**:
>    - En `importEvaluationPlan`: Deduplicación estricta de eventos (por materia, título y fecha), recordatorios escalonados y tareas Kanban.
>    - Inclusión de los temas probables en el título y descripción de las tareas Kanban creadas.
>    - En `importClassSchedule`: Soporte del parámetro `replaceExisting: boolean` y fusión inteligente que omite clases idénticas (mismo día, hora y materia).
> 3. **Reloj Activo y Detección de Solapamientos en `WeeklyClassScheduleView.tsx`**:
>    - Ticker activo de 30 segundos (`setInterval`) para que el estado *"En clase ahora"* y *"Próxima clase"* se actualice dinámicamente en tiempo real sin congelarse.
>    - Detección de solapamiento de horarios entre materias del mismo día (`checkIsOverlapping`) con advertencia visual `⚠️ Solapada`.
>    - Reemplazo limpio de horario al cargar presets por perfil (Andrés, Santiago, Mafe) eliminando clases duplicadas.
>    - Opción interactiva "Reemplazar horario existente" en el modal de importación con IA.
> 4. **Ajustes en `EvaluationPlanAiImporterModal.tsx`**:
>    - Prompt maestro dinámico con cálculo del año actual (`new Date().getFullYear()`).
>    - Integración de `academicImportValidator` y renderizado de observaciones de validación.
>    - Aviso informativo de modo invitado si no hay sesión autenticada.
> 5. **Sincronización Total del Documento Canónico (`CALENDAR_AND_EVALUATION_PLAN_SYSTEM.md` v2.0.0)**:
>    - Corrección de los 9 puntos detectados en la auditoría (D1 a D9): esquemas con soporte dual de nombres de campo, claves de persistencia reales (`reminders_clean_v1`, `notes_clean_v1`), especificación de cálculo dinámico de planes en memoria, y eliminación de supuestos inexactos.
>    - Corrección de sintaxis Mermaid (`-->>` corregido a `-->`) y bloques markdown de código anidados.
> 6. **Garantía de Calidad**:
>    - `tsc -b`: 0 errores.
>    - `oxlint`: 0 errores.
>    - `vite build`: 0 errores (bundle de producción compilado en 8.3s).

| Archivo | Acción | Descripción del Cambio |
| :--- | :--- | :--- |
| `src/utils/academicImportValidator.ts` | Crear | Utilidades de extracción JSON de IA, normalización de días con tilde, validación de esquemas y fechas seguras. |
| `src/services/plannerService.ts` | Actualizar | Deduplicación de eventos, recordatorios y tareas; inclusión de temas en Kanban; soporte de replaceExisting en horario. |
| `src/components/planner/EvaluationPlanAiImporterModal.tsx` | Actualizar | Integración de normalizador, prompt con año dinámico, avisos de validación y modo invitado. |
| `src/components/planner/WeeklyClassScheduleView.tsx` | Actualizar | Ticker en vivo de 30s, detector de solapamiento de clases, importación con toggle de reemplazo y presets sin duplicados. |
| `CALENDAR_AND_EVALUATION_PLAN_SYSTEM.md` | Actualizar | Versión 2.0.0 con 100% de coherencia con el código, corrección de Mermaid, claves reales y schemas universales. |
| `PROMPTS_AND_CHANGELOG.md` | Actualizar | Documentación y registro del Prompt 23. |


