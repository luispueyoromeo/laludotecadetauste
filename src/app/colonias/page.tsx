import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { campanas, idCampanaDestacada } from "@/content/actividades";
import { resolverInscripcion } from "@/lib/inscripciones";
import { FichaCampana, ResumenCampana, tieneInformacion } from "./campana";
import styles from "./colonias.module.css";

export const metadata: Metadata = {
  title: "Colonias",
  description: "Colonias de Navidad, Semana Santa y verano de La Ludoteca de Tauste. Consulta las fechas, horarios y cómo inscribirte.",
};

export default function Colonias() {
  const colonias = campanas.map((campana) => {
    const inscripcion = resolverInscripcion(campana);
    return { campana, inscripcion, tieneFicha: tieneInformacion(campana) || Boolean(inscripcion.formulario) };
  });
  const destacada = colonias.find(({ campana, tieneFicha }) => tieneFicha && campana.id === idCampanaDestacada)
    ?? colonias.find(({ tieneFicha }) => tieneFicha);
  const ordenadas = destacada ? [destacada, ...colonias.filter((colonia) => colonia !== destacada)] : colonias;
  const fichas = ordenadas.filter(({ tieneFicha }) => tieneFicha);

  return (
    <>
      <header className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div>
            <h1>Colonias</h1>
            <p>Mañanas de juego y convivencia durante las vacaciones escolares. Una opción de ocio infantil y conciliación para las familias.</p>
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <span className={styles.heroCalendar}><Icon name="calendar" size={76} /></span>
            <span className={styles.heroSun}><Icon name="sun" size={34} /></span>
            <span className={styles.heroBlock} />
          </div>
        </div>
      </header>

      <div className={`container ${styles.campaigns}`}>
        <nav aria-label="Campañas de colonias">
          <ul className={styles.selector} role="list">
            {ordenadas.map((colonia) => (
              <li key={colonia.campana.id}>
                <ResumenCampana {...colonia} destacada={colonia === destacada} />
              </li>
            ))}
          </ul>
        </nav>

        {fichas.map(({ campana, inscripcion }) => (
          <FichaCampana key={campana.id} campana={campana} inscripcion={inscripcion} />
        ))}

        <Link href="/inscripciones" className={styles.registrationLink}>
          Ver todas las inscripciones <Icon name="arrow" size={19} />
        </Link>
      </div>
    </>
  );
}
