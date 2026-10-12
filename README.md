# Centro de Productividad Estudiantil (CPE) ⚡
> Ecosistema Académico Adaptativo con Estética Clara Profesional (**Invoficlib Style / Apple-like**) y Motor Unificado de Productividad.

---

## 🏛️ Arquitectura de la Solución

El proyecto ha sido rediseñado atendiendo a los nuevos requerimientos funcionales y estéticos:

### 1. Estética Clara y Profesional (Invoficlib / Apple-like)
- **Fondo General:** Gris claro refinado (`#f5f5f7`), permitiendo respirar al contenido y reduciendo la fatiga visual.
- **Tarjetas:** Blanco puro (`#ffffff`), con bordes ultra-sutiles (`border-slate-200/80`), esquinas redondeadas generosas (`rounded-2xl` y `rounded-3xl`) y sombras difusas (`shadow-soft`).
- **Tipografía Editorial:** Encabezados en **Outfit** y cuerpo de texto en **Inter**, con color carbón oscuro (`#1d1d1f`).
- **Acentos Funcionales:** Azul tecnológico (`#0071e3` / `#0047AB`) para interacciones primarias, complementado con pasteles armónicos para materias académicas.

---

### 2. Motor Unificado de Productividad (Común para Todos los Estudiantes)
Todos los perfiles comparten la misma suite central de productividad:
- **Gestor de Tareas & Recordatorios:** Creación de tareas con prioridades (*Alta, Media, Baja*), asignación de materias y fechas límite.
- **Temporizador Pomodoro Integrado:** Modos de 25 min (Estándar), 50 min (Alta Intensidad) y 5 min (Descanso) con contador numérico y registro de hábitos.
- **Métricas de Rendimiento:** Contador de rachas de estudio con fuegos, puntos de experiencia (XP) y tareas completadas del día.

---

### 3. Sistema de Guías de Estudio y Ejercicios (Diferenciado por Nivel)
Se estructuró el catálogo de asignaturas solicitadas:
- **Castellano:** Morfosintaxis de la oración para bachillerato y razonamiento verbal / analogías semánticas para admisión OPSU/UCV.
- **Biología:** Estructura celular (procariota vs. eucariota) y genética mendeliana con ácidos nucleicos.
- **Química:** Nomenclatura, estequiometría y ley de conservación de masa de Lavoisier.
- **Física Básica & Avanzada:** Cinemática unidimensional (MRU/MRUV) y mecánica hamiltoniana en espacio de fase.
- **Matemática Básica:** Operaciones con fracciones, proporciones y ecuaciones lineales de 1er grado.
- **Matemática Avanzada (Vectores & Gráficas Interactivas):**
  - **Módulo Interactivo en SVG:** Representación de vectores 2D $\vec{u}$ y $\vec{v}$, cálculo en tiempo real de norma euclidiana $||\vec{u}||$, producto escalar $\vec{u} \cdot \vec{v}$, ángulo $\theta$ y vector suma resultante $\vec{u} + \vec{v}$.
  - **Graficador de Funciones:** Curvas polinómicas cuadráticas, cúbicas y funciones trigonométricas con renderizado matemático en KaTeX.

---

### 4. Herramientas Desacopladas y Ajustes (`ToolsAndSettingsView`)
La **Calculadora Científica** ya no satura el panel principal; ahora reside en un módulo independiente de **Herramientas & Ajustes**, junto con:
- Prontuario de Constantes Físicas Universales ($c, h, \hbar, G, e, \varepsilon_0$) con botón de copia rápida.
- Selector de duración de bloques Pomodoro y alertas sonoras.
- Indicador de estado de conexión con Supabase.

---

## 🗄️ Repositorio Git
El proyecto está vinculado al repositorio:
**`https://github.com/santiagorivero0203-gif/A-new-proyect`**

---

## 🚀 Ejecución en Local

```bash
npm install
npm run dev
```
Servidor local disponible en: `http://localhost:5174/`
