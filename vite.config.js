
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            assets: path.resolve(__dirname, 'src/assets'),
        },
    },
    server: {
        open: true
    },
    css: {
        preprocessorOptions: {
            scss: {
                //전역에 공통 scss 사용 모듈 설정
                // additionalData: `@import '@/assets/css/common/variables.scss';
            }
        }
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        rollupOptions: {
            chunkSizeWarningLimit: 1000
        },
    }
})