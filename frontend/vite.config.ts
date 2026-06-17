import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': { target: 'http://localhost:8080', changeOrigin: true },
      '/cursos': { target: 'http://localhost:8080', changeOrigin: true },
      '/financeiro': { target: 'http://localhost:8080', changeOrigin: true },
      '/saude': { target: 'http://localhost:8080', changeOrigin: true },
      '/ia': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
})
