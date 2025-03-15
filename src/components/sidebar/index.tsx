import { HolyGrailAside } from 'blackwork'
import { getLocale } from 'next-intl/server'
import React from 'react'
import { type Locale, LocaleIs } from '@/config/locale-config'
import { CatHuffing } from './cat-huffing'
import { CookbookOnline, CookbookQrCode } from './cookbook-widgets'
import { FriendlyLinks } from './friendly-links'
import { PublishedBooks } from './published-books'

const Provider = async ({ children }: React.PropsWithChildren) => {
  const locale = (await getLocale()) as Locale
  const visible = LocaleIs.isZH(locale)

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
