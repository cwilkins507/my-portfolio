export const SITE_URL = 'https://collinwilkins.com';
export const INTRO_CALL = Object.freeze({
  href: 'https://cal.com/collinwilkins/intro',
  durationMinutes: 30,
  engineeringLabel: 'Book a free fit call',
  smbLabel: 'Book a free intro call',
});
const engineeringPilotReadiness = Object.freeze([
  'Written scope names one approved low-risk issue, its non-goals, protected areas, and acceptance checks.',
  'Least-privilege repository and issue access is available; production credentials are not required or accepted.',
  'The agreed existing verification baseline passes before installation begins.',
  'One issue system and coding-agent adapter are selected, authenticated, and permitted on the customer network.',
  'The existing CI, draft-PR path, and branch protection are available.',
  'A named technical owner and reviewer can answer questions and review the pilot change by business day four.',
  'The $500 first installment is paid and the start date is confirmed.',
]);
const engineeringPilotAcceptance = Object.freeze([
  'The customer repository contains the agreed issue intake, repository instructions, protected-path policy, coding-agent adapter, model configuration, verification hook, usage evidence, and handoff guide.',
  'The existing verification path and five smoke cases pass, and protected paths fail closed before changed code executes.',
  'One approved backlog item reaches a verified draft pull request with schema-valid usage evidence.',
  'Human approval remains required before merge and normal deployment; the agent cannot access production credentials or approve its own work.',
  'A customer engineer runs the documented non-production path without Collin driving and can explain which decisions remain human-controlled.',
]);

export const ENGINEERING_PILOT = Object.freeze({
  name: 'AI-Assisted Delivery Pilot',
  assetName: 'AI Delivery Kit',
  lead: 'Own a governed AI delivery path, proven on one real issue.',
  description: 'Within five business days after readiness, your team owns a repository-native path from a qualified issue to a verified draft pull request, with existing CI and human approval intact.',
  audience: 'Small engineering teams already using AI coding tools',
  scope: 'One team. One repository. One real backlog item.',
  recordingNotice: 'Calls are recorded for notes by default; clients can opt out before the session.',
  outcome: 'Within five business days after the readiness gate passes, your team owns a repository-native AI delivery path proven on one approved issue. A customer engineer can run the documented path without Collin and explain which decisions remain human-controlled.',
  readiness: engineeringPilotReadiness,
  acceptance: engineeringPilotAcceptance,
  slug: '/services/ai-delivery-kit',
  intakeHref: '/services/ai-delivery-kit/intake',
  capabilityBriefHref: '/services/ai-delivery-kit/capability-brief',
  capabilityBriefPdfHref: '/AI-Delivery-Kit-Capability-Brief.pdf',
  fitCallHref: INTRO_CALL.href,
  fitCallLabel: INTRO_CALL.engineeringLabel,
  navigationLabel: 'Book a pilot fit call',
  intakeLabel: 'Request a pilot scope review',
  priceUsd: 1500,
  priceLabel: '$1,500 fixed founding price',
  firstInstallmentUsd: 500,
  finalInstallmentUsd: 1000,
  paymentLabel: '$500 after written scope acceptance · $1,000 after acceptance',
  foundingLimit: 3,
  foundingBoundary: 'The $1,500 fixed founding price is available to the first three clients whose written scope is accepted and $500 first installment is paid. Accepted pilots keep the agreed price; pricing is reviewed after that cohort.',
  deliveryWindow: '5 business days after readiness',
  deliveryMode: 'async-first',
  handoff: 'One required 60-minute working handoff; the free 30-minute fit call is optional.',
  riskReversal: 'If the ready environment does not meet the written acceptance criteria by the end of business day five, the $1,000 final installment is not due. I continue correcting the agreed in-scope installation at no additional charge until those criteria pass. Customer access or review delays pause the clock; scope changes and pre-existing failures are re-scoped.',
});
export const SMB_ASSESSMENT = Object.freeze({
  name: 'AI Workflow Opportunity Assessment',
  description: 'A focused working session to choose the first recurring workflow worth improving before spending more money on tools or implementation.',
  audience: 'Owners and operators of non-financial-services small teams',
  slug: '/services/ai-workflow-assessment',
  bookingHref: 'https://cal.com/collinwilkins/assessment',
  bookingLabel: 'Book the $99 assessment',
  introHref: INTRO_CALL.href,
  introLabel: INTRO_CALL.smbLabel,
  priceUsd: 99,
  durationMinutes: 60,
  deliverable: 'Workflow Opportunity Map',
  deliveryWindow: 'within 48 hours',
});
export const SMB_QUIZ = Object.freeze({
  name: 'Small-Business Automation Quiz',
  description: 'Five questions to name the recurring work creating operational drag and send Collin a concise workflow snapshot.',
  slug: '/quiz',
  ctaLabel: 'Take the free 5-question workflow quiz',
});
export const NEWSLETTER = Object.freeze({
  name: 'Notes from Production',
  promise: 'One field note every other Tuesday for engineering leaders turning AI coding tools into repeatable team practice.',
  cadence: 'Every other Tuesday',
  archiveHref: 'https://buttondown.com/collinwilkins/archive/',
  subscribeAction: 'https://buttondown.com/api/emails/embed-subscribe/collinwilkins',
});
export const ANALYTICS_EVENTS = Object.freeze({
  pilotCtaClick: 'Pilot CTA Click',
  bookingPageOpen: 'Booking Page Open',
  pilotIntakeSubmit: 'Pilot Intake Submit',
  smbAssessmentOpen: 'SMB Assessment Open',
  smbQuizStart: 'SMB Quiz Start',
  capabilityBriefView: 'Capability Brief View',
  capabilityBriefDownload: 'Capability Brief PDF Download',
  newsletterSubscribe: 'Newsletter Subscribe',
});
