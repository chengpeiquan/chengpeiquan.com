import React from 'react'
import { ProjectCard } from '@/components/project/project-card'
import { enrichProjectsWithStats } from '@/components/project/shared'
import { ExtraTag, type ProjectTag, allProjects } from '@/config/project-config'
import { type PropsWithLocale } from '@/config/route-config'
import { type GitHubRepoDataItem, type NpmDownloadDataItem } from '@/fetcher'
import { FilterBar } from './filter-bar'

interface ProjectListProps extends PropsWithLocale {
  tag: ProjectTag | ExtraTag
  data: {
    gh: GitHubRepoDataItem[] | undefined
    npm: NpmDownloadDataItem[] | undefined
  }
}

export const ProjectList: React.FC<ProjectListProps> = ({
  locale,
  tag,
  data,
}) => {
  const projects = (() => {
    if (tag === ExtraTag.All) return allProjects

    return allProjects.filter((i) => {
      return i.tags.some((j) => j === tag)
    })
  })()

  const items = enrichProjectsWithStats(projects, data)

  return (
    <div className="flex w-full flex-col gap-6">
      <FilterBar locale={locale} tag={tag} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {items.map((i) => (
          <ProjectCard key={i.repo + i.name} locale={locale} item={i} />
        ))}
      </div>
    </div>
  )
}
