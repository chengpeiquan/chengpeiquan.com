import { Button } from 'blackwork'
import Image from 'next/image'
import React from 'react'
import {
  type PropsWithControllable,
  SidebarBlock,
} from '@/components/shared/sidebar-block'
import { learningVue3 } from '@/config/book-config'
import { ExternalLink, Link } from '@/navigation'

const links = learningVue3.zh.purchaseLinks

const title = '我出版的书'

export const PublishedBooks: React.FC<PropsWithControllable> = (props) => {
  return (
    <SidebarBlock title={title} {...props}>
      <div className="flex w-full flex-col">
        <Link
          href="/article/the-story-of-the-book-learning-vue3"
          target="_blank"
          variant="image"
        >
          <div className="relative aspect-[1920/1080] w-full overflow-hidden rounded-lg">
            <Image
              // src="https://cdn.chengpeiquan.com/img/2023/05/20230508232214.jpg?x-oss-process=image/interlace,1"
              src="https://cdn.chengpeiquan.com/img/2025/01/202501012317610.jpg?x-oss-process=image/interlace,1"
              alt={title}
              fill
              sizes="(max-width: 1024px) 256px, (max-width: 1280px) 320px, 384px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </Link>

        <div className="flex w-full items-center justify-center">
          {links.map((i) => {
            return (
              <Button key={i.href} variant="link">
                <ExternalLink href={i.href}>{i.title}购买</ExternalLink>
              </Button>
            )
          })}
        </div>
      </div>
    </SidebarBlock>
  )
}
