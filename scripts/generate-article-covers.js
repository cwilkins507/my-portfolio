import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const outDir = path.resolve('public/images/articles');

const covers = [
  {
    slug: 'how-to-know-if-your-business-is-ready-for-ai',
    pillar: 'AI-Powered Engineering Teams',
    title: 'AI Readiness',
    alt: 'Four-level AI readiness spectrum moving from individual experimentation to governed team adoption.',
    accent: '#7dd3fc',
    motif: 'spectrum',
  },
  {
    slug: 'ai-agent-harness',
    pillar: 'AI Agents in Practice',
    title: 'Agent Harness',
    alt: 'AI agent harness diagram showing guides, sensors, tools, memory, and verification around a language model.',
    accent: '#38bdf8',
    motif: 'hub',
  },
  {
    slug: 'claude-code-productivity-paradox',
    pillar: 'Engineering Leadership',
    title: 'Productivity Paradox',
    alt: 'Productivity paradox visual contrasting faster individual AI coding with flat organizational throughput.',
    accent: '#fbbf24',
    motif: 'shift',
  },
  {
    slug: 'context-engineering-ai-coding-tools',
    pillar: 'AI Agents in Practice',
    title: 'Context Engineering',
    alt: 'Context engineering cover showing layered project context feeding an AI coding assistant.',
    accent: '#818cf8',
    motif: 'layers',
  },
  {
    slug: 'doe-framework-claude-skills',
    pillar: 'AI Agents in Practice',
    title: 'DOE and Skills',
    alt: 'DOE framework and Claude Skills visual showing orchestration layers for agent workflows.',
    accent: '#c084fc',
    motif: 'pipeline',
  },
  {
    slug: 'kimi-k2-6-vs-glm-5-1-vs-claude-opus-4-7',
    pillar: 'AI-Powered Engineering Teams',
    title: 'Coding Wars 2.0',
    alt: 'Coding model comparison visual for Kimi K2.6, GLM-5.1, and Claude Opus 4.7.',
    accent: '#a78bfa',
    motif: 'matrix',
  },
  {
    slug: 'llm-gateway-architecture',
    pillar: 'System Design for Scale',
    title: 'LLM Gateway',
    alt: 'LLM gateway architecture diagram showing routing, policy, observability, and model provider boundaries.',
    accent: '#22d3ee',
    motif: 'nodes',
  },
  {
    slug: 'managing-engineering-teams-with-ai',
    pillar: 'Engineering Leadership',
    title: 'AI Management',
    alt: 'Engineering management in the AI era visual showing the supervision gap between AI output and human review.',
    accent: '#f472b6',
    motif: 'review',
  },
  {
    slug: 'taste-is-a-moat',
    pillar: 'Engineering Leadership',
    title: 'Taste Is a Moat',
    alt: 'Taste is a moat visual representing human judgment, craft, and selection in an AI-heavy world.',
    accent: '#e879f9',
    motif: 'spectrum',
  },
  {
    slug: 'ai-automation-roi-service-business',
    pillar: 'Automation Architecture',
    title: 'Automation ROI',
    alt: 'Automation ROI model showing time, volume, exception rate, and tool cost converging into a decision point.',
    accent: '#fbbf24',
    motif: 'roi',
  },
  {
    slug: 'automation-cost-small-business',
    pillar: 'Automation Architecture',
    title: 'Automation Cost',
    alt: 'Three automation cost tiers comparing do-it-yourself tools, professional platforms, and custom systems.',
    accent: '#34d399',
    motif: 'tiers',
  },
  {
    slug: 'service-business-automations',
    pillar: 'Automation Architecture',
    title: 'Service Automations',
    alt: 'Five connected service business workflows for leads, proposals, onboarding, delivery, and follow-up.',
    accent: '#fb7185',
    motif: 'workflow',
  },
  {
    slug: '3-automations-that-run-without-me',
    pillar: 'Automation Architecture',
    title: 'Always-On Systems',
    alt: 'Three autonomous automation loops running without manual intervention.',
    accent: '#a78bfa',
    motif: 'loops',
  },
  {
    slug: 'ai-agent-workflow-claude-code',
    pillar: 'AI Agents in Practice',
    title: 'Daily Agent Workflow',
    alt: 'Terminal-first AI agent workflow connecting instructions, tools, memory, and review.',
    accent: '#60a5fa',
    motif: 'terminal',
  },
  {
    slug: 'ai-agent-content-pipeline-experiment',
    pillar: 'AI Agents in Practice',
    title: 'Agent Content Pipeline',
    alt: 'AI content pipeline moving from research to drafting, polishing, scoring, and publishing.',
    accent: '#f472b6',
    motif: 'pipeline',
  },
  {
    slug: 'intentional-ai-integration',
    pillar: 'AI-Powered Engineering Teams',
    title: 'Intentional Integration',
    alt: 'AI coding integration guarded by conventions, review, and architecture boundaries.',
    accent: '#22d3ee',
    motif: 'guardrails',
  },
  {
    slug: 'from-vibe-coding-to-agentic-engineering',
    pillar: 'AI Agents in Practice',
    title: 'Agentic Engineering',
    alt: 'Shift from prompt-first coding to orchestrated agentic engineering workflows.',
    accent: '#c084fc',
    motif: 'shift',
  },
  {
    slug: 'ai-code-review-best-practices-approaches-tools',
    pillar: 'AI-Powered Engineering Teams',
    title: 'AI Code Review',
    alt: 'AI-assisted code review flow with local checks, continuous integration, and human approval.',
    accent: '#f97316',
    motif: 'review',
  },
  {
    slug: 'ai-model-selection',
    pillar: 'AI-Powered Engineering Teams',
    title: 'Model Selection',
    alt: 'Model selection matrix matching task complexity to model capability and cost.',
    accent: '#2dd4bf',
    motif: 'matrix',
  },
  {
    slug: 'context-engineering',
    pillar: 'AI Agents in Practice',
    title: 'Context Engineering',
    alt: 'Four-layer context engineering stack for better AI coding sessions.',
    accent: '#818cf8',
    motif: 'layers',
  },
  {
    slug: 'structured-output',
    pillar: 'System Design for Scale',
    title: 'Structured Outputs',
    alt: 'Validated structured output path turning language model responses into reliable pipeline data.',
    accent: '#4ade80',
    motif: 'schema',
  },
  {
    slug: 'mcp',
    pillar: 'AI Agents in Practice',
    title: 'MCP',
    alt: 'Model Context Protocol hub connecting AI tools to secure external capabilities.',
    accent: '#38bdf8',
    motif: 'hub',
  },
  {
    slug: 'n8n',
    pillar: 'Automation Architecture',
    title: 'n8n Patterns',
    alt: 'Observable n8n automation pattern connecting triggers, workflow steps, and delivery systems.',
    accent: '#f43f5e',
    motif: 'nodes',
  },
  {
    slug: 'ai-assisted-coding-pt2',
    pillar: 'AI-Powered Engineering Teams',
    title: 'AI Coding Limits',
    alt: 'AI coding assistant workflow showing capability, guardrails, observability, and review limits.',
    accent: '#60a5fa',
    motif: 'guardrails',
  },
  {
    slug: 'ai-assisted-coding',
    pillar: 'AI-Powered Engineering Teams',
    title: 'AI-Assisted Coding',
    alt: 'AI-assisted coding workflow connecting developer intent, generated code, and human review.',
    accent: '#38bdf8',
    motif: 'terminal',
  },
  {
    slug: 'ai-coding-model-wars-2026',
    pillar: 'AI-Powered Engineering Teams',
    title: 'Model Wars',
    alt: 'AI coding model comparison matrix showing model capability, cost, and workflow fit.',
    accent: '#a78bfa',
    motif: 'matrix',
  },
  {
    slug: 'architecture-as-code',
    pillar: 'System Design for Scale',
    title: 'Architecture as Code',
    alt: 'Architecture-as-code visual showing diagrams, source control, review, and system documentation.',
    accent: '#fbbf24',
    motif: 'layers',
  },
  {
    slug: 'automate-saas-signup-flow-weekend',
    pillar: 'Automation Architecture',
    title: 'Signup Automation',
    alt: 'SaaS signup automation flow connecting form submission, CRM capture, notifications, and onboarding.',
    accent: '#34d399',
    motif: 'workflow',
  },
  {
    slug: 'aws-lambda-practices',
    pillar: 'System Design for Scale',
    title: 'Lambda Practices',
    alt: 'Serverless architecture pattern showing event queues, Lambda compute, retries, and failure handling.',
    accent: '#f97316',
    motif: 'nodes',
  },
  {
    slug: 'bgp',
    pillar: 'System Design for Scale',
    title: 'BGP Anomalies',
    alt: 'Network routing visual showing autonomous systems, route paths, and anomaly detection.',
    accent: '#22d3ee',
    motif: 'hub',
  },
  {
    slug: 'changing-landscape',
    pillar: 'AI-Powered Engineering Teams',
    title: 'AI Landscape',
    alt: 'Changing AI landscape visual showing shifting layers of tools, teams, governance, and workflows.',
    accent: '#c084fc',
    motif: 'shift',
  },
  {
    slug: 'cli-agents',
    pillar: 'AI Agents in Practice',
    title: 'CLI Agents',
    alt: 'Command-line AI agent interface connected to tools, files, and execution steps.',
    accent: '#4ade80',
    motif: 'terminal',
  },
  {
    slug: 'crm-no-code',
    pillar: 'Automation Architecture',
    title: 'CRM Integration',
    alt: 'No-code CRM integration pattern connecting forms, contacts, enrichment, and follow-up systems.',
    accent: '#fb7185',
    motif: 'workflow',
  },
  {
    slug: 'design-patterns',
    pillar: 'System Design for Scale',
    title: 'Design Patterns',
    alt: 'Software design patterns visual showing reusable components arranged into a maintainable system.',
    accent: '#818cf8',
    motif: 'layers',
  },
  {
    slug: 'enterprise-best-practices',
    pillar: 'AI-Powered Engineering Teams',
    title: 'Enterprise AI Practices',
    alt: 'Enterprise AI engineering practice stack showing prompts, reviews, guardrails, and delivery controls.',
    accent: '#2dd4bf',
    motif: 'guardrails',
  },
  {
    slug: 'jpa',
    pillar: 'System Design for Scale',
    title: 'JPA / Hibernate',
    alt: 'Data access architecture visual connecting application models, ORM mapping, queries, and database boundaries.',
    accent: '#f59e0b',
    motif: 'schema',
  },
  {
    slug: 'lessons-learned-2025',
    pillar: 'Engineering Leadership',
    title: 'Lessons Learned',
    alt: 'Engineering lessons visual showing a path of decisions, feedback loops, and accumulated judgment.',
    accent: '#e879f9',
    motif: 'loops',
  },
  {
    slug: 'lessons-learned-2026',
    pillar: 'Engineering Leadership',
    title: 'Lessons Learned',
    alt: 'Engineering leadership lessons visual showing connected decisions, reflection, and accumulated judgment.',
    accent: '#f472b6',
    motif: 'loops',
  },
  {
    slug: 'microservice-redesign',
    pillar: 'System Design for Scale',
    title: 'Service Redesign',
    alt: 'Microservice redesign visual showing service boundaries, contracts, and integration paths.',
    accent: '#38bdf8',
    motif: 'hub',
  },
  {
    slug: 'no-code-automation-stack',
    pillar: 'Automation Architecture',
    title: 'No-Code Stack',
    alt: 'No-code automation stack visual connecting tools, workflow logic, data, and human approval.',
    accent: '#f43f5e',
    motif: 'tiers',
  },
  {
    slug: 'no-code',
    pillar: 'Automation Architecture',
    title: 'No-Code Development',
    alt: 'No-code development visual showing reusable blocks connected into a governed business workflow.',
    accent: '#fb7185',
    motif: 'nodes',
  },
  {
    slug: 'prompt-engineering',
    pillar: 'AI-Powered Engineering Teams',
    title: 'Prompt Engineering',
    alt: 'Prompt engineering visual showing instructions, examples, constraints, and model output flowing together.',
    accent: '#7dd3fc',
    motif: 'pipeline',
  },
  {
    slug: 'sql-optimization',
    pillar: 'System Design for Scale',
    title: 'SQL Optimization',
    alt: 'SQL optimization visual showing query paths, indexes, execution analysis, and performance tuning.',
    accent: '#34d399',
    motif: 'matrix',
  },
  {
    slug: 'system-design-best-practices',
    pillar: 'System Design for Scale',
    title: 'System Design',
    alt: 'System design visual showing scalable components, boundaries, reliability paths, and data flow.',
    accent: '#60a5fa',
    motif: 'hub',
  },
  {
    slug: 'terraform',
    pillar: 'System Design for Scale',
    title: 'Terraform and IaC',
    alt: 'Infrastructure-as-code visual showing Terraform configuration, cloud resources, and deployment workflow.',
    accent: '#a78bfa',
    motif: 'layers',
  },
];

