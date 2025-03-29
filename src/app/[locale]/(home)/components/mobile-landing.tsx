import { LayoutMain } from 'blackwork'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { type PropsWithLocale } from '@/config/route-config'

export const MobileLanding = async ({ locale }: PropsWithLocale) => {
  const t = await getTranslations({
    locale,
    namespace: 'homeConfig.hero',
  })

  return (
    <LayoutMain fullscreen>
      <div className="relative flex size-full flex-1 overflow-hidden">
        <Image
          src="https://cdn.chengpeiquan.com/img/2025/03/202503230057187.jpg?x-oss-process=image/interlace,1"
          alt={t('imageTitle')}
          fill
          sizes="100vw"
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
    </LayoutMain>
  )
}
