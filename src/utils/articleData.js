import { getCategoryForArticle } from '../data/categories.js';
import { faqOverrides, faqQuestions, faqSectionIndexes } from '../data/faqQuestions.js';

const anchorForHeading = (heading) => heading.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
const plainText = (value) => value.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/^\s*[-*+]\s+/gm, '').replace(/[`*_>#|]/g, '').replace(/\s+/g, ' ').trim();
const answerExcerpt = (value, fallback) => {
  const paragraphs = value.split(/\n\s*\n/).map(plainText).filter(text => text.length > 45 && !text.startsWith('!['));
  const selected = [];
  for (const paragraph of paragraphs) {
    if (selected.join(' ').length >= 240) break;
    selected.push(paragraph);
  }
  const answer = selected.join(' ') || fallback || '';
  if (answer.length <= 520) return answer;
  const sentences = answer.match(/[^.!?]+[.!?]+/g) || [];
  const clipped = sentences.reduce((text, sentence) => text.length + sentence.length <= 520 ? text + sentence : text, '').trim();
  return clipped || `${answer.slice(0, 517).trim()}...`;
};
const polishFaqText = (value = '') => value
  .replace(/\bHonestly\??\s*/gi, '')
  .replace(/\bactually\s+/gi, '')
  .replace(/\bleverage\b/gi, 'use')
  .replace(/\butilize\b/gi, 'use')
  .replace(/\bIt is important to\b/gi, '')
  .replace(/\bIt's important to\b/gi, '')
  .replace(/\bWhat matters here is user impact\b/gi, 'The useful test is user impact')
  .replace(/\s+/g, ' ')
  .trim();

export function articleFromModule(file, module) {
  const slug = file.split('/').pop().replace('.md', '');
  const body = typeof module.rawContent === 'function' ? module.rawContent() : '';
  const headings = [...body.matchAll(/^##\s+(.+)$/gm)];
  const sections = headings.map((match, index) => {
    const start = match.index + match[0].length;
    const end = headings[index + 1]?.index ?? body.length;
    const sectionBody = body.slice(start, end);
    return {
      title: plainText(match[1]),
      anchor: anchorForHeading(match[1]),
      excerpt: answerExcerpt(sectionBody, module.frontmatter.excerpt),
    };
  }).filter(section => section.title && section.excerpt);
  const questions = faqQuestions[slug] || [];
  const fallbackParagraphs = body.split(/\n\s*\n/).map(plainText).filter(text => text.length > 55 && !text.startsWith('---'));
  const indexes = faqSectionIndexes[slug] || questions.map((_, index) => index);
  const generatedFaqs = faqOverrides[slug] || questions.map((q, index) => ({
    q,
    a: sections[indexes[index]]?.excerpt || fallbackParagraphs[index + 1] || module.frontmatter.excerpt,
  }));
  return {
    slug,
    ...module.frontmatter,
    category: getCategoryForArticle(module.frontmatter.tags),
    body,
    sections,
    faqs: (module.frontmatter.faqs?.length ? module.frontmatter.faqs : generatedFaqs).map(faq => ({
      q: polishFaqText(faq.q),
      a: polishFaqText(faq.a),
    })),
  };
}
