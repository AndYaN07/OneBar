import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'

const PORT = 3000

// Función principal async — AdminJS necesita inicializarse antes de arrancar el servidor
const start = async () => {

  // --- ADMINJS ---
  // Aquí se configura el panel: qué recursos muestra, en qué URL vive, etc.
  // resources: [] → de momento vacío, aquí irán las APIs externas (SWAPI, PokéAPI...)
  // rootPath: la URL donde se sirve el panel → http://localhost:3000/admin
  const admin = new AdminJS({
    resources: [],
    rootPath: '/admin',
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
