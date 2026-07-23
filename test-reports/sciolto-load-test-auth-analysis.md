# Sciolto Authentication Load Test Analysis Report

**Date of Run**: 2026-07-23  
**Report File**: `server/tests/reports/sciolto-load-report-auth-2026-07-23_13-26-16.json`  
**Test Spec**: `server/tests/sciolto-load-test-auth.yml`  
**Target**: `http://localhost:3000`  
**Load Profile**: 30-second ramping phase (1 to 5 arrival VUs/sec)  

---

## 1. Executive Summary
The authentication endpoints (`POST /api/auth/register`, `POST /api/auth/login`, and `POST /api/auth/forgot-password`) were subjected to concurrent traffic load. The results show a clear bottleneck in CPU usage and response times as load ramps up, primarily driven by **Bcrypt password hashing** on registration/login and **third-party Resend API calls** on the forgot-password endpoint.

### Overall Execution Metrics:
* **Total Virtual Users (VUs)**: 90
* **Total HTTP Requests**: 90
* **Success Rate**: 100% (with one 400 Bad Request caused by an email validation failure on the CSV header row `"email"`, which was subsequently resolved with `skipHeader: true`).
* **Errors**: 0 failures (all requests completed and returned HTTP responses).

---

## 2. Response Time Statistics (All Endpoints Combined)

| Metric | Latency (ms) | Notes |
| :--- | :--- | :--- |
| **Minimum** | 183 ms | Fast response under low concurrency. |
| **Median (p50)** | 478.3 ms | Typical response time. |
| **Average (Mean)** | 625.8 ms | Driven upward by slower forgot-password and register requests. |
| **95th Percentile (p95)** | 1,525.7 ms | Significant latency spike under peak concurrency. |
| **99th Percentile (p99)** | 2,186.8 ms | Outliers experiencing severe queueing/network delay. |

---

## 3. Detailed Endpoint Breakdown

### A. Customer Login (`POST /api/auth/login`)
* **Weight**: 50% (42 requests)
* **Response Times**:
  * **Min**: 183 ms
  * **Median**: 308 ms
  * **Mean**: 367.4 ms
  * **p95**: 608 ms
  * **p99**: 645.6 ms
* **Analysis**: Login performs Mongoose database querying and verification of password hashes using `bcrypt.compare()`. It exhibits the lowest latency of the three write-heavy/crypto endpoints because Mongoose queries are indexed, and `bcrypt.compare` operates on a pre-existing hash.

### B. Dynamic User Registration (`POST /api/auth/register`)
* **Weight**: 40% (30 requests)
* **Response Times**:
  * **Min**: 246 ms
  * **Median**: 518.1 ms
  * **Mean**: 549.9 ms
  * **p95**: 1,002.4 ms
  * **p99**: 1,022.7 ms
* **Analysis**: Registration performs `bcrypt.hash(password, 10)` to compute a salt and hash the plaintext password. This is highly CPU-intensive and blocks the Node.js event loop thread pool worker. As concurrency increases, CPU queueing delay causes response times to cross 1 second at the 95th percentile.

### C. Forgot Password Request (`POST /api/auth/forgot-password`)
* **Weight**: 10% (18 requests)
* **Response Times**:
  * **Min**: 282 ms
  * **Median**: 1,380.5 ms
  * **Mean**: 1,355.2 ms
  * **p95**: 2,186.8 ms
  * **p99**: 2,186.8 ms
* **Analysis**: The forgot-password endpoint is the slowest by a wide margin (average response time ~1.35 seconds). This is due to synchronous I/O waiting on the third-party **Resend API** to process the transactional reset email. Under concurrency, these outbound HTTPS requests add significant network round-trip latency.

---

## 4. Key Performance Bottlenecks & Recommendations

### 1. CPU Saturation from Bcrypt Hashing
* **The Issue**: `bcrypt.hash` with `10` rounds of salt is CPU-intensive. When multiple virtual users register or log in concurrently, the system's CPU is saturated, leading to queueing delays.
* **Recommendations**:
  * Implement an auth-rate-limiting middleware to protect the server from Bcrypt-based Denial of Service (DoS) attacks.
  * Offload Bcrypt hashing to a separate service/worker pool if auth traffic becomes a primary bottleneck, or consider utilizing lighter hashing algorithms (e.g., Argon2id) if security compliance permits.

### 2. Synchronous Outbound API Latency
* **The Issue**: The `/api/auth/forgot-password` endpoint awaits `sendEmail` before returning the response. This couples client response times directly to Resend's API response time.
* **Recommendations**:
  * **Asynchronous Email Queueing**: Offload email sending to a background job queue (e.g., BullMQ, Agenda) backed by Redis. This allows the API to return a `200 OK` response instantly (within 10–20ms) while the email is sent asynchronously.
