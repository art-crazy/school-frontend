import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Теперь TypeScript знает, что это за модуль
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Настраиваем алиас @ для папки src
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: "@use \"@/styles/globals.scss\";",
            },
        },
    },
    server: {
        host: '0.0.0.0',
        port: 3001
    }
});
