'use server'

import { type ListFolder } from '@/config/content-config'
import { type Locale } from '@/config/locale-config'
import { type MetaCacheItem, type MetaCacheMapKey } from '@/config/cache-config'
import article_en from './article-en.json'
import article_zh from './article-zh.json'
import cookbook_zh from './cookbook-zh.json'

const metaCacheMap = new Map<MetaCacheMapKey, MetaCacheItem[]>([
  ['article_en', article_en as MetaCacheItem[]],
  ['article_zh', article_zh as MetaCacheItem[]],
  ['cookbook_zh', cookbook_zh as MetaCacheItem[]],
])

export const getMetaCache = async (
  folder: ListFolder,
  locale: Locale,
): Promise<MetaCacheItem[]> => {
  const cache = metaCacheMap.get(`${folder}_${locale}`)
  return cache || []
}
