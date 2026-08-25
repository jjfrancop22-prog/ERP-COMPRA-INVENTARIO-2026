ERP COMPRAS V4.0.0-C14.6 — BANDEJA DE APROBACIÓN DE SOLICITUDES

Cambio puntual sobre C14.5:
- Se conserva la lógica de las Solicitudes y sus estados existentes.
- Se agrega en la parte superior un menú visual de 3 etapas:
  1. Preparación — Borrador.
  2. Por aprobar — Pendiente de aprobación.
  3. Aprobadas — listas para Cotizaciones C4.
- Borrador + Pendiente se consolidan además como “Requieren atención”.
- Cada etapa es clicable y filtra el consolidado.
- Los borradores muestran acción “Continuar”.
- Los pendientes muestran “Revisar / Aprobar” y abren directamente la etapa de aprobación.
- Se conserva C14.5 contacto específico en Cotizaciones.
- Se conserva C14.3 Firma Digital PKCS#12 Profesional.

Objetivo: que ninguna solicitud generada pero todavía no aprobada quede escondida dentro del consolidado general.
