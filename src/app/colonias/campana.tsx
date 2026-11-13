import type { ComponentProps, ReactNode } from "react";
import { FormularioInscripcion } from "@/components/formulario-inscripcion";
import { Icon } from "@/components/icons";
import { tituloCampana, type Campana } from "@/content/actividades";
import { textoEstadoInscripcion, type resolverInscripcion } from "@/lib/inscripciones";
import styles from "./colonias.module.css";

type Icono = ComponentProps<typeof Icon>["name"];
type CampanaConInscripcion = {
  campana: Campana;
  inscripcion: ReturnType<typeof resolverInscripcion>;
};

const iconosTemporada = {
  navidad: "snowflake",
  primavera: "sprout",
  verano: "sun",
} as const;

const listaDias = new Intl.ListFormat("es-ES", { type: "conjunction" });
const euros = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  trailingZeroDisplay: "stripIfInteger",
});
const porcentaje = new Intl.NumberFormat("es-ES", { style: "percent", maximumFractionDigits: 2 });

function tieneContenido(valor: unknown) {
  return Array.isArray(valor) ? valor.length > 0 : Boolean(valor);
}

export function tieneInformacion(campana: Campana) {
  return campana.precioDiaSuelto !== undefined || campana.descuentoHermanos !== undefined || [
    campana.fechas, campana.entrada, campana.horario, campana.recogida,
    campana.edades, campana.lugar, campana.tarifas, campana.plazo, campana.programacion,
  ].some(tieneContenido);
}

export function ResumenCampana({
  campana, inscripcion, tieneFicha, destacada,
}: CampanaConInscripcion & { tieneFicha: boolean; destacada: boolean }) {
  const icono = campana.temporada ? iconosTemporada[campana.temporada] : "calendar";
  const distintivo = <span className={styles.iconBox}><Icon name={icono} /></span>;

  if (tieneFicha) {
    return (
      <a className={styles.summary} data-temporada={campana.temporada} data-destacada={destacada || undefined} href={`#${campana.id}`}>
        {distintivo}
        <span className={styles.summaryCopy}>
          <strong>{campana.nombre}</strong>
          <span>{campana.edicion ?? "Ver ficha"}</span>
        </span>
        <span className={styles.summaryArrow}><Icon name="arrow" size={20} /></span>
      </a>
    );
  }

  return (
    <article className={styles.summary} data-temporada={campana.temporada} id={campana.id} tabIndex={-1}>
      {distintivo}
      <div className={styles.summaryCopy}>
        <h2>{campana.nombre}{campana.edicion && ` ${campana.edicion}`}</h2>
        <p>{campana.descripcion}</p>
        <span className={styles.summaryStatus}>
          {inscripcion.estado === "pendiente" ? "Detalles próximamente" : textoEstadoInscripcion[inscripcion.estado]}
        </span>
      </div>
    </article>
  );
}

function TituloModulo({ icono, children }: { icono: Icono; children: ReactNode }) {
  return (
    <h3 className={styles.moduleHeading}>
      <span className={styles.iconBox}><Icon name={icono} size={21} /></span>
      {children}
    </h3>
  );
}

