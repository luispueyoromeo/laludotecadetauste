# La Ludoteca de Tauste

Primera versión de la web informativa de **La Ludoteca de Tauste**, desarrollada con Next.js y TypeScript.

## Vista previa local

Requiere Node.js 20 o posterior.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Para generar y comprobar la exportación estática que usa Cloudflare Pages:

```bash
npm run build
```

## Actualizar contenidos

Los datos que cambiarán con frecuencia están centralizados en `src/content/actividades.ts`. Los datos de contacto y la navegación están en `src/content/site.ts`.

### Añadir o modificar una campaña de colonias

Edita el elemento correspondiente de `campanas`. Puedes completar `edicion`, `fechas`, `horario`, `edades`, `lugar`, `programacion`, `tarifas` y `plazo`. La ficha muestra los bloques que tienen datos.

- **Fechas.** Usa un texto o una lista de tramos. Cada tramo del calendario indica los días del mismo mes, el mes y el año, como `{ dias: [23, 24], mes: "diciembre", anio: 2026 }`. También puedes escribir un tramo como texto.
- **Horario.** Usa `horario` para un horario general, `entrada` con `desde` y `hasta` para una franja flexible y `recogida` para las horas disponibles.
- **Campaña destacada.** Cambia `idCampanaDestacada` al `id` de la campaña que quieras presentar primero. Mantén los identificadores existentes para conservar sus enlaces. Si añades otra edición, asigna un identificador único, en minúsculas y con guiones entre palabras.

### Publicar un sábado

Añade un objeto a `sabados` con fecha en texto legible, título de la actividad y, si procede, descripción y turno. Ejemplo de estructura (con datos reales):

```ts
{ fecha: "...", titulo: "...", descripcion: "...", turno: "mañana" }
```

### Añadir opciones de cumpleaños

Añade elementos a `opcionesCumpleanos`. Cada opción permite indicar nombre, qué incluye, duración, edades, precio y procedimiento de reserva. Publica únicamente condiciones confirmadas.

### Añadir una acampada y fotografías

Añade un objeto a `acampadas` con un `id` único, nombre, descripción y estado (`proxima` o `realizada`). Puedes sumar fechas, programa, información práctica y fotos. Guarda las imágenes optimizadas en `public/images/acampadas/` y completa siempre un texto `alt` que describa cada foto. Usa solo imágenes autorizadas para este fin.

### Gestionar las inscripciones de Colonias

Gestiona el `estado` y el `enlace` en el elemento de `campanas`. El índice `/inscripciones` se actualiza a partir de esos mismos datos.

- **Abrir.** Tras revisar los datos solicitados y el aviso de privacidad, publica el formulario en Google, comprueba que acepta respuestas y copia su enlace largo para responder, o el valor de `src` de «Insertar HTML». Pégalo como `enlace` y usa `estado: "abierta"`. Comprueba la vista previa de la web sin iniciar sesión en Google.
- **Cerrar.** Desactiva la opción de aceptar respuestas en Google Forms para que también se cierre el enlace directo. Cambia el estado a `cerrada`. La web conserva la ficha y oculta el formulario.
- **Dejar pendiente.** Usa `estado: "pendiente"` hasta que la inscripción esté preparada. Si se marca `abierta` con un enlace ausente o incompatible, la web también muestra el estado pendiente.

Para un enlace corto `forms.gle`, ábrelo y copia la dirección completa de `docs.google.com` que termina en `/viewform` antes de sus parámetros. En la web el formulario se muestra dentro de la página de la actividad. Las respuestas se guardan en Google Forms y, si se vincula una hoja de cálculo, también en Google Sheets.

## Datos pendientes

Para completar el contenido se necesitan las fechas, horarios, edades, lugares, programas, tarifas, plazos y enlaces de las próximas colonias; el calendario y programación de sábados; las modalidades y condiciones de cumpleaños; la información y fotografías autorizadas de acampadas; y los enlaces o canales de las próximas inscripciones.
