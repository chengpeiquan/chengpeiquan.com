import { defaultComponents, mergeComponents } from '@blackwork/machine'
import { expect, test, vi } from 'vitest'

vi.mock('@/navigation', () => ({
  Link: () => null,
  ExternalLink: () => null,
}))

import { components } from '@/core/parser/components'

test('blog parser components are layered on machine defaults', () => {
  const merged = mergeComponents(defaultComponents, components)

  expect(merged.pre).toBe(components.pre)
  expect(merged.img).toBe(components.img)
  expect(merged.video).toBe(components.video)
  expect(typeof merged.a).toBe('function')
})
