import { useEffect, useRef, useState } from 'react';
import { ANALYTICS_EVENTS, ENGINEERING_PILOT, INTRO_CALL } from '../data/site.js';
import { trackEvent } from '../utils/analytics.js';

const fieldGroups = [
  {
    legend: 'Team and contact',
    description: 'Who owns the repository decision and who will review the resulting draft pull request?',
    fields: [
      { name: 'team', label: 'Team and size', placeholder: 'Example product team (8 engineers)', type: 'text' },
      { name: 'technicalOwner', label: 'Technical owner and reviewer', placeholder: 'Name, role, and review availability', type: 'text' },
      { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name' },
      { name: 'email', label: 'Work email', type: 'email', autoComplete: 'email' },
    ],
  },
  {
    legend: 'Issue and safety boundary',
    description: 'Describe one approved, low-risk backlog item. Do not include secrets, credentials, customer data, or private repository URLs.',
    fields: [
      { name: 'repository', label: 'Repository and stack', placeholder: 'Private Astro/Node monorepo — describe it; do not paste a URL', type: 'text' },
      { name: 'candidateIssue', label: 'Approved low-risk issue and desired change', placeholder: 'Add a bounded validation rule without touching protected paths', type: 'textarea' },
      { name: 'protectedAreas', label: 'Protected or human-only areas', placeholder: 'auth/, payments/, infra/prod/', type: 'textarea' },
    ],
  },
  {
    legend: 'Workflow and verification',
    description: 'Show how work reaches review and what must already pass before installation starts.',
    fields: [
      { name: 'currentWorkflow', label: 'Current issue-to-review workflow', placeholder: 'Approved issues are assigned manually and reviewed through draft pull requests', type: 'textarea' },
      { name: 'pain', label: 'Where the workflow breaks down', placeholder: 'Review requirements and usage are inconsistent', type: 'textarea' },
      { name: 'verification', label: 'Existing verification, CI, and branch-protection baseline', placeholder: 'npm run verify passes; CI and draft-PR branch protection are active', type: 'textarea' },
    ],
  },
];

export default function PilotIntakeForm() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const statusRef = useRef(null);

  useEffect(() => {
    if (status === 'success' || status === 'error') statusRef.current?.focus();
  }, [status]);

  async function submit(event) {
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setMessage('');
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('Submission failed');
      trackEvent(ANALYTICS_EVENTS.pilotIntakeSubmit, { location: 'pilot-intake' });
      setStatus('success');
    } catch {
      setMessage('The scope review could not be sent. Your entries are still here. Try again, or use the optional free intro.');
      setStatus('error');
    }
  }

  if (status === 'success') return (
    <div className="intake-success" role="status" tabIndex="-1" ref={statusRef}>
      <h2>Scope review received</h2>
      <p>I’ll review the issue, protected areas, verification baseline, agent access, and accountable reviewers, then reply to the work email you provided with a scope and readiness decision. No payment has been collected.</p>
      <div className="form-routes"><a href={ENGINEERING_PILOT.slug}>Review pilot details</a><a href="/services">Compare service paths</a></div>
    </div>
  );

  return <form className="intake-form" onSubmit={submit} aria-busy={status === 'sending'}>
    <input type="hidden" name="access_key" value="0a422ed4-1385-48d0-95a9-60362ae551fc" />
    <input type="hidden" name="subject" value="AI Delivery Pilot intake" />
    <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
    <aside className="data-notice">
      <strong>Share only what is safe for intake.</strong>
      <p>This information is used to assess pilot fit and return a written scope decision. Do not submit credentials, secrets, customer data, source code, or private repository URLs. Web3Forms processes the submission and states that form data may be retained for up to three years.</p>
      <p><a href="https://web3forms.com/privacy">Read the processor privacy policy</a> · <a href="/contact">Request access or deletion</a></p>
    </aside>
    <p className="required-note">All 14 visible fields are required.</p>
    {fieldGroups.map(group => (
      <fieldset key={group.legend}>
        <legend>{group.legend}</legend>
        <p className="group-description">{group.description}</p>
        {group.fields.map(field => (
          <label key={field.name}>
            {field.label}
            {field.type === 'textarea'
              ? <textarea name={field.name} placeholder={field.placeholder} required rows="4" />
              : <input name={field.name} type={field.type} placeholder={field.placeholder} autoComplete={field.autoComplete} required />}
          </label>
        ))}
      </fieldset>
    ))}
    <fieldset>
      <legend>Tooling and timeline</legend>
      <p className="group-description">These answers identify setup work that must be complete before the five-day delivery clock starts.</p>
      <label>Issue system<select name="issueSystem" required defaultValue=""><option value="" disabled>Select one</option>{['GitHub Issues', 'Jira', 'Linear', 'Other'].map(x => <option key={x}>{x}</option>)}</select></label>
      <label>Coding tool<select name="codingTool" required defaultValue=""><option value="" disabled>Select one</option>{['Codex', 'Claude Code', 'Cursor', 'GitHub Copilot', 'Other'].map(x => <option key={x}>{x}</option>)}</select></label>
      <label>Coding-agent access<select name="agentAccess" required defaultValue=""><option value="" disabled>Select one</option>{['Authenticated and permitted', 'Tool selected; setup needed', 'Unknown'].map(x => <option key={x}>{x}</option>)}</select></label>
      <label>Timeline<select name="timeline" required defaultValue=""><option value="" disabled>Select one</option>{['Within 30 days', '30–60 days', 'More than 60 days'].map(x => <option key={x}>{x}</option>)}</select></label>
    </fieldset>
    <p className="disclosure">Submitting requests a no-payment scope review. It does not reserve work or authorize payment. A founding slot is accepted only after written scope acceptance and the $500 first installment.</p>
    {status === 'error' && <div role="alert" className="error" tabIndex="-1" ref={statusRef}><p>{message}</p><a href={INTRO_CALL.href}>Book the optional free 30-minute intro</a></div>}
    <button className="btn btn-primary" aria-disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Request a scope review'}</button>
    <div className="form-routes"><a href={ENGINEERING_PILOT.slug}>Review pilot details</a><a href={INTRO_CALL.href}>Not ready? Book the optional intro</a></div>
  </form>;
}
