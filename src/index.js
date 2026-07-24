import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import { SwapiPeopleResource, SwapiDatabase } from './admin/resources/SwapiResource.js'
import { SwapiPlanetsResource } from './admin/resources/SwapiPlanetsResource.js'

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
    resources: [
      // Cada { type } lo gestiona el resource cuyo isAdapterFor() devuelve true
      { resource: { type: 'swapi' } },
      { resource: { type: 'swapi-planets' } },
    ],
    rootPath: '/admin',

    // --- ASPECTO DEL PANEL ---
    // Cambia los valores hex para personalizar colores.
    // Cada universo (StarWars, Pokémon...) tendrá sus propios colores aquí más adelante.
    branding: {
      companyName: 'OneBar',
      theme: {
        colors: {
          primary100: '#4a6fa5',  // color principal: botones, menú activo
          primary80:  '#6b8cba',  // variante más suave del principal
          bck:        '#f5f6fa',  // fondo general del panel
          sidebar:    '#ffffff',  // fondo del menú lateral
          text:       '#1a1a2e',  // color del texto
        }
      }
    }
  })

  // --- ROUTER ---
  // AdminJS genera automáticamente todas las rutas del panel (listados, detalle, etc.)
  // buildRouter las monta en un router de Express listo para usar
  const adminRouter = await AdminJSExpress.buildRouter(admin)

  // --- EXPRESS ---
  // Express es el servidor web. AdminJS vive dentro de él como una ruta más.
  const app = express()

  // Monta el panel de AdminJS en la ruta /admin
  app.use(admin.options.rootPath, adminRouter)

  // Arranca el servidor
  app.listen(PORT, () => {
    console.log(`Panel disponible en: http://localhost:${PORT}/admin`)
  })
}

start()
