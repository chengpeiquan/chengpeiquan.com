import { isObject } from '@bassist/utils'
import {
  type ContentItem,
  type ContentMetadata,
  type ListFolder,
} from './content-config'
import { type Locale } from './locale-config'
import { siteConfig } from './site-config'

export const cacheRootFolder = 'cache'

export enum CacheFolder {
  MetaCache = 'meta-cache', // Markdown metadata
}

export type MetaCacheMapKey = `${ListFolder}-${Locale}`

export const getMetaCacheMapKey = (
  folder: ListFolder,
  locale: Locale,
): MetaCacheMapKey => {
  return `${folder}-${locale}`
}

export type MetaCacheItem = Pick<ContentItem, 'slug' | 'metadata'>

// The data sources for local searches all come from meta cache
export type SearchCacheItem = Pick<MetaCacheItem, 'slug'> &
  Pick<ContentMetadata, 'title' | 'cover' | 'desc'>

export const isSearchCacheItem = (v: unknown): v is SearchCacheItem => {
  return isObject(v) && !!v.slug
}

// Distinguish different search record tables
export const getSearchStorageKey = (folder: ListFolder, locale: Locale) => {
  return `recent-${getMetaCacheMapKey(folder, locale)}`
}

export const searchStorageConfig = {
  name: siteConfig.domain,
  storeName: 'search-data',
  limit: 50, // Maximum number of cached records
}
