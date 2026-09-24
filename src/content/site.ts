/** Datos generales: edita aquí los canales de contacto si cambian. */
export const contacto = {
  telefono: "650 044 395",
  telefonoHref: "tel:+34650044395",
  email: "laludotecadetauste@gmail.com",
  emailHref: "mailto:laludotecadetauste@gmail.com",
  instagram: "@laludotecadetauste",
  instagramHref: "https://www.instagram.com/laludotecadetauste/",
  ubicacion: "Tauste, Zaragoza",
};

export const navegacion = [
  { href: "/", label: "Inicio" },
  { href: "/colonias", label: "Colonias" },
  { href: "/sabados-ludoteceros", label: "Sábados ludoteceros" },
  { href: "/cumpleanos", label: "Cumpleaños" },
  { href: "/acampadas", label: "Acampadas" },
  { href: "/inscripciones", label: "Inscripciones" },
] as const;
