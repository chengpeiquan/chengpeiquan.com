import { isObject } from '@bassist/utils'
import { DefaultContentLayout } from '@blackwork/docs/theme'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { MusicPlayer } from '@/components/music-player'
import { type ContentItem } from '@/config/content-config'
import { type Locale } from '@/config/locale-config'
import { isMobileDevice } from '@/config/middleware-config'
import { DetailsHeaderMeta } from '../markup/renderer'
import { DesktopToc, MobileToc } from '../markup/table-of-contents'
import { toDocsTocHeadings } from '../markup/toc-utils'

interface DetailsMainProps extends Pick<
  ContentItem,
  'metadata' | 'headings' | 'jsxElement'
> {
  locale: Locale
  aside?: React.ReactNode
}

export const DetailsMain = async ({
  locale,
  metadata,
  headings,
  jsxElement,
}: DetailsMainProps) => {
  const isMobile = await isMobileDevice()
  const t = await getTranslations({
    locale,
    namespace: 'basicConfig',
  })
  const tocTitle = t('outline.title')
  const contentTocVisible = toDocsTocHeadings(headings).length >= 2

  return (
    <>
      {!isMobile && <DesktopToc headings={headings} title={tocTitle} />}
      {isMobile && <MobileToc headings={headings} title={tocTitle} />}

      <DefaultContentLayout
        contentTocVisible={contentTocVisible}
        headerMeta={<DetailsHeaderMeta locale={locale} metadata={metadata} />}
        title={metadata.title}
      >
        {jsxElement}
      </DefaultContentLayout>

      {isObject(metadata.bgm) && (
        <MusicPlayer isMobile={isMobile} {...metadata.bgm} />
      )}
    </>
  )
}
