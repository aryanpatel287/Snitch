# Sciolto Authentication Load Test Comparison Ledger

This file contains the historical results and latency/throughput metrics of our load test runs for write-heavy auth endpoints. Use this table to measure performance improvements.

| Run Date & Time | Env / Setup | Total VUs | Success Rate | Mean Latency | p95 Latency | p99 Latency | Bottlenecks / Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-07-23 13:26 | Pre-Optimization | 90 | 100% | 625.8 ms | 1,525.7 ms | 2,186.8 ms | CPU bounds on Bcrypt; Resend email API synchronous overhead (avg 1.35s). |
| 2026-07-23 15:02 | Post-Optimization (Async Queue) | 90 | 100% | 279.7 ms | 407.5 ms | 468.8 ms | **Massive speedup**: average latency down by 55.3%, p95 down by 73.3% due to email offloading. |
| 2026-07-23 15:05 | Post-Optimization (Rate Limit) | 90 | 28.8% (64 requests got 429) | 88.9 ms (overall) | 252.2 ms | 308.0 ms | **Rate limiter successfully throttled** excessive requests from same IP. 429s returned in ~56ms, blocking CPU exhaustion. |
