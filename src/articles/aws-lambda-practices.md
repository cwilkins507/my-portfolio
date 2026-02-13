---
title: "AWS Lambda Practices: Messaging & Compute Best Practices"
date: "2025-12-09"
tags: ["AWS", "Lambda", "SQS", "Serverless", "Distributed Systems", "DevOps", "SNS"]
excerpt: "A breakdown of production-ready AWS Lambda and SQS configurations, covering visibility timeouts, batch sizes, failure handling, and idempotency strategies."
seo_title: "AWS Lambda and SQS Best Practices for Production Systems"
meta_description: "Production-ready AWS Lambda and SQS patterns. Learn visibility timeouts, batch processing, dead letter queues, idempotency, and SNS fan-out configurations."
target_keywords: "AWS Lambda best practices, SQS configuration, Lambda SQS integration, serverless best practices, AWS messaging patterns"
---
# AWS Messaging & Compute: SNS, SQS, Lambda Production Patterns

Congrats! You just finished a phase 1 for an Event-driven Architecture refactor you are leading. Your team set up SQS for events, lambdas for serverless functions, and SNS for notifications. You run your first full runthrough in UAT and **POOF** 

Your service feels sluggish, you gained a cold start problem, you invoked triple the lambdas, a growing DLQ, and a forecasted AWS bill for the month above what you projected after promising the leadership team the exact opposite. Now what...?

Modern serverless pipelines don’t magically hum along just because you wired SNS → SQS → Lambda in the “right” order. Dialing in timeouts, DLQs, retries, and concurrency is where the real work starts. 

_Note: This specifically applies to **Messaging.** Keep an eye out for a future write-up for API Gateway Triggered AWS Services_

## Configuring for Production

Agenda:
- **SQS Visibility Timeout** — the 6× rule
- **Batch size calculation** — formula and example
- **DLQ and retry strategy** — maxReceiveCount
- **Queue configuration** — long polling, retention, delays
- **Failure handling** — partial batches and poison pills
- **Performance testing** — load test setup
- **Takeaways**

## Lambda Timeout Constraints

**Hard limits**:
- Maximum Lambda timeout: 15 minutes (900 seconds)
- Cannot be increased beyond this limit
- Applies to all Lambda functions

**If 15 min isn’t enough**:
- Step Functions — orchestrate multiple Lambda invocations (up to 1 year)
- ECS/Fargate — for long-running processes (hours/days)
- Batch jobs — AWS Batch for compute-intensive workloads
- Break into smaller chunks — process in stages, store intermediate state in S3/DynamoDB

**For SQS → Lambda**:
- Most message processing should complete in seconds to low minutes
- If approaching 15 min, consider architectural changes
- Visibility timeout can be up to 12 hours (43,200 seconds)

## Visibility Timeout ≥ 6× Lambda Timeout

**Why 6×**: Covers retries, cold starts, and jitter without duplicate pickup.

Visibility timeout formula:
V ≥ max(6 × Tλ, R × Tλ + W + S)

Where:
- Tλ = Lambda timeout (seconds), max 900s
- R = Max retry attempts (2–3 typical)
- W = Batching window (0–5s)
- S = Startup safety (5–10s)

Example:
- Lambda timeout = 900s
- V ≥ 6 × 900 = 5400s (90 minutes)

What happens if V = Tλ?
- V = Tλ = 900s: message becomes visible the instant Lambda times out
- No gap for backoff, jitter, or cold start delays
- Message immediately re-picked by any available Lambda
- Rapid retry loop exhausts retries quickly → DLQ
- Real problem: zero retry spacing wastes invocations and prevents transient recovery

## Concurrency, Visibility, and Batch Sizing

**Key**: A long visibility timeout doesn't block other messages; it isolates retry chains.

### Batch Size Calculation

Formula:
Batch Size ≤ (Tλ × (1 − M)) / Tm

Where:
- Tλ = Lambda timeout (seconds)
- Tm = per-message processing time (use p95)
- M = safety margin (fraction), e.g., 0.2 → use 80% of timeout

### Understanding Percentiles vs Average

10 messages: 3s, 4s, 4s, 4s, 5s, 5s, 6s, 6s, 7s, 28s (1 outlier)

- Average = 7.2s (skewed by 28s)
  - Bad batch size: (900 × 0.8) / 7.2 ≈ 100 → too many
