import { useState } from 'react'
import { useTranslations } from './i18n/useTranslations'
import { LanguageSwitcher } from './components/LanguageSwitcher'

export function App() {
  const [locale, setLocale] = useState('en')
  const { t, isLoading, error } = useTranslations(locale)

  if (error) {
    return (
      <div className="container">
        <p className="error">Failed to load translations: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="container">
      <header>
        <div className="locale-controls">
          {isLoading && <span className="spinner" />}
          <LanguageSwitcher locale={locale} onChange={setLocale} />
        </div>
      </header>

      <h1>{t('home.title')}</h1>
      <p>{t('home.description')}</p>

      <h2>{t('home.how_it_works')}</h2>
      <ol>
        <li>{t('home.step_1')}</li>
        <li>{t('home.step_2')}</li>
        <li>{t('home.step_3')}</li>
      </ol>

      <h2>{t('home.missing_key_title')}</h2>
      <p>{t('home.missing_key_description')}</p>
      <code>{t('this.key.does.not.exist')}</code>
    </div>
  )
}
