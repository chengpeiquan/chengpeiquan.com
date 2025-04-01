import { shuffle } from '@bassist/utils'
import { Badge, Card } from 'blackwork'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { ProjectCard } from '@/components/project/project-card'
import {
  enrichProjectsWithStats,
  fetchProjectDatabase,
} from '@/components/project/shared'
import {
  ProjectTag,
  allProjects,
  projectTagNameMapping,
} from '@/config/project-config'
import {
  type PropsWithDevice,
  type PropsWithLocale,
} from '@/config/route-config'
import { Link } from '@/navigation'
import { SectionContainer, SectionTitle } from './shared-widgets'

type OpenSourceProjectsProps = PropsWithLocale & PropsWithDevice

export const OpenSourceProjects = async ({
  locale,
}: OpenSourceProjectsProps) => {
  const t = await getTranslations({
    locale,
    namespace: 'projectConfig',
  })

  const data = await fetchProjectDatabase()

  const items = enrichProjectsWithStats(allProjects, data, 'random')
    .filter((i) => !i.tags.includes(ProjectTag.EOL))
    .slice(0, 11)

  const tagList = shuffle(Object.values(ProjectTag))
    .filter((i) => i !== ProjectTag.EOL)
    .slice(0, 4) as ProjectTag[]

  return (
    <SectionContainer>
      <SectionTitle title={t('title')} description={t('description')} />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6 xl:gap-8">
        {items.map((i) => (
          <ProjectCard key={i.repo + i.name} locale={locale} item={i} />
        ))}

        <Card className="group flex flex-col items-center justify-center">
          <Link
            href="/projects"
            className="group-hover:bg-accent/50 flex size-full flex-col items-center justify-center gap-6"
          >
            <div className="grid grid-cols-2 gap-3">
              {tagList.map((i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="justify-center px-3 py-1.5"
                >
                  {projectTagNameMapping[locale][i]}
                </Badge>
              ))}
            </div>

            <span className="text-muted-foreground text-base font-medium">
              {t('viewAll')}
            </span>
          </Link>
        </Card>
      </div>
    </SectionContainer>
  )
}
