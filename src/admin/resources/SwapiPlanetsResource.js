import { BaseResource, BaseRecord, BaseProperty } from 'adminjs'

// ApiProperty es la misma clase auxiliar que en SwapiResource.js.
// Cuando tengamos más APIs la extraeremos a un fichero base compartido.
class ApiProperty extends BaseProperty {
  constructor({ path, type = 'string', isId = false, position = 0 }) {
    super({ path })
    this._t   = type
    this._id  = isId
    this._pos = position
  }

  path()            { return this._path  }
  type()            { return this._t     }
  isId()            { return this._id    }
  isSortable()      { return false       }
  position()        { return this._pos   }
  reference()       { return null        }
  subProperties()   { return []          }
  availableValues() { return null        }
  isVisible()       { return { list: true, show: true, edit: false, filter: false } }
}


export class SwapiPlanetsResource extends BaseResource {

  // Usa type: 'swapi-planets' para distinguirlo de People (type: 'swapi')
  static isAdapterFor(resource) {
    return resource && resource.type === 'swapi-planets'
  }

  constructor(descriptor) {
    super(descriptor)

    this._props = [
      new ApiProperty({ path: 'id',          type: 'number', isId: true,  position: 0 }),
      new ApiProperty({ path: 'name',                                      position: 1 }),
      new ApiProperty({ path: 'climate',                                   position: 2 }),
      new ApiProperty({ path: 'terrain',                                   position: 3 }),
      new ApiProperty({ path: 'population',                                position: 4 }),
      new ApiProperty({ path: 'diameter',                                  position: 5 }),
      new ApiProperty({ path: 'gravity',                                   position: 6 }),
    ]

    this._cache  = []
    this._loaded = false
  }

  databaseName() { return 'Star Wars'     }  // mismo grupo que People en el sidebar
  databaseType() { return 'api'           }
  id()           { return 'Planets'       }
  name()         { return 'Planetas'      }

  properties()   { return this._props }
  property(path) { return this._props.find(p => p.path() === path) ?? null }

  async count() {
    await this._fetch()
    return this._cache.length
  }

  async find(_filter, { limit = 10, offset = 0 }) {
    await this._fetch()
    return this._cache
      .slice(offset, offset + limit)
      .map(r => new BaseRecord(r, this))
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

    let url   = 'https://swapi.dev/api/planets/'
    const all = []

    while (url) {
      const res  = await fetch(url)
      const data = await res.json()
      all.push(
        ...data.results.map(p => ({
          ...p,
          id: Number(p.url.match(/\/(\d+)\/$/)[1]),
        }))
      )
      url = data.next
    }

    this._cache  = all
    this._loaded = true
    console.log(`[SWAPI] ${this._cache.length} planetas cargados`)
  }
}
