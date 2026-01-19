import { useState, useEffect, useCallback } from 'react'
import type { Translations, TranslateFunction } from './types'

export function useTranslations(locale: string): TranslateFunction {
  const [data, setData] = useState<Translations>({})

  useEffect(() => {
    fetch(`/api/translations/${locale}`)
      .then((res) => res.json())
      .then(setData)
  }, [locale])

  return useCallback((key: string) => data[key] ?? key, [data])
}
