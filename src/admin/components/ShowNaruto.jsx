import React, { useEffect, useState } from 'react'
import { UNIVERSES_MAP } from '../config/universes.js'

const NARUTO = UNIVERSES_MAP['onebar_naruto_visited']

const ShowNaruto = ({ record }) => {
  const [visited, setVisited] = useState([])

  useEffect(() => {
    if (!record?.id) return

    const stored = JSON.parse(localStorage.getItem(NARUTO.key) || '[]')
    const id = String(record.id)
    if (!stored.includes(id)) {
      stored.push(id)
      localStorage.setItem(NARUTO.key, JSON.stringify(stored))
    }
    setVisited(stored)
  }, [record?.id])

  if (!record) return null

  const p        = record.params
  const progress = Math.round((visited.length / NARUTO.total) * 100)
  const { bg, fill, text, sub, glow } = NARUTO.colors

  return (
    <div
      className="ob-show"
      style={{ '--card-bg': bg, '--card-fill': fill, '--card-text': text, '--card-sub': sub, '--card-glow': glow }}
    >
      <h2 className="ob-show__name">{p.name}</h2>

      <div className="ob-show__stats">
        <p><strong>Género:</strong>       {p.sex}</p>
        <p><strong>Estado:</strong>       {p.status}</p>
        <p><strong>Naturalezas:</strong>  {p.natureType || '—'}</p>
        <p><strong>Jutsus:</strong>       {p.jutsu || '—'}</p>
      </div>

      <div className="ob-card">
        <div className="ob-card__header">
          <span className="ob-card__title">{NARUTO.icon} {NARUTO.label}</span>
          <span className="ob-card__percent">{progress}%</span>
        </div>
        <p className="ob-card__count">{visited.length} de {NARUTO.total} personajes visitados</p>
        <div className="ob-bar">
          <div className="ob-bar__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

export default ShowNaruto
