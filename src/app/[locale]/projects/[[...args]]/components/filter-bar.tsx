import { Toggle } from 'blackwork'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import {
  ExtraTag,
  ProjectTag,
  extraTagNameMapping,
  isExtraTag,
  projectTagNameMapping,
  projectTotalMap,
} from '@/config/project-config'
import { type PropsWithLocale } from '@/config/route-config'
import { Link } from '@/navigation'

const tagList = [ExtraTag.All, ...(Object.values(ProjectTag) as ProjectTag[])]

interface FilterBarProps extends PropsWithLocale {
  tag: ExtraTag | ProjectTag
}

export const FilterBar = async ({ locale, tag }: FilterBarProps) => {
  const t = await getTranslations({
    locale,
    namespace: 'action',
  })

  const extraMapping = extraTagNameMapping[locale]
  const baseMapping = projectTagNameMapping[locale]

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tagList.map((i) => {
        const isExtra = isExtraTag(i)
        const label = isExtra ? extraMapping[i] : baseMapping[i]

        const pressed = tag === i
        const ariaLabel = pressed ? '' : t('sameTab', { label })
        const href = `/projects/${isExtra ? '' : i}`

        return (
          <Toggle
            key={i}
            size="sm"
            aria-label={ariaLabel}
            pressed={pressed}
            className="shrink-0 px-0"
          >
            <Link
              className="flex size-full items-center justify-center px-2.5"
              href={href}
              title={ariaLabel}
            >
              {label} ({projectTotalMap[i]})
            </Link>
          </Toggle>
        )
      })}
    </div>
  )
}
