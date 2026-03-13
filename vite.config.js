import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'sitemap.xml', '*.png', '*.svg'],
      manifest: {
        name: 'CWH Cart — Extraordinary Premium Shopping',
        short_name: 'CWH Cart',
        description: 'Discover premium products and luxury shopping experience with CWH Cart',
        theme_color: '#1a7a4a',
        background_color: '#030a06',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: '/favicon.png', sizes: '512x512', type: 'image/png' },
          { src: '/apple-icon.png', sizes: '180x180', type: 'image/png', purpose: 'any' },
          { src: '/icon-dark.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        categories: ['shopping', 'lifestyle'],
        shortcuts: [
          { name: 'Shop', short_name: 'Shop', description: 'Browse all products', url: '/shop' },
          { name: 'Deals', short_name: 'Deals', description: 'View flash deals', url: '/deals' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  server: { port: 5173, host: true },
})
