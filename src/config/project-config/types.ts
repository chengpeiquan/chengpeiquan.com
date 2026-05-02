import { type Locale } from '../locale-config'
import { type ProjectTag } from './tags'

export interface ProjectMetadata {
  description: string

  // Prioritize the homepage URL for the language
  homepage?: string
}

export interface ProjectConfigItem {
  /**
   * The project name
   *
   * @default repo
   */
  name?: string

  /**
   * @default defaultOwner
   */
  owner?: string

  /**
   * GitHub repository name
   */
  repo: string

  /**
   * The directory in a monorepo
   */
  directory?: string

  /**
   * Is this project an npm package
   *
   * @default false
   */
  npm?: boolean

  /**
   * If marked EOL, an alternative is shown
   */
  alternative?: string

  homepage?: string
  tags: ProjectTag[]
  metadata: Record<Locale, ProjectMetadata>
}
