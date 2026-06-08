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
    matiz: 'Las cotizaciones no son un impuesto, pero sí encarecen tener una nómina.',
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
      'Más caro. El impuesto del tabaco subió en 2025 y, además, se creó un impuesto nuevo sobre los líquidos de los cigarrillos electrónicos y las bolsas de nicotina.',
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
