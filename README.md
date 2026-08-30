# ERP COMPRAS V4.0.0-C14.5.4.18 — CORRECCIÓN MOVIMIENTO + COSTO

## Cambios de esta versión
- Nueva opción **✏️ Corregir** en movimientos `Consumo OT` de inventario contable.
- Requiere contraseña de Calidad y motivo obligatorio.
- No elimina el movimiento original: conserva evidencia antes/después y auditoría.
- Ajusta automáticamente el saldo del mismo envase/lote por la diferencia digitada.
- Recalcula el costo de la salida corregida.
- Corrige el Dashboard para incluir `Consumo OT` en consumo mensual y costo de consumo.
- El costo usa el precio de la OC/lote convertido a la unidad base del inventario y queda congelado en el movimiento.

Ejemplo validado: si el saldo actual es 11 y una salida fue digitada como 85 cuando debía ser 11, la corrección devuelve 74 unidades y el saldo pasa a **85 unidades**.

# ERP COMPRAS V4.0.0-C14.5.4.17 — FIX UNIDAD BAJA

Corrección crítica: se reemplazó la referencia JavaScript indefinida `unidad` por `unidad: unit` al crear el movimiento de baja por caducidad. Esto elimina el error del primer clic y permite completar la baja local antes de sincronizar Firebase.

# ERP COMPRAS V4.0.0-C14.5.4.16 (base anterior)

Corrección puntual de baja por vencimiento en un solo clic y visualización correcta de versión.

- La baja se persiste primero en IndexedDB y cierra inmediatamente la ventana.
- Firebase/auditoría se procesan después y no bloquean la interfaz.
- Doble clic protegido.
- BUILD base anterior: C14.5.4.16.
- Service Worker actualizado.

# ERP COMPRAS V4.0.0-C14.5.4.15

Producción GitHub / Netlify.

## C14.5.4.15 — Baja definitiva persistente
- La baja por vencimiento crea un **guard de cierre local** antes de sincronizar.
- Al actualizar la página, el lote no puede recuperar el saldo anterior desde Firebase.
- Si una versión remota antigua intenta restaurarlo, se rechaza y se reenvía a Firebase el estado **Baja por vencimiento / saldo 0**.
- El lote desaparece del Inventario maestro operativo, pero continúa disponible en movimientos, historial y auditoría.
- Se conserva la fecha de ingreso corregida y el buscador continuo de C14.5.4.14.
- Service Worker con activación inmediata para evitar que Chrome mezcle C14.5.4.13/C14.5.4.14 con la nueva versión.


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


## C14.5.4.14 — Baja trazable por vencimiento
- Lote vencido con saldo: `VENCIDO · PENDIENTE DE BAJA`.
- Bloqueo automático para FEFO/consumo.
- Baja manual confirmada con saldo a cero, estado final, movimiento integrado y auditoría.
- No se elimina el registro histórico.


## C14.5.4.14
- Corrige persistencia de bajas por vencimiento y evita que Firebase restaure una versión antigua mientras exista un cambio local pendiente.
- Los lotes dados de baja dejan de aparecer en el inventario operativo, pero sus movimientos permanecen trazables.
- Buscador de inventario con escritura continua y búsqueda ampliada.
- Corrección trazable de fecha de ingreso; lote histórico 1236393 sugiere 2026-06-28.
