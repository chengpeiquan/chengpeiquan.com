'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import {
  Button,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SocialLinks,
} from 'blackwork'
import { Menu as MenuIcon } from 'blackwork/icons'
import { getLocaleSocialLinks } from '@/config/site-config'
import { type PropsWithDevice } from '@/config/route-config'
import { NavigationLinks } from '@/components/layouts/navigation-links'
import { SearchBox } from '@/components/layouts/search-box'
import { useBreakpoint, useClientLocale } from '@/hooks'
import { cn } from '@/utils'
import { usePathname } from '@/navigation'

export const NavigationSheet: React.FC<PropsWithDevice> = ({ isMobile }) => {
  const pathname = usePathname()
  const t = useTranslations('basicConfig.navigation')
  const { isMd } = useBreakpoint()
  const { locale } = useClientLocale()

  const socialLinks = useMemo(() => getLocaleSocialLinks(locale), [locale])

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const btnCls = cn('inline-flex', { 'lg:hidden': !isMobile })
  const contentCls = cn(
    'flex flex-col w-3/4 min-w-[300px] h-full rounded-none p-0',
    isMobile ? 'max-w-sm' : 'max-w-[300px]',
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className={btnCls}>
          <MenuIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      {!isMd && (
        <SheetContent
          side="left"
          className={contentCls}
          closeButtonVisible={false}
        >
          <div className="flex flex-1 flex-col overflow-hidden">
            <SheetHeader className="p-4">
              <SheetTitle>{t('title')}</SheetTitle>
            </SheetHeader>

            <Separator className="m-0" />

            <div className="flex flex-col flex-1 overflow-hidden p-4 pb-0">
              <SearchBox isMobile={isMobile} />

              <Separator className="my-4" />

              <NavigationLinks visible asButton className="grid grid-cols-2" />

              <Separator className="my-4" />

              <SocialLinks items={socialLinks} className="justify-center" />
            </div>
          </div>

          <SheetFooter className="mx-4 mb-4">
            <SheetClose asChild>
              <Button variant="outline">{t('close')}</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  )
}
