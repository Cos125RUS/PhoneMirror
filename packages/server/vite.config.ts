import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            include: ['src'],
            outDir: 'dist/types'
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            external: ['ws', 'http', 'fs', 'path', 'url', '@phone-mirror/shared'],
        },
        copyPublicDir: false,
    },
    publicDir: false
});