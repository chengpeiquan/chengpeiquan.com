import React from 'react'
import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'
import { Button, Heading, LayoutMain, Paragraph } from 'blackwork'
import { ExternalLink, Link } from '@/navigation'
import { siteConfig } from '@/config/site-config'
import { cn } from '@/utils'
import { isMobileDevice } from '@/config/middleware-config'

export const NotFoundGuide = async () => {
  const locale = await getLocale()

  const t = await getTranslations({
    locale,
    namespace: 'errorConfig.notFound',
  })

  const isMobile = await isMobileDevice()

  const avatarCls = cn(
    'flex flex-shrink-0',
    'relative rounded-full overflow-hidden',
    'border-4 border-solid border-black dark:border-white',
    'rounded-tl-[93%] rounded-tr-[90%] rounded-bl-[78%] rounded-br-[85%]',
    'hover:rounded-tl-[43%] hover:rounded-tr-[70%] hover:rounded-bl-[98%] hover:rounded-br-[95%]',
    'hover:rotate',
    'transition-all duration-500',
    isMobile ? 'w-48 h-48' : 'w-60 h-60',
  )

  return (
    <LayoutMain className="justify-center">
      <div className="flex flex-col md:flex-row md:items-center gap-10 max-w-3xl mx-auto">
        <div className={avatarCls}>
          <Image
            src="https://cdn.chengpeiquan.com/img/2024/07/202410011418360.jpg?x-oss-process=image/interlace,1"
            alt=""
            fill
            sizes="240px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="flex flex-col justify-center flex-1 gap-6 overflow-hidden">
          <Heading level={1}>{t('title')}</Heading>

          <div className="flex flex-col text-muted-foreground">
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
