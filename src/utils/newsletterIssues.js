import { NEWSLETTER } from '../data/site.js';

const decode = (value) =>
  value
    .replace(/^<!\[CDATA\[|\]\]>$/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&apos;/g, "'")
    .trim();

const field = (item, tag) => {
  const match = item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match ? decode(match[1]) : '';
};

/**
 * Latest public issues of the newsletter, read from the Buttondown RSS feed at build time.
 * Returns [] when the feed is unreachable so the build never fails on a network hiccup;
 * callers render nothing in that case rather than placeholder issues.
 */
export async function getLatestIssues(limit = 3) {
  try {
    const response = await fetch(NEWSLETTER.rssHref, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return [];
    const xml = await response.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map(([, item]) => ({
        title: field(item, 'title'),
        href: field(item, 'link'),
        date: new Date(field(item, 'pubDate')).toISOString(),
      }))
      .filter(issue => issue.title && issue.href)
      .slice(0, limit);
  } catch {
    return [];
  }
}
