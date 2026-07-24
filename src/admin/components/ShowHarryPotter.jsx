import React, { useEffect, useState } from 'react'
import { UNIVERSES_MAP } from '../config/universes.js'

const HP = UNIVERSES_MAP['onebar_hp_visited']

const ShowHarryPotter = ({ record }) => {
  const [visited, setVisited] = useState([])

  useEffect(() => {
    if (!record?.id) return

    const stored = JSON.parse(localStorage.getItem(HP.key) || '[]')
    const id = String(record.id)
    if (!stored.includes(id)) {
      stored.push(id)
      localStorage.setItem(HP.key, JSON.stringify(stored))
    }
    setVisited(stored)
  }, [record?.id])

  if (!record) return null

  const p        = record.params
  const progress = Math.round((visited.length / HP.total) * 100)
  const { bg, fill, text, sub, glow } = HP.colors

  return (
    <div
      className="ob-show"
      style={{ '--card-bg': bg, '--card-fill': fill, '--card-text': text, '--card-sub': sub, '--card-glow': glow }}
    >
      <h2 className="ob-show__name">{p.name}</h2>

      <div className="ob-show__stats">
        <p><strong>Casa:</strong>      {p.house}</p>
        <p><strong>Especie:</strong>   {p.species}</p>
        <p><strong>Género:</strong>    {p.gender}</p>
        <p><strong>Sangre:</strong>    {p.ancestry}</p>
        <p><strong>Patronus:</strong>  {p.patronus}</p>
        <p><strong>Varita:</strong>    {p.wand}</p>
        <p><strong>Vivo:</strong>      {p.alive}</p>
      </div>

      <div className="ob-card">
        <div className="ob-card__header">
          <span className="ob-card__title">{HP.icon} {HP.label}</span>
          <span className="ob-card__percent">{progress}%</span>
        </div>
        <p className="ob-card__count">{visited.length} de {HP.total} personajes visitados</p>
        <div className="ob-bar">
          <div className="ob-bar__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

export default ShowHarryPotter
