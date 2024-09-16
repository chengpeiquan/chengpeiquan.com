import type React from 'react'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { RootLayout } from 'blackwork'

const inter = Inter({ subsets: ['latin'] })

interface BaseLayoutProps {
  children: React.ReactNode
}

export default async function BaseLayout({ children }: BaseLayoutProps) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <RootLayout lang={locale} className={inter.className}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </RootLayout>
  )
}
