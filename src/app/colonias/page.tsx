import type { Metadata } from "next";
import { FormularioInscripcion } from "@/components/formulario-inscripcion";
import { ActivityCta, PageHero } from "@/components/ui";
import { campanas } from "@/content/actividades";
import { resolverInscripcion, textoEstadoInscripcion } from "@/lib/inscripciones";

export const metadata: Metadata = {
  title: "Colonias",
  description: "Colonias de verano, Navidad y Semana Santa de La Ludoteca de Tauste.",
};

export default function Colonias() {
  const colonias = campanas.map((campana) => ({ campana, inscripcion: resolverInscripcion(campana) }));

  return (
    <>
      <PageHero eyebrow="Vacaciones para disfrutar" title="Colonias">
        <p>Actividades de mañana en días no lectivos, con una programación variada y divertida. Una propuesta de ocio para los niños y niñas y una opción de conciliación para las familias.</p>
      </PageHero>
      <div className="container section">
        <div className="intro-row">
          <div><p className="eyebrow">Tres momentos del año</p><h2>Vacaciones con tiempo para jugar</h2></div>
          <p>Las colonias se organizan durante las vacaciones escolares. Los detalles de cada campaña se publicarán aquí cuando estén disponibles.</p>
        </div>
        <div className="campaign-grid">
          {colonias.map(({ campana, inscripcion }, indice) => {
            const datos = ([
              ["Fechas", campana.fechas],
              [campana.recogida ? "Entrada" : "Horario", campana.horario],
              ["Recogida", campana.recogida],
              ["Edades", campana.edades],
              ["Lugar", campana.lugar, campana.notaLugar],
              ["Tarifas", campana.tarifas],
              ["Plazo de inscripción", campana.plazo, campana.notaPlazo],
            ] as const).filter(([, valor]) => Array.isArray(valor) ? valor.length > 0 : Boolean(valor));

            return (
              <article className="campaign-card" id={campana.id} key={campana.id} tabIndex={-1}>
                <span className="campaign-number" aria-hidden="true">{String(indice + 1).padStart(2, "0")}</span>
                <h3>{campana.nombre}</h3>
                <p>{campana.descripcion}</p>
                {datos.length > 0 && (
                  <dl className="details-list">
                    {datos.map(([etiqueta, valor, nota]) => (
                      <div key={etiqueta}>
                        <dt>{etiqueta}</dt>
                        <dd>
                          {Array.isArray(valor) ? (
                            <ol className="campaign-dates" role="list">
                              {valor.map((fecha, indiceTramo) => (
                                <li key={fecha}>
                                  <span>Tramo {indiceTramo + 1}</span>{" "}{fecha}
                                </li>
                              ))}
                            </ol>
                          ) : valor}
                          {nota && <small className="campaign-detail-note">{nota}</small>}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
                {campana.programacion && (
                  <div className="program">
                    <strong>Programación</strong>
                    <ul>{campana.programacion.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                )}
                <div className={`status ${inscripcion.estado}`}>
                  <i aria-hidden="true" />{textoEstadoInscripcion[inscripcion.estado]}
                </div>
                {inscripcion.formulario && (
                  <a
                    className="button primary"
                    href={`#${inscripcion.formulario.id}`}
                    aria-label={`Solicitar plaza en Colonias de ${campana.nombre}`}
                  >Solicitar plaza</a>
                )}
              </article>
            );
          })}
        </div>
        {colonias.map(({ campana, inscripcion }) => inscripcion.formulario && (
          <FormularioInscripcion key={campana.id} actividad={`Colonias de ${campana.nombre}`} formulario={inscripcion.formulario} />
        ))}
        <div className="info-note">
          <strong>¿Qué encontrarás en cada campaña?</strong>
          <p>Fechas, horario, edades, lugar, programación, tarifas, plazo y acceso a la inscripción cuando se publiquen.</p>
        </div>
        <ActivityCta />
      </div>
    </>
  );
}
