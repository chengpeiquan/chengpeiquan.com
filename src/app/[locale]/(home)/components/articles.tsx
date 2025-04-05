import { Button, Card, CardDescription, CardFooter, Heading } from 'blackwork'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { type MetaCacheItem } from '@/config/cache-config'
import {
  ContentFolder,
  articleCategories,
  shortNameMapping,
} from '@/config/content-config'
import { LocaleIs } from '@/config/locale-config'
import {
  type PropsWithDevice,
  type PropsWithLocale,
} from '@/config/route-config'
import { getList } from '@/core/dispatcher'
import { Link } from '@/navigation'
import { cn } from '@/utils'
import { SectionContainer, SectionTitle } from './shared-widgets'

type ButtonGroupProps = PropsWithLocale & PropsWithDevice

const ButtonGroup: React.FC<ButtonGroupProps> = ({ locale, isMobile }) => {
  const items = articleCategories.slice(0, 4) // Limit to 4 items

  return (
    <div className="col-span-1 grid grid-cols-2 gap-4">
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
              href={`/articles/${i.slug}/1`}
              className={cn(
                'box-border flex size-full items-center justify-center overflow-hidden p-2',
                isMobile
                  ? 'text-sm'
                  : 'text-lg sm:text-lg lg:text-xl xl:text-2xl',
              )}
            >
              <span className="whitespace-break-spaces break-all">{label}</span>
            </Link>
          </Button>
        )
      })}
    </div>
  )
}

interface ArticleCardProps {
  className?: string
  item: MetaCacheItem
  latest?: boolean
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  className,
  item,
  latest = false,
}) => {
  const { slug, metadata } = item

  const href = `/article/${slug}`

  return (
    <Card key={slug} className={cn(className, 'group overflow-hidden')}>
      <Link href={href} className="relative block aspect-[5/4] overflow-hidden">
        <Image
          src={metadata.cover}
          alt={metadata.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
        />
      </Link>

      <CardFooter className="flex w-full flex-col items-start gap-4 p-4 lg:p-6">
        <Link href={href}>
          <Heading
            level={4}
            className={cn(
              'group-hover:text-foreground line-clamp-2 break-all font-medium tracking-tight transition-colors',
              latest ? 'text-3xl' : 'text-base',
            )}
          >
            {metadata.title}
          </Heading>
        </Link>

        {latest && (
          <CardDescription className="line-clamp-4 text-lg">
            {metadata.desc}
          </CardDescription>
        )}

        <CardDescription className={cn(latest ? 'text-base' : 'text-sm')}>
          {metadata.date}
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

type ArticlesProps = PropsWithLocale & PropsWithDevice

export const Articles = async ({ locale, isMobile }: ArticlesProps) => {
  const t = await getTranslations({
    locale,
    namespace: 'homeConfig.articles',
  })

  const { items } = await getList(ContentFolder.Article, {
    locale,
    args: ['1'],
  })

  const count = isMobile ? 3 : 4
  const limitedItems = items.slice(0, count)
  const [latestArticle, ...restArticles] = limitedItems
  const articleList = isMobile ? limitedItems : restArticles

  const gapCls = cn('gap-4 lg:gap-6 xl:gap-8')

  return (
    <SectionContainer>
      <SectionTitle title={t('title')} description={t('description')} />

      <div className={cn('grid grid-cols-1 md:grid-cols-6', gapCls)}>
        {!isMobile && (
          <ArticleCard item={latestArticle} latest className="col-span-3" />
        )}

        <div
          className={cn(
            'col-span-3 grid gap-8',
            isMobile ? 'grid-cols-1' : 'grid-cols-2',
            gapCls,
          )}
        >
          {articleList.map((article) => (
            <ArticleCard
              key={article.slug}
              item={article}
              className="col-span-1"
            />
          ))}

          <ButtonGroup locale={locale} isMobile={isMobile} />
        </div>
      </div>
    </SectionContainer>
  )
}
