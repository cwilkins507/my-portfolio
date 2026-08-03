import React from 'react';
import { ArrowRight } from 'lucide-react';

export const background = [
  {
    period: 'Now',
    role: 'Lead Software Engineer',
    company: 'Morningstar',
    detail:
      "Regulated workflows, queues, compliance systems, observability, and the kind of cloud work where missing a record isn't a cute little edge case.",
  },
  {
    period: '2021-2024',
    role: 'Connected Vehicle Engineering',
    company: 'Ford Motor Company',
    detail:
      'IoT telemetry, Kafka, Pub/Sub, identity work, inventory audit automation, and vehicle event systems across hundreds of thousands of connected vehicles.',
  },
  {
    period: '2017-2021',
    role: 'Finance, pricing, sales, business development',
    company: 'Ford Credit / Ford Motor Company',
    detail:
      'The business-side apprenticeship: dealer ops, pricing systems, field trust, manual process pain, and what long delays actually cost.',
  },
];

const ResumeLink = () => (
  <a
    href="/Collin-Wilkins-Resume.pdf"
    download="collin-wilkins-resume.pdf"
    className="group mt-[22px] inline-flex min-h-11 items-center font-bold text-[var(--color-accent)] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
  >
    Download the full resume
    <ArrowRight
      className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-visible:translate-x-0"
      aria-hidden="true"
    />
  </a>
);

const Ledger = () => (
  <div className="border-t border-[var(--color-text-primary)]">
    {background.map(item => (
      <div
        key={`${item.company}-${item.role}`}
        className="grid gap-1.5 border-b border-[var(--color-border)] py-[18px] sm:grid-cols-[104px_minmax(0,1fr)] sm:items-baseline sm:gap-6"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)] [font-variant-numeric:tabular-nums] sm:leading-[2]">
          {item.period}
        </p>
        <div>
          <div className="flex flex-wrap items-baseline gap-x-2.5">
            <h3 className="font-serif text-[19px] font-medium leading-[1.3] tracking-[-0.01em] text-[var(--color-text-primary)]">
              {item.role}
            </h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
              {item.company}
            </span>
          </div>
          <p className="mt-1.5 max-w-[36rem] text-[15px] leading-[1.55] text-[var(--color-text-secondary)] [text-wrap:pretty]">
            {item.detail}
          </p>
        </div>
      </div>
    ))}
    <ResumeLink />
  </div>
);

const Table = () => (
  <div>
    {/*
      Below 640px the table flips to stacked blocks. `display: block` strips the implicit
      table roles, so they are restored explicitly and every cell carries a visually hidden
      label — the column headers stay reachable instead of vanishing with the <thead>.
    */}
    <table
      role="table"
      className="w-full border-collapse border-t border-[var(--color-text-primary)] text-left"
    >
      <thead role="rowgroup" className="hidden sm:table-header-group">
        <tr role="row">
          <th scope="col" role="columnheader" className="border-b border-[var(--color-border)] py-2.5 pr-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            When
          </th>
          <th scope="col" role="columnheader" className="border-b border-[var(--color-border)] py-2.5 pr-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Role
          </th>
          <th scope="col" role="columnheader" className="border-b border-[var(--color-border)] py-2.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            What it involved
          </th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        {background.map(item => (
          <tr
            key={`${item.company}-${item.role}`}
            role="row"
            className="block border-b border-[var(--color-border)] py-[18px] sm:table-row sm:border-0 sm:py-0"
          >
            <td role="cell" className="block pb-1 align-baseline font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)] [font-variant-numeric:tabular-nums] sm:table-cell sm:whitespace-nowrap sm:border-b sm:border-[var(--color-border)] sm:py-4 sm:pr-4 sm:leading-[2]">
              <span className="sr-only sm:hidden">When: </span>
              {item.period}
            </td>
            <td role="cell" className="block pb-1 align-baseline sm:table-cell sm:border-b sm:border-[var(--color-border)] sm:py-4 sm:pr-4">
              <span className="sr-only sm:hidden">Role: </span>
              {/* Stacked view keeps role and company on one baseline; the table view stacks them. */}
              <span className="flex flex-wrap items-baseline gap-x-2.5 sm:block">
                <span className="font-serif text-[17px] font-medium leading-[1.35] text-[var(--color-text-primary)] sm:block">
                  {item.role}
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-text-muted)] sm:mt-1.5 sm:block">
                  {item.company}
                </span>
              </span>
            </td>
            <td role="cell" className="block max-w-[30rem] align-baseline text-[15px] leading-[1.5] text-[var(--color-text-secondary)] [text-wrap:pretty] sm:table-cell sm:border-b sm:border-[var(--color-border)] sm:py-4">
              <span className="sr-only sm:hidden">What it involved: </span>
              {item.detail}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <ResumeLink />
  </div>
);

/**
 * Selected-background record.
 *
 * `ledger` (Option A) keeps every word in a compact two-column record.
 * `table`  (Option D) commits to a real <table> with When / Role / What it involved.
 * Both are live: `ledger` ships on /about, `table` is exercised at /preview/about-record.
 */
const BackgroundRecord = ({ variant = 'ledger' }) =>
  variant === 'table' ? <Table /> : <Ledger />;

export default BackgroundRecord;
