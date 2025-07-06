import { isObject } from '@bassist/utils'
import { thumbHashToDataURL } from 'thumbhash'
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
  ThumbHash = 'thumb-hash', // Image placeholder
}

/**
 * Meta cache related
 */

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

/**
 * Thumb hash related
 */

// Supported file name of the thumb hash cache
export type ThumbHashFileName = 'tattoo'

export type ThumbHashMapping = Record<string, string>

export interface PropsWithThumbHashMapping {
  thumbHashMapping: ThumbHashMapping
}

/**
 * Since the CDN domain name and parameters may change, only the stable path
 * part is stored as the cache key
 *
 * @param imageUrl - The image URL from the CDN. e.g.
 *   `https://cdn.chengpeiquan.com/img/2025/04/202504062313535.JPG?x-oss-process=image/interlace,1`
 * @returns The pathname of the image. e.g. `/img/2025/04/202504062313535.JPG`
 */
export const getThumbHashCacheMapKey = (imageUrl: string) => {
  try {
    const url = new URL(imageUrl)
    const pathname = url.pathname // /img/2025/04/202504062313535.JPG
    return pathname
  } catch {
    return ''
  }
}

/**
 * Decode the ThumbHash to a data URL
 *
 * @param hash - The ThumbHash to decode
 * @returns The data URL of the ThumbHash
 */
export const decodeThumbHash = (thumbHash: string) => {
  if (!thumbHash) return ''
  const hash = Buffer.from(thumbHash, 'base64')
  const dataURL = thumbHashToDataURL(hash)
  return dataURL
}
