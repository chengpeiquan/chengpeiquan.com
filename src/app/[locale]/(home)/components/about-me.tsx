import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { ContentFolder } from '@/config/content-config'
import {
  type PropsWithDevice,
  type PropsWithLocale,
} from '@/config/route-config'
import { getDetails } from '@/core/dispatcher'
import { cn } from '@/utils'
import { SectionContainer, SectionTitle } from './shared-widgets'

type AboutMeProps = PropsWithLocale & PropsWithDevice

export const AboutMe = async ({ locale, isMobile }: AboutMeProps) => {
  const t = await getTranslations({
    locale,
    namespace: 'homeConfig.aboutMe',
  })

  const res = await getDetails(ContentFolder.Fragment, {
    slug: 'about-me',
    locale,
  })

  if (!res) return null

  const content = res.jsxElement

  return (
    <SectionContainer>
      <SectionTitle title={t('title')} description={t('description')} />

      <div className="mx-auto grid max-w-screen-lg grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <div className="relative mx-auto flex aspect-square w-80 max-w-full overflow-hidden rounded-full sm:w-[400px]">
          <Image
            src="https://cdn.chengpeiquan.com/img/2025/04/202504060001104.jpg?x-oss-process=image/interlace,1"
            alt={t('avatarAlt')}
            fill
          />
        </div>

        <div
          className={cn(
            'prose prose-neutral dark:prose-invert !text-left',
            isMobile ? 'text-sm' : 'text-lg',
            '[&_a]:text-muted-foreground [&_a]:no-underline',
            isMobile ? '[&_a]:text-sm' : '[&_a]:text-base',
          )}
        >
          {content}
        </div>
      </div>
    </SectionContainer>
  )
}
