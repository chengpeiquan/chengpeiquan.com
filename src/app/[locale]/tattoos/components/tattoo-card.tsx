'use server'

import { Card, CardContent, CardHeader, CardTitle } from 'blackwork'
import Image from 'next/image'
import React from 'react'
import {
  type PropsWithThumbHashMapping,
  decodeThumbHash,
  getThumbHashCacheMapKey,
} from '@/config/cache-config'
import { ContentFolder } from '@/config/content-config'
import {
  type PropsWithDevice,
  type PropsWithLocale,
} from '@/config/route-config'
import { type TattooStory, tattooIntroSlugPrefix } from '@/config/tattoo-config'
import { getDetails } from '@/core/dispatcher'

interface TattooCardProps
  extends PropsWithLocale,
    PropsWithDevice,
    PropsWithThumbHashMapping {
  index: number
  story: TattooStory
}

export const TattooCard = async ({
  index,
  locale,
  story,
  thumbHashMapping,
}: TattooCardProps) => {
  const metadata = story.metadata[locale]
  const title = metadata?.title

  const res = await getDetails(ContentFolder.Fragment, {
    slug: `${tattooIntroSlugPrefix}${index + 1}`,
    locale,
  })

  const introduction = res?.jsxElement

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <CardTitle className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-0">
            <i className="text-primary mr-6 font-mono text-2xl font-bold sm:text-4xl">
              Vol.
              <i className="text-4xl sm:text-7xl">{index + 1}</i>
            </i>

            {title && <span className="text-3xl sm:mb-1">{title}</span>}
          </CardTitle>

          <time className="text-muted-foreground font-mono text-sm">
            {story.date}
          </time>
        </div>

        {introduction && (
          <div className="prose prose-neutral dark:prose-invert prose-p:last:mb-0 text-muted-foreground text-base">
            {introduction}
          </div>
        )}
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-4 px-4 pb-4 pt-0 sm:grid-cols-2 sm:px-6 sm:pb-6 lg:grid-cols-3">
        {story.images.map((image, i) => {
          const thumbHashKey = getThumbHashCacheMapKey(image)
          const thumbHash = thumbHashMapping[thumbHashKey]
          const blurDataURL = decodeThumbHash(thumbHash)

          return (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={image}
                alt={`${title || ''} - ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 33vw, 300px"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
