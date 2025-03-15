import { useLocale } from 'next-intl'
import { useMemo } from 'react'
import { type Locale, LocaleIs } from '@/config/locale-config'

export const useClientLocale = () => {
  const locale = useLocale()
  const isChinese = useMemo(() => LocaleIs.isZH(locale), [locale])
  const isEnglish = useMemo(() => LocaleIs.isEN(locale), [locale])

  return {
    locale: locale as Locale,
    isChinese,
    isEnglish,
  }
}
