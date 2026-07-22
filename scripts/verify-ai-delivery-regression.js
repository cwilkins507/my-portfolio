import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4321';
const outputDirectory = path.resolve(process.env.EVIDENCE_DIR || 'artifacts/ai-delivery-regression');
fs.mkdirSync(outputDirectory, { recursive: true });

const routes = [
  '/',
  '/services',
  '/newsletter',
  '/resources',
  '/resources/agent-harness-builder',
  '/about',
  '/articles/managing-engineering-teams-with-ai',
  '/articles/automation-cost-small-business',
  '/services/ai-delivery-kit',
  '/services/ai-delivery-kit/intake',
  '/services/ai-delivery-kit/capability-brief',
  '/services/ai-workflow-assessment',
  '/quiz',
];
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];
const screenshotRoutes = new Set([
  '/',
  '/newsletter',
  '/resources',
  '/resources/agent-harness-builder',
  '/about',
  '/articles/managing-engineering-teams-with-ai',
  '/articles/automation-cost-small-business',
  '/services/ai-delivery-kit',
  '/services/ai-delivery-kit/intake',
  '/services/ai-delivery-kit/capability-brief',
  '/quiz',
]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
function slug(route) {
  return route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
}

async function inspectRoute(page, route, viewport) {
  const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
  assert(response?.ok(), `${route} at ${viewport.name}: expected HTTP 2xx, received ${response?.status() ?? 'no response'}`);
  const structure = await page.evaluate(() => {
    const clientWidth = document.documentElement.clientWidth;
    const overflowElements = [...document.querySelectorAll('body *')]
      .map(element => {
        const rect = element.getBoundingClientRect();
        return {
          selector: element.id ? `#${element.id}` : `${element.tagName.toLowerCase()}${typeof element.className === 'string' && element.className ? `.${element.className.trim().replaceAll(/\s+/g, '.')}` : ''}`,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      })
      .filter(element => element.left < 0 || element.right > clientWidth)
      .slice(0, 8);
    return {
      h1: document.querySelectorAll('h1').length,
      main: document.querySelectorAll('main').length,
      forms: document.querySelectorAll('form').length,
      overflow: document.documentElement.scrollWidth - clientWidth,
      overflowElements,
    };
  });
  assert(structure.h1 === 1, `${route} at ${viewport.name}: expected one h1, found ${structure.h1}`);
  assert(structure.main === 1, `${route} at ${viewport.name}: expected one main, found ${structure.main}`);
  assert(structure.overflow <= 0, `${route} at ${viewport.name}: horizontal overflow ${structure.overflow}px from ${JSON.stringify(structure.overflowElements)}`);
  if (['/newsletter', '/resources', '/resources/agent-harness-builder', '/about'].includes(route)) {
    assert(structure.forms === 1, `${route} at ${viewport.name}: expected one form, found ${structure.forms}`);
  }
  const contrast = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
  assert(contrast.violations.length === 0, `${route} at ${viewport.name}: contrast violations: ${contrast.violations.flatMap(violation => violation.nodes.map(node => `${node.target.join(' ')} (${node.failureSummary})`)).join('; ')}`);
  if (screenshotRoutes.has(route) && viewport.name !== 'tablet') {
    await page.screenshot({ path: path.join(outputDirectory, `${viewport.name}-${slug(route)}.png`), fullPage: true });
  }
  return structure;
}

async function verifyKeyboard(browser) {
  const context = await browser.newContext({ viewport: viewports[2] });
  const page = await context.newPage();
  const results = [];
  for (const route of routes) {
    await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
    const focusables = await page.locator('a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),textarea:not([disabled]),select:not([disabled]),summary,[tabindex]:not([tabindex="-1"])').evaluateAll(elements => {
      const visible = elements.filter(element => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return element.tabIndex >= 0 && !(element.getRootNode() instanceof ShadowRoot) && !element.closest('[aria-hidden="true"],[inert],astro-dev-toolbar') && style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
      });
      return visible.map((element, index) => {
        element.dataset.regressionFocusIndex = String(index);
        return { key: String(index), label: `${element.tagName}:${element.textContent?.trim().slice(0, 40) || element.getAttribute('name') || 'unlabeled'}:${element.getAttribute('href') || ''}` };
      });
    });
    const expected = focusables.length;
    const reached = new Set();
    const indicators = new Set();
    const missingIndicatorDetails = new Map();
    for (let index = 0; index < expected + 20; index += 1) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(20);
      const focus = await page.evaluate(() => {
        const element = document.activeElement;
        if (!element || element === document.body) return null;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return {
          key: element.dataset.regressionFocusIndex,
          visible: rect.width > 0 && rect.height > 0,
          indicator: (style.outlineStyle !== 'none' && style.outlineWidth !== '0px') || style.boxShadow !== 'none',
          detail: `${style.outlineStyle}/${style.outlineWidth}/${style.boxShadow}`,
        };
      });
      if (focus?.visible && focus.key !== undefined) reached.add(focus.key);
      if (focus?.indicator && focus.key !== undefined) indicators.add(focus.key);
      if (!focus?.indicator && focus?.key !== undefined) missingIndicatorDetails.set(focus.key, focus.detail);
      if (reached.size >= expected) break;
    }
    assert(reached.size === expected, `${route}: keyboard reached ${reached.size}/${expected} visible controls; missed ${focusables.filter(item => !reached.has(item.key)).map(item => item.label).join(', ')}`);
    assert(indicators.size === expected, `${route}: ${expected - indicators.size} controls lacked a visible focus indicator: ${focusables.filter(item => !indicators.has(item.key)).map(item => `${item.label} (${missingIndicatorDetails.get(item.key) || 'not observed'})`).join(', ')}`);
    results.push({ route, controls: expected, reached: reached.size, focusIndicators: indicators.size });
  }
  await context.close();
  return results;
}

