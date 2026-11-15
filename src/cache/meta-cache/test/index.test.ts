import { shuffle } from '@bassist/utils'
import { afterEach, expect, test, vi } from 'vitest'
import { getMetaCache } from '@/cache/meta-cache'
import { ContentFolder } from '@/config/content-config'

afterEach(() => {
  vi.restoreAllMocks()
})

test('homepage shuffling does not change subsequent cookbook list order', async () => {
  const recommendations = await getMetaCache(ContentFolder.Cookbook, 'zh')
  const originalSlugs = recommendations.map((item) => item.slug)
  vi.spyOn(Math, 'random').mockReturnValue(0)

  shuffle(recommendations)
  expect(recommendations.map((item) => item.slug)).not.toEqual(originalSlugs)

  const list = await getMetaCache(ContentFolder.Cookbook, 'zh')
  expect(list.map((item) => item.slug)).toEqual(originalSlugs)
})
