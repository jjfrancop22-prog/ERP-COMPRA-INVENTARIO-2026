const ALLOWED_RECIPIENTS = new Set([
  'mariaguerrero@psi.com.ec',
  'jjfrancop22@psi.com.ec',
  'elisaponce@psi.com.ec'
]);
const ALLOWED_TYPES = new Set(['OC_FIRMA_1_PENDIENTE','OC_FIRMA_2_COMPLETA']);

exports.handler = async (event) => {
  const headers={'Content-Type':'application/json','Cache-Control':'no-store'};
  if(event.httpMethod!=='POST') return {statusCode:405,headers,body:JSON.stringify({error:'Método no permitido'})};
  const apiKey=process.env.RESEND_API_KEY;
  const from=process.env.EMAIL_FROM;
  const firebaseApiKey=process.env.FIREBASE_WEB_API_KEY;
  if(!apiKey||!from||!firebaseApiKey) return {statusCode:503,headers,body:JSON.stringify({error:'EMAIL_NOT_CONFIGURED: configure RESEND_API_KEY, EMAIL_FROM y FIREBASE_WEB_API_KEY en Netlify'})};
  try{
    const bearer=(event.headers.authorization||event.headers.Authorization||'').replace(/^Bearer\s+/i,'').trim();
    if(!bearer) return {statusCode:401,headers,body:JSON.stringify({error:'Sesión requerida'})};
    const verify=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(firebaseApiKey)}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken:bearer})});
    const verified=await verify.json();
    if(!verify.ok||!verified.users?.[0]?.email) return {statusCode:401,headers,body:JSON.stringify({error:'Sesión Firebase inválida'})};
    const body=JSON.parse(event.body||'{}');
    const to=String(body.to||'').trim().toLowerCase();
    if(!ALLOWED_RECIPIENTS.has(to)||!ALLOWED_TYPES.has(body.type)) return {statusCode:403,headers,body:JSON.stringify({error:'Destinatario o evento no autorizado'})};
    const code=String(body.orderCode||'OC').replace(/[<>]/g,'');
    const actor=String(body.actor||'Usuario ERP').replace(/[<>]/g,'');
    const msg=String(body.message||'').replace(/[<>]/g,'');
    const total=String(body.total||'').replace(/[<>]/g,'');
    const isPending=body.type==='OC_FIRMA_1_PENDIENTE';
    const subject=isPending?`PSI · ${code} pendiente de Firma 2/2`:`PSI · ${code} autorizada 2/2`;
    const html=`<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#172033"><h2>${isPending?'✍️ OC pendiente de autorización':'✅ OC autorizada'}</h2><p>${msg}</p><table style="border-collapse:collapse;width:100%"><tr><td style="padding:8px;border-bottom:1px solid #ddd"><b>Orden</b></td><td style="padding:8px;border-bottom:1px solid #ddd">${code}</td></tr><tr><td style="padding:8px;border-bottom:1px solid #ddd"><b>Etapa</b></td><td style="padding:8px;border-bottom:1px solid #ddd">Firma ${body.stage||''}</td></tr><tr><td style="padding:8px;border-bottom:1px solid #ddd"><b>Responsable</b></td><td style="padding:8px;border-bottom:1px solid #ddd">${actor}</td></tr><tr><td style="padding:8px;border-bottom:1px solid #ddd"><b>Resumen</b></td><td style="padding:8px;border-bottom:1px solid #ddd">${total}</td></tr></table><p style="margin-top:20px">Ingrese al ERP Compras PSI para revisar la orden y su trazabilidad.</p><p style="font-size:12px;color:#667085">Mensaje automático del ERP Compras PSI. No sustituye la firma digital registrada en el sistema.</p></div>`;
    const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{'Authorization':`Bearer ${apiKey}`,'Content-Type':'application/json','User-Agent':'ERP-Compras-PSI/1.0','Idempotency-Key':String(body.dedupeKey||body.notificationId||Date.now()).slice(0,256)},body:JSON.stringify({from,to:[to],subject,html})});
    const out=await r.json();
    if(!r.ok) return {statusCode:502,headers,body:JSON.stringify({error:out.message||out.name||'No se pudo enviar el correo'})};
    return {statusCode:200,headers,body:JSON.stringify({ok:true,id:out.id||out.data?.id||''})};
  }catch(e){return {statusCode:500,headers,body:JSON.stringify({error:e.message||'Error interno'})};}
};
