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
        // Consolidate /consulting → /services (Writer Site Refresh, 2026-04-10)
        '/consulting': '/services',
        // Index hygiene redirects for legacy public URLs
        '/contact': '/?modal=contact',
        '/downloads': '/resources',
        '/articles/best-practices-for-ai-agent-development': '/articles/ai-agent-harness',
        // Old article URLs -> current slugs
        '/articles/lessons-learned': '/articles/lessons-learned-2025',
        '/writing': '/',
    },
    integrations: [
        react(),
        tailwind({
            applyBaseStyles: false,
        }),
        sitemap({
            filter(page) {
                // Exclude redirect targets and internal pages from the sitemap
                const path = new URL(page).pathname;
                return ![
                    '/writing',
                    '/consulting',
                    '/guides/ai-adoption-playbook/thanks',
                ].includes(path) && !path.startsWith('/preview');
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
                    '/articles/ai-agent-content-pipeline-experiment': '2026-03-03',
                    '/articles/ai-agent-harness': '2026-05-06',
                    '/articles/ai-code-quality-bad-code-tax': '2026-05-12',
                    '/articles/3-automations-that-run-without-me': '2026-03-08',
                    '/articles/ai-agent-workflow-claude-code': '2026-02-27',
                    '/articles/ai-automation-roi-service-business': '2026-04-03',
                    '/articles/ai-code-review-best-practices-approaches-tools': '2026-02-27',
                    '/articles/automate-saas-signup-flow-weekend': '2026-02-25',
                    '/articles/automation-cost-small-business': '2026-03-26',
                    '/articles/claude-code-productivity-paradox': '2026-03-11',
                    '/articles/doe-framework-claude-skills': '2026-04-17',
                    '/articles/from-vibe-coding-to-agentic-engineering': '2026-02-15',
                    '/articles/how-to-know-if-your-business-is-ready-for-ai': '2026-04-10',
                    '/articles/intentional-ai-integration': '2026-04-01',
                    '/articles/kimi-k2-6-vs-glm-5-1-vs-claude-opus-4-7': '2026-04-23',
                    '/articles/llm-gateway-architecture': '2026-04-06',
                    '/articles/managing-engineering-teams-with-ai': '2026-04-30',
                    '/articles/no-code-automation-stack': '2026-03-09',
                    '/articles/service-business-automations': '2026-02-11',
                    '/articles/taste-is-a-moat': '2026-04-23',
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
