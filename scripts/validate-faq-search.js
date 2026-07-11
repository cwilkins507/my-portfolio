import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { faqQuestions } from '../src/data/faqQuestions.js';
import { faqAnchor, searchDocuments } from '../src/utils/contentSearch.js';

const files = fs.readdirSync('src/articles').filter(file => file.endsWith('.md')).sort();
const questions = new Set();
let faqCount = 0;

for (const file of files) {
  const slug = path.basename(file, '.md');
  const { data } = matter(fs.readFileSync(path.join('src/articles', file), 'utf8'));
  const faqs = data.faqs?.length ? data.faqs : (faqQuestions[slug] || []).map(q => ({ q, a: 'Generated from its matching public article section.' }));
  assert.ok(faqs.length >= 3, `${slug} has fewer than three FAQs`);
  const anchors = new Set();
  for (const faq of faqs) {
    assert.ok(faq.q?.trim(), `${slug} has an empty FAQ question`);
    assert.ok(faq.a?.trim(), `${slug} has an empty FAQ answer`);
    const anchor = faqAnchor(faq.q);
    assert.ok(!anchors.has(anchor), `${slug} has duplicate FAQ anchors`);
    anchors.add(anchor);
    assert.ok(!questions.has(`${slug}:${faq.q.toLowerCase()}`), `${slug} has a duplicate FAQ question`);
    questions.add(`${slug}:${faq.q.toLowerCase()}`);
    faqCount += 1;
  }
}

assert.equal(files.length, 47, 'public article inventory changed; review FAQ coverage and count copy');
assert.equal(searchDocuments([{ id:'1',type:'Article',title:'Agent harness',searchable:'agent harness tools' }], '').length, 0);
assert.equal(searchDocuments([{ id:'1',type:'Article',title:'Agent harness',searchable:'agent harness tools' }], 'a').length, 0);
assert.equal(searchDocuments([{ id:'1',type:'Article',title:'Agent harness',searchable:'agent harness tools' }], 'harness').length, 1);
assert.equal(searchDocuments([
  { id:'1',type:'Article',title:'Postgres tuning',searchable:'postgres indexes' },
  { id:'2',type:'FAQ',title:'How do agent tools work?',searchable:'agent tools context' },
], 'postgres agents').length, 2, 'search should use OR semantics');

console.log(`Validated ${files.length} public articles and ${faqCount} FAQs.`);
