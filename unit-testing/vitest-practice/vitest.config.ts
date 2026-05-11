import {defineConfig} from 'vitest/config';

export default defineConfig({
    test: {
        globals: true, // describe, it, expect
        alias: {
            '@/': new URL('./src/', import.meta.url).pathname
        }
    }
});