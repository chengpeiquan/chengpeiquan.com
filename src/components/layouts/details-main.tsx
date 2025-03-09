import { HolyGrailContent, LayoutMain } from 'blackwork'
import React from 'react'
import { type ContentItem } from '@/config/content-config'
import { type Locale } from '@/config/locale-config'
import { isMobileDevice } from '@/config/middleware-config'
import { MarkupRenderer } from '../markup/renderer'
import { DesktopToc, MobileToc } from '../markup/table-of-contents'

interface DetailsMainProps
  extends Pick<ContentItem, 'metadata' | 'headings' | 'jsxElement'> {
  locale: Locale
  aside?: React.ReactNode
}

export const DetailsMain = async ({
  locale,
  metadata,
  headings,
  jsxElement,
  aside,
}: DetailsMainProps) => {
  const isMobile = await isMobileDevice()

  return (
    <LayoutMain className="justify-between gap-16 sm:flex-row">
      {!isMobile && <DesktopToc headings={headings} />}

      <HolyGrailContent>
        <MarkupRenderer
          locale={locale}
          metadata={metadata}
          toc={
            isMobile ? (
              <MobileToc headings={headings} isMobile={isMobile} />
            ) : null
          }
          jsxElement={jsxElement}
        />
      </HolyGrailContent>

      {aside}
    </LayoutMain>
  )
}
