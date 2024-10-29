import {
  // ContentFolder,
  type ListFolder,
} from '@/config/content-config'
import { type Locale } from '@/config/locale-config'
import {
  // type CacheMapKey,
  type ContentCacheItem,
  getCacheMapKey,
} from '@/config/cache-config'
// import article_en from './article-en.json'
// import article_zh from './article-zh.json'
// import cookbook_zh from './cookbook-zh.json'

// const contentCacheMap = new Map<CacheMapKey, ContentCacheItem[]>([
//   [
//     getCacheMapKey(ContentFolder.Article, 'zh'),
//     article_zh as ContentCacheItem[],
//   ],
//   [
//     getCacheMapKey(ContentFolder.Article, 'en'),
//     article_en as ContentCacheItem[],
//   ],
//   [
//     getCacheMapKey(ContentFolder.Cookbook, 'zh'),
//     cookbook_zh as ContentCacheItem[],
//   ],
// ])

// export const getContentCache = (
//   folder: ListFolder,
//   locale: Locale,
// ): ContentCacheItem[] => {
//   const key = getCacheMapKey(folder, locale)
//   const cache = contentCacheMap.get(key)
//   return cache || []
// }

export const getContentCache = async (
  folder: ListFolder,
  locale: Locale,
): Promise<ContentCacheItem[]> => {
  try {
    const key = getCacheMapKey(folder, locale)
    return (await import(`./${key}.json`)).default || []
  } catch (e) {
    return []
  }
}
