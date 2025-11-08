import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ['src'],
            exclude: [
                'src/**/*.test.ts',
                'src/**/*.test.tsx',
                'src/**/*.stories.tsx',
                'src/pages/*',
                'src/App.css',
                'src/App.tsx',
                'src/index.css',
                'src/main.tsx',
                'index.html',
            ],
            outDir: 'dist/types',
            compilerOptions: {
                baseUrl: '.',
                paths: {
                    '../src/types/websocket.ts': ['./src/types/websocket.ts'],
                    "../src/components/Driver.tsx": ['./src/components/Driver.tsx']
                }
            },
        })

    ],
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
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'src/index.ts'),
                server: resolve(__dirname, 'server/server.ts'),
            },
            name: 'PhoneMirror',
            fileName: (format, entryName) => `${entryName}.${format}.js`,
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'ws', 'http', 'fs', 'path', 'url'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        },
        // Отключаем копирование public директории
        copyPublicDir: false,
    },
    // Явно указываем publicDir как false
    publicDir: false,
    define: {
        // Для корректной работы WebSocket в локальной сети
        global: 'globalThis',
    }
});
