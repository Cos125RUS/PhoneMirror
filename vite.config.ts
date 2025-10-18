import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Разрешаем доступ со всех интерфейсов
    port: 5173, // Порт по умолчанию для Vite
    strictPort: true,
    hmr: {
      // Настройка HMR для работы в локальной сети
      host: 'localhost',
      port: 5173
    }
  },
  define: {
    // Для корректной работы WebSocket в локальной сети
    global: 'globalThis',
  }
})
