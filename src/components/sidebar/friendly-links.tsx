import { Separator } from 'blackwork'
import { useTranslations } from 'next-intl'
import React from 'react'
import { friendlyLinks } from '@/config/external-config'
import { ExternalLink } from '@/navigation'
import {
  type PropsWithControllable,
  SidebarBlock,
} from '../shared/sidebar-block'

export const FriendlyLinks: React.FC<PropsWithControllable> = (props) => {
  const t = useTranslations('sidebarConfig.friendlyLinks')

  return (
    <SidebarBlock title={t('title')} {...props}>
      <div className="w-full space-y-2 space-x-3">
        {friendlyLinks.map((i, idx) => {
          return (
            <React.Fragment key={i.href}>
              {idx > 0 && (
                <Separator
                  orientation="vertical"
                  className="my-0! inline-block h-4 align-middle"
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
