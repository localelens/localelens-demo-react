interface LanguageSwitcherProps {
  locale: string
  onChange: (locale: string) => void
}

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
]

export function LanguageSwitcher({ locale, onChange }: LanguageSwitcherProps) {
  return (
    <select value={locale} onChange={(e) => onChange(e.target.value)}>
      {LOCALES.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  )
}
