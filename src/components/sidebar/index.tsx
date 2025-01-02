import React from 'react'
import { getLocale } from 'next-intl/server'
import { HolyGrailAside } from 'blackwork'
import { type Locale } from '@/config/locale-config'
import { PublishedBooks } from './published-books'
import { CatHuffing } from './cat-huffing'
import { FriendlyLinks } from './friendly-links'
import { CookbookOnline, CookbookQrCode } from './cookbook-widgets'

const Provider = async ({ children }: React.PropsWithChildren) => {
  const locale = (await getLocale()) as Locale
  const visible = locale === 'zh'

  if (!visible) return null
  return children
}

export const ArticleSidebar = async () => {
  return (
    <Provider>
      <HolyGrailAside>
        <PublishedBooks />
        <CatHuffing />
        <FriendlyLinks />
      </HolyGrailAside>
    </Provider>
  )
}

export const CookbookSidebar = async () => {
  return (
    <Provider>
      <HolyGrailAside>
        <CookbookQrCode />
        <CookbookOnline />
        <FriendlyLinks />
      </HolyGrailAside>
    </Provider>
  )
}

export const MobileSidebar = async () => {
  return (
    <Provider>
      <PublishedBooks />
      <CatHuffing />
      <FriendlyLinks />
    </Provider>
  )
}
