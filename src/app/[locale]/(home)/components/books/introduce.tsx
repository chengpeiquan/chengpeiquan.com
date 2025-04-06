'use server'

import { ShowMore } from '@re-dev/react-truncate'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea,
} from 'blackwork'
import { ChevronsDown } from 'blackwork/icons'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { type BookPurchaseInfo } from '@/config/book-config'
import { ContentFolder } from '@/config/content-config'
import {
  type PropsWithDevice,
  type PropsWithLocale,
} from '@/config/route-config'
import { getDetails } from '@/core/dispatcher'
import { cn } from '@/utils'
import { PurchaseLinks } from './purchase-links'

const ExpandButton: React.FC<{ label: string }> = ({ label }) => {
  return (
    <DialogTrigger asChild>
      <span className="inline-flex items-center gap-6 text-base">
        <span>…</span>
        <span className="hover:text-foreground inline-flex cursor-pointer items-center">
          <span>{label}</span>
          <ChevronsDown className="size-4" />
        </span>
      </span>
    </DialogTrigger>
  )
}

type BookIntroduceProps = Pick<
  BookPurchaseInfo,
  'purchaseLinks' | 'introSlug'
> &
  PropsWithLocale &
  PropsWithDevice

export const BookIntroduce = async ({
  locale,
  purchaseLinks,
  introSlug,
  isMobile,
}: BookIntroduceProps) => {
  const res = await getDetails(ContentFolder.Fragment, {
    slug: introSlug,
    locale,
  })

  if (!res) return null

  const t = await getTranslations({
    locale,
    namespace: 'homeConfig.books.dialog',
  })

  const content = res.jsxElement

  return (
    <div className="text-foreground mb-4 w-full">
      <Dialog>
        {/* Prevent the content from being fully rendered when the page is refreshed */}
        <div className="h-[75px] w-full overflow-hidden">
          <ShowMore
            lines={3}
            separator=""
            more={<ExpandButton label={t('expandButton')} />}
            className="text-base"
          >
            {content}
          </ShowMore>
        </div>

        <DialogContent
          className={cn('rounded-lg', isMobile ? 'max-w-[90vw]' : 'max-w-2xl')}
        >
          <DialogHeader>
            <DialogTitle>{t('title')}</DialogTitle>
            <DialogDescription className="!mt-6">
              <ScrollArea className="-mr-4 h-[450px] pr-4">
                <div className="prose prose-neutral dark:prose-invert text-foreground dark:text-foreground text-sm">
                  {content}
                </div>

                <PurchaseLinks
                  className="flex items-center"
                  buttonGroupClassName="gap-0"
                  purchaseLinks={purchaseLinks}
                  locale={locale}
                  buttonVariant="ghost"
                  buttonSize="sm"
                />
              </ScrollArea>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
