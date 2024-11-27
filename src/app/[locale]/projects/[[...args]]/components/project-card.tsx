import React from 'react'
import { getTranslations } from 'next-intl/server'
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Paragraph,
} from 'blackwork'
import { Github, Home } from 'blackwork/icons'
import { type PropsWithLocale } from '@/config/route-config'
import {
  type ProjectConfigItem,
  ProjectTag,
  getRepoUrl,
  projectTagNameMapping,
} from '@/config/project-config'
import { cn } from '@/utils'
import { LinkIconButton } from '@/components/shared/link-icon-button'

type TagsProps = PropsWithLocale & Pick<ProjectConfigItem, 'tags'>

const Tags: React.FC<TagsProps> = ({ locale, tags }) => {
  const mapping = projectTagNameMapping[locale]
  return (
    <div className="w-full">
      {tags.map((i) => {
        const name = mapping[i]
        if (!name) return null

        const isEOL = i === ProjectTag.EOL
        return (
          <Badge
            key={name}
            variant={isEOL ? 'outline' : 'secondary'}
            className={cn('select-none', { 'opacity-50': isEOL })}
          >
            {name}
          </Badge>
        )
      })}
    </div>
  )
}

interface ProjectCardProps extends PropsWithLocale {
  item: ProjectConfigItem
}

export const ProjectCard = async ({ locale, item }: ProjectCardProps) => {
  const {
    name,
    metadata,
    repo,
    directory,
    homepage: fallbackHomepage,
    tags,
  } = item

  const { description, homepage: localHomepage } = metadata[locale]

  const homepage = localHomepage || fallbackHomepage

  const t = await getTranslations({
    locale,
    namespace: 'projectConfig',
  })

  const ta = await getTranslations({
    locale,
    namespace: 'action',
  })

  return (
    <Card className="flex flex-col w-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 gap-2 overflow-hidden">
        <Paragraph className="text-muted-foreground text-sm line-clamp-5">
          {description}
        </Paragraph>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Tags locale={locale} tags={tags} />

        <LinkIconButton
          ariaLabel={ta('newTab', {
            label: ` ${name} ${t('button.homepage')}`,
          })}
          href={getRepoUrl(repo, directory)}
          title={t('button.repo')}
          icon={Github}
        />

        {homepage && (
          <LinkIconButton
            ariaLabel={ta('newTab', { label: ` ${name} ${t('button.repo')}` })}
            href={homepage}
            title={t('button.homepage')}
            icon={Home}
          />
        )}
      </CardFooter>
    </Card>
  )
}
