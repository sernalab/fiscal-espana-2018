# Fuentes — Verificación fiscal España 2018–2026

Respaldo documental de la web interactiva. Cada serie usa **una sola fuente primaria**; las demás solo como contraste. Datos descargados y verificados directamente (no de prensa) salvo donde se indica.

---

## 1. Series macro

### Presión fiscal (% PIB) — fuente única: Eurostat
- **Dataset:** `gov_10a_taxag` — Main national accounts tax aggregates
- **Indicador:** D2_D5_D91_D61_M_D995 (total impuestos + cotizaciones sociales netas), sector S13_S212, unidad PC_GDP, geo ES
- **Descarga directa API (verificada):**
  `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/gov_10a_taxag?format=JSON&lang=EN&geo=ES&na_item=D2_D5_D91_D61_M_D995&unit=PC_GDP&sector=S13_S212&sinceTimePeriod=2000`
- **Archivo local:** `research/eurostat-verificado.json`
- **Valores clave:** 2007: 37,2 · 2009: 30,5 (mínimo crisis) · 2017: 34,4 · 2018: 35,2 · 2021: 38,1 (máximo) · 2024: 37,3
- **Contraste (no mezclar series):** OCDE Revenue Statistics — discrepancia conocida 2023 (37,3 vs 36,4 según edición). Se usa solo como nota.

### Recaudación por figura e impacto normativo — fuente única: AEAT
- **Documento:** Informe Anual de Recaudación Tributaria, Ejercicio 2025 — cuadros estadísticos (Excel oficial)
- **Descarga:** sede.agenciatributaria.gob.es → Estadísticas → Informes anuales de Recaudación Tributaria → `Cuadros_IART25_es_es.xlsx`
- **Archivo local:** `research/Cuadros_IART25.xlsx` → extraído con `extract-aeat.js` → `research/aeat-verificado.json`
- **Cuadro 1.6:** ingresos tributarios por figura 1995–2025. Total 2018: 208.685 M€ → 2025: 325.356 M€
- **Cuadro 1.5:** *impacto recaudatorio de los cambios normativos* (el dato que separa subida legislada de efecto ciclo/inflación). Totales (M€): 2018: +3.617 · 2019: −3.788 · 2020: +2.940 · 2021: −501 · 2022: −7.200 · 2023: −3.342 · 2024: −2.008 · 2025: +7.820

---

## 2. Normas estatales (BOE) — selección clave

| Norma | Qué hace | Carácter |
|---|---|---|
| Ley 11/2020 (PGE 2021) — BOE-A-2020-17339 | IRPF +2 p.p. ahorro >200k y +2 p.p. trabajo >300k; Patrimonio +1% >10M; IPS 6%→8%; ITSGF germen | Permanente |
| Ley 38/2022 — BOE-A-2022-22684 | Gravámenes temporales energía/banca + ITSGF | Temporal (luego ver 7/2024) |
| Ley 7/2024 — BOE-A-2024-26694 | Impuesto margen entidades financieras (banca → permanente); IRPF ahorro 28%>300k; impuesto vapeadores | Permanente |
| RDL 10/2024 — no convalidado (BOE-A-2025-1137) | Gravamen energéticas **decayó** — no prorrogado | Extinguido |
| Ley 11/2021 antifraude — BOE-A-2021-11473 | Valor de referencia catastral (base ITP/ISD; lo fija el Estado, lo aplican CCAA) | Permanente |
| Ley 7/2022 residuos — BOE-A-2022-5809 | Art. 11.3: tasa de basuras municipal **no deficitaria** (plazo abril 2025); impuesto plásticos; impuesto vertido/incineración | Permanente (mandato UE) |
| RDL 26/2021 — BOE-A-2021-18276 | Nueva fórmula IIVTNU (plusvalía) tras STC 182/2021 | Permanente |
| IVA luz/gas/alimentos 2021–2024 (varios RDL) | Bajadas temporales y reversión escalonada 2024–2025 | Temporal ↔ reversión |
| No deflactación tarifa IRPF | **Sin norma**: la tarifa estatal no se ajusta a inflación desde 2008 → subida silenciosa («bracket creep») | Omisión |
| Hito negativo: equiparación diésel-gasolina | Propuesta en 2018-19 y 2024, **nunca aprobada** | No verificable como subida |

