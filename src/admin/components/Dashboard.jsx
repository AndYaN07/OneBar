import React, { useState, useEffect } from 'react'

// Configuración de cada universo — añade aquí los próximos (Pokémon, HP, Naruto)
const UNIVERSES = [
  {
    key:    'onebar_swapi_visited',  // key de localStorage
    label:  'Star Wars',
    total:  82,
    icon:   '⚔️',
    colors: { bg: '#1a1a2e', fill: '#FFE81F', text: '#FFE81F', sub: '#aaaaaa' },
  },
]

// Componente de una sola barra — reutilizable para cada universo
const OneBar = ({ universe }) => {
  const [visited, setVisited] = useState([])

  useEffect(() => {
    // Lee el progreso guardado en localStorage para este universo
    const stored = JSON.parse(localStorage.getItem(universe.key) || '[]')
    setVisited(stored)
  }, [universe.key])

  const progress = universe.total > 0
    ? Math.round((visited.length / universe.total) * 100)
    : 0

  const { bg, fill, text, sub } = universe.colors

  return (
    <div style={{
      background:    bg,
      borderRadius:  '14px',
      padding:       '28px 32px',
      marginBottom:  '20px',
    }}>
      {/* Cabecera */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: text, fontWeight: 'bold', fontSize: '18px' }}>
          {universe.icon} {universe.label}
        </span>
        <span style={{ color: text, fontWeight: 'bold', fontSize: '22px' }}>
          {progress}%
        </span>
      </div>

      {/* Contador */}
      <p style={{ color: sub, margin: '8px 0 16px', fontSize: '14px' }}>
        {visited.length} de {universe.total} explorados
      </p>

      {/* La barra */}
      <div style={{ background: '#333', borderRadius: '99px', height: '16px', overflow: 'hidden' }}>
        <div style={{
          background:   fill,
          height:       '100%',
          width:        `${progress}%`,
          borderRadius: '99px',
          transition:   'width 0.8s ease',
        }} />
      </div>
    </div>
  )
}


// Dashboard principal — se muestra al entrar al panel
const Dashboard = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '720px', margin: '0 auto', fontFamily: 'sans-serif' }}>

      <h1 style={{ marginBottom: '8px' }}>OneBar</h1>
      <p style={{ color: '#888', marginBottom: '40px' }}>
        Tu progreso explorando cada universo
      </p>

      {/* Renderiza una barra por cada universo definido en UNIVERSES */}
      {UNIVERSES.map(u => (
        <OneBar key={u.key} universe={u} />
      ))}

      <p style={{ color: '#ccc', fontSize: '12px', marginTop: '32px' }}>
        El progreso se guarda en este navegador.
        Visita personajes y planetas para avanzar.
      </p>

    </div>
  )
}

export default Dashboard
