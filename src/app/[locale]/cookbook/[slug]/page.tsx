import React from 'react'
import { notFound } from 'next/navigation'
import { LayoutMain, TwoColumnContent, TwoColumnSidebar } from 'blackwork'
import { type LocalePageParams } from '@/config/locale-config'
import { getContent } from '@/contents'
import { MarkdownRenderer } from '@/components/markdown-renderer'
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
      <TwoColumnContent>
        <MarkdownRenderer {...res} />
      </TwoColumnContent>

      <TwoColumnSidebar>
        <CookbookQrCode />
        <CookbookOnline />
        <FriendlyLinks />
      </TwoColumnSidebar>
    </LayoutMain>
  )
}
