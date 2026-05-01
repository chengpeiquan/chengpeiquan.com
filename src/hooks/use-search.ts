import { useKeyword } from 'blackwork'
import { useEffect, useMemo, useState } from 'react'
import { type SearchCacheItem } from '@/config/cache-config'
import { searchContents } from '@/core/search'
import { useClientLocale } from './use-client-locale'
import { useClientLocation } from './use-client-location'
import { useRecentSearchData } from './use-recent-search-data'

export interface UseSearchOptions {
  // The Pagefind bundle is loaded only when the search box is opened,
  // saving the overhead of the first rendering.
  enabled: boolean
}

export const useSearch = ({ enabled }: UseSearchOptions) => {
  const { keyword, setKeyword, onKeywordUpdate: onSearch } = useKeyword()
  const { locale } = useClientLocale()
  const { searchFolder } = useClientLocation()
  const { recent, ...restRecent } = useRecentSearchData()

  const [result, setResult] = useState<SearchCacheItem[]>([])

  useEffect(() => {
    return () => {
      setKeyword('')
    }
  }, [enabled, setKeyword])

  useEffect(() => {
    let ignore = false

    if (!keyword || !enabled) {
      setResult(() => [])
      return () => {
        ignore = true
      }
    }

    searchContents(keyword, {
      folder: searchFolder,
      locale,
    })
      .then((searched) => {
        if (!ignore) {
          setResult(() => searched)
        }
      })
      .catch((error: unknown) => {
        console.error(error)
        if (!ignore) {
          setResult(() => [])
        }
      })

    return () => {
      ignore = true
    }
  }, [enabled, keyword, locale, searchFolder])

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
