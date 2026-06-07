import { Hero, WhoDecides, Counts, Caveats, Footer } from './components/Sections';
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
          <span className="topnav-brand">Impuestos 2018–2026 · verificación</span>
          <div className="topnav-links">
            <a href="#macro">La foto macro</a>
            <a href="#impuestos">Impuesto a impuesto</a>
            <a href="#quien">Quién decide</a>
            <a href="#conteos">Las «97 subidas»</a>
            <a href="#matices">Matices</a>
          </div>
        </div>
      </nav>

      <Hero />

      <Section
        id="macro"
        kicker="01 · La foto macro"
        title="Presión fiscal: sí está en máximos, pero el porqué importa"
        intro="Total de impuestos y cotizaciones en % del PIB (Eurostat, descarga directa de la API oficial). La franja amarilla marca el periodo Sánchez."
      >
        <PressureChart />
        <h3 className="sub-h3">Recaudación por figura (AEAT, millones de euros)</h3>
        <RevenueChart />
        <h3 className="sub-h3">¿Cuánto de eso fue cambio de ley? El dato de la propia AEAT</h3>
        <p className="section-intro">
          La AEAT publica cada año el impacto recaudatorio de los cambios normativos (cuadro 1.5 del Informe
          Anual de Recaudación). Es el dato que separa «subida legislada» de «efecto del ciclo y la inflación» —
          y sorprende: en 5 de los 8 años del periodo, los cambios de ley <em>restaron</em> recaudación.
        </p>
        <ImpactChart />
      </Section>

      <Section
        id="impuestos"
        kicker="02 · Impuesto a impuesto"
        title="Las fichas: qué cambió, cuándo, quién lo decidió y dónde comprobarlo"
        intro="Filtra por nivel de administración y por veredicto. Cada cambio enlaza a su norma en el BOE (o se marca como no verificado)."
      >
        <TaxExplorer />
      </Section>

      <Section
        id="quien"
        kicker="03 · La clave del análisis"
        title="¿Quién decide qué? Las cadenas de competencia"
        intro="El error más común del debate: atribuir al Gobierno central subidas que decidió un ayuntamiento o una CCAA — o no ver la mano estatal/europea donde sí la hay."
      >
        <WhoDecides />
      </Section>

      <Section
        id="conteos"
        kicker="04 · El origen de la cifra"
        title="«81, 93, 97, 100, 141 subidas»: de dónde salen los conteos"
        intro="No son cifras neutras ni necesariamente falsas: son recuentos con un criterio concreto, elaborados por actores con orientación identificable. Aquí están trazados hasta su fuente original."
      >
        <Counts />
      </Section>

      <Section
        id="matices"
        kicker="05 · Para leer bien los datos"
        title="Matices metodológicos"
        intro="Lo que hay que tener en cuenta antes de sacar conclusiones — con cifras de AIReF, Banco de España, Funcas y FEDEA."
      >
        <Caveats />
      </Section>

      <Footer />
    </>
  );
}
