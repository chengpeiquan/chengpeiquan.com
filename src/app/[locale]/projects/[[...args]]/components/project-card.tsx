import React from 'react'
import { getTranslations } from 'next-intl/server'
import {
  Badge,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
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
import { type GitHubRepoDataItem, type NpmDownloadDataItem } from '@/fetcher'
import { LinkIconButton } from '@/components/shared/link-icon-button'
import { ExternalLink } from '@/navigation'

// e.g. `1000` -> `1,000`
const withCommasNumber = (val: string | number) => {
  return (
    String(val)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0'
  )
}

// e.g. `1000` -> `1k`
const withUnitNumber = (value: number) => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}k`
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
  if (value <= 0) return null
  return (
    <div
      className={cn(
        'flex items-center gap-1 shrink-0 text-muted-foreground text-sm',
        className,
      )}
    >
      <Icon className={cn('size-4', iconClassName)} />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{withUnitNumber(value)}</span>
          </TooltipTrigger>

          <TooltipContent>{withCommasNumber(value)}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export type ProjectAnalysisData = Pick<GitHubRepoDataItem, 'stars' | 'forks'> &
  Pick<NpmDownloadDataItem, 'downloads'>

// Record<keyof ProjectAnalysisData, Icon>
export const dataRenderConfig = {
  stars: Star,
  forks: Fork,
  downloads: Download,
} as const

interface DataAnalysisProps {
  data: ProjectAnalysisData | undefined
  className?: string
  iconClassName?: string
  valueClassName?: string
  extraRender?: React.ReactNode
}

export const DataAnalysis: React.FC<DataAnalysisProps> = ({
  data,
  className,
  iconClassName,
  valueClassName,
  extraRender,
}) => {
  if (!data) return null
  return (
    <div
      className={cn(
        'flex flex-1 gap-6 items-center overflow-hidden',
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

      {extraRender}
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
  data: ProjectAnalysisData | undefined
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
          <ExternalLink className="leading-[1.2]" href={homepage || repoUrl}>
            {name}
          </ExternalLink>
        </CardTitle>

        <DataAnalysis data={data} />

        <CardDescription
          className={cn(
            'text-muted-foreground text-sm',
            locale === 'zh'
              ? 'line-clamp-3 h-[60px]'
              : 'line-clamp-5 h-[100px]',
          )}
        >
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between gap-3 py-3">
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
