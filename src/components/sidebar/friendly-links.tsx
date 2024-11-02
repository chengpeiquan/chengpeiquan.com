import React from 'react'
import { Separator } from 'blackwork'
import { Link } from '@/navigation'
import { type linkItem } from '@/config/route-config'
import { SidebarBlock } from '../shared/sidebar-block'

const links: readonly linkItem[] = [
  {
    href: 'https://vue3.chengpeiquan.com',
    title: 'Vue3 入门指南与实战案例',
  },
  {
    href: 'https://www.fnnas.com',
    title: '飞牛 NAS',
  },
  {
    href: 'https://chawyehsu.com',
    title: 'The Art of Chawye Hsu',
  },
  {
    href: 'https://guangne.com',
    title: '旅行家龙猫',
  },
  {
    href: 'https://muki.tw',
    title: 'Muki Space',
  },
]

export const FriendlyLinks: React.FC = () => {
  return (
    <SidebarBlock title="友情链接">
      <div className="w-full space-x-3 space-y-2">
        {links.map((i, idx) => {
          return (
            <React.Fragment key={i.href}>
              {idx > 0 && (
                <Separator
                  orientation="vertical"
                  className="inline-block align-middle h-4 !my-0"
                />
              )}

              <Link
                href={i.href}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-sm"
              >
                {i.title}
              </Link>
            </React.Fragment>
          )
        })}
      </div>
    </SidebarBlock>
  )
}
