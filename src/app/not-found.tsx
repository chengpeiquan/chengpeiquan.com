import React from 'react'
import { getLocale } from 'next-intl/server'
import { LayoutContainer } from '@/components/layouts/layout-container'
import { NotFoundGuide } from '@/components/layouts/not-found-guide'
import { type Locale } from '@/config/locale-config'

export const dynamic = 'force-dynamic'

export default async function NotFound() {
  const locale = (await getLocale()) as Locale

  return (
    <LayoutContainer locale={locale}>
      <NotFoundGuide />
    </LayoutContainer>
  )
}
