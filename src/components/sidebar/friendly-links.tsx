import React from 'react'
import { Separator } from 'blackwork'
import { ExternalLink } from '@/navigation'
import { SidebarBlock } from '../shared/sidebar-block'
import { friendlyLinks } from '@/config/external-config'

export const FriendlyLinks: React.FC = () => {
  return (
    <SidebarBlock title="友情链接">
      <div className="w-full space-x-3 space-y-2">
        {friendlyLinks.map((i, idx) => {
          return (
            <React.Fragment key={i.href}>
              {idx > 0 && (
                <Separator
                  orientation="vertical"
                  className="inline-block align-middle h-4 !my-0"
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
