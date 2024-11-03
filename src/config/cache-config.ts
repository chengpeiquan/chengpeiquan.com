import { isObject } from '@bassist/utils'
import {
  type ContentItem,
  type ContentMetadata,
  type ListFolder,
} from './content-config'
import { type Locale } from './locale-config'
import { siteConfig } from './site-config'

export const cacheRootFolder = 'cache'

export const metaCacheRootFolder = 'meta-cache'

export type CacheMapKey = `${ListFolder}-${Locale}`

export const getCacheMapKey = (
  folder: ListFolder,
  locale: Locale,
): CacheMapKey => {
  return `${folder}-${locale}`
}

export type MetaCacheItem = Pick<ContentItem, 'slug' | 'metadata'>

export type CacheType = 'meta'

// The data sources for local searches all come from meta cache
export type SearchCacheItem = Pick<MetaCacheItem, 'slug'> &
  Pick<ContentMetadata, 'title' | 'cover' | 'desc'>

export const isSearchCacheItem = (v: unknown): v is SearchCacheItem => {
  return isObject(v) && !!v.slug
}

// Distinguish different search record tables
export const getSearchStorageKey = (folder: ListFolder, locale: Locale) => {
  return `recent-${getCacheMapKey(folder, locale)}`
}

export const searchStorageConfig = {
  name: siteConfig.domain,
  storeName: 'search-data',
  limit: 50, // Maximum number of cached records
}
