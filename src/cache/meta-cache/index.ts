import { type MetaCacheItem, getMetaCacheMapKey } from '@/config/cache-config'
import { type ListFolder } from '@/config/content-config'
import { type Locale } from '@/config/locale-config'

export const getMetaCache = async (
  folder: ListFolder,
  locale: Locale,
): Promise<MetaCacheItem[]> => {
  try {
    const key = getMetaCacheMapKey(folder, locale)
    return (await import(`./${key}.json`)).default || []
  } catch (e) {
    console.error('[getMetaCache]', e)
    return []
  }
}
