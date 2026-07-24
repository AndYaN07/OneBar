# Guía de desarrollo — OneBar + AdminJS

Documento vivo. Se actualiza conforme avanza el proyecto.

---

## ¿Qué es AdminJS?

AdminJS es un framework Node.js que genera automáticamente un panel de administración web a partir de recursos de datos. Permite:

- Definir **recursos** (colecciones de datos) — en este proyecto, cada API externa es un recurso.
- Crear **componentes React custom** — las barras temáticas de OneBar.
- Personalizar el **dashboard** — la pantalla principal con el grid de barras de progreso.
- Definir **acciones** propias sobre los recursos.

Panel accesible en: `http://localhost:3000/admin`

---

## Arquitectura del proyecto

```
src/
  index.js                        → Express + AdminJS + registro de recursos
  admin/
    config/
      universes.js                → config central de los 4 universos
    resources/
      SwapiResource.js            → Star Wars — Personajes (+ SwapiDatabase stub)
      SwapiPlanetsResource.js     → Star Wars — Planetas
      PokemonResource.js          → Pokémon Gen 1
      HarryPotterResource.js      → Harry Potter
      NarutoResource.js           → Naruto
    components/
      Dashboard.jsx               → dashboard principal (grid 2×2)
      ShowCharacter.jsx           → detalle Star Wars
      ShowPokemon.jsx             → detalle Pokémon (fetch individual de stats)
      ShowHarryPotter.jsx         → detalle Harry Potter
      ShowNaruto.jsx              → detalle Naruto
    styles/
      onebar.css                  → todos los estilos de componentes custom
```

---

## Conceptos clave de AdminJS

### Resource
Un recurso es una "fuente de datos" que AdminJS sabe cómo listar, ver y (opcionalmente) editar.  
En este proyecto, cada API externa se convierte en un recurso custom sin base de datos.

Para un recurso sin ORM hay que:
1. Crear clase con `static isAdapterFor(resource)` que devuelve `true` para un descriptor propio
2. Crear stub de `Database` con `static isAdapterFor() { return false }`
3. Llamar `AdminJS.registerAdapter({ Resource, Database })` **antes** de `new AdminJS()`
4. Pasar `{ resource: { type: 'mi-tipo' } }` al array `resources`

### Custom Component
Componente React registrado en AdminJS para reemplazar o extender la UI por defecto.  
Aquí los usamos para las vistas de detalle de cada universo y el dashboard.

### Dashboard
Pantalla de inicio del panel. Completamente personalizable con un componente React propio.  
En OneBar: muestra un grid 2×2 con una barra de progreso por universo.

---

## Sistema de estilos — CSS custom properties

Los colores de cada universo se pasan como CSS custom properties desde React:

```jsx
// En Dashboard.jsx y Show*.jsx
<div
  className="ob-card"
  style={{ '--card-bg': bg, '--card-fill': fill, '--card-text': text, '--card-sub': sub, '--card-glow': glow }}
>
```

El CSS los consume en cascada con `var()`:

```css
.ob-card        { background: var(--card-bg, #14142a); }
.ob-card__title { color:      var(--card-text, #fff);  }
.ob-bar__fill   { background: var(--card-fill, #fff);
                  box-shadow:  0 0 14px var(--card-glow); }
```

Las variables se definen **una sola vez** en el elemento wrapper y todos los hijos las heredan.

El CSS se carga globalmente vía `assets.styles` en AdminJS y Express static:

```js
// src/index.js
assets: { styles: ['/assets/onebar.css'] }
app.use('/assets', express.static(path.join(__dirname, 'admin/styles')))
```

---

## Config central de universos

`src/admin/config/universes.js` es la única fuente de verdad para colores, totales y keys de localStorage. Importado por Dashboard y todos los Show components:

```js
export const UNIVERSES = [
  { key: 'onebar_swapi_visited',    label: 'Star Wars',    total: 82,  icon: '🌌', colors: { bg, fill, text, sub, glow } },
  { key: 'onebar_pokemon_visited',  label: 'Pokémon',      total: 151, icon: '⚡', colors: { ... } },
  { key: 'onebar_hp_visited',       label: 'Harry Potter', total: 50,  icon: '🧙', colors: { ... } },
  { key: 'onebar_naruto_visited',   label: 'Naruto',       total: 150, icon: '🍃', colors: { ... } },
]
export const UNIVERSES_MAP = Object.fromEntries(UNIVERSES.map(u => [u.key, u]))
```

