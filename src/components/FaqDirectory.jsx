import React, { useMemo, useState } from 'react';
import { normalizeSearchText } from '../utils/contentSearch.js';

export default function FaqDirectory({ faqs = [] }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const phrase = normalizeSearchText(query);
    if (phrase.length < 2) return faqs;
    const terms = phrase.split(' ').filter(term => term.length > 1);
    return faqs.filter(faq => terms.some(term => normalizeSearchText(`${faq.q} ${faq.a} ${faq.articleTitle} ${faq.category}`).includes(term)));
  }, [faqs, query]);

  return <>
    <label htmlFor="faq-search" className="sr-only">Search frequently asked questions</label>
    <input id="faq-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search questions by topic..." style={{ width:'100%',border:'1px solid var(--rule)',borderRadius:999,padding:'13px 19px',background:'var(--paper)',color:'var(--ink)',fontSize:15 }} />
    <div aria-live="polite" style={{ marginTop:28 }}>
      <span className="label" style={{ color:'var(--ink-faint)' }}>{filtered.length} questions</span>
      {filtered.map(faq => <details key={faq.url} style={{ borderBottom:'1px solid var(--rule)' }}>
        <summary style={{ display:'flex',justifyContent:'space-between',gap:20,padding:'18px 0',cursor:'pointer',fontSize:18,fontWeight:600 }}>{faq.q}<span aria-hidden="true" style={{ color:'var(--accent-text)' }}>+</span></summary>
        <div style={{ padding:'0 34px 20px 0',color:'var(--ink-soft)',fontSize:17,lineHeight:1.65 }}>
          <p>{faq.a}</p>
          <a href={faq.url} style={{ display:'inline-block',marginTop:10,fontFamily:'var(--mono)',fontSize:11 }}>From {faq.articleTitle} →</a>
        </div>
      </details>)}
      {filtered.length === 0 && <p style={{ color:'var(--ink-faint)',padding:'28px 0' }}>No close matches. Try a broader topic.</p>}
    </div>
  </>;
}
