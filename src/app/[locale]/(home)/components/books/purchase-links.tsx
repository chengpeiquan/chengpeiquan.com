import { Button, type ButtonProps } from 'blackwork'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { type BookPurchaseInfo } from '@/config/book-config'
import { type PropsWithLocale } from '@/config/route-config'
import { ExternalLink } from '@/navigation'
import { cn } from '@/utils'

interface PurchaseLinksProps
  extends Pick<BookPurchaseInfo, 'purchaseLinks'>,
    PropsWithLocale {
  className?: string
  labelClassName?: string
  buttonGroupClassName?: string
  buttonVariant?: ButtonProps['variant']
  buttonSize?: ButtonProps['size']
}

export const PurchaseLinks = async ({
  purchaseLinks,
  locale,
  className,
  labelClassName,
  buttonGroupClassName,
  buttonVariant = 'default',
  buttonSize = 'default',
}: PurchaseLinksProps) => {
  const t = await getTranslations({
    locale,
    namespace: 'homeConfig.books',
  })

  return (
    <div className={className}>
      <span className={cn('inline-flex shrink-0', labelClassName)}>
        {t('purchase')}
      </span>

      <div className={cn('flex flex-wrap gap-2', buttonGroupClassName)}>
        {purchaseLinks.map((link) => (
          <Button
            key={link.title}
            variant={buttonVariant}
            size={buttonSize}
            className="relative"
            tabIndex={-1}
          >
            <ExternalLink
              key={link.title}
              href={link.href}
              className="inline-flex size-full items-center justify-center !text-inherit"
            >
              {link.title}
            </ExternalLink>
          </Button>
        ))}
      </div>
    </div>
  )
}
