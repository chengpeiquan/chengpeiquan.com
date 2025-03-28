import Image from 'next/image'
import React from 'react'
import { ExternalLink } from '@/navigation'
import {
  type PropsWithControllable,
  SidebarBlock,
} from '../shared/sidebar-block'

const qrCodeTitle = '菜谱专栏 · 小程序版本'

export const CookbookQrCode: React.FC<PropsWithControllable> = (props) => {
  return (
    <SidebarBlock title={qrCodeTitle} {...props}>
      <div className="relative aspect-[500/235] w-full overflow-hidden rounded-lg">
        <Image
          src="https://cdn.chengpeiquan.com/img/2022/02/20220221111852.jpg?x-oss-process=image/interlace,1"
          alt={qrCodeTitle}
          fill
          sizes="(max-width: 1024px) 256px, (max-width: 1280px) 320px, 384px"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </SidebarBlock>
  )
}

const onlineTitle = '在线互动'

export const CookbookOnline: React.FC<PropsWithControllable> = (props) => {
  return (
    <SidebarBlock title={onlineTitle} {...props}>
      <ExternalLink
        variant="image"
        href="https://www.xiaohongshu.com/user/profile/5c6cf700000000001003f7f6"
      >
        <div className="relative aspect-[500/797] w-full overflow-hidden rounded-lg">
          <Image
            src="https://cdn.chengpeiquan.com/img/2021/12/20211227005610.jpg?x-oss-process=image/interlace,1"
            alt={onlineTitle}
            fill
            sizes="(max-width: 1024px) 256px, (max-width: 1280px) 320px, 384px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </ExternalLink>
    </SidebarBlock>
  )
}
