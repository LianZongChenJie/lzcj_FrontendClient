import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// 部署根路径（base）：
// - 默认 '/'（部署在域名根路径）
// - 子路径部署时在 .env.production 配置 VITE_BASE_URL=/lianzong/（必须以 / 开头和结尾）
// 不配置时打包产物引用 /assets/...，子路径部署会全部 404
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE')
  return {
    base: env.VITE_BASE_URL || '/',
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
  }
})
