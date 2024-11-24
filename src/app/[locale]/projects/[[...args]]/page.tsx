import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Heading, LayoutMain, Paragraph } from 'blackwork'
import { type ListPageProps } from '@/config/route-config'
import { isArray } from '@bassist/utils'
import { ExtraTag, type ProjectTag } from '@/config/project-config'
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

  return (
    <LayoutMain className="gap-12">
      <div className="flex flex-col items-center w-full">
        <Heading>{t('title')}</Heading>
        <Paragraph className="text-muted-foreground">
          {t('description')}
        </Paragraph>
      </div>

      <ProjectList locale={locale} tag={tag} />
    </LayoutMain>
  )
}
