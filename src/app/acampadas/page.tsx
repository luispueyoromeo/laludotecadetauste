import type { Metadata } from "next";
import { ActivityCta, EmptyState, PageHero } from "@/components/ui";
import { acampadas, type Acampada } from "@/content/actividades";

export const metadata: Metadata = {
  title: "Acampadas",
  description: "Información y próximas acampadas de La Ludoteca de Tauste.",
};

function CampList({ items }: { items: Acampada[] }) {
  return (
    <div className="camp-list">
      {items.map((acampada) => (
        <article key={acampada.id}>
          <span className={`status ${acampada.estado === "proxima" ? "abierta" : "pending"}`}>
            <i />
            {acampada.estado === "proxima" ? "Próxima" : "Realizada"}
          </span>
          <h3>{acampada.nombre}</h3>
          <p>{acampada.descripcion}</p>
          {acampada.fechas && <p><strong>Fechas:</strong> {acampada.fechas}</p>}
          {acampada.programa && <><h4>Programa</h4><ul>{acampada.programa.map((item) => <li key={item}>{item}</li>)}</ul></>}
          {acampada.informacionPractica && <><h4>Información práctica</h4><ul>{acampada.informacionPractica.map((item) => <li key={item}>{item}</li>)}</ul></>}
          {acampada.fotos && <div className="photo-grid">{acampada.fotos.map((foto) => <img key={foto.src} src={foto.src} alt={foto.alt} />)}</div>}
        </article>
      ))}
    </div>
  );
}

export default function Acampadas() {
  const proximas = acampadas.filter((acampada) => acampada.estado === "proxima");
  const realizadas = acampadas.filter((acampada) => acampada.estado === "realizada");

  return <>
    <PageHero eyebrow="Experiencias para compartir" title="Acampadas" icon="tent">
      <p>Distintas propuestas a lo largo del año para vivir nuevas experiencias, convivir y disfrutar en grupo.</p>
    </PageHero>
    <div className="container section">
      <div className="intro-row">
        <div><p className="eyebrow">Nuevas aventuras</p><h2>Próximas acampadas</h2></div>
        <p>Cada propuesta reunirá aquí sus fechas, programa e información práctica.</p>
      </div>
      {proximas.length > 0
        ? <CampList items={proximas} />
        : <EmptyState title="No hay próximas acampadas anunciadas" icon="tent">Cuando preparemos una nueva propuesta, publicaremos aquí sus fechas y toda la información necesaria.</EmptyState>}

      {realizadas.length > 0 && <section className="section">
        <div className="intro-row">
          <div><p className="eyebrow">Experiencias compartidas</p><h2>Acampadas realizadas</h2></div>
          <p>Consulta las propuestas que ya hemos celebrado y sus recuerdos.</p>
        </div>
        <CampList items={realizadas} />
      </section>}

      <div className="gallery-placeholder">
        <div className="gallery-shapes" aria-hidden="true"><i /><i /><i /></div>
        <div><p className="eyebrow">Recuerdos de cada experiencia</p><h2>Un lugar preparado para las imágenes</h2><p>Las galerías se incorporarán cuando haya fotografías propias facilitadas para este uso. Cada imagen tendrá una descripción alternativa y se mostrará dentro de su acampada.</p></div>
      </div>
      <ActivityCta />
    </div>
  </>;
}
