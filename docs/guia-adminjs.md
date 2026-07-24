# Guía de desarrollo — OneBar + AdminJS

Documento vivo. Se actualiza conforme avanza el proyecto.

---

## ¿Qué es AdminJS?

AdminJS es un framework Node.js que genera automáticamente un panel de administración web a partir de recursos de datos. Permite:

- Definir **recursos** (colecciones de datos) — en este proyecto, cada API externa es un recurso.
- Crear **componentes React custom** — las barras temáticas de OneBar.
- Personalizar el **dashboard** — la pantalla principal con las barras de progreso.
- Definir **acciones** propias sobre los recursos.

Panel accesible en: `http://localhost:3000/admin`

---

## Arquitectura del proyecto

```
OneBar/
  src/
    index.js              → servidor Express + arranque AdminJS
    admin/
      resources/          → un archivo por API externa
      components/         → componentes React custom (barras temáticas)
      dashboard/          → dashboard principal con resumen de progreso
  docs/                   → esta carpeta, documentación del proyecto
  package.json
  .gitignore
  README.md
```

---

## Conceptos clave de AdminJS

### Resource
Un recurso es una "fuente de datos" que AdminJS sabe cómo listar, ver y (opcionalmente) editar.  
En este proyecto, cada API externa se convierte en un recurso custom sin base de datos.

### Custom Component
Componente React registrado en AdminJS para reemplazar o extender la UI por defecto.  
Aquí los usamos para las barras de progreso temáticas.

### Dashboard
Pantalla de inicio del panel. Completamente personalizable con un componente React propio.  
En OneBar: muestra una barra por universo con el progreso global del usuario.

---

## Progreso del usuario — localStorage

El progreso (qué IDs has visitado de cada universo) se guarda en `localStorage` del navegador.

```js
// Guardar visita
const key = 'onebar_swapi_visited'
const visited = JSON.parse(localStorage.getItem(key) || '[]')
if (!visited.includes(id)) {
  visited.push(id)
  localStorage.setItem(key, JSON.stringify(visited))
}

// Leer progreso
const progress = visited.length / totalItems  // 0.0 → 1.0
```

Cada universo tiene su propia key: `onebar_swapi_visited`, `onebar_poke_visited`, etc.

---

## Universos y temática visual

| Universo | Key localStorage | Colores | Icono | API |
|---|---|---|---|---|
| Star Wars | `onebar_swapi_visited` | Negro / Amarillo | ⚔️ | https://swapi.dev/api/ |
| Pokémon | `onebar_poke_visited` | Rojo / Blanco | ⭕ | https://pokeapi.co/api/v2/ |
| Harry Potter | `onebar_hp_visited` | Granate / Dorado | ⚡ | https://hp-api.onrender.com/ |
| Naruto | `onebar_naruto_visited` | Naranja / Rojo | 🌀 | https://api-dattebayo.vercel.app/ |

---

## Pasos de desarrollo

- [ ] 1. Inicializar proyecto Node.js (`npm init`)
- [ ] 2. Instalar AdminJS + Express (`npm install adminjs @adminjs/express express`)
- [ ] 3. Servidor básico con AdminJS vacío
- [ ] 4. Primer recurso custom — SWAPI (listar personajes desde API)
- [ ] 5. Componente barra de progreso genérico
- [ ] 6. Integrar localStorage — marcar ítem como visitado
- [ ] 7. Dashboard custom con barras por universo
- [ ] 8. Estilizar cada barra según su temática
- [ ] 9. Añadir resto de APIs (Pokémon, HP, Naruto)

---

## Mejoras futuras

Ideas anotadas para cuando la base esté funcionando:

- **Imágenes de personajes** — mostrar imagen del personaje en la vista de detalle del recurso.
- **Vista tipo ficha** — reemplazar la vista por defecto de AdminJS con un componente tipo "web de consulta": imagen, stats, descripción organizada.
- **Edición local** — permitir añadir notas o datos propios a cada personaje, guardados en `localStorage`. Sin alterar los datos de la API.

---

## Decisiones tomadas

| Fecha | Decisión | Motivo |
|---|---|---|
| 2026-07-24 | Sin base de datos | Proyecto de aprendizaje, reducir complejidad inicial |
| 2026-07-24 | localStorage para progreso | Simple, sin servidor extra, suficiente para uso personal |
| 2026-07-24 | JavaScript (no TypeScript) | Reducir curva de aprendizaje al arrancar |
| 2026-07-24 | Repurpose repo | El código Flutter era mínimo, el concepto "barra" se mantiene |
