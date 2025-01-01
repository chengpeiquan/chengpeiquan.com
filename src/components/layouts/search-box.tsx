'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
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
import { Close } from 'blackwork/icons'
import { type PropsWithDevice } from '@/config/route-config'
import { type SearchCacheItem } from '@/config/cache-config'
import { type ContentDetailsLink, ContentFolder } from '@/config/content-config'
import {
  RecentSearchDataProvider,
  type UseSearchResponse,
  useClientLocale,
  useClientLocation,
  useSearch,
} from '@/hooks'
import { Link } from '@/navigation'
import { cn } from '@/utils'

interface SearchResultCardProps extends PropsWithDevice {
  isRecent: boolean
  item: SearchCacheItem
  onAdd: () => void
  onRemove: () => void
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  isMobile,
  isRecent,
  item,
  onAdd,
  onRemove,
}) => {
  const { slug, cover, title, desc } = item

  const t = useTranslations('searchConfig')
  const { isCookbook } = useClientLocation()

  const link = useMemo(() => {
    const folder = isCookbook ? ContentFolder.Cookbook : ContentFolder.Article
    return `/${folder}/${slug}` satisfies ContentDetailsLink
  }, [isCookbook, slug])

  return (
    <QuickSearchItem className="rounded-lg">
      <div className="flex gap-2 w-full">
        <Link href={link} className="flex gap-3 w-full" onClick={onAdd}>
          {!isMobile && cover && (
            <div className="relative flex flex-shrink-0 w-[88px] aspect-[500/400] rounded-lg overflow-hidden">
              <Image
                src={cover}
                alt={title}
                fill
                sizes="(max-width: 480px) 100%, 160px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          <div className="flex flex-col flex-1 justify-center gap-2 overflow-hidden">
            <Heading level={4} className="text-base line-clamp-1 break-all">
              {title}
            </Heading>

            <p className="text-xs text-gray-400 line-clamp-2">{desc}</p>
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
              <Close className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </QuickSearchItem>
  )
}

const Highlight: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="text-foreground font-bold">{children}</span>
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
            className="cursor-pointer hover:text-foreground"
            onClick={clearRecent}
          >
            {t('cleanup')}
          </span>
        </div>
      )
    }

    return t.rich('resultCount', {
      count: () => <Highlight>{data.length}</Highlight>,
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
      <Paragraph className="text-sm text-muted-foreground break-all px-3 my-3">
        {title}
      </Paragraph>

      {data.map((i) => (
        <SearchResultCard
          key={i.slug}
          isMobile={isMobile}
          isRecent={isRecent}
          item={i}
          onAdd={() => {
            addRecent(i)
            onClose()
          }}
          onRemove={() => removeRecent(i)}
        />
      ))}
    </>
  )
}

export const SearchBoxRoot: React.FC<PropsWithDevice> = ({ isMobile }) => {
  const t = useTranslations('searchConfig')
  const { isChinese } = useClientLocale()
  const { isCookbook } = useClientLocation()

  const target = useMemo(() => {
    const articleLabel = isChinese ? '文章' : 'article'
    const cookbookLabel = isChinese ? '菜谱' : 'cookbook'
    return isCookbook ? cookbookLabel : articleLabel
  }, [isChinese, isCookbook])

  const label = useMemo(() => t('label', { target }), [t, target])

  const { open, setOpen } = useQuickSearchState()
  const { onSearch, ...rest } = useSearch({ enabled: open })

  return (
    <>
      <QuickSearchTrigger
        label={label}
        shortLabel={t('shortLabel')}
        onClick={() => setOpen(true)}
      />

      <QuickSearchDialog
        open={open}
        onOpenChange={setOpen}
        ariaLabel={label}
        contentProps={{
          className: cn({
            'w-[750px] max-w-full': !isMobile,
            'w-[90vw] rounded-lg': isMobile,
          }),
        }}
      >
        <QuickSearchInput
          maxLength={100}
          placeholder={t('placeholder', { target })}
          onChange={onSearch}
        />

        <QuickSearchList className="h-[600px]">
          <SearchResult
            isMobile={isMobile}
            onClose={() => setOpen(false)}
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