async function verifyReducedMotion(browser) {
  const context = await browser.newContext({ viewport: viewports[2], reducedMotion: 'reduce' });
  const page = await context.newPage();
  const results = [];
  for (const route of routes) {
    await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
    const active = await page.evaluate(() => document.getAnimations().filter(animation => {
      const timing = animation.effect?.getComputedTiming();
      return animation.playState === 'running' && Number(timing?.duration || 0) > 50;
    }).length);
    assert(active === 0, `${route}: ${active} running animations remain with reduced motion`);
    results.push({ route, runningAnimationsOver50ms: active });
  }
  await context.close();
  return results;
}

async function verifyIntake(browser) {
  const context = await browser.newContext({ viewport: viewports[0] });
  const page = await context.newPage();
  let posted = false;
  await page.route('https://api.web3forms.com/submit', async route => {
    posted = route.request().method() === 'POST';
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
  });
  await page.goto(`${baseURL}/services/ai-delivery-kit/intake`, { waitUntil: 'networkidle' });
  const requiredFieldNames = await page.locator('.intake-form [required][name]').evaluateAll(elements => elements.map(element => element.name));
  for (const requiredName of ['candidateIssue', 'verification', 'technicalOwner', 'agentAccess']) {
    assert(requiredFieldNames.includes(requiredName), `intake is missing readiness field ${requiredName}`);
  }
  await page.evaluate(() => {
    window.__capturedPlausibleEvents = [];
    window.plausible = (name, options) => window.__capturedPlausibleEvents.push({ name, options });
    const form = document.querySelector('.intake-form');
    for (const element of form.elements) {
      if (!element.required) continue;
      if (element.tagName === 'SELECT') element.value = element.options[1].value;
      else element.value = element.type === 'email' ? 'test@example.com' : 'Regression test value';
    }
    form.requestSubmit();
  });
  await page.locator('.intake-success').waitFor();
  const events = await page.evaluate(() => window.__capturedPlausibleEvents);
  assert(posted, 'intake success path did not send a POST');
  assert(events.some(event => event.name === 'Pilot Intake Submit' && event.options?.props?.location === 'pilot-intake'), 'intake success did not emit the expected Plausible event');
  const success = await page.locator('.intake-success').innerText();
  assert(/No payment has been collected/.test(success), 'intake success state lost the no-payment boundary');
  assert(/\$500 first installment/.test(success) && /\$1,000 balance is due only after acceptance/.test(success), 'intake success state lost the accepted payment schedule');
  await context.close();
  return { posted, events, requiredFieldNames, noPaymentBoundary: true, paymentScheduleBoundary: true };
}

