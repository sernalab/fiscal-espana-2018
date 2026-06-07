# Notas metodológicas — Series fiscales España

**Fecha de investigación:** 2026-06-05
**Estado:** INCOMPLETO. La mayoría de cifras año a año NO pudieron verificarse por un bloqueo de herramientas (ver abajo).

---

## 0. Advertencia crítica sobre el bloqueo de herramientas (lo que falta y por qué)

En este entorno **solo estuvo disponible `WebSearch`**, que devuelve titulares, URLs y fragmentos cortos, pero **no el contenido completo** de una página, PDF o respuesta de API.

Las tres herramientas que habrían permitido descargar los datos primarios fueron **DENEGADAS por permisos**:

- `WebFetch` → denegada.
- `curl` vía Bash → denegada.
- `Invoke-RestMethod` vía PowerShell → denegada.

Consecuencia directa:

- **No se pudo descargar la respuesta JSON de la API de Eurostat** (`gov_10a_taxag`), de modo que **la serie España 2000–2024 de presión fiscal está toda a `null`**.
- **No se pudieron leer las tablas PDF del Informe Anual de Recaudación Tributaria de la AEAT**, de modo que **el desglose por figura (IRPF, IVA, IS, IIEE, nuevas figuras) en millones de euros está a `null`** para todos los años.

Solo se han registrado las cifras que aparecieron **literalmente en fragmentos de búsqueda de dominios oficiales**. Cumpliendo la regla del encargo, **no se ha inventado ninguna cifra**; lo no verificable está como `null` y anotado.

**Para completar el encargo se necesita habilitar `WebFetch` (o `curl`/`Invoke-RestMethod`)** y volver a ejecutar las descargas indicadas en las secciones siguientes.

---

## 1. Presión fiscal (% PIB) — Eurostat `gov_10a_taxag`

**Indicador objetivo:** Total de impuestos + cotizaciones sociales netas (incl. imputadas) en % del PIB — el "tax-to-GDP ratio" estándar de Eurostat.

**Consulta API pendiente de ejecutar (cuando haya WebFetch):**
```
https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/gov_10a_taxag?format=JSON&geo=ES&unit=PC_GDP&na_item=D2_D5_D91_D61_M_D995&sector=S13_S212
```
(El código `na_item` exacto del agregado total debe confirmarse contra el diccionario de dimensiones del dataset; Eurostat usa para la nota de prensa "tax-to-GDP ratio" el agregado total de impuestos + cotizaciones sociales netas. Verificar `na_item` y `sector` en el databrowser antes de fijar la serie.)

**Databrowser (alternativa manual):**
https://ec.europa.eu/eurostat/databrowser/view/gov_10a_taxag/default/table?lang=en

**Lo único que se pudo verificar de Eurostat para España (no es el total):**
- Componente "taxes on production and imports" de España en 2024 = **11,3 % del PIB**. Es solo un componente (impuestos sobre producción e importaciones), **NO** el ratio total; por eso NO se ha usado en la serie.
- Agregados UE/zona euro (contexto, no España): UE = 40,4 % (2024) vs 39,9 % (2023); zona euro = 40,9 % (2024) vs 40,5 % (2023). Fuente: Eurostat news `ddn-20251031-2`.

**Estado de la serie 2000–2024:** TODOS los años a `null`. Pendiente de descarga API.

**URLs Eurostat consultadas (2026-06-05):**
- https://ec.europa.eu/eurostat/databrowser/view/gov_10a_taxag/default/table?lang=en
- https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20251031-2 (nota 2024)
- https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20241031-1 (nota 2023)
- https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Tax_revenue_statistics

---

## 2. Contraste OCDE (Global/Revenue Statistics) — metodología distinta, NO mezclar

La OCDE define el ratio de forma diferente a Eurostat; las cifras NO son intercambiables.

**Cifras obtenidas de fragmentos (todas marcadas `noVerificado` en el JSON):**
- 2000: 33,0 % (fragmento: "increased from 33.0% in 2000").
- 2022: 37,6 %.
- 2023: 37,3 % (Revenue Statistics 2024) — **PERO** un fragmento de la edición 2025 da 36,4 % para 2023.
- 2024: 36,7 % (Revenue Statistics 2025; subió desde 36,4 % en 2023).
- **2018: no apareció en ningún fragmento → `null`.** (El encargo pedía específicamente 2018; queda pendiente de la nota-país OCDE.)

**Conflicto a resolver:** edición 2024 (2022=37,6 / 2023=37,3) vs edición 2025 (2023=36,4 / 2024=36,7). Probable revisión metodológica/de datos entre ediciones. Verificar descargando los PDF.

**URLs OCDE (2026-06-05):**
- Nota-país (Revenue Statistics 2024): https://www.oecd.org/content/dam/oecd/en/topics/policy-sub-issues/global-tax-revenues/revenue-statistics-spain.pdf
- Nota-país (Revenue Statistics 2025): https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/12/revenue-statistics-2025-country-notes_3708be73/spain_dae66bcb/c21a0655-en.pdf
- Página país 2025: https://www.oecd.org/en/publications/revenue-statistics-2025_b1943459-en/spain_c21a0655-en.html

