import type { ConfiguracionInscripcion } from "@/lib/inscripciones";

export type Campana = ConfiguracionInscripcion & {
  nombre: string;
  descripcion: string;
  fechas?: string | string[];
  horario?: string;
  recogida?: string;
  edades?: string;
  lugar?: string;
  notaLugar?: string;
  programacion?: string[];
  tarifas?: string;
  plazo?: string;
  notaPlazo?: string;
};

export const campanas: Campana[] = [
  { id: "verano", nombre: "Verano", descripcion: "Una propuesta para disfrutar de las mañanas de las vacaciones escolares de verano.", estado: "pendiente" },
  {
    id: "navidad",
    nombre: "Navidad",
    descripcion: "Mañanas de juego y convivencia durante los días no lectivos de Navidad.",
    fechas: [
      "23 y 24 de diciembre de 2026",
      "28, 29, 30 y 31 de diciembre de 2026",
      "4 y 5 de enero de 2027",
    ],
    horario: "De 8:30 a 9:30 h, a la hora que elija cada familia.",
    recogida: "A las 13:00, 13:30 o 14:00 h, a elección de la familia.",
    edades: "Niños y niñas nacidos entre 2015 y 2023, ambos incluidos.",
    lugar: "La Ludoteca de Tauste*",
    notaLugar: "* La ubicación podrá variar en función del número de inscritos.",
    plazo: "Hasta el 13 de diciembre de 2026",
    notaPlazo: "Las solicitudes fuera de plazo quedarán sujetas a la disponibilidad de plazas.",
    estado: "pendiente",
  },
  { id: "semana-santa", nombre: "Semana Santa", descripcion: "Una alternativa de ocio infantil y conciliación durante las vacaciones de Semana Santa.", estado: "pendiente" },
];

export type Sabado = { fecha: string; titulo: string; descripcion?: string; turno?: "mañana" | "tarde" | "ambos" };
export const sabados: Sabado[] = [];

export type OpcionCumpleanos = { nombre: string; incluye: string[]; duracion?: string; edades?: string; precio?: string; reserva?: string };
export const opcionesCumpleanos: OpcionCumpleanos[] = [];

export type Foto = { src: string; alt: string };
export type Acampada = { id: string; nombre: string; descripcion: string; fechas?: string; programa?: string[]; informacionPractica?: string[]; fotos?: Foto[]; estado: "proxima" | "realizada" };
export const acampadas: Acampada[] = [];

export type Inscripcion = ConfiguracionInscripcion & {
  nombre: string;
  detalle: string;
  ruta: string;
  anclaFicha?: string;
};

export const inscripciones: Inscripcion[] = [
  ...campanas.map(({ id, nombre, descripcion, estado, enlace }) => ({
    id,
    nombre: `Colonias de ${nombre}`,
    detalle: descripcion,
    estado,
    enlace,
    ruta: "/colonias",
    anclaFicha: id,
  })),
  { id: "sabados", nombre: "Sábados ludotequeros", detalle: "Consulta las próximas fechas y cómo participar.", estado: "pendiente", ruta: "/sabados-ludoteceros" },
  { id: "cumpleanos", nombre: "Cumpleaños", detalle: "Contacta con la ludoteca para consultar las opciones disponibles.", estado: "pendiente", ruta: "/cumpleanos" },
  { id: "acampadas", nombre: "Acampadas", detalle: "La información se publicará junto a cada nueva propuesta.", estado: "pendiente", ruta: "/acampadas" },
];
