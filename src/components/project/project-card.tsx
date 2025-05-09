import {
  Badge,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'blackwork'
import { Github, Home, Npm } from 'blackwork/icons'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { LinkIconButton } from '@/components/shared/link-icon-button'
import { LocaleIs } from '@/config/locale-config'
import {
  type ProjectConfigItem,
  ProjectTag,
  allProjects,
  getNpmUrl,
  getRepoUrl,
  projectTagNameMapping,
} from '@/config/project-config'
import { type PropsWithLocale } from '@/config/route-config'
import { ExternalLink } from '@/navigation'
import { cn } from '@/utils'
import { DataAnalysis } from './data-analysis'
import { type ProjectAnalysisData } from './shared'

type TagsProps = PropsWithLocale & Pick<ProjectConfigItem, 'tags'>

const Tags: React.FC<TagsProps> = ({ locale, tags }) => {
  const mapping = projectTagNameMapping[locale]
  return (
    <div className="flex items-center gap-1">
      {tags.map((i) => {
        const name = mapping[i]
        if (!name) return null

        const isEOL = i === ProjectTag.EOL
        return (
          <Badge
            key={name}
            variant={isEOL ? 'outline' : 'secondary'}
            className={cn('shrink-0 select-none', { 'opacity-50': isEOL })}
          >
            {name}
          </Badge>
        )
      })}
    </div>
  )
}

export type ProjectCardItem = ProjectConfigItem & {
  data: ProjectAnalysisData | undefined
}

interface ProjectCardProps extends PropsWithLocale {
  item: ProjectCardItem
}

export const ProjectCard = async ({ locale, item }: ProjectCardProps) => {
  const {
    name,
    metadata,
    homepage: fallbackHomepage,
    tags,
    alternative,
    npm,
    data,
  } = item
  const { description, homepage: localHomepage } = metadata[locale]
  const homepage = localHomepage || fallbackHomepage
  const repoUrl = getRepoUrl(item)
  const npmUrl = getNpmUrl(item)

  const t = await getTranslations({
    locale,
    namespace: 'projectConfig',
  })

  const ta = await getTranslations({
    locale,
    namespace: 'action',
  })

  const descriptionDisplay = (() => {
    const alternativeProject = tags.some((i) => i === ProjectTag.EOL)
      ? allProjects.find((i) => i.name === alternative)
      : undefined

    if (alternativeProject) {
      return t.rich('alternative', {
        name: () => (
          <ExternalLink href={getRepoUrl(alternativeProject)}>
            {alternativeProject.name}
          </ExternalLink>
        ),
      })
    }

    return description
  })()

  return (
    <Card className="flex w-full flex-col">
      <CardHeader className="gap-2">
        <CardTitle className="truncate">
          <ExternalLink className="leading-[1.2]" href={homepage || repoUrl}>
            {name}
          </ExternalLink>
        </CardTitle>

        <DataAnalysis data={data} />

        <CardDescription
          className={cn(
            'text-muted-foreground text-sm',
            LocaleIs.isZH(locale)
              ? 'line-clamp-3 h-[60px]'
              : 'line-clamp-5 h-[100px]',
          )}
        >
          {descriptionDisplay}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center justify-between gap-3 p-6 py-3">
        <Tags locale={locale} tags={tags} />

        <div className="flex items-center gap-3">
          {npm && (
            <LinkIconButton
              ariaLabel={ta('newTab', {
                label: ` ${name} ${t('button.homepage')}`,
              })}
              href={npmUrl}
              title={t('button.repo')}
              icon={Npm}
            />
          )}

          <LinkIconButton
            ariaLabel={ta('newTab', {
              label: ` ${name} ${t('button.homepage')}`,
            })}
            href={repoUrl}
            title={t('button.repo')}
            icon={Github}
          />

          {homepage && (
            <LinkIconButton
              ariaLabel={ta('newTab', {
                label: ` ${name} ${t('button.repo')}`,
              })}
              href={homepage}
              title={t('button.homepage')}
              icon={Home}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
