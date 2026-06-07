# Conteos de subidas de impuestos y caveats metodológicos — Notas y fiabilidad

**Fecha investigación:** 2026-06-05
**Periodo cubierto:** junio 2018 (moción de censura, Sánchez presidente) — junio 2026
**Limitación de entorno:** Solo estuvo disponible `WebSearch` (titulares + fragmentos). `WebFetch`, `curl` (Bash) e `Invoke-RestMethod` (PowerShell) fueron DENEGADOS por permisos. Por tanto NO se descargaron los PDF originales del IJM, AIReF, BdE ni la API de Eurostat. Las cifras recogidas son las que aparecieron literalmente en fragmentos de búsqueda procedentes de dominios fiables. Las no verificables al detalle se marcan con `~` o se acotan. No se ha inventado ninguna cifra.

---

## TAREA 1 — Los conteos "X subidas"

### Fuente raíz de casi todos los conteos: Instituto Juan de Mariana (IJM)
- **Orientación:** think tank liberal/libertario (autodefinido liberal; premió a Javier Milei). Etiqueta descriptiva, no descalificación.
- **Productos:** serie anual "Impuestómetro" + informes puntuales (PDF "IJM-93-SUBIDAS-RECAUDATORIAS", nov-dic 2024).
- **Evolución de la cifra:** 81 (nov-2024) → 93 (dic-2024, +12 medidas 2025) → 94 (Impuestómetro 2025, abr-2025) → 100 (1-1-2026, hito simbólico) → 141 (Impuestómetro 2026, abr-2026, al sumar no deflactación + revisiones catastrales).
- **Criterio de recuento (clave para la neutralidad):**
  - Cuenta cada medida normativa con efecto recaudatorio publicada en BOE/PGE/RD/anteproyectos.
  - **Mezcla impuestos Y cotizaciones sociales** en el mismo número (punto más criticado).
  - Cuenta **reversiones de rebajas temporales** como subidas nuevas (IVA luz, IVA alimentos).
  - El MEI y otras cotizaciones crecientes **pueden contar año a año** como subidas distintas.
  - Incluye medidas **anunciadas/proyectadas** que pueden no entrar en vigor.
  - El conteo de 141 amplía el criterio a "ocultas" (no deflactar IRPF) y a cada revisión catastral.
- **Auto-matización del propio IJM:** descontando rebajas de efecto temporal, el aumento de recaudación atribuible a normativa baja de ~127.744 M a ~42.000 M. La propia fuente reconoce que el grueso del aumento bruto no es normativo puro.

### Quién amplifica los conteos
- **PP (oposición, centro-derecha):** Feijóo "81 veces", Gamarra "81", objetivo de "revisar el centenar de subidas". Toma la cifra del IJM.
- **Vox (oposición, derecha):** repite ">80 veces".
- **El Español (97):** conteo periodístico PROPIO, no solo IJM; orientación conservadora. Montero (Gobierno) lo llamó "falso" en el Congreso.
- **Daniel Lacalle / Libre Mercado / esRadio (Libertad Digital, orientación liberal):** difusión.

### Fact-checks
- **Newtral** (fact-checker; percibido por la derecha como progresista; IFCN). Artículo 2025-02-06 "De dónde sale la cifra de que el Gobierno ha subido los impuestos más de 80 veces":
  - **No desmiente** que exista el listado; lo rastrea hasta el IJM y reconoce que el anexo detalla las 81 medidas (ejemplos: IVA bebidas azucaradas 10%→21% en 2021, hidrocarburos 2021, +2 puntos IRPF del ahorro >300.000 € en 2023).
  - **Críticas al criterio:** (1) incluir cotizaciones es discutible (un portavoz del Consejo de Economistas dice que "funcionan como" impuestos pero no lo son estrictamente); (2) el informe asume que toda subida genera más recaudación, lo que no siempre es cierto; (3) la cifra está desactualizada.
  - Tono: neutro-crítico con la metodología, no con la existencia del recuento. **Fiabilidad alta** como contraste metodológico.
- **Newtral (2022-10-10):** España no fue el país OCDE que más subió impuestos en 2020; Feijóo confundía presión fiscal (afectada por caída de PIB) con subidas legislativas. Precedente directo del caveat ciclo vs legislación.
- **Newtral (2025-01-24):** los decretos rechazados en enero 2025 no incluían subida del IVA de luz/alimentos. Útil para separar reversión automática de rebaja temporal vs nueva subida.
- **Maldita.es (explicador 2023-11-03):** define presión fiscal; advierte de que depende sobre todo de la actividad económica. **No se localizó** una verificación específica de Maldita del número exacto de subidas (podría existir y no haber salido en los fragmentos).
- **EFE Verifica:** no se localizó pieza específica sobre el conteo en las búsquedas disponibles.

