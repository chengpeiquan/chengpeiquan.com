import { ThemeProvider } from 'blackwork'
import { ThemeScript } from 'blackwork/rsc'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import React from 'react'
import { NavigationProgressProvider } from '@/components/layouts/navigation-progress'
import { WebAnalytics } from '@/components/layouts/web-analytics'
import { type Locale } from '@/config/locale-config'
import '@/styles/globals.css'

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  const locale = (await getLocale()) as Locale
  const messages = await getMessages()

  /**
   * There are two resolved issues here that need proper explanation:
   *
   * 1. Why is NextIntlClientProvider used in `RootLayout` and `LocaleLayout`
   *    respectively?
   *
   *    Although only the `[local]` directory has i18n routes, and other pages do
   *    not (e.g. the error page, the not found page or other unknown slugs
   *    visited), in order to obtain locale data on each page, according to the
   *    requirements of `next-intl`, respective Providers must be provided
   *    separately to accurately take effect the required routing capabilities.
   *
   *    https://next-intl-docs.vercel.app/docs/getting-started/app-router
   * 2. About `Failed to execute 'removeChild' on 'Node'`
   *
   *    https://github.com/vercel/next.js/issues/58055
   */
  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <ThemeScript />
      </head>

      <body className="flex min-h-screen w-screen flex-col">
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <NavigationProgressProvider>{children}</NavigationProgressProvider>

            <WebAnalytics />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
