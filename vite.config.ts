/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  test: {
    // Component tests need a DOM. happy-dom is lighter than jsdom.
    environment: 'happy-dom',
    globals: true,
  },
})
