'use client'

import React, { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import {
  type Theme,
  type ThemeToggleOption,
  ThemeToggle as ThemeToggler,
  useTheme,
} from 'blackwork'
import { themeLabelMapping } from '@/config/locale-config'
import { useLocales } from '@/hooks/data-hooks'

export const ThemeToggle: React.FC = () => {
  const t = useTranslations('action')
  const { isEnglish } = useLocales()
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