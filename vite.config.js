import { resolve } from 'node:path'
import { defineConfig } from 'vite'
// import path from 'path';




export default defineConfig({
  build: {
    outDir:'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        
      },
    },
  },
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src')
  //   }
  // }
})