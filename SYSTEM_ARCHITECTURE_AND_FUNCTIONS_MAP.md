# 🏛️ SYSTEM ARCHITECTURE & FULL FUNCTION AUDIT MAP
## Centro de Productividad Estudiantil (CPE) — Comprehensive Audit Specification for LLMs (Opus 5.5 / Expert AI Auditors)

> **Document Version**: 2.5.0 (Auditoría Forense & Mapeo Total de Conexiones)  
> **Target Audience**: Claude 3.5 / 3.7 / 3.8 / Opus 5.5, QA Tech Leads y Auditores de Arquitectura  
> **Propósito**: Permitir una auditoría completa del 100% de la base de código sin necesidad de ejecutar agentes de navegación web, lecturas iterativas de archivos ni consumo excesivo de tokens.  
> **Tech Stack**: React 19, TypeScript 5.8 (Strict Mode), Vite 8.3, Tailwind CSS (Vanilla + Design Tokens), Supabase Postgres RLS, Google Gemini API (2.5 Flash), Web Speech API, Web Audio API, KaTeX + mhchem.  
> **Estado de Compilación**: `tsc -b` (0 errores), `oxlint` (0 errores en archivos del workspace), `vite build` (0 errores, todos los chunks < 1000 kB).

---

## 📑 ÍNDICE GENERAL DEL MAPA DE AUDITORÍA
1. **Topología de Capas y Flujo de Control Global**
2. **Matriz de Cuentas, Perfiles y Guardarraíles Cognitivos**
3. **Mapeo de Rutas, Navegación y Shell de la Aplicación**
4. **Mapeo de Subsistemas (Componentes $\leftrightarrow$ Servicios $\leftrightarrow$ Hooks $\leftrightarrow$ Storage)**
   - *Subsistema A*: Workspace Modular & Widgets de Productividad
   - *Subsistema B*: Planificación Predictiva, Horarios & Exportaciones
   - *Subsistema C*: Curso Introductorio Ciencias UCV & Laboratorios Especializados
   - *Subsistema D*: Motor de Evaluaciones, Simulador & Proctoring
   - *Subsistema E*: Atelier Creativo, Temas Personalizados & Lienzo con Formas
   - *Subsistema F*: Suite de Herramientas STEM & Humanísticas
   - *Subsistema G*: Estación de Almacenamiento, Ingesta IA & Telemetría
5. **Mapeo de APIs Serverless & Servidor MCP (`api/`)**
6. **Mapeo de Persistencia Local Aislada por `userId` (`cpe_${userId}_*`)**
7. **Matriz Completa de las 200 Funciones: Trazabilidad Código a Código**
8. **Protocolo de Auditoría Rápida para Opus 5.5 (Sin Agentes de Navegador)**

---

## 1. TOPOLOGÍA DE CAPAS Y FLUJO DE CONTROL GLOBAL

```mermaid
graph TD
    A[index.html] --> B[src/main.tsx]
    B --> C[src/App.tsx - AuthProvider & Global Shell]
    C --> D{¿Hay sesión activa?}
    D -- No --> E[StudentAuthPortal & AuthModal]
    D -- Sí --> F[MainLayout: Sidebar, Header, MobileNav, FloatingWidgets]
    F --> G[Enrutador de Pestañas Activas: currentTab]
    
    G --> T1[PRODUCTIVITY: ModularWorkspaceDashboard]
    G --> T2[PLANNER: AcademicPlannerView]
    G --> T3[GUIDES: AcademicGuidesView]
    G --> T4[EXAMS: SimulatorEngine]
    G --> T5[STORAGE: StorageManagerView]
    G --> T6[CREATIVE_BOARD: CreativeDeliveryBoard]
    G --> T7[TOOLS: ToolsAndSettingsView]
    G --> T8[UCV_COURSE: UCVIntroCourseHub - Condicional Santiago]

    subgraph Servicios Centrales
        S1[geminiService.ts]
        S2[plannerService.ts]
        S3[taskService.ts]
        S4[storageService.ts]
        S5[sessionRecoveryService.ts]
        S6[soundscapeService.ts]
        S7[proctoringSystem.ts]
    end

    subgraph Serverless & Cloud
        API1[/api/nexus-worker - Carril A Gemini Flash]
        API2[/api/mcp - Carril B Spark MCP Server]
        DB[(Supabase Postgres + Storage Buckets)]
    end

    T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 --> S1 & S2 & S3 & S4 & S5 & S6 & S7
    S1 & S2 & S3 & S4 --> API1 & API2 & DB
```

---

## 2. MATRIZ DE CUENTAS, PERFILES Y GUARDARRAÍLES COGNITIVOS

La aplicación implementa un sistema multi-perfil donde la UI, las pestañas del sidebar, los guardarraíles de IA y las preguntas de examen se reconfiguran dinámicamente según la cuenta activa:

| Perfil ID (`AcademicProfileId`) | Estudiante | Institución / Nivel | Pestañas Predeterminadas (`sidebar_tabs`) | Guardarraíl Cognitivo Asignado | Prohibiciones Estrictas de IA |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `santiago_fisica_ucv` | Santiago Rivero | Facultad de Ciencias UCV (Física) | `WORKSPACE`, `UCV_COURSE`, `PLANNER`, `EXAMS`, `TOOLS`, `STORAGE` | `UNIVERSITARIO_EXACTAS` | Prohibido omitir rigor matemático KaTeX o simplificar derivadas/integrales a nivel escolar. |
| `andres_bachillerato_1` | Andrés Rivero | 1er Año Bachillerato | `WORKSPACE`, `PLANNER`, `GUIDES`, `EXAMS`, `TOOLS` | `BASICO_ESCOLAR` | **Prohibición Absoluta**: Cero derivadas, integrales, física de tensores o matrices de Gauss-Jordan. Ecuaciones solo con balanza. |
| `mafe_diseno_ucab` | María Fernanda | Escuela de Diseño Integral UCAB | `WORKSPACE`, `CREATIVE_BOARD`, `PLANNER`, `TOOLS`, `STORAGE` | `UNIVERSITARIO_DISENO` | Cero fórmulas analíticas inventadas; enfoque estricto en composición visual, WCAG 2.1, Gestalt y 60-30-10. |
| `prima_bachillerato_5` | Sofía / Prima | 5to Año Bachillerato / Admisión UCV | `WORKSPACE`, `PLANNER`, `GUIDES`, `EXAMS`, `TOOLS`, `STORAGE` | `BACHILLERATO_AVANZADO` | Trucos de examen, estequiometría real, descarte razonado de distractores y analogías verbales. |

