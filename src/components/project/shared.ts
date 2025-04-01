import { isArray, shuffle } from '@bassist/utils'
import { type ProjectConfigItem } from '@/config/project-config'
import {
  type GitHubRepoDataItem,
  type NpmDownloadDataItem,
  apis,
} from '@/fetcher'
import { type ProjectCardItem } from './project-card'

export const fetchProjectDatabase = async () => {
  const ghData = await apis.gh.repos()
  const npmData = await apis.npm.packages()

  return {
    gh: ghData,
    npm: npmData,
  }
}

export type ProjectDatabase = Awaited<ReturnType<typeof fetchProjectDatabase>>

export type ProjectAnalysisData = Pick<GitHubRepoDataItem, 'stars' | 'forks'> &
  Pick<NpmDownloadDataItem, 'downloads'>

export const enrichProjectsWithStats = (
  projects: ProjectConfigItem[],
  data: ProjectDatabase,
  sortBy: 'stars' | 'random' = 'stars',
): ProjectCardItem[] => {
  const items = projects.map<ProjectCardItem>((i) => {
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

  if (sortBy === 'random') {
    return shuffle(items)
  }

  return items.sort((a, b) => (b.data?.stars ?? 0) - (a.data?.stars ?? 0))
}
