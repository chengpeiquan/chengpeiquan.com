import React from 'react'
import { notFound } from 'next/navigation'
import { LayoutMain } from 'blackwork'
import { type LocalePageParams } from '@/config/locale-config'
import { getContent } from '@/contents'
import { MarkupRenderer } from '@/components/markup/renderer'

interface AboutPageProps {
  params: LocalePageParams
}

export default async function AboutPage({ params }: AboutPageProps) {
  const res = await getContent({
    folder: 'about',
    slug: 'about',
    locale: params.locale,
  })

  if (!res) {
    notFound()
  }

  return (
    <LayoutMain>
      <MarkupRenderer
        locale={params.locale}
        metadata={res.metadata}
        jsxElement={res.jsxElement}
      />
    </LayoutMain>
  )
}
