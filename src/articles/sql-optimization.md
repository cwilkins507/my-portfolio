---
title: "Postgres SQL Optimization with DBeaver"
date: "2025-12-04"
tags: ["Software Engineering", "Postgres", "SQL Optimization", "DBeaver", "Query Performance", "Database Indexing", "AI for Developers"]
excerpt: "Use DBeaver to run EXPLAIN/ANALYZE, find index gaps, apply VACUUM wisely, and enlist AI to build a safe, testable Postgres tuning plan."
seo_title: "Postgres SQL Optimization: EXPLAIN, Indexing, and VACUUM Guide"
meta_description: "Optimize Postgres queries using DBeaver. Learn EXPLAIN ANALYZE, index strategies, VACUUM tuning, and AI-assisted query optimization for production databases."
target_keywords: "Postgres optimization, SQL EXPLAIN ANALYZE, DBeaver query tuning, PostgreSQL indexing, database performance optimization"
---
# Postgres/SQL Optimization in Local Tools like DBeaver

You're debugging an API endpoint, everything looks fine, then one query tanks your CPU. Someone says "the database is slow today." 

It's not the database. It's your query. Or maybe the test environment is running on half the resources of prod because someone wanted to save $200/month.

Postgres is fast. Most relational databases are. They fall apart when you give them bad execution plans or missing indexes. Sometimes the problem is your ORM generating joins you didn't ask for.

QA environments make this worse because they run on smaller instances. Your query might be fine in production but crawl in dev.

This is why I debug performance in DBeaver first, not CloudWatch.

DBeaver (or TablePlus, DataGrip, whatever) gives you the plan view. It shows which nodes take the most time. Test index changes without deploying anything. Run EXPLAIN on production-shaped data locally.

## Profile first: EXPLAIN and EXPLAIN ANALYZE

I used to guess at what was slow. "Must be the join." "Probably needs an index on user_id." Wrong half the time.

EXPLAIN shows you what the planner thinks will happen. EXPLAIN ANALYZE shows what actually happened. Big difference.

- EXPLAIN: plan only, no execution
- EXPLAIN (ANALYZE, BUFFERS, VERBOSE): runs it and shows actual time, rows, disk I/O
- In DBeaver, the plan view shows this as a tree you can click through

```sql
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT ... -- your query
```

What to look for:

**Scan type** — Seq Scan on a 10M row table? You need an index. Index Scan is what you want for selective WHERE clauses.

**Join method** — Hash Join works for large-to-large. Nested Loop is faster when one side is small and indexed. If you see Nested Loop on two big tables, something's wrong.

**Estimates vs actuals** — Planner says 100 rows, actual is 50,000? Your stats are stale or your predicate isn't selective.

**Buffers** — High read counts mean you're hitting disk. Either you need more RAM or a better index.

**Rows Removed by Filter** — The database scanned 100K rows but only kept 10. That filter should probably be in an index.

Don't be the person who runs EXPLAIN ANALYZE on a DELETE in prod. Wrap it in BEGIN/ROLLBACK if you're testing writes.

You can temporarily disable seq scans with `SET enable_seqscan = off` to force index usage, but turn it back on right after. I've seen people forget this and wonder why production got slower.

## Indexes: find, build, validate

### Find indexes

Check what's already there. You might already have the index you need, or close enough.

```sql
SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public' AND tablename = 'orders';
```

I've found redundant indexes more than once. Like (user_id, created_at) and (user_id). The second one is wasting space.

### Build indexes

Match your WHERE and JOIN columns. Obvious but easy to miss.

For composite indexes, order matters. Put the most selective column first, or the one you filter on most. I got this wrong early on and built (status, user_id) when most queries filtered on user_id alone. Useless.

Partial indexes are great for queries like `WHERE status = 'active'` if most rows aren't active. Smaller, faster.

Expression indexes: if you do `WHERE lower(email) = ...`, index on `lower(email)`.

INCLUDE columns let you cover a query without hitting the heap. Nice when it works.

Always use CONCURRENTLY unless you want to lock the table. I learned this the hard way.

### Validate

Run EXPLAIN again. Did Seq Scan become Index Scan? Did the cost drop? If not, the index isn't helping.

Watch for improved join methods and sorts that stop spilling to disk.

Some indexes don't help. Drop them after a week if query stats show zero usage.

## Keep stats and storage healthy: VACUUM and ANALYZE

VACUUM cleans up dead rows. After big deletes or updates, autovacuum might lag. Run it manually.

ANALYZE updates stats. Do this after bulk inserts or when data distribution changes a lot. Otherwise the planner makes bad guesses.

VACUUM FULL rewrites the entire table and locks it. Only do this during maintenance windows when bloat is actually bad.

Quick checks:

```sql
SELECT relname, n_dead_tup
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC
LIMIT 10;
```

- If index bloat grows with churn, schedule REINDEX (or concurrent) and reassess write patterns.

## Use your client well (DBeaver specifics)

DBeaver has a visual plan viewer. Use it. The tree view shows where time actually goes.

Query Manager tracks your session's queries and timing. Good for finding which of your 15 test queries was the slow one.

Test settings without affecting other sessions:

```sql
SET work_mem = '64MB';
SET application_name = 'tuning';
BEGIN;
-- run experiments
ROLLBACK;
```

- Keep autocommit off during experiments to isolate tests.
- If available, pair with pg_stat_statements to find top offenders.

## A structured tuning loop with AI

Copilot and GPT can suggest indexes if you give them the plan and schema. Sometimes the suggestions are good. Sometimes they're obvious. Occasionally they're wrong.

What works:

1. Export slow queries from pg_stat_statements
2. Run EXPLAIN (ANALYZE, BUFFERS)
3. Paste the plan and table DDL into an AI chat (strip PII first)
4. Ask for index suggestions or query rewrites
5. Test the suggestions in staging
6. Actually measure if they helped
7. Ship if better, revert if not

I've had AI suggest a four-column index when two columns would've been fine. But I've also had it catch sargability issues I missed. Just test everything.

## Close

Pick your slowest query. Run EXPLAIN (ANALYZE, BUFFERS) in DBeaver. See what's actually slow. Add one index. Measure again.

That's it. You don't need to optimize everything at once.
