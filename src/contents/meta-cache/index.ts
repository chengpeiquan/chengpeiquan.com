import { type Locale } from '@/config/locale-config'
import { type ListFolder, type MetaCacheItem } from '@/config/content-config'
import article_en from './article-en.json'
import article_zh from './article-zh.json'
import cookbook_zh from './cookbook-zh.json'

type MetaCacheMapKey = `${ListFolder}_${Locale}`

export const metaCacheMap = new Map<MetaCacheMapKey, MetaCacheItem[]>([
  ['article_en', article_en as MetaCacheItem[]],
  ['article_zh', article_zh as MetaCacheItem[]],
  ['cookbook_zh', cookbook_zh as MetaCacheItem[]],
])
