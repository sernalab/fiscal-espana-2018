# Notas metodológicas — Tributos autonómicos (4 CCAA muestra)

**Fecha de investigación:** 2026-06-05
**Periodo cubierto:** junio 2018 → 2026-06-05
**CCAA muestra:** Cataluña, Madrid, Andalucía, Comunidad Valenciana
**Archivo de datos:** `autonomicos.json`

---

## 0. Sobre las herramientas y el grado de verificación

- `WebFetch`, `curl` (Bash) e `Invoke-RestMethod` (PowerShell) estuvieron **DENEGADOS** por permisos (igual que en la investigación previa de `series.json`).
- A diferencia de aquella, en esta investigación `WebSearch` **sí devolvió contenido literal abundante** procedente de dominios oficiales (BOE, BOJA, DOGV, hacienda.gob.es, ATC `atc.gencat.cat`, ATV `atv.gva.es`, Junta de Andalucía, Comunidad de Madrid, Generalitat) y de despachos de referencia (Garrigues, Cuatrecasas, Uría, Toda & Nel-lo).
- En consecuencia, **el sentido de cada cambio (sube/baja/mixto) está verificado** y la mayoría de normas tienen referencia y URL. Lo que NO se ha podido comprobar palabra por palabra (artículo y fecha exactos en el boletín autonómico) se marca como `verificacion: "parcial"` o `"no_concluyente"` y `urlNorma: "no_verificado"`.
- **No se ha inventado ninguna norma ni porcentaje.**

**Fuente más eficiente (confirmada):** Ministerio de Hacienda, libro electrónico **"Tributación Autonómica. Medidas [año]"**. El capítulo IV recopila todas las medidas vigentes por CCAA en cada tributo cedido. Punto de entrada: https://www.hacienda.gob.es/es-ES/Areas%20Tematicas/Financiacion%20Autonomica/Paginas/Libro%20electronico.aspx (en 2024 registró 180 medidas nuevas o modificadas). No se pudo descargar el PDF completo (WebFetch denegado), pero su existencia y estructura están confirmadas.

---

## 1. Qué se verificó y dónde

### Sucesiones y Donaciones (ISD)

| CCAA | Cambio | Dirección | Verificación | Fuente clave |
|---|---|---|---|---|
| Andalucía | Bonif. 99% Grupos I-II (2019), consolidada 2021 | **baja** | verificado | BOJA Decreto-ley 1/2019 + BOE Ley 5/2021 |
| C. Valenciana | Bonif. 99% Grupos I-II (mayo 2023) | **baja** | verificado | BOE Ley 6/2023 + ATV |
| Cataluña | Coeficientes por patrimonio preexistente + recorte bonif. (2020) | **sube** | verificado | BOE Ley 5/2020 + ATC |
| Madrid | 99% familia directa mantenido + ampliación a colaterales (25%→¿50%?) | **baja** | parcial | C. de Madrid (notas) |

- **Andalucía**: el Decreto-ley 1/2019 (BOJA 2019/508) introdujo la bonificación del 99% para Grupos I y II en mortis causa e inter vivos; consolidada en la Ley 5/2021 de Tributos Cedidos. VERIFICADO en BOJA y BOE.
- **C. Valenciana**: confirmado que la situación de partida en 2018 era una bonificación del 50% (75% para menores de 21 / discapacidad), tras recortes en 2013 (99%→75%) y 2017 (→50%, supresión en donaciones). La Ley 6/2023 restaura el 99% con efectos retroactivos al 28/05/2023. VERIFICADO en BOE (BOE-A-2023-26466) y ATV.
- **Cataluña**: la Ley 5/2020 SUBIÓ el ISD (govern ERC-JxCat). Verificado el detalle de coeficientes multiplicadores (x1,00 a x1,20 por tramos de patrimonio preexistente) y la incompatibilidad bonificación-reducción. VERIFICADO en BOE (BOE-A-2020-5569), ATC y Garrigues.
- **Madrid**: el 99% para Grupos I y II se mantiene durante todo el periodo. La ampliación a hermanos/tíos/sobrinos (Grupo III) al 25% (con anuncio posterior de 50%) está confirmada cualitativamente por notas de la Comunidad de Madrid, pero **no se ha localizado el texto exacto del BOCM ni confirmado el salto al 50%** → `parcial`.