function node(x, y, r, color = 'var(--accent)') {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="0.95"/>`;
}

function line(x1, y1, x2, y2, color = 'var(--muted)') {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="4" stroke-linecap="round" opacity="0.75"/>`;
}

function card(x, y, w, h, extra = '') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.16)" stroke-width="2" ${extra}/>`;
}

function motif(name) {
  switch (name) {
    case 'spectrum':
      return `${card(245, 290, 850, 250)}${[0, 1, 2, 3].map((i) => `${line(360 + i * 170, 425, 500 + i * 170, 425)}${node(330 + i * 170, 425, 32)}`).join('')}<path d="M330 500 C470 360 640 360 780 500 S1010 640 1120 470" fill="none" stroke="var(--accent)" stroke-width="6" opacity="0.8"/>`;
    case 'roi':
      return `${card(260, 250, 780, 360)}${[0, 1, 2, 3].map((i) => `${card(330 + i * 145, 330, 92, 120)}${line(422 + i * 145, 390, 880, 430)}`).join('')}${node(900, 430, 48)}<path d="M850 500 L945 500 L900 555 Z" fill="var(--accent)" opacity="0.88"/>`;
    case 'tiers':
      return `${[0, 1, 2].map((i) => `${card(310 + i * 220, 350 - i * 48, 160, 210 + i * 48)}${node(390 + i * 220, 318 - i * 48, 24)}`).join('')}${line(300, 590, 1010, 590, 'var(--accent)')}`;
    case 'workflow':
      return `${[0, 1, 2, 3, 4].map((i) => `${i ? line(315 + (i - 1) * 165, 430, 405 + (i - 1) * 165, 430) : ''}${node(270 + i * 165, 430, 36)}${card(220 + i * 165, 495, 100, 60)}`).join('')}`;
    case 'loops':
      return `${[0, 1, 2].map((i) => `<path d="M${350 + i * 180} 360 C${250 + i * 180} 430 ${300 + i * 180} 560 ${420 + i * 180} 540 C${535 + i * 180} 520 ${540 + i * 180} 365 ${425 + i * 180} 355" fill="none" stroke="var(--accent)" stroke-width="7" opacity="${0.9 - i * 0.15}"/>${node(425 + i * 180, 355, 20)}`).join('')}`;
    case 'terminal':
      return `${card(260, 260, 820, 420)}<rect x="300" y="310" width="740" height="56" rx="12" fill="rgba(0,0,0,0.28)"/>${[0, 1, 2, 3].map((i) => `<path d="M330 ${425 + i * 52} L430 ${425 + i * 52}" stroke="var(--accent)" stroke-width="7" stroke-linecap="round"/><path d="M470 ${425 + i * 52} L760 ${425 + i * 52}" stroke="rgba(255,255,255,0.34)" stroke-width="7" stroke-linecap="round"/>`).join('')}${node(900, 520, 44)}`;
    case 'pipeline':
      return `${[0, 1, 2, 3].map((i) => `${card(250 + i * 190, 330 + (i % 2) * 70, 130, 92)}${i ? line(250 + i * 190, 376 + (i % 2) * 70, 380 + (i - 1) * 190, 376 + ((i - 1) % 2) * 70) : ''}`).join('')}<path d="M285 575 C480 650 750 650 965 555" fill="none" stroke="var(--accent)" stroke-width="6" opacity="0.8"/>`;
    case 'guardrails':
      return `${card(320, 270, 700, 390)}${line(410, 310, 410, 620, 'var(--accent)')}${line(930, 310, 930, 620, 'var(--accent)')}<path d="M505 440 C600 350 730 350 835 440 C735 535 600 535 505 440Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" stroke-width="3"/>${node(670, 440, 52)}`;
    case 'shift':
      return `${card(240, 310, 300, 250)}${card(800, 310, 300, 250)}<path d="M590 435 L750 435" stroke="var(--accent)" stroke-width="10" stroke-linecap="round"/><path d="M715 390 L760 435 L715 480" fill="none" stroke="var(--accent)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>${node(390, 435, 34)}${node(895, 390, 24)}${node(960, 480, 24)}${line(895,390,960,480)}`;
    case 'review':
      return `${card(280, 270, 760, 390)}<path d="M420 470 L540 590 L850 330" fill="none" stroke="var(--accent)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M380 350 L620 350 M380 410 L560 410 M690 560 L890 560" stroke="rgba(255,255,255,0.32)" stroke-width="8" stroke-linecap="round"/>`;
    case 'matrix':
      return `${card(300, 280, 720, 390)}${[0, 1, 2, 3].map((i) => `${line(420 + i * 120, 320, 420 + i * 120, 630)}${line(340, 390 + i * 65, 980, 390 + i * 65)}`).join('')}<path d="M380 580 C520 510 625 440 760 380 S920 315 985 315" fill="none" stroke="var(--accent)" stroke-width="7"/>${node(760,380,22)}`;
    case 'layers':
      return `${[0, 1, 2, 3].map((i) => `<path d="M670 ${300 + i * 75} L940 ${420 + i * 75} L670 ${540 + i * 75} L400 ${420 + i * 75}Z" fill="rgba(255,255,255,${0.05 + i * 0.02})" stroke="${i === 3 ? 'var(--accent)' : 'rgba(255,255,255,0.17)'}" stroke-width="3"/>`).join('')}`;
    case 'schema':
      return `${card(260, 270, 820, 380)}${[0, 1, 2].map((i) => `<rect x="${350 + i * 170}" y="${350 + i * 55}" width="360" height="36" rx="18" fill="${i === 1 ? 'var(--accent)' : 'rgba(255,255,255,0.18)'}" opacity="${i === 1 ? '0.75' : '1'}"/>`).join('')}<path d="M870 390 L940 460 L870 530" fill="none" stroke="var(--accent)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
    case 'hub':
      return `${node(670, 455, 64)}${[0, 1, 2, 3, 4, 5].map((i) => { const a = Math.PI * 2 * i / 6; const x = 670 + Math.cos(a) * 245; const y = 455 + Math.sin(a) * 160; return `${line(670, 455, x, y)}${node(x, y, 30)}`; }).join('')}`;
    case 'nodes':
      return `${[0, 1, 2, 3, 4, 5].map((i) => { const x = 300 + (i % 3) * 260; const y = 340 + Math.floor(i / 3) * 180; return `${card(x, y, 150, 78)}${i ? line(x, y + 39, x - 110, y - 55) : ''}${node(x + 30, y + 39, 16)}`; }).join('')}<path d="M810 525 C900 520 990 575 1030 645" fill="none" stroke="var(--accent)" stroke-width="7" stroke-linecap="round"/>`;
    default:
      return node(670, 455, 80);
  }
}

function label(x, y, value, size = 22, color = 'rgba(255,255,255,0.78)', weight = 700) {
  return `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-weight="${weight}" letter-spacing="0">${value}</text>`;
}

function smallLabel(x, y, value, color = 'rgba(255,255,255,0.5)') {
  return label(x, y, value, 16, color, 700);
}

function conceptBox(x, y, w, h, title, detail = '', color = 'var(--accent)', fill = 'rgba(255,255,255,0.06)') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${color}" stroke-width="2" opacity="0.95"/>
  ${label(x + 20, y + 34, title, 19, 'rgba(255,255,255,0.86)')}
  ${detail ? label(x + 20, y + 62, detail, 14, 'rgba(255,255,255,0.48)', 600) : ''}`;
}

function conceptLine(x1, y1, x2, y2, color = 'var(--accent)', width = 4) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" opacity="0.78"/>`;
}

