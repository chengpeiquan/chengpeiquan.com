import { isUndefined } from '@bassist/utils'
import { Separator } from 'blackwork'
import React from 'react'
import {
  type CategoryConfigItem,
  type CategoryGroup,
  allCategory,
} from '@/config/content-config'
import { type Locale } from '@/config/locale-config'
import { isMobileDevice } from '@/config/middleware-config'
import { Link } from '@/navigation'
import { cn } from '@/utils'
import { Collapsible } from '../shared/collapsible'

interface CategoryItem extends CategoryConfigItem {
  href: string
  active: boolean
}

const Links: React.FC<{
  className?: string
  links: CategoryItem[]
  locale: Locale
}> = ({ className, links, locale }) => {
  const navCls = cn(
    'flex min-h-7 w-full flex-wrap items-end gap-x-6 gap-y-2',
    className,
  )

  return (
    <nav className={navCls}>
      {links.map((i) => {
        const cls = cn(
          'scroll-m-20 tracking-tight',
          i.active ? 'text-xl' : 'text-base',
        )

        return (
          <Link
            key={i.href}
            href={i.href}
            className={cls}
            variant={i.active ? 'default' : 'secondary'}
            strong={i.active}
          >
            {i.label[locale]}
          </Link>
        )
      })}
    </nav>
  )
}

interface CategoryLinksProps {
  className?: string
  locale: Locale
  group: CategoryGroup
  categories: CategoryConfigItem[]
  category?: string // Active category
  collapsible?: boolean
  collapsibleTitle?: string
}

const LinksContent = async ({
  locale,
  group,
  category,
  categories,
  collapsible = false,
  collapsibleTitle = '',
}: CategoryLinksProps) => {
  const isMobile = await isMobileDevice()

  const links = [allCategory, ...categories].map<CategoryItem>((i) => {
    const href = isUndefined(i.slug)
      ? `/${group}/1` // All
      : `/${group}/${i.slug}/1` // Specified category

    const active =
      isUndefined(category) && !i.slug
        ? true // All
        : i.slug === category // Specified category

    return { ...i, href, active }
  })

  if (collapsible && isMobile) {
    return (
      <Collapsible title={collapsibleTitle}>
        <Links links={links} locale={locale} />
      </Collapsible>
    )
  }

  return <Links links={links} locale={locale} />
}

export const CategoryLinks: React.FC<CategoryLinksProps> = (props) => {
  const cls = cn('mb-4 flex w-full flex-col gap-4', props.className)

  if (!props.categories.length) return null
  return (
    <div className={cls}>
      <LinksContent {...props} />
      <Separator />
    </div>
  )
}
