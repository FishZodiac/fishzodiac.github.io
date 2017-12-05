"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["./index.html","ee55b47ca0a5e9899aaaa7a37cf749be"],["./static/css/app.f97aa28bbfdaeffd9452b1ebf5adcd9c.css","7d09b3e26564f69192d81faceb765eac"],["./static/css/app.f97aa28bbfdaeffd9452b1ebf5adcd9c.css.map","19e87b507a8695fc0ace49a135a6f95d"],["./static/img/0.png","3fde99592e66bb0030802f7f77bbd57e"],["./static/img/banner.7747076.jpg","77470761d80e84b5df879dd55fb0415f"],["./static/img/blank.svg","84764a122ad9e99554aa7e67be2b9ce4"],["./static/js/app.597f674d4b97d9c44cba.js","f90762135d40fbbf5e5db0dd7af1b0d3"],["./static/js/app.597f674d4b97d9c44cba.js.map","a10a629164437fb9b3da130635b6fbdc"],["./static/js/manifest.45fe879a5a2b55b42025.js","c1b1736fbc6e84734234a53b4833d870"],["./static/js/manifest.45fe879a5a2b55b42025.js.map","defca28a2838f262ec0024a33d20827b"],["./static/js/sw-demo-cache.js","1378266fc771f56e609c16c039c1dd70"],["./static/js/vendor.e1811d1b95caa24acd5e.js","e5888496724a81299c6c0bd8b09d27a9"],["./static/js/vendor.e1811d1b95caa24acd5e.js.map","12729ea2206cbea3181f09a00d14acb1"]],cacheName="sw-precache-v3-hasicat-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted([],e.request.url)&&(a=new URL("./",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});