export const normalizeSearchText = (value = '') => value
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

export const faqAnchor = (question = '') => `faq-${normalizeSearchText(question).replace(/\s+/g, '-').replace(/-+/g, '-')}`;

const termVariants = term => [
  term,
  term.replace(/ies$/, 'y'),
  term.replace(/es$/, ''),
  term.replace(/s$/, ''),
  term.replace(/ing$/, ''),
].filter(value => value.length > 1);

const scoreDocument = (document, phrase, terms) => {
  const title = normalizeSearchText(document.title);
  const searchable = normalizeSearchText(document.searchable);
  const titleMatches = terms.filter(term => termVariants(term).some(value => title.includes(value))).length;
  const matchedTerms = terms.filter(term => termVariants(term).some(value => searchable.includes(value))).length;
  if (!matchedTerms) return 0;
  return matchedTerms
    + (titleMatches === terms.length ? 10 + (document.type === 'Article' ? 5 : 0) : titleMatches * 3)
    + (title === phrase ? 12 : 0)
    + (title.includes(phrase) ? 7 : 0)
    + (document.type === 'FAQ' && title.includes(phrase) ? 4 : 0)
    + (document.type === 'Section' && title.includes(phrase) ? 3 : 0)
    + (searchable.includes(phrase) ? 2 : 0);
};

export function searchDocuments(documents, query, limit = 5) {
  const phrase = normalizeSearchText(query);
  if (phrase.length < 2) return [];
  const terms = phrase.split(' ').filter(term => term.length > 1);
  const exactArticles = documents.filter(document =>
    document.type === 'Article' && normalizeSearchText(document.title) === phrase
  );
  if (exactArticles.length) return exactArticles.slice(0, limit);
  const seenDestinations = new Set();

  return documents
    .map(document => ({ ...document, score: scoreDocument(document, phrase, terms) }))
    .filter(document => document.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .filter(document => {
      const destination = document.url?.split('#')[0] ?? document.id;
      if (seenDestinations.has(destination)) return false;
      seenDestinations.add(destination);
      return true;
    })
    .slice(0, limit);
}
