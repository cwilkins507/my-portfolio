import React, { useEffect, useMemo, useState } from 'react';
import JSZip from 'jszip';
import {
  AlertTriangle,
  Check,
  Clipboard,
  Copy,
  Download,
  FileText,
  Terminal,
} from 'lucide-react';

const toolOptions = [
  'Claude Code',
  'Codex',
  'Cursor',
  'Gemini CLI',
  'GitHub Copilot',
  'Mixed toolchain',
];

const projectTypes = [
  'Solo app',
  'Team repo',
  'Automation project',
  'Content or knowledge vault',
  'Client project',
];

const riskLevels = [
  'Toy or prototype',
  'Personal production',
  'Team production',
  'Client work',
  'Sensitive or regulated',
];

const autonomyLevels = [
  'Ask before edits',
  'Suggest patches only',
  'Edit with review',
  'Run tests and fix',
  'Autonomous within limits',
];

const neverOptions = [
  'Destructive git operations',
  'Deploys',
  'Editing secrets or env files',
  'Schema migrations',
  'Billing or payment changes',
  'Customer data changes',
  'Dependency upgrades',
  'Broad refactors',
  'Deleting files',
];

const verificationOptions = [
  'Unit tests',
  'Integration tests',
  'Lint',
  'Typecheck',
  'Browser check',
  'Screenshot check',
  'Code review agent',
  'Manual review only',
];

const failureOptions = [
  'Edits wrong files',
  'Skips tests',
  'Refactors too much',
  'Ignores existing conventions',
  'Produces generic code',
  'Misses security constraints',
  'Writes stale documentation',
  'Uses wrong tone or voice',
];

const collaborationOptions = [
  'Concise and direct',
  'Explain tradeoffs',
  'Challenge bad ideas',
  'Ask clarifying questions first',
  'Act decisively on small safe changes',
];

const memoryOptions = [
  'Nothing',
  'Handoff notes only',
  'Repeated mistakes',
  'Project conventions',
  'Decisions and open questions',
];

const questions = [
  {
    id: 'tools',
    label: 'Tools',
    title: 'Which tools should this harness support?',
    type: 'multi',
    options: toolOptions,
  },
  {
    id: 'projectType',
    label: 'Project',
    title: 'What kind of project is this for?',
    type: 'single',
    options: projectTypes,
  },
  {
    id: 'stack',
    label: 'Stack',
    title: 'What is the stack?',
    type: 'fields',
    fields: [
      ['primaryLanguage', 'Primary language', 'TypeScript, Python, unknown'],
      ['framework', 'Framework', 'Astro, Next.js, FastAPI, unknown'],
      ['packageManager', 'Package manager', 'npm, pnpm, uv, poetry, unknown'],
      ['infrastructure', 'Infrastructure or hosting', 'Vercel, AWS, static host, unknown'],
    ],
  },
  {
    id: 'commands',
    label: 'Commands',
    title: 'What commands should agents know?',
    type: 'fields',
    fields: [
      ['install', 'Install', 'npm install'],
      ['dev', 'Dev server', 'npm run dev'],
      ['test', 'Test', 'npm test or unknown'],
      ['lint', 'Lint or typecheck', 'npm run lint or npm run typecheck'],
      ['build', 'Build', 'npm run build'],
    ],
  },
  {
    id: 'risk',
    label: 'Risk',
    title: 'How risky is this project?',
    type: 'single',
    options: riskLevels,
  },
  {
    id: 'autonomy',
    label: 'Autonomy',
    title: 'How much autonomy should agents have?',
    type: 'single',
    options: autonomyLevels,
  },
  {
    id: 'never',
    label: 'Hard Stops',
    title: 'What should agents never do?',
    type: 'multi',
    options: neverOptions,
  },
  {
    id: 'verification',
    label: 'Verify',
    title: 'How should work be verified?',
    type: 'multi',
    options: verificationOptions,
  },
  {
    id: 'failures',
    label: 'Failure Modes',
    title: 'What usually goes wrong with AI in this project?',
    type: 'multi',
    options: failureOptions,
  },
  {
    id: 'collaboration',
    label: 'Style',
    title: 'How should the agent work with you?',
    type: 'single',
    options: collaborationOptions,
  },
  {
    id: 'memory',
    label: 'Carry Forward',
    title: 'What should carry forward between sessions?',
    type: 'single',
    options: memoryOptions,
  },
  {
    id: 'separateSoul',
    label: 'Style File',
    title: 'Do you want a separate operating-style file?',
    type: 'single',
    options: ['Yes, generate SOUL.md', 'No, keep style rules inside AGENTS.md'],
  },
];