---

## Progreso del usuario — localStorage

```js
const key     = 'onebar_swapi_visited'
const stored  = JSON.parse(localStorage.getItem(key) || '[]')
const id      = String(record.id)
if (!stored.includes(id)) {
  stored.push(id)
  localStorage.setItem(key, JSON.stringify(stored))
}
const progress = Math.round((stored.length / total) * 100)
```

Cada universo tiene su propia key. El marcado de visita ocurre en el `useEffect` del Show component correspondiente.

---

## Gotchas importantes

### 1. `admin.watch()` es OBLIGATORIO para componentes custom
AdminJS NO compila los componentes de `ComponentLoader` automáticamente.  
Hay que llamar `await admin.watch()` antes de `buildRouter` en desarrollo.

### 2. `__dirname` en ESM
En ESM no existe `__dirname`. Reconstruirlo con:
```js
import { fileURLToPath } from 'url'
import path from 'path'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
```

### 3. El bundle se guarda en `.adminjs/`
AdminJS genera `.adminjs/entry.js` y `.adminjs/bundle.js`. Si los componentes no aparecen, verificar que `entry.js` los importa.

### 4. Tokens de color del design system
Los tokens válidos están en `node_modules/@adminjs/design-system/build/theme.js`.  
El token `grey40` controla el label "NAVIGATION" del sidebar (no `grey60` como cabría esperar).

### 5. Componentes custom — importar desde otros módulos
Los JSX custom pueden importar ficheros JS relativos normales. Rollup los incluye en el bundle automáticamente. Ejemplo: `import { UNIVERSES_MAP } from '../config/universes.js'`.

### 6. APIs externas en Render free tier
`hp-api.onrender.com` y `dattebayo-api.onrender.com` tienen cold starts de 30-60 s si llevan tiempo sin tráfico. El primer request al servidor puede tardar. No es un error — hay que esperar.

---

## Pasos de desarrollo

- [x] 1. Inicializar proyecto Node.js (`npm init`)
- [x] 2. Instalar AdminJS + Express
- [x] 3. Servidor básico con AdminJS vacío
- [x] 4. Primer recurso custom — SWAPI Personajes
- [x] 5. Recurso SWAPI Planetas
- [x] 6. Componente barra de progreso + localStorage
- [x] 7. Dashboard custom con barras por universo
- [x] 8. CSS externo — sistema de custom properties por universo
- [x] 9. Grid 2×2 en Dashboard
- [x] 10. Universo Pokémon (PokéAPI Gen 1)
- [x] 11. Universo Harry Potter (HP-API)
- [x] 12. Universo Naruto (Dattebayo API)

---

## Mejoras futuras

- **HomeWorld — nombre completo** — actualmente muestra el ID del planeta. Cruzar datos entre People y Planets para mostrar nombre real (`Tatooine`, `Alderaan`…).
- **Imágenes de personajes** — mostrar sprite/imagen en la vista de detalle.
- **Vista tipo ficha** — componente más elaborado con imagen, stats visuales y descripción organizada.
- **Edición local** — añadir notas personales por personaje, guardadas en `localStorage`.
- **Barra lateral** — mejorar la apariencia del sidebar de AdminJS más allá de los tokens de color.
- **Planetas Pokémon, Hechizos HP, Clanes Naruto** — más recursos por universo.
- **Ocultar acciones escritura en Planets** — añadir `isAccessible: false` para new/edit/delete/bulkDelete.

---

## Decisiones tomadas

| Fecha | Decisión | Motivo |
|---|---|---|
| 2026-07-24 | `admin.watch()` obligatorio | AdminJS no compila ComponentLoader automáticamente |
| 2026-07-24 | Sin base de datos | Proyecto de aprendizaje, reducir complejidad |
| 2026-07-24 | localStorage para progreso | Simple, sin servidor extra, suficiente para uso personal |
| 2026-07-24 | JavaScript (no TypeScript) | Reducir curva de aprendizaje al arrancar |
| 2026-07-24 | CSS externo + custom properties | Separar estilos del JSX; colores dinámicos sin clases por universo |
| 2026-07-24 | Config central `universes.js` | Evitar duplicar colores/totales/keys entre Dashboard y Show components |
| 2026-07-24 | Reutilizar `SwapiDatabase` stub | El stub es idéntico para todos los recursos — no duplicar código inútil |
