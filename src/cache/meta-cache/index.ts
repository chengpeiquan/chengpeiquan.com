import { type ListFolder } from '@/config/content-config'
import { type Locale } from '@/config/locale-config'
import { type MetaCacheItem, getCacheMapKey } from '@/config/cache-config'

export const getMetaCache = async (
  folder: ListFolder,
  locale: Locale,
): Promise<MetaCacheItem[]> => {
  try {
    const key = getCacheMapKey(folder, locale)
    return (await import(`./${key}.json`)).default || []
  } catch (e) {
    console.error('[getMetaCache]', e)
    return []
  }
}