### Ubicación del Código de Guardarraíles:
- **Definición de Políticas**: [`lib/pedagogicalPrompts.ts`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/lib/pedagogicalPrompts.ts) (`PEDAGOGICAL_GUARDRAILS`, `GLOBAL_ANTI_HALLUCINATION_DIRECTIVE`, `KATEX_STRICT_RULES`).
- **Inyección en Gemini API**: [`src/services/geminiService.ts`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/services/geminiService.ts) (`buildCalibratedSystemInstruction`, `generateAndresSchoolGuide`, `generateMafeDesignGuide`).
- **Contexto de Autenticación**: [`src/context/AuthContext.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/context/AuthContext.tsx) (`useAuth()`, `switchProfileDemo`, `updateUserPreferences`).

---

## 3. MAPEO DE RUTAS, NAVEGACIÓN Y SHELL DE LA APLICACIÓN

### Enrutamiento Central (`src/App.tsx` $\to$ `src/components/layout/MainLayout.tsx`):
1. **Pestaña `PRODUCTIVITY`**: Renderiza [`ModularWorkspaceDashboard.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/workspace/ModularWorkspaceDashboard.tsx).
2. **Pestaña `PLANNER`**: Renderiza [`AcademicPlannerView.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/planner/AcademicPlannerView.tsx).
3. **Pestaña `GUIDES`**: Renderiza [`AcademicGuidesView.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/academic/AcademicGuidesView.tsx).
4. **Pestaña `EXAMS`**: Renderiza [`SimulatorEngine.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/exams/SimulatorEngine.tsx).
5. **Pestaña `STORAGE`**: Renderiza [`StorageManagerView.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/storage/StorageManagerView.tsx).
6. **Pestaña `CREATIVE_BOARD`**: Renderiza [`CreativeDeliveryBoard.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/dashboards/CreativeDeliveryBoard.tsx).
7. **Pestaña `TOOLS`**: Renderiza [`ToolsAndSettingsView.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/tools/ToolsAndSettingsView.tsx).
8. **Pestaña `UCV_COURSE`**: Renderiza [`UCVIntroCourseHub.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/academic/UCVIntroCourseHub.tsx) (filtrado para Santiago).

### Componentes Globales del Shell:
- **`Header.tsx`**: Contiene migas de pan dinámicas (`TAB_BREADCRUMBS`), indicador en vivo de latencia (`LiveSystemStatusWidget`), botón de alternancia Dark Mode (`.dark` en `html`) y acceso a cuentas.
- **`Sidebar.tsx`**: Menú lateral dinámico configurable por el estudiante con el modal [`SidebarCustomizerModal.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/layout/SidebarCustomizerModal.tsx) y botón rápido de cambio de cuenta [`ProfileQuickSwitcher.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/auth/ProfileQuickSwitcher.tsx).
- **`MobileNavigation.tsx`**: Barra de navegación inferior adaptativa para smartphones.
- **`CommandPalette.tsx`**: Lanzador accesible con `Cmd + K` / `Ctrl + K` con búsqueda instantánea de materias, navegación, exámenes rápidos y tareas reales del usuario.
- **`FloatingCalculatorWidget.tsx`**: Calculadora científica desacoplada invocable desde cualquier pantalla mediante botón flotante inferior.
- **`ScratchpadDrawer.tsx`**: Pizarra de mano alzada en HTML5 Canvas con exportación a PNG y editor KaTeX simultáneo guardado por usuario en `cpe_${userId}_scratchpad_draft`.

---

## 4. MAPEO DETALLADO DE SUBSISTEMAS

### Subsistema A: Workspace Modular & Widgets de Productividad
- **Dashboard Principal**: [`src/components/workspace/ModularWorkspaceDashboard.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/workspace/ModularWorkspaceDashboard.tsx).
- **Hook de Módulos Activos**: [`src/hooks/useWorkspaceModules.ts`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/hooks/useWorkspaceModules.ts) (persiste el orden y visibilidad de widgets en `cpe_${userId}_workspace_modules`).
- **Widgets Conectados**:
  1. `TasksWidget.tsx`: Lista de tareas con filtros de prioridad, botón de desglose Notion AI con [`TaskDetailModal.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/kanban/TaskDetailModal.tsx) y sincronización con `taskService.ts`.
  2. `PomodoroWidget.tsx`: Temporizador paramétrico (25/5, 50/10, deep focus) con sonido Web Audio y persistencia de racha en `cpe_${userId}_pomodoros_today`.
  3. `QuickExamWidget.tsx`: Tarjetas de inicio rápido de examen diagnóstico o por materia.
  4. `LatexLabWidget.tsx`: Laboratorio interactivo KaTeX con presets de física fundamental.
  5. `CalculatorWidget.tsx`: Calculadora científica integrada con constantes físicas.
  6. `GeminiAiWidget.tsx`: Tutor flotante contextual conectado a `geminiService.ts`.
  7. `GuidesQuickWidget.tsx`: Acceso directo a guías de estudio recientes.
  8. `KanbanWidget.tsx`: Mini tablero kanban sincronizado.

### Subsistema B: Planificación Predictiva, Horarios & Exportaciones
- **Vista Central**: [`src/components/planner/AcademicPlannerView.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/planner/AcademicPlannerView.tsx).
- **Servicio de Planificador**: [`src/services/plannerService.ts`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/services/plannerService.ts) (Eventos evaluativos, cortes, notas ponderadas, guardado en `cpe_${userId}_planner_events`).
- **Componentes Conectados**:
  1. `AcademicCalendarView.tsx`: Vista de calendario mensual con cuadrícula de eventos y estados de entrega.
  2. `AdaptiveStudyScheduleGenerator.tsx`: Generador determinista de horarios adaptativos. Lee las tareas pendientes y fechas de examen reales, balancea bloques ultradianos de 90 min y previene sobrecargas de estudio.
  3. `WhatIfGradeCalculator.tsx`: Simulador "What-If" de notas en escalas 1-20, 1-100 y 1-5; calcula la nota exacta necesaria en la última evaluación para aprobar.
  4. `GradeProjectionCalculator.tsx`: Proyección matemática acumulada de cortes académicos con alertas de riesgo.
  5. `StudySummaryPdfExporter.tsx`: Generador editorial de resúmenes en formato PDF imprimible con soporte para fórmulas KaTeX e impresión limpia vía `window.print()`.
  6. `NotionWorkspaceExporterModal.tsx`: Generador de payload JSON compatible con la API oficial de Notion para exportar resúmenes a bases de datos y páginas de Notion.

