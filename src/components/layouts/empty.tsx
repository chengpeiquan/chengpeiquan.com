import { Paragraph } from 'blackwork'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { isMobileDevice } from '@/config/middleware-config'
import { type PropsWithLocale } from '@/config/route-config'
import { cn } from '@/utils'

export const Empty = async ({ locale }: PropsWithLocale) => {
  const isMobile = await isMobileDevice()

  const t = await getTranslations({
    locale,
    namespace: 'errorConfig.empty',
  })

  const avatarCls = cn(
    'flex shrink-0',
    'relative overflow-hidden rounded-full',
    'border-4 border-solid border-black dark:border-white',
    'rounded-bl-[78%] rounded-br-[85%] rounded-tl-[43%] rounded-tr-[93%]',
    'hover:rounded-bl-[98%] hover:rounded-br-[95%] hover:rounded-tl-[93%] hover:rounded-tr-[33%]',
    'transition-all duration-500',
    isMobile ? 'size-48' : 'size-60',
  )

  return (
    <div className="my-24 flex flex-col items-center justify-center gap-6">
      <div className={avatarCls}>
        <Image
          src="https://cdn.chengpeiquan.com/img/2024/10/202410041435283.jpg?x-oss-process=image/interlace,1"
          alt=""
          fill
          sizes="240px"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <Paragraph className="text-muted-foreground text-base">
        {t('title')}
      </Paragraph>
    </div>
  )
}
