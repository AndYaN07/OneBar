import React, { useEffect, useState } from 'react'

const LS_KEY = 'onebar_swapi_visited'
const TOTAL  = 82  // total personajes SWAPI — TODO: hacerlo dinámico

const ShowCharacter = ({ record }) => {
  const [visited, setVisited] = useState([])

  useEffect(() => {
    if (!record?.id) return

    // Marca este personaje como visitado al abrir su detalle
    const stored = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    const id = String(record.id)
    if (!stored.includes(id)) {
      stored.push(id)
      localStorage.setItem(LS_KEY, JSON.stringify(stored))
    }
    setVisited(stored)
  }, [record?.id])

  if (!record) return null

  const p        = record.params
  const progress = Math.round((visited.length / TOTAL) * 100)

  return (
    <div style={{ padding: '32px', fontFamily: 'sans-serif' }}>

      {/* Datos del personaje */}
      <h2 style={{ marginBottom: '16px' }}>{p.name}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p><strong>Nacimiento:</strong> {p.birth_year}</p>
        <p><strong>Género:</strong>     {p.gender}</p>
        <p><strong>Altura:</strong>     {p.height} cm</p>
        <p><strong>Planeta ID:</strong> {p.homeworld}</p>
      </div>

      {/* ── OneBar ── barra de progreso temática Star Wars */}
      <div style={{
        marginTop: '40px',
        background:    '#1a1a2e',
        borderRadius:  '12px',
        padding:       '24px',
      }}>
        <p style={{ color: '#FFE81F', fontWeight: 'bold', fontSize: '16px', margin: 0 }}>
          ⚔️ Exploración Star Wars
        </p>
        <p style={{ color: '#aaaaaa', margin: '8px 0' }}>
          {visited.length} de {TOTAL} personajes visitados
        </p>

        {/* Fondo gris = progreso pendiente | Fill amarillo = visitados */}
        <div style={{ background: '#333333', borderRadius: '99px', height: '14px', overflow: 'hidden' }}>
          <div style={{
            background:   '#FFE81F',
            height:       '100%',
            width:        `${progress}%`,
            borderRadius: '99px',
            transition:   'width 0.6s ease',
          }} />
        </div>

        <p style={{ color: '#FFE81F', fontWeight: 'bold', marginTop: '8px' }}>
          {progress}%
        </p>
      </div>

    </div>
  )
}

export default ShowCharacter
