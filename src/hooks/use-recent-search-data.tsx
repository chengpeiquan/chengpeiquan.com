import { isArray, toArray } from '@bassist/utils'
import React from 'react'
import { LocalForageProvider, useLocalForageState } from 'react-forage'
import {
  type SearchCacheItem,
  searchStorageConfig as config,
  getSearchStorageKey,
} from '@/config/cache-config'
import { useClientLocale } from './use-client-locale'
import { useClientLocation } from './use-client-location'

export const RecentSearchDataProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <LocalForageProvider
      config={{
        name: config.name,
        storeName: config.storeName,
      }}
    >
      {children}
    </LocalForageProvider>
  )
}

// When adding data, in order to make that data come first,
// just like removing data, filter out the remaining data first.
const getRestItems = (
  i: SearchCacheItem,
  prev: SearchCacheItem[] | undefined,
) => {
  return isArray(prev) ? prev.filter((j) => j.slug !== i.slug) : []
}

export const useRecentSearchData = () => {
  const { locale } = useClientLocale()
  const { searchFolder } = useClientLocation()

  const storageKey = useMemo(
    () => getSearchStorageKey(searchFolder, locale),
    [locale, searchFolder],
  )

  const [val, set] = useLocalForageState<SearchCacheItem[]>(storageKey)

  const addRecent = (i: SearchCacheItem) => {
    set((prev) => {
      const rest = getRestItems(i, prev)
      const next = [i, ...rest]
      return next.slice(0, config.limit)
    })
  }

  const removeRecent = (i: SearchCacheItem) => {
    set((prev) => getRestItems(i, prev))
  }

  const clearRecent = () => set(undefined)

  const recent = useMemo(() => toArray(val), [val])

  return {
    recent,
    addRecent,
    removeRecent,
    clearRecent,
  }
}