### Patrimonio

| CCAA | Cambio | Dirección | Verificación |
|---|---|---|---|
| Madrid | 100% bonif. desde 2008; reactivación defensiva 2023 (ITSGF) | **mixto** | verificado |
| Andalucía | 100% bonif. (2022); ajuste 2023 (ITSGF) | **baja** | parcial |
| Cataluña | Tipo máx. 2,75%→3,48% para >20 M€ (DL 16/2022); mín. exento 500.000 € | **sube** | verificado |
| C. Valenciana | Tipo máx. 3,5% (2023); mín. exento 500.000 €→1.000.000 € (2025) | **mixto** | parcial |

- **Madrid**: confirmado el 100% desde la Ley 3/2008 y la Ley 12/2023 (BOE-A-2024-5609) que suspende temporalmente la bonificación general mientras rige el ITSGF, sustituyéndola por una bonificación por la diferencia. **Punto clave del encargo bien documentado**: NO es subida real para el contribuyente, es captura de recaudación que de otro modo iría al Estado. VERIFICADO.
- **Andalucía**: bonificación 100% anunciada en sep. 2022 (Decreto-ley 7/2022) + mecanismo análogo al de Madrid frente al ITSGF. Sentido verificado (Garrigues); referencia exacta de BOJA no comprobada → `parcial`.
- **Cataluña**: confirmado que el tramo del 3,48% para >20 M€ se introdujo por **Decreto-ley 16/2022** (NO por la Ley 5/2020, que afectó al ISD). El tipo máximo anterior era 2,75%. Mínimo exento 500.000 € (inferior al estatal de 700.000 €). VERIFICADO en ATC y Cuatrecasas.
- **C. Valenciana**: escala 0,25%-3,5% para 2023-2024 (manual AEAT de Patrimonio 2023) y elevación del mínimo exento a 1.000.000 € con la Ley 5/2025 (efectos 31/12/2025). Referencias exactas de DOGV no comprobadas → `parcial`.

### ITP-AJD (tipo general de vivienda usada)

| CCAA | 2018 | Hoy | Dirección |
|---|---|---|---|
| Andalucía | 8-9-10% (progresivo) | **7% único** (2021) | **baja** |
| Madrid | 6% | 6% + deducción 10% vivienda hab. | **baja** |
| C. Valenciana | 10% | 10% + **11%** para >1 M€ (2023) | **sube** |
| Cataluña | 10% (con 11% para exceso >1 M€) | **10-13%** progresivo + 20% grandes tenedores (2025) | **sube** |

- **Andalucía**: Decreto-ley 7/2021 (BOJA 2021/537) bajó a 7% único (temporal hasta 31/12/2021), consolidado permanente por la Ley 5/2021. VERIFICADO.
- **Madrid**: el tipo general del 6% **ya era 6% en 2018 y no cambió**. La "rebaja del 10%" es una **deducción del 10% de la cuota** para vivienda habitual de hasta 250.000 €, no una bajada del tipo. Ojo a no confundir. → `parcial`.
- **C. Valenciana**: tipo del 11% para inmuebles >1 M€ desde 2023 (general sigue en 10%). VERIFICADO en ATV y OCU.
- **Cataluña**: la subida fuerte (escala 10-13% con primer salto bajado a 600.000 € + 20% grandes tenedores) **entró en vigor el 27/06/2025**. VERIFICADO por idealista/news y Toda & Nel-lo. Referencia exacta de DOGC no comprobada palabra por palabra.

### IRPF (tramo autonómico) y deflactación

