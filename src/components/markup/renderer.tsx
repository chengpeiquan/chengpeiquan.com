import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Heading, Paragraph } from 'blackwork'
import { MiniGitHub } from 'blackwork/icons'
import { isString } from '@bassist/utils'
import { type ContentItem, type ContentMetadata } from '@/config/content-config'
import {
  type PropsWithDevice,
  type PropsWithLocale,
} from '@/config/route-config'
import { isMobileDevice } from '@/config/middleware-config'
import { Link } from '@/navigation'
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
    <Link
      title={title}
      aria-label={title}
      href={repo!}
      className="flex items-center text-sm no-underline font-normal transition-colors hover:text-foreground text-gray-400 dark:text-gray-500"
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      <MiniGitHub />
      <span className="ml-1">{label}</span>
    </Link>
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
    <div className="flex items-center justify-between w-full my-4">
      <Paragraph className="text-sm text-gray-400 dark:text-gray-500 m-0">
        <span aria-label={author}>{author}</span>

        {!!date && (
          <span className="ml-6" aria-label={date}>
            {date}
          </span>
        )}
      </Paragraph>

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
      <Heading level={1} className="mb-0 text-2xl sm:text-3xl">
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
    </article>
  )
}
