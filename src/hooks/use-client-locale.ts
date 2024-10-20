import { useMemo } from 'react'
import { useLocale } from 'next-intl'
import { type Locale } from '@/config/locale-config'

export const useClientLocale = () => {
  const locale = useLocale()
  const isChinese = useMemo(() => locale === 'zh', [locale])
  const isEnglish = useMemo(() => locale === 'en', [locale])

  return {
    locale: locale as Locale,
    isChinese,
    isEnglish,
  }
}
