import { shuffle } from '@bassist/utils'
import { Button, Card } from 'blackwork'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { getMetaCache } from '@/cache/meta-cache'
import { type MetaCacheItem } from '@/config/cache-config'
import {
  ContentFolder,
  cookbookCategories,
  shortNameMapping,
} from '@/config/content-config'
import { type Locale, LocaleIs } from '@/config/locale-config'
import {
  type PropsWithDevice,
  type PropsWithLocale,
} from '@/config/route-config'
import { Link } from '@/navigation'
import { SectionContainer, SectionTitle } from './shared-widgets'

const ButtonGroup: React.FC<PropsWithLocale> = ({ locale }) => {
  const items = cookbookCategories.slice(0, 9) // Limit to 8 items

  return (
    <div className="col-span-1 hidden grid-cols-3 gap-4 lg:grid">
      {items.map((i) => {
        const label = (() => {
          const defaultLabel = i.label[locale]
          if (LocaleIs.isEN(locale)) {
            return shortNameMapping[i.slug] || defaultLabel
          }
          return defaultLabel
        })()

        return (
          <Button key={i.slug} variant="outline" className="size-full p-0">
            <Link
              href={`/cookbooks/${i.slug}/1`}
              className="box-border flex size-full flex-col items-center justify-center gap-1 overflow-hidden p-2 text-xs sm:text-sm md:text-base xl:text-lg"
            >
              <Image
                src={i.icon!}
                alt={label}
                width={32}
                height={32}
                className="size-6 rounded-lg xl:size-8"
              />
              <span className="whitespace-break-spaces break-all">{label}</span>
            </Link>
          </Button>
        )
      })}
    </div>
  )
}

const CookbookCard: React.FC<{ item: MetaCacheItem }> = ({ item }) => {
  return (
    <Card className="group overflow-hidden">
      {/* 图片区域 - 使用更大的比例 */}
      <Link
        href={`/cookbook/${item.slug}`}
        className="relative block aspect-[4/3]"
      >
        <Image
          src={item.metadata.cover}
          alt={item.metadata.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
        />
      </Link>
    </Card>
  )
}

const getRandomCookbooks = async (locale: Locale) => {
  const allCookbooks = await getMetaCache(ContentFolder.Cookbook, locale)
  return shuffle(allCookbooks).slice(0, 8)
}

type LatestCookbooksProps = PropsWithLocale & PropsWithDevice

export const LatestCookbooks = async ({ locale }: LatestCookbooksProps) => {
  const t = await getTranslations({
    locale,
    namespace: 'homeConfig.latestCookbooks',
  })

  const items = await getRandomCookbooks(locale)
  const topCookbooks = items.slice(0, 4)
  const bottomCookbooks = items.slice(4)

  return (
    <SectionContainer>
      <SectionTitle title={t('title')} description={t('description')} />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:gap-8">
        {topCookbooks.map((cookbook) => (
          <CookbookCard key={cookbook.slug} item={cookbook} />
        ))}

        <ButtonGroup locale={locale} />

        {bottomCookbooks.map((cookbook) => (
          <CookbookCard key={cookbook.slug} item={cookbook} />
        ))}
      </div>

      <div className="mt-12 flex w-full justify-center lg:hidden">
        <Button variant="outline" size="lg">
          <Link href={`/cookbooks/1`}>{t('viewMore')}</Link>
        </Button>
      </div>
    </SectionContainer>
  )
}