const defaultAnswers = {
  tools: ['Codex'],
  projectType: 'Solo app',
  stack: {
    primaryLanguage: '',
    framework: '',
    packageManager: '',
    infrastructure: '',
  },
  commands: {
    install: '',
    dev: '',
    test: '',
    lint: '',
    build: '',
  },
  risk: 'Personal production',
  autonomy: 'Edit with review',
  never: [
    'Destructive git operations',
    'Deploys',
    'Editing secrets or env files',
    'Deleting files',
  ],
  verification: ['Lint', 'Typecheck', 'Manual review only'],
  failures: ['Skips tests', 'Ignores existing conventions'],
  collaboration: 'Explain tradeoffs',
  memory: 'Handoff notes only',
  separateSoul: 'Yes, generate SOUL.md',
};

const archetypeDetails = {
  'Bare Repo': {
    message: 'Your first job is basic project context and a repeatable first session.',
  },
  'Solo Builder Harness': {
    message:
      'Your harness should help the agent move quickly while preserving your preferences and verification habits.',
  },
  'Team Convention Harness': {
    message:
      'Your harness should make AI usage consistent across people and sessions.',
  },
  'High-Risk Review Harness': {
    message:
      'Your harness should slow the agent down at the right boundaries and force verification before completion.',
  },
  'Automation Operator Harness': {
    message:
      'Your harness should make the agent treat workflows like production systems, not prompt experiments.',
  },
};

const questionCount = questions.length;
const zipFileDate = new Date('1980-01-01T00:00:00Z');

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isUnknown(value) {
  const normalized = clean(value).toLowerCase();
  return !normalized || ['unknown', 'n/a', 'na', 'none', 'todo', 'tbd'].includes(normalized);
}

