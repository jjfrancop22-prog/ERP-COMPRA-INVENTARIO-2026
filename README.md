# ERP Compras Enterprise V4 — C14.5.4.3

Build limpio de producción para GitHub/Netlify.

## Cambio puntual
- Corrección controlada de cantidades en cotizaciones ya registradas o seleccionadas.
- Requiere contraseña de Calidad `CALIDAD` y motivo obligatorio.
- Conserva el precio unitario congelado.
- No permite reducir la cantidad por debajo de lo ya ordenado o dado de baja.
- La generación de OC parcial toma automáticamente la cantidad corregida y recalcula el pendiente.
- Auditoría de cantidad anterior → nueva cantidad.
