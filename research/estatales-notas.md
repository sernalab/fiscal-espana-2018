# Notas de investigación — Tributos estatales de España (jun 2018 → 2026-06-05)

**Fecha de investigación:** 2026-06-05
Fuente principal: BOE (boe.es). Apoyo: AEAT (sede.agenciatributaria.gob.es), Ministerio de Hacienda, Moncloa. Prensa solo como pista para localizar la norma.

---

## 0. Limitación técnica del entorno (importante)

En este entorno **WebFetch fue DENEGADO** (no se pudo abrir el texto completo de cada documento del BOE), y también lo fueron **Bash y PowerShell** (no se pudo validar el JSON con un parser ni descargar PDFs). La verificación de cada norma se hizo mediante **WebSearch**, que devuelve los títulos e identificadores BOE **literales** de los resultados de boe.es (dominio oficial). Por tanto:

- Los **identificadores BOE-A-XXXX-XXXXX** reproducidos provienen literalmente de resultados de boe.es y se consideran fiables a nivel de "norma correcta + ID correcto".
- Lo que NO se ha podido hacer es leer el articulado completo de cada norma para verificar cada cifra al céntimo. Las cifras (tipos, umbrales) provienen de los resúmenes de la AEAT y de despachos fiscales que citan la norma; son coherentes entre fuentes, pero algunas escalas plurianuales (banca permanente, cuota de solidaridad, micropymes) deberían confirmarse en el texto consolidado antes de publicar.

---

## 1. IDs de BOE verificados (confirmados por búsqueda directa en boe.es)

| Norma | ID BOE | Estado |
|---|---|---|
| Ley 11/2020 PGE 2021 | BOE-A-2020-17339 | Verificado |
| Ley 22/2021 PGE 2022 | BOE-A-2021-21653 | Verificado |
| Ley 31/2022 PGE 2023 | BOE-A-2022-22128 | Verificado |
| Ley 38/2022 (gravámenes + ITSGF) | BOE-A-2022-22684 | Verificado |
| Ley 7/2022 (residuos: plástico + vertederos) | BOE-A-2022-5809 | Verificado |
| Ley 4/2020 (IDSD) | BOE-A-2020-12355 | Verificado |
| Ley 5/2020 (ITF) | BOE-A-2020-12356 | Verificado |
| Ley 7/2024 (complementario + banca permanente + vapeo + micropymes + tabaco) | BOE-A-2024-26694 | Verificado |
| RDL 12/2021 (IVA luz 10%) | BOE-A-2021-10584 | Verificado |
| RDL 17/2021 (IEE electricidad 0,5%) | BOE-A-2021-14974 | Verificado (corregido: NO es 15044) |
| RDL 17/2022 (IVA gas/leña/pellets 5%) | BOE-A-2022-15354 | Verificado (corregido: NO es 15497) |
| RDL 20/2022 (IVA alimentos 0%) | BOE-A-2022-22685 | Verificado |
| RDL 13/2022 (autónomos ingresos reales) | BOE-A-2022-12482 | Verificado |
| RDL 2/2023 (pensiones: MEI, solidaridad, bases máximas) | BOE-A-2023-6967 | Verificado |
| RDL 8/2023 (prórroga ITSGF indefinida + reversiones IVA/IEE 2024) | BOE-A-2023-26452 | Verificado |
| RDL 4/2024 (calendario reversión IVA alimentos 2024-2025) | BOE-A-2024-12944 | Verificado |
| RDL 10/2024 (gravamen energético 2025, luego derogado) | BOE-A-2024-26916 | Verificado |
| Resolución Congreso 22-ene-2025 (deroga RDL 10/2024) | BOE-A-2025-1137 | Verificado |
| STC 16/2024 sobre RDL 3/2016 | BOE-A-2024-3938 | Parcial (ver §3) |
| Orden HAC/86/2025 (modelo 573 vapeo) | BOE-A-2025-1732 | Verificado |
| Orden HFP/1314/2022 (modelo 592 plástico) | BOE-A-2022-23749 | Verificado |

---

## 2. Hallazgos destacados (incluye AUSENCIAS de norma)

