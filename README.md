# NENE BARBER — sitio web

Propuesta comercial para NENE BARBER (Aracena, Huelva). Sitio estático (HTML + CSS + JS, sin frameworks ni build step) — carga rápido y se despliega en cualquier sitio sin configuración.

## Ver en local

No hace falta instalar nada. Con Node.js instalado:

```
node server.js
```

Y abre `http://localhost:4500` en el navegador. (O simplemente abre `index.html` con doble clic — funciona igual, salvo que algunos navegadores son más estrictos con rutas locales; el servidor evita ese problema.)

## Subir a GitHub

```
git init
git add .
git commit -m "NENE BARBER — sitio inicial"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/nene-barber.git
git push -u origin main
```

(Si ya ejecutaste `git init` porque te lo entrego con el repo ya creado, sáltate el primer paso y ve directo a crear el remoto y hacer push.)

## Desplegar en Vercel

1. Entra en [vercel.com](https://vercel.com) → **Add New… → Project**.
2. Importa el repositorio de GitHub `nene-barber`.
3. Vercel detecta que es un sitio estático — no hace falta tocar nada (no hay "Build Command", el "Output Directory" es la raíz). Dale a **Deploy**.
4. En 30-60 segundos tienes una URL en `https://nene-barber-xxxx.vercel.app`. Puedes conectar tu dominio propio (p. ej. `nenebarber.com`) desde **Settings → Domains**.

Cada vez que hagas `git push`, Vercel vuelve a desplegar automáticamente.

## Qué falta para cerrar el sitio al 100%

No he inventado ningún dato que no viniera de tu material — así que quedan estos huecos preparados y listos para rellenar en cuanto me los pases:

- **Teléfono / WhatsApp y dirección exacta** — ahora mismo la sección de contacto solo muestra Aracena, Huelva + Instagram (@nenebarber7), que es lo único confirmado.
- **Horario** — si quieres mostrarlo.
- **Nombres de los 3 barberos del equipo** (si Nene quiere que aparezcan con nombre, no solo como "Equipo Nene Barber").
- **Premios/reconocimientos concretos** (nombres, años) — la sección 05 ya está montada visualmente (con la prueba real de jurado en Expo Barber Battle Málaga) y lista para sumar más tarjetas en cuanto haya nombres confirmados.
- **Fotografía en alta resolución** — las fotos actuales vienen de capturas de Instagram (no tenía archivos originales), así que las traté con un tratamiento de grano + blanco y negro editorial para disimular la baja resolución. Si me pasas los archivos originales de cámara/móvil (sin comprimir por Instagram), puedo sustituirlas y ganar bastante nitidez, especialmente en las fotos grandes (hero, sección NENE, STUDIO).

## Estructura del proyecto

```
index.html          → toda la maquetación
css/style.css        → sistema visual (colores, tipografía, layout, animaciones)
js/main.js            → interacciones (menú, scroll reveals, cursor, parallax)
public/images/        → fotografía procesada
server.js             → servidor local de solo-lectura para previsualizar (sin dependencias)
```
