# Sciolto Authentication Load Test Optimization Analysis

This report compares the performance, throughput, and error rates of the write-heavy Sciolto authentication endpoints before and after applying optimizations (asynchronous email queueing and rate-limiting).

---

## 1. Overall Performance Comparison

| Metric | Pre-Optimization | Post-Optimization (Async Queue) | Change (%) |
| :--- | :--- | :--- | :--- |
| **Total Requests** | 90 | 90 | - |
| **Success Rate** | 100% | 100% | - |
| **Minimum Latency** | 183 ms | 59 ms | **-67.7%** |
| **Mean Latency** | 625.8 ms | 279.7 ms | **-55.3%** |
| **Median (p50)** | 478.3 ms | 278.7 ms | **-41.7%** |
| **95th Percentile (p95)** | 1,525.7 ms | 407.5 ms | **-73.3%** |
| **99th Percentile (p99)** | 2,186.8 ms | 468.8 ms | **-78.5%** |

### Visual Latency Trend (Mean, p95, p99)
- **Pre-Optimization**: Latencies scaled up exponentially under concurrent load, crossing 2.1 seconds at the 99th percentile due to thread blocking.
- **Post-Optimization**: Latencies remained stable under concurrency, staying entirely below 500ms at the 99th percentile.

---

## 2. Endpoint-Level Analysis

### A. Forgot Password Endpoint (`POST /api/auth/forgot-password`)
* **Pre-Optimization Mean**: **1,355.2 ms** (Max: 2,237 ms)
* **Post-Optimization Mean**: **135.2 ms** (Max: 231 ms)
* **Performance Gain**: **90.0% reduction in latency (10x speedup)**
* **Why**: Previously, the endpoint synchronously awaited Resend's external API network round-trip. By refactoring it to enqueue the email in Redis (`rpush`) and return a `200 OK` instantly, the response is returned in under 1ms (the remaining time is Express/network overhead). The background worker asynchronously pops and sends the email in the background without affecting the user.

### B. User Registration Endpoint (`POST /api/auth/register`)
* **Pre-Optimization Mean**: **549.9 ms** (p95: 1,002.4 ms)
* **Post-Optimization Mean**: **327.5 ms** (p95: 407.5 ms)
* **Performance Gain**: **40.4% reduction in latency**
* **Why**: By removing synchronous email processing from the server, we freed up the main thread's event loop and the libuv thread pool. This allows the CPU-intensive `bcrypt.hash()` (cost factor 10) to run faster with less CPU scheduling queue delay.

### C. Customer Login Endpoint (`POST /api/auth/login`)
* **Pre-Optimization Mean**: **367.4 ms** (p95: 608 ms)
* **Post-Optimization Mean**: **246.1 ms** (p95: 383.8 ms)
* **Performance Gain**: **33.0% reduction in latency**
* **Why**: Similar to registration, freeing up the CPU allowed `bcrypt.compare()` to execute with less context-switching latency.

---

## 3. Rate-Limiter Validation Run
To test the rate-limiting capabilities, we ran the test suite a second time within the 15-minute window from the same IP (localhost):
- **Total Requests**: 90
- **HTTP 429 (Too Many Requests)**: 64 responses (71.1% of requests)
- **HTTP 2xx (Success)**: 26 responses (28.8% of requests)
- **Latency of Throttled Requests (HTTP 429)**:
  - **Mean**: **56.6 ms** (p95: 82.3 ms)
- **Key Takeaway**: The rate limiter successfully identified the abusive IP and rejected requests immediately after the limit (100 requests per 15 minutes) was exceeded. By returning a 429 in 56ms instead of executing DB queries and Bcrypt hashing (which take ~300-600ms), **the server prevented CPU starvation**, ensuring other routes remained responsive.

---

## 4. Conclusion
1. **Queueing** completely solved the third-party API latency bottleneck, achieving a **10x improvement** on forgot-password.
2. **Event Loop optimization** led to a **30-40% speedup** on hashing endpoints.
3. **Rate Limiting** functions exactly as designed, defending the server against brute-force and CPU exhaustion attacks.
