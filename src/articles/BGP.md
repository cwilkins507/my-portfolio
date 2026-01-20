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

Border Gateway Protocol (BGP) moves reachability information across autonomous systems and lets operators turn policy into paths. That flexibility is why the Internet scales, but it's also why things break in weird ways. BGP anomalies happen when the control plane does something you didn't intend. Some last a few seconds. Others? They settle into a stable but completely wrong state and stay there for days until someone notices the traffic patterns look off.

This guide breaks down what "anomaly" actually means in BGP context, how to spot problems early (sometimes before your users do), and how to design networks that limit damage when things go sideways. I'm writing this for network engineers who spend their days in routing policy and for architects who need to think about edge risk without getting lost in protocol minutiae.

## What Counts as a BGP Anomaly?

A BGP anomaly is any unexpected condition that affects reachability, path selection, or propagation scope. Could be accidental (most common), benign (sometimes), or malicious (rare but memorable).

What actually matters here is user impact. You can have technically "correct" BGP behavior that still makes your application slow or unreachable. I think about this in two layers:

- Control plane: routes appear, disappear, or change attributes in ways you didn't configure
- Data plane: packets drop, take weird hairpin paths, or suddenly route through three extra hops because the control plane made a bad decision

In practice, you'll usually see anomalies show up as one or more of these:

- Unexpected origin AS for a prefix (origin hijack or misorigin).
- Customer routes learned from peers or upstreams (route leak).
- Sudden path-length changes, odd AS-path segments, or private ASNs on eBGP.
- Surge in update churn, flap storms, or MED oscillations.
- New, more-specific prefixes that blackhole or bypass the intended aggregate.
- Stable but unintended policy state (the classic “BGP wedgie,” see RFC 4264).

Here's the tricky part: some of this is just normal Internet variance. Where you draw the line between "that's an anomaly" and "that's just BGP being BGP" depends entirely on your policies and how much churn you've budgeted for. I've seen networks where 1000 updates/second is Tuesday, and others where 50 updates triggers an incident.

## A Practical Taxonomy of BGP Anomalies

You don't need to memorize every category (I certainly haven't), but having shared vocabulary makes triage calls way less painful. When something breaks at 2am, use a simple schema: type, symptom, scope, how you detected it, and what to do first.

### Route Hijack (Origin Hijack)

- What: An AS originates a prefix it doesn't own or shouldn't announce
- Symptoms: Suddenly there's a new origin AS in the path, or you've got multiple-origin AS (MOAS) for the same prefix, or someone announced a subprefix that's pulling your traffic
- Detection: RPKI origin validation (RFC 6811), ROA mismatch alerts, MOAS alerts from external collectors like RouteViews
- First move: If you can safely announce a more-specific to prefer your valid origin, do that. Contact the announcing AS and their upstreams. Apply filtering. Don't over-deaggregate unless you're actively bleeding traffic (then do what you need to do).

### Route Leak (RFC 7908)

- What: An AS that shouldn't provide transit does so anyway. Usually this is a policy configuration mistake across customer/peer/upstream boundaries. Someone changed a filter and forgot one line.
- Symptoms: Your customer routes are showing up from a peer or provider (big red flag), or peer-learned paths are propagating way further than they should
- Detection: Look for "valley" paths like customer-to-peer-to-provider topology, sudden spike in prefixes from one neighbor, missing or stripped community tags
- First move: Apply strict import policies based on neighbor type. Ask neighbors to tag correctly and honor NO_EXPORT/NOPEER (RFC 1997, RFC 3765). If it's bad, lower local preference on those routes or shut down the session while you coordinate the fix. That last option is nuclear but sometimes necessary.

### Misconfiguration and Leaks of Default/Private Space

