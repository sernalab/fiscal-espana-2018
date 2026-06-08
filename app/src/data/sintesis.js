// Capa de síntesis: normaliza la investigación (research/*.json) para la UI.
// Enfoque: impuestos del GOBIERNO CENTRAL desde junio de 2018, con datos
// oficiales. Las figuras de origen europeo se etiquetan como tales. Cada
// cambio conserva su norma (BOE) o queda marcado como no verificado.
import estatales from './estatales.json';
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

// ---------- Origen europeo ----------
// Figuras cuya obligación/marco proviene de una directiva de la UE, transpuesta
// por el Estado. Se etiquetan para distinguir "lo decidió el Gobierno central"
// de "lo impuso Europa y el Gobierno lo transpuso".
const ORIGEN_UE = {
  'plastico-no-reutilizable': 'Marco europeo de economía circular (Directiva UE 2018/851), transpuesto por la Ley 7/2022',
  'residuos-vertedero': 'Marco europeo de economía circular (Directiva UE 2018/851), transpuesto por la Ley 7/2022',
  'tasa-residuos': 'Obligación europea (Directiva UE 2018/851) transpuesta por la Ley 7/2022',
};

const normFuentes = (fuentes = []) =>
  fuentes.map((f) => (typeof f === 'string' ? { nombre: f.replace(/^https?:\/\/(www\.)?/, '').split('/')[0], url: f } : f));

