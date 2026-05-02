import { ProjectTag } from './tags'
import { type ProjectConfigItem } from './types'

export interface ProjectRankingData {
  stars?: number
  forks?: number
  downloads?: number
}

export type RankableProject<T extends ProjectConfigItem = ProjectConfigItem> =
  T & {
    data?: ProjectRankingData
  }

const TAG_BOOST: Partial<Record<ProjectTag, number>> = {
  [ProjectTag.Tutorial]: 0.25,
  [ProjectTag.UI]: 0.2,
  [ProjectTag.Toolkit]: 0.15,
  [ProjectTag.Scaffold]: 0.1,
  [ProjectTag.Template]: 0.05,
}

const hasTag = (project: ProjectConfigItem, tag: ProjectTag) => {
  return project.tags.some((i) => i === tag)
}

const scaleMetric = (value: number | undefined) => Math.log10((value ?? 0) + 1)

const getTagBoost = (project: ProjectConfigItem) => {
  return project.tags.reduce((acc, tag) => acc + (TAG_BOOST[tag] ?? 0), 0)
}

export const calculateProjectImpactScore = (
  project: RankableProject,
): number => {
  const starScore = scaleMetric(project.data?.stars)
  const forkScore = scaleMetric(project.data?.forks)
  const downloadScore = scaleMetric(project.data?.downloads)

  if (project.npm) {
    return (
      starScore * 0.55 +
      downloadScore * 0.35 +
      forkScore * 0.1 +
      getTagBoost(project)
    )
  }

  return starScore * 0.85 + forkScore * 0.15 + getTagBoost(project)
}

const sortByImpactScore = <T extends RankableProject>(projects: T[]): T[] => {
  return [...projects].sort((a, b) => {
    const scoreDiff =
      calculateProjectImpactScore(b) - calculateProjectImpactScore(a)

    if (scoreDiff !== 0) return scoreDiff

    return (b.data?.stars ?? 0) - (a.data?.stars ?? 0)
  })
}

export const sortProjectsByImpact = <T extends RankableProject>(
  projects: T[],
): T[] => {
  const activeProjects = projects.filter((i) => !hasTag(i, ProjectTag.EOL))
  const eolProjects = projects.filter((i) => hasTag(i, ProjectTag.EOL))

  return [
    ...sortByImpactScore(activeProjects),
    ...sortByImpactScore(eolProjects),
  ]
}