- What: Someone announces default route to peers (never do this), leaks RFC 1918 or RFC 4193 space to the public Internet, or forgets to strip private ASNs (RFC 6996) before eBGP
- Symptoms: Bogon prefixes in your table, private ASNs showing up on eBGP sessions, default route from a peer, next-hop pointing somewhere strange
- Detection: Bogon filters (you should have these), as-path policy checks, next-hop validation, BMP feeds if you're running them
- First move: Deny it on import immediately. Clean private ASNs on egress. Then fix your templates so this doesn't happen again next Tuesday.

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

Mostly? Human error. Wrong neighbor type, copy-paste policy mistakes, filter scope that made sense at the time but doesn't anymore.

But also:

- Templates that diverged between your edges and route reflectors (and nobody noticed for six months)
- Stale IRR data, missing ROAs, ROAs signed with the wrong origin
- Automation scripts with no validation. They run fast and break things efficiently.
- Policy interactions across different vendors or ASes. The Internet is a multi-party system where everyone's running slightly different configs.
- The classic assumption that "the peer will filter bad routes." They won't. Or they will, but three hours after you needed them to.

Here's the key insight: assume mistakes will propagate. Design your network so the default failure mode is "deny" not "accept and forward to everyone."

## Detection: Build an Observability Stack

The best operators I've worked with see anomalies before their users notice anything's wrong. That requires multiple vantage points and clear, non-noisy signals. It also requires someone actually looking at those signals, but that's a staffing conversation.

### External Vantage Points

- Public route collectors and looking glasses: track what the world sees for your prefixes and AS-paths.
- RPKI validity: monitor the share of your prefixes that are Valid, Invalid, NotFound.
- MOAS and subprefix watch: alert on new origins and more-specifics.
- Path change budgets: flag sudden path length increases or new upstreams.

External views answer the question "is it just me, or is everyone seeing this?" They also help you figure out how widespread the problem is (just one peer? half the Internet? your entire AS?).

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

You need both control-plane and data-plane signals. I've seen plenty of situations where the routing table looked perfectly fine, but traffic was getting blackholed anyway. A valid-looking route that sinks packets is absolutely still an anomaly.

## Prevention and Mitigation Patterns

Let's be realistic: you can't prevent every BGP anomaly. The Internet is too complex and humans make mistakes. But you can stop most anomalies from actually hurting your users, which is what matters.

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

This three-way split alone has prevented more route leaks in my experience than any other single policy decision. It's almost boring how effective it is.

### Limiting Blast Radius During Incidents

When something's actively breaking:

- Lower local preference for suspect paths to steer traffic around them
- Announce a more-specific temporarily to pull traffic back. Use this sparingly because it creates its own problems. Withdraw it as soon as the underlying issue is fixed.
- Apply NO_EXPORT on outbound to stop the bad routes from spreading further
- Use remote-triggered blackholing if you've set that up with your upstream and the situation calls for it
- If a session is the source, shut it down temporarily. Yes, this will cause an outage on that link, but sometimes that's better than the alternative. Coordinate fast with the neighbor's NOC.

### Operational Hygiene

The boring stuff that actually prevents fires:

- Two-person review for policy changes. Use maintenance windows. Send GRACEFUL_SHUTDOWN (RFC 8326) before taking things down.
- Run BFD (RFC 5880) for fast failure detection, but be careful pairing it with BGP Graceful Restart (RFC 4724). That combination can hide blackholes if you configure it wrong.
- Keep golden templates. One source of truth for prefix lists, ROAs, communities. Not three slightly different versions in different repos.
- Simulate BGP policy changes before deploying them. You can catch wedgies and leaks in a test environment instead of production at 3am.
- Document your community values and actually share that documentation with peers and customers. I know, documentation is painful, but this prevents so many confused support calls.

### Standards and Emerging Tools

BGPsec (RFC 8205) provides path validation, which sounds great in theory. In practice, deployment is still pretty limited as of 2026. I'd start with RPKI-ROV and strong filtering, then think about path validation if you're in a position where it actually adds value beyond what you're already doing.

