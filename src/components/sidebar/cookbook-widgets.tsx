import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React from 'react'
import { ExternalLink } from '@/navigation'
import { cn } from '@/utils'
import {
  type PropsWithControllable,
  SidebarBlock,
} from '../shared/sidebar-block'

export const CookbookQrCode: React.FC<PropsWithControllable> = (props) => {
  const t = useTranslations('sidebarConfig.cookbookQrCode')
  const title = t('title')

  return (
    <SidebarBlock title={title} {...props}>
      <div className="relative aspect-500/235 w-full overflow-hidden rounded-lg">
        <Image
          src="https://cdn.chengpeiquan.com/img/2022/02/20220221111852.jpg?x-oss-process=image/interlace,1"
          alt={title}
          fill
          sizes="(max-width: 1024px) 256px, (max-width: 1280px) 320px, 384px"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </SidebarBlock>
  )
}

export const CookbookOnline: React.FC<PropsWithControllable> = (props) => {
  const t = useTranslations('sidebarConfig.cookbookOnline')
  const title = t('title')

  return (
    <SidebarBlock title={title} {...props}>
      <ExternalLink
        variant="image"
        href="https://www.xiaohongshu.com/user/profile/5c6cf700000000001003f7f6"
      >
        <div
          className={cn(`
            relative aspect-500/797 w-full overflow-hidden rounded-lg
          `)}
        >
          <Image
            src="https://cdn.chengpeiquan.com/img/2021/12/20211227005610.jpg?x-oss-process=image/interlace,1"
            alt={title}
            fill
            sizes="(max-width: 1024px) 256px, (max-width: 1280px) 320px, 384px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </ExternalLink>
    </SidebarBlock>
  )
}
