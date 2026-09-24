import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = { metadataBase: new URL("https://laludotecadetauste.com"), title: { default: "La Ludoteca de Tauste", template: "%s | La Ludoteca de Tauste" }, description: "Espacio municipal de ocio y tiempo libre infantil en Tauste. Conoce sus actividades e información para participar." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body><Header/><main id="contenido">{children}</main><Footer/></body></html> }
