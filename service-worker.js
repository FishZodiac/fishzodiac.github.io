"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["./index.html","6edd82d99b0494792e706f9d294b6283"],["./static/css/app.5efbe8c21eb73cf438863886b12ad395.css","32aea3c30dfca66a14ac64b797fa8180"],["./static/css/app.5efbe8c21eb73cf438863886b12ad395.css.map","3dc52d8208fd9201b5e27ba1cad66926"],["./static/img/0.png","3fde99592e66bb0030802f7f77bbd57e"],["./static/img/banner.7747076.jpg","77470761d80e84b5df879dd55fb0415f"],["./static/img/blank.svg","84764a122ad9e99554aa7e67be2b9ce4"],["./static/img/list.svg","02e2709285c785be2ef3c39c6a275d55"],["./static/img/question.0b8d9bd.jpeg","0b8d9bd77adbbae88d4a5d87fb64f123"],["./static/js/app.7c208a885dd310b76cf0.js","8568aff4bc8164f649c7b5406e822ae1"],["./static/js/app.7c208a885dd310b76cf0.js.map","08d492f5d80e1e8b8acd018cfb10c984"],["./static/js/manifest.55ee92bc3b07196dff05.js","ddca53939a55559485479a66c3521ed2"],["./static/js/manifest.55ee92bc3b07196dff05.js.map","e06927b1f88b9daad43e5392d854ea51"],["./static/js/sw-demo-cache.js","1378266fc771f56e609c16c039c1dd70"],["./static/js/vendor.85be432874f4fe999279.js","f5f3fdaf450432c12516115a94857906"],["./static/js/vendor.85be432874f4fe999279.js.map","9940d1a5b5eecf2d98aa64b680c1f5b3"]],cacheName="sw-precache-v3-hasicat-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),a="index.html";(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),t=urlsToCacheKeys.has(n));!t&&"navigate"===e.request.mode&&isPathWhitelisted([],e.request.url)&&(n=new URL("./",self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});