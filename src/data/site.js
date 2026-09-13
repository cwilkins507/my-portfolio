export const SITE_URL = 'https://collinwilkins.com';

export const PUBLIC_CONTACT_PROFILE = Object.freeze({
  name: 'Collin Wilkins',
  givenName: 'Collin',
  familyName: 'Wilkins',
  email: 'collin@collinwilkins.com',
  website: SITE_URL,
  x: 'https://x.com/CollinWilkins7',
  location: 'Detroit, MI',
  locality: 'Detroit',
  region: 'MI',
  title: 'Software Engineer',
  descriptor: 'Software engineer and technical leader writing about distributed systems, infrastructure, developer tooling, and AI-native software development.',
  vCardHref: '/collin-wilkins.vcf',
});

export const CONNECT_CARD = Object.freeze({
  path: '/connect',
  canonicalUrl: `${SITE_URL}/connect`,
  qrUrl: `${SITE_URL}/connect?source=business-card`,
  eyebrow: 'A useful introduction',
  descriptor: 'Distributed systems · infrastructure · AI-native engineering',
  lead: 'I write and build at the intersection of distributed systems, infrastructure, developer tooling, and AI-native software development.',
  closing: 'For writing, technical discussions, collaborations, or other inquiries, email is the fastest path.',
  introductionMessage: 'I thought you two should connect. Collin writes and builds in distributed systems, infrastructure, developer tooling, and AI-native engineering. His writing lives at https://collinwilkins.com/articles',
  share: Object.freeze({
    title: 'Collin Wilkins',
    text: 'Software engineer writing about distributed systems, infrastructure, and AI-native development.',
  }),
  allowedSources: Object.freeze(['business-card', 'introduction', 'event', 'email', 'direct']),
});

export const NEWSLETTER = Object.freeze({
  name: "Collin's Thoughts",
  promise: 'Every other Tuesday, I share what I have been building, what I learned along the way, and a few articles or findings worth your time.',
  cadence: 'Every other Tuesday',
  archiveHref: 'https://buttondown.com/collinwilkins/archive/',
  subscribeAction: 'https://buttondown.com/api/emails/embed-subscribe/collinwilkins',
});

export const ANALYTICS_EVENTS = Object.freeze({
  newsletterSubscribe: 'Newsletter Subscribe',
  connectVCardDownload: 'Connect vCard Download',
  connectIntroductionCopy: 'Connect Introduction Copy',
  connectShare: 'Connect Card Share',
  connectWritingClick: 'Connect Writing Click',
});

// Advisory is a reference page, not an offer. `accepting` gates every availability
// statement on the site; flipping it to true is a deliberate, reviewed change.
export const ADVISORY = Object.freeze({
  accepting: false,
  statusLine: 'I’m not currently accepting new client engagements.',
  lead: 'I occasionally work with teams on AI-native engineering, developer workflows, infrastructure, and automation.',
  note: 'This page stays up as a reference for the kinds of problems I’ve worked on.',
  topics: Object.freeze([
    Object.freeze({
      name: 'AI-native engineering',
      description: 'Taking coding agents from ad-hoc use to a repeatable delivery path with shared context, review boundaries, and verification that survives contact with CI.',
    }),
    Object.freeze({
      name: 'Developer workflows and tooling',
      description: 'Reducing the distance between an approved change and a verified, reviewable pull request — conventions, harnesses, and the automation around them.',
    }),
    Object.freeze({
      name: 'Distributed and event-driven systems',
      description: 'Designing ingestion, processing, and reporting paths that stay observable and correct at production event volumes.',
    }),
    Object.freeze({
      name: 'Infrastructure and platform work',
      description: 'Serverless and cloud architecture, infrastructure as code, and the operational instrumentation that tells you what actually happened.',
    }),
    Object.freeze({
      name: 'Workflow automation',
      description: 'Replacing manual handoffs across forms, CRMs, spreadsheets, and backend logic with systems a team can maintain without one person’s memory.',
    }),
  ]),
});
