import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Heading, LayoutMain, Paragraph } from 'blackwork'
import { isArray, toArray } from '@bassist/utils'
import { apis } from '@/fetcher'
import { type ListPageProps } from '@/config/route-config'
import { ExtraTag, type ProjectTag } from '@/config/project-config'
import { ProjectList } from './components/project-list'
import { DataAnalysis } from './components/project-card'

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

  const data = await apis.gh.repos()

  const sum = toArray(data).reduce(
    (acc, i) => {
      acc.stars += i.stars ?? 0
      acc.forks += i.forks ?? 0
      acc.downloads += i.downloads ?? 0
      return acc
    },
    { stars: 0, forks: 0, downloads: 0 },
  )

  return (
    <LayoutMain className="gap-12">
      <div className="flex flex-col items-center w-full">
        <Heading className="text-6xl">{t('title')}</Heading>

        <Paragraph className="text-xl text-muted-foreground">
          {t('description')}
        </Paragraph>

        <DataAnalysis
          data={sum}
          className="mt-6"
          valueClassName="text-base"
          iconClassName="size-4"
        />
      </div>

      <ProjectList locale={locale} tag={tag} data={data} />
    </LayoutMain>
  )
}
