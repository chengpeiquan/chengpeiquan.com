import { describe, expect, test } from 'vitest'
import { toSearchHighlightParts } from '@/components/layouts/search-highlight'

describe('toSearchHighlightParts', () => {
  test('preserves Pagefind mark tags when rendering excerpts', () => {
    expect(
      toSearchHighlightParts('正文里有 <mark>配置</mark> 关键词', '前端'),
    ).toEqual([
      { text: '正文里有 ', isHighlighted: false },
      { text: '配置', isHighlighted: true },
      { text: ' 关键词', isHighlighted: false },
    ])
  })

  test('highlights keyword matches in plain descriptions', () => {
    expect(
      toSearchHighlightParts('从前端开发者身份入门 Flutter', '前端'),
    ).toEqual([
      { text: '从', isHighlighted: false },
      { text: '前端', isHighlighted: true },
      { text: '开发者身份入门 Flutter', isHighlighted: false },
    ])
  })

  test('escapes regular expression syntax in keyword matches', () => {
    expect(
      toSearchHighlightParts('Cannot find module undici-types', 'undici-types'),
    ).toEqual([
      { text: 'Cannot find module ', isHighlighted: false },
      { text: 'undici-types', isHighlighted: true },
    ])
  })
})
