import React from 'react'
import { clsx } from 'clsx'
import { isUndefined } from '@bassist/utils'
import { Separator } from 'blackwork'
import { Link } from '@/navigation'
import { type Locale } from '@/config/locale-config'
import {
  type CategoryConfigItem,
  type CategoryGroup,
  allCategory,
} from '@/config/content-config'

interface CategoryItem extends CategoryConfigItem {
  href: string
  active: boolean
}

export const CategoryLinks: React.FC<{
  locale: Locale
  group: CategoryGroup
  categories: CategoryConfigItem[]
  category?: string // Active category
}> = ({ locale, group, category, categories }) => {
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

  if (!categories.length) return null
  return (
    <div className="flex flex-col gap-4 w-full mb-4">
      <nav className="flex items-end gap-6 w-full min-h-7">
        {links.map((i) => {
          const cls = clsx(
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

      <Separator />
    </div>
  )
}
