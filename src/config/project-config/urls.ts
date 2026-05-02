import { siteConfig } from '../site-config'
import { type ProjectConfigItem } from './types'

export const githubConfig = {
  website: 'https://github.com',
  api: 'https://api.github.com',
} as const

export const defaultOwner = siteConfig.author.name!

export const getRepoUrl = ({
  owner = defaultOwner,
  repo,
  name,
  directory,
}: ProjectConfigItem) => {
  const repoUrl = `${githubConfig.website}/${owner}/${repo || name}`
  return directory ? `${repoUrl}/tree/main/packages/${directory}` : repoUrl
}

export const getNpmUrl = ({ name }: ProjectConfigItem) => {
  return `https://www.npmjs.com/package/${name}`
}
