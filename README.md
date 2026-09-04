# ERP COMPRAS V4.0.0-C14.5.4.26 — CORRECCIÓN TRAZABLE DE PROVEEDOR EN OC



## Mejora C14.5.4.26

- Permite corregir el proveedor de una OC **Emitida** únicamente si todavía no existe recepción.
- Requiere contraseña **CALIDAD** y motivo obligatorio.
- Mantiene el mismo número de OC y crea una **revisión** (Rev. 1, Rev. 2...).
- Conserva proveedor/cotización originales y firmas anteriores dentro del historial de correcciones.
- Si había firmas vigentes, se invalidan para el documento actualizado y se exige firmar nuevamente.
- El PDF muestra la revisión vigente y el motivo de la última corrección.
- También permite corregir datos dependientes del proveedor: RUC, contacto, correo, condición de pago, plazo y referencia visible de cotización.
- La función queda bloqueada desde la primera recepción para no romper trazabilidad de inventario.

## Mejora C14.5.4.25

- El Reporte gerencial de Inventario incorpora la columna **Área solicitante / uso**, enlazada con el campo **Área de uso / destino** del Producto maestro.
- La columna se incluye en filtros y formato del XLSX sin modificar cálculos, saldos, costos, lotes ni movimientos.

## Mejora C14.5.4.24

- Nueva barra de búsqueda en **Órdenes de Compra**: busca por N.º OC, proveedor, cotización, solicitud, área, estado y también por productos/marca/catálogo incluidos en la OC.
- Filtro por estado y selector de orden: reciente, N.º OC, fecha, proveedor y total.
- Los filtros son **solo de consulta** y quedan habilitados para todos los usuarios, independientemente del cargo o rol.
- Botón **Limpiar filtros** y contador de resultados visibles.
- No se modifican permisos de creación, edición, firma, recepción, eliminación ni restauración.

## Cambios principales

1. **Corrección de movimientos para líquidos y sólidos pesables**
   - El botón `✏️ Corregir` ahora aparece también en consumos por medición, no solo en inventario contable.
   - Para líquidos/sólidos se corrige el **peso actual digitado** con contraseña de Calidad.
   - Recalcula consumo, saldo del frasco, volumen (si aplica densidad), costo y trazabilidad.
   - Para proteger la cadena física, solo se permite corregir la última medición del mismo frasco.
   - En líquidos pesables el historial muestra el consumo en **mL** como unidad principal, no la masa en g.

2. **Alertas IA con acciones claras**
   - Alertas de movimiento/costo incorporan `✏️ Corregir` y abren directamente la corrección correspondiente.
   - Alertas de producto incorporan `✏️ Revisar producto`.
   - Todas las alertas IA incluyen `✕ Descartar alerta`.
   - Botón `↶ Restaurar descartadas` en el panel IA.

3. **IA transversal del ERP**
   - Inventario: costos atípicos, consumos inusuales, tendencia mensual y riesgo de agotamiento.
   - Productos: códigos duplicados, conversiones incompletas, ausencia de precio y políticas de stock incoherentes.
   - Compras: solicitudes aprobadas sin cotización durante varios días.
   - Recepción: ítems conformes que siguen pendientes de ingreso a inventario.
   - Cuentas por Pagar: facturas con importe muy superior al patrón histórico del proveedor.
   - Se mantienen las alertas operativas existentes de CxP, OC/Recepción, vencimientos, servicios técnicos y evaluación de proveedores.

## Seguridad y trazabilidad

La IA sigue siendo local: no envía información fuera del ERP y no modifica datos automáticamente. Las correcciones de inventario requieren contraseña de Calidad y dejan evidencia antes/después en auditoría.
