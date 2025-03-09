import React from 'react'
import { cn } from '@/utils'

interface TimeDisplayProps {
  /**
   * Time obtained from content metadata
   *
   * The `date` return value from `parseDate` method, in
   * `@/core/parser/index.ts`
   */
  value: string

  /**
   * Whether to display only the date
   *
   * @example
   *   1. If `true`: `2024/2/14`
   *   1. If `false`: `2024/2/14 22:56:00`
   *
   * @default true
   */
  dateOnly?: boolean

  className?: string
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
  value = '',
  dateOnly = true,
  className,
}) => {
  const time = dateOnly ? value.split(' ')[0] : value

  const cls = cn('flex justify-between text-xs text-gray-400', className)

  return (
    <p className={cls} title={time}>
      {time}
    </p>
  )
}