async function verifyOfferContract(page) {
  const inspectSections = () => page.evaluate(() => {
    const sections = [...document.querySelectorAll('main section')];
    const byHeading = heading => {
      const section = sections.find(candidate => candidate.querySelector('h2')?.textContent.trim() === heading);
      return section ? { text: section.innerText, items: section.querySelectorAll('li').length } : null;
    };
    return {
      body: document.querySelector('main')?.innerText || '',
      readiness: byHeading('The five-day clock starts only when the environment is ready.'),
      acceptance: byHeading('Acceptance is observable and agreed before payment.'),
      timeline: byHeading('Map, install, prove, and hand off.'),
      payment: byHeading('$500 to start. $1,000 only after acceptance.'),
      installedAssets: byHeading('Installed assets'),
      qualifiedProof: byHeading('Qualified proof'),
      nextSteps: byHeading('Next steps'),
      contractMarkers: document.querySelectorAll('.contract-list .list-marker').length,
      nextStepMarkers: document.querySelectorAll('.next-steps .next-step-number').length,
    };
  });

  await page.goto(`${baseURL}/`, { waitUntil: 'networkidle' });
  const homepage = await page.locator('main').innerText();
  assert(/5 business days after readiness/.test(homepage), 'homepage lost the readiness-gated five-day promise');
  assert(/\$500 to start · \$1,000 after acceptance/.test(homepage), 'homepage lost the accepted payment schedule');
  assert(/\$1,500 · first 3 accepted pilots/.test(homepage), 'homepage lost the founding-price boundary');
  assert(!/approximately 10 business days/i.test(homepage), 'homepage still exposes the retired delivery window');

  await page.goto(`${baseURL}/services/ai-delivery-kit`, { waitUntil: 'networkidle' });
  const offer = await inspectSections();
  assert(offer.readiness?.items === 7, `offer readiness gate has ${offer.readiness?.items ?? 0}/7 conditions`);
  assert(offer.acceptance?.items === 5, `offer acceptance section has ${offer.acceptance?.items ?? 0}/5 criteria`);
  assert(offer.timeline?.items === 5, `offer timeline has ${offer.timeline?.items ?? 0}/5 business days`);
  assert(offer.installedAssets?.items === 8, `offer installed-assets grid has ${offer.installedAssets?.items ?? 0}/8 assets`);
  assert(offer.qualifiedProof?.items === 4, `offer proof list has ${offer.qualifiedProof?.items ?? 0}/4 outcomes`);
  assert(offer.nextSteps?.items === 3, `offer next-steps section has ${offer.nextSteps?.items ?? 0}/3 decisions`);
  assert(offer.contractMarkers === 12, `offer readiness and acceptance lists have ${offer.contractMarkers}/12 scan markers`);
  assert(offer.nextStepMarkers === 3, `offer next-step cards have ${offer.nextStepMarkers}/3 scan markers`);
  assert(/final installment is not due/.test(offer.payment?.text || '') && /at no additional charge until those criteria pass/.test(offer.payment?.text || ''), 'offer lost the accepted risk reversal');
  assert(/first three clients whose written scope is accepted and \$500 first installment is paid/.test(offer.payment?.text || ''), 'offer lost the enforceable founding-price boundary');
  assert(!/approximately 10 business days/i.test(offer.body), 'offer still exposes the retired delivery window');

  await page.goto(`${baseURL}/services/ai-delivery-kit/capability-brief`, { waitUntil: 'networkidle' });
  const brief = await page.evaluate(() => ({
    text: document.querySelector('main')?.innerText || '',
    acceptanceItems: document.querySelectorAll('main ol li').length,
    readinessItems: document.querySelectorAll('main .grid section:nth-child(2) > ul li').length,
  }));
  assert(brief.acceptanceItems === 5, `capability brief has ${brief.acceptanceItems}/5 acceptance criteria`);
  assert(brief.readinessItems === 7, `capability brief has ${brief.readinessItems}/7 readiness conditions`);
  assert(/One optional fit call. One required working handoff./.test(brief.text), 'capability brief lost the meeting boundary');
  assert(/\$500 follows written scope acceptance/.test(brief.text) && /\$1,000 balance is due only after every agreed acceptance criterion passes/.test(brief.text), 'capability brief lost the payment boundary');

  return {
    homepageFiveDayPromise: true,
    readinessConditions: offer.readiness.items,
    acceptanceCriteria: offer.acceptance.items,
    deliveryDays: offer.timeline.items,
    installedAssets: offer.installedAssets.items,
    qualifiedProofItems: offer.qualifiedProof.items,
    nextStepDecisions: offer.nextSteps.items,
    contractScanMarkers: offer.contractMarkers,
    riskReversal: true,
    foundingBoundary: true,
    capabilityBriefSynchronized: true,
  };
}

