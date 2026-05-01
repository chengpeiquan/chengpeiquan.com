import { describe, expect, test, vi } from 'vitest'
import { getMetaCache } from '@/cache/meta-cache'
import { ContentFolder } from '@/config/content-config'
import { searchContents } from '@/core/search'

vi.mock('@/cache/meta-cache', () => ({
  getMetaCache: vi.fn(),
}))

const mockedGetMetaCache = vi.mocked(getMetaCache)

describe('searchContents', () => {
  test('prioritizes title matches over Pagefind body matches', async () => {
    mockedGetMetaCache.mockResolvedValueOnce([
      {
        slug: 'requirement-design',
        metadata: {
          title: '简单的六个步骤 让你写出技术爱看的需求文档',
          desc: '提需求应该是每个同学在工作中最不可避免的三个字',
          keywords: '需求设计,需求文档,需求规范',
          cover: 'https://example.com/requirement.jpg',
          date: '',
          timestamp: 0,
        },
      },
    ])

    const client = {
      async search() {
        return {
          total: 1,
          items: [
            {
              id: 'article-zh-nas',
              meta: {
                slug: 'my-custom-nas',
                title: '千元预算组装入门 NAS 设备 分享 NAS 的硬件基础知识',
                desc: '正文里提到了需求文档',
                cover: 'https://example.com/nas.jpg',
              },
              subResults: [],
              url: '/zh/article/my-custom-nas',
            },
          ],
        }
      },
    }

    const result = await searchContents('需求文档', {
      client,
      folder: ContentFolder.Article,
      locale: 'zh',
    })

    expect(result.map((item) => item.slug)).toEqual([
      'requirement-design',
      'my-custom-nas',
    ])
  })

  test('filters Pagefind-only CJK results that do not contain the searched phrase', async () => {
    mockedGetMetaCache.mockResolvedValueOnce([])

    const client = {
      async search() {
        return {
          total: 2,
          items: [
            {
              id: 'article-zh-nas',
              excerpt: 'NAS 主要还是服务于数据存储的需求',
              meta: {
                slug: 'my-custom-nas',
                title: '千元预算组装入门 NAS 设备 分享 NAS 的硬件基础知识',
                desc: 'NAS 硬件基础知识',
                cover: 'https://example.com/nas.jpg',
              },
              subResults: [],
              url: '/zh/article/my-custom-nas',
            },
            {
              id: 'article-zh-body-match',
              excerpt: '这里解释了如何写好需求文档',
              meta: {
                slug: 'body-match',
                title: '另一个标题',
                desc: '正文命中',
                cover: 'https://example.com/body.jpg',
              },
              subResults: [],
              url: '/zh/article/body-match',
            },
          ],
        }
      },
    }

    const result = await searchContents('需求文档', {
      client,
      folder: ContentFolder.Article,
      locale: 'zh',
    })

    expect(result.map((item) => item.slug)).toEqual(['body-match'])
  })

  test('maps Pagefind metadata to search cache items', async () => {
    mockedGetMetaCache.mockResolvedValueOnce([])

    const client = {
      async search() {
        return {
          total: 1,
          items: [
            {
              id: 'article-zh-demo',
              meta: {
                slug: 'demo',
                title: 'Demo title',
                desc: 'Demo description',
                cover: 'https://example.com/cover.jpg',
              },
              subResults: [],
              url: '/zh/article/demo',
            },
          ],
        }
      },
    }

    const result = await searchContents('demo', {
      client,
      folder: ContentFolder.Article,
      locale: 'zh',
    })

    expect(result).toEqual([
      {
        slug: 'demo',
        title: 'Demo title',
        desc: 'Demo description',
        cover: 'https://example.com/cover.jpg',
      },
    ])
  })
})
