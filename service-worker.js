/* ERP Compras C14.5.4.41: activación controlada y caché acotada */
const CACHE='erp-compras-v4-c14-5-4-41-20261111';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon-192.svg','./icons/icon-512.svg'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
 // No skipWaiting automático: avisar al usuario antes de cambiar la versión.
});
self.addEventListener('activate',event=>{
 event.waitUntil(Promise.all([
  caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('erp-compras-v4-')&&key!==CACHE).map(key=>caches.delete(key)))),
  self.clients.claim()
 ]));
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 if(req.mode==='navigate'){
  event.respondWith(fetch(req,{cache:'no-store'}).then(response=>{
   if(response.ok)caches.open(CACHE).then(cache=>cache.put('./index.html',response.clone())).catch(()=>{});
   return response;
  }).catch(()=>caches.match('./index.html')));
  return;
 }
 if(req.url.includes('/.netlify/')||req.url.includes('release.json')||req.url.includes('service-worker.js'))return;
 event.respondWith(fetch(req).catch(()=>caches.match(req)));
});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(self.clients.openWindow(event.notification.data?.url||'./'))});
