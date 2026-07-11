import { faqAnchor } from './contentSearch.js';

const cleanMarkdown = (value = '') => value
  .replace(/```[\s\S]*?```/g, ' ')
  .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/[`*_>#|]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

export function buildSearchDocuments(articles) {
  return articles.flatMap(article => {
    const url = `/articles/${article.slug}`;
    const articleDocument = {
      id: `article:${article.slug}`,
      type: 'Article',
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      url,
      searchable: [article.title, article.excerpt, article.category, ...(article.tags || []), article.target_keywords, cleanMarkdown(article.body)].filter(Boolean).join(' '),
    };
    const sectionDocuments = (article.sections || []).map(section => ({
      id: `section:${article.slug}:${section.anchor}`,
      type: 'Section',
      title: section.title,
      excerpt: section.excerpt,
      category: article.category,
      sourceArticle: article.title,
      url: `${url}#${section.anchor}`,
      searchable: `${section.title} ${section.excerpt} ${article.title} ${article.category}`,
    }));
    const faqDocuments = (article.faqs || []).map(faq => ({
      id: `faq:${article.slug}:${faqAnchor(faq.q)}`,
      type: 'FAQ',
      title: faq.q,
      excerpt: faq.a,
      category: article.category,
      sourceArticle: article.title,
      url: `${url}#${faqAnchor(faq.q)}`,
      searchable: `${faq.q} ${faq.a} ${article.title} ${article.category} ${(article.tags || []).join(' ')}`,
    }));
    return [articleDocument, ...sectionDocuments, ...faqDocuments];
  });
}
