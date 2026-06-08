import { Hero, Timeline, Caveats, Footer } from './components/Sections';
import { PressureChart, RevenueChart, ImpactChart } from './components/Charts';
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
            <a href="#macro">La foto macro</a>
            <a href="#impuestos">Impuesto a impuesto</a>
            <a href="#cronologia">Cronología</a>
            <a href="#matices">Cómo leerlo</a>
          </div>
        </div>
      </nav>

      <Hero />

      <Section
        id="macro"
        kicker="01 · La foto macro"
        title="Presión fiscal y recaudación, en máximos"
        intro="Total de impuestos y cotizaciones en % del PIB (Eurostat, descarga directa de la API oficial). La franja amarilla marca el periodo desde junio de 2018."
      >
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
      </Section>

      <Section
        id="impuestos"
        kicker="02 · Impuesto a impuesto"
        title="Qué cambió en cada tributo del Gobierno central"
        intro="Filtra por lo que pasó (subió, bajó, nuevo…) o por origen. Las figuras impuestas por la UE están etiquetadas «Origen UE». Cada cambio enlaza a su norma en el BOE o en EUR-Lex."
      >
        <TaxExplorer />
      </Section>

      <Section
        id="cronologia"
        kicker="03 · Cronología"
        title="Todos los cambios, año a año"
        intro="Lista neutral de las modificaciones tributarias del Gobierno central desde junio de 2018, en orden cronológico. Cada línea indica la dirección del cambio, la norma y si es de origen europeo."
      >
        <Timeline />
      </Section>

      <Section
        id="matices"
        kicker="04 · Cómo leer los datos"
        title="Contexto para interpretar las cifras"
        intro="La recaudación récord no equivale a «subida de impuestos»: parte es ciclo, parte inflación, parte cambios de ley. Con cifras de AIReF, Banco de España, Funcas y FEDEA."
      >
        <Caveats />
      </Section>

      <Footer />
    </>
  );
}
