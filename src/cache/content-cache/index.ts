import { type ListFolder } from '@/config/content-config'
import { type Locale } from '@/config/locale-config'
import { type ContentCacheItem, getCacheMapKey } from '@/config/cache-config'

export const getContentCache = async (
  folder: ListFolder,
  locale: Locale,
): Promise<ContentCacheItem[]> => {
  try {
    const key = getCacheMapKey(folder, locale)
    return (await import(`./${key}.json`)).default || []
  } catch (e) {
    console.error('[getContentCache]', e)
    return []
  }
}
