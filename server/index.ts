import { resolve } from 'node:path'
import { config } from 'dotenv'
config({ path: resolve(import.meta.dirname, '..', '.env.local') })

import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { fetchTranslations } from './localelens'

const app = new Hono()

// API endpoint for translations
app.get('/api/translations/:locale', async (c) => {
  const locale = c.req.param('locale')

  try {
    const translations = await fetchTranslations(locale)

    return c.json(translations, 200, {
      'Cache-Control': 'public, max-age=60',
    })
  } catch (error) {
    console.error('Failed to fetch translations:', error)
    return c.json({ error: 'Failed to fetch translations' }, 500)
  }
})

// Serve static files from web build
app.use('/*', serveStatic({ root: './web/dist' }))

// SPA fallback
app.get('*', serveStatic({ path: './web/dist/index.html' }))

const port = parseInt(process.env.PORT || '3000', 10)

console.log(`Server running at http://localhost:${port}`)

serve({ fetch: app.fetch, port })
