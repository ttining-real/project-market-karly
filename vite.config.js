import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'src/pages/login/login.html'),
        register: resolve(__dirname, 'src/pages/register/register.html'),
        product: resolve(__dirname, 'src/pages/product/product.html'),
        productDetail: resolve(
          __dirname,
          'src/pages/productDetail/details.html'
        ),
        cart: resolve(__dirname, 'src/pages/cart/cart.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
