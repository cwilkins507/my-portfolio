---
title: "Understanding BGP Anomalies for Engineers and Architects"
date: "2026-01-08"
tags: ["Networking", "BGP", "Routing Security", "RPKI", "Route Leaks", "Network Monitoring", "Incident Response"]
excerpt: "A practical guide to BGP anomalies: taxonomy, detection signals, and mitigation patterns. Deploy RPKI, build guardrails, and design networks that limit blast radius."
---

# Understanding BGP Anomalies: A Field Guide for Engineers and Architects

Border Gateway Protocol (BGP) is basically how the internet knows where to send your data.

Think of the internet as millions of separate networks (ISPs, companies, cloud providers, universities).

BGP is the system those networks use to talk to each other and decide the best path for data to travel.

Without BGP, your data would be like a letter with no postal system.

Border Gateway Protocol (BGP) moves reachability information across autonomous systems and lets operators turn policy into paths. That policy flexibility is why the Internet scales—and why it occasionally misbehaves. BGP anomalies are the moments where the control plane diverges from intent. Some last seconds. Others settle into a stable but wrong state for days. 

Both hurt.

This guide breaks down what “anomaly” means in BGP, how to spot the early signals, and how to design networks that contain the blast radius. It’s written for network engineers who live in routing policy and for system architects who need to reason about risk at the edge of their platforms.

## What Counts as a BGP Anomaly?

A BGP anomaly is any unexpected condition that affects reachability, path selection, or propagation scope. It might be accidental, benign, or malicious.

What matters is impact.

Think in two planes:

- Control plane: routes appear, disappear, or change attributes in ways you didn’t intend.
- Data plane: packets drop, hairpin, or take longer paths because the control plane drifted.

You’ll see anomalies as one or more of these symptoms:

- Unexpected origin AS for a prefix (origin hijack or misorigin).
- Customer routes learned from peers or upstreams (route leak).
- Sudden path-length changes, odd AS-path segments, or private ASNs on eBGP.
- Surge in update churn, flap storms, or MED oscillations.
- New, more-specific prefixes that blackhole or bypass the intended aggregate.
- Stable but unintended policy state (the classic “BGP wedgie,” see RFC 4264).

Some of this is normal variance. The line between “anomaly” and “expected churn” is a function of your policy and error budget.

## A Practical Taxonomy of BGP Anomalies

You don’t need every category, but a shared vocabulary helps triage. Use a simple schema when you classify incidents: type, symptom, scope, detection signal, and first move.

### Route Hijack (Origin Hijack)

- What: An AS originates a prefix it doesn’t own or shouldn’t announce.
- Symptoms: New origin AS in the path; multiple-origin AS (MOAS) for the same prefix; subprefix that attracts traffic.
- Detection: RPKI origin validation (RFC 6811), ROA mismatch; MOAS alerts from external collectors.
- First move: Prefer your valid origin with more-specifics (if safe), contact the announcing AS/upstreams, and apply filtering. Don’t over-deaggregate unless you must.

### Route Leak (RFC 7908)

- What: An AS that shouldn’t provide transit does so anyway. Often a policy mistake across customer/peer/upstream boundaries.
- Symptoms: Customer routes appear from a peer or provider; unexpected wide propagation of peer-learned paths.
- Detection: “Valley” paths (customer-to-peer-to-provider), sudden increase in received prefixes from one neighbor, community tags stripped or missing.
- First move: Apply strict import policies (type-based), request neighbors to tag and honor NO_EXPORT/NOPEER (RFC 1997, RFC 3765), and if needed, lower local preference or shut the session while coordinating.

### Misconfiguration and Leaks of Default/Private Space

- What: Announcing default to peers, leaking RFC 1918/4193 space, or failing to remove private ASNs (RFC 6996).
- Symptoms: Bogon prefixes, private ASNs in eBGP, default route from a peer, next-hop anomalies.
- Detection: Bogon filters, as-path policy checks, next-hop validation, BMP feeds.
- First move: Deny on import; clean private ASNs on egress; fix templates so it doesn’t repeat.

### Path Oscillations, Flapping, and MED Games

