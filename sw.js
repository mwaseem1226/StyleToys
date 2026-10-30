const V="st-v3",P=["./","./index.html","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(P.map(u=>new Request(u,{cache:"reload"})))))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
e.respondWith((async()=>{const c=await caches.open(V);const net=fetch(r,{cache:"no-cache"}).then(n=>{if(n.ok)c.put(r,n.clone());return n});
const cached=await c.match(r,{ignoreSearch:true});
try{return await Promise.race([net,new Promise((_,j)=>setTimeout(j,cached?3500:60000))])}catch(err){return cached||net}})())});
