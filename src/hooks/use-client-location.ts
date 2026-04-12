import { useMemo } from 'react'
import { ContentFolder, type ListFolder } from '@/config/content-config'
import { CheckRoute } from '@/config/route-config'
import { usePathname } from '@/navigation'

export interface ClientLocation {
  isCookbook: boolean
  searchFolder: ListFolder
}

export const useClientLocation = (): ClientLocation => {
  const pathname = usePathname()

  const isCookbook = useMemo(
    () => CheckRoute.isActiveList(pathname, ContentFolder.Cookbook),
    [pathname],
  )

  const searchFolder = useMemo<ListFolder>(
    () => (isCookbook ? ContentFolder.Cookbook : ContentFolder.Article),
    [isCookbook],
  )

  return {
    isCookbook,
    searchFolder,
  }
}
