import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const articleFiles = fs.readdirSync('src/articles').filter(file => file.endsWith('.md'));
for (const file of articleFiles) {
  const slug = path.basename(file, '.md');
  const html = fs.readFileSync(path.join('dist/articles', `${slug}.html`), 'utf8');
  assert.ok(html.includes('"@type":"FAQPage"'), `${slug} is missing FAQPage JSON-LD`);
  assert.ok(html.includes('class="article-faq"'), `${slug} is missing a visible FAQ section`);
  assert.ok(html.includes('class="faq-item"'), `${slug} is missing visible FAQ items`);
}
const faqPage = fs.readFileSync('dist/faq.html', 'utf8');
assert.ok(faqPage.includes('Frequently asked questions'), '/faq did not build');
const sitemap = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
assert.ok(sitemap.includes('https://collinwilkins.com/faq'), '/faq is missing from the sitemap');
console.log(`Verified visible FAQs and JSON-LD on ${articleFiles.length} built article pages.`);
