"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logotipo from "@/assets/logo-ludoteca-de-tauste.webp";
import { navegacion } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <div className="header-inner">
      <Link href="/" className="brand" aria-label="La Ludoteca de Tauste, inicio">
        <img
          className="brand-logo"
          src={logotipo.src}
          width={logotipo.width}
          height={logotipo.height}
          alt="La Ludoteca de Tauste"
          decoding="async"
        />
      </Link>
      <button className="menu-button" aria-label="Menú" aria-expanded={open} aria-controls="menu-principal" onClick={() => setOpen(!open)}><span className="menu-icon" aria-hidden="true"/> <span>Menú</span></button>
      <nav id="menu-principal" aria-label="Navegación principal" className={open ? "nav open" : "nav"}>
        {navegacion.map(({href,label}) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
      </nav>
    </div>
  </header>;
}
