// C14.5.4.34.0 · Puente seguro ERP -> proveedor/automatización de WhatsApp.
// Configure en Netlify: ERP_WHATSAPP_WEBHOOK_URL y opcional ERP_WHATSAPP_WEBHOOK_SECRET.
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: JSON.stringify({error:'METHOD_NOT_ALLOWED'}) };
  const url = process.env.ERP_WHATSAPP_WEBHOOK_URL;
  if (!url) return { statusCode: 503, body: JSON.stringify({error:'WHATSAPP_NOT_CONFIGURED'}) };
  try {
    const payload = JSON.parse(event.body || '{}');
    const headers = {'Content-Type':'application/json'};
    if (process.env.ERP_WHATSAPP_WEBHOOK_SECRET) headers['X-ERP-Webhook-Secret']=process.env.ERP_WHATSAPP_WEBHOOK_SECRET;
    const r = await fetch(url,{method:'POST',headers,body:JSON.stringify({source:'LAB-PSI ERP Compras',event:'erp_notification',notification:payload})});
    const text = await r.text();
    if(!r.ok) return {statusCode:502,body:JSON.stringify({error:'WHATSAPP_PROVIDER_ERROR',detail:text.slice(0,300)})};
    return {statusCode:200,body:JSON.stringify({status:'ENVIADO',sentAt:new Date().toISOString()})};
  } catch(e) { return {statusCode:500,body:JSON.stringify({error:String(e.message||e)})}; }
};
