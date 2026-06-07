# Tributos locales de España (jun 2018 – jun 2026) — Notas de investigación

**Fecha:** 2026-06-05
**Foco:** Barcelona + municipio de contraste **Begues** (Baix Llobregat, 7.439 hab.).
**Tesis central:** Los tributos locales los fija cada **ayuntamiento** dentro del marco del TRLHL (RDL 2/2004). El Estado fija marcos (mínimos/máximos, tarifas base) y a veces **obliga** (transponiendo la UE), pero la **cuantía** es decisión municipal. Distinguir siempre **quién obliga** de **quién fija el importe**.

---

## Limitación crítica del entorno

Solo estuvo disponible **WebSearch** (titulares + fragmentos). **WebFetch, Bash y PowerShell fueron DENEGADOS** por permisos. Consecuencias:

- **No se pudieron abrir los PDF** de las ordenanzas fiscales de Barcelona (1.1 IBI, 1.2 IVTM, 1.3 IIVTNU, 3.18 residuos) ni el informe PDF del Observatorio de la Fiscalidad de los Residuos. Solo se han usado cifras que aparecieron **literalmente** en fragmentos de búsqueda de dominios oficiales o de medios fiables que los citan.
- **No se pudo validar el JSON con un parser** (node/PowerShell denegados). `locales.json` se revisó manualmente; está bien formado.
- **No se ha inventado ningún coeficiente ni importe.** Lo no confirmado se marca como *no verificado*.

---

## Hallazgos por tributo

### 1. IVTM — Impuesto de circulación
- **Marco estatal (art. 95 TRLHL):** el cuadro de tarifas base puede modificarse por LPGE, pero la última fijación efectiva del cuadro proviene de la reforma de la Ley 51/2002 (vigente desde 2003), consolidada en el RDL 2/2004. **Hallazgo clave (alta confianza, no cita literal):** ninguna LPGE posterior lo ha modificado → **tarifas base estatales congeladas ~20 años**. No localicé una frase oficial que lo afirme textualmente; marcado *no verificado* al 100%, pero es coherente con todas las fuentes.
- **Coeficiente municipal (art. 95.4):** máximo legal **2**. Barcelona es de los IVTM más altos de España. El **coeficiente exacto de Barcelona en 2018** NO se verificó (PDF no abierto).
- **Barcelona hoy:** OF 2025 (def. 20-dic-2024, vigor 1-ene-2025) **congelan el IVTM** a la ciudadanía. Solo se acotan bonificaciones ambientales (ECO/ZERO a 5 años; eléctricos al 50%).
- **Begues (contraste, VERIFICADO):** subió el coeficiente IVTM de **1,66 → 1,70** en 2025, "**primera vez desde 2009**". Prueba doble: (a) la cuantía es municipal; (b) la base estatal lleva tanto congelada que ni el coeficiente local se tocó en 16 años.
- **Veredicto:** **MUNICIPAL**. Si el IVTM sube, es el ayuntamiento, no el Gobierno central.

### 2. Tasa de residuos — LA PIEZA CLAVE
- **Cadena:** Directiva (UE) 2018/851 → **Ley 7/2022, de 8 de abril** (BOE-A-2022-5809), **art. 11.3**: obliga a las entidades locales a tener una tasa/prestación **específica, diferenciada y NO deficitaria** que refleje el coste real. **Plazo: 10-abril-2025.** (Verificado.)
- **Quién obliga:** Cortes (transponiendo la UE). **Quién fija el importe:** cada ayuntamiento. **Caso más claro** de separación entre ambos.
- **Barcelona (cronología verificada vía prensa):**
  1. **2020-2021:** gobierno de Colau impulsa la tasa de recogida domiciliaria (OF 3.18), **vinculada al contrato de agua**.
  2. **~2022:** **anulada por el TSJC**.
  3. **2024:** el **Tribunal Supremo** anula la sentencia del TSJC → restablecida (de facto nunca se dejó de cobrar).
  4. **Dic-2024 → vigor 1-ene-2025:** nueva OF 3.18 diseñada para cumplir el **no déficit** de la Ley 7/2022, con **aplicación progresiva** del importe. Importe concreto por hogar: *no verificado* (PDF no abierto).
  - Distinto de la **TMTR metropolitana (AMB)**, que trata (no recoge) y subió **~10% de media** para 2025 (~6€/año más para el 71% de domésticos).
  - **Matiz sobre la pregunta del usuario:** la idea de "2020 introdujo una tasa para generadores domésticos vinculada al agua" se **confirma** (Colau, 2020-2021, vinculada al agua). Importes/fechas exactas del PDF: no verificados.
- **Begues:** adaptó su tasa en 2025 a la Ley 7/2022. Importe: *no verificado*.
- **Sant Just Desvern (contraste adicional):** **baja** la cuota fija de residuos de **120€ (2025) → 96€ (2026)** — una vez obligados, el importe sigue siendo municipal (incluso a la baja).
- **Datos agregados (VERIFICADO vía fragmentos):** Observatorio de la Fiscalidad de los Residuos (**Fundació ENT**), informe *Las Tasas de Residuos en España 2025*, **131 municipios**:
  - Tasa media doméstica **2025: 116,32 €/vivienda** (vs **100,12 €** en 2024) → **+16,2%**.
  - **Cobertura media de costes: 65,5%** (+~12 puntos vs 2024).
  - Pese al plazo de abril 2025, **la mayoría aún incumple** el 100% (no déficit).
