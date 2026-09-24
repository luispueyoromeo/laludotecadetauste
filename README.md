# La Ludoteca de Tauste

Primera versión de la web informativa de **La Ludoteca de Tauste**, desarrollada con Next.js y TypeScript.

## Vista previa local

Requiere Node.js 20 o posterior.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Para comprobar la versión de producción:

```bash
npm run build
npm start
```

## Actualizar contenidos

Los datos que cambiarán con frecuencia están centralizados en `src/content/actividades.ts`. Los datos de contacto y la navegación están en `src/content/site.ts`.

### Añadir o modificar una campaña de colonias

Edita el elemento correspondiente de `campanas`. Puedes completar `fechas`, `horario`, `edades`, `lugar`, `programacion`, `tarifas`, `plazo`, `estado` y `enlace`. No elimines el `id`. Los estados admitidos son `pendiente`, `abierta` y `cerrada`.

### Publicar un sábado

Añade un objeto a `sabados` con fecha en texto legible, título de la actividad y, si procede, descripción y turno. Ejemplo de estructura (con datos reales):

```ts
{ fecha: "...", titulo: "...", descripcion: "...", turno: "mañana" }
```

### Añadir opciones de cumpleaños

Añade elementos a `opcionesCumpleanos`. Cada opción permite indicar nombre, qué incluye, duración, edades, precio y procedimiento de reserva. Publica únicamente condiciones confirmadas.

### Añadir una acampada y fotografías

Añade un objeto a `acampadas` con un `id` único, nombre, descripción y estado (`proxima` o `realizada`). Puedes sumar fechas, programa, información práctica y fotos. Guarda las imágenes optimizadas en `public/images/acampadas/` y completa siempre un texto `alt` que describa cada foto. Usa solo imágenes autorizadas para este fin.

### Gestionar una inscripción

Edita el estado del elemento en `inscripciones` y añade su `enlace`. La web solo muestra el botón y el texto «Inscripciones abiertas» cuando el estado es `abierta` y hay un enlace. Para cerrarla, usa `cerrada` y retira el enlace; si aún no se ha anunciado, usa `pendiente`.

## Datos pendientes

Para completar el contenido se necesitan las fechas, horarios, edades, lugares, programas, tarifas, plazos y enlaces de las próximas colonias; el calendario y programación de sábados; las modalidades y condiciones de cumpleaños; la información y fotografías autorizadas de acampadas; y los enlaces o canales de las próximas inscripciones.
