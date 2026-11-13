import type { AvisoPrivacidadInscripcion, ConfiguracionInscripcion } from "@/lib/inscripciones";

type TramoColonia = {
  dias: [number, ...number[]];
  mes: string;
  anio: number;
};

export type Campana = ConfiguracionInscripcion & {
  nombre: string;
  descripcion: string;
  temporada?: "navidad" | "primavera" | "verano";
  edicion?: string;
  fechas?: string | (TramoColonia | string)[];
  horario?: string;
  entrada?: { desde: string; hasta: string };
  recogida?: string | string[];
  notaHorario?: string;
  edades?: string;
  lugar?: string;
  notaLugar?: string;
  programacion?: string[];
  tarifas?: string;
  plazo?: string;
  notaPlazo?: string;
  privacidad?: AvisoPrivacidadInscripcion;
};

export const idCampanaDestacada = "navidad";

export const campanas: Campana[] = [
  {
    id: "navidad",
    nombre: "Navidad",
    temporada: "navidad",
    edicion: "2026-2027",
    descripcion: "Mañanas para jugar, compartir y disfrutar de las vacaciones de Navidad.",
    fechas: [
      { dias: [23, 24], mes: "diciembre", anio: 2026 },
      { dias: [28, 29, 30, 31], mes: "diciembre", anio: 2026 },
      { dias: [4, 5], mes: "enero", anio: 2027 },
    ],
    entrada: { desde: "8:30", hasta: "9:30" },
    recogida: ["13:00", "13:30", "14:00"],
    notaHorario: "Cada familia elige su hora de llegada dentro de esa franja y una de las opciones de recogida.",
    edades: "Niños y niñas nacidos entre 2015 y 2023, ambos incluidos.",
    lugar: "La Ludoteca de Tauste*",
    notaLugar: "* La ubicación podrá variar en función del número de inscritos.",
    plazo: "Hasta el 13 de diciembre de 2026",
    notaPlazo: "Las solicitudes fuera de plazo quedarán sujetas a la disponibilidad de plazas.",
    estado: "abierta",
    enlace: "https://docs.google.com/forms/d/e/1FAIpQLSdobWVe2PDVCh7K4Q-obIv_2Va2OYdTKz8d_HK6Ngy3SB2kFw/viewform",
    privacidad: {
      responsable: "Sanpue 5v",
      correoDerechos: "sanpue5v@gmail.com",
      nota: "La pregunta sobre enfermedades o alergias es opcional. Si prefieres comunicar esta información por otro canal, consulta con la organización.",
    },
  },
  {
    id: "semana-santa",
    nombre: "Semana Santa",
    temporada: "primavera",
    descripcion: "Ocio infantil y conciliación durante las vacaciones de Semana Santa.",
    estado: "pendiente",
  },
  {
    id: "verano",
    nombre: "Verano",
    temporada: "verano",
    descripcion: "Mañanas de ocio durante las vacaciones escolares de verano.",
    estado: "pendiente",
  },
];

export function tituloCampana({ nombre, edicion }: Pick<Campana, "nombre" | "edicion">) {
  return `Colonias de ${nombre}${edicion ? ` ${edicion}` : ""}`;
}

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
  ...campanas.map((campana) => ({
    id: campana.id,
    nombre: tituloCampana(campana),
    detalle: campana.descripcion,
    estado: campana.estado,
    enlace: campana.enlace,
    ruta: "/colonias",
    anclaFicha: campana.id,
  })),
  { id: "sabados", nombre: "Sábados ludotequeros", detalle: "Consulta las próximas fechas y cómo participar.", estado: "pendiente", ruta: "/sabados-ludoteceros" },
  { id: "cumpleanos", nombre: "Cumpleaños", detalle: "Contacta con la ludoteca para consultar las opciones disponibles.", estado: "pendiente", ruta: "/cumpleanos" },
  { id: "acampadas", nombre: "Acampadas", detalle: "La información se publicará junto a cada nueva propuesta.", estado: "pendiente", ruta: "/acampadas" },
];
