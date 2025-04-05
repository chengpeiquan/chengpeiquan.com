'use client'

import {
  Button,
  ScrollArea,
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
import { useTranslations } from 'next-intl'
import React from 'react'
import { NavigationLinks } from '@/components/layouts/navigation-links'
import { SearchBox } from '@/components/layouts/search-box'
import { CatHuffing } from '@/components/sidebar/cat-huffing'
import {
  CookbookOnline,
  CookbookQrCode,
} from '@/components/sidebar/cookbook-widgets'
import { FriendlyLinks } from '@/components/sidebar/friendly-links'
import { PublishedBooks } from '@/components/sidebar/published-books'
import { type PropsWithDevice } from '@/config/route-config'
import { getLocaleSocialLinks } from '@/config/site-config'
import { useBreakpoint, useClientLocale, useClientLocation } from '@/hooks'
import { usePathname } from '@/navigation'
import { cn } from '@/utils'

const Recommend: React.FC = () => {
  const { isChinese } = useClientLocale()
  const { isCookbook } = useClientLocation()

  const blocks = useMemo(() => {
    const items = isCookbook
      ? [CookbookQrCode, CookbookOnline]
      : [PublishedBooks, CatHuffing]

    items.push(FriendlyLinks)

    return items
  }, [isCookbook])

  if (!isChinese) return null
  return (
    <>
      <Separator className="my-4" />

      <div className="flex w-full flex-col gap-6">
        {blocks.map((Comp, idx) => (
          <Comp key={idx} titleClassName="text-sm" separatorVisible={false} />
        ))}
      </div>
    </>
  )
}

export const NavigationSheet: React.FC<PropsWithDevice> = ({ isMobile }) => {
  const pathname = usePathname()
  const t = useTranslations('basicConfig.navigation')
  const { isLg } = useBreakpoint()
  const { locale } = useClientLocale()

  const socialLinks = useMemo(() => getLocaleSocialLinks(locale), [locale])

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const btnCls = cn('inline-flex', { 'lg:hidden': !isMobile })
  const contentCls = cn(
    'flex h-full w-3/4 min-w-[300px] flex-col rounded-none p-0',
    isMobile ? 'max-w-sm' : 'max-w-[300px]',
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className={btnCls}>
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>

      {!isLg && (
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

            <div className="box-border flex flex-1 flex-col overflow-hidden p-4 pb-0">
              <SearchBox isMobile={isMobile} />

              <Separator className="my-4" />

              <ScrollArea className="-mr-3 pr-3">
                <NavigationLinks
                  visible
                  asButton
                  className="grid w-full grid-cols-2"
                />

                <Recommend />
              </ScrollArea>

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
