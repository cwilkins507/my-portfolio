import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { SITE_URL } from '../src/data/site.js';

const url = process.env.CAPABILITY_BRIEF_URL || 'http://127.0.0.1:4321/services/ai-delivery-kit/capability-brief';
const output = resolve(dirname(fileURLToPath(import.meta.url)), '../public/AI-Delivery-Kit-Capability-Brief.pdf');
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  await page.evaluate((siteUrl) => {
    for (const anchor of document.querySelectorAll('a[href^="/"]')) {
      anchor.href = new URL(anchor.getAttribute('href'), siteUrl).href;
    }
  }, SITE_URL);
  await page.pdf({ path: output, format: 'Letter', printBackground: true, preferCSSPageSize: true, tagged: true });
  console.log(`Wrote ${output}`);
} finally {
  await browser.close();
}