1. **Equiparación fiscal diésel-gasolina: NO se aprobó.** Es un hallazgo de ausencia. El Gobierno intentó subir el Impuesto sobre Hidrocarburos del gasóleo para acercarlo a la gasolina dentro del paquete fiscal de finales de 2024 (vía enmiendas en la tramitación de lo que sería la Ley 7/2024). El **Pleno del Congreso lo rechazó en diciembre de 2024** (votos en contra de PP, Vox y Podemos). A junio de 2026 sigue sin aprobarse, aunque es un compromiso pendiente con la UE (se baraja 2026). **No existe norma BOE que la haya implementado** → `urlBOE: null`.

2. **No deflactación de la tarifa estatal del IRPF: es una AUSENCIA de norma, no una norma.** El Estado no ha actualizado la escala estatal ni los mínimos por inflación durante 2021-2024 (IPC acumulado ~12-15%), lo que eleva la carga real ("rémora fiscal"). La última actualización relevante de la escala estatal es de 2015-2016. En contraste, **varias CCAA SÍ deflactaron su tramo autonómico** en 2022-2023 (Madrid, Andalucía, Galicia, Comunitat Valenciana, Castilla y León, Región de Murcia, entre otras; el País Vasco, régimen foral, también ajustó su escala). Como es ausencia de norma → `urlBOE: null`.

3. **Gravamen energético vs. gravamen de banca: destinos opuestos.**
   - **Banca:** el gravamen temporal (Ley 38/2022, 2023-2024) se **convirtió en impuesto PERMANENTE** ("Impuesto sobre el margen de intereses y comisiones") con escala progresiva mediante la **Ley 7/2024**, efectos desde 2025.
   - **Energéticas:** el Gobierno intentó prorrogarlo a 2025 vía **RDL 10/2024**, pero el **Congreso NO lo convalidó** y lo **derogó** (Resolución de 22-ene-2025, BOE-A-2025-1137). El gravamen energético **DECAYÓ**: no se aplica en 2025 ni se hizo permanente.

---

## 3. Dudas / puntos a confirmar antes de publicar

- **Escala del nuevo impuesto permanente de banca (2025):** los tramos (1% / 3,5% / 4,8% / 6% / 7%) provienen de resúmenes de despachos; conviene confirmar los umbrales exactos y los tipos en el texto consolidado de la Ley 7/2024 (art. 2). No se pudo abrir el articulado (WebFetch denegado).

- **IRPF — deducción/reducción por SMI 2025:** la "norma exacta" que articula que los perceptores del SMI no tributen en 2025 se enmarca entre la Ley 7/2024 y la normativa de retenciones de la AEAT para 2025 (y posibles RDL de actualización del SMI). El mecanismo es una deducción de hasta 340 € en cuota, no una exención. La atribución normativa exacta (artículo concreto) queda como "requiere matización" en el JSON. La subida del SMI de cada año se aprueba por Real Decreto anual del SMI (vehículo distinto).

- **STC 11/2024 vs. STC 16/2024:** la sentencia que anula los límites del RDL 3/2016 (compensación de BIN y deducciones por doble imposición para grandes empresas) se cita en distintas fuentes como **STC 11/2024 (18-ene-2024)**. El ID **BOE-A-2024-3938** que apareció en búsqueda corresponde a la **STC 16/2024 (30-ene-2024)**, otra cuestión de inconstitucionalidad sobre el mismo RDL 3/2016. **Pendiente de confirmar** el ID BOE exacto de la STC 11/2024; por eso ese item figura como verificación "parcial" para la URL de la sentencia. El cambio normativo de fondo — reintroducción de los límites por la Ley 7/2024 — sí está verificado.

- **Cuota de solidaridad y destope de bases máximas (cotizaciones):** son escalas plurianuales (2025→2045/2050). Los porcentajes de arranque 2025 (~0,92%-1,17% según tramo de exceso, y 0,115 puntos/año de incremento adicional de la base máxima) provienen de resúmenes; las cifras exactas por tramo deberían contrastarse con el texto del RDL 2/2023 y sus desarrollos. Etiquetadas como COTIZACIÓN, no impuesto, según indicación expresa del usuario.

