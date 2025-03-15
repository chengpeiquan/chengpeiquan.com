import { type Theme } from 'blackwork'
import { type LocalePrefix, type Pathnames } from 'next-intl/routing'

export const locales = ['zh', 'en'] as const

export type Locales = typeof locales

export type Locale = Locales[number]

// Naming convention inspired by `react-is` 😎
export class LocaleIs {
  static isZH(locale: unknown) {
    return locale === 'zh'
  }

  static isEN(locale: unknown) {
    return locale === 'en'
  }
}

export const defaultLocale: Locale = 'zh'

export const localePrefix: LocalePrefix<Locales, 'as-needed'> = 'as-needed'

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  // '/about': '/about',
  // '/about': {
  //   zh: '/pathnames',
  //   en: '/pathnamessss',
  // },
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
