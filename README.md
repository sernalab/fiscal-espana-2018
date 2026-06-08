# Los impuestos del Gobierno central desde 2018

Web interactiva que da visibilidad, con **datos oficiales y objetivos**, a lo que ha hecho el **Gobierno central** de España con los impuestos desde junio de 2018: qué subió, qué bajó y qué se creó. Las figuras impuestas por la **Unión Europea** aparecen señaladas.

Datos descargados directamente de fuentes oficiales: **Eurostat** (API), **AEAT** (cuadros del Informe Anual de Recaudación), **BOE** y **EUR-Lex** (normas exactas), AIReF, Banco de España, Funcas y FEDEA.

## Enfoque

- **Foco en el Gobierno central**: se incluyen los tributos que decide el Estado. Quedan fuera, por no depender de él, los tributos autonómicos (Sucesiones, Patrimonio, ITP) y los locales de cuantía municipal (circulación/IVTM, IBI, plusvalía).
- **Origen europeo, etiquetado**: lo que viene impuesto por una directiva de la UE (impuesto complementario / Pilar 2, y las figuras de residuos, incluida la tasa de basuras) se marca como tal.
- **Datos objetivos, sin recuentos de parte**: presión fiscal (Eurostat), recaudación e impacto normativo (cuadros 1.5 y 1.6 de la AEAT). Cada cambio enlaza a su norma.
- **Contexto honesto**: la recaudación récord no equivale a «subida de impuestos» — parte es ciclo, parte inflación (incl. la no deflactación del IRPF), parte cambios de ley.

Detalle completo de fuentes en [`fuentes.md`](fuentes.md).

## Estructura

```
app/          Web interactiva (React + Vite + recharts)
research/     Datos verificados (JSON) + Excel oficial AEAT
extract-aeat.js   Extractor del Excel AEAT (Node + xlsx)
fuentes.md    Trazabilidad completa de fuentes
```

## Desarrollo

```bash
cd app
npm install
npm run dev      # desarrollo
npm run build    # producción → dist/
```

## Qué muestran los datos

La presión fiscal está en máximos históricos (38,1% del PIB en 2021; 37,3% en 2024, Eurostat) y la recaudación creció un 56% nominal entre 2018 y 2025 (AEAT). El Gobierno central creó al menos 8 figuras nuevas (plásticos, residuos, transacciones financieras, servicios digitales, grandes fortunas, banca, vapeo e impuesto complementario), subió el IRPF de las rentas altas y el tabaco, y dejó sin deflactar la tarifa del IRPF (subida real para las rentas medias). A la vez hubo rebajas temporales anticrisis (IVA de energía y alimentos) y, según la propia AEAT, los cambios de ley restaron recaudación en 5 de los 8 años. Tres de las figuras —el impuesto complementario y las de residuos, incluida la tasa de basuras— tienen origen en directivas de la UE.
