# LocaleLens React Demo

Minimal React i18n demo using [LocaleLens](https://localelens.ai) with a secure server proxy.

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

## Translation keys used in this demo

Copy this JSON and import it into your LocaleLens project:

```json
{
  "en": {
    "home.title": "Welcome",
    "home.description": "This demo shows how LocaleLens replaces file-based i18n with a simple API fetch.",
    "home.how_it_works": "How it works",
    "home.step_1": "Translations are fetched from LocaleLens at runtime",
    "home.step_2": "The server proxies requests and caches responses for 60 seconds",
    "home.step_3": "No JSON files, no framework, just fetch()",
    "home.missing_key_title": "Missing key fallback",
    "home.missing_key_description": "When a key doesn't exist, the key itself is returned:"
  },
  "de": {
    "home.title": "Willkommen",
    "home.description": "Diese Demo zeigt, wie LocaleLens dateibasiertes i18n durch einen einfachen API-Aufruf ersetzt.",
    "home.how_it_works": "So funktioniert es",
    "home.step_1": "Übersetzungen werden zur Laufzeit von LocaleLens abgerufen",
    "home.step_2": "Der Server leitet Anfragen weiter und cached die Antworten für 60 Sekunden",
    "home.step_3": "Keine JSON-Dateien, kein Framework – einfach fetch()",
    "home.missing_key_title": "Fehlender Schlüssel",
    "home.missing_key_description": "Wenn ein Key nicht existiert, wird der Key selbst zurückgegeben:"
  }
}
```

---

Learn more at https://localelens.ai
