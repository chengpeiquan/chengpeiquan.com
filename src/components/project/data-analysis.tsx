import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'blackwork'
import { Download, Fork, type IconProps, Star } from 'blackwork/icons'
import React from 'react'
import { cn } from '@/utils'
import { type ProjectAnalysisData } from './shared'

// e.g. `1000` -> `1,000`
const withCommasNumber = (val: string | number) => {
  return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0'
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
        'flex shrink-0 items-center gap-1 text-sm text-muted-foreground',
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

// Record<keyof ProjectAnalysisData, Icon>
export const dataRenderConfig = {
  stars: Star,
  forks: Fork,
  downloads: Download,
} as const

const dataRenderOrder = [
  'stars',
  'forks',
  'downloads',
] as const satisfies readonly (keyof typeof dataRenderConfig)[]

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
    <div className={cn('flex items-center gap-6', className)}>
      {dataRenderOrder.map((key) => (
        <DataRender
          key={key}
          icon={dataRenderConfig[key]}
          value={data[key]}
          className={valueClassName}
          iconClassName={iconClassName}
        />
      ))}

      {extraRender}
    </div>
  )
}
