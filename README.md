# Tina Valente — demo (sitio estático)

Propuesta comercial de **Guru Software Studio** para la marca ficticia de demostración **Tina Valente**: artesanías mexicanas únicas, organizadas por productor y estado, con experiencias en taller y checkout simulado.

## Cómo correrlo en local

Con Python 3:

```bash
cd /ruta/al/repo
python3 -m http.server 8080
```

Abre [http://localhost:8080](http://localhost:8080) en el navegador.

También puedes usar cualquier servidor de archivos estáticos (`npx serve`, `php -S`, etc.).

## Despliegue

Sirve la raíz del repositorio como sitio estático (por ejemplo en Vercel: **Static Site**, sin funciones ni base de datos).

## Editar contenido

| Archivo | Contenido |
|--------|-----------|
| `data/catalog.js` | Productores, piezas, experiencias y texto «Nosotros» |
| `data/mexico-map.js` | Geometría del mapa (CC BY 4.0). Los estados activos son los que tienen `stateId` en productores (`oax`, `chp`, `gro`, etc.) |

### Añadir un productor

En `data/catalog.js`, agrega un objeto en `producers` con `id`, `stateId` (clave del mapa), `stateName`, `craft`, `story`, `imageSeed`, etc.

### Añadir piezas

Agrega entradas en `pieces` con `producerId` que coincida con el productor.

### Añadir experiencias

Agrega entradas en `experiences` con fechas (`dates`), `capacity`, `duration` y `priceMXN`.

## Comportamiento de la demo

- Navegación por hash: `#/`, `#/estado/oax`, `#/productor/maria-chen`, `#/pieza/...`, `#/carrito`, `#/checkout`.
- Carrito y piezas vendidas se guardan en `localStorage` del navegador.
- Las piezas únicas compradas en el checkout simulado quedan marcadas como **Vendida**.
- Imágenes: cada `imageSeed` genera un recuadro textil de ejemplo (sin fotos de terceros). El pie de foto dice «Imagen de ejemplo».

## Licencia del mapa

El mapa proviene de [@svg-maps/mexico](https://www.npmjs.com/package/@svg-maps/mexico) (Creative Commons BY 4.0).