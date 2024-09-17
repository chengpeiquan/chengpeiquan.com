import React from 'react'
import { notFound } from 'next/navigation'
import { LayoutMain, TwoColumnContent, TwoColumnSidebar } from 'blackwork'
import { type LocalePageParams } from '@/config/locale-config'
import { getContent } from '@/contents'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { PublishedBooks } from '@/components/sidebar/published-books'
import { CatHuffing } from '@/components/sidebar/cat-huffing'
import { FriendlyLinks } from '@/components/sidebar/friendly-links'

interface ArticlePageParams extends LocalePageParams {
  slug: string
}

interface ArticlePageProps {
  params: ArticlePageParams
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const res = await getContent({
    folder: 'article',
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
        <PublishedBooks />
        <CatHuffing />
        <FriendlyLinks />
      </TwoColumnSidebar>
    </LayoutMain>
  )
}
