import React from 'react'
import Image from 'next/image'
import { ExternalLink } from '@/navigation'
import {
  type PropsWithControllable,
  SidebarBlock,
} from '@/components/shared/sidebar-block'

const title = '我和猫的日常'

export const CatHuffing: React.FC<PropsWithControllable> = (props) => {
  return (
    <SidebarBlock title={title} {...props}>
      <ExternalLink
        variant="image"
        href="https://www.douyin.com/user/MS4wLjABAAAAlqB3LfiKgR6zx48L4rLWzhwE1A9j6QcjzW7V0J0VR74"
      >
        <div className="relative w-full aspect-[1920/1080] rounded-lg overflow-hidden">
          <Image
            src="https://cdn.chengpeiquan.com/img/2025/01/202501020040463.jpg?x-oss-process=image/interlace,1"
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
