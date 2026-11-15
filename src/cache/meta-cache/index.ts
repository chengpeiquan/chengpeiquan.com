import { type MetaCacheItem, getMetaCacheMapKey } from '@/config/cache-config'
import { type ListFolder } from '@/config/content-config'
import { type Locale } from '@/config/locale-config'

export const getMetaCache = async (
  folder: ListFolder,
  locale: Locale,
): Promise<MetaCacheItem[]> => {
  try {
    const key = getMetaCacheMapKey(folder, locale)
    const items: MetaCacheItem[] = (await import(`./${key}.json`)).default ?? []
    // JSON modules are shared across requests. Give callers their own array
    // so in-place operations such as homepage shuffling cannot reorder lists.
    return [...items]
  } catch (e) {
    console.error('[getMetaCache]', e)
    return []
  }
}
