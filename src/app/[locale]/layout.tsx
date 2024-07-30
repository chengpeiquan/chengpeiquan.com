import React from 'react'
import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  ExternalLink,
  LayoutFooter,
  LayoutHeader,
  RootLayout,
} from 'blackwork'
import { isUndefined } from '@bassist/utils'
import { sideConfig } from '@/config/site-config'
import { type LocalePageParams } from '@/config/locale-config'
import { NavigationLinks } from '@/components/client/navigation-links'
import { LanguageToggle } from '@/components/client/language-toggle'
import { ThemeToggle } from '@/components/client/theme-toggle'
import 'blackwork/ui-globals.css'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

interface LocaleLayoutProps {
  params: LocalePageParams
  children: React.ReactNode
}

export const generateMetadata = async ({
  params,
}: Pick<LocaleLayoutProps, 'params'>) => {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'siteConfig',
  })

  return {
    title: t('title'),
    description: t('description'),
    creator: sideConfig.author.name,
    authors: sideConfig.author,
  } satisfies Metadata
}

export default async function LocaleLayout({
  params,
  children,
}: Readonly<LocaleLayoutProps>) {
  const messages = await getMessages()

  const t = await getTranslations({
    locale: params.locale,
    namespace: 'siteConfig',
  })

  const ta = await getTranslations({
    locale: params.locale,
    namespace: 'action',
  })

  const socialLinks = sideConfig.socialLinks
    .filter((i) => isUndefined(i.locale) || i.locale === params.locale)
    .map((i) => {
      const label = t(`socialLink.${i.type}`)
      const ariaLabel = ta('newTab', { label })
      return {
        ...i,
        label,
        ariaLabel,
      }
    })

  return (
    <RootLayout lang={params.locale} className={inter.className}>
      <NextIntlClientProvider messages={messages}>
        <LayoutHeader
          wrapperClassName="gap-12"
          contentClassName="gap-6"
          socialLinks={socialLinks}
          languageToggle={<LanguageToggle />}
          themeToggle={<ThemeToggle />}
          className="shadow-[inset_0_-1px_0_0_#333] backdrop-saturate-150 backdrop-blur"
        >
          <div className="flex flex-shrink-0 items-center gap-3">
            <Avatar className="w-7 h-7">
              <AvatarImage
                src={sideConfig.avatar.small}
                alt={sideConfig.author.name}
              />
              <AvatarFallback>CPQ</AvatarFallback>
            </Avatar>

            <h2 className="text-foreground text-lg">{t('name')}</h2>
          </div>

          <div className="flex flex-1 items-center justify-end h-full box-border pr-1 overflow-hidden">
            <NavigationLinks />
          </div>
        </LayoutHeader>

        {children}

        <LayoutFooter className="gap-4 sm:gap-12 flex-col sm:flex-row">
          <span>
            © 2014-{new Date().getFullYear()} {t('name')}
          </span>

          <ExternalLink href="https://beian.miit.gov.cn/">
            {t('icp')}
          </ExternalLink>
        </LayoutFooter>
      </NextIntlClientProvider>
    </RootLayout>
  )
}
