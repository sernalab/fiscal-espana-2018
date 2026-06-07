// Capa de síntesis: normaliza la investigación (research/*.json) para la UI.
// Cada dato citable conserva su fuente; la síntesis y los veredictos globales
// se elaboran a partir de los veredictos por impuesto ya verificados.
import estatales from './estatales.json';
import autonomicos from './autonomicos.json';
import locales from './locales.json';
import conteos from './conteos-caveats.json';
import eurostat from './eurostat-verificado.json';
import aeat from './aeat-verificado.json';

// ---------- Series macro ----------
export const GOBIERNOS = [
  { nombre: 'Aznar (PP)', desde: 2000, hasta: 2004.3, color: '#94a3b8' },
  { nombre: 'Zapatero (PSOE)', desde: 2004.3, hasta: 2011.95, color: '#cbd5e1' },
  { nombre: 'Rajoy (PP)', desde: 2011.95, hasta: 2018.42, color: '#94a3b8' },
  { nombre: 'Sánchez (PSOE)', desde: 2018.42, hasta: 2024, color: '#fde68a' },
];

export const presionFiscal = eurostat.serie;
export const presionFiscalMeta = eurostat._meta;

export const recaudacion = aeat.ingresosPorFigura.map((f) => ({
  ...f,
  resto: f.total != null ? Math.round((f.total - f.irpf - f.iva - f.sociedades - f.iiee) * 10) / 10 : null,
}));
export const impactoNormativo = aeat.impactoNormativoTotal;
export const aeatMeta = aeat._meta;

// Nuevas figuras estatales: recaudación 2025 (cuadro 1.6 AEAT, M€)
const f2025 = aeat.ingresosPorFigura.find((f) => f.anio === 2025) ?? {};
export const nuevasFiguras2025 = [
  { nombre: 'Imp. margen entidades financieras (ex gravamen banca)', me: f2025.impuestoMargenEntidadesFinancieras },
  { nombre: 'Imp. envases de plástico no reutilizables', me: f2025.plasticos },
  { nombre: 'Imp. transacciones financieras («tasa Tobin»)', me: f2025.itf },
  { nombre: 'Imp. servicios digitales («tasa Google»)', me: f2025.idsd },
].filter((f) => f.me != null);

// ---------- Impuestos normalizados ----------
const normFuentes = (fuentes = []) =>
  fuentes.map((f) => (typeof f === 'string' ? { nombre: f.replace(/^https?:\/\/(www\.)?/, '').split('/')[0], url: f } : f));

// Los veredictos de la capa local usan etiquetas competenciales; se mapean a dirección + atribución.
const VEREDICTO_LOCAL = {
  ivtm: { veredicto: 'depende', atribucion: 'Decisión de cada ayuntamiento (tarifas base estatales congeladas desde 2003)' },
  'tasa-residuos': { veredicto: 'subio', atribucion: 'Estado/UE obligan a tenerla y a que no sea deficitaria; el importe lo fija cada ayuntamiento' },
  ibi: { veredicto: 'depende', atribucion: 'Tipo municipal; valor catastral estatal (normalmente a petición del municipio)' },
  iivtnu: { veredicto: 'mixto', atribucion: 'Método rediseñado por el Estado obligado por el Tribunal Constitucional; tipo municipal' },
};

const norm = (imp, extra = {}) => ({
  ...imp,
  fuentes: normFuentes(imp.fuentes),
  ...extra,
});

export const impuestos = [
  ...estatales.impuestos.map((i) => norm(i)),
  ...autonomicos.impuestos.map((i) => norm(i)),
  ...locales.impuestos.map((i) =>
    norm(i, {
      veredictoCompetencial: i.veredicto,
      veredicto: VEREDICTO_LOCAL[i.id]?.veredicto ?? 'mixto',
      atribucion: VEREDICTO_LOCAL[i.id]?.atribucion,
      verificacionTexto: i.verificacion,
      verificacion: 'parcial',
    })
  ),
];

export const resumenCCAA = autonomicos.resumenPorCCAA;
export const valorReferencia = autonomicos.valorReferencia;
export const municipioContraste = locales.municipioContraste;
export const conteosSubidas = conteos.conteos;
export const factChecks = conteos.factChecks;
export const conteoBajadas = conteos.conteoBajadas;
export const caveats = conteos.caveats;

