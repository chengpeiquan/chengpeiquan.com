'use client'

import {
  type Theme,
  type ThemeToggleOption,
  ThemeToggle as ThemeToggler,
  useTheme,
} from 'blackwork'
import { useTranslations } from 'next-intl'
import React, { useMemo } from 'react'

export const ThemeToggle: React.FC = () => {
  const t = useTranslations('action')
  const { isDark } = useTheme()

  const options = useMemo(() => {
    const value: Theme = isDark ? 'light' : 'dark'
    const label = t(`theme.${value}`)
    return [{ value, label }] satisfies ThemeToggleOption[]
  }, [isDark, t])

  const title = useMemo(() => {
    const action = t('toggle')
    const nextThemeLabel = t(`theme.${isDark ? 'light' : 'dark'}`)

    return action + nextThemeLabel
  }, [isDark, t])

  return <ThemeToggler mode="button" title={title} options={options} />
}
