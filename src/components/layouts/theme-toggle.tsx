'use client'

import {
  type Theme,
  type ThemeToggleOption,
  ThemeToggle as ThemeToggler,
  useTheme,
} from 'blackwork'
import { useTranslations } from 'next-intl'
import React, { useMemo } from 'react'
import { themeLabelMapping } from '@/config/locale-config'
import { useClientLocale } from '@/hooks'

export const ThemeToggle: React.FC = () => {
  const t = useTranslations('action')
  const { isEnglish } = useClientLocale()
  const { isDark } = useTheme()

  const options = useMemo(() => {
    const value: Theme = isDark ? 'light' : 'dark'
    const label = isDark ? '暗黑模式' : '亮模式'
    return [{ value, label }] satisfies ThemeToggleOption[]
  }, [isDark])

  const title = useMemo(() => {
    const action = t('toggle')

    const nextLocaleLabel = isEnglish
      ? themeLabelMapping.en
      : themeLabelMapping.zh

    const nextThemeLabel = isDark ? nextLocaleLabel.light : nextLocaleLabel.dark

    return action + nextThemeLabel
  }, [isDark, isEnglish, t])

  return <ThemeToggler mode="button" title={title} options={options} />
}
