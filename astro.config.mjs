import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://collinwilkins.com',
    base: '/',
    integrations: [
        react(),
        tailwind({
            applyBaseStyles: false,
        }),
        sitemap(),
    ],
    markdown: {
        shikiConfig: {
            theme: 'dracula',
            wrap: true,
        },
    },
    vite: {
        assetsInclude: ['**/*.md', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
        define: {
            'global': 'globalThis',
        },
        resolve: {
            alias: {
                buffer: 'buffer'
            }
        }
    }
});
