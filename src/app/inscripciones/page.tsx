import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { inscripciones } from "@/content/actividades";
import { contacto } from "@/content/site";

export const metadata: Metadata = {
  title: "Inscripciones",
  description: "Consulta el estado de las inscripciones para las actividades de La Ludoteca de Tauste.",
};

const estadoTexto = {
  pendiente: "Información pendiente",
  cerrada: "Inscripciones cerradas",
  abierta: "Inscripciones abiertas",
};

export default function Inscripciones() {
  return <>
    <section className="registration-hero">
      <div className="container">
        <p className="eyebrow light">Participa</p>
        <h1>Inscripciones</h1>
        <p>Consulta por separado la información de cada actividad. Los enlaces se mostrarán únicamente cuando exista un canal de inscripción activo.</p>
      </div>
    </section>
    <div className="container section">
      <div className="registration-grid">
        {inscripciones.map((inscripcion) => {
          const disponible = inscripcion.estado === "abierta" && Boolean(inscripcion.enlace);
          const estadoVisible = inscripcion.estado === "abierta" && !disponible ? "pendiente" : inscripcion.estado;

          return <article className="registration-card" key={inscripcion.id}>
            <div>
              <span className={`status ${estadoVisible}`}><i />{estadoTexto[estadoVisible]}</span>
              <h2>{inscripcion.nombre}</h2>
              <p>{inscripcion.detalle}</p>
            </div>
            {disponible
              ? <a href={inscripcion.enlace} className="button primary">Ir a la inscripción <Icon name="arrow" size={19} /></a>
              : <div className="no-link">
                <span>No hay un canal de inscripción disponible. Puedes consultarnos por </span>
                <a href={contacto.telefonoHref}>teléfono</a>
                <span> o </span>
                <a href={contacto.emailHref}>correo electrónico</a>.
              </div>}
          </article>;
        })}
      </div>
      <section className="direct-contact">
        <div><p className="eyebrow">Mientras tanto</p><h2>Consulta la información disponible</h2><p>No recogemos datos personales desde esta web. Si necesitas información antes de que se publique una convocatoria, contacta con la ludoteca.</p></div>
        <div className="direct-links">
          <a href={contacto.telefonoHref}><Icon name="phone" /><span><small>Llámanos</small>{contacto.telefono}</span></a>
          <a href={contacto.emailHref}><Icon name="mail" /><span><small>Escríbenos</small>{contacto.email}</span></a>
        </div>
      </section>
    </div>
  </>;
}
