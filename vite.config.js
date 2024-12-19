import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      },
      includeAssets: ['icons/256x256.png'],
      manifest: {
        name: '多人账单',
        short_name: '多人账单',
        theme_color: '#4DBA87',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icons/256x256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': `${process.cwd()}/src`,
    },
  },
  publicDir: 'public',
  server: {
    host: "0.0.0.0",
    proxy: {
      '/gpt': {
        target: 'http://localhost:4200',
        changeOrigin: true,
      },
    },
  },
})
