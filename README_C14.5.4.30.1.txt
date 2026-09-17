C14.5.4.30.1
- Centro de eventos IA global para todos los usuarios autenticados con acceso.
- Una acción genera un evento canónico en Firebase, no una copia por usuario.
- Lectura y archivo por usuario mediante readBy/archivedBy.
- Identifica actor, etapa, OC, fecha y detalle.
- Eventos: OC generada, firma 1/2, firma 2/2, descarga/impresión e ingreso a inventario.
- BOTS se refresca con cambios Firestore y usa datos canónicos sincronizados.
- Cache PWA incrementada para forzar actualización.
