# MateStore · React E-commerce Frontend

Single-page store built with **React 18**, **Vite**, and **React Router**. Product catalog and checkout persist orders through **Firestore** when Firebase env vars are set; otherwise the app serves a deterministic local catalog so reviewers can clone and run immediately.

## Highlights

- Client-side routing, cart state via Context API  
- Responsive layout (SCSS)  
- Optional Firestore: `products` collection + `orders` writes on checkout  
- Graceful degradation to local mock data when Firebase is not configured  

## Prerequisites

- Node.js **18+** (LTS recommended)  
- A Firebase web app (optional — only if you want live data instead of mocks)  

## Local setup

```bash
cp .env.example .env
# Fill VITE_FIREBASE_* in .env, or leave empty and set VITE_USE_MOCK=true
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_FIREBASE_*` | Standard Firebase web SDK config (`apiKey`, `projectId`, etc.) |
| `VITE_USE_MOCK` | `true` to force mock catalog regardless of Firebase |

See `.env.example` for exact names.

## Firestore shape (when using Firebase)

- **Collection `products`**: documents with fields compatible with the UI (`title`, `description`, `price`, `pictureUrl`, `category`, `stock`, etc. — aligned with `src/mock_products.js`).  
- **Collection `orders`**: created on checkout via `createOrder()`.

Seed scripts: see `upload-products.js` at repo root if you need bulk load.

## Deploy

Static hosting compatible with SPA rewrites works well (Firebase Hosting already has `firebase.json`, or Vercel/Netlify with “history fallback” to `index.html`). Configure the same `VITE_*` vars in your host’s dashboard before build.

## Security note for maintainers

If this repository ever shipped a `.env` with real keys, **rotate Firebase web API keys / restrict domains** in the Firebase console — web keys are not secret, but domain restrictions reduce abuse.

`npm audit` may still flag transitive deps (Firebase / Vite dev server tooling). Keeping production hosting static and pinning upgrades intentionally is safer than blindly running `npm audit fix --force` (can jump major versions). Revisit when upgrading `firebase` and `vite` together.
