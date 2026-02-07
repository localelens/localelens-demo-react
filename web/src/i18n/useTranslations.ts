import { useState, useEffect, useCallback } from 'react'
import type { Translations, UseTranslationsResult } from './types'

type State = {
  loadedLocale: string | null
  data: Translations
  error: Error | null
}

export function useTranslations(locale: string): UseTranslationsResult {
  const [state, setState] = useState<State>({
    loadedLocale: null,
    data: {},
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    fetch(`/api/translations/${locale}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch translations: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setState({ loadedLocale: locale, data, error: null })
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setState((prev) => ({ ...prev, error: err }))
      })

    return () => controller.abort()
  }, [locale])

  const t = useCallback((key: string) => state.data[key] ?? key, [state.data])
  const isLoading = state.loadedLocale !== locale

  return { t, isLoading, error: state.error }
}
