import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    transformer: 'lightningcss',
  },
  build: {
    target: 'es2022',
    sourcemap: 'hidden',
    cssMinify: 'lightningcss',
    reportCompressedSize: false,
    modulePreload: { polyfill: false },
  },
})
