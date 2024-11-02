import FlexSearch from 'flexsearch'
import {
  type CacheMapKey,
  type ContentCacheItem,
  getCacheMapKey,
} from '@/config/cache-config'
import { type Locale } from '@/config/locale-config'
import { type ListFolder } from '@/config/content-config'
// import { getContentCache } from '@/cache/content-cache'

interface SearchDocumentItem extends Omit<ContentCacheItem, 'slug'> {
  id: FlexSearch.Id
}

const initializeEngine = async (data: ContentCacheItem[]) => {
  const engine = new FlexSearch.Document<SearchDocumentItem, string[]>({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: 'content',
      store: ['title', 'cover', 'desc'],
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true,
    },
  })

  await Promise.all(
    data.map(({ slug, ...rest }) =>
      engine.addAsync(slug, { id: slug, ...rest }),
    ),
  )

  return engine
}

export type SearchEngine = Awaited<ReturnType<typeof initializeEngine>>

const searchEngineMap = new Map<CacheMapKey, SearchEngine>()

export const getSearchEngine = async (folder: ListFolder, locale: Locale) => {
  const args: [ListFolder, Locale] = [folder, locale]
  const key = getCacheMapKey(...args)

  // Create engines on demand and only need to be initialized once
  const engine = searchEngineMap.get(key)
  if (engine) return engine

  // const data = await getContentCache(...args)
  const res = await fetch(`/search-data/${key}.json`)
  const data = await res.json()
  const instance = await initializeEngine(data)
  searchEngineMap.set(key, instance)

  return instance
}
