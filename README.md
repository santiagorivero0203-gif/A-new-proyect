# Centro de Productividad Estudiantil (CPE) ⚡
> Ecosistema Académico Adaptativo y Multi-Perfil evolucionado del motor **Simulación Simadi**.

---

## 🏛️ Arquitectura de Software (Fase 1: Andamiaje, Autenticación y Layout Dinámico)

Este proyecto ha sido diseñado bajo una arquitectura modular y escalable, preparada para soportar múltiples perfiles de estudio, un motor de evaluaciones cronometradas (Simadi), almacenamiento en la nube (Supabase Storage) y procesamiento de documentos mediante inteligencia artificial (Google Gemini API).

### 🧩 1. Los Cuatro Perfiles de Estudio Especializados
El sistema cuenta con un **Enrutador Inteligente (`DashboardRouter`)** que lee el campo `academic_profile` del usuario autenticado y monta dinámicamente un espacio de trabajo único:

1. **Andrés (1er año de bachillerato - `andres_bachillerato_1`):**
   - Interfaz amigable y gamificada orientada a construir hábitos.
   - Medidor de progreso y XP (*Explorador Nivel 3*), rachas con animaciones de recompensa (*confetti*).
   - Técnicas de estudio básicas: *Método Feynman para principiantes*, *Pomodoro Joven (20/5)* y *Regla de los 2 Minutos*.
   - Módulo de transición: *De maestro único a 9 profesores*.

2. **Prima (5to año de bachillerato / Pre-Universitario - `prima_bachillerato_5`):**
   - Modo de alta intensidad para ingreso universitario (OPSU, UCV, UCAB).
   - Cronómetro de Productividad Pomodoro 50/10 interactivo.
   - Conexión lista con el banco de evaluaciones heredado de **Simulación Simadi**.
   - Métricas de rendimiento histórico en percentil superior.

3. **Santiago (Ingreso a Física en la UCV - `santiago_fisica_ucv`):**
   - Panel analítico oscuro con rigor matemático.
   - Renderizado nativo ultrarrápido de fórmulas complejas en **LaTeX** con **KaTeX**.
   - Calculadora científica de alta precisión permanentemente integrada en la interfaz (trigonometría, logaritmos, potencias, constantes universales $c, h, \hbar, G, e, \varepsilon_0$).
   - Laboratorio interactivo de sintaxis LaTeX con previsualización en tiempo real.

4. **María Fernanda (Diseño Integral en la UCAB - `mafe_diseno_ucab`):**
   - Entorno visual tipo canvas / Pinterest / Kanban.
   - Gestor de paletas cromáticas con copia táctil de valores hexadecimales al portapapeles.
   - Tablero de entregas por fases (*Brief*, *Moodboard*, *En Proceso*, *Entrega Final*).
   - Muro de referencias estéticas y proporciones dinámicas.

---

## 🎨 Sistema de Diseño (Reglas de Diseño)
- **Acento Primario:** **Azul Cobalto Puro (`#0047AB`)** con variantes eléctricas (`#2D72F9`) y matices de brillo (`glow`).
- **Filosofía "Menos, pero Mejor":** Cada elemento tiene propósito funcional; espacios de respiración amplios y orden matemático en múltiplos de 4px/8px/16px.
- **Glassmorphism Refinado:** Fondos oscuros editoriales (`surface-950`) combinados con tarjetas translúcidas (`backdrop-blur-md` y bordes sutiles de baja opacidad).
- **Iconografía Vectorial:** Generada bajo especificaciones semánticas estrictas (`currentColor`, `strokeWidth="2"`, viewBox `24x24`).

---

## 🗄️ Esquema de Base de Datos en Supabase (PostgreSQL)

El archivo [`supabase/schema.sql`](supabase/schema.sql) contiene la infraestructura relacional lista para ejecutar en el SQL Editor de Supabase:

- **`public.profiles`**: Vinculada a `auth.users(id)` mediante clave foránea en cascada, con campo `academic_profile`, metas, puntos XP, racha y preferencias en formato `jsonb`.
- **`public.user_documents`**: Preparada para futuras fases de carga de archivos (PDFs, fotos de pizarras) y almacenamiento de resúmenes generados por **Gemini AI** (`ai_summary`, `ai_analysis`).
- **`public.exam_results`**: Historial de simulacros con desglose de aciertos por área (`breakdown`), tiempo empleado y respuestas enviadas.
- **`public.study_sessions`**: Registro de cronómetros y sesiones de enfoque.
- **Row Level Security (RLS)**: Activado con políticas restrictivas donde cada estudiante solo puede consultar y modificar sus propios datos (`auth.uid() = user_id`).
- **Trigger `on_auth_user_created`**: Inserta automáticamente el registro en `profiles` con los datos del usuario recién registrado en `auth.users`.

---

## 🛠️ Estructura del Código

```
├── supabase/
│   └── schema.sql                  # Script SQL completo para Supabase (tablas, RLS, triggers)
├── src/
│   ├── components/
│   │   ├── auth/                   # Modal de login/registro y selector rápido de perfiles demo
│   │   ├── common/                 # Componentes reutilizables e iconografía SVG
│   │   ├── dashboards/             # Dashboards especializados por perfil académico
│   │   │   ├── AndresDashboard.tsx
│   │   │   ├── PrimaDashboard.tsx
│   │   │   ├── SantiagoDashboard.tsx
│   │   │   ├── MafeDashboard.tsx
│   │   │   ├── ScientificCalculator.tsx
│   │   │   └── DashboardRouter.tsx # Enrutador condicional inteligente
│   │   └── layout/                 # Layout maestro, Header, Sidebar y MobileNavigation
│   ├── context/
│   │   └── AuthContext.tsx         # Gestión de sesión, estado de perfil y mock demo switcher
│   ├── lib/
│   │   ├── supabase.ts             # Cliente de Supabase con detección automática live/demo
│   │   └── mockData.ts             # Datos enriquecidos de prueba para los 4 perfiles
│   ├── types/
│   │   ├── database.types.ts       # Tipado estricto que mapea Supabase PostgreSQL
│   │   └── index.ts                # Modelos de TypeScript de la aplicación
│   ├── utils/
│   │   └── latexRenderer.ts        # Renderizador seguro de fórmulas KaTeX
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                   # Tailwind CSS + tokens de Azul Cobalto y Glassmorphism
```

---

## 🚀 Puesta en Marcha Local

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abrir en el navegador:
   `http://localhost:5174/`

*(Opcional)* Configurar Supabase:
Copia `.env.example` a `.env` y agrega tu `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`. Si no configuras las variables, la app funciona de inmediato en modo **Demo Interactivo con Switcher de Perfiles**.
