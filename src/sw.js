(function () {

  importScripts("https://cdn.rawgit.com/mozilla/localForage/master/dist/localforage.js")
  ;

  const FILES_TO_CACHE = [
    '.',
    'inline.bundle.js',
    'polyfills.bundle.js',
    'styles.bundle.js',
    'vendor.bundle.js',
    'main.bundle.js',
    'manifest.json'
  ];

  const FILES_TO_INDEXEDDB = [
    'sessions.json',
    'speakers.json',
    'schedule.json'
  ];

  const OTHER_TO_CACHE= [
    '.jpg',
    '.png'
  ];

  const STATIC_CACHE_NAME = 'devfestcache';

  self.addEventListener('install', event => {
    console.log('Installation du Service Worker...');
    console.log('Mise en cache des ressources');
    event.waitUntil(
      Promise.all([
        caches.open(STATIC_CACHE_NAME)
          .then(cache => {
            return cache.addAll(FILES_TO_CACHE);
          })
      ])
    );
  });



  self.addEventListener('activate', event => {
    console.log('Activating new service worker...');
//     const cacheWhitelist = [STATIC_CACHE_NAME];
//     event.waitUntil(
//       caches.keys().then(cacheNames => {
//         return Promise.all(
//           cacheNames.map(cacheName => {
//             if (cacheWhitelist.indexOf(cacheName) < 0) {
//       return caches.delete(cacheName);
//     }
//   })
//   );
// })
//   );
  });

  self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
      caches.match(event.request).then(response => {
        const lastUrlPart = event.request.url.split('/')[event.request.url.split('/').length-1];

        if (response) {
          console.log(event.request.url, 'servi depuis le cache');
          return response;
        } else if(FILES_TO_INDEXEDDB.includes(lastUrlPart)){

          localforage.getItem(lastUrlPart).then(function(value) {
            // This code runs once the value has been loaded
            // from the offline store.
            console.log('Servi depuis le localforage ' + event.request.url, lastUrlPart, value);
            return value;
          }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
          });
        }


        return fetch(event.request).then(function(resp) {
          console.log(event.request.url, lastUrlPart, 'servi depuis le réseau');
          if (FILES_TO_INDEXEDDB.includes(lastUrlPart)) {
            var responseClone = resp.clone();
            responseClone.json().then(data => {
              localforage.setItem(lastUrlPart, data);
            });
          }
          else{
            OTHER_TO_CACHE.map(extensionToCache => {
              if(lastUrlPart.includes(extensionToCache)){
                caches.open(STATIC_CACHE_NAME)
                  .then(cache => {
                    return cache.addAll(FILES_TO_CACHE);
                  });
              })
            })
            console.log('OTHER_TO_CACHE ', event.request.url);
          }
          return resp;
        });
      })
    )})


  self.addEventListener('message', event => {
    console.log('Refresh all data from the service worker',event.data);
    for(let urlToFetch of event.data.message){
      const lastUrlPart = urlToFetch.split('/')[urlToFetch.split('/').length-1];
      console.log(urlToFetch,lastUrlPart);
      fetch(urlToFetch).then(function(resp) {
        console.log(urlToFetch, 'servi depuis le réseau');
        var responseClone = resp.clone();
        responseClone.json().then(data => {
          console.log('SET ITEM ', lastUrlPart, data)
          localforage.setItem(lastUrlPart, data);
        });
      });
    }
  });

  self.skipWaiting();

})();
