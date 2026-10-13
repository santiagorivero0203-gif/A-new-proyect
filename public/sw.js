// ==============================================================================
// SERVICE WORKER - CENTRO DE PRODUCTIVIDAD ESTUDIANTIL (PWA & OFFLINE CACHE)
// ==============================================================================
// Proporciona resiliencia offline real en campus universitarios y colegios:
// 1. App Shell precacheado (index, manifest, iconos).
// 2. Caché dinámico 'Stale-While-Revalidate' para assets estáticos y fuentes.
// 3. Estrategia 'Network-First con Fallback a Caché' para guías y datos de estudio,
//    permitiendo leer guías previamente abiertas sin acceso a internet.
// 4. Recepción de Notificaciones Push nativas.
// ==============================================================================

const CACHE_VERSION = 'cpe-v2-offline-shield';
const STATIC_CACHE = `cpe-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `cpe-dynamic-${CACHE_VERSION}`;

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/icons.svg',
  '/manifest.json',
];

// Instalación y precarga del App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activación y purga de cachés de versiones antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            console.log('[SW] Purgando caché obsoleta:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptor de peticiones de red (Resiliencia Offline Real)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar peticiones a otros dominios que no sean de assets o API
  if (request.method !== 'GET') {
    return;
  }

  // Ignorar peticiones de autenticación activa para evitar desajustes de sesión
  if (url.pathname.includes('/auth/v1/')) {
    return;
  }

  // Estrategia 1: Network-First con Fallback a Caché para Documentos y Navegación
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          return caches.match('/index.html');
        })
    );
    return;
  }

  // Estrategia 2: Cache-First / Stale-While-Revalidate para Assets estáticos y Guías
  const isStaticAsset =
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.json') ||
    url.pathname.endsWith('.woff2');

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
            }
            return networkResponse;
          })
          .catch(() => {
            // Error de red silenciado: se usa el contenido cacheado
          });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Estrategia por defecto para el resto de peticiones GET
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
        }
        return networkResponse;
      })
      .catch(() => caches.match(request))
  );
});

// Manejo de Notificaciones Web Push
self.addEventListener('push', (event) => {
  let data = {
    title: 'Centro de Productividad Estudiantil',
    body: 'Tienes un nuevo recordatorio de estudio pendiente.',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/favicon.svg',
    badge: data.badge || '/favicon.svg',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Al hacer clic en una notificación nativa
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
