export const UNIVERSES = [
  {
    key:   'onebar_swapi_visited',
    label: 'Star Wars',
    total: 82,
    icon:  '🌌',
    colors: {
      bg:   '#1e1e3c',
      fill: '#FFE81F',
      text: '#FFE81F',
      sub:  '#7777bb',
      glow: 'rgba(255, 232, 31, 0.45)',
    },
  },
  {
    key:   'onebar_pokemon_visited',
    label: 'Pokémon',
    total: 151,
    icon:  '⚡',
    colors: {
      bg:   '#142014',
      fill: '#FFDE00',
      text: '#FFDE00',
      sub:  '#6699aa',
      glow: 'rgba(255, 222, 0, 0.45)',
    },
  },
  {
    key:   'onebar_hp_visited',
    label: 'Harry Potter',
    total: 50,
    icon:  '🧙',
    colors: {
      bg:   '#1e1808',
      fill: '#C5A028',
      text: '#C5A028',
      sub:  '#887755',
      glow: 'rgba(197, 160, 40, 0.45)',
    },
  },
  {
    key:   'onebar_naruto_visited',
    label: 'Naruto',
    total: 150,
    icon:  '🍃',
    colors: {
      bg:   '#1e1408',
      fill: '#FF7300',
      text: '#FF7300',
      sub:  '#996644',
      glow: 'rgba(255, 115, 0, 0.45)',
    },
  },
]

export const UNIVERSES_MAP = Object.fromEntries(UNIVERSES.map(u => [u.key, u]))
