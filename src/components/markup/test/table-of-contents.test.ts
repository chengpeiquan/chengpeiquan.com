import { describe, expect, test } from 'vitest'
import { toDocsTocHeadings } from '@/components/markup/toc-utils'
import { type HeadingItem } from '@/config/content-config'

describe('toDocsTocHeadings', () => {
  test('flattens nested headings into docs toc headings', () => {
    const headings: HeadingItem[] = [
      {
        depth: 2,
        id: 'intro',
        value: 'Intro',
        children: [
          {
            depth: 3,
            id: 'install',
            value: 'Install',
          },
        ],
      },
      {
        depth: 2,
        id: 'usage',
        value: 'Usage',
      },
    ]

    expect(toDocsTocHeadings(headings)).toEqual([
      { depth: 2, id: 'intro', title: 'Intro' },
      { depth: 3, id: 'install', title: 'Install' },
      { depth: 2, id: 'usage', title: 'Usage' },
    ])
  })
})