// Tasa de basuras: única figura local incluida, por ser de origen europeo.
// Se presenta reenfocada en la cadena UE → Estado, con su efecto agregado real.
const basuras = {
  id: 'tasa-residuos',
  nombre: 'Tasa de basuras / residuos domésticos',
  cambios: [
    {
      fecha: '2018-05-30',
      que: 'La Directiva (UE) 2018/851 establece el principio «quien contamina paga» y la recuperación del coste real del servicio de residuos.',
      direccion: 'nuevo', temporal: false, ue: true,
      norma: 'Directiva (UE) 2018/851 (modifica la Directiva marco de residuos 2008/98/CE)',
      urlBOE: 'https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32018L0851',
    },
    {
      fecha: '2022-04-08',
      que: 'La Ley 7/2022 (art. 11.3) obliga a todos los municipios a tener una tasa de residuos específica, diferenciada y NO deficitaria —que cubra el coste real del servicio— antes de abril de 2025.',
      direccion: 'nuevo', temporal: false, ue: true,
      norma: 'Ley 7/2022, de 8 de abril, art. 11.3 (transpone la Directiva UE 2018/851)',
      urlBOE: 'https://www.boe.es/buscar/act.php?id=BOE-A-2022-5809',
    },
    {
      fecha: '2025-01-01',
      que: 'Oleada de creación y subida de la tasa para cumplir el mandato de no déficit. La cobertura media de costes alcanzó el 65,5%, por lo que en muchos municipios seguirá subiendo.',
      antes: 'Media 2024: 100,12 €/vivienda',
      despues: 'Media 2025: 116,32 €/vivienda (+16,2%)',
      direccion: 'sube', temporal: false,
      norma: 'Importe fijado por cada ordenanza municipal, en cumplimiento de la Ley 7/2022',
      urlBOE: null,
    },
  ],
  veredicto: 'subio',
  veredictoTexto:
    'La tasa de basuras sube en toda España porque una directiva europea (2018/851), transpuesta por la Ley 7/2022, obliga a que cubra el coste real del servicio. La media subió un 16,2% en 2025 (116,32 €/vivienda) y seguirá subiendo: la cobertura de costes todavía es del 65,5%.',
  verificacion: 'verificado',
  matices:
    'El origen de la subida es europeo, transpuesto por una ley estatal (la obligación de no déficit). El importe concreto lo fija cada ordenanza municipal, de ahí la gran dispersión entre municipios.',
  fuentes: [
    { nombre: 'BOE — Ley 7/2022, art. 11.3', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2022-5809' },
    { nombre: 'Directiva (UE) 2018/851', url: 'https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32018L0851' },
    { nombre: 'Observatorio de la Fiscalidad de los Residuos (Fundació ENT) — Tasas 2025', url: 'https://www.fiscalidadresiduos.org/wp-content/uploads/2025/10/Tasas_2025.pdf' },
  ],
};

// Impuestos del Gobierno central (+ tasa de basuras, de origen UE).
// Marca el cambio del Impuesto Complementario (Pilar 2) como de origen europeo.
export const impuestos = [
  ...estatales.impuestos.map((imp) => ({
    ...imp,
    fuentes: normFuentes(imp.fuentes),
    origenUE: ORIGEN_UE[imp.id] ?? null,
    cambios: imp.cambios.map((c) => ({
      ...c,
      ue: c.ue || /pilar 2|2022\/2523/i.test(c.que + ' ' + (c.norma ?? '')),
    })),
  })),
  { ...basuras, fuentes: normFuentes(basuras.fuentes), origenUE: ORIGEN_UE['tasa-residuos'] },
];

// ---------- Línea de tiempo: lista neutral de cambios ----------
const parseYear = (fecha) => {
  const m = String(fecha).match(/(\d{4})/);
  return m ? parseInt(m[1], 10) : 9999;
};

export const lineaTiempo = impuestos
  .flatMap((imp) =>
    imp.cambios.map((c) => ({
      anio: parseYear(c.fecha),
      fecha: c.fecha,
      figura: imp.nombre,
      figuraId: imp.id,
      que: c.que,
      direccion: c.direccion,
      norma: c.norma,
      url: c.urlBOE ?? c.urlNorma ?? null,
      temporal: !!c.temporal,
      ue: !!c.ue,
    }))
  )
  .filter((e) => e.anio >= 2018 && e.anio <= 2026)
  .sort((a, b) => a.anio - b.anio || a.fecha.localeCompare(b.fecha));

export const caveats = conteos.caveats;

// ---------- Resumen neutral (cabecera) ----------
export const RESUMEN = {
  titulo: 'Los impuestos del Gobierno central desde junio de 2018',
  intro:
    'Qué subió, qué bajó y qué se creó en los tributos que decide el Gobierno central, con datos oficiales (Eurostat, AEAT, BOE). Las figuras impuestas por la Unión Europea aparecen señaladas. Sin recuentos de parte: cada cambio enlaza a su norma.',
  destacados: [
    {
      cifra: '+56%',
      label: 'Recaudación tributaria (nominal)',
      sub: 'De 208.685 M€ (2018) a 325.356 M€ (2025). Fuente: AEAT, Informe Anual de Recaudación.',
    },
    {
      cifra: '38,1%',
      label: 'Presión fiscal — máximo histórico',
      sub: 'Del PIB en 2021 (37,3% en 2024). Nunca antes había superado el 37,2% de 2007. Fuente: Eurostat.',
    },
    {
      cifra: '8',
      label: 'Nuevas figuras tributarias estatales',
      sub: 'Plásticos, residuos, transacciones financieras, servicios digitales, grandes fortunas, banca, vapeo e impuesto complementario (Pilar 2).',
    },
    {
      cifra: '3',
      label: 'De origen europeo',
      sub: 'Impuesto complementario (Directiva UE 2022/2523) y las figuras de residuos —incluida la tasa de basuras— (Directiva UE 2018/851).',
    },
  ],
};

// ---------- "En tu día a día": traducción a la vida cotidiana ----------
// Cada escenario traduce los datos oficiales a un caso real, con su matiz honesto.
// tono: sube | baja | mixto | nuevo | sin_cambio | ue | vaiven
export const cotidiano = [
  {
    icono: '💶',
    titulo: 'Te suben el sueldo para seguir el ritmo de la inflación',
    tono: 'sube',
    resumen:
      'Pagas más IRPF del que tocaría. El Estado no ajusta los tramos ni el mínimo del IRPF a la inflación desde hace años, así que cuando tu sueldo sube solo para no perder poder adquisitivo, pasas a pagar un porcentaje algo mayor sin haber ganado más en términos reales.',
    matiz:
      'Se llama «progresividad en frío». El Banco de España calcula que recaudó unos 11.000 M€ de más entre 2019 y 2024. Varias comunidades sí ajustaron su parte; el Estado no.',
    norma: 'Sin norma: ausencia de deflactación de la tarifa estatal del IRPF',
  },
  {
    icono: '🏠',
    titulo: 'Compras una vivienda de segunda mano (o recibes una herencia)',
    tono: 'mixto',
    resumen:
      'Puedes pagar más aunque no haya subido ningún tipo. Desde 2022 el impuesto se calcula sobre el «valor de referencia» que fija el Catastro (Estado), no sobre el precio que pagas. Si ese valor oficial es mayor que el precio real, la factura sube.',
    matiz:
      'El tipo concreto (ITP o Sucesiones) lo fija tu comunidad autónoma; lo que cambió a nivel estatal es la base sobre la que se aplica.',
    norma: 'Ley 11/2021 (valor de referencia del Catastro)',
  },
  {
    icono: '🏖️',
    titulo: 'Tienes una segunda vivienda',
    tono: 'mixto',
    resumen:
      'Por tenerla, no pagas más que antes: el «alquiler ficticio» que Hacienda imputa en el IRPF (1,1%–2% del valor catastral) sigue igual. Lo que sí endureció el Estado es el recargo del IBI a las viviendas vacías: la Ley de Vivienda de 2023 elevó el tope del 50% al 150% de la cuota.',
    matiz:
      'Ese recargo apunta a pisos vacíos más de 2 años y sobre todo a grandes tenedores (4+ viviendas en el municipio): la segunda residencia de uso estacional está exenta, y solo se aplica si tu ayuntamiento lo activa. Vender con ganancia sí tributa algo más por la subida de los tramos del ahorro (2021–2025).',
    norma: 'Ley 12/2023 por el derecho a la vivienda; tramos del ahorro del IRPF',
  },
  {
    icono: '🏢',
    titulo: 'Tienes o montas una empresa',
    tono: 'mixto',
    resumen:
      'Depende del tamaño. Las grandes pagan más: un mínimo del 15%, un nuevo impuesto complementario global (exigido por la UE) y más límites para compensar pérdidas. Las pequeñas pagan menos: el tipo bajó del 25% al 23% en 2023 y sigue bajando para micropymes desde 2025.',
    norma: 'Ley 31/2022 y Ley 7/2024 (Impuesto sobre Sociedades)',
  },
  {
    icono: '👷',
    titulo: 'Contratas a un trabajador',
    tono: 'sube',
    etiqueta: 'Cotización, no impuesto',
    resumen:
      'Cuesta algo más, pero por cotizaciones sociales, no por impuestos. Se añadió el MEI (0,8% del salario en 2025, que paga sobre todo la empresa y sube hasta el 1,2% en 2029). Para los sueldos altos se suma una «cuota de solidaridad» sobre la parte que supera el tope de cotización.',
    matiz: 'Sumando todo, la empresa paga ~30 % del bruto en cotizaciones (media UE ~22 %). La cuña fiscal de un salario medio es del 41,4 %, por encima de la media UE — y la soporta sobre todo la empresa. Ver «El coste de contratar».',
    norma: 'RDL 2/2023 (reforma de pensiones)',
  },
  {
    icono: '🗑️',
    titulo: 'Te llega el recibo de la basura',
    tono: 'ue',
    resumen:
      'Sube en casi toda España, y la causa es europea: una directiva de la UE obliga a que la tasa cubra el coste real del servicio. La Ley 7/2022 lo trasladó a los municipios. La media subió un 16,2% en 2025 (unos 116 € por vivienda) y seguirá subiendo.',
    matiz:
      'El importe exacto lo pone tu ayuntamiento; la obligación de cobrarla y de que no tenga déficit viene de Europa.',
    norma: 'Directiva (UE) 2018/851 → Ley 7/2022, art. 11.3',
  },
  {
    icono: '⚡',
    titulo: 'Tu factura de la luz y la cesta de la compra',
    tono: 'vaiven',
    resumen:
      'Subió, bajó y ha vuelto a su sitio. Durante la crisis de precios, el IVA de la luz bajó al 10% y el de los alimentos básicos al 0%. En 2025 ambos han vuelto a sus tipos normales (21% la luz, 4% los alimentos). El aceite de oliva se quedó rebajado al 4% de forma permanente.',
    norma: 'Varios Reales Decretos-leyes (2021–2025)',
  },
  {
    icono: '⛽',
    titulo: 'Llenas el depósito de diésel',
    tono: 'sin_cambio',
    resumen:
      'No subió. El Gobierno intentó igualar el impuesto del diésel al de la gasolina a finales de 2024, pero el Congreso lo rechazó. A junio de 2026 sigue sin aprobarse (aunque es un compromiso pendiente con la UE para más adelante).',
    norma: 'La enmienda decayó en la tramitación de la Ley 7/2024',
  },
  {
    icono: '🚬',
    titulo: 'Fumas o vapeas',
    tono: 'sube',
    resumen:
      'Más caro. El impuesto del tabaco subió en 2025 (la cajetilla subió unos 37 céntimos): para un paquete al día son unos 130 € más al año. Y se creó un impuesto nuevo sobre los líquidos de los cigarrillos electrónicos y las bolsas de nicotina.',
    norma: 'Ley 7/2024',
  },
  {
    icono: '📈',
    titulo: 'Inviertes en bolsa o tienes un gran patrimonio',
    tono: 'sube',
    resumen:
      'Más impuestos para el capital alto. Comprar acciones de grandes empresas españolas paga un 0,2% desde 2021 (la «tasa Tobin»). Las rentas del ahorro más altas tributan más (nuevos tramos en 2021, 2023 y 2025). Y los patrimonios de más de 3 millones pagan el nuevo impuesto de grandes fortunas.',
    norma: 'Ley 5/2020 (ITF), Ley 38/2022 (grandes fortunas) y Ley 7/2024',
  },
];

// ---------- Comparativa europea (Eurostat, mismo indicador) ----------
// Presión fiscal total (% PIB), descarga directa de la API de Eurostat.
export const comparativaUE = {
  anioA: 2018,
  anioB: 2023,
  serie: [
    { label: 'Francia', y2018: 48.3, y2023: 45.6 },
    { label: 'Italia', y2018: 41.8, y2023: 41.4 },
    { label: 'Eurozona', y2018: 41.5, y2023: 40.5 },
    { label: 'Alemania', y2018: 41.1, y2023: 40.1 },
    { label: 'Media UE-27', y2018: 41.1, y2023: 39.9 },
    { label: 'Portugal', y2018: 37.0, y2023: 37.2 },
    { label: 'España', y2018: 35.2, y2023: 37.1, destacado: true },
  ],
};

// ---------- El coste de contratar: cuña fiscal (OCDE) ----------
// Cuña fiscal = % del coste laboral total que se va en IRPF + cotizaciones
// (trabajador soltero, salario medio). Fuente: OCDE, Taxing Wages 2026 (datos 2025).
export const cunaFiscal = {
  fuente: 'OCDE, Taxing Wages 2026 (salario medio, soltero, 2025)',
  paises: [
    { label: 'Alemania', v: 49.3 },
    { label: 'Francia', v: 47.2 },
    { label: 'Austria', v: 47.1 },
    { label: 'Italia', v: 45.8 },
    { label: 'España', v: 41.4, destacado: true },
    { label: 'Media UE + RU', v: 38.9, media: true },
    { label: 'Media OCDE', v: 35.1, media: true },
  ],
  // De cada 100 € de coste laboral en España:
  desglose: [
    { label: 'Cotización de la empresa', v: 23.4, color: '#d64545' },
    { label: 'IRPF del trabajador', v: 13.0, color: '#d9952a' },
    { label: 'Cotización del trabajador', v: 5.0, color: '#c2641a' },
    { label: 'Neto que recibe el trabajador', v: 58.6, color: '#2e9e6b' },
  ],
  empresaSobreBruto: 30,        // % del salario bruto que paga la empresa en cotizaciones
  empresaSobreBrutoUE: 21.9,    // media UE-27
  cotizPctRecaudacion: 25.8,    // cotizaciones como % de todo lo recaudado (España)
  cotizPctRecaudacionUE: 17.9,  // media UE
};

// ---------- A dónde va el dinero: gasto público por función (COFOG) ----------
// Fuente: IGAE, clasificación funcional COFOG 2024 (recopilado por FEDEA).
// Total administraciones públicas (incluida la Seguridad Social).
export const gastoPublico = {
  total: 725001,     // M€ en 2024
  pctPIB: 45.5,
  fuente: 'IGAE — clasificación funcional COFOG 2024 (FEDEA)',
  partidas: [
    { label: 'Pensiones', pct: 28.4, me: 206119, color: '#2563eb' },
    { label: 'Sanidad', pct: 14.2, me: 102942, color: '#7c5cd6' },
    { label: 'Servicios generales (incluye intereses de la deuda)', pct: 12.8, color: '#c2641a' },
    { label: 'Resto de protección social (paro, dependencia, familia…)', pct: 12.6, color: '#0d9488' },
    { label: 'Asuntos económicos (infraestructuras, subvenciones…)', pct: 11.2, color: '#d9952a' },
    { label: 'Educación', pct: 9.1, color: '#2e9e6b' },
    { label: 'Otros (seguridad, defensa, cultura, medio ambiente, vivienda…)', pct: 11.7, color: '#94a3b8' },
  ],
  // Apuntes verificables para la nota
  proteccionSocialTotal: 41,   // pensiones + resto de protección social, % del gasto
  interesesDeuda: 39000,       // M€ aprox. en intereses de la deuda (2024)
};

// ---------- Balance: movimientos normativos por dirección ----------
const cuenta = (d) => lineaTiempo.filter((e) => e.direccion === d).length;
export const balance = [
  { key: 'sube', label: 'Subidas', n: cuenta('sube'), color: '#d64545' },
  { key: 'nuevo', label: 'Impuestos nuevos', n: cuenta('nuevo'), color: '#7c5cd6' },
  { key: 'baja', label: 'Bajadas', n: cuenta('baja'), color: '#2e9e6b' },
  { key: 'reversion', label: 'Reversiones (rebajas que volvieron)', n: cuenta('reversion'), color: '#b45309' },
  { key: 'temporal', label: 'Prórrogas temporales', n: cuenta('temporal'), color: '#d9952a' },
  { key: 'sin_cambio', label: 'Intentos no aprobados / sin cambio', n: cuenta('sin_cambio'), color: '#64748b' },
];

// ---------- Las 8 figuras nuevas, con año y recaudación 2025 (AEAT) ----------
export const impuestosNuevos = [
  { nombre: 'Transacciones financieras («tasa Tobin»)', anio: 2021, me: f2025.itf },
  { nombre: 'Servicios digitales («tasa Google»)', anio: 2021, me: f2025.idsd },
  { nombre: 'Grandes fortunas (ITSGF)', anio: 2022, me: null },
  { nombre: 'Envases de plástico no reutilizables', anio: 2023, me: f2025.plasticos },
  { nombre: 'Depósito de residuos e incineración', anio: 2023, me: null, ue: true },
  { nombre: 'Impuesto complementario (Pilar 2)', anio: 2024, me: null, ue: true },
  { nombre: 'Margen de entidades financieras (banca)', anio: 2025, me: f2025.impuestoMargenEntidadesFinancieras },
  { nombre: 'Líquidos de vapeo y nicotina', anio: 2025, me: null },
];

// ---------- Calculadora: rémora fiscal del IRPF + nueva cotización ----------
// Estimación orientativa del efecto de las decisiones estatales en una nómina.
// Inflación acumulada IPC junio 2018 → diciembre 2025 = 23,3% (INE, calculadora oficial varipc).
export const IPC_2018_2025 = 1.233;

// Escala de referencia del IRPF 2025 (tramo estatal + autonómico de referencia).
const ESCALA_IRPF = [
  [0, 12450, 0.19],
  [12450, 20200, 0.24],
  [20200, 35200, 0.30],
  [35200, 60000, 0.37],
  [60000, 300000, 0.45],
  [300000, Infinity, 0.47],
];
const escala = (base) =>
  ESCALA_IRPF.reduce((acc, [a, b, t]) => acc + Math.max(0, Math.min(base, b) - a) * t, 0);

// Cuota de IRPF simplificada (solo nómina, sin deducciones autonómicas/personales).
export function cuotaIRPF(bruto) {
  const rnt = Math.max(0, bruto - 2000); // gastos deducibles
  let redTrabajo = 0;
  if (rnt <= 14852) redTrabajo = 7302;
  else if (rnt < 19747.5) redTrabajo = Math.max(0, 7302 - 1.49 * (rnt - 14852));
  const base = Math.max(0, bruto - 2000 - redTrabajo);
  return Math.max(0, escala(base) - escala(5550)); // mínimo personal
}

// Base máxima de cotización 2025 ≈ 4.909,50 €/mes.
const BASE_MAX_2025 = 4909.5 * 12;
export function calculaImpacto(bruto) {
  // Rémora fiscal: lo que pagas de más porque los tramos no se han deflactado.
  const remora = Math.max(0, cuotaIRPF(bruto) - IPC_2018_2025 * cuotaIRPF(bruto / IPC_2018_2025));
  // MEI: nueva cotización del trabajador (0,13% en 2025 sobre base, tope base máxima).
  const mei = 0.0013 * Math.min(bruto, BASE_MAX_2025);
  const irpf = cuotaIRPF(bruto);
  return {
    irpf,
    tipoMedio: bruto > 0 ? irpf / bruto : 0,
    remora,
    mei,
    total: remora + mei,
    sobreBaseMax: bruto > BASE_MAX_2025,
  };
}

// ---------- Catálogos de presentación ----------
export const ORIGENES = {
  estatal: { label: 'Gobierno central', color: '#2563eb' },
  ue: { label: 'Origen UE', color: '#0d9488' },
};

export const VEREDICTOS = {
  subio: { label: 'Subió', color: '#d64545', bg: '#fdecec' },
  bajo: { label: 'Bajó', color: '#2e9e6b', bg: '#e9f7f0' },
  mixto: { label: 'Mixto', color: '#d9952a', bg: '#fdf4e3' },
  nuevo: { label: 'Nuevo impuesto', color: '#7c5cd6', bg: '#f1ecfb' },
  sin_cambio: { label: 'Sin cambio', color: '#64748b', bg: '#f1f5f9' },
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
