import type { FormularioGoogle } from "@/lib/inscripciones";

type Props = {
  actividad: string;
  formulario: FormularioGoogle;
};

export function FormularioInscripcion({ actividad, formulario }: Props) {
  return (
    <section className="registration-form" id={formulario.id} aria-labelledby={`${formulario.id}-titulo`} tabIndex={-1}>
      <div className="registration-form-intro">
        <h2 id={`${formulario.id}-titulo`}>Inscripción en {actividad}</h2>
        <p>Completa el formulario. La organización se pondrá en contacto contigo por correo electrónico.</p>
        <p className="registration-form-notice">
          El envío del formulario supone una solicitud de inscripción. La plaza no estará confirmada hasta recibir la correspondiente comunicación de la organización.
        </p>
        <p className="registration-form-fallback">
          Si el formulario no carga, puedes <a href={formulario.enlace} target="_blank" rel="noopener noreferrer">abrirlo en Google Forms (nueva pestaña)</a>.
        </p>
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
