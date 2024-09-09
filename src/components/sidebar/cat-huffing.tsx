import React from 'react'
import Image from 'next/image'
import { Link } from '@/navigation'
import { SidebarBlock } from '../shared/sidebar-block'

const title = '在线吸猫'

export const CatHuffing: React.FC = () => {
  return (
    <SidebarBlock title={title}>
      <div className="relative w-full aspect-[500/509] rounded-lg overflow-hidden">
        <Link
          href="https://www.douyin.com/user/MS4wLjABAAAAlqB3LfiKgR6zx48L4rLWzhwE1A9j6QcjzW7V0J0VR74"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://cdn.chengpeiquan.com/img/2021/07/20210703235057.jpg?x-oss-process=image/interlace,1"
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
          />
        </Link>
      </div>
    </SidebarBlock>
  )
}
