import React, { useMemo, useRef, useState } from 'react';
import { searchDocuments } from '../utils/contentSearch.js';

export default function AskBlog({ compact = false, documents = [], articleCount = 0 }) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchDocuments(documents, query), [documents, query]);
  const active = query.trim().length >= 2;
  const inputRef = useRef(null);
  const shortQuery = query.trim().length === 1;

  return (
    <section aria-labelledby="article-search-title" style={{ maxWidth: compact ? '760px' : '900px', margin: '0 auto' }}>
      <span className="label" style={{ color: 'var(--accent-text)' }}>{compact ? 'Search the archive' : `${articleCount} published articles`}</span>
      <h2 id="article-search-title" style={{ fontSize: compact ? 'clamp(27px,4vw,38px)' : 'clamp(36px,5vw,54px)', fontWeight: 500, marginTop: 10 }}>Find the useful thread</h2>
      <p style={{ color: 'var(--ink-soft)', lineHeight: 1.6, marginTop: 10 }}>Search by problem or topic. Results lead to the strongest matching article, section, or FAQ.</p>
      <label htmlFor="article-search" className="sr-only">Search articles, sections, and FAQs</label>
      <input
        id="article-search"
        type="search"
        value={query}
        ref={inputRef}
        onChange={event => setQuery(event.target.value)}
        placeholder="Try agent harnesses, context engineering, AWS..."
        style={{ width: '100%', marginTop: 22, border: '1px solid var(--rule)', borderRadius: 999, padding: '13px 19px', background: 'var(--paper)', color: 'var(--ink)', fontSize: 15 }}
      />
      {shortQuery && <p className="label" aria-live="polite" style={{ color: 'var(--ink-faint)', marginTop: 10 }}>Type one more character to search.</p>}
      {active && (
        <div style={{ marginTop: 24 }}>
          <p className="label" aria-live="polite" style={{ color: 'var(--ink-faint)' }}>
            {results.length ? `${results.length} distinct destinations` : `No close matches for “${query.trim()}”`}
          </p>
          {results.length > 0 ? (
            <div style={{ borderTop: '1px solid var(--rule)', marginTop: 10 }}>
              {results.map(result => (
                <a key={result.id} href={result.url} style={{ display: 'block', padding: '16px 0', borderBottom: '1px solid var(--rule)', textDecoration: 'none' }}>
                  <span className="label" style={{ color: 'var(--accent-text)' }}>{result.type}{result.sourceArticle ? ` · ${result.sourceArticle}` : ''}</span>
                  <strong style={{ display: 'block', color: 'var(--ink)', fontWeight: 600, marginTop: 5 }}>{result.title}</strong>
                  <span style={{ display: 'block', color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.5, marginTop: 5 }}>{result.excerpt}</span>
                </a>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--ink-soft)', lineHeight: 1.5, marginTop: 10 }}>
              Try fewer words, use a category above, or <button type="button" onClick={() => { inputRef.current?.focus(); setQuery(''); }} style={{ display: 'inline-flex', minHeight: 44, alignItems: 'center', border: 0, padding: '8px 4px', background: 'none', color: 'var(--accent-text)', textDecoration: 'underline', cursor: 'pointer', font: 'inherit' }}>clear the search</button>.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
