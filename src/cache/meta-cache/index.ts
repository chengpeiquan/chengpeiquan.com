import { ContentFolder, type ListFolder } from '@/config/content-config'
import { type Locale } from '@/config/locale-config'
import {
  type CacheMapKey,
  type MetaCacheItem,
  getCacheMapKey,
} from '@/config/cache-config'
import article_en from './article-en.json'
import article_zh from './article-zh.json'
import cookbook_zh from './cookbook-zh.json'

const metaCacheMap = new Map<CacheMapKey, MetaCacheItem[]>([
  [getCacheMapKey(ContentFolder.Article, 'zh'), article_zh as MetaCacheItem[]],
  [getCacheMapKey(ContentFolder.Article, 'en'), article_en as MetaCacheItem[]],
  [
    getCacheMapKey(ContentFolder.Cookbook, 'zh'),
    cookbook_zh as MetaCacheItem[],
  ],
])

export const getMetaCache = (
  folder: ListFolder,
  locale: Locale,
): MetaCacheItem[] => {
  const key = getCacheMapKey(folder, locale)
  const cache = metaCacheMap.get(key)
  return cache || []
}
