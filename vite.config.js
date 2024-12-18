import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      '@': `${process.cwd()}/src`,
    },
  },
  publicDir: 'public',
  server: {
    host: "0.0.0.0",
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
