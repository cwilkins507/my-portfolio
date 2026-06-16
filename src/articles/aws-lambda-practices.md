---
title: "The SQS-to-Lambda Settings That Prevent Retry Storms"
date: "2025-12-09"
tags: ["AWS", "Lambda", "SQS", "Serverless", "Distributed Systems", "DevOps"]
excerpt: "A fact-checked guide to SQS-triggered Lambda functions: visibility timeouts, partial batch responses, DLQs, concurrency caps, idempotency, and load tests."
image: "/images/articles/aws-lambda-practices.png"
image_alt: "Serverless architecture pattern showing event queues, Lambda compute, retries, and failure handling."
seo_title: "AWS Lambda and SQS Best Practices for Production Systems"
meta_description: "Configure SQS-triggered Lambda functions with correct visibility timeouts, partial batch responses, DLQs, concurrency controls, idempotency, and load tests."
target_keywords: "AWS Lambda best practices, SQS configuration, Lambda SQS integration, serverless best practices, AWS messaging patterns"
related_articles: ["microservice-redesign", "architecture-as-code", "bgp"]
faqs:
  - q: "What should the SQS visibility timeout be relative to the Lambda timeout?"
    a: "AWS recommends at least six times the Lambda function timeout, plus MaximumBatchingWindowInSeconds when a batching window is configured."
  - q: "What does ReportBatchItemFailures do?"
    a: "It lets a Lambda function report individual failed SQS messages so successfully processed messages in the same batch are not retried."
  - q: "Should I use bisect_batch_on_function_error with SQS?"
    a: "No. BisectBatchOnFunctionError applies to stream event sources such as Kinesis and DynamoDB Streams, not SQS. For SQS, use partial batch responses and a dead-letter queue."
  - q: "How should I choose an SQS-to-Lambda batch size?"
    a: "Start small, then load test with real message sizes and processing times. Choose a batch that finishes comfortably inside the function timeout and does not overload downstream systems."
  - q: "Why must an SQS Lambda consumer be idempotent?"
    a: "SQS and Lambda event source mappings process messages at least once, so duplicate delivery and retries are expected behavior."
---
The first full UAT run of a new SQS-to-Lambda pipeline can look fine for a few minutes. Then one slow dependency turns a batch into retries, successful messages run again, queue age climbs, and the dead-letter queue starts collecting evidence.

The wiring was not the hard part. The settings were.

SQS-triggered Lambda functions are at-least-once systems. Messages can be delivered more than once, a failed record can cause successful neighbors to retry, and Lambda can scale faster than the database or API behind it. Production reliability comes from making those behaviors explicit.

This article covers SQS event source mappings. Kinesis and DynamoDB Streams have different failure controls, and mixing their settings into SQS guidance creates configurations that look plausible but do nothing.

## Start with the correct visibility timeout

When Lambda receives an SQS batch, the messages remain in the queue but become hidden for the visibility timeout. Lambda deletes them after successful processing. If processing fails or times out, the messages become visible again and can be retried.

[AWS recommends](https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html) setting the queue visibility timeout to:

```text
visibility timeout >= 6 * Lambda function timeout + MaximumBatchingWindowInSeconds
```

The six-times recommendation gives Lambda room to retry when an invocation is throttled. Lambda also requires the function timeout to be less than or equal to the queue visibility timeout.

Example:

- Lambda timeout: `60 seconds`
- Maximum batching window: `5 seconds`
- Minimum recommended visibility timeout: `365 seconds`

Do not treat six times as proof that the function is healthy. It is a retry allowance, not a performance target. If normal processing regularly approaches the function timeout, fix the slow work, reduce the batch, or move long-running coordination into a better-fitting service.

Lambda functions have a maximum timeout of 15 minutes. SQS visibility timeout can be configured up to 12 hours, but increasing it does not turn Lambda into a good long-running worker.

## Partial batch responses are the SQS poison-pill control

By default, one failed message causes the entire SQS batch to return to the queue after the visibility timeout. That means nine successful records can run again because the tenth failed.

Enable `ReportBatchItemFailures` on the event source mapping and return the IDs of failed messages:

```python
def lambda_handler(event, context):
    failures = []

    for record in event["Records"]:
        try:
            process(record)
        except Exception:
            failures.append({"itemIdentifier": record["messageId"]})

    return {"batchItemFailures": failures}
```

```hcl
resource "aws_lambda_event_source_mapping" "sqs_trigger" {
  event_source_arn        = aws_sqs_queue.main.arn
  function_name           = aws_lambda_function.processor.arn
  batch_size              = 10
  maximum_batching_window_in_seconds = 5
  function_response_types = ["ReportBatchItemFailures"]

  scaling_config {
    maximum_concurrency = 25
  }
}
```

There is no `bisect_batch_on_function_error` in that configuration. The setting applies to stream event sources, not SQS. SQS isolates failed records through partial batch responses and eventually a dead-letter queue.

