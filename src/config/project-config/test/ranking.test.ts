import { describe, expect, it } from 'vitest'
import {
  ProjectTag,
  calculateProjectImpactScore,
  sortProjectsByImpact,
} from '@/config/project-config'
import { type ProjectConfigItem } from '@/config/project-config/types'

interface TestProject extends ProjectConfigItem {
  data: {
    stars: number
    forks: number
    downloads: number
  }
}

const createProject = (
  project: Pick<ProjectConfigItem, 'name' | 'npm' | 'tags'> & {
    stars?: number
    forks?: number
    downloads?: number
  },
): TestProject => ({
  name: project.name,
  repo: project.name ?? 'demo',
  npm: project.npm,
  tags: project.tags,
  metadata: {
    en: { description: 'Demo project.' },
    zh: { description: '演示项目。' },
  },
  data: {
    stars: project.stars ?? 0,
    forks: project.forks ?? 0,
    downloads: project.downloads ?? 0,
  },
})

describe('project ranking', () => {
  it('uses downloads as a real signal for npm packages', () => {
    const popularPackage = createProject({
      name: 'popular-package',
      npm: true,
      tags: [ProjectTag.Toolkit],
      stars: 50,
      downloads: 1_000_000,
    })
    const smallProject = createProject({
      name: 'small-project',
      tags: [ProjectTag.Toolkit],
      stars: 100,
    })

    expect(calculateProjectImpactScore(popularPackage)).toBeGreaterThan(
      calculateProjectImpactScore(smallProject),
    )
  })

  it('does not penalize non-npm projects for missing downloads', () => {
    const tutorial = createProject({
      name: 'popular-tutorial',
      tags: [ProjectTag.Tutorial],
      stars: 1_500,
      forks: 300,
    })
    const packageWithDownloads = createProject({
      name: 'package-with-downloads',
      npm: true,
      tags: [ProjectTag.Toolkit],
      stars: 80,
      downloads: 100_000,
    })

    expect(sortProjectsByImpact([packageWithDownloads, tutorial])[0]).toBe(
      tutorial,
    )
  })

  it('keeps EOL projects after active projects', () => {
    const eolProject = createProject({
      name: 'eol-project',
      npm: true,
      tags: [ProjectTag.EOL],
      stars: 10_000,
      downloads: 10_000_000,
    })
    const activeProject = createProject({
      name: 'active-project',
      tags: [ProjectTag.Toolkit],
      stars: 1,
    })

    expect(sortProjectsByImpact([eolProject, activeProject])).toEqual([
      activeProject,
      eolProject,
    ])
  })
})
