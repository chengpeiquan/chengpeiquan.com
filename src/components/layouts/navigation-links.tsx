'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { cn } from 'blackwork'
import { sideConfig } from '@/config/site-config'
import { Link, usePathname } from '@/navigation'

const NavigationLink: React.FC<{
  slug: (typeof sideConfig.navSlugs)[number]
}> = ({ slug }) => {
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

  return (
    <Link href={href} className={cls} title={label} aria-label={ariaLabel}>
      {label}
    </Link>
  )
}

export const NavigationLinks: React.FC = () => {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      {sideConfig.navSlugs.map((i) => (
        <NavigationLink key={i} slug={i} />
      ))}
    </nav>
  )
}
