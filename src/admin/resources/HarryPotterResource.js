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

export class HarryPotterResource extends BaseResource {
  static isAdapterFor(resource) {
    return resource && resource.type === 'harry-potter'
  }

  constructor(descriptor) {
    super(descriptor)
    this._props = [
      new ApiProperty({ path: 'id',       type: 'number', isId: true, position: 0 }),
      new ApiProperty({ path: 'name',                                  position: 1 }),
      new ApiProperty({ path: 'house',                                 position: 2 }),
      new ApiProperty({ path: 'species',                               position: 3 }),
      new ApiProperty({ path: 'alive',                                 position: 4 }),
    ]
    this._cache  = []
    this._loaded = false
  }

  databaseName() { return 'Harry Potter'  }
  databaseType() { return 'api'           }
  id()           { return 'HPCharacters'  }
  name()         { return 'Personajes'    }

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

    const res = await fetch('https://hp-api.onrender.com/api/characters')
    const all = await res.json()

    this._cache = all.map((c, i) => ({
      id:       i + 1,
      name:     c.name || '—',
      house:    c.house || 'Sin casa',
      species:  c.species || '—',
      gender:   c.gender || '—',
      ancestry: c.ancestry || '—',
      patronus: c.patronus || '—',
      wand:     c.wand?.wood ? `${c.wand.wood}, núcleo ${c.wand.core}` : '—',
      alive:    c.alive ? 'Sí' : 'No',
    }))

    this._loaded = true
    console.log(`[HP API] ${this._cache.length} personajes cargados`)
  }
}