function FechasCampana({ fechas, precioDiaSuelto, descuentoHermanos }: Pick<Campana, "fechas" | "precioDiaSuelto" | "descuentoHermanos">) {
  const textoFechas = typeof fechas === "string" ? fechas : undefined;
  const tramos = Array.isArray(fechas) ? fechas : [];
  const tieneFechas = Boolean(textoFechas) || tramos.length > 0;
  const tienePrecios = precioDiaSuelto !== undefined || descuentoHermanos !== undefined
    || tramos.some((tramo) => typeof tramo !== "string" && tramo.precio !== undefined);
  if (!tieneFechas && !tienePrecios) return null;

  const titulo = tieneFechas ? "Fechas de celebración" : "Precios de inscripción";

  return (
    <section>
      <TituloModulo icono={tieneFechas ? "calendar" : "ticket"}>
        {tieneFechas && tienePrecios ? "Fechas y precios" : titulo}
      </TituloModulo>
      {textoFechas && <p className={styles.value}>{textoFechas}</p>}
      {tramos.length > 0 && (
        <ol className={styles.periods} role="list">
          {tramos.map((tramo, indice) => {
            const precio = typeof tramo === "string" ? undefined : tramo.precio;

            return (
              <li className={styles.period} data-precio={precio !== undefined || undefined} key={indice}>
                <div className={styles.periodHeader}>
                  <span className={styles.periodLabel}>Tramo {indice + 1}</span>
                  {precio !== undefined && <strong className={styles.price}>{euros.format(precio)}</strong>}
                </div>
                {typeof tramo === "string" ? <span className={styles.periodText}>{tramo}</span> : (
                  <>
                    <span className={styles.days} aria-hidden="true">
                      {tramo.dias.map((dia) => <span key={dia}>{dia}</span>)}
                    </span>
                    <span className={styles.periodMonth} aria-hidden="true">{tramo.mes} de {tramo.anio}</span>
                    <span className={styles.srOnly}>
                      {listaDias.format(tramo.dias.map(String))} de {tramo.mes} de {tramo.anio}
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      )}
      {precioDiaSuelto !== undefined && (
        <div className={styles.singleDay}>
          <span className={styles.iconBox}><Icon name="ticket" size={21} /></span>
          <strong>Días sueltos</strong>
          <p className={styles.singleDayPrice}>
            <strong className={styles.price}>{euros.format(precioDiaSuelto)}</strong>{" "}<span>por día</span>
          </p>
        </div>
      )}
      {descuentoHermanos !== undefined && (
        <div className={styles.siblingDiscount}>
          <strong className={`${styles.price} ${styles.discountBadge}`}>{porcentaje.format(descuentoHermanos / 100)}</strong>
          <p className={styles.discountCopy}>
            <strong>Descuento para hermanos</strong>
            <span>Se aplica al importe total de la inscripción de cada hermano a partir del segundo.</span>
          </p>
        </div>
      )}
    </section>
  );
}

function HorarioCampana({ horario, entrada, recogida, notaHorario }: Pick<Campana, "horario" | "entrada" | "recogida" | "notaHorario">) {
  return (
    <section className={`${styles.fact} ${styles.schedule}`}>
      <TituloModulo icono="clock">Horario</TituloModulo>
      {horario && (
        <div className={styles.timeOption}>
          {!entrada && tieneContenido(recogida) && <span className={styles.timeLabel}>Entrada</span>}
          <p className={styles.value}>{horario}</p>
        </div>
      )}
      {entrada && (
        <div className={styles.timeOption}>
          <span className={styles.timeLabel}>Entrada flexible</span>
          <p className={styles.timeRange}>De {entrada.desde} a {entrada.hasta}</p>
        </div>
      )}
      {tieneContenido(recogida) && (
        <div className={styles.timeOption}>
          <span className={styles.timeLabel}>{Array.isArray(recogida) ? "Recogida a elegir" : "Recogida"}</span>
          {Array.isArray(recogida) ? (
            <ul className={styles.pickupTimes} role="list">
              {recogida.map((hora) => <li key={hora}>{hora}</li>)}
            </ul>
          ) : <p className={styles.value}>{recogida}</p>}
        </div>
      )}
      {notaHorario && <p className={styles.note}>{notaHorario}</p>}
    </section>
  );
}

export function FichaCampana({ campana, inscripcion }: CampanaConInscripcion) {
  const titulo = tituloCampana(campana);
  const icono = campana.temporada ? iconosTemporada[campana.temporada] : "calendar";
  const tieneHorario = Boolean(campana.horario || campana.entrada || tieneContenido(campana.recogida));
  const tieneDatos = tieneHorario || campana.edades || campana.lugar || campana.tarifas;
  const tieneInscripcion = campana.plazo || inscripcion.estado !== "pendiente";
  const tituloId = `${campana.id}-titulo`;

  return (
    <article className={styles.campaign} data-temporada={campana.temporada} id={campana.id} aria-labelledby={tituloId} tabIndex={-1}>
      <header className={styles.banner}>
        <div className={styles.bannerCopy}>
          <h2 id={tituloId} aria-label={titulo}>
            Colonias de {campana.nombre}
            {campana.edicion && <>{" "}<span className={styles.edition}>{campana.edicion}</span></>}
          </h2>
          <p>{campana.descripcion}</p>
        </div>
        <div className={styles.bannerArt} aria-hidden="true"><Icon name={icono} size={88} /></div>
      </header>

      <div className={styles.campaignBody}>
        <FechasCampana
          fechas={campana.fechas}
          precioDiaSuelto={campana.precioDiaSuelto}
          descuentoHermanos={campana.descuentoHermanos}
        />

        {tieneDatos && (
          <div className={styles.facts}>
            {tieneHorario && <HorarioCampana {...campana} />}
            {campana.edades && (
              <section className={styles.fact}>
                <TituloModulo icono="people">Edades</TituloModulo>
                <p className={styles.value}>{campana.edades}</p>
              </section>
            )}
            {campana.lugar && (
              <section className={styles.fact}>
                <TituloModulo icono="pin">Lugar</TituloModulo>
                <p className={styles.value}>{campana.lugar}</p>
                {campana.notaLugar && <p className={styles.note}>{campana.notaLugar}</p>}
              </section>
            )}
            {campana.tarifas && (
              <section className={styles.fact}>
                <TituloModulo icono="ticket">Tarifas</TituloModulo>
                <p className={styles.value}>{campana.tarifas}</p>
              </section>
            )}
          </div>
        )}

        {campana.programacion && campana.programacion.length > 0 && (
          <section className={styles.fact}>
            <TituloModulo icono="calendar">Programación</TituloModulo>
            <ul className={styles.program}>
              {campana.programacion.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        )}

        {tieneInscripcion && (
          <section className={styles.registration}>
            <div>
              <TituloModulo icono="clipboard">Inscripción</TituloModulo>
              {campana.plazo && <p className={styles.deadline}>{campana.plazo}</p>}
              {campana.notaPlazo && <p className={styles.note}>{campana.notaPlazo}</p>}
            </div>
            {inscripcion.formulario ? (
              <a className="button primary" href={`#${inscripcion.formulario.id}`} aria-label={`Inscribirse en ${titulo}`}>
                Inscribirse <Icon name="arrow" size={19} />
              </a>
            ) : (
              <span className={`status ${inscripcion.estado} ${styles.registrationStatus}`}>
                <i aria-hidden="true" />
                {inscripcion.estado === "pendiente" ? "Formulario pendiente" : textoEstadoInscripcion[inscripcion.estado]}
              </span>
            )}
          </section>
        )}

        {inscripcion.formulario && (
          <FormularioInscripcion actividad={titulo} formulario={inscripcion.formulario} />
        )}
      </div>
    </article>
  );
}
