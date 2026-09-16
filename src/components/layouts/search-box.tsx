'use client'

import {
  Button,
  Heading,
  Paragraph,
  QuickSearchDialog,
  QuickSearchEmpty,
  QuickSearchInput,
  QuickSearchItem,
  QuickSearchList,
  QuickSearchTrigger,
  useQuickSearchState,
} from 'blackwork'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React, { memo, useMemo } from 'react'
import { type SearchCacheItem } from '@/config/cache-config'
import { type ContentDetailsLink, ContentFolder } from '@/config/content-config'
import { type PropsWithDevice } from '@/config/route-config'
import {
  RecentSearchDataProvider,
  type UseSearchResponse,
  useClientLocation,
  useSearch,
} from '@/hooks'
import { Link } from '@/navigation'
import { cn } from '@/utils'
import { SearchHighlight } from './search-highlight'

interface SearchResultCardProps extends PropsWithDevice {
  isRecent: boolean
  item: SearchCacheItem
  keyword: string
  onAdd: () => void
  onRemove: () => void
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  isMobile,
  isRecent,
  item,
  keyword,
  onAdd,
  onRemove,
}) => {
  const { slug, cover, title, desc, excerpt } = item

  const t = useTranslations('searchConfig')
  const { isCookbook } = useClientLocation()

  const link = useMemo(() => {
    const folder = isCookbook ? ContentFolder.Cookbook : ContentFolder.Article
    return `/${folder}/${slug}` satisfies ContentDetailsLink
  }, [isCookbook, slug])

  return (
    <QuickSearchItem className="rounded-lg">
      <div className="flex w-full gap-2">
        <Link href={link} className="flex w-full gap-3" onClick={onAdd}>
          {!isMobile && cover && (
            <div
              className={cn(
                `
                  relative flex aspect-500/400 w-[88px] shrink-0 overflow-hidden
                  rounded-lg
                `,
              )}
            >
              <Image
                src={cover}
                alt={title}
                fill
                sizes="(max-width: 480px) 100%, 160px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          <div
            className={cn(
              'flex flex-1 flex-col justify-center gap-2 overflow-hidden',
            )}
          >
            <Heading level={4} className="line-clamp-1 text-base break-all">
              {title}
            </Heading>

            <p className="line-clamp-2 text-xs text-muted-foreground">
              <SearchHighlight keyword={keyword} value={excerpt || desc} />
            </p>
          </div>
        </Link>

        {isRecent && (
          <div className="flex shrink-0 items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              aria-label={t('removeButtonLabel')}
            >
              <X className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </QuickSearchItem>
  )
}

const Highlight: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="font-bold text-foreground">{children}</span>
)

const SearchResult: React.FC<
  Omit<UseSearchResponse, 'onSearch'> &
    PropsWithDevice & {
      onClose: () => void
    }
> = ({
  keyword,
  result,
  noResult,
  recent,
  addRecent,
  removeRecent,
  clearRecent,
  noRecent,
  isMobile,
  onClose,
}) => {
  const t = useTranslations('searchConfig')

  const isRecent = useMemo(() => !keyword, [keyword])

  const data = useMemo(
    () => (isRecent ? recent : result),
    [isRecent, recent, result],
  )

  const title = useMemo(() => {
    if (isRecent) {
      return (
        <div className="flex items-center justify-between">
          <span>{t('recent')}</span>
          <span
            className={cn(`
              cursor-pointer
              hover:text-foreground
            `)}
            onClick={clearRecent}
          >
            {t('cleanup')}
          </span>
        </div>
      )
    }

    return t.rich('resultCount', {
      // oxlint-disable-next-line react/no-unstable-nested-components
      count: () => <Highlight>{data.length}</Highlight>,
      // oxlint-disable-next-line react/no-unstable-nested-components
      keyword: () => <Highlight>{keyword}</Highlight>,
    })
  }, [clearRecent, data.length, isRecent, keyword, t])

  if (noRecent || noResult) {
    return (
      <QuickSearchEmpty>
        {noRecent ? t('noRecent') : t('noResult')}
      </QuickSearchEmpty>
    )
  }

  return (
    <>
      <Paragraph className="my-3 px-3 text-sm break-all text-muted-foreground">
        {title}
      </Paragraph>

      {data.map((i) => (
        <SearchResultCard
          key={i.slug}
          isMobile={isMobile}
          isRecent={isRecent}
          item={i}
          keyword={isRecent ? '' : keyword}
          onAdd={() => {
            addRecent(i)
            onClose()
          }}
          onRemove={() => {
            removeRecent(i)
          }}
        />
      ))}
    </>
  )
}

export const SearchBoxRoot: React.FC<PropsWithDevice> = ({ isMobile }) => {
  const t = useTranslations('searchConfig')
  const { isCookbook } = useClientLocation()

  const target = useMemo(
    () => t(`target.${isCookbook ? 'cookbook' : 'article'}`),
    [isCookbook, t],
  )

  const label = useMemo(() => t('label', { target }), [t, target])

  const tn = useTranslations('basicConfig.navigation')
  const { open, setOpen } = useQuickSearchState()
  const { onSearch, ...rest } = useSearch({ enabled: open })

  return (
    <>
      <QuickSearchTrigger
        appearance="glass"
        label={label}
        shortLabel={t('shortLabel')}
        onClick={() => {
          setOpen(true)
        }}
      />

      <QuickSearchDialog
        appearance="glass"
        closeLabel={tn('close')}
        open={open}
        onOpenChange={setOpen}
        ariaLabel={label}
        contentProps={{
          className: cn({
            'w-[680px] max-w-[calc(100vw-32px)]': !isMobile,
            'w-[calc(100vw-24px)]': isMobile,
          }),
        }}
      >
        <QuickSearchInput
          appearance="glass"
          aria-label={label}
          maxLength={100}
          placeholder={t('placeholder', { target })}
          onChange={onSearch}
        />

        <QuickSearchList className="h-[min(440px,calc(100dvh-180px))]">
          <SearchResult
            isMobile={isMobile}
            onClose={() => {
              setOpen(false)
            }}
            {...rest}
          />
        </QuickSearchList>
      </QuickSearchDialog>
    </>
  )
}

export const SearchBox = memo((props: PropsWithDevice) => {
  return (
    <RecentSearchDataProvider>
      <SearchBoxRoot {...props} />
    </RecentSearchDataProvider>
  )
})

SearchBox.displayName = 'SearchBox' as const
