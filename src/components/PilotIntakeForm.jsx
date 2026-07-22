import { useState } from 'react';
import { ANALYTICS_EVENTS } from '../data/site.js';
import { trackEvent } from '../utils/analytics.js';

const fields = [
  ['team','Team and size','Example product team (8 engineers)','text'],
  ['repository','Repository and stack','Private Astro/Node monorepo','text'],
  ['candidateIssue','Approved low-risk issue and desired change','Add a bounded validation rule without touching protected paths','textarea'],
  ['currentWorkflow','Current issue-to-review workflow','Approved issues are assigned manually','textarea'],
  ['pain','Where the workflow breaks down','Review requirements and usage are inconsistent','textarea'],
  ['verification','Existing verification command and baseline status','npm run verify — passing on the default branch','textarea'],
  ['protectedAreas','Protected or human-only areas','auth/, payments/, infra/prod/','textarea'],
  ['technicalOwner','Technical owner and reviewer','Name, role, and review availability','text'],
  ['name','Your name','','text'],['email','Work email','','email'],
];
export default function PilotIntakeForm(){
  const [status,setStatus]=useState('idle'); const [message,setMessage]=useState('');
  async function submit(event){event.preventDefault();setStatus('sending');setMessage('');const data=new FormData(event.currentTarget);try{const response=await fetch('https://api.web3forms.com/submit',{method:'POST',body:data});const result=await response.json();if(!response.ok||!result.success)throw new Error(result.message||'Submission failed');trackEvent(ANALYTICS_EVENTS.pilotIntakeSubmit,{location:'pilot-intake'});setStatus('success');}catch(error){setStatus('error');setMessage(error.message||'Submission failed. Please try again.');}}
  if(status==='success')return <div className="intake-success" role="status"><h2>Scope review received</h2><p>I’ll review the issue, protected areas, verification baseline, agent access, and accountable reviewers before returning a written scope and readiness decision. No payment has been collected. If the pilot fits, the $500 first installment follows written scope acceptance; the $1,000 balance is due only after acceptance.</p></div>;
  return <form className="intake-form" onSubmit={submit}>
    <input type="hidden" name="access_key" value="0a422ed4-1385-48d0-95a9-60362ae551fc"/><input type="hidden" name="subject" value="AI Delivery Pilot intake"/><input type="checkbox" name="botcheck" className="hidden" style={{display:'none'}} tabIndex="-1" autoComplete="off"/>
    {fields.map(([name,label,placeholder,type])=><label key={name}>{label}{type==='textarea'?<textarea name={name} placeholder={placeholder} required rows="4"/>:<input name={name} type={type} placeholder={placeholder} required/>}</label>)}
    <label>Issue system<select name="issueSystem" required defaultValue=""><option value="" disabled>Select one</option>{['GitHub Issues','Jira','Linear','Other'].map(x=><option key={x}>{x}</option>)}</select></label>
    <label>Coding tool<select name="codingTool" required defaultValue=""><option value="" disabled>Select one</option>{['Codex','Claude Code','Cursor','GitHub Copilot','Other','None selected'].map(x=><option key={x}>{x}</option>)}</select></label>
    <label>Coding-agent access<select name="agentAccess" required defaultValue=""><option value="" disabled>Select one</option>{['Authenticated and permitted','Tool selected; setup needed','Not selected','Unknown'].map(x=><option key={x}>{x}</option>)}</select></label>
    <label>Timeline<select name="timeline" required defaultValue=""><option value="" disabled>Select one</option>{['Within 30 days','30–60 days','More than 60 days','Exploring'].map(x=><option key={x}>{x}</option>)}</select></label>
    <p className="disclosure">Submitting requests a no-payment scope review. It does not reserve work, authorize payment, or reserve one of the three founding-price pilots. A founding slot is accepted only after written scope acceptance and the $500 first installment. Calls are recorded for notes by default; you can opt out before the session.</p>
    {status==='error'&&<p role="alert" className="error">{message}</p>}<button className="btn btn-primary" disabled={status==='sending'}>{status==='sending'?'Sending…':'Request a scope review'}</button>
  </form>;
}
