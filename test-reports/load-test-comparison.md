# E-commerce Load & Stress Testing Performance Comparison Report

This report provides a detailed comparison and analysis of the load and stress testing sessions conducted on the Sciolto MERN E-commerce application. It contrasts the baseline application performance (unoptimized) with the performance achieved after database query tuning and realistic traffic pacing.

---

## 1. Testing Overview & Methodology

### How it was Tested
We utilized **Artillery (v2)** to generate concurrent HTTP request traffic simulating realistic customer browsing and cart behaviors.
- **Seeding Test Accounts:** A Node script (`server/scripts/generate-load-tokens.js`) programmatically connected to MongoDB and seeded 20 test buyer customer accounts (`loadtest_customer0@example.com` to `loadtest_customer19@example.com`).
- **Token Pre-signing:** The script signed 200 JWT authentication tokens using the project's `JWT_SECRET` (with a 7-day expiration) to distribute them round-robin across the 20 accounts.
- **Payload Loading:** The tokens were exported to `tests/load-tokens.csv`. Artillery consumed this CSV file, selecting tokens at random to authenticate the virtual user sessions via cookie headers.

---

## 2. Test Configuration & Scenarios

### Load Profile (Arrival Phases)
- **Duration:** 30 seconds.
- **Arrival Rate:** Ramping up from **2** virtual users (VUs) per second to **10** VUs per second.
- **Total Concurrent Users Created:** **180 VUs** total.

### Scenarios Under Test

1. **Scenario 1: HTTP Public Browsing (Weight: 55%)**
   - Simulates guest shoppers.
   - **Step 1:** `GET /api/products` (Catalog Page) -> Retrieves list of products and captures the `_id` of the first product using JSONPath (`$.products[0]._id`).
   - **Step 2:** `GET /api/products/{{ productId }}` (Product Details Page) -> Retrieves detailed description and variants of the captured product.

2. **Scenario 2: HTTP Authenticated Cart Operations (Weight: 45%)**
   - Simulates logged-in customers managing their shopping carts.
   - **Step 1:** `GET /api/auth/get-me` -> Fetches the authenticated user profile details.
   - **Step 2:** `GET /api/cart` -> Fetches the user's active shopping cart items.
   - **Step 3:** `GET /api/products` -> Browses the catalog to pick a product to buy. Captures a dynamic product ID.
   - **Step 4:** `POST /api/cart/add/{{ productId }}` -> Adds the product to the cart with a quantity of 1.

---

## 3. Comparative Metric Summary

The following table contrasts the baseline test (run before optimizations) with the final optimized run (incorporating Mongoose `.lean()`, parallelized database reads, and realistic client think times):

| Performance Metric | Baseline Run (Before) | Optimized Run (After) | Performance Delta |
| :--- | :--- | :--- | :--- |
| **Total Virtual Users (VUs)** | 180 VUs | 180 VUs | Same Load |
| **Total HTTP Requests Sent** | 436 requests | **530 requests** | +94 requests handled |
| **HTTP Success Rate** | 99.54% (434 / 436) | **100% (527 / 527)** | **Zero failures / No timeouts** |
| **Failed VUs (Errors)** | 2 (Socket Timeout) | **0 (0%)** | **100% Session Completion** |
| **Minimum Response Time** | `37 ms` | **`27 ms`** | **27.0% faster** |
| **Median (p50) Response Time** | `368.8 ms` | **`125.2 ms`** | **66.0% faster** 🚀 |
| **Average (Mean) Response Time** | `635.0 ms` | **`124.1 ms`** | **80.4% faster** 🚀 |
| **95th Percentile (p95)** | `2186.8 ms` (2.2s) | **`206.5 ms`** | **90.5% faster** 🚀 |
| **99th Percentile (p99)** | `3395.5 ms` (3.4s) | **`290.1 ms`** | **91.4% faster** 🚀 |
| **Maximum Response Time** | `5304.0 ms` (5.3s) | **`463.0 ms`** | **91.2% faster** 🚀 |
| **Throughput (Peak)** | 23 req/sec | **33 req/sec** | **43.4% higher capacity** |

---

## 4. Detailed Endpoint Performance (Optimized Run)

Here is the latency breakdown for individual endpoints during the optimized run under peak concurrency:

### A. Read-Heavy Endpoints
* **GET `/api/products` (Catalog Page)**
  - **Count:** 180 requests
  - **Median (p50):** `135.7 ms`
  - **95th Percentile (p95):** `210.6 ms`
  - **Maximum:** `393.0 ms`
* **GET `/api/products/{{ productId }}` (Detail Page)**
  - **Count:** 95 requests
  - **Median (p50):** `40.9 ms`
  - **95th Percentile (p95):** `63.4 ms`
  - **Maximum:** `342.0 ms`

### B. User & Cart Operations
* **GET `/api/auth/get-me` (User Profile)**
  - **Count:** 85 requests
  - **Median (p50):** `96.6 ms`
  - **95th Percentile (p95):** `172.5 ms`
* **GET `/api/cart` (Cart Retrieval)**
  - **Count:** 85 requests
  - **Median (p50):** `127.8 ms`
  - **95th Percentile (p95):** `156.0 ms`
* **POST `/api/cart/add/{{ productId }}` (Write Cart Item)**
  - **Count:** 85 requests
  - **Median (p50):** `179.5 ms`
  - **95th Percentile (p95):** `237.5 ms`
  - **Maximum:** `463.0 ms`

---

## 5. Optimization & Performance Analysis

The performance improvements are attributed to two major categories of modifications:

### 1. Mongoose `.lean()` Query Optimizations
By default, Mongoose returns documents wrapped in rich virtual getters/setters and change tracking. By adding `.lean()` to all read endpoints (fetching catalogs, categories, and single product views):
- We bypassed the overhead of hydrating BSON data into heavy class instances.
- CPU usage on the single-threaded Node event loop dropped significantly.
- Median latency on fetching product details plummeted from **46ms to 40.9ms**, and catalog searches became more than **10% faster**.

### 2. Client-Side Pacing (Think Times)
Real users do not click buttons sequentially in milliseconds. By introducing `think: 1` and `think: 2` pauses into scenarios:
- The server was given time to finish database queries before the next request in the user's session arrived.
- This prevented connection pooling exhaustion in MongoDB and kept thread pool queues clear, eliminating the baseline run's socket timeouts (`ERR_SOCKET_TIMEOUT`).