- p95 = 7s (reflects typical behavior)
  - Better batch size: (900 × 0.8) / 7 ≈ 102 → accurate
- p99 = 28s (slowest 1%)
  - Use for max timeout or DLQ investigation, not batch sizing

**Why p95 for Tm**: prevents over-provisioning and batch size errors from outliers.

### How to Get Message Time (Tm)

**CloudWatch Logs Insights**:
```sql
fields @timestamp, @message
| filter @message like /processing message/
| parse @message "processing message * took *ms" as messageId, durationMs
| stats
    avg(durationMs) as avgMs,
    percentile(durationMs, 95) as p95,
    percentile(durationMs, 99) as p99
```

**Custom CloudWatch Metrics (per batch)**:
```python
cloudwatch.put_metric_data(
    Namespace="SQS/Lambda",
    MetricData=[{
        "MetricName": "MessagesProcessed",
        "Value": len(batch)
    }]
)
# Metric Math: Lambda Duration / MessagesProcessed
```

_Use p95 or p99, not average._

## DLQ and maxReceiveCount

For 3 retries: set maxReceiveCount = 4 (1 initial + 3 retries).

### Queue Configuration Essentials

| Setting | Value | Benefit |
| --- | --- | --- |
| receive_message_wait_time_seconds | 10–20s | Long polling reduces cost |
| message_retention_period | 3–7 days | Post-incident investigation |
| delivery_delay | 0–300s | Smooth bursty traffic |
| maximum_message_size | 256 KB | Use S3 pointer for larger |

_Long polling reduces empty receives by ~90%._

## Failure Handling Flow

Config: enable ReportBatchItemFailures (RBF) + bisect_batch_on_function_error (BB) in Event Source Mapping (ESM); set DLQ on the source queue with maxReceiveCount = 4.

### Lambda Event Source Mapping Settings

| Setting | Value | Benefit |
| --- | --- | --- |
| batch_size | Messages per invocation | Calc: (Tλ × 0.8) / Tm |
| maximum_batching_window_in_seconds | Accumulation delay | 0–5s (latency) or 10–30s (cost) |
| maximum_concurrency | Cap Lambda scaling | Protect downstream systems |
| bisect_batch_on_function_error | Poison pill isolation | true |
| function_response_types | ["ReportBatchItemFailures"] | Partial retry |
| report_batch_item_failures | Partial retry protocol | Return failed IDs only |

### 1. Event Source Mapping (ESM)

**What**: the bridge connecting SQS queue to Lambda function.  
**Where**: AWS Console → Lambda → Function → Triggers → SQS.

Terraform:
```hcl
resource "aws_lambda_event_source_mapping" "sqs_trigger" {
  event_source_arn                   = aws_sqs_queue.my_queue.arn
  function_name                      = aws_lambda_function.processor.arn
  batch_size                         = 10
  enabled                            = true
  function_response_types            = ["ReportBatchItemFailures"] # RBF
  bisect_batch_on_function_error     = true                        # BB
}
```

### 2(a). report_batch_item_failures (RBF)

**What**: Lambda returns partial failures instead of all-or-nothing.  
**Why**: if 1 out of 10 fails, only retry that 1.

Lambda must return:
```python
return {
  "batchItemFailures": [
    {"itemIdentifier": message["messageId"]}  # Failed message ID
  ]
}
```

Config: set function_response_types = ["ReportBatchItemFailures"] in ESM.  

_Important: only failed messages return to the queue; they aren't mixed into new batches._

### 2(b). RBF Retry Behavior

Failed messages retry separately, not mixed with new messages.

### 3. bisect_batch_on_function_error (BB)

**What**: auto-split batches when the Lambda crashes or times out.  
**Why**: isolate poison pills so one bad message doesn’t block many.

How it works:
- Batch of 10 fails → split into 2 batches of 5
- Failing batch of 5 → split into 2–3
- Continue until bad message isolated or batch size = 1

### 4. Dead Letter Queue (DLQ)

**What**: SQS queue for messages that exceed maxReceiveCount.  
**Why**: isolate poison pills for investigation without blocking the main queue.

Setup:
- Create separate SQS queue: my-queue-dlq
- Configure DLQ on the source queue (not on Lambda)

Terraform:
```hcl
resource "aws_sqs_queue" "dlq" {
  name = "my-queue-dlq"
}

resource "aws_sqs_queue" "main" {
  name = "my-queue"
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.dlq.arn
    maxReceiveCount     = 4 # 1 original + 3 retries
  })
}
```

