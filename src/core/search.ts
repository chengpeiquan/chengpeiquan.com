import FlexSearch from 'flexsearch'
import { getMetaCache } from '@/cache/meta-cache'
import {
  type MetaCacheItem,
  type MetaCacheMapKey,
  type SearchCacheItem,
  getMetaCacheMapKey,
} from '@/config/cache-config'
import { type ListFolder } from '@/config/content-config'
import { type Locale } from '@/config/locale-config'

interface SearchDocumentItem extends Omit<SearchCacheItem, 'slug'> {
  id: FlexSearch.Id
}

const initializeEngine = async (data: MetaCacheItem[]) => {
  const engine = new FlexSearch.Document<SearchDocumentItem, string[]>({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: 'title',
      store: ['title', 'cover', 'desc'],
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true,
    },
  })

  await Promise.all(
    data.map(({ slug, metadata }) => {
      const { title, desc, cover } = metadata
      return engine.addAsync(slug, { id: slug, title, desc, cover })
    }),
  )

  return engine
}

export type SearchEngine = Awaited<ReturnType<typeof initializeEngine>>

const searchEngineMap = new Map<MetaCacheMapKey, SearchEngine>()

export const getSearchEngine = async (folder: ListFolder, locale: Locale) => {
  const args: [ListFolder, Locale] = [folder, locale]
  const key = getMetaCacheMapKey(...args)

  // Create engines on demand and only need to be initialized once
  const engine = searchEngineMap.get(key)
  if (engine) return engine

  const data = await getMetaCache(...args)
  const instance = await initializeEngine(data)
  searchEngineMap.set(key, instance)

  return instance
}
