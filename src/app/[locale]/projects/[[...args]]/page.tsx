import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Heading, LayoutMain, Paragraph } from 'blackwork'
import { isArray, toArray } from '@bassist/utils'
import {
  type GitHubRepoDataItem,
  type NpmDownloadDataItem,
  apis,
} from '@/fetcher'
import { type ListPageProps } from '@/config/route-config'
import { ExtraTag, type ProjectTag } from '@/config/project-config'
import { isMobileDevice } from '@/config/middleware-config'
import { ProjectList } from './components/project-list'
import { DataAnalysis } from './components/project-card'
import { DataDescription } from './components/data-description'
import { cn } from '@/utils'

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

  const ghData = await apis.gh.repos()
  const npmData = await apis.npm.packages()

  const sum = [...toArray(ghData), ...toArray(npmData)].reduce(
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
      <div className="flex flex-col items-center w-full">
        <Heading
          className={cn('text-6xl text-center', {
            'my-8': isMobile,
          })}
        >
          {t('title')}
        </Heading>

        <Paragraph className="text-xl text-muted-foreground">
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

      <ProjectList
        locale={locale}
        tag={tag}
        data={{ gh: ghData, npm: npmData }}
      />
    </LayoutMain>
  )
}
