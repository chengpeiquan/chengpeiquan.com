import React from 'react'
import { getTranslations } from 'next-intl/server'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  ExternalLink,
  Separator,
} from 'blackwork'
import { Help } from 'blackwork/icons'
import { cn } from '@/utils'
import { isMobileDevice } from '@/config/middleware-config'
import { type PropsWithLocale } from '@/config/route-config'

export const DataDescription = async ({ locale }: PropsWithLocale) => {
  const isMobile = await isMobileDevice()

  const t = await getTranslations({
    locale,
    namespace: 'projectConfig.dataDescription',
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Help className="size-5 text-muted-foreground cursor-pointer" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent
        className={cn('rounded-lg', { 'w-[90vw]': isMobile })}
      >
        <AlertDialogHeader className="space-y-4 text-left">
          <AlertDialogTitle>{t('title')}</AlertDialogTitle>

          <Separator />

          <AlertDialogDescription>
            <ol className="flex flex-col gap-2 ml-4 list-decimal [&>li]:break-all">
              {Array(4)
                .fill('')
                .map((_, idx) => {
                  const content = (() => {
                    if (idx === 1) {
                      return t.rich('list.1', {
                        more: (chunks) => (
                          <ExternalLink
                            className="underline"
                            href="https://blog.npmjs.org/post/92574016600/numeric-precision-matters-how-npm-download-counts-work.html"
                          >
                            {chunks}
                          </ExternalLink>
                        ),
                      })
                    }
                    return t(`list.${idx}`)
                  })()

                  return <li key={idx}>{content}</li>
                })}
            </ol>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{t('okText')}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
