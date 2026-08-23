import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Separator,
} from 'blackwork'
import { CircleHelp } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { isMobileDevice } from '@/config/middleware-config'
import { type PropsWithLocale } from '@/config/route-config'
import { ExternalLink } from '@/navigation'
import { cn } from '@/utils'

export const DataDescription = async ({ locale }: PropsWithLocale) => {
  const isMobile = await isMobileDevice()

  const t = await getTranslations({
    locale,
    namespace: 'projectConfig.dataDescription',
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button
            type="button"
            className="
              inline-flex size-8 items-center justify-center rounded-md text-sm
              font-medium whitespace-nowrap ring-offset-background
              transition-colors
              hover:bg-accent hover:text-accent-foreground
              focus-visible:ring-2 focus-visible:ring-ring
              focus-visible:ring-offset-2 focus-visible:outline-none
              disabled:pointer-events-none disabled:opacity-50
            "
            aria-label={t('title')}
          />
        }
      >
        <CircleHelp className="size-5 cursor-pointer text-muted-foreground" />
      </AlertDialogTrigger>

      <AlertDialogContent
        className={cn('rounded-lg', { 'w-[90vw]': isMobile })}
      >
        <AlertDialogHeader className="space-y-4 text-left">
          <AlertDialogTitle>{t('title')}</AlertDialogTitle>

          <Separator />

          <AlertDialogDescription>
            <ol
              className="
                ml-4 flex list-decimal flex-col gap-2
                [&>li]:break-all
              "
            >
              {Array(4)
                .fill('')
                .map((_, idx) => {
                  const content = (() => {
                    if (idx === 1) {
                      return t.rich('list.1', {
                        // oxlint-disable-next-line react/no-unstable-nested-components
                        more: (chunks) => (
                          <ExternalLink
                            variant="secondary"
                            underline
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
