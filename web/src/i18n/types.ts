export type Translations = Record<string, string>

export type TranslateFunction = (key: string) => string

export type UseTranslationsResult = {
  t: TranslateFunction
  isLoading: boolean
  error: Error | null
}
