import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'automatic'
        })
    ],
    resolve: {
        alias: {
            '@phone-mirror/shared': resolve(__dirname, '../shared/src')
        }
    },
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
                    'react-router-dom': 'ReactRouterDOM',
                    '@phone-mirror/shared': 'PhoneMirrorShared'
                }
            }
        },
        copyPublicDir: false,
    },
    publicDir: false,
    define: {
        global: 'globalThis',
    }
});