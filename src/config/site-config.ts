import { type Metadata } from 'next'
import { type SocialLinkProps } from 'blackwork'
import { type Locale } from './locale-config'
import { isUndefined } from '@bassist/utils'
import {
  AboutIcon,
  ArticleIcon,
  FoodIcon,
  HomeIcon,
  type IconProps,
} from '@/components/shared/icons'

const cdnRoot = 'https://cdn.chengpeiquan.com'

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
  url: 'https://chengpeiquan.com',
}

const navSlugs = ['home', 'article', 'cookbook', 'about'] as const

export type NavSlug = (typeof sideConfig.navSlugs)[number]

export const navIconMap: Record<NavSlug, React.FC<IconProps>> = {
  home: HomeIcon,
  article: ArticleIcon,
  cookbook: FoodIcon,
  about: AboutIcon,
}

interface ExtraSocialLinkProps extends SocialLinkProps {
  locale?: Locale
}

const socialLinks: ExtraSocialLinkProps[] = [
  { type: 'github', link: 'https://github.com/chengpeiquan' },
  { type: 'zhihu', link: 'https://zhihu.com/people/basss', locale: 'zh' },
  { type: 'x', link: 'https://x.com/chengpeiquan', locale: 'en' },
  { type: 'rss', link: 'https://chengpeiquan.com/feed.xml' },
]

const feedbackLink =
  'https://github.com/chengpeiquan/chengpeiquan.com/issues/new'

export const sideConfig = {
  author,
  avatar,
  navSlugs,
  socialLinks,
  feedbackLink,
} as const

export const getLocaleSocialLinks = (locale: Locale) => {
  return sideConfig.socialLinks.filter(
    (i) => isUndefined(i.locale) || i.locale === locale,
  )
}

export const sharedMetadata: Metadata = {
  creator: sideConfig.author.name,
  authors: sideConfig.author,
}
