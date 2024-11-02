'use client'

import React from 'react'
import Image from 'next/image'
import {
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
import { useTranslations } from 'next-intl'
import { type PropsWithDevice } from '@/config/route-config'
import { type SearchCacheItem } from '@/config/cache-config'
import { type ContentDetailsLink, ContentFolder } from '@/config/content-config'
import {
  type UseSearchResponse,
  useClientLocale,
  useClientLocation,
  useSearch,
} from '@/hooks'
import { Link, usePathname } from '@/navigation'
import { cn } from '@/utils'

interface SearchResultCardProps extends PropsWithDevice {
  item: SearchCacheItem
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  isMobile,
  item,
}) => {
  const { slug, cover, title, desc } = item

  const { isCookbook } = useClientLocation()

  const link = useMemo(() => {
    const folder = isCookbook ? ContentFolder.Cookbook : ContentFolder.Article
    return `/${folder}/${slug}` satisfies ContentDetailsLink
  }, [isCookbook, slug])

  return (
    <QuickSearchItem className="rounded-lg">
      <Link href={link} className="flex flex-row gap-3 w-full">
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
    </QuickSearchItem>
  )
}

const Highlight: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="text-foreground font-bold">{children}</span>
)

const SearchResult: React.FC<
  Omit<UseSearchResponse, 'onSearch'> & PropsWithDevice
> = ({ keyword, result, noResult, recent, noRecent, isMobile }) => {
  const t = useTranslations('searchConfig')

  const data = useMemo(
    () => (!keyword ? recent : result),
    [keyword, recent, result],
  )

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
        {t.rich('resultCount', {
          count: () => <Highlight>{data.length}</Highlight>,
          keyword: () => <Highlight>{keyword}</Highlight>,
        })}
      </Paragraph>

      {data.map((i) => (
        <SearchResultCard key={i.slug} isMobile={isMobile} item={i} />
      ))}
    </>
  )
}

export const SearchBox: React.FC<PropsWithDevice> = ({ isMobile }) => {
  const pathname = usePathname()
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

  useEffect(() => {
    setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

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
          className: cn({ 'w-3/4 rounded-xl': isMobile }),
        }}
      >
        <QuickSearchInput
          maxLength={100}
          placeholder={t('placeholder', { target })}
          onChange={onSearch}
        />

        <QuickSearchList>
          <SearchResult isMobile={isMobile} {...rest} />
        </QuickSearchList>
      </QuickSearchDialog>
    </>
  )
}
