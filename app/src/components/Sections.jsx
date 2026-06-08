import { RESUMEN, cotidiano, lineaTiempo, caveats, nuevasFiguras2025, DIRECCIONES } from '../data/sintesis';

// ---------- En tu día a día ----------
const EFECTOS = {
  sube: { label: 'Pagas más', color: '#d64545', bg: '#fdecec' },
  baja: { label: 'Pagas menos', color: '#2e9e6b', bg: '#e9f7f0' },
  mixto: { label: 'Depende', color: '#d9952a', bg: '#fdf4e3' },
  nuevo: { label: 'Impuesto nuevo', color: '#7c5cd6', bg: '#f1ecfb' },
  sin_cambio: { label: 'No cambió', color: '#64748b', bg: '#f1f5f9' },
  ue: { label: 'Sube · origen UE', color: '#0d9488', bg: '#e6f5f3' },
  vaiven: { label: 'Subió y volvió', color: '#b45309', bg: '#fdf1e7' },
};

export function Cotidiano() {
  return (
    <div className="dia-grid">
      {cotidiano.map((c) => {
        const ef = EFECTOS[c.tono] ?? EFECTOS.mixto;
        return (
          <article className="dia-card" key={c.titulo} style={{ borderTopColor: ef.color }}>
            <div className="dia-head">
              <span className="dia-icono" aria-hidden="true">{c.icono}</span>
              <span className="dia-efecto" style={{ color: ef.color, background: ef.bg }}>{ef.label}</span>
            </div>
            <h3>{c.titulo}</h3>
            <p className="dia-resumen">{c.resumen}</p>
            {c.matiz && <p className="dia-matiz">{c.matiz}</p>}
            <p className="dia-norma">
              {c.etiqueta && <span className="dia-etiqueta">{c.etiqueta}</span>}
              {c.norma}
            </p>
          </article>
        );
      })}
    </div>
  );
}

// ---------- Hero ----------
export function Hero() {
  return (
    <header className="hero">
      <div className="container">
        <p className="hero-kicker">Datos oficiales · Eurostat · AEAT · BOE · junio 2026</p>
        <h1>{RESUMEN.titulo}</h1>
        <p className="hero-resumen">{RESUMEN.intro}</p>
        <div className="hero-stats">
          {RESUMEN.destacados.map((d) => (
            <div className="stat-card" key={d.label}>
              <span className="stat-cifra">{d.cifra}</span>
              <span className="stat-label">{d.label}</span>
              <span className="stat-sub">{d.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

// ---------- Línea de tiempo: lista neutral de cambios ----------
export function Timeline() {
  const anios = [...new Set(lineaTiempo.map((e) => e.anio))].sort((a, b) => a - b);
  return (
    <div className="timeline">
      {anios.map((anio) => (
        <div className="timeline-year" key={anio}>
          <div className="timeline-year-label">{anio}</div>
          <div className="timeline-items">
            {lineaTiempo
              .filter((e) => e.anio === anio)
              .map((e, i) => {
                const dir = DIRECCIONES[e.direccion] ?? DIRECCIONES.mixto;
                return (
                  <div className="timeline-item" key={i}>
                    <span className="timeline-dir" style={{ color: dir.color }}>{dir.label}</span>
                    <div className="timeline-body">
                      <p className="timeline-figura">
                        {e.figura}
                        {e.temporal && <span className="cambio-temp">temporal</span>}
                        {e.ue && <span className="cambio-ue">UE</span>}
                      </p>
                      <p className="timeline-que">{e.que}</p>
                      <p className="timeline-norma">
                        {e.url && e.url !== 'no_verificado' ? (
                          <a href={e.url} target="_blank" rel="noreferrer">{e.norma} ↗</a>
                        ) : (
                          <span>{e.norma}</span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- Contexto para leer bien los datos ----------
export function Caveats() {
  const c = caveats;
  return (
    <div className="caveats-grid">
      <div className="caveat-card">
        <h3>1 · Cuánto fue cambio de ley y cuánto fue ciclo e inflación</h3>
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
            pero pequeñas frente al IRPF (142.466 M€) o el IVA: el grueso del aumento vino de los grandes impuestos de siempre.
          </p>
        </div>
      )}
      <div className="caveat-card">
        <h3>6 · Qué NO se aprobó</h3>
        <p>
          La <strong>equiparación fiscal diésel-gasolina</strong> se intentó y fue rechazada en el Congreso
          (diciembre 2024): a junio de 2026 el tipo del gasóleo no ha subido. Y el <strong>gravamen a las
          energéticas</strong> decayó en enero de 2025 al no convalidarse el RDL 10/2024 — a diferencia del de
          banca, que se hizo permanente. Dar visibilidad también es registrar lo que no llegó a entrar en vigor.
        </p>
      </div>
      <div className="caveat-card caveat-card-muted">
        <h3>Alcance de estos datos</h3>
        <p>
          Series macro descargadas de las fuentes oficiales (API de Eurostat; cuadros del Informe Anual de
          Recaudación de la AEAT). Cada norma enlaza al BOE (o a EUR-Lex, en las de origen europeo). Se incluyen
          los tributos que decide el <strong>Gobierno central</strong> y la <strong>tasa de basuras</strong> por venir
          impuesta por la UE. Quedan fuera, por no depender del Gobierno central, los tributos autonómicos
          (Sucesiones, Patrimonio, ITP) y los locales de cuantía municipal (circulación/IVTM, IBI, plusvalía).
          Las cotizaciones sociales se etiquetan como tales: suben, pero no son impuestos.
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
          <a href="https://eur-lex.europa.eu" target="_blank" rel="noreferrer">EUR-Lex — directivas europeas</a>
          <a href="https://www.airef.es/es/divulgacion/por-que-han-crecido-los-ingresos-tributarios-en-espana-desde-la-pandemia/" target="_blank" rel="noreferrer">AIReF — descomposición de ingresos</a>
          <a href="https://www.fiscalidadresiduos.org" target="_blank" rel="noreferrer">Observatorio Fiscalidad de los Residuos (Fundació ENT)</a>
        </div>
        <p className="footer-note">
          Datos oficiales primarios (fecha de consulta: 5 de junio de 2026). Periodo: junio 2018 – junio 2026.
          Serie Eurostat: 2000–2024. Serie AEAT: 2015–2025. Las figuras de origen europeo aparecen señaladas con la etiqueta «UE».
        </p>
      </div>
    </footer>
  );
}
