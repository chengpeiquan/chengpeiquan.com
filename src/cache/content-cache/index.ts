import { type ListFolder } from '@/config/content-config'
import { type Locale } from '@/config/locale-config'
import { type CacheMapKey, type ContentCacheItem } from '@/config/cache-config'
import article_en from './article-en.json'
import article_zh from './article-zh.json'
import cookbook_zh from './cookbook-zh.json'

const contentCacheMap = new Map<CacheMapKey, ContentCacheItem[]>([
  ['article_en', article_en as ContentCacheItem[]],
  ['article_zh', article_zh as ContentCacheItem[]],
  ['cookbook_zh', cookbook_zh as ContentCacheItem[]],
])

export const getContentCache = (
  folder: ListFolder,
  locale: Locale,
): ContentCacheItem[] => {
  const cache = contentCacheMap.get(`${folder}_${locale}`)
  return cache || []
}