function conceptArrow(x1, y1, x2, y2, color = 'var(--accent)', width = 4) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const a1 = angle + Math.PI * 0.82;
  const a2 = angle - Math.PI * 0.82;
  const len = 16;
  const p1 = `${x2 + Math.cos(a1) * len},${y2 + Math.sin(a1) * len}`;
  const p2 = `${x2 + Math.cos(a2) * len},${y2 + Math.sin(a2) * len}`;
  return `${conceptLine(x1, y1, x2, y2, color, width)}<polyline points="${p1} ${x2},${y2} ${p2}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="0.78"/>`;
}

function concept(cover) {
  switch (cover.slug) {
    case 'context-engineering':
      return `<g transform="translate(245 192)">
        ${['Layer 4: Session Context', 'Layer 3: File-Level Docs', 'Layer 2: Instruction Files', 'Layer 1: Project Structure'].map((title, i) => {
          const colors = ['#64748b', '#2dd4bf', '#60a5fa', '#818cf8'];
          const details = ['conversation history, open files', 'comments, names, types', 'CLAUDE.md, rules, conventions', 'folders, boundaries, co-location'];
          return `<rect x="0" y="${i * 78}" width="710" height="58" rx="10" fill="${i === 0 ? 'rgba(100,116,139,0.12)' : 'rgba(255,255,255,0.07)'}" stroke="${colors[i]}" stroke-width="2" ${i === 0 ? 'stroke-dasharray="8 6"' : ''}/>
            <rect x="0" y="${i * 78}" width="8" height="58" rx="4" fill="${colors[i]}"/>
            ${label(26, i * 78 + 26, title, 20, 'rgba(255,255,255,0.88)')}
            ${label(26, i * 78 + 48, details[i], 13, 'rgba(255,255,255,0.46)', 600)}`;
        }).join('')}
        ${conceptLine(750, 92, 750, 286, '#98c379', 5)}
        ${smallLabel(780, 195, 'persistent substrate', '#98c379')}
        ${smallLabel(780, 36, 'resets', '#94a3b8')}
      </g>`;
    case 'context-engineering-ai-coding-tools':
      return `<g transform="translate(185 196)">
        ${conceptBox(0, 0, 190, 76, 'Instructions', 'CLAUDE.md, rules', '#818cf8')}
        ${conceptBox(0, 104, 190, 76, 'Codebase Shape', 'folders, ownership', '#60a5fa')}
        ${conceptBox(0, 208, 190, 76, 'Evidence', 'tests, docs, traces', '#2dd4bf')}
        ${conceptArrow(190, 38, 405, 142, '#818cf8', 3)}
        ${conceptArrow(190, 142, 405, 142, '#60a5fa', 3)}
        ${conceptArrow(190, 246, 405, 142, '#2dd4bf', 3)}
        <rect x="405" y="72" width="210" height="140" rx="18" fill="rgba(129,140,248,0.16)" stroke="#818cf8" stroke-width="3"/>
        ${label(442, 128, 'Context Pack', 24)}
        ${label(445, 158, 'what the model sees', 15, 'rgba(255,255,255,0.5)', 600)}
        ${conceptArrow(615, 142, 760, 142, '#818cf8', 5)}
        ${conceptBox(760, 62, 205, 160, 'Coding Agent', 'smaller prompt, better output', '#38bdf8', 'rgba(56,189,248,0.1)')}
        <path d="M800 178 L925 178 M800 202 L890 202" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" opacity="0.75"/>
      </g>`;
    case 'llm-gateway-architecture':
      return `<g transform="translate(145 190)">
        ${['Service A', 'Service B', 'Service C'].map((t, i) => conceptBox(0, i * 92, 165, 58, t, '', '#94a3b8', 'rgba(255,255,255,0.05)')).join('')}
        ${[0, 1, 2].map((i) => conceptArrow(165, i * 92 + 29, 365, 120, '#22d3ee', 3)).join('')}
        <rect x="365" y="40" width="230" height="160" rx="18" fill="rgba(34,211,238,0.16)" stroke="#22d3ee" stroke-width="3"/>
        ${label(425, 95, 'LLM Gateway', 25)}
        ${label(418, 128, 'routing', 15, 'rgba(255,255,255,0.58)', 700)}
        ${label(418, 152, 'policy + fallback', 15, 'rgba(255,255,255,0.58)', 700)}
        ${label(418, 176, 'cost + observability', 15, 'rgba(255,255,255,0.58)', 700)}
        ${['Anthropic', 'OpenAI', 'Bedrock', 'Azure'].map((t, i) => conceptBox(780, i * 72, 180, 52, t, '', '#94a3b8', 'rgba(255,255,255,0.05)')).join('')}
        ${[0, 1, 2, 3].map((i) => conceptArrow(595, 120, 780, i * 72 + 26, '#22d3ee', 3)).join('')}
      </g>`;
    case 'claude-code-productivity-paradox':
      return `<g transform="translate(230 195)">
        <rect x="0" y="0" width="760" height="310" rx="18" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
        ${conceptLine(70, 255, 700, 255, 'rgba(255,255,255,0.25)', 3)}
        ${conceptLine(70, 255, 70, 40, 'rgba(255,255,255,0.25)', 3)}
        <path d="M90 235 C205 214 305 160 420 92 S612 45 690 34" fill="none" stroke="#60a5fa" stroke-width="8" stroke-linecap="round"/>
        <path d="M90 220 C232 218 366 218 505 218 S625 218 690 218" fill="none" stroke="#fbbf24" stroke-width="8" stroke-linecap="round"/>
        <rect x="470" y="122" width="148" height="118" rx="12" fill="rgba(251,191,36,0.14)" stroke="#fbbf24" stroke-width="2"/>
        ${label(492, 168, 'review', 22, '#fde68a')}
        ${label(492, 196, 'bottleneck', 22, '#fde68a')}
        ${smallLabel(145, 78, 'individual output', '#93c5fd')}
        ${smallLabel(140, 206, 'team throughput', '#fde68a')}
      </g>`;
    case 'ai-agent-harness':
      return `<g transform="translate(150 174)">
        <rect x="350" y="10" width="520" height="330" rx="20" fill="rgba(56,189,248,0.08)" stroke="#38bdf8" stroke-width="2" stroke-dasharray="9 7"/>
        ${smallLabel(555, 45, 'harness', '#7dd3fc')}
        ${conceptBox(0, 30, 250, 58, 'User Request', '', '#94a3b8')}
        ${conceptBox(0, 118, 250, 58, 'Agent Loop', 'acts, observes, repeats', '#60a5fa')}
        ${conceptBox(0, 206, 250, 58, 'Model', 'the brain', '#2dd4bf')}
        ${conceptArrow(125, 88, 125, 118, '#94a3b8', 3)}
        ${conceptArrow(125, 176, 125, 206, '#94a3b8', 3)}
        ${['Instructions', 'Permissions', 'Tools', 'Memory', 'Verification'].map((t, i) => conceptBox(390 + (i % 2) * 235, 72 + Math.floor(i / 2) * 82, 205, 54, t, '', ['#c084fc', '#fbbf24', '#38bdf8', '#4ade80', '#fb7185'][i], 'rgba(255,255,255,0.055)')).join('')}
        ${[0, 1, 2, 3, 4].map((i) => conceptArrow(390 + (i % 2) * 235, 99 + Math.floor(i / 2) * 82, 250, 147, ['#c084fc', '#fbbf24', '#38bdf8', '#4ade80', '#fb7185'][i], 2)).join('')}
      </g>`;
    case 'taste-is-a-moat':
      return `<g transform="translate(230 182)">
        <rect x="0" y="130" width="745" height="150" rx="18" fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
        ${[0, 1, 2, 3, 4].map((i) => `<circle cx="${95 + i * 118}" cy="${205 + (i % 2 ? -38 : 30)}" r="32" fill="rgba(232,121,249,${0.22 - i * 0.025})" stroke="${i === 3 ? '#e879f9' : 'rgba(255,255,255,0.22)'}" stroke-width="${i === 3 ? 4 : 2}"/>`).join('')}
        ${conceptArrow(108, 205, 555, 168, '#e879f9', 3)}
        <path d="M600 117 C658 155 665 226 610 270 C672 252 717 214 735 165" fill="none" stroke="#e879f9" stroke-width="7" stroke-linecap="round"/>
        ${label(60, 86, 'many acceptable outputs', 22, 'rgba(255,255,255,0.64)')}
        ${label(586, 94, 'chosen', 24, '#f0abfc')}
        ${label(586, 320, 'judgment is the filter', 20, 'rgba(255,255,255,0.72)')}
      </g>`;
    case 'managing-engineering-teams-with-ai':
      return `<g transform="translate(230 190)">
        <rect x="0" y="0" width="760" height="320" rx="18" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
        ${conceptLine(70, 260, 700, 260, 'rgba(255,255,255,0.25)', 3)}
        ${conceptLine(70, 260, 70, 50, 'rgba(255,255,255,0.25)', 3)}
        <path d="M95 238 C200 215 322 170 425 100 S615 42 690 34" fill="none" stroke="#f472b6" stroke-width="8" stroke-linecap="round"/>
        <path d="M95 238 C245 232 390 227 690 220" fill="none" stroke="#4ade80" stroke-width="8" stroke-linecap="round"/>
        <path d="M560 60 L560 220" stroke="#fbbf24" stroke-width="3" stroke-dasharray="8 7"/>
        <rect x="585" y="106" width="130" height="84" rx="12" fill="rgba(251,191,36,0.14)" stroke="#fbbf24" stroke-width="2"/>
        ${label(604, 140, 'review', 20, '#fde68a')}
        ${label(604, 166, 'debt', 20, '#fde68a')}
        ${smallLabel(120, 82, 'AI output', '#f9a8d4')}
        ${smallLabel(120, 220, 'review capacity', '#86efac')}
      </g>`;
    case 'doe-framework-claude-skills':
      return `<g transform="translate(170 185)">
        ${conceptBox(0, 34, 210, 76, 'Directive', 'skills, prompts, SOPs', '#c084fc')}
        ${conceptBox(0, 144, 210, 76, 'Orchestration', 'agents, routing, state', '#60a5fa')}
        ${conceptBox(0, 254, 210, 76, 'Execution', 'tools, scripts, APIs', '#4ade80')}
        ${conceptArrow(210, 72, 440, 72, '#c084fc', 3)}
        ${conceptArrow(210, 182, 440, 182, '#60a5fa', 3)}
        ${conceptArrow(210, 292, 440, 292, '#4ade80', 3)}
        <rect x="440" y="18" width="230" height="300" rx="18" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.16)" stroke-width="2"/>
        ${label(496, 82, 'Claude Code', 25)}
        ${label(500, 125, 'local harness', 16, 'rgba(255,255,255,0.5)', 700)}
        ${label(500, 186, 'Chat', 25)}
        ${label(500, 229, 'throwaway thinking', 16, 'rgba(255,255,255,0.5)', 700)}
        ${label(500, 290, 'Cowork', 25)}
        ${conceptBox(745, 112, 210, 112, 'Outer Loop', 'audits, memory, changelog', '#fbbf24', 'rgba(251,191,36,0.1)')}
        ${conceptArrow(670, 168, 745, 168, '#fbbf24', 4)}
      </g>`;
    case 'kimi-k2-6-vs-glm-5-1-vs-claude-opus-4-7':
      return `<g transform="translate(210 190)">
        <rect x="0" y="0" width="800" height="320" rx="18" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
        ${conceptLine(85, 260, 705, 260, 'rgba(255,255,255,0.24)', 3)}
        ${conceptLine(85, 260, 85, 45, 'rgba(255,255,255,0.24)', 3)}
        ${[['Kimi K2.6', 210, 222, '#4ade80'], ['GLM-5.1', 365, 214, '#2dd4bf'], ['Opus 4.7', 610, 78, '#a78bfa']].map(([name, x, y, color]) => `<circle cx="${x}" cy="${y}" r="24" fill="${color}" opacity="0.95"/><text x="${x - 42}" y="${y - 36}" fill="rgba(255,255,255,0.82)" font-size="18" font-weight="700">${name}</text>`).join('')}
        <rect x="120" y="55" width="180" height="46" rx="10" fill="rgba(74,222,128,0.12)" stroke="#4ade80" stroke-width="2"/>
        ${label(144, 84, 'cheap lane', 18, '#bbf7d0')}
        <rect x="510" y="145" width="190" height="46" rx="10" fill="rgba(167,139,250,0.12)" stroke="#a78bfa" stroke-width="2"/>
        ${label(535, 174, 'escalation lane', 18, '#ddd6fe')}
        ${smallLabel(92, 296, 'lower cost', '#94a3b8')}
        ${smallLabel(640, 296, 'higher cost', '#94a3b8')}
        ${smallLabel(18, 54, 'harder tasks', '#94a3b8')}
      </g>`;
    case 'ai-code-review-best-practices-approaches-tools':
      return `<g transform="translate(100 220)">
        ${conceptBox(0, 70, 170, 72, 'Developer', 'opens PR', '#94a3b8')}
        ${conceptArrow(170, 106, 270, 106, '#f97316', 4)}
        ${conceptBox(270, 48, 205, 116, 'CI AI Review', 'summary, risk tags, inline comments', '#f97316', 'rgba(249,115,22,0.12)')}
        ${conceptArrow(475, 106, 610, 106, '#f97316', 4)}
        ${conceptBox(610, 70, 185, 72, 'Human Review', 'intent + design', '#60a5fa')}
        ${conceptArrow(795, 106, 910, 106, '#4ade80', 4)}
        ${conceptBox(910, 70, 115, 72, 'Merge', '', '#4ade80')}
        <rect x="330" y="210" width="300" height="70" rx="14" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.16)" stroke-width="2"/>
        ${label(355, 250, 'AI handles surface area', 20)}
        ${label(700, 250, 'Humans own risk', 20)}
      </g>`;
    case 'ai-model-selection':
      return `<g transform="translate(180 192)">
        <rect x="0" y="0" width="840" height="310" rx="18" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
        ${['1. Define task', '2. Assess complexity', '3. Choose pattern', '4. Select model', '5. Test result'].map((t, i) => `${conceptBox(45 + i * 155, 76 + (i % 2) * 72, 135, 58, t, '', ['#60a5fa', '#818cf8', '#f472b6', '#fbbf24', '#4ade80'][i], 'rgba(255,255,255,0.05)')}${i ? conceptArrow(45 + i * 155 - 20, 105 + ((i - 1) % 2) * 72, 45 + i * 155, 105 + (i % 2) * 72, '#2dd4bf', 3) : ''}`).join('')}
        <path d="M70 255 C240 232 390 228 560 196 S712 130 785 70" fill="none" stroke="#2dd4bf" stroke-width="6" stroke-linecap="round"/>
        ${smallLabel(70, 282, 'simpler, cheaper', '#99f6e4')}
        ${smallLabel(640, 58, 'harder, smarter', '#99f6e4')}
      </g>`;
    case 'intentional-ai-integration':
      return `<g transform="translate(205 178)">
        ${['AI generates code', 'PR review approves', 'Merged as pattern', 'Next AI session copies it'].map((t, i) => {
          const x = [330, 590, 330, 70][i];
          const y = [0, 130, 260, 130][i];
          return conceptBox(x, y, 210, 70, t, '', ['#22d3ee', '#fbbf24', '#4ade80', '#fb7185'][i]);
        }).join('')}
        ${conceptArrow(540, 35, 590, 160, '#22d3ee', 3)}
        ${conceptArrow(590, 200, 540, 295, '#fbbf24', 3)}
        ${conceptArrow(330, 295, 280, 165, '#4ade80', 3)}
        ${conceptArrow(280, 130, 330, 35, '#fb7185', 3)}
        <rect x="705" y="85" width="230" height="160" rx="18" fill="rgba(34,211,238,0.1)" stroke="#22d3ee" stroke-width="3"/>
        ${label(742, 136, 'Convention File', 24)}
        ${label(746, 172, 'blessed patterns', 16, 'rgba(255,255,255,0.54)', 700)}
        ${label(746, 198, 'anti-patterns', 16, 'rgba(255,255,255,0.54)', 700)}
      </g>`;
    case 'structured-output':
      return `<g transform="translate(105 230)">
        ${conceptBox(0, 50, 160, 72, 'LLM Text', 'untrusted', '#94a3b8')}
        ${conceptArrow(160, 86, 270, 86, '#4ade80', 4)}
        ${conceptBox(270, 50, 165, 72, 'Parse JSON', '', '#60a5fa')}
        ${conceptArrow(435, 86, 555, 86, '#4ade80', 4)}
        ${conceptBox(555, 28, 205, 116, 'Validate Schema', 'reject, repair, retry', '#4ade80', 'rgba(74,222,128,0.12)')}
        ${conceptArrow(760, 86, 885, 86, '#4ade80', 4)}
        ${conceptBox(885, 50, 165, 72, 'Trusted Data', 'pipeline safe', '#4ade80')}
        <path d="M650 144 C650 230 400 230 400 122" fill="none" stroke="#fb7185" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 7"/>
        ${smallLabel(490, 252, 'invalid output retries before storage', '#fda4af')}
      </g>`;
    case 'from-vibe-coding-to-agentic-engineering':
      return `<g transform="translate(145 186)">
        <rect x="0" y="48" width="430" height="230" rx="18" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
        ${label(74, 98, 'Vibe Coding', 28)}
        ${conceptBox(76, 130, 280, 50, 'Human writes prompt', '', '#c084fc')}
        ${conceptBox(76, 204, 280, 50, 'AI generates code', '', '#c084fc')}
        ${conceptArrow(216, 180, 216, 204, '#c084fc', 3)}
        ${conceptArrow(430, 164, 610, 164, '#c084fc', 7)}
        <rect x="610" y="0" width="430" height="330" rx="18" fill="rgba(96,165,250,0.08)" stroke="#60a5fa" stroke-width="2"/>
        ${label(684, 52, 'Agentic Engineering', 28)}
        ${['Agent A', 'Agent B', 'Agent C'].map((t, i) => conceptBox(665 + i * 115, 132, 88, 58, t, '', '#60a5fa')).join('')}
        ${conceptBox(720, 236, 210, 58, 'Human reviews output', '', '#4ade80')}
        ${[0, 1, 2].map((i) => conceptArrow(709 + i * 115, 190, 825, 236, '#60a5fa', 3)).join('')}
      </g>`;
    case 'automate-saas-signup-flow-weekend':
      return `<g transform="translate(125 222)">
        ${['Tally Form', 'Webhook', 'Process Lead', 'Notify Owner', 'Sheet + Email'].map((t, i) => `${conceptBox(i * 210, i % 2 ? 92 : 0, 160, 62, t, '', ['#94a3b8', '#34d399', '#60a5fa', '#fbbf24', '#4ade80'][i])}${i ? conceptArrow(i * 210 - 50, (i - 1) % 2 ? 123 : 31, i * 210, i % 2 ? 123 : 31, '#34d399', 4) : ''}`).join('')}
        <rect x="170" y="205" width="520" height="66" rx="16" fill="rgba(52,211,153,0.12)" stroke="#34d399" stroke-width="2"/>
        ${label(220, 247, 'form to response in 30 seconds', 24, '#bbf7d0')}
      </g>`;
    default:
      return '';
  }
}

