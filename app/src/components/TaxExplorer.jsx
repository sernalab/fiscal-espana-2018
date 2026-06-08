import { useMemo, useState } from 'react';
import { impuestos, ORIGENES, VEREDICTOS, DIRECCIONES } from '../data/sintesis';

const VERIFICACION = {
  verificado: { label: '✓ verificado', color: '#2e9e6b' },
  parcial: { label: '◐ parcial', color: '#d9952a' },
  no_concluyente: { label: '? no concluyente', color: '#94a3b8' },
};

function Chip({ active, color, children, onClick }) {
  return (
    <button
      className={`chip ${active ? 'chip-active' : ''}`}
      style={active ? { background: color, borderColor: color, color: '#fff' } : { color }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function CambioRow({ c }) {
  const dir = DIRECCIONES[c.direccion] ?? DIRECCIONES.mixto;
  const url = c.urlBOE ?? c.urlNorma;
  const urlValida = url && url !== 'no_verificado';
  return (
    <div className="cambio">
      <div className="cambio-head">
        <span className="cambio-dir" style={{ color: dir.color }}>{dir.label}</span>
        <span className="cambio-fecha">{c.fecha}</span>
        {c.temporal && <span className="cambio-temp">temporal</span>}
        {c.ue && <span className="cambio-ue">UE</span>}
      </div>
      <p className="cambio-que">{c.que}</p>
      {(c.antes || c.despues) && (
        <p className="cambio-antes">
          {c.antes && <><strong>Antes:</strong> {c.antes} </>}
          {c.despues && <><strong>Después:</strong> {c.despues}</>}
        </p>
      )}
      <p className="cambio-norma">
        {urlValida ? (
          <a href={url} target="_blank" rel="noreferrer">{c.norma} ↗</a>
        ) : (
          <span>{c.norma}{url === 'no_verificado' && ' (referencia exacta no verificada)'}</span>
        )}
      </p>
    </div>
  );
}

function TaxCard({ imp, open, onToggle }) {
  const origen = imp.origenUE ? ORIGENES.ue : ORIGENES.estatal;
  const ver = VEREDICTOS[imp.veredicto] ?? VEREDICTOS.mixto;
  const verif = VERIFICACION[imp.verificacion] ?? VERIFICACION.parcial;
  return (
    <article className={`tax-card ${open ? 'tax-card-open' : ''}`}>
      <button className="tax-card-head" onClick={onToggle} aria-expanded={open}>
        <div className="tax-card-tags">
          <span className="tag" style={{ background: origen.color }}>{origen.label}</span>
          <span className="tag-veredicto" style={{ color: ver.color, background: ver.bg }}>{ver.label}</span>
          <span className="tag-verif" style={{ color: verif.color }}>{verif.label}</span>
        </div>
        <h3>{imp.nombre}</h3>
        <p className="tax-card-resumen">{imp.veredictoTexto}</p>
        <span className="tax-card-toggle">{open ? 'Cerrar −' : 'Ver detalle +'}</span>
      </button>
      {open && (
        <div className="tax-card-body">
          {imp.origenUE && <p className="origen-ue"><strong>Origen europeo:</strong> {imp.origenUE}</p>}
          <h4>Cambios desde junio de 2018</h4>
          {imp.cambios.map((c, i) => <CambioRow key={i} c={c} />)}
          {imp.matices && <p className="matices"><strong>Matices:</strong> {imp.matices}</p>}
          <div className="fuentes-mini">
            <strong>Fuentes:</strong>{' '}
            {imp.fuentes.map((f, i) => (
              <span key={i}>
                <a href={f.url} target="_blank" rel="noreferrer">{f.nombre}</a>
                {i < imp.fuentes.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default function TaxExplorer() {
  const [veredicto, setVeredicto] = useState('todos');
  const [soloUE, setSoloUE] = useState(false);
  const [openId, setOpenId] = useState(null);

  const visibles = useMemo(
    () =>
      impuestos.filter(
        (i) =>
          (veredicto === 'todos' || i.veredicto === veredicto) &&
          (!soloUE || i.origenUE)
      ),
    [veredicto, soloUE]
  );

  return (
    <div>
      <div className="filters">
        <div className="filter-group">
          <span className="filter-label">Qué pasó</span>
          <Chip active={veredicto === 'todos'} color="#475569" onClick={() => setVeredicto('todos')}>Todos</Chip>
          {Object.entries(VEREDICTOS).map(([k, v]) => (
            <Chip key={k} active={veredicto === k} color={v.color} onClick={() => setVeredicto(k)}>{v.label}</Chip>
          ))}
        </div>
        <div className="filter-group">
          <span className="filter-label">Origen</span>
          <Chip active={!soloUE} color="#475569" onClick={() => setSoloUE(false)}>Todos</Chip>
          <Chip active={soloUE} color={ORIGENES.ue.color} onClick={() => setSoloUE(true)}>Solo origen UE</Chip>
        </div>
      </div>
      <p className="result-count">{visibles.length} figuras tributarias</p>
      <div className="tax-grid">
        {visibles.map((imp) => (
          <TaxCard
            key={imp.id}
            imp={imp}
            open={openId === imp.id}
            onToggle={() => setOpenId(openId === imp.id ? null : imp.id)}
          />
        ))}
      </div>
    </div>
  );
}
