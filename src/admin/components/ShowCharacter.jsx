import React, { useEffect, useState } from 'react'
import { UNIVERSES_MAP } from '../config/universes.js'

const SW = UNIVERSES_MAP['onebar_swapi_visited']

const ShowCharacter = ({ record }) => {
  const [visited, setVisited] = useState([])

  useEffect(() => {
    if (!record?.id) return

    const stored = JSON.parse(localStorage.getItem(SW.key) || '[]')
    const id = String(record.id)
    if (!stored.includes(id)) {
      stored.push(id)
      localStorage.setItem(SW.key, JSON.stringify(stored))
    }
    setVisited(stored)
  }, [record?.id])

  if (!record) return null

  const p        = record.params
  const progress = Math.round((visited.length / SW.total) * 100)
  const { bg, fill, text, sub, glow } = SW.colors

  // Los CSS vars se ponen en .ob-show y los hereda .ob-card en cascada
  return (
    <div
      className="ob-show"
      style={{ '--card-bg': bg, '--card-fill': fill, '--card-text': text, '--card-sub': sub, '--card-glow': glow }}
    >
      <h2 className="ob-show__name">{p.name}</h2>

      <div className="ob-show__stats">
        <p><strong>Nacimiento:</strong> {p.birth_year}</p>
        <p><strong>Género:</strong>     {p.gender}</p>
        <p><strong>Altura:</strong>     {p.height} cm</p>
        <p><strong>Planeta ID:</strong> {p.homeworld}</p>
      </div>

      <div className="ob-card">
        <div className="ob-card__header">
          <span className="ob-card__title">{SW.icon} {SW.label}</span>
          <span className="ob-card__percent">{progress}%</span>
        </div>
        <p className="ob-card__count">{visited.length} de {SW.total} personajes visitados</p>
        <div className="ob-bar">
          <div className="ob-bar__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

export default ShowCharacter
