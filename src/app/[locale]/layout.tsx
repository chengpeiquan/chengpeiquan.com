import React from 'react'
import { type Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { sharedMetadata } from '@/config/site-config'
import { type LocalePageParams } from '@/config/locale-config'
import { LayoutContainer } from '@/components/layouts/layout-container'

interface LocaleLayoutProps extends React.PropsWithChildren {
  params: Promise<LocalePageParams>
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
