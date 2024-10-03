import React from 'react'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { RootLayout as BaseRootLayout } from 'blackwork'
import { type Locale } from '@/config/locale-config'
import { WebAnalytics } from '@/components/layouts/web-analytics'
import 'blackwork/ui-globals.css'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  const locale = (await getLocale()) as Locale
  const messages = await getMessages()

  /**
   * There are two resolved issues here that need proper explanation:
   *
   * 1. Why is NextIntlClientProvider used in `RootLayout` and
   *    `LocaleLayout` respectively?
   *
   *    Although only the `[local]` directory has i18n routes,
   *    and other pages do not (e.g. the error page,
   *    the not found page or other unknown slugs visited),
   *    in order to obtain locale data on each page,
   *    according to the requirements of `next-intl`,
   *    respective Providers must be provided separately to accurately
   *    take effect the required routing capabilities.
   *
   *    https://next-intl-docs.vercel.app/docs/getting-started/app-router
   *
   * 2. About `Failed to execute 'removeChild' on 'Node'`
   *
   *    https://github.com/vercel/next.js/issues/58055
   */
  return (
    <BaseRootLayout lang={locale} className={inter.className}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}

        <WebAnalytics />
      </NextIntlClientProvider>
    </BaseRootLayout>
  )
}
