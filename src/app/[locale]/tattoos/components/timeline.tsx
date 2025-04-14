'use server'

import React from 'react'
import { type PropsWithThumbHashMapping } from '@/config/cache-config'
import {
  type PropsWithDevice,
  type PropsWithLocale,
} from '@/config/route-config'
import { tattooStories } from '@/config/tattoo-config'
import { cn } from '@/utils'
import { TattooCard } from './tattoo-card'

const TimelineStroke: React.FC = () => (
  <div className="absolute left-2.5 top-0 h-full w-[2px] sm:left-4">
    {/* Top line segment: Gradient disappears */}
    <div className="to-border h-10 w-full bg-gradient-to-b from-transparent" />

    {/* Main line segment: solid */}
    <div className="bg-border h-[calc(100%-5rem)] w-full" />

    {/* Bottom line segment: Gradient disappears */}
    <div className="to-border h-10 w-full bg-gradient-to-t from-transparent" />
  </div>
)

const TimelineDot: React.FC = () => (
  <div className="bg-background absolute left-[-42px] flex size-6 items-center justify-center rounded-full border-2 sm:left-[-50px] sm:size-9">
    <div className="bg-primary size-2 rounded-full sm:size-3" />
  </div>
)

type TimelineProps = PropsWithLocale &
  PropsWithDevice &
  PropsWithThumbHashMapping

export const Timeline = async ({
  locale,
  isMobile,
  thumbHashMapping,
}: TimelineProps) => {
  return (
    <div className={cn('relative mx-auto w-full max-w-7xl space-y-8 py-8')}>
      <TimelineStroke />

      {tattooStories.map((story, index) => (
        <div key={story.date} className="relative ml-10 sm:ml-12">
          <TimelineDot />

          <TattooCard
            index={index}
            locale={locale}
            story={story}
            isMobile={isMobile}
            thumbHashMapping={thumbHashMapping}
          />
        </div>
      ))}
    </div>
  )
}
