import AdminJS from 'adminjs'
import { ComponentLoader } from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'

// En ESM no existe __dirname — lo reconstruimos con import.meta.url
// __dirname queda como: /home/andy/prop/OneBar/src
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import { SwapiPeopleResource, SwapiDatabase } from './admin/resources/SwapiResource.js'
import { SwapiPlanetsResource } from './admin/resources/SwapiPlanetsResource.js'

// --- COMPONENT LOADER ---
// AdminJS compila los componentes React con Vite al arrancar.
// Aquí registramos cada componente custom con un nombre y su ruta de fichero.
// Ese nombre luego se usa en las opciones del recurso para decirle a AdminJS
// "en esta vista, usa este componente en vez del por defecto"
const componentLoader = new ComponentLoader()

const Components = {
  ShowCharacter: componentLoader.add('ShowCharacter', path.join(__dirname, 'admin/components/ShowCharacter.jsx')),
  Dashboard:     componentLoader.add('Dashboard',     path.join(__dirname, 'admin/components/Dashboard.jsx')),
}

// Cada recurso necesita su propio registerAdapter.
// SwapiDatabase es el mismo stub para todos los recursos de Star Wars.
AdminJS.registerAdapter({ Resource: SwapiPeopleResource,  Database: SwapiDatabase })
AdminJS.registerAdapter({ Resource: SwapiPlanetsResource, Database: SwapiDatabase })

const PORT = 3000

// Función principal async — AdminJS necesita inicializarse antes de arrancar el servidor
const start = async () => {

  // --- ADMINJS ---
  // Aquí se configura el panel: qué recursos muestra, en qué URL vive, etc.
  // resources: [] → de momento vacío, aquí irán las APIs externas (SWAPI, PokéAPI...)
  // rootPath: la URL donde se sirve el panel → http://localhost:3000/admin
  const admin = new AdminJS({
    componentLoader,
    dashboard: {
      component: Components.Dashboard,  // reemplaza el dashboard por defecto de AdminJS
    },
    resources: [
      {
        resource: { type: 'swapi' },
        options: {
          // Sustituye la vista de detalle por defecto con nuestro componente custom
          actions: {
            show:       { component: Components.ShowCharacter },
            // Ocultamos las acciones de escritura — este recurso es solo lectura
            new:        { isAccessible: false },
            edit:       { isAccessible: false },
            delete:     { isAccessible: false },
            bulkDelete: { isAccessible: false },
          }
        }
      },
      { resource: { type: 'swapi-planets' } },
    ],
    rootPath: '/admin',

    // --- ASPECTO DEL PANEL ---
    // Cambia los valores hex para personalizar colores.
    // Cada universo (StarWars, Pokémon...) tendrá sus propios colores aquí más adelante.
    assets: {
      styles: ['/assets/onebar.css'],
    },
    branding: {
      companyName: 'OneBar',
      logo: false,   // oculta el logo de AdminJS — muestra companyName en su lugar
      theme: {
        colors: {
          // ── Fondos ──────────────────────────────────────
          bg:        '#0f0f1a',  // fondo principal
          sidebar:   '#1a1a2e',  // menú lateral
          container: '#1e2235',  // tarjetas y paneles
          filterBg:  '#1a1a2e',
          highlight: '#252545',  // hover filas de tabla
          // ── Texto ───────────────────────────────────────
          // En modo oscuro los grises se invierten: grey100 es el más CLARO
          text:    '#f0f0f0',   // texto base
          grey100: '#f0f0f5',   // texto primario (títulos, labels)
          grey80:  '#d0d0ee',   // texto secundario
          grey60:  '#b8b8d8',   // placeholders, hints — incluye "NAVIGATION" sidebar
          grey40:  '#4a4a6a',   // bordes, separadores sutiles
          grey20:  '#252540',   // fondos alternativos (chips, badges bg)
          // ── Bordes ──────────────────────────────────────
          border:      '#2a2a4a',
          separator:   '#2a2a4a',
          inputBorder: '#4a4a7a',  // visible en inputs oscuros
          // ── Accent (color secundario, sidebar activo) ───
          accent: '#6b6bb0',
          // ── Color primario (botones, links activos) ─────
          primary100: '#4a6fa5',
          primary80:  '#6b8cba',
          primary60:  '#8aa5cc',
          primary40:  '#a9bedd',
          primary20:  '#1e2a40',
        }
      }
    }
  })

  // --- BUNDLER ---
  // AdminJS NO compila los componentes custom automáticamente.
  // watch() genera el entry file, compila con Rollup y observa cambios.
  // Sin esta llamada, ComponentLoader no hace nada visible.
  if (process.env.NODE_ENV !== 'production') {
    await admin.watch()
  }

  // --- ROUTER ---
  // AdminJS genera automáticamente todas las rutas del panel (listados, detalle, etc.)
  // buildRouter las monta en un router de Express listo para usar
  const adminRouter = await AdminJSExpress.buildRouter(admin)

  // --- EXPRESS ---
  // Express es el servidor web. AdminJS vive dentro de él como una ruta más.
  const app = express()

  // Sirve el CSS custom en /assets/onebar.css
  app.use('/assets', express.static(path.join(__dirname, 'admin/styles')))

  // Monta el panel de AdminJS en la ruta /admin
  app.use(admin.options.rootPath, adminRouter)

  // Arranca el servidor
  app.listen(PORT, () => {
    console.log(`Panel disponible en: http://localhost:${PORT}/admin`)
  })
}

start()
