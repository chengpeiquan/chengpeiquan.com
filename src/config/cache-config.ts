import { type ContentItem, type ListFolder } from './content-config'
import { type Locale } from './locale-config'

export const cacheRootFolder = 'cache'

export const metaCacheRootFolder = 'meta-cache'

export type MetaCacheMapKey = `${ListFolder}_${Locale}`

export type MetaCacheItem = Pick<ContentItem, 'slug' | 'metadata'>
