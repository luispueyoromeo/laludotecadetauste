export type EstadoInscripcion = "pendiente" | "abierta" | "cerrada";

export type Campana = {
  id: "verano" | "navidad" | "semana-santa";
  nombre: string;
  descripcion: string;
  fechas?: string;
  horario?: string;
  edades?: string;
  lugar?: string;
  programacion?: string[];
  tarifas?: string;
  plazo?: string;
  estado: EstadoInscripcion;
  enlace?: string;
};

export const campanas: Campana[] = [
  { id: "verano", nombre: "Verano", descripcion: "Una propuesta para disfrutar de las mañanas de las vacaciones escolares de verano.", estado: "pendiente" },
  { id: "navidad", nombre: "Navidad", descripcion: "Mañanas de juego y convivencia durante los días no lectivos de Navidad.", estado: "pendiente" },
  { id: "semana-santa", nombre: "Semana Santa", descripcion: "Una alternativa de ocio infantil y conciliación durante las vacaciones de Semana Santa.", estado: "pendiente" },
];

export type Sabado = { fecha: string; titulo: string; descripcion?: string; turno?: "mañana" | "tarde" | "ambos" };
export const sabados: Sabado[] = [];

export type OpcionCumpleanos = { nombre: string; incluye: string[]; duracion?: string; edades?: string; precio?: string; reserva?: string };
export const opcionesCumpleanos: OpcionCumpleanos[] = [];

export type Foto = { src: string; alt: string };
export type Acampada = { id: string; nombre: string; descripcion: string; fechas?: string; programa?: string[]; informacionPractica?: string[]; fotos?: Foto[]; estado: "proxima" | "realizada" };
export const acampadas: Acampada[] = [];

export type Inscripcion = { id: string; nombre: string; detalle: string; estado: EstadoInscripcion; enlace?: string };
export const inscripciones: Inscripcion[] = [
  ...campanas.map((campana) => ({ id: `colonias-${campana.id}`, nombre: `Colonias de ${campana.nombre}`, detalle: "Publicaremos aquí la información de la próxima campaña.", estado: campana.estado, enlace: campana.enlace })),
  { id: "sabados", nombre: "Sábados ludoteceros", detalle: "Consulta las próximas fechas y cómo participar.", estado: "pendiente" },
  { id: "cumpleanos", nombre: "Cumpleaños", detalle: "Contacta con la ludoteca para consultar las opciones disponibles.", estado: "pendiente" },
  { id: "acampadas", nombre: "Acampadas", detalle: "La información se publicará junto a cada nueva propuesta.", estado: "pendiente" },
];