Cotizaciones (no son impuestos, pero suman presión fiscal Eurostat): MEI 0,6%→0,8% (RDL 2/2023), cuota de solidaridad 2025, destope progresivo bases máximas.

---

## 3. Normas autonómicas (muestra: 4 CCAA)

- **Madrid:** bonificación 100% Patrimonio mantenida; deflactación tarifa IRPF varios años; sin subidas relevantes. Dirección: **baja**.
- **Andalucía:** bonificación 100% Patrimonio (Decreto-ley 7/2022); ISD bonificado 99%; bajada tarifa IRPF. Dirección: **baja**.
- **Cataluña:** ISD reduce bonificaciones (Ley 5/2020); Patrimonio tipo máximo 3,48% (DL 16/2022); ITP 10–13% + 20% grandes tenedores (2025). Dirección: **sube**.
- **C. Valenciana:** subidas 2020–2022, giro a bajadas desde 2023 (cambio de gobierno). Dirección: **mixta**.

Detalle con referencias en `research/autonomicos.json` (algunas referencias autonómicas marcadas `no_verificado` — ver límites).

---

## 4. Ámbito local

- **IVTM (circulación):** tarifas base del TRLHL (RDLeg 2/2004) **congeladas desde 2003**. El coeficiente lo fija cada ayuntamiento. Barcelona: congelado. Begues (municipio contraste, 7.439 hab.): coef. 1,66→1,70 en 2025, primera subida desde 2009. Atribuir su subida al Gobierno central: **falso**.
- **Tasa de basuras:** cadena Directiva UE 2018/851 → Ley 7/2022 art. 11.3 (obliga a que no sea deficitaria) → ayuntamiento fija el importe. Media estatal 2025: 116,32 € (+16,2%); cobertura de costes previa: 65,5% (Fundació ENT, estudio anual de tasas de residuos).
- **IBI:** tipo lo fija el ayuntamiento. Barcelona 0,66% congelado; Begues 0,88%→0,90%.
- **IIVTNU (plusvalía):** STC 182/2021 anula el método; RDL 26/2021 lo rehace. Mixto: algunos pagan menos, otros más.

Detalle en `research/locales.json`.

---

## 5. Conteos «81/93/97/100/141 subidas» — trazabilidad

- Origen principal: **Instituto Juan de Mariana** (think tank liberal — orientación identificable) y reelaboraciones de prensa (El Español y otros).
- Criterio: cuentan *cada cambio normativo al alza* como una subida (incluye prórrogas, figuras nuevas, cotizaciones); no descuentan bajadas ni reversiones.
- Fact-checks consultados: Newtral y otros (ver `research/conteos-caveats.json`).
- Contraste objetivo: el cuadro 1.5 de la AEAT (impacto normativo **negativo** en 5 de 8 años).

---

## 6. Estudios de contexto (matices)

- **AIReF:** descomposición del aumento de recaudación — inflación ≈43%, cambios normativos ≈12–17%.
- **Banco de España:** coste de no deflactar el IRPF ≈11.000 M€ (2019–2024).
- **Funcas:** estimación ≈16.700 M€ acumulados.
- **FEDEA:** ≈736 €/familia por no deflactación.
- Distinción presión fiscal (recaudación/PIB) vs **esfuerzo fiscal** (ajustado a renta per cápita).

---

## Límites de esta verificación

1. Referencias normativas autonómicas/locales marcadas `no_verificado` o `parcial` en los JSON: la dirección del cambio está contrastada, el enlace exacto a la norma no siempre.
2. Normas 2025–2026 sin recaudación cerrada: marcadas como tales.
3. Los agentes de investigación no pudieron descargar fuentes (solo búsqueda); las series críticas (Eurostat, AEAT) las descargué y verifiqué directamente de las API/sedes oficiales.
4. OCDE solo como contraste; no se mezclan series.
