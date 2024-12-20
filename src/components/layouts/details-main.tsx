import React from 'react'
import { HolyGrailAside, HolyGrailContent, LayoutMain } from 'blackwork'
import { isMobileDevice } from '@/config/middleware-config'
import { type Locale } from '@/config/locale-config'
import { type ContentItem } from '@/config/content-config'
import { DesktopToc, MobileToc } from '../markup/table-of-contents'
import { MarkupRenderer } from '../markup/renderer'

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
    <LayoutMain className="sm:flex-row justify-between gap-16">
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

      {aside && <HolyGrailAside>{aside}</HolyGrailAside>}
    </LayoutMain>
  )
}
