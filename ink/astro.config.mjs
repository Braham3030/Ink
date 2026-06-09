// @ts-check
import { defineConfig } from 'astro/config';
import astroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  // For prefetching data and optimizing performance
  // https://docs.astro.build/en/guides/prefetch/
  devToolbar: {
    enabled: false
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  // Integrations
  integrations: [
    astroPWA({
      registerType: 'autoUpdate',
      workbox: {
        // With globPatterns, the given file types will be cached by the service worker in the browser.
        globPatterns: ['**/*.{js,css,html,jpg,svg,astro,webp}'],
        maximumFileSizeToCacheInBytes: 20000000, // 10 MB
      },
      manifest: {
        name: 'Ink - Disability Awareness Game',
        short_name: 'Ink',
        description: 'A game to raise awareness about disabilities.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
  });