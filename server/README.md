<!-- prettier-ignore -->
<div align="center">

<h1>Snitch - Server</h1>

_The Node.js & Express 5 backend API engine for the Snitch storefront, orchestrating MongoDB schemas, Redis token caches, ImageKit uploads, and Gmail OAuth2 reset mailings._

[![Node version](https://img.shields.io/badge/Node.js->=18-3c873a?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express version](https://img.shields.io/badge/Express-5.0-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB version](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongoosejs.com)
[![Redis version](https://img.shields.io/badge/Redis-ioredis_5-FF4438?style=flat-square&logo=redis&logoColor=white)](https://redis.io)

[Features](#features) • [Tech Stack](#tech-stack) • [Folder Structure](#folder-structure) • [Environment Variables](#environment-variables) • [Database Seeding](#database-seeding) • [Running & Testing](#running--testing)

</div>

---

## Features

- **Stateful Cookie Sessions**: Employs HTTP-only cookie JWT tokens (`token` cookie) to track user authentication states, mapping to roles (`buyer` and `seller`).
- **Token Blacklisting**: Connects to Redis to blacklist active JWT credentials on user logout, preventing session replay attacks before token expiration.
- **Dynamic Catalog Queries**: Exposes endpoints supporting compound filtering (by category, price range, colors, and sizes), dynamic sorting (by newest or price ranking), and paginated response splits natively in MongoDB.
- **Variants Pipeline**: Manages product variant structures (attributes, stock, pricing, image arrays) embedded within product models. Accepts base64 serialized variant images on creation, parsing them dynamically for hosting.
- **ImageKit Direct CDN Uploads**: Utilizes in-memory Multer storage configuration to bypass local disk storage, uploading multi-file image attachments directly to ImageKit's CDN.
- **Resend & Gmail Mail Services**: Integrates Nodemailer with Gmail API OAuth2 authentication clients and the Resend API to deliver secure password recovery links containing reset tokens.
- **Early Security Hardening Filters**: Mounts request middleware to intercept and drop suspicious scanner probes looking for local config files (`.env`), PHP paths (`.php`), or backups (`.bak`), returning clean 404s before hitting route handlers.

---

## Tech Stack

- **Runtime**: Node.js (ES Module import syntax)
- **Framework**: Express.js (v5.x)
- **Database**: MongoDB + Mongoose (v9.x)
- **Cache & Session Client**: Redis + `ioredis` (v5.x)
- **File Upload Handler**: Multer + `@imagekit/nodejs`
- **Mail Integrations**: `googleapis` (Gmail OAuth2) + `resend` (Resend SDK) + `nodemailer`
- **Validators**: `express-validator`
- **Testing**: Vitest + Supertest

---

## Folder Structure

```text
server/
├── scripts/                    # Client bundle synchronization helper
├── src/
│   ├── config/                 # Configurations (config.js, db.js, cache.js)
│   ├── controllers/            # Route controllers (auth, product, category)
│   ├── middlewares/            # Custom filters (auth.middleware, upload.middleware, app.middleware)
│   ├── models/                 # Mongoose Schemas (user.model.js, product.model.js)
│   ├── routes/                 # Express routers (auth, product, category, app)
│   ├── scripts/                # Database seeder (seed.js)
│   ├── tests/                  # Integration test suites (auth.test.js, product.test.js)
│   └── validators/             # Request payloads validations (auth.validator, product.validator)
└── server.js                   # Server entry point
```

---

## Environment Variables

Copy the provided environment template to configure the application runtime:

```bash
cp .env.example .env
```

Open `.env` and fill in your keys and credentials.

---

## Database Seeding

The server includes a robust seeding utility script to configure your environment:
* **Wipes existing catalogs**: Clears product collections and specific test seller accounts (`dummymail.me.287@gmail.com`, `skyh53624@gmail.com`, `leopatel967@gmail.com`) to prevent duplicate entry collisions.
* **Seeds official accounts**: Re-creates the 3 designated seller profiles.
* **Fetches and uploads catalog products**: Downloads real product images (shirts, t-shirts, jeans) from Myntra CDN, uploads them to the ImageKit instance, and registers products with size (XS-XXL) and waist (30-38) variants.

Execute the seed script:
```bash
npm run seed
```

---

## Running & Testing

### Development Server
Launches the Express API with `nodemon` for auto-reloading:
```bash
npm run dev
```

### Run Tests
Runs the integration tests once:
```bash
npm run test
```

### Interactive Test Watcher
Launches the Vitest watcher:
```bash
npm run test:watch
```
