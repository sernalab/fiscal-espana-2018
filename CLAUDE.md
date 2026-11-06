# fiscal-espana-2018

Web interactiva (React 19 + Vite + recharts) sobre lo que ha hecho el Gobierno central de España
con los impuestos desde junio de 2018: qué subió, qué bajó y qué se creó, señalando lo que viene
impuesto por la UE.

**Regla dura del proyecto: todo dato mostrado debe ser trazable a fuente oficial.** Si una cifra no
está en `research/`, no va a la web. La trazabilidad completa está en `fuentes.md`.

## Gotchas

- **Hay DOS `package.json` y no son un monorepo.** El de la raíz existe solo para
  `extract-aeat.js` (única dependencia: `xlsx`) y su `npm test` es el placeholder de `npm init`.
  La aplicación real es `app/` (React + Vite): `npm install`, `npm run dev` y `npm run build` se
  ejecutan **dentro de `app/`**.

- **`netlify.toml` vive en `app/`, no en la raíz** (`app/netlify.toml`: `command = "npm run build"`,
  `publish = "dist"`, más el redirect SPA `/* → /index.html`). El site de Netlify necesita base
  directory `app/`; desde la raíz el build no encuentra nada.

- **Los JSON de datos están DUPLICADOS a mano y no hay script de copia.** Seis ficheros existen por
  partida doble en `research/` y en `app/src/data/`: `aeat-verificado.json`, `estatales.json`,
  `autonomicos.json`, `locales.json`, `eurostat-verificado.json`, `conteos-caveats.json`.
  Verificado por md5: **hoy los seis pares son byte-idénticos**. `research/` es la fuente; si
  editas ahí, copia manualmente a `app/src/data/` o la web seguirá mostrando datos viejos sin
  avisar. (`research/series.json` es el único que no tiene copia en la app.)

- **`extract-aeat.js` usa rutas relativas y hay que lanzarlo desde la raíz del repo**: lee
  `research/Cuadros_IART25.xlsx` (`extract-aeat.js:6`) y escribe `research/aeat-verificado.json`
  (`extract-aeat.js:37-38`). Después toca propagar el resultado a `app/src/data/` a mano.

- **Los índices de fila y columna del Excel de la AEAT están hardcodeados** en `extract-aeat.js`
  (mapa `FILAS`, y `col(anio) = 2 + (anio - 1995)`). Si llega un `Cuadros_IART*.xlsx` nuevo con
  otra maquetación, el extractor sacará números incorrectos **en silencio**, no petará. Hay que
  revalidar las filas contra los cuadros 1.5 y 1.6 antes de fiarse.

- **Cada JSON de `research/` tiene su `*-notas.md` hermano** (`estatales-notas.md`,
  `autonomicos-notas.md`, `locales-notas.md`, `series-notas.md`, `conteos-caveats-notas.md`) con
  los caveats y los límites del dato. Léelo antes de reinterpretar cualquier cifra. Hay
  referencias autonómicas marcadas explícitamente como `no_verificado`.

- **`app/src/data/sintesis.js` es la capa que normaliza la investigación para la UI.** Todo cambio
  de forma de los datos pasa por ahí; los componentes (`Charts.jsx`, `Sections.jsx`,
  `TaxExplorer.jsx`) consumen ya lo normalizado.

## Pendiente de rellenar

- [PENDIENTE: preguntar a Carles] ¿La duplicación `research/` → `app/src/data/` es intencionada, o
  interesa un script `sync-data` que la automatice?
- [PENDIENTE: preguntar a Carles] ¿El proyecto se actualiza con cada Informe Anual de Recaudación
  de la AEAT, o es una foto fija cerrada en 2025?
