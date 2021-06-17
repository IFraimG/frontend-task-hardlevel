import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa"
import path from "path"

export default defineConfig({
  plugins: [vue(), 
    // VitePWA({
    // manifest: {
    //   "name": "MyOcean ToDo list",
    //   "short_name": "ToDo list",
    //   "start_url": ".",
    //   "display": "standalone",
    //   "background_color": "#fff",
    //   "description": "Сайт для планирования заданий"
    // },
    // workbox: {}
    // })
  ],
  server: {
    port: 3000
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") }
    ]
  }
})
