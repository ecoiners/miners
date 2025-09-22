import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // biar bisa diakses di Replit/VM luar
  },
  build: {
    outDir: "dist", // folder hasil build
  }
})
