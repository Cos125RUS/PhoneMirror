import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/server.ts'),
            fileName: (format) => `server.${format}.js`,
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            external: ['ws', 'http', 'fs', 'path', 'url', '@phone-mirror/shared'],
            output: {
                exports: 'named'
            }
        },
        copyPublicDir: false,
        minify: false
    },
    publicDir: false
});