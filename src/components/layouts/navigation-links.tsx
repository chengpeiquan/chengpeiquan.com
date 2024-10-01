'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Button, cn } from 'blackwork'
import { isUndefined } from '@bassist/utils'
import { type NavSlug, navIconMap, sideConfig } from '@/config/site-config'
import { Link, usePathname } from '@/navigation'
import { useBreakpoint } from '@/hooks'

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
    switch (slug) {
      case 'article': {
        return (
          pathname.startsWith('/articles/') || pathname.startsWith('/article/')
        )
      }
      case 'cookbook': {
        return (
          pathname.startsWith('/cookbooks/') ||
          pathname.startsWith('/cookbook/')
        )
      }
      case 'about': {
        return pathname === '/about'
      }
      default: {
        return pathname === '/'
      }
    }
  }, [pathname, slug])

  const cls = cn(
    'text-base transition-colors hover:text-foreground',
    active ? 'text-foreground' : 'text-muted-foreground',
  )

  const href = useMemo(() => {
    switch (slug) {
      case 'article': {
        return '/articles/1'
      }
      case 'cookbook': {
        return '/cookbooks/1'
      }
      case 'about': {
        return '/about'
      }
      default: {
        return '/'
      }
    }
  }, [slug])

  const content = useMemo(() => {
    const IconComp = navIconMap[slug]
    const icon = asButton ? <IconComp className="w-4 h-4 mr-2" /> : null

    return (
      <Link href={href} className={cls} title={label} aria-label={ariaLabel}>
        {icon}
        {label}
      </Link>
    )
  }, [ariaLabel, asButton, cls, href, label, slug])

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
   * (controlled by `hidden` Class Name). If it is `undefined`,
   * the breakpoint is determined by the component as
   * the rendering condition.
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
  const { isMd } = useBreakpoint()

  const visible = useMemo(() => {
    if (!isUndefined(forceVisible)) return forceVisible
    return isMd
  }, [forceVisible, isMd])

  const cls = cn(
    'flex-row gap-4 text-lg font-medium md:items-center md:gap-5 md:text-sm lg:gap-6',
    {
      'hidden md:flex': !visible,
      flex: visible,
    },
    className,
  )

  return (
    <nav className={cls}>
      {sideConfig.navSlugs.map((i) => (
        <NavigationLink key={i} slug={i} {...rest} />
      ))}
    </nav>
  )
}
