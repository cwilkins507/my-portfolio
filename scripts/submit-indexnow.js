#!/usr/bin/env node
/**
 * IndexNow bulk URL submission script for collinwilkins.com
 * Bing IndexNow API: https://www.bing.com/indexnow
 *
 * Usage: node scripts/submit-indexnow.js
 */

import https from 'https';

const HOST = 'collinwilkins.com';
const KEY = '9338d1e5212848588f81fa130e12b24b';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URLS = [
    // Static pages
    `https://${HOST}/`,
    `https://${HOST}/about`,
    `https://${HOST}/articles`,
    `https://${HOST}/services`,
    `https://${HOST}/agents`,
    `https://${HOST}/case-studies`,
    `https://${HOST}/newsletter`,
    `https://${HOST}/quiz`,
    `https://${HOST}/resources`,
    `https://${HOST}/guides/agentic-workflows`,
    `https://${HOST}/resources/ai-prompt-toolkit`,

    // Articles
    `https://${HOST}/articles/no-code`,
    `https://${HOST}/articles/ai-assisted-coding`,
    `https://${HOST}/articles/architecture-as-code`,
    `https://${HOST}/articles/prompt-engineering`,
    `https://${HOST}/articles/n8n`,
    `https://${HOST}/articles/mcp`,
    `https://${HOST}/articles/terraform`,
    `https://${HOST}/articles/jpa`,
    `https://${HOST}/articles/microservice-redesign`,
    `https://${HOST}/articles/sql-optimization`,
    `https://${HOST}/articles/aws-lambda-practices`,
    `https://${HOST}/articles/lessons-learned-2025`,
    `https://${HOST}/articles/ai-assisted-coding-pt2`,
    `https://${HOST}/articles/system-design-best-practices`,
    `https://${HOST}/articles/bgp`,
    `https://${HOST}/articles/cli-agents`,
    `https://${HOST}/articles/structured-output`,
    `https://${HOST}/articles/crm-no-code`,
    `https://${HOST}/articles/design-patterns`,
    `https://${HOST}/articles/changing-landscape`,
    `https://${HOST}/articles/enterprise-best-practices`,
    `https://${HOST}/articles/ai-model-selection`,
    `https://${HOST}/articles/context-engineering-ai-coding-tools`,
    `https://${HOST}/articles/ai-coding-model-wars-2026`,
    `https://${HOST}/articles/context-engineering`,
    `https://${HOST}/articles/lessons-learned-2026`,
];

const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLS,
});

const options = {
    hostname: 'api.indexnow.org',
    path: '/indexnow',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
    },
};

console.log(`Submitting ${URLS.length} URLs to IndexNow...`);

const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);

    if (res.statusCode === 200) {
        console.log('Success — URLs submitted and will be crawled shortly.');
    } else if (res.statusCode === 202) {
        console.log('Accepted — URLs received for processing.');
    } else if (res.statusCode === 400) {
        console.error('Error 400: Invalid format. Check URL list or key.');
    } else if (res.statusCode === 403) {
        console.error('Error 403: Key not found or key file unreachable. Make sure the site is deployed first.');
    } else if (res.statusCode === 422) {
        console.error('Error 422: URLs do not belong to the host or key is invalid.');
    } else if (res.statusCode === 429) {
        console.error('Error 429: Too many requests. Try again later.');
    } else {
        console.error(`Unexpected status: ${res.statusCode}`);
    }

    res.on('data', (chunk) => {
        const body = chunk.toString();
        if (body) console.log('Response body:', body);
    });
});

req.on('error', (err) => {
    console.error('Request failed:', err.message);
});

req.write(payload);
req.end();
