import { BaseResource, BaseRecord, BaseProperty } from 'adminjs'

class ApiProperty extends BaseProperty {
  constructor({ path, type = 'string', isId = false, position = 0 }) {
    super({ path })
    this._t   = type
    this._id  = isId
    this._pos = position
  }
  path()            { return this._path }
  type()            { return this._t    }
  isId()            { return this._id   }
  isSortable()      { return false      }
  position()        { return this._pos  }
  reference()       { return null       }
  subProperties()   { return []         }
  availableValues() { return null       }
  isVisible()       { return { list: true, show: true, edit: false, filter: false } }
}

export class PokemonResource extends BaseResource {
  static isAdapterFor(resource) {
    return resource && resource.type === 'pokemon'
  }

  constructor(descriptor) {
    super(descriptor)
    this._props = [
      new ApiProperty({ path: 'id',   type: 'number', isId: true, position: 0 }),
      new ApiProperty({ path: 'name',                              position: 1 }),
      new ApiProperty({ path: 'type',                              position: 2 }),
    ]
    this._cache  = []
    this._loaded = false
  }

  databaseName() { return 'Pokémon'  }
  databaseType() { return 'api'      }
  id()           { return 'Pokemon'  }
  name()         { return 'Pokémon'  }

  properties()   { return this._props }
  property(path) { return this._props.find(p => p.path() === path) ?? null }

  async count() { await this._fetch(); return this._cache.length }

  async find(_filter, { limit = 10, offset = 0 }) {
    await this._fetch()
    return this._cache.slice(offset, offset + limit).map(r => new BaseRecord(r, this))
  }

  async findOne(id) {
    await this._fetch()
    const r = this._cache.find(r => String(r.id) === String(id))
    return r ? new BaseRecord(r, this) : null
  }

  async create(params)    { return new BaseRecord(params, this) }
  async update(_, params) { return new BaseRecord(params, this) }
  async delete()          {}

  async _fetch() {
    if (this._loaded) return

    // Cargamos los primeros 151 — Generación 1 (Kanto)
    const res  = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
    const data = await res.json()

    this._cache = data.results.map((p, i) => ({
      id:   i + 1,
      // Capitaliza cada parte del nombre ("mr-mime" → "Mr Mime")
      name: p.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      type: '—',  // tipos se cargan en ShowPokemon con fetch individual
    }))

    this._loaded = true
    console.log(`[PokéAPI] ${this._cache.length} Pokémon cargados`)
  }
}
