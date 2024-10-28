import { type UseKeywordEvent, useKeyword } from 'blackwork'
import { isArray, isObject } from '@bassist/utils'
import {
  type ContentCacheItem,
  isContentCacheItem,
} from '@/config/cache-config'
import { useClientLocale } from './use-client-locale'
import { useClientLocation } from './use-client-location'
import { type SearchEngine, getSearchEngine } from '@/core/search'

export interface UseSearchOptions {
  // The search engine is initialized only when the search box is opened,
  // saving the overhead of the first rendering.
  enabled: boolean
}

export const useSearch = ({ enabled }: UseSearchOptions) => {
  const { keyword, onKeywordUpdate: onSearch } = useKeyword()
  const { locale } = useClientLocale()
  const { searchFolder } = useClientLocation()

  const [engine, setEngine] = useState<SearchEngine>()
  const [result, setResult] = useState<ContentCacheItem[]>([])

  useEffect(() => {
    if (enabled) {
      getSearchEngine(searchFolder, locale).then(setEngine)
    }

    return () => {
      setEngine(undefined)

      // TODO: The next version of blackwork will export keyword settings directly
      onSearch({
        target: {
          value: '',
        },
      } as UseKeywordEvent)
    }
  }, [enabled, locale, onSearch, searchFolder])

  useEffect(() => {
    if (!keyword || !engine) {
      setResult(() => [])
      return
    }

    const res = engine.search(keyword, 10, {
      enrich: true,
      suggest: true,
    })

    const value = res?.[0]?.result
    const searched = isArray(value)
      ? value
          .map(({ id, doc }) => ({
            slug: id as unknown as string,
            ...(isObject(doc) ? doc : {}),
          }))
          .filter(isContentCacheItem)
      : []

    setResult(() => searched)
  }, [engine, keyword])

  const noResult = useMemo(
    () => !!keyword && !result.length,
    [keyword, result.length],
  )

  const recent = useMemo(() => {
    return []
  }, [])

  const noRecent = useMemo(
    () => !keyword && !recent.length,
    [keyword, recent.length],
  )

  return {
    keyword,
    result,
    noResult,
    recent,
    noRecent,
    onSearch,
  }
}

export type UseSearchResponse = ReturnType<typeof useSearch>
