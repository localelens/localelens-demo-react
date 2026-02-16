# LocaleLens React Demo

Minimal React i18n demo using [LocaleLens](https://localelens.ai) with a secure server proxy. LocaleLens is translation infrastructure for developers — update translations in production without redeploying.

> **Looking for a full-featured example?** See the [TanStack Start demo](https://github.com/localelens/localelens-demo-tanstack-start) for SSR, authentication, and protected routes.

## What this demo shows

- Fetching translations from the LocaleLens API at runtime
- No file-based i18n and no i18n framework
- Flat key-value translation format
- Language switching with instant UI updates
- Secure API key handling via server proxy
- Simple `useTranslations` hook
- Client-side state for locale selection

## How it works

This demo uses a simple request-time translation fetch flow:

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Browser   │ ──── │   Server    │ ──── │  LocaleLens │
│   (React)   │      │   (Hono)    │      │     API     │
└─────────────┘      └─────────────┘      └─────────────┘
       │                    │                    │
       │ GET /api/          │                    │
       │ translations/en    │                    │
       │ ──────────────────>│                    │
       │                    │ + Authorization    │
       │                    │ ──────────────────>│
       │                    │                    │
       │                    │<───────────────────│
       │<───────────────────│                    │
       │   { "key": "val" } │                    │
```

1. React app requests translations for a locale
2. Server injects `Authorization` header with API key
3. LocaleLens returns flat key-value JSON
4. React renders translations via `t('key')` helper

## Why there is a server

The browser must never see the API key. The server proxy:

- Injects `Authorization: Bearer ${API_KEY}` on every request
- Adds caching headers for performance
- Mirrors production deployment patterns
- Works with any host (Vercel, Fly, Node, Bun)

The server in this demo is a small [Hono](https://hono.dev) app, but any backend (Express, Fastify, Cloudflare Workers, etc.) would work the same.

## Running locally

You need a [LocaleLens](https://localelens.ai) account and project to run this demo.

1. Copy `.env.example` to `.env.local` and add your LocaleLens credentials:

```bash
cp .env.example .env.local
```

2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

This runs both the Hono server (port 3000) and Vite dev server (port 5173). Vite proxies `/api` requests to the Hono server.

## Key takeaways

- **No build-time i18n** — translations load at runtime
- **No JSON files** — LocaleLens is the source of truth
- **No framework lock-in** — just `fetch()`
- **Secure by default** — API keys never reach the browser

## Optional: Import Demo Translations

This repository includes [`docs/localelens-demo-translations.json`](docs/localelens-demo-translations.json) which can be imported into a new LocaleLens project to instantly populate all demo translations.

📄 [View translations](docs/localelens-demo-translations.json) · 📥 [Download](https://raw.githubusercontent.com/localelens/localelens-demo-react/main/docs/localelens-demo-translations.json) (right-click → Save As)

This file exists **only to make the demo easy to reproduce**. The app itself fetches translations from LocaleLens at runtime — it does **not** read from this JSON file.

---

🔗 Learn more at https://localelens.ai  
📚 Documentation: https://localelens.ai/docs
