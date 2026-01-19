import { useState } from 'react'
import { useTranslations } from './i18n/useTranslations'
import { LanguageSwitcher } from './components/LanguageSwitcher'

export function App() {
  const [locale, setLocale] = useState('en')
  const t = useTranslations(locale)

  return (
    <div className="container">
      <header>
        <LanguageSwitcher locale={locale} onChange={setLocale} />
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
