import { useState } from 'react';
import {
  RESUMEN, cotidiano, lineaTiempo, caveats, nuevasFiguras2025, DIRECCIONES,
  balance, impuestosNuevos, calculaImpacto,
} from '../data/sintesis';

const eur = (n) => n.toLocaleString('es-ES', { maximumFractionDigits: 0 }) + ' €';

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

// ---------- Calculadora: tu nómina ----------
export function Calculadora() {
  const [bruto, setBruto] = useState(30000);
  const v = Math.max(0, Number(bruto) || 0);
  const r = calculaImpacto(v);
  return (
    <div className="calc">
      <div className="calc-input">
        <label htmlFor="bruto">Tu salario bruto anual</label>
        <div className="calc-field">
          <input
            id="bruto" type="number" inputMode="numeric" min="0" step="1000" value={bruto}
            onChange={(e) => setBruto(e.target.value)} aria-label="Salario bruto anual en euros"
          />
          <span>€ / año</span>
        </div>
        <input
          type="range" min="12000" max="120000" step="1000" value={Math.min(v, 120000)}
          onChange={(e) => setBruto(e.target.value)} className="calc-range"
          aria-label="Ajusta tu salario bruto anual"
        />
        <div className="calc-range-labels"><span>12.000 €</span><span>arrastra para ajustar</span><span>120.000 €+</span></div>
      </div>
      <div className="calc-out">
        <div className="calc-card calc-card-main">
          <span className="calc-label">Rémora fiscal del IRPF</span>
          <span className="calc-cifra">{eur(r.remora)}<span className="calc-unit">/año</span></span>
          <span className="calc-sub">
            Lo que pagas de más porque, si tu sueldo solo siguió la inflación desde 2018, los tramos del IRPF
            no se han actualizado con ella.
          </span>
        </div>
        <div className="calc-card">
          <span className="calc-label">Nueva cotización MEI (tu parte)</span>
          <span className="calc-cifra calc-cifra-sm">{eur(r.mei)}<span className="calc-unit">/año</span></span>
          <span className="calc-sub">Cotización creada en 2023; en 2025 es el 0,8 % del salario, la mayor parte a cargo de la empresa.</span>
        </div>
        <div className="calc-card calc-card-total">
          <span className="calc-label">Coste anual estimado de estas medidas estatales</span>
          <span className="calc-cifra">{eur(r.total)}<span className="calc-unit">/año</span></span>
          <span className="calc-sub">IRPF estimado este año: {eur(r.irpf)} ({(r.tipoMedio * 100).toFixed(1)} % de tipo medio).</span>
        </div>
      </div>
      <p className="calc-disclaimer">
        Estimación orientativa del <strong>tramo estatal + autonómico de referencia</strong>, solo para rentas del trabajo.
        No incluye deducciones autonómicas ni personales, así que tu cifra real variará según tu comunidad y tu situación.
        El objetivo no es clavar tu declaración, sino ver el efecto de las decisiones del Gobierno central.
        Inflación acumulada usada: ≈ 18 % (IPC 2018–2025, INE).
        {r.sobreBaseMax && ' Para tu salario, además, se aplica la «cuota de solidaridad» sobre la parte que supera la base máxima de cotización.'}
      </p>
    </div>
  );
}

// ---------- El balance: subidas vs bajadas + figuras nuevas ----------
export function Balance() {
  const max = Math.max(...balance.map((b) => b.n), 1);
  return (
    <div className="balance">
      <div className="marcador">
        <h3 className="sub-h3" style={{ marginTop: 0 }}>Movimientos normativos por dirección</h3>
        <p className="section-intro" style={{ marginBottom: 20 }}>
          Recuento simétrico de los cambios desde junio de 2018: tantas subidas como bajadas, sin descartar ninguna.
          Cuenta <em>cambios de norma</em>, no euros (una bajada y una subida no pesan lo mismo en recaudación).
        </p>
        {balance.map((b) => (
          <div className="marcador-row" key={b.key}>
            <span className="marcador-label">{b.label}</span>
            <div className="marcador-bar-wrap">
              <div className="marcador-bar" style={{ width: `${(b.n / max) * 100}%`, background: b.color }} />
            </div>
            <span className="marcador-n" style={{ color: b.color }}>{b.n}</span>
          </div>
        ))}
      </div>
      <div className="contador">
        <h3 className="sub-h3">Las 8 figuras tributarias nuevas</h3>
        <p className="section-intro" style={{ marginBottom: 20 }}>
          Impuestos que no existían antes de 2018, con su año de creación y lo que recaudaron en 2025 (AEAT) donde el dato está cerrado.
        </p>
        <ol className="contador-list">
          {impuestosNuevos.map((f) => (
            <li key={f.nombre}>
              <span className="contador-anio">{f.anio}</span>
              <span className="contador-nombre">
                {f.nombre}
                {f.ue && <span className="cambio-ue">UE</span>}
              </span>
              <span className="contador-me">{f.me != null ? `${f.me.toLocaleString('es-ES', { maximumFractionDigits: 0 })} M€` : '—'}</span>
            </li>
          ))}
        </ol>
        <p className="fuentes-mini">M€ = millones de euros recaudados en 2025. «—» = sin recaudación cerrada o cedida a las CCAA.</p>
      </div>
    </div>
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
        <h3>6 · Qué NO se aprobó (o solo se anunció)</h3>
        <p>
          La <strong>equiparación fiscal diésel-gasolina</strong> se intentó y fue rechazada en el Congreso
          (diciembre 2024): a junio de 2026 el tipo del gasóleo no ha subido. El <strong>gravamen a las
          energéticas</strong> decayó en enero de 2025 al no convalidarse el RDL 10/2024 — a diferencia del de
          banca, que se hizo permanente.
        </p>
        <p>
          En <strong>vivienda</strong>, el paquete anunciado por el Gobierno en enero de 2025 —un impuesto de
          hasta el <strong>100% a la compra por no residentes extracomunitarios</strong> y más IVA y regulación a
          los <strong>pisos turísticos</strong>— sigue <em>sin aprobarse</em> a junio de 2026: es un anuncio, no una
          norma en vigor. Dar visibilidad también es registrar lo que no llegó a entrar en vigor.
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
