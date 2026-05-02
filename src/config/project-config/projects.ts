import { projectItems } from './items'
import { ExtraTag, type ProjectTag } from './tags'
import { type ProjectConfigItem } from './types'
import { defaultOwner } from './urls'

export const normalizeProject = (
  project: ProjectConfigItem,
): ProjectConfigItem => {
  const { owner = defaultOwner, repo, name = repo, ...rest } = project
  return { ...rest, owner, repo, name }
}

// With all fields
export const allProjects = projectItems.map<ProjectConfigItem>(normalizeProject)

export const projectTotalMap = allProjects.reduce(
  (acc, i) => {
    i.tags.forEach((j) => {
      if (!acc[j]) acc[j] = 0
      return (acc[j] += 1)
    })
    return acc
  },
  { [ExtraTag.All]: allProjects.length } as Record<
    ExtraTag | ProjectTag,
    number
  >,
)
