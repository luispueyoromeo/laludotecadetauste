import type { AvisoPrivacidadInscripcion, FormularioGoogle } from "@/lib/inscripciones";

type Props = {
  actividad: string;
  formulario: FormularioGoogle;
  privacidad?: AvisoPrivacidadInscripcion;
};

export function FormularioInscripcion({ actividad, formulario, privacidad }: Props) {
  return (
    <section className="registration-form" id={formulario.id} aria-labelledby={`${formulario.id}-titulo`} tabIndex={-1}>
      <div className="registration-form-intro">
        <h2 id={`${formulario.id}-titulo`}>Inscripción en {actividad}</h2>
        <p>Completa el formulario. La organización se pondrá en contacto contigo por correo electrónico.</p>
        <p className="registration-form-notice">
          El envío del formulario supone una solicitud de inscripción. La plaza no estará confirmada hasta recibir la correspondiente comunicación de la organización.
        </p>
        {privacidad && (
          <div className="registration-privacy">
            <h3>Protección de datos</h3>
            <p><strong>{privacidad.responsable}</strong> gestiona los datos que envíes mediante Google Forms para tramitar tu solicitud de plaza y contactar contigo sobre la actividad.</p>
            {privacidad.nota && <p>{privacidad.nota}</p>}
            <p>Para ejercer tus derechos de protección de datos, escribe a <a href={`mailto:${privacidad.correoDerechos}`}>{privacidad.correoDerechos}</a>.</p>
          </div>
        )}
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
