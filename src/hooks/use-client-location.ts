import { ContentFolder, type ListFolder } from '@/config/content-config'
import { CheckRoute } from '@/config/route-config'
import { usePathname } from '@/navigation'

export const useClientLocation = () => {
  const pathname = usePathname()

  const isCookbook = useMemo(
    () => CheckRoute.isActiveList(pathname, ContentFolder.Cookbook),
    [pathname],
  )

  const searchFolder = useMemo(
    () => (isCookbook ? ContentFolder.Cookbook : ContentFolder.Article),
    [isCookbook],
  )

  return {
    isCookbook,

    // No matter how to declare the type,
    // it will always be considered a `ContentFolder`,
    // so must assert here.
    searchFolder: searchFolder as ListFolder,
  }
}
