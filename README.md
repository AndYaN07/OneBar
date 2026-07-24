# OneBar

Panel de administración personal construido con **AdminJS** y **Node.js**.

Explora universos de APIs externas — cada colección muestra una barra de progreso visual y temática según vas descubriendo personajes. El progreso se guarda en el navegador (`localStorage`).

---

## Concepto

**OneBar** = una barra por universo.  
Cada API externa tiene su propia barra que refleja cuánto has explorado de esa colección.  
Cada universo tiene su identidad visual: colores, iconos y estilo acorde a la temática.

---

## Tech Stack

| Capa | Tecnología |
|---|---|
| Servidor | Node.js + Express 5 |
| Panel admin | AdminJS 7.x |
| Componentes | React (JSX compilado por AdminJS con Rollup) |
| Estilos | CSS externo (`src/admin/styles/onebar.css`) + CSS custom properties por universo |
| Persistencia | `localStorage` del navegador (sin base de datos) |
| Hot reload | `node --watch` con `NODE_ENV=development` |

---

## Universos implementados

| Universo | API | Personajes |
|---|---|---|
| 🌌 Star Wars | [SWAPI](https://swapi.dev/) | 82 |
| ⚡ Pokémon | [PokéAPI](https://pokeapi.co/) | 151 (Gen 1) |
| 🧙 Harry Potter | [HP-API](https://hp-api.onrender.com/) | ~50 |
| 🍃 Naruto | [Dattebayo API](https://dattebayo-api.onrender.com/) | ~150 |

> Las APIs de HP y Naruto están en Render free tier — el primer request puede tardar 30-60 s si el servidor está en cold start.

---

## Arrancar el proyecto

```bash
npm install
npm run dev
```

Panel en `http://localhost:3000/admin`

---

## Estructura

```
src/
  index.js                        → Express + AdminJS + registro de recursos
  admin/
    config/
      universes.js                → config central de los 4 universos (colores, totales, keys)
    resources/
      SwapiResource.js            → Star Wars — Personajes
      SwapiPlanetsResource.js     → Star Wars — Planetas
      PokemonResource.js          → Pokémon (Gen 1)
      HarryPotterResource.js      → Harry Potter
      NarutoResource.js           → Naruto
    components/
      Dashboard.jsx               → dashboard principal (grid 2×2 de barras)
      ShowCharacter.jsx           → detalle de personaje Star Wars
      ShowPokemon.jsx             → detalle de Pokémon (fetch individual de stats)
      ShowHarryPotter.jsx         → detalle de personaje HP
      ShowNaruto.jsx              → detalle de personaje Naruto
    styles/
      onebar.css                  → todos los estilos de los componentes custom
```

---

## Estado

🚧 En desarrollo activo — proyecto de aprendizaje de AdminJS y customización de paneles.

Ver [`/docs`](./docs/) para guías técnicas y decisiones de arquitectura.
