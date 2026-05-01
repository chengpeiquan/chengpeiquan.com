import {
  createSearchClient,
  type SearchClient,
  type SearchClientResultItem,
} from '@blackwork/search/browser'
import { getMetaCache } from '@/cache/meta-cache'
import {
  type MetaCacheItem,
  type SearchCacheItem,
  isSearchCacheItem,
} from '@/config/cache-config'
import { type ListFolder } from '@/config/content-config'
import { type Locale } from '@/config/locale-config'

export interface SearchContentsOptions {
  client?: Pick<SearchClient, 'search'>
  folder: ListFolder
  locale: Locale
  limit?: number
}

const client = createSearchClient()

const getSearchCacheItem = ({ slug, metadata }: MetaCacheItem) => {
  const { title, cover, desc } = metadata
  return {
    slug,
    title,
    cover,
    desc,
  } satisfies SearchCacheItem
}

const getSearchMetaValue = (
  item: SearchClientResultItem,
  key: keyof SearchCacheItem,
) => {
  return item.meta[key] ?? ''
}

const getPagefindExcerpt = (item: SearchClientResultItem) => {
  return (
    item.excerpt ??
    item.subResults.find(({ excerpt }) => !!excerpt)?.excerpt ??
    ''
  )
}

const includesKeyword = (value: string | undefined, keyword: string) => {
  return value?.toLowerCase().includes(keyword) ?? false
}

const getMetaScore = ({ metadata }: MetaCacheItem, keyword: string) => {
  const title = metadata.title.toLowerCase()
  const keywords = metadata.keywords.toLowerCase()
  const desc = metadata.desc.toLowerCase()

  if (title === keyword) return 100
  if (includesKeyword(title, keyword)) return 80
  if (includesKeyword(keywords, keyword)) return 60
  if (includesKeyword(desc, keyword)) return 40

  return 0
}

const searchMetaCache = async (
  keyword: string,
  folder: ListFolder,
  locale: Locale,
) => {
  const data = await getMetaCache(folder, locale)

  return data
    .map((item) => ({
      item: getSearchCacheItem(item),
      score: getMetaScore(item, keyword),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item)
}

const toSearchCacheItem = (
  item: SearchClientResultItem,
): SearchCacheItem | null => {
  const excerpt = getPagefindExcerpt(item)
  const result = {
    slug: getSearchMetaValue(item, 'slug'),
    title: getSearchMetaValue(item, 'title'),
    cover: getSearchMetaValue(item, 'cover'),
    desc: getSearchMetaValue(item, 'desc'),
    ...(excerpt ? { excerpt } : {}),
  }

  return isSearchCacheItem(result) ? result : null
}

const hasCjkText = (value: string) => /[\u3400-\u9FFF]/u.test(value)

const normalizeSearchText = (value: string | undefined) => {
  return value?.toLowerCase().replace(/\s+/gu, '') ?? ''
}

const getPagefindSearchText = (item: SearchClientResultItem) => {
  const subResultText = item.subResults
    .flatMap(({ title, excerpt }) => [title, excerpt])
    .filter(Boolean)
    .join('')

  return normalizeSearchText(
    [item.title, item.excerpt, item.meta.title, item.meta.desc, subResultText]
      .filter(Boolean)
      .join(''),
  )
}

const isPhraseMatchRequired = (keyword: string) => {
  return hasCjkText(keyword) && keyword.length > 1
}

const isExplainablePagefindMatch = (
  item: SearchClientResultItem,
  keyword: string,
) => {
  if (!isPhraseMatchRequired(keyword)) return true
  return getPagefindSearchText(item).includes(normalizeSearchText(keyword))
}

const uniqueSearchResults = (items: SearchCacheItem[]) => {
  const map = new Map<string, SearchCacheItem>()

  items.forEach((item) => {
    if (!map.has(item.slug)) {
      map.set(item.slug, item)
    }
  })

  return [...map.values()]
}

export const searchContents = async (
  keyword: string,
  {
    client: searchClient = client,
    folder,
    locale,
    limit = 10,
  }: SearchContentsOptions,
) => {
  const normalizedKeyword = keyword.trim()
  if (!normalizedKeyword) return []

  const normalizedKeywordLowerCase = normalizedKeyword.toLowerCase()
  const [metaResults, { items }] = await Promise.all([
    searchMetaCache(normalizedKeywordLowerCase, folder, locale),
    searchClient.search(normalizedKeyword, {
      filters: {
        folder,
        locale,
      },
    }),
  ])

  const pagefindResults = items
    .filter((item) => isExplainablePagefindMatch(item, normalizedKeyword))
    .map(toSearchCacheItem)
    .filter((item): item is SearchCacheItem => !!item)

  return uniqueSearchResults([...metaResults, ...pagefindResults]).slice(
    0,
    limit,
  )
}

export const destroySearchClient = () => client.destroy()
