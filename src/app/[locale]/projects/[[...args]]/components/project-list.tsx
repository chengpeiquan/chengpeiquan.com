import React from 'react'
import { isArray } from '@bassist/utils'
import { ExtraTag, type ProjectTag, allProjects } from '@/config/project-config'
import { type PropsWithLocale } from '@/config/route-config'
import { type GitHubRepoDataItem, type NpmDownloadDataItem } from '@/fetcher'
import { FilterBar } from './filter-bar'
import {
  type ProjectAnalysisData,
  ProjectCard,
  type ProjectCardItem,
} from './project-card'

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

  const items = projects
    .map<ProjectCardItem>((i) => {
      const gh = isArray(data.gh)
        ? data.gh.find((j) => j.repo === i.repo && j.owner === i.owner)
        : undefined

      const npm =
        isArray(data.npm) && i.npm
          ? data.npm.find((j) => j.packageName === i.name)
          : undefined

      const picked: ProjectAnalysisData = {
        stars: gh?.stars ?? 0,
        forks: gh?.forks ?? 0,
        downloads: npm?.downloads ?? 0,
      }

      return {
        ...i,
        data: picked,
      }
    })
    .sort((a, b) => (b.data?.stars ?? 0) - (a.data?.stars ?? 0))

  return (
    <div className="flex flex-col gap-6 w-full">
      <FilterBar locale={locale} tag={tag} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {items.map((i) => (
          <ProjectCard key={i.repo + i.name} locale={locale} item={i} />
        ))}
      </div>
    </div>
  )
}
