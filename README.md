# OneBar

Panel de administración personal construido con **AdminJS** y **JavaScript (Node.js)**.

Explora universos de APIs externas — cada colección muestra una barra de progreso visual y temática según vas descubriendo personajes, películas o datos.

---

## Concepto

**OneBar** = una barra por universo.  
Cada API externa (Star Wars, Pokémon, Harry Potter, Naruto…) tiene su propia barra que refleja cuánto has explorado de esa colección. El progreso se guarda en el navegador (`localStorage`).

Cada universo tiene su propia identidad visual: colores, iconos y estilo acorde a la temática.

---

## Tech Stack

- **Node.js** + **Express**
- **AdminJS** — panel de administración
- **React** (componentes custom de AdminJS)
- **localStorage** — persistencia del progreso en cliente

## APIs externas

| Universo | API |
|---|---|
| Star Wars | [SWAPI](https://swapi.dev/) |
| Pokémon | [PokéAPI](https://pokeapi.co/) |
| Harry Potter | [HP-API](https://hp-api.onrender.com/) |
| Naruto | [Dattebayo API](https://api-dattebayo.vercel.app/) |

---

## Estado

🚧 En desarrollo activo — proyecto de aprendizaje personal.

## Documentación

Ver carpeta [`/docs`](./docs/) para guías de desarrollo y decisiones de arquitectura.

---

## Arrancar el proyecto

```bash
npm install
node src/index.js
```

Abrir `http://localhost:3000/admin`
