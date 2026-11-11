import type { FormularioGoogle } from "@/lib/inscripciones";

export function FormularioInscripcion({ actividad, formulario }: { actividad: string; formulario: FormularioGoogle }) {
  return (
    <section className="registration-form" id={formulario.id} aria-labelledby={`${formulario.id}-titulo`} tabIndex={-1}>
      <div className="registration-form-intro">
        <h2 id={`${formulario.id}-titulo`}>Inscripción en {actividad}</h2>
        <p>Completa el formulario. La organización se pondrá en contacto contigo por correo electrónico.</p>
        <p className="registration-form-notice">
          El envío del formulario supone una solicitud de inscripción. La plaza no estará confirmada hasta recibir la correspondiente comunicación de la organización.
        </p>
        <a href={formulario.enlace} target="_blank" rel="noopener noreferrer">
          Abrir en Google Forms (nueva pestaña)
        </a>
      </div>
      <iframe
        src={formulario.insercion}
        title={`Formulario de solicitud de plaza para ${actividad}`}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </section>
  );
}
