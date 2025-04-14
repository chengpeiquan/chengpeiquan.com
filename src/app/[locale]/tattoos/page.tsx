import { LayoutMain } from 'blackwork'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { getThumbHashMapping } from '@/cache/thumb-hash'
import { LocaleIs } from '@/config/locale-config'
import { isMobileDevice } from '@/config/middleware-config'
import { type ListPageProps } from '@/config/route-config'
import { Artist } from './components/artist'
import { Hero } from './components/hero'
import { Timeline } from './components/timeline'

export const generateMetadata = async ({
  params: promiseParams,
}: ListPageProps) => {
  const params = await promiseParams

  const t = await getTranslations({
    locale: params.locale,
    namespace: 'tattooConfig',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function TattoosPage({
  params: promiseParams,
}: ListPageProps) {
  const { locale } = await promiseParams
  const isMobile = await isMobileDevice()
  const thumbHashMapping = await getThumbHashMapping('tattoo')

  const sharedProps = {
    locale,
    isMobile,
    thumbHashMapping,
  }

  return (
    <div className="relative w-full">
      <Hero {...sharedProps} />

      <LayoutMain className="gap-12 !pt-0">
        <Timeline {...sharedProps} />
        {LocaleIs.isZH(locale) && <Artist />}
      </LayoutMain>
    </div>
  )
}
