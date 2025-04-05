import { LayoutMain } from 'blackwork'
import React from 'react'
import { LocaleIs } from '@/config/locale-config'
import { isMobileDevice } from '@/config/middleware-config'
import { type ListPageProps } from '@/config/route-config'
import { Articles } from './components/articles'
import { Books } from './components/books'
import { Cookbooks } from './components/cookbooks'
import { Hero } from './components/hero'
import { MobileLanding } from './components/mobile-landing'
import { Projects } from './components/projects'

export default async function LocalePage({
  params: promiseParams,
}: ListPageProps) {
  const params = await promiseParams
  const { locale } = params

  const isMobile = await isMobileDevice()

  if (isMobile) {
    return <MobileLanding locale={locale} />
  }

  const sharedProps = { locale, isMobile }
  const isZH = LocaleIs.isZH(locale)

  return (
    <LayoutMain fullscreen>
      <Hero />
      {isZH && <Books {...sharedProps} />}
      <Articles {...sharedProps} />
      <Projects {...sharedProps} />
      {isZH && <Cookbooks {...sharedProps} />}
    </LayoutMain>
  )
}
