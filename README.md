# ERP Compras Enterprise V4 — C14.5.4.1

Paquete limpio de producción para GitHub + Netlify.

## Publicar
1. Suba **el contenido de esta carpeta** a la raíz del repositorio GitHub.
2. Netlify puede publicar directamente desde la raíz (`publish = "."`).
3. No suba respaldos `index.before_*` ni README de versiones anteriores.

## Archivos de producción
- `index.html` — aplicación
- `assets/` — recursos
- `icons/` — iconos PWA
- `manifest.webmanifest` — instalación PWA
- `service-worker.js` — caché/actualización PWA
- `netlify.toml` — configuración Netlify
- `firestore.rules` — reglas Firestore de referencia/despliegue
- `release.json` — identificación de la versión publicada
