import React from 'react'
import { getTranslations } from 'next-intl/server'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  ExternalLink,
  LayoutFooter,
  LayoutHeader,
  ScrollToTop,
} from 'blackwork'
import { isMobileDevice } from '@/config/middleware-config'
import { type LocalePageParams } from '@/config/locale-config'
import { getLocaleSocialLinks, sideConfig } from '@/config/site-config'
import { NavigationLinks } from '@/components/layouts/navigation-links'
import { LanguageToggle } from '@/components/layouts/language-toggle'
import { ThemeToggle } from '@/components/layouts/theme-toggle'
import { NavigationDrawer } from '@/components/layouts/navigation-drawer'
import { SearchBox } from '@/components/layouts/search-box'

type LayoutContainerProps = React.PropsWithChildren & LocalePageParams

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
        wrapperClassName="gap-12"
        contentClassName="gap-6"
        socialLinksVisible={!isMobile}
        socialLinks={socialLinks}
        languageToggle={<LanguageToggle />}
        themeToggle={<ThemeToggle />}
      >
        <div className="flex flex-shrink-0 items-center gap-3">
          <NavigationDrawer isMobile={isMobile} />

          <Avatar className="w-7 h-7">
            <AvatarImage
              src={sideConfig.avatar.small}
              alt={sideConfig.author.name}
            />
            <AvatarFallback>CPQ</AvatarFallback>
          </Avatar>

          <h2 className="text-foreground text-lg">{t('name')}</h2>
        </div>

        {!isMobile && (
          <>
            <SearchBox />

            <div className="flex flex-1 items-center justify-end h-full box-border pr-1 overflow-hidden">
              <NavigationLinks />
            </div>
          </>
        )}
      </LayoutHeader>

      {children}

      <ScrollToTop
        className={isMobile ? 'right-5 bottom-5' : ''}
        variant={isMobile ? 'outline' : 'ghost'}
      />

      <LayoutFooter className="gap-4 sm:gap-12 flex-col sm:flex-row">
        <span className="text-muted-foreground">
          © 2014-{new Date().getFullYear()} {t('name')}
        </span>

        <ExternalLink
          href="https://beian.miit.gov.cn/"
          className="transition-colors hover:text-foreground text-muted-foreground"
        >
          {t('icp')}
        </ExternalLink>
      </LayoutFooter>
    </>
  )
}
