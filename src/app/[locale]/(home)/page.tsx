import { LayoutMain } from 'blackwork'
import React from 'react'
import { LocaleIs } from '@/config/locale-config'
import { isMobileDevice } from '@/config/middleware-config'
import { type ListPageProps } from '@/config/route-config'
import { Hero } from './components/hero'
import { LatestArticles } from './components/latest-articles'
import { LatestCookbooks } from './components/latest-cookbooks'
import { MobileLanding } from './components/mobile-landing'

export default async function LocalePage({
  params: promiseParams,
}: ListPageProps) {
  const params = await promiseParams
  const { locale } = params

  const isMobile = await isMobileDevice()

  if (isMobile) {
    return <MobileLanding locale={locale} />
  }

  return (
    <LayoutMain fullscreen>
      <Hero />
      <LatestArticles locale={locale} isMobile={isMobile} />

      {LocaleIs.isZH(locale) && (
        <LatestCookbooks locale={locale} isMobile={isMobile} />
      )}
    </LayoutMain>
  )
}
