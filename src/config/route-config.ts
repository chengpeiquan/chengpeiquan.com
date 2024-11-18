import { type Locale } from './locale-config'

export interface LocalePageParams {
  locale: Locale
}

// Details with fixed slug
export interface SinglePageProps {
  params: Promise<LocalePageParams>
}

export interface DetailsPageParams extends LocalePageParams {
  slug: string
}

// Details with dynamic slug
export interface DetailsPageProps {
  params: Promise<DetailsPageParams>
}

export interface ListPageParams extends LocalePageParams {
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
