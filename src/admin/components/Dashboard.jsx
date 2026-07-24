import React, { useState, useEffect } from 'react'
import { UNIVERSES } from '../config/universes.js'

// Barra de progreso de un universo
// Los colores llegan via CSS custom properties en el style del wrapper
const OneBar = ({ universe }) => {
  const [visited, setVisited] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(universe.key) || '[]')
    setVisited(stored)
  }, [universe.key])

  const progress = universe.total > 0
    ? Math.round((visited.length / universe.total) * 100)
    : 0

  const { bg, fill, text, sub, glow } = universe.colors

  return (
    <div
      className="ob-card"
      style={{ '--card-bg': bg, '--card-fill': fill, '--card-text': text, '--card-sub': sub, '--card-glow': glow }}
    >
      <div className="ob-card__header">
        <span className="ob-card__title">{universe.icon} {universe.label}</span>
        <span className="ob-card__percent">{progress}%</span>
      </div>
      <p className="ob-card__count">{visited.length} de {universe.total} explorados</p>
      <div className="ob-bar">
        <div className="ob-bar__fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

const Dashboard = () => (
  <div className="ob-dashboard">
    <h1 className="ob-dashboard__title">OneBar</h1>
    <p className="ob-dashboard__subtitle">Tu progreso en cada universo</p>

    {UNIVERSES.map(u => <OneBar key={u.key} universe={u} />)}

    <p className="ob-dashboard__footer">
      El progreso se guarda en este navegador.
      Visita personajes para avanzar.
    </p>
  </div>
)

export default Dashboard
