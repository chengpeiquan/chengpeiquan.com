import { type Locale } from './locale-config'

export interface LocalePageParams {
  locale: Locale
}

export interface DetailsPageParams extends LocalePageParams {
  slug: string
}

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
