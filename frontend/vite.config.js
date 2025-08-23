import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl'
import path from 'path'

export default defineConfig({
  plugins: [tailwindcss(), react() , glsl()],
   resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
