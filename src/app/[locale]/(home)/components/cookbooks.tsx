import { shuffle } from '@bassist/utils'
import { Button, Card } from 'blackwork'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { getMetaCache } from '@/cache/meta-cache'
import { type MetaCacheItem } from '@/config/cache-config'
import {
  type CategoryConfigItem,
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

interface ButtonGroupProps extends PropsWithLocale {
  items: CategoryConfigItem[]
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ locale, items }) => {
  return (
    <div className="col-span-1 box-border hidden grid-cols-2 gap-2 p-4 md:grid md:gap-4 xl:gap-4 xl:p-6 2xl:p-8">
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
              className="box-border flex size-full flex-col items-center justify-center gap-1 overflow-hidden p-2"
            >
              <Image
                src={i.icon!}
                alt={label}
                width={32}
                height={32}
                className="size-6 rounded-lg md:size-8 lg:size-6"
              />
              <span className="whitespace-break-spaces break-all text-xs md:text-base lg:text-sm 2xl:text-base">
                {label}
              </span>
            </Link>
          </Button>
        )
      })}
    </div>
  )
}

const CookbookCard: React.FC<{ item: MetaCacheItem }> = ({ item }) => {
  return (
    <Card className="group overflow-hidden rounded-none">
      <Link
        href={`/cookbook/${item.slug}`}
        className="relative block aspect-[5/4]"
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

interface CookbookGroupProps {
  items: MetaCacheItem[]
}

const CookbookGroup: React.FC<CookbookGroupProps> = ({ items }) => {
  return items.map((cookbook) => (
    <CookbookCard key={cookbook.slug} item={cookbook} />
  ))
}

const count = {
  cookbooks: 28,
  categories: 8,
} as const

const getRandomCookbooks = async (locale: Locale) => {
  const allCookbooks = await getMetaCache(ContentFolder.Cookbook, locale)
  return shuffle(allCookbooks).slice(0, count.cookbooks)
}

type CookbooksProps = PropsWithLocale & PropsWithDevice

export const Cookbooks = async ({ locale }: CookbooksProps) => {
  const t = await getTranslations({
    locale,
    namespace: 'homeConfig.cookbooks',
  })

  const cookbooks = await getRandomCookbooks(locale)
  const topCookbooks = cookbooks.slice(0, 10)
  const middleCookbooks = cookbooks.slice(10, 18)
  const bottomCookbooks = cookbooks.slice(18)

  const categories = cookbookCategories.slice(0, count.categories)
  const topCategories = categories.slice(0, count.categories / 2)
  const bottomCategories = categories.slice(count.categories / 2)

  return (
    <SectionContainer fullscreen className="!pb-0">
      <SectionTitle
        title={t('title')}
        description={t('description')}
        className="container"
      />

      <div className="grid grid-cols-2 gap-0 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6">
        <CookbookGroup items={topCookbooks} />
        <ButtonGroup locale={locale} items={topCategories} />
        <CookbookGroup items={middleCookbooks} />
        <ButtonGroup locale={locale} items={bottomCategories} />
        <CookbookGroup items={bottomCookbooks} />
      </div>

      <div className="mt-12 flex w-full justify-center md:hidden">
        <Button variant="outline" size="lg">
          <Link href={`/cookbooks/1`}>{t('viewMore')}</Link>
        </Button>
      </div>
    </SectionContainer>
  )
}
