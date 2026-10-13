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



