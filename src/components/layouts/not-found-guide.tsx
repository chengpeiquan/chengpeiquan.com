import { Button, Heading, LayoutMain, Paragraph } from 'blackwork'
import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'
import React from 'react'
import { isMobileDevice } from '@/config/middleware-config'
import { siteConfig } from '@/config/site-config'
import { ExternalLink, Link } from '@/navigation'
import { cn } from '@/utils'

export const NotFoundGuide = async () => {
  const locale = await getLocale()

  const t = await getTranslations({
    locale,
    namespace: 'errorConfig.notFound',
  })

  const isMobile = await isMobileDevice()

  const avatarCls = cn(
    'flex shrink-0',
    'relative overflow-hidden rounded-full',
    'border-4 border-solid border-black dark:border-white',
    'rounded-bl-[78%] rounded-br-[85%] rounded-tl-[93%] rounded-tr-[90%]',
    'hover:rounded-bl-[98%] hover:rounded-br-[95%] hover:rounded-tl-[43%] hover:rounded-tr-[70%]',
    'transition-all duration-500',
    isMobile ? 'size-48' : 'size-60',
  )

  return (
    <LayoutMain className="justify-center">
      <div className="mx-auto flex max-w-3xl flex-col gap-10 md:flex-row md:items-center">
        <div className={avatarCls}>
          <Image
            src="https://cdn.chengpeiquan.com/img/2024/07/202410011418360.jpg?x-oss-process=image/interlace,1"
            alt=""
            fill
            sizes="240px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="flex flex-1 flex-col justify-center gap-6 overflow-hidden">
          <Heading level={1}>{t('title')}</Heading>

          <div className="text-muted-foreground flex flex-col">
            <Paragraph>{t('description')}</Paragraph>

            <Paragraph>
              {t.rich('feedback', {
                issue: () => (
                  <ExternalLink href={siteConfig.feedbackLink} underline>
                    issue
                  </ExternalLink>
                ),
              })}
            </Paragraph>
          </div>

          <div>
            <Button variant="secondary">
              <Link href="/">{t('goBackLabel')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </LayoutMain>
  )
}
