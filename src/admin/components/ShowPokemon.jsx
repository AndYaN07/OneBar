import React, { useEffect, useState } from 'react'
import { UNIVERSES_MAP } from '../config/universes.js'

const PKM = UNIVERSES_MAP['onebar_pokemon_visited']

const ShowPokemon = ({ record }) => {
  const [visited, setVisited] = useState([])
  const [details, setDetails] = useState(null)

  useEffect(() => {
    if (!record?.id) return

    // Marca como visitado
    const stored = JSON.parse(localStorage.getItem(PKM.key) || '[]')
    const id = String(record.id)
    if (!stored.includes(id)) {
      stored.push(id)
      localStorage.setItem(PKM.key, JSON.stringify(stored))
    }
    setVisited(stored)

    // Carga detalles completos desde PokeAPI (tipos, stats, etc.)
    fetch(`https://pokeapi.co/api/v2/pokemon/${record.id}`)
      .then(r => r.json())
      .then(setDetails)
  }, [record?.id])

  if (!record) return null

  const p        = record.params
  const progress = Math.round((visited.length / PKM.total) * 100)
  const { bg, fill, text, sub, glow } = PKM.colors

  const cap    = s => s.charAt(0).toUpperCase() + s.slice(1)
  const types  = details?.types?.map(t => cap(t.type.name)).join(' / ') || '—'
  const height = details ? `${(details.height / 10).toFixed(1)} m`  : '—'
  const weight = details ? `${(details.weight / 10).toFixed(1)} kg` : '—'
  const stat   = name  => details?.stats?.find(s => s.stat.name === name)?.base_stat ?? '—'

  return (
    <div
      className="ob-show"
      style={{ '--card-bg': bg, '--card-fill': fill, '--card-text': text, '--card-sub': sub, '--card-glow': glow }}
    >
      <h2 className="ob-show__name">
        #{String(record.id).padStart(3, '0')} {p.name}
      </h2>

      <div className="ob-show__stats">
        <p><strong>Tipos:</strong>   {types}</p>
        <p><strong>Altura:</strong>  {height}</p>
        <p><strong>Peso:</strong>    {weight}</p>
        <p><strong>HP:</strong>      {stat('hp')}</p>
        <p><strong>Ataque:</strong>  {stat('attack')}</p>
        <p><strong>Defensa:</strong> {stat('defense')}</p>
        <p><strong>Velocidad:</strong>{stat('speed')}</p>
      </div>

      <div className="ob-card">
        <div className="ob-card__header">
          <span className="ob-card__title">{PKM.icon} {PKM.label}</span>
          <span className="ob-card__percent">{progress}%</span>
        </div>
        <p className="ob-card__count">{visited.length} de {PKM.total} Pokémon visitados</p>
        <div className="ob-bar">
          <div className="ob-bar__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

export default ShowPokemon
