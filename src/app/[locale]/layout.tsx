import { type Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import React from 'react'
import { LayoutContainer } from '@/components/layouts/layout-container'
import { type PropsWithLocale } from '@/config/route-config'
import { sharedMetadata, siteConfig } from '@/config/site-config'

interface LocaleLayoutProps extends React.PropsWithChildren {
  params: Promise<PropsWithLocale>
}

export const generateMetadata = async ({
  params: promiseParams,
}: Pick<LocaleLayoutProps, 'params'>) => {
  const params = await promiseParams

  const t = await getTranslations({
    locale: params.locale,
    namespace: 'siteConfig',
  })

  return {
    title: {
      template: `%s - ${t('title')}`,
      default: t('title'),
    },
    description: t('description'),
    alternates: {
      canonical: siteConfig.author.url,
      types: {
        'application/rss+xml': [
          {
            url: 'feed.xml',
            title: 'RSS',
          },
        ],
      },
    },
    ...sharedMetadata,
  } satisfies Metadata
}

export default async function LocaleLayout({
  params: promiseParams,
  children,
}: Readonly<LocaleLayoutProps>) {
  const params = await promiseParams
  const { locale } = params
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LayoutContainer locale={locale}>{children}</LayoutContainer>
    </NextIntlClientProvider>
  )
}
