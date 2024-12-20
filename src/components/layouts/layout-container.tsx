import React from 'react'
import { getTranslations } from 'next-intl/server'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  LayoutFooter,
  LayoutHeader,
  ScrollToTop,
} from 'blackwork'
import { isMobileDevice } from '@/config/middleware-config'
import { type PropsWithLocale } from '@/config/route-config'
import { getBrbStyle, getBrbVariant } from '@/config/style-config'
import { getLocaleSocialLinks, siteConfig } from '@/config/site-config'
import { NavigationLinks } from '@/components/layouts/navigation-links'
import { LanguageToggle } from '@/components/layouts/language-toggle'
import { ThemeToggle } from '@/components/layouts/theme-toggle'
import { NavigationDrawer } from '@/components/layouts/navigation-drawer'
import { SearchBox } from '@/components/layouts/search-box'
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
        wrapperClassName="gap-12 md:gap-8"
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
              src={siteConfig.avatar.small}
              alt={siteConfig.author.name}
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
        variant={getBrbVariant(isMobile)}
        style={getBrbStyle(0, isMobile)}
      />

      <LayoutFooter className="gap-4 sm:gap-12 flex-col sm:flex-row">
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
