import { isObject, isString, toArray } from '@bassist/utils'
import { Avatar, AvatarFallback, AvatarImage, Badge, Heading } from 'blackwork'
import { MiniGitHub } from 'blackwork/icons'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { MusicPlayer } from '@/components/music-player'
import {
  type ContentItem,
  type ContentMetadata,
  categoryMapping,
} from '@/config/content-config'
import { isMobileDevice } from '@/config/middleware-config'
import {
  type PropsWithDevice,
  type PropsWithLocale,
} from '@/config/route-config'
import { siteConfig } from '@/config/site-config'
import { ExternalLink, Link } from '@/navigation'
import { LegacyTips } from './legacy-tips'

interface StarOnGitHubProps extends PropsWithLocale {
  repo: ContentMetadata['repo']
}

const StarOnGitHub = async ({ locale, repo }: StarOnGitHubProps) => {
  const t = await getTranslations({
    locale,
    namespace: 'basicConfig',
  })

  const label = t('starOnGitHub.label')
  const title = t('starOnGitHub.title')

  if (!isString(repo)) return null
  return (
    <ExternalLink
      title={title}
      aria-label={title}
      href={repo!}
      className="flex items-center text-sm"
      variant="secondary"
      underline={false}
    >
      <MiniGitHub />
      <span className="ml-1">{label}</span>
    </ExternalLink>
  )
}

interface AuthorDataProps extends StarOnGitHubProps, PropsWithDevice {
  author: string
  date: ContentMetadata['date']
}

const AuthorData = async ({
  locale,
  isMobile,
  author,
  date,
  repo,
}: AuthorDataProps) => {
  const starVisible = !isMobile && repo?.startsWith('http')

  return (
    <div className="not-prose my-6 flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="size-10">
          <AvatarImage src={siteConfig.avatar.small} alt={author} />
          <AvatarFallback>{author.slice(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="text-muted-foreground flex flex-col">
          <span aria-label={author} className="text-sm">
            {author}
          </span>

          {!!date && (
            <span aria-label={date} className="text-xs">
              {date}
            </span>
          )}
        </div>
      </div>

      {starVisible && <StarOnGitHub locale={locale} repo={repo} />}
    </div>
  )
}

interface MarkupRendererProps
  extends PropsWithLocale,
    Pick<ContentItem, 'metadata' | 'jsxElement'> {
  toc?: React.ReactNode
}

export const MarkupRenderer = async ({
  metadata,
  toc,
  jsxElement,
  locale,
}: MarkupRendererProps) => {
  const isMobile = await isMobileDevice()

  const t = await getTranslations({
    locale,
    namespace: 'siteConfig',
  })

  const categories = toArray(
    metadata.categories?.map((slug) => categoryMapping[slug]),
  ).filter(Boolean)

  return (
    <article className="prose prose-neutral dark:prose-invert flex flex-1 flex-col overflow-hidden">
      <Heading level={1} className="mb-0 break-all text-2xl sm:text-3xl">
        {metadata.title}
      </Heading>

      {categories.length > 0 && (
        <div className="my-4 flex flex-wrap gap-2">
          {categories.map((i) => (
            <Badge variant="outline" key={i.slug}>
              <Link
                className="no-underline"
                href={`/${i.group}/${i.slug}/1`}
                variant="secondary"
              >
                {i.label[locale]}
              </Link>
            </Badge>
          ))}
        </div>
      )}

      <AuthorData
        locale={locale}
        isMobile={isMobile}
        author={t('name')}
        date={metadata.date}
        repo={metadata.repo}
      />

      {metadata.maybeLegacy && (
        <LegacyTips locale={locale} timestamp={metadata.timestamp} />
      )}

      {toc}

      {jsxElement}

      {isObject(metadata.bgm) && (
        <MusicPlayer isMobile={isMobile} {...metadata.bgm} />
      )}
    </article>
  )
}
