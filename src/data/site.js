export const SITE_URL = 'https://collinwilkins.com';
export const INTRO_CALL = Object.freeze({
  href: 'https://cal.com/collinwilkins/intro',
  durationMinutes: 30,
  engineeringLabel: 'Book a free fit call',
  smbLabel: 'Book a free intro call',
});
export const ENGINEERING_PILOT = Object.freeze({
  name: 'AI-Assisted Delivery Pilot',
  assetName: 'AI Delivery Kit',
  lead: 'Turn one approved issue into a governed, reviewable change.',
  description: 'A repository-native delivery path connecting structured intake, repository context, a bounded coding agent, existing quality checks, human review, and visible model usage.',
  audience: 'Small engineering teams already using AI coding tools',
  scope: 'One team. One repository. One real backlog item.',
  recordingNotice: 'Calls are recorded for notes by default; clients can opt out before the session.',
  slug: '/services/ai-delivery-kit',
  intakeHref: '/services/ai-delivery-kit/intake',
  capabilityBriefHref: '/services/ai-delivery-kit/capability-brief',
  capabilityBriefPdfHref: '/AI-Delivery-Kit-Capability-Brief.pdf',
  fitCallHref: INTRO_CALL.href,
  fitCallLabel: INTRO_CALL.engineeringLabel,
  intakeLabel: 'Start the $1,500 founding pilot',
  priceUsd: 1500,
  priceLabel: '$1,500 founding price',
  deliveryWindow: 'approximately 10 business days',
  deliveryMode: 'async-first',
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
  capabilityBriefView: 'Capability Brief View',
  capabilityBriefDownload: 'Capability Brief PDF Download',
  newsletterSubscribe: 'Newsletter Subscribe',
});