MANRS guidelines are basically the industry's baseline for routing security. Worth aligning your policies to them, especially if you ever need to explain your security posture to someone.

## Architecting for Resilience

As a system architect, you control the blast radius before your operations team ever logs into a router. The decisions you make in the design phase matter more than most people realize.

- Separate planes: isolate backbone, customer, and peering policies. Different route reflectors; different failure domains.
- Diverse upstreams and geographies: don’t let a single provider or IX define your reachability.
- Route reflector discipline: unique cluster IDs; avoid policy on reflectors beyond what’s required; monitor RR health via BMP.
- Conservative defaults: customer > peer > provider in local-preference; consistent MED behavior across the network.
- Redundant RPKI validators and caches: multiple implementations and failure modes.
- Out-of-band control: secure remote access paths that survive a control-plane incident.
- Test chaos: inject safe, synthetic anomalies in a lab or canary POP to validate runbooks.

## Signals and KPIs That Matter

Not all metrics are useful. Pick the ones that actually tell you about user impact and policy drift. Here's what I watch:

- Count of prefixes by RPKI state (Valid/Invalid/NotFound) for your space and received.
- MOAS and subprefix alerts per day; mean time to acknowledge.
- Updates per second by neighbor and by prefix; sustained churn alarms.
- Prefix count and max-prefix near trips by neighbor.
- Paths with private ASNs, bogon space, or unusual attributes.
- Data-plane loss or latency correlated with control-plane changes.

Set explicit thresholds based on your actual traffic patterns. Budget for a certain amount of normal churn. Then alert only when you exceed those thresholds. Alerting on every single update is how you train your team to ignore alerts.

## A Short Runbook Example

It's Tuesday morning. Coffee hasn't kicked in yet. You see a spike of prefixes from a peer. You check your external monitoring and notice your customer's /19 is now also originating from an unfamiliar AS. Worse, some route collectors are preferring that path over yours.

- Classify: This looks like a route leak from the peer's customer. Probably someone changed an export policy and didn't test it.
- Confirm: RPKI marks the peer-learned route as Invalid. Your MOAS alert fired. Flow data shows traffic is actually shifting to the leaked path.
- Contain: Drop Invalid routes on import (you should already have this configured, but verify). Lower local preference for routes from that neighbor. Apply NO_EXPORT to your outbound announcements just to be safe.
- Communicate: Open a ticket with the peer's NOC. Give them evidence: prefix, exact timestamps, AS paths, ROA details. Ask them to filter their customer and fix the route tagging. Be specific because vague tickets go nowhere.
- Backstop: If users are still having problems, announce a more-specific /20 to pull traffic back to your network. This is temporary. Withdraw it once the leak is actually fixed.
- Postmortem: Add a peer-locking filter so you'll never accept customer prefixes via peers again. Tighten max-prefix limits on that session. If you have a policy simulator, add this scenario as a test case so it doesn't happen again.

Pretty mundane, right? That's kind of the point. Most BGP anomalies aren't exotic attacks or mysterious protocol bugs. They're policy configuration problems with known, repeatable fixes. The hard part isn't the fix—it's seeing the problem fast enough and having the process to execute cleanly under pressure.

## The Bottom Line

BGP anomalies are part of daily Internet physics. Your job isn't to prevent every route flap (impossible). It's to set guardrails, catch problems early, and respond in ways that don't create more problems than you're solving. Start with strong import and export discipline, get RPKI-ROV running, and actually monitor the signals you're collecting.

If you want to do something useful this week, pick three things:

1. Enable and verify RPKI-ROV on one edge router. Just one. See how it goes.
2. Set up MOAS and subprefix alerts for your most important prefixes. Start with five prefixes if you're overwhelmed.
3. Write a one-page route-leak runbook. Then run a tabletop exercise with your team. The first time you use a runbook shouldn't be during an actual incident.

Small, tested steps work better than heroic firefighting. Plus they scale, and firefighting doesn't.