- **Tipos IVA generales (21/10/4):** confirmado que NO cambiaron de forma estructural en el periodo. Todo el movimiento del IVA fue: (a) rebajas temporales anticrisis y su reversión, y (b) dos bajadas permanentes al 4% (higiene femenina/anticonceptivos en 2023; aceite de oliva en 2025).

---

## 4. Verificaciones del encargo

No se detectó ninguna norma inventada en la petición. Todos los vehículos legislativos mencionados existen y se localizaron en el BOE. Matices sobre lo que el usuario pedía "verificar":

- La **subida del ahorro en IRPF posterior a 2021** ocurrió **dos veces**: 2023 (Ley 31/2022, tramos 27%/28%) y de nuevo 2025 (Ley 7/2024, nuevo tramo 30%). La de PGE 2023: **confirmada**.
- La **bajada de IRPF para rentas bajas vía reducción por rendimientos del trabajo** (PGE 2023): **confirmada** (reducción máxima de 5.565 € a 6.498 €; umbral de 16.825 € a 19.747,5 €).
- La **bajada de micropymes en Sociedades** está vinculada a la **Ley 7/2024** (la misma que hizo permanente el gravamen de banca), tal como sospechaba el usuario: **confirmada** (escala 21/22% en 2025 bajando hasta 17/20% en 2027-28).
- **Tributación mínima 15%** (Ley 22/2021, PGE 2022): confirmada. **Tipo reducido 23% pymes** (Ley 31/2022, PGE 2023): confirmada. **Limitación compensación pérdidas grupos** (Ley 38/2022, ejercicio 2023): confirmada.

---

## 5. No concluyente / no documentado

- **Impuesto sobre el Alcohol y Bebidas Derivadas:** no se detectaron subidas estatales de tipos relevantes en el periodo (a diferencia del tabaco). No se documenta cambio.
- **Régimen de franquicia de IVA para pequeñas empresas (Directiva UE 2020/285):** transposición prevista, pero NO se confirmó norma estatal española en vigor a 2026-06-05 en las búsquedas. Queda como no concluyente; no se incluyó como cambio efectivo.
- **STC 11/2024:** ID BOE exacto pendiente (ver §3).
- **Validación sintáctica del JSON:** no se pudo ejecutar un parser (Bash y PowerShell denegados). La estructura se controló manualmente vía la herramienta de edición; antes de consumir el JSON conviene pasarlo por un linter.

---

## 6. Cobertura de los 11 bloques del encargo

1. IRPF — completo ✔ (tramos altos 2021, ahorro 2021/2023/2025, reducción trabajo 2023/2025, no deflactación + CCAA).
2. IVA — completo ✔ (rebajas temporales luz/gas/alimentos y reversiones 2024-2025; bajadas permanentes higiene femenina y aceite de oliva).
3. Sociedades — completo ✔ (mínimo 15% 2022, 23% pymes 2023, Pilar 2 2024, límites BIN 2024, micropymes 2025, limitación pérdidas grupos 2023).
4. IIEE — hidrocarburos (equiparación NO aprobada ✔), electricidad (rebaja y reversión ✔), tabaco (subida 2025 ✔), alcohol (sin cambios estatales relevantes).
5. Impuesto plástico no reutilizable — completo ✔ (Ley 7/2022, 2023).
6. Impuesto residuos vertederos/incineración — completo ✔ (Ley 7/2022, 2023).
7. Gravámenes temporales banca/energéticas — completo ✔ (Ley 38/2022, prórrogas, banca→permanente, energéticas→decae).
8. ITSGF — completo ✔ (Ley 38/2022, prórroga indefinida RDL 8/2023).
9. ITF (Ley 5/2020) e IDSD (Ley 4/2020) — completo ✔.
10. Cotizaciones — completo ✔ (MEI, cuota solidaridad, bases máximas, autónomos ingresos reales), etiquetadas como COTIZACIÓN.
11. Menores — impuesto al vapeo 2025 (Ley 7/2024) ✔; IRPF mínimo exento SMI ✔ (con matiz de mecanismo); franquicia IVA → no concluyente.
