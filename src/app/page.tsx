import Link from "next/link";
import { Icon } from "@/components/icons";

const cards = [
  {href:"/colonias",icon:"sun" as const,title:"Colonias",text:"Propuestas de mañana durante las vacaciones de verano, Navidad y Semana Santa.",className:"yellow"},
  {href:"/sabados-ludoteceros",icon:"calendar" as const,title:"Sábados ludoteceros",text:"Juego y actividades los sábados del curso escolar, por la mañana y por la tarde.",className:"blue"},
  {href:"/cumpleanos",icon:"cake" as const,title:"Cumpleaños",text:"Un espacio donde celebrar un día especial. Consulta las opciones disponibles.",className:"coral"},
  {href:"/acampadas",icon:"tent" as const,title:"Acampadas",text:"Experiencias que se organizan a lo largo del año para disfrutar y compartir.",className:"green"},
];
export default function Home() { return <>
  <section className="home-hero"><div className="container home-hero-grid">
    <div className="hero-copy"><p className="eyebrow">Ocio y tiempo libre infantil en Tauste</p><h1>Un espacio para <em>jugar</em>, aprender y disfrutar</h1><p className="lead">La Ludoteca de Tauste es un espacio municipal con una larga trayectoria, pensado para que los niños y niñas compartan, se diviertan y vivan nuevas experiencias.</p><div className="hero-actions"><a href="#actividades" className="button primary">Conocer las actividades <Icon name="arrow" size={20}/></a><Link href="/inscripciones" className="button ghost">Consultar inscripciones</Link></div></div>
    <div className="play-scene" aria-hidden="true"><div className="sun-shape"/><div className="rainbow"><i/><i/><i/></div><div className="blocks"><i>L</i><i>U</i><i>D</i><i>O</i></div><div className="dots"/></div>
  </div><div className="wave"/></section>
  <section id="actividades" className="section container"><div className="section-heading"><div><p className="eyebrow">Hay mucho por descubrir</p><h2>Actividades para cada momento</h2></div><p>Encuentra la propuesta que buscas y consulta toda la información disponible.</p></div>
    <div className="activity-grid">{cards.map(c=><Link href={c.href} className={`activity-card ${c.className}`} key={c.href}><span className="card-icon"><Icon name={c.icon} size={34}/></span><h3>{c.title}</h3><p>{c.text}</p><span className="card-link">Descubrir más <Icon name="arrow" size={19}/></span></Link>)}</div>
  </section>
  <section className="about-section"><div className="container about-grid"><div className="about-art" aria-hidden="true"><span>Jugar</span><span>Compartir</span><span>Disfrutar</span></div><div><p className="eyebrow">La ludoteca</p><h2>Tiempo para crecer jugando</h2><p>El juego, la convivencia y la ilusión por descubrir están en el centro de la ludoteca. A lo largo del curso y en vacaciones se organizan distintas propuestas de ocio infantil.</p><p>Las colonias vacacionales ofrecen, además, una opción de conciliación para las familias durante los días no lectivos.</p><Link className="text-link" href="/colonias">Conocer las colonias <Icon name="arrow" size={19}/></Link></div></div></section>
  <section className="home-contact container"><div><p className="eyebrow light">Toda la información</p><h2>¿Cómo participar?</h2><p>Consulta el estado de cada actividad. Si todavía no se ha publicado una convocatoria, puedes contactar directamente con la ludoteca.</p></div><Link href="/inscripciones" className="button light">Ir a inscripciones <Icon name="arrow" size={20}/></Link></section>
  </> }
