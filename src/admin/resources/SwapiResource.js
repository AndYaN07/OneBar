import { BaseResource, BaseRecord, BaseProperty } from "adminjs";

// ─────────────────────────────────────────────────────────────
// ApiProperty — define cada columna que AdminJS va a mostrar
// AdminJS necesita saber el nombre del campo, su tipo y si es el ID
// ─────────────────────────────────────────────────────────────
class ApiProperty extends BaseProperty {
  constructor({ path, type = "string", isId = false, position = 0 }) {
    super({ path }); // BaseProperty guarda el nombre en this._path
    this._t = type;
    this._id = isId;
    this._pos = position;
  }

  path() {
    return this._path;
  }
  type() {
    return this._t;
  }
  isId() {
    return this._id;
  }
  isSortable() {
    return false;
  }
  position() {
    return this._pos;
  }
  reference() {
    return null;
  }
  subProperties() {
    return [];
  }
  availableValues() {
    return null;
  }

  // Controla en qué vistas aparece el campo:
  // list = tabla de listado | show = detalle | edit = formulario | filter = filtros
  isVisible() {
    return { list: true, show: true, edit: false, filter: false };
  }
}

// ─────────────────────────────────────────────────────────────
// SwapiDatabase — stub mínimo requerido por registerAdapter
// No hace nada funcional, solo satisface el contrato de AdminJS
// ─────────────────────────────────────────────────────────────
export class SwapiDatabase {
  static isAdapterFor() {
    return false;
  }
  resources() {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// SwapiPeopleResource — el recurso principal
// AdminJS lo trata como una "tabla" pero los datos vienen de la API
// ─────────────────────────────────────────────────────────────
export class SwapiPeopleResource extends BaseResource {
  // AdminJS llama a esto para saber si este adapter maneja un recurso dado.
  // Cuando en index.js ponemos { resource: { type: 'swapi' } },
  // AdminJS busca qué adapter devuelve true para ese objeto → este.
  static isAdapterFor(resource) {
    return resource && resource.type === "swapi";
  }

  constructor(descriptor) {
    super(descriptor);

    // Columnas que se mostrarán — para añadir un campo, agrega una línea aquí
    this._props = [
      new ApiProperty({ path: "id", type: "number", isId: true, position: 0 }),
      new ApiProperty({ path: "name", position: 1 }),
      new ApiProperty({ path: "birth_year", position: 2 }),
      new ApiProperty({ path: "gender", position: 3 }),
      new ApiProperty({ path: "height", position: 4 }),
      new ApiProperty({ path: "homeworld", position: 5 }),
    ];

    this._cache = []; // datos en memoria — se llenan la primera vez
    this._loaded = false;
  }

  databaseName() {
    return "Star Wars";
  } // nombre del grupo en el sidebar
  databaseType() {
    return "api";
  }
  id() {
    return "Characters";
  } // identificador único del recurso
  name() {
    return "Personajes";
  } // etiqueta en el sidebar

  properties() {
    return this._props;
  }
  property(path) {
    return this._props.find((p) => p.path() === path) ?? null;
  }

  // AdminJS llama a count() para saber cuántas páginas mostrar
  async count() {
    await this._fetch();
    return this._cache.length;
  }

  // AdminJS llama a find() cada vez que se carga la tabla (paginación incluida)
  async find(_filter, { limit = 10, offset = 0 }) {
    await this._fetch();
    return this._cache
      .slice(offset, offset + limit)
      .map((r) => new BaseRecord(r, this)); // BaseRecord envuelve el objeto para AdminJS
  }

  // AdminJS llama a findOne() cuando abres el detalle de un registro
  async findOne(id) {
    await this._fetch();
    const r = this._cache.find((r) => String(r.id) === String(id));
    return r ? new BaseRecord(r, this) : null;
  }

  // Solo lectura — bloqueamos crear, editar y borrar
  async create(params) {
    return new BaseRecord(params, this);
  }
  async update(_, params) {
    return new BaseRecord(params, this);
  }
  async delete() {}

  // Descarga todos los personajes de SWAPI paginando automáticamente.
  // SWAPI devuelve 10 por página, con data.next apuntando a la siguiente.
  // Solo se ejecuta una vez — después usa la caché.
  async _fetch() {
    if (this._loaded) return;

    let url = "https://swapi.dev/api/people/";
    const all = [];

    while (url) {
      const res = await fetch(url);
      const data = await res.json();
      all.push(
        ...data.results.map((p) => ({
          ...p,
          // La URL de SWAPI incluye el ID: ".../people/1/" → extraemos el 1
          id: Number(p.url.match(/\/(\d+)\/$/)[1]),
          homeworld: p.homeworld.match(/\/(\d+)\//)?.[1] || p.homeworld,
        })),
      );
      url = data.next; // null cuando no hay más páginas
    }

    this._cache = all;
    this._loaded = true;
    console.log(`[SWAPI] ${this._cache.length} personajes cargados`);
  }
}