- **Veredicto:** **ESTADO/UE OBLIGA, AYUNTAMIENTO FIJA EL IMPORTE.**

### 3. IBI
- **Tipo (art. 72 TRLHL):** urbana 0,4%–1,1%; lo fija el ayuntamiento.
- **Barcelona:** tipo general urbana **0,66% en 2018** y **sigue en 0,66%** (OF 2025 lo congelan a la ciudadanía). Subidas selectivas 2025 **solo** a 233 inmuebles de ocio/hostelería y 130 **BICES** (Puerto, terminales de cruceros). El **0,769%** que circula en simuladores = tipo general + recargo/tipo diferenciado de ciertos usos, **no** el residencial general.
- **Begues (contraste, VERIFICADO):** **0,88% → 0,90%** en 2025 (+2,23%). Contraste directo con Barcelona (congela).
- **Valores catastrales:** los fija el **Estado (Catastro)**; las actualizaciones por coeficientes vienen en la LPGE/RD **a petición del municipio** (art. 32.2 TRLCI). No localicé una ponencia de valores reciente específica de Barcelona en el periodo (*no verificado* si la hubo).
- **Veredicto:** **MUNICIPAL (tipo) / ESTADO (valor catastral).**

### 4. Plusvalía municipal (IIVTNU)
- **STC 182/2021 (26-oct-2021):** anuló el método objetivo de la base (capacidad económica, art. 31 CE) → impuesto temporalmente inaplicable.
- **RDL 26/2021, de 8 de noviembre** (BOE núm. 268, de 9-nov-2021, vigor 10-nov-2021): restableció con **doble método a elegir** — (a) objetivo (valor catastral suelo × coeficiente por años) o (b) real (venta − compra) — y **no se paga sin ganancia**. **Constitucional por STC de 9-mar-2023.**
- **¿Sube o baja?** Depende del caso (neutralidad): mejora para quien vende con poca/ninguna plusvalía (antes se pagaba aun con pérdidas); similar al anterior para grandes plusvalías. La elección de método la hace el **contribuyente**.
- **Barcelona:** tipo **30%** (máximo legal), **sin cambio**; lo que cambió fue el método (impuesto por el Estado tras el TC). OF 1.3 adaptada (provisional 23-dic-2022 → 2023 y ss.; nueva versión def. 20-dic-2024 → 1-ene-2025).
- **Begues:** adaptó su ordenanza al RDL 26/2021 (mismo método estatal); tipo/coeficientes concretos *no verificados*.
- **Veredicto:** **ESTADO (método, obligado por el TC) / MUNICIPAL (tipo y coeficientes).**

---

## Lista de "no verificado" (pendiente si se habilita WebFetch)

1. Cita oficial literal de que el cuadro del art. 95 IVTM no se ha modificado por ninguna LPGE desde 2003.
2. Coeficiente exacto del IVTM de Barcelona en 2018 (y comparación numérica con hoy).
3. Importes concretos de la tasa de residuos 3.18 de Barcelona por hogar (escala progresiva).
4. Importe de la tasa de residuos de Begues 2025.
5. Tipo y coeficientes de la plusvalía (IIVTNU) de Begues.
6. Existencia/fecha de ponencia de valores catastrales reciente en Barcelona en el periodo.
7. Fecha exacta de la STC que anuló la tasa de Barcelona en el TSJC y de la del Supremo que la restableció (año confirmado ~2022 TSJC / 2024 Supremo; día exacto no verificado).

## Fuentes principales
- TRLHL (RDL 2/2004): https://www.boe.es/buscar/act.php?id=BOE-A-2004-4214
- Ley 7/2022 (residuos): https://www.boe.es/buscar/act.php?id=BOE-A-2022-5809
- RDL 26/2021 (plusvalía): https://www.boe.es/buscar/doc.php?id=BOE-A-2021-18276
- OF 2025 Barcelona (nota oficial): https://ajuntament.barcelona.cat/premsa/2024/12/20/el-plenari-aprova-definitivament-les-ordenances-fiscals-2025/
- Ordenanzas Barcelona (PDF, no abiertos): 1.1 IBI, 1.2 IVTM, 1.3 IIVTNU, 3.18 residuos en ajuntament.barcelona.cat/hisenda
- Informe ENT tasas residuos 2025: https://www.fiscalidadresiduos.org/wp-content/uploads/2025/10/Tasas_2025.pdf
- RETEMA (resumen informe ENT): https://www.retema.es/actualidad/las-tasas-de-residuos-aumentan-un-16-en-2025-pero-siguen-sin-cubrir-los-costes-del
- Begues OF 2025: https://www.begues.cat/actualitat/noticies/aprovacio-inicial-de-les-ordenances-fiscals-per-a-lany-2025.html
- Idescat Begues (población): https://www.idescat.cat/emex/?id=080207
- Sant Just Desvern residuos: https://residus.santjust.net/faq/
