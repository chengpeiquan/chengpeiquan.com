import React from 'react'
import { LayoutMain } from 'blackwork'
import { type LocalePageParams } from '@/config/locale-config'
import { getContent } from '@/contents'
import { MarkdownRenderer } from '@/components/markdown-renderer'

interface AboutPageProps {
  params: LocalePageParams
}

export default async function AboutPage({ params }: AboutPageProps) {
  const res = await getContent({
    folder: 'about',
    slug: 'about',
    locale: params.locale,
  })

  if (!res) return null
  return (
    <LayoutMain>
      <MarkdownRenderer {...res} />
    </LayoutMain>
  )
}
