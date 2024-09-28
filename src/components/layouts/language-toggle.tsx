'use client'

import React, { useCallback, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import {
  type LanguageToggleOption,
  LanguageToggle as LanguageToggler,
} from 'blackwork'
import { type Locale, localeLabelMapping } from '@/config/locale-config'
import { usePathname, useRouter } from '@/navigation'
import { useClientLocale } from '@/hooks'

export const LanguageToggle: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const t = useTranslations('action')
  const { locale, isEnglish } = useClientLocale()

  const onClick = useCallback(
    (value: string) => {
      const nextLocale = value as Locale
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      )
    },
    [params, pathname, router],
  )

  const options = useMemo(() => {
    const value: Locale = isEnglish ? 'zh' : 'en'
    const text = isEnglish ? '中' : 'EN'
    const icon = <span className="text-base">{text}</span>
    return { value, icon, onClick } satisfies LanguageToggleOption
  }, [isEnglish, onClick])

  const title = useMemo(() => {
    const action = t('toggle')

    const nextLocaleLabel = isEnglish
      ? localeLabelMapping.en.zh
      : localeLabelMapping.zh.en

    return action + nextLocaleLabel
  }, [isEnglish, t])

  return (
    <LanguageToggler defaultValue={locale} title={title} options={options} />
  )
}
