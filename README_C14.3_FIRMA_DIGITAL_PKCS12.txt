ERP COMPRAS V4.0.0-C14.3 — FIRMA DIGITAL PKCS#12 PROFESIONAL

Cambios puntuales sobre C14.2:
- Solicita contraseña del certificado .p12/.pfx.
- Valida que la contraseña abra realmente el PKCS#12.
- Comprueba certificado X.509, clave privada y vigencia.
- Muestra titular, emisor y fechas de vigencia.
- Firma criptográficamente la representación canónica de la OC con RSA-SHA256.
- Guarda firma, certificado público y huellas SHA-256 para verificación posterior.
- La contraseña, el archivo PKCS#12 y la clave privada NO se almacenan.
- Mantiene secuencia Firma 1 Aprobado por -> Firma 2 Autorizado por.
- Compatible con registros históricos C14.2 mediante verificación de huella.

Nota técnica: el motor PKCS#12 usa node-forge 1.3.1 cargado desde jsDelivr. Para la primera carga del módulo de firma se requiere conexión a Internet.
