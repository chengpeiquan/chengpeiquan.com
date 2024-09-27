import React from 'react'
import { notFound } from 'next/navigation'
import { HolyGrailAside, HolyGrailContent, LayoutMain } from 'blackwork'
import { type LocalePageParams } from '@/config/locale-config'
import { isMobileDevice } from '@/config/middleware-config'
import { getContent } from '@/contents'
import { MarkupRenderer } from '@/components/markup/renderer'
import { PublishedBooks } from '@/components/sidebar/published-books'
import { CatHuffing } from '@/components/sidebar/cat-huffing'
import { FriendlyLinks } from '@/components/sidebar/friendly-links'
import { DesktopToc, MobileToc } from '@/components/markup/table-of-contents'

interface ArticlePageParams extends LocalePageParams {
  slug: string
}

interface ArticlePageProps {
  params: ArticlePageParams
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const isMobile = isMobileDevice()

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
      {!isMobile && <DesktopToc headings={res.headings} />}

      <HolyGrailContent>
        <MarkupRenderer
          locale={params.locale}
          metadata={res.metadata}
          toc={isMobile ? <MobileToc headings={res.headings} /> : null}
          jsxElement={res.jsxElement}
        />
      </HolyGrailContent>

      <HolyGrailAside>
        <PublishedBooks />
        <CatHuffing />
        <FriendlyLinks />
      </HolyGrailAside>
    </LayoutMain>
  )
}
