import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router', 'pinia']
        }
      }
    },
    chunkSizeWarningLimit: 500
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      // CMS 接口代理：同源 /cms 请求转发到芋道后端，避免开发环境跨域
      '/cms': {
        target: 'http://localhost:48080',
        changeOrigin: true
      }
    }
  }
})
