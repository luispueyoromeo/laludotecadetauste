import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { inscripciones } from "@/content/actividades";
import { contacto } from "@/content/site";
import { resolverInscripcion, textoEstadoInscripcion } from "@/lib/inscripciones";

export const metadata: Metadata = {
  title: "Inscripciones",
  description: "Consulta el estado de las inscripciones para las actividades de La Ludoteca de Tauste.",
};

export default function Inscripciones() {
  return <>
    <section className="registration-hero">
      <div className="container">
        <p className="eyebrow light">Participa</p>
        <h1>Inscripciones</h1>
        <p>Consulta el estado de las inscripciones y accede a la ficha o al formulario de cada actividad.</p>
      </div>
    </section>
    <div className="container section">
      <div className="registration-grid">
        {inscripciones.map((inscripcion) => {
          const { estado, formulario } = resolverInscripcion(inscripcion);
          const ancla = formulario?.id ?? inscripcion.anclaFicha;
          const href = ancla ? `${inscripcion.ruta}#${ancla}` : inscripcion.ruta;

          return <article className="registration-card" key={inscripcion.id}>
            <div>
              <span className={`status ${estado}`}><i aria-hidden="true" />{textoEstadoInscripcion[estado]}</span>
              <h2>{inscripcion.nombre}</h2>
              <p>{inscripcion.detalle}</p>
            </div>
            <Link
              href={href}
              className={`button ${formulario ? "primary" : "secondary"}`}
              aria-label={formulario ? `Solicitar plaza en ${inscripcion.nombre}` : `Ver ficha de ${inscripcion.nombre}`}
            >
              {formulario ? "Solicitar plaza" : "Ver ficha"} <Icon name="arrow" size={19} />
            </Link>
          </article>;
        })}
      </div>
      <section className="direct-contact">
        <div><p className="eyebrow">Contacto</p><h2>¿Tienes dudas sobre una actividad?</h2><p>Si necesitas información sobre una convocatoria, contacta con la ludoteca. Las solicitudes de plaza se registran en Google Forms.</p></div>
        <div className="direct-links">
          <a href={contacto.telefonoHref}><Icon name="phone" /><span><small>Llámanos</small>{contacto.telefono}</span></a>
          <a href={contacto.emailHref}><Icon name="mail" /><span><small>Escríbenos</small>{contacto.email}</span></a>
        </div>
      </section>
    </div>
  </>;
}
