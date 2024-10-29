import React from 'react'
import { notFound } from 'next/navigation'
import { HolyGrailAside, HolyGrailContent, LayoutMain } from 'blackwork'
import { isMobileDevice } from '@/config/middleware-config'
import { ContentFolder } from '@/config/content-config'
import { type DetailsPageProps } from '@/config/locale-config'
import { getDetails, getDetailsMetadata } from '@/core/dispatcher'
import { MarkupRenderer } from '@/components/markup/renderer'
import { DesktopToc, MobileToc } from '@/components/markup/table-of-contents'
import { PublishedBooks } from '@/components/sidebar/published-books'
import { CatHuffing } from '@/components/sidebar/cat-huffing'
import { FriendlyLinks } from '@/components/sidebar/friendly-links'

const folder = ContentFolder.Article

export const generateMetadata = async ({
  params: promiseParams,
}: DetailsPageProps) => {
  const params = await promiseParams
  return getDetailsMetadata(folder, params)
}

export default async function ArticlePage({
  params: promiseParams,
}: DetailsPageProps) {
  const isMobile = await isMobileDevice()

  const params = await promiseParams
  const res = await getDetails(folder, params)

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
