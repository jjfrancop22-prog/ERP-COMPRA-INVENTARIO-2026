# ERP COMPRAS V4.0.0-C14.5.4.13

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


## C14.5.4.12 — Maria Elena + búsqueda continua
- Se agrega **Maria Elena** al selector de analistas/responsables de **Consumo por OT**.
- Los buscadores que refrescan sus módulos conservan el foco y la posición del cursor mientras se escribe, evitando tener que volver a seleccionar el campo después de cada letra.
- No se alteran reglas de consumo, lotes, FEFO, tara, inventario ni trazabilidad.


## C14.5.4.13 — Baja trazable por vencimiento
- Lote vencido con saldo: `VENCIDO · PENDIENTE DE BAJA`.
- Bloqueo automático para FEFO/consumo.
- Baja manual confirmada con saldo a cero, estado final, movimiento integrado y auditoría.
- No se elimina el registro histórico.
