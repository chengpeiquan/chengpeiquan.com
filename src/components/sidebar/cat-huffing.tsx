import React from 'react'
import Image from 'next/image'
import { ExternalLink } from '@/navigation'
import { SidebarBlock } from '../shared/sidebar-block'

const title = '在线吸猫'

export const CatHuffing: React.FC = () => {
  return (
    <SidebarBlock title={title}>
      <ExternalLink
        variant="image"
        href="https://www.douyin.com/user/MS4wLjABAAAAlqB3LfiKgR6zx48L4rLWzhwE1A9j6QcjzW7V0J0VR74"
      >
        <div className="relative w-full aspect-[500/509] rounded-lg overflow-hidden">
          <Image
            src="https://cdn.chengpeiquan.com/img/2021/07/20210703235057.jpg?x-oss-process=image/interlace,1"
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
