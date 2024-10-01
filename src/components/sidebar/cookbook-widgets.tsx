import React from 'react'
import Image from 'next/image'
import { Link } from '@/navigation'
import { SidebarBlock } from '../shared/sidebar-block'

const qrCodeTitle = '菜谱专栏 · 小程序版本'

export const CookbookQrCode: React.FC = () => {
  return (
    <SidebarBlock title={qrCodeTitle}>
      <div className="relative w-full aspect-[500/235] rounded-lg overflow-hidden">
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

export const CookbookOnline: React.FC = () => {
  return (
    <SidebarBlock title={onlineTitle}>
      <Link
        href="https://www.xiaohongshu.com/user/profile/5c6cf700000000001003f7f6"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <div className="relative w-full aspect-[500/797] rounded-lg overflow-hidden">
          <Image
            src="https://cdn.chengpeiquan.com/img/2021/12/20211227005610.jpg?x-oss-process=image/interlace,1"
            alt={onlineTitle}
            fill
            sizes="(max-width: 1024px) 256px, (max-width: 1280px) 320px, 384px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </Link>
    </SidebarBlock>
  )
}
