import { LayoutMain } from 'blackwork'
import React from 'react'
import { LocaleIs } from '@/config/locale-config'
import { isMobileDevice } from '@/config/middleware-config'
import { type ListPageProps } from '@/config/route-config'
import { AboutMe } from './components/about-me'
import { Articles } from './components/articles'
import { Books } from './components/books'
import { Cookbooks } from './components/cookbooks'
import { Hero } from './components/hero'
import { Projects } from './components/projects'

export default async function LocalePage({
  params: promiseParams,
}: ListPageProps) {
  const params = await promiseParams
  const { locale } = params

  const isMobile = await isMobileDevice()

  const sharedProps = { locale, isMobile }
  const isZH = LocaleIs.isZH(locale)

  return (
    <LayoutMain fullscreen className="overflow-x-hidden">
      <Hero {...sharedProps} />
      <AboutMe {...sharedProps} />
      {isZH && <Books {...sharedProps} />}
      <Articles {...sharedProps} />
      <Projects {...sharedProps} />
      {isZH && <Cookbooks {...sharedProps} />}
    </LayoutMain>
  )
}