## Performance Testing Strategy

Test scenarios:
| Scenario | Rate | Concurrency | Batch | Duration | Purpose |
| --- | --- | --- | --- | --- | --- |
| Baseline | 100 msg/s | 5 | 10 | 10 min | Normal operations benchmark |
| Peak Load | 500 msg/s | 25 | 20 | 5 min | Business-hour capacity |
| Spike | 2000 msg/s | 100 | 10 | 2 min | Burst resilience |
| Soak | 200 msg/s | 10 | 10 | 60 min | Memory leaks, connection exhaustion |
| Failure | 50 msg/s (10% bad) | 5 | 10 | 10 min | DLQ flow, partial retries |

**Why these parameters**:

1. Baseline (100 msg/s, Concurrency=5)
- Establish steady-state metrics (p95 latency, Lambda duration, queue depth)
- Low concurrency approximates off-peak; validates per-instance throughput

2. Peak Load (500 msg/s, Concurrency=25, Batch=20)
- Establish daytime capacity
- Higher concurrency keeps per-instance rate constant
- Larger batch reduces invocation cost; tests batch limits

3. Spike (2000 msg/s, Concurrency=100, Batch=10)
- Validate burst scaling and recovery
- Keep batch constant to compare processing time
- Short duration reflects real spikes
- Note: ensure reserved concurrency or account limit supports 100

4. Soak (200 msg/s, Concurrency=10, 60 min)
- Detect memory growth, connection pool issues, gradual degradation
- Sustained above-baseline stress without peak extremes

5. Failure (50 msg/s with 10% bad, Concurrency=5)
- Validate error handling, DLQ flow, and partial retry correctness
- Focus on failure behavior over throughput

## Concurrency Logic Explained

Scale concurrency proportionally (5 → 25 → 100) to maintain constant ~20 msg/s per Lambda.

## Performance Baselines to Capture

| Metric | Target | Actual |
| --- | --- | --- |
| End-to-end latency (p95) | < 5s | ___ |
| Lambda duration (p95) | < 80% of timeout | ___ |
| Lambda error rate | < 1% | ___ |
| SQS queue depth (max) | < 1000 | ___ |
| DLQ message count | 0 | ___ |
| Downstream latency (p95) | < 500ms | ___ |

**Key observations**:
- Cold starts spike on first invocations
- Memory growth over time (soak test)
- Visibility timeout races under error load

**CloudWatch alarms — _must have_**:

SQS:
- ApproximateNumberOfMessagesVisible > threshold
- AgeOfOldestMessage approaching retention
- ApproximateNumberOfMessagesNotVisible unexpected spike
- DLQ message count > 0

Lambda:
- Concurrency utilization > 80%
- Throttles > 0
- Error percentage > 1%
- Duration approaching timeout

## Idempotency: Why and How

**Why**:
- Standard SQS provides at-least-once delivery (duplicates possible)
- Visibility races, network retries, and Lambda retries can reprocess messages
- Without idempotency: double charges, duplicate inventory deduction, repeated emails

**Where**:
- Before external side effects (DB writes, API calls, payments)
- At message processing entry point (start of handler)

## Idempotency Strategies

### 1. Idempotency Key in Database

**Pattern**: store unique message ID before processing.
```python
import time
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("IdempotencyStore")

def process_message(message):
    message_id = message["messageId"]

    # Check if already processed
    existing = table.get_item(Key={"MessageId": message_id})
    if "Item" in existing:
        print(f"Duplicate: {message_id} already processed")
        return  # Skip processing

    # Store idempotency key with TTL (e.g., 7 days)
    now = int(time.time())
    table.put_item(Item={
        "MessageId": message_id,
        "ProcessedAt": now,
        "TTL": now + 604800  # 7 days
    })

    # Process message (DB write, API call, etc.)
    process_business_logic(message)
```
**Where**: DynamoDB table with MessageId as partition key and TTL enabled.

### 2. Conditional Writes (Database-Level)

**Pattern**: use database constraints to prevent duplicates.
```python
# PostgreSQL example with unique constraint on order_id
def process_order(order_id, amount):
    try:
        cursor.execute("""
            INSERT INTO orders (order_id, amount, status, created_at)
            VALUES (%s, %s, 'processed', NOW())
        """, (order_id, amount))
        conn.commit()
    except psycopg2.IntegrityError:
        # Duplicate order_id - already processed
        print(f"Duplicate order: {order_id}")
        conn.rollback()
        return
```
_Idempotent: no double processing when the unique constraint is present._

