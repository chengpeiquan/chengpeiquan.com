import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  LayoutFooter,
  LayoutHeader,
  ScrollToTop,
} from 'blackwork'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { LanguageToggle } from '@/components/layouts/language-toggle'
import { NavigationLinks } from '@/components/layouts/navigation-links'
import { NavigationSheet } from '@/components/layouts/navigation-sheet'
import { SearchBox } from '@/components/layouts/search-box'
import { ThemeToggle } from '@/components/layouts/theme-toggle'
import { isMobileDevice } from '@/config/middleware-config'
import { type PropsWithLocale } from '@/config/route-config'
import { getLocaleSocialLinks, siteConfig } from '@/config/site-config'
import { getBrbStyle, getBrbVariant } from '@/config/style-config'
import { ExternalLink } from '@/navigation'

type LayoutContainerProps = React.PropsWithChildren & PropsWithLocale

export const LayoutContainer = async ({
  locale,
  children,
}: LayoutContainerProps) => {
  const isMobile = await isMobileDevice()

  const t = await getTranslations({
    locale,
    namespace: 'siteConfig',
  })

  const ta = await getTranslations({
    locale,
    namespace: 'action',
  })

  const socialLinks = getLocaleSocialLinks(locale).map((i) => {
    const label = t(`socialLink.${i.type}`)
    const ariaLabel = ta('newTab', { label })
    return { ...i, label, ariaLabel }
  })

  return (
    <>
      <LayoutHeader
        className="dark:shadow-[inset_0_-1px_0_0_#222]"
        wrapperClassName="gap-12 md:gap-8"
        contentClassName="gap-6"
        socialLinksVisible={!isMobile}
        socialLinks={socialLinks}
        languageToggle={<LanguageToggle />}
        themeToggle={<ThemeToggle />}
      >
        <div className="flex shrink-0 items-center gap-3">
          <NavigationSheet isMobile={isMobile} />

          <Avatar className="size-7">
            <AvatarImage
              src={siteConfig.avatar.small}
              alt={siteConfig.author.name}
            />
            <AvatarFallback>
              {t('name').slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-foreground text-lg">{t('name')}</h2>
        </div>

        {!isMobile && (
          <>
            <SearchBox />

            <div className="box-border flex h-full flex-1 items-center justify-end overflow-hidden pr-1">
              <NavigationLinks />
            </div>
          </>
        )}
      </LayoutHeader>

      {children}

      <ScrollToTop
        variant={getBrbVariant(isMobile)}
        style={getBrbStyle(0, isMobile)}
      />

      <LayoutFooter className="h-28 flex-col gap-2 sm:flex-row sm:gap-12 md:h-32">
        <span className="text-muted-foreground">
          © 2014-{new Date().getFullYear()} {t('name')}
        </span>

        <ExternalLink href="https://beian.miit.gov.cn/" variant="secondary">
          {t('icp')}
        </ExternalLink>
      </LayoutFooter>
    </>
  )
}
