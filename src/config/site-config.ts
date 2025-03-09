import { isUndefined } from '@bassist/utils'
import { type SocialLinkProps } from 'blackwork'
import {
  About as AboutIcon,
  Article as ArticleIcon,
  Food as FoodIcon,
  Home as HomeIcon,
  type IconProps,
  Toolbox as ToolboxIcon,
} from 'blackwork/icons'
import { type Metadata } from 'next'
import { ContentFolder } from './content-config'
import { type Locale } from './locale-config'

const domain = 'chengpeiquan.com'

const cdnRoot = `https://cdn.${domain}`

const cdnImageParams = 'x-oss-process=image/interlace,1'

enum AvatarSize {
  Small = '60x60',
  Medium = '120x120',
  Large = '300x300',
}

type AvatarConfig = Record<Lowercase<keyof typeof AvatarSize>, string>

const avatar: AvatarConfig = {} as AvatarConfig

Object.entries(AvatarSize).forEach(([k, v]) => {
  const key = k.toLowerCase() as keyof AvatarConfig
  avatar[key] = `${cdnRoot}/img/avatar-${v}.jpg?${cdnImageParams}`
})

const author: Readonly<Metadata['authors']> = {
  name: 'chengpeiquan',
  url: `https://${domain}`,
}

const email = `chengpeiquan@${domain}`

const navSlugs = [
  'home',
  'projects',
  ContentFolder.Article,
  ContentFolder.Cookbook,
  ContentFolder.About,
] as const

export type NavSlug = (typeof siteConfig.navSlugs)[number]

export const navIconMap: Record<NavSlug, React.FC<IconProps>> = {
  home: HomeIcon,
  projects: ToolboxIcon,
  article: ArticleIcon,
  cookbook: FoodIcon,
  about: AboutIcon,
}

export const isHome = (slug: NavSlug): slug is 'home' => slug === 'home'

interface ExtraSocialLinkProps extends SocialLinkProps {
  locale?: Locale
}

const socialLinks: ExtraSocialLinkProps[] = [
  { type: 'github', link: 'https://github.com/chengpeiquan' },
  { type: 'zhihu', link: 'https://zhihu.com/people/basss', locale: 'zh' },
  { type: 'x', link: 'https://x.com/chengpeiquan', locale: 'en' },
  { type: 'rss', link: `https://${domain}/feed.xml` },
]

const feedbackLink = `https://github.com/chengpeiquan/chengpeiquan.com/issues/new`

const webAnalytics = {
  baidu: '8dca8e2532df48ea7f1b15c714588691',
  google: 'G-QCV00FZWMR',
} as const

export const siteConfig = {
  domain,
  email,
  author,
  avatar,
  navSlugs,
  socialLinks,
  feedbackLink,
  webAnalytics,
} as const

export const getLocaleSocialLinks = (locale: Locale) => {
  return siteConfig.socialLinks.filter(
    (i) => isUndefined(i.locale) || i.locale === locale,
  )
}

export const sharedMetadata: Metadata = {
  creator: siteConfig.author.name,
  authors: siteConfig.author,
}