### 3. AWS Lambda Powertools Idempotency

**Pattern**: built-in decorator with DynamoDB persistence.
```python
import json
from aws_lambda_powertools.utilities.idempotency import (
    IdempotencyConfig, DynamoDBPersistenceLayer, idempotent
)

persistence_layer = DynamoDBPersistenceLayer(table_name="IdempotencyTable")
config = IdempotencyConfig(expires_after_seconds=3600)  # 1 hour TTL

@idempotent(config=config, persistence_store=persistence_layer)
def process_payment(payment_data):
    charge_customer(payment_data["customer_id"], payment_data["amount"])
    send_receipt(payment_data["email"])
    return {"status": "success"}

def lambda_handler(event, context):
    for record in event["Records"]:
        message = json.loads(record["body"])
        process_payment(message)  # Automatic deduplication
```
Docs: https://docs.powertools.aws.dev/lambda/python/latest/utilities/idempotency/

## Idempotency Rules

| Strategy | Benefit |
| --- | --- |
| Use SQS MessageId | Built-in unique identifier per message |
| Add TTL to idempotency store | Prevent unbounded table growth (7–14 days) |
| Idempotency key = business key | Use order_id or transaction_id where possible |
| Check before side effects | DB writes, payments, emails, external APIs |
| Handle check failures gracefully | Network errors during check → safe retry |
| Consider FIFO queues | Exactly-once within constraints (300 msg/s limit) |

Idempotency key sources (preference order):
- Business key (order_id, transaction_id)
- SQS MessageId
- Hash of message body

## Architecture Anti-Patterns

| Anti-pattern | Alternative |
| --- | --- |
| V < Tλ or V = Tλ | V ≥ 6 × Tλ |
| Large batch + slow processing | Right-size batch with margin |
| No DLQ or no DLQ alarms | DLQ + alarms + isolation |
| Redrive all without triage | Throttled redrive + validation |
| Unbounded Lambda concurrency | maximum_concurrency cap |
| No idempotency | Idempotency keys/checks (DynamoDB or DB constraints) |

## Takeaways

- Visibility timeout = 6× Lambda timeout to avoid duplicate pickup
- Batch size formula: (Tλ × 0.8) / Tm; use p95 message time
- maxReceiveCount = 1 + retries (e.g., 4 for 3 retries)
- Enable partial retries: ReportBatchItemFailures + bisect_batch_on_function_error
- DLQ alarms must exist; silent failures are production killers
- Load test before production: baseline → peak → spike → soak
- Always implement idempotency; SQS can deliver duplicates

## Resources and Next Steps

**Tools**:
- CloudWatch Logs Insights — per-message timing
- CloudWatch Dashboards — real-time monitoring
- X-Ray — end-to-end tracing
- AWS Lambda Powertools — structured logging and metrics

**Testing**:
- Run baseline load test (100 msg/s, 10 min)
- Establish p95/p99 baselines for key metrics
- Schedule weekly soak tests

**Configuration review checklist**:
- [ ] Visibility timeout ≥ 6× Lambda timeout
- [ ] Batch size validated with formula
- [ ] DLQ + alarms configured
- [ ] ReportBatchItemFailures enabled
- [ ] Load test completed

## Detailed Throughput Calculation

Throughput = (Batch Size × Concurrency) / Avg Processing Time

Example:
- Batch Size = 20
- Concurrency = 10 Lambda instances
- Avg processing time per message = 2s

Throughput = (20 × 10) / 2 = 100 messages/second

Constraints:
- Lambda account concurrency limit
- Downstream throttling (DB connections, API rate limits)
- SQS FIFO limit: 300 msg/s per API action

## S3 Pointer Pattern for Large Messages

**Pattern**: store payload in S3, send a reference in SQS (< 256 KB). Retrieve from S3 in the consumer Lambda.



## Conclusion

Production-grade messaging on AWS rewards careful math and tight guardrails. 

Tune timeouts, cap concurrency, and measure with percentiles. 

Prove behavior under load before deploying. 

Run the checklist today and harden one pipeline end-to-end—then scale the pattern across your stack.