- **Madrid**: rebaja de medio punto en todos los tramos + **deflactación 2022 (4,1%), 2023 (3,1%) y 2024**. Primera CCAA de régimen común en deflactar. Porcentajes en notas oficiales de la C. de Madrid; leyes anuales exactas no comprobadas en BOCM → `parcial`.
- **Andalucía**: rebaja de la escala (marginal máximo autonómico 22,5%) por Ley 5/2021 + deflactaciones posteriores. VERIFICADO el sentido.
- **Cataluña**: Ley 5/2020 — sube mínimo exento (rentas bajas) pero SUBE tramos >90.000 € (nuevo tramo). Sin deflactación general. VERIFICADO. → `mixto`.
- **C. Valenciana**: rebaja/deflactación desde 2023 con el nuevo gobierno. **Es el dato MENOS verificado de toda la investigación** (sin porcentajes ni norma exacta localizados) → `no_concluyente`.

### Valor de referencia (Ley 11/2021, ESTATAL)

- VERIFICADO en BOE (BOE-A-2021-11473). Vigente como base imponible mínima de ITP e ISD desde 01/01/2022.
- Caso clave de disociación **quién obliga (Estado) vs quién recauda (CCAA)**: una CCAA podía bajar su tipo mientras la cuota real subía por elevación de la base estatal.
- El **Tribunal Constitucional avaló** el valor de referencia (sentencia conocida en feb. 2026, fuente delaJusticia.com). Conviene contrastar el número de sentencia exacto en el BOE/CENDOJ cuando haya WebFetch.

---

## 2. Lo que NO se pudo confirmar (checklist para reejecución con WebFetch)

- [ ] Madrid ISD colaterales: localizar el texto exacto del BOCM (¿Ley 7/2022?) y confirmar si la bonificación de hermanos/tíos/sobrinos quedó en 25% o se elevó al 50%.
- [ ] Andalucía Patrimonio: referencia exacta del Decreto-ley 7/2022 en BOJA y redacción del mecanismo de bonificación por diferencia con el ITSGF.
- [ ] Cataluña Patrimonio: cita exacta del Decreto-ley 16/2022 en DOGC (tramo 3,48% para >20 M€).
- [ ] Cataluña ITP 2025: número y fecha exactos de la norma en DOGC (escala 10-13% y 20% grandes tenedores).
- [ ] C. Valenciana Patrimonio: referencia exacta de la LPG 2023 (escala 0,25-3,5%) y de la Ley 5/2025 (mínimo exento 1.000.000 €) en DOGV.
- [ ] C. Valenciana IRPF: confirmar porcentajes y norma de la rebaja/deflactación 2023-2024 (dato no concluyente).
- [ ] Madrid IRPF: leyes anuales de deflactación 2022/2023/2024 en BOCM.
- [ ] Valor de referencia: número de la sentencia del TC (feb. 2026) en BOE/CENDOJ.
- [ ] Descargar el PDF "Tributación Autonómica. Medidas" (cap. IV) de hacienda.gob.es para contrastar todo de una sola fuente consolidada.

---

## 3. Conclusión transversal (neutralidad)

La dirección de los cambios depende de CADA CCAA y de su gobierno, no del Gobierno central:

- **Andalucía (PP desde 2019)** y **Madrid (PP)**: bajadas generalizadas en los cuatro tributos.
- **C. Valenciana**: trayectoria mixta con punto de inflexión en 2023 (sube con PSOE-Compromís, baja con PP-Vox).
- **Cataluña (govern independentista / PSC)**: subidas generalizadas (ISD, Patrimonio, IRPF alto, ITP 2025).

El color político se indica solo como contexto neutro. La capa estatal (valor de referencia, Ley 11/2021, e ITSGF, Ley 38/2022) interactúa con la autonómica: el Estado puede elevar la base o crear figuras que las CCAA contrarrestan con su normativa, de ahí los ajustes "defensivos" de Madrid y Andalucía en Patrimonio en 2023.
