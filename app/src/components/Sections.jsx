import {
  VEREDICTO_GLOBAL, resumenCCAA, valorReferencia, municipioContraste,
  conteosSubidas, factChecks, conteoBajadas, caveats, nuevasFiguras2025,
} from '../data/sintesis';

const ETIQUETAS = {
  parcial: { label: 'PARCIALMENTE CIERTA', color: '#d9952a' },
  'no-atribuible': { label: 'NO ATRIBUIBLE', color: '#0d9488' },
  falsa: { label: 'ATRIBUCIÓN FALSA', color: '#d64545' },
  'verificado-matiz': { label: 'CIERTA CON MATIZ', color: '#7c5cd6' },
};

// ---------- Hero ----------
export function Hero() {
  return (
    <header className="hero">
      <div className="container">
        <p className="hero-kicker">Verificación con fuentes oficiales · Eurostat · AEAT · BOE · junio 2026</p>
        <h1>¿Han subido «prácticamente todos los impuestos» desde junio de 2018?</h1>
        <blockquote className="hero-claim">{VEREDICTO_GLOBAL.afirmacion}</blockquote>
        <p className="hero-resumen">{VEREDICTO_GLOBAL.resumen}</p>
        <div className="hero-verdicts">
          {VEREDICTO_GLOBAL.porNivel.map((v) => (
            <div className="verdict-card" key={v.nivel}>
              <span className="verdict-tag" style={{ background: ETIQUETAS[v.etiqueta].color }}>
                {ETIQUETAS[v.etiqueta].label}
              </span>
              <h3>{v.nivel}</h3>
              <p className="verdict-title">{v.titulo}</p>
              <p className="verdict-text">{v.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

// ---------- ¿Quién decide qué? ----------
const CADENAS = [
  {
    titulo: 'Tasa de basuras',
    pasos: [
      { quien: 'UE', que: 'Directiva (UE) 2018/851: «quien contamina paga», recuperación de costes', tipo: 'obliga' },
      { quien: 'Cortes (Gobierno Sánchez)', que: 'Ley 7/2022, art. 11.3: tasa específica, diferenciada y NO deficitaria antes de abril 2025', tipo: 'obliga' },
      { quien: 'Tu ayuntamiento', que: 'Fija el importe, los tramos y el modelo en su ordenanza fiscal', tipo: 'fija' },
    ],
    nota: 'Media 2025: 116,32 €/vivienda (+16,2 %). Cobertura media de costes: solo 65,5 % — la mayoría aún incumple el «no déficit» (Observatorio Fundació ENT, 131 municipios).',
  },
  {
    titulo: 'Impuesto de circulación (IVTM)',
    pasos: [
      { quien: 'Estado', que: 'Tarifas base del art. 95 TRLHL — congeladas desde 2003, ningún gobierno las ha tocado', tipo: 'marco' },
      { quien: 'Tu ayuntamiento', que: 'Aplica un coeficiente de hasta ×2 y decide bonificaciones (eléctricos, históricos…)', tipo: 'fija' },
    ],
    nota: 'Barcelona lo congeló en 2025; Begues (7.439 hab.) subió su coeficiente 1,66→1,70 — primera vez desde 2009. Misma ley estatal, decisiones opuestas.',
  },
  {
    titulo: 'Plusvalía municipal',
    pasos: [
      { quien: 'Tribunal Constitucional', que: 'STC 182/2021: anula el método de cálculo (se pagaba incluso con pérdidas)', tipo: 'obliga' },
      { quien: 'Estado (Gobierno)', que: 'RDL 26/2021: nuevo doble método a elegir + exención si no hay ganancia', tipo: 'marco' },
      { quien: 'Tu ayuntamiento', que: 'Fija el tipo (Barcelona: 30 %, sin cambio) y los coeficientes', tipo: 'fija' },
    ],
    nota: 'Para quien vende sin ganancia o con poca plusvalía, el sistema nuevo es MEJOR que el de 2018.',
  },
  {
    titulo: 'ITP / Sucesiones (autonómicos) + valor de referencia',
    pasos: [
      { quien: 'Estado', que: 'Ley 11/2021: el «valor de referencia» del Catastro pasa a ser base imponible mínima (2022)', tipo: 'marco' },
      { quien: 'Tu comunidad autónoma', que: 'Fija tipos, bonificaciones y mínimos exentos de ISD, Patrimonio e ITP', tipo: 'fija' },
    ],
    nota: 'Una CCAA podía estar bajando su tipo mientras la cuota real subía por el valor de referencia estatal — y viceversa.',
  },
];

const TIPO_PASO = { obliga: '#d64545', marco: '#2563eb', fija: '#c2641a' };

export function WhoDecides() {
  return (
    <div>
      <div className="cadenas-grid">
        {CADENAS.map((c) => (
          <div className="cadena-card" key={c.titulo}>
            <h3>{c.titulo}</h3>
            <ol className="cadena-pasos">
              {c.pasos.map((p, i) => (
                <li key={i}>
                  <span className="cadena-quien" style={{ color: TIPO_PASO[p.tipo] }}>{p.quien}</span>
                  <span className="cadena-que">{p.que}</span>
                </li>
              ))}
            </ol>
            <p className="cadena-nota">{c.nota}</p>
          </div>
        ))}
      </div>
      <div className="ccaa-strip">
        <h3>La prueba autonómica: cuatro comunidades, cuatro direcciones</h3>
        <div className="ccaa-grid">
          {resumenCCAA.map((c) => (
            <div className="ccaa-card" key={c.ccaa}>
              <h4>{c.ccaa}</h4>
              <p className="ccaa-gobierno">{c.gobierno20182026}</p>
              <p className={`ccaa-tendencia ${c.tendencia.includes('subidas') && !c.tendencia.includes('luego') ? 'up' : c.tendencia.includes('bajadas') ? 'down' : 'mix'}`}>
                {c.tendencia}
              </p>
              <p className="ccaa-detalle">{c.detalle}</p>
            </div>
          ))}
        </div>
        <p className="cadena-nota" style={{ marginTop: 16 }}>
          <strong>Valor de referencia del Catastro</strong> ({valorReferencia.norma}):{' '}
          {valorReferencia.efecto}{' '}
          <a href={valorReferencia.urlBOE} target="_blank" rel="noreferrer">BOE ↗</a>
        </p>
      </div>
    </div>
  );
}

// ---------- Los conteos de «N subidas» ----------
export function Counts() {
  return (
    <div>
      <div className="counts-grid">
        {conteosSubidas.map((c) => (
          <div className="count-card" key={c.cifra}>
            <div className="count-cifra">{c.cifra}</div>
            <p className="count-fuente">
              <a href={c.url} target="_blank" rel="noreferrer">{c.fuente} ↗</a>
            </p>
            <span className="count-orientacion">{c.orientacion}</span>
            <details>
              <summary>Criterio de recuento y críticas</summary>
              <p><strong>Criterio:</strong> {c.criterio}</p>
              <p><strong>Críticas:</strong> {c.criticasAlCriterio}</p>
            </details>
          </div>
        ))}
      </div>
      <div className="counts-extra">
        <div className="counts-box">
          <h3>¿Existe un conteo simétrico de bajadas?</h3>
          <p>{conteoBajadas.detalle}</p>
        </div>
        <div className="counts-box">
          <h3>Fact-checks localizados</h3>
          <ul>
            {factChecks.map((f, i) => (
              <li key={i}>
                <a href={f.url} target="_blank" rel="noreferrer"><strong>{f.medio}</strong> ({f.fecha}) ↗</a>
                {' — '}<em>{f.orientacion}.</em> {f.conclusion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ---------- Caveats metodológicos ----------
export function Caveats() {
  const c = caveats;
  return (
    <div className="caveats-grid">
      <div className="caveat-card">
        <h3>1 · Ciclo vs legislación</h3>
        <p>{c.cicloVsLegislacion.resumen}</p>
        <p className="caveat-cifras">{c.cicloVsLegislacion.cifras}</p>
        <p className="fuentes-mini">
          {c.cicloVsLegislacion.fuentes.map((f, i) => (
            <span key={i}><a href={f.url} target="_blank" rel="noreferrer">{f.nombre}</a>{i < c.cicloVsLegislacion.fuentes.length - 1 ? ' · ' : ''}</span>
          ))}
        </p>
      </div>
      <div className="caveat-card">
        <h3>2 · La subida silenciosa: no deflactar el IRPF</h3>
        <p>{c.noDeflactacion.resumen}</p>
        <ul>
          {c.noDeflactacion.estimaciones.map((e, i) => (
            <li key={i}><strong>{e.quien}:</strong> {e.cifra} <a href={e.url} target="_blank" rel="noreferrer">↗</a></li>
          ))}
        </ul>
      </div>
      <div className="caveat-card">
        <h3>3 · Presión fiscal vs esfuerzo fiscal</h3>
        <p>{c.presionFiscalUE.fuente}</p>
        <p className="fuentes-mini">
          {c.presionFiscalUE.urls.map((u, i) => (
            <span key={i}><a href={u} target="_blank" rel="noreferrer">{u.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}</a>{i < c.presionFiscalUE.urls.length - 1 ? ' · ' : ''}</span>
          ))}
        </p>
      </div>
      <div className="caveat-card">
        <h3>4 · Temporal que se volvió permanente (y viceversa)</h3>
        <p><strong>Se prorrogaron o hicieron permanentes:</strong></p>
        <ul>{c.temporalVsPermanente.prorrogadas.map((t, i) => <li key={i}>{t}</li>)}</ul>
        <p><strong>Rebajas temporales revertidas:</strong></p>
        <ul>{c.temporalVsPermanente.revertidas.map((t, i) => <li key={i}>{t}</li>)}</ul>
      </div>
      {nuevasFiguras2025.length > 0 && (
        <div className="caveat-card">
          <h3>5 · Qué recaudan las figuras nuevas (2025, AEAT)</h3>
          <ul>
            {nuevasFiguras2025.map((f) => (
              <li key={f.nombre}><strong>{f.nombre}:</strong> {f.me.toLocaleString('es-ES', { maximumFractionDigits: 0 })} M€</li>
            ))}
          </ul>
          <p className="caveat-cifras">
            Contexto: el total de ingresos tributarios 2025 fue de 325.356 M€. Las figuras nuevas son relevantes
            pero pequeñas frente a IRPF (142.466 M€) o IVA: el grueso del aumento vino de los grandes impuestos de siempre.
          </p>
        </div>
      )}
      <div className="caveat-card">
        <h3>6 · Qué NO se aprobó</h3>
        <p>
          La <strong>equiparación fiscal diésel-gasolina</strong> se intentó y fue rechazada en el Congreso
          (diciembre 2024): a junio de 2026 el tipo del gasóleo no ha subido. Y el <strong>gravamen a las
          energéticas</strong> decayó en enero de 2025 al no convalidarse el RDL 10/2024 — a diferencia del de
          banca, que se hizo permanente. Un recuento riguroso también registra lo que no llegó a entrar en vigor.
        </p>
      </div>
      <div className="caveat-card caveat-card-muted">
        <h3>Límites de esta verificación</h3>
        <p>
          Series macro descargadas de las fuentes oficiales (API de Eurostat; Excel de cuadros del Informe Anual de
          Recaudación de la AEAT). Normas contrastadas contra el BOE por búsqueda de título e identificador.
          Para autonómicos y locales, algunas referencias exactas de boletines (BOCM, DOGV, DOGC) y los importes
          concretos de ordenanzas municipales quedan marcados como «parcial» o «no verificado»: el sentido del
          cambio está confirmado; el literal de la norma, no siempre. Municipio de contraste: {municipioContraste.nombre}
          {' '}({municipioContraste.poblacion.toLocaleString('es-ES')} hab.).
        </p>
      </div>
    </div>
  );
}

// ---------- Pie con fuentes ----------
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <h3>Fuentes principales</h3>
        <div className="footer-links">
          <a href="https://ec.europa.eu/eurostat/databrowser/view/gov_10a_taxag/default/table?lang=en" target="_blank" rel="noreferrer">Eurostat — gov_10a_taxag (presión fiscal)</a>
          <a href="https://sede.agenciatributaria.gob.es/Sede/datosabiertos/catalogo/hacienda/Informes_anuales_de_Recaudacion_Tributaria.shtml" target="_blank" rel="noreferrer">AEAT — Informe Anual de Recaudación Tributaria</a>
          <a href="https://www.boe.es" target="_blank" rel="noreferrer">BOE — normas citadas en cada ficha</a>
          <a href="https://www.airef.es/es/divulgacion/por-que-han-crecido-los-ingresos-tributarios-en-espana-desde-la-pandemia/" target="_blank" rel="noreferrer">AIReF — descomposición de ingresos</a>
          <a href="https://www.hacienda.gob.es/es-ES/Areas%20Tematicas/Financiacion%20Autonomica/Paginas/Libro%20electronico.aspx" target="_blank" rel="noreferrer">M.º Hacienda — Tributación Autonómica</a>
          <a href="https://www.fiscalidadresiduos.org" target="_blank" rel="noreferrer">Observatorio Fiscalidad de los Residuos (Fundació ENT)</a>
        </div>
        <p className="footer-note">
          Verificación elaborada con fuentes oficiales primarias (fecha de consulta: 5 de junio de 2026).
          Los conteos de terceros se reportan etiquetados con su orientación, no como dato neutro.
          Periodo analizado: junio 2018 – junio 2026. Serie Eurostat: 2000–2024. Serie AEAT: 2015–2025.
        </p>
      </div>
    </footer>
  );
}
