import { describe, expect, it } from 'vitest'
import {
  ExtraTag,
  ProjectTag,
  allProjects,
  extraTagNameMapping,
  getNpmUrl,
  getRepoUrl,
  normalizeProject,
  projectTotalMap,
} from '@/config/project-config'

describe('project config', () => {
  it('normalizes project fields and builds project totals', () => {
    const learningVue3 = allProjects.find((i) => i.repo === 'learning-vue3')

    expect(learningVue3).toMatchObject({
      name: 'learning-vue3',
      owner: 'chengpeiquan',
    })
    expect(projectTotalMap[ExtraTag.All]).toBe(allProjects.length)
    expect(projectTotalMap[ProjectTag.Tutorial]).toBeGreaterThan(0)
    expect(extraTagNameMapping.zh[ExtraTag.All]).toBe('全部')
  })

  it('normalizes a single project config item', () => {
    expect(
      normalizeProject({
        repo: 'demo',
        tags: [ProjectTag.Toolkit],
        metadata: {
          en: { description: 'Demo project.' },
          zh: { description: '演示项目。' },
        },
      }),
    ).toMatchObject({
      name: 'demo',
      owner: 'chengpeiquan',
      repo: 'demo',
    })
  })

  it('builds GitHub and npm URLs', () => {
    const blackworkDocs = allProjects.find((i) => i.name === '@blackwork/docs')

    expect(blackworkDocs).toBeDefined()
    expect(getRepoUrl(blackworkDocs!)).toBe(
      'https://github.com/chengpeiquan/blackwork/tree/main/packages/docs',
    )
    expect(getNpmUrl(blackworkDocs!)).toBe(
      'https://www.npmjs.com/package/@blackwork/docs',
    )
  })
})