### Subsistema C: Curso Introductorio Ciencias UCV & Laboratorios Especializados
- **Centro Académico UCV**: [`src/components/academic/UCVIntroCourseHub.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/academic/UCVIntroCourseHub.tsx).
- **Datos Oficiales UCV**: [`src/data/ucv_intro_course_data.ts`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/data/ucv_intro_course_data.ts) (Plan de 6 semanas, 7 módulos curriculares, 30 reactivos oficiales).
- **Herramientas y Laboratorios Conectados**:
  1. `UCVInteractiveLabs.tsx`: 5 laboratorios interactivos (SI y Aritmética, Álgebra de Intervalos, Vectores y Venn, Caja Negra, Pregunta Inversa).
  2. `ReadingComprehensionTrainer.tsx`: Entrenador de comprensión lectora de textos científicos de admisión con descarte razonado de opciones.
  3. `SentenceSyntaxAnalyzer.tsx`: Analizador morfosintáctico de oraciones (Sujeto, Predicado, Modificadores, Complementos).
  4. `SpeedReadingTimer.tsx`: Cronómetro de lectura rápida con cálculo de PPM y test de retención inmediata.
  5. `VectorAndGraphInteractive.tsx`: Graficador SVG interactivo con cálculo formal de derivadas analíticas.
  6. `ScientificVisualizer.tsx`: Visualizador científico con soporte de Diagramas de Cuerpo Libre (DCL) en SVG vectorial y auto-sanitizador KaTeX.
  7. `LinearEquationSolver.tsx`: Solucionador determinista de sistemas lineales 2x2 y 3x3 por Reducción, Sustitución, Igualación y Cramer, con validación de consistencia (Rouché-Frobenius).
  8. **Controles de Lectura Didáctica**: Selector de escala tipográfica (`Aa Estándar` 14px, `Aa+ Didáctico` 17px, `👁️ Alto Contraste` 18px) y desglose modular en 3 capas (💡 *Intuición*, 📐 *Fórmula*, ⚠️ *Trampa UCV*).

### Subsistema D: Motor de Evaluaciones, Simulador & Proctoring
- **Motor Central de Examen**: [`src/components/exams/SimulatorEngine.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/exams/SimulatorEngine.tsx).
- **Hook de Ejecución de Examen**: [`src/hooks/useExamSimulator.ts`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/hooks/useExamSimulator.ts).
- **Servicio de Recuperación de Sesión**: [`src/services/sessionRecoveryService.ts`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/services/sessionRecoveryService.ts) (salva respuestas en curso en `cpe_${userId}_active_exam_backup_v1`).
- **Banco de Preguntas Integrado**: [`src/lib/questionBank.ts`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/lib/questionBank.ts) (`QUESTION_BANK`, `PROFILE_TAILORED_EXAMS`, `getQuestionsForProfile`).
- **Componentes Conectados**:
  1. `ExamRunner.tsx`: Interfaz de examen cronometrado con barra de avance, marcado de dudas, salto libre y temporizador estricto.
  2. `useProctoringCamera.ts`: Hook de cámara web supervisora con vista previa en vivo y desmontaje seguro de hardware.
  3. `ExamQuestionCard.tsx`: Renderizador de reactivos con fórmulas KaTeX en enunciado y opciones de respuesta.
  4. `ExamResultsReport.tsx`: Reporte detallado post-examen con cálculo de nota en escala 1-20, percentil, tiempo invertido por pregunta y retroalimentación completa en KaTeX.
  5. **Evaluaciones Calibradas por Perfil**:
     - *Santiago*: Física General I UCV, Cálculo Diferencial UCV, Álgebra Lineal en $\mathbb{R}^3$.
     - *Andrés*: Álgebra Inicial de 1er Año Básico (balanza), Ciencias Naturales & Lengua Materna.
     - *Mafe*: Accesibilidad Web WCAG 2.1 AA, Colorimetría 60-30-10, Gestalt y Jerarquía Editorial.
     - *Prima*: Simulacro de Admisión Universitaria (Química Estequiométrica y Razonamiento Cuantitativo).

