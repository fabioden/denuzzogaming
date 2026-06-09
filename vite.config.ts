import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5174,
    // DEV: la chat diabete chiama /api/chat → motore locale (t1-insieme) su :8787.
    // In PRODUZIONE diventerà una Vercel Serverless Function (Fase 3).
    proxy: { '/api': 'http://localhost:8787' },
  },
})
