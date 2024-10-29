import React from 'react'
import { isUndefined } from '@bassist/utils'
import { Separator } from 'blackwork'
import { Link } from '@/navigation'
import { type Locale } from '@/config/locale-config'
import { isMobileDevice } from '@/config/middleware-config'
import {
  type CategoryConfigItem,
  type CategoryGroup,
  allCategory,
} from '@/config/content-config'
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
    'flex flex-wrap items-end gap-x-6 gap-y-2 w-full min-h-7',
    className,
  )

  return (
    <nav className={navCls}>
      {links.map((i) => {
        const cls = cn(
          'scroll-m-20 tracking-tight',
          i.active ? 'text-xl font-semibold' : 'text-base',
        )

        return (
          <Link key={i.href} href={i.href} className={cls}>
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
  const cls = cn('flex flex-col gap-4 w-full mb-4', props.className)

  if (!props.categories.length) return null
  return (
    <div className={cls}>
      <LinksContent {...props} />
      <Separator />
    </div>
  )
}
