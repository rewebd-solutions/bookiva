// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login/index.html'),
        reset: resolve(__dirname, 'reset/index.html'),
        venues: resolve(__dirname, 'venues/index.html')
      },
    },
  },
})