---

## 3. Recaudación tributaria por figura — AEAT

**Informe usado:** Informe Anual de Recaudación Tributaria, ediciones 2024 y 2023.

**Cifras VERIFICADAS (fragmentos oficiales AEAT):**
- **Total ingresos tributarios 2024 = 294.734 M€ (+8,4 %).**
- **Total ingresos tributarios 2023 = 271.935 M€ (+6,4 %).**

**Variaciones interanuales verificadas (en %, NO en M€):**
- 2024: IRPF +7,6 %; IVA +7,9 %; IS +11,5 %; IIEE +6,6 %.
- 2023: IRPF +9,9 %; IVA +1,6 %; IS +9 %; IIEE +2,6 %.

**NO verificado (todo `null`):** el desglose en millones de euros por figura (IRPF, IVA, IS, IIEE, otros) para CUALQUIER año 2015–2024, y los importes de las nuevas figuras. Esos datos están en las **tablas PDF** del informe, que no se pudieron descargar. Los totales de 2015–2022 tampoco se verificaron.

**Nuevas figuras (confirmación cualitativa, importes en `null`):**
- Plástico no reutilizable: nuevo en 2023; 2024 con 12 meses completos (confirmado en fragmento).
- Gravamen energéticas, gravamen banca, ITSGF (grandes fortunas), ITF (Tobin), IDSD (servicios digitales): existen, importes pendientes de las tablas.

**URLs AEAT (2026-06-05):**
- Informe 2024 (PDF): https://sede.agenciatributaria.gob.es/static_files/AEAT/Estudios/Estadisticas/Informes_Estadisticos/Informes_Anuales_de_Recaudacion_Tributaria/Ejercicio_2024/IART24_es_es.pdf
- Informe 2023 (PDF): https://sede.agenciatributaria.gob.es/static_files/AEAT/Estudios/Estadisticas/Informes_Estadisticos/Informes_Anuales_de_Recaudacion_Tributaria/Ejercicio_2023/IART23_es_es.pdf
- Catálogo histórico de informes: https://sede.agenciatributaria.gob.es/Sede/datosabiertos/catalogo/hacienda/Informes_anuales_de_Recaudacion_Tributaria.shtml
- Nota ingresos 2024: https://sede.agenciatributaria.gob.es/Sede/normativa-criterios-interpretativos/analisis/2025/abril/29/ingresos-tributarios-ano-2024.html

---

## 4. Impacto de cambios normativos / no deflactación del IRPF

**Verificado (fragmentos AEAT):**
- 2024: cambios normativos restaron en **IRPF ≈ 3.200 M€** (sin ese impacto el IRPF habría crecido 10,2 % en vez de 7,6 %).
- 2024: en **IS** los cambios normativos y de gestión restaron **≈ 2.200 M€**.
- 2023: medidas normativas y de gestión en **IVA** redujeron la recaudación en **> 3.000 M€**.

**Advertencia metodológica importante:** la AEAT publica el impacto de cambios normativos como la **diferencia entre el crecimiento observado y el crecimiento "a normativa constante"** (apartado/Nota informativa de cambios normativos del informe). **NO publica una línea explícita y separada titulada "impacto de la no deflactación del IRPF".** La cifra de 3.200 M€ de 2024 en IRPF es el impacto **agregado** de los cambios normativos del ejercicio, que pueden incluir varias medidas; la fracción atribuible específicamente a la (no) deflactación de la tarifa estatal **no se ha podido aislar ni verificar** con los fragmentos disponibles. Requiere leer la Nota de cambios normativos del informe PDF.

---

## 5. Etiquetado de gobiernos (verificado por fechas)

- **Aznar (PP):** hasta abril 2004. Años 2000–2003 completos; 2004 es año de transición (Aznar→Zapatero, abr 2004).
- **Zapatero (PSOE):** abr 2004 – dic 2011. 2011 transición (Zapatero→Rajoy, dic 2011).
- **Rajoy (PP):** dic 2011 – jun 2018. 2018 transición (Rajoy→Sánchez, moción de censura jun 2018).
- **Sánchez (PSOE):** desde jun 2018.

Los años de transición (2004, 2011, 2018) se han etiquetado con ambos gobiernos en el JSON.

---

## 6. Resumen de qué falta (checklist para reejecución con WebFetch habilitado)

- [ ] Eurostat: descargar API `gov_10a_taxag` ES, confirmar `na_item`/`sector` del total, rellenar 2000–2024.
- [ ] OCDE: descargar nota-país, fijar 2018 y resolver conflicto 2023 (37,3 vs 36,4).
- [ ] AEAT: extraer de las tablas PDF el desglose en M€ por figura 2015–2024.
- [ ] AEAT: extraer importes en M€ de las nuevas figuras (energéticas, banca, ITSGF, plástico, ITF, IDSD).
- [ ] AEAT: leer la Nota de cambios normativos para aislar el efecto de la no deflactación del IRPF.
