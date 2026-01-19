import type { Translations } from './types'

export async function fetchTranslations(locale: string): Promise<Translations> {
  const apiBase = process.env.LOCALELENS_API_BASE || 'https://localelens.ai/api/v1'
  const projectId = process.env.LOCALELENS_PROJECT_ID
  const apiKey = process.env.LOCALELENS_API_KEY

  if (!projectId || !apiKey) {
    throw new Error('Missing LOCALELENS_PROJECT_ID or LOCALELENS_API_KEY')
  }

  const url = `${apiBase}/projects/${projectId}/translations/${locale}`

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })

  if (!res.ok) {
    throw new Error(`LocaleLens API error: ${res.status}`)
  }

  return res.json()
}