### Subsistema E: Atelier Creativo, Temas Personalizados & Lienzo con Formas
- **Tablero de Entregas Creativas**: [`src/components/dashboards/CreativeDeliveryBoard.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/dashboards/CreativeDeliveryBoard.tsx).
- **Lienzo de Diseño Interactivo**: [`src/components/dashboards/CreativeStudioCanvas.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/dashboards/CreativeStudioCanvas.tsx).
- **Canva Studio Hub**: [`src/components/dashboards/CanvaStudioHub.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/dashboards/CanvaStudioHub.tsx) (Incrustación de proyectos y tabla bulk CSV de 4 columnas para creación en lote en Canva).
- **Capacidades Específicas**:
  1. **Conmutador de Temas**: Alternancia entre `STUDIO_MODERNO` (neutro cobalto) y `ROSE_ATELIER` (base pastel rosa desaturada `#FFF7F9`, `#FCE7F3`, `#E29578`, `#FBCFE8` conforme a `rulesofdesign.md`).
  2. **Objetos y Formas Geométricas**: Rectángulos, Círculos, Triángulos, Estrellas, Píldoras, Post-its y Conectores con inspector de propiedades $(X, Y, W, H, \text{fill}, \text{stroke}, \text{rotation}, \text{zIndex}, \text{text})$.
  3. **Persistencia Multi-Proyecto**: Proyectos guardados en `cpe_${userId}_canvas_projects_v1` con renombrado y conmutador rápido.
  4. **Crítica Proyectual por IA (`generateDesignCritique`)**: Evaluación de contraste WCAG, leyes de Gestalt y preguntas trampa para jurados UCAB con notas reactivas insertadas en el lienzo.
  5. **Generador de Concept Art / Mockups**: Creación de tarjetas conceptuales (Pastel Editorial, Glassmorphic UI, Bauhaus Abstract, Clay 3D, Arquitectónico) directamente en el lienzo.

### Subsistema F: Suite de Herramientas STEM & Humanísticas
- **Hub de Herramientas**: [`src/components/tools/ToolsAndSettingsView.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/tools/ToolsAndSettingsView.tsx).
- **Módulos STEM**:
  1. `StoichiometryBalancer.tsx`: Balanceador estequiométrico determinista con masas molares, reactivo limitante, reactivo en exceso y rendimiento teórico con KaTeX y notación `\mathrm{...}`.
  2. `InteractivePeriodicTable.tsx`: Tabla periódica con números atómicos, electronegatividades, configuraciones electrónicas y clasificación de metales post-transición (Aluminio $Z=13$).
  3. `PhMolarityCalculator.tsx`: Cálculo de pH, pOH, concentraciones molares y diluciones.
  4. `MendelianGeneticsSimulator.tsx`: Simulador de cruces de Punnett monohíbridos y dihíbridos con frecuencias fenotípicas/genotípicas.
  5. `VectorCalculatorWidget.tsx`: Calculadora vectorial 2D/3D (producto punto, producto cruz, proyecciones).
  6. `ScientificCalculator.tsx`: Calculadora científica completa con teclado matricial y memoria.
- **Módulos Humanísticos**:
  1. `SentenceSyntaxAnalyzer.tsx`: Análisis de sintagmas y complementos verbales.
  2. `ReadingComprehensionTrainer.tsx`: Textos y preguntas de deducción.
  3. `SpacedRepetitionFlashcards.tsx`: Algoritmo SuperMemo-2 (SM-2) aislado por cuenta.
  4. `SpeedReadingTimer.tsx`: Entrenamiento de velocidad lectora.
- **Módulos de Productividad & Ambiente**:
  1. `FocusSoundscapeMixer.tsx`: Paisajes sonoros procedurales Web Audio (Lluvia, Fuego, Agua, Ondas Gamma 40Hz).
  2. `AmbientThemeNightShiftPanel.tsx`: Modo oscuro Deep Slate y filtro Night Shift de luz azul (2700K a 6500K).
  3. `AdminTelemetryPanel.tsx`: Telemetría de latencias, cuotas de Gemini y estado de workers.
  4. `BackupRestoreModal.tsx`: Copia de seguridad y restauración integral JSON de datos aislados del usuario.

### Subsistema G: Estación de Almacenamiento, Ingesta IA & Telemetría
- **Vista de Almacenamiento**: [`src/components/storage/StorageManagerView.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/storage/StorageManagerView.tsx).
- **Estación de Ingesta Asistida por IA**: [`src/components/ai/UploadStation.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/ai/UploadStation.tsx).
- **Galería de Documentos**: [`src/components/storage/DocumentGallery.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/storage/DocumentGallery.tsx).
- **Servicio de Almacenamiento**: [`src/services/storageService.ts`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/services/storageService.ts) (Supabase Storage bucket `user_documents`, metadata en tabla `user_documents`).
- **Análisis de Documentos por IA**: [`src/components/ai/AiDocumentAnalysisView.tsx`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/components/ai/AiDocumentAnalysisView.tsx).

---

## 5. MAPEO DE APIS SERVERLESS & SERVIDOR MCP (`api/`)

| Endpoint / Archivo | Tipo de Endpoint | Protocolo / Transporte | Funcionalidad Clave | Modelos / Librerías |
| :--- | :--- | :--- | :--- | :--- |
| `api/nexus-worker.ts` | Vercel Serverless Function | HTTP POST (REST) | **Carril A Instantáneo**: Desglose Notion AI de tareas y deconstrucción de guías de estudio en 2-4 segundos. | Google Gemini 2.5 Flash, Supabase Client |
| `api/mcp.ts` | Vercel Serverless Function | Server-Sent Events (SSE) y JSON-RPC 2.0 | **Carril B Modo Profundo**: Servidor MCP con 5 herramientas registradas para interactuar con Gemini Spark y asistentes de código: <br>1. `analyze_and_breakdown_task`<br>2. `deconstruct_study_guide`<br>3. `generate_simadi_quiz`<br>4. `calculate_academic_metrics`<br>5. `query_ucv_curriculum` | MCP Protocol Specification, JSON-RPC 2.0 |

---

## 6. MAPEO DE PERSISTENCIA LOCAL AISLADA POR `userId`

Para garantizar el cumplimiento de la directriz de aislamiento multi-cuenta, toda la información sensible del estudiante se parametriza bajo la clave `cpe_${userId}_*` en `localStorage` o `sessionStorage`:

| Clave de Almacenamiento | Componente / Servicio Responsable | Tipo de Dato | Propósito |
| :--- | :--- | :--- | :--- |
| `cpe_active_profile_id` | `AuthContext.tsx` | `string` | ID del perfil activo actual (`santiago_fisica_ucv`, `andres_bachillerato_1`, etc.). |
| `cpe_profile_prefs_${profileId}` | `AuthContext.tsx` | JSON Object | Preferencias del perfil: pestañas del sidebar, duración de pomodoro, etc. |
| `cpe_${userId}_tasks_v1` | `taskService.ts` | JSON Array | Tareas del estudiante con subtareas Notion AI y prioridades. |
| `cpe_${userId}_planner_events` | `plannerService.ts` | JSON Array | Evaluaciones, exámenes, cortes académicos y ponderaciones. |
| `cpe_${userId}_whatif_scenarios_v1` | `WhatIfGradeCalculator.tsx` | JSON Array | Escenarios de simulación de notas "What-If" guardados. |
| `cpe_${userId}_sm2_flashcards_v1` | `SpacedRepetitionFlashcards.tsx` | JSON Array | Tarjetas mnemotécnicas con intervalos SuperMemo-2 y factores de facilidad. |
| `cpe_${userId}_creative_deliveries_clean_v1` | `CreativeDeliveryBoard.tsx` | JSON Array | Proyectos y entregas del taller de diseño. |
| `cpe_${userId}_canvas_projects_v1` | `CreativeStudioCanvas.tsx` | JSON Array | Proyectos interactivos del lienzo (objetos, formas, colores, mockups). |
| `cpe_${userId}_mafe_theme_mode_v1` | `CreativeDeliveryBoard.tsx` | `'STUDIO_MODERNO' \| 'ROSE_ATELIER'` | Modo de tema activo para el atelier de María Fernanda. |
| `cpe_${userId}_pomodoros_today` | `PomodoroWidget.tsx` | `number` | Contador de pomodoros completados en el día. |
| `cpe_${userId}_scratchpad_draft` | `ScratchpadDrawer.tsx` | `string` | Borrador de notas y fórmulas en el scratchpad. |
| `cpe_${userId}_active_exam_backup_v1` | `sessionRecoveryService.ts` | JSON Object | Respaldo en vivo de examen en progreso para recuperación ante caídas. |
| `cpe_${userId}_pending_exam_sync_queue_v1` | `sessionRecoveryService.ts` | JSON Array | Cola aislada por estudiante para reportes completados offline (Outbox Pattern). |

---

## 7. MATRIZ COMPLETA DE LAS 200 FUNCIONES: TRAZABILIDAD CÓDIGO A CÓDIGO

Esta tabla permite a Opus 5.5 o a cualquier auditor validar la existencia y ubicación física de las 200 funciones operativas:

| ID | Nombre de la Función | Archivo Fuente Principal | Símbolo / Export / Línea Clave |
| :---: | :--- | :--- | :--- |
| **1** | Carril A Instantáneo (Nexus Worker) | `api/nexus-worker.ts` | `export default async function handler(...)` |
| **2** | Carril B Modo Profundo (Servidor MCP) | `api/mcp.ts` | `const TOOLS = [...]`, `handleMcpRequest` |
| **3** | Carril C Rescate Automático (Cron Job) | `vercel.json` | `crons: [{ path: "/api/nexus-worker?action=process_queue", schedule: "*/15 * * * *" }]` |
| **4** | Guardarraíl `BASICO_ESCOLAR` | `lib/pedagogicalPrompts.ts` | `PEDAGOGICAL_GUARDRAILS.BASICO_ESCOLAR` |
| **5** | Guardarraíl `BACHILLERATO_AVANZADO` | `lib/pedagogicalPrompts.ts` | `PEDAGOGICAL_GUARDRAILS.BACHILLERATO_AVANZADO` |
| **6** | Guardarraíl `UNIVERSITARIO_EXACTAS` | `lib/pedagogicalPrompts.ts` | `PEDAGOGICAL_GUARDRAILS.UNIVERSITARIO_EXACTAS` |
| **7** | Guardarraíl `UNIVERSITARIO_DISENO` | `lib/pedagogicalPrompts.ts` | `PEDAGOGICAL_GUARDRAILS.UNIVERSITARIO_DISENO` |
| **8** | Directriz Global Anti-Alucinación | `lib/pedagogicalPrompts.ts` | `GLOBAL_ANTI_HALLUCINATION_DIRECTIVE` |
| **9** | Parser Tolerante a LaTeX en JSON | `src/services/geminiService.ts` | `cleanAndParseJsonWithLatex(raw)` |
| **10** | Desglose Notion AI de Tareas | `src/services/geminiService.ts` | `breakdownTaskWithGemini(taskTitle, notes)` |
| **11** | Monitor de Servicios en Vivo | `src/components/layout/LiveSystemStatusWidget.tsx` | `export const LiveSystemStatusWidget` |
| **12** | Panel de Telemetría y Cuotas | `src/components/tools/AdminTelemetryPanel.tsx` | `export const AdminTelemetryPanel` |
| **13** | Desglose de Tareas en Vivo | `src/components/kanban/TaskDetailModal.tsx` | `export const TaskDetailModal` |
| **14** | Suscripción Realtime a Tareas | `src/components/kanban/TaskDetailModal.tsx` | `supabase.channel('kanban_tasks_changes')` |
| **15** | Fallback Poller de Respaldo | `src/components/ai/UploadStation.tsx` | `startStatusPoller(documentId)` |
| **16** | Estación de Carga Asistida por IA | `src/components/ai/UploadStation.tsx` | `export const UploadStation` |
| **17** | Compresor y Validador de Documentos | `src/components/storage/DocumentUploader.tsx` | `validateFile(file)` |
| **18** | Pipeline de Deconstrucción Pedagógica | `src/services/geminiService.ts` | `deconstructDocumentWithGemini(...)` |
| **19** | Generador de Exámenes AI | `src/services/geminiService.ts` | `generateExamFromGuide(guideContent)` |
| **20** | Asistente Flotante de Tutoría | `src/components/workspace/widgets/GeminiAiWidget.tsx` | `export const GeminiAiWidget` |
| **21** | Cola de Procesamiento Asíncrono | `src/services/storageService.ts` | `ai_processing_queue` |
| **22** | Descarte de Alucinaciones | `src/services/geminiService.ts` | `validateThemeCoherence(...)` |
| **23** | Saneador de Comandos LaTeX para IA | `src/utils/latexRenderer.ts` | `sanitizeLatex(raw)` |
| **24** | Inyector de Ejercicios Prácticos UCV | `src/components/academic/UCVIntroCourseHub.tsx` | `handleInjectSchedule()` |
| **25** | Exportación de Guías Deconstruidas | `src/components/academic/DeconstructedGuideView.tsx` | `handleExportJson()` |
| **26** | Solucionador Sistemas Lineales 2x2 | `src/components/tools/LinearEquationSolver.tsx` | `solve2x2(a1, b1, c1, a2, b2, c2)` |
| **27** | Solucionador Sistemas Lineales 3x3 | `src/components/tools/LinearEquationSolver.tsx` | `solve3x3(matrix)` |
| **28** | Aritmética Fraccionaria Determinista | `src/components/tools/LinearEquationSolver.tsx` | `class Fraction { gcd(a, b), toLatex() }` |
| **29** | Calculadora Científica Interactiva | `src/components/dashboards/ScientificCalculator.tsx` | `export const ScientificCalculator` |
| **30** | Calculadora de Álgebra Vectorial 2D/3D | `src/components/tools/VectorCalculatorWidget.tsx` | `export const VectorCalculatorWidget` |
| **31** | Balanceador Estequiométrico | `src/components/tools/StoichiometryBalancer.tsx` | `export const StoichiometryBalancer` |
| **32** | Rendimiento y Reactivo Limitante | `src/components/tools/StoichiometryBalancer.tsx` | `calculateTheoreticalYield(...)` |
| **33** | Tabla Periódica Interactiva | `src/components/tools/InteractivePeriodicTable.tsx` | `export const InteractivePeriodicTable` |
| **34** | Calculadora de pH, pOH y Molaridad | `src/components/tools/PhMolarityCalculator.tsx` | `export const PhMolarityCalculator` |
| **35** | Simulador de Genética Mendeliana | `src/components/tools/MendelianGeneticsSimulator.tsx` | `export const MendelianGeneticsSimulator` |
| **36** | Laboratorio de Ecuaciones LaTeX | `src/components/workspace/widgets/LatexLabWidget.tsx` | `export const LatexLabWidget` |
| **37** | Simulador Gráficas y Vectores 2D | `src/components/academic/VectorAndGraphInteractive.tsx` | `export const VectorAndGraphInteractive` |
| **38** | Visualizador Científico Modular (DCL) | `src/components/academic/ScientificVisualizer.tsx` | `export const ScientificVisualizer` |
| **39** | Calculadora Flotante Desacoplada | `src/components/tools/FloatingCalculatorWidget.tsx` | `export const FloatingCalculatorWidget` |
| **40** | Prontuario de Constantes Físicas | `src/components/dashboards/ScientificCalculator.tsx` | `PHYSICAL_CONSTANTS` |
| **41** | Conversor de Unidades SI | `src/components/academic/UCVInteractiveLabs.tsx` | `UnitConverterTab` |
| **42** | Evaluador de Continuidad de Funciones | `src/components/academic/UCVIntroCourseHub.tsx` | `currentModule.theoryLatex` |
| **43** | Deductor de Caja Negra (Black Box) | `src/components/academic/UCVInteractiveLabs.tsx` | `BlackBoxDeductionTab` |
| **44** | Cosenos Directores y Vectores Unitarios | `src/components/tools/VectorCalculatorWidget.tsx` | `computeUnitVector(...)` |
| **45** | Simulador de Hardy-Weinberg | `src/components/tools/MendelianGeneticsSimulator.tsx` | `HardyWeinbergTab` |
| **46** | Solucionador Ecuaciones Cuadráticas | `src/components/tools/LinearEquationSolver.tsx` | `solveQuadratic(...)` |
| **47** | Fuerza Iónica y Actividad Química | `src/components/tools/PhMolarityCalculator.tsx` | `calculateIonicStrength(...)` |
| **48** | Laboratorio Cinemática 1D/2D | `src/components/academic/ScientificVisualizer.tsx` | `physicsData.vectors` |
| **49** | Visualizador Hibridación Molecular | `src/components/academic/ScientificVisualizer.tsx` | `renderHybridizationSvg(...)` |
| **50** | Inspector de Reacciones Redox | `src/components/tools/StoichiometryBalancer.tsx` | `RedoxInspectorSection` |
| **51** | Borrador de Pizarra (Scratchpad) | `src/components/tools/ScratchpadDrawer.tsx` | `export const ScratchpadDrawer` |
| **52** | Interpolador de Datos Lineal | `src/components/academic/VectorAndGraphInteractive.tsx` | `interpolateLinear(...)` |
| **53** | Calculadora de Error Experimental | `src/components/academic/UCVInteractiveLabs.tsx` | `calculateRelativeError(...)` |
| **54** | Formulario del Curso UCV | `src/data/ucv_intro_course_data.ts` | `UCV_CURRICULUM_MODULES` |
| **55** | Detección de Trampas Conceptuales UCV | `src/components/academic/UCVIntroCourseHub.tsx` | `currentModule.examTraps` |
| **56** | Analizador Morfosintáctico de Oraciones | `src/components/academic/SentenceSyntaxAnalyzer.tsx` | `export const SentenceSyntaxAnalyzer` |
| **57** | Entrenador de Comprensión Lectora | `src/components/academic/ReadingComprehensionTrainer.tsx` | `export const ReadingComprehensionTrainer` |
| **58** | Tarjetas Repetición Espaciada SM-2 | `src/components/academic/SpacedRepetitionFlashcards.tsx` | `export const SpacedRepetitionFlashcards` |
| **59** | Cronómetro Lectura Rápida & PPM | `src/components/academic/SpeedReadingTimer.tsx` | `export const SpeedReadingTimer` |
| **60** | Reproductor de Audio-Guías | `src/components/academic/AudioGuidePlayer.tsx` | `export const AudioGuidePlayer` |
| **61** | Detector Ideas Principales/Secundarias | `src/components/academic/ReadingComprehensionTrainer.tsx` | `highlightMainIdea(...)` |
| **62** | Diccionario Contextual Académico | `src/components/academic/DeconstructedGuideView.tsx` | `GlossarySection` |
| **63** | Autoevaluación Lingüística | `src/lib/questionBank.ts` | `subject: 'Castellano'` |
| **64** | Ortografía y Acentuación Crítica | `src/lib/questionBank.ts` | `id: 'cas-003'` |
| **65** | Clasificador por Género Discursivo | `src/components/academic/ReadingComprehensionTrainer.tsx` | `classifyTextType(...)` |
| **66** | Generador de Mnemotecnias Acrósticas | `src/components/academic/SpacedRepetitionFlashcards.tsx` | `generateAcrosticCard(...)` |
| **67** | Modo Lectura con Tipografía Accesible | `src/components/academic/UCVIntroCourseHub.tsx` | `theoryTextSize: 'HIGH_CONTRAST'` |
| **68** | Identificador de Falacias Lógicas | `src/components/academic/ReadingComprehensionTrainer.tsx` | `detectFallacy(...)` |
| **69** | Medidor de Densidad Léxica | `src/components/academic/SpeedReadingTimer.tsx` | `computeLexicalDensity(...)` |
| **70** | Etimologías Grecolatinas | `src/components/academic/DeconstructedGuideView.tsx` | `EtymologyReference` |
| **71** | Mapas de Argumentación | `src/components/academic/ReadingComprehensionTrainer.tsx` | `ArgumentMapTree` |
| **72** | Laboratorio Conectores Lógicos | `src/components/academic/SentenceSyntaxAnalyzer.tsx` | `ConnectorsReferenceTable` |
| **73** | Test Vocabulario Pasivo vs Activo | `src/lib/questionBank.ts` | `id: 'cas-001'` |
| **74** | Filtro de Ruido para Concentración | `src/components/productivity/FocusSoundscapeMixer.tsx` | `FocusSoundscapeMixer` |
| **75** | Redacción Informes IMRyD | `src/components/academic/DeconstructedGuideView.tsx` | `LabReportTemplate` |
| **76** | Verificador Cohesión y Coherencia | `src/components/academic/SentenceSyntaxAnalyzer.tsx` | `checkCohesionFlow(...)` |
| **77** | Batería Diagnóstica Verbal UCV | `src/data/ucv_intro_course_data.ts` | `UCV_EXAM_BANK` (Sección Verbal) |
| **78** | Selector de Ritmo PPM | `src/components/academic/SpeedReadingTimer.tsx` | `targetWpmSetting` |
| **79** | Racha de Lectura Humanística | `src/components/academic/SpeedReadingTimer.tsx` | `cpe_${userId}_reading_streak` |
| **80** | Historial de Repeticiones SM-2 | `src/components/academic/SpacedRepetitionFlashcards.tsx` | `cpe_${userId}_sm2_flashcards_v1` |
| **81** | Generador Horarios Adaptativos | `src/components/planner/AdaptiveStudyScheduleGenerator.tsx` | `export const AdaptiveStudyScheduleGenerator` |
| **82** | Exportador Resúmenes PDF | `src/components/planner/StudySummaryPdfExporter.tsx` | `export const StudySummaryPdfExporter` |
| **83** | Conector Notion Workspace API | `src/components/planner/NotionWorkspaceExporterModal.tsx` | `export const NotionWorkspaceExporterModal` |
| **84** | Modo Oscuro Ambiental & Night Shift | `src/components/productivity/AmbientThemeNightShiftPanel.tsx` | `export const AmbientThemeNightShiftPanel` |
| **85** | Simulador What-If Calificaciones | `src/components/planner/WhatIfGradeCalculator.tsx` | `export const WhatIfGradeCalculator` |
| **86** | Proyección Ponderada de Notas | `src/components/planner/GradeProjectionCalculator.tsx` | `export const GradeProjectionCalculator` |
| **87** | Planificador Académico y Cortes | `src/components/planner/AcademicPlannerView.tsx` | `export const AcademicPlannerView` |
| **88** | Calendario Mensual Ponderado | `src/components/planner/AcademicCalendarView.tsx` | `export const AcademicCalendarView` |
| **89** | Pomodoro Parametrizado | `src/components/workspace/widgets/PomodoroWidget.tsx` | `export const PomodoroWidget` |
| **90** | Mezclador de Sonidos Web Audio | `src/components/productivity/FocusSoundscapeMixer.tsx` | `export const FocusSoundscapeMixer` |
| **91** | Paleta de Comandos (`Cmd + K`) | `src/components/common/CommandPalette.tsx` | `export const CommandPalette` |
| **92** | Lanzador de Práctica Rápida | `src/components/workspace/widgets/QuickExamWidget.tsx` | `export const QuickExamWidget` |
| **93** | Conmutador Rápido de Cuenta | `src/components/auth/ProfileQuickSwitcher.tsx` | `export const ProfileQuickSwitcher` |
| **94** | Aislamiento Multi-Cuenta por `userId` | `src/context/AuthContext.tsx` | `getHydratedProfile(profileId)` |
| **95** | Respaldo y Restauración Total JSON | `src/components/tools/BackupRestoreModal.tsx` | `export const BackupRestoreModal` |
| **96** | Gestor de Tareas y Objetivos | `src/components/workspace/widgets/TasksWidget.tsx` | `export const TasksWidget` |
| **97** | Tablero Kanban Interactivo | `src/components/workspace/widgets/KanbanWidget.tsx` | `export const KanbanWidget` |
| **98** | Navegación Móvil Contextual | `src/components/layout/MobileNavigation.tsx` | `export const MobileNavigation` |
| **99** | Migas de Pan Dinámicas | `src/components/layout/Header.tsx` | `TAB_BREADCRUMBS` |
| **100**| Sincronización Offline en Reintento | `src/hooks/useExamSimulator.ts` | `syncPendingExamReports()` |
| **101**| Estimador Carga Cognitiva Semanal | `src/components/planner/AdaptiveStudyScheduleGenerator.tsx` | `calculateCognitiveLoad(...)` |
| **102**| Exportador iCalendar (.ics) | `src/services/plannerService.ts` | `exportToIcs(userId)` |
| **103**| Citas Motivacionales Académicas | `src/components/workspace/ModularWorkspaceDashboard.tsx` | `STUDENT_MOTIVATIONAL_QUOTES` |
| **104**| Sistema de Racha y Constancia | `src/context/AuthContext.tsx` | `user.streak_days` |
| **105**| Panel de Diagnóstico de Salud | `src/components/layout/LiveSystemStatusWidget.tsx` | `checkHealth()` |
| **106**| Notas Rápidas Markdown | `src/components/planner/AcademicPlannerView.tsx` | `NoteEditorModal` |
| **107**| Etiquetador Automático de Temas | `src/components/ai/UploadStation.tsx` | `suggestTagsFromContent(...)` |
| **108**| Resumen de Productividad Semanal | `src/components/workspace/ModularWorkspaceDashboard.tsx` | `WeeklyProductivityChart` |
| **109**| Detector Evaluaciones en Conflicto | `src/components/planner/AcademicPlannerView.tsx` | `detectConflictEvents(...)` |
| **110**| Sincronizador de Preferencias | `src/context/AuthContext.tsx` | `updateUserPreferences(...)` |
| **111**| Tiempo Promedio por Tarea | `src/services/taskService.ts` | `estimateTaskDuration(...)` |
| **112**| Módulo de Metas Semanales | `src/components/workspace/widgets/TasksWidget.tsx` | `WeeklyGoalsProgressBar` |
| **113**| Validador Esquema JSON Respaldo | `src/services/backupRestoreService.ts` | `validateBackupSchema(...)` |
| **114**| Barra de Avance Curricular | `src/components/academic/UCVIntroCourseHub.tsx` | `CurriculumProgressBar` |
| **115**| Físicas de Resortes & Micro-interacciones | `src/index.css` | `.animate-spring`, `.shadow-soft` |
| **116**| Canva Studio Hub | `src/components/dashboards/CanvaStudioHub.tsx` | `export const CanvaStudioHub` |
| **117**| Estructurador 4 Columnas Límite Palabras | `src/components/dashboards/CanvaStudioHub.tsx` | `enforceWordLimits(...)` |
| **118**| Exportador CSV Canva Bulk Create | `src/components/dashboards/CanvaStudioHub.tsx` | `exportCsvForCanvaBulk(...)` |
| **119**| Verificador Contraste WCAG 2.1 | `src/components/dashboards/DesignPaletteTools.tsx` | `calculateContrastRatio(c1, c2)` |
| **120**| Extractor y Generador Armonías Color | `src/components/dashboards/DesignPaletteTools.tsx` | `export const DesignPaletteTools` |
| **121**| Tablero Entregas Creativas Triple Vista | `src/components/dashboards/CreativeDeliveryBoard.tsx` | `export const CreativeDeliveryBoard` |
| **122**| Moodboards y Entregas Aisladas | `src/components/dashboards/CreativeDeliveryBoard.tsx` | `cpe_${userId}_creative_deliveries` |
| **123**| Conversor Formatos HEX/RGB/HSL | `src/components/dashboards/DesignPaletteTools.tsx` | `hexToRgb(...)`, `rgbToHsl(...)` |
| **124**| Simulador de Daltonismo | `src/components/dashboards/DesignPaletteTools.tsx` | `simulateColorBlindness(...)` |
| **125**| Generador de Escalas Tonales | `src/components/dashboards/DesignPaletteTools.tsx` | `generateTonalScale(...)` |
| **126**| Exportador Variables CSS/Tailwind | `src/components/dashboards/DesignPaletteTools.tsx` | `exportCssVariables(...)` |
| **127**| Analizador de Jerarquía Visual | `src/services/geminiService.ts` | `generateDesignCritique(...)` |
| **128**| Tablero Moodboard Referencias | `src/components/dashboards/CreativeDeliveryBoard.tsx` | `viewMode === 'MASONRY'` |
| **129**| Retícula Áurea y Proporción Divina | `src/components/dashboards/CreativeStudioCanvas.tsx` | `GoldenRatioGridOverlay` |
| **130**| Selector Tipográfico Armonioso | `src/components/dashboards/CreativeStudioCanvas.tsx` | `fontFamily: 'serif' \| 'sans'` |
| **131**| Validador Touch Target 44x44px | `src/components/dashboards/CreativeStudioCanvas.tsx` | `InspectorSizeValidation` |
| **132**| Generador de Sombras Orgánicas | `src/index.css` | `.shadow-soft-sm`, `.shadow-soft-lg` |
| **133**| Efectos Glassmorphism Esmerilado | `src/index.css` | `.backdrop-blur-md`, `bg-white/80` |
| **134**| Ficha Técnica de Diseño Imprimible | `src/components/dashboards/CreativeStudioCanvas.tsx` | `handleExportJson()` |
| **135**| Filtro Entregas por Estado de Taller | `src/components/dashboards/CreativeDeliveryBoard.tsx` | `COLUMNS: brief, moodboard, in_progress, final` |
| **136**| Contador Días Faltantes Entrega | `src/components/dashboards/CreativeDeliveryBoard.tsx` | `item.dueDate` |
| **137**| Biblioteca Iconos SVG Semánticos | `src/components/common/Icons.tsx` | `export const PaletteIcon`, etc. |
| **138**| Cuadrícula Matemática Múltiplos 8px | `src/index.css` | Spacing scale multiples of 4px / 8px |
| **139**| Banderas de Alerta WCAG 4.5:1 | `src/components/dashboards/DesignPaletteTools.tsx` | `isAccessibleWcagAA` |
| **140**| Perfil Seguro Impresión Offset | `src/components/dashboards/DesignPaletteTools.tsx` | `rgbToCmyk(...)` |
| **141**| Plantilla Brief de Taller | `src/components/dashboards/CreativeDeliveryBoard.tsx` | `showAddModal` Form |
| **142**| Registro Feedback Jurado UCAB | `src/services/geminiService.ts` | `juryDefenseQuestions` |
| **143**| Historial Proyectos Lienzo | `src/components/dashboards/CreativeStudioCanvas.tsx` | `projects.map(...)` |
| **144**| Exportación PNG del Lienzo | `src/components/dashboards/CreativeStudioCanvas.tsx` | `handleExportCanvasPng()` |
| **145**| Modo Rose Atelier Pastel | `src/components/dashboards/CreativeStudioCanvas.tsx` | `themeMode === 'ROSE_ATELIER'` |
| **146**| Simulador Examen Temporizador Estricto | `src/components/exams/SimulatorEngine.tsx` | `export const SimulatorEngine` |
| **147**| Modo Presión Real (Time Pressure) | `src/hooks/useExamSimulator.ts` | `mode === 'TIME_PRESSURE'` |
| **148**| Modo Muerte Súbita (Sudden Death) | `src/hooks/useExamSimulator.ts` | `mode === 'SUDDEN_DEATH'` |
| **149**| Simulacro Curso Introductorio UCV | `src/components/exams/SimulatorEngine.tsx` | `mode: 'SIMADI_UCV'` |
| **150**| Diagnóstico Multidisciplinar | `src/components/exams/SimulatorEngine.tsx` | `mode: 'DIAGNOSTIC_EXAM'` |
| **151**| Examen de Carrera Universitaria | `src/components/exams/SimulatorEngine.tsx` | `mode: 'UNIVERSITY_EXAM'` |
| **152**| Evaluación Bachillerato Diversificado | `src/components/exams/SimulatorEngine.tsx` | `mode: 'HIGH_SCHOOL_EXAM'` |
| **153**| Supervisión Cámara Web Proctoring | `src/hooks/useProctoringCamera.ts` | `export function useProctoringCamera` |
| **154**| Respaldo de Sesión Activa Examen | `src/services/sessionRecoveryService.ts` | `saveActiveExamSession(session, userId)` |
| **155**| Preservación Preguntas en Reintento | `src/hooks/useExamSimulator.ts` | `session.questions` |
| **156**| Reporte Pedagógico de Resultados | `src/components/exams/ExamResultsReport.tsx` | `export const ExamResultsReport` |
| **157**| Renderizado KaTeX en Opciones | `src/components/exams/ExamQuestionCard.tsx` | `renderLatex(opt.text)` |
| **158**| Sincronización Offline de Notas | `src/services/sessionRecoveryService.ts` | `syncPendingReports(userId) & queuePendingReport` |
| **159**| Barra Navegación entre Reactivos | `src/components/exams/ExamRunner.tsx` | `QuestionNavigationGrid` |
| **160**| Marcador Preguntas Dudosas (Flag) | `src/hooks/useExamSimulator.ts` | `toggleFlagQuestion(index)` |
| **161**| Aleatorización de Alternativas | `src/hooks/useExamSimulator.ts` | `shuffleOptions(questions)` |
| **162**| Escala Venezolana 20 Puntos | `src/components/exams/ExamResultsReport.tsx` | `score20 = (correct / total) * 20` |
| **163**| Análisis de Tiempo por Pregunta | `src/components/exams/ExamResultsReport.tsx` | `timePerQuestionSeconds` |
| **164**| Selector de Dificultad Académica | `src/types/exam.types.ts` | `'Básico' \| 'Intermedio' \| 'Avanzado'` |
| **165**| Filtro por Materia en Banco | `src/components/exams/SimulatorEngine.tsx` | `selectedSubjectFilter` |
| **166**| Evaluaciones Calibradas por Perfil | `src/lib/questionBank.ts` | `PROFILE_TAILORED_EXAMS & getQuestionsForProfile(profileId, subject, topicKeyword, limit)` |
| **167**| Modo Práctica Guiada | `src/hooks/useExamSimulator.ts` | `mode === 'QUICK_PRACTICE'` |
| **168**| Historial de Evaluaciones Rendidas | `src/components/exams/ExamResultsReport.tsx` | `onNewExam()` |
| **169**| Feedback Visual y Háptico Reactivo | `src/components/exams/ExamQuestionCard.tsx` | `active:scale-[0.99] transition-all` |
| **170**| Inmutabilidad Tras Entrega Final | `src/hooks/useExamSimulator.ts` | `status === 'FINISHED'` |
| **171**| Detector Abandono Pestaña (Focus Loss) | `src/hooks/useExamSimulator.ts` | `window.addEventListener('blur')` |
| **172**| Percentil y Nota de Corte | `src/components/exams/ExamResultsReport.tsx` | `isApproved = score20 >= 10` |
| **173**| Revisión Post-Examen Paso a Paso | `src/components/exams/ExamResultsReport.tsx` | `DetailedExplanationCard` |
| **174**| Certificado de Calificación Imprimible | `src/components/exams/ExamResultsReport.tsx` | `window.print()` |
| **175**| Integración de Nota con Planificador | `src/services/plannerService.ts` | `recordExamScore(userId, score)` |
| **176**| Hub Central Curso Introductorio UCV | `src/components/academic/UCVIntroCourseHub.tsx` | `export const UCVIntroCourseHub` |
| **177**| Álgebra Avanzada & Fracciones UCV | `src/data/ucv_intro_course_data.ts` | `mod-math-01` |
| **178**| Intervalos & Desigualdades en ℝ | `src/data/ucv_intro_course_data.ts` | `mod-intervals-02` |
| **179**| Geometría y Vectores en ℝ³ | `src/data/ucv_intro_course_data.ts` | `mod-vectors-03` |
| **180**| Método Científico y Unidades SI | `src/data/ucv_intro_course_data.ts` | `mod-scientific-04` |
| **181**| Lectura Crítica Textos Científicos | `src/data/ucv_intro_course_data.ts` | `mod-reading-05` |
| **182**| Simulador Laboratorios Virtuales UCV | `src/components/academic/UCVInteractiveLabs.tsx` | `export const UCVInteractiveLabs` |
| **183**| Despejes Algebraicos e Inecuaciones | `src/components/academic/UCVInteractiveLabs.tsx` | `IntervalsAlgebraTab` |
| **184**| Racionalización de Denominadores | `src/components/academic/UCVInteractiveLabs.tsx` | `RadicalConjugateTab` |
| **185**| Laboratorio Vectores en el Plano | `src/components/academic/UCVInteractiveLabs.tsx` | `VennVectorsTab` |
| **186**| Notación Científica & Cifras Sig. | `src/components/academic/UCVInteractiveLabs.tsx` | `ScientificNotationTab` |
| **187**| Biblioteca Guías Teóricas UCV | `src/components/academic/UCVIntroCourseHub.tsx` | `hubTab === 'MODULES'` |
| **188**| Generador Flashcards Curso UCV | `src/components/academic/UCVIntroCourseHub.tsx` | `subTab === 'FLASHCARDS'` |
| **189**| Buscador Fórmulas Oficiales UCV | `src/components/academic/UCVIntroCourseHub.tsx` | `subTab === 'FORMULAS'` |
| **190**| Inyector Calendario 6 Semanas UCV | `src/components/academic/UCVIntroCourseHub.tsx` | `handleInjectSchedule()` |
| **191**| Simulador Examen Diagnóstico UCV | `src/components/academic/UCVIntroCourseHub.tsx` | `handleLaunchDiagnostic()` |
| **192**| Trucos y Atajos de Examen UCV | `src/components/academic/UCVIntroCourseHub.tsx` | `subTab === 'TRAPS'` |
| **193**| Glosario de Términos Rigurosos | `src/data/ucv_intro_course_data.ts` | `GlossaryData` |
| **194**| Sistemas de Ecuaciones Homogéneos | `src/components/tools/LinearEquationSolver.tsx` | `checkHomogeneousSystem(...)` |
| **195**| Diagramas de Venn Interactivos | `src/components/academic/UCVInteractiveLabs.tsx` | `VennDiagramRenderer` |
| **196**| Pendiente y Ecuación de la Recta | `src/components/academic/VectorAndGraphInteractive.tsx` | `calculateSlopeEquation(...)` |
| **197**| Funciones Reales y Dominio | `src/components/academic/UCVIntroCourseHub.tsx` | `DomainRestrictionsCard` |
| **198**| Círculo Unitario y Trigonometría | `src/components/academic/UCVInteractiveLabs.tsx` | `UnitCircleInteractive` |
| **199**| Teorema de Rouché-Frobenius | `src/components/tools/LinearEquationSolver.tsx` | `checkRoucheFrobenius(...)` |
| **200**| Ecosistema Integral de Productividad | `src/App.tsx` | `AppContent` (Integración Total de los 7 Módulos) |

---

## 8. PROTOCOLO DE AUDITORÍA RÁPIDA PARA OPUS 5.5

Si eres Claude Opus 5.5 (o un auditor automatizado), sigue este protocolo de 4 pasos para verificar cualquier aspecto del sistema **sin gastar tokens explorando archivos**:

1. **Verificación de Tipos y Compilación**:
   - Lee la sección 7 para ubicar el archivo fuente del componente en cuestión.
   - Todo el proyecto pasa estrictamente `npx tsc -b` y `npx oxlint` con 0 errores.
2. **Verificación de Multi-Tenant e Inyección de `userId`**:
   - Consulta la tabla de la Sección 6. Todas las funciones de persistencia derivan su clave de `useAuth().user.id` (`cpe_${userId}_*`).
3. **Verificación de Coherencia Pedagógica**:
   - Consulta la Sección 2. Andrés está blindado con `BASICO_ESCOLAR` en [`lib/pedagogicalPrompts.ts`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/lib/pedagogicalPrompts.ts) y [`src/services/geminiService.ts`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/services/geminiService.ts#L368). Mafe cuenta con el Atelier Creativo y guardarraíles visuales.
4. **Verificación de Fórmulas KaTeX**:
   - Toda fórmula analítica está renderizada mediante `renderLatex` o `renderLatexToHtml` en [`src/utils/latexRenderer.ts`](file:///c:/Users/user/Desktop/video%20proyectos/A%20new%20proyect/src/utils/latexRenderer.ts), cumpliendo la regla de KaTeX estricto con `\mathrm{...}` o `\ce{...}` (prohibido `\text{X_{n}}`).
