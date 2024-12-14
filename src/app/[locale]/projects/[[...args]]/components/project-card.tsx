import React from 'react'
import { getTranslations } from 'next-intl/server'
import {
  Badge,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ExternalLink,
  Paragraph,
} from 'blackwork'
import {
  Download,
  Fork,
  Github,
  Home,
  type IconProps,
  Npm,
  Star,
} from 'blackwork/icons'
import { type PropsWithLocale } from '@/config/route-config'
import {
  type ProjectConfigItem,
  ProjectTag,
  getNpmUrl,
  getRepoUrl,
  projectTagNameMapping,
} from '@/config/project-config'
import { cn } from '@/utils'
import { type GitHubRepoDataItem } from '@/fetcher'
import { LinkIconButton } from '@/components/shared/link-icon-button'

const getNumberDisplay = (value: number) => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}k`
  }

  return value.toString()
}

interface DataRenderProps {
  icon: React.FC<IconProps>
  value: number | undefined
  className?: string
  iconClassName?: string
}

const DataRender: React.FC<DataRenderProps> = ({
  icon: Icon,
  value = 0,
  className,
  iconClassName,
}) => {
  const num = getNumberDisplay(value)

  if (value <= 0) return null
  return (
    <div
      className={cn(
        'flex items-center gap-1 shrink-0 text-muted-foreground text-sm',
        className,
      )}
    >
      <Icon className={cn('size-4', iconClassName)} />
      <span title={num}>{num}</span>
    </div>
  )
}

// Record<keyof GitHubRepoDataItem, Icon>
export const dataRenderConfig = {
  stars: Star,
  forks: Fork,
  downloads: Download,
} as const

interface DataAnalysisProps {
  data: Partial<GitHubRepoDataItem> | undefined
  className?: string
  iconClassName?: string
  valueClassName?: string
}

export const DataAnalysis: React.FC<DataAnalysisProps> = ({
  data,
  className,
  iconClassName,
  valueClassName,
}) => {
  if (!data) return null
  return (
    <div
      className={cn(
        'flex flex-1 gap-3 items-center overflow-hidden',
        className,
      )}
    >
      {Object.keys(dataRenderConfig).map((key) => {
        const k = key as keyof typeof dataRenderConfig
        return (
          <DataRender
            key={key}
            icon={dataRenderConfig[k]}
            value={data[k]}
            className={valueClassName}
            iconClassName={iconClassName}
          />
        )
      })}
    </div>
  )
}

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
  data: GitHubRepoDataItem | undefined
}

interface ProjectCardProps extends PropsWithLocale {
  item: ProjectCardItem
}

export const ProjectCard = async ({ locale, item }: ProjectCardProps) => {
  const { name, metadata, homepage: fallbackHomepage, tags, npm, data } = item
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

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="gap-2">
        <CardTitle className="truncate">
          <ExternalLink href={homepage || repoUrl}>{name}</ExternalLink>
        </CardTitle>

        <CardDescription>
          <Paragraph
            className={cn(
              'text-muted-foreground text-sm',
              locale === 'zh'
                ? 'line-clamp-3 h-[60px]'
                : 'line-clamp-5 h-[100px]',
            )}
          >
            {description}
          </Paragraph>
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-end gap-3 py-3">
        <Tags locale={locale} tags={tags} />

        <DataAnalysis data={data} />

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
