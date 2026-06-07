import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ReferenceArea, BarChart, Bar, Legend, Cell,
} from 'recharts';
import { presionFiscal, recaudacion, impactoNormativo } from '../data/sintesis';

const fmtME = (v) =>
  v == null ? '—' : `${v.toLocaleString('es-ES', { maximumFractionDigits: 0 })} M€`;

const tooltipStyle = {
  background: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  boxShadow: '0 8px 24px rgba(15,23,42,.12)',
  fontSize: 13,
  padding: '10px 14px',
};

// ---------- Presión fiscal (% PIB, Eurostat) ----------
export function PressureChart() {
  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={380}>
        <AreaChart data={presionFiscal} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradPresion" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="anio" type="number" domain={[2000, 2024]}
            ticks={[2000, 2004, 2008, 2012, 2016, 2018, 2020, 2024]}
            tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis
            domain={[28, 40]} tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} width={48}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v) => [`${v.toLocaleString('es-ES')} % del PIB`, 'Presión fiscal']}
            labelFormatter={(l) => `Año ${l}`}
          />
          <ReferenceArea x1={2018.42} x2={2024} fill="#fde68a" fillOpacity={0.22} />
          <ReferenceLine x={2018.42} stroke="#b45309" strokeDasharray="4 4"
            label={{ value: 'jun 2018 — Sánchez', position: 'insideTopLeft', fill: '#b45309', fontSize: 12, dy: 8, dx: 6 }} />
          <ReferenceLine x={2011.95} stroke="#94a3b8" strokeDasharray="4 4"
            label={{ value: 'Rajoy', position: 'insideTopLeft', fill: '#64748b', fontSize: 11, dy: 8, dx: 4 }} />
          <ReferenceLine x={2004.3} stroke="#94a3b8" strokeDasharray="4 4"
            label={{ value: 'Zapatero', position: 'insideTopLeft', fill: '#64748b', fontSize: 11, dy: 8, dx: 4 }} />
          <Area type="monotone" dataKey="pctPIB" stroke="#2563eb" strokeWidth={2.5}
            fill="url(#gradPresion)" dot={{ r: 2.5, fill: '#2563eb' }} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
      <p className="chart-note">
        Máximo del periodo: 38,1 % (2021). El nivel de 2024 (37,3 %) es similar al de 2007 (37,2 %, burbuja).
        La caída de 2008-2011 y la subida de 2020 reflejan sobre todo el ciclo (PIB), no cambios de ley.
      </p>
    </div>
  );
}

// ---------- Recaudación por figura (AEAT, M€) ----------
const FIGURAS = [
  { key: 'irpf', nombre: 'IRPF', color: '#2563eb' },
  { key: 'iva', nombre: 'IVA', color: '#0d9488' },
  { key: 'sociedades', nombre: 'Sociedades', color: '#7c5cd6' },
  { key: 'iiee', nombre: 'II. Especiales', color: '#c2641a' },
  { key: 'resto', nombre: 'Resto', color: '#94a3b8' },
];

export function RevenueChart() {
  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={380}>
        <BarChart data={recaudacion} margin={{ top: 16, right: 24, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="anio" tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
          <YAxis
            tickFormatter={(v) => `${(v / 1000).toLocaleString('es-ES')}`}
            tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} width={44}
            label={{ value: 'miles de M€', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11 }}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(v, name) => [fmtME(v), name]} labelFormatter={(l) => `Año ${l}`} />
          <Legend wrapperStyle={{ fontSize: 13 }} />
          {FIGURAS.map((f) => (
            <Bar key={f.key} dataKey={f.key} name={f.nombre} stackId="a" fill={f.color}
              radius={f.key === 'resto' ? [4, 4, 0, 0] : 0} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <p className="chart-note">
        De 208.685 M€ (2018) a 325.356 M€ (2025): +56 % nominal. El IRPF aporta el mayor salto
        (86.892 → 142.466 M€), empujado por empleo, salarios, inflación y no deflactación.
      </p>
    </div>
  );
}

// ---------- Impacto normativo (cuadro 1.5 AEAT) ----------
export function ImpactChart() {
  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={impactoNormativo} margin={{ top: 24, right: 24, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="anio" tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
          <YAxis tickFormatter={(v) => `${(v / 1000).toLocaleString('es-ES')}k`}
            tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} width={44} />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v) => [fmtME(v), 'Impacto de cambios normativos']}
            labelFormatter={(l) => `Año ${l}`}
          />
          <ReferenceLine y={0} stroke="#475569" />
          <Bar dataKey="impactoME" radius={[4, 4, 0, 0]}>
            {impactoNormativo.map((d) => (
              <Cell key={d.anio} fill={d.impactoME >= 0 ? '#d64545' : '#2e9e6b'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="chart-note">
        <span style={{ color: '#d64545', fontWeight: 600 }}>Rojo</span>: los cambios de ley sumaron recaudación ese año.{' '}
        <span style={{ color: '#2e9e6b', fontWeight: 600 }}>Verde</span>: la restaron (rebajas anti-inflación 2021-2023).
        El +7.820 M€ de 2025 es, sobre todo, la <em>reversión</em> de esas rebajas temporales.
      </p>
    </div>
  );
}
