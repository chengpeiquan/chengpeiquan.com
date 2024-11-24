import React from 'react'
import { ExtraTag, type ProjectTag, projects } from '@/config/project-config'
import { type PropsWithLocale } from '@/config/route-config'
import { FilterBar } from './filter-bar'
import { ProjectCard } from './project-card'

interface ProjectListProps extends PropsWithLocale {
  tag: ProjectTag | ExtraTag
}

export const ProjectList: React.FC<ProjectListProps> = ({ locale, tag }) => {
  const items = (() => {
    if (tag === ExtraTag.All) return projects

    return projects.filter((i) => {
      return i.tags?.some((j) => j === tag)
    })
  })()

  return (
    <div className="flex flex-col gap-6 w-full">
      <FilterBar locale={locale} tag={tag} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((i) => (
          <ProjectCard key={i.repo + i.name} locale={locale} item={i} />
        ))}
      </div>
    </div>
  )
}
