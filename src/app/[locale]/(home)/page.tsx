import { LayoutMain } from 'blackwork'
import React from 'react'
import { isMobileDevice } from '@/config/middleware-config'
import { type ListPageProps } from '@/config/route-config'
import { Hero } from './components/hero'
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
    </LayoutMain>
  )
}