// ---------- Veredicto global (síntesis propia a partir de lo verificado) ----------
export const VEREDICTO_GLOBAL = {
  afirmacion:
    '«Desde que Pedro Sánchez es presidente (junio 2018) han subido prácticamente todos los impuestos en España, incluyendo la tasa de basuras y el impuesto de circulación.»',
  resumen:
    'Parcialmente cierta en el ámbito estatal —con subidas concentradas en rentas altas, grandes empresas y nuevos impuestos— y falsa o engañosa en su atribución para el impuesto de circulación, los tributos autonómicos y, en parte, la tasa de basuras. La recaudación récord se explica sobre todo por ciclo económico e inflación, no por las subidas legisladas.',
  porNivel: [
    {
      nivel: 'Estatal',
      etiqueta: 'parcial',
      titulo: 'Parcialmente cierta',
      texto:
        'Subieron IRPF (tramos altos), Sociedades (grandes empresas) y tabaco, y se crearon al menos 8 figuras nuevas (plásticos, vertederos, ITF, IDSD, grandes fortunas, banca, vapeo, Pilar 2). Pero los tipos generales de IVA e IRPF de rentas medias no subieron por ley, hubo bajadas (pymes, rentas bajas, higiene femenina, aceite de oliva) y, según la propia AEAT, los cambios normativos RESTARON recaudación en 2019, 2021, 2022, 2023 y 2024 por las rebajas anti-inflación. La subida real silenciosa para rentas medias fue la no deflactación del IRPF (~11.000 M€ según Banco de España).',
    },
    {
      nivel: 'Autonómico',
      etiqueta: 'no-atribuible',
      titulo: 'Depende de cada CCAA — no atribuible al Gobierno central',
      texto:
        'Sucesiones, Patrimonio, ITP y tramo autonómico del IRPF los decide cada comunidad. En el periodo, Madrid y Andalucía BAJARON prácticamente todo; Cataluña SUBIÓ casi todo; la C. Valenciana subió primero y bajó después con el cambio de gobierno. Atribuir estos movimientos a Sánchez es incorrecto en ambas direcciones.',
    },
    {
      nivel: 'Local — circulación (IVTM)',
      etiqueta: 'falsa',
      titulo: 'Atribución falsa',
      texto:
        'Las tarifas base estatales del IVTM están congeladas desde 2003 (ningún gobierno las ha tocado). Si la cuota subió, fue porque el ayuntamiento subió su coeficiente: Begues lo hizo en 2025 (1,66→1,70, primera vez desde 2009); Barcelona lo congeló. En términos reales, la parte estatal del impuesto se ha abaratado con la inflación.',
    },
    {
      nivel: 'Local — tasa de basuras',
      etiqueta: 'parcial',
      titulo: 'Parcialmente cierta (con matiz competencial)',
      texto:
        'Aquí sí hay una cadena que llega al Gobierno: la Ley 7/2022 (transponiendo la Directiva UE 2018/851) obliga a los municipios a tener una tasa específica y NO deficitaria desde abril de 2025. Eso explica la oleada de creaciones y subidas (+16,2% de media en 2025). Pero el importe concreto lo fija cada ayuntamiento: quién obliga (Cortes/UE) y quién fija la cuantía (municipio) son distintos.',
    },
    {
      nivel: 'Cotizaciones sociales',
      etiqueta: 'verificado-matiz',
      titulo: 'Subieron — pero no son impuestos',
      texto:
        'MEI creciente (0,6%→1,2% en 2029), cuota de solidaridad sobre salarios altos desde 2025 y destope progresivo de bases máximas. Son subidas estructurales verificadas que elevan la presión fiscal, aunque técnicamente son cotizaciones, no impuestos. Los conteos de «97/100 subidas» las incluyen.',
    },
  ],
};

export const NIVELES = {
  estatal: { label: 'Estatal', color: '#2563eb' },
  autonomico: { label: 'Autonómico', color: '#0d9488' },
  local: { label: 'Local', color: '#c2641a' },
};

export const nivelKey = (nivel) => (nivel.startsWith('local') ? 'local' : nivel);

export const VEREDICTOS = {
  subio: { label: 'Subió', color: '#d64545', bg: '#fdecec' },
  bajo: { label: 'Bajó', color: '#2e9e6b', bg: '#e9f7f0' },
  mixto: { label: 'Mixto', color: '#d9952a', bg: '#fdf4e3' },
  nuevo: { label: 'Nuevo impuesto', color: '#7c5cd6', bg: '#f1ecfb' },
  sin_cambio: { label: 'Sin cambio', color: '#64748b', bg: '#f1f5f9' },
  depende: { label: 'Depende del municipio', color: '#c2641a', bg: '#fdf1e7' },
};

export const DIRECCIONES = {
  sube: { label: '▲ sube', color: '#d64545' },
  baja: { label: '▼ baja', color: '#2e9e6b' },
  nuevo: { label: '✦ nuevo', color: '#7c5cd6' },
  temporal: { label: '◷ temporal', color: '#d9952a' },
  reversion: { label: '↩ reversión', color: '#b45309' },
  mixto: { label: '◆ mixto', color: '#d9952a' },
  sin_cambio: { label: '— sin cambio', color: '#64748b' },
};
