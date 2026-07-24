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

export class NarutoResource extends BaseResource {
  static isAdapterFor(resource) {
    return resource && resource.type === 'naruto'
  }

  constructor(descriptor) {
    super(descriptor)
    this._props = [
      new ApiProperty({ path: 'id',          type: 'number', isId: true, position: 0 }),
      new ApiProperty({ path: 'name',                                     position: 1 }),
      new ApiProperty({ path: 'sex',                                      position: 2 }),
      new ApiProperty({ path: 'natureType',                               position: 3 }),
    ]
    this._cache  = []
    this._loaded = false
  }

  databaseName() { return 'Naruto'       }
  databaseType() { return 'api'          }
  id()           { return 'NarutoChars'  }
  name()         { return 'Personajes'   }

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

    const BASE = 'https://dattebayo-api.onrender.com'
    const all  = []
    let page   = 1

    while (page <= 20) {  // tope de seguridad: máx 400 personajes
      const res = await fetch(
        `${BASE}/characters?limit=20&page=${page}`,
        { headers: { Accept: 'application/json' } }
      )

      if (!res.ok) {
        console.warn(`[Naruto API] HTTP ${res.status} en página ${page}`)
        break
      }

      const data  = await res.json()
      const chars = data.characters || []
      if (!chars.length) break
      all.push(...chars)
      if (data.total && all.length >= data.total) break
      page++
    }

    this._cache = all.map(c => ({
      id:          c.id,
      name:        c.name || '—',
      sex:         c.personal?.sex || '—',
      status:      c.personal?.status || '—',
      natureType:  (c.natureType || []).join(', ') || '—',
      jutsu:       (c.jutsu || []).slice(0, 4).join(' · ') || '—',
    }))

    this._loaded = true
    console.log(`[Naruto API] ${this._cache.length} personajes cargados`)
  }
}
