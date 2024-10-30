import React, { cache } from 'react'
import { getTranslations } from 'next-intl/server'
import { Paragraph } from 'blackwork'
import { type Locale } from '@/config/locale-config'
import { type LocalePageParams } from '@/config/route-config'
import {
  type ContentMetadata,
  legacyThresholdDays,
} from '@/config/content-config'
import { cn } from '@/utils'

const calculateDays = cache((timestamp: number, locale: Locale) => {
  const isChinese = locale === 'zh'

  const targetDate = new Date(timestamp)
  const currentDate = new Date()

  const diffMs = Math.abs(timestamp - Date.now())
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  let years = currentDate.getFullYear() - targetDate.getFullYear()
  let months = currentDate.getMonth() - targetDate.getMonth()
  let days = currentDate.getDate() - targetDate.getDate()

  if (days < 0) {
    months -= 1
    days += new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
    ).getDate()
  }

  if (months < 0) {
    years -= 1
    months += 12
  }

  let timeLabel = ''

  if (years > 0) {
    const unit = isChinese ? '年' : `year${years > 1 ? 's' : ''}`
    timeLabel += `${years} ${unit}`
  }

  if (months > 0 || years > 0) {
    if (months === 0) {
      const separator = isChinese ? '' : ' '
      const unit = isChinese ? '前' : 'ago'
      timeLabel += `${separator}${unit}`
    } else {
      const separator = timeLabel ? ' ' : ''
      const unit = isChinese ? '个月前' : `month${months > 1 ? 's' : ''} ago`
      timeLabel += `${separator}${months} ${unit}`
    }
  }

  if (years === 0 && months === 0) {
    const unit = isChinese ? '天前' : `day${days > 1 ? 's' : ''} ago`
    timeLabel = `${days} ${unit}`
  }

  return {
    diffDays,
    timeLabel,
  }
})

type LegacyTipsProps = LocalePageParams & Pick<ContentMetadata, 'timestamp'>

export const LegacyTips = async ({ locale, timestamp }: LegacyTipsProps) => {
  const t = await getTranslations({
    locale,
    namespace: 'basicConfig',
  })

  const { diffDays, timeLabel } = calculateDays(timestamp, locale)
  const visible = diffDays > legacyThresholdDays

  const cls = cn(
    'text-center w-full box-border p-3',
    'bg-gray-50 dark:bg-white dark:bg-opacity-5 rounded-lg text-gray-600 dark:text-gray-300 text-sm',
  )

  if (!visible) return null
  return <Paragraph className={cls}>{t('legacy', { timeLabel })}</Paragraph>
}
