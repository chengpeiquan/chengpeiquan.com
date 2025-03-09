import { isArray, isObject } from '@bassist/utils'
import { useKeyword } from 'blackwork'
import { type SearchCacheItem, isSearchCacheItem } from '@/config/cache-config'
import { type SearchEngine, getSearchEngine } from '@/core/search'
import { useClientLocale } from './use-client-locale'
import { useClientLocation } from './use-client-location'
import { useRecentSearchData } from './use-recent-search-data'

export interface UseSearchOptions {
  // The search engine is initialized only when the search box is opened,
  // saving the overhead of the first rendering.
  enabled: boolean
}

export const useSearch = ({ enabled }: UseSearchOptions) => {
  const { keyword, setKeyword, onKeywordUpdate: onSearch } = useKeyword()
  const { locale } = useClientLocale()
  const { searchFolder } = useClientLocation()
  const { recent, ...restRecent } = useRecentSearchData()

  const [engine, setEngine] = useState<SearchEngine>()
  const [result, setResult] = useState<SearchCacheItem[]>([])

  useEffect(() => {
    if (enabled) {
      getSearchEngine(searchFolder, locale).then(setEngine)
    }

    return () => {
      setEngine(undefined)
      setKeyword('')
    }
  }, [enabled, locale, searchFolder, setKeyword])

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
          .filter(isSearchCacheItem)
      : []

    setResult(() => searched)
  }, [engine, keyword])

  const noResult = useMemo(
    () => !!keyword && !result.length,
    [keyword, result.length],
  )

  const noRecent = useMemo(
    () => !keyword && !recent.length,
    [keyword, recent.length],
  )

  return {
    keyword,
    result,
    noResult,
    recent,
    ...restRecent,
    noRecent,
    onSearch,
  }
}

export type UseSearchResponse = ReturnType<typeof useSearch>
