ERP COMPRAS V4.0.0-C13.1 — FIREBASE REAL + COLECCIONES + SINCRONIZACIÓN

Base: C13.0 validada.
C0→C12.1 permanece funcionalmente congelado.
C13.1 agrega IndexedDB v11 con syncOutbox/syncMeta, estructura de colecciones Firestore, prueba real de conexión, cola local, ACK, reintento al reconectar y preparación controlada de la base local.
No ejecuta migración automática al abrir. La carga inicial requiere acción explícita “Preparar base local actual”.
Para sincronizar, configure Project ID, API Key, Auth Domain y App ID de su proyecto Firebase y asegure reglas/autenticación de Firestore apropiadas.
Prueba recomendada: http://localhost:8080/index.html?version=C131

C13.2 — MIGRACIÓN CONTROLADA + RECONCILIACIÓN
- Corrección crítica: se incorpora rawDel para completar ACK de syncOutbox.
- IndexedDB v12 con syncConflicts.
- Análisis colección por colección Local ↔ Firestore.
- Estados: iguales, solo local, solo Firebase, conflicto.
- Traer faltantes Firebase → Local usa rawPut y NO genera eco hacia outbox.
- Preparar faltantes Local → Firebase agrega únicamente documentos ausentes en nube.
- Los conflictos nunca se sobrescriben automáticamente.
- Diagnóstico JSON exportable.
- Ideal para inicializar una PC limpia desde Firebase de forma controlada.

C13.4 — FIREBASE FIRST + SINCRONIZACIÓN AUTOMÁTICA MULTI-PC
- IndexedDB v13.
- syncInbox para eventos recibidos desde Firestore.
- syncTombstones para eliminaciones persistentes.
- Altas/modificaciones continúan usando outbox/ACK automático.
- onSnapshot escucha las 13 colecciones en tiempo real.
- Cambios recibidos usan rawPut/rawDel para evitar eco infinito.
- Eliminaciones usan tombstone Firestore (_deleted=true), no borrado duro.
- Reconexión automática al recuperar Internet.
- Loop automático de control cada 5 segundos.
- ID único por dispositivo.
- Panel Firebase First con entradas, salidas, eliminaciones, errores y eventos.
- Se conserva C13.2 Reconciliación como herramienta diagnóstica.

C13.5 — MATRIZ DE ROLES OPERATIVA
- Administrador: control total, incluido Administración ERP.
- Calidad: lectura de todo el ERP operativo excepto Administración; escritura Proveedores→Inventario; módulos posteriores en consulta; exportaciones permitidas.
- Supervisor: lectura del ERP operativo; escritura únicamente en Órdenes de Compra para firma/autorización; exportaciones permitidas.
- Consulta: lectura completa del ERP operativo; sin altas/ediciones/eliminaciones/movimientos; exportaciones permitidas.
- Compras y Finanzas conservan la matriz C13.4.
- Navegación Administración oculta a roles no administradores.
- put/del valida permisos de escritura por almacén cuando existe sesión autenticada.
- UI deshabilita acciones de modificación en páginas de solo lectura y conserva Ver/Excel/CSV/Descargar/Exportar.
- C13.3 Firebase First Multi-PC permanece sin cambios estructurales.

C13.6.1 — GESTIÓN CENTRALIZADA DE USUARIOS
- Firebase Authentication conserva correo/contraseña e identidad.
- Firestore colección users conserva UID, nombre, correo, rol, estado y trazabilidad.
- Administración ERP permite al Administrador asignar/editar rol y activar/bloquear perfiles.
- Primer arranque: una cuenta ya creada en Firebase Authentication puede vincularse una sola vez como Administrador inicial.
- Un usuario autenticado sin perfil queda SIN PERFIL y no entra al ERP operativo.
- Un perfil BLOQUEADO queda sin acceso operativo.
- No se elimina historial al bloquear.
- Matriz C13.5 se conserva.
- C13.3 Firebase First Multi-PC se conserva.
NOTA: La creación de credenciales (contraseña) sigue realizándose en Firebase Authentication; el ERP no guarda contraseñas.

