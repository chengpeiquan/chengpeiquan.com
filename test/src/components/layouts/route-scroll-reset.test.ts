import { describe, expect, test, vi } from 'vitest'

vi.mock('@/navigation', () => ({
  usePathname: vi.fn(),
}))

import {
  resetRouteScroll,
  shouldResetRouteScroll,
} from '@/components/layouts/route-scroll-reset'

describe('shouldResetRouteScroll', () => {
  test('does not reset on the initial pathname snapshot', () => {
    expect(shouldResetRouteScroll(null, '/articles')).toBe(false)
  })

  test('resets when the pathname changes', () => {
    expect(shouldResetRouteScroll('/articles', '/projects')).toBe(true)
  })

  test('does not reset when the pathname stays the same', () => {
    expect(shouldResetRouteScroll('/articles', '/articles')).toBe(false)
  })
})

test('resetRouteScroll scrolls to the top immediately', () => {
  const scrollTo = vi.fn()

  resetRouteScroll({ scrollTo })

  expect(scrollTo).toHaveBeenCalledWith({
    left: 0,
    top: 0,
    behavior: 'instant',
  })
})
