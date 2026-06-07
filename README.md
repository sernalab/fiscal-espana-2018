# ¿Han subido todos los impuestos desde 2018?

Verificación rigurosa y políticamente independiente de la afirmación:

> «Desde que Pedro Sánchez es presidente (junio 2018) han subido prácticamente todos los impuestos en España, incluyendo la tasa de basuras y el impuesto de circulación.»

Web interactiva construida con datos descargados directamente de fuentes oficiales: **Eurostat** (API), **AEAT** (cuadros del Informe Anual de Recaudación), **BOE** (normas exactas), AIReF, Banco de España, Funcas y FEDEA.

## Metodología (resumen)

- **Separación por nivel de competencia**: Estado / CCAA / ayuntamientos / mandato UE. No se atribuye al Gobierno central lo que decide un ayuntamiento, ni al revés.
- **Conteos vs indicadores objetivos**: los recuentos tipo «97 subidas» se trazan hasta su fuente original (con su orientación identificada) y se contrastan con presión fiscal y recaudación real.
- **Corrección por ciclo e inflación**: cuadro 1.5 de la AEAT (impacto recaudatorio de cambios normativos) + no deflactación del IRPF señalada explícitamente.
- **Una fuente por serie**: Eurostat como serie primaria de presión fiscal; OCDE solo como contraste.
- **Norma exacta o «no verificable»**: cada cambio enlaza a su BOE o se marca como no verificado.

Detalle completo en [`fuentes.md`](fuentes.md).

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

## Veredicto global

La afirmación es **parcialmente cierta con atribuciones erróneas**: la presión fiscal está en máximos, pero gran parte del aumento es ciclo e inflación (no cambios de ley); los impuestos autonómicos bajaron en varias CCAA; el impuesto de circulación tiene tarifas estatales congeladas desde 2003; y la tasa de basuras la obliga una directiva europea transpuesta en la Ley 7/2022, aunque el importe lo fija cada ayuntamiento. Los detalles, en la web.
