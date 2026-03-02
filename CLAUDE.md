# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run start      # Dev server (Vite with HMR, exposed on all interfaces)
npm run build      # Production build
npm run lint       # ESLint
npm run preview    # Preview production build
```

Nightwatch E2E tests:
```bash
npx nightwatch nightwatch/examples/testLogin.js                    # Run a single test file
npx nightwatch nightwatch/examples/testLogin.js --env firefox      # Run with specific browser
```

## Architecture

**React 18 + Vite SPA** for a pizza ordering platform. No TypeScript — all files are `.jsx`/`.js`.

### Directory Structure

- `src/` — Entry point (`main.jsx`) and root component (`App.jsx`)
- `Pages/` — Full-page route components (public + admin)
- `Components/` — Reusable UI components
- `Services/` — API service layer (Axios calls)
- `Context/` — React Context providers (`AuthContext`, `CartContext`)
- `Config/url.js` — API base URL configuration

### State Management

Two React Contexts wrap the entire app:

1. **`AuthContext`** — `isAuthentified`, `user` (decoded from JWT). Token stored in `localStorage`.
2. **`CartContext`** — `cart` array, `addToCart`, `removeItem`, `createCart`. Cart ID persisted in `localStorage.orderId`.

### Routing & Auth

`App.jsx` defines all routes. `RouteSecu` is a protected route wrapper that calls `AuthService.isValid()` (JWT expiration check) and redirects to login if needed. Admin routes additionally check `user.role`.

### Service Layer

All API calls go through `/Services/`. Each service uses Axios with a Bearer token header injected by `AuthService.setAxiosToken()` at login.

**API base URL:** `http://localhost:3000/pizzalacarte` (hardcoded in most services — `Config/url.js` has a different IP and is not consistently used).

### Styling

Bootstrap 5 + React Bootstrap for layout, with heavy custom CSS in `src/App.css` (1200+ lines). CSS custom properties defined at `:root`:
- `--red-color: #c72d2d` (brand primary)
- `--green-color: #488517`
- `--radius: 12px`
- `--transition: 0.18s ease`
