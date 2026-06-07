// Extrae series verificadas del Excel oficial AEAT (Cuadros_IART25.xlsx)
// Fuente: AEAT, Informe Anual de Recaudación Tributaria 2025 (cuadros 1.5 y 1.6)
const X = require('xlsx');
const fs = require('fs');

const wb = X.readFile('research/Cuadros_IART25.xlsx');

// ---- Cuadro 1.6: ingresos tributarios totales (caja), M€ ----
const rows16 = X.utils.sheet_to_json(wb.Sheets['1.6'], { header: 1, defval: null });
const col = (anio) => 2 + (anio - 1995); // col 2 = 1995
const ANIOS = [];
for (let a = 2015; a <= 2025; a++) ANIOS.push(a);

const FILAS = {
  irpf: 8, sociedades: 19, irnr: 28, fiscalidadMedioambiental: 29,
  impuestoMargenEntidadesFinancieras: 30, otrosCapI: 31, capI: 32,
  iva: 34, iiee: 37, plasticos: 45, traficoExterior: 48, primasSeguros: 49,
  itf: 50, idsd: 51, juego: 52, otrosCapII: 53, capII: 54, capIII: 67, total: 69,
};

const r1 = (v) => (v === null || v === undefined ? null : Math.round(v * 10) / 10);
const serie = ANIOS.map((anio) => {
  const fila = { anio };
  for (const [k, idx] of Object.entries(FILAS)) fila[k] = r1(rows16[idx][col(anio)]);
  return fila;
});

// ---- Cuadro 1.5: impacto recaudatorio de cambios normativos y de gestión, M€ ----
const rows15 = X.utils.sheet_to_json(wb.Sheets['1.5'], { header: 1, defval: null });
const dump15 = rows15
  .map((r, i) => ({ i, label: r[1], valores: r.slice(2, 40) }))
  .filter((r) => typeof r.label === 'string' && r.valores.some((v) => v !== null));

// Fila 63 = TOTAL del cuadro 1.5: impacto neto anual de los cambios normativos (M€)
const impactoNormativo = ANIOS.map((anio) => ({ anio, impactoME: r1(rows15[63][col(anio)]) }));

fs.writeFileSync(
  'research/aeat-verificado.json',
  JSON.stringify(
    {
      _meta: {
        fuente: 'AEAT — Informe Anual de Recaudación Tributaria 2025, Cuadros 1.5 y 1.6',
        url: 'https://sede.agenciatributaria.gob.es/static_files/AEAT/Estudios/Estadisticas/Informes_Estadisticos/Informes_Anuales_de_Recaudacion_Tributaria/Ejercicio_2025/Cuadros_IART25_es_es.xlsx',
        fechaDescarga: '2026-06-05',
        unidad: 'millones de euros (caja)',
        nota: 'Extraído del Excel oficial descargado de la sede de la AEAT. Cuadro 1.6 = ingresos tributarios totales por figura. ITSGF y gravámenes temporales banca/energéticas son prestaciones/ingresos no incluidos como figura propia en 1.6 (el de banca aparece desde 2025 como Impuesto sobre el Margen de Intereses).',
      },
      ingresosPorFigura: serie,
      impactoNormativoTotal: impactoNormativo,
      cuadro15_impactoNormativo_raw: dump15,
    },
    null,
    2
  )
);
console.log('OK. Años:', ANIOS.join(','));
console.log('Total 2018:', serie.find((s) => s.anio === 2018).total, '| Total 2025:', serie.find((s) => s.anio === 2025).total);
console.log('Filas cuadro 1.5:', dump15.length);
