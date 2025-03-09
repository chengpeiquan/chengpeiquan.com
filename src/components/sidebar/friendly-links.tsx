import { Separator } from 'blackwork'
import React from 'react'
import { friendlyLinks } from '@/config/external-config'
import { ExternalLink } from '@/navigation'
import {
  type PropsWithControllable,
  SidebarBlock,
} from '../shared/sidebar-block'

export const FriendlyLinks: React.FC<PropsWithControllable> = (props) => {
  return (
    <SidebarBlock title="友情链接" {...props}>
      <div className="w-full space-x-3 space-y-2">
        {friendlyLinks.map((i, idx) => {
          return (
            <React.Fragment key={i.href}>
              {idx > 0 && (
                <Separator
                  orientation="vertical"
                  className="!my-0 inline-block h-4 align-middle"
                />
              )}

              <ExternalLink
                href={i.href}
                className="text-sm"
                variant="secondary"
              >
                {i.title}
              </ExternalLink>
            </React.Fragment>
          )
        })}
      </div>
    </SidebarBlock>
  )
}
