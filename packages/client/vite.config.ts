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
            ],
            outDir: 'dist/types',
        })

    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'PhoneMirrorClient',
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react-router-dom', '@phone-mirror/shared'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react-router-dom': 'ReactRouterDOM'
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