C13.6.1: corrige el bloqueo visual del botón de bootstrap. Solo permite vincular el Administrador inicial si no existe otro Administrador activo.

C13.6.2 — USER FORM STABILITY + DIRECT AUTH CREATION
- Corrige refresco continuo de Usuarios y Seguridad que hacía perder el foco de inputs/selects.
- Administrador crea usuario directamente: nombre, correo, contraseña temporal, rol y estado.
- Se usa una instancia secundaria de Firebase Auth para crear la cuenta sin cerrar la sesión del Administrador.
- UID se obtiene automáticamente y se guarda el perfil en Firestore/users.
- Mantiene asignación manual por UID como respaldo.
- Añade envío de correo para restablecer contraseña.

C13.6.3 — CIERRE DE PERSISTENCIA DE SESIÓN
- Firebase Authentication usa explícitamente browserLocalPersistence.
- F5 / recarga / cierre y reapertura del navegador conserva la sesión autenticada.
- El usuario solo vuelve a ingresar credenciales después de Cerrar sesión o si Firebase invalida la sesión.
- La configuración Firebase sigue persistida localmente por dispositivo.
- Estado inicial muestra RESTAURANDO SESIÓN para evitar falso SIN SESIÓN durante el arranque.
- Cerrar sesión elimina la sesión de Firebase del dispositivo.
- C13.3 Firebase First Multi-PC, C13.5 roles y C13.6.2 gestión directa de usuarios se conservan.

C13.6.3.1 — AUTH RESTORE FIX
- Corrige CARGANDO SESIÓN permanente.
- initAuthState se ejecuta en el arranque real del ERP.
- Listener onAuthStateChanged se registra una sola vez.
- La sesión persistente se recupera al recargar/reabrir.
- Login explícito inicia/recupera listener si aún no existe.
- Guardar configuración Firebase reinicia Authentication de forma controlada.

C13.7 — SEGURIDAD EFECTIVA POR ROLES
- Sin sesión: solo Administración/Acceso.
- SIN PERFIL o BLOQUEADO: sin acceso a módulos operativos.
- Navegación filtrada por rol.
- Acciones críticas validan requireWrite/requirePermission.
- put/del mantienen validación por store.
- Intentos denegados generan auditoría local.
- Live Sync Firestore inicia solamente después de Authentication válida.
- Listeners users/audit solo se abren para Administrador.
- firestore.rules incluido para aplicar seguridad equivalente del lado servidor.
IMPORTANTE: las reglas incluidas deben publicarse manualmente en Firebase Console > Firestore Database > Rules para que la seguridad sea también efectiva contra llamadas directas a Firestore.

C13.7.1 — LOGIN GATE
- PC/navegador sin sesión: solo muestra correo + contraseña.
- Dashboard y menú operativo no se liberan hasta Authentication + perfil activo.
- Sesión persistente válida entra automáticamente.
- Cerrar sesión vuelve al Login Gate.
- Usuarios BLOQUEADOS o SIN PERFIL no entran.

C13.7.2 — CAMBIO DE USUARIO
- Con sesión autenticada aparece un control visible en la esquina inferior derecha.
- Muestra correo y rol efectivo.
- Botón “Cambiar usuario / Cerrar sesión”.
- Al pulsarlo cierra Firebase Authentication, detiene Live Sync y vuelve al Login Gate.
- Limpia correo/contraseña para permitir ingreso de otra cuenta.

C13.8 — AUDITORÍA ERP CENTRALIZADA EN FIREBASE
- Eventos con UID, correo, nombre, rol, dispositivo, fecha/hora, módulo, acción, registro y versión.
- Auditoría replica por outbox/ACK a Firestore/audit.
- Store audit es inmutable desde el ERP.
- Mutaciones generan trazabilidad automática CREAR/ACTUALIZAR/ELIMINAR.
- Diferencias resumidas Antes → Después.
- Vista con filtros por usuario, módulo, acción y fechas.
- Exportación Excel.

