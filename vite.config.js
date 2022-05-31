import { fileURLToPath, URL } from 'url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default ({ mode }) => {
    // Load app-level env vars to node-level env vars.
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                'Bright': fileURLToPath(new URL('./src/bright', import.meta.url)),
                'Views': fileURLToPath(new URL('./src/views', import.meta.url)),
            },
        },
        server: {
            // host: true, // I believe Docker needs this to expose the localhost:3000 port, but I might be wrong. Try it out again.
            port: 3000,
            // watch: { // Docker needs this to pick up on HMR changes on the file system. But it might contribute to slowdown, so see if there's another way.
            //     usePolling: true,
            // },
        },
    });
};
