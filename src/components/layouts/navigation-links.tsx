'use client'

import { isUndefined } from '@bassist/utils'
import { Button, cn } from 'blackwork'
import { useTranslations } from 'next-intl'
import React from 'react'
import { listFolderMapping, pageFolderMapping } from '@/config/content-config'
import { CheckRoute } from '@/config/route-config'
import { type NavSlug, navIconMap, siteConfig } from '@/config/site-config'
import { useBreakpoint } from '@/hooks'
import { Link, usePathname } from '@/navigation'

interface NavigationLinkProps {
  asButton?: boolean
  onClick?: () => void
  slug: NavSlug
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  asButton = false,
  onClick,
  slug,
}) => {
  const pathname = usePathname()
  const ts = useTranslations('siteConfig')
  const ta = useTranslations('action')

  const label = ts(`nav.${slug}`)
  const ariaLabel = ta('sameTab', { label })

  // `pathname` always do not begin with a locale
  const active = useMemo(() => {
    if (CheckRoute.isListRoute(slug)) {
      return CheckRoute.isActiveList(pathname, slug)
    }

    if (CheckRoute.isPageRoute(slug)) {
      return CheckRoute.isActivePage(pathname, slug)
    }

    if (CheckRoute.isHomeRoute(slug)) {
      return CheckRoute.isActiveHome(pathname)
    }

    if (CheckRoute.isProjectRoute(slug)) {
      return CheckRoute.isActiveProjects(pathname)
    }

    return CheckRoute.isActiveSinglePage(pathname, slug)
  }, [pathname, slug])

  const href = useMemo(() => {
    if (CheckRoute.isListRoute(slug)) {
      return `/${listFolderMapping[slug]}/1`
    }

    if (CheckRoute.isPageRoute(slug)) {
      return `/${pageFolderMapping[slug]}`
    }

    return CheckRoute.isHomeRoute(slug) ? '/' : `/${slug}`
  }, [slug])

  const content = useMemo(() => {
    const IconComp = navIconMap[slug]
    const icon = asButton ? <IconComp className="mr-2 size-4" /> : null

    return (
      <Link
        href={href}
        className="text-base"
        title={label}
        aria-label={ariaLabel}
        variant={active ? (asButton ? 'inherit' : 'default') : 'secondary'}
        strong={active}
      >
        {icon}
        {label}
      </Link>
    )
  }, [active, ariaLabel, asButton, href, label, slug])

  if (asButton) {
    return (
      <Button
        variant={active ? 'default' : 'outline'}
        size="sm"
        asChild
        onClick={onClick}
      >
        {content}
      </Button>
    )
  }

  return content
}

interface NavigationLinksProps
  extends Pick<NavigationLinkProps, 'asButton' | 'onClick'> {
  /**
   * This option can limit whether to keep the resident display component
   * (controlled by `hidden` Class Name). If it is `undefined`, the breakpoint
   * is determined by the component as the rendering condition.
   *
   * @default undefined
   */
  visible?: boolean

  className?: string
}

export const NavigationLinks: React.FC<NavigationLinksProps> = ({
  visible: forceVisible,
  className,
  ...rest
}) => {
  const { isLg } = useBreakpoint()

  const visible = useMemo(() => {
    if (!isUndefined(forceVisible)) return forceVisible
    return isLg
  }, [forceVisible, isLg])

  const cls = cn(
    'flex-row gap-4 text-lg md:items-center md:gap-5 md:text-sm lg:gap-6',
    {
      'hidden lg:flex': !visible,
      flex: visible,
    },
    className,
  )

  return (
    <nav className={cls} suppressHydrationWarning>
      {siteConfig.navSlugs.map((i) => (
        <NavigationLink key={i} slug={i} {...rest} />
      ))}
    </nav>
  )
}