async function verifyQuiz(browser) {
  const context = await browser.newContext({ viewport: viewports[0] });
  const page = await context.newPage();
  let postedPayload;
  await page.route('https://api.web3forms.com/submit', async route => {
    postedPayload = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
  });
  await page.goto(`${baseURL}/quiz`, { waitUntil: 'networkidle' });
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  assert(!/personalized action plan/i.test(description || ''), 'quiz metadata still promises a personalized action plan');
  const observedAnswers = [];
  for (let step = 1; step <= 5; step += 1) {
    const question = await page.locator('main h2').innerText();
    const option = page.locator('main button[aria-pressed]').first();
    const answer = await option.innerText();
    observedAnswers.push({ question, answer });
    await option.click();
    if (step < 5) {
      await page.waitForFunction(
        expected => Number(document.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')) === expected,
        step + 1
      );
    }
  }
  await page.getByRole('heading', { name: 'Your workflow snapshot is ready to send.' }).waitFor();
  const leadBoundary = await page.locator('main').innerText();
  assert(/does not book or purchase anything/i.test(leadBoundary), 'quiz lead step lost the no-booking/no-purchase boundary');
  await page.evaluate(() => {
    window.__capturedPlausibleEvents = [];
    window.plausible = (name, options) => window.__capturedPlausibleEvents.push({ name, options });
  });
  await page.getByLabel('First name').fill('Regression');
  await page.getByLabel('Last name').fill('Test');
  await page.getByLabel('Email address').fill('test@example.com');
  await page.getByRole('button', { name: 'Send my quiz answers' }).click();
  await page.getByRole('heading', { name: 'Answers received.' }).waitFor();
  assert(postedPayload, 'quiz success path did not send a POST');
  assert(
    observedAnswers.every(({ question, answer }) => postedPayload.message.includes(question) && postedPayload.message.includes(answer)),
    'quiz submission did not preserve the questions and selected answers'
  );
  const successBoundary = await page.locator('main').innerText();
  assert(/No assessment was booked and no payment was collected/i.test(successBoundary), 'quiz success state lost the booking/payment boundary');
  const assessmentLink = page.getByRole('link', { name: 'View the $99 assessment' });
  assert(await assessmentLink.getAttribute('href') === '/services/ai-workflow-assessment', 'quiz completion CTA does not route to the SMB assessment page');
  const events = await page.evaluate(() => {
    const link = document.querySelector('[data-analytics-location="quiz-complete-assessment"]');
    link.addEventListener('click', event => event.preventDefault(), { once: true });
    link.click();
    return window.__capturedPlausibleEvents;
  });
  assert(
    events.some(event => event.name === 'SMB Assessment Open' && event.options?.props?.location === 'quiz-complete-assessment'),
    'quiz completion CTA did not emit the expected Plausible event'
  );
  await context.close();
  return {
    posted: true,
    answersPreserved: true,
    noBookingOrPaymentBoundary: true,
    assessmentHref: '/services/ai-workflow-assessment',
    events,
  };
}

const browser = await chromium.launch({ headless: true });
try {
  const routeResults = [];
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    for (const route of routes) routeResults.push({ route, viewport: viewport.name, ...(await inspectRoute(page, route, viewport)) });
    await context.close();
  }
  const context = await browser.newContext({ viewport: viewports[0] });
  const page = await context.newPage();
  await page.goto(`${baseURL}/articles/managing-engineering-teams-with-ai`, { waitUntil: 'networkidle' });
  const engineeringCTA = await page.getByRole('link', { name: 'AI-Assisted Delivery Pilot' }).getAttribute('href');
  assert(engineeringCTA === '/services/ai-delivery-kit', `engineering CTA points to ${engineeringCTA}`);
  const quizEntryPoints = [];
  for (const route of ['/', '/services', '/services/ai-workflow-assessment']) {
    await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
    const quizEntry = page.locator('main').getByRole('link', { name: /Take the free 5-question workflow quiz/ }).first();
    const href = await quizEntry.getAttribute('href');
    const event = await quizEntry.getAttribute('data-analytics-event');
    assert(href === '/quiz', `${route} Quiz entry points to ${href}`);
    assert(event === 'SMB Quiz Start', `${route} Quiz entry lost its analytics event`);
    quizEntryPoints.push({ route, href, event });
  }
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  const homepageStructure = await page.evaluate(() => ({
    heading: document.querySelector('main h1')?.textContent.replace(/\s+/g, ' ').trim(),
    sectionOrder: [...document.querySelectorAll('main > section')].map(section => section.className),
    mainForms: document.querySelectorAll('main form').length,
    faqCount: document.querySelectorAll('.faq-list details').length,
    utilityLabels: [...document.querySelectorAll('.utility-section .eyebrow')].map(label => label.textContent.trim()),
    offerPathCount: document.querySelectorAll('.offer-grid article').length,
    referralSignalCount: document.querySelectorAll('.symptom-grid article').length,
  }));
  assert(homepageStructure.heading === 'Turn AI experiments and manual work into systems your team can run.', `homepage heading is "${homepageStructure.heading}"`);
  assert(
    homepageStructure.sectionOrder.join('|') === 'hero|credibility-strip|overview-section|problem-section|pilot-section|proof-band|faq-section|close-section|utility-section',
    `homepage section order is ${homepageStructure.sectionOrder.join(' -> ')}`,
  );
  assert(homepageStructure.mainForms === 0, `homepage should not interrupt the offer with a form; found ${homepageStructure.mainForms}`);
  assert(homepageStructure.faqCount === 4, `homepage expected four scope-review questions, found ${homepageStructure.faqCount}`);
  assert(
    homepageStructure.utilityLabels.join('|') === "Writing and tools|Collin's Thoughts|Small-business automation",
    `homepage utility labels are ${homepageStructure.utilityLabels.join(', ')}`,
  );
  assert(homepageStructure.offerPathCount === 4, `homepage expected four service paths, found ${homepageStructure.offerPathCount}`);
  assert(homepageStructure.referralSignalCount === 3, `homepage expected three referral signals, found ${homepageStructure.referralSignalCount}`);
  const heroBooking = page.locator('[data-analytics-location="homepage-hero-booking"]');
  const finalBooking = page.locator('[data-analytics-location="homepage-final-booking"]');
  const finalScopeReview = page.locator('[data-analytics-location="homepage-final-scope-review"]');
  assert(await heroBooking.getAttribute('href') === 'https://cal.com/collinwilkins/intro', 'Homepage hero booking CTA mismatch');
  assert(await heroBooking.getAttribute('data-analytics-event') === 'Booking Page Open', 'Homepage hero booking analytics mismatch');
  assert(await finalBooking.getAttribute('href') === 'https://cal.com/collinwilkins/intro', 'Homepage final booking CTA mismatch');
  assert(await finalScopeReview.getAttribute('href') === '/services/ai-delivery-kit/intake', 'Homepage final scope-review CTA mismatch');
  const secondFaq = page.locator('.faq-list details').nth(1);
  await secondFaq.locator('summary').click();
  assert(await secondFaq.evaluate(details => details.open), 'Homepage FAQ disclosure did not open');
  await page.goto(`${baseURL}/services`, { waitUntil: 'networkidle' });
  const servicesStructure = await page.evaluate(() => ({
    heading: document.querySelector('main h1')?.textContent.replace(/\s+/g, ' ').trim(),
    servicePathCount: document.querySelectorAll('.service-grid article').length,
    backendExampleCount: document.querySelectorAll('.example-grid li').length,
    referralSignalCount: document.querySelectorAll('.referral-list article').length,
    bookingHrefs: [...document.querySelectorAll('main [data-analytics-event="Booking Page Open"]')].map(link => link.getAttribute('href')),
  }));
  assert(servicesStructure.heading === 'Turn one real workflow problem into a system your team can use.', `services heading is "${servicesStructure.heading}"`);
  assert(servicesStructure.servicePathCount === 4, `services expected four paths, found ${servicesStructure.servicePathCount}`);
  assert(servicesStructure.backendExampleCount === 5, `services expected five backend examples, found ${servicesStructure.backendExampleCount}`);
  assert(servicesStructure.referralSignalCount === 3, `services expected three referral signals, found ${servicesStructure.referralSignalCount}`);
  assert(servicesStructure.bookingHrefs.length >= 4 && servicesStructure.bookingHrefs.every(href => href === 'https://cal.com/collinwilkins/intro'), 'services booking paths are incomplete or inconsistent');
  const offerContract = await verifyOfferContract(page);
  await page.goto(`${baseURL}/about`, { waitUntil: 'networkidle' });
  assert(await page.locator('main').getByRole('link', { name: /capability brief/i }).getAttribute('href') === '/services/ai-delivery-kit/capability-brief', 'About capability CTA mismatch');
  assert(await page.locator('main').getByRole('link', { name: 'Book a free 30-minute call' }).getAttribute('href') === 'https://cal.com/collinwilkins/intro', 'About booking CTA mismatch');
  const resumeLink = page.locator('main').getByRole('link', { name: 'Download my resume' });
  assert(await resumeLink.getAttribute('href') === '/Collin-Wilkins-Resume.pdf', 'About resume link missing');
  assert(await resumeLink.getAttribute('download') === 'collin-wilkins-resume.pdf', 'About resume download filename mismatch');
  await context.close();
  const keyboard = await verifyKeyboard(browser);
  const reducedMotion = await verifyReducedMotion(browser);
  const intake = await verifyIntake(browser);
  const quiz = await verifyQuiz(browser);
  const report = { baseURL, generatedAt: new Date().toISOString(), engineeringCTA, homepageStructure, servicesStructure, offerContract, quizEntryPoints, routeResults, keyboard, reducedMotion, intake, quiz };
  fs.writeFileSync(path.join(outputDirectory, 'regression-results.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`AI Delivery regression passed: ${routeResults.length} route/viewport checks, ${keyboard.length} keyboard routes, ${reducedMotion.length} reduced-motion routes.`);
} finally {
  await browser.close();
}