### ¿Existe conteo simétrico de BAJADAS? — NO (a nivel estatal con misma metodología)
- El Gobierno comunica rebajas concretas (IVA luz, IVA carburantes, IVA alimentos básicos, deducción vehículo eléctrico, IRPF rentas bajas, tipo reducido Sociedades pymes) **sin un número-titular agregado**.
- Muchas fueron **temporales y se revirtieron** (1-1-2025), y esa reversión es justo lo que los conteos de subidas computan.
- Contrapunto retórico: IJM/Libre Mercado citan "90 rebajas de impuestos en la Comunidad de Madrid 2019-2025" (autonómico, no estatal).

---

## TAREA 2 — Caveats metodológicos (respaldo oficial/independiente)

### 1. Ciclo vs legislación — fiabilidad ALTA (AIReF es organismo independiente)
- AIReF Divulga descompone el aumento de ingresos desde la pandemia: **motor principal = mejora económica** (empleo, salarios, beneficios); **inflación ~43%** del aumento tras la pandemia; **normativa minoritaria** (~12-17% según año).
- Ingresos tributarios: **17% del PIB (2019) → 18,5% del PIB (2024)**. En 2022 la recaudación subió 14,4% (~38% actividad, ~44% inflación).
- Documentos técnicos AIReF 2024 y 2025 (PDF) y Boletín BdE 2023/T1 art.16 dan el sustento.
- **Caveat del caveat:** en 2020 la presión fiscal subió por caída del PIB (denominador), no por subir impuestos.

### 2. No deflactación del IRPF (rémora fiscal / bracket creep) — fiabilidad ALTA
- **Banco de España:** ~11.000 M de recaudación extra de IRPF 2019-2024 por no ajustar al IPC. IRPF 86.000→124.000 M (+38.000); con deflactación habría sido +27.000. Solo ~40% es bracket creep puro; ~60% es pérdida de valor de mínimos/deducciones con importes fijos. Documento Ocasional 2422 da el detalle por niveles de renta.
- **Funcas:** ~16.700 M (2019-2023): ~9.700 M por no ajustar deducciones/mínimos + ~7.000 M por tramos congelados. Frase clave: "reforma fiscal implícita que no requiere aprobación parlamentaria".
- **FEDEA:** ~736 €/año para familia de clase media (rango 311-622 € según renta).
- **Nota:** las cifras agregadas (11.000 BdE / 16.700 Funcas) difieren por periodo y por qué incluyen (BdE separa tarifa de beneficios fiscales; Funcas suma ambos). No son contradictorias: miden cosas ligeramente distintas.

### 3. Presión fiscal vs esfuerzo fiscal — fiabilidad MEDIA (cifras Eurostat no verificadas año a año en este entorno)
- **Presión fiscal** = recaudación/PIB. España ~37,7% (2022) vs UE ~40,2% → España **por DEBAJO** de la media UE.
- **Esfuerzo fiscal** = presión ponderada por renta per cápita. España **por ENCIMA** de la media UE (IEE: ~+17,8%) porque la renta per cápita es menor (~23.640 € vs ~51.600 € daneses).
- España converge: brecha de presión 2010 = 6,9 p.p.; ~2024 = 3,1 p.p.
- **Advertencia:** los valores 2018 (~35,1%) y de media UE son aproximados; no se pudo descargar la serie oficial de Eurostat (`gov_10a_taxag`). Verificar contra `series.json` (otro agente) cuando complete la serie.

### 4. Temporal vs permanente — fiabilidad ALTA (normas en BOE)
- **Prorrogadas/permanentes:** gravamen banca (→ permanente 2024), grandes fortunas (→ prórroga indefinida), MEI (cotización creciente 0,6→1,2%). Gravamen energético = contraejemplo (NO prorrogado 2025).
- **Revertidas:** IVA electricidad (→21% el 1-1-2025), IEE, IVPEE, IVA carburantes, IVA alimentos básicos (→4%/10% el 1-1-2025).
- Las normas exactas (números de ley/RD) las aporta otro agente; aquí solo el listado conceptual.

---

## Tabla resumen de fiabilidad

| Bloque | Fuente principal | Independencia | Fiabilidad cifras |
|---|---|---|---|
| Conteos subidas | IJM (think tank liberal) | Parte interesada (orientación liberal) | Listado real; criterio discutible/ensanchable |
| Fact-check conteo | Newtral | Fact-checker (percibido progresista) | Alta como contraste metodológico |
| Ciclo vs legislación | AIReF | Independiente (organismo) | Alta |
| No deflactación | BdE / Funcas / FEDEA | BdE oficial-independiente; Funcas/FEDEA semi-independientes | Alta |
| Presión vs esfuerzo | Eurostat vía FEDEA/IEF/IEE | Eurostat oficial; IEE orientación empresarial | Media (no verificada año a año) |
| Temporal vs permanente | BOE / Moncloa | Oficial | Alta |

## Pendiente / a mejorar si se levanta el bloqueo de red
- Descargar el PDF original del IJM (81/93 subidas) para citar el anexo literal y el criterio exacto.
- Verificar la serie Eurostat de presión fiscal año a año (cuadrar con `series.json`).
- Buscar verificación directa de Maldita / EFE Verifica del número de subidas (no localizada).
- Descargar AIReF DT-Variabilidad para extraer la descomposición exacta por años (% de contribución).
