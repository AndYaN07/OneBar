(function (React) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  const UNIVERSES = [{
    key: 'onebar_swapi_visited',
    label: 'Star Wars',
    total: 82,
    icon: '🌌',
    colors: {
      bg: '#1e1e3c',
      fill: '#FFE81F',
      text: '#FFE81F',
      sub: '#7777bb',
      glow: 'rgba(255, 232, 31, 0.45)'
    }
  }, {
    key: 'onebar_pokemon_visited',
    label: 'Pokémon',
    total: 151,
    icon: '⚡',
    colors: {
      bg: '#142014',
      fill: '#FFDE00',
      text: '#FFDE00',
      sub: '#6699aa',
      glow: 'rgba(255, 222, 0, 0.45)'
    }
  }, {
    key: 'onebar_hp_visited',
    label: 'Harry Potter',
    total: 50,
    icon: '🧙',
    colors: {
      bg: '#1e1808',
      fill: '#C5A028',
      text: '#C5A028',
      sub: '#887755',
      glow: 'rgba(197, 160, 40, 0.45)'
    }
  }, {
    key: 'onebar_naruto_visited',
    label: 'Naruto',
    total: 150,
    icon: '🍃',
    colors: {
      bg: '#1e1408',
      fill: '#FF7300',
      text: '#FF7300',
      sub: '#996644',
      glow: 'rgba(255, 115, 0, 0.45)'
    }
  }];
  const UNIVERSES_MAP = Object.fromEntries(UNIVERSES.map(u => [u.key, u]));

  const SW = UNIVERSES_MAP['onebar_swapi_visited'];
  const ShowCharacter = ({
    record
  }) => {
    const [visited, setVisited] = React.useState([]);
    React.useEffect(() => {
      if (!record?.id) return;
      const stored = JSON.parse(localStorage.getItem(SW.key) || '[]');
      const id = String(record.id);
      if (!stored.includes(id)) {
        stored.push(id);
        localStorage.setItem(SW.key, JSON.stringify(stored));
      }
      setVisited(stored);
    }, [record?.id]);
    if (!record) return null;
    const p = record.params;
    const progress = Math.round(visited.length / SW.total * 100);
    const {
      bg,
      fill,
      text,
      sub,
      glow
    } = SW.colors;

    // Los CSS vars se ponen en .ob-show y los hereda .ob-card en cascada
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-show",
      style: {
        '--card-bg': bg,
        '--card-fill': fill,
        '--card-text': text,
        '--card-sub': sub,
        '--card-glow': glow
      }
    }, /*#__PURE__*/React__default.default.createElement("h2", {
      className: "ob-show__name"
    }, p.name), /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-show__stats"
    }, /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Nacimiento:"), " ", p.birth_year), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "G\xE9nero:"), "     ", p.gender), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Altura:"), "     ", p.height, " cm"), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Planeta ID:"), " ", p.homeworld)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-card__header"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "ob-card__title"
    }, SW.icon, " ", SW.label), /*#__PURE__*/React__default.default.createElement("span", {
      className: "ob-card__percent"
    }, progress, "%")), /*#__PURE__*/React__default.default.createElement("p", {
      className: "ob-card__count"
    }, visited.length, " de ", SW.total, " personajes visitados"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-bar"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-bar__fill",
      style: {
        width: `${progress}%`
      }
    }))));
  };

  const PKM = UNIVERSES_MAP['onebar_pokemon_visited'];
  const ShowPokemon = ({
    record
  }) => {
    const [visited, setVisited] = React.useState([]);
    const [details, setDetails] = React.useState(null);
    React.useEffect(() => {
      if (!record?.id) return;

      // Marca como visitado
      const stored = JSON.parse(localStorage.getItem(PKM.key) || '[]');
      const id = String(record.id);
      if (!stored.includes(id)) {
        stored.push(id);
        localStorage.setItem(PKM.key, JSON.stringify(stored));
      }
      setVisited(stored);

      // Carga detalles completos desde PokeAPI (tipos, stats, etc.)
      fetch(`https://pokeapi.co/api/v2/pokemon/${record.id}`).then(r => r.json()).then(setDetails);
    }, [record?.id]);
    if (!record) return null;
    const p = record.params;
    const progress = Math.round(visited.length / PKM.total * 100);
    const {
      bg,
      fill,
      text,
      sub,
      glow
    } = PKM.colors;
    const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
    const types = details?.types?.map(t => cap(t.type.name)).join(' / ') || '—';
    const height = details ? `${(details.height / 10).toFixed(1)} m` : '—';
    const weight = details ? `${(details.weight / 10).toFixed(1)} kg` : '—';
    const stat = name => details?.stats?.find(s => s.stat.name === name)?.base_stat ?? '—';
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-show",
      style: {
        '--card-bg': bg,
        '--card-fill': fill,
        '--card-text': text,
        '--card-sub': sub,
        '--card-glow': glow
      }
    }, /*#__PURE__*/React__default.default.createElement("h2", {
      className: "ob-show__name"
    }, "#", String(record.id).padStart(3, '0'), " ", p.name), /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-show__stats"
    }, /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Tipos:"), "   ", types), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Altura:"), "  ", height), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Peso:"), "    ", weight), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "HP:"), "      ", stat('hp')), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Ataque:"), "  ", stat('attack')), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Defensa:"), " ", stat('defense')), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Velocidad:"), stat('speed'))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-card__header"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "ob-card__title"
    }, PKM.icon, " ", PKM.label), /*#__PURE__*/React__default.default.createElement("span", {
      className: "ob-card__percent"
    }, progress, "%")), /*#__PURE__*/React__default.default.createElement("p", {
      className: "ob-card__count"
    }, visited.length, " de ", PKM.total, " Pok\xE9mon visitados"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-bar"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-bar__fill",
      style: {
        width: `${progress}%`
      }
    }))));
  };

  const HP = UNIVERSES_MAP['onebar_hp_visited'];
  const ShowHarryPotter = ({
    record
  }) => {
    const [visited, setVisited] = React.useState([]);
    React.useEffect(() => {
      if (!record?.id) return;
      const stored = JSON.parse(localStorage.getItem(HP.key) || '[]');
      const id = String(record.id);
      if (!stored.includes(id)) {
        stored.push(id);
        localStorage.setItem(HP.key, JSON.stringify(stored));
      }
      setVisited(stored);
    }, [record?.id]);
    if (!record) return null;
    const p = record.params;
    const progress = Math.round(visited.length / HP.total * 100);
    const {
      bg,
      fill,
      text,
      sub,
      glow
    } = HP.colors;
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-show",
      style: {
        '--card-bg': bg,
        '--card-fill': fill,
        '--card-text': text,
        '--card-sub': sub,
        '--card-glow': glow
      }
    }, /*#__PURE__*/React__default.default.createElement("h2", {
      className: "ob-show__name"
    }, p.name), /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-show__stats"
    }, /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Casa:"), "      ", p.house), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Especie:"), "   ", p.species), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "G\xE9nero:"), "    ", p.gender), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Sangre:"), "    ", p.ancestry), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Patronus:"), "  ", p.patronus), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Varita:"), "    ", p.wand), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Vivo:"), "      ", p.alive)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-card__header"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "ob-card__title"
    }, HP.icon, " ", HP.label), /*#__PURE__*/React__default.default.createElement("span", {
      className: "ob-card__percent"
    }, progress, "%")), /*#__PURE__*/React__default.default.createElement("p", {
      className: "ob-card__count"
    }, visited.length, " de ", HP.total, " personajes visitados"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-bar"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-bar__fill",
      style: {
        width: `${progress}%`
      }
    }))));
  };

  const NARUTO = UNIVERSES_MAP['onebar_naruto_visited'];
  const ShowNaruto = ({
    record
  }) => {
    const [visited, setVisited] = React.useState([]);
    React.useEffect(() => {
      if (!record?.id) return;
      const stored = JSON.parse(localStorage.getItem(NARUTO.key) || '[]');
      const id = String(record.id);
      if (!stored.includes(id)) {
        stored.push(id);
        localStorage.setItem(NARUTO.key, JSON.stringify(stored));
      }
      setVisited(stored);
    }, [record?.id]);
    if (!record) return null;
    const p = record.params;
    const progress = Math.round(visited.length / NARUTO.total * 100);
    const {
      bg,
      fill,
      text,
      sub,
      glow
    } = NARUTO.colors;
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-show",
      style: {
        '--card-bg': bg,
        '--card-fill': fill,
        '--card-text': text,
        '--card-sub': sub,
        '--card-glow': glow
      }
    }, /*#__PURE__*/React__default.default.createElement("h2", {
      className: "ob-show__name"
    }, p.name), /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-show__stats"
    }, /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "G\xE9nero:"), "       ", p.sex), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Estado:"), "       ", p.status), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Naturalezas:"), "  ", p.natureType || '—'), /*#__PURE__*/React__default.default.createElement("p", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Jutsus:"), "       ", p.jutsu || '—')), /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-card__header"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "ob-card__title"
    }, NARUTO.icon, " ", NARUTO.label), /*#__PURE__*/React__default.default.createElement("span", {
      className: "ob-card__percent"
    }, progress, "%")), /*#__PURE__*/React__default.default.createElement("p", {
      className: "ob-card__count"
    }, visited.length, " de ", NARUTO.total, " personajes visitados"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-bar"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-bar__fill",
      style: {
        width: `${progress}%`
      }
    }))));
  };

  // Barra de progreso de un universo
  // Los colores llegan via CSS custom properties en el style del wrapper
  const OneBar = ({
    universe
  }) => {
    const [visited, setVisited] = React.useState([]);
    React.useEffect(() => {
      const stored = JSON.parse(localStorage.getItem(universe.key) || '[]');
      setVisited(stored);
    }, [universe.key]);
    const progress = universe.total > 0 ? Math.round(visited.length / universe.total * 100) : 0;
    const {
      bg,
      fill,
      text,
      sub,
      glow
    } = universe.colors;
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-card",
      style: {
        '--card-bg': bg,
        '--card-fill': fill,
        '--card-text': text,
        '--card-sub': sub,
        '--card-glow': glow
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-card__header"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "ob-card__title"
    }, universe.icon, " ", universe.label), /*#__PURE__*/React__default.default.createElement("span", {
      className: "ob-card__percent"
    }, progress, "%")), /*#__PURE__*/React__default.default.createElement("p", {
      className: "ob-card__count"
    }, visited.length, " de ", universe.total, " explorados"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-bar"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "ob-bar__fill",
      style: {
        width: `${progress}%`
      }
    })));
  };
  const Dashboard = () => /*#__PURE__*/React__default.default.createElement("div", {
    className: "ob-dashboard"
  }, /*#__PURE__*/React__default.default.createElement("h1", {
    className: "ob-dashboard__title"
  }, "OneBar"), /*#__PURE__*/React__default.default.createElement("p", {
    className: "ob-dashboard__subtitle"
  }, "Tu progreso en cada universo"), /*#__PURE__*/React__default.default.createElement("div", {
    className: "ob-grid"
  }, UNIVERSES.map(u => /*#__PURE__*/React__default.default.createElement(OneBar, {
    key: u.key,
    universe: u
  }))), /*#__PURE__*/React__default.default.createElement("p", {
    className: "ob-dashboard__footer"
  }, "El progreso se guarda en este navegador. Visita personajes para avanzar."));

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.ShowCharacter = ShowCharacter;
  AdminJS.UserComponents.ShowPokemon = ShowPokemon;
  AdminJS.UserComponents.ShowHarryPotter = ShowHarryPotter;
  AdminJS.UserComponents.ShowNaruto = ShowNaruto;
  AdminJS.UserComponents.Dashboard = Dashboard;

})(React);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vY29uZmlnL3VuaXZlcnNlcy5qcyIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL1Nob3dDaGFyYWN0ZXIuanN4IiwiLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvU2hvd1Bva2Vtb24uanN4IiwiLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvU2hvd0hhcnJ5UG90dGVyLmpzeCIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL1Nob3dOYXJ1dG8uanN4IiwiLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvRGFzaGJvYXJkLmpzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBVTklWRVJTRVMgPSBbXG4gIHtcbiAgICBrZXk6ICAgJ29uZWJhcl9zd2FwaV92aXNpdGVkJyxcbiAgICBsYWJlbDogJ1N0YXIgV2FycycsXG4gICAgdG90YWw6IDgyLFxuICAgIGljb246ICAn8J+MjCcsXG4gICAgY29sb3JzOiB7XG4gICAgICBiZzogICAnIzFlMWUzYycsXG4gICAgICBmaWxsOiAnI0ZGRTgxRicsXG4gICAgICB0ZXh0OiAnI0ZGRTgxRicsXG4gICAgICBzdWI6ICAnIzc3NzdiYicsXG4gICAgICBnbG93OiAncmdiYSgyNTUsIDIzMiwgMzEsIDAuNDUpJyxcbiAgICB9LFxuICB9LFxuICB7XG4gICAga2V5OiAgICdvbmViYXJfcG9rZW1vbl92aXNpdGVkJyxcbiAgICBsYWJlbDogJ1Bva8OpbW9uJyxcbiAgICB0b3RhbDogMTUxLFxuICAgIGljb246ICAn4pqhJyxcbiAgICBjb2xvcnM6IHtcbiAgICAgIGJnOiAgICcjMTQyMDE0JyxcbiAgICAgIGZpbGw6ICcjRkZERTAwJyxcbiAgICAgIHRleHQ6ICcjRkZERTAwJyxcbiAgICAgIHN1YjogICcjNjY5OWFhJyxcbiAgICAgIGdsb3c6ICdyZ2JhKDI1NSwgMjIyLCAwLCAwLjQ1KScsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGtleTogICAnb25lYmFyX2hwX3Zpc2l0ZWQnLFxuICAgIGxhYmVsOiAnSGFycnkgUG90dGVyJyxcbiAgICB0b3RhbDogNTAsXG4gICAgaWNvbjogICfwn6eZJyxcbiAgICBjb2xvcnM6IHtcbiAgICAgIGJnOiAgICcjMWUxODA4JyxcbiAgICAgIGZpbGw6ICcjQzVBMDI4JyxcbiAgICAgIHRleHQ6ICcjQzVBMDI4JyxcbiAgICAgIHN1YjogICcjODg3NzU1JyxcbiAgICAgIGdsb3c6ICdyZ2JhKDE5NywgMTYwLCA0MCwgMC40NSknLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBrZXk6ICAgJ29uZWJhcl9uYXJ1dG9fdmlzaXRlZCcsXG4gICAgbGFiZWw6ICdOYXJ1dG8nLFxuICAgIHRvdGFsOiAxNTAsXG4gICAgaWNvbjogICfwn42DJyxcbiAgICBjb2xvcnM6IHtcbiAgICAgIGJnOiAgICcjMWUxNDA4JyxcbiAgICAgIGZpbGw6ICcjRkY3MzAwJyxcbiAgICAgIHRleHQ6ICcjRkY3MzAwJyxcbiAgICAgIHN1YjogICcjOTk2NjQ0JyxcbiAgICAgIGdsb3c6ICdyZ2JhKDI1NSwgMTE1LCAwLCAwLjQ1KScsXG4gICAgfSxcbiAgfSxcbl1cblxuZXhwb3J0IGNvbnN0IFVOSVZFUlNFU19NQVAgPSBPYmplY3QuZnJvbUVudHJpZXMoVU5JVkVSU0VTLm1hcCh1ID0+IFt1LmtleSwgdV0pKVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFVOSVZFUlNFU19NQVAgfSBmcm9tICcuLi9jb25maWcvdW5pdmVyc2VzLmpzJ1xuXG5jb25zdCBTVyA9IFVOSVZFUlNFU19NQVBbJ29uZWJhcl9zd2FwaV92aXNpdGVkJ11cblxuY29uc3QgU2hvd0NoYXJhY3RlciA9ICh7IHJlY29yZCB9KSA9PiB7XG4gIGNvbnN0IFt2aXNpdGVkLCBzZXRWaXNpdGVkXSA9IHVzZVN0YXRlKFtdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFyZWNvcmQ/LmlkKSByZXR1cm5cblxuICAgIGNvbnN0IHN0b3JlZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oU1cua2V5KSB8fCAnW10nKVxuICAgIGNvbnN0IGlkID0gU3RyaW5nKHJlY29yZC5pZClcbiAgICBpZiAoIXN0b3JlZC5pbmNsdWRlcyhpZCkpIHtcbiAgICAgIHN0b3JlZC5wdXNoKGlkKVxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1cua2V5LCBKU09OLnN0cmluZ2lmeShzdG9yZWQpKVxuICAgIH1cbiAgICBzZXRWaXNpdGVkKHN0b3JlZClcbiAgfSwgW3JlY29yZD8uaWRdKVxuXG4gIGlmICghcmVjb3JkKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IHAgICAgICAgID0gcmVjb3JkLnBhcmFtc1xuICBjb25zdCBwcm9ncmVzcyA9IE1hdGgucm91bmQoKHZpc2l0ZWQubGVuZ3RoIC8gU1cudG90YWwpICogMTAwKVxuICBjb25zdCB7IGJnLCBmaWxsLCB0ZXh0LCBzdWIsIGdsb3cgfSA9IFNXLmNvbG9yc1xuXG4gIC8vIExvcyBDU1MgdmFycyBzZSBwb25lbiBlbiAub2Itc2hvdyB5IGxvcyBoZXJlZGEgLm9iLWNhcmQgZW4gY2FzY2FkYVxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT1cIm9iLXNob3dcIlxuICAgICAgc3R5bGU9e3sgJy0tY2FyZC1iZyc6IGJnLCAnLS1jYXJkLWZpbGwnOiBmaWxsLCAnLS1jYXJkLXRleHQnOiB0ZXh0LCAnLS1jYXJkLXN1Yic6IHN1YiwgJy0tY2FyZC1nbG93JzogZ2xvdyB9fVxuICAgID5cbiAgICAgIDxoMiBjbGFzc05hbWU9XCJvYi1zaG93X19uYW1lXCI+e3AubmFtZX08L2gyPlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9iLXNob3dfX3N0YXRzXCI+XG4gICAgICAgIDxwPjxzdHJvbmc+TmFjaW1pZW50bzo8L3N0cm9uZz4ge3AuYmlydGhfeWVhcn08L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+R8OpbmVybzo8L3N0cm9uZz4gICAgIHtwLmdlbmRlcn08L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+QWx0dXJhOjwvc3Ryb25nPiAgICAge3AuaGVpZ2h0fSBjbTwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5QbGFuZXRhIElEOjwvc3Ryb25nPiB7cC5ob21ld29ybGR9PC9wPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2ItY2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9iLWNhcmRfX2hlYWRlclwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm9iLWNhcmRfX3RpdGxlXCI+e1NXLmljb259IHtTVy5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwib2ItY2FyZF9fcGVyY2VudFwiPntwcm9ncmVzc30lPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwib2ItY2FyZF9fY291bnRcIj57dmlzaXRlZC5sZW5ndGh9IGRlIHtTVy50b3RhbH0gcGVyc29uYWplcyB2aXNpdGFkb3M8L3A+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2ItYmFyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYi1iYXJfX2ZpbGxcIiBzdHlsZT17eyB3aWR0aDogYCR7cHJvZ3Jlc3N9JWAgfX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaG93Q2hhcmFjdGVyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgVU5JVkVSU0VTX01BUCB9IGZyb20gJy4uL2NvbmZpZy91bml2ZXJzZXMuanMnXG5cbmNvbnN0IFBLTSA9IFVOSVZFUlNFU19NQVBbJ29uZWJhcl9wb2tlbW9uX3Zpc2l0ZWQnXVxuXG5jb25zdCBTaG93UG9rZW1vbiA9ICh7IHJlY29yZCB9KSA9PiB7XG4gIGNvbnN0IFt2aXNpdGVkLCBzZXRWaXNpdGVkXSA9IHVzZVN0YXRlKFtdKVxuICBjb25zdCBbZGV0YWlscywgc2V0RGV0YWlsc10gPSB1c2VTdGF0ZShudWxsKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFyZWNvcmQ/LmlkKSByZXR1cm5cblxuICAgIC8vIE1hcmNhIGNvbW8gdmlzaXRhZG9cbiAgICBjb25zdCBzdG9yZWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFBLTS5rZXkpIHx8ICdbXScpXG4gICAgY29uc3QgaWQgPSBTdHJpbmcocmVjb3JkLmlkKVxuICAgIGlmICghc3RvcmVkLmluY2x1ZGVzKGlkKSkge1xuICAgICAgc3RvcmVkLnB1c2goaWQpXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShQS00ua2V5LCBKU09OLnN0cmluZ2lmeShzdG9yZWQpKVxuICAgIH1cbiAgICBzZXRWaXNpdGVkKHN0b3JlZClcblxuICAgIC8vIENhcmdhIGRldGFsbGVzIGNvbXBsZXRvcyBkZXNkZSBQb2tlQVBJICh0aXBvcywgc3RhdHMsIGV0Yy4pXG4gICAgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke3JlY29yZC5pZH1gKVxuICAgICAgLnRoZW4ociA9PiByLmpzb24oKSlcbiAgICAgIC50aGVuKHNldERldGFpbHMpXG4gIH0sIFtyZWNvcmQ/LmlkXSlcblxuICBpZiAoIXJlY29yZCkgcmV0dXJuIG51bGxcblxuICBjb25zdCBwICAgICAgICA9IHJlY29yZC5wYXJhbXNcbiAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLnJvdW5kKCh2aXNpdGVkLmxlbmd0aCAvIFBLTS50b3RhbCkgKiAxMDApXG4gIGNvbnN0IHsgYmcsIGZpbGwsIHRleHQsIHN1YiwgZ2xvdyB9ID0gUEtNLmNvbG9yc1xuXG4gIGNvbnN0IGNhcCAgICA9IHMgPT4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc2xpY2UoMSlcbiAgY29uc3QgdHlwZXMgID0gZGV0YWlscz8udHlwZXM/Lm1hcCh0ID0+IGNhcCh0LnR5cGUubmFtZSkpLmpvaW4oJyAvICcpIHx8ICfigJQnXG4gIGNvbnN0IGhlaWdodCA9IGRldGFpbHMgPyBgJHsoZGV0YWlscy5oZWlnaHQgLyAxMCkudG9GaXhlZCgxKX0gbWAgIDogJ+KAlCdcbiAgY29uc3Qgd2VpZ2h0ID0gZGV0YWlscyA/IGAkeyhkZXRhaWxzLndlaWdodCAvIDEwKS50b0ZpeGVkKDEpfSBrZ2AgOiAn4oCUJ1xuICBjb25zdCBzdGF0ICAgPSBuYW1lICA9PiBkZXRhaWxzPy5zdGF0cz8uZmluZChzID0+IHMuc3RhdC5uYW1lID09PSBuYW1lKT8uYmFzZV9zdGF0ID8/ICfigJQnXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9XCJvYi1zaG93XCJcbiAgICAgIHN0eWxlPXt7ICctLWNhcmQtYmcnOiBiZywgJy0tY2FyZC1maWxsJzogZmlsbCwgJy0tY2FyZC10ZXh0JzogdGV4dCwgJy0tY2FyZC1zdWInOiBzdWIsICctLWNhcmQtZ2xvdyc6IGdsb3cgfX1cbiAgICA+XG4gICAgICA8aDIgY2xhc3NOYW1lPVwib2Itc2hvd19fbmFtZVwiPlxuICAgICAgICAje1N0cmluZyhyZWNvcmQuaWQpLnBhZFN0YXJ0KDMsICcwJyl9IHtwLm5hbWV9XG4gICAgICA8L2gyPlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9iLXNob3dfX3N0YXRzXCI+XG4gICAgICAgIDxwPjxzdHJvbmc+VGlwb3M6PC9zdHJvbmc+ICAge3R5cGVzfTwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5BbHR1cmE6PC9zdHJvbmc+ICB7aGVpZ2h0fTwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5QZXNvOjwvc3Ryb25nPiAgICB7d2VpZ2h0fTwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5IUDo8L3N0cm9uZz4gICAgICB7c3RhdCgnaHAnKX08L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+QXRhcXVlOjwvc3Ryb25nPiAge3N0YXQoJ2F0dGFjaycpfTwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5EZWZlbnNhOjwvc3Ryb25nPiB7c3RhdCgnZGVmZW5zZScpfTwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5WZWxvY2lkYWQ6PC9zdHJvbmc+e3N0YXQoJ3NwZWVkJyl9PC9wPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2ItY2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9iLWNhcmRfX2hlYWRlclwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm9iLWNhcmRfX3RpdGxlXCI+e1BLTS5pY29ufSB7UEtNLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvYi1jYXJkX19wZXJjZW50XCI+e3Byb2dyZXNzfSU8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJvYi1jYXJkX19jb3VudFwiPnt2aXNpdGVkLmxlbmd0aH0gZGUge1BLTS50b3RhbH0gUG9rw6ltb24gdmlzaXRhZG9zPC9wPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9iLWJhclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2ItYmFyX19maWxsXCIgc3R5bGU9e3sgd2lkdGg6IGAke3Byb2dyZXNzfSVgIH19IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hvd1Bva2Vtb25cbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBVTklWRVJTRVNfTUFQIH0gZnJvbSAnLi4vY29uZmlnL3VuaXZlcnNlcy5qcydcblxuY29uc3QgSFAgPSBVTklWRVJTRVNfTUFQWydvbmViYXJfaHBfdmlzaXRlZCddXG5cbmNvbnN0IFNob3dIYXJyeVBvdHRlciA9ICh7IHJlY29yZCB9KSA9PiB7XG4gIGNvbnN0IFt2aXNpdGVkLCBzZXRWaXNpdGVkXSA9IHVzZVN0YXRlKFtdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFyZWNvcmQ/LmlkKSByZXR1cm5cblxuICAgIGNvbnN0IHN0b3JlZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oSFAua2V5KSB8fCAnW10nKVxuICAgIGNvbnN0IGlkID0gU3RyaW5nKHJlY29yZC5pZClcbiAgICBpZiAoIXN0b3JlZC5pbmNsdWRlcyhpZCkpIHtcbiAgICAgIHN0b3JlZC5wdXNoKGlkKVxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oSFAua2V5LCBKU09OLnN0cmluZ2lmeShzdG9yZWQpKVxuICAgIH1cbiAgICBzZXRWaXNpdGVkKHN0b3JlZClcbiAgfSwgW3JlY29yZD8uaWRdKVxuXG4gIGlmICghcmVjb3JkKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IHAgICAgICAgID0gcmVjb3JkLnBhcmFtc1xuICBjb25zdCBwcm9ncmVzcyA9IE1hdGgucm91bmQoKHZpc2l0ZWQubGVuZ3RoIC8gSFAudG90YWwpICogMTAwKVxuICBjb25zdCB7IGJnLCBmaWxsLCB0ZXh0LCBzdWIsIGdsb3cgfSA9IEhQLmNvbG9yc1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPVwib2Itc2hvd1wiXG4gICAgICBzdHlsZT17eyAnLS1jYXJkLWJnJzogYmcsICctLWNhcmQtZmlsbCc6IGZpbGwsICctLWNhcmQtdGV4dCc6IHRleHQsICctLWNhcmQtc3ViJzogc3ViLCAnLS1jYXJkLWdsb3cnOiBnbG93IH19XG4gICAgPlxuICAgICAgPGgyIGNsYXNzTmFtZT1cIm9iLXNob3dfX25hbWVcIj57cC5uYW1lfTwvaDI+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2Itc2hvd19fc3RhdHNcIj5cbiAgICAgICAgPHA+PHN0cm9uZz5DYXNhOjwvc3Ryb25nPiAgICAgIHtwLmhvdXNlfTwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5Fc3BlY2llOjwvc3Ryb25nPiAgIHtwLnNwZWNpZXN9PC9wPlxuICAgICAgICA8cD48c3Ryb25nPkfDqW5lcm86PC9zdHJvbmc+ICAgIHtwLmdlbmRlcn08L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+U2FuZ3JlOjwvc3Ryb25nPiAgICB7cC5hbmNlc3RyeX08L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+UGF0cm9udXM6PC9zdHJvbmc+ICB7cC5wYXRyb251c308L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+VmFyaXRhOjwvc3Ryb25nPiAgICB7cC53YW5kfTwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5WaXZvOjwvc3Ryb25nPiAgICAgIHtwLmFsaXZlfTwvcD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9iLWNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYi1jYXJkX19oZWFkZXJcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvYi1jYXJkX190aXRsZVwiPntIUC5pY29ufSB7SFAubGFiZWx9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm9iLWNhcmRfX3BlcmNlbnRcIj57cHJvZ3Jlc3N9JTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cIm9iLWNhcmRfX2NvdW50XCI+e3Zpc2l0ZWQubGVuZ3RofSBkZSB7SFAudG90YWx9IHBlcnNvbmFqZXMgdmlzaXRhZG9zPC9wPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9iLWJhclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2ItYmFyX19maWxsXCIgc3R5bGU9e3sgd2lkdGg6IGAke3Byb2dyZXNzfSVgIH19IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hvd0hhcnJ5UG90dGVyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgVU5JVkVSU0VTX01BUCB9IGZyb20gJy4uL2NvbmZpZy91bml2ZXJzZXMuanMnXG5cbmNvbnN0IE5BUlVUTyA9IFVOSVZFUlNFU19NQVBbJ29uZWJhcl9uYXJ1dG9fdmlzaXRlZCddXG5cbmNvbnN0IFNob3dOYXJ1dG8gPSAoeyByZWNvcmQgfSkgPT4ge1xuICBjb25zdCBbdmlzaXRlZCwgc2V0VmlzaXRlZF0gPSB1c2VTdGF0ZShbXSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcmVjb3JkPy5pZCkgcmV0dXJuXG5cbiAgICBjb25zdCBzdG9yZWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKE5BUlVUTy5rZXkpIHx8ICdbXScpXG4gICAgY29uc3QgaWQgPSBTdHJpbmcocmVjb3JkLmlkKVxuICAgIGlmICghc3RvcmVkLmluY2x1ZGVzKGlkKSkge1xuICAgICAgc3RvcmVkLnB1c2goaWQpXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShOQVJVVE8ua2V5LCBKU09OLnN0cmluZ2lmeShzdG9yZWQpKVxuICAgIH1cbiAgICBzZXRWaXNpdGVkKHN0b3JlZClcbiAgfSwgW3JlY29yZD8uaWRdKVxuXG4gIGlmICghcmVjb3JkKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IHAgICAgICAgID0gcmVjb3JkLnBhcmFtc1xuICBjb25zdCBwcm9ncmVzcyA9IE1hdGgucm91bmQoKHZpc2l0ZWQubGVuZ3RoIC8gTkFSVVRPLnRvdGFsKSAqIDEwMClcbiAgY29uc3QgeyBiZywgZmlsbCwgdGV4dCwgc3ViLCBnbG93IH0gPSBOQVJVVE8uY29sb3JzXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9XCJvYi1zaG93XCJcbiAgICAgIHN0eWxlPXt7ICctLWNhcmQtYmcnOiBiZywgJy0tY2FyZC1maWxsJzogZmlsbCwgJy0tY2FyZC10ZXh0JzogdGV4dCwgJy0tY2FyZC1zdWInOiBzdWIsICctLWNhcmQtZ2xvdyc6IGdsb3cgfX1cbiAgICA+XG4gICAgICA8aDIgY2xhc3NOYW1lPVwib2Itc2hvd19fbmFtZVwiPntwLm5hbWV9PC9oMj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYi1zaG93X19zdGF0c1wiPlxuICAgICAgICA8cD48c3Ryb25nPkfDqW5lcm86PC9zdHJvbmc+ICAgICAgIHtwLnNleH08L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+RXN0YWRvOjwvc3Ryb25nPiAgICAgICB7cC5zdGF0dXN9PC9wPlxuICAgICAgICA8cD48c3Ryb25nPk5hdHVyYWxlemFzOjwvc3Ryb25nPiAge3AubmF0dXJlVHlwZSB8fCAn4oCUJ308L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+SnV0c3VzOjwvc3Ryb25nPiAgICAgICB7cC5qdXRzdSB8fCAn4oCUJ308L3A+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYi1jYXJkXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2ItY2FyZF9faGVhZGVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwib2ItY2FyZF9fdGl0bGVcIj57TkFSVVRPLmljb259IHtOQVJVVE8ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm9iLWNhcmRfX3BlcmNlbnRcIj57cHJvZ3Jlc3N9JTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cIm9iLWNhcmRfX2NvdW50XCI+e3Zpc2l0ZWQubGVuZ3RofSBkZSB7TkFSVVRPLnRvdGFsfSBwZXJzb25hamVzIHZpc2l0YWRvczwvcD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYi1iYXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9iLWJhcl9fZmlsbFwiIHN0eWxlPXt7IHdpZHRoOiBgJHtwcm9ncmVzc30lYCB9fSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dOYXJ1dG9cbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBVTklWRVJTRVMgfSBmcm9tICcuLi9jb25maWcvdW5pdmVyc2VzLmpzJ1xuXG4vLyBCYXJyYSBkZSBwcm9ncmVzbyBkZSB1biB1bml2ZXJzb1xuLy8gTG9zIGNvbG9yZXMgbGxlZ2FuIHZpYSBDU1MgY3VzdG9tIHByb3BlcnRpZXMgZW4gZWwgc3R5bGUgZGVsIHdyYXBwZXJcbmNvbnN0IE9uZUJhciA9ICh7IHVuaXZlcnNlIH0pID0+IHtcbiAgY29uc3QgW3Zpc2l0ZWQsIHNldFZpc2l0ZWRdID0gdXNlU3RhdGUoW10pXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBzdG9yZWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHVuaXZlcnNlLmtleSkgfHwgJ1tdJylcbiAgICBzZXRWaXNpdGVkKHN0b3JlZClcbiAgfSwgW3VuaXZlcnNlLmtleV0pXG5cbiAgY29uc3QgcHJvZ3Jlc3MgPSB1bml2ZXJzZS50b3RhbCA+IDBcbiAgICA/IE1hdGgucm91bmQoKHZpc2l0ZWQubGVuZ3RoIC8gdW5pdmVyc2UudG90YWwpICogMTAwKVxuICAgIDogMFxuXG4gIGNvbnN0IHsgYmcsIGZpbGwsIHRleHQsIHN1YiwgZ2xvdyB9ID0gdW5pdmVyc2UuY29sb3JzXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9XCJvYi1jYXJkXCJcbiAgICAgIHN0eWxlPXt7ICctLWNhcmQtYmcnOiBiZywgJy0tY2FyZC1maWxsJzogZmlsbCwgJy0tY2FyZC10ZXh0JzogdGV4dCwgJy0tY2FyZC1zdWInOiBzdWIsICctLWNhcmQtZ2xvdyc6IGdsb3cgfX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9iLWNhcmRfX2hlYWRlclwiPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvYi1jYXJkX190aXRsZVwiPnt1bml2ZXJzZS5pY29ufSB7dW5pdmVyc2UubGFiZWx9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvYi1jYXJkX19wZXJjZW50XCI+e3Byb2dyZXNzfSU8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxwIGNsYXNzTmFtZT1cIm9iLWNhcmRfX2NvdW50XCI+e3Zpc2l0ZWQubGVuZ3RofSBkZSB7dW5pdmVyc2UudG90YWx9IGV4cGxvcmFkb3M8L3A+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9iLWJhclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9iLWJhcl9fZmlsbFwiIHN0eWxlPXt7IHdpZHRoOiBgJHtwcm9ncmVzc30lYCB9fSAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuY29uc3QgRGFzaGJvYXJkID0gKCkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cIm9iLWRhc2hib2FyZFwiPlxuICAgIDxoMSBjbGFzc05hbWU9XCJvYi1kYXNoYm9hcmRfX3RpdGxlXCI+T25lQmFyPC9oMT5cbiAgICA8cCBjbGFzc05hbWU9XCJvYi1kYXNoYm9hcmRfX3N1YnRpdGxlXCI+VHUgcHJvZ3Jlc28gZW4gY2FkYSB1bml2ZXJzbzwvcD5cblxuICAgIDxkaXYgY2xhc3NOYW1lPVwib2ItZ3JpZFwiPlxuICAgICAge1VOSVZFUlNFUy5tYXAodSA9PiA8T25lQmFyIGtleT17dS5rZXl9IHVuaXZlcnNlPXt1fSAvPil9XG4gICAgPC9kaXY+XG5cbiAgICA8cCBjbGFzc05hbWU9XCJvYi1kYXNoYm9hcmRfX2Zvb3RlclwiPlxuICAgICAgRWwgcHJvZ3Jlc28gc2UgZ3VhcmRhIGVuIGVzdGUgbmF2ZWdhZG9yLlxuICAgICAgVmlzaXRhIHBlcnNvbmFqZXMgcGFyYSBhdmFuemFyLlxuICAgIDwvcD5cbiAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFxuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgU2hvd0NoYXJhY3RlciBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9TaG93Q2hhcmFjdGVyJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5TaG93Q2hhcmFjdGVyID0gU2hvd0NoYXJhY3RlclxuaW1wb3J0IFNob3dQb2tlbW9uIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL1Nob3dQb2tlbW9uJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5TaG93UG9rZW1vbiA9IFNob3dQb2tlbW9uXG5pbXBvcnQgU2hvd0hhcnJ5UG90dGVyIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL1Nob3dIYXJyeVBvdHRlcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuU2hvd0hhcnJ5UG90dGVyID0gU2hvd0hhcnJ5UG90dGVyXG5pbXBvcnQgU2hvd05hcnV0byBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9TaG93TmFydXRvJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5TaG93TmFydXRvID0gU2hvd05hcnV0b1xuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9EYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZCA9IERhc2hib2FyZCJdLCJuYW1lcyI6WyJVTklWRVJTRVMiLCJrZXkiLCJsYWJlbCIsInRvdGFsIiwiaWNvbiIsImNvbG9ycyIsImJnIiwiZmlsbCIsInRleHQiLCJzdWIiLCJnbG93IiwiVU5JVkVSU0VTX01BUCIsIk9iamVjdCIsImZyb21FbnRyaWVzIiwibWFwIiwidSIsIlNXIiwiU2hvd0NoYXJhY3RlciIsInJlY29yZCIsInZpc2l0ZWQiLCJzZXRWaXNpdGVkIiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJpZCIsInN0b3JlZCIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJTdHJpbmciLCJpbmNsdWRlcyIsInB1c2giLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwicCIsInBhcmFtcyIsInByb2dyZXNzIiwiTWF0aCIsInJvdW5kIiwibGVuZ3RoIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwic3R5bGUiLCJuYW1lIiwiYmlydGhfeWVhciIsImdlbmRlciIsImhlaWdodCIsImhvbWV3b3JsZCIsIndpZHRoIiwiUEtNIiwiU2hvd1Bva2Vtb24iLCJkZXRhaWxzIiwic2V0RGV0YWlscyIsImZldGNoIiwidGhlbiIsInIiLCJqc29uIiwiY2FwIiwicyIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0eXBlcyIsInQiLCJ0eXBlIiwiam9pbiIsInRvRml4ZWQiLCJ3ZWlnaHQiLCJzdGF0Iiwic3RhdHMiLCJmaW5kIiwiYmFzZV9zdGF0IiwicGFkU3RhcnQiLCJIUCIsIlNob3dIYXJyeVBvdHRlciIsImhvdXNlIiwic3BlY2llcyIsImFuY2VzdHJ5IiwicGF0cm9udXMiLCJ3YW5kIiwiYWxpdmUiLCJOQVJVVE8iLCJTaG93TmFydXRvIiwic2V4Iiwic3RhdHVzIiwibmF0dXJlVHlwZSIsImp1dHN1IiwiT25lQmFyIiwidW5pdmVyc2UiLCJEYXNoYm9hcmQiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFBTyxNQUFNQSxTQUFTLEdBQUcsQ0FDdkI7RUFDRUMsRUFBQUEsR0FBRyxFQUFJLHNCQUFzQjtFQUM3QkMsRUFBQUEsS0FBSyxFQUFFLFdBQVc7RUFDbEJDLEVBQUFBLEtBQUssRUFBRSxFQUFFO0VBQ1RDLEVBQUFBLElBQUksRUFBRyxJQUFJO0VBQ1hDLEVBQUFBLE1BQU0sRUFBRTtFQUNOQyxJQUFBQSxFQUFFLEVBQUksU0FBUztFQUNmQyxJQUFBQSxJQUFJLEVBQUUsU0FBUztFQUNmQyxJQUFBQSxJQUFJLEVBQUUsU0FBUztFQUNmQyxJQUFBQSxHQUFHLEVBQUcsU0FBUztFQUNmQyxJQUFBQSxJQUFJLEVBQUU7RUFDUjtFQUNGLENBQUMsRUFDRDtFQUNFVCxFQUFBQSxHQUFHLEVBQUksd0JBQXdCO0VBQy9CQyxFQUFBQSxLQUFLLEVBQUUsU0FBUztFQUNoQkMsRUFBQUEsS0FBSyxFQUFFLEdBQUc7RUFDVkMsRUFBQUEsSUFBSSxFQUFHLEdBQUc7RUFDVkMsRUFBQUEsTUFBTSxFQUFFO0VBQ05DLElBQUFBLEVBQUUsRUFBSSxTQUFTO0VBQ2ZDLElBQUFBLElBQUksRUFBRSxTQUFTO0VBQ2ZDLElBQUFBLElBQUksRUFBRSxTQUFTO0VBQ2ZDLElBQUFBLEdBQUcsRUFBRyxTQUFTO0VBQ2ZDLElBQUFBLElBQUksRUFBRTtFQUNSO0VBQ0YsQ0FBQyxFQUNEO0VBQ0VULEVBQUFBLEdBQUcsRUFBSSxtQkFBbUI7RUFDMUJDLEVBQUFBLEtBQUssRUFBRSxjQUFjO0VBQ3JCQyxFQUFBQSxLQUFLLEVBQUUsRUFBRTtFQUNUQyxFQUFBQSxJQUFJLEVBQUcsSUFBSTtFQUNYQyxFQUFBQSxNQUFNLEVBQUU7RUFDTkMsSUFBQUEsRUFBRSxFQUFJLFNBQVM7RUFDZkMsSUFBQUEsSUFBSSxFQUFFLFNBQVM7RUFDZkMsSUFBQUEsSUFBSSxFQUFFLFNBQVM7RUFDZkMsSUFBQUEsR0FBRyxFQUFHLFNBQVM7RUFDZkMsSUFBQUEsSUFBSSxFQUFFO0VBQ1I7RUFDRixDQUFDLEVBQ0Q7RUFDRVQsRUFBQUEsR0FBRyxFQUFJLHVCQUF1QjtFQUM5QkMsRUFBQUEsS0FBSyxFQUFFLFFBQVE7RUFDZkMsRUFBQUEsS0FBSyxFQUFFLEdBQUc7RUFDVkMsRUFBQUEsSUFBSSxFQUFHLElBQUk7RUFDWEMsRUFBQUEsTUFBTSxFQUFFO0VBQ05DLElBQUFBLEVBQUUsRUFBSSxTQUFTO0VBQ2ZDLElBQUFBLElBQUksRUFBRSxTQUFTO0VBQ2ZDLElBQUFBLElBQUksRUFBRSxTQUFTO0VBQ2ZDLElBQUFBLEdBQUcsRUFBRyxTQUFTO0VBQ2ZDLElBQUFBLElBQUksRUFBRTtFQUNSO0VBQ0YsQ0FBQyxDQUNGO0VBRU0sTUFBTUMsYUFBYSxHQUFHQyxNQUFNLENBQUNDLFdBQVcsQ0FBQ2IsU0FBUyxDQUFDYyxHQUFHLENBQUNDLENBQUMsSUFBSSxDQUFDQSxDQUFDLENBQUNkLEdBQUcsRUFBRWMsQ0FBQyxDQUFD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
