import { beforeEach, expect, test, vi } from 'vitest'
import { ContentFolder } from '@/config/content-config'
import { getDetails, getDetailsMetadata } from '@/core/dispatcher'

const mocks = vi.hoisted(() => ({ getContent: vi.fn() }))
vi.mock('@/core/io', () => ({ getContent: mocks.getContent }))
vi.mock('next-intl/server', () => ({ getTranslations: vi.fn() }))

const content = {
  slug: 'example',
  metadata: {
    title: 'Example',
    desc: 'Description',
    keywords: '',
    cover: 'https://example.com/cover.jpg',
  },
}

beforeEach(() => vi.resetAllMocks())

test('canonical and Open Graph point to the source language for fallback content', async () => {
  mocks.getContent.mockImplementation(async ({ locale }) =>
    locale === 'zh' ? content : null,
  )
  const params = { locale: 'en' as const, slug: 'example' }
  const details = await getDetails(ContentFolder.Article, params)
  expect(details?.contentLocale).toBe('zh')
  const metadata = await getDetailsMetadata(ContentFolder.Article, params)
  expect(metadata.alternates?.canonical).toBe(
    'https://chengpeiquan.com/article/example',
  )
  expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical)
  expect(metadata.openGraph?.locale).toBe('zh')
})

test('real English translations keep their own canonical', async () => {
  mocks.getContent.mockResolvedValue(content)
  const metadata = await getDetailsMetadata(ContentFolder.Article, {
    locale: 'en',
    slug: 'example',
  })
  expect(metadata.alternates?.canonical).toBe(
    'https://chengpeiquan.com/en/article/example',
  )
  expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical)
  expect(metadata.openGraph?.locale).toBe('en')
})

test('about fallback keeps the standalone page path', async () => {
  mocks.getContent.mockImplementation(async ({ locale }) =>
    locale === 'zh' ? content : null,
  )
  const metadata = await getDetailsMetadata(ContentFolder.About, {
    locale: 'en',
    slug: 'about',
  })
  expect(metadata.alternates?.canonical).toBe('https://chengpeiquan.com/about')
})

test('missing content remains missing in both languages', async () => {
  mocks.getContent.mockResolvedValue(null)
  const params = { locale: 'en' as const, slug: 'missing' }
  await expect(getDetails(ContentFolder.Article, params)).resolves.toBeNull()
  await expect(
    getDetailsMetadata(ContentFolder.Article, params),
  ).resolves.toEqual({})
})