- What: Continuous update churn due to competing policies, MED tie-breaks, or route reflector feedback loops.
- Symptoms: High update rates, frequent best-path changes, rising CPU on routers, intermittent packet loss.
- Detection: Update-per-second thresholds, BMP snapshots, per-prefix flap counters.
- First move: Reduce MED sensitivity across neighbor types, set consistent local preference, use conservative route flap damping only if you understand the trade-offs.

### Deaggregation and BGP Poisoning Artifacts

- What: Intentional subprefixes for traffic engineering or attack impact; AS-path poisoning to influence return paths.
- Symptoms: Burst of longer prefixes; long or “weird” AS-paths.
- Detection: Sudden change in prefix granularity; path-length deltas.
- First move: Validate that the source is you or your customer; tighten max-prefix and per-prefix-length filters; document sanctioned TE so alerts don’t fire.

### BGP Wedgies and Policy Deadlocks

- What: Stable, unintended states created by interacting policies (RFC 4264).
- Symptoms: No obvious fault, but traffic prefers the wrong path; only a coordinated policy change clears it.
- Detection: Policy review and “what-if” simulation; traces that show consistent but wrong decisions.
- First move: Change order of preferences (customer > peer > provider), adjust communities, and coordinate with upstreams.

## Why BGP Anomalies Happen

- Human error in neighbor type, policy, or filter scope.
- Inconsistent templates across edges and route reflectors.
- Stale or conflicting data in IRRs; missing or mis-signed ROAs.
- Automation without guardrails or validation.
- Policy interactions across vendors or ASes (the Internet is a multi-party system).
- Assumptions that “the peer will filter” (they won’t, or not fast enough).

Assume mistakes will propagate. Design so the default failure mode is “deny.”

## Detection: Build an Observability Stack

Good operators see anomalies before users feel them. That means multiple vantage points and clear signals.

### External Vantage Points

- Public route collectors and looking glasses: track what the world sees for your prefixes and AS-paths.
- RPKI validity: monitor the share of your prefixes that are Valid, Invalid, NotFound.
- MOAS and subprefix watch: alert on new origins and more-specifics.
- Path change budgets: flag sudden path length increases or new upstreams.

External views tell you “others see a problem.” They also help confirm scope.

### Internal Control-Plane Visibility

- BMP (BGP Monitoring Protocol): stream Adj-RIB-In/Out and updates from edge and route reflectors.
- Streaming telemetry: neighbor state, prefixes-per-neighbor, attribute deltas.
- Logs: max-prefix warnings, session resets, dampening actions.
- Policy decision points: export your best-path rationales if your platform can.

You want to correlate “border saw X” with “world sees Y.”

### Data-Plane Correlation

- Flow telemetry (NetFlow/sFlow/IPFIX): traffic shifts that match control-plane changes.
- Active probing: traceroute and synthetic reachability to customer prefixes and key destinations.
- Error budgets: define allowable churn; alert on exceeded budgets, not on every single update.

Marry control-plane and data-plane signals. A valid-looking route that sinks traffic is still an anomaly.

## Prevention and Mitigation Patterns

You can’t stop every anomaly. You can stop most from hurting you.

### Guardrails at the Edge

- Origin validation: deploy RPKI-ROV on eBGP edges (RFC 6811, RFC 6480). Default to drop Invalid; log and alert.
- Prefix filters: build from IRR + RPKI; use per-customer allow lists; deny bogons and reserved space.
- Max-prefix limits: set per neighbor and act (warn then drop). Err on the side of fail-closed.
- Prefix-length filters: reject overly specific routes; scope exceptions by policy and communities.
- AS-path sanity: reject private and reserved ASNs on eBGP; enforce “neighbor-as first” where applicable; cap path length.
- Next-hop checks: ensure next-hop is reachable and sane for the session type.
- Community hygiene: honor NO_EXPORT / NO_ADVERTISE (RFC 1997), NOPEER (RFC 3765); use Large Communities (RFC 8092) to scope policy.

### Policy by Neighbor Type

Build three default policies and inherit from them:

- Customer: accept specific prefixes with strict filters; export everything the customer pays for; prefer in selection.
- Peer: accept only their space; never give transit to third parties; limit export scope.
- Provider: accept broadly but with strict safety checks; export only your and your customers’ routes.

This single pattern prevents a large class of leaks.

### Limiting Blast Radius During Incidents

- Lower local preference for suspect paths to steer around them.
- Announce a more-specific temporarily to pull traffic back (use sparingly; withdraw after fix).
- Apply NO_EXPORT on outbound to halt further spread.
- Use remote-triggered blackholing where scoped and agreed.
- Temporarily disable a session if it’s the source; coordinate fast with the neighbor.

### Operational Hygiene

- Two-person review for policy changes; change windows with GRACEFUL_SHUTDOWN (RFC 8326).
- BFD (RFC 5880) for fast liveness; pair carefully with BGP Graceful Restart (RFC 4724) to avoid hiding blackholes.
- Golden templates and a single source of truth for prefix lists, ROAs, and communities.
- Pre-deployment “what-if” simulation of BGP policies to catch wedgies and leaks.
- Document intended communities and share them with peers and customers.

### Standards and Emerging Tools

- BGPsec (RFC 8205) provides path validation. Deployment is still limited. Start with RPKI-ROV and strong filtering; plan for path validation where it adds value.
- MANRS guidelines capture baseline routing security norms. Align your policies to them.

## Architecting for Resilience

System architects control the blast radius before operations ever touches a router.

- Separate planes: isolate backbone, customer, and peering policies. Different route reflectors; different failure domains.
- Diverse upstreams and geographies: don’t let a single provider or IX define your reachability.
- Route reflector discipline: unique cluster IDs; avoid policy on reflectors beyond what’s required; monitor RR health via BMP.
- Conservative defaults: customer > peer > provider in local-preference; consistent MED behavior across the network.
- Redundant RPKI validators and caches: multiple implementations and failure modes.
- Out-of-band control: secure remote access paths that survive a control-plane incident.
- Test chaos: inject safe, synthetic anomalies in a lab or canary POP to validate runbooks.

## Signals and KPIs That Matter

Pick metrics that point to user impact and policy drift:

- Count of prefixes by RPKI state (Valid/Invalid/NotFound) for your space and received.
- MOAS and subprefix alerts per day; mean time to acknowledge.
- Updates per second by neighbor and by prefix; sustained churn alarms.
- Prefix count and max-prefix near trips by neighbor.
- Paths with private ASNs, bogon space, or unusual attributes.
- Data-plane loss or latency correlated with control-plane changes.

Make thresholds explicit. Budget churn. Alert on thresholds, not on noise.

## A Short Runbook Example

You see a spike of prefixes from a peer. Your external view shows your customer’s /19 now also originates from an unfamiliar AS; some collectors prefer that path.

- Classify: likely a route leak from the peer’s customer, possibly with accidental export.
- Confirm: RPKI marks the peer-learned route as Invalid; MOAS alert fired; flows show traffic shift.
- Contain: drop Invalid on import; lower local preference for that neighbor; apply NO_EXPORT to outbound just in case.
- Communicate: contact the peer’s NOC with evidence (prefix, timestamps, paths, ROA details). Request they filter their customer and tag routes correctly.
- Backstop: if user impact remains, advertise a more-specific /20 to attract traffic back; withdraw once the leak is fixed.
- Postmortem: add a peer-locking filter so you never accept customer space via peers; tighten max-prefix; add a unit test to your policy simulator.

It’s mundane. 

That’s the point. 

Most BGP anomalies are policy problems with repeatable fixes.

## The Bottom Line

BGP anomalies are part of daily Internet physics. Your job is not to chase every flap—it’s to set guardrails, see early, and act with minimal collateral damage. Start with strong import and export discipline, deploy RPKI-ROV, and put eyes on the signals. 

Take 60 minutes this week to do three things:
- Enable and verify RPKI-ROV on one edge.
- Add a MOAS and subprefix alert for your top prefixes.
- Write a one-page route-leak runbook and run a tabletop.

Small, repeatable steps beat firefighting.