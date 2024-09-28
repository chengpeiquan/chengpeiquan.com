'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Separator,
  SocialLinks,
} from 'blackwork'
import { getLocaleSocialLinks } from '@/config/site-config'
import { MenuIcon } from '../shared/icons'
import { NavigationLinks } from './navigation-links'
import { useBreakpoint, useClientLocale } from '@/hooks'
import { cn } from '@/utils'
import { type PropsWithDevice } from '@/types'

export const NavigationDrawer: React.FC<PropsWithDevice> = ({ isMobile }) => {
  const t = useTranslations('basicConfig.navigation')
  const { isMd } = useBreakpoint()
  const { locale } = useClientLocale()

  const socialLinks = useMemo(() => getLocaleSocialLinks(locale), [locale])

  const [open, setOpen] = useState(false)

  const btnCls = cn('inline-flex', { 'md:hidden': !isMobile })
  const contentCls = cn(
    'w-3/4 min-w-[300px] h-full rounded-none',
    isMobile ? 'max-w-sm' : 'max-w-[300px]',
  )

  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className={btnCls}>
          <MenuIcon className="w-5 h-5" />
        </Button>
      </DrawerTrigger>

      {!isMd && (
        <DrawerContent className={contentCls}>
          <DrawerHeader>
            <DrawerTitle>{t('title')}</DrawerTitle>
          </DrawerHeader>

          <Separator />

          <div className="p-4 pb-0">
            <NavigationLinks
              visible
              asButton
              onClick={() => setOpen(false)}
              className="grid grid-cols-2"
            />

            <Separator className="my-4" />

            <SocialLinks items={socialLinks} className="justify-center" />
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">{t('close')}</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      )}
    </Drawer>
  )
}
