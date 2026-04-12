import { Button, Card, Heading } from 'blackwork'
import Image from 'next/image'
import React from 'react'
import { decodeThumbHash } from '@/config/cache-config'
import { tattooArtist } from '@/config/tattoo-config'
import { ExternalLink } from '@/navigation'

export const Artist: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-md">
      <p className="mb-8 text-center text-base leading-relaxed text-muted-foreground">
        {tattooArtist.introduction}
      </p>

      <Card className="relative mx-auto max-w-xs overflow-hidden rounded-2xl bg-gradient-to-b from-background/80 to-background p-12 sm:max-w-sm">
        <div className="absolute left-0 top-0 h-40 w-full bg-gradient-to-b from-zinc-800/50 to-background/20"></div>

        <div className="flex flex-col items-center justify-center gap-6">
          <div className="relative size-36 overflow-hidden rounded-full ring-4 ring-background ring-offset-2">
            <Image
              src={tattooArtist.avatar}
              alt={tattooArtist.name}
              fill
              placeholder="blur"
              blurDataURL={decodeThumbHash(tattooArtist.avatarThumbHash)}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <Heading level={3} className="text-2xl font-semibold">
              {tattooArtist.name}
            </Heading>

            <p className="text-sm text-muted-foreground">{tattooArtist.job}</p>
          </div>

          <Button className="rounded-full px-8" variant="default">
            <ExternalLink
              href={tattooArtist.xiaohongshuLink}
              className="!text-inherit"
            >
              小红书主页
            </ExternalLink>
          </Button>
        </div>
      </Card>
    </div>
  )
}
