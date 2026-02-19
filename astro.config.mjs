import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://collinwilkins.com',
    base: '/',
    trailingSlash: 'never',
    build: {
        format: 'file',
    },
    redirects: {
        // Old uppercase URLs → new lowercase (from pre-rename filenames)
        '/articles/AI-Assisted-Coding-pt2': '/articles/ai-assisted-coding-pt2',
        '/articles/AI-Assisted-Coding': '/articles/ai-assisted-coding',
        '/articles/Architecture-as-Code': '/articles/architecture-as-code',
        '/articles/AWS-Lambda-Practices': '/articles/aws-lambda-practices',
        '/articles/BGP': '/articles/bgp',
        '/articles/Changing-landscape': '/articles/changing-landscape',
        '/articles/CLI-Agents': '/articles/cli-agents',
        '/articles/CRM-No-Code': '/articles/crm-no-code',
        '/articles/Design-Patterns': '/articles/design-patterns',
        '/articles/JPA': '/articles/jpa',
        '/articles/Lessons-Learned': '/articles/lessons-learned-2025',
        '/articles/lessons-learned': '/articles/lessons-learned-2025',
        '/articles/MCP': '/articles/mcp',
        '/articles/Microservice-Redesign': '/articles/microservice-redesign',
        '/articles/N8n': '/articles/n8n',
        '/articles/No-Code': '/articles/no-code',
        '/articles/Prompt-Engineering': '/articles/prompt-engineering',
        '/articles/SQL-Optimization': '/articles/sql-optimization',
        '/articles/Structured-Output': '/articles/structured-output',
        '/articles/System-Design-Best-Practices': '/articles/system-design-best-practices',
        '/articles/Terraform': '/articles/terraform',
        '/writing': '/',
    },
    integrations: [
        react(),
        tailwind({
            applyBaseStyles: false,
        }),
        sitemap({
            filter(page) {
                return !page.includes('/writing');
            },
            serialize(item) {
                // Use actual content dates for articles, fallback to build date for static pages
                const articleDates = {
                    '/articles/system-design-best-practices': '2026-01-11',
                    '/articles/ai-assisted-coding-pt2': '2026-01-10',
                    '/articles/ai-assisted-coding': '2025-10-19',
                    '/articles/architecture-as-code': '2025-10-23',
                    '/articles/aws-lambda-practices': '2025-12-09',
                    '/articles/bgp': '2026-01-08',
                    '/articles/cli-agents': '2026-01-14',
                    '/articles/crm-no-code': '2026-01-19',
                    '/articles/design-patterns': '2026-01-24',
                    '/articles/jpa': '2025-11-22',
                    '/articles/lessons-learned-2025': '2025-12-31',
                    '/articles/lessons-learned-2026': '2026-02-15',
                    '/articles/mcp': '2025-11-06',
                    '/articles/microservice-redesign': '2025-11-16',
                    '/articles/n8n': '2025-11-04',
                    '/articles/prompt-engineering': '2025-10-30',
                    '/articles/sql-optimization': '2025-12-04',
                    '/articles/structured-output': '2026-01-17',
                    '/articles/no-code': '2025-10-17',
                    '/articles/terraform': '2025-11-07',
                    '/articles/changing-landscape': '2026-01-27',
                    '/articles/ai-model-selection': '2026-02-03',
                    '/articles/enterprise-best-practices': '2026-02-01',
                    '/articles/context-engineering-ai-coding-tools': '2026-02-05',
                    '/articles/context-engineering': '2026-02-19',
                    '/articles/ai-coding-model-wars-2026': '2026-02-15',
                };
                const path = new URL(item.url).pathname;
                if (articleDates[path]) {
                    item.lastmod = new Date(articleDates[path]).toISOString();
                } else if (!item.lastmod) {
                    item.lastmod = new Date().toISOString();
                }
                return item;
            },
        }),
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
