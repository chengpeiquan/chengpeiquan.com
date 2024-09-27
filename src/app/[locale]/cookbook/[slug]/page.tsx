import React from 'react'
import { notFound } from 'next/navigation'
import { HolyGrailAside, HolyGrailContent, LayoutMain } from 'blackwork'
import { type LocalePageParams } from '@/config/locale-config'
import { getContent } from '@/contents'
import { MarkupRenderer } from '@/components/markup/renderer'
import { FriendlyLinks } from '@/components/sidebar/friendly-links'
import {
  CookbookOnline,
  CookbookQrCode,
} from '@/components/sidebar/cookbook-widgets'

interface ArticlePageParams extends LocalePageParams {
  slug: string
}

interface ArticlePageProps {
  params: ArticlePageParams
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const res = await getContent({
    folder: 'cookbook',
    slug: params.slug,
    locale: params.locale,
  })

  if (!res) {
    notFound()
  }

  return (
    <LayoutMain className="sm:flex-row justify-between gap-16">
      <HolyGrailContent>
        <MarkupRenderer
          locale={params.locale}
          metadata={res.metadata}
          jsxElement={res.jsxElement}
        />
      </HolyGrailContent>

      <HolyGrailAside>
        <CookbookQrCode />
        <CookbookOnline />
        <FriendlyLinks />
      </HolyGrailAside>
    </LayoutMain>
  )
}