function svg(cover) {
  const visual = concept(cover) || motif(cover.motif);
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${cover.alt}">
  <style>
    :root { --accent: ${cover.accent}; --muted: rgba(255,255,255,0.28); }
    svg { font-family: "DM Sans", Arial, sans-serif; }
  </style>
  <defs>
    <radialGradient id="glow" cx="50%" cy="48%" r="58%">
      <stop offset="0%" stop-color="${cover.accent}" stop-opacity="0.22"/>
      <stop offset="55%" stop-color="${cover.accent}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#08111f" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="rgba(255,255,255,0.16)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0.03)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#08111f"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <path d="M0 540 C190 475 330 605 520 535 C720 460 850 520 1200 410 L1200 630 L0 630Z" fill="rgba(255,255,255,0.035)"/>
  <path d="M110 110 H1090 V520" fill="none" stroke="url(#edge)" stroke-width="2"/>
  <text x="110" y="86" fill="${cover.accent}" font-size="24" font-weight="700" letter-spacing="0">${cover.pillar}</text>
  <text x="110" y="580" fill="rgba(255,255,255,0.82)" font-size="34" font-weight="700" letter-spacing="0">${cover.title}</text>
  ${visual}
</svg>`;
}

await fs.mkdir(outDir, { recursive: true });
const requestedSlugs = process.argv.slice(2);
const selectedCovers = requestedSlugs.length
  ? covers.filter((cover) => requestedSlugs.includes(cover.slug))
  : covers;

const missingSlugs = requestedSlugs.filter((slug) => !covers.some((cover) => cover.slug === slug));
if (missingSlugs.length) {
  throw new Error(`Unknown cover slug(s): ${missingSlugs.join(', ')}`);
}

for (const cover of selectedCovers) {
  await fs.writeFile(path.join(outDir, `${cover.slug}.svg`), svg(cover));
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const cover of selectedCovers) {
  const htmlPath = path.join(outDir, `${cover.slug}.svg`);
  await page.goto(`file://${htmlPath}`);
  await page.screenshot({ path: path.join(outDir, `${cover.slug}.png`), clip: { x: 0, y: 0, width: 1200, height: 630 } });
}
await browser.close();

console.log(`Generated ${selectedCovers.length} article covers in ${outDir}`);
