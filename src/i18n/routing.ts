import { defineRouting } from 'next-intl/routing'
import { defaultLocale, localePrefix, locales } from '@/config/locale-config'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
})
