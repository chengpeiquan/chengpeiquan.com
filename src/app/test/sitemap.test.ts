import { expect, test, vi } from 'vitest'
import sitemap from '@/app/sitemap'
import { ContentFolder } from '@/config/content-config'
import { type Locale } from '@/config/locale-config'

vi.mock('@/cache/meta-cache', () => ({
  getMetaCache: async (folder: ContentFolder, locale: Locale) => {
    if (folder === ContentFolder.Cookbook) return []
    if (locale === 'en')
      return [{ slug: 'translated', metadata: { categories: ['tech'] } }]
    return [
      ...Array.from({ length: 11 }, (_, index) => ({
        slug: `post-${index}`,
        metadata: { categories: ['tech'] },
      })),
      { slug: 'draft', metadata: { isDraft: true, categories: ['design'] } },
    ]
  },
}))

test('includes only published content in its actual language', async () => {
  const entries = await sitemap()
  const urls = entries.map((entry) => entry.url)
  expect(urls).toContain('https://chengpeiquan.com/article/post-0')
  expect(urls).toContain('https://chengpeiquan.com/en/article/translated')
  expect(urls).not.toContain('https://chengpeiquan.com/en/article/post-0')
  expect(urls.some((url) => url.includes('draft'))).toBe(false)
  expect(new Set(urls).size).toBe(urls.length)
  expect(entries.every((entry) => entry.lastModified === undefined)).toBe(true)
})

test('limits lists and categories to real nonempty pages', async () => {
  const urls = (await sitemap()).map((entry) => entry.url)
  expect(urls).toContain('https://chengpeiquan.com/articles/2')
  expect(urls).toContain('https://chengpeiquan.com/articles/tech/2')
  expect(urls).not.toContain('https://chengpeiquan.com/articles/3')
  expect(urls).not.toContain('https://chengpeiquan.com/en/articles/2')
  expect(urls).not.toContain('https://chengpeiquan.com/articles/design/1')
  expect(urls.some((url) => url.includes('/cookbooks/'))).toBe(false)
  expect(urls).toContain('https://chengpeiquan.com/en')
  expect(urls).toContain('https://chengpeiquan.com')
})
