import { beforeEach, describe, expect, test, vi } from 'vitest'
import { ContentFolder } from '@/config/content-config'
import { getList, getListMetadata } from '@/core/dispatcher'

const mocks = vi.hoisted(() => ({ getMetaCache: vi.fn() }))
vi.mock('@/cache/meta-cache', () => ({ getMetaCache: mocks.getMetaCache }))
vi.mock('@/core/io', () => ({ getContent: vi.fn() }))
vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_HTTP_ERROR_FALLBACK;404')
  },
}))
vi.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string) => key,
}))

beforeEach(() => {
  mocks.getMetaCache.mockResolvedValue(
    Array.from({ length: 11 }, (_, index) => ({
      slug: `post-${index}`,
      metadata: { categories: index === 0 ? ['design'] : ['tech'] },
    })),
  )
})

describe('list indexing boundaries', () => {
  test.each([
    [],
    ['0'],
    ['-1'],
    ['1.5'],
    ['NaN'],
    ['Infinity'],
    ['1e2'],
    ['01'],
    ['9007199254740992'],
    ['2284'],
    ['tech', '2'],
    ['unknown', '1'],
    ['beginner', '1'],
    ['toString', '1'],
    ['tech', '1', 'extra'],
  ])(
    'rejects invalid route %j in both content and metadata',
    async (...args) => {
      const params = { locale: 'zh' as const, args }
      await expect(getList(ContentFolder.Article, params)).rejects.toThrow(
        '404',
      )
      await expect(
        getListMetadata(ContentFolder.Article, params),
      ).rejects.toThrow('404')
    },
  )

  test('keeps the last real page and its own canonical', async () => {
    const params = { locale: 'zh' as const, args: ['2'] }
    const result = await getList(ContentFolder.Article, params)
    expect(result.items).toHaveLength(1)
    expect(result.lastPage).toBe(2)
    const metadata = await getListMetadata(ContentFolder.Article, params)
    expect(metadata.alternates?.canonical).toBe(
      'https://chengpeiquan.com/articles/2',
    )
    expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical)
  })

  test('includes the language and category in the canonical', async () => {
    const metadata = await getListMetadata(ContentFolder.Article, {
      locale: 'en',
      args: ['tech', '1'],
    })
    expect(metadata.alternates?.canonical).toBe(
      'https://chengpeiquan.com/en/articles/tech/1',
    )
  })

  test('allows an empty first page but rejects subsequent cookbook pages', async () => {
    mocks.getMetaCache.mockResolvedValue([])
    await expect(
      getList(ContentFolder.Cookbook, { locale: 'en', args: ['1'] }),
    ).resolves.toMatchObject({ isEmpty: true })
    await expect(
      getList(ContentFolder.Cookbook, { locale: 'en', args: ['2'] }),
    ).rejects.toThrow('404')
  })
})
