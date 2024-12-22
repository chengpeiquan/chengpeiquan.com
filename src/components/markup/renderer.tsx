import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Avatar, AvatarFallback, AvatarImage, Heading } from 'blackwork'
import { MiniGitHub } from 'blackwork/icons'
import { isObject, isString } from '@bassist/utils'
import { type ContentItem, type ContentMetadata } from '@/config/content-config'
import {
  type PropsWithDevice,
  type PropsWithLocale,
} from '@/config/route-config'
import { isMobileDevice } from '@/config/middleware-config'
import { siteConfig } from '@/config/site-config'
import { ExternalLink } from '@/navigation'
import { MusicPlayer } from '@/components/music-player'
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
    <div className="flex items-center justify-between w-full my-6 not-prose">
      <div className="flex gap-2 items-center">
        <Avatar className="w-10 h-10">
          <AvatarImage src={siteConfig.avatar.small} alt={author} />
          <AvatarFallback>{author.slice(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col text-muted-foreground">
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

  return (
    <article className="flex flex-col flex-1 overflow-hidden prose prose-neutral dark:prose-invert">
      <Heading level={1} className="mb-0 text-2xl sm:text-3xl break-all">
        {metadata.title}
      </Heading>

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
