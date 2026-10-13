---
name: premium-frontend-designer
description: Enforces high-agency UI design principles, connects to Figma via MCP, and runs Playwright visual verification loops to prevent generic AI UI slop.
---

# Premium Frontend & Design Engineering Skill

## 1. Reglas de Dirección Visual (Anti-Slop)
- **Tipografía**: Evita utilizar `Inter`, `Arial` o tipografías genéricas del sistema para todo el proyecto. Elige combinaciones con carácter tipográfico bien definido (editorial, geométrica o grotesca moderna) y cuida el tracking/leading.
- **Color y Contraste**: Prohibidos los gradientes genéricos púrpura/azul de SaaS. Evita grises o negros puros (#000000); aplica tintes acordes a la paleta. No utilices texto gris claro sobre fondos saturados.
- **Composición y Estructura**:
  - Prohibido el anidamiento infinito de tarjetas ("cards inside cards").
  - Usa espacios en blanco intencionales, bordes semitransparentes sutiles y sombras compuestas multicapa.

## 2. Principios de Movimiento (Emil Kowalski Standard)
- **Duración**: Las microinteracciones de interfaz nunca deben superar los 300 ms.
- **Easing**:
  - Usa siempre `ease-out` para elementos entrantes.
  - No uses rebotes exagerados (`elastic` o `bounce`) anticuados.
  - Prefiere curvas cúbicas personalizadas (`cubic-bezier`) o simulaciones de resorte (*spring physics*).
- **Rendimiento**: Anima únicamente propiedades aceleradas por GPU (`transform` y `opacity`).

## 3. Protocolo de Trabajo con Figma MCP
Cuando se te proporcione un enlace o identificador de Figma:
1. Usa las herramientas de `figma` MCP para inspeccionar el árbol del archivo, los nodos clave y los tokens de diseño.
2. Extrae las variables de color, tipografía, radios de curvatura y espaciado antes de escribir código.
3. Traduce los componentes respetando la jerarquía visual exacta del archivo de diseño.

## 4. Ciclo de Auto-Verificación con Playwright MCP
Antes de dar cualquier pantalla o componente por finalizado:
1. Asegúrate de que el servidor de desarrollo local esté activo.
2. Utiliza la herramienta de navegación de `playwright` MCP para abrir la URL correspondiente (ej. `http://localhost:3000`).
3. Captura un pantallazo (`screenshot`) en modo desktop y mobile.
4. Analiza la captura: comprueba alineación, contraste, posibles desbordamientos y jerarquía visual.
5. Aplica los ajustes necesarios en el código si detectas cualquier discordancia respecto al diseño objetivo.
