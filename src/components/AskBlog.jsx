import React, { useMemo, useState } from 'react';
import { searchDocuments } from '../utils/contentSearch.js';

export default function AskBlog({ compact = false, documents = [], articleCount = 0 }) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchDocuments(documents, query), [documents, query]);
  const active = query.trim().length >= 2;

  return (
    <section aria-labelledby="article-search-title" style={{ maxWidth: compact ? '760px' : '900px', margin: '0 auto' }}>
      <span className="label" style={{ color: 'var(--accent-text)' }}>{articleCount} published articles</span>
      <h2 id="article-search-title" style={{ fontSize: compact ? 'clamp(27px,4vw,38px)' : 'clamp(36px,5vw,54px)', fontWeight: 500, marginTop: 10 }}>Search my writing</h2>
      <p style={{ color: 'var(--ink-soft)', lineHeight: 1.6, marginTop: 10 }}>Search articles, sections, and FAQs by topic. You don't need the exact wording.</p>
      <label htmlFor="article-search" className="sr-only">Search articles, sections, and FAQs</label>
      <input
        id="article-search"
        type="search"
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="Try agent harnesses, context engineering, AWS..."
        style={{ width: '100%', marginTop: 22, border: '1px solid var(--rule)', borderRadius: 999, padding: '13px 19px', background: 'var(--paper)', color: 'var(--ink)', fontSize: 15 }}
      />
      {active && (
        <div aria-live="polite" style={{ marginTop: 24 }}>
          <span className="label" style={{ color: 'var(--ink-faint)' }}>{results.length ? `${results.length} closest matches` : 'No close matches'}</span>
          {results.length > 0 && <div style={{ borderTop: '1px solid var(--rule)', marginTop: 10 }}>
            {results.map(result => (
              <a key={result.id} href={result.url} style={{ display: 'block', padding: '16px 0', borderBottom: '1px solid var(--rule)', textDecoration: 'none' }}>
                <span className="label" style={{ color: 'var(--accent-text)', fontSize: 9 }}>{result.type}{result.sourceArticle ? ` · ${result.sourceArticle}` : ''}</span>
                <strong style={{ display: 'block', color: 'var(--ink)', fontWeight: 600, marginTop: 5 }}>{result.title}</strong>
                <span style={{ display: 'block', color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.5, marginTop: 5 }}>{result.excerpt}</span>
              </a>
            ))}
          </div>}
        </div>
      )}
    </section>
  );
}
