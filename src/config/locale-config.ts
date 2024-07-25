// import { createLocalizedPathnamesNavigation } from 'next-intl/navigation'
import { type Theme } from 'blackwork'
import { type LocalePrefix, type Pathnames } from 'next-intl/routing'

export const locales = ['zh', 'en'] as const

export type Locales = typeof locales

export type Locale = Locales[number]

export const defaultLocale: Locale = 'zh'

export const localePrefix: LocalePrefix<Locales> = 'as-needed'

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  // '/about': '/about',
  // '/about': {
  //   zh: '/pathnames',
  //   en: '/pathnamessss',
  // },
}

export interface LocalePageParams {
  locale: Locale
}

export const localeLabelMapping: Readonly<
  Record<Locale, Record<Locale, string>>
> = {
  zh: {
    zh: '中文',
    en: '英文',
  },
  en: {
    zh: 'Chinese',
    en: 'English',
  },
}

export const themeLabelMapping: Readonly<
  Record<Locale, Record<Theme, string>>
> = {
  zh: {
    dark: '暗黑模式',
    light: '明亮模式',
  },
  en: {
    dark: 'Dark Mode',
    light: 'Light Mode',
  },
}
