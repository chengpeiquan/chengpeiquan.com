import {
  type ListFolder,
  type PageFolder,
  listFolderMapping,
  listFolders,
  pageFolders,
} from './content-config'
import { type Locale } from './locale-config'

export interface PropsWithLocale {
  locale: Locale
}

// Details with fixed slug
export interface SinglePageProps {
  params: Promise<PropsWithLocale>
}

export interface DetailsPageParams extends PropsWithLocale {
  slug: string
}

// Details with dynamic slug
export interface DetailsPageProps {
  params: Promise<DetailsPageParams>
}

export interface ListPageParams extends PropsWithLocale {
  args: string[] // [page] | [slug, page]
}

export interface ListPageProps {
  params: Promise<ListPageParams>
}

export interface PropsWithDevice {
  isMobile?: boolean
}

export interface linkItem {
  href: string
  title: string
}

/**
 * Unified checks for active navigation and redirect targets
 */
export class CheckRoute {
  /**
   * Check whether the required route is met
   */

  static isHomeRoute(slug: string) {
    // Refer to `siteConfig.navSlugs`
    return slug === 'home'
  }

  static isPageRoute(slug: unknown): slug is PageFolder {
    return pageFolders.includes(slug as PageFolder)
  }

  static isListRoute(slug: unknown): slug is ListFolder {
    return listFolders.includes(slug as ListFolder)
  }

  static isProjectRoute(slug: unknown) {
    // Refer to `siteConfig.navSlugs`
    return slug === 'projects'
  }

  /**
   * Check whether the route is active
   */

  static isActiveHome(pathname: string) {
    return pathname === '/'
  }

  static isActivePage(pathname: string, folder: PageFolder) {
    return pathname === `/${folder}`
  }

  static isActiveList(pathname: string, folder: ListFolder) {
    return (
      pathname.startsWith(`/${listFolderMapping[folder]}/`) ||
      pathname.startsWith(`/${folder}/`)
    )
  }

  static isActiveProjects(pathname: string) {
    return pathname.startsWith('/projects')
  }

  static isActiveSinglePage(pathname: string, slug: string) {
    return pathname === `/${slug}`
  }
}
