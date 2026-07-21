<!-- prettier-ignore -->
<div align="center">

<h1>Sciolto</h1>

_A premium, high-contrast luxury streetwear e-commerce platform featuring modular dart-sass styling, server-side paginated queries, client-side pagination caching, and ImageKit image serialization._

[![Node version](https://img.shields.io/badge/Node.js->=18-3c873a?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![React version](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Express version](https://img.shields.io/badge/Express-5.0-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB version](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongoosejs.com)
[![Redis version](https://img.shields.io/badge/Redis-ioredis_5-FF4438?style=flat-square&logo=redis&logoColor=white)](https://redis.io)

[Overview](#overview) • [Key Features](#key-features) • [Tech Stack](#tech-stack) • [Architecture](#architecture) • [Getting Started](#getting-started) • [Testing](#testing)

</div>

---

## Overview

Sciolto is a modern streetwear e-commerce platform built with a high-contrast editorial brand aesthetic. It features a responsive React 19 single-page client and a robust Express.js backend API backed by MongoDB and Redis. 

The application utilizes server-side pagination, dynamic category and price filtering, a comprehensive seller inventory dashboard, custom variant management (sizes and colors), base64 image serialization, and ImageKit integration.

For developer guides and specific setup details:
* To configure and launch the API server, see the [Server README](file:///home/aryan-patel/workspace/Snitch/server/README.md).
* To configure and launch the Vite client, see the [Client README](file:///home/aryan-patel/workspace/Snitch/client/README.md).

> [!NOTE]
> Make sure to have both MongoDB and Redis servers running locally or remotely before launching the application.

---

## Key Features

- **High-Contrast Editorial Canvas**: High-contrast typographic brand styling utilizing Google Poppins display and Satoshi body typefaces alongside a clean pure white/black palette.
- **Client-Side Page Caching**: Integrates a Redux-based pagination cache (`productsByPage`) to cache loaded catalog pages, making backward/forward browsing transitions instant (0ms) and invalidating the cache cleanly on filter resets.
- **Dynamic Product Variants**: Allows sellers to define custom attributes (such as size and color), manage individual variant stock/pricing, and toggle variant-specific galleries that resolve dynamically when attributes match.
- **Server-Side Pagination & Filters**: Offloads search, category matching, price filters, and sorting parameters directly to optimized MongoDB queries rather than relying on in-memory client operations.
- **Multi-Sidebar Seller Dashboard**: Fully responsive dashboard providing inventory listings, inline product editing with modification detection, and embedded creation workflows.
- **Secure JWT Authentication**: HTTP-only cookie-based authentication with user role enforcements (`buyer`/`seller`) and session blacklisting in Redis upon logout.
- **Robust Media Pipeline**: In-memory Multer storage configuration processing image uploads, converting variant assets to base64, and storing them directly to ImageKit CDN.
- **Gmail & Resend Integrations**: Supports password reset flows via Gmail OAuth2 client and Resend API.
- **Automated Catalog Seeding**: Automated script to populate size and waist variant streetwear catalogs fetched from external sources into ImageKit and MongoDB.

---

## Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Client** | React 19, Vite 7, Redux Toolkit, React Router 7 | Frontend framework, fast build pipeline, global state management, and declarative routing. |
| **Styling** | Sass / SCSS (Dart Sass) | Structured feature partials using Sass `@use` and BEM methodology (no utility css). |
| **Server** | Express.js (v5+) | Backend API framework, validators, and modular controllers. |
| **Database** | MongoDB + Mongoose 9 | Document storage, models, and compound indexing. |
| **Caching** | Redis (ioredis v5) | Token blacklists and session storage. |
| **Services** | ImageKit, Resend API, Gmail API | Media hosting CDN, password reset emails, and email delivery. |
| **Testing** | Vitest + Supertest | Unit and integration testing suites for client and server. |

---

## Architecture

Sciolto uses a clean, decoupled architecture:

```text
Sciolto/
├── client/                 # React frontend application (Vite 7)
│   ├── src/
│   │   ├── app/            # App setup, store, and routes
│   │   ├── features/       # Feature-first modular directories (auth, products, shared, user)
│   │   └── main.jsx        # App entry point
├── server/                 # Express API server (Node ESM)
│   ├── src/
│   │   ├── config/         # Environment config and DB connect clients
│   │   ├── controllers/    # API controllers
│   │   ├── middlewares/    # Custom middlewares (auth, upload)
│   │   ├── models/         # Mongoose models (User, Product)
│   │   ├── routes/         # Express endpoint routes
│   │   └── scripts/        # Seeding utility script
```

---

## Getting Started

### 1. Installation
Install dependencies inside both directories:

```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

### 2. Environment Variables
Copy the template configuration file in the server directory to create your `.env` file:

```bash
cd server
cp .env.example .env
```

Open `server/.env` and update the keys with your credentials.

### 3. Database Seeding
Wipe the existing catalog and seed standard products and seller profiles:
```bash
cd server
npm run seed
```

### 4. Running the App
Start the development servers in parallel:

```bash
# Terminal 1: Server
cd server
npm run dev

# Terminal 2: Client
cd client
npm run dev
```

---

## Testing

Run tests locally with Vitest:

```bash
# Server API integration tests
cd server
npm run test

# Client component & hook tests
cd client
npm run test
```
