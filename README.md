# ERP COMPRAS V4.0.0-C14.5.4.9

Producción GitHub / Netlify.

Corrección puntual de Inventario: la recepción conserva la presentación comercial (por ejemplo, **1 Caja**), pero para productos de método **Contable** el ERP convierte el contenido de esa presentación a la **unidad base de inventario**. Ejemplo: **1 Caja × 25 Unidades = 25 Unidades** disponibles.

El factor de conversión y la unidad base se heredan desde Productos/OC y también quedan visibles al ingresar el lote. Líquidos y sólidos mantienen su control físico por frascos, tara, masa y volumen.

Clave de autorizaciones de Calidad: `CALIDAD`.


## C14.5.4.9 — Fechas encadenadas editables
- Recepción: precarga la fecha seleccionada al generar la OC y permite editarla.
- Inventario: precarga como Fecha de ingreso la fecha guardada en Recepción y permite editarla.
- No modifica cantidades, inventario, Firebase ni los demás flujos.


## C14.5.4.9 — Analistas de consumo por OT
- Responsable del formulario **Registrar consumo por OT** limitado a: Jipson Franco, Lizbeth Prieto, Joe Franco, Nidia Sanchez, Katherine Flores y José Núñez.
- La OT automática sigue generándose según el responsable seleccionado.
- No se altera Recepción OC ni sus responsables.
