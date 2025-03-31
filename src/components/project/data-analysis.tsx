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
        'text-muted-foreground flex shrink-0 items-center gap-1 text-sm',
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
