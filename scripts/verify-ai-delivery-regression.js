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
];
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];
const screenshotRoutes = new Set([
  '/newsletter',
  '/resources',
  '/resources/agent-harness-builder',
  '/about',
  '/articles/managing-engineering-teams-with-ai',
  '/articles/automation-cost-small-business',
  '/services/ai-delivery-kit/intake',
  '/services/ai-delivery-kit/capability-brief',
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
  const structure = await page.evaluate(() => ({
    h1: document.querySelectorAll('h1').length,
    main: document.querySelectorAll('main').length,
    forms: document.querySelectorAll('form').length,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  assert(structure.h1 === 1, `${route} at ${viewport.name}: expected one h1, found ${structure.h1}`);
  assert(structure.main === 1, `${route} at ${viewport.name}: expected one main, found ${structure.main}`);
  assert(structure.overflow <= 0, `${route} at ${viewport.name}: horizontal overflow ${structure.overflow}px`);
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
  await context.close();
  return { posted, events, noPaymentBoundary: true };
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
  await page.goto(`${baseURL}/about`, { waitUntil: 'networkidle' });
  assert(await page.getByRole('link', { name: /capability brief/i }).getAttribute('href') === '/services/ai-delivery-kit/capability-brief', 'About capability CTA mismatch');
  assert(await page.getByRole('link', { name: /résumé/i }).getAttribute('href') === '/Collin-Wilkins-Resume.pdf', 'About résumé link missing');
  await context.close();
  const keyboard = await verifyKeyboard(browser);
  const reducedMotion = await verifyReducedMotion(browser);
  const intake = await verifyIntake(browser);
  const report = { baseURL, generatedAt: new Date().toISOString(), engineeringCTA, routeResults, keyboard, reducedMotion, intake };
  fs.writeFileSync(path.join(outputDirectory, 'regression-results.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`AI Delivery regression passed: ${routeResults.length} route/viewport checks, ${keyboard.length} keyboard routes, ${reducedMotion.length} reduced-motion routes.`);
} finally {
  await browser.close();
}
