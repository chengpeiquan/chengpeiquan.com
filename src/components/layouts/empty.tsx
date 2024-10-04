import React from 'react'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Paragraph } from 'blackwork'
import { type LocalePageParams } from '@/config/locale-config'
import { isMobileDevice } from '@/config/middleware-config'
import { cn } from '@/utils'

export const Empty = async ({ locale }: LocalePageParams) => {
  const isMobile = isMobileDevice()

  const t = await getTranslations({
    locale,
    namespace: 'errorConfig.empty',
  })

  const avatarCls = cn(
    'flex flex-shrink-0',
    'relative rounded-full overflow-hidden',
    'border-4 border-solid border-black dark:border-white',
    'rounded-tl-[43%] rounded-tr-[93%] rounded-bl-[78%] rounded-br-[85%]',
    'hover:rounded-tl-[93%] hover:rounded-tr-[33%] hover:rounded-bl-[98%] hover:rounded-br-[95%]',
    'hover:rotate',
    'transition-all duration-500',
    isMobile ? 'w-48 h-48' : 'w-60 h-60',
  )

  return (
    <div className="flex flex-col items-center justify-center gap-6 my-24">
      <div className={avatarCls}>
        <Image
          src="https://cdn.chengpeiquan.com/img/2024/10/202410041435283.jpg?x-oss-process=image/interlace,1"
          alt=""
          fill
          sizes="240px"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <Paragraph className="text-base text-muted-foreground">
        {t('title')}
      </Paragraph>
    </div>
  )
}
