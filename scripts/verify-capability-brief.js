import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const pdf = path.resolve(process.argv[2] || 'public/AI-Delivery-Kit-Capability-Brief.pdf');
if (!fs.existsSync(pdf)) throw new Error(`Missing PDF: ${pdf}`);

function run(command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8' });
  if (result.error) throw new Error(`${command} is required for PDF verification: ${result.error.message}`);
  if (result.status !== 0) throw new Error(`${command} failed: ${result.stderr || result.stdout}`);
  return result.stdout;
}
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const info = run('pdfinfo', [pdf]);
assert(/^Pages:\s+1$/m.test(info), 'capability brief must be exactly one page');
assert(/^Page size:\s+612 x 792 pts/m.test(info), 'capability brief must use Letter geometry');
const text = run('pdftotext', [pdf, '-']);
const normalizedText = text.toLowerCase().replace(/\s+/g, ' ').trim();
for (const phrase of [
  'own a governed ai delivery path, proven on one real issue.',
  '$1,500 fixed founding price',
  '5 business days after readiness',
  'verified draft pull request',
  '$500 follows written scope acceptance',
  '$1,000 balance is due only after every agreed acceptance criterion passes',
  'no additional charge until the criteria pass',
  'first three clients who accept written scope and pay $500',
  'production credentials are not accepted',
]) assert(normalizedText.includes(phrase), `PDF text is missing: ${phrase}`);

const urls = run('pdfinfo', ['-url', pdf]);
for (const url of [
  'https://collinwilkins.com/',
  'https://cal.com/collinwilkins/intro',
  'https://collinwilkins.com/services/ai-delivery-kit/intake',
]) assert(urls.includes(url), `PDF annotation is missing: ${url}`);
assert(!/localhost|127\.0\.0\.1/.test(urls), 'PDF annotations contain a local URL');

const xml = run('pdftohtml', ['-xml', '-hidden', '-i', '-stdout', pdf]);
const fontSizes = new Map([...xml.matchAll(/<fontspec id="(\d+)" size="(\d+)"/g)].map(match => [match[1], Number(match[2])]));
const meaningfulSizes = [...xml.matchAll(/<text[^>]*font="(\d+)"[^>]*>([\s\S]*?)<\/text>/g)]
  .map(match => ({ size: fontSizes.get(match[1]), text: match[2].replace(/<[^>]+>/g, '').trim() }))
  .filter(item => /[A-Za-z0-9]/.test(item.text))
  .map(item => item.size);
assert(meaningfulSizes.length > 0, 'pdftohtml returned no meaningful text/font records');
const minimumMeaningfulFontSize = Math.min(...meaningfulSizes);
assert(minimumMeaningfulFontSize >= 9, `minimum meaningful PDF font is ${minimumMeaningfulFontSize}pt; expected at least 9pt`);

console.log(JSON.stringify({
  pdf,
  pages: 1,
  pageSize: '612 x 792 pts',
  requiredText: 'present',
  requiredAnnotations: 'present',
  minimumMeaningfulFontSize,
}, null, 2));
