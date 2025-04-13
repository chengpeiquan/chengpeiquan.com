import { shuffle } from '@bassist/utils'
import { Heading, LayoutMain, Paragraph } from 'blackwork'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import {
  type PropsWithThumbHashMapping,
  decodeThumbHash,
  getThumbHashCacheMapKey,
} from '@/config/cache-config'
import {
  type PropsWithDevice,
  type PropsWithLocale,
} from '@/config/route-config'
import { tattooImages } from '@/config/tattoo-config'
import { cn } from '@/utils'

type HeroProps = PropsWithLocale & PropsWithDevice & PropsWithThumbHashMapping

export const Hero = async ({
  locale,
  isMobile,
  thumbHashMapping,
}: HeroProps) => {
  const t = await getTranslations({
    locale,
    namespace: 'tattooConfig',
  })

  const images = shuffle(tattooImages).slice(0, 20)

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        isMobile ? 'h-[40vh]' : 'h-[70vh]',
      )}
    >
      {/* Gradient Mask */}
      <div className="from-background/30 via-background/80 to-background absolute inset-0 z-[1] bg-gradient-to-b"></div>

      {/* Image Gallery  */}
      <div className="grid size-full grid-cols-4 gap-2 lg:grid-cols-5">
        {images.map((image) => {
          const thumbHashKey = getThumbHashCacheMapKey(image)
          const thumbHash = thumbHashMapping[thumbHashKey]
          const blurDataURL = decodeThumbHash(thumbHash)

          return (
            <div
              key={image}
              className="group relative size-full overflow-hidden"
            >
              <Image
                src={image}
                alt={t('imageAlt')}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-700 group-hover:scale-110"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />

              <div className="bg-background/20 absolute inset-0"></div>
            </div>
          )
        })}
      </div>

      {/* Hero Content */}
      <div className="absolute inset-x-0 bottom-0 z-[2] px-4 py-12">
        <LayoutMain>
          <Heading className="text-foreground text-balance text-center font-mono text-4xl font-bold md:text-5xl lg:text-6xl">
            {t('title')}
          </Heading>
          <Paragraph className="text-muted-foreground mt-4 text-balance text-center font-mono text-base md:text-lg lg:text-xl">
            {t('description')}
          </Paragraph>
        </LayoutMain>
      </div>
    </div>
  )
}