C13.9 — RESPALDO Y RESTAURACIÓN INTEGRAL
- JSON integral ERP_COMPRAS_BACKUP_V1.
- Incluye operación, users, auditoría, conteos, versión, fecha y dispositivo.
- No incluye contraseñas ni API keys.
- Analiza/valida antes de restaurar.
- Advierte versión/proyecto Firebase distinto.
- Confirmación RESTAURAR.
- Restaura primero en IndexedDB local.
- Auditoría existente no se borra; se fusiona por ID.
- Manifiesto CSV de conteos.

C13.10 — CONTROL DE VERSIÓN + ACTUALIZACIÓN SEGURA PWA
- Service Worker registra y detecta nueva versión.
- Nueva PWA queda en waiting; no se activa silenciosamente.
- Banner de actualización disponible.
- Solo Administrador puede aplicar actualización.
- Bloquea aplicación si outbox Firebase tiene cambios pendientes.
- Recomienda respaldo integral previo.
- SKIP_WAITING solo se ejecuta por decisión del Administrador.
- controllerchange recarga una sola vez.
- Búsqueda automática de actualización al iniciar y cada 30 minutos.
- Panel de versión muestra SW, outbox, última comprobación y estado.

C14.0 — VALIDACIÓN INTEGRAL DE PRODUCCIÓN
Checklist de 24 pruebas / 8 áreas. Firebase Multi-PC, 4 roles, flujo integral, auditoría, respaldo y PWA. Cierre solo con 24/24 OK. Exporta Excel y registra aprobación en Auditoría.

C14.0-R2 — CORRECCIÓN PUNTUAL FIREBASE SDK
- ÚNICO cambio funcional: Firebase App, Authentication y Firestore usan SDK 10.12.5.
- Corrige instancia Firestore separada/no autenticada.
- No modifica módulos, datos, roles, reglas, UI operativa ni flujos.
- No incluye ningún cambio C15.

C14.1 — PRODUCCIÓN ESTABLE GITHUB + NETLIFY
- Base funcional: C14.0-R2 recuperada y validada.
- Firebase App/Auth/Firestore mantienen SDK 10.12.5 unificado.
- NO incluye Firebase Hosting.
- NO cambia Firestore Rules.
- NO cambia usuarios, roles, módulos ni flujo operativo.
- Incluye bootstrap de configuración Firebase para dominios nuevos.
- Repositorio GitHub sirve como fuente del código.
- Netlify publica la PWA.

C14.5.2 — COTIZACIONES: HERENCIA DE PROVEEDOR + PRECIO VIGENTE
- Proveedor heredado desde la Solicitud cuando existe uno solo.
- Si una Solicitud contiene varios proveedores, el selector se restringe a ellos.
- Un único asesor se selecciona automáticamente; con varios se exige selección.
- Cada producto busca la opción comercial vigente del proveedor seleccionado.
- El precio vigente se propone automáticamente, pero el precio ofertado sigue editable.
- Sin cambios en Firebase, roles, inventario, OC, facturas ni demás módulos.

C14.5.3 — EDICIÓN CONTROLADA + PRECIOS HISTÓRICOS
- Solicitudes no Borrador: modificación mediante contraseña CALIDAD + motivo obligatorio.
- Sin documentos posteriores: edición completa; vuelve a Pendiente de aprobación.
- Con Cotización/OC/Recepción: se protege estructura e ítems; solo observaciones/comentarios.
- Auditoría conserva snapshot antes/después, motivo, usuario y fecha.
- Cotización seleccionada guarda snapshot del precio adjudicado.
- Al emitir OC el precio de cada ítem queda congelado históricamente.
- Cambios futuros del Maestro de Productos aplican solo a operaciones nuevas.
