import { type ContentItem, type ListFolder } from './content-config'
import { type Locale } from './locale-config'

export const cacheRootFolder = 'cache'

export const metaCacheRootFolder = 'meta-cache'

export const contentCacheRootFolder = 'content-cache'

export type CacheMapKey = `${ListFolder}_${Locale}`

export type MetaCacheItem = Pick<ContentItem, 'slug' | 'metadata'>

export type ContentCacheItem = Pick<ContentItem, 'slug'> & {
  content: string
}

export type CacheType = 'meta' | 'content'
