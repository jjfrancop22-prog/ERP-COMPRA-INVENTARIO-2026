# ERP COMPRAS V4.0.0-C14.5.4.22 — BÚSQUEDA Y ORDENAMIENTO UNIVERSAL DE OC


## Mejora C14.5.4.22

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