function sentenceJoin(items) {
  if (!items.length) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function mdList(items) {
  return items.map((item) => `- ${item}`).join('\n');
}

function commandValue(command, label) {
  return isUnknown(command) ? `TODO: Define the ${label.toLowerCase()} command.` : `\`${clean(command)}\``;
}

function countKnownCommands(commands) {
  return Object.values(commands).filter((command) => !isUnknown(command)).length;
}

function selectedFiles(answers) {
  const files = ['README.md', 'AGENTS.md', 'RUNBOOK.md'];
  if (answers.separateSoul === 'Yes, generate SOUL.md') {
    files.push('SOUL.md');
  }
  return files;
}

function calculateArchetype(answers) {
  const knownCommands = countKnownCommands(answers.commands);
  const highRisk =
    ['Client work', 'Sensitive or regulated'].includes(answers.risk) ||
    answers.projectType === 'Client project' ||
    answers.never.length >= 6;

  if (highRisk) {
    return {
      name: 'High-Risk Review Harness',
      ...archetypeDetails['High-Risk Review Harness'],
    };
  }

  if (answers.projectType === 'Automation project') {
    return {
      name: 'Automation Operator Harness',
      ...archetypeDetails['Automation Operator Harness'],
    };
  }

  if (
    answers.projectType === 'Team repo' ||
    answers.risk === 'Team production' ||
    answers.tools.includes('Mixed toolchain') ||
    answers.tools.length >= 3 ||
    answers.verification.includes('Code review agent')
  ) {
    return {
      name: 'Team Convention Harness',
      ...archetypeDetails['Team Convention Harness'],
    };
  }

  if (
    knownCommands <= 1 ||
    (answers.risk === 'Toy or prototype' && answers.verification.includes('Manual review only'))
  ) {
    return {
      name: 'Bare Repo',
      ...archetypeDetails['Bare Repo'],
    };
  }

  return {
    name: 'Solo Builder Harness',
    ...archetypeDetails['Solo Builder Harness'],
  };
}

function stackLine(label, value) {
  return `${label}: ${isUnknown(value) ? 'Unknown for now. Replace this when the repo convention is clear.' : clean(value)}`;
}

function toolGuidance(answers) {
  const lines = [
    `Target agent tools: ${answers.tools.length ? sentenceJoin(answers.tools) : 'TODO: Pick the supported tools.'}`,
    'Treat AGENTS.md as the primary, agent-neutral instruction file.',
  ];

  if (answers.tools.includes('Claude Code')) {
    lines.push('Claude Code can also use CLAUDE.md as optional companion context if this repo already follows that convention.');
  }

  if (answers.tools.includes('GitHub Copilot')) {
    lines.push('Mirror only the durable rules into Copilot custom instructions if the team uses that surface.');
  }

  if (answers.tools.includes('Cursor')) {
    lines.push('Keep Cursor rules aligned with this file instead of creating conflicting repo guidance.');
  }

  return lines;
}

function projectContext(answers, archetype) {
  const lines = [
    `Project type: ${answers.projectType}.`,
    `Harness archetype: ${archetype.name}. ${archetype.message}`,
    `Risk level: ${answers.risk}.`,
    `Supported tools: ${answers.tools.length ? sentenceJoin(answers.tools) : 'TODO: Pick the supported agent tools.'}`,
  ];

  if (answers.projectType === 'Content or knowledge vault') {
    lines.push('Content and source integrity matter. Preserve frontmatter, citations, links, and voice rules when editing notes or published pages.');
  }

  if (answers.projectType === 'Client project') {
    lines.push('Client trust matters. Prefer explicit handoffs, narrow diffs, and human approval at every boundary that affects production, money, data, or commitments.');
  }

  if (answers.projectType === 'Automation project') {
    lines.push('Automation changes should be treated like production workflow changes: check triggers, inputs, retries, alerts, and rollback paths.');
  }

  return lines;
}

function commandRows(answers) {
  const rows = [
    ['Install', answers.commands.install, 'Run before local work if dependencies are missing.'],
    ['Dev server', answers.commands.dev, 'Use for browser or local workflow checks.'],
    ['Test', answers.commands.test, isUnknown(answers.commands.test) ? 'Manual verification only until this is defined.' : 'Run before final handoff when relevant.'],
    ['Lint or typecheck', answers.commands.lint, 'Use for static verification.'],
    ['Build', answers.commands.build, 'Run before release-facing changes or when requested.'],
  ];

  return [
    '| Task | Command | Notes |',
    '| --- | --- | --- |',
    ...rows.map(([task, command, notes]) => `| ${task} | ${commandValue(command, task)} | ${notes} |`),
  ].join('\n');
}

function autonomyPolicy(answers) {
  const base = {
    'Ask before edits': 'Ask before changing files. Reading, diagnosis, and proposed patches are safe.',
    'Suggest patches only': 'Do not edit files directly. Produce a patch plan or diff for review.',
    'Edit with review': 'Make narrow edits inside the requested scope, then stop for review before broadening the work.',
    'Run tests and fix': 'Make scoped edits, run available verification, and fix failures caused by the change.',
    'Autonomous within limits': 'Act independently on small reversible changes inside this file, then report what changed and how it was verified.',
  };

  const lines = [base[answers.autonomy] || base['Edit with review']];

  if (['Team production', 'Client work', 'Sensitive or regulated'].includes(answers.risk)) {
    lines.push('For production, client, sensitive, or regulated work, reduce autonomy and ask before touching data, access, infrastructure, money movement, or release paths.');
  }

  if (answers.projectType === 'Team repo') {
    lines.push('Prefer small pull-request-sized changes and explain convention decisions that other contributors will inherit.');
  }

  return lines;
}

function hardStops(answers) {
  const specific = {
    'Destructive git operations': 'Do not run destructive git commands such as `git reset --hard`, `git checkout --`, force pushes, or history rewrites unless explicitly instructed.',
    Deploys: 'Do not deploy, publish, release, or trigger production jobs.',
    'Editing secrets or env files': 'Do not edit secrets, credentials, `.env` files, key material, or access tokens.',
    'Schema migrations': 'Do not create, run, or modify schema migrations without approval.',
    'Billing or payment changes': 'Do not change billing, payment, pricing, invoices, checkout flows, or subscription logic.',
    'Customer data changes': 'Do not read, export, mutate, or delete customer data.',
    'Dependency upgrades': 'Do not upgrade dependencies unless the task is specifically about dependency maintenance.',
    'Broad refactors': 'Do not perform broad refactors outside the requested change.',
    'Deleting files': 'Do not delete files unless the user explicitly asks or the deletion is part of an approved narrow change.',
  };

  const stops = answers.never.map((item) => specific[item]).filter(Boolean);

  if (answers.risk === 'Sensitive or regulated') {
    stops.push('Do not make compliance, privacy, logging, retention, authentication, authorization, or data-boundary changes without written approval.');
  }

  if (!stops.length) {
    stops.push('When an action is irreversible, externally visible, or outside the requested scope, stop and ask first.');
  }

  return [...new Set(stops)];
}

function verificationRequirements(answers) {
  const lines = [];

  if (answers.verification.includes('Unit tests')) lines.push(`Unit tests: ${commandValue(answers.commands.test, 'Test')}`);
  if (answers.verification.includes('Integration tests')) lines.push(`Integration tests: ${commandValue(answers.commands.test, 'Test')} or the repo-specific integration command.`);
  if (answers.verification.includes('Lint')) lines.push(`Lint: ${commandValue(answers.commands.lint, 'Lint')}`);
  if (answers.verification.includes('Typecheck')) lines.push(`Typecheck: ${commandValue(answers.commands.lint, 'Typecheck')}`);
  if (answers.verification.includes('Browser check')) lines.push(`Browser check: ${commandValue(answers.commands.dev, 'Dev server')} and verify the affected route or workflow.`);
  if (answers.verification.includes('Screenshot check')) lines.push('Screenshot check: capture the changed state on desktop and mobile when the UI changes.');
  if (answers.verification.includes('Code review agent')) lines.push('Code review agent: run an independent review for non-trivial edits before final handoff.');
  if (answers.verification.includes('Manual review only')) lines.push('Manual review: required when automated checks do not cover the change.');

  if (!lines.length) {
    lines.push('TODO: Define verification expectations before trusting agent changes.');
  }

  if (isUnknown(answers.commands.test)) {
    lines.push('Warning: no test command is defined yet. Treat verification as low confidence until one exists.');
  }

  if (answers.verification.length === 1 && answers.verification.includes('Manual review only')) {
    lines.push('Warning: manual review only is a low-confidence verification strategy. Call this out in every handoff.');
  }

  return lines;
}

function failureModeLines(answers) {
  const map = {
    'Edits wrong files': 'Confirm the intended files before editing and call out any adjacent files touched.',
    'Skips tests': 'Do not claim completion until verification is run or the reason it cannot run is stated.',
    'Refactors too much': 'Prefer surgical edits. Leave cleanup ideas as follow-up notes unless cleanup is the task.',
    'Ignores existing conventions': 'Read nearby code first and match naming, structure, styling, and test patterns.',
    'Produces generic code': 'Use project-specific commands, files, language, and constraints instead of generic boilerplate.',
    'Misses security constraints': 'Check auth, data exposure, input handling, permissions, secrets, and logging boundaries.',
    'Writes stale documentation': 'Update docs only when behavior or workflow actually changes, and keep examples current.',
    'Uses wrong tone or voice': 'Match the repo voice and product language. Avoid generic AI-sounding phrasing.',
  };

  const lines = answers.failures.map((item) => map[item]).filter(Boolean);
  return lines.length ? lines : ['Watch for scope drift, unsupported claims, and unverified completion statements.'];
}

function collaborationLines(answers, includeSoulReference = true) {
  const map = {
    'Concise and direct': [
      'Be concise and direct. Lead with the result, then include only the context needed to review it.',
    ],
    'Explain tradeoffs': [
      'Explain meaningful tradeoffs before choosing between plausible implementation paths.',
      'Once a path is chosen, keep the handoff concrete and avoid overexplaining routine edits.',
    ],
    'Challenge bad ideas': [
      'Challenge requests that create avoidable risk, unclear ownership, or brittle architecture.',
      'Offer a safer path with the smallest useful change.',
    ],
    'Ask clarifying questions first': [
      'Ask clarifying questions before acting when requirements, ownership, or risk boundaries are unclear.',
      'If the change is small and reversible, make a reasonable assumption and state it.',
    ],
    'Act decisively on small safe changes': [
      'Act decisively on small, safe, reversible changes.',
      'Do not pause for permission when the next step is obvious and inside the stated autonomy policy.',
    ],
  };

  const lines = map[answers.collaboration] || map['Explain tradeoffs'];
  if (includeSoulReference && answers.separateSoul === 'Yes, generate SOUL.md') {
    return [...lines, 'See `SOUL.md` for operating style that should travel between agent sessions.'];
  }
  return lines;
}

function memoryPolicy(answers) {
  const map = {
    Nothing: [
      'Do not create persistent memory by default.',
      'Use only the current task, repository files, and explicit user instructions.',
    ],
    'Handoff notes only': [
      'Carry forward concise handoff notes when a task spans sessions.',
      'Do not create `MEMORY.md` by default; put durable project rules in `AGENTS.md` instead.',
    ],
    'Repeated mistakes': [
      'When the agent repeats a mistake, add a specific prevention rule to `AGENTS.md`.',
      'Do not create `MEMORY.md` by default; prefer updating the harness itself.',
    ],
    'Project conventions': [
      'Promote durable conventions into `AGENTS.md` after they are confirmed in the codebase.',
      'Do not create `MEMORY.md` by default.',
    ],
    'Decisions and open questions': [
      'Keep decisions and open questions in the task handoff, issue, PR, or existing project docs.',
      'Do not create `MEMORY.md` by default unless the user explicitly asks for one.',
    ],
  };

  return map[answers.memory] || map['Handoff notes only'];
}

function generateReadme(answers, archetype) {
  const soulLine =
    answers.separateSoul === 'Yes, generate SOUL.md'
      ? '- `SOUL.md` - operating style and collaboration preferences.'
      : '- Style rules are folded into `AGENTS.md`.';

  return [
    '# Agent Harness Starter Kit',
    '',
    `This kit creates a ${archetype.name.toLowerCase()} for a ${answers.projectType.toLowerCase()}.`,
    archetype.message,
    '',
    '## Files in the kit',
    '- `AGENTS.md` - durable instructions for AI coding agents.',
    '- `RUNBOOK.md` - the first-session operating loop.',
    soulLine,
    '',
    '## Install order',
    '1. Add `AGENTS.md` to the repo root.',
    '2. Add `RUNBOOK.md` beside it.',
    answers.separateSoul === 'Yes, generate SOUL.md' ? '3. Add `SOUL.md` if you want style separate from repo rules.' : '3. Keep collaboration style in `AGENTS.md`.',
    '',
    '## First 15 minutes',
    'Read the TODOs, confirm the commands, run one small agent task, then update `AGENTS.md` with the first correction you had to give.',
  ].join('\n');
}

function generateAgentsMd(answers, archetype) {
  const styleInside =
    answers.separateSoul === 'No, keep style rules inside AGENTS.md'
      ? collaborationLines(answers, false)
      : collaborationLines(answers, true);

  return [
    '# AGENTS.md',
    '',
    '## Project Overview',
    mdList(projectContext(answers, archetype)),
    '',
    '## Tool Support',
    mdList(toolGuidance(answers)),
    '',
    '## Stack',
    mdList([
      stackLine('Primary language', answers.stack.primaryLanguage),
      stackLine('Framework', answers.stack.framework),
      stackLine('Package manager', answers.stack.packageManager),
      stackLine('Infrastructure or hosting', answers.stack.infrastructure),
    ]),
    '',
    'When stack details are unknown, inspect local config files before making assumptions.',
    '',
    '## Directory Notes',
    mdList([
      'Start by reading the repo root, package/config files, and nearby implementation before editing.',
      'Respect generated files, vendored code, build output, and lockfiles unless the task explicitly touches them.',
      answers.projectType === 'Content or knowledge vault'
        ? 'For vault/content work, preserve frontmatter, links, citations, source notes, and existing voice rules.'
        : 'TODO: Add repo-specific source directories, generated directories, and ownership notes.',
    ]),
    '',
    '## Common Commands',
    commandRows(answers),
    '',
    '## Agent Autonomy Policy',
    mdList(autonomyPolicy(answers)),
    '',
    '## Hard Stops',
    mdList(hardStops(answers)),
    '',
    '## Verification Requirements',
    mdList(verificationRequirements(answers)),
    '',
    '## Known AI Failure Modes',
    mdList(failureModeLines(answers)),
    '',
    '## Collaboration Preferences',
    mdList(styleInside),
    '',
    '## Where To Update This File',
    mdList([
      'Update this file when a command changes, a repeated agent mistake appears, a new hard stop is discovered, or a convention becomes durable.',
      'Do not add temporary task notes here. Put short-lived context in the current issue, PR, chat, or handoff.',
    ]),
  ].join('\n');
}

function firstFifteenSteps(answers) {
  return [
    'Add `AGENTS.md` to the repo root.',
    'Read the file and replace obvious `TODO` placeholders.',
    isUnknown(answers.commands.install)
      ? 'Define the install command before asking an agent to modify dependencies.'
      : `Run \`${clean(answers.commands.install)}\` if dependencies are not installed.`,
    isUnknown(answers.commands.test) && isUnknown(answers.commands.build)
      ? 'Define at least one repeatable verification command, or mark verification as manual and low confidence.'
      : `Run the known verification command: ${
          !isUnknown(answers.commands.test)
            ? `\`${clean(answers.commands.test)}\``
            : `\`${clean(answers.commands.build)}\``
        }.`,
    'Start with one small agent task that touches a narrow part of the project.',
    'Update `AGENTS.md` with the first correction you had to give the agent.',
  ];
}

function generateRunbook(answers, archetype) {
  return [
    '# RUNBOOK.md',
    '',
    `This runbook supports a ${archetype.name.toLowerCase()}.`,
    '',
    '## First 15 Minutes',
    mdList(firstFifteenSteps(answers)),
    '',
    '## Starting A New Agent Session',
    mdList([
      'Tell the agent to read `AGENTS.md` before making changes.',
      answers.separateSoul === 'Yes, generate SOUL.md'
        ? 'Tell the agent to read `SOUL.md` when communication style matters.'
        : 'Use the collaboration preferences in `AGENTS.md` as the style source.',
      'State the exact task, expected files or areas, and verification expectation.',
      'Ask the agent to name assumptions before editing if the task is ambiguous.',
    ]),
    '',
    '## Before Making Changes',
    mdList([
      'Inspect nearby files and existing patterns.',
      'Identify commands needed for verification.',
      'Check whether the task crosses any hard stop.',
      'Keep the first change narrow enough to review quickly.',
    ]),
    '',
    '## Verification Loop',
    mdList([
      ...verificationRequirements(answers),
      'If a command fails, fix failures caused by the current change when inside scope.',
      'If verification cannot run, explain why and mark confidence as lower.',
    ]),
    '',
    '## When The Agent Must Stop And Ask',
    mdList(hardStops(answers)),
    '',
    '## Memory Policy',
    mdList(memoryPolicy(answers)),
    '',
    '## Watch These Failure Modes',
    mdList(failureModeLines(answers)),
    '',
    '## When To Update The Harness',
    mdList([
      'A command changes.',
      'A repeated mistake appears.',
      'A new safety boundary is discovered.',
      'A project convention becomes stable.',
      'The first 15 minutes no longer match reality.',
    ]),
  ].join('\n');
}

function generateSoulMd(answers, archetype) {
  return [
    '# SOUL.md',
    '',
    `Operating style for agents working with this ${archetype.name.toLowerCase()}.`,
    '',
    '## How To Work With Me',
    mdList(collaborationLines(answers, false)),
    '',
    '## When To Challenge Me',
    mdList([
      'Challenge requests that conflict with hard stops, verification requirements, project conventions, or user trust.',
      'Challenge shortcuts that make the first 15 minutes faster but the next session harder.',
      'Offer a concrete safer alternative instead of only refusing.',
    ]),
    '',
    '## When To Stay Quiet',
    mdList([
      'Do not narrate routine code reading or obvious edits.',
      'Do not turn small reversible changes into a long strategy discussion.',
      'Do not restate the whole harness unless a decision depends on it.',
    ]),
    '',
    '## Communication Style',
    mdList([
      'Lead with what changed, what was verified, and what remains uncertain.',
      'Use specific file names, commands, and observed behavior.',
      'Avoid generic encouragement, inflated certainty, and filler phrasing.',
    ]),
    '',
    '## Boundaries',
    mdList([
      `Autonomy ceiling: ${answers.autonomy}.`,
      `Risk posture: ${answers.risk}.`,
      'If a boundary is unclear, ask before taking an irreversible or externally visible action.',
    ]),
    '',
    '## What Not To Become',
    mdList([
      'Do not become a passive autocomplete that ignores architecture, tests, or safety.',
      'Do not become a process lawyer that blocks every small safe change.',
      'Do not invent project facts when the repo is sparse; mark uncertainty and move carefully.',
    ]),
  ].join('\n');
}

function generateFiles(answers, archetype) {
  const files = {
    'README.md': generateReadme(answers, archetype),
    'AGENTS.md': generateAgentsMd(answers, archetype),
    'RUNBOOK.md': generateRunbook(answers, archetype),
  };

  if (answers.separateSoul === 'Yes, generate SOUL.md') {
    files['SOUL.md'] = generateSoulMd(answers, archetype);
  }

  return files;
}

function ButtonIcon({ checked }) {
  return (
    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${checked ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[#111]' : 'border-[var(--color-border-hover)] text-transparent'}`}>
      <Check className="h-3.5 w-3.5" />
    </span>
  );
}

