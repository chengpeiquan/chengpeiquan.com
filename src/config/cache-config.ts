import { isObject } from '@bassist/utils'
import {
  type ContentItem,
  type ContentMetadata,
  type ListFolder,
} from './content-config'
import { type Locale } from './locale-config'

export const cacheRootFolder = 'cache'

export const metaCacheRootFolder = 'meta-cache'

export const contentCacheRootFolder = 'content-cache'

export type CacheMapKey = `${ListFolder}_${Locale}`

export type MetaCacheItem = Pick<ContentItem, 'slug' | 'metadata'>

export interface ContentCacheItem
  extends Pick<ContentItem, 'slug'>,
    Pick<ContentMetadata, 'title' | 'cover' | 'desc'> {
  content: string
}

export const isContentCacheItem = (v: unknown): v is ContentCacheItem => {
  return isObject(v) && !!v.slug
}

export type CacheType = 'meta' | 'content'
