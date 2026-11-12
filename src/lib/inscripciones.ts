export type EstadoInscripcion = "pendiente" | "abierta" | "cerrada";

export type ConfiguracionInscripcion = {
  id: string;
  estado: EstadoInscripcion;
  enlace?: string;
};

export type FormularioGoogle = {
  id: string;
  enlace: string;
  insercion: string;
};

type InscripcionVisible =
  | { estado: "pendiente" | "cerrada"; formulario?: never }
  | { estado: "abierta"; formulario: FormularioGoogle };

export const textoEstadoInscripcion: Record<EstadoInscripcion, string> = {
  pendiente: "Próximamente más información",
  abierta: "Inscripciones abiertas",
  cerrada: "Inscripciones cerradas",
};

const origenGoogle = "https://docs.google.com";
const rutaFormularioPublico = /^\/forms(?:\/u\/\d+)?\/d\/((?:e\/)?[A-Za-z0-9_-]+)\/viewform\/?$/;

export function resolverInscripcion({ id, estado, enlace }: ConfiguracionInscripcion): InscripcionVisible {
  if (estado !== "abierta") return { estado };
  if (!enlace || !URL.canParse(enlace)) return { estado: "pendiente" };

  const url = new URL(enlace);
  const ruta = rutaFormularioPublico.exec(url.pathname);
  if (url.origin !== origenGoogle || url.username || url.password || !ruta) {
    return { estado: "pendiente" };
  }

  const enlacePublico = `${origenGoogle}/forms/d/${ruta[1]}/viewform`;
  return {
    estado: "abierta",
    formulario: {
      id: `formulario-${id}`,
      enlace: enlacePublico,
      insercion: `${enlacePublico}?embedded=true`,
    },
  };
}
