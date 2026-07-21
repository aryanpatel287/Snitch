<!-- prettier-ignore -->
<div align="center">

<h1>Sciolto - Client</h1>

_The React 19 & Vite 7 frontend SPA client for the Sciolto storefront, featuring feature-first Sass layouts, Redux pagination caching, and interactive details galleries._

[![Node version](https://img.shields.io/badge/Node.js->=18-3c873a?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![React version](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite version](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Redux version](https://img.shields.io/badge/Redux-Toolkit_2-764ABC?style=flat-square&logo=redux&logoColor=white)](https://redux.js.org)
[![Sass version](https://img.shields.io/badge/Sass-Dart_Sass-CC6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com)

[Features](#features) • [Tech Stack](#tech-stack) • [Folder Structure](#folder-structure) • [Styling Guidelines](#styling-guidelines) • [Running & Testing](#running--testing)

</div>

---

## Features

- **High-Contrast Editorial Layouts**: High-contrast black/white panels and elegant display typography grids.
- **Client-Side Page Caching**: Caches catalog query results dynamically in Redux Toolkit (`productsByPage`). Swapping back and forth between catalog pages loads instantly (0ms) without triggering API requests. Invalidates cache cleanly upon filter changes.
- **Dynamic Variant Swapping**: Prevent variant auto-selection on detail pages. Keeps options unselected until the user completes the choice, displaying base details and swap-loading specific images/pricing once resolved.
- **Dynamic Catalog Filters**: Interfaces with server-side queries supporting search query inputs, category tabs, price range filters, color/size parameters, and sorting options.
- **Comprehensive Dashboard Layout**: Standardizes user and seller views with a dual-sidebar layout. Embeds clean forms supporting live inventory editing and new product registration.
- **Input Height Jumps Fix**: Restricts focus changes to border colors (light gray to solid black) while retaining a constant `2px` border width, preventing layout shifts.
- **Mobile Navigation Drawer**: Sidebar panel utilizing Remix Icons for hamburger/close triggers, coupled with mobile-first container paddings scaling down to 360px.
- **Responsive Galleries**: Single-product gallery component featuring thumbnail swappers and full-screen image sliders.

---

## Tech Stack

- **Core Library**: React 19 (Context API + Hooks)
- **Build Tool**: Vite 7
- **Routing**: React Router 7
- **State Store**: Redux Toolkit + `react-redux`
- **Styling**: Sass / SCSS (Dart Sass `@use` imports and partials)
- **HTTP Client**: Axios
- **Asset Icons**: Remix Icons + Lucide React
- **Testing**: Vitest + React Testing Library + JSDOM

---

## Folder Structure

The client codebase is structured around a feature-first architecture:

```text
client/
├── public/                     # Static media assets & fonts
├── src/
│   ├── app/                    # Routing (app.routes.jsx) and Redux store (store.js)
│   ├── features/               # Feature-scoped components and assets
│   │   ├── auth/               # Login, registration, forgot-password forms and hooks
│   │   ├── cart/               # Cart drawers and price calculations
│   │   ├── landing/            # Landing page layout sections (Hero, BrandStory, Testimonials)
│   │   ├── products/           # Catalog filters, product details, image upload, variant selectors
│   │   ├── shared/             # Sticky Navbar, category drawers, global styles (global.scss, _mixins.scss)
│   │   └── user/               # Profile dashboard, accounts, and sidebar wrappers
│   └── main.jsx                # Client entry point
```

---

## Styling Guidelines

Sciolto enforces a strict visual standard to maintain its high-end brand feel:

- **Typography Stack**:
  - **Headlines**: `'Poppins', 'Archivo Black', sans-serif` (heavy uppercase display weights).
  - **Body copy**: `'Satoshi', sans-serif`.
  - **Prices & numbers**: `'JetBrains Mono', monospace` or bold Satoshi.


---

## Running & Testing

### Development Server
Starts the local dev server using Vite:
```bash
npm run dev
```

### Build Production Bundle
Compiles and generates optimized assets under `dist/`:
```bash
npm run build
```

### Run Tests
Runs the testing suite once:
```bash
npm run test
```

### Interactive Test Watcher
Starts Vitest in watcher mode:
```bash
npm run test:watch
```
