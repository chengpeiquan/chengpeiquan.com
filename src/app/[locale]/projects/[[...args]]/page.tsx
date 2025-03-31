import { isArray, toArray } from '@bassist/utils'
import { Heading, LayoutMain, Paragraph } from 'blackwork'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { DataAnalysis } from '@/components/project/data-analysis'
import { fetchProjectDatabase } from '@/components/project/shared'
import { isMobileDevice } from '@/config/middleware-config'
import { ExtraTag, type ProjectTag } from '@/config/project-config'
import { type ListPageProps } from '@/config/route-config'
import { type GitHubRepoDataItem, type NpmDownloadDataItem } from '@/fetcher'
import { cn } from '@/utils'
import { DataDescription } from './components/data-description'
import { ProjectList } from './components/project-list'

export const generateMetadata = async ({
  params: promiseParams,
}: ListPageProps) => {
  const params = await promiseParams

  const t = await getTranslations({
    locale: params.locale,
    namespace: 'projectConfig',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function ProjectsPage({
  params: promiseParams,
}: ListPageProps) {
  const { locale, args } = await promiseParams
  const tag = isArray(args) ? (args[0] as ProjectTag) : ExtraTag.All

  const t = await getTranslations({
    locale,
    namespace: 'projectConfig',
  })

  const data = await fetchProjectDatabase()

  const sum = [...toArray(data.gh), ...toArray(data.npm)].reduce(
    (acc, i) => {
      const gh = i as GitHubRepoDataItem
      const npm = i as NpmDownloadDataItem
      acc.stars += gh.stars ?? 0
      acc.forks += gh.forks ?? 0
      acc.downloads += npm.downloads ?? 0
      return acc
    },
    { stars: 0, forks: 0, downloads: 0 },
  )

  const isMobile = await isMobileDevice()

  return (
    <LayoutMain className="gap-12">
      <div className="flex w-full flex-col items-center">
        <Heading
          className={cn('text-center text-6xl', {
            'my-8': isMobile,
          })}
        >
          {t('title')}
        </Heading>

        <Paragraph className="text-muted-foreground text-xl">
          {t('description')}
        </Paragraph>

        <DataAnalysis
          data={sum}
          className="mt-6"
          valueClassName="text-base"
          iconClassName="size-5"
          extraRender={<DataDescription locale={locale} />}
        />
      </div>

      <ProjectList locale={locale} tag={tag} data={data} />
    </LayoutMain>
  )
}