function AgentHarnessBuilder() {
  const [answers, setAnswers] = useState(defaultAnswers);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [activeFile, setActiveFile] = useState('AGENTS.md');
  const [copyStatus, setCopyStatus] = useState('');
  const [zipStatus, setZipStatus] = useState('');
  const [zipError, setZipError] = useState('');

  const archetype = useMemo(() => calculateArchetype(answers), [answers]);
  const files = useMemo(() => generateFiles(answers, archetype), [answers, archetype]);
  const fileNames = useMemo(() => Object.keys(files), [files]);
  const question = questions[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / questionCount) * 100);

  useEffect(() => {
    if (!files[activeFile]) {
      setActiveFile('AGENTS.md');
    }
  }, [activeFile, files]);

  function updateAnswer(key, value) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function updateNested(group, key, value) {
    setAnswers((current) => ({
      ...current,
      [group]: {
        ...current[group],
        [key]: value,
      },
    }));
  }

  function toggleArray(key, value) {
    setAnswers((current) => {
      const existing = current[key];
      return {
        ...current,
        [key]: existing.includes(value)
          ? existing.filter((item) => item !== value)
          : [...existing, value],
      };
    });
  }

  function goNext() {
    if (currentQuestion === questionCount - 1) {
      setHasGenerated(true);
      return;
    }
    setCurrentQuestion((current) => current + 1);
  }

  function goBack() {
    setCurrentQuestion((current) => Math.max(0, current - 1));
  }

  async function copyToClipboard(text, fileName) {
    setCopyStatus('');
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopyStatus(fileName);
      window.setTimeout(() => setCopyStatus(''), 1800);
    } catch (error) {
      setCopyStatus('Copy failed');
    }
  }

  async function downloadZip() {
    setZipError('');
    setZipStatus('Preparing zip');
    try {
      const zip = new JSZip();
      Object.entries(files).forEach(([name, content]) => {
        zip.file(name, content, { date: zipFileDate });
      });
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'agent-harness-kit.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
      setZipStatus('Zip ready');
      window.setTimeout(() => setZipStatus(''), 1800);
    } catch (error) {
      setZipStatus('');
      setZipError('Zip download failed. Copy buttons still work.');
    }
  }

  function renderOptions(optionQuestion) {
    if (optionQuestion.type === 'single') {
      const currentValue = answers[optionQuestion.id];
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {optionQuestion.options.map((option) => {
            const selected = currentValue === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => updateAnswer(optionQuestion.id, option)}
                className={`flex min-h-14 items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${selected ? 'border-[var(--color-accent)] bg-[var(--color-accent-muted)] text-[var(--color-text-primary)]' : 'border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]'}`}
              >
                <span>{option}</span>
                {selected && <Check className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />}
              </button>
            );
          })}
        </div>
      );
    }

    if (optionQuestion.type === 'multi') {
      const currentValues = answers[optionQuestion.id];
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {optionQuestion.options.map((option) => {
            const selected = currentValues.includes(option);
            return (
              <label
                key={option}
                className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition ${selected ? 'border-[var(--color-accent)] bg-[var(--color-accent-muted)] text-[var(--color-text-primary)]' : 'border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]'}`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleArray(optionQuestion.id, option)}
                  className="sr-only"
                />
                <ButtonIcon checked={selected} />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      );
    }

    if (optionQuestion.type === 'fields') {
      return (
        <div className="grid gap-4">
          {optionQuestion.fields.map(([key, label, placeholder]) => (
            <label key={key} className="grid gap-2 text-sm">
              <span className="font-medium text-[var(--color-text-secondary)]">{label}</span>
              <input
                value={answers[optionQuestion.id][key]}
                onChange={(event) => updateNested(optionQuestion.id, key, event.target.value)}
                placeholder={placeholder}
                className="h-11 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_var(--color-accent-muted)]"
              />
            </label>
          ))}
        </div>
      );
    }

    return null;
  }

  const activeContent = files[activeFile] || files['AGENTS.md'];

  return (
    <section className="min-h-screen bg-[var(--color-bg)] px-4 pb-16 pt-24 tracking-normal md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 border-b border-[var(--color-border)] pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <a href="/resources" className="mb-4 inline-flex text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]">
              Back to Resources
            </a>
            <h1 className="font-serif text-3xl font-bold text-[var(--color-text-primary)] md:text-5xl">
              Agent Harness Builder
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              Answer a short quiz, get a usable agent harness kit you can paste into a repo today.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-[var(--color-text-secondary)]">
            <span className="rounded-full border border-[var(--color-border)] px-3 py-1.5">Static</span>
            <span className="rounded-full border border-[var(--color-border)] px-3 py-1.5">Browser-only</span>
            <span className="rounded-full border border-[var(--color-border)] px-3 py-1.5">No repo access</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)_minmax(360px,0.9fr)]">
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="mb-3 flex items-center justify-between text-xs font-mono uppercase text-[var(--color-text-muted)]">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--color-bg)]">
                <div
                  className="h-full rounded-full bg-[var(--color-accent)] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <ol className="mt-4 space-y-2">
                {questions.map((item, index) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setCurrentQuestion(index)}
                      className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition ${index === currentQuestion ? 'bg-[var(--color-accent-muted)] text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'}`}
                    >
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${index === currentQuestion ? 'border-[var(--color-accent)] text-[var(--color-accent)]' : 'border-[var(--color-border)]'}`}>
                        {index + 1}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-mono uppercase text-[var(--color-text-muted)]">
                <FileText className="h-4 w-4" />
                <span>Output Files</span>
              </div>
              <div className="space-y-2">
                {selectedFiles(answers).map((fileName) => (
                  <button
                    key={fileName}
                    type="button"
                    onClick={() => setActiveFile(fileName)}
                    className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition ${activeFile === fileName ? 'border-[var(--color-accent)] bg-[var(--color-accent-muted)] text-[var(--color-text-primary)]' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]'}`}
                  >
                    <span>{fileName}</span>
                    {activeFile === fileName && <Check className="h-4 w-4 text-[var(--color-accent)]" />}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[var(--color-text-muted)]">
                Generated locally in your browser. Nothing was uploaded.
              </p>
            </div>
          </aside>

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase text-[var(--color-accent)]">
                  Question {currentQuestion + 1} of {questionCount}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                  {question.title}
                </h2>
              </div>
              <Terminal className="hidden h-7 w-7 text-[var(--color-text-muted)] sm:block" />
            </div>

            {renderOptions(question)}

            <div className="mt-8 flex flex-col gap-3 border-t border-[var(--color-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={currentQuestion === 0}
                className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setHasGenerated(true)}
                  className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                >
                  Preview kit
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-lg bg-[var(--color-accent)] px-5 py-2 text-sm font-bold text-[#111] transition hover:bg-[var(--color-accent-hover)]"
                >
                  {currentQuestion === questionCount - 1 ? 'Generate kit' : 'Next'}
                </button>
              </div>
            </div>
          </div>

          <aside className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] lg:sticky lg:top-24 lg:self-start">
            <div className="border-b border-[var(--color-border)] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-mono uppercase text-[var(--color-text-muted)]">
                    {hasGenerated ? 'Result' : 'Live Preview'}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-[var(--color-text-primary)]">
                    {archetype.name}
                  </h3>
                </div>
                {hasGenerated && (
                  <div className="flex items-center gap-2 rounded-full border border-[var(--color-accent-border)] px-3 py-1 text-xs text-[var(--color-accent)]">
                    <Check className="h-3.5 w-3.5" />
                    Ready
                  </div>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {archetype.message}
              </p>
            </div>

            <div className="border-b border-[var(--color-border)] p-4">
              <div className="mb-4 flex flex-wrap gap-2">
                {fileNames.map((fileName) => (
                  <button
                    key={fileName}
                    type="button"
                    onClick={() => setActiveFile(fileName)}
                    className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${activeFile === fileName ? 'border-[var(--color-accent)] bg-[var(--color-accent-muted)] text-[var(--color-text-primary)]' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]'}`}
                  >
                    {fileName}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => copyToClipboard(activeContent, activeFile)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] transition hover:border-[var(--color-border-hover)]"
                >
                  {copyStatus === activeFile ? <Check className="h-4 w-4 text-[var(--color-accent)]" /> : <Copy className="h-4 w-4" />}
                  {copyStatus === activeFile ? 'Copied' : `Copy ${activeFile}`}
                </button>
                <button
                  type="button"
                  onClick={downloadZip}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-3 py-2 text-sm font-bold text-[#111] transition hover:bg-[var(--color-accent-hover)]"
                >
                  <Download className="h-4 w-4" />
                  {zipStatus || 'Download zip'}
                </button>
              </div>
              {copyStatus === 'Copy failed' && (
                <p className="mt-3 flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                  <AlertTriangle className="h-4 w-4 text-[var(--color-accent)]" />
                  Copy failed. Select the preview text manually.
                </p>
              )}
              {zipError && (
                <p className="mt-3 flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                  <AlertTriangle className="h-4 w-4 text-[var(--color-accent)]" />
                  {zipError}
                </p>
              )}
            </div>

            <div className="p-0">
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3 text-xs font-mono uppercase text-[var(--color-text-muted)]">
                <Clipboard className="h-4 w-4" />
                <span>{activeFile}</span>
              </div>
              <pre className="max-h-[620px] overflow-auto whitespace-pre-wrap bg-[var(--color-bg)] p-4 text-xs leading-relaxed text-[var(--color-text-secondary)] md:text-sm">
                <code>{activeContent}</code>
              </pre>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default AgentHarnessBuilder;
