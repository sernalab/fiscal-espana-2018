import { Hero, Cotidiano, Calculadora, CunaDesglose, GastoPublico, Balance, Timeline, Caveats, Footer } from './components/Sections';
import { PressureChart, RevenueChart, ImpactChart, ComparativaChart, CunaChart } from './components/Charts';
import TaxExplorer from './components/TaxExplorer';

function Section({ id, kicker, title, intro, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <nav className="topnav">
        <div className="container topnav-inner">
          <span className="topnav-brand">Impuestos del Gobierno central · 2018–2026</span>
          <div className="topnav-links">
            <a href="#dia">Día a día</a>
            <a href="#calculadora">Tu nómina</a>
            <a href="#contratar">Coste de contratar</a>
            <a href="#gasto">A dónde va</a>
            <a href="#macro">La foto macro</a>
            <a href="#impuestos">Impuesto a impuesto</a>
            <a href="#matices">Cómo leerlo</a>
          </div>
        </div>
      </nav>

      <Hero />

      <Section
        id="dia"
        kicker="01 · En tu día a día"
        title="¿Y esto a mí cómo me afecta?"
        intro="Lo que dicen los datos oficiales, traducido a situaciones cotidianas. Cada tarjeta indica si pagas más, menos o igual, con el matiz honesto: a veces «depende», a veces lo obliga la UE y a veces no llegó a aprobarse."
      >
        <Cotidiano />
      </Section>

      <Section
        id="calculadora"
        kicker="02 · Tu caso"
        title="¿Cuánto te afecta a ti? Pon tu sueldo"
        intro="La «subida silenciosa» más comentada es la rémora fiscal: tu sueldo sube con la inflación, pero los tramos del IRPF no se actualizan, así que pagas proporcionalmente más. Aquí lo ves con tu cifra (estimación orientativa, no tu declaración)."
      >
        <Calculadora />
      </Section>

      <Section
        id="contratar"
        kicker="03 · El coste de contratar"
        title="Lo que de verdad ahoga a una PYME: cotizar por cada nómina"
        intro="En España el peso fiscal del trabajo recae sobre todo en la empresa. La «cuña fiscal» —lo que se va en IRPF y cotizaciones sobre el coste laboral total— está por encima de la media UE, y el grueso lo paga quien contrata."
      >
        <CunaChart />
        <CunaDesglose />
      </Section>

      <Section
        id="gasto"
        kicker="04 · A dónde va tu dinero"
        title="¿Y en qué se gasta todo eso?"
        intro="El reparto del gasto público total (todas las administraciones, incluida la Seguridad Social), por función, según la clasificación oficial COFOG de la IGAE. Para que veas dónde acaba cada euro."
      >
        <GastoPublico />
      </Section>

      <Section
        id="macro"
        kicker="05 · La foto macro"
        title="Presión fiscal y recaudación, en máximos"
        intro="Total de impuestos y cotizaciones en % del PIB (Eurostat, descarga directa de la API oficial). La franja amarilla marca el periodo desde junio de 2018."
      >
        <details className="explainer">
          <summary>¿Qué es exactamente la «presión fiscal»?</summary>
          <p>
            Es <strong>todo lo que el Estado recauda</strong> (impuestos + cotizaciones sociales) <strong>dividido entre el PIB</strong>
            —todo lo que produce el país en un año—, en porcentaje. Si España genera 1,5 billones y recauda 0,55, la presión
            fiscal es ≈ 37 %.
          </p>
          <p>
            Ojo al truco: <strong>es un cociente</strong>. Sube si suben los impuestos, pero también se mueve según cómo crezca el
            PIB. Y mide la carga del <em>país en conjunto</em>, no la tuya: por eso existe el <strong>«esfuerzo fiscal»</strong>
            (ajustado a la renta per cápita), donde España sale peor, porque pagamos parecido a países más ricos siendo más pobres.
          </p>
        </details>
        <PressureChart />
        <h3 className="sub-h3">Recaudación por figura (AEAT, millones de euros)</h3>
        <RevenueChart />
        <h3 className="sub-h3">¿Cuánto de eso fue cambio de ley? El dato de la propia AEAT</h3>
        <p className="section-intro">
          La AEAT publica cada año el impacto recaudatorio de los cambios normativos (cuadro 1.5 del Informe
          Anual de Recaudación). Es el dato oficial que separa «subida legislada» de «efecto del ciclo y la
          inflación»: en 5 de los 8 años del periodo, los cambios de ley <em>restaron</em> recaudación.
        </p>
        <ImpactChart />
        <h3 className="sub-h3">¿Y comparado con Europa? El mismo dato, para vecinos</h3>
        <ComparativaChart />
      </Section>

      <Section
        id="balance"
        kicker="06 · El balance"
        title="Subidas y bajadas, contadas sin trampa"
        intro="Dos recuentos simétricos: todos los movimientos normativos por dirección, y las figuras tributarias creadas desde 2018. Los números, sin adjetivos."
      >
        <Balance />
      </Section>

      <Section
        id="impuestos"
        kicker="07 · Impuesto a impuesto"
        title="Qué cambió en cada tributo del Gobierno central"
        intro="Filtra por lo que pasó (subió, bajó, nuevo…) o por origen. Las figuras impuestas por la UE están etiquetadas «Origen UE». Cada cambio enlaza a su norma en el BOE o en EUR-Lex."
      >
        <TaxExplorer />
      </Section>

      <Section
        id="cronologia"
        kicker="08 · Cronología"
        title="Todos los cambios, año a año"
        intro="Lista neutral de las modificaciones tributarias del Gobierno central desde junio de 2018, en orden cronológico. Cada línea indica la dirección del cambio, la norma y si es de origen europeo."
      >
        <Timeline />
      </Section>

      <Section
        id="matices"
        kicker="09 · Cómo leer los datos"
        title="Contexto para interpretar las cifras"
        intro="La recaudación récord no equivale a «subida de impuestos»: parte es ciclo, parte inflación, parte cambios de ley. Con cifras de AIReF, Banco de España, Funcas y FEDEA."
      >
        <Caveats />
      </Section>

      <Footer />
    </>
  );
}