One more edge case matters: if the function throws an unhandled exception, Lambda treats the whole batch as failed. Catch record-level failures and return them in `batchItemFailures`, or use the [AWS Lambda Powertools Batch utility](https://docs.aws.amazon.com/powertools/python/latest/utilities/batch/).

For FIFO queues, stop after the first failure and return the failed plus unprocessed records. Continuing can break the ordering guarantee. AWS documents this behavior in its [SQS error-handling guidance](https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html).

## Use a DLQ, but do not rush messages into it

Configure the dead-letter queue on the source SQS queue through a redrive policy. AWS recommends setting `maxReceiveCount` to at least `5`, which gives Lambda several chances to process a transient failure before moving the message.

```hcl
resource "aws_sqs_queue" "dlq" {
  name = "orders-dlq"
}

resource "aws_sqs_queue" "main" {
  name                       = "orders"
  visibility_timeout_seconds = 365
  receive_wait_time_seconds  = 20

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.dlq.arn
    maxReceiveCount     = 5
  })
}
```

A DLQ is not a trash can. Alarm on new messages, preserve enough retention for investigation, and define how a message gets inspected, fixed, and redriven. Blindly replaying a poison pill is just a retry storm with extra steps.

## Cap concurrency around the downstream system

Lambda polls standard SQS queues and scales concurrent invocations as work arrives. That is useful until the consumer opens more database connections, API requests, or file handles than the downstream system can support.

Use `maximum_concurrency` on the event source mapping to place a ceiling on that queue's consumer. The right number comes from the downstream capacity and observed processing time, not a generic serverless rule.

For FIFO queues, concurrency is also limited by the number of message group IDs. One busy message group remains sequential even when the function has more concurrency available.

Watch these signals together:

- `ApproximateAgeOfOldestMessage`
- visible and not-visible message counts
- Lambda duration, errors, throttles, and concurrency
- DLQ message count
- downstream latency, saturation, and error rate

Queue depth alone can mislead you. A growing queue may mean the consumer is under-provisioned, intentionally capped to protect a dependency, or stuck retrying failures. The surrounding metrics tell you which one.

## Choose batch size with a load test, not a neat formula

A batch has to fit inside Lambda's synchronous invocation payload limit and finish before the function timeout. Standard queues support a larger configured batch size than FIFO queues, and batch sizes above `10` require a batching window of at least one second.

Those are service limits, not recommendations.

Start with a small batch, then test real messages and real dependencies. Increase it only while:

- the batch finishes comfortably inside the timeout
- partial failures behave correctly
- memory use stays controlled
- downstream systems remain healthy
- the larger batch improves cost or throughput enough to matter

A simple throughput estimate can help plan a test:

```text
messages per second ~= batch size * concurrent invocations / batch duration
```

Use the measured duration of the whole batch. Dividing Lambda duration by message count only makes sense when records run sequentially and have similar work; parallel processing and uneven messages break that shortcut.

## Make side effects idempotent

[AWS documents SQS event processing as at least once](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html). Duplicate delivery is not an edge case you can tune away.

Use a stable business key such as `order_id`, `payment_id`, or `event_id` when the producer can provide one. An SQS `MessageId` identifies a queue message, but a producer retry that sends the same business event again receives a new message ID.

The idempotency check and the protected side effect must also work together under concurrency. A read-then-write sequence can race:

```python
existing = table.get_item(Key={"Id": event_id})
if "Item" not in existing:
    table.put_item(Item={"Id": event_id})
    charge_customer()
```

Two invocations can both pass the read before either writes. Use a conditional write, a database uniqueness constraint, or the [AWS Lambda Powertools Idempotency utility](https://docs.aws.amazon.com/powertools/python/latest/utilities/idempotency/), which handles concurrent requests and repeated calls.

Place the guard before irreversible side effects and decide how long the idempotency record must live. The retention window should match how long duplicates can still matter to the business action.

## Test the failures you expect to survive

Do not copy round-number load-test rates from somebody else's architecture. Derive scenarios from your traffic, service quotas, downstream capacity, and failure budget.

At minimum, test:

1. **Normal load:** expected message mix and steady arrival rate.
2. **Peak and burst:** the highest credible arrival rate and recovery time.
3. **Slow dependency:** downstream latency approaching the Lambda timeout.
4. **Poison message:** one record fails repeatedly inside a mixed batch.
5. **Throttling:** maximum concurrency protects the dependency while queue age grows.
6. **Duplicate delivery:** the same business event arrives more than once.
7. **DLQ redrive:** operators can inspect and safely replay a corrected message.

The pass condition is not "Lambda scaled." It is that the pipeline protects downstream systems, retries only what should retry, preserves required ordering, and makes failed work visible.

## Production checklist

- [ ] Visibility timeout is at least `6 * function timeout + batching window`
- [ ] `ReportBatchItemFailures` is enabled and implemented
- [ ] FIFO consumers stop after the first failed record
- [ ] Source queue has a DLQ with an intentional `maxReceiveCount`
- [ ] DLQ arrival and queue age have alarms
- [ ] Event source mapping concurrency protects downstream capacity
- [ ] Side effects are idempotent under concurrent retries
- [ ] Batch size and timeout were load tested with real messages
- [ ] Redrive procedure was tested

SQS and Lambda are reliable when the failure behavior is designed, not assumed. Configure the retry envelope, isolate failed records, cap the blast radius, and prove the pipeline under load before production does it for you.
