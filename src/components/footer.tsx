import Link from "next/link";
import { contacto } from "@/content/site";
import { Icon } from "./icons";
export function Footer() { return <footer className="footer"><div className="footer-inner">
  <div className="footer-intro"><p className="eyebrow light">Estamos cerca</p><h2>¿Hablamos?</h2><p>Si necesitas más información, ponte en contacto con la ludoteca.</p></div>
  <address className="contact-list">
    <a href={contacto.telefonoHref}><Icon name="phone"/><span><small>Teléfono</small>{contacto.telefono}</span></a>
    <a href={contacto.emailHref}><Icon name="mail"/><span><small>Correo electrónico</small>{contacto.email}</span></a>
    <a href={contacto.instagramHref} target="_blank" rel="noreferrer"><Icon name="instagram"/><span><small>Instagram</small>{contacto.instagram}</span></a>
    <span><Icon name="pin"/><span><small>Nos encontrarás en</small>{contacto.ubicacion}</span></span>
  </address>
</div><div className="footer-bottom"><span>© {new Date().getFullYear()} La Ludoteca de Tauste</span><Link href="/inscripciones">Información e inscripciones</Link></div></footer> }
